webpackJsonp([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(302);
	module.exports = __webpack_require__(335);


/***/ },

/***/ 304:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var increment = exports.increment = function increment(_ref) {
	  var commit = _ref.commit;
	  return commit('increment');
	};
	var decrement = exports.decrement = function decrement(_ref2) {
	  var commit = _ref2.commit;
	  return commit('decrement');
	};
	
	var incrementIfOdd = exports.incrementIfOdd = function incrementIfOdd(_ref3) {
	  var commit = _ref3.commit,
	      state = _ref3.state;
	
	  if ((state.count + 1) % 2 === 0) {
	    commit('increment');
	  }
	};
	
	var incrementAsync = exports.incrementAsync = function incrementAsync(_ref4) {
	  var commit = _ref4.commit;
	
	  setTimeout(function () {
	    commit('increment');
	  }, 1000);
	};

/***/ },

/***/ 305:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var count = exports.count = function count(state) {
	  return state.count;
	};
	
	var limit = 5;
	
	var recentHistory = exports.recentHistory = function recentHistory(state) {
	  var end = state.history.length;
	  var begin = end - limit < 0 ? 0 : end - limit;
	  return state.history.slice(begin, end).toString().replace(/,/g, ', ');
	};

/***/ },

/***/ 306:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var increment = exports.increment = function increment(state) {
	  state.count++;
	  state.history.push('increment');
	};
	
	var decrement = exports.decrement = function decrement(state) {
	  state.count--;
	  state.history.push('decrement');
	};

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _vuex = __webpack_require__(88);
	
	exports.default = {
	  computed: (0, _vuex.mapGetters)(['count', 'recentHistory']),
	  methods: (0, _vuex.mapActions)(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync'])
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },

/***/ 335:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(50);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _store = __webpack_require__(336);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _Counter = __webpack_require__(358);
	
	var _Counter2 = _interopRequireDefault(_Counter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	new _vue2.default({
	  el: '#app',
	  store: _store2.default,
	  render: function render(h) {
	    return h(_Counter2.default);
	  }
	});

/***/ },

/***/ 336:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _vue = __webpack_require__(50);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vuex = __webpack_require__(88);
	
	var _vuex2 = _interopRequireDefault(_vuex);
	
	var _getters = __webpack_require__(305);
	
	var getters = _interopRequireWildcard(_getters);
	
	var _actions = __webpack_require__(304);
	
	var actions = _interopRequireWildcard(_actions);
	
	var _mutations = __webpack_require__(306);
	
	var mutations = _interopRequireWildcard(_mutations);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vuex2.default);
	
	var state = {
	  count: 0,
	  history: []
	};
	
	var store = new _vuex2.default.Store({
	  state: state,
	  getters: getters,
	  actions: actions,
	  mutations: mutations
	});
	
	if (true) {
	  module.hot.accept([305, 304, 306], function () {
	    store.hotUpdate({
	      getters: __webpack_require__(305),
	      actions: __webpack_require__(304),
	      mutations: __webpack_require__(306)
	    });
	  });
	}
	
	exports.default = store;

/***/ },

