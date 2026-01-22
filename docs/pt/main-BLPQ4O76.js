import {
	$ as Yt,
	A as G,
	B as Ke,
	C as j,
	D as R,
	Da as it,
	E as Gt,
	F as m,
	G as Vr,
	H as b,
	I as y,
	Ia as un,
	J as f,
	K as qr,
	L as Gr,
	M as Wr,
	N as ee,
	O as L,
	P as Qe,
	Q as E,
	R as Xe,
	S as Zr,
	T as ue,
	U as Je,
	V as Wt,
	Va as dn,
	W as Zt,
	Wa as hn,
	X as Yr,
	Xa as fn,
	Y as et,
	Ya as Jt,
	Z as te,
	Za as pn,
	_ as Kr,
	_a as gn,
	a as h,
	aa as Qr,
	ab as mn,
	b as M,
	ba as Kt,
	c as Ur,
	ca as Xr,
	d as xr,
	da as tt,
	e as kr,
	ea as Qt,
	f as B,
	fa as rt,
	g as _,
	h as O,
	i as x,
	ia as Ie,
	j as g,
	ja as Jr,
	k as jr,
	ka as en,
	l as Ft,
	la as tn,
	m as $r,
	ma as rn,
	n as T,
	na as nn,
	o as zr,
	oa as Xt,
	p as V,
	pa as nt,
	q as Hr,
	qa as on,
	r as Ye,
	ra as sn,
	s as ce,
	sa as an,
	t as Bt,
	ta as cn,
	u as Vt,
	ua as ln,
	v as le,
	w as Fr,
	x as q,
	y as qt,
	z as Br,
} from './chunk-VEQDTPWR.js';
var vn = null;
function $() {
	return vn;
}
function er(t) {
	vn ??= t;
}
var Te = class {},
	ot = (() => {
		class t {
			historyGo(e) {
				throw new Error('');
			}
			static ɵfac = function (r) {
				return new (r || t)();
			};
			static ɵprov = m({ token: t, factory: () => f(yn), providedIn: 'platform' });
		}
		return t;
	})();
var yn = (() => {
	class t extends ot {
		_location;
		_history;
		_doc = f(E);
		constructor() {
			(super(), (this._location = window.location), (this._history = window.history));
		}
		getBaseHrefFromDOM() {
			return $().getBaseHref(this._doc);
		}
		onPopState(e) {
			let r = $().getGlobalEventTarget(this._doc, 'window');
			return (r.addEventListener('popstate', e, !1), () => r.removeEventListener('popstate', e));
		}
		onHashChange(e) {
			let r = $().getGlobalEventTarget(this._doc, 'window');
			return (r.addEventListener('hashchange', e, !1), () => r.removeEventListener('hashchange', e));
		}
		get href() {
			return this._location.href;
		}
		get protocol() {
			return this._location.protocol;
		}
		get hostname() {
			return this._location.hostname;
		}
		get port() {
			return this._location.port;
		}
		get pathname() {
			return this._location.pathname;
		}
		get search() {
			return this._location.search;
		}
		get hash() {
			return this._location.hash;
		}
		set pathname(e) {
			this._location.pathname = e;
		}
		pushState(e, r, i) {
			this._history.pushState(e, r, i);
		}
		replaceState(e, r, i) {
			this._history.replaceState(e, r, i);
		}
		forward() {
			this._history.forward();
		}
		back() {
			this._history.back();
		}
		historyGo(e = 0) {
			this._history.go(e);
		}
		getState() {
			return this._history.state;
		}
		static ɵfac = function (r) {
			return new (r || t)();
		};
		static ɵprov = m({ token: t, factory: () => new t(), providedIn: 'platform' });
	}
	return t;
})();
function Rn(t, n) {
	return t
		? n
			? t.endsWith('/')
				? n.startsWith('/')
					? t + n.slice(1)
					: t + n
				: n.startsWith('/')
					? t + n
					: `${t}/${n}`
			: t
		: n;
}
function Sn(t) {
	let n = t.search(/#|\?|$/);
	return t[n - 1] === '/' ? t.slice(0, n - 1) + t.slice(n) : t;
}
function W(t) {
	return t && t[0] !== '?' ? `?${t}` : t;
}
var st = (() => {
		class t {
			historyGo(e) {
				throw new Error('');
			}
			static ɵfac = function (r) {
				return new (r || t)();
			};
			static ɵprov = m({ token: t, factory: () => f(Ui), providedIn: 'root' });
		}
		return t;
	})(),
	Pi = new b(''),
	Ui = (() => {
		class t extends st {
			_platformLocation;
			_baseHref;
			_removeListenerFns = [];
			constructor(e, r) {
				(super(),
					(this._platformLocation = e),
					(this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? f(E).location?.origin ?? ''));
			}
			ngOnDestroy() {
				for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
			}
			onPopState(e) {
				this._removeListenerFns.push(
					this._platformLocation.onPopState(e),
					this._platformLocation.onHashChange(e),
				);
			}
			getBaseHref() {
				return this._baseHref;
			}
			prepareExternalUrl(e) {
				return Rn(this._baseHref, e);
			}
			path(e = !1) {
				let r = this._platformLocation.pathname + W(this._platformLocation.search),
					i = this._platformLocation.hash;
				return i && e ? `${r}${i}` : r;
			}
			pushState(e, r, i, o) {
				let s = this.prepareExternalUrl(i + W(o));
				this._platformLocation.pushState(e, r, s);
			}
			replaceState(e, r, i, o) {
				let s = this.prepareExternalUrl(i + W(o));
				this._platformLocation.replaceState(e, r, s);
			}
			forward() {
				this._platformLocation.forward();
			}
			back() {
				this._platformLocation.back();
			}
			getState() {
				return this._platformLocation.getState();
			}
			historyGo(e = 0) {
				this._platformLocation.historyGo?.(e);
			}
			static ɵfac = function (r) {
				return new (r || t)(y(ot), y(Pi, 8));
			};
			static ɵprov = m({ token: t, factory: t.ɵfac, providedIn: 'root' });
		}
		return t;
	})(),
	he = (() => {
		class t {
			_subject = new B();
			_basePath;
			_locationStrategy;
			_urlChangeListeners = [];
			_urlChangeSubscription = null;
			constructor(e) {
				this._locationStrategy = e;
				let r = this._locationStrategy.getBaseHref();
				((this._basePath = ji(Sn(wn(r)))),
					this._locationStrategy.onPopState((i) => {
						this._subject.next({ url: this.path(!0), pop: !0, state: i.state, type: i.type });
					}));
			}
			ngOnDestroy() {
				(this._urlChangeSubscription?.unsubscribe(), (this._urlChangeListeners = []));
			}
			path(e = !1) {
				return this.normalize(this._locationStrategy.path(e));
			}
			getState() {
				return this._locationStrategy.getState();
			}
			isCurrentPathEqualTo(e, r = '') {
				return this.path() == this.normalize(e + W(r));
			}
			normalize(e) {
				return t.stripTrailingSlash(ki(this._basePath, wn(e)));
			}
			prepareExternalUrl(e) {
				return (e && e[0] !== '/' && (e = '/' + e), this._locationStrategy.prepareExternalUrl(e));
			}
			go(e, r = '', i = null) {
				(this._locationStrategy.pushState(i, '', e, r),
					this._notifyUrlChangeListeners(this.prepareExternalUrl(e + W(r)), i));
			}
			replaceState(e, r = '', i = null) {
				(this._locationStrategy.replaceState(i, '', e, r),
					this._notifyUrlChangeListeners(this.prepareExternalUrl(e + W(r)), i));
			}
			forward() {
				this._locationStrategy.forward();
			}
			back() {
				this._locationStrategy.back();
			}
			historyGo(e = 0) {
				this._locationStrategy.historyGo?.(e);
			}
			onUrlChange(e) {
				return (
					this._urlChangeListeners.push(e),
					(this._urlChangeSubscription ??= this.subscribe((r) => {
						this._notifyUrlChangeListeners(r.url, r.state);
					})),
					() => {
						let r = this._urlChangeListeners.indexOf(e);
						(this._urlChangeListeners.splice(r, 1),
							this._urlChangeListeners.length === 0 &&
								(this._urlChangeSubscription?.unsubscribe(), (this._urlChangeSubscription = null)));
					}
				);
			}
			_notifyUrlChangeListeners(e = '', r) {
				this._urlChangeListeners.forEach((i) => i(e, r));
			}
			subscribe(e, r, i) {
				return this._subject.subscribe({ next: e, error: r ?? void 0, complete: i ?? void 0 });
			}
			static normalizeQueryParams = W;
			static joinWithSlash = Rn;
			static stripTrailingSlash = Sn;
			static ɵfac = function (r) {
				return new (r || t)(y(st));
			};
			static ɵprov = m({ token: t, factory: () => xi(), providedIn: 'root' });
		}
		return t;
	})();
function xi() {
	return new he(y(st));
}
function ki(t, n) {
	if (!t || !n.startsWith(t)) return n;
	let e = n.substring(t.length);
	return e === '' || ['/', ';', '?', '#'].includes(e[0]) ? e : n;
}
function wn(t) {
	return t.replace(/\/index.html$/, '');
}
function ji(t) {
	if (new RegExp('^(https?:)?//').test(t)) {
		let [, e] = t.split(/\/\/[^\/]+/);
		return e;
	}
	return t;
}
function tr(t, n) {
	n = encodeURIComponent(n);
	for (let e of t.split(';')) {
		let r = e.indexOf('='),
			[i, o] = r == -1 ? [e, ''] : [e.slice(0, r), e.slice(r + 1)];
		if (i.trim() === n) return decodeURIComponent(o);
	}
	return null;
}
var Me = class {};
function bn(t, n, e) {
	return un(t, n, e);
}
var Cn = 'browser';
var De = class {
		_doc;
		constructor(n) {
			this._doc = n;
		}
		manager;
	},
	at = (() => {
		class t extends De {
			constructor(e) {
				super(e);
			}
			supports(e) {
				return !0;
			}
			addEventListener(e, r, i, o) {
				return (e.addEventListener(r, i, o), () => this.removeEventListener(e, r, i, o));
			}
			removeEventListener(e, r, i, o) {
				return e.removeEventListener(r, i, o);
			}
			static ɵfac = function (r) {
				return new (r || t)(y(E));
			};
			static ɵprov = m({ token: t, factory: t.ɵfac });
		}
		return t;
	})(),
	ut = new b(''),
	or = (() => {
		class t {
			_zone;
			_plugins;
			_eventNameToPlugin = new Map();
			constructor(e, r) {
				((this._zone = r),
					e.forEach((s) => {
						s.manager = this;
					}));
				let i = e.filter((s) => !(s instanceof at));
				this._plugins = i.slice().reverse();
				let o = e.find((s) => s instanceof at);
				o && this._plugins.push(o);
			}
			addEventListener(e, r, i, o) {
				return this._findPluginFor(r).addEventListener(e, r, i, o);
			}
			getZone() {
				return this._zone;
			}
			_findPluginFor(e) {
				let r = this._eventNameToPlugin.get(e);
				if (r) return r;
				if (((r = this._plugins.find((o) => o.supports(e))), !r)) throw new R(5101, !1);
				return (this._eventNameToPlugin.set(e, r), r);
			}
			static ɵfac = function (r) {
				return new (r || t)(y(ut), y(Je));
			};
			static ɵprov = m({ token: t, factory: t.ɵfac });
		}
		return t;
	})(),
	rr = 'ng-app-id';
function En(t) {
	for (let n of t) n.remove();
}
function In(t, n) {
	let e = n.createElement('style');
	return ((e.textContent = t), e);
}
function Fi(t, n, e, r) {
	let i = t.head?.querySelectorAll(`style[${rr}="${n}"],link[${rr}="${n}"]`);
	if (i)
		for (let o of i)
			(o.removeAttribute(rr),
				o instanceof HTMLLinkElement
					? r.set(o.href.slice(o.href.lastIndexOf('/') + 1), { usage: 0, elements: [o] })
					: o.textContent && e.set(o.textContent, { usage: 0, elements: [o] }));
}
function ir(t, n) {
	let e = n.createElement('link');
	return (e.setAttribute('rel', 'stylesheet'), e.setAttribute('href', t), e);
}
var sr = (() => {
		class t {
			doc;
			appId;
			nonce;
			inline = new Map();
			external = new Map();
			hosts = new Set();
			constructor(e, r, i, o = {}) {
				((this.doc = e),
					(this.appId = r),
					(this.nonce = i),
					Fi(e, r, this.inline, this.external),
					this.hosts.add(e.head));
			}
			addStyles(e, r) {
				for (let i of e) this.addUsage(i, this.inline, In);
				r?.forEach((i) => this.addUsage(i, this.external, ir));
			}
			removeStyles(e, r) {
				for (let i of e) this.removeUsage(i, this.inline);
				r?.forEach((i) => this.removeUsage(i, this.external));
			}
			addUsage(e, r, i) {
				let o = r.get(e);
				o
					? o.usage++
					: r.set(e, { usage: 1, elements: [...this.hosts].map((s) => this.addElement(s, i(e, this.doc))) });
			}
			removeUsage(e, r) {
				let i = r.get(e);
				i && (i.usage--, i.usage <= 0 && (En(i.elements), r.delete(e)));
			}
			ngOnDestroy() {
				for (let [, { elements: e }] of [...this.inline, ...this.external]) En(e);
				this.hosts.clear();
			}
			addHost(e) {
				this.hosts.add(e);
				for (let [r, { elements: i }] of this.inline) i.push(this.addElement(e, In(r, this.doc)));
				for (let [r, { elements: i }] of this.external) i.push(this.addElement(e, ir(r, this.doc)));
			}
			removeHost(e) {
				this.hosts.delete(e);
			}
			addElement(e, r) {
				return (this.nonce && r.setAttribute('nonce', this.nonce), e.appendChild(r));
			}
			static ɵfac = function (r) {
				return new (r || t)(y(E), y(Kt), y(Qt, 8), y(tt));
			};
			static ɵprov = m({ token: t, factory: t.ɵfac });
		}
		return t;
	})(),
	nr = {
		svg: 'http://www.w3.org/2000/svg',
		xhtml: 'http://www.w3.org/1999/xhtml',
		xlink: 'http://www.w3.org/1999/xlink',
		xml: 'http://www.w3.org/XML/1998/namespace',
		xmlns: 'http://www.w3.org/2000/xmlns/',
		math: 'http://www.w3.org/1998/Math/MathML',
	},
	ar = /%COMP%/g;
var Mn = '%COMP%',
	Bi = `_nghost-${Mn}`,
	Vi = `_ngcontent-${Mn}`,
	qi = !0,
	Gi = new b('', { factory: () => qi });
function Wi(t) {
	return Vi.replace(ar, t);
}
function Zi(t) {
	return Bi.replace(ar, t);
}
function Dn(t, n) {
	return n.map((e) => e.replace(ar, t));
}
var cr = (() => {
		class t {
			eventManager;
			sharedStylesHost;
			appId;
			removeStylesOnCompDestroy;
			doc;
			ngZone;
			nonce;
			tracingService;
			rendererByCompId = new Map();
			defaultRenderer;
			constructor(e, r, i, o, s, a, c = null, l = null) {
				((this.eventManager = e),
					(this.sharedStylesHost = r),
					(this.appId = i),
					(this.removeStylesOnCompDestroy = o),
					(this.doc = s),
					(this.ngZone = a),
					(this.nonce = c),
					(this.tracingService = l),
					(this.defaultRenderer = new Ae(e, s, a, this.tracingService)));
			}
			createRenderer(e, r) {
				if (!e || !r) return this.defaultRenderer;
				let i = this.getOrCreateRenderer(e, r);
				return (i instanceof lt ? i.applyToHost(e) : i instanceof _e && i.applyStyles(), i);
			}
			getOrCreateRenderer(e, r) {
				let i = this.rendererByCompId,
					o = i.get(r.id);
				if (!o) {
					let s = this.doc,
						a = this.ngZone,
						c = this.eventManager,
						l = this.sharedStylesHost,
						u = this.removeStylesOnCompDestroy,
						d = this.tracingService;
					switch (r.encapsulation) {
						case rt.Emulated:
							o = new lt(c, l, r, this.appId, u, s, a, d);
							break;
						case rt.ShadowDom:
							return new ct(c, e, r, s, a, this.nonce, d, l);
						case rt.ExperimentalIsolatedShadowDom:
							return new ct(c, e, r, s, a, this.nonce, d);
						default:
							o = new _e(c, l, r, u, s, a, d);
							break;
					}
					i.set(r.id, o);
				}
				return o;
			}
			ngOnDestroy() {
				this.rendererByCompId.clear();
			}
			componentReplaced(e) {
				this.rendererByCompId.delete(e);
			}
			static ɵfac = function (r) {
				return new (r || t)(y(or), y(sr), y(Kt), y(Gi), y(E), y(Je), y(Qt), y(en, 8));
			};
			static ɵprov = m({ token: t, factory: t.ɵfac });
		}
		return t;
	})(),
	Ae = class {
		eventManager;
		doc;
		ngZone;
		tracingService;
		data = Object.create(null);
		throwOnSyntheticProps = !0;
		constructor(n, e, r, i) {
			((this.eventManager = n), (this.doc = e), (this.ngZone = r), (this.tracingService = i));
		}
		destroy() {}
		destroyNode = null;
		createElement(n, e) {
			return e ? this.doc.createElementNS(nr[e] || e, n) : this.doc.createElement(n);
		}
		createComment(n) {
			return this.doc.createComment(n);
		}
		createText(n) {
			return this.doc.createTextNode(n);
		}
		appendChild(n, e) {
			(Tn(n) ? n.content : n).appendChild(e);
		}
		insertBefore(n, e, r) {
			n && (Tn(n) ? n.content : n).insertBefore(e, r);
		}
		removeChild(n, e) {
			e.remove();
		}
		selectRootElement(n, e) {
			let r = typeof n == 'string' ? this.doc.querySelector(n) : n;
			if (!r) throw new R(-5104, !1);
			return (e || (r.textContent = ''), r);
		}
		parentNode(n) {
			return n.parentNode;
		}
		nextSibling(n) {
			return n.nextSibling;
		}
		setAttribute(n, e, r, i) {
			if (i) {
				e = i + ':' + e;
				let o = nr[i];
				o ? n.setAttributeNS(o, e, r) : n.setAttribute(e, r);
			} else n.setAttribute(e, r);
		}
		removeAttribute(n, e, r) {
			if (r) {
				let i = nr[r];
				i ? n.removeAttributeNS(i, e) : n.removeAttribute(`${r}:${e}`);
			} else n.removeAttribute(e);
		}
		addClass(n, e) {
			n.classList.add(e);
		}
		removeClass(n, e) {
			n.classList.remove(e);
		}
		setStyle(n, e, r, i) {
			i & (Ie.DashCase | Ie.Important)
				? n.style.setProperty(e, r, i & Ie.Important ? 'important' : '')
				: (n.style[e] = r);
		}
		removeStyle(n, e, r) {
			r & Ie.DashCase ? n.style.removeProperty(e) : (n.style[e] = '');
		}
		setProperty(n, e, r) {
			n != null && (n[e] = r);
		}
		setValue(n, e) {
			n.nodeValue = e;
		}
		listen(n, e, r, i) {
			if (typeof n == 'string' && ((n = $().getGlobalEventTarget(this.doc, n)), !n)) throw new R(5102, !1);
			let o = this.decoratePreventDefault(r);
			return (
				this.tracingService?.wrapEventListener && (o = this.tracingService.wrapEventListener(n, e, o)),
				this.eventManager.addEventListener(n, e, o, i)
			);
		}
		decoratePreventDefault(n) {
			return (e) => {
				if (e === '__ngUnwrap__') return n;
				n(e) === !1 && e.preventDefault();
			};
		}
	};
function Tn(t) {
	return t.tagName === 'TEMPLATE' && t.content !== void 0;
}
var ct = class extends Ae {
		hostEl;
		sharedStylesHost;
		shadowRoot;
		constructor(n, e, r, i, o, s, a, c) {
			(super(n, i, o, a),
				(this.hostEl = e),
				(this.sharedStylesHost = c),
				(this.shadowRoot = e.attachShadow({ mode: 'open' })),
				this.sharedStylesHost && this.sharedStylesHost.addHost(this.shadowRoot));
			let l = r.styles;
			l = Dn(r.id, l);
			for (let d of l) {
				let S = document.createElement('style');
				(s && S.setAttribute('nonce', s), (S.textContent = d), this.shadowRoot.appendChild(S));
			}
			let u = r.getExternalStyles?.();
			if (u)
				for (let d of u) {
					let S = ir(d, i);
					(s && S.setAttribute('nonce', s), this.shadowRoot.appendChild(S));
				}
		}
		nodeOrShadowRoot(n) {
			return n === this.hostEl ? this.shadowRoot : n;
		}
		appendChild(n, e) {
			return super.appendChild(this.nodeOrShadowRoot(n), e);
		}
		insertBefore(n, e, r) {
			return super.insertBefore(this.nodeOrShadowRoot(n), e, r);
		}
		removeChild(n, e) {
			return super.removeChild(null, e);
		}
		parentNode(n) {
			return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)));
		}
		destroy() {
			this.sharedStylesHost && this.sharedStylesHost.removeHost(this.shadowRoot);
		}
	},
	_e = class extends Ae {
		sharedStylesHost;
		removeStylesOnCompDestroy;
		styles;
		styleUrls;
		constructor(n, e, r, i, o, s, a, c) {
			(super(n, o, s, a), (this.sharedStylesHost = e), (this.removeStylesOnCompDestroy = i));
			let l = r.styles;
			((this.styles = c ? Dn(c, l) : l), (this.styleUrls = r.getExternalStyles?.(c)));
		}
		applyStyles() {
			this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
		}
		destroy() {
			this.removeStylesOnCompDestroy &&
				Jr.size === 0 &&
				this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
		}
	},
	lt = class extends _e {
		contentAttr;
		hostAttr;
		constructor(n, e, r, i, o, s, a, c) {
			let l = i + '-' + r.id;
			(super(n, e, r, o, s, a, c, l), (this.contentAttr = Wi(l)), (this.hostAttr = Zi(l)));
		}
		applyToHost(n) {
			(this.applyStyles(), this.setAttribute(n, this.hostAttr, ''));
		}
		createElement(n, e) {
			let r = super.createElement(n, e);
			return (super.setAttribute(r, this.contentAttr, ''), r);
		}
	};
