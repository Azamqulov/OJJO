'use strict';Object.defineProperty(exports,'__esModule',{value:true});var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};var descriptors = !fails(function () {
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global_1 = // eslint-disable-next-line no-undef
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
Function('return this')();var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
var objectDefineProperty = {
  f: f
};var defineProperty = objectDefineProperty.f;
var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name'; // Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name

if (descriptors && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;
var objectPropertyIsEnumerable = {
  f: f$1
};var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};
var objectGetOwnPropertyDescriptor = {
  f: f$2
};var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  }

  return value;
};var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});
var sharedStore = store;var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;var WeakMap$1 = global_1.WeakMap;
var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));var isPure = false;var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.6.5',
    mode:  'global',
    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
  });
});var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};var hiddenKeys = {};var WeakMap$2 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$2();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;

  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store$1, it) || {};
  };

  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };

  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(String).split('String');
  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;

    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }

    if (O === global_1) {
      if (simple) O[key] = value;else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }

    if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
  });
});var path = global_1;var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};var min = Math.min; // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};var max = Math.max;
var min$1 = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};var indexOf = arrayIncludes.indexOf;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }

  return result;
};// IE8- don't enum bug keys
var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
  f: f$3
};var f$4 = Object.getOwnPropertySymbols;
var objectGetOwnPropertySymbols = {
  f: f$4
};var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
var isForced_1 = isForced;var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/

var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});var useSymbolAsUid = nativeSymbol // eslint-disable-next-line no-undef
&& !Symbol.sham // eslint-disable-next-line no-undef
&& typeof Symbol.iterator == 'symbol';// https://tc39.github.io/ecma262/#sec-isarray

var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};// https://tc39.github.io/ecma262/#sec-toobject

var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};// https://tc39.github.io/ecma262/#sec-object.keys

var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};// https://tc39.github.io/ecma262/#sec-object.defineproperties

var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

  return O;
};var html = getBuiltIn('document', 'documentElement');var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () {
  /* empty */
};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;

  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create

var objectCreate = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = NullProtoObject();

  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;
var toString$1 = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
};

var objectGetOwnPropertyNamesExternal = {
  f: f$5
};var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  }

  return WellKnownSymbolsStore[name];
};var f$6 = wellKnownSymbol;
var wellKnownSymbolWrapped = {
  f: f$6
};var defineProperty$1 = objectDefineProperty.f;

var defineWellKnownSymbol = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
    value: wellKnownSymbolWrapped.f(NAME)
  });
};var defineProperty$2 = objectDefineProperty.f;
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty$2(it, TO_STRING_TAG, {
      configurable: true,
      value: TAG
    });
  }
};var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};var functionBindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate = function (originalArray, length) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);

      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
            case 3:
              return true;
            // some

            case 5:
              return value;
            // find

            case 6:
              return index;
            // findIndex

            case 2:
              push.call(target, value);
            // filter
          } else if (IS_EVERY) return false; // every
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6)
};var $forEach = arrayIteration.forEach;
var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE$1 = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE$1];
var $Symbol = global_1.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var nativeDefineProperty$1 = objectDefineProperty.f;
var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore$1 = shared('wks');
var QObject = global_1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor = descriptors && fails(function () {
  return objectCreate(nativeDefineProperty$1({}, 'a', {
    get: function () {
      return nativeDefineProperty$1(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty$1(O, P, Attributes);

  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty$1;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!descriptors) symbol.description = description;
  return symbol;
};

var isSymbol = useSymbolAsUid ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);

  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = objectCreate(Attributes, {
        enumerable: createPropertyDescriptor(0, false)
      });
    }

    return setSymbolDescriptor(O, key, Attributes);
  }

  return nativeDefineProperty$1(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);

  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }

  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
}; // `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor


if (!nativeSymbol) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);

    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };

    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
      configurable: true,
      set: setter
    });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
    return getInternalState(this).tag;
  });
  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });
  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
  objectDefineProperty.f = $defineProperty;
  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

  wellKnownSymbolWrapped.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (descriptors) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });

    {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
        unsafe: true
      });
    }
  }
}

_export({
  global: true,
  wrap: true,
  forced: !nativeSymbol,
  sham: !nativeSymbol
}, {
  Symbol: $Symbol
});
$forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
  defineWellKnownSymbol(name);
});
_export({
  target: SYMBOL,
  stat: true,
  forced: !nativeSymbol
}, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () {
    USE_SETTER = true;
  },
  useSimple: function () {
    USE_SETTER = false;
  }
});
_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol,
  sham: !descriptors
}, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol
}, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443

_export({
  target: 'Object',
  stat: true,
  forced: fails(function () {
    objectGetOwnPropertySymbols.f(1);
  })
}, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return objectGetOwnPropertySymbols.f(toObject(it));
  }
}); // `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify

if ($stringify) {
  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

    return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
    || $stringify({
      a: symbol
    }) != '{}' // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
  });
  _export({
    target: 'JSON',
    stat: true,
    forced: FORCED_JSON_STRINGIFY
  }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;

      while (arguments.length > index) args.push(arguments[index++]);

      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
} // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive


if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
} // `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag


setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';var process = global_1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;var SPECIES$1 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES$1] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};var defineProperty$3 = Object.defineProperty;
var cache = {};

var thrower = function (it) {
  throw it;
};

var arrayMethodUsesToLength = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;
  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !descriptors) return true;
    var O = {
      length: -1
    };
    if (ACCESSORS) defineProperty$3(O, 1, {
      enumerable: true,
      get: thrower
    });else O[1] = 1;
    method.call(O, argument0, argument1);
  });
};var $filter = arrayIteration.filter;
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // Edge 14- issue

var USES_TO_LENGTH = arrayMethodUsesToLength('filter'); // `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};var $forEach$1 = arrayIteration.forEach;
var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH$1 = arrayMethodUsesToLength('forEach'); // `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

var arrayForEach = !STRICT_METHOD || !USES_TO_LENGTH$1 ? function forEach(callbackfn
/* , thisArg */
) {
  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


_export({
  target: 'Array',
  proto: true,
  forced: [].forEach != arrayForEach
}, {
  forEach: arrayForEach
});var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var FAILS_ON_PRIMITIVES = fails(function () {
  nativeGetOwnPropertyDescriptor$2(1);
});
var FORCED = !descriptors || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

_export({
  target: 'Object',
  stat: true,
  forced: FORCED,
  sham: !descriptors
}, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
  }
});var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors

_export({
  target: 'Object',
  stat: true,
  sham: !descriptors
}, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;

    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }

    return result;
  }
});var FAILS_ON_PRIMITIVES$1 = fails(function () {
  objectKeys(1);
}); // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES$1
}, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
  } catch (error) {
    CollectionPrototype.forEach = arrayForEach;
  }
}function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}var defineProperty$4 = objectDefineProperty.f;
var NativeSymbol = global_1.Symbol;

if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || // Safari 12 bug
NativeSymbol().description !== undefined)) {
  var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
    : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;
  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty$4(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });
  _export({
    global: true,
    forced: true
  }, {
    Symbol: SymbolWrapper
  });
}// https://tc39.github.io/ecma262/#sec-symbol.iterator

defineWellKnownSymbol('iterator');var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

_export({
  target: 'Array',
  proto: true,
  forced: FORCED$1
}, {
  concat: function concat(arg) {
    // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});var $every = arrayIteration.every;
var STRICT_METHOD$1 = arrayMethodIsStrict('every');
var USES_TO_LENGTH$2 = arrayMethodUsesToLength('every'); // `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every

_export({
  target: 'Array',
  proto: true,
  forced: !STRICT_METHOD$1 || !USES_TO_LENGTH$2
}, {
  every: function every(callbackfn
  /* , thisArg */
  ) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: objectCreate(null)
  });
} // add a key to Array.prototype[@@unscopables]


var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};var $find = arrayIteration.find;
var FIND = 'find';
var SKIPS_HOLES = true;
var USES_TO_LENGTH$3 = arrayMethodUsesToLength(FIND); // Shouldn't skip holes

if (FIND in []) Array(1)[FIND](function () {
  SKIPS_HOLES = false;
}); // `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find

_export({
  target: 'Array',
  proto: true,
  forced: SKIPS_HOLES || !USES_TO_LENGTH$3
}, {
  find: function find(callbackfn
  /* , that = undefined */
  ) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables(FIND);var $findIndex = arrayIteration.findIndex;
var FIND_INDEX = 'findIndex';
var SKIPS_HOLES$1 = true;
var USES_TO_LENGTH$4 = arrayMethodUsesToLength(FIND_INDEX); // Shouldn't skip holes

if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () {
  SKIPS_HOLES$1 = false;
}); // `Array.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex

_export({
  target: 'Array',
  proto: true,
  forced: SKIPS_HOLES$1 || !USES_TO_LENGTH$4
}, {
  findIndex: function findIndex(callbackfn
  /* , that = undefined */
  ) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables(FIND_INDEX);var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};var iterators = {};var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype$1 = Array.prototype; // check on default Array iterator

var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR] === it);
};var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG$1] = 'z';
var toStringTagSupport = String(test) === '[object z]';var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};var ITERATOR$1 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1] || it['@@iterator'] || iterators[classof(it)];
};// https://tc39.github.io/ecma262/#sec-array.from


var arrayFrom = function from(arrayLike
/* , mapfn = undefined, thisArg = undefined */
) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();

    for (; !(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);

    for (; length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }

  result.length = index;
  return result;
};var ITERATOR$2 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return {
        done: !!called++
      };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };

  iteratorWithReturn[ITERATOR$2] = function () {
    return this;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR$2] = function () {
      return {
        next: function () {
          return {
            done: ITERATION_SUPPORT = true
          };
        }
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
};var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
}); // `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from

_export({
  target: 'Array',
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  from: arrayFrom
});var $includes = arrayIncludes.includes;
var USES_TO_LENGTH$5 = arrayMethodUsesToLength('indexOf', {
  ACCESSORS: true,
  1: 0
}); // `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes

_export({
  target: 'Array',
  proto: true,
  forced: !USES_TO_LENGTH$5
}, {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('includes');var $indexOf = arrayIncludes.indexOf;
var nativeIndexOf = [].indexOf;
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD$2 = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH$6 = arrayMethodUsesToLength('indexOf', {
  ACCESSORS: true,
  1: 0
}); // `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

_export({
  target: 'Array',
  proto: true,
  forced: NEGATIVE_ZERO || !STRICT_METHOD$2 || !USES_TO_LENGTH$6
}, {
  indexOf: function indexOf(searchElement
  /* , fromIndex = 0 */
  ) {
    return NEGATIVE_ZERO // convert -0 to +0
    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});var nativeJoin = [].join;
var ES3_STRINGS = indexedObject != Object;
var STRICT_METHOD$3 = arrayMethodIsStrict('join', ','); // `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join

_export({
  target: 'Array',
  proto: true,
  forced: ES3_STRINGS || !STRICT_METHOD$3
}, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});var min$2 = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO$1 = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD$4 = arrayMethodIsStrict('lastIndexOf'); // For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method

var USES_TO_LENGTH$7 = arrayMethodUsesToLength('indexOf', {
  ACCESSORS: true,
  1: 0
});
var FORCED$2 = NEGATIVE_ZERO$1 || !STRICT_METHOD$4 || !USES_TO_LENGTH$7; // `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof

var arrayLastIndexOf = FORCED$2 ? function lastIndexOf(searchElement
/* , fromIndex = @[*-1] */
) {
  // convert -0 to +0
  if (NEGATIVE_ZERO$1) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min$2(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;

  for (; index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;

  return -1;
} : nativeLastIndexOf;// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof

_export({
  target: 'Array',
  proto: true,
  forced: arrayLastIndexOf !== [].lastIndexOf
}, {
  lastIndexOf: arrayLastIndexOf
});var $map = arrayIteration.map;
var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map'); // FF49- issue

var USES_TO_LENGTH$8 = arrayMethodUsesToLength('map'); // `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$8
}, {
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});var createMethod$2 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction$1(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }

      index += i;

      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }

    for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }

    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$2(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$2(true)
};var $reduce = arrayReduce.left;
var STRICT_METHOD$5 = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH$9 = arrayMethodUsesToLength('reduce', {
  1: 0
}); // `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce

_export({
  target: 'Array',
  proto: true,
  forced: !STRICT_METHOD$5 || !USES_TO_LENGTH$9
}, {
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH$a = arrayMethodUsesToLength('slice', {
  ACCESSORS: true,
  0: 0,
  1: 2
});
var SPECIES$2 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$1 = Math.max; // `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$a
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES$2];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

    result.length = n;
    return result;
  }
});var $some = arrayIteration.some;
var STRICT_METHOD$6 = arrayMethodIsStrict('some');
var USES_TO_LENGTH$b = arrayMethodUsesToLength('some'); // `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some

_export({
  target: 'Array',
  proto: true,
  forced: !STRICT_METHOD$6 || !USES_TO_LENGTH$b
}, {
  some: function some(callbackfn
  /* , thisArg */
  ) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH$c = arrayMethodUsesToLength('splice', {
  ACCESSORS: true,
  0: 0,
  1: 2
});
var max$2 = Math.max;
var min$3 = Math.min;
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$c
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$3(max$2(toInteger(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});// https://github.com/tc39/proposal-global

_export({
  global: true
}, {
  globalThis: global_1
});// `Math.sign` method implementation
// https://tc39.github.io/ecma262/#sec-math.sign
var mathSign = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};// https://tc39.github.io/ecma262/#sec-math.sign

_export({
  target: 'Math',
  stat: true
}, {
  sign: mathSign
});var ceil$1 = Math.ceil;
var floor$1 = Math.floor; // `Math.trunc` method
// https://tc39.github.io/ecma262/#sec-math.trunc

_export({
  target: 'Math',
  stat: true
}, {
  trunc: function trunc(it) {
    return (it > 0 ? floor$1 : ceil$1)(it);
  }
});var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
};// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */

var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if ( // it can work only with native `setPrototypeOf`
  objectSetPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
  typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) objectSetPrototypeOf($this, NewTargetPrototype);
  return $this;
};// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

var createMethod$3 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$3(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$3(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$3(3)
};var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var defineProperty$5 = objectDefineProperty.f;
var trim = stringTrim.trim;
var NUMBER = 'Number';
var NativeNumber = global_1[NUMBER];
var NumberPrototype = NativeNumber.prototype; // Opera ~12 has broken Object#toString

var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER; // `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber

var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;

  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);

    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal of /^0b[01]+$/i

        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        // fast equal of /^0o[0-7]+$/i

        default:
          return +it;
      }

      digits = it.slice(2);
      length = digits.length;

      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index); // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols

        if (code < 48 || code > maxCode) return NaN;
      }

      return parseInt(digits, radix);
    }
  }

  return +it;
}; // `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor


if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper // check on 1..constructor(foo) case
    && (BROKEN_CLASSOF ? fails(function () {
      NumberPrototype.valueOf.call(dummy);
    }) : classofRaw(dummy) != NUMBER) ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };

  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : ( // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys$1.length > j; j++) {
    if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
      defineProperty$5(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
    }
  }

  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global_1, NUMBER, NumberWrapper);
}// https://tc39.github.io/ecma262/#sec-number.isnan

_export({
  target: 'Number',
  stat: true
}, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});// https://tc39.github.io/ecma262/#sec-thisnumbervalue

var thisNumberValue = function (value) {
  if (typeof value != 'number' && classofRaw(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }

  return +value;
};// https://tc39.github.io/ecma262/#sec-string.prototype.repeat


var stringRepeat = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');

  for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;

  return result;
};var nativeToFixed = 1.0.toFixed;
var floor$2 = Math.floor;

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;

  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }

  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  }

  return n;
};

var FORCED$3 = nativeToFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
}); // `Number.prototype.toFixed` method
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed

_export({
  target: 'Number',
  proto: true,
  forced: FORCED$3
}, {
  // eslint-disable-next-line max-statements
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    var multiply = function (n, c) {
      var index = -1;
      var c2 = c;

      while (++index < 6) {
        c2 += n * data[index];
        data[index] = c2 % 1e7;
        c2 = floor$2(c2 / 1e7);
      }
    };

    var divide = function (n) {
      var index = 6;
      var c = 0;

      while (--index >= 0) {
        c += data[index];
        data[index] = floor$2(c / n);
        c = c % n * 1e7;
      }
    };

    var dataToString = function () {
      var index = 6;
      var s = '';

      while (--index >= 0) {
        if (s !== '' || index === 0 || data[index] !== 0) {
          var t = String(data[index]);
          s = s === '' ? t : s + stringRepeat.call('0', 7 - t.length) + t;
        }
      }

      return s;
    };

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits'); // eslint-disable-next-line no-self-compare

    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);

    if (number < 0) {
      sign = '-';
      number = -number;
    }

    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;

      if (e > 0) {
        multiply(0, z);
        j = fractDigits;

        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }

        multiply(pow(10, j, 1), 0);
        j = e - 1;

        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }

        divide(1 << j);
        multiply(1, 1);
        divide(2);
        result = dataToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        result = dataToString() + stringRepeat.call('0', fractDigits);
      }
    }

    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits ? '0.' + stringRepeat.call('0', fractDigits - k) + result : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    }

    return result;
  }
});var propertyIsEnumerable = objectPropertyIsEnumerable.f; // `Object.{ entries, values }` methods implementation

var createMethod$4 = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!descriptors || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

var objectToArray = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod$4(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod$4(false)
};var $entries = objectToArray.entries; // `Object.entries` method
// https://tc39.github.io/ecma262/#sec-object.entries

_export({
  target: 'Object',
  stat: true
}, {
  entries: function entries(O) {
    return $entries(O);
  }
});// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

if (!toStringTagSupport) {
  redefine(Object.prototype, 'toString', objectToString, {
    unsafe: true
  });
}var $values = objectToArray.values; // `Object.values` method
// https://tc39.github.io/ecma262/#sec-object.values

_export({
  target: 'Object',
  stat: true
}, {
  values: function values(O) {
    return $values(O);
  }
});var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags


var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};// so we use an intermediate function.


function RE(s, f) {
  return RegExp(s, f);
}

var UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});
var BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});
var regexpStickyHelpers = {
  UNSUPPORTED_Y: UNSUPPORTED_Y,
  BROKEN_CARET: BROKEN_CARET
};var SPECIES$3 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};var defineProperty$6 = objectDefineProperty.f;
var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var setInternalState$1 = internalState.set;
var MATCH$1 = wellKnownSymbol('match');
var NativeRegExp = global_1.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g; // "new" should create a new object, old webkit bug

var CORRECT_NEW = new NativeRegExp(re1) !== re1;
var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;
var FORCED$4 = descriptors && isForced_1('RegExp', !CORRECT_NEW || UNSUPPORTED_Y$1 || fails(function () {
  re2[MATCH$1] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})); // `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor

if (FORCED$4) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegexp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = regexpFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y$1) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
    if (UNSUPPORTED_Y$1 && sticky) setInternalState$1(result, {
      sticky: sticky
    });
    return result;
  };

  var proxy = function (key) {
    key in RegExpWrapper || defineProperty$6(RegExpWrapper, key, {
      configurable: true,
      get: function () {
        return NativeRegExp[key];
      },
      set: function (it) {
        NativeRegExp[key] = it;
      }
    });
  };

  var keys$2 = getOwnPropertyNames$1(NativeRegExp);
  var index = 0;

  while (keys$2.length > index) proxy(keys$2[index++]);

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global_1, 'RegExp', RegExpWrapper);
} // https://tc39.github.io/ecma262/#sec-get-regexp-@@species


setSpecies('RegExp');var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.

var nativeReplace = String.prototype.replace;
var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}();

var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y$2 && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');

      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex); // Support anchored sticky behavior.

      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      } // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.


      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }

    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;_export({
  target: 'RegExp',
  proto: true,
  forced: /./.exec !== regexpExec
}, {
  exec: regexpExec
});var TO_STRING = 'toString';
var RegExpPrototype$1 = RegExp.prototype;
var nativeToString = RegExpPrototype$1[TO_STRING];
var NOT_GENERIC = fails(function () {
  return nativeToString.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
}); // FF44- RegExp#toString has a wrong name

var INCORRECT_NAME = nativeToString.name != TO_STRING; // `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring

if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? regexpFlags.call(R) : rf);
    return '/' + p + '/' + f;
  }, {
    unsafe: true
  });
}var notARegexp = function (it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  }

  return it;
};var MATCH$2 = wellKnownSymbol('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;

  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH$2] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) {
      /* empty */
    }
  }

  return false;
};// https://tc39.github.io/ecma262/#sec-string.prototype.includes


_export({
  target: 'String',
  proto: true,
  forced: !correctIsRegexpLogic('includes')
}, {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    return !!~String(requireObjectCoercible(this)).indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});var createMethod$5 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$5(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$5(true)
};var correctPrototypeGetter = !fails(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});var IE_PROTO$1 = sharedKey('IE_PROTO');
var ObjectPrototype$1 = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype$1 : null;
};var ITERATOR$3 = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () {
  return this;
}; // `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

if ( !has(IteratorPrototype, ITERATOR$3)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

var returnThis$1 = function () {
  return this;
};

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
    next: createPropertyDescriptor(1, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$4 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$2 = function () {
  return this;
};

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$4] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
        }
      } // Set @@toStringTag to native iterators


      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function values() {
      return nativeIterator.call(this);
    };
  } // define iterator


  if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
  }

  iterators[NAME] = defaultIterator; // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};var charAt = stringMultibyte.charAt;
var STRING_ITERATOR = 'String Iterator';
var setInternalState$2 = internalState.set;
var getInternalState$1 = internalState.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState$2(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$1(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
});var SPECIES$4 = wellKnownSymbol('species');
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;

  re.exec = function () {
    var result = [];
    result.groups = {
      a: '7'
    };
    return result;
  };

  return ''.replace(re, '$<a>') !== '7';
}); // IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0

var REPLACE_KEEPS_$0 = function () {
  return 'a'.replace(/./, '$0') === '$0';
}();

var REPLACE = wellKnownSymbol('replace'); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string

var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }

  return false;
}(); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper


var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;

  re.exec = function () {
    return originalExec.apply(this, arguments);
  };

  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);
  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};

    O[SYMBOL] = function () {
      return 7;
    };

    return ''[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.

      re.constructor = {};

      re.constructor[SPECIES$4] = function () {
        return re;
      };

      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () {
      execCalled = true;
      return null;
    };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return {
            done: true,
            value: nativeRegExpMethod.call(regexp, str, arg2)
          };
        }

        return {
          done: true,
          value: nativeMethod.call(str, regexp, arg2)
        };
      }

      return {
        done: false
      };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];
    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return regexMethod.call(string, this, arg);
    } // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return regexMethod.call(string, this);
    });
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};var charAt$1 = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex

var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};// https://tc39.github.io/ecma262/#sec-regexpexec

var regexpExecAbstract = function (R, S) {
  var exec = R.exec;

  if (typeof exec === 'function') {
    var result = exec.call(R, S);

    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }

    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [// `String.prototype.match` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.match
  function match(regexp) {
    var O = requireObjectCoercible(this);
    var matcher = regexp == undefined ? undefined : regexp[MATCH];
    return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, // `RegExp.prototype[@@match]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
  function (regexp) {
    var res = maybeCallNative(nativeMatch, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    if (!rx.global) return regexpExecAbstract(rx, S);
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
    var A = [];
    var n = 0;
    var result;

    while ((result = regexpExecAbstract(rx, S)) !== null) {
      var matchStr = String(result[0]);
      A[n] = matchStr;
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      n++;
    }

    return n === 0 ? null : A;
  }];
});var max$3 = Math.max;
var min$4 = Math.min;
var floor$3 = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
}; // @@replace logic


fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
  return [// `String.prototype.replace` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
  function replace(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
    return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
  }, // `RegExp.prototype[@@replace]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
  function (regexp, replaceValue) {
    if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
      if (res.done) return res.value;
    }

    var rx = anObject(regexp);
    var S = String(this);
    var functionalReplace = typeof replaceValue === 'function';
    if (!functionalReplace) replaceValue = String(replaceValue);
    var global = rx.global;

    if (global) {
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
    }

    var results = [];

    while (true) {
      var result = regexpExecAbstract(rx, S);
      if (result === null) break;
      results.push(result);
      if (!global) break;
      var matchStr = String(result[0]);
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
    }

    var accumulatedResult = '';
    var nextSourcePosition = 0;

    for (var i = 0; i < results.length; i++) {
      result = results[i];
      var matched = String(result[0]);
      var position = max$3(min$4(toInteger(result.index), S.length), 0);
      var captures = []; // NOTE: This is equivalent to
      //   captures = result.slice(1).map(maybeToString)
      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

      var namedCaptures = result.groups;

      if (functionalReplace) {
        var replacerArgs = [matched].concat(captures, position, S);
        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
        var replacement = String(replaceValue.apply(undefined, replacerArgs));
      } else {
        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
      }

      if (position >= nextSourcePosition) {
        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
        nextSourcePosition = position + matched.length;
      }
    }

    return accumulatedResult + S.slice(nextSourcePosition);
  }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }

    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;

      switch (ch.charAt(0)) {
        case '$':
          return '$';

        case '&':
          return matched;

        case '`':
          return str.slice(0, position);

        case "'":
          return str.slice(tailPos);

        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;

        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;

          if (n > m) {
            var f = floor$3(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }

          capture = captures[n - 1];
      }

      return capture === undefined ? '' : capture;
    });
  }
});// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
var sameValue = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [// `String.prototype.search` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.search
  function search(regexp) {
    var O = requireObjectCoercible(this);
    var searcher = regexp == undefined ? undefined : regexp[SEARCH];
    return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, // `RegExp.prototype[@@search]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
  function (regexp) {
    var res = maybeCallNative(nativeSearch, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var previousLastIndex = rx.lastIndex;
    if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
    var result = regexpExecAbstract(rx, S);
    if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
    return result === null ? -1 : result.index;
  }];
});var SPECIES$5 = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor

