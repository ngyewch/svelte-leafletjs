import { SvelteComponent } from "svelte";
import { Icon, type BaseIconOptions, type IconOptions } from 'leaflet';
declare const __propDef: {
    props: {
        iconUrl: string;
        options?: BaseIconOptions | undefined;
        getIcon?: (() => Icon | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type IconProps = typeof __propDef.props;
export type IconEvents = typeof __propDef.events;
export type IconSlots = typeof __propDef.slots;
export default class Icon extends SvelteComponent<IconProps, IconEvents, IconSlots> {
    get getIcon(): () => Icon<IconOptions> | undefined;
}
export {};
