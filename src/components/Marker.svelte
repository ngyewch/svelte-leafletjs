<script lang="ts">
    import {getContext, onDestroy, setContext, type Snippet} from 'svelte';
    import {DivIcon, Icon, type LatLngExpression, Layer, type LeafletEventHandlerFnMap, Map, Marker, type MarkerOptions} from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {LayerProvider, MapProvider, MarkerProvider} from '../lib/context.js';

    const LEAFLET_VERSION = '1.9.4';

    const mapProvider = getContext<MapProvider>(Map);
    const defaultIcon = new Icon({
        iconUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/${LEAFLET_VERSION}/images/marker-icon.png`,
        iconRetinaUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/${LEAFLET_VERSION}/images/marker-icon-2x.png`,
        shadowUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/${LEAFLET_VERSION}/images/marker-shadow.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
    });

    interface Props {
        latLng: LatLngExpression;
        zIndexOffset?: number;
        icon?: Icon | DivIcon | undefined;
        opacity?: number;
        options?: MarkerOptions;
        events?: LeafletEventHandlerFnMap;
        children?: Snippet;
    }

    let {
        latLng,
        zIndexOffset = 0,
        icon = undefined,
        opacity = 1.0,
        options = {},
        events = {},
        children
    }: Props = $props();

    // TODO
    //export let rotationAngle = 0;
    //export let rotationOrigin = 'center bottom';

    let marker = $state<Marker>();
    let eventBridge = $state<EventBridge>();

    setContext<LayerProvider>(Layer, () => marker);
    setContext<MarkerProvider>(Marker, () => marker);

    $effect(() => {
        const map = mapProvider();
        if (!map) {
            return;
        }
        if (!marker) {
            marker = new Marker(latLng, options).addTo(map);
            eventBridge = new EventBridge(marker, events);
            if (icon === undefined) {
                marker.setIcon(defaultIcon);
            } else {
                marker.setIcon(icon)
            }
        } else {
            if (icon !== undefined) {
                marker.setIcon(icon)
            }
        }
        marker.setLatLng(latLng);
        marker.setZIndexOffset(zIndexOffset);
        marker.setOpacity(opacity);

        // TODO
        //marker.setRotationAngle(rotationAngle);
        //marker.setRotationOrigin(rotationOrigin);
    });

    onDestroy(() => {
        eventBridge?.unregister();

        const map = mapProvider();
        if (map) {
            marker?.removeFrom(map);
        }
    });

    export function getMarker(): Marker | undefined {
        return marker;
    }
</script>

<div>
    {#if marker}
        {@render children?.()}
    {/if}
</div>
