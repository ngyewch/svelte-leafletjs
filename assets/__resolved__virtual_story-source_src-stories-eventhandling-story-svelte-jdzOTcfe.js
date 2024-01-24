const __resolved__virtual_storySource_srcStoriesEventhandlingStorySvelte = `<script lang="ts">
    import type {Hst} from '@histoire/plugin-svelte';
    import {logEvent} from 'histoire/client';
    import {Circle, LeafletMap, Popup, TileLayer, Tooltip} from 'svelte-leafletjs';
    import type {MapOptions} from 'leaflet';
    import {DEFAULT_TILE_LAYER_OPTIONS, DEFAULT_TILE_URL} from './common.js';

    export let Hst: Hst;

    const mapOptions: MapOptions = {
        center: [1.250111, 103.830933],
        zoom: 14,
    };

    let color = "#ff0000";
    let radius = 1000;

    function handleMouseOut(e: CustomEvent) {
        color = "#ff0000";
        radius = 1000;
        console.log(e);
        logEvent(e.type, scrubEvent(e));
    }

    function handleMouseOver(e: CustomEvent) {
        color = "#0000ff";
        radius = 2000;
        console.log(e);
        logEvent(e.type, scrubEvent(e));
    }

    function scrubEvent(e: CustomEvent): any {
        const e2 = {...e.detail};
        delete e2.originalEvent;
        delete e2.sourceTarget;
        delete e2.target;
        return e2;
    }
<\/script>

<Hst.Story group="events">
    <LeafletMap options={mapOptions}>
        <TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS}/>
        <Circle latLng={[1.250111, 103.830933]} radius={radius} color={color} fillColor={color}
                events={['mouseout', 'mouseover']} on:mouseout={e => handleMouseOut(e)}
                on:mouseover={e => handleMouseOver(e)}>
            <Popup>Sentosa</Popup>
            <Tooltip>Sentosa</Tooltip>
        </Circle>
    </LeafletMap>
</Hst.Story>
`;
export {
  __resolved__virtual_storySource_srcStoriesEventhandlingStorySvelte as default
};
//# sourceMappingURL=__resolved__virtual_story-source_src-stories-eventhandling-story-svelte-jdzOTcfe.js.map
