<script>
    import {getContext} from 'svelte';
    import L from 'leaflet';

    const {getMarker} = getContext(L.Marker);

    export let options = {};

    let icon;
    let html;

    $: {
        icon = L.divIcon({...{html}, ...options});
        getMarker().setIcon(icon);
    }

    export function getIcon() {
        return icon;
    }
</script>

<div bind:this={html}>
    <slot></slot>
</div>
