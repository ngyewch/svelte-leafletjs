<script lang="ts">
    import {getContext, onDestroy} from 'svelte';
    import {Control, type ControlPosition, Map} from 'leaflet';

    import type {MapProvider} from '../lib/context.js';

    const mapProvider = getContext<MapProvider>(Map);

    export let position: ControlPosition = 'topright';
    export let options: Control.ScaleOptions = {};

    let scaleControl: Control.Scale;

    $: {
        if (!scaleControl) {
            scaleControl = new Control.Scale(options).addTo(mapProvider());
        }
        scaleControl.setPosition(position);
    }

    onDestroy(() => {
        scaleControl.remove();
    });

    export function getScaleControl(): Control.Scale | undefined {
        return scaleControl;
    }
</script>
