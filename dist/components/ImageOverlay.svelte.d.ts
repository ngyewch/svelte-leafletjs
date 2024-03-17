import { SvelteComponent } from "svelte";
import { ImageOverlay, type ImageOverlayOptions, type LatLngBoundsExpression } from 'leaflet';
declare const __propDef: {
    props: {
        imageUrl: string;
        bounds: LatLngBoundsExpression;
        opacity?: number | undefined;
        zIndex?: number | undefined;
        options?: ImageOverlayOptions | undefined;
        events?: string[] | undefined;
        getImageOverlay?: (() => ImageOverlay | undefined) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ImageOverlayProps = typeof __propDef.props;
export type ImageOverlayEvents = typeof __propDef.events;
export type ImageOverlaySlots = typeof __propDef.slots;
export default class ImageOverlay extends SvelteComponent<ImageOverlayProps, ImageOverlayEvents, ImageOverlaySlots> {
    get getImageOverlay(): () => ImageOverlay | undefined;
}
export {};
