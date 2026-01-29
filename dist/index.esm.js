import require$$0, { useRef, useCallback, useEffect, useMemo, useState, useLayoutEffect } from 'react';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production_min;

function requireReactJsxRuntime_production_min () {
	if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
	hasRequiredReactJsxRuntime_production_min = 1;
var f=require$$0,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
	function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
	return reactJsxRuntime_production_min;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;

	if (process.env.NODE_ENV !== "production") {
	  (function() {

	var React = require$$0;

	// ATTENTION
	// When adding new symbols to this file,
	// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
	// The Symbol used to tag the ReactElement-like types.
	var REACT_ELEMENT_TYPE = Symbol.for('react.element');
	var REACT_PORTAL_TYPE = Symbol.for('react.portal');
	var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
	var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
	var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
	var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
	var REACT_CONTEXT_TYPE = Symbol.for('react.context');
	var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
	var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
	var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
	var REACT_MEMO_TYPE = Symbol.for('react.memo');
	var REACT_LAZY_TYPE = Symbol.for('react.lazy');
	var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	function getIteratorFn(maybeIterable) {
	  if (maybeIterable === null || typeof maybeIterable !== 'object') {
	    return null;
	  }

	  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

	  if (typeof maybeIterator === 'function') {
	    return maybeIterator;
	  }

	  return null;
	}

	var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

	function error(format) {
	  {
	    {
	      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      printWarning('error', format, args);
	    }
	  }
	}

	function printWarning(level, format, args) {
	  // When changing this logic, you might want to also
	  // update consoleWithStackDev.www.js as well.
	  {
	    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
	    var stack = ReactDebugCurrentFrame.getStackAddendum();

	    if (stack !== '') {
	      format += '%s';
	      args = args.concat([stack]);
	    } // eslint-disable-next-line react-internal/safe-string-coercion


	    var argsWithFormat = args.map(function (item) {
	      return String(item);
	    }); // Careful: RN currently depends on this prefix

	    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
	    // breaks IE9: https://github.com/facebook/react/issues/13610
	    // eslint-disable-next-line react-internal/no-production-logging

	    Function.prototype.apply.call(console[level], console, argsWithFormat);
	  }
	}

	// -----------------------------------------------------------------------------

	var enableScopeAPI = false; // Experimental Create Event Handle API.
	var enableCacheElement = false;
	var enableTransitionTracing = false; // No known bugs, but needs performance testing

	var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
	// stuff. Intended to enable React core members to more easily debug scheduling
	// issues in DEV builds.

	var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

	var REACT_MODULE_REFERENCE;

	{
	  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
	}

	function isValidElementType(type) {
	  if (typeof type === 'string' || typeof type === 'function') {
	    return true;
	  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


	  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
	    return true;
	  }

	  if (typeof type === 'object' && type !== null) {
	    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
	    // types supported by any Flight configuration anywhere since
	    // we don't know which Flight build this will end up being used
	    // with.
	    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
	      return true;
	    }
	  }

	  return false;
	}

	function getWrappedName(outerType, innerType, wrapperName) {
	  var displayName = outerType.displayName;

	  if (displayName) {
	    return displayName;
	  }

	  var functionName = innerType.displayName || innerType.name || '';
	  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
	} // Keep in sync with react-reconciler/getComponentNameFromFiber


	function getContextName(type) {
	  return type.displayName || 'Context';
	} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


	function getComponentNameFromType(type) {
	  if (type == null) {
	    // Host root, text node or just invalid type.
	    return null;
	  }

	  {
	    if (typeof type.tag === 'number') {
	      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
	    }
	  }

	  if (typeof type === 'function') {
	    return type.displayName || type.name || null;
	  }

	  if (typeof type === 'string') {
	    return type;
	  }

	  switch (type) {
	    case REACT_FRAGMENT_TYPE:
	      return 'Fragment';

	    case REACT_PORTAL_TYPE:
	      return 'Portal';

	    case REACT_PROFILER_TYPE:
	      return 'Profiler';

	    case REACT_STRICT_MODE_TYPE:
	      return 'StrictMode';

	    case REACT_SUSPENSE_TYPE:
	      return 'Suspense';

	    case REACT_SUSPENSE_LIST_TYPE:
	      return 'SuspenseList';

	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_CONTEXT_TYPE:
	        var context = type;
	        return getContextName(context) + '.Consumer';

	      case REACT_PROVIDER_TYPE:
	        var provider = type;
	        return getContextName(provider._context) + '.Provider';

	      case REACT_FORWARD_REF_TYPE:
	        return getWrappedName(type, type.render, 'ForwardRef');

	      case REACT_MEMO_TYPE:
	        var outerName = type.displayName || null;

	        if (outerName !== null) {
	          return outerName;
	        }

	        return getComponentNameFromType(type.type) || 'Memo';

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            return getComponentNameFromType(init(payload));
	          } catch (x) {
	            return null;
	          }
	        }

	      // eslint-disable-next-line no-fallthrough
	    }
	  }

	  return null;
	}

	var assign = Object.assign;

	// Helpers to patch console.logs to avoid logging during side-effect free
	// replaying on render function. This currently only patches the object
	// lazily which won't cover if the log function was extracted eagerly.
	// We could also eagerly patch the method.
	var disabledDepth = 0;
	var prevLog;
	var prevInfo;
	var prevWarn;
	var prevError;
	var prevGroup;
	var prevGroupCollapsed;
	var prevGroupEnd;

	function disabledLog() {}

	disabledLog.__reactDisabledLog = true;
	function disableLogs() {
	  {
	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      prevLog = console.log;
	      prevInfo = console.info;
	      prevWarn = console.warn;
	      prevError = console.error;
	      prevGroup = console.group;
	      prevGroupCollapsed = console.groupCollapsed;
	      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

	      var props = {
	        configurable: true,
	        enumerable: true,
	        value: disabledLog,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        info: props,
	        log: props,
	        warn: props,
	        error: props,
	        group: props,
	        groupCollapsed: props,
	        groupEnd: props
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    disabledDepth++;
	  }
	}
	function reenableLogs() {
	  {
	    disabledDepth--;

	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      var props = {
	        configurable: true,
	        enumerable: true,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        log: assign({}, props, {
	          value: prevLog
	        }),
	        info: assign({}, props, {
	          value: prevInfo
	        }),
	        warn: assign({}, props, {
	          value: prevWarn
	        }),
	        error: assign({}, props, {
	          value: prevError
	        }),
	        group: assign({}, props, {
	          value: prevGroup
	        }),
	        groupCollapsed: assign({}, props, {
	          value: prevGroupCollapsed
	        }),
	        groupEnd: assign({}, props, {
	          value: prevGroupEnd
	        })
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    if (disabledDepth < 0) {
	      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
	    }
	  }
	}

	var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
	var prefix;
	function describeBuiltInComponentFrame(name, source, ownerFn) {
	  {
	    if (prefix === undefined) {
	      // Extract the VM specific prefix used by each line.
	      try {
	        throw Error();
	      } catch (x) {
	        var match = x.stack.trim().match(/\n( *(at )?)/);
	        prefix = match && match[1] || '';
	      }
	    } // We use the prefix to ensure our stacks line up with native stack frames.


	    return '\n' + prefix + name;
	  }
	}
	var reentry = false;
	var componentFrameCache;

	{
	  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
	  componentFrameCache = new PossiblyWeakMap();
	}

	function describeNativeComponentFrame(fn, construct) {
	  // If something asked for a stack inside a fake render, it should get ignored.
	  if ( !fn || reentry) {
	    return '';
	  }

	  {
	    var frame = componentFrameCache.get(fn);

	    if (frame !== undefined) {
	      return frame;
	    }
	  }

	  var control;
	  reentry = true;
	  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

	  Error.prepareStackTrace = undefined;
	  var previousDispatcher;

	  {
	    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
	    // for warnings.

	    ReactCurrentDispatcher.current = null;
	    disableLogs();
	  }

	  try {
	    // This should throw.
	    if (construct) {
	      // Something should be setting the props in the constructor.
	      var Fake = function () {
	        throw Error();
	      }; // $FlowFixMe


	      Object.defineProperty(Fake.prototype, 'props', {
	        set: function () {
	          // We use a throwing setter instead of frozen or non-writable props
	          // because that won't throw in a non-strict mode function.
	          throw Error();
	        }
	      });

	      if (typeof Reflect === 'object' && Reflect.construct) {
	        // We construct a different control for this case to include any extra
	        // frames added by the construct call.
	        try {
	          Reflect.construct(Fake, []);
	        } catch (x) {
	          control = x;
	        }

	        Reflect.construct(fn, [], Fake);
	      } else {
	        try {
	          Fake.call();
	        } catch (x) {
	          control = x;
	        }

	        fn.call(Fake.prototype);
	      }
	    } else {
	      try {
	        throw Error();
	      } catch (x) {
	        control = x;
	      }

	      fn();
	    }
	  } catch (sample) {
	    // This is inlined manually because closure doesn't do it for us.
	    if (sample && control && typeof sample.stack === 'string') {
	      // This extracts the first frame from the sample that isn't also in the control.
	      // Skipping one frame that we assume is the frame that calls the two.
	      var sampleLines = sample.stack.split('\n');
	      var controlLines = control.stack.split('\n');
	      var s = sampleLines.length - 1;
	      var c = controlLines.length - 1;

	      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
	        // We expect at least one stack frame to be shared.
	        // Typically this will be the root most one. However, stack frames may be
	        // cut off due to maximum stack limits. In this case, one maybe cut off
	        // earlier than the other. We assume that the sample is longer or the same
	        // and there for cut off earlier. So we should find the root most frame in
	        // the sample somewhere in the control.
	        c--;
	      }

	      for (; s >= 1 && c >= 0; s--, c--) {
	        // Next we find the first one that isn't the same which should be the
	        // frame that called our sample function and the control.
	        if (sampleLines[s] !== controlLines[c]) {
	          // In V8, the first line is describing the message but other VMs don't.
	          // If we're about to return the first line, and the control is also on the same
	          // line, that's a pretty good indicator that our sample threw at same line as
	          // the control. I.e. before we entered the sample frame. So we ignore this result.
	          // This can happen if you passed a class to function component, or non-function.
	          if (s !== 1 || c !== 1) {
	            do {
	              s--;
	              c--; // We may still have similar intermediate frames from the construct call.
	              // The next one that isn't the same should be our match though.

	              if (c < 0 || sampleLines[s] !== controlLines[c]) {
	                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
	                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
	                // but we have a user-provided "displayName"
	                // splice it in to make the stack more readable.


	                if (fn.displayName && _frame.includes('<anonymous>')) {
	                  _frame = _frame.replace('<anonymous>', fn.displayName);
	                }

	                {
	                  if (typeof fn === 'function') {
	                    componentFrameCache.set(fn, _frame);
	                  }
	                } // Return the line we found.


	                return _frame;
	              }
	            } while (s >= 1 && c >= 0);
	          }

	          break;
	        }
	      }
	    }
	  } finally {
	    reentry = false;

	    {
	      ReactCurrentDispatcher.current = previousDispatcher;
	      reenableLogs();
	    }

	    Error.prepareStackTrace = previousPrepareStackTrace;
	  } // Fallback to just using the name if we couldn't make it throw.


	  var name = fn ? fn.displayName || fn.name : '';
	  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

	  {
	    if (typeof fn === 'function') {
	      componentFrameCache.set(fn, syntheticFrame);
	    }
	  }

	  return syntheticFrame;
	}
	function describeFunctionComponentFrame(fn, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(fn, false);
	  }
	}

	function shouldConstruct(Component) {
	  var prototype = Component.prototype;
	  return !!(prototype && prototype.isReactComponent);
	}

	function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

	  if (type == null) {
	    return '';
	  }

	  if (typeof type === 'function') {
	    {
	      return describeNativeComponentFrame(type, shouldConstruct(type));
	    }
	  }

	  if (typeof type === 'string') {
	    return describeBuiltInComponentFrame(type);
	  }

	  switch (type) {
	    case REACT_SUSPENSE_TYPE:
	      return describeBuiltInComponentFrame('Suspense');

	    case REACT_SUSPENSE_LIST_TYPE:
	      return describeBuiltInComponentFrame('SuspenseList');
	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        return describeFunctionComponentFrame(type.render);

	      case REACT_MEMO_TYPE:
	        // Memo may contain any component type so we recursively resolve it.
	        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            // Lazy may contain any component type so we recursively resolve it.
	            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
	          } catch (x) {}
	        }
	    }
	  }

	  return '';
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var loggedTypeFailures = {};
	var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame.setExtraStackFrame(null);
	    }
	  }
	}

	function checkPropTypes(typeSpecs, values, location, componentName, element) {
	  {
	    // $FlowFixMe This is okay but Flow doesn't know it.
	    var has = Function.call.bind(hasOwnProperty);

	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.

	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            // eslint-disable-next-line react-internal/prod-error-codes
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }

	          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
	        } catch (ex) {
	          error$1 = ex;
	        }

	        if (error$1 && !(error$1 instanceof Error)) {
	          setCurrentlyValidatingElement(element);

	          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

	          setCurrentlyValidatingElement(null);
	        }

	        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error$1.message] = true;
	          setCurrentlyValidatingElement(element);

	          error('Failed %s type: %s', location, error$1.message);

	          setCurrentlyValidatingElement(null);
	        }
	      }
	    }
	  }
	}

	var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

	function isArray(a) {
	  return isArrayImpl(a);
	}

	/*
	 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
	 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
	 *
	 * The functions in this module will throw an easier-to-understand,
	 * easier-to-debug exception with a clear errors message message explaining the
	 * problem. (Instead of a confusing exception thrown inside the implementation
	 * of the `value` object).
	 */
	// $FlowFixMe only called in DEV, so void return is not possible.
	function typeName(value) {
	  {
	    // toStringTag is needed for namespaced types like Temporal.Instant
	    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
	    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
	    return type;
	  }
	} // $FlowFixMe only called in DEV, so void return is not possible.


	function willCoercionThrow(value) {
	  {
	    try {
	      testStringCoercion(value);
	      return false;
	    } catch (e) {
	      return true;
	    }
	  }
	}

	function testStringCoercion(value) {
	  // If you ended up here by following an exception call stack, here's what's
	  // happened: you supplied an object or symbol value to React (as a prop, key,
	  // DOM attribute, CSS property, string ref, etc.) and when React tried to
	  // coerce it to a string using `'' + value`, an exception was thrown.
	  //
	  // The most common types that will cause this exception are `Symbol` instances
	  // and Temporal objects like `Temporal.Instant`. But any object that has a
	  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
	  // exception. (Library authors do this to prevent users from using built-in
	  // numeric operators like `+` or comparison operators like `>=` because custom
	  // methods are needed to perform accurate arithmetic or comparison.)
	  //
	  // To fix the problem, coerce this object or symbol value to a string before
	  // passing it to React. The most reliable way is usually `String(value)`.
	  //
	  // To find which value is throwing, check the browser or debugger console.
	  // Before this exception was thrown, there should be `console.error` output
	  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
	  // problem and how that type was used: key, atrribute, input value prop, etc.
	  // In most cases, this console output also shows the component and its
	  // ancestor components where the exception happened.
	  //
	  // eslint-disable-next-line react-internal/safe-string-coercion
	  return '' + value;
	}
	function checkKeyStringCoercion(value) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}

	var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};
	var specialPropKeyWarningShown;
	var specialPropRefWarningShown;

	function hasValidRef(config) {
	  {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.key !== undefined;
	}

	function warnIfStringRefCannotBeAutoConverted(config, self) {
	  {
	    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self) ;
	  }
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingKey = function () {
	      if (!specialPropKeyWarningShown) {
	        specialPropKeyWarningShown = true;

	        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingKey.isReactWarning = true;
	    Object.defineProperty(props, 'key', {
	      get: warnAboutAccessingKey,
	      configurable: true
	    });
	  }
	}

	function defineRefPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingRef = function () {
	      if (!specialPropRefWarningShown) {
	        specialPropRefWarningShown = true;

	        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingRef.isReactWarning = true;
	    Object.defineProperty(props, 'ref', {
	      get: warnAboutAccessingRef,
	      configurable: true
	    });
	  }
	}
	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, instanceof check
	 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} props
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} owner
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @internal
	 */


	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allows us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,
	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.

	    Object.defineProperty(element._store, 'validated', {
	      configurable: false,
	      enumerable: false,
	      writable: true,
	      value: false
	    }); // self and source are DEV only properties.

	    Object.defineProperty(element, '_self', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: self
	    }); // Two elements created in two different places should be considered
	    // equal for testing purposes and therefore we hide it from enumeration.

	    Object.defineProperty(element, '_source', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: source
	    });

	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};
	/**
	 * https://github.com/reactjs/rfcs/pull/107
	 * @param {*} type
	 * @param {object} props
	 * @param {string} key
	 */

	function jsxDEV(type, config, maybeKey, source, self) {
	  {
	    var propName; // Reserved names are extracted

	    var props = {};
	    var key = null;
	    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
	    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
	    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
	    // but as an intermediary step, we will use jsxDEV for everything except
	    // <div {...props} key="Hi" />, because we aren't currently able to tell if
	    // key is explicitly declared to be undefined or not.

	    if (maybeKey !== undefined) {
	      {
	        checkKeyStringCoercion(maybeKey);
	      }

	      key = '' + maybeKey;
	    }

	    if (hasValidKey(config)) {
	      {
	        checkKeyStringCoercion(config.key);
	      }

	      key = '' + config.key;
	    }

	    if (hasValidRef(config)) {
	      ref = config.ref;
	      warnIfStringRefCannotBeAutoConverted(config, self);
	    } // Remaining properties are added to a new props object


	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    } // Resolve default props


	    if (type && type.defaultProps) {
	      var defaultProps = type.defaultProps;

	      for (propName in defaultProps) {
	        if (props[propName] === undefined) {
	          props[propName] = defaultProps[propName];
	        }
	      }
	    }

	    if (key || ref) {
	      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

	      if (key) {
	        defineKeyPropWarningGetter(props, displayName);
	      }

	      if (ref) {
	        defineRefPropWarningGetter(props, displayName);
	      }
	    }

	    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	  }
	}

	var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
	var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement$1(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
	    }
	  }
	}

	var propTypesMisspellWarningShown;

	{
	  propTypesMisspellWarningShown = false;
	}
	/**
	 * Verifies the object is a ReactElement.
	 * See https://reactjs.org/docs/react-api.html#isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a ReactElement.
	 * @final
	 */


	function isValidElement(object) {
	  {
	    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	  }
	}

	function getDeclarationErrorAddendum() {
	  {
	    if (ReactCurrentOwner$1.current) {
	      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

	      if (name) {
	        return '\n\nCheck the render method of `' + name + '`.';
	      }
	    }

	    return '';
	  }
	}

	function getSourceInfoErrorAddendum(source) {
	  {

	    return '';
	  }
	}
	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */


	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  {
	    var info = getDeclarationErrorAddendum();

	    if (!info) {
	      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

	      if (parentName) {
	        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
	      }
	    }

	    return info;
	  }
	}
	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */


	function validateExplicitKey(element, parentType) {
	  {
	    if (!element._store || element._store.validated || element.key != null) {
	      return;
	    }

	    element._store.validated = true;
	    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

	    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
	      return;
	    }

	    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
	    // property, it may be the creator of the child that's responsible for
	    // assigning it a key.

	    var childOwner = '';

	    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
	      // Give the component that originally created this child.
	      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
	    }

	    setCurrentlyValidatingElement$1(element);

	    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

	    setCurrentlyValidatingElement$1(null);
	  }
	}
	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */


	function validateChildKeys(node, parentType) {
	  {
	    if (typeof node !== 'object') {
	      return;
	    }

	    if (isArray(node)) {
	      for (var i = 0; i < node.length; i++) {
	        var child = node[i];

	        if (isValidElement(child)) {
	          validateExplicitKey(child, parentType);
	        }
	      }
	    } else if (isValidElement(node)) {
	      // This element was passed in a valid location.
	      if (node._store) {
	        node._store.validated = true;
	      }
	    } else if (node) {
	      var iteratorFn = getIteratorFn(node);

	      if (typeof iteratorFn === 'function') {
	        // Entry iterators used to provide implicit keys,
	        // but now we print a separate warning for them later.
	        if (iteratorFn !== node.entries) {
	          var iterator = iteratorFn.call(node);
	          var step;

	          while (!(step = iterator.next()).done) {
	            if (isValidElement(step.value)) {
	              validateExplicitKey(step.value, parentType);
	            }
	          }
	        }
	      }
	    }
	  }
	}
	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */


	function validatePropTypes(element) {
	  {
	    var type = element.type;

	    if (type === null || type === undefined || typeof type === 'string') {
	      return;
	    }

	    var propTypes;

	    if (typeof type === 'function') {
	      propTypes = type.propTypes;
	    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
	    // Inner props are checked in the reconciler.
	    type.$$typeof === REACT_MEMO_TYPE)) {
	      propTypes = type.propTypes;
	    } else {
	      return;
	    }

	    if (propTypes) {
	      // Intentionally inside to avoid triggering lazy initializers:
	      var name = getComponentNameFromType(type);
	      checkPropTypes(propTypes, element.props, 'prop', name, element);
	    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
	      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

	      var _name = getComponentNameFromType(type);

	      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
	    }

	    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
	      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
	    }
	  }
	}
	/**
	 * Given a fragment, validate that it can only be provided with fragment props
	 * @param {ReactElement} fragment
	 */


	function validateFragmentProps(fragment) {
	  {
	    var keys = Object.keys(fragment.props);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];

	      if (key !== 'children' && key !== 'key') {
	        setCurrentlyValidatingElement$1(fragment);

	        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

	        setCurrentlyValidatingElement$1(null);
	        break;
	      }
	    }

	    if (fragment.ref !== null) {
	      setCurrentlyValidatingElement$1(fragment);

	      error('Invalid attribute `ref` supplied to `React.Fragment`.');

	      setCurrentlyValidatingElement$1(null);
	    }
	  }
	}

	var didWarnAboutKeySpread = {};
	function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
	  {
	    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.

	    if (!validType) {
	      var info = '';

	      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
	      }

	      var sourceInfo = getSourceInfoErrorAddendum();

	      if (sourceInfo) {
	        info += sourceInfo;
	      } else {
	        info += getDeclarationErrorAddendum();
	      }

	      var typeString;

	      if (type === null) {
	        typeString = 'null';
	      } else if (isArray(type)) {
	        typeString = 'array';
	      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
	        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
	        info = ' Did you accidentally export a JSX literal instead of a component?';
	      } else {
	        typeString = typeof type;
	      }

	      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
	    }

	    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.

	    if (element == null) {
	      return element;
	    } // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)


	    if (validType) {
	      var children = props.children;

	      if (children !== undefined) {
	        if (isStaticChildren) {
	          if (isArray(children)) {
	            for (var i = 0; i < children.length; i++) {
	              validateChildKeys(children[i], type);
	            }

	            if (Object.freeze) {
	              Object.freeze(children);
	            }
	          } else {
	            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
	          }
	        } else {
	          validateChildKeys(children, type);
	        }
	      }
	    }

	    {
	      if (hasOwnProperty.call(props, 'key')) {
	        var componentName = getComponentNameFromType(type);
	        var keys = Object.keys(props).filter(function (k) {
	          return k !== 'key';
	        });
	        var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

	        if (!didWarnAboutKeySpread[componentName + beforeExample]) {
	          var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

	          error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

	          didWarnAboutKeySpread[componentName + beforeExample] = true;
	        }
	      }
	    }

	    if (type === REACT_FRAGMENT_TYPE) {
	      validateFragmentProps(element);
	    } else {
	      validatePropTypes(element);
	    }

	    return element;
	  }
	} // These two functions exist to still get child warnings in dev
	// even with the prod transform. This means that jsxDEV is purely
	// opt-in behavior for better messages but that we won't stop
	// giving you warnings if you use production apis.

	function jsxWithValidationStatic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, true);
	  }
	}
	function jsxWithValidationDynamic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, false);
	  }
	}

	var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
	// for now we can ship identical prod functions

	var jsxs =  jsxWithValidationStatic ;

	reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_development.jsx = jsx;
	reactJsxRuntime_development.jsxs = jsxs;
	  })();
	}
	return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}

