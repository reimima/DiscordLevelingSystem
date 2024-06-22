import type { Command, CommandConstructor, Event, EventConstructor } from '@/interfaces';
import type { Constructor, ExtendClassDecorator } from './types';

export function CommandDecorator<T extends Constructor<Command> = CommandConstructor>(
    data: Command['data'],
): ExtendClassDecorator<T, T> {
    return target =>
        new Proxy(target, {
            construct: (t, args: [Command['instance']]) => new t(...args, data),
        });
}

export function EventDecorator<T extends Constructor<Event> = EventConstructor>(
    data: Event['data'],
): ExtendClassDecorator<T, T> {
    return target =>
        new Proxy(target, {
            construct: (t, args: [Event['instance']]) => new t(...args, data),
        });
}
