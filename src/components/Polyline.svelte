<script>
    import {createEventDispatcher, getContext, onDestroy, setContext} from 'svelte';
    import L from 'leaflet';

    import EventBridge from '../lib/EventBridge';

    const {getMap} = getContext(L);

    export let latLngs;
    export let color = '#3388ff';
    export let weight = 3;
    export let opacity = 1.0;
    export let lineCap = 'round';
    export let lineJoin = 'round';
    export let dashArray = null;
    export let dashOffset = null;
    export let options = {};
    export let events = [];

    let polyline;

    setContext(L.Layer, {
        getLayer: () => polyline,
    });

    const dispatch = createEventDispatcher();
    let eventBridge;

    $: {
        if (!polyline) {
            polyline = L.polyline(latLngs, options).addTo(getMap());
            eventBridge = new EventBridge(polyline, dispatch, events);
        }
        polyline.setLatLngs(latLngs);
        polyline.setStyle({
            color: color,
            weight: weight,
            opacity: opacity,
            lineCap: lineCap,
            lineJoin: lineJoin,
            dashArray: dashArray,
            dashOffset: dashOffset,
        });
    }

    onDestroy(() => {
        eventBridge.unregister();
        polyline.removeFrom(getMap());
    });

    export function getPolyline() {
        return polyline;
    }
</script>

<div>
    {#if polyline}
        <slot/>
    {/if}
</div>
