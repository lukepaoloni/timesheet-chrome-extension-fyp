export abstract class AbstractModel<T> {
    constructor(partial?: Partial<T>) {
        Object.assign(this, partial);
    }
}
