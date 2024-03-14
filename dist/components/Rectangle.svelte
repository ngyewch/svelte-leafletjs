<script>import { createEventDispatcher, getContext, onDestroy, setContext } from "svelte";
import {
  Layer,
  Map,
  Rectangle
} from "leaflet";
import EventBridge from "../lib/EventBridge.js";
const dispatch = createEventDispatcher();
const mapProvider = getContext(Map);
export let latLngBounds;
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
let rectangle;
let eventBridge;
setContext(Layer, () => rectangle);
$: {
  if (!rectangle) {
    rectangle = new Rectangle(latLngBounds, options).addTo(mapProvider());
    eventBridge = new EventBridge(rectangle, dispatch, events);
  }
  rectangle.setBounds(latLngBounds);
  rectangle.setStyle({
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
  rectangle.removeFrom(mapProvider());
});
export function getRectangle() {
  return rectangle;
}
</script>

<div>
    {#if rectangle}
        <slot/>
    {/if}
</div>
