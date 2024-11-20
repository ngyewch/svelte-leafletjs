<script lang="ts">
    import {getContext, onDestroy} from 'svelte';
    import {Control, type ControlPosition, Map} from 'leaflet';

    import type {MapProvider} from '../lib/context.js';

    const mapProvider = getContext<MapProvider>(Map);

    interface Props {
        position?: ControlPosition;
        options?: Control.ScaleOptions;
    }

    let { position = 'topright', options = {} }: Props = $props();

    let scaleControl = $state<Control.Scale>();

    $effect(() => {
        const map = mapProvider();
        if (!map) {
            return;
        }
        if (!scaleControl) {
            scaleControl = new Control.Scale(options).addTo(map);
        }
        scaleControl.setPosition(position);
    });

    onDestroy(() => {
        scaleControl?.remove();
    });

    export function getScaleControl(): Control.Scale | undefined {
        return scaleControl;
    }
</script>
