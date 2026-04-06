'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAManager() {
  const [showInstall, setShowInstall] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const waitingWorker = useRef<ServiceWorker | null>(null);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt.current) return;
    deferredPrompt.current.prompt();
    await deferredPrompt.current.userChoice;
    deferredPrompt.current = null;
    setShowInstall(false);
  }, []);

  const handleUpdate = useCallback(() => {
    waitingWorker.current?.postMessage({ type: 'SKIP_WAITING' });
    setShowUpdate(false);
  }, []);

  useEffect(() => {
    // Install prompt
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as unknown as { standalone?: boolean }).standalone;
      if (!isStandalone && !sessionStorage.getItem('pwa-install-dismissed')) {
        setShowInstall(true);
      }
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);

    // Service worker registration + update detection
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        setInterval(() => reg.update(), 30 * 60 * 1000);

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              waitingWorker.current = newWorker;
              setShowUpdate(true);
            }
          });
        });
      });

      // Seamless reload on controller change
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    }

    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
  }, []);

  return (
    <>
      {showInstall && (
        <div className="pwa-install-banner" role="alert" aria-live="polite">
          <div className="pwa-install-content">
            <i className="bi bi-download" aria-hidden="true"></i>
            <span>Install BetterSolano for quick access to services.</span>
          </div>
          <div className="pwa-install-actions">
            <button className="pwa-install-btn" onClick={handleInstall} aria-label="Install BetterSolano app">
              Install
            </button>
            <button
              className="pwa-install-dismiss"
              onClick={() => {
                sessionStorage.setItem('pwa-install-dismissed', '1');
                setShowInstall(false);
              }}
              aria-label="Dismiss install prompt"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {showUpdate && (
        <div className="sw-update-banner" role="alert" aria-live="polite">
          <span>A new version is available.</span>
          <button className="sw-update-btn" onClick={handleUpdate} aria-label="Update now">
            Update
          </button>
          <button
            className="sw-update-dismiss"
            onClick={() => setShowUpdate(false)}
            aria-label="Dismiss update notice"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
