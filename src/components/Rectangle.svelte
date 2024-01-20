<script lang="ts">
    import {createEventDispatcher, getContext, onDestroy, setContext} from 'svelte';
    import {
        type FillRule, type LatLngBoundsExpression,
        Layer,
        type LineCapShape,
        type LineJoinShape,
        Map,
        type PolylineOptions,
        Rectangle
    } from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {LayerProvider, MapProvider} from '../lib/context.js';

    const dispatch = createEventDispatcher();
    const mapProvider = getContext<MapProvider>(Map);

    export let latLngBounds: LatLngBoundsExpression;
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

    let rectangle: Rectangle;
    let eventBridge: EventBridge;

    setContext<LayerProvider>(Layer, () => rectangle);

    $: {
        if (!rectangle) {
            rectangle = new Rectangle(latLngBounds, options).addTo(mapProvider());
            eventBridge = new EventBridge(rectangle, dispatch, events);
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
        eventBridge.unregister();
        rectangle.removeFrom(mapProvider());
    });

    export function getRectangle(): Rectangle | undefined {
        return rectangle;
    }
</script>

<div>
    {#if rectangle}
        <slot/>
    {/if}
</div>
