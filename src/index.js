import LeafletMap from './components/LeafletMap.svelte';

import Circle from './components/Circle.svelte';
import CircleMarker from './components/CircleMarker.svelte';
import GeoJSON from './components/GeoJSON.svelte';
import Icon from './components/Icon.svelte';
import DivIcon from './components/DivIcon.svelte';
import ImageOverlay from './components/ImageOverlay.svelte';
import Marker from './components/Marker.svelte';
import Polyline from './components/Polyline.svelte';
import Polygon from './components/Polygon.svelte';
import Popup from './components/Popup.svelte';
import Rectangle from './components/Rectangle.svelte';
import ScaleControl from './components/ScaleControl.svelte';
import TileLayer from './components/TileLayer.svelte';
import Tooltip from './components/Tooltip.svelte';

import LeafletRotatedMarkersExtension from './extensions/RotatedMarkers';

LeafletRotatedMarkersExtension.install();

export { LeafletMap, Circle, CircleMarker, GeoJSON, Icon, DivIcon, ImageOverlay, Marker, Polyline, Polygon, Popup, Rectangle, ScaleControl, TileLayer, Tooltip };
export default LeafletMap;