var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$5]) == undefined ? defaultConstructor : aFunction$1(S);
};var arrayPush = [].push;
var min$5 = Math.min;
var MAX_UINT32 = 0xFFFFFFFF; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

var SUPPORTS_Y = !fails(function () {
  return !RegExp(MAX_UINT32, 'y');
}); // @@split logic

fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;

  if ('abbc'.split(/(b)*/)[1] == 'c' || 'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

      if (!isRegexp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }

      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;

      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;

        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }

        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }

      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));

      return output.length > lim ? output.slice(0, lim) : output;
    }; // Chakra, V8

  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [// `String.prototype.split` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.split
  function split(separator, limit) {
    var O = requireObjectCoercible(this);
    var splitter = separator == undefined ? undefined : separator[SPLIT];
    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
  }, // `RegExp.prototype[@@split]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
  //
  // NOTE: This cannot be properly polyfilled in engines that don't support
  // the 'y' flag.
  function (regexp, limit) {
    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var C = speciesConstructor(rx, RegExp);
    var unicodeMatching = rx.unicode;
    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
    // simulate the 'y' flag.

    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
    if (lim === 0) return [];
    if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
    var p = 0;
    var q = 0;
    var A = [];

    while (q < S.length) {
      splitter.lastIndex = SUPPORTS_Y ? q : 0;
      var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
      var e;

      if (z === null || (e = min$5(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
        q = advanceStringIndex(S, q, unicodeMatching);
      } else {
        A.push(S.slice(p, q));
        if (A.length === lim) return A;

        for (var i = 1; i <= z.length - 1; i++) {
          A.push(z[i]);
          if (A.length === lim) return A;
        }

        q = p = e;
      }
    }

    A.push(S.slice(p));
    return A;
  }];
}, !SUPPORTS_Y);var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
var nativeStartsWith = ''.startsWith;
var min$6 = Math.min;
var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith'); // https://github.com/zloirock/core-js/pull/702

var MDN_POLYFILL_BUG =  !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor$3(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}(); // `String.prototype.startsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.startswith

_export({
  target: 'String',
  proto: true,
  forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
}, {
  startsWith: function startsWith(searchString
  /* , position = 0 */
  ) {
    var that = String(requireObjectCoercible(this));
    notARegexp(searchString);
    var index = toLength(min$6(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return nativeStartsWith ? nativeStartsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
  }
});var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
// of whitespaces and has a correct name

var stringTrimForced = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};var $trim = stringTrim.trim; // `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim

_export({
  target: 'String',
  proto: true,
  forced: stringTrimForced('trim')
}, {
  trim: function trim() {
    return $trim(this);
  }
});var redefineAll = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);

  return target;
};var freezing = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});var internalMetadata = createCommonjsModule(function (module) {
  var defineProperty = objectDefineProperty.f;
  var METADATA = uid('meta');
  var id = 0;

  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty(it, METADATA, {
      value: {
        objectID: 'O' + ++id,
        // object ID
        weakData: {} // weak collections IDs

      }
    });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

      if (!create) return 'E'; // add missing metadata

      setMetadata(it); // return object ID
    }

    return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true; // not necessary to add metadata

      if (!create) return false; // add missing metadata

      setMetadata(it); // return the store of weak collections IDs
    }

    return it[METADATA].weakData;
  }; // add metadata on freeze-family methods calling


  var onFreeze = function (it) {
    if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = module.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };
  hiddenKeys[METADATA] = true;
});var iterate_1 = createCommonjsModule(function (module) {
  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
    var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
    var iterator, iterFn, index, length, result, next, step;

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength(iterable.length); length > index; index++) {
          result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
          if (result && result instanceof Result) return result;
        }

        return new Result(false);
      }

      iterator = iterFn.call(iterable);
    }

    next = iterator.next;

    while (!(step = next.call(iterator)).done) {
      result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
      if (typeof result == 'object' && result && result instanceof Result) return result;
    }

    return new Result(false);
  };

  iterate.stop = function (result) {
    return new Result(true, result);
  };
});var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  }

  return it;
};var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY, KEY == 'add' ? function add(value) {
      nativeMethod.call(this, value === 0 ? 0 : value);
      return this;
    } : KEY == 'delete' ? function (key) {
      return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
    } : KEY == 'get' ? function get(key) {
      return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
    } : KEY == 'has' ? function has(key) {
      return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
    } : function set(key, value) {
      nativeMethod.call(this, key === 0 ? 0 : key, value);
      return this;
    });
  }; // eslint-disable-next-line max-len


  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    internalMetadata.REQUIRED = true;
  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor(); // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    }); // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new

    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
      new NativeConstructor(iterable);
    }); // for early implementations -0 and +0 not the same

    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;

      while (index--) $instance[ADDER](index, index);

      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  _export({
    global: true,
    forced: Constructor != NativeConstructor
  }, exported);
  setToStringTag(Constructor, CONSTRUCTOR_NAME);
  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
  return Constructor;
};var getWeakData = internalMetadata.getWeakData;
var setInternalState$3 = internalState.set;
var internalStateGetterFor = internalState.getterFor;
var find = arrayIteration.find;
var findIndex = arrayIteration.findIndex;
var id$1 = 0; // fallback for uncaught frozen keys

var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};
var collectionWeak = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$3(that, {
        type: CONSTRUCTOR_NAME,
        id: id$1++,
        frozen: undefined
      });
      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
    });
    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has$1(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && has(data, state.id);
      }
    });
    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);

        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });
    return C;
  }
};var es_weakMap = createCommonjsModule(function (module) {

  var enforceIternalState = internalState.enforce;
  var IS_IE11 = !global_1.ActiveXObject && 'ActiveXObject' in global_1;
  var isExtensible = Object.isExtensible;
  var InternalWeakMap;

  var wrapper = function (init) {
    return function WeakMap() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  }; // `WeakMap` constructor
  // https://tc39.github.io/ecma262/#sec-weakmap-constructor


  var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak); // IE11 WeakMap frozen keys fix
  // We can't use feature detection because it crash some old IE builds
  // https://github.com/zloirock/core-js/issues/485

  if (nativeWeakMap && IS_IE11) {
    InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
    internalMetadata.REQUIRED = true;
    var WeakMapPrototype = $WeakMap.prototype;
    var nativeDelete = WeakMapPrototype['delete'];
    var nativeHas = WeakMapPrototype.has;
    var nativeGet = WeakMapPrototype.get;
    var nativeSet = WeakMapPrototype.set;
    redefineAll(WeakMapPrototype, {
      'delete': function (key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeDelete.call(this, key) || state.frozen['delete'](key);
        }

        return nativeDelete.call(this, key);
      },
      has: function has(key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) || state.frozen.has(key);
        }

        return nativeHas.call(this, key);
      },
      get: function get(key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
        }

        return nativeGet.call(this, key);
      },
      set: function set(key, value) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
        } else nativeSet.call(this, key, value);

        return this;
      }
    });
  }
});var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$4 = internalState.set;
var getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator

var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$4(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$2(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

iterators.Arguments = iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');var ITERATOR$5 = wellKnownSymbol('iterator');
var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;

for (var COLLECTION_NAME$1 in domIterables) {
  var Collection$1 = global_1[COLLECTION_NAME$1];
  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;

  if (CollectionPrototype$1) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype$1[ITERATOR$5] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$5, ArrayValues);
    } catch (error) {
      CollectionPrototype$1[ITERATOR$5] = ArrayValues;
    }

    if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
      createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
    }

    if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
}var ITERATOR$6 = wellKnownSymbol('iterator');
var nativeUrl = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return isPure && !url.toJSON || !searchParams.sort || url.href !== 'http://a/c%20d?a=1&c=3' || searchParams.get('c') !== '3' || String(new URLSearchParams('?a=1')) !== 'a=1' || !searchParams[ITERATOR$6] // throws in Edge
  || new URL('https://a@b').username !== 'a' || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b' // not punycoded in Edge
  || new URL('http://тест').host !== 'xn--e1aybc' // not escaped in Chrome 62-
  || new URL('http://a#б').hash !== '#%D0%B1' // fails in Chrome 66-
  || result !== 'a1c3' // throws in Safari
  || new URL('http://x', undefined).host !== 'x';
});var nativeAssign = Object.assign;
var defineProperty$7 = Object.defineProperty; // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign

var objectAssign = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (descriptors && nativeAssign({
    b: 1
  }, nativeAssign(defineProperty$7({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$7(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), {
    b: 2
  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

  var A = {};
  var B = {}; // eslint-disable-next-line no-undef

  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) {
    B[chr] = chr;
  });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

  while (argumentsLength > index) {
    var S = indexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) {
      key = keys[j++];
      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  }

  return T;
} : nativeAssign;var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80

var delimiter = '-'; // '\x2D'

var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars

var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor$4 = Math.floor;
var stringFromCharCode = String.fromCharCode;
/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */

var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;

  while (counter < length) {
    var value = string.charCodeAt(counter++);

    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);

      if ((extra & 0xFC00) == 0xDC00) {
        // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }

  return output;
};
/**
 * Converts a digit/integer into a basic code point.
 */


var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};
/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */


var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor$4(delta / damp) : delta >> 1;
  delta += floor$4(delta / numPoints);

  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor$4(delta / baseMinusTMin);
  }

  return floor$4(k + (baseMinusTMin + 1) * delta / (delta + skew));
};
/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line  max-statements


var encode = function (input) {
  var output = []; // Convert the input in UCS-2 to an array of Unicode code points.

  input = ucs2decode(input); // Cache the length.

  var inputLength = input.length; // Initialize the state.

  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue; // Handle the basic code points.

  for (i = 0; i < input.length; i++) {
    currentValue = input[i];

    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.

  var handledCPCount = basicLength; // number of code points that have been handled;
  // Finish the basic string with a delimiter unless it's empty.

  if (basicLength) {
    output.push(delimiter);
  } // Main encoding loop:


  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];

      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.


    var handledCPCountPlusOne = handledCPCount + 1;

    if (m - n > floor$4((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];

      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }

      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;

        for (var k = base;;
        /* no condition */
        k += base) {
          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor$4(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }

  return output.join('');
};

var stringPunycodeToAscii = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
  var i, label;

  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }

  return encoded.join('.');
};var getIterator = function (it) {
  var iteratorMethod = getIteratorMethod(it);

  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  }

  return anObject(iteratorMethod.call(it));
};var $fetch = getBuiltIn('fetch');
var Headers = getBuiltIn('Headers');
var ITERATOR$7 = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState$5 = internalState.set;
var getInternalParamsState = internalState.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = internalState.getterFor(URL_SEARCH_PARAMS_ITERATOR);
var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;

  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }

    return result;
  }
};

var find$1 = /[!'()~]|%20/g;
var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find$1, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;

    while (index < attributes.length) {
      attribute = attributes[index++];

      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState$5(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;

  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  }

  return step;
}); // `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams

var URLSearchParamsConstructor = function URLSearchParams()
/* init */
{
  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;
  setInternalState$5(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () {
      /* empty */
    },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject(init)) {
      iteratorMethod = getIteratorMethod(init);

      if (typeof iteratorMethod === 'function') {
        iterator = iteratorMethod.call(init);
        next = iterator.next;

        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if ((first = entryNext.call(entryIterator)).done || (second = entryNext.call(entryIterator)).done || !entryNext.call(entryIterator).done) throw TypeError('Expected sequence with length 2');
          entries.push({
            key: first.value + '',
            value: second.value + ''
          });
        }
      } else for (key in init) if (has(init, key)) entries.push({
        key: key,
        value: init[key] + ''
      });
    } else {
      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.appent` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({
      key: name + '',
      value: value + ''
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = name + '';
    var index = 0;

    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);else index++;
    }

    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;

    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }

    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var result = [];
    var index = 0;

    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }

    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;

    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }

    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = name + '';
    var val = value + '';
    var index = 0;
    var entry;

    for (; index < entries.length; index++) {
      entry = entries[index];

      if (entry.key === key) {
        if (found) entries.splice(index--, 1);else {
          found = true;
          entry.value = val;
        }
      }
    }

    if (!found) entries.push({
      key: key,
      value: val
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries; // Array#sort is not stable in some engines

    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;

    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];

      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }

      if (entriesIndex === sliceIndex) entries.push(entry);
    }

    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback
  /* , thisArg */
  ) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = functionBindContext(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;

    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, {
  enumerable: true
}); // `URLSearchParams.prototype[@@iterator]` method

redefine(URLSearchParamsPrototype, ITERATOR$7, URLSearchParamsPrototype.entries); // `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior

redefine(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;

  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  }

  return result.join('&');
}, {
  enumerable: true
});
setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
_export({
  global: true,
  forced: !nativeUrl
}, {
  URLSearchParams: URLSearchParamsConstructor
}); // Wrap `fetch` for correct work with polyfilled `URLSearchParams`
// https://github.com/zloirock/core-js/issues/674

if (!nativeUrl && typeof $fetch == 'function' && typeof Headers == 'function') {
  _export({
    global: true,
    enumerable: true,
    forced: true
  }, {
    fetch: function fetch(input
    /* , init */
    ) {
      var args = [input];
      var init, body, headers;

      if (arguments.length > 1) {
        init = arguments[1];

        if (isObject(init)) {
          body = init.body;

          if (classof(body) === URL_SEARCH_PARAMS) {
            headers = init.headers ? new Headers(init.headers) : new Headers();

            if (!headers.has('content-type')) {
              headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }

            init = objectCreate(init, {
              body: createPropertyDescriptor(0, String(body)),
              headers: createPropertyDescriptor(0, headers)
            });
          }
        }

        args.push(init);
      }

      return $fetch.apply(this, args);
    }
  });
}

var web_urlSearchParams = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};var codeAt = stringMultibyte.codeAt;
var NativeURL = global_1.URL;
var URLSearchParams$1 = web_urlSearchParams.URLSearchParams;
var getInternalSearchParamsState = web_urlSearchParams.getState;
var setInternalState$6 = internalState.set;
var getInternalURLState = internalState.getterFor('URL');
var floor$5 = Math.floor;
var pow$1 = Math.pow;
var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';
var ALPHA = /[A-Za-z]/;
var ALPHANUMERIC = /[\d+-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^(0x|0X)/;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/; // eslint-disable-next-line no-control-regex

var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/; // eslint-disable-next-line no-control-regex

var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/; // eslint-disable-next-line no-control-regex

var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g; // eslint-disable-next-line no-control-regex

var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;

  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result; // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);

    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }

    url.host = result;
  } else {
    input = stringPunycodeToAscii(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;

  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }

  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];

  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;

    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }

    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }

    numbers.push(number);
  }

  for (index = 0; index < partsLength; index++) {
    number = numbers[index];

    if (index == partsLength - 1) {
      if (number >= pow$1(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }

  ipv4 = numbers.pop();

  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow$1(256, 3 - index);
  }

  return ipv4;
}; // eslint-disable-next-line max-statements


var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var char = function () {
    return input.charAt(pointer);
  };

  if (char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }

  while (char()) {
    if (pieceIndex == 8) return;

    if (char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }

    value = length = 0;

    while (length < 4 && HEX.test(char())) {
      value = value * 16 + parseInt(char(), 16);
      pointer++;
      length++;
    }

    if (char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;

      while (char()) {
        ipv4Piece = null;

        if (numbersSeen > 0) {
          if (char() == '.' && numbersSeen < 4) pointer++;else return;
        }

        if (!DIGIT.test(char())) return;

        while (DIGIT.test(char())) {
          number = parseInt(char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;else if (ipv4Piece == 0) return;else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }

        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }

      if (numbersSeen != 4) return;
      break;
    } else if (char() == ':') {
      pointer++;
      if (!char()) return;
    } else if (char()) return;

    address[pieceIndex++] = value;
  }

  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;

    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;

  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;

  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }

      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }

  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }

  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0; // ipv4

  if (typeof host == 'number') {
    result = [];

    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor$5(host / 256);
    }

    return result.join('.'); // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);

    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;

      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }

    return '[' + result + ']';
  }

  return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = objectAssign({}, C0ControlPercentEncodeSet, {
  ' ': 1,
  '"': 1,
  '<': 1,
  '>': 1,
  '`': 1
});
var pathPercentEncodeSet = objectAssign({}, fragmentPercentEncodeSet, {
  '#': 1,
  '?': 1,
  '{': 1,
  '}': 1
});
var userinfoPercentEncodeSet = objectAssign({}, pathPercentEncodeSet, {
  '/': 1,
  ':': 1,
  ';': 1,
  '=': 1,
  '@': 1,
  '[': 1,
  '\\': 1,
  ']': 1,
  '^': 1,
  '|': 1
});

var percentEncode = function (char, set) {
  var code = codeAt(char, 0);
  return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return has(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0)) && ((second = string.charAt(1)) == ':' || !normalized && second == '|');
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (string.length == 2 || (third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#');
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;

  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
}; // States:


var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {}; // eslint-disable-next-line max-statements

var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, char, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');
  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    char = codePoints[pointer];

    switch (state) {
      case SCHEME_START:
        if (char && ALPHA.test(char)) {
          buffer += char.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;

        break;

      case SCHEME:
        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
          buffer += char.toLowerCase();
        } else if (char == ':') {
          if (stateOverride && (isSpecial(url) != has(specialSchemes, buffer) || buffer == 'file' && (includesCredentials(url) || url.port !== null) || url.scheme == 'file' && !url.host)) return;
          url.scheme = buffer;

          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }

          buffer = '';

          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;

        break;

      case NO_SCHEME:
        if (!base || base.cannotBeABaseURL && char != '#') return INVALID_SCHEME;

        if (base.cannotBeABaseURL && char == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }

        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (char == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        }

        break;

      case PATH_OR_AUTHORITY:
        if (char == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;

        if (char == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (char == '/' || char == '\\' && isSpecial(url)) {
          state = RELATIVE_SLASH;
        } else if (char == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        }

        break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (char == '/' || char == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (char == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        }

        break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (char != '/' && char != '\\') {
          state = AUTHORITY;
          continue;
        }

        break;

      case AUTHORITY:
        if (char == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);

          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];

            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }

            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;else url.username += encodedCodePoints;
          }

          buffer = '';
        } else if (char == EOF || char == '/' || char == '?' || char == '#' || char == '\\' && isSpecial(url)) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += char;

        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (char == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (char == EOF || char == '/' || char == '?' || char == '#' || char == '\\' && isSpecial(url)) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (char == '[') seenBracket = true;else if (char == ']') seenBracket = false;
          buffer += char;
        }

        break;

      case PORT:
        if (DIGIT.test(char)) {
          buffer += char;
        } else if (char == EOF || char == '/' || char == '?' || char == '#' || char == '\\' && isSpecial(url) || stateOverride) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = isSpecial(url) && port === specialSchemes[url.scheme] ? null : port;
            buffer = '';
          }

          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;

        break;

      case FILE:
        url.scheme = 'file';
        if (char == '/' || char == '\\') state = FILE_SLASH;else if (base && base.scheme == 'file') {
          if (char == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }

            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        }
        break;

      case FILE_SLASH:
        if (char == '/' || char == '\\') {
          state = FILE_HOST;
          break;
        }

        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);else url.host = base.host;
        }

        state = PATH;
        continue;

      case FILE_HOST:
        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          }

          continue;
        } else buffer += char;

        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (char != '/' && char != '\\') continue;
        } else if (!stateOverride && char == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          state = PATH;
          if (char != '/') continue;
        }

        break;

      case PATH:
        if (char == EOF || char == '/' || char == '\\' && isSpecial(url) || !stateOverride && (char == '?' || char == '#')) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);

            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }

            url.path.push(buffer);
          }

          buffer = '';

          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }

          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(char, pathPercentEncodeSet);
        }

        break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (char == '?') {
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
        }

        break;

      case QUERY:
        if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          if (char == "'" && isSpecial(url)) url.query += '%27';else if (char == '#') url.query += '%23';else url.query += percentEncode(char, C0ControlPercentEncodeSet);
        }

        break;

      case FRAGMENT:
        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
}; // `URL` constructor
// https://url.spec.whatwg.org/#url-class


var URLConstructor = function URL(url
/* , base */
) {
  var that = anInstance(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = String(url);
  var state = setInternalState$6(that, {
    type: 'URL'
  });
  var baseState, failure;

  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);else {
      failure = parseURL(baseState = {}, String(base));
      if (failure) throw TypeError(failure);
    }
  }

  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams$1();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);

  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };

  if (!descriptors) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';

  if (host !== null) {
    output += '//';

    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }

    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';

  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URL(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? '' : port === null ? serializeHost(host) : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return {
    get: getter,
    set: setter,
    configurable: true,
    enumerable: true
  };
};

if (descriptors) {
  objectDefineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = String(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, String(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';

      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';

      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = String(port);
      if (port == '') url.port = null;else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, pathname + '', PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = String(search);

      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }

      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = String(hash);

      if (hash == '') {
        url.fragment = null;
        return;
      }

      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
} // `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson


redefine(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, {
  enumerable: true
}); // `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior

redefine(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, {
  enumerable: true
});

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL; // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars

  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  }); // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars

  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag(URLConstructor, 'URL');
_export({
  global: true,
  forced: !nativeUrl,
  sham: !descriptors
}, {
  URL: URLConstructor
});function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, t) {
  for (var i = 0; i < t.length; i++) {
    var n = t[i];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}

function _createClass(e, t, i) {
  return t && _defineProperties(e.prototype, t), i && _defineProperties(e, i), e;
}

function _defineProperty$1(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}

function ownKeys$2(e, t) {
  var i = Object.keys(e);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), i.push.apply(i, n);
  }

  return i;
}

function _objectSpread2$1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ownKeys$2(Object(i), !0).forEach(function (t) {
      _defineProperty$1(e, t, i[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ownKeys$2(Object(i)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
    });
  }

  return e;
}

function _objectWithoutPropertiesLoose(e, t) {
  if (null == e) return {};
  var i,
      n,
      s = {},
      a = Object.keys(e);

  for (n = 0; n < a.length; n++) {
    i = a[n], t.indexOf(i) >= 0 || (s[i] = e[i]);
  }

  return s;
}

function _objectWithoutProperties(e, t) {
  if (null == e) return {};

  var i,
      n,
      s = _objectWithoutPropertiesLoose(e, t);

  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);

    for (n = 0; n < a.length; n++) {
      i = a[n], t.indexOf(i) >= 0 || Object.prototype.propertyIsEnumerable.call(e, i) && (s[i] = e[i]);
    }
  }

  return s;
}

function _slicedToArray(e, t) {
  return _arrayWithHoles(e) || _iterableToArrayLimit(e, t) || _unsupportedIterableToArray(e, t) || _nonIterableRest();
}

function _toConsumableArray(e) {
  return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread();
}

function _arrayWithoutHoles(e) {
  if (Array.isArray(e)) return _arrayLikeToArray(e);
}

function _arrayWithHoles(e) {
  if (Array.isArray(e)) return e;
}

function _iterableToArray(e) {
  if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
}

function _iterableToArrayLimit(e, t) {
  if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
    var i = [],
        n = !0,
        s = !1,
        a = void 0;

    try {
      for (var r, o = e[Symbol.iterator](); !(n = (r = o.next()).done) && (i.push(r.value), !t || i.length !== t); n = !0) {
        ;
      }
    } catch (e) {
      s = !0, a = e;
    } finally {
      try {
        n || null == o.return || o.return();
      } finally {
        if (s) throw a;
      }
    }

    return i;
  }
}

