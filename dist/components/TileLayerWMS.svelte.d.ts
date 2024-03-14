import { SvelteComponent } from "svelte";
import { TileLayer, type WMSOptions } from 'leaflet';
declare const __propDef: {
    props: {
        url: string;
        opacity?: number | undefined;
        zIndex?: number | undefined;
        options?: WMSOptions | undefined;
        events?: string[] | undefined;
        getTileLayer?: (() => TileLayer.WMS | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TileLayerWmsProps = typeof __propDef.props;
export type TileLayerWmsEvents = typeof __propDef.events;
export type TileLayerWmsSlots = typeof __propDef.slots;
export default class TileLayerWms extends SvelteComponent<TileLayerWmsProps, TileLayerWmsEvents, TileLayerWmsSlots> {
    get getTileLayer(): () => TileLayer.WMS | undefined;
}
export {};
