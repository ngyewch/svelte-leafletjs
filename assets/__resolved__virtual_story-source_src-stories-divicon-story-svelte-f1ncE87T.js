const __resolved__virtual_storySource_srcStoriesDiviconStorySvelte = `<script lang="ts">
    import type {Hst} from '@histoire/plugin-svelte';
    import {DivIcon, LeafletMap, Marker, TileLayer} from 'svelte-leafletjs';
    import {type DivIconOptions, type MapOptions} from 'leaflet';
    import {DEFAULT_TILE_LAYER_OPTIONS, DEFAULT_TILE_URL} from './common.js';

    export let Hst: Hst;

    const mapOptions: MapOptions = {
        center: [1.364917, 103.822872],
        zoom: 11,
    };
    const divIconOptions: DivIconOptions = {
        html: "<div style=\\"background-color: #ff0000; color: #fff; width: 40px; text-align: center;\\">using props</div>",
    };
<\/script>

<Hst.Story group="basic-types">
    <LeafletMap options={mapOptions}>
        <TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS}/>
        <Marker latLng={[1.282375, 103.864273]}/>
        <Marker latLng={[1.359167, 103.989441]}>
            <DivIcon options={divIconOptions}/>
        </Marker>
        <Marker latLng={[1.359167, 103.789441]}>
            <DivIcon>
                <div style='background-color: #0000ff; color: #fff; width: 40px; text-align: center;'>
                    using slot
                </div>
            </DivIcon>
        </Marker>
    </LeafletMap>
</Hst.Story>
`;
export {
  __resolved__virtual_storySource_srcStoriesDiviconStorySvelte as default
};
//# sourceMappingURL=__resolved__virtual_story-source_src-stories-divicon-story-svelte-f1ncE87T.js.map
