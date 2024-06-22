import { EventDecorator } from '@/decorators';
import { Event } from '@/interfaces';

@EventDecorator({ name: 'shardReconnecting' })
export default class extends Event {
    public run(id: number) {
        this.logger.info(`Shard: ${id} is now reconnecting`);
    }
}