var dt = class t extends Te {
		supportsDOMEvents = !0;
		static makeCurrent() {
			er(new t());
		}
		onAndCancel(n, e, r, i) {
			return (
				n.addEventListener(e, r, i),
				() => {
					n.removeEventListener(e, r, i);
				}
			);
		}
		dispatchEvent(n, e) {
			n.dispatchEvent(e);
		}
		remove(n) {
			n.remove();
		}
		createElement(n, e) {
			return ((e = e || this.getDefaultDocument()), e.createElement(n));
		}
		createHtmlDocument() {
			return document.implementation.createHTMLDocument('fakeTitle');
		}
		getDefaultDocument() {
			return document;
		}
		isElementNode(n) {
			return n.nodeType === Node.ELEMENT_NODE;
		}
		isShadowRoot(n) {
			return n instanceof DocumentFragment;
		}
		getGlobalEventTarget(n, e) {
			return e === 'window' ? window : e === 'document' ? n : e === 'body' ? n.body : null;
		}
		getBaseHref(n) {
			let e = Qi();
			return e == null ? null : Xi(e);
		}
		resetBaseElement() {
			Oe = null;
		}
		getUserAgent() {
			return window.navigator.userAgent;
		}
		getCookie(n) {
			return tr(document.cookie, n);
		}
	},
	Oe = null;
function Qi() {
	return ((Oe = Oe || document.head.querySelector('base')), Oe ? Oe.getAttribute('href') : null);
}
function Xi(t) {
	return new URL(t, document.baseURI).pathname;
}
var Ji = (() => {
		class t {
			build() {
				return new XMLHttpRequest();
			}
			static ɵfac = function (r) {
				return new (r || t)();
			};
			static ɵprov = m({ token: t, factory: t.ɵfac });
		}
		return t;
	})(),
	An = ['alt', 'control', 'meta', 'shift'],
	eo = {
		'\b': 'Backspace',
		'	': 'Tab',
		'\x7F': 'Delete',
		'\x1B': 'Escape',
		Del: 'Delete',
		Esc: 'Escape',
		Left: 'ArrowLeft',
		Right: 'ArrowRight',
		Up: 'ArrowUp',
		Down: 'ArrowDown',
		Menu: 'ContextMenu',
		Scroll: 'ScrollLock',
		Win: 'OS',
	},
	to = { alt: (t) => t.altKey, control: (t) => t.ctrlKey, meta: (t) => t.metaKey, shift: (t) => t.shiftKey },
	_n = (() => {
		class t extends De {
			constructor(e) {
				super(e);
			}
			supports(e) {
				return t.parseEventName(e) != null;
			}
			addEventListener(e, r, i, o) {
				let s = t.parseEventName(r),
					a = t.eventCallback(s.fullKey, i, this.manager.getZone());
				return this.manager.getZone().runOutsideAngular(() => $().onAndCancel(e, s.domEventName, a, o));
			}
			static parseEventName(e) {
				let r = e.toLowerCase().split('.'),
					i = r.shift();
				if (r.length === 0 || !(i === 'keydown' || i === 'keyup')) return null;
				let o = t._normalizeKey(r.pop()),
					s = '',
					a = r.indexOf('code');
				if (
					(a > -1 && (r.splice(a, 1), (s = 'code.')),
					An.forEach((l) => {
						let u = r.indexOf(l);
						u > -1 && (r.splice(u, 1), (s += l + '.'));
					}),
					(s += o),
					r.length != 0 || o.length === 0)
				)
					return null;
				let c = {};
				return ((c.domEventName = i), (c.fullKey = s), c);
			}
			static matchEventFullKeyCode(e, r) {
				let i = eo[e.key] || e.key,
					o = '';
				return (
					r.indexOf('code.') > -1 && ((i = e.code), (o = 'code.')),
					i == null || !i
						? !1
						: ((i = i.toLowerCase()),
							i === ' ' ? (i = 'space') : i === '.' && (i = 'dot'),
							An.forEach((s) => {
								if (s !== i) {
									let a = to[s];
									a(e) && (o += s + '.');
								}
							}),
							(o += i),
							o === r)
				);
			}
			static eventCallback(e, r, i) {
				return (o) => {
					t.matchEventFullKeyCode(o, e) && i.runGuarded(() => r(o));
				};
			}
			static _normalizeKey(e) {
				return e === 'esc' ? 'escape' : e;
			}
			static ɵfac = function (r) {
				return new (r || t)(y(E));
			};
			static ɵprov = m({ token: t, factory: t.ɵfac });
		}
		return t;
	})();
async function lr(t, n, e) {
	let r = h({ rootComponent: t }, ro(n, e));
	return pn(r);
}
function ro(t, n) {
	return { platformRef: n?.platformRef, appProviders: [...ao, ...(t?.providers ?? [])], platformProviders: so };
}
function no() {
	dt.makeCurrent();
}
function io() {
	return new Wt();
}
function oo() {
	return (Qr(document), document);
}
var so = [
	{ provide: tt, useValue: Cn },
	{ provide: Xr, useValue: no, multi: !0 },
	{ provide: E, useFactory: oo },
];
var ao = [
	{ provide: Wr, useValue: 'root' },
	{ provide: Wt, useFactory: io },
	{ provide: ut, useClass: at, multi: !0 },
	{ provide: ut, useClass: _n, multi: !0 },
	cr,
	sr,
	or,
	{ provide: tn, useExisting: cr },
	{ provide: Me, useClass: Ji },
	[],
];
var On = (() => {
	class t {
		_doc;
		constructor(e) {
			this._doc = e;
		}
		getTitle() {
			return this._doc.title;
		}
		setTitle(e) {
			this._doc.title = e || '';
		}
		static ɵfac = function (r) {
			return new (r || t)(y(E));
		};
		static ɵprov = m({ token: t, factory: t.ɵfac, providedIn: 'root' });
	}
	return t;
})();
var p = 'primary',
	Be = Symbol('RouteTitle'),
	pr = class {
		params;
		constructor(n) {
			this.params = n || {};
		}
		has(n) {
			return Object.prototype.hasOwnProperty.call(this.params, n);
		}
		get(n) {
			if (this.has(n)) {
				let e = this.params[n];
				return Array.isArray(e) ? e[0] : e;
			}
			return null;
		}
		getAll(n) {
			if (this.has(n)) {
				let e = this.params[n];
				return Array.isArray(e) ? e : [e];
			}
			return [];
		}
		get keys() {
			return Object.keys(this.params);
		}
	};
function ie(t) {
	return new pr(t);
}
function ur(t, n, e) {
	for (let r = 0; r < t.length; r++) {
		let i = t[r],
			o = n[r];
		if (i[0] === ':') e[i.substring(1)] = o;
		else if (i !== o.path) return !1;
	}
	return !0;
}
function Hn(t, n, e) {
	let r = e.path.split('/'),
		i = r.indexOf('**');
	if (i === -1) {
		if (r.length > t.length || (e.pathMatch === 'full' && (n.hasChildren() || r.length < t.length))) return null;
		let c = {},
			l = t.slice(0, r.length);
		return ur(r, l, c) ? { consumed: l, posParams: c } : null;
	}
	if (i !== r.lastIndexOf('**')) return null;
	let o = r.slice(0, i),
		s = r.slice(i + 1);
	if (o.length + s.length > t.length || (e.pathMatch === 'full' && n.hasChildren() && e.path !== '**')) return null;
	let a = {};
	return !ur(o, t.slice(0, o.length), a) || !ur(s, t.slice(t.length - s.length), a)
		? null
		: { consumed: t, posParams: a };
}
function vt(t) {
	return new Promise((n, e) => {
		t.pipe(q()).subscribe({ next: (r) => n(r), error: (r) => e(r) });
	});
}
function uo(t, n) {
	if (t.length !== n.length) return !1;
	for (let e = 0; e < t.length; ++e) if (!k(t[e], n[e])) return !1;
	return !0;
}
function k(t, n) {
	let e = t ? gr(t) : void 0,
		r = n ? gr(n) : void 0;
	if (!e || !r || e.length != r.length) return !1;
	let i;
	for (let o = 0; o < e.length; o++) if (((i = e[o]), !Fn(t[i], n[i]))) return !1;
	return !0;
}
function gr(t) {
	return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
}
function Fn(t, n) {
	if (Array.isArray(t) && Array.isArray(n)) {
		if (t.length !== n.length) return !1;
		let e = [...t].sort(),
			r = [...n].sort();
		return e.every((i, o) => r[o] === i);
	} else return t === n;
}
function ho(t) {
	return t.length > 0 ? t[t.length - 1] : null;
}
function ae(t) {
	return Ft(t) ? t : an(t) ? x(Promise.resolve(t)) : g(t);
}
function Bn(t) {
	return Ft(t) ? vt(t) : Promise.resolve(t);
}
var fo = { exact: qn, subset: Gn },
	Vn = { exact: po, subset: go, ignored: () => !0 };
function Ln(t, n, e) {
	return (
		fo[e.paths](t.root, n.root, e.matrixParams) &&
		Vn[e.queryParams](t.queryParams, n.queryParams) &&
		!(e.fragment === 'exact' && t.fragment !== n.fragment)
	);
}
function po(t, n) {
	return k(t, n);
}
function qn(t, n, e) {
	if (!re(t.segments, n.segments) || !pt(t.segments, n.segments, e) || t.numberOfChildren !== n.numberOfChildren)
		return !1;
	for (let r in n.children) if (!t.children[r] || !qn(t.children[r], n.children[r], e)) return !1;
	return !0;
}
function go(t, n) {
	return Object.keys(n).length <= Object.keys(t).length && Object.keys(n).every((e) => Fn(t[e], n[e]));
}
function Gn(t, n, e) {
	return Wn(t, n, n.segments, e);
}
function Wn(t, n, e, r) {
	if (t.segments.length > e.length) {
		let i = t.segments.slice(0, e.length);
		return !(!re(i, e) || n.hasChildren() || !pt(i, e, r));
	} else if (t.segments.length === e.length) {
		if (!re(t.segments, e) || !pt(t.segments, e, r)) return !1;
		for (let i in n.children) if (!t.children[i] || !Gn(t.children[i], n.children[i], r)) return !1;
		return !0;
	} else {
		let i = e.slice(0, t.segments.length),
			o = e.slice(t.segments.length);
		return !re(t.segments, i) || !pt(t.segments, i, r) || !t.children[p] ? !1 : Wn(t.children[p], n, o, r);
	}
}
function pt(t, n, e) {
	return n.every((r, i) => Vn[e](t[i].parameters, r.parameters));
}
var U = class {
		root;
		queryParams;
		fragment;
		_queryParamMap;
		constructor(n = new v([], {}), e = {}, r = null) {
			((this.root = n), (this.queryParams = e), (this.fragment = r));
		}
		get queryParamMap() {
			return ((this._queryParamMap ??= ie(this.queryParams)), this._queryParamMap);
		}
		toString() {
			return yo.serialize(this);
		}
	},
	v = class {
		segments;
		children;
		parent = null;
		constructor(n, e) {
			((this.segments = n), (this.children = e), Object.values(e).forEach((r) => (r.parent = this)));
		}
		hasChildren() {
			return this.numberOfChildren > 0;
		}
		get numberOfChildren() {
			return Object.keys(this.children).length;
		}
		toString() {
			return gt(this);
		}
	},
	Z = class {
		path;
		parameters;
		_parameterMap;
		constructor(n, e) {
			((this.path = n), (this.parameters = e));
		}
		get parameterMap() {
			return ((this._parameterMap ??= ie(this.parameters)), this._parameterMap);
		}
		toString() {
			return Yn(this);
		}
	};
