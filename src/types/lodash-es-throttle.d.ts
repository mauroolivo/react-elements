declare module "lodash-es/throttle" {
  type ThrottledFunction<F extends (...args: unknown[]) => unknown> = (
    ...args: Parameters<F>
  ) => ReturnType<F> & {
    cancel: () => void;
    flush: () => ReturnType<F> | undefined;
  };

  export default function throttle<F extends (...args: unknown[]) => unknown>(
    func: F,
    wait?: number,
    options?: { leading?: boolean; trailing?: boolean; maxWait?: number }
  ): ThrottledFunction<F>;
}
