<script>
    import {getContext, onDestroy, setContext} from 'svelte';
    import L from 'leaflet';

    const {getMap} = getContext(L);

    export let latLngBounds;
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

    let rectangle;

    setContext(L.Layer, {
        getLayer: () => rectangle,
    });

    $: {
        if (!rectangle) {
            rectangle = L.rectangle(latLngBounds, options).addTo(getMap());
        }
        rectangle.setBounds(latLngBounds);
        rectangle.setStyle({
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
        rectangle.removeFrom(getMap());
    });

    export function getRectangle() {
        return rectangle;
    }
</script>

<div>
    {#if rectangle}
        <slot/>
    {/if}
</div>
