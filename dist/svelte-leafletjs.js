var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { SvelteComponent, init, safe_not_equal, element, set_style, insert, action_destroyer, transition_in, group_outros, transition_out, check_outros, detach, create_slot, update_slot_base, get_all_dirty_from_scope, get_slot_changes, binding_callbacks, append } from "svelte/internal";
import "svelte/internal/disclose-version";
import { createEventDispatcher, setContext, getContext, onDestroy } from "svelte";
import { Map, Layer, Circle, CircleMarker, GeoJSON, Marker, Icon, DivIcon, ImageOverlay, Polyline, Polygon, Popup, Rectangle, Control, TileLayer, Tooltip } from "leaflet";
class EventBridge {
  constructor(entity, dispatch, events = []) {
    __publicField(this, "entity");
    __publicField(this, "eventMap", {});
    this.entity = entity;
    if (events) {
      events.forEach((event) => {
        if (event in this.eventMap) {
          return;
        }
        const handler = function(e) {
          dispatch(event, e);
        };
        entity.on(event, handler);
        this.eventMap[event] = handler;
      });
    }
  }
  unregister() {
    Object.entries(this.eventMap).forEach(([event, handler]) => {
      this.entity.off(event, handler);
    });
  }
}
function create_if_block$7(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[6].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[5],
    null
  );
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        32)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[5],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[5]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[5],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$a(ctx) {
  let div;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*map*/
    ctx[0] && create_if_block$7(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      set_style(div, "height", "100%");
      set_style(div, "width", "100%");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      current = true;
      if (!mounted) {
        dispose = action_destroyer(
          /*initialize*/
          ctx[1].call(null, div)
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*map*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*map*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$7(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function instance$f($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch = createEventDispatcher();
  let { options = {} } = $$props;
  let { events = [] } = $$props;
  let map;
  let eventBridge;
  setContext(Map, () => map);
  function initialize(container, parameters) {
    if (container.getBoundingClientRect().width === 0 && container.getBoundingClientRect().height === 0) {
      console.log("[WARNING] skipped map initialization, container width and height is 0");
      return {};
    }
    $$invalidate(0, map = new Map(container, options));
    eventBridge = new EventBridge(map, dispatch, events);
    return {
      destroy: () => {
        eventBridge.unregister();
        map.remove();
      }
    };
  }
  function getMap() {
    return map;
  }
  $$self.$$set = ($$props2) => {
    if ("options" in $$props2)
      $$invalidate(2, options = $$props2.options);
    if ("events" in $$props2)
      $$invalidate(3, events = $$props2.events);
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  return [map, initialize, options, events, getMap, $$scope, slots];
}
class LeafletMap extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$f, create_fragment$a, safe_not_equal, { options: 2, events: 3, getMap: 4 });
  }
  get getMap() {
    return this.$$.ctx[4];
  }
}
function create_if_block$6(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[18].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[17],
    null
  );
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        131072)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[17],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[17]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[17],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$9(ctx) {
  let div;
  let current;
  let if_block = (
    /*circle*/
    ctx[0] && create_if_block$6(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*circle*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*circle*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$6(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
    }
  };
}
function instance$e($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch = createEventDispatcher();
  const mapProvider = getContext(Map);
  let { latLng } = $$props;
  let { radius = 10 } = $$props;
  let { color = "#3388ff" } = $$props;
  let { weight = 3 } = $$props;
  let { opacity = 1 } = $$props;
  let { lineCap = "round" } = $$props;
  let { lineJoin = "round" } = $$props;
  let { dashArray = void 0 } = $$props;
  let { dashOffset = void 0 } = $$props;
  let { fill = true } = $$props;
  let { fillColor = "#3388ff" } = $$props;
  let { fillOpacity = 0.2 } = $$props;
  let { fillRule = "evenodd" } = $$props;
  let { options = { radius: void 0 } } = $$props;
  let { events = [] } = $$props;
  let circle;
  let eventBridge;
  setContext(Layer, () => circle);
  onDestroy(() => {
    eventBridge.unregister();
    circle.removeFrom(mapProvider());
  });
  function getCircle() {
    return circle;
  }
  $$self.$$set = ($$props2) => {
    if ("latLng" in $$props2)
      $$invalidate(1, latLng = $$props2.latLng);
    if ("radius" in $$props2)
      $$invalidate(2, radius = $$props2.radius);
    if ("color" in $$props2)
      $$invalidate(3, color = $$props2.color);
    if ("weight" in $$props2)
      $$invalidate(4, weight = $$props2.weight);
    if ("opacity" in $$props2)
      $$invalidate(5, opacity = $$props2.opacity);
    if ("lineCap" in $$props2)
      $$invalidate(6, lineCap = $$props2.lineCap);
    if ("lineJoin" in $$props2)
      $$invalidate(7, lineJoin = $$props2.lineJoin);
    if ("dashArray" in $$props2)
      $$invalidate(8, dashArray = $$props2.dashArray);
    if ("dashOffset" in $$props2)
      $$invalidate(9, dashOffset = $$props2.dashOffset);
    if ("fill" in $$props2)
      $$invalidate(10, fill = $$props2.fill);
    if ("fillColor" in $$props2)
      $$invalidate(11, fillColor = $$props2.fillColor);
    if ("fillOpacity" in $$props2)
      $$invalidate(12, fillOpacity = $$props2.fillOpacity);
    if ("fillRule" in $$props2)
      $$invalidate(13, fillRule = $$props2.fillRule);
    if ("options" in $$props2)
      $$invalidate(14, options = $$props2.options);
    if ("events" in $$props2)
      $$invalidate(15, events = $$props2.events);
    if ("$$scope" in $$props2)
      $$invalidate(17, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*circle, latLng, options, radius, events, color, weight, opacity, lineCap, lineJoin, dashArray, dashOffset, fill, fillColor, fillOpacity, fillRule*/
    65535) {
      {
        if (!circle) {
          $$invalidate(0, circle = new Circle(latLng, { ...options, ...{ radius } }).addTo(mapProvider()));
          eventBridge = new EventBridge(circle, dispatch, events);
        }
        circle.setLatLng(latLng);
        circle.setRadius(radius);
        circle.setStyle({
          color,
          weight,
          opacity,
          lineCap,
          lineJoin,
          dashArray,
          dashOffset,
          fill,
          fillColor,
          fillOpacity,
          fillRule
        });
      }
    }
  };
  return [
    circle,
    latLng,
    radius,
    color,
    weight,
    opacity,
    lineCap,
    lineJoin,
    dashArray,
    dashOffset,
    fill,
    fillColor,
    fillOpacity,
    fillRule,
    options,
    events,
    getCircle,
    $$scope,
    slots
  ];
}
class Circle_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$e, create_fragment$9, safe_not_equal, {
      latLng: 1,
      radius: 2,
      color: 3,
      weight: 4,
      opacity: 5,
      lineCap: 6,
      lineJoin: 7,
      dashArray: 8,
      dashOffset: 9,
      fill: 10,
      fillColor: 11,
      fillOpacity: 12,
      fillRule: 13,
      options: 14,
      events: 15,
      getCircle: 16
    });
  }
  get getCircle() {
    return this.$$.ctx[16];
  }
}
function create_if_block$5(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[18].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[17],
    null
  );
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        131072)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[17],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[17]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[17],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$8(ctx) {
  let div;
  let current;
  let if_block = (
    /*circleMarker*/
    ctx[0] && create_if_block$5(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*circleMarker*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*circleMarker*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$5(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
    }
  };
}
function instance$d($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch = createEventDispatcher();
  const mapProvider = getContext(Map);
  let { latLng } = $$props;
  let { radius = 10 } = $$props;
  let { color = "#3388ff" } = $$props;
  let { weight = 3 } = $$props;
  let { opacity = 1 } = $$props;
  let { lineCap = "round" } = $$props;
  let { lineJoin = "round" } = $$props;
  let { dashArray = void 0 } = $$props;
  let { dashOffset = void 0 } = $$props;
  let { fill = true } = $$props;
  let { fillColor = "#3388ff" } = $$props;
  let { fillOpacity = 0.2 } = $$props;
  let { fillRule = "evenodd" } = $$props;
  let { options = {} } = $$props;
  let { events = [] } = $$props;
  let circleMarker;
  let eventBridge;
  setContext(Layer, () => circleMarker);
  onDestroy(() => {
    eventBridge.unregister();
    circleMarker.removeFrom(mapProvider());
  });
  function getCircleMarker() {
    return circleMarker;
  }
  $$self.$$set = ($$props2) => {
    if ("latLng" in $$props2)
      $$invalidate(1, latLng = $$props2.latLng);
    if ("radius" in $$props2)
      $$invalidate(2, radius = $$props2.radius);
    if ("color" in $$props2)
      $$invalidate(3, color = $$props2.color);
    if ("weight" in $$props2)
      $$invalidate(4, weight = $$props2.weight);
    if ("opacity" in $$props2)
      $$invalidate(5, opacity = $$props2.opacity);
    if ("lineCap" in $$props2)
      $$invalidate(6, lineCap = $$props2.lineCap);
    if ("lineJoin" in $$props2)
      $$invalidate(7, lineJoin = $$props2.lineJoin);
    if ("dashArray" in $$props2)
      $$invalidate(8, dashArray = $$props2.dashArray);
    if ("dashOffset" in $$props2)
      $$invalidate(9, dashOffset = $$props2.dashOffset);
    if ("fill" in $$props2)
      $$invalidate(10, fill = $$props2.fill);
    if ("fillColor" in $$props2)
      $$invalidate(11, fillColor = $$props2.fillColor);
    if ("fillOpacity" in $$props2)
      $$invalidate(12, fillOpacity = $$props2.fillOpacity);
    if ("fillRule" in $$props2)
      $$invalidate(13, fillRule = $$props2.fillRule);
    if ("options" in $$props2)
      $$invalidate(14, options = $$props2.options);
    if ("events" in $$props2)
      $$invalidate(15, events = $$props2.events);
    if ("$$scope" in $$props2)
      $$invalidate(17, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*circleMarker, latLng, options, events, radius, color, weight, opacity, lineCap, lineJoin, dashArray, dashOffset, fill, fillColor, fillOpacity, fillRule*/
    65535) {
      {
        if (!circleMarker) {
          $$invalidate(0, circleMarker = new CircleMarker(latLng, options).addTo(mapProvider()));
          eventBridge = new EventBridge(circleMarker, dispatch, events);
        }
        circleMarker.setLatLng(latLng);
        circleMarker.setRadius(radius);
        circleMarker.setStyle({
          color,
          weight,
          opacity,
          lineCap,
          lineJoin,
          dashArray,
          dashOffset,
          fill,
          fillColor,
          fillOpacity,
          fillRule
        });
      }
    }
  };
  return [
    circleMarker,
    latLng,
    radius,
    color,
    weight,
    opacity,
    lineCap,
    lineJoin,
    dashArray,
    dashOffset,
    fill,
    fillColor,
    fillOpacity,
    fillRule,
    options,
    events,
    getCircleMarker,
    $$scope,
    slots
  ];
}
class CircleMarker_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$d, create_fragment$8, safe_not_equal, {
      latLng: 1,
      radius: 2,
      color: 3,
      weight: 4,
      opacity: 5,
      lineCap: 6,
      lineJoin: 7,
      dashArray: 8,
      dashOffset: 9,
      fill: 10,
      fillColor: 11,
      fillOpacity: 12,
      fillRule: 13,
      options: 14,
      events: 15,
      getCircleMarker: 16
    });
  }
  get getCircleMarker() {
    return this.$$.ctx[16];
  }
}
function create_if_block$4(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[6].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[5],
    null
  );
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        32)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[5],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[5]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[5],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$7(ctx) {
  let div;
  let current;
  let if_block = (
    /*geojson*/
    ctx[0] && create_if_block$4(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*geojson*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*geojson*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$4(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
    }
  };
}
function instance$c($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch = createEventDispatcher();
  const mapProvider = getContext(Map);
  let { data = void 0 } = $$props;
  let { options = {} } = $$props;
  let { events = [] } = $$props;
  let geojson;
  let eventBridge;
  setContext(Layer, () => geojson);
  onDestroy(() => {
    eventBridge.unregister();
    geojson.removeFrom(mapProvider());
  });
  function getGeoJSON() {
    return geojson;
  }
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2)
      $$invalidate(1, data = $$props2.data);
    if ("options" in $$props2)
      $$invalidate(2, options = $$props2.options);
    if ("events" in $$props2)
      $$invalidate(3, events = $$props2.events);
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*geojson, data, options, events*/
    15) {
      {
        if (!geojson) {
          $$invalidate(0, geojson = new GeoJSON(data, options).addTo(mapProvider()));
          eventBridge = new EventBridge(geojson, dispatch, events);
        } else if (data) {
          geojson.clearLayers();
          geojson.addData(data);
        }
      }
    }
  };
  return [geojson, data, options, events, getGeoJSON, $$scope, slots];
}
class GeoJSON_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$c, create_fragment$7, safe_not_equal, {
      data: 1,
      options: 2,
      events: 3,
      getGeoJSON: 4
    });
  }
  get getGeoJSON() {
    return this.$$.ctx[4];
  }
}
function instance$b($$self, $$props, $$invalidate) {
  const markerProvider = getContext(Marker);
  let { iconUrl } = $$props;
  let { options = { iconUrl: "" } } = $$props;
  let icon;
  function getIcon() {
    return icon;
  }
  $$self.$$set = ($$props2) => {
    if ("iconUrl" in $$props2)
      $$invalidate(0, iconUrl = $$props2.iconUrl);
    if ("options" in $$props2)
      $$invalidate(1, options = $$props2.options);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*icon, options, iconUrl*/
    11) {
      {
        if (!icon) {
          const adjustedOptions = { ...options };
          if (iconUrl) {
            adjustedOptions.iconUrl = iconUrl;
          }
          $$invalidate(3, icon = new Icon(adjustedOptions));
          markerProvider().setIcon(icon);
        }
      }
    }
  };
  return [iconUrl, options, getIcon, icon];
}
class Icon_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, null, safe_not_equal, { iconUrl: 0, options: 1, getIcon: 2 });
  }
  get getIcon() {
    return this.$$.ctx[2];
  }
}
function create_fragment$6(ctx) {
  let div;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    null
  );
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[6](div);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[4]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[4],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[6](null);
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const markerProvider = getContext(Marker);
  let { options = {} } = $$props;
  let icon;
  let element2;
  function getDivIcon() {
    return icon;
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(0, element2);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("options" in $$props2)
      $$invalidate(1, options = $$props2.options);
    if ("$$scope" in $$props2)
      $$invalidate(4, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*options, element, icon*/
    11) {
      {
        let adjustedOptions = options;
        if (!adjustedOptions.html) {
          adjustedOptions.html = element2;
        }
        $$invalidate(3, icon = new DivIcon(adjustedOptions));
        markerProvider().setIcon(icon);
      }
    }
  };
  return [element2, options, getDivIcon, icon, $$scope, slots, div_binding];
}
class DivIcon_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$6, safe_not_equal, { options: 1, getDivIcon: 2 });
  }
  get getDivIcon() {
    return this.$$.ctx[2];
  }
}
function instance$9($$self, $$props, $$invalidate) {
  const dispatch = createEventDispatcher();
  const mapProvider = getContext(Map);
  let { imageUrl } = $$props;
  let { bounds } = $$props;
  let { opacity = 1 } = $$props;
  let { zIndex = 1 } = $$props;
  let { options = {} } = $$props;
  let { events = [] } = $$props;
  let imageOverlay;
  let eventBridge;
  onDestroy(() => {
    eventBridge.unregister();
    imageOverlay.removeFrom(mapProvider());
  });
  function getImageOverlay() {
    return imageOverlay;
  }
  $$self.$$set = ($$props2) => {
    if ("imageUrl" in $$props2)
      $$invalidate(0, imageUrl = $$props2.imageUrl);
    if ("bounds" in $$props2)
      $$invalidate(1, bounds = $$props2.bounds);
    if ("opacity" in $$props2)
      $$invalidate(2, opacity = $$props2.opacity);
    if ("zIndex" in $$props2)
      $$invalidate(3, zIndex = $$props2.zIndex);
    if ("options" in $$props2)
      $$invalidate(4, options = $$props2.options);
    if ("events" in $$props2)
      $$invalidate(5, events = $$props2.events);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*imageOverlay, imageUrl, bounds, options, events, opacity, zIndex*/
    191) {
      {
        if (!imageOverlay) {
          $$invalidate(7, imageOverlay = new ImageOverlay(imageUrl, bounds, options).addTo(mapProvider()));
          eventBridge = new EventBridge(imageOverlay, dispatch, events);
        }
        imageOverlay.setUrl(imageUrl);
        imageOverlay.setOpacity(opacity);
        imageOverlay.setZIndex(zIndex);
      }
    }
  };
  return [
    imageUrl,
    bounds,
    opacity,
    zIndex,
    options,
    events,
    getImageOverlay,
    imageOverlay
  ];
}
class ImageOverlay_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, null, safe_not_equal, {
      imageUrl: 0,
      bounds: 1,
      opacity: 2,
      zIndex: 3,
      options: 4,
      events: 5,
      getImageOverlay: 6
    });
  }
  get getImageOverlay() {
    return this.$$.ctx[6];
  }
}
function create_if_block$3(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[9].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[8],
    null
  );
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        256)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[8],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[8]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[8],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$5(ctx) {
  let div;
  let current;
  let if_block = (
    /*marker*/
    ctx[0] && create_if_block$3(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*marker*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*marker*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
    }
  };
}
const LEAFLET_VERSION = "1.9.4";
function instance$8($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch = createEventDispatcher();
  const mapProvider = getContext(Map);
  const defaultIcon = new Icon({
    iconUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/${LEAFLET_VERSION}/images/marker-icon.png`,
    iconRetinaUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/${LEAFLET_VERSION}/images/marker-icon-2x.png`,
    shadowUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/${LEAFLET_VERSION}/images/marker-shadow.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });
  let { latLng } = $$props;
  let { zIndexOffset = 0 } = $$props;
  let { icon = defaultIcon } = $$props;
  let { opacity = 1 } = $$props;
  let { options = {} } = $$props;
  let { events = [] } = $$props;
  let marker;
  let eventBridge;
  setContext(Layer, () => marker);
  setContext(Marker, () => marker);
  onDestroy(() => {
    eventBridge.unregister();
    marker.removeFrom(mapProvider());
  });
  function getMarker() {
    return marker;
  }
  $$self.$$set = ($$props2) => {
    if ("latLng" in $$props2)
      $$invalidate(1, latLng = $$props2.latLng);
    if ("zIndexOffset" in $$props2)
      $$invalidate(2, zIndexOffset = $$props2.zIndexOffset);
    if ("icon" in $$props2)
      $$invalidate(3, icon = $$props2.icon);
    if ("opacity" in $$props2)
      $$invalidate(4, opacity = $$props2.opacity);
    if ("options" in $$props2)
      $$invalidate(5, options = $$props2.options);
    if ("events" in $$props2)
      $$invalidate(6, events = $$props2.events);
    if ("$$scope" in $$props2)
      $$invalidate(8, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*marker, latLng, options, events, zIndexOffset, icon, opacity*/
    127) {
      {
        if (!marker) {
          $$invalidate(0, marker = new Marker(latLng, options).addTo(mapProvider()));
          eventBridge = new EventBridge(marker, dispatch, events);
        }
        marker.setLatLng(latLng);
        marker.setZIndexOffset(zIndexOffset);
        marker.setIcon(icon);
        marker.setOpacity(opacity);
      }
    }
  };
  return [
    marker,
    latLng,
    zIndexOffset,
    icon,
    opacity,
    options,
    events,
    getMarker,
    $$scope,
    slots
  ];
}
class Marker_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$5, safe_not_equal, {
      latLng: 1,
      zIndexOffset: 2,
      icon: 3,
      opacity: 4,
      options: 5,
      events: 6,
      getMarker: 7
    });
  }
  get getMarker() {
    return this.$$.ctx[7];
  }
}
function create_if_block$2(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[13].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[12],
    null
  );
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        4096)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[12],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[12]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[12],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$4(ctx) {
  let div;
  let current;
  let if_block = (
    /*polyline*/
    ctx[0] && create_if_block$2(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*polyline*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*polyline*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch = createEventDispatcher();
  const mapProvider = getContext(Map);
  let { latLngs } = $$props;
  let { color = "#3388ff" } = $$props;
  let { weight = 3 } = $$props;
  let { opacity = 1 } = $$props;
  let { lineCap = "round" } = $$props;
  let { lineJoin = "round" } = $$props;
  let { dashArray = void 0 } = $$props;
  let { dashOffset = void 0 } = $$props;
  let { options = {} } = $$props;
  let { events = [] } = $$props;
  let polyline;
  let eventBridge;
  setContext(Layer, () => polyline);
  onDestroy(() => {
    eventBridge.unregister();
    polyline.removeFrom(mapProvider());
  });
  function getPolyline() {
    return polyline;
  }
  $$self.$$set = ($$props2) => {
    if ("latLngs" in $$props2)
      $$invalidate(1, latLngs = $$props2.latLngs);
    if ("color" in $$props2)
      $$invalidate(2, color = $$props2.color);
    if ("weight" in $$props2)
      $$invalidate(3, weight = $$props2.weight);
    if ("opacity" in $$props2)
      $$invalidate(4, opacity = $$props2.opacity);
    if ("lineCap" in $$props2)
      $$invalidate(5, lineCap = $$props2.lineCap);
    if ("lineJoin" in $$props2)
      $$invalidate(6, lineJoin = $$props2.lineJoin);
    if ("dashArray" in $$props2)
      $$invalidate(7, dashArray = $$props2.dashArray);
    if ("dashOffset" in $$props2)
      $$invalidate(8, dashOffset = $$props2.dashOffset);
    if ("options" in $$props2)
      $$invalidate(9, options = $$props2.options);
    if ("events" in $$props2)
      $$invalidate(10, events = $$props2.events);
    if ("$$scope" in $$props2)
      $$invalidate(12, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*polyline, latLngs, options, events, color, weight, opacity, lineCap, lineJoin, dashArray, dashOffset*/
    2047) {
      {
        if (!polyline) {
          $$invalidate(0, polyline = new Polyline(latLngs, options).addTo(mapProvider()));
          eventBridge = new EventBridge(polyline, dispatch, events);
        }
        polyline.setLatLngs(latLngs);
        polyline.setStyle({
          color,
          weight,
          opacity,
          lineCap,
          lineJoin,
          dashArray,
          dashOffset
        });
      }
    }
  };
  return [
    polyline,
    latLngs,
    color,
    weight,
    opacity,
    lineCap,
    lineJoin,
    dashArray,
    dashOffset,
    options,
    events,
    getPolyline,
    $$scope,
    slots
  ];
}
class Polyline_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$4, safe_not_equal, {
      latLngs: 1,
      color: 2,
      weight: 3,
      opacity: 4,
      lineCap: 5,
      lineJoin: 6,
      dashArray: 7,
      dashOffset: 8,
      options: 9,
      events: 10,
      getPolyline: 11
    });
  }
  get getPolyline() {
    return this.$$.ctx[11];
  }
}
function create_if_block$1(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[17].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[16],
    null
  );
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        65536)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[16],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[16]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[16],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$3(ctx) {
  let div;
  let current;
  let if_block = (
    /*polygon*/
    ctx[0] && create_if_block$1(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*polygon*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*polygon*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch = createEventDispatcher();
  const mapProvider = getContext(Map);
  let { latLngs } = $$props;
  let { color = "#3388ff" } = $$props;
  let { weight = 3 } = $$props;
  let { opacity = 1 } = $$props;
  let { lineCap = "round" } = $$props;
  let { lineJoin = "round" } = $$props;
  let { dashArray = void 0 } = $$props;
  let { dashOffset = void 0 } = $$props;
  let { fill = true } = $$props;
  let { fillColor = "#3388ff" } = $$props;
  let { fillOpacity = 0.2 } = $$props;
  let { fillRule = "evenodd" } = $$props;
  let { options = {} } = $$props;
  let { events = [] } = $$props;
  let polygon;
  let eventBridge;
  setContext(Layer, () => polygon);
  onDestroy(() => {
    eventBridge.unregister();
    polygon.removeFrom(mapProvider());
  });
  function getPolygon() {
    return polygon;
  }
  $$self.$$set = ($$props2) => {
    if ("latLngs" in $$props2)
      $$invalidate(1, latLngs = $$props2.latLngs);
    if ("color" in $$props2)
      $$invalidate(2, color = $$props2.color);
    if ("weight" in $$props2)
      $$invalidate(3, weight = $$props2.weight);
    if ("opacity" in $$props2)
      $$invalidate(4, opacity = $$props2.opacity);
    if ("lineCap" in $$props2)
      $$invalidate(5, lineCap = $$props2.lineCap);
    if ("lineJoin" in $$props2)
      $$invalidate(6, lineJoin = $$props2.lineJoin);
    if ("dashArray" in $$props2)
      $$invalidate(7, dashArray = $$props2.dashArray);
    if ("dashOffset" in $$props2)
      $$invalidate(8, dashOffset = $$props2.dashOffset);
    if ("fill" in $$props2)
      $$invalidate(9, fill = $$props2.fill);
    if ("fillColor" in $$props2)
      $$invalidate(10, fillColor = $$props2.fillColor);
    if ("fillOpacity" in $$props2)
      $$invalidate(11, fillOpacity = $$props2.fillOpacity);
    if ("fillRule" in $$props2)
      $$invalidate(12, fillRule = $$props2.fillRule);
    if ("options" in $$props2)
      $$invalidate(13, options = $$props2.options);
    if ("events" in $$props2)
      $$invalidate(14, events = $$props2.events);
    if ("$$scope" in $$props2)
      $$invalidate(16, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*polygon, latLngs, options, events, color, weight, opacity, lineCap, lineJoin, dashArray, dashOffset, fill, fillColor, fillOpacity, fillRule*/
    32767) {
      {
        if (!polygon) {
          $$invalidate(0, polygon = new Polygon(latLngs, options).addTo(mapProvider()));
          eventBridge = new EventBridge(polygon, dispatch, events);
        }
        polygon.setLatLngs(latLngs);
        polygon.setStyle({
          color,
          weight,
          opacity,
          lineCap,
          lineJoin,
          dashArray,
          dashOffset,
          fill,
          fillColor,
          fillOpacity,
          fillRule
        });
      }
    }
  };
  return [
    polygon,
    latLngs,
    color,
    weight,
    opacity,
    lineCap,
    lineJoin,
    dashArray,
    dashOffset,
    fill,
    fillColor,
    fillOpacity,
    fillRule,
    options,
    events,
    getPolygon,
    $$scope,
    slots
  ];
}
class Polygon_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$3, safe_not_equal, {
      latLngs: 1,
      color: 2,
      weight: 3,
      opacity: 4,
      lineCap: 5,
      lineJoin: 6,
      dashArray: 7,
      dashOffset: 8,
      fill: 9,
      fillColor: 10,
      fillOpacity: 11,
      fillRule: 12,
      options: 13,
      events: 14,
      getPolygon: 15
    });
  }
  get getPolygon() {
    return this.$$.ctx[15];
  }
}
function create_fragment$2(ctx) {
  let div1;
  let div0;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[6].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[5],
    null
  );
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      if (default_slot)
        default_slot.c();
      set_style(div1, "display", "none");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      if (default_slot) {
        default_slot.m(div0, null);
      }
      ctx[7](div0);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        32)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[5],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[5]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[5],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch = createEventDispatcher();
  const layerProvider = getContext(Layer);
  let { events = [] } = $$props;
  let { options = {} } = $$props;
  let element2;
  let popup;
  let eventBridge;
  onDestroy(() => {
    eventBridge.unregister();
  });
  function getPopup() {
    return popup;
  }
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(0, element2);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("events" in $$props2)
      $$invalidate(1, events = $$props2.events);
    if ("options" in $$props2)
      $$invalidate(2, options = $$props2.options);
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*popup, options, events, element*/
    23) {
      {
        if (!popup) {
          $$invalidate(4, popup = new Popup(options));
          eventBridge = new EventBridge(popup, dispatch, events);
          layerProvider().bindPopup(popup);
        }
        popup.setContent(element2);
      }
    }
  };
  return [element2, events, options, getPopup, popup, $$scope, slots, div0_binding];
}
class Popup_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$2, safe_not_equal, { events: 1, options: 2, getPopup: 3 });
  }
  get getPopup() {
    return this.$$.ctx[3];
  }
}
function create_if_block(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[17].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[16],
    null
  );
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        65536)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[16],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[16]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[16],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let div;
  let current;
  let if_block = (
    /*rectangle*/
    ctx[0] && create_if_block(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*rectangle*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*rectangle*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch = createEventDispatcher();
  const mapProvider = getContext(Map);
  let { latLngBounds } = $$props;
  let { color = "#3388ff" } = $$props;
  let { weight = 3 } = $$props;
  let { opacity = 1 } = $$props;
  let { lineCap = "round" } = $$props;
  let { lineJoin = "round" } = $$props;
  let { dashArray = void 0 } = $$props;
  let { dashOffset = void 0 } = $$props;
  let { fill = true } = $$props;
  let { fillColor = "#3388ff" } = $$props;
  let { fillOpacity = 0.2 } = $$props;
  let { fillRule = "evenodd" } = $$props;
  let { options = {} } = $$props;
  let { events = [] } = $$props;
  let rectangle;
  let eventBridge;
  setContext(Layer, () => rectangle);
  onDestroy(() => {
    eventBridge.unregister();
    rectangle.removeFrom(mapProvider());
  });
  function getRectangle() {
    return rectangle;
  }
  $$self.$$set = ($$props2) => {
    if ("latLngBounds" in $$props2)
      $$invalidate(1, latLngBounds = $$props2.latLngBounds);
    if ("color" in $$props2)
      $$invalidate(2, color = $$props2.color);
    if ("weight" in $$props2)
      $$invalidate(3, weight = $$props2.weight);
    if ("opacity" in $$props2)
      $$invalidate(4, opacity = $$props2.opacity);
    if ("lineCap" in $$props2)
      $$invalidate(5, lineCap = $$props2.lineCap);
    if ("lineJoin" in $$props2)
      $$invalidate(6, lineJoin = $$props2.lineJoin);
    if ("dashArray" in $$props2)
      $$invalidate(7, dashArray = $$props2.dashArray);
    if ("dashOffset" in $$props2)
      $$invalidate(8, dashOffset = $$props2.dashOffset);
    if ("fill" in $$props2)
      $$invalidate(9, fill = $$props2.fill);
    if ("fillColor" in $$props2)
      $$invalidate(10, fillColor = $$props2.fillColor);
    if ("fillOpacity" in $$props2)
      $$invalidate(11, fillOpacity = $$props2.fillOpacity);
    if ("fillRule" in $$props2)
      $$invalidate(12, fillRule = $$props2.fillRule);
    if ("options" in $$props2)
      $$invalidate(13, options = $$props2.options);
    if ("events" in $$props2)
      $$invalidate(14, events = $$props2.events);
    if ("$$scope" in $$props2)
      $$invalidate(16, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*rectangle, latLngBounds, options, events, color, weight, opacity, lineCap, lineJoin, dashArray, dashOffset, fill, fillColor, fillOpacity, fillRule*/
    32767) {
      {
        if (!rectangle) {
          $$invalidate(0, rectangle = new Rectangle(latLngBounds, options).addTo(mapProvider()));
          eventBridge = new EventBridge(rectangle, dispatch, events);
        }
        rectangle.setBounds(latLngBounds);
        rectangle.setStyle({
          color,
          weight,
          opacity,
          lineCap,
          lineJoin,
          dashArray,
          dashOffset,
          fill,
          fillColor,
          fillOpacity,
          fillRule
        });
      }
    }
  };
  return [
    rectangle,
    latLngBounds,
    color,
    weight,
    opacity,
    lineCap,
    lineJoin,
    dashArray,
    dashOffset,
    fill,
    fillColor,
    fillOpacity,
    fillRule,
    options,
    events,
    getRectangle,
    $$scope,
    slots
  ];
}
class Rectangle_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$1, safe_not_equal, {
      latLngBounds: 1,
      color: 2,
      weight: 3,
      opacity: 4,
      lineCap: 5,
      lineJoin: 6,
      dashArray: 7,
      dashOffset: 8,
      fill: 9,
      fillColor: 10,
      fillOpacity: 11,
      fillRule: 12,
      options: 13,
      events: 14,
      getRectangle: 15
    });
  }
  get getRectangle() {
    return this.$$.ctx[15];
  }
}
function instance$3($$self, $$props, $$invalidate) {
  const mapProvider = getContext(Map);
  let { position = "topright" } = $$props;
  let { options = {} } = $$props;
  let scaleControl;
  onDestroy(() => {
    scaleControl.remove();
  });
  function getScaleControl() {
    return scaleControl;
  }
  $$self.$$set = ($$props2) => {
    if ("position" in $$props2)
      $$invalidate(0, position = $$props2.position);
    if ("options" in $$props2)
      $$invalidate(1, options = $$props2.options);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*scaleControl, options, position*/
    11) {
      {
        if (!scaleControl) {
          $$invalidate(3, scaleControl = new Control.Scale(options).addTo(mapProvider()));
        }
        scaleControl.setPosition(position);
      }
    }
  };
  return [position, options, getScaleControl, scaleControl];
}
class ScaleControl extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, null, safe_not_equal, {
      position: 0,
      options: 1,
      getScaleControl: 2
    });
  }
  get getScaleControl() {
    return this.$$.ctx[2];
  }
}
function instance$2($$self, $$props, $$invalidate) {
  const dispatch = createEventDispatcher();
  const mapProvider = getContext(Map);
  let { url } = $$props;
  let { opacity = 1 } = $$props;
  let { zIndex = 1 } = $$props;
  let { options = {} } = $$props;
  let { events = [] } = $$props;
  let tileLayer;
  let eventBridge;
  onDestroy(() => {
    eventBridge.unregister();
    tileLayer.removeFrom(mapProvider());
  });
  function getTileLayer() {
    return tileLayer;
  }
  $$self.$$set = ($$props2) => {
    if ("url" in $$props2)
      $$invalidate(0, url = $$props2.url);
    if ("opacity" in $$props2)
      $$invalidate(1, opacity = $$props2.opacity);
    if ("zIndex" in $$props2)
      $$invalidate(2, zIndex = $$props2.zIndex);
    if ("options" in $$props2)
      $$invalidate(3, options = $$props2.options);
    if ("events" in $$props2)
      $$invalidate(4, events = $$props2.events);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*tileLayer, url, options, events, opacity, zIndex*/
    95) {
      {
        if (!tileLayer) {
          $$invalidate(6, tileLayer = new TileLayer(url, options).addTo(mapProvider()));
          eventBridge = new EventBridge(tileLayer, dispatch, events);
        }
        tileLayer.setUrl(url);
        tileLayer.setOpacity(opacity);
        tileLayer.setZIndex(zIndex);
      }
    }
  };
  return [url, opacity, zIndex, options, events, getTileLayer, tileLayer];
}
class TileLayer_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, null, safe_not_equal, {
      url: 0,
      opacity: 1,
      zIndex: 2,
      options: 3,
      events: 4,
      getTileLayer: 5
    });
  }
  get getTileLayer() {
    return this.$$.ctx[5];
  }
}
function instance$1($$self, $$props, $$invalidate) {
  const dispatch = createEventDispatcher();
  const mapProvider = getContext(Map);
  let { url } = $$props;
  let { opacity = 1 } = $$props;
  let { zIndex = 1 } = $$props;
  let { options = {} } = $$props;
  let { events = [] } = $$props;
  let tileLayer;
  let eventBridge;
  onDestroy(() => {
    eventBridge.unregister();
    tileLayer.removeFrom(mapProvider());
  });
  function getTileLayer() {
    return tileLayer;
  }
  $$self.$$set = ($$props2) => {
    if ("url" in $$props2)
      $$invalidate(0, url = $$props2.url);
    if ("opacity" in $$props2)
      $$invalidate(1, opacity = $$props2.opacity);
    if ("zIndex" in $$props2)
      $$invalidate(2, zIndex = $$props2.zIndex);
    if ("options" in $$props2)
      $$invalidate(3, options = $$props2.options);
    if ("events" in $$props2)
      $$invalidate(4, events = $$props2.events);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*tileLayer, url, options, events, opacity, zIndex*/
    95) {
      {
        if (!tileLayer) {
          $$invalidate(6, tileLayer = new TileLayer.WMS(url, options).addTo(mapProvider()));
          eventBridge = new EventBridge(tileLayer, dispatch, events);
        }
        tileLayer.setUrl(url);
        tileLayer.setOpacity(opacity);
        tileLayer.setZIndex(zIndex);
      }
    }
  };
  return [url, opacity, zIndex, options, events, getTileLayer, tileLayer];
}
class TileLayerWMS extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, null, safe_not_equal, {
      url: 0,
      opacity: 1,
      zIndex: 2,
      options: 3,
      events: 4,
      getTileLayer: 5
    });
  }
  get getTileLayer() {
    return this.$$.ctx[5];
  }
}
function create_fragment(ctx) {
  let div1;
  let div0;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[6].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[5],
    null
  );
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      if (default_slot)
        default_slot.c();
      set_style(div1, "display", "none");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      if (default_slot) {
        default_slot.m(div0, null);
      }
      ctx[7](div0);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        32)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[5],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[5]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[5],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch = createEventDispatcher();
  const layerProvider = getContext(Layer);
  let { events = [] } = $$props;
  let { options = {} } = $$props;
  let element2;
  let tooltip;
  let eventBridge;
  onDestroy(() => {
    eventBridge.unregister();
  });
  function getTooltip() {
    return tooltip;
  }
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(0, element2);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("events" in $$props2)
      $$invalidate(1, events = $$props2.events);
    if ("options" in $$props2)
      $$invalidate(2, options = $$props2.options);
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*tooltip, options, events, element*/
    23) {
      {
        if (!tooltip) {
          $$invalidate(4, tooltip = new Tooltip(options));
          eventBridge = new EventBridge(tooltip, dispatch, events);
          layerProvider().bindTooltip(tooltip);
        }
        tooltip.setContent(element2);
      }
    }
  };
  return [element2, events, options, getTooltip, tooltip, $$scope, slots, div0_binding];
}
class Tooltip_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { events: 1, options: 2, getTooltip: 3 });
  }
  get getTooltip() {
    return this.$$.ctx[3];
  }
}
export {
  Circle_1 as Circle,
  CircleMarker_1 as CircleMarker,
  DivIcon_1 as DivIcon,
  GeoJSON_1 as GeoJSON,
  Icon_1 as Icon,
  ImageOverlay_1 as ImageOverlay,
  LeafletMap,
  Marker_1 as Marker,
  Polygon_1 as Polygon,
  Polyline_1 as Polyline,
  Popup_1 as Popup,
  Rectangle_1 as Rectangle,
  ScaleControl,
  TileLayer_1 as TileLayer,
  TileLayerWMS,
  Tooltip_1 as Tooltip
};
//# sourceMappingURL=svelte-leafletjs.js.map
