export function niceDurationString(ms: number): string {
  return ms > 60_000 ? `${Math.round(ms / 6000) / 10} minutes` : `${Math.ceil(ms / 1000)} seconds`;
}
