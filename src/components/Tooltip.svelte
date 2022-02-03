<script>
    import {createEventDispatcher, getContext, onDestroy} from 'svelte';
    import L from 'leaflet';

    import EventBridge from '../lib/EventBridge';

    const {getLayer} = getContext(L.Layer);

    export let events = [];
    export let options = {}

    let tooltip;
    let element;

    const dispatch = createEventDispatcher();
    let eventBridge;

    $: {
        if (!tooltip) {
            tooltip = L.tooltip(options);
            eventBridge = new EventBridge(tooltip, dispatch, events);
            getLayer().bindTooltip(tooltip);
        }
        tooltip.setContent(element);
    }

    onDestroy(() => {
        eventBridge.unregister();
    });

    export function getTooltip() {
        return tooltip;
    }
</script>

<div style="display: none;">
    <div bind:this={element}>
        <slot/>
    </div>
</div>