function mo(t, n) {
	return re(t, n) && t.every((e, r) => k(e.parameters, n[r].parameters));
}
function re(t, n) {
	return t.length !== n.length ? !1 : t.every((e, r) => e.path === n[r].path);
}
function vo(t, n) {
	let e = [];
	return (
		Object.entries(t.children).forEach(([r, i]) => {
			r === p && (e = e.concat(n(i, r)));
		}),
		Object.entries(t.children).forEach(([r, i]) => {
			r !== p && (e = e.concat(n(i, r)));
		}),
		e
	);
}
var Ve = (() => {
		class t {
			static ɵfac = function (r) {
				return new (r || t)();
			};
			static ɵprov = m({ token: t, factory: () => new Y(), providedIn: 'root' });
		}
		return t;
	})(),
	Y = class {
		parse(n) {
			let e = new vr(n);
			return new U(e.parseRootSegment(), e.parseQueryParams(), e.parseFragment());
		}
		serialize(n) {
			let e = `/${Le(n.root, !0)}`,
				r = Ro(n.queryParams),
				i = typeof n.fragment == 'string' ? `#${So(n.fragment)}` : '';
			return `${e}${r}${i}`;
		}
	},
	yo = new Y();
function gt(t) {
	return t.segments.map((n) => Yn(n)).join('/');
}
function Le(t, n) {
	if (!t.hasChildren()) return gt(t);
	if (n) {
		let e = t.children[p] ? Le(t.children[p], !1) : '',
			r = [];
		return (
			Object.entries(t.children).forEach(([i, o]) => {
				i !== p && r.push(`${i}:${Le(o, !1)}`);
			}),
			r.length > 0 ? `${e}(${r.join('//')})` : e
		);
	} else {
		let e = vo(t, (r, i) => (i === p ? [Le(t.children[p], !1)] : [`${i}:${Le(r, !1)}`]));
		return Object.keys(t.children).length === 1 && t.children[p] != null
			? `${gt(t)}/${e[0]}`
			: `${gt(t)}/(${e.join('//')})`;
	}
}
function Zn(t) {
	return encodeURIComponent(t).replace(/%40/g, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',');
}
function ht(t) {
	return Zn(t).replace(/%3B/gi, ';');
}
function So(t) {
	return encodeURI(t);
}
function mr(t) {
	return Zn(t).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
}
function mt(t) {
	return decodeURIComponent(t);
}
function Nn(t) {
	return mt(t.replace(/\+/g, '%20'));
}
function Yn(t) {
	return `${mr(t.path)}${wo(t.parameters)}`;
}
function wo(t) {
	return Object.entries(t)
		.map(([n, e]) => `;${mr(n)}=${mr(e)}`)
		.join('');
}
function Ro(t) {
	let n = Object.entries(t)
		.map(([e, r]) => (Array.isArray(r) ? r.map((i) => `${ht(e)}=${ht(i)}`).join('&') : `${ht(e)}=${ht(r)}`))
		.filter((e) => e);
	return n.length ? `?${n.join('&')}` : '';
}
var bo = /^[^\/()?;#]+/;
function dr(t) {
	let n = t.match(bo);
	return n ? n[0] : '';
}
var Co = /^[^\/()?;=#]+/;
function Eo(t) {
	let n = t.match(Co);
	return n ? n[0] : '';
}
var Io = /^[^=?&#]+/;
function To(t) {
	let n = t.match(Io);
	return n ? n[0] : '';
}
var Mo = /^[^&#]+/;
function Do(t) {
	let n = t.match(Mo);
	return n ? n[0] : '';
}
var vr = class {
	url;
	remaining;
	constructor(n) {
		((this.url = n), (this.remaining = n));
	}
	parseRootSegment() {
		return (
			this.consumeOptional('/'),
			this.remaining === '' || this.peekStartsWith('?') || this.peekStartsWith('#')
				? new v([], {})
				: new v([], this.parseChildren())
		);
	}
	parseQueryParams() {
		let n = {};
		if (this.consumeOptional('?'))
			do this.parseQueryParam(n);
			while (this.consumeOptional('&'));
		return n;
	}
	parseFragment() {
		return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
	}
	parseChildren() {
		if (this.remaining === '') return {};
		this.consumeOptional('/');
		let n = [];
		for (
			this.peekStartsWith('(') || n.push(this.parseSegment());
			this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(');
		)
			(this.capture('/'), n.push(this.parseSegment()));
		let e = {};
		this.peekStartsWith('/(') && (this.capture('/'), (e = this.parseParens(!0)));
		let r = {};
		return (
			this.peekStartsWith('(') && (r = this.parseParens(!1)),
			(n.length > 0 || Object.keys(e).length > 0) && (r[p] = new v(n, e)),
			r
		);
	}
	parseSegment() {
		let n = dr(this.remaining);
		if (n === '' && this.peekStartsWith(';')) throw new R(4009, !1);
		return (this.capture(n), new Z(mt(n), this.parseMatrixParams()));
	}
	parseMatrixParams() {
		let n = {};
		for (; this.consumeOptional(';'); ) this.parseParam(n);
		return n;
	}
	parseParam(n) {
		let e = Eo(this.remaining);
		if (!e) return;
		this.capture(e);
		let r = '';
		if (this.consumeOptional('=')) {
			let i = dr(this.remaining);
			i && ((r = i), this.capture(r));
		}
		n[mt(e)] = mt(r);
	}
	parseQueryParam(n) {
		let e = To(this.remaining);
		if (!e) return;
		this.capture(e);
		let r = '';
		if (this.consumeOptional('=')) {
			let s = Do(this.remaining);
			s && ((r = s), this.capture(r));
		}
		let i = Nn(e),
			o = Nn(r);
		if (n.hasOwnProperty(i)) {
			let s = n[i];
			(Array.isArray(s) || ((s = [s]), (n[i] = s)), s.push(o));
		} else n[i] = o;
	}
	parseParens(n) {
		let e = {};
		for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
			let r = dr(this.remaining),
				i = this.remaining[r.length];
			if (i !== '/' && i !== ')' && i !== ';') throw new R(4010, !1);
			let o;
			r.indexOf(':') > -1 ? ((o = r.slice(0, r.indexOf(':'))), this.capture(o), this.capture(':')) : n && (o = p);
			let s = this.parseChildren();
			((e[o ?? p] = Object.keys(s).length === 1 && s[p] ? s[p] : new v([], s)), this.consumeOptional('//'));
		}
		return e;
	}
	peekStartsWith(n) {
		return this.remaining.startsWith(n);
	}
	consumeOptional(n) {
		return this.peekStartsWith(n) ? ((this.remaining = this.remaining.substring(n.length)), !0) : !1;
	}
	capture(n) {
		if (!this.consumeOptional(n)) throw new R(4011, !1);
	}
};
function Kn(t) {
	return t.segments.length > 0 ? new v([], { [p]: t }) : t;
}
function Qn(t) {
	let n = {};
	for (let [r, i] of Object.entries(t.children)) {
		let o = Qn(i);
		if (r === p && o.segments.length === 0 && o.hasChildren())
			for (let [s, a] of Object.entries(o.children)) n[s] = a;
		else (o.segments.length > 0 || o.hasChildren()) && (n[r] = o);
	}
	let e = new v(t.segments, n);
	return Ao(e);
}
function Ao(t) {
	if (t.numberOfChildren === 1 && t.children[p]) {
		let n = t.children[p];
		return new v(t.segments.concat(n.segments), n.children);
	}
	return t;
}
function me(t) {
	return t instanceof U;
}
function Xn(t, n, e = null, r = null, i = new Y()) {
	let o = Jn(t);
	return ei(o, n, e, r, i);
}
function Jn(t) {
	let n;
	function e(o) {
		let s = {};
		for (let c of o.children) {
			let l = e(c);
			s[c.outlet] = l;
		}
		let a = new v(o.url, s);
		return (o === t && (n = a), a);
	}
	let r = e(t.root),
		i = Kn(r);
	return n ?? i;
}
function ei(t, n, e, r, i) {
	let o = t;
	for (; o.parent; ) o = o.parent;
	if (n.length === 0) return hr(o, o, o, e, r, i);
	let s = _o(n);
	if (s.toRoot()) return hr(o, o, new v([], {}), e, r, i);
	let a = Oo(s, o, t),
		c = a.processChildren ? Pe(a.segmentGroup, a.index, s.commands) : ri(a.segmentGroup, a.index, s.commands);
	return hr(o, a.segmentGroup, c, e, r, i);
}
function yt(t) {
	return typeof t == 'object' && t != null && !t.outlets && !t.segmentPath;
}
function ke(t) {
	return typeof t == 'object' && t != null && t.outlets;
}
function Pn(t, n, e) {
	t ||= '\u0275';
	let r = new U();
	return ((r.queryParams = { [t]: n }), e.parse(e.serialize(r)).queryParams[t]);
}
function hr(t, n, e, r, i, o) {
	let s = {};
	for (let [l, u] of Object.entries(r ?? {})) s[l] = Array.isArray(u) ? u.map((d) => Pn(l, d, o)) : Pn(l, u, o);
	let a;
	t === n ? (a = e) : (a = ti(t, n, e));
	let c = Kn(Qn(a));
	return new U(c, s, i);
}
function ti(t, n, e) {
	let r = {};
	return (
		Object.entries(t.children).forEach(([i, o]) => {
			o === n ? (r[i] = e) : (r[i] = ti(o, n, e));
		}),
		new v(t.segments, r)
	);
}
var St = class {
	isAbsolute;
	numberOfDoubleDots;
	commands;
	constructor(n, e, r) {
		if (((this.isAbsolute = n), (this.numberOfDoubleDots = e), (this.commands = r), n && r.length > 0 && yt(r[0])))
			throw new R(4003, !1);
		let i = r.find(ke);
		if (i && i !== ho(r)) throw new R(4004, !1);
	}
	toRoot() {
		return this.isAbsolute && this.commands.length === 1 && this.commands[0] == '/';
	}
};
function _o(t) {
	if (typeof t[0] == 'string' && t.length === 1 && t[0] === '/') return new St(!0, 0, t);
	let n = 0,
		e = !1,
		r = t.reduce((i, o, s) => {
			if (typeof o == 'object' && o != null) {
				if (o.outlets) {
					let a = {};
					return (
						Object.entries(o.outlets).forEach(([c, l]) => {
							a[c] = typeof l == 'string' ? l.split('/') : l;
						}),
						[...i, { outlets: a }]
					);
				}
				if (o.segmentPath) return [...i, o.segmentPath];
			}
			return typeof o != 'string'
				? [...i, o]
				: s === 0
					? (o.split('/').forEach((a, c) => {
							(c == 0 && a === '.') ||
								(c == 0 && a === '' ? (e = !0) : a === '..' ? n++ : a != '' && i.push(a));
						}),
						i)
					: [...i, o];
		}, []);
	return new St(e, n, r);
}
var pe = class {
	segmentGroup;
	processChildren;
	index;
	constructor(n, e, r) {
		((this.segmentGroup = n), (this.processChildren = e), (this.index = r));
	}
};
function Oo(t, n, e) {
	if (t.isAbsolute) return new pe(n, !0, 0);
	if (!e) return new pe(n, !1, NaN);
	if (e.parent === null) return new pe(e, !0, 0);
	let r = yt(t.commands[0]) ? 0 : 1,
		i = e.segments.length - 1 + r;
	return Lo(e, i, t.numberOfDoubleDots);
}
function Lo(t, n, e) {
	let r = t,
		i = n,
		o = e;
	for (; o > i; ) {
		if (((o -= i), (r = r.parent), !r)) throw new R(4005, !1);
		i = r.segments.length;
	}
	return new pe(r, !1, i - o);
}
function No(t) {
	return ke(t[0]) ? t[0].outlets : { [p]: t };
}
function ri(t, n, e) {
	if (((t ??= new v([], {})), t.segments.length === 0 && t.hasChildren())) return Pe(t, n, e);
	let r = Po(t, n, e),
		i = e.slice(r.commandIndex);
	if (r.match && r.pathIndex < t.segments.length) {
		let o = new v(t.segments.slice(0, r.pathIndex), {});
		return ((o.children[p] = new v(t.segments.slice(r.pathIndex), t.children)), Pe(o, 0, i));
	} else
		return r.match && i.length === 0
			? new v(t.segments, {})
			: r.match && !t.hasChildren()
				? yr(t, n, e)
				: r.match
					? Pe(t, 0, i)
					: yr(t, n, e);
}
function Pe(t, n, e) {
	if (e.length === 0) return new v(t.segments, {});
	{
		let r = No(e),
			i = {};
		if (
			Object.keys(r).some((o) => o !== p) &&
			t.children[p] &&
			t.numberOfChildren === 1 &&
			t.children[p].segments.length === 0
		) {
			let o = Pe(t.children[p], n, e);
			return new v(t.segments, o.children);
		}
		return (
			Object.entries(r).forEach(([o, s]) => {
				(typeof s == 'string' && (s = [s]), s !== null && (i[o] = ri(t.children[o], n, s)));
			}),
			Object.entries(t.children).forEach(([o, s]) => {
				r[o] === void 0 && (i[o] = s);
			}),
			new v(t.segments, i)
		);
	}
}
function Po(t, n, e) {
	let r = 0,
		i = n,
		o = { match: !1, pathIndex: 0, commandIndex: 0 };
	for (; i < t.segments.length; ) {
		if (r >= e.length) return o;
		let s = t.segments[i],
			a = e[r];
		if (ke(a)) break;
		let c = `${a}`,
			l = r < e.length - 1 ? e[r + 1] : null;
		if (i > 0 && c === void 0) break;
		if (c && l && typeof l == 'object' && l.outlets === void 0) {
			if (!xn(c, l, s)) return o;
			r += 2;
		} else {
			if (!xn(c, {}, s)) return o;
			r++;
		}
		i++;
	}
	return { match: !0, pathIndex: i, commandIndex: r };
}
function yr(t, n, e) {
	let r = t.segments.slice(0, n),
		i = 0;
	for (; i < e.length; ) {
		let o = e[i];
		if (ke(o)) {
			let c = Uo(o.outlets);
			return new v(r, c);
		}
		if (i === 0 && yt(e[0])) {
			let c = t.segments[n];
			(r.push(new Z(c.path, Un(e[0]))), i++);
			continue;
		}
		let s = ke(o) ? o.outlets[p] : `${o}`,
			a = i < e.length - 1 ? e[i + 1] : null;
		s && a && yt(a) ? (r.push(new Z(s, Un(a))), (i += 2)) : (r.push(new Z(s, {})), i++);
	}
	return new v(r, {});
}
function Uo(t) {
	let n = {};
	return (
		Object.entries(t).forEach(([e, r]) => {
			(typeof r == 'string' && (r = [r]), r !== null && (n[e] = yr(new v([], {}), 0, r)));
		}),
		n
	);
}
function Un(t) {
	let n = {};
	return (Object.entries(t).forEach(([e, r]) => (n[e] = `${r}`)), n);
}
function xn(t, n, e) {
	return t == e.path && k(n, e.parameters);
}
var Ue = 'imperative',
	C = (function (t) {
		return (
			(t[(t.NavigationStart = 0)] = 'NavigationStart'),
			(t[(t.NavigationEnd = 1)] = 'NavigationEnd'),
			(t[(t.NavigationCancel = 2)] = 'NavigationCancel'),
			(t[(t.NavigationError = 3)] = 'NavigationError'),
			(t[(t.RoutesRecognized = 4)] = 'RoutesRecognized'),
			(t[(t.ResolveStart = 5)] = 'ResolveStart'),
			(t[(t.ResolveEnd = 6)] = 'ResolveEnd'),
			(t[(t.GuardsCheckStart = 7)] = 'GuardsCheckStart'),
			(t[(t.GuardsCheckEnd = 8)] = 'GuardsCheckEnd'),
			(t[(t.RouteConfigLoadStart = 9)] = 'RouteConfigLoadStart'),
			(t[(t.RouteConfigLoadEnd = 10)] = 'RouteConfigLoadEnd'),
			(t[(t.ChildActivationStart = 11)] = 'ChildActivationStart'),
			(t[(t.ChildActivationEnd = 12)] = 'ChildActivationEnd'),
			(t[(t.ActivationStart = 13)] = 'ActivationStart'),
			(t[(t.ActivationEnd = 14)] = 'ActivationEnd'),
			(t[(t.Scroll = 15)] = 'Scroll'),
			(t[(t.NavigationSkipped = 16)] = 'NavigationSkipped'),
			t
		);
	})(C || {}),
	A = class {
		id;
		url;
		constructor(n, e) {
			((this.id = n), (this.url = e));
		}
	},
	oe = class extends A {
		type = C.NavigationStart;
		navigationTrigger;
		restoredState;
		constructor(n, e, r = 'imperative', i = null) {
			(super(n, e), (this.navigationTrigger = r), (this.restoredState = i));
		}
		toString() {
			return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
		}
	},
	H = class extends A {
		urlAfterRedirects;
		type = C.NavigationEnd;
		constructor(n, e, r) {
			(super(n, e), (this.urlAfterRedirects = r));
		}
		toString() {
			return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
		}
	},
	I = (function (t) {
		return (
			(t[(t.Redirect = 0)] = 'Redirect'),
			(t[(t.SupersededByNewNavigation = 1)] = 'SupersededByNewNavigation'),
			(t[(t.NoDataFromResolver = 2)] = 'NoDataFromResolver'),
			(t[(t.GuardRejected = 3)] = 'GuardRejected'),
			(t[(t.Aborted = 4)] = 'Aborted'),
			t
		);
	})(I || {}),
	je = (function (t) {
		return (
			(t[(t.IgnoredSameUrlNavigation = 0)] = 'IgnoredSameUrlNavigation'),
			(t[(t.IgnoredByUrlHandlingStrategy = 1)] = 'IgnoredByUrlHandlingStrategy'),
			t
		);
	})(je || {}),
	N = class extends A {
		reason;
		code;
		type = C.NavigationCancel;
		constructor(n, e, r, i) {
			(super(n, e), (this.reason = r), (this.code = i));
		}
		toString() {
			return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
		}
	};
function ni(t) {
	return t instanceof N && (t.code === I.Redirect || t.code === I.SupersededByNewNavigation);
}
var F = class extends A {
		reason;
		code;
		type = C.NavigationSkipped;
		constructor(n, e, r, i) {
			(super(n, e), (this.reason = r), (this.code = i));
		}
	},
	se = class extends A {
		error;
		target;
		type = C.NavigationError;
		constructor(n, e, r, i) {
			(super(n, e), (this.error = r), (this.target = i));
		}
		toString() {
			return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
		}
	},
	ve = class extends A {
		urlAfterRedirects;
		state;
		type = C.RoutesRecognized;
		constructor(n, e, r, i) {
			(super(n, e), (this.urlAfterRedirects = r), (this.state = i));
		}
		toString() {
			return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
		}
	},
	wt = class extends A {
		urlAfterRedirects;
		state;
		type = C.GuardsCheckStart;
		constructor(n, e, r, i) {
			(super(n, e), (this.urlAfterRedirects = r), (this.state = i));
		}
		toString() {
			return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
		}
	},
	Rt = class extends A {
		urlAfterRedirects;
		state;
		shouldActivate;
		type = C.GuardsCheckEnd;
		constructor(n, e, r, i, o) {
			(super(n, e), (this.urlAfterRedirects = r), (this.state = i), (this.shouldActivate = o));
		}
		toString() {
			return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
		}
	},
	bt = class extends A {
		urlAfterRedirects;
		state;
		type = C.ResolveStart;
		constructor(n, e, r, i) {
			(super(n, e), (this.urlAfterRedirects = r), (this.state = i));
		}
		toString() {
			return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
		}
	},
	Ct = class extends A {
		urlAfterRedirects;
		state;
		type = C.ResolveEnd;
		constructor(n, e, r, i) {
			(super(n, e), (this.urlAfterRedirects = r), (this.state = i));
		}
		toString() {
			return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
		}
	},
	Et = class {
		route;
		type = C.RouteConfigLoadStart;
		constructor(n) {
			this.route = n;
		}
		toString() {
			return `RouteConfigLoadStart(path: ${this.route.path})`;
		}
	},
	It = class {
		route;
		type = C.RouteConfigLoadEnd;
		constructor(n) {
			this.route = n;
		}
		toString() {
			return `RouteConfigLoadEnd(path: ${this.route.path})`;
		}
	},
	Tt = class {
		snapshot;
		type = C.ChildActivationStart;
		constructor(n) {
			this.snapshot = n;
		}
		toString() {
			return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
		}
	},
	Mt = class {
		snapshot;
		type = C.ChildActivationEnd;
		constructor(n) {
			this.snapshot = n;
		}
		toString() {
			return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
		}
	},
	Dt = class {
		snapshot;
		type = C.ActivationStart;
		constructor(n) {
			this.snapshot = n;
		}
		toString() {
			return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
		}
	},
	At = class {
		snapshot;
		type = C.ActivationEnd;
		constructor(n) {
			this.snapshot = n;
		}
		toString() {
			return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
		}
	};
var ye = class {},
	Se = class {
		url;
		navigationBehaviorOptions;
		constructor(n, e) {
			((this.url = n), (this.navigationBehaviorOptions = e));
		}
	};
function xo(t) {
	return !(t instanceof ye) && !(t instanceof Se);
}
var _t = class {
		rootInjector;
		outlet = null;
		route = null;
		children;
		attachRef = null;
		get injector() {
			return this.route?.snapshot._environmentInjector ?? this.rootInjector;
		}
		constructor(n) {
			((this.rootInjector = n), (this.children = new be(this.rootInjector)));
		}
	},
	be = (() => {
		class t {
			rootInjector;
			contexts = new Map();
			constructor(e) {
				this.rootInjector = e;
			}
			onChildOutletCreated(e, r) {
				let i = this.getOrCreateContext(e);
				((i.outlet = r), this.contexts.set(e, i));
			}
			onChildOutletDestroyed(e) {
				let r = this.getContext(e);
				r && ((r.outlet = null), (r.attachRef = null));
			}
			onOutletDeactivated() {
				let e = this.contexts;
				return ((this.contexts = new Map()), e);
			}
			onOutletReAttached(e) {
				this.contexts = e;
			}
			getOrCreateContext(e) {
				let r = this.getContext(e);
				return (r || ((r = new _t(this.rootInjector)), this.contexts.set(e, r)), r);
			}
			getContext(e) {
				return this.contexts.get(e) || null;
			}
			static ɵfac = function (r) {
				return new (r || t)(y(ee));
			};
			static ɵprov = m({ token: t, factory: t.ɵfac, providedIn: 'root' });
		}
		return t;
	})(),
	Ot = class {
		_root;
		constructor(n) {
			this._root = n;
		}
		get root() {
			return this._root.value;
		}
		parent(n) {
			let e = this.pathFromRoot(n);
			return e.length > 1 ? e[e.length - 2] : null;
		}
		children(n) {
			let e = Sr(n, this._root);
			return e ? e.children.map((r) => r.value) : [];
		}
		firstChild(n) {
			let e = Sr(n, this._root);
			return e && e.children.length > 0 ? e.children[0].value : null;
		}
		siblings(n) {
			let e = wr(n, this._root);
			return e.length < 2 ? [] : e[e.length - 2].children.map((i) => i.value).filter((i) => i !== n);
		}
		pathFromRoot(n) {
			return wr(n, this._root).map((e) => e.value);
		}
	};
function Sr(t, n) {
	if (t === n.value) return n;
	for (let e of n.children) {
		let r = Sr(t, e);
		if (r) return r;
	}
	return null;
}
function wr(t, n) {
	if (t === n.value) return [n];
	for (let e of n.children) {
		let r = wr(t, e);
		if (r.length) return (r.unshift(n), r);
	}
	return [];
}
var D = class {
	value;
	children;
	constructor(n, e) {
		((this.value = n), (this.children = e));
	}
	toString() {
		return `TreeNode(${this.value})`;
	}
};
function fe(t) {
	let n = {};
	return (t && t.children.forEach((e) => (n[e.value.outlet] = e)), n);
}
var $e = class extends Ot {
	snapshot;
	constructor(n, e) {
		(super(n), (this.snapshot = e), Dr(this, n));
	}
	toString() {
		return this.snapshot.toString();
	}
};
function ii(t, n) {
	let e = ko(t, n),
		r = new _([new Z('', {})]),
		i = new _({}),
		o = new _({}),
		s = new _({}),
		a = new _(''),
		c = new K(r, i, s, a, o, p, t, e.root);
	return ((c.snapshot = e.root), new $e(new D(c, []), e));
}
function ko(t, n) {
	let e = {},
		r = {},
		i = {},
		s = new ne([], e, i, '', r, p, t, null, {}, n);
	return new ze('', new D(s, []));
}
var K = class {
	urlSubject;
	paramsSubject;
	queryParamsSubject;
	fragmentSubject;
	dataSubject;
	outlet;
	component;
	snapshot;
	_futureSnapshot;
	_routerState;
	_paramMap;
	_queryParamMap;
	title;
	url;
	params;
	queryParams;
	fragment;
	data;
	constructor(n, e, r, i, o, s, a, c) {
		((this.urlSubject = n),
			(this.paramsSubject = e),
			(this.queryParamsSubject = r),
			(this.fragmentSubject = i),
			(this.dataSubject = o),
			(this.outlet = s),
			(this.component = a),
			(this._futureSnapshot = c),
			(this.title = this.dataSubject?.pipe(T((l) => l[Be])) ?? g(void 0)),
			(this.url = n),
			(this.params = e),
			(this.queryParams = r),
			(this.fragment = i),
			(this.data = o));
	}
	get routeConfig() {
		return this._futureSnapshot.routeConfig;
	}
	get root() {
		return this._routerState.root;
	}
	get parent() {
		return this._routerState.parent(this);
	}
	get firstChild() {
		return this._routerState.firstChild(this);
	}
	get children() {
		return this._routerState.children(this);
	}
	get pathFromRoot() {
		return this._routerState.pathFromRoot(this);
	}
	get paramMap() {
		return ((this._paramMap ??= this.params.pipe(T((n) => ie(n)))), this._paramMap);
	}
	get queryParamMap() {
		return ((this._queryParamMap ??= this.queryParams.pipe(T((n) => ie(n)))), this._queryParamMap);
	}
	toString() {
		return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
	}
};
function Lt(t, n, e = 'emptyOnly') {
	let r,
		{ routeConfig: i } = t;
	return (
		n !== null && (e === 'always' || i?.path === '' || (!n.component && !n.routeConfig?.loadComponent))
			? (r = {
					params: h(h({}, n.params), t.params),
					data: h(h({}, n.data), t.data),
					resolve: h(h(h(h({}, t.data), n.data), i?.data), t._resolvedData),
				})
			: (r = { params: h({}, t.params), data: h({}, t.data), resolve: h(h({}, t.data), t._resolvedData ?? {}) }),
		i && si(i) && (r.resolve[Be] = i.title),
		r
	);
}
var ne = class {
		url;
		params;
		queryParams;
		fragment;
		data;
		outlet;
		component;
		routeConfig;
		_resolve;
		_resolvedData;
		_routerState;
		_paramMap;
		_queryParamMap;
		_environmentInjector;
		get title() {
			return this.data?.[Be];
		}
		constructor(n, e, r, i, o, s, a, c, l, u) {
			((this.url = n),
				(this.params = e),
				(this.queryParams = r),
				(this.fragment = i),
				(this.data = o),
				(this.outlet = s),
				(this.component = a),
				(this.routeConfig = c),
				(this._resolve = l),
				(this._environmentInjector = u));
		}
		get root() {
			return this._routerState.root;
		}
		get parent() {
			return this._routerState.parent(this);
		}
		get firstChild() {
			return this._routerState.firstChild(this);
		}
		get children() {
			return this._routerState.children(this);
		}
		get pathFromRoot() {
			return this._routerState.pathFromRoot(this);
		}
		get paramMap() {
			return ((this._paramMap ??= ie(this.params)), this._paramMap);
		}
		get queryParamMap() {
			return ((this._queryParamMap ??= ie(this.queryParams)), this._queryParamMap);
		}
		toString() {
			let n = this.url.map((r) => r.toString()).join('/'),
				e = this.routeConfig ? this.routeConfig.path : '';
			return `Route(url:'${n}', path:'${e}')`;
		}
	},
	ze = class extends Ot {
		url;
		constructor(n, e) {
			(super(e), (this.url = n), Dr(this, e));
		}
		toString() {
			return oi(this._root);
		}
	};
function Dr(t, n) {
	((n.value._routerState = t), n.children.forEach((e) => Dr(t, e)));
}
function oi(t) {
	let n = t.children.length > 0 ? ` { ${t.children.map(oi).join(', ')} } ` : '';
	return `${t.value}${n}`;
}
function fr(t) {
	if (t.snapshot) {
		let n = t.snapshot,
			e = t._futureSnapshot;
		((t.snapshot = e),
			k(n.queryParams, e.queryParams) || t.queryParamsSubject.next(e.queryParams),
			n.fragment !== e.fragment && t.fragmentSubject.next(e.fragment),
			k(n.params, e.params) || t.paramsSubject.next(e.params),
			uo(n.url, e.url) || t.urlSubject.next(e.url),
			k(n.data, e.data) || t.dataSubject.next(e.data));
	} else ((t.snapshot = t._futureSnapshot), t.dataSubject.next(t._futureSnapshot.data));
}
function Rr(t, n) {
	let e = k(t.params, n.params) && mo(t.url, n.url),
		r = !t.parent != !n.parent;
	return e && !r && (!t.parent || Rr(t.parent, n.parent));
}
function si(t) {
	return typeof t.title == 'string' || t.title === null;
}
var ai = new b(''),
	qe = (() => {
		class t {
			activated = null;
			get activatedComponentRef() {
				return this.activated;
			}
			_activatedRoute = null;
			name = p;
			activateEvents = new ue();
			deactivateEvents = new ue();
			attachEvents = new ue();
			detachEvents = new ue();
			routerOutletData = fn();
			parentContexts = f(be);
			location = f(rn);
			changeDetector = f(Jt);
			inputBinder = f(xt, { optional: !0 });
			supportsBindingToComponentInputs = !0;
			ngOnChanges(e) {
				if (e.name) {
					let { firstChange: r, previousValue: i } = e.name;
					if (r) return;
					(this.isTrackedInParentContexts(i) &&
						(this.deactivate(), this.parentContexts.onChildOutletDestroyed(i)),
						this.initializeOutletWithName());
				}
			}
			ngOnDestroy() {
				(this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name),
					this.inputBinder?.unsubscribeFromRouteData(this));
			}
			isTrackedInParentContexts(e) {
				return this.parentContexts.getContext(e)?.outlet === this;
			}
			ngOnInit() {
				this.initializeOutletWithName();
			}
			initializeOutletWithName() {
				if ((this.parentContexts.onChildOutletCreated(this.name, this), this.activated)) return;
				let e = this.parentContexts.getContext(this.name);
				e?.route && (e.attachRef ? this.attach(e.attachRef, e.route) : this.activateWith(e.route, e.injector));
			}
			get isActivated() {
				return !!this.activated;
			}
			get component() {
				if (!this.activated) throw new R(4012, !1);
				return this.activated.instance;
			}
			get activatedRoute() {
				if (!this.activated) throw new R(4012, !1);
				return this._activatedRoute;
			}
			get activatedRouteData() {
				return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
			}
			detach() {
				if (!this.activated) throw new R(4012, !1);
				this.location.detach();
				let e = this.activated;
				return ((this.activated = null), (this._activatedRoute = null), this.detachEvents.emit(e.instance), e);
			}
			attach(e, r) {
				((this.activated = e),
					(this._activatedRoute = r),
					this.location.insert(e.hostView),
					this.inputBinder?.bindActivatedRouteToOutletComponent(this),
					this.attachEvents.emit(e.instance));
			}
			deactivate() {
				if (this.activated) {
					let e = this.component;
					(this.activated.destroy(),
						(this.activated = null),
						(this._activatedRoute = null),
						this.deactivateEvents.emit(e));
				}
			}
			activateWith(e, r) {
				if (this.isActivated) throw new R(4013, !1);
				this._activatedRoute = e;
				let i = this.location,
					s = e.snapshot.component,
					a = this.parentContexts.getOrCreateContext(this.name).children,
					c = new br(e, a, i.injector, this.routerOutletData);
				((this.activated = i.createComponent(s, { index: i.length, injector: c, environmentInjector: r })),
					this.changeDetector.markForCheck(),
					this.inputBinder?.bindActivatedRouteToOutletComponent(this),
					this.activateEvents.emit(this.activated.instance));
			}
			static ɵfac = function (r) {
				return new (r || t)();
			};
			static ɵdir = on({
				type: t,
				selectors: [['router-outlet']],
				inputs: { name: 'name', routerOutletData: [1, 'routerOutletData'] },
				outputs: {
					activateEvents: 'activate',
					deactivateEvents: 'deactivate',
					attachEvents: 'attach',
					detachEvents: 'detach',
				},
				exportAs: ['outlet'],
				features: [Kr],
			});
		}
		return t;
	})(),
	br = class {
		route;
		childContexts;
		parent;
		outletData;
		constructor(n, e, r, i) {
			((this.route = n), (this.childContexts = e), (this.parent = r), (this.outletData = i));
		}
		get(n, e) {
			return n === K
				? this.route
				: n === be
					? this.childContexts
					: n === ai
						? this.outletData
						: this.parent.get(n, e);
		}
	},
	xt = new b('');
var Ar = (() => {
	class t {
		static ɵfac = function (r) {
			return new (r || t)();
		};
		static ɵcmp = nt({
			type: t,
			selectors: [['ng-component']],
			exportAs: ['emptyRouterOutlet'],
			decls: 1,
			vars: 0,
			template: function (r, i) {
				r & 1 && it(0, 'router-outlet');
			},
			dependencies: [qe],
			encapsulation: 2,
		});
	}
	return t;
})();
function _r(t) {
	let n = t.children && t.children.map(_r),
		e = n ? M(h({}, t), { children: n }) : h({}, t);
	return (
		!e.component && !e.loadComponent && (n || e.loadChildren) && e.outlet && e.outlet !== p && (e.component = Ar),
		e
	);
}
function jo(t, n, e) {
	let r = He(t, n._root, e ? e._root : void 0);
	return new $e(r, n);
}
function He(t, n, e) {
	if (e && t.shouldReuseRoute(n.value, e.value.snapshot)) {
		let r = e.value;
		r._futureSnapshot = n.value;
		let i = $o(t, n, e);
		return new D(r, i);
	} else {
		if (t.shouldAttach(n.value)) {
			let o = t.retrieve(n.value);
			if (o !== null) {
				let s = o.route;
				return ((s.value._futureSnapshot = n.value), (s.children = n.children.map((a) => He(t, a))), s);
			}
		}
		let r = zo(n.value),
			i = n.children.map((o) => He(t, o));
		return new D(r, i);
	}
}
function $o(t, n, e) {
	return n.children.map((r) => {
		for (let i of e.children) if (t.shouldReuseRoute(r.value, i.value.snapshot)) return He(t, r, i);
		return He(t, r);
	});
}
function zo(t) {
	return new K(
		new _(t.url),
		new _(t.params),
		new _(t.queryParams),
		new _(t.fragment),
		new _(t.data),
		t.outlet,
		t.component,
		t,
	);
}
var we = class {
		redirectTo;
		navigationBehaviorOptions;
		constructor(n, e) {
			((this.redirectTo = n), (this.navigationBehaviorOptions = e));
		}
	},
	ci = 'ngNavigationCancelingError';
function Nt(t, n) {
	let { redirectTo: e, navigationBehaviorOptions: r } = me(n)
			? { redirectTo: n, navigationBehaviorOptions: void 0 }
			: n,
		i = li(!1, I.Redirect);
	return ((i.url = e), (i.navigationBehaviorOptions = r), i);
}
function li(t, n) {
	let e = new Error(`NavigationCancelingError: ${t || ''}`);
	return ((e[ci] = !0), (e.cancellationCode = n), e);
}
function Ho(t) {
	return ui(t) && me(t.url);
}
function ui(t) {
	return !!t && t[ci];
}
var Cr = class {
		routeReuseStrategy;
		futureState;
		currState;
		forwardEvent;
		inputBindingEnabled;
		constructor(n, e, r, i, o) {
			((this.routeReuseStrategy = n),
				(this.futureState = e),
				(this.currState = r),
				(this.forwardEvent = i),
				(this.inputBindingEnabled = o));
		}
		activate(n) {
			let e = this.futureState._root,
				r = this.currState ? this.currState._root : null;
			(this.deactivateChildRoutes(e, r, n), fr(this.futureState.root), this.activateChildRoutes(e, r, n));
		}
		deactivateChildRoutes(n, e, r) {
			let i = fe(e);
			(n.children.forEach((o) => {
				let s = o.value.outlet;
				(this.deactivateRoutes(o, i[s], r), delete i[s]);
			}),
				Object.values(i).forEach((o) => {
					this.deactivateRouteAndItsChildren(o, r);
				}));
		}
		deactivateRoutes(n, e, r) {
			let i = n.value,
				o = e ? e.value : null;
			if (i === o)
				if (i.component) {
					let s = r.getContext(i.outlet);
					s && this.deactivateChildRoutes(n, e, s.children);
				} else this.deactivateChildRoutes(n, e, r);
			else o && this.deactivateRouteAndItsChildren(e, r);
		}
		deactivateRouteAndItsChildren(n, e) {
			n.value.component && this.routeReuseStrategy.shouldDetach(n.value.snapshot)
				? this.detachAndStoreRouteSubtree(n, e)
				: this.deactivateRouteAndOutlet(n, e);
		}
		detachAndStoreRouteSubtree(n, e) {
			let r = e.getContext(n.value.outlet),
				i = r && n.value.component ? r.children : e,
				o = fe(n);
			for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, i);
			if (r && r.outlet) {
				let s = r.outlet.detach(),
					a = r.children.onOutletDeactivated();
				this.routeReuseStrategy.store(n.value.snapshot, { componentRef: s, route: n, contexts: a });
			}
		}
		deactivateRouteAndOutlet(n, e) {
			let r = e.getContext(n.value.outlet),
				i = r && n.value.component ? r.children : e,
				o = fe(n);
			for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, i);
			r &&
				(r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()),
				(r.attachRef = null),
				(r.route = null));
		}
		activateChildRoutes(n, e, r) {
			let i = fe(e);
			(n.children.forEach((o) => {
				(this.activateRoutes(o, i[o.value.outlet], r), this.forwardEvent(new At(o.value.snapshot)));
			}),
				n.children.length && this.forwardEvent(new Mt(n.value.snapshot)));
		}
		activateRoutes(n, e, r) {
			let i = n.value,
				o = e ? e.value : null;
			if ((fr(i), i === o))
				if (i.component) {
					let s = r.getOrCreateContext(i.outlet);
					this.activateChildRoutes(n, e, s.children);
				} else this.activateChildRoutes(n, e, r);
			else if (i.component) {
				let s = r.getOrCreateContext(i.outlet);
				if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
					let a = this.routeReuseStrategy.retrieve(i.snapshot);
					(this.routeReuseStrategy.store(i.snapshot, null),
						s.children.onOutletReAttached(a.contexts),
						(s.attachRef = a.componentRef),
						(s.route = a.route.value),
						s.outlet && s.outlet.attach(a.componentRef, a.route.value),
						fr(a.route.value),
						this.activateChildRoutes(n, null, s.children));
				} else
					((s.attachRef = null),
						(s.route = i),
						s.outlet && s.outlet.activateWith(i, s.injector),
						this.activateChildRoutes(n, null, s.children));
			} else this.activateChildRoutes(n, null, r);
		}
	},
	Pt = class {
		path;
		route;
		constructor(n) {
			((this.path = n), (this.route = this.path[this.path.length - 1]));
		}
	},
	ge = class {
		component;
		route;
		constructor(n, e) {
			((this.component = n), (this.route = e));
		}
	};
