# Popup

## Basic usage
```example height:400
<script>
    //import LeafletMap, {Icon, Marker, Popup, TileLayer} from 'svelte-leafletjs';
    import LeafletMap, {Icon, Marker, Popup, TileLayer} from './src/index';

    const mapOptions = {
        center: [1.364917, 103.822872],
        zoom: 11,
    };
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };

    const iconOptions = {
        iconUrl: 'static/icons/airport.svg',
        iconSize: [41, 41],
        iconAnchor: [20, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
    };
</script>

<div class="example">
    <LeafletMap options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        <Marker latLng={[1.282375, 103.864273]}>
            <Popup>Gardens by the Bay</Popup>
        </Marker>
        <Marker latLng={[1.359167, 103.989441]}>
            <Icon options={iconOptions}/>
            <Popup><b>Changi Airport</b></Popup>
        </Marker>
    </LeafletMap>
</div>
```

## Properties

See https://leafletjs.com/reference-1.7.1.html#popup

```properties
options        | Options.            | Object(undefined)
```

## Methods

| Name       | Description |
|------------|-------------|
| getPopup() | Returns the underlying Leaflet `Popup` object instance. See https://leafletjs.com/reference-1.7.1.html#popup |
