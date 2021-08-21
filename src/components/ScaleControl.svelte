<script>
    import {getContext, onDestroy} from 'svelte';
    import L from 'leaflet';

    const {getMap} = getContext(L);

    export let position = 'topright';
    export let options = {};

    let scaleControl;

    $: {
        if (!scaleControl) {
            scaleControl = L.control.scale(options).addTo(getMap());
        }
        scaleControl.setPosition(position);
    }

    onDestroy(() => {
        scaleControl.remove();
    });

    export function getScaleControl() {
        return scaleControl;
    }
</script>
