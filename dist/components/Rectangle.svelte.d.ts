import { SvelteComponent } from "svelte";
import { type FillRule, type LatLngBoundsExpression, type LineCapShape, type LineJoinShape, type PolylineOptions, Rectangle } from 'leaflet';
declare const __propDef: {
    props: {
        latLngBounds: LatLngBoundsExpression;
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
        getRectangle?: (() => Rectangle | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type RectangleProps = typeof __propDef.props;
export type RectangleEvents = typeof __propDef.events;
export type RectangleSlots = typeof __propDef.slots;
export default class Rectangle extends SvelteComponent<RectangleProps, RectangleEvents, RectangleSlots> {
    get getRectangle(): () => Rectangle<any> | undefined;
}
export {};
