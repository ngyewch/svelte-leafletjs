<script>import { createEventDispatcher, setContext } from "svelte";
import { Map } from "leaflet";
import EventBridge from "../lib/EventBridge.js";
const dispatch = createEventDispatcher();
export let options = {};
export let events = [];
let map;
let eventBridge;
setContext(Map, () => map);
function initialize(container, parameters) {
  if (container.getBoundingClientRect().width === 0 && container.getBoundingClientRect().height === 0) {
    console.log("[WARNING] skipped map initialization, container width and height is 0");
    return {};
  }
  map = new Map(container, options);
  eventBridge = new EventBridge(map, dispatch, events);
  return {
    destroy: () => {
      eventBridge.unregister();
      map.remove();
    }
  };
}
export function getMap() {
  return map;
}
</script>

<div style="height:100%; width:100%;" use:initialize>
    {#if map}
        <slot/>
    {/if}
</div>
