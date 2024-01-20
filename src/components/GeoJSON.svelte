<script lang="ts">
    import {createEventDispatcher, getContext, onDestroy, setContext} from 'svelte';
    import {GeoJSON, type GeoJSONOptions, Layer, Map} from 'leaflet';
    import type {GeoJsonObject} from 'geojson';

    import EventBridge from '../lib/EventBridge.js';
    import type {LayerProvider, MapProvider} from '../lib/context.js';

    const dispatch = createEventDispatcher();
    const mapProvider = getContext<MapProvider>(Map);

    export let data: GeoJsonObject | undefined = undefined;
    export let options: GeoJSONOptions = {};
    export let events: string[] = [];

    let geojson: GeoJSON;
    let eventBridge: EventBridge;

    setContext<LayerProvider>(Layer, () => geojson);

    $: {
        if (!geojson) {
            geojson = new GeoJSON(data, options).addTo(mapProvider());
            eventBridge = new EventBridge(geojson, dispatch, events);
        } else if (data) {
            geojson.clearLayers();
            geojson.addData(data);
        }
    }

    onDestroy(() => {
        eventBridge.unregister();
        geojson.removeFrom(mapProvider());
    });

    export function getGeoJSON(): GeoJSON | undefined {
        return geojson;
    }
</script>

<div>
    {#if geojson}
        <slot/>
    {/if}
</div>
