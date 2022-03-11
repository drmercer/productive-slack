const prefix = '[pslck]';

export const log = Object.assign((...args: unknown[]) => {
  console.log(prefix, ...args);
}, {
  error(...args: unknown[]) {
    console.error(prefix, ...args);
  },
  warn(...args: unknown[]) {
    console.warn(prefix, ...args);
  },
  info(...args: unknown[]) {
    console.info(prefix, ...args);
  },
  debug(...args: unknown[]) {
    console.debug(prefix, ...args);
  },
})
