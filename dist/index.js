(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('util'), require('stream'), require('path'), require('http'), require('https'), require('url'), require('fs'), require('assert'), require('tty'), require('net'), require('zlib'), require('events')) :
    typeof define === 'function' && define.amd ? define(['exports', 'util', 'stream', 'path', 'http', 'https', 'url', 'fs', 'assert', 'tty', 'net', 'zlib', 'events'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Leafletjs = {}, global.require$$1, global.stream, global.require$$1$1, global.require$$3, global.require$$4, global.require$$0$1, global.require$$6, global.require$$4$2, global.require$$0$2, global.require$$4$1, global.zlib, global.EventEmitter));
})(this, (function (exports, require$$1, stream, require$$1$1, require$$3, require$$4, require$$0$1, require$$6, require$$4$2, require$$0$2, require$$4$1, zlib, EventEmitter) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
    var stream__default = /*#__PURE__*/_interopDefaultLegacy(stream);
    var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);
    var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
    var require$$4__default = /*#__PURE__*/_interopDefaultLegacy(require$$4);
    var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
    var require$$6__default = /*#__PURE__*/_interopDefaultLegacy(require$$6);
    var require$$4__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$4$2);
    var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
    var require$$4__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$4$1);
    var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
    var EventEmitter__default = /*#__PURE__*/_interopDefaultLegacy(EventEmitter);

    function noop$2() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop$2;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    /**
     * Associates an arbitrary `context` object with the current component and the specified `key`
     * and returns that object. The context is then available to children of the component
     * (including slotted content) with `getContext`.
     *
     * Like lifecycle functions, this must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-setcontext
     */
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    /**
     * Retrieves the context that belongs to the closest parent component with the specified `key`.
     * Must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-getcontext
     */
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop$2,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop$2;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop$2;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var leafletSrc = {exports: {}};

    /* @preserve
     * Leaflet 1.9.2, a JS library for interactive maps. https://leafletjs.com
     * (c) 2010-2022 Vladimir Agafonkin, (c) 2010-2011 CloudMade
     */

    (function (module, exports) {
    	(function (global, factory) {
    	  factory(exports) ;
    	})(commonjsGlobal, (function (exports) {
    	  var version = "1.9.2";

    	  /*
    	   * @namespace Util
    	   *
    	   * Various utility functions, used by Leaflet internally.
    	   */

    	  // @function extend(dest: Object, src?: Object): Object
    	  // Merges the properties of the `src` object (or multiple objects) into `dest` object and returns the latter. Has an `L.extend` shortcut.
    	  function extend(dest) {
    	  	var i, j, len, src;

    	  	for (j = 1, len = arguments.length; j < len; j++) {
    	  		src = arguments[j];
    	  		for (i in src) {
    	  			dest[i] = src[i];
    	  		}
    	  	}
    	  	return dest;
    	  }

    	  // @function create(proto: Object, properties?: Object): Object
    	  // Compatibility polyfill for [Object.create](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
    	  var create$2 = Object.create || (function () {
    	  	function F() {}
    	  	return function (proto) {
    	  		F.prototype = proto;
    	  		return new F();
    	  	};
    	  })();

    	  // @function bind(fn: Function, …): Function
    	  // Returns a new function bound to the arguments passed, like [Function.prototype.bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
    	  // Has a `L.bind()` shortcut.
    	  function bind(fn, obj) {
    	  	var slice = Array.prototype.slice;

    	  	if (fn.bind) {
    	  		return fn.bind.apply(fn, slice.call(arguments, 1));
    	  	}

    	  	var args = slice.call(arguments, 2);

    	  	return function () {
    	  		return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
    	  	};
    	  }

    	  // @property lastId: Number
    	  // Last unique ID used by [`stamp()`](#util-stamp)
    	  var lastId = 0;

    	  // @function stamp(obj: Object): Number
    	  // Returns the unique ID of an object, assigning it one if it doesn't have it.
    	  function stamp(obj) {
    	  	if (!('_leaflet_id' in obj)) {
    	  		obj['_leaflet_id'] = ++lastId;
    	  	}
    	  	return obj._leaflet_id;
    	  }

    	  // @function throttle(fn: Function, time: Number, context: Object): Function
    	  // Returns a function which executes function `fn` with the given scope `context`
    	  // (so that the `this` keyword refers to `context` inside `fn`'s code). The function
    	  // `fn` will be called no more than one time per given amount of `time`. The arguments
    	  // received by the bound function will be any arguments passed when binding the
    	  // function, followed by any arguments passed when invoking the bound function.
    	  // Has an `L.throttle` shortcut.
    	  function throttle(fn, time, context) {
    	  	var lock, args, wrapperFn, later;

    	  	later = function () {
    	  		// reset lock and call if queued
    	  		lock = false;
    	  		if (args) {
    	  			wrapperFn.apply(context, args);
    	  			args = false;
    	  		}
    	  	};

    	  	wrapperFn = function () {
    	  		if (lock) {
    	  			// called too soon, queue to call later
    	  			args = arguments;

    	  		} else {
    	  			// call and lock until later
    	  			fn.apply(context, arguments);
    	  			setTimeout(later, time);
    	  			lock = true;
    	  		}
    	  	};

    	  	return wrapperFn;
    	  }

    	  // @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
    	  // Returns the number `num` modulo `range` in such a way so it lies within
    	  // `range[0]` and `range[1]`. The returned value will be always smaller than
    	  // `range[1]` unless `includeMax` is set to `true`.
    	  function wrapNum(x, range, includeMax) {
    	  	var max = range[1],
    	  	    min = range[0],
    	  	    d = max - min;
    	  	return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
    	  }

    	  // @function falseFn(): Function
    	  // Returns a function which always returns `false`.
    	  function falseFn() { return false; }

    	  // @function formatNum(num: Number, precision?: Number|false): Number
    	  // Returns the number `num` rounded with specified `precision`.
    	  // The default `precision` value is 6 decimal places.
    	  // `false` can be passed to skip any processing (can be useful to avoid round-off errors).
    	  function formatNum(num, precision) {
    	  	if (precision === false) { return num; }
    	  	var pow = Math.pow(10, precision === undefined ? 6 : precision);
    	  	return Math.round(num * pow) / pow;
    	  }

    	  // @function trim(str: String): String
    	  // Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
    	  function trim(str) {
    	  	return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    	  }

    	  // @function splitWords(str: String): String[]
    	  // Trims and splits the string on whitespace and returns the array of parts.
    	  function splitWords(str) {
    	  	return trim(str).split(/\s+/);
    	  }

    	  // @function setOptions(obj: Object, options: Object): Object
    	  // Merges the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`. Has an `L.setOptions` shortcut.
    	  function setOptions(obj, options) {
    	  	if (!Object.prototype.hasOwnProperty.call(obj, 'options')) {
    	  		obj.options = obj.options ? create$2(obj.options) : {};
    	  	}
    	  	for (var i in options) {
    	  		obj.options[i] = options[i];
    	  	}
    	  	return obj.options;
    	  }

    	  // @function getParamString(obj: Object, existingUrl?: String, uppercase?: Boolean): String
    	  // Converts an object into a parameter URL string, e.g. `{a: "foo", b: "bar"}`
    	  // translates to `'?a=foo&b=bar'`. If `existingUrl` is set, the parameters will
    	  // be appended at the end. If `uppercase` is `true`, the parameter names will
    	  // be uppercased (e.g. `'?A=foo&B=bar'`)
    	  function getParamString(obj, existingUrl, uppercase) {
    	  	var params = [];
    	  	for (var i in obj) {
    	  		params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
    	  	}
    	  	return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
    	  }

    	  var templateRe = /\{ *([\w_ -]+) *\}/g;

    	  // @function template(str: String, data: Object): String
    	  // Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
    	  // and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
    	  // `('Hello foo, bar')`. You can also specify functions instead of strings for
    	  // data values — they will be evaluated passing `data` as an argument.
    	  function template(str, data) {
    	  	return str.replace(templateRe, function (str, key) {
    	  		var value = data[key];

    	  		if (value === undefined) {
    	  			throw new Error('No value provided for variable ' + str);

    	  		} else if (typeof value === 'function') {
    	  			value = value(data);
    	  		}
    	  		return value;
    	  	});
    	  }

    	  // @function isArray(obj): Boolean
    	  // Compatibility polyfill for [Array.isArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
    	  var isArray = Array.isArray || function (obj) {
    	  	return (Object.prototype.toString.call(obj) === '[object Array]');
    	  };

    	  // @function indexOf(array: Array, el: Object): Number
    	  // Compatibility polyfill for [Array.prototype.indexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
    	  function indexOf(array, el) {
    	  	for (var i = 0; i < array.length; i++) {
    	  		if (array[i] === el) { return i; }
    	  	}
    	  	return -1;
    	  }

    	  // @property emptyImageUrl: String
    	  // Data URI string containing a base64-encoded empty GIF image.
    	  // Used as a hack to free memory from unused images on WebKit-powered
    	  // mobile devices (by setting image `src` to this string).
    	  var emptyImageUrl = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

    	  // inspired by https://paulirish.com/2011/requestanimationframe-for-smart-animating/

    	  function getPrefixed(name) {
    	  	return window['webkit' + name] || window['moz' + name] || window['ms' + name];
    	  }

    	  var lastTime = 0;

    	  // fallback for IE 7-8
    	  function timeoutDefer(fn) {
    	  	var time = +new Date(),
    	  	    timeToCall = Math.max(0, 16 - (time - lastTime));

    	  	lastTime = time + timeToCall;
    	  	return window.setTimeout(fn, timeToCall);
    	  }

    	  var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame') || timeoutDefer;
    	  var cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') ||
    	  		getPrefixed('CancelRequestAnimationFrame') || function (id) { window.clearTimeout(id); };

    	  // @function requestAnimFrame(fn: Function, context?: Object, immediate?: Boolean): Number
    	  // Schedules `fn` to be executed when the browser repaints. `fn` is bound to
    	  // `context` if given. When `immediate` is set, `fn` is called immediately if
    	  // the browser doesn't have native support for
    	  // [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),
    	  // otherwise it's delayed. Returns a request ID that can be used to cancel the request.
    	  function requestAnimFrame(fn, context, immediate) {
    	  	if (immediate && requestFn === timeoutDefer) {
    	  		fn.call(context);
    	  	} else {
    	  		return requestFn.call(window, bind(fn, context));
    	  	}
    	  }

    	  // @function cancelAnimFrame(id: Number): undefined
    	  // Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
    	  function cancelAnimFrame(id) {
    	  	if (id) {
    	  		cancelFn.call(window, id);
    	  	}
    	  }

    	  var Util = {
    	    __proto__: null,
    	    extend: extend,
    	    create: create$2,
    	    bind: bind,
    	    get lastId () { return lastId; },
    	    stamp: stamp,
    	    throttle: throttle,
    	    wrapNum: wrapNum,
    	    falseFn: falseFn,
    	    formatNum: formatNum,
    	    trim: trim,
    	    splitWords: splitWords,
    	    setOptions: setOptions,
    	    getParamString: getParamString,
    	    template: template,
    	    isArray: isArray,
    	    indexOf: indexOf,
    	    emptyImageUrl: emptyImageUrl,
    	    requestFn: requestFn,
    	    cancelFn: cancelFn,
    	    requestAnimFrame: requestAnimFrame,
    	    cancelAnimFrame: cancelAnimFrame
    	  };

    	  // @class Class
    	  // @aka L.Class

    	  // @section
    	  // @uninheritable

    	  // Thanks to John Resig and Dean Edwards for inspiration!

    	  function Class() {}

    	  Class.extend = function (props) {

    	  	// @function extend(props: Object): Function
    	  	// [Extends the current class](#class-inheritance) given the properties to be included.
    	  	// Returns a Javascript function that is a class constructor (to be called with `new`).
    	  	var NewClass = function () {

    	  		setOptions(this);

    	  		// call the constructor
    	  		if (this.initialize) {
    	  			this.initialize.apply(this, arguments);
    	  		}

    	  		// call all constructor hooks
    	  		this.callInitHooks();
    	  	};

    	  	var parentProto = NewClass.__super__ = this.prototype;

    	  	var proto = create$2(parentProto);
    	  	proto.constructor = NewClass;

    	  	NewClass.prototype = proto;

    	  	// inherit parent's statics
    	  	for (var i in this) {
    	  		if (Object.prototype.hasOwnProperty.call(this, i) && i !== 'prototype' && i !== '__super__') {
    	  			NewClass[i] = this[i];
    	  		}
    	  	}

    	  	// mix static properties into the class
    	  	if (props.statics) {
    	  		extend(NewClass, props.statics);
    	  	}

    	  	// mix includes into the prototype
    	  	if (props.includes) {
    	  		checkDeprecatedMixinEvents(props.includes);
    	  		extend.apply(null, [proto].concat(props.includes));
    	  	}

    	  	// mix given properties into the prototype
    	  	extend(proto, props);
    	  	delete proto.statics;
    	  	delete proto.includes;

    	  	// merge options
    	  	if (proto.options) {
    	  		proto.options = parentProto.options ? create$2(parentProto.options) : {};
    	  		extend(proto.options, props.options);
    	  	}

    	  	proto._initHooks = [];

    	  	// add method for calling all hooks
    	  	proto.callInitHooks = function () {

    	  		if (this._initHooksCalled) { return; }

    	  		if (parentProto.callInitHooks) {
    	  			parentProto.callInitHooks.call(this);
    	  		}

    	  		this._initHooksCalled = true;

    	  		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
    	  			proto._initHooks[i].call(this);
    	  		}
    	  	};

    	  	return NewClass;
    	  };


    	  // @function include(properties: Object): this
    	  // [Includes a mixin](#class-includes) into the current class.
    	  Class.include = function (props) {
    	  	var parentOptions = this.prototype.options;
    	  	extend(this.prototype, props);
    	  	if (props.options) {
    	  		this.prototype.options = parentOptions;
    	  		this.mergeOptions(props.options);
    	  	}
    	  	return this;
    	  };

    	  // @function mergeOptions(options: Object): this
    	  // [Merges `options`](#class-options) into the defaults of the class.
    	  Class.mergeOptions = function (options) {
    	  	extend(this.prototype.options, options);
    	  	return this;
    	  };

    	  // @function addInitHook(fn: Function): this
    	  // Adds a [constructor hook](#class-constructor-hooks) to the class.
    	  Class.addInitHook = function (fn) { // (Function) || (String, args...)
    	  	var args = Array.prototype.slice.call(arguments, 1);

    	  	var init = typeof fn === 'function' ? fn : function () {
    	  		this[fn].apply(this, args);
    	  	};

    	  	this.prototype._initHooks = this.prototype._initHooks || [];
    	  	this.prototype._initHooks.push(init);
    	  	return this;
    	  };

    	  function checkDeprecatedMixinEvents(includes) {
    	  	if (typeof L === 'undefined' || !L || !L.Mixin) { return; }

    	  	includes = isArray(includes) ? includes : [includes];

    	  	for (var i = 0; i < includes.length; i++) {
    	  		if (includes[i] === L.Mixin.Events) {
    	  			console.warn('Deprecated include of L.Mixin.Events: ' +
    	  				'this property will be removed in future releases, ' +
    	  				'please inherit from L.Evented instead.', new Error().stack);
    	  		}
    	  	}
    	  }

    	  /*
    	   * @class Evented
    	   * @aka L.Evented
    	   * @inherits Class
    	   *
    	   * A set of methods shared between event-powered classes (like `Map` and `Marker`). Generally, events allow you to execute some function when something happens with an object (e.g. the user clicks on the map, causing the map to fire `'click'` event).
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * map.on('click', function(e) {
    	   * 	alert(e.latlng);
    	   * } );
    	   * ```
    	   *
    	   * Leaflet deals with event listeners by reference, so if you want to add a listener and then remove it, define it as a function:
    	   *
    	   * ```js
    	   * function onClick(e) { ... }
    	   *
    	   * map.on('click', onClick);
    	   * map.off('click', onClick);
    	   * ```
    	   */

    	  var Events = {
    	  	/* @method on(type: String, fn: Function, context?: Object): this
    	  	 * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
    	  	 *
    	  	 * @alternative
    	  	 * @method on(eventMap: Object): this
    	  	 * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
    	  	 */
    	  	on: function (types, fn, context) {

    	  		// types can be a map of types/handlers
    	  		if (typeof types === 'object') {
    	  			for (var type in types) {
    	  				// we don't process space-separated events here for performance;
    	  				// it's a hot path since Layer uses the on(obj) syntax
    	  				this._on(type, types[type], fn);
    	  			}

    	  		} else {
    	  			// types can be a string of space-separated words
    	  			types = splitWords(types);

    	  			for (var i = 0, len = types.length; i < len; i++) {
    	  				this._on(types[i], fn, context);
    	  			}
    	  		}

    	  		return this;
    	  	},

    	  	/* @method off(type: String, fn?: Function, context?: Object): this
    	  	 * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
    	  	 *
    	  	 * @alternative
    	  	 * @method off(eventMap: Object): this
    	  	 * Removes a set of type/listener pairs.
    	  	 *
    	  	 * @alternative
    	  	 * @method off: this
    	  	 * Removes all listeners to all events on the object. This includes implicitly attached events.
    	  	 */
    	  	off: function (types, fn, context) {

    	  		if (!arguments.length) {
    	  			// clear all listeners if called without arguments
    	  			delete this._events;

    	  		} else if (typeof types === 'object') {
    	  			for (var type in types) {
    	  				this._off(type, types[type], fn);
    	  			}

    	  		} else {
    	  			types = splitWords(types);

    	  			var removeAll = arguments.length === 1;
    	  			for (var i = 0, len = types.length; i < len; i++) {
    	  				if (removeAll) {
    	  					this._off(types[i]);
    	  				} else {
    	  					this._off(types[i], fn, context);
    	  				}
    	  			}
    	  		}

    	  		return this;
    	  	},

    	  	// attach listener (without syntactic sugar now)
    	  	_on: function (type, fn, context, _once) {
    	  		if (typeof fn !== 'function') {
    	  			console.warn('wrong listener type: ' + typeof fn);
    	  			return;
    	  		}

    	  		// check if fn already there
    	  		if (this._listens(type, fn, context) !== false) {
    	  			return;
    	  		}

    	  		if (context === this) {
    	  			// Less memory footprint.
    	  			context = undefined;
    	  		}

    	  		var newListener = {fn: fn, ctx: context};
    	  		if (_once) {
    	  			newListener.once = true;
    	  		}

    	  		this._events = this._events || {};
    	  		this._events[type] = this._events[type] || [];
    	  		this._events[type].push(newListener);
    	  	},

    	  	_off: function (type, fn, context) {
    	  		var listeners,
    	  		    i,
    	  		    len;

    	  		if (!this._events) {
    	  			return;
    	  		}

    	  		listeners = this._events[type];
    	  		if (!listeners) {
    	  			return;
    	  		}

    	  		if (arguments.length === 1) { // remove all
    	  			if (this._firingCount) {
    	  				// Set all removed listeners to noop
    	  				// so they are not called if remove happens in fire
    	  				for (i = 0, len = listeners.length; i < len; i++) {
    	  					listeners[i].fn = falseFn;
    	  				}
    	  			}
    	  			// clear all listeners for a type if function isn't specified
    	  			delete this._events[type];
    	  			return;
    	  		}

    	  		if (typeof fn !== 'function') {
    	  			console.warn('wrong listener type: ' + typeof fn);
    	  			return;
    	  		}

    	  		// find fn and remove it
    	  		var index = this._listens(type, fn, context);
    	  		if (index !== false) {
    	  			var listener = listeners[index];
    	  			if (this._firingCount) {
    	  				// set the removed listener to noop so that's not called if remove happens in fire
    	  				listener.fn = falseFn;

    	  				/* copy array in case events are being fired */
    	  				this._events[type] = listeners = listeners.slice();
    	  			}
    	  			listeners.splice(index, 1);
    	  		}
    	  	},

    	  	// @method fire(type: String, data?: Object, propagate?: Boolean): this
    	  	// Fires an event of the specified type. You can optionally provide a data
    	  	// object — the first argument of the listener function will contain its
    	  	// properties. The event can optionally be propagated to event parents.
    	  	fire: function (type, data, propagate) {
    	  		if (!this.listens(type, propagate)) { return this; }

    	  		var event = extend({}, data, {
    	  			type: type,
    	  			target: this,
    	  			sourceTarget: data && data.sourceTarget || this
    	  		});

    	  		if (this._events) {
    	  			var listeners = this._events[type];
    	  			if (listeners) {
    	  				this._firingCount = (this._firingCount + 1) || 1;
    	  				for (var i = 0, len = listeners.length; i < len; i++) {
    	  					var l = listeners[i];
    	  					// off overwrites l.fn, so we need to copy fn to a var
    	  					var fn = l.fn;
    	  					if (l.once) {
    	  						this.off(type, fn, l.ctx);
    	  					}
    	  					fn.call(l.ctx || this, event);
    	  				}

    	  				this._firingCount--;
    	  			}
    	  		}

    	  		if (propagate) {
    	  			// propagate the event to parents (set with addEventParent)
    	  			this._propagateEvent(event);
    	  		}

    	  		return this;
    	  	},

    	  	// @method listens(type: String, propagate?: Boolean): Boolean
    	  	// @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
    	  	// Returns `true` if a particular event type has any listeners attached to it.
    	  	// The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
    	  	listens: function (type, fn, context, propagate) {
    	  		if (typeof type !== 'string') {
    	  			console.warn('"string" type argument expected');
    	  		}

    	  		// we don't overwrite the input `fn` value, because we need to use it for propagation
    	  		var _fn = fn;
    	  		if (typeof fn !== 'function') {
    	  			propagate = !!fn;
    	  			_fn = undefined;
    	  			context = undefined;
    	  		}

    	  		var listeners = this._events && this._events[type];
    	  		if (listeners && listeners.length) {
    	  			if (this._listens(type, _fn, context) !== false) {
    	  				return true;
    	  			}
    	  		}

    	  		if (propagate) {
    	  			// also check parents for listeners if event propagates
    	  			for (var id in this._eventParents) {
    	  				if (this._eventParents[id].listens(type, fn, context, propagate)) { return true; }
    	  			}
    	  		}
    	  		return false;
    	  	},

    	  	// returns the index (number) or false
    	  	_listens: function (type, fn, context) {
    	  		if (!this._events) {
    	  			return false;
    	  		}

    	  		var listeners = this._events[type] || [];
    	  		if (!fn) {
    	  			return !!listeners.length;
    	  		}

    	  		if (context === this) {
    	  			// Less memory footprint.
    	  			context = undefined;
    	  		}

    	  		for (var i = 0, len = listeners.length; i < len; i++) {
    	  			if (listeners[i].fn === fn && listeners[i].ctx === context) {
    	  				return i;
    	  			}
    	  		}
    	  		return false;

    	  	},

    	  	// @method once(…): this
    	  	// Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
    	  	once: function (types, fn, context) {

    	  		// types can be a map of types/handlers
    	  		if (typeof types === 'object') {
    	  			for (var type in types) {
    	  				// we don't process space-separated events here for performance;
    	  				// it's a hot path since Layer uses the on(obj) syntax
    	  				this._on(type, types[type], fn, true);
    	  			}

    	  		} else {
    	  			// types can be a string of space-separated words
    	  			types = splitWords(types);

    	  			for (var i = 0, len = types.length; i < len; i++) {
    	  				this._on(types[i], fn, context, true);
    	  			}
    	  		}

    	  		return this;
    	  	},

    	  	// @method addEventParent(obj: Evented): this
    	  	// Adds an event parent - an `Evented` that will receive propagated events
    	  	addEventParent: function (obj) {
    	  		this._eventParents = this._eventParents || {};
    	  		this._eventParents[stamp(obj)] = obj;
    	  		return this;
    	  	},

    	  	// @method removeEventParent(obj: Evented): this
    	  	// Removes an event parent, so it will stop receiving propagated events
    	  	removeEventParent: function (obj) {
    	  		if (this._eventParents) {
    	  			delete this._eventParents[stamp(obj)];
    	  		}
    	  		return this;
    	  	},

    	  	_propagateEvent: function (e) {
    	  		for (var id in this._eventParents) {
    	  			this._eventParents[id].fire(e.type, extend({
    	  				layer: e.target,
    	  				propagatedFrom: e.target
    	  			}, e), true);
    	  		}
    	  	}
    	  };

    	  // aliases; we should ditch those eventually

    	  // @method addEventListener(…): this
    	  // Alias to [`on(…)`](#evented-on)
    	  Events.addEventListener = Events.on;

    	  // @method removeEventListener(…): this
    	  // Alias to [`off(…)`](#evented-off)

    	  // @method clearAllEventListeners(…): this
    	  // Alias to [`off()`](#evented-off)
    	  Events.removeEventListener = Events.clearAllEventListeners = Events.off;

    	  // @method addOneTimeEventListener(…): this
    	  // Alias to [`once(…)`](#evented-once)
    	  Events.addOneTimeEventListener = Events.once;

    	  // @method fireEvent(…): this
    	  // Alias to [`fire(…)`](#evented-fire)
    	  Events.fireEvent = Events.fire;

    	  // @method hasEventListeners(…): Boolean
    	  // Alias to [`listens(…)`](#evented-listens)
    	  Events.hasEventListeners = Events.listens;

    	  var Evented = Class.extend(Events);

    	  /*
    	   * @class Point
    	   * @aka L.Point
    	   *
    	   * Represents a point with `x` and `y` coordinates in pixels.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * var point = L.point(200, 300);
    	   * ```
    	   *
    	   * All Leaflet methods and options that accept `Point` objects also accept them in a simple Array form (unless noted otherwise), so these lines are equivalent:
    	   *
    	   * ```js
    	   * map.panBy([200, 300]);
    	   * map.panBy(L.point(200, 300));
    	   * ```
    	   *
    	   * Note that `Point` does not inherit from Leaflet's `Class` object,
    	   * which means new classes can't inherit from it, and new methods
    	   * can't be added to it with the `include` function.
    	   */

    	  function Point(x, y, round) {
    	  	// @property x: Number; The `x` coordinate of the point
    	  	this.x = (round ? Math.round(x) : x);
    	  	// @property y: Number; The `y` coordinate of the point
    	  	this.y = (round ? Math.round(y) : y);
    	  }

    	  var trunc = Math.trunc || function (v) {
    	  	return v > 0 ? Math.floor(v) : Math.ceil(v);
    	  };

    	  Point.prototype = {

    	  	// @method clone(): Point
    	  	// Returns a copy of the current point.
    	  	clone: function () {
    	  		return new Point(this.x, this.y);
    	  	},

    	  	// @method add(otherPoint: Point): Point
    	  	// Returns the result of addition of the current and the given points.
    	  	add: function (point) {
    	  		// non-destructive, returns a new point
    	  		return this.clone()._add(toPoint(point));
    	  	},

    	  	_add: function (point) {
    	  		// destructive, used directly for performance in situations where it's safe to modify existing point
    	  		this.x += point.x;
    	  		this.y += point.y;
    	  		return this;
    	  	},

    	  	// @method subtract(otherPoint: Point): Point
    	  	// Returns the result of subtraction of the given point from the current.
    	  	subtract: function (point) {
    	  		return this.clone()._subtract(toPoint(point));
    	  	},

    	  	_subtract: function (point) {
    	  		this.x -= point.x;
    	  		this.y -= point.y;
    	  		return this;
    	  	},

    	  	// @method divideBy(num: Number): Point
    	  	// Returns the result of division of the current point by the given number.
    	  	divideBy: function (num) {
    	  		return this.clone()._divideBy(num);
    	  	},

    	  	_divideBy: function (num) {
    	  		this.x /= num;
    	  		this.y /= num;
    	  		return this;
    	  	},

    	  	// @method multiplyBy(num: Number): Point
    	  	// Returns the result of multiplication of the current point by the given number.
    	  	multiplyBy: function (num) {
    	  		return this.clone()._multiplyBy(num);
    	  	},

    	  	_multiplyBy: function (num) {
    	  		this.x *= num;
    	  		this.y *= num;
    	  		return this;
    	  	},

    	  	// @method scaleBy(scale: Point): Point
    	  	// Multiply each coordinate of the current point by each coordinate of
    	  	// `scale`. In linear algebra terms, multiply the point by the
    	  	// [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
    	  	// defined by `scale`.
    	  	scaleBy: function (point) {
    	  		return new Point(this.x * point.x, this.y * point.y);
    	  	},

    	  	// @method unscaleBy(scale: Point): Point
    	  	// Inverse of `scaleBy`. Divide each coordinate of the current point by
    	  	// each coordinate of `scale`.
    	  	unscaleBy: function (point) {
    	  		return new Point(this.x / point.x, this.y / point.y);
    	  	},

    	  	// @method round(): Point
    	  	// Returns a copy of the current point with rounded coordinates.
    	  	round: function () {
    	  		return this.clone()._round();
    	  	},

    	  	_round: function () {
    	  		this.x = Math.round(this.x);
    	  		this.y = Math.round(this.y);
    	  		return this;
    	  	},

    	  	// @method floor(): Point
    	  	// Returns a copy of the current point with floored coordinates (rounded down).
    	  	floor: function () {
    	  		return this.clone()._floor();
    	  	},

    	  	_floor: function () {
    	  		this.x = Math.floor(this.x);
    	  		this.y = Math.floor(this.y);
    	  		return this;
    	  	},

    	  	// @method ceil(): Point
    	  	// Returns a copy of the current point with ceiled coordinates (rounded up).
    	  	ceil: function () {
    	  		return this.clone()._ceil();
    	  	},

    	  	_ceil: function () {
    	  		this.x = Math.ceil(this.x);
    	  		this.y = Math.ceil(this.y);
    	  		return this;
    	  	},

    	  	// @method trunc(): Point
    	  	// Returns a copy of the current point with truncated coordinates (rounded towards zero).
    	  	trunc: function () {
    	  		return this.clone()._trunc();
    	  	},

    	  	_trunc: function () {
    	  		this.x = trunc(this.x);
    	  		this.y = trunc(this.y);
    	  		return this;
    	  	},

    	  	// @method distanceTo(otherPoint: Point): Number
    	  	// Returns the cartesian distance between the current and the given points.
    	  	distanceTo: function (point) {
    	  		point = toPoint(point);

    	  		var x = point.x - this.x,
    	  		    y = point.y - this.y;

    	  		return Math.sqrt(x * x + y * y);
    	  	},

    	  	// @method equals(otherPoint: Point): Boolean
    	  	// Returns `true` if the given point has the same coordinates.
    	  	equals: function (point) {
    	  		point = toPoint(point);

    	  		return point.x === this.x &&
    	  		       point.y === this.y;
    	  	},

    	  	// @method contains(otherPoint: Point): Boolean
    	  	// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
    	  	contains: function (point) {
    	  		point = toPoint(point);

    	  		return Math.abs(point.x) <= Math.abs(this.x) &&
    	  		       Math.abs(point.y) <= Math.abs(this.y);
    	  	},

    	  	// @method toString(): String
    	  	// Returns a string representation of the point for debugging purposes.
    	  	toString: function () {
    	  		return 'Point(' +
    	  		        formatNum(this.x) + ', ' +
    	  		        formatNum(this.y) + ')';
    	  	}
    	  };

    	  // @factory L.point(x: Number, y: Number, round?: Boolean)
    	  // Creates a Point object with the given `x` and `y` coordinates. If optional `round` is set to true, rounds the `x` and `y` values.

    	  // @alternative
    	  // @factory L.point(coords: Number[])
    	  // Expects an array of the form `[x, y]` instead.

    	  // @alternative
    	  // @factory L.point(coords: Object)
    	  // Expects a plain object of the form `{x: Number, y: Number}` instead.
    	  function toPoint(x, y, round) {
    	  	if (x instanceof Point) {
    	  		return x;
    	  	}
    	  	if (isArray(x)) {
    	  		return new Point(x[0], x[1]);
    	  	}
    	  	if (x === undefined || x === null) {
    	  		return x;
    	  	}
    	  	if (typeof x === 'object' && 'x' in x && 'y' in x) {
    	  		return new Point(x.x, x.y);
    	  	}
    	  	return new Point(x, y, round);
    	  }

    	  /*
    	   * @class Bounds
    	   * @aka L.Bounds
    	   *
    	   * Represents a rectangular area in pixel coordinates.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * var p1 = L.point(10, 10),
    	   * p2 = L.point(40, 60),
    	   * bounds = L.bounds(p1, p2);
    	   * ```
    	   *
    	   * All Leaflet methods that accept `Bounds` objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
    	   *
    	   * ```js
    	   * otherBounds.intersects([[10, 10], [40, 60]]);
    	   * ```
    	   *
    	   * Note that `Bounds` does not inherit from Leaflet's `Class` object,
    	   * which means new classes can't inherit from it, and new methods
    	   * can't be added to it with the `include` function.
    	   */

    	  function Bounds(a, b) {
    	  	if (!a) { return; }

    	  	var points = b ? [a, b] : a;

    	  	for (var i = 0, len = points.length; i < len; i++) {
    	  		this.extend(points[i]);
    	  	}
    	  }

    	  Bounds.prototype = {
    	  	// @method extend(point: Point): this
    	  	// Extends the bounds to contain the given point.

    	  	// @alternative
    	  	// @method extend(otherBounds: Bounds): this
    	  	// Extend the bounds to contain the given bounds
    	  	extend: function (obj) {
    	  		var min2, max2;
    	  		if (!obj) { return this; }

    	  		if (obj instanceof Point || typeof obj[0] === 'number' || 'x' in obj) {
    	  			min2 = max2 = toPoint(obj);
    	  		} else {
    	  			obj = toBounds(obj);
    	  			min2 = obj.min;
    	  			max2 = obj.max;

    	  			if (!min2 || !max2) { return this; }
    	  		}

    	  		// @property min: Point
    	  		// The top left corner of the rectangle.
    	  		// @property max: Point
    	  		// The bottom right corner of the rectangle.
    	  		if (!this.min && !this.max) {
    	  			this.min = min2.clone();
    	  			this.max = max2.clone();
    	  		} else {
    	  			this.min.x = Math.min(min2.x, this.min.x);
    	  			this.max.x = Math.max(max2.x, this.max.x);
    	  			this.min.y = Math.min(min2.y, this.min.y);
    	  			this.max.y = Math.max(max2.y, this.max.y);
    	  		}
    	  		return this;
    	  	},

    	  	// @method getCenter(round?: Boolean): Point
    	  	// Returns the center point of the bounds.
    	  	getCenter: function (round) {
    	  		return toPoint(
    	  		        (this.min.x + this.max.x) / 2,
    	  		        (this.min.y + this.max.y) / 2, round);
    	  	},

    	  	// @method getBottomLeft(): Point
    	  	// Returns the bottom-left point of the bounds.
    	  	getBottomLeft: function () {
    	  		return toPoint(this.min.x, this.max.y);
    	  	},

    	  	// @method getTopRight(): Point
    	  	// Returns the top-right point of the bounds.
    	  	getTopRight: function () { // -> Point
    	  		return toPoint(this.max.x, this.min.y);
    	  	},

    	  	// @method getTopLeft(): Point
    	  	// Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
    	  	getTopLeft: function () {
    	  		return this.min; // left, top
    	  	},

    	  	// @method getBottomRight(): Point
    	  	// Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
    	  	getBottomRight: function () {
    	  		return this.max; // right, bottom
    	  	},

    	  	// @method getSize(): Point
    	  	// Returns the size of the given bounds
    	  	getSize: function () {
    	  		return this.max.subtract(this.min);
    	  	},

    	  	// @method contains(otherBounds: Bounds): Boolean
    	  	// Returns `true` if the rectangle contains the given one.
    	  	// @alternative
    	  	// @method contains(point: Point): Boolean
    	  	// Returns `true` if the rectangle contains the given point.
    	  	contains: function (obj) {
    	  		var min, max;

    	  		if (typeof obj[0] === 'number' || obj instanceof Point) {
    	  			obj = toPoint(obj);
    	  		} else {
    	  			obj = toBounds(obj);
    	  		}

    	  		if (obj instanceof Bounds) {
    	  			min = obj.min;
    	  			max = obj.max;
    	  		} else {
    	  			min = max = obj;
    	  		}

    	  		return (min.x >= this.min.x) &&
    	  		       (max.x <= this.max.x) &&
    	  		       (min.y >= this.min.y) &&
    	  		       (max.y <= this.max.y);
    	  	},

    	  	// @method intersects(otherBounds: Bounds): Boolean
    	  	// Returns `true` if the rectangle intersects the given bounds. Two bounds
    	  	// intersect if they have at least one point in common.
    	  	intersects: function (bounds) { // (Bounds) -> Boolean
    	  		bounds = toBounds(bounds);

    	  		var min = this.min,
    	  		    max = this.max,
    	  		    min2 = bounds.min,
    	  		    max2 = bounds.max,
    	  		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
    	  		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

    	  		return xIntersects && yIntersects;
    	  	},

    	  	// @method overlaps(otherBounds: Bounds): Boolean
    	  	// Returns `true` if the rectangle overlaps the given bounds. Two bounds
    	  	// overlap if their intersection is an area.
    	  	overlaps: function (bounds) { // (Bounds) -> Boolean
    	  		bounds = toBounds(bounds);

    	  		var min = this.min,
    	  		    max = this.max,
    	  		    min2 = bounds.min,
    	  		    max2 = bounds.max,
    	  		    xOverlaps = (max2.x > min.x) && (min2.x < max.x),
    	  		    yOverlaps = (max2.y > min.y) && (min2.y < max.y);

    	  		return xOverlaps && yOverlaps;
    	  	},

    	  	// @method isValid(): Boolean
    	  	// Returns `true` if the bounds are properly initialized.
    	  	isValid: function () {
    	  		return !!(this.min && this.max);
    	  	},


    	  	// @method pad(bufferRatio: Number): Bounds
    	  	// Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
    	  	// For example, a ratio of 0.5 extends the bounds by 50% in each direction.
    	  	// Negative values will retract the bounds.
    	  	pad: function (bufferRatio) {
    	  		var min = this.min,
    	  		max = this.max,
    	  		heightBuffer = Math.abs(min.x - max.x) * bufferRatio,
    	  		widthBuffer = Math.abs(min.y - max.y) * bufferRatio;


    	  		return toBounds(
    	  			toPoint(min.x - heightBuffer, min.y - widthBuffer),
    	  			toPoint(max.x + heightBuffer, max.y + widthBuffer));
    	  	},


    	  	// @method equals(otherBounds: Bounds): Boolean
    	  	// Returns `true` if the rectangle is equivalent to the given bounds.
    	  	equals: function (bounds) {
    	  		if (!bounds) { return false; }

    	  		bounds = toBounds(bounds);

    	  		return this.min.equals(bounds.getTopLeft()) &&
    	  			this.max.equals(bounds.getBottomRight());
    	  	},
    	  };


    	  // @factory L.bounds(corner1: Point, corner2: Point)
    	  // Creates a Bounds object from two corners coordinate pairs.
    	  // @alternative
    	  // @factory L.bounds(points: Point[])
    	  // Creates a Bounds object from the given array of points.
    	  function toBounds(a, b) {
    	  	if (!a || a instanceof Bounds) {
    	  		return a;
    	  	}
    	  	return new Bounds(a, b);
    	  }

    	  /*
    	   * @class LatLngBounds
    	   * @aka L.LatLngBounds
    	   *
    	   * Represents a rectangular geographical area on a map.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * var corner1 = L.latLng(40.712, -74.227),
    	   * corner2 = L.latLng(40.774, -74.125),
    	   * bounds = L.latLngBounds(corner1, corner2);
    	   * ```
    	   *
    	   * All Leaflet methods that accept LatLngBounds objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
    	   *
    	   * ```js
    	   * map.fitBounds([
    	   * 	[40.712, -74.227],
    	   * 	[40.774, -74.125]
    	   * ]);
    	   * ```
    	   *
    	   * Caution: if the area crosses the antimeridian (often confused with the International Date Line), you must specify corners _outside_ the [-180, 180] degrees longitude range.
    	   *
    	   * Note that `LatLngBounds` does not inherit from Leaflet's `Class` object,
    	   * which means new classes can't inherit from it, and new methods
    	   * can't be added to it with the `include` function.
    	   */

    	  function LatLngBounds(corner1, corner2) { // (LatLng, LatLng) or (LatLng[])
    	  	if (!corner1) { return; }

    	  	var latlngs = corner2 ? [corner1, corner2] : corner1;

    	  	for (var i = 0, len = latlngs.length; i < len; i++) {
    	  		this.extend(latlngs[i]);
    	  	}
    	  }

    	  LatLngBounds.prototype = {

    	  	// @method extend(latlng: LatLng): this
    	  	// Extend the bounds to contain the given point

    	  	// @alternative
    	  	// @method extend(otherBounds: LatLngBounds): this
    	  	// Extend the bounds to contain the given bounds
    	  	extend: function (obj) {
    	  		var sw = this._southWest,
    	  		    ne = this._northEast,
    	  		    sw2, ne2;

    	  		if (obj instanceof LatLng) {
    	  			sw2 = obj;
    	  			ne2 = obj;

    	  		} else if (obj instanceof LatLngBounds) {
    	  			sw2 = obj._southWest;
    	  			ne2 = obj._northEast;

    	  			if (!sw2 || !ne2) { return this; }

    	  		} else {
    	  			return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
    	  		}

    	  		if (!sw && !ne) {
    	  			this._southWest = new LatLng(sw2.lat, sw2.lng);
    	  			this._northEast = new LatLng(ne2.lat, ne2.lng);
    	  		} else {
    	  			sw.lat = Math.min(sw2.lat, sw.lat);
    	  			sw.lng = Math.min(sw2.lng, sw.lng);
    	  			ne.lat = Math.max(ne2.lat, ne.lat);
    	  			ne.lng = Math.max(ne2.lng, ne.lng);
    	  		}

    	  		return this;
    	  	},

    	  	// @method pad(bufferRatio: Number): LatLngBounds
    	  	// Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
    	  	// For example, a ratio of 0.5 extends the bounds by 50% in each direction.
    	  	// Negative values will retract the bounds.
    	  	pad: function (bufferRatio) {
    	  		var sw = this._southWest,
    	  		    ne = this._northEast,
    	  		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
    	  		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

    	  		return new LatLngBounds(
    	  		        new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
    	  		        new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
    	  	},

    	  	// @method getCenter(): LatLng
    	  	// Returns the center point of the bounds.
    	  	getCenter: function () {
    	  		return new LatLng(
    	  		        (this._southWest.lat + this._northEast.lat) / 2,
    	  		        (this._southWest.lng + this._northEast.lng) / 2);
    	  	},

    	  	// @method getSouthWest(): LatLng
    	  	// Returns the south-west point of the bounds.
    	  	getSouthWest: function () {
    	  		return this._southWest;
    	  	},

    	  	// @method getNorthEast(): LatLng
    	  	// Returns the north-east point of the bounds.
    	  	getNorthEast: function () {
    	  		return this._northEast;
    	  	},

    	  	// @method getNorthWest(): LatLng
    	  	// Returns the north-west point of the bounds.
    	  	getNorthWest: function () {
    	  		return new LatLng(this.getNorth(), this.getWest());
    	  	},

    	  	// @method getSouthEast(): LatLng
    	  	// Returns the south-east point of the bounds.
    	  	getSouthEast: function () {
    	  		return new LatLng(this.getSouth(), this.getEast());
    	  	},

    	  	// @method getWest(): Number
    	  	// Returns the west longitude of the bounds
    	  	getWest: function () {
    	  		return this._southWest.lng;
    	  	},

    	  	// @method getSouth(): Number
    	  	// Returns the south latitude of the bounds
    	  	getSouth: function () {
    	  		return this._southWest.lat;
    	  	},

    	  	// @method getEast(): Number
    	  	// Returns the east longitude of the bounds
    	  	getEast: function () {
    	  		return this._northEast.lng;
    	  	},

    	  	// @method getNorth(): Number
    	  	// Returns the north latitude of the bounds
    	  	getNorth: function () {
    	  		return this._northEast.lat;
    	  	},

    	  	// @method contains(otherBounds: LatLngBounds): Boolean
    	  	// Returns `true` if the rectangle contains the given one.

    	  	// @alternative
    	  	// @method contains (latlng: LatLng): Boolean
    	  	// Returns `true` if the rectangle contains the given point.
    	  	contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
    	  		if (typeof obj[0] === 'number' || obj instanceof LatLng || 'lat' in obj) {
    	  			obj = toLatLng(obj);
    	  		} else {
    	  			obj = toLatLngBounds(obj);
    	  		}

    	  		var sw = this._southWest,
    	  		    ne = this._northEast,
    	  		    sw2, ne2;

    	  		if (obj instanceof LatLngBounds) {
    	  			sw2 = obj.getSouthWest();
    	  			ne2 = obj.getNorthEast();
    	  		} else {
    	  			sw2 = ne2 = obj;
    	  		}

    	  		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
    	  		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
    	  	},

    	  	// @method intersects(otherBounds: LatLngBounds): Boolean
    	  	// Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
    	  	intersects: function (bounds) {
    	  		bounds = toLatLngBounds(bounds);

    	  		var sw = this._southWest,
    	  		    ne = this._northEast,
    	  		    sw2 = bounds.getSouthWest(),
    	  		    ne2 = bounds.getNorthEast(),

    	  		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
    	  		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

    	  		return latIntersects && lngIntersects;
    	  	},

    	  	// @method overlaps(otherBounds: LatLngBounds): Boolean
    	  	// Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
    	  	overlaps: function (bounds) {
    	  		bounds = toLatLngBounds(bounds);

    	  		var sw = this._southWest,
    	  		    ne = this._northEast,
    	  		    sw2 = bounds.getSouthWest(),
    	  		    ne2 = bounds.getNorthEast(),

    	  		    latOverlaps = (ne2.lat > sw.lat) && (sw2.lat < ne.lat),
    	  		    lngOverlaps = (ne2.lng > sw.lng) && (sw2.lng < ne.lng);

    	  		return latOverlaps && lngOverlaps;
    	  	},

    	  	// @method toBBoxString(): String
    	  	// Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
    	  	toBBoxString: function () {
    	  		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
    	  	},

    	  	// @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
    	  	// Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
    	  	equals: function (bounds, maxMargin) {
    	  		if (!bounds) { return false; }

    	  		bounds = toLatLngBounds(bounds);

    	  		return this._southWest.equals(bounds.getSouthWest(), maxMargin) &&
    	  		       this._northEast.equals(bounds.getNorthEast(), maxMargin);
    	  	},

    	  	// @method isValid(): Boolean
    	  	// Returns `true` if the bounds are properly initialized.
    	  	isValid: function () {
    	  		return !!(this._southWest && this._northEast);
    	  	}
    	  };

    	  // TODO International date line?

    	  // @factory L.latLngBounds(corner1: LatLng, corner2: LatLng)
    	  // Creates a `LatLngBounds` object by defining two diagonally opposite corners of the rectangle.

    	  // @alternative
    	  // @factory L.latLngBounds(latlngs: LatLng[])
    	  // Creates a `LatLngBounds` object defined by the geographical points it contains. Very useful for zooming the map to fit a particular set of locations with [`fitBounds`](#map-fitbounds).
    	  function toLatLngBounds(a, b) {
    	  	if (a instanceof LatLngBounds) {
    	  		return a;
    	  	}
    	  	return new LatLngBounds(a, b);
    	  }

    	  /* @class LatLng
    	   * @aka L.LatLng
    	   *
    	   * Represents a geographical point with a certain latitude and longitude.
    	   *
    	   * @example
    	   *
    	   * ```
    	   * var latlng = L.latLng(50.5, 30.5);
    	   * ```
    	   *
    	   * All Leaflet methods that accept LatLng objects also accept them in a simple Array form and simple object form (unless noted otherwise), so these lines are equivalent:
    	   *
    	   * ```
    	   * map.panTo([50, 30]);
    	   * map.panTo({lon: 30, lat: 50});
    	   * map.panTo({lat: 50, lng: 30});
    	   * map.panTo(L.latLng(50, 30));
    	   * ```
    	   *
    	   * Note that `LatLng` does not inherit from Leaflet's `Class` object,
    	   * which means new classes can't inherit from it, and new methods
    	   * can't be added to it with the `include` function.
    	   */

    	  function LatLng(lat, lng, alt) {
    	  	if (isNaN(lat) || isNaN(lng)) {
    	  		throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
    	  	}

    	  	// @property lat: Number
    	  	// Latitude in degrees
    	  	this.lat = +lat;

    	  	// @property lng: Number
    	  	// Longitude in degrees
    	  	this.lng = +lng;

    	  	// @property alt: Number
    	  	// Altitude in meters (optional)
    	  	if (alt !== undefined) {
    	  		this.alt = +alt;
    	  	}
    	  }

    	  LatLng.prototype = {
    	  	// @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
    	  	// Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
    	  	equals: function (obj, maxMargin) {
    	  		if (!obj) { return false; }

    	  		obj = toLatLng(obj);

    	  		var margin = Math.max(
    	  		        Math.abs(this.lat - obj.lat),
    	  		        Math.abs(this.lng - obj.lng));

    	  		return margin <= (maxMargin === undefined ? 1.0E-9 : maxMargin);
    	  	},

    	  	// @method toString(): String
    	  	// Returns a string representation of the point (for debugging purposes).
    	  	toString: function (precision) {
    	  		return 'LatLng(' +
    	  		        formatNum(this.lat, precision) + ', ' +
    	  		        formatNum(this.lng, precision) + ')';
    	  	},

    	  	// @method distanceTo(otherLatLng: LatLng): Number
    	  	// Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
    	  	distanceTo: function (other) {
    	  		return Earth.distance(this, toLatLng(other));
    	  	},

    	  	// @method wrap(): LatLng
    	  	// Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
    	  	wrap: function () {
    	  		return Earth.wrapLatLng(this);
    	  	},

    	  	// @method toBounds(sizeInMeters: Number): LatLngBounds
    	  	// Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
    	  	toBounds: function (sizeInMeters) {
    	  		var latAccuracy = 180 * sizeInMeters / 40075017,
    	  		    lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

    	  		return toLatLngBounds(
    	  		        [this.lat - latAccuracy, this.lng - lngAccuracy],
    	  		        [this.lat + latAccuracy, this.lng + lngAccuracy]);
    	  	},

    	  	clone: function () {
    	  		return new LatLng(this.lat, this.lng, this.alt);
    	  	}
    	  };



    	  // @factory L.latLng(latitude: Number, longitude: Number, altitude?: Number): LatLng
    	  // Creates an object representing a geographical point with the given latitude and longitude (and optionally altitude).

    	  // @alternative
    	  // @factory L.latLng(coords: Array): LatLng
    	  // Expects an array of the form `[Number, Number]` or `[Number, Number, Number]` instead.

    	  // @alternative
    	  // @factory L.latLng(coords: Object): LatLng
    	  // Expects an plain object of the form `{lat: Number, lng: Number}` or `{lat: Number, lng: Number, alt: Number}` instead.

    	  function toLatLng(a, b, c) {
    	  	if (a instanceof LatLng) {
    	  		return a;
    	  	}
    	  	if (isArray(a) && typeof a[0] !== 'object') {
    	  		if (a.length === 3) {
    	  			return new LatLng(a[0], a[1], a[2]);
    	  		}
    	  		if (a.length === 2) {
    	  			return new LatLng(a[0], a[1]);
    	  		}
    	  		return null;
    	  	}
    	  	if (a === undefined || a === null) {
    	  		return a;
    	  	}
    	  	if (typeof a === 'object' && 'lat' in a) {
    	  		return new LatLng(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
    	  	}
    	  	if (b === undefined) {
    	  		return null;
    	  	}
    	  	return new LatLng(a, b, c);
    	  }

    	  /*
    	   * @namespace CRS
    	   * @crs L.CRS.Base
    	   * Object that defines coordinate reference systems for projecting
    	   * geographical points into pixel (screen) coordinates and back (and to
    	   * coordinates in other units for [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services). See
    	   * [spatial reference system](https://en.wikipedia.org/wiki/Spatial_reference_system).
    	   *
    	   * Leaflet defines the most usual CRSs by default. If you want to use a
    	   * CRS not defined by default, take a look at the
    	   * [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin.
    	   *
    	   * Note that the CRS instances do not inherit from Leaflet's `Class` object,
    	   * and can't be instantiated. Also, new classes can't inherit from them,
    	   * and methods can't be added to them with the `include` function.
    	   */

    	  var CRS = {
    	  	// @method latLngToPoint(latlng: LatLng, zoom: Number): Point
    	  	// Projects geographical coordinates into pixel coordinates for a given zoom.
    	  	latLngToPoint: function (latlng, zoom) {
    	  		var projectedPoint = this.projection.project(latlng),
    	  		    scale = this.scale(zoom);

    	  		return this.transformation._transform(projectedPoint, scale);
    	  	},

    	  	// @method pointToLatLng(point: Point, zoom: Number): LatLng
    	  	// The inverse of `latLngToPoint`. Projects pixel coordinates on a given
    	  	// zoom into geographical coordinates.
    	  	pointToLatLng: function (point, zoom) {
    	  		var scale = this.scale(zoom),
    	  		    untransformedPoint = this.transformation.untransform(point, scale);

    	  		return this.projection.unproject(untransformedPoint);
    	  	},

    	  	// @method project(latlng: LatLng): Point
    	  	// Projects geographical coordinates into coordinates in units accepted for
    	  	// this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
    	  	project: function (latlng) {
    	  		return this.projection.project(latlng);
    	  	},

    	  	// @method unproject(point: Point): LatLng
    	  	// Given a projected coordinate returns the corresponding LatLng.
    	  	// The inverse of `project`.
    	  	unproject: function (point) {
    	  		return this.projection.unproject(point);
    	  	},

    	  	// @method scale(zoom: Number): Number
    	  	// Returns the scale used when transforming projected coordinates into
    	  	// pixel coordinates for a particular zoom. For example, it returns
    	  	// `256 * 2^zoom` for Mercator-based CRS.
    	  	scale: function (zoom) {
    	  		return 256 * Math.pow(2, zoom);
    	  	},

    	  	// @method zoom(scale: Number): Number
    	  	// Inverse of `scale()`, returns the zoom level corresponding to a scale
    	  	// factor of `scale`.
    	  	zoom: function (scale) {
    	  		return Math.log(scale / 256) / Math.LN2;
    	  	},

    	  	// @method getProjectedBounds(zoom: Number): Bounds
    	  	// Returns the projection's bounds scaled and transformed for the provided `zoom`.
    	  	getProjectedBounds: function (zoom) {
    	  		if (this.infinite) { return null; }

    	  		var b = this.projection.bounds,
    	  		    s = this.scale(zoom),
    	  		    min = this.transformation.transform(b.min, s),
    	  		    max = this.transformation.transform(b.max, s);

    	  		return new Bounds(min, max);
    	  	},

    	  	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
    	  	// Returns the distance between two geographical coordinates.

    	  	// @property code: String
    	  	// Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
    	  	//
    	  	// @property wrapLng: Number[]
    	  	// An array of two numbers defining whether the longitude (horizontal) coordinate
    	  	// axis wraps around a given range and how. Defaults to `[-180, 180]` in most
    	  	// geographical CRSs. If `undefined`, the longitude axis does not wrap around.
    	  	//
    	  	// @property wrapLat: Number[]
    	  	// Like `wrapLng`, but for the latitude (vertical) axis.

    	  	// wrapLng: [min, max],
    	  	// wrapLat: [min, max],

    	  	// @property infinite: Boolean
    	  	// If true, the coordinate space will be unbounded (infinite in both axes)
    	  	infinite: false,

    	  	// @method wrapLatLng(latlng: LatLng): LatLng
    	  	// Returns a `LatLng` where lat and lng has been wrapped according to the
    	  	// CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
    	  	wrapLatLng: function (latlng) {
    	  		var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng,
    	  		    lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat,
    	  		    alt = latlng.alt;

    	  		return new LatLng(lat, lng, alt);
    	  	},

    	  	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
    	  	// Returns a `LatLngBounds` with the same size as the given one, ensuring
    	  	// that its center is within the CRS's bounds.
    	  	// Only accepts actual `L.LatLngBounds` instances, not arrays.
    	  	wrapLatLngBounds: function (bounds) {
    	  		var center = bounds.getCenter(),
    	  		    newCenter = this.wrapLatLng(center),
    	  		    latShift = center.lat - newCenter.lat,
    	  		    lngShift = center.lng - newCenter.lng;

    	  		if (latShift === 0 && lngShift === 0) {
    	  			return bounds;
    	  		}

    	  		var sw = bounds.getSouthWest(),
    	  		    ne = bounds.getNorthEast(),
    	  		    newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift),
    	  		    newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);

    	  		return new LatLngBounds(newSw, newNe);
    	  	}
    	  };

    	  /*
    	   * @namespace CRS
    	   * @crs L.CRS.Earth
    	   *
    	   * Serves as the base for CRS that are global such that they cover the earth.
    	   * Can only be used as the base for other CRS and cannot be used directly,
    	   * since it does not have a `code`, `projection` or `transformation`. `distance()` returns
    	   * meters.
    	   */

    	  var Earth = extend({}, CRS, {
    	  	wrapLng: [-180, 180],

    	  	// Mean Earth Radius, as recommended for use by
    	  	// the International Union of Geodesy and Geophysics,
    	  	// see https://rosettacode.org/wiki/Haversine_formula
    	  	R: 6371000,

    	  	// distance between two geographical points using spherical law of cosines approximation
    	  	distance: function (latlng1, latlng2) {
    	  		var rad = Math.PI / 180,
    	  		    lat1 = latlng1.lat * rad,
    	  		    lat2 = latlng2.lat * rad,
    	  		    sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2),
    	  		    sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2),
    	  		    a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
    	  		    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    	  		return this.R * c;
    	  	}
    	  });

    	  /*
    	   * @namespace Projection
    	   * @projection L.Projection.SphericalMercator
    	   *
    	   * Spherical Mercator projection — the most common projection for online maps,
    	   * used by almost all free and commercial tile providers. Assumes that Earth is
    	   * a sphere. Used by the `EPSG:3857` CRS.
    	   */

    	  var earthRadius = 6378137;

    	  var SphericalMercator = {

    	  	R: earthRadius,
    	  	MAX_LATITUDE: 85.0511287798,

    	  	project: function (latlng) {
    	  		var d = Math.PI / 180,
    	  		    max = this.MAX_LATITUDE,
    	  		    lat = Math.max(Math.min(max, latlng.lat), -max),
    	  		    sin = Math.sin(lat * d);

    	  		return new Point(
    	  			this.R * latlng.lng * d,
    	  			this.R * Math.log((1 + sin) / (1 - sin)) / 2);
    	  	},

    	  	unproject: function (point) {
    	  		var d = 180 / Math.PI;

    	  		return new LatLng(
    	  			(2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
    	  			point.x * d / this.R);
    	  	},

    	  	bounds: (function () {
    	  		var d = earthRadius * Math.PI;
    	  		return new Bounds([-d, -d], [d, d]);
    	  	})()
    	  };

    	  /*
    	   * @class Transformation
    	   * @aka L.Transformation
    	   *
    	   * Represents an affine transformation: a set of coefficients `a`, `b`, `c`, `d`
    	   * for transforming a point of a form `(x, y)` into `(a*x + b, c*y + d)` and doing
    	   * the reverse. Used by Leaflet in its projections code.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * var transformation = L.transformation(2, 5, -1, 10),
    	   * 	p = L.point(1, 2),
    	   * 	p2 = transformation.transform(p), //  L.point(7, 8)
    	   * 	p3 = transformation.untransform(p2); //  L.point(1, 2)
    	   * ```
    	   */


    	  // factory new L.Transformation(a: Number, b: Number, c: Number, d: Number)
    	  // Creates a `Transformation` object with the given coefficients.
    	  function Transformation(a, b, c, d) {
    	  	if (isArray(a)) {
    	  		// use array properties
    	  		this._a = a[0];
    	  		this._b = a[1];
    	  		this._c = a[2];
    	  		this._d = a[3];
    	  		return;
    	  	}
    	  	this._a = a;
    	  	this._b = b;
    	  	this._c = c;
    	  	this._d = d;
    	  }

    	  Transformation.prototype = {
    	  	// @method transform(point: Point, scale?: Number): Point
    	  	// Returns a transformed point, optionally multiplied by the given scale.
    	  	// Only accepts actual `L.Point` instances, not arrays.
    	  	transform: function (point, scale) { // (Point, Number) -> Point
    	  		return this._transform(point.clone(), scale);
    	  	},

    	  	// destructive transform (faster)
    	  	_transform: function (point, scale) {
    	  		scale = scale || 1;
    	  		point.x = scale * (this._a * point.x + this._b);
    	  		point.y = scale * (this._c * point.y + this._d);
    	  		return point;
    	  	},

    	  	// @method untransform(point: Point, scale?: Number): Point
    	  	// Returns the reverse transformation of the given point, optionally divided
    	  	// by the given scale. Only accepts actual `L.Point` instances, not arrays.
    	  	untransform: function (point, scale) {
    	  		scale = scale || 1;
    	  		return new Point(
    	  		        (point.x / scale - this._b) / this._a,
    	  		        (point.y / scale - this._d) / this._c);
    	  	}
    	  };

    	  // factory L.transformation(a: Number, b: Number, c: Number, d: Number)

    	  // @factory L.transformation(a: Number, b: Number, c: Number, d: Number)
    	  // Instantiates a Transformation object with the given coefficients.

    	  // @alternative
    	  // @factory L.transformation(coefficients: Array): Transformation
    	  // Expects an coefficients array of the form
    	  // `[a: Number, b: Number, c: Number, d: Number]`.

    	  function toTransformation(a, b, c, d) {
    	  	return new Transformation(a, b, c, d);
    	  }

    	  /*
    	   * @namespace CRS
    	   * @crs L.CRS.EPSG3857
    	   *
    	   * The most common CRS for online maps, used by almost all free and commercial
    	   * tile providers. Uses Spherical Mercator projection. Set in by default in
    	   * Map's `crs` option.
    	   */

    	  var EPSG3857 = extend({}, Earth, {
    	  	code: 'EPSG:3857',
    	  	projection: SphericalMercator,

    	  	transformation: (function () {
    	  		var scale = 0.5 / (Math.PI * SphericalMercator.R);
    	  		return toTransformation(scale, 0.5, -scale, 0.5);
    	  	}())
    	  });

    	  var EPSG900913 = extend({}, EPSG3857, {
    	  	code: 'EPSG:900913'
    	  });

    	  // @namespace SVG; @section
    	  // There are several static functions which can be called without instantiating L.SVG:

    	  // @function create(name: String): SVGElement
    	  // Returns a instance of [SVGElement](https://developer.mozilla.org/docs/Web/API/SVGElement),
    	  // corresponding to the class name passed. For example, using 'line' will return
    	  // an instance of [SVGLineElement](https://developer.mozilla.org/docs/Web/API/SVGLineElement).
    	  function svgCreate(name) {
    	  	return document.createElementNS('http://www.w3.org/2000/svg', name);
    	  }

    	  // @function pointsToPath(rings: Point[], closed: Boolean): String
    	  // Generates a SVG path string for multiple rings, with each ring turning
    	  // into "M..L..L.." instructions
    	  function pointsToPath(rings, closed) {
    	  	var str = '',
    	  	i, j, len, len2, points, p;

    	  	for (i = 0, len = rings.length; i < len; i++) {
    	  		points = rings[i];

    	  		for (j = 0, len2 = points.length; j < len2; j++) {
    	  			p = points[j];
    	  			str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
    	  		}

    	  		// closes the ring for polygons; "x" is VML syntax
    	  		str += closed ? (Browser.svg ? 'z' : 'x') : '';
    	  	}

    	  	// SVG complains about empty path strings
    	  	return str || 'M0 0';
    	  }

    	  /*
    	   * @namespace Browser
    	   * @aka L.Browser
    	   *
    	   * A namespace with static properties for browser/feature detection used by Leaflet internally.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * if (L.Browser.ielt9) {
    	   *   alert('Upgrade your browser, dude!');
    	   * }
    	   * ```
    	   */

    	  var style = document.documentElement.style;

    	  // @property ie: Boolean; `true` for all Internet Explorer versions (not Edge).
    	  var ie = 'ActiveXObject' in window;

    	  // @property ielt9: Boolean; `true` for Internet Explorer versions less than 9.
    	  var ielt9 = ie && !document.addEventListener;

    	  // @property edge: Boolean; `true` for the Edge web browser.
    	  var edge = 'msLaunchUri' in navigator && !('documentMode' in document);

    	  // @property webkit: Boolean;
    	  // `true` for webkit-based browsers like Chrome and Safari (including mobile versions).
    	  var webkit = userAgentContains('webkit');

    	  // @property android: Boolean
    	  // **Deprecated.** `true` for any browser running on an Android platform.
    	  var android = userAgentContains('android');

    	  // @property android23: Boolean; **Deprecated.** `true` for browsers running on Android 2 or Android 3.
    	  var android23 = userAgentContains('android 2') || userAgentContains('android 3');

    	  /* See https://stackoverflow.com/a/17961266 for details on detecting stock Android */
    	  var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10); // also matches AppleWebKit
    	  // @property androidStock: Boolean; **Deprecated.** `true` for the Android stock browser (i.e. not Chrome)
    	  var androidStock = android && userAgentContains('Google') && webkitVer < 537 && !('AudioNode' in window);

    	  // @property opera: Boolean; `true` for the Opera browser
    	  var opera = !!window.opera;

    	  // @property chrome: Boolean; `true` for the Chrome browser.
    	  var chrome = !edge && userAgentContains('chrome');

    	  // @property gecko: Boolean; `true` for gecko-based browsers like Firefox.
    	  var gecko = userAgentContains('gecko') && !webkit && !opera && !ie;

    	  // @property safari: Boolean; `true` for the Safari browser.
    	  var safari = !chrome && userAgentContains('safari');

    	  var phantom = userAgentContains('phantom');

    	  // @property opera12: Boolean
    	  // `true` for the Opera browser supporting CSS transforms (version 12 or later).
    	  var opera12 = 'OTransition' in style;

    	  // @property win: Boolean; `true` when the browser is running in a Windows platform
    	  var win = navigator.platform.indexOf('Win') === 0;

    	  // @property ie3d: Boolean; `true` for all Internet Explorer versions supporting CSS transforms.
    	  var ie3d = ie && ('transition' in style);

    	  // @property webkit3d: Boolean; `true` for webkit-based browsers supporting CSS transforms.
    	  var webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23;

    	  // @property gecko3d: Boolean; `true` for gecko-based browsers supporting CSS transforms.
    	  var gecko3d = 'MozPerspective' in style;

    	  // @property any3d: Boolean
    	  // `true` for all browsers supporting CSS transforms.
    	  var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;

    	  // @property mobile: Boolean; `true` for all browsers running in a mobile device.
    	  var mobile = typeof orientation !== 'undefined' || userAgentContains('mobile');

    	  // @property mobileWebkit: Boolean; `true` for all webkit-based browsers in a mobile device.
    	  var mobileWebkit = mobile && webkit;

    	  // @property mobileWebkit3d: Boolean
    	  // `true` for all webkit-based browsers in a mobile device supporting CSS transforms.
    	  var mobileWebkit3d = mobile && webkit3d;

    	  // @property msPointer: Boolean
    	  // `true` for browsers implementing the Microsoft touch events model (notably IE10).
    	  var msPointer = !window.PointerEvent && window.MSPointerEvent;

    	  // @property pointer: Boolean
    	  // `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
    	  var pointer = !!(window.PointerEvent || msPointer);

    	  // @property touchNative: Boolean
    	  // `true` for all browsers supporting [touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).
    	  // **This does not necessarily mean** that the browser is running in a computer with
    	  // a touchscreen, it only means that the browser is capable of understanding
    	  // touch events.
    	  var touchNative = 'ontouchstart' in window || !!window.TouchEvent;

    	  // @property touch: Boolean
    	  // `true` for all browsers supporting either [touch](#browser-touch) or [pointer](#browser-pointer) events.
    	  // Note: pointer events will be preferred (if available), and processed for all `touch*` listeners.
    	  var touch = !window.L_NO_TOUCH && (touchNative || pointer);

    	  // @property mobileOpera: Boolean; `true` for the Opera browser in a mobile device.
    	  var mobileOpera = mobile && opera;

    	  // @property mobileGecko: Boolean
    	  // `true` for gecko-based browsers running in a mobile device.
    	  var mobileGecko = mobile && gecko;

    	  // @property retina: Boolean
    	  // `true` for browsers on a high-resolution "retina" screen or on any screen when browser's display zoom is more than 100%.
    	  var retina = (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1;

    	  // @property passiveEvents: Boolean
    	  // `true` for browsers that support passive events.
    	  var passiveEvents = (function () {
    	  	var supportsPassiveOption = false;
    	  	try {
    	  		var opts = Object.defineProperty({}, 'passive', {
    	  			get: function () { // eslint-disable-line getter-return
    	  				supportsPassiveOption = true;
    	  			}
    	  		});
    	  		window.addEventListener('testPassiveEventSupport', falseFn, opts);
    	  		window.removeEventListener('testPassiveEventSupport', falseFn, opts);
    	  	} catch (e) {
    	  		// Errors can safely be ignored since this is only a browser support test.
    	  	}
    	  	return supportsPassiveOption;
    	  }());

    	  // @property canvas: Boolean
    	  // `true` when the browser supports [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
    	  var canvas$1 = (function () {
    	  	return !!document.createElement('canvas').getContext;
    	  }());

    	  // @property svg: Boolean
    	  // `true` when the browser supports [SVG](https://developer.mozilla.org/docs/Web/SVG).
    	  var svg$1 = !!(document.createElementNS && svgCreate('svg').createSVGRect);

    	  var inlineSvg = !!svg$1 && (function () {
    	  	var div = document.createElement('div');
    	  	div.innerHTML = '<svg/>';
    	  	return (div.firstChild && div.firstChild.namespaceURI) === 'http://www.w3.org/2000/svg';
    	  })();

    	  // @property vml: Boolean
    	  // `true` if the browser supports [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language).
    	  var vml = !svg$1 && (function () {
    	  	try {
    	  		var div = document.createElement('div');
    	  		div.innerHTML = '<v:shape adj="1"/>';

    	  		var shape = div.firstChild;
    	  		shape.style.behavior = 'url(#default#VML)';

    	  		return shape && (typeof shape.adj === 'object');

    	  	} catch (e) {
    	  		return false;
    	  	}
    	  }());


    	  // @property mac: Boolean; `true` when the browser is running in a Mac platform
    	  var mac = navigator.platform.indexOf('Mac') === 0;

    	  // @property mac: Boolean; `true` when the browser is running in a Linux platform
    	  var linux = navigator.platform.indexOf('Linux') === 0;

    	  function userAgentContains(str) {
    	  	return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
    	  }


    	  var Browser = {
    	  	ie: ie,
    	  	ielt9: ielt9,
    	  	edge: edge,
    	  	webkit: webkit,
    	  	android: android,
    	  	android23: android23,
    	  	androidStock: androidStock,
    	  	opera: opera,
    	  	chrome: chrome,
    	  	gecko: gecko,
    	  	safari: safari,
    	  	phantom: phantom,
    	  	opera12: opera12,
    	  	win: win,
    	  	ie3d: ie3d,
    	  	webkit3d: webkit3d,
    	  	gecko3d: gecko3d,
    	  	any3d: any3d,
    	  	mobile: mobile,
    	  	mobileWebkit: mobileWebkit,
    	  	mobileWebkit3d: mobileWebkit3d,
    	  	msPointer: msPointer,
    	  	pointer: pointer,
    	  	touch: touch,
    	  	touchNative: touchNative,
    	  	mobileOpera: mobileOpera,
    	  	mobileGecko: mobileGecko,
    	  	retina: retina,
    	  	passiveEvents: passiveEvents,
    	  	canvas: canvas$1,
    	  	svg: svg$1,
    	  	vml: vml,
    	  	inlineSvg: inlineSvg,
    	  	mac: mac,
    	  	linux: linux
    	  };

    	  /*
    	   * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
    	   */

    	  var POINTER_DOWN =   Browser.msPointer ? 'MSPointerDown'   : 'pointerdown';
    	  var POINTER_MOVE =   Browser.msPointer ? 'MSPointerMove'   : 'pointermove';
    	  var POINTER_UP =     Browser.msPointer ? 'MSPointerUp'     : 'pointerup';
    	  var POINTER_CANCEL = Browser.msPointer ? 'MSPointerCancel' : 'pointercancel';
    	  var pEvent = {
    	  	touchstart  : POINTER_DOWN,
    	  	touchmove   : POINTER_MOVE,
    	  	touchend    : POINTER_UP,
    	  	touchcancel : POINTER_CANCEL
    	  };
    	  var handle = {
    	  	touchstart  : _onPointerStart,
    	  	touchmove   : _handlePointer,
    	  	touchend    : _handlePointer,
    	  	touchcancel : _handlePointer
    	  };
    	  var _pointers = {};
    	  var _pointerDocListener = false;

    	  // Provides a touch events wrapper for (ms)pointer events.
    	  // ref https://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890

    	  function addPointerListener(obj, type, handler) {
    	  	if (type === 'touchstart') {
    	  		_addPointerDocListener();
    	  	}
    	  	if (!handle[type]) {
    	  		console.warn('wrong event specified:', type);
    	  		return L.Util.falseFn;
    	  	}
    	  	handler = handle[type].bind(this, handler);
    	  	obj.addEventListener(pEvent[type], handler, false);
    	  	return handler;
    	  }

    	  function removePointerListener(obj, type, handler) {
    	  	if (!pEvent[type]) {
    	  		console.warn('wrong event specified:', type);
    	  		return;
    	  	}
    	  	obj.removeEventListener(pEvent[type], handler, false);
    	  }

    	  function _globalPointerDown(e) {
    	  	_pointers[e.pointerId] = e;
    	  }

    	  function _globalPointerMove(e) {
    	  	if (_pointers[e.pointerId]) {
    	  		_pointers[e.pointerId] = e;
    	  	}
    	  }

    	  function _globalPointerUp(e) {
    	  	delete _pointers[e.pointerId];
    	  }

    	  function _addPointerDocListener() {
    	  	// need to keep track of what pointers and how many are active to provide e.touches emulation
    	  	if (!_pointerDocListener) {
    	  		// we listen document as any drags that end by moving the touch off the screen get fired there
    	  		document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
    	  		document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
    	  		document.addEventListener(POINTER_UP, _globalPointerUp, true);
    	  		document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);

    	  		_pointerDocListener = true;
    	  	}
    	  }

    	  function _handlePointer(handler, e) {
    	  	if (e.pointerType === (e.MSPOINTER_TYPE_MOUSE || 'mouse')) { return; }

    	  	e.touches = [];
    	  	for (var i in _pointers) {
    	  		e.touches.push(_pointers[i]);
    	  	}
    	  	e.changedTouches = [e];

    	  	handler(e);
    	  }

    	  function _onPointerStart(handler, e) {
    	  	// IE10 specific: MsTouch needs preventDefault. See #2000
    	  	if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) {
    	  		preventDefault(e);
    	  	}
    	  	_handlePointer(handler, e);
    	  }

    	  /*
    	   * Extends the event handling code with double tap support for mobile browsers.
    	   *
    	   * Note: currently most browsers fire native dblclick, with only a few exceptions
    	   * (see https://github.com/Leaflet/Leaflet/issues/7012#issuecomment-595087386)
    	   */

    	  function makeDblclick(event) {
    	  	// in modern browsers `type` cannot be just overridden:
    	  	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only
    	  	var newEvent = {},
    	  	    prop, i;
    	  	for (i in event) {
    	  		prop = event[i];
    	  		newEvent[i] = prop && prop.bind ? prop.bind(event) : prop;
    	  	}
    	  	event = newEvent;
    	  	newEvent.type = 'dblclick';
    	  	newEvent.detail = 2;
    	  	newEvent.isTrusted = false;
    	  	newEvent._simulated = true; // for debug purposes
    	  	return newEvent;
    	  }

    	  var delay = 200;
    	  function addDoubleTapListener(obj, handler) {
    	  	// Most browsers handle double tap natively
    	  	obj.addEventListener('dblclick', handler);

    	  	// On some platforms the browser doesn't fire native dblclicks for touch events.
    	  	// It seems that in all such cases `detail` property of `click` event is always `1`.
    	  	// So here we rely on that fact to avoid excessive 'dblclick' simulation when not needed.
    	  	var last = 0,
    	  	    detail;
    	  	function simDblclick(e) {
    	  		if (e.detail !== 1) {
    	  			detail = e.detail; // keep in sync to avoid false dblclick in some cases
    	  			return;
    	  		}

    	  		if (e.pointerType === 'mouse' ||
    	  			(e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents)) {

    	  			return;
    	  		}

    	  		// When clicking on an <input>, the browser generates a click on its
    	  		// <label> (and vice versa) triggering two clicks in quick succession.
    	  		// This ignores clicks on elements which are a label with a 'for'
    	  		// attribute (or children of such a label), but not children of
    	  		// a <input>.
    	  		var path = getPropagationPath(e);
    	  		if (path.some(function (el) {
    	  			return el instanceof HTMLLabelElement && el.attributes.for;
    	  		}) &&
    	  			!path.some(function (el) {
    	  				return (
    	  					el instanceof HTMLInputElement ||
    	  					el instanceof HTMLSelectElement
    	  				);
    	  			})
    	  		) {
    	  			return;
    	  		}

    	  		var now = Date.now();
    	  		if (now - last <= delay) {
    	  			detail++;
    	  			if (detail === 2) {
    	  				handler(makeDblclick(e));
    	  			}
    	  		} else {
    	  			detail = 1;
    	  		}
    	  		last = now;
    	  	}

    	  	obj.addEventListener('click', simDblclick);

    	  	return {
    	  		dblclick: handler,
    	  		simDblclick: simDblclick
    	  	};
    	  }

    	  function removeDoubleTapListener(obj, handlers) {
    	  	obj.removeEventListener('dblclick', handlers.dblclick);
    	  	obj.removeEventListener('click', handlers.simDblclick);
    	  }

    	  /*
    	   * @namespace DomUtil
    	   *
    	   * Utility functions to work with the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model)
    	   * tree, used by Leaflet internally.
    	   *
    	   * Most functions expecting or returning a `HTMLElement` also work for
    	   * SVG elements. The only difference is that classes refer to CSS classes
    	   * in HTML and SVG classes in SVG.
    	   */


    	  // @property TRANSFORM: String
    	  // Vendor-prefixed transform style name (e.g. `'webkitTransform'` for WebKit).
    	  var TRANSFORM = testProp(
    	  	['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

    	  // webkitTransition comes first because some browser versions that drop vendor prefix don't do
    	  // the same for the transitionend event, in particular the Android 4.1 stock browser

    	  // @property TRANSITION: String
    	  // Vendor-prefixed transition style name.
    	  var TRANSITION = testProp(
    	  	['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

    	  // @property TRANSITION_END: String
    	  // Vendor-prefixed transitionend event name.
    	  var TRANSITION_END =
    	  	TRANSITION === 'webkitTransition' || TRANSITION === 'OTransition' ? TRANSITION + 'End' : 'transitionend';


    	  // @function get(id: String|HTMLElement): HTMLElement
    	  // Returns an element given its DOM id, or returns the element itself
    	  // if it was passed directly.
    	  function get(id) {
    	  	return typeof id === 'string' ? document.getElementById(id) : id;
    	  }

    	  // @function getStyle(el: HTMLElement, styleAttrib: String): String
    	  // Returns the value for a certain style attribute on an element,
    	  // including computed values or values set through CSS.
    	  function getStyle(el, style) {
    	  	var value = el.style[style] || (el.currentStyle && el.currentStyle[style]);

    	  	if ((!value || value === 'auto') && document.defaultView) {
    	  		var css = document.defaultView.getComputedStyle(el, null);
    	  		value = css ? css[style] : null;
    	  	}
    	  	return value === 'auto' ? null : value;
    	  }

    	  // @function create(tagName: String, className?: String, container?: HTMLElement): HTMLElement
    	  // Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
    	  function create$1(tagName, className, container) {
    	  	var el = document.createElement(tagName);
    	  	el.className = className || '';

    	  	if (container) {
    	  		container.appendChild(el);
    	  	}
    	  	return el;
    	  }

    	  // @function remove(el: HTMLElement)
    	  // Removes `el` from its parent element
    	  function remove(el) {
    	  	var parent = el.parentNode;
    	  	if (parent) {
    	  		parent.removeChild(el);
    	  	}
    	  }

    	  // @function empty(el: HTMLElement)
    	  // Removes all of `el`'s children elements from `el`
    	  function empty(el) {
    	  	while (el.firstChild) {
    	  		el.removeChild(el.firstChild);
    	  	}
    	  }

    	  // @function toFront(el: HTMLElement)
    	  // Makes `el` the last child of its parent, so it renders in front of the other children.
    	  function toFront(el) {
    	  	var parent = el.parentNode;
    	  	if (parent && parent.lastChild !== el) {
    	  		parent.appendChild(el);
    	  	}
    	  }

    	  // @function toBack(el: HTMLElement)
    	  // Makes `el` the first child of its parent, so it renders behind the other children.
    	  function toBack(el) {
    	  	var parent = el.parentNode;
    	  	if (parent && parent.firstChild !== el) {
    	  		parent.insertBefore(el, parent.firstChild);
    	  	}
    	  }

    	  // @function hasClass(el: HTMLElement, name: String): Boolean
    	  // Returns `true` if the element's class attribute contains `name`.
    	  function hasClass(el, name) {
    	  	if (el.classList !== undefined) {
    	  		return el.classList.contains(name);
    	  	}
    	  	var className = getClass(el);
    	  	return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
    	  }

    	  // @function addClass(el: HTMLElement, name: String)
    	  // Adds `name` to the element's class attribute.
    	  function addClass(el, name) {
    	  	if (el.classList !== undefined) {
    	  		var classes = splitWords(name);
    	  		for (var i = 0, len = classes.length; i < len; i++) {
    	  			el.classList.add(classes[i]);
    	  		}
    	  	} else if (!hasClass(el, name)) {
    	  		var className = getClass(el);
    	  		setClass(el, (className ? className + ' ' : '') + name);
    	  	}
    	  }

    	  // @function removeClass(el: HTMLElement, name: String)
    	  // Removes `name` from the element's class attribute.
    	  function removeClass(el, name) {
    	  	if (el.classList !== undefined) {
    	  		el.classList.remove(name);
    	  	} else {
    	  		setClass(el, trim((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
    	  	}
    	  }

    	  // @function setClass(el: HTMLElement, name: String)
    	  // Sets the element's class.
    	  function setClass(el, name) {
    	  	if (el.className.baseVal === undefined) {
    	  		el.className = name;
    	  	} else {
    	  		// in case of SVG element
    	  		el.className.baseVal = name;
    	  	}
    	  }

    	  // @function getClass(el: HTMLElement): String
    	  // Returns the element's class.
    	  function getClass(el) {
    	  	// Check if the element is an SVGElementInstance and use the correspondingElement instead
    	  	// (Required for linked SVG elements in IE11.)
    	  	if (el.correspondingElement) {
    	  		el = el.correspondingElement;
    	  	}
    	  	return el.className.baseVal === undefined ? el.className : el.className.baseVal;
    	  }

    	  // @function setOpacity(el: HTMLElement, opacity: Number)
    	  // Set the opacity of an element (including old IE support).
    	  // `opacity` must be a number from `0` to `1`.
    	  function setOpacity(el, value) {
    	  	if ('opacity' in el.style) {
    	  		el.style.opacity = value;
    	  	} else if ('filter' in el.style) {
    	  		_setOpacityIE(el, value);
    	  	}
    	  }

    	  function _setOpacityIE(el, value) {
    	  	var filter = false,
    	  	    filterName = 'DXImageTransform.Microsoft.Alpha';

    	  	// filters collection throws an error if we try to retrieve a filter that doesn't exist
    	  	try {
    	  		filter = el.filters.item(filterName);
    	  	} catch (e) {
    	  		// don't set opacity to 1 if we haven't already set an opacity,
    	  		// it isn't needed and breaks transparent pngs.
    	  		if (value === 1) { return; }
    	  	}

    	  	value = Math.round(value * 100);

    	  	if (filter) {
    	  		filter.Enabled = (value !== 100);
    	  		filter.Opacity = value;
    	  	} else {
    	  		el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
    	  	}
    	  }

    	  // @function testProp(props: String[]): String|false
    	  // Goes through the array of style names and returns the first name
    	  // that is a valid style name for an element. If no such name is found,
    	  // it returns false. Useful for vendor-prefixed styles like `transform`.
    	  function testProp(props) {
    	  	var style = document.documentElement.style;

    	  	for (var i = 0; i < props.length; i++) {
    	  		if (props[i] in style) {
    	  			return props[i];
    	  		}
    	  	}
    	  	return false;
    	  }

    	  // @function setTransform(el: HTMLElement, offset: Point, scale?: Number)
    	  // Resets the 3D CSS transform of `el` so it is translated by `offset` pixels
    	  // and optionally scaled by `scale`. Does not have an effect if the
    	  // browser doesn't support 3D CSS transforms.
    	  function setTransform(el, offset, scale) {
    	  	var pos = offset || new Point(0, 0);

    	  	el.style[TRANSFORM] =
    	  		(Browser.ie3d ?
    	  			'translate(' + pos.x + 'px,' + pos.y + 'px)' :
    	  			'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
    	  		(scale ? ' scale(' + scale + ')' : '');
    	  }

    	  // @function setPosition(el: HTMLElement, position: Point)
    	  // Sets the position of `el` to coordinates specified by `position`,
    	  // using CSS translate or top/left positioning depending on the browser
    	  // (used by Leaflet internally to position its layers).
    	  function setPosition(el, point) {

    	  	/*eslint-disable */
    	  	el._leaflet_pos = point;
    	  	/* eslint-enable */

    	  	if (Browser.any3d) {
    	  		setTransform(el, point);
    	  	} else {
    	  		el.style.left = point.x + 'px';
    	  		el.style.top = point.y + 'px';
    	  	}
    	  }

    	  // @function getPosition(el: HTMLElement): Point
    	  // Returns the coordinates of an element previously positioned with setPosition.
    	  function getPosition(el) {
    	  	// this method is only used for elements previously positioned using setPosition,
    	  	// so it's safe to cache the position for performance

    	  	return el._leaflet_pos || new Point(0, 0);
    	  }

    	  // @function disableTextSelection()
    	  // Prevents the user from generating `selectstart` DOM events, usually generated
    	  // when the user drags the mouse through a page with text. Used internally
    	  // by Leaflet to override the behaviour of any click-and-drag interaction on
    	  // the map. Affects drag interactions on the whole document.

    	  // @function enableTextSelection()
    	  // Cancels the effects of a previous [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection).
    	  var disableTextSelection;
    	  var enableTextSelection;
    	  var _userSelect;
    	  if ('onselectstart' in document) {
    	  	disableTextSelection = function () {
    	  		on(window, 'selectstart', preventDefault);
    	  	};
    	  	enableTextSelection = function () {
    	  		off(window, 'selectstart', preventDefault);
    	  	};
    	  } else {
    	  	var userSelectProperty = testProp(
    	  		['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

    	  	disableTextSelection = function () {
    	  		if (userSelectProperty) {
    	  			var style = document.documentElement.style;
    	  			_userSelect = style[userSelectProperty];
    	  			style[userSelectProperty] = 'none';
    	  		}
    	  	};
    	  	enableTextSelection = function () {
    	  		if (userSelectProperty) {
    	  			document.documentElement.style[userSelectProperty] = _userSelect;
    	  			_userSelect = undefined;
    	  		}
    	  	};
    	  }

    	  // @function disableImageDrag()
    	  // As [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection), but
    	  // for `dragstart` DOM events, usually generated when the user drags an image.
    	  function disableImageDrag() {
    	  	on(window, 'dragstart', preventDefault);
    	  }

    	  // @function enableImageDrag()
    	  // Cancels the effects of a previous [`L.DomUtil.disableImageDrag`](#domutil-disabletextselection).
    	  function enableImageDrag() {
    	  	off(window, 'dragstart', preventDefault);
    	  }

    	  var _outlineElement, _outlineStyle;
    	  // @function preventOutline(el: HTMLElement)
    	  // Makes the [outline](https://developer.mozilla.org/docs/Web/CSS/outline)
    	  // of the element `el` invisible. Used internally by Leaflet to prevent
    	  // focusable elements from displaying an outline when the user performs a
    	  // drag interaction on them.
    	  function preventOutline(element) {
    	  	while (element.tabIndex === -1) {
    	  		element = element.parentNode;
    	  	}
    	  	if (!element.style) { return; }
    	  	restoreOutline();
    	  	_outlineElement = element;
    	  	_outlineStyle = element.style.outline;
    	  	element.style.outline = 'none';
    	  	on(window, 'keydown', restoreOutline);
    	  }

    	  // @function restoreOutline()
    	  // Cancels the effects of a previous [`L.DomUtil.preventOutline`]().
    	  function restoreOutline() {
    	  	if (!_outlineElement) { return; }
    	  	_outlineElement.style.outline = _outlineStyle;
    	  	_outlineElement = undefined;
    	  	_outlineStyle = undefined;
    	  	off(window, 'keydown', restoreOutline);
    	  }

    	  // @function getSizedParentNode(el: HTMLElement): HTMLElement
    	  // Finds the closest parent node which size (width and height) is not null.
    	  function getSizedParentNode(element) {
    	  	do {
    	  		element = element.parentNode;
    	  	} while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
    	  	return element;
    	  }

    	  // @function getScale(el: HTMLElement): Object
    	  // Computes the CSS scale currently applied on the element.
    	  // Returns an object with `x` and `y` members as horizontal and vertical scales respectively,
    	  // and `boundingClientRect` as the result of [`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).
    	  function getScale(element) {
    	  	var rect = element.getBoundingClientRect(); // Read-only in old browsers.

    	  	return {
    	  		x: rect.width / element.offsetWidth || 1,
    	  		y: rect.height / element.offsetHeight || 1,
    	  		boundingClientRect: rect
    	  	};
    	  }

    	  var DomUtil = {
    	    __proto__: null,
    	    TRANSFORM: TRANSFORM,
    	    TRANSITION: TRANSITION,
    	    TRANSITION_END: TRANSITION_END,
    	    get: get,
    	    getStyle: getStyle,
    	    create: create$1,
    	    remove: remove,
    	    empty: empty,
    	    toFront: toFront,
    	    toBack: toBack,
    	    hasClass: hasClass,
    	    addClass: addClass,
    	    removeClass: removeClass,
    	    setClass: setClass,
    	    getClass: getClass,
    	    setOpacity: setOpacity,
    	    testProp: testProp,
    	    setTransform: setTransform,
    	    setPosition: setPosition,
    	    getPosition: getPosition,
    	    get disableTextSelection () { return disableTextSelection; },
    	    get enableTextSelection () { return enableTextSelection; },
    	    disableImageDrag: disableImageDrag,
    	    enableImageDrag: enableImageDrag,
    	    preventOutline: preventOutline,
    	    restoreOutline: restoreOutline,
    	    getSizedParentNode: getSizedParentNode,
    	    getScale: getScale
    	  };

    	  /*
    	   * @namespace DomEvent
    	   * Utility functions to work with the [DOM events](https://developer.mozilla.org/docs/Web/API/Event), used by Leaflet internally.
    	   */

    	  // Inspired by John Resig, Dean Edwards and YUI addEvent implementations.

    	  // @function on(el: HTMLElement, types: String, fn: Function, context?: Object): this
    	  // Adds a listener function (`fn`) to a particular DOM event type of the
    	  // element `el`. You can optionally specify the context of the listener
    	  // (object the `this` keyword will point to). You can also pass several
    	  // space-separated types (e.g. `'click dblclick'`).

    	  // @alternative
    	  // @function on(el: HTMLElement, eventMap: Object, context?: Object): this
    	  // Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
    	  function on(obj, types, fn, context) {

    	  	if (types && typeof types === 'object') {
    	  		for (var type in types) {
    	  			addOne(obj, type, types[type], fn);
    	  		}
    	  	} else {
    	  		types = splitWords(types);

    	  		for (var i = 0, len = types.length; i < len; i++) {
    	  			addOne(obj, types[i], fn, context);
    	  		}
    	  	}

    	  	return this;
    	  }

    	  var eventsKey = '_leaflet_events';

    	  // @function off(el: HTMLElement, types: String, fn: Function, context?: Object): this
    	  // Removes a previously added listener function.
    	  // Note that if you passed a custom context to on, you must pass the same
    	  // context to `off` in order to remove the listener.

    	  // @alternative
    	  // @function off(el: HTMLElement, eventMap: Object, context?: Object): this
    	  // Removes a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`

    	  // @alternative
    	  // @function off(el: HTMLElement, types: String): this
    	  // Removes all previously added listeners of given types.

    	  // @alternative
    	  // @function off(el: HTMLElement): this
    	  // Removes all previously added listeners from given HTMLElement
    	  function off(obj, types, fn, context) {

    	  	if (arguments.length === 1) {
    	  		batchRemove(obj);
    	  		delete obj[eventsKey];

    	  	} else if (types && typeof types === 'object') {
    	  		for (var type in types) {
    	  			removeOne(obj, type, types[type], fn);
    	  		}

    	  	} else {
    	  		types = splitWords(types);

    	  		if (arguments.length === 2) {
    	  			batchRemove(obj, function (type) {
    	  				return indexOf(types, type) !== -1;
    	  			});
    	  		} else {
    	  			for (var i = 0, len = types.length; i < len; i++) {
    	  				removeOne(obj, types[i], fn, context);
    	  			}
    	  		}
    	  	}

    	  	return this;
    	  }

    	  function batchRemove(obj, filterFn) {
    	  	for (var id in obj[eventsKey]) {
    	  		var type = id.split(/\d/)[0];
    	  		if (!filterFn || filterFn(type)) {
    	  			removeOne(obj, type, null, null, id);
    	  		}
    	  	}
    	  }

    	  var mouseSubst = {
    	  	mouseenter: 'mouseover',
    	  	mouseleave: 'mouseout',
    	  	wheel: !('onwheel' in window) && 'mousewheel'
    	  };

    	  function addOne(obj, type, fn, context) {
    	  	var id = type + stamp(fn) + (context ? '_' + stamp(context) : '');

    	  	if (obj[eventsKey] && obj[eventsKey][id]) { return this; }

    	  	var handler = function (e) {
    	  		return fn.call(context || obj, e || window.event);
    	  	};

    	  	var originalHandler = handler;

    	  	if (!Browser.touchNative && Browser.pointer && type.indexOf('touch') === 0) {
    	  		// Needs DomEvent.Pointer.js
    	  		handler = addPointerListener(obj, type, handler);

    	  	} else if (Browser.touch && (type === 'dblclick')) {
    	  		handler = addDoubleTapListener(obj, handler);

    	  	} else if ('addEventListener' in obj) {

    	  		if (type === 'touchstart' || type === 'touchmove' || type === 'wheel' ||  type === 'mousewheel') {
    	  			obj.addEventListener(mouseSubst[type] || type, handler, Browser.passiveEvents ? {passive: false} : false);

    	  		} else if (type === 'mouseenter' || type === 'mouseleave') {
    	  			handler = function (e) {
    	  				e = e || window.event;
    	  				if (isExternalTarget(obj, e)) {
    	  					originalHandler(e);
    	  				}
    	  			};
    	  			obj.addEventListener(mouseSubst[type], handler, false);

    	  		} else {
    	  			obj.addEventListener(type, originalHandler, false);
    	  		}

    	  	} else {
    	  		obj.attachEvent('on' + type, handler);
    	  	}

    	  	obj[eventsKey] = obj[eventsKey] || {};
    	  	obj[eventsKey][id] = handler;
    	  }

    	  function removeOne(obj, type, fn, context, id) {
    	  	id = id || type + stamp(fn) + (context ? '_' + stamp(context) : '');
    	  	var handler = obj[eventsKey] && obj[eventsKey][id];

    	  	if (!handler) { return this; }

    	  	if (!Browser.touchNative && Browser.pointer && type.indexOf('touch') === 0) {
    	  		removePointerListener(obj, type, handler);

    	  	} else if (Browser.touch && (type === 'dblclick')) {
    	  		removeDoubleTapListener(obj, handler);

    	  	} else if ('removeEventListener' in obj) {

    	  		obj.removeEventListener(mouseSubst[type] || type, handler, false);

    	  	} else {
    	  		obj.detachEvent('on' + type, handler);
    	  	}

    	  	obj[eventsKey][id] = null;
    	  }

    	  // @function stopPropagation(ev: DOMEvent): this
    	  // Stop the given event from propagation to parent elements. Used inside the listener functions:
    	  // ```js
    	  // L.DomEvent.on(div, 'click', function (ev) {
    	  // 	L.DomEvent.stopPropagation(ev);
    	  // });
    	  // ```
    	  function stopPropagation(e) {

    	  	if (e.stopPropagation) {
    	  		e.stopPropagation();
    	  	} else if (e.originalEvent) {  // In case of Leaflet event.
    	  		e.originalEvent._stopped = true;
    	  	} else {
    	  		e.cancelBubble = true;
    	  	}

    	  	return this;
    	  }

    	  // @function disableScrollPropagation(el: HTMLElement): this
    	  // Adds `stopPropagation` to the element's `'wheel'` events (plus browser variants).
    	  function disableScrollPropagation(el) {
    	  	addOne(el, 'wheel', stopPropagation);
    	  	return this;
    	  }

    	  // @function disableClickPropagation(el: HTMLElement): this
    	  // Adds `stopPropagation` to the element's `'click'`, `'dblclick'`, `'contextmenu'`,
    	  // `'mousedown'` and `'touchstart'` events (plus browser variants).
    	  function disableClickPropagation(el) {
    	  	on(el, 'mousedown touchstart dblclick contextmenu', stopPropagation);
    	  	el['_leaflet_disable_click'] = true;
    	  	return this;
    	  }

    	  // @function preventDefault(ev: DOMEvent): this
    	  // Prevents the default action of the DOM Event `ev` from happening (such as
    	  // following a link in the href of the a element, or doing a POST request
    	  // with page reload when a `<form>` is submitted).
    	  // Use it inside listener functions.
    	  function preventDefault(e) {
    	  	if (e.preventDefault) {
    	  		e.preventDefault();
    	  	} else {
    	  		e.returnValue = false;
    	  	}
    	  	return this;
    	  }

    	  // @function stop(ev: DOMEvent): this
    	  // Does `stopPropagation` and `preventDefault` at the same time.
    	  function stop(e) {
    	  	preventDefault(e);
    	  	stopPropagation(e);
    	  	return this;
    	  }

    	  // @function getPropagationPath(ev: DOMEvent): Array
    	  // Compatibility polyfill for [`Event.composedPath()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath).
    	  // Returns an array containing the `HTMLElement`s that the given DOM event
    	  // should propagate to (if not stopped).
    	  function getPropagationPath(ev) {
    	  	if (ev.composedPath) {
    	  		return ev.composedPath();
    	  	}

    	  	var path = [];
    	  	var el = ev.target;

    	  	while (el) {
    	  		path.push(el);
    	  		el = el.parentNode;
    	  	}
    	  	return path;
    	  }


    	  // @function getMousePosition(ev: DOMEvent, container?: HTMLElement): Point
    	  // Gets normalized mouse position from a DOM event relative to the
    	  // `container` (border excluded) or to the whole page if not specified.
    	  function getMousePosition(e, container) {
    	  	if (!container) {
    	  		return new Point(e.clientX, e.clientY);
    	  	}

    	  	var scale = getScale(container),
    	  	    offset = scale.boundingClientRect; // left and top  values are in page scale (like the event clientX/Y)

    	  	return new Point(
    	  		// offset.left/top values are in page scale (like clientX/Y),
    	  		// whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
    	  		(e.clientX - offset.left) / scale.x - container.clientLeft,
    	  		(e.clientY - offset.top) / scale.y - container.clientTop
    	  	);
    	  }


    	  //  except , Safari and
    	  // We need double the scroll pixels (see #7403 and #4538) for all Browsers
    	  // except OSX (Mac) -> 3x, Chrome running on Linux 1x

    	  var wheelPxFactor =
    	  	(Browser.linux && Browser.chrome) ? window.devicePixelRatio :
    	  	Browser.mac ? window.devicePixelRatio * 3 :
    	  	window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    	  // @function getWheelDelta(ev: DOMEvent): Number
    	  // Gets normalized wheel delta from a wheel DOM event, in vertical
    	  // pixels scrolled (negative if scrolling down).
    	  // Events from pointing devices without precise scrolling are mapped to
    	  // a best guess of 60 pixels.
    	  function getWheelDelta(e) {
    	  	return (Browser.edge) ? e.wheelDeltaY / 2 : // Don't trust window-geometry-based delta
    	  	       (e.deltaY && e.deltaMode === 0) ? -e.deltaY / wheelPxFactor : // Pixels
    	  	       (e.deltaY && e.deltaMode === 1) ? -e.deltaY * 20 : // Lines
    	  	       (e.deltaY && e.deltaMode === 2) ? -e.deltaY * 60 : // Pages
    	  	       (e.deltaX || e.deltaZ) ? 0 :	// Skip horizontal/depth wheel events
    	  	       e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : // Legacy IE pixels
    	  	       (e.detail && Math.abs(e.detail) < 32765) ? -e.detail * 20 : // Legacy Moz lines
    	  	       e.detail ? e.detail / -32765 * 60 : // Legacy Moz pages
    	  	       0;
    	  }

    	  // check if element really left/entered the event target (for mouseenter/mouseleave)
    	  function isExternalTarget(el, e) {

    	  	var related = e.relatedTarget;

    	  	if (!related) { return true; }

    	  	try {
    	  		while (related && (related !== el)) {
    	  			related = related.parentNode;
    	  		}
    	  	} catch (err) {
    	  		return false;
    	  	}
    	  	return (related !== el);
    	  }

    	  var DomEvent = {
    	    __proto__: null,
    	    on: on,
    	    off: off,
    	    stopPropagation: stopPropagation,
    	    disableScrollPropagation: disableScrollPropagation,
    	    disableClickPropagation: disableClickPropagation,
    	    preventDefault: preventDefault,
    	    stop: stop,
    	    getPropagationPath: getPropagationPath,
    	    getMousePosition: getMousePosition,
    	    getWheelDelta: getWheelDelta,
    	    isExternalTarget: isExternalTarget,
    	    addListener: on,
    	    removeListener: off
    	  };

    	  /*
    	   * @class PosAnimation
    	   * @aka L.PosAnimation
    	   * @inherits Evented
    	   * Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9.
    	   *
    	   * @example
    	   * ```js
    	   * var myPositionMarker = L.marker([48.864716, 2.294694]).addTo(map);
    	   *
    	   * myPositionMarker.on("click", function() {
    	   * 	var pos = map.latLngToLayerPoint(myPositionMarker.getLatLng());
    	   * 	pos.y -= 25;
    	   * 	var fx = new L.PosAnimation();
    	   *
    	   * 	fx.once('end',function() {
    	   * 		pos.y += 25;
    	   * 		fx.run(myPositionMarker._icon, pos, 0.8);
    	   * 	});
    	   *
    	   * 	fx.run(myPositionMarker._icon, pos, 0.3);
    	   * });
    	   *
    	   * ```
    	   *
    	   * @constructor L.PosAnimation()
    	   * Creates a `PosAnimation` object.
    	   *
    	   */

    	  var PosAnimation = Evented.extend({

    	  	// @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
    	  	// Run an animation of a given element to a new position, optionally setting
    	  	// duration in seconds (`0.25` by default) and easing linearity factor (3rd
    	  	// argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
    	  	// `0.5` by default).
    	  	run: function (el, newPos, duration, easeLinearity) {
    	  		this.stop();

    	  		this._el = el;
    	  		this._inProgress = true;
    	  		this._duration = duration || 0.25;
    	  		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

    	  		this._startPos = getPosition(el);
    	  		this._offset = newPos.subtract(this._startPos);
    	  		this._startTime = +new Date();

    	  		// @event start: Event
    	  		// Fired when the animation starts
    	  		this.fire('start');

    	  		this._animate();
    	  	},

    	  	// @method stop()
    	  	// Stops the animation (if currently running).
    	  	stop: function () {
    	  		if (!this._inProgress) { return; }

    	  		this._step(true);
    	  		this._complete();
    	  	},

    	  	_animate: function () {
    	  		// animation loop
    	  		this._animId = requestAnimFrame(this._animate, this);
    	  		this._step();
    	  	},

    	  	_step: function (round) {
    	  		var elapsed = (+new Date()) - this._startTime,
    	  		    duration = this._duration * 1000;

    	  		if (elapsed < duration) {
    	  			this._runFrame(this._easeOut(elapsed / duration), round);
    	  		} else {
    	  			this._runFrame(1);
    	  			this._complete();
    	  		}
    	  	},

    	  	_runFrame: function (progress, round) {
    	  		var pos = this._startPos.add(this._offset.multiplyBy(progress));
    	  		if (round) {
    	  			pos._round();
    	  		}
    	  		setPosition(this._el, pos);

    	  		// @event step: Event
    	  		// Fired continuously during the animation.
    	  		this.fire('step');
    	  	},

    	  	_complete: function () {
    	  		cancelAnimFrame(this._animId);

    	  		this._inProgress = false;
    	  		// @event end: Event
    	  		// Fired when the animation ends.
    	  		this.fire('end');
    	  	},

    	  	_easeOut: function (t) {
    	  		return 1 - Math.pow(1 - t, this._easeOutPower);
    	  	}
    	  });

    	  /*
    	   * @class Map
    	   * @aka L.Map
    	   * @inherits Evented
    	   *
    	   * The central class of the API — it is used to create a map on a page and manipulate it.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * // initialize the map on the "map" div with a given center and zoom
    	   * var map = L.map('map', {
    	   * 	center: [51.505, -0.09],
    	   * 	zoom: 13
    	   * });
    	   * ```
    	   *
    	   */

    	  var Map = Evented.extend({

    	  	options: {
    	  		// @section Map State Options
    	  		// @option crs: CRS = L.CRS.EPSG3857
    	  		// The [Coordinate Reference System](#crs) to use. Don't change this if you're not
    	  		// sure what it means.
    	  		crs: EPSG3857,

    	  		// @option center: LatLng = undefined
    	  		// Initial geographic center of the map
    	  		center: undefined,

    	  		// @option zoom: Number = undefined
    	  		// Initial map zoom level
    	  		zoom: undefined,

    	  		// @option minZoom: Number = *
    	  		// Minimum zoom level of the map.
    	  		// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
    	  		// the lowest of their `minZoom` options will be used instead.
    	  		minZoom: undefined,

    	  		// @option maxZoom: Number = *
    	  		// Maximum zoom level of the map.
    	  		// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
    	  		// the highest of their `maxZoom` options will be used instead.
    	  		maxZoom: undefined,

    	  		// @option layers: Layer[] = []
    	  		// Array of layers that will be added to the map initially
    	  		layers: [],

    	  		// @option maxBounds: LatLngBounds = null
    	  		// When this option is set, the map restricts the view to the given
    	  		// geographical bounds, bouncing the user back if the user tries to pan
    	  		// outside the view. To set the restriction dynamically, use
    	  		// [`setMaxBounds`](#map-setmaxbounds) method.
    	  		maxBounds: undefined,

    	  		// @option renderer: Renderer = *
    	  		// The default method for drawing vector layers on the map. `L.SVG`
    	  		// or `L.Canvas` by default depending on browser support.
    	  		renderer: undefined,


    	  		// @section Animation Options
    	  		// @option zoomAnimation: Boolean = true
    	  		// Whether the map zoom animation is enabled. By default it's enabled
    	  		// in all browsers that support CSS3 Transitions except Android.
    	  		zoomAnimation: true,

    	  		// @option zoomAnimationThreshold: Number = 4
    	  		// Won't animate zoom if the zoom difference exceeds this value.
    	  		zoomAnimationThreshold: 4,

    	  		// @option fadeAnimation: Boolean = true
    	  		// Whether the tile fade animation is enabled. By default it's enabled
    	  		// in all browsers that support CSS3 Transitions except Android.
    	  		fadeAnimation: true,

    	  		// @option markerZoomAnimation: Boolean = true
    	  		// Whether markers animate their zoom with the zoom animation, if disabled
    	  		// they will disappear for the length of the animation. By default it's
    	  		// enabled in all browsers that support CSS3 Transitions except Android.
    	  		markerZoomAnimation: true,

    	  		// @option transform3DLimit: Number = 2^23
    	  		// Defines the maximum size of a CSS translation transform. The default
    	  		// value should not be changed unless a web browser positions layers in
    	  		// the wrong place after doing a large `panBy`.
    	  		transform3DLimit: 8388608, // Precision limit of a 32-bit float

    	  		// @section Interaction Options
    	  		// @option zoomSnap: Number = 1
    	  		// Forces the map's zoom level to always be a multiple of this, particularly
    	  		// right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
    	  		// By default, the zoom level snaps to the nearest integer; lower values
    	  		// (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
    	  		// means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
    	  		zoomSnap: 1,

    	  		// @option zoomDelta: Number = 1
    	  		// Controls how much the map's zoom level will change after a
    	  		// [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
    	  		// or `-` on the keyboard, or using the [zoom controls](#control-zoom).
    	  		// Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
    	  		zoomDelta: 1,

    	  		// @option trackResize: Boolean = true
    	  		// Whether the map automatically handles browser window resize to update itself.
    	  		trackResize: true
    	  	},

    	  	initialize: function (id, options) { // (HTMLElement or String, Object)
    	  		options = setOptions(this, options);

    	  		// Make sure to assign internal flags at the beginning,
    	  		// to avoid inconsistent state in some edge cases.
    	  		this._handlers = [];
    	  		this._layers = {};
    	  		this._zoomBoundLayers = {};
    	  		this._sizeChanged = true;

    	  		this._initContainer(id);
    	  		this._initLayout();

    	  		// hack for https://github.com/Leaflet/Leaflet/issues/1980
    	  		this._onResize = bind(this._onResize, this);

    	  		this._initEvents();

    	  		if (options.maxBounds) {
    	  			this.setMaxBounds(options.maxBounds);
    	  		}

    	  		if (options.zoom !== undefined) {
    	  			this._zoom = this._limitZoom(options.zoom);
    	  		}

    	  		if (options.center && options.zoom !== undefined) {
    	  			this.setView(toLatLng(options.center), options.zoom, {reset: true});
    	  		}

    	  		this.callInitHooks();

    	  		// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
    	  		this._zoomAnimated = TRANSITION && Browser.any3d && !Browser.mobileOpera &&
    	  				this.options.zoomAnimation;

    	  		// zoom transitions run with the same duration for all layers, so if one of transitionend events
    	  		// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
    	  		if (this._zoomAnimated) {
    	  			this._createAnimProxy();
    	  			on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
    	  		}

    	  		this._addLayers(this.options.layers);
    	  	},


    	  	// @section Methods for modifying map state

    	  	// @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
    	  	// Sets the view of the map (geographical center and zoom) with the given
    	  	// animation options.
    	  	setView: function (center, zoom, options) {

    	  		zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
    	  		center = this._limitCenter(toLatLng(center), zoom, this.options.maxBounds);
    	  		options = options || {};

    	  		this._stop();

    	  		if (this._loaded && !options.reset && options !== true) {

    	  			if (options.animate !== undefined) {
    	  				options.zoom = extend({animate: options.animate}, options.zoom);
    	  				options.pan = extend({animate: options.animate, duration: options.duration}, options.pan);
    	  			}

    	  			// try animating pan or zoom
    	  			var moved = (this._zoom !== zoom) ?
    	  				this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
    	  				this._tryAnimatedPan(center, options.pan);

    	  			if (moved) {
    	  				// prevent resize handler call, the view will refresh after animation anyway
    	  				clearTimeout(this._sizeTimer);
    	  				return this;
    	  			}
    	  		}

    	  		// animation didn't start, just reset the map view
    	  		this._resetView(center, zoom, options.pan && options.pan.noMoveStart);

    	  		return this;
    	  	},

    	  	// @method setZoom(zoom: Number, options?: Zoom/pan options): this
    	  	// Sets the zoom of the map.
    	  	setZoom: function (zoom, options) {
    	  		if (!this._loaded) {
    	  			this._zoom = zoom;
    	  			return this;
    	  		}
    	  		return this.setView(this.getCenter(), zoom, {zoom: options});
    	  	},

    	  	// @method zoomIn(delta?: Number, options?: Zoom options): this
    	  	// Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
    	  	zoomIn: function (delta, options) {
    	  		delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
    	  		return this.setZoom(this._zoom + delta, options);
    	  	},

    	  	// @method zoomOut(delta?: Number, options?: Zoom options): this
    	  	// Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
    	  	zoomOut: function (delta, options) {
    	  		delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
    	  		return this.setZoom(this._zoom - delta, options);
    	  	},

    	  	// @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
    	  	// Zooms the map while keeping a specified geographical point on the map
    	  	// stationary (e.g. used internally for scroll zoom and double-click zoom).
    	  	// @alternative
    	  	// @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
    	  	// Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
    	  	setZoomAround: function (latlng, zoom, options) {
    	  		var scale = this.getZoomScale(zoom),
    	  		    viewHalf = this.getSize().divideBy(2),
    	  		    containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng),

    	  		    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
    	  		    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));

    	  		return this.setView(newCenter, zoom, {zoom: options});
    	  	},

    	  	_getBoundsCenterZoom: function (bounds, options) {

    	  		options = options || {};
    	  		bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);

    	  		var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]),
    	  		    paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]),

    	  		    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));

    	  		zoom = (typeof options.maxZoom === 'number') ? Math.min(options.maxZoom, zoom) : zoom;

    	  		if (zoom === Infinity) {
    	  			return {
    	  				center: bounds.getCenter(),
    	  				zoom: zoom
    	  			};
    	  		}

    	  		var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

    	  		    swPoint = this.project(bounds.getSouthWest(), zoom),
    	  		    nePoint = this.project(bounds.getNorthEast(), zoom),
    	  		    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

    	  		return {
    	  			center: center,
    	  			zoom: zoom
    	  		};
    	  	},

    	  	// @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
    	  	// Sets a map view that contains the given geographical bounds with the
    	  	// maximum zoom level possible.
    	  	fitBounds: function (bounds, options) {

    	  		bounds = toLatLngBounds(bounds);

    	  		if (!bounds.isValid()) {
    	  			throw new Error('Bounds are not valid.');
    	  		}

    	  		var target = this._getBoundsCenterZoom(bounds, options);
    	  		return this.setView(target.center, target.zoom, options);
    	  	},

    	  	// @method fitWorld(options?: fitBounds options): this
    	  	// Sets a map view that mostly contains the whole world with the maximum
    	  	// zoom level possible.
    	  	fitWorld: function (options) {
    	  		return this.fitBounds([[-90, -180], [90, 180]], options);
    	  	},

    	  	// @method panTo(latlng: LatLng, options?: Pan options): this
    	  	// Pans the map to a given center.
    	  	panTo: function (center, options) { // (LatLng)
    	  		return this.setView(center, this._zoom, {pan: options});
    	  	},

    	  	// @method panBy(offset: Point, options?: Pan options): this
    	  	// Pans the map by a given number of pixels (animated).
    	  	panBy: function (offset, options) {
    	  		offset = toPoint(offset).round();
    	  		options = options || {};

    	  		if (!offset.x && !offset.y) {
    	  			return this.fire('moveend');
    	  		}
    	  		// If we pan too far, Chrome gets issues with tiles
    	  		// and makes them disappear or appear in the wrong place (slightly offset) #2602
    	  		if (options.animate !== true && !this.getSize().contains(offset)) {
    	  			this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
    	  			return this;
    	  		}

    	  		if (!this._panAnim) {
    	  			this._panAnim = new PosAnimation();

    	  			this._panAnim.on({
    	  				'step': this._onPanTransitionStep,
    	  				'end': this._onPanTransitionEnd
    	  			}, this);
    	  		}

    	  		// don't fire movestart if animating inertia
    	  		if (!options.noMoveStart) {
    	  			this.fire('movestart');
    	  		}

    	  		// animate pan unless animate: false specified
    	  		if (options.animate !== false) {
    	  			addClass(this._mapPane, 'leaflet-pan-anim');

    	  			var newPos = this._getMapPanePos().subtract(offset).round();
    	  			this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
    	  		} else {
    	  			this._rawPanBy(offset);
    	  			this.fire('move').fire('moveend');
    	  		}

    	  		return this;
    	  	},

    	  	// @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
    	  	// Sets the view of the map (geographical center and zoom) performing a smooth
    	  	// pan-zoom animation.
    	  	flyTo: function (targetCenter, targetZoom, options) {

    	  		options = options || {};
    	  		if (options.animate === false || !Browser.any3d) {
    	  			return this.setView(targetCenter, targetZoom, options);
    	  		}

    	  		this._stop();

    	  		var from = this.project(this.getCenter()),
    	  		    to = this.project(targetCenter),
    	  		    size = this.getSize(),
    	  		    startZoom = this._zoom;

    	  		targetCenter = toLatLng(targetCenter);
    	  		targetZoom = targetZoom === undefined ? startZoom : targetZoom;

    	  		var w0 = Math.max(size.x, size.y),
    	  		    w1 = w0 * this.getZoomScale(startZoom, targetZoom),
    	  		    u1 = (to.distanceTo(from)) || 1,
    	  		    rho = 1.42,
    	  		    rho2 = rho * rho;

    	  		function r(i) {
    	  			var s1 = i ? -1 : 1,
    	  			    s2 = i ? w1 : w0,
    	  			    t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1,
    	  			    b1 = 2 * s2 * rho2 * u1,
    	  			    b = t1 / b1,
    	  			    sq = Math.sqrt(b * b + 1) - b;

    	  			    // workaround for floating point precision bug when sq = 0, log = -Infinite,
    	  			    // thus triggering an infinite loop in flyTo
    	  			    var log = sq < 0.000000001 ? -18 : Math.log(sq);

    	  			return log;
    	  		}

    	  		function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
    	  		function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
    	  		function tanh(n) { return sinh(n) / cosh(n); }

    	  		var r0 = r(0);

    	  		function w(s) { return w0 * (cosh(r0) / cosh(r0 + rho * s)); }
    	  		function u(s) { return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2; }

    	  		function easeOut(t) { return 1 - Math.pow(1 - t, 1.5); }

    	  		var start = Date.now(),
    	  		    S = (r(1) - r0) / rho,
    	  		    duration = options.duration ? 1000 * options.duration : 1000 * S * 0.8;

    	  		function frame() {
    	  			var t = (Date.now() - start) / duration,
    	  			    s = easeOut(t) * S;

    	  			if (t <= 1) {
    	  				this._flyToFrame = requestAnimFrame(frame, this);

    	  				this._move(
    	  					this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
    	  					this.getScaleZoom(w0 / w(s), startZoom),
    	  					{flyTo: true});

    	  			} else {
    	  				this
    	  					._move(targetCenter, targetZoom)
    	  					._moveEnd(true);
    	  			}
    	  		}

    	  		this._moveStart(true, options.noMoveStart);

    	  		frame.call(this);
    	  		return this;
    	  	},

    	  	// @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
    	  	// Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
    	  	// but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
    	  	flyToBounds: function (bounds, options) {
    	  		var target = this._getBoundsCenterZoom(bounds, options);
    	  		return this.flyTo(target.center, target.zoom, options);
    	  	},

    	  	// @method setMaxBounds(bounds: LatLngBounds): this
    	  	// Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
    	  	setMaxBounds: function (bounds) {
    	  		bounds = toLatLngBounds(bounds);

    	  		if (this.listens('moveend', this._panInsideMaxBounds)) {
    	  			this.off('moveend', this._panInsideMaxBounds);
    	  		}

    	  		if (!bounds.isValid()) {
    	  			this.options.maxBounds = null;
    	  			return this;
    	  		}

    	  		this.options.maxBounds = bounds;

    	  		if (this._loaded) {
    	  			this._panInsideMaxBounds();
    	  		}

    	  		return this.on('moveend', this._panInsideMaxBounds);
    	  	},

    	  	// @method setMinZoom(zoom: Number): this
    	  	// Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
    	  	setMinZoom: function (zoom) {
    	  		var oldZoom = this.options.minZoom;
    	  		this.options.minZoom = zoom;

    	  		if (this._loaded && oldZoom !== zoom) {
    	  			this.fire('zoomlevelschange');

    	  			if (this.getZoom() < this.options.minZoom) {
    	  				return this.setZoom(zoom);
    	  			}
    	  		}

    	  		return this;
    	  	},

    	  	// @method setMaxZoom(zoom: Number): this
    	  	// Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
    	  	setMaxZoom: function (zoom) {
    	  		var oldZoom = this.options.maxZoom;
    	  		this.options.maxZoom = zoom;

    	  		if (this._loaded && oldZoom !== zoom) {
    	  			this.fire('zoomlevelschange');

    	  			if (this.getZoom() > this.options.maxZoom) {
    	  				return this.setZoom(zoom);
    	  			}
    	  		}

    	  		return this;
    	  	},

    	  	// @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
    	  	// Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
    	  	panInsideBounds: function (bounds, options) {
    	  		this._enforcingBounds = true;
    	  		var center = this.getCenter(),
    	  		    newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));

    	  		if (!center.equals(newCenter)) {
    	  			this.panTo(newCenter, options);
    	  		}

    	  		this._enforcingBounds = false;
    	  		return this;
    	  	},

    	  	// @method panInside(latlng: LatLng, options?: padding options): this
    	  	// Pans the map the minimum amount to make the `latlng` visible. Use
    	  	// padding options to fit the display to more restricted bounds.
    	  	// If `latlng` is already within the (optionally padded) display bounds,
    	  	// the map will not be panned.
    	  	panInside: function (latlng, options) {
    	  		options = options || {};

    	  		var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]),
    	  		    paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]),
    	  		    pixelCenter = this.project(this.getCenter()),
    	  		    pixelPoint = this.project(latlng),
    	  		    pixelBounds = this.getPixelBounds(),
    	  		    paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]),
    	  		    paddedSize = paddedBounds.getSize();

    	  		if (!paddedBounds.contains(pixelPoint)) {
    	  			this._enforcingBounds = true;
    	  			var centerOffset = pixelPoint.subtract(paddedBounds.getCenter());
    	  			var offset = paddedBounds.extend(pixelPoint).getSize().subtract(paddedSize);
    	  			pixelCenter.x += centerOffset.x < 0 ? -offset.x : offset.x;
    	  			pixelCenter.y += centerOffset.y < 0 ? -offset.y : offset.y;
    	  			this.panTo(this.unproject(pixelCenter), options);
    	  			this._enforcingBounds = false;
    	  		}
    	  		return this;
    	  	},

    	  	// @method invalidateSize(options: Zoom/pan options): this
    	  	// Checks if the map container size changed and updates the map if so —
    	  	// call it after you've changed the map size dynamically, also animating
    	  	// pan by default. If `options.pan` is `false`, panning will not occur.
    	  	// If `options.debounceMoveend` is `true`, it will delay `moveend` event so
    	  	// that it doesn't happen often even if the method is called many
    	  	// times in a row.

    	  	// @alternative
    	  	// @method invalidateSize(animate: Boolean): this
    	  	// Checks if the map container size changed and updates the map if so —
    	  	// call it after you've changed the map size dynamically, also animating
    	  	// pan by default.
    	  	invalidateSize: function (options) {
    	  		if (!this._loaded) { return this; }

    	  		options = extend({
    	  			animate: false,
    	  			pan: true
    	  		}, options === true ? {animate: true} : options);

    	  		var oldSize = this.getSize();
    	  		this._sizeChanged = true;
    	  		this._lastCenter = null;

    	  		var newSize = this.getSize(),
    	  		    oldCenter = oldSize.divideBy(2).round(),
    	  		    newCenter = newSize.divideBy(2).round(),
    	  		    offset = oldCenter.subtract(newCenter);

    	  		if (!offset.x && !offset.y) { return this; }

    	  		if (options.animate && options.pan) {
    	  			this.panBy(offset);

    	  		} else {
    	  			if (options.pan) {
    	  				this._rawPanBy(offset);
    	  			}

    	  			this.fire('move');

    	  			if (options.debounceMoveend) {
    	  				clearTimeout(this._sizeTimer);
    	  				this._sizeTimer = setTimeout(bind(this.fire, this, 'moveend'), 200);
    	  			} else {
    	  				this.fire('moveend');
    	  			}
    	  		}

    	  		// @section Map state change events
    	  		// @event resize: ResizeEvent
    	  		// Fired when the map is resized.
    	  		return this.fire('resize', {
    	  			oldSize: oldSize,
    	  			newSize: newSize
    	  		});
    	  	},

    	  	// @section Methods for modifying map state
    	  	// @method stop(): this
    	  	// Stops the currently running `panTo` or `flyTo` animation, if any.
    	  	stop: function () {
    	  		this.setZoom(this._limitZoom(this._zoom));
    	  		if (!this.options.zoomSnap) {
    	  			this.fire('viewreset');
    	  		}
    	  		return this._stop();
    	  	},

    	  	// @section Geolocation methods
    	  	// @method locate(options?: Locate options): this
    	  	// Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
    	  	// event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
    	  	// and optionally sets the map view to the user's location with respect to
    	  	// detection accuracy (or to the world view if geolocation failed).
    	  	// Note that, if your page doesn't use HTTPS, this method will fail in
    	  	// modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
    	  	// See `Locate options` for more details.
    	  	locate: function (options) {

    	  		options = this._locateOptions = extend({
    	  			timeout: 10000,
    	  			watch: false
    	  			// setView: false
    	  			// maxZoom: <Number>
    	  			// maximumAge: 0
    	  			// enableHighAccuracy: false
    	  		}, options);

    	  		if (!('geolocation' in navigator)) {
    	  			this._handleGeolocationError({
    	  				code: 0,
    	  				message: 'Geolocation not supported.'
    	  			});
    	  			return this;
    	  		}

    	  		var onResponse = bind(this._handleGeolocationResponse, this),
    	  		    onError = bind(this._handleGeolocationError, this);

    	  		if (options.watch) {
    	  			this._locationWatchId =
    	  			        navigator.geolocation.watchPosition(onResponse, onError, options);
    	  		} else {
    	  			navigator.geolocation.getCurrentPosition(onResponse, onError, options);
    	  		}
    	  		return this;
    	  	},

    	  	// @method stopLocate(): this
    	  	// Stops watching location previously initiated by `map.locate({watch: true})`
    	  	// and aborts resetting the map view if map.locate was called with
    	  	// `{setView: true}`.
    	  	stopLocate: function () {
    	  		if (navigator.geolocation && navigator.geolocation.clearWatch) {
    	  			navigator.geolocation.clearWatch(this._locationWatchId);
    	  		}
    	  		if (this._locateOptions) {
    	  			this._locateOptions.setView = false;
    	  		}
    	  		return this;
    	  	},

    	  	_handleGeolocationError: function (error) {
    	  		if (!this._container._leaflet_id) { return; }

    	  		var c = error.code,
    	  		    message = error.message ||
    	  		            (c === 1 ? 'permission denied' :
    	  		            (c === 2 ? 'position unavailable' : 'timeout'));

    	  		if (this._locateOptions.setView && !this._loaded) {
    	  			this.fitWorld();
    	  		}

    	  		// @section Location events
    	  		// @event locationerror: ErrorEvent
    	  		// Fired when geolocation (using the [`locate`](#map-locate) method) failed.
    	  		this.fire('locationerror', {
    	  			code: c,
    	  			message: 'Geolocation error: ' + message + '.'
    	  		});
    	  	},

    	  	_handleGeolocationResponse: function (pos) {
    	  		if (!this._container._leaflet_id) { return; }

    	  		var lat = pos.coords.latitude,
    	  		    lng = pos.coords.longitude,
    	  		    latlng = new LatLng(lat, lng),
    	  		    bounds = latlng.toBounds(pos.coords.accuracy * 2),
    	  		    options = this._locateOptions;

    	  		if (options.setView) {
    	  			var zoom = this.getBoundsZoom(bounds);
    	  			this.setView(latlng, options.maxZoom ? Math.min(zoom, options.maxZoom) : zoom);
    	  		}

    	  		var data = {
    	  			latlng: latlng,
    	  			bounds: bounds,
    	  			timestamp: pos.timestamp
    	  		};

    	  		for (var i in pos.coords) {
    	  			if (typeof pos.coords[i] === 'number') {
    	  				data[i] = pos.coords[i];
    	  			}
    	  		}

    	  		// @event locationfound: LocationEvent
    	  		// Fired when geolocation (using the [`locate`](#map-locate) method)
    	  		// went successfully.
    	  		this.fire('locationfound', data);
    	  	},

    	  	// TODO Appropriate docs section?
    	  	// @section Other Methods
    	  	// @method addHandler(name: String, HandlerClass: Function): this
    	  	// Adds a new `Handler` to the map, given its name and constructor function.
    	  	addHandler: function (name, HandlerClass) {
    	  		if (!HandlerClass) { return this; }

    	  		var handler = this[name] = new HandlerClass(this);

    	  		this._handlers.push(handler);

    	  		if (this.options[name]) {
    	  			handler.enable();
    	  		}

    	  		return this;
    	  	},

    	  	// @method remove(): this
    	  	// Destroys the map and clears all related event listeners.
    	  	remove: function () {

    	  		this._initEvents(true);
    	  		if (this.options.maxBounds) { this.off('moveend', this._panInsideMaxBounds); }

    	  		if (this._containerId !== this._container._leaflet_id) {
    	  			throw new Error('Map container is being reused by another instance');
    	  		}

    	  		try {
    	  			// throws error in IE6-8
    	  			delete this._container._leaflet_id;
    	  			delete this._containerId;
    	  		} catch (e) {
    	  			/*eslint-disable */
    	  			this._container._leaflet_id = undefined;
    	  			/* eslint-enable */
    	  			this._containerId = undefined;
    	  		}

    	  		if (this._locationWatchId !== undefined) {
    	  			this.stopLocate();
    	  		}

    	  		this._stop();

    	  		remove(this._mapPane);

    	  		if (this._clearControlPos) {
    	  			this._clearControlPos();
    	  		}
    	  		if (this._resizeRequest) {
    	  			cancelAnimFrame(this._resizeRequest);
    	  			this._resizeRequest = null;
    	  		}

    	  		this._clearHandlers();

    	  		if (this._loaded) {
    	  			// @section Map state change events
    	  			// @event unload: Event
    	  			// Fired when the map is destroyed with [remove](#map-remove) method.
    	  			this.fire('unload');
    	  		}

    	  		var i;
    	  		for (i in this._layers) {
    	  			this._layers[i].remove();
    	  		}
    	  		for (i in this._panes) {
    	  			remove(this._panes[i]);
    	  		}

    	  		this._layers = [];
    	  		this._panes = [];
    	  		delete this._mapPane;
    	  		delete this._renderer;

    	  		return this;
    	  	},

    	  	// @section Other Methods
    	  	// @method createPane(name: String, container?: HTMLElement): HTMLElement
    	  	// Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
    	  	// then returns it. The pane is created as a child of `container`, or
    	  	// as a child of the main map pane if not set.
    	  	createPane: function (name, container) {
    	  		var className = 'leaflet-pane' + (name ? ' leaflet-' + name.replace('Pane', '') + '-pane' : ''),
    	  		    pane = create$1('div', className, container || this._mapPane);

    	  		if (name) {
    	  			this._panes[name] = pane;
    	  		}
    	  		return pane;
    	  	},

    	  	// @section Methods for Getting Map State

    	  	// @method getCenter(): LatLng
    	  	// Returns the geographical center of the map view
    	  	getCenter: function () {
    	  		this._checkIfLoaded();

    	  		if (this._lastCenter && !this._moved()) {
    	  			return this._lastCenter.clone();
    	  		}
    	  		return this.layerPointToLatLng(this._getCenterLayerPoint());
    	  	},

    	  	// @method getZoom(): Number
    	  	// Returns the current zoom level of the map view
    	  	getZoom: function () {
    	  		return this._zoom;
    	  	},

    	  	// @method getBounds(): LatLngBounds
    	  	// Returns the geographical bounds visible in the current map view
    	  	getBounds: function () {
    	  		var bounds = this.getPixelBounds(),
    	  		    sw = this.unproject(bounds.getBottomLeft()),
    	  		    ne = this.unproject(bounds.getTopRight());

    	  		return new LatLngBounds(sw, ne);
    	  	},

    	  	// @method getMinZoom(): Number
    	  	// Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
    	  	getMinZoom: function () {
    	  		return this.options.minZoom === undefined ? this._layersMinZoom || 0 : this.options.minZoom;
    	  	},

    	  	// @method getMaxZoom(): Number
    	  	// Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
    	  	getMaxZoom: function () {
    	  		return this.options.maxZoom === undefined ?
    	  			(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
    	  			this.options.maxZoom;
    	  	},

    	  	// @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
    	  	// Returns the maximum zoom level on which the given bounds fit to the map
    	  	// view in its entirety. If `inside` (optional) is set to `true`, the method
    	  	// instead returns the minimum zoom level on which the map view fits into
    	  	// the given bounds in its entirety.
    	  	getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
    	  		bounds = toLatLngBounds(bounds);
    	  		padding = toPoint(padding || [0, 0]);

    	  		var zoom = this.getZoom() || 0,
    	  		    min = this.getMinZoom(),
    	  		    max = this.getMaxZoom(),
    	  		    nw = bounds.getNorthWest(),
    	  		    se = bounds.getSouthEast(),
    	  		    size = this.getSize().subtract(padding),
    	  		    boundsSize = toBounds(this.project(se, zoom), this.project(nw, zoom)).getSize(),
    	  		    snap = Browser.any3d ? this.options.zoomSnap : 1,
    	  		    scalex = size.x / boundsSize.x,
    	  		    scaley = size.y / boundsSize.y,
    	  		    scale = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);

    	  		zoom = this.getScaleZoom(scale, zoom);

    	  		if (snap) {
    	  			zoom = Math.round(zoom / (snap / 100)) * (snap / 100); // don't jump if within 1% of a snap level
    	  			zoom = inside ? Math.ceil(zoom / snap) * snap : Math.floor(zoom / snap) * snap;
    	  		}

    	  		return Math.max(min, Math.min(max, zoom));
    	  	},

    	  	// @method getSize(): Point
    	  	// Returns the current size of the map container (in pixels).
    	  	getSize: function () {
    	  		if (!this._size || this._sizeChanged) {
    	  			this._size = new Point(
    	  				this._container.clientWidth || 0,
    	  				this._container.clientHeight || 0);

    	  			this._sizeChanged = false;
    	  		}
    	  		return this._size.clone();
    	  	},

    	  	// @method getPixelBounds(): Bounds
    	  	// Returns the bounds of the current map view in projected pixel
    	  	// coordinates (sometimes useful in layer and overlay implementations).
    	  	getPixelBounds: function (center, zoom) {
    	  		var topLeftPoint = this._getTopLeftPoint(center, zoom);
    	  		return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
    	  	},

    	  	// TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
    	  	// the map pane? "left point of the map layer" can be confusing, specially
    	  	// since there can be negative offsets.
    	  	// @method getPixelOrigin(): Point
    	  	// Returns the projected pixel coordinates of the top left point of
    	  	// the map layer (useful in custom layer and overlay implementations).
    	  	getPixelOrigin: function () {
    	  		this._checkIfLoaded();
    	  		return this._pixelOrigin;
    	  	},

    	  	// @method getPixelWorldBounds(zoom?: Number): Bounds
    	  	// Returns the world's bounds in pixel coordinates for zoom level `zoom`.
    	  	// If `zoom` is omitted, the map's current zoom level is used.
    	  	getPixelWorldBounds: function (zoom) {
    	  		return this.options.crs.getProjectedBounds(zoom === undefined ? this.getZoom() : zoom);
    	  	},

    	  	// @section Other Methods

    	  	// @method getPane(pane: String|HTMLElement): HTMLElement
    	  	// Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
    	  	getPane: function (pane) {
    	  		return typeof pane === 'string' ? this._panes[pane] : pane;
    	  	},

    	  	// @method getPanes(): Object
    	  	// Returns a plain object containing the names of all [panes](#map-pane) as keys and
    	  	// the panes as values.
    	  	getPanes: function () {
    	  		return this._panes;
    	  	},

    	  	// @method getContainer: HTMLElement
    	  	// Returns the HTML element that contains the map.
    	  	getContainer: function () {
    	  		return this._container;
    	  	},


    	  	// @section Conversion Methods

    	  	// @method getZoomScale(toZoom: Number, fromZoom: Number): Number
    	  	// Returns the scale factor to be applied to a map transition from zoom level
    	  	// `fromZoom` to `toZoom`. Used internally to help with zoom animations.
    	  	getZoomScale: function (toZoom, fromZoom) {
    	  		// TODO replace with universal implementation after refactoring projections
    	  		var crs = this.options.crs;
    	  		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
    	  		return crs.scale(toZoom) / crs.scale(fromZoom);
    	  	},

    	  	// @method getScaleZoom(scale: Number, fromZoom: Number): Number
    	  	// Returns the zoom level that the map would end up at, if it is at `fromZoom`
    	  	// level and everything is scaled by a factor of `scale`. Inverse of
    	  	// [`getZoomScale`](#map-getZoomScale).
    	  	getScaleZoom: function (scale, fromZoom) {
    	  		var crs = this.options.crs;
    	  		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
    	  		var zoom = crs.zoom(scale * crs.scale(fromZoom));
    	  		return isNaN(zoom) ? Infinity : zoom;
    	  	},

    	  	// @method project(latlng: LatLng, zoom: Number): Point
    	  	// Projects a geographical coordinate `LatLng` according to the projection
    	  	// of the map's CRS, then scales it according to `zoom` and the CRS's
    	  	// `Transformation`. The result is pixel coordinate relative to
    	  	// the CRS origin.
    	  	project: function (latlng, zoom) {
    	  		zoom = zoom === undefined ? this._zoom : zoom;
    	  		return this.options.crs.latLngToPoint(toLatLng(latlng), zoom);
    	  	},

    	  	// @method unproject(point: Point, zoom: Number): LatLng
    	  	// Inverse of [`project`](#map-project).
    	  	unproject: function (point, zoom) {
    	  		zoom = zoom === undefined ? this._zoom : zoom;
    	  		return this.options.crs.pointToLatLng(toPoint(point), zoom);
    	  	},

    	  	// @method layerPointToLatLng(point: Point): LatLng
    	  	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
    	  	// returns the corresponding geographical coordinate (for the current zoom level).
    	  	layerPointToLatLng: function (point) {
    	  		var projectedPoint = toPoint(point).add(this.getPixelOrigin());
    	  		return this.unproject(projectedPoint);
    	  	},

    	  	// @method latLngToLayerPoint(latlng: LatLng): Point
    	  	// Given a geographical coordinate, returns the corresponding pixel coordinate
    	  	// relative to the [origin pixel](#map-getpixelorigin).
    	  	latLngToLayerPoint: function (latlng) {
    	  		var projectedPoint = this.project(toLatLng(latlng))._round();
    	  		return projectedPoint._subtract(this.getPixelOrigin());
    	  	},

    	  	// @method wrapLatLng(latlng: LatLng): LatLng
    	  	// Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
    	  	// map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
    	  	// CRS's bounds.
    	  	// By default this means longitude is wrapped around the dateline so its
    	  	// value is between -180 and +180 degrees.
    	  	wrapLatLng: function (latlng) {
    	  		return this.options.crs.wrapLatLng(toLatLng(latlng));
    	  	},

    	  	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
    	  	// Returns a `LatLngBounds` with the same size as the given one, ensuring that
    	  	// its center is within the CRS's bounds.
    	  	// By default this means the center longitude is wrapped around the dateline so its
    	  	// value is between -180 and +180 degrees, and the majority of the bounds
    	  	// overlaps the CRS's bounds.
    	  	wrapLatLngBounds: function (latlng) {
    	  		return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
    	  	},

    	  	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
    	  	// Returns the distance between two geographical coordinates according to
    	  	// the map's CRS. By default this measures distance in meters.
    	  	distance: function (latlng1, latlng2) {
    	  		return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
    	  	},

    	  	// @method containerPointToLayerPoint(point: Point): Point
    	  	// Given a pixel coordinate relative to the map container, returns the corresponding
    	  	// pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
    	  	containerPointToLayerPoint: function (point) { // (Point)
    	  		return toPoint(point).subtract(this._getMapPanePos());
    	  	},

    	  	// @method layerPointToContainerPoint(point: Point): Point
    	  	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
    	  	// returns the corresponding pixel coordinate relative to the map container.
    	  	layerPointToContainerPoint: function (point) { // (Point)
    	  		return toPoint(point).add(this._getMapPanePos());
    	  	},

    	  	// @method containerPointToLatLng(point: Point): LatLng
    	  	// Given a pixel coordinate relative to the map container, returns
    	  	// the corresponding geographical coordinate (for the current zoom level).
    	  	containerPointToLatLng: function (point) {
    	  		var layerPoint = this.containerPointToLayerPoint(toPoint(point));
    	  		return this.layerPointToLatLng(layerPoint);
    	  	},

    	  	// @method latLngToContainerPoint(latlng: LatLng): Point
    	  	// Given a geographical coordinate, returns the corresponding pixel coordinate
    	  	// relative to the map container.
    	  	latLngToContainerPoint: function (latlng) {
    	  		return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
    	  	},

    	  	// @method mouseEventToContainerPoint(ev: MouseEvent): Point
    	  	// Given a MouseEvent object, returns the pixel coordinate relative to the
    	  	// map container where the event took place.
    	  	mouseEventToContainerPoint: function (e) {
    	  		return getMousePosition(e, this._container);
    	  	},

    	  	// @method mouseEventToLayerPoint(ev: MouseEvent): Point
    	  	// Given a MouseEvent object, returns the pixel coordinate relative to
    	  	// the [origin pixel](#map-getpixelorigin) where the event took place.
    	  	mouseEventToLayerPoint: function (e) {
    	  		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
    	  	},

    	  	// @method mouseEventToLatLng(ev: MouseEvent): LatLng
    	  	// Given a MouseEvent object, returns geographical coordinate where the
    	  	// event took place.
    	  	mouseEventToLatLng: function (e) { // (MouseEvent)
    	  		return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
    	  	},


    	  	// map initialization methods

    	  	_initContainer: function (id) {
    	  		var container = this._container = get(id);

    	  		if (!container) {
    	  			throw new Error('Map container not found.');
    	  		} else if (container._leaflet_id) {
    	  			throw new Error('Map container is already initialized.');
    	  		}

    	  		on(container, 'scroll', this._onScroll, this);
    	  		this._containerId = stamp(container);
    	  	},

    	  	_initLayout: function () {
    	  		var container = this._container;

    	  		this._fadeAnimated = this.options.fadeAnimation && Browser.any3d;

    	  		addClass(container, 'leaflet-container' +
    	  			(Browser.touch ? ' leaflet-touch' : '') +
    	  			(Browser.retina ? ' leaflet-retina' : '') +
    	  			(Browser.ielt9 ? ' leaflet-oldie' : '') +
    	  			(Browser.safari ? ' leaflet-safari' : '') +
    	  			(this._fadeAnimated ? ' leaflet-fade-anim' : ''));

    	  		var position = getStyle(container, 'position');

    	  		if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
    	  			container.style.position = 'relative';
    	  		}

    	  		this._initPanes();

    	  		if (this._initControlPos) {
    	  			this._initControlPos();
    	  		}
    	  	},

    	  	_initPanes: function () {
    	  		var panes = this._panes = {};
    	  		this._paneRenderers = {};

    	  		// @section
    	  		//
    	  		// Panes are DOM elements used to control the ordering of layers on the map. You
    	  		// can access panes with [`map.getPane`](#map-getpane) or
    	  		// [`map.getPanes`](#map-getpanes) methods. New panes can be created with the
    	  		// [`map.createPane`](#map-createpane) method.
    	  		//
    	  		// Every map has the following default panes that differ only in zIndex.
    	  		//
    	  		// @pane mapPane: HTMLElement = 'auto'
    	  		// Pane that contains all other map panes

    	  		this._mapPane = this.createPane('mapPane', this._container);
    	  		setPosition(this._mapPane, new Point(0, 0));

    	  		// @pane tilePane: HTMLElement = 200
    	  		// Pane for `GridLayer`s and `TileLayer`s
    	  		this.createPane('tilePane');
    	  		// @pane overlayPane: HTMLElement = 400
    	  		// Pane for vectors (`Path`s, like `Polyline`s and `Polygon`s), `ImageOverlay`s and `VideoOverlay`s
    	  		this.createPane('overlayPane');
    	  		// @pane shadowPane: HTMLElement = 500
    	  		// Pane for overlay shadows (e.g. `Marker` shadows)
    	  		this.createPane('shadowPane');
    	  		// @pane markerPane: HTMLElement = 600
    	  		// Pane for `Icon`s of `Marker`s
    	  		this.createPane('markerPane');
    	  		// @pane tooltipPane: HTMLElement = 650
    	  		// Pane for `Tooltip`s.
    	  		this.createPane('tooltipPane');
    	  		// @pane popupPane: HTMLElement = 700
    	  		// Pane for `Popup`s.
    	  		this.createPane('popupPane');

    	  		if (!this.options.markerZoomAnimation) {
    	  			addClass(panes.markerPane, 'leaflet-zoom-hide');
    	  			addClass(panes.shadowPane, 'leaflet-zoom-hide');
    	  		}
    	  	},


    	  	// private methods that modify map state

    	  	// @section Map state change events
    	  	_resetView: function (center, zoom, noMoveStart) {
    	  		setPosition(this._mapPane, new Point(0, 0));

    	  		var loading = !this._loaded;
    	  		this._loaded = true;
    	  		zoom = this._limitZoom(zoom);

    	  		this.fire('viewprereset');

    	  		var zoomChanged = this._zoom !== zoom;
    	  		this
    	  			._moveStart(zoomChanged, noMoveStart)
    	  			._move(center, zoom)
    	  			._moveEnd(zoomChanged);

    	  		// @event viewreset: Event
    	  		// Fired when the map needs to redraw its content (this usually happens
    	  		// on map zoom or load). Very useful for creating custom overlays.
    	  		this.fire('viewreset');

    	  		// @event load: Event
    	  		// Fired when the map is initialized (when its center and zoom are set
    	  		// for the first time).
    	  		if (loading) {
    	  			this.fire('load');
    	  		}
    	  	},

    	  	_moveStart: function (zoomChanged, noMoveStart) {
    	  		// @event zoomstart: Event
    	  		// Fired when the map zoom is about to change (e.g. before zoom animation).
    	  		// @event movestart: Event
    	  		// Fired when the view of the map starts changing (e.g. user starts dragging the map).
    	  		if (zoomChanged) {
    	  			this.fire('zoomstart');
    	  		}
    	  		if (!noMoveStart) {
    	  			this.fire('movestart');
    	  		}
    	  		return this;
    	  	},

    	  	_move: function (center, zoom, data, supressEvent) {
    	  		if (zoom === undefined) {
    	  			zoom = this._zoom;
    	  		}
    	  		var zoomChanged = this._zoom !== zoom;

    	  		this._zoom = zoom;
    	  		this._lastCenter = center;
    	  		this._pixelOrigin = this._getNewPixelOrigin(center);

    	  		if (!supressEvent) {
    	  			// @event zoom: Event
    	  			// Fired repeatedly during any change in zoom level,
    	  			// including zoom and fly animations.
    	  			if (zoomChanged || (data && data.pinch)) {	// Always fire 'zoom' if pinching because #3530
    	  				this.fire('zoom', data);
    	  			}

    	  			// @event move: Event
    	  			// Fired repeatedly during any movement of the map,
    	  			// including pan and fly animations.
    	  			this.fire('move', data);
    	  		} else if (data && data.pinch) {	// Always fire 'zoom' if pinching because #3530
    	  			this.fire('zoom', data);
    	  		}
    	  		return this;
    	  	},

    	  	_moveEnd: function (zoomChanged) {
    	  		// @event zoomend: Event
    	  		// Fired when the map zoom changed, after any animations.
    	  		if (zoomChanged) {
    	  			this.fire('zoomend');
    	  		}

    	  		// @event moveend: Event
    	  		// Fired when the center of the map stops changing
    	  		// (e.g. user stopped dragging the map or after non-centered zoom).
    	  		return this.fire('moveend');
    	  	},

    	  	_stop: function () {
    	  		cancelAnimFrame(this._flyToFrame);
    	  		if (this._panAnim) {
    	  			this._panAnim.stop();
    	  		}
    	  		return this;
    	  	},

    	  	_rawPanBy: function (offset) {
    	  		setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
    	  	},

    	  	_getZoomSpan: function () {
    	  		return this.getMaxZoom() - this.getMinZoom();
    	  	},

    	  	_panInsideMaxBounds: function () {
    	  		if (!this._enforcingBounds) {
    	  			this.panInsideBounds(this.options.maxBounds);
    	  		}
    	  	},

    	  	_checkIfLoaded: function () {
    	  		if (!this._loaded) {
    	  			throw new Error('Set map center and zoom first.');
    	  		}
    	  	},

    	  	// DOM event handling

    	  	// @section Interaction events
    	  	_initEvents: function (remove) {
    	  		this._targets = {};
    	  		this._targets[stamp(this._container)] = this;

    	  		var onOff = remove ? off : on;

    	  		// @event click: MouseEvent
    	  		// Fired when the user clicks (or taps) the map.
    	  		// @event dblclick: MouseEvent
    	  		// Fired when the user double-clicks (or double-taps) the map.
    	  		// @event mousedown: MouseEvent
    	  		// Fired when the user pushes the mouse button on the map.
    	  		// @event mouseup: MouseEvent
    	  		// Fired when the user releases the mouse button on the map.
    	  		// @event mouseover: MouseEvent
    	  		// Fired when the mouse enters the map.
    	  		// @event mouseout: MouseEvent
    	  		// Fired when the mouse leaves the map.
    	  		// @event mousemove: MouseEvent
    	  		// Fired while the mouse moves over the map.
    	  		// @event contextmenu: MouseEvent
    	  		// Fired when the user pushes the right mouse button on the map, prevents
    	  		// default browser context menu from showing if there are listeners on
    	  		// this event. Also fired on mobile when the user holds a single touch
    	  		// for a second (also called long press).
    	  		// @event keypress: KeyboardEvent
    	  		// Fired when the user presses a key from the keyboard that produces a character value while the map is focused.
    	  		// @event keydown: KeyboardEvent
    	  		// Fired when the user presses a key from the keyboard while the map is focused. Unlike the `keypress` event,
    	  		// the `keydown` event is fired for keys that produce a character value and for keys
    	  		// that do not produce a character value.
    	  		// @event keyup: KeyboardEvent
    	  		// Fired when the user releases a key from the keyboard while the map is focused.
    	  		onOff(this._container, 'click dblclick mousedown mouseup ' +
    	  			'mouseover mouseout mousemove contextmenu keypress keydown keyup', this._handleDOMEvent, this);

    	  		if (this.options.trackResize) {
    	  			onOff(window, 'resize', this._onResize, this);
    	  		}

    	  		if (Browser.any3d && this.options.transform3DLimit) {
    	  			(remove ? this.off : this.on).call(this, 'moveend', this._onMoveEnd);
    	  		}
    	  	},

    	  	_onResize: function () {
    	  		cancelAnimFrame(this._resizeRequest);
    	  		this._resizeRequest = requestAnimFrame(
    	  		        function () { this.invalidateSize({debounceMoveend: true}); }, this);
    	  	},

    	  	_onScroll: function () {
    	  		this._container.scrollTop  = 0;
    	  		this._container.scrollLeft = 0;
    	  	},

    	  	_onMoveEnd: function () {
    	  		var pos = this._getMapPanePos();
    	  		if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
    	  			// https://bugzilla.mozilla.org/show_bug.cgi?id=1203873 but Webkit also have
    	  			// a pixel offset on very high values, see: https://jsfiddle.net/dg6r5hhb/
    	  			this._resetView(this.getCenter(), this.getZoom());
    	  		}
    	  	},

    	  	_findEventTargets: function (e, type) {
    	  		var targets = [],
    	  		    target,
    	  		    isHover = type === 'mouseout' || type === 'mouseover',
    	  		    src = e.target || e.srcElement,
    	  		    dragging = false;

    	  		while (src) {
    	  			target = this._targets[stamp(src)];
    	  			if (target && (type === 'click' || type === 'preclick') && this._draggableMoved(target)) {
    	  				// Prevent firing click after you just dragged an object.
    	  				dragging = true;
    	  				break;
    	  			}
    	  			if (target && target.listens(type, true)) {
    	  				if (isHover && !isExternalTarget(src, e)) { break; }
    	  				targets.push(target);
    	  				if (isHover) { break; }
    	  			}
    	  			if (src === this._container) { break; }
    	  			src = src.parentNode;
    	  		}
    	  		if (!targets.length && !dragging && !isHover && this.listens(type, true)) {
    	  			targets = [this];
    	  		}
    	  		return targets;
    	  	},

    	  	_isClickDisabled: function (el) {
    	  		while (el && el !== this._container) {
    	  			if (el['_leaflet_disable_click']) { return true; }
    	  			el = el.parentNode;
    	  		}
    	  	},

    	  	_handleDOMEvent: function (e) {
    	  		var el = (e.target || e.srcElement);
    	  		if (!this._loaded || el['_leaflet_disable_events'] || e.type === 'click' && this._isClickDisabled(el)) {
    	  			return;
    	  		}

    	  		var type = e.type;

    	  		if (type === 'mousedown') {
    	  			// prevents outline when clicking on keyboard-focusable element
    	  			preventOutline(el);
    	  		}

    	  		this._fireDOMEvent(e, type);
    	  	},

    	  	_mouseEvents: ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu'],

    	  	_fireDOMEvent: function (e, type, canvasTargets) {

    	  		if (e.type === 'click') {
    	  			// Fire a synthetic 'preclick' event which propagates up (mainly for closing popups).
    	  			// @event preclick: MouseEvent
    	  			// Fired before mouse click on the map (sometimes useful when you
    	  			// want something to happen on click before any existing click
    	  			// handlers start running).
    	  			var synth = extend({}, e);
    	  			synth.type = 'preclick';
    	  			this._fireDOMEvent(synth, synth.type, canvasTargets);
    	  		}

    	  		// Find the layer the event is propagating from and its parents.
    	  		var targets = this._findEventTargets(e, type);

    	  		if (canvasTargets) {
    	  			var filtered = []; // pick only targets with listeners
    	  			for (var i = 0; i < canvasTargets.length; i++) {
    	  				if (canvasTargets[i].listens(type, true)) {
    	  					filtered.push(canvasTargets[i]);
    	  				}
    	  			}
    	  			targets = filtered.concat(targets);
    	  		}

    	  		if (!targets.length) { return; }

    	  		if (type === 'contextmenu') {
    	  			preventDefault(e);
    	  		}

    	  		var target = targets[0];
    	  		var data = {
    	  			originalEvent: e
    	  		};

    	  		if (e.type !== 'keypress' && e.type !== 'keydown' && e.type !== 'keyup') {
    	  			var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
    	  			data.containerPoint = isMarker ?
    	  				this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
    	  			data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
    	  			data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
    	  		}

    	  		for (i = 0; i < targets.length; i++) {
    	  			targets[i].fire(type, data, true);
    	  			if (data.originalEvent._stopped ||
    	  				(targets[i].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type) !== -1)) { return; }
    	  		}
    	  	},

    	  	_draggableMoved: function (obj) {
    	  		obj = obj.dragging && obj.dragging.enabled() ? obj : this;
    	  		return (obj.dragging && obj.dragging.moved()) || (this.boxZoom && this.boxZoom.moved());
    	  	},

    	  	_clearHandlers: function () {
    	  		for (var i = 0, len = this._handlers.length; i < len; i++) {
    	  			this._handlers[i].disable();
    	  		}
    	  	},

    	  	// @section Other Methods

    	  	// @method whenReady(fn: Function, context?: Object): this
    	  	// Runs the given function `fn` when the map gets initialized with
    	  	// a view (center and zoom) and at least one layer, or immediately
    	  	// if it's already initialized, optionally passing a function context.
    	  	whenReady: function (callback, context) {
    	  		if (this._loaded) {
    	  			callback.call(context || this, {target: this});
    	  		} else {
    	  			this.on('load', callback, context);
    	  		}
    	  		return this;
    	  	},


    	  	// private methods for getting map state

    	  	_getMapPanePos: function () {
    	  		return getPosition(this._mapPane) || new Point(0, 0);
    	  	},

    	  	_moved: function () {
    	  		var pos = this._getMapPanePos();
    	  		return pos && !pos.equals([0, 0]);
    	  	},

    	  	_getTopLeftPoint: function (center, zoom) {
    	  		var pixelOrigin = center && zoom !== undefined ?
    	  			this._getNewPixelOrigin(center, zoom) :
    	  			this.getPixelOrigin();
    	  		return pixelOrigin.subtract(this._getMapPanePos());
    	  	},

    	  	_getNewPixelOrigin: function (center, zoom) {
    	  		var viewHalf = this.getSize()._divideBy(2);
    	  		return this.project(center, zoom)._subtract(viewHalf)._add(this._getMapPanePos())._round();
    	  	},

    	  	_latLngToNewLayerPoint: function (latlng, zoom, center) {
    	  		var topLeft = this._getNewPixelOrigin(center, zoom);
    	  		return this.project(latlng, zoom)._subtract(topLeft);
    	  	},

    	  	_latLngBoundsToNewLayerBounds: function (latLngBounds, zoom, center) {
    	  		var topLeft = this._getNewPixelOrigin(center, zoom);
    	  		return toBounds([
    	  			this.project(latLngBounds.getSouthWest(), zoom)._subtract(topLeft),
    	  			this.project(latLngBounds.getNorthWest(), zoom)._subtract(topLeft),
    	  			this.project(latLngBounds.getSouthEast(), zoom)._subtract(topLeft),
    	  			this.project(latLngBounds.getNorthEast(), zoom)._subtract(topLeft)
    	  		]);
    	  	},

    	  	// layer point of the current center
    	  	_getCenterLayerPoint: function () {
    	  		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
    	  	},

    	  	// offset of the specified place to the current center in pixels
    	  	_getCenterOffset: function (latlng) {
    	  		return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
    	  	},

    	  	// adjust center for view to get inside bounds
    	  	_limitCenter: function (center, zoom, bounds) {

    	  		if (!bounds) { return center; }

    	  		var centerPoint = this.project(center, zoom),
    	  		    viewHalf = this.getSize().divideBy(2),
    	  		    viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
    	  		    offset = this._getBoundsOffset(viewBounds, bounds, zoom);

    	  		// If offset is less than a pixel, ignore.
    	  		// This prevents unstable projections from getting into
    	  		// an infinite loop of tiny offsets.
    	  		if (offset.round().equals([0, 0])) {
    	  			return center;
    	  		}

    	  		return this.unproject(centerPoint.add(offset), zoom);
    	  	},

    	  	// adjust offset for view to get inside bounds
    	  	_limitOffset: function (offset, bounds) {
    	  		if (!bounds) { return offset; }

    	  		var viewBounds = this.getPixelBounds(),
    	  		    newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

    	  		return offset.add(this._getBoundsOffset(newBounds, bounds));
    	  	},

    	  	// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
    	  	_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
    	  		var projectedMaxBounds = toBounds(
    	  		        this.project(maxBounds.getNorthEast(), zoom),
    	  		        this.project(maxBounds.getSouthWest(), zoom)
    	  		    ),
    	  		    minOffset = projectedMaxBounds.min.subtract(pxBounds.min),
    	  		    maxOffset = projectedMaxBounds.max.subtract(pxBounds.max),

    	  		    dx = this._rebound(minOffset.x, -maxOffset.x),
    	  		    dy = this._rebound(minOffset.y, -maxOffset.y);

    	  		return new Point(dx, dy);
    	  	},

    	  	_rebound: function (left, right) {
    	  		return left + right > 0 ?
    	  			Math.round(left - right) / 2 :
    	  			Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
    	  	},

    	  	_limitZoom: function (zoom) {
    	  		var min = this.getMinZoom(),
    	  		    max = this.getMaxZoom(),
    	  		    snap = Browser.any3d ? this.options.zoomSnap : 1;
    	  		if (snap) {
    	  			zoom = Math.round(zoom / snap) * snap;
    	  		}
    	  		return Math.max(min, Math.min(max, zoom));
    	  	},

    	  	_onPanTransitionStep: function () {
    	  		this.fire('move');
    	  	},

    	  	_onPanTransitionEnd: function () {
    	  		removeClass(this._mapPane, 'leaflet-pan-anim');
    	  		this.fire('moveend');
    	  	},

    	  	_tryAnimatedPan: function (center, options) {
    	  		// difference between the new and current centers in pixels
    	  		var offset = this._getCenterOffset(center)._trunc();

    	  		// don't animate too far unless animate: true specified in options
    	  		if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

    	  		this.panBy(offset, options);

    	  		return true;
    	  	},

    	  	_createAnimProxy: function () {

    	  		var proxy = this._proxy = create$1('div', 'leaflet-proxy leaflet-zoom-animated');
    	  		this._panes.mapPane.appendChild(proxy);

    	  		this.on('zoomanim', function (e) {
    	  			var prop = TRANSFORM,
    	  			    transform = this._proxy.style[prop];

    	  			setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));

    	  			// workaround for case when transform is the same and so transitionend event is not fired
    	  			if (transform === this._proxy.style[prop] && this._animatingZoom) {
    	  				this._onZoomTransitionEnd();
    	  			}
    	  		}, this);

    	  		this.on('load moveend', this._animMoveEnd, this);

    	  		this._on('unload', this._destroyAnimProxy, this);
    	  	},

    	  	_destroyAnimProxy: function () {
    	  		remove(this._proxy);
    	  		this.off('load moveend', this._animMoveEnd, this);
    	  		delete this._proxy;
    	  	},

    	  	_animMoveEnd: function () {
    	  		var c = this.getCenter(),
    	  		    z = this.getZoom();
    	  		setTransform(this._proxy, this.project(c, z), this.getZoomScale(z, 1));
    	  	},

    	  	_catchTransitionEnd: function (e) {
    	  		if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
    	  			this._onZoomTransitionEnd();
    	  		}
    	  	},

    	  	_nothingToAnimate: function () {
    	  		return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
    	  	},

    	  	_tryAnimatedZoom: function (center, zoom, options) {

    	  		if (this._animatingZoom) { return true; }

    	  		options = options || {};

    	  		// don't animate if disabled, not supported or zoom difference is too large
    	  		if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
    	  		        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

    	  		// offset is the pixel coords of the zoom origin relative to the current center
    	  		var scale = this.getZoomScale(zoom),
    	  		    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale);

    	  		// don't animate if the zoom origin isn't within one screen from the current center, unless forced
    	  		if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

    	  		requestAnimFrame(function () {
    	  			this
    	  			    ._moveStart(true, false)
    	  			    ._animateZoom(center, zoom, true);
    	  		}, this);

    	  		return true;
    	  	},

    	  	_animateZoom: function (center, zoom, startAnim, noUpdate) {
    	  		if (!this._mapPane) { return; }

    	  		if (startAnim) {
    	  			this._animatingZoom = true;

    	  			// remember what center/zoom to set after animation
    	  			this._animateToCenter = center;
    	  			this._animateToZoom = zoom;

    	  			addClass(this._mapPane, 'leaflet-zoom-anim');
    	  		}

    	  		// @section Other Events
    	  		// @event zoomanim: ZoomAnimEvent
    	  		// Fired at least once per zoom animation. For continuous zoom, like pinch zooming, fired once per frame during zoom.
    	  		this.fire('zoomanim', {
    	  			center: center,
    	  			zoom: zoom,
    	  			noUpdate: noUpdate
    	  		});

    	  		if (!this._tempFireZoomEvent) {
    	  			this._tempFireZoomEvent = this._zoom !== this._animateToZoom;
    	  		}

    	  		this._move(this._animateToCenter, this._animateToZoom, undefined, true);

    	  		// Work around webkit not firing 'transitionend', see https://github.com/Leaflet/Leaflet/issues/3689, 2693
    	  		setTimeout(bind(this._onZoomTransitionEnd, this), 250);
    	  	},

    	  	_onZoomTransitionEnd: function () {
    	  		if (!this._animatingZoom) { return; }

    	  		if (this._mapPane) {
    	  			removeClass(this._mapPane, 'leaflet-zoom-anim');
    	  		}

    	  		this._animatingZoom = false;

    	  		this._move(this._animateToCenter, this._animateToZoom, undefined, true);

    	  		if (this._tempFireZoomEvent) {
    	  			this.fire('zoom');
    	  		}
    	  		delete this._tempFireZoomEvent;

    	  		this.fire('move');

    	  		this._moveEnd(true);
    	  	}
    	  });

    	  // @section

    	  // @factory L.map(id: String, options?: Map options)
    	  // Instantiates a map object given the DOM ID of a `<div>` element
    	  // and optionally an object literal with `Map options`.
    	  //
    	  // @alternative
    	  // @factory L.map(el: HTMLElement, options?: Map options)
    	  // Instantiates a map object given an instance of a `<div>` HTML element
    	  // and optionally an object literal with `Map options`.
    	  function createMap(id, options) {
    	  	return new Map(id, options);
    	  }

    	  /*
    	   * @class Control
    	   * @aka L.Control
    	   * @inherits Class
    	   *
    	   * L.Control is a base class for implementing map controls. Handles positioning.
    	   * All other controls extend from this class.
    	   */

    	  var Control = Class.extend({
    	  	// @section
    	  	// @aka Control Options
    	  	options: {
    	  		// @option position: String = 'topright'
    	  		// The position of the control (one of the map corners). Possible values are `'topleft'`,
    	  		// `'topright'`, `'bottomleft'` or `'bottomright'`
    	  		position: 'topright'
    	  	},

    	  	initialize: function (options) {
    	  		setOptions(this, options);
    	  	},

    	  	/* @section
    	  	 * Classes extending L.Control will inherit the following methods:
    	  	 *
    	  	 * @method getPosition: string
    	  	 * Returns the position of the control.
    	  	 */
    	  	getPosition: function () {
    	  		return this.options.position;
    	  	},

    	  	// @method setPosition(position: string): this
    	  	// Sets the position of the control.
    	  	setPosition: function (position) {
    	  		var map = this._map;

    	  		if (map) {
    	  			map.removeControl(this);
    	  		}

    	  		this.options.position = position;

    	  		if (map) {
    	  			map.addControl(this);
    	  		}

    	  		return this;
    	  	},

    	  	// @method getContainer: HTMLElement
    	  	// Returns the HTMLElement that contains the control.
    	  	getContainer: function () {
    	  		return this._container;
    	  	},

    	  	// @method addTo(map: Map): this
    	  	// Adds the control to the given map.
    	  	addTo: function (map) {
    	  		this.remove();
    	  		this._map = map;

    	  		var container = this._container = this.onAdd(map),
    	  		    pos = this.getPosition(),
    	  		    corner = map._controlCorners[pos];

    	  		addClass(container, 'leaflet-control');

    	  		if (pos.indexOf('bottom') !== -1) {
    	  			corner.insertBefore(container, corner.firstChild);
    	  		} else {
    	  			corner.appendChild(container);
    	  		}

    	  		this._map.on('unload', this.remove, this);

    	  		return this;
    	  	},

    	  	// @method remove: this
    	  	// Removes the control from the map it is currently active on.
    	  	remove: function () {
    	  		if (!this._map) {
    	  			return this;
    	  		}

    	  		remove(this._container);

    	  		if (this.onRemove) {
    	  			this.onRemove(this._map);
    	  		}

    	  		this._map.off('unload', this.remove, this);
    	  		this._map = null;

    	  		return this;
    	  	},

    	  	_refocusOnMap: function (e) {
    	  		// if map exists and event is not a keyboard event
    	  		if (this._map && e && e.screenX > 0 && e.screenY > 0) {
    	  			this._map.getContainer().focus();
    	  		}
    	  	}
    	  });

    	  var control = function (options) {
    	  	return new Control(options);
    	  };

    	  /* @section Extension methods
    	   * @uninheritable
    	   *
    	   * Every control should extend from `L.Control` and (re-)implement the following methods.
    	   *
    	   * @method onAdd(map: Map): HTMLElement
    	   * Should return the container DOM element for the control and add listeners on relevant map events. Called on [`control.addTo(map)`](#control-addTo).
    	   *
    	   * @method onRemove(map: Map)
    	   * Optional method. Should contain all clean up code that removes the listeners previously added in [`onAdd`](#control-onadd). Called on [`control.remove()`](#control-remove).
    	   */

    	  /* @namespace Map
    	   * @section Methods for Layers and Controls
    	   */
    	  Map.include({
    	  	// @method addControl(control: Control): this
    	  	// Adds the given control to the map
    	  	addControl: function (control) {
    	  		control.addTo(this);
    	  		return this;
    	  	},

    	  	// @method removeControl(control: Control): this
    	  	// Removes the given control from the map
    	  	removeControl: function (control) {
    	  		control.remove();
    	  		return this;
    	  	},

    	  	_initControlPos: function () {
    	  		var corners = this._controlCorners = {},
    	  		    l = 'leaflet-',
    	  		    container = this._controlContainer =
    	  		            create$1('div', l + 'control-container', this._container);

    	  		function createCorner(vSide, hSide) {
    	  			var className = l + vSide + ' ' + l + hSide;

    	  			corners[vSide + hSide] = create$1('div', className, container);
    	  		}

    	  		createCorner('top', 'left');
    	  		createCorner('top', 'right');
    	  		createCorner('bottom', 'left');
    	  		createCorner('bottom', 'right');
    	  	},

    	  	_clearControlPos: function () {
    	  		for (var i in this._controlCorners) {
    	  			remove(this._controlCorners[i]);
    	  		}
    	  		remove(this._controlContainer);
    	  		delete this._controlCorners;
    	  		delete this._controlContainer;
    	  	}
    	  });

    	  /*
    	   * @class Control.Layers
    	   * @aka L.Control.Layers
    	   * @inherits Control
    	   *
    	   * The layers control gives users the ability to switch between different base layers and switch overlays on/off (check out the [detailed example](https://leafletjs.com/examples/layers-control/)). Extends `Control`.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * var baseLayers = {
    	   * 	"Mapbox": mapbox,
    	   * 	"OpenStreetMap": osm
    	   * };
    	   *
    	   * var overlays = {
    	   * 	"Marker": marker,
    	   * 	"Roads": roadsLayer
    	   * };
    	   *
    	   * L.control.layers(baseLayers, overlays).addTo(map);
    	   * ```
    	   *
    	   * The `baseLayers` and `overlays` parameters are object literals with layer names as keys and `Layer` objects as values:
    	   *
    	   * ```js
    	   * {
    	   *     "<someName1>": layer1,
    	   *     "<someName2>": layer2
    	   * }
    	   * ```
    	   *
    	   * The layer names can contain HTML, which allows you to add additional styling to the items:
    	   *
    	   * ```js
    	   * {"<img src='my-layer-icon' /> <span class='my-layer-item'>My Layer</span>": myLayer}
    	   * ```
    	   */

    	  var Layers = Control.extend({
    	  	// @section
    	  	// @aka Control.Layers options
    	  	options: {
    	  		// @option collapsed: Boolean = true
    	  		// If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
    	  		collapsed: true,
    	  		position: 'topright',

    	  		// @option autoZIndex: Boolean = true
    	  		// If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
    	  		autoZIndex: true,

    	  		// @option hideSingleBase: Boolean = false
    	  		// If `true`, the base layers in the control will be hidden when there is only one.
    	  		hideSingleBase: false,

    	  		// @option sortLayers: Boolean = false
    	  		// Whether to sort the layers. When `false`, layers will keep the order
    	  		// in which they were added to the control.
    	  		sortLayers: false,

    	  		// @option sortFunction: Function = *
    	  		// A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
    	  		// that will be used for sorting the layers, when `sortLayers` is `true`.
    	  		// The function receives both the `L.Layer` instances and their names, as in
    	  		// `sortFunction(layerA, layerB, nameA, nameB)`.
    	  		// By default, it sorts layers alphabetically by their name.
    	  		sortFunction: function (layerA, layerB, nameA, nameB) {
    	  			return nameA < nameB ? -1 : (nameB < nameA ? 1 : 0);
    	  		}
    	  	},

    	  	initialize: function (baseLayers, overlays, options) {
    	  		setOptions(this, options);

    	  		this._layerControlInputs = [];
    	  		this._layers = [];
    	  		this._lastZIndex = 0;
    	  		this._handlingClick = false;

    	  		for (var i in baseLayers) {
    	  			this._addLayer(baseLayers[i], i);
    	  		}

    	  		for (i in overlays) {
    	  			this._addLayer(overlays[i], i, true);
    	  		}
    	  	},

    	  	onAdd: function (map) {
    	  		this._initLayout();
    	  		this._update();

    	  		this._map = map;
    	  		map.on('zoomend', this._checkDisabledLayers, this);

    	  		for (var i = 0; i < this._layers.length; i++) {
    	  			this._layers[i].layer.on('add remove', this._onLayerChange, this);
    	  		}

    	  		return this._container;
    	  	},

    	  	addTo: function (map) {
    	  		Control.prototype.addTo.call(this, map);
    	  		// Trigger expand after Layers Control has been inserted into DOM so that is now has an actual height.
    	  		return this._expandIfNotCollapsed();
    	  	},

    	  	onRemove: function () {
    	  		this._map.off('zoomend', this._checkDisabledLayers, this);

    	  		for (var i = 0; i < this._layers.length; i++) {
    	  			this._layers[i].layer.off('add remove', this._onLayerChange, this);
    	  		}
    	  	},

    	  	// @method addBaseLayer(layer: Layer, name: String): this
    	  	// Adds a base layer (radio button entry) with the given name to the control.
    	  	addBaseLayer: function (layer, name) {
    	  		this._addLayer(layer, name);
    	  		return (this._map) ? this._update() : this;
    	  	},

    	  	// @method addOverlay(layer: Layer, name: String): this
    	  	// Adds an overlay (checkbox entry) with the given name to the control.
    	  	addOverlay: function (layer, name) {
    	  		this._addLayer(layer, name, true);
    	  		return (this._map) ? this._update() : this;
    	  	},

    	  	// @method removeLayer(layer: Layer): this
    	  	// Remove the given layer from the control.
    	  	removeLayer: function (layer) {
    	  		layer.off('add remove', this._onLayerChange, this);

    	  		var obj = this._getLayer(stamp(layer));
    	  		if (obj) {
    	  			this._layers.splice(this._layers.indexOf(obj), 1);
    	  		}
    	  		return (this._map) ? this._update() : this;
    	  	},

    	  	// @method expand(): this
    	  	// Expand the control container if collapsed.
    	  	expand: function () {
    	  		addClass(this._container, 'leaflet-control-layers-expanded');
    	  		this._section.style.height = null;
    	  		var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
    	  		if (acceptableHeight < this._section.clientHeight) {
    	  			addClass(this._section, 'leaflet-control-layers-scrollbar');
    	  			this._section.style.height = acceptableHeight + 'px';
    	  		} else {
    	  			removeClass(this._section, 'leaflet-control-layers-scrollbar');
    	  		}
    	  		this._checkDisabledLayers();
    	  		return this;
    	  	},

    	  	// @method collapse(): this
    	  	// Collapse the control container if expanded.
    	  	collapse: function () {
    	  		removeClass(this._container, 'leaflet-control-layers-expanded');
    	  		return this;
    	  	},

    	  	_initLayout: function () {
    	  		var className = 'leaflet-control-layers',
    	  		    container = this._container = create$1('div', className),
    	  		    collapsed = this.options.collapsed;

    	  		// makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
    	  		container.setAttribute('aria-haspopup', true);

    	  		disableClickPropagation(container);
    	  		disableScrollPropagation(container);

    	  		var section = this._section = create$1('section', className + '-list');

    	  		if (collapsed) {
    	  			this._map.on('click', this.collapse, this);

    	  			on(container, {
    	  				mouseenter: function () {
    	  					on(section, 'click', preventDefault);
    	  					this.expand();
    	  					setTimeout(function () {
    	  						off(section, 'click', preventDefault);
    	  					});
    	  				},
    	  				mouseleave: this.collapse
    	  			}, this);
    	  		}

    	  		var link = this._layersLink = create$1('a', className + '-toggle', container);
    	  		link.href = '#';
    	  		link.title = 'Layers';
    	  		link.setAttribute('role', 'button');

    	  		on(link, 'click', preventDefault); // prevent link function
    	  		on(link, 'focus', this.expand, this);

    	  		if (!collapsed) {
    	  			this.expand();
    	  		}

    	  		this._baseLayersList = create$1('div', className + '-base', section);
    	  		this._separator = create$1('div', className + '-separator', section);
    	  		this._overlaysList = create$1('div', className + '-overlays', section);

    	  		container.appendChild(section);
    	  	},

    	  	_getLayer: function (id) {
    	  		for (var i = 0; i < this._layers.length; i++) {

    	  			if (this._layers[i] && stamp(this._layers[i].layer) === id) {
    	  				return this._layers[i];
    	  			}
    	  		}
    	  	},

    	  	_addLayer: function (layer, name, overlay) {
    	  		if (this._map) {
    	  			layer.on('add remove', this._onLayerChange, this);
    	  		}

    	  		this._layers.push({
    	  			layer: layer,
    	  			name: name,
    	  			overlay: overlay
    	  		});

    	  		if (this.options.sortLayers) {
    	  			this._layers.sort(bind(function (a, b) {
    	  				return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
    	  			}, this));
    	  		}

    	  		if (this.options.autoZIndex && layer.setZIndex) {
    	  			this._lastZIndex++;
    	  			layer.setZIndex(this._lastZIndex);
    	  		}

    	  		this._expandIfNotCollapsed();
    	  	},

    	  	_update: function () {
    	  		if (!this._container) { return this; }

    	  		empty(this._baseLayersList);
    	  		empty(this._overlaysList);

    	  		this._layerControlInputs = [];
    	  		var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;

    	  		for (i = 0; i < this._layers.length; i++) {
    	  			obj = this._layers[i];
    	  			this._addItem(obj);
    	  			overlaysPresent = overlaysPresent || obj.overlay;
    	  			baseLayersPresent = baseLayersPresent || !obj.overlay;
    	  			baseLayersCount += !obj.overlay ? 1 : 0;
    	  		}

    	  		// Hide base layers section if there's only one layer.
    	  		if (this.options.hideSingleBase) {
    	  			baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
    	  			this._baseLayersList.style.display = baseLayersPresent ? '' : 'none';
    	  		}

    	  		this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';

    	  		return this;
    	  	},

    	  	_onLayerChange: function (e) {
    	  		if (!this._handlingClick) {
    	  			this._update();
    	  		}

    	  		var obj = this._getLayer(stamp(e.target));

    	  		// @namespace Map
    	  		// @section Layer events
    	  		// @event baselayerchange: LayersControlEvent
    	  		// Fired when the base layer is changed through the [layers control](#control-layers).
    	  		// @event overlayadd: LayersControlEvent
    	  		// Fired when an overlay is selected through the [layers control](#control-layers).
    	  		// @event overlayremove: LayersControlEvent
    	  		// Fired when an overlay is deselected through the [layers control](#control-layers).
    	  		// @namespace Control.Layers
    	  		var type = obj.overlay ?
    	  			(e.type === 'add' ? 'overlayadd' : 'overlayremove') :
    	  			(e.type === 'add' ? 'baselayerchange' : null);

    	  		if (type) {
    	  			this._map.fire(type, obj);
    	  		}
    	  	},

    	  	// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
    	  	_createRadioElement: function (name, checked) {

    	  		var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' +
    	  				name + '"' + (checked ? ' checked="checked"' : '') + '/>';

    	  		var radioFragment = document.createElement('div');
    	  		radioFragment.innerHTML = radioHtml;

    	  		return radioFragment.firstChild;
    	  	},

    	  	_addItem: function (obj) {
    	  		var label = document.createElement('label'),
    	  		    checked = this._map.hasLayer(obj.layer),
    	  		    input;

    	  		if (obj.overlay) {
    	  			input = document.createElement('input');
    	  			input.type = 'checkbox';
    	  			input.className = 'leaflet-control-layers-selector';
    	  			input.defaultChecked = checked;
    	  		} else {
    	  			input = this._createRadioElement('leaflet-base-layers_' + stamp(this), checked);
    	  		}

    	  		this._layerControlInputs.push(input);
    	  		input.layerId = stamp(obj.layer);

    	  		on(input, 'click', this._onInputClick, this);

    	  		var name = document.createElement('span');
    	  		name.innerHTML = ' ' + obj.name;

    	  		// Helps from preventing layer control flicker when checkboxes are disabled
    	  		// https://github.com/Leaflet/Leaflet/issues/2771
    	  		var holder = document.createElement('span');

    	  		label.appendChild(holder);
    	  		holder.appendChild(input);
    	  		holder.appendChild(name);

    	  		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
    	  		container.appendChild(label);

    	  		this._checkDisabledLayers();
    	  		return label;
    	  	},

    	  	_onInputClick: function () {
    	  		var inputs = this._layerControlInputs,
    	  		    input, layer;
    	  		var addedLayers = [],
    	  		    removedLayers = [];

    	  		this._handlingClick = true;

    	  		for (var i = inputs.length - 1; i >= 0; i--) {
    	  			input = inputs[i];
    	  			layer = this._getLayer(input.layerId).layer;

    	  			if (input.checked) {
    	  				addedLayers.push(layer);
    	  			} else if (!input.checked) {
    	  				removedLayers.push(layer);
    	  			}
    	  		}

    	  		// Bugfix issue 2318: Should remove all old layers before readding new ones
    	  		for (i = 0; i < removedLayers.length; i++) {
    	  			if (this._map.hasLayer(removedLayers[i])) {
    	  				this._map.removeLayer(removedLayers[i]);
    	  			}
    	  		}
    	  		for (i = 0; i < addedLayers.length; i++) {
    	  			if (!this._map.hasLayer(addedLayers[i])) {
    	  				this._map.addLayer(addedLayers[i]);
    	  			}
    	  		}

    	  		this._handlingClick = false;

    	  		this._refocusOnMap();
    	  	},

    	  	_checkDisabledLayers: function () {
    	  		var inputs = this._layerControlInputs,
    	  		    input,
    	  		    layer,
    	  		    zoom = this._map.getZoom();

    	  		for (var i = inputs.length - 1; i >= 0; i--) {
    	  			input = inputs[i];
    	  			layer = this._getLayer(input.layerId).layer;
    	  			input.disabled = (layer.options.minZoom !== undefined && zoom < layer.options.minZoom) ||
    	  			                 (layer.options.maxZoom !== undefined && zoom > layer.options.maxZoom);

    	  		}
    	  	},

    	  	_expandIfNotCollapsed: function () {
    	  		if (this._map && !this.options.collapsed) {
    	  			this.expand();
    	  		}
    	  		return this;
    	  	}

    	  });


    	  // @factory L.control.layers(baselayers?: Object, overlays?: Object, options?: Control.Layers options)
    	  // Creates a layers control with the given layers. Base layers will be switched with radio buttons, while overlays will be switched with checkboxes. Note that all base layers should be passed in the base layers object, but only one should be added to the map during map instantiation.
    	  var layers = function (baseLayers, overlays, options) {
    	  	return new Layers(baseLayers, overlays, options);
    	  };

    	  /*
    	   * @class Control.Zoom
    	   * @aka L.Control.Zoom
    	   * @inherits Control
    	   *
    	   * A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless you set its [`zoomControl` option](#map-zoomcontrol) to `false`. Extends `Control`.
    	   */

    	  var Zoom = Control.extend({
    	  	// @section
    	  	// @aka Control.Zoom options
    	  	options: {
    	  		position: 'topleft',

    	  		// @option zoomInText: String = '<span aria-hidden="true">+</span>'
    	  		// The text set on the 'zoom in' button.
    	  		zoomInText: '<span aria-hidden="true">+</span>',

    	  		// @option zoomInTitle: String = 'Zoom in'
    	  		// The title set on the 'zoom in' button.
    	  		zoomInTitle: 'Zoom in',

    	  		// @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
    	  		// The text set on the 'zoom out' button.
    	  		zoomOutText: '<span aria-hidden="true">&#x2212;</span>',

    	  		// @option zoomOutTitle: String = 'Zoom out'
    	  		// The title set on the 'zoom out' button.
    	  		zoomOutTitle: 'Zoom out'
    	  	},

    	  	onAdd: function (map) {
    	  		var zoomName = 'leaflet-control-zoom',
    	  		    container = create$1('div', zoomName + ' leaflet-bar'),
    	  		    options = this.options;

    	  		this._zoomInButton  = this._createButton(options.zoomInText, options.zoomInTitle,
    	  		        zoomName + '-in',  container, this._zoomIn);
    	  		this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
    	  		        zoomName + '-out', container, this._zoomOut);

    	  		this._updateDisabled();
    	  		map.on('zoomend zoomlevelschange', this._updateDisabled, this);

    	  		return container;
    	  	},

    	  	onRemove: function (map) {
    	  		map.off('zoomend zoomlevelschange', this._updateDisabled, this);
    	  	},

    	  	disable: function () {
    	  		this._disabled = true;
    	  		this._updateDisabled();
    	  		return this;
    	  	},

    	  	enable: function () {
    	  		this._disabled = false;
    	  		this._updateDisabled();
    	  		return this;
    	  	},

    	  	_zoomIn: function (e) {
    	  		if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
    	  			this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
    	  		}
    	  	},

    	  	_zoomOut: function (e) {
    	  		if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
    	  			this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
    	  		}
    	  	},

    	  	_createButton: function (html, title, className, container, fn) {
    	  		var link = create$1('a', className, container);
    	  		link.innerHTML = html;
    	  		link.href = '#';
    	  		link.title = title;

    	  		/*
    	  		 * Will force screen readers like VoiceOver to read this as "Zoom in - button"
    	  		 */
    	  		link.setAttribute('role', 'button');
    	  		link.setAttribute('aria-label', title);

    	  		disableClickPropagation(link);
    	  		on(link, 'click', stop);
    	  		on(link, 'click', fn, this);
    	  		on(link, 'click', this._refocusOnMap, this);

    	  		return link;
    	  	},

    	  	_updateDisabled: function () {
    	  		var map = this._map,
    	  		    className = 'leaflet-disabled';

    	  		removeClass(this._zoomInButton, className);
    	  		removeClass(this._zoomOutButton, className);
    	  		this._zoomInButton.setAttribute('aria-disabled', 'false');
    	  		this._zoomOutButton.setAttribute('aria-disabled', 'false');

    	  		if (this._disabled || map._zoom === map.getMinZoom()) {
    	  			addClass(this._zoomOutButton, className);
    	  			this._zoomOutButton.setAttribute('aria-disabled', 'true');
    	  		}
    	  		if (this._disabled || map._zoom === map.getMaxZoom()) {
    	  			addClass(this._zoomInButton, className);
    	  			this._zoomInButton.setAttribute('aria-disabled', 'true');
    	  		}
    	  	}
    	  });

    	  // @namespace Map
    	  // @section Control options
    	  // @option zoomControl: Boolean = true
    	  // Whether a [zoom control](#control-zoom) is added to the map by default.
    	  Map.mergeOptions({
    	  	zoomControl: true
    	  });

    	  Map.addInitHook(function () {
    	  	if (this.options.zoomControl) {
    	  		// @section Controls
    	  		// @property zoomControl: Control.Zoom
    	  		// The default zoom control (only available if the
    	  		// [`zoomControl` option](#map-zoomcontrol) was `true` when creating the map).
    	  		this.zoomControl = new Zoom();
    	  		this.addControl(this.zoomControl);
    	  	}
    	  });

    	  // @namespace Control.Zoom
    	  // @factory L.control.zoom(options: Control.Zoom options)
    	  // Creates a zoom control
    	  var zoom = function (options) {
    	  	return new Zoom(options);
    	  };

    	  /*
    	   * @class Control.Scale
    	   * @aka L.Control.Scale
    	   * @inherits Control
    	   *
    	   * A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems. Extends `Control`.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * L.control.scale().addTo(map);
    	   * ```
    	   */

    	  var Scale = Control.extend({
    	  	// @section
    	  	// @aka Control.Scale options
    	  	options: {
    	  		position: 'bottomleft',

    	  		// @option maxWidth: Number = 100
    	  		// Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
    	  		maxWidth: 100,

    	  		// @option metric: Boolean = True
    	  		// Whether to show the metric scale line (m/km).
    	  		metric: true,

    	  		// @option imperial: Boolean = True
    	  		// Whether to show the imperial scale line (mi/ft).
    	  		imperial: true

    	  		// @option updateWhenIdle: Boolean = false
    	  		// If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
    	  	},

    	  	onAdd: function (map) {
    	  		var className = 'leaflet-control-scale',
    	  		    container = create$1('div', className),
    	  		    options = this.options;

    	  		this._addScales(options, className + '-line', container);

    	  		map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
    	  		map.whenReady(this._update, this);

    	  		return container;
    	  	},

    	  	onRemove: function (map) {
    	  		map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
    	  	},

    	  	_addScales: function (options, className, container) {
    	  		if (options.metric) {
    	  			this._mScale = create$1('div', className, container);
    	  		}
    	  		if (options.imperial) {
    	  			this._iScale = create$1('div', className, container);
    	  		}
    	  	},

    	  	_update: function () {
    	  		var map = this._map,
    	  		    y = map.getSize().y / 2;

    	  		var maxMeters = map.distance(
    	  			map.containerPointToLatLng([0, y]),
    	  			map.containerPointToLatLng([this.options.maxWidth, y]));

    	  		this._updateScales(maxMeters);
    	  	},

    	  	_updateScales: function (maxMeters) {
    	  		if (this.options.metric && maxMeters) {
    	  			this._updateMetric(maxMeters);
    	  		}
    	  		if (this.options.imperial && maxMeters) {
    	  			this._updateImperial(maxMeters);
    	  		}
    	  	},

    	  	_updateMetric: function (maxMeters) {
    	  		var meters = this._getRoundNum(maxMeters),
    	  		    label = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';

    	  		this._updateScale(this._mScale, label, meters / maxMeters);
    	  	},

    	  	_updateImperial: function (maxMeters) {
    	  		var maxFeet = maxMeters * 3.2808399,
    	  		    maxMiles, miles, feet;

    	  		if (maxFeet > 5280) {
    	  			maxMiles = maxFeet / 5280;
    	  			miles = this._getRoundNum(maxMiles);
    	  			this._updateScale(this._iScale, miles + ' mi', miles / maxMiles);

    	  		} else {
    	  			feet = this._getRoundNum(maxFeet);
    	  			this._updateScale(this._iScale, feet + ' ft', feet / maxFeet);
    	  		}
    	  	},

    	  	_updateScale: function (scale, text, ratio) {
    	  		scale.style.width = Math.round(this.options.maxWidth * ratio) + 'px';
    	  		scale.innerHTML = text;
    	  	},

    	  	_getRoundNum: function (num) {
    	  		var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
    	  		    d = num / pow10;

    	  		d = d >= 10 ? 10 :
    	  		    d >= 5 ? 5 :
    	  		    d >= 3 ? 3 :
    	  		    d >= 2 ? 2 : 1;

    	  		return pow10 * d;
    	  	}
    	  });


    	  // @factory L.control.scale(options?: Control.Scale options)
    	  // Creates an scale control with the given options.
    	  var scale = function (options) {
    	  	return new Scale(options);
    	  };

    	  var ukrainianFlag = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>';


    	  /*
    	   * @class Control.Attribution
    	   * @aka L.Control.Attribution
    	   * @inherits Control
    	   *
    	   * The attribution control allows you to display attribution data in a small text box on a map. It is put on the map by default unless you set its [`attributionControl` option](#map-attributioncontrol) to `false`, and it fetches attribution texts from layers with the [`getAttribution` method](#layer-getattribution) automatically. Extends Control.
    	   */

    	  var Attribution = Control.extend({
    	  	// @section
    	  	// @aka Control.Attribution options
    	  	options: {
    	  		position: 'bottomright',

    	  		// @option prefix: String|false = 'Leaflet'
    	  		// The HTML text shown before the attributions. Pass `false` to disable.
    	  		prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Browser.inlineSvg ? ukrainianFlag + ' ' : '') + 'Leaflet</a>'
    	  	},

    	  	initialize: function (options) {
    	  		setOptions(this, options);

    	  		this._attributions = {};
    	  	},

    	  	onAdd: function (map) {
    	  		map.attributionControl = this;
    	  		this._container = create$1('div', 'leaflet-control-attribution');
    	  		disableClickPropagation(this._container);

    	  		// TODO ugly, refactor
    	  		for (var i in map._layers) {
    	  			if (map._layers[i].getAttribution) {
    	  				this.addAttribution(map._layers[i].getAttribution());
    	  			}
    	  		}

    	  		this._update();

    	  		map.on('layeradd', this._addAttribution, this);

    	  		return this._container;
    	  	},

    	  	onRemove: function (map) {
    	  		map.off('layeradd', this._addAttribution, this);
    	  	},

    	  	_addAttribution: function (ev) {
    	  		if (ev.layer.getAttribution) {
    	  			this.addAttribution(ev.layer.getAttribution());
    	  			ev.layer.once('remove', function () {
    	  				this.removeAttribution(ev.layer.getAttribution());
    	  			}, this);
    	  		}
    	  	},

    	  	// @method setPrefix(prefix: String|false): this
    	  	// The HTML text shown before the attributions. Pass `false` to disable.
    	  	setPrefix: function (prefix) {
    	  		this.options.prefix = prefix;
    	  		this._update();
    	  		return this;
    	  	},

    	  	// @method addAttribution(text: String): this
    	  	// Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
    	  	addAttribution: function (text) {
    	  		if (!text) { return this; }

    	  		if (!this._attributions[text]) {
    	  			this._attributions[text] = 0;
    	  		}
    	  		this._attributions[text]++;

    	  		this._update();

    	  		return this;
    	  	},

    	  	// @method removeAttribution(text: String): this
    	  	// Removes an attribution text.
    	  	removeAttribution: function (text) {
    	  		if (!text) { return this; }

    	  		if (this._attributions[text]) {
    	  			this._attributions[text]--;
    	  			this._update();
    	  		}

    	  		return this;
    	  	},

    	  	_update: function () {
    	  		if (!this._map) { return; }

    	  		var attribs = [];

    	  		for (var i in this._attributions) {
    	  			if (this._attributions[i]) {
    	  				attribs.push(i);
    	  			}
    	  		}

    	  		var prefixAndAttribs = [];

    	  		if (this.options.prefix) {
    	  			prefixAndAttribs.push(this.options.prefix);
    	  		}
    	  		if (attribs.length) {
    	  			prefixAndAttribs.push(attribs.join(', '));
    	  		}

    	  		this._container.innerHTML = prefixAndAttribs.join(' <span aria-hidden="true">|</span> ');
    	  	}
    	  });

    	  // @namespace Map
    	  // @section Control options
    	  // @option attributionControl: Boolean = true
    	  // Whether a [attribution control](#control-attribution) is added to the map by default.
    	  Map.mergeOptions({
    	  	attributionControl: true
    	  });

    	  Map.addInitHook(function () {
    	  	if (this.options.attributionControl) {
    	  		new Attribution().addTo(this);
    	  	}
    	  });

    	  // @namespace Control.Attribution
    	  // @factory L.control.attribution(options: Control.Attribution options)
    	  // Creates an attribution control.
    	  var attribution = function (options) {
    	  	return new Attribution(options);
    	  };

    	  Control.Layers = Layers;
    	  Control.Zoom = Zoom;
    	  Control.Scale = Scale;
    	  Control.Attribution = Attribution;

    	  control.layers = layers;
    	  control.zoom = zoom;
    	  control.scale = scale;
    	  control.attribution = attribution;

    	  /*
    	  	L.Handler is a base class for handler classes that are used internally to inject
    	  	interaction features like dragging to classes like Map and Marker.
    	  */

    	  // @class Handler
    	  // @aka L.Handler
    	  // Abstract class for map interaction handlers

    	  var Handler = Class.extend({
    	  	initialize: function (map) {
    	  		this._map = map;
    	  	},

    	  	// @method enable(): this
    	  	// Enables the handler
    	  	enable: function () {
    	  		if (this._enabled) { return this; }

    	  		this._enabled = true;
    	  		this.addHooks();
    	  		return this;
    	  	},

    	  	// @method disable(): this
    	  	// Disables the handler
    	  	disable: function () {
    	  		if (!this._enabled) { return this; }

    	  		this._enabled = false;
    	  		this.removeHooks();
    	  		return this;
    	  	},

    	  	// @method enabled(): Boolean
    	  	// Returns `true` if the handler is enabled
    	  	enabled: function () {
    	  		return !!this._enabled;
    	  	}

    	  	// @section Extension methods
    	  	// Classes inheriting from `Handler` must implement the two following methods:
    	  	// @method addHooks()
    	  	// Called when the handler is enabled, should add event hooks.
    	  	// @method removeHooks()
    	  	// Called when the handler is disabled, should remove the event hooks added previously.
    	  });

    	  // @section There is static function which can be called without instantiating L.Handler:
    	  // @function addTo(map: Map, name: String): this
    	  // Adds a new Handler to the given map with the given name.
    	  Handler.addTo = function (map, name) {
    	  	map.addHandler(name, this);
    	  	return this;
    	  };

    	  var Mixin = {Events: Events};

    	  /*
    	   * @class Draggable
    	   * @aka L.Draggable
    	   * @inherits Evented
    	   *
    	   * A class for making DOM elements draggable (including touch support).
    	   * Used internally for map and marker dragging. Only works for elements
    	   * that were positioned with [`L.DomUtil.setPosition`](#domutil-setposition).
    	   *
    	   * @example
    	   * ```js
    	   * var draggable = new L.Draggable(elementToDrag);
    	   * draggable.enable();
    	   * ```
    	   */

    	  var START = Browser.touch ? 'touchstart mousedown' : 'mousedown';

    	  var Draggable = Evented.extend({

    	  	options: {
    	  		// @section
    	  		// @aka Draggable options
    	  		// @option clickTolerance: Number = 3
    	  		// The max number of pixels a user can shift the mouse pointer during a click
    	  		// for it to be considered a valid click (as opposed to a mouse drag).
    	  		clickTolerance: 3
    	  	},

    	  	// @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
    	  	// Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
    	  	initialize: function (element, dragStartTarget, preventOutline, options) {
    	  		setOptions(this, options);

    	  		this._element = element;
    	  		this._dragStartTarget = dragStartTarget || element;
    	  		this._preventOutline = preventOutline;
    	  	},

    	  	// @method enable()
    	  	// Enables the dragging ability
    	  	enable: function () {
    	  		if (this._enabled) { return; }

    	  		on(this._dragStartTarget, START, this._onDown, this);

    	  		this._enabled = true;
    	  	},

    	  	// @method disable()
    	  	// Disables the dragging ability
    	  	disable: function () {
    	  		if (!this._enabled) { return; }

    	  		// If we're currently dragging this draggable,
    	  		// disabling it counts as first ending the drag.
    	  		if (Draggable._dragging === this) {
    	  			this.finishDrag(true);
    	  		}

    	  		off(this._dragStartTarget, START, this._onDown, this);

    	  		this._enabled = false;
    	  		this._moved = false;
    	  	},

    	  	_onDown: function (e) {
    	  		// Ignore the event if disabled; this happens in IE11
    	  		// under some circumstances, see #3666.
    	  		if (!this._enabled) { return; }

    	  		this._moved = false;

    	  		if (hasClass(this._element, 'leaflet-zoom-anim')) { return; }

    	  		if (e.touches && e.touches.length !== 1) {
    	  			// Finish dragging to avoid conflict with touchZoom
    	  			if (Draggable._dragging === this) {
    	  				this.finishDrag();
    	  			}
    	  			return;
    	  		}

    	  		if (Draggable._dragging || e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }
    	  		Draggable._dragging = this;  // Prevent dragging multiple objects at once.

    	  		if (this._preventOutline) {
    	  			preventOutline(this._element);
    	  		}

    	  		disableImageDrag();
    	  		disableTextSelection();

    	  		if (this._moving) { return; }

    	  		// @event down: Event
    	  		// Fired when a drag is about to start.
    	  		this.fire('down');

    	  		var first = e.touches ? e.touches[0] : e,
    	  		    sizedParent = getSizedParentNode(this._element);

    	  		this._startPoint = new Point(first.clientX, first.clientY);
    	  		this._startPos = getPosition(this._element);

    	  		// Cache the scale, so that we can continuously compensate for it during drag (_onMove).
    	  		this._parentScale = getScale(sizedParent);

    	  		var mouseevent = e.type === 'mousedown';
    	  		on(document, mouseevent ? 'mousemove' : 'touchmove', this._onMove, this);
    	  		on(document, mouseevent ? 'mouseup' : 'touchend touchcancel', this._onUp, this);
    	  	},

    	  	_onMove: function (e) {
    	  		// Ignore the event if disabled; this happens in IE11
    	  		// under some circumstances, see #3666.
    	  		if (!this._enabled) { return; }

    	  		if (e.touches && e.touches.length > 1) {
    	  			this._moved = true;
    	  			return;
    	  		}

    	  		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
    	  		    offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);

    	  		if (!offset.x && !offset.y) { return; }
    	  		if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) { return; }

    	  		// We assume that the parent container's position, border and scale do not change for the duration of the drag.
    	  		// Therefore there is no need to account for the position and border (they are eliminated by the subtraction)
    	  		// and we can use the cached value for the scale.
    	  		offset.x /= this._parentScale.x;
    	  		offset.y /= this._parentScale.y;

    	  		preventDefault(e);

    	  		if (!this._moved) {
    	  			// @event dragstart: Event
    	  			// Fired when a drag starts
    	  			this.fire('dragstart');

    	  			this._moved = true;

    	  			addClass(document.body, 'leaflet-dragging');

    	  			this._lastTarget = e.target || e.srcElement;
    	  			// IE and Edge do not give the <use> element, so fetch it
    	  			// if necessary
    	  			if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
    	  				this._lastTarget = this._lastTarget.correspondingUseElement;
    	  			}
    	  			addClass(this._lastTarget, 'leaflet-drag-target');
    	  		}

    	  		this._newPos = this._startPos.add(offset);
    	  		this._moving = true;

    	  		this._lastEvent = e;
    	  		this._updatePosition();
    	  	},

    	  	_updatePosition: function () {
    	  		var e = {originalEvent: this._lastEvent};

    	  		// @event predrag: Event
    	  		// Fired continuously during dragging *before* each corresponding
    	  		// update of the element's position.
    	  		this.fire('predrag', e);
    	  		setPosition(this._element, this._newPos);

    	  		// @event drag: Event
    	  		// Fired continuously during dragging.
    	  		this.fire('drag', e);
    	  	},

    	  	_onUp: function () {
    	  		// Ignore the event if disabled; this happens in IE11
    	  		// under some circumstances, see #3666.
    	  		if (!this._enabled) { return; }
    	  		this.finishDrag();
    	  	},

    	  	finishDrag: function (noInertia) {
    	  		removeClass(document.body, 'leaflet-dragging');

    	  		if (this._lastTarget) {
    	  			removeClass(this._lastTarget, 'leaflet-drag-target');
    	  			this._lastTarget = null;
    	  		}

    	  		off(document, 'mousemove touchmove', this._onMove, this);
    	  		off(document, 'mouseup touchend touchcancel', this._onUp, this);

    	  		enableImageDrag();
    	  		enableTextSelection();

    	  		if (this._moved && this._moving) {

    	  			// @event dragend: DragEndEvent
    	  			// Fired when the drag ends.
    	  			this.fire('dragend', {
    	  				noInertia: noInertia,
    	  				distance: this._newPos.distanceTo(this._startPos)
    	  			});
    	  		}

    	  		this._moving = false;
    	  		Draggable._dragging = false;
    	  	}

    	  });

    	  /*
    	   * @namespace LineUtil
    	   *
    	   * Various utility functions for polyline points processing, used by Leaflet internally to make polylines lightning-fast.
    	   */

    	  // Simplify polyline with vertex reduction and Douglas-Peucker simplification.
    	  // Improves rendering performance dramatically by lessening the number of points to draw.

    	  // @function simplify(points: Point[], tolerance: Number): Point[]
    	  // Dramatically reduces the number of points in a polyline while retaining
    	  // its shape and returns a new array of simplified points, using the
    	  // [Ramer-Douglas-Peucker algorithm](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm).
    	  // Used for a huge performance boost when processing/displaying Leaflet polylines for
    	  // each zoom level and also reducing visual noise. tolerance affects the amount of
    	  // simplification (lesser value means higher quality but slower and with more points).
    	  // Also released as a separated micro-library [Simplify.js](https://mourner.github.io/simplify-js/).
    	  function simplify(points, tolerance) {
    	  	if (!tolerance || !points.length) {
    	  		return points.slice();
    	  	}

    	  	var sqTolerance = tolerance * tolerance;

    	  	    // stage 1: vertex reduction
    	  	    points = _reducePoints(points, sqTolerance);

    	  	    // stage 2: Douglas-Peucker simplification
    	  	    points = _simplifyDP(points, sqTolerance);

    	  	return points;
    	  }

    	  // @function pointToSegmentDistance(p: Point, p1: Point, p2: Point): Number
    	  // Returns the distance between point `p` and segment `p1` to `p2`.
    	  function pointToSegmentDistance(p, p1, p2) {
    	  	return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
    	  }

    	  // @function closestPointOnSegment(p: Point, p1: Point, p2: Point): Number
    	  // Returns the closest point from a point `p` on a segment `p1` to `p2`.
    	  function closestPointOnSegment(p, p1, p2) {
    	  	return _sqClosestPointOnSegment(p, p1, p2);
    	  }

    	  // Ramer-Douglas-Peucker simplification, see https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm
    	  function _simplifyDP(points, sqTolerance) {

    	  	var len = points.length,
    	  	    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
    	  	    markers = new ArrayConstructor(len);

    	  	    markers[0] = markers[len - 1] = 1;

    	  	_simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

    	  	var i,
    	  	    newPoints = [];

    	  	for (i = 0; i < len; i++) {
    	  		if (markers[i]) {
    	  			newPoints.push(points[i]);
    	  		}
    	  	}

    	  	return newPoints;
    	  }

    	  function _simplifyDPStep(points, markers, sqTolerance, first, last) {

    	  	var maxSqDist = 0,
    	  	index, i, sqDist;

    	  	for (i = first + 1; i <= last - 1; i++) {
    	  		sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);

    	  		if (sqDist > maxSqDist) {
    	  			index = i;
    	  			maxSqDist = sqDist;
    	  		}
    	  	}

    	  	if (maxSqDist > sqTolerance) {
    	  		markers[index] = 1;

    	  		_simplifyDPStep(points, markers, sqTolerance, first, index);
    	  		_simplifyDPStep(points, markers, sqTolerance, index, last);
    	  	}
    	  }

    	  // reduce points that are too close to each other to a single point
    	  function _reducePoints(points, sqTolerance) {
    	  	var reducedPoints = [points[0]];

    	  	for (var i = 1, prev = 0, len = points.length; i < len; i++) {
    	  		if (_sqDist(points[i], points[prev]) > sqTolerance) {
    	  			reducedPoints.push(points[i]);
    	  			prev = i;
    	  		}
    	  	}
    	  	if (prev < len - 1) {
    	  		reducedPoints.push(points[len - 1]);
    	  	}
    	  	return reducedPoints;
    	  }

    	  var _lastCode;

    	  // @function clipSegment(a: Point, b: Point, bounds: Bounds, useLastCode?: Boolean, round?: Boolean): Point[]|Boolean
    	  // Clips the segment a to b by rectangular bounds with the
    	  // [Cohen-Sutherland algorithm](https://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm)
    	  // (modifying the segment points directly!). Used by Leaflet to only show polyline
    	  // points that are on the screen or near, increasing performance.
    	  function clipSegment(a, b, bounds, useLastCode, round) {
    	  	var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds),
    	  	    codeB = _getBitCode(b, bounds),

    	  	    codeOut, p, newCode;

    	  	    // save 2nd code to avoid calculating it on the next segment
    	  	    _lastCode = codeB;

    	  	while (true) {
    	  		// if a,b is inside the clip window (trivial accept)
    	  		if (!(codeA | codeB)) {
    	  			return [a, b];
    	  		}

    	  		// if a,b is outside the clip window (trivial reject)
    	  		if (codeA & codeB) {
    	  			return false;
    	  		}

    	  		// other cases
    	  		codeOut = codeA || codeB;
    	  		p = _getEdgeIntersection(a, b, codeOut, bounds, round);
    	  		newCode = _getBitCode(p, bounds);

    	  		if (codeOut === codeA) {
    	  			a = p;
    	  			codeA = newCode;
    	  		} else {
    	  			b = p;
    	  			codeB = newCode;
    	  		}
    	  	}
    	  }

    	  function _getEdgeIntersection(a, b, code, bounds, round) {
    	  	var dx = b.x - a.x,
    	  	    dy = b.y - a.y,
    	  	    min = bounds.min,
    	  	    max = bounds.max,
    	  	    x, y;

    	  	if (code & 8) { // top
    	  		x = a.x + dx * (max.y - a.y) / dy;
    	  		y = max.y;

    	  	} else if (code & 4) { // bottom
    	  		x = a.x + dx * (min.y - a.y) / dy;
    	  		y = min.y;

    	  	} else if (code & 2) { // right
    	  		x = max.x;
    	  		y = a.y + dy * (max.x - a.x) / dx;

    	  	} else if (code & 1) { // left
    	  		x = min.x;
    	  		y = a.y + dy * (min.x - a.x) / dx;
    	  	}

    	  	return new Point(x, y, round);
    	  }

    	  function _getBitCode(p, bounds) {
    	  	var code = 0;

    	  	if (p.x < bounds.min.x) { // left
    	  		code |= 1;
    	  	} else if (p.x > bounds.max.x) { // right
    	  		code |= 2;
    	  	}

    	  	if (p.y < bounds.min.y) { // bottom
    	  		code |= 4;
    	  	} else if (p.y > bounds.max.y) { // top
    	  		code |= 8;
    	  	}

    	  	return code;
    	  }

    	  // square distance (to avoid unnecessary Math.sqrt calls)
    	  function _sqDist(p1, p2) {
    	  	var dx = p2.x - p1.x,
    	  	    dy = p2.y - p1.y;
    	  	return dx * dx + dy * dy;
    	  }

    	  // return closest point on segment or distance to that point
    	  function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
    	  	var x = p1.x,
    	  	    y = p1.y,
    	  	    dx = p2.x - x,
    	  	    dy = p2.y - y,
    	  	    dot = dx * dx + dy * dy,
    	  	    t;

    	  	if (dot > 0) {
    	  		t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

    	  		if (t > 1) {
    	  			x = p2.x;
    	  			y = p2.y;
    	  		} else if (t > 0) {
    	  			x += dx * t;
    	  			y += dy * t;
    	  		}
    	  	}

    	  	dx = p.x - x;
    	  	dy = p.y - y;

    	  	return sqDist ? dx * dx + dy * dy : new Point(x, y);
    	  }


    	  // @function isFlat(latlngs: LatLng[]): Boolean
    	  // Returns true if `latlngs` is a flat array, false is nested.
    	  function isFlat(latlngs) {
    	  	return !isArray(latlngs[0]) || (typeof latlngs[0][0] !== 'object' && typeof latlngs[0][0] !== 'undefined');
    	  }

    	  function _flat(latlngs) {
    	  	console.warn('Deprecated use of _flat, please use L.LineUtil.isFlat instead.');
    	  	return isFlat(latlngs);
    	  }

    	  /* @function polylineCenter(latlngs: LatLng[], crs: CRS): LatLng
    	   * Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the passed LatLngs (first ring) from a polyline.
    	   */
    	  function polylineCenter(latlngs, crs) {
    	  	var i, halfDist, segDist, dist, p1, p2, ratio, center;

    	  	if (!latlngs || latlngs.length === 0) {
    	  		throw new Error('latlngs not passed');
    	  	}

    	  	if (!isFlat(latlngs)) {
    	  		console.warn('latlngs are not flat! Only the first ring will be used');
    	  		latlngs = latlngs[0];
    	  	}

    	  	var points = [];
    	  	for (var j in latlngs) {
    	  		points.push(crs.project(toLatLng(latlngs[j])));
    	  	}

    	  	var len = points.length;

    	  	for (i = 0, halfDist = 0; i < len - 1; i++) {
    	  		halfDist += points[i].distanceTo(points[i + 1]) / 2;
    	  	}

    	  	// The line is so small in the current view that all points are on the same pixel.
    	  	if (halfDist === 0) {
    	  		center = points[0];
    	  	} else {
    	  		for (i = 0, dist = 0; i < len - 1; i++) {
    	  			p1 = points[i];
    	  			p2 = points[i + 1];
    	  			segDist = p1.distanceTo(p2);
    	  			dist += segDist;

    	  			if (dist > halfDist) {
    	  				ratio = (dist - halfDist) / segDist;
    	  				center = [
    	  					p2.x - ratio * (p2.x - p1.x),
    	  					p2.y - ratio * (p2.y - p1.y)
    	  				];
    	  				break;
    	  			}
    	  		}
    	  	}
    	  	return crs.unproject(toPoint(center));
    	  }

    	  var LineUtil = {
    	    __proto__: null,
    	    simplify: simplify,
    	    pointToSegmentDistance: pointToSegmentDistance,
    	    closestPointOnSegment: closestPointOnSegment,
    	    clipSegment: clipSegment,
    	    _getEdgeIntersection: _getEdgeIntersection,
    	    _getBitCode: _getBitCode,
    	    _sqClosestPointOnSegment: _sqClosestPointOnSegment,
    	    isFlat: isFlat,
    	    _flat: _flat,
    	    polylineCenter: polylineCenter
    	  };

    	  /*
    	   * @namespace PolyUtil
    	   * Various utility functions for polygon geometries.
    	   */

    	  /* @function clipPolygon(points: Point[], bounds: Bounds, round?: Boolean): Point[]
    	   * Clips the polygon geometry defined by the given `points` by the given bounds (using the [Sutherland-Hodgman algorithm](https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm)).
    	   * Used by Leaflet to only show polygon points that are on the screen or near, increasing
    	   * performance. Note that polygon points needs different algorithm for clipping
    	   * than polyline, so there's a separate method for it.
    	   */
    	  function clipPolygon(points, bounds, round) {
    	  	var clippedPoints,
    	  	    edges = [1, 4, 2, 8],
    	  	    i, j, k,
    	  	    a, b,
    	  	    len, edge, p;

    	  	for (i = 0, len = points.length; i < len; i++) {
    	  		points[i]._code = _getBitCode(points[i], bounds);
    	  	}

    	  	// for each edge (left, bottom, right, top)
    	  	for (k = 0; k < 4; k++) {
    	  		edge = edges[k];
    	  		clippedPoints = [];

    	  		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
    	  			a = points[i];
    	  			b = points[j];

    	  			// if a is inside the clip window
    	  			if (!(a._code & edge)) {
    	  				// if b is outside the clip window (a->b goes out of screen)
    	  				if (b._code & edge) {
    	  					p = _getEdgeIntersection(b, a, edge, bounds, round);
    	  					p._code = _getBitCode(p, bounds);
    	  					clippedPoints.push(p);
    	  				}
    	  				clippedPoints.push(a);

    	  			// else if b is inside the clip window (a->b enters the screen)
    	  			} else if (!(b._code & edge)) {
    	  				p = _getEdgeIntersection(b, a, edge, bounds, round);
    	  				p._code = _getBitCode(p, bounds);
    	  				clippedPoints.push(p);
    	  			}
    	  		}
    	  		points = clippedPoints;
    	  	}

    	  	return points;
    	  }

    	  /* @function polygonCenter(latlngs: LatLng[] crs: CRS): LatLng
    	   * Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the passed LatLngs (first ring) from a polygon.
    	   */
    	  function polygonCenter(latlngs, crs) {
    	  	var i, j, p1, p2, f, area, x, y, center;

    	  	if (!latlngs || latlngs.length === 0) {
    	  		throw new Error('latlngs not passed');
    	  	}

    	  	if (!isFlat(latlngs)) {
    	  		console.warn('latlngs are not flat! Only the first ring will be used');
    	  		latlngs = latlngs[0];
    	  	}

    	  	var points = [];
    	  	for (var k in latlngs) {
    	  		points.push(crs.project(toLatLng(latlngs[k])));
    	  	}

    	  	var len = points.length;
    	  	area = x = y = 0;

    	  	// polygon centroid algorithm;
    	  	for (i = 0, j = len - 1; i < len; j = i++) {
    	  		p1 = points[i];
    	  		p2 = points[j];

    	  		f = p1.y * p2.x - p2.y * p1.x;
    	  		x += (p1.x + p2.x) * f;
    	  		y += (p1.y + p2.y) * f;
    	  		area += f * 3;
    	  	}

    	  	if (area === 0) {
    	  		// Polygon is so small that all points are on same pixel.
    	  		center = points[0];
    	  	} else {
    	  		center = [x / area, y / area];
    	  	}
    	  	return crs.unproject(toPoint(center));
    	  }

    	  var PolyUtil = {
    	    __proto__: null,
    	    clipPolygon: clipPolygon,
    	    polygonCenter: polygonCenter
    	  };

    	  /*
    	   * @namespace Projection
    	   * @section
    	   * Leaflet comes with a set of already defined Projections out of the box:
    	   *
    	   * @projection L.Projection.LonLat
    	   *
    	   * Equirectangular, or Plate Carree projection — the most simple projection,
    	   * mostly used by GIS enthusiasts. Directly maps `x` as longitude, and `y` as
    	   * latitude. Also suitable for flat worlds, e.g. game maps. Used by the
    	   * `EPSG:4326` and `Simple` CRS.
    	   */

    	  var LonLat = {
    	  	project: function (latlng) {
    	  		return new Point(latlng.lng, latlng.lat);
    	  	},

    	  	unproject: function (point) {
    	  		return new LatLng(point.y, point.x);
    	  	},

    	  	bounds: new Bounds([-180, -90], [180, 90])
    	  };

    	  /*
    	   * @namespace Projection
    	   * @projection L.Projection.Mercator
    	   *
    	   * Elliptical Mercator projection — more complex than Spherical Mercator. Assumes that Earth is an ellipsoid. Used by the EPSG:3395 CRS.
    	   */

    	  var Mercator = {
    	  	R: 6378137,
    	  	R_MINOR: 6356752.314245179,

    	  	bounds: new Bounds([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),

    	  	project: function (latlng) {
    	  		var d = Math.PI / 180,
    	  		    r = this.R,
    	  		    y = latlng.lat * d,
    	  		    tmp = this.R_MINOR / r,
    	  		    e = Math.sqrt(1 - tmp * tmp),
    	  		    con = e * Math.sin(y);

    	  		var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
    	  		y = -r * Math.log(Math.max(ts, 1E-10));

    	  		return new Point(latlng.lng * d * r, y);
    	  	},

    	  	unproject: function (point) {
    	  		var d = 180 / Math.PI,
    	  		    r = this.R,
    	  		    tmp = this.R_MINOR / r,
    	  		    e = Math.sqrt(1 - tmp * tmp),
    	  		    ts = Math.exp(-point.y / r),
    	  		    phi = Math.PI / 2 - 2 * Math.atan(ts);

    	  		for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
    	  			con = e * Math.sin(phi);
    	  			con = Math.pow((1 - con) / (1 + con), e / 2);
    	  			dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
    	  			phi += dphi;
    	  		}

    	  		return new LatLng(phi * d, point.x * d / r);
    	  	}
    	  };

    	  /*
    	   * @class Projection

    	   * An object with methods for projecting geographical coordinates of the world onto
    	   * a flat surface (and back). See [Map projection](https://en.wikipedia.org/wiki/Map_projection).

    	   * @property bounds: Bounds
    	   * The bounds (specified in CRS units) where the projection is valid

    	   * @method project(latlng: LatLng): Point
    	   * Projects geographical coordinates into a 2D point.
    	   * Only accepts actual `L.LatLng` instances, not arrays.

    	   * @method unproject(point: Point): LatLng
    	   * The inverse of `project`. Projects a 2D point into a geographical location.
    	   * Only accepts actual `L.Point` instances, not arrays.

    	   * Note that the projection instances do not inherit from Leaflet's `Class` object,
    	   * and can't be instantiated. Also, new classes can't inherit from them,
    	   * and methods can't be added to them with the `include` function.

    	   */

    	  var index = {
    	    __proto__: null,
    	    LonLat: LonLat,
    	    Mercator: Mercator,
    	    SphericalMercator: SphericalMercator
    	  };

    	  /*
    	   * @namespace CRS
    	   * @crs L.CRS.EPSG3395
    	   *
    	   * Rarely used by some commercial tile providers. Uses Elliptical Mercator projection.
    	   */
    	  var EPSG3395 = extend({}, Earth, {
    	  	code: 'EPSG:3395',
    	  	projection: Mercator,

    	  	transformation: (function () {
    	  		var scale = 0.5 / (Math.PI * Mercator.R);
    	  		return toTransformation(scale, 0.5, -scale, 0.5);
    	  	}())
    	  });

    	  /*
    	   * @namespace CRS
    	   * @crs L.CRS.EPSG4326
    	   *
    	   * A common CRS among GIS enthusiasts. Uses simple Equirectangular projection.
    	   *
    	   * Leaflet 1.0.x complies with the [TMS coordinate scheme for EPSG:4326](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification#global-geodetic),
    	   * which is a breaking change from 0.7.x behaviour.  If you are using a `TileLayer`
    	   * with this CRS, ensure that there are two 256x256 pixel tiles covering the
    	   * whole earth at zoom level zero, and that the tile coordinate origin is (-180,+90),
    	   * or (-180,-90) for `TileLayer`s with [the `tms` option](#tilelayer-tms) set.
    	   */

    	  var EPSG4326 = extend({}, Earth, {
    	  	code: 'EPSG:4326',
    	  	projection: LonLat,
    	  	transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
    	  });

    	  /*
    	   * @namespace CRS
    	   * @crs L.CRS.Simple
    	   *
    	   * A simple CRS that maps longitude and latitude into `x` and `y` directly.
    	   * May be used for maps of flat surfaces (e.g. game maps). Note that the `y`
    	   * axis should still be inverted (going from bottom to top). `distance()` returns
    	   * simple euclidean distance.
    	   */

    	  var Simple = extend({}, CRS, {
    	  	projection: LonLat,
    	  	transformation: toTransformation(1, 0, -1, 0),

    	  	scale: function (zoom) {
    	  		return Math.pow(2, zoom);
    	  	},

    	  	zoom: function (scale) {
    	  		return Math.log(scale) / Math.LN2;
    	  	},

    	  	distance: function (latlng1, latlng2) {
    	  		var dx = latlng2.lng - latlng1.lng,
    	  		    dy = latlng2.lat - latlng1.lat;

    	  		return Math.sqrt(dx * dx + dy * dy);
    	  	},

    	  	infinite: true
    	  });

    	  CRS.Earth = Earth;
    	  CRS.EPSG3395 = EPSG3395;
    	  CRS.EPSG3857 = EPSG3857;
    	  CRS.EPSG900913 = EPSG900913;
    	  CRS.EPSG4326 = EPSG4326;
    	  CRS.Simple = Simple;

    	  /*
    	   * @class Layer
    	   * @inherits Evented
    	   * @aka L.Layer
    	   * @aka ILayer
    	   *
    	   * A set of methods from the Layer base class that all Leaflet layers use.
    	   * Inherits all methods, options and events from `L.Evented`.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * var layer = L.marker(latlng).addTo(map);
    	   * layer.addTo(map);
    	   * layer.remove();
    	   * ```
    	   *
    	   * @event add: Event
    	   * Fired after the layer is added to a map
    	   *
    	   * @event remove: Event
    	   * Fired after the layer is removed from a map
    	   */


    	  var Layer = Evented.extend({

    	  	// Classes extending `L.Layer` will inherit the following options:
    	  	options: {
    	  		// @option pane: String = 'overlayPane'
    	  		// By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
    	  		pane: 'overlayPane',

    	  		// @option attribution: String = null
    	  		// String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
    	  		attribution: null,

    	  		bubblingMouseEvents: true
    	  	},

    	  	/* @section
    	  	 * Classes extending `L.Layer` will inherit the following methods:
    	  	 *
    	  	 * @method addTo(map: Map|LayerGroup): this
    	  	 * Adds the layer to the given map or layer group.
    	  	 */
    	  	addTo: function (map) {
    	  		map.addLayer(this);
    	  		return this;
    	  	},

    	  	// @method remove: this
    	  	// Removes the layer from the map it is currently active on.
    	  	remove: function () {
    	  		return this.removeFrom(this._map || this._mapToAdd);
    	  	},

    	  	// @method removeFrom(map: Map): this
    	  	// Removes the layer from the given map
    	  	//
    	  	// @alternative
    	  	// @method removeFrom(group: LayerGroup): this
    	  	// Removes the layer from the given `LayerGroup`
    	  	removeFrom: function (obj) {
    	  		if (obj) {
    	  			obj.removeLayer(this);
    	  		}
    	  		return this;
    	  	},

    	  	// @method getPane(name? : String): HTMLElement
    	  	// Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
    	  	getPane: function (name) {
    	  		return this._map.getPane(name ? (this.options[name] || name) : this.options.pane);
    	  	},

    	  	addInteractiveTarget: function (targetEl) {
    	  		this._map._targets[stamp(targetEl)] = this;
    	  		return this;
    	  	},

    	  	removeInteractiveTarget: function (targetEl) {
    	  		delete this._map._targets[stamp(targetEl)];
    	  		return this;
    	  	},

    	  	// @method getAttribution: String
    	  	// Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
    	  	getAttribution: function () {
    	  		return this.options.attribution;
    	  	},

    	  	_layerAdd: function (e) {
    	  		var map = e.target;

    	  		// check in case layer gets added and then removed before the map is ready
    	  		if (!map.hasLayer(this)) { return; }

    	  		this._map = map;
    	  		this._zoomAnimated = map._zoomAnimated;

    	  		if (this.getEvents) {
    	  			var events = this.getEvents();
    	  			map.on(events, this);
    	  			this.once('remove', function () {
    	  				map.off(events, this);
    	  			}, this);
    	  		}

    	  		this.onAdd(map);

    	  		this.fire('add');
    	  		map.fire('layeradd', {layer: this});
    	  	}
    	  });

    	  /* @section Extension methods
    	   * @uninheritable
    	   *
    	   * Every layer should extend from `L.Layer` and (re-)implement the following methods.
    	   *
    	   * @method onAdd(map: Map): this
    	   * Should contain code that creates DOM elements for the layer, adds them to `map panes` where they should belong and puts listeners on relevant map events. Called on [`map.addLayer(layer)`](#map-addlayer).
    	   *
    	   * @method onRemove(map: Map): this
    	   * Should contain all clean up code that removes the layer's elements from the DOM and removes listeners previously added in [`onAdd`](#layer-onadd). Called on [`map.removeLayer(layer)`](#map-removelayer).
    	   *
    	   * @method getEvents(): Object
    	   * This optional method should return an object like `{ viewreset: this._reset }` for [`addEventListener`](#evented-addeventlistener). The event handlers in this object will be automatically added and removed from the map with your layer.
    	   *
    	   * @method getAttribution(): String
    	   * This optional method should return a string containing HTML to be shown on the `Attribution control` whenever the layer is visible.
    	   *
    	   * @method beforeAdd(map: Map): this
    	   * Optional method. Called on [`map.addLayer(layer)`](#map-addlayer), before the layer is added to the map, before events are initialized, without waiting until the map is in a usable state. Use for early initialization only.
    	   */


    	  /* @namespace Map
    	   * @section Layer events
    	   *
    	   * @event layeradd: LayerEvent
    	   * Fired when a new layer is added to the map.
    	   *
    	   * @event layerremove: LayerEvent
    	   * Fired when some layer is removed from the map
    	   *
    	   * @section Methods for Layers and Controls
    	   */
    	  Map.include({
    	  	// @method addLayer(layer: Layer): this
    	  	// Adds the given layer to the map
    	  	addLayer: function (layer) {
    	  		if (!layer._layerAdd) {
    	  			throw new Error('The provided object is not a Layer.');
    	  		}

    	  		var id = stamp(layer);
    	  		if (this._layers[id]) { return this; }
    	  		this._layers[id] = layer;

    	  		layer._mapToAdd = this;

    	  		if (layer.beforeAdd) {
    	  			layer.beforeAdd(this);
    	  		}

    	  		this.whenReady(layer._layerAdd, layer);

    	  		return this;
    	  	},

    	  	// @method removeLayer(layer: Layer): this
    	  	// Removes the given layer from the map.
    	  	removeLayer: function (layer) {
    	  		var id = stamp(layer);

    	  		if (!this._layers[id]) { return this; }

    	  		if (this._loaded) {
    	  			layer.onRemove(this);
    	  		}

    	  		delete this._layers[id];

    	  		if (this._loaded) {
    	  			this.fire('layerremove', {layer: layer});
    	  			layer.fire('remove');
    	  		}

    	  		layer._map = layer._mapToAdd = null;

    	  		return this;
    	  	},

    	  	// @method hasLayer(layer: Layer): Boolean
    	  	// Returns `true` if the given layer is currently added to the map
    	  	hasLayer: function (layer) {
    	  		return stamp(layer) in this._layers;
    	  	},

    	  	/* @method eachLayer(fn: Function, context?: Object): this
    	  	 * Iterates over the layers of the map, optionally specifying context of the iterator function.
    	  	 * ```
    	  	 * map.eachLayer(function(layer){
    	  	 *     layer.bindPopup('Hello');
    	  	 * });
    	  	 * ```
    	  	 */
    	  	eachLayer: function (method, context) {
    	  		for (var i in this._layers) {
    	  			method.call(context, this._layers[i]);
    	  		}
    	  		return this;
    	  	},

    	  	_addLayers: function (layers) {
    	  		layers = layers ? (isArray(layers) ? layers : [layers]) : [];

    	  		for (var i = 0, len = layers.length; i < len; i++) {
    	  			this.addLayer(layers[i]);
    	  		}
    	  	},

    	  	_addZoomLimit: function (layer) {
    	  		if (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
    	  			this._zoomBoundLayers[stamp(layer)] = layer;
    	  			this._updateZoomLevels();
    	  		}
    	  	},

    	  	_removeZoomLimit: function (layer) {
    	  		var id = stamp(layer);

    	  		if (this._zoomBoundLayers[id]) {
    	  			delete this._zoomBoundLayers[id];
    	  			this._updateZoomLevels();
    	  		}
    	  	},

    	  	_updateZoomLevels: function () {
    	  		var minZoom = Infinity,
    	  		    maxZoom = -Infinity,
    	  		    oldZoomSpan = this._getZoomSpan();

    	  		for (var i in this._zoomBoundLayers) {
    	  			var options = this._zoomBoundLayers[i].options;

    	  			minZoom = options.minZoom === undefined ? minZoom : Math.min(minZoom, options.minZoom);
    	  			maxZoom = options.maxZoom === undefined ? maxZoom : Math.max(maxZoom, options.maxZoom);
    	  		}

    	  		this._layersMaxZoom = maxZoom === -Infinity ? undefined : maxZoom;
    	  		this._layersMinZoom = minZoom === Infinity ? undefined : minZoom;

    	  		// @section Map state change events
    	  		// @event zoomlevelschange: Event
    	  		// Fired when the number of zoomlevels on the map is changed due
    	  		// to adding or removing a layer.
    	  		if (oldZoomSpan !== this._getZoomSpan()) {
    	  			this.fire('zoomlevelschange');
    	  		}

    	  		if (this.options.maxZoom === undefined && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
    	  			this.setZoom(this._layersMaxZoom);
    	  		}
    	  		if (this.options.minZoom === undefined && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
    	  			this.setZoom(this._layersMinZoom);
    	  		}
    	  	}
    	  });

    	  /*
    	   * @class LayerGroup
    	   * @aka L.LayerGroup
    	   * @inherits Interactive layer
    	   *
    	   * Used to group several layers and handle them as one. If you add it to the map,
    	   * any layers added or removed from the group will be added/removed on the map as
    	   * well. Extends `Layer`.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * L.layerGroup([marker1, marker2])
    	   * 	.addLayer(polyline)
    	   * 	.addTo(map);
    	   * ```
    	   */

    	  var LayerGroup = Layer.extend({

    	  	initialize: function (layers, options) {
    	  		setOptions(this, options);

    	  		this._layers = {};

    	  		var i, len;

    	  		if (layers) {
    	  			for (i = 0, len = layers.length; i < len; i++) {
    	  				this.addLayer(layers[i]);
    	  			}
    	  		}
    	  	},

    	  	// @method addLayer(layer: Layer): this
    	  	// Adds the given layer to the group.
    	  	addLayer: function (layer) {
    	  		var id = this.getLayerId(layer);

    	  		this._layers[id] = layer;

    	  		if (this._map) {
    	  			this._map.addLayer(layer);
    	  		}

    	  		return this;
    	  	},

    	  	// @method removeLayer(layer: Layer): this
    	  	// Removes the given layer from the group.
    	  	// @alternative
    	  	// @method removeLayer(id: Number): this
    	  	// Removes the layer with the given internal ID from the group.
    	  	removeLayer: function (layer) {
    	  		var id = layer in this._layers ? layer : this.getLayerId(layer);

    	  		if (this._map && this._layers[id]) {
    	  			this._map.removeLayer(this._layers[id]);
    	  		}

    	  		delete this._layers[id];

    	  		return this;
    	  	},

    	  	// @method hasLayer(layer: Layer): Boolean
    	  	// Returns `true` if the given layer is currently added to the group.
    	  	// @alternative
    	  	// @method hasLayer(id: Number): Boolean
    	  	// Returns `true` if the given internal ID is currently added to the group.
    	  	hasLayer: function (layer) {
    	  		var layerId = typeof layer === 'number' ? layer : this.getLayerId(layer);
    	  		return layerId in this._layers;
    	  	},

    	  	// @method clearLayers(): this
    	  	// Removes all the layers from the group.
    	  	clearLayers: function () {
    	  		return this.eachLayer(this.removeLayer, this);
    	  	},

    	  	// @method invoke(methodName: String, …): this
    	  	// Calls `methodName` on every layer contained in this group, passing any
    	  	// additional parameters. Has no effect if the layers contained do not
    	  	// implement `methodName`.
    	  	invoke: function (methodName) {
    	  		var args = Array.prototype.slice.call(arguments, 1),
    	  		    i, layer;

    	  		for (i in this._layers) {
    	  			layer = this._layers[i];

    	  			if (layer[methodName]) {
    	  				layer[methodName].apply(layer, args);
    	  			}
    	  		}

    	  		return this;
    	  	},

    	  	onAdd: function (map) {
    	  		this.eachLayer(map.addLayer, map);
    	  	},

    	  	onRemove: function (map) {
    	  		this.eachLayer(map.removeLayer, map);
    	  	},

    	  	// @method eachLayer(fn: Function, context?: Object): this
    	  	// Iterates over the layers of the group, optionally specifying context of the iterator function.
    	  	// ```js
    	  	// group.eachLayer(function (layer) {
    	  	// 	layer.bindPopup('Hello');
    	  	// });
    	  	// ```
    	  	eachLayer: function (method, context) {
    	  		for (var i in this._layers) {
    	  			method.call(context, this._layers[i]);
    	  		}
    	  		return this;
    	  	},

    	  	// @method getLayer(id: Number): Layer
    	  	// Returns the layer with the given internal ID.
    	  	getLayer: function (id) {
    	  		return this._layers[id];
    	  	},

    	  	// @method getLayers(): Layer[]
    	  	// Returns an array of all the layers added to the group.
    	  	getLayers: function () {
    	  		var layers = [];
    	  		this.eachLayer(layers.push, layers);
    	  		return layers;
    	  	},

    	  	// @method setZIndex(zIndex: Number): this
    	  	// Calls `setZIndex` on every layer contained in this group, passing the z-index.
    	  	setZIndex: function (zIndex) {
    	  		return this.invoke('setZIndex', zIndex);
    	  	},

    	  	// @method getLayerId(layer: Layer): Number
    	  	// Returns the internal ID for a layer
    	  	getLayerId: function (layer) {
    	  		return stamp(layer);
    	  	}
    	  });


    	  // @factory L.layerGroup(layers?: Layer[], options?: Object)
    	  // Create a layer group, optionally given an initial set of layers and an `options` object.
    	  var layerGroup = function (layers, options) {
    	  	return new LayerGroup(layers, options);
    	  };

    	  /*
    	   * @class FeatureGroup
    	   * @aka L.FeatureGroup
    	   * @inherits LayerGroup
    	   *
    	   * Extended `LayerGroup` that makes it easier to do the same thing to all its member layers:
    	   *  * [`bindPopup`](#layer-bindpopup) binds a popup to all of the layers at once (likewise with [`bindTooltip`](#layer-bindtooltip))
    	   *  * Events are propagated to the `FeatureGroup`, so if the group has an event
    	   * handler, it will handle events from any of the layers. This includes mouse events
    	   * and custom events.
    	   *  * Has `layeradd` and `layerremove` events
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * L.featureGroup([marker1, marker2, polyline])
    	   * 	.bindPopup('Hello world!')
    	   * 	.on('click', function() { alert('Clicked on a member of the group!'); })
    	   * 	.addTo(map);
    	   * ```
    	   */

    	  var FeatureGroup = LayerGroup.extend({

    	  	addLayer: function (layer) {
    	  		if (this.hasLayer(layer)) {
    	  			return this;
    	  		}

    	  		layer.addEventParent(this);

    	  		LayerGroup.prototype.addLayer.call(this, layer);

    	  		// @event layeradd: LayerEvent
    	  		// Fired when a layer is added to this `FeatureGroup`
    	  		return this.fire('layeradd', {layer: layer});
    	  	},

    	  	removeLayer: function (layer) {
    	  		if (!this.hasLayer(layer)) {
    	  			return this;
    	  		}
    	  		if (layer in this._layers) {
    	  			layer = this._layers[layer];
    	  		}

    	  		layer.removeEventParent(this);

    	  		LayerGroup.prototype.removeLayer.call(this, layer);

    	  		// @event layerremove: LayerEvent
    	  		// Fired when a layer is removed from this `FeatureGroup`
    	  		return this.fire('layerremove', {layer: layer});
    	  	},

    	  	// @method setStyle(style: Path options): this
    	  	// Sets the given path options to each layer of the group that has a `setStyle` method.
    	  	setStyle: function (style) {
    	  		return this.invoke('setStyle', style);
    	  	},

    	  	// @method bringToFront(): this
    	  	// Brings the layer group to the top of all other layers
    	  	bringToFront: function () {
    	  		return this.invoke('bringToFront');
    	  	},

    	  	// @method bringToBack(): this
    	  	// Brings the layer group to the back of all other layers
    	  	bringToBack: function () {
    	  		return this.invoke('bringToBack');
    	  	},

    	  	// @method getBounds(): LatLngBounds
    	  	// Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
    	  	getBounds: function () {
    	  		var bounds = new LatLngBounds();

    	  		for (var id in this._layers) {
    	  			var layer = this._layers[id];
    	  			bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
    	  		}
    	  		return bounds;
    	  	}
    	  });

    	  // @factory L.featureGroup(layers?: Layer[], options?: Object)
    	  // Create a feature group, optionally given an initial set of layers and an `options` object.
    	  var featureGroup = function (layers, options) {
    	  	return new FeatureGroup(layers, options);
    	  };

    	  /*
    	   * @class Icon
    	   * @aka L.Icon
    	   *
    	   * Represents an icon to provide when creating a marker.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * var myIcon = L.icon({
    	   *     iconUrl: 'my-icon.png',
    	   *     iconRetinaUrl: 'my-icon@2x.png',
    	   *     iconSize: [38, 95],
    	   *     iconAnchor: [22, 94],
    	   *     popupAnchor: [-3, -76],
    	   *     shadowUrl: 'my-icon-shadow.png',
    	   *     shadowRetinaUrl: 'my-icon-shadow@2x.png',
    	   *     shadowSize: [68, 95],
    	   *     shadowAnchor: [22, 94]
    	   * });
    	   *
    	   * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
    	   * ```
    	   *
    	   * `L.Icon.Default` extends `L.Icon` and is the blue icon Leaflet uses for markers by default.
    	   *
    	   */

    	  var Icon = Class.extend({

    	  	/* @section
    	  	 * @aka Icon options
    	  	 *
    	  	 * @option iconUrl: String = null
    	  	 * **(required)** The URL to the icon image (absolute or relative to your script path).
    	  	 *
    	  	 * @option iconRetinaUrl: String = null
    	  	 * The URL to a retina sized version of the icon image (absolute or relative to your
    	  	 * script path). Used for Retina screen devices.
    	  	 *
    	  	 * @option iconSize: Point = null
    	  	 * Size of the icon image in pixels.
    	  	 *
    	  	 * @option iconAnchor: Point = null
    	  	 * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
    	  	 * will be aligned so that this point is at the marker's geographical location. Centered
    	  	 * by default if size is specified, also can be set in CSS with negative margins.
    	  	 *
    	  	 * @option popupAnchor: Point = [0, 0]
    	  	 * The coordinates of the point from which popups will "open", relative to the icon anchor.
    	  	 *
    	  	 * @option tooltipAnchor: Point = [0, 0]
    	  	 * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
    	  	 *
    	  	 * @option shadowUrl: String = null
    	  	 * The URL to the icon shadow image. If not specified, no shadow image will be created.
    	  	 *
    	  	 * @option shadowRetinaUrl: String = null
    	  	 *
    	  	 * @option shadowSize: Point = null
    	  	 * Size of the shadow image in pixels.
    	  	 *
    	  	 * @option shadowAnchor: Point = null
    	  	 * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
    	  	 * as iconAnchor if not specified).
    	  	 *
    	  	 * @option className: String = ''
    	  	 * A custom class name to assign to both icon and shadow images. Empty by default.
    	  	 */

    	  	options: {
    	  		popupAnchor: [0, 0],
    	  		tooltipAnchor: [0, 0],

    	  		// @option crossOrigin: Boolean|String = false
    	  		// Whether the crossOrigin attribute will be added to the tiles.
    	  		// If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
    	  		// Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
    	  		crossOrigin: false
    	  	},

    	  	initialize: function (options) {
    	  		setOptions(this, options);
    	  	},

    	  	// @method createIcon(oldIcon?: HTMLElement): HTMLElement
    	  	// Called internally when the icon has to be shown, returns a `<img>` HTML element
    	  	// styled according to the options.
    	  	createIcon: function (oldIcon) {
    	  		return this._createIcon('icon', oldIcon);
    	  	},

    	  	// @method createShadow(oldIcon?: HTMLElement): HTMLElement
    	  	// As `createIcon`, but for the shadow beneath it.
    	  	createShadow: function (oldIcon) {
    	  		return this._createIcon('shadow', oldIcon);
    	  	},

    	  	_createIcon: function (name, oldIcon) {
    	  		var src = this._getIconUrl(name);

    	  		if (!src) {
    	  			if (name === 'icon') {
    	  				throw new Error('iconUrl not set in Icon options (see the docs).');
    	  			}
    	  			return null;
    	  		}

    	  		var img = this._createImg(src, oldIcon && oldIcon.tagName === 'IMG' ? oldIcon : null);
    	  		this._setIconStyles(img, name);

    	  		if (this.options.crossOrigin || this.options.crossOrigin === '') {
    	  			img.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
    	  		}

    	  		return img;
    	  	},

    	  	_setIconStyles: function (img, name) {
    	  		var options = this.options;
    	  		var sizeOption = options[name + 'Size'];

    	  		if (typeof sizeOption === 'number') {
    	  			sizeOption = [sizeOption, sizeOption];
    	  		}

    	  		var size = toPoint(sizeOption),
    	  		    anchor = toPoint(name === 'shadow' && options.shadowAnchor || options.iconAnchor ||
    	  		            size && size.divideBy(2, true));

    	  		img.className = 'leaflet-marker-' + name + ' ' + (options.className || '');

    	  		if (anchor) {
    	  			img.style.marginLeft = (-anchor.x) + 'px';
    	  			img.style.marginTop  = (-anchor.y) + 'px';
    	  		}

    	  		if (size) {
    	  			img.style.width  = size.x + 'px';
    	  			img.style.height = size.y + 'px';
    	  		}
    	  	},

    	  	_createImg: function (src, el) {
    	  		el = el || document.createElement('img');
    	  		el.src = src;
    	  		return el;
    	  	},

    	  	_getIconUrl: function (name) {
    	  		return Browser.retina && this.options[name + 'RetinaUrl'] || this.options[name + 'Url'];
    	  	}
    	  });


    	  // @factory L.icon(options: Icon options)
    	  // Creates an icon instance with the given options.
    	  function icon(options) {
    	  	return new Icon(options);
    	  }

    	  /*
    	   * @miniclass Icon.Default (Icon)
    	   * @aka L.Icon.Default
    	   * @section
    	   *
    	   * A trivial subclass of `Icon`, represents the icon to use in `Marker`s when
    	   * no icon is specified. Points to the blue marker image distributed with Leaflet
    	   * releases.
    	   *
    	   * In order to customize the default icon, just change the properties of `L.Icon.Default.prototype.options`
    	   * (which is a set of `Icon options`).
    	   *
    	   * If you want to _completely_ replace the default icon, override the
    	   * `L.Marker.prototype.options.icon` with your own icon instead.
    	   */

    	  var IconDefault = Icon.extend({

    	  	options: {
    	  		iconUrl:       'marker-icon.png',
    	  		iconRetinaUrl: 'marker-icon-2x.png',
    	  		shadowUrl:     'marker-shadow.png',
    	  		iconSize:    [25, 41],
    	  		iconAnchor:  [12, 41],
    	  		popupAnchor: [1, -34],
    	  		tooltipAnchor: [16, -28],
    	  		shadowSize:  [41, 41]
    	  	},

    	  	_getIconUrl: function (name) {
    	  		if (typeof IconDefault.imagePath !== 'string') {	// Deprecated, backwards-compatibility only
    	  			IconDefault.imagePath = this._detectIconPath();
    	  		}

    	  		// @option imagePath: String
    	  		// `Icon.Default` will try to auto-detect the location of the
    	  		// blue icon images. If you are placing these images in a non-standard
    	  		// way, set this option to point to the right path.
    	  		return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
    	  	},

    	  	_stripUrl: function (path) {	// separate function to use in tests
    	  		var strip = function (str, re, idx) {
    	  			var match = re.exec(str);
    	  			return match && match[idx];
    	  		};
    	  		path = strip(path, /^url\((['"])?(.+)\1\)$/, 2);
    	  		return path && strip(path, /^(.*)marker-icon\.png$/, 1);
    	  	},

    	  	_detectIconPath: function () {
    	  		var el = create$1('div',  'leaflet-default-icon-path', document.body);
    	  		var path = getStyle(el, 'background-image') ||
    	  		           getStyle(el, 'backgroundImage');	// IE8

    	  		document.body.removeChild(el);
    	  		path = this._stripUrl(path);
    	  		if (path) { return path; }
    	  		var link = document.querySelector('link[href$="leaflet.css"]');
    	  		if (!link) { return ''; }
    	  		return link.href.substring(0, link.href.length - 'leaflet.css'.length - 1);
    	  	}
    	  });

    	  /*
    	   * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
    	   */


    	  /* @namespace Marker
    	   * @section Interaction handlers
    	   *
    	   * Interaction handlers are properties of a marker instance that allow you to control interaction behavior in runtime, enabling or disabling certain features such as dragging (see `Handler` methods). Example:
    	   *
    	   * ```js
    	   * marker.dragging.disable();
    	   * ```
    	   *
    	   * @property dragging: Handler
    	   * Marker dragging handler (by both mouse and touch). Only valid when the marker is on the map (Otherwise set [`marker.options.draggable`](#marker-draggable)).
    	   */

    	  var MarkerDrag = Handler.extend({
    	  	initialize: function (marker) {
    	  		this._marker = marker;
    	  	},

    	  	addHooks: function () {
    	  		var icon = this._marker._icon;

    	  		if (!this._draggable) {
    	  			this._draggable = new Draggable(icon, icon, true);
    	  		}

    	  		this._draggable.on({
    	  			dragstart: this._onDragStart,
    	  			predrag: this._onPreDrag,
    	  			drag: this._onDrag,
    	  			dragend: this._onDragEnd
    	  		}, this).enable();

    	  		addClass(icon, 'leaflet-marker-draggable');
    	  	},

    	  	removeHooks: function () {
    	  		this._draggable.off({
    	  			dragstart: this._onDragStart,
    	  			predrag: this._onPreDrag,
    	  			drag: this._onDrag,
    	  			dragend: this._onDragEnd
    	  		}, this).disable();

    	  		if (this._marker._icon) {
    	  			removeClass(this._marker._icon, 'leaflet-marker-draggable');
    	  		}
    	  	},

    	  	moved: function () {
    	  		return this._draggable && this._draggable._moved;
    	  	},

    	  	_adjustPan: function (e) {
    	  		var marker = this._marker,
    	  		    map = marker._map,
    	  		    speed = this._marker.options.autoPanSpeed,
    	  		    padding = this._marker.options.autoPanPadding,
    	  		    iconPos = getPosition(marker._icon),
    	  		    bounds = map.getPixelBounds(),
    	  		    origin = map.getPixelOrigin();

    	  		var panBounds = toBounds(
    	  			bounds.min._subtract(origin).add(padding),
    	  			bounds.max._subtract(origin).subtract(padding)
    	  		);

    	  		if (!panBounds.contains(iconPos)) {
    	  			// Compute incremental movement
    	  			var movement = toPoint(
    	  				(Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) -
    	  				(Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),

    	  				(Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) -
    	  				(Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
    	  			).multiplyBy(speed);

    	  			map.panBy(movement, {animate: false});

    	  			this._draggable._newPos._add(movement);
    	  			this._draggable._startPos._add(movement);

    	  			setPosition(marker._icon, this._draggable._newPos);
    	  			this._onDrag(e);

    	  			this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
    	  		}
    	  	},

    	  	_onDragStart: function () {
    	  		// @section Dragging events
    	  		// @event dragstart: Event
    	  		// Fired when the user starts dragging the marker.

    	  		// @event movestart: Event
    	  		// Fired when the marker starts moving (because of dragging).

    	  		this._oldLatLng = this._marker.getLatLng();

    	  		// When using ES6 imports it could not be set when `Popup` was not imported as well
    	  		this._marker.closePopup && this._marker.closePopup();

    	  		this._marker
    	  			.fire('movestart')
    	  			.fire('dragstart');
    	  	},

    	  	_onPreDrag: function (e) {
    	  		if (this._marker.options.autoPan) {
    	  			cancelAnimFrame(this._panRequest);
    	  			this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
    	  		}
    	  	},

    	  	_onDrag: function (e) {
    	  		var marker = this._marker,
    	  		    shadow = marker._shadow,
    	  		    iconPos = getPosition(marker._icon),
    	  		    latlng = marker._map.layerPointToLatLng(iconPos);

    	  		// update shadow position
    	  		if (shadow) {
    	  			setPosition(shadow, iconPos);
    	  		}

    	  		marker._latlng = latlng;
    	  		e.latlng = latlng;
    	  		e.oldLatLng = this._oldLatLng;

    	  		// @event drag: Event
    	  		// Fired repeatedly while the user drags the marker.
    	  		marker
    	  		    .fire('move', e)
    	  		    .fire('drag', e);
    	  	},

    	  	_onDragEnd: function (e) {
    	  		// @event dragend: DragEndEvent
    	  		// Fired when the user stops dragging the marker.

    	  		 cancelAnimFrame(this._panRequest);

    	  		// @event moveend: Event
    	  		// Fired when the marker stops moving (because of dragging).
    	  		delete this._oldLatLng;
    	  		this._marker
    	  		    .fire('moveend')
    	  		    .fire('dragend', e);
    	  	}
    	  });

    	  /*
    	   * @class Marker
    	   * @inherits Interactive layer
    	   * @aka L.Marker
    	   * L.Marker is used to display clickable/draggable icons on the map. Extends `Layer`.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * L.marker([50.5, 30.5]).addTo(map);
    	   * ```
    	   */

    	  var Marker = Layer.extend({

    	  	// @section
    	  	// @aka Marker options
    	  	options: {
    	  		// @option icon: Icon = *
    	  		// Icon instance to use for rendering the marker.
    	  		// See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
    	  		// If not specified, a common instance of `L.Icon.Default` is used.
    	  		icon: new IconDefault(),

    	  		// Option inherited from "Interactive layer" abstract class
    	  		interactive: true,

    	  		// @option keyboard: Boolean = true
    	  		// Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
    	  		keyboard: true,

    	  		// @option title: String = ''
    	  		// Text for the browser tooltip that appear on marker hover (no tooltip by default).
    	  		// [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
    	  		title: '',

    	  		// @option alt: String = 'Marker'
    	  		// Text for the `alt` attribute of the icon image.
    	  		// [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
    	  		alt: 'Marker',

    	  		// @option zIndexOffset: Number = 0
    	  		// By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
    	  		zIndexOffset: 0,

    	  		// @option opacity: Number = 1.0
    	  		// The opacity of the marker.
    	  		opacity: 1,

    	  		// @option riseOnHover: Boolean = false
    	  		// If `true`, the marker will get on top of others when you hover the mouse over it.
    	  		riseOnHover: false,

    	  		// @option riseOffset: Number = 250
    	  		// The z-index offset used for the `riseOnHover` feature.
    	  		riseOffset: 250,

    	  		// @option pane: String = 'markerPane'
    	  		// `Map pane` where the markers icon will be added.
    	  		pane: 'markerPane',

    	  		// @option shadowPane: String = 'shadowPane'
    	  		// `Map pane` where the markers shadow will be added.
    	  		shadowPane: 'shadowPane',

    	  		// @option bubblingMouseEvents: Boolean = false
    	  		// When `true`, a mouse event on this marker will trigger the same event on the map
    	  		// (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
    	  		bubblingMouseEvents: false,

    	  		// @option autoPanOnFocus: Boolean = true
    	  		// When `true`, the map will pan whenever the marker is focused (via
    	  		// e.g. pressing `tab` on the keyboard) to ensure the marker is
    	  		// visible within the map's bounds
    	  		autoPanOnFocus: true,

    	  		// @section Draggable marker options
    	  		// @option draggable: Boolean = false
    	  		// Whether the marker is draggable with mouse/touch or not.
    	  		draggable: false,

    	  		// @option autoPan: Boolean = false
    	  		// Whether to pan the map when dragging this marker near its edge or not.
    	  		autoPan: false,

    	  		// @option autoPanPadding: Point = Point(50, 50)
    	  		// Distance (in pixels to the left/right and to the top/bottom) of the
    	  		// map edge to start panning the map.
    	  		autoPanPadding: [50, 50],

    	  		// @option autoPanSpeed: Number = 10
    	  		// Number of pixels the map should pan by.
    	  		autoPanSpeed: 10
    	  	},

    	  	/* @section
    	  	 *
    	  	 * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
    	  	 */

    	  	initialize: function (latlng, options) {
    	  		setOptions(this, options);
    	  		this._latlng = toLatLng(latlng);
    	  	},

    	  	onAdd: function (map) {
    	  		this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;

    	  		if (this._zoomAnimated) {
    	  			map.on('zoomanim', this._animateZoom, this);
    	  		}

    	  		this._initIcon();
    	  		this.update();
    	  	},

    	  	onRemove: function (map) {
    	  		if (this.dragging && this.dragging.enabled()) {
    	  			this.options.draggable = true;
    	  			this.dragging.removeHooks();
    	  		}
    	  		delete this.dragging;

    	  		if (this._zoomAnimated) {
    	  			map.off('zoomanim', this._animateZoom, this);
    	  		}

    	  		this._removeIcon();
    	  		this._removeShadow();
    	  	},

    	  	getEvents: function () {
    	  		return {
    	  			zoom: this.update,
    	  			viewreset: this.update
    	  		};
    	  	},

    	  	// @method getLatLng: LatLng
    	  	// Returns the current geographical position of the marker.
    	  	getLatLng: function () {
    	  		return this._latlng;
    	  	},

    	  	// @method setLatLng(latlng: LatLng): this
    	  	// Changes the marker position to the given point.
    	  	setLatLng: function (latlng) {
    	  		var oldLatLng = this._latlng;
    	  		this._latlng = toLatLng(latlng);
    	  		this.update();

    	  		// @event move: Event
    	  		// Fired when the marker is moved via [`setLatLng`](#marker-setlatlng) or by [dragging](#marker-dragging). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
    	  		return this.fire('move', {oldLatLng: oldLatLng, latlng: this._latlng});
    	  	},

    	  	// @method setZIndexOffset(offset: Number): this
    	  	// Changes the [zIndex offset](#marker-zindexoffset) of the marker.
    	  	setZIndexOffset: function (offset) {
    	  		this.options.zIndexOffset = offset;
    	  		return this.update();
    	  	},

    	  	// @method getIcon: Icon
    	  	// Returns the current icon used by the marker
    	  	getIcon: function () {
    	  		return this.options.icon;
    	  	},

    	  	// @method setIcon(icon: Icon): this
    	  	// Changes the marker icon.
    	  	setIcon: function (icon) {

    	  		this.options.icon = icon;

    	  		if (this._map) {
    	  			this._initIcon();
    	  			this.update();
    	  		}

    	  		if (this._popup) {
    	  			this.bindPopup(this._popup, this._popup.options);
    	  		}

    	  		return this;
    	  	},

    	  	getElement: function () {
    	  		return this._icon;
    	  	},

    	  	update: function () {

    	  		if (this._icon && this._map) {
    	  			var pos = this._map.latLngToLayerPoint(this._latlng).round();
    	  			this._setPos(pos);
    	  		}

    	  		return this;
    	  	},

    	  	_initIcon: function () {
    	  		var options = this.options,
    	  		    classToAdd = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

    	  		var icon = options.icon.createIcon(this._icon),
    	  		    addIcon = false;

    	  		// if we're not reusing the icon, remove the old one and init new one
    	  		if (icon !== this._icon) {
    	  			if (this._icon) {
    	  				this._removeIcon();
    	  			}
    	  			addIcon = true;

    	  			if (options.title) {
    	  				icon.title = options.title;
    	  			}

    	  			if (icon.tagName === 'IMG') {
    	  				icon.alt = options.alt || '';
    	  			}
    	  		}

    	  		addClass(icon, classToAdd);

    	  		if (options.keyboard) {
    	  			icon.tabIndex = '0';
    	  			icon.setAttribute('role', 'button');
    	  		}

    	  		this._icon = icon;

    	  		if (options.riseOnHover) {
    	  			this.on({
    	  				mouseover: this._bringToFront,
    	  				mouseout: this._resetZIndex
    	  			});
    	  		}

    	  		if (this.options.autoPanOnFocus) {
    	  			on(icon, 'focus', this._panOnFocus, this);
    	  		}

    	  		var newShadow = options.icon.createShadow(this._shadow),
    	  		    addShadow = false;

    	  		if (newShadow !== this._shadow) {
    	  			this._removeShadow();
    	  			addShadow = true;
    	  		}

    	  		if (newShadow) {
    	  			addClass(newShadow, classToAdd);
    	  			newShadow.alt = '';
    	  		}
    	  		this._shadow = newShadow;


    	  		if (options.opacity < 1) {
    	  			this._updateOpacity();
    	  		}


    	  		if (addIcon) {
    	  			this.getPane().appendChild(this._icon);
    	  		}
    	  		this._initInteraction();
    	  		if (newShadow && addShadow) {
    	  			this.getPane(options.shadowPane).appendChild(this._shadow);
    	  		}
    	  	},

    	  	_removeIcon: function () {
    	  		if (this.options.riseOnHover) {
    	  			this.off({
    	  				mouseover: this._bringToFront,
    	  				mouseout: this._resetZIndex
    	  			});
    	  		}

    	  		if (this.options.autoPanOnFocus) {
    	  			off(this._icon, 'focus', this._panOnFocus, this);
    	  		}

    	  		remove(this._icon);
    	  		this.removeInteractiveTarget(this._icon);

    	  		this._icon = null;
    	  	},

    	  	_removeShadow: function () {
    	  		if (this._shadow) {
    	  			remove(this._shadow);
    	  		}
    	  		this._shadow = null;
    	  	},

    	  	_setPos: function (pos) {

    	  		if (this._icon) {
    	  			setPosition(this._icon, pos);
    	  		}

    	  		if (this._shadow) {
    	  			setPosition(this._shadow, pos);
    	  		}

    	  		this._zIndex = pos.y + this.options.zIndexOffset;

    	  		this._resetZIndex();
    	  	},

    	  	_updateZIndex: function (offset) {
    	  		if (this._icon) {
    	  			this._icon.style.zIndex = this._zIndex + offset;
    	  		}
    	  	},

    	  	_animateZoom: function (opt) {
    	  		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

    	  		this._setPos(pos);
    	  	},

    	  	_initInteraction: function () {

    	  		if (!this.options.interactive) { return; }

    	  		addClass(this._icon, 'leaflet-interactive');

    	  		this.addInteractiveTarget(this._icon);

    	  		if (MarkerDrag) {
    	  			var draggable = this.options.draggable;
    	  			if (this.dragging) {
    	  				draggable = this.dragging.enabled();
    	  				this.dragging.disable();
    	  			}

    	  			this.dragging = new MarkerDrag(this);

    	  			if (draggable) {
    	  				this.dragging.enable();
    	  			}
    	  		}
    	  	},

    	  	// @method setOpacity(opacity: Number): this
    	  	// Changes the opacity of the marker.
    	  	setOpacity: function (opacity) {
    	  		this.options.opacity = opacity;
    	  		if (this._map) {
    	  			this._updateOpacity();
    	  		}

    	  		return this;
    	  	},

    	  	_updateOpacity: function () {
    	  		var opacity = this.options.opacity;

    	  		if (this._icon) {
    	  			setOpacity(this._icon, opacity);
    	  		}

    	  		if (this._shadow) {
    	  			setOpacity(this._shadow, opacity);
    	  		}
    	  	},

    	  	_bringToFront: function () {
    	  		this._updateZIndex(this.options.riseOffset);
    	  	},

    	  	_resetZIndex: function () {
    	  		this._updateZIndex(0);
    	  	},

    	  	_panOnFocus: function () {
    	  		var map = this._map;
    	  		if (!map) { return; }

    	  		var iconOpts = this.options.icon.options;
    	  		var size = iconOpts.iconSize ? toPoint(iconOpts.iconSize) : toPoint(0, 0);
    	  		var anchor = iconOpts.iconAnchor ? toPoint(iconOpts.iconAnchor) : toPoint(0, 0);

    	  		map.panInside(this._latlng, {
    	  			paddingTopLeft: anchor,
    	  			paddingBottomRight: size.subtract(anchor)
    	  		});
    	  	},

    	  	_getPopupAnchor: function () {
    	  		return this.options.icon.options.popupAnchor;
    	  	},

    	  	_getTooltipAnchor: function () {
    	  		return this.options.icon.options.tooltipAnchor;
    	  	}
    	  });


    	  // factory L.marker(latlng: LatLng, options? : Marker options)

    	  // @factory L.marker(latlng: LatLng, options? : Marker options)
    	  // Instantiates a Marker object given a geographical point and optionally an options object.
    	  function marker(latlng, options) {
    	  	return new Marker(latlng, options);
    	  }

    	  /*
    	   * @class Path
    	   * @aka L.Path
    	   * @inherits Interactive layer
    	   *
    	   * An abstract class that contains options and constants shared between vector
    	   * overlays (Polygon, Polyline, Circle). Do not use it directly. Extends `Layer`.
    	   */

    	  var Path = Layer.extend({

    	  	// @section
    	  	// @aka Path options
    	  	options: {
    	  		// @option stroke: Boolean = true
    	  		// Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
    	  		stroke: true,

    	  		// @option color: String = '#3388ff'
    	  		// Stroke color
    	  		color: '#3388ff',

    	  		// @option weight: Number = 3
    	  		// Stroke width in pixels
    	  		weight: 3,

    	  		// @option opacity: Number = 1.0
    	  		// Stroke opacity
    	  		opacity: 1,

    	  		// @option lineCap: String= 'round'
    	  		// A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
    	  		lineCap: 'round',

    	  		// @option lineJoin: String = 'round'
    	  		// A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
    	  		lineJoin: 'round',

    	  		// @option dashArray: String = null
    	  		// A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
    	  		dashArray: null,

    	  		// @option dashOffset: String = null
    	  		// A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
    	  		dashOffset: null,

    	  		// @option fill: Boolean = depends
    	  		// Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
    	  		fill: false,

    	  		// @option fillColor: String = *
    	  		// Fill color. Defaults to the value of the [`color`](#path-color) option
    	  		fillColor: null,

    	  		// @option fillOpacity: Number = 0.2
    	  		// Fill opacity.
    	  		fillOpacity: 0.2,

    	  		// @option fillRule: String = 'evenodd'
    	  		// A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
    	  		fillRule: 'evenodd',

    	  		// className: '',

    	  		// Option inherited from "Interactive layer" abstract class
    	  		interactive: true,

    	  		// @option bubblingMouseEvents: Boolean = true
    	  		// When `true`, a mouse event on this path will trigger the same event on the map
    	  		// (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
    	  		bubblingMouseEvents: true
    	  	},

    	  	beforeAdd: function (map) {
    	  		// Renderer is set here because we need to call renderer.getEvents
    	  		// before this.getEvents.
    	  		this._renderer = map.getRenderer(this);
    	  	},

    	  	onAdd: function () {
    	  		this._renderer._initPath(this);
    	  		this._reset();
    	  		this._renderer._addPath(this);
    	  	},

    	  	onRemove: function () {
    	  		this._renderer._removePath(this);
    	  	},

    	  	// @method redraw(): this
    	  	// Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
    	  	redraw: function () {
    	  		if (this._map) {
    	  			this._renderer._updatePath(this);
    	  		}
    	  		return this;
    	  	},

    	  	// @method setStyle(style: Path options): this
    	  	// Changes the appearance of a Path based on the options in the `Path options` object.
    	  	setStyle: function (style) {
    	  		setOptions(this, style);
    	  		if (this._renderer) {
    	  			this._renderer._updateStyle(this);
    	  			if (this.options.stroke && style && Object.prototype.hasOwnProperty.call(style, 'weight')) {
    	  				this._updateBounds();
    	  			}
    	  		}
    	  		return this;
    	  	},

    	  	// @method bringToFront(): this
    	  	// Brings the layer to the top of all path layers.
    	  	bringToFront: function () {
    	  		if (this._renderer) {
    	  			this._renderer._bringToFront(this);
    	  		}
    	  		return this;
    	  	},

    	  	// @method bringToBack(): this
    	  	// Brings the layer to the bottom of all path layers.
    	  	bringToBack: function () {
    	  		if (this._renderer) {
    	  			this._renderer._bringToBack(this);
    	  		}
    	  		return this;
    	  	},

    	  	getElement: function () {
    	  		return this._path;
    	  	},

    	  	_reset: function () {
    	  		// defined in child classes
    	  		this._project();
    	  		this._update();
    	  	},

    	  	_clickTolerance: function () {
    	  		// used when doing hit detection for Canvas layers
    	  		return (this.options.stroke ? this.options.weight / 2 : 0) +
    	  		  (this._renderer.options.tolerance || 0);
    	  	}
    	  });

    	  /*
    	   * @class CircleMarker
    	   * @aka L.CircleMarker
    	   * @inherits Path
    	   *
    	   * A circle of a fixed size with radius specified in pixels. Extends `Path`.
    	   */

    	  var CircleMarker = Path.extend({

    	  	// @section
    	  	// @aka CircleMarker options
    	  	options: {
    	  		fill: true,

    	  		// @option radius: Number = 10
    	  		// Radius of the circle marker, in pixels
    	  		radius: 10
    	  	},

    	  	initialize: function (latlng, options) {
    	  		setOptions(this, options);
    	  		this._latlng = toLatLng(latlng);
    	  		this._radius = this.options.radius;
    	  	},

    	  	// @method setLatLng(latLng: LatLng): this
    	  	// Sets the position of a circle marker to a new location.
    	  	setLatLng: function (latlng) {
    	  		var oldLatLng = this._latlng;
    	  		this._latlng = toLatLng(latlng);
    	  		this.redraw();

    	  		// @event move: Event
    	  		// Fired when the marker is moved via [`setLatLng`](#circlemarker-setlatlng). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
    	  		return this.fire('move', {oldLatLng: oldLatLng, latlng: this._latlng});
    	  	},

    	  	// @method getLatLng(): LatLng
    	  	// Returns the current geographical position of the circle marker
    	  	getLatLng: function () {
    	  		return this._latlng;
    	  	},

    	  	// @method setRadius(radius: Number): this
    	  	// Sets the radius of a circle marker. Units are in pixels.
    	  	setRadius: function (radius) {
    	  		this.options.radius = this._radius = radius;
    	  		return this.redraw();
    	  	},

    	  	// @method getRadius(): Number
    	  	// Returns the current radius of the circle
    	  	getRadius: function () {
    	  		return this._radius;
    	  	},

    	  	setStyle : function (options) {
    	  		var radius = options && options.radius || this._radius;
    	  		Path.prototype.setStyle.call(this, options);
    	  		this.setRadius(radius);
    	  		return this;
    	  	},

    	  	_project: function () {
    	  		this._point = this._map.latLngToLayerPoint(this._latlng);
    	  		this._updateBounds();
    	  	},

    	  	_updateBounds: function () {
    	  		var r = this._radius,
    	  		    r2 = this._radiusY || r,
    	  		    w = this._clickTolerance(),
    	  		    p = [r + w, r2 + w];
    	  		this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
    	  	},

    	  	_update: function () {
    	  		if (this._map) {
    	  			this._updatePath();
    	  		}
    	  	},

    	  	_updatePath: function () {
    	  		this._renderer._updateCircle(this);
    	  	},

    	  	_empty: function () {
    	  		return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
    	  	},

    	  	// Needed by the `Canvas` renderer for interactivity
    	  	_containsPoint: function (p) {
    	  		return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
    	  	}
    	  });


    	  // @factory L.circleMarker(latlng: LatLng, options?: CircleMarker options)
    	  // Instantiates a circle marker object given a geographical point, and an optional options object.
    	  function circleMarker(latlng, options) {
    	  	return new CircleMarker(latlng, options);
    	  }

    	  /*
    	   * @class Circle
    	   * @aka L.Circle
    	   * @inherits CircleMarker
    	   *
    	   * A class for drawing circle overlays on a map. Extends `CircleMarker`.
    	   *
    	   * It's an approximation and starts to diverge from a real circle closer to poles (due to projection distortion).
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * L.circle([50.5, 30.5], {radius: 200}).addTo(map);
    	   * ```
    	   */

    	  var Circle = CircleMarker.extend({

    	  	initialize: function (latlng, options, legacyOptions) {
    	  		if (typeof options === 'number') {
    	  			// Backwards compatibility with 0.7.x factory (latlng, radius, options?)
    	  			options = extend({}, legacyOptions, {radius: options});
    	  		}
    	  		setOptions(this, options);
    	  		this._latlng = toLatLng(latlng);

    	  		if (isNaN(this.options.radius)) { throw new Error('Circle radius cannot be NaN'); }

    	  		// @section
    	  		// @aka Circle options
    	  		// @option radius: Number; Radius of the circle, in meters.
    	  		this._mRadius = this.options.radius;
    	  	},

    	  	// @method setRadius(radius: Number): this
    	  	// Sets the radius of a circle. Units are in meters.
    	  	setRadius: function (radius) {
    	  		this._mRadius = radius;
    	  		return this.redraw();
    	  	},

    	  	// @method getRadius(): Number
    	  	// Returns the current radius of a circle. Units are in meters.
    	  	getRadius: function () {
    	  		return this._mRadius;
    	  	},

    	  	// @method getBounds(): LatLngBounds
    	  	// Returns the `LatLngBounds` of the path.
    	  	getBounds: function () {
    	  		var half = [this._radius, this._radiusY || this._radius];

    	  		return new LatLngBounds(
    	  			this._map.layerPointToLatLng(this._point.subtract(half)),
    	  			this._map.layerPointToLatLng(this._point.add(half)));
    	  	},

    	  	setStyle: Path.prototype.setStyle,

    	  	_project: function () {

    	  		var lng = this._latlng.lng,
    	  		    lat = this._latlng.lat,
    	  		    map = this._map,
    	  		    crs = map.options.crs;

    	  		if (crs.distance === Earth.distance) {
    	  			var d = Math.PI / 180,
    	  			    latR = (this._mRadius / Earth.R) / d,
    	  			    top = map.project([lat + latR, lng]),
    	  			    bottom = map.project([lat - latR, lng]),
    	  			    p = top.add(bottom).divideBy(2),
    	  			    lat2 = map.unproject(p).lat,
    	  			    lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) /
    	  			            (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;

    	  			if (isNaN(lngR) || lngR === 0) {
    	  				lngR = latR / Math.cos(Math.PI / 180 * lat); // Fallback for edge case, #2425
    	  			}

    	  			this._point = p.subtract(map.getPixelOrigin());
    	  			this._radius = isNaN(lngR) ? 0 : p.x - map.project([lat2, lng - lngR]).x;
    	  			this._radiusY = p.y - top.y;

    	  		} else {
    	  			var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));

    	  			this._point = map.latLngToLayerPoint(this._latlng);
    	  			this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
    	  		}

    	  		this._updateBounds();
    	  	}
    	  });

    	  // @factory L.circle(latlng: LatLng, options?: Circle options)
    	  // Instantiates a circle object given a geographical point, and an options object
    	  // which contains the circle radius.
    	  // @alternative
    	  // @factory L.circle(latlng: LatLng, radius: Number, options?: Circle options)
    	  // Obsolete way of instantiating a circle, for compatibility with 0.7.x code.
    	  // Do not use in new applications or plugins.
    	  function circle(latlng, options, legacyOptions) {
    	  	return new Circle(latlng, options, legacyOptions);
    	  }

    	  /*
    	   * @class Polyline
    	   * @aka L.Polyline
    	   * @inherits Path
    	   *
    	   * A class for drawing polyline overlays on a map. Extends `Path`.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * // create a red polyline from an array of LatLng points
    	   * var latlngs = [
    	   * 	[45.51, -122.68],
    	   * 	[37.77, -122.43],
    	   * 	[34.04, -118.2]
    	   * ];
    	   *
    	   * var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
    	   *
    	   * // zoom the map to the polyline
    	   * map.fitBounds(polyline.getBounds());
    	   * ```
    	   *
    	   * You can also pass a multi-dimensional array to represent a `MultiPolyline` shape:
    	   *
    	   * ```js
    	   * // create a red polyline from an array of arrays of LatLng points
    	   * var latlngs = [
    	   * 	[[45.51, -122.68],
    	   * 	 [37.77, -122.43],
    	   * 	 [34.04, -118.2]],
    	   * 	[[40.78, -73.91],
    	   * 	 [41.83, -87.62],
    	   * 	 [32.76, -96.72]]
    	   * ];
    	   * ```
    	   */


    	  var Polyline = Path.extend({

    	  	// @section
    	  	// @aka Polyline options
    	  	options: {
    	  		// @option smoothFactor: Number = 1.0
    	  		// How much to simplify the polyline on each zoom level. More means
    	  		// better performance and smoother look, and less means more accurate representation.
    	  		smoothFactor: 1.0,

    	  		// @option noClip: Boolean = false
    	  		// Disable polyline clipping.
    	  		noClip: false
    	  	},

    	  	initialize: function (latlngs, options) {
    	  		setOptions(this, options);
    	  		this._setLatLngs(latlngs);
    	  	},

    	  	// @method getLatLngs(): LatLng[]
    	  	// Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
    	  	getLatLngs: function () {
    	  		return this._latlngs;
    	  	},

    	  	// @method setLatLngs(latlngs: LatLng[]): this
    	  	// Replaces all the points in the polyline with the given array of geographical points.
    	  	setLatLngs: function (latlngs) {
    	  		this._setLatLngs(latlngs);
    	  		return this.redraw();
    	  	},

    	  	// @method isEmpty(): Boolean
    	  	// Returns `true` if the Polyline has no LatLngs.
    	  	isEmpty: function () {
    	  		return !this._latlngs.length;
    	  	},

    	  	// @method closestLayerPoint(p: Point): Point
    	  	// Returns the point closest to `p` on the Polyline.
    	  	closestLayerPoint: function (p) {
    	  		var minDistance = Infinity,
    	  		    minPoint = null,
    	  		    closest = _sqClosestPointOnSegment,
    	  		    p1, p2;

    	  		for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
    	  			var points = this._parts[j];

    	  			for (var i = 1, len = points.length; i < len; i++) {
    	  				p1 = points[i - 1];
    	  				p2 = points[i];

    	  				var sqDist = closest(p, p1, p2, true);

    	  				if (sqDist < minDistance) {
    	  					minDistance = sqDist;
    	  					minPoint = closest(p, p1, p2);
    	  				}
    	  			}
    	  		}
    	  		if (minPoint) {
    	  			minPoint.distance = Math.sqrt(minDistance);
    	  		}
    	  		return minPoint;
    	  	},

    	  	// @method getCenter(): LatLng
    	  	// Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
    	  	getCenter: function () {
    	  		// throws error when not yet added to map as this center calculation requires projected coordinates
    	  		if (!this._map) {
    	  			throw new Error('Must add layer to map before using getCenter()');
    	  		}
    	  		return polylineCenter(this._defaultShape(), this._map.options.crs);
    	  	},

    	  	// @method getBounds(): LatLngBounds
    	  	// Returns the `LatLngBounds` of the path.
    	  	getBounds: function () {
    	  		return this._bounds;
    	  	},

    	  	// @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
    	  	// Adds a given point to the polyline. By default, adds to the first ring of
    	  	// the polyline in case of a multi-polyline, but can be overridden by passing
    	  	// a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
    	  	addLatLng: function (latlng, latlngs) {
    	  		latlngs = latlngs || this._defaultShape();
    	  		latlng = toLatLng(latlng);
    	  		latlngs.push(latlng);
    	  		this._bounds.extend(latlng);
    	  		return this.redraw();
    	  	},

    	  	_setLatLngs: function (latlngs) {
    	  		this._bounds = new LatLngBounds();
    	  		this._latlngs = this._convertLatLngs(latlngs);
    	  	},

    	  	_defaultShape: function () {
    	  		return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
    	  	},

    	  	// recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
    	  	_convertLatLngs: function (latlngs) {
    	  		var result = [],
    	  		    flat = isFlat(latlngs);

    	  		for (var i = 0, len = latlngs.length; i < len; i++) {
    	  			if (flat) {
    	  				result[i] = toLatLng(latlngs[i]);
    	  				this._bounds.extend(result[i]);
    	  			} else {
    	  				result[i] = this._convertLatLngs(latlngs[i]);
    	  			}
    	  		}

    	  		return result;
    	  	},

    	  	_project: function () {
    	  		var pxBounds = new Bounds();
    	  		this._rings = [];
    	  		this._projectLatlngs(this._latlngs, this._rings, pxBounds);

    	  		if (this._bounds.isValid() && pxBounds.isValid()) {
    	  			this._rawPxBounds = pxBounds;
    	  			this._updateBounds();
    	  		}
    	  	},

    	  	_updateBounds: function () {
    	  		var w = this._clickTolerance(),
    	  		    p = new Point(w, w);

    	  		if (!this._rawPxBounds) {
    	  			return;
    	  		}

    	  		this._pxBounds = new Bounds([
    	  			this._rawPxBounds.min.subtract(p),
    	  			this._rawPxBounds.max.add(p)
    	  		]);
    	  	},

    	  	// recursively turns latlngs into a set of rings with projected coordinates
    	  	_projectLatlngs: function (latlngs, result, projectedBounds) {
    	  		var flat = latlngs[0] instanceof LatLng,
    	  		    len = latlngs.length,
    	  		    i, ring;

    	  		if (flat) {
    	  			ring = [];
    	  			for (i = 0; i < len; i++) {
    	  				ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
    	  				projectedBounds.extend(ring[i]);
    	  			}
    	  			result.push(ring);
    	  		} else {
    	  			for (i = 0; i < len; i++) {
    	  				this._projectLatlngs(latlngs[i], result, projectedBounds);
    	  			}
    	  		}
    	  	},

    	  	// clip polyline by renderer bounds so that we have less to render for performance
    	  	_clipPoints: function () {
    	  		var bounds = this._renderer._bounds;

    	  		this._parts = [];
    	  		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
    	  			return;
    	  		}

    	  		if (this.options.noClip) {
    	  			this._parts = this._rings;
    	  			return;
    	  		}

    	  		var parts = this._parts,
    	  		    i, j, k, len, len2, segment, points;

    	  		for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
    	  			points = this._rings[i];

    	  			for (j = 0, len2 = points.length; j < len2 - 1; j++) {
    	  				segment = clipSegment(points[j], points[j + 1], bounds, j, true);

    	  				if (!segment) { continue; }

    	  				parts[k] = parts[k] || [];
    	  				parts[k].push(segment[0]);

    	  				// if segment goes out of screen, or it's the last one, it's the end of the line part
    	  				if ((segment[1] !== points[j + 1]) || (j === len2 - 2)) {
    	  					parts[k].push(segment[1]);
    	  					k++;
    	  				}
    	  			}
    	  		}
    	  	},

    	  	// simplify each clipped part of the polyline for performance
    	  	_simplifyPoints: function () {
    	  		var parts = this._parts,
    	  		    tolerance = this.options.smoothFactor;

    	  		for (var i = 0, len = parts.length; i < len; i++) {
    	  			parts[i] = simplify(parts[i], tolerance);
    	  		}
    	  	},

    	  	_update: function () {
    	  		if (!this._map) { return; }

    	  		this._clipPoints();
    	  		this._simplifyPoints();
    	  		this._updatePath();
    	  	},

    	  	_updatePath: function () {
    	  		this._renderer._updatePoly(this);
    	  	},

    	  	// Needed by the `Canvas` renderer for interactivity
    	  	_containsPoint: function (p, closed) {
    	  		var i, j, k, len, len2, part,
    	  		    w = this._clickTolerance();

    	  		if (!this._pxBounds || !this._pxBounds.contains(p)) { return false; }

    	  		// hit detection for polylines
    	  		for (i = 0, len = this._parts.length; i < len; i++) {
    	  			part = this._parts[i];

    	  			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
    	  				if (!closed && (j === 0)) { continue; }

    	  				if (pointToSegmentDistance(p, part[k], part[j]) <= w) {
    	  					return true;
    	  				}
    	  			}
    	  		}
    	  		return false;
    	  	}
    	  });

    	  // @factory L.polyline(latlngs: LatLng[], options?: Polyline options)
    	  // Instantiates a polyline object given an array of geographical points and
    	  // optionally an options object. You can create a `Polyline` object with
    	  // multiple separate lines (`MultiPolyline`) by passing an array of arrays
    	  // of geographic points.
    	  function polyline(latlngs, options) {
    	  	return new Polyline(latlngs, options);
    	  }

    	  // Retrocompat. Allow plugins to support Leaflet versions before and after 1.1.
    	  Polyline._flat = _flat;

    	  /*
    	   * @class Polygon
    	   * @aka L.Polygon
    	   * @inherits Polyline
    	   *
    	   * A class for drawing polygon overlays on a map. Extends `Polyline`.
    	   *
    	   * Note that points you pass when creating a polygon shouldn't have an additional last point equal to the first one — it's better to filter out such points.
    	   *
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * // create a red polygon from an array of LatLng points
    	   * var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
    	   *
    	   * var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
    	   *
    	   * // zoom the map to the polygon
    	   * map.fitBounds(polygon.getBounds());
    	   * ```
    	   *
    	   * You can also pass an array of arrays of latlngs, with the first array representing the outer shape and the other arrays representing holes in the outer shape:
    	   *
    	   * ```js
    	   * var latlngs = [
    	   *   [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
    	   *   [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
    	   * ];
    	   * ```
    	   *
    	   * Additionally, you can pass a multi-dimensional array to represent a MultiPolygon shape.
    	   *
    	   * ```js
    	   * var latlngs = [
    	   *   [ // first polygon
    	   *     [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
    	   *     [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
    	   *   ],
    	   *   [ // second polygon
    	   *     [[41, -111.03],[45, -111.04],[45, -104.05],[41, -104.05]]
    	   *   ]
    	   * ];
    	   * ```
    	   */

    	  var Polygon = Polyline.extend({

    	  	options: {
    	  		fill: true
    	  	},

    	  	isEmpty: function () {
    	  		return !this._latlngs.length || !this._latlngs[0].length;
    	  	},

    	  	// @method getCenter(): LatLng
    	  	// Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
    	  	getCenter: function () {
    	  		// throws error when not yet added to map as this center calculation requires projected coordinates
    	  		if (!this._map) {
    	  			throw new Error('Must add layer to map before using getCenter()');
    	  		}
    	  		return polygonCenter(this._defaultShape(), this._map.options.crs);
    	  	},

    	  	_convertLatLngs: function (latlngs) {
    	  		var result = Polyline.prototype._convertLatLngs.call(this, latlngs),
    	  		    len = result.length;

    	  		// remove last point if it equals first one
    	  		if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) {
    	  			result.pop();
    	  		}
    	  		return result;
    	  	},

    	  	_setLatLngs: function (latlngs) {
    	  		Polyline.prototype._setLatLngs.call(this, latlngs);
    	  		if (isFlat(this._latlngs)) {
    	  			this._latlngs = [this._latlngs];
    	  		}
    	  	},

    	  	_defaultShape: function () {
    	  		return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
    	  	},

    	  	_clipPoints: function () {
    	  		// polygons need a different clipping algorithm so we redefine that

    	  		var bounds = this._renderer._bounds,
    	  		    w = this.options.weight,
    	  		    p = new Point(w, w);

    	  		// increase clip padding by stroke width to avoid stroke on clip edges
    	  		bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));

    	  		this._parts = [];
    	  		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
    	  			return;
    	  		}

    	  		if (this.options.noClip) {
    	  			this._parts = this._rings;
    	  			return;
    	  		}

    	  		for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
    	  			clipped = clipPolygon(this._rings[i], bounds, true);
    	  			if (clipped.length) {
    	  				this._parts.push(clipped);
    	  			}
    	  		}
    	  	},

    	  	_updatePath: function () {
    	  		this._renderer._updatePoly(this, true);
    	  	},

    	  	// Needed by the `Canvas` renderer for interactivity
    	  	_containsPoint: function (p) {
    	  		var inside = false,
    	  		    part, p1, p2, i, j, k, len, len2;

    	  		if (!this._pxBounds || !this._pxBounds.contains(p)) { return false; }

    	  		// ray casting algorithm for detecting if point is in polygon
    	  		for (i = 0, len = this._parts.length; i < len; i++) {
    	  			part = this._parts[i];

    	  			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
    	  				p1 = part[j];
    	  				p2 = part[k];

    	  				if (((p1.y > p.y) !== (p2.y > p.y)) && (p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
    	  					inside = !inside;
    	  				}
    	  			}
    	  		}

    	  		// also check if it's on polygon stroke
    	  		return inside || Polyline.prototype._containsPoint.call(this, p, true);
    	  	}

    	  });


    	  // @factory L.polygon(latlngs: LatLng[], options?: Polyline options)
    	  function polygon(latlngs, options) {
    	  	return new Polygon(latlngs, options);
    	  }

    	  /*
    	   * @class GeoJSON
    	   * @aka L.GeoJSON
    	   * @inherits FeatureGroup
    	   *
    	   * Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse
    	   * GeoJSON data and display it on the map. Extends `FeatureGroup`.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * L.geoJSON(data, {
    	   * 	style: function (feature) {
    	   * 		return {color: feature.properties.color};
    	   * 	}
    	   * }).bindPopup(function (layer) {
    	   * 	return layer.feature.properties.description;
    	   * }).addTo(map);
    	   * ```
    	   */

    	  var GeoJSON = FeatureGroup.extend({

    	  	/* @section
    	  	 * @aka GeoJSON options
    	  	 *
    	  	 * @option pointToLayer: Function = *
    	  	 * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
    	  	 * called when data is added, passing the GeoJSON point feature and its `LatLng`.
    	  	 * The default is to spawn a default `Marker`:
    	  	 * ```js
    	  	 * function(geoJsonPoint, latlng) {
    	  	 * 	return L.marker(latlng);
    	  	 * }
    	  	 * ```
    	  	 *
    	  	 * @option style: Function = *
    	  	 * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
    	  	 * called internally when data is added.
    	  	 * The default value is to not override any defaults:
    	  	 * ```js
    	  	 * function (geoJsonFeature) {
    	  	 * 	return {}
    	  	 * }
    	  	 * ```
    	  	 *
    	  	 * @option onEachFeature: Function = *
    	  	 * A `Function` that will be called once for each created `Feature`, after it has
    	  	 * been created and styled. Useful for attaching events and popups to features.
    	  	 * The default is to do nothing with the newly created layers:
    	  	 * ```js
    	  	 * function (feature, layer) {}
    	  	 * ```
    	  	 *
    	  	 * @option filter: Function = *
    	  	 * A `Function` that will be used to decide whether to include a feature or not.
    	  	 * The default is to include all features:
    	  	 * ```js
    	  	 * function (geoJsonFeature) {
    	  	 * 	return true;
    	  	 * }
    	  	 * ```
    	  	 * Note: dynamically changing the `filter` option will have effect only on newly
    	  	 * added data. It will _not_ re-evaluate already included features.
    	  	 *
    	  	 * @option coordsToLatLng: Function = *
    	  	 * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
    	  	 * The default is the `coordsToLatLng` static method.
    	  	 *
    	  	 * @option markersInheritOptions: Boolean = false
    	  	 * Whether default Markers for "Point" type Features inherit from group options.
    	  	 */

    	  	initialize: function (geojson, options) {
    	  		setOptions(this, options);

    	  		this._layers = {};

    	  		if (geojson) {
    	  			this.addData(geojson);
    	  		}
    	  	},

    	  	// @method addData( <GeoJSON> data ): this
    	  	// Adds a GeoJSON object to the layer.
    	  	addData: function (geojson) {
    	  		var features = isArray(geojson) ? geojson : geojson.features,
    	  		    i, len, feature;

    	  		if (features) {
    	  			for (i = 0, len = features.length; i < len; i++) {
    	  				// only add this if geometry or geometries are set and not null
    	  				feature = features[i];
    	  				if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
    	  					this.addData(feature);
    	  				}
    	  			}
    	  			return this;
    	  		}

    	  		var options = this.options;

    	  		if (options.filter && !options.filter(geojson)) { return this; }

    	  		var layer = geometryToLayer(geojson, options);
    	  		if (!layer) {
    	  			return this;
    	  		}
    	  		layer.feature = asFeature(geojson);

    	  		layer.defaultOptions = layer.options;
    	  		this.resetStyle(layer);

    	  		if (options.onEachFeature) {
    	  			options.onEachFeature(geojson, layer);
    	  		}

    	  		return this.addLayer(layer);
    	  	},

    	  	// @method resetStyle( <Path> layer? ): this
    	  	// Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
    	  	// If `layer` is omitted, the style of all features in the current layer is reset.
    	  	resetStyle: function (layer) {
    	  		if (layer === undefined) {
    	  			return this.eachLayer(this.resetStyle, this);
    	  		}
    	  		// reset any custom styles
    	  		layer.options = extend({}, layer.defaultOptions);
    	  		this._setLayerStyle(layer, this.options.style);
    	  		return this;
    	  	},

    	  	// @method setStyle( <Function> style ): this
    	  	// Changes styles of GeoJSON vector layers with the given style function.
    	  	setStyle: function (style) {
    	  		return this.eachLayer(function (layer) {
    	  			this._setLayerStyle(layer, style);
    	  		}, this);
    	  	},

    	  	_setLayerStyle: function (layer, style) {
    	  		if (layer.setStyle) {
    	  			if (typeof style === 'function') {
    	  				style = style(layer.feature);
    	  			}
    	  			layer.setStyle(style);
    	  		}
    	  	}
    	  });

    	  // @section
    	  // There are several static functions which can be called without instantiating L.GeoJSON:

    	  // @function geometryToLayer(featureData: Object, options?: GeoJSON options): Layer
    	  // Creates a `Layer` from a given GeoJSON feature. Can use a custom
    	  // [`pointToLayer`](#geojson-pointtolayer) and/or [`coordsToLatLng`](#geojson-coordstolatlng)
    	  // functions if provided as options.
    	  function geometryToLayer(geojson, options) {

    	  	var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
    	  	    coords = geometry ? geometry.coordinates : null,
    	  	    layers = [],
    	  	    pointToLayer = options && options.pointToLayer,
    	  	    _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng,
    	  	    latlng, latlngs, i, len;

    	  	if (!coords && !geometry) {
    	  		return null;
    	  	}

    	  	switch (geometry.type) {
    	  	case 'Point':
    	  		latlng = _coordsToLatLng(coords);
    	  		return _pointToLayer(pointToLayer, geojson, latlng, options);

    	  	case 'MultiPoint':
    	  		for (i = 0, len = coords.length; i < len; i++) {
    	  			latlng = _coordsToLatLng(coords[i]);
    	  			layers.push(_pointToLayer(pointToLayer, geojson, latlng, options));
    	  		}
    	  		return new FeatureGroup(layers);

    	  	case 'LineString':
    	  	case 'MultiLineString':
    	  		latlngs = coordsToLatLngs(coords, geometry.type === 'LineString' ? 0 : 1, _coordsToLatLng);
    	  		return new Polyline(latlngs, options);

    	  	case 'Polygon':
    	  	case 'MultiPolygon':
    	  		latlngs = coordsToLatLngs(coords, geometry.type === 'Polygon' ? 1 : 2, _coordsToLatLng);
    	  		return new Polygon(latlngs, options);

    	  	case 'GeometryCollection':
    	  		for (i = 0, len = geometry.geometries.length; i < len; i++) {
    	  			var geoLayer = geometryToLayer({
    	  				geometry: geometry.geometries[i],
    	  				type: 'Feature',
    	  				properties: geojson.properties
    	  			}, options);

    	  			if (geoLayer) {
    	  				layers.push(geoLayer);
    	  			}
    	  		}
    	  		return new FeatureGroup(layers);

    	  	case 'FeatureCollection':
    	  		for (i = 0, len = geometry.features.length; i < len; i++) {
    	  			var featureLayer = geometryToLayer(geometry.features[i], options);

    	  			if (featureLayer) {
    	  				layers.push(featureLayer);
    	  			}
    	  		}
    	  		return new FeatureGroup(layers);

    	  	default:
    	  		throw new Error('Invalid GeoJSON object.');
    	  	}
    	  }

    	  function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
    	  	return pointToLayerFn ?
    	  		pointToLayerFn(geojson, latlng) :
    	  		new Marker(latlng, options && options.markersInheritOptions && options);
    	  }

    	  // @function coordsToLatLng(coords: Array): LatLng
    	  // Creates a `LatLng` object from an array of 2 numbers (longitude, latitude)
    	  // or 3 numbers (longitude, latitude, altitude) used in GeoJSON for points.
    	  function coordsToLatLng(coords) {
    	  	return new LatLng(coords[1], coords[0], coords[2]);
    	  }

    	  // @function coordsToLatLngs(coords: Array, levelsDeep?: Number, coordsToLatLng?: Function): Array
    	  // Creates a multidimensional array of `LatLng`s from a GeoJSON coordinates array.
    	  // `levelsDeep` specifies the nesting level (0 is for an array of points, 1 for an array of arrays of points, etc., 0 by default).
    	  // Can use a custom [`coordsToLatLng`](#geojson-coordstolatlng) function.
    	  function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
    	  	var latlngs = [];

    	  	for (var i = 0, len = coords.length, latlng; i < len; i++) {
    	  		latlng = levelsDeep ?
    	  			coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) :
    	  			(_coordsToLatLng || coordsToLatLng)(coords[i]);

    	  		latlngs.push(latlng);
    	  	}

    	  	return latlngs;
    	  }

    	  // @function latLngToCoords(latlng: LatLng, precision?: Number|false): Array
    	  // Reverse of [`coordsToLatLng`](#geojson-coordstolatlng)
    	  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function.
    	  function latLngToCoords(latlng, precision) {
    	  	latlng = toLatLng(latlng);
    	  	return latlng.alt !== undefined ?
    	  		[formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] :
    	  		[formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
    	  }

    	  // @function latLngsToCoords(latlngs: Array, levelsDeep?: Number, closed?: Boolean, precision?: Number|false): Array
    	  // Reverse of [`coordsToLatLngs`](#geojson-coordstolatlngs)
    	  // `closed` determines whether the first point should be appended to the end of the array to close the feature, only used when `levelsDeep` is 0. False by default.
    	  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function.
    	  function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
    	  	var coords = [];

    	  	for (var i = 0, len = latlngs.length; i < len; i++) {
    	  		// Check for flat arrays required to ensure unbalanced arrays are correctly converted in recursion
    	  		coords.push(levelsDeep ?
    	  			latLngsToCoords(latlngs[i], isFlat(latlngs[i]) ? 0 : levelsDeep - 1, closed, precision) :
    	  			latLngToCoords(latlngs[i], precision));
    	  	}

    	  	if (!levelsDeep && closed) {
    	  		coords.push(coords[0]);
    	  	}

    	  	return coords;
    	  }

    	  function getFeature(layer, newGeometry) {
    	  	return layer.feature ?
    	  		extend({}, layer.feature, {geometry: newGeometry}) :
    	  		asFeature(newGeometry);
    	  }

    	  // @function asFeature(geojson: Object): Object
    	  // Normalize GeoJSON geometries/features into GeoJSON features.
    	  function asFeature(geojson) {
    	  	if (geojson.type === 'Feature' || geojson.type === 'FeatureCollection') {
    	  		return geojson;
    	  	}

    	  	return {
    	  		type: 'Feature',
    	  		properties: {},
    	  		geometry: geojson
    	  	};
    	  }

    	  var PointToGeoJSON = {
    	  	toGeoJSON: function (precision) {
    	  		return getFeature(this, {
    	  			type: 'Point',
    	  			coordinates: latLngToCoords(this.getLatLng(), precision)
    	  		});
    	  	}
    	  };

    	  // @namespace Marker
    	  // @section Other methods
    	  // @method toGeoJSON(precision?: Number|false): Object
    	  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
    	  // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the marker (as a GeoJSON `Point` Feature).
    	  Marker.include(PointToGeoJSON);

    	  // @namespace CircleMarker
    	  // @method toGeoJSON(precision?: Number|false): Object
    	  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
    	  // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the circle marker (as a GeoJSON `Point` Feature).
    	  Circle.include(PointToGeoJSON);
    	  CircleMarker.include(PointToGeoJSON);


    	  // @namespace Polyline
    	  // @method toGeoJSON(precision?: Number|false): Object
    	  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
    	  // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the polyline (as a GeoJSON `LineString` or `MultiLineString` Feature).
    	  Polyline.include({
    	  	toGeoJSON: function (precision) {
    	  		var multi = !isFlat(this._latlngs);

    	  		var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);

    	  		return getFeature(this, {
    	  			type: (multi ? 'Multi' : '') + 'LineString',
    	  			coordinates: coords
    	  		});
    	  	}
    	  });

    	  // @namespace Polygon
    	  // @method toGeoJSON(precision?: Number|false): Object
    	  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
    	  // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the polygon (as a GeoJSON `Polygon` or `MultiPolygon` Feature).
    	  Polygon.include({
    	  	toGeoJSON: function (precision) {
    	  		var holes = !isFlat(this._latlngs),
    	  		    multi = holes && !isFlat(this._latlngs[0]);

    	  		var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);

    	  		if (!holes) {
    	  			coords = [coords];
    	  		}

    	  		return getFeature(this, {
    	  			type: (multi ? 'Multi' : '') + 'Polygon',
    	  			coordinates: coords
    	  		});
    	  	}
    	  });


    	  // @namespace LayerGroup
    	  LayerGroup.include({
    	  	toMultiPoint: function (precision) {
    	  		var coords = [];

    	  		this.eachLayer(function (layer) {
    	  			coords.push(layer.toGeoJSON(precision).geometry.coordinates);
    	  		});

    	  		return getFeature(this, {
    	  			type: 'MultiPoint',
    	  			coordinates: coords
    	  		});
    	  	},

    	  	// @method toGeoJSON(precision?: Number|false): Object
    	  	// Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
    	  	// Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
    	  	toGeoJSON: function (precision) {

    	  		var type = this.feature && this.feature.geometry && this.feature.geometry.type;

    	  		if (type === 'MultiPoint') {
    	  			return this.toMultiPoint(precision);
    	  		}

    	  		var isGeometryCollection = type === 'GeometryCollection',
    	  		    jsons = [];

    	  		this.eachLayer(function (layer) {
    	  			if (layer.toGeoJSON) {
    	  				var json = layer.toGeoJSON(precision);
    	  				if (isGeometryCollection) {
    	  					jsons.push(json.geometry);
    	  				} else {
    	  					var feature = asFeature(json);
    	  					// Squash nested feature collections
    	  					if (feature.type === 'FeatureCollection') {
    	  						jsons.push.apply(jsons, feature.features);
    	  					} else {
    	  						jsons.push(feature);
    	  					}
    	  				}
    	  			}
    	  		});

    	  		if (isGeometryCollection) {
    	  			return getFeature(this, {
    	  				geometries: jsons,
    	  				type: 'GeometryCollection'
    	  			});
    	  		}

    	  		return {
    	  			type: 'FeatureCollection',
    	  			features: jsons
    	  		};
    	  	}
    	  });

    	  // @namespace GeoJSON
    	  // @factory L.geoJSON(geojson?: Object, options?: GeoJSON options)
    	  // Creates a GeoJSON layer. Optionally accepts an object in
    	  // [GeoJSON format](https://tools.ietf.org/html/rfc7946) to display on the map
    	  // (you can alternatively add it later with `addData` method) and an `options` object.
    	  function geoJSON(geojson, options) {
    	  	return new GeoJSON(geojson, options);
    	  }

    	  // Backward compatibility.
    	  var geoJson = geoJSON;

    	  /*
    	   * @class ImageOverlay
    	   * @aka L.ImageOverlay
    	   * @inherits Interactive layer
    	   *
    	   * Used to load and display a single image over specific bounds of the map. Extends `Layer`.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * var imageUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
    	   * 	imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
    	   * L.imageOverlay(imageUrl, imageBounds).addTo(map);
    	   * ```
    	   */

    	  var ImageOverlay = Layer.extend({

    	  	// @section
    	  	// @aka ImageOverlay options
    	  	options: {
    	  		// @option opacity: Number = 1.0
    	  		// The opacity of the image overlay.
    	  		opacity: 1,

    	  		// @option alt: String = ''
    	  		// Text for the `alt` attribute of the image (useful for accessibility).
    	  		alt: '',

    	  		// @option interactive: Boolean = false
    	  		// If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
    	  		interactive: false,

    	  		// @option crossOrigin: Boolean|String = false
    	  		// Whether the crossOrigin attribute will be added to the image.
    	  		// If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
    	  		// Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
    	  		crossOrigin: false,

    	  		// @option errorOverlayUrl: String = ''
    	  		// URL to the overlay image to show in place of the overlay that failed to load.
    	  		errorOverlayUrl: '',

    	  		// @option zIndex: Number = 1
    	  		// The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
    	  		zIndex: 1,

    	  		// @option className: String = ''
    	  		// A custom class name to assign to the image. Empty by default.
    	  		className: ''
    	  	},

    	  	initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
    	  		this._url = url;
    	  		this._bounds = toLatLngBounds(bounds);

    	  		setOptions(this, options);
    	  	},

    	  	onAdd: function () {
    	  		if (!this._image) {
    	  			this._initImage();

    	  			if (this.options.opacity < 1) {
    	  				this._updateOpacity();
    	  			}
    	  		}

    	  		if (this.options.interactive) {
    	  			addClass(this._image, 'leaflet-interactive');
    	  			this.addInteractiveTarget(this._image);
    	  		}

    	  		this.getPane().appendChild(this._image);
    	  		this._reset();
    	  	},

    	  	onRemove: function () {
    	  		remove(this._image);
    	  		if (this.options.interactive) {
    	  			this.removeInteractiveTarget(this._image);
    	  		}
    	  	},

    	  	// @method setOpacity(opacity: Number): this
    	  	// Sets the opacity of the overlay.
    	  	setOpacity: function (opacity) {
    	  		this.options.opacity = opacity;

    	  		if (this._image) {
    	  			this._updateOpacity();
    	  		}
    	  		return this;
    	  	},

    	  	setStyle: function (styleOpts) {
    	  		if (styleOpts.opacity) {
    	  			this.setOpacity(styleOpts.opacity);
    	  		}
    	  		return this;
    	  	},

    	  	// @method bringToFront(): this
    	  	// Brings the layer to the top of all overlays.
    	  	bringToFront: function () {
    	  		if (this._map) {
    	  			toFront(this._image);
    	  		}
    	  		return this;
    	  	},

    	  	// @method bringToBack(): this
    	  	// Brings the layer to the bottom of all overlays.
    	  	bringToBack: function () {
    	  		if (this._map) {
    	  			toBack(this._image);
    	  		}
    	  		return this;
    	  	},

    	  	// @method setUrl(url: String): this
    	  	// Changes the URL of the image.
    	  	setUrl: function (url) {
    	  		this._url = url;

    	  		if (this._image) {
    	  			this._image.src = url;
    	  		}
    	  		return this;
    	  	},

    	  	// @method setBounds(bounds: LatLngBounds): this
    	  	// Update the bounds that this ImageOverlay covers
    	  	setBounds: function (bounds) {
    	  		this._bounds = toLatLngBounds(bounds);

    	  		if (this._map) {
    	  			this._reset();
    	  		}
    	  		return this;
    	  	},

    	  	getEvents: function () {
    	  		var events = {
    	  			zoom: this._reset,
    	  			viewreset: this._reset
    	  		};

    	  		if (this._zoomAnimated) {
    	  			events.zoomanim = this._animateZoom;
    	  		}

    	  		return events;
    	  	},

    	  	// @method setZIndex(value: Number): this
    	  	// Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
    	  	setZIndex: function (value) {
    	  		this.options.zIndex = value;
    	  		this._updateZIndex();
    	  		return this;
    	  	},

    	  	// @method getBounds(): LatLngBounds
    	  	// Get the bounds that this ImageOverlay covers
    	  	getBounds: function () {
    	  		return this._bounds;
    	  	},

    	  	// @method getElement(): HTMLElement
    	  	// Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
    	  	// used by this overlay.
    	  	getElement: function () {
    	  		return this._image;
    	  	},

    	  	_initImage: function () {
    	  		var wasElementSupplied = this._url.tagName === 'IMG';
    	  		var img = this._image = wasElementSupplied ? this._url : create$1('img');

    	  		addClass(img, 'leaflet-image-layer');
    	  		if (this._zoomAnimated) { addClass(img, 'leaflet-zoom-animated'); }
    	  		if (this.options.className) { addClass(img, this.options.className); }

    	  		img.onselectstart = falseFn;
    	  		img.onmousemove = falseFn;

    	  		// @event load: Event
    	  		// Fired when the ImageOverlay layer has loaded its image
    	  		img.onload = bind(this.fire, this, 'load');
    	  		img.onerror = bind(this._overlayOnError, this, 'error');

    	  		if (this.options.crossOrigin || this.options.crossOrigin === '') {
    	  			img.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
    	  		}

    	  		if (this.options.zIndex) {
    	  			this._updateZIndex();
    	  		}

    	  		if (wasElementSupplied) {
    	  			this._url = img.src;
    	  			return;
    	  		}

    	  		img.src = this._url;
    	  		img.alt = this.options.alt;
    	  	},

    	  	_animateZoom: function (e) {
    	  		var scale = this._map.getZoomScale(e.zoom),
    	  		    offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;

    	  		setTransform(this._image, offset, scale);
    	  	},

    	  	_reset: function () {
    	  		var image = this._image,
    	  		    bounds = new Bounds(
    	  		        this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
    	  		        this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
    	  		    size = bounds.getSize();

    	  		setPosition(image, bounds.min);

    	  		image.style.width  = size.x + 'px';
    	  		image.style.height = size.y + 'px';
    	  	},

    	  	_updateOpacity: function () {
    	  		setOpacity(this._image, this.options.opacity);
    	  	},

    	  	_updateZIndex: function () {
    	  		if (this._image && this.options.zIndex !== undefined && this.options.zIndex !== null) {
    	  			this._image.style.zIndex = this.options.zIndex;
    	  		}
    	  	},

    	  	_overlayOnError: function () {
    	  		// @event error: Event
    	  		// Fired when the ImageOverlay layer fails to load its image
    	  		this.fire('error');

    	  		var errorUrl = this.options.errorOverlayUrl;
    	  		if (errorUrl && this._url !== errorUrl) {
    	  			this._url = errorUrl;
    	  			this._image.src = errorUrl;
    	  		}
    	  	},

    	  	// @method getCenter(): LatLng
    	  	// Returns the center of the ImageOverlay.
    	  	getCenter: function () {
    	  		return this._bounds.getCenter();
    	  	}
    	  });

    	  // @factory L.imageOverlay(imageUrl: String, bounds: LatLngBounds, options?: ImageOverlay options)
    	  // Instantiates an image overlay object given the URL of the image and the
    	  // geographical bounds it is tied to.
    	  var imageOverlay = function (url, bounds, options) {
    	  	return new ImageOverlay(url, bounds, options);
    	  };

    	  /*
    	   * @class VideoOverlay
    	   * @aka L.VideoOverlay
    	   * @inherits ImageOverlay
    	   *
    	   * Used to load and display a video player over specific bounds of the map. Extends `ImageOverlay`.
    	   *
    	   * A video overlay uses the [`<video>`](https://developer.mozilla.org/docs/Web/HTML/Element/video)
    	   * HTML5 element.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * var videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
    	   * 	videoBounds = [[ 32, -130], [ 13, -100]];
    	   * L.videoOverlay(videoUrl, videoBounds ).addTo(map);
    	   * ```
    	   */

    	  var VideoOverlay = ImageOverlay.extend({

    	  	// @section
    	  	// @aka VideoOverlay options
    	  	options: {
    	  		// @option autoplay: Boolean = true
    	  		// Whether the video starts playing automatically when loaded.
    	  		// On some browsers autoplay will only work with `muted: true`
    	  		autoplay: true,

    	  		// @option loop: Boolean = true
    	  		// Whether the video will loop back to the beginning when played.
    	  		loop: true,

    	  		// @option keepAspectRatio: Boolean = true
    	  		// Whether the video will save aspect ratio after the projection.
    	  		// Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
    	  		keepAspectRatio: true,

    	  		// @option muted: Boolean = false
    	  		// Whether the video starts on mute when loaded.
    	  		muted: false,

    	  		// @option playsInline: Boolean = true
    	  		// Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
    	  		playsInline: true
    	  	},

    	  	_initImage: function () {
    	  		var wasElementSupplied = this._url.tagName === 'VIDEO';
    	  		var vid = this._image = wasElementSupplied ? this._url : create$1('video');

    	  		addClass(vid, 'leaflet-image-layer');
    	  		if (this._zoomAnimated) { addClass(vid, 'leaflet-zoom-animated'); }
    	  		if (this.options.className) { addClass(vid, this.options.className); }

    	  		vid.onselectstart = falseFn;
    	  		vid.onmousemove = falseFn;

    	  		// @event load: Event
    	  		// Fired when the video has finished loading the first frame
    	  		vid.onloadeddata = bind(this.fire, this, 'load');

    	  		if (wasElementSupplied) {
    	  			var sourceElements = vid.getElementsByTagName('source');
    	  			var sources = [];
    	  			for (var j = 0; j < sourceElements.length; j++) {
    	  				sources.push(sourceElements[j].src);
    	  			}

    	  			this._url = (sourceElements.length > 0) ? sources : [vid.src];
    	  			return;
    	  		}

    	  		if (!isArray(this._url)) { this._url = [this._url]; }

    	  		if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, 'objectFit')) {
    	  			vid.style['objectFit'] = 'fill';
    	  		}
    	  		vid.autoplay = !!this.options.autoplay;
    	  		vid.loop = !!this.options.loop;
    	  		vid.muted = !!this.options.muted;
    	  		vid.playsInline = !!this.options.playsInline;
    	  		for (var i = 0; i < this._url.length; i++) {
    	  			var source = create$1('source');
    	  			source.src = this._url[i];
    	  			vid.appendChild(source);
    	  		}
    	  	}

    	  	// @method getElement(): HTMLVideoElement
    	  	// Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
    	  	// used by this overlay.
    	  });


    	  // @factory L.videoOverlay(video: String|Array|HTMLVideoElement, bounds: LatLngBounds, options?: VideoOverlay options)
    	  // Instantiates an image overlay object given the URL of the video (or array of URLs, or even a video element) and the
    	  // geographical bounds it is tied to.

    	  function videoOverlay(video, bounds, options) {
    	  	return new VideoOverlay(video, bounds, options);
    	  }

    	  /*
    	   * @class SVGOverlay
    	   * @aka L.SVGOverlay
    	   * @inherits ImageOverlay
    	   *
    	   * Used to load, display and provide DOM access to an SVG file over specific bounds of the map. Extends `ImageOverlay`.
    	   *
    	   * An SVG overlay uses the [`<svg>`](https://developer.mozilla.org/docs/Web/SVG/Element/svg) element.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    	   * svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    	   * svgElement.setAttribute('viewBox', "0 0 200 200");
    	   * svgElement.innerHTML = '<rect width="200" height="200"/><rect x="75" y="23" width="50" height="50" style="fill:red"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>';
    	   * var svgElementBounds = [ [ 32, -130 ], [ 13, -100 ] ];
    	   * L.svgOverlay(svgElement, svgElementBounds).addTo(map);
    	   * ```
    	   */

    	  var SVGOverlay = ImageOverlay.extend({
    	  	_initImage: function () {
    	  		var el = this._image = this._url;

    	  		addClass(el, 'leaflet-image-layer');
    	  		if (this._zoomAnimated) { addClass(el, 'leaflet-zoom-animated'); }
    	  		if (this.options.className) { addClass(el, this.options.className); }

    	  		el.onselectstart = falseFn;
    	  		el.onmousemove = falseFn;
    	  	}

    	  	// @method getElement(): SVGElement
    	  	// Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
    	  	// used by this overlay.
    	  });


    	  // @factory L.svgOverlay(svg: String|SVGElement, bounds: LatLngBounds, options?: SVGOverlay options)
    	  // Instantiates an image overlay object given an SVG element and the geographical bounds it is tied to.
    	  // A viewBox attribute is required on the SVG element to zoom in and out properly.

    	  function svgOverlay(el, bounds, options) {
    	  	return new SVGOverlay(el, bounds, options);
    	  }

    	  /*
    	   * @class DivOverlay
    	   * @inherits Interactive layer
    	   * @aka L.DivOverlay
    	   * Base model for L.Popup and L.Tooltip. Inherit from it for custom overlays like plugins.
    	   */

    	  // @namespace DivOverlay
    	  var DivOverlay = Layer.extend({

    	  	// @section
    	  	// @aka DivOverlay options
    	  	options: {
    	  		// @option interactive: Boolean = false
    	  		// If true, the popup/tooltip will listen to the mouse events.
    	  		interactive: false,

    	  		// @option offset: Point = Point(0, 0)
    	  		// The offset of the overlay position.
    	  		offset: [0, 0],

    	  		// @option className: String = ''
    	  		// A custom CSS class name to assign to the overlay.
    	  		className: '',

    	  		// @option pane: String = undefined
    	  		// `Map pane` where the overlay will be added.
    	  		pane: undefined,

    	  		// @option content: String|HTMLElement|Function = ''
    	  		// Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
    	  		// passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
    	  		content: ''
    	  	},

    	  	initialize: function (options, source) {
    	  		if (options && (options instanceof L.LatLng || isArray(options))) {
    	  			this._latlng = toLatLng(options);
    	  			setOptions(this, source);
    	  		} else {
    	  			setOptions(this, options);
    	  			this._source = source;
    	  		}
    	  		if (this.options.content) {
    	  			this._content = this.options.content;
    	  		}
    	  	},

    	  	// @method openOn(map: Map): this
    	  	// Adds the overlay to the map.
    	  	// Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
    	  	openOn: function (map) {
    	  		map = arguments.length ? map : this._source._map; // experimental, not the part of public api
    	  		if (!map.hasLayer(this)) {
    	  			map.addLayer(this);
    	  		}
    	  		return this;
    	  	},

    	  	// @method close(): this
    	  	// Closes the overlay.
    	  	// Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
    	  	// and `layer.closePopup()`/`.closeTooltip()`.
    	  	close: function () {
    	  		if (this._map) {
    	  			this._map.removeLayer(this);
    	  		}
    	  		return this;
    	  	},

    	  	// @method toggle(layer?: Layer): this
    	  	// Opens or closes the overlay bound to layer depending on its current state.
    	  	// Argument may be omitted only for overlay bound to layer.
    	  	// Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
    	  	toggle: function (layer) {
    	  		if (this._map) {
    	  			this.close();
    	  		} else {
    	  			if (arguments.length) {
    	  				this._source = layer;
    	  			} else {
    	  				layer = this._source;
    	  			}
    	  			this._prepareOpen();

    	  			// open the overlay on the map
    	  			this.openOn(layer._map);
    	  		}
    	  		return this;
    	  	},

    	  	onAdd: function (map) {
    	  		this._zoomAnimated = map._zoomAnimated;

    	  		if (!this._container) {
    	  			this._initLayout();
    	  		}

    	  		if (map._fadeAnimated) {
    	  			setOpacity(this._container, 0);
    	  		}

    	  		clearTimeout(this._removeTimeout);
    	  		this.getPane().appendChild(this._container);
    	  		this.update();

    	  		if (map._fadeAnimated) {
    	  			setOpacity(this._container, 1);
    	  		}

    	  		this.bringToFront();

    	  		if (this.options.interactive) {
    	  			addClass(this._container, 'leaflet-interactive');
    	  			this.addInteractiveTarget(this._container);
    	  		}
    	  	},

    	  	onRemove: function (map) {
    	  		if (map._fadeAnimated) {
    	  			setOpacity(this._container, 0);
    	  			this._removeTimeout = setTimeout(bind(remove, undefined, this._container), 200);
    	  		} else {
    	  			remove(this._container);
    	  		}

    	  		if (this.options.interactive) {
    	  			removeClass(this._container, 'leaflet-interactive');
    	  			this.removeInteractiveTarget(this._container);
    	  		}
    	  	},

    	  	// @namespace DivOverlay
    	  	// @method getLatLng: LatLng
    	  	// Returns the geographical point of the overlay.
    	  	getLatLng: function () {
    	  		return this._latlng;
    	  	},

    	  	// @method setLatLng(latlng: LatLng): this
    	  	// Sets the geographical point where the overlay will open.
    	  	setLatLng: function (latlng) {
    	  		this._latlng = toLatLng(latlng);
    	  		if (this._map) {
    	  			this._updatePosition();
    	  			this._adjustPan();
    	  		}
    	  		return this;
    	  	},

    	  	// @method getContent: String|HTMLElement
    	  	// Returns the content of the overlay.
    	  	getContent: function () {
    	  		return this._content;
    	  	},

    	  	// @method setContent(htmlContent: String|HTMLElement|Function): this
    	  	// Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
    	  	// The function should return a `String` or `HTMLElement` to be used in the overlay.
    	  	setContent: function (content) {
    	  		this._content = content;
    	  		this.update();
    	  		return this;
    	  	},

    	  	// @method getElement: String|HTMLElement
    	  	// Returns the HTML container of the overlay.
    	  	getElement: function () {
    	  		return this._container;
    	  	},

    	  	// @method update: null
    	  	// Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
    	  	update: function () {
    	  		if (!this._map) { return; }

    	  		this._container.style.visibility = 'hidden';

    	  		this._updateContent();
    	  		this._updateLayout();
    	  		this._updatePosition();

    	  		this._container.style.visibility = '';

    	  		this._adjustPan();
    	  	},

    	  	getEvents: function () {
    	  		var events = {
    	  			zoom: this._updatePosition,
    	  			viewreset: this._updatePosition
    	  		};

    	  		if (this._zoomAnimated) {
    	  			events.zoomanim = this._animateZoom;
    	  		}
    	  		return events;
    	  	},

    	  	// @method isOpen: Boolean
    	  	// Returns `true` when the overlay is visible on the map.
    	  	isOpen: function () {
    	  		return !!this._map && this._map.hasLayer(this);
    	  	},

    	  	// @method bringToFront: this
    	  	// Brings this overlay in front of other overlays (in the same map pane).
    	  	bringToFront: function () {
    	  		if (this._map) {
    	  			toFront(this._container);
    	  		}
    	  		return this;
    	  	},

    	  	// @method bringToBack: this
    	  	// Brings this overlay to the back of other overlays (in the same map pane).
    	  	bringToBack: function () {
    	  		if (this._map) {
    	  			toBack(this._container);
    	  		}
    	  		return this;
    	  	},

    	  	// prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
    	  	_prepareOpen: function (latlng) {
    	  		var source = this._source;
    	  		if (!source._map) { return false; }

    	  		if (source instanceof FeatureGroup) {
    	  			source = null;
    	  			var layers = this._source._layers;
    	  			for (var id in layers) {
    	  				if (layers[id]._map) {
    	  					source = layers[id];
    	  					break;
    	  				}
    	  			}
    	  			if (!source) { return false; } // Unable to get source layer.

    	  			// set overlay source to this layer
    	  			this._source = source;
    	  		}

    	  		if (!latlng) {
    	  			if (source.getCenter) {
    	  				latlng = source.getCenter();
    	  			} else if (source.getLatLng) {
    	  				latlng = source.getLatLng();
    	  			} else if (source.getBounds) {
    	  				latlng = source.getBounds().getCenter();
    	  			} else {
    	  				throw new Error('Unable to get source layer LatLng.');
    	  			}
    	  		}
    	  		this.setLatLng(latlng);

    	  		if (this._map) {
    	  			// update the overlay (content, layout, etc...)
    	  			this.update();
    	  		}

    	  		return true;
    	  	},

    	  	_updateContent: function () {
    	  		if (!this._content) { return; }

    	  		var node = this._contentNode;
    	  		var content = (typeof this._content === 'function') ? this._content(this._source || this) : this._content;

    	  		if (typeof content === 'string') {
    	  			node.innerHTML = content;
    	  		} else {
    	  			while (node.hasChildNodes()) {
    	  				node.removeChild(node.firstChild);
    	  			}
    	  			node.appendChild(content);
    	  		}

    	  		// @namespace DivOverlay
    	  		// @section DivOverlay events
    	  		// @event contentupdate: Event
    	  		// Fired when the content of the overlay is updated
    	  		this.fire('contentupdate');
    	  	},

    	  	_updatePosition: function () {
    	  		if (!this._map) { return; }

    	  		var pos = this._map.latLngToLayerPoint(this._latlng),
    	  		    offset = toPoint(this.options.offset),
    	  		    anchor = this._getAnchor();

    	  		if (this._zoomAnimated) {
    	  			setPosition(this._container, pos.add(anchor));
    	  		} else {
    	  			offset = offset.add(pos).add(anchor);
    	  		}

    	  		var bottom = this._containerBottom = -offset.y,
    	  		    left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;

    	  		// bottom position the overlay in case the height of the overlay changes (images loading etc)
    	  		this._container.style.bottom = bottom + 'px';
    	  		this._container.style.left = left + 'px';
    	  	},

    	  	_getAnchor: function () {
    	  		return [0, 0];
    	  	}

    	  });

    	  Map.include({
    	  	_initOverlay: function (OverlayClass, content, latlng, options) {
    	  		var overlay = content;
    	  		if (!(overlay instanceof OverlayClass)) {
    	  			overlay = new OverlayClass(options).setContent(content);
    	  		}
    	  		if (latlng) {
    	  			overlay.setLatLng(latlng);
    	  		}
    	  		return overlay;
    	  	}
    	  });


    	  Layer.include({
    	  	_initOverlay: function (OverlayClass, old, content, options) {
    	  		var overlay = content;
    	  		if (overlay instanceof OverlayClass) {
    	  			setOptions(overlay, options);
    	  			overlay._source = this;
    	  		} else {
    	  			overlay = (old && !options) ? old : new OverlayClass(options, this);
    	  			overlay.setContent(content);
    	  		}
    	  		return overlay;
    	  	}
    	  });

    	  /*
    	   * @class Popup
    	   * @inherits DivOverlay
    	   * @aka L.Popup
    	   * Used to open popups in certain places of the map. Use [Map.openPopup](#map-openpopup) to
    	   * open popups while making sure that only one popup is open at one time
    	   * (recommended for usability), or use [Map.addLayer](#map-addlayer) to open as many as you want.
    	   *
    	   * @example
    	   *
    	   * If you want to just bind a popup to marker click and then open it, it's really easy:
    	   *
    	   * ```js
    	   * marker.bindPopup(popupContent).openPopup();
    	   * ```
    	   * Path overlays like polylines also have a `bindPopup` method.
    	   *
    	   * A popup can be also standalone:
    	   *
    	   * ```js
    	   * var popup = L.popup()
    	   * 	.setLatLng(latlng)
    	   * 	.setContent('<p>Hello world!<br />This is a nice popup.</p>')
    	   * 	.openOn(map);
    	   * ```
    	   * or
    	   * ```js
    	   * var popup = L.popup(latlng, {content: '<p>Hello world!<br />This is a nice popup.</p>')
    	   * 	.openOn(map);
    	   * ```
    	   */


    	  // @namespace Popup
    	  var Popup = DivOverlay.extend({

    	  	// @section
    	  	// @aka Popup options
    	  	options: {
    	  		// @option pane: String = 'popupPane'
    	  		// `Map pane` where the popup will be added.
    	  		pane: 'popupPane',

    	  		// @option offset: Point = Point(0, 7)
    	  		// The offset of the popup position.
    	  		offset: [0, 7],

    	  		// @option maxWidth: Number = 300
    	  		// Max width of the popup, in pixels.
    	  		maxWidth: 300,

    	  		// @option minWidth: Number = 50
    	  		// Min width of the popup, in pixels.
    	  		minWidth: 50,

    	  		// @option maxHeight: Number = null
    	  		// If set, creates a scrollable container of the given height
    	  		// inside a popup if its content exceeds it.
    	  		// The scrollable container can be styled using the
    	  		// `leaflet-popup-scrolled` CSS class selector.
    	  		maxHeight: null,

    	  		// @option autoPan: Boolean = true
    	  		// Set it to `false` if you don't want the map to do panning animation
    	  		// to fit the opened popup.
    	  		autoPan: true,

    	  		// @option autoPanPaddingTopLeft: Point = null
    	  		// The margin between the popup and the top left corner of the map
    	  		// view after autopanning was performed.
    	  		autoPanPaddingTopLeft: null,

    	  		// @option autoPanPaddingBottomRight: Point = null
    	  		// The margin between the popup and the bottom right corner of the map
    	  		// view after autopanning was performed.
    	  		autoPanPaddingBottomRight: null,

    	  		// @option autoPanPadding: Point = Point(5, 5)
    	  		// Equivalent of setting both top left and bottom right autopan padding to the same value.
    	  		autoPanPadding: [5, 5],

    	  		// @option keepInView: Boolean = false
    	  		// Set it to `true` if you want to prevent users from panning the popup
    	  		// off of the screen while it is open.
    	  		keepInView: false,

    	  		// @option closeButton: Boolean = true
    	  		// Controls the presence of a close button in the popup.
    	  		closeButton: true,

    	  		// @option autoClose: Boolean = true
    	  		// Set it to `false` if you want to override the default behavior of
    	  		// the popup closing when another popup is opened.
    	  		autoClose: true,

    	  		// @option closeOnEscapeKey: Boolean = true
    	  		// Set it to `false` if you want to override the default behavior of
    	  		// the ESC key for closing of the popup.
    	  		closeOnEscapeKey: true,

    	  		// @option closeOnClick: Boolean = *
    	  		// Set it if you want to override the default behavior of the popup closing when user clicks
    	  		// on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.

    	  		// @option className: String = ''
    	  		// A custom CSS class name to assign to the popup.
    	  		className: ''
    	  	},

    	  	// @namespace Popup
    	  	// @method openOn(map: Map): this
    	  	// Alternative to `map.openPopup(popup)`.
    	  	// Adds the popup to the map and closes the previous one.
    	  	openOn: function (map) {
    	  		map = arguments.length ? map : this._source._map; // experimental, not the part of public api

    	  		if (!map.hasLayer(this) && map._popup && map._popup.options.autoClose) {
    	  			map.removeLayer(map._popup);
    	  		}
    	  		map._popup = this;

    	  		return DivOverlay.prototype.openOn.call(this, map);
    	  	},

    	  	onAdd: function (map) {
    	  		DivOverlay.prototype.onAdd.call(this, map);

    	  		// @namespace Map
    	  		// @section Popup events
    	  		// @event popupopen: PopupEvent
    	  		// Fired when a popup is opened in the map
    	  		map.fire('popupopen', {popup: this});

    	  		if (this._source) {
    	  			// @namespace Layer
    	  			// @section Popup events
    	  			// @event popupopen: PopupEvent
    	  			// Fired when a popup bound to this layer is opened
    	  			this._source.fire('popupopen', {popup: this}, true);
    	  			// For non-path layers, we toggle the popup when clicking
    	  			// again the layer, so prevent the map to reopen it.
    	  			if (!(this._source instanceof Path)) {
    	  				this._source.on('preclick', stopPropagation);
    	  			}
    	  		}
    	  	},

    	  	onRemove: function (map) {
    	  		DivOverlay.prototype.onRemove.call(this, map);

    	  		// @namespace Map
    	  		// @section Popup events
    	  		// @event popupclose: PopupEvent
    	  		// Fired when a popup in the map is closed
    	  		map.fire('popupclose', {popup: this});

    	  		if (this._source) {
    	  			// @namespace Layer
    	  			// @section Popup events
    	  			// @event popupclose: PopupEvent
    	  			// Fired when a popup bound to this layer is closed
    	  			this._source.fire('popupclose', {popup: this}, true);
    	  			if (!(this._source instanceof Path)) {
    	  				this._source.off('preclick', stopPropagation);
    	  			}
    	  		}
    	  	},

    	  	getEvents: function () {
    	  		var events = DivOverlay.prototype.getEvents.call(this);

    	  		if (this.options.closeOnClick !== undefined ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
    	  			events.preclick = this.close;
    	  		}

    	  		if (this.options.keepInView) {
    	  			events.moveend = this._adjustPan;
    	  		}

    	  		return events;
    	  	},

    	  	_initLayout: function () {
    	  		var prefix = 'leaflet-popup',
    	  		    container = this._container = create$1('div',
    	  			prefix + ' ' + (this.options.className || '') +
    	  			' leaflet-zoom-animated');

    	  		var wrapper = this._wrapper = create$1('div', prefix + '-content-wrapper', container);
    	  		this._contentNode = create$1('div', prefix + '-content', wrapper);

    	  		disableClickPropagation(container);
    	  		disableScrollPropagation(this._contentNode);
    	  		on(container, 'contextmenu', stopPropagation);

    	  		this._tipContainer = create$1('div', prefix + '-tip-container', container);
    	  		this._tip = create$1('div', prefix + '-tip', this._tipContainer);

    	  		if (this.options.closeButton) {
    	  			var closeButton = this._closeButton = create$1('a', prefix + '-close-button', container);
    	  			closeButton.setAttribute('role', 'button'); // overrides the implicit role=link of <a> elements #7399
    	  			closeButton.setAttribute('aria-label', 'Close popup');
    	  			closeButton.href = '#close';
    	  			closeButton.innerHTML = '<span aria-hidden="true">&#215;</span>';

    	  			on(closeButton, 'click', function (ev) {
    	  				preventDefault(ev);
    	  				this.close();
    	  			}, this);
    	  		}
    	  	},

    	  	_updateLayout: function () {
    	  		var container = this._contentNode,
    	  		    style = container.style;

    	  		style.width = '';
    	  		style.whiteSpace = 'nowrap';

    	  		var width = container.offsetWidth;
    	  		width = Math.min(width, this.options.maxWidth);
    	  		width = Math.max(width, this.options.minWidth);

    	  		style.width = (width + 1) + 'px';
    	  		style.whiteSpace = '';

    	  		style.height = '';

    	  		var height = container.offsetHeight,
    	  		    maxHeight = this.options.maxHeight,
    	  		    scrolledClass = 'leaflet-popup-scrolled';

    	  		if (maxHeight && height > maxHeight) {
    	  			style.height = maxHeight + 'px';
    	  			addClass(container, scrolledClass);
    	  		} else {
    	  			removeClass(container, scrolledClass);
    	  		}

    	  		this._containerWidth = this._container.offsetWidth;
    	  	},

    	  	_animateZoom: function (e) {
    	  		var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
    	  		    anchor = this._getAnchor();
    	  		setPosition(this._container, pos.add(anchor));
    	  	},

    	  	_adjustPan: function (e) {
    	  		if (!this.options.autoPan) { return; }
    	  		if (this._map._panAnim) { this._map._panAnim.stop(); }

    	  		var map = this._map,
    	  		    marginBottom = parseInt(getStyle(this._container, 'marginBottom'), 10) || 0,
    	  		    containerHeight = this._container.offsetHeight + marginBottom,
    	  		    containerWidth = this._containerWidth,
    	  		    layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);

    	  		layerPos._add(getPosition(this._container));

    	  		var containerPos = map.layerPointToContainerPoint(layerPos),
    	  		    padding = toPoint(this.options.autoPanPadding),
    	  		    paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding),
    	  		    paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding),
    	  		    size = map.getSize(),
    	  		    dx = 0,
    	  		    dy = 0;

    	  		if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
    	  			dx = containerPos.x + containerWidth - size.x + paddingBR.x;
    	  		}
    	  		if (containerPos.x - dx - paddingTL.x < 0) { // left
    	  			dx = containerPos.x - paddingTL.x;
    	  		}
    	  		if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
    	  			dy = containerPos.y + containerHeight - size.y + paddingBR.y;
    	  		}
    	  		if (containerPos.y - dy - paddingTL.y < 0) { // top
    	  			dy = containerPos.y - paddingTL.y;
    	  		}

    	  		// @namespace Map
    	  		// @section Popup events
    	  		// @event autopanstart: Event
    	  		// Fired when the map starts autopanning when opening a popup.
    	  		if (dx || dy) {
    	  			map
    	  			    .fire('autopanstart')
    	  			    .panBy([dx, dy], {animate: e && e.type === 'moveend'});
    	  		}
    	  	},

    	  	_getAnchor: function () {
    	  		// Where should we anchor the popup on the source layer?
    	  		return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
    	  	}

    	  });

    	  // @namespace Popup
    	  // @factory L.popup(options?: Popup options, source?: Layer)
    	  // Instantiates a `Popup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
    	  // @alternative
    	  // @factory L.popup(latlng: LatLng, options?: Popup options)
    	  // Instantiates a `Popup` object given `latlng` where the popup will open and an optional `options` object that describes its appearance and location.
    	  var popup = function (options, source) {
    	  	return new Popup(options, source);
    	  };


    	  /* @namespace Map
    	   * @section Interaction Options
    	   * @option closePopupOnClick: Boolean = true
    	   * Set it to `false` if you don't want popups to close when user clicks the map.
    	   */
    	  Map.mergeOptions({
    	  	closePopupOnClick: true
    	  });


    	  // @namespace Map
    	  // @section Methods for Layers and Controls
    	  Map.include({
    	  	// @method openPopup(popup: Popup): this
    	  	// Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
    	  	// @alternative
    	  	// @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
    	  	// Creates a popup with the specified content and options and opens it in the given point on a map.
    	  	openPopup: function (popup, latlng, options) {
    	  		this._initOverlay(Popup, popup, latlng, options)
    	  		  .openOn(this);

    	  		return this;
    	  	},

    	  	// @method closePopup(popup?: Popup): this
    	  	// Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
    	  	closePopup: function (popup) {
    	  		popup = arguments.length ? popup : this._popup;
    	  		if (popup) {
    	  			popup.close();
    	  		}
    	  		return this;
    	  	}
    	  });

    	  /*
    	   * @namespace Layer
    	   * @section Popup methods example
    	   *
    	   * All layers share a set of methods convenient for binding popups to it.
    	   *
    	   * ```js
    	   * var layer = L.Polygon(latlngs).bindPopup('Hi There!').addTo(map);
    	   * layer.openPopup();
    	   * layer.closePopup();
    	   * ```
    	   *
    	   * Popups will also be automatically opened when the layer is clicked on and closed when the layer is removed from the map or another popup is opened.
    	   */

    	  // @section Popup methods
    	  Layer.include({

    	  	// @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
    	  	// Binds a popup to the layer with the passed `content` and sets up the
    	  	// necessary event listeners. If a `Function` is passed it will receive
    	  	// the layer as the first argument and should return a `String` or `HTMLElement`.
    	  	bindPopup: function (content, options) {
    	  		this._popup = this._initOverlay(Popup, this._popup, content, options);
    	  		if (!this._popupHandlersAdded) {
    	  			this.on({
    	  				click: this._openPopup,
    	  				keypress: this._onKeyPress,
    	  				remove: this.closePopup,
    	  				move: this._movePopup
    	  			});
    	  			this._popupHandlersAdded = true;
    	  		}

    	  		return this;
    	  	},

    	  	// @method unbindPopup(): this
    	  	// Removes the popup previously bound with `bindPopup`.
    	  	unbindPopup: function () {
    	  		if (this._popup) {
    	  			this.off({
    	  				click: this._openPopup,
    	  				keypress: this._onKeyPress,
    	  				remove: this.closePopup,
    	  				move: this._movePopup
    	  			});
    	  			this._popupHandlersAdded = false;
    	  			this._popup = null;
    	  		}
    	  		return this;
    	  	},

    	  	// @method openPopup(latlng?: LatLng): this
    	  	// Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
    	  	openPopup: function (latlng) {
    	  		if (this._popup && this._popup._prepareOpen(latlng || this._latlng)) {

    	  			// open the popup on the map
    	  			this._popup.openOn(this._map);
    	  		}
    	  		return this;
    	  	},

    	  	// @method closePopup(): this
    	  	// Closes the popup bound to this layer if it is open.
    	  	closePopup: function () {
    	  		if (this._popup) {
    	  			this._popup.close();
    	  		}
    	  		return this;
    	  	},

    	  	// @method togglePopup(): this
    	  	// Opens or closes the popup bound to this layer depending on its current state.
    	  	togglePopup: function () {
    	  		if (this._popup) {
    	  			this._popup.toggle(this);
    	  		}
    	  		return this;
    	  	},

    	  	// @method isPopupOpen(): boolean
    	  	// Returns `true` if the popup bound to this layer is currently open.
    	  	isPopupOpen: function () {
    	  		return (this._popup ? this._popup.isOpen() : false);
    	  	},

    	  	// @method setPopupContent(content: String|HTMLElement|Popup): this
    	  	// Sets the content of the popup bound to this layer.
    	  	setPopupContent: function (content) {
    	  		if (this._popup) {
    	  			this._popup.setContent(content);
    	  		}
    	  		return this;
    	  	},

    	  	// @method getPopup(): Popup
    	  	// Returns the popup bound to this layer.
    	  	getPopup: function () {
    	  		return this._popup;
    	  	},

    	  	_openPopup: function (e) {
    	  		if (!this._popup || !this._map) {
    	  			return;
    	  		}
    	  		// prevent map click
    	  		stop(e);

    	  		var target = e.layer || e.target;
    	  		if (this._popup._source === target && !(target instanceof Path)) {
    	  			// treat it like a marker and figure out
    	  			// if we should toggle it open/closed
    	  			if (this._map.hasLayer(this._popup)) {
    	  				this.closePopup();
    	  			} else {
    	  				this.openPopup(e.latlng);
    	  			}
    	  			return;
    	  		}
    	  		this._popup._source = target;
    	  		this.openPopup(e.latlng);
    	  	},

    	  	_movePopup: function (e) {
    	  		this._popup.setLatLng(e.latlng);
    	  	},

    	  	_onKeyPress: function (e) {
    	  		if (e.originalEvent.keyCode === 13) {
    	  			this._openPopup(e);
    	  		}
    	  	}
    	  });

    	  /*
    	   * @class Tooltip
    	   * @inherits DivOverlay
    	   * @aka L.Tooltip
    	   * Used to display small texts on top of map layers.
    	   *
    	   * @example
    	   * If you want to just bind a tooltip to marker:
    	   *
    	   * ```js
    	   * marker.bindTooltip("my tooltip text").openTooltip();
    	   * ```
    	   * Path overlays like polylines also have a `bindTooltip` method.
    	   *
    	   * A tooltip can be also standalone:
    	   *
    	   * ```js
    	   * var tooltip = L.tooltip()
    	   * 	.setLatLng(latlng)
    	   * 	.setContent('Hello world!<br />This is a nice tooltip.')
    	   * 	.addTo(map);
    	   * ```
    	   * or
    	   * ```js
    	   * var tooltip = L.tooltip(latlng, {content: 'Hello world!<br />This is a nice tooltip.'})
    	   * 	.addTo(map);
    	   * ```
    	   *
    	   *
    	   * Note about tooltip offset. Leaflet takes two options in consideration
    	   * for computing tooltip offsetting:
    	   * - the `offset` Tooltip option: it defaults to [0, 0], and it's specific to one tooltip.
    	   *   Add a positive x offset to move the tooltip to the right, and a positive y offset to
    	   *   move it to the bottom. Negatives will move to the left and top.
    	   * - the `tooltipAnchor` Icon option: this will only be considered for Marker. You
    	   *   should adapt this value if you use a custom icon.
    	   */


    	  // @namespace Tooltip
    	  var Tooltip = DivOverlay.extend({

    	  	// @section
    	  	// @aka Tooltip options
    	  	options: {
    	  		// @option pane: String = 'tooltipPane'
    	  		// `Map pane` where the tooltip will be added.
    	  		pane: 'tooltipPane',

    	  		// @option offset: Point = Point(0, 0)
    	  		// Optional offset of the tooltip position.
    	  		offset: [0, 0],

    	  		// @option direction: String = 'auto'
    	  		// Direction where to open the tooltip. Possible values are: `right`, `left`,
    	  		// `top`, `bottom`, `center`, `auto`.
    	  		// `auto` will dynamically switch between `right` and `left` according to the tooltip
    	  		// position on the map.
    	  		direction: 'auto',

    	  		// @option permanent: Boolean = false
    	  		// Whether to open the tooltip permanently or only on mouseover.
    	  		permanent: false,

    	  		// @option sticky: Boolean = false
    	  		// If true, the tooltip will follow the mouse instead of being fixed at the feature center.
    	  		sticky: false,

    	  		// @option opacity: Number = 0.9
    	  		// Tooltip container opacity.
    	  		opacity: 0.9
    	  	},

    	  	onAdd: function (map) {
    	  		DivOverlay.prototype.onAdd.call(this, map);
    	  		this.setOpacity(this.options.opacity);

    	  		// @namespace Map
    	  		// @section Tooltip events
    	  		// @event tooltipopen: TooltipEvent
    	  		// Fired when a tooltip is opened in the map.
    	  		map.fire('tooltipopen', {tooltip: this});

    	  		if (this._source) {
    	  			this.addEventParent(this._source);

    	  			// @namespace Layer
    	  			// @section Tooltip events
    	  			// @event tooltipopen: TooltipEvent
    	  			// Fired when a tooltip bound to this layer is opened.
    	  			this._source.fire('tooltipopen', {tooltip: this}, true);
    	  		}
    	  	},

    	  	onRemove: function (map) {
    	  		DivOverlay.prototype.onRemove.call(this, map);

    	  		// @namespace Map
    	  		// @section Tooltip events
    	  		// @event tooltipclose: TooltipEvent
    	  		// Fired when a tooltip in the map is closed.
    	  		map.fire('tooltipclose', {tooltip: this});

    	  		if (this._source) {
    	  			this.removeEventParent(this._source);

    	  			// @namespace Layer
    	  			// @section Tooltip events
    	  			// @event tooltipclose: TooltipEvent
    	  			// Fired when a tooltip bound to this layer is closed.
    	  			this._source.fire('tooltipclose', {tooltip: this}, true);
    	  		}
    	  	},

    	  	getEvents: function () {
    	  		var events = DivOverlay.prototype.getEvents.call(this);

    	  		if (!this.options.permanent) {
    	  			events.preclick = this.close;
    	  		}

    	  		return events;
    	  	},

    	  	_initLayout: function () {
    	  		var prefix = 'leaflet-tooltip',
    	  		    className = prefix + ' ' + (this.options.className || '') + ' leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

    	  		this._contentNode = this._container = create$1('div', className);

    	  		this._container.setAttribute('role', 'tooltip');
    	  		this._container.setAttribute('id', 'leaflet-tooltip-' + stamp(this));
    	  	},

    	  	_updateLayout: function () {},

    	  	_adjustPan: function () {},

    	  	_setPosition: function (pos) {
    	  		var subX, subY,
    	  		    map = this._map,
    	  		    container = this._container,
    	  		    centerPoint = map.latLngToContainerPoint(map.getCenter()),
    	  		    tooltipPoint = map.layerPointToContainerPoint(pos),
    	  		    direction = this.options.direction,
    	  		    tooltipWidth = container.offsetWidth,
    	  		    tooltipHeight = container.offsetHeight,
    	  		    offset = toPoint(this.options.offset),
    	  		    anchor = this._getAnchor();

    	  		if (direction === 'top') {
    	  			subX = tooltipWidth / 2;
    	  			subY = tooltipHeight;
    	  		} else if (direction === 'bottom') {
    	  			subX = tooltipWidth / 2;
    	  			subY = 0;
    	  		} else if (direction === 'center') {
    	  			subX = tooltipWidth / 2;
    	  			subY = tooltipHeight / 2;
    	  		} else if (direction === 'right') {
    	  			subX = 0;
    	  			subY = tooltipHeight / 2;
    	  		} else if (direction === 'left') {
    	  			subX = tooltipWidth;
    	  			subY = tooltipHeight / 2;
    	  		} else if (tooltipPoint.x < centerPoint.x) {
    	  			direction = 'right';
    	  			subX = 0;
    	  			subY = tooltipHeight / 2;
    	  		} else {
    	  			direction = 'left';
    	  			subX = tooltipWidth + (offset.x + anchor.x) * 2;
    	  			subY = tooltipHeight / 2;
    	  		}

    	  		pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);

    	  		removeClass(container, 'leaflet-tooltip-right');
    	  		removeClass(container, 'leaflet-tooltip-left');
    	  		removeClass(container, 'leaflet-tooltip-top');
    	  		removeClass(container, 'leaflet-tooltip-bottom');
    	  		addClass(container, 'leaflet-tooltip-' + direction);
    	  		setPosition(container, pos);
    	  	},

    	  	_updatePosition: function () {
    	  		var pos = this._map.latLngToLayerPoint(this._latlng);
    	  		this._setPosition(pos);
    	  	},

    	  	setOpacity: function (opacity) {
    	  		this.options.opacity = opacity;

    	  		if (this._container) {
    	  			setOpacity(this._container, opacity);
    	  		}
    	  	},

    	  	_animateZoom: function (e) {
    	  		var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
    	  		this._setPosition(pos);
    	  	},

    	  	_getAnchor: function () {
    	  		// Where should we anchor the tooltip on the source layer?
    	  		return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
    	  	}

    	  });

    	  // @namespace Tooltip
    	  // @factory L.tooltip(options?: Tooltip options, source?: Layer)
    	  // Instantiates a `Tooltip` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the tooltip with a reference to the Layer to which it refers.
    	  // @alternative
    	  // @factory L.tooltip(latlng: LatLng, options?: Tooltip options)
    	  // Instantiates a `Tooltip` object given `latlng` where the tooltip will open and an optional `options` object that describes its appearance and location.
    	  var tooltip = function (options, source) {
    	  	return new Tooltip(options, source);
    	  };

    	  // @namespace Map
    	  // @section Methods for Layers and Controls
    	  Map.include({

    	  	// @method openTooltip(tooltip: Tooltip): this
    	  	// Opens the specified tooltip.
    	  	// @alternative
    	  	// @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
    	  	// Creates a tooltip with the specified content and options and open it.
    	  	openTooltip: function (tooltip, latlng, options) {
    	  		this._initOverlay(Tooltip, tooltip, latlng, options)
    	  		  .openOn(this);

    	  		return this;
    	  	},

    	  	// @method closeTooltip(tooltip: Tooltip): this
    	  	// Closes the tooltip given as parameter.
    	  	closeTooltip: function (tooltip) {
    	  		tooltip.close();
    	  		return this;
    	  	}

    	  });

    	  /*
    	   * @namespace Layer
    	   * @section Tooltip methods example
    	   *
    	   * All layers share a set of methods convenient for binding tooltips to it.
    	   *
    	   * ```js
    	   * var layer = L.Polygon(latlngs).bindTooltip('Hi There!').addTo(map);
    	   * layer.openTooltip();
    	   * layer.closeTooltip();
    	   * ```
    	   */

    	  // @section Tooltip methods
    	  Layer.include({

    	  	// @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
    	  	// Binds a tooltip to the layer with the passed `content` and sets up the
    	  	// necessary event listeners. If a `Function` is passed it will receive
    	  	// the layer as the first argument and should return a `String` or `HTMLElement`.
    	  	bindTooltip: function (content, options) {

    	  		if (this._tooltip && this.isTooltipOpen()) {
    	  			this.unbindTooltip();
    	  		}

    	  		this._tooltip = this._initOverlay(Tooltip, this._tooltip, content, options);
    	  		this._initTooltipInteractions();

    	  		if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
    	  			this.openTooltip();
    	  		}

    	  		return this;
    	  	},

    	  	// @method unbindTooltip(): this
    	  	// Removes the tooltip previously bound with `bindTooltip`.
    	  	unbindTooltip: function () {
    	  		if (this._tooltip) {
    	  			this._initTooltipInteractions(true);
    	  			this.closeTooltip();
    	  			this._tooltip = null;
    	  		}
    	  		return this;
    	  	},

    	  	_initTooltipInteractions: function (remove) {
    	  		if (!remove && this._tooltipHandlersAdded) { return; }
    	  		var onOff = remove ? 'off' : 'on',
    	  		    events = {
    	  			remove: this.closeTooltip,
    	  			move: this._moveTooltip
    	  		    };
    	  		if (!this._tooltip.options.permanent) {
    	  			events.mouseover = this._openTooltip;
    	  			events.mouseout = this.closeTooltip;
    	  			events.click = this._openTooltip;
    	  			if (this._map) {
    	  				this._addFocusListeners();
    	  			} else {
    	  				events.add = this._addFocusListeners;
    	  			}
    	  		} else {
    	  			events.add = this._openTooltip;
    	  		}
    	  		if (this._tooltip.options.sticky) {
    	  			events.mousemove = this._moveTooltip;
    	  		}
    	  		this[onOff](events);
    	  		this._tooltipHandlersAdded = !remove;
    	  	},

    	  	// @method openTooltip(latlng?: LatLng): this
    	  	// Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
    	  	openTooltip: function (latlng) {
    	  		if (this._tooltip && this._tooltip._prepareOpen(latlng)) {
    	  			// open the tooltip on the map
    	  			this._tooltip.openOn(this._map);

    	  			if (this.getElement) {
    	  				this._setAriaDescribedByOnLayer(this);
    	  			} else if (this.eachLayer) {
    	  				this.eachLayer(this._setAriaDescribedByOnLayer, this);
    	  			}
    	  		}
    	  		return this;
    	  	},

    	  	// @method closeTooltip(): this
    	  	// Closes the tooltip bound to this layer if it is open.
    	  	closeTooltip: function () {
    	  		if (this._tooltip) {
    	  			return this._tooltip.close();
    	  		}
    	  	},

    	  	// @method toggleTooltip(): this
    	  	// Opens or closes the tooltip bound to this layer depending on its current state.
    	  	toggleTooltip: function () {
    	  		if (this._tooltip) {
    	  			this._tooltip.toggle(this);
    	  		}
    	  		return this;
    	  	},

    	  	// @method isTooltipOpen(): boolean
    	  	// Returns `true` if the tooltip bound to this layer is currently open.
    	  	isTooltipOpen: function () {
    	  		return this._tooltip.isOpen();
    	  	},

    	  	// @method setTooltipContent(content: String|HTMLElement|Tooltip): this
    	  	// Sets the content of the tooltip bound to this layer.
    	  	setTooltipContent: function (content) {
    	  		if (this._tooltip) {
    	  			this._tooltip.setContent(content);
    	  		}
    	  		return this;
    	  	},

    	  	// @method getTooltip(): Tooltip
    	  	// Returns the tooltip bound to this layer.
    	  	getTooltip: function () {
    	  		return this._tooltip;
    	  	},

    	  	_addFocusListeners: function () {
    	  		if (this.getElement) {
    	  			this._addFocusListenersOnLayer(this);
    	  		} else if (this.eachLayer) {
    	  			this.eachLayer(this._addFocusListenersOnLayer, this);
    	  		}
    	  	},

    	  	_addFocusListenersOnLayer: function (layer) {
    	  		var el = layer.getElement();
    	  		if (el) {
    	  			on(el, 'focus', function () {
    	  				this._tooltip._source = layer;
    	  				this.openTooltip();
    	  			}, this);
    	  			on(el, 'blur', this.closeTooltip, this);
    	  		}
    	  	},

    	  	_setAriaDescribedByOnLayer: function (layer) {
    	  		var el = layer.getElement();
    	  		if (el) {
    	  			el.setAttribute('aria-describedby', this._tooltip._container.id);
    	  		}
    	  	},


    	  	_openTooltip: function (e) {
    	  		if (!this._tooltip || !this._map || (this._map.dragging && this._map.dragging.moving())) {
    	  			return;
    	  		}
    	  		this._tooltip._source = e.layer || e.target;

    	  		this.openTooltip(this._tooltip.options.sticky ? e.latlng : undefined);
    	  	},

    	  	_moveTooltip: function (e) {
    	  		var latlng = e.latlng, containerPoint, layerPoint;
    	  		if (this._tooltip.options.sticky && e.originalEvent) {
    	  			containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
    	  			layerPoint = this._map.containerPointToLayerPoint(containerPoint);
    	  			latlng = this._map.layerPointToLatLng(layerPoint);
    	  		}
    	  		this._tooltip.setLatLng(latlng);
    	  	}
    	  });

    	  /*
    	   * @class DivIcon
    	   * @aka L.DivIcon
    	   * @inherits Icon
    	   *
    	   * Represents a lightweight icon for markers that uses a simple `<div>`
    	   * element instead of an image. Inherits from `Icon` but ignores the `iconUrl` and shadow options.
    	   *
    	   * @example
    	   * ```js
    	   * var myIcon = L.divIcon({className: 'my-div-icon'});
    	   * // you can set .my-div-icon styles in CSS
    	   *
    	   * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
    	   * ```
    	   *
    	   * By default, it has a 'leaflet-div-icon' CSS class and is styled as a little white square with a shadow.
    	   */

    	  var DivIcon = Icon.extend({
    	  	options: {
    	  		// @section
    	  		// @aka DivIcon options
    	  		iconSize: [12, 12], // also can be set through CSS

    	  		// iconAnchor: (Point),
    	  		// popupAnchor: (Point),

    	  		// @option html: String|HTMLElement = ''
    	  		// Custom HTML code to put inside the div element, empty by default. Alternatively,
    	  		// an instance of `HTMLElement`.
    	  		html: false,

    	  		// @option bgPos: Point = [0, 0]
    	  		// Optional relative position of the background, in pixels
    	  		bgPos: null,

    	  		className: 'leaflet-div-icon'
    	  	},

    	  	createIcon: function (oldIcon) {
    	  		var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
    	  		    options = this.options;

    	  		if (options.html instanceof Element) {
    	  			empty(div);
    	  			div.appendChild(options.html);
    	  		} else {
    	  			div.innerHTML = options.html !== false ? options.html : '';
    	  		}

    	  		if (options.bgPos) {
    	  			var bgPos = toPoint(options.bgPos);
    	  			div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
    	  		}
    	  		this._setIconStyles(div, 'icon');

    	  		return div;
    	  	},

    	  	createShadow: function () {
    	  		return null;
    	  	}
    	  });

    	  // @factory L.divIcon(options: DivIcon options)
    	  // Creates a `DivIcon` instance with the given options.
    	  function divIcon(options) {
    	  	return new DivIcon(options);
    	  }

    	  Icon.Default = IconDefault;

    	  /*
    	   * @class GridLayer
    	   * @inherits Layer
    	   * @aka L.GridLayer
    	   *
    	   * Generic class for handling a tiled grid of HTML elements. This is the base class for all tile layers and replaces `TileLayer.Canvas`.
    	   * GridLayer can be extended to create a tiled grid of HTML elements like `<canvas>`, `<img>` or `<div>`. GridLayer will handle creating and animating these DOM elements for you.
    	   *
    	   *
    	   * @section Synchronous usage
    	   * @example
    	   *
    	   * To create a custom layer, extend GridLayer and implement the `createTile()` method, which will be passed a `Point` object with the `x`, `y`, and `z` (zoom level) coordinates to draw your tile.
    	   *
    	   * ```js
    	   * var CanvasLayer = L.GridLayer.extend({
    	   *     createTile: function(coords){
    	   *         // create a <canvas> element for drawing
    	   *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
    	   *
    	   *         // setup tile width and height according to the options
    	   *         var size = this.getTileSize();
    	   *         tile.width = size.x;
    	   *         tile.height = size.y;
    	   *
    	   *         // get a canvas context and draw something on it using coords.x, coords.y and coords.z
    	   *         var ctx = tile.getContext('2d');
    	   *
    	   *         // return the tile so it can be rendered on screen
    	   *         return tile;
    	   *     }
    	   * });
    	   * ```
    	   *
    	   * @section Asynchronous usage
    	   * @example
    	   *
    	   * Tile creation can also be asynchronous, this is useful when using a third-party drawing library. Once the tile is finished drawing it can be passed to the `done()` callback.
    	   *
    	   * ```js
    	   * var CanvasLayer = L.GridLayer.extend({
    	   *     createTile: function(coords, done){
    	   *         var error;
    	   *
    	   *         // create a <canvas> element for drawing
    	   *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
    	   *
    	   *         // setup tile width and height according to the options
    	   *         var size = this.getTileSize();
    	   *         tile.width = size.x;
    	   *         tile.height = size.y;
    	   *
    	   *         // draw something asynchronously and pass the tile to the done() callback
    	   *         setTimeout(function() {
    	   *             done(error, tile);
    	   *         }, 1000);
    	   *
    	   *         return tile;
    	   *     }
    	   * });
    	   * ```
    	   *
    	   * @section
    	   */


    	  var GridLayer = Layer.extend({

    	  	// @section
    	  	// @aka GridLayer options
    	  	options: {
    	  		// @option tileSize: Number|Point = 256
    	  		// Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
    	  		tileSize: 256,

    	  		// @option opacity: Number = 1.0
    	  		// Opacity of the tiles. Can be used in the `createTile()` function.
    	  		opacity: 1,

    	  		// @option updateWhenIdle: Boolean = (depends)
    	  		// Load new tiles only when panning ends.
    	  		// `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
    	  		// `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
    	  		// [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
    	  		updateWhenIdle: Browser.mobile,

    	  		// @option updateWhenZooming: Boolean = true
    	  		// By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
    	  		updateWhenZooming: true,

    	  		// @option updateInterval: Number = 200
    	  		// Tiles will not update more than once every `updateInterval` milliseconds when panning.
    	  		updateInterval: 200,

    	  		// @option zIndex: Number = 1
    	  		// The explicit zIndex of the tile layer.
    	  		zIndex: 1,

    	  		// @option bounds: LatLngBounds = undefined
    	  		// If set, tiles will only be loaded inside the set `LatLngBounds`.
    	  		bounds: null,

    	  		// @option minZoom: Number = 0
    	  		// The minimum zoom level down to which this layer will be displayed (inclusive).
    	  		minZoom: 0,

    	  		// @option maxZoom: Number = undefined
    	  		// The maximum zoom level up to which this layer will be displayed (inclusive).
    	  		maxZoom: undefined,

    	  		// @option maxNativeZoom: Number = undefined
    	  		// Maximum zoom number the tile source has available. If it is specified,
    	  		// the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
    	  		// from `maxNativeZoom` level and auto-scaled.
    	  		maxNativeZoom: undefined,

    	  		// @option minNativeZoom: Number = undefined
    	  		// Minimum zoom number the tile source has available. If it is specified,
    	  		// the tiles on all zoom levels lower than `minNativeZoom` will be loaded
    	  		// from `minNativeZoom` level and auto-scaled.
    	  		minNativeZoom: undefined,

    	  		// @option noWrap: Boolean = false
    	  		// Whether the layer is wrapped around the antimeridian. If `true`, the
    	  		// GridLayer will only be displayed once at low zoom levels. Has no
    	  		// effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
    	  		// in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
    	  		// tiles outside the CRS limits.
    	  		noWrap: false,

    	  		// @option pane: String = 'tilePane'
    	  		// `Map pane` where the grid layer will be added.
    	  		pane: 'tilePane',

    	  		// @option className: String = ''
    	  		// A custom class name to assign to the tile layer. Empty by default.
    	  		className: '',

    	  		// @option keepBuffer: Number = 2
    	  		// When panning the map, keep this many rows and columns of tiles before unloading them.
    	  		keepBuffer: 2
    	  	},

    	  	initialize: function (options) {
    	  		setOptions(this, options);
    	  	},

    	  	onAdd: function () {
    	  		this._initContainer();

    	  		this._levels = {};
    	  		this._tiles = {};

    	  		this._resetView(); // implicit _update() call
    	  	},

    	  	beforeAdd: function (map) {
    	  		map._addZoomLimit(this);
    	  	},

    	  	onRemove: function (map) {
    	  		this._removeAllTiles();
    	  		remove(this._container);
    	  		map._removeZoomLimit(this);
    	  		this._container = null;
    	  		this._tileZoom = undefined;
    	  	},

    	  	// @method bringToFront: this
    	  	// Brings the tile layer to the top of all tile layers.
    	  	bringToFront: function () {
    	  		if (this._map) {
    	  			toFront(this._container);
    	  			this._setAutoZIndex(Math.max);
    	  		}
    	  		return this;
    	  	},

    	  	// @method bringToBack: this
    	  	// Brings the tile layer to the bottom of all tile layers.
    	  	bringToBack: function () {
    	  		if (this._map) {
    	  			toBack(this._container);
    	  			this._setAutoZIndex(Math.min);
    	  		}
    	  		return this;
    	  	},

    	  	// @method getContainer: HTMLElement
    	  	// Returns the HTML element that contains the tiles for this layer.
    	  	getContainer: function () {
    	  		return this._container;
    	  	},

    	  	// @method setOpacity(opacity: Number): this
    	  	// Changes the [opacity](#gridlayer-opacity) of the grid layer.
    	  	setOpacity: function (opacity) {
    	  		this.options.opacity = opacity;
    	  		this._updateOpacity();
    	  		return this;
    	  	},

    	  	// @method setZIndex(zIndex: Number): this
    	  	// Changes the [zIndex](#gridlayer-zindex) of the grid layer.
    	  	setZIndex: function (zIndex) {
    	  		this.options.zIndex = zIndex;
    	  		this._updateZIndex();

    	  		return this;
    	  	},

    	  	// @method isLoading: Boolean
    	  	// Returns `true` if any tile in the grid layer has not finished loading.
    	  	isLoading: function () {
    	  		return this._loading;
    	  	},

    	  	// @method redraw: this
    	  	// Causes the layer to clear all the tiles and request them again.
    	  	redraw: function () {
    	  		if (this._map) {
    	  			this._removeAllTiles();
    	  			var tileZoom = this._clampZoom(this._map.getZoom());
    	  			if (tileZoom !== this._tileZoom) {
    	  				this._tileZoom = tileZoom;
    	  				this._updateLevels();
    	  			}
    	  			this._update();
    	  		}
    	  		return this;
    	  	},

    	  	getEvents: function () {
    	  		var events = {
    	  			viewprereset: this._invalidateAll,
    	  			viewreset: this._resetView,
    	  			zoom: this._resetView,
    	  			moveend: this._onMoveEnd
    	  		};

    	  		if (!this.options.updateWhenIdle) {
    	  			// update tiles on move, but not more often than once per given interval
    	  			if (!this._onMove) {
    	  				this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
    	  			}

    	  			events.move = this._onMove;
    	  		}

    	  		if (this._zoomAnimated) {
    	  			events.zoomanim = this._animateZoom;
    	  		}

    	  		return events;
    	  	},

    	  	// @section Extension methods
    	  	// Layers extending `GridLayer` shall reimplement the following method.
    	  	// @method createTile(coords: Object, done?: Function): HTMLElement
    	  	// Called only internally, must be overridden by classes extending `GridLayer`.
    	  	// Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
    	  	// is specified, it must be called when the tile has finished loading and drawing.
    	  	createTile: function () {
    	  		return document.createElement('div');
    	  	},

    	  	// @section
    	  	// @method getTileSize: Point
    	  	// Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
    	  	getTileSize: function () {
    	  		var s = this.options.tileSize;
    	  		return s instanceof Point ? s : new Point(s, s);
    	  	},

    	  	_updateZIndex: function () {
    	  		if (this._container && this.options.zIndex !== undefined && this.options.zIndex !== null) {
    	  			this._container.style.zIndex = this.options.zIndex;
    	  		}
    	  	},

    	  	_setAutoZIndex: function (compare) {
    	  		// go through all other layers of the same pane, set zIndex to max + 1 (front) or min - 1 (back)

    	  		var layers = this.getPane().children,
    	  		    edgeZIndex = -compare(-Infinity, Infinity); // -Infinity for max, Infinity for min

    	  		for (var i = 0, len = layers.length, zIndex; i < len; i++) {

    	  			zIndex = layers[i].style.zIndex;

    	  			if (layers[i] !== this._container && zIndex) {
    	  				edgeZIndex = compare(edgeZIndex, +zIndex);
    	  			}
    	  		}

    	  		if (isFinite(edgeZIndex)) {
    	  			this.options.zIndex = edgeZIndex + compare(-1, 1);
    	  			this._updateZIndex();
    	  		}
    	  	},

    	  	_updateOpacity: function () {
    	  		if (!this._map) { return; }

    	  		// IE doesn't inherit filter opacity properly, so we're forced to set it on tiles
    	  		if (Browser.ielt9) { return; }

    	  		setOpacity(this._container, this.options.opacity);

    	  		var now = +new Date(),
    	  		    nextFrame = false,
    	  		    willPrune = false;

    	  		for (var key in this._tiles) {
    	  			var tile = this._tiles[key];
    	  			if (!tile.current || !tile.loaded) { continue; }

    	  			var fade = Math.min(1, (now - tile.loaded) / 200);

    	  			setOpacity(tile.el, fade);
    	  			if (fade < 1) {
    	  				nextFrame = true;
    	  			} else {
    	  				if (tile.active) {
    	  					willPrune = true;
    	  				} else {
    	  					this._onOpaqueTile(tile);
    	  				}
    	  				tile.active = true;
    	  			}
    	  		}

    	  		if (willPrune && !this._noPrune) { this._pruneTiles(); }

    	  		if (nextFrame) {
    	  			cancelAnimFrame(this._fadeFrame);
    	  			this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
    	  		}
    	  	},

    	  	_onOpaqueTile: falseFn,

    	  	_initContainer: function () {
    	  		if (this._container) { return; }

    	  		this._container = create$1('div', 'leaflet-layer ' + (this.options.className || ''));
    	  		this._updateZIndex();

    	  		if (this.options.opacity < 1) {
    	  			this._updateOpacity();
    	  		}

    	  		this.getPane().appendChild(this._container);
    	  	},

    	  	_updateLevels: function () {

    	  		var zoom = this._tileZoom,
    	  		    maxZoom = this.options.maxZoom;

    	  		if (zoom === undefined) { return undefined; }

    	  		for (var z in this._levels) {
    	  			z = Number(z);
    	  			if (this._levels[z].el.children.length || z === zoom) {
    	  				this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - z);
    	  				this._onUpdateLevel(z);
    	  			} else {
    	  				remove(this._levels[z].el);
    	  				this._removeTilesAtZoom(z);
    	  				this._onRemoveLevel(z);
    	  				delete this._levels[z];
    	  			}
    	  		}

    	  		var level = this._levels[zoom],
    	  		    map = this._map;

    	  		if (!level) {
    	  			level = this._levels[zoom] = {};

    	  			level.el = create$1('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
    	  			level.el.style.zIndex = maxZoom;

    	  			level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
    	  			level.zoom = zoom;

    	  			this._setZoomTransform(level, map.getCenter(), map.getZoom());

    	  			// force the browser to consider the newly added element for transition
    	  			falseFn(level.el.offsetWidth);

    	  			this._onCreateLevel(level);
    	  		}

    	  		this._level = level;

    	  		return level;
    	  	},

    	  	_onUpdateLevel: falseFn,

    	  	_onRemoveLevel: falseFn,

    	  	_onCreateLevel: falseFn,

    	  	_pruneTiles: function () {
    	  		if (!this._map) {
    	  			return;
    	  		}

    	  		var key, tile;

    	  		var zoom = this._map.getZoom();
    	  		if (zoom > this.options.maxZoom ||
    	  			zoom < this.options.minZoom) {
    	  			this._removeAllTiles();
    	  			return;
    	  		}

    	  		for (key in this._tiles) {
    	  			tile = this._tiles[key];
    	  			tile.retain = tile.current;
    	  		}

    	  		for (key in this._tiles) {
    	  			tile = this._tiles[key];
    	  			if (tile.current && !tile.active) {
    	  				var coords = tile.coords;
    	  				if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
    	  					this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
    	  				}
    	  			}
    	  		}

    	  		for (key in this._tiles) {
    	  			if (!this._tiles[key].retain) {
    	  				this._removeTile(key);
    	  			}
    	  		}
    	  	},

    	  	_removeTilesAtZoom: function (zoom) {
    	  		for (var key in this._tiles) {
    	  			if (this._tiles[key].coords.z !== zoom) {
    	  				continue;
    	  			}
    	  			this._removeTile(key);
    	  		}
    	  	},

    	  	_removeAllTiles: function () {
    	  		for (var key in this._tiles) {
    	  			this._removeTile(key);
    	  		}
    	  	},

    	  	_invalidateAll: function () {
    	  		for (var z in this._levels) {
    	  			remove(this._levels[z].el);
    	  			this._onRemoveLevel(Number(z));
    	  			delete this._levels[z];
    	  		}
    	  		this._removeAllTiles();

    	  		this._tileZoom = undefined;
    	  	},

    	  	_retainParent: function (x, y, z, minZoom) {
    	  		var x2 = Math.floor(x / 2),
    	  		    y2 = Math.floor(y / 2),
    	  		    z2 = z - 1,
    	  		    coords2 = new Point(+x2, +y2);
    	  		coords2.z = +z2;

    	  		var key = this._tileCoordsToKey(coords2),
    	  		    tile = this._tiles[key];

    	  		if (tile && tile.active) {
    	  			tile.retain = true;
    	  			return true;

    	  		} else if (tile && tile.loaded) {
    	  			tile.retain = true;
    	  		}

    	  		if (z2 > minZoom) {
    	  			return this._retainParent(x2, y2, z2, minZoom);
    	  		}

    	  		return false;
    	  	},

    	  	_retainChildren: function (x, y, z, maxZoom) {

    	  		for (var i = 2 * x; i < 2 * x + 2; i++) {
    	  			for (var j = 2 * y; j < 2 * y + 2; j++) {

    	  				var coords = new Point(i, j);
    	  				coords.z = z + 1;

    	  				var key = this._tileCoordsToKey(coords),
    	  				    tile = this._tiles[key];

    	  				if (tile && tile.active) {
    	  					tile.retain = true;
    	  					continue;

    	  				} else if (tile && tile.loaded) {
    	  					tile.retain = true;
    	  				}

    	  				if (z + 1 < maxZoom) {
    	  					this._retainChildren(i, j, z + 1, maxZoom);
    	  				}
    	  			}
    	  		}
    	  	},

    	  	_resetView: function (e) {
    	  		var animating = e && (e.pinch || e.flyTo);
    	  		this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
    	  	},

    	  	_animateZoom: function (e) {
    	  		this._setView(e.center, e.zoom, true, e.noUpdate);
    	  	},

    	  	_clampZoom: function (zoom) {
    	  		var options = this.options;

    	  		if (undefined !== options.minNativeZoom && zoom < options.minNativeZoom) {
    	  			return options.minNativeZoom;
    	  		}

    	  		if (undefined !== options.maxNativeZoom && options.maxNativeZoom < zoom) {
    	  			return options.maxNativeZoom;
    	  		}

    	  		return zoom;
    	  	},

    	  	_setView: function (center, zoom, noPrune, noUpdate) {
    	  		var tileZoom = Math.round(zoom);
    	  		if ((this.options.maxZoom !== undefined && tileZoom > this.options.maxZoom) ||
    	  		    (this.options.minZoom !== undefined && tileZoom < this.options.minZoom)) {
    	  			tileZoom = undefined;
    	  		} else {
    	  			tileZoom = this._clampZoom(tileZoom);
    	  		}

    	  		var tileZoomChanged = this.options.updateWhenZooming && (tileZoom !== this._tileZoom);

    	  		if (!noUpdate || tileZoomChanged) {

    	  			this._tileZoom = tileZoom;

    	  			if (this._abortLoading) {
    	  				this._abortLoading();
    	  			}

    	  			this._updateLevels();
    	  			this._resetGrid();

    	  			if (tileZoom !== undefined) {
    	  				this._update(center);
    	  			}

    	  			if (!noPrune) {
    	  				this._pruneTiles();
    	  			}

    	  			// Flag to prevent _updateOpacity from pruning tiles during
    	  			// a zoom anim or a pinch gesture
    	  			this._noPrune = !!noPrune;
    	  		}

    	  		this._setZoomTransforms(center, zoom);
    	  	},

    	  	_setZoomTransforms: function (center, zoom) {
    	  		for (var i in this._levels) {
    	  			this._setZoomTransform(this._levels[i], center, zoom);
    	  		}
    	  	},

    	  	_setZoomTransform: function (level, center, zoom) {
    	  		var scale = this._map.getZoomScale(zoom, level.zoom),
    	  		    translate = level.origin.multiplyBy(scale)
    	  		        .subtract(this._map._getNewPixelOrigin(center, zoom)).round();

    	  		if (Browser.any3d) {
    	  			setTransform(level.el, translate, scale);
    	  		} else {
    	  			setPosition(level.el, translate);
    	  		}
    	  	},

    	  	_resetGrid: function () {
    	  		var map = this._map,
    	  		    crs = map.options.crs,
    	  		    tileSize = this._tileSize = this.getTileSize(),
    	  		    tileZoom = this._tileZoom;

    	  		var bounds = this._map.getPixelWorldBounds(this._tileZoom);
    	  		if (bounds) {
    	  			this._globalTileRange = this._pxBoundsToTileRange(bounds);
    	  		}

    	  		this._wrapX = crs.wrapLng && !this.options.noWrap && [
    	  			Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
    	  			Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
    	  		];
    	  		this._wrapY = crs.wrapLat && !this.options.noWrap && [
    	  			Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
    	  			Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
    	  		];
    	  	},

    	  	_onMoveEnd: function () {
    	  		if (!this._map || this._map._animatingZoom) { return; }

    	  		this._update();
    	  	},

    	  	_getTiledPixelBounds: function (center) {
    	  		var map = this._map,
    	  		    mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
    	  		    scale = map.getZoomScale(mapZoom, this._tileZoom),
    	  		    pixelCenter = map.project(center, this._tileZoom).floor(),
    	  		    halfSize = map.getSize().divideBy(scale * 2);

    	  		return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
    	  	},

    	  	// Private method to load tiles in the grid's active zoom level according to map bounds
    	  	_update: function (center) {
    	  		var map = this._map;
    	  		if (!map) { return; }
    	  		var zoom = this._clampZoom(map.getZoom());

    	  		if (center === undefined) { center = map.getCenter(); }
    	  		if (this._tileZoom === undefined) { return; }	// if out of minzoom/maxzoom

    	  		var pixelBounds = this._getTiledPixelBounds(center),
    	  		    tileRange = this._pxBoundsToTileRange(pixelBounds),
    	  		    tileCenter = tileRange.getCenter(),
    	  		    queue = [],
    	  		    margin = this.options.keepBuffer,
    	  		    noPruneRange = new Bounds(tileRange.getBottomLeft().subtract([margin, -margin]),
    	  		                              tileRange.getTopRight().add([margin, -margin]));

    	  		// Sanity check: panic if the tile range contains Infinity somewhere.
    	  		if (!(isFinite(tileRange.min.x) &&
    	  		      isFinite(tileRange.min.y) &&
    	  		      isFinite(tileRange.max.x) &&
    	  		      isFinite(tileRange.max.y))) { throw new Error('Attempted to load an infinite number of tiles'); }

    	  		for (var key in this._tiles) {
    	  			var c = this._tiles[key].coords;
    	  			if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) {
    	  				this._tiles[key].current = false;
    	  			}
    	  		}

    	  		// _update just loads more tiles. If the tile zoom level differs too much
    	  		// from the map's, let _setView reset levels and prune old tiles.
    	  		if (Math.abs(zoom - this._tileZoom) > 1) { this._setView(center, zoom); return; }

    	  		// create a queue of coordinates to load tiles from
    	  		for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
    	  			for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
    	  				var coords = new Point(i, j);
    	  				coords.z = this._tileZoom;

    	  				if (!this._isValidTile(coords)) { continue; }

    	  				var tile = this._tiles[this._tileCoordsToKey(coords)];
    	  				if (tile) {
    	  					tile.current = true;
    	  				} else {
    	  					queue.push(coords);
    	  				}
    	  			}
    	  		}

    	  		// sort tile queue to load tiles in order of their distance to center
    	  		queue.sort(function (a, b) {
    	  			return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
    	  		});

    	  		if (queue.length !== 0) {
    	  			// if it's the first batch of tiles to load
    	  			if (!this._loading) {
    	  				this._loading = true;
    	  				// @event loading: Event
    	  				// Fired when the grid layer starts loading tiles.
    	  				this.fire('loading');
    	  			}

    	  			// create DOM fragment to append tiles in one batch
    	  			var fragment = document.createDocumentFragment();

    	  			for (i = 0; i < queue.length; i++) {
    	  				this._addTile(queue[i], fragment);
    	  			}

    	  			this._level.el.appendChild(fragment);
    	  		}
    	  	},

    	  	_isValidTile: function (coords) {
    	  		var crs = this._map.options.crs;

    	  		if (!crs.infinite) {
    	  			// don't load tile if it's out of bounds and not wrapped
    	  			var bounds = this._globalTileRange;
    	  			if ((!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
    	  			    (!crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y))) { return false; }
    	  		}

    	  		if (!this.options.bounds) { return true; }

    	  		// don't load tile if it doesn't intersect the bounds in options
    	  		var tileBounds = this._tileCoordsToBounds(coords);
    	  		return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
    	  	},

    	  	_keyToBounds: function (key) {
    	  		return this._tileCoordsToBounds(this._keyToTileCoords(key));
    	  	},

    	  	_tileCoordsToNwSe: function (coords) {
    	  		var map = this._map,
    	  		    tileSize = this.getTileSize(),
    	  		    nwPoint = coords.scaleBy(tileSize),
    	  		    sePoint = nwPoint.add(tileSize),
    	  		    nw = map.unproject(nwPoint, coords.z),
    	  		    se = map.unproject(sePoint, coords.z);
    	  		return [nw, se];
    	  	},

    	  	// converts tile coordinates to its geographical bounds
    	  	_tileCoordsToBounds: function (coords) {
    	  		var bp = this._tileCoordsToNwSe(coords),
    	  		    bounds = new LatLngBounds(bp[0], bp[1]);

    	  		if (!this.options.noWrap) {
    	  			bounds = this._map.wrapLatLngBounds(bounds);
    	  		}
    	  		return bounds;
    	  	},
    	  	// converts tile coordinates to key for the tile cache
    	  	_tileCoordsToKey: function (coords) {
    	  		return coords.x + ':' + coords.y + ':' + coords.z;
    	  	},

    	  	// converts tile cache key to coordinates
    	  	_keyToTileCoords: function (key) {
    	  		var k = key.split(':'),
    	  		    coords = new Point(+k[0], +k[1]);
    	  		coords.z = +k[2];
    	  		return coords;
    	  	},

    	  	_removeTile: function (key) {
    	  		var tile = this._tiles[key];
    	  		if (!tile) { return; }

    	  		remove(tile.el);

    	  		delete this._tiles[key];

    	  		// @event tileunload: TileEvent
    	  		// Fired when a tile is removed (e.g. when a tile goes off the screen).
    	  		this.fire('tileunload', {
    	  			tile: tile.el,
    	  			coords: this._keyToTileCoords(key)
    	  		});
    	  	},

    	  	_initTile: function (tile) {
    	  		addClass(tile, 'leaflet-tile');

    	  		var tileSize = this.getTileSize();
    	  		tile.style.width = tileSize.x + 'px';
    	  		tile.style.height = tileSize.y + 'px';

    	  		tile.onselectstart = falseFn;
    	  		tile.onmousemove = falseFn;

    	  		// update opacity on tiles in IE7-8 because of filter inheritance problems
    	  		if (Browser.ielt9 && this.options.opacity < 1) {
    	  			setOpacity(tile, this.options.opacity);
    	  		}
    	  	},

    	  	_addTile: function (coords, container) {
    	  		var tilePos = this._getTilePos(coords),
    	  		    key = this._tileCoordsToKey(coords);

    	  		var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));

    	  		this._initTile(tile);

    	  		// if createTile is defined with a second argument ("done" callback),
    	  		// we know that tile is async and will be ready later; otherwise
    	  		if (this.createTile.length < 2) {
    	  			// mark tile as ready, but delay one frame for opacity animation to happen
    	  			requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
    	  		}

    	  		setPosition(tile, tilePos);

    	  		// save tile in cache
    	  		this._tiles[key] = {
    	  			el: tile,
    	  			coords: coords,
    	  			current: true
    	  		};

    	  		container.appendChild(tile);
    	  		// @event tileloadstart: TileEvent
    	  		// Fired when a tile is requested and starts loading.
    	  		this.fire('tileloadstart', {
    	  			tile: tile,
    	  			coords: coords
    	  		});
    	  	},

    	  	_tileReady: function (coords, err, tile) {
    	  		if (err) {
    	  			// @event tileerror: TileErrorEvent
    	  			// Fired when there is an error loading a tile.
    	  			this.fire('tileerror', {
    	  				error: err,
    	  				tile: tile,
    	  				coords: coords
    	  			});
    	  		}

    	  		var key = this._tileCoordsToKey(coords);

    	  		tile = this._tiles[key];
    	  		if (!tile) { return; }

    	  		tile.loaded = +new Date();
    	  		if (this._map._fadeAnimated) {
    	  			setOpacity(tile.el, 0);
    	  			cancelAnimFrame(this._fadeFrame);
    	  			this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
    	  		} else {
    	  			tile.active = true;
    	  			this._pruneTiles();
    	  		}

    	  		if (!err) {
    	  			addClass(tile.el, 'leaflet-tile-loaded');

    	  			// @event tileload: TileEvent
    	  			// Fired when a tile loads.
    	  			this.fire('tileload', {
    	  				tile: tile.el,
    	  				coords: coords
    	  			});
    	  		}

    	  		if (this._noTilesToLoad()) {
    	  			this._loading = false;
    	  			// @event load: Event
    	  			// Fired when the grid layer loaded all visible tiles.
    	  			this.fire('load');

    	  			if (Browser.ielt9 || !this._map._fadeAnimated) {
    	  				requestAnimFrame(this._pruneTiles, this);
    	  			} else {
    	  				// Wait a bit more than 0.2 secs (the duration of the tile fade-in)
    	  				// to trigger a pruning.
    	  				setTimeout(bind(this._pruneTiles, this), 250);
    	  			}
    	  		}
    	  	},

    	  	_getTilePos: function (coords) {
    	  		return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
    	  	},

    	  	_wrapCoords: function (coords) {
    	  		var newCoords = new Point(
    	  			this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
    	  			this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y);
    	  		newCoords.z = coords.z;
    	  		return newCoords;
    	  	},

    	  	_pxBoundsToTileRange: function (bounds) {
    	  		var tileSize = this.getTileSize();
    	  		return new Bounds(
    	  			bounds.min.unscaleBy(tileSize).floor(),
    	  			bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
    	  	},

    	  	_noTilesToLoad: function () {
    	  		for (var key in this._tiles) {
    	  			if (!this._tiles[key].loaded) { return false; }
    	  		}
    	  		return true;
    	  	}
    	  });

    	  // @factory L.gridLayer(options?: GridLayer options)
    	  // Creates a new instance of GridLayer with the supplied options.
    	  function gridLayer(options) {
    	  	return new GridLayer(options);
    	  }

    	  /*
    	   * @class TileLayer
    	   * @inherits GridLayer
    	   * @aka L.TileLayer
    	   * Used to load and display tile layers on the map. Note that most tile servers require attribution, which you can set under `Layer`. Extends `GridLayer`.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    	   * ```
    	   *
    	   * @section URL template
    	   * @example
    	   *
    	   * A string of the following form:
    	   *
    	   * ```
    	   * 'https://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'
    	   * ```
    	   *
    	   * `{s}` means one of the available subdomains (used sequentially to help with browser parallel requests per domain limitation; subdomain values are specified in options; `a`, `b` or `c` by default, can be omitted), `{z}` — zoom level, `{x}` and `{y}` — tile coordinates. `{r}` can be used to add "&commat;2x" to the URL to load retina tiles.
    	   *
    	   * You can use custom keys in the template, which will be [evaluated](#util-template) from TileLayer options, like this:
    	   *
    	   * ```
    	   * L.tileLayer('https://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});
    	   * ```
    	   */


    	  var TileLayer = GridLayer.extend({

    	  	// @section
    	  	// @aka TileLayer options
    	  	options: {
    	  		// @option minZoom: Number = 0
    	  		// The minimum zoom level down to which this layer will be displayed (inclusive).
    	  		minZoom: 0,

    	  		// @option maxZoom: Number = 18
    	  		// The maximum zoom level up to which this layer will be displayed (inclusive).
    	  		maxZoom: 18,

    	  		// @option subdomains: String|String[] = 'abc'
    	  		// Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
    	  		subdomains: 'abc',

    	  		// @option errorTileUrl: String = ''
    	  		// URL to the tile image to show in place of the tile that failed to load.
    	  		errorTileUrl: '',

    	  		// @option zoomOffset: Number = 0
    	  		// The zoom number used in tile URLs will be offset with this value.
    	  		zoomOffset: 0,

    	  		// @option tms: Boolean = false
    	  		// If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
    	  		tms: false,

    	  		// @option zoomReverse: Boolean = false
    	  		// If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
    	  		zoomReverse: false,

    	  		// @option detectRetina: Boolean = false
    	  		// If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
    	  		detectRetina: false,

    	  		// @option crossOrigin: Boolean|String = false
    	  		// Whether the crossOrigin attribute will be added to the tiles.
    	  		// If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
    	  		// Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
    	  		crossOrigin: false,

    	  		// @option referrerPolicy: Boolean|String = false
    	  		// Whether the referrerPolicy attribute will be added to the tiles.
    	  		// If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
    	  		// This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
    	  		// (e.g. to validate an API token).
    	  		// Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
    	  		referrerPolicy: false
    	  	},

    	  	initialize: function (url, options) {

    	  		this._url = url;

    	  		options = setOptions(this, options);

    	  		// detecting retina displays, adjusting tileSize and zoom levels
    	  		if (options.detectRetina && Browser.retina && options.maxZoom > 0) {

    	  			options.tileSize = Math.floor(options.tileSize / 2);

    	  			if (!options.zoomReverse) {
    	  				options.zoomOffset++;
    	  				options.maxZoom = Math.max(options.minZoom, options.maxZoom - 1);
    	  			} else {
    	  				options.zoomOffset--;
    	  				options.minZoom = Math.min(options.maxZoom, options.minZoom + 1);
    	  			}

    	  			options.minZoom = Math.max(0, options.minZoom);
    	  		} else if (!options.zoomReverse) {
    	  			// make sure maxZoom is gte minZoom
    	  			options.maxZoom = Math.max(options.minZoom, options.maxZoom);
    	  		} else {
    	  			// make sure minZoom is lte maxZoom
    	  			options.minZoom = Math.min(options.maxZoom, options.minZoom);
    	  		}

    	  		if (typeof options.subdomains === 'string') {
    	  			options.subdomains = options.subdomains.split('');
    	  		}

    	  		this.on('tileunload', this._onTileRemove);
    	  	},

    	  	// @method setUrl(url: String, noRedraw?: Boolean): this
    	  	// Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
    	  	// If the URL does not change, the layer will not be redrawn unless
    	  	// the noRedraw parameter is set to false.
    	  	setUrl: function (url, noRedraw) {
    	  		if (this._url === url && noRedraw === undefined) {
    	  			noRedraw = true;
    	  		}

    	  		this._url = url;

    	  		if (!noRedraw) {
    	  			this.redraw();
    	  		}
    	  		return this;
    	  	},

    	  	// @method createTile(coords: Object, done?: Function): HTMLElement
    	  	// Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
    	  	// to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
    	  	// callback is called when the tile has been loaded.
    	  	createTile: function (coords, done) {
    	  		var tile = document.createElement('img');

    	  		on(tile, 'load', bind(this._tileOnLoad, this, done, tile));
    	  		on(tile, 'error', bind(this._tileOnError, this, done, tile));

    	  		if (this.options.crossOrigin || this.options.crossOrigin === '') {
    	  			tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
    	  		}

    	  		// for this new option we follow the documented behavior
    	  		// more closely by only setting the property when string
    	  		if (typeof this.options.referrerPolicy === 'string') {
    	  			tile.referrerPolicy = this.options.referrerPolicy;
    	  		}

    	  		// The alt attribute is set to the empty string,
    	  		// allowing screen readers to ignore the decorative image tiles.
    	  		// https://www.w3.org/WAI/tutorials/images/decorative/
    	  		// https://www.w3.org/TR/html-aria/#el-img-empty-alt
    	  		tile.alt = '';

    	  		tile.src = this.getTileUrl(coords);

    	  		return tile;
    	  	},

    	  	// @section Extension methods
    	  	// @uninheritable
    	  	// Layers extending `TileLayer` might reimplement the following method.
    	  	// @method getTileUrl(coords: Object): String
    	  	// Called only internally, returns the URL for a tile given its coordinates.
    	  	// Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
    	  	getTileUrl: function (coords) {
    	  		var data = {
    	  			r: Browser.retina ? '@2x' : '',
    	  			s: this._getSubdomain(coords),
    	  			x: coords.x,
    	  			y: coords.y,
    	  			z: this._getZoomForUrl()
    	  		};
    	  		if (this._map && !this._map.options.crs.infinite) {
    	  			var invertedY = this._globalTileRange.max.y - coords.y;
    	  			if (this.options.tms) {
    	  				data['y'] = invertedY;
    	  			}
    	  			data['-y'] = invertedY;
    	  		}

    	  		return template(this._url, extend(data, this.options));
    	  	},

    	  	_tileOnLoad: function (done, tile) {
    	  		// For https://github.com/Leaflet/Leaflet/issues/3332
    	  		if (Browser.ielt9) {
    	  			setTimeout(bind(done, this, null, tile), 0);
    	  		} else {
    	  			done(null, tile);
    	  		}
    	  	},

    	  	_tileOnError: function (done, tile, e) {
    	  		var errorUrl = this.options.errorTileUrl;
    	  		if (errorUrl && tile.getAttribute('src') !== errorUrl) {
    	  			tile.src = errorUrl;
    	  		}
    	  		done(e, tile);
    	  	},

    	  	_onTileRemove: function (e) {
    	  		e.tile.onload = null;
    	  	},

    	  	_getZoomForUrl: function () {
    	  		var zoom = this._tileZoom,
    	  		maxZoom = this.options.maxZoom,
    	  		zoomReverse = this.options.zoomReverse,
    	  		zoomOffset = this.options.zoomOffset;

    	  		if (zoomReverse) {
    	  			zoom = maxZoom - zoom;
    	  		}

    	  		return zoom + zoomOffset;
    	  	},

    	  	_getSubdomain: function (tilePoint) {
    	  		var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
    	  		return this.options.subdomains[index];
    	  	},

    	  	// stops loading all tiles in the background layer
    	  	_abortLoading: function () {
    	  		var i, tile;
    	  		for (i in this._tiles) {
    	  			if (this._tiles[i].coords.z !== this._tileZoom) {
    	  				tile = this._tiles[i].el;

    	  				tile.onload = falseFn;
    	  				tile.onerror = falseFn;

    	  				if (!tile.complete) {
    	  					tile.src = emptyImageUrl;
    	  					var coords = this._tiles[i].coords;
    	  					remove(tile);
    	  					delete this._tiles[i];
    	  					// @event tileabort: TileEvent
    	  					// Fired when a tile was loading but is now not wanted.
    	  					this.fire('tileabort', {
    	  						tile: tile,
    	  						coords: coords
    	  					});
    	  				}
    	  			}
    	  		}
    	  	},

    	  	_removeTile: function (key) {
    	  		var tile = this._tiles[key];
    	  		if (!tile) { return; }

    	  		// Cancels any pending http requests associated with the tile
    	  		tile.el.setAttribute('src', emptyImageUrl);

    	  		return GridLayer.prototype._removeTile.call(this, key);
    	  	},

    	  	_tileReady: function (coords, err, tile) {
    	  		if (!this._map || (tile && tile.getAttribute('src') === emptyImageUrl)) {
    	  			return;
    	  		}

    	  		return GridLayer.prototype._tileReady.call(this, coords, err, tile);
    	  	}
    	  });


    	  // @factory L.tilelayer(urlTemplate: String, options?: TileLayer options)
    	  // Instantiates a tile layer object given a `URL template` and optionally an options object.

    	  function tileLayer(url, options) {
    	  	return new TileLayer(url, options);
    	  }

    	  /*
    	   * @class TileLayer.WMS
    	   * @inherits TileLayer
    	   * @aka L.TileLayer.WMS
    	   * Used to display [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services as tile layers on the map. Extends `TileLayer`.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
    	   * 	layers: 'nexrad-n0r-900913',
    	   * 	format: 'image/png',
    	   * 	transparent: true,
    	   * 	attribution: "Weather data © 2012 IEM Nexrad"
    	   * });
    	   * ```
    	   */

    	  var TileLayerWMS = TileLayer.extend({

    	  	// @section
    	  	// @aka TileLayer.WMS options
    	  	// If any custom options not documented here are used, they will be sent to the
    	  	// WMS server as extra parameters in each request URL. This can be useful for
    	  	// [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
    	  	defaultWmsParams: {
    	  		service: 'WMS',
    	  		request: 'GetMap',

    	  		// @option layers: String = ''
    	  		// **(required)** Comma-separated list of WMS layers to show.
    	  		layers: '',

    	  		// @option styles: String = ''
    	  		// Comma-separated list of WMS styles.
    	  		styles: '',

    	  		// @option format: String = 'image/jpeg'
    	  		// WMS image format (use `'image/png'` for layers with transparency).
    	  		format: 'image/jpeg',

    	  		// @option transparent: Boolean = false
    	  		// If `true`, the WMS service will return images with transparency.
    	  		transparent: false,

    	  		// @option version: String = '1.1.1'
    	  		// Version of the WMS service to use
    	  		version: '1.1.1'
    	  	},

    	  	options: {
    	  		// @option crs: CRS = null
    	  		// Coordinate Reference System to use for the WMS requests, defaults to
    	  		// map CRS. Don't change this if you're not sure what it means.
    	  		crs: null,

    	  		// @option uppercase: Boolean = false
    	  		// If `true`, WMS request parameter keys will be uppercase.
    	  		uppercase: false
    	  	},

    	  	initialize: function (url, options) {

    	  		this._url = url;

    	  		var wmsParams = extend({}, this.defaultWmsParams);

    	  		// all keys that are not TileLayer options go to WMS params
    	  		for (var i in options) {
    	  			if (!(i in this.options)) {
    	  				wmsParams[i] = options[i];
    	  			}
    	  		}

    	  		options = setOptions(this, options);

    	  		var realRetina = options.detectRetina && Browser.retina ? 2 : 1;
    	  		var tileSize = this.getTileSize();
    	  		wmsParams.width = tileSize.x * realRetina;
    	  		wmsParams.height = tileSize.y * realRetina;

    	  		this.wmsParams = wmsParams;
    	  	},

    	  	onAdd: function (map) {

    	  		this._crs = this.options.crs || map.options.crs;
    	  		this._wmsVersion = parseFloat(this.wmsParams.version);

    	  		var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
    	  		this.wmsParams[projectionKey] = this._crs.code;

    	  		TileLayer.prototype.onAdd.call(this, map);
    	  	},

    	  	getTileUrl: function (coords) {

    	  		var tileBounds = this._tileCoordsToNwSe(coords),
    	  		    crs = this._crs,
    	  		    bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])),
    	  		    min = bounds.min,
    	  		    max = bounds.max,
    	  		    bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ?
    	  		    [min.y, min.x, max.y, max.x] :
    	  		    [min.x, min.y, max.x, max.y]).join(','),
    	  		    url = TileLayer.prototype.getTileUrl.call(this, coords);
    	  		return url +
    	  			getParamString(this.wmsParams, url, this.options.uppercase) +
    	  			(this.options.uppercase ? '&BBOX=' : '&bbox=') + bbox;
    	  	},

    	  	// @method setParams(params: Object, noRedraw?: Boolean): this
    	  	// Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
    	  	setParams: function (params, noRedraw) {

    	  		extend(this.wmsParams, params);

    	  		if (!noRedraw) {
    	  			this.redraw();
    	  		}

    	  		return this;
    	  	}
    	  });


    	  // @factory L.tileLayer.wms(baseUrl: String, options: TileLayer.WMS options)
    	  // Instantiates a WMS tile layer object given a base URL of the WMS service and a WMS parameters/options object.
    	  function tileLayerWMS(url, options) {
    	  	return new TileLayerWMS(url, options);
    	  }

    	  TileLayer.WMS = TileLayerWMS;
    	  tileLayer.wms = tileLayerWMS;

    	  /*
    	   * @class Renderer
    	   * @inherits Layer
    	   * @aka L.Renderer
    	   *
    	   * Base class for vector renderer implementations (`SVG`, `Canvas`). Handles the
    	   * DOM container of the renderer, its bounds, and its zoom animation.
    	   *
    	   * A `Renderer` works as an implicit layer group for all `Path`s - the renderer
    	   * itself can be added or removed to the map. All paths use a renderer, which can
    	   * be implicit (the map will decide the type of renderer and use it automatically)
    	   * or explicit (using the [`renderer`](#path-renderer) option of the path).
    	   *
    	   * Do not use this class directly, use `SVG` and `Canvas` instead.
    	   *
    	   * @event update: Event
    	   * Fired when the renderer updates its bounds, center and zoom, for example when
    	   * its map has moved
    	   */

    	  var Renderer = Layer.extend({

    	  	// @section
    	  	// @aka Renderer options
    	  	options: {
    	  		// @option padding: Number = 0.1
    	  		// How much to extend the clip area around the map view (relative to its size)
    	  		// e.g. 0.1 would be 10% of map view in each direction
    	  		padding: 0.1
    	  	},

    	  	initialize: function (options) {
    	  		setOptions(this, options);
    	  		stamp(this);
    	  		this._layers = this._layers || {};
    	  	},

    	  	onAdd: function () {
    	  		if (!this._container) {
    	  			this._initContainer(); // defined by renderer implementations

    	  			if (this._zoomAnimated) {
    	  				addClass(this._container, 'leaflet-zoom-animated');
    	  			}
    	  		}

    	  		this.getPane().appendChild(this._container);
    	  		this._update();
    	  		this.on('update', this._updatePaths, this);
    	  	},

    	  	onRemove: function () {
    	  		this.off('update', this._updatePaths, this);
    	  		this._destroyContainer();
    	  	},

    	  	getEvents: function () {
    	  		var events = {
    	  			viewreset: this._reset,
    	  			zoom: this._onZoom,
    	  			moveend: this._update,
    	  			zoomend: this._onZoomEnd
    	  		};
    	  		if (this._zoomAnimated) {
    	  			events.zoomanim = this._onAnimZoom;
    	  		}
    	  		return events;
    	  	},

    	  	_onAnimZoom: function (ev) {
    	  		this._updateTransform(ev.center, ev.zoom);
    	  	},

    	  	_onZoom: function () {
    	  		this._updateTransform(this._map.getCenter(), this._map.getZoom());
    	  	},

    	  	_updateTransform: function (center, zoom) {
    	  		var scale = this._map.getZoomScale(zoom, this._zoom),
    	  		    viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding),
    	  		    currentCenterPoint = this._map.project(this._center, zoom),

    	  		    topLeftOffset = viewHalf.multiplyBy(-scale).add(currentCenterPoint)
    	  				  .subtract(this._map._getNewPixelOrigin(center, zoom));

    	  		if (Browser.any3d) {
    	  			setTransform(this._container, topLeftOffset, scale);
    	  		} else {
    	  			setPosition(this._container, topLeftOffset);
    	  		}
    	  	},

    	  	_reset: function () {
    	  		this._update();
    	  		this._updateTransform(this._center, this._zoom);

    	  		for (var id in this._layers) {
    	  			this._layers[id]._reset();
    	  		}
    	  	},

    	  	_onZoomEnd: function () {
    	  		for (var id in this._layers) {
    	  			this._layers[id]._project();
    	  		}
    	  	},

    	  	_updatePaths: function () {
    	  		for (var id in this._layers) {
    	  			this._layers[id]._update();
    	  		}
    	  	},

    	  	_update: function () {
    	  		// Update pixel bounds of renderer container (for positioning/sizing/clipping later)
    	  		// Subclasses are responsible of firing the 'update' event.
    	  		var p = this.options.padding,
    	  		    size = this._map.getSize(),
    	  		    min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();

    	  		this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());

    	  		this._center = this._map.getCenter();
    	  		this._zoom = this._map.getZoom();
    	  	}
    	  });

    	  /*
    	   * @class Canvas
    	   * @inherits Renderer
    	   * @aka L.Canvas
    	   *
    	   * Allows vector layers to be displayed with [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
    	   * Inherits `Renderer`.
    	   *
    	   * Due to [technical limitations](https://caniuse.com/canvas), Canvas is not
    	   * available in all web browsers, notably IE8, and overlapping geometries might
    	   * not display properly in some edge cases.
    	   *
    	   * @example
    	   *
    	   * Use Canvas by default for all paths in the map:
    	   *
    	   * ```js
    	   * var map = L.map('map', {
    	   * 	renderer: L.canvas()
    	   * });
    	   * ```
    	   *
    	   * Use a Canvas renderer with extra padding for specific vector geometries:
    	   *
    	   * ```js
    	   * var map = L.map('map');
    	   * var myRenderer = L.canvas({ padding: 0.5 });
    	   * var line = L.polyline( coordinates, { renderer: myRenderer } );
    	   * var circle = L.circle( center, { renderer: myRenderer } );
    	   * ```
    	   */

    	  var Canvas = Renderer.extend({

    	  	// @section
    	  	// @aka Canvas options
    	  	options: {
    	  		// @option tolerance: Number = 0
    	  		// How much to extend the click tolerance around a path/object on the map.
    	  		tolerance: 0
    	  	},

    	  	getEvents: function () {
    	  		var events = Renderer.prototype.getEvents.call(this);
    	  		events.viewprereset = this._onViewPreReset;
    	  		return events;
    	  	},

    	  	_onViewPreReset: function () {
    	  		// Set a flag so that a viewprereset+moveend+viewreset only updates&redraws once
    	  		this._postponeUpdatePaths = true;
    	  	},

    	  	onAdd: function () {
    	  		Renderer.prototype.onAdd.call(this);

    	  		// Redraw vectors since canvas is cleared upon removal,
    	  		// in case of removing the renderer itself from the map.
    	  		this._draw();
    	  	},

    	  	_initContainer: function () {
    	  		var container = this._container = document.createElement('canvas');

    	  		on(container, 'mousemove', this._onMouseMove, this);
    	  		on(container, 'click dblclick mousedown mouseup contextmenu', this._onClick, this);
    	  		on(container, 'mouseout', this._handleMouseOut, this);
    	  		container['_leaflet_disable_events'] = true;

    	  		this._ctx = container.getContext('2d');
    	  	},

    	  	_destroyContainer: function () {
    	  		cancelAnimFrame(this._redrawRequest);
    	  		delete this._ctx;
    	  		remove(this._container);
    	  		off(this._container);
    	  		delete this._container;
    	  	},

    	  	_updatePaths: function () {
    	  		if (this._postponeUpdatePaths) { return; }

    	  		var layer;
    	  		this._redrawBounds = null;
    	  		for (var id in this._layers) {
    	  			layer = this._layers[id];
    	  			layer._update();
    	  		}
    	  		this._redraw();
    	  	},

    	  	_update: function () {
    	  		if (this._map._animatingZoom && this._bounds) { return; }

    	  		Renderer.prototype._update.call(this);

    	  		var b = this._bounds,
    	  		    container = this._container,
    	  		    size = b.getSize(),
    	  		    m = Browser.retina ? 2 : 1;

    	  		setPosition(container, b.min);

    	  		// set canvas size (also clearing it); use double size on retina
    	  		container.width = m * size.x;
    	  		container.height = m * size.y;
    	  		container.style.width = size.x + 'px';
    	  		container.style.height = size.y + 'px';

    	  		if (Browser.retina) {
    	  			this._ctx.scale(2, 2);
    	  		}

    	  		// translate so we use the same path coordinates after canvas element moves
    	  		this._ctx.translate(-b.min.x, -b.min.y);

    	  		// Tell paths to redraw themselves
    	  		this.fire('update');
    	  	},

    	  	_reset: function () {
    	  		Renderer.prototype._reset.call(this);

    	  		if (this._postponeUpdatePaths) {
    	  			this._postponeUpdatePaths = false;
    	  			this._updatePaths();
    	  		}
    	  	},

    	  	_initPath: function (layer) {
    	  		this._updateDashArray(layer);
    	  		this._layers[stamp(layer)] = layer;

    	  		var order = layer._order = {
    	  			layer: layer,
    	  			prev: this._drawLast,
    	  			next: null
    	  		};
    	  		if (this._drawLast) { this._drawLast.next = order; }
    	  		this._drawLast = order;
    	  		this._drawFirst = this._drawFirst || this._drawLast;
    	  	},

    	  	_addPath: function (layer) {
    	  		this._requestRedraw(layer);
    	  	},

    	  	_removePath: function (layer) {
    	  		var order = layer._order;
    	  		var next = order.next;
    	  		var prev = order.prev;

    	  		if (next) {
    	  			next.prev = prev;
    	  		} else {
    	  			this._drawLast = prev;
    	  		}
    	  		if (prev) {
    	  			prev.next = next;
    	  		} else {
    	  			this._drawFirst = next;
    	  		}

    	  		delete layer._order;

    	  		delete this._layers[stamp(layer)];

    	  		this._requestRedraw(layer);
    	  	},

    	  	_updatePath: function (layer) {
    	  		// Redraw the union of the layer's old pixel
    	  		// bounds and the new pixel bounds.
    	  		this._extendRedrawBounds(layer);
    	  		layer._project();
    	  		layer._update();
    	  		// The redraw will extend the redraw bounds
    	  		// with the new pixel bounds.
    	  		this._requestRedraw(layer);
    	  	},

    	  	_updateStyle: function (layer) {
    	  		this._updateDashArray(layer);
    	  		this._requestRedraw(layer);
    	  	},

    	  	_updateDashArray: function (layer) {
    	  		if (typeof layer.options.dashArray === 'string') {
    	  			var parts = layer.options.dashArray.split(/[, ]+/),
    	  			    dashArray = [],
    	  			    dashValue,
    	  			    i;
    	  			for (i = 0; i < parts.length; i++) {
    	  				dashValue = Number(parts[i]);
    	  				// Ignore dash array containing invalid lengths
    	  				if (isNaN(dashValue)) { return; }
    	  				dashArray.push(dashValue);
    	  			}
    	  			layer.options._dashArray = dashArray;
    	  		} else {
    	  			layer.options._dashArray = layer.options.dashArray;
    	  		}
    	  	},

    	  	_requestRedraw: function (layer) {
    	  		if (!this._map) { return; }

    	  		this._extendRedrawBounds(layer);
    	  		this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
    	  	},

    	  	_extendRedrawBounds: function (layer) {
    	  		if (layer._pxBounds) {
    	  			var padding = (layer.options.weight || 0) + 1;
    	  			this._redrawBounds = this._redrawBounds || new Bounds();
    	  			this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
    	  			this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
    	  		}
    	  	},

    	  	_redraw: function () {
    	  		this._redrawRequest = null;

    	  		if (this._redrawBounds) {
    	  			this._redrawBounds.min._floor();
    	  			this._redrawBounds.max._ceil();
    	  		}

    	  		this._clear(); // clear layers in redraw bounds
    	  		this._draw(); // draw layers

    	  		this._redrawBounds = null;
    	  	},

    	  	_clear: function () {
    	  		var bounds = this._redrawBounds;
    	  		if (bounds) {
    	  			var size = bounds.getSize();
    	  			this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
    	  		} else {
    	  			this._ctx.save();
    	  			this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    	  			this._ctx.clearRect(0, 0, this._container.width, this._container.height);
    	  			this._ctx.restore();
    	  		}
    	  	},

    	  	_draw: function () {
    	  		var layer, bounds = this._redrawBounds;
    	  		this._ctx.save();
    	  		if (bounds) {
    	  			var size = bounds.getSize();
    	  			this._ctx.beginPath();
    	  			this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
    	  			this._ctx.clip();
    	  		}

    	  		this._drawing = true;

    	  		for (var order = this._drawFirst; order; order = order.next) {
    	  			layer = order.layer;
    	  			if (!bounds || (layer._pxBounds && layer._pxBounds.intersects(bounds))) {
    	  				layer._updatePath();
    	  			}
    	  		}

    	  		this._drawing = false;

    	  		this._ctx.restore();  // Restore state before clipping.
    	  	},

    	  	_updatePoly: function (layer, closed) {
    	  		if (!this._drawing) { return; }

    	  		var i, j, len2, p,
    	  		    parts = layer._parts,
    	  		    len = parts.length,
    	  		    ctx = this._ctx;

    	  		if (!len) { return; }

    	  		ctx.beginPath();

    	  		for (i = 0; i < len; i++) {
    	  			for (j = 0, len2 = parts[i].length; j < len2; j++) {
    	  				p = parts[i][j];
    	  				ctx[j ? 'lineTo' : 'moveTo'](p.x, p.y);
    	  			}
    	  			if (closed) {
    	  				ctx.closePath();
    	  			}
    	  		}

    	  		this._fillStroke(ctx, layer);

    	  		// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
    	  	},

    	  	_updateCircle: function (layer) {

    	  		if (!this._drawing || layer._empty()) { return; }

    	  		var p = layer._point,
    	  		    ctx = this._ctx,
    	  		    r = Math.max(Math.round(layer._radius), 1),
    	  		    s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;

    	  		if (s !== 1) {
    	  			ctx.save();
    	  			ctx.scale(1, s);
    	  		}

    	  		ctx.beginPath();
    	  		ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);

    	  		if (s !== 1) {
    	  			ctx.restore();
    	  		}

    	  		this._fillStroke(ctx, layer);
    	  	},

    	  	_fillStroke: function (ctx, layer) {
    	  		var options = layer.options;

    	  		if (options.fill) {
    	  			ctx.globalAlpha = options.fillOpacity;
    	  			ctx.fillStyle = options.fillColor || options.color;
    	  			ctx.fill(options.fillRule || 'evenodd');
    	  		}

    	  		if (options.stroke && options.weight !== 0) {
    	  			if (ctx.setLineDash) {
    	  				ctx.setLineDash(layer.options && layer.options._dashArray || []);
    	  			}
    	  			ctx.globalAlpha = options.opacity;
    	  			ctx.lineWidth = options.weight;
    	  			ctx.strokeStyle = options.color;
    	  			ctx.lineCap = options.lineCap;
    	  			ctx.lineJoin = options.lineJoin;
    	  			ctx.stroke();
    	  		}
    	  	},

    	  	// Canvas obviously doesn't have mouse events for individual drawn objects,
    	  	// so we emulate that by calculating what's under the mouse on mousemove/click manually

    	  	_onClick: function (e) {
    	  		var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;

    	  		for (var order = this._drawFirst; order; order = order.next) {
    	  			layer = order.layer;
    	  			if (layer.options.interactive && layer._containsPoint(point)) {
    	  				if (!(e.type === 'click' || e.type === 'preclick') || !this._map._draggableMoved(layer)) {
    	  					clickedLayer = layer;
    	  				}
    	  			}
    	  		}
    	  		this._fireEvent(clickedLayer ? [clickedLayer] : false, e);
    	  	},

    	  	_onMouseMove: function (e) {
    	  		if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) { return; }

    	  		var point = this._map.mouseEventToLayerPoint(e);
    	  		this._handleMouseHover(e, point);
    	  	},


    	  	_handleMouseOut: function (e) {
    	  		var layer = this._hoveredLayer;
    	  		if (layer) {
    	  			// if we're leaving the layer, fire mouseout
    	  			removeClass(this._container, 'leaflet-interactive');
    	  			this._fireEvent([layer], e, 'mouseout');
    	  			this._hoveredLayer = null;
    	  			this._mouseHoverThrottled = false;
    	  		}
    	  	},

    	  	_handleMouseHover: function (e, point) {
    	  		if (this._mouseHoverThrottled) {
    	  			return;
    	  		}

    	  		var layer, candidateHoveredLayer;

    	  		for (var order = this._drawFirst; order; order = order.next) {
    	  			layer = order.layer;
    	  			if (layer.options.interactive && layer._containsPoint(point)) {
    	  				candidateHoveredLayer = layer;
    	  			}
    	  		}

    	  		if (candidateHoveredLayer !== this._hoveredLayer) {
    	  			this._handleMouseOut(e);

    	  			if (candidateHoveredLayer) {
    	  				addClass(this._container, 'leaflet-interactive'); // change cursor
    	  				this._fireEvent([candidateHoveredLayer], e, 'mouseover');
    	  				this._hoveredLayer = candidateHoveredLayer;
    	  			}
    	  		}

    	  		this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : false, e);

    	  		this._mouseHoverThrottled = true;
    	  		setTimeout(bind(function () {
    	  			this._mouseHoverThrottled = false;
    	  		}, this), 32);
    	  	},

    	  	_fireEvent: function (layers, e, type) {
    	  		this._map._fireDOMEvent(e, type || e.type, layers);
    	  	},

    	  	_bringToFront: function (layer) {
    	  		var order = layer._order;

    	  		if (!order) { return; }

    	  		var next = order.next;
    	  		var prev = order.prev;

    	  		if (next) {
    	  			next.prev = prev;
    	  		} else {
    	  			// Already last
    	  			return;
    	  		}
    	  		if (prev) {
    	  			prev.next = next;
    	  		} else if (next) {
    	  			// Update first entry unless this is the
    	  			// single entry
    	  			this._drawFirst = next;
    	  		}

    	  		order.prev = this._drawLast;
    	  		this._drawLast.next = order;

    	  		order.next = null;
    	  		this._drawLast = order;

    	  		this._requestRedraw(layer);
    	  	},

    	  	_bringToBack: function (layer) {
    	  		var order = layer._order;

    	  		if (!order) { return; }

    	  		var next = order.next;
    	  		var prev = order.prev;

    	  		if (prev) {
    	  			prev.next = next;
    	  		} else {
    	  			// Already first
    	  			return;
    	  		}
    	  		if (next) {
    	  			next.prev = prev;
    	  		} else if (prev) {
    	  			// Update last entry unless this is the
    	  			// single entry
    	  			this._drawLast = prev;
    	  		}

    	  		order.prev = null;

    	  		order.next = this._drawFirst;
    	  		this._drawFirst.prev = order;
    	  		this._drawFirst = order;

    	  		this._requestRedraw(layer);
    	  	}
    	  });

    	  // @factory L.canvas(options?: Renderer options)
    	  // Creates a Canvas renderer with the given options.
    	  function canvas(options) {
    	  	return Browser.canvas ? new Canvas(options) : null;
    	  }

    	  /*
    	   * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
    	   */


    	  var vmlCreate = (function () {
    	  	try {
    	  		document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
    	  		return function (name) {
    	  			return document.createElement('<lvml:' + name + ' class="lvml">');
    	  		};
    	  	} catch (e) {
    	  		// Do not return fn from catch block so `e` can be garbage collected
    	  		// See https://github.com/Leaflet/Leaflet/pull/7279
    	  	}
    	  	return function (name) {
    	  		return document.createElement('<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
    	  	};
    	  })();


    	  /*
    	   * @class SVG
    	   *
    	   *
    	   * VML was deprecated in 2012, which means VML functionality exists only for backwards compatibility
    	   * with old versions of Internet Explorer.
    	   */

    	  // mixin to redefine some SVG methods to handle VML syntax which is similar but with some differences
    	  var vmlMixin = {

    	  	_initContainer: function () {
    	  		this._container = create$1('div', 'leaflet-vml-container');
    	  	},

    	  	_update: function () {
    	  		if (this._map._animatingZoom) { return; }
    	  		Renderer.prototype._update.call(this);
    	  		this.fire('update');
    	  	},

    	  	_initPath: function (layer) {
    	  		var container = layer._container = vmlCreate('shape');

    	  		addClass(container, 'leaflet-vml-shape ' + (this.options.className || ''));

    	  		container.coordsize = '1 1';

    	  		layer._path = vmlCreate('path');
    	  		container.appendChild(layer._path);

    	  		this._updateStyle(layer);
    	  		this._layers[stamp(layer)] = layer;
    	  	},

    	  	_addPath: function (layer) {
    	  		var container = layer._container;
    	  		this._container.appendChild(container);

    	  		if (layer.options.interactive) {
    	  			layer.addInteractiveTarget(container);
    	  		}
    	  	},

    	  	_removePath: function (layer) {
    	  		var container = layer._container;
    	  		remove(container);
    	  		layer.removeInteractiveTarget(container);
    	  		delete this._layers[stamp(layer)];
    	  	},

    	  	_updateStyle: function (layer) {
    	  		var stroke = layer._stroke,
    	  		    fill = layer._fill,
    	  		    options = layer.options,
    	  		    container = layer._container;

    	  		container.stroked = !!options.stroke;
    	  		container.filled = !!options.fill;

    	  		if (options.stroke) {
    	  			if (!stroke) {
    	  				stroke = layer._stroke = vmlCreate('stroke');
    	  			}
    	  			container.appendChild(stroke);
    	  			stroke.weight = options.weight + 'px';
    	  			stroke.color = options.color;
    	  			stroke.opacity = options.opacity;

    	  			if (options.dashArray) {
    	  				stroke.dashStyle = isArray(options.dashArray) ?
    	  				    options.dashArray.join(' ') :
    	  				    options.dashArray.replace(/( *, *)/g, ' ');
    	  			} else {
    	  				stroke.dashStyle = '';
    	  			}
    	  			stroke.endcap = options.lineCap.replace('butt', 'flat');
    	  			stroke.joinstyle = options.lineJoin;

    	  		} else if (stroke) {
    	  			container.removeChild(stroke);
    	  			layer._stroke = null;
    	  		}

    	  		if (options.fill) {
    	  			if (!fill) {
    	  				fill = layer._fill = vmlCreate('fill');
    	  			}
    	  			container.appendChild(fill);
    	  			fill.color = options.fillColor || options.color;
    	  			fill.opacity = options.fillOpacity;

    	  		} else if (fill) {
    	  			container.removeChild(fill);
    	  			layer._fill = null;
    	  		}
    	  	},

    	  	_updateCircle: function (layer) {
    	  		var p = layer._point.round(),
    	  		    r = Math.round(layer._radius),
    	  		    r2 = Math.round(layer._radiusY || r);

    	  		this._setPath(layer, layer._empty() ? 'M0 0' :
    	  			'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r2 + ' 0,' + (65535 * 360));
    	  	},

    	  	_setPath: function (layer, path) {
    	  		layer._path.v = path;
    	  	},

    	  	_bringToFront: function (layer) {
    	  		toFront(layer._container);
    	  	},

    	  	_bringToBack: function (layer) {
    	  		toBack(layer._container);
    	  	}
    	  };

    	  var create = Browser.vml ? vmlCreate : svgCreate;

    	  /*
    	   * @class SVG
    	   * @inherits Renderer
    	   * @aka L.SVG
    	   *
    	   * Allows vector layers to be displayed with [SVG](https://developer.mozilla.org/docs/Web/SVG).
    	   * Inherits `Renderer`.
    	   *
    	   * Due to [technical limitations](https://caniuse.com/svg), SVG is not
    	   * available in all web browsers, notably Android 2.x and 3.x.
    	   *
    	   * Although SVG is not available on IE7 and IE8, these browsers support
    	   * [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language)
    	   * (a now deprecated technology), and the SVG renderer will fall back to VML in
    	   * this case.
    	   *
    	   * @example
    	   *
    	   * Use SVG by default for all paths in the map:
    	   *
    	   * ```js
    	   * var map = L.map('map', {
    	   * 	renderer: L.svg()
    	   * });
    	   * ```
    	   *
    	   * Use a SVG renderer with extra padding for specific vector geometries:
    	   *
    	   * ```js
    	   * var map = L.map('map');
    	   * var myRenderer = L.svg({ padding: 0.5 });
    	   * var line = L.polyline( coordinates, { renderer: myRenderer } );
    	   * var circle = L.circle( center, { renderer: myRenderer } );
    	   * ```
    	   */

    	  var SVG = Renderer.extend({

    	  	_initContainer: function () {
    	  		this._container = create('svg');

    	  		// makes it possible to click through svg root; we'll reset it back in individual paths
    	  		this._container.setAttribute('pointer-events', 'none');

    	  		this._rootGroup = create('g');
    	  		this._container.appendChild(this._rootGroup);
    	  	},

    	  	_destroyContainer: function () {
    	  		remove(this._container);
    	  		off(this._container);
    	  		delete this._container;
    	  		delete this._rootGroup;
    	  		delete this._svgSize;
    	  	},

    	  	_update: function () {
    	  		if (this._map._animatingZoom && this._bounds) { return; }

    	  		Renderer.prototype._update.call(this);

    	  		var b = this._bounds,
    	  		    size = b.getSize(),
    	  		    container = this._container;

    	  		// set size of svg-container if changed
    	  		if (!this._svgSize || !this._svgSize.equals(size)) {
    	  			this._svgSize = size;
    	  			container.setAttribute('width', size.x);
    	  			container.setAttribute('height', size.y);
    	  		}

    	  		// movement: update container viewBox so that we don't have to change coordinates of individual layers
    	  		setPosition(container, b.min);
    	  		container.setAttribute('viewBox', [b.min.x, b.min.y, size.x, size.y].join(' '));

    	  		this.fire('update');
    	  	},

    	  	// methods below are called by vector layers implementations

    	  	_initPath: function (layer) {
    	  		var path = layer._path = create('path');

    	  		// @namespace Path
    	  		// @option className: String = null
    	  		// Custom class name set on an element. Only for SVG renderer.
    	  		if (layer.options.className) {
    	  			addClass(path, layer.options.className);
    	  		}

    	  		if (layer.options.interactive) {
    	  			addClass(path, 'leaflet-interactive');
    	  		}

    	  		this._updateStyle(layer);
    	  		this._layers[stamp(layer)] = layer;
    	  	},

    	  	_addPath: function (layer) {
    	  		if (!this._rootGroup) { this._initContainer(); }
    	  		this._rootGroup.appendChild(layer._path);
    	  		layer.addInteractiveTarget(layer._path);
    	  	},

    	  	_removePath: function (layer) {
    	  		remove(layer._path);
    	  		layer.removeInteractiveTarget(layer._path);
    	  		delete this._layers[stamp(layer)];
    	  	},

    	  	_updatePath: function (layer) {
    	  		layer._project();
    	  		layer._update();
    	  	},

    	  	_updateStyle: function (layer) {
    	  		var path = layer._path,
    	  		    options = layer.options;

    	  		if (!path) { return; }

    	  		if (options.stroke) {
    	  			path.setAttribute('stroke', options.color);
    	  			path.setAttribute('stroke-opacity', options.opacity);
    	  			path.setAttribute('stroke-width', options.weight);
    	  			path.setAttribute('stroke-linecap', options.lineCap);
    	  			path.setAttribute('stroke-linejoin', options.lineJoin);

    	  			if (options.dashArray) {
    	  				path.setAttribute('stroke-dasharray', options.dashArray);
    	  			} else {
    	  				path.removeAttribute('stroke-dasharray');
    	  			}

    	  			if (options.dashOffset) {
    	  				path.setAttribute('stroke-dashoffset', options.dashOffset);
    	  			} else {
    	  				path.removeAttribute('stroke-dashoffset');
    	  			}
    	  		} else {
    	  			path.setAttribute('stroke', 'none');
    	  		}

    	  		if (options.fill) {
    	  			path.setAttribute('fill', options.fillColor || options.color);
    	  			path.setAttribute('fill-opacity', options.fillOpacity);
    	  			path.setAttribute('fill-rule', options.fillRule || 'evenodd');
    	  		} else {
    	  			path.setAttribute('fill', 'none');
    	  		}
    	  	},

    	  	_updatePoly: function (layer, closed) {
    	  		this._setPath(layer, pointsToPath(layer._parts, closed));
    	  	},

    	  	_updateCircle: function (layer) {
    	  		var p = layer._point,
    	  		    r = Math.max(Math.round(layer._radius), 1),
    	  		    r2 = Math.max(Math.round(layer._radiusY), 1) || r,
    	  		    arc = 'a' + r + ',' + r2 + ' 0 1,0 ';

    	  		// drawing a circle with two half-arcs
    	  		var d = layer._empty() ? 'M0 0' :
    	  			'M' + (p.x - r) + ',' + p.y +
    	  			arc + (r * 2) + ',0 ' +
    	  			arc + (-r * 2) + ',0 ';

    	  		this._setPath(layer, d);
    	  	},

    	  	_setPath: function (layer, path) {
    	  		layer._path.setAttribute('d', path);
    	  	},

    	  	// SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
    	  	_bringToFront: function (layer) {
    	  		toFront(layer._path);
    	  	},

    	  	_bringToBack: function (layer) {
    	  		toBack(layer._path);
    	  	}
    	  });

    	  if (Browser.vml) {
    	  	SVG.include(vmlMixin);
    	  }

    	  // @namespace SVG
    	  // @factory L.svg(options?: Renderer options)
    	  // Creates a SVG renderer with the given options.
    	  function svg(options) {
    	  	return Browser.svg || Browser.vml ? new SVG(options) : null;
    	  }

    	  Map.include({
    	  	// @namespace Map; @method getRenderer(layer: Path): Renderer
    	  	// Returns the instance of `Renderer` that should be used to render the given
    	  	// `Path`. It will ensure that the `renderer` options of the map and paths
    	  	// are respected, and that the renderers do exist on the map.
    	  	getRenderer: function (layer) {
    	  		// @namespace Path; @option renderer: Renderer
    	  		// Use this specific instance of `Renderer` for this path. Takes
    	  		// precedence over the map's [default renderer](#map-renderer).
    	  		var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;

    	  		if (!renderer) {
    	  			renderer = this._renderer = this._createRenderer();
    	  		}

    	  		if (!this.hasLayer(renderer)) {
    	  			this.addLayer(renderer);
    	  		}
    	  		return renderer;
    	  	},

    	  	_getPaneRenderer: function (name) {
    	  		if (name === 'overlayPane' || name === undefined) {
    	  			return false;
    	  		}

    	  		var renderer = this._paneRenderers[name];
    	  		if (renderer === undefined) {
    	  			renderer = this._createRenderer({pane: name});
    	  			this._paneRenderers[name] = renderer;
    	  		}
    	  		return renderer;
    	  	},

    	  	_createRenderer: function (options) {
    	  		// @namespace Map; @option preferCanvas: Boolean = false
    	  		// Whether `Path`s should be rendered on a `Canvas` renderer.
    	  		// By default, all `Path`s are rendered in a `SVG` renderer.
    	  		return (this.options.preferCanvas && canvas(options)) || svg(options);
    	  	}
    	  });

    	  /*
    	   * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds object.
    	   */

    	  /*
    	   * @class Rectangle
    	   * @aka L.Rectangle
    	   * @inherits Polygon
    	   *
    	   * A class for drawing rectangle overlays on a map. Extends `Polygon`.
    	   *
    	   * @example
    	   *
    	   * ```js
    	   * // define rectangle geographical bounds
    	   * var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];
    	   *
    	   * // create an orange rectangle
    	   * L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
    	   *
    	   * // zoom the map to the rectangle bounds
    	   * map.fitBounds(bounds);
    	   * ```
    	   *
    	   */


    	  var Rectangle = Polygon.extend({
    	  	initialize: function (latLngBounds, options) {
    	  		Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
    	  	},

    	  	// @method setBounds(latLngBounds: LatLngBounds): this
    	  	// Redraws the rectangle with the passed bounds.
    	  	setBounds: function (latLngBounds) {
    	  		return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
    	  	},

    	  	_boundsToLatLngs: function (latLngBounds) {
    	  		latLngBounds = toLatLngBounds(latLngBounds);
    	  		return [
    	  			latLngBounds.getSouthWest(),
    	  			latLngBounds.getNorthWest(),
    	  			latLngBounds.getNorthEast(),
    	  			latLngBounds.getSouthEast()
    	  		];
    	  	}
    	  });


    	  // @factory L.rectangle(latLngBounds: LatLngBounds, options?: Polyline options)
    	  function rectangle(latLngBounds, options) {
    	  	return new Rectangle(latLngBounds, options);
    	  }

    	  SVG.create = create;
    	  SVG.pointsToPath = pointsToPath;

    	  GeoJSON.geometryToLayer = geometryToLayer;
    	  GeoJSON.coordsToLatLng = coordsToLatLng;
    	  GeoJSON.coordsToLatLngs = coordsToLatLngs;
    	  GeoJSON.latLngToCoords = latLngToCoords;
    	  GeoJSON.latLngsToCoords = latLngsToCoords;
    	  GeoJSON.getFeature = getFeature;
    	  GeoJSON.asFeature = asFeature;

    	  /*
    	   * L.Handler.BoxZoom is used to add shift-drag zoom interaction to the map
    	   * (zoom to a selected bounding box), enabled by default.
    	   */

    	  // @namespace Map
    	  // @section Interaction Options
    	  Map.mergeOptions({
    	  	// @option boxZoom: Boolean = true
    	  	// Whether the map can be zoomed to a rectangular area specified by
    	  	// dragging the mouse while pressing the shift key.
    	  	boxZoom: true
    	  });

    	  var BoxZoom = Handler.extend({
    	  	initialize: function (map) {
    	  		this._map = map;
    	  		this._container = map._container;
    	  		this._pane = map._panes.overlayPane;
    	  		this._resetStateTimeout = 0;
    	  		map.on('unload', this._destroy, this);
    	  	},

    	  	addHooks: function () {
    	  		on(this._container, 'mousedown', this._onMouseDown, this);
    	  	},

    	  	removeHooks: function () {
    	  		off(this._container, 'mousedown', this._onMouseDown, this);
    	  	},

    	  	moved: function () {
    	  		return this._moved;
    	  	},

    	  	_destroy: function () {
    	  		remove(this._pane);
    	  		delete this._pane;
    	  	},

    	  	_resetState: function () {
    	  		this._resetStateTimeout = 0;
    	  		this._moved = false;
    	  	},

    	  	_clearDeferredResetState: function () {
    	  		if (this._resetStateTimeout !== 0) {
    	  			clearTimeout(this._resetStateTimeout);
    	  			this._resetStateTimeout = 0;
    	  		}
    	  	},

    	  	_onMouseDown: function (e) {
    	  		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

    	  		// Clear the deferred resetState if it hasn't executed yet, otherwise it
    	  		// will interrupt the interaction and orphan a box element in the container.
    	  		this._clearDeferredResetState();
    	  		this._resetState();

    	  		disableTextSelection();
    	  		disableImageDrag();

    	  		this._startPoint = this._map.mouseEventToContainerPoint(e);

    	  		on(document, {
    	  			contextmenu: stop,
    	  			mousemove: this._onMouseMove,
    	  			mouseup: this._onMouseUp,
    	  			keydown: this._onKeyDown
    	  		}, this);
    	  	},

    	  	_onMouseMove: function (e) {
    	  		if (!this._moved) {
    	  			this._moved = true;

    	  			this._box = create$1('div', 'leaflet-zoom-box', this._container);
    	  			addClass(this._container, 'leaflet-crosshair');

    	  			this._map.fire('boxzoomstart');
    	  		}

    	  		this._point = this._map.mouseEventToContainerPoint(e);

    	  		var bounds = new Bounds(this._point, this._startPoint),
    	  		    size = bounds.getSize();

    	  		setPosition(this._box, bounds.min);

    	  		this._box.style.width  = size.x + 'px';
    	  		this._box.style.height = size.y + 'px';
    	  	},

    	  	_finish: function () {
    	  		if (this._moved) {
    	  			remove(this._box);
    	  			removeClass(this._container, 'leaflet-crosshair');
    	  		}

    	  		enableTextSelection();
    	  		enableImageDrag();

    	  		off(document, {
    	  			contextmenu: stop,
    	  			mousemove: this._onMouseMove,
    	  			mouseup: this._onMouseUp,
    	  			keydown: this._onKeyDown
    	  		}, this);
    	  	},

    	  	_onMouseUp: function (e) {
    	  		if ((e.which !== 1) && (e.button !== 1)) { return; }

    	  		this._finish();

    	  		if (!this._moved) { return; }
    	  		// Postpone to next JS tick so internal click event handling
    	  		// still see it as "moved".
    	  		this._clearDeferredResetState();
    	  		this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);

    	  		var bounds = new LatLngBounds(
    	  		        this._map.containerPointToLatLng(this._startPoint),
    	  		        this._map.containerPointToLatLng(this._point));

    	  		this._map
    	  			.fitBounds(bounds)
    	  			.fire('boxzoomend', {boxZoomBounds: bounds});
    	  	},

    	  	_onKeyDown: function (e) {
    	  		if (e.keyCode === 27) {
    	  			this._finish();
    	  			this._clearDeferredResetState();
    	  			this._resetState();
    	  		}
    	  	}
    	  });

    	  // @section Handlers
    	  // @property boxZoom: Handler
    	  // Box (shift-drag with mouse) zoom handler.
    	  Map.addInitHook('addHandler', 'boxZoom', BoxZoom);

    	  /*
    	   * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
    	   */

    	  // @namespace Map
    	  // @section Interaction Options

    	  Map.mergeOptions({
    	  	// @option doubleClickZoom: Boolean|String = true
    	  	// Whether the map can be zoomed in by double clicking on it and
    	  	// zoomed out by double clicking while holding shift. If passed
    	  	// `'center'`, double-click zoom will zoom to the center of the
    	  	//  view regardless of where the mouse was.
    	  	doubleClickZoom: true
    	  });

    	  var DoubleClickZoom = Handler.extend({
    	  	addHooks: function () {
    	  		this._map.on('dblclick', this._onDoubleClick, this);
    	  	},

    	  	removeHooks: function () {
    	  		this._map.off('dblclick', this._onDoubleClick, this);
    	  	},

    	  	_onDoubleClick: function (e) {
    	  		var map = this._map,
    	  		    oldZoom = map.getZoom(),
    	  		    delta = map.options.zoomDelta,
    	  		    zoom = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;

    	  		if (map.options.doubleClickZoom === 'center') {
    	  			map.setZoom(zoom);
    	  		} else {
    	  			map.setZoomAround(e.containerPoint, zoom);
    	  		}
    	  	}
    	  });

    	  // @section Handlers
    	  //
    	  // Map properties include interaction handlers that allow you to control
    	  // interaction behavior in runtime, enabling or disabling certain features such
    	  // as dragging or touch zoom (see `Handler` methods). For example:
    	  //
    	  // ```js
    	  // map.doubleClickZoom.disable();
    	  // ```
    	  //
    	  // @property doubleClickZoom: Handler
    	  // Double click zoom handler.
    	  Map.addInitHook('addHandler', 'doubleClickZoom', DoubleClickZoom);

    	  /*
    	   * L.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
    	   */

    	  // @namespace Map
    	  // @section Interaction Options
    	  Map.mergeOptions({
    	  	// @option dragging: Boolean = true
    	  	// Whether the map is draggable with mouse/touch or not.
    	  	dragging: true,

    	  	// @section Panning Inertia Options
    	  	// @option inertia: Boolean = *
    	  	// If enabled, panning of the map will have an inertia effect where
    	  	// the map builds momentum while dragging and continues moving in
    	  	// the same direction for some time. Feels especially nice on touch
    	  	// devices. Enabled by default.
    	  	inertia: true,

    	  	// @option inertiaDeceleration: Number = 3000
    	  	// The rate with which the inertial movement slows down, in pixels/second².
    	  	inertiaDeceleration: 3400, // px/s^2

    	  	// @option inertiaMaxSpeed: Number = Infinity
    	  	// Max speed of the inertial movement, in pixels/second.
    	  	inertiaMaxSpeed: Infinity, // px/s

    	  	// @option easeLinearity: Number = 0.2
    	  	easeLinearity: 0.2,

    	  	// TODO refactor, move to CRS
    	  	// @option worldCopyJump: Boolean = false
    	  	// With this option enabled, the map tracks when you pan to another "copy"
    	  	// of the world and seamlessly jumps to the original one so that all overlays
    	  	// like markers and vector layers are still visible.
    	  	worldCopyJump: false,

    	  	// @option maxBoundsViscosity: Number = 0.0
    	  	// If `maxBounds` is set, this option will control how solid the bounds
    	  	// are when dragging the map around. The default value of `0.0` allows the
    	  	// user to drag outside the bounds at normal speed, higher values will
    	  	// slow down map dragging outside bounds, and `1.0` makes the bounds fully
    	  	// solid, preventing the user from dragging outside the bounds.
    	  	maxBoundsViscosity: 0.0
    	  });

    	  var Drag = Handler.extend({
    	  	addHooks: function () {
    	  		if (!this._draggable) {
    	  			var map = this._map;

    	  			this._draggable = new Draggable(map._mapPane, map._container);

    	  			this._draggable.on({
    	  				dragstart: this._onDragStart,
    	  				drag: this._onDrag,
    	  				dragend: this._onDragEnd
    	  			}, this);

    	  			this._draggable.on('predrag', this._onPreDragLimit, this);
    	  			if (map.options.worldCopyJump) {
    	  				this._draggable.on('predrag', this._onPreDragWrap, this);
    	  				map.on('zoomend', this._onZoomEnd, this);

    	  				map.whenReady(this._onZoomEnd, this);
    	  			}
    	  		}
    	  		addClass(this._map._container, 'leaflet-grab leaflet-touch-drag');
    	  		this._draggable.enable();
    	  		this._positions = [];
    	  		this._times = [];
    	  	},

    	  	removeHooks: function () {
    	  		removeClass(this._map._container, 'leaflet-grab');
    	  		removeClass(this._map._container, 'leaflet-touch-drag');
    	  		this._draggable.disable();
    	  	},

    	  	moved: function () {
    	  		return this._draggable && this._draggable._moved;
    	  	},

    	  	moving: function () {
    	  		return this._draggable && this._draggable._moving;
    	  	},

    	  	_onDragStart: function () {
    	  		var map = this._map;

    	  		map._stop();
    	  		if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
    	  			var bounds = toLatLngBounds(this._map.options.maxBounds);

    	  			this._offsetLimit = toBounds(
    	  				this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
    	  				this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1)
    	  					.add(this._map.getSize()));

    	  			this._viscosity = Math.min(1.0, Math.max(0.0, this._map.options.maxBoundsViscosity));
    	  		} else {
    	  			this._offsetLimit = null;
    	  		}

    	  		map
    	  		    .fire('movestart')
    	  		    .fire('dragstart');

    	  		if (map.options.inertia) {
    	  			this._positions = [];
    	  			this._times = [];
    	  		}
    	  	},

    	  	_onDrag: function (e) {
    	  		if (this._map.options.inertia) {
    	  			var time = this._lastTime = +new Date(),
    	  			    pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;

    	  			this._positions.push(pos);
    	  			this._times.push(time);

    	  			this._prunePositions(time);
    	  		}

    	  		this._map
    	  		    .fire('move', e)
    	  		    .fire('drag', e);
    	  	},

    	  	_prunePositions: function (time) {
    	  		while (this._positions.length > 1 && time - this._times[0] > 50) {
    	  			this._positions.shift();
    	  			this._times.shift();
    	  		}
    	  	},

    	  	_onZoomEnd: function () {
    	  		var pxCenter = this._map.getSize().divideBy(2),
    	  		    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);

    	  		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
    	  		this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
    	  	},

    	  	_viscousLimit: function (value, threshold) {
    	  		return value - (value - threshold) * this._viscosity;
    	  	},

    	  	_onPreDragLimit: function () {
    	  		if (!this._viscosity || !this._offsetLimit) { return; }

    	  		var offset = this._draggable._newPos.subtract(this._draggable._startPos);

    	  		var limit = this._offsetLimit;
    	  		if (offset.x < limit.min.x) { offset.x = this._viscousLimit(offset.x, limit.min.x); }
    	  		if (offset.y < limit.min.y) { offset.y = this._viscousLimit(offset.y, limit.min.y); }
    	  		if (offset.x > limit.max.x) { offset.x = this._viscousLimit(offset.x, limit.max.x); }
    	  		if (offset.y > limit.max.y) { offset.y = this._viscousLimit(offset.y, limit.max.y); }

    	  		this._draggable._newPos = this._draggable._startPos.add(offset);
    	  	},

    	  	_onPreDragWrap: function () {
    	  		// TODO refactor to be able to adjust map pane position after zoom
    	  		var worldWidth = this._worldWidth,
    	  		    halfWidth = Math.round(worldWidth / 2),
    	  		    dx = this._initialWorldOffset,
    	  		    x = this._draggable._newPos.x,
    	  		    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
    	  		    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
    	  		    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

    	  		this._draggable._absPos = this._draggable._newPos.clone();
    	  		this._draggable._newPos.x = newX;
    	  	},

    	  	_onDragEnd: function (e) {
    	  		var map = this._map,
    	  		    options = map.options,

    	  		    noInertia = !options.inertia || e.noInertia || this._times.length < 2;

    	  		map.fire('dragend', e);

    	  		if (noInertia) {
    	  			map.fire('moveend');

    	  		} else {
    	  			this._prunePositions(+new Date());

    	  			var direction = this._lastPos.subtract(this._positions[0]),
    	  			    duration = (this._lastTime - this._times[0]) / 1000,
    	  			    ease = options.easeLinearity,

    	  			    speedVector = direction.multiplyBy(ease / duration),
    	  			    speed = speedVector.distanceTo([0, 0]),

    	  			    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
    	  			    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

    	  			    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
    	  			    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

    	  			if (!offset.x && !offset.y) {
    	  				map.fire('moveend');

    	  			} else {
    	  				offset = map._limitOffset(offset, map.options.maxBounds);

    	  				requestAnimFrame(function () {
    	  					map.panBy(offset, {
    	  						duration: decelerationDuration,
    	  						easeLinearity: ease,
    	  						noMoveStart: true,
    	  						animate: true
    	  					});
    	  				});
    	  			}
    	  		}
    	  	}
    	  });

    	  // @section Handlers
    	  // @property dragging: Handler
    	  // Map dragging handler (by both mouse and touch).
    	  Map.addInitHook('addHandler', 'dragging', Drag);

    	  /*
    	   * L.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
    	   */

    	  // @namespace Map
    	  // @section Keyboard Navigation Options
    	  Map.mergeOptions({
    	  	// @option keyboard: Boolean = true
    	  	// Makes the map focusable and allows users to navigate the map with keyboard
    	  	// arrows and `+`/`-` keys.
    	  	keyboard: true,

    	  	// @option keyboardPanDelta: Number = 80
    	  	// Amount of pixels to pan when pressing an arrow key.
    	  	keyboardPanDelta: 80
    	  });

    	  var Keyboard = Handler.extend({

    	  	keyCodes: {
    	  		left:    [37],
    	  		right:   [39],
    	  		down:    [40],
    	  		up:      [38],
    	  		zoomIn:  [187, 107, 61, 171],
    	  		zoomOut: [189, 109, 54, 173]
    	  	},

    	  	initialize: function (map) {
    	  		this._map = map;

    	  		this._setPanDelta(map.options.keyboardPanDelta);
    	  		this._setZoomDelta(map.options.zoomDelta);
    	  	},

    	  	addHooks: function () {
    	  		var container = this._map._container;

    	  		// make the container focusable by tabbing
    	  		if (container.tabIndex <= 0) {
    	  			container.tabIndex = '0';
    	  		}

    	  		on(container, {
    	  			focus: this._onFocus,
    	  			blur: this._onBlur,
    	  			mousedown: this._onMouseDown
    	  		}, this);

    	  		this._map.on({
    	  			focus: this._addHooks,
    	  			blur: this._removeHooks
    	  		}, this);
    	  	},

    	  	removeHooks: function () {
    	  		this._removeHooks();

    	  		off(this._map._container, {
    	  			focus: this._onFocus,
    	  			blur: this._onBlur,
    	  			mousedown: this._onMouseDown
    	  		}, this);

    	  		this._map.off({
    	  			focus: this._addHooks,
    	  			blur: this._removeHooks
    	  		}, this);
    	  	},

    	  	_onMouseDown: function () {
    	  		if (this._focused) { return; }

    	  		var body = document.body,
    	  		    docEl = document.documentElement,
    	  		    top = body.scrollTop || docEl.scrollTop,
    	  		    left = body.scrollLeft || docEl.scrollLeft;

    	  		this._map._container.focus();

    	  		window.scrollTo(left, top);
    	  	},

    	  	_onFocus: function () {
    	  		this._focused = true;
    	  		this._map.fire('focus');
    	  	},

    	  	_onBlur: function () {
    	  		this._focused = false;
    	  		this._map.fire('blur');
    	  	},

    	  	_setPanDelta: function (panDelta) {
    	  		var keys = this._panKeys = {},
    	  		    codes = this.keyCodes,
    	  		    i, len;

    	  		for (i = 0, len = codes.left.length; i < len; i++) {
    	  			keys[codes.left[i]] = [-1 * panDelta, 0];
    	  		}
    	  		for (i = 0, len = codes.right.length; i < len; i++) {
    	  			keys[codes.right[i]] = [panDelta, 0];
    	  		}
    	  		for (i = 0, len = codes.down.length; i < len; i++) {
    	  			keys[codes.down[i]] = [0, panDelta];
    	  		}
    	  		for (i = 0, len = codes.up.length; i < len; i++) {
    	  			keys[codes.up[i]] = [0, -1 * panDelta];
    	  		}
    	  	},

    	  	_setZoomDelta: function (zoomDelta) {
    	  		var keys = this._zoomKeys = {},
    	  		    codes = this.keyCodes,
    	  		    i, len;

    	  		for (i = 0, len = codes.zoomIn.length; i < len; i++) {
    	  			keys[codes.zoomIn[i]] = zoomDelta;
    	  		}
    	  		for (i = 0, len = codes.zoomOut.length; i < len; i++) {
    	  			keys[codes.zoomOut[i]] = -zoomDelta;
    	  		}
    	  	},

    	  	_addHooks: function () {
    	  		on(document, 'keydown', this._onKeyDown, this);
    	  	},

    	  	_removeHooks: function () {
    	  		off(document, 'keydown', this._onKeyDown, this);
    	  	},

    	  	_onKeyDown: function (e) {
    	  		if (e.altKey || e.ctrlKey || e.metaKey) { return; }

    	  		var key = e.keyCode,
    	  		    map = this._map,
    	  		    offset;

    	  		if (key in this._panKeys) {
    	  			if (!map._panAnim || !map._panAnim._inProgress) {
    	  				offset = this._panKeys[key];
    	  				if (e.shiftKey) {
    	  					offset = toPoint(offset).multiplyBy(3);
    	  				}

    	  				map.panBy(offset);

    	  				if (map.options.maxBounds) {
    	  					map.panInsideBounds(map.options.maxBounds);
    	  				}
    	  			}
    	  		} else if (key in this._zoomKeys) {
    	  			map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);

    	  		} else if (key === 27 && map._popup && map._popup.options.closeOnEscapeKey) {
    	  			map.closePopup();

    	  		} else {
    	  			return;
    	  		}

    	  		stop(e);
    	  	}
    	  });

    	  // @section Handlers
    	  // @section Handlers
    	  // @property keyboard: Handler
    	  // Keyboard navigation handler.
    	  Map.addInitHook('addHandler', 'keyboard', Keyboard);

    	  /*
    	   * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
    	   */

    	  // @namespace Map
    	  // @section Interaction Options
    	  Map.mergeOptions({
    	  	// @section Mouse wheel options
    	  	// @option scrollWheelZoom: Boolean|String = true
    	  	// Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
    	  	// it will zoom to the center of the view regardless of where the mouse was.
    	  	scrollWheelZoom: true,

    	  	// @option wheelDebounceTime: Number = 40
    	  	// Limits the rate at which a wheel can fire (in milliseconds). By default
    	  	// user can't zoom via wheel more often than once per 40 ms.
    	  	wheelDebounceTime: 40,

    	  	// @option wheelPxPerZoomLevel: Number = 60
    	  	// How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
    	  	// mean a change of one full zoom level. Smaller values will make wheel-zooming
    	  	// faster (and vice versa).
    	  	wheelPxPerZoomLevel: 60
    	  });

    	  var ScrollWheelZoom = Handler.extend({
    	  	addHooks: function () {
    	  		on(this._map._container, 'wheel', this._onWheelScroll, this);

    	  		this._delta = 0;
    	  	},

    	  	removeHooks: function () {
    	  		off(this._map._container, 'wheel', this._onWheelScroll, this);
    	  	},

    	  	_onWheelScroll: function (e) {
    	  		var delta = getWheelDelta(e);

    	  		var debounce = this._map.options.wheelDebounceTime;

    	  		this._delta += delta;
    	  		this._lastMousePos = this._map.mouseEventToContainerPoint(e);

    	  		if (!this._startTime) {
    	  			this._startTime = +new Date();
    	  		}

    	  		var left = Math.max(debounce - (+new Date() - this._startTime), 0);

    	  		clearTimeout(this._timer);
    	  		this._timer = setTimeout(bind(this._performZoom, this), left);

    	  		stop(e);
    	  	},

    	  	_performZoom: function () {
    	  		var map = this._map,
    	  		    zoom = map.getZoom(),
    	  		    snap = this._map.options.zoomSnap || 0;

    	  		map._stop(); // stop panning and fly animations if any

    	  		// map the delta with a sigmoid function to -4..4 range leaning on -1..1
    	  		var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4),
    	  		    d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2,
    	  		    d4 = snap ? Math.ceil(d3 / snap) * snap : d3,
    	  		    delta = map._limitZoom(zoom + (this._delta > 0 ? d4 : -d4)) - zoom;

    	  		this._delta = 0;
    	  		this._startTime = null;

    	  		if (!delta) { return; }

    	  		if (map.options.scrollWheelZoom === 'center') {
    	  			map.setZoom(zoom + delta);
    	  		} else {
    	  			map.setZoomAround(this._lastMousePos, zoom + delta);
    	  		}
    	  	}
    	  });

    	  // @section Handlers
    	  // @property scrollWheelZoom: Handler
    	  // Scroll wheel zoom handler.
    	  Map.addInitHook('addHandler', 'scrollWheelZoom', ScrollWheelZoom);

    	  /*
    	   * L.Map.TapHold is used to simulate `contextmenu` event on long hold,
    	   * which otherwise is not fired by mobile Safari.
    	   */

    	  var tapHoldDelay = 600;

    	  // @namespace Map
    	  // @section Interaction Options
    	  Map.mergeOptions({
    	  	// @section Touch interaction options
    	  	// @option tapHold: Boolean
    	  	// Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
    	  	tapHold: Browser.touchNative && Browser.safari && Browser.mobile,

    	  	// @option tapTolerance: Number = 15
    	  	// The max number of pixels a user can shift his finger during touch
    	  	// for it to be considered a valid tap.
    	  	tapTolerance: 15
    	  });

    	  var TapHold = Handler.extend({
    	  	addHooks: function () {
    	  		on(this._map._container, 'touchstart', this._onDown, this);
    	  	},

    	  	removeHooks: function () {
    	  		off(this._map._container, 'touchstart', this._onDown, this);
    	  	},

    	  	_onDown: function (e) {
    	  		clearTimeout(this._holdTimeout);
    	  		if (e.touches.length !== 1) { return; }

    	  		var first = e.touches[0];
    	  		this._startPos = this._newPos = new Point(first.clientX, first.clientY);

    	  		this._holdTimeout = setTimeout(bind(function () {
    	  			this._cancel();
    	  			if (!this._isTapValid()) { return; }

    	  			// prevent simulated mouse events https://w3c.github.io/touch-events/#mouse-events
    	  			on(document, 'touchend', preventDefault);
    	  			on(document, 'touchend touchcancel', this._cancelClickPrevent);
    	  			this._simulateEvent('contextmenu', first);
    	  		}, this), tapHoldDelay);

    	  		on(document, 'touchend touchcancel contextmenu', this._cancel, this);
    	  		on(document, 'touchmove', this._onMove, this);
    	  	},

    	  	_cancelClickPrevent: function cancelClickPrevent() {
    	  		off(document, 'touchend', preventDefault);
    	  		off(document, 'touchend touchcancel', cancelClickPrevent);
    	  	},

    	  	_cancel: function () {
    	  		clearTimeout(this._holdTimeout);
    	  		off(document, 'touchend touchcancel contextmenu', this._cancel, this);
    	  		off(document, 'touchmove', this._onMove, this);
    	  	},

    	  	_onMove: function (e) {
    	  		var first = e.touches[0];
    	  		this._newPos = new Point(first.clientX, first.clientY);
    	  	},

    	  	_isTapValid: function () {
    	  		return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
    	  	},

    	  	_simulateEvent: function (type, e) {
    	  		var simulatedEvent = new MouseEvent(type, {
    	  			bubbles: true,
    	  			cancelable: true,
    	  			view: window,
    	  			// detail: 1,
    	  			screenX: e.screenX,
    	  			screenY: e.screenY,
    	  			clientX: e.clientX,
    	  			clientY: e.clientY,
    	  			// button: 2,
    	  			// buttons: 2
    	  		});

    	  		simulatedEvent._simulated = true;

    	  		e.target.dispatchEvent(simulatedEvent);
    	  	}
    	  });

    	  // @section Handlers
    	  // @property tapHold: Handler
    	  // Long tap handler to simulate `contextmenu` event (useful in mobile Safari).
    	  Map.addInitHook('addHandler', 'tapHold', TapHold);

    	  /*
    	   * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
    	   */

    	  // @namespace Map
    	  // @section Interaction Options
    	  Map.mergeOptions({
    	  	// @section Touch interaction options
    	  	// @option touchZoom: Boolean|String = *
    	  	// Whether the map can be zoomed by touch-dragging with two fingers. If
    	  	// passed `'center'`, it will zoom to the center of the view regardless of
    	  	// where the touch events (fingers) were. Enabled for touch-capable web
    	  	// browsers.
    	  	touchZoom: Browser.touch,

    	  	// @option bounceAtZoomLimits: Boolean = true
    	  	// Set it to false if you don't want the map to zoom beyond min/max zoom
    	  	// and then bounce back when pinch-zooming.
    	  	bounceAtZoomLimits: true
    	  });

    	  var TouchZoom = Handler.extend({
    	  	addHooks: function () {
    	  		addClass(this._map._container, 'leaflet-touch-zoom');
    	  		on(this._map._container, 'touchstart', this._onTouchStart, this);
    	  	},

    	  	removeHooks: function () {
    	  		removeClass(this._map._container, 'leaflet-touch-zoom');
    	  		off(this._map._container, 'touchstart', this._onTouchStart, this);
    	  	},

    	  	_onTouchStart: function (e) {
    	  		var map = this._map;
    	  		if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

    	  		var p1 = map.mouseEventToContainerPoint(e.touches[0]),
    	  		    p2 = map.mouseEventToContainerPoint(e.touches[1]);

    	  		this._centerPoint = map.getSize()._divideBy(2);
    	  		this._startLatLng = map.containerPointToLatLng(this._centerPoint);
    	  		if (map.options.touchZoom !== 'center') {
    	  			this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
    	  		}

    	  		this._startDist = p1.distanceTo(p2);
    	  		this._startZoom = map.getZoom();

    	  		this._moved = false;
    	  		this._zooming = true;

    	  		map._stop();

    	  		on(document, 'touchmove', this._onTouchMove, this);
    	  		on(document, 'touchend touchcancel', this._onTouchEnd, this);

    	  		preventDefault(e);
    	  	},

    	  	_onTouchMove: function (e) {
    	  		if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }

    	  		var map = this._map,
    	  		    p1 = map.mouseEventToContainerPoint(e.touches[0]),
    	  		    p2 = map.mouseEventToContainerPoint(e.touches[1]),
    	  		    scale = p1.distanceTo(p2) / this._startDist;

    	  		this._zoom = map.getScaleZoom(scale, this._startZoom);

    	  		if (!map.options.bounceAtZoomLimits && (
    	  			(this._zoom < map.getMinZoom() && scale < 1) ||
    	  			(this._zoom > map.getMaxZoom() && scale > 1))) {
    	  			this._zoom = map._limitZoom(this._zoom);
    	  		}

    	  		if (map.options.touchZoom === 'center') {
    	  			this._center = this._startLatLng;
    	  			if (scale === 1) { return; }
    	  		} else {
    	  			// Get delta from pinch to center, so centerLatLng is delta applied to initial pinchLatLng
    	  			var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
    	  			if (scale === 1 && delta.x === 0 && delta.y === 0) { return; }
    	  			this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
    	  		}

    	  		if (!this._moved) {
    	  			map._moveStart(true, false);
    	  			this._moved = true;
    	  		}

    	  		cancelAnimFrame(this._animRequest);

    	  		var moveFn = bind(map._move, map, this._center, this._zoom, {pinch: true, round: false}, undefined);
    	  		this._animRequest = requestAnimFrame(moveFn, this, true);

    	  		preventDefault(e);
    	  	},

    	  	_onTouchEnd: function () {
    	  		if (!this._moved || !this._zooming) {
    	  			this._zooming = false;
    	  			return;
    	  		}

    	  		this._zooming = false;
    	  		cancelAnimFrame(this._animRequest);

    	  		off(document, 'touchmove', this._onTouchMove, this);
    	  		off(document, 'touchend touchcancel', this._onTouchEnd, this);

    	  		// Pinch updates GridLayers' levels only when zoomSnap is off, so zoomSnap becomes noUpdate.
    	  		if (this._map.options.zoomAnimation) {
    	  			this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
    	  		} else {
    	  			this._map._resetView(this._center, this._map._limitZoom(this._zoom));
    	  		}
    	  	}
    	  });

    	  // @section Handlers
    	  // @property touchZoom: Handler
    	  // Touch zoom handler.
    	  Map.addInitHook('addHandler', 'touchZoom', TouchZoom);

    	  Map.BoxZoom = BoxZoom;
    	  Map.DoubleClickZoom = DoubleClickZoom;
    	  Map.Drag = Drag;
    	  Map.Keyboard = Keyboard;
    	  Map.ScrollWheelZoom = ScrollWheelZoom;
    	  Map.TapHold = TapHold;
    	  Map.TouchZoom = TouchZoom;

    	  exports.Bounds = Bounds;
    	  exports.Browser = Browser;
    	  exports.CRS = CRS;
    	  exports.Canvas = Canvas;
    	  exports.Circle = Circle;
    	  exports.CircleMarker = CircleMarker;
    	  exports.Class = Class;
    	  exports.Control = Control;
    	  exports.DivIcon = DivIcon;
    	  exports.DivOverlay = DivOverlay;
    	  exports.DomEvent = DomEvent;
    	  exports.DomUtil = DomUtil;
    	  exports.Draggable = Draggable;
    	  exports.Evented = Evented;
    	  exports.FeatureGroup = FeatureGroup;
    	  exports.GeoJSON = GeoJSON;
    	  exports.GridLayer = GridLayer;
    	  exports.Handler = Handler;
    	  exports.Icon = Icon;
    	  exports.ImageOverlay = ImageOverlay;
    	  exports.LatLng = LatLng;
    	  exports.LatLngBounds = LatLngBounds;
    	  exports.Layer = Layer;
    	  exports.LayerGroup = LayerGroup;
    	  exports.LineUtil = LineUtil;
    	  exports.Map = Map;
    	  exports.Marker = Marker;
    	  exports.Mixin = Mixin;
    	  exports.Path = Path;
    	  exports.Point = Point;
    	  exports.PolyUtil = PolyUtil;
    	  exports.Polygon = Polygon;
    	  exports.Polyline = Polyline;
    	  exports.Popup = Popup;
    	  exports.PosAnimation = PosAnimation;
    	  exports.Projection = index;
    	  exports.Rectangle = Rectangle;
    	  exports.Renderer = Renderer;
    	  exports.SVG = SVG;
    	  exports.SVGOverlay = SVGOverlay;
    	  exports.TileLayer = TileLayer;
    	  exports.Tooltip = Tooltip;
    	  exports.Transformation = Transformation;
    	  exports.Util = Util;
    	  exports.VideoOverlay = VideoOverlay;
    	  exports.bind = bind;
    	  exports.bounds = toBounds;
    	  exports.canvas = canvas;
    	  exports.circle = circle;
    	  exports.circleMarker = circleMarker;
    	  exports.control = control;
    	  exports.divIcon = divIcon;
    	  exports.extend = extend;
    	  exports.featureGroup = featureGroup;
    	  exports.geoJSON = geoJSON;
    	  exports.geoJson = geoJson;
    	  exports.gridLayer = gridLayer;
    	  exports.icon = icon;
    	  exports.imageOverlay = imageOverlay;
    	  exports.latLng = toLatLng;
    	  exports.latLngBounds = toLatLngBounds;
    	  exports.layerGroup = layerGroup;
    	  exports.map = createMap;
    	  exports.marker = marker;
    	  exports.point = toPoint;
    	  exports.polygon = polygon;
    	  exports.polyline = polyline;
    	  exports.popup = popup;
    	  exports.rectangle = rectangle;
    	  exports.setOptions = setOptions;
    	  exports.stamp = stamp;
    	  exports.svg = svg;
    	  exports.svgOverlay = svgOverlay;
    	  exports.tileLayer = tileLayer;
    	  exports.tooltip = tooltip;
    	  exports.transformation = toTransformation;
    	  exports.version = version;
    	  exports.videoOverlay = videoOverlay;

    	  var oldL = window.L;
    	  exports.noConflict = function() {
    	  	window.L = oldL;
    	  	return this;
    	  };
    	  // Always export us to window global (see #2364)
    	  window.L = exports;

    	}));
    	
    } (leafletSrc, leafletSrc.exports));

    var L$1 = leafletSrc.exports;

    class EventBridge {

        constructor(entity, dispatch, events = []) {
            this.entity = entity;

            this.eventHandlers = [];
            if (events) {
                const eventMap = {};
                events.forEach(event => {
                    if (!(event in eventMap)) {
                        const handler = function (e) {
                            dispatch(event, e);
                        };
                        this.eventHandlers.push({
                            event: event,
                            handler: handler,
                        });
                        entity.on(event, handler);
                        eventMap[event] = handler;
                    }
                });
            }
        }

        unregister() {
            this.eventHandlers.forEach(entry => {
                this.entity.off(entry.event, entry.handler);
            });
        }
    }

    /* src/components/LeafletMap.svelte generated by Svelte v3.52.0 */

    function create_if_block$7(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function create_fragment$a(ctx) {
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*map*/ ctx[0] && create_if_block$7(ctx);

    	return {
    		c() {
    			div = element("div");
    			if (if_block) if_block.c();
    			set_style(div, "height", "100%");
    			set_style(div, "width", "100%");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(/*initialize*/ ctx[1].call(null, div));
    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (/*map*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*map*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$7(ctx);
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
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	let { options = {} } = $$props;
    	let { events = [] } = $$props;
    	let map = null;
    	setContext(L$1, { getMap: () => map });
    	const dispatch = createEventDispatcher();
    	let eventBridge;

    	function initialize(container) {
    		$$invalidate(0, map = L$1.map(container, options));
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

    	$$self.$$set = $$props => {
    		if ('options' in $$props) $$invalidate(2, options = $$props.options);
    		if ('events' in $$props) $$invalidate(3, events = $$props.events);
    		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	return [map, initialize, options, events, getMap, $$scope, slots];
    }

    class LeafletMap extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$e, create_fragment$a, safe_not_equal, { options: 2, events: 3, getMap: 4 });
    	}

    	get getMap() {
    		return this.$$.ctx[4];
    	}
    }

    /* src/components/Circle.svelte generated by Svelte v3.52.0 */

    function create_if_block$6(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[17], null);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 131072)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[17],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[17], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function create_fragment$9(ctx) {
    	let div;
    	let current;
    	let if_block = /*circle*/ ctx[0] && create_if_block$6(ctx);

    	return {
    		c() {
    			div = element("div");
    			if (if_block) if_block.c();
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (/*circle*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*circle*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$6(ctx);
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
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block) if_block.d();
    		}
    	};
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	const { getMap } = getContext(L$1);
    	let { latLng } = $$props;
    	let { radius = 10 } = $$props;
    	let { color = '#3388ff' } = $$props;
    	let { weight = 3 } = $$props;
    	let { opacity = 1.0 } = $$props;
    	let { lineCap = 'round' } = $$props;
    	let { lineJoin = 'round' } = $$props;
    	let { dashArray = null } = $$props;
    	let { dashOffset = null } = $$props;
    	let { fill = true } = $$props;
    	let { fillColor = '#3388ff' } = $$props;
    	let { fillOpacity = 0.2 } = $$props;
    	let { fillRule = 'evenodd' } = $$props;
    	let { options = {} } = $$props;
    	let { events = [] } = $$props;
    	let circle;
    	setContext(L$1.Layer, { getLayer: () => circle });
    	const dispatch = createEventDispatcher();
    	let eventBridge;

    	onDestroy(() => {
    		eventBridge.unregister();
    		circle.removeFrom(getMap());
    	});

    	function getCircle() {
    		return circle;
    	}

    	$$self.$$set = $$props => {
    		if ('latLng' in $$props) $$invalidate(1, latLng = $$props.latLng);
    		if ('radius' in $$props) $$invalidate(2, radius = $$props.radius);
    		if ('color' in $$props) $$invalidate(3, color = $$props.color);
    		if ('weight' in $$props) $$invalidate(4, weight = $$props.weight);
    		if ('opacity' in $$props) $$invalidate(5, opacity = $$props.opacity);
    		if ('lineCap' in $$props) $$invalidate(6, lineCap = $$props.lineCap);
    		if ('lineJoin' in $$props) $$invalidate(7, lineJoin = $$props.lineJoin);
    		if ('dashArray' in $$props) $$invalidate(8, dashArray = $$props.dashArray);
    		if ('dashOffset' in $$props) $$invalidate(9, dashOffset = $$props.dashOffset);
    		if ('fill' in $$props) $$invalidate(10, fill = $$props.fill);
    		if ('fillColor' in $$props) $$invalidate(11, fillColor = $$props.fillColor);
    		if ('fillOpacity' in $$props) $$invalidate(12, fillOpacity = $$props.fillOpacity);
    		if ('fillRule' in $$props) $$invalidate(13, fillRule = $$props.fillRule);
    		if ('options' in $$props) $$invalidate(14, options = $$props.options);
    		if ('events' in $$props) $$invalidate(15, events = $$props.events);
    		if ('$$scope' in $$props) $$invalidate(17, $$scope = $$props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*circle, latLng, options, events, radius, color, weight, opacity, lineCap, lineJoin, dashArray, dashOffset, fill, fillColor, fillOpacity, fillRule*/ 65535) {
    			{
    				if (!circle) {
    					$$invalidate(0, circle = L$1.circle(latLng, options).addTo(getMap()));
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

    class Circle extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$d, create_fragment$9, safe_not_equal, {
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

    /* src/components/CircleMarker.svelte generated by Svelte v3.52.0 */

    function create_if_block$5(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[17], null);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 131072)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[17],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[17], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function create_fragment$8(ctx) {
    	let div;
    	let current;
    	let if_block = /*circleMarker*/ ctx[0] && create_if_block$5(ctx);

    	return {
    		c() {
    			div = element("div");
    			if (if_block) if_block.c();
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (/*circleMarker*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*circleMarker*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
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
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block) if_block.d();
    		}
    	};
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	const { getMap } = getContext(L$1);
    	let { latLng } = $$props;
    	let { radius = 10 } = $$props;
    	let { color = '#3388ff' } = $$props;
    	let { weight = 3 } = $$props;
    	let { opacity = 1.0 } = $$props;
    	let { lineCap = 'round' } = $$props;
    	let { lineJoin = 'round' } = $$props;
    	let { dashArray = null } = $$props;
    	let { dashOffset = null } = $$props;
    	let { fill = true } = $$props;
    	let { fillColor = '#3388ff' } = $$props;
    	let { fillOpacity = 0.2 } = $$props;
    	let { fillRule = 'evenodd' } = $$props;
    	let { options = {} } = $$props;
    	let { events = [] } = $$props;
    	let circleMarker;
    	setContext(L$1.Layer, { getLayer: () => circleMarker });
    	const dispatch = createEventDispatcher();
    	let eventBridge;

    	onDestroy(() => {
    		eventBridge.unregister();
    		circleMarker.removeFrom(getMap());
    	});

    	function getCircleMarker() {
    		return circleMarker;
    	}

    	$$self.$$set = $$props => {
    		if ('latLng' in $$props) $$invalidate(1, latLng = $$props.latLng);
    		if ('radius' in $$props) $$invalidate(2, radius = $$props.radius);
    		if ('color' in $$props) $$invalidate(3, color = $$props.color);
    		if ('weight' in $$props) $$invalidate(4, weight = $$props.weight);
    		if ('opacity' in $$props) $$invalidate(5, opacity = $$props.opacity);
    		if ('lineCap' in $$props) $$invalidate(6, lineCap = $$props.lineCap);
    		if ('lineJoin' in $$props) $$invalidate(7, lineJoin = $$props.lineJoin);
    		if ('dashArray' in $$props) $$invalidate(8, dashArray = $$props.dashArray);
    		if ('dashOffset' in $$props) $$invalidate(9, dashOffset = $$props.dashOffset);
    		if ('fill' in $$props) $$invalidate(10, fill = $$props.fill);
    		if ('fillColor' in $$props) $$invalidate(11, fillColor = $$props.fillColor);
    		if ('fillOpacity' in $$props) $$invalidate(12, fillOpacity = $$props.fillOpacity);
    		if ('fillRule' in $$props) $$invalidate(13, fillRule = $$props.fillRule);
    		if ('options' in $$props) $$invalidate(14, options = $$props.options);
    		if ('events' in $$props) $$invalidate(15, events = $$props.events);
    		if ('$$scope' in $$props) $$invalidate(17, $$scope = $$props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*circleMarker, latLng, options, events, radius, color, weight, opacity, lineCap, lineJoin, dashArray, dashOffset, fill, fillColor, fillOpacity, fillRule*/ 65535) {
    			{
    				if (!circleMarker) {
    					$$invalidate(0, circleMarker = L$1.circleMarker(latLng, options).addTo(getMap()));
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

    class CircleMarker extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$c, create_fragment$8, safe_not_equal, {
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

    function bind(fn, thisArg) {
      return function wrap() {
        return fn.apply(thisArg, arguments);
      };
    }

    // utils is a library of generic helper functions non-specific to axios

    const {toString} = Object.prototype;
    const {getPrototypeOf} = Object;

    const kindOf = (cache => thing => {
        const str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    })(Object.create(null));

    const kindOfTest = (type) => {
      type = type.toLowerCase();
      return (thing) => kindOf(thing) === type
    };

    const typeOfTest = type => thing => typeof thing === type;

    /**
     * Determine if a value is an Array
     *
     * @param {Object} val The value to test
     *
     * @returns {boolean} True if value is an Array, otherwise false
     */
    const {isArray} = Array;

    /**
     * Determine if a value is undefined
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if the value is undefined, otherwise false
     */
    const isUndefined = typeOfTest('undefined');

    /**
     * Determine if a value is a Buffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Buffer, otherwise false
     */
    function isBuffer$1(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
        && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
    }

    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */
    const isArrayBuffer = kindOfTest('ArrayBuffer');


    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */
    function isArrayBufferView(val) {
      let result;
      if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val);
      } else {
        result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
      }
      return result;
    }

    /**
     * Determine if a value is a String
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a String, otherwise false
     */
    const isString$1 = typeOfTest('string');

    /**
     * Determine if a value is a Function
     *
     * @param {*} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */
    const isFunction$1 = typeOfTest('function');

    /**
     * Determine if a value is a Number
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Number, otherwise false
     */
    const isNumber = typeOfTest('number');

    /**
     * Determine if a value is an Object
     *
     * @param {*} thing The value to test
     *
     * @returns {boolean} True if value is an Object, otherwise false
     */
    const isObject = (thing) => thing !== null && typeof thing === 'object';

    /**
     * Determine if a value is a Boolean
     *
     * @param {*} thing The value to test
     * @returns {boolean} True if value is a Boolean, otherwise false
     */
    const isBoolean = thing => thing === true || thing === false;

    /**
     * Determine if a value is a plain Object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a plain Object, otherwise false
     */
    const isPlainObject = (val) => {
      if (kindOf(val) !== 'object') {
        return false;
      }

      const prototype = getPrototypeOf(val);
      return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
    };

    /**
     * Determine if a value is a Date
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Date, otherwise false
     */
    const isDate = kindOfTest('Date');

    /**
     * Determine if a value is a File
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a File, otherwise false
     */
    const isFile = kindOfTest('File');

    /**
     * Determine if a value is a Blob
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Blob, otherwise false
     */
    const isBlob = kindOfTest('Blob');

    /**
     * Determine if a value is a FileList
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a File, otherwise false
     */
    const isFileList = kindOfTest('FileList');

    /**
     * Determine if a value is a Stream
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Stream, otherwise false
     */
    const isStream = (val) => isObject(val) && isFunction$1(val.pipe);

    /**
     * Determine if a value is a FormData
     *
     * @param {*} thing The value to test
     *
     * @returns {boolean} True if value is an FormData, otherwise false
     */
    const isFormData = (thing) => {
      const pattern = '[object FormData]';
      return thing && (
        (typeof FormData === 'function' && thing instanceof FormData) ||
        toString.call(thing) === pattern ||
        (isFunction$1(thing.toString) && thing.toString() === pattern)
      );
    };

    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */
    const isURLSearchParams = kindOfTest('URLSearchParams');

    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     *
     * @returns {String} The String freed of excess whitespace
     */
    const trim = (str) => str.trim ?
      str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

    /**
     * Iterate over an Array or an Object invoking a function for each item.
     *
     * If `obj` is an Array callback will be called passing
     * the value, index, and complete array for each item.
     *
     * If 'obj' is an Object callback will be called passing
     * the value, key, and complete object for each property.
     *
     * @param {Object|Array} obj The object to iterate
     * @param {Function} fn The callback to invoke for each item
     *
     * @param {Boolean} [allOwnKeys = false]
     * @returns {void}
     */
    function forEach(obj, fn, {allOwnKeys = false} = {}) {
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
        return;
      }

      let i;
      let l;

      // Force an array if not already something iterable
      if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }

      if (isArray(obj)) {
        // Iterate over array values
        for (i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Iterate over object keys
        const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        const len = keys.length;
        let key;

        for (i = 0; i < len; i++) {
          key = keys[i];
          fn.call(null, obj[key], key, obj);
        }
      }
    }

    /**
     * Accepts varargs expecting each argument to be an object, then
     * immutably merges the properties of each object and returns result.
     *
     * When multiple objects contain the same key the later object in
     * the arguments list will take precedence.
     *
     * Example:
     *
     * ```js
     * var result = merge({foo: 123}, {foo: 456});
     * console.log(result.foo); // outputs 456
     * ```
     *
     * @param {Object} obj1 Object to merge
     *
     * @returns {Object} Result of all merge properties
     */
    function merge(/* obj1, obj2, obj3, ... */) {
      const result = {};
      const assignValue = (val, key) => {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      };

      for (let i = 0, l = arguments.length; i < l; i++) {
        arguments[i] && forEach(arguments[i], assignValue);
      }
      return result;
    }

    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     *
     * @param {Boolean} [allOwnKeys]
     * @returns {Object} The resulting value of object a
     */
    const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
      forEach(b, (val, key) => {
        if (thisArg && isFunction$1(val)) {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      }, {allOwnKeys});
      return a;
    };

    /**
     * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
     *
     * @param {string} content with BOM
     *
     * @returns {string} content value without BOM
     */
    const stripBOM = (content) => {
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }
      return content;
    };

    /**
     * Inherit the prototype methods from one constructor into another
     * @param {function} constructor
     * @param {function} superConstructor
     * @param {object} [props]
     * @param {object} [descriptors]
     *
     * @returns {void}
     */
    const inherits = (constructor, superConstructor, props, descriptors) => {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      Object.defineProperty(constructor, 'super', {
        value: superConstructor.prototype
      });
      props && Object.assign(constructor.prototype, props);
    };

    /**
     * Resolve object with deep prototype chain to a flat object
     * @param {Object} sourceObj source object
     * @param {Object} [destObj]
     * @param {Function|Boolean} [filter]
     * @param {Function} [propFilter]
     *
     * @returns {Object}
     */
    const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
      let props;
      let i;
      let prop;
      const merged = {};

      destObj = destObj || {};
      // eslint-disable-next-line no-eq-null,eqeqeq
      if (sourceObj == null) return destObj;

      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
          prop = props[i];
          if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = filter !== false && getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

      return destObj;
    };

    /**
     * Determines whether a string ends with the characters of a specified string
     *
     * @param {String} str
     * @param {String} searchString
     * @param {Number} [position= 0]
     *
     * @returns {boolean}
     */
    const endsWith = (str, searchString, position) => {
      str = String(str);
      if (position === undefined || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      const lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };


    /**
     * Returns new array from array like object or null if failed
     *
     * @param {*} [thing]
     *
     * @returns {?Array}
     */
    const toArray = (thing) => {
      if (!thing) return null;
      if (isArray(thing)) return thing;
      let i = thing.length;
      if (!isNumber(i)) return null;
      const arr = new Array(i);
      while (i-- > 0) {
        arr[i] = thing[i];
      }
      return arr;
    };

    /**
     * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
     * thing passed in is an instance of Uint8Array
     *
     * @param {TypedArray}
     *
     * @returns {Array}
     */
    // eslint-disable-next-line func-names
    const isTypedArray = (TypedArray => {
      // eslint-disable-next-line func-names
      return thing => {
        return TypedArray && thing instanceof TypedArray;
      };
    })(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

    /**
     * For each entry in the object, call the function with the key and value.
     *
     * @param {Object<any, any>} obj - The object to iterate over.
     * @param {Function} fn - The function to call for each entry.
     *
     * @returns {void}
     */
    const forEachEntry = (obj, fn) => {
      const generator = obj && obj[Symbol.iterator];

      const iterator = generator.call(obj);

      let result;

      while ((result = iterator.next()) && !result.done) {
        const pair = result.value;
        fn.call(obj, pair[0], pair[1]);
      }
    };

    /**
     * It takes a regular expression and a string, and returns an array of all the matches
     *
     * @param {string} regExp - The regular expression to match against.
     * @param {string} str - The string to search.
     *
     * @returns {Array<boolean>}
     */
    const matchAll = (regExp, str) => {
      let matches;
      const arr = [];

      while ((matches = regExp.exec(str)) !== null) {
        arr.push(matches);
      }

      return arr;
    };

    /* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
    const isHTMLForm = kindOfTest('HTMLFormElement');

    const toCamelCase = str => {
      return str.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,
        function replacer(m, p1, p2) {
          return p1.toUpperCase() + p2;
        }
      );
    };

    /* Creating a function that will check if an object has a property. */
    const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

    /**
     * Determine if a value is a RegExp object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a RegExp object, otherwise false
     */
    const isRegExp = kindOfTest('RegExp');

    const reduceDescriptors = (obj, reducer) => {
      const descriptors = Object.getOwnPropertyDescriptors(obj);
      const reducedDescriptors = {};

      forEach(descriptors, (descriptor, name) => {
        if (reducer(descriptor, name, obj) !== false) {
          reducedDescriptors[name] = descriptor;
        }
      });

      Object.defineProperties(obj, reducedDescriptors);
    };

    /**
     * Makes all methods read-only
     * @param {Object} obj
     */

    const freezeMethods = (obj) => {
      reduceDescriptors(obj, (descriptor, name) => {
        const value = obj[name];

        if (!isFunction$1(value)) return;

        descriptor.enumerable = false;

        if ('writable' in descriptor) {
          descriptor.writable = false;
          return;
        }

        if (!descriptor.set) {
          descriptor.set = () => {
            throw Error('Can not read-only method \'' + name + '\'');
          };
        }
      });
    };

    const toObjectSet = (arrayOrString, delimiter) => {
      const obj = {};

      const define = (arr) => {
        arr.forEach(value => {
          obj[value] = true;
        });
      };

      isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

      return obj;
    };

    const noop$1 = () => {};

    const toFiniteNumber = (value, defaultValue) => {
      value = +value;
      return Number.isFinite(value) ? value : defaultValue;
    };

    var utils = {
      isArray,
      isArrayBuffer,
      isBuffer: isBuffer$1,
      isFormData,
      isArrayBufferView,
      isString: isString$1,
      isNumber,
      isBoolean,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isRegExp,
      isFunction: isFunction$1,
      isStream,
      isURLSearchParams,
      isTypedArray,
      isFileList,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      forEachEntry,
      matchAll,
      isHTMLForm,
      hasOwnProperty,
      hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
      reduceDescriptors,
      freezeMethods,
      toObjectSet,
      toCamelCase,
      noop: noop$1,
      toFiniteNumber
    };

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [config] The config.
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     *
     * @returns {Error} The created error.
     */
    function AxiosError(message, code, config, request, response) {
      Error.call(this);

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = (new Error()).stack;
      }

      this.message = message;
      this.name = 'AxiosError';
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }

    utils.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });

    const prototype$1 = AxiosError.prototype;
    const descriptors = {};

    [
      'ERR_BAD_OPTION_VALUE',
      'ERR_BAD_OPTION',
      'ECONNABORTED',
      'ETIMEDOUT',
      'ERR_NETWORK',
      'ERR_FR_TOO_MANY_REDIRECTS',
      'ERR_DEPRECATED',
      'ERR_BAD_RESPONSE',
      'ERR_BAD_REQUEST',
      'ERR_CANCELED',
      'ERR_NOT_SUPPORT',
      'ERR_INVALID_URL'
    // eslint-disable-next-line func-names
    ].forEach(code => {
      descriptors[code] = {value: code};
    });

    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

    // eslint-disable-next-line func-names
    AxiosError.from = (error, code, config, request, response, customProps) => {
      const axiosError = Object.create(prototype$1);

      utils.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      }, prop => {
        return prop !== 'isAxiosError';
      });

      AxiosError.call(axiosError, error.message, code, config, request, response);

      axiosError.cause = error;

      axiosError.name = error.name;

      customProps && Object.assign(axiosError, customProps);

      return axiosError;
    };

    var Stream$2 = stream__default["default"].Stream;
    var util$2 = require$$1__default["default"];

    var delayed_stream = DelayedStream$1;
    function DelayedStream$1() {
      this.source = null;
      this.dataSize = 0;
      this.maxDataSize = 1024 * 1024;
      this.pauseStream = true;

      this._maxDataSizeExceeded = false;
      this._released = false;
      this._bufferedEvents = [];
    }
    util$2.inherits(DelayedStream$1, Stream$2);

    DelayedStream$1.create = function(source, options) {
      var delayedStream = new this();

      options = options || {};
      for (var option in options) {
        delayedStream[option] = options[option];
      }

      delayedStream.source = source;

      var realEmit = source.emit;
      source.emit = function() {
        delayedStream._handleEmit(arguments);
        return realEmit.apply(source, arguments);
      };

      source.on('error', function() {});
      if (delayedStream.pauseStream) {
        source.pause();
      }

      return delayedStream;
    };

    Object.defineProperty(DelayedStream$1.prototype, 'readable', {
      configurable: true,
      enumerable: true,
      get: function() {
        return this.source.readable;
      }
    });

    DelayedStream$1.prototype.setEncoding = function() {
      return this.source.setEncoding.apply(this.source, arguments);
    };

    DelayedStream$1.prototype.resume = function() {
      if (!this._released) {
        this.release();
      }

      this.source.resume();
    };

    DelayedStream$1.prototype.pause = function() {
      this.source.pause();
    };

    DelayedStream$1.prototype.release = function() {
      this._released = true;

      this._bufferedEvents.forEach(function(args) {
        this.emit.apply(this, args);
      }.bind(this));
      this._bufferedEvents = [];
    };

    DelayedStream$1.prototype.pipe = function() {
      var r = Stream$2.prototype.pipe.apply(this, arguments);
      this.resume();
      return r;
    };

    DelayedStream$1.prototype._handleEmit = function(args) {
      if (this._released) {
        this.emit.apply(this, args);
        return;
      }

      if (args[0] === 'data') {
        this.dataSize += args[1].length;
        this._checkIfMaxDataSizeExceeded();
      }

      this._bufferedEvents.push(args);
    };

    DelayedStream$1.prototype._checkIfMaxDataSizeExceeded = function() {
      if (this._maxDataSizeExceeded) {
        return;
      }

      if (this.dataSize <= this.maxDataSize) {
        return;
      }

      this._maxDataSizeExceeded = true;
      var message =
        'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
      this.emit('error', new Error(message));
    };

    var util$1 = require$$1__default["default"];
    var Stream$1 = stream__default["default"].Stream;
    var DelayedStream = delayed_stream;

    var combined_stream = CombinedStream$1;
    function CombinedStream$1() {
      this.writable = false;
      this.readable = true;
      this.dataSize = 0;
      this.maxDataSize = 2 * 1024 * 1024;
      this.pauseStreams = true;

      this._released = false;
      this._streams = [];
      this._currentStream = null;
      this._insideLoop = false;
      this._pendingNext = false;
    }
    util$1.inherits(CombinedStream$1, Stream$1);

    CombinedStream$1.create = function(options) {
      var combinedStream = new this();

      options = options || {};
      for (var option in options) {
        combinedStream[option] = options[option];
      }

      return combinedStream;
    };

    CombinedStream$1.isStreamLike = function(stream) {
      return (typeof stream !== 'function')
        && (typeof stream !== 'string')
        && (typeof stream !== 'boolean')
        && (typeof stream !== 'number')
        && (!Buffer.isBuffer(stream));
    };

    CombinedStream$1.prototype.append = function(stream) {
      var isStreamLike = CombinedStream$1.isStreamLike(stream);

      if (isStreamLike) {
        if (!(stream instanceof DelayedStream)) {
          var newStream = DelayedStream.create(stream, {
            maxDataSize: Infinity,
            pauseStream: this.pauseStreams,
          });
          stream.on('data', this._checkDataSize.bind(this));
          stream = newStream;
        }

        this._handleErrors(stream);

        if (this.pauseStreams) {
          stream.pause();
        }
      }

      this._streams.push(stream);
      return this;
    };

    CombinedStream$1.prototype.pipe = function(dest, options) {
      Stream$1.prototype.pipe.call(this, dest, options);
      this.resume();
      return dest;
    };

    CombinedStream$1.prototype._getNext = function() {
      this._currentStream = null;

      if (this._insideLoop) {
        this._pendingNext = true;
        return; // defer call
      }

      this._insideLoop = true;
      try {
        do {
          this._pendingNext = false;
          this._realGetNext();
        } while (this._pendingNext);
      } finally {
        this._insideLoop = false;
      }
    };

    CombinedStream$1.prototype._realGetNext = function() {
      var stream = this._streams.shift();


      if (typeof stream == 'undefined') {
        this.end();
        return;
      }

      if (typeof stream !== 'function') {
        this._pipeNext(stream);
        return;
      }

      var getStream = stream;
      getStream(function(stream) {
        var isStreamLike = CombinedStream$1.isStreamLike(stream);
        if (isStreamLike) {
          stream.on('data', this._checkDataSize.bind(this));
          this._handleErrors(stream);
        }

        this._pipeNext(stream);
      }.bind(this));
    };

    CombinedStream$1.prototype._pipeNext = function(stream) {
      this._currentStream = stream;

      var isStreamLike = CombinedStream$1.isStreamLike(stream);
      if (isStreamLike) {
        stream.on('end', this._getNext.bind(this));
        stream.pipe(this, {end: false});
        return;
      }

      var value = stream;
      this.write(value);
      this._getNext();
    };

    CombinedStream$1.prototype._handleErrors = function(stream) {
      var self = this;
      stream.on('error', function(err) {
        self._emitError(err);
      });
    };

    CombinedStream$1.prototype.write = function(data) {
      this.emit('data', data);
    };

    CombinedStream$1.prototype.pause = function() {
      if (!this.pauseStreams) {
        return;
      }

      if(this.pauseStreams && this._currentStream && typeof(this._currentStream.pause) == 'function') this._currentStream.pause();
      this.emit('pause');
    };

    CombinedStream$1.prototype.resume = function() {
      if (!this._released) {
        this._released = true;
        this.writable = true;
        this._getNext();
      }

      if(this.pauseStreams && this._currentStream && typeof(this._currentStream.resume) == 'function') this._currentStream.resume();
      this.emit('resume');
    };

    CombinedStream$1.prototype.end = function() {
      this._reset();
      this.emit('end');
    };

    CombinedStream$1.prototype.destroy = function() {
      this._reset();
      this.emit('close');
    };

    CombinedStream$1.prototype._reset = function() {
      this.writable = false;
      this._streams = [];
      this._currentStream = null;
    };

    CombinedStream$1.prototype._checkDataSize = function() {
      this._updateDataSize();
      if (this.dataSize <= this.maxDataSize) {
        return;
      }

      var message =
        'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
      this._emitError(new Error(message));
    };

    CombinedStream$1.prototype._updateDataSize = function() {
      this.dataSize = 0;

      var self = this;
      this._streams.forEach(function(stream) {
        if (!stream.dataSize) {
          return;
        }

        self.dataSize += stream.dataSize;
      });

      if (this._currentStream && this._currentStream.dataSize) {
        this.dataSize += this._currentStream.dataSize;
      }
    };

    CombinedStream$1.prototype._emitError = function(err) {
      this._reset();
      this.emit('error', err);
    };

    var mimeTypes = {};

    var mimeDb = {exports: {}};

    var require$$0 = {
    	"application/1d-interleaved-parityfec": {
    	source: "iana"
    },
    	"application/3gpdash-qoe-report+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/3gpp-ims+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/3gpphal+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/3gpphalforms+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/a2l": {
    	source: "iana"
    },
    	"application/ace+cbor": {
    	source: "iana"
    },
    	"application/activemessage": {
    	source: "iana"
    },
    	"application/activity+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/alto-costmap+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/alto-costmapfilter+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/alto-directory+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/alto-endpointcost+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/alto-endpointcostparams+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/alto-endpointprop+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/alto-endpointpropparams+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/alto-error+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/alto-networkmap+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/alto-networkmapfilter+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/alto-updatestreamcontrol+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/alto-updatestreamparams+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/aml": {
    	source: "iana"
    },
    	"application/andrew-inset": {
    	source: "iana",
    	extensions: [
    		"ez"
    	]
    },
    	"application/applefile": {
    	source: "iana"
    },
    	"application/applixware": {
    	source: "apache",
    	extensions: [
    		"aw"
    	]
    },
    	"application/at+jwt": {
    	source: "iana"
    },
    	"application/atf": {
    	source: "iana"
    },
    	"application/atfx": {
    	source: "iana"
    },
    	"application/atom+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"atom"
    	]
    },
    	"application/atomcat+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"atomcat"
    	]
    },
    	"application/atomdeleted+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"atomdeleted"
    	]
    },
    	"application/atomicmail": {
    	source: "iana"
    },
    	"application/atomsvc+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"atomsvc"
    	]
    },
    	"application/atsc-dwd+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"dwd"
    	]
    },
    	"application/atsc-dynamic-event-message": {
    	source: "iana"
    },
    	"application/atsc-held+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"held"
    	]
    },
    	"application/atsc-rdt+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/atsc-rsat+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"rsat"
    	]
    },
    	"application/atxml": {
    	source: "iana"
    },
    	"application/auth-policy+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/bacnet-xdd+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/batch-smtp": {
    	source: "iana"
    },
    	"application/bdoc": {
    	compressible: false,
    	extensions: [
    		"bdoc"
    	]
    },
    	"application/beep+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/calendar+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/calendar+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xcs"
    	]
    },
    	"application/call-completion": {
    	source: "iana"
    },
    	"application/cals-1840": {
    	source: "iana"
    },
    	"application/captive+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/cbor": {
    	source: "iana"
    },
    	"application/cbor-seq": {
    	source: "iana"
    },
    	"application/cccex": {
    	source: "iana"
    },
    	"application/ccmp+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/ccxml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"ccxml"
    	]
    },
    	"application/cdfx+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"cdfx"
    	]
    },
    	"application/cdmi-capability": {
    	source: "iana",
    	extensions: [
    		"cdmia"
    	]
    },
    	"application/cdmi-container": {
    	source: "iana",
    	extensions: [
    		"cdmic"
    	]
    },
    	"application/cdmi-domain": {
    	source: "iana",
    	extensions: [
    		"cdmid"
    	]
    },
    	"application/cdmi-object": {
    	source: "iana",
    	extensions: [
    		"cdmio"
    	]
    },
    	"application/cdmi-queue": {
    	source: "iana",
    	extensions: [
    		"cdmiq"
    	]
    },
    	"application/cdni": {
    	source: "iana"
    },
    	"application/cea": {
    	source: "iana"
    },
    	"application/cea-2018+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/cellml+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/cfw": {
    	source: "iana"
    },
    	"application/city+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/clr": {
    	source: "iana"
    },
    	"application/clue+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/clue_info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/cms": {
    	source: "iana"
    },
    	"application/cnrp+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/coap-group+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/coap-payload": {
    	source: "iana"
    },
    	"application/commonground": {
    	source: "iana"
    },
    	"application/conference-info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/cose": {
    	source: "iana"
    },
    	"application/cose-key": {
    	source: "iana"
    },
    	"application/cose-key-set": {
    	source: "iana"
    },
    	"application/cpl+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"cpl"
    	]
    },
    	"application/csrattrs": {
    	source: "iana"
    },
    	"application/csta+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/cstadata+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/csvm+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/cu-seeme": {
    	source: "apache",
    	extensions: [
    		"cu"
    	]
    },
    	"application/cwt": {
    	source: "iana"
    },
    	"application/cybercash": {
    	source: "iana"
    },
    	"application/dart": {
    	compressible: true
    },
    	"application/dash+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"mpd"
    	]
    },
    	"application/dash-patch+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"mpp"
    	]
    },
    	"application/dashdelta": {
    	source: "iana"
    },
    	"application/davmount+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"davmount"
    	]
    },
    	"application/dca-rft": {
    	source: "iana"
    },
    	"application/dcd": {
    	source: "iana"
    },
    	"application/dec-dx": {
    	source: "iana"
    },
    	"application/dialog-info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/dicom": {
    	source: "iana"
    },
    	"application/dicom+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/dicom+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/dii": {
    	source: "iana"
    },
    	"application/dit": {
    	source: "iana"
    },
    	"application/dns": {
    	source: "iana"
    },
    	"application/dns+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/dns-message": {
    	source: "iana"
    },
    	"application/docbook+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"dbk"
    	]
    },
    	"application/dots+cbor": {
    	source: "iana"
    },
    	"application/dskpp+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/dssc+der": {
    	source: "iana",
    	extensions: [
    		"dssc"
    	]
    },
    	"application/dssc+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xdssc"
    	]
    },
    	"application/dvcs": {
    	source: "iana"
    },
    	"application/ecmascript": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"es",
    		"ecma"
    	]
    },
    	"application/edi-consent": {
    	source: "iana"
    },
    	"application/edi-x12": {
    	source: "iana",
    	compressible: false
    },
    	"application/edifact": {
    	source: "iana",
    	compressible: false
    },
    	"application/efi": {
    	source: "iana"
    },
    	"application/elm+json": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/elm+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/emergencycalldata.cap+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/emergencycalldata.comment+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/emergencycalldata.control+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/emergencycalldata.deviceinfo+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/emergencycalldata.ecall.msd": {
    	source: "iana"
    },
    	"application/emergencycalldata.providerinfo+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/emergencycalldata.serviceinfo+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/emergencycalldata.subscriberinfo+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/emergencycalldata.veds+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/emma+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"emma"
    	]
    },
    	"application/emotionml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"emotionml"
    	]
    },
    	"application/encaprtp": {
    	source: "iana"
    },
    	"application/epp+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/epub+zip": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"epub"
    	]
    },
    	"application/eshop": {
    	source: "iana"
    },
    	"application/exi": {
    	source: "iana",
    	extensions: [
    		"exi"
    	]
    },
    	"application/expect-ct-report+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/express": {
    	source: "iana",
    	extensions: [
    		"exp"
    	]
    },
    	"application/fastinfoset": {
    	source: "iana"
    },
    	"application/fastsoap": {
    	source: "iana"
    },
    	"application/fdt+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"fdt"
    	]
    },
    	"application/fhir+json": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/fhir+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/fido.trusted-apps+json": {
    	compressible: true
    },
    	"application/fits": {
    	source: "iana"
    },
    	"application/flexfec": {
    	source: "iana"
    },
    	"application/font-sfnt": {
    	source: "iana"
    },
    	"application/font-tdpfr": {
    	source: "iana",
    	extensions: [
    		"pfr"
    	]
    },
    	"application/font-woff": {
    	source: "iana",
    	compressible: false
    },
    	"application/framework-attributes+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/geo+json": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"geojson"
    	]
    },
    	"application/geo+json-seq": {
    	source: "iana"
    },
    	"application/geopackage+sqlite3": {
    	source: "iana"
    },
    	"application/geoxacml+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/gltf-buffer": {
    	source: "iana"
    },
    	"application/gml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"gml"
    	]
    },
    	"application/gpx+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"gpx"
    	]
    },
    	"application/gxf": {
    	source: "apache",
    	extensions: [
    		"gxf"
    	]
    },
    	"application/gzip": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"gz"
    	]
    },
    	"application/h224": {
    	source: "iana"
    },
    	"application/held+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/hjson": {
    	extensions: [
    		"hjson"
    	]
    },
    	"application/http": {
    	source: "iana"
    },
    	"application/hyperstudio": {
    	source: "iana",
    	extensions: [
    		"stk"
    	]
    },
    	"application/ibe-key-request+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/ibe-pkg-reply+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/ibe-pp-data": {
    	source: "iana"
    },
    	"application/iges": {
    	source: "iana"
    },
    	"application/im-iscomposing+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/index": {
    	source: "iana"
    },
    	"application/index.cmd": {
    	source: "iana"
    },
    	"application/index.obj": {
    	source: "iana"
    },
    	"application/index.response": {
    	source: "iana"
    },
    	"application/index.vnd": {
    	source: "iana"
    },
    	"application/inkml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"ink",
    		"inkml"
    	]
    },
    	"application/iotp": {
    	source: "iana"
    },
    	"application/ipfix": {
    	source: "iana",
    	extensions: [
    		"ipfix"
    	]
    },
    	"application/ipp": {
    	source: "iana"
    },
    	"application/isup": {
    	source: "iana"
    },
    	"application/its+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"its"
    	]
    },
    	"application/java-archive": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"jar",
    		"war",
    		"ear"
    	]
    },
    	"application/java-serialized-object": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"ser"
    	]
    },
    	"application/java-vm": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"class"
    	]
    },
    	"application/javascript": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true,
    	extensions: [
    		"js",
    		"mjs"
    	]
    },
    	"application/jf2feed+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/jose": {
    	source: "iana"
    },
    	"application/jose+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/jrd+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/jscalendar+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/json": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true,
    	extensions: [
    		"json",
    		"map"
    	]
    },
    	"application/json-patch+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/json-seq": {
    	source: "iana"
    },
    	"application/json5": {
    	extensions: [
    		"json5"
    	]
    },
    	"application/jsonml+json": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"jsonml"
    	]
    },
    	"application/jwk+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/jwk-set+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/jwt": {
    	source: "iana"
    },
    	"application/kpml-request+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/kpml-response+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/ld+json": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"jsonld"
    	]
    },
    	"application/lgr+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"lgr"
    	]
    },
    	"application/link-format": {
    	source: "iana"
    },
    	"application/load-control+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/lost+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"lostxml"
    	]
    },
    	"application/lostsync+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/lpf+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/lxf": {
    	source: "iana"
    },
    	"application/mac-binhex40": {
    	source: "iana",
    	extensions: [
    		"hqx"
    	]
    },
    	"application/mac-compactpro": {
    	source: "apache",
    	extensions: [
    		"cpt"
    	]
    },
    	"application/macwriteii": {
    	source: "iana"
    },
    	"application/mads+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"mads"
    	]
    },
    	"application/manifest+json": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true,
    	extensions: [
    		"webmanifest"
    	]
    },
    	"application/marc": {
    	source: "iana",
    	extensions: [
    		"mrc"
    	]
    },
    	"application/marcxml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"mrcx"
    	]
    },
    	"application/mathematica": {
    	source: "iana",
    	extensions: [
    		"ma",
    		"nb",
    		"mb"
    	]
    },
    	"application/mathml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"mathml"
    	]
    },
    	"application/mathml-content+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mathml-presentation+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mbms-associated-procedure-description+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mbms-deregister+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mbms-envelope+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mbms-msk+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mbms-msk-response+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mbms-protection-description+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mbms-reception-report+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mbms-register+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mbms-register-response+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mbms-schedule+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mbms-user-service-description+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mbox": {
    	source: "iana",
    	extensions: [
    		"mbox"
    	]
    },
    	"application/media-policy-dataset+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"mpf"
    	]
    },
    	"application/media_control+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mediaservercontrol+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"mscml"
    	]
    },
    	"application/merge-patch+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/metalink+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"metalink"
    	]
    },
    	"application/metalink4+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"meta4"
    	]
    },
    	"application/mets+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"mets"
    	]
    },
    	"application/mf4": {
    	source: "iana"
    },
    	"application/mikey": {
    	source: "iana"
    },
    	"application/mipc": {
    	source: "iana"
    },
    	"application/missing-blocks+cbor-seq": {
    	source: "iana"
    },
    	"application/mmt-aei+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"maei"
    	]
    },
    	"application/mmt-usd+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"musd"
    	]
    },
    	"application/mods+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"mods"
    	]
    },
    	"application/moss-keys": {
    	source: "iana"
    },
    	"application/moss-signature": {
    	source: "iana"
    },
    	"application/mosskey-data": {
    	source: "iana"
    },
    	"application/mosskey-request": {
    	source: "iana"
    },
    	"application/mp21": {
    	source: "iana",
    	extensions: [
    		"m21",
    		"mp21"
    	]
    },
    	"application/mp4": {
    	source: "iana",
    	extensions: [
    		"mp4s",
    		"m4p"
    	]
    },
    	"application/mpeg4-generic": {
    	source: "iana"
    },
    	"application/mpeg4-iod": {
    	source: "iana"
    },
    	"application/mpeg4-iod-xmt": {
    	source: "iana"
    },
    	"application/mrb-consumer+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/mrb-publish+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/msc-ivr+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/msc-mixer+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/msword": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"doc",
    		"dot"
    	]
    },
    	"application/mud+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/multipart-core": {
    	source: "iana"
    },
    	"application/mxf": {
    	source: "iana",
    	extensions: [
    		"mxf"
    	]
    },
    	"application/n-quads": {
    	source: "iana",
    	extensions: [
    		"nq"
    	]
    },
    	"application/n-triples": {
    	source: "iana",
    	extensions: [
    		"nt"
    	]
    },
    	"application/nasdata": {
    	source: "iana"
    },
    	"application/news-checkgroups": {
    	source: "iana",
    	charset: "US-ASCII"
    },
    	"application/news-groupinfo": {
    	source: "iana",
    	charset: "US-ASCII"
    },
    	"application/news-transmission": {
    	source: "iana"
    },
    	"application/nlsml+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/node": {
    	source: "iana",
    	extensions: [
    		"cjs"
    	]
    },
    	"application/nss": {
    	source: "iana"
    },
    	"application/oauth-authz-req+jwt": {
    	source: "iana"
    },
    	"application/oblivious-dns-message": {
    	source: "iana"
    },
    	"application/ocsp-request": {
    	source: "iana"
    },
    	"application/ocsp-response": {
    	source: "iana"
    },
    	"application/octet-stream": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"bin",
    		"dms",
    		"lrf",
    		"mar",
    		"so",
    		"dist",
    		"distz",
    		"pkg",
    		"bpk",
    		"dump",
    		"elc",
    		"deploy",
    		"exe",
    		"dll",
    		"deb",
    		"dmg",
    		"iso",
    		"img",
    		"msi",
    		"msp",
    		"msm",
    		"buffer"
    	]
    },
    	"application/oda": {
    	source: "iana",
    	extensions: [
    		"oda"
    	]
    },
    	"application/odm+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/odx": {
    	source: "iana"
    },
    	"application/oebps-package+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"opf"
    	]
    },
    	"application/ogg": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"ogx"
    	]
    },
    	"application/omdoc+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"omdoc"
    	]
    },
    	"application/onenote": {
    	source: "apache",
    	extensions: [
    		"onetoc",
    		"onetoc2",
    		"onetmp",
    		"onepkg"
    	]
    },
    	"application/opc-nodeset+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/oscore": {
    	source: "iana"
    },
    	"application/oxps": {
    	source: "iana",
    	extensions: [
    		"oxps"
    	]
    },
    	"application/p21": {
    	source: "iana"
    },
    	"application/p21+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/p2p-overlay+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"relo"
    	]
    },
    	"application/parityfec": {
    	source: "iana"
    },
    	"application/passport": {
    	source: "iana"
    },
    	"application/patch-ops-error+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xer"
    	]
    },
    	"application/pdf": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"pdf"
    	]
    },
    	"application/pdx": {
    	source: "iana"
    },
    	"application/pem-certificate-chain": {
    	source: "iana"
    },
    	"application/pgp-encrypted": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"pgp"
    	]
    },
    	"application/pgp-keys": {
    	source: "iana",
    	extensions: [
    		"asc"
    	]
    },
    	"application/pgp-signature": {
    	source: "iana",
    	extensions: [
    		"asc",
    		"sig"
    	]
    },
    	"application/pics-rules": {
    	source: "apache",
    	extensions: [
    		"prf"
    	]
    },
    	"application/pidf+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/pidf-diff+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/pkcs10": {
    	source: "iana",
    	extensions: [
    		"p10"
    	]
    },
    	"application/pkcs12": {
    	source: "iana"
    },
    	"application/pkcs7-mime": {
    	source: "iana",
    	extensions: [
    		"p7m",
    		"p7c"
    	]
    },
    	"application/pkcs7-signature": {
    	source: "iana",
    	extensions: [
    		"p7s"
    	]
    },
    	"application/pkcs8": {
    	source: "iana",
    	extensions: [
    		"p8"
    	]
    },
    	"application/pkcs8-encrypted": {
    	source: "iana"
    },
    	"application/pkix-attr-cert": {
    	source: "iana",
    	extensions: [
    		"ac"
    	]
    },
    	"application/pkix-cert": {
    	source: "iana",
    	extensions: [
    		"cer"
    	]
    },
    	"application/pkix-crl": {
    	source: "iana",
    	extensions: [
    		"crl"
    	]
    },
    	"application/pkix-pkipath": {
    	source: "iana",
    	extensions: [
    		"pkipath"
    	]
    },
    	"application/pkixcmp": {
    	source: "iana",
    	extensions: [
    		"pki"
    	]
    },
    	"application/pls+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"pls"
    	]
    },
    	"application/poc-settings+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/postscript": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"ai",
    		"eps",
    		"ps"
    	]
    },
    	"application/ppsp-tracker+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/problem+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/problem+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/provenance+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"provx"
    	]
    },
    	"application/prs.alvestrand.titrax-sheet": {
    	source: "iana"
    },
    	"application/prs.cww": {
    	source: "iana",
    	extensions: [
    		"cww"
    	]
    },
    	"application/prs.cyn": {
    	source: "iana",
    	charset: "7-BIT"
    },
    	"application/prs.hpub+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/prs.nprend": {
    	source: "iana"
    },
    	"application/prs.plucker": {
    	source: "iana"
    },
    	"application/prs.rdf-xml-crypt": {
    	source: "iana"
    },
    	"application/prs.xsf+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/pskc+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"pskcxml"
    	]
    },
    	"application/pvd+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/qsig": {
    	source: "iana"
    },
    	"application/raml+yaml": {
    	compressible: true,
    	extensions: [
    		"raml"
    	]
    },
    	"application/raptorfec": {
    	source: "iana"
    },
    	"application/rdap+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/rdf+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"rdf",
    		"owl"
    	]
    },
    	"application/reginfo+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"rif"
    	]
    },
    	"application/relax-ng-compact-syntax": {
    	source: "iana",
    	extensions: [
    		"rnc"
    	]
    },
    	"application/remote-printing": {
    	source: "iana"
    },
    	"application/reputon+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/resource-lists+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"rl"
    	]
    },
    	"application/resource-lists-diff+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"rld"
    	]
    },
    	"application/rfc+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/riscos": {
    	source: "iana"
    },
    	"application/rlmi+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/rls-services+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"rs"
    	]
    },
    	"application/route-apd+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"rapd"
    	]
    },
    	"application/route-s-tsid+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"sls"
    	]
    },
    	"application/route-usd+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"rusd"
    	]
    },
    	"application/rpki-ghostbusters": {
    	source: "iana",
    	extensions: [
    		"gbr"
    	]
    },
    	"application/rpki-manifest": {
    	source: "iana",
    	extensions: [
    		"mft"
    	]
    },
    	"application/rpki-publication": {
    	source: "iana"
    },
    	"application/rpki-roa": {
    	source: "iana",
    	extensions: [
    		"roa"
    	]
    },
    	"application/rpki-updown": {
    	source: "iana"
    },
    	"application/rsd+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"rsd"
    	]
    },
    	"application/rss+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"rss"
    	]
    },
    	"application/rtf": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"rtf"
    	]
    },
    	"application/rtploopback": {
    	source: "iana"
    },
    	"application/rtx": {
    	source: "iana"
    },
    	"application/samlassertion+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/samlmetadata+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/sarif+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/sarif-external-properties+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/sbe": {
    	source: "iana"
    },
    	"application/sbml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"sbml"
    	]
    },
    	"application/scaip+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/scim+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/scvp-cv-request": {
    	source: "iana",
    	extensions: [
    		"scq"
    	]
    },
    	"application/scvp-cv-response": {
    	source: "iana",
    	extensions: [
    		"scs"
    	]
    },
    	"application/scvp-vp-request": {
    	source: "iana",
    	extensions: [
    		"spq"
    	]
    },
    	"application/scvp-vp-response": {
    	source: "iana",
    	extensions: [
    		"spp"
    	]
    },
    	"application/sdp": {
    	source: "iana",
    	extensions: [
    		"sdp"
    	]
    },
    	"application/secevent+jwt": {
    	source: "iana"
    },
    	"application/senml+cbor": {
    	source: "iana"
    },
    	"application/senml+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/senml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"senmlx"
    	]
    },
    	"application/senml-etch+cbor": {
    	source: "iana"
    },
    	"application/senml-etch+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/senml-exi": {
    	source: "iana"
    },
    	"application/sensml+cbor": {
    	source: "iana"
    },
    	"application/sensml+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/sensml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"sensmlx"
    	]
    },
    	"application/sensml-exi": {
    	source: "iana"
    },
    	"application/sep+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/sep-exi": {
    	source: "iana"
    },
    	"application/session-info": {
    	source: "iana"
    },
    	"application/set-payment": {
    	source: "iana"
    },
    	"application/set-payment-initiation": {
    	source: "iana",
    	extensions: [
    		"setpay"
    	]
    },
    	"application/set-registration": {
    	source: "iana"
    },
    	"application/set-registration-initiation": {
    	source: "iana",
    	extensions: [
    		"setreg"
    	]
    },
    	"application/sgml": {
    	source: "iana"
    },
    	"application/sgml-open-catalog": {
    	source: "iana"
    },
    	"application/shf+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"shf"
    	]
    },
    	"application/sieve": {
    	source: "iana",
    	extensions: [
    		"siv",
    		"sieve"
    	]
    },
    	"application/simple-filter+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/simple-message-summary": {
    	source: "iana"
    },
    	"application/simplesymbolcontainer": {
    	source: "iana"
    },
    	"application/sipc": {
    	source: "iana"
    },
    	"application/slate": {
    	source: "iana"
    },
    	"application/smil": {
    	source: "iana"
    },
    	"application/smil+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"smi",
    		"smil"
    	]
    },
    	"application/smpte336m": {
    	source: "iana"
    },
    	"application/soap+fastinfoset": {
    	source: "iana"
    },
    	"application/soap+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/sparql-query": {
    	source: "iana",
    	extensions: [
    		"rq"
    	]
    },
    	"application/sparql-results+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"srx"
    	]
    },
    	"application/spdx+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/spirits-event+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/sql": {
    	source: "iana"
    },
    	"application/srgs": {
    	source: "iana",
    	extensions: [
    		"gram"
    	]
    },
    	"application/srgs+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"grxml"
    	]
    },
    	"application/sru+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"sru"
    	]
    },
    	"application/ssdl+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"ssdl"
    	]
    },
    	"application/ssml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"ssml"
    	]
    },
    	"application/stix+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/swid+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"swidtag"
    	]
    },
    	"application/tamp-apex-update": {
    	source: "iana"
    },
    	"application/tamp-apex-update-confirm": {
    	source: "iana"
    },
    	"application/tamp-community-update": {
    	source: "iana"
    },
    	"application/tamp-community-update-confirm": {
    	source: "iana"
    },
    	"application/tamp-error": {
    	source: "iana"
    },
    	"application/tamp-sequence-adjust": {
    	source: "iana"
    },
    	"application/tamp-sequence-adjust-confirm": {
    	source: "iana"
    },
    	"application/tamp-status-query": {
    	source: "iana"
    },
    	"application/tamp-status-response": {
    	source: "iana"
    },
    	"application/tamp-update": {
    	source: "iana"
    },
    	"application/tamp-update-confirm": {
    	source: "iana"
    },
    	"application/tar": {
    	compressible: true
    },
    	"application/taxii+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/td+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/tei+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"tei",
    		"teicorpus"
    	]
    },
    	"application/tetra_isi": {
    	source: "iana"
    },
    	"application/thraud+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"tfi"
    	]
    },
    	"application/timestamp-query": {
    	source: "iana"
    },
    	"application/timestamp-reply": {
    	source: "iana"
    },
    	"application/timestamped-data": {
    	source: "iana",
    	extensions: [
    		"tsd"
    	]
    },
    	"application/tlsrpt+gzip": {
    	source: "iana"
    },
    	"application/tlsrpt+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/tnauthlist": {
    	source: "iana"
    },
    	"application/token-introspection+jwt": {
    	source: "iana"
    },
    	"application/toml": {
    	compressible: true,
    	extensions: [
    		"toml"
    	]
    },
    	"application/trickle-ice-sdpfrag": {
    	source: "iana"
    },
    	"application/trig": {
    	source: "iana",
    	extensions: [
    		"trig"
    	]
    },
    	"application/ttml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"ttml"
    	]
    },
    	"application/tve-trigger": {
    	source: "iana"
    },
    	"application/tzif": {
    	source: "iana"
    },
    	"application/tzif-leap": {
    	source: "iana"
    },
    	"application/ubjson": {
    	compressible: false,
    	extensions: [
    		"ubj"
    	]
    },
    	"application/ulpfec": {
    	source: "iana"
    },
    	"application/urc-grpsheet+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/urc-ressheet+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"rsheet"
    	]
    },
    	"application/urc-targetdesc+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"td"
    	]
    },
    	"application/urc-uisocketdesc+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vcard+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vcard+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vemmi": {
    	source: "iana"
    },
    	"application/vividence.scriptfile": {
    	source: "apache"
    },
    	"application/vnd.1000minds.decision-model+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"1km"
    	]
    },
    	"application/vnd.3gpp-prose+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp-prose-pc3ch+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp-v2x-local-service-information": {
    	source: "iana"
    },
    	"application/vnd.3gpp.5gnas": {
    	source: "iana"
    },
    	"application/vnd.3gpp.access-transfer-events+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.bsf+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.gmop+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.gtpc": {
    	source: "iana"
    },
    	"application/vnd.3gpp.interworking-data": {
    	source: "iana"
    },
    	"application/vnd.3gpp.lpp": {
    	source: "iana"
    },
    	"application/vnd.3gpp.mc-signalling-ear": {
    	source: "iana"
    },
    	"application/vnd.3gpp.mcdata-affiliation-command+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcdata-info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcdata-payload": {
    	source: "iana"
    },
    	"application/vnd.3gpp.mcdata-service-config+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcdata-signalling": {
    	source: "iana"
    },
    	"application/vnd.3gpp.mcdata-ue-config+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcdata-user-profile+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcptt-affiliation-command+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcptt-floor-request+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcptt-info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcptt-location-info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcptt-service-config+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcptt-signed+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcptt-ue-config+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcptt-ue-init-config+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcptt-user-profile+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcvideo-info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcvideo-location-info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcvideo-service-config+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcvideo-transmission-request+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcvideo-ue-config+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mcvideo-user-profile+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.mid-call+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.ngap": {
    	source: "iana"
    },
    	"application/vnd.3gpp.pfcp": {
    	source: "iana"
    },
    	"application/vnd.3gpp.pic-bw-large": {
    	source: "iana",
    	extensions: [
    		"plb"
    	]
    },
    	"application/vnd.3gpp.pic-bw-small": {
    	source: "iana",
    	extensions: [
    		"psb"
    	]
    },
    	"application/vnd.3gpp.pic-bw-var": {
    	source: "iana",
    	extensions: [
    		"pvb"
    	]
    },
    	"application/vnd.3gpp.s1ap": {
    	source: "iana"
    },
    	"application/vnd.3gpp.sms": {
    	source: "iana"
    },
    	"application/vnd.3gpp.sms+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.srvcc-ext+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.srvcc-info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.state-and-event-info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp.ussd+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp2.bcmcsinfo+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.3gpp2.sms": {
    	source: "iana"
    },
    	"application/vnd.3gpp2.tcap": {
    	source: "iana",
    	extensions: [
    		"tcap"
    	]
    },
    	"application/vnd.3lightssoftware.imagescal": {
    	source: "iana"
    },
    	"application/vnd.3m.post-it-notes": {
    	source: "iana",
    	extensions: [
    		"pwn"
    	]
    },
    	"application/vnd.accpac.simply.aso": {
    	source: "iana",
    	extensions: [
    		"aso"
    	]
    },
    	"application/vnd.accpac.simply.imp": {
    	source: "iana",
    	extensions: [
    		"imp"
    	]
    },
    	"application/vnd.acucobol": {
    	source: "iana",
    	extensions: [
    		"acu"
    	]
    },
    	"application/vnd.acucorp": {
    	source: "iana",
    	extensions: [
    		"atc",
    		"acutc"
    	]
    },
    	"application/vnd.adobe.air-application-installer-package+zip": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"air"
    	]
    },
    	"application/vnd.adobe.flash.movie": {
    	source: "iana"
    },
    	"application/vnd.adobe.formscentral.fcdt": {
    	source: "iana",
    	extensions: [
    		"fcdt"
    	]
    },
    	"application/vnd.adobe.fxp": {
    	source: "iana",
    	extensions: [
    		"fxp",
    		"fxpl"
    	]
    },
    	"application/vnd.adobe.partial-upload": {
    	source: "iana"
    },
    	"application/vnd.adobe.xdp+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xdp"
    	]
    },
    	"application/vnd.adobe.xfdf": {
    	source: "iana",
    	extensions: [
    		"xfdf"
    	]
    },
    	"application/vnd.aether.imp": {
    	source: "iana"
    },
    	"application/vnd.afpc.afplinedata": {
    	source: "iana"
    },
    	"application/vnd.afpc.afplinedata-pagedef": {
    	source: "iana"
    },
    	"application/vnd.afpc.cmoca-cmresource": {
    	source: "iana"
    },
    	"application/vnd.afpc.foca-charset": {
    	source: "iana"
    },
    	"application/vnd.afpc.foca-codedfont": {
    	source: "iana"
    },
    	"application/vnd.afpc.foca-codepage": {
    	source: "iana"
    },
    	"application/vnd.afpc.modca": {
    	source: "iana"
    },
    	"application/vnd.afpc.modca-cmtable": {
    	source: "iana"
    },
    	"application/vnd.afpc.modca-formdef": {
    	source: "iana"
    },
    	"application/vnd.afpc.modca-mediummap": {
    	source: "iana"
    },
    	"application/vnd.afpc.modca-objectcontainer": {
    	source: "iana"
    },
    	"application/vnd.afpc.modca-overlay": {
    	source: "iana"
    },
    	"application/vnd.afpc.modca-pagesegment": {
    	source: "iana"
    },
    	"application/vnd.age": {
    	source: "iana",
    	extensions: [
    		"age"
    	]
    },
    	"application/vnd.ah-barcode": {
    	source: "iana"
    },
    	"application/vnd.ahead.space": {
    	source: "iana",
    	extensions: [
    		"ahead"
    	]
    },
    	"application/vnd.airzip.filesecure.azf": {
    	source: "iana",
    	extensions: [
    		"azf"
    	]
    },
    	"application/vnd.airzip.filesecure.azs": {
    	source: "iana",
    	extensions: [
    		"azs"
    	]
    },
    	"application/vnd.amadeus+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.amazon.ebook": {
    	source: "apache",
    	extensions: [
    		"azw"
    	]
    },
    	"application/vnd.amazon.mobi8-ebook": {
    	source: "iana"
    },
    	"application/vnd.americandynamics.acc": {
    	source: "iana",
    	extensions: [
    		"acc"
    	]
    },
    	"application/vnd.amiga.ami": {
    	source: "iana",
    	extensions: [
    		"ami"
    	]
    },
    	"application/vnd.amundsen.maze+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.android.ota": {
    	source: "iana"
    },
    	"application/vnd.android.package-archive": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"apk"
    	]
    },
    	"application/vnd.anki": {
    	source: "iana"
    },
    	"application/vnd.anser-web-certificate-issue-initiation": {
    	source: "iana",
    	extensions: [
    		"cii"
    	]
    },
    	"application/vnd.anser-web-funds-transfer-initiation": {
    	source: "apache",
    	extensions: [
    		"fti"
    	]
    },
    	"application/vnd.antix.game-component": {
    	source: "iana",
    	extensions: [
    		"atx"
    	]
    },
    	"application/vnd.apache.arrow.file": {
    	source: "iana"
    },
    	"application/vnd.apache.arrow.stream": {
    	source: "iana"
    },
    	"application/vnd.apache.thrift.binary": {
    	source: "iana"
    },
    	"application/vnd.apache.thrift.compact": {
    	source: "iana"
    },
    	"application/vnd.apache.thrift.json": {
    	source: "iana"
    },
    	"application/vnd.api+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.aplextor.warrp+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.apothekende.reservation+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.apple.installer+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"mpkg"
    	]
    },
    	"application/vnd.apple.keynote": {
    	source: "iana",
    	extensions: [
    		"key"
    	]
    },
    	"application/vnd.apple.mpegurl": {
    	source: "iana",
    	extensions: [
    		"m3u8"
    	]
    },
    	"application/vnd.apple.numbers": {
    	source: "iana",
    	extensions: [
    		"numbers"
    	]
    },
    	"application/vnd.apple.pages": {
    	source: "iana",
    	extensions: [
    		"pages"
    	]
    },
    	"application/vnd.apple.pkpass": {
    	compressible: false,
    	extensions: [
    		"pkpass"
    	]
    },
    	"application/vnd.arastra.swi": {
    	source: "iana"
    },
    	"application/vnd.aristanetworks.swi": {
    	source: "iana",
    	extensions: [
    		"swi"
    	]
    },
    	"application/vnd.artisan+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.artsquare": {
    	source: "iana"
    },
    	"application/vnd.astraea-software.iota": {
    	source: "iana",
    	extensions: [
    		"iota"
    	]
    },
    	"application/vnd.audiograph": {
    	source: "iana",
    	extensions: [
    		"aep"
    	]
    },
    	"application/vnd.autopackage": {
    	source: "iana"
    },
    	"application/vnd.avalon+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.avistar+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.balsamiq.bmml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"bmml"
    	]
    },
    	"application/vnd.balsamiq.bmpr": {
    	source: "iana"
    },
    	"application/vnd.banana-accounting": {
    	source: "iana"
    },
    	"application/vnd.bbf.usp.error": {
    	source: "iana"
    },
    	"application/vnd.bbf.usp.msg": {
    	source: "iana"
    },
    	"application/vnd.bbf.usp.msg+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.bekitzur-stech+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.bint.med-content": {
    	source: "iana"
    },
    	"application/vnd.biopax.rdf+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.blink-idb-value-wrapper": {
    	source: "iana"
    },
    	"application/vnd.blueice.multipass": {
    	source: "iana",
    	extensions: [
    		"mpm"
    	]
    },
    	"application/vnd.bluetooth.ep.oob": {
    	source: "iana"
    },
    	"application/vnd.bluetooth.le.oob": {
    	source: "iana"
    },
    	"application/vnd.bmi": {
    	source: "iana",
    	extensions: [
    		"bmi"
    	]
    },
    	"application/vnd.bpf": {
    	source: "iana"
    },
    	"application/vnd.bpf3": {
    	source: "iana"
    },
    	"application/vnd.businessobjects": {
    	source: "iana",
    	extensions: [
    		"rep"
    	]
    },
    	"application/vnd.byu.uapi+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.cab-jscript": {
    	source: "iana"
    },
    	"application/vnd.canon-cpdl": {
    	source: "iana"
    },
    	"application/vnd.canon-lips": {
    	source: "iana"
    },
    	"application/vnd.capasystems-pg+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.cendio.thinlinc.clientconf": {
    	source: "iana"
    },
    	"application/vnd.century-systems.tcp_stream": {
    	source: "iana"
    },
    	"application/vnd.chemdraw+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"cdxml"
    	]
    },
    	"application/vnd.chess-pgn": {
    	source: "iana"
    },
    	"application/vnd.chipnuts.karaoke-mmd": {
    	source: "iana",
    	extensions: [
    		"mmd"
    	]
    },
    	"application/vnd.ciedi": {
    	source: "iana"
    },
    	"application/vnd.cinderella": {
    	source: "iana",
    	extensions: [
    		"cdy"
    	]
    },
    	"application/vnd.cirpack.isdn-ext": {
    	source: "iana"
    },
    	"application/vnd.citationstyles.style+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"csl"
    	]
    },
    	"application/vnd.claymore": {
    	source: "iana",
    	extensions: [
    		"cla"
    	]
    },
    	"application/vnd.cloanto.rp9": {
    	source: "iana",
    	extensions: [
    		"rp9"
    	]
    },
    	"application/vnd.clonk.c4group": {
    	source: "iana",
    	extensions: [
    		"c4g",
    		"c4d",
    		"c4f",
    		"c4p",
    		"c4u"
    	]
    },
    	"application/vnd.cluetrust.cartomobile-config": {
    	source: "iana",
    	extensions: [
    		"c11amc"
    	]
    },
    	"application/vnd.cluetrust.cartomobile-config-pkg": {
    	source: "iana",
    	extensions: [
    		"c11amz"
    	]
    },
    	"application/vnd.coffeescript": {
    	source: "iana"
    },
    	"application/vnd.collabio.xodocuments.document": {
    	source: "iana"
    },
    	"application/vnd.collabio.xodocuments.document-template": {
    	source: "iana"
    },
    	"application/vnd.collabio.xodocuments.presentation": {
    	source: "iana"
    },
    	"application/vnd.collabio.xodocuments.presentation-template": {
    	source: "iana"
    },
    	"application/vnd.collabio.xodocuments.spreadsheet": {
    	source: "iana"
    },
    	"application/vnd.collabio.xodocuments.spreadsheet-template": {
    	source: "iana"
    },
    	"application/vnd.collection+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.collection.doc+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.collection.next+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.comicbook+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.comicbook-rar": {
    	source: "iana"
    },
    	"application/vnd.commerce-battelle": {
    	source: "iana"
    },
    	"application/vnd.commonspace": {
    	source: "iana",
    	extensions: [
    		"csp"
    	]
    },
    	"application/vnd.contact.cmsg": {
    	source: "iana",
    	extensions: [
    		"cdbcmsg"
    	]
    },
    	"application/vnd.coreos.ignition+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.cosmocaller": {
    	source: "iana",
    	extensions: [
    		"cmc"
    	]
    },
    	"application/vnd.crick.clicker": {
    	source: "iana",
    	extensions: [
    		"clkx"
    	]
    },
    	"application/vnd.crick.clicker.keyboard": {
    	source: "iana",
    	extensions: [
    		"clkk"
    	]
    },
    	"application/vnd.crick.clicker.palette": {
    	source: "iana",
    	extensions: [
    		"clkp"
    	]
    },
    	"application/vnd.crick.clicker.template": {
    	source: "iana",
    	extensions: [
    		"clkt"
    	]
    },
    	"application/vnd.crick.clicker.wordbank": {
    	source: "iana",
    	extensions: [
    		"clkw"
    	]
    },
    	"application/vnd.criticaltools.wbs+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"wbs"
    	]
    },
    	"application/vnd.cryptii.pipe+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.crypto-shade-file": {
    	source: "iana"
    },
    	"application/vnd.cryptomator.encrypted": {
    	source: "iana"
    },
    	"application/vnd.cryptomator.vault": {
    	source: "iana"
    },
    	"application/vnd.ctc-posml": {
    	source: "iana",
    	extensions: [
    		"pml"
    	]
    },
    	"application/vnd.ctct.ws+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.cups-pdf": {
    	source: "iana"
    },
    	"application/vnd.cups-postscript": {
    	source: "iana"
    },
    	"application/vnd.cups-ppd": {
    	source: "iana",
    	extensions: [
    		"ppd"
    	]
    },
    	"application/vnd.cups-raster": {
    	source: "iana"
    },
    	"application/vnd.cups-raw": {
    	source: "iana"
    },
    	"application/vnd.curl": {
    	source: "iana"
    },
    	"application/vnd.curl.car": {
    	source: "apache",
    	extensions: [
    		"car"
    	]
    },
    	"application/vnd.curl.pcurl": {
    	source: "apache",
    	extensions: [
    		"pcurl"
    	]
    },
    	"application/vnd.cyan.dean.root+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.cybank": {
    	source: "iana"
    },
    	"application/vnd.cyclonedx+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.cyclonedx+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.d2l.coursepackage1p0+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.d3m-dataset": {
    	source: "iana"
    },
    	"application/vnd.d3m-problem": {
    	source: "iana"
    },
    	"application/vnd.dart": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"dart"
    	]
    },
    	"application/vnd.data-vision.rdz": {
    	source: "iana",
    	extensions: [
    		"rdz"
    	]
    },
    	"application/vnd.datapackage+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.dataresource+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.dbf": {
    	source: "iana",
    	extensions: [
    		"dbf"
    	]
    },
    	"application/vnd.debian.binary-package": {
    	source: "iana"
    },
    	"application/vnd.dece.data": {
    	source: "iana",
    	extensions: [
    		"uvf",
    		"uvvf",
    		"uvd",
    		"uvvd"
    	]
    },
    	"application/vnd.dece.ttml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"uvt",
    		"uvvt"
    	]
    },
    	"application/vnd.dece.unspecified": {
    	source: "iana",
    	extensions: [
    		"uvx",
    		"uvvx"
    	]
    },
    	"application/vnd.dece.zip": {
    	source: "iana",
    	extensions: [
    		"uvz",
    		"uvvz"
    	]
    },
    	"application/vnd.denovo.fcselayout-link": {
    	source: "iana",
    	extensions: [
    		"fe_launch"
    	]
    },
    	"application/vnd.desmume.movie": {
    	source: "iana"
    },
    	"application/vnd.dir-bi.plate-dl-nosuffix": {
    	source: "iana"
    },
    	"application/vnd.dm.delegation+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.dna": {
    	source: "iana",
    	extensions: [
    		"dna"
    	]
    },
    	"application/vnd.document+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.dolby.mlp": {
    	source: "apache",
    	extensions: [
    		"mlp"
    	]
    },
    	"application/vnd.dolby.mobile.1": {
    	source: "iana"
    },
    	"application/vnd.dolby.mobile.2": {
    	source: "iana"
    },
    	"application/vnd.doremir.scorecloud-binary-document": {
    	source: "iana"
    },
    	"application/vnd.dpgraph": {
    	source: "iana",
    	extensions: [
    		"dpg"
    	]
    },
    	"application/vnd.dreamfactory": {
    	source: "iana",
    	extensions: [
    		"dfac"
    	]
    },
    	"application/vnd.drive+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.ds-keypoint": {
    	source: "apache",
    	extensions: [
    		"kpxx"
    	]
    },
    	"application/vnd.dtg.local": {
    	source: "iana"
    },
    	"application/vnd.dtg.local.flash": {
    	source: "iana"
    },
    	"application/vnd.dtg.local.html": {
    	source: "iana"
    },
    	"application/vnd.dvb.ait": {
    	source: "iana",
    	extensions: [
    		"ait"
    	]
    },
    	"application/vnd.dvb.dvbisl+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.dvb.dvbj": {
    	source: "iana"
    },
    	"application/vnd.dvb.esgcontainer": {
    	source: "iana"
    },
    	"application/vnd.dvb.ipdcdftnotifaccess": {
    	source: "iana"
    },
    	"application/vnd.dvb.ipdcesgaccess": {
    	source: "iana"
    },
    	"application/vnd.dvb.ipdcesgaccess2": {
    	source: "iana"
    },
    	"application/vnd.dvb.ipdcesgpdd": {
    	source: "iana"
    },
    	"application/vnd.dvb.ipdcroaming": {
    	source: "iana"
    },
    	"application/vnd.dvb.iptv.alfec-base": {
    	source: "iana"
    },
    	"application/vnd.dvb.iptv.alfec-enhancement": {
    	source: "iana"
    },
    	"application/vnd.dvb.notif-aggregate-root+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.dvb.notif-container+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.dvb.notif-generic+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.dvb.notif-ia-msglist+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.dvb.notif-ia-registration-request+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.dvb.notif-ia-registration-response+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.dvb.notif-init+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.dvb.pfr": {
    	source: "iana"
    },
    	"application/vnd.dvb.service": {
    	source: "iana",
    	extensions: [
    		"svc"
    	]
    },
    	"application/vnd.dxr": {
    	source: "iana"
    },
    	"application/vnd.dynageo": {
    	source: "iana",
    	extensions: [
    		"geo"
    	]
    },
    	"application/vnd.dzr": {
    	source: "iana"
    },
    	"application/vnd.easykaraoke.cdgdownload": {
    	source: "iana"
    },
    	"application/vnd.ecdis-update": {
    	source: "iana"
    },
    	"application/vnd.ecip.rlp": {
    	source: "iana"
    },
    	"application/vnd.eclipse.ditto+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.ecowin.chart": {
    	source: "iana",
    	extensions: [
    		"mag"
    	]
    },
    	"application/vnd.ecowin.filerequest": {
    	source: "iana"
    },
    	"application/vnd.ecowin.fileupdate": {
    	source: "iana"
    },
    	"application/vnd.ecowin.series": {
    	source: "iana"
    },
    	"application/vnd.ecowin.seriesrequest": {
    	source: "iana"
    },
    	"application/vnd.ecowin.seriesupdate": {
    	source: "iana"
    },
    	"application/vnd.efi.img": {
    	source: "iana"
    },
    	"application/vnd.efi.iso": {
    	source: "iana"
    },
    	"application/vnd.emclient.accessrequest+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.enliven": {
    	source: "iana",
    	extensions: [
    		"nml"
    	]
    },
    	"application/vnd.enphase.envoy": {
    	source: "iana"
    },
    	"application/vnd.eprints.data+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.epson.esf": {
    	source: "iana",
    	extensions: [
    		"esf"
    	]
    },
    	"application/vnd.epson.msf": {
    	source: "iana",
    	extensions: [
    		"msf"
    	]
    },
    	"application/vnd.epson.quickanime": {
    	source: "iana",
    	extensions: [
    		"qam"
    	]
    },
    	"application/vnd.epson.salt": {
    	source: "iana",
    	extensions: [
    		"slt"
    	]
    },
    	"application/vnd.epson.ssf": {
    	source: "iana",
    	extensions: [
    		"ssf"
    	]
    },
    	"application/vnd.ericsson.quickcall": {
    	source: "iana"
    },
    	"application/vnd.espass-espass+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.eszigno3+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"es3",
    		"et3"
    	]
    },
    	"application/vnd.etsi.aoc+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.asic-e+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.etsi.asic-s+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.etsi.cug+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.iptvcommand+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.iptvdiscovery+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.iptvprofile+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.iptvsad-bc+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.iptvsad-cod+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.iptvsad-npvr+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.iptvservice+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.iptvsync+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.iptvueprofile+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.mcid+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.mheg5": {
    	source: "iana"
    },
    	"application/vnd.etsi.overload-control-policy-dataset+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.pstn+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.sci+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.simservs+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.timestamp-token": {
    	source: "iana"
    },
    	"application/vnd.etsi.tsl+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.etsi.tsl.der": {
    	source: "iana"
    },
    	"application/vnd.eu.kasparian.car+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.eudora.data": {
    	source: "iana"
    },
    	"application/vnd.evolv.ecig.profile": {
    	source: "iana"
    },
    	"application/vnd.evolv.ecig.settings": {
    	source: "iana"
    },
    	"application/vnd.evolv.ecig.theme": {
    	source: "iana"
    },
    	"application/vnd.exstream-empower+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.exstream-package": {
    	source: "iana"
    },
    	"application/vnd.ezpix-album": {
    	source: "iana",
    	extensions: [
    		"ez2"
    	]
    },
    	"application/vnd.ezpix-package": {
    	source: "iana",
    	extensions: [
    		"ez3"
    	]
    },
    	"application/vnd.f-secure.mobile": {
    	source: "iana"
    },
    	"application/vnd.familysearch.gedcom+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.fastcopy-disk-image": {
    	source: "iana"
    },
    	"application/vnd.fdf": {
    	source: "iana",
    	extensions: [
    		"fdf"
    	]
    },
    	"application/vnd.fdsn.mseed": {
    	source: "iana",
    	extensions: [
    		"mseed"
    	]
    },
    	"application/vnd.fdsn.seed": {
    	source: "iana",
    	extensions: [
    		"seed",
    		"dataless"
    	]
    },
    	"application/vnd.ffsns": {
    	source: "iana"
    },
    	"application/vnd.ficlab.flb+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.filmit.zfc": {
    	source: "iana"
    },
    	"application/vnd.fints": {
    	source: "iana"
    },
    	"application/vnd.firemonkeys.cloudcell": {
    	source: "iana"
    },
    	"application/vnd.flographit": {
    	source: "iana",
    	extensions: [
    		"gph"
    	]
    },
    	"application/vnd.fluxtime.clip": {
    	source: "iana",
    	extensions: [
    		"ftc"
    	]
    },
    	"application/vnd.font-fontforge-sfd": {
    	source: "iana"
    },
    	"application/vnd.framemaker": {
    	source: "iana",
    	extensions: [
    		"fm",
    		"frame",
    		"maker",
    		"book"
    	]
    },
    	"application/vnd.frogans.fnc": {
    	source: "iana",
    	extensions: [
    		"fnc"
    	]
    },
    	"application/vnd.frogans.ltf": {
    	source: "iana",
    	extensions: [
    		"ltf"
    	]
    },
    	"application/vnd.fsc.weblaunch": {
    	source: "iana",
    	extensions: [
    		"fsc"
    	]
    },
    	"application/vnd.fujifilm.fb.docuworks": {
    	source: "iana"
    },
    	"application/vnd.fujifilm.fb.docuworks.binder": {
    	source: "iana"
    },
    	"application/vnd.fujifilm.fb.docuworks.container": {
    	source: "iana"
    },
    	"application/vnd.fujifilm.fb.jfi+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.fujitsu.oasys": {
    	source: "iana",
    	extensions: [
    		"oas"
    	]
    },
    	"application/vnd.fujitsu.oasys2": {
    	source: "iana",
    	extensions: [
    		"oa2"
    	]
    },
    	"application/vnd.fujitsu.oasys3": {
    	source: "iana",
    	extensions: [
    		"oa3"
    	]
    },
    	"application/vnd.fujitsu.oasysgp": {
    	source: "iana",
    	extensions: [
    		"fg5"
    	]
    },
    	"application/vnd.fujitsu.oasysprs": {
    	source: "iana",
    	extensions: [
    		"bh2"
    	]
    },
    	"application/vnd.fujixerox.art-ex": {
    	source: "iana"
    },
    	"application/vnd.fujixerox.art4": {
    	source: "iana"
    },
    	"application/vnd.fujixerox.ddd": {
    	source: "iana",
    	extensions: [
    		"ddd"
    	]
    },
    	"application/vnd.fujixerox.docuworks": {
    	source: "iana",
    	extensions: [
    		"xdw"
    	]
    },
    	"application/vnd.fujixerox.docuworks.binder": {
    	source: "iana",
    	extensions: [
    		"xbd"
    	]
    },
    	"application/vnd.fujixerox.docuworks.container": {
    	source: "iana"
    },
    	"application/vnd.fujixerox.hbpl": {
    	source: "iana"
    },
    	"application/vnd.fut-misnet": {
    	source: "iana"
    },
    	"application/vnd.futoin+cbor": {
    	source: "iana"
    },
    	"application/vnd.futoin+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.fuzzysheet": {
    	source: "iana",
    	extensions: [
    		"fzs"
    	]
    },
    	"application/vnd.genomatix.tuxedo": {
    	source: "iana",
    	extensions: [
    		"txd"
    	]
    },
    	"application/vnd.gentics.grd+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.geo+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.geocube+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.geogebra.file": {
    	source: "iana",
    	extensions: [
    		"ggb"
    	]
    },
    	"application/vnd.geogebra.slides": {
    	source: "iana"
    },
    	"application/vnd.geogebra.tool": {
    	source: "iana",
    	extensions: [
    		"ggt"
    	]
    },
    	"application/vnd.geometry-explorer": {
    	source: "iana",
    	extensions: [
    		"gex",
    		"gre"
    	]
    },
    	"application/vnd.geonext": {
    	source: "iana",
    	extensions: [
    		"gxt"
    	]
    },
    	"application/vnd.geoplan": {
    	source: "iana",
    	extensions: [
    		"g2w"
    	]
    },
    	"application/vnd.geospace": {
    	source: "iana",
    	extensions: [
    		"g3w"
    	]
    },
    	"application/vnd.gerber": {
    	source: "iana"
    },
    	"application/vnd.globalplatform.card-content-mgt": {
    	source: "iana"
    },
    	"application/vnd.globalplatform.card-content-mgt-response": {
    	source: "iana"
    },
    	"application/vnd.gmx": {
    	source: "iana",
    	extensions: [
    		"gmx"
    	]
    },
    	"application/vnd.google-apps.document": {
    	compressible: false,
    	extensions: [
    		"gdoc"
    	]
    },
    	"application/vnd.google-apps.presentation": {
    	compressible: false,
    	extensions: [
    		"gslides"
    	]
    },
    	"application/vnd.google-apps.spreadsheet": {
    	compressible: false,
    	extensions: [
    		"gsheet"
    	]
    },
    	"application/vnd.google-earth.kml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"kml"
    	]
    },
    	"application/vnd.google-earth.kmz": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"kmz"
    	]
    },
    	"application/vnd.gov.sk.e-form+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.gov.sk.e-form+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.gov.sk.xmldatacontainer+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.grafeq": {
    	source: "iana",
    	extensions: [
    		"gqf",
    		"gqs"
    	]
    },
    	"application/vnd.gridmp": {
    	source: "iana"
    },
    	"application/vnd.groove-account": {
    	source: "iana",
    	extensions: [
    		"gac"
    	]
    },
    	"application/vnd.groove-help": {
    	source: "iana",
    	extensions: [
    		"ghf"
    	]
    },
    	"application/vnd.groove-identity-message": {
    	source: "iana",
    	extensions: [
    		"gim"
    	]
    },
    	"application/vnd.groove-injector": {
    	source: "iana",
    	extensions: [
    		"grv"
    	]
    },
    	"application/vnd.groove-tool-message": {
    	source: "iana",
    	extensions: [
    		"gtm"
    	]
    },
    	"application/vnd.groove-tool-template": {
    	source: "iana",
    	extensions: [
    		"tpl"
    	]
    },
    	"application/vnd.groove-vcard": {
    	source: "iana",
    	extensions: [
    		"vcg"
    	]
    },
    	"application/vnd.hal+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.hal+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"hal"
    	]
    },
    	"application/vnd.handheld-entertainment+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"zmm"
    	]
    },
    	"application/vnd.hbci": {
    	source: "iana",
    	extensions: [
    		"hbci"
    	]
    },
    	"application/vnd.hc+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.hcl-bireports": {
    	source: "iana"
    },
    	"application/vnd.hdt": {
    	source: "iana"
    },
    	"application/vnd.heroku+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.hhe.lesson-player": {
    	source: "iana",
    	extensions: [
    		"les"
    	]
    },
    	"application/vnd.hl7cda+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/vnd.hl7v2+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/vnd.hp-hpgl": {
    	source: "iana",
    	extensions: [
    		"hpgl"
    	]
    },
    	"application/vnd.hp-hpid": {
    	source: "iana",
    	extensions: [
    		"hpid"
    	]
    },
    	"application/vnd.hp-hps": {
    	source: "iana",
    	extensions: [
    		"hps"
    	]
    },
    	"application/vnd.hp-jlyt": {
    	source: "iana",
    	extensions: [
    		"jlt"
    	]
    },
    	"application/vnd.hp-pcl": {
    	source: "iana",
    	extensions: [
    		"pcl"
    	]
    },
    	"application/vnd.hp-pclxl": {
    	source: "iana",
    	extensions: [
    		"pclxl"
    	]
    },
    	"application/vnd.httphone": {
    	source: "iana"
    },
    	"application/vnd.hydrostatix.sof-data": {
    	source: "iana",
    	extensions: [
    		"sfd-hdstx"
    	]
    },
    	"application/vnd.hyper+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.hyper-item+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.hyperdrive+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.hzn-3d-crossword": {
    	source: "iana"
    },
    	"application/vnd.ibm.afplinedata": {
    	source: "iana"
    },
    	"application/vnd.ibm.electronic-media": {
    	source: "iana"
    },
    	"application/vnd.ibm.minipay": {
    	source: "iana",
    	extensions: [
    		"mpy"
    	]
    },
    	"application/vnd.ibm.modcap": {
    	source: "iana",
    	extensions: [
    		"afp",
    		"listafp",
    		"list3820"
    	]
    },
    	"application/vnd.ibm.rights-management": {
    	source: "iana",
    	extensions: [
    		"irm"
    	]
    },
    	"application/vnd.ibm.secure-container": {
    	source: "iana",
    	extensions: [
    		"sc"
    	]
    },
    	"application/vnd.iccprofile": {
    	source: "iana",
    	extensions: [
    		"icc",
    		"icm"
    	]
    },
    	"application/vnd.ieee.1905": {
    	source: "iana"
    },
    	"application/vnd.igloader": {
    	source: "iana",
    	extensions: [
    		"igl"
    	]
    },
    	"application/vnd.imagemeter.folder+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.imagemeter.image+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.immervision-ivp": {
    	source: "iana",
    	extensions: [
    		"ivp"
    	]
    },
    	"application/vnd.immervision-ivu": {
    	source: "iana",
    	extensions: [
    		"ivu"
    	]
    },
    	"application/vnd.ims.imsccv1p1": {
    	source: "iana"
    },
    	"application/vnd.ims.imsccv1p2": {
    	source: "iana"
    },
    	"application/vnd.ims.imsccv1p3": {
    	source: "iana"
    },
    	"application/vnd.ims.lis.v2.result+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.ims.lti.v2.toolproxy+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.ims.lti.v2.toolproxy.id+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.ims.lti.v2.toolsettings+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.ims.lti.v2.toolsettings.simple+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.informedcontrol.rms+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.informix-visionary": {
    	source: "iana"
    },
    	"application/vnd.infotech.project": {
    	source: "iana"
    },
    	"application/vnd.infotech.project+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.innopath.wamp.notification": {
    	source: "iana"
    },
    	"application/vnd.insors.igm": {
    	source: "iana",
    	extensions: [
    		"igm"
    	]
    },
    	"application/vnd.intercon.formnet": {
    	source: "iana",
    	extensions: [
    		"xpw",
    		"xpx"
    	]
    },
    	"application/vnd.intergeo": {
    	source: "iana",
    	extensions: [
    		"i2g"
    	]
    },
    	"application/vnd.intertrust.digibox": {
    	source: "iana"
    },
    	"application/vnd.intertrust.nncp": {
    	source: "iana"
    },
    	"application/vnd.intu.qbo": {
    	source: "iana",
    	extensions: [
    		"qbo"
    	]
    },
    	"application/vnd.intu.qfx": {
    	source: "iana",
    	extensions: [
    		"qfx"
    	]
    },
    	"application/vnd.iptc.g2.catalogitem+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.iptc.g2.conceptitem+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.iptc.g2.knowledgeitem+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.iptc.g2.newsitem+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.iptc.g2.newsmessage+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.iptc.g2.packageitem+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.iptc.g2.planningitem+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.ipunplugged.rcprofile": {
    	source: "iana",
    	extensions: [
    		"rcprofile"
    	]
    },
    	"application/vnd.irepository.package+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"irp"
    	]
    },
    	"application/vnd.is-xpr": {
    	source: "iana",
    	extensions: [
    		"xpr"
    	]
    },
    	"application/vnd.isac.fcs": {
    	source: "iana",
    	extensions: [
    		"fcs"
    	]
    },
    	"application/vnd.iso11783-10+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.jam": {
    	source: "iana",
    	extensions: [
    		"jam"
    	]
    },
    	"application/vnd.japannet-directory-service": {
    	source: "iana"
    },
    	"application/vnd.japannet-jpnstore-wakeup": {
    	source: "iana"
    },
    	"application/vnd.japannet-payment-wakeup": {
    	source: "iana"
    },
    	"application/vnd.japannet-registration": {
    	source: "iana"
    },
    	"application/vnd.japannet-registration-wakeup": {
    	source: "iana"
    },
    	"application/vnd.japannet-setstore-wakeup": {
    	source: "iana"
    },
    	"application/vnd.japannet-verification": {
    	source: "iana"
    },
    	"application/vnd.japannet-verification-wakeup": {
    	source: "iana"
    },
    	"application/vnd.jcp.javame.midlet-rms": {
    	source: "iana",
    	extensions: [
    		"rms"
    	]
    },
    	"application/vnd.jisp": {
    	source: "iana",
    	extensions: [
    		"jisp"
    	]
    },
    	"application/vnd.joost.joda-archive": {
    	source: "iana",
    	extensions: [
    		"joda"
    	]
    },
    	"application/vnd.jsk.isdn-ngn": {
    	source: "iana"
    },
    	"application/vnd.kahootz": {
    	source: "iana",
    	extensions: [
    		"ktz",
    		"ktr"
    	]
    },
    	"application/vnd.kde.karbon": {
    	source: "iana",
    	extensions: [
    		"karbon"
    	]
    },
    	"application/vnd.kde.kchart": {
    	source: "iana",
    	extensions: [
    		"chrt"
    	]
    },
    	"application/vnd.kde.kformula": {
    	source: "iana",
    	extensions: [
    		"kfo"
    	]
    },
    	"application/vnd.kde.kivio": {
    	source: "iana",
    	extensions: [
    		"flw"
    	]
    },
    	"application/vnd.kde.kontour": {
    	source: "iana",
    	extensions: [
    		"kon"
    	]
    },
    	"application/vnd.kde.kpresenter": {
    	source: "iana",
    	extensions: [
    		"kpr",
    		"kpt"
    	]
    },
    	"application/vnd.kde.kspread": {
    	source: "iana",
    	extensions: [
    		"ksp"
    	]
    },
    	"application/vnd.kde.kword": {
    	source: "iana",
    	extensions: [
    		"kwd",
    		"kwt"
    	]
    },
    	"application/vnd.kenameaapp": {
    	source: "iana",
    	extensions: [
    		"htke"
    	]
    },
    	"application/vnd.kidspiration": {
    	source: "iana",
    	extensions: [
    		"kia"
    	]
    },
    	"application/vnd.kinar": {
    	source: "iana",
    	extensions: [
    		"kne",
    		"knp"
    	]
    },
    	"application/vnd.koan": {
    	source: "iana",
    	extensions: [
    		"skp",
    		"skd",
    		"skt",
    		"skm"
    	]
    },
    	"application/vnd.kodak-descriptor": {
    	source: "iana",
    	extensions: [
    		"sse"
    	]
    },
    	"application/vnd.las": {
    	source: "iana"
    },
    	"application/vnd.las.las+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.las.las+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"lasxml"
    	]
    },
    	"application/vnd.laszip": {
    	source: "iana"
    },
    	"application/vnd.leap+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.liberty-request+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.llamagraphics.life-balance.desktop": {
    	source: "iana",
    	extensions: [
    		"lbd"
    	]
    },
    	"application/vnd.llamagraphics.life-balance.exchange+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"lbe"
    	]
    },
    	"application/vnd.logipipe.circuit+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.loom": {
    	source: "iana"
    },
    	"application/vnd.lotus-1-2-3": {
    	source: "iana",
    	extensions: [
    		"123"
    	]
    },
    	"application/vnd.lotus-approach": {
    	source: "iana",
    	extensions: [
    		"apr"
    	]
    },
    	"application/vnd.lotus-freelance": {
    	source: "iana",
    	extensions: [
    		"pre"
    	]
    },
    	"application/vnd.lotus-notes": {
    	source: "iana",
    	extensions: [
    		"nsf"
    	]
    },
    	"application/vnd.lotus-organizer": {
    	source: "iana",
    	extensions: [
    		"org"
    	]
    },
    	"application/vnd.lotus-screencam": {
    	source: "iana",
    	extensions: [
    		"scm"
    	]
    },
    	"application/vnd.lotus-wordpro": {
    	source: "iana",
    	extensions: [
    		"lwp"
    	]
    },
    	"application/vnd.macports.portpkg": {
    	source: "iana",
    	extensions: [
    		"portpkg"
    	]
    },
    	"application/vnd.mapbox-vector-tile": {
    	source: "iana",
    	extensions: [
    		"mvt"
    	]
    },
    	"application/vnd.marlin.drm.actiontoken+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.marlin.drm.conftoken+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.marlin.drm.license+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.marlin.drm.mdcf": {
    	source: "iana"
    },
    	"application/vnd.mason+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.maxar.archive.3tz+zip": {
    	source: "iana",
    	compressible: false
    },
    	"application/vnd.maxmind.maxmind-db": {
    	source: "iana"
    },
    	"application/vnd.mcd": {
    	source: "iana",
    	extensions: [
    		"mcd"
    	]
    },
    	"application/vnd.medcalcdata": {
    	source: "iana",
    	extensions: [
    		"mc1"
    	]
    },
    	"application/vnd.mediastation.cdkey": {
    	source: "iana",
    	extensions: [
    		"cdkey"
    	]
    },
    	"application/vnd.meridian-slingshot": {
    	source: "iana"
    },
    	"application/vnd.mfer": {
    	source: "iana",
    	extensions: [
    		"mwf"
    	]
    },
    	"application/vnd.mfmp": {
    	source: "iana",
    	extensions: [
    		"mfm"
    	]
    },
    	"application/vnd.micro+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.micrografx.flo": {
    	source: "iana",
    	extensions: [
    		"flo"
    	]
    },
    	"application/vnd.micrografx.igx": {
    	source: "iana",
    	extensions: [
    		"igx"
    	]
    },
    	"application/vnd.microsoft.portable-executable": {
    	source: "iana"
    },
    	"application/vnd.microsoft.windows.thumbnail-cache": {
    	source: "iana"
    },
    	"application/vnd.miele+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.mif": {
    	source: "iana",
    	extensions: [
    		"mif"
    	]
    },
    	"application/vnd.minisoft-hp3000-save": {
    	source: "iana"
    },
    	"application/vnd.mitsubishi.misty-guard.trustweb": {
    	source: "iana"
    },
    	"application/vnd.mobius.daf": {
    	source: "iana",
    	extensions: [
    		"daf"
    	]
    },
    	"application/vnd.mobius.dis": {
    	source: "iana",
    	extensions: [
    		"dis"
    	]
    },
    	"application/vnd.mobius.mbk": {
    	source: "iana",
    	extensions: [
    		"mbk"
    	]
    },
    	"application/vnd.mobius.mqy": {
    	source: "iana",
    	extensions: [
    		"mqy"
    	]
    },
    	"application/vnd.mobius.msl": {
    	source: "iana",
    	extensions: [
    		"msl"
    	]
    },
    	"application/vnd.mobius.plc": {
    	source: "iana",
    	extensions: [
    		"plc"
    	]
    },
    	"application/vnd.mobius.txf": {
    	source: "iana",
    	extensions: [
    		"txf"
    	]
    },
    	"application/vnd.mophun.application": {
    	source: "iana",
    	extensions: [
    		"mpn"
    	]
    },
    	"application/vnd.mophun.certificate": {
    	source: "iana",
    	extensions: [
    		"mpc"
    	]
    },
    	"application/vnd.motorola.flexsuite": {
    	source: "iana"
    },
    	"application/vnd.motorola.flexsuite.adsi": {
    	source: "iana"
    },
    	"application/vnd.motorola.flexsuite.fis": {
    	source: "iana"
    },
    	"application/vnd.motorola.flexsuite.gotap": {
    	source: "iana"
    },
    	"application/vnd.motorola.flexsuite.kmr": {
    	source: "iana"
    },
    	"application/vnd.motorola.flexsuite.ttc": {
    	source: "iana"
    },
    	"application/vnd.motorola.flexsuite.wem": {
    	source: "iana"
    },
    	"application/vnd.motorola.iprm": {
    	source: "iana"
    },
    	"application/vnd.mozilla.xul+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xul"
    	]
    },
    	"application/vnd.ms-3mfdocument": {
    	source: "iana"
    },
    	"application/vnd.ms-artgalry": {
    	source: "iana",
    	extensions: [
    		"cil"
    	]
    },
    	"application/vnd.ms-asf": {
    	source: "iana"
    },
    	"application/vnd.ms-cab-compressed": {
    	source: "iana",
    	extensions: [
    		"cab"
    	]
    },
    	"application/vnd.ms-color.iccprofile": {
    	source: "apache"
    },
    	"application/vnd.ms-excel": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"xls",
    		"xlm",
    		"xla",
    		"xlc",
    		"xlt",
    		"xlw"
    	]
    },
    	"application/vnd.ms-excel.addin.macroenabled.12": {
    	source: "iana",
    	extensions: [
    		"xlam"
    	]
    },
    	"application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    	source: "iana",
    	extensions: [
    		"xlsb"
    	]
    },
    	"application/vnd.ms-excel.sheet.macroenabled.12": {
    	source: "iana",
    	extensions: [
    		"xlsm"
    	]
    },
    	"application/vnd.ms-excel.template.macroenabled.12": {
    	source: "iana",
    	extensions: [
    		"xltm"
    	]
    },
    	"application/vnd.ms-fontobject": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"eot"
    	]
    },
    	"application/vnd.ms-htmlhelp": {
    	source: "iana",
    	extensions: [
    		"chm"
    	]
    },
    	"application/vnd.ms-ims": {
    	source: "iana",
    	extensions: [
    		"ims"
    	]
    },
    	"application/vnd.ms-lrm": {
    	source: "iana",
    	extensions: [
    		"lrm"
    	]
    },
    	"application/vnd.ms-office.activex+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.ms-officetheme": {
    	source: "iana",
    	extensions: [
    		"thmx"
    	]
    },
    	"application/vnd.ms-opentype": {
    	source: "apache",
    	compressible: true
    },
    	"application/vnd.ms-outlook": {
    	compressible: false,
    	extensions: [
    		"msg"
    	]
    },
    	"application/vnd.ms-package.obfuscated-opentype": {
    	source: "apache"
    },
    	"application/vnd.ms-pki.seccat": {
    	source: "apache",
    	extensions: [
    		"cat"
    	]
    },
    	"application/vnd.ms-pki.stl": {
    	source: "apache",
    	extensions: [
    		"stl"
    	]
    },
    	"application/vnd.ms-playready.initiator+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.ms-powerpoint": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"ppt",
    		"pps",
    		"pot"
    	]
    },
    	"application/vnd.ms-powerpoint.addin.macroenabled.12": {
    	source: "iana",
    	extensions: [
    		"ppam"
    	]
    },
    	"application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    	source: "iana",
    	extensions: [
    		"pptm"
    	]
    },
    	"application/vnd.ms-powerpoint.slide.macroenabled.12": {
    	source: "iana",
    	extensions: [
    		"sldm"
    	]
    },
    	"application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    	source: "iana",
    	extensions: [
    		"ppsm"
    	]
    },
    	"application/vnd.ms-powerpoint.template.macroenabled.12": {
    	source: "iana",
    	extensions: [
    		"potm"
    	]
    },
    	"application/vnd.ms-printdevicecapabilities+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.ms-printing.printticket+xml": {
    	source: "apache",
    	compressible: true
    },
    	"application/vnd.ms-printschematicket+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.ms-project": {
    	source: "iana",
    	extensions: [
    		"mpp",
    		"mpt"
    	]
    },
    	"application/vnd.ms-tnef": {
    	source: "iana"
    },
    	"application/vnd.ms-windows.devicepairing": {
    	source: "iana"
    },
    	"application/vnd.ms-windows.nwprinting.oob": {
    	source: "iana"
    },
    	"application/vnd.ms-windows.printerpairing": {
    	source: "iana"
    },
    	"application/vnd.ms-windows.wsd.oob": {
    	source: "iana"
    },
    	"application/vnd.ms-wmdrm.lic-chlg-req": {
    	source: "iana"
    },
    	"application/vnd.ms-wmdrm.lic-resp": {
    	source: "iana"
    },
    	"application/vnd.ms-wmdrm.meter-chlg-req": {
    	source: "iana"
    },
    	"application/vnd.ms-wmdrm.meter-resp": {
    	source: "iana"
    },
    	"application/vnd.ms-word.document.macroenabled.12": {
    	source: "iana",
    	extensions: [
    		"docm"
    	]
    },
    	"application/vnd.ms-word.template.macroenabled.12": {
    	source: "iana",
    	extensions: [
    		"dotm"
    	]
    },
    	"application/vnd.ms-works": {
    	source: "iana",
    	extensions: [
    		"wps",
    		"wks",
    		"wcm",
    		"wdb"
    	]
    },
    	"application/vnd.ms-wpl": {
    	source: "iana",
    	extensions: [
    		"wpl"
    	]
    },
    	"application/vnd.ms-xpsdocument": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"xps"
    	]
    },
    	"application/vnd.msa-disk-image": {
    	source: "iana"
    },
    	"application/vnd.mseq": {
    	source: "iana",
    	extensions: [
    		"mseq"
    	]
    },
    	"application/vnd.msign": {
    	source: "iana"
    },
    	"application/vnd.multiad.creator": {
    	source: "iana"
    },
    	"application/vnd.multiad.creator.cif": {
    	source: "iana"
    },
    	"application/vnd.music-niff": {
    	source: "iana"
    },
    	"application/vnd.musician": {
    	source: "iana",
    	extensions: [
    		"mus"
    	]
    },
    	"application/vnd.muvee.style": {
    	source: "iana",
    	extensions: [
    		"msty"
    	]
    },
    	"application/vnd.mynfc": {
    	source: "iana",
    	extensions: [
    		"taglet"
    	]
    },
    	"application/vnd.nacamar.ybrid+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.ncd.control": {
    	source: "iana"
    },
    	"application/vnd.ncd.reference": {
    	source: "iana"
    },
    	"application/vnd.nearst.inv+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.nebumind.line": {
    	source: "iana"
    },
    	"application/vnd.nervana": {
    	source: "iana"
    },
    	"application/vnd.netfpx": {
    	source: "iana"
    },
    	"application/vnd.neurolanguage.nlu": {
    	source: "iana",
    	extensions: [
    		"nlu"
    	]
    },
    	"application/vnd.nimn": {
    	source: "iana"
    },
    	"application/vnd.nintendo.nitro.rom": {
    	source: "iana"
    },
    	"application/vnd.nintendo.snes.rom": {
    	source: "iana"
    },
    	"application/vnd.nitf": {
    	source: "iana",
    	extensions: [
    		"ntf",
    		"nitf"
    	]
    },
    	"application/vnd.noblenet-directory": {
    	source: "iana",
    	extensions: [
    		"nnd"
    	]
    },
    	"application/vnd.noblenet-sealer": {
    	source: "iana",
    	extensions: [
    		"nns"
    	]
    },
    	"application/vnd.noblenet-web": {
    	source: "iana",
    	extensions: [
    		"nnw"
    	]
    },
    	"application/vnd.nokia.catalogs": {
    	source: "iana"
    },
    	"application/vnd.nokia.conml+wbxml": {
    	source: "iana"
    },
    	"application/vnd.nokia.conml+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.nokia.iptv.config+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.nokia.isds-radio-presets": {
    	source: "iana"
    },
    	"application/vnd.nokia.landmark+wbxml": {
    	source: "iana"
    },
    	"application/vnd.nokia.landmark+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.nokia.landmarkcollection+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.nokia.n-gage.ac+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"ac"
    	]
    },
    	"application/vnd.nokia.n-gage.data": {
    	source: "iana",
    	extensions: [
    		"ngdat"
    	]
    },
    	"application/vnd.nokia.n-gage.symbian.install": {
    	source: "iana",
    	extensions: [
    		"n-gage"
    	]
    },
    	"application/vnd.nokia.ncd": {
    	source: "iana"
    },
    	"application/vnd.nokia.pcd+wbxml": {
    	source: "iana"
    },
    	"application/vnd.nokia.pcd+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.nokia.radio-preset": {
    	source: "iana",
    	extensions: [
    		"rpst"
    	]
    },
    	"application/vnd.nokia.radio-presets": {
    	source: "iana",
    	extensions: [
    		"rpss"
    	]
    },
    	"application/vnd.novadigm.edm": {
    	source: "iana",
    	extensions: [
    		"edm"
    	]
    },
    	"application/vnd.novadigm.edx": {
    	source: "iana",
    	extensions: [
    		"edx"
    	]
    },
    	"application/vnd.novadigm.ext": {
    	source: "iana",
    	extensions: [
    		"ext"
    	]
    },
    	"application/vnd.ntt-local.content-share": {
    	source: "iana"
    },
    	"application/vnd.ntt-local.file-transfer": {
    	source: "iana"
    },
    	"application/vnd.ntt-local.ogw_remote-access": {
    	source: "iana"
    },
    	"application/vnd.ntt-local.sip-ta_remote": {
    	source: "iana"
    },
    	"application/vnd.ntt-local.sip-ta_tcp_stream": {
    	source: "iana"
    },
    	"application/vnd.oasis.opendocument.chart": {
    	source: "iana",
    	extensions: [
    		"odc"
    	]
    },
    	"application/vnd.oasis.opendocument.chart-template": {
    	source: "iana",
    	extensions: [
    		"otc"
    	]
    },
    	"application/vnd.oasis.opendocument.database": {
    	source: "iana",
    	extensions: [
    		"odb"
    	]
    },
    	"application/vnd.oasis.opendocument.formula": {
    	source: "iana",
    	extensions: [
    		"odf"
    	]
    },
    	"application/vnd.oasis.opendocument.formula-template": {
    	source: "iana",
    	extensions: [
    		"odft"
    	]
    },
    	"application/vnd.oasis.opendocument.graphics": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"odg"
    	]
    },
    	"application/vnd.oasis.opendocument.graphics-template": {
    	source: "iana",
    	extensions: [
    		"otg"
    	]
    },
    	"application/vnd.oasis.opendocument.image": {
    	source: "iana",
    	extensions: [
    		"odi"
    	]
    },
    	"application/vnd.oasis.opendocument.image-template": {
    	source: "iana",
    	extensions: [
    		"oti"
    	]
    },
    	"application/vnd.oasis.opendocument.presentation": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"odp"
    	]
    },
    	"application/vnd.oasis.opendocument.presentation-template": {
    	source: "iana",
    	extensions: [
    		"otp"
    	]
    },
    	"application/vnd.oasis.opendocument.spreadsheet": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"ods"
    	]
    },
    	"application/vnd.oasis.opendocument.spreadsheet-template": {
    	source: "iana",
    	extensions: [
    		"ots"
    	]
    },
    	"application/vnd.oasis.opendocument.text": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"odt"
    	]
    },
    	"application/vnd.oasis.opendocument.text-master": {
    	source: "iana",
    	extensions: [
    		"odm"
    	]
    },
    	"application/vnd.oasis.opendocument.text-template": {
    	source: "iana",
    	extensions: [
    		"ott"
    	]
    },
    	"application/vnd.oasis.opendocument.text-web": {
    	source: "iana",
    	extensions: [
    		"oth"
    	]
    },
    	"application/vnd.obn": {
    	source: "iana"
    },
    	"application/vnd.ocf+cbor": {
    	source: "iana"
    },
    	"application/vnd.oci.image.manifest.v1+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oftn.l10n+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oipf.contentaccessdownload+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oipf.contentaccessstreaming+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oipf.cspg-hexbinary": {
    	source: "iana"
    },
    	"application/vnd.oipf.dae.svg+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oipf.dae.xhtml+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oipf.mippvcontrolmessage+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oipf.pae.gem": {
    	source: "iana"
    },
    	"application/vnd.oipf.spdiscovery+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oipf.spdlist+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oipf.ueprofile+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oipf.userprofile+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.olpc-sugar": {
    	source: "iana",
    	extensions: [
    		"xo"
    	]
    },
    	"application/vnd.oma-scws-config": {
    	source: "iana"
    },
    	"application/vnd.oma-scws-http-request": {
    	source: "iana"
    },
    	"application/vnd.oma-scws-http-response": {
    	source: "iana"
    },
    	"application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.bcast.drm-trigger+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.bcast.imd+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.bcast.ltkm": {
    	source: "iana"
    },
    	"application/vnd.oma.bcast.notification+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.bcast.provisioningtrigger": {
    	source: "iana"
    },
    	"application/vnd.oma.bcast.sgboot": {
    	source: "iana"
    },
    	"application/vnd.oma.bcast.sgdd+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.bcast.sgdu": {
    	source: "iana"
    },
    	"application/vnd.oma.bcast.simple-symbol-container": {
    	source: "iana"
    },
    	"application/vnd.oma.bcast.smartcard-trigger+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.bcast.sprov+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.bcast.stkm": {
    	source: "iana"
    },
    	"application/vnd.oma.cab-address-book+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.cab-feature-handler+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.cab-pcc+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.cab-subs-invite+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.cab-user-prefs+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.dcd": {
    	source: "iana"
    },
    	"application/vnd.oma.dcdc": {
    	source: "iana"
    },
    	"application/vnd.oma.dd2+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"dd2"
    	]
    },
    	"application/vnd.oma.drm.risd+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.group-usage-list+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.lwm2m+cbor": {
    	source: "iana"
    },
    	"application/vnd.oma.lwm2m+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.lwm2m+tlv": {
    	source: "iana"
    },
    	"application/vnd.oma.pal+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.poc.detailed-progress-report+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.poc.final-report+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.poc.groups+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.poc.invocation-descriptor+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.poc.optimized-progress-report+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.push": {
    	source: "iana"
    },
    	"application/vnd.oma.scidm.messages+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oma.xcap-directory+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.omads-email+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/vnd.omads-file+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/vnd.omads-folder+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/vnd.omaloc-supl-init": {
    	source: "iana"
    },
    	"application/vnd.onepager": {
    	source: "iana"
    },
    	"application/vnd.onepagertamp": {
    	source: "iana"
    },
    	"application/vnd.onepagertamx": {
    	source: "iana"
    },
    	"application/vnd.onepagertat": {
    	source: "iana"
    },
    	"application/vnd.onepagertatp": {
    	source: "iana"
    },
    	"application/vnd.onepagertatx": {
    	source: "iana"
    },
    	"application/vnd.openblox.game+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"obgx"
    	]
    },
    	"application/vnd.openblox.game-binary": {
    	source: "iana"
    },
    	"application/vnd.openeye.oeb": {
    	source: "iana"
    },
    	"application/vnd.openofficeorg.extension": {
    	source: "apache",
    	extensions: [
    		"oxt"
    	]
    },
    	"application/vnd.openstreetmap.data+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"osm"
    	]
    },
    	"application/vnd.opentimestamps.ots": {
    	source: "iana"
    },
    	"application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.drawing+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"pptx"
    	]
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.slide": {
    	source: "iana",
    	extensions: [
    		"sldx"
    	]
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    	source: "iana",
    	extensions: [
    		"ppsx"
    	]
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.template": {
    	source: "iana",
    	extensions: [
    		"potx"
    	]
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"xlsx"
    	]
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    	source: "iana",
    	extensions: [
    		"xltx"
    	]
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.theme+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.vmldrawing": {
    	source: "iana"
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"docx"
    	]
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    	source: "iana",
    	extensions: [
    		"dotx"
    	]
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-package.core-properties+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.openxmlformats-package.relationships+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oracle.resource+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.orange.indata": {
    	source: "iana"
    },
    	"application/vnd.osa.netdeploy": {
    	source: "iana"
    },
    	"application/vnd.osgeo.mapguide.package": {
    	source: "iana",
    	extensions: [
    		"mgp"
    	]
    },
    	"application/vnd.osgi.bundle": {
    	source: "iana"
    },
    	"application/vnd.osgi.dp": {
    	source: "iana",
    	extensions: [
    		"dp"
    	]
    },
    	"application/vnd.osgi.subsystem": {
    	source: "iana",
    	extensions: [
    		"esa"
    	]
    },
    	"application/vnd.otps.ct-kip+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.oxli.countgraph": {
    	source: "iana"
    },
    	"application/vnd.pagerduty+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.palm": {
    	source: "iana",
    	extensions: [
    		"pdb",
    		"pqa",
    		"oprc"
    	]
    },
    	"application/vnd.panoply": {
    	source: "iana"
    },
    	"application/vnd.paos.xml": {
    	source: "iana"
    },
    	"application/vnd.patentdive": {
    	source: "iana"
    },
    	"application/vnd.patientecommsdoc": {
    	source: "iana"
    },
    	"application/vnd.pawaafile": {
    	source: "iana",
    	extensions: [
    		"paw"
    	]
    },
    	"application/vnd.pcos": {
    	source: "iana"
    },
    	"application/vnd.pg.format": {
    	source: "iana",
    	extensions: [
    		"str"
    	]
    },
    	"application/vnd.pg.osasli": {
    	source: "iana",
    	extensions: [
    		"ei6"
    	]
    },
    	"application/vnd.piaccess.application-licence": {
    	source: "iana"
    },
    	"application/vnd.picsel": {
    	source: "iana",
    	extensions: [
    		"efif"
    	]
    },
    	"application/vnd.pmi.widget": {
    	source: "iana",
    	extensions: [
    		"wg"
    	]
    },
    	"application/vnd.poc.group-advertisement+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.pocketlearn": {
    	source: "iana",
    	extensions: [
    		"plf"
    	]
    },
    	"application/vnd.powerbuilder6": {
    	source: "iana",
    	extensions: [
    		"pbd"
    	]
    },
    	"application/vnd.powerbuilder6-s": {
    	source: "iana"
    },
    	"application/vnd.powerbuilder7": {
    	source: "iana"
    },
    	"application/vnd.powerbuilder7-s": {
    	source: "iana"
    },
    	"application/vnd.powerbuilder75": {
    	source: "iana"
    },
    	"application/vnd.powerbuilder75-s": {
    	source: "iana"
    },
    	"application/vnd.preminet": {
    	source: "iana"
    },
    	"application/vnd.previewsystems.box": {
    	source: "iana",
    	extensions: [
    		"box"
    	]
    },
    	"application/vnd.proteus.magazine": {
    	source: "iana",
    	extensions: [
    		"mgz"
    	]
    },
    	"application/vnd.psfs": {
    	source: "iana"
    },
    	"application/vnd.publishare-delta-tree": {
    	source: "iana",
    	extensions: [
    		"qps"
    	]
    },
    	"application/vnd.pvi.ptid1": {
    	source: "iana",
    	extensions: [
    		"ptid"
    	]
    },
    	"application/vnd.pwg-multiplexed": {
    	source: "iana"
    },
    	"application/vnd.pwg-xhtml-print+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.qualcomm.brew-app-res": {
    	source: "iana"
    },
    	"application/vnd.quarantainenet": {
    	source: "iana"
    },
    	"application/vnd.quark.quarkxpress": {
    	source: "iana",
    	extensions: [
    		"qxd",
    		"qxt",
    		"qwd",
    		"qwt",
    		"qxl",
    		"qxb"
    	]
    },
    	"application/vnd.quobject-quoxdocument": {
    	source: "iana"
    },
    	"application/vnd.radisys.moml+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml-audit+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml-audit-conf+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml-audit-conn+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml-audit-dialog+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml-audit-stream+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml-conf+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml-dialog+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml-dialog-base+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml-dialog-fax-detect+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml-dialog-group+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml-dialog-speech+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.radisys.msml-dialog-transform+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.rainstor.data": {
    	source: "iana"
    },
    	"application/vnd.rapid": {
    	source: "iana"
    },
    	"application/vnd.rar": {
    	source: "iana",
    	extensions: [
    		"rar"
    	]
    },
    	"application/vnd.realvnc.bed": {
    	source: "iana",
    	extensions: [
    		"bed"
    	]
    },
    	"application/vnd.recordare.musicxml": {
    	source: "iana",
    	extensions: [
    		"mxl"
    	]
    },
    	"application/vnd.recordare.musicxml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"musicxml"
    	]
    },
    	"application/vnd.renlearn.rlprint": {
    	source: "iana"
    },
    	"application/vnd.resilient.logic": {
    	source: "iana"
    },
    	"application/vnd.restful+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.rig.cryptonote": {
    	source: "iana",
    	extensions: [
    		"cryptonote"
    	]
    },
    	"application/vnd.rim.cod": {
    	source: "apache",
    	extensions: [
    		"cod"
    	]
    },
    	"application/vnd.rn-realmedia": {
    	source: "apache",
    	extensions: [
    		"rm"
    	]
    },
    	"application/vnd.rn-realmedia-vbr": {
    	source: "apache",
    	extensions: [
    		"rmvb"
    	]
    },
    	"application/vnd.route66.link66+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"link66"
    	]
    },
    	"application/vnd.rs-274x": {
    	source: "iana"
    },
    	"application/vnd.ruckus.download": {
    	source: "iana"
    },
    	"application/vnd.s3sms": {
    	source: "iana"
    },
    	"application/vnd.sailingtracker.track": {
    	source: "iana",
    	extensions: [
    		"st"
    	]
    },
    	"application/vnd.sar": {
    	source: "iana"
    },
    	"application/vnd.sbm.cid": {
    	source: "iana"
    },
    	"application/vnd.sbm.mid2": {
    	source: "iana"
    },
    	"application/vnd.scribus": {
    	source: "iana"
    },
    	"application/vnd.sealed.3df": {
    	source: "iana"
    },
    	"application/vnd.sealed.csf": {
    	source: "iana"
    },
    	"application/vnd.sealed.doc": {
    	source: "iana"
    },
    	"application/vnd.sealed.eml": {
    	source: "iana"
    },
    	"application/vnd.sealed.mht": {
    	source: "iana"
    },
    	"application/vnd.sealed.net": {
    	source: "iana"
    },
    	"application/vnd.sealed.ppt": {
    	source: "iana"
    },
    	"application/vnd.sealed.tiff": {
    	source: "iana"
    },
    	"application/vnd.sealed.xls": {
    	source: "iana"
    },
    	"application/vnd.sealedmedia.softseal.html": {
    	source: "iana"
    },
    	"application/vnd.sealedmedia.softseal.pdf": {
    	source: "iana"
    },
    	"application/vnd.seemail": {
    	source: "iana",
    	extensions: [
    		"see"
    	]
    },
    	"application/vnd.seis+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.sema": {
    	source: "iana",
    	extensions: [
    		"sema"
    	]
    },
    	"application/vnd.semd": {
    	source: "iana",
    	extensions: [
    		"semd"
    	]
    },
    	"application/vnd.semf": {
    	source: "iana",
    	extensions: [
    		"semf"
    	]
    },
    	"application/vnd.shade-save-file": {
    	source: "iana"
    },
    	"application/vnd.shana.informed.formdata": {
    	source: "iana",
    	extensions: [
    		"ifm"
    	]
    },
    	"application/vnd.shana.informed.formtemplate": {
    	source: "iana",
    	extensions: [
    		"itp"
    	]
    },
    	"application/vnd.shana.informed.interchange": {
    	source: "iana",
    	extensions: [
    		"iif"
    	]
    },
    	"application/vnd.shana.informed.package": {
    	source: "iana",
    	extensions: [
    		"ipk"
    	]
    },
    	"application/vnd.shootproof+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.shopkick+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.shp": {
    	source: "iana"
    },
    	"application/vnd.shx": {
    	source: "iana"
    },
    	"application/vnd.sigrok.session": {
    	source: "iana"
    },
    	"application/vnd.simtech-mindmapper": {
    	source: "iana",
    	extensions: [
    		"twd",
    		"twds"
    	]
    },
    	"application/vnd.siren+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.smaf": {
    	source: "iana",
    	extensions: [
    		"mmf"
    	]
    },
    	"application/vnd.smart.notebook": {
    	source: "iana"
    },
    	"application/vnd.smart.teacher": {
    	source: "iana",
    	extensions: [
    		"teacher"
    	]
    },
    	"application/vnd.snesdev-page-table": {
    	source: "iana"
    },
    	"application/vnd.software602.filler.form+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"fo"
    	]
    },
    	"application/vnd.software602.filler.form-xml-zip": {
    	source: "iana"
    },
    	"application/vnd.solent.sdkm+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"sdkm",
    		"sdkd"
    	]
    },
    	"application/vnd.spotfire.dxp": {
    	source: "iana",
    	extensions: [
    		"dxp"
    	]
    },
    	"application/vnd.spotfire.sfs": {
    	source: "iana",
    	extensions: [
    		"sfs"
    	]
    },
    	"application/vnd.sqlite3": {
    	source: "iana"
    },
    	"application/vnd.sss-cod": {
    	source: "iana"
    },
    	"application/vnd.sss-dtf": {
    	source: "iana"
    },
    	"application/vnd.sss-ntf": {
    	source: "iana"
    },
    	"application/vnd.stardivision.calc": {
    	source: "apache",
    	extensions: [
    		"sdc"
    	]
    },
    	"application/vnd.stardivision.draw": {
    	source: "apache",
    	extensions: [
    		"sda"
    	]
    },
    	"application/vnd.stardivision.impress": {
    	source: "apache",
    	extensions: [
    		"sdd"
    	]
    },
    	"application/vnd.stardivision.math": {
    	source: "apache",
    	extensions: [
    		"smf"
    	]
    },
    	"application/vnd.stardivision.writer": {
    	source: "apache",
    	extensions: [
    		"sdw",
    		"vor"
    	]
    },
    	"application/vnd.stardivision.writer-global": {
    	source: "apache",
    	extensions: [
    		"sgl"
    	]
    },
    	"application/vnd.stepmania.package": {
    	source: "iana",
    	extensions: [
    		"smzip"
    	]
    },
    	"application/vnd.stepmania.stepchart": {
    	source: "iana",
    	extensions: [
    		"sm"
    	]
    },
    	"application/vnd.street-stream": {
    	source: "iana"
    },
    	"application/vnd.sun.wadl+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"wadl"
    	]
    },
    	"application/vnd.sun.xml.calc": {
    	source: "apache",
    	extensions: [
    		"sxc"
    	]
    },
    	"application/vnd.sun.xml.calc.template": {
    	source: "apache",
    	extensions: [
    		"stc"
    	]
    },
    	"application/vnd.sun.xml.draw": {
    	source: "apache",
    	extensions: [
    		"sxd"
    	]
    },
    	"application/vnd.sun.xml.draw.template": {
    	source: "apache",
    	extensions: [
    		"std"
    	]
    },
    	"application/vnd.sun.xml.impress": {
    	source: "apache",
    	extensions: [
    		"sxi"
    	]
    },
    	"application/vnd.sun.xml.impress.template": {
    	source: "apache",
    	extensions: [
    		"sti"
    	]
    },
    	"application/vnd.sun.xml.math": {
    	source: "apache",
    	extensions: [
    		"sxm"
    	]
    },
    	"application/vnd.sun.xml.writer": {
    	source: "apache",
    	extensions: [
    		"sxw"
    	]
    },
    	"application/vnd.sun.xml.writer.global": {
    	source: "apache",
    	extensions: [
    		"sxg"
    	]
    },
    	"application/vnd.sun.xml.writer.template": {
    	source: "apache",
    	extensions: [
    		"stw"
    	]
    },
    	"application/vnd.sus-calendar": {
    	source: "iana",
    	extensions: [
    		"sus",
    		"susp"
    	]
    },
    	"application/vnd.svd": {
    	source: "iana",
    	extensions: [
    		"svd"
    	]
    },
    	"application/vnd.swiftview-ics": {
    	source: "iana"
    },
    	"application/vnd.sycle+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.syft+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.symbian.install": {
    	source: "apache",
    	extensions: [
    		"sis",
    		"sisx"
    	]
    },
    	"application/vnd.syncml+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true,
    	extensions: [
    		"xsm"
    	]
    },
    	"application/vnd.syncml.dm+wbxml": {
    	source: "iana",
    	charset: "UTF-8",
    	extensions: [
    		"bdm"
    	]
    },
    	"application/vnd.syncml.dm+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true,
    	extensions: [
    		"xdm"
    	]
    },
    	"application/vnd.syncml.dm.notification": {
    	source: "iana"
    },
    	"application/vnd.syncml.dmddf+wbxml": {
    	source: "iana"
    },
    	"application/vnd.syncml.dmddf+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true,
    	extensions: [
    		"ddf"
    	]
    },
    	"application/vnd.syncml.dmtnds+wbxml": {
    	source: "iana"
    },
    	"application/vnd.syncml.dmtnds+xml": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true
    },
    	"application/vnd.syncml.ds.notification": {
    	source: "iana"
    },
    	"application/vnd.tableschema+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.tao.intent-module-archive": {
    	source: "iana",
    	extensions: [
    		"tao"
    	]
    },
    	"application/vnd.tcpdump.pcap": {
    	source: "iana",
    	extensions: [
    		"pcap",
    		"cap",
    		"dmp"
    	]
    },
    	"application/vnd.think-cell.ppttc+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.tmd.mediaflex.api+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.tml": {
    	source: "iana"
    },
    	"application/vnd.tmobile-livetv": {
    	source: "iana",
    	extensions: [
    		"tmo"
    	]
    },
    	"application/vnd.tri.onesource": {
    	source: "iana"
    },
    	"application/vnd.trid.tpt": {
    	source: "iana",
    	extensions: [
    		"tpt"
    	]
    },
    	"application/vnd.triscape.mxs": {
    	source: "iana",
    	extensions: [
    		"mxs"
    	]
    },
    	"application/vnd.trueapp": {
    	source: "iana",
    	extensions: [
    		"tra"
    	]
    },
    	"application/vnd.truedoc": {
    	source: "iana"
    },
    	"application/vnd.ubisoft.webplayer": {
    	source: "iana"
    },
    	"application/vnd.ufdl": {
    	source: "iana",
    	extensions: [
    		"ufd",
    		"ufdl"
    	]
    },
    	"application/vnd.uiq.theme": {
    	source: "iana",
    	extensions: [
    		"utz"
    	]
    },
    	"application/vnd.umajin": {
    	source: "iana",
    	extensions: [
    		"umj"
    	]
    },
    	"application/vnd.unity": {
    	source: "iana",
    	extensions: [
    		"unityweb"
    	]
    },
    	"application/vnd.uoml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"uoml"
    	]
    },
    	"application/vnd.uplanet.alert": {
    	source: "iana"
    },
    	"application/vnd.uplanet.alert-wbxml": {
    	source: "iana"
    },
    	"application/vnd.uplanet.bearer-choice": {
    	source: "iana"
    },
    	"application/vnd.uplanet.bearer-choice-wbxml": {
    	source: "iana"
    },
    	"application/vnd.uplanet.cacheop": {
    	source: "iana"
    },
    	"application/vnd.uplanet.cacheop-wbxml": {
    	source: "iana"
    },
    	"application/vnd.uplanet.channel": {
    	source: "iana"
    },
    	"application/vnd.uplanet.channel-wbxml": {
    	source: "iana"
    },
    	"application/vnd.uplanet.list": {
    	source: "iana"
    },
    	"application/vnd.uplanet.list-wbxml": {
    	source: "iana"
    },
    	"application/vnd.uplanet.listcmd": {
    	source: "iana"
    },
    	"application/vnd.uplanet.listcmd-wbxml": {
    	source: "iana"
    },
    	"application/vnd.uplanet.signal": {
    	source: "iana"
    },
    	"application/vnd.uri-map": {
    	source: "iana"
    },
    	"application/vnd.valve.source.material": {
    	source: "iana"
    },
    	"application/vnd.vcx": {
    	source: "iana",
    	extensions: [
    		"vcx"
    	]
    },
    	"application/vnd.vd-study": {
    	source: "iana"
    },
    	"application/vnd.vectorworks": {
    	source: "iana"
    },
    	"application/vnd.vel+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.verimatrix.vcas": {
    	source: "iana"
    },
    	"application/vnd.veritone.aion+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.veryant.thin": {
    	source: "iana"
    },
    	"application/vnd.ves.encrypted": {
    	source: "iana"
    },
    	"application/vnd.vidsoft.vidconference": {
    	source: "iana"
    },
    	"application/vnd.visio": {
    	source: "iana",
    	extensions: [
    		"vsd",
    		"vst",
    		"vss",
    		"vsw"
    	]
    },
    	"application/vnd.visionary": {
    	source: "iana",
    	extensions: [
    		"vis"
    	]
    },
    	"application/vnd.vividence.scriptfile": {
    	source: "iana"
    },
    	"application/vnd.vsf": {
    	source: "iana",
    	extensions: [
    		"vsf"
    	]
    },
    	"application/vnd.wap.sic": {
    	source: "iana"
    },
    	"application/vnd.wap.slc": {
    	source: "iana"
    },
    	"application/vnd.wap.wbxml": {
    	source: "iana",
    	charset: "UTF-8",
    	extensions: [
    		"wbxml"
    	]
    },
    	"application/vnd.wap.wmlc": {
    	source: "iana",
    	extensions: [
    		"wmlc"
    	]
    },
    	"application/vnd.wap.wmlscriptc": {
    	source: "iana",
    	extensions: [
    		"wmlsc"
    	]
    },
    	"application/vnd.webturbo": {
    	source: "iana",
    	extensions: [
    		"wtb"
    	]
    },
    	"application/vnd.wfa.dpp": {
    	source: "iana"
    },
    	"application/vnd.wfa.p2p": {
    	source: "iana"
    },
    	"application/vnd.wfa.wsc": {
    	source: "iana"
    },
    	"application/vnd.windows.devicepairing": {
    	source: "iana"
    },
    	"application/vnd.wmc": {
    	source: "iana"
    },
    	"application/vnd.wmf.bootstrap": {
    	source: "iana"
    },
    	"application/vnd.wolfram.mathematica": {
    	source: "iana"
    },
    	"application/vnd.wolfram.mathematica.package": {
    	source: "iana"
    },
    	"application/vnd.wolfram.player": {
    	source: "iana",
    	extensions: [
    		"nbp"
    	]
    },
    	"application/vnd.wordperfect": {
    	source: "iana",
    	extensions: [
    		"wpd"
    	]
    },
    	"application/vnd.wqd": {
    	source: "iana",
    	extensions: [
    		"wqd"
    	]
    },
    	"application/vnd.wrq-hp3000-labelled": {
    	source: "iana"
    },
    	"application/vnd.wt.stf": {
    	source: "iana",
    	extensions: [
    		"stf"
    	]
    },
    	"application/vnd.wv.csp+wbxml": {
    	source: "iana"
    },
    	"application/vnd.wv.csp+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.wv.ssp+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.xacml+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.xara": {
    	source: "iana",
    	extensions: [
    		"xar"
    	]
    },
    	"application/vnd.xfdl": {
    	source: "iana",
    	extensions: [
    		"xfdl"
    	]
    },
    	"application/vnd.xfdl.webform": {
    	source: "iana"
    },
    	"application/vnd.xmi+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/vnd.xmpie.cpkg": {
    	source: "iana"
    },
    	"application/vnd.xmpie.dpkg": {
    	source: "iana"
    },
    	"application/vnd.xmpie.plan": {
    	source: "iana"
    },
    	"application/vnd.xmpie.ppkg": {
    	source: "iana"
    },
    	"application/vnd.xmpie.xlim": {
    	source: "iana"
    },
    	"application/vnd.yamaha.hv-dic": {
    	source: "iana",
    	extensions: [
    		"hvd"
    	]
    },
    	"application/vnd.yamaha.hv-script": {
    	source: "iana",
    	extensions: [
    		"hvs"
    	]
    },
    	"application/vnd.yamaha.hv-voice": {
    	source: "iana",
    	extensions: [
    		"hvp"
    	]
    },
    	"application/vnd.yamaha.openscoreformat": {
    	source: "iana",
    	extensions: [
    		"osf"
    	]
    },
    	"application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"osfpvg"
    	]
    },
    	"application/vnd.yamaha.remote-setup": {
    	source: "iana"
    },
    	"application/vnd.yamaha.smaf-audio": {
    	source: "iana",
    	extensions: [
    		"saf"
    	]
    },
    	"application/vnd.yamaha.smaf-phrase": {
    	source: "iana",
    	extensions: [
    		"spf"
    	]
    },
    	"application/vnd.yamaha.through-ngn": {
    	source: "iana"
    },
    	"application/vnd.yamaha.tunnel-udpencap": {
    	source: "iana"
    },
    	"application/vnd.yaoweme": {
    	source: "iana"
    },
    	"application/vnd.yellowriver-custom-menu": {
    	source: "iana",
    	extensions: [
    		"cmp"
    	]
    },
    	"application/vnd.youtube.yt": {
    	source: "iana"
    },
    	"application/vnd.zul": {
    	source: "iana",
    	extensions: [
    		"zir",
    		"zirz"
    	]
    },
    	"application/vnd.zzazz.deck+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"zaz"
    	]
    },
    	"application/voicexml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"vxml"
    	]
    },
    	"application/voucher-cms+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/vq-rtcpxr": {
    	source: "iana"
    },
    	"application/wasm": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"wasm"
    	]
    },
    	"application/watcherinfo+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"wif"
    	]
    },
    	"application/webpush-options+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/whoispp-query": {
    	source: "iana"
    },
    	"application/whoispp-response": {
    	source: "iana"
    },
    	"application/widget": {
    	source: "iana",
    	extensions: [
    		"wgt"
    	]
    },
    	"application/winhlp": {
    	source: "apache",
    	extensions: [
    		"hlp"
    	]
    },
    	"application/wita": {
    	source: "iana"
    },
    	"application/wordperfect5.1": {
    	source: "iana"
    },
    	"application/wsdl+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"wsdl"
    	]
    },
    	"application/wspolicy+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"wspolicy"
    	]
    },
    	"application/x-7z-compressed": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"7z"
    	]
    },
    	"application/x-abiword": {
    	source: "apache",
    	extensions: [
    		"abw"
    	]
    },
    	"application/x-ace-compressed": {
    	source: "apache",
    	extensions: [
    		"ace"
    	]
    },
    	"application/x-amf": {
    	source: "apache"
    },
    	"application/x-apple-diskimage": {
    	source: "apache",
    	extensions: [
    		"dmg"
    	]
    },
    	"application/x-arj": {
    	compressible: false,
    	extensions: [
    		"arj"
    	]
    },
    	"application/x-authorware-bin": {
    	source: "apache",
    	extensions: [
    		"aab",
    		"x32",
    		"u32",
    		"vox"
    	]
    },
    	"application/x-authorware-map": {
    	source: "apache",
    	extensions: [
    		"aam"
    	]
    },
    	"application/x-authorware-seg": {
    	source: "apache",
    	extensions: [
    		"aas"
    	]
    },
    	"application/x-bcpio": {
    	source: "apache",
    	extensions: [
    		"bcpio"
    	]
    },
    	"application/x-bdoc": {
    	compressible: false,
    	extensions: [
    		"bdoc"
    	]
    },
    	"application/x-bittorrent": {
    	source: "apache",
    	extensions: [
    		"torrent"
    	]
    },
    	"application/x-blorb": {
    	source: "apache",
    	extensions: [
    		"blb",
    		"blorb"
    	]
    },
    	"application/x-bzip": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"bz"
    	]
    },
    	"application/x-bzip2": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"bz2",
    		"boz"
    	]
    },
    	"application/x-cbr": {
    	source: "apache",
    	extensions: [
    		"cbr",
    		"cba",
    		"cbt",
    		"cbz",
    		"cb7"
    	]
    },
    	"application/x-cdlink": {
    	source: "apache",
    	extensions: [
    		"vcd"
    	]
    },
    	"application/x-cfs-compressed": {
    	source: "apache",
    	extensions: [
    		"cfs"
    	]
    },
    	"application/x-chat": {
    	source: "apache",
    	extensions: [
    		"chat"
    	]
    },
    	"application/x-chess-pgn": {
    	source: "apache",
    	extensions: [
    		"pgn"
    	]
    },
    	"application/x-chrome-extension": {
    	extensions: [
    		"crx"
    	]
    },
    	"application/x-cocoa": {
    	source: "nginx",
    	extensions: [
    		"cco"
    	]
    },
    	"application/x-compress": {
    	source: "apache"
    },
    	"application/x-conference": {
    	source: "apache",
    	extensions: [
    		"nsc"
    	]
    },
    	"application/x-cpio": {
    	source: "apache",
    	extensions: [
    		"cpio"
    	]
    },
    	"application/x-csh": {
    	source: "apache",
    	extensions: [
    		"csh"
    	]
    },
    	"application/x-deb": {
    	compressible: false
    },
    	"application/x-debian-package": {
    	source: "apache",
    	extensions: [
    		"deb",
    		"udeb"
    	]
    },
    	"application/x-dgc-compressed": {
    	source: "apache",
    	extensions: [
    		"dgc"
    	]
    },
    	"application/x-director": {
    	source: "apache",
    	extensions: [
    		"dir",
    		"dcr",
    		"dxr",
    		"cst",
    		"cct",
    		"cxt",
    		"w3d",
    		"fgd",
    		"swa"
    	]
    },
    	"application/x-doom": {
    	source: "apache",
    	extensions: [
    		"wad"
    	]
    },
    	"application/x-dtbncx+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"ncx"
    	]
    },
    	"application/x-dtbook+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"dtb"
    	]
    },
    	"application/x-dtbresource+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"res"
    	]
    },
    	"application/x-dvi": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"dvi"
    	]
    },
    	"application/x-envoy": {
    	source: "apache",
    	extensions: [
    		"evy"
    	]
    },
    	"application/x-eva": {
    	source: "apache",
    	extensions: [
    		"eva"
    	]
    },
    	"application/x-font-bdf": {
    	source: "apache",
    	extensions: [
    		"bdf"
    	]
    },
    	"application/x-font-dos": {
    	source: "apache"
    },
    	"application/x-font-framemaker": {
    	source: "apache"
    },
    	"application/x-font-ghostscript": {
    	source: "apache",
    	extensions: [
    		"gsf"
    	]
    },
    	"application/x-font-libgrx": {
    	source: "apache"
    },
    	"application/x-font-linux-psf": {
    	source: "apache",
    	extensions: [
    		"psf"
    	]
    },
    	"application/x-font-pcf": {
    	source: "apache",
    	extensions: [
    		"pcf"
    	]
    },
    	"application/x-font-snf": {
    	source: "apache",
    	extensions: [
    		"snf"
    	]
    },
    	"application/x-font-speedo": {
    	source: "apache"
    },
    	"application/x-font-sunos-news": {
    	source: "apache"
    },
    	"application/x-font-type1": {
    	source: "apache",
    	extensions: [
    		"pfa",
    		"pfb",
    		"pfm",
    		"afm"
    	]
    },
    	"application/x-font-vfont": {
    	source: "apache"
    },
    	"application/x-freearc": {
    	source: "apache",
    	extensions: [
    		"arc"
    	]
    },
    	"application/x-futuresplash": {
    	source: "apache",
    	extensions: [
    		"spl"
    	]
    },
    	"application/x-gca-compressed": {
    	source: "apache",
    	extensions: [
    		"gca"
    	]
    },
    	"application/x-glulx": {
    	source: "apache",
    	extensions: [
    		"ulx"
    	]
    },
    	"application/x-gnumeric": {
    	source: "apache",
    	extensions: [
    		"gnumeric"
    	]
    },
    	"application/x-gramps-xml": {
    	source: "apache",
    	extensions: [
    		"gramps"
    	]
    },
    	"application/x-gtar": {
    	source: "apache",
    	extensions: [
    		"gtar"
    	]
    },
    	"application/x-gzip": {
    	source: "apache"
    },
    	"application/x-hdf": {
    	source: "apache",
    	extensions: [
    		"hdf"
    	]
    },
    	"application/x-httpd-php": {
    	compressible: true,
    	extensions: [
    		"php"
    	]
    },
    	"application/x-install-instructions": {
    	source: "apache",
    	extensions: [
    		"install"
    	]
    },
    	"application/x-iso9660-image": {
    	source: "apache",
    	extensions: [
    		"iso"
    	]
    },
    	"application/x-iwork-keynote-sffkey": {
    	extensions: [
    		"key"
    	]
    },
    	"application/x-iwork-numbers-sffnumbers": {
    	extensions: [
    		"numbers"
    	]
    },
    	"application/x-iwork-pages-sffpages": {
    	extensions: [
    		"pages"
    	]
    },
    	"application/x-java-archive-diff": {
    	source: "nginx",
    	extensions: [
    		"jardiff"
    	]
    },
    	"application/x-java-jnlp-file": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"jnlp"
    	]
    },
    	"application/x-javascript": {
    	compressible: true
    },
    	"application/x-keepass2": {
    	extensions: [
    		"kdbx"
    	]
    },
    	"application/x-latex": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"latex"
    	]
    },
    	"application/x-lua-bytecode": {
    	extensions: [
    		"luac"
    	]
    },
    	"application/x-lzh-compressed": {
    	source: "apache",
    	extensions: [
    		"lzh",
    		"lha"
    	]
    },
    	"application/x-makeself": {
    	source: "nginx",
    	extensions: [
    		"run"
    	]
    },
    	"application/x-mie": {
    	source: "apache",
    	extensions: [
    		"mie"
    	]
    },
    	"application/x-mobipocket-ebook": {
    	source: "apache",
    	extensions: [
    		"prc",
    		"mobi"
    	]
    },
    	"application/x-mpegurl": {
    	compressible: false
    },
    	"application/x-ms-application": {
    	source: "apache",
    	extensions: [
    		"application"
    	]
    },
    	"application/x-ms-shortcut": {
    	source: "apache",
    	extensions: [
    		"lnk"
    	]
    },
    	"application/x-ms-wmd": {
    	source: "apache",
    	extensions: [
    		"wmd"
    	]
    },
    	"application/x-ms-wmz": {
    	source: "apache",
    	extensions: [
    		"wmz"
    	]
    },
    	"application/x-ms-xbap": {
    	source: "apache",
    	extensions: [
    		"xbap"
    	]
    },
    	"application/x-msaccess": {
    	source: "apache",
    	extensions: [
    		"mdb"
    	]
    },
    	"application/x-msbinder": {
    	source: "apache",
    	extensions: [
    		"obd"
    	]
    },
    	"application/x-mscardfile": {
    	source: "apache",
    	extensions: [
    		"crd"
    	]
    },
    	"application/x-msclip": {
    	source: "apache",
    	extensions: [
    		"clp"
    	]
    },
    	"application/x-msdos-program": {
    	extensions: [
    		"exe"
    	]
    },
    	"application/x-msdownload": {
    	source: "apache",
    	extensions: [
    		"exe",
    		"dll",
    		"com",
    		"bat",
    		"msi"
    	]
    },
    	"application/x-msmediaview": {
    	source: "apache",
    	extensions: [
    		"mvb",
    		"m13",
    		"m14"
    	]
    },
    	"application/x-msmetafile": {
    	source: "apache",
    	extensions: [
    		"wmf",
    		"wmz",
    		"emf",
    		"emz"
    	]
    },
    	"application/x-msmoney": {
    	source: "apache",
    	extensions: [
    		"mny"
    	]
    },
    	"application/x-mspublisher": {
    	source: "apache",
    	extensions: [
    		"pub"
    	]
    },
    	"application/x-msschedule": {
    	source: "apache",
    	extensions: [
    		"scd"
    	]
    },
    	"application/x-msterminal": {
    	source: "apache",
    	extensions: [
    		"trm"
    	]
    },
    	"application/x-mswrite": {
    	source: "apache",
    	extensions: [
    		"wri"
    	]
    },
    	"application/x-netcdf": {
    	source: "apache",
    	extensions: [
    		"nc",
    		"cdf"
    	]
    },
    	"application/x-ns-proxy-autoconfig": {
    	compressible: true,
    	extensions: [
    		"pac"
    	]
    },
    	"application/x-nzb": {
    	source: "apache",
    	extensions: [
    		"nzb"
    	]
    },
    	"application/x-perl": {
    	source: "nginx",
    	extensions: [
    		"pl",
    		"pm"
    	]
    },
    	"application/x-pilot": {
    	source: "nginx",
    	extensions: [
    		"prc",
    		"pdb"
    	]
    },
    	"application/x-pkcs12": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"p12",
    		"pfx"
    	]
    },
    	"application/x-pkcs7-certificates": {
    	source: "apache",
    	extensions: [
    		"p7b",
    		"spc"
    	]
    },
    	"application/x-pkcs7-certreqresp": {
    	source: "apache",
    	extensions: [
    		"p7r"
    	]
    },
    	"application/x-pki-message": {
    	source: "iana"
    },
    	"application/x-rar-compressed": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"rar"
    	]
    },
    	"application/x-redhat-package-manager": {
    	source: "nginx",
    	extensions: [
    		"rpm"
    	]
    },
    	"application/x-research-info-systems": {
    	source: "apache",
    	extensions: [
    		"ris"
    	]
    },
    	"application/x-sea": {
    	source: "nginx",
    	extensions: [
    		"sea"
    	]
    },
    	"application/x-sh": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"sh"
    	]
    },
    	"application/x-shar": {
    	source: "apache",
    	extensions: [
    		"shar"
    	]
    },
    	"application/x-shockwave-flash": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"swf"
    	]
    },
    	"application/x-silverlight-app": {
    	source: "apache",
    	extensions: [
    		"xap"
    	]
    },
    	"application/x-sql": {
    	source: "apache",
    	extensions: [
    		"sql"
    	]
    },
    	"application/x-stuffit": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"sit"
    	]
    },
    	"application/x-stuffitx": {
    	source: "apache",
    	extensions: [
    		"sitx"
    	]
    },
    	"application/x-subrip": {
    	source: "apache",
    	extensions: [
    		"srt"
    	]
    },
    	"application/x-sv4cpio": {
    	source: "apache",
    	extensions: [
    		"sv4cpio"
    	]
    },
    	"application/x-sv4crc": {
    	source: "apache",
    	extensions: [
    		"sv4crc"
    	]
    },
    	"application/x-t3vm-image": {
    	source: "apache",
    	extensions: [
    		"t3"
    	]
    },
    	"application/x-tads": {
    	source: "apache",
    	extensions: [
    		"gam"
    	]
    },
    	"application/x-tar": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"tar"
    	]
    },
    	"application/x-tcl": {
    	source: "apache",
    	extensions: [
    		"tcl",
    		"tk"
    	]
    },
    	"application/x-tex": {
    	source: "apache",
    	extensions: [
    		"tex"
    	]
    },
    	"application/x-tex-tfm": {
    	source: "apache",
    	extensions: [
    		"tfm"
    	]
    },
    	"application/x-texinfo": {
    	source: "apache",
    	extensions: [
    		"texinfo",
    		"texi"
    	]
    },
    	"application/x-tgif": {
    	source: "apache",
    	extensions: [
    		"obj"
    	]
    },
    	"application/x-ustar": {
    	source: "apache",
    	extensions: [
    		"ustar"
    	]
    },
    	"application/x-virtualbox-hdd": {
    	compressible: true,
    	extensions: [
    		"hdd"
    	]
    },
    	"application/x-virtualbox-ova": {
    	compressible: true,
    	extensions: [
    		"ova"
    	]
    },
    	"application/x-virtualbox-ovf": {
    	compressible: true,
    	extensions: [
    		"ovf"
    	]
    },
    	"application/x-virtualbox-vbox": {
    	compressible: true,
    	extensions: [
    		"vbox"
    	]
    },
    	"application/x-virtualbox-vbox-extpack": {
    	compressible: false,
    	extensions: [
    		"vbox-extpack"
    	]
    },
    	"application/x-virtualbox-vdi": {
    	compressible: true,
    	extensions: [
    		"vdi"
    	]
    },
    	"application/x-virtualbox-vhd": {
    	compressible: true,
    	extensions: [
    		"vhd"
    	]
    },
    	"application/x-virtualbox-vmdk": {
    	compressible: true,
    	extensions: [
    		"vmdk"
    	]
    },
    	"application/x-wais-source": {
    	source: "apache",
    	extensions: [
    		"src"
    	]
    },
    	"application/x-web-app-manifest+json": {
    	compressible: true,
    	extensions: [
    		"webapp"
    	]
    },
    	"application/x-www-form-urlencoded": {
    	source: "iana",
    	compressible: true
    },
    	"application/x-x509-ca-cert": {
    	source: "iana",
    	extensions: [
    		"der",
    		"crt",
    		"pem"
    	]
    },
    	"application/x-x509-ca-ra-cert": {
    	source: "iana"
    },
    	"application/x-x509-next-ca-cert": {
    	source: "iana"
    },
    	"application/x-xfig": {
    	source: "apache",
    	extensions: [
    		"fig"
    	]
    },
    	"application/x-xliff+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"xlf"
    	]
    },
    	"application/x-xpinstall": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"xpi"
    	]
    },
    	"application/x-xz": {
    	source: "apache",
    	extensions: [
    		"xz"
    	]
    },
    	"application/x-zmachine": {
    	source: "apache",
    	extensions: [
    		"z1",
    		"z2",
    		"z3",
    		"z4",
    		"z5",
    		"z6",
    		"z7",
    		"z8"
    	]
    },
    	"application/x400-bp": {
    	source: "iana"
    },
    	"application/xacml+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/xaml+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"xaml"
    	]
    },
    	"application/xcap-att+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xav"
    	]
    },
    	"application/xcap-caps+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xca"
    	]
    },
    	"application/xcap-diff+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xdf"
    	]
    },
    	"application/xcap-el+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xel"
    	]
    },
    	"application/xcap-error+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/xcap-ns+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xns"
    	]
    },
    	"application/xcon-conference-info+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/xcon-conference-info-diff+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/xenc+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xenc"
    	]
    },
    	"application/xhtml+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xhtml",
    		"xht"
    	]
    },
    	"application/xhtml-voice+xml": {
    	source: "apache",
    	compressible: true
    },
    	"application/xliff+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xlf"
    	]
    },
    	"application/xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xml",
    		"xsl",
    		"xsd",
    		"rng"
    	]
    },
    	"application/xml-dtd": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"dtd"
    	]
    },
    	"application/xml-external-parsed-entity": {
    	source: "iana"
    },
    	"application/xml-patch+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/xmpp+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/xop+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xop"
    	]
    },
    	"application/xproc+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"xpl"
    	]
    },
    	"application/xslt+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xsl",
    		"xslt"
    	]
    },
    	"application/xspf+xml": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"xspf"
    	]
    },
    	"application/xv+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"mxml",
    		"xhvml",
    		"xvml",
    		"xvm"
    	]
    },
    	"application/yang": {
    	source: "iana",
    	extensions: [
    		"yang"
    	]
    },
    	"application/yang-data+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/yang-data+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/yang-patch+json": {
    	source: "iana",
    	compressible: true
    },
    	"application/yang-patch+xml": {
    	source: "iana",
    	compressible: true
    },
    	"application/yin+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"yin"
    	]
    },
    	"application/zip": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"zip"
    	]
    },
    	"application/zlib": {
    	source: "iana"
    },
    	"application/zstd": {
    	source: "iana"
    },
    	"audio/1d-interleaved-parityfec": {
    	source: "iana"
    },
    	"audio/32kadpcm": {
    	source: "iana"
    },
    	"audio/3gpp": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"3gpp"
    	]
    },
    	"audio/3gpp2": {
    	source: "iana"
    },
    	"audio/aac": {
    	source: "iana"
    },
    	"audio/ac3": {
    	source: "iana"
    },
    	"audio/adpcm": {
    	source: "apache",
    	extensions: [
    		"adp"
    	]
    },
    	"audio/amr": {
    	source: "iana",
    	extensions: [
    		"amr"
    	]
    },
    	"audio/amr-wb": {
    	source: "iana"
    },
    	"audio/amr-wb+": {
    	source: "iana"
    },
    	"audio/aptx": {
    	source: "iana"
    },
    	"audio/asc": {
    	source: "iana"
    },
    	"audio/atrac-advanced-lossless": {
    	source: "iana"
    },
    	"audio/atrac-x": {
    	source: "iana"
    },
    	"audio/atrac3": {
    	source: "iana"
    },
    	"audio/basic": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"au",
    		"snd"
    	]
    },
    	"audio/bv16": {
    	source: "iana"
    },
    	"audio/bv32": {
    	source: "iana"
    },
    	"audio/clearmode": {
    	source: "iana"
    },
    	"audio/cn": {
    	source: "iana"
    },
    	"audio/dat12": {
    	source: "iana"
    },
    	"audio/dls": {
    	source: "iana"
    },
    	"audio/dsr-es201108": {
    	source: "iana"
    },
    	"audio/dsr-es202050": {
    	source: "iana"
    },
    	"audio/dsr-es202211": {
    	source: "iana"
    },
    	"audio/dsr-es202212": {
    	source: "iana"
    },
    	"audio/dv": {
    	source: "iana"
    },
    	"audio/dvi4": {
    	source: "iana"
    },
    	"audio/eac3": {
    	source: "iana"
    },
    	"audio/encaprtp": {
    	source: "iana"
    },
    	"audio/evrc": {
    	source: "iana"
    },
    	"audio/evrc-qcp": {
    	source: "iana"
    },
    	"audio/evrc0": {
    	source: "iana"
    },
    	"audio/evrc1": {
    	source: "iana"
    },
    	"audio/evrcb": {
    	source: "iana"
    },
    	"audio/evrcb0": {
    	source: "iana"
    },
    	"audio/evrcb1": {
    	source: "iana"
    },
    	"audio/evrcnw": {
    	source: "iana"
    },
    	"audio/evrcnw0": {
    	source: "iana"
    },
    	"audio/evrcnw1": {
    	source: "iana"
    },
    	"audio/evrcwb": {
    	source: "iana"
    },
    	"audio/evrcwb0": {
    	source: "iana"
    },
    	"audio/evrcwb1": {
    	source: "iana"
    },
    	"audio/evs": {
    	source: "iana"
    },
    	"audio/flexfec": {
    	source: "iana"
    },
    	"audio/fwdred": {
    	source: "iana"
    },
    	"audio/g711-0": {
    	source: "iana"
    },
    	"audio/g719": {
    	source: "iana"
    },
    	"audio/g722": {
    	source: "iana"
    },
    	"audio/g7221": {
    	source: "iana"
    },
    	"audio/g723": {
    	source: "iana"
    },
    	"audio/g726-16": {
    	source: "iana"
    },
    	"audio/g726-24": {
    	source: "iana"
    },
    	"audio/g726-32": {
    	source: "iana"
    },
    	"audio/g726-40": {
    	source: "iana"
    },
    	"audio/g728": {
    	source: "iana"
    },
    	"audio/g729": {
    	source: "iana"
    },
    	"audio/g7291": {
    	source: "iana"
    },
    	"audio/g729d": {
    	source: "iana"
    },
    	"audio/g729e": {
    	source: "iana"
    },
    	"audio/gsm": {
    	source: "iana"
    },
    	"audio/gsm-efr": {
    	source: "iana"
    },
    	"audio/gsm-hr-08": {
    	source: "iana"
    },
    	"audio/ilbc": {
    	source: "iana"
    },
    	"audio/ip-mr_v2.5": {
    	source: "iana"
    },
    	"audio/isac": {
    	source: "apache"
    },
    	"audio/l16": {
    	source: "iana"
    },
    	"audio/l20": {
    	source: "iana"
    },
    	"audio/l24": {
    	source: "iana",
    	compressible: false
    },
    	"audio/l8": {
    	source: "iana"
    },
    	"audio/lpc": {
    	source: "iana"
    },
    	"audio/melp": {
    	source: "iana"
    },
    	"audio/melp1200": {
    	source: "iana"
    },
    	"audio/melp2400": {
    	source: "iana"
    },
    	"audio/melp600": {
    	source: "iana"
    },
    	"audio/mhas": {
    	source: "iana"
    },
    	"audio/midi": {
    	source: "apache",
    	extensions: [
    		"mid",
    		"midi",
    		"kar",
    		"rmi"
    	]
    },
    	"audio/mobile-xmf": {
    	source: "iana",
    	extensions: [
    		"mxmf"
    	]
    },
    	"audio/mp3": {
    	compressible: false,
    	extensions: [
    		"mp3"
    	]
    },
    	"audio/mp4": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"m4a",
    		"mp4a"
    	]
    },
    	"audio/mp4a-latm": {
    	source: "iana"
    },
    	"audio/mpa": {
    	source: "iana"
    },
    	"audio/mpa-robust": {
    	source: "iana"
    },
    	"audio/mpeg": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"mpga",
    		"mp2",
    		"mp2a",
    		"mp3",
    		"m2a",
    		"m3a"
    	]
    },
    	"audio/mpeg4-generic": {
    	source: "iana"
    },
    	"audio/musepack": {
    	source: "apache"
    },
    	"audio/ogg": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"oga",
    		"ogg",
    		"spx",
    		"opus"
    	]
    },
    	"audio/opus": {
    	source: "iana"
    },
    	"audio/parityfec": {
    	source: "iana"
    },
    	"audio/pcma": {
    	source: "iana"
    },
    	"audio/pcma-wb": {
    	source: "iana"
    },
    	"audio/pcmu": {
    	source: "iana"
    },
    	"audio/pcmu-wb": {
    	source: "iana"
    },
    	"audio/prs.sid": {
    	source: "iana"
    },
    	"audio/qcelp": {
    	source: "iana"
    },
    	"audio/raptorfec": {
    	source: "iana"
    },
    	"audio/red": {
    	source: "iana"
    },
    	"audio/rtp-enc-aescm128": {
    	source: "iana"
    },
    	"audio/rtp-midi": {
    	source: "iana"
    },
    	"audio/rtploopback": {
    	source: "iana"
    },
    	"audio/rtx": {
    	source: "iana"
    },
    	"audio/s3m": {
    	source: "apache",
    	extensions: [
    		"s3m"
    	]
    },
    	"audio/scip": {
    	source: "iana"
    },
    	"audio/silk": {
    	source: "apache",
    	extensions: [
    		"sil"
    	]
    },
    	"audio/smv": {
    	source: "iana"
    },
    	"audio/smv-qcp": {
    	source: "iana"
    },
    	"audio/smv0": {
    	source: "iana"
    },
    	"audio/sofa": {
    	source: "iana"
    },
    	"audio/sp-midi": {
    	source: "iana"
    },
    	"audio/speex": {
    	source: "iana"
    },
    	"audio/t140c": {
    	source: "iana"
    },
    	"audio/t38": {
    	source: "iana"
    },
    	"audio/telephone-event": {
    	source: "iana"
    },
    	"audio/tetra_acelp": {
    	source: "iana"
    },
    	"audio/tetra_acelp_bb": {
    	source: "iana"
    },
    	"audio/tone": {
    	source: "iana"
    },
    	"audio/tsvcis": {
    	source: "iana"
    },
    	"audio/uemclip": {
    	source: "iana"
    },
    	"audio/ulpfec": {
    	source: "iana"
    },
    	"audio/usac": {
    	source: "iana"
    },
    	"audio/vdvi": {
    	source: "iana"
    },
    	"audio/vmr-wb": {
    	source: "iana"
    },
    	"audio/vnd.3gpp.iufp": {
    	source: "iana"
    },
    	"audio/vnd.4sb": {
    	source: "iana"
    },
    	"audio/vnd.audiokoz": {
    	source: "iana"
    },
    	"audio/vnd.celp": {
    	source: "iana"
    },
    	"audio/vnd.cisco.nse": {
    	source: "iana"
    },
    	"audio/vnd.cmles.radio-events": {
    	source: "iana"
    },
    	"audio/vnd.cns.anp1": {
    	source: "iana"
    },
    	"audio/vnd.cns.inf1": {
    	source: "iana"
    },
    	"audio/vnd.dece.audio": {
    	source: "iana",
    	extensions: [
    		"uva",
    		"uvva"
    	]
    },
    	"audio/vnd.digital-winds": {
    	source: "iana",
    	extensions: [
    		"eol"
    	]
    },
    	"audio/vnd.dlna.adts": {
    	source: "iana"
    },
    	"audio/vnd.dolby.heaac.1": {
    	source: "iana"
    },
    	"audio/vnd.dolby.heaac.2": {
    	source: "iana"
    },
    	"audio/vnd.dolby.mlp": {
    	source: "iana"
    },
    	"audio/vnd.dolby.mps": {
    	source: "iana"
    },
    	"audio/vnd.dolby.pl2": {
    	source: "iana"
    },
    	"audio/vnd.dolby.pl2x": {
    	source: "iana"
    },
    	"audio/vnd.dolby.pl2z": {
    	source: "iana"
    },
    	"audio/vnd.dolby.pulse.1": {
    	source: "iana"
    },
    	"audio/vnd.dra": {
    	source: "iana",
    	extensions: [
    		"dra"
    	]
    },
    	"audio/vnd.dts": {
    	source: "iana",
    	extensions: [
    		"dts"
    	]
    },
    	"audio/vnd.dts.hd": {
    	source: "iana",
    	extensions: [
    		"dtshd"
    	]
    },
    	"audio/vnd.dts.uhd": {
    	source: "iana"
    },
    	"audio/vnd.dvb.file": {
    	source: "iana"
    },
    	"audio/vnd.everad.plj": {
    	source: "iana"
    },
    	"audio/vnd.hns.audio": {
    	source: "iana"
    },
    	"audio/vnd.lucent.voice": {
    	source: "iana",
    	extensions: [
    		"lvp"
    	]
    },
    	"audio/vnd.ms-playready.media.pya": {
    	source: "iana",
    	extensions: [
    		"pya"
    	]
    },
    	"audio/vnd.nokia.mobile-xmf": {
    	source: "iana"
    },
    	"audio/vnd.nortel.vbk": {
    	source: "iana"
    },
    	"audio/vnd.nuera.ecelp4800": {
    	source: "iana",
    	extensions: [
    		"ecelp4800"
    	]
    },
    	"audio/vnd.nuera.ecelp7470": {
    	source: "iana",
    	extensions: [
    		"ecelp7470"
    	]
    },
    	"audio/vnd.nuera.ecelp9600": {
    	source: "iana",
    	extensions: [
    		"ecelp9600"
    	]
    },
    	"audio/vnd.octel.sbc": {
    	source: "iana"
    },
    	"audio/vnd.presonus.multitrack": {
    	source: "iana"
    },
    	"audio/vnd.qcelp": {
    	source: "iana"
    },
    	"audio/vnd.rhetorex.32kadpcm": {
    	source: "iana"
    },
    	"audio/vnd.rip": {
    	source: "iana",
    	extensions: [
    		"rip"
    	]
    },
    	"audio/vnd.rn-realaudio": {
    	compressible: false
    },
    	"audio/vnd.sealedmedia.softseal.mpeg": {
    	source: "iana"
    },
    	"audio/vnd.vmx.cvsd": {
    	source: "iana"
    },
    	"audio/vnd.wave": {
    	compressible: false
    },
    	"audio/vorbis": {
    	source: "iana",
    	compressible: false
    },
    	"audio/vorbis-config": {
    	source: "iana"
    },
    	"audio/wav": {
    	compressible: false,
    	extensions: [
    		"wav"
    	]
    },
    	"audio/wave": {
    	compressible: false,
    	extensions: [
    		"wav"
    	]
    },
    	"audio/webm": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"weba"
    	]
    },
    	"audio/x-aac": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"aac"
    	]
    },
    	"audio/x-aiff": {
    	source: "apache",
    	extensions: [
    		"aif",
    		"aiff",
    		"aifc"
    	]
    },
    	"audio/x-caf": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"caf"
    	]
    },
    	"audio/x-flac": {
    	source: "apache",
    	extensions: [
    		"flac"
    	]
    },
    	"audio/x-m4a": {
    	source: "nginx",
    	extensions: [
    		"m4a"
    	]
    },
    	"audio/x-matroska": {
    	source: "apache",
    	extensions: [
    		"mka"
    	]
    },
    	"audio/x-mpegurl": {
    	source: "apache",
    	extensions: [
    		"m3u"
    	]
    },
    	"audio/x-ms-wax": {
    	source: "apache",
    	extensions: [
    		"wax"
    	]
    },
    	"audio/x-ms-wma": {
    	source: "apache",
    	extensions: [
    		"wma"
    	]
    },
    	"audio/x-pn-realaudio": {
    	source: "apache",
    	extensions: [
    		"ram",
    		"ra"
    	]
    },
    	"audio/x-pn-realaudio-plugin": {
    	source: "apache",
    	extensions: [
    		"rmp"
    	]
    },
    	"audio/x-realaudio": {
    	source: "nginx",
    	extensions: [
    		"ra"
    	]
    },
    	"audio/x-tta": {
    	source: "apache"
    },
    	"audio/x-wav": {
    	source: "apache",
    	extensions: [
    		"wav"
    	]
    },
    	"audio/xm": {
    	source: "apache",
    	extensions: [
    		"xm"
    	]
    },
    	"chemical/x-cdx": {
    	source: "apache",
    	extensions: [
    		"cdx"
    	]
    },
    	"chemical/x-cif": {
    	source: "apache",
    	extensions: [
    		"cif"
    	]
    },
    	"chemical/x-cmdf": {
    	source: "apache",
    	extensions: [
    		"cmdf"
    	]
    },
    	"chemical/x-cml": {
    	source: "apache",
    	extensions: [
    		"cml"
    	]
    },
    	"chemical/x-csml": {
    	source: "apache",
    	extensions: [
    		"csml"
    	]
    },
    	"chemical/x-pdb": {
    	source: "apache"
    },
    	"chemical/x-xyz": {
    	source: "apache",
    	extensions: [
    		"xyz"
    	]
    },
    	"font/collection": {
    	source: "iana",
    	extensions: [
    		"ttc"
    	]
    },
    	"font/otf": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"otf"
    	]
    },
    	"font/sfnt": {
    	source: "iana"
    },
    	"font/ttf": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"ttf"
    	]
    },
    	"font/woff": {
    	source: "iana",
    	extensions: [
    		"woff"
    	]
    },
    	"font/woff2": {
    	source: "iana",
    	extensions: [
    		"woff2"
    	]
    },
    	"image/aces": {
    	source: "iana",
    	extensions: [
    		"exr"
    	]
    },
    	"image/apng": {
    	compressible: false,
    	extensions: [
    		"apng"
    	]
    },
    	"image/avci": {
    	source: "iana",
    	extensions: [
    		"avci"
    	]
    },
    	"image/avcs": {
    	source: "iana",
    	extensions: [
    		"avcs"
    	]
    },
    	"image/avif": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"avif"
    	]
    },
    	"image/bmp": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"bmp"
    	]
    },
    	"image/cgm": {
    	source: "iana",
    	extensions: [
    		"cgm"
    	]
    },
    	"image/dicom-rle": {
    	source: "iana",
    	extensions: [
    		"drle"
    	]
    },
    	"image/emf": {
    	source: "iana",
    	extensions: [
    		"emf"
    	]
    },
    	"image/fits": {
    	source: "iana",
    	extensions: [
    		"fits"
    	]
    },
    	"image/g3fax": {
    	source: "iana",
    	extensions: [
    		"g3"
    	]
    },
    	"image/gif": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"gif"
    	]
    },
    	"image/heic": {
    	source: "iana",
    	extensions: [
    		"heic"
    	]
    },
    	"image/heic-sequence": {
    	source: "iana",
    	extensions: [
    		"heics"
    	]
    },
    	"image/heif": {
    	source: "iana",
    	extensions: [
    		"heif"
    	]
    },
    	"image/heif-sequence": {
    	source: "iana",
    	extensions: [
    		"heifs"
    	]
    },
    	"image/hej2k": {
    	source: "iana",
    	extensions: [
    		"hej2"
    	]
    },
    	"image/hsj2": {
    	source: "iana",
    	extensions: [
    		"hsj2"
    	]
    },
    	"image/ief": {
    	source: "iana",
    	extensions: [
    		"ief"
    	]
    },
    	"image/jls": {
    	source: "iana",
    	extensions: [
    		"jls"
    	]
    },
    	"image/jp2": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"jp2",
    		"jpg2"
    	]
    },
    	"image/jpeg": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"jpeg",
    		"jpg",
    		"jpe"
    	]
    },
    	"image/jph": {
    	source: "iana",
    	extensions: [
    		"jph"
    	]
    },
    	"image/jphc": {
    	source: "iana",
    	extensions: [
    		"jhc"
    	]
    },
    	"image/jpm": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"jpm"
    	]
    },
    	"image/jpx": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"jpx",
    		"jpf"
    	]
    },
    	"image/jxr": {
    	source: "iana",
    	extensions: [
    		"jxr"
    	]
    },
    	"image/jxra": {
    	source: "iana",
    	extensions: [
    		"jxra"
    	]
    },
    	"image/jxrs": {
    	source: "iana",
    	extensions: [
    		"jxrs"
    	]
    },
    	"image/jxs": {
    	source: "iana",
    	extensions: [
    		"jxs"
    	]
    },
    	"image/jxsc": {
    	source: "iana",
    	extensions: [
    		"jxsc"
    	]
    },
    	"image/jxsi": {
    	source: "iana",
    	extensions: [
    		"jxsi"
    	]
    },
    	"image/jxss": {
    	source: "iana",
    	extensions: [
    		"jxss"
    	]
    },
    	"image/ktx": {
    	source: "iana",
    	extensions: [
    		"ktx"
    	]
    },
    	"image/ktx2": {
    	source: "iana",
    	extensions: [
    		"ktx2"
    	]
    },
    	"image/naplps": {
    	source: "iana"
    },
    	"image/pjpeg": {
    	compressible: false
    },
    	"image/png": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"png"
    	]
    },
    	"image/prs.btif": {
    	source: "iana",
    	extensions: [
    		"btif"
    	]
    },
    	"image/prs.pti": {
    	source: "iana",
    	extensions: [
    		"pti"
    	]
    },
    	"image/pwg-raster": {
    	source: "iana"
    },
    	"image/sgi": {
    	source: "apache",
    	extensions: [
    		"sgi"
    	]
    },
    	"image/svg+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"svg",
    		"svgz"
    	]
    },
    	"image/t38": {
    	source: "iana",
    	extensions: [
    		"t38"
    	]
    },
    	"image/tiff": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"tif",
    		"tiff"
    	]
    },
    	"image/tiff-fx": {
    	source: "iana",
    	extensions: [
    		"tfx"
    	]
    },
    	"image/vnd.adobe.photoshop": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"psd"
    	]
    },
    	"image/vnd.airzip.accelerator.azv": {
    	source: "iana",
    	extensions: [
    		"azv"
    	]
    },
    	"image/vnd.cns.inf2": {
    	source: "iana"
    },
    	"image/vnd.dece.graphic": {
    	source: "iana",
    	extensions: [
    		"uvi",
    		"uvvi",
    		"uvg",
    		"uvvg"
    	]
    },
    	"image/vnd.djvu": {
    	source: "iana",
    	extensions: [
    		"djvu",
    		"djv"
    	]
    },
    	"image/vnd.dvb.subtitle": {
    	source: "iana",
    	extensions: [
    		"sub"
    	]
    },
    	"image/vnd.dwg": {
    	source: "iana",
    	extensions: [
    		"dwg"
    	]
    },
    	"image/vnd.dxf": {
    	source: "iana",
    	extensions: [
    		"dxf"
    	]
    },
    	"image/vnd.fastbidsheet": {
    	source: "iana",
    	extensions: [
    		"fbs"
    	]
    },
    	"image/vnd.fpx": {
    	source: "iana",
    	extensions: [
    		"fpx"
    	]
    },
    	"image/vnd.fst": {
    	source: "iana",
    	extensions: [
    		"fst"
    	]
    },
    	"image/vnd.fujixerox.edmics-mmr": {
    	source: "iana",
    	extensions: [
    		"mmr"
    	]
    },
    	"image/vnd.fujixerox.edmics-rlc": {
    	source: "iana",
    	extensions: [
    		"rlc"
    	]
    },
    	"image/vnd.globalgraphics.pgb": {
    	source: "iana"
    },
    	"image/vnd.microsoft.icon": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"ico"
    	]
    },
    	"image/vnd.mix": {
    	source: "iana"
    },
    	"image/vnd.mozilla.apng": {
    	source: "iana"
    },
    	"image/vnd.ms-dds": {
    	compressible: true,
    	extensions: [
    		"dds"
    	]
    },
    	"image/vnd.ms-modi": {
    	source: "iana",
    	extensions: [
    		"mdi"
    	]
    },
    	"image/vnd.ms-photo": {
    	source: "apache",
    	extensions: [
    		"wdp"
    	]
    },
    	"image/vnd.net-fpx": {
    	source: "iana",
    	extensions: [
    		"npx"
    	]
    },
    	"image/vnd.pco.b16": {
    	source: "iana",
    	extensions: [
    		"b16"
    	]
    },
    	"image/vnd.radiance": {
    	source: "iana"
    },
    	"image/vnd.sealed.png": {
    	source: "iana"
    },
    	"image/vnd.sealedmedia.softseal.gif": {
    	source: "iana"
    },
    	"image/vnd.sealedmedia.softseal.jpg": {
    	source: "iana"
    },
    	"image/vnd.svf": {
    	source: "iana"
    },
    	"image/vnd.tencent.tap": {
    	source: "iana",
    	extensions: [
    		"tap"
    	]
    },
    	"image/vnd.valve.source.texture": {
    	source: "iana",
    	extensions: [
    		"vtf"
    	]
    },
    	"image/vnd.wap.wbmp": {
    	source: "iana",
    	extensions: [
    		"wbmp"
    	]
    },
    	"image/vnd.xiff": {
    	source: "iana",
    	extensions: [
    		"xif"
    	]
    },
    	"image/vnd.zbrush.pcx": {
    	source: "iana",
    	extensions: [
    		"pcx"
    	]
    },
    	"image/webp": {
    	source: "apache",
    	extensions: [
    		"webp"
    	]
    },
    	"image/wmf": {
    	source: "iana",
    	extensions: [
    		"wmf"
    	]
    },
    	"image/x-3ds": {
    	source: "apache",
    	extensions: [
    		"3ds"
    	]
    },
    	"image/x-cmu-raster": {
    	source: "apache",
    	extensions: [
    		"ras"
    	]
    },
    	"image/x-cmx": {
    	source: "apache",
    	extensions: [
    		"cmx"
    	]
    },
    	"image/x-freehand": {
    	source: "apache",
    	extensions: [
    		"fh",
    		"fhc",
    		"fh4",
    		"fh5",
    		"fh7"
    	]
    },
    	"image/x-icon": {
    	source: "apache",
    	compressible: true,
    	extensions: [
    		"ico"
    	]
    },
    	"image/x-jng": {
    	source: "nginx",
    	extensions: [
    		"jng"
    	]
    },
    	"image/x-mrsid-image": {
    	source: "apache",
    	extensions: [
    		"sid"
    	]
    },
    	"image/x-ms-bmp": {
    	source: "nginx",
    	compressible: true,
    	extensions: [
    		"bmp"
    	]
    },
    	"image/x-pcx": {
    	source: "apache",
    	extensions: [
    		"pcx"
    	]
    },
    	"image/x-pict": {
    	source: "apache",
    	extensions: [
    		"pic",
    		"pct"
    	]
    },
    	"image/x-portable-anymap": {
    	source: "apache",
    	extensions: [
    		"pnm"
    	]
    },
    	"image/x-portable-bitmap": {
    	source: "apache",
    	extensions: [
    		"pbm"
    	]
    },
    	"image/x-portable-graymap": {
    	source: "apache",
    	extensions: [
    		"pgm"
    	]
    },
    	"image/x-portable-pixmap": {
    	source: "apache",
    	extensions: [
    		"ppm"
    	]
    },
    	"image/x-rgb": {
    	source: "apache",
    	extensions: [
    		"rgb"
    	]
    },
    	"image/x-tga": {
    	source: "apache",
    	extensions: [
    		"tga"
    	]
    },
    	"image/x-xbitmap": {
    	source: "apache",
    	extensions: [
    		"xbm"
    	]
    },
    	"image/x-xcf": {
    	compressible: false
    },
    	"image/x-xpixmap": {
    	source: "apache",
    	extensions: [
    		"xpm"
    	]
    },
    	"image/x-xwindowdump": {
    	source: "apache",
    	extensions: [
    		"xwd"
    	]
    },
    	"message/cpim": {
    	source: "iana"
    },
    	"message/delivery-status": {
    	source: "iana"
    },
    	"message/disposition-notification": {
    	source: "iana",
    	extensions: [
    		"disposition-notification"
    	]
    },
    	"message/external-body": {
    	source: "iana"
    },
    	"message/feedback-report": {
    	source: "iana"
    },
    	"message/global": {
    	source: "iana",
    	extensions: [
    		"u8msg"
    	]
    },
    	"message/global-delivery-status": {
    	source: "iana",
    	extensions: [
    		"u8dsn"
    	]
    },
    	"message/global-disposition-notification": {
    	source: "iana",
    	extensions: [
    		"u8mdn"
    	]
    },
    	"message/global-headers": {
    	source: "iana",
    	extensions: [
    		"u8hdr"
    	]
    },
    	"message/http": {
    	source: "iana",
    	compressible: false
    },
    	"message/imdn+xml": {
    	source: "iana",
    	compressible: true
    },
    	"message/news": {
    	source: "iana"
    },
    	"message/partial": {
    	source: "iana",
    	compressible: false
    },
    	"message/rfc822": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"eml",
    		"mime"
    	]
    },
    	"message/s-http": {
    	source: "iana"
    },
    	"message/sip": {
    	source: "iana"
    },
    	"message/sipfrag": {
    	source: "iana"
    },
    	"message/tracking-status": {
    	source: "iana"
    },
    	"message/vnd.si.simp": {
    	source: "iana"
    },
    	"message/vnd.wfa.wsc": {
    	source: "iana",
    	extensions: [
    		"wsc"
    	]
    },
    	"model/3mf": {
    	source: "iana",
    	extensions: [
    		"3mf"
    	]
    },
    	"model/e57": {
    	source: "iana"
    },
    	"model/gltf+json": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"gltf"
    	]
    },
    	"model/gltf-binary": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"glb"
    	]
    },
    	"model/iges": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"igs",
    		"iges"
    	]
    },
    	"model/mesh": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"msh",
    		"mesh",
    		"silo"
    	]
    },
    	"model/mtl": {
    	source: "iana",
    	extensions: [
    		"mtl"
    	]
    },
    	"model/obj": {
    	source: "iana",
    	extensions: [
    		"obj"
    	]
    },
    	"model/step": {
    	source: "iana"
    },
    	"model/step+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"stpx"
    	]
    },
    	"model/step+zip": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"stpz"
    	]
    },
    	"model/step-xml+zip": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"stpxz"
    	]
    },
    	"model/stl": {
    	source: "iana",
    	extensions: [
    		"stl"
    	]
    },
    	"model/vnd.collada+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"dae"
    	]
    },
    	"model/vnd.dwf": {
    	source: "iana",
    	extensions: [
    		"dwf"
    	]
    },
    	"model/vnd.flatland.3dml": {
    	source: "iana"
    },
    	"model/vnd.gdl": {
    	source: "iana",
    	extensions: [
    		"gdl"
    	]
    },
    	"model/vnd.gs-gdl": {
    	source: "apache"
    },
    	"model/vnd.gs.gdl": {
    	source: "iana"
    },
    	"model/vnd.gtw": {
    	source: "iana",
    	extensions: [
    		"gtw"
    	]
    },
    	"model/vnd.moml+xml": {
    	source: "iana",
    	compressible: true
    },
    	"model/vnd.mts": {
    	source: "iana",
    	extensions: [
    		"mts"
    	]
    },
    	"model/vnd.opengex": {
    	source: "iana",
    	extensions: [
    		"ogex"
    	]
    },
    	"model/vnd.parasolid.transmit.binary": {
    	source: "iana",
    	extensions: [
    		"x_b"
    	]
    },
    	"model/vnd.parasolid.transmit.text": {
    	source: "iana",
    	extensions: [
    		"x_t"
    	]
    },
    	"model/vnd.pytha.pyox": {
    	source: "iana"
    },
    	"model/vnd.rosette.annotated-data-model": {
    	source: "iana"
    },
    	"model/vnd.sap.vds": {
    	source: "iana",
    	extensions: [
    		"vds"
    	]
    },
    	"model/vnd.usdz+zip": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"usdz"
    	]
    },
    	"model/vnd.valve.source.compiled-map": {
    	source: "iana",
    	extensions: [
    		"bsp"
    	]
    },
    	"model/vnd.vtu": {
    	source: "iana",
    	extensions: [
    		"vtu"
    	]
    },
    	"model/vrml": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"wrl",
    		"vrml"
    	]
    },
    	"model/x3d+binary": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"x3db",
    		"x3dbz"
    	]
    },
    	"model/x3d+fastinfoset": {
    	source: "iana",
    	extensions: [
    		"x3db"
    	]
    },
    	"model/x3d+vrml": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"x3dv",
    		"x3dvz"
    	]
    },
    	"model/x3d+xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"x3d",
    		"x3dz"
    	]
    },
    	"model/x3d-vrml": {
    	source: "iana",
    	extensions: [
    		"x3dv"
    	]
    },
    	"multipart/alternative": {
    	source: "iana",
    	compressible: false
    },
    	"multipart/appledouble": {
    	source: "iana"
    },
    	"multipart/byteranges": {
    	source: "iana"
    },
    	"multipart/digest": {
    	source: "iana"
    },
    	"multipart/encrypted": {
    	source: "iana",
    	compressible: false
    },
    	"multipart/form-data": {
    	source: "iana",
    	compressible: false
    },
    	"multipart/header-set": {
    	source: "iana"
    },
    	"multipart/mixed": {
    	source: "iana"
    },
    	"multipart/multilingual": {
    	source: "iana"
    },
    	"multipart/parallel": {
    	source: "iana"
    },
    	"multipart/related": {
    	source: "iana",
    	compressible: false
    },
    	"multipart/report": {
    	source: "iana"
    },
    	"multipart/signed": {
    	source: "iana",
    	compressible: false
    },
    	"multipart/vnd.bint.med-plus": {
    	source: "iana"
    },
    	"multipart/voice-message": {
    	source: "iana"
    },
    	"multipart/x-mixed-replace": {
    	source: "iana"
    },
    	"text/1d-interleaved-parityfec": {
    	source: "iana"
    },
    	"text/cache-manifest": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"appcache",
    		"manifest"
    	]
    },
    	"text/calendar": {
    	source: "iana",
    	extensions: [
    		"ics",
    		"ifb"
    	]
    },
    	"text/calender": {
    	compressible: true
    },
    	"text/cmd": {
    	compressible: true
    },
    	"text/coffeescript": {
    	extensions: [
    		"coffee",
    		"litcoffee"
    	]
    },
    	"text/cql": {
    	source: "iana"
    },
    	"text/cql-expression": {
    	source: "iana"
    },
    	"text/cql-identifier": {
    	source: "iana"
    },
    	"text/css": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true,
    	extensions: [
    		"css"
    	]
    },
    	"text/csv": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"csv"
    	]
    },
    	"text/csv-schema": {
    	source: "iana"
    },
    	"text/directory": {
    	source: "iana"
    },
    	"text/dns": {
    	source: "iana"
    },
    	"text/ecmascript": {
    	source: "iana"
    },
    	"text/encaprtp": {
    	source: "iana"
    },
    	"text/enriched": {
    	source: "iana"
    },
    	"text/fhirpath": {
    	source: "iana"
    },
    	"text/flexfec": {
    	source: "iana"
    },
    	"text/fwdred": {
    	source: "iana"
    },
    	"text/gff3": {
    	source: "iana"
    },
    	"text/grammar-ref-list": {
    	source: "iana"
    },
    	"text/html": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"html",
    		"htm",
    		"shtml"
    	]
    },
    	"text/jade": {
    	extensions: [
    		"jade"
    	]
    },
    	"text/javascript": {
    	source: "iana",
    	compressible: true
    },
    	"text/jcr-cnd": {
    	source: "iana"
    },
    	"text/jsx": {
    	compressible: true,
    	extensions: [
    		"jsx"
    	]
    },
    	"text/less": {
    	compressible: true,
    	extensions: [
    		"less"
    	]
    },
    	"text/markdown": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"markdown",
    		"md"
    	]
    },
    	"text/mathml": {
    	source: "nginx",
    	extensions: [
    		"mml"
    	]
    },
    	"text/mdx": {
    	compressible: true,
    	extensions: [
    		"mdx"
    	]
    },
    	"text/mizar": {
    	source: "iana"
    },
    	"text/n3": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true,
    	extensions: [
    		"n3"
    	]
    },
    	"text/parameters": {
    	source: "iana",
    	charset: "UTF-8"
    },
    	"text/parityfec": {
    	source: "iana"
    },
    	"text/plain": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"txt",
    		"text",
    		"conf",
    		"def",
    		"list",
    		"log",
    		"in",
    		"ini"
    	]
    },
    	"text/provenance-notation": {
    	source: "iana",
    	charset: "UTF-8"
    },
    	"text/prs.fallenstein.rst": {
    	source: "iana"
    },
    	"text/prs.lines.tag": {
    	source: "iana",
    	extensions: [
    		"dsc"
    	]
    },
    	"text/prs.prop.logic": {
    	source: "iana"
    },
    	"text/raptorfec": {
    	source: "iana"
    },
    	"text/red": {
    	source: "iana"
    },
    	"text/rfc822-headers": {
    	source: "iana"
    },
    	"text/richtext": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"rtx"
    	]
    },
    	"text/rtf": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"rtf"
    	]
    },
    	"text/rtp-enc-aescm128": {
    	source: "iana"
    },
    	"text/rtploopback": {
    	source: "iana"
    },
    	"text/rtx": {
    	source: "iana"
    },
    	"text/sgml": {
    	source: "iana",
    	extensions: [
    		"sgml",
    		"sgm"
    	]
    },
    	"text/shaclc": {
    	source: "iana"
    },
    	"text/shex": {
    	source: "iana",
    	extensions: [
    		"shex"
    	]
    },
    	"text/slim": {
    	extensions: [
    		"slim",
    		"slm"
    	]
    },
    	"text/spdx": {
    	source: "iana",
    	extensions: [
    		"spdx"
    	]
    },
    	"text/strings": {
    	source: "iana"
    },
    	"text/stylus": {
    	extensions: [
    		"stylus",
    		"styl"
    	]
    },
    	"text/t140": {
    	source: "iana"
    },
    	"text/tab-separated-values": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"tsv"
    	]
    },
    	"text/troff": {
    	source: "iana",
    	extensions: [
    		"t",
    		"tr",
    		"roff",
    		"man",
    		"me",
    		"ms"
    	]
    },
    	"text/turtle": {
    	source: "iana",
    	charset: "UTF-8",
    	extensions: [
    		"ttl"
    	]
    },
    	"text/ulpfec": {
    	source: "iana"
    },
    	"text/uri-list": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"uri",
    		"uris",
    		"urls"
    	]
    },
    	"text/vcard": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"vcard"
    	]
    },
    	"text/vnd.a": {
    	source: "iana"
    },
    	"text/vnd.abc": {
    	source: "iana"
    },
    	"text/vnd.ascii-art": {
    	source: "iana"
    },
    	"text/vnd.curl": {
    	source: "iana",
    	extensions: [
    		"curl"
    	]
    },
    	"text/vnd.curl.dcurl": {
    	source: "apache",
    	extensions: [
    		"dcurl"
    	]
    },
    	"text/vnd.curl.mcurl": {
    	source: "apache",
    	extensions: [
    		"mcurl"
    	]
    },
    	"text/vnd.curl.scurl": {
    	source: "apache",
    	extensions: [
    		"scurl"
    	]
    },
    	"text/vnd.debian.copyright": {
    	source: "iana",
    	charset: "UTF-8"
    },
    	"text/vnd.dmclientscript": {
    	source: "iana"
    },
    	"text/vnd.dvb.subtitle": {
    	source: "iana",
    	extensions: [
    		"sub"
    	]
    },
    	"text/vnd.esmertec.theme-descriptor": {
    	source: "iana",
    	charset: "UTF-8"
    },
    	"text/vnd.familysearch.gedcom": {
    	source: "iana",
    	extensions: [
    		"ged"
    	]
    },
    	"text/vnd.ficlab.flt": {
    	source: "iana"
    },
    	"text/vnd.fly": {
    	source: "iana",
    	extensions: [
    		"fly"
    	]
    },
    	"text/vnd.fmi.flexstor": {
    	source: "iana",
    	extensions: [
    		"flx"
    	]
    },
    	"text/vnd.gml": {
    	source: "iana"
    },
    	"text/vnd.graphviz": {
    	source: "iana",
    	extensions: [
    		"gv"
    	]
    },
    	"text/vnd.hans": {
    	source: "iana"
    },
    	"text/vnd.hgl": {
    	source: "iana"
    },
    	"text/vnd.in3d.3dml": {
    	source: "iana",
    	extensions: [
    		"3dml"
    	]
    },
    	"text/vnd.in3d.spot": {
    	source: "iana",
    	extensions: [
    		"spot"
    	]
    },
    	"text/vnd.iptc.newsml": {
    	source: "iana"
    },
    	"text/vnd.iptc.nitf": {
    	source: "iana"
    },
    	"text/vnd.latex-z": {
    	source: "iana"
    },
    	"text/vnd.motorola.reflex": {
    	source: "iana"
    },
    	"text/vnd.ms-mediapackage": {
    	source: "iana"
    },
    	"text/vnd.net2phone.commcenter.command": {
    	source: "iana"
    },
    	"text/vnd.radisys.msml-basic-layout": {
    	source: "iana"
    },
    	"text/vnd.senx.warpscript": {
    	source: "iana"
    },
    	"text/vnd.si.uricatalogue": {
    	source: "iana"
    },
    	"text/vnd.sosi": {
    	source: "iana"
    },
    	"text/vnd.sun.j2me.app-descriptor": {
    	source: "iana",
    	charset: "UTF-8",
    	extensions: [
    		"jad"
    	]
    },
    	"text/vnd.trolltech.linguist": {
    	source: "iana",
    	charset: "UTF-8"
    },
    	"text/vnd.wap.si": {
    	source: "iana"
    },
    	"text/vnd.wap.sl": {
    	source: "iana"
    },
    	"text/vnd.wap.wml": {
    	source: "iana",
    	extensions: [
    		"wml"
    	]
    },
    	"text/vnd.wap.wmlscript": {
    	source: "iana",
    	extensions: [
    		"wmls"
    	]
    },
    	"text/vtt": {
    	source: "iana",
    	charset: "UTF-8",
    	compressible: true,
    	extensions: [
    		"vtt"
    	]
    },
    	"text/x-asm": {
    	source: "apache",
    	extensions: [
    		"s",
    		"asm"
    	]
    },
    	"text/x-c": {
    	source: "apache",
    	extensions: [
    		"c",
    		"cc",
    		"cxx",
    		"cpp",
    		"h",
    		"hh",
    		"dic"
    	]
    },
    	"text/x-component": {
    	source: "nginx",
    	extensions: [
    		"htc"
    	]
    },
    	"text/x-fortran": {
    	source: "apache",
    	extensions: [
    		"f",
    		"for",
    		"f77",
    		"f90"
    	]
    },
    	"text/x-gwt-rpc": {
    	compressible: true
    },
    	"text/x-handlebars-template": {
    	extensions: [
    		"hbs"
    	]
    },
    	"text/x-java-source": {
    	source: "apache",
    	extensions: [
    		"java"
    	]
    },
    	"text/x-jquery-tmpl": {
    	compressible: true
    },
    	"text/x-lua": {
    	extensions: [
    		"lua"
    	]
    },
    	"text/x-markdown": {
    	compressible: true,
    	extensions: [
    		"mkd"
    	]
    },
    	"text/x-nfo": {
    	source: "apache",
    	extensions: [
    		"nfo"
    	]
    },
    	"text/x-opml": {
    	source: "apache",
    	extensions: [
    		"opml"
    	]
    },
    	"text/x-org": {
    	compressible: true,
    	extensions: [
    		"org"
    	]
    },
    	"text/x-pascal": {
    	source: "apache",
    	extensions: [
    		"p",
    		"pas"
    	]
    },
    	"text/x-processing": {
    	compressible: true,
    	extensions: [
    		"pde"
    	]
    },
    	"text/x-sass": {
    	extensions: [
    		"sass"
    	]
    },
    	"text/x-scss": {
    	extensions: [
    		"scss"
    	]
    },
    	"text/x-setext": {
    	source: "apache",
    	extensions: [
    		"etx"
    	]
    },
    	"text/x-sfv": {
    	source: "apache",
    	extensions: [
    		"sfv"
    	]
    },
    	"text/x-suse-ymp": {
    	compressible: true,
    	extensions: [
    		"ymp"
    	]
    },
    	"text/x-uuencode": {
    	source: "apache",
    	extensions: [
    		"uu"
    	]
    },
    	"text/x-vcalendar": {
    	source: "apache",
    	extensions: [
    		"vcs"
    	]
    },
    	"text/x-vcard": {
    	source: "apache",
    	extensions: [
    		"vcf"
    	]
    },
    	"text/xml": {
    	source: "iana",
    	compressible: true,
    	extensions: [
    		"xml"
    	]
    },
    	"text/xml-external-parsed-entity": {
    	source: "iana"
    },
    	"text/yaml": {
    	compressible: true,
    	extensions: [
    		"yaml",
    		"yml"
    	]
    },
    	"video/1d-interleaved-parityfec": {
    	source: "iana"
    },
    	"video/3gpp": {
    	source: "iana",
    	extensions: [
    		"3gp",
    		"3gpp"
    	]
    },
    	"video/3gpp-tt": {
    	source: "iana"
    },
    	"video/3gpp2": {
    	source: "iana",
    	extensions: [
    		"3g2"
    	]
    },
    	"video/av1": {
    	source: "iana"
    },
    	"video/bmpeg": {
    	source: "iana"
    },
    	"video/bt656": {
    	source: "iana"
    },
    	"video/celb": {
    	source: "iana"
    },
    	"video/dv": {
    	source: "iana"
    },
    	"video/encaprtp": {
    	source: "iana"
    },
    	"video/ffv1": {
    	source: "iana"
    },
    	"video/flexfec": {
    	source: "iana"
    },
    	"video/h261": {
    	source: "iana",
    	extensions: [
    		"h261"
    	]
    },
    	"video/h263": {
    	source: "iana",
    	extensions: [
    		"h263"
    	]
    },
    	"video/h263-1998": {
    	source: "iana"
    },
    	"video/h263-2000": {
    	source: "iana"
    },
    	"video/h264": {
    	source: "iana",
    	extensions: [
    		"h264"
    	]
    },
    	"video/h264-rcdo": {
    	source: "iana"
    },
    	"video/h264-svc": {
    	source: "iana"
    },
    	"video/h265": {
    	source: "iana"
    },
    	"video/iso.segment": {
    	source: "iana",
    	extensions: [
    		"m4s"
    	]
    },
    	"video/jpeg": {
    	source: "iana",
    	extensions: [
    		"jpgv"
    	]
    },
    	"video/jpeg2000": {
    	source: "iana"
    },
    	"video/jpm": {
    	source: "apache",
    	extensions: [
    		"jpm",
    		"jpgm"
    	]
    },
    	"video/jxsv": {
    	source: "iana"
    },
    	"video/mj2": {
    	source: "iana",
    	extensions: [
    		"mj2",
    		"mjp2"
    	]
    },
    	"video/mp1s": {
    	source: "iana"
    },
    	"video/mp2p": {
    	source: "iana"
    },
    	"video/mp2t": {
    	source: "iana",
    	extensions: [
    		"ts"
    	]
    },
    	"video/mp4": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"mp4",
    		"mp4v",
    		"mpg4"
    	]
    },
    	"video/mp4v-es": {
    	source: "iana"
    },
    	"video/mpeg": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"mpeg",
    		"mpg",
    		"mpe",
    		"m1v",
    		"m2v"
    	]
    },
    	"video/mpeg4-generic": {
    	source: "iana"
    },
    	"video/mpv": {
    	source: "iana"
    },
    	"video/nv": {
    	source: "iana"
    },
    	"video/ogg": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"ogv"
    	]
    },
    	"video/parityfec": {
    	source: "iana"
    },
    	"video/pointer": {
    	source: "iana"
    },
    	"video/quicktime": {
    	source: "iana",
    	compressible: false,
    	extensions: [
    		"qt",
    		"mov"
    	]
    },
    	"video/raptorfec": {
    	source: "iana"
    },
    	"video/raw": {
    	source: "iana"
    },
    	"video/rtp-enc-aescm128": {
    	source: "iana"
    },
    	"video/rtploopback": {
    	source: "iana"
    },
    	"video/rtx": {
    	source: "iana"
    },
    	"video/scip": {
    	source: "iana"
    },
    	"video/smpte291": {
    	source: "iana"
    },
    	"video/smpte292m": {
    	source: "iana"
    },
    	"video/ulpfec": {
    	source: "iana"
    },
    	"video/vc1": {
    	source: "iana"
    },
    	"video/vc2": {
    	source: "iana"
    },
    	"video/vnd.cctv": {
    	source: "iana"
    },
    	"video/vnd.dece.hd": {
    	source: "iana",
    	extensions: [
    		"uvh",
    		"uvvh"
    	]
    },
    	"video/vnd.dece.mobile": {
    	source: "iana",
    	extensions: [
    		"uvm",
    		"uvvm"
    	]
    },
    	"video/vnd.dece.mp4": {
    	source: "iana"
    },
    	"video/vnd.dece.pd": {
    	source: "iana",
    	extensions: [
    		"uvp",
    		"uvvp"
    	]
    },
    	"video/vnd.dece.sd": {
    	source: "iana",
    	extensions: [
    		"uvs",
    		"uvvs"
    	]
    },
    	"video/vnd.dece.video": {
    	source: "iana",
    	extensions: [
    		"uvv",
    		"uvvv"
    	]
    },
    	"video/vnd.directv.mpeg": {
    	source: "iana"
    },
    	"video/vnd.directv.mpeg-tts": {
    	source: "iana"
    },
    	"video/vnd.dlna.mpeg-tts": {
    	source: "iana"
    },
    	"video/vnd.dvb.file": {
    	source: "iana",
    	extensions: [
    		"dvb"
    	]
    },
    	"video/vnd.fvt": {
    	source: "iana",
    	extensions: [
    		"fvt"
    	]
    },
    	"video/vnd.hns.video": {
    	source: "iana"
    },
    	"video/vnd.iptvforum.1dparityfec-1010": {
    	source: "iana"
    },
    	"video/vnd.iptvforum.1dparityfec-2005": {
    	source: "iana"
    },
    	"video/vnd.iptvforum.2dparityfec-1010": {
    	source: "iana"
    },
    	"video/vnd.iptvforum.2dparityfec-2005": {
    	source: "iana"
    },
    	"video/vnd.iptvforum.ttsavc": {
    	source: "iana"
    },
    	"video/vnd.iptvforum.ttsmpeg2": {
    	source: "iana"
    },
    	"video/vnd.motorola.video": {
    	source: "iana"
    },
    	"video/vnd.motorola.videop": {
    	source: "iana"
    },
    	"video/vnd.mpegurl": {
    	source: "iana",
    	extensions: [
    		"mxu",
    		"m4u"
    	]
    },
    	"video/vnd.ms-playready.media.pyv": {
    	source: "iana",
    	extensions: [
    		"pyv"
    	]
    },
    	"video/vnd.nokia.interleaved-multimedia": {
    	source: "iana"
    },
    	"video/vnd.nokia.mp4vr": {
    	source: "iana"
    },
    	"video/vnd.nokia.videovoip": {
    	source: "iana"
    },
    	"video/vnd.objectvideo": {
    	source: "iana"
    },
    	"video/vnd.radgamettools.bink": {
    	source: "iana"
    },
    	"video/vnd.radgamettools.smacker": {
    	source: "iana"
    },
    	"video/vnd.sealed.mpeg1": {
    	source: "iana"
    },
    	"video/vnd.sealed.mpeg4": {
    	source: "iana"
    },
    	"video/vnd.sealed.swf": {
    	source: "iana"
    },
    	"video/vnd.sealedmedia.softseal.mov": {
    	source: "iana"
    },
    	"video/vnd.uvvu.mp4": {
    	source: "iana",
    	extensions: [
    		"uvu",
    		"uvvu"
    	]
    },
    	"video/vnd.vivo": {
    	source: "iana",
    	extensions: [
    		"viv"
    	]
    },
    	"video/vnd.youtube.yt": {
    	source: "iana"
    },
    	"video/vp8": {
    	source: "iana"
    },
    	"video/vp9": {
    	source: "iana"
    },
    	"video/webm": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"webm"
    	]
    },
    	"video/x-f4v": {
    	source: "apache",
    	extensions: [
    		"f4v"
    	]
    },
    	"video/x-fli": {
    	source: "apache",
    	extensions: [
    		"fli"
    	]
    },
    	"video/x-flv": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"flv"
    	]
    },
    	"video/x-m4v": {
    	source: "apache",
    	extensions: [
    		"m4v"
    	]
    },
    	"video/x-matroska": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"mkv",
    		"mk3d",
    		"mks"
    	]
    },
    	"video/x-mng": {
    	source: "apache",
    	extensions: [
    		"mng"
    	]
    },
    	"video/x-ms-asf": {
    	source: "apache",
    	extensions: [
    		"asf",
    		"asx"
    	]
    },
    	"video/x-ms-vob": {
    	source: "apache",
    	extensions: [
    		"vob"
    	]
    },
    	"video/x-ms-wm": {
    	source: "apache",
    	extensions: [
    		"wm"
    	]
    },
    	"video/x-ms-wmv": {
    	source: "apache",
    	compressible: false,
    	extensions: [
    		"wmv"
    	]
    },
    	"video/x-ms-wmx": {
    	source: "apache",
    	extensions: [
    		"wmx"
    	]
    },
    	"video/x-ms-wvx": {
    	source: "apache",
    	extensions: [
    		"wvx"
    	]
    },
    	"video/x-msvideo": {
    	source: "apache",
    	extensions: [
    		"avi"
    	]
    },
    	"video/x-sgi-movie": {
    	source: "apache",
    	extensions: [
    		"movie"
    	]
    },
    	"video/x-smv": {
    	source: "apache",
    	extensions: [
    		"smv"
    	]
    },
    	"x-conference/x-cooltalk": {
    	source: "apache",
    	extensions: [
    		"ice"
    	]
    },
    	"x-shader/x-fragment": {
    	compressible: true
    },
    	"x-shader/x-vertex": {
    	compressible: true
    }
    };

    /*!
     * mime-db
     * Copyright(c) 2014 Jonathan Ong
     * Copyright(c) 2015-2022 Douglas Christopher Wilson
     * MIT Licensed
     */

    (function (module) {
    	/**
    	 * Module exports.
    	 */

    	module.exports = require$$0;
    } (mimeDb));

    /*!
     * mime-types
     * Copyright(c) 2014 Jonathan Ong
     * Copyright(c) 2015 Douglas Christopher Wilson
     * MIT Licensed
     */

    (function (exports) {

    	/**
    	 * Module dependencies.
    	 * @private
    	 */

    	var db = mimeDb.exports;
    	var extname = require$$1__default$1["default"].extname;

    	/**
    	 * Module variables.
    	 * @private
    	 */

    	var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    	var TEXT_TYPE_REGEXP = /^text\//i;

    	/**
    	 * Module exports.
    	 * @public
    	 */

    	exports.charset = charset;
    	exports.charsets = { lookup: charset };
    	exports.contentType = contentType;
    	exports.extension = extension;
    	exports.extensions = Object.create(null);
    	exports.lookup = lookup;
    	exports.types = Object.create(null);

    	// Populate the extensions/types maps
    	populateMaps(exports.extensions, exports.types);

    	/**
    	 * Get the default charset for a MIME type.
    	 *
    	 * @param {string} type
    	 * @return {boolean|string}
    	 */

    	function charset (type) {
    	  if (!type || typeof type !== 'string') {
    	    return false
    	  }

    	  // TODO: use media-typer
    	  var match = EXTRACT_TYPE_REGEXP.exec(type);
    	  var mime = match && db[match[1].toLowerCase()];

    	  if (mime && mime.charset) {
    	    return mime.charset
    	  }

    	  // default text/* to utf-8
    	  if (match && TEXT_TYPE_REGEXP.test(match[1])) {
    	    return 'UTF-8'
    	  }

    	  return false
    	}

    	/**
    	 * Create a full Content-Type header given a MIME type or extension.
    	 *
    	 * @param {string} str
    	 * @return {boolean|string}
    	 */

    	function contentType (str) {
    	  // TODO: should this even be in this module?
    	  if (!str || typeof str !== 'string') {
    	    return false
    	  }

    	  var mime = str.indexOf('/') === -1
    	    ? exports.lookup(str)
    	    : str;

    	  if (!mime) {
    	    return false
    	  }

    	  // TODO: use content-type or other module
    	  if (mime.indexOf('charset') === -1) {
    	    var charset = exports.charset(mime);
    	    if (charset) mime += '; charset=' + charset.toLowerCase();
    	  }

    	  return mime
    	}

    	/**
    	 * Get the default extension for a MIME type.
    	 *
    	 * @param {string} type
    	 * @return {boolean|string}
    	 */

    	function extension (type) {
    	  if (!type || typeof type !== 'string') {
    	    return false
    	  }

    	  // TODO: use media-typer
    	  var match = EXTRACT_TYPE_REGEXP.exec(type);

    	  // get extensions
    	  var exts = match && exports.extensions[match[1].toLowerCase()];

    	  if (!exts || !exts.length) {
    	    return false
    	  }

    	  return exts[0]
    	}

    	/**
    	 * Lookup the MIME type for a file path/extension.
    	 *
    	 * @param {string} path
    	 * @return {boolean|string}
    	 */

    	function lookup (path) {
    	  if (!path || typeof path !== 'string') {
    	    return false
    	  }

    	  // get the extension ("ext" or ".ext" or full path)
    	  var extension = extname('x.' + path)
    	    .toLowerCase()
    	    .substr(1);

    	  if (!extension) {
    	    return false
    	  }

    	  return exports.types[extension] || false
    	}

    	/**
    	 * Populate the extensions and types maps.
    	 * @private
    	 */

    	function populateMaps (extensions, types) {
    	  // source preference (least -> most)
    	  var preference = ['nginx', 'apache', undefined, 'iana'];

    	  Object.keys(db).forEach(function forEachMimeType (type) {
    	    var mime = db[type];
    	    var exts = mime.extensions;

    	    if (!exts || !exts.length) {
    	      return
    	    }

    	    // mime -> extensions
    	    extensions[type] = exts;

    	    // extension -> mime
    	    for (var i = 0; i < exts.length; i++) {
    	      var extension = exts[i];

    	      if (types[extension]) {
    	        var from = preference.indexOf(db[types[extension]].source);
    	        var to = preference.indexOf(mime.source);

    	        if (types[extension] !== 'application/octet-stream' &&
    	          (from > to || (from === to && types[extension].substr(0, 12) === 'application/'))) {
    	          // skip the remapping
    	          continue
    	        }
    	      }

    	      // set the extension -> mime
    	      types[extension] = type;
    	    }
    	  });
    	}
    } (mimeTypes));

    var defer_1 = defer$1;

    /**
     * Runs provided function on next iteration of the event loop
     *
     * @param {function} fn - function to run
     */
    function defer$1(fn)
    {
      var nextTick = typeof setImmediate == 'function'
        ? setImmediate
        : (
          typeof process == 'object' && typeof process.nextTick == 'function'
          ? process.nextTick
          : null
        );

      if (nextTick)
      {
        nextTick(fn);
      }
      else
      {
        setTimeout(fn, 0);
      }
    }

    var defer = defer_1;

    // API
    var async_1 = async$2;

    /**
     * Runs provided callback asynchronously
     * even if callback itself is not
     *
     * @param   {function} callback - callback to invoke
     * @returns {function} - augmented callback
     */
    function async$2(callback)
    {
      var isAsync = false;

      // check if async happened
      defer(function() { isAsync = true; });

      return function async_callback(err, result)
      {
        if (isAsync)
        {
          callback(err, result);
        }
        else
        {
          defer(function nextTick_callback()
          {
            callback(err, result);
          });
        }
      };
    }

    // API
    var abort_1 = abort$2;

    /**
     * Aborts leftover active jobs
     *
     * @param {object} state - current state object
     */
    function abort$2(state)
    {
      Object.keys(state.jobs).forEach(clean.bind(state));

      // reset leftover jobs
      state.jobs = {};
    }

    /**
     * Cleans up leftover job by invoking abort function for the provided job id
     *
     * @this  state
     * @param {string|number} key - job id to abort
     */
    function clean(key)
    {
      if (typeof this.jobs[key] == 'function')
      {
        this.jobs[key]();
      }
    }

    var async$1 = async_1
      , abort$1 = abort_1
      ;

    // API
    var iterate_1 = iterate$2;

    /**
     * Iterates over each job object
     *
     * @param {array|object} list - array or object (named list) to iterate over
     * @param {function} iterator - iterator to run
     * @param {object} state - current job status
     * @param {function} callback - invoked when all elements processed
     */
    function iterate$2(list, iterator, state, callback)
    {
      // store current index
      var key = state['keyedList'] ? state['keyedList'][state.index] : state.index;

      state.jobs[key] = runJob(iterator, key, list[key], function(error, output)
      {
        // don't repeat yourself
        // skip secondary callbacks
        if (!(key in state.jobs))
        {
          return;
        }

        // clean up jobs
        delete state.jobs[key];

        if (error)
        {
          // don't process rest of the results
          // stop still active jobs
          // and reset the list
          abort$1(state);
        }
        else
        {
          state.results[key] = output;
        }

        // return salvaged results
        callback(error, state.results);
      });
    }

    /**
     * Runs iterator over provided job element
     *
     * @param   {function} iterator - iterator to invoke
     * @param   {string|number} key - key/index of the element in the list of jobs
     * @param   {mixed} item - job description
     * @param   {function} callback - invoked after iterator is done with the job
     * @returns {function|mixed} - job abort function or something else
     */
    function runJob(iterator, key, item, callback)
    {
      var aborter;

      // allow shortcut if iterator expects only two arguments
      if (iterator.length == 2)
      {
        aborter = iterator(item, async$1(callback));
      }
      // otherwise go with full three arguments
      else
      {
        aborter = iterator(item, key, async$1(callback));
      }

      return aborter;
    }

    // API
    var state_1 = state;

    /**
     * Creates initial state object
     * for iteration over list
     *
     * @param   {array|object} list - list to iterate over
     * @param   {function|null} sortMethod - function to use for keys sort,
     *                                     or `null` to keep them as is
     * @returns {object} - initial state object
     */
    function state(list, sortMethod)
    {
      var isNamedList = !Array.isArray(list)
        , initState =
        {
          index    : 0,
          keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
          jobs     : {},
          results  : isNamedList ? {} : [],
          size     : isNamedList ? Object.keys(list).length : list.length
        }
        ;

      if (sortMethod)
      {
        // sort array keys based on it's values
        // sort object's keys just on own merit
        initState.keyedList.sort(isNamedList ? sortMethod : function(a, b)
        {
          return sortMethod(list[a], list[b]);
        });
      }

      return initState;
    }

    var abort = abort_1
      , async = async_1
      ;

    // API
    var terminator_1 = terminator$2;

    /**
     * Terminates jobs in the attached state context
     *
     * @this  AsyncKitState#
     * @param {function} callback - final callback to invoke after termination
     */
    function terminator$2(callback)
    {
      if (!Object.keys(this.jobs).length)
      {
        return;
      }

      // fast forward iteration index
      this.index = this.size;

      // abort jobs
      abort(this);

      // send back results we have so far
      async(callback)(null, this.results);
    }

    var iterate$1    = iterate_1
      , initState$1  = state_1
      , terminator$1 = terminator_1
      ;

    // Public API
    var parallel_1 = parallel;

    /**
     * Runs iterator over provided array elements in parallel
     *
     * @param   {array|object} list - array or object (named list) to iterate over
     * @param   {function} iterator - iterator to run
     * @param   {function} callback - invoked when all elements processed
     * @returns {function} - jobs terminator
     */
    function parallel(list, iterator, callback)
    {
      var state = initState$1(list);

      while (state.index < (state['keyedList'] || list).length)
      {
        iterate$1(list, iterator, state, function(error, result)
        {
          if (error)
          {
            callback(error, result);
            return;
          }

          // looks like it's the last one
          if (Object.keys(state.jobs).length === 0)
          {
            callback(null, state.results);
            return;
          }
        });

        state.index++;
      }

      return terminator$1.bind(state, callback);
    }

    var serialOrdered$2 = {exports: {}};

    var iterate    = iterate_1
      , initState  = state_1
      , terminator = terminator_1
      ;

    // Public API
    serialOrdered$2.exports = serialOrdered$1;
    // sorting helpers
    serialOrdered$2.exports.ascending  = ascending;
    serialOrdered$2.exports.descending = descending;

    /**
     * Runs iterator over provided sorted array elements in series
     *
     * @param   {array|object} list - array or object (named list) to iterate over
     * @param   {function} iterator - iterator to run
     * @param   {function} sortMethod - custom sort function
     * @param   {function} callback - invoked when all elements processed
     * @returns {function} - jobs terminator
     */
    function serialOrdered$1(list, iterator, sortMethod, callback)
    {
      var state = initState(list, sortMethod);

      iterate(list, iterator, state, function iteratorHandler(error, result)
      {
        if (error)
        {
          callback(error, result);
          return;
        }

        state.index++;

        // are we there yet?
        if (state.index < (state['keyedList'] || list).length)
        {
          iterate(list, iterator, state, iteratorHandler);
          return;
        }

        // done here
        callback(null, state.results);
      });

      return terminator.bind(state, callback);
    }

    /*
     * -- Sort methods
     */

    /**
     * sort helper to sort array elements in ascending order
     *
     * @param   {mixed} a - an item to compare
     * @param   {mixed} b - an item to compare
     * @returns {number} - comparison result
     */
    function ascending(a, b)
    {
      return a < b ? -1 : a > b ? 1 : 0;
    }

    /**
     * sort helper to sort array elements in descending order
     *
     * @param   {mixed} a - an item to compare
     * @param   {mixed} b - an item to compare
     * @returns {number} - comparison result
     */
    function descending(a, b)
    {
      return -1 * ascending(a, b);
    }

    var serialOrdered = serialOrdered$2.exports;

    // Public API
    var serial_1 = serial;

    /**
     * Runs iterator over provided array elements in series
     *
     * @param   {array|object} list - array or object (named list) to iterate over
     * @param   {function} iterator - iterator to run
     * @param   {function} callback - invoked when all elements processed
     * @returns {function} - jobs terminator
     */
    function serial(list, iterator, callback)
    {
      return serialOrdered(list, iterator, null, callback);
    }

    var asynckit$1 =
    {
      parallel      : parallel_1,
      serial        : serial_1,
      serialOrdered : serialOrdered$2.exports
    };

    // populates missing values
    var populate$1 = function(dst, src) {

      Object.keys(src).forEach(function(prop)
      {
        dst[prop] = dst[prop] || src[prop];
      });

      return dst;
    };

    var CombinedStream = combined_stream;
    var util = require$$1__default["default"];
    var path = require$$1__default$1["default"];
    var http$1 = require$$3__default["default"];
    var https$1 = require$$4__default["default"];
    var parseUrl$1 = require$$0__default["default"].parse;
    var fs = require$$6__default["default"];
    var Stream = stream__default["default"].Stream;
    var mime = mimeTypes;
    var asynckit = asynckit$1;
    var populate = populate$1;

    // Public API
    var form_data = FormData$1;

    // make it a Stream
    util.inherits(FormData$1, CombinedStream);

    /**
     * Create readable "multipart/form-data" streams.
     * Can be used to submit forms
     * and file uploads to other web applications.
     *
     * @constructor
     * @param {Object} options - Properties to be added/overriden for FormData and CombinedStream
     */
    function FormData$1(options) {
      if (!(this instanceof FormData$1)) {
        return new FormData$1(options);
      }

      this._overheadLength = 0;
      this._valueLength = 0;
      this._valuesToMeasure = [];

      CombinedStream.call(this);

      options = options || {};
      for (var option in options) {
        this[option] = options[option];
      }
    }

    FormData$1.LINE_BREAK = '\r\n';
    FormData$1.DEFAULT_CONTENT_TYPE = 'application/octet-stream';

    FormData$1.prototype.append = function(field, value, options) {

      options = options || {};

      // allow filename as single option
      if (typeof options == 'string') {
        options = {filename: options};
      }

      var append = CombinedStream.prototype.append.bind(this);

      // all that streamy business can't handle numbers
      if (typeof value == 'number') {
        value = '' + value;
      }

      // https://github.com/felixge/node-form-data/issues/38
      if (util.isArray(value)) {
        // Please convert your array into string
        // the way web server expects it
        this._error(new Error('Arrays are not supported.'));
        return;
      }

      var header = this._multiPartHeader(field, value, options);
      var footer = this._multiPartFooter();

      append(header);
      append(value);
      append(footer);

      // pass along options.knownLength
      this._trackLength(header, value, options);
    };

    FormData$1.prototype._trackLength = function(header, value, options) {
      var valueLength = 0;

      // used w/ getLengthSync(), when length is known.
      // e.g. for streaming directly from a remote server,
      // w/ a known file a size, and not wanting to wait for
      // incoming file to finish to get its size.
      if (options.knownLength != null) {
        valueLength += +options.knownLength;
      } else if (Buffer.isBuffer(value)) {
        valueLength = value.length;
      } else if (typeof value === 'string') {
        valueLength = Buffer.byteLength(value);
      }

      this._valueLength += valueLength;

      // @check why add CRLF? does this account for custom/multiple CRLFs?
      this._overheadLength +=
        Buffer.byteLength(header) +
        FormData$1.LINE_BREAK.length;

      // empty or either doesn't have path or not an http response or not a stream
      if (!value || ( !value.path && !(value.readable && value.hasOwnProperty('httpVersion')) && !(value instanceof Stream))) {
        return;
      }

      // no need to bother with the length
      if (!options.knownLength) {
        this._valuesToMeasure.push(value);
      }
    };

    FormData$1.prototype._lengthRetriever = function(value, callback) {

      if (value.hasOwnProperty('fd')) {

        // take read range into a account
        // `end` = Infinity –> read file till the end
        //
        // TODO: Looks like there is bug in Node fs.createReadStream
        // it doesn't respect `end` options without `start` options
        // Fix it when node fixes it.
        // https://github.com/joyent/node/issues/7819
        if (value.end != undefined && value.end != Infinity && value.start != undefined) {

          // when end specified
          // no need to calculate range
          // inclusive, starts with 0
          callback(null, value.end + 1 - (value.start ? value.start : 0));

        // not that fast snoopy
        } else {
          // still need to fetch file size from fs
          fs.stat(value.path, function(err, stat) {

            var fileSize;

            if (err) {
              callback(err);
              return;
            }

            // update final size based on the range options
            fileSize = stat.size - (value.start ? value.start : 0);
            callback(null, fileSize);
          });
        }

      // or http response
      } else if (value.hasOwnProperty('httpVersion')) {
        callback(null, +value.headers['content-length']);

      // or request stream http://github.com/mikeal/request
      } else if (value.hasOwnProperty('httpModule')) {
        // wait till response come back
        value.on('response', function(response) {
          value.pause();
          callback(null, +response.headers['content-length']);
        });
        value.resume();

      // something else
      } else {
        callback('Unknown stream');
      }
    };

    FormData$1.prototype._multiPartHeader = function(field, value, options) {
      // custom header specified (as string)?
      // it becomes responsible for boundary
      // (e.g. to handle extra CRLFs on .NET servers)
      if (typeof options.header == 'string') {
        return options.header;
      }

      var contentDisposition = this._getContentDisposition(value, options);
      var contentType = this._getContentType(value, options);

      var contents = '';
      var headers  = {
        // add custom disposition as third element or keep it two elements if not
        'Content-Disposition': ['form-data', 'name="' + field + '"'].concat(contentDisposition || []),
        // if no content type. allow it to be empty array
        'Content-Type': [].concat(contentType || [])
      };

      // allow custom headers.
      if (typeof options.header == 'object') {
        populate(headers, options.header);
      }

      var header;
      for (var prop in headers) {
        if (!headers.hasOwnProperty(prop)) continue;
        header = headers[prop];

        // skip nullish headers.
        if (header == null) {
          continue;
        }

        // convert all headers to arrays.
        if (!Array.isArray(header)) {
          header = [header];
        }

        // add non-empty headers.
        if (header.length) {
          contents += prop + ': ' + header.join('; ') + FormData$1.LINE_BREAK;
        }
      }

      return '--' + this.getBoundary() + FormData$1.LINE_BREAK + contents + FormData$1.LINE_BREAK;
    };

    FormData$1.prototype._getContentDisposition = function(value, options) {

      var filename
        , contentDisposition
        ;

      if (typeof options.filepath === 'string') {
        // custom filepath for relative paths
        filename = path.normalize(options.filepath).replace(/\\/g, '/');
      } else if (options.filename || value.name || value.path) {
        // custom filename take precedence
        // formidable and the browser add a name property
        // fs- and request- streams have path property
        filename = path.basename(options.filename || value.name || value.path);
      } else if (value.readable && value.hasOwnProperty('httpVersion')) {
        // or try http response
        filename = path.basename(value.client._httpMessage.path || '');
      }

      if (filename) {
        contentDisposition = 'filename="' + filename + '"';
      }

      return contentDisposition;
    };

    FormData$1.prototype._getContentType = function(value, options) {

      // use custom content-type above all
      var contentType = options.contentType;

      // or try `name` from formidable, browser
      if (!contentType && value.name) {
        contentType = mime.lookup(value.name);
      }

      // or try `path` from fs-, request- streams
      if (!contentType && value.path) {
        contentType = mime.lookup(value.path);
      }

      // or if it's http-reponse
      if (!contentType && value.readable && value.hasOwnProperty('httpVersion')) {
        contentType = value.headers['content-type'];
      }

      // or guess it from the filepath or filename
      if (!contentType && (options.filepath || options.filename)) {
        contentType = mime.lookup(options.filepath || options.filename);
      }

      // fallback to the default content type if `value` is not simple value
      if (!contentType && typeof value == 'object') {
        contentType = FormData$1.DEFAULT_CONTENT_TYPE;
      }

      return contentType;
    };

    FormData$1.prototype._multiPartFooter = function() {
      return function(next) {
        var footer = FormData$1.LINE_BREAK;

        var lastPart = (this._streams.length === 0);
        if (lastPart) {
          footer += this._lastBoundary();
        }

        next(footer);
      }.bind(this);
    };

    FormData$1.prototype._lastBoundary = function() {
      return '--' + this.getBoundary() + '--' + FormData$1.LINE_BREAK;
    };

    FormData$1.prototype.getHeaders = function(userHeaders) {
      var header;
      var formHeaders = {
        'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
      };

      for (header in userHeaders) {
        if (userHeaders.hasOwnProperty(header)) {
          formHeaders[header.toLowerCase()] = userHeaders[header];
        }
      }

      return formHeaders;
    };

    FormData$1.prototype.setBoundary = function(boundary) {
      this._boundary = boundary;
    };

    FormData$1.prototype.getBoundary = function() {
      if (!this._boundary) {
        this._generateBoundary();
      }

      return this._boundary;
    };

    FormData$1.prototype.getBuffer = function() {
      var dataBuffer = new Buffer.alloc( 0 );
      var boundary = this.getBoundary();

      // Create the form content. Add Line breaks to the end of data.
      for (var i = 0, len = this._streams.length; i < len; i++) {
        if (typeof this._streams[i] !== 'function') {

          // Add content to the buffer.
          if(Buffer.isBuffer(this._streams[i])) {
            dataBuffer = Buffer.concat( [dataBuffer, this._streams[i]]);
          }else {
            dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(this._streams[i])]);
          }

          // Add break after content.
          if (typeof this._streams[i] !== 'string' || this._streams[i].substring( 2, boundary.length + 2 ) !== boundary) {
            dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(FormData$1.LINE_BREAK)] );
          }
        }
      }

      // Add the footer and return the Buffer object.
      return Buffer.concat( [dataBuffer, Buffer.from(this._lastBoundary())] );
    };

    FormData$1.prototype._generateBoundary = function() {
      // This generates a 50 character boundary similar to those used by Firefox.
      // They are optimized for boyer-moore parsing.
      var boundary = '--------------------------';
      for (var i = 0; i < 24; i++) {
        boundary += Math.floor(Math.random() * 10).toString(16);
      }

      this._boundary = boundary;
    };

    // Note: getLengthSync DOESN'T calculate streams length
    // As workaround one can calculate file size manually
    // and add it as knownLength option
    FormData$1.prototype.getLengthSync = function() {
      var knownLength = this._overheadLength + this._valueLength;

      // Don't get confused, there are 3 "internal" streams for each keyval pair
      // so it basically checks if there is any value added to the form
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }

      // https://github.com/form-data/form-data/issues/40
      if (!this.hasKnownLength()) {
        // Some async length retrievers are present
        // therefore synchronous length calculation is false.
        // Please use getLength(callback) to get proper length
        this._error(new Error('Cannot calculate proper length in synchronous way.'));
      }

      return knownLength;
    };

    // Public API to check if length of added values is known
    // https://github.com/form-data/form-data/issues/196
    // https://github.com/form-data/form-data/issues/262
    FormData$1.prototype.hasKnownLength = function() {
      var hasKnownLength = true;

      if (this._valuesToMeasure.length) {
        hasKnownLength = false;
      }

      return hasKnownLength;
    };

    FormData$1.prototype.getLength = function(cb) {
      var knownLength = this._overheadLength + this._valueLength;

      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }

      if (!this._valuesToMeasure.length) {
        process.nextTick(cb.bind(this, null, knownLength));
        return;
      }

      asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
        if (err) {
          cb(err);
          return;
        }

        values.forEach(function(length) {
          knownLength += length;
        });

        cb(null, knownLength);
      });
    };

    FormData$1.prototype.submit = function(params, cb) {
      var request
        , options
        , defaults = {method: 'post'}
        ;

      // parse provided url if it's string
      // or treat it as options object
      if (typeof params == 'string') {

        params = parseUrl$1(params);
        options = populate({
          port: params.port,
          path: params.pathname,
          host: params.hostname,
          protocol: params.protocol
        }, defaults);

      // use custom params
      } else {

        options = populate(params, defaults);
        // if no port provided use default one
        if (!options.port) {
          options.port = options.protocol == 'https:' ? 443 : 80;
        }
      }

      // put that good code in getHeaders to some use
      options.headers = this.getHeaders(params.headers);

      // https if specified, fallback to http in any other case
      if (options.protocol == 'https:') {
        request = https$1.request(options);
      } else {
        request = http$1.request(options);
      }

      // get content length and fire away
      this.getLength(function(err, length) {
        if (err && err !== 'Unknown stream') {
          this._error(err);
          return;
        }

        // add content length
        if (length) {
          request.setHeader('Content-Length', length);
        }

        this.pipe(request);
        if (cb) {
          var onResponse;

          var callback = function (error, responce) {
            request.removeListener('error', callback);
            request.removeListener('response', onResponse);

            return cb.call(this, error, responce);
          };

          onResponse = callback.bind(this, null);

          request.on('error', callback);
          request.on('response', onResponse);
        }
      }.bind(this));

      return request;
    };

    FormData$1.prototype._error = function(err) {
      if (!this.error) {
        this.error = err;
        this.pause();
        this.emit('error', err);
      }
    };

    FormData$1.prototype.toString = function () {
      return '[object FormData]';
    };

    /**
     * Determines if the given thing is a array or js object.
     *
     * @param {string} thing - The object or array to be visited.
     *
     * @returns {boolean}
     */
    function isVisitable(thing) {
      return utils.isPlainObject(thing) || utils.isArray(thing);
    }

    /**
     * It removes the brackets from the end of a string
     *
     * @param {string} key - The key of the parameter.
     *
     * @returns {string} the key without the brackets.
     */
    function removeBrackets(key) {
      return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
    }

    /**
     * It takes a path, a key, and a boolean, and returns a string
     *
     * @param {string} path - The path to the current key.
     * @param {string} key - The key of the current object being iterated over.
     * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
     *
     * @returns {string} The path to the current key.
     */
    function renderKey(path, key, dots) {
      if (!path) return key;
      return path.concat(key).map(function each(token, i) {
        // eslint-disable-next-line no-param-reassign
        token = removeBrackets(token);
        return !dots && i ? '[' + token + ']' : token;
      }).join(dots ? '.' : '');
    }

    /**
     * If the array is an array and none of its elements are visitable, then it's a flat array.
     *
     * @param {Array<any>} arr - The array to check
     *
     * @returns {boolean}
     */
    function isFlatArray(arr) {
      return utils.isArray(arr) && !arr.some(isVisitable);
    }

    const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
      return /^is[A-Z]/.test(prop);
    });

    /**
     * If the thing is a FormData object, return true, otherwise return false.
     *
     * @param {unknown} thing - The thing to check.
     *
     * @returns {boolean}
     */
    function isSpecCompliant(thing) {
      return thing && utils.isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator];
    }

    /**
     * Convert a data object to FormData
     *
     * @param {Object} obj
     * @param {?Object} [formData]
     * @param {?Object} [options]
     * @param {Function} [options.visitor]
     * @param {Boolean} [options.metaTokens = true]
     * @param {Boolean} [options.dots = false]
     * @param {?Boolean} [options.indexes = false]
     *
     * @returns {Object}
     **/

    /**
     * It converts an object into a FormData object
     *
     * @param {Object<any, any>} obj - The object to convert to form data.
     * @param {string} formData - The FormData object to append to.
     * @param {Object<string, any>} options
     *
     * @returns
     */
    function toFormData(obj, formData, options) {
      if (!utils.isObject(obj)) {
        throw new TypeError('target must be an object');
      }

      // eslint-disable-next-line no-param-reassign
      formData = formData || new (form_data || FormData)();

      // eslint-disable-next-line no-param-reassign
      options = utils.toFlatObject(options, {
        metaTokens: true,
        dots: false,
        indexes: false
      }, false, function defined(option, source) {
        // eslint-disable-next-line no-eq-null,eqeqeq
        return !utils.isUndefined(source[option]);
      });

      const metaTokens = options.metaTokens;
      // eslint-disable-next-line no-use-before-define
      const visitor = options.visitor || defaultVisitor;
      const dots = options.dots;
      const indexes = options.indexes;
      const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
      const useBlob = _Blob && isSpecCompliant(formData);

      if (!utils.isFunction(visitor)) {
        throw new TypeError('visitor must be a function');
      }

      function convertValue(value) {
        if (value === null) return '';

        if (utils.isDate(value)) {
          return value.toISOString();
        }

        if (!useBlob && utils.isBlob(value)) {
          throw new AxiosError('Blob is not supported. Use a Buffer instead.');
        }

        if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
          return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
        }

        return value;
      }

      /**
       * Default visitor.
       *
       * @param {*} value
       * @param {String|Number} key
       * @param {Array<String|Number>} path
       * @this {FormData}
       *
       * @returns {boolean} return true to visit the each prop of the value recursively
       */
      function defaultVisitor(value, key, path) {
        let arr = value;

        if (value && !path && typeof value === 'object') {
          if (utils.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            key = metaTokens ? key : key.slice(0, -2);
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (
            (utils.isArray(value) && isFlatArray(value)) ||
            (utils.isFileList(value) || utils.endsWith(key, '[]') && (arr = utils.toArray(value))
            )) {
            // eslint-disable-next-line no-param-reassign
            key = removeBrackets(key);

            arr.forEach(function each(el, index) {
              !(utils.isUndefined(el) || el === null) && formData.append(
                // eslint-disable-next-line no-nested-ternary
                indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
                convertValue(el)
              );
            });
            return false;
          }
        }

        if (isVisitable(value)) {
          return true;
        }

        formData.append(renderKey(path, key, dots), convertValue(value));

        return false;
      }

      const stack = [];

      const exposedHelpers = Object.assign(predicates, {
        defaultVisitor,
        convertValue,
        isVisitable
      });

      function build(value, path) {
        if (utils.isUndefined(value)) return;

        if (stack.indexOf(value) !== -1) {
          throw Error('Circular reference detected in ' + path.join('.'));
        }

        stack.push(value);

        utils.forEach(value, function each(el, key) {
          const result = !(utils.isUndefined(el) || el === null) && visitor.call(
            formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers
          );

          if (result === true) {
            build(el, path ? path.concat(key) : [key]);
          }
        });

        stack.pop();
      }

      if (!utils.isObject(obj)) {
        throw new TypeError('data must be an object');
      }

      build(obj);

      return formData;
    }

    /**
     * It encodes a string by replacing all characters that are not in the unreserved set with
     * their percent-encoded equivalents
     *
     * @param {string} str - The string to encode.
     *
     * @returns {string} The encoded string.
     */
    function encode$1(str) {
      const charMap = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\x00'
      };
      return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
        return charMap[match];
      });
    }

    /**
     * It takes a params object and converts it to a FormData object
     *
     * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
     * @param {Object<string, any>} options - The options object passed to the Axios constructor.
     *
     * @returns {void}
     */
    function AxiosURLSearchParams(params, options) {
      this._pairs = [];

      params && toFormData(params, this, options);
    }

    const prototype = AxiosURLSearchParams.prototype;

    prototype.append = function append(name, value) {
      this._pairs.push([name, value]);
    };

    prototype.toString = function toString(encoder) {
      const _encode = encoder ? function(value) {
        return encoder.call(this, value, encode$1);
      } : encode$1;

      return this._pairs.map(function each(pair) {
        return _encode(pair[0]) + '=' + _encode(pair[1]);
      }, '').join('&');
    };

    /**
     * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
     * URI encoded counterparts
     *
     * @param {string} val The value to be encoded.
     *
     * @returns {string} The encoded value.
     */
    function encode(val) {
      return encodeURIComponent(val).
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%20/g, '+').
        replace(/%5B/gi, '[').
        replace(/%5D/gi, ']');
    }

    /**
     * Build a URL by appending params to the end
     *
     * @param {string} url The base of the url (e.g., http://www.google.com)
     * @param {object} [params] The params to be appended
     * @param {?object} options
     *
     * @returns {string} The formatted url
     */
    function buildURL(url, params, options) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }
      
      const _encode = options && options.encode || encode;

      const serializeFn = options && options.serialize;

      let serializedParams;

      if (serializeFn) {
        serializedParams = serializeFn(params, options);
      } else {
        serializedParams = utils.isURLSearchParams(params) ?
          params.toString() :
          new AxiosURLSearchParams(params, options).toString(_encode);
      }

      if (serializedParams) {
        const hashmarkIndex = url.indexOf("#");

        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }

      return url;
    }

    class InterceptorManager {
      constructor() {
        this.handlers = [];
      }

      /**
       * Add a new interceptor to the stack
       *
       * @param {Function} fulfilled The function to handle `then` for a `Promise`
       * @param {Function} rejected The function to handle `reject` for a `Promise`
       *
       * @return {Number} An ID used to remove interceptor later
       */
      use(fulfilled, rejected, options) {
        this.handlers.push({
          fulfilled,
          rejected,
          synchronous: options ? options.synchronous : false,
          runWhen: options ? options.runWhen : null
        });
        return this.handlers.length - 1;
      }

      /**
       * Remove an interceptor from the stack
       *
       * @param {Number} id The ID that was returned by `use`
       *
       * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
       */
      eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      }

      /**
       * Clear all interceptors from the stack
       *
       * @returns {void}
       */
      clear() {
        if (this.handlers) {
          this.handlers = [];
        }
      }

      /**
       * Iterate over all the registered interceptors
       *
       * This method is particularly useful for skipping over any
       * interceptors that may have become `null` calling `eject`.
       *
       * @param {Function} fn The function to call for each interceptor
       *
       * @returns {void}
       */
      forEach(fn) {
        utils.forEach(this.handlers, function forEachHandler(h) {
          if (h !== null) {
            fn(h);
          }
        });
      }
    }

    var transitionalDefaults = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };

    var URLSearchParams = require$$0__default["default"].URLSearchParams;

    var platform = {
      isNode: true,
      classes: {
        URLSearchParams,
        FormData: form_data,
        Blob: typeof Blob !== 'undefined' && Blob || null
      },
      protocols: [ 'http', 'https', 'file', 'data' ]
    };

    function toURLEncodedForm(data, options) {
      return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
        visitor: function(value, key, path, helpers) {
          if (utils.isBuffer(value)) {
            this.append(key, value.toString('base64'));
            return false;
          }

          return helpers.defaultVisitor.apply(this, arguments);
        }
      }, options));
    }

    /**
     * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
     *
     * @param {string} name - The name of the property to get.
     *
     * @returns An array of strings.
     */
    function parsePropPath(name) {
      // foo[x][y][z]
      // foo.x.y.z
      // foo-x-y-z
      // foo x y z
      return utils.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
        return match[0] === '[]' ? '' : match[1] || match[0];
      });
    }

    /**
     * Convert an array to an object.
     *
     * @param {Array<any>} arr - The array to convert to an object.
     *
     * @returns An object with the same keys and values as the array.
     */
    function arrayToObject(arr) {
      const obj = {};
      const keys = Object.keys(arr);
      let i;
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        obj[key] = arr[key];
      }
      return obj;
    }

    /**
     * It takes a FormData object and returns a JavaScript object
     *
     * @param {string} formData The FormData object to convert to JSON.
     *
     * @returns {Object<string, any> | null} The converted object.
     */
    function formDataToJSON(formData) {
      function buildPath(path, value, target, index) {
        let name = path[index++];
        const isNumericKey = Number.isFinite(+name);
        const isLast = index >= path.length;
        name = !name && utils.isArray(target) ? target.length : name;

        if (isLast) {
          if (utils.hasOwnProp(target, name)) {
            target[name] = [target[name], value];
          } else {
            target[name] = value;
          }

          return !isNumericKey;
        }

        if (!target[name] || !utils.isObject(target[name])) {
          target[name] = [];
        }

        const result = buildPath(path, value, target[name], index);

        if (result && utils.isArray(target[name])) {
          target[name] = arrayToObject(target[name]);
        }

        return !isNumericKey;
      }

      if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
        const obj = {};

        utils.forEachEntry(formData, (name, value) => {
          buildPath(parsePropPath(name), value, obj, 0);
        });

        return obj;
      }

      return null;
    }

    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     *
     * @returns {object} The response.
     */
    function settle(resolve, reject, response) {
      const validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError(
          'Request failed with status code ' + response.status,
          [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    }

    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     *
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */
    function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    }

    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     *
     * @returns {string} The combined URL
     */
    function combineURLs(baseURL, relativeURL) {
      return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
    }

    /**
     * Creates a new URL by combining the baseURL with the requestedURL,
     * only when the requestedURL is not already an absolute URL.
     * If the requestURL is absolute, this function returns the requestedURL untouched.
     *
     * @param {string} baseURL The base URL
     * @param {string} requestedURL Absolute or relative URL to combine
     *
     * @returns {string} The combined full path
     */
    function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    }

    var parseUrl = require$$0__default["default"].parse;

    var DEFAULT_PORTS = {
      ftp: 21,
      gopher: 70,
      http: 80,
      https: 443,
      ws: 80,
      wss: 443,
    };

    var stringEndsWith = String.prototype.endsWith || function(s) {
      return s.length <= this.length &&
        this.indexOf(s, this.length - s.length) !== -1;
    };

    /**
     * @param {string|object} url - The URL, or the result from url.parse.
     * @return {string} The URL of the proxy that should handle the request to the
     *  given URL. If no proxy is set, this will be an empty string.
     */
    function getProxyForUrl(url) {
      var parsedUrl = typeof url === 'string' ? parseUrl(url) : url || {};
      var proto = parsedUrl.protocol;
      var hostname = parsedUrl.host;
      var port = parsedUrl.port;
      if (typeof hostname !== 'string' || !hostname || typeof proto !== 'string') {
        return '';  // Don't proxy URLs without a valid scheme or host.
      }

      proto = proto.split(':', 1)[0];
      // Stripping ports in this way instead of using parsedUrl.hostname to make
      // sure that the brackets around IPv6 addresses are kept.
      hostname = hostname.replace(/:\d*$/, '');
      port = parseInt(port) || DEFAULT_PORTS[proto] || 0;
      if (!shouldProxy(hostname, port)) {
        return '';  // Don't proxy URLs that match NO_PROXY.
      }

      var proxy =
        getEnv('npm_config_' + proto + '_proxy') ||
        getEnv(proto + '_proxy') ||
        getEnv('npm_config_proxy') ||
        getEnv('all_proxy');
      if (proxy && proxy.indexOf('://') === -1) {
        // Missing scheme in proxy, default to the requested URL's scheme.
        proxy = proto + '://' + proxy;
      }
      return proxy;
    }

    /**
     * Determines whether a given URL should be proxied.
     *
     * @param {string} hostname - The host name of the URL.
     * @param {number} port - The effective port of the URL.
     * @returns {boolean} Whether the given URL should be proxied.
     * @private
     */
    function shouldProxy(hostname, port) {
      var NO_PROXY =
        (getEnv('npm_config_no_proxy') || getEnv('no_proxy')).toLowerCase();
      if (!NO_PROXY) {
        return true;  // Always proxy if NO_PROXY is not set.
      }
      if (NO_PROXY === '*') {
        return false;  // Never proxy if wildcard is set.
      }

      return NO_PROXY.split(/[,\s]/).every(function(proxy) {
        if (!proxy) {
          return true;  // Skip zero-length hosts.
        }
        var parsedProxy = proxy.match(/^(.+):(\d+)$/);
        var parsedProxyHostname = parsedProxy ? parsedProxy[1] : proxy;
        var parsedProxyPort = parsedProxy ? parseInt(parsedProxy[2]) : 0;
        if (parsedProxyPort && parsedProxyPort !== port) {
          return true;  // Skip if ports don't match.
        }

        if (!/^[.*]/.test(parsedProxyHostname)) {
          // No wildcards, so stop proxying if there is an exact match.
          return hostname !== parsedProxyHostname;
        }

        if (parsedProxyHostname.charAt(0) === '*') {
          // Remove leading wildcard.
          parsedProxyHostname = parsedProxyHostname.slice(1);
        }
        // Stop proxying if the hostname ends with the no_proxy host.
        return !stringEndsWith.call(hostname, parsedProxyHostname);
      });
    }

    /**
     * Get the value for an environment variable.
     *
     * @param {string} key - The name of the environment variable.
     * @return {string} The value of the environment variable.
     * @private
     */
    function getEnv(key) {
      return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || '';
    }

    var getProxyForUrl_1 = getProxyForUrl;

    var followRedirects = {exports: {}};

    var src = {exports: {}};

    var browser = {exports: {}};

    var debug$2 = {exports: {}};

    /**
     * Helpers.
     */

    var ms;
    var hasRequiredMs;

    function requireMs () {
    	if (hasRequiredMs) return ms;
    	hasRequiredMs = 1;
    	var s = 1000;
    	var m = s * 60;
    	var h = m * 60;
    	var d = h * 24;
    	var y = d * 365.25;

    	/**
    	 * Parse or format the given `val`.
    	 *
    	 * Options:
    	 *
    	 *  - `long` verbose formatting [false]
    	 *
    	 * @param {String|Number} val
    	 * @param {Object} [options]
    	 * @throws {Error} throw an error if val is not a non-empty string or a number
    	 * @return {String|Number}
    	 * @api public
    	 */

    	ms = function(val, options) {
    	  options = options || {};
    	  var type = typeof val;
    	  if (type === 'string' && val.length > 0) {
    	    return parse(val);
    	  } else if (type === 'number' && isNaN(val) === false) {
    	    return options.long ? fmtLong(val) : fmtShort(val);
    	  }
    	  throw new Error(
    	    'val is not a non-empty string or a valid number. val=' +
    	      JSON.stringify(val)
    	  );
    	};

    	/**
    	 * Parse the given `str` and return milliseconds.
    	 *
    	 * @param {String} str
    	 * @return {Number}
    	 * @api private
    	 */

    	function parse(str) {
    	  str = String(str);
    	  if (str.length > 100) {
    	    return;
    	  }
    	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    	    str
    	  );
    	  if (!match) {
    	    return;
    	  }
    	  var n = parseFloat(match[1]);
    	  var type = (match[2] || 'ms').toLowerCase();
    	  switch (type) {
    	    case 'years':
    	    case 'year':
    	    case 'yrs':
    	    case 'yr':
    	    case 'y':
    	      return n * y;
    	    case 'days':
    	    case 'day':
    	    case 'd':
    	      return n * d;
    	    case 'hours':
    	    case 'hour':
    	    case 'hrs':
    	    case 'hr':
    	    case 'h':
    	      return n * h;
    	    case 'minutes':
    	    case 'minute':
    	    case 'mins':
    	    case 'min':
    	    case 'm':
    	      return n * m;
    	    case 'seconds':
    	    case 'second':
    	    case 'secs':
    	    case 'sec':
    	    case 's':
    	      return n * s;
    	    case 'milliseconds':
    	    case 'millisecond':
    	    case 'msecs':
    	    case 'msec':
    	    case 'ms':
    	      return n;
    	    default:
    	      return undefined;
    	  }
    	}

    	/**
    	 * Short format for `ms`.
    	 *
    	 * @param {Number} ms
    	 * @return {String}
    	 * @api private
    	 */

    	function fmtShort(ms) {
    	  if (ms >= d) {
    	    return Math.round(ms / d) + 'd';
    	  }
    	  if (ms >= h) {
    	    return Math.round(ms / h) + 'h';
    	  }
    	  if (ms >= m) {
    	    return Math.round(ms / m) + 'm';
    	  }
    	  if (ms >= s) {
    	    return Math.round(ms / s) + 's';
    	  }
    	  return ms + 'ms';
    	}

    	/**
    	 * Long format for `ms`.
    	 *
    	 * @param {Number} ms
    	 * @return {String}
    	 * @api private
    	 */

    	function fmtLong(ms) {
    	  return plural(ms, d, 'day') ||
    	    plural(ms, h, 'hour') ||
    	    plural(ms, m, 'minute') ||
    	    plural(ms, s, 'second') ||
    	    ms + ' ms';
    	}

    	/**
    	 * Pluralization helper.
    	 */

    	function plural(ms, n, name) {
    	  if (ms < n) {
    	    return;
    	  }
    	  if (ms < n * 1.5) {
    	    return Math.floor(ms / n) + ' ' + name;
    	  }
    	  return Math.ceil(ms / n) + ' ' + name + 's';
    	}
    	return ms;
    }

    var hasRequiredDebug;

    function requireDebug () {
    	if (hasRequiredDebug) return debug$2.exports;
    	hasRequiredDebug = 1;
    	(function (module, exports) {
    		/**
    		 * This is the common logic for both the Node.js and web browser
    		 * implementations of `debug()`.
    		 *
    		 * Expose `debug()` as the module.
    		 */

    		exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
    		exports.coerce = coerce;
    		exports.disable = disable;
    		exports.enable = enable;
    		exports.enabled = enabled;
    		exports.humanize = requireMs();

    		/**
    		 * The currently active debug mode names, and names to skip.
    		 */

    		exports.names = [];
    		exports.skips = [];

    		/**
    		 * Map of special "%n" handling functions, for the debug "format" argument.
    		 *
    		 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
    		 */

    		exports.formatters = {};

    		/**
    		 * Previous log timestamp.
    		 */

    		var prevTime;

    		/**
    		 * Select a color.
    		 * @param {String} namespace
    		 * @return {Number}
    		 * @api private
    		 */

    		function selectColor(namespace) {
    		  var hash = 0, i;

    		  for (i in namespace) {
    		    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    		    hash |= 0; // Convert to 32bit integer
    		  }

    		  return exports.colors[Math.abs(hash) % exports.colors.length];
    		}

    		/**
    		 * Create a debugger with the given `namespace`.
    		 *
    		 * @param {String} namespace
    		 * @return {Function}
    		 * @api public
    		 */

    		function createDebug(namespace) {

    		  function debug() {
    		    // disabled?
    		    if (!debug.enabled) return;

    		    var self = debug;

    		    // set `diff` timestamp
    		    var curr = +new Date();
    		    var ms = curr - (prevTime || curr);
    		    self.diff = ms;
    		    self.prev = prevTime;
    		    self.curr = curr;
    		    prevTime = curr;

    		    // turn the `arguments` into a proper Array
    		    var args = new Array(arguments.length);
    		    for (var i = 0; i < args.length; i++) {
    		      args[i] = arguments[i];
    		    }

    		    args[0] = exports.coerce(args[0]);

    		    if ('string' !== typeof args[0]) {
    		      // anything else let's inspect with %O
    		      args.unshift('%O');
    		    }

    		    // apply any `formatters` transformations
    		    var index = 0;
    		    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
    		      // if we encounter an escaped % then don't increase the array index
    		      if (match === '%%') return match;
    		      index++;
    		      var formatter = exports.formatters[format];
    		      if ('function' === typeof formatter) {
    		        var val = args[index];
    		        match = formatter.call(self, val);

    		        // now we need to remove `args[index]` since it's inlined in the `format`
    		        args.splice(index, 1);
    		        index--;
    		      }
    		      return match;
    		    });

    		    // apply env-specific formatting (colors, etc.)
    		    exports.formatArgs.call(self, args);

    		    var logFn = debug.log || exports.log || console.log.bind(console);
    		    logFn.apply(self, args);
    		  }

    		  debug.namespace = namespace;
    		  debug.enabled = exports.enabled(namespace);
    		  debug.useColors = exports.useColors();
    		  debug.color = selectColor(namespace);

    		  // env-specific initialization logic for debug instances
    		  if ('function' === typeof exports.init) {
    		    exports.init(debug);
    		  }

    		  return debug;
    		}

    		/**
    		 * Enables a debug mode by namespaces. This can include modes
    		 * separated by a colon and wildcards.
    		 *
    		 * @param {String} namespaces
    		 * @api public
    		 */

    		function enable(namespaces) {
    		  exports.save(namespaces);

    		  exports.names = [];
    		  exports.skips = [];

    		  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    		  var len = split.length;

    		  for (var i = 0; i < len; i++) {
    		    if (!split[i]) continue; // ignore empty strings
    		    namespaces = split[i].replace(/\*/g, '.*?');
    		    if (namespaces[0] === '-') {
    		      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    		    } else {
    		      exports.names.push(new RegExp('^' + namespaces + '$'));
    		    }
    		  }
    		}

    		/**
    		 * Disable debug output.
    		 *
    		 * @api public
    		 */

    		function disable() {
    		  exports.enable('');
    		}

    		/**
    		 * Returns true if the given mode name is enabled, false otherwise.
    		 *
    		 * @param {String} name
    		 * @return {Boolean}
    		 * @api public
    		 */

    		function enabled(name) {
    		  var i, len;
    		  for (i = 0, len = exports.skips.length; i < len; i++) {
    		    if (exports.skips[i].test(name)) {
    		      return false;
    		    }
    		  }
    		  for (i = 0, len = exports.names.length; i < len; i++) {
    		    if (exports.names[i].test(name)) {
    		      return true;
    		    }
    		  }
    		  return false;
    		}

    		/**
    		 * Coerce `val`.
    		 *
    		 * @param {Mixed} val
    		 * @return {Mixed}
    		 * @api private
    		 */

    		function coerce(val) {
    		  if (val instanceof Error) return val.stack || val.message;
    		  return val;
    		}
    } (debug$2, debug$2.exports));
    	return debug$2.exports;
    }

    /**
     * This is the web browser implementation of `debug()`.
     *
     * Expose `debug()` as the module.
     */

    var hasRequiredBrowser;

    function requireBrowser () {
    	if (hasRequiredBrowser) return browser.exports;
    	hasRequiredBrowser = 1;
    	(function (module, exports) {
    		exports = module.exports = requireDebug();
    		exports.log = log;
    		exports.formatArgs = formatArgs;
    		exports.save = save;
    		exports.load = load;
    		exports.useColors = useColors;
    		exports.storage = 'undefined' != typeof chrome
    		               && 'undefined' != typeof chrome.storage
    		                  ? chrome.storage.local
    		                  : localstorage();

    		/**
    		 * Colors.
    		 */

    		exports.colors = [
    		  'lightseagreen',
    		  'forestgreen',
    		  'goldenrod',
    		  'dodgerblue',
    		  'darkorchid',
    		  'crimson'
    		];

    		/**
    		 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
    		 * and the Firebug extension (any Firefox version) are known
    		 * to support "%c" CSS customizations.
    		 *
    		 * TODO: add a `localStorage` variable to explicitly enable/disable colors
    		 */

    		function useColors() {
    		  // NB: In an Electron preload script, document will be defined but not fully
    		  // initialized. Since we know we're in Chrome, we'll just detect this case
    		  // explicitly
    		  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    		    return true;
    		  }

    		  // is webkit? http://stackoverflow.com/a/16459606/376773
    		  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    		  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    		    // is firebug? http://stackoverflow.com/a/398120/376773
    		    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    		    // is firefox >= v31?
    		    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    		    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    		    // double check webkit in userAgent just in case we are in a worker
    		    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
    		}

    		/**
    		 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
    		 */

    		exports.formatters.j = function(v) {
    		  try {
    		    return JSON.stringify(v);
    		  } catch (err) {
    		    return '[UnexpectedJSONParseError]: ' + err.message;
    		  }
    		};


    		/**
    		 * Colorize log arguments if enabled.
    		 *
    		 * @api public
    		 */

    		function formatArgs(args) {
    		  var useColors = this.useColors;

    		  args[0] = (useColors ? '%c' : '')
    		    + this.namespace
    		    + (useColors ? ' %c' : ' ')
    		    + args[0]
    		    + (useColors ? '%c ' : ' ')
    		    + '+' + exports.humanize(this.diff);

    		  if (!useColors) return;

    		  var c = 'color: ' + this.color;
    		  args.splice(1, 0, c, 'color: inherit');

    		  // the final "%c" is somewhat tricky, because there could be other
    		  // arguments passed either before or after the %c, so we need to
    		  // figure out the correct index to insert the CSS into
    		  var index = 0;
    		  var lastC = 0;
    		  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    		    if ('%%' === match) return;
    		    index++;
    		    if ('%c' === match) {
    		      // we only are interested in the *last* %c
    		      // (the user may have provided their own)
    		      lastC = index;
    		    }
    		  });

    		  args.splice(lastC, 0, c);
    		}

    		/**
    		 * Invokes `console.log()` when available.
    		 * No-op when `console.log` is not a "function".
    		 *
    		 * @api public
    		 */

    		function log() {
    		  // this hackery is required for IE8/9, where
    		  // the `console.log` function doesn't have 'apply'
    		  return 'object' === typeof console
    		    && console.log
    		    && Function.prototype.apply.call(console.log, console, arguments);
    		}

    		/**
    		 * Save `namespaces`.
    		 *
    		 * @param {String} namespaces
    		 * @api private
    		 */

    		function save(namespaces) {
    		  try {
    		    if (null == namespaces) {
    		      exports.storage.removeItem('debug');
    		    } else {
    		      exports.storage.debug = namespaces;
    		    }
    		  } catch(e) {}
    		}

    		/**
    		 * Load `namespaces`.
    		 *
    		 * @return {String} returns the previously persisted debug modes
    		 * @api private
    		 */

    		function load() {
    		  var r;
    		  try {
    		    r = exports.storage.debug;
    		  } catch(e) {}

    		  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    		  if (!r && typeof process !== 'undefined' && 'env' in process) {
    		    r = process.env.DEBUG;
    		  }

    		  return r;
    		}

    		/**
    		 * Enable namespaces listed in `localStorage.debug` initially.
    		 */

    		exports.enable(load());

    		/**
    		 * Localstorage attempts to return the localstorage.
    		 *
    		 * This is necessary because safari throws
    		 * when a user disables cookies/localstorage
    		 * and you attempt to access it.
    		 *
    		 * @return {LocalStorage}
    		 * @api private
    		 */

    		function localstorage() {
    		  try {
    		    return window.localStorage;
    		  } catch (e) {}
    		}
    } (browser, browser.exports));
    	return browser.exports;
    }

    var node = {exports: {}};

    /**
     * Module dependencies.
     */

    var hasRequiredNode;

    function requireNode () {
    	if (hasRequiredNode) return node.exports;
    	hasRequiredNode = 1;
    	(function (module, exports) {
    		var tty = require$$0__default$1["default"];
    		var util = require$$1__default["default"];

    		/**
    		 * This is the Node.js implementation of `debug()`.
    		 *
    		 * Expose `debug()` as the module.
    		 */

    		exports = module.exports = requireDebug();
    		exports.init = init;
    		exports.log = log;
    		exports.formatArgs = formatArgs;
    		exports.save = save;
    		exports.load = load;
    		exports.useColors = useColors;

    		/**
    		 * Colors.
    		 */

    		exports.colors = [6, 2, 3, 4, 5, 1];

    		/**
    		 * Build up the default `inspectOpts` object from the environment variables.
    		 *
    		 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
    		 */

    		exports.inspectOpts = Object.keys(process.env).filter(function (key) {
    		  return /^debug_/i.test(key);
    		}).reduce(function (obj, key) {
    		  // camel-case
    		  var prop = key
    		    .substring(6)
    		    .toLowerCase()
    		    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

    		  // coerce string value into JS value
    		  var val = process.env[key];
    		  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
    		  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
    		  else if (val === 'null') val = null;
    		  else val = Number(val);

    		  obj[prop] = val;
    		  return obj;
    		}, {});

    		/**
    		 * The file descriptor to write the `debug()` calls to.
    		 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
    		 *
    		 *   $ DEBUG_FD=3 node script.js 3>debug.log
    		 */

    		var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

    		if (1 !== fd && 2 !== fd) {
    		  util.deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')();
    		}

    		var stream = 1 === fd ? process.stdout :
    		             2 === fd ? process.stderr :
    		             createWritableStdioStream(fd);

    		/**
    		 * Is stdout a TTY? Colored output is enabled when `true`.
    		 */

    		function useColors() {
    		  return 'colors' in exports.inspectOpts
    		    ? Boolean(exports.inspectOpts.colors)
    		    : tty.isatty(fd);
    		}

    		/**
    		 * Map %o to `util.inspect()`, all on a single line.
    		 */

    		exports.formatters.o = function(v) {
    		  this.inspectOpts.colors = this.useColors;
    		  return util.inspect(v, this.inspectOpts)
    		    .split('\n').map(function(str) {
    		      return str.trim()
    		    }).join(' ');
    		};

    		/**
    		 * Map %o to `util.inspect()`, allowing multiple lines if needed.
    		 */

    		exports.formatters.O = function(v) {
    		  this.inspectOpts.colors = this.useColors;
    		  return util.inspect(v, this.inspectOpts);
    		};

    		/**
    		 * Adds ANSI color escape codes if enabled.
    		 *
    		 * @api public
    		 */

    		function formatArgs(args) {
    		  var name = this.namespace;
    		  var useColors = this.useColors;

    		  if (useColors) {
    		    var c = this.color;
    		    var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

    		    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    		    args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
    		  } else {
    		    args[0] = new Date().toUTCString()
    		      + ' ' + name + ' ' + args[0];
    		  }
    		}

    		/**
    		 * Invokes `util.format()` with the specified arguments and writes to `stream`.
    		 */

    		function log() {
    		  return stream.write(util.format.apply(util, arguments) + '\n');
    		}

    		/**
    		 * Save `namespaces`.
    		 *
    		 * @param {String} namespaces
    		 * @api private
    		 */

    		function save(namespaces) {
    		  if (null == namespaces) {
    		    // If you set a process.env field to null or undefined, it gets cast to the
    		    // string 'null' or 'undefined'. Just delete instead.
    		    delete process.env.DEBUG;
    		  } else {
    		    process.env.DEBUG = namespaces;
    		  }
    		}

    		/**
    		 * Load `namespaces`.
    		 *
    		 * @return {String} returns the previously persisted debug modes
    		 * @api private
    		 */

    		function load() {
    		  return process.env.DEBUG;
    		}

    		/**
    		 * Copied from `node/src/node.js`.
    		 *
    		 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
    		 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
    		 */

    		function createWritableStdioStream (fd) {
    		  var stream;
    		  var tty_wrap = process.binding('tty_wrap');

    		  // Note stream._type is used for test-module-load-list.js

    		  switch (tty_wrap.guessHandleType(fd)) {
    		    case 'TTY':
    		      stream = new tty.WriteStream(fd);
    		      stream._type = 'tty';

    		      // Hack to have stream not keep the event loop alive.
    		      // See https://github.com/joyent/node/issues/1726
    		      if (stream._handle && stream._handle.unref) {
    		        stream._handle.unref();
    		      }
    		      break;

    		    case 'FILE':
    		      var fs = require$$6__default["default"];
    		      stream = new fs.SyncWriteStream(fd, { autoClose: false });
    		      stream._type = 'fs';
    		      break;

    		    case 'PIPE':
    		    case 'TCP':
    		      var net = require$$4__default$1["default"];
    		      stream = new net.Socket({
    		        fd: fd,
    		        readable: false,
    		        writable: true
    		      });

    		      // FIXME Should probably have an option in net.Socket to create a
    		      // stream from an existing fd which is writable only. But for now
    		      // we'll just add this hack and set the `readable` member to false.
    		      // Test: ./node test/fixtures/echo.js < /etc/passwd
    		      stream.readable = false;
    		      stream.read = null;
    		      stream._type = 'pipe';

    		      // FIXME Hack to have stream not keep the event loop alive.
    		      // See https://github.com/joyent/node/issues/1726
    		      if (stream._handle && stream._handle.unref) {
    		        stream._handle.unref();
    		      }
    		      break;

    		    default:
    		      // Probably an error on in uv_guess_handle()
    		      throw new Error('Implement me. Unknown stream file type!');
    		  }

    		  // For supporting legacy API we put the FD here.
    		  stream.fd = fd;

    		  stream._isStdio = true;

    		  return stream;
    		}

    		/**
    		 * Init logic for `debug` instances.
    		 *
    		 * Create a new `inspectOpts` object in case `useColors` is set
    		 * differently for a particular `debug` instance.
    		 */

    		function init (debug) {
    		  debug.inspectOpts = {};

    		  var keys = Object.keys(exports.inspectOpts);
    		  for (var i = 0; i < keys.length; i++) {
    		    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    		  }
    		}

    		/**
    		 * Enable namespaces listed in `process.env.DEBUG` initially.
    		 */

    		exports.enable(load());
    } (node, node.exports));
    	return node.exports;
    }

    /**
     * Detect Electron renderer process, which is node, but we should
     * treat as a browser.
     */

    var hasRequiredSrc;

    function requireSrc () {
    	if (hasRequiredSrc) return src.exports;
    	hasRequiredSrc = 1;
    	(function (module) {
    		if (typeof process !== 'undefined' && process.type === 'renderer') {
    		  module.exports = requireBrowser();
    		} else {
    		  module.exports = requireNode();
    		}
    } (src));
    	return src.exports;
    }

    var debug$1;

    var debug_1 = function () {
      if (!debug$1) {
        try {
          /* eslint global-require: off */
          debug$1 = requireSrc()("follow-redirects");
        }
        catch (error) { /* */ }
        if (typeof debug$1 !== "function") {
          debug$1 = function () { /* */ };
        }
      }
      debug$1.apply(null, arguments);
    };

    var url = require$$0__default["default"];
    var URL$1 = url.URL;
    var http = require$$3__default["default"];
    var https = require$$4__default["default"];
    var Writable = stream__default["default"].Writable;
    var assert = require$$4__default$2["default"];
    var debug = debug_1;

    // Create handlers that pass events from native requests
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = Object.create(null);
    events.forEach(function (event) {
      eventHandlers[event] = function (arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });

    var InvalidUrlError = createErrorType(
      "ERR_INVALID_URL",
      "Invalid URL",
      TypeError
    );
    // Error types with codes
    var RedirectionError = createErrorType(
      "ERR_FR_REDIRECTION_FAILURE",
      "Redirected request failed"
    );
    var TooManyRedirectsError = createErrorType(
      "ERR_FR_TOO_MANY_REDIRECTS",
      "Maximum number of redirects exceeded"
    );
    var MaxBodyLengthExceededError = createErrorType(
      "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
      "Request body larger than maxBodyLength limit"
    );
    var WriteAfterEndError = createErrorType(
      "ERR_STREAM_WRITE_AFTER_END",
      "write after end"
    );

    // An HTTP(S) request that can be redirected
    function RedirectableRequest(options, responseCallback) {
      // Initialize the request
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];

      // Attach a callback if passed
      if (responseCallback) {
        this.on("response", responseCallback);
      }

      // React to responses of native requests
      var self = this;
      this._onNativeResponse = function (response) {
        self._processResponse(response);
      };

      // Perform the first request
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);

    RedirectableRequest.prototype.abort = function () {
      abortRequest(this._currentRequest);
      this.emit("abort");
    };

    // Writes buffered data to the current native request
    RedirectableRequest.prototype.write = function (data, encoding, callback) {
      // Writing is not allowed if end has been called
      if (this._ending) {
        throw new WriteAfterEndError();
      }

      // Validate input and shift parameters if necessary
      if (!isString(data) && !isBuffer(data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
      }

      // Ignore empty buffers, since writing them doesn't invoke the callback
      // https://github.com/nodejs/node/issues/22066
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      // Only write when we don't exceed the maximum body length
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data: data, encoding: encoding });
        this._currentRequest.write(data, encoding, callback);
      }
      // Error when we exceed the maximum body length
      else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };

    // Ends the current native request
    RedirectableRequest.prototype.end = function (data, encoding, callback) {
      // Shift parameters if necessary
      if (isFunction(data)) {
        callback = data;
        data = encoding = null;
      }
      else if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
      }

      // Write data if needed and end
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      }
      else {
        var self = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function () {
          self._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };

    // Sets a header value on the current native request
    RedirectableRequest.prototype.setHeader = function (name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };

    // Clears a header value on the current native request
    RedirectableRequest.prototype.removeHeader = function (name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };

    // Global timeout for all underlying requests
    RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
      var self = this;

      // Destroys the socket on timeout
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }

      // Sets up a timer to trigger a timeout event
      function startTimer(socket) {
        if (self._timeout) {
          clearTimeout(self._timeout);
        }
        self._timeout = setTimeout(function () {
          self.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }

      // Stops a timeout from triggering
      function clearTimer() {
        // Clear the timeout
        if (self._timeout) {
          clearTimeout(self._timeout);
          self._timeout = null;
        }

        // Clean up all attached listeners
        self.removeListener("abort", clearTimer);
        self.removeListener("error", clearTimer);
        self.removeListener("response", clearTimer);
        if (callback) {
          self.removeListener("timeout", callback);
        }
        if (!self.socket) {
          self._currentRequest.removeListener("socket", startTimer);
        }
      }

      // Attach callback if passed
      if (callback) {
        this.on("timeout", callback);
      }

      // Start the timer if or when the socket is opened
      if (this.socket) {
        startTimer(this.socket);
      }
      else {
        this._currentRequest.once("socket", startTimer);
      }

      // Clean up on events
      this.on("socket", destroyOnTimeout);
      this.on("abort", clearTimer);
      this.on("error", clearTimer);
      this.on("response", clearTimer);

      return this;
    };

    // Proxy all other public ClientRequest methods
    [
      "flushHeaders", "getHeader",
      "setNoDelay", "setSocketKeepAlive",
    ].forEach(function (method) {
      RedirectableRequest.prototype[method] = function (a, b) {
        return this._currentRequest[method](a, b);
      };
    });

    // Proxy all public ClientRequest properties
    ["aborted", "connection", "socket"].forEach(function (property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function () { return this._currentRequest[property]; },
      });
    });

    RedirectableRequest.prototype._sanitizeOptions = function (options) {
      // Ensure headers are always present
      if (!options.headers) {
        options.headers = {};
      }

      // Since http.request treats host as an alias of hostname,
      // but the url module interprets host as hostname plus port,
      // eliminate the host property to avoid confusion.
      if (options.host) {
        // Use hostname if set, because it has precedence
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }

      // Complete the URL object when necessary
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        }
        else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };


    // Executes the next native request (initial or redirect)
    RedirectableRequest.prototype._performRequest = function () {
      // Load the native protocol
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        this.emit("error", new TypeError("Unsupported protocol " + protocol));
        return;
      }

      // If specified, use the agent corresponding to the protocol
      // (HTTP and HTTPS use different types of agents)
      if (this._options.agents) {
        var scheme = protocol.slice(0, -1);
        this._options.agent = this._options.agents[scheme];
      }

      // Create the native request and set up its event handlers
      var request = this._currentRequest =
            nativeProtocol.request(this._options, this._onNativeResponse);
      request._redirectable = this;
      for (var event of events) {
        request.on(event, eventHandlers[event]);
      }

      // RFC7230§5.3.1: When making a request directly to an origin server, […]
      // a client MUST send only the absolute path […] as the request-target.
      this._currentUrl = /^\//.test(this._options.path) ?
        url.format(this._options) :
        // When making a request to a proxy, […]
        // a client MUST send the target URI in absolute-form […].
        this._options.path;

      // End a redirected request
      // (The first request must be ended explicitly with RedirectableRequest#end)
      if (this._isRedirect) {
        // Write the request entity and end
        var i = 0;
        var self = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
          // Only write if this request has not been redirected yet
          /* istanbul ignore else */
          if (request === self._currentRequest) {
            // Report any write errors
            /* istanbul ignore if */
            if (error) {
              self.emit("error", error);
            }
            // Write the next buffer if there are still left
            else if (i < buffers.length) {
              var buffer = buffers[i++];
              /* istanbul ignore else */
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            }
            // End the request if `end` has been called on us
            else if (self._ended) {
              request.end();
            }
          }
        }());
      }
    };

    // Processes a response from the current native request
    RedirectableRequest.prototype._processResponse = function (response) {
      // Store the redirected response
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode: statusCode,
        });
      }

      // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
      // that further action needs to be taken by the user agent in order to
      // fulfill the request. If a Location header field is provided,
      // the user agent MAY automatically redirect its request to the URI
      // referenced by the Location field value,
      // even if the specific status code is not understood.

      // If the response is not a redirect; return it as-is
      var location = response.headers.location;
      if (!location || this._options.followRedirects === false ||
          statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);

        // Clean up
        this._requestBodyBuffers = [];
        return;
      }

      // The response is a redirect, so abort the current request
      abortRequest(this._currentRequest);
      // Discard the remainder of the response to avoid waiting for data
      response.destroy();

      // RFC7231§6.4: A client SHOULD detect and intervene
      // in cyclical redirections (i.e., "infinite" redirection loops).
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new TooManyRedirectsError());
        return;
      }

      // Store the request headers if applicable
      var requestHeaders;
      var beforeRedirect = this._options.beforeRedirect;
      if (beforeRedirect) {
        requestHeaders = Object.assign({
          // The Host header was set by nativeProtocol.request
          Host: response.req.getHeader("host"),
        }, this._options.headers);
      }

      // RFC7231§6.4: Automatic redirection needs to done with
      // care for methods not known to be safe, […]
      // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
      // the request method from POST to GET for the subsequent request.
      var method = this._options.method;
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
          // RFC7231§6.4.4: The 303 (See Other) status code indicates that
          // the server is redirecting the user agent to a different resource […]
          // A user agent can perform a retrieval request targeting that URI
          // (a GET or HEAD request if using HTTP) […]
          (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        // Drop a possible entity and headers related to it
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }

      // Drop the Host header, as the redirect might lead to a different host
      var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);

      // If the redirect is relative, carry over the host of the last request
      var currentUrlParts = url.parse(this._currentUrl);
      var currentHost = currentHostHeader || currentUrlParts.host;
      var currentUrl = /^\w+:/.test(location) ? this._currentUrl :
        url.format(Object.assign(currentUrlParts, { host: currentHost }));

      // Determine the URL of the redirection
      var redirectUrl;
      try {
        redirectUrl = url.resolve(currentUrl, location);
      }
      catch (cause) {
        this.emit("error", new RedirectionError({ cause: cause }));
        return;
      }

      // Create the redirected request
      debug("redirecting to", redirectUrl);
      this._isRedirect = true;
      var redirectUrlParts = url.parse(redirectUrl);
      Object.assign(this._options, redirectUrlParts);

      // Drop confidential headers when redirecting to a less secure protocol
      // or to a different domain that is not a superdomain
      if (redirectUrlParts.protocol !== currentUrlParts.protocol &&
         redirectUrlParts.protocol !== "https:" ||
         redirectUrlParts.host !== currentHost &&
         !isSubdomain(redirectUrlParts.host, currentHost)) {
        removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
      }

      // Evaluate the beforeRedirect callback
      if (isFunction(beforeRedirect)) {
        var responseDetails = {
          headers: response.headers,
          statusCode: statusCode,
        };
        var requestDetails = {
          url: currentUrl,
          method: method,
          headers: requestHeaders,
        };
        try {
          beforeRedirect(this._options, responseDetails, requestDetails);
        }
        catch (err) {
          this.emit("error", err);
          return;
        }
        this._sanitizeOptions(this._options);
      }

      // Perform the redirected request
      try {
        this._performRequest();
      }
      catch (cause) {
        this.emit("error", new RedirectionError({ cause: cause }));
      }
    };

    // Wraps the key/value object of protocols with redirect functionality
    function wrap(protocols) {
      // Default settings
      var exports = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024,
      };

      // Wrap each protocol
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function (scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

        // Executes a request, following redirects
        function request(input, options, callback) {
          // Parse parameters
          if (isString(input)) {
            var parsed;
            try {
              parsed = urlToOptions(new URL$1(input));
            }
            catch (err) {
              /* istanbul ignore next */
              parsed = url.parse(input);
            }
            if (!isString(parsed.protocol)) {
              throw new InvalidUrlError({ input });
            }
            input = parsed;
          }
          else if (URL$1 && (input instanceof URL$1)) {
            input = urlToOptions(input);
          }
          else {
            callback = options;
            options = input;
            input = { protocol: protocol };
          }
          if (isFunction(options)) {
            callback = options;
            options = null;
          }

          // Set defaults
          options = Object.assign({
            maxRedirects: exports.maxRedirects,
            maxBodyLength: exports.maxBodyLength,
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          if (!isString(options.host) && !isString(options.hostname)) {
            options.hostname = "::1";
          }

          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug("options", options);
          return new RedirectableRequest(options, callback);
        }

        // Executes a GET request, following redirects
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }

        // Expose the properties on the wrapped protocol
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get, configurable: true, enumerable: true, writable: true },
        });
      });
      return exports;
    }

    /* istanbul ignore next */
    function noop() { /* empty */ }

    // from https://github.com/nodejs/node/blob/master/lib/internal/url.js
    function urlToOptions(urlObject) {
      var options = {
        protocol: urlObject.protocol,
        hostname: urlObject.hostname.startsWith("[") ?
          /* istanbul ignore next */
          urlObject.hostname.slice(1, -1) :
          urlObject.hostname,
        hash: urlObject.hash,
        search: urlObject.search,
        pathname: urlObject.pathname,
        path: urlObject.pathname + urlObject.search,
        href: urlObject.href,
      };
      if (urlObject.port !== "") {
        options.port = Number(urlObject.port);
      }
      return options;
    }

    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return (lastValue === null || typeof lastValue === "undefined") ?
        undefined : String(lastValue).trim();
    }

    function createErrorType(code, message, baseClass) {
      // Create constructor
      function CustomError(properties) {
        Error.captureStackTrace(this, this.constructor);
        Object.assign(this, properties || {});
        this.code = code;
        this.message = this.cause ? message + ": " + this.cause.message : message;
      }

      // Attach constructor and set default properties
      CustomError.prototype = new (baseClass || Error)();
      CustomError.prototype.constructor = CustomError;
      CustomError.prototype.name = "Error [" + code + "]";
      return CustomError;
    }

    function abortRequest(request) {
      for (var event of events) {
        request.removeListener(event, eventHandlers[event]);
      }
      request.on("error", noop);
      request.abort();
    }

    function isSubdomain(subdomain, domain) {
      assert(isString(subdomain) && isString(domain));
      var dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }

    function isString(value) {
      return typeof value === "string" || value instanceof String;
    }

    function isFunction(value) {
      return typeof value === "function";
    }

    function isBuffer(value) {
      return typeof value === "object" && ("length" in value);
    }

    // Exports
    followRedirects.exports = wrap({ http: http, https: https });
    followRedirects.exports.wrap = wrap;

    const VERSION = "1.1.3";

    /**
     * A `CanceledError` is an object that is thrown when an operation is canceled.
     *
     * @param {string=} message The message.
     * @param {Object=} config The config.
     * @param {Object=} request The request.
     *
     * @returns {CanceledError} The created error.
     */
    function CanceledError(message, config, request) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
      this.name = 'CanceledError';
    }

    utils.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });

    function parseProtocol(url) {
      const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match && match[1] || '';
    }

    const DATA_URL_PATTERN = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;

    /**
     * Parse data uri to a Buffer or Blob
     *
     * @param {String} uri
     * @param {?Boolean} asBlob
     * @param {?Object} options
     * @param {?Function} options.Blob
     *
     * @returns {Buffer|Blob}
     */
    function fromDataURI(uri, asBlob, options) {
      const _Blob = options && options.Blob || platform.classes.Blob;
      const protocol = parseProtocol(uri);

      if (asBlob === undefined && _Blob) {
        asBlob = true;
      }

      if (protocol === 'data') {
        uri = protocol.length ? uri.slice(protocol.length + 1) : uri;

        const match = DATA_URL_PATTERN.exec(uri);

        if (!match) {
          throw new AxiosError('Invalid URL', AxiosError.ERR_INVALID_URL);
        }

        const mime = match[1];
        const isBase64 = match[2];
        const body = match[3];
        const buffer = Buffer.from(decodeURIComponent(body), isBase64 ? 'base64' : 'utf8');

        if (asBlob) {
          if (!_Blob) {
            throw new AxiosError('Blob is not supported', AxiosError.ERR_NOT_SUPPORT);
          }

          return new _Blob([buffer], {type: mime});
        }

        return buffer;
      }

      throw new AxiosError('Unsupported protocol ' + protocol, AxiosError.ERR_NOT_SUPPORT);
    }

    // RawAxiosHeaders whose duplicates are ignored by node
    // c.f. https://nodejs.org/api/http.html#http_message_headers
    const ignoreDuplicateOf = utils.toObjectSet([
      'age', 'authorization', 'content-length', 'content-type', 'etag',
      'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
      'last-modified', 'location', 'max-forwards', 'proxy-authorization',
      'referer', 'retry-after', 'user-agent'
    ]);

    /**
     * Parse headers into an object
     *
     * ```
     * Date: Wed, 27 Aug 2014 08:58:49 GMT
     * Content-Type: application/json
     * Connection: keep-alive
     * Transfer-Encoding: chunked
     * ```
     *
     * @param {String} rawHeaders Headers needing to be parsed
     *
     * @returns {Object} Headers parsed into an object
     */
    var parseHeaders = rawHeaders => {
      const parsed = {};
      let key;
      let val;
      let i;

      rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
        i = line.indexOf(':');
        key = line.substring(0, i).trim().toLowerCase();
        val = line.substring(i + 1).trim();

        if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
          return;
        }

        if (key === 'set-cookie') {
          if (parsed[key]) {
            parsed[key].push(val);
          } else {
            parsed[key] = [val];
          }
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      });

      return parsed;
    };

    const $internals = Symbol('internals');
    const $defaults = Symbol('defaults');

    function normalizeHeader(header) {
      return header && String(header).trim().toLowerCase();
    }

    function normalizeValue(value) {
      if (value === false || value == null) {
        return value;
      }

      return utils.isArray(value) ? value.map(normalizeValue) : String(value);
    }

    function parseTokens(str) {
      const tokens = Object.create(null);
      const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
      let match;

      while ((match = tokensRE.exec(str))) {
        tokens[match[1]] = match[2];
      }

      return tokens;
    }

    function matchHeaderValue(context, value, header, filter) {
      if (utils.isFunction(filter)) {
        return filter.call(this, value, header);
      }

      if (!utils.isString(value)) return;

      if (utils.isString(filter)) {
        return value.indexOf(filter) !== -1;
      }

      if (utils.isRegExp(filter)) {
        return filter.test(value);
      }
    }

    function formatHeader(header) {
      return header.trim()
        .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
          return char.toUpperCase() + str;
        });
    }

    function buildAccessors(obj, header) {
      const accessorName = utils.toCamelCase(' ' + header);

      ['get', 'set', 'has'].forEach(methodName => {
        Object.defineProperty(obj, methodName + accessorName, {
          value: function(arg1, arg2, arg3) {
            return this[methodName].call(this, header, arg1, arg2, arg3);
          },
          configurable: true
        });
      });
    }

    function findKey(obj, key) {
      key = key.toLowerCase();
      const keys = Object.keys(obj);
      let i = keys.length;
      let _key;
      while (i-- > 0) {
        _key = keys[i];
        if (key === _key.toLowerCase()) {
          return _key;
        }
      }
      return null;
    }

    function AxiosHeaders(headers, defaults) {
      headers && this.set(headers);
      this[$defaults] = defaults || null;
    }

    Object.assign(AxiosHeaders.prototype, {
      set: function(header, valueOrRewrite, rewrite) {
        const self = this;

        function setHeader(_value, _header, _rewrite) {
          const lHeader = normalizeHeader(_header);

          if (!lHeader) {
            throw new Error('header name must be a non-empty string');
          }

          const key = findKey(self, lHeader);

          if (key && _rewrite !== true && (self[key] === false || _rewrite === false)) {
            return;
          }

          self[key || _header] = normalizeValue(_value);
        }

        if (utils.isPlainObject(header)) {
          utils.forEach(header, (_value, _header) => {
            setHeader(_value, _header, valueOrRewrite);
          });
        } else {
          setHeader(valueOrRewrite, header, rewrite);
        }

        return this;
      },

      get: function(header, parser) {
        header = normalizeHeader(header);

        if (!header) return undefined;

        const key = findKey(this, header);

        if (key) {
          const value = this[key];

          if (!parser) {
            return value;
          }

          if (parser === true) {
            return parseTokens(value);
          }

          if (utils.isFunction(parser)) {
            return parser.call(this, value, key);
          }

          if (utils.isRegExp(parser)) {
            return parser.exec(value);
          }

          throw new TypeError('parser must be boolean|regexp|function');
        }
      },

      has: function(header, matcher) {
        header = normalizeHeader(header);

        if (header) {
          const key = findKey(this, header);

          return !!(key && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
        }

        return false;
      },

      delete: function(header, matcher) {
        const self = this;
        let deleted = false;

        function deleteHeader(_header) {
          _header = normalizeHeader(_header);

          if (_header) {
            const key = findKey(self, _header);

            if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
              delete self[key];

              deleted = true;
            }
          }
        }

        if (utils.isArray(header)) {
          header.forEach(deleteHeader);
        } else {
          deleteHeader(header);
        }

        return deleted;
      },

      clear: function() {
        return Object.keys(this).forEach(this.delete.bind(this));
      },

      normalize: function(format) {
        const self = this;
        const headers = {};

        utils.forEach(this, (value, header) => {
          const key = findKey(headers, header);

          if (key) {
            self[key] = normalizeValue(value);
            delete self[header];
            return;
          }

          const normalized = format ? formatHeader(header) : String(header).trim();

          if (normalized !== header) {
            delete self[header];
          }

          self[normalized] = normalizeValue(value);

          headers[normalized] = true;
        });

        return this;
      },

      toJSON: function(asStrings) {
        const obj = Object.create(null);

        utils.forEach(Object.assign({}, this[$defaults] || null, this),
          (value, header) => {
            if (value == null || value === false) return;
            obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value;
          });

        return obj;
      }
    });

    Object.assign(AxiosHeaders, {
      from: function(thing) {
        if (utils.isString(thing)) {
          return new this(parseHeaders(thing));
        }
        return thing instanceof this ? thing : new this(thing);
      },

      accessor: function(header) {
        const internals = this[$internals] = (this[$internals] = {
          accessors: {}
        });

        const accessors = internals.accessors;
        const prototype = this.prototype;

        function defineAccessor(_header) {
          const lHeader = normalizeHeader(_header);

          if (!accessors[lHeader]) {
            buildAccessors(prototype, _header);
            accessors[lHeader] = true;
          }
        }

        utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

        return this;
      }
    });

    AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent']);

    utils.freezeMethods(AxiosHeaders.prototype);
    utils.freezeMethods(AxiosHeaders);

    /**
     * Throttle decorator
     * @param {Function} fn
     * @param {Number} freq
     * @return {Function}
     */
    function throttle(fn, freq) {
      let timestamp = 0;
      const threshold = 1000 / freq;
      let timer = null;
      return function throttled(force, args) {
        const now = Date.now();
        if (force || now - timestamp > threshold) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          timestamp = now;
          return fn.apply(null, args);
        }
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            timestamp = Date.now();
            return fn.apply(null, args);
          }, threshold - (now - timestamp));
        }
      };
    }

    /**
     * Calculate data maxRate
     * @param {Number} [samplesCount= 10]
     * @param {Number} [min= 1000]
     * @returns {Function}
     */
    function speedometer(samplesCount, min) {
      samplesCount = samplesCount || 10;
      const bytes = new Array(samplesCount);
      const timestamps = new Array(samplesCount);
      let head = 0;
      let tail = 0;
      let firstSampleTS;

      min = min !== undefined ? min : 1000;

      return function push(chunkLength) {
        const now = Date.now();

        const startedAt = timestamps[tail];

        if (!firstSampleTS) {
          firstSampleTS = now;
        }

        bytes[head] = chunkLength;
        timestamps[head] = now;

        let i = tail;
        let bytesCount = 0;

        while (i !== head) {
          bytesCount += bytes[i++];
          i = i % samplesCount;
        }

        head = (head + 1) % samplesCount;

        if (head === tail) {
          tail = (tail + 1) % samplesCount;
        }

        if (now - firstSampleTS < min) {
          return;
        }

        const passed = startedAt && now - startedAt;

        return  passed ? Math.round(bytesCount * 1000 / passed) : undefined;
      };
    }

    const kInternals = Symbol('internals');

    class AxiosTransformStream extends stream__default["default"].Transform{
      constructor(options) {
        options = utils.toFlatObject(options, {
          maxRate: 0,
          chunkSize: 64 * 1024,
          minChunkSize: 100,
          timeWindow: 500,
          ticksRate: 2,
          samplesCount: 15
        }, null, (prop, source) => {
          return !utils.isUndefined(source[prop]);
        });

        super({
          readableHighWaterMark: options.chunkSize
        });

        const self = this;

        const internals = this[kInternals] = {
          length: options.length,
          timeWindow: options.timeWindow,
          ticksRate: options.ticksRate,
          chunkSize: options.chunkSize,
          maxRate: options.maxRate,
          minChunkSize: options.minChunkSize,
          bytesSeen: 0,
          isCaptured: false,
          notifiedBytesLoaded: 0,
          ts: Date.now(),
          bytes: 0,
          onReadCallback: null
        };

        const _speedometer = speedometer(internals.ticksRate * options.samplesCount, internals.timeWindow);

        this.on('newListener', event => {
          if (event === 'progress') {
            if (!internals.isCaptured) {
              internals.isCaptured = true;
            }
          }
        });

        let bytesNotified = 0;

        internals.updateProgress = throttle(function throttledHandler() {
          const totalBytes = internals.length;
          const bytesTransferred = internals.bytesSeen;
          const progressBytes = bytesTransferred - bytesNotified;
          if (!progressBytes || self.destroyed) return;

          const rate = _speedometer(progressBytes);

          bytesNotified = bytesTransferred;

          process.nextTick(() => {
            self.emit('progress', {
              'loaded': bytesTransferred,
              'total': totalBytes,
              'progress': totalBytes ? (bytesTransferred / totalBytes) : undefined,
              'bytes': progressBytes,
              'rate': rate ? rate : undefined,
              'estimated': rate && totalBytes && bytesTransferred <= totalBytes ?
                (totalBytes - bytesTransferred) / rate : undefined
            });
          });
        }, internals.ticksRate);

        const onFinish = () => {
          internals.updateProgress(true);
        };

        this.once('end', onFinish);
        this.once('error', onFinish);
      }

      _read(size) {
        const internals = this[kInternals];

        if (internals.onReadCallback) {
          internals.onReadCallback();
        }

        return super._read(size);
      }

      _transform(chunk, encoding, callback) {
        const self = this;
        const internals = this[kInternals];
        const maxRate = internals.maxRate;

        const readableHighWaterMark = this.readableHighWaterMark;

        const timeWindow = internals.timeWindow;

        const divider = 1000 / timeWindow;
        const bytesThreshold = (maxRate / divider);
        const minChunkSize = internals.minChunkSize !== false ? Math.max(internals.minChunkSize, bytesThreshold * 0.01) : 0;

        function pushChunk(_chunk, _callback) {
          const bytes = Buffer.byteLength(_chunk);
          internals.bytesSeen += bytes;
          internals.bytes += bytes;

          if (internals.isCaptured) {
            internals.updateProgress();
          }

          if (self.push(_chunk)) {
            process.nextTick(_callback);
          } else {
            internals.onReadCallback = () => {
              internals.onReadCallback = null;
              process.nextTick(_callback);
            };
          }
        }

        const transformChunk = (_chunk, _callback) => {
          const chunkSize = Buffer.byteLength(_chunk);
          let chunkRemainder = null;
          let maxChunkSize = readableHighWaterMark;
          let bytesLeft;
          let passed = 0;

          if (maxRate) {
            const now = Date.now();

            if (!internals.ts || (passed = (now - internals.ts)) >= timeWindow) {
              internals.ts = now;
              bytesLeft = bytesThreshold - internals.bytes;
              internals.bytes = bytesLeft < 0 ? -bytesLeft : 0;
              passed = 0;
            }

            bytesLeft = bytesThreshold - internals.bytes;
          }

          if (maxRate) {
            if (bytesLeft <= 0) {
              // next time window
              return setTimeout(() => {
                _callback(null, _chunk);
              }, timeWindow - passed);
            }

            if (bytesLeft < maxChunkSize) {
              maxChunkSize = bytesLeft;
            }
          }

          if (maxChunkSize && chunkSize > maxChunkSize && (chunkSize - maxChunkSize) > minChunkSize) {
            chunkRemainder = _chunk.subarray(maxChunkSize);
            _chunk = _chunk.subarray(0, maxChunkSize);
          }

          pushChunk(_chunk, chunkRemainder ? () => {
            process.nextTick(_callback, null, chunkRemainder);
          } : _callback);
        };

        transformChunk(chunk, function transformNextChunk(err, _chunk) {
          if (err) {
            return callback(err);
          }

          if (_chunk) {
            transformChunk(_chunk, transformNextChunk);
          } else {
            callback(null);
          }
        });
      }

      setLength(length) {
        this[kInternals].length = +length;
        return this;
      }
    }

    const isBrotliSupported = utils.isFunction(zlib__default["default"].createBrotliDecompress);

    const {http: httpFollow, https: httpsFollow} = followRedirects.exports;

    const isHttps = /https:?/;

    const supportedProtocols = platform.protocols.map(protocol => {
      return protocol + ':';
    });

    /**
     * If the proxy or config beforeRedirects functions are defined, call them with the options
     * object.
     *
     * @param {Object<string, any>} options - The options object that was passed to the request.
     *
     * @returns {Object<string, any>}
     */
    function dispatchBeforeRedirect(options) {
      if (options.beforeRedirects.proxy) {
        options.beforeRedirects.proxy(options);
      }
      if (options.beforeRedirects.config) {
        options.beforeRedirects.config(options);
      }
    }

    /**
     * If the proxy or config afterRedirects functions are defined, call them with the options
     *
     * @param {http.ClientRequestArgs} options
     * @param {AxiosProxyConfig} configProxy configuration from Axios options object
     * @param {string} location
     *
     * @returns {http.ClientRequestArgs}
     */
    function setProxy(options, configProxy, location) {
      let proxy = configProxy;
      if (!proxy && proxy !== false) {
        const proxyUrl = getProxyForUrl_1(location);
        if (proxyUrl) {
          proxy = new URL(proxyUrl);
        }
      }
      if (proxy) {
        // Basic proxy authorization
        if (proxy.username) {
          proxy.auth = (proxy.username || '') + ':' + (proxy.password || '');
        }

        if (proxy.auth) {
          // Support proxy auth object form
          if (proxy.auth.username || proxy.auth.password) {
            proxy.auth = (proxy.auth.username || '') + ':' + (proxy.auth.password || '');
          }
          const base64 = Buffer
            .from(proxy.auth, 'utf8')
            .toString('base64');
          options.headers['Proxy-Authorization'] = 'Basic ' + base64;
        }

        options.headers.host = options.hostname + (options.port ? ':' + options.port : '');
        const proxyHost = proxy.hostname || proxy.host;
        options.hostname = proxyHost;
        // Replace 'host' since options is not a URL object
        options.host = proxyHost;
        options.port = proxy.port;
        options.path = location;
        if (proxy.protocol) {
          options.protocol = proxy.protocol.includes(':') ? proxy.protocol : `${proxy.protocol}:`;
        }
      }

      options.beforeRedirects.proxy = function beforeRedirect(redirectOptions) {
        // Configure proxy for redirected request, passing the original config proxy to apply
        // the exact same logic as if the redirected request was performed by axios directly.
        setProxy(redirectOptions, configProxy, redirectOptions.href);
      };
    }

    /*eslint consistent-return:0*/
    function httpAdapter(config) {
      return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        let data = config.data;
        const responseType = config.responseType;
        const responseEncoding = config.responseEncoding;
        const method = config.method.toUpperCase();
        let isFinished;
        let isDone;
        let rejected = false;
        let req;

        // temporary internal emitter until the AxiosRequest class will be implemented
        const emitter = new EventEmitter__default["default"]();

        function onFinished() {
          if (isFinished) return;
          isFinished = true;

          if (config.cancelToken) {
            config.cancelToken.unsubscribe(abort);
          }

          if (config.signal) {
            config.signal.removeEventListener('abort', abort);
          }

          emitter.removeAllListeners();
        }

        function done(value, isRejected) {
          if (isDone) return;

          isDone = true;

          if (isRejected) {
            rejected = true;
            onFinished();
          }

          isRejected ? rejectPromise(value) : resolvePromise(value);
        }

        const resolve = function resolve(value) {
          done(value);
        };

        const reject = function reject(value) {
          done(value, true);
        };

        function abort(reason) {
          emitter.emit('abort', !reason || reason.type ? new CanceledError(null, config, req) : reason);
        }

        emitter.once('abort', reject);

        if (config.cancelToken || config.signal) {
          config.cancelToken && config.cancelToken.subscribe(abort);
          if (config.signal) {
            config.signal.aborted ? abort() : config.signal.addEventListener('abort', abort);
          }
        }

        // Parse url
        const fullPath = buildFullPath(config.baseURL, config.url);
        const parsed = new URL(fullPath);
        const protocol = parsed.protocol || supportedProtocols[0];

        if (protocol === 'data:') {
          let convertedData;

          if (method !== 'GET') {
            return settle(resolve, reject, {
              status: 405,
              statusText: 'method not allowed',
              headers: {},
              config
            });
          }

          try {
            convertedData = fromDataURI(config.url, responseType === 'blob', {
              Blob: config.env && config.env.Blob
            });
          } catch (err) {
            throw AxiosError.from(err, AxiosError.ERR_BAD_REQUEST, config);
          }

          if (responseType === 'text') {
            convertedData = convertedData.toString(responseEncoding);

            if (!responseEncoding || responseEncoding === 'utf8') {
              data = utils.stripBOM(convertedData);
            }
          } else if (responseType === 'stream') {
            convertedData = stream__default["default"].Readable.from(convertedData);
          }

          return settle(resolve, reject, {
            data: convertedData,
            status: 200,
            statusText: 'OK',
            headers: {},
            config
          });
        }

        if (supportedProtocols.indexOf(protocol) === -1) {
          return reject(new AxiosError(
            'Unsupported protocol ' + protocol,
            AxiosError.ERR_BAD_REQUEST,
            config
          ));
        }

        const headers = AxiosHeaders.from(config.headers).normalize();

        // Set User-Agent (required by some servers)
        // See https://github.com/axios/axios/issues/69
        // User-Agent is specified; handle case where no UA header is desired
        // Only set header if it hasn't been set in config
        headers.set('User-Agent', 'axios/' + VERSION, false);

        const onDownloadProgress = config.onDownloadProgress;
        const onUploadProgress = config.onUploadProgress;
        const maxRate = config.maxRate;
        let maxUploadRate = undefined;
        let maxDownloadRate = undefined;

        // support for https://www.npmjs.com/package/form-data api
        if (utils.isFormData(data) && utils.isFunction(data.getHeaders)) {
          headers.set(data.getHeaders());
        } else if (data && !utils.isStream(data)) {
          if (Buffer.isBuffer(data)) ; else if (utils.isArrayBuffer(data)) {
            data = Buffer.from(new Uint8Array(data));
          } else if (utils.isString(data)) {
            data = Buffer.from(data, 'utf-8');
          } else {
            return reject(new AxiosError(
              'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
              AxiosError.ERR_BAD_REQUEST,
              config
            ));
          }

          // Add Content-Length header if data exists
          headers.set('Content-Length', data.length, false);

          if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
            return reject(new AxiosError(
              'Request body larger than maxBodyLength limit',
              AxiosError.ERR_BAD_REQUEST,
              config
            ));
          }
        }

        const contentLength = +headers.getContentLength();

        if (utils.isArray(maxRate)) {
          maxUploadRate = maxRate[0];
          maxDownloadRate = maxRate[1];
        } else {
          maxUploadRate = maxDownloadRate = maxRate;
        }

        if (data && (onUploadProgress || maxUploadRate)) {
          if (!utils.isStream(data)) {
            data = stream__default["default"].Readable.from(data, {objectMode: false});
          }

          data = stream__default["default"].pipeline([data, new AxiosTransformStream({
            length: utils.toFiniteNumber(contentLength),
            maxRate: utils.toFiniteNumber(maxUploadRate)
          })], utils.noop);

          onUploadProgress && data.on('progress', progress => {
            onUploadProgress(Object.assign(progress, {
              upload: true
            }));
          });
        }

        // HTTP basic authentication
        let auth = undefined;
        if (config.auth) {
          const username = config.auth.username || '';
          const password = config.auth.password || '';
          auth = username + ':' + password;
        }

        if (!auth && parsed.username) {
          const urlUsername = parsed.username;
          const urlPassword = parsed.password;
          auth = urlUsername + ':' + urlPassword;
        }

        auth && headers.delete('authorization');

        let path;

        try {
          path = buildURL(
            parsed.pathname + parsed.search,
            config.params,
            config.paramsSerializer
          ).replace(/^\?/, '');
        } catch (err) {
          const customErr = new Error(err.message);
          customErr.config = config;
          customErr.url = config.url;
          customErr.exists = true;
          return reject(customErr);
        }

        headers.set('Accept-Encoding', 'gzip, deflate, br', false);

        const options = {
          path,
          method: method,
          headers: headers.toJSON(),
          agents: { http: config.httpAgent, https: config.httpsAgent },
          auth,
          protocol,
          beforeRedirect: dispatchBeforeRedirect,
          beforeRedirects: {}
        };

        if (config.socketPath) {
          options.socketPath = config.socketPath;
        } else {
          options.hostname = parsed.hostname;
          options.port = parsed.port;
          setProxy(options, config.proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
        }

        let transport;
        const isHttpsRequest = isHttps.test(options.protocol);
        options.agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        if (config.transport) {
          transport = config.transport;
        } else if (config.maxRedirects === 0) {
          transport = isHttpsRequest ? require$$4__default["default"] : require$$3__default["default"];
        } else {
          if (config.maxRedirects) {
            options.maxRedirects = config.maxRedirects;
          }
          if (config.beforeRedirect) {
            options.beforeRedirects.config = config.beforeRedirect;
          }
          transport = isHttpsRequest ? httpsFollow : httpFollow;
        }

        if (config.maxBodyLength > -1) {
          options.maxBodyLength = config.maxBodyLength;
        } else {
          // follow-redirects does not skip comparison, so it should always succeed for axios -1 unlimited
          options.maxBodyLength = Infinity;
        }

        if (config.insecureHTTPParser) {
          options.insecureHTTPParser = config.insecureHTTPParser;
        }

        // Create the request
        req = transport.request(options, function handleResponse(res) {
          if (req.destroyed) return;

          const streams = [res];

          // uncompress the response body transparently if required
          let responseStream = res;

          // return the last request in case of redirects
          const lastRequest = res.req || req;

          // if decompress disabled we should not decompress
          if (config.decompress !== false) {
            // if no content, but headers still say that it is encoded,
            // remove the header not confuse downstream operations
            if (data && data.length === 0 && res.headers['content-encoding']) {
              delete res.headers['content-encoding'];
            }

            switch (res.headers['content-encoding']) {
            /*eslint default-case:0*/
            case 'gzip':
            case 'compress':
            case 'deflate':
              // add the unzipper to the body stream processing pipeline
              streams.push(zlib__default["default"].createUnzip());

              // remove the content-encoding in order to not confuse downstream operations
              delete res.headers['content-encoding'];
              break;
            case 'br':
              if (isBrotliSupported) {
                streams.push(zlib__default["default"].createBrotliDecompress());
                delete res.headers['content-encoding'];
              }
            }
          }

          if (onDownloadProgress) {
            const responseLength = +res.headers['content-length'];

            const transformStream = new AxiosTransformStream({
              length: utils.toFiniteNumber(responseLength),
              maxRate: utils.toFiniteNumber(maxDownloadRate)
            });

            onDownloadProgress && transformStream.on('progress', progress => {
              onDownloadProgress(Object.assign(progress, {
                download: true
              }));
            });

            streams.push(transformStream);
          }

          responseStream = streams.length > 1 ? stream__default["default"].pipeline(streams, utils.noop) : streams[0];

          const offListeners = stream__default["default"].finished(responseStream, () => {
            offListeners();
            onFinished();
          });

          const response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: new AxiosHeaders(res.headers),
            config,
            request: lastRequest
          };

          if (responseType === 'stream') {
            response.data = responseStream;
            settle(resolve, reject, response);
          } else {
            const responseBuffer = [];
            let totalResponseBytes = 0;

            responseStream.on('data', function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              totalResponseBytes += chunk.length;

              // make sure the content length is not over the maxContentLength if specified
              if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                // stream.destroy() emit aborted event before calling reject() on Node.js v16
                rejected = true;
                responseStream.destroy();
                reject(new AxiosError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
                  AxiosError.ERR_BAD_RESPONSE, config, lastRequest));
              }
            });

            responseStream.on('aborted', function handlerStreamAborted() {
              if (rejected) {
                return;
              }

              const err = new AxiosError(
                'maxContentLength size of ' + config.maxContentLength + ' exceeded',
                AxiosError.ERR_BAD_RESPONSE,
                config,
                lastRequest
              );
              responseStream.destroy(err);
              reject(err);
            });

            responseStream.on('error', function handleStreamError(err) {
              if (req.destroyed) return;
              reject(AxiosError.from(err, null, config, lastRequest));
            });

            responseStream.on('end', function handleStreamEnd() {
              try {
                let responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
                if (responseType !== 'arraybuffer') {
                  responseData = responseData.toString(responseEncoding);
                  if (!responseEncoding || responseEncoding === 'utf8') {
                    responseData = utils.stripBOM(responseData);
                  }
                }
                response.data = responseData;
              } catch (err) {
                reject(AxiosError.from(err, null, config, response.request, response));
              }
              settle(resolve, reject, response);
            });
          }

          emitter.once('abort', err => {
            if (!responseStream.destroyed) {
              responseStream.emit('error', err);
              responseStream.destroy();
            }
          });
        });

        emitter.once('abort', err => {
          reject(err);
          req.destroy(err);
        });

        // Handle errors
        req.on('error', function handleRequestError(err) {
          // @todo remove
          // if (req.aborted && err.code !== AxiosError.ERR_FR_TOO_MANY_REDIRECTS) return;
          reject(AxiosError.from(err, null, config, req));
        });

        // set tcp keep alive to prevent drop connection by peer
        req.on('socket', function handleRequestSocket(socket) {
          // default interval of sending ack packet is 1 minute
          socket.setKeepAlive(true, 1000 * 60);
        });

        // Handle request timeout
        if (config.timeout) {
          // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
          const timeout = parseInt(config.timeout, 10);

          if (isNaN(timeout)) {
            reject(new AxiosError(
              'error trying to parse `config.timeout` to int',
              AxiosError.ERR_BAD_OPTION_VALUE,
              config,
              req
            ));

            return;
          }

          // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
          // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
          // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
          // And then these socket which be hang up will devouring CPU little by little.
          // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
          req.setTimeout(timeout, function handleRequestTimeout() {
            if (isDone) return;
            let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
            const transitional = config.transitional || transitionalDefaults;
            if (config.timeoutErrorMessage) {
              timeoutErrorMessage = config.timeoutErrorMessage;
            }
            reject(new AxiosError(
              timeoutErrorMessage,
              transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
              config,
              req
            ));
            abort();
          });
        }


        // Send the request
        if (utils.isStream(data)) {
          let ended = false;
          let errored = false;

          data.on('end', () => {
            ended = true;
          });

          data.once('error', err => {
            errored = true;
            req.destroy(err);
          });

          data.on('close', () => {
            if (!ended && !errored) {
              abort(new CanceledError('Request stream has been aborted', config, req));
            }
          });

          data.pipe(req);
        } else {
          req.end(data);
        }
      });
    }

    var cookies = platform.isStandardBrowserEnv ?

    // Standard browser envs support document.cookie
      (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            const cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));

            if (utils.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }

            if (utils.isString(path)) {
              cookie.push('path=' + path);
            }

            if (utils.isString(domain)) {
              cookie.push('domain=' + domain);
            }

            if (secure === true) {
              cookie.push('secure');
            }

            document.cookie = cookie.join('; ');
          },

          read: function read(name) {
            const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return (match ? decodeURIComponent(match[3]) : null);
          },

          remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
          }
        };
      })() :

    // Non standard browser env (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() { return null; },
          remove: function remove() {}
        };
      })();

    var isURLSameOrigin = platform.isStandardBrowserEnv ?

    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
      (function standardBrowserEnv() {
        const msie = /(msie|trident)/i.test(navigator.userAgent);
        const urlParsingNode = document.createElement('a');
        let originURL;

        /**
        * Parse a URL to discover it's components
        *
        * @param {String} url The URL to be parsed
        * @returns {Object}
        */
        function resolveURL(url) {
          let href = url;

          if (msie) {
            // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }

          urlParsingNode.setAttribute('href', href);

          // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
              urlParsingNode.pathname :
              '/' + urlParsingNode.pathname
          };
        }

        originURL = resolveURL(window.location.href);

        /**
        * Determine if a URL shares the same origin as the current location
        *
        * @param {String} requestURL The URL to test
        * @returns {boolean} True if URL shares the same origin, otherwise false
        */
        return function isURLSameOrigin(requestURL) {
          const parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
          return (parsed.protocol === originURL.protocol &&
              parsed.host === originURL.host);
        };
      })() :

      // Non standard browser envs (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      })();

    function progressEventReducer(listener, isDownloadStream) {
      let bytesNotified = 0;
      const _speedometer = speedometer(50, 250);

      return e => {
        const loaded = e.loaded;
        const total = e.lengthComputable ? e.total : undefined;
        const progressBytes = loaded - bytesNotified;
        const rate = _speedometer(progressBytes);
        const inRange = loaded <= total;

        bytesNotified = loaded;

        const data = {
          loaded,
          total,
          progress: total ? (loaded / total) : undefined,
          bytes: progressBytes,
          rate: rate ? rate : undefined,
          estimated: rate && total && inRange ? (total - loaded) / rate : undefined
        };

        data[isDownloadStream ? 'download' : 'upload'] = true;

        listener(data);
      };
    }

    function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        let requestData = config.data;
        const requestHeaders = AxiosHeaders.from(config.headers).normalize();
        const responseType = config.responseType;
        let onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }

          if (config.signal) {
            config.signal.removeEventListener('abort', onCanceled);
          }
        }

        if (utils.isFormData(requestData) && platform.isStandardBrowserEnv) {
          requestHeaders.setContentType(false); // Let the browser set it
        }

        let request = new XMLHttpRequest();

        // HTTP basic authentication
        if (config.auth) {
          const username = config.auth.username || '';
          const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
          requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
        }

        const fullPath = buildFullPath(config.baseURL, config.url);

        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

        // Set the request timeout in MS
        request.timeout = config.timeout;

        function onloadend() {
          if (!request) {
            return;
          }
          // Prepare the response
          const responseHeaders = AxiosHeaders.from(
            'getAllResponseHeaders' in request && request.getAllResponseHeaders()
          );
          const responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
            request.responseText : request.response;
          const response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };

          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);

          // Clean up request
          request = null;
        }

        if ('onloadend' in request) {
          // Use onloadend if available
          request.onloadend = onloadend;
        } else {
          // Listen for ready state to emulate onloadend
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }

            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
              return;
            }
            // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'
            setTimeout(onloadend);
          };
        }

        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }

          reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

          // Clean up request
          request = null;
        };

        // Handle low level network errors
        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

          // Clean up request
          request = null;
        };

        // Handle timeout
        request.ontimeout = function handleTimeout() {
          let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
          const transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(new AxiosError(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config,
            request));

          // Clean up request
          request = null;
        };

        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (platform.isStandardBrowserEnv) {
          // Add xsrf header
          const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath))
            && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

          if (xsrfValue) {
            requestHeaders.set(config.xsrfHeaderName, xsrfValue);
          }
        }

        // Remove Content-Type if data is undefined
        requestData === undefined && requestHeaders.setContentType(null);

        // Add headers to the request
        if ('setRequestHeader' in request) {
          utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
            request.setRequestHeader(key, val);
          });
        }

        // Add withCredentials to request if needed
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }

        // Add responseType to request if needed
        if (responseType && responseType !== 'json') {
          request.responseType = config.responseType;
        }

        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') {
          request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
        }

        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) {
          request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
        }

        if (config.cancelToken || config.signal) {
          // Handle cancellation
          // eslint-disable-next-line func-names
          onCanceled = cancel => {
            if (!request) {
              return;
            }
            reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
            request.abort();
            request = null;
          };

          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
          }
        }

        const protocol = parseProtocol(fullPath);

        if (protocol && platform.protocols.indexOf(protocol) === -1) {
          reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
          return;
        }


        // Send the request
        request.send(requestData || null);
      });
    }

    const adapters = {
      http: httpAdapter,
      xhr: xhrAdapter
    };

    var adapters$1 = {
      getAdapter: (nameOrAdapter) => {
        if(utils.isString(nameOrAdapter)){
          const adapter = adapters[nameOrAdapter];

          if (!nameOrAdapter) {
            throw Error(
              utils.hasOwnProp(nameOrAdapter) ?
                `Adapter '${nameOrAdapter}' is not available in the build` :
                `Can not resolve adapter '${nameOrAdapter}'`
            );
          }

          return adapter
        }

        if (!utils.isFunction(nameOrAdapter)) {
          throw new TypeError('adapter is not a function');
        }

        return nameOrAdapter;
      },
      adapters
    };

    const DEFAULT_CONTENT_TYPE = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    /**
     * If the browser has an XMLHttpRequest object, use the XHR adapter, otherwise use the HTTP
     * adapter
     *
     * @returns {Function}
     */
    function getDefaultAdapter() {
      let adapter;
      if (typeof XMLHttpRequest !== 'undefined') {
        // For browsers use XHR adapter
        adapter = adapters$1.getAdapter('xhr');
      } else if (typeof process !== 'undefined' && utils.kindOf(process) === 'process') {
        // For node use HTTP adapter
        adapter = adapters$1.getAdapter('http');
      }
      return adapter;
    }

    /**
     * It takes a string, tries to parse it, and if it fails, it returns the stringified version
     * of the input
     *
     * @param {any} rawValue - The value to be stringified.
     * @param {Function} parser - A function that parses a string into a JavaScript object.
     * @param {Function} encoder - A function that takes a value and returns a string.
     *
     * @returns {string} A stringified version of the rawValue.
     */
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== 'SyntaxError') {
            throw e;
          }
        }
      }

      return (encoder || JSON.stringify)(rawValue);
    }

    const defaults = {

      transitional: transitionalDefaults,

      adapter: getDefaultAdapter(),

      transformRequest: [function transformRequest(data, headers) {
        const contentType = headers.getContentType() || '';
        const hasJSONContentType = contentType.indexOf('application/json') > -1;
        const isObjectPayload = utils.isObject(data);

        if (isObjectPayload && utils.isHTMLForm(data)) {
          data = new FormData(data);
        }

        const isFormData = utils.isFormData(data);

        if (isFormData) {
          if (!hasJSONContentType) {
            return data;
          }
          return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
        }

        if (utils.isArrayBuffer(data) ||
          utils.isBuffer(data) ||
          utils.isStream(data) ||
          utils.isFile(data) ||
          utils.isBlob(data)
        ) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
          return data.toString();
        }

        let isFileList;

        if (isObjectPayload) {
          if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
            return toURLEncodedForm(data, this.formSerializer).toString();
          }

          if ((isFileList = utils.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
            const _FormData = this.env && this.env.FormData;

            return toFormData(
              isFileList ? {'files[]': data} : data,
              _FormData && new _FormData(),
              this.formSerializer
            );
          }
        }

        if (isObjectPayload || hasJSONContentType ) {
          headers.setContentType('application/json', false);
          return stringifySafely(data);
        }

        return data;
      }],

      transformResponse: [function transformResponse(data) {
        const transitional = this.transitional || defaults.transitional;
        const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        const JSONRequested = this.responseType === 'json';

        if (data && utils.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
          const silentJSONParsing = transitional && transitional.silentJSONParsing;
          const strictJSONParsing = !silentJSONParsing && JSONRequested;

          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === 'SyntaxError') {
                throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e;
            }
          }
        }

        return data;
      }],

      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,

      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',

      maxContentLength: -1,
      maxBodyLength: -1,

      env: {
        FormData: platform.classes.FormData,
        Blob: platform.classes.Blob
      },

      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },

      headers: {
        common: {
          'Accept': 'application/json, text/plain, */*'
        }
      }
    };

    utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });

    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });

    /**
     * Transform the data for a request or a response
     *
     * @param {Array|Function} fns A single function or Array of functions
     * @param {?Object} response The response object
     *
     * @returns {*} The resulting transformed data
     */
    function transformData(fns, response) {
      const config = this || defaults;
      const context = response || config;
      const headers = AxiosHeaders.from(context.headers);
      let data = context.data;

      utils.forEach(fns, function transform(fn) {
        data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
      });

      headers.normalize();

      return data;
    }

    function isCancel(value) {
      return !!(value && value.__CANCEL__);
    }

    /**
     * Throws a `CanceledError` if cancellation has been requested.
     *
     * @param {Object} config The config that is to be used for the request
     *
     * @returns {void}
     */
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }

      if (config.signal && config.signal.aborted) {
        throw new CanceledError();
      }
    }

    /**
     * Dispatch a request to the server using the configured adapter.
     *
     * @param {object} config The config that is to be used for the request
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    function dispatchRequest(config) {
      throwIfCancellationRequested(config);

      config.headers = AxiosHeaders.from(config.headers);

      // Transform request data
      config.data = transformData.call(
        config,
        config.transformRequest
      );

      const adapter = config.adapter || defaults.adapter;

      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);

        // Transform response data
        response.data = transformData.call(
          config,
          config.transformResponse,
          response
        );

        response.headers = AxiosHeaders.from(response.headers);

        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);

          // Transform response data
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              config.transformResponse,
              reason.response
            );
            reason.response.headers = AxiosHeaders.from(reason.response.headers);
          }
        }

        return Promise.reject(reason);
      });
    }

    /**
     * Config-specific merge-function which creates a new config-object
     * by merging two configuration objects together.
     *
     * @param {Object} config1
     * @param {Object} config2
     *
     * @returns {Object} New object resulting from merging config2 to config1
     */
    function mergeConfig(config1, config2) {
      // eslint-disable-next-line no-param-reassign
      config2 = config2 || {};
      const config = {};

      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }

      // eslint-disable-next-line consistent-return
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(undefined, config1[prop]);
        }
      }

      // eslint-disable-next-line consistent-return
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(undefined, config2[prop]);
        }
      }

      // eslint-disable-next-line consistent-return
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(undefined, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(undefined, config1[prop]);
        }
      }

      // eslint-disable-next-line consistent-return
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(undefined, config1[prop]);
        }
      }

      const mergeMap = {
        'url': valueFromConfig2,
        'method': valueFromConfig2,
        'data': valueFromConfig2,
        'baseURL': defaultToConfig2,
        'transformRequest': defaultToConfig2,
        'transformResponse': defaultToConfig2,
        'paramsSerializer': defaultToConfig2,
        'timeout': defaultToConfig2,
        'timeoutMessage': defaultToConfig2,
        'withCredentials': defaultToConfig2,
        'adapter': defaultToConfig2,
        'responseType': defaultToConfig2,
        'xsrfCookieName': defaultToConfig2,
        'xsrfHeaderName': defaultToConfig2,
        'onUploadProgress': defaultToConfig2,
        'onDownloadProgress': defaultToConfig2,
        'decompress': defaultToConfig2,
        'maxContentLength': defaultToConfig2,
        'maxBodyLength': defaultToConfig2,
        'beforeRedirect': defaultToConfig2,
        'transport': defaultToConfig2,
        'httpAgent': defaultToConfig2,
        'httpsAgent': defaultToConfig2,
        'cancelToken': defaultToConfig2,
        'socketPath': defaultToConfig2,
        'responseEncoding': defaultToConfig2,
        'validateStatus': mergeDirectKeys
      };

      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        const merge = mergeMap[prop] || mergeDeepProperties;
        const configValue = merge(prop);
        (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
      });

      return config;
    }

    const validators$1 = {};

    // eslint-disable-next-line func-names
    ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
      validators$1[type] = function validator(thing) {
        return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
      };
    });

    const deprecatedWarnings = {};

    /**
     * Transitional option validator
     *
     * @param {function|boolean?} validator - set to false if the transitional option has been removed
     * @param {string?} version - deprecated version / removed since version
     * @param {string?} message - some message with additional info
     *
     * @returns {function}
     */
    validators$1.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
      }

      // eslint-disable-next-line func-names
      return (value, opt, opts) => {
        if (validator === false) {
          throw new AxiosError(
            formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
            AxiosError.ERR_DEPRECATED
          );
        }

        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          // eslint-disable-next-line no-console
          console.warn(
            formatMessage(
              opt,
              ' has been deprecated since v' + version + ' and will be removed in the near future'
            )
          );
        }

        return validator ? validator(value, opt, opts) : true;
      };
    };

    /**
     * Assert object's properties type
     *
     * @param {object} options
     * @param {object} schema
     * @param {boolean?} allowUnknown
     *
     * @returns {object}
     */

    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== 'object') {
        throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
      }
      const keys = Object.keys(options);
      let i = keys.length;
      while (i-- > 0) {
        const opt = keys[i];
        const validator = schema[opt];
        if (validator) {
          const value = options[opt];
          const result = value === undefined || validator(value, opt, options);
          if (result !== true) {
            throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }

    var validator = {
      assertOptions,
      validators: validators$1
    };

    const validators = validator.validators;

    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     *
     * @return {Axios} A new instance of Axios
     */
    class Axios {
      constructor(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
          request: new InterceptorManager(),
          response: new InterceptorManager()
        };
      }

      /**
       * Dispatch a request
       *
       * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
       * @param {?Object} config
       *
       * @returns {Promise} The Promise to be fulfilled
       */
      request(configOrUrl, config) {
        /*eslint no-param-reassign:0*/
        // Allow for axios('example/url'[, config]) a la fetch API
        if (typeof configOrUrl === 'string') {
          config = config || {};
          config.url = configOrUrl;
        } else {
          config = configOrUrl || {};
        }

        config = mergeConfig(this.defaults, config);

        const {transitional, paramsSerializer} = config;

        if (transitional !== undefined) {
          validator.assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean)
          }, false);
        }

        if (paramsSerializer !== undefined) {
          validator.assertOptions(paramsSerializer, {
            encode: validators.function,
            serialize: validators.function
          }, true);
        }

        // Set config.method
        config.method = (config.method || this.defaults.method || 'get').toLowerCase();

        // Flatten headers
        const defaultHeaders = config.headers && utils.merge(
          config.headers.common,
          config.headers[config.method]
        );

        defaultHeaders && utils.forEach(
          ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
          function cleanHeaderConfig(method) {
            delete config.headers[method];
          }
        );

        config.headers = new AxiosHeaders(config.headers, defaultHeaders);

        // filter out skipped interceptors
        const requestInterceptorChain = [];
        let synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
            return;
          }

          synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

          requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        });

        const responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });

        let promise;
        let i = 0;
        let len;

        if (!synchronousRequestInterceptors) {
          const chain = [dispatchRequest.bind(this), undefined];
          chain.unshift.apply(chain, requestInterceptorChain);
          chain.push.apply(chain, responseInterceptorChain);
          len = chain.length;

          promise = Promise.resolve(config);

          while (i < len) {
            promise = promise.then(chain[i++], chain[i++]);
          }

          return promise;
        }

        len = requestInterceptorChain.length;

        let newConfig = config;

        i = 0;

        while (i < len) {
          const onFulfilled = requestInterceptorChain[i++];
          const onRejected = requestInterceptorChain[i++];
          try {
            newConfig = onFulfilled(newConfig);
          } catch (error) {
            onRejected.call(this, error);
            break;
          }
        }

        try {
          promise = dispatchRequest.call(this, newConfig);
        } catch (error) {
          return Promise.reject(error);
        }

        i = 0;
        len = responseInterceptorChain.length;

        while (i < len) {
          promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        }

        return promise;
      }

      getUri(config) {
        config = mergeConfig(this.defaults, config);
        const fullPath = buildFullPath(config.baseURL, config.url);
        return buildURL(fullPath, config.params, config.paramsSerializer);
      }
    }

    // Provide aliases for supported request methods
    utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });

    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      /*eslint func-names:0*/

      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
          return this.request(mergeConfig(config || {}, {
            method,
            headers: isForm ? {
              'Content-Type': 'multipart/form-data'
            } : {},
            url,
            data
          }));
        };
      }

      Axios.prototype[method] = generateHTTPMethod();

      Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
    });

    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @param {Function} executor The executor function.
     *
     * @returns {CancelToken}
     */
    class CancelToken {
      constructor(executor) {
        if (typeof executor !== 'function') {
          throw new TypeError('executor must be a function.');
        }

        let resolvePromise;

        this.promise = new Promise(function promiseExecutor(resolve) {
          resolvePromise = resolve;
        });

        const token = this;

        // eslint-disable-next-line func-names
        this.promise.then(cancel => {
          if (!token._listeners) return;

          let i = token._listeners.length;

          while (i-- > 0) {
            token._listeners[i](cancel);
          }
          token._listeners = null;
        });

        // eslint-disable-next-line func-names
        this.promise.then = onfulfilled => {
          let _resolve;
          // eslint-disable-next-line func-names
          const promise = new Promise(resolve => {
            token.subscribe(resolve);
            _resolve = resolve;
          }).then(onfulfilled);

          promise.cancel = function reject() {
            token.unsubscribe(_resolve);
          };

          return promise;
        };

        executor(function cancel(message, config, request) {
          if (token.reason) {
            // Cancellation has already been requested
            return;
          }

          token.reason = new CanceledError(message, config, request);
          resolvePromise(token.reason);
        });
      }

      /**
       * Throws a `CanceledError` if cancellation has been requested.
       */
      throwIfRequested() {
        if (this.reason) {
          throw this.reason;
        }
      }

      /**
       * Subscribe to the cancel signal
       */

      subscribe(listener) {
        if (this.reason) {
          listener(this.reason);
          return;
        }

        if (this._listeners) {
          this._listeners.push(listener);
        } else {
          this._listeners = [listener];
        }
      }

      /**
       * Unsubscribe from the cancel signal
       */

      unsubscribe(listener) {
        if (!this._listeners) {
          return;
        }
        const index = this._listeners.indexOf(listener);
        if (index !== -1) {
          this._listeners.splice(index, 1);
        }
      }

      /**
       * Returns an object that contains a new `CancelToken` and a function that, when called,
       * cancels the `CancelToken`.
       */
      static source() {
        let cancel;
        const token = new CancelToken(function executor(c) {
          cancel = c;
        });
        return {
          token,
          cancel
        };
      }
    }

    /**
     * Syntactic sugar for invoking a function and expanding an array for arguments.
     *
     * Common use case would be to use `Function.prototype.apply`.
     *
     *  ```js
     *  function f(x, y, z) {}
     *  var args = [1, 2, 3];
     *  f.apply(null, args);
     *  ```
     *
     * With `spread` this example can be re-written.
     *
     *  ```js
     *  spread(function(x, y, z) {})([1, 2, 3]);
     *  ```
     *
     * @param {Function} callback
     *
     * @returns {Function}
     */
    function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    }

    /**
     * Determines whether the payload is an error thrown by Axios
     *
     * @param {*} payload The value to test
     *
     * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
     */
    function isAxiosError(payload) {
      return utils.isObject(payload) && (payload.isAxiosError === true);
    }

    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     *
     * @returns {Axios} A new instance of Axios
     */
    function createInstance(defaultConfig) {
      const context = new Axios(defaultConfig);
      const instance = bind(Axios.prototype.request, context);

      // Copy axios.prototype to instance
      utils.extend(instance, Axios.prototype, context, {allOwnKeys: true});

      // Copy context to instance
      utils.extend(instance, context, null, {allOwnKeys: true});

      // Factory for creating new instances
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };

      return instance;
    }

    // Create the default instance to be exported
    const axios = createInstance(defaults);

    // Expose Axios class to allow class inheritance
    axios.Axios = Axios;

    // Expose Cancel & CancelToken
    axios.CanceledError = CanceledError;
    axios.CancelToken = CancelToken;
    axios.isCancel = isCancel;
    axios.VERSION = VERSION;
    axios.toFormData = toFormData;

    // Expose AxiosError class
    axios.AxiosError = AxiosError;

    // alias for CanceledError for backward compatibility
    axios.Cancel = axios.CanceledError;

    // Expose all/spread
    axios.all = function all(promises) {
      return Promise.all(promises);
    };

    axios.spread = spread;

    // Expose isAxiosError
    axios.isAxiosError = isAxiosError;

    axios.formToJSON = thing => {
      return formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);
    };

    /* src/components/GeoJSON.svelte generated by Svelte v3.52.0 */

    function create_if_block$4(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function create_fragment$7(ctx) {
    	let div;
    	let current;
    	let if_block = /*geojson*/ ctx[0] && create_if_block$4(ctx);

    	return {
    		c() {
    			div = element("div");
    			if (if_block) if_block.c();
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (/*geojson*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*geojson*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$4(ctx);
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
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block) if_block.d();
    		}
    	};
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	const { getMap } = getContext(L$1);
    	let { url } = $$props;
    	let { options = {} } = $$props;
    	let { events = [] } = $$props;
    	let geojson;
    	setContext(L$1.Layer, { getLayer: () => geojson });
    	const dispatch = createEventDispatcher();
    	let eventBridge;

    	onDestroy(() => {
    		eventBridge.unregister();
    		geojson.removeFrom(getMap());
    	});

    	function getGeoJSON() {
    		return geojson;
    	}

    	$$self.$$set = $$props => {
    		if ('url' in $$props) $$invalidate(1, url = $$props.url);
    		if ('options' in $$props) $$invalidate(2, options = $$props.options);
    		if ('events' in $$props) $$invalidate(3, events = $$props.events);
    		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*geojson, options, events, url*/ 15) {
    			{
    				if (!geojson) {
    					$$invalidate(0, geojson = L$1.geoJSON(null, options).addTo(getMap()));
    					eventBridge = new EventBridge(geojson, dispatch, events);
    				}

    				axios.get(url).then(result => {
    					geojson.clearLayers();
    					geojson.addData(result.data);
    				});
    			}
    		}
    	};

    	return [geojson, url, options, events, getGeoJSON, $$scope, slots];
    }

    class GeoJSON extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$b, create_fragment$7, safe_not_equal, {
    			url: 1,
    			options: 2,
    			events: 3,
    			getGeoJSON: 4
    		});
    	}

    	get getGeoJSON() {
    		return this.$$.ctx[4];
    	}
    }

    /* src/components/Icon.svelte generated by Svelte v3.52.0 */

    function instance$a($$self, $$props, $$invalidate) {
    	const { getMarker } = getContext(L$1.Marker);
    	let { options = {} } = $$props;
    	let icon;

    	function getIcon() {
    		return icon;
    	}

    	$$self.$$set = $$props => {
    		if ('options' in $$props) $$invalidate(0, options = $$props.options);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*options, icon*/ 5) {
    			{
    				$$invalidate(2, icon = L$1.icon(options));
    				getMarker().setIcon(icon);
    			}
    		}
    	};

    	return [options, getIcon, icon];
    }

    class Icon extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$a, null, safe_not_equal, { options: 0, getIcon: 1 });
    	}

    	get getIcon() {
    		return this.$$.ctx[1];
    	}
    }

    /* src/components/DivIcon.svelte generated by Svelte v3.52.0 */

    function create_fragment$6(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	return {
    		c() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[6](div);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[6](null);
    		}
    	};
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	const { getMarker } = getContext(L$1.Marker);
    	let { options = {} } = $$props;
    	let icon;
    	let html;

    	function getIcon() {
    		return icon;
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			html = $$value;
    			$$invalidate(0, html);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('options' in $$props) $$invalidate(1, options = $$props.options);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*html, options, icon*/ 11) {
    			{
    				$$invalidate(3, icon = L$1.divIcon({ ...{ html }, ...options }));
    				getMarker().setIcon(icon);
    			}
    		}
    	};

    	return [html, options, getIcon, icon, $$scope, slots, div_binding];
    }

    class DivIcon extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$9, create_fragment$6, safe_not_equal, { options: 1, getIcon: 2 });
    	}

    	get getIcon() {
    		return this.$$.ctx[2];
    	}
    }

    /* src/components/ImageOverlay.svelte generated by Svelte v3.52.0 */

    function instance$8($$self, $$props, $$invalidate) {
    	const { getMap } = getContext(L$1);
    	let { imageUrl } = $$props;
    	let { bounds } = $$props;
    	let { opacity = 1.0 } = $$props;
    	let { zIndex = 1 } = $$props;
    	let { options = {} } = $$props;
    	let { events = [] } = $$props;
    	let imageOverlay;
    	const dispatch = createEventDispatcher();
    	let eventBridge;

    	onDestroy(() => {
    		eventBridge.unregister();
    		imageOverlay.removeFrom(getMap());
    	});

    	function getImageOverlay() {
    		return imageOverlay;
    	}

    	$$self.$$set = $$props => {
    		if ('imageUrl' in $$props) $$invalidate(0, imageUrl = $$props.imageUrl);
    		if ('bounds' in $$props) $$invalidate(1, bounds = $$props.bounds);
    		if ('opacity' in $$props) $$invalidate(2, opacity = $$props.opacity);
    		if ('zIndex' in $$props) $$invalidate(3, zIndex = $$props.zIndex);
    		if ('options' in $$props) $$invalidate(4, options = $$props.options);
    		if ('events' in $$props) $$invalidate(5, events = $$props.events);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*imageOverlay, imageUrl, bounds, options, events, opacity, zIndex*/ 191) {
    			{
    				if (!imageOverlay) {
    					$$invalidate(7, imageOverlay = L$1.imageOverlay(imageUrl, bounds, options).addTo(getMap()));
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

    class ImageOverlay extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$8, null, safe_not_equal, {
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

    /* src/components/Marker.svelte generated by Svelte v3.52.0 */

    function create_if_block$3(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1024)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[10],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function create_fragment$5(ctx) {
    	let div;
    	let current;
    	let if_block = /*marker*/ ctx[0] && create_if_block$3(ctx);

    	return {
    		c() {
    			div = element("div");
    			if (if_block) if_block.c();
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (/*marker*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*marker*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
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
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block) if_block.d();
    		}
    	};
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	const { getMap } = getContext(L$1);

    	const defaultIcon = L$1.icon({
    		iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    		iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    		iconSize: [25, 41],
    		iconAnchor: [12, 41],
    		popupAnchor: [1, -34],
    		tooltipAnchor: [16, -28],
    		shadowSize: [41, 41]
    	});

    	let { latLng } = $$props;
    	let { zIndexOffset = 0 } = $$props;
    	let { icon = defaultIcon } = $$props;
    	let { opacity = 1.0 } = $$props;
    	let { options = {} } = $$props;
    	let { events = [] } = $$props;
    	let { rotationAngle = 0 } = $$props;
    	let { rotationOrigin = 'center bottom' } = $$props;
    	let marker;
    	setContext(L$1.Layer, { getLayer: () => marker });
    	setContext(L$1.Marker, { getMarker: () => marker });
    	const dispatch = createEventDispatcher();
    	let eventBridge;

    	onDestroy(() => {
    		eventBridge.unregister();
    		marker.removeFrom(getMap());
    	});

    	function getMarker() {
    		return marker;
    	}

    	$$self.$$set = $$props => {
    		if ('latLng' in $$props) $$invalidate(1, latLng = $$props.latLng);
    		if ('zIndexOffset' in $$props) $$invalidate(2, zIndexOffset = $$props.zIndexOffset);
    		if ('icon' in $$props) $$invalidate(3, icon = $$props.icon);
    		if ('opacity' in $$props) $$invalidate(4, opacity = $$props.opacity);
    		if ('options' in $$props) $$invalidate(5, options = $$props.options);
    		if ('events' in $$props) $$invalidate(6, events = $$props.events);
    		if ('rotationAngle' in $$props) $$invalidate(7, rotationAngle = $$props.rotationAngle);
    		if ('rotationOrigin' in $$props) $$invalidate(8, rotationOrigin = $$props.rotationOrigin);
    		if ('$$scope' in $$props) $$invalidate(10, $$scope = $$props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*marker, latLng, options, events, zIndexOffset, icon, opacity, rotationAngle, rotationOrigin*/ 511) {
    			{
    				if (!marker) {
    					$$invalidate(0, marker = L$1.marker(latLng, options).addTo(getMap()));
    					eventBridge = new EventBridge(marker, dispatch, events);
    				}

    				marker.setLatLng(latLng);
    				marker.setZIndexOffset(zIndexOffset);
    				marker.setIcon(icon);
    				marker.setOpacity(opacity);
    				marker.setRotationAngle(rotationAngle);
    				marker.setRotationOrigin(rotationOrigin);
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
    		rotationAngle,
    		rotationOrigin,
    		getMarker,
    		$$scope,
    		slots
    	];
    }

    class Marker extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$7, create_fragment$5, safe_not_equal, {
    			latLng: 1,
    			zIndexOffset: 2,
    			icon: 3,
    			opacity: 4,
    			options: 5,
    			events: 6,
    			rotationAngle: 7,
    			rotationOrigin: 8,
    			getMarker: 9
    		});
    	}

    	get getMarker() {
    		return this.$$.ctx[9];
    	}
    }

    /* src/components/Polyline.svelte generated by Svelte v3.52.0 */

    function create_if_block$2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4096)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[12],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[12])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[12], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function create_fragment$4(ctx) {
    	let div;
    	let current;
    	let if_block = /*polyline*/ ctx[0] && create_if_block$2(ctx);

    	return {
    		c() {
    			div = element("div");
    			if (if_block) if_block.c();
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (/*polyline*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*polyline*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
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
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block) if_block.d();
    		}
    	};
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	const { getMap } = getContext(L$1);
    	let { latLngs } = $$props;
    	let { color = '#3388ff' } = $$props;
    	let { weight = 3 } = $$props;
    	let { opacity = 1.0 } = $$props;
    	let { lineCap = 'round' } = $$props;
    	let { lineJoin = 'round' } = $$props;
    	let { dashArray = null } = $$props;
    	let { dashOffset = null } = $$props;
    	let { options = {} } = $$props;
    	let { events = [] } = $$props;
    	let polyline;
    	setContext(L$1.Layer, { getLayer: () => polyline });
    	const dispatch = createEventDispatcher();
    	let eventBridge;

    	onDestroy(() => {
    		eventBridge.unregister();
    		polyline.removeFrom(getMap());
    	});

    	function getPolyline() {
    		return polyline;
    	}

    	$$self.$$set = $$props => {
    		if ('latLngs' in $$props) $$invalidate(1, latLngs = $$props.latLngs);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('weight' in $$props) $$invalidate(3, weight = $$props.weight);
    		if ('opacity' in $$props) $$invalidate(4, opacity = $$props.opacity);
    		if ('lineCap' in $$props) $$invalidate(5, lineCap = $$props.lineCap);
    		if ('lineJoin' in $$props) $$invalidate(6, lineJoin = $$props.lineJoin);
    		if ('dashArray' in $$props) $$invalidate(7, dashArray = $$props.dashArray);
    		if ('dashOffset' in $$props) $$invalidate(8, dashOffset = $$props.dashOffset);
    		if ('options' in $$props) $$invalidate(9, options = $$props.options);
    		if ('events' in $$props) $$invalidate(10, events = $$props.events);
    		if ('$$scope' in $$props) $$invalidate(12, $$scope = $$props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*polyline, latLngs, options, events, color, weight, opacity, lineCap, lineJoin, dashArray, dashOffset*/ 2047) {
    			{
    				if (!polyline) {
    					$$invalidate(0, polyline = L$1.polyline(latLngs, options).addTo(getMap()));
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

    class Polyline extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$6, create_fragment$4, safe_not_equal, {
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

    /* src/components/Polygon.svelte generated by Svelte v3.52.0 */

    function create_if_block$1(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[17].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[16], null);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 65536)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[16],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[16])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[16], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function create_fragment$3(ctx) {
    	let div;
    	let current;
    	let if_block = /*polygon*/ ctx[0] && create_if_block$1(ctx);

    	return {
    		c() {
    			div = element("div");
    			if (if_block) if_block.c();
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (/*polygon*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*polygon*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
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
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block) if_block.d();
    		}
    	};
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	const { getMap } = getContext(L$1);
    	let { latLngs } = $$props;
    	let { color = '#3388ff' } = $$props;
    	let { weight = 3 } = $$props;
    	let { opacity = 1.0 } = $$props;
    	let { lineCap = 'round' } = $$props;
    	let { lineJoin = 'round' } = $$props;
    	let { dashArray = null } = $$props;
    	let { dashOffset = null } = $$props;
    	let { fill = true } = $$props;
    	let { fillColor = '#3388ff' } = $$props;
    	let { fillOpacity = 0.2 } = $$props;
    	let { fillRule = 'evenodd' } = $$props;
    	let { options = {} } = $$props;
    	let { events = [] } = $$props;
    	let polygon;
    	setContext(L$1.Layer, { getLayer: () => polygon });
    	const dispatch = createEventDispatcher();
    	let eventBridge;

    	onDestroy(() => {
    		eventBridge.unregister();
    		polygon.removeFrom(getMap());
    	});

    	function getPolygon() {
    		return polygon;
    	}

    	$$self.$$set = $$props => {
    		if ('latLngs' in $$props) $$invalidate(1, latLngs = $$props.latLngs);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('weight' in $$props) $$invalidate(3, weight = $$props.weight);
    		if ('opacity' in $$props) $$invalidate(4, opacity = $$props.opacity);
    		if ('lineCap' in $$props) $$invalidate(5, lineCap = $$props.lineCap);
    		if ('lineJoin' in $$props) $$invalidate(6, lineJoin = $$props.lineJoin);
    		if ('dashArray' in $$props) $$invalidate(7, dashArray = $$props.dashArray);
    		if ('dashOffset' in $$props) $$invalidate(8, dashOffset = $$props.dashOffset);
    		if ('fill' in $$props) $$invalidate(9, fill = $$props.fill);
    		if ('fillColor' in $$props) $$invalidate(10, fillColor = $$props.fillColor);
    		if ('fillOpacity' in $$props) $$invalidate(11, fillOpacity = $$props.fillOpacity);
    		if ('fillRule' in $$props) $$invalidate(12, fillRule = $$props.fillRule);
    		if ('options' in $$props) $$invalidate(13, options = $$props.options);
    		if ('events' in $$props) $$invalidate(14, events = $$props.events);
    		if ('$$scope' in $$props) $$invalidate(16, $$scope = $$props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*polygon, latLngs, options, events, color, weight, opacity, lineCap, lineJoin, dashArray, dashOffset, fill, fillColor, fillOpacity, fillRule*/ 32767) {
    			{
    				if (!polygon) {
    					$$invalidate(0, polygon = L$1.polygon(latLngs, options).addTo(getMap()));
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

    class Polygon extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$5, create_fragment$3, safe_not_equal, {
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

    /* src/components/Popup.svelte generated by Svelte v3.52.0 */

    function create_fragment$2(ctx) {
    	let div1;
    	let div0;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	return {
    		c() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			set_style(div1, "display", "none");
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			/*div0_binding*/ ctx[7](div0);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div1);
    			if (default_slot) default_slot.d(detaching);
    			/*div0_binding*/ ctx[7](null);
    		}
    	};
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	const { getLayer } = getContext(L$1.Layer);
    	let { events = [] } = $$props;
    	let { options = {} } = $$props;
    	let popup;
    	let element;
    	const dispatch = createEventDispatcher();
    	let eventBridge;

    	onDestroy(() => {
    		eventBridge.unregister();
    	});

    	function getPopup() {
    		return popup;
    	}

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('events' in $$props) $$invalidate(1, events = $$props.events);
    		if ('options' in $$props) $$invalidate(2, options = $$props.options);
    		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*popup, options, events, element*/ 23) {
    			{
    				if (!popup) {
    					$$invalidate(4, popup = L$1.popup(options));
    					eventBridge = new EventBridge(popup, dispatch, events);
    					getLayer().bindPopup(popup);
    				}

    				popup.setContent(element);
    			}
    		}
    	};

    	return [element, events, options, getPopup, popup, $$scope, slots, div0_binding];
    }

    class Popup extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$4, create_fragment$2, safe_not_equal, { events: 1, options: 2, getPopup: 3 });
    	}

    	get getPopup() {
    		return this.$$.ctx[3];
    	}
    }

    /* src/components/Rectangle.svelte generated by Svelte v3.52.0 */

    function create_if_block(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[17].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[16], null);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 65536)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[16],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[16])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[16], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function create_fragment$1(ctx) {
    	let div;
    	let current;
    	let if_block = /*rectangle*/ ctx[0] && create_if_block(ctx);

    	return {
    		c() {
    			div = element("div");
    			if (if_block) if_block.c();
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (/*rectangle*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*rectangle*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
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
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block) if_block.d();
    		}
    	};
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	const { getMap } = getContext(L$1);
    	let { latLngBounds } = $$props;
    	let { color = '#3388ff' } = $$props;
    	let { weight = 3 } = $$props;
    	let { opacity = 1.0 } = $$props;
    	let { lineCap = 'round' } = $$props;
    	let { lineJoin = 'round' } = $$props;
    	let { dashArray = null } = $$props;
    	let { dashOffset = null } = $$props;
    	let { fill = true } = $$props;
    	let { fillColor = '#3388ff' } = $$props;
    	let { fillOpacity = 0.2 } = $$props;
    	let { fillRule = 'evenodd' } = $$props;
    	let { options = {} } = $$props;
    	let { events = [] } = $$props;
    	let rectangle;
    	setContext(L$1.Layer, { getLayer: () => rectangle });
    	const dispatch = createEventDispatcher();
    	let eventBridge;

    	onDestroy(() => {
    		eventBridge.unregister();
    		rectangle.removeFrom(getMap());
    	});

    	function getRectangle() {
    		return rectangle;
    	}

    	$$self.$$set = $$props => {
    		if ('latLngBounds' in $$props) $$invalidate(1, latLngBounds = $$props.latLngBounds);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('weight' in $$props) $$invalidate(3, weight = $$props.weight);
    		if ('opacity' in $$props) $$invalidate(4, opacity = $$props.opacity);
    		if ('lineCap' in $$props) $$invalidate(5, lineCap = $$props.lineCap);
    		if ('lineJoin' in $$props) $$invalidate(6, lineJoin = $$props.lineJoin);
    		if ('dashArray' in $$props) $$invalidate(7, dashArray = $$props.dashArray);
    		if ('dashOffset' in $$props) $$invalidate(8, dashOffset = $$props.dashOffset);
    		if ('fill' in $$props) $$invalidate(9, fill = $$props.fill);
    		if ('fillColor' in $$props) $$invalidate(10, fillColor = $$props.fillColor);
    		if ('fillOpacity' in $$props) $$invalidate(11, fillOpacity = $$props.fillOpacity);
    		if ('fillRule' in $$props) $$invalidate(12, fillRule = $$props.fillRule);
    		if ('options' in $$props) $$invalidate(13, options = $$props.options);
    		if ('events' in $$props) $$invalidate(14, events = $$props.events);
    		if ('$$scope' in $$props) $$invalidate(16, $$scope = $$props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*rectangle, latLngBounds, options, events, color, weight, opacity, lineCap, lineJoin, dashArray, dashOffset, fill, fillColor, fillOpacity, fillRule*/ 32767) {
    			{
    				if (!rectangle) {
    					$$invalidate(0, rectangle = L$1.rectangle(latLngBounds, options).addTo(getMap()));
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

    class Rectangle extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$3, create_fragment$1, safe_not_equal, {
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

    /* src/components/ScaleControl.svelte generated by Svelte v3.52.0 */

    function instance$2($$self, $$props, $$invalidate) {
    	const { getMap } = getContext(L$1);
    	let { position = 'topright' } = $$props;
    	let { options = {} } = $$props;
    	let scaleControl;

    	onDestroy(() => {
    		scaleControl.remove();
    	});

    	function getScaleControl() {
    		return scaleControl;
    	}

    	$$self.$$set = $$props => {
    		if ('position' in $$props) $$invalidate(0, position = $$props.position);
    		if ('options' in $$props) $$invalidate(1, options = $$props.options);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*scaleControl, options, position*/ 11) {
    			{
    				if (!scaleControl) {
    					$$invalidate(3, scaleControl = L$1.control.scale(options).addTo(getMap()));
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

    		init(this, options, instance$2, null, safe_not_equal, {
    			position: 0,
    			options: 1,
    			getScaleControl: 2
    		});
    	}

    	get getScaleControl() {
    		return this.$$.ctx[2];
    	}
    }

    /* src/components/TileLayer.svelte generated by Svelte v3.52.0 */

    function instance$1($$self, $$props, $$invalidate) {
    	const { getMap } = getContext(L$1);
    	let { url } = $$props;
    	let { wms = false } = $$props;
    	let { opacity = 1.0 } = $$props;
    	let { zIndex = 1 } = $$props;
    	let { options = {} } = $$props;
    	let { events = [] } = $$props;
    	let tileLayer;
    	const dispatch = createEventDispatcher();
    	let eventBridge;

    	onDestroy(() => {
    		eventBridge.unregister();
    		tileLayer.removeFrom(getMap());
    	});

    	function getTileLayer() {
    		return tileLayer;
    	}

    	$$self.$$set = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    		if ('wms' in $$props) $$invalidate(1, wms = $$props.wms);
    		if ('opacity' in $$props) $$invalidate(2, opacity = $$props.opacity);
    		if ('zIndex' in $$props) $$invalidate(3, zIndex = $$props.zIndex);
    		if ('options' in $$props) $$invalidate(4, options = $$props.options);
    		if ('events' in $$props) $$invalidate(5, events = $$props.events);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*tileLayer, wms, url, options, events, opacity, zIndex*/ 191) {
    			{
    				if (!tileLayer) {
    					$$invalidate(7, tileLayer = (!wms
    					? L$1.tileLayer(url, options)
    					: L$1.tileLayer.wms(url, options)).addTo(getMap()));

    					eventBridge = new EventBridge(tileLayer, dispatch, events);
    				}

    				tileLayer.setUrl(url);
    				tileLayer.setOpacity(opacity);
    				tileLayer.setZIndex(zIndex);
    			}
    		}
    	};

    	return [url, wms, opacity, zIndex, options, events, getTileLayer, tileLayer];
    }

    class TileLayer extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$1, null, safe_not_equal, {
    			url: 0,
    			wms: 1,
    			opacity: 2,
    			zIndex: 3,
    			options: 4,
    			events: 5,
    			getTileLayer: 6
    		});
    	}

    	get getTileLayer() {
    		return this.$$.ctx[6];
    	}
    }

    /* src/components/Tooltip.svelte generated by Svelte v3.52.0 */

    function create_fragment(ctx) {
    	let div1;
    	let div0;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	return {
    		c() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			set_style(div1, "display", "none");
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			/*div0_binding*/ ctx[7](div0);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div1);
    			if (default_slot) default_slot.d(detaching);
    			/*div0_binding*/ ctx[7](null);
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	const { getLayer } = getContext(L$1.Layer);
    	let { events = [] } = $$props;
    	let { options = {} } = $$props;
    	let tooltip;
    	let element;
    	const dispatch = createEventDispatcher();
    	let eventBridge;

    	onDestroy(() => {
    		eventBridge.unregister();
    	});

    	function getTooltip() {
    		return tooltip;
    	}

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('events' in $$props) $$invalidate(1, events = $$props.events);
    		if ('options' in $$props) $$invalidate(2, options = $$props.options);
    		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*tooltip, options, events, element*/ 23) {
    			{
    				if (!tooltip) {
    					$$invalidate(4, tooltip = L$1.tooltip(options));
    					eventBridge = new EventBridge(tooltip, dispatch, events);
    					getLayer().bindTooltip(tooltip);
    				}

    				tooltip.setContent(element);
    			}
    		}
    	};

    	return [element, events, options, getTooltip, tooltip, $$scope, slots, div0_binding];
    }

    class Tooltip extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance, create_fragment, safe_not_equal, { events: 1, options: 2, getTooltip: 3 });
    	}

    	get getTooltip() {
    		return this.$$.ctx[3];
    	}
    }

    const LeafletRotatedMarkersExtension = {
        install: () => {
            // save these original methods before they are overwritten
            const proto_initIcon = L$1.Marker.prototype._initIcon;
            const proto_setPos = L$1.Marker.prototype._setPos;

            const oldIE = (L$1.DomUtil.TRANSFORM === 'msTransform');

            L$1.Marker.addInitHook(function () {
                const iconOptions = this.options.icon && this.options.icon.options;
                let iconAnchor = iconOptions && this.options.icon.options.iconAnchor;
                if (iconAnchor) {
                    iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
                }
                this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom';
                this.options.rotationAngle = this.options.rotationAngle || 0;

                // Ensure marker keeps rotated during dragging
                this.on('drag', function (e) {
                    e.target._applyRotation();
                });
            });

            L$1.Marker.include({
                _initIcon: function () {
                    proto_initIcon.call(this);
                },

                _setPos: function (pos) {
                    proto_setPos.call(this, pos);
                    this._applyRotation();
                },

                _applyRotation: function () {
                    if (this.options.rotationAngle) {
                        this._icon.style[L$1.DomUtil.TRANSFORM + 'Origin'] = this.options.rotationOrigin;

                        if (oldIE) {
                            // for IE 9, use the 2D rotation
                            this._icon.style[L$1.DomUtil.TRANSFORM] = 'rotate(' + this.options.rotationAngle + 'deg)';
                        } else {
                            // for modern browsers, prefer the 3D accelerated version
                            this._icon.style[L$1.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
                        }
                    }
                },

                setRotationAngle: function (angle) {
                    this.options.rotationAngle = angle;
                    this.update();
                    return this;
                },

                setRotationOrigin: function (origin) {
                    this.options.rotationOrigin = origin;
                    this.update();
                    return this;
                }
            });
        }
    };

    LeafletRotatedMarkersExtension.install();

    exports.Circle = Circle;
    exports.CircleMarker = CircleMarker;
    exports.DivIcon = DivIcon;
    exports.GeoJSON = GeoJSON;
    exports.Icon = Icon;
    exports.ImageOverlay = ImageOverlay;
    exports.LeafletMap = LeafletMap;
    exports.Marker = Marker;
    exports.Polygon = Polygon;
    exports.Polyline = Polyline;
    exports.Popup = Popup;
    exports.Rectangle = Rectangle;
    exports.ScaleControl = ScaleControl;
    exports.TileLayer = TileLayer;
    exports.Tooltip = Tooltip;
    exports["default"] = LeafletMap;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
