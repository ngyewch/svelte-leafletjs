const __resolved__virtual_storySource_srcStoriesTooltipStorySvelte = `<script lang="ts">
    import type {Hst} from '@histoire/plugin-svelte';
    import {LeafletMap, Marker, Popup, TileLayer, Tooltip} from 'svelte-leafletjs';
    import type {MapOptions} from 'leaflet';
    import {DEFAULT_TILE_LAYER_OPTIONS, DEFAULT_TILE_URL} from './common.js';

    export let Hst: Hst;

    const mapOptions: MapOptions = {
        center: [1.364917, 103.822872],
        zoom: 11,
    };
<\/script>

<Hst.Story group="ui-layers">
    <LeafletMap options={mapOptions}>
        <TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS}/>
        <Marker latLng={[1.282375, 103.864273]}>
            <Popup>Gardens by the Bay</Popup>
            <Tooltip>Gardens by the Bay</Tooltip>
        </Marker>
        <Marker latLng={[1.359167, 103.989441]}>
            <Popup><b>Changi Airport</b></Popup>
            <Tooltip><b>Changi Airport</b></Tooltip>
        </Marker>
    </LeafletMap>
</Hst.Story>
`;
export {
  __resolved__virtual_storySource_srcStoriesTooltipStorySvelte as default
};
//# sourceMappingURL=__resolved__virtual_story-source_src-stories-tooltip-story-svelte-K5FiCNfl.js.map
