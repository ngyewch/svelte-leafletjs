import { SvelteComponent } from "svelte";
import { TileLayer, type TileLayerOptions } from 'leaflet';
declare const __propDef: {
    props: {
        url: string;
        opacity?: number | undefined;
        zIndex?: number | undefined;
        options?: TileLayerOptions | undefined;
        events?: string[] | undefined;
        getTileLayer?: (() => TileLayer | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TileLayerProps = typeof __propDef.props;
export type TileLayerEvents = typeof __propDef.events;
export type TileLayerSlots = typeof __propDef.slots;
export default class TileLayer extends SvelteComponent<TileLayerProps, TileLayerEvents, TileLayerSlots> {
    get getTileLayer(): () => TileLayer | undefined;
}
export {};
