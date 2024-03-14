import type { Evented } from 'leaflet';
import type { EventDispatcher } from 'svelte';
export default class EventBridge {
    private entity;
    private eventMap;
    constructor(entity: Evented, dispatch: EventDispatcher<any>, events?: string[]);
    unregister(): void;
}
