import { SvelteComponent } from "svelte";
import { Map, type MapOptions } from 'leaflet';
declare const __propDef: {
    props: {
        options?: MapOptions | undefined;
        events?: string[] | undefined;
        getMap?: (() => Map | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type LeafletMapProps = typeof __propDef.props;
export type LeafletMapEvents = typeof __propDef.events;
export type LeafletMapSlots = typeof __propDef.slots;
export default class LeafletMap extends SvelteComponent<LeafletMapProps, LeafletMapEvents, LeafletMapSlots> {
    get getMap(): () => Map | undefined;
}
export {};
