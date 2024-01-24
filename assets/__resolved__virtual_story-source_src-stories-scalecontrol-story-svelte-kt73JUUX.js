const __resolved__virtual_storySource_srcStoriesScalecontrolStorySvelte = `<script lang="ts">
    import type {Hst} from '@histoire/plugin-svelte';
    import {LeafletMap, ScaleControl, TileLayer} from 'svelte-leafletjs';
    import {Control, type MapOptions} from 'leaflet';
    import {DEFAULT_TILE_LAYER_OPTIONS, DEFAULT_TILE_URL} from './common.js';

    export let Hst: Hst;

    const mapOptions: MapOptions = {
        center: [1.364917, 103.822872],
        zoom: 11,
    };
    const scaleControlOptions: Control.ScaleOptions = {
        maxWidth: 200,
    };
<\/script>

<Hst.Story group="controls">
    <LeafletMap options={mapOptions}>
        <TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS}/>
        <ScaleControl position="bottomleft" options={scaleControlOptions}/>
    </LeafletMap>
</Hst.Story>
`;
export {
  __resolved__virtual_storySource_srcStoriesScalecontrolStorySvelte as default
};
//# sourceMappingURL=__resolved__virtual_story-source_src-stories-scalecontrol-story-svelte-kt73JUUX.js.map
