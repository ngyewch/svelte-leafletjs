<script>import { createEventDispatcher, getContext, onDestroy, setContext } from "svelte";
import { GeoJSON, Layer, Map } from "leaflet";
import EventBridge from "../lib/EventBridge.js";
const dispatch = createEventDispatcher();
const mapProvider = getContext(Map);
export let data = void 0;
export let options = {};
export let events = [];
let geojson;
let eventBridge;
setContext(Layer, () => geojson);
$: {
  if (!geojson) {
    geojson = new GeoJSON(data, options).addTo(mapProvider());
    eventBridge = new EventBridge(geojson, dispatch, events);
  } else if (data) {
    geojson.clearLayers();
    geojson.addData(data);
  }
}
onDestroy(() => {
  eventBridge.unregister();
  geojson.removeFrom(mapProvider());
});
export function getGeoJSON() {
  return geojson;
}
</script>

<div>
    {#if geojson}
        <slot/>
    {/if}
</div>
