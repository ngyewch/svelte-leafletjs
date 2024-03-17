import { SvelteComponent } from "svelte";
import { Tooltip, type TooltipOptions } from 'leaflet';
declare const __propDef: {
    props: {
        events?: string[] | undefined;
        options?: TooltipOptions | undefined;
        getTooltip?: (() => Tooltip | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TooltipProps = typeof __propDef.props;
export type TooltipEvents = typeof __propDef.events;
export type TooltipSlots = typeof __propDef.slots;
export default class Tooltip extends SvelteComponent<TooltipProps, TooltipEvents, TooltipSlots> {
    get getTooltip(): () => Tooltip | undefined;
}
export {};