function _unsupportedIterableToArray(e, t) {
  if (e) {
    if ("string" == typeof e) return _arrayLikeToArray(e, t);
    var i = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === i && e.constructor && (i = e.constructor.name), "Map" === i || "Set" === i ? Array.from(e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? _arrayLikeToArray(e, t) : void 0;
  }
}

function _arrayLikeToArray(e, t) {
  (null == t || t > e.length) && (t = e.length);

  for (var i = 0, n = new Array(t); i < t; i++) {
    n[i] = e[i];
  }

  return n;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _classCallCheck$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties$1(e, t) {
  for (var i = 0; i < t.length; i++) {
    var n = t[i];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}

function _createClass$1(e, t, i) {
  return t && _defineProperties$1(e.prototype, t), i && _defineProperties$1(e, i), e;
}

function _defineProperty$1$1(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}

function ownKeys$1$1(e, t) {
  var i = Object.keys(e);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), i.push.apply(i, n);
  }

  return i;
}

function _objectSpread2$1$1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ownKeys$1$1(Object(i), !0).forEach(function (t) {
      _defineProperty$1$1(e, t, i[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ownKeys$1$1(Object(i)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
    });
  }

  return e;
}

var defaults = {
  addCSS: !0,
  thumbWidth: 15,
  watch: !0
};

function matches(e, t) {
  return function () {
    return Array.from(document.querySelectorAll(t)).includes(this);
  }.call(e, t);
}

function trigger(e, t) {
  if (e && t) {
    var i = new Event(t, {
      bubbles: !0
    });
    e.dispatchEvent(i);
  }
}

var getConstructor = function getConstructor(e) {
  return null != e ? e.constructor : null;
},
    instanceOf = function instanceOf(e, t) {
  return !!(e && t && e instanceof t);
},
    isNullOrUndefined = function isNullOrUndefined(e) {
  return null == e;
},
    isObject$1 = function isObject(e) {
  return getConstructor(e) === Object;
},
    isNumber = function isNumber(e) {
  return getConstructor(e) === Number && !Number.isNaN(e);
},
    isString = function isString(e) {
  return getConstructor(e) === String;
},
    isBoolean = function isBoolean(e) {
  return getConstructor(e) === Boolean;
},
    isFunction = function isFunction(e) {
  return getConstructor(e) === Function;
},
    isArray$1 = function isArray(e) {
  return Array.isArray(e);
},
    isNodeList = function isNodeList(e) {
  return instanceOf(e, NodeList);
},
    isElement = function isElement(e) {
  return instanceOf(e, Element);
},
    isEvent = function isEvent(e) {
  return instanceOf(e, Event);
},
    isEmpty = function isEmpty(e) {
  return isNullOrUndefined(e) || (isString(e) || isArray$1(e) || isNodeList(e)) && !e.length || isObject$1(e) && !Object.keys(e).length;
},
    is = {
  nullOrUndefined: isNullOrUndefined,
  object: isObject$1,
  number: isNumber,
  string: isString,
  boolean: isBoolean,
  function: isFunction,
  array: isArray$1,
  nodeList: isNodeList,
  element: isElement,
  event: isEvent,
  empty: isEmpty
};

function getDecimalPlaces(e) {
  var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
}

function round(e, t) {
  if (1 > t) {
    var i = getDecimalPlaces(t);
    return parseFloat(e.toFixed(i));
  }

  return Math.round(e / t) * t;
}

var RangeTouch = function () {
  function e(t, i) {
    _classCallCheck$1(this, e), is.element(t) ? this.element = t : is.string(t) && (this.element = document.querySelector(t)), is.element(this.element) && is.empty(this.element.rangeTouch) && (this.config = _objectSpread2$1$1({}, defaults, {}, i), this.init());
  }

  return _createClass$1(e, [{
    key: "init",
    value: function value() {
      e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this);
    }
  }, {
    key: "destroy",
    value: function value() {
      e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null);
    }
  }, {
    key: "listeners",
    value: function value(e) {
      var t = this,
          i = e ? "addEventListener" : "removeEventListener";
      ["touchstart", "touchmove", "touchend"].forEach(function (e) {
        t.element[i](e, function (e) {
          return t.set(e);
        }, !1);
      });
    }
  }, {
    key: "get",
    value: function value(t) {
      if (!e.enabled || !is.event(t)) return null;
      var i,
          n = t.target,
          s = t.changedTouches[0],
          a = parseFloat(n.getAttribute("min")) || 0,
          r = parseFloat(n.getAttribute("max")) || 100,
          o = parseFloat(n.getAttribute("step")) || 1,
          l = n.getBoundingClientRect(),
          c = 100 / l.width * (this.config.thumbWidth / 2) / 100;
      return 0 > (i = 100 / l.width * (s.clientX - l.left)) ? i = 0 : 100 < i && (i = 100), 50 > i ? i -= (100 - 2 * i) * c : 50 < i && (i += 2 * (i - 50) * c), a + round(i / 100 * (r - a), o);
    }
  }, {
    key: "set",
    value: function value(t) {
      e.enabled && is.event(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), trigger(t.target, "touchend" === t.type ? "change" : "input"));
    }
  }], [{
    key: "setup",
    value: function value(t) {
      var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          n = null;
      if (is.empty(t) || is.string(t) ? n = Array.from(document.querySelectorAll(is.string(t) ? t : 'input[type="range"]')) : is.element(t) ? n = [t] : is.nodeList(t) ? n = Array.from(t) : is.array(t) && (n = t.filter(is.element)), is.empty(n)) return null;

      var s = _objectSpread2$1$1({}, defaults, {}, i);

      if (is.string(t) && s.watch) {
        var a = new MutationObserver(function (i) {
          Array.from(i).forEach(function (i) {
            Array.from(i.addedNodes).forEach(function (i) {
              is.element(i) && matches(i, t) && new e(i, s);
            });
          });
        });
        a.observe(document.body, {
          childList: !0,
          subtree: !0
        });
      }

      return n.map(function (t) {
        return new e(t, i);
      });
    }
  }, {
    key: "enabled",
    get: function get() {
      return "ontouchstart" in document.documentElement;
    }
  }]), e;
}(),
    getConstructor$1 = function getConstructor$1(e) {
  return null != e ? e.constructor : null;
},
    instanceOf$1 = function instanceOf$1(e, t) {
  return Boolean(e && t && e instanceof t);
},
    isNullOrUndefined$1 = function isNullOrUndefined$1(e) {
  return null == e;
},
    isObject$1$1 = function isObject$1(e) {
  return getConstructor$1(e) === Object;
},
    isNumber$1 = function isNumber$1(e) {
  return getConstructor$1(e) === Number && !Number.isNaN(e);
},
    isString$1 = function isString$1(e) {
  return getConstructor$1(e) === String;
},
    isBoolean$1 = function isBoolean$1(e) {
  return getConstructor$1(e) === Boolean;
},
    isFunction$1 = function isFunction$1(e) {
  return getConstructor$1(e) === Function;
},
    isArray$1$1 = function isArray$1(e) {
  return Array.isArray(e);
},
    isWeakMap = function isWeakMap(e) {
  return instanceOf$1(e, WeakMap);
},
    isNodeList$1 = function isNodeList$1(e) {
  return instanceOf$1(e, NodeList);
},
    isElement$1 = function isElement$1(e) {
  return instanceOf$1(e, Element);
},
    isTextNode = function isTextNode(e) {
  return getConstructor$1(e) === Text;
},
    isEvent$1 = function isEvent$1(e) {
  return instanceOf$1(e, Event);
},
    isKeyboardEvent = function isKeyboardEvent(e) {
  return instanceOf$1(e, KeyboardEvent);
},
    isCue = function isCue(e) {
  return instanceOf$1(e, window.TextTrackCue) || instanceOf$1(e, window.VTTCue);
},
    isTrack = function isTrack(e) {
  return instanceOf$1(e, TextTrack) || !isNullOrUndefined$1(e) && isString$1(e.kind);
},
    isPromise = function isPromise(e) {
  return instanceOf$1(e, Promise) && isFunction$1(e.then);
},
    isEmpty$1 = function isEmpty$1(e) {
  return isNullOrUndefined$1(e) || (isString$1(e) || isArray$1$1(e) || isNodeList$1(e)) && !e.length || isObject$1$1(e) && !Object.keys(e).length;
},
    isUrl = function isUrl(e) {
  if (instanceOf$1(e, window.URL)) return !0;
  if (!isString$1(e)) return !1;
  var t = e;
  e.startsWith("http://") && e.startsWith("https://") || (t = "http://".concat(e));

  try {
    return !isEmpty$1(new URL(t).hostname);
  } catch (e) {
    return !1;
  }
},
    is$1 = {
  nullOrUndefined: isNullOrUndefined$1,
  object: isObject$1$1,
  number: isNumber$1,
  string: isString$1,
  boolean: isBoolean$1,
  function: isFunction$1,
  array: isArray$1$1,
  weakMap: isWeakMap,
  nodeList: isNodeList$1,
  element: isElement$1,
  textNode: isTextNode,
  event: isEvent$1,
  keyboardEvent: isKeyboardEvent,
  cue: isCue,
  track: isTrack,
  promise: isPromise,
  url: isUrl,
  empty: isEmpty$1
},
    transitionEndEvent = function () {
  var e = document.createElement("span"),
      t = {
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd otransitionend",
    transition: "transitionend"
  },
      i = Object.keys(t).find(function (t) {
    return void 0 !== e.style[t];
  });
  return !!is$1.string(i) && t[i];
}();

function repaint(e, t) {
  setTimeout(function () {
    try {
      e.hidden = !0, e.offsetHeight, e.hidden = !1;
    } catch (e) {}
  }, t);
}

var browser = {
  isIE:
  /* @cc_on!@ */
  !!document.documentMode,
  isEdge: window.navigator.userAgent.includes("Edge"),
  isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
  isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
  isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
};

function cloneDeep(e) {
  return JSON.parse(JSON.stringify(e));
}

function getDeep(e, t) {
  return t.split(".").reduce(function (e, t) {
    return e && e[t];
  }, e);
}

function extend() {
  for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) {
    i[n - 1] = arguments[n];
  }

  if (!i.length) return e;
  var s = i.shift();
  return is$1.object(s) ? (Object.keys(s).forEach(function (t) {
    is$1.object(s[t]) ? (Object.keys(e).includes(t) || Object.assign(e, _defineProperty$1({}, t, {})), extend(e[t], s[t])) : Object.assign(e, _defineProperty$1({}, t, s[t]));
  }), extend.apply(void 0, [e].concat(i))) : e;
}

function wrap$1(e, t) {
  var i = e.length ? e : [e];
  Array.from(i).reverse().forEach(function (e, i) {
    var n = i > 0 ? t.cloneNode(!0) : t,
        s = e.parentNode,
        a = e.nextSibling;
    n.appendChild(e), a ? s.insertBefore(n, a) : s.appendChild(n);
  });
}

function setAttributes(e, t) {
  is$1.element(e) && !is$1.empty(t) && Object.entries(t).filter(function (e) {
    var t = _slicedToArray(e, 2)[1];

    return !is$1.nullOrUndefined(t);
  }).forEach(function (t) {
    var i = _slicedToArray(t, 2),
        n = i[0],
        s = i[1];

    return e.setAttribute(n, s);
  });
}

function createElement(e, t, i) {
  var n = document.createElement(e);
  return is$1.object(t) && setAttributes(n, t), is$1.string(i) && (n.innerText = i), n;
}

function insertAfter(e, t) {
  is$1.element(e) && is$1.element(t) && t.parentNode.insertBefore(e, t.nextSibling);
}

function insertElement(e, t, i, n) {
  is$1.element(t) && t.appendChild(createElement(e, i, n));
}

function removeElement(e) {
  is$1.nodeList(e) || is$1.array(e) ? Array.from(e).forEach(removeElement) : is$1.element(e) && is$1.element(e.parentNode) && e.parentNode.removeChild(e);
}

function emptyElement(e) {
  if (is$1.element(e)) for (var t = e.childNodes.length; t > 0;) {
    e.removeChild(e.lastChild), t -= 1;
  }
}

function replaceElement(e, t) {
  return is$1.element(t) && is$1.element(t.parentNode) && is$1.element(e) ? (t.parentNode.replaceChild(e, t), e) : null;
}

function getAttributesFromSelector(e, t) {
  if (!is$1.string(e) || is$1.empty(e)) return {};
  var i = {},
      n = extend({}, t);
  return e.split(",").forEach(function (e) {
    var t = e.trim(),
        s = t.replace(".", ""),
        a = t.replace(/[[\]]/g, "").split("="),
        r = _slicedToArray(a, 1)[0],
        o = a.length > 1 ? a[1].replace(/["']/g, "") : "";

    switch (t.charAt(0)) {
      case ".":
        is$1.string(n.class) ? i.class = "".concat(n.class, " ").concat(s) : i.class = s;
        break;

      case "#":
        i.id = t.replace("#", "");
        break;

      case "[":
        i[r] = o;
    }
  }), extend(n, i);
}

function toggleHidden(e, t) {
  if (is$1.element(e)) {
    var i = t;
    is$1.boolean(i) || (i = !e.hidden), e.hidden = i;
  }
}

function toggleClass(e, t, i) {
  if (is$1.nodeList(e)) return Array.from(e).map(function (e) {
    return toggleClass(e, t, i);
  });

  if (is$1.element(e)) {
    var n = "toggle";
    return void 0 !== i && (n = i ? "add" : "remove"), e.classList[n](t), e.classList.contains(t);
  }

  return !1;
}

function hasClass(e, t) {
  return is$1.element(e) && e.classList.contains(t);
}

function matches$1(e, t) {
  var i = Element.prototype;
  return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function () {
    return Array.from(document.querySelectorAll(t)).includes(this);
  }).call(e, t);
}

function closest(e, t) {
  return (Element.prototype.closest || function () {
    var e = this;

    do {
      if (matches$1.matches(e, t)) return e;
      e = e.parentElement || e.parentNode;
    } while (null !== e && 1 === e.nodeType);

    return null;
  }).call(e, t);
}

function getElements(e) {
  return this.elements.container.querySelectorAll(e);
}

function getElement(e) {
  return this.elements.container.querySelector(e);
}

function setFocus() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
      t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  is$1.element(e) && (e.focus({
    preventScroll: !0
  }), t && toggleClass(e, this.config.classNames.tabFocus));
}

var defaultCodecs = {
  "audio/ogg": "vorbis",
  "audio/wav": "1",
  "video/webm": "vp8, vorbis",
  "video/mp4": "avc1.42E01E, mp4a.40.2",
  "video/ogg": "theora"
},
    support = {
  audio: "canPlayType" in document.createElement("audio"),
  video: "canPlayType" in document.createElement("video"),
  check: function check(e, t, i) {
    var n = browser.isIPhone && i && support.playsinline,
        s = support[e] || "html5" !== t;
    return {
      api: s,
      ui: s && support.rangeInput && ("video" !== e || !browser.isIPhone || n)
    };
  },
  pip: !(browser.isIPhone || !is$1.function(createElement("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || createElement("video").disablePictureInPicture)),
  airplay: is$1.function(window.WebKitPlaybackTargetAvailabilityEvent),
  playsinline: "playsInline" in document.createElement("video"),
  mime: function mime(e) {
    if (is$1.empty(e)) return !1;

    var t = _slicedToArray(e.split("/"), 1)[0],
        i = e;

    if (!this.isHTML5 || t !== this.type) return !1;
    Object.keys(defaultCodecs).includes(i) && (i += '; codecs="'.concat(defaultCodecs[e], '"'));

    try {
      return Boolean(i && this.media.canPlayType(i).replace(/no/, ""));
    } catch (e) {
      return !1;
    }
  },
  textTracks: "textTracks" in document.createElement("video"),
  rangeInput: function () {
    var e = document.createElement("input");
    return e.type = "range", "range" === e.type;
  }(),
  touch: "ontouchstart" in document.documentElement,
  transitions: !1 !== transitionEndEvent,
  reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
},
    supportsPassiveListeners = function () {
  var e = !1;

  try {
    var t = Object.defineProperty({}, "passive", {
      get: function get() {
        return e = !0, null;
      }
    });
    window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
  } catch (e) {}

  return e;
}();

function toggleListener(e, t, i) {
  var n = this,
      s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
      a = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
      r = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];

  if (e && "addEventListener" in e && !is$1.empty(t) && is$1.function(i)) {
    var o = t.split(" "),
        l = r;
    supportsPassiveListeners && (l = {
      passive: a,
      capture: r
    }), o.forEach(function (t) {
      n && n.eventListeners && s && n.eventListeners.push({
        element: e,
        type: t,
        callback: i,
        options: l
      }), e[s ? "addEventListener" : "removeEventListener"](t, i, l);
    });
  }
}

function on(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
      i = arguments.length > 2 ? arguments[2] : void 0,
      n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
      s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
  toggleListener.call(this, e, t, i, !0, n, s);
}

function off(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
      i = arguments.length > 2 ? arguments[2] : void 0,
      n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
      s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
  toggleListener.call(this, e, t, i, !1, n, s);
}

function once(e) {
  var t = this,
      i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
      n = arguments.length > 2 ? arguments[2] : void 0,
      s = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
      a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
      r = function r() {
    off(e, i, r, s, a);

    for (var o = arguments.length, l = new Array(o), c = 0; c < o; c++) {
      l[c] = arguments[c];
    }

    n.apply(t, l);
  };

  toggleListener.call(this, e, i, r, !0, s, a);
}

function triggerEvent(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
      i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};

  if (is$1.element(e) && !is$1.empty(t)) {
    var s = new CustomEvent(t, {
      bubbles: i,
      detail: _objectSpread2$1(_objectSpread2$1({}, n), {}, {
        plyr: this
      })
    });
    e.dispatchEvent(s);
  }
}

function unbindListeners() {
  this && this.eventListeners && (this.eventListeners.forEach(function (e) {
    var t = e.element,
        i = e.type,
        n = e.callback,
        s = e.options;
    t.removeEventListener(i, n, s);
  }), this.eventListeners = []);
}

function ready() {
  var e = this;
  return new Promise(function (t) {
    return e.ready ? setTimeout(t, 0) : on.call(e, e.elements.container, "ready", t);
  }).then(function () {});
}

function silencePromise(e) {
  is$1.promise(e) && e.then(null, function () {});
}

function validateRatio(e) {
  return !!(is$1.array(e) || is$1.string(e) && e.includes(":")) && (is$1.array(e) ? e : e.split(":")).map(Number).every(is$1.number);
}

function reduceAspectRatio(e) {
  if (!is$1.array(e) || !e.every(is$1.number)) return null;

  var t = _slicedToArray(e, 2),
      i = t[0],
      n = t[1],
      s = function e(t, i) {
    return 0 === i ? t : e(i, t % i);
  }(i, n);

  return [i / s, n / s];
}

function getAspectRatio(e) {
  var t = function t(e) {
    return validateRatio(e) ? e.split(":").map(Number) : null;
  },
      i = t(e);

  if (null === i && (i = t(this.config.ratio)), null === i && !is$1.empty(this.embed) && is$1.array(this.embed.ratio) && (i = this.embed.ratio), null === i && this.isHTML5) {
    var n = this.media;
    i = reduceAspectRatio([n.videoWidth, n.videoHeight]);
  }

  return i;
}

function setAspectRatio(e) {
  if (!this.isVideo) return {};

  var t = this.elements.wrapper,
      i = getAspectRatio.call(this, e),
      n = _slicedToArray(is$1.array(i) ? i : [0, 0], 2),
      s = 100 / n[0] * n[1];

  if (t.style.paddingBottom = "".concat(s, "%"), this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
    var a = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
        r = (a - s) / (a / 50);
    this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = "translateY(-".concat(r, "%)");
  } else this.isHTML5 && t.classList.toggle(this.config.classNames.videoFixedRatio, null !== i);

  return {
    padding: s,
    ratio: i
  };
}

var html5 = {
  getSources: function getSources() {
    var e = this;
    return this.isHTML5 ? Array.from(this.media.querySelectorAll("source")).filter(function (t) {
      var i = t.getAttribute("type");
      return !!is$1.empty(i) || support.mime.call(e, i);
    }) : [];
  },
  getQualityOptions: function getQualityOptions() {
    return this.config.quality.forced ? this.config.quality.options : html5.getSources.call(this).map(function (e) {
      return Number(e.getAttribute("size"));
    }).filter(Boolean);
  },
  setup: function setup() {
    if (this.isHTML5) {
      var e = this;
      e.options.speed = e.config.speed.options, is$1.empty(this.config.ratio) || setAspectRatio.call(e), Object.defineProperty(e.media, "quality", {
        get: function get() {
          var t = html5.getSources.call(e).find(function (t) {
            return t.getAttribute("src") === e.source;
          });
          return t && Number(t.getAttribute("size"));
        },
        set: function set(t) {
          if (e.quality !== t) {
            if (e.config.quality.forced && is$1.function(e.config.quality.onChange)) e.config.quality.onChange(t);else {
              var i = html5.getSources.call(e).find(function (e) {
                return Number(e.getAttribute("size")) === t;
              });
              if (!i) return;
              var n = e.media,
                  s = n.currentTime,
                  a = n.paused,
                  r = n.preload,
                  o = n.readyState,
                  l = n.playbackRate;
              e.media.src = i.getAttribute("src"), ("none" !== r || o) && (e.once("loadedmetadata", function () {
                e.speed = l, e.currentTime = s, a || silencePromise(e.play());
              }), e.media.load());
            }
            triggerEvent.call(e, e.media, "qualitychange", !1, {
              quality: t
            });
          }
        }
      });
    }
  },
  cancelRequests: function cancelRequests() {
    this.isHTML5 && (removeElement(html5.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"));
  }
};

function dedupe(e) {
  return is$1.array(e) ? e.filter(function (t, i) {
    return e.indexOf(t) === i;
  }) : e;
}

function closest$1(e, t) {
  return is$1.array(e) && e.length ? e.reduce(function (e, i) {
    return Math.abs(i - t) < Math.abs(e - t) ? i : e;
  }) : null;
}

function generateId(e) {
  return "".concat(e, "-").concat(Math.floor(1e4 * Math.random()));
}

function format(e) {
  for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) {
    i[n - 1] = arguments[n];
  }

  return is$1.empty(e) ? e : e.toString().replace(/{(\d+)}/g, function (e, t) {
    return i[t].toString();
  });
}

function getPercentage(e, t) {
  return 0 === e || 0 === t || Number.isNaN(e) || Number.isNaN(t) ? 0 : (e / t * 100).toFixed(2);
}

var replaceAll = function replaceAll() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
      t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
      i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
  return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString());
},
    toTitleCase = function toTitleCase() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
  return e.toString().replace(/\w\S*/g, function (e) {
    return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
  });
};

function toPascalCase() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
      t = e.toString();
  return t = replaceAll(t, "-", " "), t = replaceAll(t, "_", " "), t = toTitleCase(t), replaceAll(t, " ", "");
}

function toCamelCase() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
      t = e.toString();
  return (t = toPascalCase(t)).charAt(0).toLowerCase() + t.slice(1);
}

function stripHTML(e) {
  var t = document.createDocumentFragment(),
      i = document.createElement("div");
  return t.appendChild(i), i.innerHTML = e, t.firstChild.innerText;
}

function getHTML(e) {
  var t = document.createElement("div");
  return t.appendChild(e), t.innerHTML;
}

var resources = {
  pip: "PIP",
  airplay: "AirPlay",
  html5: "HTML5",
  vimeo: "Vimeo",
  youtube: "YouTube"
},
    i18n = {
  get: function get() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (is$1.empty(e) || is$1.empty(t)) return "";
    var i = getDeep(t.i18n, e);
    if (is$1.empty(i)) return Object.keys(resources).includes(e) ? resources[e] : "";
    var n = {
      "{seektime}": t.seekTime,
      "{title}": t.title
    };
    return Object.entries(n).forEach(function (e) {
      var t = _slicedToArray(e, 2),
          n = t[0],
          s = t[1];

      i = replaceAll(i, n, s);
    }), i;
  }
},
    Storage = function () {
  function e(t) {
    _classCallCheck(this, e), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key;
  }

  return _createClass(e, [{
    key: "get",
    value: function value(t) {
      if (!e.supported || !this.enabled) return null;
      var i = window.localStorage.getItem(this.key);
      if (is$1.empty(i)) return null;
      var n = JSON.parse(i);
      return is$1.string(t) && t.length ? n[t] : n;
    }
  }, {
    key: "set",
    value: function value(t) {
      if (e.supported && this.enabled && is$1.object(t)) {
        var i = this.get();
        is$1.empty(i) && (i = {}), extend(i, t), window.localStorage.setItem(this.key, JSON.stringify(i));
      }
    }
  }], [{
    key: "supported",
    get: function get() {
      try {
        if (!("localStorage" in window)) return !1;
        var e = "___test";
        return window.localStorage.setItem(e, e), window.localStorage.removeItem(e), !0;
      } catch (e) {
        return !1;
      }
    }
  }]), e;
}();

function fetch(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text";
  return new Promise(function (i, n) {
    try {
      var s = new XMLHttpRequest();
      if (!("withCredentials" in s)) return;
      s.addEventListener("load", function () {
        if ("text" === t) try {
          i(JSON.parse(s.responseText));
        } catch (e) {
          i(s.responseText);
        } else i(s.response);
      }), s.addEventListener("error", function () {
        throw new Error(s.status);
      }), s.open("GET", e, !0), s.responseType = t, s.send();
    } catch (e) {
      n(e);
    }
  });
}

