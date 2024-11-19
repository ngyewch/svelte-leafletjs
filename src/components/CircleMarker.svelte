<script lang="ts">
    import {getContext, onDestroy, setContext, type Snippet} from 'svelte';
    import {
        CircleMarker,
        type CircleMarkerOptions, type FillRule,
        type LatLngExpression,
        Layer,
        type LeafletEventHandlerFnMap,
        type LineCapShape, type LineJoinShape,
        Map
    } from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {LayerProvider, MapProvider} from '../lib/context.js';

    const mapProvider = getContext<MapProvider>(Map);

    interface Props {
        latLng: LatLngExpression;
        radius?: number;
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
        options?: CircleMarkerOptions;
        events?: LeafletEventHandlerFnMap;
        children?: Snippet;
    }

    let {
        latLng,
        radius = 10,
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
        options = {
            radius: 0
        },
        events = {},
        children
    }: Props = $props();

    let circleMarker = $state<CircleMarker>();
    let eventBridge = $state<EventBridge>();

    setContext<LayerProvider>(Layer, () => circleMarker);

    $effect(() => {
        const map = mapProvider();
        if (!map) {
            return;
        }
        if (!circleMarker) {
            circleMarker = new CircleMarker(latLng, options).addTo(map);
            eventBridge = new EventBridge(circleMarker, events);
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
    });

    onDestroy(() => {
        eventBridge?.unregister();

        const map = mapProvider();
        if (map) {
            circleMarker?.removeFrom(map);
        }
    });

    export function getCircleMarker(): CircleMarker | undefined {
        return circleMarker;
    }
</script>

<div>
    {#if circleMarker}
        {@render children?.()}
    {/if}
</div>
