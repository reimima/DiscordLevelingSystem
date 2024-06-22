import { EventDecorator } from '@/decorators';
import { Event } from '@/interfaces';

@EventDecorator({ name: 'warn' })
export default class extends Event {
    public run(message: string) {
        this.logger.warn('DJS Warning -', message);
    }
}
