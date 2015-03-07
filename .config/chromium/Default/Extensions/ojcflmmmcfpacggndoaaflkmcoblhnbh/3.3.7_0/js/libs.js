
var requirejs, require, define;

!function(global) {
function isFunction(e) {
return "[object Function]" === ostring.call(e);
}
function isArray(e) {
return "[object Array]" === ostring.call(e);
}
function each(e, t) {
if (e) {
var n;
for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1) ;
}
}
function eachReverse(e, t) {
if (e) {
var n;
for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1) ;
}
}
function hasProp(e, t) {
return hasOwn.call(e, t);
}
function getOwn(e, t) {
return hasProp(e, t) && e[t];
}
function eachProp(e, t) {
var n;
for (n in e) if (hasProp(e, n) && t(e[n], n)) break;
}
function mixin(e, t, n, r) {
return t && eachProp(t, function(t, i) {
(n || !hasProp(e, i)) && (r && "string" != typeof t ? (e[i] || (e[i] = {}), mixin(e[i], t, n, r)) : e[i] = t);
}), e;
}
function bind(e, t) {
return function() {
return t.apply(e, arguments);
};
}
function scripts() {
return document.getElementsByTagName("script");
}
function getGlobal(e) {
if (!e) return e;
var t = global;
return each(e.split("."), function(e) {
t = t[e];
}), t;
}
function makeError(e, t, n, r) {
var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
return i.requireType = e, i.requireModules = r, n && (i.originalError = n), i;
}
function newContext(e) {
function t(e) {
var t, n;
for (t = 0; e[t]; t += 1) if (n = e[t], "." === n) e.splice(t, 1), t -= 1; else if (".." === n) {
if (1 === t && (".." === e[2] || ".." === e[0])) break;
t > 0 && (e.splice(t - 1, 2), t -= 2);
}
}
function n(e, n, r) {
var i, o, a, s, u, c, f, l, d, h, p, g = n && n.split("/"), m = g, v = k.map, y = v && v["*"];
if (e && "." === e.charAt(0) && (n ? (m = getOwn(k.pkgs, n) ? g = [ n ] : g.slice(0, g.length - 1), 
e = m.concat(e.split("/")), t(e), o = getOwn(k.pkgs, i = e[0]), e = e.join("/"), 
o && e === i + "/" + o.main && (e = i)) : 0 === e.indexOf("./") && (e = e.substring(2))), 
r && v && (g || y)) {
for (s = e.split("/"), u = s.length; u > 0; u -= 1) {
if (f = s.slice(0, u).join("/"), g) for (c = g.length; c > 0; c -= 1) if (a = getOwn(v, g.slice(0, c).join("/")), 
a && (a = getOwn(a, f))) {
l = a, d = u;
break;
}
if (l) break;
!h && y && getOwn(y, f) && (h = getOwn(y, f), p = u);
}
!l && h && (l = h, d = p), l && (s.splice(0, d, l), e = s.join("/"));
}
return e;
}
function r(e) {
isBrowser && each(scripts(), function(t) {
return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === x.contextName ? (t.parentNode.removeChild(t), 
!0) : void 0;
});
}
function i(e) {
var t = getOwn(k.paths, e);
return t && isArray(t) && t.length > 1 ? (r(e), t.shift(), x.require.undef(e), x.require([ e ]), 
!0) : void 0;
}
function o(e) {
var t, n = e ? e.indexOf("!") : -1;
return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [ t, e ];
}
function a(e, t, r, i) {
var a, s, u, c, f = null, l = t ? t.name : null, d = e, h = !0, p = "";
return e || (h = !1, e = "_@r" + (D += 1)), c = o(e), f = c[0], e = c[1], f && (f = n(f, l, i), 
s = getOwn(B, f)), e && (f ? p = s && s.normalize ? s.normalize(e, function(e) {
return n(e, l, i);
}) : n(e, l, i) : (p = n(e, l, i), c = o(p), f = c[0], p = c[1], r = !0, a = x.nameToUrl(p))), 
u = !f || s || r ? "" : "_unnormalized" + (M += 1), {
prefix: f,
name: p,
parentMap: t,
unnormalized: !!u,
url: a,
originalName: d,
isDefine: h,
id: (f ? f + "!" + p : p) + u
};
}
function s(e) {
var t = e.id, n = getOwn(E, t);
return n || (n = E[t] = new x.Module(e)), n;
}
function u(e, t, n) {
var r = e.id, i = getOwn(E, r);
!hasProp(B, r) || i && !i.defineEmitComplete ? s(e).on(t, n) : "defined" === t && n(B[r]);
}
function c(e, t) {
var n = e.requireModules, r = !1;
t ? t(e) : (each(n, function(t) {
var n = getOwn(E, t);
n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)));
}), r || req.onError(e));
}
function f() {
globalDefQueue.length && (apsp.apply(C, [ C.length - 1, 0 ].concat(globalDefQueue)), 
globalDefQueue = []);
}
function l(e) {
delete E[e], delete S[e];
}
function d(e, t, n) {
var r = e.map.id;
e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function(r, i) {
var o = r.id, a = getOwn(E, o);
!a || e.depMatched[i] || n[o] || (getOwn(t, o) ? (e.defineDep(i, B[o]), e.check()) : d(a, t, n));
}), n[r] = !0);
}
function h() {
var e, t, n, o, a = 1e3 * k.waitSeconds, s = a && x.startTime + a < new Date().getTime(), u = [], f = [], l = !1, p = !0;
if (!y) {
if (y = !0, eachProp(S, function(n) {
if (e = n.map, t = e.id, n.enabled && (e.isDefine || f.push(n), !n.error)) if (!n.inited && s) i(t) ? (o = !0, 
l = !0) : (u.push(t), r(t)); else if (!n.inited && n.fetched && e.isDefine && (l = !0, 
!e.prefix)) return p = !1;
}), s && u.length) return n = makeError("timeout", "Load timeout for modules: " + u, null, u), 
n.contextName = x.contextName, c(n);
p && each(f, function(e) {
d(e, {}, {});
}), s && !o || !l || !isBrowser && !isWebWorker || _ || (_ = setTimeout(function() {
_ = 0, h();
}, 50)), y = !1;
}
}
function p(e) {
hasProp(B, e[0]) || s(a(e[0], null, !0)).init(e[1], e[2]);
}
function g(e, t, n, r) {
e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1);
}
function m(e) {
var t = e.currentTarget || e.srcElement;
return g(t, x.onScriptLoad, "load", "onreadystatechange"), g(t, x.onScriptError, "error"), 
{
node: t,
id: t && t.getAttribute("data-requiremodule")
};
}
function v() {
var e;
for (f(); C.length; ) {
if (e = C.shift(), null === e[0]) return c(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
p(e);
}
}
var y, b, x, w, _, k = {
waitSeconds: 7,
baseUrl: "./",
paths: {},
pkgs: {},
shim: {},
config: {}
}, E = {}, S = {}, T = {}, C = [], B = {}, A = {}, D = 1, M = 1;
return w = {
require: function(e) {
return e.require ? e.require : e.require = x.makeRequire(e.map);
},
exports: function(e) {
return e.usingExports = !0, e.map.isDefine ? e.exports ? e.exports : e.exports = B[e.map.id] = {} : void 0;
},
module: function(e) {
return e.module ? e.module : e.module = {
id: e.map.id,
uri: e.map.url,
config: function() {
return k.config && getOwn(k.config, e.map.id) || {};
},
exports: B[e.map.id]
};
}
}, b = function(e) {
this.events = getOwn(T, e.id) || {}, this.map = e, this.shim = getOwn(k.shim, e.id), 
this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, 
this.depCount = 0;
}, b.prototype = {
init: function(e, t, n, r) {
r = r || {}, this.inited || (this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function(e) {
this.emit("error", e);
})), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = r.ignore, 
r.enabled || this.enabled ? this.enable() : this.check());
},
defineDep: function(e, t) {
this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t);
},
fetch: function() {
if (!this.fetched) {
this.fetched = !0, x.startTime = new Date().getTime();
var e = this.map;
return this.shim ? void x.makeRequire(this.map, {
enableBuildCallback: !0
})(this.shim.deps || [], bind(this, function() {
return e.prefix ? this.callPlugin() : this.load();
})) : e.prefix ? this.callPlugin() : this.load();
}
},
load: function() {
var e = this.map.url;
A[e] || (A[e] = !0, x.load(this.map.id, e));
},
check: function() {
if (this.enabled && !this.enabling) {
var e, t, n = this.map.id, r = this.depExports, i = this.exports, o = this.factory;
if (this.inited) {
if (this.error) this.emit("error", this.error); else if (!this.defining) {
if (this.defining = !0, this.depCount < 1 && !this.defined) {
if (isFunction(o)) {
if (this.events.error) try {
i = x.execCb(n, o, r, i);
} catch (a) {
e = a;
} else i = x.execCb(n, o, r, i);
if ("function" == typeof i && !i.name && i.__super__ && (i.displayName = n, i.toString = function() {
return n;
}), this.map.isDefine && (t = this.module, t && void 0 !== t.exports && t.exports !== this.exports ? i = t.exports : void 0 === i && this.usingExports && (i = this.exports)), 
e) return e.requireMap = this.map, e.requireModules = [ this.map.id ], e.requireType = "define", 
c(this.error = e);
} else i = o;
this.exports = i, this.map.isDefine && !this.ignore && (B[n] = i, req.onResourceLoad && req.onResourceLoad(x, this.map, this.depMaps)), 
l(n), this.defined = !0;
}
this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, 
this.emit("defined", this.exports), this.defineEmitComplete = !0);
}
} else this.fetch();
}
},
callPlugin: function() {
var e = this.map, t = e.id, r = a(e.prefix);
this.depMaps.push(r), u(r, "defined", bind(this, function(r) {
var i, o, f, d = this.map.name, h = this.map.parentMap ? this.map.parentMap.name : null, p = x.makeRequire(e.parentMap, {
enableBuildCallback: !0
});
return this.map.unnormalized ? (r.normalize && (d = r.normalize(d, function(e) {
return n(e, h, !0);
}) || ""), o = a(e.prefix + "!" + d, this.map.parentMap), u(o, "defined", bind(this, function(e) {
this.init([], function() {
return e;
}, null, {
enabled: !0,
ignore: !0
});
})), f = getOwn(E, o.id), void (f && (this.depMaps.push(o), this.events.error && f.on("error", bind(this, function(e) {
this.emit("error", e);
})), f.enable()))) : (i = bind(this, function(e) {
this.init([], function() {
return e;
}, null, {
enabled: !0
});
}), i.error = bind(this, function(e) {
this.inited = !0, this.error = e, e.requireModules = [ t ], eachProp(E, function(e) {
0 === e.map.id.indexOf(t + "_unnormalized") && l(e.map.id);
}), c(e);
}), i.fromText = bind(this, function(n, r) {
var o = e.name, u = a(o), f = useInteractive;
r && (n = r), f && (useInteractive = !1), s(u), hasProp(k.config, t) && (k.config[o] = k.config[t]);
try {
req.exec(n);
} catch (l) {
return c(makeError("fromtexteval", "fromText eval for " + t + " failed: " + l, l, [ t ]));
}
f && (useInteractive = !0), this.depMaps.push(u), x.completeLoad(o), p([ o ], i);
}), void r.load(e.name, p, i, k));
})), x.enable(r, this), this.pluginMaps[r.id] = r;
},
enable: function() {
S[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(e, t) {
var n, r, i;
if ("string" == typeof e) {
if (e = a(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), 
this.depMaps[t] = e, i = getOwn(w, e.id)) return void (this.depExports[t] = i(this));
this.depCount += 1, u(e, "defined", bind(this, function(e) {
this.defineDep(t, e), this.check();
})), this.errback && u(e, "error", this.errback);
}
n = e.id, r = E[n], hasProp(w, n) || !r || r.enabled || x.enable(e, this);
})), eachProp(this.pluginMaps, bind(this, function(e) {
var t = getOwn(E, e.id);
t && !t.enabled && x.enable(e, this);
})), this.enabling = !1, this.check();
},
on: function(e, t) {
var n = this.events[e];
n || (n = this.events[e] = []), n.push(t);
},
emit: function(e, t) {
each(this.events[e], function(e) {
e(t);
}), "error" === e && delete this.events[e];
}
}, x = {
config: k,
contextName: e,
registry: E,
defined: B,
urlFetched: A,
defQueue: C,
Module: b,
makeModuleMap: a,
nextTick: req.nextTick,
onError: c,
configure: function(e) {
e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
var t = k.pkgs, n = k.shim, r = {
paths: !0,
config: !0,
map: !0
};
eachProp(e, function(e, t) {
r[t] ? "map" === t ? (k.map || (k.map = {}), mixin(k[t], e, !0, !0)) : mixin(k[t], e, !0) : k[t] = e;
}), e.shim && (eachProp(e.shim, function(e, t) {
isArray(e) && (e = {
deps: e
}), !e.exports && !e.init || e.exportsFn || (e.exportsFn = x.makeShimExports(e)), 
n[t] = e;
}), k.shim = n), e.packages && (each(e.packages, function(e) {
var n;
e = "string" == typeof e ? {
name: e
} : e, n = e.location, t[e.name] = {
name: e.name,
location: n || e.name,
main: (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
};
}), k.pkgs = t), eachProp(E, function(e, t) {
e.inited || e.map.unnormalized || (e.map = a(t));
}), (e.deps || e.callback) && x.require(e.deps || [], e.callback);
},
makeShimExports: function(e) {
function t() {
var t;
return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports);
}
return t;
},
makeRequire: function(t, r) {
function i(n, o, u) {
var f, l, d;
return r.enableBuildCallback && o && isFunction(o) && (o.__requireJsBuild = !0), 
"string" == typeof n ? isFunction(o) ? c(makeError("requireargs", "Invalid require call"), u) : t && hasProp(w, n) ? w[n](E[t.id]) : req.get ? req.get(x, n, t, i) : (l = a(n, t, !1, !0), 
f = l.id, hasProp(B, f) ? B[f] : c(makeError("notloaded", 'Module name "' + f + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), 
x.nextTick(function() {
v(), d = s(a(null, t)), d.skipMap = r.skipMap, d.init(n, o, u, {
enabled: !0
}), h();
}), i);
}
return r = r || {}, mixin(i, {
isBrowser: isBrowser,
toUrl: function(e) {
var r, i = e.lastIndexOf("."), o = e.split("/")[0], a = "." === o || ".." === o;
return -1 !== i && (!a || i > 1) && (r = e.substring(i, e.length), e = e.substring(0, i)), 
x.nameToUrl(n(e, t && t.id, !0), r, !0);
},
defined: function(e) {
return hasProp(B, a(e, t, !1, !0).id);
},
specified: function(e) {
return e = a(e, t, !1, !0).id, hasProp(B, e) || hasProp(E, e);
}
}), t || (i.undef = function(e) {
f();
var n = a(e, t, !0), r = getOwn(E, e);
delete B[e], delete A[n.url], delete T[e], r && (r.events.defined && (T[e] = r.events), 
l(e));
}), i;
},
enable: function(e) {
var t = getOwn(E, e.id);
t && s(e).enable();
},
completeLoad: function(e) {
var t, n, r, o = getOwn(k.shim, e) || {}, a = o.exports;
for (f(); C.length; ) {
if (n = C.shift(), null === n[0]) {
if (n[0] = e, t) break;
t = !0;
} else n[0] === e && (t = !0);
p(n);
}
if (r = getOwn(E, e), !t && !hasProp(B, e) && r && !r.inited) {
if (!(!k.enforceDefine || a && getGlobal(a))) return i(e) ? void 0 : c(makeError("nodefine", "No define call for " + e, null, [ e ]));
p([ e, o.deps || [], o.exportsFn ]);
}
h();
},
nameToUrl: function(e, t, n) {
var r, i, o, a, s, u, c, f, l;
if (req.jsExtRegExp.test(e)) f = e + (t || ""); else {
for (r = k.paths, i = k.pkgs, s = e.split("/"), u = s.length; u > 0; u -= 1) {
if (c = s.slice(0, u).join("/"), o = getOwn(i, c), l = getOwn(r, c)) {
isArray(l) && (l = l[0]), s.splice(0, u, l);
break;
}
if (o) {
a = e === o.name ? o.location + "/" + o.main : o.location, s.splice(0, u, a);
break;
}
}
f = s.join("/"), f += t || (/\?/.test(f) || n ? "" : ".js"), f = ("/" === f.charAt(0) || f.match(/^[\w\+\.\-]+:/) ? "" : k.baseUrl) + f;
}
return k.urlArgs ? f + ((-1 === f.indexOf("?") ? "?" : "&") + k.urlArgs) : f;
},
load: function(e, t) {
req.load(x, e, t);
},
execCb: function(e, t, n, r) {
return t.apply(r, n);
},
onScriptLoad: function(e) {
if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
interactiveScript = null;
var t = m(e);
x.completeLoad(t.id);
}
},
onScriptError: function(e) {
var t = m(e);
return i(t.id) ? void 0 : c(makeError("scripterror", "Script error", e, [ t.id ]));
}
}, x.require = x.makeRequire(), x;
}
function getInteractiveScript() {
return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(e) {
return "interactive" === e.readyState ? interactiveScript = e : void 0;
}), interactiveScript);
}
var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.5", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, apsp = ap.splice, isBrowser = !("undefined" == typeof window || !navigator || !window.document), isWebWorker = !isBrowser && "undefined" != typeof importScripts, readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(), contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
if ("undefined" == typeof define) {
if ("undefined" != typeof requirejs) {
if (isFunction(requirejs)) return;
cfg = requirejs, requirejs = void 0;
}
"undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), 
req = requirejs = function(e, t, n, r) {
var i, o, a = defContextName;
return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = n, 
n = r) : e = []), o && o.context && (a = o.context), i = getOwn(contexts, a), i || (i = contexts[a] = req.s.newContext(a)), 
o && i.configure(o), i.require(e, t, n);
}, req.config = function(e) {
return req(e);
}, req.nextTick = "undefined" != typeof setTimeout ? function(e) {
setTimeout(e, 4);
} : function(e) {
e();
}, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, 
req.isBrowser = isBrowser, s = req.s = {
contexts: contexts,
newContext: newContext
}, req({}), each([ "toUrl", "undef", "defined", "specified" ], function(e) {
req[e] = function() {
var t = contexts[defContextName];
return t.require[e].apply(t, arguments);
};
}), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], 
baseElement && (head = s.head = baseElement.parentNode)), req.onError = function(e) {
throw e;
}, req.load = function(e, t, n) {
var r, i = e && e.config || {};
if (isBrowser) return r = i.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"), 
r.type = i.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r.setAttribute("data-requirecontext", e.contextName), 
r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), 
r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), 
r.src = n, currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), 
currentlyAddingScript = null, r;
if (isWebWorker) try {
importScripts(n), e.completeLoad(t);
} catch (o) {
e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, o, [ t ]));
}
}, isBrowser && eachReverse(scripts(), function(e) {
return head || (head = e.parentNode), dataMain = e.getAttribute("data-main"), dataMain ? (cfg.baseUrl || (src = dataMain.split("/"), 
mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath, 
dataMain = mainScript), dataMain = dataMain.replace(jsSuffixRegExp, ""), cfg.deps = cfg.deps ? cfg.deps.concat(dataMain) : [ dataMain ], 
!0) : void 0;
}), define = function(e, t, n) {
var r, i;
"string" != typeof e && (n = t, t = e, e = null), isArray(t) || (n = t, t = null), 
!t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(e, n) {
t.push(n);
}), t = (1 === n.length ? [ "require" ] : [ "require", "exports", "module" ]).concat(t))), 
useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), 
i = contexts[r.getAttribute("data-requirecontext")])), (i ? i.defQueue : globalDefQueue).push([ e, t, n ]);
}, define.amd = {
jQuery: !0
}, req.exec = function(text) {
return eval(text);
}, req(cfg);
}
}(this);
define("vendor/require", function(){});

!function(e) {
if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define('wunderbits/core/dist/wunderbits.core',e); else {
var t;
"undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), 
(t.wunderbits || (t.wunderbits = {})).core = e();
}
}(function() {
return function e(t, n, r) {
function i(a, s) {
if (!n[a]) {
if (!t[a]) {
var u = "function" == typeof require && require;
if (!s && u) return u(a, !0);
if (o) return o(a, !0);
throw new Error("Cannot find module '" + a + "'");
}
var c = n[a] = {
exports: {}
};
t[a][0].call(c.exports, function(e) {
var n = t[a][1][e];
return i(n ? n : e);
}, c, c.exports, e, t, n, r);
}
return n[a].exports;
}
for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
return i;
}({
1: [ function(e, t) {

var n = e("./WBEventEmitter").extend({
mixins: [ e("./mixins/WBDestroyableMixin"), e("./mixins/WBUtilsMixin"), e("./mixins/ObservableHashMixin") ]
});
t.exports = n;
}, {
"./WBEventEmitter": 5,
"./mixins/ObservableHashMixin": 31,
"./mixins/WBDestroyableMixin": 33,
"./mixins/WBUtilsMixin": 36
} ],
2: [ function(e, t) {

var n = e("./WBSingleton").extend({
mixins: [ e("./mixins/WBEventsMixin"), e("./mixins/WBBindableMixin"), e("./mixins/WBDestroyableMixin"), e("./mixins/WBUtilsMixin"), e("./mixins/ObservableHashMixin") ]
});
t.exports = n;
}, {
"./WBSingleton": 8,
"./mixins/ObservableHashMixin": 31,
"./mixins/WBBindableMixin": 32,
"./mixins/WBDestroyableMixin": 33,
"./mixins/WBEventsMixin": 34,
"./mixins/WBUtilsMixin": 36
} ],
3: [ function(e, t) {

function n(e, t) {
var r = this;
e = e || {};
var o = e.mixins || [];
delete e.mixins;
for (var a, s = i(r, e, t); o.length; ) a = o.shift(), "function" == typeof a.applyToClass && a.applyToClass(s);
return s.extend = r.extend || n, s;
}
function r(e) {
var t = this;
t.uid = t.uid || s(), t.options = e || t.options, t.augmentProperties(), t.initialize.apply(t, arguments), 
t.initMixins.apply(t, arguments);
}
var i = e("./lib/inherits"), o = e("./lib/extend"), a = e("./lib/clone"), s = e("./lib/createUID"), u = e("./lib/fromSuper"), c = {
initialize: function() {
var e = this;
return e;
},
initMixins: function() {
for (var e, t = this, n = u.concat(t, "initializers"); n.length; ) e = n.shift(), 
"function" == typeof e && e.apply(t, arguments);
},
augmentProperties: function() {
function e(e, n) {
var r = typeof n;
t[e] = "function" === r ? n.call(t) : "object" === r ? a(n, !0) : n;
}
var t = this, n = u.merge(t, "properties");
for (var r in n) e(r, n[r]);
}
};
o(r.prototype, c), r.extend = n, t.exports = r;
}, {
"./lib/clone": 12,
"./lib/createUID": 13,
"./lib/extend": 18,
"./lib/fromSuper": 20,
"./lib/inherits": 23
} ],
4: [ function(e, t) {

function n(e, t, n) {
return function() {
var r = this;
if (!(r instanceof f)) throw new Error(n + " invoked with wrong context");
if (r._state !== s.pending) return r;
r._args = a(arguments);
var i = t ? r._args.shift() : void 0;
return r._state = e, r.trigger(i), r;
};
}
var r = e("./WBClass"), i = e("./WBPromise"), o = e("./lib/assert"), a = e("./lib/toArray"), s = {
pending: 0,
resolved: 2,
rejected: 4
}, u = {
0: [ "pending" ],
2: [ "resolved", "resolve" ],
4: [ "rejected", "reject" ]
}, c = {
properties: {
_state: s.pending,
_args: [],
handlers: []
},
initialize: function(e) {
var t = this;
t._context = e;
},
state: function() {
var e = this;
return u[e._state][0];
},
trigger: function(e) {
var t = this;
if (t._state !== s.pending) for (var n, r = t.handlers; r.length; ) n = r.shift(), 
t.invoke(n, e || t._context);
},
invoke: function(e, t) {
var n = this, r = n._state, i = e.context || t || n, o = e.args;
n._args.forEach(function(e) {
o.push(e);
});
var a = e.type, u = "then" === a || "done" === a && r === s.resolved || "fail" === a && r === s.rejected;
u && e.fn.apply(i, o);
},
promise: function() {
var e = this;
return e._promise = e._promise || new i(this), e._promise;
}
};
[ "then", "done", "fail" ].forEach(function(e) {
c[e] = function() {
var t = this, n = a(arguments), r = n.shift(), i = n.shift();
return o.function(r, e + " accepts only functions"), t.handlers.push({
type: e,
context: i,
fn: r,
args: n
}), t.trigger(), t;
};
}), c.always = c.then, [ s.resolved, s.rejected ].forEach(function(e) {
var t = u[e][1];
c[t] = n(e, !1, t), c[t + "With"] = n(e, !0, t);
});
var f = r.extend(c);
t.exports = f;
}, {
"./WBClass": 3,
"./WBPromise": 7,
"./lib/assert": 11,
"./lib/toArray": 27
} ],
5: [ function(e, t) {

var n = e("./WBClass").extend({
mixins: [ e("./mixins/WBBindableMixin"), e("./mixins/WBEventsMixin") ]
});
t.exports = n;
}, {
"./WBClass": 3,
"./mixins/WBBindableMixin": 32,
"./mixins/WBEventsMixin": 34
} ],
6: [ function(e, t) {

var n = e("./lib/extend"), r = e("./lib/clone"), i = e("./lib/assert"), o = e("./WBSingleton"), a = o.extend({
applyTo: function(e) {
var t, i = r(this.Behavior, !0);
"function" == typeof i.initialize && (t = i.initialize, delete i.initialize);
var o = i.properties;
return delete i.properties, n(e, i), t && t.apply(e), o && n(e, o), e;
},
applyToClass: function(e) {
i.class(e, "applyToClass expects a class");
var t = e.prototype, o = r(this.Behavior, !0), a = o.initialize;
"function" == typeof a && (!t.hasOwnProperty("initializers") && (t.initializers = []), 
t.initializers.push(a), delete o.initialize);
var s = o.properties;
return delete o.properties, n(t, o), !t.hasOwnProperty("properties") && (t.properties = {}), 
s && n(t.properties, s), e;
}
});
a.extend = function(e, t) {
e || (e = {}), t || (t = {});
var i = r(this.Behavior, !0);
t.Behavior = n(i, e);
var s = o.extend.call(this, t);
return s.extend = a.extend, s;
}, t.exports = a;
}, {
"./WBSingleton": 8,
"./lib/assert": 11,
"./lib/clone": 12,
"./lib/extend": 18
} ],
7: [ function(e, t) {

function n(e) {
return function() {
var t = this.deferred;
return t[e].apply(t, arguments), this;
};
}
var r = e("./WBClass"), i = {
constructor: function(e) {
this.deferred = e;
},
promise: function() {
return this;
},
state: function() {
return this.deferred.state();
}
};
[ "done", "fail", "then" ].forEach(function(e) {
i[e] = n(e);
}), i.always = i.then, t.exports = r.extend(i);
}, {
"./WBClass": 3
} ],
8: [ function(e, t) {

function n(e, t) {
for (var n; e.length; ) n = e.shift(), "function" == typeof n.applyTo && n.applyTo(t);
}
function r(e) {
e = e || {};
var t = this || s;
a.prototype = t;
var u = new a(), c = e.mixins || [];
return e.mixins = void 0, n(c, u), i(u, e), u.extend = r, u.uid = o(), u;
}
var i = e("./lib/extend"), o = e("./lib/createUID"), a = function() {};
a.prototype = {
extend: r
};
var s = new a();
t.exports = s;
}, {
"./lib/createUID": 13,
"./lib/extend": 18
} ],
9: [ function(e, t) {

var n = e("./WBClass"), r = e("./mixins/WBDestroyableMixin"), i = r.Behavior.destroy, o = n.extend({
mixins: [ e("./mixins/WBEventsMixin"), e("./mixins/WBStateMixin"), e("./mixins/WBBindableMixin"), r ],
initialize: function(e) {
var t = this;
e && (t.attributes = e);
},
sync: function(e, t, n) {
n && "function" == typeof n.success && n.success();
},
fetch: function(e) {
var t = this, n = e.success, r = this;
return e.success = function(t) {
return r.set(t, e) ? (n && n(r, t, e), void r.trigger("sync", r, t, e)) : !1;
}, t.sync("read", t, e);
},
save: function(e, t, n) {
var r = this;
return r.destroying || (r.set(e, t, n), "object" == typeof e && (n = t), r.sync("update", r, n)), 
r;
},
destroy: function(e) {
var t = this;
t.destroying || (t.destroying = !0, i.call(t, e), t.attributes = {}, t.sync("delete", t, e));
}
});
t.exports = o;
}, {
"./WBClass": 3,
"./mixins/WBBindableMixin": 32,
"./mixins/WBDestroyableMixin": 33,
"./mixins/WBEventsMixin": 34,
"./mixins/WBStateMixin": 35
} ],
10: [ function(e, t) {

t.exports = {
lib: e("./lib"),
BaseEventEmitter: e("./BaseEventEmitter"),
BaseSingleton: e("./BaseSingleton"),
WBClass: e("./WBClass"),
WBDeferred: e("./WBDeferred"),
WBEventEmitter: e("./WBEventEmitter"),
WBMixin: e("./WBMixin"),
WBSingleton: e("./WBSingleton"),
WBStateModel: e("./WBStateModel"),
mixins: e("./mixins")
};
}, {
"./BaseEventEmitter": 1,
"./BaseSingleton": 2,
"./WBClass": 3,
"./WBDeferred": 4,
"./WBEventEmitter": 5,
"./WBMixin": 6,
"./WBSingleton": 8,
"./WBStateModel": 9,
"./lib": 22,
"./mixins": 37
} ],
11: [ function(e, t) {

function n(e, t) {
if (!e) throw new Error(t || "");
}
function r(e) {
n[e] = function(t, r) {
n(typeof t === e, r);
};
}
var i = Array.isArray;
n.empty = function(e, t) {
var r = i(e) ? e : Object.keys(e);
n(0 === r.length, t);
}, n.array = function(e, t) {
n(i(e), t);
}, n.class = function(e, t) {
var r = e.prototype;
n(r && r.constructor === e, t);
}, n.number = function(e, t) {
n("number" == typeof e && !isNaN(e), t);
};
for (var o = [ "undefined", "boolean", "string", "function", "object" ]; o.length; ) r(o.shift());
t.exports = n;
}, {} ],
12: [ function(e, t) {

function n(e, t) {
if (e = e.slice(), t) {
for (var n, r = []; e.length; ) n = e.shift(), n = n instanceof Object ? o(n, t) : n, 
r.push(n);
e = r;
}
return e;
}
function r(e) {
return new Date(e.getTime());
}
function i(e, t) {
var n = {};
for (var i in e) if (e.hasOwnProperty(i)) {
var a = e[i];
n[i] = a instanceof Date ? r(a) : "object" == typeof a && null !== a && t ? o(a, t) : a;
}
return n;
}
function o(e, t) {
return a(e) ? n(e, t) : i(e, t);
}
var a = Array.isArray;
t.exports = o;
}, {} ],
13: [ function(e, t) {

function n() {
return 4294967295 * l() | 0;
}
function r() {
var e = n();
return c[e & u] + c[e >> 8 & u] + c[e >> 16 & u] + c[e >> 24 & u];
}
function i() {
var e = n();
return c[e & u] + c[e >> 8 & u] + "-" + c[e >> 16 & 15 | 64] + c[e >> 24 & u];
}
function o() {
var e = n();
return c[63 & e | 128] + c[e >> 8 & u] + "-" + c[e >> 16 & u] + c[e >> 24 & u];
}
function a() {
var e = n();
return c[e & u] + c[e >> 8 & u] + c[e >> 16 & u] + c[e >> 24 & u];
}
function s(e) {
var t = [ r(), i(), o(), a() ].join("-");
return (e ? e : "").toString() + t;
}
for (var u = 255, c = [], f = 0; 256 > f; f++) c[f] = (16 > f ? "0" : "") + f.toString(16);
var l = Math.random;
t.exports = s;
}, {} ],
14: [ function(e, t) {

function n(e, t, n) {
var r;
return function() {
var i = this, o = arguments, a = function() {
r = null, n || e.apply(i, o);
}, s = n && !r;
clearTimeout(r), r = setTimeout(a, t), s && e.apply(i, o);
};
}
t.exports = n;
}, {} ],
15: [ function(e, t) {

function n(e) {
var t = r(arguments);
return t[0] = 1, t.unshift(e), i.apply(null, t);
}
var r = e("./toArray"), i = e("./delay");
t.exports = n;
}, {
"./delay": 16,
"./toArray": 27
} ],
16: [ function(e, t) {

function n(e, t, n) {
var i = r(arguments, 3);
return setTimeout(function() {
var t = n && n.destroyed;
!t && e.apply(n, i);
}, t);
}
var r = e("./toArray");
t.exports = n;
}, {
"./toArray": 27
} ],
17: [ function(e, t) {

var n = e("./assert"), r = e("./toArray"), i = e("./clone"), o = /\s+/, a = {
trigger: "Cannot trigger event(s) without event name(s)",
events: "Cannot bind/unbind without valid event name(s)",
callback: "Cannot bind/unbind to an event without valid callback function"
}, s = {
properties: {
_events: {},
_cache: {}
},
on: function(e, t, r) {
var i = this;
return n.string(e, a.events), n.function(t, a.callback), i.iterate(e, function(e) {
i.bind(e, t, r);
var n = i._cache;
n[e] && t.apply(r || i, n[e]);
}), i;
},
off: function(e, t, r) {
var i = this;
if (e && n.string(e, a.events), !e && !t && !r) return i._events = {}, i;
var o = e || Object.keys(i._events);
return i.iterate(o, function(e) {
i.unbind(e, t, r);
}), i;
},
once: function(e, t, n) {
var i = this, o = r(arguments);
return o[1] = function() {
i.off.apply(i, o), t.apply(n || i, arguments);
}, i.on.apply(i, o), i;
},
publish: function(e) {
var t = this, i = r(arguments);
return n.string(e, a.events), t.iterate(e, function(e) {
var n = t._cache;
n[e] || (n[e] = i.slice(1), i[0] = e, t.trigger.apply(t, i));
}), t;
},
unpublish: function(e) {
var t = this;
return n.string(e, a.events), t.iterate(e, function(e) {
t._cache[e] = void 0;
}), t;
},
unpublishAll: function() {
var e = this;
return e._cache = {}, e;
},
trigger: function(e) {
var t = this;
n.string(e, a.trigger);
var i = r(arguments, 1);
return t.iterate(e, function(e) {
t.triggerEvent(e, i);
}), t;
},
triggerEvent: function(e, t) {
for (var n, r = this, i = r._events || {}, o = [], a = e.split(":"); a.length; ) o.push(a.shift()), 
n = o.join(":"), n in i && r.triggerSection(n, a, t);
},
triggerSection: function(e, t, n) {
var r = this, o = r._events || {}, a = o[e] || [];
a.forEach(function(e) {
var o;
t.length && (o = i(n), o.unshift(t)), e.callback.apply(e.context || r, o || n);
});
},
iterate: function(e, t) {
var r = this, i = e;
for ("string" == typeof i ? i = i.split(o) : n.array(i); i.length; ) t.call(r, i.shift());
},
bind: function(e, t, n) {
var r = this, i = r._events || {}, o = i[e] || (i[e] = []);
return o.push({
callback: t,
context: n
}), r;
},
unbind: function(e, t, n) {
for (var r, i = this, o = i._events, a = o[e] || [], s = [], u = -1, c = a.length; ++u < c; ) r = a[u], 
(t && t !== r.callback || n && n !== r.context) && s.push(r);
return o[e] = s, i;
}
};
t.exports = s;
}, {
"./assert": 11,
"./clone": 12,
"./toArray": 27
} ],
18: [ function(e, t) {

function n() {
var e = r(arguments);
o(e.length > 0, "extend expect one or more objects");
for (var t = e.shift(); e.length; ) i(t, e.shift());
return t;
}
var r = e("./toArray"), i = e("./merge"), o = e("./assert");
t.exports = n;
}, {
"./assert": 11,
"./merge": 25,
"./toArray": 27
} ],
19: [ function(e, t) {

function n(e, t, n) {
for (var r = 0, i = e.length; i > r; r++) if (t.call(n, e[r], r, e) === !1) return;
}
function r(e, t, n) {
for (var r in e) if (e.hasOwnProperty(r) && t.call(n, e[r], r) === !1) return;
}
function i(e, t, i) {
var o = Array.isArray(e) ? n : r;
o(e, t, i);
}
t.exports = i;
}, {} ],
20: [ function(e, t) {

function n(e, t) {
var r = e.constructor, a = r.prototype, s = {};
e.hasOwnProperty(t) ? s = e[t] : a.hasOwnProperty(t) && (s = a[t]);
var u = r && r.__super__;
return u && (s = i(n(u, t), s)), o({}, s);
}
function r(e, t) {
var n = e.constructor, i = n.prototype, o = [];
e.hasOwnProperty(t) ? o = e[t] : i.hasOwnProperty(t) && (o = i[t]);
var a = n && n.__super__;
return a && (o = [].concat(r(a, t), o)), [].concat(o);
}
var i = e("./merge"), o = e("./extend");
t.exports = {
merge: n,
concat: r
};
}, {
"./extend": 18,
"./merge": 25
} ],
21: [ function(e, t) {

function n(e) {
var t = [];
for (var n in e) "function" == typeof e[n] && t.push(n);
return t;
}
t.exports = n;
}, {} ],
22: [ function(e, t) {

t.exports = {
assert: e("./assert"),
clone: e("./clone"),
createUID: e("./createUID"),
debounce: e("./debounce"),
defer: e("./defer"),
delay: e("./delay"),
events: e("./events"),
extend: e("./extend"),
forEach: e("./forEach"),
fromSuper: e("./fromSuper"),
functions: e("./functions"),
inherits: e("./inherits"),
isEqual: e("./isEqual"),
merge: e("./merge"),
size: e("./size"),
toArray: e("./toArray"),
when: e("./when"),
where: e("./where")
};
}, {
"./assert": 11,
"./clone": 12,
"./createUID": 13,
"./debounce": 14,
"./defer": 15,
"./delay": 16,
"./events": 17,
"./extend": 18,
"./forEach": 19,
"./fromSuper": 20,
"./functions": 21,
"./inherits": 23,
"./isEqual": 24,
"./merge": 25,
"./size": 26,
"./toArray": 27,
"./when": 28,
"./where": 29
} ],
23: [ function(e, t) {

function n(e, t, n) {
var i;
return i = t && t.hasOwnProperty("constructor") ? t.constructor : function() {
return e.apply(this, arguments);
}, r(i, e), i.prototype = Object.create(e.prototype), r(i.prototype, t), i.prototype.constructor = i, 
r(i, n), i.__super__ = e.prototype, i;
}
var r = e("./extend");
t.exports = n;
}, {
"./extend": 18
} ],
24: [ function(e, t) {

function n(e, t) {
return e === t;
}
t.exports = n;
}, {} ],
25: [ function(e, t) {

function n(e) {
for (var t, n = r(arguments, 1); n.length; ) {
t = n.shift();
for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
}
return e;
}
var r = e("./toArray");
t.exports = n;
}, {
"./toArray": 27
} ],
26: [ function(e, t) {

function n(e) {
return !Array.isArray(e) && (e = Object.keys(e)), e.length;
}
t.exports = n;
}, {} ],
27: [ function(e, t) {

function n(e) {
return e = e > 0 ? e : 0, new Array(e);
}
function r(e, t) {
for (var r = t || 0, i = e.length, o = n(i - r), a = r; i > a; a++) o[a - r] = e[a];
return o;
}
t.exports = r;
}, {} ],
28: [ function(e, t) {

function n() {
function e() {
o.rejectWith(this);
}
function t() {
if ("rejected" !== o.state()) {
var e = s - a.length - 1;
if (u[e] = i(arguments), a.length) {
var n = a.shift();
n.done(t);
} else u.unshift(this), o.resolveWith.apply(o, u);
}
}
var n = this, o = new r(n), a = i(arguments);
1 === a.length && Array.isArray(a[0]) && (a = a[0]);
var s = a.length, u = new Array(s);
if (a.length) {
a.forEach(function(t) {
t.fail(e);
});
var c = a.shift();
c.done(t);
} else o.resolve();
return o.promise();
}
var r = e("../WBDeferred"), i = e("./toArray");
t.exports = n;
}, {
"../WBDeferred": 4,
"./toArray": 27
} ],
29: [ function(e, t) {

function n(e, t) {
var n = [];
return r(e, function(e) {
for (var r in t) {
if (e[r] !== t[r]) return;
n.push(e);
}
}), n;
}
var r = e("./forEach");
t.exports = n;
}, {
"./forEach": 19
} ],
30: [ function(e, t) {

var n = e("../WBMixin"), r = e("../lib/fromSuper"), i = n.extend({
initialize: function() {
var e = this;
e.controllers = [], e.implemented = [], e.implements = r.concat(e, "implements"), 
e.createControllerInstances(), e.bindOnceTo(e, "destroy", "destroyControllers");
},
createControllerInstances: function() {
var e = this, t = e.implements;
"function" == typeof t && (t = t.call(e));
var n, r, i;
for (i = t.length; i--; ) n = t[i], e.implemented.indexOf(n.toString()) < 0 && (r = new n(e), 
e.controllers.push(r), r.parent = e, e.trackImplementedSuperConstructors(n));
return e.implemented;
},
trackImplementedSuperConstructors: function(e) {
var t = this, n = e.__super__, r = n && n.constructor;
r && (t.implemented.push(r.toString()), t.trackImplementedSuperConstructors(r));
},
destroyControllers: function() {
for (var e, t = this, n = t.controllers; n.length; ) e = n.shift(), e.destroyed || e.destroy();
}
});
t.exports = i;
}, {
"../WBMixin": 6,
"../lib/fromSuper": 20
} ],
31: [ function(e, t) {

var n = e("../WBMixin"), r = e("../lib/fromSuper"), i = e("../lib/clone"), o = n.extend({
initialize: function() {
var e = this, t = r.merge(e, "observes");
for (var n in t) e.bindToTarget(e.resolveTarget(n), t[n]);
},
bindToTarget: function(e, t) {
var n = this;
for (var r in t) n.bindHandlers(e, r, t[r]);
},
bindHandlers: function(e, t, n) {
var r = this;
for (n = "string" == typeof n ? [ n ] : i(n); n.length; ) r.bindTo(e, t, n.shift());
},
resolveTarget: function(e) {
var t = this;
if ("self" === e) return t;
var n = t[e];
if (!n && "string" == typeof e && e.indexOf(".") > -1) for (e = e.split("."), n = t; e.length && n; ) n = n[e.shift()];
return n;
}
});
t.exports = o;
}, {
"../WBMixin": 6,
"../lib/clone": 12,
"../lib/fromSuper": 20
} ],
32: [ function(e, t) {

var n = e("../WBMixin"), r = e("../lib/createUID"), i = n.extend({
properties: {
_bindings: {},
_namedEvents: {}
},
callbackFactory: function(e, t) {
var n, r = this;
return n = "string" == typeof e ? r.stringCallbackFactory(e, t) : r.functionCallbackFactory(e, t);
},
stringCallbackFactory: function(e, t) {
return function() {
t[e].apply(t, arguments);
};
},
functionCallbackFactory: function(e, t) {
return function() {
e.apply(t, arguments);
};
},
bindTo: function(e, t, n, i) {
var o = this;
o.checkBindingArgs.apply(o, arguments);
var a = i || o, s = o.isAlreadyBound(e, t, n, a);
if (s) return s;
var u, c;
o.isTargetJquery(e) ? (u = o.callbackFactory(n, a), c = [ t, u ]) : (u = "string" == typeof n ? a[n] : n, 
c = [ t, u, a ]), e.on.apply(e, c);
var f = {
uid: r(),
target: e,
event: t,
originalCallback: n,
callback: u,
context: a
};
return o._bindings[f.uid] = f, o.addToNamedBindings(t, f), f;
},
isTargetJquery: function(e) {
var t = e.constructor;
return t && t.fn && t.fn.on === e.on;
},
bindOnceTo: function(e, t, n, i) {
var o = this;
o.checkBindingArgs.apply(o, arguments), i = i || o;
var a = o.isAlreadyBound(e, t, n, i);
if (a) return a;
var s = function() {
("string" == typeof n ? i[n] : n).apply(i, arguments), o.unbindFrom(u);
}, u = {
uid: r(),
target: e,
event: t,
originalCallback: n,
callback: s,
context: i
};
return e.on(t, s, i), o._bindings[u.uid] = u, o.addToNamedBindings(t, u), u;
},
unbindFrom: function(e) {
var t = this, n = e && e.uid;
if (!e || "string" != typeof n) throw new Error("Cannot unbind from undefined or invalid binding");
var r = e.event, i = e.context, o = e.callback, a = e.target;
if (r && o && a && i) {
a.off(r, o, i);
for (var s in e) "uid" !== s && delete e[s];
delete t._bindings[n];
var u = t._namedEvents, c = u[r];
if (c) {
for (var f = c && c.slice(0), l = c.length - 1; l >= 0; l--) c[l].uid === n && f.splice(l, 1);
u[r] = f;
}
}
},
unbindFromTarget: function(e) {
var t = this;
if (!e || "function" != typeof e.on) throw new Error("Cannot unbind from undefined or invalid binding target");
var n;
for (var r in t._bindings) n = t._bindings[r], n.target === e && t.unbindFrom(n);
},
unbindAll: function() {
var e, t = this;
for (var n in t._bindings) e = t._bindings[n], t.unbindFrom(e);
},
checkBindingArgs: function(e, t, n, r) {
if (r = r || this, !e || "function" != typeof e.on) throw new Error("Cannot bind to undefined target or target without #on method");
if (!t || "string" != typeof t) throw new Error("Cannot bind to target event without event name");
if (!n || "function" != typeof n && "string" != typeof n) throw new Error("Cannot bind to target event without a function or method name as callback");
if ("string" == typeof n && !r[n]) throw new Error("Cannot bind to target using a method name that does not exist for the context");
},
isAlreadyBound: function(e, t, n, r) {
var i = this, o = i._namedEvents[t];
if (o) for (var a = 0, s = o.length; s > a; a++) {
var u = o[a] || {}, c = u.target;
if (!c) return !1;
var f = e.uid ? e.uid === c.uid : !1;
if (u.originalCallback === n && u.context === r && f) return u;
}
return !1;
},
addToNamedBindings: function(e, t) {
var n = this;
n._namedEvents[e] || (n._namedEvents[e] = []), n._namedEvents[e].push(t);
}
});
t.exports = i;
}, {
"../WBMixin": 6,
"../lib/createUID": 13
} ],
33: [ function(e, t) {

function n() {}
function r(e) {
var t = this;
"string" == typeof e && (e = t[e]), "function" == typeof e && e.call(t);
}
var i = e("../lib/forEach"), o = e("../WBMixin"), a = [ "unbind", "unbindAll", "onDestroy" ], s = o.extend({
destroy: function() {
var e = this;
e.trigger("destroy"), i(a, r, e), e.destroyObject(e), e.destroyed = !0;
},
destroyObject: function(e) {
var t = this;
for (var n in e) t.destroyKey(n, e);
},
destroyKey: function(e, t) {
t.hasOwnProperty(e) && "uid" !== e && "cid" !== e && (t[e] = "function" == typeof t[e] ? n : void 0);
}
});
t.exports = s;
}, {
"../WBMixin": 6,
"../lib/forEach": 19
} ],
34: [ function(e, t) {

var n = e("../WBMixin"), r = e("../lib/events"), i = n.extend(r);
t.exports = i;
}, {
"../WBMixin": 6,
"../lib/events": 17
} ],
35: [ function(e, t) {

var n = e("../lib/clone"), r = e("../lib/merge"), i = e("../lib/extend"), o = e("../lib/isEqual"), a = e("../WBMixin"), s = a.extend({
attributes: {},
options: {},
initialize: function(e, t) {
var n = this;
n.attributes = i({}, n.defaults, e), n.options = t || {}, n.changed = {};
},
get: function(e) {
return console.warn("getters are deprecated"), this.attributes[e];
},
set: function(e, t, n) {
var i = this;
if (null === e) return i;
var o, a;
if ("object" == typeof e ? (o = e, n = t) : (o = {}, o[e] = t), n || (n = {}), n.silent) r(i.attributes, a); else {
var s = i.changes(o, n);
i._trigger(o, s, n);
}
return i;
},
unset: function(e, t) {
return this.set(e, void 0, i({}, t, {
unset: !0
}));
},
clear: function(e) {
var t = this;
return t.set(t.defaults, e);
},
changes: function(e, t) {
var r, i, a = this, s = [], u = n(a.attributes, !0), c = a.attributes;
a.changed = {};
for (r in e) i = e[r], o(c[r], i) || s.push(r), o(u[r], i) ? delete a.changed[r] : a.changed[r] = i, 
c[r] = t.unset ? void 0 : i;
return s;
},
_trigger: function(e, t, n) {
for (var r, i = this, o = i.attributes; t && t.length && i.trigger; ) r = t.shift(), 
i.trigger("change:" + r, i, o[r], n);
}
});
t.exports = s;
}, {
"../WBMixin": 6,
"../lib/clone": 12,
"../lib/extend": 18,
"../lib/isEqual": 24,
"../lib/merge": 25
} ],
36: [ function(e, t) {

var n = e("../WBMixin"), r = e("../WBDeferred"), i = e("../lib/when"), o = e("../lib/toArray"), a = e("../lib/forEach"), s = e("../lib/delay"), u = e("../lib/defer"), c = e("../lib/functions"), f = n.extend({
deferred: function() {
var e = this;
return new r(e);
},
when: function() {
var e = this;
return i.apply(e, arguments);
},
defer: function(e) {
var t = this, n = o(arguments);
return n[1] = n[1] || this, "string" == typeof e && (n[0] = t[e]), u.apply(null, n);
},
delay: function(e) {
var t = this, n = o(arguments);
return n[2] = n[2] || t, "string" == typeof e && (n[0] = t[e]), s.apply(null, n);
},
forEach: function(e, t, n) {
var r = this;
n = n || r, "string" == typeof t && (t = r[t]), a(e, t, n);
},
functions: function(e) {
return c(e || this);
}
});
t.exports = f;
}, {
"../WBDeferred": 4,
"../WBMixin": 6,
"../lib/defer": 15,
"../lib/delay": 16,
"../lib/forEach": 19,
"../lib/functions": 21,
"../lib/toArray": 27,
"../lib/when": 28
} ],
37: [ function(e, t) {

t.exports = {
ControllableMixin: e("./ControllableMixin"),
ObservableHashMixin: e("./ObservableHashMixin"),
WBBindableMixin: e("./WBBindableMixin"),
WBDestroyableMixin: e("./WBDestroyableMixin"),
WBEventsMixin: e("./WBEventsMixin"),
WBStateMixin: e("./WBStateMixin"),
WBUtilsMixin: e("./WBUtilsMixin")
};
}, {
"./ControllableMixin": 30,
"./ObservableHashMixin": 31,
"./WBBindableMixin": 32,
"./WBDestroyableMixin": 33,
"./WBEventsMixin": 34,
"./WBStateMixin": 35,
"./WBUtilsMixin": 36
} ]
}, {}, [ 10 ])(10);
});
!function(e) {
if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define('wunderbits/db/dist/wunderbits.db',e); else {
var t;
"undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), 
(t.wunderbits || (t.wunderbits = {})).db = e();
}
}(function() {
return function e(t, n, r) {
function i(a, s) {
if (!n[a]) {
if (!t[a]) {
var u = "function" == typeof require && require;
if (!s && u) return u(a, !0);
if (o) return o(a, !0);
throw new Error("Cannot find module '" + a + "'");
}
var c = n[a] = {
exports: {}
};
t[a][0].call(c.exports, function(e) {
var n = t[a][1][e];
return i(n ? n : e);
}, c, c.exports, e, t, n, r);
}
return n[a].exports;
}
for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
return i;
}({
1: [ function(e, t) {

var n = e("./WBEventEmitter").extend({
mixins: [ e("./mixins/WBDestroyableMixin"), e("./mixins/WBUtilsMixin"), e("./mixins/ObservableHashMixin") ]
});
t.exports = n;
}, {
"./WBEventEmitter": 5,
"./mixins/ObservableHashMixin": 31,
"./mixins/WBDestroyableMixin": 33,
"./mixins/WBUtilsMixin": 36
} ],
2: [ function(e, t) {

var n = e("./WBSingleton").extend({
mixins: [ e("./mixins/WBEventsMixin"), e("./mixins/WBBindableMixin"), e("./mixins/WBDestroyableMixin"), e("./mixins/WBUtilsMixin"), e("./mixins/ObservableHashMixin") ]
});
t.exports = n;
}, {
"./WBSingleton": 8,
"./mixins/ObservableHashMixin": 31,
"./mixins/WBBindableMixin": 32,
"./mixins/WBDestroyableMixin": 33,
"./mixins/WBEventsMixin": 34,
"./mixins/WBUtilsMixin": 36
} ],
3: [ function(e, t) {

function n(e, t) {
var r = this;
e = e || {};
var o = e.mixins || [];
delete e.mixins;
for (var a, s = i(r, e, t); o.length; ) a = o.shift(), "function" == typeof a.applyToClass && a.applyToClass(s);
return s.extend = r.extend || n, s;
}
function r(e) {
var t = this;
t.uid = t.uid || s(), t.options = e || t.options, t.augmentProperties(), t.initialize.apply(t, arguments), 
t.initMixins.apply(t, arguments);
}
var i = e("./lib/inherits"), o = e("./lib/extend"), a = e("./lib/clone"), s = e("./lib/createUID"), u = e("./lib/fromSuper"), c = {
initialize: function() {
var e = this;
return e;
},
initMixins: function() {
for (var e, t = this, n = u.concat(t, "initializers"); n.length; ) e = n.shift(), 
"function" == typeof e && e.apply(t, arguments);
},
augmentProperties: function() {
function e(e, n) {
var r = typeof n;
t[e] = "function" === r ? n.call(t) : "object" === r ? a(n, !0) : n;
}
var t = this, n = u.merge(t, "properties");
for (var r in n) e(r, n[r]);
}
};
o(r.prototype, c), r.extend = n, t.exports = r;
}, {
"./lib/clone": 12,
"./lib/createUID": 13,
"./lib/extend": 18,
"./lib/fromSuper": 20,
"./lib/inherits": 23
} ],
4: [ function(e, t) {

function n(e, t, n) {
return function() {
var r = this;
if (!(r instanceof f)) throw new Error(n + " invoked with wrong context");
if (r._state !== s.pending) return r;
r._args = a(arguments);
var i = t ? r._args.shift() : void 0;
return r._state = e, r.trigger(i), r;
};
}
var r = e("./WBClass"), i = e("./WBPromise"), o = e("./lib/assert"), a = e("./lib/toArray"), s = {
pending: 0,
resolved: 2,
rejected: 4
}, u = {
0: [ "pending" ],
2: [ "resolved", "resolve" ],
4: [ "rejected", "reject" ]
}, c = {
properties: {
_state: s.pending,
_args: [],
handlers: []
},
initialize: function(e) {
var t = this;
t._context = e;
},
state: function() {
var e = this;
return u[e._state][0];
},
trigger: function(e) {
var t = this;
if (t._state !== s.pending) for (var n, r = t.handlers; r.length; ) n = r.shift(), 
t.invoke(n, e || t._context);
},
invoke: function(e, t) {
var n = this, r = n._state, i = e.context || t || n, o = e.args;
n._args.forEach(function(e) {
o.push(e);
});
var a = e.type, u = "then" === a || "done" === a && r === s.resolved || "fail" === a && r === s.rejected;
u && e.fn.apply(i, o);
},
promise: function() {
var e = this;
return e._promise = e._promise || new i(this), e._promise;
}
};
[ "then", "done", "fail" ].forEach(function(e) {
c[e] = function() {
var t = this, n = a(arguments), r = n.shift(), i = n.shift();
return o.function(r, e + " accepts only functions"), t.handlers.push({
type: e,
context: i,
fn: r,
args: n
}), t.trigger(), t;
};
}), c.always = c.then, [ s.resolved, s.rejected ].forEach(function(e) {
var t = u[e][1];
c[t] = n(e, !1, t), c[t + "With"] = n(e, !0, t);
});
var f = r.extend(c);
t.exports = f;
}, {
"./WBClass": 3,
"./WBPromise": 7,
"./lib/assert": 11,
"./lib/toArray": 27
} ],
5: [ function(e, t) {

var n = e("./WBClass").extend({
mixins: [ e("./mixins/WBBindableMixin"), e("./mixins/WBEventsMixin") ]
});
t.exports = n;
}, {
"./WBClass": 3,
"./mixins/WBBindableMixin": 32,
"./mixins/WBEventsMixin": 34
} ],
6: [ function(e, t) {

var n = e("./lib/extend"), r = e("./lib/clone"), i = e("./lib/assert"), o = e("./WBSingleton"), a = o.extend({
applyTo: function(e) {
var t, i = r(this.Behavior, !0);
"function" == typeof i.initialize && (t = i.initialize, delete i.initialize);
var o = i.properties;
return delete i.properties, n(e, i), t && t.apply(e), o && n(e, o), e;
},
applyToClass: function(e) {
i.class(e, "applyToClass expects a class");
var t = e.prototype, o = r(this.Behavior, !0), a = o.initialize;
"function" == typeof a && (!t.hasOwnProperty("initializers") && (t.initializers = []), 
t.initializers.push(a), delete o.initialize);
var s = o.properties;
return delete o.properties, n(t, o), !t.hasOwnProperty("properties") && (t.properties = {}), 
s && n(t.properties, s), e;
}
});
a.extend = function(e, t) {
e || (e = {}), t || (t = {});
var i = r(this.Behavior, !0);
t.Behavior = n(i, e);
var s = o.extend.call(this, t);
return s.extend = a.extend, s;
}, t.exports = a;
}, {
"./WBSingleton": 8,
"./lib/assert": 11,
"./lib/clone": 12,
"./lib/extend": 18
} ],
7: [ function(e, t) {

function n(e) {
return function() {
var t = this.deferred;
return t[e].apply(t, arguments), this;
};
}
var r = e("./WBClass"), i = {
constructor: function(e) {
this.deferred = e;
},
promise: function() {
return this;
},
state: function() {
return this.deferred.state();
}
};
[ "done", "fail", "then" ].forEach(function(e) {
i[e] = n(e);
}), i.always = i.then, t.exports = r.extend(i);
}, {
"./WBClass": 3
} ],
8: [ function(e, t) {

function n(e, t) {
for (var n; e.length; ) n = e.shift(), "function" == typeof n.applyTo && n.applyTo(t);
}
function r(e) {
e = e || {};
var t = this || s;
a.prototype = t;
var u = new a(), c = e.mixins || [];
return e.mixins = void 0, n(c, u), i(u, e), u.extend = r, u.uid = o(), u;
}
var i = e("./lib/extend"), o = e("./lib/createUID"), a = function() {};
a.prototype = {
extend: r
};
var s = new a();
t.exports = s;
}, {
"./lib/createUID": 13,
"./lib/extend": 18
} ],
9: [ function(e, t) {

var n = e("./WBClass"), r = e("./mixins/WBDestroyableMixin"), i = r.Behavior.destroy, o = n.extend({
mixins: [ e("./mixins/WBEventsMixin"), e("./mixins/WBStateMixin"), e("./mixins/WBBindableMixin"), r ],
initialize: function(e) {
var t = this;
e && (t.attributes = e);
},
sync: function(e, t, n) {
n && "function" == typeof n.success && n.success();
},
fetch: function(e) {
var t = this, n = e.success, r = this;
return e.success = function(t) {
return r.set(t, e) ? (n && n(r, t, e), void r.trigger("sync", r, t, e)) : !1;
}, t.sync("read", t, e);
},
save: function(e, t, n) {
var r = this;
return r.destroying || (r.set(e, t, n), "object" == typeof e && (n = t), r.sync("update", r, n)), 
r;
},
destroy: function(e) {
var t = this;
t.destroying || (t.destroying = !0, i.call(t, e), t.attributes = {}, t.sync("delete", t, e));
}
});
t.exports = o;
}, {
"./WBClass": 3,
"./mixins/WBBindableMixin": 32,
"./mixins/WBDestroyableMixin": 33,
"./mixins/WBEventsMixin": 34,
"./mixins/WBStateMixin": 35
} ],
10: [ function(e, t) {

t.exports = {
lib: e("./lib"),
BaseEventEmitter: e("./BaseEventEmitter"),
BaseSingleton: e("./BaseSingleton"),
WBClass: e("./WBClass"),
WBDeferred: e("./WBDeferred"),
WBEventEmitter: e("./WBEventEmitter"),
WBMixin: e("./WBMixin"),
WBSingleton: e("./WBSingleton"),
WBStateModel: e("./WBStateModel"),
mixins: e("./mixins")
};
}, {
"./BaseEventEmitter": 1,
"./BaseSingleton": 2,
"./WBClass": 3,
"./WBDeferred": 4,
"./WBEventEmitter": 5,
"./WBMixin": 6,
"./WBSingleton": 8,
"./WBStateModel": 9,
"./lib": 22,
"./mixins": 37
} ],
11: [ function(e, t) {

function n(e, t) {
if (!e) throw new Error(t || "");
}
function r(e) {
n[e] = function(t, r) {
n(typeof t === e, r);
};
}
var i = Array.isArray;
n.empty = function(e, t) {
var r = i(e) ? e : Object.keys(e);
n(0 === r.length, t);
}, n.array = function(e, t) {
n(i(e), t);
}, n.class = function(e, t) {
var r = e.prototype;
n(r && r.constructor === e, t);
}, n.number = function(e, t) {
n("number" == typeof e && !isNaN(e), t);
};
for (var o = [ "undefined", "boolean", "string", "function", "object" ]; o.length; ) r(o.shift());
t.exports = n;
}, {} ],
12: [ function(e, t) {

function n(e, t) {
if (e = e.slice(), t) {
for (var n, r = []; e.length; ) n = e.shift(), n = n instanceof Object ? o(n, t) : n, 
r.push(n);
e = r;
}
return e;
}
function r(e) {
return new Date(e.getTime());
}
function i(e, t) {
var n = {};
for (var i in e) if (e.hasOwnProperty(i)) {
var a = e[i];
n[i] = a instanceof Date ? r(a) : "object" == typeof a && null !== a && t ? o(a, t) : a;
}
return n;
}
function o(e, t) {
return a(e) ? n(e, t) : i(e, t);
}
var a = Array.isArray;
t.exports = o;
}, {} ],
13: [ function(e, t) {

function n() {
return 4294967295 * l() | 0;
}
function r() {
var e = n();
return c[e & u] + c[e >> 8 & u] + c[e >> 16 & u] + c[e >> 24 & u];
}
function i() {
var e = n();
return c[e & u] + c[e >> 8 & u] + "-" + c[e >> 16 & 15 | 64] + c[e >> 24 & u];
}
function o() {
var e = n();
return c[63 & e | 128] + c[e >> 8 & u] + "-" + c[e >> 16 & u] + c[e >> 24 & u];
}
function a() {
var e = n();
return c[e & u] + c[e >> 8 & u] + c[e >> 16 & u] + c[e >> 24 & u];
}
function s(e) {
var t = [ r(), i(), o(), a() ].join("-");
return (e ? e : "").toString() + t;
}
for (var u = 255, c = [], f = 0; 256 > f; f++) c[f] = (16 > f ? "0" : "") + f.toString(16);
var l = Math.random;
t.exports = s;
}, {} ],
14: [ function(e, t) {

function n(e, t, n) {
var r;
return function() {
var i = this, o = arguments, a = function() {
r = null, n || e.apply(i, o);
}, s = n && !r;
clearTimeout(r), r = setTimeout(a, t), s && e.apply(i, o);
};
}
t.exports = n;
}, {} ],
15: [ function(e, t) {

function n(e) {
var t = r(arguments);
return t[0] = 1, t.unshift(e), i.apply(null, t);
}
var r = e("./toArray"), i = e("./delay");
t.exports = n;
}, {
"./delay": 16,
"./toArray": 27
} ],
16: [ function(e, t) {

function n(e, t, n) {
var i = r(arguments, 3);
return setTimeout(function() {
var t = n && n.destroyed;
!t && e.apply(n, i);
}, t);
}
var r = e("./toArray");
t.exports = n;
}, {
"./toArray": 27
} ],
17: [ function(e, t) {

var n = e("./assert"), r = e("./toArray"), i = e("./clone"), o = /\s+/, a = {
trigger: "Cannot trigger event(s) without event name(s)",
events: "Cannot bind/unbind without valid event name(s)",
callback: "Cannot bind/unbind to an event without valid callback function"
}, s = {
properties: {
_events: {},
_cache: {}
},
on: function(e, t, r) {
var i = this;
return n.string(e, a.events), n.function(t, a.callback), i.iterate(e, function(e) {
i.bind(e, t, r);
var n = i._cache;
n[e] && t.apply(r || i, n[e]);
}), i;
},
off: function(e, t, r) {
var i = this;
if (e && n.string(e, a.events), !e && !t && !r) return i._events = {}, i;
var o = e || Object.keys(i._events);
return i.iterate(o, function(e) {
i.unbind(e, t, r);
}), i;
},
once: function(e, t, n) {
var i = this, o = r(arguments);
return o[1] = function() {
i.off.apply(i, o), t.apply(n || i, arguments);
}, i.on.apply(i, o), i;
},
publish: function(e) {
var t = this, i = r(arguments);
return n.string(e, a.events), t.iterate(e, function(e) {
var n = t._cache;
n[e] || (n[e] = i.slice(1), i[0] = e, t.trigger.apply(t, i));
}), t;
},
unpublish: function(e) {
var t = this;
return n.string(e, a.events), t.iterate(e, function(e) {
t._cache[e] = void 0;
}), t;
},
unpublishAll: function() {
var e = this;
return e._cache = {}, e;
},
trigger: function(e) {
var t = this;
n.string(e, a.trigger);
var i = r(arguments, 1);
return t.iterate(e, function(e) {
t.triggerEvent(e, i);
}), t;
},
triggerEvent: function(e, t) {
for (var n, r = this, i = r._events || {}, o = [], a = e.split(":"); a.length; ) o.push(a.shift()), 
n = o.join(":"), n in i && r.triggerSection(n, a, t);
},
triggerSection: function(e, t, n) {
var r = this, o = r._events || {}, a = o[e] || [];
a.forEach(function(e) {
var o;
t.length && (o = i(n), o.unshift(t)), e.callback.apply(e.context || r, o || n);
});
},
iterate: function(e, t) {
var r = this, i = e;
for ("string" == typeof i ? i = i.split(o) : n.array(i); i.length; ) t.call(r, i.shift());
},
bind: function(e, t, n) {
var r = this, i = r._events || {}, o = i[e] || (i[e] = []);
return o.push({
callback: t,
context: n
}), r;
},
unbind: function(e, t, n) {
for (var r, i = this, o = i._events, a = o[e] || [], s = [], u = -1, c = a.length; ++u < c; ) r = a[u], 
(t && t !== r.callback || n && n !== r.context) && s.push(r);
return o[e] = s, i;
}
};
t.exports = s;
}, {
"./assert": 11,
"./clone": 12,
"./toArray": 27
} ],
18: [ function(e, t) {

function n() {
var e = r(arguments);
o(e.length > 0, "extend expect one or more objects");
for (var t = e.shift(); e.length; ) i(t, e.shift());
return t;
}
var r = e("./toArray"), i = e("./merge"), o = e("./assert");
t.exports = n;
}, {
"./assert": 11,
"./merge": 25,
"./toArray": 27
} ],
19: [ function(e, t) {

function n(e, t, n) {
for (var r = 0, i = e.length; i > r; r++) if (t.call(n, e[r], r, e) === !1) return;
}
function r(e, t, n) {
for (var r in e) if (e.hasOwnProperty(r) && t.call(n, e[r], r) === !1) return;
}
function i(e, t, i) {
var o = Array.isArray(e) ? n : r;
o(e, t, i);
}
t.exports = i;
}, {} ],
20: [ function(e, t) {

function n(e, t) {
var r = e.constructor, a = r.prototype, s = {};
e.hasOwnProperty(t) ? s = e[t] : a.hasOwnProperty(t) && (s = a[t]);
var u = r && r.__super__;
return u && (s = i(n(u, t), s)), o({}, s);
}
function r(e, t) {
var n = e.constructor, i = n.prototype, o = [];
e.hasOwnProperty(t) ? o = e[t] : i.hasOwnProperty(t) && (o = i[t]);
var a = n && n.__super__;
return a && (o = [].concat(r(a, t), o)), [].concat(o);
}
var i = e("./merge"), o = e("./extend");
t.exports = {
merge: n,
concat: r
};
}, {
"./extend": 18,
"./merge": 25
} ],
21: [ function(e, t) {

function n(e) {
var t = [];
for (var n in e) "function" == typeof e[n] && t.push(n);
return t;
}
t.exports = n;
}, {} ],
22: [ function(e, t) {

t.exports = {
assert: e("./assert"),
clone: e("./clone"),
createUID: e("./createUID"),
debounce: e("./debounce"),
defer: e("./defer"),
delay: e("./delay"),
events: e("./events"),
extend: e("./extend"),
forEach: e("./forEach"),
fromSuper: e("./fromSuper"),
functions: e("./functions"),
inherits: e("./inherits"),
isEqual: e("./isEqual"),
merge: e("./merge"),
size: e("./size"),
toArray: e("./toArray"),
when: e("./when"),
where: e("./where")
};
}, {
"./assert": 11,
"./clone": 12,
"./createUID": 13,
"./debounce": 14,
"./defer": 15,
"./delay": 16,
"./events": 17,
"./extend": 18,
"./forEach": 19,
"./fromSuper": 20,
"./functions": 21,
"./inherits": 23,
"./isEqual": 24,
"./merge": 25,
"./size": 26,
"./toArray": 27,
"./when": 28,
"./where": 29
} ],
23: [ function(e, t) {

function n(e, t, n) {
var i;
return i = t && t.hasOwnProperty("constructor") ? t.constructor : function() {
return e.apply(this, arguments);
}, r(i, e), i.prototype = Object.create(e.prototype), r(i.prototype, t), i.prototype.constructor = i, 
r(i, n), i.__super__ = e.prototype, i;
}
var r = e("./extend");
t.exports = n;
}, {
"./extend": 18
} ],
24: [ function(e, t) {

function n(e, t) {
return e === t;
}
t.exports = n;
}, {} ],
25: [ function(e, t) {

function n(e) {
for (var t, n = r(arguments, 1); n.length; ) {
t = n.shift();
for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
}
return e;
}
var r = e("./toArray");
t.exports = n;
}, {
"./toArray": 27
} ],
26: [ function(e, t) {

function n(e) {
return !Array.isArray(e) && (e = Object.keys(e)), e.length;
}
t.exports = n;
}, {} ],
27: [ function(e, t) {

function n(e) {
return e = e > 0 ? e : 0, new Array(e);
}
function r(e, t) {
for (var r = t || 0, i = e.length, o = n(i - r), a = r; i > a; a++) o[a - r] = e[a];
return o;
}
t.exports = r;
}, {} ],
28: [ function(e, t) {

function n() {
function e() {
o.rejectWith(this);
}
function t() {
if ("rejected" !== o.state()) {
var e = s - a.length - 1;
if (u[e] = i(arguments), a.length) {
var n = a.shift();
n.done(t);
} else u.unshift(this), o.resolveWith.apply(o, u);
}
}
var n = this, o = new r(n), a = i(arguments);
1 === a.length && Array.isArray(a[0]) && (a = a[0]);
var s = a.length, u = new Array(s);
if (a.length) {
a.forEach(function(t) {
t.fail(e);
});
var c = a.shift();
c.done(t);
} else o.resolve();
return o.promise();
}
var r = e("../WBDeferred"), i = e("./toArray");
t.exports = n;
}, {
"../WBDeferred": 4,
"./toArray": 27
} ],
29: [ function(e, t) {

function n(e, t) {
var n = [];
return r(e, function(e) {
for (var r in t) {
if (e[r] !== t[r]) return;
n.push(e);
}
}), n;
}
var r = e("./forEach");
t.exports = n;
}, {
"./forEach": 19
} ],
30: [ function(e, t) {

var n = e("../WBMixin"), r = e("../lib/fromSuper"), i = n.extend({
initialize: function() {
var e = this;
e.controllers = [], e.implemented = [], e.implements = r.concat(e, "implements"), 
e.createControllerInstances(), e.bindOnceTo(e, "destroy", "destroyControllers");
},
createControllerInstances: function() {
var e = this, t = e.implements;
"function" == typeof t && (t = t.call(e));
var n, r, i;
for (i = t.length; i--; ) n = t[i], e.implemented.indexOf(n.toString()) < 0 && (r = new n(e), 
e.controllers.push(r), r.parent = e, e.trackImplementedSuperConstructors(n));
return e.implemented;
},
trackImplementedSuperConstructors: function(e) {
var t = this, n = e.__super__, r = n && n.constructor;
r && (t.implemented.push(r.toString()), t.trackImplementedSuperConstructors(r));
},
destroyControllers: function() {
for (var e, t = this, n = t.controllers; n.length; ) e = n.shift(), e.destroyed || e.destroy();
}
});
t.exports = i;
}, {
"../WBMixin": 6,
"../lib/fromSuper": 20
} ],
31: [ function(e, t) {

var n = e("../WBMixin"), r = e("../lib/fromSuper"), i = e("../lib/clone"), o = n.extend({
initialize: function() {
var e = this, t = r.merge(e, "observes");
for (var n in t) e.bindToTarget(e.resolveTarget(n), t[n]);
},
bindToTarget: function(e, t) {
var n = this;
for (var r in t) n.bindHandlers(e, r, t[r]);
},
bindHandlers: function(e, t, n) {
var r = this;
for (n = "string" == typeof n ? [ n ] : i(n); n.length; ) r.bindTo(e, t, n.shift());
},
resolveTarget: function(e) {
var t = this;
if ("self" === e) return t;
var n = t[e];
if (!n && "string" == typeof e && e.indexOf(".") > -1) for (e = e.split("."), n = t; e.length && n; ) n = n[e.shift()];
return n;
}
});
t.exports = o;
}, {
"../WBMixin": 6,
"../lib/clone": 12,
"../lib/fromSuper": 20
} ],
32: [ function(e, t) {

var n = e("../WBMixin"), r = e("../lib/createUID"), i = n.extend({
properties: {
_bindings: {},
_namedEvents: {}
},
callbackFactory: function(e, t) {
var n, r = this;
return n = "string" == typeof e ? r.stringCallbackFactory(e, t) : r.functionCallbackFactory(e, t);
},
stringCallbackFactory: function(e, t) {
return function() {
t[e].apply(t, arguments);
};
},
functionCallbackFactory: function(e, t) {
return function() {
e.apply(t, arguments);
};
},
bindTo: function(e, t, n, i) {
var o = this;
o.checkBindingArgs.apply(o, arguments);
var a = i || o, s = o.isAlreadyBound(e, t, n, a);
if (s) return s;
var u, c;
o.isTargetJquery(e) ? (u = o.callbackFactory(n, a), c = [ t, u ]) : (u = "string" == typeof n ? a[n] : n, 
c = [ t, u, a ]), e.on.apply(e, c);
var f = {
uid: r(),
target: e,
event: t,
originalCallback: n,
callback: u,
context: a
};
return o._bindings[f.uid] = f, o.addToNamedBindings(t, f), f;
},
isTargetJquery: function(e) {
var t = e.constructor;
return t && t.fn && t.fn.on === e.on;
},
bindOnceTo: function(e, t, n, i) {
var o = this;
o.checkBindingArgs.apply(o, arguments), i = i || o;
var a = o.isAlreadyBound(e, t, n, i);
if (a) return a;
var s = function() {
("string" == typeof n ? i[n] : n).apply(i, arguments), o.unbindFrom(u);
}, u = {
uid: r(),
target: e,
event: t,
originalCallback: n,
callback: s,
context: i
};
return e.on(t, s, i), o._bindings[u.uid] = u, o.addToNamedBindings(t, u), u;
},
unbindFrom: function(e) {
var t = this, n = e && e.uid;
if (!e || "string" != typeof n) throw new Error("Cannot unbind from undefined or invalid binding");
var r = e.event, i = e.context, o = e.callback, a = e.target;
if (r && o && a && i) {
a.off(r, o, i);
for (var s in e) "uid" !== s && delete e[s];
delete t._bindings[n];
var u = t._namedEvents, c = u[r];
if (c) {
for (var f = c && c.slice(0), l = c.length - 1; l >= 0; l--) c[l].uid === n && f.splice(l, 1);
u[r] = f;
}
}
},
unbindFromTarget: function(e) {
var t = this;
if (!e || "function" != typeof e.on) throw new Error("Cannot unbind from undefined or invalid binding target");
var n;
for (var r in t._bindings) n = t._bindings[r], n.target === e && t.unbindFrom(n);
},
unbindAll: function() {
var e, t = this;
for (var n in t._bindings) e = t._bindings[n], t.unbindFrom(e);
},
checkBindingArgs: function(e, t, n, r) {
if (r = r || this, !e || "function" != typeof e.on) throw new Error("Cannot bind to undefined target or target without #on method");
if (!t || "string" != typeof t) throw new Error("Cannot bind to target event without event name");
if (!n || "function" != typeof n && "string" != typeof n) throw new Error("Cannot bind to target event without a function or method name as callback");
if ("string" == typeof n && !r[n]) throw new Error("Cannot bind to target using a method name that does not exist for the context");
},
isAlreadyBound: function(e, t, n, r) {
var i = this, o = i._namedEvents[t];
if (o) for (var a = 0, s = o.length; s > a; a++) {
var u = o[a] || {}, c = u.target;
if (!c) return !1;
var f = e.uid ? e.uid === c.uid : !1;
if (u.originalCallback === n && u.context === r && f) return u;
}
return !1;
},
addToNamedBindings: function(e, t) {
var n = this;
n._namedEvents[e] || (n._namedEvents[e] = []), n._namedEvents[e].push(t);
}
});
t.exports = i;
}, {
"../WBMixin": 6,
"../lib/createUID": 13
} ],
33: [ function(e, t) {

function n() {}
function r(e) {
var t = this;
"string" == typeof e && (e = t[e]), "function" == typeof e && e.call(t);
}
var i = e("../lib/forEach"), o = e("../WBMixin"), a = [ "unbind", "unbindAll", "onDestroy" ], s = o.extend({
destroy: function() {
var e = this;
e.trigger("destroy"), i(a, r, e), e.destroyObject(e), e.destroyed = !0;
},
destroyObject: function(e) {
var t = this;
for (var n in e) t.destroyKey(n, e);
},
destroyKey: function(e, t) {
t.hasOwnProperty(e) && "uid" !== e && "cid" !== e && (t[e] = "function" == typeof t[e] ? n : void 0);
}
});
t.exports = s;
}, {
"../WBMixin": 6,
"../lib/forEach": 19
} ],
34: [ function(e, t) {

var n = e("../WBMixin"), r = e("../lib/events"), i = n.extend(r);
t.exports = i;
}, {
"../WBMixin": 6,
"../lib/events": 17
} ],
35: [ function(e, t) {

var n = e("../lib/clone"), r = e("../lib/merge"), i = e("../lib/extend"), o = e("../lib/isEqual"), a = e("../WBMixin"), s = a.extend({
attributes: {},
options: {},
initialize: function(e, t) {
var n = this;
n.attributes = i({}, n.defaults, e), n.options = t || {}, n.changed = {};
},
get: function(e) {
return console.warn("getters are deprecated"), this.attributes[e];
},
set: function(e, t, n) {
var i = this;
if (null === e) return i;
var o, a;
if ("object" == typeof e ? (o = e, n = t) : (o = {}, o[e] = t), n || (n = {}), n.silent) r(i.attributes, a); else {
var s = i.changes(o, n);
i._trigger(o, s, n);
}
return i;
},
unset: function(e, t) {
return this.set(e, void 0, i({}, t, {
unset: !0
}));
},
clear: function(e) {
var t = this;
return t.set(t.defaults, e);
},
changes: function(e, t) {
var r, i, a = this, s = [], u = n(a.attributes, !0), c = a.attributes;
a.changed = {};
for (r in e) i = e[r], o(c[r], i) || s.push(r), o(u[r], i) ? delete a.changed[r] : a.changed[r] = i, 
c[r] = t.unset ? void 0 : i;
return s;
},
_trigger: function(e, t, n) {
for (var r, i = this, o = i.attributes; t && t.length && i.trigger; ) r = t.shift(), 
i.trigger("change:" + r, i, o[r], n);
}
});
t.exports = s;
}, {
"../WBMixin": 6,
"../lib/clone": 12,
"../lib/extend": 18,
"../lib/isEqual": 24,
"../lib/merge": 25
} ],
36: [ function(e, t) {

var n = e("../WBMixin"), r = e("../WBDeferred"), i = e("../lib/when"), o = e("../lib/toArray"), a = e("../lib/forEach"), s = e("../lib/delay"), u = e("../lib/defer"), c = e("../lib/functions"), f = n.extend({
deferred: function() {
var e = this;
return new r(e);
},
when: function() {
var e = this;
return i.apply(e, arguments);
},
defer: function(e) {
var t = this, n = o(arguments);
return n[1] = n[1] || this, "string" == typeof e && (n[0] = t[e]), u.apply(null, n);
},
delay: function(e) {
var t = this, n = o(arguments);
return n[2] = n[2] || t, "string" == typeof e && (n[0] = t[e]), s.apply(null, n);
},
forEach: function(e, t, n) {
var r = this;
n = n || r, "string" == typeof t && (t = r[t]), a(e, t, n);
},
functions: function(e) {
return c(e || this);
}
});
t.exports = f;
}, {
"../WBDeferred": 4,
"../WBMixin": 6,
"../lib/defer": 15,
"../lib/delay": 16,
"../lib/forEach": 19,
"../lib/functions": 21,
"../lib/toArray": 27,
"../lib/when": 28
} ],
37: [ function(e, t) {

t.exports = {
ControllableMixin: e("./ControllableMixin"),
ObservableHashMixin: e("./ObservableHashMixin"),
WBBindableMixin: e("./WBBindableMixin"),
WBDestroyableMixin: e("./WBDestroyableMixin"),
WBEventsMixin: e("./WBEventsMixin"),
WBStateMixin: e("./WBStateMixin"),
WBUtilsMixin: e("./WBUtilsMixin")
};
}, {
"./ControllableMixin": 30,
"./ObservableHashMixin": 31,
"./WBBindableMixin": 32,
"./WBDestroyableMixin": 33,
"./WBEventsMixin": 34,
"./WBStateMixin": 35,
"./WBUtilsMixin": 36
} ],
38: [ function(e, t) {

var n = e("wunderbits.core"), r = n.WBEventEmitter, i = n.lib.clone, o = n.lib.assert, a = e("./lib/generateId"), s = "id", u = function() {}, c = r.extend({
initialize: function(e) {
var t = this;
o.object(e), o(e.database), t.database = e.database;
},
generateId: function(e, t, n) {
if (!t) {
if (t = a(), n.collection) for (;n.collection.get(t); ) t = a();
n.set(e, t);
}
return t;
},
queryCollection: function(e) {
var t = this, n = t.database.crud, r = e.storeName || e.model.prototype.storeName;
return n.query(r);
},
operateOnModel: function(e, t) {
var n, r = this, o = r.database.crud;
return n = "function" == typeof e.toJSON ? e.toJSON() : i(e.attributes), n.id || (n.id = e.id), 
o[t](e.storeName, n);
},
sync: function(e, t, n) {
var r = this;
n = n || {};
var i = r.database.stores, o = t.collection, a = t.storeName || o && o.storeName, u = i[a], c = u && u.keyPath || s, f = t.attributes, l = f.id || f[c], d = r.isCreateUpdate(e);
if (d && (l = r.generateId(c, l, t)), !a || "none" === a) return void ("function" == typeof n.success && n.success());
if (a in i) {
n.success = r.successFactory(n.success, e, a, u, l, t);
var h;
h = "read" === e && !t.id && t.model ? r.queryCollection(t) : r.operateOnModel(t, e), 
h.done(n.success), n.error && h.fail(n.error);
}
},
successFactory: function(e, t, n, r, i, o) {
var a = this, s = "function" == typeof e ? e : u, c = a.isCreateUpdateDelete(t) ? function() {
a.database.trigger(t, n, i);
} : u, f = "fullTextIndexFields" in r ? function() {
a.trigger("index", t, n, o);
} : u, l = a.isCreateUpdate(t) ? function() {
a.trigger("write", n, i);
} : a.isDelete(t) ? function() {
a.trigger("destroy", n, i);
} : u;
return function() {
s.apply(this, arguments), c(), f(), l();
};
},
isCreateUpdateDelete: function(e) {
return "create" === e || "update" === e || "delete" === e;
},
isCreateUpdate: function(e) {
return "create" === e || "update" === e;
},
isDelete: function(e) {
return "delete" === e;
}
});
t.exports = c;
}, {
"./lib/generateId": 49,
"wunderbits.core": 10
} ],
39: [ function(e, t) {

var n = e("wunderbits.core"), r = n.WBEventEmitter, i = n.WBDeferred, o = n.lib.when, a = n.lib.assert, s = {
init: "ERR_ABSTRACT_BACKEND_INITIALIZED"
}, u = r.extend({
defaultKeyPath: "id",
initialize: function() {
var e = this;
a(e.constructor !== u, s.init), e.ready = new i();
},
connect: function(e) {
var t = this;
return t.options = t.options || {}, t.options.db = e, t.stores = e.stores, t.openDB(e.name, e.version, e), 
t.ready.promise();
},
openSuccess: function() {
var e = this;
e.trigger("connected"), e.ready.resolve();
},
openFailure: function(e, t) {
var n = this;
n.trigger("error", e, t), n.ready.reject(e, t);
},
mapStores: function(e) {
for (var t, n, r, i = this, o = [], a = i.stores, s = Object.keys(a); s.length; ) n = s.shift(), 
r = a[n], t = e.call(i, n, r), o.push(t);
return o;
},
truncate: function(e) {
var t = this, n = new i();
t.ready = new i();
var r = t.mapStores(t.clearStore);
return o(r).then(function() {
t.ready.reject(), n.resolve(), "function" == typeof e && e(), t.trigger("truncated");
}), n.promise();
}
});
t.exports = u;
}, {
"wunderbits.core": 10
} ],
40: [ function(e, t) {
(function(n) {

var r = e("wunderbits.core"), i = r.WBDeferred, o = r.lib.toArray, a = r.lib.when, s = e("./AbstractBackend"), u = n.DOMError || n.DOMException, c = n.indexedDB || n.webkitIndexedDB || n.mozIndexedDB || n.msIndexedDB, f = {
READ: "readonly",
WRITE: "readwrite"
}, l = {
privateMode: "ERR_IDB_FIREFOX_PRIVATE_MODE",
downgrade: "ERR_IDB_CANT_DOWNGRADE_VERSION",
unknown: "ERR_IDB_UNKNOWN",
upgradeBrowser: "ERR_IDB_UPGRADE_BROWSER",
storeCreationFailed: "ERR_IDB_STORE_CREATION_FAILED",
storeClearFailed: "ERR_IDB_STORE_CLEAR_FAILED",
notFound: "ERR_IDB_OBJECT_NOT_FOUND",
getFailed: "ERR_IDB_STORE_GET_FAILED",
cursorFailed: "ERR_IDB_CANT_OPEN_CURSOR",
queryFailed: "ERR_IDB_QUERY_FAILED",
updateFailed: "ERR_IDB_STORE_UPDATE_FAILED",
destroyFailed: "ERR_IDB_STORE_DESTROY_FAILED"
}, d = s.prototype, h = s.extend({
initialize: function() {
var e = this;
d.initialize.apply(e, arguments), e.transactionQueue = {}, e.isFlushingTransactionQueue = {};
},
flushNextTransactions: function(e, t) {
var n = this, r = n.transactionQueue[e], i = [], s = 100;
if (r.length) {
n.isFlushingTransactionQueue[e] = !0;
var u = r.splice(0, s);
u.forEach(function(e) {
var n = e(t);
i.push(n);
}), a(i).always(function(t) {
var i = o(arguments), a = i[i.length - 1];
t = a && a[1], r.length ? n.flushNextTransactions(e, t) : n.isFlushingTransactionQueue[e] = !1;
});
}
},
flushTransactionQueue: function(e) {
var t = this, n = t.transactionQueue[e], r = n.length, i = t.isFlushingTransactionQueue[e];
r && !i ? t.flushNextTransactions(e) : r || (t.isFlushingTransactionQueue[e] = !1);
},
queueTransactionOperation: function(e, t) {
var n = this, r = n.transactionQueue[e];
r || (r = n.transactionQueue[e] = []), r.push(t), !n.isFlushingTransactionQueue[e] && n.flushTransactionQueue(e);
},
openDB: function(e, t) {
var n = this;
if (c) {
var r = c.open(e, t);
r.onerror = n.onRequestError.bind(n), r.onsuccess = n.onRequestSuccess.bind(n), 
r.onupgradeneeded = n.onUpgradeNeeded.bind(n);
} else n.openFailure("ERR_IDB_CONNECT_FAILED");
},
onRequestError: function(e) {
var t = this, n = e.target.error, r = n.name, i = n instanceof u;
"InvalidStateError" === r && i ? t.openFailure(l.privateMode) : "VersionError" === r && i ? t.openFailure(l.downgrade) : t.openFailure(l.unknown, n);
},
onRequestSuccess: function(e) {
var t = this;
if (t.db) return void t.openSuccess();
var n = e.target.result;
return "string" == typeof n.version ? void t.openFailure(l.upgradeBrowser) : (t.db = n, 
t.storeNames = n.objectStoreNames, void t.openSuccess());
},
onUpgradeNeeded: function(e) {
var t = this, n = e.target.result;
t.db = n, t.storeNames = n.objectStoreNames, t.options.versionless || (t.trigger("upgrading"), 
t.mapStores(t.createStore));
},
createStore: function(e, t) {
var n = this, r = n.db;
if (!n.storeNames.contains(e)) {
var i = r.createObjectStore(e, {
keyPath: t.keyPath || n.defaultKeyPath
});
i.onerror = function(t) {
n.trigger("error", l.storeCreationFailed, t, e);
};
}
},
clearStore: function(e) {
var t = this, n = new i(), r = t.db.transaction([ e ], f.WRITE), o = r.objectStore(e), a = o.clear();
return a.onsuccess = function() {
n.resolve();
}, a.onerror = function(r) {
t.trigger("error", l.storeClearFailed, r, e), n.reject();
}, n.promise();
},
read: function(e, t) {
var n = this, r = new i(), o = n.db.transaction([ e ], f.READ), a = o.objectStore(e), s = t[a.keyPath || n.defaultKeyPath] || t.id, u = a.get(s);
return u.onsuccess = function(t) {
var i = t.target.result;
i ? r.resolve(i) : (n.trigger("error", l.notFound, null, e, i), r.reject());
}, u.onerror = function(i) {
n.trigger("error", l.getFailed, i, e, t), r.reject();
}, r.promise();
},
query: function(e) {
var t = this, n = new i(), r = t.db.transaction([ e ], f.READ), o = r.objectStore(e), a = [], s = o.openCursor();
return s ? (s.onerror = function(r) {
t.trigger("error", l.queryFailed, r, e), n.reject();
}, s.onsuccess = function(e) {
var t = e.target.result;
t ? (a.push(t.value), t["continue"]()) : n.resolve(a);
}) : (t.trigger("error", l.cursorFailed, null, e), n.reject()), n.promise();
},
getWriteTransaction: function(e) {
var t = this;
return t.db.transaction([ e ], f.WRITE);
},
update: function(e, t) {
var n = this, r = new i(), o = r.promise();
return n.queueTransactionOperation(e, function(i) {
var a = i ? i : n.getWriteTransaction(e), s = a.objectStore(e), u = s.put(t);
return u.onsuccess = function() {
r.resolve(void 0, a);
}, u.onerror = function(i) {
n.trigger("error", l.updateFailed, i, e, t), r.reject();
}, o;
}), o;
},
destroy: function(e, t) {
var n = this, r = new i(), o = r.promise();
return n.queueTransactionOperation(e, function(i) {
var a = i ? i : n.getWriteTransaction(e), s = a.objectStore(e), u = t[s.keyPath || n.defaultKeyPath] || t.id, c = s["delete"](u);
return c.onsuccess = function() {
r.resolve(void 0, a);
}, c.onerror = function(i) {
n.trigger("error", l.destroyFailed, i, e, t), r.reject();
}, o;
}), o;
},
nuke: function() {
var e = this, t = e.options.db.name, n = new i(), r = c.deleteDatabase(t);
return r.onsuccess = function() {
n.resolve();
}, r.onerror = function() {
n.reject();
}, n.promise();
}
});
t.exports = h;
}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"./AbstractBackend": 39,
"wunderbits.core": 10
} ],
41: [ function(e, t) {
(function(n) {

var r = e("wunderbits.core"), i = r.WBDeferred, o = r.lib.forEach, a = r.lib.toArray, s = e("./AbstractBackend"), u = e("../lib/SafeParse"), c = n.indexedDB || n.webkitIndexedDB || n.mozIndexedDB || n.msIndexedDB, f = s.extend({
cache: {},
localStorageAvailable: !0,
initialize: function() {
var e = this;
e.ready = new i();
},
connect: function(e) {
var t = this;
if (t.stores = e.stores, t.localStorageAvailable = e.localStorageAvailable, t.localStorageAvailable) {
var r = n.localStorage;
if ("memory" === r.getItem("availableBackend") && r.getItem("dbVersion") !== "" + e.version) if (r.clear(), 
c) {
var i = c.deleteDatabase(e.name);
i.onsuccess = i.onerror = function() {
n.location.reload();
};
} else n.location.reload();
}
return !t.cache && t.reset(), t.ready.resolve(), t.ready.promise();
},
reset: function() {
var e = this;
e.cache = {}, o(e.stores, function(t, n) {
e.cache[n] = {};
});
},
truncate: function(e) {
var t = this, r = new i();
return t.ready = new i(), t.reset(), t.localStorageAvailable && n.localStorage.clear(), 
setTimeout(function() {
t.ready.reject(), r.resolve(), "function" == typeof e && e(), t.trigger("truncated");
}, 50), r.promise();
},
read: function(e, t) {
var r, o = this, a = new i(), s = o.stores[e];
if (o.localStorageAvailable && s.critical) {
var c = t[s.keyPath] || t.id;
r = n.localStorage[e + "_" + c], r && (r = u.json(r));
} else r = o.cache[e][t.id];
return setTimeout(function() {
void 0 !== r ? a.resolve(r) : a.reject();
}, 50), a.promise();
},
query: function(e) {
var t = this, n = new i(), r = a(t.cache[e]);
return n.resolve(r).promise();
},
update: function(e, t) {
var r = this, o = new i(), a = r.stores[e];
if (r.localStorageAvailable && a.critical) {
var s = t[a.keyPath] || t.id;
n.localStorage[e + "_" + s] = JSON.stringify(t);
} else r.cache[e][t.id] = t;
return o.resolve().promise();
},
destroy: function(e, t) {
var n = this, r = new i();
return delete n.cache[e][t.id], r.resolve().promise();
}
});
t.exports = f;
}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"../lib/SafeParse": 48,
"./AbstractBackend": 39,
"wunderbits.core": 10
} ],
42: [ function(e, t) {
(function(n) {

var r = e("wunderbits.core"), i = r.WBDeferred, o = r.lib.when, a = e("./AbstractBackend"), s = e("../lib/printf"), u = e("../lib/FieldTypes"), c = e("../lib/SafeParse"), f = n.openDatabase, l = n.escape, d = n.unescape, h = {
createTable: "CREATE TABLE IF NOT EXISTS ? (? TEXT PRIMARY KEY, ?)",
truncateTable: "DELETE FROM ?",
dropTable: "DROP TABLE IF EXISTS ?",
getAllTables: "SELECT * FROM sqlite_master WHERE type='table'",
read: "SELECT * from ? WHERE ?='?' LIMIT 1",
query: "SELECT * from ?",
upsert: "INSERT OR REPLACE INTO ? (?) VALUES (?)",
destroy: "DELETE FROM ? WHERE ?='?'"
}, p = {
"default": "TEXT"
};
p[u.Float] = "REAL", p[u.Integer] = "INTEGER";
var g = a.extend({
properties: {
dbSize: 5242880
},
openDB: function(e, t, n) {
var r = this, i = r.ready, o = setTimeout(function() {
r.openFailure("ERR_WS_CONNECT_TIMEOUT");
}, 2e3);
i.done(function() {
clearTimeout(o);
});
try {
var a = n.dbSize || r.dbSize, s = f(e, "", e, a);
r.db = s, t = "" + t, s.version === t || n.versionless ? r.openSuccess() : s.changeVersion(s.version || "", t, function() {
r.onUpgradeNeeded().done(r.openSuccess, r).fail(r.openFailure, r);
});
} catch (u) {
r.openFailure("ERR_WS_CONNECT_FAILED", u);
}
},
execute: function(e) {
var t = this, n = new i();
return t.db.transaction(function(t) {
t.executeSql(e, [], function(e, t) {
n.resolve(t);
}, function(e, t) {
n.reject(t);
});
}), n.promise();
},
parseGeneric: function(e) {
return c.json(d(e.json));
},
populateGeneric: function(e, t, n) {
e.push("json"), t.push("'" + l(JSON.stringify(n)) + "'");
},
parseFields: function(e, t) {
var n, r, i, o, a = {
id: e.id
};
for (n in t) r = t[n], i = e[n], void 0 !== e[n] && (r === u.Integer ? (o = parseInt(i, 10), 
isNaN(i) && console.warn("failed to parse %s as Integer", i), i = o || 0) : r === u.Float ? (o = parseFloat(i, 10), 
isNaN(i) && console.warn("failed to parse %s as Float", i), i = o || 0) : (i = i && d(i), 
r === u.Boolean ? i = "true" === i : r === u.Array ? i = c.json(i) || [] : r === u.Object ? i = c.json(i) || {} : "" === i && (i = null)), 
a[n] = i);
return a;
},
populateFields: function(e, t, n, r, i) {
var o, a, s;
for (o in r) a = r[o], s = n[o], void 0 !== s && o !== i && (s = a === u.Float || a === u.Integer ? s && !isNaN(s) ? s : 0 : a === u.Array && Array.isArray(s) ? "'" + l(JSON.stringify(s)) + "'" : a === u.Object ? "'" + l(JSON.stringify(s)) + "'" : null !== s ? "'" + l(s) + "'" : "NULL", 
e.push('"' + o + '"'), t.push(s));
},
toArray: function(e, t) {
for (var n, r = this, i = e.length, o = new Array(i), a = r[t ? "parseFields" : "parseGeneric"], s = 0; i > s; s++) n = e.item(s), 
o[s] = a.call(r, n, t);
return o;
},
onUpgradeNeeded: function() {
var e = this, t = new i();
e.trigger("upgrading");
var n = e.mapStores(e.clearStore);
return o(n).always(function() {
e.listTables().done(function(n) {
n = n || [];
var r = n.length ? n.map(function(t) {
return e.dropStore(t);
}) : [];
o(r).always(function() {
var n = e.mapStores(e.createStore);
o(n).done(function() {
t.resolve();
}).fail(function() {
t.reject();
});
}).fail(function() {
console.warn("table drop failed");
});
}).fail(function() {
console.warn("get tables failed");
});
}).fail(function() {
console.warn("clear failed");
}), t.promise();
},
createStore: function(e, t) {
var n = this, r = new i(), o = t.keyPath || n.defaultKeyPath, a = t.fields, u = h.createTable;
if (a) {
"id" === o && delete a.id;
var c = Object.keys(a).map(function(e) {
return '"' + e + '" ' + (p[a[e]] || p.default);
});
u = s(u, e, o, c.join(", "));
} else u = s(u, e, o, "json TEXT");
return n.execute(u).done(r.resolve, r).fail(function(t) {
n.trigger("error", "ERR_WS_STORE_CREATION_FAILED", t, e), r.reject();
}), r.promise();
},
dropStore: function(e) {
var t = this, n = new i(), r = s(h.dropTable, e);
return t.execute(r).done(n.resolve, n).fail(function() {
n.reject();
}), n.promise();
},
clearStore: function(e) {
var t = this, n = new i(), r = s(h.truncateTable, e);
return t.execute(r).done(n.resolve, n).fail(function(r) {
t.trigger("error", "ERR_WS_CLEAR_FAILED", r, e), n.reject();
}), n.promise();
},
listTables: function() {
var e = this, t = new i();
return e.execute(h.getAllTables).done(function(e) {
for (var n, r = e.rows, i = r.length, o = [], a = 1; i > a; a++) n = r.item(a), 
o.push(n.name);
t.resolve(o);
}), t.promise();
},
read: function(e, t) {
var n = this, r = new i(), o = n.stores[e], a = o.fields, u = o.keyPath || n.defaultKeyPath, c = t[u] || t.id, f = s(h.read, e, u, c);
return n.execute(f).done(function(i) {
if (0 === i.rows.length) n.trigger("error", "ERR_WS_OBJECT_NOT_FOUND", null, e, t), 
r.reject(); else {
var o = n.toArray(i.rows, a);
r.resolve(o[0]);
}
}).fail(function(i) {
n.trigger("error", "ERR_WS_READ_FAILED", i, e, t), r.reject();
}), r.promise();
},
query: function(e) {
var t = this, n = new i(), r = t.stores[e], o = r && r.fields, a = s(h.query, e);
return t.execute(a).done(function(e) {
var r = t.toArray(e.rows, o);
n.resolve(r);
}).fail(function(r) {
t.trigger("error", "ERR_WS_QUERY_FAILED", r, e), n.reject();
}), n.promise();
},
update: function(e, t) {
var n = this, r = new i(), o = n.stores[e], a = o.fields, u = o.keyPath || n.defaultKeyPath, c = t[u] || t.id, f = [ '"' + u + '"' ], l = [ "'" + c + "'" ], d = n[a ? "populateFields" : "populateGeneric"];
d.call(n, f, l, t, a, u);
var p = s(h.upsert, e, f, l);
try {
n.execute(p).done(function() {
r.resolve();
}).fail(function(i) {
n.trigger("error", "ERR_WS_UPDATE_FAILED", i, e, t), r.reject();
});
} catch (g) {
n.trigger("error", "ERR_WS_UPDATE_FAILED", g, e, t), r.reject();
}
return r.promise();
},
destroy: function(e, t) {
var n = this, r = new i(), o = n.stores[e], a = o.keyPath || n.defaultKeyPath, u = t[a] || t.id, c = s(h.destroy, e, a, u);
return n.execute(c).done(function() {
r.resolve();
}).fail(function(i) {
n.trigger("error", "ERR_WS_DESTROY_FAILED", i, e, t), r.reject();
}), r.promise();
},
nuke: function() {
var e = this;
return console.warn("cant delete websql database"), e.truncate();
}
});
t.exports = g;
}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"../lib/FieldTypes": 47,
"../lib/SafeParse": 48,
"../lib/printf": 50,
"./AbstractBackend": 39,
"wunderbits.core": 10
} ],
43: [ function(e, t) {
(function(n) {

var r = e("wunderbits.core"), i = r.WBEventEmitter, o = r.WBDeferred, a = r.lib.assert, s = r.lib.extend, u = r.lib.clone, c = r.lib.merge, f = r.lib.toArray, l = e("./Backends/MemoryBackend"), d = e("./Backends/WebSQLBackend"), h = e("./Backends/IndexedDBBackend"), p = n.chrome, g = !!(p && p.app && p.app.runtime), v = !0, m = {
indexeddb: [ "indexedDB", "webkitIndexedDB", "mozIndexedDB", "msIndexedDB" ],
websql: [ "openDatabase" ]
}, y = {
memory: l,
websql: d,
indexeddb: h
}, b = i.extend({
initialize: function(e) {
var t = this;
e = e || {}, t.crud = {}, t.ready = new o(), a.object(e.schema);
var n = e.schema;
t.stores = n.stores;
var r = n.database;
t.name = r.name, t.versionless = !!e.versionless;
var i = 1e7 * Object.keys(t.stores).length;
i += parseInt(r.version, 10) || 1, t.version = i;
},
init: function(e, t) {
var n = this, r = n.ready;
if ("resolved" === r.state()) return r.promise();
e = n.findAvailableBackend(e), n.backendName = e;
var i = n.initLogger(e.toUpperCase()), o = n.stores;
return t = c(t || {}, {
name: n.name,
version: n.version,
versionless: n.versionless,
stores: o,
infoLog: i.info,
errorLog: i.error,
localStorageAvailable: v
}), n.initBackend(e, t), r.promise();
},
currentBackend: function() {
var e = this;
return e.backendName;
},
initLogger: function(e) {
return {
info: console.info.bind(console, "[" + e + "]"),
error: console.error.bind(console, "[" + e + "]")
};
},
initBackend: function(e, t) {
var n = this, r = y[e], i = n.backend = new r();
n.options = t, i.on("error", function() {
var e = f(arguments);
e.unshift("error"), n.trigger.apply(n, e);
}), i.connect(t).done(n.initSuccess, n).fail(n.initFailure, n);
},
initSuccess: function() {
var e = this, t = e.backend, n = {
create: t.update,
read: t.read,
update: t.update,
"delete": t.destroy,
query: t.query
};
Object.keys(n).forEach(function(e) {
var r = n[e];
n[e] = function() {
var e = arguments, n = new o(), i = t.ready;
return i.done(function() {
r.apply(t, e).done(n.resolve, n).fail(n.reject, n);
}), i.fail(n.reject, n), n.promise();
};
}), s(e.crud, n), e.ready.resolve(), e.publish("ready", {
stores: e.stores
});
},
initFailure: function() {
var e = this;
e.ready.reject();
},
findAvailableBackend: function(e) {
if (e in m) return e;
if (p && p.storage) return "indexeddb";
try {
var t = n.localStorage.getItem("availableBackend");
if (t in m) return t;
} catch (r) {
return v = !1, "memory";
}
var i;
for (var o in m) for (var a = u(m[o]); a.length && !i; ) if (n[a.shift()]) {
i = o;
break;
}
return i || "memory";
},
getAll: function(e, t, n) {
var r = this;
r.ready.done(function() {
var i = r.backend.query(e);
t && i.done(t), n && i.fail(n);
});
},
truncate: function(e) {
var t = this;
t.ready.done(function() {
"memory" === t.backendName || g || v && n.localStorage.clear(), t.backend.truncate().then(e);
});
}
});
t.exports = b;
}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"./Backends/IndexedDBBackend": 40,
"./Backends/MemoryBackend": 41,
"./Backends/WebSQLBackend": 42,
"wunderbits.core": 10
} ],
44: [ function(e, t) {
(function(n) {

var r, i = n.chrome, o = i && i.storage;
r = e(o ? "./localStorage/WBChromeLocalStorage" : "./localStorage/WBBrowserLocalStorage"), 
t.exports = r;
}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"./localStorage/WBBrowserLocalStorage": 51,
"./localStorage/WBChromeLocalStorage": 52
} ],
45: [ function(e, t) {

function n(e) {
var t = e.fields;
delete e.fields;
var r = i.extend.call(this, e);
r.extend = n;
var a, s, c;
for (a in t) if (s = t[a], c = u[a], c && Array.isArray(s)) {
for (;s.length; ) t[s.shift()] = c;
delete t[a];
}
return r.fields = o({}, r.fields, t), r;
}
var r = e("wunderbits.core"), i = r.WBSingleton, o = r.lib.extend, a = e("./lib/FieldTypes"), s = i.extend({
FieldTypes: a,
fields: {}
}), u = {};
Object.keys(a).forEach(function(e) {
u[e.toLowerCase() + "s"] = a[e];
}), s.extend = n, t.exports = s;
}, {
"./lib/FieldTypes": 47,
"wunderbits.core": 10
} ],
46: [ function(e, t) {

t.exports = {
BackboneDBSync: e("./BackboneDBSync"),
WBDatabase: e("./WBDatabase"),
WBLocalStorage: e("./WBLocalStorage"),
WBSchema: e("./WBSchema")
};
}, {
"./BackboneDBSync": 38,
"./WBDatabase": 43,
"./WBLocalStorage": 44,
"./WBSchema": 45
} ],
47: [ function(e, t) {
t.exports = {
Array: "ARRAY",
Boolean: "BOOLEAN",
DateTime: "DATETIME",
Float: "FLOAT",
Integer: "INTEGER",
Object: "OBJECT",
Text: "TEXT"
};
}, {} ],
48: [ function(e, t) {

function n(e) {
try {
return JSON.parse(e);
} catch (t) {
console.warn('Unable to parse "' + e + '"');
}
}
var r = e("wunderbits.core"), i = r.WBSingleton, o = i.extend({
json: n
});
t.exports = o;
}, {
"wunderbits.core": 10
} ],
49: [ function(e, t) {

function n() {
return (16 * Math.random() | 0).toString(16);
}
function r() {
return "lw" + new Array(31).join("x").replace(/x/g, n);
}
t.exports = r;
}, {} ],
50: [ function(e, t) {

function n(e) {
var t = 1, n = arguments;
return e.replace(/\?/g, function() {
var e = n[t++];
return void 0 === e ? "" : Array.isArray(e) ? e.join(", ") : e;
});
}
t.exports = n;
}, {} ],
51: [ function(e, t) {
(function(n) {

var r, i = e("wunderbits.core"), o = i.WBClass, a = i.WBDeferred;
try {
r = n.localStorage;
} catch (s) {
console.warn(s);
}
var u = o.extend({
getItem: function(e) {
var t, n = new a();
try {
t = r.getItem(e), n.resolve(t);
} catch (i) {
n.reject(i);
}
return n.promise();
},
setItem: function(e, t) {
var n = new a();
try {
r.setItem(e, t), n.resolve();
} catch (i) {
n.reject(i);
}
return n.promise();
},
removeItem: function(e) {
var t = new a();
try {
r.removeItem(e), t.resolve();
} catch (n) {
t.reject(n);
}
return t.promise();
},
clear: function() {
var e = new a();
try {
r.clear(), e.resolve();
} catch (t) {
e.reject(t);
}
return e.promise();
}
});
t.exports = u;
}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"wunderbits.core": 10
} ],
52: [ function(e, t) {
(function(n) {

var r = e("wunderbits.core"), i = r.WBClass, o = r.WBDeferred, a = n.chrome, s = a && a.storage && a.storage.local, u = i.extend({
getItem: function(e) {
var t = new o();
return s.get(e, function(n) {
if (a.runtime.lastError) t.reject(a.runtime.lastError); else {
var r = n[e];
t.resolve(r);
}
}), t.promise();
},
setItem: function(e, t) {
var n = new o(), r = {};
return r[e] = t, s.set(r, function() {
a.runtime.lastError ? n.reject(a.runtime.lastError) : n.resolve();
}), n.promise();
},
removeItem: function(e) {
var t = new o();
return s.remove(e, function() {
a.runtime.lastError ? t.reject(a.runtime.lastError) : t.resolve();
}), t.promise();
},
clear: function() {
var e = new o();
return s.clear(function() {
a.runtime.lastError ? e.reject(a.runtime.lastError) : e.resolve();
}), e.promise();
}
});
t.exports = u;
}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"wunderbits.core": 10
} ]
}, {}, [ 46 ])(46);
});
define('wunderbits/global',[],function() {

return window;
});
(function(e) {

"function" == typeof define && define.amd ? define('vendor/lodash',[ "wunderbits/global" ], e) : e(window);
}).call(this, function(e) {
function t(e, t, n) {
for (var r = (n || 0) - 1, i = e ? e.length : 0; ++r < i; ) if (e[r] === t) return r;
return -1;
}
function n(e, n) {
var r = typeof n;
if (e = e.cache, "boolean" == r || null == n) return e[n] ? 0 : -1;
"number" != r && "string" != r && (r = "object");
var i = "number" == r ? n : y + n;
return e = (e = e[r]) && e[i], "object" == r ? e && t(e, n) > -1 ? 0 : -1 : e ? 0 : -1;
}
function r(e) {
var t = this.cache, n = typeof e;
if ("boolean" == n || null == e) t[e] = !0; else {
"number" != n && "string" != n && (n = "object");
var r = "number" == n ? e : y + e, i = t[n] || (t[n] = {});
"object" == n ? (i[r] || (i[r] = [])).push(e) : i[r] = !0;
}
}
function i(e) {
return e.charCodeAt(0);
}
function o(e, t) {
for (var n = e.criteria, r = t.criteria, i = -1, o = n.length; ++i < o; ) {
var a = n[i], s = r[i];
if (a !== s) {
if (a > s || "undefined" == typeof a) return 1;
if (s > a || "undefined" == typeof s) return -1;
}
}
return e.index - t.index;
}
function a(e) {
var t = -1, n = e.length, i = e[0], o = e[n / 2 | 0], a = e[n - 1];
if (i && "object" == typeof i && o && "object" == typeof o && a && "object" == typeof a) return !1;
var s = c();
s["false"] = s["null"] = s["true"] = s.undefined = !1;
var u = c();
for (u.array = e, u.cache = s, u.push = r; ++t < n; ) u.push(e[t]);
return u;
}
function s(e) {
return "\\" + K[e];
}
function u() {
return g.pop() || [];
}
function c() {
return v.pop() || {
array: null,
cache: null,
criteria: null,
"false": !1,
index: 0,
"null": !1,
number: null,
object: null,
push: null,
string: null,
"true": !1,
undefined: !1,
value: null
};
}
function f(e) {
e.length = 0, g.length < x && g.push(e);
}
function l(e) {
var t = e.cache;
t && l(t), e.array = e.cache = e.criteria = e.object = e.number = e.string = e.value = null, 
v.length < x && v.push(e);
}
function d(e, t, n) {
t || (t = 0), "undefined" == typeof n && (n = e ? e.length : 0);
for (var r = -1, i = n - t || 0, o = Array(0 > i ? 0 : i); ++r < i; ) o[r] = e[t + r];
return o;
}
function p(e) {
function r(e) {
return e && "object" == typeof e && !Jr(e) && Or.call(e, "__wrapped__") ? e : new g(e);
}
function g(e, t) {
this.__chain__ = !!t, this.__wrapped__ = e;
}
function v(e) {
function t() {
if (r) {
var e = d(r);
Nr.apply(e, arguments);
}
if (this instanceof t) {
var o = K(n.prototype), a = n.apply(o, e || arguments);
return Mt(a) ? a : o;
}
return n.apply(i, e || arguments);
}
var n = e[0], r = e[2], i = e[4];
return Gr(t, e), t;
}
function x(e, t, n, r, i) {
if (n) {
var o = n(e);
if ("undefined" != typeof o) return o;
}
var a = Mt(e);
if (!a) return e;
var s = Tr.call(e);
if (!U[s]) return e;
var c = Vr[s];
switch (s) {
case R:
case I:
return new c(+e);

case P:
case H:
return new c(e);

case z:
return o = c(e.source, S.exec(e)), o.lastIndex = e.lastIndex, o;
}
var l = Jr(e);
if (t) {
var p = !r;
r || (r = u()), i || (i = u());
for (var h = r.length; h--; ) if (r[h] == e) return i[h];
o = l ? c(e.length) : {};
} else o = l ? d(e) : oi({}, e);
return l && (Or.call(e, "index") && (o.index = e.index), Or.call(e, "input") && (o.input = e.input)), 
t ? (r.push(e), i.push(o), (l ? Qt : ui)(e, function(e, a) {
o[a] = x(e, t, n, r, i);
}), p && (f(r), f(i)), o) : o;
}
function K(e) {
return Mt(e) ? Pr(e) : {};
}
function Q(e, t, n) {
if ("function" != typeof e) return Jn;
if ("undefined" == typeof t || !("prototype" in e)) return e;
var r = e.__bindData__;
if ("undefined" == typeof r && (Qr.funcNames && (r = !e.name), r = r || !Qr.funcDecomp, 
!r)) {
var i = Wr.call(e);
Qr.funcNames || (r = !T.test(i)), r || (r = D.test(i), Gr(e, r));
}
if (r === !1 || r !== !0 && 1 & r[1]) return e;
switch (n) {
case 1:
return function(n) {
return e.call(t, n);
};

case 2:
return function(n, r) {
return e.call(t, n, r);
};

case 3:
return function(n, r, i) {
return e.call(t, n, r, i);
};

case 4:
return function(n, r, i, o) {
return e.call(t, n, r, i, o);
};
}
return Nn(e, t);
}
function G(e) {
function t() {
var e = u ? a : this;
if (i) {
var h = d(i);
Nr.apply(h, arguments);
}
if ((o || f) && (h || (h = d(arguments)), o && Nr.apply(h, o), f && h.length < s)) return r |= 16, 
G([ n, l ? r : -4 & r, h, null, a, s ]);
if (h || (h = arguments), c && (n = e[p]), this instanceof t) {
e = K(n.prototype);
var g = n.apply(e, h);
return Mt(g) ? g : e;
}
return n.apply(e, h);
}
var n = e[0], r = e[1], i = e[2], o = e[3], a = e[4], s = e[5], u = 1 & r, c = 2 & r, f = 4 & r, l = 8 & r, p = n;
return Gr(t, e), t;
}
function J(e, r) {
var i = -1, o = ut(), s = e ? e.length : 0, u = s >= b && o === t, c = [];
if (u) {
var f = a(r);
f ? (o = n, r = f) : u = !1;
}
for (;++i < s; ) {
var d = e[i];
o(r, d) < 0 && c.push(d);
}
return u && l(r), c;
}
function et(e, t, n, r) {
for (var i = (r || 0) - 1, o = e ? e.length : 0, a = []; ++i < o; ) {
var s = e[i];
if (s && "object" == typeof s && "number" == typeof s.length && (Jr(s) || dt(s))) {
t || (s = et(s, t, n));
var u = -1, c = s.length, f = a.length;
for (a.length += c; ++u < c; ) a[f++] = s[u];
} else n || a.push(s);
}
return a;
}
function tt(e, t, n, r, i, o) {
if (n) {
var a = n(e, t);
if ("undefined" != typeof a) return !!a;
}
if (e === t) return 0 !== e || 1 / e == 1 / t;
var s = typeof e, c = typeof t;
if (!(e !== e || e && X[s] || t && X[c])) return !1;
if (null == e || null == t) return e === t;
var l = Tr.call(e), d = Tr.call(t);
if (l == N && (l = L), d == N && (d = L), l != d) return !1;
switch (l) {
case R:
case I:
return +e == +t;

case P:
return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;

case z:
case H:
return e == _r(t);
}
var p = l == q;
if (!p) {
var h = Or.call(e, "__wrapped__"), g = Or.call(t, "__wrapped__");
if (h || g) return tt(h ? e.__wrapped__ : e, g ? t.__wrapped__ : t, n, r, i, o);
if (l != L) return !1;
var v = e.constructor, m = t.constructor;
if (v != m && !(At(v) && v instanceof v && At(m) && m instanceof m) && "constructor" in e && "constructor" in t) return !1;
}
var y = !i;
i || (i = u()), o || (o = u());
for (var b = i.length; b--; ) if (i[b] == e) return o[b] == t;
var x = 0;
if (a = !0, i.push(e), o.push(t), p) {
if (b = e.length, x = t.length, a = x == b, a || r) for (;x--; ) {
var w = b, _ = t[x];
if (r) for (;w-- && !(a = tt(e[w], _, n, r, i, o)); ) ; else if (!(a = tt(e[x], _, n, r, i, o))) break;
}
} else si(t, function(t, s, u) {
return Or.call(u, s) ? (x++, a = Or.call(e, s) && tt(e[s], t, n, r, i, o)) : void 0;
}), a && !r && si(e, function(e, t, n) {
return Or.call(n, t) ? a = --x > -1 : void 0;
});
return i.pop(), o.pop(), y && (f(i), f(o)), a;
}
function nt(e, t, n, r, i) {
(Jr(t) ? Qt : ui)(t, function(t, o) {
var a, s, u = t, c = e[o];
if (t && ((s = Jr(t)) || ci(t))) {
for (var f = r.length; f--; ) if (a = r[f] == t) {
c = i[f];
break;
}
if (!a) {
var l;
n && (u = n(c, t), (l = "undefined" != typeof u) && (c = u)), l || (c = s ? Jr(c) ? c : [] : ci(c) ? c : {}), 
r.push(t), i.push(c), l || nt(c, t, n, r, i);
}
} else n && (u = n(c, t), "undefined" == typeof u && (u = t)), "undefined" != typeof u && (c = u);
e[o] = c;
});
}
function rt(e, t) {
return e + Dr(Kr() * (t - e + 1));
}
function it(e, r, i) {
var o = -1, s = ut(), c = e ? e.length : 0, d = [], p = !r && c >= b && s === t, h = i || p ? u() : d;
if (p) {
var g = a(h);
s = n, h = g;
}
for (;++o < c; ) {
var v = e[o], m = i ? i(v, o, e) : v;
(r ? !o || h[h.length - 1] !== m : s(h, m) < 0) && ((i || p) && h.push(m), d.push(v));
}
return p ? (f(h.array), l(h)) : i && f(h), d;
}
function ot(e) {
return function(t, n, i) {
var o = {};
n = r.createCallback(n, i, 3);
var a = -1, s = t ? t.length : 0;
if ("number" == typeof s) for (;++a < s; ) {
var u = t[a];
e(o, u, n(u, a, t), t);
} else ui(t, function(t, r, i) {
e(o, t, n(t, r, i), i);
});
return o;
};
}
function at(e, t, n, r, i, o) {
var a = 1 & t, s = 2 & t, u = 4 & t, c = 16 & t, f = 32 & t;
if (!s && !At(e)) throw new Er();
c && !n.length && (t &= -17, c = n = !1), f && !r.length && (t &= -33, f = r = !1);
var l = e && e.__bindData__;
if (l && l !== !0) return l = d(l), l[2] && (l[2] = d(l[2])), l[3] && (l[3] = d(l[3])), 
!a || 1 & l[1] || (l[4] = i), !a && 1 & l[1] && (t |= 8), !u || 4 & l[1] || (l[5] = o), 
c && Nr.apply(l[2] || (l[2] = []), n), f && Ir.apply(l[3] || (l[3] = []), r), l[1] |= t, 
at.apply(null, l);
var p = 1 == t || 17 === t ? v : G;
return p([ e, t, n, r, i, o ]);
}
function st(e) {
return ti[e];
}
function ut() {
var e = (e = r.indexOf) === yn ? t : e;
return e;
}
function ct(e) {
return "function" == typeof e && Cr.test(e);
}
function ft(e) {
var t, n;
return e && Tr.call(e) == L && (t = e.constructor, !At(t) || t instanceof t) ? (si(e, function(e, t) {
n = t;
}), "undefined" == typeof n || Or.call(e, n)) : !1;
}
function lt(e) {
return ni[e];
}
function dt(e) {
return e && "object" == typeof e && "number" == typeof e.length && Tr.call(e) == N || !1;
}
function pt(e, t, n, r) {
return "boolean" != typeof t && null != t && (r = n, n = t, t = !1), x(e, t, "function" == typeof n && Q(n, r, 1));
}
function ht(e, t, n) {
return x(e, !0, "function" == typeof t && Q(t, n, 1));
}
function gt(e, t) {
var n = K(e);
return t ? oi(n, t) : n;
}
function vt(e, t, n) {
var i;
return t = r.createCallback(t, n, 3), ui(e, function(e, n, r) {
return t(e, n, r) ? (i = n, !1) : void 0;
}), i;
}
function mt(e, t, n) {
var i;
return t = r.createCallback(t, n, 3), bt(e, function(e, n, r) {
return t(e, n, r) ? (i = n, !1) : void 0;
}), i;
}
function yt(e, t, n) {
var r = [];
si(e, function(e, t) {
r.push(t, e);
});
var i = r.length;
for (t = Q(t, n, 3); i-- && t(r[i--], r[i], e) !== !1; ) ;
return e;
}
function bt(e, t, n) {
var r = ei(e), i = r.length;
for (t = Q(t, n, 3); i--; ) {
var o = r[i];
if (t(e[o], o, e) === !1) break;
}
return e;
}
function xt(e) {
var t = [];
return si(e, function(e, n) {
At(e) && t.push(n);
}), t.sort();
}
function wt(e, t) {
return e ? Or.call(e, t) : !1;
}
function _t(e) {
for (var t = -1, n = ei(e), r = n.length, i = {}; ++t < r; ) {
var o = n[t];
i[e[o]] = o;
}
return i;
}
function Et(e) {
return e === !0 || e === !1 || e && "object" == typeof e && Tr.call(e) == R || !1;
}
function kt(e) {
return e && "object" == typeof e && Tr.call(e) == I || !1;
}
function Bt(e) {
return e && 1 === e.nodeType || !1;
}
function St(e) {
var t = !0;
if (!e) return t;
var n = Tr.call(e), r = e.length;
return n == q || n == H || n == N || n == L && "number" == typeof r && At(e.splice) ? !r : (ui(e, function() {
return t = !1;
}), t);
}
function Tt(e, t, n, r) {
return tt(e, t, "function" == typeof n && Q(n, r, 2));
}
function Ct(e) {
return zr(e) && !Hr(parseFloat(e));
}
function At(e) {
return "function" == typeof e;
}
function Mt(e) {
return !(!e || !X[typeof e]);
}
function Dt(e) {
return jt(e) && e != +e;
}
function Wt(e) {
return null === e;
}
function jt(e) {
return "number" == typeof e || e && "object" == typeof e && Tr.call(e) == P || !1;
}
function Ot(e) {
return e && "object" == typeof e && Tr.call(e) == z || !1;
}
function Nt(e) {
return "string" == typeof e || e && "object" == typeof e && Tr.call(e) == H || !1;
}
function qt(e) {
return "undefined" == typeof e;
}
function Rt(e, t, n) {
var i = {};
return t = r.createCallback(t, n, 3), ui(e, function(e, n, r) {
i[n] = t(e, n, r);
}), i;
}
function It(e) {
var t = arguments, n = 2;
if (!Mt(e)) return e;
if ("number" != typeof t[2] && (n = t.length), n > 3 && "function" == typeof t[n - 2]) var r = Q(t[--n - 1], t[n--], 2); else n > 2 && "function" == typeof t[n - 1] && (r = t[--n]);
for (var i = d(arguments, 1, n), o = -1, a = u(), s = u(); ++o < n; ) nt(e, i[o], r, a, s);
return f(a), f(s), e;
}
function Ft(e, t, n) {
var i = {};
if ("function" != typeof t) {
var o = [];
si(e, function(e, t) {
o.push(t);
}), o = J(o, et(arguments, !0, !1, 1));
for (var a = -1, s = o.length; ++a < s; ) {
var u = o[a];
i[u] = e[u];
}
} else t = r.createCallback(t, n, 3), si(e, function(e, n, r) {
t(e, n, r) || (i[n] = e);
});
return i;
}
function Pt(e) {
for (var t = -1, n = ei(e), r = n.length, i = hr(r); ++t < r; ) {
var o = n[t];
i[t] = [ o, e[o] ];
}
return i;
}
function Lt(e, t, n) {
var i = {};
if ("function" != typeof t) for (var o = -1, a = et(arguments, !0, !1, 1), s = Mt(e) ? a.length : 0; ++o < s; ) {
var u = a[o];
u in e && (i[u] = e[u]);
} else t = r.createCallback(t, n, 3), si(e, function(e, n, r) {
t(e, n, r) && (i[n] = e);
});
return i;
}
function zt(e, t, n, i) {
var o = Jr(e);
if (null == n) if (o) n = []; else {
var a = e && e.constructor, s = a && a.prototype;
n = K(s);
}
return t && (t = r.createCallback(t, i, 4), (o ? Qt : ui)(e, function(e, r, i) {
return t(n, e, r, i);
})), n;
}
function Ht(e) {
for (var t = -1, n = ei(e), r = n.length, i = hr(r); ++t < r; ) i[t] = e[n[t]];
return i;
}
function Ut(e) {
for (var t = arguments, n = -1, r = et(t, !0, !1, 1), i = t[2] && t[2][t[1]] === e ? 1 : r.length, o = hr(i); ++n < i; ) o[n] = e[r[n]];
return o;
}
function $t(e, t, n) {
var r = -1, i = ut(), o = e ? e.length : 0, a = !1;
return n = (0 > n ? $r(0, o + n) : n) || 0, Jr(e) ? a = i(e, t, n) > -1 : "number" == typeof o ? a = (Nt(e) ? e.indexOf(t, n) : i(e, t, n)) > -1 : ui(e, function(e) {
return ++r >= n ? !(a = e === t) : void 0;
}), a;
}
function Yt(e, t, n) {
var i = !0;
t = r.createCallback(t, n, 3);
var o = -1, a = e ? e.length : 0;
if ("number" == typeof a) for (;++o < a && (i = !!t(e[o], o, e)); ) ; else ui(e, function(e, n, r) {
return i = !!t(e, n, r);
});
return i;
}
function Xt(e, t, n) {
var i = [];
t = r.createCallback(t, n, 3);
var o = -1, a = e ? e.length : 0;
if ("number" == typeof a) for (;++o < a; ) {
var s = e[o];
t(s, o, e) && i.push(s);
} else ui(e, function(e, n, r) {
t(e, n, r) && i.push(e);
});
return i;
}
function Kt(e, t, n) {
t = r.createCallback(t, n, 3);
var i = -1, o = e ? e.length : 0;
if ("number" != typeof o) {
var a;
return ui(e, function(e, n, r) {
return t(e, n, r) ? (a = e, !1) : void 0;
}), a;
}
for (;++i < o; ) {
var s = e[i];
if (t(s, i, e)) return s;
}
}
function Vt(e, t, n) {
var i;
return t = r.createCallback(t, n, 3), Gt(e, function(e, n, r) {
return t(e, n, r) ? (i = e, !1) : void 0;
}), i;
}
function Qt(e, t, n) {
var r = -1, i = e ? e.length : 0;
if (t = t && "undefined" == typeof n ? t : Q(t, n, 3), "number" == typeof i) for (;++r < i && t(e[r], r, e) !== !1; ) ; else ui(e, t);
return e;
}
function Gt(e, t, n) {
var r = e ? e.length : 0;
if (t = t && "undefined" == typeof n ? t : Q(t, n, 3), "number" == typeof r) for (;r-- && t(e[r], r, e) !== !1; ) ; else {
var i = ei(e);
r = i.length, ui(e, function(e, n, o) {
return n = i ? i[--r] : --r, t(o[n], n, o);
});
}
return e;
}
function Jt(e, t) {
var n = d(arguments, 2), r = -1, i = "function" == typeof t, o = e ? e.length : 0, a = hr("number" == typeof o ? o : 0);
return Qt(e, function(e) {
a[++r] = (i ? t : e[t]).apply(e, n);
}), a;
}
function Zt(e, t, n) {
var i = -1, o = e ? e.length : 0;
if (t = r.createCallback(t, n, 3), "number" == typeof o) for (var a = hr(o); ++i < o; ) a[i] = t(e[i], i, e); else a = [], 
ui(e, function(e, n, r) {
a[++i] = t(e, n, r);
});
return a;
}
function en(e, t, n) {
var o = -1/0, a = o;
if ("function" != typeof t && n && n[t] === e && (t = null), null == t && Jr(e)) for (var s = -1, u = e.length; ++s < u; ) {
var c = e[s];
c > a && (a = c);
} else t = null == t && Nt(e) ? i : r.createCallback(t, n, 3), Qt(e, function(e, n, r) {
var i = t(e, n, r);
i > o && (o = i, a = e);
});
return a;
}
function tn(e, t, n) {
var o = 1/0, a = o;
if ("function" != typeof t && n && n[t] === e && (t = null), null == t && Jr(e)) for (var s = -1, u = e.length; ++s < u; ) {
var c = e[s];
a > c && (a = c);
} else t = null == t && Nt(e) ? i : r.createCallback(t, n, 3), Qt(e, function(e, n, r) {
var i = t(e, n, r);
o > i && (o = i, a = e);
});
return a;
}
function nn(e, t, n, i) {
if (!e) return n;
var o = arguments.length < 3;
t = r.createCallback(t, i, 4);
var a = -1, s = e.length;
if ("number" == typeof s) for (o && (n = e[++a]); ++a < s; ) n = t(n, e[a], a, e); else ui(e, function(e, r, i) {
n = o ? (o = !1, e) : t(n, e, r, i);
});
return n;
}
function rn(e, t, n, i) {
var o = arguments.length < 3;
return t = r.createCallback(t, i, 4), Gt(e, function(e, r, i) {
n = o ? (o = !1, e) : t(n, e, r, i);
}), n;
}
function on(e, t, n) {
return t = r.createCallback(t, n, 3), Xt(e, function(e, n, r) {
return !t(e, n, r);
});
}
function an(e, t, n) {
if (e && "number" != typeof e.length && (e = Ht(e)), null == t || n) return e ? e[rt(0, e.length - 1)] : h;
var r = sn(e);
return r.length = Yr($r(0, t), r.length), r;
}
function sn(e) {
var t = -1, n = e ? e.length : 0, r = hr("number" == typeof n ? n : 0);
return Qt(e, function(e) {
var n = rt(0, ++t);
r[t] = r[n], r[n] = e;
}), r;
}
function un(e) {
var t = e ? e.length : 0;
return "number" == typeof t ? t : ei(e).length;
}
function cn(e, t, n) {
var i;
t = r.createCallback(t, n, 3);
var o = -1, a = e ? e.length : 0;
if ("number" == typeof a) for (;++o < a && !(i = t(e[o], o, e)); ) ; else ui(e, function(e, n, r) {
return !(i = t(e, n, r));
});
return !!i;
}
function fn(e, t, n) {
var i = -1, a = Jr(t), s = e ? e.length : 0, d = hr("number" == typeof s ? s : 0);
for (a || (t = r.createCallback(t, n, 3)), Qt(e, function(e, n, r) {
var o = d[++i] = c();
a ? o.criteria = Zt(t, function(t) {
return e[t];
}) : (o.criteria = u())[0] = t(e, n, r), o.index = i, o.value = e;
}), s = d.length, d.sort(o); s--; ) {
var p = d[s];
d[s] = p.value, a || f(p.criteria), l(p);
}
return d;
}
function ln(e) {
return e && "number" == typeof e.length ? d(e) : Ht(e);
}
function dn(e) {
for (var t = -1, n = e ? e.length : 0, r = []; ++t < n; ) {
var i = e[t];
i && r.push(i);
}
return r;
}
function pn(e) {
return J(e, et(arguments, !0, !0, 1));
}
function hn(e, t, n) {
var i = -1, o = e ? e.length : 0;
for (t = r.createCallback(t, n, 3); ++i < o; ) if (t(e[i], i, e)) return i;
return -1;
}
function gn(e, t, n) {
var i = e ? e.length : 0;
for (t = r.createCallback(t, n, 3); i--; ) if (t(e[i], i, e)) return i;
return -1;
}
function vn(e, t, n) {
var i = 0, o = e ? e.length : 0;
if ("number" != typeof t && null != t) {
var a = -1;
for (t = r.createCallback(t, n, 3); ++a < o && t(e[a], a, e); ) i++;
} else if (i = t, null == i || n) return e ? e[0] : h;
return d(e, 0, Yr($r(0, i), o));
}
function mn(e, t, n, r) {
return "boolean" != typeof t && null != t && (r = n, n = "function" != typeof t && r && r[t] === e ? null : t, 
t = !1), null != n && (e = Zt(e, n, r)), et(e, t);
}
function yn(e, n, r) {
if ("number" == typeof r) {
var i = e ? e.length : 0;
r = 0 > r ? $r(0, i + r) : r || 0;
} else if (r) {
var o = Tn(e, n);
return e[o] === n ? o : -1;
}
return t(e, n, r);
}
function bn(e, t, n) {
var i = 0, o = e ? e.length : 0;
if ("number" != typeof t && null != t) {
var a = o;
for (t = r.createCallback(t, n, 3); a-- && t(e[a], a, e); ) i++;
} else i = null == t || n ? 1 : t || i;
return d(e, 0, Yr($r(0, o - i), o));
}
function xn() {
for (var e = [], r = -1, i = arguments.length, o = u(), s = ut(), c = s === t, d = u(); ++r < i; ) {
var p = arguments[r];
(Jr(p) || dt(p)) && (e.push(p), o.push(c && p.length >= b && a(r ? e[r] : d)));
}
var h = e[0], g = -1, v = h ? h.length : 0, m = [];
e: for (;++g < v; ) {
var y = o[0];
if (p = h[g], (y ? n(y, p) : s(d, p)) < 0) {
for (r = i, (y || d).push(p); --r; ) if (y = o[r], (y ? n(y, p) : s(e[r], p)) < 0) continue e;
m.push(p);
}
}
for (;i--; ) y = o[i], y && l(y);
return f(o), f(d), m;
}
function wn(e, t, n) {
var i = 0, o = e ? e.length : 0;
if ("number" != typeof t && null != t) {
var a = o;
for (t = r.createCallback(t, n, 3); a-- && t(e[a], a, e); ) i++;
} else if (i = t, null == i || n) return e ? e[o - 1] : h;
return d(e, $r(0, o - i));
}
function _n(e, t, n) {
var r = e ? e.length : 0;
for ("number" == typeof n && (r = (0 > n ? $r(0, r + n) : Yr(n, r - 1)) + 1); r--; ) if (e[r] === t) return r;
return -1;
}
function En(e) {
for (var t = arguments, n = 0, r = t.length, i = e ? e.length : 0; ++n < r; ) for (var o = -1, a = t[n]; ++o < i; ) e[o] === a && (Rr.call(e, o--, 1), 
i--);
return e;
}
function kn(e, t, n) {
e = +e || 0, n = "number" == typeof n ? n : +n || 1, null == t && (t = e, e = 0);
for (var r = -1, i = $r(0, Ar((t - e) / (n || 1))), o = hr(i); ++r < i; ) o[r] = e, 
e += n;
return o;
}
function Bn(e, t, n) {
var i = -1, o = e ? e.length : 0, a = [];
for (t = r.createCallback(t, n, 3); ++i < o; ) {
var s = e[i];
t(s, i, e) && (a.push(s), Rr.call(e, i--, 1), o--);
}
return a;
}
function Sn(e, t, n) {
if ("number" != typeof t && null != t) {
var i = 0, o = -1, a = e ? e.length : 0;
for (t = r.createCallback(t, n, 3); ++o < a && t(e[o], o, e); ) i++;
} else i = null == t || n ? 1 : $r(0, t);
return d(e, i);
}
function Tn(e, t, n, i) {
var o = 0, a = e ? e.length : o;
for (n = n ? r.createCallback(n, i, 1) : Jn, t = n(t); a > o; ) {
var s = o + a >>> 1;
n(e[s]) < t ? o = s + 1 : a = s;
}
return o;
}
function Cn() {
return it(et(arguments, !0, !0));
}
function An(e, t, n, i) {
return "boolean" != typeof t && null != t && (i = n, n = "function" != typeof t && i && i[t] === e ? null : t, 
t = !1), null != n && (n = r.createCallback(n, i, 3)), it(e, t, n);
}
function Mn(e) {
return J(e, d(arguments, 1));
}
function Dn() {
for (var e = -1, t = arguments.length; ++e < t; ) {
var n = arguments[e];
if (Jr(n) || dt(n)) var r = r ? it(J(r, n).concat(J(n, r))) : n;
}
return r || [];
}
function Wn() {
for (var e = arguments.length > 1 ? arguments : arguments[0], t = -1, n = e ? en(pi(e, "length")) : 0, r = hr(0 > n ? 0 : n); ++t < n; ) r[t] = pi(e, t);
return r;
}
function jn(e, t) {
var n = -1, r = e ? e.length : 0, i = {};
for (t || !r || Jr(e[0]) || (t = []); ++n < r; ) {
var o = e[n];
t ? i[o] = t[n] : o && (i[o[0]] = o[1]);
}
return i;
}
function On(e, t) {
if (!At(t)) throw new Er();
return function() {
return --e < 1 ? t.apply(this, arguments) : void 0;
};
}
function Nn(e, t) {
return arguments.length > 2 ? at(e, 17, d(arguments, 2), null, t) : at(e, 1, null, null, t);
}
function qn(e) {
for (var t = arguments.length > 1 ? et(arguments, !0, !1, 1) : xt(e), n = -1, r = t.length; ++n < r; ) {
var i = t[n];
e[i] = at(e[i], 1, null, null, e);
}
return e;
}
function Rn(e, t) {
return arguments.length > 2 ? at(t, 19, d(arguments, 2), null, e) : at(t, 3, null, null, e);
}
function In() {
for (var e = arguments, t = e.length; t--; ) if (!At(e[t])) throw new Er();
return function() {
for (var t = arguments, n = e.length; n--; ) t = [ e[n].apply(this, t) ];
return t[0];
};
}
function Fn(e, t) {
return t = "number" == typeof t ? t : +t || e.length, at(e, 4, null, null, null, t);
}
function Pn(e, t, n) {
var r, i, o, a, s, u, c, f = 0, l = !1, d = !0;
if (!At(e)) throw new Er();
if (t = $r(0, t) || 0, n === !0) {
var p = !0;
d = !1;
} else Mt(n) && (p = n.leading, l = "maxWait" in n && ($r(t, n.maxWait) || 0), d = "trailing" in n ? n.trailing : d);
var g = function() {
var n = t - (gi() - a);
if (0 >= n) {
i && Mr(i);
var l = c;
i = u = c = h, l && (f = gi(), o = e.apply(s, r), u || i || (r = s = null));
} else u = qr(g, n);
}, v = function() {
u && Mr(u), i = u = c = h, (d || l !== t) && (f = gi(), o = e.apply(s, r), u || i || (r = s = null));
};
return function() {
if (r = arguments, a = gi(), s = this, c = d && (u || !p), l === !1) var n = p && !u; else {
i || p || (f = a);
var h = l - (a - f), m = 0 >= h;
m ? (i && (i = Mr(i)), f = a, o = e.apply(s, r)) : i || (i = qr(v, h));
}
return m && u ? u = Mr(u) : u || t === l || (u = qr(g, t)), n && (m = !0, o = e.apply(s, r)), 
!m || u || i || (r = s = null), o;
};
}
function Ln(e) {
if (!At(e)) throw new Er();
var t = d(arguments, 1);
return qr(function() {
e.apply(h, t);
}, 1);
}
function zn(e, t) {
if (!At(e)) throw new Er();
var n = d(arguments, 2);
return qr(function() {
e.apply(h, n);
}, t);
}
function Hn(e, t) {
if (!At(e)) throw new Er();
var n = function() {
var r = n.cache, i = t ? t.apply(this, arguments) : y + arguments[0];
return Or.call(r, i) ? r[i] : r[i] = e.apply(this, arguments);
};
return n.cache = {}, n;
}
function Un(e) {
var t, n;
if (!At(e)) throw new Er();
return function() {
return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n);
};
}
function $n(e) {
return at(e, 16, d(arguments, 1));
}
function Yn(e) {
return at(e, 32, null, d(arguments, 1));
}
function Xn(e, t, n) {
var r = !0, i = !0;
if (!At(e)) throw new Er();
return n === !1 ? r = !1 : Mt(n) && (r = "leading" in n ? n.leading : r, i = "trailing" in n ? n.trailing : i), 
$.leading = r, $.maxWait = t, $.trailing = i, Pn(e, t, $);
}
function Kn(e, t) {
return at(t, 16, [ e ]);
}
function Vn(e) {
return function() {
return e;
};
}
function Qn(e, t, n) {
var r = typeof e;
if (null == e || "function" == r) return Q(e, t, n);
if ("object" != r) return nr(e);
var i = ei(e), o = i[0], a = e[o];
return 1 != i.length || a !== a || Mt(a) ? function(t) {
for (var n = i.length, r = !1; n-- && (r = tt(t[i[n]], e[i[n]], null, !0)); ) ;
return r;
} : function(e) {
var t = e[o];
return a === t && (0 !== a || 1 / a == 1 / t);
};
}
function Gn(e) {
return null == e ? "" : _r(e).replace(ii, st);
}
function Jn(e) {
return e;
}
function Zn(e, t, n) {
var i = !0, o = t && xt(t);
t && (n || o.length) || (null == n && (n = t), a = g, t = e, e = r, o = xt(t)), 
n === !1 ? i = !1 : Mt(n) && "chain" in n && (i = n.chain);
var a = e, s = At(a);
Qt(o, function(n) {
var r = e[n] = t[n];
s && (a.prototype[n] = function() {
var t = this.__chain__, n = this.__wrapped__, o = [ n ];
Nr.apply(o, arguments);
var s = r.apply(e, o);
if (i || t) {
if (n === s && Mt(s)) return this;
s = new a(s), s.__chain__ = t;
}
return s;
});
});
}
function er() {
return e._ = Sr, this;
}
function tr() {}
function nr(e) {
return function(t) {
return t[e];
};
}
function rr(e, t, n) {
var r = null == e, i = null == t;
if (null == n && ("boolean" == typeof e && i ? (n = e, e = 1) : i || "boolean" != typeof t || (n = t, 
i = !0)), r && i && (t = 1), e = +e || 0, i ? (t = e, e = 0) : t = +t || 0, n || e % 1 || t % 1) {
var o = Kr();
return Yr(e + o * (t - e + parseFloat("1e-" + ((o + "").length - 1))), t);
}
return rt(e, t);
}
function ir(e, t) {
if (e) {
var n = e[t];
return At(n) ? e[t]() : n;
}
}
function or(e, t, n) {
var i = r.templateSettings;
e = _r(e || ""), n = ai({}, n, i);
var o, a = ai({}, n.imports, i.imports), u = ei(a), c = Ht(a), f = 0, l = n.interpolate || M, d = "__p += '", p = wr((n.escape || M).source + "|" + l.source + "|" + (l === C ? B : M).source + "|" + (n.evaluate || M).source + "|$", "g");
e.replace(p, function(t, n, r, i, a, u) {
return r || (r = i), d += e.slice(f, u).replace(W, s), n && (d += "' +\n__e(" + n + ") +\n'"), 
a && (o = !0, d += "';\n" + a + ";\n__p += '"), r && (d += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"), 
f = u + t.length, t;
}), d += "';\n";
var g = n.variable, v = g;
v || (g = "obj", d = "with (" + g + ") {\n" + d + "\n}\n"), d = (o ? d.replace(_, "") : d).replace(E, "$1").replace(k, "$1;"), 
d = "function(" + g + ") {\n" + (v ? "" : g + " || (" + g + " = {});\n") + "var __t, __p = '', __e = _.escape" + (o ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + d + "return __p\n}";
var m = "\n/*\n//# sourceURL=" + (n.sourceURL || "/lodash/template/source[" + O++ + "]") + "\n*/";
try {
var y = mr(u, "return " + d + m).apply(h, c);
} catch (b) {
throw b.source = d, b;
}
return t ? y(t) : (y.source = d, y);
}
function ar(e, t, n) {
e = (e = +e) > -1 ? e : 0;
var r = -1, i = hr(e);
for (t = Q(t, n, 1); ++r < e; ) i[r] = t(r);
return i;
}
function sr(e) {
return null == e ? "" : _r(e).replace(ri, lt);
}
function ur(e) {
var t = ++m;
return _r(null == e ? "" : e) + t;
}
function cr(e) {
return e = new g(e), e.__chain__ = !0, e;
}
function fr(e, t) {
return t(e), e;
}
function lr() {
return this.__chain__ = !0, this;
}
function dr() {
return _r(this.__wrapped__);
}
function pr() {
return this.__wrapped__;
}
e = e ? Z.defaults(V.Object(), e, Z.pick(V, j)) : V;
var hr = e.Array, gr = e.Boolean, vr = e.Date, mr = e.Function, yr = e.Math, br = e.Number, xr = e.Object, wr = e.RegExp, _r = e.String, Er = e.TypeError, kr = [], Br = xr.prototype, Sr = e._, Tr = Br.toString, Cr = wr("^" + _r(Tr).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"), Ar = yr.ceil, Mr = e.clearTimeout, Dr = yr.floor, Wr = mr.prototype.toString, jr = ct(jr = xr.getPrototypeOf) && jr, Or = Br.hasOwnProperty, Nr = kr.push, qr = e.setTimeout, Rr = kr.splice, Ir = kr.unshift, Fr = function() {
try {
var e = {}, t = ct(t = xr.defineProperty) && t, n = t(e, e, e) && t;
} catch (r) {}
return n;
}(), Pr = ct(Pr = xr.create) && Pr, Lr = ct(Lr = hr.isArray) && Lr, zr = e.isFinite, Hr = e.isNaN, Ur = ct(Ur = xr.keys) && Ur, $r = yr.max, Yr = yr.min, Xr = e.parseInt, Kr = yr.random, Vr = {};
Vr[q] = hr, Vr[R] = gr, Vr[I] = vr, Vr[F] = mr, Vr[L] = xr, Vr[P] = br, Vr[z] = wr, 
Vr[H] = _r, g.prototype = r.prototype;
var Qr = r.support = {};
Qr.funcDecomp = !ct(e.WinRTError) && D.test(p), Qr.funcNames = "string" == typeof mr.name, 
r.templateSettings = {
escape: /<%-([\s\S]+?)%>/g,
evaluate: /<%([\s\S]+?)%>/g,
interpolate: C,
variable: "",
imports: {
_: r
}
}, Pr || (K = function() {
function t() {}
return function(n) {
if (Mt(n)) {
t.prototype = n;
var r = new t();
t.prototype = null;
}
return r || e.Object();
};
}());
var Gr = Fr ? function(e, t) {
Y.value = t, Fr(e, "__bindData__", Y);
} : tr, Jr = Lr || function(e) {
return e && "object" == typeof e && "number" == typeof e.length && Tr.call(e) == q || !1;
}, Zr = function(e) {
var t, n = e, r = [];
if (!n) return r;
if (!X[typeof e]) return r;
for (t in n) Or.call(n, t) && r.push(t);
return r;
}, ei = Ur ? function(e) {
return Mt(e) ? Ur(e) : [];
} : Zr, ti = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;",
"'": "&#39;"
}, ni = _t(ti), ri = wr("(" + ei(ni).join("|") + ")", "g"), ii = wr("[" + ei(ti).join("") + "]", "g"), oi = function(e, t, n) {
var r, i = e, o = i;
if (!i) return o;
var a = arguments, s = 0, u = "number" == typeof n ? 2 : a.length;
if (u > 3 && "function" == typeof a[u - 2]) var c = Q(a[--u - 1], a[u--], 2); else u > 2 && "function" == typeof a[u - 1] && (c = a[--u]);
for (;++s < u; ) if (i = a[s], i && X[typeof i]) for (var f = -1, l = X[typeof i] && ei(i), d = l ? l.length : 0; ++f < d; ) r = l[f], 
o[r] = c ? c(o[r], i[r]) : i[r];
return o;
}, ai = function(e, t, n) {
var r, i = e, o = i;
if (!i) return o;
for (var a = arguments, s = 0, u = "number" == typeof n ? 2 : a.length; ++s < u; ) if (i = a[s], 
i && X[typeof i]) for (var c = -1, f = X[typeof i] && ei(i), l = f ? f.length : 0; ++c < l; ) r = f[c], 
"undefined" == typeof o[r] && (o[r] = i[r]);
return o;
}, si = function(e, t, n) {
var r, i = e, o = i;
if (!i) return o;
if (!X[typeof i]) return o;
t = t && "undefined" == typeof n ? t : Q(t, n, 3);
for (r in i) if (t(i[r], r, e) === !1) return o;
return o;
}, ui = function(e, t, n) {
var r, i = e, o = i;
if (!i) return o;
if (!X[typeof i]) return o;
t = t && "undefined" == typeof n ? t : Q(t, n, 3);
for (var a = -1, s = X[typeof i] && ei(i), u = s ? s.length : 0; ++a < u; ) if (r = s[a], 
t(i[r], r, e) === !1) return o;
return o;
}, ci = jr ? function(e) {
if (!e || Tr.call(e) != L) return !1;
var t = e.valueOf, n = ct(t) && (n = jr(t)) && jr(n);
return n ? e == n || jr(e) == n : ft(e);
} : ft, fi = ot(function(e, t, n) {
Or.call(e, n) ? e[n]++ : e[n] = 1;
}), li = ot(function(e, t, n) {
(Or.call(e, n) ? e[n] : e[n] = []).push(t);
}), di = ot(function(e, t, n) {
e[n] = t;
}), pi = Zt, hi = Xt, gi = ct(gi = vr.now) && gi || function() {
return new vr().getTime();
}, vi = 8 == Xr(w + "08") ? Xr : function(e, t) {
return Xr(Nt(e) ? e.replace(A, "") : e, t || 0);
};
return r.after = On, r.assign = oi, r.at = Ut, r.bind = Nn, r.bindAll = qn, r.bindKey = Rn, 
r.chain = cr, r.compact = dn, r.compose = In, r.constant = Vn, r.countBy = fi, r.create = gt, 
r.createCallback = Qn, r.curry = Fn, r.debounce = Pn, r.defaults = ai, r.defer = Ln, 
r.delay = zn, r.difference = pn, r.filter = Xt, r.flatten = mn, r.forEach = Qt, 
r.forEachRight = Gt, r.forIn = si, r.forInRight = yt, r.forOwn = ui, r.forOwnRight = bt, 
r.functions = xt, r.groupBy = li, r.indexBy = di, r.initial = bn, r.intersection = xn, 
r.invert = _t, r.invoke = Jt, r.keys = ei, r.map = Zt, r.mapValues = Rt, r.max = en, 
r.memoize = Hn, r.merge = It, r.min = tn, r.omit = Ft, r.once = Un, r.pairs = Pt, 
r.partial = $n, r.partialRight = Yn, r.pick = Lt, r.pluck = pi, r.property = nr, 
r.pull = En, r.range = kn, r.reject = on, r.remove = Bn, r.rest = Sn, r.shuffle = sn, 
r.sortBy = fn, r.tap = fr, r.throttle = Xn, r.times = ar, r.toArray = ln, r.transform = zt, 
r.union = Cn, r.uniq = An, r.values = Ht, r.where = hi, r.without = Mn, r.wrap = Kn, 
r.xor = Dn, r.zip = Wn, r.zipObject = jn, r.collect = Zt, r.drop = Sn, r.each = Qt, 
r.eachRight = Gt, r.extend = oi, r.methods = xt, r.object = jn, r.select = Xt, r.tail = Sn, 
r.unique = An, r.unzip = Wn, Zn(r), r.clone = pt, r.cloneDeep = ht, r.contains = $t, 
r.escape = Gn, r.every = Yt, r.find = Kt, r.findIndex = hn, r.findKey = vt, r.findLast = Vt, 
r.findLastIndex = gn, r.findLastKey = mt, r.has = wt, r.identity = Jn, r.indexOf = yn, 
r.isArguments = dt, r.isArray = Jr, r.isBoolean = Et, r.isDate = kt, r.isElement = Bt, 
r.isEmpty = St, r.isEqual = Tt, r.isFinite = Ct, r.isFunction = At, r.isNaN = Dt, 
r.isNull = Wt, r.isNumber = jt, r.isObject = Mt, r.isPlainObject = ci, r.isRegExp = Ot, 
r.isString = Nt, r.isUndefined = qt, r.lastIndexOf = _n, r.mixin = Zn, r.noConflict = er, 
r.noop = tr, r.now = gi, r.parseInt = vi, r.random = rr, r.reduce = nn, r.reduceRight = rn, 
r.result = ir, r.runInContext = p, r.size = un, r.some = cn, r.sortedIndex = Tn, 
r.template = or, r.unescape = sr, r.uniqueId = ur, r.all = Yt, r.any = cn, r.detect = Kt, 
r.findWhere = Kt, r.foldl = nn, r.foldr = rn, r.include = $t, r.inject = nn, Zn(function() {
var e = {};
return ui(r, function(t, n) {
r.prototype[n] || (e[n] = t);
}), e;
}(), !1), r.first = vn, r.last = wn, r.sample = an, r.take = vn, r.head = vn, ui(r, function(e, t) {
var n = "sample" !== t;
r.prototype[t] || (r.prototype[t] = function(t, r) {
var i = this.__chain__, o = e(this.__wrapped__, t, r);
return i || null != t && (!r || n && "function" == typeof t) ? new g(o, i) : o;
});
}), r.VERSION = "2.4.1", r.prototype.chain = lr, r.prototype.toString = dr, r.prototype.value = pr, 
r.prototype.valueOf = pr, Qt([ "join", "pop", "shift" ], function(e) {
var t = kr[e];
r.prototype[e] = function() {
var e = this.__chain__, n = t.apply(this.__wrapped__, arguments);
return e ? new g(n, e) : n;
};
}), Qt([ "push", "reverse", "sort", "unshift" ], function(e) {
var t = kr[e];
r.prototype[e] = function() {
return t.apply(this.__wrapped__, arguments), this;
};
}), Qt([ "concat", "slice", "splice" ], function(e) {
var t = kr[e];
r.prototype[e] = function() {
return new g(t.apply(this.__wrapped__, arguments), this.__chain__);
};
}), r;
}
var h, g = [], v = [], m = 0, y = +new Date() + "", b = 75, x = 40, w = " 	\f ﻿\n\r\u2028\u2029 ᠎             　", _ = /\b__p \+= '';/g, E = /\b(__p \+=) '' \+/g, k = /(__e\(.*?\)|\b__t\)) \+\n'';/g, B = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, S = /\w*$/, T = /^\s*function[ \n\r\t]+\w/, C = /<%=([\s\S]+?)%>/g, A = RegExp("^[" + w + "]*0+(?=.$)"), M = /($^)/, D = /\bthis\b/, W = /['\n\r\t\u2028\u2029\\]/g, j = [ "Array", "Boolean", "Date", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setTimeout" ], O = 0, N = "[object Arguments]", q = "[object Array]", R = "[object Boolean]", I = "[object Date]", F = "[object Function]", P = "[object Number]", L = "[object Object]", z = "[object RegExp]", H = "[object String]", U = {};
U[F] = !1, U[N] = U[q] = U[R] = U[I] = U[P] = U[L] = U[z] = U[H] = !0;
var $ = {
leading: !1,
maxWait: 0,
trailing: !1
}, Y = {
configurable: !1,
enumerable: !1,
value: null,
writable: !1
}, X = {
"boolean": !1,
"function": !0,
object: !0,
number: !1,
string: !1,
undefined: !1
}, K = {
"\\": "\\",
"'": "'",
"\n": "n",
"\r": "r",
"	": "t",
"\u2028": "u2028",
"\u2029": "u2029"
}, V = X[typeof e] && e || this, Q = X[typeof exports] && exports && !exports.nodeType && exports, G = X[typeof module] && module && !module.nodeType && module, J = (G && G.exports === Q && Q, 
X[typeof global] && global);
!J || J.global !== J && J.window !== J || (V = J);
var Z = p();
return e._ = Z, Z;
});
(function(e) {
"function" == typeof define && define.amd ? define('vendor/jquery',[ "wunderbits/global" ], e) : window.$ = e(window);
}).call(this, function(e, t) {
function n(e) {
var t = e.length, n = et.type(e);
return "function" === n || et.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e;
}
function r(e, t, n) {
if (et.isFunction(t)) return et.grep(e, function(e, r) {
return !!t.call(e, r, e) !== n;
});
if (t.nodeType) return et.grep(e, function(e) {
return e === t !== n;
});
if ("string" == typeof t) {
if (st.test(t)) return et.filter(t, e, n);
t = et.filter(t, e);
}
return et.grep(e, function(e) {
return X.call(t, e) >= 0 !== n;
});
}
function i(e, t) {
for (;(e = e[t]) && 1 !== e.nodeType; ) ;
return e;
}
function o(e) {
var t = ht[e] = {};
return et.each(e.match(pt) || [], function(e, n) {
t[n] = !0;
}), t;
}
function a() {
J.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1), 
et.ready();
}
function s() {
Object.defineProperty(this.cache = {}, 0, {
get: function() {
return {};
}
}), this.expando = et.expando + Math.random();
}
function u(e, n, r) {
var i;
if (r === t && 1 === e.nodeType) if (i = "data-" + n.replace(xt, "-$1").toLowerCase(), 
r = e.getAttribute(i), "string" == typeof r) {
try {
r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : bt.test(r) ? et.parseJSON(r) : r;
} catch (o) {}
yt.set(e, n, r);
} else r = t;
return r;
}
function c() {
return !0;
}
function f() {
return !1;
}
function l() {
try {
return J.activeElement;
} catch (e) {}
}
function d(e, t) {
return et.nodeName(e, "table") && et.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
}
function p(e) {
return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
}
function h(e) {
var t = qt.exec(e.type);
return t ? e.type = t[1] : e.removeAttribute("type"), e;
}
function g(e, t) {
for (var n = 0, r = e.length; r > n; n++) mt.set(e[n], "globalEval", !t || mt.get(t[n], "globalEval"));
}
function v(e, t) {
var n, r, i, o, a, s, u, c;
if (1 === t.nodeType) {
if (mt.hasData(e) && (o = mt.access(e), a = mt.set(t, o), c = o.events)) {
delete a.handle, a.events = {};
for (i in c) for (n = 0, r = c[i].length; r > n; n++) et.event.add(t, i, c[i][n]);
}
yt.hasData(e) && (s = yt.access(e), u = et.extend({}, s), yt.set(t, u));
}
}
function m(e, n) {
var r = e.getElementsByTagName ? e.getElementsByTagName(n || "*") : e.querySelectorAll ? e.querySelectorAll(n || "*") : [];
return n === t || n && et.nodeName(e, n) ? et.merge([ e ], r) : r;
}
function y(e, t) {
var n = t.nodeName.toLowerCase();
"input" === n && kt.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
}
function b(t, n) {
var r = et(n.createElement(t)).appendTo(n.body), i = e.getDefaultComputedStyle ? e.getDefaultComputedStyle(r[0]).display : et.css(r[0], "display");
return r.detach(), i;
}
function x(e) {
var t = J, n = Pt[e];
return n || (n = b(e, t), "none" !== n && n || (Ft = (Ft || et("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), 
t = Ft[0].contentDocument, t.write(), t.close(), n = b(e, t), Ft.detach()), Pt[e] = n), 
n;
}
function w(e, n, r) {
var i, o, a, s, u = e.style;
return r = r || zt(e), r && (s = r.getPropertyValue(n) || r[n]), r && ("" !== s || et.contains(e.ownerDocument, e) || (s = et.style(e, n)), 
Ht.test(s) && Lt.test(n) && (i = u.width, o = u.minWidth, a = u.maxWidth, u.minWidth = u.maxWidth = u.width = s, 
s = r.width, u.width = i, u.minWidth = o, u.maxWidth = a)), s !== t ? s + "" : s;
}
function _(e, t) {
return {
get: function() {
return e() ? void delete this.get : (this.get = t).apply(this, arguments);
}
};
}
function E(e, t) {
if (t in e) return t;
for (var n = t[0].toUpperCase() + t.slice(1), r = t, i = Kt.length; i--; ) if (t = Kt[i] + n, 
t in e) return t;
return r;
}
function k(e, t, n) {
var r = $t.exec(t);
return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
}
function T(e, t, n, r, i) {
for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += et.css(e, n + _t[o], !0, i)), 
r ? ("content" === n && (a -= et.css(e, "padding" + _t[o], !0, i)), "margin" !== n && (a -= et.css(e, "border" + _t[o] + "Width", !0, i))) : (a += et.css(e, "padding" + _t[o], !0, i), 
"padding" !== n && (a += et.css(e, "border" + _t[o] + "Width", !0, i)));
return a;
}
function S(e, t, n) {
var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = zt(e), a = "border-box" === et.css(e, "boxSizing", !1, o);
if (0 >= i || null == i) {
if (i = w(e, t, o), (0 > i || null == i) && (i = e.style[t]), Ht.test(i)) return i;
r = a && (G.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0;
}
return i + T(e, t, n || (a ? "border" : "content"), r, o) + "px";
}
function C(e, t) {
for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) r = e[a], r.style && (o[a] = mt.get(r, "olddisplay"), 
n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && Et(r) && (o[a] = mt.access(r, "olddisplay", x(r.nodeName)))) : o[a] || (i = Et(r), 
(n && "none" !== n || !i) && mt.set(r, "olddisplay", i ? n : et.css(r, "display"))));
for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
return e;
}
function B(e, t, n, r, i) {
return new B.prototype.init(e, t, n, r, i);
}
function D() {
return setTimeout(function() {
Qt = t;
}), Qt = et.now();
}
function A(e, t) {
var n, r = 0, i = {
height: e
};
for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = _t[r], i["margin" + n] = i["padding" + n] = e;
return t && (i.opacity = i.width = e), i;
}
function j(e, t, n) {
for (var r, i = (nn[t] || []).concat(nn["*"]), o = 0, a = i.length; a > o; o++) if (r = i[o].call(n, t, e)) return r;
}
function M(e, n, r) {
var i, o, a, s, u, c, f, l = this, d = {}, p = e.style, h = e.nodeType && Et(e), g = mt.get(e, "fxshow");
r.queue || (u = et._queueHooks(e, "fx"), null == u.unqueued && (u.unqueued = 0, 
c = u.empty.fire, u.empty.fire = function() {
u.unqueued || c();
}), u.unqueued++, l.always(function() {
l.always(function() {
u.unqueued--, et.queue(e, "fx").length || u.empty.fire();
});
})), 1 === e.nodeType && ("height" in n || "width" in n) && (r.overflow = [ p.overflow, p.overflowX, p.overflowY ], 
f = et.css(e, "display"), "none" === f && (f = x(e.nodeName)), "inline" === f && "none" === et.css(e, "float") && (p.display = "inline-block")), 
r.overflow && (p.overflow = "hidden", l.always(function() {
p.overflow = r.overflow[0], p.overflowX = r.overflow[1], p.overflowY = r.overflow[2];
}));
for (i in n) if (o = n[i], Jt.exec(o)) {
if (delete n[i], a = a || "toggle" === o, o === (h ? "hide" : "show")) {
if ("show" !== o || !g || g[i] === t) continue;
h = !0;
}
d[i] = g && g[i] || et.style(e, i);
}
if (!et.isEmptyObject(d)) {
g ? "hidden" in g && (h = g.hidden) : g = mt.access(e, "fxshow", {}), a && (g.hidden = !h), 
h ? et(e).show() : l.done(function() {
et(e).hide();
}), l.done(function() {
var t;
mt.remove(e, "fxshow");
for (t in d) et.style(e, t, d[t]);
});
for (i in d) s = j(h ? g[i] : 0, i, l), i in g || (g[i] = s.start, h && (s.end = s.start, 
s.start = "width" === i || "height" === i ? 1 : 0));
}
}
function W(e, t) {
var n, r, i, o, a;
for (n in e) if (r = et.camelCase(n), i = t[r], o = e[n], et.isArray(o) && (i = o[1], 
o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = et.cssHooks[r], a && "expand" in a) {
o = a.expand(o), delete e[r];
for (n in o) n in e || (e[n] = o[n], t[n] = i);
} else t[r] = i;
}
function N(e, t, n) {
var r, i, o = 0, a = tn.length, s = et.Deferred().always(function() {
delete u.elem;
}), u = function() {
if (i) return !1;
for (var t = Qt || D(), n = Math.max(0, c.startTime + c.duration - t), r = n / c.duration || 0, o = 1 - r, a = 0, u = c.tweens.length; u > a; a++) c.tweens[a].run(o);
return s.notifyWith(e, [ c, o, n ]), 1 > o && u ? n : (s.resolveWith(e, [ c ]), 
!1);
}, c = s.promise({
elem: e,
props: et.extend({}, t),
opts: et.extend(!0, {
specialEasing: {}
}, n),
originalProperties: t,
originalOptions: n,
startTime: Qt || D(),
duration: n.duration,
tweens: [],
createTween: function(t, n) {
var r = et.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
return c.tweens.push(r), r;
},
stop: function(t) {
var n = 0, r = t ? c.tweens.length : 0;
if (i) return this;
for (i = !0; r > n; n++) c.tweens[n].run(1);
return t ? s.resolveWith(e, [ c, t ]) : s.rejectWith(e, [ c, t ]), this;
}
}), f = c.props;
for (W(f, c.opts.specialEasing); a > o; o++) if (r = tn[o].call(c, e, f, c.opts)) return r;
return et.map(f, j, c), et.isFunction(c.opts.start) && c.opts.start.call(e, c), 
et.fx.timer(et.extend(u, {
elem: e,
anim: c,
queue: c.opts.queue
})), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always);
}
function O(e) {
return function(t, n) {
"string" != typeof t && (n = t, t = "*");
var r, i = 0, o = t.toLowerCase().match(pt) || [];
if (et.isFunction(n)) for (;r = o[i++]; ) "+" === r[0] ? (r = r.slice(1) || "*", 
(e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
};
}
function q(e, t, n, r) {
function i(s) {
var u;
return o[s] = !0, et.each(e[s] || [], function(e, s) {
var c = s(t, n, r);
return "string" != typeof c || a || o[c] ? a ? !(u = c) : void 0 : (t.dataTypes.unshift(c), 
i(c), !1);
}), u;
}
var o = {}, a = e === _n;
return i(t.dataTypes[0]) || !o["*"] && i("*");
}
function R(e, n) {
var r, i, o = et.ajaxSettings.flatOptions || {};
for (r in n) n[r] !== t && ((o[r] ? e : i || (i = {}))[r] = n[r]);
return i && et.extend(!0, e, i), e;
}
function I(e, n, r) {
for (var i, o, a, s, u = e.contents, c = e.dataTypes; "*" === c[0]; ) c.shift(), 
i === t && (i = e.mimeType || n.getResponseHeader("Content-Type"));
if (i) for (o in u) if (u[o] && u[o].test(i)) {
c.unshift(o);
break;
}
if (c[0] in r) a = c[0]; else {
for (o in r) {
if (!c[0] || e.converters[o + " " + c[0]]) {
a = o;
break;
}
s || (s = o);
}
a = a || s;
}
return a ? (a !== c[0] && c.unshift(a), r[a]) : void 0;
}
function F(e, t, n, r) {
var i, o, a, s, u, c = {}, f = e.dataTypes.slice();
if (f[1]) for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
for (o = f.shift(); o; ) if (e.responseFields[o] && (n[e.responseFields[o]] = t), 
!u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = f.shift()) if ("*" === o) o = u; else if ("*" !== u && u !== o) {
if (a = c[u + " " + o] || c["* " + o], !a) for (i in c) if (s = i.split(" "), s[1] === o && (a = c[u + " " + s[0]] || c["* " + s[0]])) {
a === !0 ? a = c[i] : c[i] !== !0 && (o = s[0], f.unshift(s[1]));
break;
}
if (a !== !0) if (a && e["throws"]) t = a(t); else try {
t = a(t);
} catch (l) {
return {
state: "parsererror",
error: a ? l : "No conversion from " + u + " to " + o
};
}
}
return {
state: "success",
data: t
};
}
function P(e, t, n, r) {
var i;
if (et.isArray(t)) et.each(t, function(t, i) {
n || Sn.test(e) ? r(e, i) : P(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r);
}); else if (n || "object" !== et.type(t)) r(e, t); else for (i in t) P(e + "[" + i + "]", t[i], n, r);
}
function L(e) {
return et.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
}
var H = [], z = H.slice, U = H.concat, $ = H.push, X = H.indexOf, Y = {}, V = Y.toString, K = Y.hasOwnProperty, Q = "".trim, G = {}, J = e.document, Z = "2.1.0", et = function(e, t) {
return new et.fn.init(e, t);
}, tt = /^-ms-/, nt = /-([\da-z])/gi, rt = function(e, t) {
return t.toUpperCase();
};
et.fn = et.prototype = {
jquery: Z,
constructor: et,
selector: "",
length: 0,
toArray: function() {
return z.call(this);
},
get: function(e) {
return null != e ? 0 > e ? this[e + this.length] : this[e] : z.call(this);
},
pushStack: function(e) {
var t = et.merge(this.constructor(), e);
return t.prevObject = this, t.context = this.context, t;
},
each: function(e, t) {
return et.each(this, e, t);
},
map: function(e) {
return this.pushStack(et.map(this, function(t, n) {
return e.call(t, n, t);
}));
},
slice: function() {
return this.pushStack(z.apply(this, arguments));
},
first: function() {
return this.eq(0);
},
last: function() {
return this.eq(-1);
},
eq: function(e) {
var t = this.length, n = +e + (0 > e ? t : 0);
return this.pushStack(n >= 0 && t > n ? [ this[n] ] : []);
},
end: function() {
return this.prevObject || this.constructor(null);
},
push: $,
sort: H.sort,
splice: H.splice
}, et.extend = et.fn.extend = function() {
var e, n, r, i, o, a, s = arguments[0] || {}, u = 1, c = arguments.length, f = !1;
for ("boolean" == typeof s && (f = s, s = arguments[u] || {}, u++), "object" == typeof s || et.isFunction(s) || (s = {}), 
u === c && (s = this, u--); c > u; u++) if (null != (e = arguments[u])) for (n in e) r = s[n], 
i = e[n], s !== i && (f && i && (et.isPlainObject(i) || (o = et.isArray(i))) ? (o ? (o = !1, 
a = r && et.isArray(r) ? r : []) : a = r && et.isPlainObject(r) ? r : {}, s[n] = et.extend(f, a, i)) : i !== t && (s[n] = i));
return s;
}, et.extend({
expando: "jQuery" + (Z + Math.random()).replace(/\D/g, ""),
isReady: !0,
error: function(e) {
throw new Error(e);
},
noop: function() {},
isFunction: function(e) {
return "function" === et.type(e);
},
isArray: Array.isArray,
isWindow: function(e) {
return null != e && e === e.window;
},
isNumeric: function(e) {
return e - parseFloat(e) >= 0;
},
isPlainObject: function(e) {
if ("object" !== et.type(e) || e.nodeType || et.isWindow(e)) return !1;
try {
if (e.constructor && !K.call(e.constructor.prototype, "isPrototypeOf")) return !1;
} catch (t) {
return !1;
}
return !0;
},
isEmptyObject: function(e) {
var t;
for (t in e) return !1;
return !0;
},
type: function(e) {
return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Y[V.call(e)] || "object" : typeof e;
},
globalEval: function(e) {
var t, n = eval;
e = et.trim(e), e && (1 === e.indexOf("use strict") ? (t = J.createElement("script"), 
t.text = e, J.head.appendChild(t).parentNode.removeChild(t)) : n(e));
},
camelCase: function(e) {
return e.replace(tt, "ms-").replace(nt, rt);
},
nodeName: function(e, t) {
return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
},
each: function(e, t, r) {
var i, o = 0, a = e.length, s = n(e);
if (r) {
if (s) for (;a > o && (i = t.apply(e[o], r), i !== !1); o++) ; else for (o in e) if (i = t.apply(e[o], r), 
i === !1) break;
} else if (s) for (;a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++) ; else for (o in e) if (i = t.call(e[o], o, e[o]), 
i === !1) break;
return e;
},
trim: function(e) {
return null == e ? "" : Q.call(e);
},
makeArray: function(e, t) {
var r = t || [];
return null != e && (n(Object(e)) ? et.merge(r, "string" == typeof e ? [ e ] : e) : $.call(r, e)), 
r;
},
inArray: function(e, t, n) {
return null == t ? -1 : X.call(t, e, n);
},
merge: function(e, t) {
for (var n = +t.length, r = 0, i = e.length; n > r; r++) e[i++] = t[r];
return e.length = i, e;
},
grep: function(e, t, n) {
for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++) r = !t(e[o], o), r !== s && i.push(e[o]);
return i;
},
map: function(e, t, r) {
var i, o = 0, a = e.length, s = n(e), u = [];
if (s) for (;a > o; o++) i = t(e[o], o, r), null != i && u.push(i); else for (o in e) i = t(e[o], o, r), 
null != i && u.push(i);
return U.apply([], u);
},
guid: 1,
proxy: function(e, n) {
var r, i, o;
return "string" == typeof n && (r = e[n], n = e, e = r), et.isFunction(e) ? (i = z.call(arguments, 2), 
o = function() {
return e.apply(n || this, i.concat(z.call(arguments)));
}, o.guid = e.guid = e.guid || et.guid++, o) : t;
},
now: Date.now,
support: G
}), et.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
Y["[object " + t + "]"] = t.toLowerCase();
});
var it = function(e) {
function n(e, t, n, r) {
var i, o, a, s, u, c, f, d, g, v;
if ((t ? t.ownerDocument || t : L) !== W && M(t), t = t || W, n = n || [], !e || "string" != typeof e) return n;
if (1 !== (s = t.nodeType) && 9 !== s) return [];
if (O && !r) {
if (i = bt.exec(e)) if (a = i[1]) {
if (9 === s) {
if (o = t.getElementById(a), !o || !o.parentNode) return n;
if (o.id === a) return n.push(o), n;
} else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && F(t, o) && o.id === a) return n.push(o), 
n;
} else {
if (i[2]) return et.apply(n, t.getElementsByTagName(e)), n;
if ((a = i[3]) && k.getElementsByClassName && t.getElementsByClassName) return et.apply(n, t.getElementsByClassName(a)), 
n;
}
if (k.qsa && (!q || !q.test(e))) {
if (d = f = P, g = t, v = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
for (c = p(e), (f = t.getAttribute("id")) ? d = f.replace(wt, "\\$&") : t.setAttribute("id", d), 
d = "[id='" + d + "'] ", u = c.length; u--; ) c[u] = d + h(c[u]);
g = xt.test(e) && l(t.parentNode) || t, v = c.join(",");
}
if (v) try {
return et.apply(n, g.querySelectorAll(v)), n;
} catch (m) {} finally {
f || t.removeAttribute("id");
}
}
}
return _(e.replace(ct, "$1"), t, n, r);
}
function r() {
function e(n, r) {
return t.push(n + " ") > T.cacheLength && delete e[t.shift()], e[n + " "] = r;
}
var t = [];
return e;
}
function i(e) {
return e[P] = !0, e;
}
function o(e) {
var t = W.createElement("div");
try {
return !!e(t);
} catch (n) {
return !1;
} finally {
t.parentNode && t.parentNode.removeChild(t), t = null;
}
}
function a(e, t) {
for (var n = e.split("|"), r = e.length; r--; ) T.attrHandle[n[r]] = t;
}
function s(e, t) {
var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || K) - (~e.sourceIndex || K);
if (r) return r;
if (n) for (;n = n.nextSibling; ) if (n === t) return -1;
return e ? 1 : -1;
}
function u(e) {
return function(t) {
var n = t.nodeName.toLowerCase();
return "input" === n && t.type === e;
};
}
function c(e) {
return function(t) {
var n = t.nodeName.toLowerCase();
return ("input" === n || "button" === n) && t.type === e;
};
}
function f(e) {
return i(function(t) {
return t = +t, i(function(n, r) {
for (var i, o = e([], n.length, t), a = o.length; a--; ) n[i = o[a]] && (n[i] = !(r[i] = n[i]));
});
});
}
function l(e) {
return e && typeof e.getElementsByTagName !== V && e;
}
function d() {}
function p(e, t) {
var r, i, o, a, s, u, c, f = $[e + " "];
if (f) return t ? 0 : f.slice(0);
for (s = e, u = [], c = T.preFilter; s; ) {
(!r || (i = ft.exec(s))) && (i && (s = s.slice(i[0].length) || s), u.push(o = [])), 
r = !1, (i = lt.exec(s)) && (r = i.shift(), o.push({
value: r,
type: i[0].replace(ct, " ")
}), s = s.slice(r.length));
for (a in T.filter) !(i = gt[a].exec(s)) || c[a] && !(i = c[a](i)) || (r = i.shift(), 
o.push({
value: r,
type: a,
matches: i
}), s = s.slice(r.length));
if (!r) break;
}
return t ? s.length : s ? n.error(e) : $(e, u).slice(0);
}
function h(e) {
for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
return r;
}
function g(e, t, n) {
var r = t.dir, i = n && "parentNode" === r, o = z++;
return t.first ? function(t, n, o) {
for (;t = t[r]; ) if (1 === t.nodeType || i) return e(t, n, o);
} : function(t, n, a) {
var s, u, c = [ H, o ];
if (a) {
for (;t = t[r]; ) if ((1 === t.nodeType || i) && e(t, n, a)) return !0;
} else for (;t = t[r]; ) if (1 === t.nodeType || i) {
if (u = t[P] || (t[P] = {}), (s = u[r]) && s[0] === H && s[1] === o) return c[2] = s[2];
if (u[r] = c, c[2] = e(t, n, a)) return !0;
}
};
}
function v(e) {
return e.length > 1 ? function(t, n, r) {
for (var i = e.length; i--; ) if (!e[i](t, n, r)) return !1;
return !0;
} : e[0];
}
function m(e, t, n, r, i) {
for (var o, a = [], s = 0, u = e.length, c = null != t; u > s; s++) (o = e[s]) && (!n || n(o, r, i)) && (a.push(o), 
c && t.push(s));
return a;
}
function y(e, t, n, r, o, a) {
return r && !r[P] && (r = y(r)), o && !o[P] && (o = y(o, a)), i(function(i, a, s, u) {
var c, f, l, d = [], p = [], h = a.length, g = i || w(t || "*", s.nodeType ? [ s ] : s, []), v = !e || !i && t ? g : m(g, d, e, s, u), y = n ? o || (i ? e : h || r) ? [] : a : v;
if (n && n(v, y, s, u), r) for (c = m(y, p), r(c, [], s, u), f = c.length; f--; ) (l = c[f]) && (y[p[f]] = !(v[p[f]] = l));
if (i) {
if (o || e) {
if (o) {
for (c = [], f = y.length; f--; ) (l = y[f]) && c.push(v[f] = l);
o(null, y = [], c, u);
}
for (f = y.length; f--; ) (l = y[f]) && (c = o ? nt.call(i, l) : d[f]) > -1 && (i[c] = !(a[c] = l));
}
} else y = m(y === a ? y.splice(h, y.length) : y), o ? o(null, a, y, u) : et.apply(a, y);
});
}
function b(e) {
for (var t, n, r, i = e.length, o = T.relative[e[0].type], a = o || T.relative[" "], s = o ? 1 : 0, u = g(function(e) {
return e === t;
}, a, !0), c = g(function(e) {
return nt.call(t, e) > -1;
}, a, !0), f = [ function(e, n, r) {
return !o && (r || n !== D) || ((t = n).nodeType ? u(e, n, r) : c(e, n, r));
} ]; i > s; s++) if (n = T.relative[e[s].type]) f = [ g(v(f), n) ]; else {
if (n = T.filter[e[s].type].apply(null, e[s].matches), n[P]) {
for (r = ++s; i > r && !T.relative[e[r].type]; r++) ;
return y(s > 1 && v(f), s > 1 && h(e.slice(0, s - 1).concat({
value: " " === e[s - 2].type ? "*" : ""
})).replace(ct, "$1"), n, r > s && b(e.slice(s, r)), i > r && b(e = e.slice(r)), i > r && h(e));
}
f.push(n);
}
return v(f);
}
function x(e, t) {
var r = t.length > 0, o = e.length > 0, a = function(i, a, s, u, c) {
var f, l, d, p = 0, h = "0", g = i && [], v = [], y = D, b = i || o && T.find.TAG("*", c), x = H += null == y ? 1 : Math.random() || .1, w = b.length;
for (c && (D = a !== W && a); h !== w && null != (f = b[h]); h++) {
if (o && f) {
for (l = 0; d = e[l++]; ) if (d(f, a, s)) {
u.push(f);
break;
}
c && (H = x);
}
r && ((f = !d && f) && p--, i && g.push(f));
}
if (p += h, r && h !== p) {
for (l = 0; d = t[l++]; ) d(g, v, a, s);
if (i) {
if (p > 0) for (;h--; ) g[h] || v[h] || (v[h] = J.call(u));
v = m(v);
}
et.apply(u, v), c && !i && v.length > 0 && p + t.length > 1 && n.uniqueSort(u);
}
return c && (H = x, D = y), g;
};
return r ? i(a) : a;
}
function w(e, t, r) {
for (var i = 0, o = t.length; o > i; i++) n(e, t[i], r);
return r;
}
function _(e, t, n, r) {
var i, o, a, s, u, c = p(e);
if (!r && 1 === c.length) {
if (o = c[0] = c[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && k.getById && 9 === t.nodeType && O && T.relative[o[1].type]) {
if (t = (T.find.ID(a.matches[0].replace(_t, Et), t) || [])[0], !t) return n;
e = e.slice(o.shift().value.length);
}
for (i = gt.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !T.relative[s = a.type]); ) if ((u = T.find[s]) && (r = u(a.matches[0].replace(_t, Et), xt.test(o[0].type) && l(t.parentNode) || t))) {
if (o.splice(i, 1), e = r.length && h(o), !e) return et.apply(n, r), n;
break;
}
}
return B(e, c)(r, t, !O, n, xt.test(e) && l(t.parentNode) || t), n;
}
var E, k, T, S, C, B, D, A, j, M, W, N, O, q, R, I, F, P = "sizzle" + -new Date(), L = e.document, H = 0, z = 0, U = r(), $ = r(), X = r(), Y = function(e, t) {
return e === t && (j = !0), 0;
}, V = typeof t, K = 1 << 31, Q = {}.hasOwnProperty, G = [], J = G.pop, Z = G.push, et = G.push, tt = G.slice, nt = G.indexOf || function(e) {
for (var t = 0, n = this.length; n > t; t++) if (this[t] === e) return t;
return -1;
}, rt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", it = "[\\x20\\t\\r\\n\\f]", ot = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", at = ot.replace("w", "w#"), st = "\\[" + it + "*(" + ot + ")" + it + "*(?:([*^$|!~]?=)" + it + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + at + ")|)|)" + it + "*\\]", ut = ":(" + ot + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + st.replace(3, 8) + ")*)|.*)\\)|)", ct = new RegExp("^" + it + "+|((?:^|[^\\\\])(?:\\\\.)*)" + it + "+$", "g"), ft = new RegExp("^" + it + "*," + it + "*"), lt = new RegExp("^" + it + "*([>+~]|" + it + ")" + it + "*"), dt = new RegExp("=" + it + "*([^\\]'\"]*?)" + it + "*\\]", "g"), pt = new RegExp(ut), ht = new RegExp("^" + at + "$"), gt = {
ID: new RegExp("^#(" + ot + ")"),
CLASS: new RegExp("^\\.(" + ot + ")"),
TAG: new RegExp("^(" + ot.replace("w", "w*") + ")"),
ATTR: new RegExp("^" + st),
PSEUDO: new RegExp("^" + ut),
CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + it + "*(even|odd|(([+-]|)(\\d*)n|)" + it + "*(?:([+-]|)" + it + "*(\\d+)|))" + it + "*\\)|)", "i"),
bool: new RegExp("^(?:" + rt + ")$", "i"),
needsContext: new RegExp("^" + it + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + it + "*((?:-\\d)?\\d*)" + it + "*\\)|)(?=[^-]|$)", "i")
}, vt = /^(?:input|select|textarea|button)$/i, mt = /^h\d$/i, yt = /^[^{]+\{\s*\[native \w/, bt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, xt = /[+~]/, wt = /'|\\/g, _t = new RegExp("\\\\([\\da-f]{1,6}" + it + "?|(" + it + ")|.)", "ig"), Et = function(e, t, n) {
var r = "0x" + t - 65536;
return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320);
};
try {
et.apply(G = tt.call(L.childNodes), L.childNodes), G[L.childNodes.length].nodeType;
} catch (kt) {
et = {
apply: G.length ? function(e, t) {
Z.apply(e, tt.call(t));
} : function(e, t) {
for (var n = e.length, r = 0; e[n++] = t[r++]; ) ;
e.length = n - 1;
}
};
}
k = n.support = {}, C = n.isXML = function(e) {
var t = e && (e.ownerDocument || e).documentElement;
return t ? "HTML" !== t.nodeName : !1;
}, M = n.setDocument = function(e) {
var t, n = e ? e.ownerDocument || e : L, r = n.defaultView;
return n !== W && 9 === n.nodeType && n.documentElement ? (W = n, N = n.documentElement, 
O = !C(n), r && r !== r.top && (r.addEventListener ? r.addEventListener("unload", function() {
M();
}, !1) : r.attachEvent && r.attachEvent("onunload", function() {
M();
})), k.attributes = o(function(e) {
return e.className = "i", !e.getAttribute("className");
}), k.getElementsByTagName = o(function(e) {
return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length;
}), k.getElementsByClassName = yt.test(n.getElementsByClassName) && o(function(e) {
return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 
2 === e.getElementsByClassName("i").length;
}), k.getById = o(function(e) {
return N.appendChild(e).id = P, !n.getElementsByName || !n.getElementsByName(P).length;
}), k.getById ? (T.find.ID = function(e, t) {
if (typeof t.getElementById !== V && O) {
var n = t.getElementById(e);
return n && n.parentNode ? [ n ] : [];
}
}, T.filter.ID = function(e) {
var t = e.replace(_t, Et);
return function(e) {
return e.getAttribute("id") === t;
};
}) : (delete T.find.ID, T.filter.ID = function(e) {
var t = e.replace(_t, Et);
return function(e) {
var n = typeof e.getAttributeNode !== V && e.getAttributeNode("id");
return n && n.value === t;
};
}), T.find.TAG = k.getElementsByTagName ? function(e, t) {
return typeof t.getElementsByTagName !== V ? t.getElementsByTagName(e) : void 0;
} : function(e, t) {
var n, r = [], i = 0, o = t.getElementsByTagName(e);
if ("*" === e) {
for (;n = o[i++]; ) 1 === n.nodeType && r.push(n);
return r;
}
return o;
}, T.find.CLASS = k.getElementsByClassName && function(e, t) {
return typeof t.getElementsByClassName !== V && O ? t.getElementsByClassName(e) : void 0;
}, R = [], q = [], (k.qsa = yt.test(n.querySelectorAll)) && (o(function(e) {
e.innerHTML = "<select t=''><option selected=''></option></select>", e.querySelectorAll("[t^='']").length && q.push("[*^$]=" + it + "*(?:''|\"\")"), 
e.querySelectorAll("[selected]").length || q.push("\\[" + it + "*(?:value|" + rt + ")"), 
e.querySelectorAll(":checked").length || q.push(":checked");
}), o(function(e) {
var t = n.createElement("input");
t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && q.push("name" + it + "*[*^$|!~]?="), 
e.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), 
q.push(",.*:");
})), (k.matchesSelector = yt.test(I = N.webkitMatchesSelector || N.mozMatchesSelector || N.oMatchesSelector || N.msMatchesSelector)) && o(function(e) {
k.disconnectedMatch = I.call(e, "div"), I.call(e, "[s!='']:x"), R.push("!=", ut);
}), q = q.length && new RegExp(q.join("|")), R = R.length && new RegExp(R.join("|")), 
t = yt.test(N.compareDocumentPosition), F = t || yt.test(N.contains) ? function(e, t) {
var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
} : function(e, t) {
if (t) for (;t = t.parentNode; ) if (t === e) return !0;
return !1;
}, Y = t ? function(e, t) {
if (e === t) return j = !0, 0;
var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 
1 & r || !k.sortDetached && t.compareDocumentPosition(e) === r ? e === n || e.ownerDocument === L && F(L, e) ? -1 : t === n || t.ownerDocument === L && F(L, t) ? 1 : A ? nt.call(A, e) - nt.call(A, t) : 0 : 4 & r ? -1 : 1);
} : function(e, t) {
if (e === t) return j = !0, 0;
var r, i = 0, o = e.parentNode, a = t.parentNode, u = [ e ], c = [ t ];
if (!o || !a) return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : A ? nt.call(A, e) - nt.call(A, t) : 0;
if (o === a) return s(e, t);
for (r = e; r = r.parentNode; ) u.unshift(r);
for (r = t; r = r.parentNode; ) c.unshift(r);
for (;u[i] === c[i]; ) i++;
return i ? s(u[i], c[i]) : u[i] === L ? -1 : c[i] === L ? 1 : 0;
}, n) : W;
}, n.matches = function(e, t) {
return n(e, null, null, t);
}, n.matchesSelector = function(e, t) {
if ((e.ownerDocument || e) !== W && M(e), t = t.replace(dt, "='$1']"), !(!k.matchesSelector || !O || R && R.test(t) || q && q.test(t))) try {
var r = I.call(e, t);
if (r || k.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r;
} catch (i) {}
return n(t, W, null, [ e ]).length > 0;
}, n.contains = function(e, t) {
return (e.ownerDocument || e) !== W && M(e), F(e, t);
}, n.attr = function(e, n) {
(e.ownerDocument || e) !== W && M(e);
var r = T.attrHandle[n.toLowerCase()], i = r && Q.call(T.attrHandle, n.toLowerCase()) ? r(e, n, !O) : t;
return i !== t ? i : k.attributes || !O ? e.getAttribute(n) : (i = e.getAttributeNode(n)) && i.specified ? i.value : null;
}, n.error = function(e) {
throw new Error("Syntax error, unrecognized expression: " + e);
}, n.uniqueSort = function(e) {
var t, n = [], r = 0, i = 0;
if (j = !k.detectDuplicates, A = !k.sortStable && e.slice(0), e.sort(Y), j) {
for (;t = e[i++]; ) t === e[i] && (r = n.push(i));
for (;r--; ) e.splice(n[r], 1);
}
return A = null, e;
}, S = n.getText = function(e) {
var t, n = "", r = 0, i = e.nodeType;
if (i) {
if (1 === i || 9 === i || 11 === i) {
if ("string" == typeof e.textContent) return e.textContent;
for (e = e.firstChild; e; e = e.nextSibling) n += S(e);
} else if (3 === i || 4 === i) return e.nodeValue;
} else for (;t = e[r++]; ) n += S(t);
return n;
}, T = n.selectors = {
cacheLength: 50,
createPseudo: i,
match: gt,
attrHandle: {},
find: {},
relative: {
">": {
dir: "parentNode",
first: !0
},
" ": {
dir: "parentNode"
},
"+": {
dir: "previousSibling",
first: !0
},
"~": {
dir: "previousSibling"
}
},
preFilter: {
ATTR: function(e) {
return e[1] = e[1].replace(_t, Et), e[3] = (e[4] || e[5] || "").replace(_t, Et), 
"~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
},
CHILD: function(e) {
return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), 
e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]), 
e;
},
PSEUDO: function(e) {
var n, r = !e[5] && e[2];
return gt.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && pt.test(r) && (n = p(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), 
e[2] = r.slice(0, n)), e.slice(0, 3));
}
},
filter: {
TAG: function(e) {
var t = e.replace(_t, Et).toLowerCase();
return "*" === e ? function() {
return !0;
} : function(e) {
return e.nodeName && e.nodeName.toLowerCase() === t;
};
},
CLASS: function(e) {
var t = U[e + " "];
return t || (t = new RegExp("(^|" + it + ")" + e + "(" + it + "|$)")) && U(e, function(e) {
return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== V && e.getAttribute("class") || "");
});
},
ATTR: function(e, t, r) {
return function(i) {
var o = n.attr(i, e);
return null == o ? "!=" === t : t ? (o += "", "=" === t ? o === r : "!=" === t ? o !== r : "^=" === t ? r && 0 === o.indexOf(r) : "*=" === t ? r && o.indexOf(r) > -1 : "$=" === t ? r && o.slice(-r.length) === r : "~=" === t ? (" " + o + " ").indexOf(r) > -1 : "|=" === t ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0;
};
},
CHILD: function(e, t, n, r, i) {
var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
return 1 === r && 0 === i ? function(e) {
return !!e.parentNode;
} : function(t, n, u) {
var c, f, l, d, p, h, g = o !== a ? "nextSibling" : "previousSibling", v = t.parentNode, m = s && t.nodeName.toLowerCase(), y = !u && !s;
if (v) {
if (o) {
for (;g; ) {
for (l = t; l = l[g]; ) if (s ? l.nodeName.toLowerCase() === m : 1 === l.nodeType) return !1;
h = g = "only" === e && !h && "nextSibling";
}
return !0;
}
if (h = [ a ? v.firstChild : v.lastChild ], a && y) {
for (f = v[P] || (v[P] = {}), c = f[e] || [], p = c[0] === H && c[1], d = c[0] === H && c[2], 
l = p && v.childNodes[p]; l = ++p && l && l[g] || (d = p = 0) || h.pop(); ) if (1 === l.nodeType && ++d && l === t) {
f[e] = [ H, p, d ];
break;
}
} else if (y && (c = (t[P] || (t[P] = {}))[e]) && c[0] === H) d = c[1]; else for (;(l = ++p && l && l[g] || (d = p = 0) || h.pop()) && ((s ? l.nodeName.toLowerCase() !== m : 1 !== l.nodeType) || !++d || (y && ((l[P] || (l[P] = {}))[e] = [ H, d ]), 
l !== t)); ) ;
return d -= i, d === r || d % r === 0 && d / r >= 0;
}
};
},
PSEUDO: function(e, t) {
var r, o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
return o[P] ? o(t) : o.length > 1 ? (r = [ e, e, "", t ], T.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, n) {
for (var r, i = o(e, t), a = i.length; a--; ) r = nt.call(e, i[a]), e[r] = !(n[r] = i[a]);
}) : function(e) {
return o(e, 0, r);
}) : o;
}
},
pseudos: {
not: i(function(e) {
var t = [], n = [], r = B(e.replace(ct, "$1"));
return r[P] ? i(function(e, t, n, i) {
for (var o, a = r(e, null, i, []), s = e.length; s--; ) (o = a[s]) && (e[s] = !(t[s] = o));
}) : function(e, i, o) {
return t[0] = e, r(t, null, o, n), !n.pop();
};
}),
has: i(function(e) {
return function(t) {
return n(e, t).length > 0;
};
}),
contains: i(function(e) {
return function(t) {
return (t.textContent || t.innerText || S(t)).indexOf(e) > -1;
};
}),
lang: i(function(e) {
return ht.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(_t, Et).toLowerCase(), 
function(t) {
var n;
do if (n = O ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), 
n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
return !1;
};
}),
target: function(t) {
var n = e.location && e.location.hash;
return n && n.slice(1) === t.id;
},
root: function(e) {
return e === N;
},
focus: function(e) {
return e === W.activeElement && (!W.hasFocus || W.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
},
enabled: function(e) {
return e.disabled === !1;
},
disabled: function(e) {
return e.disabled === !0;
},
checked: function(e) {
var t = e.nodeName.toLowerCase();
return "input" === t && !!e.checked || "option" === t && !!e.selected;
},
selected: function(e) {
return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
},
empty: function(e) {
for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
return !0;
},
parent: function(e) {
return !T.pseudos.empty(e);
},
header: function(e) {
return mt.test(e.nodeName);
},
input: function(e) {
return vt.test(e.nodeName);
},
button: function(e) {
var t = e.nodeName.toLowerCase();
return "input" === t && "button" === e.type || "button" === t;
},
text: function(e) {
var t;
return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
},
first: f(function() {
return [ 0 ];
}),
last: f(function(e, t) {
return [ t - 1 ];
}),
eq: f(function(e, t, n) {
return [ 0 > n ? n + t : n ];
}),
even: f(function(e, t) {
for (var n = 0; t > n; n += 2) e.push(n);
return e;
}),
odd: f(function(e, t) {
for (var n = 1; t > n; n += 2) e.push(n);
return e;
}),
lt: f(function(e, t, n) {
for (var r = 0 > n ? n + t : n; --r >= 0; ) e.push(r);
return e;
}),
gt: f(function(e, t, n) {
for (var r = 0 > n ? n + t : n; ++r < t; ) e.push(r);
return e;
})
}
}, T.pseudos.nth = T.pseudos.eq;
for (E in {
radio: !0,
checkbox: !0,
file: !0,
password: !0,
image: !0
}) T.pseudos[E] = u(E);
for (E in {
submit: !0,
reset: !0
}) T.pseudos[E] = c(E);
return d.prototype = T.filters = T.pseudos, T.setFilters = new d(), B = n.compile = function(e, t) {
var n, r = [], i = [], o = X[e + " "];
if (!o) {
for (t || (t = p(e)), n = t.length; n--; ) o = b(t[n]), o[P] ? r.push(o) : i.push(o);
o = X(e, x(i, r));
}
return o;
}, k.sortStable = P.split("").sort(Y).join("") === P, k.detectDuplicates = !!j, 
M(), k.sortDetached = o(function(e) {
return 1 & e.compareDocumentPosition(W.createElement("div"));
}), o(function(e) {
return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
}) || a("type|href|height|width", function(e, t, n) {
return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
}), k.attributes && o(function(e) {
return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
}) || a("value", function(e, t, n) {
return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue;
}), o(function(e) {
return null == e.getAttribute("disabled");
}) || a(rt, function(e, t, n) {
var r;
return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
}), n;
}(e);
et.find = it, et.expr = it.selectors, et.expr[":"] = et.expr.pseudos, et.unique = it.uniqueSort, 
et.text = it.getText, et.isXMLDoc = it.isXML, et.contains = it.contains;
var ot = et.expr.match.needsContext, at = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, st = /^.[^:#\[\.,]*$/;
et.filter = function(e, t, n) {
var r = t[0];
return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? et.find.matchesSelector(r, e) ? [ r ] : [] : et.find.matches(e, et.grep(t, function(e) {
return 1 === e.nodeType;
}));
}, et.fn.extend({
find: function(e) {
var t, n = this.length, r = [], i = this;
if ("string" != typeof e) return this.pushStack(et(e).filter(function() {
for (t = 0; n > t; t++) if (et.contains(i[t], this)) return !0;
}));
for (t = 0; n > t; t++) et.find(e, i[t], r);
return r = this.pushStack(n > 1 ? et.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, 
r;
},
filter: function(e) {
return this.pushStack(r(this, e || [], !1));
},
not: function(e) {
return this.pushStack(r(this, e || [], !0));
},
is: function(e) {
return !!r(this, "string" == typeof e && ot.test(e) ? et(e) : e || [], !1).length;
}
});
var ut, ct = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ft = et.fn.init = function(e, n) {
var r, i;
if (!e) return this;
if ("string" == typeof e) {
if (r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [ null, e, null ] : ct.exec(e), 
!r || !r[1] && n) return !n || n.jquery ? (n || ut).find(e) : this.constructor(n).find(e);
if (r[1]) {
if (n = n instanceof et ? n[0] : n, et.merge(this, et.parseHTML(r[1], n && n.nodeType ? n.ownerDocument || n : J, !0)), 
at.test(r[1]) && et.isPlainObject(n)) for (r in n) et.isFunction(this[r]) ? this[r](n[r]) : this.attr(r, n[r]);
return this;
}
return i = J.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), 
this.context = J, this.selector = e, this;
}
return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : et.isFunction(e) ? "undefined" != typeof ut.ready ? ut.ready(e) : e(et) : (e.selector !== t && (this.selector = e.selector, 
this.context = e.context), et.makeArray(e, this));
};
ft.prototype = et.fn, ut = et(J);
var lt = /^(?:parents|prev(?:Until|All))/, dt = {
children: !0,
contents: !0,
next: !0,
prev: !0
};
et.extend({
dir: function(e, n, r) {
for (var i = [], o = r !== t; (e = e[n]) && 9 !== e.nodeType; ) if (1 === e.nodeType) {
if (o && et(e).is(r)) break;
i.push(e);
}
return i;
},
sibling: function(e, t) {
for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
return n;
}
}), et.fn.extend({
has: function(e) {
var t = et(e, this), n = t.length;
return this.filter(function() {
for (var e = 0; n > e; e++) if (et.contains(this, t[e])) return !0;
});
},
closest: function(e, t) {
for (var n, r = 0, i = this.length, o = [], a = ot.test(e) || "string" != typeof e ? et(e, t || this.context) : 0; i > r; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && et.find.matchesSelector(n, e))) {
o.push(n);
break;
}
return this.pushStack(o.length > 1 ? et.unique(o) : o);
},
index: function(e) {
return e ? "string" == typeof e ? X.call(et(e), this[0]) : X.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
},
add: function(e, t) {
return this.pushStack(et.unique(et.merge(this.get(), et(e, t))));
},
addBack: function(e) {
return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
}
}), et.each({
parent: function(e) {
var t = e.parentNode;
return t && 11 !== t.nodeType ? t : null;
},
parents: function(e) {
return et.dir(e, "parentNode");
},
parentsUntil: function(e, t, n) {
return et.dir(e, "parentNode", n);
},
next: function(e) {
return i(e, "nextSibling");
},
prev: function(e) {
return i(e, "previousSibling");
},
nextAll: function(e) {
return et.dir(e, "nextSibling");
},
prevAll: function(e) {
return et.dir(e, "previousSibling");
},
nextUntil: function(e, t, n) {
return et.dir(e, "nextSibling", n);
},
prevUntil: function(e, t, n) {
return et.dir(e, "previousSibling", n);
},
siblings: function(e) {
return et.sibling((e.parentNode || {}).firstChild, e);
},
children: function(e) {
return et.sibling(e.firstChild);
},
contents: function(e) {
return e.contentDocument || et.merge([], e.childNodes);
}
}, function(e, t) {
et.fn[e] = function(n, r) {
var i = et.map(this, t, n);
return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = et.filter(r, i)), 
this.length > 1 && (dt[e] || et.unique(i), lt.test(e) && i.reverse()), this.pushStack(i);
};
});
var pt = /\S+/g, ht = {};
et.Callbacks = function(e) {
e = "string" == typeof e ? ht[e] || o(e) : et.extend({}, e);
var n, r, i, a, s, u, c = [], f = !e.once && [], l = function(t) {
for (n = e.memory && t, r = !0, u = a || 0, a = 0, s = c.length, i = !0; c && s > u; u++) if (c[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
n = !1;
break;
}
i = !1, c && (f ? f.length && l(f.shift()) : n ? c = [] : d.disable());
}, d = {
add: function() {
if (c) {
var t = c.length;
!function r(t) {
et.each(t, function(t, n) {
var i = et.type(n);
"function" === i ? e.unique && d.has(n) || c.push(n) : n && n.length && "string" !== i && r(n);
});
}(arguments), i ? s = c.length : n && (a = t, l(n));
}
return this;
},
remove: function() {
return c && et.each(arguments, function(e, t) {
for (var n; (n = et.inArray(t, c, n)) > -1; ) c.splice(n, 1), i && (s >= n && s--, 
u >= n && u--);
}), this;
},
has: function(e) {
return e ? et.inArray(e, c) > -1 : !(!c || !c.length);
},
empty: function() {
return c = [], s = 0, this;
},
disable: function() {
return c = f = n = t, this;
},
disabled: function() {
return !c;
},
lock: function() {
return f = t, n || d.disable(), this;
},
locked: function() {
return !f;
},
fireWith: function(e, t) {
return !c || r && !f || (t = t || [], t = [ e, t.slice ? t.slice() : t ], i ? f.push(t) : l(t)), 
this;
},
fire: function() {
return d.fireWith(this, arguments), this;
},
fired: function() {
return !!r;
}
};
return d;
}, et.extend({
Deferred: function(e) {
var t = [ [ "resolve", "done", et.Callbacks("once memory"), "resolved" ], [ "reject", "fail", et.Callbacks("once memory"), "rejected" ], [ "notify", "progress", et.Callbacks("memory") ] ], n = "pending", r = {
state: function() {
return n;
},
always: function() {
return i.done(arguments).fail(arguments), this;
},
then: function() {
var e = arguments;
return et.Deferred(function(n) {
et.each(t, function(t, o) {
var a = et.isFunction(e[t]) && e[t];
i[o[1]](function() {
var e = a && a.apply(this, arguments);
e && et.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [ e ] : arguments);
});
}), e = null;
}).promise();
},
promise: function(e) {
return null != e ? et.extend(e, r) : r;
}
}, i = {};
return r.pipe = r.then, et.each(t, function(e, o) {
var a = o[2], s = o[3];
r[o[1]] = a.add, s && a.add(function() {
n = s;
}, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
return i[o[0] + "With"](this === i ? r : this, arguments), this;
}, i[o[0] + "With"] = a.fireWith;
}), r.promise(i), e && e.call(i, i), i;
},
when: function(e) {
var t, n, r, i = 0, o = z.call(arguments), a = o.length, s = 1 !== a || e && et.isFunction(e.promise) ? a : 0, u = 1 === s ? e : et.Deferred(), c = function(e, n, r) {
return function(i) {
n[e] = this, r[e] = arguments.length > 1 ? z.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r);
};
};
if (a > 1) for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++) o[i] && et.isFunction(o[i].promise) ? o[i].promise().done(c(i, r, o)).fail(u.reject).progress(c(i, n, t)) : --s;
return s || u.resolveWith(r, o), u.promise();
}
});
var gt;
et.fn.ready = function(e) {
return et.ready.promise().done(e), this;
}, et.extend({
isReady: !1,
readyWait: 1,
holdReady: function(e) {
e ? et.readyWait++ : et.ready(!0);
},
ready: function(e) {
(e === !0 ? --et.readyWait : et.isReady) || (et.isReady = !0, e !== !0 && --et.readyWait > 0 || (gt.resolveWith(J, [ et ]), 
et.fn.trigger && et(J).trigger("ready").off("ready")));
}
}), et.ready.promise = function(t) {
return gt || (gt = et.Deferred(), "complete" === J.readyState ? setTimeout(et.ready) : (J.addEventListener("DOMContentLoaded", a, !1), 
e.addEventListener("load", a, !1))), gt.promise(t);
}, et.ready.promise();
var vt = et.access = function(e, n, r, i, o, a, s) {
var u = 0, c = e.length, f = null == r;
if ("object" === et.type(r)) {
o = !0;
for (u in r) et.access(e, n, u, r[u], !0, a, s);
} else if (i !== t && (o = !0, et.isFunction(i) || (s = !0), f && (s ? (n.call(e, i), 
n = null) : (f = n, n = function(e, t, n) {
return f.call(et(e), n);
})), n)) for (;c > u; u++) n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r)));
return o ? e : f ? n.call(e) : c ? n(e[0], r) : a;
};
et.acceptData = function(e) {
return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
}, s.uid = 1, s.accepts = et.acceptData, s.prototype = {
key: function(e) {
if (!s.accepts(e)) return 0;
var t = {}, n = e[this.expando];
if (!n) {
n = s.uid++;
try {
t[this.expando] = {
value: n
}, Object.defineProperties(e, t);
} catch (r) {
t[this.expando] = n, et.extend(e, t);
}
}
return this.cache[n] || (this.cache[n] = {}), n;
},
set: function(e, t, n) {
var r, i = this.key(e), o = this.cache[i];
if ("string" == typeof t) o[t] = n; else if (et.isEmptyObject(o)) et.extend(this.cache[i], t); else for (r in t) o[r] = t[r];
return o;
},
get: function(e, n) {
var r = this.cache[this.key(e)];
return n === t ? r : r[n];
},
access: function(e, n, r) {
var i;
return n === t || n && "string" == typeof n && r === t ? (i = this.get(e, n), i !== t ? i : this.get(e, et.camelCase(n))) : (this.set(e, n, r), 
r !== t ? r : n);
},
remove: function(e, n) {
var r, i, o, a = this.key(e), s = this.cache[a];
if (n === t) this.cache[a] = {}; else {
et.isArray(n) ? i = n.concat(n.map(et.camelCase)) : (o = et.camelCase(n), n in s ? i = [ n, o ] : (i = o, 
i = i in s ? [ i ] : i.match(pt) || [])), r = i.length;
for (;r--; ) delete s[i[r]];
}
},
hasData: function(e) {
return !et.isEmptyObject(this.cache[e[this.expando]] || {});
},
discard: function(e) {
e[this.expando] && delete this.cache[e[this.expando]];
}
};
var mt = new s(), yt = new s(), bt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, xt = /([A-Z])/g;
et.extend({
hasData: function(e) {
return yt.hasData(e) || mt.hasData(e);
},
data: function(e, t, n) {
return yt.access(e, t, n);
},
removeData: function(e, t) {
yt.remove(e, t);
},
_data: function(e, t, n) {
return mt.access(e, t, n);
},
_removeData: function(e, t) {
mt.remove(e, t);
}
}), et.fn.extend({
data: function(e, n) {
var r, i, o, a = this[0], s = a && a.attributes;
if (e === t) {
if (this.length && (o = yt.get(a), 1 === a.nodeType && !mt.get(a, "hasDataAttrs"))) {
for (r = s.length; r--; ) i = s[r].name, 0 === i.indexOf("data-") && (i = et.camelCase(i.slice(5)), 
u(a, i, o[i]));
mt.set(a, "hasDataAttrs", !0);
}
return o;
}
return "object" == typeof e ? this.each(function() {
yt.set(this, e);
}) : vt(this, function(n) {
var r, i = et.camelCase(e);
if (a && n === t) {
if (r = yt.get(a, e), r !== t) return r;
if (r = yt.get(a, i), r !== t) return r;
if (r = u(a, i, t), r !== t) return r;
} else this.each(function() {
var r = yt.get(this, i);
yt.set(this, i, n), -1 !== e.indexOf("-") && r !== t && yt.set(this, e, n);
});
}, null, n, arguments.length > 1, null, !0);
},
removeData: function(e) {
return this.each(function() {
yt.remove(this, e);
});
}
}), et.extend({
queue: function(e, t, n) {
var r;
return e ? (t = (t || "fx") + "queue", r = mt.get(e, t), n && (!r || et.isArray(n) ? r = mt.access(e, t, et.makeArray(n)) : r.push(n)), 
r || []) : void 0;
},
dequeue: function(e, t) {
t = t || "fx";
var n = et.queue(e, t), r = n.length, i = n.shift(), o = et._queueHooks(e, t), a = function() {
et.dequeue(e, t);
};
"inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), 
delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire();
},
_queueHooks: function(e, t) {
var n = t + "queueHooks";
return mt.get(e, n) || mt.access(e, n, {
empty: et.Callbacks("once memory").add(function() {
mt.remove(e, [ t + "queue", n ]);
})
});
}
}), et.fn.extend({
queue: function(e, n) {
var r = 2;
return "string" != typeof e && (n = e, e = "fx", r--), arguments.length < r ? et.queue(this[0], e) : n === t ? this : this.each(function() {
var t = et.queue(this, e, n);
et._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && et.dequeue(this, e);
});
},
dequeue: function(e) {
return this.each(function() {
et.dequeue(this, e);
});
},
clearQueue: function(e) {
return this.queue(e || "fx", []);
},
promise: function(e, n) {
var r, i = 1, o = et.Deferred(), a = this, s = this.length, u = function() {
--i || o.resolveWith(a, [ a ]);
};
for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--; ) r = mt.get(a[s], e + "queueHooks"), 
r && r.empty && (i++, r.empty.add(u));
return u(), o.promise(n);
}
});
var wt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, _t = [ "Top", "Right", "Bottom", "Left" ], Et = function(e, t) {
return e = t || e, "none" === et.css(e, "display") || !et.contains(e.ownerDocument, e);
}, kt = /^(?:checkbox|radio)$/i;
!function() {
var e = J.createDocumentFragment(), t = e.appendChild(J.createElement("div"));
t.innerHTML = "<input type='radio' checked='checked' name='t'/>", G.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, 
t.innerHTML = "<textarea>x</textarea>", G.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue;
}();
var Tt = typeof t;
G.focusinBubbles = "onfocusin" in e;
var St = /^key/, Ct = /^(?:mouse|contextmenu)|click/, Bt = /^(?:focusinfocus|focusoutblur)$/, Dt = /^([^.]*)(?:\.(.+)|)$/;
et.event = {
global: {},
add: function(e, n, r, i, o) {
var a, s, u, c, f, l, d, p, h, g, v, m = mt.get(e);
if (m) for (r.handler && (a = r, r = a.handler, o = a.selector), r.guid || (r.guid = et.guid++), 
(c = m.events) || (c = m.events = {}), (s = m.handle) || (s = m.handle = function(n) {
return typeof et !== Tt && et.event.triggered !== n.type ? et.event.dispatch.apply(e, arguments) : t;
}), n = (n || "").match(pt) || [ "" ], f = n.length; f--; ) u = Dt.exec(n[f]) || [], 
h = v = u[1], g = (u[2] || "").split(".").sort(), h && (d = et.event.special[h] || {}, 
h = (o ? d.delegateType : d.bindType) || h, d = et.event.special[h] || {}, l = et.extend({
type: h,
origType: v,
data: i,
handler: r,
guid: r.guid,
selector: o,
needsContext: o && et.expr.match.needsContext.test(o),
namespace: g.join(".")
}, a), (p = c[h]) || (p = c[h] = [], p.delegateCount = 0, d.setup && d.setup.call(e, i, g, s) !== !1 || e.addEventListener && e.addEventListener(h, s, !1)), 
d.add && (d.add.call(e, l), l.handler.guid || (l.handler.guid = r.guid)), o ? p.splice(p.delegateCount++, 0, l) : p.push(l), 
et.event.global[h] = !0);
},
remove: function(e, t, n, r, i) {
var o, a, s, u, c, f, l, d, p, h, g, v = mt.hasData(e) && mt.get(e);
if (v && (u = v.events)) {
for (t = (t || "").match(pt) || [ "" ], c = t.length; c--; ) if (s = Dt.exec(t[c]) || [], 
p = g = s[1], h = (s[2] || "").split(".").sort(), p) {
for (l = et.event.special[p] || {}, p = (r ? l.delegateType : l.bindType) || p, 
d = u[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
a = o = d.length; o--; ) f = d[o], !i && g !== f.origType || n && n.guid !== f.guid || s && !s.test(f.namespace) || r && r !== f.selector && ("**" !== r || !f.selector) || (d.splice(o, 1), 
f.selector && d.delegateCount--, l.remove && l.remove.call(e, f));
a && !d.length && (l.teardown && l.teardown.call(e, h, v.handle) !== !1 || et.removeEvent(e, p, v.handle), 
delete u[p]);
} else for (p in u) et.event.remove(e, p + t[c], n, r, !0);
et.isEmptyObject(u) && (delete v.handle, mt.remove(e, "events"));
}
},
trigger: function(n, r, i, o) {
var a, s, u, c, f, l, d, p = [ i || J ], h = K.call(n, "type") ? n.type : n, g = K.call(n, "namespace") ? n.namespace.split(".") : [];
if (s = u = i = i || J, 3 !== i.nodeType && 8 !== i.nodeType && !Bt.test(h + et.event.triggered) && (h.indexOf(".") >= 0 && (g = h.split("."), 
h = g.shift(), g.sort()), f = h.indexOf(":") < 0 && "on" + h, n = n[et.expando] ? n : new et.Event(h, "object" == typeof n && n), 
n.isTrigger = o ? 2 : 3, n.namespace = g.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
n.result = t, n.target || (n.target = i), r = null == r ? [ n ] : et.makeArray(r, [ n ]), 
d = et.event.special[h] || {}, o || !d.trigger || d.trigger.apply(i, r) !== !1)) {
if (!o && !d.noBubble && !et.isWindow(i)) {
for (c = d.delegateType || h, Bt.test(c + h) || (s = s.parentNode); s; s = s.parentNode) p.push(s), 
u = s;
u === (i.ownerDocument || J) && p.push(u.defaultView || u.parentWindow || e);
}
for (a = 0; (s = p[a++]) && !n.isPropagationStopped(); ) n.type = a > 1 ? c : d.bindType || h, 
l = (mt.get(s, "events") || {})[n.type] && mt.get(s, "handle"), l && l.apply(s, r), 
l = f && s[f], l && l.apply && et.acceptData(s) && (n.result = l.apply(s, r), n.result === !1 && n.preventDefault());
return n.type = h, o || n.isDefaultPrevented() || d._default && d._default.apply(p.pop(), r) !== !1 || !et.acceptData(i) || f && et.isFunction(i[h]) && !et.isWindow(i) && (u = i[f], 
u && (i[f] = null), et.event.triggered = h, i[h](), et.event.triggered = t, u && (i[f] = u)), 
n.result;
}
},
dispatch: function(e) {
e = et.event.fix(e);
var n, r, i, o, a, s = [], u = z.call(arguments), c = (mt.get(this, "events") || {})[e.type] || [], f = et.event.special[e.type] || {};
if (u[0] = e, e.delegateTarget = this, !f.preDispatch || f.preDispatch.call(this, e) !== !1) {
for (s = et.event.handlers.call(this, e, c), n = 0; (o = s[n++]) && !e.isPropagationStopped(); ) for (e.currentTarget = o.elem, 
r = 0; (a = o.handlers[r++]) && !e.isImmediatePropagationStopped(); ) (!e.namespace_re || e.namespace_re.test(a.namespace)) && (e.handleObj = a, 
e.data = a.data, i = ((et.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, u), 
i !== t && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
return f.postDispatch && f.postDispatch.call(this, e), e.result;
}
},
handlers: function(e, n) {
var r, i, o, a, s = [], u = n.delegateCount, c = e.target;
if (u && c.nodeType && (!e.button || "click" !== e.type)) for (;c !== this; c = c.parentNode || this) if (c.disabled !== !0 || "click" !== e.type) {
for (i = [], r = 0; u > r; r++) a = n[r], o = a.selector + " ", i[o] === t && (i[o] = a.needsContext ? et(o, this).index(c) >= 0 : et.find(o, this, null, [ c ]).length), 
i[o] && i.push(a);
i.length && s.push({
elem: c,
handlers: i
});
}
return u < n.length && s.push({
elem: this,
handlers: n.slice(u)
}), s;
},
props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
fixHooks: {},
keyHooks: {
props: "char charCode key keyCode".split(" "),
filter: function(e, t) {
return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), 
e;
}
},
mouseHooks: {
props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
filter: function(e, n) {
var r, i, o, a = n.button;
return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || J, 
i = r.documentElement, o = r.body, e.pageX = n.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), 
e.pageY = n.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)), 
e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e;
}
},
fix: function(e) {
if (e[et.expando]) return e;
var t, n, r, i = e.type, o = e, a = this.fixHooks[i];
for (a || (this.fixHooks[i] = a = Ct.test(i) ? this.mouseHooks : St.test(i) ? this.keyHooks : {}), 
r = a.props ? this.props.concat(a.props) : this.props, e = new et.Event(o), t = r.length; t--; ) n = r[t], 
e[n] = o[n];
return e.target || (e.target = J), 3 === e.target.nodeType && (e.target = e.target.parentNode), 
a.filter ? a.filter(e, o) : e;
},
special: {
load: {
noBubble: !0
},
focus: {
trigger: function() {
return this !== l() && this.focus ? (this.focus(), !1) : void 0;
},
delegateType: "focusin"
},
blur: {
trigger: function() {
return this === l() && this.blur ? (this.blur(), !1) : void 0;
},
delegateType: "focusout"
},
click: {
trigger: function() {
return "checkbox" === this.type && this.click && et.nodeName(this, "input") ? (this.click(), 
!1) : void 0;
},
_default: function(e) {
return et.nodeName(e.target, "a");
}
},
beforeunload: {
postDispatch: function(e) {
e.result !== t && (e.originalEvent.returnValue = e.result);
}
}
},
simulate: function(e, t, n, r) {
var i = et.extend(new et.Event(), n, {
type: e,
isSimulated: !0,
originalEvent: {}
});
r ? et.event.trigger(i, null, t) : et.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
}
}, et.removeEvent = function(e, t, n) {
e.removeEventListener && e.removeEventListener(t, n, !1);
}, et.Event = function(e, n) {
return this instanceof et.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, 
this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === t && e.getPreventDefault && e.getPreventDefault() ? c : f) : this.type = e, 
n && et.extend(this, n), this.timeStamp = e && e.timeStamp || et.now(), void (this[et.expando] = !0)) : new et.Event(e, n);
}, et.Event.prototype = {
isDefaultPrevented: f,
isPropagationStopped: f,
isImmediatePropagationStopped: f,
preventDefault: function() {
var e = this.originalEvent;
this.isDefaultPrevented = c, e && e.preventDefault && e.preventDefault();
},
stopPropagation: function() {
var e = this.originalEvent;
this.isPropagationStopped = c, e && e.stopPropagation && e.stopPropagation();
},
stopImmediatePropagation: function() {
this.isImmediatePropagationStopped = c, this.stopPropagation();
}
}, et.each({
mouseenter: "mouseover",
mouseleave: "mouseout"
}, function(e, t) {
et.event.special[e] = {
delegateType: t,
bindType: t,
handle: function(e) {
var n, r = this, i = e.relatedTarget, o = e.handleObj;
return (!i || i !== r && !et.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), 
e.type = t), n;
}
};
}), G.focusinBubbles || et.each({
focus: "focusin",
blur: "focusout"
}, function(e, t) {
var n = function(e) {
et.event.simulate(t, e.target, et.event.fix(e), !0);
};
et.event.special[t] = {
setup: function() {
var r = this.ownerDocument || this, i = mt.access(r, t);
i || r.addEventListener(e, n, !0), mt.access(r, t, (i || 0) + 1);
},
teardown: function() {
var r = this.ownerDocument || this, i = mt.access(r, t) - 1;
i ? mt.access(r, t, i) : (r.removeEventListener(e, n, !0), mt.remove(r, t));
}
};
}), et.fn.extend({
on: function(e, n, r, i, o) {
var a, s;
if ("object" == typeof e) {
"string" != typeof n && (r = r || n, n = t);
for (s in e) this.on(s, n, r, e[s], o);
return this;
}
if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, 
r = t) : (i = r, r = n, n = t)), i === !1) i = f; else if (!i) return this;
return 1 === o && (a = i, i = function(e) {
return et().off(e), a.apply(this, arguments);
}, i.guid = a.guid || (a.guid = et.guid++)), this.each(function() {
et.event.add(this, e, i, r, n);
});
},
one: function(e, t, n, r) {
return this.on(e, t, n, r, 1);
},
off: function(e, n, r) {
var i, o;
if (e && e.preventDefault && e.handleObj) return i = e.handleObj, et(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), 
this;
if ("object" == typeof e) {
for (o in e) this.off(o, n, e[o]);
return this;
}
return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = f), 
this.each(function() {
et.event.remove(this, e, r, n);
});
},
trigger: function(e, t) {
return this.each(function() {
et.event.trigger(e, t, this);
});
},
triggerHandler: function(e, t) {
var n = this[0];
return n ? et.event.trigger(e, t, n, !0) : void 0;
}
});
var At = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, jt = /<([\w:]+)/, Mt = /<|&#?\w+;/, Wt = /<(?:script|style|link)/i, Nt = /checked\s*(?:[^=]|=\s*.checked.)/i, Ot = /^$|\/(?:java|ecma)script/i, qt = /^true\/(.*)/, Rt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, It = {
option: [ 1, "<select multiple='multiple'>", "</select>" ],
thead: [ 1, "<table>", "</table>" ],
col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
tr: [ 2, "<table><tbody>", "</tbody></table>" ],
td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
_default: [ 0, "", "" ]
};
It.optgroup = It.option, It.tbody = It.tfoot = It.colgroup = It.caption = It.thead, 
It.th = It.td, et.extend({
clone: function(e, t, n) {
var r, i, o, a, s = e.cloneNode(!0), u = et.contains(e.ownerDocument, e);
if (!(G.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || et.isXMLDoc(e))) for (a = m(s), 
o = m(e), r = 0, i = o.length; i > r; r++) y(o[r], a[r]);
if (t) if (n) for (o = o || m(e), a = a || m(s), r = 0, i = o.length; i > r; r++) v(o[r], a[r]); else v(e, s);
return a = m(s, "script"), a.length > 0 && g(a, !u && m(e, "script")), s;
},
buildFragment: function(e, t, n, r) {
for (var i, o, a, s, u, c, f = t.createDocumentFragment(), l = [], d = 0, p = e.length; p > d; d++) if (i = e[d], 
i || 0 === i) if ("object" === et.type(i)) et.merge(l, i.nodeType ? [ i ] : i); else if (Mt.test(i)) {
for (o = o || f.appendChild(t.createElement("div")), a = (jt.exec(i) || [ "", "" ])[1].toLowerCase(), 
s = It[a] || It._default, o.innerHTML = s[1] + i.replace(At, "<$1></$2>") + s[2], 
c = s[0]; c--; ) o = o.lastChild;
et.merge(l, o.childNodes), o = f.firstChild, o.textContent = "";
} else l.push(t.createTextNode(i));
for (f.textContent = "", d = 0; i = l[d++]; ) if ((!r || -1 === et.inArray(i, r)) && (u = et.contains(i.ownerDocument, i), 
o = m(f.appendChild(i), "script"), u && g(o), n)) for (c = 0; i = o[c++]; ) Ot.test(i.type || "") && n.push(i);
return f;
},
cleanData: function(e) {
for (var n, r, i, o, a, s, u = et.event.special, c = 0; (r = e[c]) !== t; c++) {
if (et.acceptData(r) && (a = r[mt.expando], a && (n = mt.cache[a]))) {
if (i = Object.keys(n.events || {}), i.length) for (s = 0; (o = i[s]) !== t; s++) u[o] ? et.event.remove(r, o) : et.removeEvent(r, o, n.handle);
mt.cache[a] && delete mt.cache[a];
}
delete yt.cache[r[yt.expando]];
}
}
}), et.fn.extend({
text: function(e) {
return vt(this, function(e) {
return e === t ? et.text(this) : this.empty().each(function() {
(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e);
});
}, null, e, arguments.length);
},
append: function() {
return this.domManip(arguments, function(e) {
if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
var t = d(this, e);
t.appendChild(e);
}
});
},
prepend: function() {
return this.domManip(arguments, function(e) {
if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
var t = d(this, e);
t.insertBefore(e, t.firstChild);
}
});
},
before: function() {
return this.domManip(arguments, function(e) {
this.parentNode && this.parentNode.insertBefore(e, this);
});
},
after: function() {
return this.domManip(arguments, function(e) {
this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
});
},
remove: function(e, t) {
for (var n, r = e ? et.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || et.cleanData(m(n)), 
n.parentNode && (t && et.contains(n.ownerDocument, n) && g(m(n, "script")), n.parentNode.removeChild(n));
return this;
},
empty: function() {
for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (et.cleanData(m(e, !1)), 
e.textContent = "");
return this;
},
clone: function(e, t) {
return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
return et.clone(this, e, t);
});
},
html: function(e) {
return vt(this, function(e) {
var n = this[0] || {}, r = 0, i = this.length;
if (e === t && 1 === n.nodeType) return n.innerHTML;
if ("string" == typeof e && !Wt.test(e) && !It[(jt.exec(e) || [ "", "" ])[1].toLowerCase()]) {
e = e.replace(At, "<$1></$2>");
try {
for (;i > r; r++) n = this[r] || {}, 1 === n.nodeType && (et.cleanData(m(n, !1)), 
n.innerHTML = e);
n = 0;
} catch (o) {}
}
n && this.empty().append(e);
}, null, e, arguments.length);
},
replaceWith: function() {
var e = arguments[0];
return this.domManip(arguments, function(t) {
e = this.parentNode, et.cleanData(m(this)), e && e.replaceChild(t, this);
}), e && (e.length || e.nodeType) ? this : this.remove();
},
detach: function(e) {
return this.remove(e, !0);
},
domManip: function(e, t) {
e = U.apply([], e);
var n, r, i, o, a, s, u = 0, c = this.length, f = this, l = c - 1, d = e[0], g = et.isFunction(d);
if (g || c > 1 && "string" == typeof d && !G.checkClone && Nt.test(d)) return this.each(function(n) {
var r = f.eq(n);
g && (e[0] = d.call(this, n, r.html())), r.domManip(e, t);
});
if (c && (n = et.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, 
1 === n.childNodes.length && (n = r), r)) {
for (i = et.map(m(n, "script"), p), o = i.length; c > u; u++) a = n, u !== l && (a = et.clone(a, !0, !0), 
o && et.merge(i, m(a, "script"))), t.call(this[u], a, u);
if (o) for (s = i[i.length - 1].ownerDocument, et.map(i, h), u = 0; o > u; u++) a = i[u], 
Ot.test(a.type || "") && !mt.access(a, "globalEval") && et.contains(s, a) && (a.src ? et._evalUrl && et._evalUrl(a.src) : et.globalEval(a.textContent.replace(Rt, "")));
}
return this;
}
}), et.each({
appendTo: "append",
prependTo: "prepend",
insertBefore: "before",
insertAfter: "after",
replaceAll: "replaceWith"
}, function(e, t) {
et.fn[e] = function(e) {
for (var n, r = [], i = et(e), o = i.length - 1, a = 0; o >= a; a++) n = a === o ? this : this.clone(!0), 
et(i[a])[t](n), $.apply(r, n.get());
return this.pushStack(r);
};
});
var Ft, Pt = {}, Lt = /^margin/, Ht = new RegExp("^(" + wt + ")(?!px)[a-z%]+$", "i"), zt = function(e) {
return e.ownerDocument.defaultView.getComputedStyle(e, null);
};
!function() {
function t() {
s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", 
o.appendChild(a);
var t = e.getComputedStyle(s, null);
n = "1%" !== t.top, r = "4px" === t.width, o.removeChild(a);
}
var n, r, i = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", o = J.documentElement, a = J.createElement("div"), s = J.createElement("div");
s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", 
G.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
a.appendChild(s), e.getComputedStyle && et.extend(G, {
pixelPosition: function() {
return t(), n;
},
boxSizingReliable: function() {
return null == r && t(), r;
},
reliableMarginRight: function() {
var t, n = s.appendChild(J.createElement("div"));
return n.style.cssText = s.style.cssText = i, n.style.marginRight = n.style.width = "0", 
s.style.width = "1px", o.appendChild(a), t = !parseFloat(e.getComputedStyle(n, null).marginRight), 
o.removeChild(a), s.innerHTML = "", t;
}
});
}(), et.swap = function(e, t, n, r) {
var i, o, a = {};
for (o in t) a[o] = e.style[o], e.style[o] = t[o];
i = n.apply(e, r || []);
for (o in t) e.style[o] = a[o];
return i;
};
var Ut = /^(none|table(?!-c[ea]).+)/, $t = new RegExp("^(" + wt + ")(.*)$", "i"), Xt = new RegExp("^([+-])=(" + wt + ")", "i"), Yt = {
position: "absolute",
visibility: "hidden",
display: "block"
}, Vt = {
letterSpacing: 0,
fontWeight: 400
}, Kt = [ "Webkit", "O", "Moz", "ms" ];
et.extend({
cssHooks: {
opacity: {
get: function(e, t) {
if (t) {
var n = w(e, "opacity");
return "" === n ? "1" : n;
}
}
}
},
cssNumber: {
columnCount: !0,
fillOpacity: !0,
fontWeight: !0,
lineHeight: !0,
opacity: !0,
order: !0,
orphans: !0,
widows: !0,
zIndex: !0,
zoom: !0
},
cssProps: {
"float": "cssFloat"
},
style: function(e, n, r, i) {
if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
var o, a, s, u = et.camelCase(n), c = e.style;
return n = et.cssProps[u] || (et.cssProps[u] = E(c, u)), s = et.cssHooks[n] || et.cssHooks[u], 
r === t ? s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : c[n] : (a = typeof r, 
"string" === a && (o = Xt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(et.css(e, n)), 
a = "number"), null != r && r === r && ("number" !== a || et.cssNumber[u] || (r += "px"), 
G.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (c[n] = "inherit"), 
s && "set" in s && (r = s.set(e, r, i)) === t || (c[n] = "", c[n] = r)), void 0);
}
},
css: function(e, n, r, i) {
var o, a, s, u = et.camelCase(n);
return n = et.cssProps[u] || (et.cssProps[u] = E(e.style, u)), s = et.cssHooks[n] || et.cssHooks[u], 
s && "get" in s && (o = s.get(e, !0, r)), o === t && (o = w(e, n, i)), "normal" === o && n in Vt && (o = Vt[n]), 
"" === r || r ? (a = parseFloat(o), r === !0 || et.isNumeric(a) ? a || 0 : o) : o;
}
}), et.each([ "height", "width" ], function(e, t) {
et.cssHooks[t] = {
get: function(e, n, r) {
return n ? 0 === e.offsetWidth && Ut.test(et.css(e, "display")) ? et.swap(e, Yt, function() {
return S(e, t, r);
}) : S(e, t, r) : void 0;
},
set: function(e, n, r) {
var i = r && zt(e);
return k(e, n, r ? T(e, t, r, "border-box" === et.css(e, "boxSizing", !1, i), i) : 0);
}
};
}), et.cssHooks.marginRight = _(G.reliableMarginRight, function(e, t) {
return t ? et.swap(e, {
display: "inline-block"
}, w, [ e, "marginRight" ]) : void 0;
}), et.each({
margin: "",
padding: "",
border: "Width"
}, function(e, t) {
et.cssHooks[e + t] = {
expand: function(n) {
for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [ n ]; 4 > r; r++) i[e + _t[r] + t] = o[r] || o[r - 2] || o[0];
return i;
}
}, Lt.test(e) || (et.cssHooks[e + t].set = k);
}), et.fn.extend({
css: function(e, n) {
return vt(this, function(e, n, r) {
var i, o, a = {}, s = 0;
if (et.isArray(n)) {
for (i = zt(e), o = n.length; o > s; s++) a[n[s]] = et.css(e, n[s], !1, i);
return a;
}
return r !== t ? et.style(e, n, r) : et.css(e, n);
}, e, n, arguments.length > 1);
},
show: function() {
return C(this, !0);
},
hide: function() {
return C(this);
},
toggle: function(e) {
return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
Et(this) ? et(this).show() : et(this).hide();
});
}
}), et.Tween = B, B.prototype = {
constructor: B,
init: function(e, t, n, r, i, o) {
this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), 
this.end = r, this.unit = o || (et.cssNumber[n] ? "" : "px");
},
cur: function() {
var e = B.propHooks[this.prop];
return e && e.get ? e.get(this) : B.propHooks._default.get(this);
},
run: function(e) {
var t, n = B.propHooks[this.prop];
return this.pos = t = this.options.duration ? et.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, 
this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
n && n.set ? n.set(this) : B.propHooks._default.set(this), this;
}
}, B.prototype.init.prototype = B.prototype, B.propHooks = {
_default: {
get: function(e) {
var t;
return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = et.css(e.elem, e.prop, ""), 
t && "auto" !== t ? t : 0) : e.elem[e.prop];
},
set: function(e) {
et.fx.step[e.prop] ? et.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[et.cssProps[e.prop]] || et.cssHooks[e.prop]) ? et.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
}
}
}, B.propHooks.scrollTop = B.propHooks.scrollLeft = {
set: function(e) {
e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
}
}, et.easing = {
linear: function(e) {
return e;
},
swing: function(e) {
return .5 - Math.cos(e * Math.PI) / 2;
}
}, et.fx = B.prototype.init, et.fx.step = {};
var Qt, Gt, Jt = /^(?:toggle|show|hide)$/, Zt = new RegExp("^(?:([+-])=|)(" + wt + ")([a-z%]*)$", "i"), en = /queueHooks$/, tn = [ M ], nn = {
"*": [ function(e, t) {
var n = this.createTween(e, t), r = n.cur(), i = Zt.exec(t), o = i && i[3] || (et.cssNumber[e] ? "" : "px"), a = (et.cssNumber[e] || "px" !== o && +r) && Zt.exec(et.css(n.elem, e)), s = 1, u = 20;
if (a && a[3] !== o) {
o = o || a[3], i = i || [], a = +r || 1;
do s = s || ".5", a /= s, et.style(n.elem, e, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --u);
}
return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), 
n;
} ]
};
et.Animation = et.extend(N, {
tweener: function(e, t) {
et.isFunction(e) ? (t = e, e = [ "*" ]) : e = e.split(" ");
for (var n, r = 0, i = e.length; i > r; r++) n = e[r], nn[n] = nn[n] || [], nn[n].unshift(t);
},
prefilter: function(e, t) {
t ? tn.unshift(e) : tn.push(e);
}
}), et.speed = function(e, t, n) {
var r = e && "object" == typeof e ? et.extend({}, e) : {
complete: n || !n && t || et.isFunction(e) && e,
duration: e,
easing: n && t || t && !et.isFunction(t) && t
};
return r.duration = et.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in et.fx.speeds ? et.fx.speeds[r.duration] : et.fx.speeds._default, 
(null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
et.isFunction(r.old) && r.old.call(this), r.queue && et.dequeue(this, r.queue);
}, r;
}, et.fn.extend({
fadeTo: function(e, t, n, r) {
return this.filter(Et).css("opacity", 0).show().end().animate({
opacity: t
}, e, n, r);
},
animate: function(e, t, n, r) {
var i = et.isEmptyObject(e), o = et.speed(t, n, r), a = function() {
var t = N(this, et.extend({}, e), o);
(i || mt.get(this, "finish")) && t.stop(!0);
};
return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a);
},
stop: function(e, n, r) {
var i = function(e) {
var t = e.stop;
delete e.stop, t(r);
};
return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), 
this.each(function() {
var t = !0, n = null != e && e + "queueHooks", o = et.timers, a = mt.get(this);
if (n) a[n] && a[n].stop && i(a[n]); else for (n in a) a[n] && a[n].stop && en.test(n) && i(a[n]);
for (n = o.length; n--; ) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), 
t = !1, o.splice(n, 1));
(t || !r) && et.dequeue(this, e);
});
},
finish: function(e) {
return e !== !1 && (e = e || "fx"), this.each(function() {
var t, n = mt.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = et.timers, a = r ? r.length : 0;
for (n.finish = !0, et.queue(this, e, []), i && i.stop && i.stop.call(this, !0), 
t = o.length; t--; ) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), 
o.splice(t, 1));
for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
delete n.finish;
});
}
}), et.each([ "toggle", "show", "hide" ], function(e, t) {
var n = et.fn[t];
et.fn[t] = function(e, r, i) {
return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(A(t, !0), e, r, i);
};
}), et.each({
slideDown: A("show"),
slideUp: A("hide"),
slideToggle: A("toggle"),
fadeIn: {
opacity: "show"
},
fadeOut: {
opacity: "hide"
},
fadeToggle: {
opacity: "toggle"
}
}, function(e, t) {
et.fn[e] = function(e, n, r) {
return this.animate(t, e, n, r);
};
}), et.timers = [], et.fx.tick = function() {
var e, n = 0, r = et.timers;
for (Qt = et.now(); n < r.length; n++) e = r[n], e() || r[n] !== e || r.splice(n--, 1);
r.length || et.fx.stop(), Qt = t;
}, et.fx.timer = function(e) {
et.timers.push(e), e() ? et.fx.start() : et.timers.pop();
}, et.fx.interval = 13, et.fx.start = function() {
Gt || (Gt = setInterval(et.fx.tick, et.fx.interval));
}, et.fx.stop = function() {
clearInterval(Gt), Gt = null;
}, et.fx.speeds = {
slow: 600,
fast: 200,
_default: 400
}, et.fn.delay = function(e, t) {
return e = et.fx ? et.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
var r = setTimeout(t, e);
n.stop = function() {
clearTimeout(r);
};
});
}, function() {
var e = J.createElement("input"), t = J.createElement("select"), n = t.appendChild(J.createElement("option"));
e.type = "checkbox", G.checkOn = "" !== e.value, G.optSelected = n.selected, t.disabled = !0, 
G.optDisabled = !n.disabled, e = J.createElement("input"), e.value = "t", e.type = "radio", 
G.radioValue = "t" === e.value;
}();
var rn, on, an = et.expr.attrHandle;
et.fn.extend({
attr: function(e, t) {
return vt(this, et.attr, e, t, arguments.length > 1);
},
removeAttr: function(e) {
return this.each(function() {
et.removeAttr(this, e);
});
}
}), et.extend({
attr: function(e, n, r) {
var i, o, a = e.nodeType;
if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === Tt ? et.prop(e, n, r) : (1 === a && et.isXMLDoc(e) || (n = n.toLowerCase(), 
i = et.attrHooks[n] || (et.expr.match.bool.test(n) ? on : rn)), r === t ? i && "get" in i && null !== (o = i.get(e, n)) ? o : (o = et.find.attr(e, n), 
null == o ? t : o) : null !== r ? i && "set" in i && (o = i.set(e, r, n)) !== t ? o : (e.setAttribute(n, r + ""), 
r) : void et.removeAttr(e, n));
},
removeAttr: function(e, t) {
var n, r, i = 0, o = t && t.match(pt);
if (o && 1 === e.nodeType) for (;n = o[i++]; ) r = et.propFix[n] || n, et.expr.match.bool.test(n) && (e[r] = !1), 
e.removeAttribute(n);
},
attrHooks: {
type: {
set: function(e, t) {
if (!G.radioValue && "radio" === t && et.nodeName(e, "input")) {
var n = e.value;
return e.setAttribute("type", t), n && (e.value = n), t;
}
}
}
}
}), on = {
set: function(e, t, n) {
return t === !1 ? et.removeAttr(e, n) : e.setAttribute(n, n), n;
}
}, et.each(et.expr.match.bool.source.match(/\w+/g), function(e, t) {
var n = an[t] || et.find.attr;
an[t] = function(e, t, r) {
var i, o;
return r || (o = an[t], an[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, 
an[t] = o), i;
};
});
var sn = /^(?:input|select|textarea|button)$/i;
et.fn.extend({
prop: function(e, t) {
return vt(this, et.prop, e, t, arguments.length > 1);
},
removeProp: function(e) {
return this.each(function() {
delete this[et.propFix[e] || e];
});
}
}), et.extend({
propFix: {
"for": "htmlFor",
"class": "className"
},
prop: function(e, n, r) {
var i, o, a, s = e.nodeType;
if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !et.isXMLDoc(e), a && (n = et.propFix[n] || n, 
o = et.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n];
},
propHooks: {
tabIndex: {
get: function(e) {
return e.hasAttribute("tabindex") || sn.test(e.nodeName) || e.href ? e.tabIndex : -1;
}
}
}
}), G.optSelected || (et.propHooks.selected = {
get: function(e) {
var t = e.parentNode;
return t && t.parentNode && t.parentNode.selectedIndex, null;
}
}), et.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
et.propFix[this.toLowerCase()] = this;
});
var un = /[\t\r\n\f]/g;
et.fn.extend({
addClass: function(e) {
var t, n, r, i, o, a, s = "string" == typeof e && e, u = 0, c = this.length;
if (et.isFunction(e)) return this.each(function(t) {
et(this).addClass(e.call(this, t, this.className));
});
if (s) for (t = (e || "").match(pt) || []; c > u; u++) if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(un, " ") : " ")) {
for (o = 0; i = t[o++]; ) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
a = et.trim(r), n.className !== a && (n.className = a);
}
return this;
},
removeClass: function(e) {
var t, n, r, i, o, a, s = 0 === arguments.length || "string" == typeof e && e, u = 0, c = this.length;
if (et.isFunction(e)) return this.each(function(t) {
et(this).removeClass(e.call(this, t, this.className));
});
if (s) for (t = (e || "").match(pt) || []; c > u; u++) if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(un, " ") : "")) {
for (o = 0; i = t[o++]; ) for (;r.indexOf(" " + i + " ") >= 0; ) r = r.replace(" " + i + " ", " ");
a = e ? et.trim(r) : "", n.className !== a && (n.className = a);
}
return this;
},
toggleClass: function(e, t) {
var n = typeof e;
return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(et.isFunction(e) ? function(n) {
et(this).toggleClass(e.call(this, n, this.className, t), t);
} : function() {
if ("string" === n) for (var t, r = 0, i = et(this), o = e.match(pt) || []; t = o[r++]; ) i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else (n === Tt || "boolean" === n) && (this.className && mt.set(this, "__className__", this.className), 
this.className = this.className || e === !1 ? "" : mt.get(this, "__className__") || "");
});
},
hasClass: function(e) {
for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(un, " ").indexOf(t) >= 0) return !0;
return !1;
}
});
var cn = /\r/g;
et.fn.extend({
val: function(e) {
var n, r, i, o = this[0];
{
if (arguments.length) return i = et.isFunction(e), this.each(function(r) {
var o;
1 === this.nodeType && (o = i ? e.call(this, r, et(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : et.isArray(o) && (o = et.map(o, function(e) {
return null == e ? "" : e + "";
})), n = et.valHooks[this.type] || et.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, o, "value") !== t || (this.value = o));
});
if (o) return n = et.valHooks[o.type] || et.valHooks[o.nodeName.toLowerCase()], 
n && "get" in n && (r = n.get(o, "value")) !== t ? r : (r = o.value, "string" == typeof r ? r.replace(cn, "") : null == r ? "" : r);
}
}
}), et.extend({
valHooks: {
select: {
get: function(e) {
for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++) if (n = r[u], 
!(!n.selected && u !== i || (G.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && et.nodeName(n.parentNode, "optgroup"))) {
if (t = et(n).val(), o) return t;
a.push(t);
}
return a;
},
set: function(e, t) {
for (var n, r, i = e.options, o = et.makeArray(t), a = i.length; a--; ) r = i[a], 
(r.selected = et.inArray(et(r).val(), o) >= 0) && (n = !0);
return n || (e.selectedIndex = -1), o;
}
}
}
}), et.each([ "radio", "checkbox" ], function() {
et.valHooks[this] = {
set: function(e, t) {
return et.isArray(t) ? e.checked = et.inArray(et(e).val(), t) >= 0 : void 0;
}
}, G.checkOn || (et.valHooks[this].get = function(e) {
return null === e.getAttribute("value") ? "on" : e.value;
});
}), et.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
et.fn[t] = function(e, n) {
return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
};
}), et.fn.extend({
hover: function(e, t) {
return this.mouseenter(e).mouseleave(t || e);
},
bind: function(e, t, n) {
return this.on(e, null, t, n);
},
unbind: function(e, t) {
return this.off(e, null, t);
},
delegate: function(e, t, n, r) {
return this.on(t, e, n, r);
},
undelegate: function(e, t, n) {
return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
}
});
var fn = et.now(), ln = /\?/;
et.parseJSON = function(e) {
return JSON.parse(e + "");
}, et.parseXML = function(e) {
var n, r;
if (!e || "string" != typeof e) return null;
try {
r = new DOMParser(), n = r.parseFromString(e, "text/xml");
} catch (i) {
n = t;
}
return (!n || n.getElementsByTagName("parsererror").length) && et.error("Invalid XML: " + e), 
n;
};
var dn, pn, hn = /#.*$/, gn = /([?&])_=[^&]*/, vn = /^(.*?):[ \t]*([^\r\n]*)$/gm, mn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, yn = /^(?:GET|HEAD)$/, bn = /^\/\//, xn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, wn = {}, _n = {}, En = "*/".concat("*");
try {
pn = location.href;
} catch (kn) {
pn = J.createElement("a"), pn.href = "", pn = pn.href;
}
dn = xn.exec(pn.toLowerCase()) || [], et.extend({
active: 0,
lastModified: {},
etag: {},
ajaxSettings: {
url: pn,
type: "GET",
isLocal: mn.test(dn[1]),
global: !0,
processData: !0,
async: !0,
contentType: "application/x-www-form-urlencoded; charset=UTF-8",
accepts: {
"*": En,
text: "text/plain",
html: "text/html",
xml: "application/xml, text/xml",
json: "application/json, text/javascript"
},
contents: {
xml: /xml/,
html: /html/,
json: /json/
},
responseFields: {
xml: "responseXML",
text: "responseText",
json: "responseJSON"
},
converters: {
"* text": String,
"text html": !0,
"text json": et.parseJSON,
"text xml": et.parseXML
},
flatOptions: {
url: !0,
context: !0
}
},
ajaxSetup: function(e, t) {
return t ? R(R(e, et.ajaxSettings), t) : R(et.ajaxSettings, e);
},
ajaxPrefilter: O(wn),
ajaxTransport: O(_n),
ajax: function(e, n) {
function r(e, n, r, s) {
var c, l, y, b, w, E = n;
2 !== x && (x = 2, u && clearTimeout(u), i = t, a = s || "", _.readyState = e > 0 ? 4 : 0, 
c = e >= 200 && 300 > e || 304 === e, r && (b = I(d, _, r)), b = F(d, b, _, c), 
c ? (d.ifModified && (w = _.getResponseHeader("Last-Modified"), w && (et.lastModified[o] = w), 
w = _.getResponseHeader("etag"), w && (et.etag[o] = w)), 204 === e || "HEAD" === d.type ? E = "nocontent" : 304 === e ? E = "notmodified" : (E = b.state, 
l = b.data, y = b.error, c = !y)) : (y = E, (e || !E) && (E = "error", 0 > e && (e = 0))), 
_.status = e, _.statusText = (n || E) + "", c ? g.resolveWith(p, [ l, E, _ ]) : g.rejectWith(p, [ _, E, y ]), 
_.statusCode(m), m = t, f && h.trigger(c ? "ajaxSuccess" : "ajaxError", [ _, d, c ? l : y ]), 
v.fireWith(p, [ _, E ]), f && (h.trigger("ajaxComplete", [ _, d ]), --et.active || et.event.trigger("ajaxStop")));
}
"object" == typeof e && (n = e, e = t), n = n || {};
var i, o, a, s, u, c, f, l, d = et.ajaxSetup({}, n), p = d.context || d, h = d.context && (p.nodeType || p.jquery) ? et(p) : et.event, g = et.Deferred(), v = et.Callbacks("once memory"), m = d.statusCode || {}, y = {}, b = {}, x = 0, w = "canceled", _ = {
readyState: 0,
getResponseHeader: function(e) {
var t;
if (2 === x) {
if (!s) for (s = {}; t = vn.exec(a); ) s[t[1].toLowerCase()] = t[2];
t = s[e.toLowerCase()];
}
return null == t ? null : t;
},
getAllResponseHeaders: function() {
return 2 === x ? a : null;
},
setRequestHeader: function(e, t) {
var n = e.toLowerCase();
return x || (e = b[n] = b[n] || e, y[e] = t), this;
},
overrideMimeType: function(e) {
return x || (d.mimeType = e), this;
},
statusCode: function(e) {
var t;
if (e) if (2 > x) for (t in e) m[t] = [ m[t], e[t] ]; else _.always(e[_.status]);
return this;
},
abort: function(e) {
var t = e || w;
return i && i.abort(t), r(0, t), this;
}
};
if (g.promise(_).complete = v.add, _.success = _.done, _.error = _.fail, d.url = ((e || d.url || pn) + "").replace(hn, "").replace(bn, dn[1] + "//"), 
d.type = n.method || n.type || d.method || d.type, d.dataTypes = et.trim(d.dataType || "*").toLowerCase().match(pt) || [ "" ], 
null == d.crossDomain && (c = xn.exec(d.url.toLowerCase()), d.crossDomain = !(!c || c[1] === dn[1] && c[2] === dn[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (dn[3] || ("http:" === dn[1] ? "80" : "443")))), 
d.data && d.processData && "string" != typeof d.data && (d.data = et.param(d.data, d.traditional)), 
q(wn, d, n, _), 2 === x) return _;
f = d.global, f && 0 === et.active++ && et.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), 
d.hasContent = !yn.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (ln.test(o) ? "&" : "?") + d.data, 
delete d.data), d.cache === !1 && (d.url = gn.test(o) ? o.replace(gn, "$1_=" + fn++) : o + (ln.test(o) ? "&" : "?") + "_=" + fn++)), 
d.ifModified && (et.lastModified[o] && _.setRequestHeader("If-Modified-Since", et.lastModified[o]), 
et.etag[o] && _.setRequestHeader("If-None-Match", et.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || n.contentType) && _.setRequestHeader("Content-Type", d.contentType), 
_.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + En + "; q=0.01" : "") : d.accepts["*"]);
for (l in d.headers) _.setRequestHeader(l, d.headers[l]);
if (d.beforeSend && (d.beforeSend.call(p, _, d) === !1 || 2 === x)) return _.abort();
w = "abort";
for (l in {
success: 1,
error: 1,
complete: 1
}) _[l](d[l]);
if (i = q(_n, d, n, _)) {
_.readyState = 1, f && h.trigger("ajaxSend", [ _, d ]), d.async && d.timeout > 0 && (u = setTimeout(function() {
_.abort("timeout");
}, d.timeout));
try {
x = 1, i.send(y, r);
} catch (E) {
if (!(2 > x)) throw E;
r(-1, E);
}
} else r(-1, "No Transport");
return _;
},
getJSON: function(e, t, n) {
return et.get(e, t, n, "json");
},
getScript: function(e, n) {
return et.get(e, t, n, "script");
}
}), et.each([ "get", "post" ], function(e, n) {
et[n] = function(e, r, i, o) {
return et.isFunction(r) && (o = o || i, i = r, r = t), et.ajax({
url: e,
type: n,
dataType: o,
data: r,
success: i
});
};
}), et.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, t) {
et.fn[t] = function(e) {
return this.on(t, e);
};
}), et._evalUrl = function(e) {
return et.ajax({
url: e,
type: "GET",
dataType: "script",
async: !1,
global: !1,
"throws": !0
});
}, et.fn.extend({
wrapAll: function(e) {
var t;
return et.isFunction(e) ? this.each(function(t) {
et(this).wrapAll(e.call(this, t));
}) : (this[0] && (t = et(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), 
t.map(function() {
for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
return e;
}).append(this)), this);
},
wrapInner: function(e) {
return this.each(et.isFunction(e) ? function(t) {
et(this).wrapInner(e.call(this, t));
} : function() {
var t = et(this), n = t.contents();
n.length ? n.wrapAll(e) : t.append(e);
});
},
wrap: function(e) {
var t = et.isFunction(e);
return this.each(function(n) {
et(this).wrapAll(t ? e.call(this, n) : e);
});
},
unwrap: function() {
return this.parent().each(function() {
et.nodeName(this, "body") || et(this).replaceWith(this.childNodes);
}).end();
}
}), et.expr.filters.hidden = function(e) {
return e.offsetWidth <= 0 && e.offsetHeight <= 0;
}, et.expr.filters.visible = function(e) {
return !et.expr.filters.hidden(e);
};
var Tn = /%20/g, Sn = /\[\]$/, Cn = /\r?\n/g, Bn = /^(?:submit|button|image|reset|file)$/i, Dn = /^(?:input|select|textarea|keygen)/i;
et.param = function(e, n) {
var r, i = [], o = function(e, t) {
t = et.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
};
if (n === t && (n = et.ajaxSettings && et.ajaxSettings.traditional), et.isArray(e) || e.jquery && !et.isPlainObject(e)) et.each(e, function() {
o(this.name, this.value);
}); else for (r in e) P(r, e[r], n, o);
return i.join("&").replace(Tn, "+");
}, et.fn.extend({
serialize: function() {
return et.param(this.serializeArray());
},
serializeArray: function() {
return this.map(function() {
var e = et.prop(this, "elements");
return e ? et.makeArray(e) : this;
}).filter(function() {
var e = this.type;
return this.name && !et(this).is(":disabled") && Dn.test(this.nodeName) && !Bn.test(e) && (this.checked || !kt.test(e));
}).map(function(e, t) {
var n = et(this).val();
return null == n ? null : et.isArray(n) ? et.map(n, function(e) {
return {
name: t.name,
value: e.replace(Cn, "\r\n")
};
}) : {
name: t.name,
value: n.replace(Cn, "\r\n")
};
}).get();
}
}), et.ajaxSettings.xhr = function() {
try {
return new XMLHttpRequest();
} catch (e) {}
};
var An = 0, jn = {}, Mn = {
0: 200,
1223: 204
}, Wn = et.ajaxSettings.xhr();
e.ActiveXObject && et(e).on("unload", function() {
for (var e in jn) jn[e]();
}), G.cors = !!Wn && "withCredentials" in Wn, G.ajax = Wn = !!Wn, et.ajaxTransport(function(e) {
var n;
return G.cors || Wn && !e.crossDomain ? {
send: function(r, i) {
var o, a = e.xhr(), s = ++An;
if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (o in e.xhrFields) a[o] = e.xhrFields[o];
e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
for (o in r) a.setRequestHeader(o, r[o]);
n = function(e) {
return function() {
n && (delete jn[s], n = a.onload = a.onerror = null, "abort" === e ? a.abort() : "error" === e ? i(a.status, a.statusText) : i(Mn[a.status] || a.status, a.statusText, "string" == typeof a.responseText ? {
text: a.responseText
} : t, a.getAllResponseHeaders()));
};
}, a.onload = n(), a.onerror = n("error"), n = jn[s] = n("abort"), a.send(e.hasContent && e.data || null);
},
abort: function() {
n && n();
}
} : void 0;
}), et.ajaxSetup({
accepts: {
script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
},
contents: {
script: /(?:java|ecma)script/
},
converters: {
"text script": function(e) {
return et.globalEval(e), e;
}
}
}), et.ajaxPrefilter("script", function(e) {
e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET");
}), et.ajaxTransport("script", function(e) {
if (e.crossDomain) {
var t, n;
return {
send: function(r, i) {
t = et("<script>").prop({
async: !0,
charset: e.scriptCharset,
src: e.url
}).on("load error", n = function(e) {
t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type);
}), J.head.appendChild(t[0]);
},
abort: function() {
n && n();
}
};
}
});
var Nn = [], On = /(=)\?(?=&|$)|\?\?/;
et.ajaxSetup({
jsonp: "callback",
jsonpCallback: function() {
var e = Nn.pop() || et.expando + "_" + fn++;
return this[e] = !0, e;
}
}), et.ajaxPrefilter("json jsonp", function(n, r, i) {
var o, a, s, u = n.jsonp !== !1 && (On.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && On.test(n.data) && "data");
return u || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = et.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, 
u ? n[u] = n[u].replace(On, "$1" + o) : n.jsonp !== !1 && (n.url += (ln.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), 
n.converters["script json"] = function() {
return s || et.error(o + " was not called"), s[0];
}, n.dataTypes[0] = "json", a = e[o], e[o] = function() {
s = arguments;
}, i.always(function() {
e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Nn.push(o)), s && et.isFunction(a) && a(s[0]), 
s = a = t;
}), "script") : void 0;
}), et.parseHTML = function(e, t, n) {
if (!e || "string" != typeof e) return null;
"boolean" == typeof t && (n = t, t = !1), t = t || J;
var r = at.exec(e), i = !n && [];
return r ? [ t.createElement(r[1]) ] : (r = et.buildFragment([ e ], t, i), i && i.length && et(i).remove(), 
et.merge([], r.childNodes));
};
var qn = et.fn.load;
et.fn.load = function(e, n, r) {
if ("string" != typeof e && qn) return qn.apply(this, arguments);
var i, o, a, s = this, u = e.indexOf(" ");
return u >= 0 && (i = e.slice(u), e = e.slice(0, u)), et.isFunction(n) ? (r = n, 
n = t) : n && "object" == typeof n && (o = "POST"), s.length > 0 && et.ajax({
url: e,
type: o,
dataType: "html",
data: n
}).done(function(e) {
a = arguments, s.html(i ? et("<div>").append(et.parseHTML(e)).find(i) : e);
}).complete(r && function(e, t) {
s.each(r, a || [ e.responseText, t, e ]);
}), this;
}, et.expr.filters.animated = function(e) {
return et.grep(et.timers, function(t) {
return e === t.elem;
}).length;
};
var Rn = e.document.documentElement;
et.offset = {
setOffset: function(e, t, n) {
var r, i, o, a, s, u, c, f = et.css(e, "position"), l = et(e), d = {};
"static" === f && (e.style.position = "relative"), s = l.offset(), o = et.css(e, "top"), 
u = et.css(e, "left"), c = ("absolute" === f || "fixed" === f) && (o + u).indexOf("auto") > -1, 
c ? (r = l.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), 
et.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (d.top = t.top - s.top + a), 
null != t.left && (d.left = t.left - s.left + i), "using" in t ? t.using.call(e, d) : l.css(d);
}
}, et.fn.extend({
offset: function(e) {
if (arguments.length) return e === t ? this : this.each(function(t) {
et.offset.setOffset(this, e, t);
});
var n, r, i = this[0], o = {
top: 0,
left: 0
}, a = i && i.ownerDocument;
if (a) return n = a.documentElement, et.contains(n, i) ? (typeof i.getBoundingClientRect !== Tt && (o = i.getBoundingClientRect()), 
r = L(a), {
top: o.top + r.pageYOffset - n.clientTop,
left: o.left + r.pageXOffset - n.clientLeft
}) : o;
},
position: function() {
if (this[0]) {
var e, t, n = this[0], r = {
top: 0,
left: 0
};
return "fixed" === et.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), 
t = this.offset(), et.nodeName(e[0], "html") || (r = e.offset()), r.top += et.css(e[0], "borderTopWidth", !0), 
r.left += et.css(e[0], "borderLeftWidth", !0)), {
top: t.top - r.top - et.css(n, "marginTop", !0),
left: t.left - r.left - et.css(n, "marginLeft", !0)
};
}
},
offsetParent: function() {
return this.map(function() {
for (var e = this.offsetParent || Rn; e && !et.nodeName(e, "html") && "static" === et.css(e, "position"); ) e = e.offsetParent;
return e || Rn;
});
}
}), et.each({
scrollLeft: "pageXOffset",
scrollTop: "pageYOffset"
}, function(n, r) {
var i = "pageYOffset" === r;
et.fn[n] = function(o) {
return vt(this, function(n, o, a) {
var s = L(n);
return a === t ? s ? s[r] : n[o] : void (s ? s.scrollTo(i ? e.pageXOffset : a, i ? a : e.pageYOffset) : n[o] = a);
}, n, o, arguments.length, null);
};
}), et.each([ "top", "left" ], function(e, t) {
et.cssHooks[t] = _(G.pixelPosition, function(e, n) {
return n ? (n = w(e, t), Ht.test(n) ? et(e).position()[t] + "px" : n) : void 0;
});
}), et.each({
Height: "height",
Width: "width"
}, function(e, n) {
et.each({
padding: "inner" + e,
content: n,
"": "outer" + e
}, function(r, i) {
et.fn[i] = function(i, o) {
var a = arguments.length && (r || "boolean" != typeof i), s = r || (i === !0 || o === !0 ? "margin" : "border");
return vt(this, function(n, r, i) {
var o;
return et.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, 
Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? et.css(n, r, s) : et.style(n, r, i, s);
}, n, a ? i : t, a, null);
};
});
}), et.fn.size = function() {
return this.length;
}, et.fn.andSelf = et.fn.addBack;
var In = e.jQuery, Fn = e.$;
return et.noConflict = function(t) {
return e.$ === et && (e.$ = Fn), t && e.jQuery === et && (e.jQuery = In), et;
}, typeof noGlobal === Tt && (e.jQuery = e.$ = et), et.noConflict(), et;
});
!function(e, t) {
if ("function" == typeof define && define.amd) define('vendor/backbone',[ "vendor/lodash", "vendor/jquery", "exports" ], function(n, r, i) {
e.Backbone = t(e, i, n, r);
}); else if ("undefined" != typeof exports) {
var n = require("underscore");
t(e, exports, n);
} else e.Backbone = t(e, {}, e._, e.jQuery || e.Zepto || e.ender || e.$);
}(this, function(e, t, n, r) {
{
var i = e.Backbone, o = [], a = (o.push, o.slice);
o.splice;
}
t.VERSION = "1.1.2", t.$ = r, t.noConflict = function() {
return e.Backbone = i, this;
}, t.emulateHTTP = !1, t.emulateJSON = !1;
var s = t.Events = {
on: function(e, t, n) {
if (!c(this, "on", e, [ t, n ]) || !t) return this;
this._events || (this._events = {});
var r = this._events[e] || (this._events[e] = []);
return r.push({
callback: t,
context: n,
ctx: n || this
}), this;
},
once: function(e, t, r) {
if (!c(this, "once", e, [ t, r ]) || !t) return this;
var i = this, o = n.once(function() {
i.off(e, o), t.apply(this, arguments);
});
return o._callback = t, this.on(e, o, r);
},
off: function(e, t, r) {
var i, o, a, s, u, l, f, d;
if (!this._events || !c(this, "off", e, [ t, r ])) return this;
if (!e && !t && !r) return this._events = void 0, this;
for (s = e ? [ e ] : n.keys(this._events), u = 0, l = s.length; l > u; u++) if (e = s[u], 
a = this._events[e]) {
if (this._events[e] = i = [], t || r) for (f = 0, d = a.length; d > f; f++) o = a[f], 
(t && t !== o.callback && t !== o.callback._callback || r && r !== o.context) && i.push(o);
i.length || delete this._events[e];
}
return this;
},
trigger: function(e) {
if (!this._events) return this;
var t = a.call(arguments, 1);
if (!c(this, "trigger", e, t)) return this;
var n = this._events[e], r = this._events.all;
return n && l(n, t), r && l(r, arguments), this;
},
stopListening: function(e, t, r) {
var i = this._listeningTo;
if (!i) return this;
var o = !t && !r;
r || "object" != typeof t || (r = this), e && ((i = {})[e._listenId] = e);
for (var a in i) e = i[a], e.off(t, r, this), (o || n.isEmpty(e._events)) && delete this._listeningTo[a];
return this;
}
}, u = /\s+/, c = function(e, t, n, r) {
if (!n) return !0;
if ("object" == typeof n) {
for (var i in n) e[t].apply(e, [ i, n[i] ].concat(r));
return !1;
}
if (u.test(n)) {
for (var o = n.split(u), a = 0, s = o.length; s > a; a++) e[t].apply(e, [ o[a] ].concat(r));
return !1;
}
return !0;
}, l = function(e, t) {
var n, r = -1, i = e.length, o = t[0], a = t[1], s = t[2];
switch (t.length) {
case 0:
for (;++r < i; ) (n = e[r]).callback.call(n.ctx);
return;

case 1:
for (;++r < i; ) (n = e[r]).callback.call(n.ctx, o);
return;

case 2:
for (;++r < i; ) (n = e[r]).callback.call(n.ctx, o, a);
return;

case 3:
for (;++r < i; ) (n = e[r]).callback.call(n.ctx, o, a, s);
return;

default:
for (;++r < i; ) (n = e[r]).callback.apply(n.ctx, t);
return;
}
}, f = {
listenTo: "on",
listenToOnce: "once"
};
n.each(f, function(e, t) {
s[t] = function(t, r, i) {
var o = this._listeningTo || (this._listeningTo = {}), a = t._listenId || (t._listenId = n.uniqueId("l"));
return o[a] = t, i || "object" != typeof r || (i = this), t[e](r, i, this), this;
};
}), s.bind = s.on, s.unbind = s.off, n.extend(t, s);
var d = t.Model = function(e, t) {
var r = e || {};
t || (t = {}), this.cid = n.uniqueId("c"), this.attributes = {}, t.collection && (this.collection = t.collection), 
t.parse && (r = this.parse(r, t) || {}), r = n.defaults({}, r, n.result(this, "defaults")), 
this.set(r, t), this.changed = {}, this.initialize.apply(this, arguments);
};
n.extend(d.prototype, s, {
changed: null,
validationError: null,
idAttribute: "id",
initialize: function() {},
toJSON: function() {
return n.clone(this.attributes);
},
sync: function() {
return t.sync.apply(this, arguments);
},
get: function(e) {
return this.attributes[e];
},
escape: function(e) {
return n.escape(this.get(e));
},
has: function(e) {
return null != this.get(e);
},
set: function(e, t, r) {
var i, o, a, s, u, c, l, f;
if (null == e) return this;
if ("object" == typeof e ? (o = e, r = t) : (o = {})[e] = t, r || (r = {}), !this._validate(o, r)) return !1;
a = r.unset, u = r.silent, s = [], c = this._changing, this._changing = !0, c || (this._previousAttributes = n.clone(this.attributes), 
this.changed = {}), f = this.attributes, l = this._previousAttributes, this.idAttribute in o && (this.id = o[this.idAttribute]);
for (i in o) t = o[i], n.isEqual(f[i], t) || s.push(i), n.isEqual(l[i], t) ? delete this.changed[i] : this.changed[i] = t, 
a ? delete f[i] : f[i] = t;
if (!u) {
s.length && (this._pending = r);
for (var d = 0, h = s.length; h > d; d++) this.trigger("change:" + s[d], this, f[s[d]], r);
}
if (c) return this;
if (!u) for (;this._pending; ) r = this._pending, this._pending = !1, this.trigger("change", this, r);
return this._pending = !1, this._changing = !1, this;
},
unset: function(e, t) {
return this.set(e, void 0, n.extend({}, t, {
unset: !0
}));
},
clear: function(e) {
var t = {};
for (var r in this.attributes) t[r] = void 0;
return this.set(t, n.extend({}, e, {
unset: !0
}));
},
hasChanged: function(e) {
return null == e ? !n.isEmpty(this.changed) : n.has(this.changed, e);
},
changedAttributes: function(e) {
if (!e) return this.hasChanged() ? n.clone(this.changed) : !1;
var t, r = !1, i = this._changing ? this._previousAttributes : this.attributes;
for (var o in e) n.isEqual(i[o], t = e[o]) || ((r || (r = {}))[o] = t);
return r;
},
previous: function(e) {
return null != e && this._previousAttributes ? this._previousAttributes[e] : null;
},
previousAttributes: function() {
return n.clone(this._previousAttributes);
},
fetch: function(e) {
e = e ? n.clone(e) : {}, void 0 === e.parse && (e.parse = !0);
var t = this, r = e.success;
return e.success = function(n) {
return t.set(t.parse(n, e), e) ? (r && r(t, n, e), void t.trigger("sync", t, n, e)) : !1;
}, R(this, e), this.sync("read", this, e);
},
save: function(e, t, r) {
var i, o, a, s = this.attributes;
if (null == e || "object" == typeof e ? (i = e, r = t) : (i = {})[e] = t, r = n.extend({
validate: !0
}, r), i && !r.wait) {
if (!this.set(i, r)) return !1;
} else if (!this._validate(i, r)) return !1;
i && r.wait && (this.attributes = n.extend({}, s, i)), void 0 === r.parse && (r.parse = !0);
var u = this, c = r.success;
return r.success = function(e) {
u.attributes = s;
var t = u.parse(e, r);
return r.wait && (t = n.extend(i || {}, t)), n.isObject(t) && !u.set(t, r) ? !1 : (c && c(u, e, r), 
void u.trigger("sync", u, e, r));
}, R(this, r), o = this.isNew() ? "create" : r.patch ? "patch" : "update", "patch" === o && (r.attrs = i), 
a = this.sync(o, this, r), i && r.wait && (this.attributes = s), a;
},
destroy: function(e) {
e = e ? n.clone(e) : {};
var t = this, r = e.success, i = function() {
t.trigger("destroy", t, t.collection, e);
};
if (e.success = function(n) {
(e.wait || t.isNew()) && i(), r && r(t, n, e), t.isNew() || t.trigger("sync", t, n, e);
}, this.isNew()) return e.success(), !1;
R(this, e);
var o = this.sync("delete", this, e);
return e.wait || i(), o;
},
url: function() {
var e = n.result(this, "urlRoot") || n.result(this.collection, "url") || q();
return this.isNew() ? e : e.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id);
},
parse: function(e) {
return e;
},
clone: function() {
return new this.constructor(this.attributes);
},
isNew: function() {
return !this.has(this.idAttribute);
},
isValid: function(e) {
return this._validate({}, n.extend(e || {}, {
validate: !0
}));
},
_validate: function(e, t) {
if (!t.validate || !this.validate) return !0;
e = n.extend({}, this.attributes, e);
var r = this.validationError = this.validate(e, t) || null;
return r ? (this.trigger("invalid", this, r, n.extend(t, {
validationError: r
})), !1) : !0;
}
});
var h = [ "keys", "values", "pairs", "invert", "pick", "omit" ];
n.each(h, function(e) {
d.prototype[e] = function() {
var t = a.call(arguments);
return t.unshift(this.attributes), n[e].apply(n, t);
};
});
var p = t.Collection = function(e, t) {
t || (t = {}), t.model && (this.model = t.model), void 0 !== t.comparator && (this.comparator = t.comparator), 
this._reset(), this.initialize.apply(this, arguments), e && this.reset(e, n.extend({
silent: !0
}, t));
}, g = {
add: !0,
remove: !0,
merge: !0
}, v = {
add: !0,
remove: !1
};
n.extend(p.prototype, s, {
model: d,
initialize: function() {},
toJSON: function(e) {
return this.map(function(t) {
return t.toJSON(e);
});
},
sync: function() {
return t.sync.apply(this, arguments);
},
add: function(e, t) {
return this.set(e, n.extend({
merge: !1
}, t, v));
},
remove: function(e, t) {
var r = !n.isArray(e);
e = r ? [ e ] : n.clone(e), t || (t = {});
var i, o, a, s;
for (i = 0, o = e.length; o > i; i++) s = e[i] = this.get(e[i]), s && (delete this._byId[s.id], 
delete this._byId[s.cid], a = this.indexOf(s), this.models.splice(a, 1), this.length--, 
t.silent || (t.index = a, s.trigger("remove", s, this, t)), this._removeReference(s, t));
return r ? e[0] : e;
},
set: function(e, t) {
t = n.defaults({}, t, g), t.parse && (e = this.parse(e, t));
var r = !n.isArray(e);
e = r ? e ? [ e ] : [] : n.clone(e);
var i, o, a, s, u, c, l, f = t.at, h = this.model, p = this.comparator && null == f && t.sort !== !1, v = n.isString(this.comparator) ? this.comparator : null, m = [], y = [], b = {}, x = t.add, w = t.merge, _ = t.remove, E = !p && x && _ ? [] : !1;
for (i = 0, o = e.length; o > i; i++) {
if (u = e[i] || {}, a = u instanceof d ? s = u : u[h.prototype.idAttribute || "id"], 
c = this.get(a)) _ && (b[c.cid] = !0), w && (u = u === s ? s.attributes : u, t.parse && (u = c.parse(u, t)), 
c.set(u, t), p && !l && c.hasChanged(v) && (l = !0)), e[i] = c; else if (x) {
if (s = e[i] = this._prepareModel(u, t), !s) continue;
m.push(s), this._addReference(s, t);
}
s = c || s, !E || !s.isNew() && b[s.id] || E.push(s), b[s.id] = !0;
}
if (_) {
for (i = 0, o = this.length; o > i; ++i) b[(s = this.models[i]).cid] || y.push(s);
y.length && this.remove(y, t);
}
if (m.length || E && E.length) if (p && (l = !0), this.length += m.length, null != f) for (i = 0, 
o = m.length; o > i; i++) this.models.splice(f + i, 0, m[i]); else {
E && (this.models.length = 0);
var k = E || m;
for (i = 0, o = k.length; o > i; i++) this.models.push(k[i]);
}
if (l && this.sort({
silent: !0
}), !t.silent) {
for (i = 0, o = m.length; o > i; i++) (s = m[i]).trigger("add", s, this, t);
(l || E && E.length) && this.trigger("sort", this, t);
}
return r ? e[0] : e;
},
reset: function(e, t) {
t || (t = {});
for (var r = 0, i = this.models.length; i > r; r++) this._removeReference(this.models[r], t);
return t.previousModels = this.models, this._reset(), e = this.add(e, n.extend({
silent: !0
}, t)), t.silent || this.trigger("reset", this, t), e;
},
push: function(e, t) {
return this.add(e, n.extend({
at: this.length
}, t));
},
pop: function(e) {
var t = this.at(this.length - 1);
return this.remove(t, e), t;
},
unshift: function(e, t) {
return this.add(e, n.extend({
at: 0
}, t));
},
shift: function(e) {
var t = this.at(0);
return this.remove(t, e), t;
},
slice: function() {
return a.apply(this.models, arguments);
},
get: function(e) {
return null == e ? void 0 : this._byId[e] || this._byId[e.id] || this._byId[e.cid];
},
at: function(e) {
return this.models[e];
},
where: function(e, t) {
return n.isEmpty(e) ? t ? void 0 : [] : this[t ? "find" : "filter"](function(t) {
for (var n in e) if (e[n] !== t.get(n)) return !1;
return !0;
});
},
findWhere: function(e) {
return this.where(e, !0);
},
sort: function(e) {
if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
return e || (e = {}), n.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(n.bind(this.comparator, this)), 
e.silent || this.trigger("sort", this, e), this;
},
pluck: function(e) {
return n.invoke(this.models, "get", e);
},
fetch: function(e) {
e = e ? n.clone(e) : {}, void 0 === e.parse && (e.parse = !0);
var t = e.success, r = this;
return e.success = function(n) {
var i = e.reset ? "reset" : "set";
r[i](n, e), t && t(r, n, e), r.trigger("sync", r, n, e);
}, R(this, e), this.sync("read", this, e);
},
create: function(e, t) {
if (t = t ? n.clone(t) : {}, !(e = this._prepareModel(e, t))) return !1;
t.wait || this.add(e, t);
var r = this, i = t.success;
return t.success = function(e, n) {
t.wait && r.add(e, t), i && i(e, n, t);
}, e.save(null, t), e;
},
parse: function(e) {
return e;
},
clone: function() {
return new this.constructor(this.models);
},
_reset: function() {
this.length = 0, this.models = [], this._byId = {};
},
_prepareModel: function(e, t) {
if (e instanceof d) return e;
t = t ? n.clone(t) : {}, t.collection = this;
var r = new this.model(e, t);
return r.validationError ? (this.trigger("invalid", this, r.validationError, t), 
!1) : r;
},
_addReference: function(e) {
this._byId[e.cid] = e, null != e.id && (this._byId[e.id] = e), e.collection || (e.collection = this), 
e.on("all", this._onModelEvent, this);
},
_removeReference: function(e) {
this === e.collection && delete e.collection, e.off("all", this._onModelEvent, this);
},
_onModelEvent: function(e, t, n, r) {
("add" !== e && "remove" !== e || n === this) && ("destroy" === e && this.remove(t, r), 
t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)], 
null != t.id && (this._byId[t.id] = t)), this.trigger.apply(this, arguments));
}
});
var m = [ "forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample" ];
n.each(m, function(e) {
p.prototype[e] = function() {
var t = a.call(arguments);
return t.unshift(this.models), n[e].apply(n, t);
};
});
var y = [ "groupBy", "countBy", "sortBy", "indexBy" ];
n.each(y, function(e) {
p.prototype[e] = function(t, r) {
var i = n.isFunction(t) ? t : function(e) {
return e.get(t);
};
return n[e](this.models, i, r);
};
});
var b = t.View = function(e) {
this.cid = n.uniqueId("view"), e || (e = {}), n.extend(this, n.pick(e, w)), this._ensureElement(), 
this.initialize.apply(this, arguments), this.delegateEvents();
}, x = /^(\S+)\s*(.*)$/, w = [ "model", "collection", "el", "id", "attributes", "className", "tagName", "events" ];
n.extend(b.prototype, s, {
tagName: "div",
$: function(e) {
return this.$el.find(e);
},
initialize: function() {},
render: function() {
return this;
},
remove: function() {
return this.$el.remove(), this.stopListening(), this;
},
setElement: function(e, n) {
return this.$el && this.undelegateEvents(), this.$el = e instanceof t.$ ? e : t.$(e), 
this.el = this.$el[0], n !== !1 && this.delegateEvents(), this;
},
delegateEvents: function(e) {
if (!e && !(e = n.result(this, "events"))) return this;
this.undelegateEvents();
for (var t in e) {
var r = e[t];
if (n.isFunction(r) || (r = this[e[t]]), r) {
var i = t.match(x), o = i[1], a = i[2];
r = n.bind(r, this), o += ".delegateEvents" + this.cid, "" === a ? this.$el.on(o, r) : this.$el.on(o, a, r);
}
}
return this;
},
undelegateEvents: function() {
return this.$el.off(".delegateEvents" + this.cid), this;
},
_ensureElement: function() {
if (this.el) this.setElement(n.result(this, "el"), !1); else {
var e = n.extend({}, n.result(this, "attributes"));
this.id && (e.id = n.result(this, "id")), this.className && (e["class"] = n.result(this, "className"));
var r = t.$("<" + n.result(this, "tagName") + ">").attr(e);
this.setElement(r, !1);
}
}
}), t.sync = function(e, r, i) {
var o = E[e];
n.defaults(i || (i = {}), {
emulateHTTP: t.emulateHTTP,
emulateJSON: t.emulateJSON
});
var a = {
type: o,
dataType: "json"
};
if (i.url || (a.url = n.result(r, "url") || q()), null != i.data || !r || "create" !== e && "update" !== e && "patch" !== e || (a.contentType = "application/json", 
a.data = JSON.stringify(i.attrs || r.toJSON(i))), i.emulateJSON && (a.contentType = "application/x-www-form-urlencoded", 
a.data = a.data ? {
model: a.data
} : {}), i.emulateHTTP && ("PUT" === o || "DELETE" === o || "PATCH" === o)) {
a.type = "POST", i.emulateJSON && (a.data._method = o);
var s = i.beforeSend;
i.beforeSend = function(e) {
return e.setRequestHeader("X-HTTP-Method-Override", o), s ? s.apply(this, arguments) : void 0;
};
}
"GET" === a.type || i.emulateJSON || (a.processData = !1), "PATCH" === a.type && _ && (a.xhr = function() {
return new ActiveXObject("Microsoft.XMLHTTP");
});
var u = i.xhr = t.ajax(n.extend(a, i));
return r.trigger("request", r, u, i), u;
};
var _ = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && new XMLHttpRequest().dispatchEvent), E = {
create: "POST",
update: "PUT",
patch: "PATCH",
"delete": "DELETE",
read: "GET"
};
t.ajax = function() {
return t.$.ajax.apply(t.$, arguments);
};
var k = t.Router = function(e) {
e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments);
}, T = /\((.*?)\)/g, S = /(\(\?)?:\w+/g, C = /\*\w+/g, B = /[\-{}\[\]+?.,\\\^$|#\s]/g;
n.extend(k.prototype, s, {
initialize: function() {},
route: function(e, r, i) {
n.isRegExp(e) || (e = this._routeToRegExp(e)), n.isFunction(r) && (i = r, r = ""), 
i || (i = this[r]);
var o = this;
return t.history.route(e, function(n) {
var a = o._extractParameters(e, n);
o.execute(i, a) !== !1 && (o.trigger.apply(o, [ "route:" + r ].concat(a)), o.trigger("route", r, a), 
t.history.trigger("route", o, r, a));
}), this;
},
execute: function(e, t) {
e && e.apply(this, t);
},
navigate: function(e, n) {
return t.history.navigate(e, n), this;
},
_bindRoutes: function() {
if (this.routes) {
this.routes = n.result(this, "routes");
for (var e, t = n.keys(this.routes); null != (e = t.pop()); ) this.route(e, this.routes[e]);
}
},
_routeToRegExp: function(e) {
return e = e.replace(B, "\\$&").replace(T, "(?:$1)?").replace(S, function(e, t) {
return t ? e : "([^/?]+)";
}).replace(C, "([^?]*?)"), new RegExp("^" + e + "(?:\\?([\\s\\S]*))?$");
},
_extractParameters: function(e, t) {
var r = e.exec(t).slice(1);
return n.map(r, function(e, t) {
return t === r.length - 1 ? e || null : e ? decodeURIComponent(e) : null;
});
}
});
var A = t.History = function() {
this.handlers = [], n.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, 
this.history = window.history);
}, D = /^[#\/]|\s+$/g, j = /^\/+|\/+$/g, M = /msie [\w.]+/, N = /\/$/, W = /#.*$/;
A.started = !1, n.extend(A.prototype, s, {
interval: 50,
atRoot: function() {
return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root;
},
getHash: function(e) {
var t = (e || this).location.href.match(/#(.*)$/);
return t ? t[1] : "";
},
getFragment: function(e, t) {
if (null == e) if (this._hasPushState || !this._wantsHashChange || t) {
e = decodeURI(this.location.pathname + this.location.search);
var n = this.root.replace(N, "");
e.indexOf(n) || (e = e.slice(n.length));
} else e = this.getHash();
return e.replace(D, "");
},
start: function(e) {
if (A.started) throw new Error("Backbone.history has already been started");
A.started = !0, this.options = n.extend({
root: "/"
}, this.options, e), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, 
this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
var r = this.getFragment(), i = document.documentMode, o = M.exec(navigator.userAgent.toLowerCase()) && (!i || 7 >= i);
if (this.root = ("/" + this.root + "/").replace(j, "/"), o && this._wantsHashChange) {
var a = t.$('<iframe src="javascript:0" tabindex="-1">');
this.iframe = a.hide().appendTo("body")[0].contentWindow, this.navigate(r);
}
this._hasPushState ? t.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !o ? t.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), 
this.fragment = r;
var s = this.location;
if (this._wantsHashChange && this._wantsPushState) {
if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), 
this.location.replace(this.root + "#" + this.fragment), !0;
this._hasPushState && this.atRoot() && s.hash && (this.fragment = this.getHash().replace(D, ""), 
this.history.replaceState({}, document.title, this.root + this.fragment));
}
return this.options.silent ? void 0 : this.loadUrl();
},
stop: function() {
t.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), this._checkUrlInterval && clearInterval(this._checkUrlInterval), 
A.started = !1;
},
route: function(e, t) {
this.handlers.unshift({
route: e,
callback: t
});
},
checkUrl: function() {
var e = this.getFragment();
return e === this.fragment && this.iframe && (e = this.getFragment(this.getHash(this.iframe))), 
e === this.fragment ? !1 : (this.iframe && this.navigate(e), void this.loadUrl());
},
loadUrl: function(e) {
return e = this.fragment = this.getFragment(e), n.any(this.handlers, function(t) {
return t.route.test(e) ? (t.callback(e), !0) : void 0;
});
},
navigate: function(e, t) {
if (!A.started) return !1;
t && t !== !0 || (t = {
trigger: !!t
});
var n = this.root + (e = this.getFragment(e || ""));
if (e = e.replace(W, ""), this.fragment !== e) {
if (this.fragment = e, "" === e && "/" !== n && (n = n.slice(0, -1)), this._hasPushState) this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n); else {
if (!this._wantsHashChange) return this.location.assign(n);
this._updateHash(this.location, e, t.replace), this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (t.replace || this.iframe.document.open().close(), 
this._updateHash(this.iframe.location, e, t.replace));
}
return t.trigger ? this.loadUrl(e) : void 0;
}
},
_updateHash: function(e, t, n) {
if (n) {
var r = e.href.replace(/(javascript:|#).*$/, "");
e.replace(r + "#" + t);
} else e.hash = "#" + t;
}
}), t.history = new A();
var O = function(e, t) {
var r, i = this;
r = e && n.has(e, "constructor") ? e.constructor : function() {
return i.apply(this, arguments);
}, n.extend(r, i, t);
var o = function() {
this.constructor = r;
};
return o.prototype = i.prototype, r.prototype = new o(), e && n.extend(r.prototype, e), 
r.__super__ = i.prototype, r;
};
d.extend = p.extend = k.extend = b.extend = A.extend = O;
var q = function() {
throw new Error('A "url" property or function must be specified');
}, R = function(e, t) {
var n = t.error;
t.error = function(r) {
n && n(e, r, t), e.trigger("error", e, r, t);
};
};
return t;
});
(function() {

define("wb", {
load: function(e, t, n, r) {
return r.isBuild ? n() : void t([ "wunderbits/core/dist/wunderbits.core", "wunderbits/db/dist/wunderbits.db" ], function(t, r) {
for (var i = {
core: t,
db: r
}, o = e.split(/[\.\/]/g), a = i[o.shift()]; a && o.length; ) a = a[o.shift()];
return a ? void n(a) : n.error();
});
}
});
}).call(null);
define('wunderbits/Wunderscore',[ "vendor/lodash", "wb!core/lib/toArray", "wb!core/lib/functions", "wb!core/lib/merge", "wb!core/lib/defer", "wb!core/lib/delay" ], function(e, t, n, r, i, o) {

var a = [], s = a.concat, u = a.slice;
return {
functions: function(e) {
return [ e ].concat(n(e));
},
bindAll: function() {
var t = function(e) {
for (var t, n = this, r = arguments.length > 1 ? s.apply(a, u.call(arguments, 1)) : n.functions(e); r.length; ) t = r.shift(), 
"constructor" !== t && (e[t] = e[t].bind(e));
};
return "bind" in Function.prototype ? t : e.bindAll;
}(),
merge: r,
defer: i,
delay: o
};
});
define('wunderbits/lib/dependencies',[ "vendor/backbone", "vendor/lodash", "vendor/jquery", "../Wunderscore" ], function(e, t, n, r) {

return {
$: n,
_: t,
Backbone: e,
w_: r
};
});
define('wunderbits/data/emoji',{
"100": "1f4af",
"1234": "1f522",
"+1": "1f44d",
"-1": "1f44e",
"8ball": "1f3b1",
a: "1f170",
ab: "1f18e",
abc: "1f524",
abcd: "1f521",
accept: "1f251",
"aerial tramway": "1f6a1",
airplane: "2708",
"alarm clock": "23f0",
alien: "1f47d",
ambulance: "1f691",
anchor: "2693",
angel: "1f47c",
anger: "1f4a2",
angry: "1f620",
anguished: "1f627",
ant: "1f41c",
apple: "1f34e",
aquarius: "2652",
aries: "2648",
"arrow backward": "25c0",
"arrow double down": "23ec",
"arrow double up": "23eb",
"arrow down": "2b07",
"arrow down small": "1f53d",
"arrow forward": "25b6",
"arrow heading down": "2935",
"arrow heading up": "2934",
"arrow left": "2b05",
"arrow lower left": "2199",
"arrow lower right": "2198",
"arrow right": "27a1",
"arrow right hook": "21aa",
"arrow up": "2b06",
"arrow up down": "2195",
"arrow up small": "1f53c",
"arrow upper left": "2196",
"arrow upper right": "2197",
"arrows clockwise": "1f503",
"arrows counterclockwise": "1f504",
art: "1f3a8",
"articulated lorry": "1f69b",
astonished: "1f632",
"athletic shoe": "1f45f",
atm: "1f3e7",
b: "1f171",
baby: "1f476",
"baby bottle": "1f37c",
"baby chick": "1f424",
"baby symbol": "1f6bc",
back: "1f519",
"baggage claim": "1f6c4",
balloon: "1f388",
"ballot box with check": "2611",
bamboo: "1f38d",
banana: "1f34c",
bangbang: "203c",
bank: "1f3e6",
"bar chart": "1f4ca",
barber: "1f488",
baseball: "26be",
basketball: "1f3c0",
bath: "1f6c0",
bathtub: "1f6c1",
battery: "1f50b",
bear: "1f43b",
bee: "1f41d",
beer: "1f37a",
beers: "1f37b",
beetle: "1f41e",
beginner: "1f530",
bell: "1f514",
bento: "1f371",
bicyclist: "1f6b4",
bike: "1f6b2",
bikini: "1f459",
bird: "1f426",
birthday: "1f382",
"black circle": "26ab",
"black joker": "1f0cf",
"black large square": "2b1b",
"black medium small square": "25fe",
"black medium square": "25fc",
"black nib": "2712",
"black small square": "25aa",
"black square button": "1f532",
blossom: "1f33c",
blowfish: "1f421",
"blue book": "1f4d8",
"blue car": "1f699",
"blue heart": "1f499",
blush: "1f60a",
boar: "1f417",
boat: "26f5",
bomb: "1f4a3",
book: "1f4d6",
bookmark: "1f516",
"bookmark tabs": "1f4d1",
books: "1f4da",
boom: "1f4a5",
boot: "1f462",
bouquet: "1f490",
bow: "1f647",
bowling: "1f3b3",
bowtie: "bowtie",
boy: "1f466",
bread: "1f35e",
"bride with veil": "1f470",
"bridge at night": "1f309",
briefcase: "1f4bc",
"broken heart": "1f494",
bug: "1f41b",
bulb: "1f4a1",
"bullettrain front": "1f685",
"bullettrain side": "1f684",
bus: "1f68c",
busstop: "1f68f",
"bust in silhouette": "1f464",
"busts in silhouette": "1f465",
cactus: "1f335",
cake: "1f370",
calendar: "1f4c6",
calling: "1f4f2",
camel: "1f42b",
camera: "1f4f7",
cancer: "264b",
candy: "1f36c",
"capital abcd": "1f520",
capricorn: "2651",
car: "1f697",
"card index": "1f4c7",
"carousel horse": "1f3a0",
cat: "1f431",
cat2: "1f408",
cd: "1f4bf",
chart: "1f4b9",
"chart with downwards trend": "1f4c9",
"chart with upwards trend": "1f4c8",
"checkered flag": "1f3c1",
cherries: "1f352",
"cherry blossom": "1f338",
chestnut: "1f330",
chicken: "1f414",
"children crossing": "1f6b8",
"chocolate bar": "1f36b",
"christmas tree": "1f384",
church: "26ea",
cinema: "1f3a6",
"circus tent": "1f3aa",
"city sunrise": "1f307",
"city sunset": "1f306",
cl: "1f191",
clap: "1f44f",
clapper: "1f3ac",
clipboard: "1f4cb",
clock1: "1f550",
clock10: "1f559",
clock1030: "1f565",
clock11: "1f55a",
clock1130: "1f566",
clock12: "1f55b",
clock1230: "1f567",
clock130: "1f55c",
clock2: "1f551",
clock230: "1f55d",
clock3: "1f552",
clock330: "1f55e",
clock4: "1f553",
clock430: "1f55f",
clock5: "1f554",
clock530: "1f560",
clock6: "1f555",
clock630: "1f561",
clock7: "1f556",
clock730: "1f562",
clock8: "1f557",
clock830: "1f563",
clock9: "1f558",
clock930: "1f564",
"closed book": "1f4d5",
"closed lock with key": "1f510",
"closed umbrella": "1f302",
cloud: "2601",
clubs: "2663",
cn: "1f1e8-1f1f3",
cocktail: "1f378",
coffee: "2615",
"cold sweat": "1f630",
collision: "1f4a5",
computer: "1f4bb",
"confetti ball": "1f38a",
confounded: "1f616",
confused: "1f615",
congratulations: "3297",
construction: "1f6a7",
"construction worker": "1f477",
"convenience store": "1f3ea",
cookie: "1f36a",
cool: "1f192",
cop: "1f46e",
copyright: "00a9",
corn: "1f33d",
couple: "1f46b",
"couple with heart": "1f491",
couplekiss: "1f48f",
cow: "1f42e",
cow2: "1f404",
"credit card": "1f4b3",
"crescent moon": "1f319",
crocodile: "1f40a",
"crossed flags": "1f38c",
crown: "1f451",
cry: "1f622",
"crying cat face": "1f63f",
"crystal ball": "1f52e",
cupid: "1f498",
"curly loop": "27b0",
"currency exchange": "1f4b1",
curry: "1f35b",
custard: "1f36e",
customs: "1f6c3",
cyclone: "1f300",
dancer: "1f483",
dancers: "1f46f",
dango: "1f361",
dart: "1f3af",
dash: "1f4a8",
date: "1f4c5",
de: "1f1e9-1f1ea",
"deciduous tree": "1f333",
"department store": "1f3ec",
"diamond shape with a dot inside": "1f4a0",
diamonds: "2666",
disappointed: "1f61e",
"disappointed relieved": "1f625",
dizzy: "1f4ab",
"dizzy face": "1f635",
"do not litter": "1f6af",
dog: "1f436",
dog2: "1f415",
dollar: "1f4b5",
dolls: "1f38e",
dolphin: "1f42c",
door: "1f6aa",
doughnut: "1f369",
dragon: "1f409",
"dragon face": "1f432",
dress: "1f457",
"dromedary camel": "1f42a",
droplet: "1f4a7",
dvd: "1f4c0",
"e-mail": "1f4e7",
ear: "1f442",
"ear of rice": "1f33e",
"earth africa": "1f30d",
"earth americas": "1f30e",
"earth asia": "1f30f",
egg: "1f373",
eggplant: "1f346",
eight: "0038",
"eight pointed black star": "2734",
"eight spoked asterisk": "2733",
"electric plug": "1f50c",
elephant: "1f418",
email: "2709",
end: "1f51a",
envelope: "2709",
"envelope with arrow": "1f4e9",
es: "1f1ea-1f1f8",
euro: "1f4b6",
"european castle": "1f3f0",
"european post office": "1f3e4",
"evergreen tree": "1f332",
exclamation: "2757",
expressionless: "1f611",
eyeglasses: "1f453",
eyes: "1f440",
facepunch: "1f44a",
factory: "1f3ed",
"fallen leaf": "1f342",
family: "1f46a",
"fast forward": "23e9",
fax: "1f4e0",
fearful: "1f628",
feelsgood: "feelsgood",
feet: "1f43e",
"ferris wheel": "1f3a1",
"file folder": "1f4c1",
finnadie: "finnadie",
fire: "1f525",
"fire engine": "1f692",
fireworks: "1f386",
"first quarter moon": "1f313",
"first quarter moon with face": "1f31b",
fish: "1f41f",
"fish cake": "1f365",
"fishing pole and fish": "1f3a3",
fist: "270a",
five: "0035",
flags: "1f38f",
flashlight: "1f526",
flipper: "1f42c",
"floppy disk": "1f4be",
"flower playing cards": "1f3b4",
flushed: "1f633",
foggy: "1f301",
football: "1f3c8",
footprints: "1f463",
"fork and knife": "1f374",
fountain: "26f2",
four: "0034",
"four leaf clover": "1f340",
fr: "1f1eb-1f1f7",
free: "1f193",
"fried shrimp": "1f364",
fries: "1f35f",
frog: "1f438",
frowning: "1f626",
fuelpump: "26fd",
"full moon": "1f315",
"full moon with face": "1f31d",
"game die": "1f3b2",
gb: "1f1ec-1f1e7",
gem: "1f48e",
gemini: "264a",
ghost: "1f47b",
gift: "1f381",
"gift heart": "1f49d",
girl: "1f467",
"globe with meridians": "1f310",
goat: "1f410",
goberserk: "goberserk",
golf: "26f3",
grapes: "1f347",
"green apple": "1f34f",
"green book": "1f4d7",
"green heart": "1f49a",
"grey exclamation": "2755",
"grey question": "2754",
grimacing: "1f62c",
grin: "1f601",
grinning: "1f600",
guardsman: "1f482",
guitar: "1f3b8",
gun: "1f52b",
haircut: "1f487",
hamburger: "1f354",
hammer: "1f528",
hamster: "1f439",
hand: "270b",
handbag: "1f45c",
hankey: "1f4a9",
hash: "0023",
"hatched chick": "1f425",
"hatching chick": "1f423",
headphones: "1f3a7",
"hear no evil": "1f649",
heart: "2764",
"heart decoration": "1f49f",
"heart eyes": "1f60d",
"heart eyes cat": "1f63b",
heartbeat: "1f493",
heartpulse: "1f497",
hearts: "2665",
"heavy check mark": "2714",
"heavy division sign": "2797",
"heavy dollar sign": "1f4b2",
"heavy exclamation mark": "2757",
"heavy minus sign": "2796",
"heavy multiplication x": "2716",
"heavy plus sign": "2795",
helicopter: "1f681",
herb: "1f33f",
hibiscus: "1f33a",
"high brightness": "1f506",
"high heel": "1f460",
hocho: "1f52a",
"honey pot": "1f36f",
honeybee: "1f41d",
horse: "1f434",
"horse racing": "1f3c7",
hospital: "1f3e5",
hotel: "1f3e8",
hotsprings: "2668",
hourglass: "231b",
"hourglass flowing sand": "23f3",
house: "1f3e0",
"house with garden": "1f3e1",
hurtrealbad: "hurtrealbad",
hushed: "1f62f",
"ice cream": "1f368",
icecream: "1f366",
id: "1f194",
"ideograph advantage": "1f250",
imp: "1f47f",
"inbox tray": "1f4e5",
"incoming envelope": "1f4e8",
"information desk person": "1f481",
"information source": "2139",
innocent: "1f607",
interrobang: "2049",
iphone: "1f4f1",
it: "1f1ee-1f1f9",
"izakaya lantern": "1f3ee",
"jack o lantern": "1f383",
japan: "1f5fe",
"japanese castle": "1f3ef",
"japanese goblin": "1f47a",
"japanese ogre": "1f479",
jeans: "1f456",
joy: "1f602",
"joy cat": "1f639",
jp: "1f1ef-1f1f5",
key: "1f511",
"keycap ten": "1f51f",
kimono: "1f458",
kiss: "1f48b",
kissing: "1f617",
"kissing cat": "1f63d",
"kissing closed eyes": "1f61a",
"kissing heart": "1f618",
"kissing smiling eyes": "1f619",
koala: "1f428",
koko: "1f201",
kr: "1f1f0-1f1f7",
lantern: "1f3ee",
"large blue circle": "1f535",
"large blue diamond": "1f537",
"large orange diamond": "1f536",
"last quarter moon": "1f317",
"last quarter moon with face": "1f31c",
laughing: "1f606",
leaves: "1f343",
ledger: "1f4d2",
"left luggage": "1f6c5",
"left right arrow": "2194",
"leftwards arrow with hook": "21a9",
lemon: "1f34b",
leo: "264c",
leopard: "1f406",
libra: "264e",
"light rail": "1f688",
link: "1f517",
lips: "1f444",
lipstick: "1f484",
lock: "1f512",
"lock with ink pen": "1f50f",
lollipop: "1f36d",
loop: "27bf",
loudspeaker: "1f4e2",
"love hotel": "1f3e9",
"love letter": "1f48c",
"low brightness": "1f505",
m: "24c2",
mag: "1f50d",
"mag right": "1f50e",
mahjong: "1f004",
mailbox: "1f4eb",
"mailbox closed": "1f4ea",
"mailbox with mail": "1f4ec",
"mailbox with no mail": "1f4ed",
man: "1f468",
"man with gua pi mao": "1f472",
"man with turban": "1f473",
"mans shoe": "1f45e",
"maple leaf": "1f341",
mask: "1f637",
massage: "1f486",
"meat on bone": "1f356",
mega: "1f4e3",
melon: "1f348",
memo: "1f4dd",
mens: "1f6b9",
metal: "metal",
metro: "1f687",
microphone: "1f3a4",
microscope: "1f52c",
"milky way": "1f30c",
minibus: "1f690",
minidisc: "1f4bd",
"mobile phone off": "1f4f4",
"money with wings": "1f4b8",
moneybag: "1f4b0",
monkey: "1f412",
"monkey face": "1f435",
monorail: "1f69d",
moon: "1f314",
"mortar board": "1f393",
"mount fuji": "1f5fb",
"mountain bicyclist": "1f6b5",
"mountain cableway": "1f6a0",
"mountain railway": "1f69e",
mouse: "1f42d",
mouse2: "1f401",
"movie camera": "1f3a5",
moyai: "1f5ff",
muscle: "1f4aa",
mushroom: "1f344",
"musical keyboard": "1f3b9",
"musical note": "1f3b5",
"musical score": "1f3bc",
mute: "1f507",
"nail care": "1f485",
"name badge": "1f4db",
neckbeard: "neckbeard",
necktie: "1f454",
"negative squared cross mark": "274e",
"neutral face": "1f610",
"new": "1f195",
"new moon": "1f311",
"new moon with face": "1f31a",
newspaper: "1f4f0",
ng: "1f196",
nine: "0039",
"no bell": "1f515",
"no bicycles": "1f6b3",
"no entry": "26d4",
"no entry sign": "1f6ab",
"no good": "1f645",
"no mobile phones": "1f4f5",
"no mouth": "1f636",
"no pedestrians": "1f6b7",
"no smoking": "1f6ad",
"non-potable water": "1f6b1",
nose: "1f443",
notebook: "1f4d3",
"notebook with decorative cover": "1f4d4",
notes: "1f3b6",
"nut and bolt": "1f529",
o: "2b55",
o2: "1f17e",
ocean: "1f30a",
octocat: "octocat",
octopus: "1f419",
oden: "1f362",
office: "1f3e2",
ok: "1f197",
"ok hand": "1f44c",
"ok woman": "1f646",
"older man": "1f474",
"older woman": "1f475",
on: "1f51b",
"oncoming automobile": "1f698",
"oncoming bus": "1f68d",
"oncoming police car": "1f694",
"oncoming taxi": "1f696",
one: "0031",
"open book": "1f4d6",
"open file folder": "1f4c2",
"open hands": "1f450",
"open mouth": "1f62e",
ophiuchus: "26ce",
"orange book": "1f4d9",
"outbox tray": "1f4e4",
ox: "1f402",
"package": "1f4e6",
"page facing up": "1f4c4",
"page with curl": "1f4c3",
pager: "1f4df",
"palm tree": "1f334",
"panda face": "1f43c",
paperclip: "1f4ce",
parking: "1f17f",
"part alternation mark": "303d",
"partly sunny": "26c5",
"passport control": "1f6c2",
"paw prints": "1f43e",
peach: "1f351",
pear: "1f350",
pencil: "1f4dd",
pencil2: "270f",
penguin: "1f427",
pensive: "1f614",
"performing arts": "1f3ad",
persevere: "1f623",
"person frowning": "1f64d",
"person with blond hair": "1f471",
"person with pouting face": "1f64e",
phone: "260e",
pig: "1f437",
pig2: "1f416",
"pig nose": "1f43d",
pill: "1f48a",
pineapple: "1f34d",
pisces: "2653",
pizza: "1f355",
"point down": "1f447",
"point left": "1f448",
"point right": "1f449",
"point up": "261d",
"point up 2": "1f446",
"police car": "1f693",
poodle: "1f429",
poop: "1f4a9",
"post office": "1f3e3",
"postal horn": "1f4ef",
postbox: "1f4ee",
"potable water": "1f6b0",
pouch: "1f45d",
"poultry leg": "1f357",
pound: "1f4b7",
"pouting cat": "1f63e",
pray: "1f64f",
princess: "1f478",
punch: "1f44a",
"purple heart": "1f49c",
purse: "1f45b",
pushpin: "1f4cc",
"put litter in its place": "1f6ae",
question: "2753",
rabbit: "1f430",
rabbit2: "1f407",
racehorse: "1f40e",
radio: "1f4fb",
"radio button": "1f518",
rage: "1f621",
rage1: "rage1",
rage2: "rage2",
rage3: "rage3",
rage4: "rage4",
"railway car": "1f683",
rainbow: "1f308",
"raised hand": "270b",
"raised hands": "1f64c",
"raising hand": "1f64b",
ram: "1f40f",
ramen: "1f35c",
rat: "1f400",
recycle: "267b",
"red car": "1f697",
"red circle": "1f534",
registered: "00ae",
relaxed: "263a",
relieved: "1f60c",
repeat: "1f501",
"repeat one": "1f502",
restroom: "1f6bb",
"revolving hearts": "1f49e",
rewind: "23ea",
ribbon: "1f380",
rice: "1f35a",
"rice ball": "1f359",
"rice cracker": "1f358",
"rice scene": "1f391",
ring: "1f48d",
rocket: "1f680",
"roller coaster": "1f3a2",
rooster: "1f413",
rose: "1f339",
"rotating light": "1f6a8",
"round pushpin": "1f4cd",
rowboat: "1f6a3",
ru: "1f1f7-1f1fa",
"rugby football": "1f3c9",
runner: "1f3c3",
running: "1f3c3",
"running shirt with sash": "1f3bd",
sa: "1f202",
sagittarius: "2650",
sailboat: "26f5",
sake: "1f376",
sandal: "1f461",
santa: "1f385",
satellite: "1f4e1",
satisfied: "1f606",
saxophone: "1f3b7",
school: "1f3eb",
"school satchel": "1f392",
scissors: "2702",
scorpius: "264f",
scream: "1f631",
"scream cat": "1f640",
scroll: "1f4dc",
seat: "1f4ba",
secret: "3299",
"see no evil": "1f648",
seedling: "1f331",
seven: "0037",
"shaved ice": "1f367",
sheep: "1f411",
shell: "1f41a",
ship: "1f6a2",
shipit: "shipit",
shirt: "1f455",
shit: "1f4a9",
shoe: "1f45e",
shower: "1f6bf",
"signal strength": "1f4f6",
six: "0036",
"six pointed star": "1f52f",
ski: "1f3bf",
skull: "1f480",
sleeping: "1f634",
sleepy: "1f62a",
"slot machine": "1f3b0",
"small blue diamond": "1f539",
"small orange diamond": "1f538",
"small red triangle": "1f53a",
"small red triangle down": "1f53b",
smile: "1f604",
"smile cat": "1f638",
smiley: "1f603",
"smiley cat": "1f63a",
"smiling imp": "1f608",
smirk: "1f60f",
"smirk cat": "1f63c",
smoking: "1f6ac",
snail: "1f40c",
snake: "1f40d",
snowboarder: "1f3c2",
snowflake: "2744",
snowman: "26c4",
sob: "1f62d",
soccer: "26bd",
soon: "1f51c",
sos: "1f198",
sound: "1f509",
"space invader": "1f47e",
spades: "2660",
spaghetti: "1f35d",
sparkle: "2747",
sparkler: "1f387",
sparkles: "2728",
"sparkling heart": "1f496",
"speak no evil": "1f64a",
speaker: "1f50a",
"speech balloon": "1f4ac",
speedboat: "1f6a4",
star: "2b50",
star2: "1f31f",
stars: "1f303",
station: "1f689",
"statue of liberty": "1f5fd",
"steam locomotive": "1f682",
stew: "1f372",
"straight ruler": "1f4cf",
strawberry: "1f353",
"stuck out tongue": "1f61b",
"stuck out tongue closed eyes": "1f61d",
"stuck out tongue winking eye": "1f61c",
"sun with face": "1f31e",
sunflower: "1f33b",
sunglasses: "1f60e",
sunny: "2600",
sunrise: "1f305",
"sunrise over mountains": "1f304",
surfer: "1f3c4",
sushi: "1f363",
"suspension railway": "1f69f",
sweat: "1f613",
"sweat drops": "1f4a6",
"sweat smile": "1f605",
"sweet potato": "1f360",
swimmer: "1f3ca",
symbols: "1f523",
syringe: "1f489",
tada: "1f389",
"tanabata tree": "1f38b",
tangerine: "1f34a",
taurus: "2649",
taxi: "1f695",
tea: "1f375",
telephone: "260e",
"telephone receiver": "1f4de",
telescope: "1f52d",
tennis: "1f3be",
tent: "26fa",
"thought balloon": "1f4ad",
three: "0033",
thumbsdown: "1f44e",
thumbsup: "1f44d",
ticket: "1f3ab",
tiger: "1f42f",
tiger2: "1f405",
"tired face": "1f62b",
tm: "2122",
toilet: "1f6bd",
"tokyo tower": "1f5fc",
tomato: "1f345",
tongue: "1f445",
top: "1f51d",
tophat: "1f3a9",
tractor: "1f69c",
"traffic light": "1f6a5",
train: "1f683",
train2: "1f686",
tram: "1f68a",
"triangular flag on post": "1f6a9",
"triangular ruler": "1f4d0",
trident: "1f531",
triumph: "1f624",
trolleybus: "1f68e",
trophy: "1f3c6",
"tropical drink": "1f379",
"tropical fish": "1f420",
truck: "1f69a",
trumpet: "1f3ba",
tshirt: "1f455",
tulip: "1f337",
turtle: "1f422",
tv: "1f4fa",
"twisted rightwards arrows": "1f500",
two: "0032",
"two hearts": "1f495",
"two men holding hands": "1f46c",
"two women holding hands": "1f46d",
u5272: "1f239",
u5408: "1f234",
u55b6: "1f23a",
u6307: "1f22f",
u6708: "1f237",
u6709: "1f236",
u6e80: "1f235",
u7121: "1f21a",
u7533: "1f238",
u7981: "1f232",
u7a7a: "1f233",
uk: "1f1ec-1f1e7",
umbrella: "2614",
unamused: "1f612",
underage: "1f51e",
unlock: "1f513",
up: "1f199",
us: "1f1fa-1f1f8",
v: "270c",
"vertical traffic light": "1f6a6",
vhs: "1f4fc",
"vibration mode": "1f4f3",
"video camera": "1f4f9",
"video game": "1f3ae",
violin: "1f3bb",
virgo: "264d",
volcano: "1f30b",
vs: "1f19a",
walking: "1f6b6",
"waning crescent moon": "1f318",
"waning gibbous moon": "1f316",
warning: "26a0",
watch: "231a",
"water buffalo": "1f403",
watermelon: "1f349",
wave: "1f44b",
"wavy dash": "3030",
"waxing crescent moon": "1f312",
"waxing gibbous moon": "1f314",
wc: "1f6be",
weary: "1f629",
wedding: "1f492",
whale: "1f433",
whale2: "1f40b",
wheelchair: "267f",
"white check mark": "2705",
"white circle": "26aa",
"white flower": "1f4ae",
"white large square": "2b1c",
"white medium small square": "25fd",
"white medium square": "25fb",
"white small square": "25ab",
"white square button": "1f533",
"wind chime": "1f390",
"wine glass": "1f377",
wink: "1f609",
wolf: "1f43a",
woman: "1f469",
"womans clothes": "1f45a",
"womans hat": "1f452",
womens: "1f6ba",
worried: "1f61f",
wrench: "1f527",
x: "274c",
"yellow heart": "1f49b",
yen: "1f4b4",
yum: "1f60b",
zap: "26a1",
zero: "0030",
zzz: "1f4a4"
});
define('wunderbits/mixins/EmojiData',[ "wunderbits/data/emoji", "wb!core/WBSingleton" ], function(e, t) {

var n = {};
for (var r in e) n[e[r]] = r;
return t.extend({
raw: e,
unicodeIndex: n,
nameIndex: e
});
});
define('wunderbits/helpers/strings',[ "../lib/dependencies", "wb!core/WBSingleton", "../mixins/EmojiData" ], function(e, t, n) {

var r = e.$, i = e._;
return t.extend({
fromCodePoint: function() {
var e, t, n, r, i = [];
for (r = 0; r < arguments.length; ++r) e = arguments[r], t = e - 65536, n = e > 65535 ? [ 55296 + (t >> 10), 56320 + (1023 & t) ] : [ e ], 
i.push(String.fromCharCode.apply(null, n));
return i.join("");
},
emojiTokensToUnicode: function(e) {
var t = this;
return e = e.replace(/:[^:|.]+:/g, function(e) {
var r = e.replace(/:/g, ""), i = n.nameIndex[r];
return i && (e = t.fromCodePoint("0x" + i)), e;
});
},
unicodeAt: function(e, t) {
t = t || 0;
var n, r, i = e.charCodeAt(t);
if (i >= 55296 && 56319 >= i) {
if (n = i, r = e.charCodeAt(t + 1), isNaN(r)) throw new Error("High surrogate not followed by low surrogate in unicodeAt()");
return 1024 * (n - 55296) + (r - 56320) + 65536;
}
return i >= 56320 && 57343 >= i ? !1 : i;
},
replaceAt: function(e, t, n, r) {
var i = e.substring(0, t), o = e.substring(t + 1 + r);
return e = i + n + o;
},
contains: function(e, t) {
var n = this;
return i.isArray(t) ? n.containsArray(e, t) : n.containsString(e, t);
},
containsString: function(e, t) {
for (var n = !1, r = 0; r < e.length; r++) e[r] === t && (n = !0, r = e.length);
return n;
},
containsArray: function(e, t) {
for (var n = this, r = !1, i = 0; i < t.length; i++) n.containsString(e, t[i]) && (r = !0, 
i = t.length);
return r;
},
trim: function(e, t) {
return t = t || 500, e = (e || "").replace(/\n{3,}/g, "\n\n"), e = e.replace(/\s{3,}/g, " "), 
e = r.trim(e), e.length > t && (e = e.substring(0, t - 3) + "..."), e;
},
pad: function(e, t, n) {
for (e = String(e); e.length < t; ) e = n ? e + "0" : "0" + e;
return e;
},
convertValueToString: function(e) {
return i.isString(e) ? e : i.isNull(e) ? "null" : i.isBoolean(e) ? e ? "true" : "false" : "" + e;
},
capitalizeFirstLetter: function(e) {
return e.charAt(0).toUpperCase() + e.slice(1);
},
sanitizeHash: function(e) {
var t = e.split("/"), n = "FILTERED", r = /^(lw[0-9a-z]{30,32})|(\d+)$/, i = /access_token/;
return "login" === t[1] ? t[2] && i.test(t[2]) && (t[2] = "FACEBOOK_LOGIN") : "tasks" !== t[1] && "lists" !== t[1] || !r.test(t[2]) ? "extension" === t[1] && "add" === t[2] || "reset" === t[1] && "password" === t[2] || "connect" === t[1] && "facebook" === t[2] ? (t[3] && (t[3] = n), 
t[4] && (t[4] = n), t = t.splice(0, 5)) : "add" === t[1] || "search" === t[1] ? t[2] && (t[2] = n) : "shared" === t[1] && ("fb" === t[2] ? t[3] && (t[3] = n) : (t[2] && (t[2] = n), 
t[3] && (t[3] = n))) : t[2] = n, "lists" === t[1] && /share.+/.test(t[3]) && (/access_token/.test(t[3]) ? t[3] = "share/CONNECT_FACEBOOK_RETURN" : "share" !== t[3] && (t[3] = "share/FACEBOOK_SHARE_RETURN")), 
t.join("/");
},
dateString: function() {
var e = this, t = new Date(), n = e.pad(t.getHours() + 1, 2) + ":" + e.pad(t.getMinutes(), 2) + ":" + e.pad(t.getSeconds(), 2);
return t.getFullYear() + e.pad(t.getMonth() + 1, 2) + e.pad(t.getDate()) + "-" + n;
},
escapeForRegex: function(e) {
return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
});
});
define('vendor/ga',[ "wunderbits/helpers/strings" ], function(e) {

function t(e, t) {
return e.name = t;
}
function n(e, t) {
switch (t) {
case 0:
return "" + e;

case 1:
return 1 * e;

case 2:
return !!e;

case 3:
return 1e3 * e;
}
return e;
}
function r(e) {
return "function" == typeof e;
}
function i(e) {
return e != P && -1 < (e.constructor + "")[rt]("String");
}
function o(e, t) {
return P === e || "-" === e && !t || "" === e;
}
function a(e) {
if (!e || "" === e) return "";
for (;e && -1 < " \n\r	"[rt](e[tt](0)); ) e = e[wt](1);
for (;e && -1 < " \n\r	"[rt](e[tt](e[lt] - 1)); ) e = e[wt](0, e[lt] - 1);
return e;
}
function s() {
return V.round(2147483647 * V.random());
}
function u() {}
function c(e, t) {
return U instanceof Function ? t ? encodeURI(e) : U(e) : (B(68), escape(e));
}
function f(e) {
if (e = e[pt]("+")[Et](" "), K instanceof Function) try {
return K(e);
} catch (t) {
B(17);
} else B(68);
return unescape(e);
}
function l(e, t) {
if (e) {
var n = q[at]("script");
n.type = "text/javascript", n.async = L, n.src = e, n.id = t;
var r = q.getElementsByTagName("script")[0];
return r.parentNode.insertBefore(n, r), n;
}
}
function d(e) {
return e && 0 < e[lt] ? e[0] : "";
}
function h(e) {
var t = e ? e[lt] : 0;
return t > 0 ? e[t - 1] : "";
}
function p(e) {
return 0 == e[rt]("www.") && (e = e[wt](4)), e[Tt]();
}
function g(e, t) {
var n, r = {
url: e,
protocol: "http",
host: "",
path: "",
d: new Bt(),
anchor: ""
};
return e ? (n = e[rt]("://"), n >= 0 && (r.protocol = e[wt](0, n), e = e[wt](n + 3)), 
n = e[yt]("/|\\?|#"), n >= 0 ? (r.host = e[wt](0, n)[Tt](), e = e[wt](n), n = e[rt]("#"), 
n >= 0 && (r.anchor = e[wt](n + 1), e = e[wt](0, n)), n = e[rt]("?"), n >= 0 && (v(r.d, e[wt](n + 1)), 
e = e[wt](0, n)), r.anchor && t && v(r.d, r.anchor), e && "/" == e[tt](0) && (e = e[wt](1)), 
r.path = e, r) : (r.host = e[Tt](), r)) : r;
}
function m(e, t) {
function n(e) {
var t = (e.hostname || "")[pt](":")[0][Tt](), n = (e[bt] || "")[Tt](), n = 1 * e[ot] || ("http:" == n ? 80 : "https:" == n ? 443 : "");
return e = e.pathname || "", 0 == e[rt]("/") || (e = "/" + e), [ t, "" + n, e ];
}
var r = t || q[at]("a");
r.href = document.location.href;
var i = (r[bt] || "")[Tt](), o = n(r), a = r[yt] || "", s = i + "//" + o[0] + (o[1] ? ":" + o[1] : "");
return 0 == e[rt]("//") ? e = i + e : 0 == e[rt]("/") ? e = s + e : e && 0 != e[rt]("?") ? 0 > e[pt]("/")[0][rt](":") && (e = s + o[2][wt](0, o[2].lastIndexOf("/")) + "/" + e) : e = s + o[2] + (e || a), 
r.href = e, i = n(r), {
protocol: (r[bt] || "")[Tt](),
host: i[0],
port: i[1],
path: i[2],
Oa: r[yt] || "",
url: e || ""
};
}
function v(e, t) {
function n(t, n) {
e.contains(t) || e.set(t, []), e.get(t)[Y](n);
}
for (var r = a(t)[pt]("&"), i = 0; i < r[lt]; i++) if (r[i]) {
var o = r[i][rt]("=");
0 > o ? n(r[i], "1") : n(r[i][wt](0, o), r[i][wt](o + 1));
}
}
function y(e, t) {
if (o(e) || "[" == e[tt](0) && "]" == e[tt](e[lt] - 1)) return "-";
var n = q.domain;
return e[rt](n + (t && "/" != t ? t : "")) == (0 == e[rt]("http://") ? 7 : 0 == e[rt]("https://") ? 8 : 0) ? "0" : e;
}
function b(e, t, n) {
!(At >= 1 || 1 <= 100 * V.random() || (e = [ "utmt=error", "utmerr=" + e, "utmwv=5.3.8", "utmn=" + s(), "utmsp=1" ], 
t && e[Y]("api=" + t), n && e[Y]("msg=" + c(n[wt](0, 100))), so.w && e[Y]("aip=1"), 
ro(e[Et]("&")), !At++));
}
function x(e) {
return w("x" + Dt++, e);
}
function w(e, t) {
return jt[e] = !!t, e;
}
function _(e) {
var t = this.plugins_;
return t ? t.get(e) : void 0;
}
function k(e, t) {
t = t || [];
for (var n = 0; n < t[lt]; n++) {
var r = t[n];
if ("" + e == r || 0 == r[rt](e + ".")) return r;
}
return "-";
}
function E(e) {
100 != e.get(on) && e.get(Bn) % 1e4 >= 100 * e.get(on) && e[gt]();
}
function T(e) {
zr(e.get(Mt)) && e[gt]();
}
function S(e) {
"file:" == document.location.protocol && e[gt]();
}
function C(e) {
var t = R ? "/" : location.pathname;
e.get(yn) || e.set(yn, window.gitHash || q.title, L), e.get(vn) || e.set(vn, t + document.location.search, L);
}
function B(e) {
Hr.set(e);
}
function A(e) {
return "string" == typeof e;
}
function D(e) {
return ("number" == typeof e || P != Number && e instanceof Number) && V.round(e) == e && 0/0 != e && e != $ ? L : z;
}
function j(e) {
var t, n = 1, r = 0;
if (e) for (n = 0, t = e[lt] - 1; t >= 0; t--) r = e.charCodeAt(t), n = (n << 6 & 268435455) + r + (r << 14), 
r = 266338304 & n, n = 0 != r ? n ^ r >> 21 : n;
return n;
}
function M(e) {
if (!/^UA\-/.test(e)) throw new Error("invalid account passed to ga.js");
if (N.push([ "_setAccount", e ]), lo.gaq = co, !ao(fo)) {
B(123);
var t = z, n = function() {
!t && ao(fo) && (t = L, Ct(q, "webkitvisibilitychange", n));
};
St(q, "webkitvisibilitychange", n);
}
}
var N = [], O = {}, W = window, q = document, R = W.chrome && (W.chrome.runtime || W.chrome.app && W.chrome.app.runtime), I = "object" == typeof process;
(R || I) && (q.__defineSetter__("cookie", function(e) {
var t = e.indexOf(";");
if (!(0 > t)) {
var n = e.substring(0, e.indexOf("="));
O[n] = e.substring(n.length + 1, t);
}
}), q.__defineGetter__("cookie", function() {
var e = [];
for (var t in O) e.push(t + "=" + O[t]);
return e.join("; ");
}), W.history.__defineGetter__("length", function() {
return 0;
}));
var F, P = void 0, L = !0, H = null, z = !1, U = encodeURIComponent, $ = 1/0, X = setTimeout, V = Math, K = decodeURIComponent, Y = "push", G = "test", J = "slice", Q = "replace", Z = "load", et = "floor", tt = "charAt", nt = "value", rt = "indexOf", it = "match", ot = "port", at = "createElement", st = "path", ut = "name", ct = "host", ft = "toString", lt = "length", dt = "prototype", ht = "clientWidth", pt = "split", gt = "stopPropagation", mt = "scope", vt = "location", yt = "search", bt = "protocol", xt = "clientHeight", wt = "substring", _t = "apply", kt = "navigator", Et = "join", Tt = "toLowerCase", St = function(e, t, n, r) {
e.addEventListener ? e.addEventListener(t, n, !!r) : e.attachEvent && e.attachEvent("on" + t, n);
}, Ct = function(e, t, n, r) {
e.removeEventListener ? e.removeEventListener(t, n, !!r) : e.detachEvent && e.detachEvent("on" + t, n);
}, Bt = function() {
this.prefix = "ga.", this.R = {};
};
Bt[dt].set = function(e, t) {
this.R[this.prefix + e] = t;
}, Bt[dt].get = function(e) {
return this.R[this.prefix + e];
}, Bt[dt].contains = function(e) {
return this.get(e) !== P;
};
var At = 0, Dt = 0, jt = {}, Mt = x(), Nt = w("anonymizeIp"), Ot = x(), Wt = x(), qt = x(), Rt = x(), It = x(), Ft = x(), Pt = x(), Lt = x(), Ht = x(), zt = x(), Ut = x(), $t = x(), Xt = x(), Vt = x(), Kt = x(), Yt = x(), Gt = x(), Jt = x(), Qt = x(), Zt = x(), en = x(), tn = x(), nn = x(), rn = x(), on = x(), an = x(), sn = x(), un = x(), cn = x(), fn = x(), ln = x(), dn = x(), hn = x(), pn = x(), gn = x(L), mn = w("currencyCode"), vn = w("page"), yn = w("title"), bn = x(), xn = x(), wn = x(), _n = x(), kn = x(), En = x(), Tn = x(), Sn = x(), Cn = x(), Bn = x(L), An = x(L), Dn = x(L), jn = x(L), Mn = x(L), Nn = x(L), On = x(L), Wn = x(L), qn = x(L), Rn = x(L), In = x(L), Fn = x(L), Pn = x(L), Ln = x(L), Hn = x(L), zn = x(L), Un = x(L), $n = x(L), Xn = x(L), Vn = x(L), Kn = x(L), Yn = x(L), Gn = x(L), Jn = x(L), Qn = x(L), Zn = x(L), er = x(L), tr = w("campaignParams"), nr = x(), rr = w("hitCallback"), ir = x();
x();
var or = x(), ar = x(), sr = x(), ur = x(), cr = x(), fr = x(), lr = x(), dr = x(), hr = x(), pr = x(), gr = x(), mr = x(), vr = x(), yr = x();
x();
var br = x(), xr = x(), wr = x(), _r = function(e, t, n, r) {
e[t] = function() {
try {
return r != P && B(r), n[_t](this, arguments);
} catch (e) {
throw b("exc", t, e && e[ut]), e;
}
};
}, kr = function(e, t, r, i) {
Fi[dt][e] = function() {
try {
return B(r), n(this.a.get(t), i);
} catch (o) {
throw b("exc", e, o && o[ut]), o;
}
};
}, Er = function(e, t, r, i, o) {
Fi[dt][e] = function(a) {
try {
B(r), o == P ? this.a.set(t, n(a, i)) : this.a.set(t, o);
} catch (s) {
throw b("exc", e, s && s[ut]), s;
}
};
}, Tr = RegExp(/(^|\.)doubleclick\.net$/i), Sr = function(e, t) {
return Tr[G](document.location.hostname) ? L : "/" !== t ? z : 0 != e[rt]("www.google.") && 0 != e[rt](".google.") && 0 != e[rt]("google.") || -1 < e[rt]("google.org") ? z : L;
}, Cr = function(e) {
var t = e.get(Rt), n = e.c(Ft, "/");
Sr(t, n) && e[gt]();
}, Br = function() {
var e = {}, t = {}, n = new Fr();
this.g = function(e, t) {
n.add(e, t);
};
var r = new Fr();
this.e = function(e, t) {
r.add(e, t);
};
var i = z, o = z, a = L;
this.T = function() {
i = L;
}, this.j = function(e) {
this[Z](), this.set(nr, e, L), e = new Ar(this), i = z, r.execute(this), i = L, 
t = {}, this.n(), e.Ja();
}, this.load = function() {
i && (i = z, this.Ka(), si(this), o || (o = L, n.execute(this), ai(this), si(this)), 
i = L);
}, this.n = function() {
i && (o ? (i = z, ai(this), i = L) : this[Z]());
}, this.get = function(n) {
return jt[n] && this[Z](), t[n] !== P ? t[n] : e[n];
}, this.set = function(n, r, i) {
jt[n] && this[Z](), i ? t[n] = r : e[n] = r, jt[n] && this.n();
}, this.z = function(t) {
e[t] = this.b(t, 0) + 1;
}, this.b = function(e, t) {
var n = this.get(e);
return n == P || "" === n ? t : 1 * n;
}, this.c = function(e, t) {
var n = this.get(e);
return n == P ? t : n + "";
}, this.Ka = function() {
if (a) {
var t = this.c(Rt, ""), n = this.c(Ft, "/");
Sr(t, n) || (e[It] = e[$t] && "" != t ? j(t) : 1, a = z);
}
};
};
Br[dt].stopPropagation = function() {
if (!R && !I) throw "aborted";
};
var Ar = function(e) {
var t = this;
this.q = 0;
var n = e.get(rr);
this.Ua = function() {
0 < t.q && n && (t.q--, t.q || n());
}, this.Ja = function() {
!t.q && n && X(n, 10);
}, e.set(ir, t, L);
}, Dr = function(e, t, n) {
if (n = n ? "" : e.c(It, "1"), t = t[pt]("."), 6 !== t[lt] || Ir(t[0], n)) return z;
n = 1 * t[1];
var r = 1 * t[2], i = 1 * t[3], o = 1 * t[4];
return t = 1 * t[5], n >= 0 && r > 0 && i > 0 && o > 0 && t >= 0 ? (e.set(Bn, n), 
e.set(Mn, r), e.set(Nn, i), e.set(On, o), e.set(Wn, t), L) : z;
}, jr = function(e) {
var t = e.get(Bn), n = e.get(Mn), r = e.get(Nn), i = e.get(On), o = e.b(Wn, 1);
return [ e.b(It, 1), t != P ? t : "-", n || "-", r || "-", i || "-", o ][Et](".");
}, Mr = function(e) {
return [ e.b(It, 1), e.b(In, 0), e.b(Fn, 1), e.b(Pn, 0) ][Et](".");
}, Nr = function(e, t, n) {
n = n ? "" : e.c(It, "1");
var r = t[pt](".");
return (4 !== r[lt] || Ir(r[0], n)) && (r = H), e.set(In, r ? 1 * r[1] : 0), e.set(Fn, r ? 1 * r[2] : 10), 
e.set(Pn, r ? 1 * r[3] : e.get(qt)), r != H || !Ir(t, n);
}, Or = function(e, t) {
var n = c(e.c(Dn, "")), r = [], i = e.get(gn);
if (!t && i) {
for (var o = 0; o < i[lt]; o++) {
var a = i[o];
a && 1 == a[mt] && r[Y](o + "=" + c(a[ut]) + "=" + c(a[nt]) + "=1");
}
0 < r[lt] && (n += "|" + r[Et]("^"));
}
return n ? e.b(It, 1) + "." + n : H;
}, Wr = function(e, n, r) {
if (r = r ? "" : e.c(It, "1"), n = n[pt]("."), 2 > n[lt] || Ir(n[0], r)) return z;
if (n = n[J](1)[Et](".")[pt]("|"), 0 < n[lt] && e.set(Dn, f(n[0])), 1 >= n[lt]) return L;
for (n = n[1][pt](-1 == n[1][rt](",") ? "^" : ","), r = 0; r < n[lt]; r++) {
var i = n[r][pt]("=");
if (4 == i[lt]) {
var o = {};
t(o, f(i[1])), o.value = f(i[2]), o.scope = 1, e.get(gn)[i[0]] = o;
}
}
return L;
}, qr = function(e) {
var t;
t = function(t, r) {
if (!o(e.get(t))) {
var i = e.c(t, ""), i = i[pt](" ")[Et]("%20"), i = i[pt]("+")[Et]("%20");
n[Y](r + "=" + i);
}
};
var n = [];
return t($n, "utmcid"), t(Jn, "utmcsr"), t(Vn, "utmgclid"), t(Kn, "utmgclsrc"), 
t(Yn, "utmdclid"), t(Gn, "utmdsid"), t(Xn, "utmccn"), t(Qn, "utmcmd"), t(Zn, "utmctr"), 
t(er, "utmcct"), (t = n[Et]("|")) ? [ e.b(It, 1), e.b(Ln, 0), e.b(Hn, 1), e.b(zn, 1), t ][Et](".") : "";
}, Rr = function(e, t, n) {
if (n = n ? "" : e.c(It, "1"), t = t[pt]("."), 5 > t[lt] || Ir(t[0], n)) return e.set(Ln, P), 
e.set(Hn, P), e.set(zn, P), e.set($n, P), e.set(Xn, P), e.set(Jn, P), e.set(Qn, P), 
e.set(Zn, P), e.set(er, P), e.set(Vn, P), e.set(Kn, P), e.set(Yn, P), e.set(Gn, P), 
z;
e.set(Ln, 1 * t[1]), e.set(Hn, 1 * t[2]), e.set(zn, 1 * t[3]);
var r = t[J](4)[Et](".");
t = function(e) {
return (e = r[it](e + "=(.*?)(?:\\|utm|$)")) && 2 == e[lt] ? e[1] : P;
}, n = function(t, n) {
n ? (n = i ? f(n) : n[pt]("%20")[Et](" "), e.set(t, n)) : e.set(t, P);
}, -1 == r[rt]("=") && (r = f(r));
var i = "2" == t("utmcvr");
return n($n, t("utmcid")), n(Xn, t("utmccn")), n(Jn, t("utmcsr")), n(Qn, t("utmcmd")), 
n(Zn, t("utmctr")), n(er, t("utmcct")), n(Vn, t("utmgclid")), n(Kn, t("utmgclsrc")), 
n(Yn, t("utmdclid")), n(Gn, t("utmdsid")), L;
}, Ir = function(e, t) {
return t ? e != t : !/^\d+$/[G](e);
}, Fr = function() {
this.filters = [];
};
Fr[dt].add = function(e, t) {
this.filters[Y]({
name: e,
s: t
});
}, Fr[dt].execute = function(e) {
var t, n;
try {
for (t = 0, n = this.filters.length; n > t; t++) this.filters[t].s.call(W, e);
} catch (r) {}
};
var Pr, Lr, Hr = new function() {
var e = [];
this.set = function(t) {
e[t] = L;
}, this.Xa = function() {
for (var t = [], n = 0; n < e[lt]; n++) e[n] && (t[V[et](n / 6)] = t[V[et](n / 6)] ^ 1 << n % 6);
for (n = 0; n < t[lt]; n++) t[n] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[tt](t[n] || 0);
return t[Et]("") + "~";
};
}(), zr = function(e) {
var t = W._gaUserPrefs;
return t && t.ioo && t.ioo() || !!e && W["ga-disable-" + e] === L;
}, Ur = function(e) {
var t = [], n = q.cookie[pt](";");
e = RegExp("^\\s*" + e + "=\\s*(.*?)\\s*$");
for (var r = 0; r < n[lt]; r++) {
var i = n[r][it](e);
i && t[Y](i[1]);
}
return t;
}, $r = function(e, t, n, r, i, o) {
if (i = zr(i) ? z : Sr(r, n) ? z : L) {
if (t && 0 <= W[kt].userAgent[rt]("Firefox")) {
t = t[Q](/\n|\r/g, " "), i = 0;
for (var a = t[lt]; a > i; ++i) {
var s = 255 & t.charCodeAt(i);
(10 == s || 13 == s) && (t = t[wt](0, i) + "?" + t[wt](i + 1));
}
}
t && 2e3 < t[lt] && (t = t[wt](0, 2e3), B(69)), e = e + "=" + t + "; path=" + n + "; ", 
o && (e += "expires=" + new Date(new Date().getTime() + o).toGMTString() + "; "), 
r && (e += "domain=" + r + ";"), q.cookie = e;
}
}, Xr = function() {
if (!Pr) {
var e = {}, t = W[kt], n = W.screen;
e.Q = n ? n.width + "x" + n.height : "-", e.P = n ? n.colorDepth + "-bit" : "-", 
e.language = (t && (t.language || t.browserLanguage) || "-")[Tt](), e.javaEnabled = t && t.javaEnabled() ? 1 : 0, 
e.characterSet = q.characterSet || q.charset || "-";
try {
var r = q.documentElement, i = q.body, o = i && i[ht] && i[xt], t = [];
r && r[ht] && r[xt] && ("CSS1Compat" === q.compatMode || !o) ? t = [ r[ht], r[xt] ] : o && (t = [ i[ht], i[xt] ]), 
e.Wa = t[Et]("x");
} catch (a) {
B(135);
}
Pr = e;
}
}, Vr = function() {
Xr();
var e = Pr, t = W[kt], n = t.userAgent;
R && (n = "ChromeApp/" + t.platform + "/" + window.gitHash);
for (var r = q.cookie ? q.cookie : "", i = q.referrer ? q.referrer : "", o = W.history.length, a = t.appName + t.version + e.language + t.platform + n + e.javaEnabled + e.Q + e.P + r + i, s = a.length; o > 0; ) a += o-- ^ s++;
return j(a);
}, Kr = function(e) {
Xr();
var t = Pr;
if (e.set(wn, t.Q), e.set(_n, t.P), e.set(Tn, t.language), e.set(Sn, t.characterSet), 
e.set(kn, t.javaEnabled), e.set(Cn, t.Wa), e.get(Xt) && e.get(Vt)) {
if (!(t = Lr)) {
var n, r, i;
if (r = "ShockwaveFlash", (t = (t = W[kt]) ? t.plugins : P) && 0 < t[lt]) for (n = 0; n < t[lt] && !i; n++) r = t[n], 
-1 < r[ut][rt]("Shockwave Flash") && (i = r.description[pt]("Shockwave Flash ")[1]); else {
r = r + "." + r;
try {
n = new ActiveXObject(r + ".7"), i = n.GetVariable("$version");
} catch (o) {}
if (!i) try {
n = new ActiveXObject(r + ".6"), i = "WIN 6,0,21,0", n.AllowScriptAccess = "always", 
i = n.GetVariable("$version");
} catch (a) {}
if (!i) try {
n = new ActiveXObject(r), i = n.GetVariable("$version");
} catch (s) {}
i && (i = i[pt](" ")[1][pt](","), i = i[0] + "." + i[1] + " r" + i[2]);
}
t = i ? i : "-";
}
Lr = t, e.set(En, Lr);
} else e.set(En, "-");
}, Yr = function(e) {
if (r(e)) this.s = e; else {
var t = e[0], n = t.lastIndexOf(":"), i = t.lastIndexOf(".");
this.h = this.i = this.l = "", -1 == n && -1 == i ? this.h = t : -1 == n && -1 != i ? (this.i = t[wt](0, i), 
this.h = t[wt](i + 1)) : -1 != n && -1 == i ? (this.l = t[wt](0, n), this.h = t[wt](n + 1)) : n > i ? (this.i = t[wt](0, i), 
this.l = t[wt](i + 1, n), this.h = t[wt](n + 1)) : (this.i = t[wt](0, i), this.h = t[wt](i + 1)), 
this.k = e[J](1), this.Ma = !this.l && "_require" == this.h, this.J = !this.i && !this.l && "_provide" == this.h;
}
}, Gr = function() {
_r(Gr[dt], "push", Gr[dt][Y], 5), _r(Gr[dt], "_getPlugin", _, 121), _r(Gr[dt], "_createAsyncTracker", Gr[dt].Sa, 33), 
_r(Gr[dt], "_getAsyncTracker", Gr[dt].Ta, 34), this.I = new Bt(), this.p = [];
};
F = Gr[dt], F.Na = function(e, t, n) {
var i = this.I.get(e);
return r(i) ? (t.plugins_ = t.plugins_ || new Bt(), t.plugins_.set(e, new i(t, n || {})), 
L) : z;
}, F.push = function() {
var e = co.Va[_t](this, arguments), e = co.p.concat(e);
for (co.p = []; 0 < e[lt] && !co.O(e[0]) && (e.shift(), !(0 < co.p[lt])); ) ;
return co.p = co.p.concat(e), 0;
}, F.Va = function() {
for (var e = [], t = 0; t < arguments[lt]; t++) try {
var n = new Yr(arguments[t]);
n.J ? this.O(n) : e[Y](n);
} catch (r) {}
return e;
}, F.O = function(e) {
try {
if (e.s) e.s[_t](W); else if (e.J) this.I.set(e.k[0], e.k[1]); else {
var t = "_gat" == e.i ? so : "_gaq" == e.i ? co : so.u(e.i);
if (e.Ma) {
if (!this.Na(e.k[0], t, e.k[2])) {
if (!e.Pa) {
var n, r = m("" + e.k[1]), i = r[bt], o = document.location.protocol;
if (n = "https:" == i || i == o ? L : "http:" != i ? z : "http:" == o) {
var a;
e: {
var s = m(document.location.href);
if (!(r.Oa || 0 <= r.url[rt]("?") || 0 <= r[st][rt]("://") || r[ct] == s[ct] && r[ot] == s[ot])) for (var u = "http:" == r[bt] ? 80 : 443, c = so.S, t = 0; t < c[lt]; t++) if (r[ct] == c[t][0] && (r[ot] || u) == (c[t][1] || u) && 0 == r[st][rt](c[t][2])) {
a = L;
break e;
}
a = z;
}
n = a && !zr();
}
n && (e.Pa = l(r.url));
}
return L;
}
} else e.l && (t = t.plugins_.get(e.l)), t[e.h][_t](t, e.k);
}
} catch (f) {}
}, F.Sa = function(e, t) {
return so.r(e, t || "");
}, F.Ta = function(e) {
return so.u(e);
};
var Jr, Qr, Zr, ei, ti = function() {
function e(e, t, n, r) {
P == o[e] && (o[e] = {}), P == o[e][t] && (o[e][t] = []), o[e][t][n] = r;
}
function t(e, t, n) {
return P != o[e] && P != o[e][t] ? o[e][t][n] : void 0;
}
function n(e, t) {
if (P != o[e] && P != o[e][t]) {
o[e][t] = P;
var n, r = L;
for (n = 0; n < a[lt]; n++) if (P != o[e][a[n]]) {
r = z;
break;
}
r && (o[e] = P);
}
}
function r(e) {
var t, n, r = "", i = z;
for (t = 0; t < a[lt]; t++) if (n = e[a[t]], P != n) {
i && (r += a[t]);
for (var i = [], o = P, h = P, h = 0; h < n[lt]; h++) if (P != n[h]) {
o = "", h != d && P == n[h - 1] && (o += h[ft]() + f);
for (var p = n[h], g = "", m = P, v = P, y = P, m = 0; m < p[lt]; m++) v = p[tt](m), 
y = l[v], g += P != y ? y : v;
o += g, i[Y](o);
}
r += s + i[Et](c) + u, i = z;
} else i = L;
return r;
}
var i = this, o = [], a = [ "k", "v" ], s = "(", u = ")", c = "*", f = "!", l = {
"'": "'0"
};
l[u] = "'1", l[c] = "'2", l[f] = "'3";
var d = 1;
i.Ra = function(e) {
return P != o[e];
}, i.A = function() {
for (var e = "", t = 0; t < o[lt]; t++) P != o[t] && (e += t[ft]() + r(o[t]));
return e;
}, i.Qa = function(e) {
if (e == P) return i.A();
for (var t = e.A(), n = 0; n < o[lt]; n++) P != o[n] && !e.Ra(n) && (t += n[ft]() + r(o[n]));
return t;
}, i.f = function(t, n, r) {
return A(r) ? (e(t, "k", n, r), L) : z;
}, i.o = function(t, n, r) {
return D(r) ? (e(t, "v", n, r[ft]()), L) : z;
}, i.getKey = function(e, n) {
return t(e, "k", n);
}, i.N = function(e, n) {
return t(e, "v", n);
}, i.L = function(e) {
n(e, "k");
}, i.M = function(e) {
n(e, "v");
}, _r(i, "_setKey", i.f, 89), _r(i, "_setValue", i.o, 90), _r(i, "_getKey", i.getKey, 87), 
_r(i, "_getValue", i.N, 88), _r(i, "_clearKey", i.L, 85), _r(i, "_clearValue", i.M, 86);
}, ni = function(e) {
var t = W.gaGlobal;
return e && !t && (W.gaGlobal = t = {}), t;
}, ri = function() {
var e = ni(L).hid;
return e == H && (e = s(), ni(L).hid = e), e;
}, ii = function(e) {
e.set(xn, ri());
var t = ni();
if (t && t.dh == e.get(It)) {
var n = t.sid;
n && ("0" == n && B(112), e.set(On, n), e.get(An) && e.set(Nn, n)), t = t.vid, e.get(An) && t && (t = t[pt]("."), 
1 * t[1] || B(112), e.set(Bn, 1 * t[0]), e.set(Mn, 1 * t[1]));
}
}, oi = function(e, t, n) {
var r = e.c(Rt, ""), i = e.c(Ft, "/"), o = e.b(Pt, 0);
e = e.c(Mt, ""), $r(t, n, i, r, e, o);
}, ai = function(e) {
var t = e.c(Rt, "");
e.b(It, 1);
var n = e.c(Ft, "/"), r = e.c(Mt, "");
$r("__utma", jr(e), n, t, r, e.get(Pt)), $r("__utmb", Mr(e), n, t, r, e.get(Lt)), 
$r("__utmc", "" + e.b(It, 1), n, t, r);
var i = qr(e, L);
i ? $r("__utmz", i, n, t, r, e.get(Ht)) : $r("__utmz", "", n, t, "", -1), (i = Or(e, z)) ? $r("__utmv", i, n, t, r, e.get(Pt)) : $r("__utmv", "", n, t, "", -1);
}, si = function(e) {
var t = e.b(It, 1);
if (!Dr(e, k(t, Ur("__utma")))) return e.set(jn, L), z;
var n = !Nr(e, k(t, Ur("__utmb")));
return e.set(Rn, n), Rr(e, k(t, Ur("__utmz"))), Wr(e, k(t, Ur("__utmv"))), Jr = !n, 
L;
}, ui = function(e) {
!Jr && !(0 < Ur("__utmb")[lt]) && ($r("__utmd", "1", e.c(Ft, "/"), e.c(Rt, ""), e.c(Mt, ""), 1e4), 
0 == Ur("__utmd")[lt] && e[gt]());
}, ci = function(e) {
e.get(Bn) == P ? li(e) : e.get(jn) && !e.get(br) ? li(e) : e.get(Rn) && di(e);
}, fi = function(e) {
e.get(Un) && !e.get(qn) && (di(e), e.set(Hn, e.get(Wn)));
}, li = function(e) {
var t = e.get(qt);
e.set(An, L), e.set(Bn, s() ^ 2147483647 & Vr(e)), e.set(Dn, ""), e.set(Mn, t), 
e.set(Nn, t), e.set(On, t), e.set(Wn, 1), e.set(qn, L), e.set(In, 0), e.set(Fn, 10), 
e.set(Pn, t), e.set(gn, []), e.set(jn, z), e.set(Rn, z);
}, di = function(e) {
e.set(Nn, e.get(On)), e.set(On, e.get(qt)), e.z(Wn), e.set(qn, L), e.set(In, 0), 
e.set(Fn, 10), e.set(Pn, e.get(qt)), e.set(Rn, z);
}, hi = "daum:q eniro:search_word naver:query pchome:q images.google:q google:q yahoo:p yahoo:q msn:q bing:q aol:query aol:q lycos:q lycos:query ask:q netscape:query cnn:query about:terms mamma:q voila:rdata virgilio:qs live:q baidu:wd alice:qs yandex:text najdi:q seznam:q rakuten:qt biglobe:q goo.ne:MT wp:szukaj onet:qt yam:k kvasir:q ozu:q terra:query rambler:query conduit:q babylon:q search-results:q avg:q comcast:q incredimail:q startsiden:q go.mail.ru:q search.centrum.cz:q".split(" "), pi = function(e) {
if (e.get(Kt) && !e.get(br)) {
for (var t = !(o(e.get($n)) && o(e.get(Jn)) && o(e.get(Vn)) && o(e.get(Yn))), n = {}, r = 0; r < yi[lt]; r++) {
var i = yi[r];
n[i] = e.get(i);
}
if ((r = e.get(tr)) ? (B(149), i = new Bt(), v(i, r), r = i) : r = g(document.location.href, e.get(Ut)).d, 
"1" != h(r.get(e.get(rn))) || !t) {
var a = r, s = function(t, n) {
n = n || "-";
var r = h(a.get(e.get(t)));
return r && "-" != r ? f(r) : n;
}, r = h(a.get(e.get(Gt))) || "-", i = h(a.get(e.get(Zt))) || "-", u = h(a.get(e.get(Qt))) || "-", c = h(a.get("gclsrc")) || "-", l = h(a.get("dclid")) || "-", d = s(Jt, "(not set)"), p = s(en, "(not set)"), m = s(tn), s = s(nn);
if (o(r) && o(u) && o(l) && o(i)) r = z; else {
var y = !o(u) && !o(c), y = o(i) && (!o(l) || y), b = o(m);
if (y || b) {
var x = wi(e), x = g(x, L);
(x = mi(e, x)) && !o(x[1] && !x[2]) && (y && (i = x[0]), b && (m = x[1]));
}
vi(e, r, i, u, c, l, d, p, m, s), r = L;
}
r = r || gi(e), !r && !t && e.get(qn) && (vi(e, P, "(direct)", P, P, P, "(direct)", "(none)", P, P), 
r = L), r && (e.set(Un, bi(e, n)), t = "(direct)" == e.get(Jn) && "(direct)" == e.get(Xn) && "(none)" == e.get(Qn), 
e.get(Un) || e.get(qn) && !t) && (e.set(Ln, e.get(qt)), e.set(Hn, e.get(Wn)), e.z(zn));
}
}
}, gi = function(e) {
var t = wi(e), n = g(t, L);
if (!(t != P && t != H && "" != t && "0" != t && "-" != t && 0 <= t[rt]("://")) || n && -1 < n[ct][rt]("google") && n.d.contains("q") && "cse" == n[st]) return z;
if ((t = mi(e, n)) && !t[2]) return vi(e, P, t[0], P, P, P, "(organic)", "organic", t[1], P), 
L;
if (t || !e.get(qn)) return z;
e: {
for (var t = e.get(ln), r = p(n[ct]), i = 0; i < t[lt]; ++i) if (-1 < r[rt](t[i])) {
e = z;
break e;
}
vi(e, P, r, P, P, P, "(referral)", "referral", P, "/" + n[st]), e = L;
}
return e;
}, mi = function(e, t) {
for (var n = e.get(cn), r = 0; r < n[lt]; ++r) {
var i = n[r][pt](":");
if (-1 < t[ct][rt](i[0][Tt]())) {
var o = t.d.get(i[1]);
if (o && (o = d(o), !o && -1 < t[ct][rt]("google.") && (o = "(not provided)"), !i[3] || -1 < t.url[rt](i[3]))) {
e: {
for (var n = o, r = e.get(fn), n = f(n)[Tt](), a = 0; a < r[lt]; ++a) if (n == r[a]) {
n = L;
break e;
}
n = z;
}
return [ i[2] || i[0], o, n ];
}
}
}
return H;
}, vi = function(e, t, n, r, i, o, a, s, u, c) {
e.set($n, t), e.set(Jn, n), e.set(Vn, r), e.set(Kn, i), e.set(Yn, o), e.set(Xn, a), 
e.set(Qn, s), e.set(Zn, u), e.set(er, c);
}, yi = [ Xn, $n, Vn, Yn, Jn, Qn, Zn, er ], bi = function(e, t) {
function n(e) {
return e = ("" + e)[pt]("+")[Et]("%20"), e = e[pt](" ")[Et]("%20");
}
function r(n) {
var r = "" + (e.get(n) || "");
return n = "" + (t[n] || ""), 0 < r[lt] && r == n;
}
if (r(Vn) || r(Yn)) return B(131), z;
for (var i = 0; i < yi[lt]; i++) {
var o = yi[i], a = t[o] || "-", o = e.get(o) || "-";
if (n(a) != n(o)) return L;
}
return z;
}, xi = RegExp(/^https:\/\/(www\.)?google(\.com?)?(\.[a-z]{2}t?)?\/?$/i), wi = function(e) {
e = y(e.get(bn), e.get(Ft));
try {
if (xi[G](e)) return B(136), e + "?q=";
} catch (t) {
B(145);
}
return e;
}, _i = function(e) {
Qr = e.c(Vn, ""), Zr = e.c(Kn, "");
}, ki = function(e) {
var t = e.c(Vn, ""), n = e.c(Kn, "");
t != Qr && (-1 < n[rt]("ds") ? e.set(Gn, P) : !o(Qr) && -1 < Zr[rt]("ds") && e.set(Gn, Qr));
}, Ei = function(e) {
Ti(e, document.location.href) ? (e.set(br, L), B(12)) : e.set(br, z);
}, Ti = function(e, t) {
if (!e.get(zt)) return z;
var n = g(t, e.get(Ut)), r = d(n.d.get("__utma")), i = d(n.d.get("__utmb")), o = d(n.d.get("__utmc")), a = d(n.d.get("__utmx")), s = d(n.d.get("__utmz")), u = d(n.d.get("__utmv")), n = d(n.d.get("__utmk"));
if (j("" + r + i + o + a + s + u) != n) {
if (r = f(r), i = f(i), o = f(o), a = f(a), o = Ci(r + i + o + a, s, u, n), !o) return z;
s = o[0], u = o[1];
}
return Dr(e, r, L) ? (Nr(e, i, L), Rr(e, s, L), Wr(e, u, L), Ni(e, a, L), L) : z;
}, Si = function(e, t, n) {
var r;
r = jr(e) || "-";
var i = Mr(e) || "-", o = "" + e.b(It, 1) || "-", a = Oi(e) || "-", s = qr(e, z) || "-";
e = Or(e, z) || "-";
var u = j("" + r + i + o + a + s + e), c = [];
return c[Y]("__utma=" + r), c[Y]("__utmb=" + i), c[Y]("__utmc=" + o), c[Y]("__utmx=" + a), 
c[Y]("__utmz=" + s), c[Y]("__utmv=" + e), c[Y]("__utmk=" + u), (r = c[Et]("&")) ? (i = t[rt]("#"), 
n ? 0 > i ? t + "#" + r : t + "&" + r : (n = "", o = t[rt]("?"), i > 0 && (n = t[wt](i), 
t = t[wt](0, i)), 0 > o ? t + "?" + r + n : t + "&" + r + n)) : t;
}, Ci = function(e, t, n, r) {
for (var i = 0; 3 > i; i++) {
for (var o = 0; 3 > o; o++) {
if (r == j(e + t + n)) return B(127), [ t, n ];
var a = t[Q](/ /g, "%20"), s = n[Q](/ /g, "%20");
if (r == j(e + a + s)) return B(128), [ a, s ];
if (a = a[Q](/\+/g, "%20"), s = s[Q](/\+/g, "%20"), r == j(e + a + s)) return B(129), 
[ a, s ];
try {
var u = t[it]("utmctr=(.*?)(?:\\|utm|$)");
if (u && 2 == u[lt] && (a = t[Q](u[1], c(f(u[1]))), r == j(e + a + n))) return B(139), 
[ a, n ];
} catch (l) {}
t = f(t);
}
n = f(n);
}
}, Bi = "|", Ai = function(e, t, n, r, i, o, a, s, u) {
var c = ji(e, t);
return c || (c = {}, e.get(dn)[Y](c)), c.id_ = t, c.affiliation_ = n, c.total_ = r, 
c.tax_ = i, c.shipping_ = o, c.city_ = a, c.state_ = s, c.country_ = u, c.items_ = c.items_ || [], 
c;
}, Di = function(e, t, n, r, i, o, a) {
e = ji(e, t) || Ai(e, t, "", 0, 0, 0, "", "", "");
var s;
e: {
if (e && e.items_) {
s = e.items_;
for (var u = 0; u < s[lt]; u++) if (s[u].sku_ == n) {
s = s[u];
break e;
}
}
s = H;
}
return u = s || {}, u.transId_ = t, u.sku_ = n, u.name_ = r, u.category_ = i, u.price_ = o, 
u.quantity_ = a, s || e.items_[Y](u), u;
}, ji = function(e, t) {
for (var n = e.get(dn), r = 0; r < n[lt]; r++) if (n[r].id_ == t) return n[r];
return H;
}, Mi = function(e) {
if (!ei) {
var t;
t = document.location.hash;
var n = W[ut], r = /^#?gaso=([^&]*)/;
(n = (t = (t = t && t[it](r) || n && n[it](r)) ? t[1] : d(Ur("GASO"))) && t[it](/^(?:[|!]([-0-9a-z.]{1,40})[|!])?([-.\w]{10,1200})$/i)) && (oi(e, "GASO", "" + t), 
so._gasoDomain = e.get(Rt), so._gasoCPath = e.get(Ft), e = n[1], l("https://www.google.com/analytics/web/inpage/pub/inpage.js?" + (e ? "prefix=" + e + "&" : "") + s(), "_gasojs")), 
ei = L;
}
}, Ni = function(e, t, n) {
n && (t = f(t)), n = e.b(It, 1), t = t[pt]("."), !(2 > t[lt]) && /^\d+$/[G](t[0]) && (t[0] = "" + n, 
oi(e, "__utmx", t[Et](".")));
}, Oi = function(e, t) {
var n = k(e.get(It), Ur("__utmx"));
return "-" == n && (n = ""), t ? c(n) : n;
}, Wi = function(e, t) {
var n = V.min(e.b(hr, 0), 100);
if (e.b(Bn, 0) % 100 >= n) return z;
e: {
if (n = (n = W.performance || W.webkitPerformance) && n.timing) {
var r = n.navigationStart;
if (0 != r) {
n = [ n.loadEventStart - r, n.domainLookupEnd - n.domainLookupStart, n.connectEnd - n.connectStart, n.responseStart - n.requestStart, n.responseEnd - n.responseStart, n.fetchStart - r, n.domInteractive - r, n.domContentLoadedEventStart - r ];
break e;
}
B(133);
}
n = P;
}
if (n || (W.top != W ? n = P : (r = (n = W.external) && n.onloadT, n && !n.isValidLoadTime && (r = P), 
r > 2147483648 && (r = P), r > 0 && n.setPageReadyTime(), n = r == P ? P : [ r ])), 
n == P) return z;
if (r = n[0], r == P || r == $ || isNaN(r)) return z;
if (r > 0) {
e: {
for (r = 1; r < n[lt]; r++) if (isNaN(n[r]) || n[r] == $ || 0 > n[r]) {
r = z;
break e;
}
r = L;
}
t(r ? Ii(n) : Ii(n[J](0, 1)));
} else St(W, "load", function() {
Wi(e, t);
}, z);
return L;
}, qi = function(e, t, n, r) {
var i = new ti();
return i.f(14, 90, t[wt](0, 64)), i.f(14, 91, e[wt](0, 64)), i.f(14, 92, "" + Ri(n)), 
r != P && i.f(14, 93, r[wt](0, 64)), i.o(14, 90, n), i;
}, Ri = function(e) {
return isNaN(e) || 0 > e ? 0 : 5e3 > e ? 10 * V[et](e / 10) : 5e4 > e ? 100 * V[et](e / 100) : 41e5 > e ? 1e3 * V[et](e / 1e3) : 41e5;
}, Ii = function(e) {
for (var t = new ti(), n = 0; n < e[lt]; n++) t.f(14, n + 1, "" + Ri(e[n])), t.o(14, n + 1, e[n]);
return t;
}, Fi = function(e, t, n) {
function r(e) {
return function(t) {
if ((t = t.get(xr)[e]) && t[lt]) for (var n = {
type: e,
target: i,
stopPropagation: function() {
throw "aborted";
}
}, r = 0; r < t[lt]; r++) t[r].call(i, n);
};
}
var i = this;
this.a = new Br(), this.get = function(e) {
return this.a.get(e);
}, this.set = function(e, t, n) {
this.a.set(e, t, n);
}, this.set(Mt, t || "UA-XXXXX-X"), this.set(Wt, e || ""), this.set(Ot, n || ""), 
this.set(qt, V.round(new Date().getTime() / 1e3)), this.set(Ft, "/"), this.set(Pt, 63072e6), 
this.set(Ht, 15768e6), this.set(Lt, 18e5), this.set(zt, z), this.set(un, 50), this.set(Ut, z), 
this.set($t, L), this.set(Xt, L), this.set(Vt, L), this.set(Kt, L), this.set(Yt, L), 
this.set(Jt, "utm_campaign"), this.set(Gt, "utm_id"), this.set(Qt, "gclid"), this.set(Zt, "utm_source"), 
this.set(en, "utm_medium"), this.set(tn, "utm_term"), this.set(nn, "utm_content"), 
this.set(rn, "utm_nooverride"), this.set(on, 100), this.set(hr, 1), this.set(pr, z), 
this.set(an, "/__utm.gif"), this.set(sn, 1), this.set(dn, []), this.set(gn, []), 
this.set(cn, hi[J](0)), this.set(fn, []), this.set(ln, []), this.B("auto"), this.set(bn, q.referrer), 
e = this.a;
try {
var o = g(document.location.href, z), a = K(h(o.d.get("utm_referrer"))) || "";
a && e.set(bn, a);
var s = W.gaData && W.gaData.expId;
s || (s = K(d(o.d.get("utm_expid"))) || ""), s && e.set(wr, "" + s);
} catch (u) {
B(146);
}
this.set(xr, {
hit: [],
load: []
}), this.a.g("0", Ei), this.a.g("1", _i), this.a.g("2", ci), this.a.g("3", pi), 
this.a.g("4", ki), this.a.g("5", fi), this.a.g("6", r("load")), this.a.g("7", Mi), 
this.a.e("A", T), this.a.e("B", S), this.a.e("C", ci), this.a.e("D", E), this.a.e("E", Cr), 
this.a.e("F", Pi), this.a.e("G", ui), this.a.e("H", C), this.a.e("I", Kr), this.a.e("J", ii), 
this.a.e("K", r("hit")), this.a.e("L", Zi), this.a.e("M", Li), 0 === this.get(qt) && B(111), 
this.a.T(), this.H = P;
};
F = Fi[dt], F.m = function() {
var e = this.get(hn);
return e || (e = new ti(), this.set(hn, e)), e;
}, F.La = function(e) {
for (var t in e) {
var n = e[t];
e.hasOwnProperty(t) && this.set(t, n, L);
}
}, F.K = function(e) {
if (this.get(pr)) return z;
var t = this, n = Wi(this.a, function(n) {
t.set(vn, e, L), t.t(n);
});
return this.set(pr, n), n;
}, F.Fa = function(e) {
e && i(e) ? (B(13), this.set(vn, e, L)) : "object" == typeof e && e !== H && this.La(e), 
this.H = e = this.get(vn), this.a.j("page"), this.K(e);
}, F.F = function(e, t, n, r, i) {
return "" == e || !A(e) || "" == t || !A(t) || n != P && !A(n) || r != P && !D(r) ? z : (this.set(ar, e, L), 
this.set(sr, t, L), this.set(ur, n, L), this.set(cr, r, L), this.set(or, !!i, L), 
this.a.j("event"), L);
}, F.Ha = function(e, t, n, r, i) {
var o = this.a.b(hr, 0);
return 1 * i === i && (o = i), this.a.b(Bn, 0) % 100 >= o ? z : (n = 1 * ("" + n), 
"" == e || !A(e) || "" == t || !A(t) || !D(n) || isNaN(n) || 0 > n || 0 > o || o > 100 || r != P && ("" == r || !A(r)) ? z : (this.t(qi(e, t, n, r)), 
L));
}, F.Ga = function(e, t, n, r) {
return e && t ? (this.set(fr, e, L), this.set(lr, t, L), this.set(dr, n || document.location.href, L), 
r && this.set(vn, r, L), this.a.j("social"), L) : z;
}, F.Ea = function() {
this.set(hr, 10), this.K(this.H);
}, F.Ia = function() {
this.a.j("trans");
}, F.t = function(e) {
this.set(pn, e, L), this.a.j("event");
}, F.ia = function(e) {
this.v();
var t = this;
return {
_trackEvent: function(n, r, i) {
B(91), t.F(e, n, r, i);
}
};
}, F.ma = function(e) {
return this.get(e);
}, F.xa = function(e, t) {
if (e) if (i(e)) this.set(e, t); else if ("object" == typeof e) for (var n in e) e.hasOwnProperty(n) && this.set(n, e[n]);
}, F.addEventListener = function(e, t) {
var n = this.get(xr)[e];
n && n[Y](t);
}, F.removeEventListener = function(e, t) {
for (var n = this.get(xr)[e], r = 0; n && r < n[lt]; r++) if (n[r] == t) {
n.splice(r, 1);
break;
}
}, F.qa = function() {
return "5.3.8";
}, F.B = function(e) {
this.get($t), e = "auto" == e ? p(q.domain) : e && "-" != e && "none" != e ? e[Tt]() : "", 
this.set(Rt, e);
}, F.va = function(e) {
this.set($t, !!e);
}, F.na = function(e, t) {
return Si(this.a, e, t);
}, F.link = function(e, t) {
if (this.a.get(zt) && e) {
var n = Si(this.a, e, t);
document.location.href = n;
}
}, F.ua = function(e, t) {
this.a.get(zt) && e && e.action && (e.action = Si(this.a, e.action, t));
}, F.za = function() {
this.v();
var e = this.a, t = q.getElementById ? q.getElementById("utmtrans") : q.utmform && q.utmform.utmtrans ? q.utmform.utmtrans : H;
if (t && t[nt]) {
e.set(dn, []);
for (var t = t[nt][pt]("UTM:"), n = 0; n < t[lt]; n++) {
t[n] = a(t[n]);
for (var r = t[n][pt](Bi), i = 0; i < r[lt]; i++) r[i] = a(r[i]);
"T" == r[0] ? Ai(e, r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8]) : "I" == r[0] && Di(e, r[1], r[2], r[3], r[4], r[5], r[6]);
}
}
}, F.$ = function(e, t, n, r, i, o, a, s) {
return Ai(this.a, e, t, n, r, i, o, a, s);
}, F.Y = function(e, t, n, r, i, o) {
return Di(this.a, e, t, n, r, i, o);
}, F.Aa = function(e) {
Bi = e || "|";
}, F.ea = function() {
this.set(dn, []);
}, F.wa = function(e, n, r, i) {
var o = this.a;
if (0 >= e || e > o.get(un)) e = z; else if (!n || !r || 128 < n[lt] + r[lt]) e = z; else {
1 != i && 2 != i && (i = 3);
var a = {};
t(a, n), a.value = r, a.scope = i, o.get(gn)[e] = a, e = L;
}
return e && this.a.n(), e;
}, F.ka = function(e) {
this.a.get(gn)[e] = P, this.a.n();
}, F.ra = function(e) {
return (e = this.a.get(gn)[e]) && 1 == e[mt] ? e[nt] : P;
}, F.Ca = function(e, t, n) {
this.m().f(e, t, n);
}, F.Da = function(e, t, n) {
this.m().o(e, t, n);
}, F.sa = function(e, t) {
return this.m().getKey(e, t);
}, F.ta = function(e, t) {
return this.m().N(e, t);
}, F.fa = function(e) {
this.m().L(e);
}, F.ga = function(e) {
this.m().M(e);
}, F.ja = function() {
return new ti();
}, F.W = function(e) {
e && this.get(fn)[Y](e[Tt]());
}, F.ba = function() {
this.set(fn, []);
}, F.X = function(e) {
e && this.get(ln)[Y](e[Tt]());
}, F.ca = function() {
this.set(ln, []);
}, F.Z = function(e, t, n, r, i) {
e && t && (e = [ e, t[Tt]() ][Et](":"), (r || i) && (e = [ e, r, i ][Et](":")), 
r = this.get(cn), r.splice(n ? 0 : r[lt], 0, e));
}, F.da = function() {
this.set(cn, []);
}, F.ha = function(e) {
this.a[Z]();
var t = this.get(Ft), n = Oi(this.a);
this.set(Ft, e), this.a.n(), Ni(this.a, n), this.set(Ft, t);
}, F.ya = function(e, t) {
if (e > 0 && 5 >= e && i(t) && "" != t) {
var n = this.get(gr) || [];
n[e] = t, this.set(gr, n);
}
}, F.V = function(e) {
if (e = "" + e, e[it](/^[A-Za-z0-9]{1,5}$/)) {
var t = this.get(yr) || [];
t[Y](e), this.set(yr, t);
}
}, F.v = function() {
this.a[Z]();
}, F.Ba = function(e) {
e && "" != e && (this.set(Dn, e), this.a.j("var"));
};
var Pi = function(e) {
if ("trans" !== e.get(nr) && 500 <= e.b(In, 0) && e[gt](), "event" === e.get(nr)) {
var t = new Date().getTime(), n = e.b(Pn, 0), r = e.b(On, 0), n = V[et](1 * ((t - (n != r ? n : 1e3 * n)) / 1e3));
n > 0 && (e.set(Pn, t), e.set(Fn, V.min(10, e.b(Fn, 0) + n))), 0 >= e.b(Fn, 0) && e[gt]();
}
}, Li = function(e) {
"event" === e.get(nr) && e.set(Fn, V.max(0, e.b(Fn, 10) - 1));
}, Hi = function() {
var e = [];
this.add = function(t, n, r) {
r && (n = c("" + n)), e[Y](t + "=" + n);
}, this.toString = function() {
return e[Et]("&");
};
}, zi = function(e, t) {
(t || 2 != e.get(sn)) && e.z(In);
}, Ui = function(e, t) {
t.add("utmwv", "5.3.8"), t.add("utms", e.get(In)), t.add("utmn", s());
var n = document.location.hostname;
o(n) || t.add("utmhn", n, L), n = e.get(on), 100 != n && t.add("utmsp", n, L);
}, $i = function(e, t) {
t.add("utmac", a(e.get(Mt))), e.get(wr) && t.add("utmxkey", e.get(wr), L), e.get(or) && t.add("utmni", 1);
var n = e.get(yr);
n && 0 < n[lt] && t.add("utmdid", n[Et]("."));
var n = function(e, t) {
t && r[Y](e + "=" + t + ";");
}, r = [];
n("__utma", jr(e)), n("__utmz", qr(e, z)), n("__utmv", Or(e, L)), n("__utmx", Oi(e)), 
t.add("utmcc", r[Et]("+"), L), e.get(Nt) !== z && (e.get(Nt) || so.w) && t.add("aip", 1), 
t.add("utmu", Hr.Xa());
}, Xi = function(e, t) {
for (var n = e.get(gr) || [], r = [], i = 1; i < n[lt]; i++) n[i] && r[Y](i + ":" + c(n[i][Q](/%/g, "%25")[Q](/:/g, "%3A")[Q](/,/g, "%2C")));
r[lt] && t.add("utmpg", r[Et](","));
}, Vi = function(e, t) {
e.get(Xt) && (t.add("utmcs", e.get(Sn), L), t.add("utmsr", e.get(wn)), e.get(Cn) && t.add("utmvp", e.get(Cn)), 
t.add("utmsc", e.get(_n)), t.add("utmul", e.get(Tn)), t.add("utmje", e.get(kn)), 
t.add("utmfl", e.get(En), L));
}, Ki = function(t, n) {
t.get(Yt) && t.get(yn) && n.add("utmdt", t.get(yn), L), n.add("utmhid", t.get(xn)), 
n.add("utmr", y(t.get(bn), t.get(Ft)), L), n.add("utmp", function() {
var t = R ? "/" : location.pathname, n = e.sanitizeHash(location.hash);
return t + n;
}(), L);
}, Yi = function(e, t) {
for (var n = e.get(hn), r = e.get(pn), i = e.get(gn) || [], a = 0; a < i[lt]; a++) {
var s = i[a];
s && (n || (n = new ti()), n.f(8, a, s[ut]), n.f(9, a, s[nt]), 3 != s[mt] && n.f(11, a, "" + s[mt]));
}
!o(e.get(ar)) && !o(e.get(sr), L) && (n || (n = new ti()), n.f(5, 1, e.get(ar)), 
n.f(5, 2, e.get(sr)), i = e.get(ur), i != P && n.f(5, 3, i), i = e.get(cr), i != P && n.o(5, 1, i)), 
n ? t.add("utme", n.Qa(r), L) : r && t.add("utme", r.A(), L);
}, Gi = function(e, t, n) {
var r = new Hi();
return zi(e, n), Ui(e, r), r.add("utmt", "tran"), r.add("utmtid", t.id_, L), r.add("utmtst", t.affiliation_, L), 
r.add("utmtto", t.total_, L), r.add("utmttx", t.tax_, L), r.add("utmtsp", t.shipping_, L), 
r.add("utmtci", t.city_, L), r.add("utmtrg", t.state_, L), r.add("utmtco", t.country_, L), 
Yi(e, r), Vi(e, r), Ki(e, r), (t = e.get(mn)) && r.add("utmcu", t, L), n || (Xi(e, r), 
$i(e, r)), r[ft]();
}, Ji = function(e, t, n) {
var r = new Hi();
return zi(e, n), Ui(e, r), r.add("utmt", "item"), r.add("utmtid", t.transId_, L), 
r.add("utmipc", t.sku_, L), r.add("utmipn", t.name_, L), r.add("utmiva", t.category_, L), 
r.add("utmipr", t.price_, L), r.add("utmiqt", t.quantity_, L), Yi(e, r), Vi(e, r), 
Ki(e, r), (t = e.get(mn)) && r.add("utmcu", t, L), n || (Xi(e, r), $i(e, r)), r[ft]();
}, Qi = function(e, t) {
var n = e.get(nr);
if ("page" == n) n = new Hi(), zi(e, t), Ui(e, n), Yi(e, n), Vi(e, n), Ki(e, n), 
t || (Xi(e, n), $i(e, n)), n = [ n[ft]() ]; else if ("event" == n) n = new Hi(), 
zi(e, t), Ui(e, n), n.add("utmt", "event"), Yi(e, n), Vi(e, n), Ki(e, n), t || (Xi(e, n), 
$i(e, n)), n = [ n[ft]() ]; else if ("var" == n) n = new Hi(), zi(e, t), Ui(e, n), 
n.add("utmt", "var"), !t && $i(e, n), n = [ n[ft]() ]; else if ("trans" == n) for (var n = [], r = e.get(dn), i = 0; i < r[lt]; ++i) {
n[Y](Gi(e, r[i], t));
for (var o = r[i].items_, a = 0; a < o[lt]; ++a) n[Y](Ji(e, o[a], t));
} else "social" == n ? t ? n = [] : (n = new Hi(), zi(e, t), Ui(e, n), n.add("utmt", "social"), 
n.add("utmsn", e.get(fr), L), n.add("utmsa", e.get(lr), L), n.add("utmsid", e.get(dr), L), 
Yi(e, n), Vi(e, n), Ki(e, n), Xi(e, n), $i(e, n), n = [ n[ft]() ]) : "feedback" == n ? t ? n = [] : (n = new Hi(), 
zi(e, t), Ui(e, n), n.add("utmt", "feedback"), n.add("utmfbid", e.get(mr), L), n.add("utmfbpr", e.get(vr), L), 
Yi(e, n), Vi(e, n), Ki(e, n), Xi(e, n), $i(e, n), n = [ n[ft]() ]) : n = [];
return n;
}, Zi = function(e) {
var t, n = e.get(sn), r = e.get(ir), i = r && r.Ua, o = 0;
if (0 == n || 2 == n) {
var a = e.get(an) + "?";
t = Qi(e, L);
for (var s = 0, u = t[lt]; u > s; s++) ro(t[s], i, a, L), o++;
}
if (1 == n || 2 == n) for (t = Qi(e), s = 0, u = t[lt]; u > s; s++) try {
ro(t[s], i), o++;
} catch (c) {
c && b(c[ut], P, c.message);
}
r && (r.q = o);
}, eo = function() {
return "https:" == document.location.protocol || so.G || R ? "https://ssl.google-analytics.com" : "http://www.google-analytics.com";
}, to = function(e) {
t(this, "len"), this.message = e + "-8192";
}, no = function(e) {
t(this, "ff2post"), this.message = e + "-2036";
}, ro = function(e, t, n, r) {
if (t = t || u, !R && (r || 2036 >= e[lt])) {
var i = t;
t = n || eo() + "/__utm.gif?";
var o = new Image(1, 1);
o.src = t + e, o.onload = function() {
o.onload = H, o.onerror = H, i();
}, o.onerror = function() {
o.onload = H, o.onerror = H, i();
};
} else {
if (!(8192 >= e[lt] || R)) throw new to(e[lt]);
var a = t;
if (0 <= W[kt].userAgent[rt]("Firefox") && ![].reduce) throw new no(e[lt]);
var s;
t = eo() + "/p/__utm.gif", (n = W.XDomainRequest) ? (s = new n(), s.open("POST", t)) : (n = W.XMLHttpRequest) && (n = new n(), 
"withCredentials" in n && (s = n, s.open("POST", t, L), s.setRequestHeader("Content-Type", "text/plain"))), 
s ? (s.onreadystatechange = function() {
4 == s.readyState && (a(), s = H);
}, s.send(e), t = L) : t = P, t || io(e, a);
}
}, io = function(e, n) {
if (q.body) {
e = U(e);
try {
var r = q[at]('<iframe name="' + e + '"></iframe>');
} catch (i) {
r = q[at]("iframe"), t(r, e);
}
r.height = "0", r.width = "0", r.style.display = "none", r.style.visibility = "hidden";
var o = document.location, o = eo() + "/u/post_iframe.html#" + U(o[bt] + "//" + o[ct] + "/favicon.ico"), a = function() {
r.src = "", r.parentNode && r.parentNode.removeChild(r);
};
St(W, "beforeunload", a);
var s = z, u = 0, c = function() {
if (!s) {
try {
if (u > 9 || r.contentWindow[vt][ct] == document.location[ct]) return s = L, a(), 
Ct(W, "beforeunload", a), void n();
} catch (e) {}
u++, X(c, 200);
}
};
St(r, "load", c), q.body.appendChild(r), r.src = o;
} else X(function() {
io(e, n);
}, 100);
}, oo = function() {
this.G = this.w = z, this.C = {}, this.D = [], this.U = 0, this.S = [ [ "www.google-analytics.com", "", "/plugins/" ] ], 
this._gasoCPath = this._gasoDomain = P;
var e = function(e, t, n) {
_r(oo[dt], e, t, n);
};
e("_createTracker", oo[dt].r, 55), e("_getTracker", oo[dt].oa, 0), e("_getTrackerByName", oo[dt].u, 51), 
e("_getTrackers", oo[dt].pa, 130), e("_anonymizeIp", oo[dt].aa, 16), e("_forceSSL", oo[dt].la, 125), 
e("_getPlugin", _, 120), e = function(e, t, n) {
_r(Fi[dt], e, t, n);
}, kr("_getName", Wt, 58), kr("_getAccount", Mt, 64), kr("_visitCode", Bn, 54), 
kr("_getClientInfo", Xt, 53, 1), kr("_getDetectTitle", Yt, 56, 1), kr("_getDetectFlash", Vt, 65, 1), 
kr("_getLocalGifPath", an, 57), kr("_getServiceMode", sn, 59), Er("_setClientInfo", Xt, 66, 2), 
Er("_setAccount", Mt, 3), Er("_setNamespace", Ot, 48), Er("_setAllowLinker", zt, 11, 2), 
Er("_setDetectFlash", Vt, 61, 2), Er("_setDetectTitle", Yt, 62, 2), Er("_setLocalGifPath", an, 46, 0), 
Er("_setLocalServerMode", sn, 92, P, 0), Er("_setRemoteServerMode", sn, 63, P, 1), 
Er("_setLocalRemoteServerMode", sn, 47, P, 2), Er("_setSampleRate", on, 45, 1), 
Er("_setCampaignTrack", Kt, 36, 2), Er("_setAllowAnchor", Ut, 7, 2), Er("_setCampNameKey", Jt, 41), 
Er("_setCampContentKey", nn, 38), Er("_setCampIdKey", Gt, 39), Er("_setCampMediumKey", en, 40), 
Er("_setCampNOKey", rn, 42), Er("_setCampSourceKey", Zt, 43), Er("_setCampTermKey", tn, 44), 
Er("_setCampCIdKey", Qt, 37), Er("_setCookiePath", Ft, 9, 0), Er("_setMaxCustomVariables", un, 0, 1), 
Er("_setVisitorCookieTimeout", Pt, 28, 1), Er("_setSessionCookieTimeout", Lt, 26, 1), 
Er("_setCampaignCookieTimeout", Ht, 29, 1), Er("_setReferrerOverride", bn, 49), 
Er("_setSiteSpeedSampleRate", hr, 132), e("_trackPageview", Fi[dt].Fa, 1), e("_trackEvent", Fi[dt].F, 4), 
e("_trackPageLoadTime", Fi[dt].Ea, 100), e("_trackSocial", Fi[dt].Ga, 104), e("_trackTrans", Fi[dt].Ia, 18), 
e("_sendXEvent", Fi[dt].t, 78), e("_createEventTracker", Fi[dt].ia, 74), e("_getVersion", Fi[dt].qa, 60), 
e("_setDomainName", Fi[dt].B, 6), e("_setAllowHash", Fi[dt].va, 8), e("_getLinkerUrl", Fi[dt].na, 52), 
e("_link", Fi[dt].link, 101), e("_linkByPost", Fi[dt].ua, 102), e("_setTrans", Fi[dt].za, 20), 
e("_addTrans", Fi[dt].$, 21), e("_addItem", Fi[dt].Y, 19), e("_clearTrans", Fi[dt].ea, 105), 
e("_setTransactionDelim", Fi[dt].Aa, 82), e("_setCustomVar", Fi[dt].wa, 10), e("_deleteCustomVar", Fi[dt].ka, 35), 
e("_getVisitorCustomVar", Fi[dt].ra, 50), e("_setXKey", Fi[dt].Ca, 83), e("_setXValue", Fi[dt].Da, 84), 
e("_getXKey", Fi[dt].sa, 76), e("_getXValue", Fi[dt].ta, 77), e("_clearXKey", Fi[dt].fa, 72), 
e("_clearXValue", Fi[dt].ga, 73), e("_createXObj", Fi[dt].ja, 75), e("_addIgnoredOrganic", Fi[dt].W, 15), 
e("_clearIgnoredOrganic", Fi[dt].ba, 97), e("_addIgnoredRef", Fi[dt].X, 31), e("_clearIgnoredRef", Fi[dt].ca, 32), 
e("_addOrganic", Fi[dt].Z, 14), e("_clearOrganic", Fi[dt].da, 70), e("_cookiePathCopy", Fi[dt].ha, 30), 
e("_get", Fi[dt].ma, 106), e("_set", Fi[dt].xa, 107), e("_addEventListener", Fi[dt].addEventListener, 108), 
e("_removeEventListener", Fi[dt].removeEventListener, 109), e("_addDevId", Fi[dt].V), 
e("_getPlugin", _, 122), e("_setPageGroup", Fi[dt].ya, 126), e("_trackTiming", Fi[dt].Ha, 124), 
e("_initData", Fi[dt].v, 2), e("_setVar", Fi[dt].Ba, 22), Er("_setSessionTimeout", Lt, 27, 3), 
Er("_setCookieTimeout", Ht, 25, 3), Er("_setCookiePersistence", Pt, 24, 1), e("_setAutoTrackOutbound", u, 79), 
e("_setTrackOutboundSubdomains", u, 81), e("_setHrefExamineLimit", u, 80);
};
F = oo[dt], F.oa = function(e, t) {
return this.r(e, P, t);
}, F.r = function(e, t, n) {
return t && B(23), n && B(67), t == P && (t = "~" + so.U++), e = new Fi(t, e, n), 
so.C[t] = e, so.D[Y](e), e;
}, F.u = function(e) {
return e = e || "", so.C[e] || so.r(P, e);
}, F.pa = function() {
return so.D[J](0);
}, F.aa = function() {
this.w = L;
}, F.la = function() {
this.G = L;
};
var ao = function(e) {
return "prerender" == q.webkitVisibilityState ? z : (e(), L);
}, so = new oo(), uo = W._gat;
uo && r(uo._getTracker) ? so = uo : W._gat = so;
var co = new Gr(), fo = function() {
var e = N, t = z;
return e && r(e[Y]) && (t = "[object Array]" == Object[dt][ft].call(Object(e)), 
!t) ? void (co = e) : void (t && co[Y][_t](co, e));
}, lo = {
init: M
};
return lo;
});
this.Handlebars = function() {
var e = function() {

function e(e) {
this.string = e;
}
var t;
return e.prototype.toString = function() {
return "" + this.string;
}, t = e;
}(), t = function(e) {

function t(e) {
return u[e] || "&amp;";
}
function n(e) {
for (var t = 1; t < arguments.length; t++) for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
return e;
}
function r(e) {
return e instanceof s ? e.toString() : e || 0 === e ? (e = "" + e, f.test(e) ? e.replace(c, t) : e) : "";
}
function i(e) {
return e || 0 === e ? h(e) && 0 === e.length ? !0 : !1 : !0;
}
function o(e, t) {
return (e ? e + "." : "") + t;
}
var a = {}, s = e, u = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;",
"'": "&#x27;",
"`": "&#x60;"
}, c = /[&<>"'`]/g, f = /[&<>"'`]/;
a.extend = n;
var l = Object.prototype.toString;
a.toString = l;
var d = function(e) {
return "function" == typeof e;
};
d(/x/) && (d = function(e) {
return "function" == typeof e && "[object Function]" === l.call(e);
});
var d;
a.isFunction = d;
var h = Array.isArray || function(e) {
return e && "object" == typeof e ? "[object Array]" === l.call(e) : !1;
};
return a.isArray = h, a.escapeExpression = r, a.isEmpty = i, a.appendContextPath = o, 
a;
}(e), n = function() {

function e(e, t) {
var r;
t && t.firstLine && (r = t.firstLine, e += " - " + r + ":" + t.firstColumn);
for (var i = Error.prototype.constructor.call(this, e), o = 0; o < n.length; o++) this[n[o]] = i[n[o]];
r && (this.lineNumber = r, this.column = t.firstColumn);
}
var t, n = [ "description", "fileName", "lineNumber", "message", "name", "number", "stack" ];
return e.prototype = new Error(), t = e;
}(), r = function(e, t) {

function n(e, t) {
this.helpers = e || {}, this.partials = t || {}, r(this);
}
function r(e) {
e.registerHelper("helperMissing", function() {
if (1 === arguments.length) return void 0;
throw new s("Missing helper: '" + arguments[arguments.length - 1].name + "'");
}), e.registerHelper("blockHelperMissing", function(t, n) {
var r = n.inverse || function() {}, i = n.fn;
if (d(t) && (t = t.call(this)), t === !0) return i(this);
if (t === !1 || null == t) return r(this);
if (l(t)) return t.length > 0 ? (n.ids && (n.ids = [ n.name ]), e.helpers.each(t, n)) : r(this);
if (n.data && n.ids) {
var o = m(n.data);
o.contextPath = a.appendContextPath(n.data.contextPath, n.name), n = {
data: o
};
}
return i(t, n);
}), e.registerHelper("each", function(e, t) {
t || (t = e, e = this);
var n, r, i = t.fn, o = t.inverse, s = 0, u = "";
if (t.data && t.ids && (r = a.appendContextPath(t.data.contextPath, t.ids[0]) + "."), 
d(e) && (e = e.call(this)), t.data && (n = m(t.data)), e && "object" == typeof e) if (l(e)) for (var c = e.length; c > s; s++) n && (n.index = s, 
n.first = 0 === s, n.last = s === e.length - 1, r && (n.contextPath = r + s)), u += i(e[s], {
data: n
}); else for (var f in e) e.hasOwnProperty(f) && (n && (n.key = f, n.index = s, 
n.first = 0 === s, r && (n.contextPath = r + f)), u += i(e[f], {
data: n
}), s++);
return 0 === s && (u = o(this)), u;
}), e.registerHelper("if", function(e, t) {
return d(e) && (e = e.call(this)), !t.hash.includeZero && !e || a.isEmpty(e) ? t.inverse(this) : t.fn(this);
}), e.registerHelper("unless", function(t, n) {
return e.helpers["if"].call(this, t, {
fn: n.inverse,
inverse: n.fn,
hash: n.hash
});
}), e.registerHelper("with", function(e, t) {
d(e) && (e = e.call(this));
var n = t.fn;
if (!a.isEmpty(e)) {
if (t.data && t.ids) {
var r = m(t.data);
r.contextPath = a.appendContextPath(t.data.contextPath, t.ids[0]), t = {
data: r
};
}
return n(e, t);
}
}), e.registerHelper("log", function(t, n) {
var r = n.data && null != n.data.level ? parseInt(n.data.level, 10) : 1;
e.log(r, t);
}), e.registerHelper("lookup", function(e, t) {
return e && e[t];
});
}
function i(e, t) {
g.log(e, t);
}
var o = {}, a = e, s = t, u = "2.0.0-alpha.2";
o.VERSION = u;
var c = 5;
o.COMPILER_REVISION = c;
var f = {
1: "<= 1.0.rc.2",
2: "== 1.0.0-rc.3",
3: "== 1.0.0-rc.4",
4: "== 1.x.x",
5: ">= 2.0.0"
};
o.REVISION_CHANGES = f;
var l = a.isArray, d = a.isFunction, h = a.toString, p = "[object Object]";
o.HandlebarsEnvironment = n, n.prototype = {
constructor: n,
logger: g,
log: i,
registerHelper: function(e, t, n) {
if (h.call(e) === p) {
if (n || t) throw new s("Arg not supported with multiple helpers");
a.extend(this.helpers, e);
} else n && (t.not = n), this.helpers[e] = t;
},
unregisterHelper: function(e) {
delete this.helpers[e];
},
registerPartial: function(e, t) {
h.call(e) === p ? a.extend(this.partials, e) : this.partials[e] = t;
},
unregisterPartial: function(e) {
delete this.partials[e];
}
};
var g = {
methodMap: {
0: "debug",
1: "info",
2: "warn",
3: "error"
},
DEBUG: 0,
INFO: 1,
WARN: 2,
ERROR: 3,
level: 3,
log: function(e, t) {
if (g.level <= e) {
var n = g.methodMap[e];
"undefined" != typeof console && console[n] && console[n].call(console, t);
}
}
};
o.logger = g, o.log = i;
var m = function(e) {
var t = a.extend({}, e);
return t._parent = e, t;
};
return o.createFrame = m, o;
}(t, n), i = function(e, t, n) {

function r(e) {
var t = e && e[0] || 1, n = d;
if (t !== n) {
if (n > t) {
var r = h[n], i = h[t];
throw new l("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + r + ") or downgrade your runtime to an older version (" + i + ").");
}
throw new l("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").");
}
}
function i(e, t) {
if (!t) throw new l("No environment passed to template");
t.VM.checkRevision(e.compiler);
var n = function(e, n, r, i, o, a, s) {
i && (r = f.extend({}, r, i));
var u = t.VM.invokePartial.call(this, e, n, r, o, a, s);
if (null != u) return u;
if (t.compile) {
var c = {
helpers: o,
partials: a,
data: s
};
return a[n] = t.compile(e, {
data: void 0 !== s
}, t), a[n](r, c);
}
throw new l("The partial " + n + " could not be compiled when running in runtime-only mode");
}, r = {
escapeExpression: f.escapeExpression,
invokePartial: n,
fn: function(t) {
return e[t];
},
programs: [],
program: function(e, t) {
var n = this.programs[e], r = this.fn(e);
return t ? n = a(this, e, r, t) : n || (n = this.programs[e] = a(this, e, r)), n;
},
programWithDepth: t.VM.programWithDepth,
initData: function(e, t) {
return t && "root" in t || (t = t ? p(t) : {}, t.root = e), t;
},
data: function(e, t) {
for (;e && t--; ) e = e._parent;
return e;
},
merge: function(e, t) {
var n = e || t;
return e && t && e !== t && (n = f.extend({}, t, e)), n;
},
noop: t.VM.noop,
compilerInfo: e.compiler
}, i = function(n, i) {
i = i || {};
var o, a, s = i.partial ? i : t, u = i.data;
return i.partial ? (o = r.helpers = i.helpers, a = r.partials = i.partials) : (o = r.helpers = r.merge(i.helpers, s.helpers), 
e.usePartial && (a = r.partials = r.merge(i.partials, s.partials)), e.useData && (u = r.initData(n, u))), 
e.main.call(r, n, o, a, u);
};
return i.child = function(e) {
return r.programWithDepth(e);
}, i;
}
function o(e, t) {
var n = Array.prototype.slice.call(arguments, 2), r = this, i = r.fn(e), o = function(e, o) {
return o = o || {}, i.apply(r, [ e, r.helpers, r.partials, o.data || t ].concat(n));
};
return o.program = e, o.depth = n.length, o;
}
function a(e, t, n, r) {
var i = function(t, i) {
return i = i || {}, n.call(e, t, e.helpers, e.partials, i.data || r);
};
return i.program = t, i.depth = 0, i;
}
function s(e, t, n, r, i, o) {
var a = {
partial: !0,
helpers: r,
partials: i,
data: o
};
if (void 0 === e) throw new l("The partial " + t + " could not be found");
return e instanceof Function ? e(n, a) : void 0;
}
function u() {
return "";
}
var c = {}, f = e, l = t, d = n.COMPILER_REVISION, h = n.REVISION_CHANGES, p = n.createFrame;
return c.checkRevision = r, c.template = i, c.programWithDepth = o, c.program = a, 
c.invokePartial = s, c.noop = u, c;
}(t, n, r), o = function(e, t, n, r, i) {

var o, a = e, s = t, u = n, c = r, f = i, l = function() {
var e = new a.HandlebarsEnvironment();
return c.extend(e, a), e.SafeString = s, e.Exception = u, e.Utils = c, e.VM = f, 
e.template = function(t) {
return f.template(t, e);
}, e;
}, d = l();
return d.create = l, o = d;
}(r, e, n, t, i);
return o;
}();
define("vendor/handlebars.runtime", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Handlebars;
    };
}(this)));

define('vendor/md5',[],function() {

function e(e, t) {
var a = e[0], s = e[1], u = e[2], c = e[3];
a = n(a, s, u, c, t[0], 7, -680876936), c = n(c, a, s, u, t[1], 12, -389564586), 
u = n(u, c, a, s, t[2], 17, 606105819), s = n(s, u, c, a, t[3], 22, -1044525330), 
a = n(a, s, u, c, t[4], 7, -176418897), c = n(c, a, s, u, t[5], 12, 1200080426), 
u = n(u, c, a, s, t[6], 17, -1473231341), s = n(s, u, c, a, t[7], 22, -45705983), 
a = n(a, s, u, c, t[8], 7, 1770035416), c = n(c, a, s, u, t[9], 12, -1958414417), 
u = n(u, c, a, s, t[10], 17, -42063), s = n(s, u, c, a, t[11], 22, -1990404162), 
a = n(a, s, u, c, t[12], 7, 1804603682), c = n(c, a, s, u, t[13], 12, -40341101), 
u = n(u, c, a, s, t[14], 17, -1502002290), s = n(s, u, c, a, t[15], 22, 1236535329), 
a = r(a, s, u, c, t[1], 5, -165796510), c = r(c, a, s, u, t[6], 9, -1069501632), 
u = r(u, c, a, s, t[11], 14, 643717713), s = r(s, u, c, a, t[0], 20, -373897302), 
a = r(a, s, u, c, t[5], 5, -701558691), c = r(c, a, s, u, t[10], 9, 38016083), u = r(u, c, a, s, t[15], 14, -660478335), 
s = r(s, u, c, a, t[4], 20, -405537848), a = r(a, s, u, c, t[9], 5, 568446438), 
c = r(c, a, s, u, t[14], 9, -1019803690), u = r(u, c, a, s, t[3], 14, -187363961), 
s = r(s, u, c, a, t[8], 20, 1163531501), a = r(a, s, u, c, t[13], 5, -1444681467), 
c = r(c, a, s, u, t[2], 9, -51403784), u = r(u, c, a, s, t[7], 14, 1735328473), 
s = r(s, u, c, a, t[12], 20, -1926607734), a = i(a, s, u, c, t[5], 4, -378558), 
c = i(c, a, s, u, t[8], 11, -2022574463), u = i(u, c, a, s, t[11], 16, 1839030562), 
s = i(s, u, c, a, t[14], 23, -35309556), a = i(a, s, u, c, t[1], 4, -1530992060), 
c = i(c, a, s, u, t[4], 11, 1272893353), u = i(u, c, a, s, t[7], 16, -155497632), 
s = i(s, u, c, a, t[10], 23, -1094730640), a = i(a, s, u, c, t[13], 4, 681279174), 
c = i(c, a, s, u, t[0], 11, -358537222), u = i(u, c, a, s, t[3], 16, -722521979), 
s = i(s, u, c, a, t[6], 23, 76029189), a = i(a, s, u, c, t[9], 4, -640364487), c = i(c, a, s, u, t[12], 11, -421815835), 
u = i(u, c, a, s, t[15], 16, 530742520), s = i(s, u, c, a, t[2], 23, -995338651), 
a = o(a, s, u, c, t[0], 6, -198630844), c = o(c, a, s, u, t[7], 10, 1126891415), 
u = o(u, c, a, s, t[14], 15, -1416354905), s = o(s, u, c, a, t[5], 21, -57434055), 
a = o(a, s, u, c, t[12], 6, 1700485571), c = o(c, a, s, u, t[3], 10, -1894986606), 
u = o(u, c, a, s, t[10], 15, -1051523), s = o(s, u, c, a, t[1], 21, -2054922799), 
a = o(a, s, u, c, t[8], 6, 1873313359), c = o(c, a, s, u, t[15], 10, -30611744), 
u = o(u, c, a, s, t[6], 15, -1560198380), s = o(s, u, c, a, t[13], 21, 1309151649), 
a = o(a, s, u, c, t[4], 6, -145523070), c = o(c, a, s, u, t[11], 10, -1120210379), 
u = o(u, c, a, s, t[2], 15, 718787259), s = o(s, u, c, a, t[9], 21, -343485551), 
e[0] = d(a, e[0]), e[1] = d(s, e[1]), e[2] = d(u, e[2]), e[3] = d(c, e[3]);
}
function t(e, t, n, r, i, o) {
return t = d(d(t, e), d(r, o)), d(t << i | t >>> 32 - i, n);
}
function n(e, n, r, i, o, a, s) {
return t(n & r | ~n & i, e, n, o, a, s);
}
function r(e, n, r, i, o, a, s) {
return t(n & i | r & ~i, e, n, o, a, s);
}
function i(e, n, r, i, o, a, s) {
return t(n ^ r ^ i, e, n, o, a, s);
}
function o(e, n, r, i, o, a, s) {
return t(r ^ (n | ~i), e, n, o, a, s);
}
function a(t) {
var n, r = t.length, i = [ 1732584193, -271733879, -1732584194, 271733878 ];
for (n = 64; n <= t.length; n += 64) e(i, s(t.substring(n - 64, n)));
t = t.substring(n - 64);
var o = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
for (n = 0; n < t.length; n++) o[n >> 2] |= t.charCodeAt(n) << (n % 4 << 3);
if (o[n >> 2] |= 128 << (n % 4 << 3), n > 55) for (e(i, o), n = 0; 16 > n; n++) o[n] = 0;
return o[14] = 8 * r, e(i, o), i;
}
function s(e) {
var t, n = [];
for (t = 0; 64 > t; t += 4) n[t >> 2] = e.charCodeAt(t) + (e.charCodeAt(t + 1) << 8) + (e.charCodeAt(t + 2) << 16) + (e.charCodeAt(t + 3) << 24);
return n;
}
function u(e) {
for (var t = "", n = 0; 4 > n; n++) t += l[e >> 8 * n + 4 & 15] + l[e >> 8 * n & 15];
return t;
}
function c(e) {
for (var t = 0; t < e.length; t++) e[t] = u(e[t]);
return e.join("");
}
function f(e) {
return c(a(e));
}
var l = "0123456789abcdef".split(""), d = function(e, t) {
return e + t & 4294967295;
};
return "5d41402abc4b2a76b9719d911017c592" != f("hello") && (d = function(e, t) {
var n = (65535 & e) + (65535 & t), r = (e >> 16) + (t >> 16) + (n >> 16);
return r << 16 | 65535 & n;
}), f;
});
(function(e) {
function t(e, t, n, r) {
var i = n.lang();
return i[e].call ? i[e](n, r) : i[e][t];
}
function n(e, t) {
return function(n) {
return s(e.call(this, n), t);
};
}
function r(e) {
return function(t) {
var n = e.call(this, t);
return n + this.lang().ordinal(n);
};
}
function i(e, t, n) {
this._d = e, this._isUTC = !!t, this._a = e._a || null, this._lang = n || !1;
}
function o(e) {
var t = this._data = {}, n = e.years || e.y || 0, r = e.months || e.M || 0, i = e.weeks || e.w || 0, o = e.days || e.d || 0, s = e.hours || e.h || 0, u = e.minutes || e.m || 0, c = e.seconds || e.s || 0, f = e.milliseconds || e.ms || 0;
this._milliseconds = f + 1e3 * c + 6e4 * u + 36e5 * s, this._days = o + 7 * i, this._months = r + 12 * n, 
t.milliseconds = f % 1e3, c += a(f / 1e3), t.seconds = c % 60, u += a(c / 60), t.minutes = u % 60, 
s += a(u / 60), t.hours = s % 24, o += a(s / 24), o += 7 * i, t.days = o % 30, r += a(o / 30), 
t.months = r % 12, n += a(r / 12), t.years = n, this._lang = !1;
}
function a(e) {
return 0 > e ? Math.ceil(e) : Math.floor(e);
}
function s(e, t) {
for (var n = e + ""; n.length < t; ) n = "0" + n;
return n;
}
function u(e, t, n) {
var r, i = t._milliseconds, o = t._days, a = t._months;
i && e._d.setTime(+e + i * n), o && e.date(e.date() + o * n), a && (r = e.date(), 
e.date(1).month(e.month() + a * n).date(Math.min(r, e.daysInMonth())));
}
function c(e) {
return "[object Array]" === Object.prototype.toString.call(e);
}
function f(e, t) {
var n, r = Math.min(e.length, t.length), i = Math.abs(e.length - t.length), o = 0;
for (n = 0; r > n; n++) ~~e[n] !== ~~t[n] && o++;
return o + i;
}
function l(e, t, n, r) {
var i, o, a = [];
for (i = 0; 7 > i; i++) a[i] = e[i] = null == e[i] ? 2 === i ? 1 : 0 : e[i];
return e[7] = a[7] = t, null != e[8] && (a[8] = e[8]), e[3] += n || 0, e[4] += r || 0, 
o = new Date(0), t ? (o.setUTCFullYear(e[0], e[1], e[2]), o.setUTCHours(e[3], e[4], e[5], e[6])) : (o.setFullYear(e[0], e[1], e[2]), 
o.setHours(e[3], e[4], e[5], e[6])), o._a = a, o;
}
function d(e, t) {
var n, r, i = [];
for (!t && O && (t = require("./lang/" + e)), n = 0; n < N.length; n++) t[N[n]] = t[N[n]] || M.en[N[n]];
for (n = 0; 12 > n; n++) r = C([ 2e3, n ]), i[n] = new RegExp("^" + (t.months[n] || t.months(r, "")) + "|^" + (t.monthsShort[n] || t.monthsShort(r, "")).replace(".", ""), "i");
return t.monthsParse = t.monthsParse || i, M[e] = t, t;
}
function h(e) {
var t = "string" == typeof e && e || e && e._lang || null;
return t ? M[t] || d(t) : C;
}
function p(e) {
return e.match(/\[.*\]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function g(e) {
var t, n, r = e.match(q);
for (t = 0, n = r.length; n > t; t++) r[t] = tt[r[t]] ? tt[r[t]] : p(r[t]);
return function(i) {
var o = "";
for (t = 0; n > t; t++) o += "function" == typeof r[t].call ? r[t].call(i, e) : r[t];
return o;
};
}
function m(e, t) {
function n(t) {
return e.lang().longDateFormat[t] || t;
}
for (var r = 5; r-- && R.test(t); ) t = t.replace(R, n);
return Q[t] || (Q[t] = g(t)), Q[t](e);
}
function v(e) {
switch (e) {
case "DDDD":
return L;

case "YYYY":
return H;

case "S":
case "SS":
case "SSS":
case "DDD":
return P;

case "MMM":
case "MMMM":
case "dd":
case "ddd":
case "dddd":
case "a":
case "A":
return z;

case "Z":
case "ZZ":
return U;

case "T":
return $;

case "MM":
case "DD":
case "YY":
case "HH":
case "hh":
case "mm":
case "ss":
case "M":
case "D":
case "d":
case "H":
case "h":
case "m":
case "s":
return F;

default:
return new RegExp(e.replace("\\", ""));
}
}
function y(e, t, n, r) {
var i, o;
switch (e) {
case "M":
case "MM":
n[1] = null == t ? 0 : ~~t - 1;
break;

case "MMM":
case "MMMM":
for (i = 0; 12 > i; i++) if (h().monthsParse[i].test(t)) {
n[1] = i, o = !0;
break;
}
o || (n[8] = !1);
break;

case "D":
case "DD":
case "DDD":
case "DDDD":
null != t && (n[2] = ~~t);
break;

case "YY":
n[0] = ~~t + (~~t > 70 ? 1900 : 2e3);
break;

case "YYYY":
n[0] = ~~Math.abs(t);
break;

case "a":
case "A":
r.isPm = "pm" === (t + "").toLowerCase();
break;

case "H":
case "HH":
case "h":
case "hh":
n[3] = ~~t;
break;

case "m":
case "mm":
n[4] = ~~t;
break;

case "s":
case "ss":
n[5] = ~~t;
break;

case "S":
case "SS":
case "SSS":
n[6] = ~~(1e3 * ("0." + t));
break;

case "Z":
case "ZZ":
r.isUTC = !0, i = (t + "").match(K), i && i[1] && (r.tzh = ~~i[1]), i && i[2] && (r.tzm = ~~i[2]), 
i && "+" === i[0] && (r.tzh = -r.tzh, r.tzm = -r.tzm);
}
null == t && (n[8] = !1);
}
function b(e, t) {
var n, r, i = [ 0, 0, 1, 0, 0, 0, 0 ], o = {
tzh: 0,
tzm: 0
}, a = t.match(q);
for (n = 0; n < a.length; n++) r = (v(a[n]).exec(e) || [])[0], r && (e = e.slice(e.indexOf(r) + r.length)), 
tt[a[n]] && y(a[n], r, i, o);
return o.isPm && i[3] < 12 && (i[3] += 12), o.isPm === !1 && 12 === i[3] && (i[3] = 0), 
l(i, o.isUTC, o.tzh, o.tzm);
}
function x(e, t) {
var n, r, o, a, s, u = e.match(I) || [], c = 99;
for (o = 0; o < t.length; o++) a = b(e, t[o]), r = m(new i(a), t[o]).match(I) || [], 
s = f(u, r), c > s && (c = s, n = a);
return n;
}
function w(e) {
var t, n = "YYYY-MM-DDT";
if (Y.exec(e)) {
for (t = 0; 4 > t; t++) if (V[t][1].exec(e)) {
n += V[t][0];
break;
}
return U.exec(e) ? b(e, n + " Z") : b(e, n);
}
return new Date(e);
}
function _(e, t, n, r, i) {
var o = i.relativeTime[e];
return "function" == typeof o ? o(t || 1, !!n, e, r) : o.replace(/%d/i, t || 1);
}
function k(e, t, n) {
var r = A(Math.abs(e) / 1e3), i = A(r / 60), o = A(i / 60), a = A(o / 24), s = A(a / 365), u = 45 > r && [ "s", r ] || 1 === i && [ "m" ] || 45 > i && [ "mm", i ] || 1 === o && [ "h" ] || 22 > o && [ "hh", o ] || 1 === a && [ "d" ] || 25 >= a && [ "dd", a ] || 45 >= a && [ "M" ] || 345 > a && [ "MM", A(a / 30) ] || 1 === s && [ "y" ] || [ "yy", s ];
return u[2] = t, u[3] = e > 0, u[4] = n, _.apply({}, u);
}
function E(e, t) {
C.fn[e] = function(e) {
var n = this._isUTC ? "UTC" : "";
return null != e ? (this._d["set" + n + t](e), this) : this._d["get" + n + t]();
};
}
function T(e) {
C.duration.fn[e] = function() {
return this._data[e];
};
}
function S(e, t) {
C.duration.fn["as" + e] = function() {
return +this / t;
};
}
for (var C, B, D = "1.7.2", A = Math.round, M = {}, j = "en", O = "undefined" != typeof module && module.exports, N = "months|monthsShort|weekdays|weekdaysShort|weekdaysMin|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"), W = /^\/?Date\((\-?\d+)/i, q = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|.)/g, R = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?)/g, I = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi, F = /\d\d?/, P = /\d{1,3}/, L = /\d{3}/, H = /\d{1,4}/, z = /[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i, U = /Z|[\+\-]\d\d:?\d\d/i, $ = /T/i, Y = /^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, X = "YYYY-MM-DDTHH:mm:ssZ", V = [ [ "HH:mm:ss.S", /T\d\d:\d\d:\d\d\.\d{1,3}/ ], [ "HH:mm:ss", /T\d\d:\d\d:\d\d/ ], [ "HH:mm", /T\d\d:\d\d/ ], [ "HH", /T\d\d/ ] ], K = /([\+\-]|\d\d)/gi, G = "Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"), J = {
Milliseconds: 1,
Seconds: 1e3,
Minutes: 6e4,
Hours: 36e5,
Days: 864e5,
Months: 2592e6,
Years: 31536e6
}, Q = {}, Z = "DDD w M D d".split(" "), et = "M D H h m s w".split(" "), tt = {
M: function() {
return this.month() + 1;
},
MMM: function(e) {
return t("monthsShort", this.month(), this, e);
},
MMMM: function(e) {
return t("months", this.month(), this, e);
},
D: function() {
return this.date();
},
DDD: function() {
var e = new Date(this.year(), this.month(), this.date()), t = new Date(this.year(), 0, 1);
return ~~((e - t) / 864e5 + 1.5);
},
d: function() {
return this.day();
},
dd: function(e) {
return t("weekdaysMin", this.day(), this, e);
},
ddd: function(e) {
return t("weekdaysShort", this.day(), this, e);
},
dddd: function(e) {
return t("weekdays", this.day(), this, e);
},
w: function() {
var e = new Date(this.year(), this.month(), this.date() - this.day() + 5), t = new Date(e.getFullYear(), 0, 4);
return ~~((e - t) / 864e5 / 7 + 1.5);
},
YY: function() {
return s(this.year() % 100, 2);
},
YYYY: function() {
return s(this.year(), 4);
},
a: function() {
return this.lang().meridiem(this.hours(), this.minutes(), !0);
},
A: function() {
return this.lang().meridiem(this.hours(), this.minutes(), !1);
},
H: function() {
return this.hours();
},
h: function() {
return this.hours() % 12 || 12;
},
m: function() {
return this.minutes();
},
s: function() {
return this.seconds();
},
S: function() {
return ~~(this.milliseconds() / 100);
},
SS: function() {
return s(~~(this.milliseconds() / 10), 2);
},
SSS: function() {
return s(this.milliseconds(), 3);
},
Z: function() {
var e = -this.zone(), t = "+";
return 0 > e && (e = -e, t = "-"), t + s(~~(e / 60), 2) + ":" + s(~~e % 60, 2);
},
ZZ: function() {
var e = -this.zone(), t = "+";
return 0 > e && (e = -e, t = "-"), t + s(~~(10 * e / 6), 4);
}
}; Z.length; ) B = Z.pop(), tt[B + "o"] = r(tt[B]);
for (;et.length; ) B = et.pop(), tt[B + B] = n(tt[B], 2);
for (tt.DDDD = n(tt.DDD, 3), C = function(t, n) {
if (null === t || "" === t) return null;
var r, o;
return C.isMoment(t) ? new i(new Date(+t._d), t._isUTC, t._lang) : (n ? r = c(n) ? x(t, n) : b(t, n) : (o = W.exec(t), 
r = t === e ? new Date() : o ? new Date(+o[1]) : t instanceof Date ? t : c(t) ? l(t) : "string" == typeof t ? w(t) : new Date(t)), 
new i(r));
}, C.utc = function(e, t) {
return c(e) ? new i(l(e, !0), !0) : ("string" != typeof e || U.exec(e) || (e += " +0000", 
t && (t += " Z")), C(e, t).utc());
}, C.unix = function(e) {
return C(1e3 * e);
}, C.duration = function(e, t) {
var n, r = C.isDuration(e), i = "number" == typeof e, a = r ? e._data : i ? {} : e;
return i && (t ? a[t] = e : a.milliseconds = e), n = new o(a), r && (n._lang = e._lang), 
n;
}, C.humanizeDuration = function(e, t, n) {
return C.duration(e, t === !0 ? null : t).humanize(t === !0 ? !0 : n);
}, C.version = D, C.defaultFormat = X, C.lang = function(e, t) {
var n;
if (!e) return j;
if ((t || !M[e]) && d(e, t), M[e]) {
for (n = 0; n < N.length; n++) C[N[n]] = M[e][N[n]];
C.monthsParse = M[e].monthsParse, j = e;
}
}, C.langData = h, C.isMoment = function(e) {
return e instanceof i;
}, C.isDuration = function(e) {
return e instanceof o;
}, C.lang("en", {
months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
longDateFormat: {
LT: "h:mm A",
L: "MM/DD/YYYY",
LL: "MMMM D YYYY",
LLL: "MMMM D YYYY LT",
LLLL: "dddd, MMMM D YYYY LT"
},
meridiem: function(e, t, n) {
return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM";
},
calendar: {
sameDay: "[Today at] LT",
nextDay: "[Tomorrow at] LT",
nextWeek: "dddd [at] LT",
lastDay: "[Yesterday at] LT",
lastWeek: "[last] dddd [at] LT",
sameElse: "L"
},
relativeTime: {
future: "in %s",
past: "%s ago",
s: "a few seconds",
m: "a minute",
mm: "%d minutes",
h: "an hour",
hh: "%d hours",
d: "a day",
dd: "%d days",
M: "a month",
MM: "%d months",
y: "a year",
yy: "%d years"
},
ordinal: function(e) {
var t = e % 10;
return 1 === ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
}
}), C.fn = i.prototype = {
clone: function() {
return C(this);
},
valueOf: function() {
return +this._d;
},
unix: function() {
return Math.floor(+this._d / 1e3);
},
toString: function() {
return this._d.toString();
},
toDate: function() {
return this._d;
},
toArray: function() {
var e = this;
return [ e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds(), !!this._isUTC ];
},
isValid: function() {
return this._a ? null != this._a[8] ? !!this._a[8] : !f(this._a, (this._a[7] ? C.utc(this._a) : C(this._a)).toArray()) : !isNaN(this._d.getTime());
},
utc: function() {
return this._isUTC = !0, this;
},
local: function() {
return this._isUTC = !1, this;
},
format: function(e) {
return m(this, e ? e : C.defaultFormat);
},
add: function(e, t) {
var n = t ? C.duration(+t, e) : C.duration(e);
return u(this, n, 1), this;
},
subtract: function(e, t) {
var n = t ? C.duration(+t, e) : C.duration(e);
return u(this, n, -1), this;
},
diff: function(e, t, n) {
var r, i = this._isUTC ? C(e).utc() : C(e).local(), o = 6e4 * (this.zone() - i.zone()), a = this._d - i._d - o, s = this.year() - i.year(), u = this.month() - i.month(), c = this.date() - i.date();
return r = "months" === t ? 12 * s + u + c / 30 : "years" === t ? s + (u + c / 30) / 12 : "seconds" === t ? a / 1e3 : "minutes" === t ? a / 6e4 : "hours" === t ? a / 36e5 : "days" === t ? a / 864e5 : "weeks" === t ? a / 6048e5 : a, 
n ? r : A(r);
},
from: function(e, t) {
return C.duration(this.diff(e)).lang(this._lang).humanize(!t);
},
fromNow: function(e) {
return this.from(C(), e);
},
calendar: function() {
var e = this.diff(C().sod(), "days", !0), t = this.lang().calendar, n = t.sameElse, r = -6 > e ? n : -1 > e ? t.lastWeek : 0 > e ? t.lastDay : 1 > e ? t.sameDay : 2 > e ? t.nextDay : 7 > e ? t.nextWeek : n;
return this.format("function" == typeof r ? r.apply(this) : r);
},
isLeapYear: function() {
var e = this.year();
return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
},
isDST: function() {
return this.zone() < C([ this.year() ]).zone() || this.zone() < C([ this.year(), 5 ]).zone();
},
day: function(e) {
var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
return null == e ? t : this.add({
d: e - t
});
},
startOf: function(e) {
switch (e.replace(/s$/, "")) {
case "year":
this.month(0);

case "month":
this.date(1);

case "day":
this.hours(0);

case "hour":
this.minutes(0);

case "minute":
this.seconds(0);

case "second":
this.milliseconds(0);
}
return this;
},
endOf: function(e) {
return this.startOf(e).add(e.replace(/s?$/, "s"), 1).subtract("ms", 1);
},
sod: function() {
return this.clone().startOf("day");
},
eod: function() {
return this.clone().endOf("day");
},
zone: function() {
return this._isUTC ? 0 : this._d.getTimezoneOffset();
},
daysInMonth: function() {
return C.utc([ this.year(), this.month() + 1, 0 ]).date();
},
lang: function(t) {
return t === e ? h(this) : (this._lang = t, this);
}
}, B = 0; B < G.length; B++) E(G[B].toLowerCase(), G[B]);
E("year", "FullYear"), C.duration.fn = o.prototype = {
weeks: function() {
return a(this.days() / 7);
},
valueOf: function() {
return this._milliseconds + 864e5 * this._days + 2592e6 * this._months;
},
humanize: function(e) {
var t = +this, n = this.lang().relativeTime, r = k(t, !e, this.lang()), i = 0 >= t ? n.past : n.future;
return e && (r = "function" == typeof i ? i(r) : i.replace(/%s/i, r)), r;
},
lang: C.fn.lang
};
for (B in J) J.hasOwnProperty(B) && (S(B, J[B]), T(B.toLowerCase()));
S("Weeks", 6048e5), O && (module.exports = C), "undefined" == typeof ender && (this.moment = C), 
"function" == typeof define && define.amd && define("vendor/moment", [], function() {
return window.moment = null, C;
});
}).call(this);
!function() {

function e(e, t, n) {
return e.addEventListener ? e.addEventListener(t, n, !1) : void e.attachEvent("on" + t, n);
}
function t(e) {
return "keypress" == e.type ? String.fromCharCode(e.which) : b[e.which] ? b[e.which] : x[e.which] ? x[e.which] : String.fromCharCode(e.which).toLowerCase();
}
function n(e) {
var t = e.target || e.srcElement, n = t.tagName;
return (" " + t.className + " ").indexOf(" mousetrap ") > -1 ? !1 : "INPUT" == n || "SELECT" == n || "TEXTAREA" == n || t.contentEditable && "true" == t.contentEditable;
}
function r(e, t) {
return e.sort().join(",") === t.sort().join(",");
}
function i(e) {
e = e || {};
var t, n = !1;
for (t in T) e[t] ? n = !0 : T[t] = 0;
n || (C = !1);
}
function o(e, t, n, i, o) {
var a, s, u = [];
if (!k[e]) return [];
for ("keyup" == n && f(e) && (t = [ e ]), a = 0; a < k[e].length; ++a) s = k[e][a], 
s.seq && T[s.seq] != s.level || n == s.action && ("keypress" == n || r(t, s.modifiers)) && (i && s.combo == o && k[e].splice(a, 1), 
u.push(s));
return u;
}
function a(e) {
var t = [];
return e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.ctrlKey && t.push("ctrl"), 
e.metaKey && t.push("meta"), t;
}
function s(e, t) {
e(t) === !1 && (t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation(), 
t.returnValue = !1, t.cancelBubble = !0);
}
function u(e, t) {
if (!n(t)) {
var r, u = o(e, a(t), t.type), c = {}, l = !1;
for (r = 0; r < u.length; ++r) u[r].seq ? (l = !0, c[u[r].seq] = 1, s(u[r].callback, t)) : l || C || s(u[r].callback, t);
t.type != C || f(e) || i(c);
}
}
function c(e) {
var n = "number" == typeof e.which ? e.which : e.keyCode, r = t({
which: n
});
return r ? "keyup" == e.type && S == r ? void (S = !1) : void u(r, e) : void 0;
}
function f(e) {
return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e;
}
function l() {
clearTimeout(y), y = setTimeout(i, 1e3);
}
function d() {
if (!v) {
v = {};
for (var e in b) e > 95 && 112 > e || b.hasOwnProperty(e) && (v[b[e]] = e);
}
return v;
}
function h(e, t, n) {
return n || (n = d()[e] ? "keydown" : "keypress"), "keypress" == n && t.length && (n = "keydown"), 
n;
}
function p(e, n, r, o) {
T[e] = 0, o || (o = h(n[0], []));
var a, u = function() {
C = o, ++T[e], l();
}, c = function(e) {
s(r, e), "keyup" !== o && (S = t(e)), setTimeout(i, 10);
};
for (a = 0; a < n.length; ++a) g(n[a], a < n.length - 1 ? u : c, o, e, a);
}
function g(e, t, n, r, i) {
e = e.replace(/\s+/g, " ");
var a, s, u, c = e.split(" "), l = [];
if (c.length > 1) return p(e, c, t, n);
for (u = "+" === e ? [ "+" ] : e.split("+"), a = 0; a < u.length; ++a) s = u[a], 
_[s] && (s = _[s]), n && "keypress" != n && w[s] && (s = w[s], l.push("shift")), 
f(s) && l.push(s);
n = h(s, l, n), k[s] || (k[s] = []), o(s, l, n, !r, e), k[s][r ? "unshift" : "push"]({
callback: t,
modifiers: l,
action: n,
seq: r,
level: i,
combo: e
});
}
function m(e, t, n) {
for (var r = 0; r < e.length; ++r) g(e[r], t, n);
}
for (var v, y, b = {
8: "backspace",
9: "tab",
13: "enter",
16: "shift",
17: "ctrl",
18: "alt",
20: "capslock",
27: "esc",
32: "space",
33: "pageup",
34: "pagedown",
35: "end",
36: "home",
37: "left",
38: "up",
39: "right",
40: "down",
45: "ins",
46: "del",
91: "meta",
93: "meta",
224: "meta"
}, x = {
106: "*",
107: "+",
109: "-",
110: ".",
111: "/",
186: ";",
187: "=",
188: ",",
189: "-",
190: ".",
191: "/",
192: "`",
219: "[",
220: "\\",
221: "]",
222: "'"
}, w = {
"~": "`",
"!": "1",
"@": "2",
"#": "3",
$: "4",
"%": "5",
"^": "6",
"&": "7",
"*": "8",
"(": "9",
")": "0",
_: "-",
"+": "=",
":": ";",
'"': "'",
"<": ",",
">": ".",
"?": "/",
"|": "\\"
}, _ = {
option: "alt",
command: "meta",
"return": "enter",
escape: "esc"
}, k = {}, E = {}, T = {}, S = !1, C = !1, B = 1; 20 > B; ++B) b[111 + B] = "f" + B;
for (B = 0; 9 >= B; ++B) b[B + 96] = B;
e(document, "keypress", c), e(document, "keydown", c), e(document, "keyup", c);
var D = {
bind: function(e, t, n) {
return m(e instanceof Array ? e : [ e ], t, n), E[e + ":" + n] = t, this;
},
unbind: function(e, t) {
return E[e + ":" + t] && (delete E[e + ":" + t], this.bind(e, function() {}, t)), 
this;
},
trigger: function(e, t) {
return E[e + ":" + t](), this;
},
reset: function() {
return k = {}, E = {}, this;
}
};
window.Mousetrap = D, "function" == typeof define && define.amd && define('vendor/mousetrap',[],function() {
return D;
});
}();
define('vendor/ua-detector',[],function() {

function e(e) {
for (var t = 0; t < e.length; t++) {
var n = e[t].string, r = e[t].prop;
if (a = e[t].versionSearch || e[t].identity, n) {
if (-1 != n.indexOf(e[t].subString)) return e[t].identity;
} else if (r) return e[t].identity;
}
}
function t(e) {
var t = e.indexOf(a);
if (-1 != t) return parseFloat(e.substring(t + a.length + 1), 10);
}
function n() {
r = e(s) || "An unknown browser", i = t(navigator.userAgent) || t(navigator.appVersion) || "an unknown version", 
o = e(u) || "an unknown OS";
}
var r, i, o, a, s = [ {
string: navigator.userAgent,
subString: "Trident",
identity: "MSIE"
}, {
string: navigator.userAgent,
subString: "Chrome",
identity: "Chrome"
}, {
string: navigator.userAgent,
subString: "NodeWebkit",
identity: "NodeWebkit"
}, {
string: navigator.userAgent,
subString: "OmniWeb",
versionSearch: "OmniWeb/",
identity: "OmniWeb"
}, {
string: navigator.vendor,
subString: "Apple",
identity: "Safari",
versionSearch: "Version"
}, {
prop: window.opera,
identity: "Opera"
}, {
string: navigator.vendor,
subString: "iCab",
identity: "iCab"
}, {
string: navigator.vendor,
subString: "KDE",
identity: "Konqueror"
}, {
string: navigator.userAgent,
subString: "Firefox",
identity: "Firefox"
}, {
string: navigator.vendor,
subString: "Camino",
identity: "Camino"
}, {
string: navigator.userAgent,
subString: "Netscape",
identity: "Netscape"
}, {
string: navigator.userAgent,
subString: "MSIE",
identity: "Explorer",
versionSearch: "MSIE"
}, {
string: navigator.userAgent,
subString: "Gecko",
identity: "Mozilla",
versionSearch: "rv"
}, {
string: navigator.userAgent,
subString: "Mozilla",
identity: "Netscape",
versionSearch: "Mozilla"
} ], u = [ {
string: navigator.platform,
subString: "Win",
identity: "Windows"
}, {
string: navigator.platform,
subString: "Mac",
identity: "Mac"
}, {
string: navigator.userAgent,
subString: "iPhone",
identity: "iPhone/iPod"
}, {
string: navigator.platform,
subString: "Linux",
identity: "Linux"
} ];
return n(), {
os: o,
version: i,
browser: r
};
});