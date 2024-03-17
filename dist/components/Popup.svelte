<script>import { createEventDispatcher, getContext, onDestroy } from "svelte";
import { Layer, Popup } from "leaflet";
import EventBridge from "../lib/EventBridge.js";
const dispatch = createEventDispatcher();
const layerProvider = getContext(Layer);
export let events = [];
export let options = {};
let element;
let popup;
let eventBridge;
$: {
  if (!popup) {
    popup = new Popup(options);
    eventBridge = new EventBridge(popup, dispatch, events);
    layerProvider().bindPopup(popup);
  }
  popup.setContent(element);
}
onDestroy(() => {
  eventBridge.unregister();
});
export function getPopup() {
  return popup;
}
</script>

<div style="display: none;">
    <div bind:this={element}>
        <slot/>
    </div>
</div>