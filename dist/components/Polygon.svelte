<script>import { createEventDispatcher, getContext, onDestroy, setContext } from "svelte";
import {
  Map,
  Layer,
  Polygon
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
export let fill = true;
export let fillColor = "#3388ff";
export let fillOpacity = 0.2;
export let fillRule = "evenodd";
export let options = {};
export let events = [];
let polygon;
let eventBridge;
setContext(Layer, () => polygon);
$: {
  if (!polygon) {
    polygon = new Polygon(latLngs, options).addTo(mapProvider());
    eventBridge = new EventBridge(polygon, dispatch, events);
  }
  polygon.setLatLngs(latLngs);
  polygon.setStyle({
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
  polygon.removeFrom(mapProvider());
});
export function getPolygon() {
  return polygon;
}
</script>

<div>
    {#if polygon}
        <slot/>
    {/if}
</div>
