<script lang="ts">
    import {getContext} from 'svelte';
    import {Icon, type BaseIconOptions, type IconOptions, Marker} from 'leaflet';

    import type {MarkerProvider} from '../lib/context.js';

    const markerProvider = getContext<MarkerProvider>(Marker);

    export let iconUrl: string;
    export let options: BaseIconOptions = {};

    let icon: Icon;

    $: {
        if (!icon) {
            const adjustedOptions: IconOptions = {
                ...options,
                iconUrl: iconUrl,
            };
            icon = new Icon(adjustedOptions);
            markerProvider().setIcon(icon);
        }
    }

    export function getIcon(): Icon | undefined {
        return icon;
    }
</script>
