<script lang="ts">
    import {getContext} from 'svelte';
    import {Icon, type IconOptions, Marker} from 'leaflet';

    import type {MarkerProvider} from '../lib/context.js';

    const markerProvider = getContext<MarkerProvider>(Marker);

    export let iconUrl: string;
    export let options: IconOptions = {
        iconUrl: '',
    };

    let icon: Icon;

    $: {
        if (!icon) {
            const adjustedOptions = {...options};
            if (iconUrl) {
                adjustedOptions.iconUrl = iconUrl;
            }
            icon = new Icon(adjustedOptions);
            markerProvider().setIcon(icon);
        }
    }

    export function getIcon(): Icon | undefined {
        return icon;
    }
</script>
