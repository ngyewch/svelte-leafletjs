<script>
    import {createEventDispatcher, getContext, onDestroy} from 'svelte';
    import L from 'leaflet';

    import EventBridge from '../lib/EventBridge';

    const {getLayer} = getContext(L.Layer);

    export let events = [];

    let popup;
    let element;

    const dispatch = createEventDispatcher();
    let eventBridge;

    $: {
        if (!popup) {
            popup = L.popup();
            eventBridge = new EventBridge(popup, dispatch, events);
            getLayer().bindPopup(popup);
        }
        popup.setContent(element);
    }

    onDestroy(() => {
        eventBridge.unregister();
    });

    export function getPopup() {
        return popup;
    }
</script>

<div style="display: none;">
    <div bind:this={element}>
        <slot/>
    </div>
</div>