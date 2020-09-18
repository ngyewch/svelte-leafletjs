<script>
    import {getContext, onDestroy} from 'svelte';
    import L from 'leaflet';

    const {getMap} = getContext(L);

    export let url;
    export let opacity = 1.0;
    export let zIndex = 1;
    export let options = {};

    let tileLayer;

    $: {
        if (!tileLayer) {
            tileLayer = L.tileLayer(url, options).addTo(getMap());
        }
        tileLayer.setUrl(url);
        tileLayer.setOpacity(opacity);
        tileLayer.setZIndex(zIndex);
    }

    onDestroy(() => {
        tileLayer.removeFrom(getMap());
    });

    export function getTileLayer() {
        return tileLayer;
    }
</script>
