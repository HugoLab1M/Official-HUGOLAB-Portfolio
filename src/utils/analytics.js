let gaLoaded = false;

const GA_ID = 'G-2YGFBZL9PD';

export function initAnalytics() {
  if (typeof window === 'undefined' || gaLoaded) return;

  if (document.querySelector(`script[data-ga-id="${GA_ID}"]`)) {
    gaLoaded = true;
    return;
  }

  gaLoaded = true;

  delete window[`ga-disable-${GA_ID}`];
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(){
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  script.setAttribute('data-ga-id', GA_ID);
  script.referrerPolicy = 'strict-origin-when-cross-origin';
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

export function disableAnalytics() {
  if (typeof window === 'undefined') return;
  window[`ga-disable-${GA_ID}`] = true;
}

export function getAnalyticsId() {
  return GA_ID;
}