function loadSprite(e, t) {
  if (is$1.string(e)) {
    var i = "cache",
        n = is$1.string(t),
        s = function s() {
      return null !== document.getElementById(t);
    },
        a = function a(e, t) {
      e.innerHTML = t, n && s() || document.body.insertAdjacentElement("afterbegin", e);
    };

    if (!n || !s()) {
      var r = Storage.supported,
          o = document.createElement("div");

      if (o.setAttribute("hidden", ""), n && o.setAttribute("id", t), r) {
        var l = window.localStorage.getItem("".concat(i, "-").concat(t));

        if (null !== l) {
          var c = JSON.parse(l);
          a(o, c.content);
        }
      }

      fetch(e).then(function (e) {
        is$1.empty(e) || (r && window.localStorage.setItem("".concat(i, "-").concat(t), JSON.stringify({
          content: e
        })), a(o, e));
      }).catch(function () {});
    }
  }
}

var getHours = function getHours(e) {
  return Math.trunc(e / 60 / 60 % 60, 10);
},
    getMinutes = function getMinutes(e) {
  return Math.trunc(e / 60 % 60, 10);
},
    getSeconds = function getSeconds(e) {
  return Math.trunc(e % 60, 10);
};

function _formatTime() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
      t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
  if (!is$1.number(e)) return _formatTime(void 0, t, i);

  var n = function n(e) {
    return "0".concat(e).slice(-2);
  },
      s = getHours(e),
      a = getMinutes(e),
      r = getSeconds(e);

  return s = t || s > 0 ? "".concat(s, ":") : "", "".concat(i && e > 0 ? "-" : "").concat(s).concat(n(a), ":").concat(n(r));
}

var controls = {
  getIconUrl: function getIconUrl() {
    var e = new URL(this.config.iconUrl, window.location).host !== window.location.host || browser.isIE && !window.svg4everybody;
    return {
      url: this.config.iconUrl,
      cors: e
    };
  },
  findElements: function findElements() {
    try {
      return this.elements.controls = getElement.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
        play: getElements.call(this, this.config.selectors.buttons.play),
        pause: getElement.call(this, this.config.selectors.buttons.pause),
        restart: getElement.call(this, this.config.selectors.buttons.restart),
        rewind: getElement.call(this, this.config.selectors.buttons.rewind),
        fastForward: getElement.call(this, this.config.selectors.buttons.fastForward),
        mute: getElement.call(this, this.config.selectors.buttons.mute),
        pip: getElement.call(this, this.config.selectors.buttons.pip),
        airplay: getElement.call(this, this.config.selectors.buttons.airplay),
        settings: getElement.call(this, this.config.selectors.buttons.settings),
        captions: getElement.call(this, this.config.selectors.buttons.captions),
        fullscreen: getElement.call(this, this.config.selectors.buttons.fullscreen)
      }, this.elements.progress = getElement.call(this, this.config.selectors.progress), this.elements.inputs = {
        seek: getElement.call(this, this.config.selectors.inputs.seek),
        volume: getElement.call(this, this.config.selectors.inputs.volume)
      }, this.elements.display = {
        buffer: getElement.call(this, this.config.selectors.display.buffer),
        currentTime: getElement.call(this, this.config.selectors.display.currentTime),
        duration: getElement.call(this, this.config.selectors.display.duration)
      }, is$1.element(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip))), !0;
    } catch (e) {
      return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1;
    }
  },
  createIcon: function createIcon(e, t) {
    var i = "http://www.w3.org/2000/svg",
        n = controls.getIconUrl.call(this),
        s = "".concat(n.cors ? "" : n.url, "#").concat(this.config.iconPrefix),
        a = document.createElementNS(i, "svg");
    setAttributes(a, extend(t, {
      "aria-hidden": "true",
      focusable: "false"
    }));
    var r = document.createElementNS(i, "use"),
        o = "".concat(s, "-").concat(e);
    return "href" in r && r.setAttributeNS("http://www.w3.org/1999/xlink", "href", o), r.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", o), a.appendChild(r), a;
  },
  createLabel: function createLabel(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        i = i18n.get(e, this.config),
        n = _objectSpread2$1(_objectSpread2$1({}, t), {}, {
      class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
    });

    return createElement("span", n, i);
  },
  createBadge: function createBadge(e) {
    if (is$1.empty(e)) return null;
    var t = createElement("span", {
      class: this.config.classNames.menu.value
    });
    return t.appendChild(createElement("span", {
      class: this.config.classNames.menu.badge
    }, e)), t;
  },
  createButton: function createButton(e, t) {
    var i = this,
        n = extend({}, t),
        s = toCamelCase(e),
        a = {
      element: "button",
      toggle: !1,
      label: null,
      icon: null,
      labelPressed: null,
      iconPressed: null
    };

    switch (["element", "icon", "label"].forEach(function (e) {
      Object.keys(n).includes(e) && (a[e] = n[e], delete n[e]);
    }), "button" !== a.element || Object.keys(n).includes("type") || (n.type = "button"), Object.keys(n).includes("class") ? n.class.split(" ").some(function (e) {
      return e === i.config.classNames.control;
    }) || extend(n, {
      class: "".concat(n.class, " ").concat(this.config.classNames.control)
    }) : n.class = this.config.classNames.control, e) {
      case "play":
        a.toggle = !0, a.label = "play", a.labelPressed = "pause", a.icon = "play", a.iconPressed = "pause";
        break;

      case "mute":
        a.toggle = !0, a.label = "mute", a.labelPressed = "unmute", a.icon = "volume", a.iconPressed = "muted";
        break;

      case "captions":
        a.toggle = !0, a.label = "enableCaptions", a.labelPressed = "disableCaptions", a.icon = "captions-off", a.iconPressed = "captions-on";
        break;

      case "fullscreen":
        a.toggle = !0, a.label = "enterFullscreen", a.labelPressed = "exitFullscreen", a.icon = "enter-fullscreen", a.iconPressed = "exit-fullscreen";
        break;

      case "play-large":
        n.class += " ".concat(this.config.classNames.control, "--overlaid"), s = "play", a.label = "play", a.icon = "play";
        break;

      default:
        is$1.empty(a.label) && (a.label = s), is$1.empty(a.icon) && (a.icon = e);
    }

    var r = createElement(a.element);
    return a.toggle ? (r.appendChild(controls.createIcon.call(this, a.iconPressed, {
      class: "icon--pressed"
    })), r.appendChild(controls.createIcon.call(this, a.icon, {
      class: "icon--not-pressed"
    })), r.appendChild(controls.createLabel.call(this, a.labelPressed, {
      class: "label--pressed"
    })), r.appendChild(controls.createLabel.call(this, a.label, {
      class: "label--not-pressed"
    }))) : (r.appendChild(controls.createIcon.call(this, a.icon)), r.appendChild(controls.createLabel.call(this, a.label))), extend(n, getAttributesFromSelector(this.config.selectors.buttons[s], n)), setAttributes(r, n), "play" === s ? (is$1.array(this.elements.buttons[s]) || (this.elements.buttons[s] = []), this.elements.buttons[s].push(r)) : this.elements.buttons[s] = r, r;
  },
  createRange: function createRange(e, t) {
    var i = createElement("input", extend(getAttributesFromSelector(this.config.selectors.inputs[e]), {
      type: "range",
      min: 0,
      max: 100,
      step: .01,
      value: 0,
      autocomplete: "off",
      role: "slider",
      "aria-label": i18n.get(e, this.config),
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": 0
    }, t));
    return this.elements.inputs[e] = i, controls.updateRangeFill.call(this, i), RangeTouch.setup(i), i;
  },
  createProgress: function createProgress(e, t) {
    var i = createElement("progress", extend(getAttributesFromSelector(this.config.selectors.display[e]), {
      min: 0,
      max: 100,
      value: 0,
      role: "progressbar",
      "aria-hidden": !0
    }, t));

    if ("volume" !== e) {
      i.appendChild(createElement("span", null, "0"));
      var n = {
        played: "played",
        buffer: "buffered"
      }[e],
          s = n ? i18n.get(n, this.config) : "";
      i.innerText = "% ".concat(s.toLowerCase());
    }

    return this.elements.display[e] = i, i;
  },
  createTime: function createTime(e, t) {
    var i = getAttributesFromSelector(this.config.selectors.display[e], t),
        n = createElement("div", extend(i, {
      class: "".concat(i.class ? i.class : "", " ").concat(this.config.classNames.display.time, " ").trim(),
      "aria-label": i18n.get(e, this.config)
    }), "00:00");
    return this.elements.display[e] = n, n;
  },
  bindMenuItemShortcuts: function bindMenuItemShortcuts(e, t) {
    var i = this;
    on.call(this, e, "keydown keyup", function (n) {
      if ([32, 38, 39, 40].includes(n.which) && (n.preventDefault(), n.stopPropagation(), "keydown" !== n.type)) {
        var s,
            a = matches$1(e, '[role="menuitemradio"]');
        if (!a && [32, 39].includes(n.which)) controls.showMenuPanel.call(i, t, !0);else 32 !== n.which && (40 === n.which || a && 39 === n.which ? (s = e.nextElementSibling, is$1.element(s) || (s = e.parentNode.firstElementChild)) : (s = e.previousElementSibling, is$1.element(s) || (s = e.parentNode.lastElementChild)), setFocus.call(i, s, !0));
      }
    }, !1), on.call(this, e, "keyup", function (e) {
      13 === e.which && controls.focusFirstMenuItem.call(i, null, !0);
    });
  },
  createMenuItem: function createMenuItem(e) {
    var t = this,
        i = e.value,
        n = e.list,
        s = e.type,
        a = e.title,
        r = e.badge,
        o = void 0 === r ? null : r,
        l = e.checked,
        c = void 0 !== l && l,
        u = getAttributesFromSelector(this.config.selectors.inputs[s]),
        d = createElement("button", extend(u, {
      type: "button",
      role: "menuitemradio",
      class: "".concat(this.config.classNames.control, " ").concat(u.class ? u.class : "").trim(),
      "aria-checked": c,
      value: i
    })),
        h = createElement("span");
    h.innerHTML = a, is$1.element(o) && h.appendChild(o), d.appendChild(h), Object.defineProperty(d, "checked", {
      enumerable: !0,
      get: function get() {
        return "true" === d.getAttribute("aria-checked");
      },
      set: function set(e) {
        e && Array.from(d.parentNode.children).filter(function (e) {
          return matches$1(e, '[role="menuitemradio"]');
        }).forEach(function (e) {
          return e.setAttribute("aria-checked", "false");
        }), d.setAttribute("aria-checked", e ? "true" : "false");
      }
    }), this.listeners.bind(d, "click keyup", function (e) {
      if (!is$1.keyboardEvent(e) || 32 === e.which) {
        switch (e.preventDefault(), e.stopPropagation(), d.checked = !0, s) {
          case "language":
            t.currentTrack = Number(i);
            break;

          case "quality":
            t.quality = i;
            break;

          case "speed":
            t.speed = parseFloat(i);
        }

        controls.showMenuPanel.call(t, "home", is$1.keyboardEvent(e));
      }
    }, s, !1), controls.bindMenuItemShortcuts.call(this, d, s), n.appendChild(d);
  },
  formatTime: function formatTime() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
        t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if (!is$1.number(e)) return e;
    var i = getHours(this.duration) > 0;
    return _formatTime(e, i, t);
  },
  updateTimeDisplay: function updateTimeDisplay() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    is$1.element(e) && is$1.number(t) && (e.innerText = controls.formatTime(t, i));
  },
  updateVolume: function updateVolume() {
    this.supported.ui && (is$1.element(this.elements.inputs.volume) && controls.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), is$1.element(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume));
  },
  setRange: function setRange(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
    is$1.element(e) && (e.value = t, controls.updateRangeFill.call(this, e));
  },
  updateProgress: function updateProgress(e) {
    var t = this;

    if (this.supported.ui && is$1.event(e)) {
      var i = 0;
      if (e) switch (e.type) {
        case "timeupdate":
        case "seeking":
        case "seeked":
          i = getPercentage(this.currentTime, this.duration), "timeupdate" === e.type && controls.setRange.call(this, this.elements.inputs.seek, i);
          break;

        case "playing":
        case "progress":
          !function (e, i) {
            var n = is$1.number(i) ? i : 0,
                s = is$1.element(e) ? e : t.elements.display.buffer;

            if (is$1.element(s)) {
              s.value = n;
              var a = s.getElementsByTagName("span")[0];
              is$1.element(a) && (a.childNodes[0].nodeValue = n);
            }
          }(this.elements.display.buffer, 100 * this.buffered);
      }
    }
  },
  updateRangeFill: function updateRangeFill(e) {
    var t = is$1.event(e) ? e.target : e;

    if (is$1.element(t) && "range" === t.getAttribute("type")) {
      if (matches$1(t, this.config.selectors.inputs.seek)) {
        t.setAttribute("aria-valuenow", this.currentTime);
        var i = controls.formatTime(this.currentTime),
            n = controls.formatTime(this.duration),
            s = i18n.get("seekLabel", this.config);
        t.setAttribute("aria-valuetext", s.replace("{currentTime}", i).replace("{duration}", n));
      } else if (matches$1(t, this.config.selectors.inputs.volume)) {
        var a = 100 * t.value;
        t.setAttribute("aria-valuenow", a), t.setAttribute("aria-valuetext", "".concat(a.toFixed(1), "%"));
      } else t.setAttribute("aria-valuenow", t.value);

      browser.isWebkit && t.style.setProperty("--value", "".concat(t.value / t.max * 100, "%"));
    }
  },
  updateSeekTooltip: function updateSeekTooltip(e) {
    var t = this;

    if (this.config.tooltips.seek && is$1.element(this.elements.inputs.seek) && is$1.element(this.elements.display.seekTooltip) && 0 !== this.duration) {
      var i = "".concat(this.config.classNames.tooltip, "--visible"),
          n = function n(e) {
        return toggleClass(t.elements.display.seekTooltip, i, e);
      };

      if (this.touch) n(!1);else {
        var s = 0,
            a = this.elements.progress.getBoundingClientRect();
        if (is$1.event(e)) s = 100 / a.width * (e.pageX - a.left);else {
          if (!hasClass(this.elements.display.seekTooltip, i)) return;
          s = parseFloat(this.elements.display.seekTooltip.style.left, 10);
        }
        s < 0 ? s = 0 : s > 100 && (s = 100), controls.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * s), this.elements.display.seekTooltip.style.left = "".concat(s, "%"), is$1.event(e) && ["mouseenter", "mouseleave"].includes(e.type) && n("mouseenter" === e.type);
      }
    }
  },
  timeUpdate: function timeUpdate(e) {
    var t = !is$1.element(this.elements.display.duration) && this.config.invertTime;
    controls.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || controls.updateProgress.call(this, e);
  },
  durationUpdate: function durationUpdate() {
    if (this.supported.ui && (this.config.invertTime || !this.currentTime)) {
      if (this.duration >= Math.pow(2, 32)) return toggleHidden(this.elements.display.currentTime, !0), void toggleHidden(this.elements.progress, !0);
      is$1.element(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
      var e = is$1.element(this.elements.display.duration);
      !e && this.config.displayDuration && this.paused && controls.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && controls.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), controls.updateSeekTooltip.call(this);
    }
  },
  toggleMenuButton: function toggleMenuButton(e, t) {
    toggleHidden(this.elements.settings.buttons[e], !t);
  },
  updateSetting: function updateSetting(e, t, i) {
    var n = this.elements.settings.panels[e],
        s = null,
        a = t;
    if ("captions" === e) s = this.currentTrack;else {
      if (s = is$1.empty(i) ? this[e] : i, is$1.empty(s) && (s = this.config[e].default), !is$1.empty(this.options[e]) && !this.options[e].includes(s)) return void this.debug.warn("Unsupported value of '".concat(s, "' for ").concat(e));
      if (!this.config[e].options.includes(s)) return void this.debug.warn("Disabled value of '".concat(s, "' for ").concat(e));
    }

    if (is$1.element(a) || (a = n && n.querySelector('[role="menu"]')), is$1.element(a)) {
      this.elements.settings.buttons[e].querySelector(".".concat(this.config.classNames.menu.value)).innerHTML = controls.getLabel.call(this, e, s);
      var r = a && a.querySelector('[value="'.concat(s, '"]'));
      is$1.element(r) && (r.checked = !0);
    }
  },
  getLabel: function getLabel(e, t) {
    switch (e) {
      case "speed":
        return 1 === t ? i18n.get("normal", this.config) : "".concat(t, "&times;");

      case "quality":
        if (is$1.number(t)) {
          var i = i18n.get("qualityLabel.".concat(t), this.config);
          return i.length ? i : "".concat(t, "p");
        }

        return toTitleCase(t);

      case "captions":
        return captions.getLabel.call(this);

      default:
        return null;
    }
  },
  setQualityMenu: function setQualityMenu(e) {
    var t = this;

    if (is$1.element(this.elements.settings.panels.quality)) {
      var i = "quality",
          n = this.elements.settings.panels.quality.querySelector('[role="menu"]');
      is$1.array(e) && (this.options.quality = dedupe(e).filter(function (e) {
        return t.config.quality.options.includes(e);
      }));
      var s = !is$1.empty(this.options.quality) && this.options.quality.length > 1;

      if (controls.toggleMenuButton.call(this, i, s), emptyElement(n), controls.checkMenu.call(this), s) {
        var a = function a(e) {
          var i = i18n.get("qualityBadge.".concat(e), t.config);
          return i.length ? controls.createBadge.call(t, i) : null;
        };

        this.options.quality.sort(function (e, i) {
          var n = t.config.quality.options;
          return n.indexOf(e) > n.indexOf(i) ? 1 : -1;
        }).forEach(function (e) {
          controls.createMenuItem.call(t, {
            value: e,
            list: n,
            type: i,
            title: controls.getLabel.call(t, "quality", e),
            badge: a(e)
          });
        }), controls.updateSetting.call(this, i, n);
      }
    }
  },
  setCaptionsMenu: function setCaptionsMenu() {
    var e = this;

    if (is$1.element(this.elements.settings.panels.captions)) {
      var t = "captions",
          i = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
          n = captions.getTracks.call(this),
          s = Boolean(n.length);

      if (controls.toggleMenuButton.call(this, t, s), emptyElement(i), controls.checkMenu.call(this), s) {
        var a = n.map(function (t, n) {
          return {
            value: n,
            checked: e.captions.toggled && e.currentTrack === n,
            title: captions.getLabel.call(e, t),
            badge: t.language && controls.createBadge.call(e, t.language.toUpperCase()),
            list: i,
            type: "language"
          };
        });
        a.unshift({
          value: -1,
          checked: !this.captions.toggled,
          title: i18n.get("disabled", this.config),
          list: i,
          type: "language"
        }), a.forEach(controls.createMenuItem.bind(this)), controls.updateSetting.call(this, t, i);
      }
    }
  },
  setSpeedMenu: function setSpeedMenu() {
    var e = this;

    if (is$1.element(this.elements.settings.panels.speed)) {
      var t = "speed",
          i = this.elements.settings.panels.speed.querySelector('[role="menu"]');
      this.options.speed = this.options.speed.filter(function (t) {
        return t >= e.minimumSpeed && t <= e.maximumSpeed;
      });
      var n = !is$1.empty(this.options.speed) && this.options.speed.length > 1;
      controls.toggleMenuButton.call(this, t, n), emptyElement(i), controls.checkMenu.call(this), n && (this.options.speed.forEach(function (n) {
        controls.createMenuItem.call(e, {
          value: n,
          list: i,
          type: t,
          title: controls.getLabel.call(e, "speed", n)
        });
      }), controls.updateSetting.call(this, t, i));
    }
  },
  checkMenu: function checkMenu() {
    var e = this.elements.settings.buttons,
        t = !is$1.empty(e) && Object.values(e).some(function (e) {
      return !e.hidden;
    });
    toggleHidden(this.elements.settings.menu, !t);
  },
  focusFirstMenuItem: function focusFirstMenuItem(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];

    if (!this.elements.settings.popup.hidden) {
      var i = e;
      is$1.element(i) || (i = Object.values(this.elements.settings.panels).find(function (e) {
        return !e.hidden;
      }));
      var n = i.querySelector('[role^="menuitem"]');
      setFocus.call(this, n, t);
    }
  },
  toggleMenu: function toggleMenu(e) {
    var t = this.elements.settings.popup,
        i = this.elements.buttons.settings;

    if (is$1.element(t) && is$1.element(i)) {
      var n = t.hidden,
          s = n;
      if (is$1.boolean(e)) s = e;else if (is$1.keyboardEvent(e) && 27 === e.which) s = !1;else if (is$1.event(e)) {
        var a = is$1.function(e.composedPath) ? e.composedPath()[0] : e.target,
            r = t.contains(a);
        if (r || !r && e.target !== i && s) return;
      }
      i.setAttribute("aria-expanded", s), toggleHidden(t, !s), toggleClass(this.elements.container, this.config.classNames.menu.open, s), s && is$1.keyboardEvent(e) ? controls.focusFirstMenuItem.call(this, null, !0) : s || n || setFocus.call(this, i, is$1.keyboardEvent(e));
    }
  },
  getMenuSize: function getMenuSize(e) {
    var t = e.cloneNode(!0);
    t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
    var i = t.scrollWidth,
        n = t.scrollHeight;
    return removeElement(t), {
      width: i,
      height: n
    };
  },
  showMenuPanel: function showMenuPanel() {
    var e = this,
        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        n = this.elements.container.querySelector("#plyr-settings-".concat(this.id, "-").concat(t));

    if (is$1.element(n)) {
      var s = n.parentNode,
          a = Array.from(s.children).find(function (e) {
        return !e.hidden;
      });

      if (support.transitions && !support.reducedMotion) {
        s.style.width = "".concat(a.scrollWidth, "px"), s.style.height = "".concat(a.scrollHeight, "px");

        var r = controls.getMenuSize.call(this, n),
            o = function t(i) {
          i.target === s && ["width", "height"].includes(i.propertyName) && (s.style.width = "", s.style.height = "", off.call(e, s, transitionEndEvent, t));
        };

        on.call(this, s, transitionEndEvent, o), s.style.width = "".concat(r.width, "px"), s.style.height = "".concat(r.height, "px");
      }

      toggleHidden(a, !0), toggleHidden(n, !1), controls.focusFirstMenuItem.call(this, n, i);
    }
  },
  setDownloadUrl: function setDownloadUrl() {
    var e = this.elements.buttons.download;
    is$1.element(e) && e.setAttribute("href", this.download);
  },
  create: function create(e) {
    var t = this,
        i = controls.bindMenuItemShortcuts,
        n = controls.createButton,
        s = controls.createProgress,
        a = controls.createRange,
        r = controls.createTime,
        o = controls.setQualityMenu,
        l = controls.setSpeedMenu,
        c = controls.showMenuPanel;
    this.elements.controls = null, is$1.array(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(n.call(this, "play-large"));
    var u = createElement("div", getAttributesFromSelector(this.config.selectors.controls.wrapper));
    this.elements.controls = u;
    var d = {
      class: "plyr__controls__item"
    };
    return dedupe(is$1.array(this.config.controls) ? this.config.controls : []).forEach(function (o) {
      if ("restart" === o && u.appendChild(n.call(t, "restart", d)), "rewind" === o && u.appendChild(n.call(t, "rewind", d)), "play" === o && u.appendChild(n.call(t, "play", d)), "fast-forward" === o && u.appendChild(n.call(t, "fast-forward", d)), "progress" === o) {
        var l = createElement("div", {
          class: "".concat(d.class, " plyr__progress__container")
        }),
            h = createElement("div", getAttributesFromSelector(t.config.selectors.progress));

        if (h.appendChild(a.call(t, "seek", {
          id: "plyr-seek-".concat(e.id)
        })), h.appendChild(s.call(t, "buffer")), t.config.tooltips.seek) {
          var m = createElement("span", {
            class: t.config.classNames.tooltip
          }, "00:00");
          h.appendChild(m), t.elements.display.seekTooltip = m;
        }

        t.elements.progress = h, l.appendChild(t.elements.progress), u.appendChild(l);
      }

      if ("current-time" === o && u.appendChild(r.call(t, "currentTime", d)), "duration" === o && u.appendChild(r.call(t, "duration", d)), "mute" === o || "volume" === o) {
        var p = t.elements.volume;

        if (is$1.element(p) && u.contains(p) || (p = createElement("div", extend({}, d, {
          class: "".concat(d.class, " plyr__volume").trim()
        })), t.elements.volume = p, u.appendChild(p)), "mute" === o && p.appendChild(n.call(t, "mute")), "volume" === o && !browser.isIos) {
          var g = {
            max: 1,
            step: .05,
            value: t.config.volume
          };
          p.appendChild(a.call(t, "volume", extend(g, {
            id: "plyr-volume-".concat(e.id)
          })));
        }
      }

      if ("captions" === o && u.appendChild(n.call(t, "captions", d)), "settings" === o && !is$1.empty(t.config.settings)) {
        var f = createElement("div", extend({}, d, {
          class: "".concat(d.class, " plyr__menu").trim(),
          hidden: ""
        }));
        f.appendChild(n.call(t, "settings", {
          "aria-haspopup": !0,
          "aria-controls": "plyr-settings-".concat(e.id),
          "aria-expanded": !1
        }));
        var y = createElement("div", {
          class: "plyr__menu__container",
          id: "plyr-settings-".concat(e.id),
          hidden: ""
        }),
            v = createElement("div"),
            b = createElement("div", {
          id: "plyr-settings-".concat(e.id, "-home")
        }),
            w = createElement("div", {
          role: "menu"
        });
        b.appendChild(w), v.appendChild(b), t.elements.settings.panels.home = b, t.config.settings.forEach(function (n) {
          var s = createElement("button", extend(getAttributesFromSelector(t.config.selectors.buttons.settings), {
            type: "button",
            class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--forward"),
            role: "menuitem",
            "aria-haspopup": !0,
            hidden: ""
          }));
          i.call(t, s, n), on.call(t, s, "click", function () {
            c.call(t, n, !1);
          });
          var a = createElement("span", null, i18n.get(n, t.config)),
              r = createElement("span", {
            class: t.config.classNames.menu.value
          });
          r.innerHTML = e[n], a.appendChild(r), s.appendChild(a), w.appendChild(s);
          var o = createElement("div", {
            id: "plyr-settings-".concat(e.id, "-").concat(n),
            hidden: ""
          }),
              l = createElement("button", {
            type: "button",
            class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--back")
          });
          l.appendChild(createElement("span", {
            "aria-hidden": !0
          }, i18n.get(n, t.config))), l.appendChild(createElement("span", {
            class: t.config.classNames.hidden
          }, i18n.get("menuBack", t.config))), on.call(t, o, "keydown", function (e) {
            37 === e.which && (e.preventDefault(), e.stopPropagation(), c.call(t, "home", !0));
          }, !1), on.call(t, l, "click", function () {
            c.call(t, "home", !1);
          }), o.appendChild(l), o.appendChild(createElement("div", {
            role: "menu"
          })), v.appendChild(o), t.elements.settings.buttons[n] = s, t.elements.settings.panels[n] = o;
        }), y.appendChild(v), f.appendChild(y), u.appendChild(f), t.elements.settings.popup = y, t.elements.settings.menu = f;
      }

      if ("pip" === o && support.pip && u.appendChild(n.call(t, "pip", d)), "airplay" === o && support.airplay && u.appendChild(n.call(t, "airplay", d)), "download" === o) {
        var k = extend({}, d, {
          element: "a",
          href: t.download,
          target: "_blank"
        });
        t.isHTML5 && (k.download = "");
        var T = t.config.urls.download;
        !is$1.url(T) && t.isEmbed && extend(k, {
          icon: "logo-".concat(t.provider),
          label: t.provider
        }), u.appendChild(n.call(t, "download", k));
      }

      "fullscreen" === o && u.appendChild(n.call(t, "fullscreen", d));
    }), this.isHTML5 && o.call(this, html5.getQualityOptions.call(this)), l.call(this), u;
  },
  inject: function inject() {
    var e = this;

    if (this.config.loadSprite) {
      var t = controls.getIconUrl.call(this);
      t.cors && loadSprite(t.url, "sprite-plyr");
    }

    this.id = Math.floor(1e4 * Math.random());
    var i = null;
    this.elements.controls = null;
    var n = {
      id: this.id,
      seektime: this.config.seekTime,
      title: this.config.title
    },
        s = !0;
    is$1.function(this.config.controls) && (this.config.controls = this.config.controls.call(this, n)), this.config.controls || (this.config.controls = []), is$1.element(this.config.controls) || is$1.string(this.config.controls) ? i = this.config.controls : (i = controls.create.call(this, {
      id: this.id,
      seektime: this.config.seekTime,
      speed: this.speed,
      quality: this.quality,
      captions: captions.getLabel.call(this)
    }), s = !1);
    var a, r;

    if (s && is$1.string(this.config.controls) && (a = i, Object.entries(n).forEach(function (e) {
      var t = _slicedToArray(e, 2),
          i = t[0],
          n = t[1];

      a = replaceAll(a, "{".concat(i, "}"), n);
    }), i = a), is$1.string(this.config.selectors.controls.container) && (r = document.querySelector(this.config.selectors.controls.container)), is$1.element(r) || (r = this.elements.container), r[is$1.element(i) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", i), is$1.element(this.elements.controls) || controls.findElements.call(this), !is$1.empty(this.elements.buttons)) {
      var o = function o(t) {
        var i = e.config.classNames.controlPressed;
        Object.defineProperty(t, "pressed", {
          enumerable: !0,
          get: function get() {
            return hasClass(t, i);
          },
          set: function set() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            toggleClass(t, i, e);
          }
        });
      };

      Object.values(this.elements.buttons).filter(Boolean).forEach(function (e) {
        is$1.array(e) || is$1.nodeList(e) ? Array.from(e).filter(Boolean).forEach(o) : o(e);
      });
    }

    if (browser.isEdge && repaint(r), this.config.tooltips.controls) {
      var l = this.config,
          c = l.classNames,
          u = l.selectors,
          d = "".concat(u.controls.wrapper, " ").concat(u.labels, " .").concat(c.hidden),
          h = getElements.call(this, d);
      Array.from(h).forEach(function (t) {
        toggleClass(t, e.config.classNames.hidden, !1), toggleClass(t, e.config.classNames.tooltip, !0);
      });
    }
  }
};

