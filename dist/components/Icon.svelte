<script>import { getContext } from "svelte";
import { Icon, Marker } from "leaflet";
const markerProvider = getContext(Marker);
export let iconUrl;
export let options = {};
let icon;
$: {
  if (!icon) {
    const adjustedOptions = {
      ...options,
      iconUrl
    };
    icon = new Icon(adjustedOptions);
    markerProvider().setIcon(icon);
  }
}
export function getIcon() {
  return icon;
}
</script>
