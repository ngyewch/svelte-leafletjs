import { SvelteComponent } from "svelte";
import { CircleMarker, type CircleMarkerOptions, type FillRule, type LatLngExpression, type LineCapShape, type LineJoinShape } from 'leaflet';
declare const __propDef: {
    props: {
        latLng: LatLngExpression;
        radius?: number | undefined;
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
        options?: CircleMarkerOptions | undefined;
        events?: string[] | undefined;
        getCircleMarker?: (() => CircleMarker | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type CircleMarkerProps = typeof __propDef.props;
export type CircleMarkerEvents = typeof __propDef.events;
export type CircleMarkerSlots = typeof __propDef.slots;
export default class CircleMarker extends SvelteComponent<CircleMarkerProps, CircleMarkerEvents, CircleMarkerSlots> {
    get getCircleMarker(): () => CircleMarker<any> | undefined;
}
export {};
