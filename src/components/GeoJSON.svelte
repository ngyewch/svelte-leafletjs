<script lang="ts">
    import {getContext, onDestroy, setContext, type Snippet} from 'svelte';
    import {GeoJSON, type GeoJSONOptions, Layer, type LeafletEventHandlerFnMap, Map} from 'leaflet';
    import type {GeoJsonObject} from 'geojson';

    import EventBridge from '../lib/EventBridge.js';
    import type {LayerProvider, MapProvider} from '../lib/context.js';

    const mapProvider = getContext<MapProvider>(Map);

    interface Props {
        data?: GeoJsonObject | undefined;
        options?: GeoJSONOptions;
        events?: LeafletEventHandlerFnMap;
        children?: Snippet;
    }

    let {
        data = undefined,
        options = {},
        events = {},
        children
    }: Props = $props();

    let geojson = $state<GeoJSON>();
    let eventBridge = $state<EventBridge>();

    setContext<LayerProvider>(Layer, () => geojson);

    $effect(() => {
        const map = mapProvider();
        if (!map) {
            return;
        }
        if (!geojson) {
            geojson = new GeoJSON(data, options).addTo(map);
            eventBridge = new EventBridge(geojson, events);
        } else if (data) {
            geojson.clearLayers();
            geojson.addData(data);
        }
    });

    onDestroy(() => {
        eventBridge?.unregister();

        const map = mapProvider();
        if (map) {
            geojson?.removeFrom(map);
        }
    });

    export function getGeoJSON(): GeoJSON | undefined {
        return geojson;
    }
</script>

<div>
    {#if geojson}
        {@render children?.()}
    {/if}
</div>
