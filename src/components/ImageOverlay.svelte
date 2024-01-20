<script lang="ts">
    import {createEventDispatcher, getContext, onDestroy} from 'svelte';
    import {ImageOverlay, Map, type ImageOverlayOptions, type LatLngBoundsExpression} from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {MapProvider} from '../lib/context.js';

    const dispatch = createEventDispatcher();
    const mapProvider = getContext<MapProvider>(Map);

    export let imageUrl: string;
    export let bounds: LatLngBoundsExpression;
    export let opacity = 1.0;
    export let zIndex = 1;
    export let options: ImageOverlayOptions = {};
    export let events: string[] = [];

    let imageOverlay: ImageOverlay;
    let eventBridge: EventBridge;

    $: {
        if (!imageOverlay) {
            imageOverlay = new ImageOverlay(imageUrl, bounds, options).addTo(mapProvider());
            eventBridge = new EventBridge(imageOverlay, dispatch, events);
        }
        imageOverlay.setUrl(imageUrl);
        imageOverlay.setOpacity(opacity);
        imageOverlay.setZIndex(zIndex);
    }

    onDestroy(() => {
        eventBridge.unregister();
        imageOverlay.removeFrom(mapProvider());
    });

    export function getImageOverlay(): ImageOverlay | undefined {
        return imageOverlay;
    }
</script>
