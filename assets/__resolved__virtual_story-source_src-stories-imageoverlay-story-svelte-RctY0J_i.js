const __resolved__virtual_storySource_srcStoriesImageoverlayStorySvelte = `<script lang="ts">
    import type {Hst} from '@histoire/plugin-svelte';
    import {ImageOverlay, LeafletMap, TileLayer} from 'svelte-leafletjs';
    import type {ImageOverlayOptions, LatLngBoundsExpression, MapOptions} from 'leaflet';
    import {DEFAULT_TILE_LAYER_OPTIONS, DEFAULT_TILE_URL} from './common.js';

    export let Hst: Hst;

    const mapOptions: MapOptions = {
        center: [1.364917, 103.822872],
        zoom: 11,
    };
    const imageOverlayOptions: ImageOverlayOptions = {
        opacity: 0.5,
    };
    const bounds: LatLngBoundsExpression = [[1.170, 103.565], [1.4836, 104.143]];
<\/script>

<Hst.Story group="raster-layers">
    <LeafletMap options={mapOptions}>
        <TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS}/>
        <ImageOverlay imageUrl="images/dpsri_70km_2021082110500000dBR.dpsri.png"
                      bounds={bounds}
                      options={imageOverlayOptions}/>
    </LeafletMap>
</Hst.Story>
`;
export {
  __resolved__virtual_storySource_srcStoriesImageoverlayStorySvelte as default
};
//# sourceMappingURL=__resolved__virtual_story-source_src-stories-imageoverlay-story-svelte-RctY0J_i.js.map