function Fo(t, n, e) {
	let r = t._root,
		i = n ? n._root : null;
	return Ne(r, i, e, [r.value]);
}
function Bo(t) {
	let n = t.routeConfig ? t.routeConfig.canActivateChild : null;
	return !n || n.length === 0 ? null : { node: t, guards: n };
}
function Ce(t, n) {
	let e = Symbol(),
		r = n.get(t, e);
	return r === e ? (typeof t == 'function' && !Vr(t) ? t : n.get(t)) : r;
}
function Ne(t, n, e, r, i = { canDeactivateChecks: [], canActivateChecks: [] }) {
	let o = fe(n);
	return (
		t.children.forEach((s) => {
			(Vo(s, o[s.value.outlet], e, r.concat([s.value]), i), delete o[s.value.outlet]);
		}),
		Object.entries(o).forEach(([s, a]) => xe(a, e.getContext(s), i)),
		i
	);
}
function Vo(t, n, e, r, i = { canDeactivateChecks: [], canActivateChecks: [] }) {
	let o = t.value,
		s = n ? n.value : null,
		a = e ? e.getContext(t.value.outlet) : null;
	if (s && o.routeConfig === s.routeConfig) {
		let c = qo(s, o, o.routeConfig.runGuardsAndResolvers);
		(c ? i.canActivateChecks.push(new Pt(r)) : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
			o.component ? Ne(t, n, a ? a.children : null, r, i) : Ne(t, n, e, r, i),
			c && a && a.outlet && a.outlet.isActivated && i.canDeactivateChecks.push(new ge(a.outlet.component, s)));
	} else
		(s && xe(n, a, i),
			i.canActivateChecks.push(new Pt(r)),
			o.component ? Ne(t, null, a ? a.children : null, r, i) : Ne(t, null, e, r, i));
	return i;
}
function qo(t, n, e) {
	if (typeof e == 'function') return L(n._environmentInjector, () => e(t, n));
	switch (e) {
		case 'pathParamsChange':
			return !re(t.url, n.url);
		case 'pathParamsOrQueryParamsChange':
			return !re(t.url, n.url) || !k(t.queryParams, n.queryParams);
		case 'always':
			return !0;
		case 'paramsOrQueryParamsChange':
			return !Rr(t, n) || !k(t.queryParams, n.queryParams);
		default:
			return !Rr(t, n);
	}
}
function xe(t, n, e) {
	let r = fe(t),
		i = t.value;
	(Object.entries(r).forEach(([o, s]) => {
		i.component ? (n ? xe(s, n.children.getContext(o), e) : xe(s, null, e)) : xe(s, n, e);
	}),
		i.component
			? n && n.outlet && n.outlet.isActivated
				? e.canDeactivateChecks.push(new ge(n.outlet.component, i))
				: e.canDeactivateChecks.push(new ge(null, i))
			: e.canDeactivateChecks.push(new ge(null, i)));
}
function Ge(t) {
	return typeof t == 'function';
}
function Go(t) {
	return typeof t == 'boolean';
}
function Wo(t) {
	return t && Ge(t.canLoad);
}
function Zo(t) {
	return t && Ge(t.canActivate);
}
function Yo(t) {
	return t && Ge(t.canActivateChild);
}
function Ko(t) {
	return t && Ge(t.canDeactivate);
}
function Qo(t) {
	return t && Ge(t.canMatch);
}
function di(t) {
	return t instanceof $r || t?.name === 'EmptyError';
}
var ft = Symbol('INITIAL_VALUE');
function Re() {
	return G((t) =>
		zr(t.map((n) => n.pipe(le(1), Br(ft)))).pipe(
			T((n) => {
				for (let e of n)
					if (e !== !0) {
						if (e === ft) return ft;
						if (e === !1 || Xo(e)) return e;
					}
				return !0;
			}),
			ce((n) => n !== ft),
			le(1),
		),
	);
}
function Xo(t) {
	return me(t) || t instanceof we;
}
function hi(t) {
	return t.aborted
		? g(void 0).pipe(le(1))
		: new kr((n) => {
				let e = () => {
					(n.next(), n.complete());
				};
				return (t.addEventListener('abort', e), () => t.removeEventListener('abort', e));
			});
}
function fi(t) {
	return Ke(hi(t));
}
function Jo(t) {
	return V((n) => {
		let {
			targetSnapshot: e,
			currentSnapshot: r,
			guards: { canActivateChecks: i, canDeactivateChecks: o },
		} = n;
		return o.length === 0 && i.length === 0
			? g(M(h({}, n), { guardsResult: !0 }))
			: es(o, e, r).pipe(
					V((s) => (s && Go(s) ? ts(e, i, t) : g(s))),
					T((s) => M(h({}, n), { guardsResult: s })),
				);
	});
}
function es(t, n, e) {
	return x(t).pipe(
		V((r) => ss(r.component, r.route, e, n)),
		q((r) => r !== !0, !0),
	);
}
function ts(t, n, e) {
	return x(n).pipe(
		Vt((r) => Hr(ns(r.route.parent, e), rs(r.route, e), os(t, r.path), is(t, r.route))),
		q((r) => r !== !0, !0),
	);
}
function rs(t, n) {
	return (t !== null && n && n(new Dt(t)), g(!0));
}
function ns(t, n) {
	return (t !== null && n && n(new Tt(t)), g(!0));
}
function is(t, n) {
	let e = n.routeConfig ? n.routeConfig.canActivate : null;
	if (!e || e.length === 0) return g(!0);
	let r = e.map((i) =>
		Ye(() => {
			let o = n._environmentInjector,
				s = Ce(i, o),
				a = Zo(s) ? s.canActivate(n, t) : L(o, () => s(n, t));
			return ae(a).pipe(q());
		}),
	);
	return g(r).pipe(Re());
}
function os(t, n) {
	let e = n[n.length - 1],
		i = n
			.slice(0, n.length - 1)
			.reverse()
			.map((o) => Bo(o))
			.filter((o) => o !== null)
			.map((o) =>
				Ye(() => {
					let s = o.guards.map((a) => {
						let c = o.node._environmentInjector,
							l = Ce(a, c),
							u = Yo(l) ? l.canActivateChild(e, t) : L(c, () => l(e, t));
						return ae(u).pipe(q());
					});
					return g(s).pipe(Re());
				}),
			);
	return g(i).pipe(Re());
}
function ss(t, n, e, r) {
	let i = n && n.routeConfig ? n.routeConfig.canDeactivate : null;
	if (!i || i.length === 0) return g(!0);
	let o = i.map((s) => {
		let a = n._environmentInjector,
			c = Ce(s, a),
			l = Ko(c) ? c.canDeactivate(t, n, e, r) : L(a, () => c(t, n, e, r));
		return ae(l).pipe(q());
	});
	return g(o).pipe(Re());
}
function as(t, n, e, r, i) {
	let o = n.canLoad;
	if (o === void 0 || o.length === 0) return g(!0);
	let s = o.map((a) => {
		let c = Ce(a, t),
			l = Wo(c) ? c.canLoad(n, e) : L(t, () => c(n, e)),
			u = ae(l);
		return i ? u.pipe(fi(i)) : u;
	});
	return g(s).pipe(Re(), pi(r));
}
function pi(t) {
	return xr(
		j((n) => {
			if (typeof n != 'boolean') throw Nt(t, n);
		}),
		T((n) => n === !0),
	);
}
function cs(t, n, e, r, i) {
	let o = n.canMatch;
	if (!o || o.length === 0) return g(!0);
	let s = o.map((a) => {
		let c = Ce(a, t),
			l = Qo(c) ? c.canMatch(n, e) : L(t, () => c(n, e));
		return ae(l).pipe(fi(i));
	});
	return g(s).pipe(Re(), pi(r));
}
var z = class t extends Error {
		segmentGroup;
		constructor(n) {
			(super(), (this.segmentGroup = n || null), Object.setPrototypeOf(this, t.prototype));
		}
	},
	Fe = class t extends Error {
		urlTree;
		constructor(n) {
			(super(), (this.urlTree = n), Object.setPrototypeOf(this, t.prototype));
		}
	};
