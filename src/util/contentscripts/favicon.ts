export function freezeIcon() {
  const head = document.head;

  let iconUrl: string | undefined;

  const observer = new MutationObserver(() => {
    const iconEl: HTMLLinkElement = head.querySelector('head > link[rel~="icon"]')
    if (!iconEl) {
      return;
    }
    if (!iconUrl) {
      iconUrl = iconEl.href;
    }
    if (iconEl.href !== iconUrl) {
      console.info("favicon url changed")
      iconEl.href = iconUrl;
    }
  });
  observer.observe(head, { subtree: true, childList: true });
  console.info("Observing favicon for changes");

  return () => observer.disconnect();
}
