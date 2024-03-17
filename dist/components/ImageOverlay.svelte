<script>import { createEventDispatcher, getContext, onDestroy } from "svelte";
import { ImageOverlay, Map } from "leaflet";
import EventBridge from "../lib/EventBridge.js";
const dispatch = createEventDispatcher();
const mapProvider = getContext(Map);
export let imageUrl;
export let bounds;
export let opacity = 1;
export let zIndex = 1;
export let options = {};
export let events = [];
let imageOverlay;
let eventBridge;
$: {
  if (!imageOverlay) {
    imageOverlay = new ImageOverlay(imageUrl, bounds, options).addTo(mapProvider());
    eventBridge = new EventBridge(imageOverlay, dispatch, events);
  }
  imageOverlay.setUrl(imageUrl);
  imageOverlay.setOpacity(opacity);
  imageOverlay.setZIndex(zIndex);
}
onDestroy(() => {
  eventBridge.unregister();
  imageOverlay.removeFrom(mapProvider());
});
export function getImageOverlay() {
  return imageOverlay;
}
</script>
