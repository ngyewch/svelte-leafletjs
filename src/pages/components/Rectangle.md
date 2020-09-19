# Rectangle

## Basic usage
```example height:400
<script>
    import {LeafletMap, Popup, Rectangle, TileLayer, Tooltip} from 'svelte-leafletjs';

    const mapOptions = {
        center: [1.250111, 103.830933],
        zoom: 14,
    };
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };
    const latLngBounds = [
        [1.23506, 103.80352],
        [1.26278, 103.85065]
    ];
</script>

<div class="example">
    <LeafletMap options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        <Rectangle latLngBounds={latLngBounds} color="#ff0000" fillColor="#ff0000">
            <Popup>Sentosa</Popup>
            <Tooltip>Sentosa</Tooltip>
        </Rectangle>
    </LeafletMap>
</div>
```

## Properties

See https://leafletjs.com/reference-1.7.1.html#rectangle

```properties
latLngBounds | Geographical bounds.    | LatLngBounds
color        | Stroke color.           | String("#3388ff")
weight       | Stroke width in pixels. | Number(3)
opacity      | Stroke opacity.         | Number(1.0)
lineCap      | Line cap shape.         | String("round")
lineJoin     | Line join shape.        | String("round")
dashArray    | Dash pattern.           | String(null)
dashOffset   | Dash offset.            | String(null)
fill         | Fill flag.              | Boolean()
fillColor    | Fill color.             | String("#3388ff")
fillOpacity  | Fill opacity.           | Number(0.2)
fillRule     | Fill rule.              | String("evenodd")
options      | Options.                | Object(undefined)
```

## Methods

| Name           | Description |
|----------------|-------------|
| getRectangle() | Returns the underlying Leaflet `Rectangle` object instance. See https://leafletjs.com/reference-1.7.1.html#rectangle |
