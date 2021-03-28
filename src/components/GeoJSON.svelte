<script>
    import {createEventDispatcher, getContext, onDestroy, setContext} from 'svelte';
    import L from 'leaflet';
    import axios from 'axios';

    import EventBridge from '../lib/EventBridge';

    const {getMap} = getContext(L);

    export let url;
    export let options = {};
    export let events = [];

    let geojson;

    setContext(L.Layer, {
        getLayer: () => geojson,
    });

    const dispatch = createEventDispatcher();
    let eventBridge;

    $: {
        if (!geojson) {
            geojson = L.geoJSON(null, options).addTo(getMap());
            eventBridge = new EventBridge(geojson, dispatch, events);
        }
        axios.get(url)
            .then(result => {
                geojson.clearLayers();
                geojson.addData(result.data);
            });
    }

    onDestroy(() => {
        eventBridge.unregister();
        geojson.removeFrom(getMap());
    });

    export function getGeoJSON() {
        return geojson;
    }
</script>

<div>
    {#if geojson}
        <slot/>
    {/if}
</div>