function ls(t) {
	throw new R(4e3, !1);
}
function us(t) {
	throw li(!1, I.GuardRejected);
}
var Er = class {
	urlSerializer;
	urlTree;
	constructor(n, e) {
		((this.urlSerializer = n), (this.urlTree = e));
	}
	async lineralizeSegments(n, e) {
		let r = [],
			i = e.root;
		for (;;) {
			if (((r = r.concat(i.segments)), i.numberOfChildren === 0)) return r;
			if (i.numberOfChildren > 1 || !i.children[p]) throw ls(`${n.redirectTo}`);
			i = i.children[p];
		}
	}
	async applyRedirectCommands(n, e, r, i, o) {
		let s = await ds(e, i, o);
		if (s instanceof U) throw new Fe(s);
		let a = this.applyRedirectCreateUrlTree(s, this.urlSerializer.parse(s), n, r);
		if (s[0] === '/') throw new Fe(a);
		return a;
	}
	applyRedirectCreateUrlTree(n, e, r, i) {
		let o = this.createSegmentGroup(n, e.root, r, i);
		return new U(o, this.createQueryParams(e.queryParams, this.urlTree.queryParams), e.fragment);
	}
	createQueryParams(n, e) {
		let r = {};
		return (
			Object.entries(n).forEach(([i, o]) => {
				if (typeof o == 'string' && o[0] === ':') {
					let a = o.substring(1);
					r[i] = e[a];
				} else r[i] = o;
			}),
			r
		);
	}
	createSegmentGroup(n, e, r, i) {
		let o = this.createSegments(n, e.segments, r, i),
			s = {};
		return (
			Object.entries(e.children).forEach(([a, c]) => {
				s[a] = this.createSegmentGroup(n, c, r, i);
			}),
			new v(o, s)
		);
	}
	createSegments(n, e, r, i) {
		return e.map((o) => (o.path[0] === ':' ? this.findPosParam(n, o, i) : this.findOrReturn(o, r)));
	}
	findPosParam(n, e, r) {
		let i = r[e.path.substring(1)];
		if (!i) throw new R(4001, !1);
		return i;
	}
	findOrReturn(n, e) {
		let r = 0;
		for (let i of e) {
			if (i.path === n.path) return (e.splice(r), i);
			r++;
		}
		return n;
	}
};
function ds(t, n, e) {
	if (typeof t == 'string') return Promise.resolve(t);
	let r = t,
		{
			queryParams: i,
			fragment: o,
			routeConfig: s,
			url: a,
			outlet: c,
			params: l,
			data: u,
			title: d,
			paramMap: S,
			queryParamMap: w,
		} = n;
	return vt(
		ae(
			L(e, () =>
				r({
					params: l,
					data: u,
					queryParams: i,
					fragment: o,
					routeConfig: s,
					url: a,
					outlet: c,
					title: d,
					paramMap: S,
					queryParamMap: w,
				}),
			),
		),
	);
}
function hs(t, n) {
	return (t.providers && !t._injector && (t._injector = Xt(t.providers, n, `Route: ${t.path}`)), t._injector ?? n);
}
function P(t) {
	return t.outlet || p;
}
function fs(t, n) {
	let e = t.filter((r) => P(r) === n);
	return (e.push(...t.filter((r) => P(r) !== n)), e);
}
var Ir = { matched: !1, consumedSegments: [], remainingSegments: [], parameters: {}, positionalParamSegments: {} };
function ps(t, n, e, r, i, o) {
	let s = gi(t, n, e);
	return s.matched ? ((r = hs(n, r)), cs(r, n, e, i, o).pipe(T((a) => (a === !0 ? s : h({}, Ir))))) : g(s);
}
function gi(t, n, e) {
	if (n.path === '')
		return n.pathMatch === 'full' && (t.hasChildren() || e.length > 0)
			? h({}, Ir)
			: { matched: !0, consumedSegments: [], remainingSegments: e, parameters: {}, positionalParamSegments: {} };
	let i = (n.matcher || Hn)(e, t, n);
	if (!i) return h({}, Ir);
	let o = {};
	Object.entries(i.posParams ?? {}).forEach(([a, c]) => {
		o[a] = c.path;
	});
	let s = i.consumed.length > 0 ? h(h({}, o), i.consumed[i.consumed.length - 1].parameters) : o;
	return {
		matched: !0,
		consumedSegments: i.consumed,
		remainingSegments: e.slice(i.consumed.length),
		parameters: s,
		positionalParamSegments: i.posParams ?? {},
	};
}
function kn(t, n, e, r) {
	return e.length > 0 && vs(t, e, r)
		? { segmentGroup: new v(n, ms(r, new v(e, t.children))), slicedSegments: [] }
		: e.length === 0 && ys(t, e, r)
			? { segmentGroup: new v(t.segments, gs(t, e, r, t.children)), slicedSegments: e }
			: { segmentGroup: new v(t.segments, t.children), slicedSegments: e };
}
function gs(t, n, e, r) {
	let i = {};
	for (let o of e)
		if (kt(t, n, o) && !r[P(o)]) {
			let s = new v([], {});
			i[P(o)] = s;
		}
	return h(h({}, r), i);
}
function ms(t, n) {
	let e = {};
	e[p] = n;
	for (let r of t)
		if (r.path === '' && P(r) !== p) {
			let i = new v([], {});
			e[P(r)] = i;
		}
	return e;
}
function vs(t, n, e) {
	return e.some((r) => kt(t, n, r) && P(r) !== p);
}
function ys(t, n, e) {
	return e.some((r) => kt(t, n, r));
}
function kt(t, n, e) {
	return (t.hasChildren() || n.length > 0) && e.pathMatch === 'full' ? !1 : e.path === '';
}
function Ss(t, n, e) {
	return n.length === 0 && !t.children[e];
}
var Tr = class {};
async function ws(t, n, e, r, i, o, s = 'emptyOnly', a) {
	return new Mr(t, n, e, r, i, s, o, a).recognize();
}
var Rs = 31,
	Mr = class {
		injector;
		configLoader;
		rootComponentType;
		config;
		urlTree;
		paramsInheritanceStrategy;
		urlSerializer;
		abortSignal;
		applyRedirects;
		absoluteRedirectCount = 0;
		allowRedirects = !0;
		constructor(n, e, r, i, o, s, a, c) {
			((this.injector = n),
				(this.configLoader = e),
				(this.rootComponentType = r),
				(this.config = i),
				(this.urlTree = o),
				(this.paramsInheritanceStrategy = s),
				(this.urlSerializer = a),
				(this.abortSignal = c),
				(this.applyRedirects = new Er(this.urlSerializer, this.urlTree)));
		}
		noMatchError(n) {
			return new R(4002, `'${n.segmentGroup}'`);
		}
		async recognize() {
			let n = kn(this.urlTree.root, [], [], this.config).segmentGroup,
				{ children: e, rootSnapshot: r } = await this.match(n),
				i = new D(r, e),
				o = new ze('', i),
				s = Xn(r, [], this.urlTree.queryParams, this.urlTree.fragment);
			return (
				(s.queryParams = this.urlTree.queryParams),
				(o.url = this.urlSerializer.serialize(s)),
				{ state: o, tree: s }
			);
		}
		async match(n) {
			let e = new ne(
				[],
				Object.freeze({}),
				Object.freeze(h({}, this.urlTree.queryParams)),
				this.urlTree.fragment,
				Object.freeze({}),
				p,
				this.rootComponentType,
				null,
				{},
				this.injector,
			);
			try {
				return {
					children: await this.processSegmentGroup(this.injector, this.config, n, p, e),
					rootSnapshot: e,
				};
			} catch (r) {
				if (r instanceof Fe) return ((this.urlTree = r.urlTree), this.match(r.urlTree.root));
				throw r instanceof z ? this.noMatchError(r) : r;
			}
		}
		async processSegmentGroup(n, e, r, i, o) {
			if (r.segments.length === 0 && r.hasChildren()) return this.processChildren(n, e, r, o);
			let s = await this.processSegment(n, e, r, r.segments, i, !0, o);
			return s instanceof D ? [s] : [];
		}
		async processChildren(n, e, r, i) {
			let o = [];
			for (let c of Object.keys(r.children)) c === 'primary' ? o.unshift(c) : o.push(c);
			let s = [];
			for (let c of o) {
				let l = r.children[c],
					u = fs(e, c),
					d = await this.processSegmentGroup(n, u, l, c, i);
				s.push(...d);
			}
			let a = mi(s);
			return (bs(a), a);
		}
		async processSegment(n, e, r, i, o, s, a) {
			for (let c of e)
				try {
					return await this.processSegmentAgainstRoute(c._injector ?? n, e, c, r, i, o, s, a);
				} catch (l) {
					if (l instanceof z || di(l)) continue;
					throw l;
				}
			if (Ss(r, i, o)) return new Tr();
			throw new z(r);
		}
		async processSegmentAgainstRoute(n, e, r, i, o, s, a, c) {
			if (P(r) !== s && (s === p || !kt(i, o, r))) throw new z(i);
			if (r.redirectTo === void 0) return this.matchSegmentAgainstRoute(n, i, r, o, s, c);
			if (this.allowRedirects && a) return this.expandSegmentAgainstRouteUsingRedirect(n, i, e, r, o, s, c);
			throw new z(i);
		}
		async expandSegmentAgainstRouteUsingRedirect(n, e, r, i, o, s, a) {
			let {
				matched: c,
				parameters: l,
				consumedSegments: u,
				positionalParamSegments: d,
				remainingSegments: S,
			} = gi(e, i, o);
			if (!c) throw new z(e);
			typeof i.redirectTo == 'string' &&
				i.redirectTo[0] === '/' &&
				(this.absoluteRedirectCount++, this.absoluteRedirectCount > Rs && (this.allowRedirects = !1));
			let w = new ne(
					o,
					l,
					Object.freeze(h({}, this.urlTree.queryParams)),
					this.urlTree.fragment,
					jn(i),
					P(i),
					i.component ?? i._loadedComponent ?? null,
					i,
					$n(i),
					n,
				),
				Q = Lt(w, a, this.paramsInheritanceStrategy);
			if (((w.params = Object.freeze(Q.params)), (w.data = Object.freeze(Q.data)), this.abortSignal.aborted))
				throw new Error(this.abortSignal.reason);
			let X = await this.applyRedirects.applyRedirectCommands(u, i.redirectTo, d, w, n),
				J = await this.applyRedirects.lineralizeSegments(i, X);
			return this.processSegment(n, r, e, J.concat(S), s, !1, a);
		}
		async matchSegmentAgainstRoute(n, e, r, i, o, s) {
			if (this.abortSignal.aborted) throw new Error(this.abortSignal.reason);
			let a = await vt(ps(e, r, i, n, this.urlSerializer, this.abortSignal));
			if ((r.path === '**' && (e.children = {}), !a?.matched)) throw new z(e);
			n = r._injector ?? n;
			let { routes: c } = await this.getChildConfig(n, r, i),
				l = r._loadedInjector ?? n,
				{ parameters: u, consumedSegments: d, remainingSegments: S } = a,
				w = new ne(
					d,
					u,
					Object.freeze(h({}, this.urlTree.queryParams)),
					this.urlTree.fragment,
					jn(r),
					P(r),
					r.component ?? r._loadedComponent ?? null,
					r,
					$n(r),
					n,
				),
				Q = Lt(w, s, this.paramsInheritanceStrategy);
			((w.params = Object.freeze(Q.params)), (w.data = Object.freeze(Q.data)));
			let { segmentGroup: X, slicedSegments: J } = kn(e, d, S, c);
			if (J.length === 0 && X.hasChildren()) {
				let Ni = await this.processChildren(l, c, X, w);
				return new D(w, Ni);
			}
			if (c.length === 0 && J.length === 0) return new D(w, []);
			let Ht = P(r) === o,
				Ee = await this.processSegment(l, c, X, J, Ht ? p : o, !0, w);
			return new D(w, Ee instanceof D ? [Ee] : []);
		}
		async getChildConfig(n, e, r) {
			if (e.children) return { routes: e.children, injector: n };
			if (e.loadChildren) {
				if (e._loadedRoutes !== void 0) {
					let o = e._loadedNgModuleFactory;
					return (
						o && !e._loadedInjector && (e._loadedInjector = o.create(n).injector),
						{ routes: e._loadedRoutes, injector: e._loadedInjector }
					);
				}
				if (this.abortSignal.aborted) throw new Error(this.abortSignal.reason);
				if (await vt(as(n, e, r, this.urlSerializer, this.abortSignal))) {
					let o = await this.configLoader.loadChildren(n, e);
					return (
						(e._loadedRoutes = o.routes),
						(e._loadedInjector = o.injector),
						(e._loadedNgModuleFactory = o.factory),
						o
					);
				}
				throw us(e);
			}
			return { routes: [], injector: n };
		}
	};
