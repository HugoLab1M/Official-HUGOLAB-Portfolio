export default function TallyModal({ url, onClose, title }) {
  if (!url) return null;

  return (
    <div className="fixed inset-0 z-[120]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-neutral-900 md:h-[90vh]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-50">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-1 text-sm border border-neutral-300 text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              Fermer ✕
            </button>
          </div>
          <iframe
            title={title}
            src={url}
            className="h-[calc(100%-48px)] w-full"
            allow="fullscreen"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </div>
    </div>
  );
}
