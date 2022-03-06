
/**
 * Applies the given transformation to the document's title, and applies it again every time the title
 * is updated by something other than this.
 *
 * Adapted from https://github.com/sylouuu/chrome-tab-modifier/blob/9310ad527d/src/js/content.js#L186-L208
 */
export function liveTransformTitle(transform: (title: string) => string): () => void {
  // This ensures that a <title> element exists
  document.title = transform(document.title ?? '');
  const titleEl = document.querySelector('head > title');

  let isTransforming = false; // this flag exists to avoid reacting to our own changes in an infinite loop

  const observer = new MutationObserver((mutations) => {
    if (isTransforming) {
      isTransforming = false;
    } else if (mutations.length) {
      isTransforming = true;
      document.title = transform(document.title);
    }
  });
  observer.observe(titleEl, {
    subtree: true,
    characterData: true,
    childList: true
  });

  return () => observer.disconnect();
}

/**
 * Creates a function that can be called to set the document title
 */
export function overrideTitle() {
  let title = document.title;
  liveTransformTitle(() => title);

  return (newTitle: string) => {
    title = newTitle;
    document.title = title;
  };
}
