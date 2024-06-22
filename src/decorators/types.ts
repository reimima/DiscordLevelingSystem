// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Constructor<R = unknown> = new (..._args: any[]) => R;

export type ExtendClassDecorator<T extends Constructor, R = unknown> = (target: T) => R;
