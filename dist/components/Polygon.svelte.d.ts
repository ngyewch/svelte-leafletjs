import { SvelteComponent } from "svelte";
import { type FillRule, type LatLngExpression, type LineCapShape, type LineJoinShape, Polygon, type PolylineOptions } from 'leaflet';
declare const __propDef: {
    props: {
        latLngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][];
        color?: string | undefined;
        weight?: number | undefined;
        opacity?: number | undefined;
        lineCap?: LineCapShape | undefined;
        lineJoin?: LineJoinShape | undefined;
        dashArray?: string | number[] | undefined;
        dashOffset?: string | undefined;
        fill?: boolean | undefined;
        fillColor?: string | undefined;
        fillOpacity?: number | undefined;
        fillRule?: FillRule | undefined;
        options?: PolylineOptions | undefined;
        events?: string[] | undefined;
        getPolygon?: (() => Polygon | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type PolygonProps = typeof __propDef.props;
export type PolygonEvents = typeof __propDef.events;
export type PolygonSlots = typeof __propDef.slots;
export default class Polygon extends SvelteComponent<PolygonProps, PolygonEvents, PolygonSlots> {
    get getPolygon(): () => Polygon<any> | undefined;
}
export {};
