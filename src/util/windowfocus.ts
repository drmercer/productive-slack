export interface WindowFocusListenerOptions {
  focus?: () => void
  blur?: () => void
  debounceTimeMs?: number
}

const DefaultDebounceTimeMs = 1000;

export function debouncedWindowFocusListener(opts: WindowFocusListenerOptions) {
  let focusDebounceHandle = 0;
  let blurDebounceHandle = 0;
  const debounceTime = opts.debounceTimeMs || DefaultDebounceTimeMs;

  const focusListener = () => {
    clearTimeout(focusDebounceHandle);
    clearTimeout(blurDebounceHandle);
    const callback = opts.focus;
    if (callback) {
      focusDebounceHandle = setTimeout(callback, debounceTime);
    }
  };
  const blurListener = () => {
    clearTimeout(focusDebounceHandle);
    clearTimeout(blurDebounceHandle);
    const callback = opts.blur;
    if (callback) {
      blurDebounceHandle = setTimeout(callback, debounceTime);
    }
  };

  window.addEventListener('focus', focusListener);
  window.addEventListener('blur', blurListener);

  return () => {
    window.removeEventListener('focus', focusListener);
    window.removeEventListener('blur', blurListener);
  };
}