var jsxRuntimeExports = jsxRuntime.exports;

/**
 * Utility functions for working with the skeleton system
 */
/**
 * Check if running in browser environment (SSR-safe)
 */
/**
 * Get parent content width (excluding padding and borders)
 */
function getParentContentWidth(element) {
    if (typeof window === 'undefined')
        return 0;
    const style = window.getComputedStyle(element);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;
    parseFloat(style.borderLeftWidth) || 0;
    parseFloat(style.borderRightWidth) || 0;
    return element.clientWidth - paddingLeft - paddingRight; // clientWidth excludes border, implies we only subtract padding
}

/**
 * Helper function to get computed style safely (SSR-safe)
 */
function getComputedStyleSafe(element) {
    if (typeof window === 'undefined') {
        return {};
    }
    return window.getComputedStyle(element);
}
/**
 * Check if element is manually marked as dynamic via data-dynamic attribute
 */
function isManuallyMarkedDynamic(element) {
    return element.getAttribute('data-dynamic') === 'true';
}
/**
 * Determine element type based on tag and styles
 */
function determineElementType(element, style, hasText) {
    const tagName = element.tagName.toLowerCase();
    // Form elements
    if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
        return 'input';
    }
    if (tagName === 'button') {
        return 'button';
    }
    // Circular elements (avatars)
    const borderRadius = style.borderRadius;
    if (borderRadius === '50%' || borderRadius === '9999px' || (tagName === 'img' && borderRadius.includes('50'))) {
        return 'avatar';
    }
    // Text elements
    if (hasText && !element.children.length) {
        return 'text';
    }
    // Container vs block
    const display = style.display;
    if (display === 'flex' || display === 'grid' || display === 'inline-flex') {
        return 'container';
    }
    return 'block';
}
/**
 * Determine if text is likely static (hardcoded label) vs dynamic (data)
 * Heuristic: Static text is typically short, consistent, and doesn't change
 */
