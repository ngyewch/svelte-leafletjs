const __resolved__virtual_storySource_srcStoriesRectangleStorySvelte = `<script lang="ts">
    import type {Hst} from '@histoire/plugin-svelte';
    import {LeafletMap, Popup, Rectangle, TileLayer, Tooltip} from 'svelte-leafletjs';
    import {type LatLngBoundsExpression, type MapOptions} from 'leaflet';
    import {DEFAULT_TILE_LAYER_OPTIONS, DEFAULT_TILE_URL} from './common.js';

    export let Hst: Hst;

    const mapOptions: MapOptions = {
        center: [1.250111, 103.830933],
        zoom: 14,
    };
    const latLngBounds: LatLngBoundsExpression = [
        [1.23506, 103.80352],
        [1.26278, 103.85065]
    ];
<\/script>

<Hst.Story group="vector-layers">
    <LeafletMap options={mapOptions}>
        <TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS}/>
        <Rectangle latLngBounds={latLngBounds} color="#ff0000" fillColor="#ff0000">
            <Popup>Sentosa</Popup>
            <Tooltip>Sentosa</Tooltip>
        </Rectangle>
    </LeafletMap>
</Hst.Story>
`;
export {
  __resolved__virtual_storySource_srcStoriesRectangleStorySvelte as default
};
//# sourceMappingURL=__resolved__virtual_story-source_src-stories-rectangle-story-svelte-_K0tz3cD.js.map
