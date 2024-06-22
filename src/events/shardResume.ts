import { EventDecorator } from '@/decorators';
import { Event } from '@/interfaces';

@EventDecorator({ name: 'shardResume' })
export default class extends Event {
    public run(id: number, replayedEvents: number) {
        this.logger.info(`Shard: ${id} has resumed.`, `Replayed: ${replayedEvents}`);
    }
}
