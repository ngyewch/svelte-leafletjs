<script>
    import {createEventDispatcher, setContext} from 'svelte';
    import L from 'leaflet';

    import EventBridge from '../lib/EventBridge';

    export let options = {};
    export let events = [];

    let map = null;

    setContext(L, {
        getMap: () => map,
    });

    const dispatch = createEventDispatcher();
    let eventBridge;

    function initialize(container) {
        map = L.map(container, options);
        eventBridge = new EventBridge(map, dispatch, events);
        return {
            destroy: () => {
                eventBridge.unregister();
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
