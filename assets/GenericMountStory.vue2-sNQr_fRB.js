import { Y as SvelteComponentDev, Z as init, $ as dispatch_dev, a0 as safe_not_equal, a1 as validate_slots, a2 as Circle_1, a3 as LeafletMap, a4 as Popup_1, a5 as TileLayer_1, a6 as Tooltip_1, a7 as create_component, a8 as mount_component, a9 as transition_in, aa as transition_out, ab as destroy_component, ac as space, ad as insert_dev, ae as detach_dev, af as text, ag as CircleMarker_1, ah as Polygon_1, ai as ensure_array_like_dev, aj as empty, ak as group_outros, al as check_outros, am as destroy_each, an as noop, ao as DivIcon_1, ap as Marker_1, aq as element, ar as set_style, as as add_location, at as logEvent, au as globals, av as onMount, aw as GeoJSON_1, ax as Icon_1, ay as ImageOverlay_1, az as Polyline_1, aA as Rectangle_1, aB as ScaleControl, aC as leafletSrcExports, aD as TileLayerWMS, _ as __vitePreload, aE as createRouter, v as histoireConfig, aF as createWebHistory, aG as createWebHashHistory, aH as markRaw, K as reactive, d as defineComponent, r as ref, aI as watchEffect, o as openBlock, q as createBlock, aJ as mergeProps, aK as resolveDynamicComponent, h as createCommentVNode } from "./vendor-McaHzbIz.js";
const DEFAULT_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const DEFAULT_TILE_LAYER_OPTIONS = {
  minZoom: 0,
  maxZoom: 20,
  maxNativeZoom: 19,
  attribution: "© OpenStreetMap contributors"
};
function create_default_slot_4$8(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Sentosa");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_4$8.name,
    type: "slot",
    source: "(14:12) <Popup>",
    ctx
  });
  return block;
}
function create_default_slot_3$8(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Sentosa");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_3$8.name,
    type: "slot",
    source: "(15:12) <Tooltip>",
    ctx
  });
  return block;
}
function create_default_slot_2$9(ctx) {
  let popup;
  let t;
  let tooltip;
  let current;
  popup = new Popup_1({
    props: {
      $$slots: { default: [create_default_slot_4$8] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  tooltip = new Tooltip_1({
    props: {
      $$slots: { default: [create_default_slot_3$8] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(popup.$$.fragment);
      t = space();
      create_component(tooltip.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(popup, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(tooltip, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const popup_changes = {};
      if (dirty & /*$$scope*/
      4) {
        popup_changes.$$scope = { dirty, ctx: ctx2 };
      }
      popup.$set(popup_changes);
      const tooltip_changes = {};
      if (dirty & /*$$scope*/
      4) {
        tooltip_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tooltip.$set(tooltip_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(popup.$$.fragment, local);
      transition_in(tooltip.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(popup.$$.fragment, local);
      transition_out(tooltip.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(popup, detaching);
      destroy_component(tooltip, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_2$9.name,
    type: "slot",
    source: '(13:8) <Circle latLng={[1.250111, 103.830933]} radius={1000} color=\\"#ff0000\\" fillColor=\\"#ff0000\\">',
    ctx
  });
  return block;
}
function create_default_slot_1$g(ctx) {
  let tilelayer;
  let t;
  let circle;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  circle = new Circle_1({
    props: {
      latLng: [1.250111, 103.830933],
      radius: 1e3,
      color: "#ff0000",
      fillColor: "#ff0000",
      $$slots: { default: [create_default_slot_2$9] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t = space();
      create_component(circle.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(circle, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const circle_changes = {};
      if (dirty & /*$$scope*/
      4) {
        circle_changes.$$scope = { dirty, ctx: ctx2 };
      }
      circle.$set(circle_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(circle.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(circle.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(circle, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$g.name,
    type: "slot",
    source: "(11:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$g(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$g] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      4) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$g.name,
    type: "slot",
    source: '(10:0) <Hst.Story group=\\"vector-layers\\">',
    ctx
  });
  return block;
}
function create_fragment$g(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "vector-layers",
      $$slots: { default: [create_default_slot$g] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      4) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$g.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$g($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Circle_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.250111, 103.830933], zoom: 14 };
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<Circle_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<Circle_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    Circle: Circle_1,
    LeafletMap,
    Popup: Popup_1,
    TileLayer: TileLayer_1,
    Tooltip: Tooltip_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions];
}
class Circle_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$g, create_fragment$g, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Circle_story",
      options,
      id: create_fragment$g.name
    });
  }
  get Hst() {
    throw new Error("<Circle_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<Circle_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  return child_ctx;
}
function create_default_slot_7$1(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Sentosa");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_7$1.name,
    type: "slot",
    source: "(15:12) <Popup>",
    ctx
  });
  return block;
}
function create_default_slot_6$1(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Sentosa");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_6$1.name,
    type: "slot",
    source: "(16:12) <Tooltip>",
    ctx
  });
  return block;
}
function create_default_slot_5$3(ctx) {
  let popup;
  let t;
  let tooltip;
  let current;
  popup = new Popup_1({
    props: {
      $$slots: { default: [create_default_slot_7$1] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  tooltip = new Tooltip_1({
    props: {
      $$slots: { default: [create_default_slot_6$1] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(popup.$$.fragment);
      t = space();
      create_component(tooltip.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(popup, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(tooltip, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const popup_changes = {};
      if (dirty & /*$$scope*/
      64) {
        popup_changes.$$scope = { dirty, ctx: ctx2 };
      }
      popup.$set(popup_changes);
      const tooltip_changes = {};
      if (dirty & /*$$scope*/
      64) {
        tooltip_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tooltip.$set(tooltip_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(popup.$$.fragment, local);
      transition_in(tooltip.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(popup.$$.fragment, local);
      transition_out(tooltip.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(popup, detaching);
      destroy_component(tooltip, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_5$3.name,
    type: "slot",
    source: '(14:8) <Polygon latLngs={polygon1} color=\\"#ff0000\\" fillColor=\\"#ff0000\\">',
    ctx
  });
  return block;
}
function create_default_slot_4$7(ctx) {
  let t_value = (
    /*point*/
    ctx[3] + ""
  );
  let t;
  const block = {
    c: function create() {
      t = text(t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_4$7.name,
    type: "slot",
    source: "(20:16) <Popup>",
    ctx
  });
  return block;
}
function create_default_slot_3$7(ctx) {
  let t_value = (
    /*point*/
    ctx[3] + ""
  );
  let t;
  const block = {
    c: function create() {
      t = text(t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_3$7.name,
    type: "slot",
    source: "(21:16) <Tooltip>",
    ctx
  });
  return block;
}
function create_default_slot_2$8(ctx) {
  let popup;
  let t0;
  let tooltip;
  let t1;
  let current;
  popup = new Popup_1({
    props: {
      $$slots: { default: [create_default_slot_4$7] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  tooltip = new Tooltip_1({
    props: {
      $$slots: { default: [create_default_slot_3$7] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(popup.$$.fragment);
      t0 = space();
      create_component(tooltip.$$.fragment);
      t1 = space();
    },
    m: function mount(target, anchor) {
      mount_component(popup, target, anchor);
      insert_dev(target, t0, anchor);
      mount_component(tooltip, target, anchor);
      insert_dev(target, t1, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const popup_changes = {};
      if (dirty & /*$$scope*/
      64) {
        popup_changes.$$scope = { dirty, ctx: ctx2 };
      }
      popup.$set(popup_changes);
      const tooltip_changes = {};
      if (dirty & /*$$scope*/
      64) {
        tooltip_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tooltip.$set(tooltip_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(popup.$$.fragment, local);
      transition_in(tooltip.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(popup.$$.fragment, local);
      transition_out(tooltip.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t0);
        detach_dev(t1);
      }
      destroy_component(popup, detaching);
      destroy_component(tooltip, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_2$8.name,
    type: "slot",
    source: '(19:12) <CircleMarker latLng={point} radius={3} color=\\"#ff0000\\" fillColor=\\"#ff0000\\">',
    ctx
  });
  return block;
}
function create_each_block(ctx) {
  let circlemarker;
  let current;
  circlemarker = new CircleMarker_1({
    props: {
      latLng: (
        /*point*/
        ctx[3]
      ),
      radius: 3,
      color: "#ff0000",
      fillColor: "#ff0000",
      $$slots: { default: [create_default_slot_2$8] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(circlemarker.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(circlemarker, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const circlemarker_changes = {};
      if (dirty & /*$$scope*/
      64) {
        circlemarker_changes.$$scope = { dirty, ctx: ctx2 };
      }
      circlemarker.$set(circlemarker_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(circlemarker.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(circlemarker.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(circlemarker, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block.name,
    type: "each",
    source: "(18:8) {#each polygon1 as point}",
    ctx
  });
  return block;
}
function create_default_slot_1$f(ctx) {
  let tilelayer;
  let t0;
  let polygon;
  let t1;
  let each_1_anchor;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  polygon = new Polygon_1({
    props: {
      latLngs: (
        /*polygon1*/
        ctx[2]
      ),
      color: "#ff0000",
      fillColor: "#ff0000",
      $$slots: { default: [create_default_slot_5$3] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  let each_value = ensure_array_like_dev(
    /*polygon1*/
    ctx[2]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t0 = space();
      create_component(polygon.$$.fragment);
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t0, anchor);
      mount_component(polygon, target, anchor);
      insert_dev(target, t1, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert_dev(target, each_1_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const polygon_changes = {};
      if (dirty & /*$$scope*/
      64) {
        polygon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      polygon.$set(polygon_changes);
      if (dirty & /*polygon1*/
      4) {
        each_value = ensure_array_like_dev(
          /*polygon1*/
          ctx2[2]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(polygon.$$.fragment, local);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(polygon.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t0);
        detach_dev(t1);
        detach_dev(each_1_anchor);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(polygon, detaching);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$f.name,
    type: "slot",
    source: "(12:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$f(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$f] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      64) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$f.name,
    type: "slot",
    source: '(11:0) <Hst.Story group=\\"vector-layers\\">',
    ctx
  });
  return block;
}
function create_fragment$f(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "vector-layers",
      $$slots: { default: [create_default_slot$f] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      64) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$f.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$f($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("CircleMarker_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.250111, 103.830933], zoom: 14 };
  const polygon1 = [
    [1.2605024, 103.804856],
    [1.2595155, 103.8058001],
    [1.2572416, 103.8080317],
    [1.2555254, 103.808418],
    [1.2549247, 103.8096625],
    [1.2527365, 103.8122374],
    [1.2507629, 103.8157565],
    [1.2486177, 103.8189322],
    [1.2460862, 103.8224942],
    [1.2419673, 103.8262707],
    [1.2378055, 103.8309485],
    [1.2371619, 103.8328797],
    [1.2374194, 103.8341242],
    [1.2383204, 103.8351113],
    [1.2383204, 103.8356263],
    [1.238063, 103.8371712],
    [1.2398221, 103.8398749],
    [1.241195, 103.841334],
    [1.2435977, 103.8437373],
    [1.2460004, 103.8454539],
    [1.2487035, 103.8477713],
    [1.2523075, 103.8492304],
    [1.2535517, 103.8473851],
    [1.2536805, 103.845883],
    [1.2531227, 103.844381],
    [1.2528653, 103.8425786],
    [1.2541953, 103.8420636],
    [1.2540666, 103.8404757],
    [1.2545386, 103.838287],
    [1.2538092, 103.8371283],
    [1.2537234, 103.8350684],
    [1.255225, 103.8321501],
    [1.2550534, 103.829189],
    [1.2556112, 103.8254124],
    [1.2581855, 103.8233954],
    [1.2601591, 103.8198763],
    [1.2608027, 103.8168294],
    [1.2596443, 103.8136965],
    [1.2605024, 103.804856]
  ];
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<CircleMarker_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<CircleMarker_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    CircleMarker: CircleMarker_1,
    LeafletMap,
    Polygon: Polygon_1,
    Popup: Popup_1,
    TileLayer: TileLayer_1,
    Tooltip: Tooltip_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions,
    polygon1
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions, polygon1];
}
class CircleMarker_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$f, create_fragment$f, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "CircleMarker_story",
      options,
      id: create_fragment$f.name
    });
  }
  get Hst() {
    throw new Error("<CircleMarker_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<CircleMarker_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
const file$2 = "src/stories/DivIcon.story.svelte";
function create_default_slot_4$6(ctx) {
  let divicon;
  let current;
  divicon = new DivIcon_1({
    props: { options: (
      /*divIconOptions*/
      ctx[2]
    ) },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(divicon.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(divicon, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current)
        return;
      transition_in(divicon.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(divicon.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(divicon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_4$6.name,
    type: "slot",
    source: "(18:8) <Marker latLng={[1.359167, 103.989441]}>",
    ctx
  });
  return block;
}
function create_default_slot_3$6(ctx) {
  let div;
  const block = {
    c: function create() {
      div = element("div");
      div.textContent = "using slot";
      set_style(div, "background-color", "#0000ff");
      set_style(div, "color", "#fff");
      set_style(div, "width", "40px");
      set_style(div, "text-align", "center");
      add_location(div, file$2, 26, 16, 836);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(div);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_3$6.name,
    type: "slot",
    source: "(22:12) <DivIcon>",
    ctx
  });
  return block;
}
function create_default_slot_2$7(ctx) {
  let divicon;
  let current;
  divicon = new DivIcon_1({
    props: {
      $$slots: { default: [create_default_slot_3$6] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(divicon.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(divicon, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const divicon_changes = {};
      if (dirty & /*$$scope*/
      8) {
        divicon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divicon.$set(divicon_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(divicon.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(divicon.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(divicon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_2$7.name,
    type: "slot",
    source: "(21:8) <Marker latLng={[1.359167, 103.789441]}>",
    ctx
  });
  return block;
}
function create_default_slot_1$e(ctx) {
  let tilelayer;
  let t0;
  let marker0;
  let t1;
  let marker1;
  let t2;
  let marker2;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  marker0 = new Marker_1({
    props: { latLng: [1.282375, 103.864273] },
    $$inline: true
  });
  marker1 = new Marker_1({
    props: {
      latLng: [1.359167, 103.989441],
      $$slots: { default: [create_default_slot_4$6] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  marker2 = new Marker_1({
    props: {
      latLng: [1.359167, 103.789441],
      $$slots: { default: [create_default_slot_2$7] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t0 = space();
      create_component(marker0.$$.fragment);
      t1 = space();
      create_component(marker1.$$.fragment);
      t2 = space();
      create_component(marker2.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t0, anchor);
      mount_component(marker0, target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(marker1, target, anchor);
      insert_dev(target, t2, anchor);
      mount_component(marker2, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const marker1_changes = {};
      if (dirty & /*$$scope*/
      8) {
        marker1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      marker1.$set(marker1_changes);
      const marker2_changes = {};
      if (dirty & /*$$scope*/
      8) {
        marker2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      marker2.$set(marker2_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(marker0.$$.fragment, local);
      transition_in(marker1.$$.fragment, local);
      transition_in(marker2.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(marker0.$$.fragment, local);
      transition_out(marker1.$$.fragment, local);
      transition_out(marker2.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t0);
        detach_dev(t1);
        detach_dev(t2);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(marker0, detaching);
      destroy_component(marker1, detaching);
      destroy_component(marker2, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$e.name,
    type: "slot",
    source: "(15:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$e(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$e] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      8) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$e.name,
    type: "slot",
    source: '(14:0) <Hst.Story group=\\"basic-types\\">',
    ctx
  });
  return block;
}
function create_fragment$e(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "basic-types",
      $$slots: { default: [create_default_slot$e] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      8) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$e.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$e($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("DivIcon_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.364917, 103.822872], zoom: 11 };
  const divIconOptions = {
    html: '<div style="background-color: #ff0000; color: #fff; width: 40px; text-align: center;">using props</div>'
  };
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<DivIcon_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<DivIcon_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    DivIcon: DivIcon_1,
    LeafletMap,
    Marker: Marker_1,
    TileLayer: TileLayer_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions,
    divIconOptions
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions, divIconOptions];
}
class DivIcon_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$e, create_fragment$e, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "DivIcon_story",
      options,
      id: create_fragment$e.name
    });
  }
  get Hst() {
    throw new Error("<DivIcon_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<DivIcon_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
const { console: console_1$1 } = globals;
function create_default_slot_4$5(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Sentosa");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_4$5.name,
    type: "slot",
    source: "(38:12) <Popup>",
    ctx
  });
  return block;
}
function create_default_slot_3$5(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Sentosa");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_3$5.name,
    type: "slot",
    source: "(39:12) <Tooltip>",
    ctx
  });
  return block;
}
function create_default_slot_2$6(ctx) {
  let popup;
  let t;
  let tooltip;
  let current;
  popup = new Popup_1({
    props: {
      $$slots: { default: [create_default_slot_4$5] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  tooltip = new Tooltip_1({
    props: {
      $$slots: { default: [create_default_slot_3$5] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(popup.$$.fragment);
      t = space();
      create_component(tooltip.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(popup, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(tooltip, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const popup_changes = {};
      if (dirty & /*$$scope*/
      256) {
        popup_changes.$$scope = { dirty, ctx: ctx2 };
      }
      popup.$set(popup_changes);
      const tooltip_changes = {};
      if (dirty & /*$$scope*/
      256) {
        tooltip_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tooltip.$set(tooltip_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(popup.$$.fragment, local);
      transition_in(tooltip.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(popup.$$.fragment, local);
      transition_out(tooltip.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(popup, detaching);
      destroy_component(tooltip, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_2$6.name,
    type: "slot",
    source: "(35:8) <Circle latLng={[1.250111, 103.830933]} radius={radius} color={color} fillColor={color}                 events={['mouseout', 'mouseover']} on:mouseout={e => handleMouseOut(e)}                 on:mouseover={e => handleMouseOver(e)}>",
    ctx
  });
  return block;
}
function create_default_slot_1$d(ctx) {
  let tilelayer;
  let t;
  let circle;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  circle = new Circle_1({
    props: {
      latLng: [1.250111, 103.830933],
      radius: (
        /*radius*/
        ctx[2]
      ),
      color: (
        /*color*/
        ctx[1]
      ),
      fillColor: (
        /*color*/
        ctx[1]
      ),
      events: ["mouseout", "mouseover"],
      $$slots: { default: [create_default_slot_2$6] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  circle.$on(
    "mouseout",
    /*mouseout_handler*/
    ctx[6]
  );
  circle.$on(
    "mouseover",
    /*mouseover_handler*/
    ctx[7]
  );
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t = space();
      create_component(circle.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(circle, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const circle_changes = {};
      if (dirty & /*radius*/
      4)
        circle_changes.radius = /*radius*/
        ctx2[2];
      if (dirty & /*color*/
      2)
        circle_changes.color = /*color*/
        ctx2[1];
      if (dirty & /*color*/
      2)
        circle_changes.fillColor = /*color*/
        ctx2[1];
      if (dirty & /*$$scope*/
      256) {
        circle_changes.$$scope = { dirty, ctx: ctx2 };
      }
      circle.$set(circle_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(circle.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(circle.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(circle, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$d.name,
    type: "slot",
    source: "(33:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$d(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[3]
      ),
      $$slots: { default: [create_default_slot_1$d] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope, radius, color*/
      262) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$d.name,
    type: "slot",
    source: '(32:0) <Hst.Story group=\\"events\\">',
    ctx
  });
  return block;
}
function create_fragment$d(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "events",
      $$slots: { default: [create_default_slot$d] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope, radius, color*/
      262) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$d.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function scrubEvent(e) {
  const e2 = { ...e.detail };
  delete e2.originalEvent;
  delete e2.sourceTarget;
  delete e2.target;
  return e2;
}
function instance$d($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("EventHandling_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.250111, 103.830933], zoom: 14 };
  let color = "#ff0000";
  let radius = 1e3;
  function handleMouseOut(e) {
    $$invalidate(1, color = "#ff0000");
    $$invalidate(2, radius = 1e3);
    console.log(e);
    logEvent(e.type, scrubEvent(e));
  }
  function handleMouseOver(e) {
    $$invalidate(1, color = "#0000ff");
    $$invalidate(2, radius = 2e3);
    console.log(e);
    logEvent(e.type, scrubEvent(e));
  }
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console_1$1.warn("<EventHandling_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console_1$1.warn(`<EventHandling_story> was created with unknown prop '${key}'`);
  });
  const mouseout_handler = (e) => handleMouseOut(e);
  const mouseover_handler = (e) => handleMouseOver(e);
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    logEvent,
    Circle: Circle_1,
    LeafletMap,
    Popup: Popup_1,
    TileLayer: TileLayer_1,
    Tooltip: Tooltip_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions,
    color,
    radius,
    handleMouseOut,
    handleMouseOver,
    scrubEvent
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
    if ("color" in $$props2)
      $$invalidate(1, color = $$props2.color);
    if ("radius" in $$props2)
      $$invalidate(2, radius = $$props2.radius);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [
    Hst,
    color,
    radius,
    mapOptions,
    handleMouseOut,
    handleMouseOver,
    mouseout_handler,
    mouseover_handler
  ];
}
class EventHandling_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$d, create_fragment$d, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "EventHandling_story",
      options,
      id: create_fragment$d.name
    });
  }
  get Hst() {
    throw new Error("<EventHandling_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<EventHandling_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
const { console: console_1 } = globals;
function create_default_slot_1$c(ctx) {
  let tilelayer;
  let t;
  let geojson;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  geojson = new GeoJSON_1({
    props: {
      data: (
        /*geoJsonData*/
        ctx[1]
      ),
      options: (
        /*geoJsonOptions*/
        ctx[3]
      )
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t = space();
      create_component(geojson.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(geojson, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const geojson_changes = {};
      if (dirty & /*geoJsonData*/
      2)
        geojson_changes.data = /*geoJsonData*/
        ctx2[1];
      geojson.$set(geojson_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(geojson.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(geojson.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(geojson, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$c.name,
    type: "slot",
    source: "(29:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$c(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[2]
      ),
      $$slots: { default: [create_default_slot_1$c] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope, geoJsonData*/
      18) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$c.name,
    type: "slot",
    source: '(28:0) <Hst.Story group=\\"other-layers\\">',
    ctx
  });
  return block;
}
function create_fragment$c(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "other-layers",
      $$slots: { default: [create_default_slot$c] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope, geoJsonData*/
      18) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$c.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$c($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("GeoJSON_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.250111, 103.830933], zoom: 14 };
  const geoJsonOptions = {
    style(geoJsonFeature) {
      console.log("style", geoJsonFeature);
      return {};
    },
    onEachFeature(feature, layer) {
      console.log("onEachFeature", feature, layer);
    }
  };
  let geoJsonData;
  onMount(() => {
    fetch("data/example.geojson").then((rsp) => {
      rsp.json().then((json) => {
        $$invalidate(1, geoJsonData = json);
      });
    });
  });
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console_1.warn("<GeoJSON_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console_1.warn(`<GeoJSON_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    GeoJSON: GeoJSON_1,
    LeafletMap,
    TileLayer: TileLayer_1,
    onMount,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions,
    geoJsonOptions,
    geoJsonData
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
    if ("geoJsonData" in $$props2)
      $$invalidate(1, geoJsonData = $$props2.geoJsonData);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, geoJsonData, mapOptions, geoJsonOptions];
}
class GeoJSON_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$c, create_fragment$c, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "GeoJSON_story",
      options,
      id: create_fragment$c.name
    });
  }
  get Hst() {
    throw new Error("<GeoJSON_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<GeoJSON_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
function create_default_slot_2$5(ctx) {
  let icon;
  let current;
  icon = new Icon_1({
    props: {
      iconUrl: "icons/airport.svg",
      options: (
        /*iconOptions*/
        ctx[2]
      )
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(icon.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(icon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_2$5.name,
    type: "slot",
    source: "(22:8) <Marker latLng={[1.359167, 103.989441]}>",
    ctx
  });
  return block;
}
function create_default_slot_1$b(ctx) {
  let tilelayer;
  let t0;
  let marker0;
  let t1;
  let marker1;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  marker0 = new Marker_1({
    props: { latLng: [1.282375, 103.864273] },
    $$inline: true
  });
  marker1 = new Marker_1({
    props: {
      latLng: [1.359167, 103.989441],
      $$slots: { default: [create_default_slot_2$5] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t0 = space();
      create_component(marker0.$$.fragment);
      t1 = space();
      create_component(marker1.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t0, anchor);
      mount_component(marker0, target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(marker1, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const marker1_changes = {};
      if (dirty & /*$$scope*/
      8) {
        marker1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      marker1.$set(marker1_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(marker0.$$.fragment, local);
      transition_in(marker1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(marker0.$$.fragment, local);
      transition_out(marker1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t0);
        detach_dev(t1);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(marker0, detaching);
      destroy_component(marker1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$b.name,
    type: "slot",
    source: "(19:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$b(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$b] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      8) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$b.name,
    type: "slot",
    source: '(18:0) <Hst.Story group=\\"basic-types\\">',
    ctx
  });
  return block;
}
function create_fragment$b(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "basic-types",
      $$slots: { default: [create_default_slot$b] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      8) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$b.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$b($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Icon_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.364917, 103.822872], zoom: 11 };
  const iconOptions = {
    iconUrl: "icons/airport.svg",
    iconSize: [41, 41],
    iconAnchor: [20, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28]
  };
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<Icon_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<Icon_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    Icon: Icon_1,
    LeafletMap,
    Marker: Marker_1,
    TileLayer: TileLayer_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions,
    iconOptions
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions, iconOptions];
}
class Icon_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$b, create_fragment$b, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Icon_story",
      options,
      id: create_fragment$b.name
    });
  }
  get Hst() {
    throw new Error("<Icon_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<Icon_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
function create_default_slot_1$a(ctx) {
  let tilelayer;
  let t;
  let imageoverlay;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  imageoverlay = new ImageOverlay_1({
    props: {
      imageUrl: "images/dpsri_70km_2021082110500000dBR.dpsri.png",
      bounds: (
        /*bounds*/
        ctx[3]
      ),
      options: (
        /*imageOverlayOptions*/
        ctx[2]
      )
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t = space();
      create_component(imageoverlay.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(imageoverlay, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(imageoverlay.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(imageoverlay.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(imageoverlay, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$a.name,
    type: "slot",
    source: "(15:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$a(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$a] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      16) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$a.name,
    type: "slot",
    source: '(14:0) <Hst.Story group=\\"raster-layers\\">',
    ctx
  });
  return block;
}
function create_fragment$a(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "raster-layers",
      $$slots: { default: [create_default_slot$a] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      16) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$a.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$a($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("ImageOverlay_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.364917, 103.822872], zoom: 11 };
  const imageOverlayOptions = { opacity: 0.5 };
  const bounds = [[1.17, 103.565], [1.4836, 104.143]];
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<ImageOverlay_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<ImageOverlay_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    ImageOverlay: ImageOverlay_1,
    LeafletMap,
    TileLayer: TileLayer_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions,
    imageOverlayOptions,
    bounds
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions, imageOverlayOptions, bounds];
}
class ImageOverlay_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$a, create_fragment$a, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "ImageOverlay_story",
      options,
      id: create_fragment$a.name
    });
  }
  get Hst() {
    throw new Error("<ImageOverlay_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<ImageOverlay_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
function create_default_slot_1$9(ctx) {
  let tilelayer;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(tilelayer, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$9.name,
    type: "slot",
    source: "(11:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$9(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$9] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      4) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$9.name,
    type: "slot",
    source: '(10:0) <Hst.Story group=\\"top\\">',
    ctx
  });
  return block;
}
function create_fragment$9(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "top",
      $$slots: { default: [create_default_slot$9] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      4) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$9.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$9($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("LeafletMap_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.364917, 103.822872], zoom: 11 };
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<LeafletMap_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<LeafletMap_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    LeafletMap,
    TileLayer: TileLayer_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions];
}
class LeafletMap_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$9, create_fragment$9, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "LeafletMap_story",
      options,
      id: create_fragment$9.name
    });
  }
  get Hst() {
    throw new Error("<LeafletMap_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<LeafletMap_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
function create_default_slot_1$8(ctx) {
  let tilelayer;
  let t0;
  let marker0;
  let t1;
  let marker1;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  marker0 = new Marker_1({
    props: { latLng: [1.282375, 103.864273] },
    $$inline: true
  });
  marker1 = new Marker_1({
    props: { latLng: [1.359167, 103.989441] },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t0 = space();
      create_component(marker0.$$.fragment);
      t1 = space();
      create_component(marker1.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t0, anchor);
      mount_component(marker0, target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(marker1, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(marker0.$$.fragment, local);
      transition_in(marker1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(marker0.$$.fragment, local);
      transition_out(marker1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t0);
        detach_dev(t1);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(marker0, detaching);
      destroy_component(marker1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$8.name,
    type: "slot",
    source: "(12:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$8(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$8] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      4) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$8.name,
    type: "slot",
    source: '(11:0) <Hst.Story group=\\"ui-layers\\">',
    ctx
  });
  return block;
}
function create_fragment$8(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "ui-layers",
      $$slots: { default: [create_default_slot$8] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      4) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$8.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$8($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Marker_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.364917, 103.822872], zoom: 11 };
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<Marker_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<Marker_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    LeafletMap,
    Marker: Marker_1,
    TileLayer: TileLayer_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions];
}
class Marker_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$8, create_fragment$8, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Marker_story",
      options,
      id: create_fragment$8.name
    });
  }
  get Hst() {
    throw new Error("<Marker_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<Marker_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
function create_default_slot_4$4(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Sentosa");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_4$4.name,
    type: "slot",
    source: "(15:12) <Popup>",
    ctx
  });
  return block;
}
function create_default_slot_3$4(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Sentosa");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_3$4.name,
    type: "slot",
    source: "(16:12) <Tooltip>",
    ctx
  });
  return block;
}
function create_default_slot_2$4(ctx) {
  let popup;
  let t;
  let tooltip;
  let current;
  popup = new Popup_1({
    props: {
      $$slots: { default: [create_default_slot_4$4] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  tooltip = new Tooltip_1({
    props: {
      $$slots: { default: [create_default_slot_3$4] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(popup.$$.fragment);
      t = space();
      create_component(tooltip.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(popup, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(tooltip, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const popup_changes = {};
      if (dirty & /*$$scope*/
      8) {
        popup_changes.$$scope = { dirty, ctx: ctx2 };
      }
      popup.$set(popup_changes);
      const tooltip_changes = {};
      if (dirty & /*$$scope*/
      8) {
        tooltip_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tooltip.$set(tooltip_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(popup.$$.fragment, local);
      transition_in(tooltip.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(popup.$$.fragment, local);
      transition_out(tooltip.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(popup, detaching);
      destroy_component(tooltip, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_2$4.name,
    type: "slot",
    source: '(14:8) <Polygon latLngs={polygon1} color=\\"#ff0000\\" fillColor=\\"#ff0000\\">',
    ctx
  });
  return block;
}
function create_default_slot_1$7(ctx) {
  let tilelayer;
  let t;
  let polygon;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  polygon = new Polygon_1({
    props: {
      latLngs: (
        /*polygon1*/
        ctx[2]
      ),
      color: "#ff0000",
      fillColor: "#ff0000",
      $$slots: { default: [create_default_slot_2$4] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t = space();
      create_component(polygon.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(polygon, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const polygon_changes = {};
      if (dirty & /*$$scope*/
      8) {
        polygon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      polygon.$set(polygon_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(polygon.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(polygon.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(polygon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$7.name,
    type: "slot",
    source: "(12:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$7(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$7] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      8) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$7.name,
    type: "slot",
    source: '(11:0) <Hst.Story group=\\"vector-layers\\">',
    ctx
  });
  return block;
}
function create_fragment$7(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "vector-layers",
      $$slots: { default: [create_default_slot$7] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      8) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$7.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$7($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Polygon_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.250111, 103.830933], zoom: 14 };
  const polygon1 = [
    [1.2605024, 103.804856],
    [1.2595155, 103.8058001],
    [1.2572416, 103.8080317],
    [1.2555254, 103.808418],
    [1.2549247, 103.8096625],
    [1.2527365, 103.8122374],
    [1.2507629, 103.8157565],
    [1.2486177, 103.8189322],
    [1.2460862, 103.8224942],
    [1.2419673, 103.8262707],
    [1.2378055, 103.8309485],
    [1.2371619, 103.8328797],
    [1.2374194, 103.8341242],
    [1.2383204, 103.8351113],
    [1.2383204, 103.8356263],
    [1.238063, 103.8371712],
    [1.2398221, 103.8398749],
    [1.241195, 103.841334],
    [1.2435977, 103.8437373],
    [1.2460004, 103.8454539],
    [1.2487035, 103.8477713],
    [1.2523075, 103.8492304],
    [1.2535517, 103.8473851],
    [1.2536805, 103.845883],
    [1.2531227, 103.844381],
    [1.2528653, 103.8425786],
    [1.2541953, 103.8420636],
    [1.2540666, 103.8404757],
    [1.2545386, 103.838287],
    [1.2538092, 103.8371283],
    [1.2537234, 103.8350684],
    [1.255225, 103.8321501],
    [1.2550534, 103.829189],
    [1.2556112, 103.8254124],
    [1.2581855, 103.8233954],
    [1.2601591, 103.8198763],
    [1.2608027, 103.8168294],
    [1.2596443, 103.8136965],
    [1.2605024, 103.804856]
  ];
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<Polygon_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<Polygon_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    LeafletMap,
    Polygon: Polygon_1,
    Popup: Popup_1,
    TileLayer: TileLayer_1,
    Tooltip: Tooltip_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions,
    polygon1
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions, polygon1];
}
class Polygon_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$7, create_fragment$7, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Polygon_story",
      options,
      id: create_fragment$7.name
    });
  }
  get Hst() {
    throw new Error("<Polygon_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<Polygon_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
function create_default_slot_5$2(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Marina Bay Sands to Changi Airport");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_5$2.name,
    type: "slot",
    source: "(16:12) <Popup>",
    ctx
  });
  return block;
}
function create_default_slot_4$3(ctx) {
  let popup;
  let current;
  popup = new Popup_1({
    props: {
      $$slots: { default: [create_default_slot_5$2] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(popup.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(popup, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const popup_changes = {};
      if (dirty & /*$$scope*/
      16) {
        popup_changes.$$scope = { dirty, ctx: ctx2 };
      }
      popup.$set(popup_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(popup.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(popup.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(popup, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_4$3.name,
    type: "slot",
    source: "(15:8) <Polyline latLngs={polyline1}>",
    ctx
  });
  return block;
}
function create_default_slot_3$3(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Resorts World Sentosa to Vivo City");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_3$3.name,
    type: "slot",
    source: "(19:12) <Tooltip>",
    ctx
  });
  return block;
}
function create_default_slot_2$3(ctx) {
  let tooltip;
  let current;
  tooltip = new Tooltip_1({
    props: {
      $$slots: { default: [create_default_slot_3$3] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tooltip.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tooltip, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const tooltip_changes = {};
      if (dirty & /*$$scope*/
      16) {
        tooltip_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tooltip.$set(tooltip_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tooltip.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tooltip.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(tooltip, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_2$3.name,
    type: "slot",
    source: '(18:8) <Polyline latLngs={polyline2} color=\\"#000000\\">',
    ctx
  });
  return block;
}
function create_default_slot_1$6(ctx) {
  let tilelayer;
  let t0;
  let polyline0;
  let t1;
  let polyline1_1;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  polyline0 = new Polyline_1({
    props: {
      latLngs: (
        /*polyline1*/
        ctx[2]
      ),
      $$slots: { default: [create_default_slot_4$3] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  polyline1_1 = new Polyline_1({
    props: {
      latLngs: (
        /*polyline2*/
        ctx[3]
      ),
      color: "#000000",
      $$slots: { default: [create_default_slot_2$3] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t0 = space();
      create_component(polyline0.$$.fragment);
      t1 = space();
      create_component(polyline1_1.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t0, anchor);
      mount_component(polyline0, target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(polyline1_1, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const polyline0_changes = {};
      if (dirty & /*$$scope*/
      16) {
        polyline0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      polyline0.$set(polyline0_changes);
      const polyline1_1_changes = {};
      if (dirty & /*$$scope*/
      16) {
        polyline1_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      polyline1_1.$set(polyline1_1_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(polyline0.$$.fragment, local);
      transition_in(polyline1_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(polyline0.$$.fragment, local);
      transition_out(polyline1_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t0);
        detach_dev(t1);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(polyline0, detaching);
      destroy_component(polyline1_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$6.name,
    type: "slot",
    source: "(13:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$6(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$6] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      16) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$6.name,
    type: "slot",
    source: '(12:0) <Hst.Story group=\\"vector-layers\\">',
    ctx
  });
  return block;
}
function create_fragment$6(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "vector-layers",
      $$slots: { default: [create_default_slot$6] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      16) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$6($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Polyline_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.250111, 103.830933], zoom: 14 };
  const polyline1 = [
    [1.28465, 103.86074],
    [1.28463, 103.86073],
    [1.28432, 103.86063],
    [1.28403, 103.86051],
    [1.28393, 103.86046],
    [1.28376, 103.86036],
    [1.28362, 103.86028],
    [1.28349, 103.8602],
    [1.2834, 103.86013],
    [1.28319, 103.86],
    [1.28291, 103.85981],
    [1.28249, 103.85956],
    [1.28241, 103.85951],
    [1.28236, 103.85958],
    [1.28225, 103.85975],
    [1.28215, 103.85991],
    [1.28214, 103.85992],
    [1.2819, 103.86027],
    [1.28184, 103.86036],
    [1.2818, 103.86044],
    [1.28179, 103.86048],
    [1.28178, 103.86054],
    [1.28177, 103.86062],
    [1.28198, 103.8607],
    [1.28217, 103.86077],
    [1.28224, 103.8608],
    [1.28231, 103.86083],
    [1.28245, 103.86089],
    [1.28259, 103.86094],
    [1.28291, 103.86104],
    [1.28324, 103.86114],
    [1.28375, 103.86125],
    [1.28412, 103.86131],
    [1.28429, 103.86134],
    [1.28452, 103.86138],
    [1.28483, 103.86142],
    [1.285, 103.86145],
    [1.28524, 103.86147],
    [1.28614, 103.86149],
    [1.28663, 103.8615],
    [1.28704, 103.8615],
    [1.28712, 103.8615],
    [1.2873, 103.86151],
    [1.28739, 103.86151],
    [1.28765, 103.86151],
    [1.28783, 103.86151],
    [1.2879, 103.86151],
    [1.28801, 103.86151],
    [1.28815, 103.86151],
    [1.28843, 103.86152],
    [1.28871, 103.86154],
    [1.28886, 103.86154],
    [1.28901, 103.86155],
    [1.28932, 103.86156],
    [1.28938, 103.86156],
    [1.28949, 103.86157],
    [1.2896, 103.86158],
    [1.29029, 103.86159],
    [1.2906, 103.8616],
    [1.29113, 103.86162],
    [1.2913, 103.86163],
    [1.29134, 103.86163],
    [1.2914, 103.86164],
    [1.2915, 103.86165],
    [1.29172, 103.86169],
    [1.29179, 103.86171],
    [1.29197, 103.86175],
    [1.29209, 103.86178],
    [1.29215, 103.8618],
    [1.29223, 103.86183],
    [1.29234, 103.86187],
    [1.29249, 103.86194],
    [1.29259, 103.86199],
    [1.29279, 103.8621],
    [1.29294, 103.86223],
    [1.29305, 103.86234],
    [1.29313, 103.86241],
    [1.29315, 103.86244],
    [1.29316, 103.86244],
    [1.29321, 103.8625],
    [1.29321, 103.86251],
    [1.29327, 103.86257],
    [1.2933, 103.86261],
    [1.29332, 103.86263],
    [1.29334, 103.86265],
    [1.29336, 103.86268],
    [1.29337, 103.86269],
    [1.29342, 103.86275],
    [1.29346, 103.86281],
    [1.2935, 103.86285],
    [1.29359, 103.86298],
    [1.29365, 103.86308],
    [1.29371, 103.8632],
    [1.29378, 103.86332],
    [1.29384, 103.86349],
    [1.29388, 103.8636],
    [1.29391, 103.86368],
    [1.29392, 103.86374],
    [1.29396, 103.8639],
    [1.294, 103.86405],
    [1.29408, 103.86437],
    [1.2941, 103.86448],
    [1.29429, 103.86543],
    [1.29447, 103.86634],
    [1.29448, 103.86641],
    [1.29449, 103.86648],
    [1.29451, 103.86653],
    [1.29462, 103.86718],
    [1.29468, 103.86754],
    [1.29476, 103.86794],
    [1.29478, 103.86804],
    [1.29479, 103.86812],
    [1.29483, 103.8683],
    [1.29496, 103.86897],
    [1.29497, 103.86901],
    [1.29505, 103.86945],
    [1.29514, 103.86998],
    [1.2952, 103.87033],
    [1.29532, 103.87089],
    [1.29535, 103.87101],
    [1.29538, 103.87137],
    [1.29539, 103.87155],
    [1.29539, 103.87172],
    [1.29539, 103.87181],
    [1.29539, 103.87189],
    [1.29541, 103.87251],
    [1.29541, 103.87262],
    [1.29542, 103.87301],
    [1.29542, 103.87332],
    [1.29543, 103.87353],
    [1.29544, 103.87396],
    [1.29546, 103.87474],
    [1.29548, 103.87506],
    [1.29548, 103.87511],
    [1.29549, 103.87528],
    [1.29549, 103.87549],
    [1.2955, 103.87567],
    [1.2955, 103.87587],
    [1.2955, 103.87608],
    [1.29552, 103.87636],
    [1.29553, 103.87664],
    [1.29553, 103.87672],
    [1.29553, 103.87674],
    [1.29555, 103.87738],
    [1.29556, 103.87777],
    [1.29557, 103.87805],
    [1.29558, 103.87828],
    [1.29559, 103.87884],
    [1.29559, 103.87891],
    [1.2956, 103.87927],
    [1.29562, 103.87966],
    [1.29563, 103.87983],
    [1.29563, 103.8799],
    [1.29564, 103.87996],
    [1.29566, 103.88033],
    [1.29568, 103.88063],
    [1.2957, 103.88094],
    [1.29572, 103.88137],
    [1.29575, 103.8822],
    [1.2958, 103.88343],
    [1.29582, 103.88372],
    [1.29587, 103.88506],
    [1.29587, 103.88511],
    [1.29588, 103.88523],
    [1.29588, 103.88527],
    [1.29588, 103.88535],
    [1.29588, 103.88555],
    [1.29588, 103.88565],
    [1.29588, 103.88632],
    [1.29588, 103.88637],
    [1.29586, 103.88701],
    [1.29583, 103.88771],
    [1.29583, 103.88789],
    [1.29577, 103.88918],
    [1.29575, 103.88963],
    [1.29568, 103.89118],
    [1.29567, 103.89142],
    [1.29568, 103.89251],
    [1.2957, 103.89264],
    [1.2957, 103.89276],
    [1.29571, 103.8929],
    [1.29578, 103.89336],
    [1.29588, 103.89385],
    [1.29602, 103.89439],
    [1.2961, 103.89462],
    [1.29613, 103.89474],
    [1.29638, 103.89541],
    [1.29656, 103.89589],
    [1.29663, 103.89607],
    [1.2967, 103.89622],
    [1.29703, 103.89702],
    [1.29707, 103.89714],
    [1.29709, 103.89725],
    [1.29712, 103.89731],
    [1.29717, 103.89743],
    [1.29718, 103.89748],
    [1.29726, 103.89768],
    [1.29793, 103.89946],
    [1.29814, 103.90005],
    [1.29833, 103.90058],
    [1.29847, 103.90093],
    [1.29866, 103.90144],
    [1.29875, 103.90169],
    [1.29886, 103.90201],
    [1.29889, 103.90209],
    [1.29896, 103.90226],
    [1.29902, 103.90243],
    [1.29924, 103.90302],
    [1.2994, 103.90342],
    [1.29941, 103.90345],
    [1.2995, 103.90369],
    [1.29972, 103.90425],
    [1.29972, 103.90426],
    [1.2998, 103.9045],
    [1.29988, 103.90472],
    [1.29995, 103.90492],
    [1.3, 103.90504],
    [1.30007, 103.90525],
    [1.30012, 103.90538],
    [1.30014, 103.90544],
    [1.30028, 103.90591],
    [1.30085, 103.90787],
    [1.30099, 103.90834],
    [1.30101, 103.90841],
    [1.30154, 103.9104],
    [1.30157, 103.91049],
    [1.30157, 103.91051],
    [1.30161, 103.91064],
    [1.30175, 103.9111],
    [1.30232, 103.91313],
    [1.30253, 103.91392],
    [1.30275, 103.91464],
    [1.30285, 103.91499],
    [1.3031, 103.91588],
    [1.30326, 103.91642],
    [1.30337, 103.91681],
    [1.30353, 103.91741],
    [1.30385, 103.91852],
    [1.30399, 103.91899],
    [1.30408, 103.9193],
    [1.30418, 103.91963],
    [1.30428, 103.91999],
    [1.30436, 103.92033],
    [1.3044, 103.92058],
    [1.30443, 103.92069],
    [1.30446, 103.92081],
    [1.30449, 103.92092],
    [1.30453, 103.92106],
    [1.30466, 103.92154],
    [1.30466, 103.92155],
    [1.30479, 103.922],
    [1.30487, 103.92228],
    [1.30499, 103.92273],
    [1.30501, 103.92283],
    [1.3051, 103.92317],
    [1.30518, 103.92344],
    [1.30541, 103.92418],
    [1.30564, 103.92494],
    [1.30591, 103.92587],
    [1.30596, 103.92609],
    [1.30607, 103.92637],
    [1.30618, 103.92664],
    [1.30624, 103.92676],
    [1.30629, 103.92687],
    [1.30645, 103.92718],
    [1.30658, 103.92741],
    [1.30676, 103.92772],
    [1.307, 103.92811],
    [1.30714, 103.92837],
    [1.30726, 103.92859],
    [1.30734, 103.92874],
    [1.30752, 103.92916],
    [1.30758, 103.92932],
    [1.30765, 103.9295],
    [1.30776, 103.92984],
    [1.30784, 103.93009],
    [1.30803, 103.93078],
    [1.30836, 103.93203],
    [1.30849, 103.93248],
    [1.30859, 103.9328],
    [1.30875, 103.93334],
    [1.3088, 103.93352],
    [1.30903, 103.93435],
    [1.30916, 103.93478],
    [1.30932, 103.93537],
    [1.30975, 103.93688],
    [1.30989, 103.93739],
    [1.30995, 103.9376],
    [1.31001, 103.93774],
    [1.31004, 103.93789],
    [1.31025, 103.93865],
    [1.31036, 103.93904],
    [1.31044, 103.93932],
    [1.31142, 103.94276],
    [1.31146, 103.94287],
    [1.31153, 103.94311],
    [1.31158, 103.94332],
    [1.31171, 103.9438],
    [1.31172, 103.94387],
    [1.31175, 103.94405],
    [1.31179, 103.94436],
    [1.31182, 103.94489],
    [1.31191, 103.94875],
    [1.31191, 103.94916],
    [1.31192, 103.94934],
    [1.31194, 103.94978],
    [1.31197, 103.95008],
    [1.312, 103.95036],
    [1.31202, 103.95053],
    [1.31205, 103.9507],
    [1.31209, 103.95086],
    [1.31214, 103.95108],
    [1.31218, 103.95124],
    [1.31224, 103.95146],
    [1.31231, 103.95167],
    [1.31257, 103.95232],
    [1.31278, 103.95282],
    [1.31298, 103.95329],
    [1.31324, 103.95389],
    [1.31339, 103.95425],
    [1.31341, 103.95429],
    [1.31358, 103.9547],
    [1.31383, 103.95531],
    [1.31402, 103.95577],
    [1.3143, 103.95647],
    [1.31461, 103.95722],
    [1.31485, 103.95781],
    [1.31504, 103.95826],
    [1.31522, 103.9587],
    [1.31537, 103.95906],
    [1.31556, 103.95953],
    [1.31572, 103.9599],
    [1.31587, 103.9603],
    [1.31607, 103.96078],
    [1.31619, 103.96108],
    [1.31652, 103.96188],
    [1.3167, 103.96232],
    [1.31754, 103.96443],
    [1.31804, 103.9657],
    [1.31825, 103.96614],
    [1.31834, 103.96635],
    [1.31842, 103.96649],
    [1.31853, 103.96669],
    [1.31868, 103.96691],
    [1.31889, 103.96719],
    [1.31909, 103.96744],
    [1.31958, 103.96793],
    [1.32008, 103.96839],
    [1.32039, 103.96865],
    [1.32064, 103.96884],
    [1.32169, 103.96956],
    [1.3222, 103.96993],
    [1.3225, 103.97015],
    [1.32266, 103.97026],
    [1.32273, 103.97031],
    [1.32279, 103.97034],
    [1.32354, 103.97084],
    [1.32382, 103.97102],
    [1.32428, 103.97133],
    [1.32444, 103.97143],
    [1.32454, 103.97152],
    [1.32465, 103.97159],
    [1.32569, 103.97231],
    [1.32572, 103.97233],
    [1.32578, 103.97235],
    [1.32587, 103.97245],
    [1.3263, 103.9728],
    [1.32635, 103.97283],
    [1.32638, 103.97285],
    [1.3265, 103.97293],
    [1.32743, 103.9736],
    [1.32789, 103.97391],
    [1.32802, 103.974],
    [1.32818, 103.97412],
    [1.3286, 103.97442],
    [1.32914, 103.97476],
    [1.3292, 103.97479],
    [1.32936, 103.97485],
    [1.32944, 103.97489],
    [1.32954, 103.97495],
    [1.32986, 103.9752],
    [1.33044, 103.97563],
    [1.33127, 103.97622],
    [1.33157, 103.97642],
    [1.33191, 103.97665],
    [1.33235, 103.97693],
    [1.33303, 103.97741],
    [1.33329, 103.97757],
    [1.33377, 103.97789],
    [1.33445, 103.97834],
    [1.33475, 103.97853],
    [1.33478, 103.97855],
    [1.33484, 103.97859],
    [1.33491, 103.97865],
    [1.33505, 103.97874],
    [1.33513, 103.97881],
    [1.33516, 103.97883],
    [1.33524, 103.97888],
    [1.33546, 103.97904],
    [1.33587, 103.9793],
    [1.3363, 103.97956],
    [1.33713, 103.97998],
    [1.33793, 103.98026],
    [1.33816, 103.98035],
    [1.33838, 103.98044],
    [1.33852, 103.98049],
    [1.33893, 103.98068],
    [1.34, 103.98111],
    [1.341, 103.98153],
    [1.34108, 103.98156],
    [1.34111, 103.98158],
    [1.3414, 103.98169],
    [1.34147, 103.98173],
    [1.34156, 103.98176],
    [1.34177, 103.98185],
    [1.3419, 103.9819],
    [1.34283, 103.98229],
    [1.34323, 103.98246],
    [1.3437, 103.98266],
    [1.34416, 103.98285],
    [1.34473, 103.98309],
    [1.34481, 103.98313],
    [1.34524, 103.98332],
    [1.34541, 103.9834],
    [1.34559, 103.98349],
    [1.34571, 103.98354],
    [1.34583, 103.9836],
    [1.34599, 103.98367],
    [1.34613, 103.98373],
    [1.34642, 103.98385],
    [1.3467, 103.98396],
    [1.34692, 103.98404],
    [1.34724, 103.98418],
    [1.34749, 103.98428],
    [1.34793, 103.98447],
    [1.34815, 103.98455],
    [1.34838, 103.98464],
    [1.34863, 103.98477],
    [1.34893, 103.9849],
    [1.34942, 103.98511],
    [1.3497, 103.98522],
    [1.34983, 103.98529],
    [1.34988, 103.98533],
    [1.34996, 103.98536],
    [1.35027, 103.98553],
    [1.35045, 103.98563],
    [1.35097, 103.98584],
    [1.35102, 103.98584],
    [1.35108, 103.98585],
    [1.35115, 103.98586],
    [1.35126, 103.98589],
    [1.35167, 103.98607],
    [1.353, 103.98662],
    [1.35309, 103.98666],
    [1.35358, 103.98687],
    [1.35403, 103.98707],
    [1.35417, 103.98713],
    [1.35451, 103.98726],
    [1.35468, 103.98733],
    [1.3547, 103.98734],
    [1.35483, 103.9874],
    [1.35484, 103.9874],
    [1.35573, 103.98778],
    [1.35602, 103.9879],
    [1.35666, 103.98817],
    [1.35681, 103.98824],
    [1.35686, 103.98826],
    [1.35703, 103.98834],
    [1.35758, 103.98861],
    [1.35778, 103.9887],
    [1.35863, 103.98906],
    [1.35869, 103.98908],
    [1.35874, 103.98908],
    [1.35885, 103.9891],
    [1.35911, 103.98903],
    [1.35932, 103.98894],
    [1.35945, 103.98889],
    [1.3595, 103.98884],
    [1.35991, 103.98859],
    [1.36002, 103.98857],
    [1.36015, 103.98857],
    [1.36026, 103.98858],
    [1.36036, 103.98862],
    [1.36059, 103.98871],
    [1.3611, 103.98893],
    [1.36125, 103.98899],
    [1.36141, 103.98906],
    [1.36141, 103.98907],
    [1.36148, 103.98911],
    [1.36151, 103.98918],
    [1.36151, 103.9892],
    [1.36151, 103.98921],
    [1.36151, 103.98922],
    [1.36151, 103.98925],
    [1.36143, 103.98944],
    [1.36117, 103.99006],
    [1.36114, 103.99013]
  ];
  const polyline2 = [
    [1.25515, 103.82178],
    [1.25516, 103.82176],
    [1.2552, 103.82173],
    [1.25524, 103.82167],
    [1.25562, 103.82122],
    [1.25537, 103.82102],
    [1.25512, 103.8208],
    [1.25491, 103.82063],
    [1.25489, 103.82062],
    [1.25488, 103.82061],
    [1.25487, 103.82061],
    [1.25486, 103.82061],
    [1.25482, 103.82061],
    [1.25473, 103.82063],
    [1.2547, 103.82063],
    [1.25469, 103.82063],
    [1.25467, 103.82063],
    [1.25466, 103.82063],
    [1.25465, 103.82063],
    [1.25464, 103.82063],
    [1.2546, 103.8206],
    [1.25459, 103.8206],
    [1.25439, 103.82045],
    [1.25431, 103.82039],
    [1.25429, 103.82038],
    [1.25429, 103.82037],
    [1.25428, 103.82037],
    [1.25427, 103.82036],
    [1.25426, 103.82036],
    [1.25425, 103.82036],
    [1.25424, 103.82036],
    [1.25423, 103.82036],
    [1.25423, 103.82037],
    [1.25422, 103.82037],
    [1.2542, 103.82039],
    [1.25413, 103.82047],
    [1.25407, 103.82052],
    [1.25404, 103.82055],
    [1.254, 103.82058],
    [1.25397, 103.82059],
    [1.25394, 103.8206],
    [1.25391, 103.82061],
    [1.25388, 103.82061],
    [1.25381, 103.82068],
    [1.25379, 103.82071],
    [1.25376, 103.82075],
    [1.2537, 103.82085],
    [1.25361, 103.821],
    [1.25357, 103.82105],
    [1.25348, 103.82115],
    [1.25328, 103.82142],
    [1.25314, 103.8216],
    [1.25309, 103.82168],
    [1.25306, 103.82172],
    [1.25294, 103.8219],
    [1.25289, 103.82202],
    [1.25285, 103.82218],
    [1.25285, 103.82226],
    [1.25285, 103.82228],
    [1.25284, 103.82241],
    [1.2528, 103.82305],
    [1.25279, 103.82316],
    [1.25273, 103.82353],
    [1.25267, 103.82369],
    [1.25259, 103.82382],
    [1.2525, 103.82397],
    [1.25249, 103.82399],
    [1.25244, 103.82406],
    [1.25232, 103.82422],
    [1.25222, 103.82434],
    [1.25211, 103.82448],
    [1.25203, 103.82458],
    [1.25201, 103.8246],
    [1.25199, 103.82463],
    [1.25198, 103.82466],
    [1.25197, 103.82469],
    [1.25197, 103.82471],
    [1.25198, 103.82472],
    [1.25198, 103.82473],
    [1.25198, 103.82475],
    [1.25199, 103.82477],
    [1.252, 103.82478],
    [1.25204, 103.82482],
    [1.25215, 103.82491],
    [1.25218, 103.82494],
    [1.25222, 103.82496],
    [1.25228, 103.82497],
    [1.25233, 103.82499],
    [1.25238, 103.825],
    [1.25242, 103.82502],
    [1.25245, 103.82505],
    [1.25248, 103.82508],
    [1.25252, 103.82512],
    [1.25254, 103.82515],
    [1.25256, 103.8252],
    [1.25257, 103.82527],
    [1.25258, 103.82531],
    [1.25258, 103.82533],
    [1.25258, 103.82535],
    [1.25259, 103.82536],
    [1.25259, 103.82537],
    [1.25259, 103.82538],
    [1.2526, 103.8254],
    [1.25261, 103.82541],
    [1.25266, 103.82546],
    [1.25278, 103.82559],
    [1.25281, 103.82561],
    [1.25291, 103.82573],
    [1.25296, 103.82577],
    [1.25302, 103.82581],
    [1.25305, 103.82582],
    [1.25311, 103.82583],
    [1.25319, 103.82583],
    [1.25327, 103.82582],
    [1.25335, 103.82581],
    [1.25339, 103.8258],
    [1.25344, 103.82578],
    [1.25348, 103.82575],
    [1.25353, 103.82571],
    [1.25359, 103.82564],
    [1.25369, 103.82571],
    [1.25372, 103.82576],
    [1.25389, 103.82563],
    [1.254, 103.82555],
    [1.25401, 103.82554],
    [1.25415, 103.82543],
    [1.25443, 103.82523],
    [1.25459, 103.82511],
    [1.25473, 103.82501],
    [1.25502, 103.82479],
    [1.25517, 103.82469],
    [1.25528, 103.82461],
    [1.25533, 103.82457],
    [1.25539, 103.82452],
    [1.25552, 103.82442],
    [1.25567, 103.8243],
    [1.2559, 103.8241],
    [1.25603, 103.82399],
    [1.2561, 103.82393],
    [1.25614, 103.8239],
    [1.25616, 103.82388],
    [1.25618, 103.82387],
    [1.2562, 103.82385],
    [1.25624, 103.82383],
    [1.25628, 103.8238],
    [1.25632, 103.82379],
    [1.25635, 103.82377],
    [1.25637, 103.82377],
    [1.25639, 103.82376],
    [1.25641, 103.82376],
    [1.25643, 103.82376],
    [1.25644, 103.82376],
    [1.25647, 103.82375],
    [1.25651, 103.82375],
    [1.25655, 103.82375],
    [1.25681, 103.82376],
    [1.25683, 103.82375],
    [1.25685, 103.82375],
    [1.25687, 103.82373],
    [1.25717, 103.82374],
    [1.2581, 103.82376],
    [1.25813, 103.82376],
    [1.25867, 103.82378],
    [1.25908, 103.82379],
    [1.25921, 103.82379],
    [1.25928, 103.8238],
    [1.25965, 103.8238],
    [1.26027, 103.8238],
    [1.26041, 103.82379],
    [1.26048, 103.82379],
    [1.26052, 103.82379],
    [1.26056, 103.82378],
    [1.26079, 103.82373],
    [1.26103, 103.82367],
    [1.26107, 103.82366],
    [1.2611, 103.82366],
    [1.26137, 103.82367],
    [1.26175, 103.82367],
    [1.26235, 103.82369],
    [1.26265, 103.82369],
    [1.26283, 103.82369],
    [1.263, 103.82369],
    [1.26301, 103.82369],
    [1.26319, 103.82371],
    [1.26326, 103.82372],
    [1.26337, 103.82372],
    [1.26345, 103.82373],
    [1.26349, 103.82372]
  ];
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<Polyline_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<Polyline_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    LeafletMap,
    Polyline: Polyline_1,
    Popup: Popup_1,
    TileLayer: TileLayer_1,
    Tooltip: Tooltip_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions,
    polyline1,
    polyline2
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions, polyline1, polyline2];
}
class Polyline_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$6, create_fragment$6, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Polyline_story",
      options,
      id: create_fragment$6.name
    });
  }
  get Hst() {
    throw new Error("<Polyline_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<Polyline_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
const file$1 = "src/stories/Popup.story.svelte";
function create_default_slot_5$1(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Gardens by the Bay");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_5$1.name,
    type: "slot",
    source: "(22:12) <Popup>",
    ctx
  });
  return block;
}
function create_default_slot_4$2(ctx) {
  let popup;
  let current;
  popup = new Popup_1({
    props: {
      $$slots: { default: [create_default_slot_5$1] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(popup.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(popup, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const popup_changes = {};
      if (dirty & /*$$scope*/
      8) {
        popup_changes.$$scope = { dirty, ctx: ctx2 };
      }
      popup.$set(popup_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(popup.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(popup.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(popup, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_4$2.name,
    type: "slot",
    source: "(21:8) <Marker latLng={[1.282375, 103.864273]}>",
    ctx
  });
  return block;
}
function create_default_slot_3$2(ctx) {
  let b;
  const block = {
    c: function create() {
      b = element("b");
      b.textContent = "Changi Airport";
      add_location(b, file$1, 29, 19, 850);
    },
    m: function mount(target, anchor) {
      insert_dev(target, b, anchor);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(b);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_3$2.name,
    type: "slot",
    source: "(26:12) <Popup>",
    ctx
  });
  return block;
}
function create_default_slot_2$2(ctx) {
  let icon;
  let t;
  let popup;
  let current;
  icon = new Icon_1({
    props: {
      iconUrl: "icons/airport.svg",
      options: (
        /*iconOptions*/
        ctx[2]
      )
    },
    $$inline: true
  });
  popup = new Popup_1({
    props: {
      $$slots: { default: [create_default_slot_3$2] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(icon.$$.fragment);
      t = space();
      create_component(popup.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(icon, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(popup, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const popup_changes = {};
      if (dirty & /*$$scope*/
      8) {
        popup_changes.$$scope = { dirty, ctx: ctx2 };
      }
      popup.$set(popup_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      transition_in(popup.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(icon.$$.fragment, local);
      transition_out(popup.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(icon, detaching);
      destroy_component(popup, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_2$2.name,
    type: "slot",
    source: "(24:8) <Marker latLng={[1.359167, 103.989441]}>",
    ctx
  });
  return block;
}
function create_default_slot_1$5(ctx) {
  let tilelayer;
  let t0;
  let marker0;
  let t1;
  let marker1;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  marker0 = new Marker_1({
    props: {
      latLng: [1.282375, 103.864273],
      $$slots: { default: [create_default_slot_4$2] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  marker1 = new Marker_1({
    props: {
      latLng: [1.359167, 103.989441],
      $$slots: { default: [create_default_slot_2$2] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t0 = space();
      create_component(marker0.$$.fragment);
      t1 = space();
      create_component(marker1.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t0, anchor);
      mount_component(marker0, target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(marker1, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const marker0_changes = {};
      if (dirty & /*$$scope*/
      8) {
        marker0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      marker0.$set(marker0_changes);
      const marker1_changes = {};
      if (dirty & /*$$scope*/
      8) {
        marker1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      marker1.$set(marker1_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(marker0.$$.fragment, local);
      transition_in(marker1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(marker0.$$.fragment, local);
      transition_out(marker1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t0);
        detach_dev(t1);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(marker0, detaching);
      destroy_component(marker1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$5.name,
    type: "slot",
    source: "(19:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$5(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$5] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      8) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$5.name,
    type: "slot",
    source: '(18:0) <Hst.Story group=\\"ui-layers\\">',
    ctx
  });
  return block;
}
function create_fragment$5(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "ui-layers",
      $$slots: { default: [create_default_slot$5] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      8) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$5($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Popup_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.364917, 103.822872], zoom: 11 };
  const iconOptions = {
    iconUrl: "icons/airport.svg",
    iconSize: [41, 41],
    iconAnchor: [20, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28]
  };
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<Popup_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<Popup_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    Icon: Icon_1,
    LeafletMap,
    Marker: Marker_1,
    Popup: Popup_1,
    TileLayer: TileLayer_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions,
    iconOptions
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions, iconOptions];
}
class Popup_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Popup_story",
      options,
      id: create_fragment$5.name
    });
  }
  get Hst() {
    throw new Error("<Popup_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<Popup_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
function create_default_slot_4$1(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Sentosa");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_4$1.name,
    type: "slot",
    source: "(19:12) <Popup>",
    ctx
  });
  return block;
}
function create_default_slot_3$1(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Sentosa");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_3$1.name,
    type: "slot",
    source: "(20:12) <Tooltip>",
    ctx
  });
  return block;
}
function create_default_slot_2$1(ctx) {
  let popup;
  let t;
  let tooltip;
  let current;
  popup = new Popup_1({
    props: {
      $$slots: { default: [create_default_slot_4$1] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  tooltip = new Tooltip_1({
    props: {
      $$slots: { default: [create_default_slot_3$1] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(popup.$$.fragment);
      t = space();
      create_component(tooltip.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(popup, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(tooltip, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const popup_changes = {};
      if (dirty & /*$$scope*/
      8) {
        popup_changes.$$scope = { dirty, ctx: ctx2 };
      }
      popup.$set(popup_changes);
      const tooltip_changes = {};
      if (dirty & /*$$scope*/
      8) {
        tooltip_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tooltip.$set(tooltip_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(popup.$$.fragment, local);
      transition_in(tooltip.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(popup.$$.fragment, local);
      transition_out(tooltip.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(popup, detaching);
      destroy_component(tooltip, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_2$1.name,
    type: "slot",
    source: '(18:8) <Rectangle latLngBounds={latLngBounds} color=\\"#ff0000\\" fillColor=\\"#ff0000\\">',
    ctx
  });
  return block;
}
function create_default_slot_1$4(ctx) {
  let tilelayer;
  let t;
  let rectangle;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  rectangle = new Rectangle_1({
    props: {
      latLngBounds: (
        /*latLngBounds*/
        ctx[2]
      ),
      color: "#ff0000",
      fillColor: "#ff0000",
      $$slots: { default: [create_default_slot_2$1] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t = space();
      create_component(rectangle.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(rectangle, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const rectangle_changes = {};
      if (dirty & /*$$scope*/
      8) {
        rectangle_changes.$$scope = { dirty, ctx: ctx2 };
      }
      rectangle.$set(rectangle_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(rectangle.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(rectangle.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(rectangle, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$4.name,
    type: "slot",
    source: "(16:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$4(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$4] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      8) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$4.name,
    type: "slot",
    source: '(15:0) <Hst.Story group=\\"vector-layers\\">',
    ctx
  });
  return block;
}
function create_fragment$4(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "vector-layers",
      $$slots: { default: [create_default_slot$4] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      8) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$4($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Rectangle_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.250111, 103.830933], zoom: 14 };
  const latLngBounds = [[1.23506, 103.80352], [1.26278, 103.85065]];
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<Rectangle_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<Rectangle_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    LeafletMap,
    Popup: Popup_1,
    Rectangle: Rectangle_1,
    TileLayer: TileLayer_1,
    Tooltip: Tooltip_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions,
    latLngBounds
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions, latLngBounds];
}
class Rectangle_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Rectangle_story",
      options,
      id: create_fragment$4.name
    });
  }
  get Hst() {
    throw new Error("<Rectangle_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<Rectangle_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
function create_default_slot_1$3(ctx) {
  let tilelayer;
  let t;
  let scalecontrol;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  scalecontrol = new ScaleControl({
    props: {
      position: "bottomleft",
      options: (
        /*scaleControlOptions*/
        ctx[2]
      )
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t = space();
      create_component(scalecontrol.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(scalecontrol, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(scalecontrol.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(scalecontrol.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(scalecontrol, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$3.name,
    type: "slot",
    source: "(15:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$3(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$3] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      8) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$3.name,
    type: "slot",
    source: '(14:0) <Hst.Story group=\\"controls\\">',
    ctx
  });
  return block;
}
function create_fragment$3(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "controls",
      $$slots: { default: [create_default_slot$3] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      8) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$3($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("ScaleControl_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.364917, 103.822872], zoom: 11 };
  const scaleControlOptions = { maxWidth: 200 };
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<ScaleControl_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<ScaleControl_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    LeafletMap,
    ScaleControl,
    TileLayer: TileLayer_1,
    Control: leafletSrcExports.Control,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions,
    scaleControlOptions
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions, scaleControlOptions];
}
class ScaleControl_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "ScaleControl_story",
      options,
      id: create_fragment$3.name
    });
  }
  get Hst() {
    throw new Error("<ScaleControl_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<ScaleControl_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
function create_default_slot_1$2(ctx) {
  let tilelayer;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(tilelayer, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$2.name,
    type: "slot",
    source: "(11:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$2(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$2] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      4) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$2.name,
    type: "slot",
    source: '(10:0) <Hst.Story group=\\"raster-layers\\">',
    ctx
  });
  return block;
}
function create_fragment$2(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "raster-layers",
      $$slots: { default: [create_default_slot$2] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      4) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance$2($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TileLayer_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.364917, 103.822872], zoom: 11 };
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<TileLayer_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TileLayer_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    LeafletMap,
    TileLayer: TileLayer_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions];
}
class TileLayer_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TileLayer_story",
      options,
      id: create_fragment$2.name
    });
  }
  get Hst() {
    throw new Error("<TileLayer_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<TileLayer_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
function create_default_slot_1$1(ctx) {
  let tilelayer;
  let t;
  let tilelayerwms;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  tilelayerwms = new TileLayerWMS({
    props: {
      url: wmsTileUrl,
      options: (
        /*wmsTileLayerOptions*/
        ctx[2]
      )
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t = space();
      create_component(tilelayerwms.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(tilelayerwms, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(tilelayerwms.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(tilelayerwms.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(tilelayerwms, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1$1.name,
    type: "slot",
    source: "(18:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot$1(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1$1] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      8) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot$1.name,
    type: "slot",
    source: '(17:0) <Hst.Story group=\\"raster-layers\\">',
    ctx
  });
  return block;
}
function create_fragment$1(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "raster-layers",
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      8) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
const wmsTileUrl = "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi";
function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TileLayerWMS_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [37.0902, -95.7129], zoom: 4 };
  const wmsTileLayerOptions = {
    layers: "nexrad-n0r-900913",
    format: "image/png",
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad"
  };
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<TileLayerWMS_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TileLayerWMS_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    LeafletMap,
    TileLayer: TileLayer_1,
    TileLayerWMS,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions,
    wmsTileUrl,
    wmsTileLayerOptions
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions, wmsTileLayerOptions];
}
class TileLayerWMS_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TileLayerWMS_story",
      options,
      id: create_fragment$1.name
    });
  }
  get Hst() {
    throw new Error("<TileLayerWMS_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<TileLayerWMS_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
const file = "src/stories/Tooltip.story.svelte";
function create_default_slot_7(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Gardens by the Bay");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_7.name,
    type: "slot",
    source: "(14:12) <Popup>",
    ctx
  });
  return block;
}
function create_default_slot_6(ctx) {
  let t;
  const block = {
    c: function create() {
      t = text("Gardens by the Bay");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_6.name,
    type: "slot",
    source: "(15:12) <Tooltip>",
    ctx
  });
  return block;
}
function create_default_slot_5(ctx) {
  let popup;
  let t;
  let tooltip;
  let current;
  popup = new Popup_1({
    props: {
      $$slots: { default: [create_default_slot_7] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  tooltip = new Tooltip_1({
    props: {
      $$slots: { default: [create_default_slot_6] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(popup.$$.fragment);
      t = space();
      create_component(tooltip.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(popup, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(tooltip, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const popup_changes = {};
      if (dirty & /*$$scope*/
      4) {
        popup_changes.$$scope = { dirty, ctx: ctx2 };
      }
      popup.$set(popup_changes);
      const tooltip_changes = {};
      if (dirty & /*$$scope*/
      4) {
        tooltip_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tooltip.$set(tooltip_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(popup.$$.fragment, local);
      transition_in(tooltip.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(popup.$$.fragment, local);
      transition_out(tooltip.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(popup, detaching);
      destroy_component(tooltip, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_5.name,
    type: "slot",
    source: "(13:8) <Marker latLng={[1.282375, 103.864273]}>",
    ctx
  });
  return block;
}
function create_default_slot_4(ctx) {
  let b;
  const block = {
    c: function create() {
      b = element("b");
      b.textContent = "Changi Airport";
      add_location(b, file, 22, 19, 652);
    },
    m: function mount(target, anchor) {
      insert_dev(target, b, anchor);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(b);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_4.name,
    type: "slot",
    source: "(18:12) <Popup>",
    ctx
  });
  return block;
}
function create_default_slot_3(ctx) {
  let b;
  const block = {
    c: function create() {
      b = element("b");
      b.textContent = "Changi Airport";
      add_location(b, file, 23, 21, 703);
    },
    m: function mount(target, anchor) {
      insert_dev(target, b, anchor);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(b);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_3.name,
    type: "slot",
    source: "(19:12) <Tooltip>",
    ctx
  });
  return block;
}
function create_default_slot_2(ctx) {
  let popup;
  let t;
  let tooltip;
  let current;
  popup = new Popup_1({
    props: {
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  tooltip = new Tooltip_1({
    props: {
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(popup.$$.fragment);
      t = space();
      create_component(tooltip.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(popup, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(tooltip, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const popup_changes = {};
      if (dirty & /*$$scope*/
      4) {
        popup_changes.$$scope = { dirty, ctx: ctx2 };
      }
      popup.$set(popup_changes);
      const tooltip_changes = {};
      if (dirty & /*$$scope*/
      4) {
        tooltip_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tooltip.$set(tooltip_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(popup.$$.fragment, local);
      transition_in(tooltip.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(popup.$$.fragment, local);
      transition_out(tooltip.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
      destroy_component(popup, detaching);
      destroy_component(tooltip, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_2.name,
    type: "slot",
    source: "(17:8) <Marker latLng={[1.359167, 103.989441]}>",
    ctx
  });
  return block;
}
function create_default_slot_1(ctx) {
  let tilelayer;
  let t0;
  let marker0;
  let t1;
  let marker1;
  let current;
  tilelayer = new TileLayer_1({
    props: {
      url: DEFAULT_TILE_URL,
      options: DEFAULT_TILE_LAYER_OPTIONS
    },
    $$inline: true
  });
  marker0 = new Marker_1({
    props: {
      latLng: [1.282375, 103.864273],
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  marker1 = new Marker_1({
    props: {
      latLng: [1.359167, 103.989441],
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tilelayer.$$.fragment);
      t0 = space();
      create_component(marker0.$$.fragment);
      t1 = space();
      create_component(marker1.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tilelayer, target, anchor);
      insert_dev(target, t0, anchor);
      mount_component(marker0, target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(marker1, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const marker0_changes = {};
      if (dirty & /*$$scope*/
      4) {
        marker0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      marker0.$set(marker0_changes);
      const marker1_changes = {};
      if (dirty & /*$$scope*/
      4) {
        marker1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      marker1.$set(marker1_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tilelayer.$$.fragment, local);
      transition_in(marker0.$$.fragment, local);
      transition_in(marker1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tilelayer.$$.fragment, local);
      transition_out(marker0.$$.fragment, local);
      transition_out(marker1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t0);
        detach_dev(t1);
      }
      destroy_component(tilelayer, detaching);
      destroy_component(marker0, detaching);
      destroy_component(marker1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(11:4) <LeafletMap options={mapOptions}>",
    ctx
  });
  return block;
}
function create_default_slot(ctx) {
  let leafletmap;
  let current;
  leafletmap = new LeafletMap({
    props: {
      options: (
        /*mapOptions*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(leafletmap.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(leafletmap, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const leafletmap_changes = {};
      if (dirty & /*$$scope*/
      4) {
        leafletmap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leafletmap.$set(leafletmap_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(leafletmap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(leafletmap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(leafletmap, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot.name,
    type: "slot",
    source: '(10:0) <Hst.Story group=\\"ui-layers\\">',
    ctx
  });
  return block;
}
function create_fragment(ctx) {
  let hst_story;
  let current;
  hst_story = new /*Hst*/
  ctx[0].Story({
    props: {
      group: "ui-layers",
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(hst_story.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(hst_story, target, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const hst_story_changes = {};
      if (dirty & /*$$scope*/
      4) {
        hst_story_changes.$$scope = { dirty, ctx: ctx2 };
      }
      hst_story.$set(hst_story_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(hst_story.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(hst_story.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(hst_story, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Tooltip_story", slots, []);
  let { Hst } = $$props;
  const mapOptions = { center: [1.364917, 103.822872], zoom: 11 };
  $$self.$$.on_mount.push(function() {
    if (Hst === void 0 && !("Hst" in $$props || $$self.$$.bound[$$self.$$.props["Hst"]])) {
      console.warn("<Tooltip_story> was created without expected prop 'Hst'");
    }
  });
  const writable_props = ["Hst"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<Tooltip_story> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  $$self.$capture_state = () => ({
    LeafletMap,
    Marker: Marker_1,
    Popup: Popup_1,
    TileLayer: TileLayer_1,
    Tooltip: Tooltip_1,
    DEFAULT_TILE_LAYER_OPTIONS,
    DEFAULT_TILE_URL,
    Hst,
    mapOptions
  });
  $$self.$inject_state = ($$props2) => {
    if ("Hst" in $$props2)
      $$invalidate(0, Hst = $$props2.Hst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [Hst, mapOptions];
}
class Tooltip_story extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance, create_fragment, safe_not_equal, { Hst: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Tooltip_story",
      options,
      id: create_fragment.name
    });
  }
  get Hst() {
    throw new Error("<Tooltip_story>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set Hst(value) {
    throw new Error("<Tooltip_story>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
let files = [
  { "id": "src-stories-circle-story-svelte", "path": ["Circle"], "filePath": "src/stories/Circle.story.svelte", "story": { "id": "src-stories-circle-story-svelte", "title": "Circle", "group": "vector-layers", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/Circle.story.md", "index": 0, component: Circle_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-circle-story-svelte-oGZD6nlu.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-circlemarker-story-svelte", "path": ["CircleMarker"], "filePath": "src/stories/CircleMarker.story.svelte", "story": { "id": "src-stories-circlemarker-story-svelte", "title": "CircleMarker", "group": "vector-layers", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/CircleMarker.story.md", "index": 1, component: CircleMarker_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-circlemarker-story-svelte-9CoPxgcQ.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-divicon-story-svelte", "path": ["DivIcon"], "filePath": "src/stories/DivIcon.story.svelte", "story": { "id": "src-stories-divicon-story-svelte", "title": "DivIcon", "group": "basic-types", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/DivIcon.story.md", "index": 2, component: DivIcon_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-divicon-story-svelte-f1ncE87T.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-eventhandling-story-svelte", "path": ["EventHandling"], "filePath": "src/stories/EventHandling.story.svelte", "story": { "id": "src-stories-eventhandling-story-svelte", "title": "EventHandling", "group": "events", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "index": 3, component: EventHandling_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-eventhandling-story-svelte-jdzOTcfe.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-geojson-story-svelte", "path": ["GeoJSON"], "filePath": "src/stories/GeoJSON.story.svelte", "story": { "id": "src-stories-geojson-story-svelte", "title": "GeoJSON", "group": "other-layers", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/GeoJSON.story.md", "index": 4, component: GeoJSON_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-geojson-story-svelte-ZeoV9pHx.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-icon-story-svelte", "path": ["Icon"], "filePath": "src/stories/Icon.story.svelte", "story": { "id": "src-stories-icon-story-svelte", "title": "Icon", "group": "basic-types", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/Icon.story.md", "index": 5, component: Icon_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-icon-story-svelte-gN1G0-QO.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-imageoverlay-story-svelte", "path": ["ImageOverlay"], "filePath": "src/stories/ImageOverlay.story.svelte", "story": { "id": "src-stories-imageoverlay-story-svelte", "title": "ImageOverlay", "group": "raster-layers", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/ImageOverlay.story.md", "index": 6, component: ImageOverlay_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-imageoverlay-story-svelte-RctY0J_i.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-leafletmap-story-svelte", "path": ["LeafletMap"], "filePath": "src/stories/LeafletMap.story.svelte", "story": { "id": "src-stories-leafletmap-story-svelte", "title": "LeafletMap", "group": "top", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/LeafletMap.story.md", "index": 7, component: LeafletMap_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-leafletmap-story-svelte-FfV2IBzi.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-marker-story-svelte", "path": ["Marker"], "filePath": "src/stories/Marker.story.svelte", "story": { "id": "src-stories-marker-story-svelte", "title": "Marker", "group": "ui-layers", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/Marker.story.md", "index": 8, component: Marker_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-marker-story-svelte-V2fqhUop.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-polygon-story-svelte", "path": ["Polygon"], "filePath": "src/stories/Polygon.story.svelte", "story": { "id": "src-stories-polygon-story-svelte", "title": "Polygon", "group": "vector-layers", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/Polygon.story.md", "index": 9, component: Polygon_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-polygon-story-svelte-YY87VCoC.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-polyline-story-svelte", "path": ["Polyline"], "filePath": "src/stories/Polyline.story.svelte", "story": { "id": "src-stories-polyline-story-svelte", "title": "Polyline", "group": "vector-layers", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/Polyline.story.md", "index": 10, component: Polyline_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-polyline-story-svelte-1nyvvOIt.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-popup-story-svelte", "path": ["Popup"], "filePath": "src/stories/Popup.story.svelte", "story": { "id": "src-stories-popup-story-svelte", "title": "Popup", "group": "ui-layers", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/Popup.story.md", "index": 11, component: Popup_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-popup-story-svelte-29YIJKDv.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-rectangle-story-svelte", "path": ["Rectangle"], "filePath": "src/stories/Rectangle.story.svelte", "story": { "id": "src-stories-rectangle-story-svelte", "title": "Rectangle", "group": "vector-layers", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/Rectangle.story.md", "index": 12, component: Rectangle_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-rectangle-story-svelte-_K0tz3cD.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-scalecontrol-story-svelte", "path": ["ScaleControl"], "filePath": "src/stories/ScaleControl.story.svelte", "story": { "id": "src-stories-scalecontrol-story-svelte", "title": "ScaleControl", "group": "controls", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/ScaleControl.story.md", "index": 13, component: ScaleControl_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-scalecontrol-story-svelte-kt73JUUX.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-tilelayer-story-svelte", "path": ["TileLayer"], "filePath": "src/stories/TileLayer.story.svelte", "story": { "id": "src-stories-tilelayer-story-svelte", "title": "TileLayer", "group": "raster-layers", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/TileLayer.story.md", "index": 14, component: TileLayer_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-tilelayer-story-svelte-PEiphB88.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-tilelayerwms-story-svelte", "path": ["TileLayerWMS"], "filePath": "src/stories/TileLayerWMS.story.svelte", "story": { "id": "src-stories-tilelayerwms-story-svelte", "title": "TileLayerWMS", "group": "raster-layers", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/TileLayerWMS.story.md", "index": 15, component: TileLayerWMS_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-tilelayerwms-story-svelte-vPNz9f3I.js"), true ? __vite__mapDeps([]) : void 0) },
  { "id": "src-stories-tooltip-story-svelte", "path": ["Tooltip"], "filePath": "src/stories/Tooltip.story.svelte", "story": { "id": "src-stories-tooltip-story-svelte", "title": "Tooltip", "group": "ui-layers", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "_default", "title": "default" }] }, "supportPluginId": "svelte4", "docsFilePath": "src/stories/Tooltip.story.md", "index": 16, component: Tooltip_story, source: () => __vitePreload(() => import("./__resolved__virtual_story-source_src-stories-tooltip-story-svelte-K5FiCNfl.js"), true ? __vite__mapDeps([]) : void 0) }
];
let tree = [{ "group": true, "id": "top", "title": "", "children": [{ "title": "LeafletMap", "index": 7 }] }, { "group": true, "id": "events", "title": "", "children": [{ "title": "EventHandling", "index": 3 }] }, { "group": true, "id": "ui-layers", "title": "UI Layers", "children": [{ "title": "Marker", "index": 8 }, { "title": "Popup", "index": 11 }, { "title": "Tooltip", "index": 16 }] }, { "group": true, "id": "raster-layers", "title": "Raster Layers", "children": [{ "title": "ImageOverlay", "index": 6 }, { "title": "TileLayer", "index": 14 }, { "title": "TileLayerWMS", "index": 15 }] }, { "group": true, "id": "vector-layers", "title": "Vector Layers", "children": [{ "title": "Circle", "index": 0 }, { "title": "CircleMarker", "index": 1 }, { "title": "Polygon", "index": 9 }, { "title": "Polyline", "index": 10 }, { "title": "Rectangle", "index": 12 }] }, { "group": true, "id": "other-layers", "title": "Other Layers", "children": [{ "title": "GeoJSON", "index": 4 }] }, { "group": true, "id": "basic-types", "title": "Basic Types", "children": [{ "title": "DivIcon", "index": 2 }, { "title": "Icon", "index": 5 }] }, { "group": true, "id": "controls", "title": "Controls", "children": [{ "title": "ScaleControl", "index": 13 }] }];
const base = "/svelte-leafletjs/";
function createRouterHistory() {
  switch (histoireConfig.routerMode) {
    case "hash":
      return createWebHashHistory(base);
    case "history":
    default:
      return createWebHistory(base);
  }
}
const router = createRouter({
  history: createRouterHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => __vitePreload(() => import("./HomeView.vue-sOcrMiL8.js"), true ? __vite__mapDeps([0,1,2]) : void 0)
    },
    {
      path: "/story/:storyId",
      name: "story",
      component: () => __vitePreload(() => import("./StoryView.vue-BMWCj1du.js"), true ? __vite__mapDeps([3,1,2,4,5,6,7]) : void 0)
    }
  ]
});
const copiedFromExistingVariant = [
  "state",
  "slots",
  "source",
  "responsiveDisabled",
  "autoPropsDisabled",
  "setupApp",
  "configReady",
  "previewReady"
];
function mapFile(file2, existingFile) {
  let result;
  if (existingFile) {
    result = existingFile;
    for (const key in file2) {
      if (key === "story") {
        result.story = {
          ...result.story,
          ...file2.story,
          file: markRaw(result),
          variants: file2.story.variants.map((v) => mapVariant(v, existingFile.story.variants.find((item) => item.id === v.id)))
        };
      } else if (key !== "component") {
        result[key] = file2[key];
      }
    }
  } else {
    result = {
      ...file2,
      component: markRaw(file2.component),
      story: {
        ...file2.story,
        title: file2.story.title,
        file: markRaw(file2),
        variants: file2.story.variants.map((v) => mapVariant(v)),
        slots: () => ({})
      }
    };
  }
  return result;
}
function mapVariant(variant, existingVariant) {
  let result;
  if (existingVariant) {
    result = existingVariant;
    for (const key in variant) {
      if (!copiedFromExistingVariant.includes(key)) {
        result[key] = variant[key];
      }
    }
  } else {
    result = {
      ...variant,
      state: reactive({
        _hPropState: {},
        _hPropDefs: {}
      }),
      setupApp: null,
      slots: () => ({}),
      previewReady: false
    };
  }
  return result;
}
const clientSupportPlugins = {
  "vanilla": () => __vitePreload(() => import("./vendor-McaHzbIz.js").then((n) => n.bg), true ? __vite__mapDeps([]) : void 0),
  "svelte4": () => __vitePreload(() => import("./vendor-McaHzbIz.js").then((n) => n.bh), true ? __vite__mapDeps([]) : void 0)
};
const __default__ = {
  inheritAttrs: false
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "GenericMountStory",
  props: {
    story: {}
  },
  setup(__props) {
    const props = __props;
    const mountComponent = ref(null);
    watchEffect(async () => {
      var _a;
      const clientPlugin = clientSupportPlugins[(_a = props.story.file) == null ? void 0 : _a.supportPluginId];
      if (clientPlugin) {
        const pluginModule = await clientPlugin();
        mountComponent.value = markRaw(pluginModule.MountStory);
      }
    });
    return (_ctx, _cache) => {
      return mountComponent.value ? (openBlock(), createBlock(resolveDynamicComponent(mountComponent.value), mergeProps({
        key: 0,
        class: "histoire-generic-mount-story",
        story: _ctx.story
      }, _ctx.$attrs), null, 16, ["story"])) : createCommentVNode("", true);
    };
  }
});
export {
  _sfc_main as _,
  base as b,
  clientSupportPlugins as c,
  files as f,
  mapFile as m,
  router as r,
  tree as t
};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/HomeView.vue-sOcrMiL8.js","assets/vendor-McaHzbIz.js","assets/story-gtSYMgva.js","assets/StoryView.vue-BMWCj1du.js","assets/MobileOverlay.vue2-qjeiiYR_.js","assets/BaseEmpty.vue-AVDYAt1Y.js","assets/state-qa0tnl55.js","assets/events-s9xVrYkv.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
//# sourceMappingURL=GenericMountStory.vue2-sNQr_fRB.js.map
