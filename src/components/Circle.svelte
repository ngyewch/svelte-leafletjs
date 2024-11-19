<script lang="ts">
    import {getContext, onDestroy, setContext, type Snippet} from 'svelte';
    import {
        Circle,
        type CircleOptions, type FillRule,
        type LatLngExpression,
        Layer,
        type LeafletEventHandlerFnMap,
        type LineCapShape,
        type LineJoinShape,
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
        options?: CircleOptions;
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
            radius: 0,
        },
        events = {},
        children
    }: Props = $props();

    let circle = $state<Circle>();
    let eventBridge = $state<EventBridge>();

    setContext<LayerProvider>(Layer, () => circle);

    $effect(() => {
        const map = mapProvider();
        if (!map) {
            return;
        }
        if (!circle) {
            circle = new Circle(latLng, {...options, ...{radius: radius}}).addTo(map);
            eventBridge = new EventBridge(circle, events);
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
    });

    onDestroy(() => {
        eventBridge?.unregister();

        const map = mapProvider();
        if (map) {
            circle?.removeFrom(map);
        }
    });

    export function getCircle(): Circle | undefined {
        return circle;
    }
</script>

<div>
    {#if circle}
        {@render children?.()}
    {/if}
</div>
