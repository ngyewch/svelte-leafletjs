<script>import { getContext, onDestroy } from "svelte";
import { Control, Map } from "leaflet";
const mapProvider = getContext(Map);
export let position = "topright";
export let options = {};
let scaleControl;
$: {
  if (!scaleControl) {
    scaleControl = new Control.Scale(options).addTo(mapProvider());
  }
  scaleControl.setPosition(position);
}
onDestroy(() => {
  scaleControl.remove();
});
export function getScaleControl() {
  return scaleControl;
}
</script>
