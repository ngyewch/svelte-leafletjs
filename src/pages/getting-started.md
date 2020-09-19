# Installation

```shell
$ npm install -D svelte-leafletjs leaflet
```

# CSS import

## rollup example

```shell
$ npm install -D rollup-plugin-postcss
```

`rollup.config.js` (excerpt)

```js
import postcss from 'rollup-plugin-postcss';

export default {
  plugins: [
        svelte({
            emitCss: true
        }),
        postcss({
            extract: true
        })
  ]
}
```

Import the CSS (from the main Javascript file, typically `main.js`):

```js
import 'leaflet/dist/leaflet.css';
```

# Component import

```html
<script> 
    import LeafletMap from 'svelte-leafletjs';
</script>
```
