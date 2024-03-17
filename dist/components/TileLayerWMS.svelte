<script>import { createEventDispatcher, getContext, onDestroy } from "svelte";
import { Map, TileLayer } from "leaflet";
import EventBridge from "../lib/EventBridge.js";
const dispatch = createEventDispatcher();
const mapProvider = getContext(Map);
export let url;
export let opacity = 1;
export let zIndex = 1;
export let options = {};
export let events = [];
let tileLayer;
let eventBridge;
$: {
  if (!tileLayer) {
    tileLayer = new TileLayer.WMS(url, options).addTo(mapProvider());
    eventBridge = new EventBridge(tileLayer, dispatch, events);
  }
  tileLayer.setUrl(url);
  tileLayer.setOpacity(opacity);
  tileLayer.setZIndex(zIndex);
}
onDestroy(() => {
  eventBridge.unregister();
  tileLayer.removeFrom(mapProvider());
});
export function getTileLayer() {
  return tileLayer;
}
</script>
