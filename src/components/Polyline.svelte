<script lang="ts">
    import {createEventDispatcher, getContext, onDestroy, setContext} from 'svelte';
    import {
        Map,
        type LatLngExpression,
        type LineCapShape,
        type LineJoinShape,
        type PolylineOptions,
        Polyline, Layer
    } from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {MapProvider} from '../lib/context.js';

    const dispatch = createEventDispatcher();
    const mapProvider = getContext<MapProvider>(Map);

    export let latLngs: LatLngExpression[] | LatLngExpression[][];
    export let color: string | undefined = '#3388ff';
    export let weight: number | undefined = 3;
    export let opacity: number | undefined = 1.0;
    export let lineCap: LineCapShape | undefined = 'round';
    export let lineJoin: LineJoinShape | undefined = 'round';
    export let dashArray: string | number[] | undefined = undefined;
    export let dashOffset: string | undefined = undefined;
    export let options: PolylineOptions = {};
    export let events: string[] = [];

    let polyline: Polyline;
    let eventBridge: EventBridge;

    setContext(Layer, () => polyline);

    $: {
        if (!polyline) {
            polyline = new Polyline(latLngs, options).addTo(mapProvider());
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
        polyline.removeFrom(mapProvider());
    });

    export function getPolyline(): Polyline | undefined {
        return polyline;
    }
</script>

<div>
    {#if polyline}
        <slot/>
    {/if}
</div>
