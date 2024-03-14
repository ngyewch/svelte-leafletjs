<script>import { createEventDispatcher, getContext, onDestroy, setContext } from "svelte";
import { DivIcon, Icon, Layer, Map, Marker } from "leaflet";
import EventBridge from "../lib/EventBridge.js";
const LEAFLET_VERSION = "1.9.4";
const dispatch = createEventDispatcher();
const mapProvider = getContext(Map);
const defaultIcon = new Icon({
  iconUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/${LEAFLET_VERSION}/images/marker-icon.png`,
  iconRetinaUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/${LEAFLET_VERSION}/images/marker-icon-2x.png`,
  shadowUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/${LEAFLET_VERSION}/images/marker-shadow.png`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
export let latLng;
export let zIndexOffset = 0;
export let icon = void 0;
export let opacity = 1;
export let options = {};
export let events = [];
let marker;
let eventBridge;
setContext(Layer, () => marker);
setContext(Marker, () => marker);
$: {
  if (!marker) {
    marker = new Marker(latLng, options).addTo(mapProvider());
    eventBridge = new EventBridge(marker, dispatch, events);
    if (icon === void 0) {
      marker.setIcon(defaultIcon);
    } else {
      marker.setIcon(icon);
    }
  } else {
    if (icon !== void 0) {
      marker.setIcon(icon);
    }
  }
  marker.setLatLng(latLng);
  marker.setZIndexOffset(zIndexOffset);
  marker.setOpacity(opacity);
}
onDestroy(() => {
  eventBridge.unregister();
  marker.removeFrom(mapProvider());
});
export function getMarker() {
  return marker;
}
</script>

<div>
    {#if marker}
        <slot/>
    {/if}
</div>
