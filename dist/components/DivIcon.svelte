<script>import { getContext } from "svelte";
import { DivIcon, Marker } from "leaflet";
const markerProvider = getContext(Marker);
export let options = {};
let icon;
let element;
$: {
  let adjustedOptions = options;
  if (!adjustedOptions.html) {
    adjustedOptions.html = element;
  }
  icon = new DivIcon(adjustedOptions);
  markerProvider().setIcon(icon);
}
export function getDivIcon() {
  return icon;
}
</script>

<div bind:this={element}>
    <slot></slot>
</div>
