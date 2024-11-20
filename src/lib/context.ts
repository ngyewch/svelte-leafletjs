import type {Map, Layer, Marker} from 'leaflet';

export interface MapProvider {
    (): Map | undefined;
}

export interface LayerProvider {
    (): Layer | undefined;
}

export interface MarkerProvider {
    (): Marker | undefined;
}
