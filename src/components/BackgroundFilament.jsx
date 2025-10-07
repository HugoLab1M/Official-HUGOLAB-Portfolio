import { useEffect, useRef } from "react";

const CONFIG = {
  color: "#8c52ff",
  baseThickness: 2.4,
  glowThickness: 18,
  glowAlpha: 0.12,
  coreAlpha: 0.82,
  speed: 0.22,
  parallax: 0.24,
  mouseParallax: 0.07,
  segmentStep: 8,
  diagonalTilt: 0.0014,
  basePosition: 0.48,
  ribbonWidth: 26,
  ribbonAlpha: 0.14,
  orbRadius: 160,
  orbAlpha: 0.18,
  orbPulse: 0.14,
};

function hexToRgb(hex) {
  let value = hex.replace("#", "");
  if (value.length === 3) {
    value = value
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const int = parseInt(value, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

export default function BackgroundFilament({ color = CONFIG.color }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotionRef = useRef(false);

  const handleEdgeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const state = {
      width: 0,
      height: 0,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      phase: Math.random() * Math.PI * 2,
    };

    const rgb = hexToRgb(color);
    const highlightRgb = {
      r: Math.min(rgb.r + 70, 255),
      g: Math.min(rgb.g + 70, 255),
      b: Math.min(rgb.b + 70, 255),
    };
    const shadowRgb = {
      r: Math.max(rgb.r - 90, 0),
      g: Math.max(rgb.g - 90, 0),
      b: Math.max(rgb.b - 90, 0),
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mediaQuery.matches;

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = Math.max(1, Math.floor(innerWidth * state.dpr));
      state.height = Math.max(1, Math.floor(innerHeight * state.dpr));
      canvas.width = state.width;
      canvas.height = state.height;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      drawStatic(performance.now());
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

    let lastTime = performance.now();

    const buildGeometry = () => {
      const { width, height, dpr } = state;
      if (!width || !height) return null;

      const step = CONFIG.segmentStep * dpr;
      const points = [];
      const mainPath = new Path2D();
      const baseX =
        width * CONFIG.basePosition +
        (scrollRef.current - 0.5) * CONFIG.parallax * width +
        mouseRef.current.x * CONFIG.mouseParallax * width;

      const amp1 = width * 0.07;
      const amp2 = width * 0.04;
      const amp3 = width * 0.03;
      const freq1 = 0.0042;
      const freq2 = 0.0065;
      const freq3 = 0.0088;
      const phase = state.phase;

      for (let y = -step; y <= height + step; y += step) {
        const py = y / dpr;
        const composite =
          amp1 * Math.sin(freq1 * py + phase) +
          amp2 * Math.sin(freq2 * py + phase * 0.6 + scrollRef.current * Math.PI * 1.5) +
          amp3 * Math.sin(freq3 * py + phase * 1.4 - scrollRef.current * Math.PI * 0.8);
        const tilt = (py - height / (2 * dpr)) * CONFIG.diagonalTilt * width;
        const mouseOffset = mouseRef.current.y * CONFIG.mouseParallax * width;
        const x = baseX + composite + tilt + mouseOffset;
        const canvasY = Math.max(-200, Math.min(height + 200, y));
        points.push({ x, y: canvasY });
        if (points.length === 1) {
          mainPath.moveTo(x, canvasY);
        } else {
          mainPath.lineTo(x, canvasY);
        }
      }

      return { mainPath, points };
    };

    const createRibbonPath = (points, offset) => {
      if (!points || points.length < 2) return null;
      const ribbon = new Path2D();
      points.forEach((pt, idx) => {
        const x = pt.x + offset;
        if (idx === 0) {
          ribbon.moveTo(x, pt.y);
        } else {
          ribbon.lineTo(x, pt.y);
        }
      });
      for (let i = points.length - 1; i >= 0; i -= 1) {
        const pt = points[i];
        ribbon.lineTo(pt.x - offset, pt.y);
      }
      ribbon.closePath();
      return ribbon;
    };

    const drawRibbon = (points) => {
      if (!points || points.length < 2) return;
      const { dpr } = state;
      const ribbon = createRibbonPath(points, CONFIG.ribbonWidth * dpr);
      if (!ribbon) return;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const gradient = ctx.createLinearGradient(0, 0, state.width, state.height);
      gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${CONFIG.ribbonAlpha * 0.7})`);
      gradient.addColorStop(0.5, `rgba(${highlightRgb.r}, ${highlightRgb.g}, ${highlightRgb.b}, ${CONFIG.ribbonAlpha * 1.4})`);
      gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${CONFIG.ribbonAlpha * 0.7})`);
      ctx.fillStyle = gradient;
      ctx.fill(ribbon);
      ctx.restore();
    };

    const drawOrbs = (points, time) => {
      if (!points || points.length === 0) return;
      const positions = [0.2, 0.45, 0.7, 0.9];
      positions.forEach((ratio, idx) => {
        const index = Math.min(points.length - 1, Math.floor(points.length * ratio));
        const pt = points[index];
        if (!pt) return;
        const pulse = 1 + Math.sin(time / 1200 + idx) * CONFIG.orbPulse;
        const radius = CONFIG.orbRadius * pulse;
        const gradient = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, radius);
        gradient.addColorStop(0, `rgba(${highlightRgb.r}, ${highlightRgb.g}, ${highlightRgb.b}, ${CONFIG.orbAlpha})`);
        gradient.addColorStop(1, "rgba(12,12,20,0)");
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = gradient;
        ctx.fillRect(pt.x - radius, pt.y - radius, radius * 2, radius * 2);
        ctx.restore();
      });
    };

    const strokeFilament = (path) => {
      const { dpr } = state;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = CONFIG.glowThickness * dpr;
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${CONFIG.glowAlpha})`;
      ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${CONFIG.glowAlpha})`;
      ctx.shadowBlur = 50 * dpr;
      ctx.stroke(path);
      ctx.restore();

      ctx.save();
      ctx.lineWidth = CONFIG.baseThickness * dpr * 4;
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(CONFIG.coreAlpha, 1) * 0.35})`;
      ctx.stroke(path);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "multiply";
      ctx.lineWidth = CONFIG.baseThickness * dpr * 1.7;
      ctx.strokeStyle = `rgba(${shadowRgb.r}, ${shadowRgb.g}, ${shadowRgb.b}, 0.28)`;
      ctx.shadowColor = `rgba(${shadowRgb.r}, ${shadowRgb.g}, ${shadowRgb.b}, 0.22)`;
      ctx.shadowBlur = 28 * dpr;
      ctx.shadowOffsetY = 16 * dpr;
      ctx.stroke(path);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = CONFIG.baseThickness * dpr * 0.85;
      ctx.strokeStyle = `rgba(${highlightRgb.r}, ${highlightRgb.g}, ${highlightRgb.b}, 0.6)`;
      ctx.shadowColor = `rgba(${highlightRgb.r}, ${highlightRgb.g}, ${highlightRgb.b}, 0.45)`;
      ctx.shadowBlur = 16 * dpr;
      ctx.shadowOffsetY = -10 * dpr;
      ctx.stroke(path);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = CONFIG.baseThickness * dpr;
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${CONFIG.coreAlpha})`;
      ctx.stroke(path);
      ctx.restore();
    };

    const drawFrame = (timestamp) => {
      const geo = buildGeometry();
      if (!geo?.mainPath) return;
      ctx.clearRect(0, 0, state.width, state.height);
      drawRibbon(geo.points);
      strokeFilament(geo.mainPath);
      drawOrbs(geo.points, timestamp);
    };

    const drawStatic = (timestamp) => {
      if (prefersReducedMotionRef.current) {
        drawFrame(timestamp);
      }
    };

    const render = (now) => {
      if (prefersReducedMotionRef.current) {
        animationRef.current = null;
        return;
      }

      const dt = Math.min(100, now - lastTime);
      lastTime = now;
      state.phase += (dt / 1000) * CONFIG.speed * Math.PI * 2;

      drawFrame(now);
      animationRef.current = requestAnimationFrame(render);
    };

    const start = () => {
      if (!prefersReducedMotionRef.current && !animationRef.current && !document.hidden) {
        lastTime = performance.now();
        animationRef.current = requestAnimationFrame(render);
      }
    };

    const stop = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        updateScroll();
        resize();
        start();
      }
    };

    const handleMotionChange = (event) => {
      prefersReducedMotionRef.current = event.matches;
      if (prefersReducedMotionRef.current) {
        stop();
        drawStatic(performance.now());
      } else {
        start();
      }
    };

    resize();
    updateScroll();
    drawStatic(performance.now());
    start();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("mousemove", updateMouse, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("mousemove", updateMouse);
      document.removeEventListener("visibilitychange", handleVisibility);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, [color]);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-75" />
      <button
        type="button"
        onClick={handleEdgeClick}
        className="fixed right-0 top-0 z-20 hidden h-full w-12 cursor-pointer items-center justify-center bg-gradient-to-l from-transparent via-transparent to-transparent text-xl font-semibold text-white/40 transition hover:text-white/80 hover:backdrop-blur-sm md:flex"
        aria-label="Revenir en haut"
      >
        ^
      </button>
    </>
  );
}
