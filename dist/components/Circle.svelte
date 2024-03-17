<script>import { createEventDispatcher, getContext, onDestroy, setContext } from "svelte";
import {
  Circle,
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
export let options = {
  radius: void 0
};
export let events = [];
let circle;
let eventBridge;
setContext(Layer, () => circle);
$: {
  if (!circle) {
    circle = new Circle(latLng, { ...options, ...{ radius } }).addTo(mapProvider());
    eventBridge = new EventBridge(circle, dispatch, events);
  }
  circle.setLatLng(latLng);
  circle.setRadius(radius);
  circle.setStyle({
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
  circle.removeFrom(mapProvider());
});
export function getCircle() {
  return circle;
}
</script>

<div>
    {#if circle}
        <slot/>
    {/if}
</div>
