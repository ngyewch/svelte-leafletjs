const __resolved__virtual_storySource_srcStoriesPopupStorySvelte = `<script lang="ts">
    import type {Hst} from '@histoire/plugin-svelte';
    import {Icon, LeafletMap, Marker, Popup, TileLayer} from 'svelte-leafletjs';
    import {type IconOptions, type MapOptions} from 'leaflet';
    import {DEFAULT_TILE_LAYER_OPTIONS, DEFAULT_TILE_URL} from './common.js';

    export let Hst: Hst;

    const mapOptions: MapOptions = {
        center: [1.364917, 103.822872],
        zoom: 11,
    };
    const iconOptions: IconOptions = {
        iconUrl: 'icons/airport.svg',
        iconSize: [41, 41],
        iconAnchor: [20, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
    };
<\/script>

<Hst.Story group="ui-layers">
    <LeafletMap options={mapOptions}>
        <TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS}/>
        <Marker latLng={[1.282375, 103.864273]}>
            <Popup>Gardens by the Bay</Popup>
        </Marker>
        <Marker latLng={[1.359167, 103.989441]}>
            <Icon iconUrl="icons/airport.svg" options={iconOptions}/>
            <Popup><b>Changi Airport</b></Popup>
        </Marker>
    </LeafletMap>
</Hst.Story>
`;
export {
  __resolved__virtual_storySource_srcStoriesPopupStorySvelte as default
};
//# sourceMappingURL=__resolved__virtual_story-source_src-stories-popup-story-svelte-29YIJKDv.js.map
