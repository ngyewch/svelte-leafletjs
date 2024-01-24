const __resolved__virtual_storySource_srcStoriesPolygonStorySvelte = `<script lang="ts">
    import type {Hst} from '@histoire/plugin-svelte';
    import {LeafletMap, Polygon, Popup, TileLayer, Tooltip} from 'svelte-leafletjs';
    import type {LatLngExpression, MapOptions} from 'leaflet';
    import {DEFAULT_TILE_LAYER_OPTIONS, DEFAULT_TILE_URL} from './common.js';

    export let Hst: Hst;

    const mapOptions: MapOptions = {
        center: [1.250111, 103.830933],
        zoom: 14,
    };

    const polygon1: LatLngExpression[] = [[1.2605024,103.804856],[1.2595155,103.8058001],[1.2572416,103.8080317],[1.2555254,103.808418],[1.2549247,103.8096625],[1.2527365,103.8122374],[1.2507629,103.8157565],[1.2486177,103.8189322],[1.2460862,103.8224942],[1.2419673,103.8262707],[1.2378055,103.8309485],[1.2371619,103.8328797],[1.2374194,103.8341242],[1.2383204,103.8351113],[1.2383204,103.8356263],[1.238063,103.8371712],[1.2398221,103.8398749],[1.241195,103.841334],[1.2435977,103.8437373],[1.2460004,103.8454539],[1.2487035,103.8477713],[1.2523075,103.8492304],[1.2535517,103.8473851],[1.2536805,103.845883],[1.2531227,103.844381],[1.2528653,103.8425786],[1.2541953,103.8420636],[1.2540666,103.8404757],[1.2545386,103.838287],[1.2538092,103.8371283],[1.2537234,103.8350684],[1.255225,103.8321501],[1.2550534,103.829189],[1.2556112,103.8254124],[1.2581855,103.8233954],[1.2601591,103.8198763],[1.2608027,103.8168294],[1.2596443,103.8136965],[1.2605024,103.804856]];
<\/script>

<Hst.Story group="vector-layers">
    <LeafletMap options={mapOptions}>
        <TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS}/>
        <Polygon latLngs={polygon1} color="#ff0000" fillColor="#ff0000">
            <Popup>Sentosa</Popup>
            <Tooltip>Sentosa</Tooltip>
        </Polygon>
    </LeafletMap>
</Hst.Story>
`;
export {
  __resolved__virtual_storySource_srcStoriesPolygonStorySvelte as default
};
//# sourceMappingURL=__resolved__virtual_story-source_src-stories-polygon-story-svelte-YY87VCoC.js.map