function parseUrl(e) {
  var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
      i = e;

  if (t) {
    var n = document.createElement("a");
    n.href = i, i = n.href;
  }

  try {
    return new URL(i);
  } catch (e) {
    return null;
  }
}

function buildUrlParams(e) {
  var t = new URLSearchParams();
  return is$1.object(e) && Object.entries(e).forEach(function (e) {
    var i = _slicedToArray(e, 2),
        n = i[0],
        s = i[1];

    t.set(n, s);
  }), t;
}

var captions = {
  setup: function setup() {
    if (this.supported.ui) if (!this.isVideo || this.isYouTube || this.isHTML5 && !support.textTracks) is$1.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && controls.setCaptionsMenu.call(this);else {
      if (is$1.element(this.elements.captions) || (this.elements.captions = createElement("div", getAttributesFromSelector(this.config.selectors.captions)), insertAfter(this.elements.captions, this.elements.wrapper)), browser.isIE && window.URL) {
        var e = this.media.querySelectorAll("track");
        Array.from(e).forEach(function (e) {
          var t = e.getAttribute("src"),
              i = parseUrl(t);
          null !== i && i.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i.protocol) && fetch(t, "blob").then(function (t) {
            e.setAttribute("src", window.URL.createObjectURL(t));
          }).catch(function () {
            removeElement(e);
          });
        });
      }

      var t = dedupe((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map(function (e) {
        return e.split("-")[0];
      })),
          i = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
      if ("auto" === i) i = _slicedToArray(t, 1)[0];
      var n = this.storage.get("captions");

      if (is$1.boolean(n) || (n = this.config.captions.active), Object.assign(this.captions, {
        toggled: !1,
        active: n,
        language: i,
        languages: t
      }), this.isHTML5) {
        var s = this.config.captions.update ? "addtrack removetrack" : "removetrack";
        on.call(this, this.media.textTracks, s, captions.update.bind(this));
      }

      setTimeout(captions.update.bind(this), 0);
    }
  },
  update: function update() {
    var e = this,
        t = captions.getTracks.call(this, !0),
        i = this.captions,
        n = i.active,
        s = i.language,
        a = i.meta,
        r = i.currentTrackNode,
        o = Boolean(t.find(function (e) {
      return e.language === s;
    }));
    this.isHTML5 && this.isVideo && t.filter(function (e) {
      return !a.get(e);
    }).forEach(function (t) {
      e.debug.log("Track added", t), a.set(t, {
        default: "showing" === t.mode
      }), "showing" === t.mode && (t.mode = "hidden"), on.call(e, t, "cuechange", function () {
        return captions.updateCues.call(e);
      });
    }), (o && this.language !== s || !t.includes(r)) && (captions.setLanguage.call(this, s), captions.toggle.call(this, n && o)), toggleClass(this.elements.container, this.config.classNames.captions.enabled, !is$1.empty(t)), is$1.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && controls.setCaptionsMenu.call(this);
  },
  toggle: function toggle(e) {
    var t = this,
        i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];

    if (this.supported.ui) {
      var n = this.captions.toggled,
          s = this.config.classNames.captions.active,
          a = is$1.nullOrUndefined(e) ? !n : e;

      if (a !== n) {
        if (i || (this.captions.active = a, this.storage.set({
          captions: a
        })), !this.language && a && !i) {
          var r = captions.getTracks.call(this),
              o = captions.findTrack.call(this, [this.captions.language].concat(_toConsumableArray(this.captions.languages)), !0);
          return this.captions.language = o.language, void captions.set.call(this, r.indexOf(o));
        }

        this.elements.buttons.captions && (this.elements.buttons.captions.pressed = a), toggleClass(this.elements.container, s, a), this.captions.toggled = a, controls.updateSetting.call(this, "captions"), triggerEvent.call(this, this.media, a ? "captionsenabled" : "captionsdisabled");
      }

      setTimeout(function () {
        a && t.captions.toggled && (t.captions.currentTrackNode.mode = "hidden");
      });
    }
  },
  set: function set(e) {
    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
        i = captions.getTracks.call(this);
    if (-1 !== e) {
      if (is$1.number(e)) {
        if (e in i) {
          if (this.captions.currentTrack !== e) {
            this.captions.currentTrack = e;
            var n = i[e],
                s = n || {},
                a = s.language;
            this.captions.currentTrackNode = n, controls.updateSetting.call(this, "captions"), t || (this.captions.language = a, this.storage.set({
              language: a
            })), this.isVimeo && this.embed.enableTextTrack(a), triggerEvent.call(this, this.media, "languagechange");
          }

          captions.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && captions.updateCues.call(this);
        } else this.debug.warn("Track not found", e);
      } else this.debug.warn("Invalid caption argument", e);
    } else captions.toggle.call(this, !1, t);
  },
  setLanguage: function setLanguage(e) {
    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];

    if (is$1.string(e)) {
      var i = e.toLowerCase();
      this.captions.language = i;
      var n = captions.getTracks.call(this),
          s = captions.findTrack.call(this, [i]);
      captions.set.call(this, n.indexOf(s), t);
    } else this.debug.warn("Invalid language argument", e);
  },
  getTracks: function getTracks() {
    var e = this,
        t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
        i = Array.from((this.media || {}).textTracks || []);
    return i.filter(function (i) {
      return !e.isHTML5 || t || e.captions.meta.has(i);
    }).filter(function (e) {
      return ["captions", "subtitles"].includes(e.kind);
    });
  },
  findTrack: function findTrack(e) {
    var t,
        i = this,
        n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        s = captions.getTracks.call(this),
        a = function a(e) {
      return Number((i.captions.meta.get(e) || {}).default);
    },
        r = Array.from(s).sort(function (e, t) {
      return a(t) - a(e);
    });

    return e.every(function (e) {
      return !(t = r.find(function (t) {
        return t.language === e;
      }));
    }), t || (n ? r[0] : void 0);
  },
  getCurrentTrack: function getCurrentTrack() {
    return captions.getTracks.call(this)[this.currentTrack];
  },
  getLabel: function getLabel(e) {
    var t = e;
    return !is$1.track(t) && support.textTracks && this.captions.toggled && (t = captions.getCurrentTrack.call(this)), is$1.track(t) ? is$1.empty(t.label) ? is$1.empty(t.language) ? i18n.get("enabled", this.config) : e.language.toUpperCase() : t.label : i18n.get("disabled", this.config);
  },
  updateCues: function updateCues(e) {
    if (this.supported.ui) if (is$1.element(this.elements.captions)) {
      if (is$1.nullOrUndefined(e) || Array.isArray(e)) {
        var t = e;

        if (!t) {
          var i = captions.getCurrentTrack.call(this);
          t = Array.from((i || {}).activeCues || []).map(function (e) {
            return e.getCueAsHTML();
          }).map(getHTML);
        }

        var n = t.map(function (e) {
          return e.trim();
        }).join("\n");

        if (n !== this.elements.captions.innerHTML) {
          emptyElement(this.elements.captions);
          var s = createElement("span", getAttributesFromSelector(this.config.selectors.caption));
          s.innerHTML = n, this.elements.captions.appendChild(s), triggerEvent.call(this, this.media, "cuechange");
        }
      } else this.debug.warn("updateCues: Invalid input", e);
    } else this.debug.warn("No captions element to render to");
  }
},
    defaults$1 = {
  enabled: !0,
  title: "",
  debug: !1,
  autoplay: !1,
  autopause: !0,
  playsinline: !0,
  seekTime: 10,
  volume: 1,
  muted: !1,
  duration: null,
  displayDuration: !0,
  invertTime: !0,
  toggleInvert: !0,
  ratio: null,
  clickToPlay: !0,
  hideControls: !0,
  resetOnEnd: !1,
  disableContextMenu: !0,
  loadSprite: !0,
  iconPrefix: "plyr",
  iconUrl: "https://cdn.plyr.io/3.6.1/plyr.svg",
  blankVideo: "https://cdn.plyr.io/static/blank.mp4",
  quality: {
    default: 576,
    options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
    forced: !1,
    onChange: null
  },
  loop: {
    active: !1
  },
  speed: {
    selected: 1,
    options: [.5, .75, 1, 1.25, 1.5, 1.75, 2, 4]
  },
  keyboard: {
    focused: !0,
    global: !1
  },
  tooltips: {
    controls: !1,
    seek: !0
  },
  captions: {
    active: !1,
    language: "auto",
    update: !1
  },
  fullscreen: {
    enabled: !0,
    fallback: !0,
    iosNative: !1
  },
  storage: {
    enabled: !0,
    key: "plyr"
  },
  controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
  settings: ["captions", "quality", "speed"],
  i18n: {
    restart: "Restart",
    rewind: "Rewind {seektime}s",
    play: "Play",
    pause: "Pause",
    fastForward: "Forward {seektime}s",
    seek: "Seek",
    seekLabel: "{currentTime} of {duration}",
    played: "Played",
    buffered: "Buffered",
    currentTime: "Current time",
    duration: "Duration",
    volume: "Volume",
    mute: "Mute",
    unmute: "Unmute",
    enableCaptions: "Enable captions",
    disableCaptions: "Disable captions",
    download: "Download",
    enterFullscreen: "Enter fullscreen",
    exitFullscreen: "Exit fullscreen",
    frameTitle: "Player for {title}",
    captions: "Captions",
    settings: "Settings",
    pip: "PIP",
    menuBack: "Go back to previous menu",
    speed: "Speed",
    normal: "Normal",
    quality: "Quality",
    loop: "Loop",
    start: "Start",
    end: "End",
    all: "All",
    reset: "Reset",
    disabled: "Disabled",
    enabled: "Enabled",
    advertisement: "Ad",
    qualityBadge: {
      2160: "4K",
      1440: "HD",
      1080: "HD",
      720: "HD",
      576: "SD",
      480: "SD"
    }
  },
  urls: {
    download: null,
    vimeo: {
      sdk: "https://player.vimeo.com/api/player.js",
      iframe: "https://player.vimeo.com/video/{0}?{1}",
      api: "https://vimeo.com/api/v2/video/{0}.json"
    },
    youtube: {
      sdk: "https://www.youtube.com/iframe_api",
      api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
    },
    googleIMA: {
      sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
    }
  },
  listeners: {
    seek: null,
    play: null,
    pause: null,
    restart: null,
    rewind: null,
    fastForward: null,
    mute: null,
    volume: null,
    captions: null,
    download: null,
    fullscreen: null,
    pip: null,
    airplay: null,
    speed: null,
    quality: null,
    loop: null,
    language: null
  },
  events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
  selectors: {
    editable: "input, textarea, select, [contenteditable]",
    container: ".plyr",
    controls: {
      container: null,
      wrapper: ".plyr__controls"
    },
    labels: "[data-plyr]",
    buttons: {
      play: '[data-plyr="play"]',
      pause: '[data-plyr="pause"]',
      restart: '[data-plyr="restart"]',
      rewind: '[data-plyr="rewind"]',
      fastForward: '[data-plyr="fast-forward"]',
      mute: '[data-plyr="mute"]',
      captions: '[data-plyr="captions"]',
      download: '[data-plyr="download"]',
      fullscreen: '[data-plyr="fullscreen"]',
      pip: '[data-plyr="pip"]',
      airplay: '[data-plyr="airplay"]',
      settings: '[data-plyr="settings"]',
      loop: '[data-plyr="loop"]'
    },
    inputs: {
      seek: '[data-plyr="seek"]',
      volume: '[data-plyr="volume"]',
      speed: '[data-plyr="speed"]',
      language: '[data-plyr="language"]',
      quality: '[data-plyr="quality"]'
    },
    display: {
      currentTime: ".plyr__time--current",
      duration: ".plyr__time--duration",
      buffer: ".plyr__progress__buffer",
      loop: ".plyr__progress__loop",
      volume: ".plyr__volume--display"
    },
    progress: ".plyr__progress",
    captions: ".plyr__captions",
    caption: ".plyr__caption"
  },
  classNames: {
    type: "plyr--{0}",
    provider: "plyr--{0}",
    video: "plyr__video-wrapper",
    embed: "plyr__video-embed",
    videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
    embedContainer: "plyr__video-embed__container",
    poster: "plyr__poster",
    posterEnabled: "plyr__poster-enabled",
    ads: "plyr__ads",
    control: "plyr__control",
    controlPressed: "plyr__control--pressed",
    playing: "plyr--playing",
    paused: "plyr--paused",
    stopped: "plyr--stopped",
    loading: "plyr--loading",
    hover: "plyr--hover",
    tooltip: "plyr__tooltip",
    cues: "plyr__cues",
    hidden: "plyr__sr-only",
    hideControls: "plyr--hide-controls",
    isIos: "plyr--is-ios",
    isTouch: "plyr--is-touch",
    uiSupported: "plyr--full-ui",
    noTransition: "plyr--no-transition",
    display: {
      time: "plyr__time"
    },
    menu: {
      value: "plyr__menu__value",
      badge: "plyr__badge",
      open: "plyr--menu-open"
    },
    captions: {
      enabled: "plyr--captions-enabled",
      active: "plyr--captions-active"
    },
    fullscreen: {
      enabled: "plyr--fullscreen-enabled",
      fallback: "plyr--fullscreen-fallback"
    },
    pip: {
      supported: "plyr--pip-supported",
      active: "plyr--pip-active"
    },
    airplay: {
      supported: "plyr--airplay-supported",
      active: "plyr--airplay-active"
    },
    tabFocus: "plyr__tab-focus",
    previewThumbnails: {
      thumbContainer: "plyr__preview-thumb",
      thumbContainerShown: "plyr__preview-thumb--is-shown",
      imageContainer: "plyr__preview-thumb__image-container",
      timeContainer: "plyr__preview-thumb__time-container",
      scrubbingContainer: "plyr__preview-scrubbing",
      scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
    }
  },
  attributes: {
    embed: {
      provider: "data-plyr-provider",
      id: "data-plyr-embed-id"
    }
  },
  ads: {
    enabled: !1,
    publisherId: "",
    tagUrl: ""
  },
  previewThumbnails: {
    enabled: !1,
    src: ""
  },
  vimeo: {
    byline: !1,
    portrait: !1,
    title: !1,
    speed: !0,
    transparent: !1,
    premium: !1,
    referrerPolicy: null
  },
  youtube: {
    noCookie: !0,
    rel: 0,
    showinfo: 0,
    iv_load_policy: 3,
    modestbranding: 1
  }
},
    pip = {
  active: "picture-in-picture",
  inactive: "inline"
},
    providers = {
  html5: "html5",
  youtube: "youtube",
  vimeo: "vimeo"
},
    types = {
  audio: "audio",
  video: "video"
};

function getProviderByUrl(e) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? providers.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? providers.vimeo : null;
}

var noop = function noop() {},
    Console = function () {
  function e() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    _classCallCheck(this, e), this.enabled = window.console && t, this.enabled && this.log("Debugging enabled");
  }

  return _createClass(e, [{
    key: "log",
    get: function get() {
      return this.enabled ? Function.prototype.bind.call(console.log, console) : noop;
    }
  }, {
    key: "warn",
    get: function get() {
      return this.enabled ? Function.prototype.bind.call(console.warn, console) : noop;
    }
  }, {
    key: "error",
    get: function get() {
      return this.enabled ? Function.prototype.bind.call(console.error, console) : noop;
    }
  }]), e;
}(),
    Fullscreen = function () {
  function e(t) {
    var i = this;
    _classCallCheck(this, e), this.player = t, this.prefix = e.prefix, this.property = e.property, this.scrollPosition = {
      x: 0,
      y: 0
    }, this.forceFallback = "force" === t.config.fullscreen.fallback, this.player.elements.fullscreen = t.config.fullscreen.container && closest(this.player.elements.container, t.config.fullscreen.container), on.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : "".concat(this.prefix, "fullscreenchange"), function () {
      i.onChange();
    }), on.call(this.player, this.player.elements.container, "dblclick", function (e) {
      is$1.element(i.player.elements.controls) && i.player.elements.controls.contains(e.target) || i.toggle();
    }), on.call(this, this.player.elements.container, "keydown", function (e) {
      return i.trapFocus(e);
    }), this.update();
  }

  return _createClass(e, [{
    key: "onChange",
    value: function value() {
      if (this.enabled) {
        var e = this.player.elements.buttons.fullscreen;
        is$1.element(e) && (e.pressed = this.active);
        var t = this.target === this.player.media ? this.target : this.player.elements.container;
        triggerEvent.call(this.player, t, this.active ? "enterfullscreen" : "exitfullscreen", !0);
      }
    }
  }, {
    key: "toggleFallback",
    value: function value() {
      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];

      if (e ? this.scrollPosition = {
        x: window.scrollX || 0,
        y: window.scrollY || 0
      } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", toggleClass(this.target, this.player.config.classNames.fullscreen.fallback, e), browser.isIos) {
        var t = document.head.querySelector('meta[name="viewport"]'),
            i = "viewport-fit=cover";
        t || (t = document.createElement("meta")).setAttribute("name", "viewport");
        var n = is$1.string(t.content) && t.content.includes(i);
        e ? (this.cleanupViewport = !n, n || (t.content += ",".concat(i))) : this.cleanupViewport && (t.content = t.content.split(",").filter(function (e) {
          return e.trim() !== i;
        }).join(","));
      }

      this.onChange();
    }
  }, {
    key: "trapFocus",
    value: function value(e) {
      if (!browser.isIos && this.active && "Tab" === e.key && 9 === e.keyCode) {
        var t = document.activeElement,
            i = getElements.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),
            n = _slicedToArray(i, 1)[0],
            s = i[i.length - 1];

        t !== s || e.shiftKey ? t === n && e.shiftKey && (s.focus(), e.preventDefault()) : (n.focus(), e.preventDefault());
      }
    }
  }, {
    key: "update",
    value: function value() {
      var t;
      this.enabled ? (t = this.forceFallback ? "Fallback (forced)" : e.native ? "Native" : "Fallback", this.player.debug.log("".concat(t, " fullscreen enabled"))) : this.player.debug.log("Fullscreen not supported and fallback disabled");
      toggleClass(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
    }
  }, {
    key: "enter",
    value: function value() {
      this.enabled && (browser.isIos && this.player.config.fullscreen.iosNative ? this.target.webkitEnterFullscreen() : !e.native || this.forceFallback ? this.toggleFallback(!0) : this.prefix ? is$1.empty(this.prefix) || this.target["".concat(this.prefix, "Request").concat(this.property)]() : this.target.requestFullscreen({
        navigationUI: "hide"
      }));
    }
  }, {
    key: "exit",
    value: function value() {
      if (this.enabled) if (browser.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), silencePromise(this.player.play());else if (!e.native || this.forceFallback) this.toggleFallback(!1);else if (this.prefix) {
        if (!is$1.empty(this.prefix)) {
          var t = "moz" === this.prefix ? "Cancel" : "Exit";
          document["".concat(this.prefix).concat(t).concat(this.property)]();
        }
      } else (document.cancelFullScreen || document.exitFullscreen).call(document);
    }
  }, {
    key: "toggle",
    value: function value() {
      this.active ? this.exit() : this.enter();
    }
  }, {
    key: "usingNative",
    get: function get() {
      return e.native && !this.forceFallback;
    }
  }, {
    key: "enabled",
    get: function get() {
      return (e.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
    }
  }, {
    key: "active",
    get: function get() {
      if (!this.enabled) return !1;
      if (!e.native || this.forceFallback) return hasClass(this.target, this.player.config.classNames.fullscreen.fallback);
      var t = this.prefix ? document["".concat(this.prefix).concat(this.property, "Element")] : document.fullscreenElement;
      return t && t.shadowRoot ? t === this.target.getRootNode().host : t === this.target;
    }
  }, {
    key: "target",
    get: function get() {
      return browser.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container;
    }
  }], [{
    key: "native",
    get: function get() {
      return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
    }
  }, {
    key: "prefix",
    get: function get() {
      if (is$1.function(document.exitFullscreen)) return "";
      var e = "";
      return ["webkit", "moz", "ms"].some(function (t) {
        return !(!is$1.function(document["".concat(t, "ExitFullscreen")]) && !is$1.function(document["".concat(t, "CancelFullScreen")])) && (e = t, !0);
      }), e;
    }
  }, {
    key: "property",
    get: function get() {
      return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
    }
  }]), e;
}();

