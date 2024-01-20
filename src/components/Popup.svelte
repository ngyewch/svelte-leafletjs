<script lang="ts">
    import {createEventDispatcher, getContext, onDestroy} from 'svelte';
    import {Layer, Popup, type PopupOptions} from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {LayerProvider} from '../lib/context.js';

    const dispatch = createEventDispatcher();
    const layerProvider = getContext<LayerProvider>(Layer);

    export let events: string[] = [];
    export let options: PopupOptions = {}

    let element: HTMLElement;
    let popup: Popup;
    let eventBridge: EventBridge;

    $: {
        if (!popup) {
            popup = new Popup(options);
            eventBridge = new EventBridge(popup, dispatch, events);
            layerProvider().bindPopup(popup);
        }
        popup.setContent(element);
    }

    onDestroy(() => {
        eventBridge.unregister();
    });

    export function getPopup(): Popup | undefined {
        return popup;
    }
</script>

<div style="display: none;">
    <div bind:this={element}>
        <slot/>
    </div>
</div>