function bs(t) {
	t.sort((n, e) =>
		n.value.outlet === p ? -1 : e.value.outlet === p ? 1 : n.value.outlet.localeCompare(e.value.outlet),
	);
}
function Cs(t) {
	let n = t.value.routeConfig;
	return n && n.path === '';
}
function mi(t) {
	let n = [],
		e = new Set();
	for (let r of t) {
		if (!Cs(r)) {
			n.push(r);
			continue;
		}
		let i = n.find((o) => r.value.routeConfig === o.value.routeConfig);
		i !== void 0 ? (i.children.push(...r.children), e.add(i)) : n.push(r);
	}
	for (let r of e) {
		let i = mi(r.children);
		n.push(new D(r.value, i));
	}
	return n.filter((r) => !e.has(r));
}
function jn(t) {
	return t.data || {};
}
function $n(t) {
	return t.resolve || {};
}
function Es(t, n, e, r, i, o, s) {
	return V(async (a) => {
		let { state: c, tree: l } = await ws(t, n, e, r, a.extractedUrl, i, o, s);
		return M(h({}, a), { targetSnapshot: c, urlAfterRedirects: l });
	});
}
function Is(t) {
	return V((n) => {
		let {
			targetSnapshot: e,
			guards: { canActivateChecks: r },
		} = n;
		if (!r.length) return g(n);
		let i = new Set(r.map((a) => a.route)),
			o = new Set();
		for (let a of i) if (!o.has(a)) for (let c of vi(a)) o.add(c);
		let s = 0;
		return x(o).pipe(
			Vt((a) => (i.has(a) ? Ts(a, e, t) : ((a.data = Lt(a, a.parent, t).resolve), g(void 0)))),
			j(() => s++),
			qt(1),
			V((a) => (s === o.size ? g(n) : O)),
		);
	});
}
function vi(t) {
	let n = t.children.map((e) => vi(e)).flat();
	return [t, ...n];
}
function Ts(t, n, e) {
	let r = t.routeConfig,
		i = t._resolve;
	return (
		r?.title !== void 0 && !si(r) && (i[Be] = r.title),
		Ye(
			() => (
				(t.data = Lt(t, t.parent, e).resolve),
				Ms(i, t, n).pipe(T((o) => ((t._resolvedData = o), (t.data = h(h({}, t.data), o)), null)))
			),
		)
	);
}
function Ms(t, n, e) {
	let r = gr(t);
	if (r.length === 0) return g({});
	let i = {};
	return x(r).pipe(
		V((o) =>
			Ds(t[o], n, e).pipe(
				q(),
				j((s) => {
					if (s instanceof we) throw Nt(new Y(), s);
					i[o] = s;
				}),
			),
		),
		qt(1),
		T(() => i),
		Bt((o) => (di(o) ? O : jr(o))),
	);
}
function Ds(t, n, e) {
	let r = n._environmentInjector,
		i = Ce(t, r),
		o = i.resolve ? i.resolve(n, e) : L(r, () => i(n, e));
	return ae(o);
}
function zn(t) {
	return G((n) => {
		let e = t(n);
		return e ? x(e).pipe(T(() => n)) : g(n);
	});
}
var Or = (() => {
		class t {
			buildTitle(e) {
				let r,
					i = e.root;
				for (; i !== void 0; )
					((r = this.getResolvedTitleForRoute(i) ?? r), (i = i.children.find((o) => o.outlet === p)));
				return r;
			}
			getResolvedTitleForRoute(e) {
				return e.data[Be];
			}
			static ɵfac = function (r) {
				return new (r || t)();
			};
			static ɵprov = m({ token: t, factory: () => f(yi), providedIn: 'root' });
		}
		return t;
	})(),
	yi = (() => {
		class t extends Or {
			title;
			constructor(e) {
				(super(), (this.title = e));
			}
			updateTitle(e) {
				let r = this.buildTitle(e);
				r !== void 0 && this.title.setTitle(r);
			}
			static ɵfac = function (r) {
				return new (r || t)(y(On));
			};
			static ɵprov = m({ token: t, factory: t.ɵfac, providedIn: 'root' });
		}
		return t;
	})(),
	We = new b('', { factory: () => ({}) }),
	Ze = new b(''),
	Si = (() => {
		class t {
			componentLoaders = new WeakMap();
			childrenLoaders = new WeakMap();
			onLoadStartListener;
			onLoadEndListener;
			compiler = f(dn);
			async loadComponent(e, r) {
				if (this.componentLoaders.get(r)) return this.componentLoaders.get(r);
				if (r._loadedComponent) return Promise.resolve(r._loadedComponent);
				this.onLoadStartListener && this.onLoadStartListener(r);
				let i = (async () => {
					try {
						let o = await Bn(L(e, () => r.loadComponent())),
							s = await bi(Ri(o));
						return (this.onLoadEndListener && this.onLoadEndListener(r), (r._loadedComponent = s), s);
					} finally {
						this.componentLoaders.delete(r);
					}
				})();
				return (this.componentLoaders.set(r, i), i);
			}
			loadChildren(e, r) {
				if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
				if (r._loadedRoutes) return Promise.resolve({ routes: r._loadedRoutes, injector: r._loadedInjector });
				this.onLoadStartListener && this.onLoadStartListener(r);
				let i = (async () => {
					try {
						let o = await wi(r, this.compiler, e, this.onLoadEndListener);
						return (
							(r._loadedRoutes = o.routes),
							(r._loadedInjector = o.injector),
							(r._loadedNgModuleFactory = o.factory),
							o
						);
					} finally {
						this.childrenLoaders.delete(r);
					}
				})();
				return (this.childrenLoaders.set(r, i), i);
			}
			static ɵfac = function (r) {
				return new (r || t)();
			};
			static ɵprov = m({ token: t, factory: t.ɵfac, providedIn: 'root' });
		}
		return t;
	})();
