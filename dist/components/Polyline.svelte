<script>import { createEventDispatcher, getContext, onDestroy, setContext } from "svelte";
import {
  Map,
  Polyline,
  Layer
} from "leaflet";
import EventBridge from "../lib/EventBridge.js";
const dispatch = createEventDispatcher();
const mapProvider = getContext(Map);
export let latLngs;
export let color = "#3388ff";
export let weight = 3;
export let opacity = 1;
export let lineCap = "round";
export let lineJoin = "round";
export let dashArray = void 0;
export let dashOffset = void 0;
export let options = {};
export let events = [];
let polyline;
let eventBridge;
setContext(Layer, () => polyline);
$: {
  if (!polyline) {
    polyline = new Polyline(latLngs, options).addTo(mapProvider());
    eventBridge = new EventBridge(polyline, dispatch, events);
  }
  polyline.setLatLngs(latLngs);
  polyline.setStyle({
    color,
    weight,
    opacity,
    lineCap,
    lineJoin,
    dashArray,
    dashOffset
  });
}
onDestroy(() => {
  eventBridge.unregister();
  polyline.removeFrom(mapProvider());
});
export function getPolyline() {
  return polyline;
}
</script>

<div>
    {#if polyline}
        <slot/>
    {/if}
</div>
