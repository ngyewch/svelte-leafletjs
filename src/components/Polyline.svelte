<script lang="ts">
    import {getContext, onDestroy, setContext, type Snippet} from 'svelte';
    import {
        Map,
        type LatLngExpression,
        type LineCapShape,
        type LineJoinShape,
        type PolylineOptions,
        Polyline, Layer,
        type LeafletEventHandlerFnMap
    } from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {MapProvider} from '../lib/context.js';

    const mapProvider = getContext<MapProvider>(Map);

    interface Props {
        latLngs: LatLngExpression[] | LatLngExpression[][];
        color?: string | undefined;
        weight?: number | undefined;
        opacity?: number | undefined;
        lineCap?: LineCapShape | undefined;
        lineJoin?: LineJoinShape | undefined;
        dashArray?: string | number[] | undefined;
        dashOffset?: string | undefined;
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
        options = {},
        events = {},
        children
    }: Props = $props();

    let polyline = $state<Polyline>();
    let eventBridge = $state<EventBridge>();

    setContext(Layer, () => polyline);

    $effect(() => {
        const map = mapProvider();
        if (!map) {
            return;
        }
        if (!polyline) {
            polyline = new Polyline(latLngs, options).addTo(map);
            eventBridge = new EventBridge(polyline, events);
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
    });

    onDestroy(() => {
        eventBridge?.unregister();

        const map = mapProvider();
        if (map) {
            polyline?.removeFrom(map);
        }
    });

    export function getPolyline(): Polyline | undefined {
        return polyline;
    }
</script>

<div>
    {#if polyline}
        {@render children?.()}
    {/if}
</div>