function loadImage(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
  return new Promise(function (i, n) {
    var s = new Image(),
        a = function a() {
      delete s.onload, delete s.onerror, (s.naturalWidth >= t ? i : n)(s);
    };

    Object.assign(s, {
      onload: a,
      onerror: a,
      src: e
    });
  });
}

var ui = {
  addStyleHook: function addStyleHook() {
    toggleClass(this.elements.container, this.config.selectors.container.replace(".", ""), !0), toggleClass(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
  },
  toggleNativeControls: function toggleNativeControls() {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls");
  },
  build: function build() {
    var e = this;
    if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for ".concat(this.provider, " ").concat(this.type)), void ui.toggleNativeControls.call(this, !0);
    is$1.element(this.elements.controls) || (controls.inject.call(this), this.listeners.controls()), ui.toggleNativeControls.call(this), this.isHTML5 && captions.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, controls.updateVolume.call(this), controls.timeUpdate.call(this), ui.checkPlaying.call(this), toggleClass(this.elements.container, this.config.classNames.pip.supported, support.pip && this.isHTML5 && this.isVideo), toggleClass(this.elements.container, this.config.classNames.airplay.supported, support.airplay && this.isHTML5), toggleClass(this.elements.container, this.config.classNames.isIos, browser.isIos), toggleClass(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout(function () {
      triggerEvent.call(e, e.media, "ready");
    }, 0), ui.setTitle.call(this), this.poster && ui.setPoster.call(this, this.poster, !1).catch(function () {}), this.config.duration && controls.durationUpdate.call(this);
  },
  setTitle: function setTitle() {
    var e = i18n.get("play", this.config);

    if (is$1.string(this.config.title) && !is$1.empty(this.config.title) && (e += ", ".concat(this.config.title)), Array.from(this.elements.buttons.play || []).forEach(function (t) {
      t.setAttribute("aria-label", e);
    }), this.isEmbed) {
      var t = getElement.call(this, "iframe");
      if (!is$1.element(t)) return;
      var i = is$1.empty(this.config.title) ? "video" : this.config.title,
          n = i18n.get("frameTitle", this.config);
      t.setAttribute("title", n.replace("{title}", i));
    }
  },
  togglePoster: function togglePoster(e) {
    toggleClass(this.elements.container, this.config.classNames.posterEnabled, e);
  },
  setPoster: function setPoster(e) {
    var t = this,
        i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return i && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), ready.call(this).then(function () {
      return loadImage(e);
    }).catch(function (i) {
      throw e === t.poster && ui.togglePoster.call(t, !1), i;
    }).then(function () {
      if (e !== t.poster) throw new Error("setPoster cancelled by later call to setPoster");
    }).then(function () {
      return Object.assign(t.elements.poster.style, {
        backgroundImage: "url('".concat(e, "')"),
        backgroundSize: ""
      }), ui.togglePoster.call(t, !0), e;
    }));
  },
  checkPlaying: function checkPlaying(e) {
    var t = this;
    toggleClass(this.elements.container, this.config.classNames.playing, this.playing), toggleClass(this.elements.container, this.config.classNames.paused, this.paused), toggleClass(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(function (e) {
      Object.assign(e, {
        pressed: t.playing
      }), e.setAttribute("aria-label", i18n.get(t.playing ? "pause" : "play", t.config));
    }), is$1.event(e) && "timeupdate" === e.type || ui.toggleControls.call(this);
  },
  checkLoading: function checkLoading(e) {
    var t = this;
    this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(function () {
      toggleClass(t.elements.container, t.config.classNames.loading, t.loading), ui.toggleControls.call(t);
    }, this.loading ? 250 : 0);
  },
  toggleControls: function toggleControls(e) {
    var t = this.elements.controls;

    if (t && this.config.hideControls) {
      var i = this.touch && this.lastSeekTime + 2e3 > Date.now();
      this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || i));
    }
  },
  migrateStyles: function migrateStyles() {
    var e = this;
    Object.values(_objectSpread2$1({}, this.media.style)).filter(function (e) {
      return !is$1.empty(e) && is$1.string(e) && e.startsWith("--plyr");
    }).forEach(function (t) {
      e.elements.container.style.setProperty(t, e.media.style.getPropertyValue(t)), e.media.style.removeProperty(t);
    }), is$1.empty(this.media.style) && this.media.removeAttribute("style");
  }
},
    Listeners = function () {
  function e(t) {
    _classCallCheck(this, e), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this);
  }

  return _createClass(e, [{
    key: "handleKey",
    value: function value(e) {
      var t = this.player,
          i = t.elements,
          n = e.keyCode ? e.keyCode : e.which,
          s = "keydown" === e.type,
          a = s && n === this.lastKey;

      if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) && is$1.number(n)) {
        if (s) {
          var r = document.activeElement;

          if (is$1.element(r)) {
            var o = t.config.selectors.editable;
            if (r !== i.inputs.seek && matches$1(r, o)) return;
            if (32 === e.which && matches$1(r, 'button, [role^="menuitem"]')) return;
          }

          switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(n) && (e.preventDefault(), e.stopPropagation()), n) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              a || (t.currentTime = t.duration / 10 * (n - 48));
              break;

            case 32:
            case 75:
              a || silencePromise(t.togglePlay());
              break;

            case 38:
              t.increaseVolume(.1);
              break;

            case 40:
              t.decreaseVolume(.1);
              break;

            case 77:
              a || (t.muted = !t.muted);
              break;

            case 39:
              t.forward();
              break;

            case 37:
              t.rewind();
              break;

            case 70:
              t.fullscreen.toggle();
              break;

            case 67:
              a || t.toggleCaptions();
              break;

            case 76:
              t.loop = !t.loop;
          }

          27 === n && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = n;
        } else this.lastKey = null;
      }
    }
  }, {
    key: "toggleMenu",
    value: function value(e) {
      controls.toggleMenu.call(this.player, e);
    }
  }, {
    key: "firstTouch",
    value: function value() {
      var e = this.player,
          t = e.elements;
      e.touch = !0, toggleClass(t.container, e.config.classNames.isTouch, !0);
    }
  }, {
    key: "setTabFocus",
    value: function value(e) {
      var t = this.player,
          i = t.elements;

      if (clearTimeout(this.focusTimer), "keydown" !== e.type || 9 === e.which) {
        "keydown" === e.type && (this.lastKeyDown = e.timeStamp);
        var n,
            s = e.timeStamp - this.lastKeyDown <= 20;
        if ("focus" !== e.type || s) n = t.config.classNames.tabFocus, toggleClass(getElements.call(t, ".".concat(n)), n, !1), "focusout" !== e.type && (this.focusTimer = setTimeout(function () {
          var e = document.activeElement;
          i.container.contains(e) && toggleClass(document.activeElement, t.config.classNames.tabFocus, !0);
        }, 10));
      }
    }
  }, {
    key: "global",
    value: function value() {
      var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
          t = this.player;
      t.config.keyboard.global && toggleListener.call(t, window, "keydown keyup", this.handleKey, e, !1), toggleListener.call(t, document.body, "click", this.toggleMenu, e), once.call(t, document.body, "touchstart", this.firstTouch), toggleListener.call(t, document.body, "keydown focus blur focusout", this.setTabFocus, e, !1, !0);
    }
  }, {
    key: "container",
    value: function value() {
      var e = this.player,
          t = e.config,
          i = e.elements,
          n = e.timers;
      !t.keyboard.global && t.keyboard.focused && on.call(e, i.container, "keydown keyup", this.handleKey, !1), on.call(e, i.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", function (t) {
        var s = i.controls;
        s && "enterfullscreen" === t.type && (s.pressed = !1, s.hover = !1);
        var a = 0;
        ["touchstart", "touchmove", "mousemove"].includes(t.type) && (ui.toggleControls.call(e, !0), a = e.touch ? 3e3 : 2e3), clearTimeout(n.controls), n.controls = setTimeout(function () {
          return ui.toggleControls.call(e, !1);
        }, a);
      });

      var s = function s(t) {
        if (!t) return setAspectRatio.call(e);
        var n = i.container.getBoundingClientRect(),
            s = n.width,
            a = n.height;
        return setAspectRatio.call(e, "".concat(s, ":").concat(a));
      },
          a = function a() {
        clearTimeout(n.resized), n.resized = setTimeout(s, 50);
      };

      on.call(e, i.container, "enterfullscreen exitfullscreen", function (t) {
        var n = e.fullscreen,
            r = n.target,
            o = n.usingNative;

        if (r === i.container && (e.isEmbed || !is$1.empty(e.config.ratio))) {
          var l = "enterfullscreen" === t.type,
              c = s(l);
          c.padding;
          !function (t, i, n) {
            if (e.isVimeo && !e.config.vimeo.premium) {
              var s = e.elements.wrapper.firstChild,
                  a = _slicedToArray(t, 2)[1],
                  r = _slicedToArray(getAspectRatio.call(e), 2),
                  o = r[0],
                  l = r[1];

              s.style.maxWidth = n ? "".concat(a / l * o, "px") : null, s.style.margin = n ? "0 auto" : null;
            }
          }(c.ratio, 0, l), o || (l ? on.call(e, window, "resize", a) : off.call(e, window, "resize", a));
        }
      });
    }
  }, {
    key: "media",
    value: function value() {
      var e = this,
          t = this.player,
          i = t.elements;

      if (on.call(t, t.media, "timeupdate seeking seeked", function (e) {
        return controls.timeUpdate.call(t, e);
      }), on.call(t, t.media, "durationchange loadeddata loadedmetadata", function (e) {
        return controls.durationUpdate.call(t, e);
      }), on.call(t, t.media, "ended", function () {
        t.isHTML5 && t.isVideo && t.config.resetOnEnd && (t.restart(), t.pause());
      }), on.call(t, t.media, "progress playing seeking seeked", function (e) {
        return controls.updateProgress.call(t, e);
      }), on.call(t, t.media, "volumechange", function (e) {
        return controls.updateVolume.call(t, e);
      }), on.call(t, t.media, "playing play pause ended emptied timeupdate", function (e) {
        return ui.checkPlaying.call(t, e);
      }), on.call(t, t.media, "waiting canplay seeked playing", function (e) {
        return ui.checkLoading.call(t, e);
      }), t.supported.ui && t.config.clickToPlay && !t.isAudio) {
        var n = getElement.call(t, ".".concat(t.config.classNames.video));
        if (!is$1.element(n)) return;
        on.call(t, i.container, "click", function (s) {
          ([i.container, n].includes(s.target) || n.contains(s.target)) && (t.touch && t.config.hideControls || (t.ended ? (e.proxy(s, t.restart, "restart"), e.proxy(s, function () {
            silencePromise(t.play());
          }, "play")) : e.proxy(s, function () {
            silencePromise(t.togglePlay());
          }, "play")));
        });
      }

      t.supported.ui && t.config.disableContextMenu && on.call(t, i.wrapper, "contextmenu", function (e) {
        e.preventDefault();
      }, !1), on.call(t, t.media, "volumechange", function () {
        t.storage.set({
          volume: t.volume,
          muted: t.muted
        });
      }), on.call(t, t.media, "ratechange", function () {
        controls.updateSetting.call(t, "speed"), t.storage.set({
          speed: t.speed
        });
      }), on.call(t, t.media, "qualitychange", function (e) {
        controls.updateSetting.call(t, "quality", null, e.detail.quality);
      }), on.call(t, t.media, "ready qualitychange", function () {
        controls.setDownloadUrl.call(t);
      });
      var s = t.config.events.concat(["keyup", "keydown"]).join(" ");
      on.call(t, t.media, s, function (e) {
        var n = e.detail,
            s = void 0 === n ? {} : n;
        "error" === e.type && (s = t.media.error), triggerEvent.call(t, i.container, e.type, !0, s);
      });
    }
  }, {
    key: "proxy",
    value: function value(e, t, i) {
      var n = this.player,
          s = n.config.listeners[i],
          a = !0;
      is$1.function(s) && (a = s.call(n, e)), !1 !== a && is$1.function(t) && t.call(n, e);
    }
  }, {
    key: "bind",
    value: function value(e, t, i, n) {
      var s = this,
          a = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
          r = this.player,
          o = r.config.listeners[n],
          l = is$1.function(o);
      on.call(r, e, t, function (e) {
        return s.proxy(e, i, n);
      }, a && !l);
    }
  }, {
    key: "controls",
    value: function value() {
      var e = this,
          t = this.player,
          i = t.elements,
          n = browser.isIE ? "change" : "input";

      if (i.buttons.play && Array.from(i.buttons.play).forEach(function (i) {
        e.bind(i, "click", function () {
          silencePromise(t.togglePlay());
        }, "play");
      }), this.bind(i.buttons.restart, "click", t.restart, "restart"), this.bind(i.buttons.rewind, "click", t.rewind, "rewind"), this.bind(i.buttons.fastForward, "click", t.forward, "fastForward"), this.bind(i.buttons.mute, "click", function () {
        t.muted = !t.muted;
      }, "mute"), this.bind(i.buttons.captions, "click", function () {
        return t.toggleCaptions();
      }), this.bind(i.buttons.download, "click", function () {
        triggerEvent.call(t, t.media, "download");
      }, "download"), this.bind(i.buttons.fullscreen, "click", function () {
        t.fullscreen.toggle();
      }, "fullscreen"), this.bind(i.buttons.pip, "click", function () {
        t.pip = "toggle";
      }, "pip"), this.bind(i.buttons.airplay, "click", t.airplay, "airplay"), this.bind(i.buttons.settings, "click", function (e) {
        e.stopPropagation(), e.preventDefault(), controls.toggleMenu.call(t, e);
      }, null, !1), this.bind(i.buttons.settings, "keyup", function (e) {
        var i = e.which;
        [13, 32].includes(i) && (13 !== i ? (e.preventDefault(), e.stopPropagation(), controls.toggleMenu.call(t, e)) : controls.focusFirstMenuItem.call(t, null, !0));
      }, null, !1), this.bind(i.settings.menu, "keydown", function (e) {
        27 === e.which && controls.toggleMenu.call(t, e);
      }), this.bind(i.inputs.seek, "mousedown mousemove", function (e) {
        var t = i.progress.getBoundingClientRect(),
            n = 100 / t.width * (e.pageX - t.left);
        e.currentTarget.setAttribute("seek-value", n);
      }), this.bind(i.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", function (e) {
        var i = e.currentTarget,
            n = e.keyCode ? e.keyCode : e.which,
            s = "play-on-seeked";

        if (!is$1.keyboardEvent(e) || 39 === n || 37 === n) {
          t.lastSeekTime = Date.now();
          var a = i.hasAttribute(s),
              r = ["mouseup", "touchend", "keyup"].includes(e.type);
          a && r ? (i.removeAttribute(s), silencePromise(t.play())) : !r && t.playing && (i.setAttribute(s, ""), t.pause());
        }
      }), browser.isIos) {
        var s = getElements.call(t, 'input[type="range"]');
        Array.from(s).forEach(function (t) {
          return e.bind(t, n, function (e) {
            return repaint(e.target);
          });
        });
      }

      this.bind(i.inputs.seek, n, function (e) {
        var i = e.currentTarget,
            n = i.getAttribute("seek-value");
        is$1.empty(n) && (n = i.value), i.removeAttribute("seek-value"), t.currentTime = n / i.max * t.duration;
      }, "seek"), this.bind(i.progress, "mouseenter mouseleave mousemove", function (e) {
        return controls.updateSeekTooltip.call(t, e);
      }), this.bind(i.progress, "mousemove touchmove", function (e) {
        var i = t.previewThumbnails;
        i && i.loaded && i.startMove(e);
      }), this.bind(i.progress, "mouseleave touchend click", function () {
        var e = t.previewThumbnails;
        e && e.loaded && e.endMove(!1, !0);
      }), this.bind(i.progress, "mousedown touchstart", function (e) {
        var i = t.previewThumbnails;
        i && i.loaded && i.startScrubbing(e);
      }), this.bind(i.progress, "mouseup touchend", function (e) {
        var i = t.previewThumbnails;
        i && i.loaded && i.endScrubbing(e);
      }), browser.isWebkit && Array.from(getElements.call(t, 'input[type="range"]')).forEach(function (i) {
        e.bind(i, "input", function (e) {
          return controls.updateRangeFill.call(t, e.target);
        });
      }), t.config.toggleInvert && !is$1.element(i.display.duration) && this.bind(i.display.currentTime, "click", function () {
        0 !== t.currentTime && (t.config.invertTime = !t.config.invertTime, controls.timeUpdate.call(t));
      }), this.bind(i.inputs.volume, n, function (e) {
        t.volume = e.target.value;
      }, "volume"), this.bind(i.controls, "mouseenter mouseleave", function (e) {
        i.controls.hover = !t.touch && "mouseenter" === e.type;
      }), i.fullscreen && Array.from(i.fullscreen.children).filter(function (e) {
        return !e.contains(i.container);
      }).forEach(function (n) {
        e.bind(n, "mouseenter mouseleave", function (e) {
          i.controls.hover = !t.touch && "mouseenter" === e.type;
        });
      }), this.bind(i.controls, "mousedown mouseup touchstart touchend touchcancel", function (e) {
        i.controls.pressed = ["mousedown", "touchstart"].includes(e.type);
      }), this.bind(i.controls, "focusin", function () {
        var n = t.config,
            s = t.timers;
        toggleClass(i.controls, n.classNames.noTransition, !0), ui.toggleControls.call(t, !0), setTimeout(function () {
          toggleClass(i.controls, n.classNames.noTransition, !1);
        }, 0);
        var a = e.touch ? 3e3 : 4e3;
        clearTimeout(s.controls), s.controls = setTimeout(function () {
          return ui.toggleControls.call(t, !1);
        }, a);
      }), this.bind(i.inputs.volume, "wheel", function (e) {
        var i = e.webkitDirectionInvertedFromDevice,
            n = _slicedToArray([e.deltaX, -e.deltaY].map(function (e) {
          return i ? -e : e;
        }), 2),
            s = n[0],
            a = n[1],
            r = Math.sign(Math.abs(s) > Math.abs(a) ? s : a);

        t.increaseVolume(r / 50);
        var o = t.media.volume;
        (1 === r && o < 1 || -1 === r && o > 0) && e.preventDefault();
      }, "volume", !1);
    }
  }]), e;
}();

function createCommonjsModule$1(e, t) {
  return e(t = {
    exports: {}
  }, t.exports), t.exports;
}

