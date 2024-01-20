import type {Map, Layer, Marker} from 'leaflet';

export interface MapProvider {
    (): Map;
}

export interface LayerProvider {
    (): Layer;
}

export interface MarkerProvider {
    (): Marker;
}
