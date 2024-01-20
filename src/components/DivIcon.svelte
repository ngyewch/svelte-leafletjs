<script lang="ts">
    import {getContext} from 'svelte';
    import {DivIcon, type DivIconOptions, Marker} from 'leaflet';

    import type {MarkerProvider} from '../lib/context.js';

    const markerProvider = getContext<MarkerProvider>(Marker);

    export let options: DivIconOptions = {};

    let icon: DivIcon;
    let element: HTMLElement;

    $: {
        icon = new DivIcon({...options, ...{html: element}});
        markerProvider().setIcon(icon);
    }

    export function getIcon(): DivIcon | undefined {
        return icon;
    }
</script>

<div bind:this={element}>
    <slot></slot>
</div>
