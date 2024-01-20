<script lang="ts">
    import {createEventDispatcher, getContext, onDestroy, setContext} from 'svelte';
    import {
        CircleMarker,
        type CircleMarkerOptions, type FillRule,
        type LatLngExpression,
        Layer,
        type LineCapShape, type LineJoinShape,
        Map
    } from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {LayerProvider, MapProvider} from '../lib/context.js';

    const dispatch = createEventDispatcher();
    const mapProvider = getContext<MapProvider>(Map);

    export let latLng: LatLngExpression;
    export let radius = 10;
    export let color: string | undefined = '#3388ff';
    export let weight: number | undefined = 3;
    export let opacity: number | undefined = 1.0;
    export let lineCap: LineCapShape | undefined = 'round';
    export let lineJoin: LineJoinShape | undefined = 'round';
    export let dashArray: string | number[] | undefined = undefined;
    export let dashOffset: string | undefined = undefined;
    export let fill: boolean | undefined = true;
    export let fillColor: string | undefined = '#3388ff';
    export let fillOpacity: number | undefined = 0.2;
    export let fillRule: FillRule | undefined = 'evenodd';
    export let options: CircleMarkerOptions = {};
    export let events: string[] = [];

    let circleMarker: CircleMarker;
    let eventBridge: EventBridge;

    setContext<LayerProvider>(Layer, () => circleMarker);

    $: {
        if (!circleMarker) {
            circleMarker = new CircleMarker(latLng, options).addTo(mapProvider());
            eventBridge = new EventBridge(circleMarker, dispatch, events);
        }
        circleMarker.setLatLng(latLng);
        circleMarker.setRadius(radius);
        circleMarker.setStyle({
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
        circleMarker.removeFrom(mapProvider());
    });

    export function getCircleMarker(): CircleMarker | undefined {
        return circleMarker;
    }
</script>

<div>
    {#if circleMarker}
        <slot/>
    {/if}
</div>
