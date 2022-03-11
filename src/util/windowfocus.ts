import { debouncedListener } from "./listener";

export interface WindowFocusListenerOptions {
  focus?: () => void
  blur?: () => void
  debounceTimeMs?: number
}

const DefaultDebounceTimeMs = 1000;

export function debouncedWindowFocusListener(opts: WindowFocusListenerOptions) {
  const debounceTime = opts.debounceTimeMs || DefaultDebounceTimeMs;

  const teardownFocus = opts.focus && debouncedListener(debounceTime, 'focus', opts.focus, 'blur');
  const teardownBlur = opts.blur && debouncedListener(debounceTime, 'blur', opts.blur, 'focus');

  return () => {
    teardownFocus();
    teardownBlur();
  };
}
