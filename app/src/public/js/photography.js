// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../node_modules/vanilla-lazyload/dist/lazyload.min.js":[function(require,module,exports) {
var define;
function _extends(){return(_extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.LazyLoad=e()}(this,function(){"use strict";var t="undefined"!=typeof window,e=t&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),n=t&&"IntersectionObserver"in window,o=t&&"classList"in document.createElement("p"),r={elements_selector:"img",container:e||t?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",class_loading:"loading",class_loaded:"loaded",class_error:"error",load_delay:0,auto_unobserve:!0,callback_enter:null,callback_exit:null,callback_reveal:null,callback_loaded:null,callback_error:null,callback_finish:null,use_native:!1},a=function(t,e){return t.getAttribute("data-"+e)},i=function(t,e,n){var o="data-"+e;null!==n?t.setAttribute(o,n):t.removeAttribute(o)},s=function(t){return"true"===a(t,"was-processed")},c=function(t,e){return i(t,"ll-timeout",e)},l=function(t){return a(t,"ll-timeout")},u=function(t,e){var n,o=new t(e);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:o}})}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:o})}window.dispatchEvent(n)};var d=function(t,e){t&&t(e)},f=function(t,e){t._loadingCount+=e,0===t._elements.length&&0===t._loadingCount&&d(t._settings.callback_finish)},_=function(t){for(var e,n=[],o=0;e=t.children[o];o+=1)"SOURCE"===e.tagName&&n.push(e);return n},v=function(t,e,n){n&&t.setAttribute(e,n)},g=function(t,e){v(t,"sizes",a(t,e.data_sizes)),v(t,"srcset",a(t,e.data_srcset)),v(t,"src",a(t,e.data_src))},m={IMG:function(t,e){var n=t.parentNode;n&&"PICTURE"===n.tagName&&_(n).forEach(function(t){g(t,e)});g(t,e)},IFRAME:function(t,e){v(t,"src",a(t,e.data_src))},VIDEO:function(t,e){_(t).forEach(function(t){v(t,"src",a(t,e.data_src))}),v(t,"src",a(t,e.data_src)),t.load()}},b=function(t,e){var n,o,r=e._settings,i=t.tagName,s=m[i];if(s)return s(t,r),f(e,1),void(e._elements=(n=e._elements,o=t,n.filter(function(t){return t!==o})));!function(t,e){var n=a(t,e.data_src),o=a(t,e.data_bg);n&&(t.style.backgroundImage='url("'.concat(n,'")')),o&&(t.style.backgroundImage=o)}(t,r)},h=function(t,e){o?t.classList.add(e):t.className+=(t.className?" ":"")+e},p=function(t,e,n){t.addEventListener(e,n)},y=function(t,e,n){t.removeEventListener(e,n)},E=function(t,e,n){y(t,"load",e),y(t,"loadeddata",e),y(t,"error",n)},w=function(t,e,n){var r=n._settings,a=e?r.class_loaded:r.class_error,i=e?r.callback_loaded:r.callback_error,s=t.target;!function(t,e){o?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")}(s,r.class_loading),h(s,a),d(i,s),f(n,-1)},I=function(t,e){var n=function n(r){w(r,!0,e),E(t,n,o)},o=function o(r){w(r,!1,e),E(t,n,o)};!function(t,e,n){p(t,"load",e),p(t,"loadeddata",e),p(t,"error",n)}(t,n,o)},k=["IMG","IFRAME","VIDEO"],A=function(t,e){var n=e._observer;z(t,e),n&&e._settings.auto_unobserve&&n.unobserve(t)},L=function(t){var e=l(t);e&&(clearTimeout(e),c(t,null))},x=function(t,e){var n=e._settings.load_delay,o=l(t);o||(o=setTimeout(function(){A(t,e),L(t)},n),c(t,o))},z=function(t,e,n){var o=e._settings;!n&&s(t)||(k.indexOf(t.tagName)>-1&&(I(t,e),h(t,o.class_loading)),b(t,e),function(t){i(t,"was-processed","true")}(t),d(o.callback_reveal,t),d(o.callback_set,t))},O=function(t){return!!n&&(t._observer=new IntersectionObserver(function(e){e.forEach(function(e){return function(t){return t.isIntersecting||t.intersectionRatio>0}(e)?function(t,e){var n=e._settings;d(n.callback_enter,t),n.load_delay?x(t,e):A(t,e)}(e.target,t):function(t,e){var n=e._settings;d(n.callback_exit,t),n.load_delay&&L(t)}(e.target,t)})},{root:(e=t._settings).container===document?null:e.container,rootMargin:e.thresholds||e.threshold+"px"}),!0);var e},N=["IMG","IFRAME"],C=function(t,e){return function(t){return t.filter(function(t){return!s(t)})}((n=t||function(t){return t.container.querySelectorAll(t.elements_selector)}(e),Array.prototype.slice.call(n)));var n},M=function(t,e){this._settings=function(t){return _extends({},r,t)}(t),this._loadingCount=0,O(this),this.update(e)};return M.prototype={update:function(t){var n,o=this,r=this._settings;(this._elements=C(t,r),!e&&this._observer)?(function(t){return t.use_native&&"loading"in HTMLImageElement.prototype}(r)&&((n=this)._elements.forEach(function(t){-1!==N.indexOf(t.tagName)&&(t.setAttribute("loading","lazy"),z(t,n))}),this._elements=C(t,r)),this._elements.forEach(function(t){o._observer.observe(t)})):this.loadAll()},destroy:function(){var t=this;this._observer&&(this._elements.forEach(function(e){t._observer.unobserve(e)}),this._observer=null),this._elements=null,this._settings=null},load:function(t,e){z(t,this,e)},loadAll:function(){var t=this;this._elements.forEach(function(e){A(e,t)})}},t&&function(t,e){if(e)if(e.length)for(var n,o=0;n=e[o];o+=1)u(t,n);else u(t,e)}(M,window.lazyLoadOptions),M});


},{}],"js/global.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vanillaLazyload = _interopRequireDefault(require("vanilla-lazyload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-extraneous-dependencies
const lazyLoad = new _vanillaLazyload.default();
const {
  body
} = document;
let timeout; // Timeout for menu transition

