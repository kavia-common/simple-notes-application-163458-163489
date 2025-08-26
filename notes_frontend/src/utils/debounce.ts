//
// Simple debounce utility
//
// PUBLIC_INTERFACE
export function debounce<T extends (...args: any[]) => void>(fn: T, wait = 250) {
  /** Returns a debounced version of the provided function. */
  let t: number | undefined;
  return (...args: Parameters<T>) => {
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), wait);
  };
}
