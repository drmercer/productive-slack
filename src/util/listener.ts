export function debouncedListener(
  debounceTimeMs: number,
  event: keyof WindowEventMap,
  listener: () => void,
  cancelEvent?: keyof WindowEventMap,
) {
  let debounceHandle = 0;
  const handler = () => {
    clearTimeout(debounceHandle);
    debounceHandle = setTimeout(listener, debounceTimeMs);
  }
  const cancelHandler = () => {
    clearTimeout(debounceHandle);
  }

  window.addEventListener(event, handler);
  if (cancelEvent) {
    window.addEventListener(cancelEvent, cancelHandler);
  }

  return () => {
    window.removeEventListener(event, handler);
    window.removeEventListener(cancelEvent, cancelHandler);
  };
}
