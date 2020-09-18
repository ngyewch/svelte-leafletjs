<script>
    import {setContext} from 'svelte';
    import L from 'leaflet';

    export let options = {};

    let map = null;

    setContext(L, {
        getMap: () => map,
    });

    function initialize(container) {
        map = L.map(container, options);
        return {
            destroy: () => {
                map.remove();
            },
        };
    }

    export function getMap() {
        return map;
    }
</script>

<div style="height:100%; width:100%;" use:initialize>
    {#if map}
        <slot/>
    {/if}
</div>
