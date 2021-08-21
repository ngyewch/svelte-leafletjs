<script>
    import {createEventDispatcher, getContext, onDestroy} from 'svelte';
    import L from 'leaflet';

    import EventBridge from '../lib/EventBridge';

    const {getMap} = getContext(L);

    export let imageUrl;
    export let bounds;
    export let opacity = 1.0;
    export let zIndex = 1;
    export let options = {};
    export let events = [];

    let imageOverlay;

    const dispatch = createEventDispatcher();
    let eventBridge;

    $: {
        if (!imageOverlay) {
            imageOverlay = L.imageOverlay(imageUrl, bounds, options).addTo(getMap());
            eventBridge = new EventBridge(imageOverlay, dispatch, events);
        }
        imageOverlay.setUrl(imageUrl);
        imageOverlay.setOpacity(opacity);
        imageOverlay.setZIndex(zIndex);
    }

    onDestroy(() => {
        eventBridge.unregister();
        imageOverlay.removeFrom(getMap());
    });

    export function getImageOverlay() {
        return imageOverlay;
    }
</script>
