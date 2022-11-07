# TileLayer

## Basic usage
```example height:400
<script>
    import {LeafletMap, TileLayer} from 'svelte-leafletjs';

    const mapOptions = {
        center: [37.0902, -95.7129],
        zoom: 4,
    };
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };
    const wmsTileUrl = "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi";
    const wmsTileLayerOptions = {
        layers: 'nexrad-n0r-900913',
        format: 'image/png',
        transparent: true,
        attribution: "Weather data © 2012 IEM Nexrad",
    };

    let tileLayer;
    let wmsTileLayer;
</script>

<div class="example">
    <LeafletMap options={mapOptions}>
        <TileLayer bind:this={tileLayer} url={tileUrl} options={tileLayerOptions}/>
        <TileLayer bind:this={wmsTileLayer} wms={true} url={wmsTileUrl} options={wmsTileLayerOptions}/>
    </LeafletMap>
</div>
```

## Properties

See https://leafletjs.com/reference.html#tilelayer-wms

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
| getTileLayer() | Returns the underlying Leaflet `TileLayer.WMS` object instance. See https://leafletjs.com/reference.html#tilelayer |
