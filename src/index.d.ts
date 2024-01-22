import {SvelteComponent} from 'svelte';
import type {Map, MapOptions} from 'leaflet';

import Circle from './components/Circle.svelte';
import CircleMarker from './components/CircleMarker.svelte';
import GeoJSON from './components/GeoJSON.svelte';
import Icon from './components/Icon.svelte';
import DivIcon from './components/DivIcon.svelte';
import ImageOverlay from './components/ImageOverlay.svelte';
import LeafletMap from './components/LeafletMap.svelte';
import Marker from './components/Marker.svelte';
import Polyline from './components/Polyline.svelte';
import Polygon from './components/Polygon.svelte';
import Popup from './components/Popup.svelte';
import Rectangle from './components/Rectangle.svelte';
import ScaleControl from './components/ScaleControl.svelte';
import TileLayer from './components/TileLayer.svelte';
import TileLayerWMS from './components/TileLayerWMS.svelte';
import Tooltip from './components/Tooltip.svelte';

export {
    LeafletMap,
    Circle,
    CircleMarker,
    GeoJSON,
    Icon,
    DivIcon,
    ImageOverlay,
    Marker,
    Polyline,
    Polygon,
    Popup,
    Rectangle,
    ScaleControl,
    TileLayer,
    TileLayerWMS,
    Tooltip,
};
