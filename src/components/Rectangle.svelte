<script lang="ts">
    import {getContext, onDestroy, setContext, type Snippet} from 'svelte';
    import {
        type FillRule, type LatLngBoundsExpression,
        Layer,
        type LeafletEventHandlerFnMap,
        type LineCapShape,
        type LineJoinShape,
        Map,
        type PolylineOptions,
        Rectangle
    } from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {LayerProvider, MapProvider} from '../lib/context.js';

    const mapProvider = getContext<MapProvider>(Map);

    interface Props {
        latLngBounds: LatLngBoundsExpression;
        color?: string | undefined;
        weight?: number | undefined;
        opacity?: number | undefined;
        lineCap?: LineCapShape | undefined;
        lineJoin?: LineJoinShape | undefined;
        dashArray?: string | number[] | undefined;
        dashOffset?: string | undefined;
        fill?: boolean | undefined;
        fillColor?: string | undefined;
        fillOpacity?: number | undefined;
        fillRule?: FillRule | undefined;
        options?: PolylineOptions;
        events?: LeafletEventHandlerFnMap;
        children?: Snippet;
    }

    let {
        latLngBounds,
        color = '#3388ff',
        weight = 3,
        opacity = 1.0,
        lineCap = 'round',
        lineJoin = 'round',
        dashArray = undefined,
        dashOffset = undefined,
        fill = true,
        fillColor = '#3388ff',
        fillOpacity = 0.2,
        fillRule = 'evenodd',
        options = {},
        events = {},
        children
    }: Props = $props();

    let rectangle = $state<Rectangle>();
    let eventBridge = $state<EventBridge>();

    setContext<LayerProvider>(Layer, () => rectangle);

    $effect(() => {
        const map = mapProvider();
        if (!map) {
            return;
        }
        if (!rectangle) {
            rectangle = new Rectangle(latLngBounds, options).addTo(map);
            eventBridge = new EventBridge(rectangle, events);
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
    });

    onDestroy(() => {
        eventBridge?.unregister();

        const map = mapProvider();
        if (map) {
            rectangle?.removeFrom(map);
        }
    });

    export function getRectangle(): Rectangle | undefined {
        return rectangle;
    }
</script>

<div>
    {#if rectangle}
        {@render children?.()}
    {/if}
</div>
