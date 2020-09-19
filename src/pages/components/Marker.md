# Marker

## Basic usage
```example height:400
<script>
    import {LeafletMap, Marker, TileLayer} from 'svelte-leafletjs';

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
</script>

<div class="example">
    <LeafletMap options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        <Marker latLng={[1.282375, 103.864273]}/>
        <Marker latLng={[1.359167, 103.989441]} rotationAngle={45}/>
    </LeafletMap>
</div>
```

## Properties

See https://leafletjs.com/reference-1.7.1.html#marker

```properties
latLng         | Geographical point. | LatLng
zIndexOffset   | z-index offset.     | Number(0)
icon           | TODO L.Icon.Default | String
opacity        | Opacity.            | Number(1.0)
rotationAngle  | Rotation angle.     | Number(0)
rotationOrigin | Rotation origin.    | String("center bottom") 
options        | Options.            | Object(undefined)
```

## Methods

| Name        | Description |
|-------------|-------------|
| getMarker() | Returns the underlying Leaflet `Marker` object instance. See https://leafletjs.com/reference-1.7.1.html#marker |
