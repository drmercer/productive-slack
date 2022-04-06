import { log } from "../log";

export function freezeIcon(url?: string) {
  const head = document.head;

  let iconUrl: string | undefined = url;

  const checkIconUrl = () => {
    const iconEl: HTMLLinkElement = head.querySelector('head > link[rel~="icon"]')
    if (!iconEl) {
      return;
    }
    if (!iconUrl) {
      iconUrl = iconEl.href;
    }
    if (iconEl.href !== iconUrl) {
      log.info("favicon url changed")
      iconEl.href = iconUrl;
    }
  };

  const observer = new MutationObserver(checkIconUrl);
  observer.observe(head, { subtree: true, childList: true });

  checkIconUrl();
  log.info("Observing favicon for changes");

  return () => observer.disconnect();
}
