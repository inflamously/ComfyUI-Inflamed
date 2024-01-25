/**
 * Wraps a predefined custom-event and event-target and allows listening and dispatching
 */
export class EventListener {

    private eventTarget = new EventTarget()

    constructor(public ev: Event) {
    }

    listen(eventHandler: EventListenerOrEventListenerObject) {
        this.eventTarget.addEventListener(this.ev.type, eventHandler)
    }

    remove(eventHandlerHandle: EventListenerOrEventListenerObject) {
        this.eventTarget.removeEventListener(this.ev.type, eventHandlerHandle)
    }

    dispatch<T>(payload: T) {
        if (this.ev instanceof CustomEvent) {
            this.eventTarget.dispatchEvent(new CustomEvent(this.ev.type, {
                detail: payload,
            }))
            return;
        }

        if (this.ev instanceof MessageEvent) {
            this.eventTarget.dispatchEvent(new MessageEvent(this.ev.type, {
                data: payload
            }))
            return;
        }

        this.eventTarget.dispatchEvent(this.ev)
    }
}

export const createEvent = <T>(props: {
    name: string,
    payload: T
}) => {
    const {name, payload = undefined} = props
    if (!name) {
        throw new Error("Cannot create CustomEvent without a name.")
    }
    return new CustomEvent(name, {
        detail: payload
    })
}