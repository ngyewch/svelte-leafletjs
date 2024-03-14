import { SvelteComponent } from "svelte";
import { Popup, type PopupOptions } from 'leaflet';
declare const __propDef: {
    props: {
        events?: string[] | undefined;
        options?: PopupOptions | undefined;
        getPopup?: (() => Popup | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type PopupProps = typeof __propDef.props;
export type PopupEvents = typeof __propDef.events;
export type PopupSlots = typeof __propDef.slots;
export default class Popup extends SvelteComponent<PopupProps, PopupEvents, PopupSlots> {
    get getPopup(): () => Popup | undefined;
}
export {};