async function wi(t, n, e, r) {
	let i = await Bn(L(e, () => t.loadChildren())),
		o = await bi(Ri(i)),
		s;
	(o instanceof nn || Array.isArray(o) ? (s = o) : (s = await n.compileModuleAsync(o)), r && r(t));
	let a,
		c,
		l = !1,
		u;
	return (
		Array.isArray(s)
			? ((c = s), (l = !0))
			: ((a = s.create(e).injector), (u = s), (c = a.get(Ze, [], { optional: !0, self: !0 }).flat())),
		{ routes: c.map(_r), injector: a, factory: u }
	);
}
function As(t) {
	return t && typeof t == 'object' && 'default' in t;
}
function Ri(t) {
	return As(t) ? t.default : t;
}
async function bi(t) {
	return t;
}
var jt = (() => {
		class t {
			static ɵfac = function (r) {
				return new (r || t)();
			};
			static ɵprov = m({ token: t, factory: () => f(_s), providedIn: 'root' });
		}
		return t;
	})(),
	_s = (() => {
		class t {
			shouldProcessUrl(e) {
				return !0;
			}
			extract(e) {
				return e;
			}
			merge(e, r) {
				return e;
			}
			static ɵfac = function (r) {
				return new (r || t)();
			};
			static ɵprov = m({ token: t, factory: t.ɵfac, providedIn: 'root' });
		}
		return t;
	})(),
	Ci = new b('');
var Os = () => {},
	Ei = new b(''),
	Ii = (() => {
		class t {
			currentNavigation = et(null, { equal: () => !1 });
			currentTransition = null;
			lastSuccessfulNavigation = et(null);
			events = new B();
			transitionAbortWithErrorSubject = new B();
			configLoader = f(Si);
			environmentInjector = f(ee);
			destroyRef = f(Xe);
			urlSerializer = f(Ve);
			rootContexts = f(be);
			location = f(he);
			inputBindingEnabled = f(xt, { optional: !0 }) !== null;
			titleStrategy = f(Or);
			options = f(We, { optional: !0 }) || {};
			paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || 'emptyOnly';
			urlHandlingStrategy = f(jt);
			createViewTransition = f(Ci, { optional: !0 });
			navigationErrorHandler = f(Ei, { optional: !0 });
			navigationId = 0;
			get hasRequestedNavigation() {
				return this.navigationId !== 0;
			}
			transitions;
			afterPreactivation = () => g(void 0);
			rootComponentType = null;
			destroyed = !1;
			constructor() {
				let e = (i) => this.events.next(new Et(i)),
					r = (i) => this.events.next(new It(i));
				((this.configLoader.onLoadEndListener = r),
					(this.configLoader.onLoadStartListener = e),
					this.destroyRef.onDestroy(() => {
						this.destroyed = !0;
					}));
			}
			complete() {
				this.transitions?.complete();
			}
			handleNavigationRequest(e) {
				let r = ++this.navigationId;
				te(() => {
					this.transitions?.next(
						M(h({}, e), {
							extractedUrl: this.urlHandlingStrategy.extract(e.rawUrl),
							targetSnapshot: null,
							targetRouterState: null,
							guards: { canActivateChecks: [], canDeactivateChecks: [] },
							guardsResult: null,
							id: r,
						}),
					);
				});
			}
			setupNavigations(e) {
				return (
					(this.transitions = new _(null)),
					this.transitions.pipe(
						ce((r) => r !== null),
						G((r) => {
							let i = !1,
								o = new AbortController(),
								s = () => !i && this.currentTransition?.id === r.id;
							return g(r).pipe(
								G((a) => {
									if (this.navigationId > r.id)
										return (this.cancelNavigationTransition(r, '', I.SupersededByNewNavigation), O);
									this.currentTransition = r;
									let c = this.lastSuccessfulNavigation();
									this.currentNavigation.set({
										id: a.id,
										initialUrl: a.rawUrl,
										extractedUrl: a.extractedUrl,
										targetBrowserUrl:
											typeof a.extras.browserUrl == 'string'
												? this.urlSerializer.parse(a.extras.browserUrl)
												: a.extras.browserUrl,
										trigger: a.source,
										extras: a.extras,
										previousNavigation: c ? M(h({}, c), { previousNavigation: null }) : null,
										abort: () => o.abort(),
									});
									let l =
											!e.navigated ||
											this.isUpdatingInternalState() ||
											this.isUpdatedBrowserUrl(),
										u = a.extras.onSameUrlNavigation ?? e.onSameUrlNavigation;
									if (!l && u !== 'reload')
										return (
											this.events.next(
												new F(
													a.id,
													this.urlSerializer.serialize(a.rawUrl),
													'',
													je.IgnoredSameUrlNavigation,
												),
											),
											a.resolve(!1),
											O
										);
									if (this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))
										return g(a).pipe(
											G(
												(d) => (
													this.events.next(
														new oe(
															d.id,
															this.urlSerializer.serialize(d.extractedUrl),
															d.source,
															d.restoredState,
														),
													),
													d.id !== this.navigationId ? O : Promise.resolve(d)
												),
											),
											Es(
												this.environmentInjector,
												this.configLoader,
												this.rootComponentType,
												e.config,
												this.urlSerializer,
												this.paramsInheritanceStrategy,
												o.signal,
											),
											j((d) => {
												((r.targetSnapshot = d.targetSnapshot),
													(r.urlAfterRedirects = d.urlAfterRedirects),
													this.currentNavigation.update(
														(w) => ((w.finalUrl = d.urlAfterRedirects), w),
													));
												let S = new ve(
													d.id,
													this.urlSerializer.serialize(d.extractedUrl),
													this.urlSerializer.serialize(d.urlAfterRedirects),
													d.targetSnapshot,
												);
												this.events.next(S);
											}),
										);
									if (l && this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)) {
										let { id: d, extractedUrl: S, source: w, restoredState: Q, extras: X } = a,
											J = new oe(d, this.urlSerializer.serialize(S), w, Q);
										this.events.next(J);
										let Ht = ii(this.rootComponentType, this.environmentInjector).snapshot;
										return (
											(this.currentTransition = r =
												M(h({}, a), {
													targetSnapshot: Ht,
													urlAfterRedirects: S,
													extras: M(h({}, X), { skipLocationChange: !1, replaceUrl: !1 }),
												})),
											this.currentNavigation.update((Ee) => ((Ee.finalUrl = S), Ee)),
											g(r)
										);
									} else
										return (
											this.events.next(
												new F(
													a.id,
													this.urlSerializer.serialize(a.extractedUrl),
													'',
													je.IgnoredByUrlHandlingStrategy,
												),
											),
											a.resolve(!1),
											O
										);
								}),
								T((a) => {
									let c = new wt(
										a.id,
										this.urlSerializer.serialize(a.extractedUrl),
										this.urlSerializer.serialize(a.urlAfterRedirects),
										a.targetSnapshot,
									);
									return (
										this.events.next(c),
										(this.currentTransition = r =
											M(h({}, a), {
												guards: Fo(a.targetSnapshot, a.currentSnapshot, this.rootContexts),
											})),
										r
									);
								}),
								Jo((a) => this.events.next(a)),
								G((a) => {
									if (
										((r.guardsResult = a.guardsResult),
										a.guardsResult && typeof a.guardsResult != 'boolean')
									)
										throw Nt(this.urlSerializer, a.guardsResult);
									let c = new Rt(
										a.id,
										this.urlSerializer.serialize(a.extractedUrl),
										this.urlSerializer.serialize(a.urlAfterRedirects),
										a.targetSnapshot,
										!!a.guardsResult,
									);
									if ((this.events.next(c), !s())) return O;
									if (!a.guardsResult)
										return (this.cancelNavigationTransition(a, '', I.GuardRejected), O);
									if (a.guards.canActivateChecks.length === 0) return g(a);
									let l = new bt(
										a.id,
										this.urlSerializer.serialize(a.extractedUrl),
										this.urlSerializer.serialize(a.urlAfterRedirects),
										a.targetSnapshot,
									);
									if ((this.events.next(l), !s())) return O;
									let u = !1;
									return g(a).pipe(
										Is(this.paramsInheritanceStrategy),
										j({
											next: () => {
												u = !0;
												let d = new Ct(
													a.id,
													this.urlSerializer.serialize(a.extractedUrl),
													this.urlSerializer.serialize(a.urlAfterRedirects),
													a.targetSnapshot,
												);
												this.events.next(d);
											},
											complete: () => {
												u || this.cancelNavigationTransition(a, '', I.NoDataFromResolver);
											},
										}),
									);
								}),
								zn((a) => {
									let c = (u) => {
											let d = [];
											if (u.routeConfig?._loadedComponent)
												u.component = u.routeConfig?._loadedComponent;
											else if (u.routeConfig?.loadComponent) {
												let S = u._environmentInjector;
												d.push(
													this.configLoader.loadComponent(S, u.routeConfig).then((w) => {
														u.component = w;
													}),
												);
											}
											for (let S of u.children) d.push(...c(S));
											return d;
										},
										l = c(a.targetSnapshot.root);
									return l.length === 0 ? g(a) : x(Promise.all(l).then(() => a));
								}),
								zn(() => this.afterPreactivation()),
								G(() => {
									let { currentSnapshot: a, targetSnapshot: c } = r,
										l = this.createViewTransition?.(this.environmentInjector, a.root, c.root);
									return l ? x(l).pipe(T(() => r)) : g(r);
								}),
								le(1),
								T((a) => {
									let c = jo(e.routeReuseStrategy, a.targetSnapshot, a.currentRouterState);
									((this.currentTransition = r = a = M(h({}, a), { targetRouterState: c })),
										this.currentNavigation.update((l) => ((l.targetRouterState = c), l)),
										this.events.next(new ye()),
										s() &&
											(new Cr(
												e.routeReuseStrategy,
												r.targetRouterState,
												r.currentRouterState,
												(l) => this.events.next(l),
												this.inputBindingEnabled,
											).activate(this.rootContexts),
											s() &&
												((i = !0),
												this.currentNavigation.update((l) => ((l.abort = Os), l)),
												this.lastSuccessfulNavigation.set(te(this.currentNavigation)),
												this.events.next(
													new H(
														a.id,
														this.urlSerializer.serialize(a.extractedUrl),
														this.urlSerializer.serialize(a.urlAfterRedirects),
													),
												),
												this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),
												a.resolve(!0))));
								}),
								Ke(
									hi(o.signal).pipe(
										ce(() => !i && !r.targetRouterState),
										j(() => {
											this.cancelNavigationTransition(r, o.signal.reason + '', I.Aborted);
										}),
									),
								),
								j({
									complete: () => {
										i = !0;
									},
								}),
								Ke(
									this.transitionAbortWithErrorSubject.pipe(
										j((a) => {
											throw a;
										}),
									),
								),
								Fr(() => {
									(o.abort(),
										i || this.cancelNavigationTransition(r, '', I.SupersededByNewNavigation),
										this.currentTransition?.id === r.id &&
											(this.currentNavigation.set(null), (this.currentTransition = null)));
								}),
								Bt((a) => {
									if (((i = !0), this.destroyed)) return (r.resolve(!1), O);
									if (ui(a))
										(this.events.next(
											new N(
												r.id,
												this.urlSerializer.serialize(r.extractedUrl),
												a.message,
												a.cancellationCode,
											),
										),
											Ho(a)
												? this.events.next(new Se(a.url, a.navigationBehaviorOptions))
												: r.resolve(!1));
									else {
										let c = new se(
											r.id,
											this.urlSerializer.serialize(r.extractedUrl),
											a,
											r.targetSnapshot ?? void 0,
										);
										try {
											let l = L(this.environmentInjector, () => this.navigationErrorHandler?.(c));
											if (l instanceof we) {
												let { message: u, cancellationCode: d } = Nt(this.urlSerializer, l);
												(this.events.next(
													new N(r.id, this.urlSerializer.serialize(r.extractedUrl), u, d),
												),
													this.events.next(
														new Se(l.redirectTo, l.navigationBehaviorOptions),
													));
											} else throw (this.events.next(c), a);
										} catch (l) {
											this.options.resolveNavigationPromiseOnError ? r.resolve(!1) : r.reject(l);
										}
									}
									return O;
								}),
							);
						}),
					)
				);
			}
			cancelNavigationTransition(e, r, i) {
				let o = new N(e.id, this.urlSerializer.serialize(e.extractedUrl), r, i);
				(this.events.next(o), e.resolve(!1));
			}
			isUpdatingInternalState() {
				return (
					this.currentTransition?.extractedUrl.toString() !==
					this.currentTransition?.currentUrlTree.toString()
				);
			}
			isUpdatedBrowserUrl() {
				let e = this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),
					r = te(this.currentNavigation),
					i = r?.targetBrowserUrl ?? r?.extractedUrl;
				return e.toString() !== i?.toString() && !r?.extras.skipLocationChange;
			}
			static ɵfac = function (r) {
				return new (r || t)();
			};
			static ɵprov = m({ token: t, factory: t.ɵfac, providedIn: 'root' });
		}
		return t;
	})();
