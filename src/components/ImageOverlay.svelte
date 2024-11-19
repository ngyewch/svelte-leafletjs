<script lang="ts">
    import {getContext, onDestroy} from 'svelte';
    import {ImageOverlay, Map, type ImageOverlayOptions, type LatLngBoundsExpression, type LeafletEventHandlerFnMap} from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {MapProvider} from '../lib/context.js';

    const mapProvider = getContext<MapProvider>(Map);

    interface Props {
        imageUrl: string;
        bounds: LatLngBoundsExpression;
        opacity?: number;
        zIndex?: number;
        options?: ImageOverlayOptions;
        events?: LeafletEventHandlerFnMap;
    }

    let {
        imageUrl,
        bounds,
        opacity = 1.0,
        zIndex = 1,
        options = {},
        events = {}
    }: Props = $props();

    let imageOverlay = $state<ImageOverlay>();
    let eventBridge = $state<EventBridge>();

    $effect(() => {
        const map = mapProvider();
        if (!map) {
            return;
        }
        if (!imageOverlay) {
            imageOverlay = new ImageOverlay(imageUrl, bounds, options).addTo(map);
            eventBridge = new EventBridge(imageOverlay, events);
        }
        imageOverlay.setUrl(imageUrl);
        imageOverlay.setOpacity(opacity);
        imageOverlay.setZIndex(zIndex);
    });

    onDestroy(() => {
        eventBridge?.unregister();

        const map = mapProvider();
        if (map) {
            imageOverlay?.removeFrom(map);
        }
    });

    export function getImageOverlay(): ImageOverlay | undefined {
        return imageOverlay;
    }
</script>
