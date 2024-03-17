import { SvelteComponent } from "svelte";
import { DivIcon, Icon, type LatLngExpression, Marker, type MarkerOptions } from 'leaflet';
declare const __propDef: {
    props: {
        latLng: LatLngExpression;
        zIndexOffset?: number | undefined;
        icon?: Icon | DivIcon | undefined;
        opacity?: number | undefined;
        options?: MarkerOptions | undefined;
        events?: string[] | undefined;
        getMarker?: (() => Marker | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type MarkerProps = typeof __propDef.props;
export type MarkerEvents = typeof __propDef.events;
export type MarkerSlots = typeof __propDef.slots;
export default class Marker extends SvelteComponent<MarkerProps, MarkerEvents, MarkerSlots> {
    get getMarker(): () => Marker<any> | undefined;
}
export {};
