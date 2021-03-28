# GeoJSON

## Basic usage
```example height:400
<script>
    import {LeafletMap, GeoJSON, TileLayer} from 'svelte-leafletjs';

    const mapOptions = {
        center: [1.250111, 103.830933],
        zoom: 13,
    };
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };
    const geoJsonOptions = {
        style: function(geoJsonFeature) {
            console.log('style', geoJsonFeature);
            return {};
        },
        onEachFeature: function(feature, layer) {
            console.log('onEachFeature', feature, layer);
        },
    };
</script>

<div class="example">
    <LeafletMap options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        <GeoJSON url="static/example.geojson" options={geoJsonOptions}/>
    </LeafletMap>
</div>
```

## Properties

See https://leafletjs.com/reference-1.7.1.html#geojson

```properties
url     | URL to GeoJSON file. | String
options | Options.             | Object(undefined)
```

## Methods

| Name          | Description |
|---------------|-------------|
| getGeoJSON() | Returns the underlying Leaflet `GeoJSON` object instance. See https://leafletjs.com/reference-1.7.1.html#geojson |
