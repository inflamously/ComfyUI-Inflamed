export class EventEmitter<T> {

    private events: Array<(i: T) => void> = []

    subscribe(fn: (i: T) => void) {
        this.events.push(fn);
    }

    emit(value: T) {
        this.events.forEach((fn) => fn(value));
    }
}