function isLikelyStaticText(text, threshold = 3) {
    if (!text || text.trim().length === 0)
        return false;
    // Short text with punctuation or known labels are usually static
    const trimmed = text.trim();
    // Numeric content is usually dynamic
    if (/\d/.test(trimmed))
        return false;
    if (trimmed.length <= threshold)
        return true;
    // Single words are usually static
    if (trimmed.split(/\s+/).length === 1)
        return true;
    // Text with special punctuation patterns (like "USD", "100%") is usually static
    if (/^[A-Z\s\$%()]+$/.test(trimmed))
        return true;
    return false;
}
/**
 * Get bounding box relative to parent container
 */
function getBoundsRelativeToParent(element, parentElement) {
    const elementRect = element.getBoundingClientRect();
    const parentRect = parentElement.getBoundingClientRect();
    return {
        x: elementRect.left - parentRect.left + parentElement.scrollLeft,
        y: elementRect.top - parentRect.top + parentElement.scrollTop,
        width: elementRect.width,
        height: elementRect.height,
    };
}
/**
 * Check if element should be skipped (hidden, display:none, data-skeleton-ignore)
 */
function shouldSkipElement(element) {
    // Check data attribute
    if (element.hasAttribute('data-skeleton-ignore')) {
        return true;
    }
    if (typeof window === 'undefined') {
        return false;
    }
    const style = window.getComputedStyle(element);
    // Skip hidden elements
    if (style.display === 'none' ||
        style.visibility === 'hidden' ||
        style.opacity === '0') {
        return true;
    }
    return false;
}
/**
 * Recursively scan DOM tree to extract skeleton information
 */
