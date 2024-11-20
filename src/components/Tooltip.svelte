<script lang="ts">
    import {getContext, onDestroy, type Snippet} from 'svelte';
    import {Layer, Tooltip, type Content, type LeafletEventHandlerFnMap, type TooltipOptions} from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {LayerProvider} from '../lib/context.js';

    const layerProvider = getContext<LayerProvider>(Layer);

    interface Props {
        events?: LeafletEventHandlerFnMap;
        options?: TooltipOptions;
        children?: Snippet;
    }

    let { events = {}, options = {}, children }: Props = $props();

    let element = $state<HTMLElement>();
    let tooltip = $state<Tooltip>();
    let eventBridge = $state<EventBridge>();

    $effect(() => {
        if (!tooltip) {
            tooltip = new Tooltip(options);
            eventBridge = new EventBridge(tooltip, events);
            layerProvider()?.bindTooltip(tooltip);
        }
        tooltip.setContent(element as Content);
    });

    onDestroy(() => {
        eventBridge?.unregister();
    });

    export function getTooltip(): Tooltip | undefined {
        return tooltip;
    }
</script>

<div style="display: none;">
    <div bind:this={element}>
        {@render children?.()}
    </div>
</div>
