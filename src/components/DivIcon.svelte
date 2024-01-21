<script lang="ts">
    import {getContext} from 'svelte';
    import {DivIcon, type DivIconOptions, Marker} from 'leaflet';

    import type {MarkerProvider} from '../lib/context.js';

    const markerProvider = getContext<MarkerProvider>(Marker);

    export let options: DivIconOptions = {};

    let icon: DivIcon;
    let element: HTMLElement;

    $: {
        let adjustedOptions: DivIconOptions = options;
        if (!adjustedOptions.html) {
            adjustedOptions.html = element;
        }
        icon = new DivIcon(adjustedOptions);
        markerProvider().setIcon(icon);
    }

    export function getDivIcon(): DivIcon | undefined {
        return icon;
    }
</script>

<div bind:this={element}>
    <slot></slot>
</div>
