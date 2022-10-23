# LeafletMap

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

    let leafletMap;
</script>

<div class="example">
    <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
    </LeafletMap>
</div>
```

## Properties
```properties
options | Options. See https://leafletjs.com/reference.html#map-option | Object(undefined)
```

## Methods

| Name     | Description |
|----------|-------------|
| getMap() | Returns the underlying Leaflet `Map` object instance. See https://leafletjs.com/reference.html#map-factory |
