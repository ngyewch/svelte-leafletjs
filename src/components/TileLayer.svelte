<script lang="ts">
    import {createEventDispatcher, getContext, onDestroy} from 'svelte';
    import {Map, TileLayer, type TileLayerOptions} from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {MapProvider} from '../lib/context.js';

    const dispatch = createEventDispatcher();
    const mapProvider = getContext<MapProvider>(Map);

    export let url: string;
    export let opacity = 1.0;
    export let zIndex = 1;
    export let options: TileLayerOptions = {};
    export let events: string[] = [];

    let tileLayer: TileLayer;
    let eventBridge: EventBridge;

    $: {
        if (!tileLayer) {
            tileLayer = new TileLayer(url, options).addTo(mapProvider());
            eventBridge = new EventBridge(tileLayer, dispatch, events);
        }
        tileLayer.setUrl(url);
        tileLayer.setOpacity(opacity);
        tileLayer.setZIndex(zIndex);
    }

    onDestroy(() => {
        eventBridge.unregister();
        tileLayer.removeFrom(mapProvider());
    });

    export function getTileLayer(): TileLayer | undefined {
        return tileLayer;
    }
</script>
