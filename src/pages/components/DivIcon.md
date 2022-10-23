# Marker / DivIcon

## Basic usage
```example height:400
<script>
    import {LeafletMap, DivIcon, Marker, TileLayer} from 'svelte-leafletjs';

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
        html: "<div style='background-color: #ff0000; color: #fff; width: 40px'>using props</div>"
    };
</script>

<div class="example">
    <LeafletMap options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        <Marker latLng={[1.282375, 103.864273]}/>
        <Marker latLng={[1.359167, 103.989441]}>
            <DivIcon options={iconOptions}/>
        </Marker>
        <Marker latLng={[1.359167, 103.789441]}>
            <DivIcon>
                <div style='background-color: #0000ff; color: #fff; width: 40px'>
                    using slot
                </div>
            </DivIcon>
        </Marker>
    </LeafletMap>
</div>
```

## Properties

See https://leafletjs.com/reference.html#divicon

```properties
options        | Options.            | Object(undefined)
```

## Methods

| Name      | Description |
|-----------|-------------|
| getIcon() | Returns the underlying Leaflet `Icon` object instance. See https://leafletjs.com/reference.html#icon |
