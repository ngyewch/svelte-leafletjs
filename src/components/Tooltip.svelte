<script lang="ts">
    import {createEventDispatcher, getContext, onDestroy} from 'svelte';
    import {Layer, Tooltip, type TooltipOptions} from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {LayerProvider} from '../lib/context.js';

    const dispatch = createEventDispatcher();
    const layerProvider = getContext<LayerProvider>(Layer);

    export let events: string[] = [];
    export let options: TooltipOptions = {}

    let element: HTMLElement;
    let tooltip: Tooltip;
    let eventBridge: EventBridge;

    $: {
        if (!tooltip) {
            tooltip = new Tooltip(options);
            eventBridge = new EventBridge(tooltip, dispatch, events);
            layerProvider().bindTooltip(tooltip);
        }
        tooltip.setContent(element);
    }

    onDestroy(() => {
        eventBridge.unregister();
    });

    export function getTooltip(): Tooltip | undefined {
        return tooltip;
    }
</script>

<div style="display: none;">
    <div bind:this={element}>
        <slot/>
    </div>
</div>
