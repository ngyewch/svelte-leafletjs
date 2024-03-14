import { SvelteComponent } from "svelte";
import { Control, type ControlPosition } from 'leaflet';
declare const __propDef: {
    props: {
        position?: ControlPosition | undefined;
        options?: Control.ScaleOptions | undefined;
        getScaleControl?: (() => Control.Scale | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ScaleControlProps = typeof __propDef.props;
export type ScaleControlEvents = typeof __propDef.events;
export type ScaleControlSlots = typeof __propDef.slots;
export default class ScaleControl extends SvelteComponent<ScaleControlProps, ScaleControlEvents, ScaleControlSlots> {
    get getScaleControl(): () => Control.Scale | undefined;
}
export {};
