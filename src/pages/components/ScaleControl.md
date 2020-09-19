# ScaleControl

## Basic usage
```example height:400
<script>
    //import LeafletMap, {TileLayer, ScaleControl} from 'svelte-leafletjs';
    import LeafletMap, {TileLayer, ScaleControl} from './src/index';

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
    const scaleControlOptions = {
        maxWidth: 200,
    };

    let scaleControl;
</script>

<div class="example">
    <LeafletMap options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        <ScaleControl bind:this={scaleControl} position="bottomleft" options={scaleControlOptions}/>
    </LeafletMap>
</div>
```

## Properties

See https://leafletjs.com/reference-1.7.1.html#control-scale

```properties
position | Position. | String('topright')
options  | Options.  | Object(undefined)
```

## Methods

| Name              | Description |
|-------------------|-------------|
| getScaleControl() | Returns the underlying Leaflet `Control.Scale` object instance. See https://leafletjs.com/reference-1.7.1.html#control-scale |
