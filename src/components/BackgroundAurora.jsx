import { useEffect, useRef } from "react";

const CONFIG = {
  baseColor: "#8c52ff",
  defaultSpeed: 0.08,
  defaultIntensity: 0.9,
  parallax: 0.22,
  mouseSensitivity: 0.0,
  grainAmount: 0.035,
  vignette: 1.25,
};

function srgbToLinear(value) {
  const v = value / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function hexToLinearRgb(hex) {
  let value = hex.replace("#", "");
  if (value.length === 3) {
    value = value
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const int = parseInt(value, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return new Float32Array([
    srgbToLinear(r),
    srgbToLinear(g),
    srgbToLinear(b),
  ]);
}

const VERTEX_SHADER_SRC = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;

uniform float u_time;
uniform vec2 u_res;
uniform float u_scroll;
uniform vec2 u_mouse;
uniform vec3 u_color;
uniform float u_intensity;
uniform float u_speed;
uniform float u_parallax;
uniform float u_mousePower;
uniform float u_grain;
uniform float u_vignette;

varying vec2 v_uv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += noise(p * frequency) * amplitude;
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = v_uv;
  float time = u_time * u_speed;

  vec2 parallaxOffset = vec2((u_scroll - 0.5) * u_parallax, (u_scroll - 0.5) * u_parallax * 0.6);
  vec2 mouseOffset = u_mouse * u_mousePower;
  uv += parallaxOffset + mouseOffset * 0.5;

  vec2 warp1 = vec2(fbm(uv * 2.8 + time * 0.35), fbm(uv * 2.8 - time * 0.4));
  vec2 warp2 = vec2(fbm((uv + warp1 * 0.35) * 3.6 - time * 0.25), fbm((uv - warp1 * 0.2) * 3.9 + time * 0.45));
  vec2 warped = uv + warp1 * 0.25 + warp2 * 0.18;

  float band = smoothstep(0.2, 0.85, sin(warped.y * 6.0 + warp2.x * 3.0 + time * 1.2) * 0.5 + 0.5);
  float structure = fbm(warped * 3.5 - time * 0.3);
  float glow = fbm(warped * 6.5 + time * 0.2);

  vec3 deepIndigo = vec3(0.05, 0.06, 0.10);
  vec3 highlight = vec3(0.93, 0.82, 1.0) * 0.8;

  vec3 color = mix(deepIndigo, u_color, band);
  color = mix(color, highlight, smoothstep(0.58, 0.95, structure));
  color += (u_color * 0.5 + highlight * 0.2) * pow(max(glow, 0.0), 3.5) * 0.4;
  color *= u_intensity;

  float dist = distance(uv, vec2(0.5));
  float vignette = smoothstep(1.05, 0.35, dist * u_vignette);
  color *= mix(0.72, 1.08, vignette);

  float grain = (hash(gl_FragCoord.xy + fract(time)) - 0.5) * u_grain;
  color += grain;

  color = clamp(color, 0.0, 1.0);
  gl_FragColor = vec4(color, 1.0);
}
`;

function BackgroundAurora({
  color = CONFIG.baseColor,
  intensity = CONFIG.defaultIntensity,
  speed = CONFIG.defaultSpeed,
} = {}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotionRef = useRef(false);
  const startTimeRef = useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl =
      canvas.getContext("webgl", {
        alpha: false,
        antialias: true,
        powerPreference: "low-power",
      }) || canvas.getContext("experimental-webgl");

    if (!gl) {
      return undefined;
    }

    let program;
    let vertexShader;
    let fragmentShader;
    let positionBuffer;
    let disposed = false;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader) || "Shader compile error";
        gl.deleteShader(shader);
        throw new Error(info);
      }
      return shader;
    };

    const createProgram = () => {
      vertexShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
      fragmentShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
      program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(program) || "Program link error";
        throw new Error(info);
      }
      gl.useProgram(program);
    };

    try {
      createProgram();
    } catch (error) {
      console.error("BackgroundAurora shader error", error);
      return undefined;
    }

    const positionLocation = gl.getAttribLocation(program, "a_position");
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
      ]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniformLocations = {
      time: gl.getUniformLocation(program, "u_time"),
      res: gl.getUniformLocation(program, "u_res"),
      scroll: gl.getUniformLocation(program, "u_scroll"),
      mouse: gl.getUniformLocation(program, "u_mouse"),
      color: gl.getUniformLocation(program, "u_color"),
      intensity: gl.getUniformLocation(program, "u_intensity"),
      speed: gl.getUniformLocation(program, "u_speed"),
      parallax: gl.getUniformLocation(program, "u_parallax"),
      mousePower: gl.getUniformLocation(program, "u_mousePower"),
      grain: gl.getUniformLocation(program, "u_grain"),
      vignette: gl.getUniformLocation(program, "u_vignette"),
    };

    const colorVec = hexToLinearRgb(color);

    gl.uniform3fv(uniformLocations.color, colorVec);
    gl.uniform1f(uniformLocations.intensity, intensity);
    gl.uniform1f(uniformLocations.speed, speed);
    gl.uniform1f(uniformLocations.parallax, CONFIG.parallax);
    gl.uniform1f(uniformLocations.mousePower, CONFIG.mouseSensitivity);
    gl.uniform1f(uniformLocations.grain, CONFIG.grainAmount);
    gl.uniform1f(uniformLocations.vignette, CONFIG.vignette);

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.STENCIL_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const state = {
      width: 0,
      height: 0,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    };

    const resize = () => {
      if (disposed) return;
      const { innerWidth, innerHeight } = window;
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = Math.max(1, Math.floor(innerWidth * state.dpr));
      state.height = Math.max(1, Math.floor(innerHeight * state.dpr));
      canvas.width = state.width;
      canvas.height = state.height;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      gl.viewport(0, 0, state.width, state.height);
      gl.uniform2f(uniformLocations.res, state.width, state.height);
    };

    const updateScroll = () => {
      const sy = window.scrollY || 0;
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      scrollRef.current = Math.min(1, Math.max(0, sy / max));
    };

    const updateMouse = (event) => {
      const { innerWidth, innerHeight } = window;
      const x = innerWidth > 0 ? event.clientX / innerWidth - 0.5 : 0;
      const y = innerHeight > 0 ? event.clientY / innerHeight - 0.5 : 0;
      mouseRef.current = { x, y };
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mediaQuery.matches;

    const drawFrame = (timestamp) => {
      if (disposed) return;
      gl.uniform1f(uniformLocations.time, (timestamp - startTimeRef.current) * 0.001);
      gl.uniform1f(uniformLocations.scroll, scrollRef.current);
      gl.uniform2f(uniformLocations.mouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform3fv(uniformLocations.color, colorVec);
      gl.uniform1f(uniformLocations.intensity, intensity);
      gl.uniform1f(uniformLocations.speed, speed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const render = (timestamp) => {
      if (prefersReducedMotionRef.current) {
        animationRef.current = null;
        drawFrame(timestamp);
        return;
      }
      drawFrame(timestamp);
      animationRef.current = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      } else if (!prefersReducedMotionRef.current && !animationRef.current) {
        startTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(render);
      }
    };

    const handleMotionChange = (event) => {
      prefersReducedMotionRef.current = event.matches;
      if (prefersReducedMotionRef.current) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        drawFrame(performance.now());
      } else if (!document.hidden && !animationRef.current) {
        startTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(render);
      }
    };

    resize();
    updateScroll();
    drawFrame(performance.now());
    if (!prefersReducedMotionRef.current) {
      animationRef.current = requestAnimationFrame(render);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("mousemove", updateMouse, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      disposed = true;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("mousemove", updateMouse);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleMotionChange);
      }
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (program) {
        if (vertexShader) gl.detachShader(program, vertexShader);
        if (fragmentShader) gl.detachShader(program, fragmentShader);
        gl.deleteProgram(program);
      }
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
    };
  }, [color, intensity, speed]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none mix-blend-screen" />;
}

export { CONFIG as BACKGROUND_AURORA_CONFIG };
export default BackgroundAurora;
