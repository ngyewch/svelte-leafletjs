<script lang="ts">
    import {createEventDispatcher, getContext, onDestroy, setContext} from 'svelte';
    import {
        Map,
        type FillRule,
        type LatLngExpression, Layer,
        type LineCapShape,
        type LineJoinShape, Polygon,
        type PolylineOptions
    } from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {MapProvider} from '../lib/context.js';

    const dispatch = createEventDispatcher();
    const mapProvider = getContext<MapProvider>(Map);

    export let latLngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][];
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
    export let options: PolylineOptions = {};
    export let events: string[] = [];

    let polygon: Polygon;
    let eventBridge: EventBridge;

    setContext(Layer, () => polygon);

    $: {
        if (!polygon) {
            polygon = new Polygon(latLngs, options).addTo(mapProvider());
            eventBridge = new EventBridge(polygon, dispatch, events);
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
        eventBridge.unregister();
        polygon.removeFrom(mapProvider());
    });

    export function getPolygon(): Polygon | undefined {
        return polygon;
    }
</script>

<div>
    {#if polygon}
        <slot/>
    {/if}
</div>
