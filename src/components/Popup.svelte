<script lang="ts">
    import {getContext, onDestroy, type Snippet} from 'svelte';
    import {Layer, Popup, type Content, type LeafletEventHandlerFnMap, type PopupOptions} from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {LayerProvider} from '../lib/context.js';

    const layerProvider = getContext<LayerProvider>(Layer);

    interface Props {
        events?: LeafletEventHandlerFnMap;
        options?: PopupOptions;
        children?: Snippet;
    }

    let { events = {}, options = {}, children }: Props = $props();

    let element = $state<HTMLElement>();
    let popup = $state<Popup>();
    let eventBridge = $state<EventBridge>();

    $effect(() => {
        if (!popup) {
            popup = new Popup(options);
            eventBridge = new EventBridge(popup, events);
            layerProvider()?.bindPopup(popup);
        }
        popup.setContent(element as Content);
    });

    onDestroy(() => {
        eventBridge?.unregister();
    });

    export function getPopup(): Popup | undefined {
        return popup;
    }
</script>

<div style="display: none;">
    <div bind:this={element}>
        {@render children?.()}
    </div>
</div>