var loadjs_umd = createCommonjsModule$1(function (e, t) {
  e.exports = function () {
    var e = function e() {},
        t = {},
        i = {},
        n = {};

    function s(e, t) {
      e = e.push ? e : [e];
      var s,
          a,
          r,
          o = [],
          l = e.length,
          c = l;

      for (s = function s(e, i) {
        i.length && o.push(e), --c || t(o);
      }; l--;) {
        a = e[l], (r = i[a]) ? s(a, r) : (n[a] = n[a] || []).push(s);
      }
    }

    function a(e, t) {
      if (e) {
        var s = n[e];
        if (i[e] = t, s) for (; s.length;) {
          s[0](e, t), s.splice(0, 1);
        }
      }
    }

    function r(t, i) {
      t.call && (t = {
        success: t
      }), i.length ? (t.error || e)(i) : (t.success || e)(t);
    }

    function o(t, i, n, s) {
      var a,
          r,
          l = document,
          c = n.async,
          u = (n.numRetries || 0) + 1,
          d = n.before || e,
          h = t.replace(/[\?|#].*$/, ""),
          m = t.replace(/^(css|img)!/, "");
      s = s || 0, /(^css!|\.css$)/.test(h) ? ((r = l.createElement("link")).rel = "stylesheet", r.href = m, (a = "hideFocus" in r) && r.relList && (a = 0, r.rel = "preload", r.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(h) ? (r = l.createElement("img")).src = m : ((r = l.createElement("script")).src = t, r.async = void 0 === c || c), r.onload = r.onerror = r.onbeforeload = function (e) {
        var l = e.type[0];
        if (a) try {
          r.sheet.cssText.length || (l = "e");
        } catch (e) {
          18 != e.code && (l = "e");
        }

        if ("e" == l) {
          if ((s += 1) < u) return o(t, i, n, s);
        } else if ("preload" == r.rel && "style" == r.as) return r.rel = "stylesheet";

        i(t, l, e.defaultPrevented);
      }, !1 !== d(t, r) && l.head.appendChild(r);
    }

    function l(e, t, i) {
      var n,
          s,
          a = (e = e.push ? e : [e]).length,
          r = a,
          l = [];

      for (n = function n(e, i, _n) {
        if ("e" == i && l.push(e), "b" == i) {
          if (!_n) return;
          l.push(e);
        }

        --a || t(l);
      }, s = 0; s < r; s++) {
        o(e[s], n, i);
      }
    }

    function c(e, i, n) {
      var s, o;

      if (i && i.trim && (s = i), o = (s ? n : i) || {}, s) {
        if (s in t) throw "LoadJS";
        t[s] = !0;
      }

      function c(t, i) {
        l(e, function (e) {
          r(o, e), t && r({
            success: t,
            error: i
          }, e), a(s, e);
        }, o);
      }

      if (o.returnPromise) return new Promise(c);
      c();
    }

    return c.ready = function (e, t) {
      return s(e, function (e) {
        r(t, e);
      }), c;
    }, c.done = function (e) {
      a(e, []);
    }, c.reset = function () {
      t = {}, i = {}, n = {};
    }, c.isDefined = function (e) {
      return e in t;
    }, c;
  }();
});

function loadScript(e) {
  return new Promise(function (t, i) {
    loadjs_umd(e, {
      success: t,
      error: i
    });
  });
}

function parseId(e) {
  if (is$1.empty(e)) return null;
  if (is$1.number(Number(e))) return e;
  return e.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : e;
}

function assurePlaybackState(e) {
  e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, triggerEvent.call(this, this.media, e ? "play" : "pause"));
}

var vimeo = {
  setup: function setup() {
    var e = this;
    toggleClass(e.elements.wrapper, e.config.classNames.embed, !0), e.options.speed = e.config.speed.options, setAspectRatio.call(e), is$1.object(window.Vimeo) ? vimeo.ready.call(e) : loadScript(e.config.urls.vimeo.sdk).then(function () {
      vimeo.ready.call(e);
    }).catch(function (t) {
      e.debug.warn("Vimeo SDK (player.js) failed to load", t);
    });
  },
  ready: function ready() {
    var e = this,
        t = this,
        i = t.config.vimeo,
        n = i.premium,
        s = i.referrerPolicy,
        a = _objectWithoutProperties(i, ["premium", "referrerPolicy"]);

    n && Object.assign(a, {
      controls: !1,
      sidedock: !1
    });
    var r = buildUrlParams(_objectSpread2$1({
      loop: t.config.loop.active,
      autoplay: t.autoplay,
      muted: t.muted,
      gesture: "media",
      playsinline: !this.config.fullscreen.iosNative
    }, a)),
        o = t.media.getAttribute("src");
    is$1.empty(o) && (o = t.media.getAttribute(t.config.attributes.embed.id));
    var l = parseId(o),
        c = createElement("iframe"),
        u = format(t.config.urls.vimeo.iframe, l, r);
    c.setAttribute("src", u), c.setAttribute("allowfullscreen", ""), c.setAttribute("allow", "autoplay,fullscreen,picture-in-picture"), is$1.empty(s) || c.setAttribute("referrerPolicy", s);
    var d = t.poster;
    if (n) c.setAttribute("data-poster", d), t.media = replaceElement(c, t.media);else {
      var h = createElement("div", {
        class: t.config.classNames.embedContainer,
        "data-poster": d
      });
      h.appendChild(c), t.media = replaceElement(h, t.media);
    }
    fetch(format(t.config.urls.vimeo.api, l), "json").then(function (e) {
      if (!is$1.empty(e)) {
        var i = new URL(e[0].thumbnail_large);
        i.pathname = "".concat(i.pathname.split("_")[0], ".jpg"), ui.setPoster.call(t, i.href).catch(function () {});
      }
    }), t.embed = new window.Vimeo.Player(c, {
      autopause: t.config.autopause,
      muted: t.muted
    }), t.media.paused = !0, t.media.currentTime = 0, t.supported.ui && t.embed.disableTextTrack(), t.media.play = function () {
      return assurePlaybackState.call(t, !0), t.embed.play();
    }, t.media.pause = function () {
      return assurePlaybackState.call(t, !1), t.embed.pause();
    }, t.media.stop = function () {
      t.pause(), t.currentTime = 0;
    };
    var m = t.media.currentTime;
    Object.defineProperty(t.media, "currentTime", {
      get: function get() {
        return m;
      },
      set: function set(e) {
        var i = t.embed,
            n = t.media,
            s = t.paused,
            a = t.volume,
            r = s && !i.hasPlayed;
        n.seeking = !0, triggerEvent.call(t, n, "seeking"), Promise.resolve(r && i.setVolume(0)).then(function () {
          return i.setCurrentTime(e);
        }).then(function () {
          return r && i.pause();
        }).then(function () {
          return r && i.setVolume(a);
        }).catch(function () {});
      }
    });
    var p = t.config.speed.selected;
    Object.defineProperty(t.media, "playbackRate", {
      get: function get() {
        return p;
      },
      set: function set(e) {
        t.embed.setPlaybackRate(e).then(function () {
          p = e, triggerEvent.call(t, t.media, "ratechange");
        }).catch(function () {
          t.options.speed = [1];
        });
      }
    });
    var g = t.config.volume;
    Object.defineProperty(t.media, "volume", {
      get: function get() {
        return g;
      },
      set: function set(e) {
        t.embed.setVolume(e).then(function () {
          g = e, triggerEvent.call(t, t.media, "volumechange");
        });
      }
    });
    var f = t.config.muted;
    Object.defineProperty(t.media, "muted", {
      get: function get() {
        return f;
      },
      set: function set(e) {
        var i = !!is$1.boolean(e) && e;
        t.embed.setVolume(i ? 0 : t.config.volume).then(function () {
          f = i, triggerEvent.call(t, t.media, "volumechange");
        });
      }
    });
    var y,
        v = t.config.loop;
    Object.defineProperty(t.media, "loop", {
      get: function get() {
        return v;
      },
      set: function set(e) {
        var i = is$1.boolean(e) ? e : t.config.loop.active;
        t.embed.setLoop(i).then(function () {
          v = i;
        });
      }
    }), t.embed.getVideoUrl().then(function (e) {
      y = e, controls.setDownloadUrl.call(t);
    }).catch(function (t) {
      e.debug.warn(t);
    }), Object.defineProperty(t.media, "currentSrc", {
      get: function get() {
        return y;
      }
    }), Object.defineProperty(t.media, "ended", {
      get: function get() {
        return t.currentTime === t.duration;
      }
    }), Promise.all([t.embed.getVideoWidth(), t.embed.getVideoHeight()]).then(function (i) {
      var n = _slicedToArray(i, 2),
          s = n[0],
          a = n[1];

      t.embed.ratio = [s, a], setAspectRatio.call(e);
    }), t.embed.setAutopause(t.config.autopause).then(function (e) {
      t.config.autopause = e;
    }), t.embed.getVideoTitle().then(function (i) {
      t.config.title = i, ui.setTitle.call(e);
    }), t.embed.getCurrentTime().then(function (e) {
      m = e, triggerEvent.call(t, t.media, "timeupdate");
    }), t.embed.getDuration().then(function (e) {
      t.media.duration = e, triggerEvent.call(t, t.media, "durationchange");
    }), t.embed.getTextTracks().then(function (e) {
      t.media.textTracks = e, captions.setup.call(t);
    }), t.embed.on("cuechange", function (e) {
      var i = e.cues,
          n = (void 0 === i ? [] : i).map(function (e) {
        return stripHTML(e.text);
      });
      captions.updateCues.call(t, n);
    }), t.embed.on("loaded", function () {
      (t.embed.getPaused().then(function (e) {
        assurePlaybackState.call(t, !e), e || triggerEvent.call(t, t.media, "playing");
      }), is$1.element(t.embed.element) && t.supported.ui) && t.embed.element.setAttribute("tabindex", -1);
    }), t.embed.on("bufferstart", function () {
      triggerEvent.call(t, t.media, "waiting");
    }), t.embed.on("bufferend", function () {
      triggerEvent.call(t, t.media, "playing");
    }), t.embed.on("play", function () {
      assurePlaybackState.call(t, !0), triggerEvent.call(t, t.media, "playing");
    }), t.embed.on("pause", function () {
      assurePlaybackState.call(t, !1);
    }), t.embed.on("timeupdate", function (e) {
      t.media.seeking = !1, m = e.seconds, triggerEvent.call(t, t.media, "timeupdate");
    }), t.embed.on("progress", function (e) {
      t.media.buffered = e.percent, triggerEvent.call(t, t.media, "progress"), 1 === parseInt(e.percent, 10) && triggerEvent.call(t, t.media, "canplaythrough"), t.embed.getDuration().then(function (e) {
        e !== t.media.duration && (t.media.duration = e, triggerEvent.call(t, t.media, "durationchange"));
      });
    }), t.embed.on("seeked", function () {
      t.media.seeking = !1, triggerEvent.call(t, t.media, "seeked");
    }), t.embed.on("ended", function () {
      t.media.paused = !0, triggerEvent.call(t, t.media, "ended");
    }), t.embed.on("error", function (e) {
      t.media.error = e, triggerEvent.call(t, t.media, "error");
    }), setTimeout(function () {
      return ui.build.call(t);
    }, 0);
  }
};

function parseId$1(e) {
  if (is$1.empty(e)) return null;
  return e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : e;
}

function assurePlaybackState$1(e) {
  e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, triggerEvent.call(this, this.media, e ? "play" : "pause"));
}

function getHost$1(e) {
  return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0;
}

var youtube = {
  setup: function setup() {
    var e = this;
    if (toggleClass(this.elements.wrapper, this.config.classNames.embed, !0), is$1.object(window.YT) && is$1.function(window.YT.Player)) youtube.ready.call(this);else {
      var t = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        is$1.function(t) && t(), youtube.ready.call(e);
      }, loadScript(this.config.urls.youtube.sdk).catch(function (t) {
        e.debug.warn("YouTube API failed to load", t);
      });
    }
  },
  getTitle: function getTitle(e) {
    var t = this;
    fetch(format(this.config.urls.youtube.api, e)).then(function (e) {
      if (is$1.object(e)) {
        var i = e.title,
            n = e.height,
            s = e.width;
        t.config.title = i, ui.setTitle.call(t), t.embed.ratio = [s, n];
      }

      setAspectRatio.call(t);
    }).catch(function () {
      setAspectRatio.call(t);
    });
  },
  ready: function ready() {
    var e = this,
        t = e.media && e.media.getAttribute("id");

    if (is$1.empty(t) || !t.startsWith("youtube-")) {
      var i = e.media.getAttribute("src");
      is$1.empty(i) && (i = e.media.getAttribute(this.config.attributes.embed.id));
      var n = parseId$1(i),
          s = generateId(e.provider),
          a = createElement("div", {
        id: s,
        "data-poster": e.poster
      });
      e.media = replaceElement(a, e.media);

      var r = function r(e) {
        return "https://i.ytimg.com/vi/".concat(n, "/").concat(e, "default.jpg");
      };

      loadImage(r("maxres"), 121).catch(function () {
        return loadImage(r("sd"), 121);
      }).catch(function () {
        return loadImage(r("hq"));
      }).then(function (t) {
        return ui.setPoster.call(e, t.src);
      }).then(function (t) {
        t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover");
      }).catch(function () {});
      var o = e.config.youtube;
      e.embed = new window.YT.Player(s, {
        videoId: n,
        host: getHost$1(o),
        playerVars: extend({}, {
          autoplay: e.config.autoplay ? 1 : 0,
          hl: e.config.hl,
          controls: e.supported.ui ? 0 : 1,
          disablekb: 1,
          playsinline: e.config.fullscreen.iosNative ? 0 : 1,
          cc_load_policy: e.captions.active ? 1 : 0,
          cc_lang_pref: e.config.captions.language,
          widget_referrer: window ? window.location.href : null
        }, o),
        events: {
          onError: function onError(t) {
            if (!e.media.error) {
              var i = t.data,
                  n = {
                2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                101: "The owner of the requested video does not allow it to be played in embedded players.",
                150: "The owner of the requested video does not allow it to be played in embedded players."
              }[i] || "An unknown error occured";
              e.media.error = {
                code: i,
                message: n
              }, triggerEvent.call(e, e.media, "error");
            }
          },
          onPlaybackRateChange: function onPlaybackRateChange(t) {
            var i = t.target;
            e.media.playbackRate = i.getPlaybackRate(), triggerEvent.call(e, e.media, "ratechange");
          },
          onReady: function onReady(t) {
            if (!is$1.function(e.media.play)) {
              var i = t.target;
              youtube.getTitle.call(e, n), e.media.play = function () {
                assurePlaybackState$1.call(e, !0), i.playVideo();
              }, e.media.pause = function () {
                assurePlaybackState$1.call(e, !1), i.pauseVideo();
              }, e.media.stop = function () {
                i.stopVideo();
              }, e.media.duration = i.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
                get: function get() {
                  return Number(i.getCurrentTime());
                },
                set: function set(t) {
                  e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, triggerEvent.call(e, e.media, "seeking"), i.seekTo(t);
                }
              }), Object.defineProperty(e.media, "playbackRate", {
                get: function get() {
                  return i.getPlaybackRate();
                },
                set: function set(e) {
                  i.setPlaybackRate(e);
                }
              });
              var s = e.config.volume;
              Object.defineProperty(e.media, "volume", {
                get: function get() {
                  return s;
                },
                set: function set(t) {
                  s = t, i.setVolume(100 * s), triggerEvent.call(e, e.media, "volumechange");
                }
              });
              var a = e.config.muted;
              Object.defineProperty(e.media, "muted", {
                get: function get() {
                  return a;
                },
                set: function set(t) {
                  var n = is$1.boolean(t) ? t : a;
                  a = n, i[n ? "mute" : "unMute"](), triggerEvent.call(e, e.media, "volumechange");
                }
              }), Object.defineProperty(e.media, "currentSrc", {
                get: function get() {
                  return i.getVideoUrl();
                }
              }), Object.defineProperty(e.media, "ended", {
                get: function get() {
                  return e.currentTime === e.duration;
                }
              });
              var r = i.getAvailablePlaybackRates();
              e.options.speed = r.filter(function (t) {
                return e.config.speed.options.includes(t);
              }), e.supported.ui && e.media.setAttribute("tabindex", -1), triggerEvent.call(e, e.media, "timeupdate"), triggerEvent.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(function () {
                e.media.buffered = i.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && triggerEvent.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), triggerEvent.call(e, e.media, "canplaythrough"));
              }, 200), setTimeout(function () {
                return ui.build.call(e);
              }, 50);
            }
          },
          onStateChange: function onStateChange(t) {
            var i = t.target;

            switch (clearInterval(e.timers.playing), e.media.seeking && [1, 2].includes(t.data) && (e.media.seeking = !1, triggerEvent.call(e, e.media, "seeked")), t.data) {
              case -1:
                triggerEvent.call(e, e.media, "timeupdate"), e.media.buffered = i.getVideoLoadedFraction(), triggerEvent.call(e, e.media, "progress");
                break;

              case 0:
                assurePlaybackState$1.call(e, !1), e.media.loop ? (i.stopVideo(), i.playVideo()) : triggerEvent.call(e, e.media, "ended");
                break;

              case 1:
                e.config.autoplay || !e.media.paused || e.embed.hasPlayed ? (assurePlaybackState$1.call(e, !0), triggerEvent.call(e, e.media, "playing"), e.timers.playing = setInterval(function () {
                  triggerEvent.call(e, e.media, "timeupdate");
                }, 50), e.media.duration !== i.getDuration() && (e.media.duration = i.getDuration(), triggerEvent.call(e, e.media, "durationchange"))) : e.media.pause();
                break;

              case 2:
                e.muted || e.embed.unMute(), assurePlaybackState$1.call(e, !1);
                break;

              case 3:
                triggerEvent.call(e, e.media, "waiting");
            }

            triggerEvent.call(e, e.elements.container, "statechange", !1, {
              code: t.data
            });
          }
        }
      });
    }
  }
},
    media = {
  setup: function setup() {
    this.media ? (toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), toggleClass(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = createElement("div", {
      class: this.config.classNames.video
    }), wrap$1(this.media, this.elements.wrapper), this.elements.poster = createElement("div", {
      class: this.config.classNames.poster
    }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? html5.setup.call(this) : this.isYouTube ? youtube.setup.call(this) : this.isVimeo && vimeo.setup.call(this)) : this.debug.warn("No media element found!");
  }
},
    destroy = function destroy(e) {
  e.manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove();
},
    Ads = function () {
  function e(t) {
    var i = this;
    _classCallCheck(this, e), this.player = t, this.config = t.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
      container: null,
      displayContainer: null
    }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise(function (e, t) {
      i.on("loaded", e), i.on("error", t);
    }), this.load();
  }

  return _createClass(e, [{
    key: "load",
    value: function value() {
      var e = this;
      this.enabled && (is$1.object(window.google) && is$1.object(window.google.ima) ? this.ready() : loadScript(this.player.config.urls.googleIMA.sdk).then(function () {
        e.ready();
      }).catch(function () {
        e.trigger("error", new Error("Google IMA SDK failed to load"));
      }));
    }
  }, {
    key: "ready",
    value: function value() {
      var e = this;
      this.enabled || destroy(this), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(function () {
        e.clearSafetyTimer("onAdsManagerLoaded()");
      }), this.listeners(), this.setupIMA();
    }
  }, {
    key: "setupIMA",
    value: function value() {
      var e = this;
      this.elements.container = createElement("div", {
        class: this.player.config.classNames.ads
      }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function (t) {
        return e.onAdsManagerLoaded(t);
      }, !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (t) {
        return e.onAdError(t);
      }, !1), this.requestAds();
    }
  }, {
    key: "requestAds",
    value: function value() {
      var e = this.player.elements.container;

      try {
        var t = new google.ima.AdsRequest();
        t.adTagUrl = this.tagUrl, t.linearAdSlotWidth = e.offsetWidth, t.linearAdSlotHeight = e.offsetHeight, t.nonLinearAdSlotWidth = e.offsetWidth, t.nonLinearAdSlotHeight = e.offsetHeight, t.forceNonLinearFullSlot = !1, t.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(t);
      } catch (e) {
        this.onAdError(e);
      }
    }
  }, {
    key: "pollCountdown",
    value: function value() {
      var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      if (!t) return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");

      var i = function i() {
        var t = _formatTime(Math.max(e.manager.getRemainingTime(), 0)),
            i = "".concat(i18n.get("advertisement", e.player.config), " - ").concat(t);

        e.elements.container.setAttribute("data-badge-text", i);
      };

      this.countdownTimer = setInterval(i, 100);
    }
  }, {
    key: "onAdsManagerLoaded",
    value: function value(e) {
      var t = this;

      if (this.enabled) {
        var i = new google.ima.AdsRenderingSettings();
        i.restoreCustomPlaybackStateOnAdBreakComplete = !0, i.enablePreloading = !0, this.manager = e.getAdsManager(this.player, i), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (e) {
          return t.onAdError(e);
        }), Object.keys(google.ima.AdEvent.Type).forEach(function (e) {
          t.manager.addEventListener(google.ima.AdEvent.Type[e], function (e) {
            return t.onAdEvent(e);
          });
        }), this.trigger("loaded");
      }
    }
  }, {
    key: "addCuePoints",
    value: function value() {
      var e = this;
      is$1.empty(this.cuePoints) || this.cuePoints.forEach(function (t) {
        if (0 !== t && -1 !== t && t < e.player.duration) {
          var i = e.player.elements.progress;

          if (is$1.element(i)) {
            var n = 100 / e.player.duration * t,
                s = createElement("span", {
              class: e.player.config.classNames.cues
            });
            s.style.left = "".concat(n.toString(), "%"), i.appendChild(s);
          }
        }
      });
    }
  }, {
    key: "onAdEvent",
    value: function value(e) {
      var t,
          i = this,
          n = this.player.elements.container,
          s = e.getAd(),
          a = e.getAdData();

      switch (t = e.type, triggerEvent.call(i.player, i.player.media, "ads".concat(t.replace(/_/g, "").toLowerCase())), e.type) {
        case google.ima.AdEvent.Type.LOADED:
          this.trigger("loaded"), this.pollCountdown(!0), s.isLinear() || (s.width = n.offsetWidth, s.height = n.offsetHeight);
          break;

        case google.ima.AdEvent.Type.STARTED:
          this.manager.setVolume(this.player.volume);
          break;

        case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
          this.player.ended ? this.loadAds() : this.loader.contentComplete();
          break;

        case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
          this.pauseContent();
          break;

        case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
          this.pollCountdown(), this.resumeContent();
          break;

        case google.ima.AdEvent.Type.LOG:
          a.adError && this.player.debug.warn("Non-fatal ad error: ".concat(a.adError.getMessage()));
      }
    }
  }, {
    key: "onAdError",
    value: function value(e) {
      this.cancel(), this.player.debug.warn("Ads error", e);
    }
  }, {
    key: "listeners",
    value: function value() {
      var e,
          t = this,
          i = this.player.elements.container;
      this.player.on("canplay", function () {
        t.addCuePoints();
      }), this.player.on("ended", function () {
        t.loader.contentComplete();
      }), this.player.on("timeupdate", function () {
        e = t.player.currentTime;
      }), this.player.on("seeked", function () {
        var i = t.player.currentTime;
        is$1.empty(t.cuePoints) || t.cuePoints.forEach(function (n, s) {
          e < n && n < i && (t.manager.discardAdBreak(), t.cuePoints.splice(s, 1));
        });
      }), window.addEventListener("resize", function () {
        t.manager && t.manager.resize(i.offsetWidth, i.offsetHeight, google.ima.ViewMode.NORMAL);
      });
    }
  }, {
    key: "play",
    value: function value() {
      var e = this,
          t = this.player.elements.container;
      this.managerPromise || this.resumeContent(), this.managerPromise.then(function () {
        e.manager.setVolume(e.player.volume), e.elements.displayContainer.initialize();

        try {
          e.initialized || (e.manager.init(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL), e.manager.start()), e.initialized = !0;
        } catch (t) {
          e.onAdError(t);
        }
      }).catch(function () {});
    }
  }, {
    key: "resumeContent",
    value: function value() {
      this.elements.container.style.zIndex = "", this.playing = !1, silencePromise(this.player.media.play());
    }
  }, {
    key: "pauseContent",
    value: function value() {
      this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause();
    }
  }, {
    key: "cancel",
    value: function value() {
      this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds();
    }
  }, {
    key: "loadAds",
    value: function value() {
      var e = this;
      this.managerPromise.then(function () {
        e.manager && e.manager.destroy(), e.managerPromise = new Promise(function (t) {
          e.on("loaded", t), e.player.debug.log(e.manager);
        }), e.initialized = !1, e.requestAds();
      }).catch(function () {});
    }
  }, {
    key: "trigger",
    value: function value(e) {
      for (var t = this, i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++) {
        n[s - 1] = arguments[s];
      }

      var a = this.events[e];
      is$1.array(a) && a.forEach(function (e) {
        is$1.function(e) && e.apply(t, n);
      });
    }
  }, {
    key: "on",
    value: function value(e, t) {
      return is$1.array(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this;
    }
  }, {
    key: "startSafetyTimer",
    value: function value(e, t) {
      var i = this;
      this.player.debug.log("Safety timer invoked from: ".concat(t)), this.safetyTimer = setTimeout(function () {
        i.cancel(), i.clearSafetyTimer("startSafetyTimer()");
      }, e);
    }
  }, {
    key: "clearSafetyTimer",
    value: function value(e) {
      is$1.nullOrUndefined(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: ".concat(e)), clearTimeout(this.safetyTimer), this.safetyTimer = null);
    }
  }, {
    key: "enabled",
    get: function get() {
      var e = this.config;
      return this.player.isHTML5 && this.player.isVideo && e.enabled && (!is$1.empty(e.publisherId) || is$1.url(e.tagUrl));
    }
  }, {
    key: "tagUrl",
    get: function get() {
      var e = this.config;
      if (is$1.url(e.tagUrl)) return e.tagUrl;
      var t = {
        AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
        AV_CHANNELID: "5a0458dc28a06145e4519d21",
        AV_URL: window.location.hostname,
        cb: Date.now(),
        AV_WIDTH: 640,
        AV_HEIGHT: 480,
        AV_CDIM2: e.publisherId
      };
      return "".concat("https://go.aniview.com/api/adserver6/vast/", "?").concat(buildUrlParams(t));
    }
  }]), e;
}(),
    parseVtt = function parseVtt(e) {
  var t = [];
  return e.split(/\r\n\r\n|\n\n|\r\r/).forEach(function (e) {
    var i = {};
    e.split(/\r\n|\n|\r/).forEach(function (e) {
      if (is$1.number(i.startTime)) {
        if (!is$1.empty(e.trim()) && is$1.empty(i.text)) {
          var t = e.trim().split("#xywh="),
              n = _slicedToArray(t, 1);

          if (i.text = n[0], t[1]) {
            var s = _slicedToArray(t[1].split(","), 4);

            i.x = s[0], i.y = s[1], i.w = s[2], i.h = s[3];
          }
        }
      } else {
        var a = e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
        a && (i.startTime = 60 * Number(a[1] || 0) * 60 + 60 * Number(a[2]) + Number(a[3]) + Number("0.".concat(a[4])), i.endTime = 60 * Number(a[6] || 0) * 60 + 60 * Number(a[7]) + Number(a[8]) + Number("0.".concat(a[9])));
      }
    }), i.text && t.push(i);
  }), t;
},
    fitRatio = function fitRatio(e, t) {
  var i = {};
  return e > t.width / t.height ? (i.width = t.width, i.height = 1 / e * t.width) : (i.height = t.height, i.width = e * t.height), i;
},
    PreviewThumbnails = function () {
  function e(t) {
    _classCallCheck(this, e), this.player = t, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
      thumb: {},
      scrubbing: {}
    }, this.load();
  }

  return _createClass(e, [{
    key: "load",
    value: function value() {
      var e = this;
      this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then(function () {
        e.enabled && (e.render(), e.determineContainerAutoSizing(), e.loaded = !0);
      });
    }
  }, {
    key: "getThumbnails",
    value: function value() {
      var e = this;
      return new Promise(function (t) {
        var i = e.player.config.previewThumbnails.src;
        if (is$1.empty(i)) throw new Error("Missing previewThumbnails.src config attribute");

        var n = function n() {
          e.thumbnails.sort(function (e, t) {
            return e.height - t.height;
          }), e.player.debug.log("Preview thumbnails", e.thumbnails), t();
        };

        if (is$1.function(i)) i(function (t) {
          e.thumbnails = t, n();
        });else {
          var s = (is$1.string(i) ? [i] : i).map(function (t) {
            return e.getThumbnail(t);
          });
          Promise.all(s).then(n);
        }
      });
    }
  }, {
    key: "getThumbnail",
    value: function value(e) {
      var t = this;
      return new Promise(function (i) {
        fetch(e).then(function (n) {
          var s = {
            frames: parseVtt(n),
            height: null,
            urlPrefix: ""
          };
          s.frames[0].text.startsWith("/") || s.frames[0].text.startsWith("http://") || s.frames[0].text.startsWith("https://") || (s.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1));
          var a = new Image();
          a.onload = function () {
            s.height = a.naturalHeight, s.width = a.naturalWidth, t.thumbnails.push(s), i();
          }, a.src = s.urlPrefix + s.frames[0].text;
        });
      });
    }
  }, {
    key: "startMove",
    value: function value(e) {
      if (this.loaded && is$1.event(e) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration) {
        if ("touchmove" === e.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);else {
          var t = this.player.elements.progress.getBoundingClientRect(),
              i = 100 / t.width * (e.pageX - t.left);
          this.seekTime = this.player.media.duration * (i / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = _formatTime(this.seekTime);
        }
        this.showImageAtCurrentTime();
      }
    }
  }, {
    key: "endMove",
    value: function value() {
      this.toggleThumbContainer(!1, !0);
    }
  }, {
    key: "startScrubbing",
    value: function value(e) {
      (is$1.nullOrUndefined(e.button) || !1 === e.button || 0 === e.button) && (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime()));
    }
  }, {
    key: "endScrubbing",
    value: function value() {
      var e = this;
      this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : once.call(this.player, this.player.media, "timeupdate", function () {
        e.mouseDown || e.toggleScrubbingContainer(!1);
      });
    }
  }, {
    key: "listeners",
    value: function value() {
      var e = this;
      this.player.on("play", function () {
        e.toggleThumbContainer(!1, !0);
      }), this.player.on("seeked", function () {
        e.toggleThumbContainer(!1);
      }), this.player.on("timeupdate", function () {
        e.lastTime = e.player.media.currentTime;
      });
    }
  }, {
    key: "render",
    value: function value() {
      this.elements.thumb.container = createElement("div", {
        class: this.player.config.classNames.previewThumbnails.thumbContainer
      }), this.elements.thumb.imageContainer = createElement("div", {
        class: this.player.config.classNames.previewThumbnails.imageContainer
      }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
      var e = createElement("div", {
        class: this.player.config.classNames.previewThumbnails.timeContainer
      });
      this.elements.thumb.time = createElement("span", {}, "00:00"), e.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e), is$1.element(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = createElement("div", {
        class: this.player.config.classNames.previewThumbnails.scrubbingContainer
      }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container);
    }
  }, {
    key: "destroy",
    value: function value() {
      this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove();
    }
  }, {
    key: "showImageAtCurrentTime",
    value: function value() {
      var e = this;
      this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
      var t = this.thumbnails[0].frames.findIndex(function (t) {
        return e.seekTime >= t.startTime && e.seekTime <= t.endTime;
      }),
          i = t >= 0,
          n = 0;
      this.mouseDown || this.toggleThumbContainer(i), i && (this.thumbnails.forEach(function (i, s) {
        e.loadedImages.includes(i.frames[t].text) && (n = s);
      }), t !== this.showingThumb && (this.showingThumb = t, this.loadImage(n)));
    }
  }, {
    key: "loadImage",
    value: function value() {
      var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          i = this.showingThumb,
          n = this.thumbnails[t],
          s = n.urlPrefix,
          a = n.frames[i],
          r = n.frames[i].text,
          o = s + r;
      if (this.currentImageElement && this.currentImageElement.dataset.filename === r) this.showImage(this.currentImageElement, a, t, i, r, !1), this.currentImageElement.dataset.index = i, this.removeOldImages(this.currentImageElement);else {
        this.loadingImage && this.usingSprites && (this.loadingImage.onload = null);
        var l = new Image();
        l.src = o, l.dataset.index = i, l.dataset.filename = r, this.showingThumbFilename = r, this.player.debug.log("Loading image: ".concat(o)), l.onload = function () {
          return e.showImage(l, a, t, i, r, !0);
        }, this.loadingImage = l, this.removeOldImages(l);
      }
    }
  }, {
    key: "showImage",
    value: function value(e, t, i, n, s) {
      var a = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5];
      this.player.debug.log("Showing thumb: ".concat(s, ". num: ").concat(n, ". qual: ").concat(i, ". newimg: ").concat(a)), this.setImageSizeAndOffset(e, t), a && (this.currentImageContainer.appendChild(e), this.currentImageElement = e, this.loadedImages.includes(s) || this.loadedImages.push(s)), this.preloadNearby(n, !0).then(this.preloadNearby(n, !1)).then(this.getHigherQuality(i, e, t, s));
    }
  }, {
    key: "removeOldImages",
    value: function value(e) {
      var t = this;
      Array.from(this.currentImageContainer.children).forEach(function (i) {
        if ("img" === i.tagName.toLowerCase()) {
          var n = t.usingSprites ? 500 : 1e3;

          if (i.dataset.index !== e.dataset.index && !i.dataset.deleting) {
            i.dataset.deleting = !0;
            var s = t.currentImageContainer;
            setTimeout(function () {
              s.removeChild(i), t.player.debug.log("Removing thumb: ".concat(i.dataset.filename));
            }, n);
          }
        }
      });
    }
  }, {
    key: "preloadNearby",
    value: function value(e) {
      var t = this,
          i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
      return new Promise(function (n) {
        setTimeout(function () {
          var s = t.thumbnails[0].frames[e].text;

          if (t.showingThumbFilename === s) {
            var a;
            a = i ? t.thumbnails[0].frames.slice(e) : t.thumbnails[0].frames.slice(0, e).reverse();
            var r = !1;
            a.forEach(function (e) {
              var i = e.text;

              if (i !== s && !t.loadedImages.includes(i)) {
                r = !0, t.player.debug.log("Preloading thumb filename: ".concat(i));
                var a = t.thumbnails[0].urlPrefix + i,
                    o = new Image();
                o.src = a, o.onload = function () {
                  t.player.debug.log("Preloaded thumb filename: ".concat(i)), t.loadedImages.includes(i) || t.loadedImages.push(i), n();
                };
              }
            }), r || n();
          }
        }, 300);
      });
    }
  }, {
    key: "getHigherQuality",
    value: function value(e, t, i, n) {
      var s = this;

      if (e < this.thumbnails.length - 1) {
        var a = t.naturalHeight;
        this.usingSprites && (a = i.h), a < this.thumbContainerHeight && setTimeout(function () {
          s.showingThumbFilename === n && (s.player.debug.log("Showing higher quality thumb for: ".concat(n)), s.loadImage(e + 1));
        }, 300);
      }
    }
  }, {
    key: "toggleThumbContainer",
    value: function value() {
      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          i = this.player.config.classNames.previewThumbnails.thumbContainerShown;
      this.elements.thumb.container.classList.toggle(i, e), !e && t && (this.showingThumb = null, this.showingThumbFilename = null);
    }
  }, {
    key: "toggleScrubbingContainer",
    value: function value() {
      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
      this.elements.scrubbing.container.classList.toggle(t, e), e || (this.showingThumb = null, this.showingThumbFilename = null);
    }
  }, {
    key: "determineContainerAutoSizing",
    value: function value() {
      (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) && (this.sizeSpecifiedInCSS = !0);
    }
  }, {
    key: "setThumbContainerSizeAndPos",
    value: function value() {
      if (this.sizeSpecifiedInCSS) {
        if (this.elements.thumb.imageContainer.clientHeight > 20 && this.elements.thumb.imageContainer.clientWidth < 20) {
          var e = Math.floor(this.elements.thumb.imageContainer.clientHeight * this.thumbAspectRatio);
          this.elements.thumb.imageContainer.style.width = "".concat(e, "px");
        } else if (this.elements.thumb.imageContainer.clientHeight < 20 && this.elements.thumb.imageContainer.clientWidth > 20) {
          var t = Math.floor(this.elements.thumb.imageContainer.clientWidth / this.thumbAspectRatio);
          this.elements.thumb.imageContainer.style.height = "".concat(t, "px");
        }
      } else {
        var i = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
        this.elements.thumb.imageContainer.style.height = "".concat(this.thumbContainerHeight, "px"), this.elements.thumb.imageContainer.style.width = "".concat(i, "px");
      }

      this.setThumbContainerPos();
    }
  }, {
    key: "setThumbContainerPos",
    value: function value() {
      var e = this.player.elements.progress.getBoundingClientRect(),
          t = this.player.elements.container.getBoundingClientRect(),
          i = this.elements.thumb.container,
          n = t.left - e.left + 10,
          s = t.right - e.left - i.clientWidth - 10,
          a = this.mousePosX - e.left - i.clientWidth / 2;
      a < n && (a = n), a > s && (a = s), i.style.left = "".concat(a, "px");
    }
  }, {
    key: "setScrubbingContainerSize",
    value: function value() {
      var e = fitRatio(this.thumbAspectRatio, {
        width: this.player.media.clientWidth,
        height: this.player.media.clientHeight
      }),
          t = e.width,
          i = e.height;
      this.elements.scrubbing.container.style.width = "".concat(t, "px"), this.elements.scrubbing.container.style.height = "".concat(i, "px");
    }
  }, {
    key: "setImageSizeAndOffset",
    value: function value(e, t) {
      if (this.usingSprites) {
        var i = this.thumbContainerHeight / t.h;
        e.style.height = "".concat(e.naturalHeight * i, "px"), e.style.width = "".concat(e.naturalWidth * i, "px"), e.style.left = "-".concat(t.x * i, "px"), e.style.top = "-".concat(t.y * i, "px");
      }
    }
  }, {
    key: "enabled",
    get: function get() {
      return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled;
    }
  }, {
    key: "currentImageContainer",
    get: function get() {
      return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer;
    }
  }, {
    key: "usingSprites",
    get: function get() {
      return Object.keys(this.thumbnails[0].frames[0]).includes("w");
    }
  }, {
    key: "thumbAspectRatio",
    get: function get() {
      return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height;
    }
  }, {
    key: "thumbContainerHeight",
    get: function get() {
      return this.mouseDown ? fitRatio(this.thumbAspectRatio, {
        width: this.player.media.clientWidth,
        height: this.player.media.clientHeight
      }).height : this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
    }
  }, {
    key: "currentImageElement",
    get: function get() {
      return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement;
    },
    set: function set(e) {
      this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e;
    }
  }]), e;
}(),
    source = {
  insertElements: function insertElements(e, t) {
    var i = this;
    is$1.string(t) ? insertElement(e, this.media, {
      src: t
    }) : is$1.array(t) && t.forEach(function (t) {
      insertElement(e, i.media, t);
    });
  },
  change: function change(e) {
    var t = this;
    getDeep(e, "sources.length") ? (html5.cancelRequests.call(this), this.destroy.call(this, function () {
      t.options.quality = [], removeElement(t.media), t.media = null, is$1.element(t.elements.container) && t.elements.container.removeAttribute("class");

      var i = e.sources,
          n = e.type,
          s = _slicedToArray(i, 1)[0],
          a = s.provider,
          r = void 0 === a ? providers.html5 : a,
          o = s.src,
          l = "html5" === r ? n : "div",
          c = "html5" === r ? {} : {
        src: o
      };

      Object.assign(t, {
        provider: r,
        type: n,
        supported: support.check(n, r, t.config.playsinline),
        media: createElement(l, c)
      }), t.elements.container.appendChild(t.media), is$1.boolean(e.autoplay) && (t.config.autoplay = e.autoplay), t.isHTML5 && (t.config.crossorigin && t.media.setAttribute("crossorigin", ""), t.config.autoplay && t.media.setAttribute("autoplay", ""), is$1.empty(e.poster) || (t.poster = e.poster), t.config.loop.active && t.media.setAttribute("loop", ""), t.config.muted && t.media.setAttribute("muted", ""), t.config.playsinline && t.media.setAttribute("playsinline", "")), ui.addStyleHook.call(t), t.isHTML5 && source.insertElements.call(t, "source", i), t.config.title = e.title, media.setup.call(t), t.isHTML5 && Object.keys(e).includes("tracks") && source.insertElements.call(t, "track", e.tracks), (t.isHTML5 || t.isEmbed && !t.supported.ui) && ui.build.call(t), t.isHTML5 && t.media.load(), is$1.empty(e.previewThumbnails) || (Object.assign(t.config.previewThumbnails, e.previewThumbnails), t.previewThumbnails && t.previewThumbnails.loaded && (t.previewThumbnails.destroy(), t.previewThumbnails = null), t.config.previewThumbnails.enabled && (t.previewThumbnails = new PreviewThumbnails(t))), t.fullscreen.update();
    }, !0)) : this.debug.warn("Invalid source format");
  }
};

