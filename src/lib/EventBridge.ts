import type {Evented, LeafletEvent, LeafletEventHandlerFn} from 'leaflet';
import type {EventDispatcher} from 'svelte';

export default class EventBridge {
    private entity: Evented;
    private eventMap: Record<string, LeafletEventHandlerFn> = {};

    constructor(entity: Evented, dispatch: EventDispatcher<any>, events: string[] = []) {
        this.entity = entity;

        if (events) {
            events.forEach(event => {
                if (event in this.eventMap) {
                    return;
                }
                const handler = function (e: LeafletEvent): void {
                    dispatch(event, e);
                };
                entity.on(event, handler);
                this.eventMap[event] = handler;
            });
        }
    }

    unregister(): void {
        Object.entries(this.eventMap).forEach(([event, handler]) => {
            this.entity.off(event, handler);
        });
    }
}