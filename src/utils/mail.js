// Ouvre la messagerie du visiteur ; propose Gmail si aucun client mail ne prend la main.
export function openMail(to, subject = "", body = "") {
  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const a = document.createElement("a");
  a.href = mailto;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();

  // If nothing stole focus after ~1s, gently offer Gmail compose.
  let timer;
  const cancelFallback = () => {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
    document.removeEventListener("visibilitychange", cancelFallback);
    window.removeEventListener("blur", cancelFallback);
  };

  document.addEventListener("visibilitychange", cancelFallback);
  window.addEventListener("blur", cancelFallback);

  timer = setTimeout(() => {
    if (document.visibilityState === "hidden" || !document.hasFocus()) return;
    const gmail = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmail, "_blank", "noopener,noreferrer");
    cancelFallback();
  }, 1200);
}
