/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Vue = __webpack_require__(1);


	new Vue({
	    el: '#example1',
	    data: {
	        checkedNames: []
	    }
	})

	new Vue({
	    el: '#example11',
	    data: {
	        checkboxs: [
	            { text: 'Mike!!', value: 'mike' },
	            { text: 'john!', value: 'john' },
	            { text: 'j!ack', value: 'jack' }
	        ],
	        checkedNames: ['mike']
	    }
	})




	new Vue({
	    el: '#example2',
	    data: {
	        picked: ''
	    }
	})

	new Vue({
	    el: '#example3',
	    data: {
	        selected: 'A',
	        options: [
	            { text: 'One', value: 'A' },
	            { text: 'Two', value: 'B' },
	            { text: 'Three', value: 'C' }
	        ]
	    }
	})


	var vm5 = new Vue({
	    el: '#example5',
	    data: {
	        msg: ''
	    }
	})
	vm5.$watch('msg', function(newVal, oldVal) {
	    console.log(newVal, oldVal);
	    vm5.msg = newVal;
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var extend = _.extend

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefiexed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue (options) {
	  this._init(options)
	}

	/**
	 * Mixin global API
	 */

	extend(Vue, __webpack_require__(15))

	/**
	 * Vue and every constructor that extends Vue has an
	 * associated options object, which can be accessed during
	 * compilation steps as `this.constructor.options`.
	 *
	 * These can be seen as the default options of every
	 * Vue instance.
	 */

	Vue.options = {
	  replace: true,
	  directives: __webpack_require__(18),
	  elementDirectives: __webpack_require__(53),
	  filters: __webpack_require__(56),
	  transitions: {},
	  components: {},
	  partials: {}
	}

	/**
	 * Build up the prototype
	 */

	var p = Vue.prototype

	/**
	 * $data has a setter which does a bunch of
	 * teardown/setup work
	 */

	Object.defineProperty(p, '$data', {
	  get: function () {
	    return this._data
	  },
	  set: function (newData) {
	    if (newData !== this._data) {
	      this._setData(newData)
	    }
	  }
	})

	/**
	 * Mixin internal instance methods
	 */

	extend(p, __webpack_require__(58))
	extend(p, __webpack_require__(59))
	extend(p, __webpack_require__(60))
	extend(p, __webpack_require__(63))
	extend(p, __webpack_require__(65))

	/**
	 * Mixin public API methods
	 */

	extend(p, __webpack_require__(66))
	extend(p, __webpack_require__(67))
	extend(p, __webpack_require__(68))
	extend(p, __webpack_require__(69))

	Vue.version = '1.0.0-csp'
	module.exports = _.Vue = Vue

	/* istanbul ignore if */
	if (process.env.NODE_ENV !== 'production') {
	  if (_.inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', Vue)
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var lang = __webpack_require__(4)
	var extend = lang.extend

	extend(exports, lang)
	extend(exports, __webpack_require__(5))
	extend(exports, __webpack_require__(6))
	extend(exports, __webpack_require__(12))
	extend(exports, __webpack_require__(13))
	extend(exports, __webpack_require__(14))


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */

	exports.set = function set (obj, key, val) {
	  if (obj.hasOwnProperty(key)) {
	    obj[key] = val
	    return
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val)
	    return
	  }
	  var ob = obj.__ob__
	  if (!ob) {
	    obj[key] = val
	    return
	  }
	  ob.convert(key, val)
	  ob.notify()
	  if (ob.vms) {
	    var i = ob.vms.length
	    while (i--) {
	      var vm = ob.vms[i]
	      vm._proxy(key)
	      vm._digest()
	    }
	  }
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	exports.delete = function (obj, key) {
	  if (!obj.hasOwnProperty(key)) {
	    return
	  }
	  delete obj[key]
	  var ob = obj.__ob__
	  if (!ob) {
	    return
	  }
	  ob.notify()
	  if (ob.vms) {
	    var i = ob.vms.length
	    while (i--) {
	      var vm = ob.vms[i]
	      vm._unproxy(key)
	      vm._digest()
	    }
	  }
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|[\d\.]+|'[^']*'|"[^"]*")\s?$/
	exports.isLiteral = function (exp) {
	  return literalValueRE.test(exp)
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	exports.isReserved = function (str) {
	  var c = (str + '').charCodeAt(0)
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	exports.toString = function (value) {
	  return value == null
	    ? ''
	    : value.toString()
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	exports.toNumber = function (value) {
	  if (typeof value !== 'string') {
	    return value
	  } else {
	    var parsed = Number(value)
	    return isNaN(parsed)
	      ? value
	      : parsed
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	exports.toBoolean = function (value) {
	  return value === 'true'
	    ? true
	    : value === 'false'
	      ? false
	      : value
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	exports.stripQuotes = function (str) {
	  var a = str.charCodeAt(0)
	  var b = str.charCodeAt(str.length - 1)
	  return a === b && (a === 0x22 || a === 0x27)
	    ? str.slice(1, -1)
	    : str
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	exports.camelize = function (str) {
	  return str.replace(/-(\w)/g, toUpper)
	}

	function toUpper (_, c) {
	  return c ? c.toUpperCase() : ''
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	exports.hyphenate = function (str) {
	  return str
	    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
	    .toLowerCase()
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g
	exports.classify = function (str) {
	  return str.replace(classifyRE, toUpper)
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	exports.bind = function (fn, ctx) {
	  return function (a) {
	    var l = arguments.length
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	exports.toArray = function (list, start) {
	  start = start || 0
	  var i = list.length - start
	  var ret = new Array(i)
	  while (i--) {
	    ret[i] = list[i + start]
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	exports.extend = function (to, from) {
	  var keys = Object.keys(from)
	  var i = keys.length
	  while (i--) {
	    to[keys[i]] = from[keys[i]]
	  }
	  return to
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	exports.isObject = function (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString
	var OBJECT_STRING = '[object Object]'
	exports.isPlainObject = function (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	exports.isArray = Array.isArray

	/**
	 * Define a non-enumerable property
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	exports.define = function (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  })
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	exports.debounce = function (func, wait) {
	  var timeout, args, context, timestamp, result
	  var later = function () {
	    var last = Date.now() - timestamp
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last)
	    } else {
	      timeout = null
	      result = func.apply(context, args)
	      if (!timeout) context = args = null
	    }
	  }
	  return function () {
	    context = this
	    args = arguments
	    timestamp = Date.now()
	    if (!timeout) {
	      timeout = setTimeout(later, wait)
	    }
	    return result
	  }
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	exports.indexOf = function (arr, obj) {
	  var i = arr.length
	  while (i--) {
	    if (arr[i] === obj) return i
	  }
	  return -1
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	exports.cancellable = function (fn) {
	  var cb = function () {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments)
	    }
	  }
	  cb.cancel = function () {
	    cb.cancelled = true
	  }
	  return cb
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	exports.looseEqual = function (a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (
	    exports.isObject(a) && exports.isObject(b)
	      ? JSON.stringify(a) === JSON.stringify(b)
	      : false
	  )
	  /* eslint-enable eqeqeq */
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	// can we use __proto__?
	exports.hasProto = '__proto__' in {}

	// Browser environment sniffing
	var inBrowser = exports.inBrowser =
	  typeof window !== 'undefined' &&
	  Object.prototype.toString.call(window) !== '[object Object]'

	exports.isIE9 =
	  inBrowser &&
	  navigator.userAgent.toLowerCase().indexOf('msie 9.0') > 0

	exports.isAndroid =
	  inBrowser &&
	  navigator.userAgent.toLowerCase().indexOf('android') > 0

	// Transition property/event sniffing
	if (inBrowser && !exports.isIE9) {
	  var isWebkitTrans =
	    window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined
	  var isWebkitAnim =
	    window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined
	  exports.transitionProp = isWebkitTrans
	    ? 'WebkitTransition'
	    : 'transition'
	  exports.transitionEndEvent = isWebkitTrans
	    ? 'webkitTransitionEnd'
	    : 'transitionend'
	  exports.animationProp = isWebkitAnim
	    ? 'WebkitAnimation'
	    : 'animation'
	  exports.animationEndEvent = isWebkitAnim
	    ? 'webkitAnimationEnd'
	    : 'animationend'
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	exports.nextTick = (function () {
	  var callbacks = []
	  var pending = false
	  var timerFunc
	  function nextTickHandler () {
	    pending = false
	    var copies = callbacks.slice(0)
	    callbacks = []
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]()
	    }
	  }
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1
	    var observer = new MutationObserver(nextTickHandler)
	    var textNode = document.createTextNode(counter)
	    observer.observe(textNode, {
	      characterData: true
	    })
	    timerFunc = function () {
	      counter = (counter + 1) % 2
	      textNode.data = counter
	    }
	  } else {
	    timerFunc = setTimeout
	  }
	  return function (cb, ctx) {
	    var func = ctx
	      ? function () { cb.call(ctx) }
	      : cb
	    callbacks.push(func)
	    if (pending) return
	    pending = true
	    timerFunc(nextTickHandler, 0)
	  }
	})()


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var config = __webpack_require__(7)
	var transition = __webpack_require__(11)

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	exports.query = function (el) {
	  if (typeof el === 'string') {
	    var selector = el
	    el = document.querySelector(el)
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Cannot find element: ' + selector
	      )
	    }
	  }
	  return el
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed byy doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	exports.inDoc = function (node) {
	  var doc = document.documentElement
	  var parent = node && node.parentNode
	  return doc === node ||
	    doc === parent ||
	    !!(parent && parent.nodeType === 1 && (doc.contains(parent)))
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} attr
	 */

	exports.attr = function (node, attr) {
	  var val = node.getAttribute(attr)
	  if (val !== null) {
	    node.removeAttribute(attr)
	  }
	  return val
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	exports.getBindAttr = function (node, name) {
	  var val = exports.attr(node, ':' + name)
	  if (val === null) {
	    val = exports.attr(node, 'v-bind:' + name)
	  }
	  return val
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	exports.before = function (el, target) {
	  target.parentNode.insertBefore(el, target)
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	exports.after = function (el, target) {
	  if (target.nextSibling) {
	    exports.before(el, target.nextSibling)
	  } else {
	    target.parentNode.appendChild(el)
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	exports.remove = function (el) {
	  el.parentNode.removeChild(el)
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	exports.prepend = function (el, target) {
	  if (target.firstChild) {
	    exports.before(el, target.firstChild)
	  } else {
	    target.appendChild(el)
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	exports.replace = function (target, el) {
	  var parent = target.parentNode
	  if (parent) {
	    parent.replaceChild(el, target)
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	exports.on = function (el, event, cb) {
	  el.addEventListener(event, cb)
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	exports.off = function (el, event, cb) {
	  el.removeEventListener(event, cb)
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	exports.addClass = function (el, cls) {
	  if (el.classList) {
	    el.classList.add(cls)
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' '
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim())
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	exports.removeClass = function (el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls)
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' '
	    var tar = ' ' + cls + ' '
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ')
	    }
	    el.setAttribute('class', cur.trim())
	  }
	  if (!el.className) {
	    el.removeAttribute('class')
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element}
	 */

	exports.extractContent = function (el, asFragment) {
	  var child
	  var rawContent
	  /* istanbul ignore if */
	  if (
	    exports.isTemplate(el) &&
	    el.content instanceof DocumentFragment
	  ) {
	    el = el.content
	  }
	  if (el.hasChildNodes()) {
	    exports.trimNode(el)
	    rawContent = asFragment
	      ? document.createDocumentFragment()
	      : document.createElement('div')
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	    /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child)
	    }
	  }
	  return rawContent
	}

	/**
	 * Trim possible empty head/tail textNodes inside a parent.
	 *
	 * @param {Node} node
	 */

	exports.trimNode = function (node) {
	  trim(node, node.firstChild)
	  trim(node, node.lastChild)
	}

	function trim (parent, node) {
	  if (node && node.nodeType === 3 && !node.data.trim()) {
	    parent.removeChild(node)
	  }
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	exports.isTemplate = function (el) {
	  return el.tagName &&
	    el.tagName.toLowerCase() === 'template'
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	exports.createAnchor = function (content, persist) {
	  return config.debug
	    ? document.createComment(content)
	    : document.createTextNode(persist ? ' ' : '')
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/
	exports.findRef = function (node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name
	      if (refRE.test(name)) {
	        node.removeAttribute(name)
	        return _.camelize(name.replace(refRE, ''))
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	exports.mapNodeRange = function (node, end, op) {
	  var next
	  while (node !== end) {
	    next = node.nextSibling
	    op(node)
	    node = next
	  }
	  op(end)
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	exports.removeNodeRange = function (start, end, vm, frag, cb) {
	  var done = false
	  var removed = 0
	  var nodes = []
	  exports.mapNodeRange(start, end, function (node) {
	    if (node === end) done = true
	    nodes.push(node)
	    transition.remove(node, vm, onRemoved)
	  })
	  function onRemoved () {
	    removed++
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i])
	      }
	      cb && cb()
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: [
	    'component',
	    'directive',
	    'elementDirective',
	    'filter',
	    'transition',
	    'partial'
	  ],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}

	/**
	 * Interpolation delimiters. Changing these would trigger
	 * the text parser to re-compile the regular expressions.
	 *
	 * @type {Array<String>}
	 */

	var delimiters = ['{{', '}}']
	var unsafeDelimiters = ['{{{', '}}}']
	var textParser = __webpack_require__(8)

	Object.defineProperty(module.exports, 'delimiters', {
	  get: function () {
	    return delimiters
	  },
	  set: function (val) {
	    delimiters = val
	    textParser.compileRegex()
	  }
	})

	Object.defineProperty(module.exports, 'unsafeDelimiters', {
	  get: function () {
	    return unsafeDelimiters
	  },
	  set: function (val) {
	    unsafeDelimiters = val
	    textParser.compileRegex()
	  }
	})


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(9)
	var config = __webpack_require__(7)
	var dirParser = __webpack_require__(10)
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g
	var cache, tagRE, htmlRE

	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex (str) {
	  return str.replace(regexEscapeRE, '\\$&')
	}

	exports.compileRegex = function () {
	  var open = escapeRegex(config.delimiters[0])
	  var close = escapeRegex(config.delimiters[1])
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0])
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1])
	  tagRE = new RegExp(
	    unsafeOpen + '(.+?)' + unsafeClose + '|' +
	    open + '(.+?)' + close,
	    'g'
	  )
	  htmlRE = new RegExp(
	    '^' + unsafeOpen + '.*' + unsafeClose + '$'
	  )
	  // reset cache
	  cache = new Cache(1000)
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	exports.parse = function (text) {
	  if (!cache) {
	    exports.compileRegex()
	  }
	  var hit = cache.get(text)
	  if (hit) {
	    return hit
	  }
	  text = text.replace(/\n/g, '')
	  if (!tagRE.test(text)) {
	    return null
	  }
	  var tokens = []
	  var lastIndex = tagRE.lastIndex = 0
	  var match, index, html, value, first, oneTime
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	  /* eslint-enable no-cond-assign */
	    index = match.index
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      })
	    }
	    // tag token
	    html = htmlRE.test(match[0])
	    value = html ? match[1] : match[2]
	    first = value.charCodeAt(0)
	    oneTime = first === 42 // *
	    value = oneTime
	      ? value.slice(1)
	      : value
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    })
	    lastIndex = index + match[0].length
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    })
	  }
	  cache.put(text, tokens)
	  return tokens
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @return {String}
	 */

	exports.tokensToExp = function (tokens) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token)
	    }).join('+')
	  } else {
	    return formatToken(tokens[0], true)
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Boolean} single
	 * @return {String}
	 */

	function formatToken (token, single) {
	  return token.tag
	    ? inlineFilters(token.value, single)
	    : '"' + token.value + '"'
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/
	function inlineFilters (exp, single) {
	  if (!filterRE.test(exp)) {
	    return single
	      ? exp
	      : '(' + exp + ')'
	  } else {
	    var dir = dirParser.parse(exp)
	    if (!dir.filters) {
	      return '(' + exp + ')'
	    } else {
	      return 'this._applyFilters(' +
	        dir.expression + // value
	        ',null,' +       // oldValue (null for read)
	        JSON.stringify(dir.filters) + // filter descriptors
	        ',false)'        // write?
	    }
	  }
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * A doubly linked list-based Least Recently Used (LRU)
	 * cache. Will keep most recently used items while
	 * discarding least recently used items when its limit is
	 * reached. This is a bare-bone version of
	 * Rasmus Andersson's js-lru:
	 *
	 *   https://github.com/rsms/js-lru
	 *
	 * @param {Number} limit
	 * @constructor
	 */

	function Cache (limit) {
	  this.size = 0
	  this.limit = limit
	  this.head = this.tail = undefined
	  this._keymap = Object.create(null)
	}

	var p = Cache.prototype

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var entry = {
	    key: key,
	    value: value
	  }
	  this._keymap[key] = entry
	  if (this.tail) {
	    this.tail.newer = entry
	    entry.older = this.tail
	  } else {
	    this.head = entry
	  }
	  this.tail = entry
	  if (this.size === this.limit) {
	    return this.shift()
	  } else {
	    this.size++
	  }
	}

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head
	  if (entry) {
	    this.head = this.head.newer
	    this.head.older = undefined
	    entry.newer = entry.older = undefined
	    this._keymap[entry.key] = undefined
	  }
	  return entry
	}

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key]
	  if (entry === undefined) return
	  if (entry === this.tail) {
	    return returnEntry
	      ? entry
	      : entry.value
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer
	    }
	    entry.newer.older = entry.older // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer // C. --> E
	  }
	  entry.newer = undefined // D --x
	  entry.older = this.tail // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry // E. <-- D
	  }
	  this.tail = entry
	  return returnEntry
	    ? entry
	    : entry.value
	}

	module.exports = Cache


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var Cache = __webpack_require__(9)
	var cache = new Cache(1000)
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g
	var reservedArgRE = /^in$|^-?\d+/

	/**
	 * Parser state
	 */

	var str, dir
	var c, i, l, lastFilterIndex
	var inSingle, inDouble, curly, square, paren

	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter () {
	  var exp = str.slice(lastFilterIndex, i).trim()
	  var filter
	  if (exp) {
	    filter = {}
	    var tokens = exp.match(filterTokenRE)
	    filter.name = tokens[0]
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg)
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter)
	  }
	  lastFilterIndex = i + 1
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg (arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: arg,
	      dynamic: false
	    }
	  } else {
	    var stripped = _.stripQuotes(arg)
	    var dynamic = stripped === arg
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    }
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Object}
	 */

	exports.parse = function (s) {

	  var hit = cache.get(s)
	  if (hit) {
	    return hit
	  }

	  // reset parser state
	  str = s
	  inSingle = inDouble = false
	  curly = square = paren = 0
	  lastFilterIndex = 0
	  dir = {}

	  for (i = 0, l = str.length; i < l; i++) {
	    c = str.charCodeAt(i)
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27) inSingle = !inSingle
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22) inDouble = !inDouble
	    } else if (
	      c === 0x7C && // pipe
	      str.charCodeAt(i + 1) !== 0x7C &&
	      str.charCodeAt(i - 1) !== 0x7C
	    ) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1
	        dir.expression = str.slice(0, i).trim()
	      } else {
	        // already has filter
	        pushFilter()
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break // "
	        case 0x27: inSingle = true; break // '
	        case 0x28: paren++; break         // (
	        case 0x29: paren--; break         // )
	        case 0x5B: square++; break        // [
	        case 0x5D: square--; break        // ]
	        case 0x7B: curly++; break         // {
	        case 0x7D: curly--; break         // }
	      }
	    }
	  }

	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim()
	  } else if (lastFilterIndex !== 0) {
	    pushFilter()
	  }

	  cache.put(s, dir)
	  return dir
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.append = function (el, target, vm, cb) {
	  apply(el, 1, function () {
	    target.appendChild(el)
	  }, vm, cb)
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.before = function (el, target, vm, cb) {
	  apply(el, 1, function () {
	    _.before(el, target)
	  }, vm, cb)
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.remove = function (el, vm, cb) {
	  apply(el, -1, function () {
	    _.remove(el)
	  }, vm, cb)
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	var apply = exports.apply = function (el, direction, op, vm, cb) {
	  var transition = el.__v_trans
	  if (
	    !transition ||
	    // skip if there are no js hooks and CSS transition is
	    // not supported
	    (!transition.hooks && !_.transitionEndEvent) ||
	    // skip transitions for initial compile
	    !vm._isCompiled ||
	    // if the vm is being manipulated by a parent directive
	    // during the parent's compilation phase, skip the
	    // animation.
	    (vm.$parent && !vm.$parent._isCompiled)
	  ) {
	    op()
	    if (cb) cb()
	    return
	  }
	  var action = direction > 0 ? 'enter' : 'leave'
	  transition[action](op, cb)
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var config = __webpack_require__(7)
	var extend = _.extend

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null)

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData (to, from) {
	  var key, toVal, fromVal
	  for (key in from) {
	    toVal = to[key]
	    fromVal = from[key]
	    if (!to.hasOwnProperty(key)) {
	      _.set(to, key, fromVal)
	    } else if (_.isObject(toVal) && _.isObject(fromVal)) {
	      mergeData(toVal, fromVal)
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.'
	      )
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	}

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'The "el" option should be a function ' +
	      'that returns a per-instance value in component ' +
	      'definitions.'
	    )
	    return
	  }
	  var ret = childVal || parentVal
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function'
	    ? ret.call(vm)
	    : ret
	}

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init =
	strats.created =
	strats.ready =
	strats.attached =
	strats.detached =
	strats.beforeCompile =
	strats.compiled =
	strats.beforeDestroy =
	strats.destroyed = function (parentVal, childVal) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : _.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	/**
	 * 0.11 deprecation warning
	 */

	strats.paramAttributes = function () {
	  /* istanbul ignore next */
	  process.env.NODE_ENV !== 'production' && _.warn(
	    '"paramAttributes" option has been deprecated in 0.12. ' +
	    'Use "props" instead.'
	  )
	}

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal)
	  return childVal
	    ? extend(res, guardArrayAssets(childVal))
	    : res
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets
	})

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch =
	strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal
	  if (!parentVal) return childVal
	  var ret = {}
	  extend(ret, parentVal)
	  for (var key in childVal) {
	    var parent = ret[key]
	    var child = childVal[key]
	    if (parent && !_.isArray(parent)) {
	      parent = [parent]
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child]
	  }
	  return ret
	}

	/**
	 * Other object hashes.
	 */

	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal
	  if (!parentVal) return childVal
	  var ret = Object.create(null)
	  extend(ret, parentVal)
	  extend(ret, childVal)
	  return ret
	}

	/**
	 * Default strategy.
	 */

	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	}

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents (options) {
	  if (options.components) {
	    var components = options.components =
	      guardArrayAssets(options.components)
	    var def
	    var ids = Object.keys(components)
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i]
	      if (_.commonTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Do not use built-in HTML elements as component ' +
	          'id: ' + key
	        )
	        continue
	      }
	      def = components[key]
	      if (_.isPlainObject(def)) {
	        components[key] = _.Vue.extend(def)
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps (options) {
	  var props = options.props
	  var i
	  if (_.isArray(props)) {
	    options.props = {}
	    i = props.length
	    while (i--) {
	      options.props[props[i]] = null
	    }
	  } else if (_.isPlainObject(props)) {
	    var keys = Object.keys(props)
	    i = keys.length
	    while (i--) {
	      var val = props[keys[i]]
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val }
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets (assets) {
	  if (_.isArray(assets)) {
	    var res = {}
	    var i = assets.length
	    var asset
	    while (i--) {
	      asset = assets[i]
	      var id = asset.name || (asset.options && asset.options.name)
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Array-syntax assets must provide a "name" field.'
	        )
	      } else {
	        res[id] = asset
	      }
	    }
	    return res
	  }
	  return assets
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	exports.mergeOptions = function merge (parent, child, vm) {
	  guardComponents(child)
	  guardProps(child)
	  var options = {}
	  var key
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = merge(parent, child.mixins[i], vm)
	    }
	  }
	  for (key in parent) {
	    mergeField(key)
	  }
	  for (key in child) {
	    if (!(parent.hasOwnProperty(key))) {
	      mergeField(key)
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat
	    options[key] = strat(parent[key], child[key], vm, key)
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @return {Object|Function}
	 */

	exports.resolveAsset = function resolve (options, type, id) {
	  var assets = options[type]
	  var camelizedId
	  return assets[id] ||
	    // camelCase ID
	    assets[camelizedId = _.camelize(id)] ||
	    // Pascal Case ID
	    assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)]
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	exports.commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/
	exports.checkComponent = function (el, options) {
	  var tag = el.tagName.toLowerCase()
	  var hasAttrs = el.hasAttributes()
	  if (!exports.commonTagRE.test(tag) && tag !== 'component') {
	    if (_.resolveAsset(options, 'components', tag)) {
	      return { id: tag }
	    } else {
	      var is = hasAttrs && getIsBinding(el)
	      if (is) {
	        return is
	      } else if (process.env.NODE_ENV !== 'production') {
	        if (
	          tag.indexOf('-') > -1 ||
	          (
	            /HTMLUnknownElement/.test(el.toString()) &&
	            // Chrome returns unknown for several HTML5 elements.
	            // https://code.google.com/p/chromium/issues/detail?id=540526
	            !/^(data|time|rtc|rb)$/.test(tag)
	          )
	        ) {
	          _.warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly?'
	          )
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el)
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @return {Object|undefined}
	 */

	function getIsBinding (el) {
	  // dynamic syntax
	  var exp = _.attr(el, 'is')
	  if (exp != null) {
	    return { id: exp }
	  } else {
	    exp = _.getBindAttr(el, 'is')
	    if (exp != null) {
	      return { id: exp, dynamic: true }
	    }
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	exports.initProp = function (vm, prop, value) {
	  if (exports.assertProp(prop, value)) {
	    var key = prop.path
	    vm[key] = vm._data[key] = value
	  }
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 */

	exports.assertProp = function (prop, value) {
	  // if a prop is not provided and is not required,
	  // skip the check.
	  if (prop.raw === null && !prop.required) {
	    return true
	  }
	  var options = prop.options
	  var type = options.type
	  var valid = true
	  var expectedType
	  if (type) {
	    if (type === String) {
	      expectedType = 'string'
	      valid = typeof value === expectedType
	    } else if (type === Number) {
	      expectedType = 'number'
	      valid = typeof value === 'number'
	    } else if (type === Boolean) {
	      expectedType = 'boolean'
	      valid = typeof value === 'boolean'
	    } else if (type === Function) {
	      expectedType = 'function'
	      valid = typeof value === 'function'
	    } else if (type === Object) {
	      expectedType = 'object'
	      valid = _.isPlainObject(value)
	    } else if (type === Array) {
	      expectedType = 'array'
	      valid = _.isArray(value)
	    } else {
	      valid = value instanceof type
	    }
	  }
	  if (!valid) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid prop: type check failed for ' +
	      prop.path + '="' + prop.raw + '".' +
	      ' Expected ' + formatType(expectedType) +
	      ', got ' + formatValue(value) + '.'
	    )
	    return false
	  }
	  var validator = options.validator
	  if (validator) {
	    if (!validator.call(null, value)) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Invalid prop: custom validator check failed for ' +
	        prop.path + '="' + prop.raw + '"'
	      )
	      return false
	    }
	  }
	  return true
	}

	function formatType (val) {
	  return val
	    ? val.charAt(0).toUpperCase() + val.slice(1)
	    : 'custom type'
	}

	function formatValue (val) {
	  return Object.prototype.toString.call(val).slice(8, -1)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Enable debug utilities.
	 */

	if (process.env.NODE_ENV !== 'production') {

	  var config = __webpack_require__(7)
	  var hasConsole = typeof console !== 'undefined'

	  /**
	   * Log a message.
	   *
	   * @param {String} msg
	   */

	  exports.log = function (msg) {
	    if (hasConsole && config.debug) {
	      console.log('[Vue info]: ' + msg)
	    }
	  }

	  /**
	   * We've got a problem here.
	   *
	   * @param {String} msg
	   */

	  exports.warn = function (msg, e) {
	    if (hasConsole && (!config.silent || config.debug)) {
	      console.warn('[Vue warn]: ' + msg)
	      /* istanbul ignore if */
	      if (config.debug) {
	        console.warn((e || new Error('Warning Stack Trace')).stack)
	      }
	    }
	  }

	  /**
	   * Assert asset exists
	   */

	  exports.assertAsset = function (val, type, id) {
	    if (!val) {
	      exports.warn('Failed to resolve ' + type + ': ' + id)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var config = __webpack_require__(7)

	/**
	 * Expose useful internals
	 */

	exports.util = _
	exports.config = config
	exports.set = _.set
	exports.delete = _.delete
	exports.nextTick = _.nextTick

	/**
	 * The following are exposed for advanced usage / plugins
	 */

	exports.compiler = __webpack_require__(16)
	exports.FragmentFactory = __webpack_require__(23)
	exports.internalDirectives = __webpack_require__(37)
	exports.parsers = {
	  path: __webpack_require__(45),
	  text: __webpack_require__(8),
	  template: __webpack_require__(21),
	  directive: __webpack_require__(10),
	  expression: __webpack_require__(44)
	}

	/**
	 * Each instance constructor, including Vue, has a unique
	 * cid. This enables us to create wrapped "child
	 * constructors" for prototypal inheritance and cache them.
	 */

	exports.cid = 0
	var cid = 1

	/**
	 * Class inheritance
	 *
	 * @param {Object} extendOptions
	 */

	exports.extend = function (extendOptions) {
	  extendOptions = extendOptions || {}
	  var Super = this
	  var isFirstExtend = Super.cid === 0
	  if (isFirstExtend && extendOptions._Ctor) {
	    return extendOptions._Ctor
	  }
	  var name = extendOptions.name || Super.options.name
	  var Sub = function VueComponent (options) {
	    _.Vue.call(this, options)
	  }
	  Sub.prototype = Object.create(Super.prototype)
	  Sub.prototype.constructor = Sub
	  Sub.cid = cid++
	  Sub.options = _.mergeOptions(
	    Super.options,
	    extendOptions
	  )
	  Sub['super'] = Super
	  // allow further extension
	  Sub.extend = Super.extend
	  // create asset registers, so extended classes
	  // can have their private assets too.
	  config._assetTypes.forEach(function (type) {
	    Sub[type] = Super[type]
	  })
	  // enable recursive self-lookup
	  if (name) {
	    Sub.options.components[name] = Sub
	  }
	  // cache constructor
	  if (isFirstExtend) {
	    extendOptions._Ctor = Sub
	  }
	  return Sub
	}

	/**
	 * Plugin system
	 *
	 * @param {Object} plugin
	 */

	exports.use = function (plugin) {
	  /* istanbul ignore if */
	  if (plugin.installed) {
	    return
	  }
	  // additional parameters
	  var args = _.toArray(arguments, 1)
	  args.unshift(this)
	  if (typeof plugin.install === 'function') {
	    plugin.install.apply(plugin, args)
	  } else {
	    plugin.apply(null, args)
	  }
	  plugin.installed = true
	  return this
	}

	/**
	 * Apply a global mixin by merging it into the default
	 * options.
	 */

	exports.mixin = function (mixin) {
	  var Vue = _.Vue
	  Vue.options = _.mergeOptions(Vue.options, mixin)
	}

	/**
	 * Create asset registration methods with the following
	 * signature:
	 *
	 * @param {String} id
	 * @param {*} definition
	 */

	config._assetTypes.forEach(function (type) {
	  exports[type] = function (id, definition) {
	    if (!definition) {
	      return this.options[type + 's'][id]
	    } else {
	      if (
	        type === 'component' &&
	        _.isPlainObject(definition)
	      ) {
	        definition.name = id
	        definition = _.Vue.extend(definition)
	      }
	      this.options[type + 's'][id] = definition
	      return definition
	    }
	  }
	})


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)

	_.extend(exports, __webpack_require__(17))
	_.extend(exports, __webpack_require__(52))


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var publicDirectives = __webpack_require__(18)
	var internalDirectives = __webpack_require__(37)
	var compileProps = __webpack_require__(51)
	var textParser = __webpack_require__(8)
	var dirParser = __webpack_require__(10)
	var templateParser = __webpack_require__(21)
	var resolveAsset = _.resolveAsset

	// special binding prefixes
	var bindRE = /^v-bind:|^:/
	var onRE = /^v-on:|^@/
	var argRE = /:(.*)$/
	var modifierRE = /\.[^\.]+/g
	var transitionRE = /^(v-bind:|:)?transition$/

	// terminal directives
	var terminalDirectives = [
	  'for',
	  'if'
	]

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	exports.compile = function (el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent
	    ? compileNode(el, options)
	    : null
	  // link function for the childNodes
	  var childLinkFn =
	    !(nodeLinkFn && nodeLinkFn.terminal) &&
	    el.tagName !== 'SCRIPT' &&
	    el.hasChildNodes()
	      ? compileNodeList(el.childNodes, options)
	      : null

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn (vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = _.toArray(el.childNodes)
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer () {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag)
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag)
	    }, vm)
	    return makeUnlinkFn(vm, dirs)
	  }
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture (linker, vm) {
	  var originalDirCount = vm._directives.length
	  linker()
	  var dirs = vm._directives.slice(originalDirCount)
	  dirs.sort(directiveComparator)
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind()
	  }
	  return dirs
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator (a, b) {
	  a = a.descriptor.def.priority || 0
	  b = b.descriptor.def.priority || 0
	  return a > b ? -1 : a === b ? 0 : 1
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn (vm, dirs, context, contextDirs) {
	  return function unlink (destroying) {
	    teardownDirs(vm, dirs, destroying)
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs)
	    }
	  }
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs (vm, dirs, destroying) {
	  var i = dirs.length
	  while (i--) {
	    dirs[i]._teardown()
	    if (!destroying) {
	      vm._directives.$remove(dirs[i])
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	exports.compileAndLinkProps = function (vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props)
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope)
	  }, vm)
	  return makeUnlinkFn(vm, propDirs)
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	exports.compileRoot = function (el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs
	  var replacerAttrs = options._replacerAttrs
	  var contextLinkFn, replacerLinkFn

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions)
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options)
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options)
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    containerAttrs.forEach(function (attr) {
	      if (attr.name.indexOf('v-') === 0 || attr.name === 'transition') {
	        _.warn(
	          attr.name + ' is ignored on component ' +
	          '<' + options.el.tagName.toLowerCase() + '> because ' +
	          'the component is a fragment instance: ' +
	          'http://vuejs.org/guide/components.html#Fragment_Instance'
	        )
	      }
	    })
	  }

	  return function rootLinkFn (vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context
	    var contextDirs
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope)
	      }, context)
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el)
	    }, vm)

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs)
	  }
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode (node, options) {
	  var type = node.nodeType
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options)
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options)
	  } else {
	    return null
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement (el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = textParser.parse(el.value)
	    if (tokens) {
	      el.setAttribute(':value', textParser.tokensToExp(tokens))
	      el.value = ''
	    }
	  }
	  var linkFn
	  var hasAttrs = el.hasAttributes()
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, options)
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options)
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options)
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(el.attributes, options)
	  }
	  return linkFn
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode (node, options) {
	  var tokens = textParser.parse(node.data)
	  if (!tokens) {
	    return null
	  }
	  var frag = document.createDocumentFragment()
	  var el, token
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i]
	    el = token.tag
	      ? processTextToken(token, options)
	      : document.createTextNode(token.value)
	    frag.appendChild(el)
	  }
	  return makeTextNodeLinkFn(tokens, frag, options)
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken (token, options) {
	  var el
	  if (token.oneTime) {
	    el = document.createTextNode(token.value)
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html')
	      setTokenType('html')
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ')
	      setTokenType('text')
	    }
	  }
	  function setTokenType (type) {
	    if (token.descriptor) return
	    var parsed = dirParser.parse(token.value)
	    token.descriptor = {
	      name: type,
	      def: publicDirectives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    }
	  }
	  return el
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn (tokens, frag) {
	  return function textNodeLinkFn (vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true)
	    var childNodes = _.toArray(fragClone.childNodes)
	    var token, value, node
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i]
	      value = token.value
	      if (token.tag) {
	        node = childNodes[i]
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value)
	          if (token.html) {
	            _.replace(node, templateParser.parse(value, true))
	          } else {
	            node.data = value
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope)
	        }
	      }
	    }
	    _.replace(el, fragClone)
	  }
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList (nodeList, options) {
	  var linkFns = []
	  var nodeLinkFn, childLinkFn, node
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i]
	    nodeLinkFn = compileNode(node, options)
	    childLinkFn =
	      !(nodeLinkFn && nodeLinkFn.terminal) &&
	      node.tagName !== 'SCRIPT' &&
	      node.hasChildNodes()
	        ? compileNodeList(node.childNodes, options)
	        : null
	    linkFns.push(nodeLinkFn, childLinkFn)
	  }
	  return linkFns.length
	    ? makeChildLinkFn(linkFns)
	    : null
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn (linkFns) {
	  return function childLinkFn (vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n]
	      nodeLinkFn = linkFns[i++]
	      childrenLinkFn = linkFns[i++]
	      // cache childNodes before linking parent, fix #657
	      var childNodes = _.toArray(node.childNodes)
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag)
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag)
	      }
	    }
	  }
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives (el, options) {
	  var tag = el.tagName.toLowerCase()
	  if (_.commonTagRE.test(tag)) return
	  var def = resolveAsset(options, 'elementDirectives', tag)
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def)
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent (el, options) {
	  var component = _.checkComponent(el, options)
	  if (component) {
	    var descriptor = {
	      name: 'component',
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    }
	    var componentLinkFn = function (vm, el, host, scope, frag) {
	      vm._bindDir(descriptor, el, host, scope, frag)
	    }
	    componentLinkFn.terminal = true
	    return componentLinkFn
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives (el, options) {
	  // skip v-pre
	  if (_.attr(el, 'v-pre') !== null) {
	    return skip
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip
	    }
	  }
	  var value, dirName
	  for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	    dirName = terminalDirectives[i]
	    /* eslint-disable no-cond-assign */
	    if (value = el.getAttribute('v-' + dirName)) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options)
	    }
	    /* eslint-enable no-cond-assign */
	  }
	}

	function skip () {}
	skip.terminal = true

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} [def]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn (el, dirName, value, options, def) {
	  var parsed = dirParser.parse(value)
	  var descriptor = {
	    name: dirName,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    // either an element directive, or if/for
	    def: def || publicDirectives[dirName]
	  }
	  var fn = function terminalNodeLinkFn (vm, el, host, scope, frag) {
	    vm._bindDir(descriptor, el, host, scope, frag)
	  }
	  fn.terminal = true
	  return fn
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives (attrs, options) {
	  var i = attrs.length
	  var dirs = []
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens
	  while (i--) {
	    attr = attrs[i]
	    name = rawName = attr.name
	    value = rawValue = attr.value
	    tokens = textParser.parse(value)
	    // reset arg
	    arg = null
	    // check modifiers
	    modifiers = parseModifiers(name)
	    name = name.replace(modifierRE, '')

	    // attribute interpolations
	    if (tokens) {
	      value = textParser.tokensToExp(tokens)
	      arg = name
	      pushDir('bind', publicDirectives.bind, true)
	    } else

	    // special attribute: transition
	    if (transitionRE.test(name)) {
	      modifiers.literal = !bindRE.test(name)
	      pushDir('transition', internalDirectives.transition)
	    } else

	    // event handlers
	    if (onRE.test(name)) {
	      arg = name.replace(onRE, '')
	      pushDir('on', publicDirectives.on)
	    } else

	    // attribute bindings
	    if (bindRE.test(name)) {
	      dirName = name.replace(bindRE, '')
	      if (dirName === 'style' || dirName === 'class') {
	        pushDir(dirName, internalDirectives[dirName])
	      } else {
	        arg = dirName
	        pushDir('bind', publicDirectives.bind)
	      }
	    } else

	    // normal directives
	    if (name.indexOf('v-') === 0) {
	      // check arg
	      arg = (arg = name.match(argRE)) && arg[1]
	      if (arg) {
	        name = name.replace(argRE, '')
	      }
	      // extract directive name
	      dirName = name.slice(2)

	      // skip v-else (when used with v-show)
	      if (dirName === 'else') {
	        continue
	      }

	      dirDef = resolveAsset(options, 'directives', dirName)

	      if (process.env.NODE_ENV !== 'production') {
	        _.assertAsset(dirDef, 'directive', dirName)
	      }

	      if (dirDef) {
	        if (_.isLiteral(value)) {
	          value = _.stripQuotes(value)
	          modifiers.literal = true
	        }
	        pushDir(dirName, dirDef)
	      }
	    }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Boolean} [interp]
	   */

	  function pushDir (dirName, def, interp) {
	    var parsed = dirParser.parse(value)
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      expression: parsed.expression,
	      filters: parsed.filters,
	      interp: interp
	    })
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs)
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers (name) {
	  var res = Object.create(null)
	  var match = name.match(modifierRE)
	  if (match) {
	    var i = match.length
	    while (i--) {
	      res[match[i].slice(1)] = true
	    }
	  }
	  return res
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn (directives) {
	  return function nodeLinkFn (vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// text & html
	exports.text = __webpack_require__(19)
	exports.html = __webpack_require__(20)

	// logic control
	exports['for'] = __webpack_require__(22)
	exports['if'] = __webpack_require__(25)
	exports.show = __webpack_require__(26)

	// two-way binding
	exports.model = __webpack_require__(27)

	// event handling
	exports.on = __webpack_require__(32)

	// attributes
	exports.bind = __webpack_require__(33)

	// ref & el
	exports.el = __webpack_require__(34)
	exports.ref = __webpack_require__(35)

	// cloak
	exports.cloak = __webpack_require__(36)


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)

	module.exports = {

	  bind: function () {
	    this.attr = this.el.nodeType === 3
	      ? 'data'
	      : 'textContent'
	  },

	  update: function (value) {
	    this.el[this.attr] = _.toString(value)
	  }
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var templateParser = __webpack_require__(21)

	module.exports = {

	  bind: function () {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = []
	      // replace the placeholder with proper anchor
	      this.anchor = _.createAnchor('v-html')
	      _.replace(this.el, this.anchor)
	    }
	  },

	  update: function (value) {
	    value = _.toString(value)
	    if (this.nodes) {
	      this.swap(value)
	    } else {
	      this.el.innerHTML = value
	    }
	  },

	  swap: function (value) {
	    // remove old nodes
	    var i = this.nodes.length
	    while (i--) {
	      _.remove(this.nodes[i])
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = templateParser.parse(value, true, true)
	    // save a reference to these nodes so we can remove later
	    this.nodes = _.toArray(frag.childNodes)
	    _.before(frag, this.anchor)
	  }
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var Cache = __webpack_require__(9)
	var templateCache = new Cache(1000)
	var idSelectorCache = new Cache(1000)

	var map = {
	  _default: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [
	    2,
	    '<table><tbody></tbody><colgroup>',
	    '</colgroup></table>'
	  ]
	}

	map.td =
	map.th = [
	  3,
	  '<table><tbody><tr>',
	  '</tr></tbody></table>'
	]

	map.option =
	map.optgroup = [
	  1,
	  '<select multiple="multiple">',
	  '</select>'
	]

	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>']

	map.g =
	map.defs =
	map.symbol =
	map.use =
	map.image =
	map.text =
	map.circle =
	map.ellipse =
	map.line =
	map.path =
	map.polygon =
	map.polyline =
	map.rect = [
	  1,
	  '<svg ' +
	    'xmlns="http://www.w3.org/2000/svg" ' +
	    'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
	    'xmlns:ev="http://www.w3.org/2001/xml-events"' +
	    'version="1.1">',
	  '</svg>'
	]

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate (node) {
	  return _.isTemplate(node) &&
	    node.content instanceof DocumentFragment
	}

	var tagRE = /<([\w:]+)/
	var entityRE = /&\w+;|&#\d+;|&#x[\dA-F]+;/

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @return {DocumentFragment}
	 */

	function stringToFragment (templateString) {
	  // try a cache hit first
	  var hit = templateCache.get(templateString)
	  if (hit) {
	    return hit
	  }

	  var frag = document.createDocumentFragment()
	  var tagMatch = templateString.match(tagRE)
	  var entityMatch = entityRE.test(templateString)

	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(
	      document.createTextNode(templateString)
	    )
	  } else {

	    var tag = tagMatch && tagMatch[1]
	    var wrap = map[tag] || map._default
	    var depth = wrap[0]
	    var prefix = wrap[1]
	    var suffix = wrap[2]
	    var node = document.createElement('div')

	    node.innerHTML = prefix + templateString.trim() + suffix
	    while (depth--) {
	      node = node.lastChild
	    }

	    var child
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	    /* eslint-enable no-cond-assign */
	      frag.appendChild(child)
	    }
	  }

	  templateCache.put(templateString, frag)
	  return frag
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment (node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    _.trimNode(node.content)
	    return node.content
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent)
	  }
	  // normal node, clone it to avoid mutating the original
	  var clone = exports.clone(node)
	  var frag = document.createDocumentFragment()
	  var child
	  /* eslint-disable no-cond-assign */
	  while (child = clone.firstChild) {
	  /* eslint-enable no-cond-assign */
	    frag.appendChild(child)
	  }
	  _.trimNode(frag)
	  return frag
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/show_bug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (_.inBrowser) {
	    var a = document.createElement('div')
	    a.innerHTML = '<template>1</template>'
	    return !a.cloneNode(true).firstChild.innerHTML
	  } else {
	    return false
	  }
	})()

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (_.inBrowser) {
	    var t = document.createElement('textarea')
	    t.placeholder = 't'
	    return t.cloneNode(true).value === 't'
	  } else {
	    return false
	  }
	})()

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	exports.clone = function (node) {
	  if (!node.querySelectorAll) {
	    return node.cloneNode()
	  }
	  var res = node.cloneNode(true)
	  var i, original, cloned
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var clone = res
	    if (isRealTemplate(node)) {
	      node = node.content
	      clone = res.content
	    }
	    original = node.querySelectorAll('template')
	    if (original.length) {
	      cloned = clone.querySelectorAll('template')
	      i = cloned.length
	      while (i--) {
	        cloned[i].parentNode.replaceChild(
	          exports.clone(original[i]),
	          cloned[i]
	        )
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value
	    } else {
	      original = node.querySelectorAll('textarea')
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea')
	        i = cloned.length
	        while (i--) {
	          cloned[i].value = original[i].value
	        }
	      }
	    }
	  }
	  return res
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *    Possible values include:
	 *    - DocumentFragment object
	 *    - Node object of type Template
	 *    - id selector: '#some-template-id'
	 *    - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} clone
	 * @param {Boolean} noSelector
	 * @return {DocumentFragment|undefined}
	 */

	exports.parse = function (template, clone, noSelector) {
	  var node, frag

	  // if the template is already a document fragment,
	  // do nothing
	  if (template instanceof DocumentFragment) {
	    _.trimNode(template)
	    return clone
	      ? exports.clone(template)
	      : template
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!noSelector && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template)
	      if (!frag) {
	        node = document.getElementById(template.slice(1))
	        if (node) {
	          frag = nodeToFragment(node)
	          // save selector to cache
	          idSelectorCache.put(template, frag)
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template)
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template)
	  }

	  return frag && clone
	    ? exports.clone(frag)
	    : frag
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var FragmentFactory = __webpack_require__(23)
	var isObject = _.isObject
	var uid = 0

	module.exports = {

	  priority: 2000,

	  params: [
	    'track-by',
	    'stagger',
	    'enter-stagger',
	    'leave-stagger'
	  ],

	  bind: function () {
	    // support "item in items" syntax
	    var inMatch = this.expression.match(/(.*) in (.*)/)
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/)
	      if (itMatch) {
	        this.iterator = itMatch[1].trim()
	        this.alias = itMatch[2].trim()
	      } else {
	        this.alias = inMatch[1].trim()
	      }
	      this.expression = inMatch[2]
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Alias is required in v-for.'
	      )
	      return
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + (++uid)

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName
	    this.isOption =
	      (tag === 'OPTION' || tag === 'OPTGROUP') &&
	      this.el.parentNode.tagName === 'SELECT'

	    // setup anchor nodes
	    this.start = _.createAnchor('v-for-start')
	    this.end = _.createAnchor('v-for-end')
	    _.replace(this.el, this.end)
	    _.before(this.start, this.end)

	    // check ref
	    this.ref = _.findRef(this.el)

	    // cache
	    this.cache = Object.create(null)

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el)
	  },

	  update: function (data) {
	    this.diff(data)
	    this.updateRef()
	    this.updateModel()
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function (data) {
	    // check if the Array was converted from an Object
	    var item = data[0]
	    var convertedFromObject = this.fromObject =
	      isObject(item) &&
	      item.hasOwnProperty('$key') &&
	      item.hasOwnProperty('$value')

	    var trackByKey = this.params.trackBy
	    var oldFrags = this.frags
	    var frags = this.frags = new Array(data.length)
	    var alias = this.alias
	    var iterator = this.iterator
	    var start = this.start
	    var end = this.end
	    var inDoc = _.inDoc(start)
	    var init = !oldFrags
	    var i, l, frag, key, value, primitive

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i]
	      key = convertedFromObject ? item.$key : null
	      value = convertedFromObject ? item.$value : item
	      primitive = !isObject(value)
	      frag = !init && this.getCachedFrag(value, i, key)
	      if (frag) { // reusable fragment
	        frag.reused = true
	        // update $index
	        frag.scope.$index = i
	        // update $key
	        if (key) {
	          frag.scope.$key = key
	          if (iterator) {
	            frag.scope[iterator] = key
	          }
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          frag.scope[alias] = value
	        }
	      } else { // new isntance
	        frag = this.create(value, alias, i, key)
	        frag.fresh = !init
	      }
	      frags[i] = frag
	      if (init) {
	        frag.before(end)
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0
	    var totalRemoved = oldFrags.length - frags.length
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i]
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag)
	        this.remove(frag, removalIndex++, totalRemoved, inDoc)
	      }
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev
	    var insertionIndex = 0
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i]
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1]
	      prevEl = targetPrev
	        ? targetPrev.staggerCb
	          ? targetPrev.staggerAnchor
	          : targetPrev.end || targetPrev.node
	        : start
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id)
	        if (currentPrev !== targetPrev) {
	          this.move(frag, prevEl)
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDoc)
	      }
	      frag.reused = frag.fresh = false
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function (value, alias, index, key) {
	    var host = this._host
	    // create iteration scope
	    var parentScope = this._scope || this.vm
	    var scope = Object.create(parentScope)
	    // ref holder for the scope
	    scope.$refs = {}
	    scope.$els = {}
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope
	    // for two-way binding on alias
	    scope.$forContext = this
	    // define scope properties
	    _.defineReactive(scope, alias, value)
	    _.defineReactive(scope, '$index', index)
	    if (key) {
	      _.defineReactive(scope, '$key', key)
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      _.define(scope, '$key', null)
	    }
	    if (this.iterator) {
	      _.defineReactive(scope, this.iterator, key || index)
	    }
	    var frag = this.factory.create(host, scope, this._frag)
	    frag.forId = this.id
	    this.cacheFrag(value, frag, index, key)
	    return frag
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function () {
	    var ref = this.ref
	    if (!ref) return
	    var hash = (this._scope || this.vm).$refs
	    var refs
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag)
	    } else {
	      refs = {}
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag)
	      })
	    }
	    if (!hash.hasOwnProperty(ref)) {
	      _.defineReactive(hash, ref, refs)
	    } else {
	      hash[ref] = refs
	    }
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function () {
	    if (this.isOption) {
	      var parent = this.start.parentNode
	      var model = parent && parent.__v_model
	      if (model) {
	        model.forceUpdate()
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDoc
	   */

	  insert: function (frag, index, prevEl, inDoc) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel()
	      frag.staggerCb = null
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter')
	    if (inDoc && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor
	      if (!anchor) {
	        anchor = frag.staggerAnchor = _.createAnchor('stagger-anchor')
	        anchor.__vfrag__ = frag
	      }
	      _.after(anchor, prevEl)
	      var op = frag.staggerCb = _.cancellable(function () {
	        frag.staggerCb = null
	        frag.before(anchor)
	        _.remove(anchor)
	      })
	      setTimeout(op, staggerAmount)
	    } else {
	      frag.before(prevEl.nextSibling)
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDoc
	   */

	  remove: function (frag, index, total, inDoc) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel()
	      frag.staggerCb = null
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave')
	    if (inDoc && staggerAmount) {
	      var op = frag.staggerCb = _.cancellable(function () {
	        frag.staggerCb = null
	        frag.remove(true)
	      })
	      setTimeout(op, staggerAmount)
	    } else {
	      frag.remove(true)
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function (frag, prevEl) {
	    frag.before(prevEl.nextSibling, false)
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function (value, frag, index, key) {
	    var trackByKey = this.params.trackBy
	    var cache = this.cache
	    var primitive = !isObject(value)
	    var id
	    if (key || trackByKey || primitive) {
	      id = trackByKey
	        ? trackByKey === '$index'
	          ? index
	          : value[trackByKey]
	        : (key || value)
	      if (!cache[id]) {
	        cache[id] = frag
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' &&
	        this.warnDuplicate(value)
	      }
	    } else {
	      id = this.id
	      if (value.hasOwnProperty(id)) {
	        if (value[id] === null) {
	          value[id] = frag
	        } else {
	          process.env.NODE_ENV !== 'production' &&
	          this.warnDuplicate(value)
	        }
	      } else {
	        _.define(value, id, frag)
	      }
	    }
	    frag.raw = value
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function (value, index, key) {
	    var trackByKey = this.params.trackBy
	    var primitive = !isObject(value)
	    var frag
	    if (key || trackByKey || primitive) {
	      var id = trackByKey
	        ? trackByKey === '$index'
	          ? index
	          : value[trackByKey]
	        : (key || value)
	      frag = this.cache[id]
	    } else {
	      frag = value[this.id]
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' &&
	      this.warnDuplicate(value)
	    }
	    return frag
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function (frag) {
	    var value = frag.raw
	    var trackByKey = this.params.trackBy
	    var scope = frag.scope
	    var index = scope.$index
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = scope.hasOwnProperty('$key') && scope.$key
	    var primitive = !isObject(value)
	    if (trackByKey || key || primitive) {
	      var id = trackByKey
	        ? trackByKey === '$index'
	          ? index
	          : value[trackByKey]
	        : (key || value)
	      this.cache[id] = null
	    } else {
	      value[this.id] = null
	      frag.raw = null
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function (frag, index, total, type) {
	    type = type + 'Stagger'
	    var trans = frag.node.__v_trans
	    var hooks = trans && trans.hooks
	    var hook = hooks && (hooks[type] || hooks.stagger)
	    return hook
	      ? hook.call(frag, index, total)
	      : index * parseInt(this.params[type] || this.params.stagger, 10)
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function (value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value
	    return value
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function (value) {
	    if (_.isArray(value)) {
	      return value
	    } else if (_.isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value)
	      var i = keys.length
	      var res = new Array(i)
	      var key
	      while (i--) {
	        key = keys[i]
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        }
	      }
	      return res
	    } else {
	      var type = typeof value
	      if (type === 'number') {
	        value = range(value)
	      } else if (type === 'string') {
	        value = _.toArray(value)
	      }
	      return value || []
	    }
	  },

	  unbind: function () {
	    if (this.ref) {
	      (this._scope || this.vm).$refs[this.ref] = null
	    }
	    if (this.frags) {
	      var i = this.frags.length
	      var frag
	      while (i--) {
	        frag = this.frags[i]
	        this.deleteCachedFrag(frag)
	        frag.destroy()
	      }
	    }
	  }
	}

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag (frag, anchor, id) {
	  var el = frag.node.previousSibling
	  /* istanbul ignore if */
	  if (!el) return
	  frag = el.__vfrag__
	  while (
	    (!frag || frag.forId !== id || !frag.inserted) &&
	    el !== anchor
	  ) {
	    el = el.previousSibling
	    /* istanbul ignore if */
	    if (!el) return
	    frag = el.__vfrag__
	  }
	  return frag
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag (frag) {
	  return frag.node.__vue__ || frag.node.nextSibling.__vue__
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range (n) {
	  var i = -1
	  var ret = new Array(n)
	  while (++i < n) {
	    ret[i] = i
	  }
	  return ret
	}

	if (process.env.NODE_ENV !== 'production') {
	  module.exports.warnDuplicate = function (value) {
	    _.warn(
	      'Duplicate value found in v-for="' + this.descriptor.raw + '": ' +
	      JSON.stringify(value) + '. Use track-by="$index" if ' +
	      'you are expecting duplicate values.'
	    )
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var compiler = __webpack_require__(16)
	var templateParser = __webpack_require__(21)
	var Fragment = __webpack_require__(24)
	var Cache = __webpack_require__(9)
	var linkerCache = new Cache(5000)

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */

	function FragmentFactory (vm, el) {
	  this.vm = vm
	  var template
	  var isString = typeof el === 'string'
	  if (isString || _.isTemplate(el)) {
	    template = templateParser.parse(el, true)
	  } else {
	    template = document.createDocumentFragment()
	    template.appendChild(el)
	  }
	  this.template = template
	  // linker can be cached, but only for components
	  var linker
	  var cid = vm.constructor.cid
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : el.outerHTML)
	    linker = linkerCache.get(cacheId)
	    if (!linker) {
	      linker = compiler.compile(template, vm.$options, true)
	      linkerCache.put(cacheId, linker)
	    }
	  } else {
	    linker = compiler.compile(template, vm.$options, true)
	  }
	  this.linker = linker
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = templateParser.clone(this.template)
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag)
	}

	module.exports = FragmentFactory


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var transition = __webpack_require__(11)

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 */

	function Fragment (linker, vm, frag, host, scope, parentFrag) {
	  this.children = []
	  this.childFrags = []
	  this.vm = vm
	  this.scope = scope
	  this.inserted = false
	  this.parentFrag = parentFrag
	  if (parentFrag) {
	    parentFrag.childFrags.push(this)
	  }
	  this.unlink = linker(vm, frag, host, scope, this)
	  var single = this.single = frag.childNodes.length === 1
	  if (single) {
	    this.node = frag.childNodes[0]
	    this.before = singleBefore
	    this.remove = singleRemove
	  } else {
	    this.node = _.createAnchor('fragment-start')
	    this.end = _.createAnchor('fragment-end')
	    this.frag = frag
	    _.prepend(this.node, frag)
	    frag.appendChild(this.end)
	    this.before = multiBefore
	    this.remove = multiRemove
	  }
	  this.node.__vfrag__ = this
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i])
	  }
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook)
	  }
	}

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this)
	  }
	  this.unlink()
	}

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore (target, withTransition) {
	  this.inserted = true
	  var method = withTransition !== false
	    ? transition.before
	    : _.before
	  method(this.node, target, this.vm)
	  if (_.inDoc(this.node)) {
	    this.callHook(attach)
	  }
	}

	/**
	 * Remove fragment, single node version
	 *
	 * @param {Boolean} [destroy]
	 */

	function singleRemove (destroy) {
	  this.inserted = false
	  var shouldCallRemove = _.inDoc(this.node)
	  var self = this
	  transition.remove(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach)
	    }
	    if (destroy) {
	      self.destroy()
	    }
	  })
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore (target, withTransition) {
	  this.inserted = true
	  var vm = this.vm
	  var method = withTransition !== false
	    ? transition.before
	    : _.before
	  _.mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm)
	  })
	  if (_.inDoc(this.node)) {
	    this.callHook(attach)
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 *
	 * @param {Boolean} [destroy]
	 */

	function multiRemove (destroy) {
	  this.inserted = false
	  var self = this
	  var shouldCallRemove = _.inDoc(this.node)
	  _.removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach)
	    }
	    if (destroy) {
	      self.destroy()
	    }
	  })
	}

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach (child) {
	  if (!child._isAttached) {
	    child._callHook('attached')
	  }
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach (child) {
	  if (child._isAttached) {
	    child._callHook('detached')
	  }
	}

	module.exports = Fragment


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var FragmentFactory = __webpack_require__(23)

	module.exports = {

	  priority: 2000,

	  bind: function () {
	    var el = this.el
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling
	      if (next && _.attr(next, 'v-else') !== null) {
	        _.remove(next)
	        this.elseFactory = new FragmentFactory(this.vm, next)
	      }
	      // check main block
	      this.anchor = _.createAnchor('v-if')
	      _.replace(el, this.anchor)
	      this.factory = new FragmentFactory(this.vm, el)
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'v-if="' + this.expression + '" cannot be ' +
	        'used on an instance root element.'
	      )
	      this.invalid = true
	    }
	  },

	  update: function (value) {
	    if (this.invalid) return
	    if (value) {
	      if (!this.frag) {
	        this.insert()
	      }
	    } else {
	      this.remove()
	    }
	  },

	  insert: function () {
	    if (this.elseFrag) {
	      this.elseFrag.remove(true)
	      this.elseFrag = null
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag)
	    this.frag.before(this.anchor)
	  },

	  remove: function () {
	    if (this.frag) {
	      this.frag.remove(true)
	      this.frag = null
	    }
	    if (this.elseFactory) {
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag)
	      this.elseFrag.before(this.anchor)
	    }
	  },

	  unbind: function () {
	    if (this.frag) {
	      this.frag.destroy()
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var transition = __webpack_require__(11)

	module.exports = {

	  bind: function () {
	    // check else block
	    var next = this.el.nextElementSibling
	    if (next && _.attr(next, 'v-else') !== null) {
	      this.elseEl = next
	    }
	  },

	  update: function (value) {
	    var el = this.el
	    transition.apply(el, value ? 1 : -1, function () {
	      el.style.display = value ? '' : 'none'
	    }, this.vm)
	    var elseEl = this.elseEl
	    if (elseEl) {
	      transition.apply(elseEl, value ? -1 : 1, function () {
	        elseEl.style.display = value ? 'none' : ''
	      }, this.vm)
	    }
	  }
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)

	var handlers = {
	  text: __webpack_require__(28),
	  radio: __webpack_require__(29),
	  select: __webpack_require__(30),
	  checkbox: __webpack_require__(31)
	}

	module.exports = {

	  priority: 800,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function () {
	    // friendly warning...
	    this.checkFilters()
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'It seems you are using a read-only filter with ' +
	        'v-model. You might want to use a two-way filter ' +
	        'to ensure correct behavior.'
	      )
	    }
	    var el = this.el
	    var tag = el.tagName
	    var handler
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text
	    } else if (tag === 'SELECT') {
	      handler = handlers.select
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'v-model does not support element type: ' + tag
	      )
	      return
	    }
	    el.__v_model = this
	    handler.bind.call(this)
	    this.update = handler.update
	    this._unbind = handler.unbind
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function () {
	    var filters = this.filters
	    if (!filters) return
	    var i = filters.length
	    while (i--) {
	      var filter = _.resolveAsset(this.vm.$options, 'filters', filters[i].name)
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true
	      }
	      if (filter.write) {
	        this.hasWrite = true
	      }
	    }
	  },

	  unbind: function () {
	    this.el.__v_model = null
	    this._unbind && this._unbind()
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el
	    var isRange = el.type === 'range'
	    var lazy = this.params.lazy
	    var number = this.params.number
	    var debounce = this.params.debounce

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false
	    if (!_.isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true
	      })
	      this.on('compositionend', function () {
	        composing = false
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener()
	        }
	      })
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false
	    if (!isRange) {
	      this.on('focus', function () {
	        self.focused = true
	      })
	      this.on('blur', function () {
	        self.focused = false
	        self.listener()
	      })
	    }

	    // Now attach the main listener
	    this.listener = function () {
	      if (composing) return
	      var val = number || isRange
	        ? _.toNumber(el.value)
	        : el.value
	      self.set(val)
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      _.nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value)
	        }
	      })
	    }

	    // apply debounce
	    if (debounce) {
	      this.listener = _.debounce(this.listener, debounce)
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function'
	    if (this.hasjQuery) {
	      jQuery(el).on('change', this.listener)
	      if (!lazy) {
	        jQuery(el).on('input', this.listener)
	      }
	    } else {
	      this.on('change', this.listener)
	      if (!lazy) {
	        this.on('input', this.listener)
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && _.isIE9) {
	      this.on('cut', function () {
	        _.nextTick(self.listener)
	      })
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener()
	        }
	      })
	    }

	    // set initial value if present
	    if (
	      el.hasAttribute('value') ||
	      (el.tagName === 'TEXTAREA' && el.value.trim())
	    ) {
	      this.afterBind = this.listener
	    }
	  },

	  update: function (value) {
	    this.el.value = _.toString(value)
	  },

	  unbind: function () {
	    var el = this.el
	    if (this.hasjQuery) {
	      jQuery(el).off('change', this.listener)
	      jQuery(el).off('input', this.listener)
	    }
	  }
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value
	      }
	      var val = el.value
	      if (self.params.number) {
	        val = _.toNumber(val)
	      }
	      return val
	    }

	    this.listener = function () {
	      self.set(self.getValue())
	    }
	    this.on('change', this.listener)

	    if (el.checked) {
	      this.afterBind = this.listener
	    }
	  },

	  update: function (value) {
	    this.el.checked = _.looseEqual(value, this.getValue())
	  }
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get())
	      }
	    }

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple')

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple)
	      value = self.params.number
	        ? _.isArray(value)
	          ? value.map(_.toNumber)
	          : _.toNumber(value)
	        : value
	      self.set(value)
	    }
	    this.on('change', this.listener)

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true)
	    if ((multiple && initValue.length) ||
	        (!multiple && initValue !== null)) {
	      this.afterBind = this.listener
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate)
	  },

	  update: function (value) {
	    var el = this.el
	    el.selectedIndex = -1
	    var multi = this.multiple && _.isArray(value)
	    var options = el.options
	    var i = options.length
	    var op, val
	    while (i--) {
	      op = options[i]
	      val = op.hasOwnProperty('_value')
	        ? op._value
	        : op.value
	      /* eslint-disable eqeqeq */
	      op.selected = multi
	        ? indexOf(value, val) > -1
	        : _.looseEqual(value, val)
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function () {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate)
	  }
	}

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue (el, multi, init) {
	  var res = multi ? [] : null
	  var op, val, selected
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i]
	    selected = init
	      ? op.hasAttribute('selected')
	      : op.selected
	    if (selected) {
	      val = op.hasOwnProperty('_value')
	        ? op._value
	        : op.value
	      if (multi) {
	        res.push(val)
	      } else {
	        return val
	      }
	    }
	  }
	  return res
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf (arr, val) {
	  var i = arr.length
	  while (i--) {
	    if (_.looseEqual(arr[i], val)) {
	      return i
	    }
	  }
	  return -1
	}


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el

	    this.getValue = function () {
	      return el.hasOwnProperty('_value')
	        ? el._value
	        : self.params.number
	          ? _.toNumber(el.value)
	          : el.value
	    }

	    function getBooleanValue () {
	      var val = el.checked
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue
	      }
	      return val
	    }

	    this.listener = function () {
	      var model = self._watcher.value
	      if (_.isArray(model)) {
	        var val = self.getValue()
	        if (el.checked) {
	          if (_.indexOf(model, val) < 0) {
	            model.push(val)
	          }
	        } else {
	          model.$remove(val)
	        }
	      } else {
	        self.set(getBooleanValue())
	      }
	    }

	    this.on('change', this.listener)
	    if (el.checked) {
	      this.afterBind = this.listener
	    }
	  },

	  update: function (value) {
	    var el = this.el
	    if (_.isArray(value)) {
	      el.checked = _.indexOf(value, this.getValue()) > -1
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = _.looseEqual(value, el._trueValue)
	      } else {
	        el.checked = !!value
	      }
	    }
	  }
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': 46,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	}

	function keyFilter (handler, keys) {
	  var codes = keys.map(function (key) {
	    var code = keyCodes[key]
	    if (!code) {
	      code = parseInt(key, 10)
	    }
	    return code
	  })
	  return function keyHandler (e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e)
	    }
	  }
	}

	function stopFilter (handler) {
	  return function stopHandler (e) {
	    e.stopPropagation()
	    return handler.call(this, e)
	  }
	}

	function preventFilter (handler) {
	  return function preventHandler (e) {
	    e.preventDefault()
	    return handler.call(this, e)
	  }
	}

	module.exports = {

	  acceptStatement: true,
	  priority: 700,

	  bind: function () {
	    // deal with iframes
	    if (
	      this.el.tagName === 'IFRAME' &&
	      this.arg !== 'load'
	    ) {
	      var self = this
	      this.iframeBind = function () {
	        _.on(self.el.contentWindow, self.arg, self.handler)
	      }
	      this.on('load', this.iframeBind)
	    }
	  },

	  update: function (handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {}
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'v-on:' + this.arg + '="' +
	        this.expression + '" expects a function value, ' +
	        'got ' + handler
	      )
	      return
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler)
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler)
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers)
	      .filter(function (key) {
	        return key !== 'stop' && key !== 'prevent'
	      })
	    if (keys.length) {
	      handler = keyFilter(handler, keys)
	    }

	    this.reset()
	    var scope = this._scope || this.vm
	    this.handler = function (e) {
	      scope.$event = e
	      var res = handler(e)
	      scope.$event = null
	      return res
	    }
	    if (this.iframeBind) {
	      this.iframeBind()
	    } else {
	      _.on(this.el, this.arg, this.handler)
	    }
	  },

	  reset: function () {
	    var el = this.iframeBind
	      ? this.el.contentWindow
	      : this.el
	    if (this.handler) {
	      _.off(el, this.arg, this.handler)
	    }
	  },

	  unbind: function () {
	    this.reset()
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink'
	var xlinkRE = /^xlink:/

	// these input element attributes should also set their
	// corresponding properties
	var inputProps = {
	  value: 1,
	  checked: 1,
	  selected: 1
	}

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	}

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/

	module.exports = {

	  priority: 850,

	  bind: function () {
	    var attr = this.arg
	    var tag = this.el.tagName
	    // handle interpolation bindings
	    if (this.descriptor.interp) {
	      // only allow binding on native attributes
	      if (
	        disallowedInterpAttrRE.test(attr) ||
	        (attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT'))
	      ) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          attr + '="' + this.descriptor.raw + '": ' +
	          'attribute interpolation is not allowed in Vue.js ' +
	          'directives and special attributes.'
	        )
	        this.el.removeAttribute(attr)
	        this.invalid = true
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + this.descriptor.raw + '": '
	        // warn src
	        if (attr === 'src') {
	          _.warn(
	            raw + 'interpolation in "src" attribute will cause ' +
	            'a 404 request. Use v-bind:src instead.'
	          )
	        }

	        // warn style
	        if (attr === 'style') {
	          _.warn(
	            raw + 'interpolation in "style" attribute will cause ' +
	            'the attribute to be discarded in Internet Explorer. ' +
	            'Use v-bind:style instead.'
	          )
	        }
	      }
	    }
	  },

	  update: function (value) {
	    if (this.invalid) {
	      return
	    }
	    var attr = this.arg
	    if (inputProps[attr] && attr in this.el) {
	      this.el[attr] = value
	    }
	    // set model props
	    var modelProp = modelProps[attr]
	    if (modelProp) {
	      this.el[modelProp] = value
	      // update v-model if present
	      var model = this.el.__v_model
	      if (model) {
	        model.listener()
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && this.el.tagName === 'TEXTAREA') {
	      this.el.removeAttribute(attr)
	      return
	    }
	    // update attribute
	    if (value != null && value !== false) {
	      if (xlinkRE.test(attr)) {
	        this.el.setAttributeNS(xlinkNS, attr, value)
	      } else {
	        this.el.setAttribute(attr, value)
	      }
	    } else {
	      this.el.removeAttribute(attr)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)

	module.exports = {

	  priority: 1500,

	  bind: function () {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return
	    }
	    var id = this.id = _.camelize(this.arg)
	    var refs = (this._scope || this.vm).$els
	    if (refs.hasOwnProperty(id)) {
	      refs[id] = this.el
	    } else {
	      _.defineReactive(refs, id, this.el)
	    }
	  },

	  unbind: function () {
	    var refs = (this._scope || this.vm).$els
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null
	    }
	  }
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {if (process.env.NODE_ENV !== 'production') {
	  module.exports = {
	    bind: function () {
	      __webpack_require__(3).warn(
	        'v-ref:' + this.arg + ' must be used on a child ' +
	        'component. Found on <' + this.el.tagName.toLowerCase() + '>.'
	      )
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = {
	  bind: function () {
	    var el = this.el
	    this.vm.$once('hook:compiled', function () {
	      el.removeAttribute('v-cloak')
	    })
	  }
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	exports.style = __webpack_require__(38)
	exports['class'] = __webpack_require__(39)
	exports.component = __webpack_require__(40)
	exports.prop = __webpack_require__(41)
	exports.transition = __webpack_require__(48)


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var prefixes = ['-webkit-', '-moz-', '-ms-']
	var camelPrefixes = ['Webkit', 'Moz', 'ms']
	var importantRE = /!important;?$/
	var camelRE = /([a-z])([A-Z])/g
	var testEl = null
	var propCache = {}

	module.exports = {

	  deep: true,

	  update: function (value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value
	    } else if (_.isArray(value)) {
	      this.objectHandler(value.reduce(_.extend, {}))
	    } else {
	      this.objectHandler(value)
	    }
	  },

	  objectHandler: function (value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {})
	    var prop, val
	    for (prop in cache) {
	      if (!(prop in value)) {
	        this.setProp(prop, null)
	        delete cache[prop]
	      }
	    }
	    for (prop in value) {
	      val = value[prop]
	      if (val !== cache[prop]) {
	        cache[prop] = val
	        this.setProp(prop, val)
	      }
	    }
	  },

	  setProp: function (prop, value) {
	    prop = normalize(prop)
	    if (!prop) return // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += ''
	    if (value) {
	      var isImportant = importantRE.test(value)
	        ? 'important'
	        : ''
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim()
	      }
	      this.el.style.setProperty(prop, value, isImportant)
	    } else {
	      this.el.style.removeProperty(prop)
	    }
	  }

	}

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize (prop) {
	  if (propCache[prop]) {
	    return propCache[prop]
	  }
	  var res = prefix(prop)
	  propCache[prop] = propCache[res] = res
	  return res
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix (prop) {
	  prop = prop.replace(camelRE, '$1-$2').toLowerCase()
	  var camel = _.camelize(prop)
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1)
	  if (!testEl) {
	    testEl = document.createElement('div')
	  }
	  if (camel in testEl.style) {
	    return prop
	  }
	  var i = prefixes.length
	  var prefixed
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper
	    if (prefixed in testEl.style) {
	      return prefixes[i] + prop
	    }
	  }
	}


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var addClass = _.addClass
	var removeClass = _.removeClass

	module.exports = {

	  update: function (value) {
	    if (value && typeof value === 'string') {
	      this.handleObject(stringToObject(value))
	    } else if (_.isPlainObject(value)) {
	      this.handleObject(value)
	    } else if (_.isArray(value)) {
	      this.handleArray(value)
	    } else {
	      this.cleanup()
	    }
	  },

	  handleObject: function (value) {
	    this.cleanup(value)
	    var keys = this.prevKeys = Object.keys(value)
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i]
	      if (value[key]) {
	        addClass(this.el, key)
	      } else {
	        removeClass(this.el, key)
	      }
	    }
	  },

	  handleArray: function (value) {
	    this.cleanup(value)
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        addClass(this.el, value[i])
	      }
	    }
	    this.prevKeys = value.slice()
	  },

	  cleanup: function (value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length
	      while (i--) {
	        var key = this.prevKeys[i]
	        if (key && (!value || !contains(value, key))) {
	          removeClass(this.el, key)
	        }
	      }
	    }
	  }
	}

	function stringToObject (value) {
	  var res = {}
	  var keys = value.trim().split(/\s+/)
	  var i = keys.length
	  while (i--) {
	    res[keys[i]] = true
	  }
	  return res
	}

	function contains (value, key) {
	  return _.isArray(value)
	    ? value.indexOf(key) > -1
	    : value.hasOwnProperty(key)
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var templateParser = __webpack_require__(21)

	module.exports = {

	  priority: 1500,

	  params: [
	    'keep-alive',
	    'transition-mode',
	    'inline-template'
	  ],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function () {
	    if (!this.el.__vue__) {
	      // check ref
	      this.ref = _.findRef(this.el)
	      var refs = (this._scope || this.vm).$refs
	      if (this.ref && !refs.hasOwnProperty(this.ref)) {
	        _.defineReactive(refs, this.ref, null)
	      }
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive
	      if (this.keepAlive) {
	        this.cache = {}
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = _.extractContent(this.el, true)
	      }
	      // component resolution related state
	      this.pendingComponentCb =
	      this.Component = null
	      // transition related state
	      this.pendingRemovals = 0
	      this.pendingRemovalCb = null
	      // check dynamic component params
	        // create a ref anchor
	      this.anchor = _.createAnchor('v-component')
	      _.replace(this.el, this.anchor)
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression)
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'cannot mount component "' + this.expression + '" ' +
	        'on already mounted element: ' + this.el
	      )
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function (value) {
	    if (!this.literal) {
	      this.setComponent(value)
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function (value, cb) {
	    this.invalidatePending()
	    if (!value) {
	      // just remove current
	      this.unbuild(true)
	      this.remove(this.childVM, cb)
	      this.childVM = null
	    } else {
	      var self = this
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb)
	      })
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   */

	  resolveComponent: function (id, cb) {
	    var self = this
	    this.pendingComponentCb = _.cancellable(function (Component) {
	      self.ComponentName = id
	      self.Component = Component
	      cb()
	    })
	    this.vm._resolveComponent(id, this.pendingComponentCb)
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function (cb) {
	    // actual mount
	    this.unbuild(true)
	    var self = this
	    var activateHook = this.Component.options.activate
	    var cached = this.getCached()
	    var newComponent = this.build()
	    if (activateHook && !cached) {
	      this.waitingFor = newComponent
	      activateHook.call(newComponent, function () {
	        self.waitingFor = null
	        self.transition(newComponent, cb)
	      })
	    } else {
	      this.transition(newComponent, cb)
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function () {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel()
	      this.pendingComponentCb = null
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function (extraOptions) {
	    var cached = this.getCached()
	    if (cached) {
	      return cached
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: templateParser.clone(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      }
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        _.extend(options, extraOptions)
	      }
	      var child = new this.Component(options)
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' &&
	          this.el.hasAttribute('transition') &&
	          child._isFragment) {
	        _.warn(
	          'Transitions will not work on a fragment instance. ' +
	          'Template: ' + child.$options.template
	        )
	      }
	      return child
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function () {
	    return this.keepAlive && this.cache[this.Component.cid]
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function (defer) {
	    if (this.waitingFor) {
	      this.waitingFor.$destroy()
	      this.waitingFor = null
	    }
	    var child = this.childVM
	    if (!child || this.keepAlive) {
	      return
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer)
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function (child, cb) {
	    var keepAlive = this.keepAlive
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++
	      this.pendingRemovalCb = cb
	      var self = this
	      child.$remove(function () {
	        self.pendingRemovals--
	        if (!keepAlive) child._cleanup()
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb()
	          self.pendingRemovalCb = null
	        }
	      })
	    } else if (cb) {
	      cb()
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function (target, cb) {
	    var self = this
	    var current = this.childVM
	    // for devtool inspection
	    if (process.env.NODE_ENV !== 'production') {
	      if (current) current._inactive = true
	      target._inactive = false
	    }
	    this.childVM = target
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb)
	        })
	        break
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb)
	        })
	        break
	      default:
	        self.remove(current)
	        target.$before(self.anchor, cb)
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function () {
	    this.invalidatePending()
	    // Do not defer cleanup when unbinding
	    this.unbuild()
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy()
	      }
	      this.cache = null
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// NOTE: the prop internal directive is compiled and linked
	// during _initScope(), before the created hook is called.
	// The purpose is to make the initial prop values available
	// inside `created` hooks and `data` functions.

	var _ = __webpack_require__(3)
	var Watcher = __webpack_require__(42)
	var bindingModes = __webpack_require__(7)._propBindingModes

	module.exports = {

	  bind: function () {

	    var child = this.vm
	    var parent = child._context
	    // passed in from compiler directly
	    var prop = this.descriptor.prop
	    var childKey = prop.path
	    var parentKey = prop.parentPath
	    var twoWay = prop.mode === bindingModes.TWO_WAY

	    var parentWatcher = this.parentWatcher = new Watcher(
	      parent,
	      parentKey,
	      function (val) {
	        if (_.assertProp(prop, val)) {
	          child[childKey] = val
	        }
	      }, {
	        twoWay: twoWay,
	        filters: prop.filters,
	        // important: props need to be observed on the
	        // v-for scope if present
	        scope: this._scope
	      }
	    )

	    // set the child initial value.
	    _.initProp(child, prop, parentWatcher.value)

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this
	      child.$once('hook:created', function () {
	        self.childWatcher = new Watcher(
	          child,
	          childKey,
	          function (val) {
	            parentWatcher.set(val)
	          }
	        )
	      })
	    }
	  },

	  unbind: function () {
	    this.parentWatcher.teardown()
	    if (this.childWatcher) {
	      this.childWatcher.teardown()
	    }
	  }
	}


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var config = __webpack_require__(7)
	var Dep = __webpack_require__(43)
	var expParser = __webpack_require__(44)
	var batcher = __webpack_require__(47)
	var uid = 0

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */

	function Watcher (vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    _.extend(this, options)
	  }
	  var isFn = typeof expOrFn === 'function'
	  this.vm = vm
	  vm._watchers.push(this)
	  this.expression = isFn ? expOrFn.toString() : expOrFn
	  this.cb = cb
	  this.id = ++uid // uid for batching
	  this.active = true
	  this.dirty = this.lazy // for lazy watchers
	  this.deps = Object.create(null)
	  this.newDeps = null
	  this.prevError = null // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn
	    this.setter = undefined
	  } else {
	    var res = expParser.parse(expOrFn, this.twoWay)
	    this.getter = res.get
	    this.setter = res.set
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get()
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false
	}

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id
	  if (!this.newDeps[id]) {
	    this.newDeps[id] = dep
	    if (!this.deps[id]) {
	      this.deps[id] = dep
	      dep.addSub(this)
	    }
	  }
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet()
	  var scope = this.scope || this.vm
	  var value
	  try {
	    value = this.getter.call(scope, scope)
	  } catch (e) {
	    if (
	      process.env.NODE_ENV !== 'production' &&
	      config.warnExpressionErrors
	    ) {
	      _.warn(
	        'Error when evaluating expression "' +
	        this.expression + '". ' +
	        (config.debug
	          ? ''
	          : 'Turn on debug mode to see stack trace.'
	        ), e
	      )
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value)
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value)
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false)
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value)
	  }
	  this.afterGet()
	  return value
	}

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm
	  if (this.filters) {
	    value = scope._applyFilters(
	      value, this.value, this.filters, true)
	  }
	  try {
	    this.setter.call(scope, scope, value)
	  } catch (e) {
	    if (
	      process.env.NODE_ENV !== 'production' &&
	      config.warnExpressionErrors
	    ) {
	      _.warn(
	        'Error when evaluating setter "' +
	        this.expression + '"', e
	      )
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext
	  if (process.env.NODE_ENV !== 'production') {
	    if (
	      forContext &&
	      forContext.filters &&
	      (new RegExp(forContext.alias + '\\b')).test(this.expression)
	    ) {
	      _.warn(
	        'It seems you are using two-way binding on ' +
	        'a v-for alias (' + this.expression + '), and the ' +
	        'v-for has filters. This will not work properly. ' +
	        'Either remove the filters or use an array of ' +
	        'objects and bind to object properties instead.'
	      )
	    }
	  }
	  if (
	    forContext &&
	    forContext.alias === this.expression &&
	    !forContext.filters
	  ) {
	    if (scope.$key) { // original is an object
	      forContext.rawValue[scope.$key] = value
	    } else {
	      forContext.rawValue.$set(scope.$index, value)
	    }
	  }
	}

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this
	  this.newDeps = Object.create(null)
	}

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null
	  var ids = Object.keys(this.deps)
	  var i = ids.length
	  while (i--) {
	    var id = ids[i]
	    if (!this.newDeps[id]) {
	      this.deps[id].removeSub(this)
	    }
	  }
	  this.deps = this.newDeps
	}

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true
	  } else if (this.sync || !config.async) {
	    this.run()
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued
	      ? shallow
	        ? this.shallow
	        : false
	      : !!shallow
	    this.queued = true
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace')
	    }
	    batcher.push(this)
	  }
	}

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get()
	    if (
	      value !== this.value ||
	      // Deep watchers and Array watchers should fire even
	      // when the value is the same, because the value may
	      // have mutated; but only do so if this is a
	      // non-shallow update (caused by a vm digest).
	      ((_.isArray(value) || this.deep) && !this.shallow)
	    ) {
	      // set new value
	      var oldValue = this.value
	      this.value = value
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' &&
	          config.debug && prevError) {
	        this.prevError = null
	        try {
	          this.cb.call(this.vm, value, oldValue)
	        } catch (e) {
	          _.nextTick(function () {
	            throw prevError
	          }, 0)
	          throw e
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue)
	      }
	    }
	    this.queued = this.shallow = false
	  }
	}

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target
	  this.value = this.get()
	  this.dirty = false
	  Dep.target = current
	}

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var depIds = Object.keys(this.deps)
	  var i = depIds.length
	  while (i--) {
	    this.deps[depIds[i]].depend()
	  }
	}

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // we can skip this if the vm if being destroyed
	    // which can improve teardown performance.
	    if (!this.vm._isBeingDestroyed) {
	      this.vm._watchers.$remove(this)
	    }
	    var depIds = Object.keys(this.deps)
	    var i = depIds.length
	    while (i--) {
	      this.deps[depIds[i]].removeSub(this)
	    }
	    this.active = false
	    this.vm = this.cb = this.value = null
	  }
	}

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {Object} obj
	 */

	function traverse (obj) {
	  var key, val, i
	  for (key in obj) {
	    val = obj[key]
	    if (_.isArray(val)) {
	      i = val.length
	      while (i--) traverse(val[i])
	    } else if (_.isObject(val)) {
	      traverse(val)
	    }
	  }
	}

	module.exports = Watcher

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var uid = 0

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */

	function Dep () {
	  this.id = uid++
	  this.subs = []
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub)
	}

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub)
	}

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this)
	}

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = _.toArray(this.subs)
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update()
	  }
	}

	module.exports = Dep


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var Path = __webpack_require__(45)
	var Cache = __webpack_require__(9)
	var notevil = __webpack_require__(46)
	var expressionCache = new Cache(1000)

	var allowedKeywords =
	  'Math,Date,this,true,false,null,undefined,Infinity,NaN,' +
	  'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' +
	  'encodeURIComponent,parseInt,parseFloat'
	var allowedKeywordsRE =
	  new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)')

	// keywords that don't make sense inside expressions
	var improperKeywords =
	  'break,case,class,catch,const,continue,debugger,default,' +
	  'delete,do,else,export,extends,finally,for,function,if,' +
	  'import,in,instanceof,let,return,super,switch,throw,try,' +
	  'var,while,with,yield,enum,await,implements,package,' +
	  'proctected,static,interface,private,public'
	var improperKeywordsRE =
	  new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)')

	var wsRE = /\s/g
	var newlineRE = /\n/g
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('[^']*'|"[^"]*")|new |typeof |void /g
	var restoreRE = /"(\d+)"/g
	var pathTestRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/
	var pathReplaceRE = /[^\w$\.]([A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\])*)/g
	var booleanLiteralRE = /^(true|false)$/

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = []

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save (str, isString) {
	  var i = saved.length
	  saved[i] = isString
	    ? str.replace(newlineRE, '\\n')
	    : str
	  return '"' + i + '"'
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite (raw) {
	  var c = raw.charAt(0)
	  var path = raw.slice(1)
	  if (allowedKeywordsRE.test(path)) {
	    return raw
	  } else {
	    path = path.indexOf('"') > -1
	      ? path.replace(restoreRE, restore)
	      : path
	    return c + 'scope.' + path
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore (str, i) {
	  return saved[i]
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function compileExpFns (exp, needSet) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Avoid using reserved keywords in expression: ' + exp
	    )
	  }
	  // reset state
	  saved.length = 0
	  // save strings and object literal keys
	  var body = exp
	    .replace(saveRE, save)
	    .replace(wsRE, '')
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body)
	    .replace(pathReplaceRE, rewrite)
	    .replace(restoreRE, restore)
	  var getter = makeGetter(body)
	  if (getter) {
	    return {
	      get: getter,
	      body: body,
	      set: needSet
	        ? makeSetter(body)
	        : null
	    }
	  }
	}

	/**
	 * Compile getter setters for a simple path.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compilePathFns (exp) {
	  var getter, path
	  if (exp.indexOf('[') < 0) {
	    // really simple path
	    path = exp.split('.')
	    path.raw = exp
	    getter = Path.compileGetter(path)
	  } else {
	    // do the real parsing
	    path = Path.parse(exp)
	    getter = path.get
	  }
	  return {
	    get: getter,
	    // always generate setter for simple paths
	    set: function (obj, val) {
	      Path.set(obj, path, val)
	    }
	  }
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetter (body) {
	  try {
	    var fn = notevil.Function(
	      'scope', 'Math',
	      'return ' + body + ';'
	    )
	    return function (scope) {
	      return fn.call(this, scope, Math)
	    }
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid expression. ' +
	      'Generated function body: ' + body
	    )
	  }
	}

	/**
	 * Build a setter function.
	 *
	 * This is only needed in rare situations like "a[b]" where
	 * a settable path requires dynamic evaluation.
	 *
	 * This setter function may throw error when called if the
	 * expression body is not a valid left-hand expression in
	 * assignment.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeSetter (body) {
	  try {
	    var fn = notevil.Function(
	      'scope', 'value', 'Math',
	      body + ' = value;'
	    )
	    return function (scope, value) {
	      try {
	        fn.call(this, scope, value, Math)
	      } catch (e) {}
	    }
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid setter function body: ' + body
	    )
	  }
	}

	/**
	 * Check for setter existence on a cache hit.
	 *
	 * @param {Function} hit
	 */

	function checkSetter (hit) {
	  if (!hit.set) {
	    hit.set = makeSetter(hit.body)
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	exports.parse = function (exp, needSet) {
	  exp = exp.trim()
	  // try cache
	  var hit = expressionCache.get(exp)
	  if (hit) {
	    if (needSet) {
	      checkSetter(hit)
	    }
	    return hit
	  }
	  // we do a simple path check to optimize for them.
	  // the check fails valid paths with unusal whitespaces,
	  // but that's too rare and we don't care.
	  // also skip boolean literals and paths that start with
	  // global "Math"
	  var res = exports.isSimplePath(exp)
	    ? compilePathFns(exp)
	    : compileExpFns(exp, needSet)
	  expressionCache.put(exp, res)
	  return res
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	exports.isSimplePath = function (exp) {
	  return pathTestRE.test(exp) &&
	    // don't treat true/false as paths
	    !booleanLiteralRE.test(exp) &&
	    // Math constants e.g. Math.PI, Math.E etc.
	    exp.slice(0, 5) !== 'Math.'
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var Cache = __webpack_require__(9)
	var pathCache = new Cache(1000)
	exports.identRE = /^[$_a-zA-Z]+[\w$]*$/

	// actions
	var APPEND = 0
	var PUSH = 1

	// states
	var BEFORE_PATH = 0
	var IN_PATH = 1
	var BEFORE_IDENT = 2
	var IN_IDENT = 3
	var BEFORE_ELEMENT = 4
	var AFTER_ZERO = 5
	var IN_INDEX = 6
	var IN_SINGLE_QUOTE = 7
	var IN_DOUBLE_QUOTE = 8
	var IN_SUB_PATH = 9
	var AFTER_ELEMENT = 10
	var AFTER_PATH = 11
	var ERROR = 12

	var pathStateMachine = []

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [BEFORE_ELEMENT],
	  'eof': [AFTER_PATH]
	}

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [BEFORE_ELEMENT],
	  'eof': [AFTER_PATH]
	}

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	}

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [BEFORE_ELEMENT, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	}

	pathStateMachine[BEFORE_ELEMENT] = {
	  'ws': [BEFORE_ELEMENT],
	  '0': [AFTER_ZERO, APPEND],
	  'number': [IN_INDEX, APPEND],
	  "'": [IN_SINGLE_QUOTE, APPEND, ''],
	  '"': [IN_DOUBLE_QUOTE, APPEND, ''],
	  'ident': [IN_SUB_PATH, APPEND, '*']
	}

	pathStateMachine[AFTER_ZERO] = {
	  'ws': [AFTER_ELEMENT, PUSH],
	  ']': [IN_PATH, PUSH]
	}

	pathStateMachine[IN_INDEX] = {
	  '0': [IN_INDEX, APPEND],
	  'number': [IN_INDEX, APPEND],
	  'ws': [AFTER_ELEMENT],
	  ']': [IN_PATH, PUSH]
	}

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [AFTER_ELEMENT],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	}

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [AFTER_ELEMENT],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	}

	pathStateMachine[IN_SUB_PATH] = {
	  'ident': [IN_SUB_PATH, APPEND],
	  '0': [IN_SUB_PATH, APPEND],
	  'number': [IN_SUB_PATH, APPEND],
	  'ws': [AFTER_ELEMENT],
	  ']': [IN_PATH, PUSH]
	}

	pathStateMachine[AFTER_ELEMENT] = {
	  'ws': [AFTER_ELEMENT],
	  ']': [IN_PATH, PUSH]
	}

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType (ch) {
	  if (ch === undefined) {
	    return 'eof'
	  }

	  var code = ch.charCodeAt(0)

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30: // 0
	      return ch

	    case 0x5F: // _
	    case 0x24: // $
	      return 'ident'

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0:  // No-break space
	    case 0xFEFF:  // Byte Order Mark
	    case 0x2028:  // Line Separator
	    case 0x2029:  // Paragraph Separator
	      return 'ws'
	  }

	  // a-z, A-Z
	  if (
	    (code >= 0x61 && code <= 0x7A) ||
	    (code >= 0x41 && code <= 0x5A)
	  ) {
	    return 'ident'
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number'
	  }

	  return 'else'
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath (path) {
	  var keys = []
	  var index = -1
	  var mode = BEFORE_PATH
	  var c, newChar, key, type, transition, action, typeMap

	  var actions = []
	  actions[PUSH] = function () {
	    if (key === undefined) {
	      return
	    }
	    keys.push(key)
	    key = undefined
	  }
	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar
	    } else {
	      key += newChar
	    }
	  }

	  function maybeUnescapeQuote () {
	    var nextChar = path[index + 1]
	    if ((mode === IN_SINGLE_QUOTE && nextChar === "'") ||
	        (mode === IN_DOUBLE_QUOTE && nextChar === '"')) {
	      index++
	      newChar = nextChar
	      actions[APPEND]()
	      return true
	    }
	  }

	  while (mode != null) {
	    index++
	    c = path[index]

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue
	    }

	    type = getPathCharType(c)
	    typeMap = pathStateMachine[mode]
	    transition = typeMap[type] || typeMap['else'] || ERROR

	    if (transition === ERROR) {
	      return // parse error
	    }

	    mode = transition[0]
	    action = actions[transition[1]]
	    if (action) {
	      newChar = transition[2]
	      newChar = newChar === undefined
	        ? c
	        : newChar === '*'
	          ? newChar + c
	          : newChar
	      action()
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path
	      return keys
	    }
	  }
	}

	/**
	 * Compiles a getter function with a fixed path.
	 * The fixed path getter supresses errors.
	 *
	 * @param {Array} path
	 * @return {Function}
	 */

	exports.compileGetter = function (path) {
	  return function get (obj) {
	    var original = obj
	    var segment
	    for (var i = 0, l = path.length; i < l; i++) {
	      segment = path[i]
	      if (segment.charAt(0) === '*') {
	        segment = original[segment.slice(1)]
	      }
	      obj = obj[segment]
	      if (i === l - 1) {
	        return obj
	      } else if (!_.isObject(obj)) {
	        return
	      }
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	exports.parse = function (path) {
	  var hit = pathCache.get(path)
	  if (!hit) {
	    hit = parsePath(path)
	    if (hit) {
	      hit.get = exports.compileGetter(hit)
	      pathCache.put(path, hit)
	    }
	  }
	  return hit
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	exports.get = function (obj, path) {
	  path = exports.parse(path)
	  if (path) {
	    return path.get(obj)
	  }
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path) {
	    _.warn(
	      'You are setting a non-existent path "' + path.raw + '" ' +
	      'on a vm instance. Consider pre-initializing the property ' +
	      'with the "data" option for more reliable reactivity ' +
	      'and better performance.'
	    )
	  }
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	exports.set = function (obj, path, val) {
	  var original = obj
	  if (typeof path === 'string') {
	    path = exports.parse(path)
	  }
	  if (!path || !_.isObject(obj)) {
	    return false
	  }
	  var last, key
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj
	    key = path[i]
	    if (key.charAt(0) === '*') {
	      key = original[key.slice(1)]
	    }
	    if (i < l - 1) {
	      obj = obj[key]
	      if (!_.isObject(obj)) {
	        obj = {}
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path)
	        }
	        _.set(last, key, obj)
	      }
	    } else {
	      if (_.isArray(obj)) {
	        obj.$set(key, val)
	      } else if (key in obj) {
	        obj[key] = val
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path)
	        }
	        _.set(obj, key, val)
	      }
	    }
	  }
	  return true
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(global) {var parse = __webpack_require__(1).parse
		var hoist = __webpack_require__(2)

		var InfiniteChecker = __webpack_require__(3)
		var Primitives = __webpack_require__(4)

		module.exports = safeEval
		module.exports.eval = safeEval
		module.exports.FunctionFactory = FunctionFactory
		module.exports.Function = FunctionFactory()

		var maxIterations = 1000000

		// 'eval' with a controlled environment
		function safeEval(src, parentContext){
		  var tree = prepareAst(src)
		  var context = Object.create(parentContext || {})
		  return finalValue(evaluateAst(tree, context))
		}

		// create a 'Function' constructor for a controlled environment
		function FunctionFactory(parentContext){
		  var context = Object.create(parentContext || {})
		  return function Function() {
		    // normalize arguments array
		    var args = Array.prototype.slice.call(arguments)
		    var src = args.slice(-1)[0]
		    args = args.slice(0,-1)
		    if (typeof src === 'string'){
		      //HACK: esprima doesn't like returns outside functions
		      src = parse('function a(){' + src + '}').body[0].body
		    }
		    var tree = prepareAst(src)
		    return getFunction(tree, args, context)
		  }
		}

		// takes an AST or js source and returns an AST
		function prepareAst(src){
		  var tree = (typeof src === 'string') ? parse(src) : src
		  return hoist(tree)
		}

		// evaluate an AST in the given context
		function evaluateAst(tree, context){

		  var safeFunction = FunctionFactory(context)
		  var primitives = Primitives(context)

		  // block scoped context for catch (ex) and 'let'
		  var blockContext = context

		  return walk(tree)

		  // recursively walk every node in an array
		  function walkAll(nodes){
		    var result = undefined
		    for (var i=0;i<nodes.length;i++){
		      var childNode = nodes[i]
		      if (childNode.type === 'EmptyStatement') continue
		      result = walk(childNode)
		      if (result instanceof ReturnValue){
		        return result
		      }
		    }
		    return result
		  }

		  // recursively evalutate the node of an AST
		  function walk(node){
		    if (!node) return
		    switch (node.type) {

		      case 'Program':
		        return walkAll(node.body)

		      case 'BlockStatement':
		        enterBlock()
		        var result = walkAll(node.body)
		        leaveBlock()
		        return result

		      case 'FunctionDeclaration':
		        var params = node.params.map(getName)
		        var value = getFunction(node.body, params, blockContext)
		        return context[node.id.name] = value

		      case 'FunctionExpression':
		        var params = node.params.map(getName)
		        return getFunction(node.body, params, blockContext)

		      case 'ReturnStatement':
		        var value = walk(node.argument)
		        return new ReturnValue('return', value)

		      case 'BreakStatement':
		        return new ReturnValue('break')

		      case 'ContinueStatement':
		        return new ReturnValue('continue')

		      case 'ExpressionStatement':
		        return walk(node.expression)

		      case 'AssignmentExpression':
		        return setValue(blockContext, node.left, node.right, node.operator)

		      case 'UpdateExpression':
		        return setValue(blockContext, node.argument, null, node.operator)

		      case 'VariableDeclaration':
		        node.declarations.forEach(function(declaration){
		          var target = node.kind === 'let' ? blockContext : context
		          if (declaration.init){
		            target[declaration.id.name] = walk(declaration.init)
		          } else {
		            target[declaration.id.name] = undefined
		          }
		        })
		        break

		      case 'SwitchStatement':
		        var defaultHandler = null
		        var matched = false
		        var value = walk(node.discriminant)
		        var result = undefined

		        enterBlock()

		        var i = 0
		        while (result == null){
		          if (i<node.cases.length){
		            if (node.cases[i].test){ // check or fall through
		              matched = matched || (walk(node.cases[i].test) === value)
		            } else if (defaultHandler == null) {
		              defaultHandler = i
		            }
		            if (matched){
		              var r = walkAll(node.cases[i].consequent)
		              if (r instanceof ReturnValue){ // break out
		                if (r.type == 'break') break
		                result = r
		              }
		            }
		            i += 1 // continue
		          } else if (!matched && defaultHandler != null){
		            // go back and do the default handler
		            i = defaultHandler
		            matched = true
		          } else {
		            // nothing we can do
		            break
		          }
		        }

		        leaveBlock()
		        return result

		      case 'IfStatement':
		        if (walk(node.test)){
		          return walk(node.consequent)
		        } else if (node.alternate) {
		          return walk(node.alternate)
		        }

		      case 'ForStatement':
		        var infinite = InfiniteChecker(maxIterations)
		        var result = undefined

		        enterBlock() // allow lets on delarations
		        for (walk(node.init); walk(node.test); walk(node.update)){
		          var r = walk(node.body)

		          // handle early return, continue and break
		          if (r instanceof ReturnValue){
		            if (r.type == 'continue') continue
		            if (r.type == 'break') break
		            result = r
		            break
		          }

		          infinite.check()
		        }
		        leaveBlock()
		        return result

		      case 'ForInStatement':
		        var infinite = InfiniteChecker(maxIterations)
		        var result = undefined

		        var value = walk(node.right)
		        var property = node.left

		        var target = context
		        enterBlock()

		        if (property.type == 'VariableDeclaration'){
		          walk(property)
		          property = property.declarations[0].id
		          if (property.kind === 'let'){
		            target = blockContext
		          }
		        }

		        for (var key in value){
		          setValue(target, property, {type: 'Literal', value: key})
		          var r = walk(node.body)

		          // handle early return, continue and break
		          if (r instanceof ReturnValue){
		            if (r.type == 'continue') continue
		            if (r.type == 'break') break
		            result = r
		            break
		          }

		          infinite.check()
		        }
		        leaveBlock()

		        return result

		      case 'WhileStatement':
		        var infinite = InfiniteChecker(maxIterations)
		        while (walk(node.test)){
		          walk(node.body)
		          infinite.check()
		        }
		        break

		      case 'TryStatement':
		        try {
		          walk(node.block)
		        } catch (error) {
		          enterBlock()
		          var catchClause = node.handlers[0]
		          if (catchClause) {
		            blockContext[catchClause.param.name] = error
		            walk(catchClause.body)
		          }
		          leaveBlock()
		        } finally {
		          if (node.finalizer) {
		            walk(node.finalizer)
		          }
		        }
		        break

		      case 'Literal':
		        return node.value

		      case 'UnaryExpression':
		        var val = walk(node.argument)
		        switch(node.operator) {
		          case '+': return +val
		          case '-': return -val
		          case '~': return ~val
		          case '!': return !val
		          case 'typeof': return typeof val
		          default: return unsupportedExpression(node)
		        }

		      case 'ArrayExpression':
		        var obj = blockContext['Array']()
		        for (var i=0;i<node.elements.length;i++){
		          obj.push(walk(node.elements[i]))
		        }
		        return obj

		      case 'ObjectExpression':
		        var obj = blockContext['Object']()
		        for (var i = 0; i < node.properties.length; i++) {
		          var prop = node.properties[i]
		          var value = (prop.value === null) ? prop.value : walk(prop.value)
		          obj[prop.key.value || prop.key.name] = value
		        }
		        return obj

		      case 'NewExpression':
		        var args = node.arguments.map(function(arg){
		          return walk(arg)
		        })
		        var target = walk(node.callee)
		        return primitives.applyNew(target, args)


		      case 'BinaryExpression':
		        var l = walk(node.left)
		        var r = walk(node.right)
		        switch(node.operator) {
		          case '==':  return l === r
		          case '===': return l === r
		          case '!=':  return l != r
		          case '!==': return l !== r
		          case '+':   return l + r
		          case '-':   return l - r
		          case '*':   return l * r
		          case '/':   return l / r
		          case '%':   return l % r
		          case '<':   return l < r
		          case '<=':  return l <= r
		          case '>':   return l > r
		          case '>=':  return l >= r
		          case '|':   return l | r
		          case '&':   return l & r
		          case '^':   return l ^ r
		          case 'instanceof': return l instanceof r
		          default: return unsupportedExpression(node)
		        }

		      case 'LogicalExpression':
		        switch(node.operator) {
		          case '&&':  return walk(node.left) && walk(node.right)
		          case '||':  return walk(node.left) || walk(node.right)
		          default: return unsupportedExpression(node)
		        }

		      case 'ThisExpression':
		        return blockContext['this']

		      case 'Identifier':
		        if (node.name === 'undefined'){
		          return undefined
		        } else if (hasProperty(blockContext, node.name, primitives)){
		          return finalValue(blockContext[node.name])
		        } else {
		          throw new ReferenceError(node.name + ' is not defined')
		        }

		      case 'CallExpression':
		        var args = node.arguments.map(function(arg){
		          return walk(arg)
		        })
		        var object = null
		        var target = walk(node.callee)

		        if (node.callee.type === 'MemberExpression'){
		          object = walk(node.callee.object)
		        }
		        return target.apply(object, args)

		      case 'MemberExpression':
		        var obj = walk(node.object)
		        if (node.computed){
		          var prop = walk(node.property)
		        } else {
		          var prop = node.property.name
		        }
		        obj = primitives.getPropertyObject(obj, prop)
		        return checkValue(obj[prop]);

		      case 'ConditionalExpression':
		        var val = walk(node.test)
		        return val ? walk(node.consequent) : walk(node.alternate)

		      case 'EmptyStatement':
		        return

		      default:
		        return unsupportedExpression(node)
		    }
		  }

		  // safely retrieve a value
		  function checkValue(value){
		    if (value === Function){
		      value = safeFunction
		    }
		    return finalValue(value)
		  }

		  // block scope context control
		  function enterBlock(){
		    blockContext = Object.create(blockContext)
		  }
		  function leaveBlock(){
		    blockContext = Object.getPrototypeOf(blockContext)
		  }

		  // set a value in the specified context if allowed
		  function setValue(object, left, right, operator){
		    var name = null

		    if (left.type === 'Identifier'){
		      name = left.name
		      // handle parent context shadowing
		      object = objectForKey(object, name, primitives)
		    } else if (left.type === 'MemberExpression'){
		      if (left.computed){
		        name = walk(left.property)
		      } else {
		        name = left.property.name
		      }
		      object = walk(left.object)
		    }

		    // stop built in properties from being able to be changed
		    if (canSetProperty(object, name, primitives)){
		      switch(operator) {
		        case undefined: return object[name] = walk(right)
		        case '=':  return object[name] = walk(right)
		        case '+=': return object[name] += walk(right)
		        case '-=': return object[name] -= walk(right)
		        case '++': return object[name]++
		        case '--': return object[name]--
		      }
		    }

		  }

		}

		// when an unsupported expression is encountered, throw an error
		function unsupportedExpression(node){
		  console.error(node)
		  var err = new Error('Unsupported expression: ' + node.type)
		  err.node = node
		  throw err
		}

		// walk a provided object's prototypal hierarchy to retrieve an inherited object
		function objectForKey(object, key, primitives){
		  var proto = primitives.getPrototypeOf(object)
		  if (!proto || hasOwnProperty(object, key)){
		    return object
		  } else {
		    return objectForKey(proto, key, primitives)
		  }
		}

		function hasProperty(object, key, primitives){
		  var proto = primitives.getPrototypeOf(object)
		  var hasOwn = hasOwnProperty(object, key)
		  if (object[key] !== undefined){
		    return true
		  } else if (!proto || hasOwn){
		    return hasOwn
		  } else {
		    return hasProperty(proto, key, primitives)
		  }
		}

		function hasOwnProperty(object, key){
		  return Object.prototype.hasOwnProperty.call(object, key)
		}

		function propertyIsEnumerable(object, key){
		  return Object.prototype.propertyIsEnumerable.call(object, key)
		}


		// determine if we have write access to a property
		function canSetProperty(object, property, primitives){
		  if (property === '__proto__' || primitives.isPrimitive(object)){
		    return false
		  } else if (object != null){

		    if (hasOwnProperty(object, property)){
		      if (propertyIsEnumerable(object, property)){
		        return true
		      } else {
		        return false
		      }
		    } else {
		      return canSetProperty(primitives.getPrototypeOf(object), property, primitives)
		    }

		  } else {
		    return true
		  }
		}

		// generate a function with specified context
		function getFunction(body, params, parentContext){
		  return function(){
		    var context = Object.create(parentContext)
		    if (this == global){
		      context['this'] = null
		    } else {
		      context['this'] = this
		    }
		    // normalize arguments array
		    var args = Array.prototype.slice.call(arguments)
		    context['arguments'] = arguments
		    args.forEach(function(arg,idx){
		      var param = params[idx]
		      if (param){
		        context[param] = arg
		      }
		    })
		    var result = evaluateAst(body, context)

		    if (result instanceof ReturnValue){
		      return result.value
		    }
		  }
		}

		function finalValue(value){
		  if (value instanceof ReturnValue){
		    return value.value
		  }
		  return value
		}

		// get the name of an identifier
		function getName(identifier){
		  return identifier.name
		}

		// a ReturnValue struct for differentiating between expression result and return statement
		function ReturnValue(type, value){
		  this.type = type
		  this.value = value
		}

		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
		  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
		  Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
		  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
		  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
		  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
		  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
		  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>

		  Redistribution and use in source and binary forms, with or without
		  modification, are permitted provided that the following conditions are met:

		    * Redistributions of source code must retain the above copyright
		      notice, this list of conditions and the following disclaimer.
		    * Redistributions in binary form must reproduce the above copyright
		      notice, this list of conditions and the following disclaimer in the
		      documentation and/or other materials provided with the distribution.

		  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
		  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
		  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
		  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
		  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
		  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
		  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
		  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
		  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
		  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		*/

		/*jslint bitwise:true plusplus:true */
		/*global esprima:true, define:true, exports:true, window: true,
		throwError: true, createLiteral: true, generateStatement: true,
		parseAssignmentExpression: true, parseBlock: true, parseExpression: true,
		parseFunctionDeclaration: true, parseFunctionExpression: true,
		parseFunctionSourceElements: true, parseVariableIdentifier: true,
		parseLeftHandSideExpression: true,
		parseStatement: true, parseSourceElement: true */

		(function (root, factory) {
		    'use strict';

		    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
		    // Rhino, and plain browser loading.
		    if (true) {
		        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		    } else if (typeof exports !== 'undefined') {
		        factory(exports);
		    } else {
		        factory((root.esprima = {}));
		    }
		}(this, function (exports) {
		    'use strict';

		    var Token,
		        TokenName,
		        Syntax,
		        PropertyKind,
		        Messages,
		        Regex,
		        source,
		        strict,
		        index,
		        lineNumber,
		        lineStart,
		        length,
		        buffer,
		        state,
		        extra;

		    Token = {
		        BooleanLiteral: 1,
		        EOF: 2,
		        Identifier: 3,
		        Keyword: 4,
		        NullLiteral: 5,
		        NumericLiteral: 6,
		        Punctuator: 7,
		        StringLiteral: 8
		    };

		    TokenName = {};
		    TokenName[Token.BooleanLiteral] = 'Boolean';
		    TokenName[Token.EOF] = '<end>';
		    TokenName[Token.Identifier] = 'Identifier';
		    TokenName[Token.Keyword] = 'Keyword';
		    TokenName[Token.NullLiteral] = 'Null';
		    TokenName[Token.NumericLiteral] = 'Numeric';
		    TokenName[Token.Punctuator] = 'Punctuator';
		    TokenName[Token.StringLiteral] = 'String';

		    Syntax = {
		        AssignmentExpression: 'AssignmentExpression',
		        ArrayExpression: 'ArrayExpression',
		        BlockStatement: 'BlockStatement',
		        BinaryExpression: 'BinaryExpression',
		        BreakStatement: 'BreakStatement',
		        CallExpression: 'CallExpression',
		        CatchClause: 'CatchClause',
		        ConditionalExpression: 'ConditionalExpression',
		        ContinueStatement: 'ContinueStatement',
		        DoWhileStatement: 'DoWhileStatement',
		        DebuggerStatement: 'DebuggerStatement',
		        EmptyStatement: 'EmptyStatement',
		        ExpressionStatement: 'ExpressionStatement',
		        ForStatement: 'ForStatement',
		        ForInStatement: 'ForInStatement',
		        FunctionDeclaration: 'FunctionDeclaration',
		        FunctionExpression: 'FunctionExpression',
		        Identifier: 'Identifier',
		        IfStatement: 'IfStatement',
		        Literal: 'Literal',
		        LabeledStatement: 'LabeledStatement',
		        LogicalExpression: 'LogicalExpression',
		        MemberExpression: 'MemberExpression',
		        NewExpression: 'NewExpression',
		        ObjectExpression: 'ObjectExpression',
		        Program: 'Program',
		        Property: 'Property',
		        ReturnStatement: 'ReturnStatement',
		        SequenceExpression: 'SequenceExpression',
		        SwitchStatement: 'SwitchStatement',
		        SwitchCase: 'SwitchCase',
		        ThisExpression: 'ThisExpression',
		        ThrowStatement: 'ThrowStatement',
		        TryStatement: 'TryStatement',
		        UnaryExpression: 'UnaryExpression',
		        UpdateExpression: 'UpdateExpression',
		        VariableDeclaration: 'VariableDeclaration',
		        VariableDeclarator: 'VariableDeclarator',
		        WhileStatement: 'WhileStatement',
		        WithStatement: 'WithStatement'
		    };

		    PropertyKind = {
		        Data: 1,
		        Get: 2,
		        Set: 4
		    };

		    // Error messages should be identical to V8.
		    Messages = {
		        UnexpectedToken:  'Unexpected token %0',
		        UnexpectedNumber:  'Unexpected number',
		        UnexpectedString:  'Unexpected string',
		        UnexpectedIdentifier:  'Unexpected identifier',
		        UnexpectedReserved:  'Unexpected reserved word',
		        UnexpectedEOS:  'Unexpected end of input',
		        NewlineAfterThrow:  'Illegal newline after throw',
		        InvalidRegExp: 'Invalid regular expression',
		        UnterminatedRegExp:  'Invalid regular expression: missing /',
		        InvalidLHSInAssignment:  'Invalid left-hand side in assignment',
		        InvalidLHSInForIn:  'Invalid left-hand side in for-in',
		        MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
		        NoCatchOrFinally:  'Missing catch or finally after try',
		        UnknownLabel: 'Undefined label \'%0\'',
		        Redeclaration: '%0 \'%1\' has already been declared',
		        IllegalContinue: 'Illegal continue statement',
		        IllegalBreak: 'Illegal break statement',
		        IllegalReturn: 'Illegal return statement',
		        StrictModeWith:  'Strict mode code may not include a with statement',
		        StrictCatchVariable:  'Catch variable may not be eval or arguments in strict mode',
		        StrictVarName:  'Variable name may not be eval or arguments in strict mode',
		        StrictParamName:  'Parameter name eval or arguments is not allowed in strict mode',
		        StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
		        StrictFunctionName:  'Function name may not be eval or arguments in strict mode',
		        StrictOctalLiteral:  'Octal literals are not allowed in strict mode.',
		        StrictDelete:  'Delete of an unqualified identifier in strict mode.',
		        StrictDuplicateProperty:  'Duplicate data property in object literal not allowed in strict mode',
		        AccessorDataProperty:  'Object literal may not have data and accessor property with the same name',
		        AccessorGetSet:  'Object literal may not have multiple get/set accessors with the same name',
		        StrictLHSAssignment:  'Assignment to eval or arguments is not allowed in strict mode',
		        StrictLHSPostfix:  'Postfix increment/decrement may not have eval or arguments operand in strict mode',
		        StrictLHSPrefix:  'Prefix increment/decrement may not have eval or arguments operand in strict mode',
		        StrictReservedWord:  'Use of future reserved word in strict mode'
		    };

		    // See also tools/generate-unicode-regex.py.
		    Regex = {
		        NonAsciiIdentifierStart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]'),
		        NonAsciiIdentifierPart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]')
		    };

		    // Ensure the condition is true, otherwise throw an error.
		    // This is only to have a better contract semantic, i.e. another safety net
		    // to catch a logic error. The condition shall be fulfilled in normal case.
		    // Do NOT use this to enforce a certain condition on any user input.

		    function assert(condition, message) {
		        if (!condition) {
		            throw new Error('ASSERT: ' + message);
		        }
		    }

		    function sliceSource(from, to) {
		        return source.slice(from, to);
		    }

		    if (typeof 'esprima'[0] === 'undefined') {
		        sliceSource = function sliceArraySource(from, to) {
		            return source.slice(from, to).join('');
		        };
		    }

		    function isDecimalDigit(ch) {
		        return '0123456789'.indexOf(ch) >= 0;
		    }

		    function isHexDigit(ch) {
		        return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
		    }

		    function isOctalDigit(ch) {
		        return '01234567'.indexOf(ch) >= 0;
		    }


		    // 7.2 White Space

		    function isWhiteSpace(ch) {
		        return (ch === ' ') || (ch === '\u0009') || (ch === '\u000B') ||
		            (ch === '\u000C') || (ch === '\u00A0') ||
		            (ch.charCodeAt(0) >= 0x1680 &&
		             '\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\uFEFF'.indexOf(ch) >= 0);
		    }

		    // 7.3 Line Terminators

		    function isLineTerminator(ch) {
		        return (ch === '\n' || ch === '\r' || ch === '\u2028' || ch === '\u2029');
		    }

		    // 7.6 Identifier Names and Identifiers

		    function isIdentifierStart(ch) {
		        return (ch === '$') || (ch === '_') || (ch === '\\') ||
		            (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') ||
		            ((ch.charCodeAt(0) >= 0x80) && Regex.NonAsciiIdentifierStart.test(ch));
		    }

		    function isIdentifierPart(ch) {
		        return (ch === '$') || (ch === '_') || (ch === '\\') ||
		            (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') ||
		            ((ch >= '0') && (ch <= '9')) ||
		            ((ch.charCodeAt(0) >= 0x80) && Regex.NonAsciiIdentifierPart.test(ch));
		    }

		    // 7.6.1.2 Future Reserved Words

		    function isFutureReservedWord(id) {
		        switch (id) {

		        // Future reserved words.
		        case 'class':
		        case 'enum':
		        case 'export':
		        case 'extends':
		        case 'import':
		        case 'super':
		            return true;
		        }

		        return false;
		    }

		    function isStrictModeReservedWord(id) {
		        switch (id) {

		        // Strict Mode reserved words.
		        case 'implements':
		        case 'interface':
		        case 'package':
		        case 'private':
		        case 'protected':
		        case 'public':
		        case 'static':
		        case 'yield':
		        case 'let':
		            return true;
		        }

		        return false;
		    }

		    function isRestrictedWord(id) {
		        return id === 'eval' || id === 'arguments';
		    }

		    // 7.6.1.1 Keywords

		    function isKeyword(id) {
		        var keyword = false;
		        switch (id.length) {
		        case 2:
		            keyword = (id === 'if') || (id === 'in') || (id === 'do');
		            break;
		        case 3:
		            keyword = (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try');
		            break;
		        case 4:
		            keyword = (id === 'this') || (id === 'else') || (id === 'case') || (id === 'void') || (id === 'with');
		            break;
		        case 5:
		            keyword = (id === 'while') || (id === 'break') || (id === 'catch') || (id === 'throw');
		            break;
		        case 6:
		            keyword = (id === 'return') || (id === 'typeof') || (id === 'delete') || (id === 'switch');
		            break;
		        case 7:
		            keyword = (id === 'default') || (id === 'finally');
		            break;
		        case 8:
		            keyword = (id === 'function') || (id === 'continue') || (id === 'debugger');
		            break;
		        case 10:
		            keyword = (id === 'instanceof');
		            break;
		        }

		        if (keyword) {
		            return true;
		        }

		        switch (id) {
		        // Future reserved words.
		        // 'const' is specialized as Keyword in V8.
		        case 'const':
		            return true;

		        // For compatiblity to SpiderMonkey and ES.next
		        case 'yield':
		        case 'let':
		            return true;
		        }

		        if (strict && isStrictModeReservedWord(id)) {
		            return true;
		        }

		        return isFutureReservedWord(id);
		    }

		    // 7.4 Comments

		    function skipComment() {
		        var ch, blockComment, lineComment;

		        blockComment = false;
		        lineComment = false;

		        while (index < length) {
		            ch = source[index];

		            if (lineComment) {
		                ch = source[index++];
		                if (isLineTerminator(ch)) {
		                    lineComment = false;
		                    if (ch === '\r' && source[index] === '\n') {
		                        ++index;
		                    }
		                    ++lineNumber;
		                    lineStart = index;
		                }
		            } else if (blockComment) {
		                if (isLineTerminator(ch)) {
		                    if (ch === '\r' && source[index + 1] === '\n') {
		                        ++index;
		                    }
		                    ++lineNumber;
		                    ++index;
		                    lineStart = index;
		                    if (index >= length) {
		                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		                    }
		                } else {
		                    ch = source[index++];
		                    if (index >= length) {
		                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		                    }
		                    if (ch === '*') {
		                        ch = source[index];
		                        if (ch === '/') {
		                            ++index;
		                            blockComment = false;
		                        }
		                    }
		                }
		            } else if (ch === '/') {
		                ch = source[index + 1];
		                if (ch === '/') {
		                    index += 2;
		                    lineComment = true;
		                } else if (ch === '*') {
		                    index += 2;
		                    blockComment = true;
		                    if (index >= length) {
		                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		                    }
		                } else {
		                    break;
		                }
		            } else if (isWhiteSpace(ch)) {
		                ++index;
		            } else if (isLineTerminator(ch)) {
		                ++index;
		                if (ch ===  '\r' && source[index] === '\n') {
		                    ++index;
		                }
		                ++lineNumber;
		                lineStart = index;
		            } else {
		                break;
		            }
		        }
		    }

		    function scanHexEscape(prefix) {
		        var i, len, ch, code = 0;

		        len = (prefix === 'u') ? 4 : 2;
		        for (i = 0; i < len; ++i) {
		            if (index < length && isHexDigit(source[index])) {
		                ch = source[index++];
		                code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
		            } else {
		                return '';
		            }
		        }
		        return String.fromCharCode(code);
		    }

		    function scanIdentifier() {
		        var ch, start, id, restore;

		        ch = source[index];
		        if (!isIdentifierStart(ch)) {
		            return;
		        }

		        start = index;
		        if (ch === '\\') {
		            ++index;
		            if (source[index] !== 'u') {
		                return;
		            }
		            ++index;
		            restore = index;
		            ch = scanHexEscape('u');
		            if (ch) {
		                if (ch === '\\' || !isIdentifierStart(ch)) {
		                    return;
		                }
		                id = ch;
		            } else {
		                index = restore;
		                id = 'u';
		            }
		        } else {
		            id = source[index++];
		        }

		        while (index < length) {
		            ch = source[index];
		            if (!isIdentifierPart(ch)) {
		                break;
		            }
		            if (ch === '\\') {
		                ++index;
		                if (source[index] !== 'u') {
		                    return;
		                }
		                ++index;
		                restore = index;
		                ch = scanHexEscape('u');
		                if (ch) {
		                    if (ch === '\\' || !isIdentifierPart(ch)) {
		                        return;
		                    }
		                    id += ch;
		                } else {
		                    index = restore;
		                    id += 'u';
		                }
		            } else {
		                id += source[index++];
		            }
		        }

		        // There is no keyword or literal with only one character.
		        // Thus, it must be an identifier.
		        if (id.length === 1) {
		            return {
		                type: Token.Identifier,
		                value: id,
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [start, index]
		            };
		        }

		        if (isKeyword(id)) {
		            return {
		                type: Token.Keyword,
		                value: id,
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [start, index]
		            };
		        }

		        // 7.8.1 Null Literals

		        if (id === 'null') {
		            return {
		                type: Token.NullLiteral,
		                value: id,
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [start, index]
		            };
		        }

		        // 7.8.2 Boolean Literals

		        if (id === 'true' || id === 'false') {
		            return {
		                type: Token.BooleanLiteral,
		                value: id,
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [start, index]
		            };
		        }

		        return {
		            type: Token.Identifier,
		            value: id,
		            lineNumber: lineNumber,
		            lineStart: lineStart,
		            range: [start, index]
		        };
		    }

		    // 7.7 Punctuators

		    function scanPunctuator() {
		        var start = index,
		            ch1 = source[index],
		            ch2,
		            ch3,
		            ch4;

		        // Check for most common single-character punctuators.

		        if (ch1 === ';' || ch1 === '{' || ch1 === '}') {
		            ++index;
		            return {
		                type: Token.Punctuator,
		                value: ch1,
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [start, index]
		            };
		        }

		        if (ch1 === ',' || ch1 === '(' || ch1 === ')') {
		            ++index;
		            return {
		                type: Token.Punctuator,
		                value: ch1,
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [start, index]
		            };
		        }

		        // Dot (.) can also start a floating-point number, hence the need
		        // to check the next character.

		        ch2 = source[index + 1];
		        if (ch1 === '.' && !isDecimalDigit(ch2)) {
		            return {
		                type: Token.Punctuator,
		                value: source[index++],
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [start, index]
		            };
		        }

		        // Peek more characters.

		        ch3 = source[index + 2];
		        ch4 = source[index + 3];

		        // 4-character punctuator: >>>=

		        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
		            if (ch4 === '=') {
		                index += 4;
		                return {
		                    type: Token.Punctuator,
		                    value: '>>>=',
		                    lineNumber: lineNumber,
		                    lineStart: lineStart,
		                    range: [start, index]
		                };
		            }
		        }

		        // 3-character punctuators: === !== >>> <<= >>=

		        if (ch1 === '=' && ch2 === '=' && ch3 === '=') {
		            index += 3;
		            return {
		                type: Token.Punctuator,
		                value: '===',
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [start, index]
		            };
		        }

		        if (ch1 === '!' && ch2 === '=' && ch3 === '=') {
		            index += 3;
		            return {
		                type: Token.Punctuator,
		                value: '!==',
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [start, index]
		            };
		        }

		        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
		            index += 3;
		            return {
		                type: Token.Punctuator,
		                value: '>>>',
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [start, index]
		            };
		        }

		        if (ch1 === '<' && ch2 === '<' && ch3 === '=') {
		            index += 3;
		            return {
		                type: Token.Punctuator,
		                value: '<<=',
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [start, index]
		            };
		        }

		        if (ch1 === '>' && ch2 === '>' && ch3 === '=') {
		            index += 3;
		            return {
		                type: Token.Punctuator,
		                value: '>>=',
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [start, index]
		            };
		        }

		        // 2-character punctuators: <= >= == != ++ -- << >> && ||
		        // += -= *= %= &= |= ^= /=

		        if (ch2 === '=') {
		            if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
		                index += 2;
		                return {
		                    type: Token.Punctuator,
		                    value: ch1 + ch2,
		                    lineNumber: lineNumber,
		                    lineStart: lineStart,
		                    range: [start, index]
		                };
		            }
		        }

		        if (ch1 === ch2 && ('+-<>&|'.indexOf(ch1) >= 0)) {
		            if ('+-<>&|'.indexOf(ch2) >= 0) {
		                index += 2;
		                return {
		                    type: Token.Punctuator,
		                    value: ch1 + ch2,
		                    lineNumber: lineNumber,
		                    lineStart: lineStart,
		                    range: [start, index]
		                };
		            }
		        }

		        // The remaining 1-character punctuators.

		        if ('[]<>+-*%&|^!~?:=/'.indexOf(ch1) >= 0) {
		            return {
		                type: Token.Punctuator,
		                value: source[index++],
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [start, index]
		            };
		        }
		    }

		    // 7.8.3 Numeric Literals

		    function scanNumericLiteral() {
		        var number, start, ch;

		        ch = source[index];
		        assert(isDecimalDigit(ch) || (ch === '.'),
		            'Numeric literal must start with a decimal digit or a decimal point');

		        start = index;
		        number = '';
		        if (ch !== '.') {
		            number = source[index++];
		            ch = source[index];

		            // Hex number starts with '0x'.
		            // Octal number starts with '0'.
		            if (number === '0') {
		                if (ch === 'x' || ch === 'X') {
		                    number += source[index++];
		                    while (index < length) {
		                        ch = source[index];
		                        if (!isHexDigit(ch)) {
		                            break;
		                        }
		                        number += source[index++];
		                    }

		                    if (number.length <= 2) {
		                        // only 0x
		                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		                    }

		                    if (index < length) {
		                        ch = source[index];
		                        if (isIdentifierStart(ch)) {
		                            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		                        }
		                    }
		                    return {
		                        type: Token.NumericLiteral,
		                        value: parseInt(number, 16),
		                        lineNumber: lineNumber,
		                        lineStart: lineStart,
		                        range: [start, index]
		                    };
		                } else if (isOctalDigit(ch)) {
		                    number += source[index++];
		                    while (index < length) {
		                        ch = source[index];
		                        if (!isOctalDigit(ch)) {
		                            break;
		                        }
		                        number += source[index++];
		                    }

		                    if (index < length) {
		                        ch = source[index];
		                        if (isIdentifierStart(ch) || isDecimalDigit(ch)) {
		                            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		                        }
		                    }
		                    return {
		                        type: Token.NumericLiteral,
		                        value: parseInt(number, 8),
		                        octal: true,
		                        lineNumber: lineNumber,
		                        lineStart: lineStart,
		                        range: [start, index]
		                    };
		                }

		                // decimal number starts with '0' such as '09' is illegal.
		                if (isDecimalDigit(ch)) {
		                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		                }
		            }

		            while (index < length) {
		                ch = source[index];
		                if (!isDecimalDigit(ch)) {
		                    break;
		                }
		                number += source[index++];
		            }
		        }

		        if (ch === '.') {
		            number += source[index++];
		            while (index < length) {
		                ch = source[index];
		                if (!isDecimalDigit(ch)) {
		                    break;
		                }
		                number += source[index++];
		            }
		        }

		        if (ch === 'e' || ch === 'E') {
		            number += source[index++];

		            ch = source[index];
		            if (ch === '+' || ch === '-') {
		                number += source[index++];
		            }

		            ch = source[index];
		            if (isDecimalDigit(ch)) {
		                number += source[index++];
		                while (index < length) {
		                    ch = source[index];
		                    if (!isDecimalDigit(ch)) {
		                        break;
		                    }
		                    number += source[index++];
		                }
		            } else {
		                ch = 'character ' + ch;
		                if (index >= length) {
		                    ch = '<end>';
		                }
		                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		            }
		        }

		        if (index < length) {
		            ch = source[index];
		            if (isIdentifierStart(ch)) {
		                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		            }
		        }

		        return {
		            type: Token.NumericLiteral,
		            value: parseFloat(number),
		            lineNumber: lineNumber,
		            lineStart: lineStart,
		            range: [start, index]
		        };
		    }

		    // 7.8.4 String Literals

		    function scanStringLiteral() {
		        var str = '', quote, start, ch, code, unescaped, restore, octal = false;

		        quote = source[index];
		        assert((quote === '\'' || quote === '"'),
		            'String literal must starts with a quote');

		        start = index;
		        ++index;

		        while (index < length) {
		            ch = source[index++];

		            if (ch === quote) {
		                quote = '';
		                break;
		            } else if (ch === '\\') {
		                ch = source[index++];
		                if (!isLineTerminator(ch)) {
		                    switch (ch) {
		                    case 'n':
		                        str += '\n';
		                        break;
		                    case 'r':
		                        str += '\r';
		                        break;
		                    case 't':
		                        str += '\t';
		                        break;
		                    case 'u':
		                    case 'x':
		                        restore = index;
		                        unescaped = scanHexEscape(ch);
		                        if (unescaped) {
		                            str += unescaped;
		                        } else {
		                            index = restore;
		                            str += ch;
		                        }
		                        break;
		                    case 'b':
		                        str += '\b';
		                        break;
		                    case 'f':
		                        str += '\f';
		                        break;
		                    case 'v':
		                        str += '\x0B';
		                        break;

		                    default:
		                        if (isOctalDigit(ch)) {
		                            code = '01234567'.indexOf(ch);

		                            // \0 is not octal escape sequence
		                            if (code !== 0) {
		                                octal = true;
		                            }

		                            if (index < length && isOctalDigit(source[index])) {
		                                octal = true;
		                                code = code * 8 + '01234567'.indexOf(source[index++]);

		                                // 3 digits are only allowed when string starts
		                                // with 0, 1, 2, 3
		                                if ('0123'.indexOf(ch) >= 0 &&
		                                        index < length &&
		                                        isOctalDigit(source[index])) {
		                                    code = code * 8 + '01234567'.indexOf(source[index++]);
		                                }
		                            }
		                            str += String.fromCharCode(code);
		                        } else {
		                            str += ch;
		                        }
		                        break;
		                    }
		                } else {
		                    ++lineNumber;
		                    if (ch ===  '\r' && source[index] === '\n') {
		                        ++index;
		                    }
		                }
		            } else if (isLineTerminator(ch)) {
		                break;
		            } else {
		                str += ch;
		            }
		        }

		        if (quote !== '') {
		            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		        }

		        return {
		            type: Token.StringLiteral,
		            value: str,
		            octal: octal,
		            lineNumber: lineNumber,
		            lineStart: lineStart,
		            range: [start, index]
		        };
		    }

		    function scanRegExp() {
		        var str, ch, start, pattern, flags, value, classMarker = false, restore, terminated = false;

		        buffer = null;
		        skipComment();

		        start = index;
		        ch = source[index];
		        assert(ch === '/', 'Regular expression literal must start with a slash');
		        str = source[index++];

		        while (index < length) {
		            ch = source[index++];
		            str += ch;
		            if (ch === '\\') {
		                ch = source[index++];
		                // ECMA-262 7.8.5
		                if (isLineTerminator(ch)) {
		                    throwError({}, Messages.UnterminatedRegExp);
		                }
		                str += ch;
		            } else if (classMarker) {
		                if (ch === ']') {
		                    classMarker = false;
		                }
		            } else {
		                if (ch === '/') {
		                    terminated = true;
		                    break;
		                } else if (ch === '[') {
		                    classMarker = true;
		                } else if (isLineTerminator(ch)) {
		                    throwError({}, Messages.UnterminatedRegExp);
		                }
		            }
		        }

		        if (!terminated) {
		            throwError({}, Messages.UnterminatedRegExp);
		        }

		        // Exclude leading and trailing slash.
		        pattern = str.substr(1, str.length - 2);

		        flags = '';
		        while (index < length) {
		            ch = source[index];
		            if (!isIdentifierPart(ch)) {
		                break;
		            }

		            ++index;
		            if (ch === '\\' && index < length) {
		                ch = source[index];
		                if (ch === 'u') {
		                    ++index;
		                    restore = index;
		                    ch = scanHexEscape('u');
		                    if (ch) {
		                        flags += ch;
		                        str += '\\u';
		                        for (; restore < index; ++restore) {
		                            str += source[restore];
		                        }
		                    } else {
		                        index = restore;
		                        flags += 'u';
		                        str += '\\u';
		                    }
		                } else {
		                    str += '\\';
		                }
		            } else {
		                flags += ch;
		                str += ch;
		            }
		        }

		        try {
		            value = new RegExp(pattern, flags);
		        } catch (e) {
		            throwError({}, Messages.InvalidRegExp);
		        }

		        return {
		            literal: str,
		            value: value,
		            range: [start, index]
		        };
		    }

		    function isIdentifierName(token) {
		        return token.type === Token.Identifier ||
		            token.type === Token.Keyword ||
		            token.type === Token.BooleanLiteral ||
		            token.type === Token.NullLiteral;
		    }

		    function advance() {
		        var ch, token;

		        skipComment();

		        if (index >= length) {
		            return {
		                type: Token.EOF,
		                lineNumber: lineNumber,
		                lineStart: lineStart,
		                range: [index, index]
		            };
		        }

		        token = scanPunctuator();
		        if (typeof token !== 'undefined') {
		            return token;
		        }

		        ch = source[index];

		        if (ch === '\'' || ch === '"') {
		            return scanStringLiteral();
		        }

		        if (ch === '.' || isDecimalDigit(ch)) {
		            return scanNumericLiteral();
		        }

		        token = scanIdentifier();
		        if (typeof token !== 'undefined') {
		            return token;
		        }

		        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		    }

		    function lex() {
		        var token;

		        if (buffer) {
		            index = buffer.range[1];
		            lineNumber = buffer.lineNumber;
		            lineStart = buffer.lineStart;
		            token = buffer;
		            buffer = null;
		            return token;
		        }

		        buffer = null;
		        return advance();
		    }

		    function lookahead() {
		        var pos, line, start;

		        if (buffer !== null) {
		            return buffer;
		        }

		        pos = index;
		        line = lineNumber;
		        start = lineStart;
		        buffer = advance();
		        index = pos;
		        lineNumber = line;
		        lineStart = start;

		        return buffer;
		    }

		    // Return true if there is a line terminator before the next token.

		    function peekLineTerminator() {
		        var pos, line, start, found;

		        pos = index;
		        line = lineNumber;
		        start = lineStart;
		        skipComment();
		        found = lineNumber !== line;
		        index = pos;
		        lineNumber = line;
		        lineStart = start;

		        return found;
		    }

		    // Throw an exception

		    function throwError(token, messageFormat) {
		        var error,
		            args = Array.prototype.slice.call(arguments, 2),
		            msg = messageFormat.replace(
		                /%(\d)/g,
		                function (whole, index) {
		                    return args[index] || '';
		                }
		            );

		        if (typeof token.lineNumber === 'number') {
		            error = new Error('Line ' + token.lineNumber + ': ' + msg);
		            error.index = token.range[0];
		            error.lineNumber = token.lineNumber;
		            error.column = token.range[0] - lineStart + 1;
		        } else {
		            error = new Error('Line ' + lineNumber + ': ' + msg);
		            error.index = index;
		            error.lineNumber = lineNumber;
		            error.column = index - lineStart + 1;
		        }

		        throw error;
		    }

		    function throwErrorTolerant() {
		        try {
		            throwError.apply(null, arguments);
		        } catch (e) {
		            if (extra.errors) {
		                extra.errors.push(e);
		            } else {
		                throw e;
		            }
		        }
		    }


		    // Throw an exception because of the token.

		    function throwUnexpected(token) {
		        if (token.type === Token.EOF) {
		            throwError(token, Messages.UnexpectedEOS);
		        }

		        if (token.type === Token.NumericLiteral) {
		            throwError(token, Messages.UnexpectedNumber);
		        }

		        if (token.type === Token.StringLiteral) {
		            throwError(token, Messages.UnexpectedString);
		        }

		        if (token.type === Token.Identifier) {
		            throwError(token, Messages.UnexpectedIdentifier);
		        }

		        if (token.type === Token.Keyword) {
		            if (isFutureReservedWord(token.value)) {
		                throwError(token, Messages.UnexpectedReserved);
		            } else if (strict && isStrictModeReservedWord(token.value)) {
		                throwErrorTolerant(token, Messages.StrictReservedWord);
		                return;
		            }
		            throwError(token, Messages.UnexpectedToken, token.value);
		        }

		        // BooleanLiteral, NullLiteral, or Punctuator.
		        throwError(token, Messages.UnexpectedToken, token.value);
		    }

		    // Expect the next token to match the specified punctuator.
		    // If not, an exception will be thrown.

		    function expect(value) {
		        var token = lex();
		        if (token.type !== Token.Punctuator || token.value !== value) {
		            throwUnexpected(token);
		        }
		    }

		    // Expect the next token to match the specified keyword.
		    // If not, an exception will be thrown.

		    function expectKeyword(keyword) {
		        var token = lex();
		        if (token.type !== Token.Keyword || token.value !== keyword) {
		            throwUnexpected(token);
		        }
		    }

		    // Return true if the next token matches the specified punctuator.

		    function match(value) {
		        var token = lookahead();
		        return token.type === Token.Punctuator && token.value === value;
		    }

		    // Return true if the next token matches the specified keyword

		    function matchKeyword(keyword) {
		        var token = lookahead();
		        return token.type === Token.Keyword && token.value === keyword;
		    }

		    // Return true if the next token is an assignment operator

		    function matchAssign() {
		        var token = lookahead(),
		            op = token.value;

		        if (token.type !== Token.Punctuator) {
		            return false;
		        }
		        return op === '=' ||
		            op === '*=' ||
		            op === '/=' ||
		            op === '%=' ||
		            op === '+=' ||
		            op === '-=' ||
		            op === '<<=' ||
		            op === '>>=' ||
		            op === '>>>=' ||
		            op === '&=' ||
		            op === '^=' ||
		            op === '|=';
		    }

		    function consumeSemicolon() {
		        var token, line;

		        // Catch the very common case first.
		        if (source[index] === ';') {
		            lex();
		            return;
		        }

		        line = lineNumber;
		        skipComment();
		        if (lineNumber !== line) {
		            return;
		        }

		        if (match(';')) {
		            lex();
		            return;
		        }

		        token = lookahead();
		        if (token.type !== Token.EOF && !match('}')) {
		            throwUnexpected(token);
		        }
		    }

		    // Return true if provided expression is LeftHandSideExpression

		    function isLeftHandSide(expr) {
		        return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
		    }

		    // 11.1.4 Array Initialiser

		    function parseArrayInitialiser() {
		        var elements = [];

		        expect('[');

		        while (!match(']')) {
		            if (match(',')) {
		                lex();
		                elements.push(null);
		            } else {
		                elements.push(parseAssignmentExpression());

		                if (!match(']')) {
		                    expect(',');
		                }
		            }
		        }

		        expect(']');

		        return {
		            type: Syntax.ArrayExpression,
		            elements: elements
		        };
		    }

		    // 11.1.5 Object Initialiser

		    function parsePropertyFunction(param, first) {
		        var previousStrict, body;

		        previousStrict = strict;
		        body = parseFunctionSourceElements();
		        if (first && strict && isRestrictedWord(param[0].name)) {
		            throwErrorTolerant(first, Messages.StrictParamName);
		        }
		        strict = previousStrict;

		        return {
		            type: Syntax.FunctionExpression,
		            id: null,
		            params: param,
		            defaults: [],
		            body: body,
		            rest: null,
		            generator: false,
		            expression: false
		        };
		    }

		    function parseObjectPropertyKey() {
		        var token = lex();

		        // Note: This function is called only from parseObjectProperty(), where
		        // EOF and Punctuator tokens are already filtered out.

		        if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
		            if (strict && token.octal) {
		                throwErrorTolerant(token, Messages.StrictOctalLiteral);
		            }
		            return createLiteral(token);
		        }

		        return {
		            type: Syntax.Identifier,
		            name: token.value
		        };
		    }

		    function parseObjectProperty() {
		        var token, key, id, param;

		        token = lookahead();

		        if (token.type === Token.Identifier) {

		            id = parseObjectPropertyKey();

		            // Property Assignment: Getter and Setter.

		            if (token.value === 'get' && !match(':')) {
		                key = parseObjectPropertyKey();
		                expect('(');
		                expect(')');
		                return {
		                    type: Syntax.Property,
		                    key: key,
		                    value: parsePropertyFunction([]),
		                    kind: 'get'
		                };
		            } else if (token.value === 'set' && !match(':')) {
		                key = parseObjectPropertyKey();
		                expect('(');
		                token = lookahead();
		                if (token.type !== Token.Identifier) {
		                    expect(')');
		                    throwErrorTolerant(token, Messages.UnexpectedToken, token.value);
		                    return {
		                        type: Syntax.Property,
		                        key: key,
		                        value: parsePropertyFunction([]),
		                        kind: 'set'
		                    };
		                } else {
		                    param = [ parseVariableIdentifier() ];
		                    expect(')');
		                    return {
		                        type: Syntax.Property,
		                        key: key,
		                        value: parsePropertyFunction(param, token),
		                        kind: 'set'
		                    };
		                }
		            } else {
		                expect(':');
		                return {
		                    type: Syntax.Property,
		                    key: id,
		                    value: parseAssignmentExpression(),
		                    kind: 'init'
		                };
		            }
		        } else if (token.type === Token.EOF || token.type === Token.Punctuator) {
		            throwUnexpected(token);
		        } else {
		            key = parseObjectPropertyKey();
		            expect(':');
		            return {
		                type: Syntax.Property,
		                key: key,
		                value: parseAssignmentExpression(),
		                kind: 'init'
		            };
		        }
		    }

		    function parseObjectInitialiser() {
		        var properties = [], property, name, kind, map = {}, toString = String;

		        expect('{');

		        while (!match('}')) {
		            property = parseObjectProperty();

		            if (property.key.type === Syntax.Identifier) {
		                name = property.key.name;
		            } else {
		                name = toString(property.key.value);
		            }
		            kind = (property.kind === 'init') ? PropertyKind.Data : (property.kind === 'get') ? PropertyKind.Get : PropertyKind.Set;
		            if (Object.prototype.hasOwnProperty.call(map, name)) {
		                if (map[name] === PropertyKind.Data) {
		                    if (strict && kind === PropertyKind.Data) {
		                        throwErrorTolerant({}, Messages.StrictDuplicateProperty);
		                    } else if (kind !== PropertyKind.Data) {
		                        throwErrorTolerant({}, Messages.AccessorDataProperty);
		                    }
		                } else {
		                    if (kind === PropertyKind.Data) {
		                        throwErrorTolerant({}, Messages.AccessorDataProperty);
		                    } else if (map[name] & kind) {
		                        throwErrorTolerant({}, Messages.AccessorGetSet);
		                    }
		                }
		                map[name] |= kind;
		            } else {
		                map[name] = kind;
		            }

		            properties.push(property);

		            if (!match('}')) {
		                expect(',');
		            }
		        }

		        expect('}');

		        return {
		            type: Syntax.ObjectExpression,
		            properties: properties
		        };
		    }

		    // 11.1.6 The Grouping Operator

		    function parseGroupExpression() {
		        var expr;

		        expect('(');

		        expr = parseExpression();

		        expect(')');

		        return expr;
		    }


		    // 11.1 Primary Expressions

		    function parsePrimaryExpression() {
		        var token = lookahead(),
		            type = token.type;

		        if (type === Token.Identifier) {
		            return {
		                type: Syntax.Identifier,
		                name: lex().value
		            };
		        }

		        if (type === Token.StringLiteral || type === Token.NumericLiteral) {
		            if (strict && token.octal) {
		                throwErrorTolerant(token, Messages.StrictOctalLiteral);
		            }
		            return createLiteral(lex());
		        }

		        if (type === Token.Keyword) {
		            if (matchKeyword('this')) {
		                lex();
		                return {
		                    type: Syntax.ThisExpression
		                };
		            }

		            if (matchKeyword('function')) {
		                return parseFunctionExpression();
		            }
		        }

		        if (type === Token.BooleanLiteral) {
		            lex();
		            token.value = (token.value === 'true');
		            return createLiteral(token);
		        }

		        if (type === Token.NullLiteral) {
		            lex();
		            token.value = null;
		            return createLiteral(token);
		        }

		        if (match('[')) {
		            return parseArrayInitialiser();
		        }

		        if (match('{')) {
		            return parseObjectInitialiser();
		        }

		        if (match('(')) {
		            return parseGroupExpression();
		        }

		        if (match('/') || match('/=')) {
		            return createLiteral(scanRegExp());
		        }

		        return throwUnexpected(lex());
		    }

		    // 11.2 Left-Hand-Side Expressions

		    function parseArguments() {
		        var args = [];

		        expect('(');

		        if (!match(')')) {
		            while (index < length) {
		                args.push(parseAssignmentExpression());
		                if (match(')')) {
		                    break;
		                }
		                expect(',');
		            }
		        }

		        expect(')');

		        return args;
		    }

		    function parseNonComputedProperty() {
		        var token = lex();

		        if (!isIdentifierName(token)) {
		            throwUnexpected(token);
		        }

		        return {
		            type: Syntax.Identifier,
		            name: token.value
		        };
		    }

		    function parseNonComputedMember() {
		        expect('.');

		        return parseNonComputedProperty();
		    }

		    function parseComputedMember() {
		        var expr;

		        expect('[');

		        expr = parseExpression();

		        expect(']');

		        return expr;
		    }

		    function parseNewExpression() {
		        var expr;

		        expectKeyword('new');

		        expr = {
		            type: Syntax.NewExpression,
		            callee: parseLeftHandSideExpression(),
		            'arguments': []
		        };

		        if (match('(')) {
		            expr['arguments'] = parseArguments();
		        }

		        return expr;
		    }

		    function parseLeftHandSideExpressionAllowCall() {
		        var expr;

		        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

		        while (match('.') || match('[') || match('(')) {
		            if (match('(')) {
		                expr = {
		                    type: Syntax.CallExpression,
		                    callee: expr,
		                    'arguments': parseArguments()
		                };
		            } else if (match('[')) {
		                expr = {
		                    type: Syntax.MemberExpression,
		                    computed: true,
		                    object: expr,
		                    property: parseComputedMember()
		                };
		            } else {
		                expr = {
		                    type: Syntax.MemberExpression,
		                    computed: false,
		                    object: expr,
		                    property: parseNonComputedMember()
		                };
		            }
		        }

		        return expr;
		    }


		    function parseLeftHandSideExpression() {
		        var expr;

		        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

		        while (match('.') || match('[')) {
		            if (match('[')) {
		                expr = {
		                    type: Syntax.MemberExpression,
		                    computed: true,
		                    object: expr,
		                    property: parseComputedMember()
		                };
		            } else {
		                expr = {
		                    type: Syntax.MemberExpression,
		                    computed: false,
		                    object: expr,
		                    property: parseNonComputedMember()
		                };
		            }
		        }

		        return expr;
		    }

		    // 11.3 Postfix Expressions

		    function parsePostfixExpression() {
		        var expr = parseLeftHandSideExpressionAllowCall(), token;

		        token = lookahead();
		        if (token.type !== Token.Punctuator) {
		            return expr;
		        }

		        if ((match('++') || match('--')) && !peekLineTerminator()) {
		            // 11.3.1, 11.3.2
		            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
		                throwErrorTolerant({}, Messages.StrictLHSPostfix);
		            }
		            if (!isLeftHandSide(expr)) {
		                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
		            }

		            expr = {
		                type: Syntax.UpdateExpression,
		                operator: lex().value,
		                argument: expr,
		                prefix: false
		            };
		        }

		        return expr;
		    }

		    // 11.4 Unary Operators

		    function parseUnaryExpression() {
		        var token, expr;

		        token = lookahead();
		        if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
		            return parsePostfixExpression();
		        }

		        if (match('++') || match('--')) {
		            token = lex();
		            expr = parseUnaryExpression();
		            // 11.4.4, 11.4.5
		            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
		                throwErrorTolerant({}, Messages.StrictLHSPrefix);
		            }

		            if (!isLeftHandSide(expr)) {
		                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
		            }

		            expr = {
		                type: Syntax.UpdateExpression,
		                operator: token.value,
		                argument: expr,
		                prefix: true
		            };
		            return expr;
		        }

		        if (match('+') || match('-') || match('~') || match('!')) {
		            expr = {
		                type: Syntax.UnaryExpression,
		                operator: lex().value,
		                argument: parseUnaryExpression(),
		                prefix: true
		            };
		            return expr;
		        }

		        if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
		            expr = {
		                type: Syntax.UnaryExpression,
		                operator: lex().value,
		                argument: parseUnaryExpression(),
		                prefix: true
		            };
		            if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
		                throwErrorTolerant({}, Messages.StrictDelete);
		            }
		            return expr;
		        }

		        return parsePostfixExpression();
		    }

		    // 11.5 Multiplicative Operators

		    function parseMultiplicativeExpression() {
		        var expr = parseUnaryExpression();

		        while (match('*') || match('/') || match('%')) {
		            expr = {
		                type: Syntax.BinaryExpression,
		                operator: lex().value,
		                left: expr,
		                right: parseUnaryExpression()
		            };
		        }

		        return expr;
		    }

		    // 11.6 Additive Operators

		    function parseAdditiveExpression() {
		        var expr = parseMultiplicativeExpression();

		        while (match('+') || match('-')) {
		            expr = {
		                type: Syntax.BinaryExpression,
		                operator: lex().value,
		                left: expr,
		                right: parseMultiplicativeExpression()
		            };
		        }

		        return expr;
		    }

		    // 11.7 Bitwise Shift Operators

		    function parseShiftExpression() {
		        var expr = parseAdditiveExpression();

		        while (match('<<') || match('>>') || match('>>>')) {
		            expr = {
		                type: Syntax.BinaryExpression,
		                operator: lex().value,
		                left: expr,
		                right: parseAdditiveExpression()
		            };
		        }

		        return expr;
		    }
		    // 11.8 Relational Operators

		    function parseRelationalExpression() {
		        var expr, previousAllowIn;

		        previousAllowIn = state.allowIn;
		        state.allowIn = true;

		        expr = parseShiftExpression();

		        while (match('<') || match('>') || match('<=') || match('>=') || (previousAllowIn && matchKeyword('in')) || matchKeyword('instanceof')) {
		            expr = {
		                type: Syntax.BinaryExpression,
		                operator: lex().value,
		                left: expr,
		                right: parseShiftExpression()
		            };
		        }

		        state.allowIn = previousAllowIn;
		        return expr;
		    }

		    // 11.9 Equality Operators

		    function parseEqualityExpression() {
		        var expr = parseRelationalExpression();

		        while (match('==') || match('!=') || match('===') || match('!==')) {
		            expr = {
		                type: Syntax.BinaryExpression,
		                operator: lex().value,
		                left: expr,
		                right: parseRelationalExpression()
		            };
		        }

		        return expr;
		    }

		    // 11.10 Binary Bitwise Operators

		    function parseBitwiseANDExpression() {
		        var expr = parseEqualityExpression();

		        while (match('&')) {
		            lex();
		            expr = {
		                type: Syntax.BinaryExpression,
		                operator: '&',
		                left: expr,
		                right: parseEqualityExpression()
		            };
		        }

		        return expr;
		    }

		    function parseBitwiseXORExpression() {
		        var expr = parseBitwiseANDExpression();

		        while (match('^')) {
		            lex();
		            expr = {
		                type: Syntax.BinaryExpression,
		                operator: '^',
		                left: expr,
		                right: parseBitwiseANDExpression()
		            };
		        }

		        return expr;
		    }

		    function parseBitwiseORExpression() {
		        var expr = parseBitwiseXORExpression();

		        while (match('|')) {
		            lex();
		            expr = {
		                type: Syntax.BinaryExpression,
		                operator: '|',
		                left: expr,
		                right: parseBitwiseXORExpression()
		            };
		        }

		        return expr;
		    }

		    // 11.11 Binary Logical Operators

		    function parseLogicalANDExpression() {
		        var expr = parseBitwiseORExpression();

		        while (match('&&')) {
		            lex();
		            expr = {
		                type: Syntax.LogicalExpression,
		                operator: '&&',
		                left: expr,
		                right: parseBitwiseORExpression()
		            };
		        }

		        return expr;
		    }

		    function parseLogicalORExpression() {
		        var expr = parseLogicalANDExpression();

		        while (match('||')) {
		            lex();
		            expr = {
		                type: Syntax.LogicalExpression,
		                operator: '||',
		                left: expr,
		                right: parseLogicalANDExpression()
		            };
		        }

		        return expr;
		    }

		    // 11.12 Conditional Operator

		    function parseConditionalExpression() {
		        var expr, previousAllowIn, consequent;

		        expr = parseLogicalORExpression();

		        if (match('?')) {
		            lex();
		            previousAllowIn = state.allowIn;
		            state.allowIn = true;
		            consequent = parseAssignmentExpression();
		            state.allowIn = previousAllowIn;
		            expect(':');

		            expr = {
		                type: Syntax.ConditionalExpression,
		                test: expr,
		                consequent: consequent,
		                alternate: parseAssignmentExpression()
		            };
		        }

		        return expr;
		    }

		    // 11.13 Assignment Operators

		    function parseAssignmentExpression() {
		        var token, expr;

		        token = lookahead();
		        expr = parseConditionalExpression();

		        if (matchAssign()) {
		            // LeftHandSideExpression
		            if (!isLeftHandSide(expr)) {
		                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
		            }

		            // 11.13.1
		            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
		                throwErrorTolerant(token, Messages.StrictLHSAssignment);
		            }

		            expr = {
		                type: Syntax.AssignmentExpression,
		                operator: lex().value,
		                left: expr,
		                right: parseAssignmentExpression()
		            };
		        }

		        return expr;
		    }

		    // 11.14 Comma Operator

		    function parseExpression() {
		        var expr = parseAssignmentExpression();

		        if (match(',')) {
		            expr = {
		                type: Syntax.SequenceExpression,
		                expressions: [ expr ]
		            };

		            while (index < length) {
		                if (!match(',')) {
		                    break;
		                }
		                lex();
		                expr.expressions.push(parseAssignmentExpression());
		            }

		        }
		        return expr;
		    }

		    // 12.1 Block

		    function parseStatementList() {
		        var list = [],
		            statement;

		        while (index < length) {
		            if (match('}')) {
		                break;
		            }
		            statement = parseSourceElement();
		            if (typeof statement === 'undefined') {
		                break;
		            }
		            list.push(statement);
		        }

		        return list;
		    }

		    function parseBlock() {
		        var block;

		        expect('{');

		        block = parseStatementList();

		        expect('}');

		        return {
		            type: Syntax.BlockStatement,
		            body: block
		        };
		    }

		    // 12.2 Variable Statement

		    function parseVariableIdentifier() {
		        var token = lex();

		        if (token.type !== Token.Identifier) {
		            throwUnexpected(token);
		        }

		        return {
		            type: Syntax.Identifier,
		            name: token.value
		        };
		    }

		    function parseVariableDeclaration(kind) {
		        var id = parseVariableIdentifier(),
		            init = null;

		        // 12.2.1
		        if (strict && isRestrictedWord(id.name)) {
		            throwErrorTolerant({}, Messages.StrictVarName);
		        }

		        if (kind === 'const') {
		            expect('=');
		            init = parseAssignmentExpression();
		        } else if (match('=')) {
		            lex();
		            init = parseAssignmentExpression();
		        }

		        return {
		            type: Syntax.VariableDeclarator,
		            id: id,
		            init: init
		        };
		    }

		    function parseVariableDeclarationList(kind) {
		        var list = [];

		        do {
		            list.push(parseVariableDeclaration(kind));
		            if (!match(',')) {
		                break;
		            }
		            lex();
		        } while (index < length);

		        return list;
		    }

		    function parseVariableStatement() {
		        var declarations;

		        expectKeyword('var');

		        declarations = parseVariableDeclarationList();

		        consumeSemicolon();

		        return {
		            type: Syntax.VariableDeclaration,
		            declarations: declarations,
		            kind: 'var'
		        };
		    }

		    // kind may be `const` or `let`
		    // Both are experimental and not in the specification yet.
		    // see http://wiki.ecmascript.org/doku.php?id=harmony:const
		    // and http://wiki.ecmascript.org/doku.php?id=harmony:let
		    function parseConstLetDeclaration(kind) {
		        var declarations;

		        expectKeyword(kind);

		        declarations = parseVariableDeclarationList(kind);

		        consumeSemicolon();

		        return {
		            type: Syntax.VariableDeclaration,
		            declarations: declarations,
		            kind: kind
		        };
		    }

		    // 12.3 Empty Statement

		    function parseEmptyStatement() {
		        expect(';');

		        return {
		            type: Syntax.EmptyStatement
		        };
		    }

		    // 12.4 Expression Statement

		    function parseExpressionStatement() {
		        var expr = parseExpression();

		        consumeSemicolon();

		        return {
		            type: Syntax.ExpressionStatement,
		            expression: expr
		        };
		    }

		    // 12.5 If statement

		    function parseIfStatement() {
		        var test, consequent, alternate;

		        expectKeyword('if');

		        expect('(');

		        test = parseExpression();

		        expect(')');

		        consequent = parseStatement();

		        if (matchKeyword('else')) {
		            lex();
		            alternate = parseStatement();
		        } else {
		            alternate = null;
		        }

		        return {
		            type: Syntax.IfStatement,
		            test: test,
		            consequent: consequent,
		            alternate: alternate
		        };
		    }

		    // 12.6 Iteration Statements

		    function parseDoWhileStatement() {
		        var body, test, oldInIteration;

		        expectKeyword('do');

		        oldInIteration = state.inIteration;
		        state.inIteration = true;

		        body = parseStatement();

		        state.inIteration = oldInIteration;

		        expectKeyword('while');

		        expect('(');

		        test = parseExpression();

		        expect(')');

		        if (match(';')) {
		            lex();
		        }

		        return {
		            type: Syntax.DoWhileStatement,
		            body: body,
		            test: test
		        };
		    }

		    function parseWhileStatement() {
		        var test, body, oldInIteration;

		        expectKeyword('while');

		        expect('(');

		        test = parseExpression();

		        expect(')');

		        oldInIteration = state.inIteration;
		        state.inIteration = true;

		        body = parseStatement();

		        state.inIteration = oldInIteration;

		        return {
		            type: Syntax.WhileStatement,
		            test: test,
		            body: body
		        };
		    }

		    function parseForVariableDeclaration() {
		        var token = lex();

		        return {
		            type: Syntax.VariableDeclaration,
		            declarations: parseVariableDeclarationList(),
		            kind: token.value
		        };
		    }

		    function parseForStatement() {
		        var init, test, update, left, right, body, oldInIteration;

		        init = test = update = null;

		        expectKeyword('for');

		        expect('(');

		        if (match(';')) {
		            lex();
		        } else {
		            if (matchKeyword('var') || matchKeyword('let')) {
		                state.allowIn = false;
		                init = parseForVariableDeclaration();
		                state.allowIn = true;

		                if (init.declarations.length === 1 && matchKeyword('in')) {
		                    lex();
		                    left = init;
		                    right = parseExpression();
		                    init = null;
		                }
		            } else {
		                state.allowIn = false;
		                init = parseExpression();
		                state.allowIn = true;

		                if (matchKeyword('in')) {
		                    // LeftHandSideExpression
		                    if (!isLeftHandSide(init)) {
		                        throwErrorTolerant({}, Messages.InvalidLHSInForIn);
		                    }

		                    lex();
		                    left = init;
		                    right = parseExpression();
		                    init = null;
		                }
		            }

		            if (typeof left === 'undefined') {
		                expect(';');
		            }
		        }

		        if (typeof left === 'undefined') {

		            if (!match(';')) {
		                test = parseExpression();
		            }
		            expect(';');

		            if (!match(')')) {
		                update = parseExpression();
		            }
		        }

		        expect(')');

		        oldInIteration = state.inIteration;
		        state.inIteration = true;

		        body = parseStatement();

		        state.inIteration = oldInIteration;

		        if (typeof left === 'undefined') {
		            return {
		                type: Syntax.ForStatement,
		                init: init,
		                test: test,
		                update: update,
		                body: body
		            };
		        }

		        return {
		            type: Syntax.ForInStatement,
		            left: left,
		            right: right,
		            body: body,
		            each: false
		        };
		    }

		    // 12.7 The continue statement

		    function parseContinueStatement() {
		        var token, label = null;

		        expectKeyword('continue');

		        // Optimize the most common form: 'continue;'.
		        if (source[index] === ';') {
		            lex();

		            if (!state.inIteration) {
		                throwError({}, Messages.IllegalContinue);
		            }

		            return {
		                type: Syntax.ContinueStatement,
		                label: null
		            };
		        }

		        if (peekLineTerminator()) {
		            if (!state.inIteration) {
		                throwError({}, Messages.IllegalContinue);
		            }

		            return {
		                type: Syntax.ContinueStatement,
		                label: null
		            };
		        }

		        token = lookahead();
		        if (token.type === Token.Identifier) {
		            label = parseVariableIdentifier();

		            if (!Object.prototype.hasOwnProperty.call(state.labelSet, label.name)) {
		                throwError({}, Messages.UnknownLabel, label.name);
		            }
		        }

		        consumeSemicolon();

		        if (label === null && !state.inIteration) {
		            throwError({}, Messages.IllegalContinue);
		        }

		        return {
		            type: Syntax.ContinueStatement,
		            label: label
		        };
		    }

		    // 12.8 The break statement

		    function parseBreakStatement() {
		        var token, label = null;

		        expectKeyword('break');

		        // Optimize the most common form: 'break;'.
		        if (source[index] === ';') {
		            lex();

		            if (!(state.inIteration || state.inSwitch)) {
		                throwError({}, Messages.IllegalBreak);
		            }

		            return {
		                type: Syntax.BreakStatement,
		                label: null
		            };
		        }

		        if (peekLineTerminator()) {
		            if (!(state.inIteration || state.inSwitch)) {
		                throwError({}, Messages.IllegalBreak);
		            }

		            return {
		                type: Syntax.BreakStatement,
		                label: null
		            };
		        }

		        token = lookahead();
		        if (token.type === Token.Identifier) {
		            label = parseVariableIdentifier();

		            if (!Object.prototype.hasOwnProperty.call(state.labelSet, label.name)) {
		                throwError({}, Messages.UnknownLabel, label.name);
		            }
		        }

		        consumeSemicolon();

		        if (label === null && !(state.inIteration || state.inSwitch)) {
		            throwError({}, Messages.IllegalBreak);
		        }

		        return {
		            type: Syntax.BreakStatement,
		            label: label
		        };
		    }

		    // 12.9 The return statement

		    function parseReturnStatement() {
		        var token, argument = null;

		        expectKeyword('return');

		        if (!state.inFunctionBody) {
		            throwErrorTolerant({}, Messages.IllegalReturn);
		        }

		        // 'return' followed by a space and an identifier is very common.
		        if (source[index] === ' ') {
		            if (isIdentifierStart(source[index + 1])) {
		                argument = parseExpression();
		                consumeSemicolon();
		                return {
		                    type: Syntax.ReturnStatement,
		                    argument: argument
		                };
		            }
		        }

		        if (peekLineTerminator()) {
		            return {
		                type: Syntax.ReturnStatement,
		                argument: null
		            };
		        }

		        if (!match(';')) {
		            token = lookahead();
		            if (!match('}') && token.type !== Token.EOF) {
		                argument = parseExpression();
		            }
		        }

		        consumeSemicolon();

		        return {
		            type: Syntax.ReturnStatement,
		            argument: argument
		        };
		    }

		    // 12.10 The with statement

		    function parseWithStatement() {
		        var object, body;

		        if (strict) {
		            throwErrorTolerant({}, Messages.StrictModeWith);
		        }

		        expectKeyword('with');

		        expect('(');

		        object = parseExpression();

		        expect(')');

		        body = parseStatement();

		        return {
		            type: Syntax.WithStatement,
		            object: object,
		            body: body
		        };
		    }

		    // 12.10 The swith statement

		    function parseSwitchCase() {
		        var test,
		            consequent = [],
		            statement;

		        if (matchKeyword('default')) {
		            lex();
		            test = null;
		        } else {
		            expectKeyword('case');
		            test = parseExpression();
		        }
		        expect(':');

		        while (index < length) {
		            if (match('}') || matchKeyword('default') || matchKeyword('case')) {
		                break;
		            }
		            statement = parseStatement();
		            if (typeof statement === 'undefined') {
		                break;
		            }
		            consequent.push(statement);
		        }

		        return {
		            type: Syntax.SwitchCase,
		            test: test,
		            consequent: consequent
		        };
		    }

		    function parseSwitchStatement() {
		        var discriminant, cases, clause, oldInSwitch, defaultFound;

		        expectKeyword('switch');

		        expect('(');

		        discriminant = parseExpression();

		        expect(')');

		        expect('{');

		        cases = [];

		        if (match('}')) {
		            lex();
		            return {
		                type: Syntax.SwitchStatement,
		                discriminant: discriminant,
		                cases: cases
		            };
		        }

		        oldInSwitch = state.inSwitch;
		        state.inSwitch = true;
		        defaultFound = false;

		        while (index < length) {
		            if (match('}')) {
		                break;
		            }
		            clause = parseSwitchCase();
		            if (clause.test === null) {
		                if (defaultFound) {
		                    throwError({}, Messages.MultipleDefaultsInSwitch);
		                }
		                defaultFound = true;
		            }
		            cases.push(clause);
		        }

		        state.inSwitch = oldInSwitch;

		        expect('}');

		        return {
		            type: Syntax.SwitchStatement,
		            discriminant: discriminant,
		            cases: cases
		        };
		    }

		    // 12.13 The throw statement

		    function parseThrowStatement() {
		        var argument;

		        expectKeyword('throw');

		        if (peekLineTerminator()) {
		            throwError({}, Messages.NewlineAfterThrow);
		        }

		        argument = parseExpression();

		        consumeSemicolon();

		        return {
		            type: Syntax.ThrowStatement,
		            argument: argument
		        };
		    }

		    // 12.14 The try statement

		    function parseCatchClause() {
		        var param;

		        expectKeyword('catch');

		        expect('(');
		        if (match(')')) {
		            throwUnexpected(lookahead());
		        }

		        param = parseVariableIdentifier();
		        // 12.14.1
		        if (strict && isRestrictedWord(param.name)) {
		            throwErrorTolerant({}, Messages.StrictCatchVariable);
		        }

		        expect(')');

		        return {
		            type: Syntax.CatchClause,
		            param: param,
		            body: parseBlock()
		        };
		    }

		    function parseTryStatement() {
		        var block, handlers = [], finalizer = null;

		        expectKeyword('try');

		        block = parseBlock();

		        if (matchKeyword('catch')) {
		            handlers.push(parseCatchClause());
		        }

		        if (matchKeyword('finally')) {
		            lex();
		            finalizer = parseBlock();
		        }

		        if (handlers.length === 0 && !finalizer) {
		            throwError({}, Messages.NoCatchOrFinally);
		        }

		        return {
		            type: Syntax.TryStatement,
		            block: block,
		            guardedHandlers: [],
		            handlers: handlers,
		            finalizer: finalizer
		        };
		    }

		    // 12.15 The debugger statement

		    function parseDebuggerStatement() {
		        expectKeyword('debugger');

		        consumeSemicolon();

		        return {
		            type: Syntax.DebuggerStatement
		        };
		    }

		    // 12 Statements

		    function parseStatement() {
		        var token = lookahead(),
		            expr,
		            labeledBody;

		        if (token.type === Token.EOF) {
		            throwUnexpected(token);
		        }

		        if (token.type === Token.Punctuator) {
		            switch (token.value) {
		            case ';':
		                return parseEmptyStatement();
		            case '{':
		                return parseBlock();
		            case '(':
		                return parseExpressionStatement();
		            default:
		                break;
		            }
		        }

		        if (token.type === Token.Keyword) {
		            switch (token.value) {
		            case 'break':
		                return parseBreakStatement();
		            case 'continue':
		                return parseContinueStatement();
		            case 'debugger':
		                return parseDebuggerStatement();
		            case 'do':
		                return parseDoWhileStatement();
		            case 'for':
		                return parseForStatement();
		            case 'function':
		                return parseFunctionDeclaration();
		            case 'if':
		                return parseIfStatement();
		            case 'return':
		                return parseReturnStatement();
		            case 'switch':
		                return parseSwitchStatement();
		            case 'throw':
		                return parseThrowStatement();
		            case 'try':
		                return parseTryStatement();
		            case 'var':
		                return parseVariableStatement();
		            case 'while':
		                return parseWhileStatement();
		            case 'with':
		                return parseWithStatement();
		            default:
		                break;
		            }
		        }

		        expr = parseExpression();

		        // 12.12 Labelled Statements
		        if ((expr.type === Syntax.Identifier) && match(':')) {
		            lex();

		            if (Object.prototype.hasOwnProperty.call(state.labelSet, expr.name)) {
		                throwError({}, Messages.Redeclaration, 'Label', expr.name);
		            }

		            state.labelSet[expr.name] = true;
		            labeledBody = parseStatement();
		            delete state.labelSet[expr.name];

		            return {
		                type: Syntax.LabeledStatement,
		                label: expr,
		                body: labeledBody
		            };
		        }

		        consumeSemicolon();

		        return {
		            type: Syntax.ExpressionStatement,
		            expression: expr
		        };
		    }

		    // 13 Function Definition

		    function parseFunctionSourceElements() {
		        var sourceElement, sourceElements = [], token, directive, firstRestricted,
		            oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody;

		        expect('{');

		        while (index < length) {
		            token = lookahead();
		            if (token.type !== Token.StringLiteral) {
		                break;
		            }

		            sourceElement = parseSourceElement();
		            sourceElements.push(sourceElement);
		            if (sourceElement.expression.type !== Syntax.Literal) {
		                // this is not directive
		                break;
		            }
		            directive = sliceSource(token.range[0] + 1, token.range[1] - 1);
		            if (directive === 'use strict') {
		                strict = true;
		                if (firstRestricted) {
		                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
		                }
		            } else {
		                if (!firstRestricted && token.octal) {
		                    firstRestricted = token;
		                }
		            }
		        }

		        oldLabelSet = state.labelSet;
		        oldInIteration = state.inIteration;
		        oldInSwitch = state.inSwitch;
		        oldInFunctionBody = state.inFunctionBody;

		        state.labelSet = {};
		        state.inIteration = false;
		        state.inSwitch = false;
		        state.inFunctionBody = true;

		        while (index < length) {
		            if (match('}')) {
		                break;
		            }
		            sourceElement = parseSourceElement();
		            if (typeof sourceElement === 'undefined') {
		                break;
		            }
		            sourceElements.push(sourceElement);
		        }

		        expect('}');

		        state.labelSet = oldLabelSet;
		        state.inIteration = oldInIteration;
		        state.inSwitch = oldInSwitch;
		        state.inFunctionBody = oldInFunctionBody;

		        return {
		            type: Syntax.BlockStatement,
		            body: sourceElements
		        };
		    }

		    function parseFunctionDeclaration() {
		        var id, param, params = [], body, token, stricted, firstRestricted, message, previousStrict, paramSet;

		        expectKeyword('function');
		        token = lookahead();
		        id = parseVariableIdentifier();
		        if (strict) {
		            if (isRestrictedWord(token.value)) {
		                throwErrorTolerant(token, Messages.StrictFunctionName);
		            }
		        } else {
		            if (isRestrictedWord(token.value)) {
		                firstRestricted = token;
		                message = Messages.StrictFunctionName;
		            } else if (isStrictModeReservedWord(token.value)) {
		                firstRestricted = token;
		                message = Messages.StrictReservedWord;
		            }
		        }

		        expect('(');

		        if (!match(')')) {
		            paramSet = {};
		            while (index < length) {
		                token = lookahead();
		                param = parseVariableIdentifier();
		                if (strict) {
		                    if (isRestrictedWord(token.value)) {
		                        stricted = token;
		                        message = Messages.StrictParamName;
		                    }
		                    if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
		                        stricted = token;
		                        message = Messages.StrictParamDupe;
		                    }
		                } else if (!firstRestricted) {
		                    if (isRestrictedWord(token.value)) {
		                        firstRestricted = token;
		                        message = Messages.StrictParamName;
		                    } else if (isStrictModeReservedWord(token.value)) {
		                        firstRestricted = token;
		                        message = Messages.StrictReservedWord;
		                    } else if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
		                        firstRestricted = token;
		                        message = Messages.StrictParamDupe;
		                    }
		                }
		                params.push(param);
		                paramSet[param.name] = true;
		                if (match(')')) {
		                    break;
		                }
		                expect(',');
		            }
		        }

		        expect(')');

		        previousStrict = strict;
		        body = parseFunctionSourceElements();
		        if (strict && firstRestricted) {
		            throwError(firstRestricted, message);
		        }
		        if (strict && stricted) {
		            throwErrorTolerant(stricted, message);
		        }
		        strict = previousStrict;

		        return {
		            type: Syntax.FunctionDeclaration,
		            id: id,
		            params: params,
		            defaults: [],
		            body: body,
		            rest: null,
		            generator: false,
		            expression: false
		        };
		    }

		    function parseFunctionExpression() {
		        var token, id = null, stricted, firstRestricted, message, param, params = [], body, previousStrict, paramSet;

		        expectKeyword('function');

		        if (!match('(')) {
		            token = lookahead();
		            id = parseVariableIdentifier();
		            if (strict) {
		                if (isRestrictedWord(token.value)) {
		                    throwErrorTolerant(token, Messages.StrictFunctionName);
		                }
		            } else {
		                if (isRestrictedWord(token.value)) {
		                    firstRestricted = token;
		                    message = Messages.StrictFunctionName;
		                } else if (isStrictModeReservedWord(token.value)) {
		                    firstRestricted = token;
		                    message = Messages.StrictReservedWord;
		                }
		            }
		        }

		        expect('(');

		        if (!match(')')) {
		            paramSet = {};
		            while (index < length) {
		                token = lookahead();
		                param = parseVariableIdentifier();
		                if (strict) {
		                    if (isRestrictedWord(token.value)) {
		                        stricted = token;
		                        message = Messages.StrictParamName;
		                    }
		                    if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
		                        stricted = token;
		                        message = Messages.StrictParamDupe;
		                    }
		                } else if (!firstRestricted) {
		                    if (isRestrictedWord(token.value)) {
		                        firstRestricted = token;
		                        message = Messages.StrictParamName;
		                    } else if (isStrictModeReservedWord(token.value)) {
		                        firstRestricted = token;
		                        message = Messages.StrictReservedWord;
		                    } else if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
		                        firstRestricted = token;
		                        message = Messages.StrictParamDupe;
		                    }
		                }
		                params.push(param);
		                paramSet[param.name] = true;
		                if (match(')')) {
		                    break;
		                }
		                expect(',');
		            }
		        }

		        expect(')');

		        previousStrict = strict;
		        body = parseFunctionSourceElements();
		        if (strict && firstRestricted) {
		            throwError(firstRestricted, message);
		        }
		        if (strict && stricted) {
		            throwErrorTolerant(stricted, message);
		        }
		        strict = previousStrict;

		        return {
		            type: Syntax.FunctionExpression,
		            id: id,
		            params: params,
		            defaults: [],
		            body: body,
		            rest: null,
		            generator: false,
		            expression: false
		        };
		    }

		    // 14 Program

		    function parseSourceElement() {
		        var token = lookahead();

		        if (token.type === Token.Keyword) {
		            switch (token.value) {
		            case 'const':
		            case 'let':
		                return parseConstLetDeclaration(token.value);
		            case 'function':
		                return parseFunctionDeclaration();
		            default:
		                return parseStatement();
		            }
		        }

		        if (token.type !== Token.EOF) {
		            return parseStatement();
		        }
		    }

		    function parseSourceElements() {
		        var sourceElement, sourceElements = [], token, directive, firstRestricted;

		        while (index < length) {
		            token = lookahead();
		            if (token.type !== Token.StringLiteral) {
		                break;
		            }

		            sourceElement = parseSourceElement();
		            sourceElements.push(sourceElement);
		            if (sourceElement.expression.type !== Syntax.Literal) {
		                // this is not directive
		                break;
		            }
		            directive = sliceSource(token.range[0] + 1, token.range[1] - 1);
		            if (directive === 'use strict') {
		                strict = true;
		                if (firstRestricted) {
		                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
		                }
		            } else {
		                if (!firstRestricted && token.octal) {
		                    firstRestricted = token;
		                }
		            }
		        }

		        while (index < length) {
		            sourceElement = parseSourceElement();
		            if (typeof sourceElement === 'undefined') {
		                break;
		            }
		            sourceElements.push(sourceElement);
		        }
		        return sourceElements;
		    }

		    function parseProgram() {
		        var program;
		        strict = false;
		        program = {
		            type: Syntax.Program,
		            body: parseSourceElements()
		        };
		        return program;
		    }

		    // The following functions are needed only when the option to preserve
		    // the comments is active.

		    function addComment(type, value, start, end, loc) {
		        assert(typeof start === 'number', 'Comment must have valid position');

		        // Because the way the actual token is scanned, often the comments
		        // (if any) are skipped twice during the lexical analysis.
		        // Thus, we need to skip adding a comment if the comment array already
		        // handled it.
		        if (extra.comments.length > 0) {
		            if (extra.comments[extra.comments.length - 1].range[1] > start) {
		                return;
		            }
		        }

		        extra.comments.push({
		            type: type,
		            value: value,
		            range: [start, end],
		            loc: loc
		        });
		    }

		    function scanComment() {
		        var comment, ch, loc, start, blockComment, lineComment;

		        comment = '';
		        blockComment = false;
		        lineComment = false;

		        while (index < length) {
		            ch = source[index];

		            if (lineComment) {
		                ch = source[index++];
		                if (isLineTerminator(ch)) {
		                    loc.end = {
		                        line: lineNumber,
		                        column: index - lineStart - 1
		                    };
		                    lineComment = false;
		                    addComment('Line', comment, start, index - 1, loc);
		                    if (ch === '\r' && source[index] === '\n') {
		                        ++index;
		                    }
		                    ++lineNumber;
		                    lineStart = index;
		                    comment = '';
		                } else if (index >= length) {
		                    lineComment = false;
		                    comment += ch;
		                    loc.end = {
		                        line: lineNumber,
		                        column: length - lineStart
		                    };
		                    addComment('Line', comment, start, length, loc);
		                } else {
		                    comment += ch;
		                }
		            } else if (blockComment) {
		                if (isLineTerminator(ch)) {
		                    if (ch === '\r' && source[index + 1] === '\n') {
		                        ++index;
		                        comment += '\r\n';
		                    } else {
		                        comment += ch;
		                    }
		                    ++lineNumber;
		                    ++index;
		                    lineStart = index;
		                    if (index >= length) {
		                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		                    }
		                } else {
		                    ch = source[index++];
		                    if (index >= length) {
		                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		                    }
		                    comment += ch;
		                    if (ch === '*') {
		                        ch = source[index];
		                        if (ch === '/') {
		                            comment = comment.substr(0, comment.length - 1);
		                            blockComment = false;
		                            ++index;
		                            loc.end = {
		                                line: lineNumber,
		                                column: index - lineStart
		                            };
		                            addComment('Block', comment, start, index, loc);
		                            comment = '';
		                        }
		                    }
		                }
		            } else if (ch === '/') {
		                ch = source[index + 1];
		                if (ch === '/') {
		                    loc = {
		                        start: {
		                            line: lineNumber,
		                            column: index - lineStart
		                        }
		                    };
		                    start = index;
		                    index += 2;
		                    lineComment = true;
		                    if (index >= length) {
		                        loc.end = {
		                            line: lineNumber,
		                            column: index - lineStart
		                        };
		                        lineComment = false;
		                        addComment('Line', comment, start, index, loc);
		                    }
		                } else if (ch === '*') {
		                    start = index;
		                    index += 2;
		                    blockComment = true;
		                    loc = {
		                        start: {
		                            line: lineNumber,
		                            column: index - lineStart - 2
		                        }
		                    };
		                    if (index >= length) {
		                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
		                    }
		                } else {
		                    break;
		                }
		            } else if (isWhiteSpace(ch)) {
		                ++index;
		            } else if (isLineTerminator(ch)) {
		                ++index;
		                if (ch ===  '\r' && source[index] === '\n') {
		                    ++index;
		                }
		                ++lineNumber;
		                lineStart = index;
		            } else {
		                break;
		            }
		        }
		    }

		    function filterCommentLocation() {
		        var i, entry, comment, comments = [];

		        for (i = 0; i < extra.comments.length; ++i) {
		            entry = extra.comments[i];
		            comment = {
		                type: entry.type,
		                value: entry.value
		            };
		            if (extra.range) {
		                comment.range = entry.range;
		            }
		            if (extra.loc) {
		                comment.loc = entry.loc;
		            }
		            comments.push(comment);
		        }

		        extra.comments = comments;
		    }

		    function collectToken() {
		        var start, loc, token, range, value;

		        skipComment();
		        start = index;
		        loc = {
		            start: {
		                line: lineNumber,
		                column: index - lineStart
		            }
		        };

		        token = extra.advance();
		        loc.end = {
		            line: lineNumber,
		            column: index - lineStart
		        };

		        if (token.type !== Token.EOF) {
		            range = [token.range[0], token.range[1]];
		            value = sliceSource(token.range[0], token.range[1]);
		            extra.tokens.push({
		                type: TokenName[token.type],
		                value: value,
		                range: range,
		                loc: loc
		            });
		        }

		        return token;
		    }

		    function collectRegex() {
		        var pos, loc, regex, token;

		        skipComment();

		        pos = index;
		        loc = {
		            start: {
		                line: lineNumber,
		                column: index - lineStart
		            }
		        };

		        regex = extra.scanRegExp();
		        loc.end = {
		            line: lineNumber,
		            column: index - lineStart
		        };

		        // Pop the previous token, which is likely '/' or '/='
		        if (extra.tokens.length > 0) {
		            token = extra.tokens[extra.tokens.length - 1];
		            if (token.range[0] === pos && token.type === 'Punctuator') {
		                if (token.value === '/' || token.value === '/=') {
		                    extra.tokens.pop();
		                }
		            }
		        }

		        extra.tokens.push({
		            type: 'RegularExpression',
		            value: regex.literal,
		            range: [pos, index],
		            loc: loc
		        });

		        return regex;
		    }

		    function filterTokenLocation() {
		        var i, entry, token, tokens = [];

		        for (i = 0; i < extra.tokens.length; ++i) {
		            entry = extra.tokens[i];
		            token = {
		                type: entry.type,
		                value: entry.value
		            };
		            if (extra.range) {
		                token.range = entry.range;
		            }
		            if (extra.loc) {
		                token.loc = entry.loc;
		            }
		            tokens.push(token);
		        }

		        extra.tokens = tokens;
		    }

		    function createLiteral(token) {
		        return {
		            type: Syntax.Literal,
		            value: token.value
		        };
		    }

		    function createRawLiteral(token) {
		        return {
		            type: Syntax.Literal,
		            value: token.value,
		            raw: sliceSource(token.range[0], token.range[1])
		        };
		    }

		    function createLocationMarker() {
		        var marker = {};

		        marker.range = [index, index];
		        marker.loc = {
		            start: {
		                line: lineNumber,
		                column: index - lineStart
		            },
		            end: {
		                line: lineNumber,
		                column: index - lineStart
		            }
		        };

		        marker.end = function () {
		            this.range[1] = index;
		            this.loc.end.line = lineNumber;
		            this.loc.end.column = index - lineStart;
		        };

		        marker.applyGroup = function (node) {
		            if (extra.range) {
		                node.groupRange = [this.range[0], this.range[1]];
		            }
		            if (extra.loc) {
		                node.groupLoc = {
		                    start: {
		                        line: this.loc.start.line,
		                        column: this.loc.start.column
		                    },
		                    end: {
		                        line: this.loc.end.line,
		                        column: this.loc.end.column
		                    }
		                };
		            }
		        };

		        marker.apply = function (node) {
		            if (extra.range) {
		                node.range = [this.range[0], this.range[1]];
		            }
		            if (extra.loc) {
		                node.loc = {
		                    start: {
		                        line: this.loc.start.line,
		                        column: this.loc.start.column
		                    },
		                    end: {
		                        line: this.loc.end.line,
		                        column: this.loc.end.column
		                    }
		                };
		            }
		        };

		        return marker;
		    }

		    function trackGroupExpression() {
		        var marker, expr;

		        skipComment();
		        marker = createLocationMarker();
		        expect('(');

		        expr = parseExpression();

		        expect(')');

		        marker.end();
		        marker.applyGroup(expr);

		        return expr;
		    }

		    function trackLeftHandSideExpression() {
		        var marker, expr;

		        skipComment();
		        marker = createLocationMarker();

		        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

		        while (match('.') || match('[')) {
		            if (match('[')) {
		                expr = {
		                    type: Syntax.MemberExpression,
		                    computed: true,
		                    object: expr,
		                    property: parseComputedMember()
		                };
		                marker.end();
		                marker.apply(expr);
		            } else {
		                expr = {
		                    type: Syntax.MemberExpression,
		                    computed: false,
		                    object: expr,
		                    property: parseNonComputedMember()
		                };
		                marker.end();
		                marker.apply(expr);
		            }
		        }

		        return expr;
		    }

		    function trackLeftHandSideExpressionAllowCall() {
		        var marker, expr;

		        skipComment();
		        marker = createLocationMarker();

		        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

		        while (match('.') || match('[') || match('(')) {
		            if (match('(')) {
		                expr = {
		                    type: Syntax.CallExpression,
		                    callee: expr,
		                    'arguments': parseArguments()
		                };
		                marker.end();
		                marker.apply(expr);
		            } else if (match('[')) {
		                expr = {
		                    type: Syntax.MemberExpression,
		                    computed: true,
		                    object: expr,
		                    property: parseComputedMember()
		                };
		                marker.end();
		                marker.apply(expr);
		            } else {
		                expr = {
		                    type: Syntax.MemberExpression,
		                    computed: false,
		                    object: expr,
		                    property: parseNonComputedMember()
		                };
		                marker.end();
		                marker.apply(expr);
		            }
		        }

		        return expr;
		    }

		    function filterGroup(node) {
		        var n, i, entry;

		        n = (Object.prototype.toString.apply(node) === '[object Array]') ? [] : {};
		        for (i in node) {
		            if (node.hasOwnProperty(i) && i !== 'groupRange' && i !== 'groupLoc') {
		                entry = node[i];
		                if (entry === null || typeof entry !== 'object' || entry instanceof RegExp) {
		                    n[i] = entry;
		                } else {
		                    n[i] = filterGroup(entry);
		                }
		            }
		        }
		        return n;
		    }

		    function wrapTrackingFunction(range, loc) {

		        return function (parseFunction) {

		            function isBinary(node) {
		                return node.type === Syntax.LogicalExpression ||
		                    node.type === Syntax.BinaryExpression;
		            }

		            function visit(node) {
		                var start, end;

		                if (isBinary(node.left)) {
		                    visit(node.left);
		                }
		                if (isBinary(node.right)) {
		                    visit(node.right);
		                }

		                if (range) {
		                    if (node.left.groupRange || node.right.groupRange) {
		                        start = node.left.groupRange ? node.left.groupRange[0] : node.left.range[0];
		                        end = node.right.groupRange ? node.right.groupRange[1] : node.right.range[1];
		                        node.range = [start, end];
		                    } else if (typeof node.range === 'undefined') {
		                        start = node.left.range[0];
		                        end = node.right.range[1];
		                        node.range = [start, end];
		                    }
		                }
		                if (loc) {
		                    if (node.left.groupLoc || node.right.groupLoc) {
		                        start = node.left.groupLoc ? node.left.groupLoc.start : node.left.loc.start;
		                        end = node.right.groupLoc ? node.right.groupLoc.end : node.right.loc.end;
		                        node.loc = {
		                            start: start,
		                            end: end
		                        };
		                    } else if (typeof node.loc === 'undefined') {
		                        node.loc = {
		                            start: node.left.loc.start,
		                            end: node.right.loc.end
		                        };
		                    }
		                }
		            }

		            return function () {
		                var marker, node;

		                skipComment();

		                marker = createLocationMarker();
		                node = parseFunction.apply(null, arguments);
		                marker.end();

		                if (range && typeof node.range === 'undefined') {
		                    marker.apply(node);
		                }

		                if (loc && typeof node.loc === 'undefined') {
		                    marker.apply(node);
		                }

		                if (isBinary(node)) {
		                    visit(node);
		                }

		                return node;
		            };
		        };
		    }

		    function patch() {

		        var wrapTracking;

		        if (extra.comments) {
		            extra.skipComment = skipComment;
		            skipComment = scanComment;
		        }

		        if (extra.raw) {
		            extra.createLiteral = createLiteral;
		            createLiteral = createRawLiteral;
		        }

		        if (extra.range || extra.loc) {

		            extra.parseGroupExpression = parseGroupExpression;
		            extra.parseLeftHandSideExpression = parseLeftHandSideExpression;
		            extra.parseLeftHandSideExpressionAllowCall = parseLeftHandSideExpressionAllowCall;
		            parseGroupExpression = trackGroupExpression;
		            parseLeftHandSideExpression = trackLeftHandSideExpression;
		            parseLeftHandSideExpressionAllowCall = trackLeftHandSideExpressionAllowCall;

		            wrapTracking = wrapTrackingFunction(extra.range, extra.loc);

		            extra.parseAdditiveExpression = parseAdditiveExpression;
		            extra.parseAssignmentExpression = parseAssignmentExpression;
		            extra.parseBitwiseANDExpression = parseBitwiseANDExpression;
		            extra.parseBitwiseORExpression = parseBitwiseORExpression;
		            extra.parseBitwiseXORExpression = parseBitwiseXORExpression;
		            extra.parseBlock = parseBlock;
		            extra.parseFunctionSourceElements = parseFunctionSourceElements;
		            extra.parseCatchClause = parseCatchClause;
		            extra.parseComputedMember = parseComputedMember;
		            extra.parseConditionalExpression = parseConditionalExpression;
		            extra.parseConstLetDeclaration = parseConstLetDeclaration;
		            extra.parseEqualityExpression = parseEqualityExpression;
		            extra.parseExpression = parseExpression;
		            extra.parseForVariableDeclaration = parseForVariableDeclaration;
		            extra.parseFunctionDeclaration = parseFunctionDeclaration;
		            extra.parseFunctionExpression = parseFunctionExpression;
		            extra.parseLogicalANDExpression = parseLogicalANDExpression;
		            extra.parseLogicalORExpression = parseLogicalORExpression;
		            extra.parseMultiplicativeExpression = parseMultiplicativeExpression;
		            extra.parseNewExpression = parseNewExpression;
		            extra.parseNonComputedProperty = parseNonComputedProperty;
		            extra.parseObjectProperty = parseObjectProperty;
		            extra.parseObjectPropertyKey = parseObjectPropertyKey;
		            extra.parsePostfixExpression = parsePostfixExpression;
		            extra.parsePrimaryExpression = parsePrimaryExpression;
		            extra.parseProgram = parseProgram;
		            extra.parsePropertyFunction = parsePropertyFunction;
		            extra.parseRelationalExpression = parseRelationalExpression;
		            extra.parseStatement = parseStatement;
		            extra.parseShiftExpression = parseShiftExpression;
		            extra.parseSwitchCase = parseSwitchCase;
		            extra.parseUnaryExpression = parseUnaryExpression;
		            extra.parseVariableDeclaration = parseVariableDeclaration;
		            extra.parseVariableIdentifier = parseVariableIdentifier;

		            parseAdditiveExpression = wrapTracking(extra.parseAdditiveExpression);
		            parseAssignmentExpression = wrapTracking(extra.parseAssignmentExpression);
		            parseBitwiseANDExpression = wrapTracking(extra.parseBitwiseANDExpression);
		            parseBitwiseORExpression = wrapTracking(extra.parseBitwiseORExpression);
		            parseBitwiseXORExpression = wrapTracking(extra.parseBitwiseXORExpression);
		            parseBlock = wrapTracking(extra.parseBlock);
		            parseFunctionSourceElements = wrapTracking(extra.parseFunctionSourceElements);
		            parseCatchClause = wrapTracking(extra.parseCatchClause);
		            parseComputedMember = wrapTracking(extra.parseComputedMember);
		            parseConditionalExpression = wrapTracking(extra.parseConditionalExpression);
		            parseConstLetDeclaration = wrapTracking(extra.parseConstLetDeclaration);
		            parseEqualityExpression = wrapTracking(extra.parseEqualityExpression);
		            parseExpression = wrapTracking(extra.parseExpression);
		            parseForVariableDeclaration = wrapTracking(extra.parseForVariableDeclaration);
		            parseFunctionDeclaration = wrapTracking(extra.parseFunctionDeclaration);
		            parseFunctionExpression = wrapTracking(extra.parseFunctionExpression);
		            parseLeftHandSideExpression = wrapTracking(parseLeftHandSideExpression);
		            parseLogicalANDExpression = wrapTracking(extra.parseLogicalANDExpression);
		            parseLogicalORExpression = wrapTracking(extra.parseLogicalORExpression);
		            parseMultiplicativeExpression = wrapTracking(extra.parseMultiplicativeExpression);
		            parseNewExpression = wrapTracking(extra.parseNewExpression);
		            parseNonComputedProperty = wrapTracking(extra.parseNonComputedProperty);
		            parseObjectProperty = wrapTracking(extra.parseObjectProperty);
		            parseObjectPropertyKey = wrapTracking(extra.parseObjectPropertyKey);
		            parsePostfixExpression = wrapTracking(extra.parsePostfixExpression);
		            parsePrimaryExpression = wrapTracking(extra.parsePrimaryExpression);
		            parseProgram = wrapTracking(extra.parseProgram);
		            parsePropertyFunction = wrapTracking(extra.parsePropertyFunction);
		            parseRelationalExpression = wrapTracking(extra.parseRelationalExpression);
		            parseStatement = wrapTracking(extra.parseStatement);
		            parseShiftExpression = wrapTracking(extra.parseShiftExpression);
		            parseSwitchCase = wrapTracking(extra.parseSwitchCase);
		            parseUnaryExpression = wrapTracking(extra.parseUnaryExpression);
		            parseVariableDeclaration = wrapTracking(extra.parseVariableDeclaration);
		            parseVariableIdentifier = wrapTracking(extra.parseVariableIdentifier);
		        }

		        if (typeof extra.tokens !== 'undefined') {
		            extra.advance = advance;
		            extra.scanRegExp = scanRegExp;

		            advance = collectToken;
		            scanRegExp = collectRegex;
		        }
		    }

		    function unpatch() {
		        if (typeof extra.skipComment === 'function') {
		            skipComment = extra.skipComment;
		        }

		        if (extra.raw) {
		            createLiteral = extra.createLiteral;
		        }

		        if (extra.range || extra.loc) {
		            parseAdditiveExpression = extra.parseAdditiveExpression;
		            parseAssignmentExpression = extra.parseAssignmentExpression;
		            parseBitwiseANDExpression = extra.parseBitwiseANDExpression;
		            parseBitwiseORExpression = extra.parseBitwiseORExpression;
		            parseBitwiseXORExpression = extra.parseBitwiseXORExpression;
		            parseBlock = extra.parseBlock;
		            parseFunctionSourceElements = extra.parseFunctionSourceElements;
		            parseCatchClause = extra.parseCatchClause;
		            parseComputedMember = extra.parseComputedMember;
		            parseConditionalExpression = extra.parseConditionalExpression;
		            parseConstLetDeclaration = extra.parseConstLetDeclaration;
		            parseEqualityExpression = extra.parseEqualityExpression;
		            parseExpression = extra.parseExpression;
		            parseForVariableDeclaration = extra.parseForVariableDeclaration;
		            parseFunctionDeclaration = extra.parseFunctionDeclaration;
		            parseFunctionExpression = extra.parseFunctionExpression;
		            parseGroupExpression = extra.parseGroupExpression;
		            parseLeftHandSideExpression = extra.parseLeftHandSideExpression;
		            parseLeftHandSideExpressionAllowCall = extra.parseLeftHandSideExpressionAllowCall;
		            parseLogicalANDExpression = extra.parseLogicalANDExpression;
		            parseLogicalORExpression = extra.parseLogicalORExpression;
		            parseMultiplicativeExpression = extra.parseMultiplicativeExpression;
		            parseNewExpression = extra.parseNewExpression;
		            parseNonComputedProperty = extra.parseNonComputedProperty;
		            parseObjectProperty = extra.parseObjectProperty;
		            parseObjectPropertyKey = extra.parseObjectPropertyKey;
		            parsePrimaryExpression = extra.parsePrimaryExpression;
		            parsePostfixExpression = extra.parsePostfixExpression;
		            parseProgram = extra.parseProgram;
		            parsePropertyFunction = extra.parsePropertyFunction;
		            parseRelationalExpression = extra.parseRelationalExpression;
		            parseStatement = extra.parseStatement;
		            parseShiftExpression = extra.parseShiftExpression;
		            parseSwitchCase = extra.parseSwitchCase;
		            parseUnaryExpression = extra.parseUnaryExpression;
		            parseVariableDeclaration = extra.parseVariableDeclaration;
		            parseVariableIdentifier = extra.parseVariableIdentifier;
		        }

		        if (typeof extra.scanRegExp === 'function') {
		            advance = extra.advance;
		            scanRegExp = extra.scanRegExp;
		        }
		    }

		    function stringToArray(str) {
		        var length = str.length,
		            result = [],
		            i;
		        for (i = 0; i < length; ++i) {
		            result[i] = str.charAt(i);
		        }
		        return result;
		    }

		    function parse(code, options) {
		        var program, toString;

		        toString = String;
		        if (typeof code !== 'string' && !(code instanceof String)) {
		            code = toString(code);
		        }

		        source = code;
		        index = 0;
		        lineNumber = (source.length > 0) ? 1 : 0;
		        lineStart = 0;
		        length = source.length;
		        buffer = null;
		        state = {
		            allowIn: true,
		            labelSet: {},
		            inFunctionBody: false,
		            inIteration: false,
		            inSwitch: false
		        };

		        extra = {};
		        if (typeof options !== 'undefined') {
		            extra.range = (typeof options.range === 'boolean') && options.range;
		            extra.loc = (typeof options.loc === 'boolean') && options.loc;
		            extra.raw = (typeof options.raw === 'boolean') && options.raw;
		            if (typeof options.tokens === 'boolean' && options.tokens) {
		                extra.tokens = [];
		            }
		            if (typeof options.comment === 'boolean' && options.comment) {
		                extra.comments = [];
		            }
		            if (typeof options.tolerant === 'boolean' && options.tolerant) {
		                extra.errors = [];
		            }
		        }

		        if (length > 0) {
		            if (typeof source[0] === 'undefined') {
		                // Try first to convert to a string. This is good as fast path
		                // for old IE which understands string indexing for string
		                // literals only and not for string object.
		                if (code instanceof String) {
		                    source = code.valueOf();
		                }

		                // Force accessing the characters via an array.
		                if (typeof source[0] === 'undefined') {
		                    source = stringToArray(code);
		                }
		            }
		        }

		        patch();
		        try {
		            program = parseProgram();
		            if (typeof extra.comments !== 'undefined') {
		                filterCommentLocation();
		                program.comments = extra.comments;
		            }
		            if (typeof extra.tokens !== 'undefined') {
		                filterTokenLocation();
		                program.tokens = extra.tokens;
		            }
		            if (typeof extra.errors !== 'undefined') {
		                program.errors = extra.errors;
		            }
		            if (extra.range || extra.loc) {
		                program.body = filterGroup(program.body);
		            }
		        } catch (e) {
		            throw e;
		        } finally {
		            unpatch();
		            extra = {};
		        }

		        return program;
		    }

		    // Sync with package.json.
		    exports.version = '1.0.4';

		    exports.parse = parse;

		    // Deep copy.
		    exports.Syntax = (function () {
		        var name, types = {};

		        if (typeof Object.create === 'function') {
		            types = Object.create(null);
		        }

		        for (name in Syntax) {
		            if (Syntax.hasOwnProperty(name)) {
		                types[name] = Syntax[name];
		            }
		        }

		        if (typeof Object.freeze === 'function') {
		            Object.freeze(types);
		        }

		        return types;
		    }());

		}));
		/* vim: set sw=4 ts=4 et tw=80 : */


	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		module.exports = hoist

		function hoist(ast){

		  var parentStack = []
		  var variables = []
		  var functions = []

		  if (Array.isArray(ast)){

		    walkAll(ast)
		    prependScope(ast, variables, functions)
		    
		  } else {
		    walk(ast)
		  }

		  return ast

		  // walk through each node of a program of block statement
		  function walkAll(nodes){
		    var result = null
		    for (var i=0;i<nodes.length;i++){
		      var childNode = nodes[i]
		      if (childNode.type === 'EmptyStatement') continue
		      var result = walk(childNode)
		      if (result === 'remove'){
		        nodes.splice(i--, 1)
		      }
		    }
		  }

		  function walk(node){
		    var parent = parentStack[parentStack.length-1]
		    var remove = false
		    parentStack.push(node)

		    var excludeBody = false
		    if (shouldScope(node, parent)){
		      hoist(node.body)
		      excludeBody = true
		    }

		    if (node.type === 'VariableDeclarator'){
		      variables.push(node)
		    }

		    if (node.type === 'FunctionDeclaration'){
		      functions.push(node)
		      remove = true
		    }

		    for (var key in node){
		      if (key === 'type' || (excludeBody && key === 'body')) continue
		      if (key in node && node[key] && typeof node[key] == 'object'){
		        if (node[key].type){
		          walk(node[key])
		        } else if (Array.isArray(node[key])){
		          walkAll(node[key])
		        }
		      }
		    }

		    parentStack.pop()
		    if (remove){
		      return 'remove'
		    }
		  }
		}

		function shouldScope(node, parent){
		  if (node.type === 'Program'){
		    return true
		  } else if (node.type === 'BlockStatement'){
		    if (parent && (parent.type === 'FunctionExpression' || parent.type === 'FunctionDeclaration')){
		      return true
		    }
		  }
		}

		function prependScope(nodes, variables, functions){
		  if (variables && variables.length){
		    var declarations = []
		    for (var i=0;i<variables.length;i++){
		      declarations.push({
		        type: 'VariableDeclarator', 
		        id: variables[i].id,
		        init: null
		      })
		    }
		    
		    nodes.unshift({
		      type: 'VariableDeclaration', 
		      kind: 'var', 
		      declarations: declarations
		    })

		  }

		  if (functions && functions.length){
		    for (var i=0;i<functions.length;i++){
		      nodes.unshift(functions[i]) 
		    }
		  }
		}

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		module.exports = InfiniteChecker

		function InfiniteChecker(maxIterations){
		  if (this instanceof InfiniteChecker){
		    this.maxIterations = maxIterations
		    this.count = 0
		  } else {
		    return new InfiniteChecker(maxIterations)
		  }
		}

		InfiniteChecker.prototype.check = function(){
		  this.count += 1
		  if (this.count > this.maxIterations){
		    throw new Error('Infinite loop detected - reached max iterations')
		  }
		}

	/***/ },
	/* 4 */
	/***/ function(module, exports) {

		/* WEBPACK VAR INJECTION */(function(global) {var names = ['Object', 'String', 'Boolean', 'Number', 'RegExp', 'Date', 'Array']
		var immutable = {string: 'String', boolean: 'Boolean', number: 'Number' }

		var primitives = names.map(getGlobal)
		var protos = primitives.map(getProto)

		var protoReplacements = {}

		module.exports = Primitives

		function Primitives(context){
		  if (this instanceof Primitives){
		    this.context = context
		    for (var i=0;i<names.length;i++){
		      if (!this.context[names[i]]){
		        this.context[names[i]] = wrap(primitives[i])
		      }
		    }
		  } else {
		    return new Primitives(context)
		  }
		}

		Primitives.prototype.replace = function(value){
		  var primIndex = primitives.indexOf(value)
		  var protoIndex = protos.indexOf(value)

		  if (~primIndex){
		    var name = names[primIndex]
		    return this.context[name]
		  } else if (~protoIndex) {
		    var name = names[protoIndex]
		    return this.context[name].prototype
		  } else  {
		    return value
		  }
		}

		Primitives.prototype.getPropertyObject = function(object, property){
		  if (immutable[typeof object]){
		    return this.getPrototypeOf(object)
		  }
		  return object
		}

		Primitives.prototype.isPrimitive = function(value){
		  return !!~primitives.indexOf(value) || !!~protos.indexOf(value)
		}

		Primitives.prototype.getPrototypeOf = function(value){
		  if (value == null){ // handle null and undefined
		    return value
		  }

		  var immutableType = immutable[typeof value]
		  if (immutableType){
		    var proto = this.context[immutableType].prototype
		  } else {
		    var proto = Object.getPrototypeOf(value)
		  }

		  if (!proto || proto === Object.prototype){
		    return null
		  } else {
		    var replacement = this.replace(proto)
		    if (replacement === value){
		      replacement = this.replace(Object.prototype)
		    }
		    return replacement
		  }
		}

		Primitives.prototype.applyNew = function(func, args){
		  if (func.wrapped){
		    var prim = Object.getPrototypeOf(func)
		    var instance = new (Function.prototype.bind.apply(prim, arguments))
		    setProto(instance, func.prototype)
		    return instance
		  } else {
		    return new (Function.prototype.bind.apply(func, arguments))
		  }
		}

		function getProto(func){
		  return func.prototype
		}

		function getGlobal(str){
		  return global[str]
		}

		function setProto(obj, proto){
		  obj.__proto__ = proto
		}

		function wrap(prim){
		  var proto = Object.create(prim.prototype)

		  var result = function() {
		    if (this instanceof result){
		      prim.apply(this, arguments)
		    } else {
		      var instance = prim.apply(null, arguments)
		      setProto(instance, proto)
		      return instance
		    }
		  }
		  setProto(result, prim)
		  result.prototype = proto
		  result.wrapped = true
		  return result
		}
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

	/***/ }
	/******/ ]);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var config = __webpack_require__(7)

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	var queue = []
	var userQueue = []
	var has = {}
	var circular = {}
	var waiting = false
	var internalQueueDepleted = false

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState () {
	  queue = []
	  userQueue = []
	  has = {}
	  circular = {}
	  waiting = internalQueueDepleted = false
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue () {
	  runBatcherQueue(queue)
	  internalQueueDepleted = true
	  runBatcherQueue(userQueue)
	  // dev tool hook
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (_.inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush')
	    }
	  }
	  resetBatcherState()
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue (queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i]
	    var id = watcher.id
	    has[id] = null
	    watcher.run()
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1
	      if (circular[id] > config._maxUpdateCount) {
	        queue.splice(has[id], 1)
	        _.warn(
	          'You may have an infinite update loop for watcher ' +
	          'with expression: ' + watcher.expression
	        )
	      }
	    }
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	exports.push = function (watcher) {
	  var id = watcher.id
	  if (has[id] == null) {
	    // if an internal watcher is pushed, but the internal
	    // queue is already depleted, we run it immediately.
	    if (internalQueueDepleted && !watcher.user) {
	      watcher.run()
	      return
	    }
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue
	    has[id] = q.length
	    q.push(watcher)
	    // queue the flush
	    if (!waiting) {
	      waiting = true
	      _.nextTick(flushBatcherQueue)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var Transition = __webpack_require__(49)

	module.exports = {

	  priority: 1000,

	  update: function (id, oldId) {
	    var el = this.el
	    // resolve on owner vm
	    var hooks = _.resolveAsset(this.vm.$options, 'transitions', id)
	    id = id || 'v'
	    // apply on closest vm
	    el.__v_trans = new Transition(el, id, hooks, this.el.__vue__ || this.vm)
	    if (oldId) {
	      _.removeClass(el, oldId + '-transition')
	    }
	    _.addClass(el, id + '-transition')
	  }
	}


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var queue = __webpack_require__(50)
	var addClass = _.addClass
	var removeClass = _.removeClass
	var transitionEndEvent = _.transitionEndEvent
	var animationEndEvent = _.animationEndEvent
	var transDurationProp = _.transitionProp + 'Duration'
	var animDurationProp = _.animationProp + 'Duration'

	var TYPE_TRANSITION = 1
	var TYPE_ANIMATION = 2

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */

	function Transition (el, id, hooks, vm) {
	  this.id = id
	  this.el = el
	  this.enterClass = id + '-enter'
	  this.leaveClass = id + '-leave'
	  this.hooks = hooks
	  this.vm = vm
	  // async state
	  this.pendingCssEvent =
	  this.pendingCssCb =
	  this.cancel =
	  this.pendingJsCb =
	  this.op =
	  this.cb = null
	  this.justEntered = false
	  this.entered = this.left = false
	  this.typeCache = {}
	  // bind
	  var self = this
	  ;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone']
	    .forEach(function (m) {
	      self[m] = _.bind(self[m], self)
	    })
	}

	var p = Transition.prototype

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p.enter = function (op, cb) {
	  this.cancelPending()
	  this.callHook('beforeEnter')
	  this.cb = cb
	  addClass(this.el, this.enterClass)
	  op()
	  this.entered = false
	  this.callHookWithCb('enter')
	  if (this.entered) {
	    return // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled
	  queue.push(this.enterNextTick)
	}

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p.enterNextTick = function () {

	  // Importnatn hack:
	  // in Chrome, if a just-entered element is applied the
	  // leave class while its interpolated property still has
	  // a very small value (within one frame), Chrome will
	  // skip the leave transition entirely and not firing the
	  // transtionend event. Therefore we need to protected
	  // against such cases using a one-frame timeout.
	  this.justEntered = true
	  var self = this
	  setTimeout(function () {
	    self.justEntered = false
	  }, 17)

	  var enterDone = this.enterDone
	  var type = this.getCssTransitionType(this.enterClass)
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass)
	      this.setupCssCb(transitionEndEvent, enterDone)
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone)
	    } else {
	      enterDone()
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass)
	  }
	}

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p.enterDone = function () {
	  this.entered = true
	  this.cancel = this.pendingJsCb = null
	  removeClass(this.el, this.enterClass)
	  this.callHook('afterEnter')
	  if (this.cb) this.cb()
	}

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p.leave = function (op, cb) {
	  this.cancelPending()
	  this.callHook('beforeLeave')
	  this.op = op
	  this.cb = cb
	  addClass(this.el, this.leaveClass)
	  this.left = false
	  this.callHookWithCb('leave')
	  if (this.left) {
	    return // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone()
	    } else {
	      queue.push(this.leaveNextTick)
	    }
	  }
	}

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass)
	  if (type) {
	    var event = type === TYPE_TRANSITION
	      ? transitionEndEvent
	      : animationEndEvent
	    this.setupCssCb(event, this.leaveDone)
	  } else {
	    this.leaveDone()
	  }
	}

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p.leaveDone = function () {
	  this.left = true
	  this.cancel = this.pendingJsCb = null
	  this.op()
	  removeClass(this.el, this.leaveClass)
	  this.callHook('afterLeave')
	  if (this.cb) this.cb()
	  this.op = null
	}

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p.cancelPending = function () {
	  this.op = this.cb = null
	  var hasPending = false
	  if (this.pendingCssCb) {
	    hasPending = true
	    _.off(this.el, this.pendingCssEvent, this.pendingCssCb)
	    this.pendingCssEvent = this.pendingCssCb = null
	  }
	  if (this.pendingJsCb) {
	    hasPending = true
	    this.pendingJsCb.cancel()
	    this.pendingJsCb = null
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass)
	    removeClass(this.el, this.leaveClass)
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el)
	    this.cancel = null
	  }
	}

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el)
	  }
	}

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type]
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = _.cancellable(this[type + 'Done'])
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb)
	  }
	}

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (
	    !transitionEndEvent ||
	    // skip CSS transitions if page is not visible -
	    // this solves the issue of transitionend events not
	    // firing until the page is visible again.
	    // pageVisibility API is supported in IE10+, same as
	    // CSS transitions.
	    document.hidden ||
	    // explicit js-only transition
	    (this.hooks && this.hooks.css === false) ||
	    // element is hidden
	    isHidden(this.el)
	  ) {
	    return
	  }
	  var type = this.typeCache[className]
	  if (type) return type
	  var inlineStyles = this.el.style
	  var computedStyles = window.getComputedStyle(this.el)
	  var transDuration =
	    inlineStyles[transDurationProp] ||
	    computedStyles[transDurationProp]
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION
	  } else {
	    var animDuration =
	      inlineStyles[animDurationProp] ||
	      computedStyles[animDurationProp]
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type
	  }
	  return type
	}

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event
	  var self = this
	  var el = this.el
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      _.off(el, event, onEnd)
	      self.pendingCssEvent = self.pendingCssCb = null
	      if (!self.pendingJsCb && cb) {
	        cb()
	      }
	    }
	  }
	  _.on(el, event, onEnd)
	}

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden (el) {
	  return !(
	    el.offsetWidth &&
	    el.offsetHeight &&
	    el.getClientRects().length
	  )
	}

	module.exports = Transition


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var queue = []
	var queued = false

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	exports.push = function (job) {
	  queue.push(job)
	  if (!queued) {
	    queued = true
	    _.nextTick(flush)
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush () {
	  // Force layout
	  var f = document.documentElement.offsetHeight
	  for (var i = 0; i < queue.length; i++) {
	    queue[i]()
	  }
	  queue = []
	  queued = false
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f
	}


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var dirParser = __webpack_require__(10)
	var propDef = __webpack_require__(41)
	var propBindingModes = __webpack_require__(7)._propBindingModes
	var empty = {}

	// regexes
	var identRE = __webpack_require__(45).identRE
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */

	module.exports = function compileProps (el, propOptions) {
	  var props = []
	  var names = Object.keys(propOptions)
	  var i = names.length
	  var options, name, attr, value, path, parsed, prop
	  while (i--) {
	    name = names[i]
	    options = propOptions[name] || empty

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      _.warn('Do not use $data as prop.')
	      continue
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = _.camelize(name)
	    if (!identRE.test(path)) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Invalid prop key: "' + name + '". Prop keys ' +
	        'must be valid identifiers.'
	      )
	      continue
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY
	    }

	    // first check literal version
	    attr = _.hyphenate(name)
	    value = prop.raw = _.attr(el, attr)
	    if (value === null) {
	      // then check dynamic version
	      if ((value = _.getBindAttr(el, attr)) === null) {
	        if ((value = _.getBindAttr(el, attr + '.sync')) !== null) {
	          prop.mode = propBindingModes.TWO_WAY
	        } else if ((value = _.getBindAttr(el, attr + '.once')) !== null) {
	          prop.mode = propBindingModes.ONE_TIME
	        }
	      }
	      prop.raw = value
	      if (value !== null) {
	        parsed = dirParser.parse(value)
	        value = parsed.expression
	        prop.filters = parsed.filters
	        // check binding type
	        if (_.isLiteral(value)) {
	          // for expressions containing literal numbers and
	          // booleans, there's no need to setup a prop binding,
	          // so we can optimize them as a one-time set.
	          prop.optimizedLiteral = true
	        } else {
	          prop.dynamic = true
	          // check non-settable path for two-way bindings
	          if (process.env.NODE_ENV !== 'production' &&
	              prop.mode === propBindingModes.TWO_WAY &&
	              !settablePathRE.test(value)) {
	            prop.mode = propBindingModes.ONE_WAY
	            _.warn(
	              'Cannot bind two-way prop with non-settable ' +
	              'parent path: ' + value
	            )
	          }
	        }
	        prop.parentPath = value

	        // warn required two-way
	        if (
	          process.env.NODE_ENV !== 'production' &&
	          options.twoWay &&
	          prop.mode !== propBindingModes.TWO_WAY
	        ) {
	          _.warn(
	            'Prop "' + name + '" expects a two-way binding type.'
	          )
	        }

	      } else if (options.required) {
	        // warn missing required
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Missing required prop: ' + name
	        )
	      }
	    }

	    // push prop
	    props.push(prop)
	  }
	  return makePropsLinkFn(props)
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn (props) {
	  return function propsLinkFn (vm, scope) {
	    // store resolved props info
	    vm._props = {}
	    var i = props.length
	    var prop, path, options, value, raw
	    while (i--) {
	      prop = props[i]
	      raw = prop.raw
	      path = prop.path
	      options = prop.options
	      vm._props[path] = prop
	      if (raw === null) {
	        // initialize absent prop
	        _.initProp(vm, prop, getDefault(vm, options))
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (vm._context) {
	          if (prop.mode === propBindingModes.ONE_TIME) {
	            // one time binding
	            value = (scope || vm._context).$get(prop.parentPath)
	            _.initProp(vm, prop, value)
	          } else {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope) // el, host, scope
	          }
	        } else {
	          process.env.NODE_ENV !== 'production' && _.warn(
	            'Cannot bind dynamic prop on a root instance' +
	            ' with no parent: ' + prop.name + '="' +
	            raw + '"'
	          )
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        raw = _.stripQuotes(raw)
	        value = _.toBoolean(_.toNumber(raw))
	        _.initProp(vm, prop, value)
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value
	        value = options.type === Boolean && raw === ''
	          ? true
	          : raw
	        _.initProp(vm, prop, value)
	      }
	    }
	  }
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} options
	 * @return {*}
	 */

	function getDefault (vm, options) {
	  // no default, return undefined
	  if (!options.hasOwnProperty('default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean
	      ? false
	      : undefined
	  }
	  var def = options.default
	  // warn against non-factory defaults for Object & Array
	  if (_.isObject(def)) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Object/Array as default prop values will be shared ' +
	      'across multiple instances. Use a factory function ' +
	      'to return the default value instead.'
	    )
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function
	    ? def.call(vm)
	    : def
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var templateParser = __webpack_require__(21)
	var specialCharRE = /[^\w\-:\.]/

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	exports.transclude = function (el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el)
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (_.isTemplate(el)) {
	    el = templateParser.parse(el)
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>'
	    }
	    if (options.template) {
	      options._content = _.extractContent(el)
	      el = transcludeTemplate(el, options)
	    }
	  }
	  if (el instanceof DocumentFragment) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    _.prepend(_.createAnchor('v-start', true), el)
	    el.appendChild(_.createAnchor('v-end', true))
	  }
	  return el
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate (el, options) {
	  var template = options.template
	  var frag = templateParser.parse(template, true)
	  if (frag) {
	    var replacer = frag.firstChild
	    var tag = replacer.tagName && replacer.tagName.toLowerCase()
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'You are mounting an instance with a template to ' +
	          '<body>. This will replace <body> entirely. You ' +
	          'should probably use `replace: false` here.'
	        )
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	        // multi-children template
	        frag.childNodes.length > 1 ||
	        // non-element template
	        replacer.nodeType !== 1 ||
	        // single nested component
	        tag === 'component' ||
	        _.resolveAsset(options, 'components', tag) ||
	        replacer.hasAttribute('is') ||
	        replacer.hasAttribute(':is') ||
	        replacer.hasAttribute('v-bind:is') ||
	        // element directive
	        _.resolveAsset(options, 'elementDirectives', tag) ||
	        // for block
	        replacer.hasAttribute('v-for') ||
	        // if block
	        replacer.hasAttribute('v-if')
	      ) {
	        return frag
	      } else {
	        options._replacerAttrs = extractAttrs(replacer)
	        mergeAttrs(el, replacer)
	        return replacer
	      }
	    } else {
	      el.appendChild(frag)
	      return el
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid template option: ' + template
	    )
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs (el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return _.toArray(el.attributes)
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs (from, to) {
	  var attrs = from.attributes
	  var i = attrs.length
	  var name, value
	  while (i--) {
	    name = attrs[i].name
	    value = attrs[i].value
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value)
	    } else if (name === 'class') {
	      value = to.getAttribute(name) + ' ' + value
	      to.setAttribute(name, value)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	exports.slot = __webpack_require__(54)
	exports.partial = __webpack_require__(55)


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var templateParser = __webpack_require__(21)

	// This is the elementDirective that handles <content>
	// transclusions. It relies on the raw content of an
	// instance being stored as `$options._content` during
	// the transclude phase.

	module.exports = {

	  priority: 1750,

	  params: ['name'],

	  bind: function () {
	    var host = this.vm
	    var raw = host.$options._content
	    var content
	    if (!raw) {
	      this.fallback()
	      return
	    }
	    var context = host._context
	    var slotName = this.params.name
	    if (!slotName) {
	      // Default content
	      var self = this
	      var compileDefaultContent = function () {
	        self.compile(
	          extractFragment(raw.childNodes, raw, true),
	          context,
	          host
	        )
	      }
	      if (!host._isCompiled) {
	        // defer until the end of instance compilation,
	        // because the default outlet must wait until all
	        // other possible outlets with selectors have picked
	        // out their contents.
	        host.$once('hook:compiled', compileDefaultContent)
	      } else {
	        compileDefaultContent()
	      }
	    } else {
	      var selector = '[slot="' + slotName + '"]'
	      var nodes = raw.querySelectorAll(selector)
	      if (nodes.length) {
	        content = extractFragment(nodes, raw)
	        if (content.hasChildNodes()) {
	          this.compile(content, context, host)
	        } else {
	          this.fallback()
	        }
	      } else {
	        this.fallback()
	      }
	    }
	  },

	  fallback: function () {
	    this.compile(_.extractContent(this.el, true), this.vm)
	  },

	  compile: function (content, context, host) {
	    if (content && context) {
	      var scope = host
	        ? host._scope
	        : this._scope
	      this.unlink = context.$compile(
	        content, host, scope, this._frag
	      )
	    }
	    if (content) {
	      _.replace(this.el, content)
	    } else {
	      _.remove(this.el)
	    }
	  },

	  unbind: function () {
	    if (this.unlink) {
	      this.unlink()
	    }
	  }
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @param {Element} parent
	 * @param {Boolean} main
	 * @return {DocumentFragment}
	 */

	function extractFragment (nodes, parent, main) {
	  var frag = document.createDocumentFragment()
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i]
	    // if this is the main outlet, we want to skip all
	    // previously selected nodes;
	    // otherwise, we want to mark the node as selected.
	    // clone the node so the original raw content remains
	    // intact. this ensures proper re-compilation in cases
	    // where the outlet is inside a conditional block
	    if (main && !node.__v_selected) {
	      append(node)
	    } else if (!main && node.parentNode === parent) {
	      node.__v_selected = true
	      append(node)
	    }
	  }
	  return frag

	  function append (node) {
	    if (_.isTemplate(node) &&
	        !node.hasAttribute('v-if') &&
	        !node.hasAttribute('v-for')) {
	      node = templateParser.parse(node)
	    }
	    node = templateParser.clone(node)
	    frag.appendChild(node)
	  }
	}


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var vIf = __webpack_require__(25)
	var FragmentFactory = __webpack_require__(23)

	module.exports = {

	  priority: 1750,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function (value) {
	      vIf.remove.call(this)
	      if (value) {
	        this.insert(value)
	      }
	    }
	  },

	  bind: function () {
	    this.anchor = _.createAnchor('v-partial')
	    _.replace(this.el, this.anchor)
	    this.insert(this.params.name)
	  },

	  insert: function (id) {
	    var partial = _.resolveAsset(this.vm.$options, 'partials', id)
	    if (process.env.NODE_ENV !== 'production') {
	      _.assertAsset(partial, 'partial', id)
	    }
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial)
	      vIf.insert.call(this)
	    }
	  },

	  unbind: function () {
	    if (this.frag) {
	      this.frag.destroy()
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)

	/**
	 * Stringify value.
	 *
	 * @param {Number} indent
	 */

	exports.json = {
	  read: function (value, indent) {
	    return typeof value === 'string'
	      ? value
	      : JSON.stringify(value, null, Number(indent) || 2)
	  },
	  write: function (value) {
	    try {
	      return JSON.parse(value)
	    } catch (e) {
	      return value
	    }
	  }
	}

	/**
	 * 'abc' => 'Abc'
	 */

	exports.capitalize = function (value) {
	  if (!value && value !== 0) return ''
	  value = value.toString()
	  return value.charAt(0).toUpperCase() + value.slice(1)
	}

	/**
	 * 'abc' => 'ABC'
	 */

	exports.uppercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toUpperCase()
	    : ''
	}

	/**
	 * 'AbC' => 'abc'
	 */

	exports.lowercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toLowerCase()
	    : ''
	}

	/**
	 * 12345 => $12,345.00
	 *
	 * @param {String} sign
	 */

	var digitsRE = /(\d{3})(?=\d)/g
	exports.currency = function (value, currency) {
	  value = parseFloat(value)
	  if (!isFinite(value) || (!value && value !== 0)) return ''
	  currency = currency != null ? currency : '$'
	  var stringified = Math.abs(value).toFixed(2)
	  var _int = stringified.slice(0, -3)
	  var i = _int.length % 3
	  var head = i > 0
	    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
	    : ''
	  var _float = stringified.slice(-3)
	  var sign = value < 0 ? '-' : ''
	  return currency + sign + head +
	    _int.slice(i).replace(digitsRE, '$1,') +
	    _float
	}

	/**
	 * 'item' => 'items'
	 *
	 * @params
	 *  an array of strings corresponding to
	 *  the single, double, triple ... forms of the word to
	 *  be pluralized. When the number to be pluralized
	 *  exceeds the length of the args, it will use the last
	 *  entry in the array.
	 *
	 *  e.g. ['single', 'double', 'triple', 'multiple']
	 */

	exports.pluralize = function (value) {
	  var args = _.toArray(arguments, 1)
	  return args.length > 1
	    ? (args[value % 10 - 1] || args[args.length - 1])
	    : (args[0] + (value === 1 ? '' : 's'))
	}

	/**
	 * Debounce a handler function.
	 *
	 * @param {Function} handler
	 * @param {Number} delay = 300
	 * @return {Function}
	 */

	exports.debounce = function (handler, delay) {
	  if (!handler) return
	  if (!delay) {
	    delay = 300
	  }
	  return _.debounce(handler, delay)
	}

	/**
	 * Install special array filters
	 */

	_.extend(exports, __webpack_require__(57))


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var Path = __webpack_require__(45)
	var toArray = __webpack_require__(22)._postProcess

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} searchKey
	 * @param {String} [delimiter]
	 * @param {String} dataKey
	 */

	exports.filterBy = function (arr, search, delimiter /* ...dataKeys */) {
	  arr = toArray(arr)
	  if (search == null) {
	    return arr
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search)
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase()
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2
	  // extract and flatten keys
	  var keys = _.toArray(arguments, n).reduce(function (prev, cur) {
	    return prev.concat(cur)
	  }, [])
	  var res = []
	  var item, key, val, j
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i]
	    val = (item && item.$value) || item
	    j = keys.length
	    if (j) {
	      while (j--) {
	        key = keys[j]
	        if ((key === '$key' && contains(item.$key, search)) ||
	            contains(Path.get(val, key), search)) {
	          res.push(item)
	        }
	      }
	    } else {
	      if (contains(item, search)) {
	        res.push(item)
	      }
	    }
	  }
	  return res
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */

	exports.orderBy = function (arr, sortKey, reverse) {
	  arr = toArray(arr)
	  if (!sortKey) {
	    return arr
	  }
	  var order = (reverse && reverse < 0) ? -1 : 1
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    if (sortKey !== '$key') {
	      if (_.isObject(a) && '$value' in a) a = a.$value
	      if (_.isObject(b) && '$value' in b) b = b.$value
	    }
	    a = _.isObject(a) ? Path.get(a, sortKey) : a
	    b = _.isObject(b) ? Path.get(b, sortKey) : b
	    return a === b ? 0 : a > b ? order : -order
	  })
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains (val, search) {
	  var i
	  if (_.isPlainObject(val)) {
	    var keys = Object.keys(val)
	    i = keys.length
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true
	      }
	    }
	  } else if (_.isArray(val)) {
	    i = val.length
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1
	  }
	}


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var mergeOptions = __webpack_require__(3).mergeOptions
	var uid = 0

	/**
	 * The main init sequence. This is called for every
	 * instance, including ones that are created from extended
	 * constructors.
	 *
	 * @param {Object} options - this options object should be
	 *                           the result of merging class
	 *                           options and the options passed
	 *                           in to the constructor.
	 */

	exports._init = function (options) {

	  options = options || {}

	  this.$el = null
	  this.$parent = options.parent
	  this.$root = this.$parent
	    ? this.$parent.$root
	    : this
	  this.$children = []
	  this.$refs = {}       // child vm references
	  this.$els = {}        // element references
	  this._watchers = []   // all watchers as an array
	  this._directives = [] // all directives

	  // a uid
	  this._uid = uid++

	  // a flag to avoid this being observed
	  this._isVue = true

	  // events bookkeeping
	  this._events = {}            // registered callbacks
	  this._eventsCount = {}       // for $broadcast optimization
	  this._shouldPropagate = false // for event propagation

	  // fragment instance properties
	  this._isFragment = false
	  this._fragment =         // @type {DocumentFragment}
	  this._fragmentStart =    // @type {Text|Comment}
	  this._fragmentEnd = null // @type {Text|Comment}

	  // lifecycle state
	  this._isCompiled =
	  this._isDestroyed =
	  this._isReady =
	  this._isAttached =
	  this._isBeingDestroyed = false
	  this._unlinkFn = null

	  // context:
	  // if this is a transcluded component, context
	  // will be the common parent vm of this instance
	  // and its host.
	  this._context = options._context || this.$parent

	  // scope:
	  // if this is inside an inline v-for, the scope
	  // will be the intermediate scope created for this
	  // repeat fragment. this is used for linking props
	  // and container directives.
	  this._scope = options._scope

	  // fragment:
	  // if this instance is compiled inside a Fragment, it
	  // needs to reigster itself as a child of that fragment
	  // for attach/detach to work properly.
	  this._frag = options._frag
	  if (this._frag) {
	    this._frag.children.push(this)
	  }

	  // push self into parent / transclusion host
	  if (this.$parent) {
	    this.$parent.$children.push(this)
	  }

	  // set ref
	  if (options._ref) {
	    (this._scope || this._context).$refs[options._ref] = this
	  }

	  // merge options.
	  options = this.$options = mergeOptions(
	    this.constructor.options,
	    options,
	    this
	  )

	  // initialize data as empty object.
	  // it will be filled up in _initScope().
	  this._data = {}

	  // call init hook
	  this._callHook('init')

	  // initialize data observation and scope inheritance.
	  this._initState()

	  // setup event system and option events.
	  this._initEvents()

	  // call created hook
	  this._callHook('created')

	  // if `el` option is passed, start compilation.
	  if (options.el) {
	    this.$mount(options.el)
	  }
	}


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var inDoc = _.inDoc
	var eventRE = /^v-on:|^@/

	/**
	 * Setup the instance's option events & watchers.
	 * If the value is a string, we pull it from the
	 * instance's methods by name.
	 */

	exports._initEvents = function () {
	  var options = this.$options
	  if (options._asComponent) {
	    registerComponentEvents(this, options.el)
	  }
	  registerCallbacks(this, '$on', options.events)
	  registerCallbacks(this, '$watch', options.watch)
	}

	/**
	 * Register v-on events on a child component
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 */

	function registerComponentEvents (vm, el) {
	  var attrs = el.attributes
	  var name, handler
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    name = attrs[i].name
	    if (eventRE.test(name)) {
	      name = name.replace(eventRE, '')
	      handler = (vm._scope || vm._context).$eval(attrs[i].value, true)
	      vm.$on(name.replace(eventRE), handler)
	    }
	  }
	}

	/**
	 * Register callbacks for option events and watchers.
	 *
	 * @param {Vue} vm
	 * @param {String} action
	 * @param {Object} hash
	 */

	function registerCallbacks (vm, action, hash) {
	  if (!hash) return
	  var handlers, key, i, j
	  for (key in hash) {
	    handlers = hash[key]
	    if (_.isArray(handlers)) {
	      for (i = 0, j = handlers.length; i < j; i++) {
	        register(vm, action, key, handlers[i])
	      }
	    } else {
	      register(vm, action, key, handlers)
	    }
	  }
	}

	/**
	 * Helper to register an event/watch callback.
	 *
	 * @param {Vue} vm
	 * @param {String} action
	 * @param {String} key
	 * @param {Function|String|Object} handler
	 * @param {Object} [options]
	 */

	function register (vm, action, key, handler, options) {
	  var type = typeof handler
	  if (type === 'function') {
	    vm[action](key, handler, options)
	  } else if (type === 'string') {
	    var methods = vm.$options.methods
	    var method = methods && methods[handler]
	    if (method) {
	      vm[action](key, method, options)
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Unknown method: "' + handler + '" when ' +
	        'registering callback for ' + action +
	        ': "' + key + '".'
	      )
	    }
	  } else if (handler && type === 'object') {
	    register(vm, action, key, handler.handler, handler)
	  }
	}

	/**
	 * Setup recursive attached/detached calls
	 */

	exports._initDOMHooks = function () {
	  this.$on('hook:attached', onAttached)
	  this.$on('hook:detached', onDetached)
	}

	/**
	 * Callback to recursively call attached hook on children
	 */

	function onAttached () {
	  if (!this._isAttached) {
	    this._isAttached = true
	    this.$children.forEach(callAttach)
	  }
	}

	/**
	 * Iterator to call attached hook
	 *
	 * @param {Vue} child
	 */

	function callAttach (child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached')
	  }
	}

	/**
	 * Callback to recursively call detached hook on children
	 */

	function onDetached () {
	  if (this._isAttached) {
	    this._isAttached = false
	    this.$children.forEach(callDetach)
	  }
	}

	/**
	 * Iterator to call detached hook
	 *
	 * @param {Vue} child
	 */

	function callDetach (child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached')
	  }
	}

	/**
	 * Trigger all handlers for a hook
	 *
	 * @param {String} hook
	 */

	exports._callHook = function (hook) {
	  var handlers = this.$options[hook]
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(this)
	    }
	  }
	  this.$emit('hook:' + hook)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var compiler = __webpack_require__(16)
	var Observer = __webpack_require__(61)
	var Dep = __webpack_require__(43)
	var Watcher = __webpack_require__(42)

	/**
	 * Setup the scope of an instance, which contains:
	 * - observed data
	 * - computed properties
	 * - user methods
	 * - meta properties
	 */

	exports._initState = function () {
	  this._initProps()
	  this._initMeta()
	  this._initMethods()
	  this._initData()
	  this._initComputed()
	}

	/**
	 * Initialize props.
	 */

	exports._initProps = function () {
	  var options = this.$options
	  var el = options.el
	  var props = options.props
	  if (props && !el) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Props will not be compiled if no `el` option is ' +
	      'provided at instantiation.'
	    )
	  }
	  // make sure to convert string selectors into element now
	  el = options.el = _.query(el)
	  this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compiler.compileAndLinkProps(this, el, props, this._scope)
	    : null
	}

	/**
	 * Initialize the data.
	 */

	exports._initData = function () {
	  var propsData = this._data
	  var optionsDataFn = this.$options.data
	  var optionsData = optionsDataFn && optionsDataFn()
	  if (optionsData) {
	    this._data = optionsData
	    for (var prop in propsData) {
	      if (process.env.NODE_ENV !== 'production' &&
	          optionsData.hasOwnProperty(prop)) {
	        _.warn(
	          'Data field "' + prop + '" is already defined ' +
	          'as a prop. Use prop default value instead.'
	        )
	      }
	      if (this._props[prop].raw !== null ||
	          !optionsData.hasOwnProperty(prop)) {
	        _.set(optionsData, prop, propsData[prop])
	      }
	    }
	  }
	  var data = this._data
	  // proxy data on instance
	  var keys = Object.keys(data)
	  var i, key
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    this._proxy(key)
	  }
	  // observe data
	  Observer.create(data, this)
	}

	/**
	 * Swap the isntance's $data. Called in $data's setter.
	 *
	 * @param {Object} newData
	 */

	exports._setData = function (newData) {
	  newData = newData || {}
	  var oldData = this._data
	  this._data = newData
	  var keys, key, i
	  // unproxy keys not present in new data
	  keys = Object.keys(oldData)
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    if (!(key in newData)) {
	      this._unproxy(key)
	    }
	  }
	  // proxy keys not already proxied,
	  // and trigger change for changed values
	  keys = Object.keys(newData)
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    if (!this.hasOwnProperty(key)) {
	      // new property
	      this._proxy(key)
	    }
	  }
	  oldData.__ob__.removeVm(this)
	  Observer.create(newData, this)
	  this._digest()
	}

	/**
	 * Proxy a property, so that
	 * vm.prop === vm._data.prop
	 *
	 * @param {String} key
	 */

	exports._proxy = function (key) {
	  if (!_.isReserved(key)) {
	    // need to store ref to self here
	    // because these getter/setters might
	    // be called by child scopes via
	    // prototype inheritance.
	    var self = this
	    Object.defineProperty(self, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return self._data[key]
	      },
	      set: function proxySetter (val) {
	        self._data[key] = val
	      }
	    })
	  }
	}

	/**
	 * Unproxy a property.
	 *
	 * @param {String} key
	 */

	exports._unproxy = function (key) {
	  if (!_.isReserved(key)) {
	    delete this[key]
	  }
	}

	/**
	 * Force update on every watcher in scope.
	 */

	exports._digest = function () {
	  for (var i = 0, l = this._watchers.length; i < l; i++) {
	    this._watchers[i].update(true) // shallow updates
	  }
	}

	/**
	 * Setup computed properties. They are essentially
	 * special getter/setters
	 */

	function noop () {}
	exports._initComputed = function () {
	  var computed = this.$options.computed
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key]
	      var def = {
	        enumerable: true,
	        configurable: true
	      }
	      if (typeof userDef === 'function') {
	        def.get = makeComputedGetter(userDef, this)
	        def.set = noop
	      } else {
	        def.get = userDef.get
	          ? userDef.cache !== false
	            ? makeComputedGetter(userDef.get, this)
	            : _.bind(userDef.get, this)
	          : noop
	        def.set = userDef.set
	          ? _.bind(userDef.set, this)
	          : noop
	      }
	      Object.defineProperty(this, key, def)
	    }
	  }
	}

	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, null, {
	    lazy: true
	  })
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate()
	    }
	    if (Dep.target) {
	      watcher.depend()
	    }
	    return watcher.value
	  }
	}

	/**
	 * Setup instance methods. Methods must be bound to the
	 * instance since they might be passed down as a prop to
	 * child components.
	 */

	exports._initMethods = function () {
	  var methods = this.$options.methods
	  if (methods) {
	    for (var key in methods) {
	      this[key] = _.bind(methods[key], this)
	    }
	  }
	}

	/**
	 * Initialize meta information like $index, $key & $value.
	 */

	exports._initMeta = function () {
	  var metas = this.$options._meta
	  if (metas) {
	    for (var key in metas) {
	      _.defineReactive(this, key, metas[key])
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var Dep = __webpack_require__(43)
	var arrayMethods = __webpack_require__(62)
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods)

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer (value) {
	  this.value = value
	  this.dep = new Dep()
	  _.define(value, '__ob__', this)
	  if (_.isArray(value)) {
	    var augment = _.hasProto
	      ? protoAugment
	      : copyAugment
	    augment(value, arrayMethods, arrayKeys)
	    this.observeArray(value)
	  } else {
	    this.walk(value)
	  }
	}

	// Static methods

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	Observer.create = function (value, vm) {
	  if (!value || typeof value !== 'object') {
	    return
	  }
	  var ob
	  if (
	    value.hasOwnProperty('__ob__') &&
	    value.__ob__ instanceof Observer
	  ) {
	    ob = value.__ob__
	  } else if (
	    (_.isArray(value) || _.isPlainObject(value)) &&
	    !Object.isFrozen(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value)
	  }
	  if (ob && vm) {
	    ob.addVm(vm)
	  }
	  return ob
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj)
	  var i = keys.length
	  while (i--) {
	    this.convert(keys[i], obj[keys[i]])
	  }
	}

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  var i = items.length
	  while (i--) {
	    var ob = Observer.create(items[i])
	    if (ob) {
	      (ob.parents || (ob.parents = [])).push(this)
	    }
	  }
	}

	/**
	 * Remove self from the parent list of removed objects.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.unobserveArray = function (items) {
	  var i = items.length
	  while (i--) {
	    var ob = items[i] && items[i].__ob__
	    if (ob) {
	      ob.parents.$remove(this)
	    }
	  }
	}

	/**
	 * Notify self dependency, and also parent Array dependency
	 * if any.
	 */

	Observer.prototype.notify = function () {
	  this.dep.notify()
	  var parents = this.parents
	  if (parents) {
	    var i = parents.length
	    while (i--) {
	      parents[i].notify()
	    }
	  }
	}

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val)
	}

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm)
	}

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm)
	}

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function protoAugment (target, src) {
	  target.__proto__ = src
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment (target, src, keys) {
	  var i = keys.length
	  var key
	  while (i--) {
	    key = keys[i]
	    _.define(target, key, src[key])
	  }
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive (obj, key, val) {
	  var dep = new Dep()
	  var childOb = Observer.create(val)
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function metaGetter () {
	      if (Dep.target) {
	        dep.depend()
	        if (childOb) {
	          childOb.dep.depend()
	        }
	      }
	      return val
	    },
	    set: function metaSetter (newVal) {
	      if (newVal === val) return
	      val = newVal
	      childOb = Observer.create(newVal)
	      dep.notify()
	    }
	  })
	}

	// Attach to the util object so it can be used elsewhere.
	_.defineReactive = defineReactive

	module.exports = Observer


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var arrayProto = Array.prototype
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method]
	  _.define(arrayMethods, method, function mutator () {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length
	    var args = new Array(i)
	    while (i--) {
	      args[i] = arguments[i]
	    }
	    var result = original.apply(this, args)
	    var ob = this.__ob__
	    var inserted, removed
	    switch (method) {
	      case 'push':
	        inserted = args
	        break
	      case 'unshift':
	        inserted = args
	        break
	      case 'splice':
	        inserted = args.slice(2)
	        removed = result
	        break
	      case 'pop':
	      case 'shift':
	        removed = [result]
	        break
	    }
	    if (inserted) ob.observeArray(inserted)
	    if (removed) ob.unobserveArray(removed)
	    // notify change
	    ob.notify()
	    return result
	  })
	})

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	_.define(
	  arrayProto,
	  '$set',
	  function $set (index, val) {
	    if (index >= this.length) {
	      this.length = index + 1
	    }
	    return this.splice(index, 1, val)[0]
	  }
	)

	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */

	_.define(
	  arrayProto,
	  '$remove',
	  function $remove (item) {
	    /* istanbul ignore if */
	    if (!this.length) return
	    var index = _.indexOf(this, item)
	    if (index > -1) {
	      return this.splice(index, 1)
	    }
	  }
	)

	module.exports = arrayMethods


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var Directive = __webpack_require__(64)
	var compiler = __webpack_require__(16)

	/**
	 * Transclude, compile and link element.
	 *
	 * If a pre-compiled linker is available, that means the
	 * passed in element will be pre-transcluded and compiled
	 * as well - all we need to do is to call the linker.
	 *
	 * Otherwise we need to call transclude/compile/link here.
	 *
	 * @param {Element} el
	 * @return {Element}
	 */

	exports._compile = function (el) {
	  var options = this.$options

	  // transclude and init element
	  // transclude can potentially replace original
	  // so we need to keep reference; this step also injects
	  // the template and caches the original attributes
	  // on the container node and replacer node.
	  var original = el
	  el = compiler.transclude(el, options)
	  this._initElement(el)

	  // root is always compiled per-instance, because
	  // container attrs and props can be different every time.
	  var contextOptions = this._context && this._context.$options
	  var rootLinker = compiler.compileRoot(el, options, contextOptions)

	  // compile and link the rest
	  var contentLinkFn
	  var ctor = this.constructor
	  // component compilation can be cached
	  // as long as it's not using inline-template
	  if (options._linkerCachable) {
	    contentLinkFn = ctor.linker
	    if (!contentLinkFn) {
	      contentLinkFn = ctor.linker = compiler.compile(el, options)
	    }
	  }

	  // link phase
	  // make sure to link root with prop scope!
	  var rootUnlinkFn = rootLinker(this, el, this._scope)
	  var contentUnlinkFn = contentLinkFn
	    ? contentLinkFn(this, el)
	    : compiler.compile(el, options)(this, el)

	  // register composite unlink function
	  // to be called during instance destruction
	  this._unlinkFn = function () {
	    rootUnlinkFn()
	    // passing destroying: true to avoid searching and
	    // splicing the directives
	    contentUnlinkFn(true)
	  }

	  // finally replace original
	  if (options.replace) {
	    _.replace(original, el)
	  }

	  this._isCompiled = true
	  this._callHook('compiled')
	  return el
	}

	/**
	 * Initialize instance element. Called in the public
	 * $mount() method.
	 *
	 * @param {Element} el
	 */

	exports._initElement = function (el) {
	  if (el instanceof DocumentFragment) {
	    this._isFragment = true
	    this.$el = this._fragmentStart = el.firstChild
	    this._fragmentEnd = el.lastChild
	    // set persisted text anchors to empty
	    if (this._fragmentStart.nodeType === 3) {
	      this._fragmentStart.data = this._fragmentEnd.data = ''
	    }
	    this._fragment = el
	  } else {
	    this.$el = el
	  }
	  this.$el.__vue__ = this
	  this._callHook('beforeCompile')
	}

	/**
	 * Create and bind a directive to an element.
	 *
	 * @param {String} name - directive name
	 * @param {Node} node   - target node
	 * @param {Object} desc - parsed directive descriptor
	 * @param {Object} def  - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 */

	exports._bindDir = function (descriptor, node, host, scope, frag) {
	  this._directives.push(
	    new Directive(descriptor, this, node, host, scope, frag)
	  )
	}

	/**
	 * Teardown an instance, unobserves the data, unbind all the
	 * directives, turn off all the event listeners, etc.
	 *
	 * @param {Boolean} remove - whether to remove the DOM node.
	 * @param {Boolean} deferCleanup - if true, defer cleanup to
	 *                                 be called later
	 */

	exports._destroy = function (remove, deferCleanup) {
	  if (this._isBeingDestroyed) {
	    return
	  }
	  this._callHook('beforeDestroy')
	  this._isBeingDestroyed = true
	  var i
	  // remove self from parent. only necessary
	  // if parent is not being destroyed as well.
	  var parent = this.$parent
	  if (parent && !parent._isBeingDestroyed) {
	    parent.$children.$remove(this)
	    // unregister ref
	    var ref = this.$options._ref
	    if (ref) {
	      var scope = this._scope || this._context
	      if (scope.$refs[ref] === this) {
	        scope.$refs[ref] = null
	      }
	    }
	  }
	  // remove self from owner fragment
	  if (this._frag) {
	    this._frag.children.$remove(this)
	  }
	  // destroy all children.
	  i = this.$children.length
	  while (i--) {
	    this.$children[i].$destroy()
	  }
	  // teardown props
	  if (this._propsUnlinkFn) {
	    this._propsUnlinkFn()
	  }
	  // teardown all directives. this also tearsdown all
	  // directive-owned watchers.
	  if (this._unlinkFn) {
	    this._unlinkFn()
	  }
	  i = this._watchers.length
	  while (i--) {
	    this._watchers[i].teardown()
	  }
	  // remove reference to self on $el
	  if (this.$el) {
	    this.$el.__vue__ = null
	  }
	  // remove DOM element
	  var self = this
	  if (remove && this.$el) {
	    this.$remove(function () {
	      self._cleanup()
	    })
	  } else if (!deferCleanup) {
	    this._cleanup()
	  }
	}

	/**
	 * Clean up to ensure garbage collection.
	 * This is called after the leave transition if there
	 * is any.
	 */

	exports._cleanup = function () {
	  // remove reference from data ob
	  // frozen object may not have observer.
	  if (this._data.__ob__) {
	    this._data.__ob__.removeVm(this)
	  }
	  // Clean up references to private properties and other
	  // instances. preserve reference to _data so that proxy
	  // accessors still work. The only potential side effect
	  // here is that mutating the instance after it's destroyed
	  // may affect the state of other components that are still
	  // observing the same object, but that seems to be a
	  // reasonable responsibility for the user rather than
	  // always throwing an error on them.
	  this.$el =
	  this.$parent =
	  this.$root =
	  this.$children =
	  this._watchers =
	  this._context =
	  this._scope =
	  this._directives = null
	  // call the last hook...
	  this._isDestroyed = true
	  this._callHook('destroyed')
	  // turn off all instance listeners.
	  this.$off()
	}


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var Watcher = __webpack_require__(42)
	var expParser = __webpack_require__(44)
	function noop () {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {String} name
	 * @param {Node} el
	 * @param {Vue} vm
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} raw
	 * @param {Object} def - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */

	function Directive (descriptor, vm, el, host, scope, frag) {
	  this.vm = vm
	  this.el = el
	  // copy descriptor properties
	  this.descriptor = descriptor
	  this.name = descriptor.name
	  this.expression = descriptor.expression
	  this.arg = descriptor.arg
	  this.modifiers = descriptor.modifiers
	  this.filters = descriptor.filters
	  this.literal = this.modifiers && this.modifiers.literal
	  // private
	  this._locked = false
	  this._bound = false
	  this._listeners = null
	  // link context
	  this._host = host
	  this._scope = scope
	  this._frag = frag
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || []
	    this.el._vue_directives.push(this)
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */

	Directive.prototype._bind = function () {
	  var name = this.name
	  var descriptor = this.descriptor

	  // remove attribute
	  if (
	    (name !== 'cloak' || this.vm._isCompiled) &&
	    this.el && this.el.removeAttribute
	  ) {
	    var attr = descriptor.attr || ('v-' + name)
	    this.el.removeAttribute(attr)
	  }

	  // copy def properties
	  var def = descriptor.def
	  if (typeof def === 'function') {
	    this.update = def
	  } else {
	    _.extend(this, def)
	  }

	  // setup directive params
	  this._setupParams()

	  // initial bind
	  if (this.bind) {
	    this.bind()
	  }

	  if (this.literal) {
	    this.update && this.update(descriptor.raw)
	  } else if (
	    (this.expression || this.modifiers) &&
	    (this.update || this.twoWay) &&
	    !this._checkStatement()
	  ) {
	    // wrapped updater for context
	    var dir = this
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal)
	        }
	      }
	    } else {
	      this._update = noop
	    }
	    var preProcess = this._preProcess
	      ? _.bind(this._preProcess, this)
	      : null
	    var postProcess = this._postProcess
	      ? _.bind(this._postProcess, this)
	      : null
	    var watcher = this._watcher = new Watcher(
	      this.vm,
	      this.expression,
	      this._update, // callback
	      {
	        filters: this.filters,
	        twoWay: this.twoWay,
	        deep: this.deep,
	        preProcess: preProcess,
	        postProcess: postProcess,
	        scope: this._scope
	      }
	    )
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind()
	    } else if (this.update) {
	      this.update(watcher.value)
	    }
	  }
	  this._bound = true
	}

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return
	  }
	  var params = this.params
	  // swap the params array with a fresh object.
	  this.params = Object.create(null)
	  var i = params.length
	  var key, val, mappedKey
	  while (i--) {
	    key = params[i]
	    mappedKey = _.camelize(key)
	    val = _.attr(this.el, key)
	    if (val != null) {
	      // static
	      this.params[mappedKey] = val === '' ? true : val
	    } else {
	      // dynamic
	      val = _.getBindAttr(this.el, key)
	      if (val != null) {
	        this._setupParamWatcher(mappedKey, val)
	      }
	    }
	  }
	}

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this
	  var called = false
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key]
	      if (cb) {
	        cb.call(self, val, oldVal)
	      }
	    } else {
	      called = true
	    }
	  }, {
	    immediate: true
	  })
	  ;(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch)
	}

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression
	  if (
	    expression && this.acceptStatement &&
	    !expParser.isSimplePath(expression)
	  ) {
	    var fn = expParser.parse(expression).get
	    var scope = this._scope || this.vm
	    var handler = function () {
	      fn.call(scope, scope)
	    }
	    if (this.filters) {
	      handler = this.vm._applyFilters(handler, null, this.filters)
	    }
	    this.update(handler)
	    return true
	  }
	}

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value)
	    })
	  } else if (process.env.NODE_ENV !== 'production') {
	    _.warn(
	      'Directive.set() can only be used inside twoWay' +
	      'directives.'
	    )
	  }
	}

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this
	  self._locked = true
	  fn.call(self)
	  _.nextTick(function () {
	    self._locked = false
	  })
	}

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 */

	Directive.prototype.on = function (event, handler) {
	  _.on(this.el, event, handler)
	  ;(this._listeners || (this._listeners = []))
	    .push([event, handler])
	}

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false
	    if (this.unbind) {
	      this.unbind()
	    }
	    if (this._watcher) {
	      this._watcher.teardown()
	    }
	    var listeners = this._listeners
	    var i
	    if (listeners) {
	      i = listeners.length
	      while (i--) {
	        _.off(this.el, listeners[i][0], listeners[i][1])
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns
	    if (unwatchFns) {
	      i = unwatchFns.length
	      while (i--) {
	        unwatchFns[i]()
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this)
	    }
	    this.vm = this.el = this._watcher = this._listeners = null
	  }
	}

	module.exports = Directive

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)

	/**
	 * Apply a list of filter (descriptors) to a value.
	 * Using plain for loops here because this will be called in
	 * the getter of any watcher with filters so it is very
	 * performance sensitive.
	 *
	 * @param {*} value
	 * @param {*} [oldValue]
	 * @param {Array} filters
	 * @param {Boolean} write
	 * @return {*}
	 */

	exports._applyFilters = function (value, oldValue, filters, write) {
	  var filter, fn, args, arg, offset, i, l, j, k
	  for (i = 0, l = filters.length; i < l; i++) {
	    filter = filters[i]
	    fn = _.resolveAsset(this.$options, 'filters', filter.name)
	    if (process.env.NODE_ENV !== 'production') {
	      _.assertAsset(fn, 'filter', filter.name)
	    }
	    if (!fn) continue
	    fn = write ? fn.write : (fn.read || fn)
	    if (typeof fn !== 'function') continue
	    args = write ? [value, oldValue] : [value]
	    offset = write ? 2 : 1
	    if (filter.args) {
	      for (j = 0, k = filter.args.length; j < k; j++) {
	        arg = filter.args[j]
	        args[j + offset] = arg.dynamic
	          ? this.$get(arg.value)
	          : arg.value
	      }
	    }
	    value = fn.apply(this, args)
	  }
	  return value
	}

	/**
	 * Resolve a component, depending on whether the component
	 * is defined normally or using an async factory function.
	 * Resolves synchronously if already resolved, otherwise
	 * resolves asynchronously and caches the resolved
	 * constructor on the factory.
	 *
	 * @param {String} id
	 * @param {Function} cb
	 */

	exports._resolveComponent = function (id, cb) {
	  var factory = _.resolveAsset(this.$options, 'components', id)
	  if (process.env.NODE_ENV !== 'production') {
	    _.assertAsset(factory, 'component', id)
	  }
	  if (!factory) {
	    return
	  }
	  // async component factory
	  if (!factory.options) {
	    if (factory.resolved) {
	      // cached
	      cb(factory.resolved)
	    } else if (factory.requested) {
	      // pool callbacks
	      factory.pendingCallbacks.push(cb)
	    } else {
	      factory.requested = true
	      var cbs = factory.pendingCallbacks = [cb]
	      factory(function resolve (res) {
	        if (_.isPlainObject(res)) {
	          res = _.Vue.extend(res)
	        }
	        // cache resolved
	        factory.resolved = res
	        // invoke callbacks
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res)
	        }
	      }, function reject (reason) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Failed to resolve async component: ' + id + '. ' +
	          (reason ? '\nReason: ' + reason : '')
	        )
	      })
	    }
	  } else {
	    // normal component
	    cb(factory)
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var Watcher = __webpack_require__(42)
	var Path = __webpack_require__(45)
	var textParser = __webpack_require__(8)
	var dirParser = __webpack_require__(10)
	var expParser = __webpack_require__(44)
	var filterRE = /[^|]\|[^|]/

	/**
	 * Get the value from an expression on this vm.
	 *
	 * @param {String} exp
	 * @param {Boolean} [asStatement]
	 * @return {*}
	 */

	exports.$get = function (exp, asStatement) {
	  var res = expParser.parse(exp)
	  if (res) {
	    if (asStatement && !expParser.isSimplePath(exp)) {
	      var self = this
	      return function statementHandler () {
	        res.get.call(self, self)
	      }
	    } else {
	      try {
	        return res.get.call(this, this)
	      } catch (e) {}
	    }
	  }
	}

	/**
	 * Set the value from an expression on this vm.
	 * The expression must be a valid left-hand
	 * expression in an assignment.
	 *
	 * @param {String} exp
	 * @param {*} val
	 */

	exports.$set = function (exp, val) {
	  var res = expParser.parse(exp, true)
	  if (res && res.set) {
	    res.set.call(this, this, val)
	  }
	}

	/**
	 * Delete a property on the VM
	 *
	 * @param {String} key
	 */

	exports.$delete = function (key) {
	  _.delete(this._data, key)
	}

	/**
	 * Watch an expression, trigger callback when its
	 * value changes.
	 *
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} [options]
	 *                 - {Boolean} deep
	 *                 - {Boolean} immediate
	 * @return {Function} - unwatchFn
	 */

	exports.$watch = function (expOrFn, cb, options) {
	  var vm = this
	  var parsed
	  if (typeof expOrFn === 'string') {
	    parsed = dirParser.parse(expOrFn)
	    expOrFn = parsed.expression
	  }
	  var watcher = new Watcher(vm, expOrFn, cb, {
	    deep: options && options.deep,
	    filters: parsed && parsed.filters
	  })
	  if (options && options.immediate) {
	    cb.call(vm, watcher.value)
	  }
	  return function unwatchFn () {
	    watcher.teardown()
	  }
	}

	/**
	 * Evaluate a text directive, including filters.
	 *
	 * @param {String} text
	 * @param {Boolean} [asStatement]
	 * @return {String}
	 */

	exports.$eval = function (text, asStatement) {
	  // check for filters.
	  if (filterRE.test(text)) {
	    var dir = dirParser.parse(text)
	    // the filter regex check might give false positive
	    // for pipes inside strings, so it's possible that
	    // we don't get any filters here
	    var val = this.$get(dir.expression, asStatement)
	    return dir.filters
	      ? this._applyFilters(val, null, dir.filters)
	      : val
	  } else {
	    // no filter
	    return this.$get(text, asStatement)
	  }
	}

	/**
	 * Interpolate a piece of template text.
	 *
	 * @param {String} text
	 * @return {String}
	 */

	exports.$interpolate = function (text) {
	  var tokens = textParser.parse(text)
	  var vm = this
	  if (tokens) {
	    if (tokens.length === 1) {
	      return vm.$eval(tokens[0].value) + ''
	    } else {
	      return tokens.map(function (token) {
	        return token.tag
	          ? vm.$eval(token.value)
	          : token.value
	      }).join('')
	    }
	  } else {
	    return text
	  }
	}

	/**
	 * Log instance data as a plain JS object
	 * so that it is easier to inspect in console.
	 * This method assumes console is available.
	 *
	 * @param {String} [path]
	 */

	exports.$log = function (path) {
	  var data = path
	    ? Path.get(this._data, path)
	    : this._data
	  if (data) {
	    data = clean(data)
	  }
	  // include computed fields
	  if (!path) {
	    for (var key in this.$options.computed) {
	      data[key] = clean(this[key])
	    }
	  }
	  console.log(data)
	}

	/**
	 * "clean" a getter/setter converted object into a plain
	 * object copy.
	 *
	 * @param {Object} - obj
	 * @return {Object}
	 */

	function clean (obj) {
	  return JSON.parse(JSON.stringify(obj))
	}


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)
	var transition = __webpack_require__(11)

	/**
	 * Convenience on-instance nextTick. The callback is
	 * auto-bound to the instance, and this avoids component
	 * modules having to rely on the global Vue.
	 *
	 * @param {Function} fn
	 */

	exports.$nextTick = function (fn) {
	  _.nextTick(fn, this)
	}

	/**
	 * Append instance to target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$appendTo = function (target, cb, withTransition) {
	  return insert(
	    this, target, cb, withTransition,
	    append, transition.append
	  )
	}

	/**
	 * Prepend instance to target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$prependTo = function (target, cb, withTransition) {
	  target = query(target)
	  if (target.hasChildNodes()) {
	    this.$before(target.firstChild, cb, withTransition)
	  } else {
	    this.$appendTo(target, cb, withTransition)
	  }
	  return this
	}

	/**
	 * Insert instance before target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$before = function (target, cb, withTransition) {
	  return insert(
	    this, target, cb, withTransition,
	    before, transition.before
	  )
	}

	/**
	 * Insert instance after target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$after = function (target, cb, withTransition) {
	  target = query(target)
	  if (target.nextSibling) {
	    this.$before(target.nextSibling, cb, withTransition)
	  } else {
	    this.$appendTo(target.parentNode, cb, withTransition)
	  }
	  return this
	}

	/**
	 * Remove instance from DOM
	 *
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$remove = function (cb, withTransition) {
	  if (!this.$el.parentNode) {
	    return cb && cb()
	  }
	  var inDoc = this._isAttached && _.inDoc(this.$el)
	  // if we are not in document, no need to check
	  // for transitions
	  if (!inDoc) withTransition = false
	  var self = this
	  var realCb = function () {
	    if (inDoc) self._callHook('detached')
	    if (cb) cb()
	  }
	  if (this._isFragment) {
	    _.removeNodeRange(
	      this._fragmentStart,
	      this._fragmentEnd,
	      this, this._fragment, realCb
	    )
	  } else {
	    var op = withTransition === false
	      ? remove
	      : transition.remove
	    op(this.$el, this, realCb)
	  }
	  return this
	}

	/**
	 * Shared DOM insertion function.
	 *
	 * @param {Vue} vm
	 * @param {Element} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition]
	 * @param {Function} op1 - op for non-transition insert
	 * @param {Function} op2 - op for transition insert
	 * @return vm
	 */

	function insert (vm, target, cb, withTransition, op1, op2) {
	  target = query(target)
	  var targetIsDetached = !_.inDoc(target)
	  var op = withTransition === false || targetIsDetached
	      ? op1
	      : op2
	  var shouldCallHook =
	    !targetIsDetached &&
	    !vm._isAttached &&
	    !_.inDoc(vm.$el)
	  if (vm._isFragment) {
	    _.mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	      op(node, target, vm)
	    })
	    cb && cb()
	  } else {
	    op(vm.$el, target, vm, cb)
	  }
	  if (shouldCallHook) {
	    vm._callHook('attached')
	  }
	  return vm
	}

	/**
	 * Check for selectors
	 *
	 * @param {String|Element} el
	 */

	function query (el) {
	  return typeof el === 'string'
	    ? document.querySelector(el)
	    : el
	}

	/**
	 * Append operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Node} target
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */

	function append (el, target, vm, cb) {
	  target.appendChild(el)
	  if (cb) cb()
	}

	/**
	 * InsertBefore operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Node} target
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */

	function before (el, target, vm, cb) {
	  _.before(el, target)
	  if (cb) cb()
	}

	/**
	 * Remove operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */

	function remove (el, vm, cb) {
	  _.remove(el)
	  if (cb) cb()
	}


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3)

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */

	exports.$on = function (event, fn) {
	  (this._events[event] || (this._events[event] = []))
	    .push(fn)
	  modifyListenerCount(this, event, 1)
	  return this
	}

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */

	exports.$once = function (event, fn) {
	  var self = this
	  function on () {
	    self.$off(event, on)
	    fn.apply(this, arguments)
	  }
	  on.fn = fn
	  this.$on(event, on)
	  return this
	}

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */

	exports.$off = function (event, fn) {
	  var cbs
	  // all
	  if (!arguments.length) {
	    if (this.$parent) {
	      for (event in this._events) {
	        cbs = this._events[event]
	        if (cbs) {
	          modifyListenerCount(this, event, -cbs.length)
	        }
	      }
	    }
	    this._events = {}
	    return this
	  }
	  // specific event
	  cbs = this._events[event]
	  if (!cbs) {
	    return this
	  }
	  if (arguments.length === 1) {
	    modifyListenerCount(this, event, -cbs.length)
	    this._events[event] = null
	    return this
	  }
	  // specific handler
	  var cb
	  var i = cbs.length
	  while (i--) {
	    cb = cbs[i]
	    if (cb === fn || cb.fn === fn) {
	      modifyListenerCount(this, event, -1)
	      cbs.splice(i, 1)
	      break
	    }
	  }
	  return this
	}

	/**
	 * Trigger an event on self.
	 *
	 * @param {String} event
	 */

	exports.$emit = function (event) {
	  var cbs = this._events[event]
	  this._shouldPropagate = !cbs
	  if (cbs) {
	    cbs = cbs.length > 1
	      ? _.toArray(cbs)
	      : cbs
	    var args = _.toArray(arguments, 1)
	    for (var i = 0, l = cbs.length; i < l; i++) {
	      var res = cbs[i].apply(this, args)
	      if (res === true) {
	        this._shouldPropagate = true
	      }
	    }
	  }
	  return this
	}

	/**
	 * Recursively broadcast an event to all children instances.
	 *
	 * @param {String} event
	 * @param {...*} additional arguments
	 */

	exports.$broadcast = function (event) {
	  // if no child has registered for this event,
	  // then there's no need to broadcast.
	  if (!this._eventsCount[event]) return
	  var children = this.$children
	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i]
	    child.$emit.apply(child, arguments)
	    if (child._shouldPropagate) {
	      child.$broadcast.apply(child, arguments)
	    }
	  }
	  return this
	}

	/**
	 * Recursively propagate an event up the parent chain.
	 *
	 * @param {String} event
	 * @param {...*} additional arguments
	 */

	exports.$dispatch = function () {
	  this.$emit.apply(this, arguments)
	  var parent = this.$parent
	  while (parent) {
	    parent.$emit.apply(parent, arguments)
	    parent = parent._shouldPropagate
	      ? parent.$parent
	      : null
	  }
	  return this
	}

	/**
	 * Modify the listener counts on all parents.
	 * This bookkeeping allows $broadcast to return early when
	 * no child has listened to a certain event.
	 *
	 * @param {Vue} vm
	 * @param {String} event
	 * @param {Number} count
	 */

	var hookRE = /^hook:/
	function modifyListenerCount (vm, event, count) {
	  var parent = vm.$parent
	  // hooks do not get broadcasted so no need
	  // to do bookkeeping for them
	  if (!parent || !count || hookRE.test(event)) return
	  while (parent) {
	    parent._eventsCount[event] =
	      (parent._eventsCount[event] || 0) + count
	    parent = parent.$parent
	  }
	}


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3)
	var compiler = __webpack_require__(16)

	/**
	 * Set instance target element and kick off the compilation
	 * process. The passed in `el` can be a selector string, an
	 * existing Element, or a DocumentFragment (for block
	 * instances).
	 *
	 * @param {Element|DocumentFragment|string} el
	 * @public
	 */

	exports.$mount = function (el) {
	  if (this._isCompiled) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      '$mount() should be called only once.'
	    )
	    return
	  }
	  el = _.query(el)
	  if (!el) {
	    el = document.createElement('div')
	  }
	  this._compile(el)
	  this._initDOMHooks()
	  if (_.inDoc(this.$el)) {
	    this._callHook('attached')
	    ready.call(this)
	  } else {
	    this.$once('hook:attached', ready)
	  }
	  return this
	}

	/**
	 * Mark an instance as ready.
	 */

	function ready () {
	  this._isAttached = true
	  this._isReady = true
	  this._callHook('ready')
	}

	/**
	 * Teardown the instance, simply delegate to the internal
	 * _destroy.
	 */

	exports.$destroy = function (remove, deferCleanup) {
	  this._destroy(remove, deferCleanup)
	}

	/**
	 * Partially compile a piece of DOM and return a
	 * decompile function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Vue} [host]
	 * @return {Function}
	 */

	exports.$compile = function (el, host, scope, frag) {
	  return compiler.compile(el, this.$options, true)(
	    this, el, host, scope, frag
	  )
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }
/******/ ]);