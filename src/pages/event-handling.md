# Event handling

```example height:400
<script>
    import {LeafletMap, Circle, Popup, TileLayer, Tooltip} from 'svelte-leafletjs';

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

    let color = "#ff0000";
    let radius = 1000;
</script>

<div class="example">
    <LeafletMap options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        <Circle latLng={[1.250111, 103.830933]} radius={radius} color={color} fillColor={color} 
                events={['mouseout', 'mouseover']} 
                on:mouseout={e => {color = "#ff0000", radius = 1000}}
                on:mouseover={e => {color = "#0000ff", radius = 2000}}>
            <Popup>Sentosa</Popup>
            <Tooltip>Sentosa</Tooltip>
        </Circle>
    </LeafletMap>
</div>
```

## Properties

Applies to all components that can emit events.

```properties
events | Events to listen to. | String[]
```
