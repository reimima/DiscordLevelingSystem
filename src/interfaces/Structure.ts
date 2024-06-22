import { type Logger, getLogger } from 'log4js';

export class Structure {
    protected readonly logger: Logger;

    protected constructor(category: string) {
        this.logger = getLogger(category);
    }
}
