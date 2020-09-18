<script>
    import {getContext} from 'svelte';
    import L from 'leaflet';

    const {getLayer} = getContext(L.Layer);

    let tooltip;
    let element;

    $: {
        if (!tooltip) {
            tooltip = L.tooltip();
            getLayer().bindTooltip(tooltip);
        }
        tooltip.setContent(element);
    }

    export function getTooltip() {
        return tooltip;
    }
</script>

<div style="display: none;">
    <div bind:this={element}>
        <slot/>
    </div>
</div>