function scanDOMElement(element, parentElement, options = {}) {
    const { preserveStaticText = false, staticTextThreshold = 3 } = options;
    // Handle text nodes
    if (element.nodeType === Node.TEXT_NODE) {
        const text = element.textContent || '';
        const trimmedText = text.trim();
        if (!trimmedText) {
            return null;
        }
        const parentElement_ = element.parentElement || parentElement;
        const isManualDynamic = isManuallyMarkedDynamic(parentElement_);
        const isStatic = !isManualDynamic && isLikelyStaticText(trimmedText, staticTextThreshold);
        const isDynamic = isManualDynamic || !isStatic;
        // If we're preserving static text and this is static, skip it
        if (preserveStaticText && isStatic) {
            return null;
        }
        // Return text node info with improved bounds
        const bounds = getBoundsRelativeToParent(parentElement_, parentElement);
        // Apply 80-90% width rule for dynamic text
        if (isDynamic) {
            const parentWidth = getParentContentWidth(parentElement_);
            if (parentWidth > 0) {
                // We set it to full content width here. The layout engine will typically
                // scale it down to ~90% for visual breathing room.
                bounds.width = parentWidth;
            }
        }
        const style = getComputedStyleSafe(parentElement_);
        const parentStyle = getComputedStyleSafe(parentElement_.parentElement || parentElement_);
        // Calculate actual text height (not full line-height)
        const fontSize = parseFloat(style.fontSize || '16');
        const lineHeightValue = style.lineHeight === 'normal' ? fontSize * 1.2 : parseFloat(style.lineHeight || String(fontSize * 1.2));
        const actualTextHeight = Math.min(bounds.height, fontSize * 1.1);
        // Detect multi-line text
        const lineCount = Math.max(1, Math.floor(bounds.height / lineHeightValue));
        const isMultiLine = lineCount > 1;
        return {
            tagName: '#text',
            text: trimmedText,
            isTextNode: true,
            isDynamic,
            hasElementChildren: false,
            hasVisibleBackground: false,
            hasVisibleBorder: false,
            isReplacedElement: false,
            elementType: 'text',
            isMultiLine,
            lineCount,
            isCircular: false,
            parentBackgroundColor: parentStyle.backgroundColor || 'transparent',
            bounds: {
                ...bounds,
                height: actualTextHeight,
                y: bounds.y + (bounds.height - actualTextHeight) / 2,
            },
            style: {
                fontSize: style.fontSize || '16px',
                lineHeight: style.lineHeight || '1.5',
                fontWeight: style.fontWeight || '400',
                color: style.color || '#000000',
                backgroundColor: style.backgroundColor || 'transparent',
                borderRadius: '4px',
            },
            children: [],
            skipSkeleton: false,
        };
    }
    // Handle element nodes
    if (element.nodeType !== Node.ELEMENT_NODE) {
        return null;
    }
    const elem = element;
    // Skip elements that should be ignored
    if (shouldSkipElement(elem)) {
        return null;
    }
    const style = getComputedStyleSafe(elem);
    const bounds = getBoundsRelativeToParent(elem, parentElement);
    const hasElementChildren = elem.children.length > 0;
    const hasVisibleBackground = !!style.backgroundColor &&
        style.backgroundColor !== 'transparent' &&
        style.backgroundColor !== 'rgba(0, 0, 0, 0)';
    const hasVisibleBorder = style.borderStyle !== 'none' &&
        style.borderWidth !== '0px' &&
        style.borderColor !== 'transparent';
    const tagName = elem.tagName.toLowerCase();
    const isReplacedElement = tagName === 'img' ||
        tagName === 'svg' ||
        tagName === 'canvas' ||
        tagName === 'video' ||
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        tagName === 'button';
    // Skip elements with zero dimensions
    if (bounds.width === 0 || bounds.height === 0) {
        return null;
    }
    // Extract text content
    const text = elem.textContent?.trim() || '';
    const hasText = text.length > 0 && elem.children.length === 0;
    const isManualDynamic = isManuallyMarkedDynamic(elem);
    const isStatic = !isManualDynamic && text.length > 0 && isLikelyStaticText(text, staticTextThreshold);
    // Determine element type
    const elementType = determineElementType(elem, style, hasText);
    const isCircular = elementType === 'avatar';
    // Get parent background for contrast
    const parentStyle = getComputedStyleSafe(elem.parentElement || parentElement);
    const parentBackgroundColor = parentStyle.backgroundColor || 'transparent';
    // Recursively scan children
    const children = [];
    for (let i = 0; i < elem.childNodes.length; i++) {
        const child = scanDOMElement(elem.childNodes[i], parentElement, options);
        if (child) {
            children.push(child);
        }
    }
    return {
        tagName: elem.tagName.toLowerCase(),
        text,
        isTextNode: false,
        isDynamic: isManualDynamic || !isStatic,
        hasElementChildren,
        hasVisibleBackground,
        hasVisibleBorder,
        isReplacedElement,
        elementType,
        isMultiLine: false,
        lineCount: 1,
        isCircular,
        parentBackgroundColor,
        bounds,
        style: {
            fontSize: style.fontSize || '16px',
            lineHeight: style.lineHeight || '1.5',
            fontWeight: style.fontWeight || '400',
            color: style.color || '#000000',
            backgroundColor: style.backgroundColor || 'transparent',
            borderRadius: style.borderRadius || '0px',
        },
        children,
        skipSkeleton: preserveStaticText && isStatic,
    };
}
/**
 * Scan entire component tree and return flattened list of skeleton blocks
 */
