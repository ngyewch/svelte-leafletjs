<script>
    import {createEventDispatcher, getContext, onDestroy} from 'svelte';
    import L from 'leaflet';

    import EventBridge from '../lib/EventBridge';

    const {getMap} = getContext(L);

    export let url;
    export let wms = false;
    export let opacity = 1.0;
    export let zIndex = 1;
    export let options = {};
    export let events = [];

    let tileLayer;

    const dispatch = createEventDispatcher();
    let eventBridge;

    $: {
        if (!tileLayer) {
            tileLayer = (!wms ? L.tileLayer(url, options) : L.tileLayer.wms(url, options)).addTo(getMap());
            eventBridge = new EventBridge(tileLayer, dispatch, events);
        }
        tileLayer.setUrl(url);
        tileLayer.setOpacity(opacity);
        tileLayer.setZIndex(zIndex);
    }

    onDestroy(() => {
        eventBridge.unregister();
        tileLayer.removeFrom(getMap());
    });

    export function getTileLayer() {
        return tileLayer;
    }
</script>
