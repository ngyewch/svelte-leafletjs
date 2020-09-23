<script>
    import {createEventDispatcher, getContext, onDestroy, setContext} from 'svelte';
    import L from 'leaflet';

    import EventBridge from '../lib/EventBridge';

    const {getMap} = getContext(L);

    const defaultIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
    });

    export let latLng;
    export let zIndexOffset = 0;
    export let icon = defaultIcon;
    export let opacity = 1.0;
    export let options = {};
    export let events = [];

    export let rotationAngle = 0;
    export let rotationOrigin = 'center bottom';

    let marker;

    setContext(L.Layer, {
        getLayer: () => marker,
    });
    setContext(L.Marker, {
        getMarker: () => marker,
    });

    const dispatch = createEventDispatcher();
    let eventBridge;

    $: {
        if (!marker) {
            marker = L.marker(latLng, options).addTo(getMap());
            eventBridge = new EventBridge(marker, dispatch, events);
        }
        marker.setLatLng(latLng);
        marker.setZIndexOffset(zIndexOffset);
        marker.setIcon(icon);
        marker.setOpacity(opacity);

        marker.setRotationAngle(rotationAngle);
        marker.setRotationOrigin(rotationOrigin);
    }

    onDestroy(() => {
        eventBridge.unregister();
        marker.removeFrom(getMap());
    });

    export function getMarker() {
        return marker;
    }
</script>

<div>
    {#if marker}
        <slot/>
    {/if}
</div>
