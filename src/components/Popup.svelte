<script>
    import {getContext} from 'svelte';
    import L from 'leaflet';

    const {getLayer} = getContext(L.Layer);

    let popup;
    let element;

    $: {
        if (!popup) {
            popup = L.popup();
            getLayer().bindPopup(popup);
        }
        popup.setContent(element);
    }

    export function getPopup() {
        return popup;
    }
</script>

<div style="display: none;">
    <div bind:this={element}>
        <slot/>
    </div>
</div>