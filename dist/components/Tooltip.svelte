<script>import { createEventDispatcher, getContext, onDestroy } from "svelte";
import { Layer, Tooltip } from "leaflet";
import EventBridge from "../lib/EventBridge.js";
const dispatch = createEventDispatcher();
const layerProvider = getContext(Layer);
export let events = [];
export let options = {};
let element;
let tooltip;
let eventBridge;
$: {
  if (!tooltip) {
    tooltip = new Tooltip(options);
    eventBridge = new EventBridge(tooltip, dispatch, events);
    layerProvider().bindTooltip(tooltip);
  }
  tooltip.setContent(element);
}
onDestroy(() => {
  eventBridge.unregister();
});
export function getTooltip() {
  return tooltip;
}
</script>

<div style="display: none;">
    <div bind:this={element}>
        <slot/>
    </div>
</div>