/***/ 358:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(322)
	
	/* template */
	var __vue_template__ = __webpack_require__(367)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/luonan/Sites/vue_demo/vuex-demo-official/vuex/examples/counter-hot/Counter.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (true) {(function () {
	  var hotAPI = __webpack_require__(46)
	  hotAPI.install(__webpack_require__(50), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-29a24c59", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-29a24c59", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Counter.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 367:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', ["\n  Value: " + _vm._s(_vm.count) + "\n  ", _h('button', {
	    on: {
	      "click": _vm.increment
	    }
	  }, ["+"]), " ", _h('button', {
	    on: {
	      "click": _vm.decrement
	    }
	  }, ["-"]), " ", _h('button', {
	    on: {
	      "click": _vm.incrementIfOdd
	    }
	  }, ["Increment if odd"]), " ", _h('button', {
	    on: {
	      "click": _vm.incrementAsync
	    }
	  }, ["Increment async"]), " ", _h('div', [_h('div', ["Recent History (last 5 entries): " + _vm._s(_vm.recentHistory)])])])
	},staticRenderFns: []}
	if (true) {
	  module.hot.accept()
	  if (module.hot.data) {
	     __webpack_require__(46).rerender("data-v-29a24c59", module.exports)
	  }
	}

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb3VudGVyLWhvdC9zdG9yZS9hY3Rpb25zLmpzIiwid2VicGFjazovLy8uL2NvdW50ZXItaG90L3N0b3JlL2dldHRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vY291bnRlci1ob3Qvc3RvcmUvbXV0YXRpb25zLmpzIiwid2VicGFjazovLy9Db3VudGVyLnZ1ZT8zNDU1Iiwid2VicGFjazovLy8uL2NvdW50ZXItaG90L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jb3VudGVyLWhvdC9zdG9yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3VudGVyLWhvdC9Db3VudGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb3VudGVyLWhvdC9Db3VudGVyLnZ1ZT83ZWE0Il0sIm5hbWVzIjpbImluY3JlbWVudCIsImNvbW1pdCIsImRlY3JlbWVudCIsImluY3JlbWVudElmT2RkIiwic3RhdGUiLCJjb3VudCIsImluY3JlbWVudEFzeW5jIiwic2V0VGltZW91dCIsImxpbWl0IiwicmVjZW50SGlzdG9yeSIsImVuZCIsImhpc3RvcnkiLCJsZW5ndGgiLCJiZWdpbiIsInNsaWNlIiwidG9TdHJpbmciLCJyZXBsYWNlIiwicHVzaCIsImVsIiwic3RvcmUiLCJyZW5kZXIiLCJoIiwiZ2V0dGVycyIsImFjdGlvbnMiLCJtdXRhdGlvbnMiLCJ1c2UiLCJTdG9yZSIsIm1vZHVsZSIsImhvdCIsImFjY2VwdCIsImhvdFVwZGF0ZSIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxLQUFNQSxnQ0FBWSxTQUFaQSxTQUFZO0FBQUEsT0FBR0MsTUFBSCxRQUFHQSxNQUFIO0FBQUEsVUFBZ0JBLE9BQU8sV0FBUCxDQUFoQjtBQUFBLEVBQWxCO0FBQ0EsS0FBTUMsZ0NBQVksU0FBWkEsU0FBWTtBQUFBLE9BQUdELE1BQUgsU0FBR0EsTUFBSDtBQUFBLFVBQWdCQSxPQUFPLFdBQVAsQ0FBaEI7QUFBQSxFQUFsQjs7QUFFQSxLQUFNRSwwQ0FBaUIsU0FBakJBLGNBQWlCLFFBQXVCO0FBQUEsT0FBcEJGLE1BQW9CLFNBQXBCQSxNQUFvQjtBQUFBLE9BQVpHLEtBQVksU0FBWkEsS0FBWTs7QUFDbkQsT0FBSSxDQUFDQSxNQUFNQyxLQUFOLEdBQWMsQ0FBZixJQUFvQixDQUFwQixLQUEwQixDQUE5QixFQUFpQztBQUMvQkosWUFBTyxXQUFQO0FBQ0Q7QUFDRixFQUpNOztBQU1BLEtBQU1LLDBDQUFpQixTQUFqQkEsY0FBaUIsUUFBZ0I7QUFBQSxPQUFiTCxNQUFhLFNBQWJBLE1BQWE7O0FBQzVDTSxjQUFXLFlBQU07QUFDZk4sWUFBTyxXQUFQO0FBQ0QsSUFGRCxFQUVHLElBRkg7QUFHRCxFQUpNLEM7Ozs7Ozs7Ozs7OztBQ1RBLEtBQU1JLHdCQUFRLFNBQVJBLEtBQVE7QUFBQSxVQUFTRCxNQUFNQyxLQUFmO0FBQUEsRUFBZDs7QUFFUCxLQUFNRyxRQUFRLENBQWQ7O0FBRU8sS0FBTUMsd0NBQWdCLFNBQWhCQSxhQUFnQixRQUFTO0FBQ3BDLE9BQU1DLE1BQU1OLE1BQU1PLE9BQU4sQ0FBY0MsTUFBMUI7QUFDQSxPQUFNQyxRQUFRSCxNQUFNRixLQUFOLEdBQWMsQ0FBZCxHQUFrQixDQUFsQixHQUFzQkUsTUFBTUYsS0FBMUM7QUFDQSxVQUFPSixNQUFNTyxPQUFOLENBQ0pHLEtBREksQ0FDRUQsS0FERixFQUNTSCxHQURULEVBRUpLLFFBRkksR0FHSkMsT0FISSxDQUdJLElBSEosRUFHVSxJQUhWLENBQVA7QUFJRCxFQVBNLEM7Ozs7Ozs7Ozs7OztBQ0pBLEtBQU1oQixnQ0FBWSxTQUFaQSxTQUFZLFFBQVM7QUFDaENJLFNBQU1DLEtBQU47QUFDQUQsU0FBTU8sT0FBTixDQUFjTSxJQUFkLENBQW1CLFdBQW5CO0FBQ0QsRUFITTs7QUFLQSxLQUFNZixnQ0FBWSxTQUFaQSxTQUFZLFFBQVM7QUFDaENFLFNBQU1DLEtBQU47QUFDQUQsU0FBTU8sT0FBTixDQUFjTSxJQUFkLENBQW1CLFdBQW5CO0FBQ0QsRUFITSxDOzs7Ozs7Ozs7Ozs7O0FDV1A7OzttQ0FFQSxDQUNBLFNBRUE7a0NBQ0EsQ0FDQSxhQUNBLGFBQ0Esa0JBRUE7QUFWQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsbUJBQVE7QUFDTkMsT0FBSSxNQURFO0FBRU5DLHlCQUZNO0FBR05DLFdBQVE7QUFBQSxZQUFLQyxvQkFBTDtBQUFBO0FBSEYsRUFBUixFOzs7Ozs7Ozs7Ozs7O0FDSkE7Ozs7QUFDQTs7OztBQUNBOztLQUFZQyxPOztBQUNaOztLQUFZQyxPOztBQUNaOztLQUFZQyxTOzs7Ozs7QUFFWixlQUFJQyxHQUFKOztBQUVBLEtBQU1yQixRQUFRO0FBQ1pDLFVBQU8sQ0FESztBQUVaTSxZQUFTO0FBRkcsRUFBZDs7QUFLQSxLQUFNUSxRQUFRLElBQUksZUFBS08sS0FBVCxDQUFlO0FBQzNCdEIsZUFEMkI7QUFFM0JrQixtQkFGMkI7QUFHM0JDLG1CQUgyQjtBQUkzQkM7QUFKMkIsRUFBZixDQUFkOztBQU9BLEtBQUksSUFBSixFQUFnQjtBQUNkRyxVQUFPQyxHQUFQLENBQVdDLE1BQVgsQ0FBa0IsQ0FDaEIsR0FEZ0IsRUFFaEIsR0FGZ0IsRUFHaEIsR0FIZ0IsQ0FBbEIsRUFJRyxZQUFNO0FBQ1BWLFdBQU1XLFNBQU4sQ0FBZ0I7QUFDZFIsZ0JBQVMsbUJBQUFTLENBQVEsR0FBUixDQURLO0FBRWRSLGdCQUFTLG1CQUFBUSxDQUFRLEdBQVIsQ0FGSztBQUdkUCxrQkFBVyxtQkFBQU8sQ0FBUSxHQUFSO0FBSEcsTUFBaEI7QUFLRCxJQVZEO0FBV0Q7O21CQUVjWixLOzs7Ozs7O0FDbENmO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUFzRCxtREFBbUQsSUFBSTtBQUM3RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxFQUFDO0FBQ0Qsa0NBQWlDOztBQUVqQzs7Ozs7Ozs7QUNyQ0EsaUJBQWdCLG1CQUFtQixhQUFhO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsImZpbGUiOiJjb3VudGVyLWhvdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBpbmNyZW1lbnQgPSAoeyBjb21taXQgfSkgPT4gY29tbWl0KCdpbmNyZW1lbnQnKVxuZXhwb3J0IGNvbnN0IGRlY3JlbWVudCA9ICh7IGNvbW1pdCB9KSA9PiBjb21taXQoJ2RlY3JlbWVudCcpXG5cbmV4cG9ydCBjb25zdCBpbmNyZW1lbnRJZk9kZCA9ICh7IGNvbW1pdCwgc3RhdGUgfSkgPT4ge1xuICBpZiAoKHN0YXRlLmNvdW50ICsgMSkgJSAyID09PSAwKSB7XG4gICAgY29tbWl0KCdpbmNyZW1lbnQnKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBpbmNyZW1lbnRBc3luYyA9ICh7IGNvbW1pdCB9KSA9PiB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGNvbW1pdCgnaW5jcmVtZW50JylcbiAgfSwgMTAwMClcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY291bnRlci1ob3Qvc3RvcmUvYWN0aW9ucy5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBjb3VudCA9IHN0YXRlID0+IHN0YXRlLmNvdW50XG5cbmNvbnN0IGxpbWl0ID0gNVxuXG5leHBvcnQgY29uc3QgcmVjZW50SGlzdG9yeSA9IHN0YXRlID0+IHtcbiAgY29uc3QgZW5kID0gc3RhdGUuaGlzdG9yeS5sZW5ndGhcbiAgY29uc3QgYmVnaW4gPSBlbmQgLSBsaW1pdCA8IDAgPyAwIDogZW5kIC0gbGltaXRcbiAgcmV0dXJuIHN0YXRlLmhpc3RvcnlcbiAgICAuc2xpY2UoYmVnaW4sIGVuZClcbiAgICAudG9TdHJpbmcoKVxuICAgIC5yZXBsYWNlKC8sL2csICcsICcpXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvdW50ZXItaG90L3N0b3JlL2dldHRlcnMuanNcbiAqKi8iLCJleHBvcnQgY29uc3QgaW5jcmVtZW50ID0gc3RhdGUgPT4ge1xuICBzdGF0ZS5jb3VudCsrXG4gIHN0YXRlLmhpc3RvcnkucHVzaCgnaW5jcmVtZW50Jylcbn1cblxuZXhwb3J0IGNvbnN0IGRlY3JlbWVudCA9IHN0YXRlID0+IHtcbiAgc3RhdGUuY291bnQtLVxuICBzdGF0ZS5oaXN0b3J5LnB1c2goJ2RlY3JlbWVudCcpXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvdW50ZXItaG90L3N0b3JlL211dGF0aW9ucy5qc1xuICoqLyIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICBWYWx1ZToge3sgY291bnQgfX1cbiAgICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPis8L2J1dHRvbj5cbiAgICA8YnV0dG9uIEBjbGljaz1cImRlY3JlbWVudFwiPi08L2J1dHRvbj5cbiAgICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudElmT2RkXCI+SW5jcmVtZW50IGlmIG9kZDwvYnV0dG9uPlxuICAgIDxidXR0b24gQGNsaWNrPVwiaW5jcmVtZW50QXN5bmNcIj5JbmNyZW1lbnQgYXN5bmM8L2J1dHRvbj5cbiAgICA8ZGl2PlxuICAgICAgPGRpdj5SZWNlbnQgSGlzdG9yeSAobGFzdCA1IGVudHJpZXMpOiB7eyByZWNlbnRIaXN0b3J5IH19PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IG1hcEdldHRlcnMsIG1hcEFjdGlvbnMgfSBmcm9tICd2dWV4J1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXB1dGVkOiBtYXBHZXR0ZXJzKFtcbiAgICAnY291bnQnLFxuICAgICdyZWNlbnRIaXN0b3J5J1xuICBdKSxcbiAgbWV0aG9kczogbWFwQWN0aW9ucyhbXG4gICAgJ2luY3JlbWVudCcsXG4gICAgJ2RlY3JlbWVudCcsXG4gICAgJ2luY3JlbWVudElmT2RkJyxcbiAgICAnaW5jcmVtZW50QXN5bmMnXG4gIF0pXG59XG48L3NjcmlwdD5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIENvdW50ZXIudnVlPzU0MzM0YmM4XG4gKiovIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSdcbmltcG9ydCBDb3VudGVyIGZyb20gJy4vQ291bnRlci52dWUnXG5cbm5ldyBWdWUoe1xuICBlbDogJyNhcHAnLFxuICBzdG9yZSxcbiAgcmVuZGVyOiBoID0+IGgoQ291bnRlcilcbn0pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvdW50ZXItaG90L2FwcC5qc1xuICoqLyIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IFZ1ZXggZnJvbSAndnVleCdcbmltcG9ydCAqIGFzIGdldHRlcnMgZnJvbSAnLi9nZXR0ZXJzJ1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnXG5pbXBvcnQgKiBhcyBtdXRhdGlvbnMgZnJvbSAnLi9tdXRhdGlvbnMnXG5cblZ1ZS51c2UoVnVleClcblxuY29uc3Qgc3RhdGUgPSB7XG4gIGNvdW50OiAwLFxuICBoaXN0b3J5OiBbXVxufVxuXG5jb25zdCBzdG9yZSA9IG5ldyBWdWV4LlN0b3JlKHtcbiAgc3RhdGUsXG4gIGdldHRlcnMsXG4gIGFjdGlvbnMsXG4gIG11dGF0aW9uc1xufSlcblxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoW1xuICAgICcuL2dldHRlcnMnLFxuICAgICcuL2FjdGlvbnMnLFxuICAgICcuL211dGF0aW9ucydcbiAgXSwgKCkgPT4ge1xuICAgIHN0b3JlLmhvdFVwZGF0ZSh7XG4gICAgICBnZXR0ZXJzOiByZXF1aXJlKCcuL2dldHRlcnMnKSxcbiAgICAgIGFjdGlvbnM6IHJlcXVpcmUoJy4vYWN0aW9ucycpLFxuICAgICAgbXV0YXRpb25zOiByZXF1aXJlKCcuL211dGF0aW9ucycpXG4gICAgfSlcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RvcmVcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY291bnRlci1ob3Qvc3RvcmUvaW5kZXguanNcbiAqKi8iLCJ2YXIgX192dWVfZXhwb3J0c19fLCBfX3Z1ZV9vcHRpb25zX19cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IHt9XG5cbi8qIHNjcmlwdCAqL1xuX192dWVfZXhwb3J0c19fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyIXZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9Db3VudGVyLnZ1ZVwiKVxuXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISF2dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj9pZD1kYXRhLXYtMjlhMjRjNTkhdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vQ291bnRlci52dWVcIilcbl9fdnVlX29wdGlvbnNfXyA9IF9fdnVlX2V4cG9ydHNfXyA9IF9fdnVlX2V4cG9ydHNfXyB8fCB7fVxuaWYgKFxuICB0eXBlb2YgX192dWVfZXhwb3J0c19fLmRlZmF1bHQgPT09IFwib2JqZWN0XCIgfHxcbiAgdHlwZW9mIF9fdnVlX2V4cG9ydHNfXy5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCJcbikge1xuaWYgKE9iamVjdC5rZXlzKF9fdnVlX2V4cG9ydHNfXykuc29tZShmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleSAhPT0gXCJfX2VzTW9kdWxlXCIgfSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5fX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9leHBvcnRzX18gPSBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdFxufVxuaWYgKHR5cGVvZiBfX3Z1ZV9vcHRpb25zX18gPT09IFwiZnVuY3Rpb25cIikge1xuICBfX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9vcHRpb25zX18ub3B0aW9uc1xufVxuX192dWVfb3B0aW9uc19fLl9fZmlsZSA9IFwiL1VzZXJzL2x1b25hbi9TaXRlcy92dWVfZGVtby92dWV4LWRlbW8tb2ZmaWNpYWwvdnVleC9leGFtcGxlcy9jb3VudGVyLWhvdC9Db3VudGVyLnZ1ZVwiXG5fX3Z1ZV9vcHRpb25zX18ucmVuZGVyID0gX192dWVfdGVtcGxhdGVfXy5yZW5kZXJcbl9fdnVlX29wdGlvbnNfXy5zdGF0aWNSZW5kZXJGbnMgPSBfX3Z1ZV90ZW1wbGF0ZV9fLnN0YXRpY1JlbmRlckZuc1xuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWxvYWRlci9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMjlhMjRjNTlcIiwgX192dWVfb3B0aW9uc19fKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMjlhMjRjNTlcIiwgX192dWVfb3B0aW9uc19fKVxuICB9XG59KSgpfVxuaWYgKF9fdnVlX29wdGlvbnNfXy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBDb3VudGVyLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIGFuZCBzaG91bGQgYmUgZGVmaW5lZCBpbiBwbGFpbiBqcyBmaWxlcyB1c2luZyByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxubW9kdWxlLmV4cG9ydHMgPSBfX3Z1ZV9leHBvcnRzX19cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9jb3VudGVyLWhvdC9Db3VudGVyLnZ1ZVxuICoqIG1vZHVsZSBpZCA9IDM1OFxuICoqIG1vZHVsZSBjaHVua3MgPSA1XG4gKiovIiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDtcbiAgcmV0dXJuIF9oKCdkaXYnLCBbXCJcXG4gIFZhbHVlOiBcIiArIF92bS5fcyhfdm0uY291bnQpICsgXCJcXG4gIFwiLCBfaCgnYnV0dG9uJywge1xuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IF92bS5pbmNyZW1lbnRcbiAgICB9XG4gIH0sIFtcIitcIl0pLCBcIiBcIiwgX2goJ2J1dHRvbicsIHtcbiAgICBvbjoge1xuICAgICAgXCJjbGlja1wiOiBfdm0uZGVjcmVtZW50XG4gICAgfVxuICB9LCBbXCItXCJdKSwgXCIgXCIsIF9oKCdidXR0b24nLCB7XG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogX3ZtLmluY3JlbWVudElmT2RkXG4gICAgfVxuICB9LCBbXCJJbmNyZW1lbnQgaWYgb2RkXCJdKSwgXCIgXCIsIF9oKCdidXR0b24nLCB7XG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogX3ZtLmluY3JlbWVudEFzeW5jXG4gICAgfVxuICB9LCBbXCJJbmNyZW1lbnQgYXN5bmNcIl0pLCBcIiBcIiwgX2goJ2RpdicsIFtfaCgnZGl2JywgW1wiUmVjZW50IEhpc3RvcnkgKGxhc3QgNSBlbnRyaWVzKTogXCIgKyBfdm0uX3MoX3ZtLnJlY2VudEhpc3RvcnkpXSldKV0pXG59LHN0YXRpY1JlbmRlckZuczogW119XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1sb2FkZXIvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0yOWEyNGM1OVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogL1VzZXJzL2x1b25hbi9TaXRlcy92dWVfZGVtby92dWV4LWRlbW8tb2ZmaWNpYWwvfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci5qcz9pZD1kYXRhLXYtMjlhMjRjNTkhL1VzZXJzL2x1b25hbi9TaXRlcy92dWVfZGVtby92dWV4LWRlbW8tb2ZmaWNpYWwvfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9jb3VudGVyLWhvdC9Db3VudGVyLnZ1ZVxuICoqIG1vZHVsZSBpZCA9IDM2N1xuICoqIG1vZHVsZSBjaHVua3MgPSA1XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==