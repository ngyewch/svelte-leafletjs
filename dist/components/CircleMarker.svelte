<script>import { createEventDispatcher, getContext, onDestroy, setContext } from "svelte";
import {
  CircleMarker,
  Layer,
  Map
} from "leaflet";
import EventBridge from "../lib/EventBridge.js";
const dispatch = createEventDispatcher();
const mapProvider = getContext(Map);
export let latLng;
export let radius = 10;
export let color = "#3388ff";
export let weight = 3;
export let opacity = 1;
export let lineCap = "round";
export let lineJoin = "round";
export let dashArray = void 0;
export let dashOffset = void 0;
export let fill = true;
export let fillColor = "#3388ff";
export let fillOpacity = 0.2;
export let fillRule = "evenodd";
export let options = {};
export let events = [];
let circleMarker;
let eventBridge;
setContext(Layer, () => circleMarker);
$: {
  if (!circleMarker) {
    circleMarker = new CircleMarker(latLng, options).addTo(mapProvider());
    eventBridge = new EventBridge(circleMarker, dispatch, events);
  }
  circleMarker.setLatLng(latLng);
  circleMarker.setRadius(radius);
  circleMarker.setStyle({
    color,
    weight,
    opacity,
    lineCap,
    lineJoin,
    dashArray,
    dashOffset,
    fill,
    fillColor,
    fillOpacity,
    fillRule
  });
}
onDestroy(() => {
  eventBridge.unregister();
  circleMarker.removeFrom(mapProvider());
});
export function getCircleMarker() {
  return circleMarker;
}
</script>

<div>
    {#if circleMarker}
        <slot/>
    {/if}
</div>
