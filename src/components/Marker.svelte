<script lang="ts">
    import {createEventDispatcher, getContext, onDestroy, setContext} from 'svelte';
    import {DivIcon, Icon, type LatLngExpression, Layer, Map, Marker, type MarkerOptions} from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {LayerProvider, MapProvider, MarkerProvider} from '../lib/context.js';

    const LEAFLET_VERSION = '1.9.4';

    const dispatch = createEventDispatcher();
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

    export let latLng: LatLngExpression;
    export let zIndexOffset = 0;
    export let icon: Icon | DivIcon | undefined = undefined;
    export let opacity = 1.0;
    export let options: MarkerOptions = {};
    export let events: string[] = [];

    // TODO
    //export let rotationAngle = 0;
    //export let rotationOrigin = 'center bottom';

    let marker: Marker;
    let eventBridge: EventBridge;

    setContext<LayerProvider>(Layer, () => marker);
    setContext<MarkerProvider>(Marker, () => marker);

    $: {
        if (!marker) {
            marker = new Marker(latLng, options).addTo(mapProvider());
            eventBridge = new EventBridge(marker, dispatch, events);
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
    }

    onDestroy(() => {
        eventBridge.unregister();
        marker.removeFrom(mapProvider());
    });

    export function getMarker(): Marker | undefined {
        return marker;
    }
</script>

<div>
    {#if marker}
        <slot/>
    {/if}
</div>
