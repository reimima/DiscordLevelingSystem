import { EventDecorator } from '@/decorators';
import { Event } from '@/interfaces';

@EventDecorator({ name: 'error' })
export default class extends Event {
    public run(error: Error) {
        this.logger.error('DJS Error -', error);
    }
}
