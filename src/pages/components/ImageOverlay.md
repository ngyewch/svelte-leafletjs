# ImageOverlay

## Basic usage
```example height:400
<script>
    import {LeafletMap, ImageOverlay, TileLayer} from 'svelte-leafletjs';

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
    const imageOverlayOptions = {
        opacity: 0.5,
    };
    const bounds = [[1.170, 103.565], [1.4836, 104.143]];
</script>

<div class="example">
    <LeafletMap options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        <ImageOverlay imageUrl="static/dpsri_70km_2021082110500000dBR.dpsri.png" 
                      bounds={bounds} 
                      options={imageOverlayOptions}/>
    </LeafletMap>
</div>
```

## Properties

See https://leafletjs.com/reference.html#imageoverlay

```properties
imageUrl | URL to image file.            | String
opacity  | Opacity of the image overlay. | Number(1.0)
zIndex   | Explicit zIndex of the layer. | Number(1)
options  | Options.                      | Object(undefined)
```

## Methods

| Name          | Description |
|---------------|-------------|
| getImageOverlay() | Returns the underlying Leaflet `ImageOverlay` object instance. See https://leafletjs.com/reference.html#imageoverlay |
