<script>
    import {createEventDispatcher, getContext, onDestroy, setContext} from 'svelte';
    import L from 'leaflet';

    import EventBridge from '../lib/EventBridge';

    const {getMap} = getContext(L);

    export let latLng;
    export let radius = 10;
    export let color = '#3388ff';
    export let weight = 3;
    export let opacity = 1.0;
    export let lineCap = 'round';
    export let lineJoin = 'round';
    export let dashArray = null;
    export let dashOffset = null;
    export let fill = true;
    export let fillColor = '#3388ff';
    export let fillOpacity = 0.2;
    export let fillRule = 'evenodd';
    export let options = {};
    export let events = [];

    let circle;

    setContext(L.Layer, {
        getLayer: () => circle,
    });

    const dispatch = createEventDispatcher();
    let eventBridge;

    $: {
        if (!circle) {
            circle = L.circle(latLng, options).addTo(getMap());
            eventBridge = new EventBridge(circle, dispatch, events);
        }
        circle.setLatLng(latLng);
        circle.setRadius(radius);
        circle.setStyle({
            color: color,
            weight: weight,
            opacity: opacity,
            lineCap: lineCap,
            lineJoin: lineJoin,
            dashArray: dashArray,
            dashOffset: dashOffset,
            fill: fill,
            fillColor: fillColor,
            fillOpacity: fillOpacity,
            fillRule: fillRule,
        });
    }

    onDestroy(() => {
        eventBridge.unregister();
        circle.removeFrom(getMap());
    });

    export function getCircle() {
        return circle;
    }
</script>

<div>
    {#if circle}
        <slot/>
    {/if}
</div>
