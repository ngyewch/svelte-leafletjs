<script lang="ts">
    import {getContext, type Snippet} from 'svelte';
    import {DivIcon, type DivIconOptions, Marker} from 'leaflet';

    import type {MarkerProvider} from '../lib/context.js';

    const markerProvider = getContext<MarkerProvider>(Marker);

    interface Props {
        options?: DivIconOptions;
        children?: Snippet;
    }

    let { options = {}, children }: Props = $props();

    let icon = $state<DivIcon>();
    let element = $state<HTMLElement>();

    $effect(() => {
        if (!icon) {
            let adjustedOptions: DivIconOptions = options;
            if (!adjustedOptions.html) {
                adjustedOptions.html = element;
            }
            icon = new DivIcon(adjustedOptions);
            markerProvider()?.setIcon(icon);
        }
    });

    export function getDivIcon(): DivIcon | undefined {
        return icon;
    }
</script>

<div bind:this={element}>
  {@render children?.()}
</div>
