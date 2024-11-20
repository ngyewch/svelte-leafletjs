import type {Evented, LeafletEventHandlerFnMap} from 'leaflet';

export default class EventBridge {
    constructor(
        private readonly entity: Evented,
        private readonly events: LeafletEventHandlerFnMap = {}
    ) {
        this.entity.on(this.events);
    }

    unregister(): void {
        this.entity.off(this.events);
    }
}