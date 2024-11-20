<script lang="ts">
    import {getContext, onDestroy, setContext, type Snippet} from 'svelte';
    import {
        Map,
        type FillRule,
        type LatLngExpression, Layer,
        type LineCapShape,
        type LineJoinShape, Polygon,
        type PolylineOptions,

        type LeafletEventHandlerFnMap

    } from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {MapProvider} from '../lib/context.js';

    const mapProvider = getContext<MapProvider>(Map);

    interface Props {
        latLngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][];
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
        latLngs,
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

    let polygon = $state<Polygon>();
    let eventBridge = $state<EventBridge>();

    setContext(Layer, () => polygon);

    $effect(() => {
        const map = mapProvider();
        if (!map) {
            return;
        }
        if (!polygon) {
            polygon = new Polygon(latLngs, options).addTo(map);
            eventBridge = new EventBridge(polygon, events);
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
    });

    onDestroy(() => {
        eventBridge?.unregister();

        const map = mapProvider();
        if (map) {
            polygon?.removeFrom(map);
        }
    });

    export function getPolygon(): Polygon | undefined {
        return polygon;
    }
</script>

<div>
    {#if polygon}
        {@render children?.()}
    {/if}
</div>
