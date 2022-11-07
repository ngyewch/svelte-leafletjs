# TileLayer

## Basic usage
```example height:400
<script>
    import {LeafletMap, TileLayer} from 'svelte-leafletjs';

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

    let tileLayer;
</script>

<div class="example">
    <LeafletMap options={mapOptions}>
        <TileLayer bind:this={tileLayer} url={tileUrl} options={tileLayerOptions}/>
    </LeafletMap>
</div>
```

## Properties

See https://leafletjs.com/reference.html#tilelayer

```properties
url     | Tile layer URL template.                                      | String
wms     | If true, the layer will be created using `L.tileLayer.WMS()`. | Boolean
opacity | Opacity of the tiles.                                         | Number(1.0)
zIndex  | Explicit zIndex of the layer.                                 | Number(1)
options | Options.                                                      | Object(undefined)
```

## Methods

| Name           | Description |
|----------------|-------------|
| getTileLayer() | Returns the underlying Leaflet `TileLayer` object instance. See https://leafletjs.com/reference.html#tilelayer |
