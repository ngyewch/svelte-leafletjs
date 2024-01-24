const __resolved__virtual_storySource_srcStoriesGeojsonStorySvelte = `<script lang="ts">
    import type {Hst} from '@histoire/plugin-svelte';
    import {GeoJSON, LeafletMap, TileLayer} from 'svelte-leafletjs';
    import type {GeoJSONOptions, MapOptions} from 'leaflet';
    import type {GeoJsonObject} from 'geojson';
    import {onMount} from 'svelte';
    import {DEFAULT_TILE_LAYER_OPTIONS, DEFAULT_TILE_URL} from './common.js';

    export let Hst: Hst;

    const mapOptions: MapOptions = {
        center: [1.250111, 103.830933],
        zoom: 14,
    };
    const geoJsonOptions: GeoJSONOptions = {
        style: function (geoJsonFeature) {
            console.log('style', geoJsonFeature);
            return {};
        },
        onEachFeature: function (feature, layer) {
            console.log('onEachFeature', feature, layer);
        },
    };

    let geoJsonData: GeoJsonObject | undefined;

    onMount(() => {
        fetch('data/example.geojson')
            .then(rsp => {
                rsp.json()
                    .then(json => {
                        geoJsonData = json as GeoJsonObject;
                    });
            });
    });
<\/script>

<Hst.Story group="other-layers">
    <LeafletMap options={mapOptions}>
        <TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS}/>
        <GeoJSON data={geoJsonData} options={geoJsonOptions}/>
    </LeafletMap>
</Hst.Story>
`;
export {
  __resolved__virtual_storySource_srcStoriesGeojsonStorySvelte as default
};
//# sourceMappingURL=__resolved__virtual_story-source_src-stories-geojson-story-svelte-ZeoV9pHx.js.map
