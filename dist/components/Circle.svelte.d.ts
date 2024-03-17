import { SvelteComponent } from "svelte";
import { Circle, type CircleOptions, type FillRule, type LatLngExpression, type LineCapShape, type LineJoinShape } from 'leaflet';
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
        options?: CircleOptions | undefined;
        events?: string[] | undefined;
        getCircle?: (() => Circle | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type CircleProps = typeof __propDef.props;
export type CircleEvents = typeof __propDef.events;
export type CircleSlots = typeof __propDef.slots;
export default class Circle extends SvelteComponent<CircleProps, CircleEvents, CircleSlots> {
    get getCircle(): () => Circle<any> | undefined;
}
export {};