function Ls(t) {
	return t !== Ue;
}
var Ti = new b('');
var Mi = (() => {
		class t {
			static ɵfac = function (r) {
				return new (r || t)();
			};
			static ɵprov = m({ token: t, factory: () => f(Ns), providedIn: 'root' });
		}
		return t;
	})(),
	Ut = class {
		shouldDetach(n) {
			return !1;
		}
		store(n, e) {}
		shouldAttach(n) {
			return !1;
		}
		retrieve(n) {
			return null;
		}
		shouldReuseRoute(n, e) {
			return n.routeConfig === e.routeConfig;
		}
		shouldDestroyInjector(n) {
			return !0;
		}
	},
	Ns = (() => {
		class t extends Ut {
			static ɵfac = (() => {
				let e;
				return function (i) {
					return (e || (e = Yt(t)))(i || t);
				};
			})();
			static ɵprov = m({ token: t, factory: t.ɵfac, providedIn: 'root' });
		}
		return t;
	})(),
	Lr = (() => {
		class t {
			urlSerializer = f(Ve);
			options = f(We, { optional: !0 }) || {};
			canceledNavigationResolution = this.options.canceledNavigationResolution || 'replace';
			location = f(he);
			urlHandlingStrategy = f(jt);
			urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred';
			currentUrlTree = new U();
			getCurrentUrlTree() {
				return this.currentUrlTree;
			}
			rawUrlTree = this.currentUrlTree;
			getRawUrlTree() {
				return this.rawUrlTree;
			}
			createBrowserPath({ finalUrl: e, initialUrl: r, targetBrowserUrl: i }) {
				let o = e !== void 0 ? this.urlHandlingStrategy.merge(e, r) : r,
					s = i ?? o;
				return s instanceof U ? this.urlSerializer.serialize(s) : s;
			}
			commitTransition({ targetRouterState: e, finalUrl: r, initialUrl: i }) {
				r && e
					? ((this.currentUrlTree = r),
						(this.rawUrlTree = this.urlHandlingStrategy.merge(r, i)),
						(this.routerState = e))
					: (this.rawUrlTree = i);
			}
			routerState = ii(null, f(ee));
			getRouterState() {
				return this.routerState;
			}
			_stateMemento = this.createStateMemento();
			get stateMemento() {
				return this._stateMemento;
			}
			updateStateMemento() {
				this._stateMemento = this.createStateMemento();
			}
			createStateMemento() {
				return {
					rawUrlTree: this.rawUrlTree,
					currentUrlTree: this.currentUrlTree,
					routerState: this.routerState,
				};
			}
			restoredState() {
				return this.location.getState();
			}
			static ɵfac = function (r) {
				return new (r || t)();
			};
			static ɵprov = m({ token: t, factory: () => f(Ps), providedIn: 'root' });
		}
		return t;
	})(),
	Ps = (() => {
		class t extends Lr {
			currentPageId = 0;
			lastSuccessfulId = -1;
			get browserPageId() {
				return this.canceledNavigationResolution !== 'computed'
					? this.currentPageId
					: (this.restoredState()?.ɵrouterPageId ?? this.currentPageId);
			}
			registerNonRouterCurrentEntryChangeListener(e) {
				return this.location.subscribe((r) => {
					r.type === 'popstate' &&
						setTimeout(() => {
							e(r.url, r.state, 'popstate');
						});
				});
			}
			handleRouterEvent(e, r) {
				e instanceof oe
					? this.updateStateMemento()
					: e instanceof F
						? this.commitTransition(r)
						: e instanceof ve
							? this.urlUpdateStrategy === 'eager' &&
								(r.extras.skipLocationChange || this.setBrowserUrl(this.createBrowserPath(r), r))
							: e instanceof ye
								? (this.commitTransition(r),
									this.urlUpdateStrategy === 'deferred' &&
										!r.extras.skipLocationChange &&
										this.setBrowserUrl(this.createBrowserPath(r), r))
								: e instanceof N && !ni(e)
									? this.restoreHistory(r)
									: e instanceof se
										? this.restoreHistory(r, !0)
										: e instanceof H &&
											((this.lastSuccessfulId = e.id), (this.currentPageId = this.browserPageId));
			}
			setBrowserUrl(e, { extras: r, id: i }) {
				let { replaceUrl: o, state: s } = r;
				if (this.location.isCurrentPathEqualTo(e) || o) {
					let a = this.browserPageId,
						c = h(h({}, s), this.generateNgRouterState(i, a));
					this.location.replaceState(e, '', c);
				} else {
					let a = h(h({}, s), this.generateNgRouterState(i, this.browserPageId + 1));
					this.location.go(e, '', a);
				}
			}
			restoreHistory(e, r = !1) {
				if (this.canceledNavigationResolution === 'computed') {
					let i = this.browserPageId,
						o = this.currentPageId - i;
					o !== 0
						? this.location.historyGo(o)
						: this.getCurrentUrlTree() === e.finalUrl &&
							o === 0 &&
							(this.resetInternalState(e), this.resetUrlToCurrentUrlTree());
				} else
					this.canceledNavigationResolution === 'replace' &&
						(r && this.resetInternalState(e), this.resetUrlToCurrentUrlTree());
			}
			resetInternalState({ finalUrl: e }) {
				((this.routerState = this.stateMemento.routerState),
					(this.currentUrlTree = this.stateMemento.currentUrlTree),
					(this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, e ?? this.rawUrlTree)));
			}
			resetUrlToCurrentUrlTree() {
				this.location.replaceState(
					this.urlSerializer.serialize(this.getRawUrlTree()),
					'',
					this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId),
				);
			}
			generateNgRouterState(e, r) {
				return this.canceledNavigationResolution === 'computed'
					? { navigationId: e, ɵrouterPageId: r }
					: { navigationId: e };
			}
			static ɵfac = (() => {
				let e;
				return function (i) {
					return (e || (e = Yt(t)))(i || t);
				};
			})();
			static ɵprov = m({ token: t, factory: t.ɵfac, providedIn: 'root' });
		}
		return t;
	})();
function Nr(t, n) {
	t.events
		.pipe(
			ce((e) => e instanceof H || e instanceof N || e instanceof se || e instanceof F),
			T((e) =>
				e instanceof H || e instanceof F
					? 0
					: (e instanceof N ? e.code === I.Redirect || e.code === I.SupersededByNewNavigation : !1)
						? 2
						: 1,
			),
			ce((e) => e !== 2),
			le(1),
		)
		.subscribe(() => {
			n();
		});
}
var Di = { paths: 'exact', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'exact' },
	Ai = { paths: 'subset', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'subset' },
	$t = (() => {
		class t {
			get currentUrlTree() {
				return this.stateManager.getCurrentUrlTree();
			}
			get rawUrlTree() {
				return this.stateManager.getRawUrlTree();
			}
			disposed = !1;
			nonRouterCurrentEntryChangeSubscription;
			console = f(sn);
			stateManager = f(Lr);
			options = f(We, { optional: !0 }) || {};
			pendingTasks = f(Zr);
			urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred';
			navigationTransitions = f(Ii);
			urlSerializer = f(Ve);
			location = f(he);
			urlHandlingStrategy = f(jt);
			injector = f(ee);
			_events = new B();
			get events() {
				return this._events;
			}
			get routerState() {
				return this.stateManager.getRouterState();
			}
			navigated = !1;
			routeReuseStrategy = f(Mi);
			injectorCleanup = f(Ti, { optional: !0 });
			onSameUrlNavigation = this.options.onSameUrlNavigation || 'ignore';
			config = f(Ze, { optional: !0 })?.flat() ?? [];
			componentInputBindingEnabled = !!f(xt, { optional: !0 });
			currentNavigation = this.navigationTransitions.currentNavigation.asReadonly();
			constructor() {
				(this.resetConfig(this.config),
					this.navigationTransitions.setupNavigations(this).subscribe({ error: (e) => {} }),
					this.subscribeToNavigationEvents());
			}
			eventsSubscription = new Ur();
			subscribeToNavigationEvents() {
				let e = this.navigationTransitions.events.subscribe((r) => {
					try {
						let i = this.navigationTransitions.currentTransition,
							o = te(this.navigationTransitions.currentNavigation);
						if (i !== null && o !== null) {
							if (
								(this.stateManager.handleRouterEvent(r, o),
								r instanceof N && r.code !== I.Redirect && r.code !== I.SupersededByNewNavigation)
							)
								this.navigated = !0;
							else if (r instanceof H)
								((this.navigated = !0),
									this.injectorCleanup?.(this.routeReuseStrategy, this.routerState, this.config));
							else if (r instanceof Se) {
								let s = r.navigationBehaviorOptions,
									a = this.urlHandlingStrategy.merge(r.url, i.currentRawUrl),
									c = h(
										{
											scroll: i.extras.scroll,
											browserUrl: i.extras.browserUrl,
											info: i.extras.info,
											skipLocationChange: i.extras.skipLocationChange,
											replaceUrl:
												i.extras.replaceUrl ||
												this.urlUpdateStrategy === 'eager' ||
												Ls(i.source),
										},
										s,
									);
								this.scheduleNavigation(a, Ue, null, c, {
									resolve: i.resolve,
									reject: i.reject,
									promise: i.promise,
								});
							}
						}
						xo(r) && this._events.next(r);
					} catch (i) {
						this.navigationTransitions.transitionAbortWithErrorSubject.next(i);
					}
				});
				this.eventsSubscription.add(e);
			}
			resetRootComponentType(e) {
				((this.routerState.root.component = e), (this.navigationTransitions.rootComponentType = e));
			}
			initialNavigation() {
				(this.setUpLocationChangeListener(),
					this.navigationTransitions.hasRequestedNavigation ||
						this.navigateToSyncWithBrowser(this.location.path(!0), Ue, this.stateManager.restoredState()));
			}
			setUpLocationChangeListener() {
				this.nonRouterCurrentEntryChangeSubscription ??=
					this.stateManager.registerNonRouterCurrentEntryChangeListener((e, r, i) => {
						this.navigateToSyncWithBrowser(e, i, r);
					});
			}
			navigateToSyncWithBrowser(e, r, i) {
				let o = { replaceUrl: !0 },
					s = i?.navigationId ? i : null;
				if (i) {
					let c = h({}, i);
					(delete c.navigationId, delete c.ɵrouterPageId, Object.keys(c).length !== 0 && (o.state = c));
				}
				let a = this.parseUrl(e);
				this.scheduleNavigation(a, r, s, o).catch((c) => {
					this.disposed || this.injector.get(Zt)(c);
				});
			}
			get url() {
				return this.serializeUrl(this.currentUrlTree);
			}
			getCurrentNavigation() {
				return te(this.navigationTransitions.currentNavigation);
			}
			get lastSuccessfulNavigation() {
				return this.navigationTransitions.lastSuccessfulNavigation;
			}
			resetConfig(e) {
				((this.config = e.map(_r)), (this.navigated = !1));
			}
			ngOnDestroy() {
				this.dispose();
			}
			dispose() {
				(this._events.unsubscribe(),
					this.navigationTransitions.complete(),
					this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),
					(this.nonRouterCurrentEntryChangeSubscription = void 0),
					(this.disposed = !0),
					this.eventsSubscription.unsubscribe());
			}
			createUrlTree(e, r = {}) {
				let { relativeTo: i, queryParams: o, fragment: s, queryParamsHandling: a, preserveFragment: c } = r,
					l = c ? this.currentUrlTree.fragment : s,
					u = null;
				switch (a ?? this.options.defaultQueryParamsHandling) {
					case 'merge':
						u = h(h({}, this.currentUrlTree.queryParams), o);
						break;
					case 'preserve':
						u = this.currentUrlTree.queryParams;
						break;
					default:
						u = o || null;
				}
				u !== null && (u = this.removeEmptyProps(u));
				let d;
				try {
					let S = i ? i.snapshot : this.routerState.snapshot.root;
					d = Jn(S);
				} catch {
					((typeof e[0] != 'string' || e[0][0] !== '/') && (e = []), (d = this.currentUrlTree.root));
				}
				return ei(d, e, u, l ?? null, this.urlSerializer);
			}
			navigateByUrl(e, r = { skipLocationChange: !1 }) {
				let i = me(e) ? e : this.parseUrl(e),
					o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
				return this.scheduleNavigation(o, Ue, null, r);
			}
			navigate(e, r = { skipLocationChange: !1 }) {
				return (Us(e), this.navigateByUrl(this.createUrlTree(e, r), r));
			}
			serializeUrl(e) {
				return this.urlSerializer.serialize(e);
			}
			parseUrl(e) {
				try {
					return this.urlSerializer.parse(e);
				} catch {
					return (this.console.warn(Gt(4018, !1)), this.urlSerializer.parse('/'));
				}
			}
			isActive(e, r) {
				let i;
				if ((r === !0 ? (i = h({}, Di)) : r === !1 ? (i = h({}, Ai)) : (i = r), me(e)))
					return Ln(this.currentUrlTree, e, i);
				let o = this.parseUrl(e);
				return Ln(this.currentUrlTree, o, i);
			}
			removeEmptyProps(e) {
				return Object.entries(e).reduce((r, [i, o]) => (o != null && (r[i] = o), r), {});
			}
			scheduleNavigation(e, r, i, o, s) {
				if (this.disposed) return Promise.resolve(!1);
				let a, c, l;
				s
					? ((a = s.resolve), (c = s.reject), (l = s.promise))
					: (l = new Promise((d, S) => {
							((a = d), (c = S));
						}));
				let u = this.pendingTasks.add();
				return (
					Nr(this, () => {
						queueMicrotask(() => this.pendingTasks.remove(u));
					}),
					this.navigationTransitions.handleNavigationRequest({
						source: r,
						restoredState: i,
						currentUrlTree: this.currentUrlTree,
						currentRawUrl: this.currentUrlTree,
						rawUrl: e,
						extras: o,
						resolve: a,
						reject: c,
						promise: l,
						currentSnapshot: this.routerState.snapshot,
						currentRouterState: this.routerState,
					}),
					l.catch((d) => Promise.reject(d))
				);
			}
			static ɵfac = function (r) {
				return new (r || t)();
			};
			static ɵprov = m({ token: t, factory: t.ɵfac, providedIn: 'root' });
		}
		return t;
	})();
function Us(t) {
	for (let n = 0; n < t.length; n++) if (t[n] == null) throw new R(4008, !1);
}
var js = new b('');
function Pr(t, ...n) {
	return qr([
		{ provide: Ze, multi: !0, useValue: t },
		[],
		{ provide: K, useFactory: $s },
		{ provide: cn, multi: !0, useFactory: zs },
		n.map((e) => e.ɵproviders),
	]);
}
function $s() {
	return f($t).routerState.root;
}
function zs() {
	let t = f(Qe);
	return (n) => {
		let e = t.get(ln);
		if (n !== e.components[0]) return;
		let r = t.get($t),
			i = t.get(Hs);
		(t.get(Fs) === 1 && r.initialNavigation(),
			t.get(Bs, null, { optional: !0 })?.setUpPreloading(),
			t.get(js, null, { optional: !0 })?.init(),
			r.resetRootComponentType(e.componentTypes[0]),
			i.closed || (i.next(), i.complete(), i.unsubscribe()));
	};
}
var Hs = new b('', { factory: () => new B() }),
	Fs = new b('', { factory: () => 1 });
var Bs = new b('');
function qs(t) {
	let n = t,
		e = Math.floor(Math.abs(t)),
		r = t.toString().replace(/^[^.]*\.?/, '').length,
		i = parseInt(t.toString().replace(/^[^e]*(e([-+]?\d+))?/, '$2')) || 0;
	return e === Math.floor(e) && e >= 0 && e <= 1
		? 1
		: (i === 0 && e !== 0 && e % 1e6 === 0 && r === 0) || !(i >= 0 && i <= 5)
			? 4
			: 5;
}
var _i = [
	'pt',
	[['AM', 'PM']],
	void 0,
	[
		['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
		['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 's\xE1b.'],
		['domingo', 'segunda-feira', 'ter\xE7a-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 's\xE1bado'],
		['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 's\xE1b.'],
	],
	void 0,
	[
		['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
		['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'],
		[
			'janeiro',
			'fevereiro',
			'mar\xE7o',
			'abril',
			'maio',
			'junho',
			'julho',
			'agosto',
			'setembro',
			'outubro',
			'novembro',
			'dezembro',
		],
	],
	void 0,
	[['a.C.', 'd.C.'], void 0, ['antes de Cristo', 'depois de Cristo']],
	0,
	[6, 0],
	['dd/MM/y', "d 'de' MMM 'de' y", "d 'de' MMMM 'de' y", "EEEE, d 'de' MMMM 'de' y"],
	['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
	['{1} {0}', void 0, void 0, void 0],
	[',', '.', ';', '%', '+', '-', 'E', '\xD7', '\u2030', '\u221E', 'NaN', ':'],
	['#,##0.###', '#,##0%', '\xA4\xA0#,##0.00', '#E0'],
	'BRL',
	'R$',
	'Real brasileiro',
	{
		AUD: ['AU$', '$'],
		BYN: [void 0, '\u0440.'],
		JPY: ['JP\xA5', '\xA5'],
		PHP: [void 0, '\u20B1'],
		PTE: ['Esc.'],
		RON: [void 0, 'L'],
		SYP: [void 0, 'S\xA3'],
		THB: ['\u0E3F'],
		TWD: ['NT$'],
		USD: ['US$', '$'],
	},
	'ltr',
	qs,
];
var Oi = [{ path: '', loadComponent: () => import('./chunk-AUMPM6ZI.js').then((t) => t.FelipeTiwamoto) }];
bn(_i);
var Li = { providers: [Yr(), Pr(Oi), Gr(mn.pick(gn)), { provide: hn, useValue: 'pt-BR' }] };
var zt = class t {
	static ɵfac = function (e) {
		return new (e || t)();
	};
	static ɵcmp = nt({
		type: t,
		selectors: [['app-root']],
		decls: 1,
		vars: 0,
		template: function (e, r) {
			e & 1 && it(0, 'router-outlet');
		},
		dependencies: [qe],
		encapsulation: 2,
	});
};
lr(zt, Li).catch((t) => console.error(t));
/**i18n:9565df162215a628a983dd2581f70df0c5713e3b5336e9ccae8a17ef4baab485*/
