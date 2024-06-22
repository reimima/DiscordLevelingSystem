import { EventDecorator } from '@/decorators';
import { Event } from '@/interfaces';

@EventDecorator({ name: 'shardDisconnect' })
export default class extends Event {
    public run(event: CloseEvent, id: number) {
        this.logger.info(
            `Shard: ${id} has disconnected.`,
            `Code: ${event.code}, Reason: ${event.reason}`,
        );
    }
}