function scanComponentTree(parentElement, options = {}) {
    const result = [];
    const rootInfo = scanDOMElement(parentElement, parentElement, options);
    function flatten(info) {
        if (!info.skipSkeleton &&
            (info.isTextNode ||
                info.isReplacedElement ||
                info.hasVisibleBackground ||
                info.hasVisibleBorder ||
                (!info.hasElementChildren && info.isDynamic))) {
            result.push(info);
        }
        for (const child of info.children) {
            flatten(child);
        }
    }
    if (rootInfo) {
        flatten(rootInfo);
    }
    return result;
}

/**
 * Color Logic - Smart color matching and skeleton color generation
 * Generates skeleton colors based on parent background and implements
 * shimmer animation color stops.
 */
/**
 * Parse RGB color string to components
 * Handles rgb(), rgba(), hex, and named colors
 */
function parseRGBColor(colorString) {
    if (!colorString || colorString === 'transparent') {
        return [255, 255, 255, 0]; // White transparent
    }
    // Handle rgba/rgb format
    const rgbMatch = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbMatch) {
        return [
            parseInt(rgbMatch[1], 10),
            parseInt(rgbMatch[2], 10),
            parseInt(rgbMatch[3], 10),
            rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1,
        ];
    }
    // Handle hex format (#RRGGBB or #RGB)
    const hexMatch = colorString.match(/#([0-9a-f]{3}){1,2}/i);
    if (hexMatch) {
        let hex = hexMatch[1];
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }
        return [
            parseInt(hex.slice(0, 2), 16),
            parseInt(hex.slice(2, 4), 16),
            parseInt(hex.slice(4, 6), 16),
            1,
        ];
    }
    // Handle named colors (basic set)
    const namedColors = {
        white: [255, 255, 255],
        black: [0, 0, 0],
        red: [255, 0, 0],
        green: [0, 128, 0],
        blue: [0, 0, 255],
        gray: [128, 128, 128],
        grey: [128, 128, 128],
    };
    const lower = colorString.toLowerCase();
    if (lower in namedColors) {
        const [r, g, b] = namedColors[lower];
        return [r, g, b, 1];
    }
    return null;
}
/**
 * Convert RGB to hex string
 */
function rgbToHex(r, g, b) {
    return `#${[r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }).join('')}`.toUpperCase();
}
/**
 * Calculate perceived brightness (luminance) of a color
 * Uses relative luminance formula from WCAG
 */