let menuOpen = false; // Boolean for when the menu is open/closed

let bigBang = false; // Initialisation boolean if the canvas has been populated and rendered

let eventsAdded = false; // Boolean to attach/detach the 'deviceorientation' event listener

const canvas = document.querySelector('.js-stars');
const context = canvas.getContext('2d');
let stars = [];
const offset = 0.2;
const colours = [0, 60, 240];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

const drawStar = ({
  x,
  y,
  radius,
  hue,
  sat
}) => {
  context.beginPath();
  context.arc(x, y, radius, 0, 360);
  context.fillStyle = `hsl(${hue}, ${sat}%, 88%)`;
  context.fill();
};

const generateStars = () => {
  stars = [];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const {
    width,
    height
  } = canvas;
  context.clearRect(0, 0, width, height);
  const overflowX = width * offset;
  const overflowY = height * offset;
  const density = width + overflowX + (height + overflowY);

  for (let i = 0; i <= density; i += 1) {
    const x = getRandomInt(-overflowX, width + overflowX);
    const y = getRandomInt(-overflowY, height + overflowY);
    const radius = getRandomFloat(0.2, 1.5);
    const hue = colours[getRandomInt(0, colours.length - 1)];
    const sat = getRandomInt(50, 100);
    stars[i] = {
      x,
      y,
      radius,
      hue,
      sat
    };
    drawStar(stars[i]);
  }
};

const moveStars = ({
  beta,
  gamma
}) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const offsetX = beta * 15 - canvas.width / 2;
  const offsetY = gamma * 15 - canvas.height / 2;
  stars.forEach(star => drawStar({ ...star,
    x: star.x + offsetX * 0.25 * (star.radius * 0.5),
    y: star.y + offsetY * 0.25 * (star.radius * 0.5)
  }));
};

const addEvents = () => {
  if (!eventsAdded) {
    window.addEventListener('deviceorientation', moveStars);
    window.addEventListener('resize', generateStars);
    eventsAdded = true;
  }
};

const removeEvents = () => {
  if (eventsAdded) {
    window.removeEventListener('deviceorientation', moveStars);
    window.removeEventListener('resize', generateStars);
    eventsAdded = false;
  }
};

