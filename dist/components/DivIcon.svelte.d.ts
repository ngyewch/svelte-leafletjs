import { SvelteComponent } from "svelte";
import { DivIcon, type DivIconOptions } from 'leaflet';
declare const __propDef: {
    props: {
        options?: DivIconOptions | undefined;
        getDivIcon?: (() => DivIcon | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type DivIconProps = typeof __propDef.props;
export type DivIconEvents = typeof __propDef.events;
export type DivIconSlots = typeof __propDef.slots;
export default class DivIcon extends SvelteComponent<DivIconProps, DivIconEvents, DivIconSlots> {
    get getDivIcon(): () => DivIcon | undefined;
}
export {};
