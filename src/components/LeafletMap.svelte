<script lang="ts">
    import {createEventDispatcher, setContext} from 'svelte';
    import type {ActionReturn} from 'svelte/action';
    import {Map, type MapOptions} from 'leaflet';

    import EventBridge from '../lib/EventBridge.js';
    import type {MapProvider} from '../lib/context.js';

    const dispatch = createEventDispatcher();

    export let options: MapOptions = {};
    export let events: string[] = [];

    let map: Map;
    let eventBridge: EventBridge;

    setContext<MapProvider>(Map, () => map);

    function initialize(container: HTMLElement, parameters?: any): ActionReturn<any> {
        // BEGIN: Hack to support histoire
        if ((container.getBoundingClientRect().width === 0) && (container.getBoundingClientRect().height === 0)) {
            console.log('[WARNING] skipped map initialization, container width and height is 0');
            return {};
        }
        // END: Hack to support histoire
        map = new Map(container, options);
        eventBridge = new EventBridge(map, dispatch, events);
        return {
            destroy: () => {
                eventBridge.unregister();
                map.remove();
            },
        };
    }

    export function getMap(): Map | undefined {
        return map;
    }
</script>

<div style="height:100%; width:100%;" use:initialize>
    {#if map}
        <slot/>
    {/if}
</div>
