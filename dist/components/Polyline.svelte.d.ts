import { SvelteComponent } from "svelte";
import { type LatLngExpression, type LineCapShape, type LineJoinShape, type PolylineOptions, Polyline } from 'leaflet';
declare const __propDef: {
    props: {
        latLngs: LatLngExpression[] | LatLngExpression[][];
        color?: string | undefined;
        weight?: number | undefined;
        opacity?: number | undefined;
        lineCap?: LineCapShape | undefined;
        lineJoin?: LineJoinShape | undefined;
        dashArray?: string | number[] | undefined;
        dashOffset?: string | undefined;
        options?: PolylineOptions | undefined;
        events?: string[] | undefined;
        getPolyline?: (() => Polyline | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type PolylineProps = typeof __propDef.props;
export type PolylineEvents = typeof __propDef.events;
export type PolylineSlots = typeof __propDef.slots;
export default class Polyline extends SvelteComponent<PolylineProps, PolylineEvents, PolylineSlots> {
    get getPolyline(): () => Polyline<import("geojson").LineString | import("geojson").MultiLineString, any> | undefined;
}
export {};
