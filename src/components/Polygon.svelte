<script>
    import {getContext, onDestroy, setContext} from 'svelte';
    import L from 'leaflet';

    const {getMap} = getContext(L);

    export let latLngs;
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

    let polygon;

    setContext(L.Layer, {
        getLayer: () => polygon,
    });

    $: {
        if (!polygon) {
            polygon = L.polygon(latLngs, options).addTo(getMap());
        }
        polygon.setLatLngs(latLngs);
        polygon.setStyle({
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
        polygon.removeFrom(getMap());
    });

    export function getPolygon() {
        return polygon;
    }
</script>

<div>
    {#if polygon}
        <slot/>
    {/if}
</div>
