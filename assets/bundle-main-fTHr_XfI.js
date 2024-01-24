import { d as defineComponent, u as useCssVars, c as computed, a as useRoute, r as ref, o as openBlock, b as createElementBlock, e as createVNode, w as withCtx, f as createBaseVNode, g as unref, I as Icon, n as normalizeClass, t as toDisplayString, h as createCommentVNode, i as defineStore, j as useStorage, k as watch, l as resolveComponent, m as withKeys, F as Fragment, p as renderList, q as createBlock, s as isDark, v as histoireConfig, x as customLogos, y as useEventListener, z as isRef, A as resolveDirective, B as withDirectives, C as toggleDark, D as createTextVNode, E as pushScopeId, G as popScopeId, H as vShow, J as defineAsyncComponent, _ as __vitePreload, K as reactive, L as normalizeStyle, T as Transition, M as useTitle, N as onMounted, O as createApp, P as createPinia, Q as plugin } from "./vendor-McaHzbIz.js";
import { r as router, f as files, m as mapFile, t as tree, _ as _sfc_main$c } from "./GenericMountStory.vue2-sNQr_fRB.js";
import { u as useScrollOnActive, B as BaseListItemLink, _ as _export_sfc, a as _sfc_main$b, i as isMobile, b as BaseSplitPane } from "./MobileOverlay.vue2-qjeiiYR_.js";
import { u as useStoryStore } from "./story-gtSYMgva.js";
const _hoisted_1$a = { class: "bind-tree-margin htw-flex htw-items-center htw-gap-2 htw-pl-4 htw-min-w-0" };
const _hoisted_2$6 = { class: "htw-truncate" };
const _hoisted_3$5 = {
  key: 0,
  class: "htw-opacity-40 htw-text-sm"
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "StoryListItem",
  props: {
    story: {},
    depth: { default: 0 }
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "444efc12": filePadding.value,
      "ae892164": _ctx.story.iconColor
    }));
    const props = __props;
    const filePadding = computed(() => {
      return props.depth * 12 + "px";
    });
    const route = useRoute();
    const isActive = computed(() => route.params.storyId === props.story.id);
    const el = ref();
    useScrollOnActive(isActive, el);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "el",
        ref: el,
        "data-test-id": "story-list-item",
        class: "histoire-story-list-item"
      }, [
        createVNode(BaseListItemLink, {
          to: {
            name: "story",
            params: {
              storyId: _ctx.story.id
            }
          },
          class: "htw-pl-0.5 htw-pr-2 htw-py-2 md:htw-py-1.5 htw-mx-1 htw-rounded-sm"
        }, {
          default: withCtx(({ active }) => [
            createBaseVNode("span", _hoisted_1$a, [
              createVNode(unref(Icon), {
                icon: _ctx.story.icon ?? "carbon:cube",
                class: normalizeClass(["htw-w-5 htw-h-5 sm:htw-w-4 sm:htw-h-4 htw-flex-none", {
                  "htw-text-primary-500": !active && !_ctx.story.iconColor,
                  "bind-icon-color": !active && _ctx.story.iconColor
                }])
              }, null, 8, ["icon", "class"]),
              createBaseVNode("span", _hoisted_2$6, toDisplayString(_ctx.story.title), 1)
            ]),
            !_ctx.story.docsOnly ? (openBlock(), createElementBlock("span", _hoisted_3$5, toDisplayString(_ctx.story.variants.length), 1)) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["to"])
      ], 512);
    };
  }
});
const StoryListItem = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-19810958"]]);
const useFolderStore = defineStore("folder", () => {
  const openedFolders = useStorage(
    "_histoire-tree-state",
    /* @__PURE__ */ new Map()
  );
  function getStringPath(path) {
    return path.join("␜");
  }
  function toggleFolder(path, defaultToggleValue = true) {
    const stringPath = getStringPath(path);
    const currentValue = openedFolders.value.get(stringPath);
    if (currentValue == null) {
      setFolderOpen(stringPath, defaultToggleValue);
    } else if (currentValue) {
      setFolderOpen(stringPath, false);
    } else {
      setFolderOpen(stringPath, true);
    }
  }
  function setFolderOpen(path, value) {
    const stringPath = typeof path === "string" ? path : getStringPath(path);
    openedFolders.value.set(stringPath, value);
  }
  function isFolderOpened(path, defaultValue = false) {
    const value = openedFolders.value.get(getStringPath(path));
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
  function openFileFolders(path) {
    for (let pathLength = 1; pathLength < path.length; pathLength++) {
      setFolderOpen(path.slice(0, pathLength), true);
    }
  }
  const storyStore = useStoryStore();
  watch(() => storyStore.currentStory, (story) => {
    if (story) {
      openFileFolders(story.file.path);
    }
  });
  return {
    isFolderOpened,
    toggleFolder
  };
});
const _hoisted_1$9 = {
  "data-test-id": "story-list-folder",
  class: "histoire-story-list-folder"
};
const _hoisted_2$5 = ["onKeyup"];
const _hoisted_3$4 = { class: "bind-tree-padding htw-flex htw-items-center htw-gap-2 htw-min-w-0" };
const _hoisted_4$3 = { class: "htw-flex htw-flex-none htw-items-center htw-opacity-30 [.histoire-story-list-folder-button:hover_&]:htw-opacity-100 htw-ml-4 htw-w-4 htw-h-4 htw-rounded-sm htw-border htw-border-gray-500/40" };
const _hoisted_5$1 = { class: "htw-truncate" };
const _hoisted_6 = { key: 0 };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "StoryListFolder",
  props: {
    path: { default: () => [] },
    folder: {},
    stories: {},
    depth: { default: 0 }
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "6851b0a7": folderPadding.value
    }));
    const props = __props;
    const folderStore = useFolderStore();
    const folderPath = computed(() => [...props.path, props.folder.title]);
    const isFolderOpen = computed(() => folderStore.isFolderOpened(folderPath.value));
    function toggleOpen() {
      folderStore.toggleFolder(folderPath.value);
    }
    const folderPadding = computed(() => {
      return props.depth * 12 + "px";
    });
    return (_ctx, _cache) => {
      const _component_StoryListFolder = resolveComponent("StoryListFolder", true);
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        createBaseVNode("div", {
          role: "button",
          tabindex: "0",
          class: "histoire-story-list-folder-button htw-px-0.5 htw-py-2 md:htw-py-1.5 htw-mx-1 htw-rounded-sm hover:htw-bg-primary-100 dark:hover:htw-bg-primary-900 htw-cursor-pointer htw-select-none htw-flex",
          onClick: toggleOpen,
          onKeyup: [
            withKeys(toggleOpen, ["enter"]),
            withKeys(toggleOpen, ["space"])
          ]
        }, [
          createBaseVNode("span", _hoisted_3$4, [
            createBaseVNode("span", _hoisted_4$3, [
              createVNode(unref(Icon), {
                icon: "carbon:caret-right",
                class: normalizeClass(["htw-w-full htw-h-full htw-transition-transform htw-duration-150", {
                  "htw-rotate-90": isFolderOpen.value
                }])
              }, null, 8, ["class"])
            ]),
            createBaseVNode("span", _hoisted_5$1, toDisplayString(_ctx.folder.title), 1)
          ])
        ], 40, _hoisted_2$5),
        isFolderOpen.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.folder.children, (element) => {
            return openBlock(), createElementBlock(Fragment, {
              key: element.title
            }, [
              element.children ? (openBlock(), createBlock(_component_StoryListFolder, {
                key: 0,
                path: folderPath.value,
                folder: element,
                stories: _ctx.stories,
                depth: _ctx.depth + 1
              }, null, 8, ["path", "folder", "stories", "depth"])) : (openBlock(), createBlock(StoryListItem, {
                key: 1,
                story: _ctx.stories[element.index],
                depth: _ctx.depth + 1
              }, null, 8, ["story", "depth"]))
            ], 64);
          }), 128))
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const StoryListFolder = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-2d2e4786"]]);
const _hoisted_1$8 = {
  "data-test-id": "story-group",
  class: "histoire-story-group htw-my-2 first:htw-mt-0 last:htw-mb-0 htw-group"
};
const _hoisted_2$4 = /* @__PURE__ */ createBaseVNode("div", { class: "htw-h-[1px] htw-bg-gray-500/10 htw-mx-6 htw-mb-2 group-first:htw-hidden" }, null, -1);
const _hoisted_3$3 = ["onKeyup"];
const _hoisted_4$2 = { class: "htw-truncate" };
const _hoisted_5 = { key: 1 };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "StoryGroup",
  props: {
    path: { default: () => [] },
    group: {},
    stories: {}
  },
  setup(__props) {
    const props = __props;
    const folderStore = useFolderStore();
    const folderPath = computed(() => [...props.path, props.group.title]);
    const isFolderOpen = computed(() => folderStore.isFolderOpened(folderPath.value, true));
    function toggleOpen() {
      folderStore.toggleFolder(folderPath.value, false);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        _ctx.group.title ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _hoisted_2$4,
          createBaseVNode("div", {
            role: "button",
            tabindex: "0",
            class: "htw-px-0.5 htw-py-2 md:htw-py-1.5 htw-mx-1 htw-rounded-sm hover:htw-bg-primary-100 dark:hover:htw-bg-primary-900 htw-cursor-pointer htw-select-none htw-flex htw-items-center htw-gap-2 htw-min-w-0 htw-opacity-50 hover:htw-opacity-100",
            onClick: toggleOpen,
            onKeyup: [
              withKeys(toggleOpen, ["enter"]),
              withKeys(toggleOpen, ["space"])
            ]
          }, [
            createVNode(unref(Icon), {
              icon: isFolderOpen.value ? "ri:subtract-line" : "ri:add-line",
              class: "htw-w-4 htw-h-4 htw-ml-4 htw-rounded-sm htw-border htw-border-gray-500/40"
            }, null, 8, ["icon"]),
            createBaseVNode("span", _hoisted_4$2, toDisplayString(_ctx.group.title), 1)
          ], 40, _hoisted_3$3)
        ], 64)) : createCommentVNode("", true),
        isFolderOpen.value ? (openBlock(), createElementBlock("div", _hoisted_5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.group.children, (element) => {
            return openBlock(), createElementBlock(Fragment, {
              key: element.title
            }, [
              element.children ? (openBlock(), createBlock(StoryListFolder, {
                key: 0,
                path: folderPath.value,
                folder: element,
                stories: _ctx.stories,
                depth: 0
              }, null, 8, ["path", "folder", "stories"])) : (openBlock(), createBlock(StoryListItem, {
                key: 1,
                story: _ctx.stories[element.index],
                depth: 0
              }, null, 8, ["story"]))
            ], 64);
          }), 128))
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const _hoisted_1$7 = { class: "histoire-story-list htw-overflow-y-auto" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "StoryList",
  props: {
    tree: {},
    stories: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tree, (element) => {
          return openBlock(), createElementBlock(Fragment, {
            key: element.title
          }, [
            element.group ? (openBlock(), createBlock(_sfc_main$8, {
              key: 0,
              group: element,
              stories: _ctx.stories
            }, null, 8, ["group", "stories"])) : element.children ? (openBlock(), createBlock(StoryListFolder, {
              key: 1,
              folder: element,
              stories: _ctx.stories
            }, null, 8, ["folder", "stories"])) : (openBlock(), createBlock(StoryListItem, {
              key: 2,
              story: _ctx.stories[element.index]
            }, null, 8, ["story"]))
          ], 64);
        }), 128))
      ]);
    };
  }
});
const HistoireLogoDark = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3c!--%20Created%20with%20Inkscape%20(http://www.inkscape.org/)%20--%3e%3csvg%20width='1536'%20height='512'%20viewBox='0%200%201536%20512'%20version='1.1'%20id='svg5'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3cdefs%20id='defs2'%20/%3e%3cg%20id='layer1'%3e%3crect%20style='opacity:0.5;fill:%2334d399;fill-opacity:1;stroke-width:1.00375'%20id='rect1372'%20width='314.30923'%20height='406.60901'%20x='-26.565063'%20y='134.75079'%20transform='rotate(-23.821262)'%20ry='8'%20/%3e%3crect%20style='fill:%2334d399;fill-opacity:1;stroke-width:1.00375'%20id='rect850'%20width='314.30923'%20height='406.60901'%20x='77.571838'%20y='72.808708'%20ry='8'%20transform='rotate(-4.5744534)'%20/%3e%3c/g%3e%3cg%20id='layer3'%3e%3cpath%20id='path1657-3'%20style='display:inline;fill:%23adedd6;fill-opacity:1;stroke:%23adedd6;stroke-width:8.34923;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1'%20d='M%20359.38947,355.95134%20320.72935,176.52942%20238.34613,238.94118%20Z%20M%20273.64124,273.06608%20152.59788,156.05591%20191.25804,335.47786%20Z'%20/%3e%3cg%20aria-label='Histoire'%20id='text1821-4'%20style='font-size:231.926px;line-height:1.25;font-family:Sen;-inkscape-font-specification:Sen;fill:%23adedd6;fill-opacity:1;stroke-width:5.79813'%20transform='matrix(1.1500556,0,0,1.1500556,-105.40156,-38.414233)'%3e%3cpath%20d='M%20693.87591,344.24783%20V%20181.89964%20h%2025.04801%20v%20162.34819%20z%20m%20-105.99018,0%20V%20181.89964%20h%2025.04801%20v%20162.34819%20z%20m%2010.90052,-68.88202%20v%20-24.1203%20h%20106.22211%20v%2024.1203%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%23adedd6;fill-opacity:1'%20id='path16857'%20/%3e%3cpath%20d='M%20762.294,344.24783%20V%20222.48669%20h%2023.88838%20v%20121.76114%20z%20m%2011.5963,-148.66456%20q%20-7.65356,0%20-11.82822,-3.94274%20-4.17467,-3.94274%20-4.17467,-11.13245%200,-6.72585%204.17467,-10.90052%204.40659,-4.17467%2011.82822,-4.17467%207.65356,0%2011.82823,3.94274%204.17466,3.94275%204.17466,11.13245%200,6.72585%20-4.40659,10.90052%20-4.17467,4.17467%20-11.5963,4.17467%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%23adedd6;fill-opacity:1'%20id='path16859'%20/%3e%3cpath%20d='m%20863.41371,346.56709%20q%20-15.30711,0%20-27.59919,-5.33429%20-12.29208,-5.3343%20-20.40949,-15.77097%20l%2016.23482,-13.91556%20q%206.95778,8.11741%2015.07519,11.82822%208.34934,3.47889%2018.78601,3.47889%204.17466,0%207.65355,-0.9277%203.71082,-1.15963%206.26201,-3.24696%202.78311,-2.08734%204.17466,-4.87045%201.39156,-3.01504%201.39156,-6.49393%200,-6.03007%20-4.40659,-9.74089%20-2.31926,-1.62348%20-7.42164,-3.47889%20-4.87044,-2.08733%20-12.75593,-4.17467%20-13.4517,-3.47889%20-22.03297,-7.88548%20-8.58126,-4.4066%20-13.21978,-9.97282%20-3.47889,-4.40659%20-5.10237,-9.50897%20-1.62348,-5.33429%20-1.62348,-11.59629%200,-7.65356%203.24696,-13.91556%203.47889,-6.49393%209.27704,-11.13245%206.03008,-4.87045%2013.91556,-7.42163%208.11741,-2.55119%2017.16253,-2.55119%208.58126,0%2016.93059,2.31926%208.58126,2.31926%2015.77097,6.72585%207.18971,4.4066%2012.06015,10.43667%20l%20-13.68363,15.07519%20q%20-4.4066,-4.40659%20-9.74089,-7.65355%20-5.10237,-3.47889%20-10.43667,-5.3343%20-5.3343,-1.85541%20-9.74089,-1.85541%20-4.87045,0%20-8.81319,0.9277%20-3.94274,0.92771%20-6.72586,2.78312%20-2.55118,1.8554%20-3.94274,4.63852%20-1.39155,2.78311%20-1.39155,6.262%200.23192,3.01504%201.39155,5.79815%201.39156,2.55118%203.71082,4.40659%202.55118,1.85541%207.65356,3.94274%205.10237,2.08734%2012.98785,3.94274%2011.5963,3.01504%2019.01793,6.72586%207.65356,3.47889%2012.06015,8.11741%204.63852,4.40659%206.49393,10.20474%201.85541,5.79815%201.85541,12.98786%200,10.43667%20-6.03008,18.786%20-5.79815,8.11741%20-15.77096,12.75593%20-9.97282,4.63852%20-22.2649,4.63852%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%23adedd6;fill-opacity:1'%20id='path16861'%20/%3e%3cpath%20d='M%20948.99398,344.24783%20V%20191.4086%20h%2023.88838%20v%20152.83923%20z%20m%20-25.27993,-98.56854%20v%20-23.1926%20h%2077.46325%20v%2023.1926%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%23adedd6;fill-opacity:1'%20id='path16863'%20/%3e%3cpath%20d='m%201076.5528,346.56709%20q%20-17.8583,0%20-32.0058,-8.11741%20-13.9156,-8.34933%20-22.033,-22.49682%20-8.1174,-14.37941%20-8.1174,-32.70156%200,-18.32216%208.1174,-32.46964%208.1174,-14.37941%2022.033,-22.49682%2014.1475,-8.34934%2032.0058,-8.34934%2017.6263,0%2031.5419,8.34934%2014.1475,8.11741%2022.2649,22.49682%208.1174,14.14748%208.1174,32.46964%200,18.32215%20-8.1174,32.70156%20-8.1174,14.14749%20-22.2649,22.49682%20-13.9156,8.11741%20-31.5419,8.11741%20z%20m%200,-21.80104%20q%2010.9005,0%2019.4818,-5.3343%208.5812,-5.56622%2013.4517,-14.84326%204.8704,-9.50897%204.6385,-21.33719%200.2319,-12.06016%20-4.6385,-21.33719%20-4.8705,-9.50897%20-13.4517,-14.84327%20-8.5813,-5.3343%20-19.4818,-5.3343%20-10.9005,0%20-19.7137,5.56623%20-8.5813,5.3343%20-13.4517,14.84326%20-4.8705,9.27704%20-4.6386,21.10527%20-0.2319,11.82822%204.6386,21.33719%204.8704,9.27704%2013.4517,14.84326%208.8132,5.3343%2019.7137,5.3343%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%23adedd6;fill-opacity:1'%20id='path16865'%20/%3e%3cpath%20d='M%201168.3954,344.24783%20V%20222.48669%20h%2023.8884%20v%20121.76114%20z%20m%2011.5963,-148.66456%20q%20-7.6536,0%20-11.8282,-3.94274%20-4.1747,-3.94274%20-4.1747,-11.13245%200,-6.72585%204.1747,-10.90052%204.4065,-4.17467%2011.8282,-4.17467%207.6535,0%2011.8282,3.94274%204.1747,3.94275%204.1747,11.13245%200,6.72585%20-4.4066,10.90052%20-4.1747,4.17467%20-11.5963,4.17467%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%23adedd6;fill-opacity:1'%20id='path16867'%20/%3e%3cpath%20d='M%201228.928,344.24783%20V%20222.48669%20h%2024.1203%20v%2038.26779%20l%20-2.3192,-9.27704%20q%202.5512,-8.81319%208.5812,-16.0029%206.262,-7.1897%2014.1475,-11.36437%208.1174,-4.17467%2016.6987,-4.17467%203.9427,0%207.4216,0.69578%203.7109,0.69578%205.7982,1.62348%20l%20-6.262,25.97571%20q%20-2.7831,-1.15963%20-6.262,-1.85541%20-3.247,-0.9277%20-6.4939,-0.9277%20-6.262,0%20-12.0602,2.55119%20-5.5662,2.31926%20-9.9728,6.72585%20-4.1747,4.17467%20-6.7259,9.97282%20-2.5512,5.56622%20-2.5512,12.29207%20v%2067.25854%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%23adedd6;fill-opacity:1'%20id='path16869'%20/%3e%3cpath%20d='m%201374.1134,346.56709%20q%20-18.786,0%20-33.3973,-7.88548%20-14.3794,-8.11741%20-22.7288,-22.03297%20-8.1174,-13.91556%20-8.1174,-32.00579%200,-14.37941%204.6386,-26.20763%204.6385,-11.82823%2012.7559,-20.40949%208.3493,-8.81319%2019.7137,-13.45171%2011.5963,-4.87045%2025.048,-4.87045%2011.8282,0%2022.033,4.63852%2010.2047,4.4066%2017.6263,12.29208%207.6536,7.88549%2011.5963,18.78601%204.1747,10.66859%203.9428,23.42452%20l%20-0.2319,10.20475%20h%20-99.4963%20l%20-5.3343,-19.01794%20h%2084.1891%20l%20-3.4788,3.94275%20v%20-5.56623%20q%20-0.6958,-7.65355%20-5.1024,-13.68363%20-4.4066,-6.03008%20-11.1325,-9.50897%20-6.7258,-3.47889%20-14.6113,-3.47889%20-12.524,0%20-21.1053,4.87045%20-8.5812,4.63852%20-12.9878,13.91556%20-4.4066,9.04511%20-4.4066,22.49682%200,12.75593%205.3343,22.2649%205.3343,9.27704%2015.0752,14.37941%209.7409,5.10237%2022.4968,5.10237%209.0451,0%2016.6987,-3.01504%207.8855,-3.01504%2016.9306,-10.90052%20l%2012.0601,16.9306%20q%20-5.5662,5.56622%20-13.6836,9.74089%20-7.8855,4.17467%20-16.9306,6.72585%20-8.8132,2.31926%20-17.3945,2.31926%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%23adedd6;fill-opacity:1'%20id='path16871'%20/%3e%3c/g%3e%3c/g%3e%3cg%20id='layer2'%20style='display:none'%3e%3cpath%20id='path1657'%20style='fill:%23b4fae2;fill-opacity:1;stroke:%23b4fae2;stroke-width:8;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1'%20d='m%20296,103.98242%20-135.53125,177.9668%20h%2088.70117%20z%20M%20262.83008,230.05078%20216,408.01758%20351.53125,230.05078%20Z'%20transform='rotate(-4.156553,256,256.00691)'%20/%3e%3c/g%3e%3c/svg%3e";
const HistoireLogoLight = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3c!--%20Created%20with%20Inkscape%20(http://www.inkscape.org/)%20--%3e%3csvg%20width='1536'%20height='512'%20viewBox='0%200%201536%20512'%20version='1.1'%20id='svg5'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3cdefs%20id='defs2'%20/%3e%3cg%20id='layer1'%3e%3crect%20style='opacity:0.5;fill:%2334d399;fill-opacity:1;stroke-width:1.00375'%20id='rect1372'%20width='314.30923'%20height='406.60901'%20x='-26.565063'%20y='134.75079'%20transform='rotate(-23.821262)'%20ry='8'%20/%3e%3crect%20style='fill:%2334d399;fill-opacity:1;stroke-width:1.00375'%20id='rect850'%20width='314.30923'%20height='406.60901'%20x='77.571838'%20y='72.808708'%20ry='8'%20transform='rotate(-4.5744534)'%20/%3e%3c/g%3e%3cg%20id='layer3'%3e%3cpath%20id='path1657-3'%20style='display:inline;fill:%23adedd6;fill-opacity:1;stroke:%23adedd6;stroke-width:8.34923;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1'%20d='M%20359.38947,355.95134%20320.72935,176.52942%20238.34613,238.94118%20Z%20M%20273.64124,273.06608%20152.59788,156.05591%20191.25804,335.47786%20Z'%20/%3e%3cg%20aria-label='Histoire'%20id='text1821'%20style='font-size:231.926px;line-height:1.25;font-family:Sen;-inkscape-font-specification:Sen;fill:%232bc78e;stroke-width:5.79813;fill-opacity:1'%20transform='matrix(1.1500556,0,0,1.1500556,-105.40156,-38.414233)'%3e%3cpath%20d='M%20693.87591,344.24783%20V%20181.89964%20h%2025.04801%20v%20162.34819%20z%20m%20-105.99018,0%20V%20181.89964%20h%2025.04801%20v%20162.34819%20z%20m%2010.90052,-68.88202%20v%20-24.1203%20h%20106.22211%20v%2024.1203%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%232bc78e;fill-opacity:1'%20id='path16857'%20/%3e%3cpath%20d='M%20762.294,344.24783%20V%20222.48669%20h%2023.88838%20v%20121.76114%20z%20m%2011.5963,-148.66456%20q%20-7.65356,0%20-11.82822,-3.94274%20-4.17467,-3.94274%20-4.17467,-11.13245%200,-6.72585%204.17467,-10.90052%204.40659,-4.17467%2011.82822,-4.17467%207.65356,0%2011.82823,3.94274%204.17466,3.94275%204.17466,11.13245%200,6.72585%20-4.40659,10.90052%20-4.17467,4.17467%20-11.5963,4.17467%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%232bc78e;fill-opacity:1'%20id='path16859'%20/%3e%3cpath%20d='m%20863.41371,346.56709%20q%20-15.30711,0%20-27.59919,-5.33429%20-12.29208,-5.3343%20-20.40949,-15.77097%20l%2016.23482,-13.91556%20q%206.95778,8.11741%2015.07519,11.82822%208.34934,3.47889%2018.78601,3.47889%204.17466,0%207.65355,-0.9277%203.71082,-1.15963%206.26201,-3.24696%202.78311,-2.08734%204.17466,-4.87045%201.39156,-3.01504%201.39156,-6.49393%200,-6.03007%20-4.40659,-9.74089%20-2.31926,-1.62348%20-7.42164,-3.47889%20-4.87044,-2.08733%20-12.75593,-4.17467%20-13.4517,-3.47889%20-22.03297,-7.88548%20-8.58126,-4.4066%20-13.21978,-9.97282%20-3.47889,-4.40659%20-5.10237,-9.50897%20-1.62348,-5.33429%20-1.62348,-11.59629%200,-7.65356%203.24696,-13.91556%203.47889,-6.49393%209.27704,-11.13245%206.03008,-4.87045%2013.91556,-7.42163%208.11741,-2.55119%2017.16253,-2.55119%208.58126,0%2016.93059,2.31926%208.58126,2.31926%2015.77097,6.72585%207.18971,4.4066%2012.06015,10.43667%20l%20-13.68363,15.07519%20q%20-4.4066,-4.40659%20-9.74089,-7.65355%20-5.10237,-3.47889%20-10.43667,-5.3343%20-5.3343,-1.85541%20-9.74089,-1.85541%20-4.87045,0%20-8.81319,0.9277%20-3.94274,0.92771%20-6.72586,2.78312%20-2.55118,1.8554%20-3.94274,4.63852%20-1.39155,2.78311%20-1.39155,6.262%200.23192,3.01504%201.39155,5.79815%201.39156,2.55118%203.71082,4.40659%202.55118,1.85541%207.65356,3.94274%205.10237,2.08734%2012.98785,3.94274%2011.5963,3.01504%2019.01793,6.72586%207.65356,3.47889%2012.06015,8.11741%204.63852,4.40659%206.49393,10.20474%201.85541,5.79815%201.85541,12.98786%200,10.43667%20-6.03008,18.786%20-5.79815,8.11741%20-15.77096,12.75593%20-9.97282,4.63852%20-22.2649,4.63852%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%232bc78e;fill-opacity:1'%20id='path16861'%20/%3e%3cpath%20d='M%20948.99398,344.24783%20V%20191.4086%20h%2023.88838%20v%20152.83923%20z%20m%20-25.27993,-98.56854%20v%20-23.1926%20h%2077.46325%20v%2023.1926%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%232bc78e;fill-opacity:1'%20id='path16863'%20/%3e%3cpath%20d='m%201076.5528,346.56709%20q%20-17.8583,0%20-32.0058,-8.11741%20-13.9156,-8.34933%20-22.033,-22.49682%20-8.1174,-14.37941%20-8.1174,-32.70156%200,-18.32216%208.1174,-32.46964%208.1174,-14.37941%2022.033,-22.49682%2014.1475,-8.34934%2032.0058,-8.34934%2017.6263,0%2031.5419,8.34934%2014.1475,8.11741%2022.2649,22.49682%208.1174,14.14748%208.1174,32.46964%200,18.32215%20-8.1174,32.70156%20-8.1174,14.14749%20-22.2649,22.49682%20-13.9156,8.11741%20-31.5419,8.11741%20z%20m%200,-21.80104%20q%2010.9005,0%2019.4818,-5.3343%208.5812,-5.56622%2013.4517,-14.84326%204.8704,-9.50897%204.6385,-21.33719%200.2319,-12.06016%20-4.6385,-21.33719%20-4.8705,-9.50897%20-13.4517,-14.84327%20-8.5813,-5.3343%20-19.4818,-5.3343%20-10.9005,0%20-19.7137,5.56623%20-8.5813,5.3343%20-13.4517,14.84326%20-4.8705,9.27704%20-4.6386,21.10527%20-0.2319,11.82822%204.6386,21.33719%204.8704,9.27704%2013.4517,14.84326%208.8132,5.3343%2019.7137,5.3343%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%232bc78e;fill-opacity:1'%20id='path16865'%20/%3e%3cpath%20d='M%201168.3954,344.24783%20V%20222.48669%20h%2023.8884%20v%20121.76114%20z%20m%2011.5963,-148.66456%20q%20-7.6536,0%20-11.8282,-3.94274%20-4.1747,-3.94274%20-4.1747,-11.13245%200,-6.72585%204.1747,-10.90052%204.4065,-4.17467%2011.8282,-4.17467%207.6535,0%2011.8282,3.94274%204.1747,3.94275%204.1747,11.13245%200,6.72585%20-4.4066,10.90052%20-4.1747,4.17467%20-11.5963,4.17467%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%232bc78e;fill-opacity:1'%20id='path16867'%20/%3e%3cpath%20d='M%201228.928,344.24783%20V%20222.48669%20h%2024.1203%20v%2038.26779%20l%20-2.3192,-9.27704%20q%202.5512,-8.81319%208.5812,-16.0029%206.262,-7.1897%2014.1475,-11.36437%208.1174,-4.17467%2016.6987,-4.17467%203.9427,0%207.4216,0.69578%203.7109,0.69578%205.7982,1.62348%20l%20-6.262,25.97571%20q%20-2.7831,-1.15963%20-6.262,-1.85541%20-3.247,-0.9277%20-6.4939,-0.9277%20-6.262,0%20-12.0602,2.55119%20-5.5662,2.31926%20-9.9728,6.72585%20-4.1747,4.17467%20-6.7259,9.97282%20-2.5512,5.56622%20-2.5512,12.29207%20v%2067.25854%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%232bc78e;fill-opacity:1'%20id='path16869'%20/%3e%3cpath%20d='m%201374.1134,346.56709%20q%20-18.786,0%20-33.3973,-7.88548%20-14.3794,-8.11741%20-22.7288,-22.03297%20-8.1174,-13.91556%20-8.1174,-32.00579%200,-14.37941%204.6386,-26.20763%204.6385,-11.82823%2012.7559,-20.40949%208.3493,-8.81319%2019.7137,-13.45171%2011.5963,-4.87045%2025.048,-4.87045%2011.8282,0%2022.033,4.63852%2010.2047,4.4066%2017.6263,12.29208%207.6536,7.88549%2011.5963,18.78601%204.1747,10.66859%203.9428,23.42452%20l%20-0.2319,10.20475%20h%20-99.4963%20l%20-5.3343,-19.01794%20h%2084.1891%20l%20-3.4788,3.94275%20v%20-5.56623%20q%20-0.6958,-7.65355%20-5.1024,-13.68363%20-4.4066,-6.03008%20-11.1325,-9.50897%20-6.7258,-3.47889%20-14.6113,-3.47889%20-12.524,0%20-21.1053,4.87045%20-8.5812,4.63852%20-12.9878,13.91556%20-4.4066,9.04511%20-4.4066,22.49682%200,12.75593%205.3343,22.2649%205.3343,9.27704%2015.0752,14.37941%209.7409,5.10237%2022.4968,5.10237%209.0451,0%2016.6987,-3.01504%207.8855,-3.01504%2016.9306,-10.90052%20l%2012.0601,16.9306%20q%20-5.5662,5.56622%20-13.6836,9.74089%20-7.8855,4.17467%20-16.9306,6.72585%20-8.8132,2.31926%20-17.3945,2.31926%20z'%20style='font-family:'Lexend%20Deca';-inkscape-font-specification:'Lexend%20Deca';fill:%232bc78e;fill-opacity:1'%20id='path16871'%20/%3e%3c/g%3e%3c/g%3e%3cg%20id='layer2'%20style='display:none'%3e%3cpath%20id='path1657'%20style='fill:%23b4fae2;fill-opacity:1;stroke:%23b4fae2;stroke-width:8;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1'%20d='m%20296,103.98242%20-135.53125,177.9668%20h%2088.70117%20z%20M%20262.83008,230.05078%20216,408.01758%20351.53125,230.05078%20Z'%20transform='rotate(-4.156553,256,256.00691)'%20/%3e%3c/g%3e%3c/svg%3e";
const _hoisted_1$6 = ["src", "alt"];
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AppLogo",
  setup(__props) {
    const logoUrl = computed(() => {
      var _a, _b;
      if (isDark.value) {
        return ((_a = histoireConfig.theme.logo) == null ? void 0 : _a.dark) ? customLogos.dark : HistoireLogoDark;
      }
      return ((_b = histoireConfig.theme.logo) == null ? void 0 : _b.light) ? customLogos.light : HistoireLogoLight;
    });
    const altText = computed(() => histoireConfig.theme.title + " logo");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("img", {
        class: "histoire-app-logo",
        src: logoUrl.value,
        alt: altText.value
      }, null, 8, _hoisted_1$6);
    };
  }
});
const isMac = navigator.platform.toLowerCase().includes("mac");
function onKeyboardShortcut(shortcut, handler, options = {}) {
  useEventListener(options.event ?? "keydown", (event) => {
    if (isMatchingShortcut(isRef(shortcut) ? shortcut.value : shortcut)) {
      handler(event);
    }
  });
}
const modifiers = {
  ctrl: { key: "Control", pressed: false },
  alt: { key: "Alt", pressed: false },
  shift: { key: "Shift", pressed: false },
  meta: { key: "Meta", pressed: false }
};
const pressedKeys = /* @__PURE__ */ new Set();
window.addEventListener("keydown", (event) => {
  for (const i in modifiers) {
    const mod = modifiers[i];
    if (mod.key === event.key) {
      mod.pressed = true;
      return;
    }
  }
  pressedKeys.add(event.key.toLocaleLowerCase());
});
window.addEventListener("keyup", (event) => {
  requestAnimationFrame(() => {
    pressedKeys.clear();
    for (const i in modifiers) {
      const mod = modifiers[i];
      if (mod.key === event.key) {
        mod.pressed = false;
        break;
      }
    }
  });
});
window.addEventListener("blur", () => {
  pressedKeys.clear();
  for (const i in modifiers) {
    const mod = modifiers[i];
    mod.pressed = false;
  }
});
function isMatchingShortcut(shortcut) {
  for (const combination of shortcut) {
    if (isMatchingCombination(combination.toLowerCase())) {
      return true;
    }
  }
  return false;
}
function isMatchingCombination(combination) {
  const splitted = combination.split("+").map((key) => key.trim());
  const targetKey = splitted.pop();
  for (const mod in modifiers) {
    const containsMod = splitted.includes(mod);
    const isPressed = modifiers[mod].pressed;
    if (containsMod !== isPressed) {
      return false;
    }
  }
  return pressedKeys.has(targetKey);
}
function formatKey(key) {
  key = key.toLowerCase();
  if (key === "ctrl") {
    return isMac ? "^" : "Ctrl";
  }
  if (key === "alt") {
    return isMac ? "⎇" : "Alt";
  }
  if (key === "shift") {
    return "⇧";
  }
  if (key === "meta") {
    return "⌘";
  }
  if (key === "enter") {
    return "⏎";
  }
  return key.charAt(0).toUpperCase() + key.substring(1).toLowerCase();
}
function makeTooltip(descriptionHtml, keyboardShortcut) {
  return {
    content: `<div>${descriptionHtml}</div><div class="htw-flex htw-items-center htw-gap-1 htw-mt-2 htw-text-sm">${genKeyboardShortcutHtml(keyboardShortcut({ isMac }))}</div>`,
    html: true
  };
}
function genKeyboardShortcutHtml(shortcut) {
  return `<span class="htw-border htw-border-gray-600 htw-px-1 htw-rounded-sm htw-text-gray-400">${shortcut.split("+").map((k) => formatKey(k.trim())).join(" ")}</span>`;
}
const _hoisted_1$5 = { class: "histoire-app-header htw-px-4 htw-h-16 htw-flex htw-items-center htw-gap-2" };
const _hoisted_2$3 = { class: "htw-py-3 sm:htw-py-4 htw-flex-1 htw-h-full htw-flex htw-items-center htw-pr-2" };
const _hoisted_3$2 = ["href"];
const _hoisted_4$1 = { class: "htw-ml-auto htw-flex-none htw-flex" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  emits: {
    search: () => true
  },
  setup(__props) {
    const themeIcon = computed(() => {
      return isDark.value ? "carbon:moon" : "carbon:sun";
    });
    onKeyboardShortcut(["ctrl+shift+d", "meta+shift+d"], (event) => {
      event.preventDefault();
      toggleDark();
    });
    return (_ctx, _cache) => {
      var _a;
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createBaseVNode("div", _hoisted_2$3, [
          createBaseVNode("a", {
            href: (_a = unref(histoireConfig).theme) == null ? void 0 : _a.logoHref,
            target: "_blank",
            class: "htw-w-full htw-h-full htw-flex htw-items-center"
          }, [
            createVNode(_sfc_main$6, { class: "htw-max-w-full htw-max-h-full" })
          ], 8, _hoisted_3$2)
        ]),
        createBaseVNode("div", _hoisted_4$1, [
          withDirectives((openBlock(), createElementBlock("a", {
            class: "htw-p-2 sm:htw-p-1 hover:htw-text-primary-500 dark:hover:htw-text-primary-400 htw-cursor-pointer htw-text-gray-900 dark:htw-text-gray-100",
            "data-test-id": "search-btn",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("search"))
          }, [
            createVNode(unref(Icon), {
              icon: "carbon:search",
              class: "htw-w-6 htw-h-6 sm:htw-w-4 sm:htw-h-4"
            })
          ])), [
            [_directive_tooltip, unref(makeTooltip)("Search", ({ isMac: isMac2 }) => isMac2 ? "meta+k" : "ctrl+k")]
          ]),
          !unref(histoireConfig).theme.hideColorSchemeSwitch ? withDirectives((openBlock(), createElementBlock("a", {
            key: 0,
            class: "htw-p-2 sm:htw-p-1 hover:htw-text-primary-500 dark:hover:htw-text-primary-400 htw-cursor-pointer htw-text-gray-900 dark:htw-text-gray-100",
            onClick: _cache[1] || (_cache[1] = ($event) => unref(toggleDark)())
          }, [
            createVNode(unref(Icon), {
              icon: themeIcon.value,
              class: "htw-w-6 htw-h-6 sm:htw-w-4 sm:htw-h-4"
            }, null, 8, ["icon"])
          ])), [
            [_directive_tooltip, unref(makeTooltip)("Toggle dark mode", ({ isMac: isMac2 }) => isMac2 ? "meta+shift+d" : "ctrl+shift+d")]
          ]) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
function getCommandContext() {
  const storyStore = useStoryStore();
  return {
    route: router.currentRoute.value,
    currentStory: storyStore.currentStory,
    currentVariant: storyStore.currentVariant
  };
}
const useCommandStore = defineStore("command", () => {
  const selectedCommand = ref(null);
  const showPromptsModal = ref(false);
  function activateCommand(command) {
    var _a, _b;
    selectedCommand.value = command;
    if ((_a = command.prompts) == null ? void 0 : _a.length) {
      showPromptsModal.value = true;
    } else {
      ((_b = command.getParams) == null ? void 0 : _b.call(command, getCommandContext())) ?? {};
    }
  }
  return {
    selectedCommand,
    showPromptsModal,
    activateCommand
  };
});
const _withScopeId = (n) => (pushScopeId("data-v-36846ccf"), n = n(), popScopeId(), n);
const _hoisted_1$4 = { class: "histoire-breadcrumb" };
const _hoisted_2$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "htw-opacity-40" }, " / ", -1));
const _hoisted_3$1 = { class: "htw-flex htw-items-center htw-gap-2" };
const _hoisted_4 = { class: "htw-opacity-40 htw-text-sm" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Breadcrumb",
  props: {
    tree: {},
    stories: {}
  },
  setup(__props) {
    useCssVars((_ctx) => {
      var _a;
      return {
        "5792748b": (_a = story.value) == null ? void 0 : _a.iconColor
      };
    });
    const storyStore = useStoryStore();
    const story = computed(() => storyStore.currentStory);
    const folders = computed(() => {
      return story.value.file.path.slice(0, -1);
    });
    const isMenuOpened = ref(false);
    function openMenu() {
      isMenuOpened.value = true;
    }
    function closeMenu() {
      isMenuOpened.value = false;
    }
    watch(story, () => {
      isMenuOpened.value = false;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$4, [
          createBaseVNode("a", {
            class: "htw-px-6 htw-h-12 hover:htw-text-primary-500 dark:hover:htw-text-primary-400 htw-cursor-pointer htw-flex htw-gap-2 htw-flex-wrap htw-w-full htw-items-center",
            onClick: openMenu
          }, [
            story.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(folders.value, (file, key) => {
                return openBlock(), createElementBlock(Fragment, { key }, [
                  createBaseVNode("span", null, toDisplayString(file), 1),
                  _hoisted_2$2
                ], 64);
              }), 128)),
              createBaseVNode("span", _hoisted_3$1, [
                createVNode(unref(Icon), {
                  icon: story.value.icon ?? "carbon:cube",
                  class: normalizeClass(["htw-w-5 htw-h-5 htw-flex-none", {
                    "htw-text-primary-500": !story.value.iconColor,
                    "bind-icon-color": story.value.iconColor
                  }])
                }, null, 8, ["icon", "class"]),
                createTextVNode(" " + toDisplayString(story.value.title) + " ", 1),
                createBaseVNode("span", _hoisted_4, toDisplayString(story.value.variants.length), 1)
              ])
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(" Select a story... ")
            ], 64)),
            createVNode(unref(Icon), {
              icon: "carbon:chevron-sort",
              class: "htw-w-5 htw-h-5 htw-shrink-0 htw-ml-auto"
            })
          ])
        ]),
        createVNode(_sfc_main$b, {
          title: "Select a story",
          opened: isMenuOpened.value,
          onClose: closeMenu
        }, {
          default: withCtx(() => [
            createVNode(_sfc_main$7, {
              tree: _ctx.tree,
              stories: _ctx.stories,
              class: "htw-flex-1 htw-overflow-y-scroll"
            }, null, 8, ["tree", "stories"])
          ]),
          _: 1
        }, 8, ["opened"])
      ], 64);
    };
  }
});
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-36846ccf"]]);
const _hoisted_1$3 = { class: "histoire-search-loading htw-flex htw-items-center htw-gap-4 htw-pl-6 htw-border htw-border-transparent focus-visible:htw-border-primary-500 htw-h-[51px] htw-opacity-30" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SearchLoading",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createVNode(unref(Icon), {
          icon: "carbon:search",
          class: "flex-none htw-w-4 htw-h-4"
        }),
        createTextVNode(" Loading... ")
      ]);
    };
  }
});
const _hoisted_1$2 = {
  class: "histoire-search-modal htw-fixed htw-inset-0 htw-bg-white/80 dark:htw-bg-gray-900/80 htw-z-20",
  "data-test-id": "search-modal"
};
const _hoisted_2$1 = { class: "htw-bg-white dark:htw-bg-gray-900 md:htw-mt-16 md:htw-mx-auto htw-w-screen htw-max-w-[512px] htw-shadow-xl htw-border htw-border-gray-200 dark:htw-border-gray-750 htw-rounded-lg htw-relative htw-divide-y htw-divide-gray-200 dark:htw-divide-gray-850" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SearchModal",
  props: {
    shown: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    close: () => true
  },
  setup(__props, { emit: __emit }) {
    const SearchPane = defineAsyncComponent({
      loader: () => __vitePreload(() => import("./SearchPane.vue-5FPwSnMe.js"), true ? __vite__mapDeps([0,1,2,3,4,5]) : void 0),
      loadingComponent: _sfc_main$3,
      delay: 0
    });
    const emit = __emit;
    function close() {
      emit("close");
    }
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", {
          class: "htw-absolute htw-inset-0",
          onClick: _cache[0] || (_cache[0] = ($event) => close())
        }),
        createBaseVNode("div", _hoisted_2$1, [
          createVNode(unref(SearchPane), {
            shown: __props.shown,
            onClose: _cache[1] || (_cache[1] = ($event) => close())
          }, null, 8, ["shown"])
        ])
      ], 512)), [
        [vShow, __props.shown]
      ]);
    };
  }
});
const _hoisted_1$1 = { class: "histoire-initial-loading htw-fixed htw-inset-0 htw-bg-white dark:htw-bg-gray-700 htw-flex htw-flex-col htw-gap-6 htw-items-center htw-justify-center" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "InitialLoading",
  setup(__props) {
    const progress = reactive({
      loaded: 0,
      total: 0
    });
    const maxCols = window.innerWidth / 20;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(Transition, { name: "__histoire-fade" }, {
          default: withCtx(() => [
            progress.total > 0 ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "htw-grid htw-gap-2",
              style: normalizeStyle({
                gridTemplateColumns: `repeat(${Math.min(Math.ceil(Math.sqrt(progress.total)), maxCols)}, minmax(0, 1fr))`
              })
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(progress.total, (n) => {
                return openBlock(), createElementBlock("div", {
                  key: n,
                  class: "htw-bg-primary-500/10 htw-rounded-full"
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(["htw-w-3 htw-h-3 htw-bg-primary-500 htw-rounded-full htw-duration-150 htw-ease-out", {
                      "htw-transition-transform htw-scale-0": n >= progress.loaded
                    }])
                  }, null, 2)
                ]);
              }), 128))
            ], 4)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const _hoisted_1 = {
  key: 0,
  class: "histoire-app htw-hidden"
};
const _hoisted_2 = {
  key: 0,
  class: "htw-h-full htw-flex htw-flex-col htw-divide-y htw-divide-gray-100 dark:htw-divide-gray-800"
};
const _hoisted_3 = { class: "htw-flex htw-flex-col htw-h-full htw-bg-gray-100 dark:htw-bg-gray-750 __histoire-pane-shadow-from-right" };
const __default__ = {
  name: "HistoireApp"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  setup(__props) {
    const files$1 = ref(files.map((file) => mapFile(file)));
    const tree$1 = ref(tree);
    const stories = computed(() => files$1.value.reduce((acc, file) => {
      acc.push(file.story);
      return acc;
    }, []));
    const storyStore = useStoryStore();
    watch(stories, (value) => {
      storyStore.setStories(value);
    }, {
      immediate: true
    });
    useTitle(computed(() => {
      if (storyStore.currentStory) {
        let title = storyStore.currentStory.title;
        if (storyStore.currentVariant) {
          title += ` › ${storyStore.currentVariant.title}`;
        }
        return `${title} | ${histoireConfig.theme.title}`;
      }
      return histoireConfig.theme.title;
    }));
    const loadSearch = ref(false);
    const isSearchOpen = ref(false);
    watch(isSearchOpen, (value) => {
      if (value) {
        loadSearch.value = true;
      }
    });
    onKeyboardShortcut(["ctrl+k", "meta+k"], (event) => {
      isSearchOpen.value = true;
      event.preventDefault();
    });
    const loading = ref(false);
    const mounted = ref(false);
    onMounted(() => {
      mounted.value = true;
    });
    useCommandStore();
    return (_ctx, _cache) => {
      const _component_RouterView = resolveComponent("RouterView");
      return openBlock(), createElementBlock(Fragment, null, [
        unref(storyStore).currentStory ? (openBlock(), createElementBlock("div", _hoisted_1, [
          (openBlock(), createBlock(_sfc_main$c, {
            key: unref(storyStore).currentStory.id,
            story: unref(storyStore).currentStory
          }, null, 8, ["story"]))
        ])) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: "htw-h-screen htw-bg-white dark:htw-bg-gray-700 dark:htw-text-gray-100",
          style: normalizeStyle({
            // Prevent flash of content
            opacity: mounted.value ? 1 : 0
          })
        }, [
          unref(isMobile) ? (openBlock(), createElementBlock("div", _hoisted_2, [
            createVNode(_sfc_main$5, {
              onSearch: _cache[0] || (_cache[0] = ($event) => isSearchOpen.value = true)
            }),
            createVNode(Breadcrumb, {
              tree: tree$1.value,
              stories: stories.value
            }, null, 8, ["tree", "stories"]),
            createVNode(_component_RouterView, { class: "htw-grow" })
          ])) : (openBlock(), createBlock(BaseSplitPane, {
            key: 1,
            "save-id": "main-horiz",
            min: 5,
            max: 50,
            "default-split": 15,
            class: "htw-h-full"
          }, {
            first: withCtx(() => [
              createBaseVNode("div", _hoisted_3, [
                createVNode(_sfc_main$5, {
                  class: "htw-flex-none",
                  onSearch: _cache[1] || (_cache[1] = ($event) => isSearchOpen.value = true)
                }),
                createVNode(_sfc_main$7, {
                  tree: tree$1.value,
                  stories: stories.value,
                  class: "htw-flex-1"
                }, null, 8, ["tree", "stories"])
              ])
            ]),
            last: withCtx(() => [
              createVNode(_component_RouterView)
            ]),
            _: 1
          })),
          loadSearch.value ? (openBlock(), createBlock(_sfc_main$2, {
            key: 2,
            shown: isSearchOpen.value,
            onClose: _cache[2] || (_cache[2] = ($event) => isSearchOpen.value = false)
          }, null, 8, ["shown"])) : createCommentVNode("", true),
          createCommentVNode("", true)
        ], 4),
        createVNode(Transition, { name: "__histoire-fade" }, {
          default: withCtx(() => [
            loading.value ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ], 64);
    };
  }
});
async function mountMainApp() {
  const app = createApp(_sfc_main);
  app.use(createPinia());
  app.use(plugin, {
    overflowPadding: 4,
    arrowPadding: 8,
    themes: {
      tooltip: {
        distance: 8
      },
      dropdown: {
        computeTransformOrigin: true,
        distance: 8
      }
    }
  });
  app.use(router);
  app.mount("#app");
}
mountMainApp();
export {
  onKeyboardShortcut as o,
  useCommandStore as u
};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/SearchPane.vue-5FPwSnMe.js","assets/vendor-McaHzbIz.js","assets/story-gtSYMgva.js","assets/GenericMountStory.vue2-sNQr_fRB.js","assets/BaseEmpty.vue-AVDYAt1Y.js","assets/MobileOverlay.vue2-qjeiiYR_.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
//# sourceMappingURL=bundle-main-fTHr_XfI.js.map