body.querySelector('.js-menu').addEventListener('click', event => {
  event.preventDefault();
  clearTimeout(timeout);

  if (!bigBang) {
    bigBang = true;
    generateStars();
  }

  addEvents();
  body.classList.add('menu', 'position');
  menuOpen = true;
});
body.querySelector('.js-overlay').addEventListener('click', event => {
  event.preventDefault(); // Todo: replace with CSS transition event listener

  timeout = setTimeout(() => {
    menuOpen = false;
    removeEvents();
    body.classList.remove('position');
  }, 200);
  body.classList.remove('menu');
});
window.addEventListener('resize', () => {
  if (window.innerWidth <= 800 && menuOpen) {
    generateStars();
    addEvents();
  } else {
    removeEvents();
  }
});
var _default = lazyLoad;
exports.default = _default;
},{"vanilla-lazyload":"../../node_modules/vanilla-lazyload/dist/lazyload.min.js"}],"js/photography.js":[function(require,module,exports) {
"use strict";

var _global = _interopRequireDefault(require("./global"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let data;
let thumbnails = [];
let currentAlbum;
let currentIndex;
const elements = {
  sidebar: document.querySelector('.js-sidebar'),
  sidebarWrapper: document.querySelector('.js-sidebar-wrapper'),
  viewer: document.querySelector('.js-viewer'),
  header: document.querySelector('.js-header'),
  subheader: document.querySelector('.js-subheader'),
  albums: document.querySelector('.js-albums')
};

const resizeThumbnails = () => {
  const {
    sidebarWrapper
  } = elements;

  if (window.innerWidth > 800) {
    sidebarWrapper.style.width = null;
  } else {
    const width = thumbnails.reduce((accumulator, element) => {
      let value = element.offsetWidth;
      value += parseInt(getComputedStyle(element).marginLeft, 10);
      value += parseInt(getComputedStyle(element).marginRight, 10);
      return accumulator + value;
    }, 0);
    sidebarWrapper.style.width = `${width}px`;
  }
};

const updateURL = target => {
  let url = `${window.location.href}?album=${target}`;

  if (new URLSearchParams(window.location.search).get('album')) {
    url = window.location.href.replace(/(album=)[^&]+/, `album=${target}`);
  }

  window.history.replaceState(null, window.document.title, url);
};

const changePhoto = (target = 0) => {
  const {
    viewer,
    sidebar,
    header,
    subheader
  } = elements;
  const {
    photos
  } = currentAlbum;

  if (target === 'prev') {
    currentIndex -= 1;

    if (currentIndex < 0) {
      currentIndex = photos.length - 1;
    }
  } else if (target === 'next') {
    currentIndex += 1;

    if (currentIndex > photos.length - 1) {
      currentIndex = 0;
    }
  } else {
    currentIndex = target;
  }

  const {
    title,
    imageURL
  } = photos[currentIndex];
  header.innerText = title;
  subheader.innerText = `Photo ${currentIndex + 1} of ${photos.length}`;
  viewer.style.backgroundImage = `url("${imageURL}")`;
  Array.from(thumbnails).forEach(({
    classList
  }) => classList.remove('current'));
  const current = thumbnails[currentIndex];
  current.classList.add('current');
  sidebar.scrollTop = current.offsetTop - sidebar.offsetHeight / 2 - current.offsetHeight / 2;
  sidebar.scrollLeft = current.offsetLeft - sidebar.offsetWidth / 2 - current.offsetWidth / 2;
};

const changeAlbum = target => {
  const {
    sidebarWrapper
  } = elements;
  thumbnails = [];
  sidebarWrapper.innerHTML = '';
  currentAlbum = data[target];
  currentAlbum.photos.forEach(({
    title,
    thumbnailURL
  }, index) => {
    const element = document.createElement('a');
    element.setAttribute('href', '#');
    element.classList.add('thumbnail');
    element.addEventListener('click', event => {
      event.preventDefault();
      changePhoto(index);
    });
    const image = document.createElement('img');
    image.setAttribute('alt', title);
    image.setAttribute('data-src', thumbnailURL);
    element.appendChild(image);
    thumbnails.push(element);
    sidebarWrapper.appendChild(element);
  });
  changePhoto();
  resizeThumbnails();
  updateURL(target);

  _global.default.update();
};

const setup = response => {
  data = response;
  const param = new URLSearchParams(window.location.search).get('album');
  const {
    albums
  } = elements;
  Object.keys(data).forEach(key => {
    const {
      title
    } = data[key];
    const option = document.createElement('option');
    option.value = key;
    option.innerText = title;

    if (param === key) {
      option.setAttribute('selected', '');
    }

    if (key === 'portfolio') {
      albums.insertBefore(option, albums.querySelector('optgroup'));
    } else {
      albums.querySelector('optgroup').appendChild(option);
    }
  });
  albums.addEventListener('change', () => changeAlbum(albums.value));
  let target = 'portfolio';

  if (Object.keys(data).includes(param)) {
    target = param;
  }

  changeAlbum(target);
};

Array.from(document.querySelectorAll('.js-arrow')).forEach(element => element.addEventListener('click', event => {
  event.preventDefault();
  changePhoto(element.getAttribute('data-target'));
}));
window.addEventListener('keydown', ({
  keyCode
}) => {
  if (keyCode === 37 || keyCode === 38 || keyCode === 80 || keyCode === 65) {
    changePhoto('prev');
  } else if (keyCode === 39 || keyCode === 40 || keyCode === 78 || keyCode === 68) {
    changePhoto('next');
  }
});
window.addEventListener('resize', resizeThumbnails);
fetch('/api/photos').then(repsonse => repsonse.json()).then(setup);
},{"./global":"js/global.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55074" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/photography.js"], null)
//# sourceMappingURL=/js/photography.js.map