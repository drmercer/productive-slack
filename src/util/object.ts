export type Obj = Record<string, any>;

export const includesProperties = (a: Obj) => (b: Obj): boolean => {
  return Object.entries(a).every(([key, val]) => b[key] === val);
}