function getColorBrightness(r, g, b) {
    // Convert to sRGB
    const [rs, gs, bs] = [r, g, b].map(c => {
        const val = c / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    // Calculate relative luminance
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
/**
 * Lighten a color by a percentage
 */
function lightenColor(r, g, b, percent) {
    const factor = 1 + percent / 100;
    return [
        Math.min(255, Math.round(r * factor)),
        Math.min(255, Math.round(g * factor)),
        Math.min(255, Math.round(b * factor)),
    ];
}
/**
 * Darken a color by a percentage
 */
function darkenColor(r, g, b, percent) {
    const factor = 1 - percent / 100;
    return [
        Math.max(0, Math.round(r * factor)),
        Math.max(0, Math.round(g * factor)),
        Math.max(0, Math.round(b * factor)),
    ];
}
/**
 * Generate skeleton color based on background with enhanced contrast rules
 * Light backgrounds: darken by 6%
 * Dark backgrounds: lighten by 8%
 */
function generateSkeletonColor(backgroundColor, elementType = 'text') {
    if (!backgroundColor || backgroundColor === 'transparent') {
        // Default: light gray
        return '#E5E7EB';
    }
    const rgba = parseRGBColor(backgroundColor);
    if (!rgba) {
        return '#E5E7EB'; // Fallback
    }
    const [r, g, b] = rgba;
    const brightness = getColorBrightness(r, g, b);
    let newColor;
    // High-contrast for buttons
    if (elementType === 'button') {
        if (brightness > 0.5) {
            newColor = darkenColor(r, g, b, 12); // More contrast for buttons
        }
        else {
            newColor = lightenColor(r, g, b, 15);
        }
    }
    else if (brightness > 0.5) {
        // Light background: darken
        newColor = darkenColor(r, g, b, 6);
    }
    else {
        // Dark background: lighten
        newColor = lightenColor(r, g, b, 8);
    }
    return rgbToHex(...newColor);
}
/**
 * Generate shimmer gradient stops (left, center, right)
 * Returns array of [position%, color] tuples for CSS linear-gradient
 */
function generateShimmerGradient(skeletonColor) {
    const rgba = parseRGBColor(skeletonColor);
    if (!rgba) {
        return [
            [0, '#E8E8E8'],
            [50, '#F5F5F5'],
            [100, '#E8E8E8'],
        ];
    }
    const [r, g, b] = rgba;
    // Calculate highlight (20% lighter version)
    const [hr, hg, hb] = lightenColor(r, g, b, 20);
    const highlightColor = rgbToHex(hr, hg, hb);
    const baseColor = rgbToHex(r, g, b);
    return [
        [0, baseColor],
        [50, highlightColor],
        [100, baseColor],
    ];
}
/**
 * Extract and validate border-radius value
 */
function extractBorderRadius(borderRadiusStr) {
    if (!borderRadiusStr || borderRadiusStr === '0px' || borderRadiusStr === '0') {
        return '0px';
    }
    return borderRadiusStr;
}
/**
 * Detect if color is light or dark
 */
function isLightColor(backgroundColor) {
    if (!backgroundColor || backgroundColor === 'transparent') {
        return true; // Assume light by default
    }
    const rgba = parseRGBColor(backgroundColor);
    if (!rgba) {
        return true;
    }
    const [r, g, b] = rgba;
    const brightness = getColorBrightness(r, g, b);
    return brightness > 0.5;
}
/**
 * Generate wave animation gradient
 * Creates a moving wave effect
 */
function generateWaveGradient(skeletonColor) {
    const rgba = parseRGBColor(skeletonColor);
    if (!rgba) {
        return '#E8E8E8';
    }
    const [r, g, b] = rgba;
    const [lr, lg, lb] = lightenColor(r, g, b, 15);
    const lightColor = rgbToHex(lr, lg, lb);
    const baseColor = rgbToHex(r, g, b);
    return `linear-gradient(90deg, ${baseColor} 0%, ${lightColor} 50%, ${baseColor} 100%)`;
}
/**
 * Generate colors for pulse animation
 * Returns base and highlight colors
 */
function generatePulseColors(backgroundColor) {
    const rgba = parseRGBColor(backgroundColor);
    if (!rgba) {
        return { base: '#E5E7EB', highlight: '#F3F4F6' };
    }
    const [r, g, b] = rgba;
    const brightness = getColorBrightness(r, g, b);
    const baseColor = rgbToHex(r, g, b);
    let highlight;
    if (brightness > 0.5) {
        // Light background: pulse to slightly darker
        highlight = darkenColor(r, g, b, 10);
    }
    else {
        // Dark background: pulse to slightly lighter
        highlight = lightenColor(r, g, b, 15);
    }
    return {
        base: baseColor,
        highlight: rgbToHex(...highlight)
    };
}

/**
 * Layout Engine - Position & Z-index calculations for skeleton blocks
 * Handles nested flexboxes, absolute positioning, and stacking context.
 */
/**
 * Calculate z-index for skeleton block based on DOM hierarchy
 * Higher nesting = higher z-index to prevent overlap issues
 */
function calculateZIndex(depth) {
    return Math.min(1000, 10 + depth * 10);
}
/**
 * Filter out blocks that are too small to be meaningful
 */
function isValidBlock(block) {
    const MIN_WIDTH = 4;
    const MIN_HEIGHT = 4;
    return block.bounds.width >= MIN_WIDTH && block.bounds.height >= MIN_HEIGHT;
}
/**
 * Merge overlapping blocks to reduce DOM nodes and improve performance
 * Returns a new array of non-overlapping blocks
 */
function mergeOverlappingBlocks(blocks) {
    if (blocks.length <= 1) {
        return blocks;
    }
    const sorted = [...blocks].sort((a, b) => {
        if (a.y !== b.y)
            return a.y - b.y;
        return a.x - b.x;
    });
    const merged = [];
    for (const block of sorted) {
        // Try to merge with an existing block
        let merged_ = false;
        for (let i = 0; i < merged.length; i++) {
            const existing = merged[i];
            // Check if blocks are adjacent horizontally (same y, consecutive x)
            if (existing.y === block.y &&
                existing.height === block.height &&
                Math.abs(existing.x + existing.width - block.x) < 2 &&
                existing.backgroundColor === block.backgroundColor &&
                existing.borderRadius === '0px' &&
                block.borderRadius === '0px') {
                // Merge horizontally
                existing.width += block.width;
                merged_ = true;
                break;
            }
            // Check if blocks are adjacent vertically (same x, consecutive y)
            if (existing.x === block.x &&
                existing.width === block.width &&
                Math.abs(existing.y + existing.height - block.y) < 2 &&
                existing.backgroundColor === block.backgroundColor &&
                existing.borderRadius === '0px' &&
                block.borderRadius === '0px') {
                // Merge vertically
                existing.height += block.height;
                merged_ = true;
                break;
            }
        }
        if (!merged_) {
            merged.push(block);
        }
    }
    return merged;
}
/**
 * Check if a block is completely contained within another
 */
function isBlockContainedInAnother(block, other) {
    return (block.x >= other.x &&
        block.y >= other.y &&
        block.x + block.width <= other.x + other.width &&
        block.y + block.height <= other.y + other.height &&
        !(block.x === other.x && block.y === other.y && block.width === other.width && block.height === other.height));
}
/**
 * Remove redundant blocks that are completely contained within others
 */
function removeRedundantBlocks(blocks) {
    return blocks.filter((block, index) => {
        for (let i = 0; i < blocks.length; i++) {
            if (i !== index && isBlockContainedInAnother(block, blocks[i])) {
                return false;
            }
        }
        return true;
    });
}
/**
 * Convert DOM element info to skeleton blocks
 */
function createSkeletonBlocks(domElements, skeletonColors, depth = 0) {
    const blocks = [];
    let blockId = 0;
    for (const elem of domElements) {
        if (!isValidBlock(elem)) {
            continue;
        }
        const bgColor = skeletonColors.get(elem.style.backgroundColor) || '#E5E7EB';
        const zIndex = calculateZIndex(depth);
        const baseWidth = Math.round(elem.bounds.width);
        const baseHeight = Math.round(elem.bounds.height);
        // Handle multi-line text elements
        if (elem.isMultiLine && elem.lineCount > 1) {
            const fontSize = parseFloat(elem.style.fontSize || '16');
            const lineHeight = parseFloat(elem.style.lineHeight || '1.5') * fontSize;
            const lineGap = 8; // Gap between lines
            for (let i = 0; i < elem.lineCount; i++) {
                const isLastLine = i === elem.lineCount - 1;
                const lineY = elem.bounds.y + (i * (lineHeight + lineGap));
                // Last line is random 40-60% width for realistic look
                let lineWidth = baseWidth * 0.9; // 90% for full lines
                if (isLastLine) {
                    const randomFactor = 0.4 + Math.random() * 0.2; // 40-60%
                    lineWidth = baseWidth * randomFactor;
                }
                blocks.push({
                    id: `skeleton-${blockId++}`,
                    x: Math.round(elem.bounds.x),
                    y: Math.round(lineY),
                    width: Math.round(lineWidth),
                    height: Math.round(fontSize * 1.1),
                    borderRadius: '4px',
                    backgroundColor: bgColor,
                    zIndex,
                    opacity: 1,
                    isText: true,
                    elementType: 'text',
                    isCircular: false,
                    isLastLine,
                    lineHeight: elem.style.lineHeight,
                    fontSize: elem.style.fontSize,
                });
            }
            continue;
        }
        // Apply width rules based on element type
        let finalWidth = baseWidth;
        if (elem.elementType === 'text' && elem.isDynamic) {
            // Text elements at 90% if full width, 75% if not
            const parentWidth = elem.bounds.width;
            const isFullWidth = baseWidth >= parentWidth * 0.95;
            finalWidth = Math.max(12, Math.round(baseWidth * (isFullWidth ? 0.9 : 0.75)));
        }
        // Determine border radius based on element type
        let borderRadius = elem.style.borderRadius;
        if (elem.isCircular || elem.elementType === 'avatar') {
            borderRadius = '50%';
        }
        else if (elem.elementType === 'text') {
            borderRadius = '4px';
        }
        else if (elem.elementType === 'button') {
            // Keep original button border radius
            borderRadius = elem.style.borderRadius || '8px';
        }
        const block = {
            id: `skeleton-${blockId++}`,
            x: Math.round(elem.bounds.x),
            y: Math.round(elem.bounds.y),
            width: Math.round(finalWidth),
            height: baseHeight,
            borderRadius,
            backgroundColor: bgColor,
            zIndex,
            opacity: 1,
            isText: elem.isTextNode,
            elementType: elem.elementType,
            isCircular: elem.isCircular,
            isLastLine: false,
            lineHeight: elem.style.lineHeight,
            fontSize: elem.style.fontSize,
        };
        blocks.push(block);
    }
    return blocks;
}
/**
 * Optimize skeleton blocks by merging and removing redundant ones
 */
function optimizeSkeletonBlocks(blocks) {
    let optimized = removeRedundantBlocks(blocks);
    optimized = mergeOverlappingBlocks(optimized);
    return optimized;
}
/**
 * Calculate total coverage of skeleton blocks (for stats/debugging)
 */
function calculateBlocksCoverage(blocks, parentWidth, parentHeight) {
    if (parentWidth === 0 || parentHeight === 0) {
        return 0;
    }
    const totalArea = parentWidth * parentHeight;
    const coveredArea = blocks.reduce((sum, block) => sum + block.width * block.height, 0);
    return (coveredArea / totalArea) * 100;
}

/**
 * useDomObserver - React hook for observing DOM changes and dimensions
 * Uses ResizeObserver and MutationObserver to recalculate skeletons
 * when the layout changes (responsive, content updates, etc.)
 */
/**
 * Debounce helper function
 */
function createDebouncedCallback(callback, delayMs) {
    let timeoutId = null;
    return ((...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callback(...args);
            timeoutId = null;
        }, delayMs);
    });
}
/**
 * Hook to observe DOM changes with ResizeObserver and MutationObserver
 */
function useDomObserver(targetRef, config = {}) {
    const { onResize, onMutate, debounceMs = 300, observeResize = true, observeMutation = true, observeAttributes = true, } = config;
    const resizeObserverRef = useRef(null);
    const mutationObserverRef = useRef(null);
    // Create debounced callbacks
    const debouncedResize = useCallback(createDebouncedCallback((entry) => {
        onResize?.(entry);
    }, debounceMs), [onResize, debounceMs]);
    const debouncedMutate = useCallback(createDebouncedCallback((mutations) => {
        onMutate?.(mutations);
    }, debounceMs), [onMutate, debounceMs]);
    useEffect(() => {
        const target = targetRef.current;
        if (!target) {
            return;
        }
        // Set up ResizeObserver
        if (observeResize && typeof ResizeObserver !== 'undefined') {
            resizeObserverRef.current = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    debouncedResize(entry);
                }
            });
            resizeObserverRef.current.observe(target);
        }
        // Set up MutationObserver
        if (observeMutation && typeof MutationObserver !== 'undefined') {
            mutationObserverRef.current = new MutationObserver((mutations) => {
                debouncedMutate(mutations);
            });
            mutationObserverRef.current.observe(target, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: observeAttributes,
                attributeFilter: [
                    'class',
                    'style',
                    'data-theme',
                    'data-loading',
                    'data-skeleton-ignore',
                    'data-skeleton-content',
                    'aria-busy',
                    'aria-hidden',
                ],
            });
        }
        // Cleanup
        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
                resizeObserverRef.current = null;
            }
            if (mutationObserverRef.current) {
                mutationObserverRef.current.disconnect();
                mutationObserverRef.current = null;
            }
        };
    }, [targetRef, observeResize, observeMutation, observeAttributes, debouncedResize, debouncedMutate]);
}
/**
 * Hook to measure element dimensions and position
 */