function clamp() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
      t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
      i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 255;
  return Math.min(Math.max(e, t), i);
}

var Plyr = function () {
  function e(t, i) {
    var n = this;
    if (_classCallCheck(this, e), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = support.touch, this.media = t, is$1.string(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || is$1.nodeList(this.media) || is$1.array(this.media)) && (this.media = this.media[0]), this.config = extend({}, defaults$1, e.defaults, i || {}, function () {
      try {
        return JSON.parse(n.media.getAttribute("data-plyr-config"));
      } catch (e) {
        return {};
      }
    }()), this.elements = {
      container: null,
      fullscreen: null,
      captions: null,
      buttons: {},
      display: {},
      progress: {},
      inputs: {},
      settings: {
        popup: null,
        menu: null,
        panels: {},
        buttons: {}
      }
    }, this.captions = {
      active: null,
      currentTrack: -1,
      meta: new WeakMap()
    }, this.fullscreen = {
      active: !1
    }, this.options = {
      speed: [],
      quality: []
    }, this.debug = new Console(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", support), !is$1.nullOrUndefined(this.media) && is$1.element(this.media)) {
      if (this.media.plyr) this.debug.warn("Target already setup");else if (this.config.enabled) {
        if (support.check().api) {
          var s = this.media.cloneNode(!0);
          s.autoplay = !1, this.elements.original = s;
          var a = this.media.tagName.toLowerCase(),
              r = null,
              o = null;

          switch (a) {
            case "div":
              if (r = this.media.querySelector("iframe"), is$1.element(r)) {
                if (o = parseUrl(r.getAttribute("src")), this.provider = getProviderByUrl(o.toString()), this.elements.container = this.media, this.media = r, this.elements.container.className = "", o.search.length) {
                  var l = ["1", "true"];
                  l.includes(o.searchParams.get("autoplay")) && (this.config.autoplay = !0), l.includes(o.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = l.includes(o.searchParams.get("playsinline")), this.config.youtube.hl = o.searchParams.get("hl")) : this.config.playsinline = !0;
                }
              } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);

              if (is$1.empty(this.provider) || !Object.keys(providers).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
              this.type = types.video;
              break;

            case "video":
            case "audio":
              this.type = a, this.provider = providers.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
              break;

            default:
              return void this.debug.error("Setup failed: unsupported type");
          }

          this.supported = support.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new Listeners(this), this.storage = new Storage(this), this.media.plyr = this, is$1.element(this.elements.container) || (this.elements.container = createElement("div", {
            tabindex: 0
          }), wrap$1(this.media, this.elements.container)), ui.migrateStyles.call(this), ui.addStyleHook.call(this), media.setup.call(this), this.config.debug && on.call(this, this.elements.container, this.config.events.join(" "), function (e) {
            n.debug.log("event: ".concat(e.type));
          }), this.fullscreen = new Fullscreen(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && ui.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new Ads(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", function () {
            return silencePromise(n.play());
          }), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new PreviewThumbnails(this))) : this.debug.error("Setup failed: no support");
        } else this.debug.error("Setup failed: no support");
      } else this.debug.error("Setup failed: disabled by config");
    } else this.debug.error("Setup failed: no suitable element passed");
  }

  return _createClass(e, [{
    key: "play",
    value: function value() {
      var e = this;
      return is$1.function(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then(function () {
        return e.ads.play();
      }).catch(function () {
        return silencePromise(e.media.play());
      }), this.media.play()) : null;
    }
  }, {
    key: "pause",
    value: function value() {
      return this.playing && is$1.function(this.media.pause) ? this.media.pause() : null;
    }
  }, {
    key: "togglePlay",
    value: function value(e) {
      return (is$1.boolean(e) ? e : !this.playing) ? this.play() : this.pause();
    }
  }, {
    key: "stop",
    value: function value() {
      this.isHTML5 ? (this.pause(), this.restart()) : is$1.function(this.media.stop) && this.media.stop();
    }
  }, {
    key: "restart",
    value: function value() {
      this.currentTime = 0;
    }
  }, {
    key: "rewind",
    value: function value(e) {
      this.currentTime -= is$1.number(e) ? e : this.config.seekTime;
    }
  }, {
    key: "forward",
    value: function value(e) {
      this.currentTime += is$1.number(e) ? e : this.config.seekTime;
    }
  }, {
    key: "increaseVolume",
    value: function value(e) {
      var t = this.media.muted ? 0 : this.volume;
      this.volume = t + (is$1.number(e) ? e : 0);
    }
  }, {
    key: "decreaseVolume",
    value: function value(e) {
      this.increaseVolume(-e);
    }
  }, {
    key: "toggleCaptions",
    value: function value(e) {
      captions.toggle.call(this, e, !1);
    }
  }, {
    key: "airplay",
    value: function value() {
      support.airplay && this.media.webkitShowPlaybackTargetPicker();
    }
  }, {
    key: "toggleControls",
    value: function value(e) {
      if (this.supported.ui && !this.isAudio) {
        var t = hasClass(this.elements.container, this.config.classNames.hideControls),
            i = void 0 === e ? void 0 : !e,
            n = toggleClass(this.elements.container, this.config.classNames.hideControls, i);

        if (n && is$1.array(this.config.controls) && this.config.controls.includes("settings") && !is$1.empty(this.config.settings) && controls.toggleMenu.call(this, !1), n !== t) {
          var s = n ? "controlshidden" : "controlsshown";
          triggerEvent.call(this, this.media, s);
        }

        return !n;
      }

      return !1;
    }
  }, {
    key: "on",
    value: function value(e, t) {
      on.call(this, this.elements.container, e, t);
    }
  }, {
    key: "once",
    value: function value(e, t) {
      once.call(this, this.elements.container, e, t);
    }
  }, {
    key: "off",
    value: function value(e, t) {
      off(this.elements.container, e, t);
    }
  }, {
    key: "destroy",
    value: function value(e) {
      var t = this,
          i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];

      if (this.ready) {
        var n = function n() {
          document.body.style.overflow = "", t.embed = null, i ? (Object.keys(t.elements).length && (removeElement(t.elements.buttons.play), removeElement(t.elements.captions), removeElement(t.elements.controls), removeElement(t.elements.wrapper), t.elements.buttons.play = null, t.elements.captions = null, t.elements.controls = null, t.elements.wrapper = null), is$1.function(e) && e()) : (unbindListeners.call(t), html5.cancelRequests.call(t), replaceElement(t.elements.original, t.elements.container), triggerEvent.call(t, t.elements.original, "destroyed", !0), is$1.function(e) && e.call(t.elements.original), t.ready = !1, setTimeout(function () {
            t.elements = null, t.media = null;
          }, 200));
        };

        this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (ui.toggleNativeControls.call(this, !0), n()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && is$1.function(this.embed.destroy) && this.embed.destroy(), n()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(n), setTimeout(n, 200));
      }
    }
  }, {
    key: "supports",
    value: function value(e) {
      return support.mime.call(this, e);
    }
  }, {
    key: "isHTML5",
    get: function get() {
      return this.provider === providers.html5;
    }
  }, {
    key: "isEmbed",
    get: function get() {
      return this.isYouTube || this.isVimeo;
    }
  }, {
    key: "isYouTube",
    get: function get() {
      return this.provider === providers.youtube;
    }
  }, {
    key: "isVimeo",
    get: function get() {
      return this.provider === providers.vimeo;
    }
  }, {
    key: "isVideo",
    get: function get() {
      return this.type === types.video;
    }
  }, {
    key: "isAudio",
    get: function get() {
      return this.type === types.audio;
    }
  }, {
    key: "playing",
    get: function get() {
      return Boolean(this.ready && !this.paused && !this.ended);
    }
  }, {
    key: "paused",
    get: function get() {
      return Boolean(this.media.paused);
    }
  }, {
    key: "stopped",
    get: function get() {
      return Boolean(this.paused && 0 === this.currentTime);
    }
  }, {
    key: "ended",
    get: function get() {
      return Boolean(this.media.ended);
    }
  }, {
    key: "currentTime",
    set: function set(e) {
      if (this.duration) {
        var t = is$1.number(e) && e > 0;
        this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log("Seeking to ".concat(this.currentTime, " seconds"));
      }
    },
    get: function get() {
      return Number(this.media.currentTime);
    }
  }, {
    key: "buffered",
    get: function get() {
      var e = this.media.buffered;
      return is$1.number(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0;
    }
  }, {
    key: "seeking",
    get: function get() {
      return Boolean(this.media.seeking);
    }
  }, {
    key: "duration",
    get: function get() {
      var e = parseFloat(this.config.duration),
          t = (this.media || {}).duration,
          i = is$1.number(t) && t !== 1 / 0 ? t : 0;
      return e || i;
    }
  }, {
    key: "volume",
    set: function set(e) {
      var t = e;
      is$1.string(t) && (t = Number(t)), is$1.number(t) || (t = this.storage.get("volume")), is$1.number(t) || (t = this.config.volume), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !is$1.empty(e) && this.muted && t > 0 && (this.muted = !1);
    },
    get: function get() {
      return Number(this.media.volume);
    }
  }, {
    key: "muted",
    set: function set(e) {
      var t = e;
      is$1.boolean(t) || (t = this.storage.get("muted")), is$1.boolean(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t;
    },
    get: function get() {
      return Boolean(this.media.muted);
    }
  }, {
    key: "hasAudio",
    get: function get() {
      return !this.isHTML5 || !!this.isAudio || Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length);
    }
  }, {
    key: "speed",
    set: function set(e) {
      var t = this,
          i = null;
      is$1.number(e) && (i = e), is$1.number(i) || (i = this.storage.get("speed")), is$1.number(i) || (i = this.config.speed.selected);
      var n = this.minimumSpeed,
          s = this.maximumSpeed;
      i = clamp(i, n, s), this.config.speed.selected = i, setTimeout(function () {
        t.media.playbackRate = i;
      }, 0);
    },
    get: function get() {
      return Number(this.media.playbackRate);
    }
  }, {
    key: "minimumSpeed",
    get: function get() {
      return this.isYouTube ? Math.min.apply(Math, _toConsumableArray(this.options.speed)) : this.isVimeo ? .5 : .0625;
    }
  }, {
    key: "maximumSpeed",
    get: function get() {
      return this.isYouTube ? Math.max.apply(Math, _toConsumableArray(this.options.speed)) : this.isVimeo ? 2 : 16;
    }
  }, {
    key: "quality",
    set: function set(e) {
      var t = this.config.quality,
          i = this.options.quality;

      if (i.length) {
        var n = [!is$1.empty(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find(is$1.number),
            s = !0;

        if (!i.includes(n)) {
          var a = closest$1(i, n);
          this.debug.warn("Unsupported quality option: ".concat(n, ", using ").concat(a, " instead")), n = a, s = !1;
        }

        t.selected = n, this.media.quality = n, s && this.storage.set({
          quality: n
        });
      }
    },
    get: function get() {
      return this.media.quality;
    }
  }, {
    key: "loop",
    set: function set(e) {
      var t = is$1.boolean(e) ? e : this.config.loop.active;
      this.config.loop.active = t, this.media.loop = t;
    },
    get: function get() {
      return Boolean(this.media.loop);
    }
  }, {
    key: "source",
    set: function set(e) {
      source.change.call(this, e);
    },
    get: function get() {
      return this.media.currentSrc;
    }
  }, {
    key: "download",
    get: function get() {
      var e = this.config.urls.download;
      return is$1.url(e) ? e : this.source;
    },
    set: function set(e) {
      is$1.url(e) && (this.config.urls.download = e, controls.setDownloadUrl.call(this));
    }
  }, {
    key: "poster",
    set: function set(e) {
      this.isVideo ? ui.setPoster.call(this, e, !1).catch(function () {}) : this.debug.warn("Poster can only be set for video");
    },
    get: function get() {
      return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null;
    }
  }, {
    key: "ratio",
    get: function get() {
      if (!this.isVideo) return null;
      var e = reduceAspectRatio(getAspectRatio.call(this));
      return is$1.array(e) ? e.join(":") : e;
    },
    set: function set(e) {
      this.isVideo ? is$1.string(e) && validateRatio(e) ? (this.config.ratio = e, setAspectRatio.call(this)) : this.debug.error("Invalid aspect ratio specified (".concat(e, ")")) : this.debug.warn("Aspect ratio can only be set for video");
    }
  }, {
    key: "autoplay",
    set: function set(e) {
      var t = is$1.boolean(e) ? e : this.config.autoplay;
      this.config.autoplay = t;
    },
    get: function get() {
      return Boolean(this.config.autoplay);
    }
  }, {
    key: "currentTrack",
    set: function set(e) {
      captions.set.call(this, e, !1);
    },
    get: function get() {
      var e = this.captions,
          t = e.toggled,
          i = e.currentTrack;
      return t ? i : -1;
    }
  }, {
    key: "language",
    set: function set(e) {
      captions.setLanguage.call(this, e, !1);
    },
    get: function get() {
      return (captions.getCurrentTrack.call(this) || {}).language;
    }
  }, {
    key: "pip",
    set: function set(e) {
      if (support.pip) {
        var t = is$1.boolean(e) ? e : !this.pip;
        is$1.function(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? pip.active : pip.inactive), is$1.function(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture());
      }
    },
    get: function get() {
      return support.pip ? is$1.empty(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === pip.active : null;
    }
  }], [{
    key: "supported",
    value: function value(e, t, i) {
      return support.check(e, t, i);
    }
  }, {
    key: "loadSprite",
    value: function value(e, t) {
      return loadSprite(e, t);
    }
  }, {
    key: "setup",
    value: function value(t) {
      var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = null;
      return is$1.string(t) ? n = Array.from(document.querySelectorAll(t)) : is$1.nodeList(t) ? n = Array.from(t) : is$1.array(t) && (n = t.filter(is$1.element)), is$1.empty(n) ? null : n.map(function (t) {
        return new e(t, i);
      });
    }
  }]), e;
}();

Plyr.defaults = cloneDeep(defaults$1);var script = {
  name: 'VuePlyr',
  props: {
    /** Options object for plyr config. **/
    options: {
      type: Object,
      required: false,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      player: {}
    };
  },
  computed: {
    opts: function opts() {
      var options = this.options;

      if (!Object.prototype.hasOwnProperty.call(this.options, 'hideYouTubeDOMError')) {
        options.hideYouTubeDOMError = true;
      }

      return options;
    }
  },
  mounted: function mounted() {
    this.player = new Plyr(this.$el, this.opts);
  },
  beforeUnmount: function beforeUnmount() {
    try {
      this.player.destroy();
    } catch (e) {
      if (!(this.opts.hideYouTubeDOMError && e.message === 'The YouTube player is not attached to the DOM.')) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  },
  render: function render() {
    var slots = this.$slots.default;
    return typeof slots === 'function' ? slots()[0] : slots;
  }
};script.install = function (app) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (options.plyr) {
    script.props.options.default = function () {
      return _objectSpread2({}, options.plyr);
    };
  }

  app.component(script.name, script);
};exports.default=script;//# sourceMappingURL=vue-plyr.ssr.js.map
