import { EventDecorator } from '@/decorators';
import { Event } from '@/interfaces';

@EventDecorator({ name: 'shardError' })
export default class extends Event {
    public run(error: Error, id: number) {
        this.logger.info(`Shard ${id} error -`, error);
    }
}