function useMeasureElement(elementRef) {
    const [measurements, setMeasurements] = require$$0.useState({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });
    useEffect(() => {
        if (!elementRef.current) {
            return;
        }
        const measure = () => {
            const rect = elementRef.current?.getBoundingClientRect();
            if (rect) {
                setMeasurements({
                    width: rect.width,
                    height: rect.height,
                    x: rect.x,
                    y: rect.y,
                });
            }
        };
        measure();
        // Re-measure on resize
        const handleResize = () => measure();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [elementRef]);
    return measurements;
}

/**
 * SkeletonPrimitive Component
 * Renders a single skeleton block with animation
 */
const SkeletonPrimitive = ({ block, animation = 'shimmer', speed = 1, theme = 'auto', }) => {
    const { backgroundColor, borderRadius, x, y, width, height, lineHeight, fontSize } = block;
    // Generate animation styles
    const animationStyles = useMemo(() => {
        const animationDuration = `${0.6 / speed}s`;
        const baseAnimation = {
            animationDuration,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
        };
        switch (animation) {
            case 'shimmer': {
                const gradient = generateShimmerGradient(backgroundColor);
                const gradientStr = gradient
                    .map(([pos, color]) => `${color} ${pos}%`)
                    .join(', ');
                return {
                    ...baseAnimation,
                    animation: `skeleton-shimmer ${animationDuration} linear infinite`,
                    background: `linear-gradient(90deg, ${gradientStr})`,
                    backgroundSize: '200% 100%',
                };
            }
            case 'pulse': {
                const colors = generatePulseColors(backgroundColor);
                return {
                    ...baseAnimation,
                    animation: `skeleton-pulse-color ${animationDuration} ease-in-out infinite`,
                    backgroundColor: colors.base,
                    '--skeleton-base-color': colors.base,
                    '--skeleton-highlight-color': colors.highlight,
                };
            }
            case 'wave': {
                const waveGradient = generateWaveGradient(backgroundColor);
                return {
                    ...baseAnimation,
                    animation: `skeleton-wave ${animationDuration} ease-in-out infinite`,
                    background: waveGradient,
                    backgroundSize: '200% 100%',
                };
            }
            case 'none':
            default:
                return {
                    backgroundColor,
                };
        }
    }, [animation, speed, backgroundColor]);
    const blockStyle = {
        position: 'absolute',
        top: y,
        left: x,
        width,
        height,
        borderRadius: borderRadius === '0px' ? 0 : borderRadius,
        opacity: block.opacity,
        zIndex: block.zIndex,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        ...animationStyles,
    };
    // For text nodes, apply text-specific styling
    if (block.isText && lineHeight) {
        const lh = parseInt(lineHeight);
        blockStyle.height = !isNaN(lh) ? lh : height;
    }
    return (jsxRuntimeExports.jsx("div", { className: "skeleton-primitive", style: blockStyle, "data-animation": animation, "aria-hidden": "true", role: "presentation" }));
};
SkeletonPrimitive.displayName = 'SkeletonPrimitive';

/**
 * SkeletonRenderer Component
 * Renders skeleton blocks as an overlay
 */
const SkeletonRenderer = ({ blocks, animation = 'shimmer', speed = 1, theme = 'auto', }) => {
    // Calculate container dimensions based on blocks
    useMemo(() => {
        if (blocks.length === 0) {
            return { maxWidth: 0, maxHeight: 0 };
        }
        let maxX = 0;
        let maxY = 0;
        for (const block of blocks) {
            maxX = Math.max(maxX, block.x + block.width);
            maxY = Math.max(maxY, block.y + block.height);
        }
        return {
            maxWidth: maxX,
            maxHeight: maxY,
        };
    }, [blocks]);
    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
    };
    if (blocks.length === 0) {
        return null;
    }
    return (jsxRuntimeExports.jsx("div", { className: "skeleton-renderer", style: overlayStyle, "data-animation": animation, "data-speed": speed, "data-theme": theme, children: blocks.map((block) => (jsxRuntimeExports.jsx(SkeletonPrimitive, { block: block, animation: animation, speed: speed, theme: theme }, block.id))) }));
};
SkeletonRenderer.displayName = 'SkeletonRenderer';

