import { SvelteComponent } from "svelte";
import { GeoJSON, type GeoJSONOptions } from 'leaflet';
import type { GeoJsonObject } from 'geojson';
declare const __propDef: {
    props: {
        data?: GeoJsonObject | undefined;
        options?: GeoJSONOptions<any, import("geojson").Geometry> | undefined;
        events?: string[] | undefined;
        getGeoJSON?: (() => GeoJSON | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type GeoJsonProps = typeof __propDef.props;
export type GeoJsonEvents = typeof __propDef.events;
export type GeoJsonSlots = typeof __propDef.slots;
export default class GeoJson extends SvelteComponent<GeoJsonProps, GeoJsonEvents, GeoJsonSlots> {
    get getGeoJSON(): () => GeoJSON<any, import("geojson").Geometry> | undefined;
}
export {};