const SKELETON_STYLE_ID = 'react-dom-skeleton-styles';
const SKELETON_CSS = `
.skeleton-container{position:relative;display:inline-block;width:100%}
.skeleton-renderer{position:absolute;inset:0;pointer-events:none;z-index:9999;overflow:hidden}
.skeleton-primitive{position:absolute;will-change:transform,opacity;backface-visibility:hidden;border-radius:4px}
@keyframes skeleton-shimmer{0%{background-position:-1000px 0}100%{background-position:1000px 0}}
@keyframes skeleton-pulse{0%{opacity:1}50%{opacity:.5}100%{opacity:1}}
@keyframes skeleton-wave{0%{background-position:-1000px 0}100%{background-position:1000px 0}}
.skeleton-primitive[data-animation='shimmer']{animation:skeleton-shimmer 1.8s linear infinite;background-size:200% 100%;transform:translate3d(0,0,0)}
.skeleton-primitive[data-animation='pulse']{animation:skeleton-pulse 1.5s ease-in-out infinite;transform:translate3d(0,0,0)}
.skeleton-primitive[data-animation='wave']{animation:skeleton-wave 1.8s ease-in-out infinite;background-size:200% 100%;transform:translate3d(0,0,0)}
@media (prefers-reduced-motion: reduce){.skeleton-primitive{animation:none;opacity:.6}}
`;
/**
 * SkeletonOverlay Component
 * Wraps children and displays an animated skeleton overlay while loading
 */
const SkeletonOverlay = require$$0.forwardRef(({ loading, children, animation = 'pulse', speed = 1, preserveStaticText = false, hideTextDuringLoading = true, theme = 'auto', enabled = true, className = '', onScanComplete, }, ref) => {
    const containerRef = useRef(null);
    const [skeletonBlocks, setSkeletonBlocks] = useState([]);
    const [isSSRHydrated, setIsSSRHydrated] = useState(false);
    // Ensure this only runs on the client (SSR safety)
    useLayoutEffect(() => {
        setIsSSRHydrated(true);
    }, []);
    // Inject skeleton CSS once (avoid build-time CSS issues)
    useLayoutEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (!document.getElementById(SKELETON_STYLE_ID)) {
            const style = document.createElement('style');
            style.id = SKELETON_STYLE_ID;
            style.textContent = SKELETON_CSS;
            document.head.appendChild(style);
        }
    }, []);
    /**
     * Scan the DOM and generate skeleton blocks
     */
    const scanAndGenerateSkeletons = useCallback(() => {
        if (!isSSRHydrated || !containerRef.current || !loading || !enabled) {
            return;
        }
        // Get all children content
        const childrenContainer = containerRef.current.querySelector('[data-skeleton-content]');
        if (!childrenContainer) {
            return;
        }
        try {
            // Scan DOM for elements that need skeletons
            const domElements = scanComponentTree(childrenContainer, {
                preserveStaticText,
            });
            // Create a map of background colors to skeleton colors with element type context
            const colorMap = new Map();
            for (const elem of domElements) {
                const key = `${elem.style.backgroundColor}-${elem.elementType}`;
                if (!colorMap.has(key)) {
                    colorMap.set(key, generateSkeletonColor(elem.style.backgroundColor, elem.elementType));
                }
            }
            // Remap to use in createSkeletonBlocks (backwards compatible)
            const simpleColorMap = new Map();
            for (const elem of domElements) {
                const key = `${elem.style.backgroundColor}-${elem.elementType}`;
                simpleColorMap.set(elem.style.backgroundColor, colorMap.get(key) || '#E5E7EB');
            }
            // Create and optimize skeleton blocks
            let blocks = createSkeletonBlocks(domElements, simpleColorMap);
            blocks = optimizeSkeletonBlocks(blocks);
            setSkeletonBlocks(blocks);
            onScanComplete?.(blocks);
        }
        catch (error) {
            console.error('[SkeletonOverlay] Error scanning DOM:', error);
        }
    }, [isSSRHydrated, loading, enabled, preserveStaticText, onScanComplete]);
    /**
     * Rescan when DOM changes
     */
    useDomObserver(containerRef, {
        onResize: scanAndGenerateSkeletons,
        onMutate: scanAndGenerateSkeletons,
        debounceMs: 300,
        observeResize: true,
        observeMutation: loading && enabled,
    });
    /**
     * Initial scan after SSR hydration
     */
    useLayoutEffect(() => {
        if (isSSRHydrated && loading && enabled) {
            // Use requestAnimationFrame to ensure DOM is painted
            const frameId = requestAnimationFrame(() => {
                scanAndGenerateSkeletons();
            });
            return () => cancelAnimationFrame(frameId);
        }
    }, [isSSRHydrated, loading, enabled, scanAndGenerateSkeletons]);
    if (!enabled) {
        return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: children });
    }
    const containerStyle = {
        position: 'relative',
        display: 'inline-block',
        width: '100%',
    };
    return (jsxRuntimeExports.jsxs("div", { ref: ref || containerRef, className: `skeleton-container ${className}`, style: containerStyle, "data-skeleton-enabled": loading && isSSRHydrated, children: [jsxRuntimeExports.jsx("div", { "data-skeleton-content": true, style: {
                    position: 'relative',
                    pointerEvents: loading ? 'none' : 'auto',
                    transition: 'opacity 0.2s ease-in-out',
                    ...(loading && hideTextDuringLoading
                        ? {
                            color: 'transparent',
                            textShadow: 'none',
                            WebkitTextFillColor: 'transparent',
                            caretColor: 'transparent',
                        }
                        : null),
                }, children: children }), loading && isSSRHydrated && (jsxRuntimeExports.jsx(SkeletonRenderer, { blocks: skeletonBlocks, animation: animation, speed: speed, theme: theme }))] }));
});
SkeletonOverlay.displayName = 'SkeletonOverlay';
/**
 * HOC for easier integration with class components or custom wrappers
 */
function withSkeleton(Component) {
    return (props) => (jsxRuntimeExports.jsx(SkeletonOverlay, { ...props }));
}

/**
 * react-dom-skeleton
 * Enterprise-ready React package for automatic pixel-perfect loading skeletons
 *
 * Main entry point - exports all public APIs
 */
// Components
// Package version (can be updated via build process)
const VERSION = '1.0.0';

export { SkeletonOverlay, SkeletonPrimitive, SkeletonRenderer, VERSION, calculateBlocksCoverage, createSkeletonBlocks, extractBorderRadius, generateShimmerGradient, generateSkeletonColor, generateWaveGradient, isLightColor, mergeOverlappingBlocks, optimizeSkeletonBlocks, removeRedundantBlocks, scanComponentTree, scanDOMElement, useDomObserver, useMeasureElement, withSkeleton };
//# sourceMappingURL=index.esm.js.map
