var W2 = Object.defineProperty,
	$2 = Object.defineProperties;
var Z2 = Object.getOwnPropertyDescriptors;
var O1 = Object.getOwnPropertySymbols;
var Q2 = Object.prototype.hasOwnProperty,
	X2 = Object.prototype.propertyIsEnumerable;
var F1 = (e, t, n) => (t in e ? W2(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n)),
	X = (e, t) => {
		for (var n in (t ||= {})) Q2.call(t, n) && F1(e, n, t[n]);
		if (O1) for (var n of O1(t)) X2.call(t, n) && F1(e, n, t[n]);
		return e;
	},
	K = (e, t) => $2(e, Z2(t));
var j = null,
	In = !1,
	to = 1,
	K2 = null,
	Y = Symbol('SIGNAL');
function f(e) {
	let t = j;
	return ((j = e), t);
}
function xn() {
	return j;
}
var wn = {
	version: 0,
	lastCleanEpoch: 0,
	dirty: !1,
	producers: void 0,
	producersTail: void 0,
	consumers: void 0,
	consumersTail: void 0,
	recomputing: !1,
	consumerAllowSignalWrites: !1,
	consumerIsAlwaysLive: !1,
	kind: 'unknown',
	producerMustRecompute: () => !1,
	producerRecomputeValue: () => {},
	consumerMarkedDirty: () => {},
	consumerOnSignalRead: () => {},
};
function Cn(e) {
	if (In) throw new Error('');
	if (j === null) return;
	j.consumerOnSignalRead(e);
	let t = j.producersTail;
	if (t !== void 0 && t.producer === e) return;
	let n,
		a = j.recomputing;
	if (a && ((n = t !== void 0 ? t.nextProducer : j.producers), n !== void 0 && n.producer === e)) {
		((j.producersTail = n), (n.lastReadVersion = e.version));
		return;
	}
	let o = e.consumersTail;
	if (o !== void 0 && o.consumer === j && (!a || J2(o, j))) return;
	let r = dt(j),
		i = {
			producer: e,
			consumer: j,
			nextProducer: n,
			prevConsumer: o,
			lastReadVersion: e.version,
			nextConsumer: void 0,
		};
	((j.producersTail = i), t !== void 0 ? (t.nextProducer = i) : (j.producers = i), r && B1(e, i));
}
function j1() {
	to++;
}
function q1(e) {
	if (!(dt(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === to)) {
		if (!e.producerMustRecompute(e) && !bn(e)) {
			eo(e);
			return;
		}
		(e.producerRecomputeValue(e), eo(e));
	}
}
function no(e) {
	if (e.consumers === void 0) return;
	let t = In;
	In = !0;
	try {
		for (let n = e.consumers; n !== void 0; n = n.nextConsumer) {
			let a = n.consumer;
			a.dirty || Y2(a);
		}
	} finally {
		In = t;
	}
}
function ao() {
	return j?.consumerAllowSignalWrites !== !1;
}
function Y2(e) {
	((e.dirty = !0), no(e), e.consumerMarkedDirty?.(e));
}
function eo(e) {
	((e.dirty = !1), (e.lastCleanEpoch = to));
}
function Ln(e) {
	return (e && V1(e), f(e));
}
function V1(e) {
	((e.producersTail = void 0), (e.recomputing = !0));
}
function oo(e, t) {
	(f(t), e && z1(e));
}
function z1(e) {
	e.recomputing = !1;
	let t = e.producersTail,
		n = t !== void 0 ? t.nextProducer : e.producers;
	if (n !== void 0) {
		if (dt(e))
			do n = ro(n);
			while (n !== void 0);
		t !== void 0 ? (t.nextProducer = void 0) : (e.producers = void 0);
	}
}
function bn(e) {
	for (let t = e.producers; t !== void 0; t = t.nextProducer) {
		let n = t.producer,
			a = t.lastReadVersion;
		if (a !== n.version || (q1(n), a !== n.version)) return !0;
	}
	return !1;
}
function _t(e) {
	if (dt(e)) {
		let t = e.producers;
		for (; t !== void 0; ) t = ro(t);
	}
	((e.producers = void 0), (e.producersTail = void 0), (e.consumers = void 0), (e.consumersTail = void 0));
}
function B1(e, t) {
	let n = e.consumersTail,
		a = dt(e);
	if (
		(n !== void 0
			? ((t.nextConsumer = n.nextConsumer), (n.nextConsumer = t))
			: ((t.nextConsumer = void 0), (e.consumers = t)),
		(t.prevConsumer = n),
		(e.consumersTail = t),
		!a)
	)
		for (let o = e.producers; o !== void 0; o = o.nextProducer) B1(o.producer, o);
}
function ro(e) {
	let t = e.producer,
		n = e.nextProducer,
		a = e.nextConsumer,
		o = e.prevConsumer;
	if (
		((e.nextConsumer = void 0),
		(e.prevConsumer = void 0),
		a !== void 0 ? (a.prevConsumer = o) : (t.consumersTail = o),
		o !== void 0)
	)
		o.nextConsumer = a;
	else if (((t.consumers = a), !dt(t))) {
		let r = t.producers;
		for (; r !== void 0; ) r = ro(r);
	}
	return n;
}
function dt(e) {
	return e.consumerIsAlwaysLive || e.consumers !== void 0;
}
function U1(e) {
	K2?.(e);
}
function J2(e, t) {
	let n = t.producersTail;
	if (n !== void 0) {
		let a = t.producers;
		do {
			if (a === e) return !0;
			if (a === n) break;
			a = a.nextProducer;
		} while (a !== void 0);
	}
	return !1;
}
function G1(e, t) {
	return Object.is(e, t);
}
function ed() {
	throw new Error();
}
var W1 = ed;
function $1(e) {
	W1(e);
}
function io(e) {
	W1 = e;
}
var td = null;
function so(e, t) {
	let n = Object.create(Sn);
	((n.value = e), t !== void 0 && (n.equal = t));
	let a = () => Z1(n);
	return ((a[Y] = n), U1(n), [a, (i) => Ht(n, i), (i) => Q1(n, i)]);
}
function Z1(e) {
	return (Cn(e), e.value);
}
function Ht(e, t) {
	(ao() || $1(e), e.equal(e.value, t) || ((e.value = t), nd(e)));
}
function Q1(e, t) {
	(ao() || $1(e), Ht(e, t(e.value)));
}
var Sn = K(X({}, wn), { equal: G1, value: void 0, kind: 'signal' });
function nd(e) {
	(e.version++, j1(), no(e), td?.(e));
}
function co(e) {
	let t = f(null);
	try {
		return e();
	} finally {
		f(t);
	}
}
function m(e) {
	return typeof e == 'function';
}
function lt(e) {
	let n = e((a) => {
		(Error.call(a), (a.stack = new Error().stack));
	});
	return ((n.prototype = Object.create(Error.prototype)), (n.prototype.constructor = n), n);
}
var Dn = lt(
	(e) =>
		function (n) {
			(e(this),
				(this.message = n
					? `${n.length} errors occurred during unsubscription:
${n.map((a, o) => `${o + 1}) ${a.toString()}`).join(`
  `)}`
					: ''),
				(this.name = 'UnsubscriptionError'),
				(this.errors = n));
		},
);
function Ot(e, t) {
	if (e) {
		let n = e.indexOf(t);
		0 <= n && e.splice(n, 1);
	}
}
var V = class e {
	constructor(t) {
		((this.initialTeardown = t), (this.closed = !1), (this._parentage = null), (this._finalizers = null));
	}
	unsubscribe() {
		let t;
		if (!this.closed) {
			this.closed = !0;
			let { _parentage: n } = this;
			if (n)
				if (((this._parentage = null), Array.isArray(n))) for (let r of n) r.remove(this);
				else n.remove(this);
			let { initialTeardown: a } = this;
			if (m(a))
				try {
					a();
				} catch (r) {
					t = r instanceof Dn ? r.errors : [r];
				}
			let { _finalizers: o } = this;
			if (o) {
				this._finalizers = null;
				for (let r of o)
					try {
						X1(r);
					} catch (i) {
						((t = t ?? []), i instanceof Dn ? (t = [...t, ...i.errors]) : t.push(i));
					}
			}
			if (t) throw new Dn(t);
		}
	}
	add(t) {
		var n;
		if (t && t !== this)
			if (this.closed) X1(t);
			else {
				if (t instanceof e) {
					if (t.closed || t._hasParent(this)) return;
					t._addParent(this);
				}
				(this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
			}
	}
	_hasParent(t) {
		let { _parentage: n } = this;
		return n === t || (Array.isArray(n) && n.includes(t));
	}
	_addParent(t) {
		let { _parentage: n } = this;
		this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
	}
	_removeParent(t) {
		let { _parentage: n } = this;
		n === t ? (this._parentage = null) : Array.isArray(n) && Ot(n, t);
	}
	remove(t) {
		let { _finalizers: n } = this;
		(n && Ot(n, t), t instanceof e && t._removeParent(this));
	}
};
V.EMPTY = (() => {
	let e = new V();
	return ((e.closed = !0), e);
})();
var lo = V.EMPTY;
function An(e) {
	return e instanceof V || (e && 'closed' in e && m(e.remove) && m(e.add) && m(e.unsubscribe));
}
function X1(e) {
	m(e) ? e() : e.unsubscribe();
}
var ne = {
	onUnhandledError: null,
	onStoppedNotification: null,
	Promise: void 0,
	useDeprecatedSynchronousErrorHandling: !1,
	useDeprecatedNextContext: !1,
};
var ut = {
	setTimeout(e, t, ...n) {
		let { delegate: a } = ut;
		return a?.setTimeout ? a.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
	},
	clearTimeout(e) {
		let { delegate: t } = ut;
		return (t?.clearTimeout || clearTimeout)(e);
	},
	delegate: void 0,
};
function En(e) {
	ut.setTimeout(() => {
		let { onUnhandledError: t } = ne;
		if (t) t(e);
		else throw e;
	});
}
function Ft() {}
var K1 = uo('C', void 0, void 0);
function Y1(e) {
	return uo('E', void 0, e);
}
function J1(e) {
	return uo('N', e, void 0);
}
function uo(e, t, n) {
	return { kind: e, value: t, error: n };
}
var Ne = null;
function ht(e) {
	if (ne.useDeprecatedSynchronousErrorHandling) {
		let t = !Ne;
		if ((t && (Ne = { errorThrown: !1, error: null }), e(), t)) {
			let { errorThrown: n, error: a } = Ne;
			if (((Ne = null), n)) throw a;
		}
	} else e();
}
function ei(e) {
	ne.useDeprecatedSynchronousErrorHandling && Ne && ((Ne.errorThrown = !0), (Ne.error = e));
}
var _e = class extends V {
		constructor(t) {
			(super(),
				(this.isStopped = !1),
				t ? ((this.destination = t), An(t) && t.add(this)) : (this.destination = rd));
		}
		static create(t, n, a) {
			return new pt(t, n, a);
		}
		next(t) {
			this.isStopped ? po(J1(t), this) : this._next(t);
		}
		error(t) {
			this.isStopped ? po(Y1(t), this) : ((this.isStopped = !0), this._error(t));
		}
		complete() {
			this.isStopped ? po(K1, this) : ((this.isStopped = !0), this._complete());
		}
		unsubscribe() {
			this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
		}
		_next(t) {
			this.destination.next(t);
		}
		_error(t) {
			try {
				this.destination.error(t);
			} finally {
				this.unsubscribe();
			}
		}
		_complete() {
			try {
				this.destination.complete();
			} finally {
				this.unsubscribe();
			}
		}
	},
	ad = Function.prototype.bind;
function ho(e, t) {
	return ad.call(e, t);
}
var yo = class {
		constructor(t) {
			this.partialObserver = t;
		}
		next(t) {
			let { partialObserver: n } = this;
			if (n.next)
				try {
					n.next(t);
				} catch (a) {
					Tn(a);
				}
		}
		error(t) {
			let { partialObserver: n } = this;
			if (n.error)
				try {
					n.error(t);
				} catch (a) {
					Tn(a);
				}
			else Tn(t);
		}
		complete() {
			let { partialObserver: t } = this;
			if (t.complete)
				try {
					t.complete();
				} catch (n) {
					Tn(n);
				}
		}
	},
	pt = class extends _e {
		constructor(t, n, a) {
			super();
			let o;
			if (m(t) || !t) o = { next: t ?? void 0, error: n ?? void 0, complete: a ?? void 0 };
			else {
				let r;
				this && ne.useDeprecatedNextContext
					? ((r = Object.create(t)),
						(r.unsubscribe = () => this.unsubscribe()),
						(o = {
							next: t.next && ho(t.next, r),
							error: t.error && ho(t.error, r),
							complete: t.complete && ho(t.complete, r),
						}))
					: (o = t);
			}
			this.destination = new yo(o);
		}
	};
function Tn(e) {
	ne.useDeprecatedSynchronousErrorHandling ? ei(e) : En(e);
}
function od(e) {
	throw e;
}
function po(e, t) {
	let { onStoppedNotification: n } = ne;
	n && ut.setTimeout(() => n(e, t));
}
var rd = { closed: !0, next: Ft, error: od, complete: Ft };
var yt = (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
function ae(e) {
	return e;
}
function id(...e) {
	return fo(e);
}
function fo(e) {
	return e.length === 0
		? ae
		: e.length === 1
			? e[0]
			: function (n) {
					return e.reduce((a, o) => o(a), n);
				};
}
var D = (() => {
	class e {
		constructor(n) {
			n && (this._subscribe = n);
		}
		lift(n) {
			let a = new e();
			return ((a.source = this), (a.operator = n), a);
		}
		subscribe(n, a, o) {
			let r = cd(n) ? n : new pt(n, a, o);
			return (
				ht(() => {
					let { operator: i, source: s } = this;
					r.add(i ? i.call(r, s) : s ? this._subscribe(r) : this._trySubscribe(r));
				}),
				r
			);
		}
		_trySubscribe(n) {
			try {
				return this._subscribe(n);
			} catch (a) {
				n.error(a);
			}
		}
		forEach(n, a) {
			return (
				(a = ti(a)),
				new a((o, r) => {
					let i = new pt({
						next: (s) => {
							try {
								n(s);
							} catch (c) {
								(r(c), i.unsubscribe());
							}
						},
						error: r,
						complete: o,
					});
					this.subscribe(i);
				})
			);
		}
		_subscribe(n) {
			var a;
			return (a = this.source) === null || a === void 0 ? void 0 : a.subscribe(n);
		}
		[yt]() {
			return this;
		}
		pipe(...n) {
			return fo(n)(this);
		}
		toPromise(n) {
			return (
				(n = ti(n)),
				new n((a, o) => {
					let r;
					this.subscribe(
						(i) => (r = i),
						(i) => o(i),
						() => a(r),
					);
				})
			);
		}
	}
	return ((e.create = (t) => new e(t)), e);
})();
function ti(e) {
	var t;
	return (t = e ?? ne.Promise) !== null && t !== void 0 ? t : Promise;
}
function sd(e) {
	return e && m(e.next) && m(e.error) && m(e.complete);
}
function cd(e) {
	return (e && e instanceof _e) || (sd(e) && An(e));
}
function dd(e) {
	return m(e?.lift);
}
function w(e) {
	return (t) => {
		if (dd(t))
			return t.lift(function (n) {
				try {
					return e(n, this);
				} catch (a) {
					this.error(a);
				}
			});
		throw new TypeError('Unable to lift unknown Observable type');
	};
}
function E(e, t, n, a, o) {
	return new ko(e, t, n, a, o);
}
var ko = class extends _e {
	constructor(t, n, a, o, r, i) {
		(super(t),
			(this.onFinalize = r),
			(this.shouldUnsubscribe = i),
			(this._next = n
				? function (s) {
						try {
							n(s);
						} catch (c) {
							t.error(c);
						}
					}
				: super._next),
			(this._error = o
				? function (s) {
						try {
							o(s);
						} catch (c) {
							t.error(c);
						} finally {
							this.unsubscribe();
						}
					}
				: super._error),
			(this._complete = a
				? function () {
						try {
							a();
						} catch (s) {
							t.error(s);
						} finally {
							this.unsubscribe();
						}
					}
				: super._complete));
	}
	unsubscribe() {
		var t;
		if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
			let { closed: n } = this;
			(super.unsubscribe(), !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this)));
		}
	}
};
var ni = lt(
	(e) =>
		function () {
			(e(this), (this.name = 'ObjectUnsubscribedError'), (this.message = 'object unsubscribed'));
		},
);
var Ce = (() => {
		class e extends D {
			constructor() {
				(super(),
					(this.closed = !1),
					(this.currentObservers = null),
					(this.observers = []),
					(this.isStopped = !1),
					(this.hasError = !1),
					(this.thrownError = null));
			}
			lift(n) {
				let a = new Pn(this, this);
				return ((a.operator = n), a);
			}
			_throwIfClosed() {
				if (this.closed) throw new ni();
			}
			next(n) {
				ht(() => {
					if ((this._throwIfClosed(), !this.isStopped)) {
						this.currentObservers || (this.currentObservers = Array.from(this.observers));
						for (let a of this.currentObservers) a.next(n);
					}
				});
			}
			error(n) {
				ht(() => {
					if ((this._throwIfClosed(), !this.isStopped)) {
						((this.hasError = this.isStopped = !0), (this.thrownError = n));
						let { observers: a } = this;
						for (; a.length; ) a.shift().error(n);
					}
				});
			}
			complete() {
				ht(() => {
					if ((this._throwIfClosed(), !this.isStopped)) {
						this.isStopped = !0;
						let { observers: n } = this;
						for (; n.length; ) n.shift().complete();
					}
				});
			}
			unsubscribe() {
				((this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null));
			}
			get observed() {
				var n;
				return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
			}
			_trySubscribe(n) {
				return (this._throwIfClosed(), super._trySubscribe(n));
			}
			_subscribe(n) {
				return (this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n));
			}
			_innerSubscribe(n) {
				let { hasError: a, isStopped: o, observers: r } = this;
				return a || o
					? lo
					: ((this.currentObservers = null),
						r.push(n),
						new V(() => {
							((this.currentObservers = null), Ot(r, n));
						}));
			}
			_checkFinalizedStatuses(n) {
				let { hasError: a, thrownError: o, isStopped: r } = this;
				a ? n.error(o) : r && n.complete();
			}
			asObservable() {
				let n = new D();
				return ((n.source = this), n);
			}
		}
		return ((e.create = (t, n) => new Pn(t, n)), e);
	})(),
	Pn = class extends Ce {
		constructor(t, n) {
			(super(), (this.destination = t), (this.source = n));
		}
		next(t) {
			var n, a;
			(a = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null ||
				a === void 0 ||
				a.call(n, t);
		}
		error(t) {
			var n, a;
			(a = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null ||
				a === void 0 ||
				a.call(n, t);
		}
		complete() {
			var t, n;
			(n = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null ||
				n === void 0 ||
				n.call(t);
		}
		_subscribe(t) {
			var n, a;
			return (a = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t)) !== null && a !== void 0
				? a
				: lo;
		}
	};
var jt = class extends Ce {
	constructor(t) {
		(super(), (this._value = t));
	}
	get value() {
		return this.getValue();
	}
	_subscribe(t) {
		let n = super._subscribe(t);
		return (!n.closed && t.next(this._value), n);
	}
	getValue() {
		let { hasError: t, thrownError: n, _value: a } = this;
		if (t) throw n;
		return (this._throwIfClosed(), a);
	}
	next(t) {
		super.next((this._value = t));
	}
};
var qt = new D((e) => e.complete());
function ai(e) {
	return e && m(e.schedule);
}
function oi(e) {
	return e[e.length - 1];
}
function ri(e) {
	return m(oi(e)) ? e.pop() : void 0;
}
function Le(e) {
	return ai(oi(e)) ? e.pop() : void 0;
}
function si(e, t, n, a) {
	function o(r) {
		return r instanceof n
			? r
			: new n(function (i) {
					i(r);
				});
	}
	return new (n || (n = Promise))(function (r, i) {
		function s(l) {
			try {
				d(a.next(l));
			} catch (u) {
				i(u);
			}
		}
		function c(l) {
			try {
				d(a.throw(l));
			} catch (u) {
				i(u);
			}
		}
		function d(l) {
			l.done ? r(l.value) : o(l.value).then(s, c);
		}
		d((a = a.apply(e, t || [])).next());
	});
}
function ii(e) {
	var t = typeof Symbol == 'function' && Symbol.iterator,
		n = t && e[t],
		a = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == 'number')
		return {
			next: function () {
				return (e && a >= e.length && (e = void 0), { value: e && e[a++], done: !e });
			},
		};
	throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
}
function He(e) {
	return this instanceof He ? ((this.v = e), this) : new He(e);
}
function ci(e, t, n) {
	if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
	var a = n.apply(e, t || []),
		o,
		r = [];
	return (
		(o = Object.create((typeof AsyncIterator == 'function' ? AsyncIterator : Object).prototype)),
		s('next'),
		s('throw'),
		s('return', i),
		(o[Symbol.asyncIterator] = function () {
			return this;
		}),
		o
	);
	function i(h) {
		return function (y) {
			return Promise.resolve(y).then(h, u);
		};
	}
	function s(h, y) {
		a[h] &&
			((o[h] = function (g) {
				return new Promise(function (T, S) {
					r.push([h, g, T, S]) > 1 || c(h, g);
				});
			}),
			y && (o[h] = y(o[h])));
	}
	function c(h, y) {
		try {
			d(a[h](y));
		} catch (g) {
			p(r[0][3], g);
		}
	}
	function d(h) {
		h.value instanceof He ? Promise.resolve(h.value.v).then(l, u) : p(r[0][2], h);
	}
	function l(h) {
		c('next', h);
	}
	function u(h) {
		c('throw', h);
	}
	function p(h, y) {
		(h(y), r.shift(), r.length && c(r[0][0], r[0][1]));
	}
}
function di(e) {
	if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
	var t = e[Symbol.asyncIterator],
		n;
	return t
		? t.call(e)
		: ((e = typeof ii == 'function' ? ii(e) : e[Symbol.iterator]()),
			(n = {}),
			a('next'),
			a('throw'),
			a('return'),
			(n[Symbol.asyncIterator] = function () {
				return this;
			}),
			n);
	function a(r) {
		n[r] =
			e[r] &&
			function (i) {
				return new Promise(function (s, c) {
					((i = e[r](i)), o(s, c, i.done, i.value));
				});
			};
	}
	function o(r, i, s, c) {
		Promise.resolve(c).then(function (d) {
			r({ value: d, done: s });
		}, i);
	}
}
var Rn = (e) => e && typeof e.length == 'number' && typeof e != 'function';
function Nn(e) {
	return m(e?.then);
}
function _n(e) {
	return m(e[yt]);
}
function Hn(e) {
	return Symbol.asyncIterator && m(e?.[Symbol.asyncIterator]);
}
function On(e) {
	return new TypeError(
		`You provided ${e !== null && typeof e == 'object' ? 'an invalid object' : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`,
	);
}
function ld() {
	return typeof Symbol != 'function' || !Symbol.iterator ? '@@iterator' : Symbol.iterator;
}
var Fn = ld();
function jn(e) {
	return m(e?.[Fn]);
}
function qn(e) {
	return ci(this, arguments, function* () {
		let n = e.getReader();
		try {
			for (;;) {
				let { value: a, done: o } = yield He(n.read());
				if (o) return yield He(void 0);
				yield yield He(a);
			}
		} finally {
			n.releaseLock();
		}
	});
}
function Vn(e) {
	return m(e?.getReader);
}
function O(e) {
	if (e instanceof D) return e;
	if (e != null) {
		if (_n(e)) return ud(e);
		if (Rn(e)) return hd(e);
		if (Nn(e)) return pd(e);
		if (Hn(e)) return li(e);
		if (jn(e)) return yd(e);
		if (Vn(e)) return fd(e);
	}
	throw On(e);
}
function ud(e) {
	return new D((t) => {
		let n = e[yt]();
		if (m(n.subscribe)) return n.subscribe(t);
		throw new TypeError('Provided object does not correctly implement Symbol.observable');
	});
}
function hd(e) {
	return new D((t) => {
		for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
		t.complete();
	});
}
function pd(e) {
	return new D((t) => {
		e.then(
			(n) => {
				t.closed || (t.next(n), t.complete());
			},
			(n) => t.error(n),
		).then(null, En);
	});
}
function yd(e) {
	return new D((t) => {
		for (let n of e) if ((t.next(n), t.closed)) return;
		t.complete();
	});
}
function li(e) {
	return new D((t) => {
		kd(e, t).catch((n) => t.error(n));
	});
}
function fd(e) {
	return li(qn(e));
}
function kd(e, t) {
	var n, a, o, r;
	return si(this, void 0, void 0, function* () {
		try {
			for (n = di(e); (a = yield n.next()), !a.done; ) {
				let i = a.value;
				if ((t.next(i), t.closed)) return;
			}
		} catch (i) {
			o = { error: i };
		} finally {
			try {
				a && !a.done && (r = n.return) && (yield r.call(n));
			} finally {
				if (o) throw o.error;
			}
		}
		t.complete();
	});
}
function U(e, t, n, a = 0, o = !1) {
	let r = t.schedule(function () {
		(n(), o ? e.add(this.schedule(null, a)) : this.unsubscribe());
	}, a);
	if ((e.add(r), !o)) return r;
}
function zn(e, t = 0) {
	return w((n, a) => {
		n.subscribe(
			E(
				a,
				(o) => U(a, e, () => a.next(o), t),
				() => U(a, e, () => a.complete(), t),
				(o) => U(a, e, () => a.error(o), t),
			),
		);
	});
}
function Bn(e, t = 0) {
	return w((n, a) => {
		a.add(e.schedule(() => n.subscribe(a), t));
	});
}
function ui(e, t) {
	return O(e).pipe(Bn(t), zn(t));
}
function hi(e, t) {
	return O(e).pipe(Bn(t), zn(t));
}
function pi(e, t) {
	return new D((n) => {
		let a = 0;
		return t.schedule(function () {
			a === e.length ? n.complete() : (n.next(e[a++]), n.closed || this.schedule());
		});
	});
}
function yi(e, t) {
	return new D((n) => {
		let a;
		return (
			U(n, t, () => {
				((a = e[Fn]()),
					U(
						n,
						t,
						() => {
							let o, r;
							try {
								({ value: o, done: r } = a.next());
							} catch (i) {
								n.error(i);
								return;
							}
							r ? n.complete() : n.next(o);
						},
						0,
						!0,
					));
			}),
			() => m(a?.return) && a.return()
		);
	});
}
function Un(e, t) {
	if (!e) throw new Error('Iterable cannot be null');
	return new D((n) => {
		U(n, t, () => {
			let a = e[Symbol.asyncIterator]();
			U(
				n,
				t,
				() => {
					a.next().then((o) => {
						o.done ? n.complete() : n.next(o.value);
					});
				},
				0,
				!0,
			);
		});
	});
}
function fi(e, t) {
	return Un(qn(e), t);
}
function ki(e, t) {
	if (e != null) {
		if (_n(e)) return ui(e, t);
		if (Rn(e)) return pi(e, t);
		if (Nn(e)) return hi(e, t);
		if (Hn(e)) return Un(e, t);
		if (jn(e)) return yi(e, t);
		if (Vn(e)) return fi(e, t);
	}
	throw On(e);
}
function be(e, t) {
	return t ? ki(e, t) : O(e);
}
function gd(...e) {
	let t = Le(e);
	return be(e, t);
}
function md(e, t) {
	let n = m(e) ? e : () => e,
		a = (o) => o.error(n());
	return new D(t ? (o) => t.schedule(a, 0, o) : a);
}
function Md(e) {
	return !!e && (e instanceof D || (m(e.lift) && m(e.subscribe)));
}
var Vt = lt(
	(e) =>
		function () {
			(e(this), (this.name = 'EmptyError'), (this.message = 'no elements in sequence'));
		},
);
function Oe(e, t) {
	return w((n, a) => {
		let o = 0;
		n.subscribe(
			E(a, (r) => {
				a.next(e.call(t, r, o++));
			}),
		);
	});
}
var { isArray: vd } = Array;
function Id(e, t) {
	return vd(t) ? e(...t) : e(t);
}
function gi(e) {
	return Oe((t) => Id(e, t));
}
var { isArray: xd } = Array,
	{ getPrototypeOf: wd, prototype: Cd, keys: Ld } = Object;
function mi(e) {
	if (e.length === 1) {
		let t = e[0];
		if (xd(t)) return { args: t, keys: null };
		if (bd(t)) {
			let n = Ld(t);
			return { args: n.map((a) => t[a]), keys: n };
		}
	}
	return { args: e, keys: null };
}
function bd(e) {
	return e && typeof e == 'object' && wd(e) === Cd;
}
function Mi(e, t) {
	return e.reduce((n, a, o) => ((n[a] = t[o]), n), {});
}
function Sd(...e) {
	let t = Le(e),
		n = ri(e),
		{ args: a, keys: o } = mi(e);
	if (a.length === 0) return be([], t);
	let r = new D(Dd(a, t, o ? (i) => Mi(o, i) : ae));
	return n ? r.pipe(gi(n)) : r;
}
function Dd(e, t, n = ae) {
	return (a) => {
		vi(
			t,
			() => {
				let { length: o } = e,
					r = new Array(o),
					i = o,
					s = o;
				for (let c = 0; c < o; c++)
					vi(
						t,
						() => {
							let d = be(e[c], t),
								l = !1;
							d.subscribe(
								E(
									a,
									(u) => {
										((r[c] = u), l || ((l = !0), s--), s || a.next(n(r.slice())));
									},
									() => {
										--i || a.complete();
									},
								),
							);
						},
						a,
					);
			},
			a,
		);
	};
}
function vi(e, t, n) {
	e ? U(n, e, t) : t();
}
function Ii(e, t, n, a, o, r, i, s) {
	let c = [],
		d = 0,
		l = 0,
		u = !1,
		p = () => {
			u && !c.length && !d && t.complete();
		},
		h = (g) => (d < a ? y(g) : c.push(g)),
		y = (g) => {
			(r && t.next(g), d++);
			let T = !1;
			O(n(g, l++)).subscribe(
				E(
					t,
					(S) => {
						(o?.(S), r ? h(S) : t.next(S));
					},
					() => {
						T = !0;
					},
					void 0,
					() => {
						if (T)
							try {
								for (d--; c.length && d < a; ) {
									let S = c.shift();
									i ? U(t, i, () => y(S)) : y(S);
								}
								p();
							} catch (S) {
								t.error(S);
							}
					},
				),
			);
		};
	return (
		e.subscribe(
			E(t, h, () => {
				((u = !0), p());
			}),
		),
		() => {
			s?.();
		}
	);
}
function Fe(e, t, n = 1 / 0) {
	return m(t)
		? Fe((a, o) => Oe((r, i) => t(a, r, o, i))(O(e(a, o))), n)
		: (typeof t == 'number' && (n = t), w((a, o) => Ii(a, o, e, n)));
}
function xi(e = 1 / 0) {
	return Fe(ae, e);
}
function wi() {
	return xi(1);
}
function Gn(...e) {
	return wi()(be(e, Le(e)));
}
function Ad(e) {
	return new D((t) => {
		O(e()).subscribe(t);
	});
}
function go(e, t) {
	return w((n, a) => {
		let o = 0;
		n.subscribe(E(a, (r) => e.call(t, r, o++) && a.next(r)));
	});
}
function Ci(e) {
	return w((t, n) => {
		let a = null,
			o = !1,
			r;
		((a = t.subscribe(
			E(n, void 0, void 0, (i) => {
				((r = O(e(i, Ci(e)(t)))), a ? (a.unsubscribe(), (a = null), r.subscribe(n)) : (o = !0));
			}),
		)),
			o && (a.unsubscribe(), (a = null), r.subscribe(n)));
	});
}
function Ed(e, t) {
	return m(t) ? Fe(e, t, 1) : Fe(e, 1);
}
function Li(e) {
	return w((t, n) => {
		let a = !1;
		t.subscribe(
			E(
				n,
				(o) => {
					((a = !0), n.next(o));
				},
				() => {
					(a || n.next(e), n.complete());
				},
			),
		);
	});
}
function mo(e) {
	return e <= 0
		? () => qt
		: w((t, n) => {
				let a = 0;
				t.subscribe(
					E(n, (o) => {
						++a <= e && (n.next(o), e <= a && n.complete());
					}),
				);
			});
}
function bi(e = Td) {
	return w((t, n) => {
		let a = !1;
		t.subscribe(
			E(
				n,
				(o) => {
					((a = !0), n.next(o));
				},
				() => (a ? n.complete() : n.error(e())),
			),
		);
	});
}
function Td() {
	return new Vt();
}
function Pd(e) {
	return w((t, n) => {
		try {
			t.subscribe(n);
		} finally {
			n.add(e);
		}
	});
}
function Rd(e, t) {
	let n = arguments.length >= 2;
	return (a) => a.pipe(e ? go((o, r) => e(o, r, a)) : ae, mo(1), n ? Li(t) : bi(() => new Vt()));
}
function Nd(e) {
	return e <= 0
		? () => qt
		: w((t, n) => {
				let a = [];
				t.subscribe(
					E(
						n,
						(o) => {
							(a.push(o), e < a.length && a.shift());
						},
						() => {
							for (let o of a) n.next(o);
							n.complete();
						},
						void 0,
						() => {
							a = null;
						},
					),
				);
			});
}
function _d(...e) {
	let t = Le(e);
	return w((n, a) => {
		(t ? Gn(e, n, t) : Gn(e, n)).subscribe(a);
	});
}
function Hd(e, t) {
	return w((n, a) => {
		let o = null,
			r = 0,
			i = !1,
			s = () => i && !o && a.complete();
		n.subscribe(
			E(
				a,
				(c) => {
					o?.unsubscribe();
					let d = 0,
						l = r++;
					O(e(c, l)).subscribe(
						(o = E(
							a,
							(u) => a.next(t ? t(c, u, l, d++) : u),
							() => {
								((o = null), s());
							},
						)),
					);
				},
				() => {
					((i = !0), s());
				},
			),
		);
	});
}
function Od(e) {
	return w((t, n) => {
		(O(e).subscribe(E(n, () => n.complete(), Ft)), !n.closed && t.subscribe(n));
	});
}
function Fd(e, t, n) {
	let a = m(e) || t || n ? { next: e, error: t, complete: n } : e;
	return a
		? w((o, r) => {
				var i;
				(i = a.subscribe) === null || i === void 0 || i.call(a);
				let s = !0;
				o.subscribe(
					E(
						r,
						(c) => {
							var d;
							((d = a.next) === null || d === void 0 || d.call(a, c), r.next(c));
						},
						() => {
							var c;
							((s = !1), (c = a.complete) === null || c === void 0 || c.call(a), r.complete());
						},
						(c) => {
							var d;
							((s = !1), (d = a.error) === null || d === void 0 || d.call(a, c), r.error(c));
						},
						() => {
							var c, d;
							(s && ((c = a.unsubscribe) === null || c === void 0 || c.call(a)),
								(d = a.finalize) === null || d === void 0 || d.call(a));
						},
					),
				);
			})
		: ae;
}
var Mo;
function Wn() {
	return Mo;
}
function le(e) {
	let t = Mo;
	return ((Mo = e), t);
}
var Si = Symbol('NotFound');
function ft(e) {
	return e === Si || e?.name === '\u0275NotFound';
}
var Yn = 'https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss',
	C = class extends Error {
		code;
		constructor(t, n) {
			(super(_o(t, n)), (this.code = t));
		}
	};
function zd(e) {
	return `NG0${Math.abs(e)}`;
}
function _o(e, t) {
	return `${zd(e)}${t ? ': ' + t : ''}`;
}
function L(e) {
	for (let t in e) if (e[t] === L) return t;
	throw Error('');
}
function Se(e) {
	if (typeof e == 'string') return e;
	if (Array.isArray(e)) return `[${e.map(Se).join(', ')}]`;
	if (e == null) return '' + e;
	let t = e.overriddenName || e.name;
	if (t) return `${t}`;
	let n = e.toString();
	if (n == null) return '' + n;
	let a = n.indexOf(`
`);
	return a >= 0 ? n.slice(0, a) : n;
}
function Jn(e, t) {
	return e ? (t ? `${e} ${t}` : e) : t || '';
}
var Bd = L({ __forward_ref__: L });
function ea(e) {
	return (
		(e.__forward_ref__ = ea),
		(e.toString = function () {
			return Se(this());
		}),
		e
	);
}
function G(e) {
	return Ho(e) ? e() : e;
}
function Ho(e) {
	return typeof e == 'function' && e.hasOwnProperty(Bd) && e.__forward_ref__ === ea;
}
function q(e) {
	return { token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0 };
}
function ta(e) {
	return { providers: e.providers || [], imports: e.imports || [] };
}
function $t(e) {
	return Gd(e, na);
}
function Ud(e) {
	return $t(e) !== null;
}
function Gd(e, t) {
	return (e.hasOwnProperty(t) && e[t]) || null;
}
function Wd(e) {
	let t = e?.[na] ?? null;
	return t || null;
}
function Io(e) {
	return e && e.hasOwnProperty(Zn) ? e[Zn] : null;
}
var na = L({ ɵprov: L }),
	Zn = L({ ɵinj: L }),
	b = class {
		_desc;
		ngMetadataName = 'InjectionToken';
		ɵprov;
		constructor(t, n) {
			((this._desc = t),
				(this.ɵprov = void 0),
				typeof n == 'number'
					? (this.__NG_ELEMENT_ID__ = n)
					: n !== void 0 &&
						(this.ɵprov = q({ token: this, providedIn: n.providedIn || 'root', factory: n.factory })));
		}
		get multi() {
			return this;
		}
		toString() {
			return `InjectionToken ${this._desc}`;
		}
	};
function Oo(e) {
	return e && !!e.ɵproviders;
}
var Fo = L({ ɵcmp: L }),
	jo = L({ ɵdir: L }),
	qo = L({ ɵpipe: L }),
	Vo = L({ ɵmod: L }),
	Bt = L({ ɵfac: L }),
	Ue = L({ __NG_ELEMENT_ID__: L }),
	Di = L({ __NG_ENV_ID__: L });
function zo(e) {
	return (aa(e, '@NgModule'), e[Vo] || null);
}
function Ae(e) {
	return (aa(e, '@Component'), e[Fo] || null);
}
function Bo(e) {
	return (aa(e, '@Directive'), e[jo] || null);
}
function Pi(e) {
	return (aa(e, '@Pipe'), e[qo] || null);
}
function aa(e, t) {
	if (e == null) throw new C(-919, !1);
}
function Ge(e) {
	return typeof e == 'string' ? e : e == null ? '' : String(e);
}
function Ri(e) {
	return typeof e == 'function'
		? e.name || e.toString()
		: typeof e == 'object' && e != null && typeof e.type == 'function'
			? e.type.name || e.type.toString()
			: Ge(e);
}
var Ni = L({ ngErrorCode: L }),
	$d = L({ ngErrorMessage: L }),
	Zd = L({ ngTokenPath: L });
function Uo(e, t) {
	return _i('', -200, t);
}
function oa(e, t) {
	throw new C(-201, !1);
}
function _i(e, t, n) {
	let a = new C(t, e);
	return ((a[Ni] = t), (a[$d] = e), n && (a[Zd] = n), a);
}
function Qd(e) {
	return e[Ni];
}
var xo;
function Hi() {
	return xo;
}
function $(e) {
	let t = xo;
	return ((xo = e), t);
}
function Go(e, t, n) {
	let a = $t(e);
	if (a && a.providedIn == 'root') return a.value === void 0 ? (a.value = a.factory()) : a.value;
	if (n & 8) return null;
	if (t !== void 0) return t;
	oa(e, '');
}
var Xd = {},
	je = Xd,
	wo = '__NG_DI_FLAG__',
	Co = class {
		injector;
		constructor(t) {
			this.injector = t;
		}
		retrieve(t, n) {
			let a = qe(n) || 0;
			try {
				return this.injector.get(t, a & 8 ? null : je, a);
			} catch (o) {
				if (ft(o)) return o;
				throw o;
			}
		}
	};
function Kd(e, t = 0) {
	let n = Wn();
	if (n === void 0) throw new C(-203, !1);
	if (n === null) return Go(e, void 0, t);
	{
		let a = Yd(t),
			o = n.retrieve(e, a);
		if (ft(o)) {
			if (a.optional) return null;
			throw o;
		}
		return o;
	}
}
function ue(e, t = 0) {
	return (Hi() || Kd)(G(e), t);
}
function x(e, t) {
	return ue(e, qe(t));
}
function qe(e) {
	return typeof e > 'u' || typeof e == 'number'
		? e
		: 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function Yd(e) {
	return { optional: !!(e & 8), host: !!(e & 1), self: !!(e & 2), skipSelf: !!(e & 4) };
}
function Lo(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let a = G(e[n]);
		if (Array.isArray(a)) {
			if (a.length === 0) throw new C(900, !1);
			let o,
				r = 0;
			for (let i = 0; i < a.length; i++) {
				let s = a[i],
					c = Jd(s);
				typeof c == 'number' ? (c === -1 ? (o = s.token) : (r |= c)) : (o = s);
			}
			t.push(ue(o, r));
		} else t.push(ue(a));
	}
	return t;
}
function Oi(e, t) {
	return ((e[wo] = t), (e.prototype[wo] = t), e);
}
function Jd(e) {
	return e[wo];
}
function Ve(e, t) {
	let n = e.hasOwnProperty(Bt);
	return n ? e[Bt] : null;
}
function ra(e, t) {
	e.forEach((n) => (Array.isArray(n) ? ra(n, t) : t(n)));
}
function Wo(e, t, n) {
	t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function Zt(e, t) {
	return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function Fi(e, t) {
	let n = [];
	for (let a = 0; a < e; a++) n.push(t);
	return n;
}
function ji(e, t, n, a) {
	let o = e.length;
	if (o == t) e.push(n, a);
	else if (o === 1) (e.push(a, e[0]), (e[0] = n));
	else {
		for (o--, e.push(e[o - 1], e[o]); o > t; ) {
			let r = o - 2;
			((e[o] = e[r]), o--);
		}
		((e[t] = n), (e[t + 1] = a));
	}
}
function ia(e, t, n) {
	let a = Mt(e, t);
	return (a >= 0 ? (e[a | 1] = n) : ((a = ~a), ji(e, a, t, n)), a);
}
function sa(e, t) {
	let n = Mt(e, t);
	if (n >= 0) return e[n | 1];
}
function Mt(e, t) {
	return e0(e, t, 1);
}
function e0(e, t, n) {
	let a = 0,
		o = e.length >> n;
	for (; o !== a; ) {
		let r = a + ((o - a) >> 1),
			i = e[r << n];
		if (t === i) return r << n;
		i > t ? (o = r) : (a = r + 1);
	}
	return ~(o << n);
}
var We = {},
	W = [],
	vt = new b(''),
	$o = new b('', -1),
	Zo = new b(''),
	Ut = class {
		get(t, n = je) {
			if (n === je) {
				let o = _i('', -201);
				throw ((o.name = '\u0275NotFound'), o);
			}
			return n;
		}
	};
function ca(e) {
	return { ɵproviders: e };
}
function qi(e) {
	return ca([{ provide: vt, multi: !0, useValue: e }]);
}
function Vi(...e) {
	return { ɵproviders: Qo(!0, e), ɵfromNgModule: !0 };
}
function Qo(e, ...t) {
	let n = [],
		a = new Set(),
		o,
		r = (i) => {
			n.push(i);
		};
	return (
		ra(t, (i) => {
			let s = i;
			Qn(s, r, [], a) && ((o ||= []), o.push(s));
		}),
		o !== void 0 && zi(o, r),
		n
	);
}
function zi(e, t) {
	for (let n = 0; n < e.length; n++) {
		let { ngModule: a, providers: o } = e[n];
		Xo(o, (r) => {
			t(r, a);
		});
	}
}
function Qn(e, t, n, a) {
	if (((e = G(e)), !e)) return !1;
	let o = null,
		r = Io(e),
		i = !r && Ae(e);
	if (!r && !i) {
		let c = e.ngModule;
		if (((r = Io(c)), r)) o = c;
		else return !1;
	} else {
		if (i && !i.standalone) return !1;
		o = e;
	}
	let s = a.has(o);
	if (i) {
		if (s) return !1;
		if ((a.add(o), i.dependencies)) {
			let c = typeof i.dependencies == 'function' ? i.dependencies() : i.dependencies;
			for (let d of c) Qn(d, t, n, a);
		}
	} else if (r) {
		if (r.imports != null && !s) {
			a.add(o);
			let d;
			(ra(r.imports, (l) => {
				Qn(l, t, n, a) && ((d ||= []), d.push(l));
			}),
				d !== void 0 && zi(d, t));
		}
		if (!s) {
			let d = Ve(o) || (() => new o());
			(t({ provide: o, useFactory: d, deps: W }, o),
				t({ provide: Zo, useValue: o, multi: !0 }, o),
				t({ provide: vt, useValue: () => ue(o), multi: !0 }, o));
		}
		let c = r.providers;
		if (c != null && !s) {
			let d = e;
			Xo(c, (l) => {
				t(l, d);
			});
		}
	} else return !1;
	return o !== e && e.providers !== void 0;
}
function Xo(e, t) {
	for (let n of e) (Oo(n) && (n = n.ɵproviders), Array.isArray(n) ? Xo(n, t) : t(n));
}
var t0 = L({ provide: String, useValue: L });
function Bi(e) {
	return e !== null && typeof e == 'object' && t0 in e;
}
function n0(e) {
	return !!(e && e.useExisting);
}
function a0(e) {
	return !!(e && e.useFactory);
}
function Xn(e) {
	return typeof e == 'function';
}
var Ko = new b(''),
	$n = {},
	Ai = {},
	vo;
function Qt() {
	return (vo === void 0 && (vo = new Ut()), vo);
}
var J = class {},
	ze = class extends J {
		parent;
		source;
		scopes;
		records = new Map();
		_ngOnDestroyHooks = new Set();
		_onDestroyHooks = [];
		get destroyed() {
			return this._destroyed;
		}
		_destroyed = !1;
		injectorDefTypes;
		constructor(t, n, a, o) {
			(super(),
				(this.parent = n),
				(this.source = a),
				(this.scopes = o),
				So(t, (i) => this.processProvider(i)),
				this.records.set($o, kt(void 0, this)),
				o.has('environment') && this.records.set(J, kt(void 0, this)));
			let r = this.records.get(Ko);
			(r != null && typeof r.value == 'string' && this.scopes.add(r.value),
				(this.injectorDefTypes = new Set(this.get(Zo, W, { self: !0 }))));
		}
		retrieve(t, n) {
			let a = qe(n) || 0;
			try {
				return this.get(t, je, a);
			} catch (o) {
				if (ft(o)) return o;
				throw o;
			}
		}
		destroy() {
			(zt(this), (this._destroyed = !0));
			let t = f(null);
			try {
				for (let a of this._ngOnDestroyHooks) a.ngOnDestroy();
				let n = this._onDestroyHooks;
				this._onDestroyHooks = [];
				for (let a of n) a();
			} finally {
				(this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), f(t));
			}
		}
		onDestroy(t) {
			return (zt(this), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t));
		}
		runInContext(t) {
			zt(this);
			let n = le(this),
				a = $(void 0),
				o;
			try {
				return t();
			} finally {
				(le(n), $(a));
			}
		}
		get(t, n = je, a) {
			if ((zt(this), t.hasOwnProperty(Di))) return t[Di](this);
			let o = qe(a),
				r,
				i = le(this),
				s = $(void 0);
			try {
				if (!(o & 4)) {
					let d = this.records.get(t);
					if (d === void 0) {
						let l = c0(t) && $t(t);
						(l && this.injectableDefInScope(l) ? (d = kt(bo(t), $n)) : (d = null), this.records.set(t, d));
					}
					if (d != null) return this.hydrate(t, d, o);
				}
				let c = o & 2 ? Qt() : this.parent;
				return ((n = o & 8 && n === je ? null : n), c.get(t, n));
			} catch (c) {
				let d = Qd(c);
				throw d === -200 || d === -201 ? new C(d, null) : c;
			} finally {
				($(s), le(i));
			}
		}
		resolveInjectorInitializers() {
			let t = f(null),
				n = le(this),
				a = $(void 0),
				o;
			try {
				let r = this.get(vt, W, { self: !0 });
				for (let i of r) i();
			} finally {
				(le(n), $(a), f(t));
			}
		}
		toString() {
			let t = [],
				n = this.records;
			for (let a of n.keys()) t.push(Se(a));
			return `R3Injector[${t.join(', ')}]`;
		}
		processProvider(t) {
			t = G(t);
			let n = Xn(t) ? t : G(t && t.provide),
				a = r0(t);
			if (!Xn(t) && t.multi === !0) {
				let o = this.records.get(n);
				(o || ((o = kt(void 0, $n, !0)), (o.factory = () => Lo(o.multi)), this.records.set(n, o)),
					(n = t),
					o.multi.push(t));
			}
			this.records.set(n, a);
		}
		hydrate(t, n, a) {
			let o = f(null);
			try {
				if (n.value === Ai) throw Uo(Se(t));
				return (
					n.value === $n && ((n.value = Ai), (n.value = n.factory(void 0, a))),
					typeof n.value == 'object' && n.value && s0(n.value) && this._ngOnDestroyHooks.add(n.value),
					n.value
				);
			} finally {
				f(o);
			}
		}
		injectableDefInScope(t) {
			if (!t.providedIn) return !1;
			let n = G(t.providedIn);
			return typeof n == 'string' ? n === 'any' || this.scopes.has(n) : this.injectorDefTypes.has(n);
		}
		removeOnDestroy(t) {
			let n = this._onDestroyHooks.indexOf(t);
			n !== -1 && this._onDestroyHooks.splice(n, 1);
		}
	};
function bo(e) {
	let t = $t(e),
		n = t !== null ? t.factory : Ve(e);
	if (n !== null) return n;
	if (e instanceof b) throw new C(204, !1);
	if (e instanceof Function) return o0(e);
	throw new C(204, !1);
}
function o0(e) {
	if (e.length > 0) throw new C(204, !1);
	let n = Wd(e);
	return n !== null ? () => n.factory(e) : () => new e();
}
function r0(e) {
	if (Bi(e)) return kt(void 0, e.useValue);
	{
		let t = Ui(e);
		return kt(t, $n);
	}
}
function Ui(e, t, n) {
	let a;
	if (Xn(e)) {
		let o = G(e);
		return Ve(o) || bo(o);
	} else if (Bi(e)) a = () => G(e.useValue);
	else if (a0(e)) a = () => e.useFactory(...Lo(e.deps || []));
	else if (n0(e)) a = (o, r) => ue(G(e.useExisting), r !== void 0 && r & 8 ? 8 : void 0);
	else {
		let o = G(e && (e.useClass || e.provide));
		if (i0(e)) a = () => new o(...Lo(e.deps));
		else return Ve(o) || bo(o);
	}
	return a;
}
function zt(e) {
	if (e.destroyed) throw new C(205, !1);
}
function kt(e, t, n = !1) {
	return { factory: e, value: t, multi: n ? [] : void 0 };
}
function i0(e) {
	return !!e.deps;
}
function s0(e) {
	return e !== null && typeof e == 'object' && typeof e.ngOnDestroy == 'function';
}
function c0(e) {
	return typeof e == 'function' || (typeof e == 'object' && e.ngMetadataName === 'InjectionToken');
}
function So(e, t) {
	for (let n of e) Array.isArray(n) ? So(n, t) : n && Oo(n) ? So(n.ɵproviders, t) : t(n);
}
function da(e, t) {
	let n;
	e instanceof ze ? (zt(e), (n = e)) : (n = new Co(e));
	let a,
		o = le(n),
		r = $(void 0);
	try {
		return t();
	} finally {
		(le(o), $(r));
	}
}
function Gi() {
	return Hi() !== void 0 || Wn() != null;
}
var oe = 0,
	k = 1,
	M = 2,
	F = 3,
	ee = 4,
	z = 5,
	$e = 6,
	la = 7,
	H = 8,
	Ee = 9,
	he = 10,
	R = 11,
	It = 12,
	Yo = 13,
	Ze = 14,
	B = 15,
	Qe = 16,
	Xe = 17,
	Ke = 18,
	ve = 19,
	Jo = 20,
	me = 21,
	ua = 22,
	Xt = 23,
	Z = 24,
	ha = 25,
	Ye = 26,
	N = 27,
	Wi = 1,
	er = 6,
	Te = 7,
	Kt = 8,
	Yt = 9,
	_ = 10;
function pe(e) {
	return Array.isArray(e) && typeof e[Wi] == 'object';
}
function re(e) {
	return Array.isArray(e) && e[Wi] === !0;
}
function tr(e) {
	return (e.flags & 4) !== 0;
}
function Je(e) {
	return e.componentOffset > -1;
}
function nr(e) {
	return (e.flags & 1) === 1;
}
function et(e) {
	return !!e.template;
}
function xt(e) {
	return (e[M] & 512) !== 0;
}
function tt(e) {
	return (e[M] & 256) === 256;
}
var $i = 'svg',
	Zi = 'math';
function ie(e) {
	for (; Array.isArray(e); ) e = e[oe];
	return e;
}
function ar(e, t) {
	return ie(t[e]);
}
function Ie(e, t) {
	return ie(t[e.index]);
}
function Jt(e, t) {
	return e.data[t];
}
function Qi(e, t) {
	return e[t];
}
function pa(e, t, n, a) {
	(n >= e.data.length && ((e.data[n] = null), (e.blueprint[n] = null)), (t[n] = a));
}
function se(e, t) {
	let n = t[e];
	return pe(n) ? n : n[oe];
}
function ya(e) {
	return (e[M] & 128) === 128;
}
function Xi(e) {
	return re(e[F]);
}
function ye(e, t) {
	return t == null ? null : e[t];
}
function or(e) {
	e[Xe] = 0;
}
function rr(e) {
	e[M] & 1024 || ((e[M] |= 1024), ya(e) && tn(e));
}
function Ki(e, t) {
	for (; e > 0; ) ((t = t[Ze]), e--);
	return t;
}
function en(e) {
	return !!(e[M] & 9216 || e[Z]?.dirty);
}
function fa(e) {
	(e[he].changeDetectionScheduler?.notify(8), e[M] & 64 && (e[M] |= 1024), en(e) && tn(e));
}
function tn(e) {
	e[he].changeDetectionScheduler?.notify(0);
	let t = De(e);
	for (; t !== null && !(t[M] & 8192 || ((t[M] |= 8192), !ya(t))); ) t = De(t);
}
function ir(e, t) {
	if (tt(e)) throw new C(911, !1);
	(e[me] === null && (e[me] = []), e[me].push(t));
}
function Yi(e, t) {
	if (e[me] === null) return;
	let n = e[me].indexOf(t);
	n !== -1 && e[me].splice(n, 1);
}
function De(e) {
	let t = e[F];
	return re(t) ? t[F] : t;
}
var v = { lFrame: us(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var Do = !1;
function Ji() {
	return v.lFrame.elementDepthCount;
}
function es() {
	v.lFrame.elementDepthCount++;
}
function sr() {
	v.lFrame.elementDepthCount--;
}
function ts() {
	return v.bindingsEnabled;
}
function cr() {
	return v.skipHydrationRootTNode !== null;
}
function dr(e) {
	return v.skipHydrationRootTNode === e;
}
function lr() {
	v.skipHydrationRootTNode = null;
}
function I() {
	return v.lFrame.lView;
}
function Q() {
	return v.lFrame.tView;
}
function fe() {
	let e = ur();
	for (; e !== null && e.type === 64; ) e = e.parent;
	return e;
}
function ur() {
	return v.lFrame.currentTNode;
}
function ns() {
	let e = v.lFrame,
		t = e.currentTNode;
	return e.isParent ? t : t.parent;
}
function nt(e, t) {
	let n = v.lFrame;
	((n.currentTNode = e), (n.isParent = t));
}
function hr() {
	return v.lFrame.isParent;
}
function pr() {
	v.lFrame.isParent = !1;
}
function as() {
	return v.lFrame.contextLView;
}
function yr() {
	return Do;
}
function fr(e) {
	let t = Do;
	return ((Do = e), t);
}
function os() {
	return v.lFrame.bindingIndex;
}
function rs(e) {
	return (v.lFrame.bindingIndex = e);
}
function at() {
	return v.lFrame.bindingIndex++;
}
function kr(e) {
	let t = v.lFrame,
		n = t.bindingIndex;
	return ((t.bindingIndex = t.bindingIndex + e), n);
}
function is() {
	return v.lFrame.inI18n;
}
function ss(e, t) {
	let n = v.lFrame;
	((n.bindingIndex = n.bindingRootIndex = e), ka(t));
}
function cs() {
	return v.lFrame.currentDirectiveIndex;
}
function ka(e) {
	v.lFrame.currentDirectiveIndex = e;
}
function ds(e) {
	let t = v.lFrame.currentDirectiveIndex;
	return t === -1 ? null : e[t];
}
function gr(e) {
	v.lFrame.currentQueryIndex = e;
}
function d0(e) {
	let t = e[k];
	return t.type === 2 ? t.declTNode : t.type === 1 ? e[z] : null;
}
function mr(e, t, n) {
	if (n & 4) {
		let o = t,
			r = e;
		for (; (o = o.parent), o === null && !(n & 1); )
			if (((o = d0(r)), o === null || ((r = r[Ze]), o.type & 10))) break;
		if (o === null) return !1;
		((t = o), (e = r));
	}
	let a = (v.lFrame = ls());
	return ((a.currentTNode = t), (a.lView = e), !0);
}
function ga(e) {
	let t = ls(),
		n = e[k];
	((v.lFrame = t),
		(t.currentTNode = n.firstChild),
		(t.lView = e),
		(t.tView = n),
		(t.contextLView = e),
		(t.bindingIndex = n.bindingStartIndex),
		(t.inI18n = !1));
}
function ls() {
	let e = v.lFrame,
		t = e === null ? null : e.child;
	return t === null ? us(e) : t;
}
function us(e) {
	let t = {
		currentTNode: null,
		isParent: !0,
		lView: null,
		tView: null,
		selectedIndex: -1,
		contextLView: null,
		elementDepthCount: 0,
		currentNamespace: null,
		currentDirectiveIndex: -1,
		bindingRootIndex: -1,
		bindingIndex: -1,
		currentQueryIndex: 0,
		parent: e,
		child: null,
		inI18n: !1,
	};
	return (e !== null && (e.child = t), t);
}
function hs() {
	let e = v.lFrame;
	return ((v.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e);
}
var Mr = hs;
function ma() {
	let e = hs();
	((e.isParent = !0),
		(e.tView = null),
		(e.selectedIndex = -1),
		(e.contextLView = null),
		(e.elementDepthCount = 0),
		(e.currentDirectiveIndex = -1),
		(e.currentNamespace = null),
		(e.bindingRootIndex = -1),
		(e.bindingIndex = -1),
		(e.currentQueryIndex = 0));
}
function ps(e) {
	return (v.lFrame.contextLView = Ki(e, v.lFrame.contextLView))[H];
}
function xe() {
	return v.lFrame.selectedIndex;
}
function Pe(e) {
	v.lFrame.selectedIndex = e;
}
function vr() {
	let e = v.lFrame;
	return Jt(e.tView, e.selectedIndex);
}
function ys() {
	return v.lFrame.currentNamespace;
}
var fs = !0;
function Ma() {
	return fs;
}
function va(e) {
	fs = e;
}
function Ao(e, t = null, n = null, a) {
	let o = Ir(e, t, n, a);
	return (o.resolveInjectorInitializers(), o);
}
function Ir(e, t = null, n = null, a, o = new Set()) {
	let r = [n || W, Vi(e)];
	return ((a = a || (typeof e == 'object' ? void 0 : Se(e))), new ze(r, t || Qt(), a || null, o));
}
var Be = class e {
		static THROW_IF_NOT_FOUND = je;
		static NULL = new Ut();
		static create(t, n) {
			if (Array.isArray(t)) return Ao({ name: '' }, n, t, '');
			{
				let a = t.name ?? '';
				return Ao({ name: a }, t.parent, t.providers, a);
			}
		}
		static ɵprov = q({ token: e, providedIn: 'any', factory: () => ue($o) });
		static __NG_ELEMENT_ID__ = -1;
	},
	Ia = new b(''),
	nn = (() => {
		class e {
			static __NG_ELEMENT_ID__ = l0;
			static __NG_ENV_ID__ = (n) => n;
		}
		return e;
	})(),
	Eo = class extends nn {
		_lView;
		constructor(t) {
			(super(), (this._lView = t));
		}
		get destroyed() {
			return tt(this._lView);
		}
		onDestroy(t) {
			let n = this._lView;
			return (ir(n, t), () => Yi(n, t));
		}
	};
function l0() {
	return new Eo(I());
}
var ks = !1,
	gs = new b(''),
	wt = (() => {
		class e {
			taskId = 0;
			pendingTasks = new Set();
			destroyed = !1;
			pendingTask = new jt(!1);
			debugTaskTracker = x(gs, { optional: !0 });
			get hasPendingTasks() {
				return this.destroyed ? !1 : this.pendingTask.value;
			}
			get hasPendingTasksObservable() {
				return this.destroyed
					? new D((n) => {
							(n.next(!1), n.complete());
						})
					: this.pendingTask;
			}
			add() {
				!this.hasPendingTasks && !this.destroyed && this.pendingTask.next(!0);
				let n = this.taskId++;
				return (this.pendingTasks.add(n), this.debugTaskTracker?.add(n), n);
			}
			has(n) {
				return this.pendingTasks.has(n);
			}
			remove(n) {
				(this.pendingTasks.delete(n),
					this.debugTaskTracker?.remove(n),
					this.pendingTasks.size === 0 && this.hasPendingTasks && this.pendingTask.next(!1));
			}
			ngOnDestroy() {
				(this.pendingTasks.clear(),
					this.hasPendingTasks && this.pendingTask.next(!1),
					(this.destroyed = !0),
					this.pendingTask.unsubscribe());
			}
			static ɵprov = q({ token: e, providedIn: 'root', factory: () => new e() });
		}
		return e;
	})(),
	To = class extends Ce {
		__isAsync;
		destroyRef = void 0;
		pendingTasks = void 0;
		constructor(t = !1) {
			(super(),
				(this.__isAsync = t),
				Gi() &&
					((this.destroyRef = x(nn, { optional: !0 }) ?? void 0),
					(this.pendingTasks = x(wt, { optional: !0 }) ?? void 0)));
		}
		emit(t) {
			let n = f(null);
			try {
				super.next(t);
			} finally {
				f(n);
			}
		}
		subscribe(t, n, a) {
			let o = t,
				r = n || (() => null),
				i = a;
			if (t && typeof t == 'object') {
				let c = t;
				((o = c.next?.bind(c)), (r = c.error?.bind(c)), (i = c.complete?.bind(c)));
			}
			this.__isAsync &&
				((r = this.wrapInTimeout(r)), o && (o = this.wrapInTimeout(o)), i && (i = this.wrapInTimeout(i)));
			let s = super.subscribe({ next: o, error: r, complete: i });
			return (t instanceof V && t.add(s), s);
		}
		wrapInTimeout(t) {
			return (n) => {
				let a = this.pendingTasks?.add();
				setTimeout(() => {
					try {
						t(n);
					} finally {
						a !== void 0 && this.pendingTasks?.remove(a);
					}
				});
			};
		}
	},
	ge = To;
function Kn(...e) {}
function xr(e) {
	let t, n;
	function a() {
		e = Kn;
		try {
			(n !== void 0 && typeof cancelAnimationFrame == 'function' && cancelAnimationFrame(n),
				t !== void 0 && clearTimeout(t));
		} catch {}
	}
	return (
		(t = setTimeout(() => {
			(e(), a());
		})),
		typeof requestAnimationFrame == 'function' &&
			(n = requestAnimationFrame(() => {
				(e(), a());
			})),
		() => a()
	);
}
function ms(e) {
	return (
		queueMicrotask(() => e()),
		() => {
			e = Kn;
		}
	);
}
var wr = 'isAngularZone',
	Gt = wr + '_ID',
	u0 = 0,
	Me = class e {
		hasPendingMacrotasks = !1;
		hasPendingMicrotasks = !1;
		isStable = !0;
		onUnstable = new ge(!1);
		onMicrotaskEmpty = new ge(!1);
		onStable = new ge(!1);
		onError = new ge(!1);
		constructor(t) {
			let {
				enableLongStackTrace: n = !1,
				shouldCoalesceEventChangeDetection: a = !1,
				shouldCoalesceRunChangeDetection: o = !1,
				scheduleInRootZone: r = ks,
			} = t;
			if (typeof Zone > 'u') throw new C(908, !1);
			Zone.assertZonePatched();
			let i = this;
			((i._nesting = 0),
				(i._outer = i._inner = Zone.current),
				Zone.TaskTrackingZoneSpec && (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
				n && Zone.longStackTraceZoneSpec && (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
				(i.shouldCoalesceEventChangeDetection = !o && a),
				(i.shouldCoalesceRunChangeDetection = o),
				(i.callbackScheduled = !1),
				(i.scheduleInRootZone = r),
				y0(i));
		}
		static isInAngularZone() {
			return typeof Zone < 'u' && Zone.current.get(wr) === !0;
		}
		static assertInAngularZone() {
			if (!e.isInAngularZone()) throw new C(909, !1);
		}
		static assertNotInAngularZone() {
			if (e.isInAngularZone()) throw new C(909, !1);
		}
		run(t, n, a) {
			return this._inner.run(t, n, a);
		}
		runTask(t, n, a, o) {
			let r = this._inner,
				i = r.scheduleEventTask('NgZoneEvent: ' + o, t, h0, Kn, Kn);
			try {
				return r.runTask(i, n, a);
			} finally {
				r.cancelTask(i);
			}
		}
		runGuarded(t, n, a) {
			return this._inner.runGuarded(t, n, a);
		}
		runOutsideAngular(t) {
			return this._outer.run(t);
		}
	},
	h0 = {};
function Cr(e) {
	if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
		try {
			(e._nesting++, e.onMicrotaskEmpty.emit(null));
		} finally {
			if ((e._nesting--, !e.hasPendingMicrotasks))
				try {
					e.runOutsideAngular(() => e.onStable.emit(null));
				} finally {
					e.isStable = !0;
				}
		}
}
function p0(e) {
	if (e.isCheckStableRunning || e.callbackScheduled) return;
	e.callbackScheduled = !0;
	function t() {
		xr(() => {
			((e.callbackScheduled = !1), Po(e), (e.isCheckStableRunning = !0), Cr(e), (e.isCheckStableRunning = !1));
		});
	}
	(e.scheduleInRootZone
		? Zone.root.run(() => {
				t();
			})
		: e._outer.run(() => {
				t();
			}),
		Po(e));
}
function y0(e) {
	let t = () => {
			p0(e);
		},
		n = u0++;
	e._inner = e._inner.fork({
		name: 'angular',
		properties: { [wr]: !0, [Gt]: n, [Gt + n]: !0 },
		onInvokeTask: (a, o, r, i, s, c) => {
			if (f0(c)) return a.invokeTask(r, i, s, c);
			try {
				return (Ei(e), a.invokeTask(r, i, s, c));
			} finally {
				(((e.shouldCoalesceEventChangeDetection && i.type === 'eventTask') ||
					e.shouldCoalesceRunChangeDetection) &&
					t(),
					Ti(e));
			}
		},
		onInvoke: (a, o, r, i, s, c, d) => {
			try {
				return (Ei(e), a.invoke(r, i, s, c, d));
			} finally {
				(e.shouldCoalesceRunChangeDetection && !e.callbackScheduled && !k0(c) && t(), Ti(e));
			}
		},
		onHasTask: (a, o, r, i) => {
			(a.hasTask(r, i),
				o === r &&
					(i.change == 'microTask'
						? ((e._hasPendingMicrotasks = i.microTask), Po(e), Cr(e))
						: i.change == 'macroTask' && (e.hasPendingMacrotasks = i.macroTask)));
		},
		onHandleError: (a, o, r, i) => (a.handleError(r, i), e.runOutsideAngular(() => e.onError.emit(i)), !1),
	});
}
function Po(e) {
	e._hasPendingMicrotasks ||
	((e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && e.callbackScheduled === !0)
		? (e.hasPendingMicrotasks = !0)
		: (e.hasPendingMicrotasks = !1);
}
function Ei(e) {
	(e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null)));
}
function Ti(e) {
	(e._nesting--, Cr(e));
}
var Wt = class {
	hasPendingMicrotasks = !1;
	hasPendingMacrotasks = !1;
	isStable = !0;
	onUnstable = new ge();
	onMicrotaskEmpty = new ge();
	onStable = new ge();
	onError = new ge();
	run(t, n, a) {
		return t.apply(n, a);
	}
	runGuarded(t, n, a) {
		return t.apply(n, a);
	}
	runOutsideAngular(t) {
		return t();
	}
	runTask(t, n, a, o) {
		return t.apply(n, a);
	}
};
function f0(e) {
	return Ms(e, '__ignore_ng_zone__');
}
function k0(e) {
	return Ms(e, '__scheduler_tick__');
}
function Ms(e, t) {
	return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0;
}
var gt = class {
		_console = console;
		handleError(t) {
			this._console.error('ERROR', t);
		}
	},
	Ct = new b('', {
		factory: () => {
			let e = x(Me),
				t = x(J),
				n;
			return (a) => {
				e.runOutsideAngular(() => {
					t.destroyed && !n
						? setTimeout(() => {
								throw a;
							})
						: ((n ??= t.get(gt)), n.handleError(a));
				});
			};
		},
	}),
	vs = {
		provide: vt,
		useValue: () => {
			let e = x(gt, { optional: !0 });
		},
		multi: !0,
	},
	g0 = new b('', {
		factory: () => {
			let e = x(Ia).defaultView;
			if (!e) return;
			let t = x(Ct),
				n = (r) => {
					(t(r.reason), r.preventDefault());
				},
				a = (r) => {
					(r.error ? t(r.error) : t(new Error(r.message, { cause: r })), r.preventDefault());
				},
				o = () => {
					(e.addEventListener('unhandledrejection', n), e.addEventListener('error', a));
				};
			(typeof Zone < 'u' ? Zone.root.run(o) : o(),
				x(nn).onDestroy(() => {
					(e.removeEventListener('error', a), e.removeEventListener('unhandledrejection', n));
				}));
		},
	});
function m0() {
	return ca([
		qi(() => {
			x(g0);
		}),
	]);
}
function Is(e, t) {
	let [n, a, o] = so(e, t?.equal),
		r = n,
		i = r[Y];
	return ((r.set = a), (r.update = o), (r.asReadonly = xs.bind(r)), r);
}
function xs() {
	let e = this[Y];
	if (e.readonlyFn === void 0) {
		let t = () => this();
		((t[Y] = e), (e.readonlyFn = t));
	}
	return e.readonlyFn;
}
var mt = class {},
	an = new b('', { factory: () => !0 });
var Lr = new b('');
var br = (() => {
		class e {
			static ɵprov = q({ token: e, providedIn: 'root', factory: () => new Ro() });
		}
		return e;
	})(),
	Ro = class {
		dirtyEffectCount = 0;
		queues = new Map();
		add(t) {
			(this.enqueue(t), this.schedule(t));
		}
		schedule(t) {
			t.dirty && this.dirtyEffectCount++;
		}
		remove(t) {
			let n = t.zone,
				a = this.queues.get(n);
			a.has(t) && (a.delete(t), t.dirty && this.dirtyEffectCount--);
		}
		enqueue(t) {
			let n = t.zone;
			this.queues.has(n) || this.queues.set(n, new Set());
			let a = this.queues.get(n);
			a.has(t) || a.add(t);
		}
		flush() {
			for (; this.dirtyEffectCount > 0; ) {
				let t = !1;
				for (let [n, a] of this.queues)
					n === null ? (t ||= this.flushQueue(a)) : (t ||= n.run(() => this.flushQueue(a)));
				t || (this.dirtyEffectCount = 0);
			}
		}
		flushQueue(t) {
			let n = !1;
			for (let a of t) a.dirty && (this.dirtyEffectCount--, (n = !0), a.run());
			return n;
		}
	},
	No = class {
		[Y];
		constructor(t) {
			this[Y] = t;
		}
		destroy() {
			this[Y].destroy();
		}
	};
function ws(e) {
	return co(e);
}
function Pt(e) {
	return { toString: e }.toString();
}
var xa = '__parameters__';
function P0(e) {
	return function (...n) {
		if (e) {
			let a = e(...n);
			for (let o in a) this[o] = a[o];
		}
	};
}
function R0(e, t, n) {
	return Pt(() => {
		let a = P0(t);
		function o(...r) {
			if (this instanceof o) return (a.apply(this, r), this);
			let i = new o(...r);
			return ((s.annotation = i), s);
			function s(c, d, l) {
				let u = c.hasOwnProperty(xa) ? c[xa] : Object.defineProperty(c, xa, { value: [] })[xa];
				for (; u.length <= l; ) u.push(null);
				return ((u[l] = u[l] || []).push(i), c);
			}
		}
		return ((o.prototype.ngMetadataName = e), (o.annotationCls = o), o);
	});
}
var e1 = Oi(R0('Optional'), 8);
function N0(e) {
	return typeof e == 'function';
}
function $s(e, t, n, a) {
	t !== null ? t.applyValueToInputSignal(t, a) : (e[n] = a);
}
var Sa = class {
		previousValue;
		currentValue;
		firstChange;
		constructor(t, n, a) {
			((this.previousValue = t), (this.currentValue = n), (this.firstChange = a));
		}
		isFirstChange() {
			return this.firstChange;
		}
	},
	t1 = (() => {
		let e = () => Zs;
		return ((e.ngInherit = !0), e);
	})();
function Zs(e) {
	return (e.type.prototype.ngOnChanges && (e.setInput = H0), _0);
}
function _0() {
	let e = Xs(this),
		t = e?.current;
	if (t) {
		let n = e.previous;
		if (n === We) e.previous = t;
		else for (let a in t) n[a] = t[a];
		((e.current = null), this.ngOnChanges(t));
	}
}
function H0(e, t, n, a, o) {
	let r = this.declaredInputs[a],
		i = Xs(e) || O0(e, { previous: We, current: null }),
		s = i.current || (i.current = {}),
		c = i.previous,
		d = c[r];
	((s[r] = new Sa(d && d.currentValue, n, c === We)), $s(e, t, o, n));
}
var Qs = '__ngSimpleChanges__';
function Xs(e) {
	return e[Qs] || null;
}
function O0(e, t) {
	return (e[Qs] = t);
}
var Cs = [];
var P = function (e, t = null, n) {
		for (let a = 0; a < Cs.length; a++) {
			let o = Cs[a];
			o(e, t, n);
		}
	},
	A = (function (e) {
		return (
			(e[(e.TemplateCreateStart = 0)] = 'TemplateCreateStart'),
			(e[(e.TemplateCreateEnd = 1)] = 'TemplateCreateEnd'),
			(e[(e.TemplateUpdateStart = 2)] = 'TemplateUpdateStart'),
			(e[(e.TemplateUpdateEnd = 3)] = 'TemplateUpdateEnd'),
			(e[(e.LifecycleHookStart = 4)] = 'LifecycleHookStart'),
			(e[(e.LifecycleHookEnd = 5)] = 'LifecycleHookEnd'),
			(e[(e.OutputStart = 6)] = 'OutputStart'),
			(e[(e.OutputEnd = 7)] = 'OutputEnd'),
			(e[(e.BootstrapApplicationStart = 8)] = 'BootstrapApplicationStart'),
			(e[(e.BootstrapApplicationEnd = 9)] = 'BootstrapApplicationEnd'),
			(e[(e.BootstrapComponentStart = 10)] = 'BootstrapComponentStart'),
			(e[(e.BootstrapComponentEnd = 11)] = 'BootstrapComponentEnd'),
			(e[(e.ChangeDetectionStart = 12)] = 'ChangeDetectionStart'),
			(e[(e.ChangeDetectionEnd = 13)] = 'ChangeDetectionEnd'),
			(e[(e.ChangeDetectionSyncStart = 14)] = 'ChangeDetectionSyncStart'),
			(e[(e.ChangeDetectionSyncEnd = 15)] = 'ChangeDetectionSyncEnd'),
			(e[(e.AfterRenderHooksStart = 16)] = 'AfterRenderHooksStart'),
			(e[(e.AfterRenderHooksEnd = 17)] = 'AfterRenderHooksEnd'),
			(e[(e.ComponentStart = 18)] = 'ComponentStart'),
			(e[(e.ComponentEnd = 19)] = 'ComponentEnd'),
			(e[(e.DeferBlockStateStart = 20)] = 'DeferBlockStateStart'),
			(e[(e.DeferBlockStateEnd = 21)] = 'DeferBlockStateEnd'),
			(e[(e.DynamicComponentStart = 22)] = 'DynamicComponentStart'),
			(e[(e.DynamicComponentEnd = 23)] = 'DynamicComponentEnd'),
			(e[(e.HostBindingsUpdateStart = 24)] = 'HostBindingsUpdateStart'),
			(e[(e.HostBindingsUpdateEnd = 25)] = 'HostBindingsUpdateEnd'),
			e
		);
	})(A || {});
function F0(e, t, n) {
	let { ngOnChanges: a, ngOnInit: o, ngDoCheck: r } = t.type.prototype;
	if (a) {
		let i = Zs(t);
		((n.preOrderHooks ??= []).push(e, i), (n.preOrderCheckHooks ??= []).push(e, i));
	}
	(o && (n.preOrderHooks ??= []).push(0 - e, o),
		r && ((n.preOrderHooks ??= []).push(e, r), (n.preOrderCheckHooks ??= []).push(e, r)));
}
function j0(e, t) {
	for (let n = t.directiveStart, a = t.directiveEnd; n < a; n++) {
		let r = e.data[n].type.prototype,
			{
				ngAfterContentInit: i,
				ngAfterContentChecked: s,
				ngAfterViewInit: c,
				ngAfterViewChecked: d,
				ngOnDestroy: l,
			} = r;
		(i && (e.contentHooks ??= []).push(-n, i),
			s && ((e.contentHooks ??= []).push(n, s), (e.contentCheckHooks ??= []).push(n, s)),
			c && (e.viewHooks ??= []).push(-n, c),
			d && ((e.viewHooks ??= []).push(n, d), (e.viewCheckHooks ??= []).push(n, d)),
			l != null && (e.destroyHooks ??= []).push(n, l));
	}
}
function Ca(e, t, n) {
	Ks(e, t, 3, n);
}
function La(e, t, n, a) {
	(e[M] & 3) === n && Ks(e, t, n, a);
}
function Sr(e, t) {
	let n = e[M];
	(n & 3) === t && ((n &= 16383), (n += 1), (e[M] = n));
}
function Ks(e, t, n, a) {
	let o = a !== void 0 ? e[Xe] & 65535 : 0,
		r = a ?? -1,
		i = t.length - 1,
		s = 0;
	for (let c = o; c < i; c++)
		if (typeof t[c + 1] == 'number') {
			if (((s = t[c]), a != null && s >= a)) break;
		} else
			(t[c] < 0 && (e[Xe] += 65536),
				(s < r || r == -1) && (q0(e, n, t, c), (e[Xe] = (e[Xe] & 4294901760) + c + 2)),
				c++);
}
function Ls(e, t) {
	P(A.LifecycleHookStart, e, t);
	let n = f(null);
	try {
		t.call(e);
	} finally {
		(f(n), P(A.LifecycleHookEnd, e, t));
	}
}
function q0(e, t, n, a) {
	let o = n[a] < 0,
		r = n[a + 1],
		i = o ? -n[a] : n[a],
		s = e[i];
	o ? e[M] >> 14 < e[Xe] >> 16 && (e[M] & 3) === t && ((e[M] += 16384), Ls(s, r)) : Ls(s, r);
}
var bt = -1,
	sn = class {
		factory;
		name;
		injectImpl;
		resolving = !1;
		canSeeViewProviders;
		multi;
		componentProviders;
		index;
		providerFactory;
		constructor(t, n, a, o) {
			((this.factory = t), (this.name = o), (this.canSeeViewProviders = n), (this.injectImpl = a));
		}
	};
function V0(e) {
	return (e.flags & 8) !== 0;
}
function z0(e) {
	return (e.flags & 16) !== 0;
}
function B0(e, t, n) {
	let a = 0;
	for (; a < n.length; ) {
		let o = n[a];
		if (typeof o == 'number') {
			if (o !== 0) break;
			a++;
			let r = n[a++],
				i = n[a++],
				s = n[a++];
			e.setAttribute(t, i, s, r);
		} else {
			let r = o,
				i = n[++a];
			(G0(r) ? e.setProperty(t, r, i) : e.setAttribute(t, r, i), a++);
		}
	}
	return a;
}
function U0(e) {
	return e === 3 || e === 4 || e === 6;
}
function G0(e) {
	return e.charCodeAt(0) === 64;
}
function Ba(e, t) {
	if (!(t === null || t.length === 0))
		if (e === null || e.length === 0) e = t.slice();
		else {
			let n = -1;
			for (let a = 0; a < t.length; a++) {
				let o = t[a];
				typeof o == 'number'
					? (n = o)
					: n === 0 || (n === -1 || n === 2 ? bs(e, n, o, null, t[++a]) : bs(e, n, o, null, null));
			}
		}
	return e;
}
function bs(e, t, n, a, o) {
	let r = 0,
		i = e.length;
	if (t === -1) i = -1;
	else
		for (; r < e.length; ) {
			let s = e[r++];
			if (typeof s == 'number') {
				if (s === t) {
					i = -1;
					break;
				} else if (s > t) {
					i = r - 1;
					break;
				}
			}
		}
	for (; r < e.length; ) {
		let s = e[r];
		if (typeof s == 'number') break;
		if (s === n) {
			o !== null && (e[r + 1] = o);
			return;
		}
		(r++, o !== null && r++);
	}
	(i !== -1 && (e.splice(i, 0, t), (r = i + 1)), e.splice(r++, 0, n), o !== null && e.splice(r++, 0, o));
}
function Ys(e) {
	return e !== bt;
}
function Da(e) {
	return e & 32767;
}
function W0(e) {
	return e >> 16;
}
function Aa(e, t) {
	let n = W0(e),
		a = t;
	for (; n > 0; ) ((a = a[Ze]), n--);
	return a;
}
var Nr = !0;
function Ss(e) {
	let t = Nr;
	return ((Nr = e), t);
}
var $0 = 256,
	Js = $0 - 1,
	ec = 5,
	Z0 = 0,
	ke = {};
function Q0(e, t, n) {
	let a;
	(typeof n == 'string' ? (a = n.charCodeAt(0) || 0) : n.hasOwnProperty(Ue) && (a = n[Ue]),
		a == null && (a = n[Ue] = Z0++));
	let o = a & Js,
		r = 1 << o;
	t.data[e + (o >> ec)] |= r;
}
function tc(e, t) {
	let n = nc(e, t);
	if (n !== -1) return n;
	let a = t[k];
	a.firstCreatePass && ((e.injectorIndex = t.length), Dr(a.data, e), Dr(t, null), Dr(a.blueprint, null));
	let o = n1(e, t),
		r = e.injectorIndex;
	if (Ys(o)) {
		let i = Da(o),
			s = Aa(o, t),
			c = s[k].data;
		for (let d = 0; d < 8; d++) t[r + d] = s[i + d] | c[i + d];
	}
	return ((t[r + 8] = o), r);
}
function Dr(e, t) {
	e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function nc(e, t) {
	return e.injectorIndex === -1 ||
		(e.parent && e.parent.injectorIndex === e.injectorIndex) ||
		t[e.injectorIndex + 8] === null
		? -1
		: e.injectorIndex;
}
function n1(e, t) {
	if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
	let n = 0,
		a = null,
		o = t;
	for (; o !== null; ) {
		if (((a = sc(o)), a === null)) return bt;
		if ((n++, (o = o[Ze]), a.injectorIndex !== -1)) return a.injectorIndex | (n << 16);
	}
	return bt;
}
function X0(e, t, n) {
	Q0(e, t, n);
}
function ac(e, t, n) {
	if (n & 8 || e !== void 0) return e;
	oa(t, 'NodeInjector');
}
function oc(e, t, n, a) {
	if ((n & 8 && a === void 0 && (a = null), (n & 3) === 0)) {
		let o = e[Ee],
			r = $(void 0);
		try {
			return o ? o.get(t, a, n & 8) : Go(t, a, n & 8);
		} finally {
			$(r);
		}
	}
	return ac(a, t, n);
}
function rc(e, t, n, a = 0, o) {
	if (e !== null) {
		if (t[M] & 2048 && !(a & 2)) {
			let i = nl(e, t, n, a, ke);
			if (i !== ke) return i;
		}
		let r = ic(e, t, n, a, ke);
		if (r !== ke) return r;
	}
	return oc(t, n, a, o);
}
function ic(e, t, n, a, o) {
	let r = J0(n);
	if (typeof r == 'function') {
		if (!mr(t, e, a)) return a & 1 ? ac(o, n, a) : oc(t, n, a, o);
		try {
			let i;
			if (((i = r(a)), i == null && !(a & 8))) oa(n);
			else return i;
		} finally {
			Mr();
		}
	} else if (typeof r == 'number') {
		let i = null,
			s = nc(e, t),
			c = bt,
			d = a & 1 ? t[B][z] : null;
		for (
			(s === -1 || a & 4) &&
			((c = s === -1 ? n1(e, t) : t[s + 8]),
			c === bt || !As(a, !1) ? (s = -1) : ((i = t[k]), (s = Da(c)), (t = Aa(c, t))));
			s !== -1;
		) {
			let l = t[k];
			if (Ds(r, s, l.data)) {
				let u = K0(s, t, n, i, a, d);
				if (u !== ke) return u;
			}
			((c = t[s + 8]),
				c !== bt && As(a, t[k].data[s + 8] === d) && Ds(r, s, t)
					? ((i = l), (s = Da(c)), (t = Aa(c, t)))
					: (s = -1));
		}
	}
	return o;
}
function K0(e, t, n, a, o, r) {
	let i = t[k],
		s = i.data[e + 8],
		c = a == null ? Je(s) && Nr : a != i && (s.type & 3) !== 0,
		d = o & 1 && r === s,
		l = Y0(s, i, n, c, d);
	return l !== null ? _r(t, i, l, s, o) : ke;
}
function Y0(e, t, n, a, o) {
	let r = e.providerIndexes,
		i = t.data,
		s = r & 1048575,
		c = e.directiveStart,
		d = e.directiveEnd,
		l = r >> 20,
		u = a ? s : s + l,
		p = o ? s + l : d;
	for (let h = u; h < p; h++) {
		let y = i[h];
		if ((h < c && n === y) || (h >= c && y.type === n)) return h;
	}
	if (o) {
		let h = i[c];
		if (h && et(h) && h.type === n) return c;
	}
	return null;
}
function _r(e, t, n, a, o) {
	let r = e[n],
		i = t.data;
	if (r instanceof sn) {
		let s = r;
		if (s.resolving) {
			let h = Ri(i[n]);
			throw Uo(h);
		}
		let c = Ss(s.canSeeViewProviders);
		s.resolving = !0;
		let d = i[n].type || i[n],
			l,
			u = s.injectImpl ? $(s.injectImpl) : null,
			p = mr(e, a, 0);
		try {
			((r = e[n] = s.factory(void 0, o, i, e, a)), t.firstCreatePass && n >= a.directiveStart && F0(n, i[n], t));
		} finally {
			(u !== null && $(u), Ss(c), (s.resolving = !1), Mr());
		}
	}
	return r;
}
function J0(e) {
	if (typeof e == 'string') return e.charCodeAt(0) || 0;
	let t = e.hasOwnProperty(Ue) ? e[Ue] : void 0;
	return typeof t == 'number' ? (t >= 0 ? t & Js : el) : t;
}
function Ds(e, t, n) {
	let a = 1 << e;
	return !!(n[t + (e >> ec)] & a);
}
function As(e, t) {
	return !(e & 2) && !(e & 1 && t);
}
var ot = class {
	_tNode;
	_lView;
	constructor(t, n) {
		((this._tNode = t), (this._lView = n));
	}
	get(t, n, a) {
		return rc(this._tNode, this._lView, t, qe(a), n);
	}
};
function el() {
	return new ot(fe(), I());
}
function tl(e) {
	return Pt(() => {
		let t = e.prototype.constructor,
			n = t[Bt] || Hr(t),
			a = Object.prototype,
			o = Object.getPrototypeOf(e.prototype).constructor;
		for (; o && o !== a; ) {
			let r = o[Bt] || Hr(o);
			if (r && r !== n) return r;
			o = Object.getPrototypeOf(o);
		}
		return (r) => new r();
	});
}
function Hr(e) {
	return Ho(e)
		? () => {
				let t = Hr(G(e));
				return t && t();
			}
		: Ve(e);
}
function nl(e, t, n, a, o) {
	let r = e,
		i = t;
	for (; r !== null && i !== null && i[M] & 2048 && !xt(i); ) {
		let s = ic(r, i, n, a | 2, ke);
		if (s !== ke) return s;
		let c = r.parent;
		if (!c) {
			let d = i[Jo];
			if (d) {
				let l = d.get(n, ke, a);
				if (l !== ke) return l;
			}
			((c = sc(i)), (i = i[Ze]));
		}
		r = c;
	}
	return o;
}
function sc(e) {
	let t = e[k],
		n = t.type;
	return n === 2 ? t.declTNode : n === 1 ? e[z] : null;
}
function al() {
	return a1(fe(), I());
}
function a1(e, t) {
	return new Ua(Ie(e, t));
}
var Ua = (() => {
	class e {
		nativeElement;
		constructor(n) {
			this.nativeElement = n;
		}
		static __NG_ELEMENT_ID__ = al;
	}
	return e;
})();
function cc(e) {
	return (e.flags & 128) === 128;
}
var o1 = (function (e) {
		return ((e[(e.OnPush = 0)] = 'OnPush'), (e[(e.Default = 1)] = 'Default'), e);
	})(o1 || {}),
	dc = new Map(),
	ol = 0;
function rl() {
	return ol++;
}
function il(e) {
	dc.set(e[ve], e);
}
function Or(e) {
	dc.delete(e[ve]);
}
var Es = '__ngContext__';
function St(e, t) {
	pe(t) ? ((e[Es] = t[ve]), il(t)) : (e[Es] = t);
}
function lc(e) {
	return hc(e[It]);
}
function uc(e) {
	return hc(e[ee]);
}
function hc(e) {
	for (; e !== null && !re(e); ) e = e[ee];
	return e;
}
var sl;
function cl(e) {
	sl = e;
}
var dl = new b('', { factory: () => ll }),
	ll = 'ng';
var pc = new b(''),
	ul = new b('', { providedIn: 'platform', factory: () => 'unknown' });
var hl = new b('', { factory: () => x(Ia).body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') || null });
var yc = 'r';
var fc = 'di';
var kc = !1,
	gc = new b('', { factory: () => kc });
function Ga(e) {
	return (e.flags & 32) === 32;
}
var pl = () => null;
function mc(e, t, n = !1) {
	return pl(e, t, n);
}
function Mc(e, t) {
	let n = e.contentQueries;
	if (n !== null) {
		let a = f(null);
		try {
			for (let o = 0; o < n.length; o += 2) {
				let r = n[o],
					i = n[o + 1];
				if (i !== -1) {
					let s = e.data[i];
					(gr(r), s.contentQueries(2, t[i], i));
				}
			}
		} finally {
			f(a);
		}
	}
}
function Fr(e, t, n) {
	gr(0);
	let a = f(null);
	try {
		t(e, n);
	} finally {
		f(a);
	}
}
function vc(e, t, n) {
	if (tr(t)) {
		let a = f(null);
		try {
			let o = t.directiveStart,
				r = t.directiveEnd;
			for (let i = o; i < r; i++) {
				let s = e.data[i];
				if (s.contentQueries) {
					let c = n[i];
					s.contentQueries(1, c, i);
				}
			}
		} finally {
			f(a);
		}
	}
}
var rt = (function (e) {
	return (
		(e[(e.Emulated = 0)] = 'Emulated'),
		(e[(e.None = 2)] = 'None'),
		(e[(e.ShadowDom = 3)] = 'ShadowDom'),
		(e[(e.ExperimentalIsolatedShadowDom = 4)] = 'ExperimentalIsolatedShadowDom'),
		e
	);
})(rt || {});
var Ea = class {
	changingThisBreaksApplicationSecurity;
	constructor(t) {
		this.changingThisBreaksApplicationSecurity = t;
	}
	toString() {
		return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Yn})`;
	}
};
function r1(e) {
	return e instanceof Ea ? e.changingThisBreaksApplicationSecurity : e;
}
function Ic(e, t) {
	let n = xc(e);
	if (n != null && n !== t) {
		if (n === 'ResourceURL' && t === 'URL') return !0;
		throw new Error(`Required a safe ${t}, got a ${n} (see ${Yn})`);
	}
	return n === t;
}
function xc(e) {
	return (e instanceof Ea && e.getTypeName()) || null;
}
var yl = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function wc(e) {
	return ((e = String(e)), e.match(yl) ? e : 'unsafe:' + e);
}
function fl(e, t) {
	return e.createText(t);
}
function kl(e, t, n) {
	e.setValue(t, n);
}
function Cc(e, t, n) {
	return e.createElement(t, n);
}
function Ta(e, t, n, a, o) {
	e.insertBefore(t, n, a, o);
}
function Lc(e, t, n) {
	e.appendChild(t, n);
}
function Ts(e, t, n, a, o) {
	a !== null ? Ta(e, t, n, a, o) : Lc(e, t, n);
}
function bc(e, t, n, a) {
	e.removeChild(null, t, n, a);
}
function gl(e, t, n) {
	e.setAttribute(t, 'style', n);
}
function ml(e, t, n) {
	n === '' ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n);
}
function Sc(e, t, n) {
	let { mergedAttrs: a, classes: o, styles: r } = n;
	(a !== null && B0(e, t, a), o !== null && ml(e, t, o), r !== null && gl(e, t, r));
}
var i1 = (function (e) {
	return (
		(e[(e.NONE = 0)] = 'NONE'),
		(e[(e.HTML = 1)] = 'HTML'),
		(e[(e.STYLE = 2)] = 'STYLE'),
		(e[(e.SCRIPT = 3)] = 'SCRIPT'),
		(e[(e.URL = 4)] = 'URL'),
		(e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
		e
	);
})(i1 || {});
function Ml(e) {
	let t = vl();
	return t ? t.sanitize(i1.URL, e) || '' : Ic(e, 'URL') ? r1(e) : wc(Ge(e));
}
function vl() {
	let e = I();
	return e && e[he].sanitizer;
}
function Dc(e) {
	return e instanceof Function ? e() : e;
}
function Il(e, t, n) {
	let a = e.length;
	for (;;) {
		let o = e.indexOf(t, n);
		if (o === -1) return o;
		if (o === 0 || e.charCodeAt(o - 1) <= 32) {
			let r = t.length;
			if (o + r === a || e.charCodeAt(o + r) <= 32) return o;
		}
		n = o + 1;
	}
}
var Ac = 'ng-template';
function xl(e, t, n, a) {
	let o = 0;
	if (a) {
		for (; o < t.length && typeof t[o] == 'string'; o += 2)
			if (t[o] === 'class' && Il(t[o + 1].toLowerCase(), n, 0) !== -1) return !0;
	} else if (s1(e)) return !1;
	if (((o = t.indexOf(1, o)), o > -1)) {
		let r;
		for (; ++o < t.length && typeof (r = t[o]) == 'string'; ) if (r.toLowerCase() === n) return !0;
	}
	return !1;
}
function s1(e) {
	return e.type === 4 && e.value !== Ac;
}
function wl(e, t, n) {
	let a = e.type === 4 && !n ? Ac : e.value;
	return t === a;
}
function Cl(e, t, n) {
	let a = 4,
		o = e.attrs,
		r = o !== null ? Sl(o) : 0,
		i = !1;
	for (let s = 0; s < t.length; s++) {
		let c = t[s];
		if (typeof c == 'number') {
			if (!i && !ce(a) && !ce(c)) return !1;
			if (i && ce(c)) continue;
			((i = !1), (a = c | (a & 1)));
			continue;
		}
		if (!i)
			if (a & 4) {
				if (((a = 2 | (a & 1)), (c !== '' && !wl(e, c, n)) || (c === '' && t.length === 1))) {
					if (ce(a)) return !1;
					i = !0;
				}
			} else if (a & 8) {
				if (o === null || !xl(e, o, c, n)) {
					if (ce(a)) return !1;
					i = !0;
				}
			} else {
				let d = t[++s],
					l = Ll(c, o, s1(e), n);
				if (l === -1) {
					if (ce(a)) return !1;
					i = !0;
					continue;
				}
				if (d !== '') {
					let u;
					if ((l > r ? (u = '') : (u = o[l + 1].toLowerCase()), a & 2 && d !== u)) {
						if (ce(a)) return !1;
						i = !0;
					}
				}
			}
	}
	return ce(a) || i;
}
function ce(e) {
	return (e & 1) === 0;
}
function Ll(e, t, n, a) {
	if (t === null) return -1;
	let o = 0;
	if (a || !n) {
		let r = !1;
		for (; o < t.length; ) {
			let i = t[o];
			if (i === e) return o;
			if (i === 3 || i === 6) r = !0;
			else if (i === 1 || i === 2) {
				let s = t[++o];
				for (; typeof s == 'string'; ) s = t[++o];
				continue;
			} else {
				if (i === 4) break;
				if (i === 0) {
					o += 4;
					continue;
				}
			}
			o += r ? 1 : 2;
		}
		return -1;
	} else return Dl(t, e);
}
function Ec(e, t, n = !1) {
	for (let a = 0; a < t.length; a++) if (Cl(e, t[a], n)) return !0;
	return !1;
}
function bl(e) {
	let t = e.attrs;
	if (t != null) {
		let n = t.indexOf(5);
		if ((n & 1) === 0) return t[n + 1];
	}
	return null;
}
function Sl(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (U0(n)) return t;
	}
	return e.length;
}
function Dl(e, t) {
	let n = e.indexOf(4);
	if (n > -1)
		for (n++; n < e.length; ) {
			let a = e[n];
			if (typeof a == 'number') return -1;
			if (a === t) return n;
			n++;
		}
	return -1;
}
function Al(e, t) {
	e: for (let n = 0; n < t.length; n++) {
		let a = t[n];
		if (e.length === a.length) {
			for (let o = 0; o < e.length; o++) if (e[o] !== a[o]) continue e;
			return !0;
		}
	}
	return !1;
}
function Ps(e, t) {
	return e ? ':not(' + t.trim() + ')' : t;
}
function El(e) {
	let t = e[0],
		n = 1,
		a = 2,
		o = '',
		r = !1;
	for (; n < e.length; ) {
		let i = e[n];
		if (typeof i == 'string')
			if (a & 2) {
				let s = e[++n];
				o += '[' + i + (s.length > 0 ? '="' + s + '"' : '') + ']';
			} else a & 8 ? (o += '.' + i) : a & 4 && (o += ' ' + i);
		else (o !== '' && !ce(i) && ((t += Ps(r, o)), (o = '')), (a = i), (r = r || !ce(a)));
		n++;
	}
	return (o !== '' && (t += Ps(r, o)), t);
}
function Tl(e) {
	return e.map(El).join(',');
}
function Pl(e) {
	let t = [],
		n = [],
		a = 1,
		o = 2;
	for (; a < e.length; ) {
		let r = e[a];
		if (typeof r == 'string') o === 2 ? r !== '' && t.push(r, e[++a]) : o === 8 && n.push(r);
		else {
			if (!ce(o)) break;
			o = r;
		}
		a++;
	}
	return (n.length && t.push(1, ...n), t);
}
var te = {};
function c1(e, t, n, a, o, r, i, s, c, d, l) {
	let u = N + a,
		p = u + o,
		h = Rl(u, p),
		y = typeof d == 'function' ? d() : d;
	return (h[k] = {
		type: e,
		blueprint: h,
		template: n,
		queries: null,
		viewQuery: s,
		declTNode: t,
		data: h.slice().fill(null, u),
		bindingStartIndex: u,
		expandoStartIndex: p,
		hostBindingOpCodes: null,
		firstCreatePass: !0,
		firstUpdatePass: !0,
		staticViewQueries: !1,
		staticContentQueries: !1,
		preOrderHooks: null,
		preOrderCheckHooks: null,
		contentHooks: null,
		contentCheckHooks: null,
		viewHooks: null,
		viewCheckHooks: null,
		destroyHooks: null,
		cleanup: null,
		contentQueries: null,
		components: null,
		directiveRegistry: typeof r == 'function' ? r() : r,
		pipeRegistry: typeof i == 'function' ? i() : i,
		firstChild: null,
		schemas: c,
		consts: y,
		incompleteFirstPass: !1,
		ssrId: l,
	});
}
function Rl(e, t) {
	let n = [];
	for (let a = 0; a < t; a++) n.push(a < e ? null : te);
	return n;
}
function Nl(e) {
	let t = e.tView;
	return t === null || t.incompleteFirstPass
		? (e.tView = c1(
				1,
				null,
				e.template,
				e.decls,
				e.vars,
				e.directiveDefs,
				e.pipeDefs,
				e.viewQuery,
				e.schemas,
				e.consts,
				e.id,
			))
		: t;
}
function d1(e, t, n, a, o, r, i, s, c, d, l) {
	let u = t.blueprint.slice();
	return (
		(u[oe] = o),
		(u[M] = a | 4 | 128 | 8 | 64 | 1024),
		(d !== null || (e && e[M] & 2048)) && (u[M] |= 2048),
		or(u),
		(u[F] = u[Ze] = e),
		(u[H] = n),
		(u[he] = i || (e && e[he])),
		(u[R] = s || (e && e[R])),
		(u[Ee] = c || (e && e[Ee]) || null),
		(u[z] = r),
		(u[ve] = rl()),
		(u[$e] = l),
		(u[Jo] = d),
		(u[B] = t.type == 2 ? e[B] : u),
		u
	);
}
function _l(e, t, n) {
	let a = Ie(t, e),
		o = Nl(n),
		r = e[he].rendererFactory,
		i = l1(e, d1(e, o, null, Tc(n), a, t, null, r.createRenderer(a, n), null, null, null));
	return (e[t.index] = i);
}
function Tc(e) {
	let t = 16;
	return (e.signals ? (t = 4096) : e.onPush && (t = 64), t);
}
function Pc(e, t, n, a) {
	if (n === 0) return -1;
	let o = t.length;
	for (let r = 0; r < n; r++) (t.push(a), e.blueprint.push(a), e.data.push(null));
	return o;
}
function l1(e, t) {
	return (e[It] ? (e[Yo][ee] = t) : (e[It] = t), (e[Yo] = t), t);
}
function Hl(e = 1) {
	Rc(Q(), I(), xe() + e, !1);
}
function Rc(e, t, n, a) {
	if (!a)
		if ((t[M] & 3) === 3) {
			let r = e.preOrderCheckHooks;
			r !== null && Ca(t, r, n);
		} else {
			let r = e.preOrderHooks;
			r !== null && La(t, r, 0, n);
		}
	Pe(n);
}
var Wa = (function (e) {
	return (
		(e[(e.None = 0)] = 'None'),
		(e[(e.SignalBased = 1)] = 'SignalBased'),
		(e[(e.HasDecoratorInputTransform = 2)] = 'HasDecoratorInputTransform'),
		e
	);
})(Wa || {});
function jr(e, t, n, a) {
	let o = f(null);
	try {
		let [r, i, s] = e.inputs[n],
			c = null;
		((i & Wa.SignalBased) !== 0 && (c = t[r][Y]),
			c !== null && c.transformFn !== void 0 ? (a = c.transformFn(a)) : s !== null && (a = s.call(t, a)),
			e.setInput !== null ? e.setInput(t, c, a, n, r) : $s(t, c, r, a));
	} finally {
		f(o);
	}
}
var Pa = (function (e) {
		return ((e[(e.Important = 1)] = 'Important'), (e[(e.DashCase = 2)] = 'DashCase'), e);
	})(Pa || {}),
	Ol;
function u1(e, t) {
	return Ol(e, t);
}
var cn = new Set(),
	h1 = (function (e) {
		return (
			(e[(e.CHANGE_DETECTION = 0)] = 'CHANGE_DETECTION'),
			(e[(e.AFTER_NEXT_RENDER = 1)] = 'AFTER_NEXT_RENDER'),
			e
		);
	})(h1 || {}),
	p1 = new b(''),
	Rs = new Set();
function ct(e) {
	Rs.has(e) || (Rs.add(e), performance?.mark?.('mark_feature_usage', { detail: { feature: e } }));
}
var Nc = (() => {
	class e {
		impl = null;
		execute() {
			this.impl?.execute();
		}
		static ɵprov = q({ token: e, providedIn: 'root', factory: () => new e() });
	}
	return e;
})();
var _c = new b('', { factory: () => ({ queue: new Set(), isScheduled: !1, scheduler: null, injector: x(J) }) });
function Hc(e, t, n) {
	let a = e.get(_c);
	if (Array.isArray(t)) for (let o of t) (a.queue.add(o), n?.detachedLeaveAnimationFns?.push(o));
	else (a.queue.add(t), n?.detachedLeaveAnimationFns?.push(t));
	a.scheduler && a.scheduler(e);
}
function Fl(e, t) {
	let n = e.get(_c);
	if (t.detachedLeaveAnimationFns) {
		for (let a of t.detachedLeaveAnimationFns) n.queue.delete(a);
		t.detachedLeaveAnimationFns = void 0;
	}
}
function jl(e, t) {
	for (let [n, a] of t) Hc(e, a.animateFns);
}
function Ns(e, t, n, a) {
	let o = e?.[Ye]?.enter;
	t !== null && o && o.has(n.index) && jl(a, o);
}
function Lt(e, t, n, a, o, r, i, s) {
	if (o != null) {
		let c,
			d = !1;
		re(o) ? (c = o) : pe(o) && ((d = !0), (o = o[oe]));
		let l = ie(o);
		(e === 0 && a !== null
			? (Ns(s, a, r, n), i == null ? Lc(t, a, l) : Ta(t, a, l, i || null, !0))
			: e === 1 && a !== null
				? (Ns(s, a, r, n), Ta(t, a, l, i || null, !0))
				: e === 2
					? _s(s, r, n, (u) => {
							bc(t, l, d, u);
						})
					: e === 3 &&
						_s(s, r, n, () => {
							t.destroyNode(l);
						}),
			c != null && Xl(t, e, n, c, r, a, i));
	}
}
function ql(e, t) {
	(Oc(e, t), (t[oe] = null), (t[z] = null));
}
function Vl(e, t, n, a, o, r) {
	((a[oe] = o), (a[z] = t), Za(e, a, n, 1, o, r));
}
function Oc(e, t) {
	(t[he].changeDetectionScheduler?.notify(9), Za(e, t, t[R], 2, null, null));
}
function zl(e) {
	let t = e[It];
	if (!t) return Ar(e[k], e);
	for (; t; ) {
		let n = null;
		if (pe(t)) n = t[It];
		else {
			let a = t[_];
			a && (n = a);
		}
		if (!n) {
			for (; t && !t[ee] && t !== e; ) (pe(t) && Ar(t[k], t), (t = t[F]));
			(t === null && (t = e), pe(t) && Ar(t[k], t), (n = t && t[ee]));
		}
		t = n;
	}
}
function y1(e, t) {
	let n = e[Yt],
		a = n.indexOf(t);
	n.splice(a, 1);
}
function $a(e, t) {
	if (tt(t)) return;
	let n = t[R];
	(n.destroyNode && Za(e, t, n, 3, null, null), zl(t));
}
function Ar(e, t) {
	if (tt(t)) return;
	let n = f(null);
	try {
		((t[M] &= -129), (t[M] |= 256), t[Z] && _t(t[Z]), Gl(e, t), Ul(e, t), t[k].type === 1 && t[R].destroy());
		let a = t[Qe];
		if (a !== null && re(t[F])) {
			a !== t[F] && y1(a, t);
			let o = t[Ke];
			o !== null && o.detachView(e);
		}
		Or(t);
	} finally {
		f(n);
	}
}
function _s(e, t, n, a) {
	let o = e?.[Ye];
	if (o == null || o.leave == null || !o.leave.has(t.index)) return a(!1);
	(e && cn.add(e[ve]),
		Hc(
			n,
			() => {
				if (o.leave && o.leave.has(t.index)) {
					let i = o.leave.get(t.index),
						s = [];
					if (i) {
						for (let c = 0; c < i.animateFns.length; c++) {
							let d = i.animateFns[c],
								{ promise: l } = d();
							s.push(l);
						}
						o.detachedLeaveAnimationFns = void 0;
					}
					((o.running = Promise.allSettled(s)), Bl(e, a));
				} else (e && cn.delete(e[ve]), a(!1));
			},
			o,
		));
}
function Bl(e, t) {
	let n = e[Ye]?.running;
	if (n) {
		n.then(() => {
			((e[Ye].running = void 0), cn.delete(e[ve]), t(!0));
		});
		return;
	}
	t(!1);
}
function Ul(e, t) {
	let n = e.cleanup,
		a = t[la];
	if (n !== null)
		for (let i = 0; i < n.length - 1; i += 2)
			if (typeof n[i] == 'string') {
				let s = n[i + 3];
				(s >= 0 ? a[s]() : a[-s].unsubscribe(), (i += 2));
			} else {
				let s = a[n[i + 1]];
				n[i].call(s);
			}
	a !== null && (t[la] = null);
	let o = t[me];
	if (o !== null) {
		t[me] = null;
		for (let i = 0; i < o.length; i++) {
			let s = o[i];
			s();
		}
	}
	let r = t[Xt];
	if (r !== null) {
		t[Xt] = null;
		for (let i of r) i.destroy();
	}
}
function Gl(e, t) {
	let n;
	if (e != null && (n = e.destroyHooks) != null)
		for (let a = 0; a < n.length; a += 2) {
			let o = t[n[a]];
			if (!(o instanceof sn)) {
				let r = n[a + 1];
				if (Array.isArray(r))
					for (let i = 0; i < r.length; i += 2) {
						let s = o[r[i]],
							c = r[i + 1];
						P(A.LifecycleHookStart, s, c);
						try {
							c.call(s);
						} finally {
							P(A.LifecycleHookEnd, s, c);
						}
					}
				else {
					P(A.LifecycleHookStart, o, r);
					try {
						r.call(o);
					} finally {
						P(A.LifecycleHookEnd, o, r);
					}
				}
			}
		}
}
function Fc(e, t, n) {
	return Wl(e, t.parent, n);
}
function Wl(e, t, n) {
	let a = t;
	for (; a !== null && a.type & 168; ) ((t = a), (a = t.parent));
	if (a === null) return n[oe];
	if (Je(a)) {
		let { encapsulation: o } = e.data[a.directiveStart + a.componentOffset];
		if (o === rt.None || o === rt.Emulated) return null;
	}
	return Ie(a, n);
}
function jc(e, t, n) {
	return Zl(e, t, n);
}
function $l(e, t, n) {
	return e.type & 40 ? Ie(e, n) : null;
}
var Zl = $l,
	Hs;
function f1(e, t, n, a) {
	let o = Fc(e, a, t),
		r = t[R],
		i = a.parent || t[z],
		s = jc(i, a, t);
	if (o != null)
		if (Array.isArray(n)) for (let c = 0; c < n.length; c++) Ts(r, o, n[c], s, !1);
		else Ts(r, o, n, s, !1);
	Hs !== void 0 && Hs(r, a, t, n, o);
}
function on(e, t) {
	if (t !== null) {
		let n = t.type;
		if (n & 3) return Ie(t, e);
		if (n & 4) return qr(-1, e[t.index]);
		if (n & 8) {
			let a = t.child;
			if (a !== null) return on(e, a);
			{
				let o = e[t.index];
				return re(o) ? qr(-1, o) : ie(o);
			}
		} else {
			if (n & 128) return on(e, t.next);
			if (n & 32) return u1(t, e)() || ie(e[t.index]);
			{
				let a = qc(e, t);
				if (a !== null) {
					if (Array.isArray(a)) return a[0];
					let o = De(e[B]);
					return on(o, a);
				} else return on(e, t.next);
			}
		}
	}
	return null;
}
function qc(e, t) {
	if (t !== null) {
		let a = e[B][z],
			o = t.projection;
		return a.projection[o];
	}
	return null;
}
function qr(e, t) {
	let n = _ + e + 1;
	if (n < t.length) {
		let a = t[n],
			o = a[k].firstChild;
		if (o !== null) return on(a, o);
	}
	return t[Te];
}
function k1(e, t, n, a, o, r, i) {
	for (; n != null; ) {
		let s = a[Ee];
		if (n.type === 128) {
			n = n.next;
			continue;
		}
		let c = a[n.index],
			d = n.type;
		if ((i && t === 0 && (c && St(ie(c), a), (n.flags |= 2)), !Ga(n)))
			if (d & 8) (k1(e, t, n.child, a, o, r, !1), Lt(t, e, s, o, c, n, r, a));
			else if (d & 32) {
				let l = u1(n, a),
					u;
				for (; (u = l()); ) Lt(t, e, s, o, u, n, r, a);
				Lt(t, e, s, o, c, n, r, a);
			} else d & 16 ? Vc(e, t, a, n, o, r) : Lt(t, e, s, o, c, n, r, a);
		n = i ? n.projectionNext : n.next;
	}
}
function Za(e, t, n, a, o, r) {
	k1(n, a, e.firstChild, t, o, r, !1);
}
function Ql(e, t, n) {
	let a = t[R],
		o = Fc(e, n, t),
		r = n.parent || t[z],
		i = jc(r, n, t);
	Vc(a, 0, t, n, o, i);
}
function Vc(e, t, n, a, o, r) {
	let i = n[B],
		c = i[z].projection[a.projection];
	if (Array.isArray(c))
		for (let d = 0; d < c.length; d++) {
			let l = c[d];
			Lt(t, e, n[Ee], o, l, a, r, n);
		}
	else {
		let d = c,
			l = i[F];
		(cc(a) && (d.flags |= 128), k1(e, t, d, l, o, r, !0));
	}
}
function Xl(e, t, n, a, o, r, i) {
	let s = a[Te],
		c = ie(a);
	s !== c && Lt(t, e, n, r, s, o, i);
	for (let d = _; d < a.length; d++) {
		let l = a[d];
		Za(l[k], l, e, t, r, s);
	}
}
function Kl(e, t, n, a, o) {
	if (t) o ? e.addClass(n, a) : e.removeClass(n, a);
	else {
		let r = a.indexOf('-') === -1 ? void 0 : Pa.DashCase;
		o == null
			? e.removeStyle(n, a, r)
			: (typeof o == 'string' && o.endsWith('!important') && ((o = o.slice(0, -10)), (r |= Pa.Important)),
				e.setStyle(n, a, o, r));
	}
}
function zc(e, t, n, a, o) {
	let r = xe(),
		i = a & 2;
	try {
		(Pe(-1), i && t.length > N && Rc(e, t, N, !1));
		let s = i ? A.TemplateUpdateStart : A.TemplateCreateStart;
		(P(s, o, n), n(a, o));
	} finally {
		Pe(r);
		let s = i ? A.TemplateUpdateEnd : A.TemplateCreateEnd;
		P(s, o, n);
	}
}
function Bc(e, t, n) {
	(ou(e, t, n), (n.flags & 64) === 64 && ru(e, t, n));
}
function g1(e, t, n = Ie) {
	let a = t.localNames;
	if (a !== null) {
		let o = t.index + 1;
		for (let r = 0; r < a.length; r += 2) {
			let i = a[r + 1],
				s = i === -1 ? n(t, e) : e[i];
			e[o++] = s;
		}
	}
}
function Yl(e, t, n, a) {
	let r = a.get(gc, kc) || n === rt.ShadowDom || n === rt.ExperimentalIsolatedShadowDom,
		i = e.selectRootElement(t, r);
	return (Jl(i), i);
}
function Jl(e) {
	eu(e);
}
var eu = () => null;
function tu(e) {
	return e === 'class'
		? 'className'
		: e === 'for'
			? 'htmlFor'
			: e === 'formaction'
				? 'formAction'
				: e === 'innerHtml'
					? 'innerHTML'
					: e === 'readonly'
						? 'readOnly'
						: e === 'tabindex'
							? 'tabIndex'
							: e;
}
function nu(e, t, n, a, o, r) {
	let i = t[k];
	if (m1(e, i, t, n, a)) {
		Je(e) && au(t, e.index);
		return;
	}
	(e.type & 3 && (n = tu(n)), Uc(e, t, n, a, o, r));
}
function Uc(e, t, n, a, o, r) {
	if (e.type & 3) {
		let i = Ie(e, t);
		((a = r != null ? r(a, e.value || '', n) : a), o.setProperty(i, n, a));
	} else e.type & 12;
}
function au(e, t) {
	let n = se(t, e);
	n[M] & 16 || (n[M] |= 64);
}
function ou(e, t, n) {
	let a = n.directiveStart,
		o = n.directiveEnd;
	(Je(n) && _l(t, n, e.data[a + n.componentOffset]), e.firstCreatePass || tc(n, t));
	let r = n.initialInputs;
	for (let i = a; i < o; i++) {
		let s = e.data[i],
			c = _r(t, e, i, n);
		if ((St(c, t), r !== null && cu(t, i - a, c, s, n, r), et(s))) {
			let d = se(n.index, t);
			d[H] = _r(t, e, i, n);
		}
	}
}
function ru(e, t, n) {
	let a = n.directiveStart,
		o = n.directiveEnd,
		r = n.index,
		i = cs();
	try {
		Pe(r);
		for (let s = a; s < o; s++) {
			let c = e.data[s],
				d = t[s];
			(ka(s), (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) && iu(c, d));
		}
	} finally {
		(Pe(-1), ka(i));
	}
}
function iu(e, t) {
	e.hostBindings !== null && e.hostBindings(1, t);
}
function su(e, t) {
	let n = e.directiveRegistry,
		a = null;
	if (n)
		for (let o = 0; o < n.length; o++) {
			let r = n[o];
			Ec(t, r.selectors, !1) && ((a ??= []), et(r) ? a.unshift(r) : a.push(r));
		}
	return a;
}
function cu(e, t, n, a, o, r) {
	let i = r[t];
	if (i !== null)
		for (let s = 0; s < i.length; s += 2) {
			let c = i[s],
				d = i[s + 1];
			jr(a, n, c, d);
		}
}
function Gc(e, t, n, a, o) {
	let r = N + n,
		i = t[k],
		s = o(i, t, e, a, n);
	((t[r] = s), nt(e, !0));
	let c = e.type === 2;
	return (
		c ? (Sc(t[R], s, e), (Ji() === 0 || nr(e)) && St(s, t), es()) : St(s, t),
		Ma() && (!c || !Ga(e)) && f1(i, t, s, e),
		e
	);
}
function Wc(e) {
	let t = e;
	return (hr() ? pr() : ((t = t.parent), nt(t, !1)), t);
}
function m1(e, t, n, a, o) {
	let r = e.inputs?.[a],
		i = e.hostDirectiveInputs?.[a],
		s = !1;
	if (i)
		for (let c = 0; c < i.length; c += 2) {
			let d = i[c],
				l = i[c + 1],
				u = t.data[d];
			(jr(u, n[d], l, o), (s = !0));
		}
	if (r)
		for (let c of r) {
			let d = n[c],
				l = t.data[c];
			(jr(l, d, a, o), (s = !0));
		}
	return s;
}
function du(e, t) {
	let n = se(t, e),
		a = n[k];
	lu(a, n);
	let o = n[oe];
	(o !== null && n[$e] === null && (n[$e] = mc(o, n[Ee])), P(A.ComponentStart));
	try {
		M1(a, n, n[H]);
	} finally {
		P(A.ComponentEnd, n[H]);
	}
}
function lu(e, t) {
	for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function M1(e, t, n) {
	ga(t);
	try {
		let a = e.viewQuery;
		a !== null && Fr(1, a, n);
		let o = e.template;
		(o !== null && zc(e, t, o, 1, n),
			e.firstCreatePass && (e.firstCreatePass = !1),
			t[Ke]?.finishViewCreation(e),
			e.staticContentQueries && Mc(e, t),
			e.staticViewQueries && Fr(2, e.viewQuery, n));
		let r = e.components;
		r !== null && uu(t, r);
	} catch (a) {
		throw (e.firstCreatePass && ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)), a);
	} finally {
		((t[M] &= -5), ma());
	}
}
function uu(e, t) {
	for (let n = 0; n < t.length; n++) du(e, t[n]);
}
function Qa(e, t, n, a) {
	let o = f(null);
	try {
		let r = t.tView,
			s = e[M] & 4096 ? 4096 : 16,
			c = d1(
				e,
				r,
				n,
				s,
				null,
				t,
				null,
				null,
				a?.injector ?? null,
				a?.embeddedViewInjector ?? null,
				a?.dehydratedView ?? null,
			),
			d = e[t.index];
		c[Qe] = d;
		let l = e[Ke];
		return (l !== null && (c[Ke] = l.createEmbeddedView(r)), M1(r, c, n), c);
	} finally {
		f(o);
	}
}
function Dt(e, t) {
	return !t || t.firstChild === null || cc(e);
}
function dn(e, t, n, a, o = !1) {
	for (; n !== null; ) {
		if (n.type === 128) {
			n = o ? n.projectionNext : n.next;
			continue;
		}
		let r = t[n.index];
		(r !== null && a.push(ie(r)), re(r) && $c(r, a));
		let i = n.type;
		if (i & 8) dn(e, t, n.child, a);
		else if (i & 32) {
			let s = u1(n, t),
				c;
			for (; (c = s()); ) a.push(c);
		} else if (i & 16) {
			let s = qc(t, n);
			if (Array.isArray(s)) a.push(...s);
			else {
				let c = De(t[B]);
				dn(c[k], c, s, a, !0);
			}
		}
		n = o ? n.projectionNext : n.next;
	}
	return a;
}
function $c(e, t) {
	for (let n = _; n < e.length; n++) {
		let a = e[n],
			o = a[k].firstChild;
		o !== null && dn(a[k], a, o, t);
	}
	e[Te] !== e[oe] && t.push(e[Te]);
}
function Zc(e) {
	if (e[ha] !== null) {
		for (let t of e[ha]) t.impl.addSequence(t);
		e[ha].length = 0;
	}
}
var Qc = [];
function hu(e) {
	return e[Z] ?? pu(e);
}
function pu(e) {
	let t = Qc.pop() ?? Object.create(fu);
	return ((t.lView = e), t);
}
function yu(e) {
	e.lView[Z] !== e && ((e.lView = null), Qc.push(e));
}
var fu = K(X({}, wn), {
	consumerIsAlwaysLive: !0,
	kind: 'template',
	consumerMarkedDirty: (e) => {
		tn(e.lView);
	},
	consumerOnSignalRead() {
		this.lView[Z] = this;
	},
});
function ku(e) {
	let t = e[Z] ?? Object.create(gu);
	return ((t.lView = e), t);
}
var gu = K(X({}, wn), {
	consumerIsAlwaysLive: !0,
	kind: 'template',
	consumerMarkedDirty: (e) => {
		let t = De(e.lView);
		for (; t && !Xc(t[k]); ) t = De(t);
		t && rr(t);
	},
	consumerOnSignalRead() {
		this.lView[Z] = this;
	},
});
function Xc(e) {
	return e.type !== 2;
}
function Kc(e) {
	if (e[Xt] === null) return;
	let t = !0;
	for (; t; ) {
		let n = !1;
		for (let a of e[Xt])
			a.dirty && ((n = !0), a.zone === null || Zone.current === a.zone ? a.run() : a.zone.run(() => a.run()));
		t = n && !!(e[M] & 8192);
	}
}
var mu = 100;
function Yc(e, t = 0) {
	let a = e[he].rendererFactory,
		o = !1;
	o || a.begin?.();
	try {
		Mu(e, t);
	} finally {
		o || a.end?.();
	}
}
function Mu(e, t) {
	let n = yr();
	try {
		(fr(!0), Vr(e, t));
		let a = 0;
		for (; en(e); ) {
			if (a === mu) throw new C(103, !1);
			(a++, Vr(e, 1));
		}
	} finally {
		fr(n);
	}
}
function vu(e, t, n, a) {
	if (tt(t)) return;
	let o = t[M],
		r = !1,
		i = !1;
	ga(t);
	let s = !0,
		c = null,
		d = null;
	r ||
		(Xc(e)
			? ((d = hu(t)), (c = Ln(d)))
			: xn() === null
				? ((s = !1), (d = ku(t)), (c = Ln(d)))
				: t[Z] && (_t(t[Z]), (t[Z] = null)));
	try {
		(or(t), rs(e.bindingStartIndex), n !== null && zc(e, t, n, 2, a));
		let l = (o & 3) === 3;
		if (!r)
			if (l) {
				let h = e.preOrderCheckHooks;
				h !== null && Ca(t, h, null);
			} else {
				let h = e.preOrderHooks;
				(h !== null && La(t, h, 0, null), Sr(t, 0));
			}
		if ((i || Iu(t), Kc(t), Jc(t, 0), e.contentQueries !== null && Mc(e, t), !r))
			if (l) {
				let h = e.contentCheckHooks;
				h !== null && Ca(t, h);
			} else {
				let h = e.contentHooks;
				(h !== null && La(t, h, 1), Sr(t, 1));
			}
		wu(e, t);
		let u = e.components;
		u !== null && t2(t, u, 0);
		let p = e.viewQuery;
		if ((p !== null && Fr(2, p, a), !r))
			if (l) {
				let h = e.viewCheckHooks;
				h !== null && Ca(t, h);
			} else {
				let h = e.viewHooks;
				(h !== null && La(t, h, 2), Sr(t, 2));
			}
		if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[ua])) {
			for (let h of t[ua]) h();
			t[ua] = null;
		}
		r || (Zc(t), (t[M] &= -73));
	} catch (l) {
		throw (r || tn(t), l);
	} finally {
		(d !== null && (oo(d, c), s && yu(d)), ma());
	}
}
function Jc(e, t) {
	for (let n = lc(e); n !== null; n = uc(n))
		for (let a = _; a < n.length; a++) {
			let o = n[a];
			e2(o, t);
		}
}
function Iu(e) {
	for (let t = lc(e); t !== null; t = uc(t)) {
		if (!(t[M] & 2)) continue;
		let n = t[Yt];
		for (let a = 0; a < n.length; a++) {
			let o = n[a];
			rr(o);
		}
	}
}
function xu(e, t, n) {
	P(A.ComponentStart);
	let a = se(t, e);
	try {
		e2(a, n);
	} finally {
		P(A.ComponentEnd, a[H]);
	}
}
function e2(e, t) {
	ya(e) && Vr(e, t);
}
function Vr(e, t) {
	let a = e[k],
		o = e[M],
		r = e[Z],
		i = !!(t === 0 && o & 16);
	if (
		((i ||= !!(o & 64 && t === 0)),
		(i ||= !!(o & 1024)),
		(i ||= !!(r?.dirty && bn(r))),
		(i ||= !1),
		r && (r.dirty = !1),
		(e[M] &= -9217),
		i)
	)
		vu(a, e, a.template, e[H]);
	else if (o & 8192) {
		let s = f(null);
		try {
			(Kc(e), Jc(e, 1));
			let c = a.components;
			(c !== null && t2(e, c, 1), Zc(e));
		} finally {
			f(s);
		}
	}
}
function t2(e, t, n) {
	for (let a = 0; a < t.length; a++) xu(e, t[a], n);
}
function wu(e, t) {
	let n = e.hostBindingOpCodes;
	if (n !== null)
		try {
			for (let a = 0; a < n.length; a++) {
				let o = n[a];
				if (o < 0) Pe(~o);
				else {
					let r = o,
						i = n[++a],
						s = n[++a];
					ss(i, r);
					let c = t[r];
					P(A.HostBindingsUpdateStart, c);
					try {
						s(2, c);
					} finally {
						P(A.HostBindingsUpdateEnd, c);
					}
				}
			}
		} finally {
			Pe(-1);
		}
}
function n2(e, t) {
	let n = yr() ? 64 : 1088;
	for (e[he].changeDetectionScheduler?.notify(t); e; ) {
		e[M] |= n;
		let a = De(e);
		if (xt(e) && !a) return e;
		e = a;
	}
	return null;
}
function a2(e, t, n, a) {
	return [e, !0, 0, t, null, a, null, n, null, null];
}
function o2(e, t) {
	let n = _ + t;
	if (n < e.length) return e[n];
}
function fn(e, t, n, a = !0) {
	let o = t[k];
	if ((Cu(o, t, e, n), a)) {
		let i = qr(n, e),
			s = t[R],
			c = s.parentNode(e[Te]);
		c !== null && Vl(o, e[z], s, t, c, i);
	}
	let r = t[$e];
	r !== null && r.firstChild !== null && (r.firstChild = null);
}
function r2(e, t) {
	let n = ln(e, t);
	return (n !== void 0 && $a(n[k], n), n);
}
function ln(e, t) {
	if (e.length <= _) return;
	let n = _ + t,
		a = e[n];
	if (a) {
		let o = a[Qe];
		(o !== null && o !== e && y1(o, a), t > 0 && (e[n - 1][ee] = a[ee]));
		let r = Zt(e, _ + t);
		ql(a[k], a);
		let i = r[Ke];
		(i !== null && i.detachView(r[k]), (a[F] = null), (a[ee] = null), (a[M] &= -129));
	}
	return a;
}
function Cu(e, t, n, a) {
	let o = _ + a,
		r = n.length;
	(a > 0 && (n[o - 1][ee] = t),
		a < r - _ ? ((t[ee] = n[o]), Wo(n, _ + a, t)) : (n.push(t), (t[ee] = null)),
		(t[F] = n));
	let i = t[Qe];
	i !== null && n !== i && i2(i, t);
	let s = t[Ke];
	(s !== null && s.insertView(e), fa(t), (t[M] |= 128));
}
function i2(e, t) {
	let n = e[Yt],
		a = t[F];
	if (pe(a)) e[M] |= 2;
	else {
		let o = a[F][B];
		t[B] !== o && (e[M] |= 2);
	}
	n === null ? (e[Yt] = [t]) : n.push(t);
}
var it = class {
	_lView;
	_cdRefInjectingView;
	_appRef = null;
	_attachedToViewContainer = !1;
	exhaustive;
	get rootNodes() {
		let t = this._lView,
			n = t[k];
		return dn(n, t, n.firstChild, []);
	}
	constructor(t, n) {
		((this._lView = t), (this._cdRefInjectingView = n));
	}
	get context() {
		return this._lView[H];
	}
	set context(t) {
		this._lView[H] = t;
	}
	get destroyed() {
		return tt(this._lView);
	}
	destroy() {
		if (this._appRef) this._appRef.detachView(this);
		else if (this._attachedToViewContainer) {
			let t = this._lView[F];
			if (re(t)) {
				let n = t[Kt],
					a = n ? n.indexOf(this) : -1;
				a > -1 && (ln(t, a), Zt(n, a));
			}
			this._attachedToViewContainer = !1;
		}
		$a(this._lView[k], this._lView);
	}
	onDestroy(t) {
		ir(this._lView, t);
	}
	markForCheck() {
		n2(this._cdRefInjectingView || this._lView, 4);
	}
	detach() {
		this._lView[M] &= -129;
	}
	reattach() {
		(fa(this._lView), (this._lView[M] |= 128));
	}
	detectChanges() {
		((this._lView[M] |= 1024), Yc(this._lView));
	}
	checkNoChanges() {}
	attachToViewContainerRef() {
		if (this._appRef) throw new C(902, !1);
		this._attachedToViewContainer = !0;
	}
	detachFromAppRef() {
		this._appRef = null;
		let t = xt(this._lView),
			n = this._lView[Qe];
		(n !== null && !t && y1(n, this._lView), Oc(this._lView[k], this._lView));
	}
	attachToAppRef(t) {
		if (this._attachedToViewContainer) throw new C(902, !1);
		this._appRef = t;
		let n = xt(this._lView),
			a = this._lView[Qe];
		(a !== null && !n && i2(a, this._lView), fa(this._lView));
	}
};
function Rt(e, t, n, a, o) {
	let r = e.data[t];
	if (r === null) ((r = Lu(e, t, n, a, o)), is() && (r.flags |= 32));
	else if (r.type & 64) {
		((r.type = n), (r.value = a), (r.attrs = o));
		let i = ns();
		r.injectorIndex = i === null ? -1 : i.injectorIndex;
	}
	return (nt(r, !0), r);
}
function Lu(e, t, n, a, o) {
	let r = ur(),
		i = hr(),
		s = i ? r : r && r.parent,
		c = (e.data[t] = Su(e, s, n, t, a, o));
	return (bu(e, c, r, i), c);
}
function bu(e, t, n, a) {
	(e.firstChild === null && (e.firstChild = t),
		n !== null &&
			(a
				? n.child == null && t.parent !== null && (n.child = t)
				: n.next === null && ((n.next = t), (t.prev = n))));
}
function Su(e, t, n, a, o, r) {
	let i = t ? t.injectorIndex : -1,
		s = 0;
	return (
		cr() && (s |= 128),
		{
			type: n,
			index: a,
			insertBeforeIndex: null,
			injectorIndex: i,
			directiveStart: -1,
			directiveEnd: -1,
			directiveStylingLast: -1,
			componentOffset: -1,
			fieldIndex: -1,
			customControlIndex: -1,
			propertyBindings: null,
			flags: s,
			providerIndexes: 0,
			value: o,
			attrs: r,
			mergedAttrs: null,
			localNames: null,
			initialInputs: null,
			inputs: null,
			hostDirectiveInputs: null,
			outputs: null,
			hostDirectiveOutputs: null,
			directiveToIndex: null,
			tView: null,
			next: null,
			prev: null,
			projectionNext: null,
			child: null,
			parent: t,
			projection: null,
			styles: null,
			stylesWithoutHost: null,
			residualStyles: void 0,
			classes: null,
			classesWithoutHost: null,
			residualClasses: void 0,
			classBindings: 0,
			styleBindings: 0,
		}
	);
}
function Du(e) {
	let t = e[er] ?? [],
		a = e[F][R],
		o = [];
	for (let r of t) r.data[fc] !== void 0 ? o.push(r) : Au(r, a);
	e[er] = o;
}
function Au(e, t) {
	let n = 0,
		a = e.firstChild;
	if (a) {
		let o = e.data[yc];
		for (; n < o; ) {
			let r = a.nextSibling;
			(bc(t, a, !1), (a = r), n++);
		}
	}
}
var Eu = () => null,
	Tu = () => null;
function Ra(e, t) {
	return Eu(e, t);
}
function s2(e, t, n) {
	return Tu(e, t, n);
}
var c2 = class {},
	Xa = class {},
	zr = class {
		resolveComponentFactory(t) {
			throw new C(917, !1);
		}
	},
	kn = class {
		static NULL = new zr();
	},
	un = class {},
	v1 = (() => {
		class e {
			destroyNode = null;
			static __NG_ELEMENT_ID__ = () => Pu();
		}
		return e;
	})();
function Pu() {
	let e = I(),
		t = fe(),
		n = se(t.index, e);
	return (pe(n) ? n : e)[R];
}
var d2 = (() => {
	class e {
		static ɵprov = q({ token: e, providedIn: 'root', factory: () => null });
	}
	return e;
})();
var ba = {},
	Br = class {
		injector;
		parentInjector;
		constructor(t, n) {
			((this.injector = t), (this.parentInjector = n));
		}
		get(t, n, a) {
			let o = this.injector.get(t, ba, a);
			return o !== ba || n === ba ? o : this.parentInjector.get(t, n, a);
		}
	};
function Na(e, t, n) {
	let a = n ? e.styles : null,
		o = n ? e.classes : null,
		r = 0;
	if (t !== null)
		for (let i = 0; i < t.length; i++) {
			let s = t[i];
			if (typeof s == 'number') r = s;
			else if (r == 1) o = Jn(o, s);
			else if (r == 2) {
				let c = s,
					d = t[++i];
				a = Jn(a, c + ': ' + d + ';');
			}
		}
	(n ? (e.styles = a) : (e.stylesWithoutHost = a), n ? (e.classes = o) : (e.classesWithoutHost = o));
}
function Re(e, t = 0) {
	let n = I();
	if (n === null) return ue(e, t);
	let a = fe();
	return rc(a, n, G(e), t);
}
function Ru(e, t, n, a, o) {
	let r = a === null ? null : { '': -1 },
		i = o(e, n);
	if (i !== null) {
		let s = i,
			c = null,
			d = null;
		for (let l of i)
			if (l.resolveHostDirectives !== null) {
				[s, c, d] = l.resolveHostDirectives(i);
				break;
			}
		Hu(e, t, n, s, r, c, d);
	}
	r !== null && a !== null && Nu(n, a, r);
}
function Nu(e, t, n) {
	let a = (e.localNames = []);
	for (let o = 0; o < t.length; o += 2) {
		let r = n[t[o + 1]];
		if (r == null) throw new C(-301, !1);
		a.push(t[o], r);
	}
}
function _u(e, t, n) {
	((t.componentOffset = n), (e.components ??= []).push(t.index));
}
function Hu(e, t, n, a, o, r, i) {
	let s = a.length,
		c = null;
	for (let p = 0; p < s; p++) {
		let h = a[p];
		(c === null && et(h) && ((c = h), _u(e, n, p)), X0(tc(n, t), e, h.type));
	}
	(zu(n, e.data.length, s), c?.viewProvidersResolver && c.viewProvidersResolver(c));
	for (let p = 0; p < s; p++) {
		let h = a[p];
		h.providersResolver && h.providersResolver(h);
	}
	let d = !1,
		l = !1,
		u = Pc(e, t, s, null);
	s > 0 && (n.directiveToIndex = new Map());
	for (let p = 0; p < s; p++) {
		let h = a[p];
		if (
			((n.mergedAttrs = Ba(n.mergedAttrs, h.hostAttrs)), Fu(e, n, t, u, h), Vu(u, h, o), i !== null && i.has(h))
		) {
			let [g, T] = i.get(h);
			n.directiveToIndex.set(h.type, [u, g + n.directiveStart, T + n.directiveStart]);
		} else (r === null || !r.has(h)) && n.directiveToIndex.set(h.type, u);
		(h.contentQueries !== null && (n.flags |= 4),
			(h.hostBindings !== null || h.hostAttrs !== null || h.hostVars !== 0) && (n.flags |= 64));
		let y = h.type.prototype;
		(!d && (y.ngOnChanges || y.ngOnInit || y.ngDoCheck) && ((e.preOrderHooks ??= []).push(n.index), (d = !0)),
			!l && (y.ngOnChanges || y.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(n.index), (l = !0)),
			u++);
	}
	Ou(e, n, r);
}
function Ou(e, t, n) {
	for (let a = t.directiveStart; a < t.directiveEnd; a++) {
		let o = e.data[a];
		if (n === null || !n.has(o)) (Os(0, t, o, a), Os(1, t, o, a), js(t, a, !1));
		else {
			let r = n.get(o);
			(Fs(0, t, r, a), Fs(1, t, r, a), js(t, a, !0));
		}
	}
}
function Os(e, t, n, a) {
	let o = e === 0 ? n.inputs : n.outputs;
	for (let r in o)
		if (o.hasOwnProperty(r)) {
			let i;
			(e === 0 ? (i = t.inputs ??= {}) : (i = t.outputs ??= {}), (i[r] ??= []), i[r].push(a), l2(t, r));
		}
}
function Fs(e, t, n, a) {
	let o = e === 0 ? n.inputs : n.outputs;
	for (let r in o)
		if (o.hasOwnProperty(r)) {
			let i = o[r],
				s;
			(e === 0 ? (s = t.hostDirectiveInputs ??= {}) : (s = t.hostDirectiveOutputs ??= {}),
				(s[i] ??= []),
				s[i].push(a, r),
				l2(t, i));
		}
}
function l2(e, t) {
	t === 'class' ? (e.flags |= 8) : t === 'style' && (e.flags |= 16);
}
function js(e, t, n) {
	let { attrs: a, inputs: o, hostDirectiveInputs: r } = e;
	if (a === null || (!n && o === null) || (n && r === null) || s1(e)) {
		((e.initialInputs ??= []), e.initialInputs.push(null));
		return;
	}
	let i = null,
		s = 0;
	for (; s < a.length; ) {
		let c = a[s];
		if (c === 0) {
			s += 4;
			continue;
		} else if (c === 5) {
			s += 2;
			continue;
		} else if (typeof c == 'number') break;
		if (!n && o.hasOwnProperty(c)) {
			let d = o[c];
			for (let l of d)
				if (l === t) {
					((i ??= []), i.push(c, a[s + 1]));
					break;
				}
		} else if (n && r.hasOwnProperty(c)) {
			let d = r[c];
			for (let l = 0; l < d.length; l += 2)
				if (d[l] === t) {
					((i ??= []), i.push(d[l + 1], a[s + 1]));
					break;
				}
		}
		s += 2;
	}
	((e.initialInputs ??= []), e.initialInputs.push(i));
}
function Fu(e, t, n, a, o) {
	e.data[a] = o;
	let r = o.factory || (o.factory = Ve(o.type, !0)),
		i = new sn(r, et(o), Re, null);
	((e.blueprint[a] = i), (n[a] = i), ju(e, t, a, Pc(e, n, o.hostVars, te), o));
}
function ju(e, t, n, a, o) {
	let r = o.hostBindings;
	if (r) {
		let i = e.hostBindingOpCodes;
		i === null && (i = e.hostBindingOpCodes = []);
		let s = ~t.index;
		(qu(i) != s && i.push(s), i.push(n, a, r));
	}
}
function qu(e) {
	let t = e.length;
	for (; t > 0; ) {
		let n = e[--t];
		if (typeof n == 'number' && n < 0) return n;
	}
	return 0;
}
function Vu(e, t, n) {
	if (n) {
		if (t.exportAs) for (let a = 0; a < t.exportAs.length; a++) n[t.exportAs[a]] = e;
		et(t) && (n[''] = e);
	}
}
function zu(e, t, n) {
	((e.flags |= 1), (e.directiveStart = t), (e.directiveEnd = t + n), (e.providerIndexes = t));
}
function u2(e, t, n, a, o, r, i, s) {
	let c = t[k],
		d = c.consts,
		l = ye(d, i),
		u = Rt(c, e, n, a, l);
	return (
		r && Ru(c, t, u, ye(d, s), o),
		(u.mergedAttrs = Ba(u.mergedAttrs, u.attrs)),
		u.attrs !== null && Na(u, u.attrs, !1),
		u.mergedAttrs !== null && Na(u, u.mergedAttrs, !0),
		c.queries !== null && c.queries.elementStart(c, u),
		u
	);
}
function h2(e, t) {
	(j0(e, t), tr(t) && e.queries.elementEnd(t));
}
function Bu(e, t, n, a, o, r) {
	let i = t.consts,
		s = ye(i, o),
		c = Rt(t, e, n, a, s);
	if (((c.mergedAttrs = Ba(c.mergedAttrs, c.attrs)), r != null)) {
		let d = ye(i, r);
		c.localNames = [];
		for (let l = 0; l < d.length; l += 2) c.localNames.push(d[l], -1);
	}
	return (
		c.attrs !== null && Na(c, c.attrs, !1),
		c.mergedAttrs !== null && Na(c, c.mergedAttrs, !0),
		t.queries !== null && t.queries.elementStart(t, c),
		c
	);
}
function we(e, t, n) {
	if (n === te) return !1;
	let a = e[t];
	return Object.is(a, n) ? !1 : ((e[t] = n), !0);
}
function Uu(e, t, n, a) {
	let o = we(e, t, n);
	return we(e, t + 1, a) || o;
}
var Ur = Symbol('BINDING');
var _a = class extends kn {
	ngModule;
	constructor(t) {
		(super(), (this.ngModule = t));
	}
	resolveComponentFactory(t) {
		let n = Ae(t);
		return new At(n, this.ngModule);
	}
};
function Gu(e) {
	return Object.keys(e).map((t) => {
		let [n, a, o] = e[t],
			r = { propName: n, templateName: t, isSignal: (a & Wa.SignalBased) !== 0 };
		return (o && (r.transform = o), r);
	});
}
function Wu(e) {
	return Object.keys(e).map((t) => ({ propName: e[t], templateName: t }));
}
function $u(e, t, n) {
	let a = t instanceof J ? t : t?.injector;
	return (a && e.getStandaloneInjector !== null && (a = e.getStandaloneInjector(a) || a), a ? new Br(n, a) : n);
}
function Zu(e) {
	let t = e.get(un, null);
	if (t === null) throw new C(407, !1);
	let n = e.get(d2, null),
		a = e.get(mt, null);
	return { rendererFactory: t, sanitizer: n, changeDetectionScheduler: a, ngReflect: !1 };
}
function Qu(e, t) {
	let n = p2(e);
	return Cc(t, n, n === 'svg' ? $i : n === 'math' ? Zi : null);
}
function p2(e) {
	return (e.selectors[0][0] || 'div').toLowerCase();
}
var At = class extends Xa {
	componentDef;
	ngModule;
	selector;
	componentType;
	ngContentSelectors;
	isBoundToModule;
	cachedInputs = null;
	cachedOutputs = null;
	get inputs() {
		return ((this.cachedInputs ??= Gu(this.componentDef.inputs)), this.cachedInputs);
	}
	get outputs() {
		return ((this.cachedOutputs ??= Wu(this.componentDef.outputs)), this.cachedOutputs);
	}
	constructor(t, n) {
		(super(),
			(this.componentDef = t),
			(this.ngModule = n),
			(this.componentType = t.type),
			(this.selector = Tl(t.selectors)),
			(this.ngContentSelectors = t.ngContentSelectors ?? []),
			(this.isBoundToModule = !!n));
	}
	create(t, n, a, o, r, i) {
		P(A.DynamicComponentStart);
		let s = f(null);
		try {
			let c = this.componentDef,
				d = Xu(a, c, i, r),
				l = $u(c, o || this.ngModule, t),
				u = Zu(l),
				p = u.rendererFactory.createRenderer(null, c),
				h = a ? Yl(p, a, c.encapsulation, l) : Qu(c, p),
				y = i?.some(qs) || r?.some((S) => typeof S != 'function' && S.bindings.some(qs)),
				g = d1(null, d, null, 512 | Tc(c), null, null, u, p, l, null, mc(h, l, !0));
			((g[N] = h), ga(g));
			let T = null;
			try {
				let S = u2(N, g, 2, '#host', () => d.directiveRegistry, !0, 0);
				(Sc(p, h, S),
					St(h, g),
					Bc(d, g, S),
					vc(d, S, g),
					h2(d, S),
					n !== void 0 && Yu(S, this.ngContentSelectors, n),
					(T = se(S.index, g)),
					(g[H] = T[H]),
					M1(d, g, null));
			} catch (S) {
				throw (T !== null && Or(T), Or(g), S);
			} finally {
				(P(A.DynamicComponentEnd), ma());
			}
			return new Ha(this.componentType, g, !!y);
		} finally {
			f(s);
		}
	}
};
function Xu(e, t, n, a) {
	let o = e ? ['ng-version', '21.1.0'] : Pl(t.selectors[0]),
		r = null,
		i = null,
		s = 0;
	if (n)
		for (let l of n)
			((s += l[Ur].requiredVars),
				l.create && ((l.targetIdx = 0), (r ??= []).push(l)),
				l.update && ((l.targetIdx = 0), (i ??= []).push(l)));
	if (a)
		for (let l = 0; l < a.length; l++) {
			let u = a[l];
			if (typeof u != 'function')
				for (let p of u.bindings) {
					s += p[Ur].requiredVars;
					let h = l + 1;
					(p.create && ((p.targetIdx = h), (r ??= []).push(p)),
						p.update && ((p.targetIdx = h), (i ??= []).push(p)));
				}
		}
	let c = [t];
	if (a)
		for (let l of a) {
			let u = typeof l == 'function' ? l : l.type,
				p = Bo(u);
			c.push(p);
		}
	return c1(0, null, Ku(r, i), 1, s, c, null, null, null, [o], null);
}
function Ku(e, t) {
	return !e && !t
		? null
		: (n) => {
				if (n & 1 && e) for (let a of e) a.create();
				if (n & 2 && t) for (let a of t) a.update();
			};
}
function qs(e) {
	let t = e[Ur].kind;
	return t === 'input' || t === 'twoWay';
}
var Ha = class extends c2 {
	_rootLView;
	_hasInputBindings;
	instance;
	hostView;
	changeDetectorRef;
	componentType;
	location;
	previousInputValues = null;
	_tNode;
	constructor(t, n, a) {
		(super(),
			(this._rootLView = n),
			(this._hasInputBindings = a),
			(this._tNode = Jt(n[k], N)),
			(this.location = a1(this._tNode, n)),
			(this.instance = se(this._tNode.index, n)[H]),
			(this.hostView = this.changeDetectorRef = new it(n, void 0)),
			(this.componentType = t));
	}
	setInput(t, n) {
		this._hasInputBindings;
		let a = this._tNode;
		if (
			((this.previousInputValues ??= new Map()),
			this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n))
		)
			return;
		let o = this._rootLView,
			r = m1(a, o[k], o, t, n);
		this.previousInputValues.set(t, n);
		let i = se(a.index, o);
		n2(i, 1);
	}
	get injector() {
		return new ot(this._tNode, this._rootLView);
	}
	destroy() {
		this.hostView.destroy();
	}
	onDestroy(t) {
		this.hostView.onDestroy(t);
	}
};
function Yu(e, t, n) {
	let a = (e.projection = []);
	for (let o = 0; o < t.length; o++) {
		let r = n[o];
		a.push(r != null && r.length ? Array.from(r) : null);
	}
}
var y2 = (() => {
	class e {
		static __NG_ELEMENT_ID__ = Ju;
	}
	return e;
})();
function Ju() {
	let e = fe();
	return th(e, I());
}
var eh = y2,
	f2 = class extends eh {
		_lContainer;
		_hostTNode;
		_hostLView;
		constructor(t, n, a) {
			(super(), (this._lContainer = t), (this._hostTNode = n), (this._hostLView = a));
		}
		get element() {
			return a1(this._hostTNode, this._hostLView);
		}
		get injector() {
			return new ot(this._hostTNode, this._hostLView);
		}
		get parentInjector() {
			let t = n1(this._hostTNode, this._hostLView);
			if (Ys(t)) {
				let n = Aa(t, this._hostLView),
					a = Da(t),
					o = n[k].data[a + 8];
				return new ot(o, n);
			} else return new ot(null, this._hostLView);
		}
		clear() {
			for (; this.length > 0; ) this.remove(this.length - 1);
		}
		get(t) {
			let n = Vs(this._lContainer);
			return (n !== null && n[t]) || null;
		}
		get length() {
			return this._lContainer.length - _;
		}
		createEmbeddedView(t, n, a) {
			let o, r;
			typeof a == 'number' ? (o = a) : a != null && ((o = a.index), (r = a.injector));
			let i = Ra(this._lContainer, t.ssrId),
				s = t.createEmbeddedViewImpl(n || {}, r, i);
			return (this.insertImpl(s, o, Dt(this._hostTNode, i)), s);
		}
		createComponent(t, n, a, o, r, i, s) {
			let c = t && !N0(t),
				d;
			if (c) d = n;
			else {
				let T = n || {};
				((d = T.index),
					(a = T.injector),
					(o = T.projectableNodes),
					(r = T.environmentInjector || T.ngModuleRef),
					(i = T.directives),
					(s = T.bindings));
			}
			let l = c ? t : new At(Ae(t)),
				u = a || this.parentInjector;
			if (!r && l.ngModule == null) {
				let S = (c ? u : this.parentInjector).get(J, null);
				S && (r = S);
			}
			let p = Ae(l.componentType ?? {}),
				h = Ra(this._lContainer, p?.id ?? null),
				y = h?.firstChild ?? null,
				g = l.create(u, o, y, r, i, s);
			return (this.insertImpl(g.hostView, d, Dt(this._hostTNode, h)), g);
		}
		insert(t, n) {
			return this.insertImpl(t, n, !0);
		}
		insertImpl(t, n, a) {
			let o = t._lView;
			if (Xi(o)) {
				let s = this.indexOf(t);
				if (s !== -1) this.detach(s);
				else {
					let c = o[F],
						d = new f2(c, c[z], c[F]);
					d.detach(d.indexOf(t));
				}
			}
			let r = this._adjustIndex(n),
				i = this._lContainer;
			return (fn(i, o, r, a), t.attachToViewContainerRef(), Wo(Er(i), r, t), t);
		}
		move(t, n) {
			return this.insert(t, n);
		}
		indexOf(t) {
			let n = Vs(this._lContainer);
			return n !== null ? n.indexOf(t) : -1;
		}
		remove(t) {
			let n = this._adjustIndex(t, -1),
				a = ln(this._lContainer, n);
			a && (Zt(Er(this._lContainer), n), $a(a[k], a));
		}
		detach(t) {
			let n = this._adjustIndex(t, -1),
				a = ln(this._lContainer, n);
			return a && Zt(Er(this._lContainer), n) != null ? new it(a) : null;
		}
		_adjustIndex(t, n = 0) {
			return t ?? this.length + n;
		}
	};
function Vs(e) {
	return e[Kt];
}
function Er(e) {
	return e[Kt] || (e[Kt] = []);
}
function th(e, t) {
	let n,
		a = t[e.index];
	return (re(a) ? (n = a) : ((n = a2(a, t, null, e)), (t[e.index] = n), l1(t, n)), ah(n, t, e, a), new f2(n, e, t));
}
function nh(e, t) {
	let n = e[R],
		a = n.createComment(''),
		o = Ie(t, e),
		r = n.parentNode(o);
	return (Ta(n, r, a, n.nextSibling(o), !1), a);
}
var ah = ih,
	oh = () => !1;
function rh(e, t, n) {
	return oh(e, t, n);
}
function ih(e, t, n, a) {
	if (e[Te]) return;
	let o;
	(n.type & 8 ? (o = ie(a)) : (o = nh(t, n)), (e[Te] = o));
}
var Et = class {},
	k2 = class {};
var Oa = class extends Et {
		ngModuleType;
		_parent;
		_bootstrapComponents = [];
		_r3Injector;
		instance;
		destroyCbs = [];
		componentFactoryResolver = new _a(this);
		constructor(t, n, a, o = !0) {
			(super(), (this.ngModuleType = t), (this._parent = n));
			let r = zo(t);
			((this._bootstrapComponents = Dc(r.bootstrap)),
				(this._r3Injector = Ir(
					t,
					n,
					[{ provide: Et, useValue: this }, { provide: kn, useValue: this.componentFactoryResolver }, ...a],
					Se(t),
					new Set(['environment']),
				)),
				o && this.resolveInjectorInitializers());
		}
		resolveInjectorInitializers() {
			(this._r3Injector.resolveInjectorInitializers(), (this.instance = this._r3Injector.get(this.ngModuleType)));
		}
		get injector() {
			return this._r3Injector;
		}
		destroy() {
			let t = this._r3Injector;
			(!t.destroyed && t.destroy(), this.destroyCbs.forEach((n) => n()), (this.destroyCbs = null));
		}
		onDestroy(t) {
			this.destroyCbs.push(t);
		}
	},
	Fa = class extends k2 {
		moduleType;
		constructor(t) {
			(super(), (this.moduleType = t));
		}
		create(t) {
			return new Oa(this.moduleType, t, []);
		}
	};
var hn = class extends Et {
	injector;
	componentFactoryResolver = new _a(this);
	instance = null;
	constructor(t) {
		super();
		let n = new ze(
			[...t.providers, { provide: Et, useValue: this }, { provide: kn, useValue: this.componentFactoryResolver }],
			t.parent || Qt(),
			t.debugName,
			new Set(['environment']),
		);
		((this.injector = n), t.runEnvironmentInitializers && n.resolveInjectorInitializers());
	}
	destroy() {
		this.injector.destroy();
	}
	onDestroy(t) {
		this.injector.onDestroy(t);
	}
};
function g2(e, t, n = null) {
	return new hn({ providers: e, parent: t, debugName: n, runEnvironmentInitializers: !0 }).injector;
}
var sh = (() => {
	class e {
		_injector;
		cachedInjectors = new Map();
		constructor(n) {
			this._injector = n;
		}
		getOrCreateStandaloneInjector(n) {
			if (!n.standalone) return null;
			if (!this.cachedInjectors.has(n)) {
				let a = Qo(!1, n.type),
					o = a.length > 0 ? g2([a], this._injector, '') : null;
				this.cachedInjectors.set(n, o);
			}
			return this.cachedInjectors.get(n);
		}
		ngOnDestroy() {
			try {
				for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
			} finally {
				this.cachedInjectors.clear();
			}
		}
		static ɵprov = q({ token: e, providedIn: 'environment', factory: () => new e(ue(J)) });
	}
	return e;
})();
function I1(e) {
	return Pt(() => {
		let t = m2(e),
			n = K(X({}, t), {
				decls: e.decls,
				vars: e.vars,
				template: e.template,
				consts: e.consts || null,
				ngContentSelectors: e.ngContentSelectors,
				onPush: e.changeDetection === o1.OnPush,
				directiveDefs: null,
				pipeDefs: null,
				dependencies: (t.standalone && e.dependencies) || null,
				getStandaloneInjector: t.standalone ? (o) => o.get(sh).getOrCreateStandaloneInjector(n) : null,
				getExternalStyles: null,
				signals: e.signals ?? !1,
				data: e.data || {},
				encapsulation: e.encapsulation || rt.Emulated,
				styles: e.styles || W,
				_: null,
				schemas: e.schemas || null,
				tView: null,
				id: '',
			});
		(t.standalone && ct('NgStandalone'), M2(n));
		let a = e.dependencies;
		return ((n.directiveDefs = zs(a, ch)), (n.pipeDefs = zs(a, Pi)), (n.id = hh(n)), n);
	});
}
function ch(e) {
	return Ae(e) || Bo(e);
}
function x1(e) {
	return Pt(() => ({
		type: e.type,
		bootstrap: e.bootstrap || W,
		declarations: e.declarations || W,
		imports: e.imports || W,
		exports: e.exports || W,
		transitiveCompileScopes: null,
		schemas: e.schemas || null,
		id: e.id || null,
	}));
}
function dh(e, t) {
	if (e == null) return We;
	let n = {};
	for (let a in e)
		if (e.hasOwnProperty(a)) {
			let o = e[a],
				r,
				i,
				s,
				c;
			(Array.isArray(o)
				? ((s = o[0]), (r = o[1]), (i = o[2] ?? r), (c = o[3] || null))
				: ((r = o), (i = o), (s = Wa.None), (c = null)),
				(n[r] = [a, s, c]),
				(t[r] = i));
		}
	return n;
}
function lh(e) {
	if (e == null) return We;
	let t = {};
	for (let n in e) e.hasOwnProperty(n) && (t[e[n]] = n);
	return t;
}
function uh(e) {
	return Pt(() => {
		let t = m2(e);
		return (M2(t), t);
	});
}
function m2(e) {
	let t = {};
	return {
		type: e.type,
		providersResolver: null,
		viewProvidersResolver: null,
		factory: null,
		hostBindings: e.hostBindings || null,
		hostVars: e.hostVars || 0,
		hostAttrs: e.hostAttrs || null,
		contentQueries: e.contentQueries || null,
		declaredInputs: t,
		inputConfig: e.inputs || We,
		exportAs: e.exportAs || null,
		standalone: e.standalone ?? !0,
		signals: e.signals === !0,
		selectors: e.selectors || W,
		viewQuery: e.viewQuery || null,
		features: e.features || null,
		setInput: null,
		resolveHostDirectives: null,
		hostDirectives: null,
		inputs: dh(e.inputs, t),
		outputs: lh(e.outputs),
		debugInfo: null,
	};
}
function M2(e) {
	e.features?.forEach((t) => t(e));
}
function zs(e, t) {
	return e
		? () => {
				let n = typeof e == 'function' ? e() : e,
					a = [];
				for (let o of n) {
					let r = t(o);
					r !== null && a.push(r);
				}
				return a;
			}
		: null;
}
function hh(e) {
	let t = 0,
		n = typeof e.consts == 'function' ? '' : e.consts,
		a = [
			e.selectors,
			e.ngContentSelectors,
			e.hostVars,
			e.hostAttrs,
			n,
			e.vars,
			e.decls,
			e.encapsulation,
			e.standalone,
			e.signals,
			e.exportAs,
			JSON.stringify(e.inputs),
			JSON.stringify(e.outputs),
			Object.getOwnPropertyNames(e.type.prototype),
			!!e.contentQueries,
			!!e.viewQuery,
		];
	for (let r of a.join('|')) t = (Math.imul(31, t) + r.charCodeAt(0)) << 0;
	return ((t += 2147483648), 'c' + t);
}
function ph(e, t, n, a, o, r, i, s) {
	if (n.firstCreatePass) {
		e.mergedAttrs = Ba(e.mergedAttrs, e.attrs);
		let l = (e.tView = c1(2, e, o, r, i, n.directiveRegistry, n.pipeRegistry, null, n.schemas, n.consts, null));
		n.queries !== null && (n.queries.template(n, e), (l.queries = n.queries.embeddedTView(e)));
	}
	(s && (e.flags |= s), nt(e, !1));
	let c = yh(n, t, e, a);
	(Ma() && f1(n, t, c, e), St(c, t));
	let d = a2(c, t, c, e);
	((t[a + N] = d), l1(t, d), rh(d, e, t));
}
function pn(e, t, n, a, o, r, i, s, c, d, l) {
	let u = n + N,
		p;
	if (t.firstCreatePass) {
		if (((p = Rt(t, u, 4, i || null, s || null)), d != null)) {
			let h = ye(t.consts, d);
			p.localNames = [];
			for (let y = 0; y < h.length; y += 2) p.localNames.push(h[y], -1);
		}
	} else p = t.data[u];
	return (ph(p, e, t, n, a, o, r, c), d != null && g1(e, p, l), p);
}
var yh = fh;
function fh(e, t, n, a) {
	return (va(!0), t[R].createComment(''));
}
var kh = (() => {
	class e {
		log(n) {
			console.log(n);
		}
		warn(n) {
			console.warn(n);
		}
		static ɵfac = function (a) {
			return new (a || e)();
		};
		static ɵprov = q({ token: e, factory: e.ɵfac, providedIn: 'platform' });
	}
	return e;
})();
var v2 = new b('');
function w1(e) {
	return !!e && typeof e.then == 'function';
}
function I2(e) {
	return !!e && typeof e.subscribe == 'function';
}
var x2 = new b('');
var C1 = (() => {
		class e {
			resolve;
			reject;
			initialized = !1;
			done = !1;
			donePromise = new Promise((n, a) => {
				((this.resolve = n), (this.reject = a));
			});
			appInits = x(x2, { optional: !0 }) ?? [];
			injector = x(Be);
			constructor() {}
			runInitializers() {
				if (this.initialized) return;
				let n = [];
				for (let o of this.appInits) {
					let r = da(this.injector, o);
					if (w1(r)) n.push(r);
					else if (I2(r)) {
						let i = new Promise((s, c) => {
							r.subscribe({ complete: s, error: c });
						});
						n.push(i);
					}
				}
				let a = () => {
					((this.done = !0), this.resolve());
				};
				(Promise.all(n)
					.then(() => {
						a();
					})
					.catch((o) => {
						this.reject(o);
					}),
					n.length === 0 && a(),
					(this.initialized = !0));
			}
			static ɵfac = function (a) {
				return new (a || e)();
			};
			static ɵprov = q({ token: e, factory: e.ɵfac, providedIn: 'root' });
		}
		return e;
	})(),
	w2 = new b('');
function C2() {
	io(() => {
		let e = '';
		throw new C(600, e);
	});
}
function L2(e) {
	return e.isBoundToModule;
}
var gh = 10;
var Ka = (() => {
	class e {
		_runningTick = !1;
		_destroyed = !1;
		_destroyListeners = [];
		_views = [];
		internalErrorHandler = x(Ct);
		afterRenderManager = x(Nc);
		zonelessEnabled = x(an);
		rootEffectScheduler = x(br);
		dirtyFlags = 0;
		tracingSnapshot = null;
		allTestViews = new Set();
		autoDetectTestViews = new Set();
		includeAllTestViews = !1;
		afterTick = new Ce();
		get allViews() {
			return [
				...(this.includeAllTestViews ? this.allTestViews : this.autoDetectTestViews).keys(),
				...this._views,
			];
		}
		get destroyed() {
			return this._destroyed;
		}
		componentTypes = [];
		components = [];
		internalPendingTask = x(wt);
		get isStable() {
			return this.internalPendingTask.hasPendingTasksObservable.pipe(Oe((n) => !n));
		}
		constructor() {
			x(p1, { optional: !0 });
		}
		whenStable() {
			let n;
			return new Promise((a) => {
				n = this.isStable.subscribe({
					next: (o) => {
						o && a();
					},
				});
			}).finally(() => {
				n.unsubscribe();
			});
		}
		_injector = x(J);
		_rendererFactory = null;
		get injector() {
			return this._injector;
		}
		bootstrap(n, a) {
			return this.bootstrapImpl(n, a);
		}
		bootstrapImpl(n, a, o = Be.NULL) {
			return this._injector.get(Me).run(() => {
				P(A.BootstrapComponentStart);
				let i = n instanceof Xa;
				if (!this._injector.get(C1).done) {
					let y = '';
					throw new C(405, y);
				}
				let c;
				(i ? (c = n) : (c = this._injector.get(kn).resolveComponentFactory(n)),
					this.componentTypes.push(c.componentType));
				let d = L2(c) ? void 0 : this._injector.get(Et),
					l = a || c.selector,
					u = c.create(o, [], l, d),
					p = u.location.nativeElement,
					h = u.injector.get(v2, null);
				return (
					h?.registerApplication(p),
					u.onDestroy(() => {
						(this.detachView(u.hostView), rn(this.components, u), h?.unregisterApplication(p));
					}),
					this._loadComponent(u),
					P(A.BootstrapComponentEnd, u),
					u
				);
			});
		}
		tick() {
			(this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick());
		}
		_tick() {
			(P(A.ChangeDetectionStart),
				this.tracingSnapshot !== null
					? this.tracingSnapshot.run(h1.CHANGE_DETECTION, this.tickImpl)
					: this.tickImpl());
		}
		tickImpl = () => {
			if (this._runningTick) throw (P(A.ChangeDetectionEnd), new C(101, !1));
			let n = f(null);
			try {
				((this._runningTick = !0), this.synchronize());
			} finally {
				((this._runningTick = !1),
					this.tracingSnapshot?.dispose(),
					(this.tracingSnapshot = null),
					f(n),
					this.afterTick.next(),
					P(A.ChangeDetectionEnd));
			}
		};
		synchronize() {
			this._rendererFactory === null &&
				!this._injector.destroyed &&
				(this._rendererFactory = this._injector.get(un, null, { optional: !0 }));
			let n = 0;
			for (; this.dirtyFlags !== 0 && n++ < gh; ) {
				P(A.ChangeDetectionSyncStart);
				try {
					this.synchronizeOnce();
				} finally {
					P(A.ChangeDetectionSyncEnd);
				}
			}
		}
		synchronizeOnce() {
			this.dirtyFlags & 16 && ((this.dirtyFlags &= -17), this.rootEffectScheduler.flush());
			let n = !1;
			if (this.dirtyFlags & 7) {
				let a = !!(this.dirtyFlags & 1);
				((this.dirtyFlags &= -8), (this.dirtyFlags |= 8));
				for (let { _lView: o } of this.allViews) {
					if (!a && !en(o)) continue;
					let r = a && !this.zonelessEnabled ? 0 : 1;
					(Yc(o, r), (n = !0));
				}
				if (((this.dirtyFlags &= -5), this.syncDirtyFlagsWithViews(), this.dirtyFlags & 23)) return;
			}
			(n || (this._rendererFactory?.begin?.(), this._rendererFactory?.end?.()),
				this.dirtyFlags & 8 && ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
				this.syncDirtyFlagsWithViews());
		}
		syncDirtyFlagsWithViews() {
			if (this.allViews.some(({ _lView: n }) => en(n))) {
				this.dirtyFlags |= 2;
				return;
			} else this.dirtyFlags &= -8;
		}
		attachView(n) {
			let a = n;
			(this._views.push(a), a.attachToAppRef(this));
		}
		detachView(n) {
			let a = n;
			(rn(this._views, a), a.detachFromAppRef());
		}
		_loadComponent(n) {
			this.attachView(n.hostView);
			try {
				this.tick();
			} catch (o) {
				this.internalErrorHandler(o);
			}
			(this.components.push(n), this._injector.get(w2, []).forEach((o) => o(n)));
		}
		ngOnDestroy() {
			if (!this._destroyed)
				try {
					(this._destroyListeners.forEach((n) => n()), this._views.slice().forEach((n) => n.destroy()));
				} finally {
					((this._destroyed = !0), (this._views = []), (this._destroyListeners = []));
				}
		}
		onDestroy(n) {
			return (this._destroyListeners.push(n), () => rn(this._destroyListeners, n));
		}
		destroy() {
			if (this._destroyed) throw new C(406, !1);
			let n = this._injector;
			n.destroy && !n.destroyed && n.destroy();
		}
		get viewCount() {
			return this._views.length;
		}
		static ɵfac = function (a) {
			return new (a || e)();
		};
		static ɵprov = q({ token: e, factory: e.ɵfac, providedIn: 'root' });
	}
	return e;
})();
function rn(e, t) {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}
var fU = typeof document < 'u' && typeof document?.documentElement?.getAnimations == 'function';
var Gr = class {
	destroy(t) {}
	updateValue(t, n) {}
	swap(t, n) {
		let a = Math.min(t, n),
			o = Math.max(t, n),
			r = this.detach(o);
		if (o - a > 1) {
			let i = this.detach(a);
			(this.attach(a, r), this.attach(o, i));
		} else this.attach(a, r);
	}
	move(t, n) {
		this.attach(n, this.detach(t));
	}
};
function Tr(e, t, n, a, o) {
	return e === n && Object.is(t, a) ? 1 : Object.is(o(e, t), o(n, a)) ? -1 : 0;
}
function mh(e, t, n, a) {
	let o,
		r,
		i = 0,
		s = e.length - 1,
		c = void 0;
	if (Array.isArray(t)) {
		f(a);
		let d = t.length - 1;
		for (f(null); i <= s && i <= d; ) {
			let l = e.at(i),
				u = t[i],
				p = Tr(i, l, i, u, n);
			if (p !== 0) {
				(p < 0 && e.updateValue(i, u), i++);
				continue;
			}
			let h = e.at(s),
				y = t[d],
				g = Tr(s, h, d, y, n);
			if (g !== 0) {
				(g < 0 && e.updateValue(s, y), s--, d--);
				continue;
			}
			let T = n(i, l),
				S = n(s, h),
				Nt = n(i, u);
			if (Object.is(Nt, S)) {
				let Ja = n(d, y);
				(Object.is(Ja, T) ? (e.swap(i, s), e.updateValue(s, y), d--, s--) : e.move(s, i),
					e.updateValue(i, u),
					i++);
				continue;
			}
			if (((o ??= new ja()), (r ??= Us(e, i, s, n)), Wr(e, o, i, Nt))) (e.updateValue(i, u), i++, s++);
			else if (r.has(Nt)) (o.set(T, e.detach(i)), s--);
			else {
				let Ja = e.create(i, t[i]);
				(e.attach(i, Ja), i++, s++);
			}
		}
		for (; i <= d; ) (Bs(e, o, n, i, t[i]), i++);
	} else if (t != null) {
		f(a);
		let d = t[Symbol.iterator]();
		f(null);
		let l = d.next();
		for (; !l.done && i <= s; ) {
			let u = e.at(i),
				p = l.value,
				h = Tr(i, u, i, p, n);
			if (h !== 0) (h < 0 && e.updateValue(i, p), i++, (l = d.next()));
			else {
				((o ??= new ja()), (r ??= Us(e, i, s, n)));
				let y = n(i, p);
				if (Wr(e, o, i, y)) (e.updateValue(i, p), i++, s++, (l = d.next()));
				else if (!r.has(y)) (e.attach(i, e.create(i, p)), i++, s++, (l = d.next()));
				else {
					let g = n(i, u);
					(o.set(g, e.detach(i)), s--);
				}
			}
		}
		for (; !l.done; ) (Bs(e, o, n, e.length, l.value), (l = d.next()));
	}
	for (; i <= s; ) e.destroy(e.detach(s--));
	o?.forEach((d) => {
		e.destroy(d);
	});
}
function Wr(e, t, n, a) {
	return t !== void 0 && t.has(a) ? (e.attach(n, t.get(a)), t.delete(a), !0) : !1;
}
function Bs(e, t, n, a, o) {
	if (Wr(e, t, a, n(a, o))) e.updateValue(a, o);
	else {
		let r = e.create(a, o);
		e.attach(a, r);
	}
}
function Us(e, t, n, a) {
	let o = new Set();
	for (let r = t; r <= n; r++) o.add(a(r, e.at(r)));
	return o;
}
var ja = class {
	kvMap = new Map();
	_vMap = void 0;
	has(t) {
		return this.kvMap.has(t);
	}
	delete(t) {
		if (!this.has(t)) return !1;
		let n = this.kvMap.get(t);
		return (
			this._vMap !== void 0 && this._vMap.has(n)
				? (this.kvMap.set(t, this._vMap.get(n)), this._vMap.delete(n))
				: this.kvMap.delete(t),
			!0
		);
	}
	get(t) {
		return this.kvMap.get(t);
	}
	set(t, n) {
		if (this.kvMap.has(t)) {
			let a = this.kvMap.get(t);
			this._vMap === void 0 && (this._vMap = new Map());
			let o = this._vMap;
			for (; o.has(a); ) a = o.get(a);
			o.set(a, n);
		} else this.kvMap.set(t, n);
	}
	forEach(t) {
		for (let [n, a] of this.kvMap)
			if ((t(a, n), this._vMap !== void 0)) {
				let o = this._vMap;
				for (; o.has(a); ) ((a = o.get(a)), t(a, n));
			}
	}
};
function Mh(e, t, n, a, o, r, i, s) {
	ct('NgControlFlow');
	let c = I(),
		d = Q(),
		l = ye(d.consts, r);
	return (pn(c, d, e, t, n, a, o, l, 256, i, s), L1);
}
function L1(e, t, n, a, o, r, i, s) {
	ct('NgControlFlow');
	let c = I(),
		d = Q(),
		l = ye(d.consts, r);
	return (pn(c, d, e, t, n, a, o, l, 512, i, s), L1);
}
function vh(e, t) {
	ct('NgControlFlow');
	let n = I(),
		a = at(),
		o = n[a] !== te ? n[a] : -1,
		r = o !== -1 ? qa(n, N + o) : void 0,
		i = 0;
	if (we(n, a, e)) {
		let s = f(null);
		try {
			if ((r !== void 0 && r2(r, i), e !== -1)) {
				let c = N + e,
					d = qa(n, c),
					l = Xr(n[k], c),
					u = s2(d, l, n),
					p = Qa(n, l, t, { dehydratedView: u });
				fn(d, p, i, Dt(l, u));
			}
		} finally {
			f(s);
		}
	} else if (r !== void 0) {
		let s = o2(r, i);
		s !== void 0 && (s[H] = t);
	}
}
var $r = class {
	lContainer;
	$implicit;
	$index;
	constructor(t, n, a) {
		((this.lContainer = t), (this.$implicit = n), (this.$index = a));
	}
	get $count() {
		return this.lContainer.length - _;
	}
};
function Ih(e) {
	return e;
}
var Zr = class {
	hasEmptyBlock;
	trackByFn;
	liveCollection;
	constructor(t, n, a) {
		((this.hasEmptyBlock = t), (this.trackByFn = n), (this.liveCollection = a));
	}
};
function xh(e, t, n, a, o, r, i, s, c, d, l, u, p) {
	ct('NgControlFlow');
	let h = I(),
		y = Q(),
		g = c !== void 0,
		T = I(),
		S = s ? i.bind(T[B][H]) : i,
		Nt = new Zr(g, S);
	((T[N + e] = Nt),
		pn(h, y, e + 1, t, n, a, o, ye(y.consts, r), 256),
		g && pn(h, y, e + 2, c, d, l, u, ye(y.consts, p), 512));
}
var Qr = class extends Gr {
	lContainer;
	hostLView;
	templateTNode;
	operationsCounter = void 0;
	needsIndexUpdate = !1;
	constructor(t, n, a) {
		(super(), (this.lContainer = t), (this.hostLView = n), (this.templateTNode = a));
	}
	get length() {
		return this.lContainer.length - _;
	}
	at(t) {
		return this.getLView(t)[H].$implicit;
	}
	attach(t, n) {
		let a = n[$e];
		((this.needsIndexUpdate ||= t !== this.length),
			fn(this.lContainer, n, t, Dt(this.templateTNode, a)),
			Ch(this.lContainer, t));
	}
	detach(t) {
		return ((this.needsIndexUpdate ||= t !== this.length - 1), Lh(this.lContainer, t), bh(this.lContainer, t));
	}
	create(t, n) {
		let a = Ra(this.lContainer, this.templateTNode.tView.ssrId);
		return Qa(this.hostLView, this.templateTNode, new $r(this.lContainer, n, t), { dehydratedView: a });
	}
	destroy(t) {
		$a(t[k], t);
	}
	updateValue(t, n) {
		this.getLView(t)[H].$implicit = n;
	}
	reset() {
		this.needsIndexUpdate = !1;
	}
	updateIndexes() {
		if (this.needsIndexUpdate) for (let t = 0; t < this.length; t++) this.getLView(t)[H].$index = t;
	}
	getLView(t) {
		return Sh(this.lContainer, t);
	}
};
function wh(e) {
	let t = f(null),
		n = xe();
	try {
		let a = I(),
			o = a[k],
			r = a[n],
			i = n + 1,
			s = qa(a, i);
		if (r.liveCollection === void 0) {
			let d = Xr(o, i);
			r.liveCollection = new Qr(s, a, d);
		} else r.liveCollection.reset();
		let c = r.liveCollection;
		if ((mh(c, e, r.trackByFn, t), c.updateIndexes(), r.hasEmptyBlock)) {
			let d = at(),
				l = c.length === 0;
			if (we(a, d, l)) {
				let u = n + 2,
					p = qa(a, u);
				if (l) {
					let h = Xr(o, u),
						y = s2(p, h, a),
						g = Qa(a, h, void 0, { dehydratedView: y });
					fn(p, g, 0, Dt(h, y));
				} else (o.firstUpdatePass && Du(p), r2(p, 0));
			}
		}
	} finally {
		f(t);
	}
}
function qa(e, t) {
	return e[t];
}
function Ch(e, t) {
	if (e.length <= _) return;
	let n = _ + t,
		a = e[n],
		o = a ? a[Ye] : void 0;
	if (a && o && o.detachedLeaveAnimationFns && o.detachedLeaveAnimationFns.length > 0) {
		let r = a[Ee];
		(Fl(r, o), cn.delete(a[ve]), (o.detachedLeaveAnimationFns = void 0));
	}
}
function Lh(e, t) {
	if (e.length <= _) return;
	let n = _ + t,
		a = e[n],
		o = a ? a[Ye] : void 0;
	o && o.leave && o.leave.size > 0 && (o.detachedLeaveAnimationFns = []);
}
function bh(e, t) {
	return ln(e, t);
}
function Sh(e, t) {
	return o2(e, t);
}
function Xr(e, t) {
	return Jt(e, t);
}
function b2(e, t, n) {
	let a = I(),
		o = at();
	if (we(a, o, t)) {
		let r = Q(),
			i = vr();
		nu(i, a, e, t, a[R], n);
	}
	return b2;
}
function Kr(e, t, n, a, o) {
	m1(t, e, n, o ? 'class' : 'style', a);
}
function b1(e, t, n, a) {
	let o = I(),
		r = o[k],
		i = e + N,
		s = r.firstCreatePass ? u2(i, o, 2, t, su, ts(), n, a) : r.data[i];
	if ((Gc(s, o, e, t, A2), nr(s))) {
		let c = o[k];
		(Bc(c, o, s), vc(c, s, o));
	}
	return (a != null && g1(o, s), b1);
}
function S1() {
	let e = Q(),
		t = fe(),
		n = Wc(t);
	return (
		e.firstCreatePass && h2(e, n),
		dr(n) && lr(),
		sr(),
		n.classesWithoutHost != null && V0(n) && Kr(e, n, I(), n.classesWithoutHost, !0),
		n.stylesWithoutHost != null && z0(n) && Kr(e, n, I(), n.stylesWithoutHost, !1),
		S1
	);
}
function S2(e, t, n, a) {
	return (b1(e, t, n, a), S1(), S2);
}
function D1(e, t, n, a) {
	let o = I(),
		r = o[k],
		i = e + N,
		s = r.firstCreatePass ? Bu(i, r, 2, t, n, a) : r.data[i];
	return (Gc(s, o, e, t, A2), a != null && g1(o, s), D1);
}
function A1() {
	let e = fe(),
		t = Wc(e);
	return (dr(t) && lr(), sr(), A1);
}
function D2(e, t, n, a) {
	return (D1(e, t, n, a), A1(), D2);
}
var A2 = (e, t, n, a, o) => (va(!0), Cc(t[R], a, ys()));
function E2(e, t, n) {
	let a = I(),
		o = at();
	if (we(a, o, t)) {
		let r = Q(),
			i = vr();
		Uc(i, a, e, t, a[R], n);
	}
	return E2;
}
var gn = 'en-US';
var Dh = gn;
function T2(e) {
	typeof e == 'string' && (Dh = e.toLowerCase().replace(/_/g, '-'));
}
function Ah(e = 1) {
	return ps(e);
}
function Eh(e, t) {
	let n = null,
		a = bl(e);
	for (let o = 0; o < t.length; o++) {
		let r = t[o];
		if (r === '*') {
			n = o;
			continue;
		}
		if (a === null ? Ec(e, r, !0) : Al(a, r)) return o;
	}
	return n;
}
function E1(e) {
	let t = I()[B][z];
	if (!t.projection) {
		let n = e ? e.length : 1,
			a = (t.projection = Fi(n, null)),
			o = a.slice(),
			r = t.child;
		for (; r !== null; ) {
			if (r.type !== 128) {
				let i = e ? Eh(r, e) : 0;
				i !== null && (o[i] ? (o[i].projectionNext = r) : (a[i] = r), (o[i] = r));
			}
			r = r.next;
		}
	}
}
function T1(e, t = 0, n, a, o, r) {
	let i = I(),
		s = Q(),
		c = a ? e + 1 : null;
	c !== null && pn(i, s, c, a, o, r, null, n);
	let d = Rt(s, N + e, 16, null, n || null);
	(d.projection === null && (d.projection = t), pr());
	let u = !i[$e] || cr();
	i[B][z].projection[d.projection] === null && c !== null ? Th(i, s, c) : u && !Ga(d) && Ql(s, i, d);
}
function Th(e, t, n) {
	let a = N + n,
		o = t.data[a],
		r = e[a],
		i = Ra(r, o.tView.ssrId),
		s = Qa(e, o, void 0, { dehydratedView: i });
	fn(r, s, 0, Dt(o, i));
}
function wa(e, t) {
	return (e << 17) | (t << 2);
}
function st(e) {
	return (e >> 17) & 32767;
}
function Ph(e) {
	return (e & 2) == 2;
}
function Rh(e, t) {
	return (e & 131071) | (t << 17);
}
function Yr(e) {
	return e | 2;
}
function Tt(e) {
	return (e & 131068) >> 2;
}
function Pr(e, t) {
	return (e & -131069) | (t << 2);
}
function Nh(e) {
	return (e & 1) === 1;
}
function Jr(e) {
	return e | 1;
}
function _h(e, t, n, a, o, r) {
	let i = r ? t.classBindings : t.styleBindings,
		s = st(i),
		c = Tt(i);
	e[a] = n;
	let d = !1,
		l;
	if (Array.isArray(n)) {
		let u = n;
		((l = u[1]), (l === null || Mt(u, l) > 0) && (d = !0));
	} else l = n;
	if (o)
		if (c !== 0) {
			let p = st(e[s + 1]);
			((e[a + 1] = wa(p, s)), p !== 0 && (e[p + 1] = Pr(e[p + 1], a)), (e[s + 1] = Rh(e[s + 1], a)));
		} else ((e[a + 1] = wa(s, 0)), s !== 0 && (e[s + 1] = Pr(e[s + 1], a)), (s = a));
	else ((e[a + 1] = wa(c, 0)), s === 0 ? (s = a) : (e[c + 1] = Pr(e[c + 1], a)), (c = a));
	(d && (e[a + 1] = Yr(e[a + 1])),
		Gs(e, l, a, !0),
		Gs(e, l, a, !1),
		Hh(t, l, e, a, r),
		(i = wa(s, c)),
		r ? (t.classBindings = i) : (t.styleBindings = i));
}
function Hh(e, t, n, a, o) {
	let r = o ? e.residualClasses : e.residualStyles;
	r != null && typeof t == 'string' && Mt(r, t) >= 0 && (n[a + 1] = Jr(n[a + 1]));
}
function Gs(e, t, n, a) {
	let o = e[n + 1],
		r = t === null,
		i = a ? st(o) : Tt(o),
		s = !1;
	for (; i !== 0 && (s === !1 || r); ) {
		let c = e[i],
			d = e[i + 1];
		(Oh(c, t) && ((s = !0), (e[i + 1] = a ? Jr(d) : Yr(d))), (i = a ? st(d) : Tt(d)));
	}
	s && (e[n + 1] = a ? Yr(o) : Jr(o));
}
function Oh(e, t) {
	return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
		? !0
		: Array.isArray(e) && typeof t == 'string'
			? Mt(e, t) >= 0
			: !1;
}
var de = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function Fh(e) {
	return e.substring(de.key, de.keyEnd);
}
function jh(e) {
	return (qh(e), P2(e, R2(e, 0, de.textEnd)));
}
function P2(e, t) {
	let n = de.textEnd;
	return n === t ? -1 : ((t = de.keyEnd = Vh(e, (de.key = t), n)), R2(e, t, n));
}
function qh(e) {
	((de.key = 0), (de.keyEnd = 0), (de.value = 0), (de.valueEnd = 0), (de.textEnd = e.length));
}
function R2(e, t, n) {
	for (; t < n && e.charCodeAt(t) <= 32; ) t++;
	return t;
}
function Vh(e, t, n) {
	for (; t < n && e.charCodeAt(t) > 32; ) t++;
	return t;
}
function zh(e) {
	Uh(Kh, Bh, e, !0);
}
function Bh(e, t) {
	for (let n = jh(t); n >= 0; n = P2(t, n)) ia(e, Fh(t), !0);
}
function Uh(e, t, n, a) {
	let o = Q(),
		r = kr(2);
	o.firstUpdatePass && Gh(o, null, r, a);
	let i = I();
	if (n !== te && we(i, r, n)) {
		let s = o.data[xe()];
		if (_2(s, a) && !N2(o, r)) {
			let c = a ? s.classesWithoutHost : s.stylesWithoutHost;
			(c !== null && (n = Jn(c, n || '')), Kr(o, s, i, n, a));
		} else Yh(o, s, i, i[R], i[r + 1], (i[r + 1] = Xh(e, t, n)), a, r);
	}
}
function N2(e, t) {
	return t >= e.expandoStartIndex;
}
function Gh(e, t, n, a) {
	let o = e.data;
	if (o[n + 1] === null) {
		let r = o[xe()],
			i = N2(e, n);
		(_2(r, a) && t === null && !i && (t = !1), (t = Wh(o, r, t, a)), _h(o, r, t, n, i, a));
	}
}
function Wh(e, t, n, a) {
	let o = ds(e),
		r = a ? t.residualClasses : t.residualStyles;
	if (o === null)
		(a ? t.classBindings : t.styleBindings) === 0 &&
			((n = Rr(null, e, t, n, a)), (n = yn(n, t.attrs, a)), (r = null));
	else {
		let i = t.directiveStylingLast;
		if (i === -1 || e[i] !== o)
			if (((n = Rr(o, e, t, n, a)), r === null)) {
				let c = $h(e, t, a);
				c !== void 0 &&
					Array.isArray(c) &&
					((c = Rr(null, e, t, c[1], a)), (c = yn(c, t.attrs, a)), Zh(e, t, a, c));
			} else r = Qh(e, t, a);
	}
	return (r !== void 0 && (a ? (t.residualClasses = r) : (t.residualStyles = r)), n);
}
function $h(e, t, n) {
	let a = n ? t.classBindings : t.styleBindings;
	if (Tt(a) !== 0) return e[st(a)];
}
function Zh(e, t, n, a) {
	let o = n ? t.classBindings : t.styleBindings;
	e[st(o)] = a;
}
function Qh(e, t, n) {
	let a,
		o = t.directiveEnd;
	for (let r = 1 + t.directiveStylingLast; r < o; r++) {
		let i = e[r].hostAttrs;
		a = yn(a, i, n);
	}
	return yn(a, t.attrs, n);
}
function Rr(e, t, n, a, o) {
	let r = null,
		i = n.directiveEnd,
		s = n.directiveStylingLast;
	for (s === -1 ? (s = n.directiveStart) : s++; s < i && ((r = t[s]), (a = yn(a, r.hostAttrs, o)), r !== e); ) s++;
	return (e !== null && (n.directiveStylingLast = s), a);
}
function yn(e, t, n) {
	let a = n ? 1 : 2,
		o = -1;
	if (t !== null)
		for (let r = 0; r < t.length; r++) {
			let i = t[r];
			typeof i == 'number'
				? (o = i)
				: o === a && (Array.isArray(e) || (e = e === void 0 ? [] : ['', e]), ia(e, i, n ? !0 : t[++r]));
		}
	return e === void 0 ? null : e;
}
function Xh(e, t, n) {
	if (n == null || n === '') return W;
	let a = [],
		o = r1(n);
	if (Array.isArray(o)) for (let r = 0; r < o.length; r++) e(a, o[r], !0);
	else if (typeof o == 'object') for (let r in o) o.hasOwnProperty(r) && e(a, r, o[r]);
	else typeof o == 'string' && t(a, o);
	return a;
}
function Kh(e, t, n) {
	let a = String(t);
	a !== '' && !a.includes(' ') && ia(e, a, n);
}
function Yh(e, t, n, a, o, r, i, s) {
	o === te && (o = W);
	let c = 0,
		d = 0,
		l = 0 < o.length ? o[0] : null,
		u = 0 < r.length ? r[0] : null;
	for (; l !== null || u !== null; ) {
		let p = c < o.length ? o[c + 1] : void 0,
			h = d < r.length ? r[d + 1] : void 0,
			y = null,
			g;
		(l === u
			? ((c += 2), (d += 2), p !== h && ((y = u), (g = h)))
			: u === null || (l !== null && l < u)
				? ((c += 2), (y = l))
				: ((d += 2), (y = u), (g = h)),
			y !== null && Jh(e, t, n, a, y, g, i, s),
			(l = c < o.length ? o[c] : null),
			(u = d < r.length ? r[d] : null));
	}
}
function Jh(e, t, n, a, o, r, i, s) {
	if (!(t.type & 3)) return;
	let c = e.data,
		d = c[s + 1],
		l = Nh(d) ? Ws(c, t, n, o, Tt(d), i) : void 0;
	if (!Va(l)) {
		Va(r) || (Ph(d) && (r = Ws(c, null, n, o, s, i)));
		let u = ar(xe(), n);
		Kl(a, i, u, o, r);
	}
}
function Ws(e, t, n, a, o, r) {
	let i = t === null,
		s;
	for (; o > 0; ) {
		let c = e[o],
			d = Array.isArray(c),
			l = d ? c[1] : c,
			u = l === null,
			p = n[o + 1];
		p === te && (p = u ? W : void 0);
		let h = u ? sa(p, a) : l === a ? p : void 0;
		if ((d && !Va(h) && (h = sa(c, a)), Va(h) && ((s = h), i))) return s;
		let y = e[o + 1];
		o = i ? st(y) : Tt(y);
	}
	if (t !== null) {
		let c = r ? t.residualClasses : t.residualStyles;
		c != null && (s = sa(c, a));
	}
	return s;
}
function Va(e) {
	return e !== void 0;
}
function _2(e, t) {
	return (e.flags & (t ? 8 : 16)) !== 0;
}
function ep(e, t = '') {
	let n = I(),
		a = Q(),
		o = e + N,
		r = a.firstCreatePass ? Rt(a, o, 1, t, null) : a.data[o],
		i = tp(a, n, r, t, e);
	((n[o] = i), Ma() && f1(a, n, i, r), nt(r, !1));
}
var tp = (e, t, n, a, o) => (va(!0), fl(t[R], a));
function H2(e, t, n, a = '') {
	return we(e, at(), n) ? t + Ge(n) + a : te;
}
function np(e, t, n, a, o, r = '') {
	let i = os(),
		s = Uu(e, i, n, o);
	return (kr(2), s ? t + Ge(n) + a + Ge(o) + r : te);
}
function O2(e) {
	return (P1('', e), O2);
}
function P1(e, t, n) {
	let a = I(),
		o = H2(a, e, t, n);
	return (o !== te && ap(a, xe(), o), P1);
}
function ap(e, t, n) {
	let a = ar(t, e);
	kl(e[R], a, n);
}
var F2 = {};
function j2(e) {
	ct('NgLet');
	let t = Q(),
		n = I(),
		a = e + N,
		o = Rt(t, a, 128, null, null);
	return (nt(o, !1), pa(t, n, a, F2), j2);
}
function op(e) {
	let t = Q(),
		n = I(),
		a = xe();
	return (pa(t, n, a, e), e);
}
function rp(e) {
	let t = as(),
		n = Qi(t, N + e);
	if (n === F2) throw new C(314, !1);
	return n;
}
function ip(e) {
	return we(I(), at(), e) ? Ge(e) : te;
}
function sp(e, t, n = '') {
	return H2(I(), e, t, n);
}
function cp(e, t, n, a, o = '') {
	return np(I(), e, t, n, a, o);
}
var za = class {
		ngModuleFactory;
		componentFactories;
		constructor(t, n) {
			((this.ngModuleFactory = t), (this.componentFactories = n));
		}
	},
	dp = (() => {
		class e {
			compileModuleSync(n) {
				return new Fa(n);
			}
			compileModuleAsync(n) {
				return Promise.resolve(this.compileModuleSync(n));
			}
			compileModuleAndAllComponentsSync(n) {
				let a = this.compileModuleSync(n),
					o = zo(n),
					r = Dc(o.declarations).reduce((i, s) => {
						let c = Ae(s);
						return (c && i.push(new At(c)), i);
					}, []);
				return new za(a, r);
			}
			compileModuleAndAllComponentsAsync(n) {
				return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
			}
			clearCache() {}
			clearCacheFor(n) {}
			getModuleId(n) {}
			static ɵfac = function (a) {
				return new (a || e)();
			};
			static ɵprov = q({ token: e, factory: e.ɵfac, providedIn: 'root' });
		}
		return e;
	})();
var q2 = (() => {
	class e {
		applicationErrorHandler = x(Ct);
		appRef = x(Ka);
		taskService = x(wt);
		ngZone = x(Me);
		zonelessEnabled = x(an);
		tracing = x(p1, { optional: !0 });
		zoneIsDefined = typeof Zone < 'u' && !!Zone.root.run;
		schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }];
		subscriptions = new V();
		angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(Gt) : null;
		scheduleInRootZone = !this.zonelessEnabled && this.zoneIsDefined && (x(Lr, { optional: !0 }) ?? !1);
		cancelScheduledCallback = null;
		useMicrotaskScheduler = !1;
		runningTick = !1;
		pendingRenderTaskId = null;
		constructor() {
			(this.subscriptions.add(
				this.appRef.afterTick.subscribe(() => {
					let n = this.taskService.add();
					if (
						!this.runningTick &&
						(this.cleanup(), !this.zonelessEnabled || this.appRef.includeAllTestViews)
					) {
						this.taskService.remove(n);
						return;
					}
					(this.switchToMicrotaskScheduler(), this.taskService.remove(n));
				}),
			),
				this.subscriptions.add(
					this.ngZone.onUnstable.subscribe(() => {
						this.runningTick || this.cleanup();
					}),
				));
		}
		switchToMicrotaskScheduler() {
			this.ngZone.runOutsideAngular(() => {
				let n = this.taskService.add();
				((this.useMicrotaskScheduler = !0),
					queueMicrotask(() => {
						((this.useMicrotaskScheduler = !1), this.taskService.remove(n));
					}));
			});
		}
		notify(n) {
			if (!this.zonelessEnabled && n === 5) return;
			switch (n) {
				case 0: {
					this.appRef.dirtyFlags |= 2;
					break;
				}
				case 3:
				case 2:
				case 4:
				case 5:
				case 1: {
					this.appRef.dirtyFlags |= 4;
					break;
				}
				case 6: {
					this.appRef.dirtyFlags |= 2;
					break;
				}
				case 12: {
					this.appRef.dirtyFlags |= 16;
					break;
				}
				case 13: {
					this.appRef.dirtyFlags |= 2;
					break;
				}
				case 11:
					break;
				default:
					this.appRef.dirtyFlags |= 8;
			}
			if (
				((this.appRef.tracingSnapshot = this.tracing?.snapshot(this.appRef.tracingSnapshot) ?? null),
				!this.shouldScheduleTick())
			)
				return;
			let a = this.useMicrotaskScheduler ? ms : xr;
			((this.pendingRenderTaskId = this.taskService.add()),
				this.scheduleInRootZone
					? (this.cancelScheduledCallback = Zone.root.run(() => a(() => this.tick())))
					: (this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() => a(() => this.tick()))));
		}
		shouldScheduleTick() {
			return !(
				this.appRef.destroyed ||
				this.pendingRenderTaskId !== null ||
				this.runningTick ||
				this.appRef._runningTick ||
				(!this.zonelessEnabled && this.zoneIsDefined && Zone.current.get(Gt + this.angularZoneId))
			);
		}
		tick() {
			if (this.runningTick || this.appRef.destroyed) return;
			if (this.appRef.dirtyFlags === 0) {
				this.cleanup();
				return;
			}
			!this.zonelessEnabled && this.appRef.dirtyFlags & 7 && (this.appRef.dirtyFlags |= 1);
			let n = this.taskService.add();
			try {
				this.ngZone.run(
					() => {
						((this.runningTick = !0), this.appRef._tick());
					},
					void 0,
					this.schedulerTickApplyArgs,
				);
			} catch (a) {
				this.applicationErrorHandler(a);
			} finally {
				(this.taskService.remove(n), this.cleanup());
			}
		}
		ngOnDestroy() {
			(this.subscriptions.unsubscribe(), this.cleanup());
		}
		cleanup() {
			if (
				((this.runningTick = !1),
				this.cancelScheduledCallback?.(),
				(this.cancelScheduledCallback = null),
				this.pendingRenderTaskId !== null)
			) {
				let n = this.pendingRenderTaskId;
				((this.pendingRenderTaskId = null), this.taskService.remove(n));
			}
		}
		static ɵfac = function (a) {
			return new (a || e)();
		};
		static ɵprov = q({ token: e, factory: e.ɵfac, providedIn: 'root' });
	}
	return e;
})();
function V2() {
	return [
		{ provide: mt, useExisting: q2 },
		{ provide: Me, useClass: Wt },
		{ provide: an, useValue: !0 },
	];
}
function lp() {
	return (typeof $localize < 'u' && $localize.locale) || gn;
}
var R1 = new b('', { factory: () => x(R1, { optional: !0, skipSelf: !0 }) || lp() });
var B2 = Symbol('InputSignalNode#UNSET'),
	hp = K(X({}, Sn), {
		transformFn: void 0,
		applyValueToInputSignal(e, t) {
			Ht(e, t);
		},
	});
function U2(e, t) {
	let n = Object.create(hp);
	((n.value = e), (n.transformFn = t?.transform));
	function a() {
		if ((Cn(n), n.value === B2)) {
			let o = null;
			throw new C(-950, o);
		}
		return n.value;
	}
	return ((a[Y] = n), a);
}
function z2(e, t) {
	return U2(e, t);
}
function pp(e) {
	return U2(B2, e);
}
var aK = ((z2.required = pp), z2);
var N1 = new b(''),
	yp = new b('');
function mn(e) {
	return !e.moduleRef;
}
function fp(e) {
	let t = mn(e) ? e.r3Injector : e.moduleRef.injector,
		n = t.get(Me);
	return n.run(() => {
		mn(e) ? e.r3Injector.resolveInjectorInitializers() : e.moduleRef.resolveInjectorInitializers();
		let a = t.get(Ct),
			o;
		if (
			(n.runOutsideAngular(() => {
				o = n.onError.subscribe({ next: a });
			}),
			mn(e))
		) {
			let r = () => t.destroy(),
				i = e.platformInjector.get(N1);
			(i.add(r),
				t.onDestroy(() => {
					(o.unsubscribe(), i.delete(r));
				}));
		} else {
			let r = () => e.moduleRef.destroy(),
				i = e.platformInjector.get(N1);
			(i.add(r),
				e.moduleRef.onDestroy(() => {
					(rn(e.allPlatformModules, e.moduleRef), o.unsubscribe(), i.delete(r));
				}));
		}
		return gp(a, n, () => {
			let r = t.get(wt),
				i = r.add(),
				s = t.get(C1);
			return (
				s.runInitializers(),
				s.donePromise
					.then(() => {
						let c = t.get(R1, gn);
						if ((T2(c || gn), !t.get(yp, !0)))
							return mn(e) ? t.get(Ka) : (e.allPlatformModules.push(e.moduleRef), e.moduleRef);
						if (mn(e)) {
							let l = t.get(Ka);
							return (e.rootComponent !== void 0 && l.bootstrap(e.rootComponent), l);
						} else return (kp?.(e.moduleRef, e.allPlatformModules), e.moduleRef);
					})
					.finally(() => {
						r.remove(i);
					})
			);
		});
	});
}
var kp;
function gp(e, t, n) {
	try {
		let a = n();
		return w1(a)
			? a.catch((o) => {
					throw (t.runOutsideAngular(() => e(o)), o);
				})
			: a;
	} catch (a) {
		throw (t.runOutsideAngular(() => e(a)), a);
	}
}
var Ya = null;
function mp(e = [], t) {
	return Be.create({
		name: t,
		providers: [
			{ provide: Ko, useValue: 'platform' },
			{ provide: N1, useValue: new Set([() => (Ya = null)]) },
			...e,
		],
	});
}
function Mp(e = []) {
	if (Ya) return Ya;
	let t = mp(e);
	return ((Ya = t), C2(), vp(t), t);
}
function vp(e) {
	let t = e.get(pc, null);
	da(e, () => {
		t?.forEach((n) => n());
	});
}
var Ip = 1e4;
var oK = Ip - 1e3;
var G2 = (() => {
	class e {
		static __NG_ELEMENT_ID__ = xp;
	}
	return e;
})();
function xp(e) {
	return wp(fe(), I(), (e & 16) === 16);
}
function wp(e, t, n) {
	if (Je(e) && !n) {
		let a = se(e.index, t);
		return new it(a, a);
	} else if (e.type & 175) {
		let a = t[B];
		return new it(a, t);
	}
	return null;
}
function rK(e) {
	let { rootComponent: t, appProviders: n, platformProviders: a, platformRef: o } = e;
	P(A.BootstrapApplicationStart);
	try {
		let r = o?.injector ?? Mp(a),
			i = [V2(), vs, ...(n || [])],
			s = new hn({ providers: i, parent: r, debugName: '', runEnvironmentInitializers: !1 });
		return fp({ r3Injector: s.injector, platformInjector: r, rootComponent: t });
	} catch (r) {
		return Promise.reject(r);
	} finally {
		P(A.BootstrapApplicationEnd);
	}
}
var Lp = ['*'],
	bp = [
		['path', { d: 'm14 12 4 4 4-4', key: 'buelq4' }],
		['path', { d: 'M18 16V7', key: 'ty0viw' }],
		['path', { d: 'm2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16', key: 'd5nyq2' }],
		['path', { d: 'M3.304 13h6.392', key: '1q3zxz' }],
	],
	Sp = [
		['path', { d: 'm14 11 4-4 4 4', key: '1pu57t' }],
		['path', { d: 'M18 16V7', key: 'ty0viw' }],
		['path', { d: 'm2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16', key: 'd5nyq2' }],
		['path', { d: 'M3.304 13h6.392', key: '1q3zxz' }],
	],
	Dp = [
		['path', { d: 'm15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16', key: 'xik6mr' }],
		['path', { d: 'M15.697 14h5.606', key: '1stdlc' }],
		['path', { d: 'm2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16', key: 'd5nyq2' }],
		['path', { d: 'M3.304 13h6.392', key: '1q3zxz' }],
	],
	Ap = [
		[
			'path',
			{
				d: 'M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2',
				key: '169zse',
			},
		],
	],
	Ep = [
		['circle', { cx: '16', cy: '4', r: '1', key: '1grugj' }],
		['path', { d: 'm18 19 1-7-6 1', key: 'r0i19z' }],
		['path', { d: 'm5 8 3-3 5.5 3-2.36 3.5', key: '9ptxx2' }],
		['path', { d: 'M4.24 14.5a5 5 0 0 0 6.88 6', key: '10kmtu' }],
		['path', { d: 'M13.76 17.5a5 5 0 0 0-6.88-6', key: '2qq6rc' }],
	],
	Tp = [
		['path', { d: 'M18 17.5a2.5 2.5 0 1 1-4 2.03V12', key: 'yd12zl' }],
		['path', { d: 'M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2', key: 'larmp2' }],
		['path', { d: 'M6 8h12', key: '6g4wlu' }],
		['path', { d: 'M6.6 15.572A2 2 0 1 0 10 17v-5', key: '1x1kqn' }],
	],
	Pp = [
		['path', { d: 'M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1', key: 'ns4c3b' }],
		['path', { d: 'm12 15 5 6H7Z', key: '14qnn2' }],
	],
	Rp = [
		['circle', { cx: '12', cy: '13', r: '8', key: '3y4lt7' }],
		['path', { d: 'M5 3 2 6', key: '18tl5t' }],
		['path', { d: 'm22 6-3-3', key: '1opdir' }],
		['path', { d: 'M6.38 18.7 4 21', key: '17xu3x' }],
		['path', { d: 'M17.64 18.67 20 21', key: 'kv2oe2' }],
		['path', { d: 'm9 13 2 2 4-4', key: '6343dt' }],
	],
	Np = [
		['circle', { cx: '12', cy: '13', r: '8', key: '3y4lt7' }],
		['path', { d: 'M5 3 2 6', key: '18tl5t' }],
		['path', { d: 'm22 6-3-3', key: '1opdir' }],
		['path', { d: 'M6.38 18.7 4 21', key: '17xu3x' }],
		['path', { d: 'M17.64 18.67 20 21', key: 'kv2oe2' }],
		['path', { d: 'M9 13h6', key: '1uhe8q' }],
	],
	_p = [
		['path', { d: 'M6.87 6.87a8 8 0 1 0 11.26 11.26', key: '3on8tj' }],
		['path', { d: 'M19.9 14.25a8 8 0 0 0-9.15-9.15', key: '15ghsc' }],
		['path', { d: 'm22 6-3-3', key: '1opdir' }],
		['path', { d: 'M6.26 18.67 4 21', key: 'yzmioq' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M4 4 2 6', key: '1ycko6' }],
	],
	Hp = [
		['circle', { cx: '12', cy: '13', r: '8', key: '3y4lt7' }],
		['path', { d: 'M5 3 2 6', key: '18tl5t' }],
		['path', { d: 'm22 6-3-3', key: '1opdir' }],
		['path', { d: 'M6.38 18.7 4 21', key: '17xu3x' }],
		['path', { d: 'M17.64 18.67 20 21', key: 'kv2oe2' }],
		['path', { d: 'M12 10v6', key: '1bos4e' }],
		['path', { d: 'M9 13h6', key: '1uhe8q' }],
	],
	Op = [
		['circle', { cx: '12', cy: '13', r: '8', key: '3y4lt7' }],
		['path', { d: 'M12 9v4l2 2', key: '1c63tq' }],
		['path', { d: 'M5 3 2 6', key: '18tl5t' }],
		['path', { d: 'm22 6-3-3', key: '1opdir' }],
		['path', { d: 'M6.38 18.7 4 21', key: '17xu3x' }],
		['path', { d: 'M17.64 18.67 20 21', key: 'kv2oe2' }],
	],
	Fp = [
		['path', { d: 'M11 21c0-2.5 2-2.5 2-5', key: '1sicvv' }],
		['path', { d: 'M16 21c0-2.5 2-2.5 2-5', key: '1o3eny' }],
		['path', { d: 'm19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8', key: '1bvca4' }],
		['path', { d: 'M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z', key: 'x3qr1j' }],
		['path', { d: 'M6 21c0-2.5 2-2.5 2-5', key: 'i3w1gp' }],
	],
	jp = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
		['polyline', { points: '11 3 11 11 14 8 17 11 17 3', key: '1wcwz3' }],
	],
	qp = [
		['path', { d: 'M2 12h20', key: '9i4pu4' }],
		['path', { d: 'M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4', key: '11f1s0' }],
		['path', { d: 'M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4', key: 't14dx9' }],
		['path', { d: 'M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1', key: '1w07xs' }],
		['path', { d: 'M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1', key: '1apec2' }],
	],
	Vp = [
		['path', { d: 'M12 2v20', key: 't6zp3m' }],
		['path', { d: 'M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4', key: '14d6g8' }],
		['path', { d: 'M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4', key: '1e2lrw' }],
		['path', { d: 'M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1', key: '1fkdwx' }],
		['path', { d: 'M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1', key: '1euafb' }],
	],
	zp = [
		['rect', { width: '6', height: '16', x: '4', y: '2', rx: '2', key: 'z5wdxg' }],
		['rect', { width: '6', height: '9', x: '14', y: '9', rx: '2', key: 'um7a8w' }],
		['path', { d: 'M22 22H2', key: '19qnx5' }],
	],
	Bp = [
		['rect', { width: '16', height: '6', x: '2', y: '4', rx: '2', key: '10wcwx' }],
		['rect', { width: '9', height: '6', x: '9', y: '14', rx: '2', key: '4p5bwg' }],
		['path', { d: 'M22 22V2', key: '12ipfv' }],
	],
	Up = [
		['rect', { width: '6', height: '14', x: '4', y: '5', rx: '2', key: '1wwnby' }],
		['rect', { width: '6', height: '10', x: '14', y: '7', rx: '2', key: '1fe6j6' }],
		['path', { d: 'M17 22v-5', key: '4b6g73' }],
		['path', { d: 'M17 7V2', key: 'hnrr36' }],
		['path', { d: 'M7 22v-3', key: '1r4jpn' }],
		['path', { d: 'M7 5V2', key: 'liy1u9' }],
	],
	Gp = [
		['rect', { width: '6', height: '14', x: '4', y: '5', rx: '2', key: '1wwnby' }],
		['rect', { width: '6', height: '10', x: '14', y: '7', rx: '2', key: '1fe6j6' }],
		['path', { d: 'M10 2v20', key: 'uyc634' }],
		['path', { d: 'M20 2v20', key: '1tx262' }],
	],
	Wp = [
		['rect', { width: '6', height: '14', x: '4', y: '5', rx: '2', key: '1wwnby' }],
		['rect', { width: '6', height: '10', x: '14', y: '7', rx: '2', key: '1fe6j6' }],
		['path', { d: 'M4 2v20', key: 'gtpd5x' }],
		['path', { d: 'M14 2v20', key: 'tg6bpw' }],
	],
	$p = [
		['rect', { width: '6', height: '14', x: '2', y: '5', rx: '2', key: 'dy24zr' }],
		['rect', { width: '6', height: '10', x: '16', y: '7', rx: '2', key: '13zkjt' }],
		['path', { d: 'M12 2v20', key: 't6zp3m' }],
	],
	Zp = [
		['rect', { width: '6', height: '14', x: '2', y: '5', rx: '2', key: 'dy24zr' }],
		['rect', { width: '6', height: '10', x: '12', y: '7', rx: '2', key: '1ht384' }],
		['path', { d: 'M22 2v20', key: '40qfg1' }],
	],
	Qp = [
		['rect', { width: '6', height: '14', x: '6', y: '5', rx: '2', key: 'hsirpf' }],
		['rect', { width: '6', height: '10', x: '16', y: '7', rx: '2', key: '13zkjt' }],
		['path', { d: 'M2 2v20', key: '1ivd8o' }],
	],
	Xp = [
		['rect', { width: '6', height: '10', x: '9', y: '7', rx: '2', key: 'yn7j0q' }],
		['path', { d: 'M4 22V2', key: 'tsjzd3' }],
		['path', { d: 'M20 22V2', key: '1bnhr8' }],
	],
	Kp = [
		['rect', { width: '6', height: '14', x: '3', y: '5', rx: '2', key: 'j77dae' }],
		['rect', { width: '6', height: '10', x: '15', y: '7', rx: '2', key: 'bq30hj' }],
		['path', { d: 'M3 2v20', key: '1d2pfg' }],
		['path', { d: 'M21 2v20', key: 'p059bm' }],
	],
	Yp = [
		['rect', { width: '6', height: '16', x: '4', y: '6', rx: '2', key: '1n4dg1' }],
		['rect', { width: '6', height: '9', x: '14', y: '6', rx: '2', key: '17khns' }],
		['path', { d: 'M22 2H2', key: 'fhrpnj' }],
	],
	Jp = [
		['rect', { width: '9', height: '6', x: '6', y: '14', rx: '2', key: 'lpm2y7' }],
		['rect', { width: '16', height: '6', x: '6', y: '4', rx: '2', key: 'rdj6ps' }],
		['path', { d: 'M2 2v20', key: '1ivd8o' }],
	],
	ey = [
		['path', { d: 'M22 17h-3', key: '1lwga1' }],
		['path', { d: 'M22 7h-5', key: 'o2endc' }],
		['path', { d: 'M5 17H2', key: '1gx9xc' }],
		['path', { d: 'M7 7H2', key: '6bq26l' }],
		['rect', { x: '5', y: '14', width: '14', height: '6', rx: '2', key: '1qrzuf' }],
		['rect', { x: '7', y: '4', width: '10', height: '6', rx: '2', key: 'we8e9z' }],
	],
	ty = [
		['rect', { width: '14', height: '6', x: '5', y: '14', rx: '2', key: 'jmoj9s' }],
		['rect', { width: '10', height: '6', x: '7', y: '4', rx: '2', key: 'aza5on' }],
		['path', { d: 'M2 20h20', key: 'owomy5' }],
		['path', { d: 'M2 10h20', key: '1ir3d8' }],
	],
	ny = [
		['rect', { width: '14', height: '6', x: '5', y: '14', rx: '2', key: 'jmoj9s' }],
		['rect', { width: '10', height: '6', x: '7', y: '4', rx: '2', key: 'aza5on' }],
		['path', { d: 'M2 14h20', key: 'myj16y' }],
		['path', { d: 'M2 4h20', key: 'mda7wb' }],
	],
	ay = [
		['rect', { width: '14', height: '6', x: '5', y: '16', rx: '2', key: '1i8z2d' }],
		['rect', { width: '10', height: '6', x: '7', y: '2', rx: '2', key: 'ypihtt' }],
		['path', { d: 'M2 12h20', key: '9i4pu4' }],
	],
	oy = [
		['rect', { width: '14', height: '6', x: '5', y: '12', rx: '2', key: '4l4tp2' }],
		['rect', { width: '10', height: '6', x: '7', y: '2', rx: '2', key: 'ypihtt' }],
		['path', { d: 'M2 22h20', key: '272qi7' }],
	],
	ry = [
		['rect', { width: '14', height: '6', x: '5', y: '16', rx: '2', key: '1i8z2d' }],
		['rect', { width: '10', height: '6', x: '7', y: '6', rx: '2', key: '13squh' }],
		['path', { d: 'M2 2h20', key: '1ennik' }],
	],
	iy = [
		['rect', { width: '10', height: '6', x: '7', y: '9', rx: '2', key: 'b1zbii' }],
		['path', { d: 'M22 20H2', key: '1p1f7z' }],
		['path', { d: 'M22 4H2', key: '1b7qnq' }],
	],
	sy = [
		['rect', { width: '14', height: '6', x: '5', y: '15', rx: '2', key: '1w91an' }],
		['rect', { width: '10', height: '6', x: '7', y: '3', rx: '2', key: '17wqzy' }],
		['path', { d: 'M2 21h20', key: '1nyx9w' }],
		['path', { d: 'M2 3h20', key: '91anmk' }],
	],
	cy = [
		['path', { d: 'M10 10H6', key: '1bsnug' }],
		['path', { d: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', key: 'wrbu53' }],
		[
			'path',
			{
				d: 'M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14',
				key: 'lrkjwd',
			},
		],
		['path', { d: 'M8 8v4', key: '1fwk8c' }],
		['path', { d: 'M9 18h6', key: 'x1upvd' }],
		['circle', { cx: '17', cy: '18', r: '2', key: '332jqn' }],
		['circle', { cx: '7', cy: '18', r: '2', key: '19iecd' }],
	],
	dy = [
		['path', { d: 'M16 12h3', key: '4uvgyw' }],
		[
			'path',
			{
				d: 'M17.5 12a8 8 0 0 1-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13',
				key: 'nfoe1t',
			},
		],
	],
	ly = [
		[
			'path',
			{ d: 'M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5', key: '12lh1k' },
		],
		[
			'path',
			{ d: 'M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5', key: '173c68' },
		],
	],
	uy = [
		['path', { d: 'M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8', key: '1h8rid' }],
		['path', { d: 'M10 5H8a2 2 0 0 0 0 4h.68', key: '3ezsi6' }],
		['path', { d: 'M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8', key: 'yt6q09' }],
		['path', { d: 'M14 5h2a2 2 0 0 1 0 4h-.68', key: '8f95yk' }],
		['path', { d: 'M18 22H6', key: 'mg6kv4' }],
		['path', { d: 'M9 2h6', key: '1jrp98' }],
	],
	hy = [
		['path', { d: 'M12 6v16', key: 'nqf5sj' }],
		['path', { d: 'm19 13 2-1a9 9 0 0 1-18 0l2 1', key: 'y7qv08' }],
		['path', { d: 'M9 11h6', key: '1fldmi' }],
		['circle', { cx: '12', cy: '4', r: '2', key: 'muu5ef' }],
	],
	py = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M16 16s-1.5-2-4-2-4 2-4 2', key: 'epbg0q' }],
		['path', { d: 'M7.5 8 10 9', key: 'olxxln' }],
		['path', { d: 'm14 9 2.5-1', key: '1j6cij' }],
		['path', { d: 'M9 10h.01', key: 'qbtxuw' }],
		['path', { d: 'M15 10h.01', key: '1qmjsl' }],
	],
	yy = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M8 15h8', key: '45n4r' }],
		['path', { d: 'M8 9h2', key: '1g203m' }],
		['path', { d: 'M14 9h2', key: '116p9w' }],
	],
	fy = [
		['path', { d: 'M2 12 7 2', key: '117k30' }],
		['path', { d: 'm7 12 5-10', key: '1tvx22' }],
		['path', { d: 'm12 12 5-10', key: 'ev1o1a' }],
		['path', { d: 'm17 12 5-10', key: '1e4ti3' }],
		['path', { d: 'M4.5 7h15', key: 'vlsxkz' }],
		['path', { d: 'M12 16v6', key: 'c8a4gj' }],
	],
	ky = [
		['path', { d: 'M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4', key: '1hjpb6' }],
		['path', { d: 'M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z', key: '1qn45f' }],
		['path', { d: 'M9 12v5', key: '3anwtq' }],
		['path', { d: 'M15 12v5', key: '5xh3zn' }],
		['path', { d: 'M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1', key: '1fi4x8' }],
	],
	gy = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'm14.31 8 5.74 9.94', key: '1y6ab4' }],
		['path', { d: 'M9.69 8h11.48', key: '1wxppr' }],
		['path', { d: 'm7.38 12 5.74-9.94', key: '1grp0k' }],
		['path', { d: 'M9.69 16 3.95 6.06', key: 'libnyf' }],
		['path', { d: 'M14.31 16H2.83', key: 'x5fava' }],
		['path', { d: 'm16.62 12-5.74 9.94', key: '1vwawt' }],
	],
	my = [
		['rect', { width: '20', height: '16', x: '2', y: '4', rx: '2', key: '18n3k1' }],
		['path', { d: 'M6 8h.01', key: 'x9i8wu' }],
		['path', { d: 'M10 8h.01', key: '1r9ogq' }],
		['path', { d: 'M14 8h.01', key: '1primd' }],
	],
	My = [
		['rect', { x: '2', y: '4', width: '20', height: '16', rx: '2', key: 'izxlao' }],
		['path', { d: 'M10 4v4', key: 'pp8u80' }],
		['path', { d: 'M2 8h20', key: 'd11cs7' }],
		['path', { d: 'M6 4v4', key: '1svtjw' }],
	],
	vy = [
		['path', { d: 'M12 6.528V3a1 1 0 0 1 1-1h0', key: '11qiee' }],
		[
			'path',
			{
				d: 'M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21',
				key: '110c12',
			},
		],
	],
	Iy = [
		['rect', { width: '20', height: '5', x: '2', y: '3', rx: '1', key: '1wp1u1' }],
		['path', { d: 'M4 8v11a2 2 0 0 0 2 2h2', key: 'tvwodi' }],
		['path', { d: 'M20 8v11a2 2 0 0 1-2 2h-2', key: '1gkqxj' }],
		['path', { d: 'm9 15 3-3 3 3', key: '1pd0qc' }],
		['path', { d: 'M12 12v9', key: '192myk' }],
	],
	xy = [
		['rect', { width: '20', height: '5', x: '2', y: '3', rx: '1', key: '1wp1u1' }],
		['path', { d: 'M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8', key: '1s80jp' }],
		['path', { d: 'm9.5 17 5-5', key: 'nakeu6' }],
		['path', { d: 'm9.5 12 5 5', key: '1hccrj' }],
	],
	wy = [
		['rect', { width: '20', height: '5', x: '2', y: '3', rx: '1', key: '1wp1u1' }],
		['path', { d: 'M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8', key: '1s80jp' }],
		['path', { d: 'M10 12h4', key: 'a56b0p' }],
	],
	Cy = [
		['path', { d: 'M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3', key: 'irtipd' }],
		[
			'path',
			{
				d: 'M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z',
				key: '1qyhux',
			},
		],
		['path', { d: 'M5 18v2', key: 'ppbyun' }],
		['path', { d: 'M19 18v2', key: 'gy7782' }],
	],
	Ly = [
		[
			'path',
			{
				d: 'M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z',
				key: '1hy3w3',
			},
		],
		['path', { d: 'M9 4h6', key: '10am2s' }],
	],
	by = [
		[
			'path',
			{
				d: 'M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z',
				key: '1eaqc3',
			},
		],
	],
	Sy = [
		[
			'path',
			{
				d: 'M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z',
				key: 'aztept',
			},
		],
	],
	Dy = [
		[
			'path',
			{
				d: 'M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z',
				key: 'p8w4w5',
			},
		],
		['path', { d: 'M20 9v6', key: '14roy0' }],
	],
	Ay = [
		[
			'path',
			{
				d: 'M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z',
				key: '67vhrh',
			},
		],
		['path', { d: 'M4 9v6', key: 'bns7oa' }],
	],
	Ey = [
		[
			'path',
			{
				d: 'M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z',
				key: '1232du',
			},
		],
	],
	Ty = [
		[
			'path',
			{
				d: 'M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z',
				key: 'pnzqmc',
			},
		],
		['path', { d: 'M9 20h6', key: 's66wpe' }],
	],
	Py = [
		[
			'path',
			{
				d: 'M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z',
				key: 'lh0v7k',
			},
		],
	],
	Ry = [
		['path', { d: 'm3 16 4 4 4-4', key: '1co6wj' }],
		['path', { d: 'M7 20V4', key: '1yoxec' }],
		['rect', { x: '15', y: '4', width: '4', height: '6', ry: '2', key: '1bwicg' }],
		['path', { d: 'M17 20v-6h-2', key: '1qp1so' }],
		['path', { d: 'M15 20h4', key: '1j968p' }],
	],
	Ny = [
		['path', { d: 'm3 16 4 4 4-4', key: '1co6wj' }],
		['path', { d: 'M7 20V4', key: '1yoxec' }],
		['path', { d: 'M17 10V4h-2', key: 'zcsr5x' }],
		['path', { d: 'M15 10h4', key: 'id2lce' }],
		['rect', { x: '15', y: '14', width: '4', height: '6', ry: '2', key: '33xykx' }],
	],
	_y = [
		['path', { d: 'm3 16 4 4 4-4', key: '1co6wj' }],
		['path', { d: 'M7 20V4', key: '1yoxec' }],
		['path', { d: 'M20 8h-5', key: '1vsyxs' }],
		['path', { d: 'M15 10V6.5a2.5 2.5 0 0 1 5 0V10', key: 'ag13bf' }],
		['path', { d: 'M15 14h5l-5 6h5', key: 'ur5jdg' }],
	],
	Hy = [
		['path', { d: 'M19 3H5', key: '1236rx' }],
		['path', { d: 'M12 21V7', key: 'gj6g52' }],
		['path', { d: 'm6 15 6 6 6-6', key: 'h15q88' }],
	],
	Oy = [
		['path', { d: 'M17 7 7 17', key: '15tmo1' }],
		['path', { d: 'M17 17H7V7', key: '1org7z' }],
	],
	Fy = [
		['path', { d: 'm3 16 4 4 4-4', key: '1co6wj' }],
		['path', { d: 'M7 20V4', key: '1yoxec' }],
		['path', { d: 'M11 4h4', key: '6d7r33' }],
		['path', { d: 'M11 8h7', key: 'djye34' }],
		['path', { d: 'M11 12h10', key: '1438ji' }],
	],
	jy = [
		['path', { d: 'm7 7 10 10', key: '1fmybs' }],
		['path', { d: 'M17 7v10H7', key: '6fjiku' }],
	],
	qy = [
		['path', { d: 'M12 2v14', key: 'jyx4ut' }],
		['path', { d: 'm19 9-7 7-7-7', key: '1oe3oy' }],
		['circle', { cx: '12', cy: '21', r: '1', key: 'o0uj5v' }],
	],
	Vy = [
		['path', { d: 'M12 17V3', key: '1cwfxf' }],
		['path', { d: 'm6 11 6 6 6-6', key: '12ii2o' }],
		['path', { d: 'M19 21H5', key: '150jfl' }],
	],
	zy = [
		['path', { d: 'm3 16 4 4 4-4', key: '1co6wj' }],
		['path', { d: 'M7 20V4', key: '1yoxec' }],
		['path', { d: 'm21 8-4-4-4 4', key: '1c9v7m' }],
		['path', { d: 'M17 4v16', key: '7dpous' }],
	],
	By = [
		['path', { d: 'm3 16 4 4 4-4', key: '1co6wj' }],
		['path', { d: 'M7 20V4', key: '1yoxec' }],
		['path', { d: 'M11 4h10', key: '1w87gc' }],
		['path', { d: 'M11 8h7', key: 'djye34' }],
		['path', { d: 'M11 12h4', key: 'q8tih4' }],
	],
	Uy = [
		['path', { d: 'm3 16 4 4 4-4', key: '1co6wj' }],
		['path', { d: 'M7 4v16', key: '1glfcx' }],
		['path', { d: 'M15 4h5l-5 6h5', key: '8asdl1' }],
		['path', { d: 'M15 20v-3.5a2.5 2.5 0 0 1 5 0V20', key: 'r6l5cz' }],
		['path', { d: 'M20 18h-5', key: '18j1r2' }],
	],
	Gy = [
		['path', { d: 'M12 5v14', key: 's699le' }],
		['path', { d: 'm19 12-7 7-7-7', key: '1idqje' }],
	],
	Wy = [
		['path', { d: 'm9 6-6 6 6 6', key: '7v63n9' }],
		['path', { d: 'M3 12h14', key: '13k4hi' }],
		['path', { d: 'M21 19V5', key: 'b4bplr' }],
	],
	$y = [
		['path', { d: 'M8 3 4 7l4 4', key: '9rb6wj' }],
		['path', { d: 'M4 7h16', key: '6tx8e3' }],
		['path', { d: 'm16 21 4-4-4-4', key: 'siv7j2' }],
		['path', { d: 'M20 17H4', key: 'h6l3hr' }],
	],
	Zy = [
		['path', { d: 'M3 19V5', key: 'rwsyhb' }],
		['path', { d: 'm13 6-6 6 6 6', key: '1yhaz7' }],
		['path', { d: 'M7 12h14', key: 'uoisry' }],
	],
	Qy = [
		['path', { d: 'm12 19-7-7 7-7', key: '1l729n' }],
		['path', { d: 'M19 12H5', key: 'x3x0zl' }],
	],
	Xy = [
		['path', { d: 'M3 5v14', key: '1nt18q' }],
		['path', { d: 'M21 12H7', key: '13ipq5' }],
		['path', { d: 'm15 18 6-6-6-6', key: '6tx3qv' }],
	],
	Ky = [
		['path', { d: 'm16 3 4 4-4 4', key: '1x1c3m' }],
		['path', { d: 'M20 7H4', key: 'zbl0bi' }],
		['path', { d: 'm8 21-4-4 4-4', key: 'h9nckh' }],
		['path', { d: 'M4 17h16', key: 'g4d7ey' }],
	],
	Yy = [
		['path', { d: 'M17 12H3', key: '8awo09' }],
		['path', { d: 'm11 18 6-6-6-6', key: '8c2y43' }],
		['path', { d: 'M21 5v14', key: 'nzette' }],
	],
	Jy = [
		['path', { d: 'M5 12h14', key: '1ays0h' }],
		['path', { d: 'm12 5 7 7-7 7', key: 'xquz4c' }],
	],
	ef = [
		['path', { d: 'm3 8 4-4 4 4', key: '11wl7u' }],
		['path', { d: 'M7 4v16', key: '1glfcx' }],
		['rect', { x: '15', y: '4', width: '4', height: '6', ry: '2', key: '1bwicg' }],
		['path', { d: 'M17 20v-6h-2', key: '1qp1so' }],
		['path', { d: 'M15 20h4', key: '1j968p' }],
	],
	tf = [
		['path', { d: 'm3 8 4-4 4 4', key: '11wl7u' }],
		['path', { d: 'M7 4v16', key: '1glfcx' }],
		['path', { d: 'M17 10V4h-2', key: 'zcsr5x' }],
		['path', { d: 'M15 10h4', key: 'id2lce' }],
		['rect', { x: '15', y: '14', width: '4', height: '6', ry: '2', key: '33xykx' }],
	],
	nf = [
		['path', { d: 'm3 8 4-4 4 4', key: '11wl7u' }],
		['path', { d: 'M7 4v16', key: '1glfcx' }],
		['path', { d: 'M20 8h-5', key: '1vsyxs' }],
		['path', { d: 'M15 10V6.5a2.5 2.5 0 0 1 5 0V10', key: 'ag13bf' }],
		['path', { d: 'M15 14h5l-5 6h5', key: 'ur5jdg' }],
	],
	af = [
		['path', { d: 'm21 16-4 4-4-4', key: 'f6ql7i' }],
		['path', { d: 'M17 20V4', key: '1ejh1v' }],
		['path', { d: 'm3 8 4-4 4 4', key: '11wl7u' }],
		['path', { d: 'M7 4v16', key: '1glfcx' }],
	],
	of = [
		['path', { d: 'm5 9 7-7 7 7', key: '1hw5ic' }],
		['path', { d: 'M12 16V2', key: 'ywoabb' }],
		['circle', { cx: '12', cy: '21', r: '1', key: 'o0uj5v' }],
	],
	rf = [
		['path', { d: 'm18 9-6-6-6 6', key: 'kcunyi' }],
		['path', { d: 'M12 3v14', key: '7cf3v8' }],
		['path', { d: 'M5 21h14', key: '11awu3' }],
	],
	sf = [
		['path', { d: 'M7 17V7h10', key: '11bw93' }],
		['path', { d: 'M17 17 7 7', key: '2786uv' }],
	],
	cf = [
		['path', { d: 'm3 8 4-4 4 4', key: '11wl7u' }],
		['path', { d: 'M7 4v16', key: '1glfcx' }],
		['path', { d: 'M11 12h4', key: 'q8tih4' }],
		['path', { d: 'M11 16h7', key: 'uosisv' }],
		['path', { d: 'M11 20h10', key: 'jvxblo' }],
	],
	df = [
		['path', { d: 'M7 7h10v10', key: '1tivn9' }],
		['path', { d: 'M7 17 17 7', key: '1vkiza' }],
	],
	lf = [
		['path', { d: 'M5 3h14', key: '7usisc' }],
		['path', { d: 'm18 13-6-6-6 6', key: '1kf1n9' }],
		['path', { d: 'M12 7v14', key: '1akyts' }],
	],
	uf = [
		['path', { d: 'm3 8 4-4 4 4', key: '11wl7u' }],
		['path', { d: 'M7 4v16', key: '1glfcx' }],
		['path', { d: 'M11 12h10', key: '1438ji' }],
		['path', { d: 'M11 16h7', key: 'uosisv' }],
		['path', { d: 'M11 20h4', key: '1krc32' }],
	],
	hf = [
		['path', { d: 'm3 8 4-4 4 4', key: '11wl7u' }],
		['path', { d: 'M7 4v16', key: '1glfcx' }],
		['path', { d: 'M15 4h5l-5 6h5', key: '8asdl1' }],
		['path', { d: 'M15 20v-3.5a2.5 2.5 0 0 1 5 0V20', key: 'r6l5cz' }],
		['path', { d: 'M20 18h-5', key: '18j1r2' }],
	],
	pf = [
		['path', { d: 'm5 12 7-7 7 7', key: 'hav0vg' }],
		['path', { d: 'M12 19V5', key: 'x0mq9r' }],
	],
	yf = [
		['path', { d: 'm4 6 3-3 3 3', key: '9aidw8' }],
		['path', { d: 'M7 17V3', key: '19qxw1' }],
		['path', { d: 'm14 6 3-3 3 3', key: '6iy689' }],
		['path', { d: 'M17 17V3', key: 'o0fmgi' }],
		['path', { d: 'M4 21h16', key: '1h09gz' }],
	],
	ff = [
		['path', { d: 'M12 6v12', key: '1vza4d' }],
		['path', { d: 'M17.196 9 6.804 15', key: '1ah31z' }],
		['path', { d: 'm6.804 9 10.392 6', key: '1b6pxd' }],
	],
	kf = [
		['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
		['path', { d: 'M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8', key: '7n84p3' }],
	],
	gf = [
		['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
		[
			'path',
			{
				d: 'M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z',
				key: '1l2ple',
			},
		],
		[
			'path',
			{
				d: 'M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z',
				key: '1wam0m',
			},
		],
	],
	mf = [
		['path', { d: 'M2 10v3', key: '1fnikh' }],
		['path', { d: 'M6 6v11', key: '11sgs0' }],
		['path', { d: 'M10 3v18', key: 'yhl04a' }],
		['path', { d: 'M14 8v7', key: '3a1oy3' }],
		['path', { d: 'M18 5v13', key: '123xd1' }],
		['path', { d: 'M22 10v3', key: '154ddg' }],
	],
	Mf = [
		[
			'path',
			{
				d: 'M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2',
				key: '57tc96',
			},
		],
	],
	vf = [
		[
			'path',
			{
				d: 'm15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526',
				key: '1yiouv',
			},
		],
		['circle', { cx: '12', cy: '8', r: '6', key: '1vp47v' }],
	],
	If = [
		['path', { d: 'M13.5 10.5 15 9', key: '1nsxvm' }],
		['path', { d: 'M4 4v15a1 1 0 0 0 1 1h15', key: '1w6lkd' }],
		['path', { d: 'M4.293 19.707 6 18', key: '3g1p8c' }],
		['path', { d: 'm9 15 1.5-1.5', key: '1xfbes' }],
	],
	xf = [
		['path', { d: 'M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5', key: '1u7htd' }],
		['path', { d: 'M15 12h.01', key: '1k8ypt' }],
		[
			'path',
			{
				d: 'M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1',
				key: '11xh7x',
			},
		],
		['path', { d: 'M9 12h.01', key: '157uk2' }],
	],
	wf = [
		['path', { d: 'm14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9', key: '5z9253' }],
		[
			'path',
			{
				d: 'M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z',
				key: '19zklq',
			},
		],
	],
	Cf = [
		['path', { d: 'M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z', key: '1ol0lm' }],
		['path', { d: 'M8 10h8', key: 'c7uz4u' }],
		['path', { d: 'M8 18h8', key: '1no2b1' }],
		['path', { d: 'M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6', key: '1fr6do' }],
		['path', { d: 'M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2', key: 'donm21' }],
	],
	Lf = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
		['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
	],
	bf = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['path', { d: 'M12 7v10', key: 'jspqdw' }],
		['path', { d: 'M15.4 10a4 4 0 1 0 0 4', key: '2eqtx8' }],
	],
	Sf = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['path', { d: 'm9 12 2 2 4-4', key: 'dzmm74' }],
	],
	Df = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['path', { d: 'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8', key: '1h4pet' }],
		['path', { d: 'M12 18V6', key: 'zqpxq5' }],
	],
	Af = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['path', { d: 'M7 12h5', key: 'gblrwe' }],
		['path', { d: 'M15 9.4a4 4 0 1 0 0 5.2', key: '1makmb' }],
	],
	Ef = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['path', { d: 'M8 8h8', key: '1bis0t' }],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
		['path', { d: 'm13 17-5-1h1a4 4 0 0 0 0-8', key: 'nu2bwa' }],
	],
	Tf = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['line', { x1: '12', x2: '12', y1: '16', y2: '12', key: '1y1yb1' }],
		['line', { x1: '12', x2: '12.01', y1: '8', y2: '8', key: '110wyk' }],
	],
	Pf = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['line', { x1: '8', x2: '16', y1: '12', y2: '12', key: '1jonct' }],
	],
	Rf = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['path', { d: 'm9 8 3 3v7', key: '17yadx' }],
		['path', { d: 'm12 11 3-3', key: 'p4cfq1' }],
		['path', { d: 'M9 12h6', key: '1c52cq' }],
		['path', { d: 'M9 16h6', key: '8wimt3' }],
	],
	Nf = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['path', { d: 'm15 9-6 6', key: '1uzhvr' }],
		['path', { d: 'M9 9h.01', key: '1q5me6' }],
		['path', { d: 'M15 15h.01', key: 'lqbp3k' }],
	],
	_f = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['line', { x1: '12', x2: '12', y1: '8', y2: '16', key: '10p56q' }],
		['line', { x1: '8', x2: '16', y1: '12', y2: '12', key: '1jonct' }],
	],
	Hf = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['path', { d: 'M8 12h4', key: 'qz6y1c' }],
		['path', { d: 'M10 16V9.5a2.5 2.5 0 0 1 5 0', key: '3mlbjk' }],
		['path', { d: 'M8 16h7', key: 'sbedsn' }],
	],
	Of = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', key: '1u773s' }],
		['line', { x1: '12', x2: '12.01', y1: '17', y2: '17', key: 'io3f8k' }],
	],
	Ff = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['path', { d: 'M9 16h5', key: '1syiyw' }],
		['path', { d: 'M9 12h5a2 2 0 1 0 0-4h-3v9', key: '1ge9c1' }],
	],
	jf = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['path', { d: 'M11 17V8h4', key: '1bfq6y' }],
		['path', { d: 'M11 12h3', key: '2eqnfz' }],
		['path', { d: 'M9 16h4', key: '1skf3a' }],
	],
	qf = [
		['path', { d: 'M11 7v10a5 5 0 0 0 5-5', key: '1ja3ih' }],
		['path', { d: 'm15 8-6 3', key: '4x0uwz' }],
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76',
				key: '18242g',
			},
		],
	],
	Vf = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
		['line', { x1: '15', x2: '9', y1: '9', y2: '15', key: 'f7djnv' }],
		['line', { x1: '9', x2: '15', y1: '9', y2: '15', key: '1shsy8' }],
	],
	zf = [
		[
			'path',
			{
				d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
				key: '3c2336',
			},
		],
	],
	Bf = [
		['path', { d: 'M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2', key: '4irg2o' }],
		['path', { d: 'M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10', key: '14fcyx' }],
		['rect', { width: '13', height: '8', x: '8', y: '6', rx: '1', key: 'o6oiis' }],
		['circle', { cx: '18', cy: '20', r: '2', key: 't9985n' }],
		['circle', { cx: '9', cy: '20', r: '2', key: 'e5v82j' }],
	],
	Uf = [
		['path', { d: 'M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1', key: '2nz4b' }],
		['path', { d: 'M12 6a2 2 0 0 1 2 2', key: '7y7d82' }],
		['path', { d: 'M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0', key: 'vqb5s3' }],
	],
	Gf = [
		['path', { d: 'M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5', key: '1cscit' }],
		[
			'path',
			{
				d: 'M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z',
				key: '1y1nbv',
			},
		],
	],
	Wf = [
		['path', { d: 'M4.929 4.929 19.07 19.071', key: '196cmz' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	$f = [
		['path', { d: 'M10 10.01h.01', key: '1e9xi7' }],
		['path', { d: 'M10 14.01h.01', key: 'ac23bv' }],
		['path', { d: 'M14 10.01h.01', key: '2wfrvf' }],
		['path', { d: 'M14 14.01h.01', key: '8tw8yn' }],
		['path', { d: 'M18 6v11.5', key: 'dkbidh' }],
		['path', { d: 'M6 6v12', key: 'vkc79e' }],
		['rect', { x: '2', y: '6', width: '20', height: '12', rx: '2', key: '1wpnh2' }],
	],
	Zf = [
		['path', { d: 'M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5', key: 'x6cv4u' }],
		['path', { d: 'm16 19 3 3 3-3', key: '1ibux0' }],
		['path', { d: 'M18 12h.01', key: 'yjnet6' }],
		['path', { d: 'M19 16v6', key: 'tddt3s' }],
		['path', { d: 'M6 12h.01', key: 'c2rlol' }],
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
	],
	Qf = [
		['path', { d: 'M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5', key: 'x6cv4u' }],
		['path', { d: 'M18 12h.01', key: 'yjnet6' }],
		['path', { d: 'M19 22v-6', key: 'qhmiwi' }],
		['path', { d: 'm22 19-3-3-3 3', key: 'rn6bg2' }],
		['path', { d: 'M6 12h.01', key: 'c2rlol' }],
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
	],
	Xf = [
		['path', { d: 'M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5', key: '16nib6' }],
		['path', { d: 'm17 17 5 5', key: 'p7ous7' }],
		['path', { d: 'M18 12h.01', key: 'yjnet6' }],
		['path', { d: 'm22 17-5 5', key: 'gqnmv0' }],
		['path', { d: 'M6 12h.01', key: 'c2rlol' }],
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
	],
	Kf = [
		['rect', { width: '20', height: '12', x: '2', y: '6', rx: '2', key: '9lu3g6' }],
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
		['path', { d: 'M6 12h.01M18 12h.01', key: '113zkx' }],
	],
	Yf = [
		['path', { d: 'M3 5v14', key: '1nt18q' }],
		['path', { d: 'M8 5v14', key: '1ybrkv' }],
		['path', { d: 'M12 5v14', key: 's699le' }],
		['path', { d: 'M17 5v14', key: 'ycjyhj' }],
		['path', { d: 'M21 5v14', key: 'nzette' }],
	],
	Jf = [
		['path', { d: 'M10 3a41 41 0 0 0 0 18', key: '1qcnzb' }],
		['path', { d: 'M14 3a41 41 0 0 1 0 18', key: '547vd4' }],
		[
			'path',
			{
				d: 'M17 3a2 2 0 0 1 1.68.92 15.25 15.25 0 0 1 0 16.16A2 2 0 0 1 17 21H7a2 2 0 0 1-1.68-.92 15.25 15.25 0 0 1 0-16.16A2 2 0 0 1 7 3z',
				key: '1wepyy',
			},
		],
		['path', { d: 'M3.84 17h16.32', key: '1wh981' }],
		['path', { d: 'M3.84 7h16.32', key: '19jf4x' }],
	],
	ek = [
		['path', { d: 'M10 4 8 6', key: '1rru8s' }],
		['path', { d: 'M17 19v2', key: 'ts1sot' }],
		['path', { d: 'M2 12h20', key: '9i4pu4' }],
		['path', { d: 'M7 19v2', key: '12npes' }],
		['path', { d: 'M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5', key: '14ym8i' }],
	],
	tk = [
		['path', { d: 'M4 20h16', key: '14thso' }],
		['path', { d: 'm6 16 6-12 6 12', key: '1b4byz' }],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
	],
	nk = [
		['path', { d: 'm11 7-3 5h4l-3 5', key: 'b4a64w' }],
		['path', { d: 'M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935', key: 'lre1cr' }],
		['path', { d: 'M22 14v-4', key: '14q9d5' }],
		['path', { d: 'M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936', key: '13q5k0' }],
	],
	ak = [
		['path', { d: 'M10 10v4', key: '1mb2ec' }],
		['path', { d: 'M14 10v4', key: '1nt88p' }],
		['path', { d: 'M22 14v-4', key: '14q9d5' }],
		['path', { d: 'M6 10v4', key: '1n77qd' }],
		['rect', { x: '2', y: '6', width: '16', height: '12', rx: '2', key: '13zb55' }],
	],
	ok = [
		['path', { d: 'M22 14v-4', key: '14q9d5' }],
		['path', { d: 'M6 14v-4', key: '14a6bd' }],
		['rect', { x: '2', y: '6', width: '16', height: '12', rx: '2', key: '13zb55' }],
	],
	rk = [
		['path', { d: 'M10 14v-4', key: 'suye4c' }],
		['path', { d: 'M22 14v-4', key: '14q9d5' }],
		['path', { d: 'M6 14v-4', key: '14a6bd' }],
		['rect', { x: '2', y: '6', width: '16', height: '12', rx: '2', key: '13zb55' }],
	],
	ik = [
		['path', { d: 'M10 9v6', key: '17i7lo' }],
		['path', { d: 'M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605', key: 'o09yah' }],
		['path', { d: 'M22 14v-4', key: '14q9d5' }],
		['path', { d: 'M7 12h6', key: 'iekk3h' }],
		['path', { d: 'M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606', key: 'xyqvf1' }],
	],
	sk = [
		['path', { d: 'M10 17h.01', key: 'nbq80n' }],
		['path', { d: 'M10 7v6', key: 'nne03l' }],
		['path', { d: 'M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2', key: '1m83kb' }],
		['path', { d: 'M22 14v-4', key: '14q9d5' }],
		['path', { d: 'M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2', key: 'h8lgfh' }],
	],
	ck = [
		['path', { d: 'M 22 14 L 22 10', key: 'nqc4tb' }],
		['rect', { x: '2', y: '6', width: '16', height: '12', rx: '2', key: '13zb55' }],
	],
	dk = [
		['path', { d: 'M4.5 3h15', key: 'c7n0jr' }],
		['path', { d: 'M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3', key: 'm1uhx7' }],
		['path', { d: 'M6 14h12', key: '4cwo0f' }],
	],
	lk = [
		['path', { d: 'M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1', key: 'bq3udt' }],
		['path', { d: 'M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66', key: '17ccse' }],
		['path', { d: 'M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04', key: '18zqgq' }],
		['line', { x1: '2', x2: '22', y1: '2', y2: '22', key: 'a6p6uj' }],
	],
	uk = [
		[
			'path',
			{
				d: 'M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z',
				key: '1tvzk7',
			},
		],
		['path', { d: 'M5.341 10.62a4 4 0 1 0 5.279-5.28', key: '2cyri2' }],
	],
	hk = [
		['path', { d: 'M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8', key: '1k78r4' }],
		['path', { d: 'M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4', key: 'fb3tl2' }],
		['path', { d: 'M12 4v6', key: '1dcgq2' }],
		['path', { d: 'M2 18h20', key: 'ajqnye' }],
	],
	pk = [
		['path', { d: 'M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8', key: '1wm6mi' }],
		['path', { d: 'M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4', key: '4k93s5' }],
		['path', { d: 'M3 18h18', key: '1h113x' }],
	],
	yk = [
		['path', { d: 'M2 4v16', key: 'vw9hq8' }],
		['path', { d: 'M2 8h18a2 2 0 0 1 2 2v10', key: '1dgv2r' }],
		['path', { d: 'M2 17h20', key: '18nfp3' }],
		['path', { d: 'M6 8v9', key: '1yriud' }],
	],
	fk = [
		[
			'path',
			{
				d: 'M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3',
				key: 'cisjcv',
			},
		],
		[
			'path',
			{
				d: 'm18.5 6 2.19 4.5a6.48 6.48 0 0 1-2.29 7.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5',
				key: '5byaag',
			},
		],
		['circle', { cx: '12.5', cy: '8.5', r: '2.5', key: '9738u8' }],
	],
	kk = [
		['path', { d: 'M13 13v5', key: 'igwfh0' }],
		['path', { d: 'M17 11.47V8', key: '16yw0g' }],
		['path', { d: 'M17 11h1a3 3 0 0 1 2.745 4.211', key: '1xbt65' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3', key: 'c55o3e' }],
		['path', { d: 'M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268', key: '1ydug7' }],
		[
			'path',
			{
				d: 'M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12',
				key: 'q81o7q',
			},
		],
		['path', { d: 'M9 14.6V18', key: '20ek98' }],
	],
	gk = [
		['path', { d: 'M17 11h1a3 3 0 0 1 0 6h-1', key: '1yp76v' }],
		['path', { d: 'M9 12v6', key: '1u1cab' }],
		['path', { d: 'M13 12v6', key: '1sugkk' }],
		[
			'path',
			{
				d: 'M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z',
				key: '1510fo',
			},
		],
		['path', { d: 'M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8', key: '19jb7n' }],
	],
	mk = [
		['path', { d: 'M10.268 21a2 2 0 0 0 3.464 0', key: 'vwvbt9' }],
		[
			'path',
			{
				d: 'M13.916 2.314A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.74 7.327A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673 9 9 0 0 1-.585-.665',
				key: '1tip0g',
			},
		],
		['circle', { cx: '18', cy: '8', r: '3', key: '1g0gzu' }],
	],
	Mk = [
		['path', { d: 'M18.518 17.347A7 7 0 0 1 14 19', key: '1emhpo' }],
		['path', { d: 'M18.8 4A11 11 0 0 1 20 9', key: '127b67' }],
		['path', { d: 'M9 9h.01', key: '1q5me6' }],
		['circle', { cx: '20', cy: '16', r: '2', key: '1v9bxh' }],
		['circle', { cx: '9', cy: '9', r: '7', key: 'p2h5vp' }],
		['rect', { x: '4', y: '16', width: '10', height: '6', rx: '2', key: 'bfnviv' }],
	],
	vk = [
		['path', { d: 'M10.268 21a2 2 0 0 0 3.464 0', key: 'vwvbt9' }],
		['path', { d: 'M15 8h6', key: '8ybuxh' }],
		[
			'path',
			{
				d: 'M16.243 3.757A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673A9.4 9.4 0 0 1 18.667 12',
				key: 'bdwj86',
			},
		],
	],
	Ik = [
		['path', { d: 'M10.268 21a2 2 0 0 0 3.464 0', key: 'vwvbt9' }],
		['path', { d: 'M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742', key: '178tsu' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05', key: '1hqiys' }],
	],
	xk = [
		['path', { d: 'M10.268 21a2 2 0 0 0 3.464 0', key: 'vwvbt9' }],
		['path', { d: 'M15 8h6', key: '8ybuxh' }],
		['path', { d: 'M18 5v6', key: 'g5ayrv' }],
		[
			'path',
			{
				d: 'M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332',
				key: '1abcvy',
			},
		],
	],
	wk = [
		['path', { d: 'M10.268 21a2 2 0 0 0 3.464 0', key: 'vwvbt9' }],
		['path', { d: 'M22 8c0-2.3-.8-4.3-2-6', key: '5bb3ad' }],
		[
			'path',
			{
				d: 'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326',
				key: '11g9vi',
			},
		],
		['path', { d: 'M4 2C2.8 3.7 2 5.7 2 8', key: 'tap9e0' }],
	],
	Ck = [
		['path', { d: 'M10.268 21a2 2 0 0 0 3.464 0', key: 'vwvbt9' }],
		[
			'path',
			{
				d: 'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326',
				key: '11g9vi',
			},
		],
	],
	Lk = [
		['rect', { width: '13', height: '7', x: '3', y: '3', rx: '1', key: '11xb64' }],
		['path', { d: 'm22 15-3-3 3-3', key: '26chmm' }],
		['rect', { width: '13', height: '7', x: '3', y: '14', rx: '1', key: 'k6ky7n' }],
	],
	bk = [
		['rect', { width: '13', height: '7', x: '8', y: '3', rx: '1', key: 'pkso9a' }],
		['path', { d: 'm2 9 3 3-3 3', key: '1agib5' }],
		['rect', { width: '13', height: '7', x: '8', y: '14', rx: '1', key: '1q5fc1' }],
	],
	Sk = [
		['rect', { width: '7', height: '13', x: '3', y: '3', rx: '1', key: '1fdu0f' }],
		['path', { d: 'm9 22 3-3 3 3', key: '17z65a' }],
		['rect', { width: '7', height: '13', x: '14', y: '3', rx: '1', key: '1squn4' }],
	],
	Dk = [
		['rect', { width: '7', height: '13', x: '3', y: '8', rx: '1', key: '1fjrkv' }],
		['path', { d: 'm15 2-3 3-3-3', key: '1uh6eb' }],
		['rect', { width: '7', height: '13', x: '14', y: '8', rx: '1', key: 'w3fjg8' }],
	],
	Ak = [
		[
			'path',
			{
				d: 'M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1',
				key: '1pmlyh',
			},
		],
		['path', { d: 'M15 14a5 5 0 0 0-7.584 2', key: '5rb254' }],
		['path', { d: 'M9.964 6.825C8.019 7.977 9.5 13 8 15', key: 'kbvsx9' }],
	],
	Ek = [
		['circle', { cx: '18.5', cy: '17.5', r: '3.5', key: '15x4ox' }],
		['circle', { cx: '5.5', cy: '17.5', r: '3.5', key: '1noe27' }],
		['circle', { cx: '15', cy: '5', r: '1', key: '19l28e' }],
		['path', { d: 'M12 17.5V14l-3-3 4-3 2 3h2', key: '1npguv' }],
	],
	Tk = [
		['rect', { x: '14', y: '14', width: '4', height: '6', rx: '2', key: 'p02svl' }],
		['rect', { x: '6', y: '4', width: '4', height: '6', rx: '2', key: 'xm4xkj' }],
		['path', { d: 'M6 20h4', key: '1i6q5t' }],
		['path', { d: 'M14 10h4', key: 'ru81e7' }],
		['path', { d: 'M6 14h2v6', key: '16z9wg' }],
		['path', { d: 'M14 4h2v6', key: '1idq9u' }],
	],
	Pk = [
		['path', { d: 'M10 10h4', key: 'tcdvrf' }],
		['path', { d: 'M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3', key: '3apit1' }],
		[
			'path',
			{
				d: 'M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z',
				key: 'rhpgnw',
			},
		],
		['path', { d: 'M 22 16 L 2 16', key: '14lkq7' }],
		[
			'path',
			{
				d: 'M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z',
				key: '104b3k',
			},
		],
		['path', { d: 'M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3', key: '14fczp' }],
	],
	Rk = [
		['circle', { cx: '12', cy: '11.9', r: '2', key: 'e8h31w' }],
		['path', { d: 'M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6', key: '17bolr' }],
		['path', { d: 'm8.9 10.1 1.4.8', key: '15ezny' }],
		['path', { d: 'M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5', key: 'wtwa5u' }],
		['path', { d: 'm15.1 10.1-1.4.8', key: '1r0b28' }],
		['path', { d: 'M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2', key: 'm7qszh' }],
		['path', { d: 'M12 13.9v1.6', key: 'zfyyim' }],
		['path', { d: 'M13.5 5.4c-1-.2-2-.2-3 0', key: '1bi9q0' }],
		['path', { d: 'M17 16.4c.7-.7 1.2-1.6 1.5-2.5', key: '1rhjqw' }],
		['path', { d: 'M5.5 13.9c.3.9.8 1.8 1.5 2.5', key: '8gsud3' }],
	],
	Nk = [
		['path', { d: 'M16 7h.01', key: '1kdx03' }],
		['path', { d: 'M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20', key: 'oj1oa8' }],
		['path', { d: 'm20 7 2 .5-2 .5', key: '12nv4d' }],
		['path', { d: 'M10 18v3', key: '1yea0a' }],
		['path', { d: 'M14 17.75V21', key: '1pymcb' }],
		['path', { d: 'M7 18a6 6 0 0 0 3.84-10.61', key: '1npnn0' }],
	],
	_k = [
		['path', { d: 'M12 18v4', key: 'jadmvz' }],
		['path', { d: 'm17 18 1.956-11.468', key: 'l5n2ro' }],
		['path', { d: 'm3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8', key: '1sy6n7' }],
		['path', { d: 'M4 18h16', key: '19g7jn' }],
		['path', { d: 'M7 18 5.044 6.532', key: '1uqdf2' }],
		['circle', { cx: '12', cy: '10', r: '2', key: '1yojzk' }],
	],
	Hk = [
		[
			'path',
			{
				d: 'M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727',
				key: 'yr8idg',
			},
		],
	],
	Ok = [
		['circle', { cx: '9', cy: '9', r: '7', key: 'p2h5vp' }],
		['circle', { cx: '15', cy: '15', r: '7', key: '19ennj' }],
	],
	Fk = [
		['path', { d: 'M3 3h18', key: 'o7r712' }],
		['path', { d: 'M20 7H8', key: 'gd2fo2' }],
		['path', { d: 'M20 11H8', key: '1ynp89' }],
		['path', { d: 'M10 19h10', key: '19hjk5' }],
		['path', { d: 'M8 15h12', key: '1yqzne' }],
		['path', { d: 'M4 3v14', key: 'fggqzn' }],
		['circle', { cx: '4', cy: '19', r: '2', key: 'p3m9r0' }],
	],
	jk = [
		[
			'path',
			{
				d: 'M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2',
				key: '1ah6g2',
			},
		],
		['rect', { x: '14', y: '2', width: '8', height: '8', rx: '1', key: '88lufb' }],
	],
	qk = [
		['path', { d: 'm7 7 10 10-5 5V2l5 5L7 17', key: '1q5490' }],
		['line', { x1: '18', x2: '21', y1: '12', y2: '12', key: '1rsjjs' }],
		['line', { x1: '3', x2: '6', y1: '12', y2: '12', key: '11yl8c' }],
	],
	Vk = [
		['path', { d: 'm17 17-5 5V12l-5 5', key: 'v5aci6' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M14.5 9.5 17 7l-5-5v4.5', key: '1kddfz' }],
	],
	zk = [
		['path', { d: 'm7 7 10 10-5 5V2l5 5L7 17', key: '1q5490' }],
		['path', { d: 'M20.83 14.83a4 4 0 0 0 0-5.66', key: 'k8tn1j' }],
		['path', { d: 'M18 12h.01', key: 'yjnet6' }],
	],
	Bk = [['path', { d: 'm7 7 10 10-5 5V2l5 5L7 17', key: '1q5490' }]],
	Uk = [['path', { d: 'M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8', key: 'mg9rjx' }]],
	Gk = [
		[
			'path',
			{
				d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
				key: 'yt0hxn',
			},
		],
		['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
	],
	Wk = [
		['circle', { cx: '11', cy: '13', r: '9', key: 'hd149' }],
		[
			'path',
			{ d: 'M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95', key: 'jp4j1b' },
		],
		['path', { d: 'm22 2-1.5 1.5', key: 'ay92ug' }],
	],
	$k = [
		[
			'path',
			{
				d: 'M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z',
				key: 'w610uw',
			},
		],
	],
	Zk = [
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
		['path', { d: 'm8 13 4-7 4 7', key: '4rari8' }],
		['path', { d: 'M9.1 11h5.7', key: '1gkovt' }],
	],
	Qk = [
		['path', { d: 'M12 13h.01', key: 'y0uutt' }],
		['path', { d: 'M12 6v3', key: '1m4b9j' }],
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
	],
	Xk = [
		['path', { d: 'M12 6v7', key: '1f6ttz' }],
		['path', { d: 'M16 8v3', key: 'gejaml' }],
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
		['path', { d: 'M8 8v3', key: '1qzp49' }],
	],
	Kk = [
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
		['path', { d: 'm9 9.5 2 2 4-4', key: '1dth82' }],
	],
	Yk = [
		['path', { d: 'M5 7a2 2 0 0 0-2 2v11', key: '1yhqjt' }],
		['path', { d: 'M5.803 18H5a2 2 0 0 0 0 4h9.5a.5.5 0 0 0 .5-.5V21', key: 'edzzo5' }],
		[
			'path',
			{ d: 'M9 15V4a2 2 0 0 1 2-2h9.5a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H11a2 2 0 0 1 0-4h10', key: '1nwzrg' },
		],
	],
	Jk = [
		['path', { d: 'M12 17h1.5', key: '1gkc67' }],
		['path', { d: 'M12 22h1.5', key: '1my7sn' }],
		['path', { d: 'M12 2h1.5', key: '19tvb7' }],
		['path', { d: 'M17.5 22H19a1 1 0 0 0 1-1', key: '10akbh' }],
		['path', { d: 'M17.5 2H19a1 1 0 0 1 1 1v1.5', key: '1vrfjs' }],
		['path', { d: 'M20 14v3h-2.5', key: '1naeju' }],
		['path', { d: 'M20 8.5V10', key: '1ctpfu' }],
		['path', { d: 'M4 10V8.5', key: '1o3zg5' }],
		['path', { d: 'M4 19.5V14', key: 'ob81pf' }],
		['path', { d: 'M4 4.5A2.5 2.5 0 0 1 6.5 2H8', key: 's8vcyb' }],
		['path', { d: 'M8 22H6.5a1 1 0 0 1 0-5H8', key: '1cu73q' }],
	],
	e4 = [
		['path', { d: 'M12 13V7', key: 'h0r20n' }],
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
		['path', { d: 'm9 10 3 3 3-3', key: 'zt5b4y' }],
	],
	t4 = [
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
		['path', { d: 'M8 12v-2a4 4 0 0 1 8 0v2', key: '1vsqkj' }],
		['circle', { cx: '15', cy: '12', r: '1', key: '1tmaij' }],
		['circle', { cx: '9', cy: '12', r: '1', key: '1vctgf' }],
	],
	n4 = [
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
		[
			'path',
			{
				d: 'M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z',
				key: '9v40y5',
			},
		],
	],
	a4 = [
		['path', { d: 'm20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17', key: 'q6ojf0' }],
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
		['circle', { cx: '10', cy: '8', r: '2', key: '2qkj4p' }],
	],
	o4 = [
		['path', { d: 'm19 3 1 1', key: 'ze14oc' }],
		['path', { d: 'm20 2-4.5 4.5', key: '1sppr8' }],
		['path', { d: 'M20 7.898V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20', key: '1xzogz' }],
		['path', { d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2h7.844', key: 'vtdg6h' }],
		['circle', { cx: '14', cy: '8', r: '2', key: 'u49eql' }],
	],
	r4 = [
		['path', { d: 'M18 6V4a2 2 0 1 0-4 0v2', key: '1aquzs' }],
		['path', { d: 'M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20', key: '1rkj32' }],
		['path', { d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10', key: '18wgow' }],
		['rect', { x: '12', y: '6', width: '8', height: '5', rx: '1', key: '73l30o' }],
	],
	i4 = [
		['path', { d: 'M10 2v8l3-3 3 3V2', key: 'sqw3rj' }],
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
	],
	s4 = [
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
		['path', { d: 'M9 10h6', key: '9gxzsh' }],
	],
	c4 = [
		['path', { d: 'M12 21V7', key: 'gj6g52' }],
		['path', { d: 'm16 12 2 2 4-4', key: 'mdajum' }],
		[
			'path',
			{
				d: 'M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3',
				key: '8arnkb',
			},
		],
	],
	d4 = [
		['path', { d: 'M12 7v14', key: '1akyts' }],
		['path', { d: 'M16 12h2', key: '7q9ll5' }],
		['path', { d: 'M16 8h2', key: 'msurwy' }],
		[
			'path',
			{
				d: 'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z',
				key: 'ruj8y',
			},
		],
		['path', { d: 'M6 12h2', key: '32wvfc' }],
		['path', { d: 'M6 8h2', key: '30oboj' }],
	],
	l4 = [
		['path', { d: 'M12 7v14', key: '1akyts' }],
		[
			'path',
			{
				d: 'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z',
				key: 'ruj8y',
			},
		],
	],
	u4 = [
		['path', { d: 'M12 7v6', key: 'lw1j43' }],
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
		['path', { d: 'M9 10h6', key: '9gxzsh' }],
	],
	h4 = [
		['path', { d: 'M11 22H5.5a1 1 0 0 1 0-5h4.501', key: 'mcbepb' }],
		['path', { d: 'm21 22-1.879-1.878', key: '12q7x1' }],
		['path', { d: 'M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8', key: 'olfd5n' }],
		['circle', { cx: '17', cy: '18', r: '3', key: '82mm0e' }],
	],
	p4 = [
		['path', { d: 'M10 13h4', key: 'ytezjc' }],
		['path', { d: 'M12 6v7', key: '1f6ttz' }],
		['path', { d: 'M16 8V6H8v2', key: 'x8j6u4' }],
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
	],
	y4 = [
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
		['path', { d: 'M8 11h8', key: 'vwpz6n' }],
		['path', { d: 'M8 7h6', key: '1f0q6e' }],
	],
	f4 = [
		['path', { d: 'M12 13V7', key: 'h0r20n' }],
		['path', { d: 'M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20', key: '161d7n' }],
		['path', { d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2', key: '1lorq7' }],
		['path', { d: 'm9 10 3-3 3 3', key: '11gsxs' }],
		['path', { d: 'm9 5 3-3 3 3', key: 'l8vdw6' }],
	],
	k4 = [
		['path', { d: 'M12 13V7', key: 'h0r20n' }],
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
		['path', { d: 'm9 10 3-3 3 3', key: '11gsxs' }],
	],
	g4 = [
		['path', { d: 'M15 13a3 3 0 1 0-6 0', key: '10j68g' }],
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
		['circle', { cx: '12', cy: '8', r: '2', key: '1822b1' }],
	],
	m4 = [
		['path', { d: 'm14.5 7-5 5', key: 'dy991v' }],
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
		['path', { d: 'm9.5 7 5 5', key: 's45iea' }],
	],
	M4 = [
		[
			'path',
			{
				d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
				key: 'k3hazp',
			},
		],
	],
	v4 = [
		['path', { d: 'm19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z', key: '169p4p' }],
		['path', { d: 'm9 10 2 2 4-4', key: '1gnqz4' }],
	],
	I4 = [
		['path', { d: 'm19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z', key: '1fy3hk' }],
		['line', { x1: '15', x2: '9', y1: '10', y2: '10', key: '1gty7f' }],
	],
	x4 = [
		['path', { d: 'm19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z', key: '1fy3hk' }],
		['line', { x1: '12', x2: '12', y1: '7', y2: '13', key: '1cppfj' }],
		['line', { x1: '15', x2: '9', y1: '10', y2: '10', key: '1gty7f' }],
	],
	w4 = [
		['path', { d: 'm19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z', key: '169p4p' }],
		['path', { d: 'm14.5 7.5-5 5', key: '3lb6iw' }],
		['path', { d: 'm9.5 7.5 5 5', key: 'ko136h' }],
	],
	C4 = [['path', { d: 'm19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z', key: '1fy3hk' }]],
	L4 = [
		['path', { d: 'M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4', key: 'vvzvr1' }],
		['path', { d: 'M8 8v1', key: 'xcqmfk' }],
		['path', { d: 'M12 8v1', key: '1rj8u4' }],
		['path', { d: 'M16 8v1', key: '1q12zr' }],
		['rect', { width: '20', height: '12', x: '2', y: '9', rx: '2', key: 'igpb89' }],
		['circle', { cx: '8', cy: '15', r: '2', key: 'fa4a8s' }],
		['circle', { cx: '16', cy: '15', r: '2', key: '14c3ya' }],
	],
	b4 = [
		['path', { d: 'M12 6V2H8', key: '1155em' }],
		['path', { d: 'M15 11v2', key: 'i11awn' }],
		['path', { d: 'M2 12h2', key: '1t8f8n' }],
		['path', { d: 'M20 12h2', key: '1q8mjw' }],
		[
			'path',
			{
				d: 'M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z',
				key: '11gyqh',
			},
		],
		['path', { d: 'M9 11v2', key: '1ueba0' }],
	],
	S4 = [
		['path', { d: 'M13.67 8H18a2 2 0 0 1 2 2v4.33', key: '7az073' }],
		['path', { d: 'M2 14h2', key: 'vft8re' }],
		['path', { d: 'M20 14h2', key: '4cs60a' }],
		['path', { d: 'M22 22 2 2', key: '1r8tn9' }],
		['path', { d: 'M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586', key: 's09a7a' }],
		['path', { d: 'M9 13v2', key: 'rq6x2g' }],
		['path', { d: 'M9.67 4H12v2.33', key: '110xot' }],
	],
	D4 = [
		['path', { d: 'M12 8V4H8', key: 'hb8ula' }],
		['rect', { width: '16', height: '12', x: '4', y: '8', rx: '2', key: 'enze0r' }],
		['path', { d: 'M2 14h2', key: 'vft8re' }],
		['path', { d: 'M20 14h2', key: '4cs60a' }],
		['path', { d: 'M15 13v2', key: '1xurst' }],
		['path', { d: 'M9 13v2', key: 'rq6x2g' }],
	],
	A4 = [
		[
			'path',
			{
				d: 'M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z',
				key: 'blqgoc',
			},
		],
		['path', { d: 'M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4', key: '43jbee' }],
	],
	E4 = [
		['path', { d: 'M17 3h4v4', key: '19p9u1' }],
		['path', { d: 'M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17', key: '12t3w9' }],
		['path', { d: 'M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05', key: 'ogng5l' }],
		[
			'path',
			{
				d: 'M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z',
				key: '8v3fy2',
			},
		],
		['path', { d: 'M9.707 14.293 21 3', key: 'ydm3bn' }],
	],
	T4 = [
		[
			'path',
			{
				d: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z',
				key: 'hh9hay',
			},
		],
		['path', { d: 'm3.3 7 8.7 5 8.7-5', key: 'g66t2b' }],
		['path', { d: 'M12 22V12', key: 'd0xqtd' }],
	],
	P4 = [
		[
			'path',
			{
				d: 'M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z',
				key: 'lc1i9w',
			},
		],
		['path', { d: 'm7 16.5-4.74-2.85', key: '1o9zyk' }],
		['path', { d: 'm7 16.5 5-3', key: 'va8pkn' }],
		['path', { d: 'M7 16.5v5.17', key: 'jnp8gn' }],
		[
			'path',
			{
				d: 'M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z',
				key: '8zsnat',
			},
		],
		['path', { d: 'm17 16.5-5-3', key: '8arw3v' }],
		['path', { d: 'm17 16.5 4.74-2.85', key: '8rfmw' }],
		['path', { d: 'M17 16.5v5.17', key: 'k6z78m' }],
		[
			'path',
			{
				d: 'M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z',
				key: '1xygjf',
			},
		],
		['path', { d: 'M12 8 7.26 5.15', key: '1vbdud' }],
		['path', { d: 'm12 8 4.74-2.85', key: '3rx089' }],
		['path', { d: 'M12 13.5V8', key: '1io7kd' }],
	],
	R4 = [
		['path', { d: 'M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1', key: 'ezmyqa' }],
		['path', { d: 'M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1', key: 'e1hn23' }],
	],
	N4 = [
		['path', { d: 'M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3', key: '1kt8lf' }],
		['path', { d: 'M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3', key: 'gduv9' }],
	],
	_4 = [
		[
			'path',
			{ d: 'M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z', key: 'l5xja' },
		],
		['path', { d: 'M9 13a4.5 4.5 0 0 0 3-4', key: '10igwf' }],
		['path', { d: 'M6.003 5.125A3 3 0 0 0 6.401 6.5', key: '105sqy' }],
		['path', { d: 'M3.477 10.896a4 4 0 0 1 .585-.396', key: 'ql3yin' }],
		['path', { d: 'M6 18a4 4 0 0 1-1.967-.516', key: '2e4loj' }],
		['path', { d: 'M12 13h4', key: '1ku699' }],
		['path', { d: 'M12 18h6a2 2 0 0 1 2 2v1', key: '105ag5' }],
		['path', { d: 'M12 8h8', key: '1lhi5i' }],
		['path', { d: 'M16 8V5a2 2 0 0 1 2-2', key: 'u6izg6' }],
		['circle', { cx: '16', cy: '13', r: '.5', key: 'ry7gng' }],
		['circle', { cx: '18', cy: '3', r: '.5', key: '1aiba7' }],
		['circle', { cx: '20', cy: '21', r: '.5', key: 'yhc1fs' }],
		['circle', { cx: '20', cy: '8', r: '.5', key: '1e43v0' }],
	],
	H4 = [
		['path', { d: 'm10.852 14.772-.383.923', key: '11vil6' }],
		['path', { d: 'm10.852 9.228-.383-.923', key: '1fjppe' }],
		['path', { d: 'm13.148 14.772.382.924', key: 'je3va1' }],
		['path', { d: 'm13.531 8.305-.383.923', key: '18epck' }],
		['path', { d: 'm14.772 10.852.923-.383', key: 'k9m8cz' }],
		['path', { d: 'm14.772 13.148.923.383', key: '1xvhww' }],
		[
			'path',
			{
				d: 'M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771',
				key: 'jcbbz1',
			},
		],
		['path', { d: 'M17.998 5.125a4 4 0 0 1 2.525 5.771', key: '1kkn7e' }],
		['path', { d: 'M19.505 10.294a4 4 0 0 1-1.5 7.706', key: '18bmuc' }],
		[
			'path',
			{ d: 'M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516', key: 'uozx0d' },
		],
		['path', { d: 'M4.5 10.291A4 4 0 0 0 6 18', key: 'whdemb' }],
		['path', { d: 'M6.002 5.125a3 3 0 0 0 .4 1.375', key: '1kqy2g' }],
		['path', { d: 'm9.228 10.852-.923-.383', key: '1wtb30' }],
		['path', { d: 'm9.228 13.148-.923.383', key: '1a830x' }],
		['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
	],
	O4 = [
		['path', { d: 'M12 18V5', key: 'adv99a' }],
		['path', { d: 'M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4', key: '1e3is1' }],
		['path', { d: 'M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5', key: '1gqd8o' }],
		['path', { d: 'M17.997 5.125a4 4 0 0 1 2.526 5.77', key: 'iwvgf7' }],
		['path', { d: 'M18 18a4 4 0 0 0 2-7.464', key: 'efp6ie' }],
		['path', { d: 'M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517', key: '1gq6am' }],
		['path', { d: 'M6 18a4 4 0 0 1-2-7.464', key: 'k1g0md' }],
		['path', { d: 'M6.003 5.125a4 4 0 0 0-2.526 5.77', key: 'q97ue3' }],
	],
	F4 = [
		['path', { d: 'M16 3v2.107', key: 'gq8xun' }],
		[
			'path',
			{
				d: 'M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9',
				key: '1l2pih',
			},
		],
		['path', { d: 'M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938', key: 'jrnqjp' }],
		['path', { d: 'M3 15h5.253', key: 'xqg7rb' }],
		['path', { d: 'M3 9h8.228', key: '1ppb70' }],
		['path', { d: 'M8 15v6', key: '1stoo3' }],
		['path', { d: 'M8 3v6', key: 'vlvjmk' }],
	],
	j4 = [
		['path', { d: 'M12 9v1.258', key: 'iwpddn' }],
		['path', { d: 'M16 3v5.46', key: 'd7ew98' }],
		['path', { d: 'M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75', key: '137t5x' }],
		[
			'path',
			{
				d: 'M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z',
				key: '16j3tf',
			},
		],
		['path', { d: 'M3 15h7', key: '1qldh6' }],
		['path', { d: 'M3 9h12.142', key: '1yjd6m' }],
		['path', { d: 'M8 15v6', key: '1stoo3' }],
		['path', { d: 'M8 3v6', key: 'vlvjmk' }],
	],
	q4 = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M12 9v6', key: '199k2o' }],
		['path', { d: 'M16 15v6', key: '8rj2es' }],
		['path', { d: 'M16 3v6', key: '1j6rpj' }],
		['path', { d: 'M3 15h18', key: '5xshup' }],
		['path', { d: 'M3 9h18', key: '1pudct' }],
		['path', { d: 'M8 15v6', key: '1stoo3' }],
		['path', { d: 'M8 3v6', key: 'vlvjmk' }],
	],
	V4 = [
		['path', { d: 'M12 12h.01', key: '1mp3jc' }],
		['path', { d: 'M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2', key: '1ksdt3' }],
		['path', { d: 'M22 13a18.15 18.15 0 0 1-20 0', key: '12hx5q' }],
		['rect', { width: '20', height: '14', x: '2', y: '6', rx: '2', key: 'i6l2r4' }],
	],
	z4 = [
		['path', { d: 'M10 20v2', key: '1n8e1g' }],
		['path', { d: 'M14 20v2', key: '1lq872' }],
		['path', { d: 'M18 20v2', key: '10uadw' }],
		['path', { d: 'M21 20H3', key: 'kdqkdp' }],
		['path', { d: 'M6 20v2', key: 'a9bc87' }],
		['path', { d: 'M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12', key: '17n9tx' }],
		['rect', { x: '4', y: '6', width: '16', height: '10', rx: '2', key: '1097i5' }],
	],
	B4 = [
		['path', { d: 'M12 11v4', key: 'a6ujw6' }],
		['path', { d: 'M14 13h-4', key: '1pl8zg' }],
		['path', { d: 'M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2', key: '1ksdt3' }],
		['path', { d: 'M18 6v14', key: '1mu4gy' }],
		['path', { d: 'M6 6v14', key: '1s15cj' }],
		['rect', { width: '20', height: '14', x: '2', y: '6', rx: '2', key: 'i6l2r4' }],
	],
	U4 = [
		['path', { d: 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', key: 'jecpp' }],
		['rect', { width: '20', height: '14', x: '2', y: '6', rx: '2', key: 'i6l2r4' }],
	],
	G4 = [
		['rect', { x: '8', y: '8', width: '8', height: '8', rx: '2', key: 'yj20xf' }],
		['path', { d: 'M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2', key: '1ltk23' }],
		['path', { d: 'M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2', key: '1q24h9' }],
	],
	W4 = [
		['path', { d: 'm16 22-1-4', key: '1ow2iv' }],
		[
			'path',
			{
				d: 'M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1',
				key: '11gii7',
			},
		],
		['path', { d: 'M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z', key: 'bju7h4' }],
		['path', { d: 'm8 22 1-4', key: 's3unb' }],
	],
	$4 = [
		['path', { d: 'm11 10 3 3', key: 'fzmg1i' }],
		['path', { d: 'M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z', key: 'p4q2r7' }],
		['path', { d: 'M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031', key: 'wy6l02' }],
	],
	Z4 = [
		['path', { d: 'M12 20v-8', key: 'i3yub9' }],
		['path', { d: 'M14.12 3.88 16 2', key: 'qol33r' }],
		['path', { d: 'M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2', key: 'vl8zik' }],
		['path', { d: 'M18 12.34V11a4 4 0 0 0-4-4h-1.3', key: 'sz915m' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M21 5a4 4 0 0 1-3.55 3.97', key: '5cxbf6' }],
		['path', { d: 'M22 13h-3.34', key: '1y15gv' }],
		['path', { d: 'M3 21a4 4 0 0 1 3.81-4', key: '1fjd4g' }],
		['path', { d: 'M6 13H2', key: '82j7cp' }],
		['path', { d: 'M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13', key: '1njkjs' }],
	],
	Q4 = [
		['path', { d: 'M7.001 15.085A1.5 1.5 0 0 1 9 16.5', key: 'y44lvh' }],
		['circle', { cx: '18.5', cy: '8.5', r: '3.5', key: '1wadoa' }],
		['circle', { cx: '7.5', cy: '16.5', r: '5.5', key: '6mdt3g' }],
		['circle', { cx: '7.5', cy: '4.5', r: '2.5', key: '637s54' }],
	],
	X4 = [
		['path', { d: 'M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97', key: '1gnv52' }],
		[
			'path',
			{
				d: 'M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z',
				key: '1weqy9',
			},
		],
		['path', { d: 'M14.12 3.88 16 2', key: 'qol33r' }],
		['path', { d: 'M21 5a4 4 0 0 1-3.55 3.97', key: '5cxbf6' }],
		['path', { d: 'M3 21a4 4 0 0 1 3.81-4', key: '1fjd4g' }],
		['path', { d: 'M3 5a4 4 0 0 0 3.55 3.97', key: '1d7oge' }],
		['path', { d: 'M6 13H2', key: '82j7cp' }],
		['path', { d: 'm8 2 1.88 1.88', key: 'fmnt4t' }],
		['path', { d: 'M9 7.13V6a3 3 0 1 1 6 0v1.13', key: '1vgav8' }],
	],
	K4 = [
		['path', { d: 'M12 20v-9', key: '1qisl0' }],
		['path', { d: 'M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z', key: 'uouzyp' }],
		['path', { d: 'M14.12 3.88 16 2', key: 'qol33r' }],
		['path', { d: 'M21 21a4 4 0 0 0-3.81-4', key: '1b0z45' }],
		['path', { d: 'M21 5a4 4 0 0 1-3.55 3.97', key: '5cxbf6' }],
		['path', { d: 'M22 13h-4', key: '1jl80f' }],
		['path', { d: 'M3 21a4 4 0 0 1 3.81-4', key: '1fjd4g' }],
		['path', { d: 'M3 5a4 4 0 0 0 3.55 3.97', key: '1d7oge' }],
		['path', { d: 'M6 13H2', key: '82j7cp' }],
		['path', { d: 'm8 2 1.88 1.88', key: 'fmnt4t' }],
		['path', { d: 'M9 7.13V6a3 3 0 1 1 6 0v1.13', key: '1vgav8' }],
	],
	Y4 = [
		['path', { d: 'M10 12h4', key: 'a56b0p' }],
		['path', { d: 'M10 8h4', key: '1sr2af' }],
		['path', { d: 'M14 21v-3a2 2 0 0 0-4 0v3', key: '1rgiei' }],
		['path', { d: 'M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2', key: 'secmi2' }],
		['path', { d: 'M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16', key: '16ra0t' }],
	],
	J4 = [
		['path', { d: 'M12 10h.01', key: '1nrarc' }],
		['path', { d: 'M12 14h.01', key: '1etili' }],
		['path', { d: 'M12 6h.01', key: '1vi96p' }],
		['path', { d: 'M16 10h.01', key: '1m94wz' }],
		['path', { d: 'M16 14h.01', key: '1gbofw' }],
		['path', { d: 'M16 6h.01', key: '1x0f13' }],
		['path', { d: 'M8 10h.01', key: '19clt8' }],
		['path', { d: 'M8 14h.01', key: '6423bh' }],
		['path', { d: 'M8 6h.01', key: '1dz90k' }],
		['path', { d: 'M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3', key: 'cabbwy' }],
		['rect', { x: '4', y: '2', width: '16', height: '20', rx: '2', key: '1uxh74' }],
	],
	e5 = [
		['path', { d: 'M4 6 2 7', key: '1mqr15' }],
		['path', { d: 'M10 6h4', key: '1itunk' }],
		['path', { d: 'm22 7-2-1', key: '1umjhc' }],
		['rect', { width: '16', height: '16', x: '4', y: '3', rx: '2', key: '1wxw4b' }],
		['path', { d: 'M4 11h16', key: 'mpoxn0' }],
		['path', { d: 'M8 15h.01', key: 'a7atzg' }],
		['path', { d: 'M16 15h.01', key: 'rnfrdf' }],
		['path', { d: 'M6 19v2', key: '1loha6' }],
		['path', { d: 'M18 21v-2', key: 'sqyl04' }],
	],
	t5 = [
		['path', { d: 'M8 6v6', key: '18i7km' }],
		['path', { d: 'M15 6v6', key: '1sg6z9' }],
		['path', { d: 'M2 12h19.6', key: 'de5uta' }],
		[
			'path',
			{
				d: 'M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3',
				key: '1wwztk',
			},
		],
		['circle', { cx: '7', cy: '18', r: '2', key: '19iecd' }],
		['path', { d: 'M9 18h5', key: 'lrx6i' }],
		['circle', { cx: '16', cy: '18', r: '2', key: '1v4tcr' }],
	],
	n5 = [
		['path', { d: 'M10 3h.01', key: 'lbucoy' }],
		['path', { d: 'M14 2h.01', key: '1k8aa1' }],
		['path', { d: 'm2 9 20-5', key: '1kz0j5' }],
		['path', { d: 'M12 12V6.5', key: '1vbrij' }],
		['rect', { width: '16', height: '10', x: '4', y: '12', rx: '3', key: 'if91er' }],
		['path', { d: 'M9 12v5', key: '3anwtq' }],
		['path', { d: 'M15 12v5', key: '5xh3zn' }],
		['path', { d: 'M4 17h16', key: 'g4d7ey' }],
	],
	a5 = [
		['path', { d: 'M16 13H3', key: '1wpj08' }],
		['path', { d: 'M16 17H3', key: '3lvfcd' }],
		[
			'path',
			{
				d: 'm7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6',
				key: '1gmhf7',
			},
		],
		['circle', { cx: '9', cy: '7', r: '2', key: '1305pl' }],
	],
	o5 = [
		['path', { d: 'M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z', key: 'trhst0' }],
		['path', { d: 'M17 21v-2', key: 'ds4u3f' }],
		['path', { d: 'M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10', key: '1mo9zo' }],
		['path', { d: 'M21 21v-2', key: 'eo0ou' }],
		['path', { d: 'M3 5V3', key: '1k5hjh' }],
		['path', { d: 'M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z', key: '1dd30t' }],
		['path', { d: 'M7 5V3', key: '1t1388' }],
	],
	r5 = [
		['path', { d: 'M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8', key: '1w3rig' }],
		['path', { d: 'M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1', key: 'n2jgmb' }],
		['path', { d: 'M2 21h20', key: '1nyx9w' }],
		['path', { d: 'M7 8v3', key: '1qtyvj' }],
		['path', { d: 'M12 8v3', key: 'hwp4zt' }],
		['path', { d: 'M17 8v3', key: '1i6e5u' }],
		['path', { d: 'M7 4h.01', key: '1bh4kh' }],
		['path', { d: 'M12 4h.01', key: '1ujb9j' }],
		['path', { d: 'M17 4h.01', key: '1upcoc' }],
	],
	i5 = [
		['rect', { width: '16', height: '20', x: '4', y: '2', rx: '2', key: '1nb95v' }],
		['line', { x1: '8', x2: '16', y1: '6', y2: '6', key: 'x4nwl0' }],
		['line', { x1: '16', x2: '16', y1: '14', y2: '18', key: 'wjye3r' }],
		['path', { d: 'M16 10h.01', key: '1m94wz' }],
		['path', { d: 'M12 10h.01', key: '1nrarc' }],
		['path', { d: 'M8 10h.01', key: '19clt8' }],
		['path', { d: 'M12 14h.01', key: '1etili' }],
		['path', { d: 'M8 14h.01', key: '6423bh' }],
		['path', { d: 'M12 18h.01', key: 'mhygvu' }],
		['path', { d: 'M8 18h.01', key: 'lrp35t' }],
	],
	s5 = [
		['path', { d: 'M11 14h1v4', key: 'fy54vd' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', key: '12vinp' }],
	],
	c5 = [
		['path', { d: 'm14 18 4 4 4-4', key: '1waygx' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M18 14v8', key: 'irew45' }],
		['path', { d: 'M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343', key: 'bse4f3' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'M8 2v4', key: '1cmpym' }],
	],
	d5 = [
		['path', { d: 'm14 18 4-4 4 4', key: 'ftkppy' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M18 22v-8', key: 'su0gjh' }],
		['path', { d: 'M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9', key: '1exg90' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'M8 2v4', key: '1cmpym' }],
	],
	l5 = [
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8', key: 'bce9hv' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'm16 20 2 2 4-4', key: '13tcca' }],
	],
	u5 = [
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'm9 16 2 2 4-4', key: '19s6y9' }],
	],
	h5 = [
		['path', { d: 'M16 14v2.2l1.6 1', key: 'fo4ql5' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5', key: '1osxxc' }],
		['path', { d: 'M3 10h5', key: 'r794hk' }],
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['circle', { cx: '16', cy: '16', r: '6', key: 'qoo3c4' }],
	],
	p5 = [
		['path', { d: 'm15.228 16.852-.923-.383', key: 'npixar' }],
		['path', { d: 'm15.228 19.148-.923.383', key: '51cr3n' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'm16.47 14.305.382.923', key: 'obybxd' }],
		['path', { d: 'm16.852 20.772-.383.924', key: 'dpfhf9' }],
		['path', { d: 'm19.148 15.228.383-.923', key: '1reyyz' }],
		['path', { d: 'm19.53 21.696-.382-.924', key: '1goivc' }],
		['path', { d: 'm20.772 16.852.924-.383', key: 'htqkph' }],
		['path', { d: 'm20.772 19.148.924.383', key: '9w9pjp' }],
		['path', { d: 'M21 10.592V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6', key: '1pvbig' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['circle', { cx: '18', cy: '18', r: '3', key: '1xkwt0' }],
	],
	y5 = [
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'M8 14h.01', key: '6423bh' }],
		['path', { d: 'M12 14h.01', key: '1etili' }],
		['path', { d: 'M16 14h.01', key: '1gbofw' }],
		['path', { d: 'M8 18h.01', key: 'lrp35t' }],
		['path', { d: 'M12 18h.01', key: 'mhygvu' }],
		['path', { d: 'M16 18h.01', key: 'kzsmim' }],
	],
	f5 = [
		[
			'path',
			{
				d: 'M3 20a2 2 0 0 0 2 2h10a2.4 2.4 0 0 0 1.706-.706l3.588-3.588A2.4 2.4 0 0 0 21 16V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z',
				key: 'r586nh',
			},
		],
		['path', { d: 'M15 22v-5a1 1 0 0 1 1-1h5', key: 'xl3app' }],
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
	],
	k5 = [
		['path', { d: 'M12.127 22H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.125', key: 'vxdnp4' }],
		[
			'path',
			{
				d: 'M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z',
				key: '15cy7q',
			},
		],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'M8 2v4', key: '1cmpym' }],
	],
	g5 = [
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'M10 16h4', key: '17e571' }],
	],
	m5 = [
		['path', { d: 'M16 19h6', key: 'xwg31i' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5', key: '1scpom' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'M8 2v4', key: '1cmpym' }],
	],
	M5 = [
		['path', { d: 'M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18', key: '16swn3' }],
		['path', { d: 'M21 15.5V6a2 2 0 0 0-2-2H9.5', key: 'yhw86o' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M3 10h7', key: '1wap6i' }],
		['path', { d: 'M21 10h-5.5', key: 'quycpq' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	v5 = [
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'M10 16h4', key: '17e571' }],
		['path', { d: 'M12 14v4', key: '1thi36' }],
	],
	I5 = [
		['path', { d: 'M16 19h6', key: 'xwg31i' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M19 16v6', key: 'tddt3s' }],
		['path', { d: 'M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5', key: '1glfrc' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'M8 2v4', key: '1cmpym' }],
	],
	x5 = [
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25', key: '1jrsq6' }],
		['path', { d: 'm22 22-1.875-1.875', key: '13zax7' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['circle', { cx: '18', cy: '18', r: '3', key: '1xkwt0' }],
	],
	w5 = [
		['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['path', { d: 'M17 14h-6', key: 'bkmgh3' }],
		['path', { d: 'M13 18H7', key: 'bb0bb7' }],
		['path', { d: 'M7 14h.01', key: '1qa3f1' }],
		['path', { d: 'M17 18h.01', key: '1bdyru' }],
	],
	C5 = [
		['path', { d: 'M11 10v4h4', key: '172dkj' }],
		['path', { d: 'm11 14 1.535-1.605a5 5 0 0 1 8 1.5', key: 'vu0qm5' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'm21 18-1.535 1.605a5 5 0 0 1-8-1.5', key: '1qgeyt' }],
		['path', { d: 'M21 22v-4h-4', key: 'hrummi' }],
		['path', { d: 'M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3', key: 'mctw84' }],
		['path', { d: 'M3 10h4', key: '1el30a' }],
		['path', { d: 'M8 2v4', key: '1cmpym' }],
	],
	L5 = [
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8', key: '3spt84' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'm17 22 5-5', key: '1k6ppv' }],
		['path', { d: 'm17 17 5 5', key: 'p7ous7' }],
	],
	b5 = [
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
		['path', { d: 'm14 14-4 4', key: 'rymu2i' }],
		['path', { d: 'm10 14 4 4', key: '3sz06r' }],
	],
	S5 = [
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' }],
		['path', { d: 'M3 10h18', key: '8toen8' }],
	],
	D5 = [
		['path', { d: 'M12 2v2', key: 'tus03m' }],
		['path', { d: 'M15.726 21.01A2 2 0 0 1 14 22H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2', key: 'j6srht' }],
		['path', { d: 'M18 2v2', key: '1kh14s' }],
		['path', { d: 'M2 13h2', key: '13gyu8' }],
		['path', { d: 'M8 8h14', key: '12jxz2' }],
		['rect', { x: '8', y: '3', width: '14', height: '14', rx: '2', key: 'nsru6w' }],
	],
	A5 = [
		['path', { d: 'M14.564 14.558a3 3 0 1 1-4.122-4.121', key: '1rnrzw' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175', key: '1x3arw' }],
		[
			'path',
			{
				d: 'M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344',
				key: '1i84u0',
			},
		],
	],
	E5 = [
		[
			'path',
			{
				d: 'M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z',
				key: '18u6gg',
			},
		],
		['circle', { cx: '12', cy: '13', r: '3', key: '1vg3eu' }],
	],
	T5 = [
		[
			'path',
			{
				d: 'M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2Z',
				key: 'isaq8g',
			},
		],
		['path', { d: 'M17.75 7 15 2.1', key: '12x7e8' }],
		['path', { d: 'M10.9 4.8 13 9', key: '100a87' }],
		['path', { d: 'm7.9 9.7 2 4.4', key: 'ntfhaj' }],
		['path', { d: 'M4.9 14.7 7 18.9', key: '1x43jy' }],
	],
	P5 = [
		['path', { d: 'M10 10v7.9', key: 'm8g9tt' }],
		['path', { d: 'M11.802 6.145a5 5 0 0 1 6.053 6.053', key: 'dn87i3' }],
		['path', { d: 'M14 6.1v2.243', key: '1kzysn' }],
		['path', { d: 'm15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965', key: '3sxy18' }],
		[
			'path',
			{
				d: 'M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4',
				key: 'gpb6xx',
			},
		],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		[
			'path',
			{
				d: 'M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4',
				key: 'qexcha',
			},
		],
	],
	R5 = [
		['path', { d: 'M10 7v10.9', key: '1gynux' }],
		['path', { d: 'M14 6.1V17', key: '116kdf' }],
		[
			'path',
			{
				d: 'M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4',
				key: 'gpb6xx',
			},
		],
		[
			'path',
			{
				d: 'M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07',
				key: '1tsln4',
			},
		],
		[
			'path',
			{
				d: 'M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4',
				key: 'qexcha',
			},
		],
	],
	N5 = [
		['path', { d: 'M12 22v-4c1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5', key: '1bqfb7' }],
		['path', { d: 'M13.988 8.327C13.902 6.054 13.365 3.82 12 2a9.3 9.3 0 0 0-1.445 2.9', key: '1p520n' }],
		['path', { d: 'M17.375 11.725C18.882 10.53 21 7.841 21 6c-2.324 0-5.08 1.296-6.662 2.684', key: 'q2itvb' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M21.024 15.378A15 15 0 0 0 22 15c-.426-1.279-2.67-2.557-4.25-2.907', key: 'j9amvs' }],
		[
			'path',
			{
				d: 'M6.995 6.992C5.714 6.4 4.29 6 3 6c0 2 2.5 5 4 6-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3',
				key: '8gmd5g',
			},
		],
	],
	_5 = [
		['path', { d: 'M12 22v-4', key: '1utk9m' }],
		[
			'path',
			{
				d: 'M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6',
				key: '1mezod',
			},
		],
	],
	H5 = [
		['path', { d: 'M10.5 5H19a2 2 0 0 1 2 2v8.5', key: 'jqtk4d' }],
		['path', { d: 'M17 11h-.5', key: '1961ue' }],
		['path', { d: 'M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2', key: '1keqsi' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M7 11h4', key: '1o1z6v' }],
		['path', { d: 'M7 15h2.5', key: '1ina1g' }],
	],
	O5 = [
		['path', { d: 'm21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8', key: '1imjwt' }],
		['path', { d: 'M7 14h.01', key: '1qa3f1' }],
		['path', { d: 'M17 14h.01', key: '7oqj8z' }],
		['rect', { width: '18', height: '8', x: '3', y: '10', rx: '2', key: 'a7itu8' }],
		['path', { d: 'M5 18v2', key: 'ppbyun' }],
		['path', { d: 'M19 18v2', key: 'gy7782' }],
	],
	F5 = [
		['rect', { width: '18', height: '14', x: '3', y: '5', rx: '2', ry: '2', key: '12ruh7' }],
		['path', { d: 'M7 15h4M15 15h2M7 11h2M13 11h4', key: '1ueiar' }],
	],
	j5 = [
		['path', { d: 'M10 2h4', key: 'n1abiw' }],
		['path', { d: 'm21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8', key: '1imjwt' }],
		['path', { d: 'M7 14h.01', key: '1qa3f1' }],
		['path', { d: 'M17 14h.01', key: '7oqj8z' }],
		['rect', { width: '18', height: '8', x: '3', y: '10', rx: '2', key: 'a7itu8' }],
		['path', { d: 'M5 18v2', key: 'ppbyun' }],
		['path', { d: 'M19 18v2', key: 'gy7782' }],
	],
	q5 = [
		[
			'path',
			{
				d: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2',
				key: '5owen',
			},
		],
		['circle', { cx: '7', cy: '17', r: '2', key: 'u2ysq9' }],
		['path', { d: 'M9 17h6', key: 'r8uit2' }],
		['circle', { cx: '17', cy: '17', r: '2', key: 'axvx0g' }],
	],
	V5 = [
		['path', { d: 'M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2', key: '19jm3t' }],
		['path', { d: 'M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2', key: '13hakp' }],
		['path', { d: 'M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9', key: '1crci8' }],
		['circle', { cx: '8', cy: '19', r: '2', key: 't8fc5s' }],
	],
	z5 = [
		['path', { d: 'M12 14v4', key: '1thi36' }],
		[
			'path',
			{
				d: 'M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z',
				key: '1o66bk',
			},
		],
		['path', { d: 'M8 14h8', key: '1fgep2' }],
		['rect', { x: '8', y: '10', width: '8', height: '8', rx: '1', key: '1aonk6' }],
	],
	B5 = [
		[
			'path',
			{
				d: 'M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46',
				key: 'rfqxbe',
			},
		],
		['path', { d: 'M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z', key: '6b25w4' }],
		['path', { d: 'M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z', key: 'fn65lo' }],
	],
	U5 = [
		['path', { d: 'M10 9v7', key: 'ylp826' }],
		['path', { d: 'M14 6v10', key: '1jy4vg' }],
		['circle', { cx: '17.5', cy: '12.5', r: '3.5', key: '1a9481' }],
		['circle', { cx: '6.5', cy: '12.5', r: '3.5', key: '2jlv1r' }],
	],
	G5 = [
		['path', { d: 'm2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16', key: 'd5nyq2' }],
		['path', { d: 'M22 9v7', key: 'pvm9v3' }],
		['path', { d: 'M3.304 13h6.392', key: '1q3zxz' }],
		['circle', { cx: '18.5', cy: '12.5', r: '3.5', key: 'z97x68' }],
	],
	W5 = [
		[
			'path',
			{ d: 'M15 11h4.5a1 1 0 0 1 0 5h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3a1 1 0 0 1 0 5', key: 'nxs35' },
		],
		['path', { d: 'm2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16', key: 'd5nyq2' }],
		['path', { d: 'M3.304 13h6.392', key: '1q3zxz' }],
	],
	$5 = [
		['rect', { width: '20', height: '16', x: '2', y: '4', rx: '2', key: '18n3k1' }],
		['circle', { cx: '8', cy: '10', r: '2', key: '1xl4ub' }],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
		['circle', { cx: '16', cy: '10', r: '2', key: 'r14t7q' }],
		['path', { d: 'm6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3', key: 'l01ucn' }],
	],
	Z5 = [
		['path', { d: 'M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6', key: '3zrzxg' }],
		['path', { d: 'M2 12a9 9 0 0 1 8 8', key: 'g6cvee' }],
		['path', { d: 'M2 16a5 5 0 0 1 4 4', key: '1y1dii' }],
		['line', { x1: '2', x2: '2.01', y1: '20', y2: '20', key: 'xu2jvo' }],
	],
	Q5 = [
		['path', { d: 'M10 5V3', key: '1y54qe' }],
		['path', { d: 'M14 5V3', key: 'm6isi' }],
		['path', { d: 'M15 21v-3a3 3 0 0 0-6 0v3', key: 'lbp5hj' }],
		['path', { d: 'M18 3v8', key: '2ollhf' }],
		['path', { d: 'M18 5H6', key: '98imr9' }],
		['path', { d: 'M22 11H2', key: '1lmjae' }],
		['path', { d: 'M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9', key: '1rly83' }],
		['path', { d: 'M6 3v8', key: 'csox7g' }],
	],
	X5 = [
		[
			'path',
			{ d: 'M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97', key: 'ir91b5' },
		],
		[
			'path',
			{
				d: 'M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z',
				key: 'jlp8i1',
			},
		],
		['path', { d: 'M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15', key: '19bib8' }],
		['path', { d: 'M2 21v-4', key: 'l40lih' }],
		['path', { d: 'M7 9h.01', key: '19b3jx' }],
	],
	K5 = [
		[
			'path',
			{
				d: 'M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z',
				key: 'x6xyqk',
			},
		],
		['path', { d: 'M8 14v.5', key: '1nzgdb' }],
		['path', { d: 'M16 14v.5', key: '1lajdz' }],
		['path', { d: 'M11.25 16.25h1.5L12 17l-.75-.75Z', key: '12kq1m' }],
	],
	Y5 = [
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		[
			'path',
			{
				d: 'M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z',
				key: 'q0gr47',
			},
		],
	],
	J5 = [
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['rect', { x: '7', y: '13', width: '9', height: '4', rx: '1', key: '1iip1u' }],
		['rect', { x: '7', y: '5', width: '12', height: '4', rx: '1', key: '1anskk' }],
	],
	eg = [
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['path', { d: 'M7 11h8', key: '1feolt' }],
		['path', { d: 'M7 16h3', key: 'ur6vzw' }],
		['path', { d: 'M7 6h12', key: 'sz5b0d' }],
	],
	tg = [
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['path', { d: 'M7 11h8', key: '1feolt' }],
		['path', { d: 'M7 16h12', key: 'wsnu98' }],
		['path', { d: 'M7 6h3', key: 'w9rmul' }],
	],
	ng = [
		['path', { d: 'M11 13v4', key: 'vyy2rb' }],
		['path', { d: 'M15 5v4', key: '1gx88a' }],
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['rect', { x: '7', y: '13', width: '9', height: '4', rx: '1', key: '1iip1u' }],
		['rect', { x: '7', y: '5', width: '12', height: '4', rx: '1', key: '1anskk' }],
	],
	ag = [
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['path', { d: 'M7 16h8', key: 'srdodz' }],
		['path', { d: 'M7 11h12', key: '127s9w' }],
		['path', { d: 'M7 6h3', key: 'w9rmul' }],
	],
	og = [
		['path', { d: 'M9 5v4', key: '14uxtq' }],
		['rect', { width: '4', height: '6', x: '7', y: '9', rx: '1', key: 'f4fvz0' }],
		['path', { d: 'M9 15v2', key: 'r5rk32' }],
		['path', { d: 'M17 3v2', key: '1l2re6' }],
		['rect', { width: '4', height: '8', x: '15', y: '5', rx: '1', key: 'z38je5' }],
		['path', { d: 'M17 13v3', key: '5l0wba' }],
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
	],
	rg = [
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['rect', { x: '15', y: '5', width: '4', height: '12', rx: '1', key: 'q8uenq' }],
		['rect', { x: '7', y: '8', width: '4', height: '9', rx: '1', key: 'sr5ea' }],
	],
	ig = [
		['path', { d: 'M13 17V9', key: '1fwyjl' }],
		['path', { d: 'M18 17v-3', key: '1sqioe' }],
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['path', { d: 'M8 17V5', key: '1wzmnc' }],
	],
	sg = [
		['path', { d: 'M13 17V9', key: '1fwyjl' }],
		['path', { d: 'M18 17V5', key: 'sfb6ij' }],
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['path', { d: 'M8 17v-3', key: '17ska0' }],
	],
	cg = [
		['path', { d: 'M11 13H7', key: 't0o9gq' }],
		['path', { d: 'M19 9h-4', key: 'rera1j' }],
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['rect', { x: '15', y: '5', width: '4', height: '12', rx: '1', key: 'q8uenq' }],
		['rect', { x: '7', y: '8', width: '4', height: '9', rx: '1', key: 'sr5ea' }],
	],
	dg = [
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['path', { d: 'M18 17V9', key: '2bz60n' }],
		['path', { d: 'M13 17V5', key: '1frdt8' }],
		['path', { d: 'M8 17v-3', key: '17ska0' }],
	],
	lg = [
		['path', { d: 'M10 6h8', key: 'zvc2xc' }],
		['path', { d: 'M12 16h6', key: 'yi5mkt' }],
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['path', { d: 'M8 11h7', key: 'wz2hg0' }],
	],
	ug = [
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['path', { d: 'm19 9-5 5-4-4-3 3', key: '2osh9i' }],
	],
	hg = [
		['path', { d: 'm13.11 7.664 1.78 2.672', key: 'go2gg9' }],
		['path', { d: 'm14.162 12.788-3.324 1.424', key: '11x848' }],
		['path', { d: 'm20 4-6.06 1.515', key: '1wxxh7' }],
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['circle', { cx: '12', cy: '6', r: '2', key: '1jj5th' }],
		['circle', { cx: '16', cy: '12', r: '2', key: '4ma0v8' }],
		['circle', { cx: '9', cy: '15', r: '2', key: 'lf2ghp' }],
	],
	pg = [
		['path', { d: 'M5 21V3', key: 'clc1r8' }],
		['path', { d: 'M12 21V9', key: 'uvy0l4' }],
		['path', { d: 'M19 21v-6', key: 'tkawy9' }],
	],
	yg = [
		['path', { d: 'M5 21v-6', key: '1hz6c0' }],
		['path', { d: 'M12 21V9', key: 'uvy0l4' }],
		['path', { d: 'M19 21V3', key: '11j9sm' }],
	],
	fg = [
		['path', { d: 'M5 21v-6', key: '1hz6c0' }],
		['path', { d: 'M12 21V3', key: '1lcnhd' }],
		['path', { d: 'M19 21V9', key: 'unv183' }],
	],
	kg = [
		['path', { d: 'M12 16v5', key: 'zza2cw' }],
		['path', { d: 'M16 14v7', key: '1g90b9' }],
		['path', { d: 'M20 10v11', key: '1iqoj0' }],
		['path', { d: 'm22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15', key: '1fw8x9' }],
		['path', { d: 'M4 18v3', key: '1yp0dc' }],
		['path', { d: 'M8 14v7', key: 'n3cwzv' }],
	],
	gg = [
		['path', { d: 'M6 5h12', key: 'fvfigv' }],
		['path', { d: 'M4 12h10', key: 'oujl3d' }],
		['path', { d: 'M12 19h8', key: 'baeox8' }],
	],
	mg = [
		[
			'path',
			{
				d: 'M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z',
				key: 'pzmjnu',
			},
		],
		['path', { d: 'M21.21 15.89A10 10 0 1 1 8 2.83', key: 'k2fpak' }],
	],
	Mg = [
		['circle', { cx: '7.5', cy: '7.5', r: '.5', fill: 'currentColor', key: 'kqv944' }],
		['circle', { cx: '18.5', cy: '5.5', r: '.5', fill: 'currentColor', key: 'lysivs' }],
		['circle', { cx: '11.5', cy: '11.5', r: '.5', fill: 'currentColor', key: 'byv1b8' }],
		['circle', { cx: '7.5', cy: '16.5', r: '.5', fill: 'currentColor', key: 'nkw3mc' }],
		['circle', { cx: '17.5', cy: '14.5', r: '.5', fill: 'currentColor', key: '1gjh6j' }],
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
	],
	vg = [
		['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
		['path', { d: 'M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7', key: 'lw07rv' }],
	],
	Ig = [
		['path', { d: 'M18 6 7 17l-5-5', key: '116fxf' }],
		['path', { d: 'm22 10-7.5 7.5L13 16', key: 'ke71qq' }],
	],
	xg = [
		['path', { d: 'M20 4L9 15', key: '1qkx8z' }],
		['path', { d: 'M21 19L3 19', key: '100sma' }],
		['path', { d: 'M9 15L4 10', key: '9zxff7' }],
	],
	wg = [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]],
	Cg = [
		[
			'path',
			{
				d: 'M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z',
				key: '1qvrer',
			},
		],
		['path', { d: 'M6 17h12', key: '1jwigz' }],
	],
	Lg = [
		['path', { d: 'M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z', key: 'cvxqlc' }],
		['path', { d: 'M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z', key: '1ostrc' }],
		['path', { d: 'M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12', key: 'hqx58h' }],
		['path', { d: 'M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z', key: 'eykp1o' }],
	],
	bg = [
		['path', { d: 'M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z', key: 'b89hwq' }],
		[
			'path',
			{
				d: 'M15 18c1.5-.615 3-2.461 3-4.923C18 8.769 14.5 4.462 12 2 9.5 4.462 6 8.77 6 13.077 6 15.539 7.5 17.385 9 18',
				key: '8jdkhx',
			},
		],
		['path', { d: 'm16 7-2.5 2.5', key: '1jq90w' }],
		['path', { d: 'M9 2h6', key: '1jrp98' }],
	],
	Sg = [
		['path', { d: 'M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z', key: 'mqzwx6' }],
		[
			'path',
			{
				d: 'm6.7 18-1-1C4.35 15.682 3 14.09 3 12a5 5 0 0 1 4.95-5c1.584 0 2.7.455 4.05 1.818C13.35 7.455 14.466 7 16.05 7A5 5 0 0 1 21 12c0 2.082-1.359 3.673-2.7 5l-1 1',
				key: '1gdt1g',
			},
		],
		['path', { d: 'M10 4h4', key: '1xpv9s' }],
		['path', { d: 'M12 2v6.818', key: 'b17a49' }],
	],
	Dg = [
		['path', { d: 'M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z', key: 'b89hwq' }],
		[
			'path',
			{
				d: 'M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456',
				key: 'axbnlq',
			},
		],
		['path', { d: 'm15 5 1.425-1.425', key: '15xz8w' }],
		['path', { d: 'm17 8 1.53-1.53', key: '15zhqh' }],
		['path', { d: 'M9.713 12.185 7 18', key: '1ocm0l' }],
	],
	Ag = [
		['path', { d: 'M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z', key: 'b89hwq' }],
		['path', { d: 'm14.5 10 1.5 8', key: 'cim3qy' }],
		['path', { d: 'M7 10h10', key: '1101jm' }],
		['path', { d: 'm8 18 1.5-8', key: 'ja3yjd' }],
		['circle', { cx: '12', cy: '6', r: '4', key: '1frrej' }],
	],
	Eg = [
		['path', { d: 'M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z', key: 'mqzwx6' }],
		['path', { d: 'm12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402', key: '1js4gl' }],
		['path', { d: 'm20 9-3 9', key: 'r75r3f' }],
		['path', { d: 'm5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34', key: '1joj19' }],
		['path', { d: 'M7 18 4 9', key: '1mfzj8' }],
		['circle', { cx: '12', cy: '4', r: '2', key: 'muu5ef' }],
		['circle', { cx: '20', cy: '7', r: '2', key: '9w7p1x' }],
		['circle', { cx: '4', cy: '7', r: '2', key: '1d9wy8' }],
	],
	Tg = [
		['path', { d: 'M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z', key: 'b89hwq' }],
		['path', { d: 'M10 2v2', key: '7u0qdc' }],
		['path', { d: 'M14 2v2', key: '6buw04' }],
		['path', { d: 'm17 18-1-9', key: '10nd7q' }],
		['path', { d: 'M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2', key: 'uxf4yx' }],
		['path', { d: 'M6 4h12', key: '1x2ag7' }],
		['path', { d: 'm7 18 1-9', key: '1si9vq' }],
	],
	Pg = [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]],
	Rg = [
		['path', { d: 'm17 18-6-6 6-6', key: '1yerx2' }],
		['path', { d: 'M7 6v12', key: '1p53r6' }],
	],
	Ng = [
		['path', { d: 'm7 18 6-6-6-6', key: 'lwmzdw' }],
		['path', { d: 'M17 6v12', key: '1o0aio' }],
	],
	_g = [['path', { d: 'm15 18-6-6 6-6', key: '1wnfg3' }]],
	Hg = [['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }]],
	Og = [['path', { d: 'm18 15-6-6-6 6', key: '153udz' }]],
	Fg = [
		['path', { d: 'm7 20 5-5 5 5', key: '13a0gw' }],
		['path', { d: 'm7 4 5 5 5-5', key: '1kwcof' }],
	],
	jg = [
		['path', { d: 'm7 6 5 5 5-5', key: '1lc07p' }],
		['path', { d: 'm7 13 5 5 5-5', key: '1d48rs' }],
	],
	qg = [
		['path', { d: 'M12 12h.01', key: '1mp3jc' }],
		['path', { d: 'M16 12h.01', key: '1l6xoz' }],
		['path', { d: 'm17 7 5 5-5 5', key: '1xlxn0' }],
		['path', { d: 'm7 7-5 5 5 5', key: '19njba' }],
		['path', { d: 'M8 12h.01', key: 'czm47f' }],
	],
	Vg = [
		['path', { d: 'm9 7-5 5 5 5', key: 'j5w590' }],
		['path', { d: 'm15 7 5 5-5 5', key: '1bl6da' }],
	],
	zg = [
		['path', { d: 'm11 17-5-5 5-5', key: '13zhaf' }],
		['path', { d: 'm18 17-5-5 5-5', key: 'h8a8et' }],
	],
	Bg = [
		['path', { d: 'm20 17-5-5 5-5', key: '30x0n2' }],
		['path', { d: 'm4 17 5-5-5-5', key: '16spf4' }],
	],
	Ug = [
		['path', { d: 'm6 17 5-5-5-5', key: 'xnjwq' }],
		['path', { d: 'm13 17 5-5-5-5', key: '17xmmf' }],
	],
	Gg = [
		['path', { d: 'm7 15 5 5 5-5', key: '1hf1tw' }],
		['path', { d: 'm7 9 5-5 5 5', key: 'sgt6xg' }],
	],
	Wg = [
		['path', { d: 'm17 11-5-5-5 5', key: 'e8nh98' }],
		['path', { d: 'm17 18-5-5-5 5', key: '2avn1x' }],
	],
	$g = [
		['path', { d: 'M10.88 21.94 15.46 14', key: 'xkve6t' }],
		['path', { d: 'M21.17 8H12', key: '19dcdn' }],
		['path', { d: 'M3.95 6.06 8.54 14', key: 'g8jz9m' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
	],
	Zg = [
		['path', { d: 'M10 9h4', key: 'u4k05v' }],
		['path', { d: 'M12 7v5', key: 'ma6bk' }],
		['path', { d: 'M14 21v-3a2 2 0 0 0-4 0v3', key: '1rgiei' }],
		[
			'path',
			{
				d: 'm18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9',
				key: 'flvdwo',
			},
		],
		['path', { d: 'M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14', key: 'a5i0n2' }],
	],
	Qg = [
		['path', { d: 'M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13', key: '1gdiyg' }],
		['path', { d: 'M18 8c0-2.5-2-2.5-2-5', key: '1il607' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866', key: '166zjj' }],
		['path', { d: 'M22 8c0-2.5-2-2.5-2-5', key: '1gah44' }],
		['path', { d: 'M7 12v4', key: 'jqww69' }],
	],
	Xg = [
		['path', { d: 'M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14', key: '1mb5g1' }],
		['path', { d: 'M18 8c0-2.5-2-2.5-2-5', key: '1il607' }],
		['path', { d: 'M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1', key: '1yl5r7' }],
		['path', { d: 'M22 8c0-2.5-2-2.5-2-5', key: '1gah44' }],
		['path', { d: 'M7 12v4', key: 'jqww69' }],
	],
	Kg = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
		['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
	],
	Yg = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M12 8v8', key: 'napkw2' }],
		['path', { d: 'm8 12 4 4 4-4', key: 'k98ssh' }],
	],
	Jg = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'm12 8-4 4 4 4', key: '15vm53' }],
		['path', { d: 'M16 12H8', key: '1fr5h0' }],
	],
	e3 = [
		['path', { d: 'M2 12a10 10 0 1 1 10 10', key: '1yn6ov' }],
		['path', { d: 'm2 22 10-10', key: '28ilpk' }],
		['path', { d: 'M8 22H2v-6', key: 'sulq54' }],
	],
	t3 = [
		['path', { d: 'M12 22a10 10 0 1 1 10-10', key: '130bv5' }],
		['path', { d: 'M22 22 12 12', key: '131aw7' }],
		['path', { d: 'M22 16v6h-6', key: '1gvm70' }],
	],
	n3 = [
		['path', { d: 'M2 8V2h6', key: 'hiwtdz' }],
		['path', { d: 'm2 2 10 10', key: '1oh8rs' }],
		['path', { d: 'M12 2A10 10 0 1 1 2 12', key: 'rrk4fa' }],
	],
	a3 = [
		['path', { d: 'M22 12A10 10 0 1 1 12 2', key: '1fm58d' }],
		['path', { d: 'M22 2 12 12', key: 'yg2myt' }],
		['path', { d: 'M16 2h6v6', key: 'zan5cs' }],
	],
	o3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'm12 16 4-4-4-4', key: '1i9zcv' }],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
	],
	r3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'm16 12-4-4-4 4', key: '177agl' }],
		['path', { d: 'M12 16V8', key: '1sbj14' }],
	],
	i3 = [
		['path', { d: 'M21.801 10A10 10 0 1 1 17 3.335', key: 'yps3ct' }],
		['path', { d: 'm9 11 3 3L22 4', key: '1pflzl' }],
	],
	s3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'm9 12 2 2 4-4', key: 'dzmm74' }],
	],
	c3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'm16 10-4 4-4-4', key: '894hmk' }],
	],
	d3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'm14 16-4-4 4-4', key: 'ojs7w8' }],
	],
	l3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'm10 8 4 4-4 4', key: '1wy4r4' }],
	],
	u3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'm8 14 4-4 4 4', key: 'fy2ptz' }],
	],
	h3 = [
		['path', { d: 'M10.1 2.182a10 10 0 0 1 3.8 0', key: '5ilxe3' }],
		['path', { d: 'M13.9 21.818a10 10 0 0 1-3.8 0', key: '11zvb9' }],
		['path', { d: 'M17.609 3.721a10 10 0 0 1 2.69 2.7', key: '1iw5b2' }],
		['path', { d: 'M2.182 13.9a10 10 0 0 1 0-3.8', key: 'c0bmvh' }],
		['path', { d: 'M20.279 17.609a10 10 0 0 1-2.7 2.69', key: '1ruxm7' }],
		['path', { d: 'M21.818 10.1a10 10 0 0 1 0 3.8', key: 'qkgqxc' }],
		['path', { d: 'M3.721 6.391a10 10 0 0 1 2.7-2.69', key: '1mcia2' }],
		['path', { d: 'M6.391 20.279a10 10 0 0 1-2.69-2.7', key: '1fvljs' }],
	],
	p3 = [
		['line', { x1: '8', x2: '16', y1: '12', y2: '12', key: '1jonct' }],
		['line', { x1: '12', x2: '12', y1: '16', y2: '16', key: 'aqc6ln' }],
		['line', { x1: '12', x2: '12', y1: '8', y2: '8', key: '1mkcni' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	y3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8', key: '1h4pet' }],
		['path', { d: 'M12 18V6', key: 'zqpxq5' }],
	],
	f3 = [
		['path', { d: 'M10.1 2.18a9.93 9.93 0 0 1 3.8 0', key: '1qdqn0' }],
		['path', { d: 'M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7', key: '1bq7p6' }],
		['path', { d: 'M21.82 10.1a9.93 9.93 0 0 1 0 3.8', key: '1rlaqf' }],
		['path', { d: 'M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69', key: '1xk03u' }],
		['path', { d: 'M13.9 21.82a9.94 9.94 0 0 1-3.8 0', key: 'l7re25' }],
		['path', { d: 'M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7', key: '1v18p6' }],
		['path', { d: 'M2.18 13.9a9.93 9.93 0 0 1 0-3.8', key: 'xdo6bj' }],
		['path', { d: 'M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69', key: '1jjmaz' }],
		['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
	],
	k3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
	],
	g3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M17 12h.01', key: '1m0b6t' }],
		['path', { d: 'M12 12h.01', key: '1mp3jc' }],
		['path', { d: 'M7 12h.01', key: 'eqddd0' }],
	],
	m3 = [
		['path', { d: 'M7 10h10', key: '1101jm' }],
		['path', { d: 'M7 14h10', key: '1mhdw3' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	M3 = [
		['path', { d: 'M12 2a10 10 0 0 1 7.38 16.75', key: '175t95' }],
		['path', { d: 'm16 12-4-4-4 4', key: '177agl' }],
		['path', { d: 'M12 16V8', key: '1sbj14' }],
		['path', { d: 'M2.5 8.875a10 10 0 0 0-.5 3', key: '1vce0s' }],
		['path', { d: 'M2.83 16a10 10 0 0 0 2.43 3.4', key: 'o3fkw4' }],
		['path', { d: 'M4.636 5.235a10 10 0 0 1 .891-.857', key: '1szpfk' }],
		['path', { d: 'M8.644 21.42a10 10 0 0 0 7.631-.38', key: '9yhvd4' }],
	],
	v3 = [
		['path', { d: 'M12 2a10 10 0 0 1 7.38 16.75', key: '175t95' }],
		['path', { d: 'M12 8v8', key: 'napkw2' }],
		['path', { d: 'M16 12H8', key: '1fr5h0' }],
		['path', { d: 'M2.5 8.875a10 10 0 0 0-.5 3', key: '1vce0s' }],
		['path', { d: 'M2.83 16a10 10 0 0 0 2.43 3.4', key: 'o3fkw4' }],
		['path', { d: 'M4.636 5.235a10 10 0 0 1 .891-.857', key: '1szpfk' }],
		['path', { d: 'M8.644 21.42a10 10 0 0 0 7.631-.38', key: '9yhvd4' }],
	],
	I3 = [
		['path', { d: 'M15.6 2.7a10 10 0 1 0 5.7 5.7', key: '1e0p6d' }],
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
		['path', { d: 'M13.4 10.6 19 5', key: '1kr7tw' }],
	],
	x3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
	],
	w3 = [
		['path', { d: 'M12.656 7H13a3 3 0 0 1 2.984 3.307', key: '1sjx87' }],
		['path', { d: 'M13 13H9', key: 'e2beee' }],
		['path', { d: 'M19.071 19.071A1 1 0 0 1 4.93 4.93', key: '1kb595' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M8.357 2.687a10 10 0 0 1 12.956 12.956', key: '5bsfdx' }],
		['path', { d: 'M9 17V9', key: 'ojradj' }],
	],
	C3 = [
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M8.35 2.69A10 10 0 0 1 21.3 15.65', key: '1pfsoa' }],
		['path', { d: 'M19.08 19.08A10 10 0 1 1 4.92 4.92', key: '1ablyi' }],
	],
	L3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M9 17V7h4a3 3 0 0 1 0 6H9', key: '1dfk2c' }],
	],
	b3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['line', { x1: '10', x2: '10', y1: '15', y2: '9', key: 'c1nkhi' }],
		['line', { x1: '14', x2: '14', y1: '15', y2: '9', key: 'h65svq' }],
	],
	S3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'm15 9-6 6', key: '1uzhvr' }],
		['path', { d: 'M9 9h.01', key: '1q5me6' }],
		['path', { d: 'M15 15h.01', key: 'lqbp3k' }],
	],
	D3 = [
		['circle', { cx: '12', cy: '19', r: '2', key: '13j0tp' }],
		['circle', { cx: '12', cy: '5', r: '2', key: 'f1ur92' }],
		['circle', { cx: '16', cy: '12', r: '2', key: '4ma0v8' }],
		['circle', { cx: '20', cy: '19', r: '2', key: '1obnsp' }],
		['circle', { cx: '4', cy: '19', r: '2', key: 'p3m9r0' }],
		['circle', { cx: '8', cy: '12', r: '2', key: '1nvbw3' }],
	],
	A3 = [
		[
			'path',
			{
				d: 'M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z',
				key: 'kmsa83',
			},
		],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	E3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
		['path', { d: 'M12 8v8', key: 'napkw2' }],
	],
	T3 = [
		['path', { d: 'M10 16V9.5a1 1 0 0 1 5 0', key: '1i1are' }],
		['path', { d: 'M8 12h4', key: 'qz6y1c' }],
		['path', { d: 'M8 16h7', key: 'sbedsn' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	P3 = [
		['path', { d: 'M12 7v4', key: 'xawao1' }],
		['path', { d: 'M7.998 9.003a5 5 0 1 0 8-.005', key: '1pek45' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	R3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', key: '1u773s' }],
		['path', { d: 'M12 17h.01', key: 'p32p05' }],
	],
	N3 = [
		['path', { d: 'M22 2 2 22', key: 'y4kqgn' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	_3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['line', { x1: '9', x2: '15', y1: '15', y2: '9', key: '1dfufj' }],
	],
	H3 = [['circle', { cx: '12', cy: '12', r: '6', key: '1vlfrh' }]],
	O3 = [
		[
			'path',
			{
				d: 'M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z',
				key: '285bvi',
			},
		],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	F3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['rect', { x: '9', y: '9', width: '6', height: '6', rx: '1', key: '1ssd4o' }],
	],
	j3 = [
		['path', { d: 'M18 20a6 6 0 0 0-12 0', key: '1qehca' }],
		['circle', { cx: '12', cy: '10', r: '4', key: '1h16sb' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	q3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['circle', { cx: '12', cy: '10', r: '3', key: 'ilqhr7' }],
		['path', { d: 'M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662', key: '154egf' }],
	],
	V3 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'm15 9-6 6', key: '1uzhvr' }],
		['path', { d: 'm9 9 6 6', key: 'z0biqf' }],
	],
	z3 = [['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }]],
	B3 = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M11 9h4a2 2 0 0 0 2-2V3', key: '1ve2rv' }],
		['circle', { cx: '9', cy: '9', r: '2', key: 'af1f0g' }],
		['path', { d: 'M7 21v-4a2 2 0 0 1 2-2h4', key: '1fwkro' }],
		['circle', { cx: '15', cy: '15', r: '2', key: '3i40o0' }],
	],
	U3 = [
		[
			'path',
			{ d: 'M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z', key: '4ite01' },
		],
		['path', { d: 'M19.65 15.66A8 8 0 0 1 8.35 4.34', key: '1gxipu' }],
		['path', { d: 'm14 10-5.5 5.5', key: '92pfem' }],
		['path', { d: 'M14 17.85V10H6.15', key: 'xqmtsk' }],
	],
	G3 = [
		['path', { d: 'M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z', key: '1tn4o7' }],
		['path', { d: 'm6.2 5.3 3.1 3.9', key: 'iuk76l' }],
		['path', { d: 'm12.4 3.4 3.1 4', key: '6hsd6n' }],
		['path', { d: 'M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z', key: 'ltgou9' }],
	],
	W3 = [
		['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1', key: 'tgr4d6' }],
		['path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', key: '116196' }],
		['path', { d: 'm9 14 2 2 4-4', key: 'df797q' }],
	],
	$3 = [
		['path', { d: 'M16 14v2.2l1.6 1', key: 'fo4ql5' }],
		['path', { d: 'M16 4h2a2 2 0 0 1 2 2v.832', key: '1ujtp2' }],
		['path', { d: 'M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2', key: 'qvpao1' }],
		['circle', { cx: '16', cy: '16', r: '6', key: 'qoo3c4' }],
		['rect', { x: '8', y: '2', width: '8', height: '4', rx: '1', key: 'ublpy' }],
	],
	Z3 = [
		['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1', key: 'tgr4d6' }],
		['path', { d: 'M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2', key: '4jdomd' }],
		['path', { d: 'M16 4h2a2 2 0 0 1 2 2v4', key: '3hqy98' }],
		['path', { d: 'M21 14H11', key: '1bme5i' }],
		['path', { d: 'm15 10-4 4 4 4', key: '5dvupr' }],
	],
	Q3 = [
		['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1', key: 'tgr4d6' }],
		['path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', key: '116196' }],
		['path', { d: 'M12 11h4', key: '1jrz19' }],
		['path', { d: 'M12 16h4', key: 'n85exb' }],
		['path', { d: 'M8 11h.01', key: '1dfujw' }],
		['path', { d: 'M8 16h.01', key: '18s6g9' }],
	],
	X3 = [
		['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1', key: 'tgr4d6' }],
		['path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', key: '116196' }],
		['path', { d: 'M9 14h6', key: '159ibu' }],
	],
	K3 = [
		['path', { d: 'M11 14h10', key: '1w8e9d' }],
		['path', { d: 'M16 4h2a2 2 0 0 1 2 2v1.344', key: '1e62lh' }],
		['path', { d: 'm17 18 4-4-4-4', key: 'z2g111' }],
		['path', { d: 'M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113', key: 'bjbb7m' }],
		['rect', { x: '8', y: '2', width: '8', height: '4', rx: '1', key: 'ublpy' }],
	],
	Y3 = [
		['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', key: '1oijnt' }],
		['path', { d: 'M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5', key: '1but9f' }],
		['path', { d: 'M16 4h2a2 2 0 0 1 1.73 1', key: '1p8n7l' }],
		['path', { d: 'M8 18h1', key: '13wk12' }],
		[
			'path',
			{
				d: 'M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
				key: '2t3380',
			},
		],
	],
	J3 = [
		['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', key: '1oijnt' }],
		['path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5', key: 'cereej' }],
		['path', { d: 'M4 13.5V6a2 2 0 0 1 2-2h2', key: '5ua5vh' }],
		[
			'path',
			{
				d: 'M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
				key: '1y4qbx',
			},
		],
	],
	em = [
		['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1', key: 'tgr4d6' }],
		['path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', key: '116196' }],
		['path', { d: 'M9 14h6', key: '159ibu' }],
		['path', { d: 'M12 17v-6', key: '1y8rbf' }],
	],
	tm = [
		['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1', key: 'tgr4d6' }],
		['path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', key: '116196' }],
		['path', { d: 'M9 12v-1h6v1', key: 'iehl6m' }],
		['path', { d: 'M11 17h2', key: '12w5me' }],
		['path', { d: 'M12 11v6', key: '1bwqyc' }],
	],
	nm = [
		['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1', key: 'tgr4d6' }],
		['path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', key: '116196' }],
		['path', { d: 'm15 11-6 6', key: '1toa9n' }],
		['path', { d: 'm9 11 6 6', key: 'wlibny' }],
	],
	am = [
		['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1', key: 'tgr4d6' }],
		['path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', key: '116196' }],
	],
	om = [
		['path', { d: 'M12 6v6l2-4', key: 'miptyd' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	rm = [
		['path', { d: 'M12 6v6l-4-2', key: 'cedpoo' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	im = [
		['path', { d: 'M12 6v6l-2-4', key: 'ns39ag' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	sm = [
		['path', { d: 'M12 6v6', key: '1ipuwl' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	cm = [
		['path', { d: 'M12 6v6l4-2', key: '1r2kuh' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	dm = [
		['path', { d: 'M12 6v6h4', key: '135r8i' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	lm = [
		['path', { d: 'M12 6v6l4 2', key: 'mmk7yg' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	um = [
		['path', { d: 'M12 6v10', key: 'wf7rdh' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	hm = [
		['path', { d: 'M12 6v6l2 4', key: '1287s9' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	pm = [
		['path', { d: 'M12 6v6l-2 4', key: '1095bu' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	ym = [
		['path', { d: 'M12 6v6l-4 2', key: 'imc3wl' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	fm = [
		['path', { d: 'M12 6v6H8', key: 'u39vzm' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	km = [
		['path', { d: 'M12 6v6l4 2', key: 'mmk7yg' }],
		['path', { d: 'M20 12v5', key: '12wsvk' }],
		['path', { d: 'M20 21h.01', key: '1p6o6n' }],
		['path', { d: 'M21.25 8.2A10 10 0 1 0 16 21.16', key: '17fp9f' }],
	],
	gm = [
		['path', { d: 'M12 6v6l2 1', key: '19cm8n' }],
		['path', { d: 'M12.337 21.994a10 10 0 1 1 9.588-8.767', key: '28moa' }],
		['path', { d: 'm14 18 4 4 4-4', key: '1waygx' }],
		['path', { d: 'M18 14v8', key: 'irew45' }],
	],
	mm = [
		['path', { d: 'M12 6v6l1.56.78', key: '14ed3g' }],
		['path', { d: 'M13.227 21.925a10 10 0 1 1 8.767-9.588', key: 'jwkls1' }],
		['path', { d: 'm14 18 4-4 4 4', key: 'ftkppy' }],
		['path', { d: 'M18 22v-8', key: 'su0gjh' }],
	],
	Mm = [
		['path', { d: 'M12 6v6l4 2', key: 'mmk7yg' }],
		['path', { d: 'M22 12a10 10 0 1 0-11 9.95', key: '17dhok' }],
		['path', { d: 'm22 16-5.5 5.5L14 19', key: '1eibut' }],
	],
	vm = [
		['path', { d: 'M12 2a10 10 0 0 1 7.38 16.75', key: '175t95' }],
		['path', { d: 'M12 6v6l4 2', key: 'mmk7yg' }],
		['path', { d: 'M2.5 8.875a10 10 0 0 0-.5 3', key: '1vce0s' }],
		['path', { d: 'M2.83 16a10 10 0 0 0 2.43 3.4', key: 'o3fkw4' }],
		['path', { d: 'M4.636 5.235a10 10 0 0 1 .891-.857', key: '1szpfk' }],
		['path', { d: 'M8.644 21.42a10 10 0 0 0 7.631-.38', key: '9yhvd4' }],
	],
	Im = [
		['path', { d: 'M12 6v6l3.644 1.822', key: '1jmett' }],
		['path', { d: 'M16 19h6', key: 'xwg31i' }],
		['path', { d: 'M19 16v6', key: 'tddt3s' }],
		['path', { d: 'M21.92 13.267a10 10 0 1 0-8.653 8.653', key: '1u0osk' }],
	],
	xm = [
		['path', { d: 'M12 6v6l4 2', key: 'mmk7yg' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	wm = [
		['path', { d: 'M10 9.17a3 3 0 1 0 0 5.66', key: 'h9wayk' }],
		['path', { d: 'M17 9.17a3 3 0 1 0 0 5.66', key: '1v6zke' }],
		['rect', { x: '2', y: '5', width: '20', height: '14', rx: '2', key: 'qneu4z' }],
	],
	Cm = [
		['path', { d: 'M12 12v4', key: 'tww15h' }],
		['path', { d: 'M12 20h.01', key: 'zekei9' }],
		['path', { d: 'M17 18h.5a1 1 0 0 0 0-9h-1.79A7 7 0 1 0 7 17.708', key: 'xsb5ju' }],
	],
	Lm = [
		['path', { d: 'M21 15.251A4.5 4.5 0 0 0 17.5 8h-1.79A7 7 0 1 0 3 13.607', key: 'xpoh9y' }],
		['path', { d: 'M7 11v4h4', key: 'q9yh32' }],
		['path', { d: 'M8 19a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5 4.82 4.82 0 0 0-3.41 1.41L7 15', key: '1xm8iu' }],
	],
	bm = [
		['path', { d: 'm17 15-5.5 5.5L9 18', key: '15q87x' }],
		['path', { d: 'M5 17.743A7 7 0 1 1 15.71 10h1.79a4.5 4.5 0 0 1 1.5 8.742', key: '9ho6ki' }],
	],
	Sm = [
		['path', { d: 'm10.852 19.772-.383.924', key: 'r7sl7d' }],
		['path', { d: 'm13.148 14.228.383-.923', key: '1d5zpm' }],
		['path', { d: 'M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923', key: '1ydik7' }],
		['path', { d: 'm13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544', key: '1m1vsf' }],
		['path', { d: 'm14.772 15.852.923-.383', key: '660p6e' }],
		['path', { d: 'm14.772 18.148.923.383', key: 'hrcpis' }],
		['path', { d: 'M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2', key: 'j2q98n' }],
		['path', { d: 'm9.228 15.852-.923-.383', key: '1p9ong' }],
		['path', { d: 'm9.228 18.148-.923.383', key: '6558rz' }],
	],
	Dm = [
		['path', { d: 'M12 13v8l-4-4', key: '1f5nwf' }],
		['path', { d: 'm12 21 4-4', key: '1lfcce' }],
		['path', { d: 'M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284', key: 'ui1hmy' }],
	],
	Am = [
		['path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242', key: '1pljnt' }],
		['path', { d: 'M8 19v1', key: '1dk2by' }],
		['path', { d: 'M8 14v1', key: '84yxot' }],
		['path', { d: 'M16 19v1', key: 'v220m7' }],
		['path', { d: 'M16 14v1', key: 'g12gj6' }],
		['path', { d: 'M12 21v1', key: 'q8vafk' }],
		['path', { d: 'M12 16v1', key: '1mx6rx' }],
	],
	Em = [
		['path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242', key: '1pljnt' }],
		['path', { d: 'M16 17H7', key: 'pygtm1' }],
		['path', { d: 'M17 21H9', key: '1u2q02' }],
	],
	Tm = [
		['path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242', key: '1pljnt' }],
		['path', { d: 'M16 14v2', key: 'a1is7l' }],
		['path', { d: 'M8 14v2', key: '1e9m6t' }],
		['path', { d: 'M16 20h.01', key: 'xwek51' }],
		['path', { d: 'M8 20h.01', key: '1vjney' }],
		['path', { d: 'M12 16v2', key: 'z66u1j' }],
		['path', { d: 'M12 22h.01', key: '1urd7a' }],
	],
	Pm = [
		['path', { d: 'M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973', key: '1cez44' }],
		['path', { d: 'm13 12-3 5h4l-3 5', key: '1t22er' }],
	],
	Rm = [
		['path', { d: 'M11 20v2', key: '174qtz' }],
		[
			'path',
			{
				d: 'M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36',
				key: 'zwnc1e',
			},
		],
		['path', { d: 'M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24', key: '1qmrp3' }],
		['path', { d: 'M7 19v2', key: '12npes' }],
	],
	Nm = [
		['path', { d: 'M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z', key: 'ie2ih4' }],
		[
			'path',
			{
				d: 'M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36',
				key: 'zwnc1e',
			},
		],
	],
	_m = [
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193', key: 'yfwify' }],
		['path', { d: 'M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07', key: 'jlfiyv' }],
	],
	Hm = [
		['path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242', key: '1pljnt' }],
		['path', { d: 'm9.2 22 3-7', key: 'sb5f6j' }],
		['path', { d: 'm9 13-3 7', key: '500co5' }],
		['path', { d: 'm17 13-3 7', key: '8t2fiy' }],
	],
	Om = [
		['path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242', key: '1pljnt' }],
		['path', { d: 'M16 14v6', key: '1j4efv' }],
		['path', { d: 'M8 14v6', key: '17c4r9' }],
		['path', { d: 'M12 16v6', key: 'c8a4gj' }],
	],
	Fm = [
		['path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242', key: '1pljnt' }],
		['path', { d: 'M8 15h.01', key: 'a7atzg' }],
		['path', { d: 'M8 19h.01', key: 'puxtts' }],
		['path', { d: 'M12 17h.01', key: 'p32p05' }],
		['path', { d: 'M12 21h.01', key: 'h35vbk' }],
		['path', { d: 'M16 15h.01', key: 'rnfrdf' }],
		['path', { d: 'M16 19h.01', key: '1vcnzz' }],
	],
	jm = [
		['path', { d: 'M12 2v2', key: 'tus03m' }],
		['path', { d: 'm4.93 4.93 1.41 1.41', key: '149t6j' }],
		['path', { d: 'M20 12h2', key: '1q8mjw' }],
		['path', { d: 'm19.07 4.93-1.41 1.41', key: '1shlcs' }],
		['path', { d: 'M15.947 12.65a4 4 0 0 0-5.925-4.128', key: 'dpwdj0' }],
		['path', { d: 'M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z', key: 's09mg5' }],
	],
	qm = [
		['path', { d: 'm17 18-1.535 1.605a5 5 0 0 1-8-1.5', key: 'adpv5j' }],
		['path', { d: 'M17 22v-4h-4', key: 'ex1ofj' }],
		['path', { d: 'M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607', key: 'ziqt14' }],
		['path', { d: 'M7 10v4h4', key: '1j6gx1' }],
		['path', { d: 'm7 14 1.535-1.605a5 5 0 0 1 8 1.5', key: '19q5h7' }],
	],
	Vm = [
		['path', { d: 'M12 2v2', key: 'tus03m' }],
		['path', { d: 'm4.93 4.93 1.41 1.41', key: '149t6j' }],
		['path', { d: 'M20 12h2', key: '1q8mjw' }],
		['path', { d: 'm19.07 4.93-1.41 1.41', key: '1shlcs' }],
		['path', { d: 'M15.947 12.65a4 4 0 0 0-5.925-4.128', key: 'dpwdj0' }],
		['path', { d: 'M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24', key: '1qmrp3' }],
		['path', { d: 'M11 20v2', key: '174qtz' }],
		['path', { d: 'M7 19v2', key: '12npes' }],
	],
	zm = [
		['path', { d: 'M12 13v8', key: '1l5pq0' }],
		['path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242', key: '1pljnt' }],
		['path', { d: 'm8 17 4-4 4 4', key: '1quai1' }],
	],
	Bm = [['path', { d: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z', key: 'p7xjir' }]],
	Um = [
		['path', { d: 'M16.17 7.83 2 22', key: 't58vo8' }],
		[
			'path',
			{
				d: 'M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12',
				key: '17k36q',
			},
		],
		['path', { d: 'm7.83 7.83 8.34 8.34', key: '1d7sxk' }],
	],
	Gm = [
		['path', { d: 'M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z', key: 'gqqjvc' }],
		['path', { d: 'M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5', key: '1p2s76' }],
	],
	Wm = [
		[
			'path',
			{ d: 'M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z', key: '27yuqz' },
		],
		['path', { d: 'M12 17.66L12 22', key: 'ogfahf' }],
	],
	$m = [
		['path', { d: 'm18 16 4-4-4-4', key: '1inbqp' }],
		['path', { d: 'm6 8-4 4 4 4', key: '15zrgr' }],
		['path', { d: 'm14.5 4-5 16', key: 'e7oirm' }],
	],
	Zm = [
		['path', { d: 'm16 18 6-6-6-6', key: 'eg8j8' }],
		['path', { d: 'm8 6-6 6 6 6', key: 'ppft3o' }],
	],
	Qm = [
		['polygon', { points: '12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2', key: 'srzb37' }],
		['line', { x1: '12', x2: '12', y1: '22', y2: '15.5', key: '1t73f2' }],
		['polyline', { points: '22 8.5 12 15.5 2 8.5', key: 'ajlxae' }],
		['polyline', { points: '2 15.5 12 8.5 22 15.5', key: 'susrui' }],
		['line', { x1: '12', x2: '12', y1: '2', y2: '8.5', key: '2cldga' }],
	],
	Xm = [
		[
			'path',
			{
				d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
				key: 'yt0hxn',
			},
		],
		['polyline', { points: '7.5 4.21 12 6.81 16.5 4.21', key: 'fabo96' }],
		['polyline', { points: '7.5 19.79 7.5 14.6 3 12', key: 'z377f1' }],
		['polyline', { points: '21 12 16.5 14.6 16.5 19.79', key: '9nrev1' }],
		['polyline', { points: '3.27 6.96 12 12.01 20.73 6.96', key: '1180pa' }],
		['line', { x1: '12', x2: '12', y1: '22.08', y2: '12', key: '3z3uq6' }],
	],
	Km = [
		['path', { d: 'M10 2v2', key: '7u0qdc' }],
		['path', { d: 'M14 2v2', key: '6buw04' }],
		[
			'path',
			{
				d: 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1',
				key: 'pwadti',
			},
		],
		['path', { d: 'M6 2v2', key: 'colzsn' }],
	],
	Ym = [
		['path', { d: 'M11 10.27 7 3.34', key: '16pf9h' }],
		['path', { d: 'm11 13.73-4 6.93', key: '794ttg' }],
		['path', { d: 'M12 22v-2', key: '1osdcq' }],
		['path', { d: 'M12 2v2', key: 'tus03m' }],
		['path', { d: 'M14 12h8', key: '4f43i9' }],
		['path', { d: 'm17 20.66-1-1.73', key: 'eq3orb' }],
		['path', { d: 'm17 3.34-1 1.73', key: '2wel8s' }],
		['path', { d: 'M2 12h2', key: '1t8f8n' }],
		['path', { d: 'm20.66 17-1.73-1', key: 'sg0v6f' }],
		['path', { d: 'm20.66 7-1.73 1', key: '1ow05n' }],
		['path', { d: 'm3.34 17 1.73-1', key: 'nuk764' }],
		['path', { d: 'm3.34 7 1.73 1', key: '1ulond' }],
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
		['circle', { cx: '12', cy: '12', r: '8', key: '46899m' }],
	],
	Jm = [
		['circle', { cx: '8', cy: '8', r: '6', key: '3yglwk' }],
		['path', { d: 'M18.09 10.37A6 6 0 1 1 10.34 18', key: 't5s6rm' }],
		['path', { d: 'M7 6h1v4', key: '1obek4' }],
		['path', { d: 'm16.71 13.88.7.71-2.82 2.82', key: '1rbuyh' }],
	],
	e8 = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M12 3v18', key: '108xh3' }],
	],
	t8 = [
		['path', { d: 'M10.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5', key: '1g2yzs' }],
		['path', { d: 'm14.3 19.6 1-.4', key: '11sv9r' }],
		['path', { d: 'M15 3v7.5', key: '7lm50a' }],
		['path', { d: 'm15.2 16.9-.9-.3', key: '1t7mvx' }],
		['path', { d: 'm16.6 21.7.3-.9', key: '1j67ps' }],
		['path', { d: 'm16.8 15.3-.4-1', key: '1ei7r6' }],
		['path', { d: 'm19.1 15.2.3-.9', key: '18r7jp' }],
		['path', { d: 'm19.6 21.7-.4-1', key: 'z2vh2' }],
		['path', { d: 'm20.7 16.8 1-.4', key: '19m87a' }],
		['path', { d: 'm21.7 19.4-.9-.3', key: '1qgwi9' }],
		['path', { d: 'M9 3v18', key: 'fh3hqa' }],
		['circle', { cx: '18', cy: '18', r: '3', key: '1xkwt0' }],
	],
	n8 = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M9 3v18', key: 'fh3hqa' }],
		['path', { d: 'M15 3v18', key: '14nvp0' }],
	],
	a8 = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M7.5 3v18', key: 'w0wo6v' }],
		['path', { d: 'M12 3v18', key: '108xh3' }],
		['path', { d: 'M16.5 3v18', key: '10tjh1' }],
	],
	o8 = [
		['path', { d: 'M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1', key: '1l7d7l' }],
		['path', { d: 'M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1', key: '9955pe' }],
		['path', { d: 'm7 15 3 3', key: '4hkfgk' }],
		['path', { d: 'm7 21 3-3H5a2 2 0 0 1-2-2v-2', key: '1xljwe' }],
		['rect', { x: '14', y: '14', width: '7', height: '7', rx: '1', key: '1cdgtw' }],
		['rect', { x: '3', y: '3', width: '7', height: '7', rx: '1', key: 'zi3rio' }],
	],
	r8 = [['path', { d: 'M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3', key: '11bfej' }]],
	i8 = [
		[
			'path',
			{
				d: 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z',
				key: '9ktpf1',
			},
		],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	s8 = [
		[
			'path',
			{
				d: 'M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z',
				key: '1uwlt4',
			},
		],
		[
			'path',
			{
				d: 'M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z',
				key: '10291m',
			},
		],
		[
			'path',
			{
				d: 'M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z',
				key: '1tqoq1',
			},
		],
		[
			'path',
			{
				d: 'M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z',
				key: '1x6lto',
			},
		],
	],
	c8 = [
		['rect', { width: '14', height: '8', x: '5', y: '2', rx: '2', key: 'wc9tft' }],
		['rect', { width: '20', height: '8', x: '2', y: '14', rx: '2', key: 'w68u3i' }],
		['path', { d: 'M6 18h2', key: 'rwmk9e' }],
		['path', { d: 'M12 18h6', key: 'aqd8w3' }],
	],
	d8 = [
		['path', { d: 'm20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98', key: '53pte7' }],
		['ellipse', { cx: '12', cy: '19', rx: '9', ry: '3', key: '1ji25f' }],
	],
	l8 = [
		['path', { d: 'M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z', key: '1pvr1r' }],
		['path', { d: 'M20 16a8 8 0 1 0-16 0', key: '1pa543' }],
		['path', { d: 'M12 4v4', key: '1bq03y' }],
		['path', { d: 'M10 4h4', key: '1xpv9s' }],
	],
	u8 = [
		['rect', { x: '2', y: '6', width: '20', height: '8', rx: '1', key: '1estib' }],
		['path', { d: 'M17 14v7', key: '7m2elx' }],
		['path', { d: 'M7 14v7', key: '1cm7wv' }],
		['path', { d: 'M17 3v3', key: '1v4jwn' }],
		['path', { d: 'M7 3v3', key: '7o6guu' }],
		['path', { d: 'M10 14 2.3 6.3', key: '1023jk' }],
		['path', { d: 'm14 6 7.7 7.7', key: '1s8pl2' }],
		['path', { d: 'm8 6 8 8', key: 'hl96qh' }],
	],
	h8 = [
		['path', { d: 'M16 2v2', key: 'scm5qe' }],
		['path', { d: 'M17.915 22a6 6 0 0 0-12 0', key: 'suqz9p' }],
		['path', { d: 'M8 2v2', key: 'pbkmx' }],
		['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
		['rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', key: '12vinp' }],
	],
	p8 = [
		['path', { d: 'M16 2v2', key: 'scm5qe' }],
		['path', { d: 'M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2', key: '1waht3' }],
		['path', { d: 'M8 2v2', key: 'pbkmx' }],
		['circle', { cx: '12', cy: '11', r: '3', key: 'itu57m' }],
		['rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', key: '12vinp' }],
	],
	y8 = [
		[
			'path',
			{
				d: 'M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z',
				key: '1t2lqe',
			},
		],
		['path', { d: 'M10 21.9V14L2.1 9.1', key: 'o7czzq' }],
		['path', { d: 'm10 14 11.9-6.9', key: 'zm5e20' }],
		['path', { d: 'M14 19.8v-8.1', key: '159ecu' }],
		['path', { d: 'M18 17.5V9.4', key: '11uown' }],
	],
	f8 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M12 18a6 6 0 0 0 0-12v12z', key: 'j4l70d' }],
	],
	k8 = [
		['path', { d: 'M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5', key: 'laymnq' }],
		['path', { d: 'M8.5 8.5v.01', key: 'ue8clq' }],
		['path', { d: 'M16 15.5v.01', key: '14dtrp' }],
		['path', { d: 'M12 12v.01', key: 'u5ubse' }],
		['path', { d: 'M11 17v.01', key: '1hyl5a' }],
		['path', { d: 'M7 14v.01', key: 'uct60s' }],
	],
	g8 = [
		['path', { d: 'M2 12h20', key: '9i4pu4' }],
		['path', { d: 'M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8', key: 'u0tga0' }],
		['path', { d: 'm4 8 16-4', key: '16g0ng' }],
		['path', { d: 'm8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8', key: '12cejc' }],
	],
	m8 = [
		['path', { d: 'm12 15 2 2 4-4', key: '2c609p' }],
		['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2', key: '17jyea' }],
		['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2', key: 'zix9uf' }],
	],
	M8 = [
		['line', { x1: '12', x2: '18', y1: '15', y2: '15', key: '1nscbv' }],
		['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2', key: '17jyea' }],
		['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2', key: 'zix9uf' }],
	],
	v8 = [
		['line', { x1: '15', x2: '15', y1: '12', y2: '18', key: '1p7wdc' }],
		['line', { x1: '12', x2: '18', y1: '15', y2: '15', key: '1nscbv' }],
		['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2', key: '17jyea' }],
		['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2', key: 'zix9uf' }],
	],
	I8 = [
		['line', { x1: '12', x2: '18', y1: '18', y2: '12', key: 'ebkxgr' }],
		['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2', key: '17jyea' }],
		['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2', key: 'zix9uf' }],
	],
	x8 = [
		['line', { x1: '12', x2: '18', y1: '12', y2: '18', key: '1rg63v' }],
		['line', { x1: '12', x2: '18', y1: '18', y2: '12', key: 'ebkxgr' }],
		['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2', key: '17jyea' }],
		['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2', key: 'zix9uf' }],
	],
	w8 = [
		['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2', key: '17jyea' }],
		['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2', key: 'zix9uf' }],
	],
	C8 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M9.17 14.83a4 4 0 1 0 0-5.66', key: '1sveal' }],
	],
	L8 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M14.83 14.83a4 4 0 1 1 0-5.66', key: '1i56pz' }],
	],
	b8 = [
		['path', { d: 'M20 4v7a4 4 0 0 1-4 4H4', key: '6o5b7l' }],
		['path', { d: 'm9 10-5 5 5 5', key: '1kshq7' }],
	],
	S8 = [
		['path', { d: 'm14 15-5 5-5-5', key: '1eia93' }],
		['path', { d: 'M20 4h-7a4 4 0 0 0-4 4v12', key: 'nbpdq2' }],
	],
	D8 = [
		['path', { d: 'm15 10 5 5-5 5', key: 'qqa56n' }],
		['path', { d: 'M4 4v7a4 4 0 0 0 4 4h12', key: 'z08zvw' }],
	],
	A8 = [
		['path', { d: 'M14 9 9 4 4 9', key: '1af5af' }],
		['path', { d: 'M20 20h-7a4 4 0 0 1-4-4V4', key: '1blwi3' }],
	],
	E8 = [
		['path', { d: 'm10 15 5 5 5-5', key: '1hpjnr' }],
		['path', { d: 'M4 4h7a4 4 0 0 1 4 4v12', key: 'wcbgct' }],
	],
	T8 = [
		['path', { d: 'm10 9 5-5 5 5', key: '9ctzwi' }],
		['path', { d: 'M4 20h7a4 4 0 0 0 4-4V4', key: '1plgdj' }],
	],
	P8 = [
		['path', { d: 'M20 20v-7a4 4 0 0 0-4-4H4', key: '1nkjon' }],
		['path', { d: 'M9 14 4 9l5-5', key: '102s5s' }],
	],
	R8 = [
		['path', { d: 'm15 14 5-5-5-5', key: '12vg1m' }],
		['path', { d: 'M4 20v-7a4 4 0 0 1 4-4h12', key: '1lu4f8' }],
	],
	N8 = [
		['rect', { width: '20', height: '14', x: '2', y: '5', rx: '2', key: 'ynyp8z' }],
		['line', { x1: '2', x2: '22', y1: '10', y2: '10', key: '1b3vmo' }],
	],
	_8 = [
		['path', { d: 'M12 20v2', key: '1lh1kg' }],
		['path', { d: 'M12 2v2', key: 'tus03m' }],
		['path', { d: 'M17 20v2', key: '1rnc9c' }],
		['path', { d: 'M17 2v2', key: '11trls' }],
		['path', { d: 'M2 12h2', key: '1t8f8n' }],
		['path', { d: 'M2 17h2', key: '7oei6x' }],
		['path', { d: 'M2 7h2', key: 'asdhe0' }],
		['path', { d: 'M20 12h2', key: '1q8mjw' }],
		['path', { d: 'M20 17h2', key: '1fpfkl' }],
		['path', { d: 'M20 7h2', key: '1o8tra' }],
		['path', { d: 'M7 20v2', key: '4gnj0m' }],
		['path', { d: 'M7 2v2', key: '1i4yhu' }],
		['rect', { x: '4', y: '4', width: '16', height: '16', rx: '2', key: '1vbyd7' }],
		['rect', { x: '8', y: '8', width: '8', height: '8', rx: '1', key: 'z9xiuo' }],
	],
	H8 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1', key: '1ss3eq' }],
		['path', { d: 'M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1', key: '1od56t' }],
	],
	O8 = [
		['path', { d: 'M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487', key: '14kkz9' }],
		['path', { d: 'M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132', key: '1g7v07' }],
		['path', { d: 'M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42', key: 'ratg6b' }],
		['path', { d: 'M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14', key: '4454f0' }],
		[
			'path',
			{
				d: 'M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676',
				key: 'qmemie',
			},
		],
	],
	F8 = [
		['path', { d: 'M6 2v14a2 2 0 0 0 2 2h14', key: 'ron5a4' }],
		['path', { d: 'M18 22V8a2 2 0 0 0-2-2H2', key: '7s9ehn' }],
	],
	j8 = [
		[
			'path',
			{
				d: 'M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z',
				key: '1xbrqy',
			},
		],
	],
	q8 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['line', { x1: '22', x2: '18', y1: '12', y2: '12', key: 'l9bcsi' }],
		['line', { x1: '6', x2: '2', y1: '12', y2: '12', key: '13hhkx' }],
		['line', { x1: '12', x2: '12', y1: '6', y2: '2', key: '10w3f3' }],
		['line', { x1: '12', x2: '12', y1: '22', y2: '18', key: '15g9kq' }],
	],
	V8 = [
		[
			'path',
			{
				d: 'M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z',
				key: '1vdc57',
			},
		],
		['path', { d: 'M5 21h14', key: '11awu3' }],
	],
	z8 = [
		[
			'path',
			{
				d: 'm21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z',
				key: '1u2ovd',
			},
		],
		['path', { d: 'M10 22v-8L2.25 9.15', key: '11pn4q' }],
		['path', { d: 'm10 14 11.77-6.87', key: '1kt1wh' }],
	],
	B8 = [
		['path', { d: 'm6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8', key: '8166m8' }],
		['path', { d: 'M5 8h14', key: 'pcz4l3' }],
		['path', { d: 'M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0', key: 'yjz344' }],
		['path', { d: 'm12 8 1-6h2', key: '3ybfa4' }],
	],
	U8 = [
		['circle', { cx: '12', cy: '12', r: '8', key: '46899m' }],
		['line', { x1: '3', x2: '6', y1: '3', y2: '6', key: '1jkytn' }],
		['line', { x1: '21', x2: '18', y1: '3', y2: '6', key: '14zfjt' }],
		['line', { x1: '3', x2: '6', y1: '21', y2: '18', key: 'iusuec' }],
		['line', { x1: '21', x2: '18', y1: '21', y2: '18', key: 'yj2dd7' }],
	],
	G8 = [
		['ellipse', { cx: '12', cy: '5', rx: '9', ry: '3', key: 'msslwz' }],
		['path', { d: 'M3 5v14a9 3 0 0 0 18 0V5', key: 'aqi0yr' }],
	],
	W8 = [
		['path', { d: 'M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', key: '157kva' }],
		['path', { d: 'M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', key: 'd7q6m6' }],
		['path', { d: 'M2 10h4', key: 'l0bgd4' }],
		['path', { d: 'M2 14h4', key: '1gsvsf' }],
		['path', { d: 'M2 18h4', key: '1bu2t1' }],
		['path', { d: 'M2 6h4', key: 'aawbzj' }],
		['path', { d: 'M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z', key: 'pr6s65' }],
	],
	$8 = [
		['ellipse', { cx: '12', cy: '5', rx: '9', ry: '3', key: 'msslwz' }],
		['path', { d: 'M3 12a9 3 0 0 0 5 2.69', key: '1ui2ym' }],
		['path', { d: 'M21 9.3V5', key: '6k6cib' }],
		['path', { d: 'M3 5v14a9 3 0 0 0 6.47 2.88', key: 'i62tjy' }],
		['path', { d: 'M12 12v4h4', key: '1bxaet' }],
		['path', { d: 'M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16', key: '1f4ei9' }],
	],
	Z8 = [
		['ellipse', { cx: '12', cy: '5', rx: '9', ry: '3', key: 'msslwz' }],
		['path', { d: 'M3 5V19A9 3 0 0 0 15 21.84', key: '14ibmq' }],
		['path', { d: 'M21 5V8', key: '1marbg' }],
		['path', { d: 'M21 12L18 17H22L19 22', key: 'zafso' }],
		['path', { d: 'M3 12A9 3 0 0 0 14.59 14.87', key: '1y4wr8' }],
	],
	Q8 = [
		['ellipse', { cx: '12', cy: '5', rx: '9', ry: '3', key: 'msslwz' }],
		['path', { d: 'M3 5V19A9 3 0 0 0 21 19V5', key: '1wlel7' }],
		['path', { d: 'M3 12A9 3 0 0 0 21 12', key: 'mv7ke4' }],
	],
	X8 = [
		['path', { d: 'm13 21-3-3 3-3', key: 's3o1nf' }],
		['path', { d: 'M20 18H10', key: '14r3mt' }],
		['path', { d: 'M3 11h.01', key: '1eifu7' }],
		['rect', { x: '6', y: '3', width: '5', height: '8', rx: '2.5', key: 'v9paqo' }],
	],
	K8 = [
		[
			'path',
			{
				d: 'M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z',
				key: '1yo7s0',
			},
		],
		['path', { d: 'm12 9 6 6', key: 'anjzzh' }],
		['path', { d: 'm18 9-6 6', key: '1fp51s' }],
	],
	Y8 = [
		['path', { d: 'M10 18h10', key: '1y5s8o' }],
		['path', { d: 'm17 21 3-3-3-3', key: '1ammt0' }],
		['path', { d: 'M3 11h.01', key: '1eifu7' }],
		['rect', { x: '15', y: '3', width: '5', height: '8', rx: '2.5', key: '76md6a' }],
		['rect', { x: '6', y: '3', width: '5', height: '8', rx: '2.5', key: 'v9paqo' }],
	],
	J8 = [
		[
			'path',
			{
				d: 'M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826',
				key: 'xi88qy',
			},
		],
		['path', { d: 'M20.804 14.869a9 9 0 0 1-17.608 0', key: '1r28rg' }],
		['circle', { cx: '12', cy: '4', r: '2', key: 'muu5ef' }],
	],
	e6 = [
		['circle', { cx: '19', cy: '19', r: '2', key: '17f5cg' }],
		['circle', { cx: '5', cy: '5', r: '2', key: '1gwv83' }],
		['path', { d: 'M6.48 3.66a10 10 0 0 1 13.86 13.86', key: 'xr8kdq' }],
		['path', { d: 'm6.41 6.41 11.18 11.18', key: 'uhpjw7' }],
		['path', { d: 'M3.66 6.48a10 10 0 0 0 13.86 13.86', key: 'cldpwv' }],
	],
	t6 = [
		[
			'path',
			{
				d: 'M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z',
				key: '1ey20j',
			},
		],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
	],
	n6 = [
		[
			'path',
			{
				d: 'M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z',
				key: '1tpxz2',
			},
		],
		['path', { d: 'M9.2 9.2h.01', key: '1b7bvt' }],
		['path', { d: 'm14.5 9.5-5 5', key: '17q4r4' }],
		['path', { d: 'M14.7 14.8h.01', key: '17nsh4' }],
	],
	a6 = [
		['path', { d: 'M12 8v8', key: 'napkw2' }],
		[
			'path',
			{
				d: 'M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z',
				key: '1ey20j',
			},
		],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
	],
	o6 = [
		[
			'path',
			{
				d: 'M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z',
				key: '1f1r0c',
			},
		],
	],
	r6 = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
		['path', { d: 'M12 12h.01', key: '1mp3jc' }],
	],
	i6 = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
		['path', { d: 'M15 9h.01', key: 'x1ddxp' }],
		['path', { d: 'M9 15h.01', key: 'fzyn71' }],
	],
	s6 = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
		['path', { d: 'M16 8h.01', key: 'cr5u4v' }],
		['path', { d: 'M12 12h.01', key: '1mp3jc' }],
		['path', { d: 'M8 16h.01', key: '18s6g9' }],
	],
	c6 = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
		['path', { d: 'M16 8h.01', key: 'cr5u4v' }],
		['path', { d: 'M8 8h.01', key: '1e4136' }],
		['path', { d: 'M8 16h.01', key: '18s6g9' }],
		['path', { d: 'M16 16h.01', key: '1f9h7w' }],
	],
	d6 = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
		['path', { d: 'M16 8h.01', key: 'cr5u4v' }],
		['path', { d: 'M8 8h.01', key: '1e4136' }],
		['path', { d: 'M8 16h.01', key: '18s6g9' }],
		['path', { d: 'M16 16h.01', key: '1f9h7w' }],
		['path', { d: 'M12 12h.01', key: '1mp3jc' }],
	],
	l6 = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
		['path', { d: 'M16 8h.01', key: 'cr5u4v' }],
		['path', { d: 'M16 12h.01', key: '1l6xoz' }],
		['path', { d: 'M16 16h.01', key: '1f9h7w' }],
		['path', { d: 'M8 8h.01', key: '1e4136' }],
		['path', { d: 'M8 12h.01', key: 'czm47f' }],
		['path', { d: 'M8 16h.01', key: '18s6g9' }],
	],
	u6 = [
		['rect', { width: '12', height: '12', x: '2', y: '10', rx: '2', ry: '2', key: '6agr2n' }],
		['path', { d: 'm17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6', key: '1o487t' }],
		['path', { d: 'M6 18h.01', key: 'uhywen' }],
		['path', { d: 'M10 14h.01', key: 'ssrbsk' }],
		['path', { d: 'M15 6h.01', key: 'cblpky' }],
		['path', { d: 'M18 9h.01', key: '2061c0' }],
	],
	h6 = [
		['path', { d: 'M12 3v14', key: '7cf3v8' }],
		['path', { d: 'M5 10h14', key: 'elsbfy' }],
		['path', { d: 'M5 21h14', key: '11awu3' }],
	],
	p6 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
		['path', { d: 'M12 12h.01', key: '1mp3jc' }],
	],
	y6 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M6 12c0-1.7.7-3.2 1.8-4.2', key: 'oqkarx' }],
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
		['path', { d: 'M18 12c0 1.7-.7 3.2-1.8 4.2', key: '1eah9h' }],
	],
	f6 = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['circle', { cx: '12', cy: '12', r: '5', key: 'nd82uf' }],
		['path', { d: 'M12 12h.01', key: '1mp3jc' }],
	],
	k6 = [
		['circle', { cx: '12', cy: '6', r: '1', key: '1bh7o1' }],
		['line', { x1: '5', x2: '19', y1: '12', y2: '12', key: '13b5wn' }],
		['circle', { cx: '12', cy: '18', r: '1', key: 'lqb9t5' }],
	],
	g6 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
	],
	m6 = [
		['path', { d: 'M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8', key: '1bivrr' }],
		['path', { d: 'm17 6-2.891-2.891', key: 'xu6p2f' }],
		['path', { d: 'M2 15c3.333-3 6.667-3 10-3', key: 'nxix30' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'm20 9 .891.891', key: '3xwk7g' }],
		['path', { d: 'M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1', key: '18cutr' }],
		['path', { d: 'M3.109 14.109 4 15', key: 'q76aoh' }],
		['path', { d: 'm6.5 12.5 1 1', key: 'cs35ky' }],
		['path', { d: 'm7 18 2.891 2.891', key: '1sisit' }],
		['path', { d: 'M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16', key: 'rlvei3' }],
	],
	M6 = [
		['path', { d: 'm10 16 1.5 1.5', key: '11lckj' }],
		['path', { d: 'm14 8-1.5-1.5', key: '1ohn8i' }],
		['path', { d: 'M15 2c-1.798 1.998-2.518 3.995-2.807 5.993', key: '80uv8i' }],
		['path', { d: 'm16.5 10.5 1 1', key: '696xn5' }],
		['path', { d: 'm17 6-2.891-2.891', key: 'xu6p2f' }],
		['path', { d: 'M2 15c6.667-6 13.333 0 20-6', key: '1pyr53' }],
		['path', { d: 'm20 9 .891.891', key: '3xwk7g' }],
		['path', { d: 'M3.109 14.109 4 15', key: 'q76aoh' }],
		['path', { d: 'm6.5 12.5 1 1', key: 'cs35ky' }],
		['path', { d: 'm7 18 2.891 2.891', key: '1sisit' }],
		['path', { d: 'M9 22c1.798-1.998 2.518-3.995 2.807-5.993', key: 'q3hbxp' }],
	],
	v6 = [
		['path', { d: 'M2 8h20', key: 'd11cs7' }],
		['rect', { width: '20', height: '16', x: '2', y: '4', rx: '2', key: '18n3k1' }],
		['path', { d: 'M6 16h12', key: 'u522kt' }],
	],
	I6 = [
		['path', { d: 'M11.25 16.25h1.5L12 17z', key: 'w7jh35' }],
		['path', { d: 'M16 14v.5', key: '1lajdz' }],
		[
			'path',
			{
				d: 'M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309',
				key: 'u7s9ue',
			},
		],
		['path', { d: 'M8 14v.5', key: '1nzgdb' }],
		[
			'path',
			{
				d: 'M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5',
				key: 'v8hric',
			},
		],
	],
	x6 = [
		['line', { x1: '12', x2: '12', y1: '2', y2: '22', key: '7eqyqh' }],
		['path', { d: 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', key: '1b0p4s' }],
	],
	w6 = [
		[
			'path',
			{
				d: 'M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3',
				key: '19sr3x',
			},
		],
		['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
	],
	C6 = [
		['path', { d: 'M10 12h.01', key: '1kxr2c' }],
		['path', { d: 'M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14', key: '1bnhmg' }],
		['path', { d: 'M2 20h8', key: '10ntw1' }],
		['path', { d: 'M20 17v-2a2 2 0 1 0-4 0v2', key: 'pwaxnr' }],
		['rect', { x: '14', y: '17', width: '8', height: '5', rx: '1', key: '15pjcy' }],
	],
	L6 = [
		['path', { d: 'M10 12h.01', key: '1kxr2c' }],
		['path', { d: 'M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14', key: '36qu9e' }],
		['path', { d: 'M2 20h20', key: 'owomy5' }],
	],
	b6 = [
		['path', { d: 'M11 20H2', key: 'nlcfvz' }],
		[
			'path',
			{
				d: 'M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z',
				key: 'au4z13',
			},
		],
		['path', { d: 'M11 4H8a2 2 0 0 0-2 2v14', key: '74r1mk' }],
		['path', { d: 'M14 12h.01', key: '1jfl7z' }],
		['path', { d: 'M22 20h-3', key: 'vhrsz' }],
	],
	S6 = [['circle', { cx: '12.1', cy: '12.1', r: '1', key: '18d7e5' }]],
	D6 = [
		['path', { d: 'M12 15V3', key: 'm9g1x1' }],
		['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', key: 'ih7n3h' }],
		['path', { d: 'm7 10 5 5 5-5', key: 'brsn70' }],
	],
	A6 = [
		['path', { d: 'm12.99 6.74 1.93 3.44', key: 'iwagvd' }],
		['path', { d: 'M19.136 12a10 10 0 0 1-14.271 0', key: 'ppmlo4' }],
		['path', { d: 'm21 21-2.16-3.84', key: 'vylbct' }],
		['path', { d: 'm3 21 8.02-14.26', key: '1ssaw4' }],
		['circle', { cx: '12', cy: '5', r: '2', key: 'f1ur92' }],
	],
	E6 = [
		['path', { d: 'M10 11h.01', key: 'd2at3l' }],
		['path', { d: 'M14 6h.01', key: 'k028ub' }],
		['path', { d: 'M18 6h.01', key: '1v4wsw' }],
		['path', { d: 'M6.5 13.1h.01', key: '1748ia' }],
		['path', { d: 'M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3', key: '172yzv' }],
		['path', { d: 'M17.4 9.9c-.8.8-2 .8-2.8 0', key: '1obv0w' }],
		[
			'path',
			{
				d: 'M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7',
				key: 'rqjl8i',
			},
		],
		['path', { d: 'M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4', key: '1mr6wy' }],
	],
	T6 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94', key: 'hpej1' }],
		['path', { d: 'M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32', key: '1tr44o' }],
		['path', { d: 'M8.56 2.75c4.37 6 6 9.42 8 17.72', key: 'kbh691' }],
	],
	P6 = [
		['path', { d: 'M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z', key: 'ioqxb1' }],
		[
			'path',
			{
				d: 'M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8',
				key: '1rs59n',
			},
		],
		['path', { d: 'M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3', key: '105ega' }],
		['path', { d: 'M18 6h4', key: '66u95g' }],
		['path', { d: 'm5 10-2 8', key: 'xt2lic' }],
		['path', { d: 'm7 18 2-8', key: '1bzku2' }],
	],
	R6 = [
		['path', { d: 'M10 10 7 7', key: 'zp14k7' }],
		['path', { d: 'm10 14-3 3', key: '1jrpxk' }],
		['path', { d: 'm14 10 3-3', key: '7tigam' }],
		['path', { d: 'm14 14 3 3', key: 'vm23p3' }],
		['path', { d: 'M14.205 4.139a4 4 0 1 1 5.439 5.863', key: '1tm5p2' }],
		['path', { d: 'M19.637 14a4 4 0 1 1-5.432 5.868', key: '16egi2' }],
		['path', { d: 'M4.367 10a4 4 0 1 1 5.438-5.862', key: '1wta6a' }],
		['path', { d: 'M9.795 19.862a4 4 0 1 1-5.429-5.873', key: 'q39hpv' }],
		['rect', { x: '10', y: '8', width: '4', height: '8', rx: '1', key: 'phrjt1' }],
	],
	N6 = [
		[
			'path',
			{
				d: 'M18.715 13.186C18.29 11.858 17.384 10.607 16 9.5c-2-1.6-3.5-4-4-6.5a10.7 10.7 0 0 1-.884 2.586',
				key: '8suz2t',
			},
		],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M8.795 8.797A11 11 0 0 1 8 9.5C6 11.1 5 13 5 15a7 7 0 0 0 13.222 3.208', key: '19dw9m' }],
	],
	_6 = [
		[
			'path',
			{
				d: 'M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z',
				key: 'c7niix',
			},
		],
	],
	H6 = [
		[
			'path',
			{
				d: 'M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z',
				key: '1ptgy4',
			},
		],
		[
			'path',
			{
				d: 'M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97',
				key: '1sl1rz',
			},
		],
	],
	O6 = [
		['path', { d: 'm2 2 8 8', key: '1v6059' }],
		['path', { d: 'm22 2-8 8', key: '173r8a' }],
		['ellipse', { cx: '12', cy: '9', rx: '10', ry: '5', key: 'liohsx' }],
		['path', { d: 'M7 13.4v7.9', key: '1yi6u9' }],
		['path', { d: 'M12 14v8', key: '1tn2tj' }],
		['path', { d: 'M17 13.4v7.9', key: 'eqz2v3' }],
		['path', { d: 'M2 9v8a10 5 0 0 0 20 0V9', key: '1750ul' }],
	],
	F6 = [
		['path', { d: 'M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23', key: '1dtqwm' }],
		['path', { d: 'm8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59', key: '1oq1fw' }],
	],
	j6 = [
		[
			'path',
			{
				d: 'M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z',
				key: '9m4mmf',
			},
		],
		['path', { d: 'm2.5 21.5 1.4-1.4', key: '17g3f0' }],
		['path', { d: 'm20.1 3.9 1.4-1.4', key: '1qn309' }],
		[
			'path',
			{
				d: 'M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z',
				key: '1t2c92',
			},
		],
		['path', { d: 'm9.6 14.4 4.8-4.8', key: '6umqxw' }],
	],
	q6 = [
		['path', { d: 'M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46', key: '1qngmn' }],
		['path', { d: 'M6 8.5c0-.75.13-1.47.36-2.14', key: 'b06bma' }],
		['path', { d: 'M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76', key: 'g10hsz' }],
		['path', { d: 'M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18', key: 'ygzou7' }],
		['line', { x1: '2', x2: '22', y1: '2', y2: '22', key: 'a6p6uj' }],
	],
	V6 = [
		['path', { d: 'M7 3.34V5a3 3 0 0 0 3 3', key: 'w732o8' }],
		['path', { d: 'M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05', key: 'f02343' }],
		['path', { d: 'M21.54 15H17a2 2 0 0 0-2 2v4.54', key: '1djwo0' }],
		['path', { d: 'M12 2a10 10 0 1 0 9.54 13', key: 'zjsr6q' }],
		['path', { d: 'M20 6V4a2 2 0 1 0-4 0v2', key: '1of5e8' }],
		['rect', { width: '8', height: '5', x: '14', y: '6', rx: '1', key: '1fmf51' }],
	],
	z6 = [
		['path', { d: 'M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0', key: '1dfaln' }],
		['path', { d: 'M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4', key: '1qnva7' }],
	],
	B6 = [
		['path', { d: 'M21.54 15H17a2 2 0 0 0-2 2v4.54', key: '1djwo0' }],
		[
			'path',
			{
				d: 'M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17',
				key: '1tzkfa',
			},
		],
		['path', { d: 'M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05', key: '14pb5j' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	U6 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M12 2a7 7 0 1 0 10 10', key: '1yuj32' }],
	],
	G6 = [
		['circle', { cx: '11.5', cy: '12.5', r: '3.5', key: '1cl1mi' }],
		[
			'path',
			{
				d: 'M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z',
				key: '165ef9',
			},
		],
	],
	W6 = [
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19', key: '13g2jy' }],
		['path', { d: 'M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568', key: '1581id' }],
	],
	$6 = [
		['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
		['circle', { cx: '12', cy: '5', r: '1', key: 'gxeob9' }],
		['circle', { cx: '12', cy: '19', r: '1', key: 'lyex9k' }],
	],
	Z6 = [['path', { d: 'M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12', key: '1le142' }]],
	Q6 = [
		['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
		['circle', { cx: '19', cy: '12', r: '1', key: '1wjl8i' }],
		['circle', { cx: '5', cy: '12', r: '1', key: '1pcz8c' }],
	],
	X6 = [
		['path', { d: 'M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0', key: 'yrdkhy' }],
		['path', { d: 'M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0', key: 'gzkvyz' }],
	],
	K6 = [
		['line', { x1: '5', x2: '19', y1: '9', y2: '9', key: '1nwqeh' }],
		['line', { x1: '5', x2: '19', y1: '15', y2: '15', key: 'g8yjpy' }],
		['line', { x1: '19', x2: '5', y1: '5', y2: '19', key: '1x9vlm' }],
	],
	Y6 = [
		['line', { x1: '5', x2: '19', y1: '9', y2: '9', key: '1nwqeh' }],
		['line', { x1: '5', x2: '19', y1: '15', y2: '15', key: 'g8yjpy' }],
	],
	J6 = [
		[
			'path',
			{
				d: 'M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21',
				key: 'g5wo59',
			},
		],
		['path', { d: 'm5.082 11.09 8.828 8.828', key: '1wx5vj' }],
	],
	eM = [
		[
			'path',
			{ d: 'm15 20 3-3h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2l3 3z', key: 'rbahqx' },
		],
		['path', { d: 'M6 8v1', key: '1636ez' }],
		['path', { d: 'M10 8v1', key: '1talb4' }],
		['path', { d: 'M14 8v1', key: '1rsfgr' }],
		['path', { d: 'M18 8v1', key: 'gnkwox' }],
	],
	tM = [
		['path', { d: 'M4 10h12', key: '1y6xl8' }],
		['path', { d: 'M4 14h9', key: '1loblj' }],
		[
			'path',
			{ d: 'M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2', key: '1j6lzo' },
		],
	],
	nM = [
		['path', { d: 'M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5', key: '1wtuz0' }],
		['path', { d: 'M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16', key: 'e09ifn' }],
		['path', { d: 'M2 21h13', key: '1x0fut' }],
		['path', { d: 'M3 7h11', key: '19efrr' }],
		['path', { d: 'm9 11-2 3h3l-2 3', key: 'lmzxi1' }],
	],
	aM = [
		['path', { d: 'm15 15 6 6', key: '1s409w' }],
		['path', { d: 'm15 9 6-6', key: 'ko1vev' }],
		['path', { d: 'M21 16v5h-5', key: '1ck2sf' }],
		['path', { d: 'M21 8V3h-5', key: '1qoq8a' }],
		['path', { d: 'M3 16v5h5', key: '1t08am' }],
		['path', { d: 'm3 21 6-6', key: 'wwnumi' }],
		['path', { d: 'M3 8V3h5', key: '1ln10m' }],
		['path', { d: 'M9 9 3 3', key: 'v551iv' }],
	],
	oM = [
		['path', { d: 'M15 3h6v6', key: '1q9fwt' }],
		['path', { d: 'M10 14 21 3', key: 'gplh6r' }],
		['path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', key: 'a6xqqp' }],
	],
	rM = [
		['path', { d: 'm15 18-.722-3.25', key: '1j64jw' }],
		['path', { d: 'M2 8a10.645 10.645 0 0 0 20 0', key: '1e7gxb' }],
		['path', { d: 'm20 15-1.726-2.05', key: '1cnuld' }],
		['path', { d: 'm4 15 1.726-2.05', key: '1dsqqd' }],
		['path', { d: 'm9 18 .722-3.25', key: 'ypw2yx' }],
	],
	iM = [
		[
			'path',
			{
				d: 'M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49',
				key: 'ct8e1f',
			},
		],
		['path', { d: 'M14.084 14.158a3 3 0 0 1-4.242-4.242', key: '151rxh' }],
		[
			'path',
			{
				d: 'M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143',
				key: '13bj9a',
			},
		],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	sM = [
		[
			'path',
			{
				d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
				key: '1nclc0',
			},
		],
		['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
	],
	cM = [['path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', key: '1jg4f8' }]],
	dM = [
		['path', { d: 'M12 16h.01', key: '1drbdi' }],
		['path', { d: 'M16 16h.01', key: '1f9h7w' }],
		[
			'path',
			{
				d: 'M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z',
				key: '1iv0i2',
			},
		],
		['path', { d: 'M8 16h.01', key: '18s6g9' }],
	],
	lM = [
		[
			'path',
			{
				d: 'M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z',
				key: '484a7f',
			},
		],
		['path', { d: 'M12 12v.01', key: 'u5ubse' }],
	],
	uM = [
		['path', { d: 'M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z', key: 'b19h5q' }],
		['path', { d: 'M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z', key: 'h7h5ge' }],
	],
	hM = [
		[
			'path',
			{
				d: 'M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z',
				key: '18jl4k',
			},
		],
		['path', { d: 'M16 8 2 22', key: 'vp34q' }],
		['path', { d: 'M17.5 15H9', key: '1oz8nu' }],
	],
	pM = [
		['path', { d: 'M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z', key: '1n2rgs' }],
		['path', { d: 'M6 8h4', key: 'utf9t1' }],
		['path', { d: 'M6 18h4', key: '12yh4b' }],
		['path', { d: 'm12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z', key: '3ha7mj' }],
		['path', { d: 'M14 8h4', key: '1r8wg2' }],
		['path', { d: 'M14 18h4', key: '1t3kbu' }],
		['path', { d: 'm20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z', key: 'dfd4e2' }],
	],
	yM = [
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
		['path', { d: 'M12 2v4', key: '3427ic' }],
		['path', { d: 'm6.8 15-3.5 2', key: 'hjy98k' }],
		['path', { d: 'm20.7 7-3.5 2', key: 'f08gto' }],
		['path', { d: 'M6.8 9 3.3 7', key: '1aevh4' }],
		['path', { d: 'm20.7 17-3.5-2', key: '1liqo3' }],
		['path', { d: 'm9 22 3-8 3 8', key: 'wees03' }],
		['path', { d: 'M8 22h8', key: 'rmew8v' }],
		['path', { d: 'M18 18.7a9 9 0 1 0-12 0', key: 'dhzg4g' }],
	],
	fM = [
		['path', { d: 'M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z', key: '1340ok' }],
		['path', { d: 'M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z', key: '1hz3m3' }],
		['path', { d: 'M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z', key: '1oz8n2' }],
		['path', { d: 'M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z', key: '1ff65i' }],
		['path', { d: 'M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z', key: 'pdip6e' }],
	],
	kM = [
		[
			'path',
			{
				d: 'M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5',
				key: '4pqfef',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M8 12v-1', key: '1ej8lb' }],
		['path', { d: 'M8 18v-2', key: 'qcmpov' }],
		['path', { d: 'M8 7V6', key: '1nbb54' }],
		['circle', { cx: '8', cy: '20', r: '2', key: 'ckkr5m' }],
	],
	gM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'm8 18 4-4', key: '12zab0' }],
		['path', { d: 'M8 10v8h8', key: 'tlaukw' }],
	],
	mM = [
		[
			'path',
			{
				d: 'M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3',
				key: 'cvl1xm',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		[
			'path',
			{
				d: 'm7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88',
				key: '1ff7gj',
			},
		],
		['circle', { cx: '6', cy: '14', r: '3', key: 'a1xfv6' }],
	],
	MM = [
		[
			'path',
			{
				d: 'M14.5 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.8',
				key: '1kchwa',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M11.7 14.2 7 17l-4.7-2.8', key: '1yk8tc' }],
		[
			'path',
			{
				d: 'M3 13.1a2 2 0 0 0-.999 1.76v3.24a2 2 0 0 0 .969 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01z',
				key: '19flxy',
			},
		],
		['path', { d: 'M7 17v5', key: '1yj1jh' }],
	],
	vM = [
		[
			'path',
			{
				d: 'M14 22h4a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6',
				key: '14cnrg',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M5 14a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1 1 1 0 0 1 1 1v2a1 1 0 0 0 1 1', key: 'sr0ebq' }],
		['path', { d: 'M9 22a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1', key: 'w793db' }],
	],
	IM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1', key: '1oajmo' }],
		['path', { d: 'M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1', key: 'mpwhp6' }],
	],
	xM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M8 18v-2', key: 'qcmpov' }],
		['path', { d: 'M12 18v-4', key: 'q1q25u' }],
		['path', { d: 'M16 18v-6', key: '15y0np' }],
	],
	wM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M8 18v-1', key: 'zg0ygc' }],
		['path', { d: 'M12 18v-6', key: '17g6i2' }],
		['path', { d: 'M16 18v-3', key: 'j5jt4h' }],
	],
	CM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'm16 13-3.5 3.5-2-2L8 17', key: 'zz7yod' }],
	],
	LM = [
		[
			'path',
			{
				d: 'M15.941 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.512',
				key: '13hoie',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M4.017 11.512a6 6 0 1 0 8.466 8.475', key: 's6vs5t' }],
		[
			'path',
			{
				d: 'M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z',
				key: '1dl6s6',
			},
		],
	],
	bM = [
		[
			'path',
			{
				d: 'M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6',
				key: 'g5mvt7',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'm14 20 2 2 4-4', key: '15kota' }],
	],
	SM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'm9 15 2 2 4-4', key: '1grp1n' }],
	],
	DM = [
		[
			'path',
			{
				d: 'M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85',
				key: 'ryk6xj',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M8 14v2.2l1.6 1', key: '6m4bie' }],
		['circle', { cx: '8', cy: '16', r: '6', key: '10v15b' }],
	],
	AM = [
		[
			'path',
			{
				d: 'M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35',
				key: '1wthlu',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'm5 16-3 3 3 3', key: '331omg' }],
		['path', { d: 'm9 22 3-3-3-3', key: 'lsp7cz' }],
	],
	EM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M10 12.5 8 15l2 2.5', key: '1tg20x' }],
		['path', { d: 'm14 12.5 2 2.5-2 2.5', key: 'yinavb' }],
	],
	TM = [
		[
			'path',
			{
				d: 'M13.85 22H18a2 2 0 0 0 2-2V8a2 2 0 0 0-.586-1.414l-4-4A2 2 0 0 0 14 2H6a2 2 0 0 0-2 2v6.6',
				key: '1l4p50',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'm3.305 19.53.923-.382', key: 'ao1pio' }],
		['path', { d: 'm4.228 16.852-.924-.383', key: '1fv9zy' }],
		['path', { d: 'm5.852 15.228-.383-.923', key: '1a9hc2' }],
		['path', { d: 'm5.852 20.772-.383.924', key: '1sh9ke' }],
		['path', { d: 'm8.148 15.228.383-.923', key: '4yu6lf' }],
		['path', { d: 'm8.53 21.696-.382-.924', key: '18b0s9' }],
		['path', { d: 'm9.773 16.852.922-.383', key: 'ti6xop' }],
		['path', { d: 'm9.773 19.148.922.383', key: 'rws47d' }],
		['circle', { cx: '7', cy: '18', r: '3', key: 'lvkj7j' }],
	],
	PM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M9 10h6', key: '9gxzsh' }],
		['path', { d: 'M12 13V7', key: 'h0r20n' }],
		['path', { d: 'M9 17h6', key: 'r8uit2' }],
	],
	RM = [
		[
			'path',
			{
				d: 'M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2',
				key: 'jrl274',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M10 16h2v6', key: '1bxocy' }],
		['path', { d: 'M10 22h4', key: 'ceow96' }],
		['rect', { x: '2', y: '16', width: '4', height: '6', rx: '2', key: 'r45zd0' }],
	],
	NM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M12 18v-6', key: '17g6i2' }],
		['path', { d: 'm9 15 3 3 3-3', key: '1npd3o' }],
	],
	_M = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M12 9v4', key: 'juzpu7' }],
		['path', { d: 'M12 17h.01', key: 'p32p05' }],
	],
	HM = [
		[
			'path',
			{
				d: 'M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343',
				key: '1vfytu',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		[
			'path',
			{
				d: 'M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0',
				key: '1etmh7',
			},
		],
	],
	OM = [
		[
			'path',
			{
				d: 'M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v7',
				key: 'oagw2b',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		[
			'path',
			{
				d: 'M3.62 18.8A2.25 2.25 0 1 1 7 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a1 1 0 0 1-1.507 0z',
				key: 'rg3psg',
			},
		],
	],
	FM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['circle', { cx: '10', cy: '12', r: '2', key: '737tya' }],
		['path', { d: 'm20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22', key: 'wt3hpn' }],
	],
	jM = [
		[
			'path',
			{
				d: 'M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1',
				key: '1q9hii',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M2 15h10', key: 'jfw4w8' }],
		['path', { d: 'm9 18 3-3-3-3', key: '112psh' }],
	],
	qM = [
		[
			'path',
			{
				d: 'M10.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v10.1',
				key: '1a2hbp',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'm10 15 1 1', key: '1h4vmv' }],
		['path', { d: 'm11 14-4.586 4.586', key: 'maylof' }],
		['circle', { cx: '5', cy: '20', r: '2', key: '860zyv' }],
	],
	VM = [
		[
			'path',
			{
				d: 'M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3',
				key: '1432pc',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M9 17v-2a2 2 0 0 0-4 0v2', key: '168m41' }],
		['rect', { width: '8', height: '5', x: '3', y: '17', rx: '1', key: 'o8vfew' }],
	],
	zM = [
		[
			'path',
			{
				d: 'M20 14V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12',
				key: 'l9p8hp',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M14 18h6', key: '1m8k6r' }],
	],
	BM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M9 15h6', key: 'cctwl0' }],
	],
	UM = [
		[
			'path',
			{
				d: 'M11.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v10.35',
				key: '5ad7z2',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M8 20v-7l3 1.474', key: '1ggyb9' }],
		['circle', { cx: '6', cy: '20', r: '2', key: 'j7wjp0' }],
	],
	GM = [
		[
			'path',
			{
				d: 'M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127',
				key: 'wfxp4w',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'm5 11-3 3', key: '1dgrs4' }],
		['path', { d: 'm5 17-3-3h10', key: '1mvvaf' }],
	],
	WM = [
		[
			'path',
			{
				d: 'm18.226 5.226-2.52-2.52A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.351',
				key: '1k2beg',
			},
		],
		[
			'path',
			{
				d: 'M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
				key: '2t3380',
			},
		],
		['path', { d: 'M8 18h1', key: '13wk12' }],
	],
	$M = [
		[
			'path',
			{
				d: 'M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34',
				key: 'o6klzx',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		[
			'path',
			{
				d: 'M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z',
				key: 'zhnas1',
			},
		],
	],
	ZM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		[
			'path',
			{
				d: 'M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z',
				key: '1tzo1f',
			},
		],
	],
	QM = [
		[
			'path',
			{
				d: 'M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35',
				key: '17jvcc',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M14 19h6', key: 'bvotb8' }],
		['path', { d: 'M17 16v6', key: '18yu1i' }],
	],
	XM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M9 15h6', key: 'cctwl0' }],
		['path', { d: 'M12 18v-6', key: '17g6i2' }],
	],
	KM = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M12 17h.01', key: 'p32p05' }],
		['path', { d: 'M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3', key: 'mhlwft' }],
	],
	YM = [
		[
			'path',
			{
				d: 'M20 10V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.35',
				key: '1cdjst',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M16 14a2 2 0 0 0-2 2', key: 'ceaadl' }],
		['path', { d: 'M16 22a2 2 0 0 1-2-2', key: '1wqh5n' }],
		['path', { d: 'M20 14a2 2 0 0 1 2 2', key: '1ny6zw' }],
		['path', { d: 'M20 22a2 2 0 0 0 2-2', key: '1l9q4k' }],
	],
	JM = [
		[
			'path',
			{
				d: 'M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25',
				key: 'uh4ikj',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'm21 22-2.88-2.88', key: '9dd25w' }],
		['circle', { cx: '16', cy: '17', r: '3', key: '11br10' }],
	],
	ev = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['circle', { cx: '11.5', cy: '14.5', r: '2.5', key: '1bq0ko' }],
		['path', { d: 'M13.3 16.3 15 18', key: '2quom7' }],
	],
	tv = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M8 15h.01', key: 'a7atzg' }],
		['path', { d: 'M11.5 13.5a2.5 2.5 0 0 1 0 3', key: '1fccat' }],
		['path', { d: 'M15 12a5 5 0 0 1 0 6', key: 'ps46cm' }],
	],
	nv = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
		['path', { d: 'M10 11v2', key: '1s651w' }],
		['path', { d: 'M8 17h8', key: 'wh5c61' }],
		['path', { d: 'M14 16v2', key: '12fp5e' }],
	],
	av = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M8 13h2', key: 'yr2amv' }],
		['path', { d: 'M14 13h2', key: 'un5t4a' }],
		['path', { d: 'M8 17h2', key: '2yhykz' }],
		['path', { d: 'M14 17h2', key: '10kma7' }],
	],
	ov = [
		['path', { d: 'M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1', key: 'likhh7' }],
		['path', { d: 'M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1', key: '17ky3x' }],
		[
			'path',
			{
				d: 'M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z',
				key: '1hyeo0',
			},
		],
	],
	rv = [
		[
			'path',
			{
				d: 'M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7',
				key: 'huwfnr',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'm10 18 3-3-3-3', key: '18f6ys' }],
	],
	iv = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'm8 16 2-2-2-2', key: '10vzyd' }],
		['path', { d: 'M12 18h4', key: '1wd2n7' }],
	],
	sv = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M10 9H8', key: 'b1mrlr' }],
		['path', { d: 'M16 13H8', key: 't4e002' }],
		['path', { d: 'M16 17H8', key: 'z1uh3a' }],
	],
	cv = [
		[
			'path',
			{
				d: 'M12 22h6a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6',
				key: '15usau',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M3 16v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16', key: 's1gz5' }],
		['path', { d: 'M6 22h2', key: '194x9m' }],
		['path', { d: 'M7 14v8', key: '11ixej' }],
	],
	dv = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M11 18h2', key: '12mj7e' }],
		['path', { d: 'M12 12v6', key: '3ahymv' }],
		['path', { d: 'M9 13v-.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v.5', key: 'qbrxap' }],
	],
	lv = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M12 12v6', key: '3ahymv' }],
		['path', { d: 'm15 15-3-3-3 3', key: '15xj92' }],
	],
	uv = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M16 22a4 4 0 0 0-8 0', key: '7a83pg' }],
		['circle', { cx: '12', cy: '15', r: '3', key: 'g36mzq' }],
	],
	hv = [
		[
			'path',
			{
				d: 'M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2',
				key: 'jrl274',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		[
			'path',
			{ d: 'm10 17.843 3.033-1.755a.64.64 0 0 1 .967.56v4.704a.65.65 0 0 1-.967.56L10 20.157', key: '17aeo9' },
		],
		['rect', { width: '7', height: '6', x: '3', y: '16', rx: '1', key: 's27ndx' }],
	],
	pv = [
		[
			'path',
			{
				d: 'M4 11.55V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-1.95',
				key: '44gpjv',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M12 15a5 5 0 0 1 0 6', key: 'oxg87a' }],
		[
			'path',
			{
				d: 'M8 14.502a.5.5 0 0 0-.826-.381l-1.893 1.631a1 1 0 0 1-.651.243H3.5a.5.5 0 0 0-.5.501v3.006a.5.5 0 0 0 .5.501h1.129a1 1 0 0 1 .652.243l1.893 1.633a.5.5 0 0 0 .826-.38z',
				key: '8rtoi1',
			},
		],
	],
	yv = [
		[
			'path',
			{
				d: 'M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5',
				key: '1jo35a',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'm15 17 5 5', key: '36xl1x' }],
		['path', { d: 'm20 17-5 5', key: 'vdz27y' }],
	],
	fv = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'm14.5 12.5-5 5', key: 'b62r18' }],
		['path', { d: 'm9.5 12.5 5 5', key: '1rk7el' }],
	],
	kv = [
		[
			'path',
			{
				d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
				key: '1oefj6',
			},
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
	],
	gv = [
		['path', { d: 'M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8', key: '14sh0y' }],
		['path', { d: 'M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z', key: '1970lx' }],
		['path', { d: 'M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1', key: 'l4dndm' }],
	],
	mv = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M7 3v18', key: 'bbkbws' }],
		['path', { d: 'M3 7.5h4', key: 'zfgn84' }],
		['path', { d: 'M3 12h18', key: '1i2n21' }],
		['path', { d: 'M3 16.5h4', key: '1230mu' }],
		['path', { d: 'M17 3v18', key: 'in4fa5' }],
		['path', { d: 'M17 7.5h4', key: 'myr1c1' }],
		['path', { d: 'M17 16.5h4', key: 'go4c1d' }],
	],
	Mv = [
		['path', { d: 'M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4', key: '1nerag' }],
		['path', { d: 'M14 13.12c0 2.38 0 6.38-1 8.88', key: 'o46ks0' }],
		['path', { d: 'M17.29 21.02c.12-.6.43-2.3.5-3.02', key: 'ptglia' }],
		['path', { d: 'M2 12a10 10 0 0 1 18-6', key: 'ydlgp0' }],
		['path', { d: 'M2 16h.01', key: '1gqxmh' }],
		['path', { d: 'M21.8 16c.2-2 .131-5.354 0-6', key: 'drycrb' }],
		['path', { d: 'M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2', key: '1tidbn' }],
		['path', { d: 'M8.65 22c.21-.66.45-1.32.57-2', key: '13wd9y' }],
		['path', { d: 'M9 6.8a6 6 0 0 1 9 5.2v2', key: '1fr1j5' }],
	],
	vv = [
		['path', { d: 'M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5', key: 'sqyvz' }],
		['path', { d: 'M9 18h8', key: 'i7pszb' }],
		['path', { d: 'M18 3h-3', key: '7idoqj' }],
		['path', { d: 'M11 3a6 6 0 0 0-6 6v11', key: '1v5je3' }],
		['path', { d: 'M5 13h4', key: 'svpcxo' }],
		['path', { d: 'M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z', key: 'vsjego' }],
	],
	Iv = [
		[
			'path',
			{
				d: 'M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058',
				key: '1j1hse',
			},
		],
		[
			'path',
			{
				d: 'M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618',
				key: '1q46z8',
			},
		],
		[
			'path',
			{
				d: 'm16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20',
				key: '1407gh',
			},
		],
	],
	xv = [['path', { d: 'M2 16s9-15 20-4C11 23 2 8 2 8', key: 'h4oh4o' }]],
	wv = [
		[
			'path',
			{
				d: 'M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z',
				key: '15baut',
			},
		],
		['path', { d: 'M18 12v.5', key: '18hhni' }],
		['path', { d: 'M16 17.93a9.77 9.77 0 0 1 0-11.86', key: '16dt7o' }],
		[
			'path',
			{
				d: 'M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33',
				key: 'l9di03',
			},
		],
		['path', { d: 'M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4', key: '1kjonw' }],
		['path', { d: 'm16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98', key: '1zlm23' }],
	],
	Cv = [
		['path', { d: 'm17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10', key: '157y8s' }],
		['path', { d: 'M20.414 8.586 22 7', key: '5g2s34' }],
		['circle', { cx: '19', cy: '10', r: '2', key: '7363ft' }],
	],
	Lv = [
		['path', { d: 'M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528', key: '1q158e' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M4 22V4', key: '1plyxx' }],
		['path', { d: 'M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347', key: 'xj1b71' }],
	],
	bv = [['path', { d: 'M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5', key: 'rbbtmw' }]],
	Sv = [['path', { d: 'M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5', key: 'kfjsu0' }]],
	Dv = [
		[
			'path',
			{
				d: 'M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528',
				key: '1jaruq',
			},
		],
	],
	Av = [
		[
			'path',
			{
				d: 'M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z',
				key: '1ir223',
			},
		],
		['path', { d: 'm5 22 14-4', key: '1brv4h' }],
		['path', { d: 'm5 18 14 4', key: 'lgyyje' }],
	],
	Ev = [
		[
			'path',
			{
				d: 'M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4',
				key: '1slcih',
			},
		],
	],
	Tv = [
		['path', { d: 'M11.652 6H18', key: 'voqkpr' }],
		['path', { d: 'M12 13v1', key: '176q98' }],
		[
			'path',
			{ d: 'M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V6', key: 'dzyf92' },
		],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M7.649 2H17a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8a4 4 0 0 0-.55 1.007', key: '1hvcfn' }],
	],
	Pv = [
		['path', { d: 'M12 13v1', key: '176q98' }],
		[
			'path',
			{
				d: 'M17 2a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8A4 4 0 0 0 16 12v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V3a1 1 0 0 1 1-1z',
				key: '17vh7j',
			},
		],
		['path', { d: 'M6 6h12', key: 'n6hhss' }],
	],
	Rv = [
		['path', { d: 'M10 2v2.343', key: '15t272' }],
		['path', { d: 'M14 2v6.343', key: 'sxr80q' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-1.755-2.96l5.227-9.563', key: 'k0duyd' }],
		['path', { d: 'M6.453 15H15', key: '1f0z33' }],
		['path', { d: 'M8.5 2h7', key: 'csnxdl' }],
	],
	Nv = [
		['path', { d: 'M10 2v6.292a7 7 0 1 0 4 0V2', key: '1s42pc' }],
		['path', { d: 'M5 15h14', key: 'm0yey3' }],
		['path', { d: 'M8.5 2h7', key: 'csnxdl' }],
	],
	_v = [
		[
			'path',
			{
				d: 'M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2',
				key: '18mbvz',
			},
		],
		['path', { d: 'M6.453 15h11.094', key: '3shlmq' }],
		['path', { d: 'M8.5 2h7', key: 'csnxdl' }],
	],
	Hv = [
		['path', { d: 'm3 7 5 5-5 5V7', key: 'couhi7' }],
		['path', { d: 'm21 7-5 5 5 5V7', key: '6ouia7' }],
		['path', { d: 'M12 20v2', key: '1lh1kg' }],
		['path', { d: 'M12 14v2', key: '8jcxud' }],
		['path', { d: 'M12 8v2', key: '1woqiv' }],
		['path', { d: 'M12 2v2', key: 'tus03m' }],
	],
	Ov = [
		['path', { d: 'M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3', key: '1i73f7' }],
		['path', { d: 'M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3', key: 'saxlbk' }],
		['path', { d: 'M12 20v2', key: '1lh1kg' }],
		['path', { d: 'M12 14v2', key: '8jcxud' }],
		['path', { d: 'M12 8v2', key: '1woqiv' }],
		['path', { d: 'M12 2v2', key: 'tus03m' }],
	],
	Fv = [
		['path', { d: 'm17 3-5 5-5-5h10', key: '1ftt6x' }],
		['path', { d: 'm17 21-5-5-5 5h10', key: '1m0wmu' }],
		['path', { d: 'M4 12H2', key: 'rhcxmi' }],
		['path', { d: 'M10 12H8', key: 's88cx1' }],
		['path', { d: 'M16 12h-2', key: '10asgb' }],
		['path', { d: 'M22 12h-2', key: '14jgyd' }],
	],
	jv = [
		['path', { d: 'M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3', key: '14bfxa' }],
		['path', { d: 'M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3', key: '14rx03' }],
		['path', { d: 'M4 12H2', key: 'rhcxmi' }],
		['path', { d: 'M10 12H8', key: 's88cx1' }],
		['path', { d: 'M16 12h-2', key: '10asgb' }],
		['path', { d: 'M22 12h-2', key: '14jgyd' }],
	],
	qv = [
		[
			'path',
			{
				d: 'M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1',
				key: '3pnvol',
			},
		],
		['circle', { cx: '12', cy: '8', r: '2', key: '1822b1' }],
		['path', { d: 'M12 10v12', key: '6ubwww' }],
		['path', { d: 'M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z', key: '9hd38g' }],
		['path', { d: 'M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z', key: 'ufn41s' }],
	],
	Vv = [
		['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
		[
			'path',
			{
				d: 'M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5',
				key: '14wa3c',
			},
		],
		['path', { d: 'M12 7.5V9', key: '1oy5b0' }],
		['path', { d: 'M7.5 12H9', key: 'eltsq1' }],
		['path', { d: 'M16.5 12H15', key: 'vk5kw4' }],
		['path', { d: 'M12 16.5V15', key: 'k7eayi' }],
		['path', { d: 'm8 8 1.88 1.88', key: 'nxy4qf' }],
		['path', { d: 'M14.12 9.88 16 8', key: '1lst6k' }],
		['path', { d: 'm8 16 1.88-1.88', key: 'h2eex1' }],
		['path', { d: 'M14.12 14.12 16 16', key: 'uqkrx3' }],
	],
	zv = [
		['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
		['path', { d: 'M3 7V5a2 2 0 0 1 2-2h2', key: 'aa7l1z' }],
		['path', { d: 'M17 3h2a2 2 0 0 1 2 2v2', key: '4qcy5o' }],
		['path', { d: 'M21 17v2a2 2 0 0 1-2 2h-2', key: '6vwrx8' }],
		['path', { d: 'M7 21H5a2 2 0 0 1-2-2v-2', key: 'ioqczr' }],
	],
	Bv = [
		['path', { d: 'M2 12h6', key: '1wqiqv' }],
		['path', { d: 'M22 12h-6', key: '1eg9hc' }],
		['path', { d: 'M12 2v2', key: 'tus03m' }],
		['path', { d: 'M12 8v2', key: '1woqiv' }],
		['path', { d: 'M12 14v2', key: '8jcxud' }],
		['path', { d: 'M12 20v2', key: '1lh1kg' }],
		['path', { d: 'm19 9-3 3 3 3', key: '12ol22' }],
		['path', { d: 'm5 15 3-3-3-3', key: '1kdhjc' }],
	],
	Uv = [
		['path', { d: 'M12 22v-6', key: '6o8u61' }],
		['path', { d: 'M12 8V2', key: '1wkif3' }],
		['path', { d: 'M4 12H2', key: 'rhcxmi' }],
		['path', { d: 'M10 12H8', key: 's88cx1' }],
		['path', { d: 'M16 12h-2', key: '10asgb' }],
		['path', { d: 'M22 12h-2', key: '14jgyd' }],
		['path', { d: 'm15 19-3-3-3 3', key: 'e37ymu' }],
		['path', { d: 'm15 5-3 3-3-3', key: '19d6lf' }],
	],
	Gv = [
		['circle', { cx: '15', cy: '19', r: '2', key: 'u2pros' }],
		[
			'path',
			{
				d: 'M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1',
				key: '1jj40k',
			},
		],
		['path', { d: 'M15 11v-1', key: 'cntcp' }],
		['path', { d: 'M15 17v-2', key: '1279jj' }],
	],
	Wv = [
		[
			'path',
			{
				d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
				key: '1kt360',
			},
		],
		['path', { d: 'm9 13 2 2 4-4', key: '6343dt' }],
	],
	$v = [
		['path', { d: 'M16 14v2.2l1.6 1', key: 'fo4ql5' }],
		[
			'path',
			{
				d: 'M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2',
				key: '1urifu',
			},
		],
		['circle', { cx: '16', cy: '16', r: '6', key: 'qoo3c4' }],
	],
	Zv = [
		[
			'path',
			{
				d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
				key: '1kt360',
			},
		],
		['path', { d: 'M2 10h20', key: '1ir3d8' }],
	],
	Qv = [
		['path', { d: 'M10 10.5 8 13l2 2.5', key: 'm4t9c1' }],
		['path', { d: 'm14 10.5 2 2.5-2 2.5', key: '14w2eb' }],
		[
			'path',
			{
				d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z',
				key: '1u1bxd',
			},
		],
	],
	Xv = [
		[
			'path',
			{
				d: 'M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3',
				key: '128dxu',
			},
		],
		['path', { d: 'm14.305 19.53.923-.382', key: '3m78fa' }],
		['path', { d: 'm15.228 16.852-.923-.383', key: 'npixar' }],
		['path', { d: 'm16.852 15.228-.383-.923', key: '5xggr7' }],
		['path', { d: 'm16.852 20.772-.383.924', key: 'dpfhf9' }],
		['path', { d: 'm19.148 15.228.383-.923', key: '1reyyz' }],
		['path', { d: 'm19.53 21.696-.382-.924', key: '1goivc' }],
		['path', { d: 'm20.772 16.852.924-.383', key: 'htqkph' }],
		['path', { d: 'm20.772 19.148.924.383', key: '9w9pjp' }],
		['circle', { cx: '18', cy: '18', r: '3', key: '1xkwt0' }],
	],
	Kv = [
		[
			'path',
			{
				d: 'M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z',
				key: '1fr9dc',
			},
		],
		['circle', { cx: '12', cy: '13', r: '1', key: '49l61u' }],
	],
	Yv = [
		[
			'path',
			{
				d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
				key: '1kt360',
			},
		],
		['path', { d: 'M12 10v6', key: '1bos4e' }],
		['path', { d: 'm15 13-3 3-3-3', key: '6j2sf0' }],
	],
	Jv = [
		['path', { d: 'M18 19a5 5 0 0 1-5-5v8', key: 'sz5oeg' }],
		[
			'path',
			{
				d: 'M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5',
				key: '1w6njk',
			},
		],
		['circle', { cx: '13', cy: '12', r: '2', key: '1j92g6' }],
		['circle', { cx: '20', cy: '19', r: '2', key: '1obnsp' }],
	],
	e7 = [
		['circle', { cx: '12', cy: '13', r: '2', key: '1c1ljs' }],
		[
			'path',
			{
				d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
				key: '1kt360',
			},
		],
		['path', { d: 'M14 13h3', key: '1dgedf' }],
		['path', { d: 'M7 13h3', key: '1pygq7' }],
	],
	t7 = [
		[
			'path',
			{
				d: 'M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417',
				key: '10r6g4',
			},
		],
		[
			'path',
			{
				d: 'M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z',
				key: '15cy7q',
			},
		],
	],
	n7 = [
		[
			'path',
			{
				d: 'M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1',
				key: 'fm4g5t',
			},
		],
		['path', { d: 'M2 13h10', key: 'pgb2dq' }],
		['path', { d: 'm9 16 3-3-3-3', key: '6m91ic' }],
	],
	a7 = [
		[
			'path',
			{
				d: 'M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z',
				key: '1fr9dc',
			},
		],
		['path', { d: 'M8 10v4', key: 'tgpxqk' }],
		['path', { d: 'M12 10v2', key: 'hh53o1' }],
		['path', { d: 'M16 10v6', key: '1d6xys' }],
	],
	o7 = [
		['circle', { cx: '16', cy: '20', r: '2', key: '1vifvg' }],
		[
			'path',
			{
				d: 'M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2',
				key: '3hgo9p',
			},
		],
		['path', { d: 'm22 14-4.5 4.5', key: '1ef6z8' }],
		['path', { d: 'm21 15 1 1', key: '1ejcpy' }],
	],
	r7 = [
		['rect', { width: '8', height: '5', x: '14', y: '17', rx: '1', key: '19aais' }],
		[
			'path',
			{
				d: 'M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5',
				key: '1w6v7t',
			},
		],
		['path', { d: 'M20 17v-2a2 2 0 1 0-4 0v2', key: 'pwaxnr' }],
	],
	i7 = [
		['path', { d: 'M9 13h6', key: '1uhe8q' }],
		[
			'path',
			{
				d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
				key: '1kt360',
			},
		],
	],
	s7 = [
		[
			'path',
			{
				d: 'm6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2',
				key: '1nmvlm',
			},
		],
		['circle', { cx: '14', cy: '15', r: '1', key: '1gm4qj' }],
	],
	c7 = [
		[
			'path',
			{
				d: 'm6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2',
				key: 'usdka0',
			},
		],
	],
	d7 = [
		[
			'path',
			{
				d: 'M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5',
				key: '1yk7aj',
			},
		],
		['path', { d: 'M2 13h10', key: 'pgb2dq' }],
		['path', { d: 'm5 10-3 3 3 3', key: '1r8ie0' }],
	],
	l7 = [
		[
			'path',
			{
				d: 'M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5',
				key: 'a8xqs0',
			},
		],
		[
			'path',
			{
				d: 'M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
				key: '1saktj',
			},
		],
	],
	u7 = [
		['path', { d: 'M12 10v6', key: '1bos4e' }],
		['path', { d: 'M9 13h6', key: '1uhe8q' }],
		[
			'path',
			{
				d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
				key: '1kt360',
			},
		],
	],
	h7 = [
		[
			'path',
			{
				d: 'M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z',
				key: '1fr9dc',
			},
		],
		['circle', { cx: '12', cy: '13', r: '2', key: '1c1ljs' }],
		['path', { d: 'M12 15v5', key: '11xva1' }],
	],
	p7 = [
		['circle', { cx: '11.5', cy: '12.5', r: '2.5', key: '1ea5ju' }],
		[
			'path',
			{
				d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
				key: '1kt360',
			},
		],
		['path', { d: 'M13.3 14.3 15 16', key: '1y4v1n' }],
	],
	y7 = [
		[
			'path',
			{
				d: 'M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1',
				key: '1bw5m7',
			},
		],
		['path', { d: 'm21 21-1.9-1.9', key: '1g2n9r' }],
		['circle', { cx: '17', cy: '17', r: '3', key: '18b49y' }],
	],
	f7 = [
		[
			'path',
			{
				d: 'M2 9.35V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7',
				key: 'y8kt7d',
			},
		],
		['path', { d: 'm8 16 3-3-3-3', key: 'rlqrt1' }],
	],
	k7 = [
		[
			'path',
			{
				d: 'M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5',
				key: '1dkoa9',
			},
		],
		['path', { d: 'M12 10v4h4', key: '1czhmt' }],
		['path', { d: 'm12 14 1.535-1.605a5 5 0 0 1 8 1.5', key: 'lvuxfi' }],
		['path', { d: 'M22 22v-4h-4', key: '1ewp4q' }],
		['path', { d: 'm22 18-1.535 1.605a5 5 0 0 1-8-1.5', key: '14ync0' }],
	],
	g7 = [
		[
			'path',
			{
				d: 'M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z',
				key: 'hod4my',
			},
		],
		[
			'path',
			{
				d: 'M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z',
				key: 'w4yl2u',
			},
		],
		['path', { d: 'M3 5a2 2 0 0 0 2 2h3', key: 'f2jnh7' }],
		['path', { d: 'M3 3v13a2 2 0 0 0 2 2h3', key: 'k8epm1' }],
	],
	m7 = [
		[
			'path',
			{
				d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
				key: '1kt360',
			},
		],
		['path', { d: 'M12 10v6', key: '1bos4e' }],
		['path', { d: 'm9 13 3-3 3 3', key: '1pxg3c' }],
	],
	M7 = [
		[
			'path',
			{
				d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
				key: '1kt360',
			},
		],
		['path', { d: 'm9.5 10.5 5 5', key: 'ra9qjz' }],
		['path', { d: 'm14.5 10.5-5 5', key: 'l2rkpq' }],
	],
	v7 = [
		[
			'path',
			{
				d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
				key: '1kt360',
			},
		],
	],
	I7 = [
		[
			'path',
			{
				d: 'M20 5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.5a1.5 1.5 0 0 1 1.2.6l.6.8a1.5 1.5 0 0 0 1.2.6z',
				key: 'a4852j',
			},
		],
		['path', { d: 'M3 8.268a2 2 0 0 0-1 1.738V19a2 2 0 0 0 2 2h11a2 2 0 0 0 1.732-1', key: 'yxbcw3' }],
	],
	x7 = [
		[
			'path',
			{
				d: 'M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z',
				key: '1dudjm',
			},
		],
		[
			'path',
			{
				d: 'M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z',
				key: 'l2t8xc',
			},
		],
		['path', { d: 'M16 17h4', key: '1dejxt' }],
		['path', { d: 'M4 13h4', key: '1bwh8b' }],
	],
	w7 = [
		['path', { d: 'M12 12H5a2 2 0 0 0-2 2v5', key: '7zsz91' }],
		['circle', { cx: '13', cy: '19', r: '2', key: 'wjnkru' }],
		['circle', { cx: '5', cy: '19', r: '2', key: 'v8kfzx' }],
		['path', { d: 'M8 19h3m5-17v17h6M6 12V7c0-1.1.9-2 2-2h3l5 5', key: '13bk1p' }],
	],
	C7 = [
		['path', { d: 'M4 14h6', key: '77gv2w' }],
		['path', { d: 'M4 2h10', key: 'a2b314' }],
		['rect', { x: '4', y: '18', width: '16', height: '4', rx: '1', key: 'sybzq6' }],
		['rect', { x: '4', y: '6', width: '16', height: '4', rx: '1', key: '1osc9e' }],
	],
	L7 = [
		['path', { d: 'm15 17 5-5-5-5', key: 'nf172w' }],
		['path', { d: 'M4 18v-2a4 4 0 0 1 4-4h12', key: 'jmiej9' }],
	],
	b7 = [
		['line', { x1: '22', x2: '2', y1: '6', y2: '6', key: '15w7dq' }],
		['line', { x1: '22', x2: '2', y1: '18', y2: '18', key: '1ip48p' }],
		['line', { x1: '6', x2: '6', y1: '2', y2: '22', key: 'a2lnyx' }],
		['line', { x1: '18', x2: '18', y1: '2', y2: '22', key: '8vb6jd' }],
	],
	S7 = [['path', { d: 'M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7', key: '1a2nng' }]],
	D7 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M16 16s-1.5-2-4-2-4 2-4 2', key: 'epbg0q' }],
		['line', { x1: '9', x2: '9.01', y1: '9', y2: '9', key: 'yxxnd0' }],
		['line', { x1: '15', x2: '15.01', y1: '9', y2: '9', key: '1p4y9e' }],
	],
	A7 = [
		['path', { d: 'M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5', key: '1wtuz0' }],
		['path', { d: 'M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16', key: 'e09ifn' }],
		['path', { d: 'M2 21h13', key: '1x0fut' }],
		['path', { d: 'M3 9h11', key: '1p7c0w' }],
	],
	E7 = [
		['path', { d: 'M3 7V5a2 2 0 0 1 2-2h2', key: 'aa7l1z' }],
		['path', { d: 'M17 3h2a2 2 0 0 1 2 2v2', key: '4qcy5o' }],
		['path', { d: 'M21 17v2a2 2 0 0 1-2 2h-2', key: '6vwrx8' }],
		['path', { d: 'M7 21H5a2 2 0 0 1-2-2v-2', key: 'ioqczr' }],
		['rect', { width: '10', height: '8', x: '7', y: '8', rx: '1', key: 'vys8me' }],
	],
	T7 = [
		[
			'path',
			{
				d: 'M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348',
				key: '8mvsmf',
			},
		],
		['path', { d: 'M16 6h6', key: '1dogtp' }],
		['path', { d: 'M19 3v6', key: '1ytpjt' }],
	],
	P7 = [
		[
			'path',
			{
				d: 'M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473',
				key: 'ol2ft2',
			},
		],
		['path', { d: 'm16.5 3.5 5 5', key: '15e6fa' }],
		['path', { d: 'm21.5 3.5-5 5', key: 'm0lwru' }],
	],
	R7 = [
		[
			'path',
			{
				d: 'M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z',
				key: 'sc7q7i',
			},
		],
	],
	N7 = [
		['path', { d: 'M2 7v10', key: 'a2pl2d' }],
		['path', { d: 'M6 5v14', key: '1kq3d7' }],
		['rect', { width: '12', height: '18', x: '10', y: '3', rx: '2', key: '13i7bc' }],
	],
	_7 = [
		['path', { d: 'M2 3v18', key: 'pzttux' }],
		['rect', { width: '12', height: '18', x: '6', y: '3', rx: '2', key: 'btr8bg' }],
		['path', { d: 'M22 3v18', key: '6jf3v' }],
	],
	H7 = [
		['rect', { width: '18', height: '14', x: '3', y: '3', rx: '2', key: '74y24f' }],
		['path', { d: 'M4 21h1', key: '16zlid' }],
		['path', { d: 'M9 21h1', key: '15o7lz' }],
		['path', { d: 'M14 21h1', key: 'v9vybs' }],
		['path', { d: 'M19 21h1', key: 'edywat' }],
	],
	O7 = [
		['path', { d: 'M7 2h10', key: 'nczekb' }],
		['path', { d: 'M5 6h14', key: 'u2x4p' }],
		['rect', { width: '18', height: '12', x: '3', y: '10', rx: '2', key: 'l0tzu3' }],
	],
	F7 = [
		['path', { d: 'M3 2h18', key: '15qxfx' }],
		['rect', { width: '18', height: '12', x: '3', y: '6', rx: '2', key: '1439r6' }],
		['path', { d: 'M3 22h18', key: '8prr45' }],
	],
	j7 = [
		['line', { x1: '6', x2: '10', y1: '11', y2: '11', key: '1gktln' }],
		['line', { x1: '8', x2: '8', y1: '9', y2: '13', key: 'qnk9ow' }],
		['line', { x1: '15', x2: '15.01', y1: '12', y2: '12', key: 'krot7o' }],
		['line', { x1: '18', x2: '18.01', y1: '10', y2: '10', key: '1lcuu1' }],
		[
			'path',
			{
				d: 'M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z',
				key: 'mfqc10',
			},
		],
	],
	q7 = [
		[
			'path',
			{
				d: 'M11.146 15.854a1.207 1.207 0 0 1 1.708 0l1.56 1.56A2 2 0 0 1 15 18.828V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.172a2 2 0 0 1 .586-1.414z',
				key: '1re2og',
			},
		],
		[
			'path',
			{
				d: 'M18.828 15a2 2 0 0 1-1.414-.586l-1.56-1.56a1.207 1.207 0 0 1 0-1.708l1.56-1.56A2 2 0 0 1 18.828 9H21a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z',
				key: '1pchrj',
			},
		],
		[
			'path',
			{
				d: 'M6.586 14.414A2 2 0 0 1 5.172 15H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2.172a2 2 0 0 1 1.414.586l1.56 1.56a1.207 1.207 0 0 1 0 1.708z',
				key: '16mt4c',
			},
		],
		[
			'path',
			{
				d: 'M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.172a2 2 0 0 1-.586 1.414l-1.56 1.56a1.207 1.207 0 0 1-1.708 0l-1.56-1.56A2 2 0 0 1 9 5.172z',
				key: '19ox6c',
			},
		],
	],
	V7 = [
		['line', { x1: '6', x2: '10', y1: '12', y2: '12', key: '161bw2' }],
		['line', { x1: '8', x2: '8', y1: '10', y2: '14', key: '1i6ji0' }],
		['line', { x1: '15', x2: '15.01', y1: '13', y2: '13', key: 'dqpgro' }],
		['line', { x1: '18', x2: '18.01', y1: '11', y2: '11', key: 'meh2c' }],
		['rect', { width: '20', height: '12', x: '2', y: '6', rx: '2', key: '9lu3g6' }],
	],
	z7 = [
		['path', { d: 'm12 14 4-4', key: '9kzdfg' }],
		['path', { d: 'M3.34 19a10 10 0 1 1 17.32 0', key: '19p75a' }],
	],
	B7 = [
		['path', { d: 'm14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381', key: 'pgg06f' }],
		['path', { d: 'm16 16 6-6', key: 'vzrcl6' }],
		['path', { d: 'm21.5 10.5-8-8', key: 'a17d9x' }],
		['path', { d: 'm8 8 6-6', key: '18bi4p' }],
		['path', { d: 'm8.5 7.5 8 8', key: '1oyaui' }],
	],
	U7 = [
		['path', { d: 'M10.5 3 8 9l4 13 4-13-2.5-6', key: 'b3dvk1' }],
		[
			'path',
			{
				d: 'M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z',
				key: '7w4byz',
			},
		],
		['path', { d: 'M2 9h20', key: '16fsjt' }],
	],
	G7 = [
		['path', { d: 'M11.5 21a7.5 7.5 0 1 1 7.35-9', key: '1gyj8k' }],
		['path', { d: 'M13 12V3', key: '18om2a' }],
		['path', { d: 'M4 21h16', key: '1h09gz' }],
		['path', { d: 'M9 12V3', key: 'geutu0' }],
	],
	W7 = [
		['path', { d: 'M9 10h.01', key: 'qbtxuw' }],
		['path', { d: 'M15 10h.01', key: '1qmjsl' }],
		['path', { d: 'M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z', key: 'uwwb07' }],
	],
	$7 = [
		['rect', { x: '3', y: '8', width: '18', height: '4', rx: '1', key: 'bkv52' }],
		['path', { d: 'M12 8v13', key: '1c76mn' }],
		['path', { d: 'M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7', key: '6wjy6b' }],
		['path', { d: 'M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5', key: '1ihvrl' }],
	],
	Z7 = [
		['path', { d: 'M15 6a9 9 0 0 0-9 9V3', key: '1cii5b' }],
		['path', { d: 'M21 18h-6', key: '139f0c' }],
		['circle', { cx: '18', cy: '6', r: '3', key: '1h7g24' }],
		['circle', { cx: '6', cy: '18', r: '3', key: 'fqmcym' }],
	],
	Q7 = [
		['path', { d: 'M6 3v12', key: 'qpgusn' }],
		['path', { d: 'M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', key: '1d02ji' }],
		['path', { d: 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', key: 'chk6ph' }],
		['path', { d: 'M15 6a9 9 0 0 0-9 9', key: 'or332x' }],
		['path', { d: 'M18 15v6', key: '9wciyi' }],
		['path', { d: 'M21 18h-6', key: '139f0c' }],
	],
	X7 = [
		['line', { x1: '6', x2: '6', y1: '3', y2: '15', key: '17qcm7' }],
		['circle', { cx: '18', cy: '6', r: '3', key: '1h7g24' }],
		['circle', { cx: '6', cy: '18', r: '3', key: 'fqmcym' }],
		['path', { d: 'M18 9a9 9 0 0 1-9 9', key: 'n2h4wq' }],
	],
	K7 = [
		['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
		['line', { x1: '3', x2: '9', y1: '12', y2: '12', key: '1dyftd' }],
		['line', { x1: '15', x2: '21', y1: '12', y2: '12', key: 'oup4p8' }],
	],
	Y7 = [
		['path', { d: 'M12 3v6', key: '1holv5' }],
		['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
		['path', { d: 'M12 15v6', key: 'a9ows0' }],
	],
	J7 = [
		['circle', { cx: '5', cy: '6', r: '3', key: '1qnov2' }],
		['path', { d: 'M12 6h5a2 2 0 0 1 2 2v7', key: '1yj91y' }],
		['path', { d: 'm15 9-3-3 3-3', key: '1lwv8l' }],
		['circle', { cx: '19', cy: '18', r: '3', key: '1qljk2' }],
		['path', { d: 'M12 18H7a2 2 0 0 1-2-2V9', key: '16sdep' }],
		['path', { d: 'm9 15 3 3-3 3', key: '1m3kbl' }],
	],
	e9 = [
		['circle', { cx: '18', cy: '18', r: '3', key: '1xkwt0' }],
		['circle', { cx: '6', cy: '6', r: '3', key: '1lh9wr' }],
		['path', { d: 'M13 6h3a2 2 0 0 1 2 2v7', key: '1yeb86' }],
		['path', { d: 'M11 18H8a2 2 0 0 1-2-2V9', key: '19pyzm' }],
	],
	t9 = [
		['circle', { cx: '12', cy: '18', r: '3', key: '1mpf1b' }],
		['circle', { cx: '6', cy: '6', r: '3', key: '1lh9wr' }],
		['circle', { cx: '18', cy: '6', r: '3', key: '1h7g24' }],
		['path', { d: 'M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9', key: '1uq4wg' }],
		['path', { d: 'M12 12v3', key: '158kv8' }],
	],
	n9 = [
		['circle', { cx: '5', cy: '6', r: '3', key: '1qnov2' }],
		['path', { d: 'M5 9v6', key: '158jrl' }],
		['circle', { cx: '5', cy: '18', r: '3', key: '104gr9' }],
		['path', { d: 'M12 3v18', key: '108xh3' }],
		['circle', { cx: '19', cy: '6', r: '3', key: '108a5v' }],
		['path', { d: 'M16 15.7A9 9 0 0 0 19 9', key: '1e3vqb' }],
	],
	a9 = [
		['circle', { cx: '18', cy: '18', r: '3', key: '1xkwt0' }],
		['circle', { cx: '6', cy: '6', r: '3', key: '1lh9wr' }],
		['path', { d: 'M6 21V9a9 9 0 0 0 9 9', key: '7kw0sc' }],
	],
	o9 = [
		['circle', { cx: '5', cy: '6', r: '3', key: '1qnov2' }],
		['path', { d: 'M5 9v12', key: 'ih889a' }],
		['circle', { cx: '19', cy: '18', r: '3', key: '1qljk2' }],
		['path', { d: 'm15 9-3-3 3-3', key: '1lwv8l' }],
		['path', { d: 'M12 6h5a2 2 0 0 1 2 2v7', key: '1yj91y' }],
	],
	r9 = [
		['circle', { cx: '6', cy: '6', r: '3', key: '1lh9wr' }],
		['path', { d: 'M6 9v12', key: '1sc30k' }],
		['path', { d: 'm21 3-6 6', key: '16nqsk' }],
		['path', { d: 'm21 9-6-6', key: '9j17rh' }],
		['path', { d: 'M18 11.5V15', key: '65xf6f' }],
		['circle', { cx: '18', cy: '18', r: '3', key: '1xkwt0' }],
	],
	i9 = [
		['circle', { cx: '5', cy: '6', r: '3', key: '1qnov2' }],
		['path', { d: 'M5 9v12', key: 'ih889a' }],
		['path', { d: 'm15 9-3-3 3-3', key: '1lwv8l' }],
		['path', { d: 'M12 6h5a2 2 0 0 1 2 2v3', key: '1rbwk6' }],
		['path', { d: 'M19 15v6', key: '10aioa' }],
		['path', { d: 'M22 18h-6', key: '1d5gi5' }],
	],
	s9 = [
		['circle', { cx: '6', cy: '6', r: '3', key: '1lh9wr' }],
		['path', { d: 'M6 9v12', key: '1sc30k' }],
		['path', { d: 'M13 6h3a2 2 0 0 1 2 2v3', key: '1jb6z3' }],
		['path', { d: 'M18 15v6', key: '9wciyi' }],
		['path', { d: 'M21 18h-6', key: '139f0c' }],
	],
	c9 = [
		['circle', { cx: '18', cy: '18', r: '3', key: '1xkwt0' }],
		['circle', { cx: '6', cy: '6', r: '3', key: '1lh9wr' }],
		['path', { d: 'M13 6h3a2 2 0 0 1 2 2v7', key: '1yeb86' }],
		['line', { x1: '6', x2: '6', y1: '9', y2: '21', key: 'rroup' }],
	],
	d9 = [
		['circle', { cx: '18', cy: '18', r: '3', key: '1xkwt0' }],
		['circle', { cx: '6', cy: '6', r: '3', key: '1lh9wr' }],
		['path', { d: 'M18 6V5', key: '1oao2s' }],
		['path', { d: 'M18 11v-1', key: '11c8tz' }],
		['line', { x1: '6', x2: '6', y1: '9', y2: '21', key: 'rroup' }],
	],
	l9 = [
		[
			'path',
			{
				d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
				key: 'tonef',
			},
		],
		['path', { d: 'M9 18c-4.51 2-5-2-7-2', key: '9comsn' }],
	],
	u9 = [
		[
			'path',
			{
				d: 'm22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z',
				key: '148pdi',
			},
		],
	],
	h9 = [
		[
			'path',
			{
				d: 'M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z',
				key: 'p55z4y',
			},
		],
		['path', { d: 'M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0', key: 'mjntcy' }],
	],
	p9 = [
		['circle', { cx: '6', cy: '15', r: '4', key: 'vux9w4' }],
		['circle', { cx: '18', cy: '15', r: '4', key: '18o8ve' }],
		['path', { d: 'M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2', key: '1ag4bs' }],
		['path', { d: 'M2.5 13 5 7c.7-1.3 1.4-2 3-2', key: '1hm1gs' }],
		['path', { d: 'M21.5 13 19 7c-.7-1.3-1.5-2-3-2', key: '1r31ai' }],
	],
	y9 = [
		['path', { d: 'M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13', key: 'qkt0x6' }],
		['path', { d: 'M2 12h8.5', key: 'ovaggd' }],
		['path', { d: 'M20 6V4a2 2 0 1 0-4 0v2', key: '1of5e8' }],
		['rect', { width: '8', height: '5', x: '14', y: '6', rx: '1', key: '1fmf51' }],
	],
	f9 = [
		['path', { d: 'M12 13V2l8 4-8 4', key: '5wlwwj' }],
		['path', { d: 'M20.561 10.222a9 9 0 1 1-12.55-5.29', key: '1c0wjv' }],
		['path', { d: 'M8.002 9.997a5 5 0 1 0 8.9 2.02', key: 'gb1g7m' }],
	],
	k9 = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', key: '13o1zl' }],
		['path', { d: 'M2 12h20', key: '9i4pu4' }],
	],
	g9 = [
		['path', { d: 'M2 21V3', key: '1bzk4w' }],
		['path', { d: 'M2 5h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2.26', key: '1d64pi' }],
		['path', { d: 'M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3', key: '5hbqbf' }],
		['circle', { cx: '16', cy: '11', r: '2', key: 'qt15rb' }],
		['circle', { cx: '8', cy: '11', r: '2', key: 'ssideg' }],
	],
	m9 = [
		[
			'path',
			{
				d: 'M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z',
				key: 'j76jl0',
			},
		],
		['path', { d: 'M22 10v6', key: '1lu8f3' }],
		['path', { d: 'M6 12.5V16a6 3 0 0 0 12 0v-3.5', key: '1r8lef' }],
	],
	M9 = [
		['path', { d: 'M22 5V2l-5.89 5.89', key: '1eenpo' }],
		['circle', { cx: '16.6', cy: '15.89', r: '3', key: 'xjtalx' }],
		['circle', { cx: '8.11', cy: '7.4', r: '3', key: 'u2fv6i' }],
		['circle', { cx: '12.35', cy: '11.65', r: '3', key: 'i6i8g7' }],
		['circle', { cx: '13.91', cy: '5.85', r: '3', key: '6ye0dv' }],
		['circle', { cx: '18.15', cy: '10.09', r: '3', key: 'snx9no' }],
		['circle', { cx: '6.56', cy: '13.2', r: '3', key: '17x4xg' }],
		['circle', { cx: '10.8', cy: '17.44', r: '3', key: '1hogw9' }],
		['circle', { cx: '5', cy: '19', r: '3', key: '1sn6vo' }],
	],
	v9 = [
		[
			'path',
			{
				d: 'M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3',
				key: '11za1p',
			},
		],
		['path', { d: 'm16 19 2 2 4-4', key: '1b14m6' }],
	],
	I9 = [
		[
			'path',
			{
				d: 'M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3',
				key: '11za1p',
			},
		],
		['path', { d: 'M16 19h6', key: 'xwg31i' }],
		['path', { d: 'M19 22v-6', key: 'qhmiwi' }],
	],
	x9 = [
		['path', { d: 'M12 3v18', key: '108xh3' }],
		['path', { d: 'M3 12h18', key: '1i2n21' }],
		['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', key: 'h1oib' }],
	],
	w9 = [
		[
			'path',
			{
				d: 'M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3',
				key: '11za1p',
			},
		],
		['path', { d: 'm16 16 5 5', key: '8tpb07' }],
		['path', { d: 'm16 21 5-5', key: '193jll' }],
	],
	C9 = [
		['path', { d: 'M15 3v18', key: '14nvp0' }],
		['path', { d: 'M3 12h18', key: '1i2n21' }],
		['path', { d: 'M9 3v18', key: 'fh3hqa' }],
		['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', key: 'h1oib' }],
	],
	L9 = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M3 9h18', key: '1pudct' }],
		['path', { d: 'M3 15h18', key: '5xshup' }],
		['path', { d: 'M9 3v18', key: 'fh3hqa' }],
		['path', { d: 'M15 3v18', key: '14nvp0' }],
	],
	b9 = [
		['circle', { cx: '12', cy: '9', r: '1', key: '124mty' }],
		['circle', { cx: '19', cy: '9', r: '1', key: '1ruzo2' }],
		['circle', { cx: '5', cy: '9', r: '1', key: '1a8b28' }],
		['circle', { cx: '12', cy: '15', r: '1', key: '1e56xg' }],
		['circle', { cx: '19', cy: '15', r: '1', key: '1a92ep' }],
		['circle', { cx: '5', cy: '15', r: '1', key: '5r1jwy' }],
	],
	S9 = [
		['circle', { cx: '9', cy: '12', r: '1', key: '1vctgf' }],
		['circle', { cx: '9', cy: '5', r: '1', key: 'hp0tcf' }],
		['circle', { cx: '9', cy: '19', r: '1', key: 'fkjjf6' }],
		['circle', { cx: '15', cy: '12', r: '1', key: '1tmaij' }],
		['circle', { cx: '15', cy: '5', r: '1', key: '19l28e' }],
		['circle', { cx: '15', cy: '19', r: '1', key: 'f4zoj3' }],
	],
	D9 = [
		['circle', { cx: '12', cy: '5', r: '1', key: 'gxeob9' }],
		['circle', { cx: '19', cy: '5', r: '1', key: 'w8mnmm' }],
		['circle', { cx: '5', cy: '5', r: '1', key: 'lttvr7' }],
		['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
		['circle', { cx: '19', cy: '12', r: '1', key: '1wjl8i' }],
		['circle', { cx: '5', cy: '12', r: '1', key: '1pcz8c' }],
		['circle', { cx: '12', cy: '19', r: '1', key: 'lyex9k' }],
		['circle', { cx: '19', cy: '19', r: '1', key: 'shf9b7' }],
		['circle', { cx: '5', cy: '19', r: '1', key: 'bfqh0e' }],
	],
	A9 = [
		['path', { d: 'M3 7V5c0-1.1.9-2 2-2h2', key: 'adw53z' }],
		['path', { d: 'M17 3h2c1.1 0 2 .9 2 2v2', key: 'an4l38' }],
		['path', { d: 'M21 17v2c0 1.1-.9 2-2 2h-2', key: '144t0e' }],
		['path', { d: 'M7 21H5c-1.1 0-2-.9-2-2v-2', key: 'rtnfgi' }],
		['rect', { width: '7', height: '5', x: '7', y: '7', rx: '1', key: '1eyiv7' }],
		['rect', { width: '7', height: '5', x: '10', y: '12', rx: '1', key: '1qlmkx' }],
	],
	E9 = [
		['path', { d: 'm11.9 12.1 4.514-4.514', key: '109xqo' }],
		[
			'path',
			{
				d: 'M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z',
				key: 'txyc8t',
			},
		],
		['path', { d: 'm6 16 2 2', key: '16qmzd' }],
		[
			'path',
			{
				d: 'M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z',
				key: '1de1vg',
			},
		],
	],
	T9 = [
		['path', { d: 'M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856', key: '1k1t7q' }],
		[
			'path',
			{ d: 'M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288', key: '153t1g' },
		],
		[
			'path',
			{
				d: 'M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025',
				key: 'gzrt0n',
			},
		],
		['path', { d: 'm8.5 16.5-1-1', key: 'otr954' }],
	],
	P9 = [
		['path', { d: 'M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25', key: '5dloqd' }],
		['path', { d: 'M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2', key: '1vl3my' }],
		['path', { d: 'M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0', key: '1us75o' }],
		['path', { d: 'm6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2', key: 'qqzweh' }],
	],
	R9 = [
		['path', { d: 'm15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9', key: '1hayfq' }],
		['path', { d: 'm18 15 4-4', key: '16gjal' }],
		[
			'path',
			{
				d: 'm21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5',
				key: '15ts47',
			},
		],
	],
	N9 = [
		['path', { d: 'M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17', key: 'geh8rc' }],
		[
			'path',
			{
				d: 'm7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9',
				key: '1fto5m',
			},
		],
		['path', { d: 'm2 16 6 6', key: '1pfhp9' }],
		['circle', { cx: '16', cy: '9', r: '2.9', key: '1n0dlu' }],
		['circle', { cx: '6', cy: '5', r: '3', key: '151irh' }],
	],
	_9 = [
		[
			'path',
			{
				d: 'M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0',
				key: '1ff7rl',
			},
		],
		['path', { d: 'M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5', key: '1xmd21' }],
		['path', { d: 'M9 5A2 2 0 1 0 5 5V10', key: 'f3wfjw' }],
		['path', { d: 'M9 7V4A2 2 0 1 1 13 4V7.268', key: 'eaoucv' }],
	],
	H9 = [
		['path', { d: 'M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4', key: 'edstyy' }],
		['path', { d: 'M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2', key: '19wdwo' }],
		['path', { d: 'M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5', key: '1lugqo' }],
		['path', { d: 'M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2', key: '1hbeus' }],
		['path', { d: 'M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0', key: '1etffm' }],
	],
	O9 = [
		['path', { d: 'M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16', key: '1v1a37' }],
		[
			'path',
			{
				d: 'm14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95',
				key: 'fhfbnt',
			},
		],
		['path', { d: 'm2 15 6 6', key: '10dquu' }],
		[
			'path',
			{ d: 'm7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91', key: '1x6kdw' },
		],
	],
	F9 = [
		['path', { d: 'M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14', key: '1j4xps' }],
		[
			'path',
			{
				d: 'm7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9',
				key: 'uospg8',
			},
		],
		['path', { d: 'm2 13 6 6', key: '16e5sb' }],
	],
	j9 = [
		['path', { d: 'M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4', key: 'wc6myp' }],
		['path', { d: 'M14 11V9a2 2 0 1 0-4 0v2', key: '94qvcw' }],
		['path', { d: 'M10 10.5V5a2 2 0 1 0-4 0v9', key: 'm1ah89' }],
		[
			'path',
			{
				d: 'm7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5',
				key: 't1skq1',
			},
		],
	],
	q9 = [
		['path', { d: 'M12 3V2', key: 'ar7q03' }],
		[
			'path',
			{
				d: 'm15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5',
				key: 'n2g93r',
			},
		],
		['path', { d: 'M2 14h12a2 2 0 0 1 0 4h-2', key: '1o2jem' }],
		['path', { d: 'M4 10h16', key: 'img6z1' }],
		['path', { d: 'M5 10a7 7 0 0 1 14 0', key: '1ega1o' }],
		['path', { d: 'M5 14v6a1 1 0 0 1-1 1H2', key: '1hescx' }],
	],
	V9 = [
		['path', { d: 'M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2', key: '1fvzgz' }],
		['path', { d: 'M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2', key: '1kc0my' }],
		['path', { d: 'M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8', key: '10h0bg' }],
		[
			'path',
			{
				d: 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15',
				key: '1s1gnw',
			},
		],
	],
	z9 = [
		[
			'path',
			{
				d: 'M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z',
				key: '1qbui5',
			},
		],
		['path', { d: 'M8 11V6a4 4 0 0 1 8 0v5', key: 'tcht90' }],
	],
	B9 = [
		['path', { d: 'm11 17 2 2a1 1 0 1 0 3-3', key: 'efffak' }],
		[
			'path',
			{
				d: 'm14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4',
				key: '9pr0kb',
			},
		],
		['path', { d: 'm21 3 1 11h-2', key: '1tisrp' }],
		['path', { d: 'M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3', key: '1uvwmv' }],
		['path', { d: 'M3 4h8', key: '1ep09j' }],
	],
	U9 = [
		['path', { d: 'M12 2v8', key: '1q4o3n' }],
		['path', { d: 'm16 6-4 4-4-4', key: '6wukr' }],
		['rect', { width: '20', height: '8', x: '2', y: '14', rx: '2', key: 'w68u3i' }],
		['path', { d: 'M6 18h.01', key: 'uhywen' }],
		['path', { d: 'M10 18h.01', key: 'h775k' }],
	],
	G9 = [
		['path', { d: 'm16 6-4-4-4 4', key: '13yo43' }],
		['path', { d: 'M12 2v8', key: '1q4o3n' }],
		['rect', { width: '20', height: '8', x: '2', y: '14', rx: '2', key: 'w68u3i' }],
		['path', { d: 'M6 18h.01', key: 'uhywen' }],
		['path', { d: 'M10 18h.01', key: 'h775k' }],
	],
	W9 = [
		['path', { d: 'M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5', key: '1p9q5i' }],
		['path', { d: 'M14 6a6 6 0 0 1 6 6v3', key: '1hnv84' }],
		['path', { d: 'M4 15v-3a6 6 0 0 1 6-6', key: '9ciidu' }],
		['rect', { x: '2', y: '15', width: '20', height: '4', rx: '1', key: 'g3x8cw' }],
	],
	$9 = [
		['line', { x1: '22', x2: '2', y1: '12', y2: '12', key: '1y58io' }],
		[
			'path',
			{
				d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
				key: 'oot6mr',
			},
		],
		['line', { x1: '6', x2: '6.01', y1: '16', y2: '16', key: 'sgf278' }],
		['line', { x1: '10', x2: '10.01', y1: '16', y2: '16', key: '1l4acy' }],
	],
	Z9 = [
		['path', { d: 'M14 18a2 2 0 0 0-4 0', key: '1v8fkw' }],
		[
			'path',
			{
				d: 'm19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11',
				key: '1fkr7p',
			},
		],
		['path', { d: 'M2 11h20', key: '3eubbj' }],
		['circle', { cx: '17', cy: '18', r: '3', key: '82mm0e' }],
		['circle', { cx: '7', cy: '18', r: '3', key: 'lvkj7j' }],
	],
	Q9 = [
		['line', { x1: '4', x2: '20', y1: '9', y2: '9', key: '4lhtct' }],
		['line', { x1: '4', x2: '20', y1: '15', y2: '15', key: 'vyu0kd' }],
		['line', { x1: '10', x2: '8', y1: '3', y2: '21', key: '1ggp8o' }],
		['line', { x1: '16', x2: '14', y1: '3', y2: '21', key: 'weycgp' }],
	],
	X9 = [
		['path', { d: 'm5.2 6.2 1.4 1.4', key: '17imol' }],
		['path', { d: 'M2 13h2', key: '13gyu8' }],
		['path', { d: 'M20 13h2', key: '16rner' }],
		['path', { d: 'm17.4 7.6 1.4-1.4', key: 't4xlah' }],
		['path', { d: 'M22 17H2', key: '1gtaj3' }],
		['path', { d: 'M22 21H2', key: '1gy6en' }],
		['path', { d: 'M16 13a4 4 0 0 0-8 0', key: '1dyczq' }],
		['path', { d: 'M12 5V2.5', key: '1vytko' }],
	],
	K9 = [
		['path', { d: 'M10 12H6', key: '15f2ro' }],
		['path', { d: 'M10 15V9', key: '1lckn7' }],
		[
			'path',
			{
				d: 'M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z',
				key: 'b3f847',
			},
		],
		['path', { d: 'M6 15V9', key: '12stmj' }],
		['rect', { x: '2', y: '5', width: '20', height: '14', rx: '2', key: 'qneu4z' }],
	],
	Y9 = [
		[
			'path',
			{ d: 'M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z', key: '2128wb' },
		],
		['path', { d: 'M7.5 12h9', key: '1t0ckc' }],
	],
	J9 = [
		['path', { d: 'M4 12h8', key: '17cfdx' }],
		['path', { d: 'M4 18V6', key: '1rz3zl' }],
		['path', { d: 'M12 18V6', key: 'zqpxq5' }],
		['path', { d: 'm17 12 3-2v8', key: '1hhhft' }],
	],
	eI = [
		['path', { d: 'M4 12h8', key: '17cfdx' }],
		['path', { d: 'M4 18V6', key: '1rz3zl' }],
		['path', { d: 'M12 18V6', key: 'zqpxq5' }],
		['path', { d: 'M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1', key: '9jr5yi' }],
	],
	tI = [
		['path', { d: 'M4 12h8', key: '17cfdx' }],
		['path', { d: 'M4 18V6', key: '1rz3zl' }],
		['path', { d: 'M12 18V6', key: 'zqpxq5' }],
		['path', { d: 'M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2', key: '68ncm8' }],
		['path', { d: 'M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2', key: '1ejuhz' }],
	],
	nI = [
		['path', { d: 'M12 18V6', key: 'zqpxq5' }],
		['path', { d: 'M17 10v3a1 1 0 0 0 1 1h3', key: 'tj5zdr' }],
		['path', { d: 'M21 10v8', key: '1kdml4' }],
		['path', { d: 'M4 12h8', key: '17cfdx' }],
		['path', { d: 'M4 18V6', key: '1rz3zl' }],
	],
	aI = [
		['path', { d: 'M4 12h8', key: '17cfdx' }],
		['path', { d: 'M4 18V6', key: '1rz3zl' }],
		['path', { d: 'M12 18V6', key: 'zqpxq5' }],
		['path', { d: 'M17 13v-3h4', key: '1nvgqp' }],
		['path', { d: 'M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17', key: '2nebdn' }],
	],
	oI = [
		['path', { d: 'M6 12h12', key: '8npq4p' }],
		['path', { d: 'M6 20V4', key: '1w1bmo' }],
		['path', { d: 'M18 20V4', key: 'o2hl4u' }],
	],
	rI = [
		['path', { d: 'M4 12h8', key: '17cfdx' }],
		['path', { d: 'M4 18V6', key: '1rz3zl' }],
		['path', { d: 'M12 18V6', key: 'zqpxq5' }],
		['circle', { cx: '19', cy: '16', r: '2', key: '15mx69' }],
		['path', { d: 'M20 10c-2 2-3 3.5-3 6', key: 'f35dl0' }],
	],
	iI = [
		['path', { d: 'M21 14h-1.343', key: '1jdnxi' }],
		['path', { d: 'M9.128 3.47A9 9 0 0 1 21 12v3.343', key: '6kipu2' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3', key: '9x50f4' }],
		[
			'path',
			{ d: 'M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364', key: '1bkxnm' },
		],
	],
	sI = [
		[
			'path',
			{
				d: 'M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3',
				key: '1xhozi',
			},
		],
	],
	cI = [
		[
			'path',
			{
				d: 'M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z',
				key: '12oyoe',
			},
		],
		['path', { d: 'M21 16v2a4 4 0 0 1-4 4h-5', key: '1x7m43' }],
	],
	dI = [
		[
			'path',
			{
				d: 'M12.409 5.824c-.702.792-1.15 1.496-1.415 2.166l2.153 2.156a.5.5 0 0 1 0 .707l-2.293 2.293a.5.5 0 0 0 0 .707L12 15',
				key: 'idzbju',
			},
		],
		[
			'path',
			{
				d: 'M13.508 20.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.677.6.6 0 0 0 .818.001A5.5 5.5 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5z',
				key: '1su70f',
			},
		],
	],
	lI = [
		[
			'path',
			{
				d: 'M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762',
				key: '17lmqv',
			},
		],
	],
	uI = [
		[
			'path',
			{
				d: 'm14.876 18.99-1.368 1.323a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.244 1.572',
				key: '15yztm',
			},
		],
		['path', { d: 'M15 15h6', key: '1u4692' }],
	],
	hI = [
		[
			'path',
			{
				d: 'M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655',
				key: '1inpfl',
			},
		],
		[
			'path',
			{
				d: 'm16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761',
				key: 'vbc6x7',
			},
		],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	pI = [
		[
			'path',
			{
				d: 'm14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49',
				key: 'wg5jx',
			},
		],
		['path', { d: 'M15 15h6', key: '1u4692' }],
		['path', { d: 'M18 12v6', key: '1houu1' }],
	],
	yI = [
		[
			'path',
			{
				d: 'M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5',
				key: 'mvr1a0',
			},
		],
		['path', { d: 'M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27', key: 'auskq0' }],
	],
	fI = [
		[
			'path',
			{
				d: 'M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5',
				key: 'mvr1a0',
			},
		],
	],
	kI = [
		['path', { d: 'M11 8c2-3-2-3 0-6', key: '1ldv5m' }],
		['path', { d: 'M15.5 8c2-3-2-3 0-6', key: '1otqoz' }],
		['path', { d: 'M6 10h.01', key: '1lbq93' }],
		['path', { d: 'M6 14h.01', key: 'zudwn7' }],
		['path', { d: 'M10 16v-4', key: '1c25yv' }],
		['path', { d: 'M14 16v-4', key: '1dkbt8' }],
		['path', { d: 'M18 16v-4', key: '1yg9me' }],
		['path', { d: 'M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3', key: '1ubg90' }],
		['path', { d: 'M5 20v2', key: '1abpe8' }],
		['path', { d: 'M19 20v2', key: 'kqn6ft' }],
	],
	gI = [
		['path', { d: 'M11 17v4', key: '14wq8k' }],
		['path', { d: 'M14 3v8a2 2 0 0 0 2 2h5.865', key: '12oo5h' }],
		['path', { d: 'M17 17v4', key: 'hdt4hh' }],
		['path', { d: 'M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z', key: 'yynif' }],
		['path', { d: 'M2 10v5', key: 'sa5akn' }],
		['path', { d: 'M6 3h16', key: '27qw71' }],
		['path', { d: 'M7 21h14', key: '1ugz0u' }],
		['path', { d: 'M8 13H2', key: '1thz1o' }],
	],
	mI = [
		[
			'path',
			{
				d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
				key: 'yt0hxn',
			},
		],
	],
	MI = [
		['path', { d: 'm9 11-6 6v3h9l3-3', key: '1a3l36' }],
		['path', { d: 'm22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4', key: '14a9rk' }],
	],
	vI = [
		['path', { d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', key: '1357e3' }],
		['path', { d: 'M3 3v5h5', key: '1xhq8a' }],
		['path', { d: 'M12 7v5l4 2', key: '1fdv2h' }],
	],
	II = [
		['path', { d: 'M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27', key: 'qyzcap' }],
		[
			'path',
			{ d: 'M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28', key: 'y078lb' },
		],
		['path', { d: 'M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26', key: '1utre3' }],
		[
			'path',
			{ d: 'M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25', key: '17o9hm' },
		],
		['path', { d: 'M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75', key: '1d1n4p' }],
		[
			'path',
			{
				d: 'M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24',
				key: '9uv3tt',
			},
		],
		[
			'path',
			{
				d: 'M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28',
				key: '1292wz',
			},
		],
		['path', { d: 'M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05', key: '7ozu9p' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	xI = [
		[
			'path',
			{ d: 'M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18', key: '18lxf1' },
		],
		[
			'path',
			{
				d: 'M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88',
				key: 'vtfxrw',
			},
		],
		[
			'path',
			{ d: 'M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36', key: '13hl71' },
		],
		[
			'path',
			{ d: 'M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87', key: '1sl8oj' },
		],
		[
			'path',
			{ d: 'M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08', key: '19c6kt' },
		],
		[
			'path',
			{ d: 'M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57', key: '85ghs3' },
		],
		['path', { d: 'M4.93 4.93 3 3a.7.7 0 0 1 0-1', key: 'x087yj' }],
		[
			'path',
			{
				d: 'M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15',
				key: '11xdqo',
			},
		],
	],
	wI = [
		['path', { d: 'M12 7v4', key: 'xawao1' }],
		['path', { d: 'M14 21v-3a2 2 0 0 0-4 0v3', key: '1rgiei' }],
		['path', { d: 'M14 9h-4', key: '1w2s2s' }],
		['path', { d: 'M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2', key: '1tthqt' }],
		['path', { d: 'M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16', key: 'dw4p4i' }],
	],
	CI = [
		['path', { d: 'M10 22v-6.57', key: '1wmca3' }],
		['path', { d: 'M12 11h.01', key: 'z322tv' }],
		['path', { d: 'M12 7h.01', key: '1ivr5q' }],
		['path', { d: 'M14 15.43V22', key: '1q2vjd' }],
		['path', { d: 'M15 16a5 5 0 0 0-6 0', key: 'o9wqvi' }],
		['path', { d: 'M16 11h.01', key: 'xkw8gn' }],
		['path', { d: 'M16 7h.01', key: '1kdx03' }],
		['path', { d: 'M8 11h.01', key: '1dfujw' }],
		['path', { d: 'M8 7h.01', key: '1vti4s' }],
		['rect', { x: '4', y: '2', width: '16', height: '20', rx: '2', key: '1uxh74' }],
	],
	LI = [
		['path', { d: 'M5 22h14', key: 'ehvnwv' }],
		['path', { d: 'M5 2h14', key: 'pdyrp9' }],
		['path', { d: 'M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22', key: '1d314k' }],
		['path', { d: 'M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2', key: '1vvvr6' }],
	],
	bI = [
		[
			'path',
			{
				d: 'M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z',
				key: 'n9s7kx',
			},
		],
		[
			'path',
			{
				d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
				key: 'r6nss1',
			},
		],
	],
	SI = [
		['path', { d: 'M10 12V8.964', key: '1vll13' }],
		['path', { d: 'M14 12V8.964', key: '1x3qvg' }],
		['path', { d: 'M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z', key: 'ppykja' }],
		[
			'path',
			{
				d: 'M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2',
				key: '365xoy',
			},
		],
	],
	DI = [
		[
			'path',
			{
				d: 'M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35',
				key: '8ek5ge',
			},
		],
		['path', { d: 'M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8', key: '1rbg29' }],
		['path', { d: 'M15 18h6', key: '3b3c90' }],
		['path', { d: 'M18 15v6', key: '9wciyi' }],
	],
	AI = [
		['path', { d: 'M9.5 13.866a4 4 0 0 1 5 .01', key: '1wy54i' }],
		['path', { d: 'M12 17h.01', key: 'p32p05' }],
		[
			'path',
			{
				d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
				key: 'r6nss1',
			},
		],
		['path', { d: 'M7 10.754a8 8 0 0 1 10 0', key: 'exoy2g' }],
	],
	EI = [
		['path', { d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8', key: '5wwlr5' }],
		[
			'path',
			{
				d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
				key: 'r6nss1',
			},
		],
	],
	TI = [
		[
			'path',
			{ d: 'M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0', key: '1uxfcu' },
		],
		['path', { d: 'M12.14 11a3.5 3.5 0 1 1 6.71 0', key: '4k3m1s' }],
		['path', { d: 'M15.5 6.5a3.5 3.5 0 1 0-7 0', key: 'zmuahr' }],
	],
	PI = [
		['path', { d: 'm7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11', key: '1v6356' }],
		['path', { d: 'M17 7A5 5 0 0 0 7 7', key: '151p3v' }],
		['path', { d: 'M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4', key: '1sdaij' }],
	],
	RI = [
		['path', { d: 'M13.5 8h-3', key: 'xvov4w' }],
		['path', { d: 'm15 2-1 2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3', key: '16uttc' }],
		['path', { d: 'M16.899 22A5 5 0 0 0 7.1 22', key: '1d0ppr' }],
		['path', { d: 'm9 2 3 6', key: '1o7bd9' }],
		['circle', { cx: '12', cy: '15', r: '3', key: 'g36mzq' }],
	],
	NI = [
		['path', { d: 'M16 10h2', key: '8sgtl7' }],
		['path', { d: 'M16 14h2', key: 'epxaof' }],
		['path', { d: 'M6.17 15a3 3 0 0 1 5.66 0', key: 'n6f512' }],
		['circle', { cx: '9', cy: '11', r: '2', key: 'yxgjnd' }],
		['rect', { x: '2', y: '5', width: '20', height: '14', rx: '2', key: 'qneu4z' }],
	],
	_I = [
		[
			'path',
			{
				d: 'M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21',
				key: '9csbqa',
			},
		],
		['path', { d: 'm14 19 3 3v-5.5', key: '9ldu5r' }],
		['path', { d: 'm17 22 3-3', key: '1nkfve' }],
		['circle', { cx: '9', cy: '9', r: '2', key: 'af1f0g' }],
	],
	HI = [
		['path', { d: 'M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7', key: 'm87ecr' }],
		['line', { x1: '16', x2: '22', y1: '5', y2: '5', key: 'ez7e4s' }],
		['circle', { cx: '9', cy: '9', r: '2', key: 'af1f0g' }],
		['path', { d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21', key: '1xmnt7' }],
	],
	OI = [
		[
			'path',
			{
				d: 'M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z',
				key: 'nrt1m3',
			},
		],
		['path', { d: 'M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6', key: '99hgts' }],
		['path', { d: 'm6 21 5-5', key: '1wyjai' }],
		['circle', { cx: '9', cy: '9', r: '2', key: 'af1f0g' }],
	],
	FI = [
		['line', { x1: '2', x2: '22', y1: '2', y2: '22', key: 'a6p6uj' }],
		['path', { d: 'M10.41 10.41a2 2 0 1 1-2.83-2.83', key: '1bzlo9' }],
		['line', { x1: '13.5', x2: '6', y1: '13.5', y2: '21', key: '1q0aeu' }],
		['line', { x1: '18', x2: '21', y1: '12', y2: '15', key: '5mozeu' }],
		['path', { d: 'M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59', key: 'mmje98' }],
		['path', { d: 'M21 15V5a2 2 0 0 0-2-2H9', key: '43el77' }],
	],
	jI = [
		[
			'path',
			{
				d: 'M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21',
				key: '9csbqa',
			},
		],
		['path', { d: 'm14 19.5 3-3 3 3', key: '9vmjn0' }],
		['path', { d: 'M17 22v-5.5', key: '1aa6fl' }],
		['circle', { cx: '9', cy: '9', r: '2', key: 'af1f0g' }],
	],
	qI = [
		['path', { d: 'M16 5h6', key: '1vod17' }],
		['path', { d: 'M19 2v6', key: '4bpg5p' }],
		['path', { d: 'M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5', key: '1ue2ih' }],
		['path', { d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21', key: '1xmnt7' }],
		['circle', { cx: '9', cy: '9', r: '2', key: 'af1f0g' }],
	],
	VI = [
		['path', { d: 'M16 3h5v5', key: '1806ms' }],
		['path', { d: 'M17 21h2a2 2 0 0 0 2-2', key: '130fy9' }],
		['path', { d: 'M21 12v3', key: '1wzk3p' }],
		['path', { d: 'm21 3-5 5', key: '1g5oa7' }],
		['path', { d: 'M3 7V5a2 2 0 0 1 2-2', key: 'kk3yz1' }],
		['path', { d: 'm5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19', key: 'fyekpt' }],
		['path', { d: 'M9 3h3', key: 'd52fa' }],
		['rect', { x: '3', y: '11', width: '10', height: '10', rx: '1', key: '1wpmix' }],
	],
	zI = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
		['circle', { cx: '9', cy: '9', r: '2', key: 'af1f0g' }],
		['path', { d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21', key: '1xmnt7' }],
	],
	BI = [
		['path', { d: 'm22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16', key: '9kzy35' }],
		['path', { d: 'M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2', key: '1t0f0t' }],
		['circle', { cx: '13', cy: '7', r: '1', fill: 'currentColor', key: '1obus6' }],
		['rect', { x: '8', y: '2', width: '14', height: '14', rx: '2', key: '1gvhby' }],
	],
	UI = [
		['path', { d: 'M12 3v12', key: '1x0j5s' }],
		['path', { d: 'm8 11 4 4 4-4', key: '1dohi6' }],
		['path', { d: 'M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4', key: '1ywtjm' }],
	],
	GI = [
		['polyline', { points: '22 12 16 12 14 15 10 15 8 12 2 12', key: 'o97t9d' }],
		[
			'path',
			{
				d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
				key: 'oot6mr',
			},
		],
	],
	WI = [
		['path', { d: 'M6 3h12', key: 'ggurg9' }],
		['path', { d: 'M6 8h12', key: '6g4wlu' }],
		['path', { d: 'm6 13 8.5 8', key: 'u1kupk' }],
		['path', { d: 'M6 13h3', key: 'wdp6ag' }],
		['path', { d: 'M9 13c6.667 0 6.667-10 0-10', key: '1nkvk2' }],
	],
	$I = [['path', { d: 'M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8', key: '18ogeb' }]],
	ZI = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M12 16v-4', key: '1dtifu' }],
		['path', { d: 'M12 8h.01', key: 'e9boi3' }],
	],
	QI = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M7 7h.01', key: '7u93v4' }],
		['path', { d: 'M17 7h.01', key: '14a9sn' }],
		['path', { d: 'M7 17h.01', key: '19xn7k' }],
		['path', { d: 'M17 17h.01', key: '1sd3ek' }],
	],
	XI = [
		['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5', key: '2e1cvw' }],
		['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', key: '9exkf1' }],
		['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5', key: 'r4j83e' }],
	],
	KI = [
		['line', { x1: '19', x2: '10', y1: '4', y2: '4', key: '15jd3p' }],
		['line', { x1: '14', x2: '5', y1: '20', y2: '20', key: 'bu0au3' }],
		['line', { x1: '15', x2: '9', y1: '4', y2: '20', key: 'uljnxc' }],
	],
	YI = [
		['path', { d: 'm16 14 4 4-4 4', key: 'hkso8o' }],
		['path', { d: 'M20 10a8 8 0 1 0-8 8h8', key: '1bik7b' }],
	],
	JI = [
		['path', { d: 'M4 10a8 8 0 1 1 8 8H4', key: 'svv66n' }],
		['path', { d: 'm8 22-4-4 4-4', key: '6g7gki' }],
	],
	ex = [
		['path', { d: 'M12 9.5V21m0-11.5L6 3m6 6.5L18 3', key: '2ej80x' }],
		['path', { d: 'M6 15h12', key: '1hwgt5' }],
		['path', { d: 'M6 11h12', key: 'wf4gp6' }],
	],
	tx = [
		['path', { d: 'M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z', key: 'jg2n2t' }],
		['path', { d: 'M6 15v-2', key: 'gd6mvg' }],
		['path', { d: 'M12 15V9', key: '8c7uyn' }],
		['circle', { cx: '12', cy: '6', r: '3', key: '1gm2ql' }],
	],
	nx = [
		['path', { d: 'M5 3v14', key: '9nsxs2' }],
		['path', { d: 'M12 3v8', key: '1h2ygw' }],
		['path', { d: 'M19 3v18', key: '1sk56x' }],
	],
	ax = [
		['path', { d: 'M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z', key: 'skzb1g' }],
		[
			'path',
			{
				d: 'M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61',
				key: 'cv9jm7',
			},
		],
		['path', { d: 'm6.707 6.707 10.586 10.586', key: 'd2l993' }],
		['path', { d: 'M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z', key: 'i0et4n' }],
	],
	ox = [
		[
			'path',
			{
				d: 'M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z',
				key: '1s6t7t',
			},
		],
		['circle', { cx: '16.5', cy: '7.5', r: '.5', fill: 'currentColor', key: 'w0ekpg' }],
	],
	rx = [
		[
			'path',
			{
				d: 'M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z',
				key: '165ttr',
			},
		],
		['path', { d: 'm14 7 3 3', key: '1r5n42' }],
		[
			'path',
			{
				d: 'm9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814',
				key: '1ubxi2',
			},
		],
	],
	ix = [
		['path', { d: 'm15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4', key: 'g0fldk' }],
		['path', { d: 'm21 2-9.6 9.6', key: '1j0ho8' }],
		['circle', { cx: '7.5', cy: '15.5', r: '5.5', key: 'yqb3hr' }],
	],
	sx = [
		['rect', { width: '20', height: '16', x: '2', y: '4', rx: '2', key: '18n3k1' }],
		['path', { d: 'M6 8h4', key: 'utf9t1' }],
		['path', { d: 'M14 8h.01', key: '1primd' }],
		['path', { d: 'M18 8h.01', key: 'emo2bl' }],
		['path', { d: 'M2 12h20', key: '9i4pu4' }],
		['path', { d: 'M6 12v4', key: 'dy92yo' }],
		['path', { d: 'M10 12v4', key: '1fxnav' }],
		['path', { d: 'M14 12v4', key: '1hft58' }],
		['path', { d: 'M18 12v4', key: 'tjjnbz' }],
	],
	cx = [
		['path', { d: 'M 20 4 A2 2 0 0 1 22 6', key: '1g1fkt' }],
		['path', { d: 'M 22 6 L 22 16.41', key: '1qjg3w' }],
		['path', { d: 'M 7 16 L 16 16', key: 'n0yqwb' }],
		['path', { d: 'M 9.69 4 L 20 4', key: 'kbpcgx' }],
		['path', { d: 'M14 8h.01', key: '1primd' }],
		['path', { d: 'M18 8h.01', key: 'emo2bl' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2', key: 's23sx2' }],
		['path', { d: 'M6 8h.01', key: 'x9i8wu' }],
		['path', { d: 'M8 12h.01', key: 'czm47f' }],
	],
	dx = [
		['path', { d: 'M10 8h.01', key: '1r9ogq' }],
		['path', { d: 'M12 12h.01', key: '1mp3jc' }],
		['path', { d: 'M14 8h.01', key: '1primd' }],
		['path', { d: 'M16 12h.01', key: '1l6xoz' }],
		['path', { d: 'M18 8h.01', key: 'emo2bl' }],
		['path', { d: 'M6 8h.01', key: 'x9i8wu' }],
		['path', { d: 'M7 16h10', key: 'wp8him' }],
		['path', { d: 'M8 12h.01', key: 'czm47f' }],
		['rect', { width: '20', height: '16', x: '2', y: '4', rx: '2', key: '18n3k1' }],
	],
	lx = [
		['path', { d: 'M12 2v5', key: 'nd4vlx' }],
		['path', { d: 'M14.829 15.998a3 3 0 1 1-5.658 0', key: '1pybiy' }],
		[
			'path',
			{
				d: 'M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z',
				key: 'ma1wor',
			},
		],
	],
	ux = [
		[
			'path',
			{
				d: 'M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z',
				key: 'sb8slu',
			},
		],
		['path', { d: 'm14.207 4.793-3.414 3.414', key: 'm2x3oj' }],
		['path', { d: 'M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z', key: '8b3myj' }],
		['path', { d: 'm9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18', key: '43s6cu' }],
	],
	hx = [
		['path', { d: 'M12 10v12', key: '6ubwww' }],
		[
			'path',
			{
				d: 'M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z',
				key: '1o95gh',
			},
		],
		['path', { d: 'M9 22h6', key: '1rlq3v' }],
	],
	px = [
		[
			'path',
			{
				d: 'M19.929 18.629A1 1 0 0 1 19 20H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 13h6a1 1 0 0 1 .928.629z',
				key: 'u4w2d7',
			},
		],
		['path', { d: 'M6 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z', key: '15356w' }],
		['path', { d: 'M8 6h4a2 2 0 0 1 2 2v5', key: '1m6m7x' }],
	],
	yx = [
		[
			'path',
			{
				d: 'M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z',
				key: '1uvrbf',
			},
		],
		['path', { d: 'M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z', key: '154r2a' }],
		['path', { d: 'M8 18h4a2 2 0 0 0 2-2v-5', key: 'z9mbu0' }],
	],
	fx = [
		['path', { d: 'M12 12v6', key: '3ahymv' }],
		[
			'path',
			{
				d: 'M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z',
				key: '1l7kg2',
			},
		],
		['path', { d: 'M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z', key: '1mmzpi' }],
	],
	kx = [
		['path', { d: 'm12 8 6-3-6-3v10', key: 'mvpnpy' }],
		[
			'path',
			{
				d: 'm8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12',
				key: 'ek95tt',
			},
		],
		['path', { d: 'm6.49 12.85 11.02 6.3', key: '1kt42w' }],
		['path', { d: 'M17.51 12.85 6.5 19.15', key: 'v55bdg' }],
	],
	gx = [
		['path', { d: 'M10 18v-7', key: 'wt116b' }],
		[
			'path',
			{
				d: 'M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z',
				key: '1m329m',
			},
		],
		['path', { d: 'M14 18v-7', key: 'vav6t3' }],
		['path', { d: 'M18 18v-7', key: 'aexdmj' }],
		['path', { d: 'M3 22h18', key: '8prr45' }],
		['path', { d: 'M6 18v-7', key: '1ivflk' }],
	],
	mx = [
		['path', { d: 'M2 20h20', key: 'owomy5' }],
		['path', { d: 'm9 10 2 2 4-4', key: '1gnqz4' }],
		['rect', { x: '3', y: '4', width: '18', height: '12', rx: '2', key: '8ur36m' }],
	],
	Mx = [
		['rect', { width: '18', height: '12', x: '3', y: '4', rx: '2', ry: '2', key: '1qhy41' }],
		['line', { x1: '2', x2: '22', y1: '20', y2: '20', key: 'ni3hll' }],
	],
	vx = [
		['path', { d: 'm5 8 6 6', key: '1wu5hv' }],
		['path', { d: 'm4 14 6-6 2-3', key: '1k1g8d' }],
		['path', { d: 'M2 5h12', key: 'or177f' }],
		['path', { d: 'M7 2h1', key: '1t2jsx' }],
		['path', { d: 'm22 22-5-10-5 10', key: 'don7ne' }],
		['path', { d: 'M14 18h6', key: '1m8k6r' }],
	],
	Ix = [
		[
			'path',
			{
				d: 'M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z',
				key: '1pdavp',
			},
		],
		['path', { d: 'M20.054 15.987H3.946', key: '14rxg9' }],
	],
	xx = [
		['path', { d: 'M7 22a5 5 0 0 1-2-4', key: 'umushi' }],
		['path', { d: 'M7 16.93c.96.43 1.96.74 2.99.91', key: 'ybbtv3' }],
		[
			'path',
			{ d: 'M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2', key: 'gt5e1w' },
		],
		['path', { d: 'M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', key: 'bq3ynw' }],
		[
			'path',
			{
				d: 'M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z',
				key: '72q637',
			},
		],
	],
	wx = [
		[
			'path',
			{
				d: 'M3.704 14.467A10 8 0 0 1 2 10a10 8 0 0 1 20 0 10 8 0 0 1-10 8 10 8 0 0 1-5.181-1.158',
				key: '1yant3',
			},
		],
		['path', { d: 'M7 22a5 5 0 0 1-2-3.994', key: '1xp6a4' }],
		['circle', { cx: '5', cy: '16', r: '2', key: '18csp3' }],
	],
	Cx = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z', key: 'b2q4dd' }],
		['line', { x1: '9', x2: '9.01', y1: '9', y2: '9', key: 'yxxnd0' }],
		['line', { x1: '15', x2: '15.01', y1: '9', y2: '9', key: '1p4y9e' }],
	],
	Lx = [
		[
			'path',
			{
				d: 'M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z',
				key: '15q6uc',
			},
		],
		[
			'path',
			{
				d: 'm20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845',
				key: 'byia6g',
			},
		],
	],
	bx = [
		[
			'path',
			{
				d: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z',
				key: 'zzgyd3',
			},
		],
		['path', { d: 'M16 17h6', key: '1ook5g' }],
		['path', { d: 'M19 14v6', key: '1ckrd5' }],
		['path', { d: 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178', key: '1ia9y3' }],
		['path', { d: 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962', key: 'jksky3' }],
	],
	Sx = [
		[
			'path',
			{
				d: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z',
				key: 'zw3jo',
			},
		],
		['path', { d: 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12', key: '1wduqc' }],
		['path', { d: 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17', key: 'kqbvx6' }],
	],
	Dx = [
		['rect', { width: '7', height: '7', x: '3', y: '3', rx: '1', key: '1g98yp' }],
		['rect', { width: '7', height: '7', x: '14', y: '3', rx: '1', key: '6d4xhi' }],
		['rect', { width: '7', height: '7', x: '14', y: '14', rx: '1', key: 'nxv5o0' }],
		['rect', { width: '7', height: '7', x: '3', y: '14', rx: '1', key: '1bb6yr' }],
	],
	Ax = [
		['rect', { width: '7', height: '9', x: '3', y: '3', rx: '1', key: '10lvy0' }],
		['rect', { width: '7', height: '5', x: '14', y: '3', rx: '1', key: '16une8' }],
		['rect', { width: '7', height: '9', x: '14', y: '12', rx: '1', key: '1hutg5' }],
		['rect', { width: '7', height: '5', x: '3', y: '16', rx: '1', key: 'ldoo1y' }],
	],
	Ex = [
		['rect', { width: '7', height: '7', x: '3', y: '3', rx: '1', key: '1g98yp' }],
		['rect', { width: '7', height: '7', x: '3', y: '14', rx: '1', key: '1bb6yr' }],
		['path', { d: 'M14 4h7', key: '3xa0d5' }],
		['path', { d: 'M14 9h7', key: '1icrd9' }],
		['path', { d: 'M14 15h7', key: '1mj8o2' }],
		['path', { d: 'M14 20h7', key: '11slyb' }],
	],
	Tx = [
		['rect', { width: '7', height: '18', x: '3', y: '3', rx: '1', key: '2obqm' }],
		['rect', { width: '7', height: '7', x: '14', y: '3', rx: '1', key: '6d4xhi' }],
		['rect', { width: '7', height: '7', x: '14', y: '14', rx: '1', key: 'nxv5o0' }],
	],
	Px = [
		['rect', { width: '18', height: '7', x: '3', y: '3', rx: '1', key: 'f1a2em' }],
		['rect', { width: '7', height: '7', x: '3', y: '14', rx: '1', key: '1bb6yr' }],
		['rect', { width: '7', height: '7', x: '14', y: '14', rx: '1', key: 'nxv5o0' }],
	],
	Rx = [
		['rect', { width: '18', height: '7', x: '3', y: '3', rx: '1', key: 'f1a2em' }],
		['rect', { width: '9', height: '7', x: '3', y: '14', rx: '1', key: 'jqznyg' }],
		['rect', { width: '5', height: '7', x: '16', y: '14', rx: '1', key: 'q5h2i8' }],
	],
	Nx = [
		[
			'path',
			{ d: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z', key: 'nnexq3' },
		],
		['path', { d: 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12', key: 'mt58a7' }],
	],
	_x = [
		[
			'path',
			{
				d: 'M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22',
				key: '1134nt',
			},
		],
		['path', { d: 'M2 22 17 7', key: '1q7jp2' }],
	],
	Hx = [
		[
			'path',
			{
				d: 'M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3',
				key: '13jjxg',
			},
		],
		['path', { d: 'M18 6V3a1 1 0 0 0-1-1h-3', key: '1550fe' }],
		['rect', { width: '8', height: '12', x: '8', y: '10', rx: '1', key: 'qmu8b6' }],
	],
	Ox = [
		['rect', { width: '8', height: '18', x: '3', y: '3', rx: '1', key: 'oynpb5' }],
		['path', { d: 'M7 3v18', key: 'bbkbws' }],
		[
			'path',
			{
				d: 'M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z',
				key: '1qboyk',
			},
		],
	],
	Fx = [
		['path', { d: 'm16 6 4 14', key: 'ji33uf' }],
		['path', { d: 'M12 6v14', key: '1n7gus' }],
		['path', { d: 'M8 8v12', key: '1gg7y9' }],
		['path', { d: 'M4 4v16', key: '6qkkli' }],
	],
	jx = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'm4.93 4.93 4.24 4.24', key: '1ymg45' }],
		['path', { d: 'm14.83 9.17 4.24-4.24', key: '1cb5xl' }],
		['path', { d: 'm14.83 14.83 4.24 4.24', key: 'q42g0n' }],
		['path', { d: 'm9.17 14.83-4.24 4.24', key: 'bqpfvv' }],
		['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
	],
	qx = [
		['path', { d: 'M14 12h2v8', key: 'c1fccl' }],
		['path', { d: 'M14 20h4', key: 'lzx1xo' }],
		['path', { d: 'M6 12h4', key: 'a4o3ry' }],
		['path', { d: 'M6 20h4', key: '1i6q5t' }],
		['path', { d: 'M8 20V8a4 4 0 0 1 7.464-2', key: 'wk9t6r' }],
	],
	Vx = [
		['path', { d: 'M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5', key: '1fkcox' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5', key: '10m8kw' }],
		['path', { d: 'M9 18h6', key: 'x1upvd' }],
		['path', { d: 'M10 22h4', key: 'ceow96' }],
	],
	zx = [
		[
			'path',
			{
				d: 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5',
				key: '1gvzjb',
			},
		],
		['path', { d: 'M9 18h6', key: 'x1upvd' }],
		['path', { d: 'M10 22h4', key: 'ceow96' }],
	],
	Bx = [
		[
			'path',
			{ d: 'M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2', key: '1lrphd' },
		],
	],
	Ux = [
		['path', { d: 'M9 17H7A5 5 0 0 1 7 7', key: '10o201' }],
		['path', { d: 'M15 7h2a5 5 0 0 1 4 8', key: '1d3206' }],
		['line', { x1: '8', x2: '12', y1: '12', y2: '12', key: 'rvw6j4' }],
		['line', { x1: '2', x2: '22', y1: '2', y2: '22', key: 'a6p6uj' }],
	],
	Gx = [
		['path', { d: 'M9 17H7A5 5 0 0 1 7 7h2', key: '8i5ue5' }],
		['path', { d: 'M15 7h2a5 5 0 1 1 0 10h-2', key: '1b9ql8' }],
		['line', { x1: '8', x2: '16', y1: '12', y2: '12', key: '1jonct' }],
	],
	Wx = [
		['path', { d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', key: '1cjeqo' }],
		['path', { d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71', key: '19qd67' }],
	],
	$x = [
		[
			'path',
			{ d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z', key: 'c2jq9f' },
		],
		['rect', { width: '4', height: '12', x: '2', y: '9', key: 'mk3on5' }],
		['circle', { cx: '4', cy: '4', r: '2', key: 'bt5ra8' }],
	],
	Zx = [
		['path', { d: 'M16 5H3', key: 'm91uny' }],
		['path', { d: 'M16 12H3', key: '1a2rj7' }],
		['path', { d: 'M11 19H3', key: 'zflm78' }],
		['path', { d: 'm15 18 2 2 4-4', key: '1szwhi' }],
	],
	Qx = [
		['path', { d: 'M13 5h8', key: 'a7qcls' }],
		['path', { d: 'M13 12h8', key: 'h98zly' }],
		['path', { d: 'M13 19h8', key: 'c3s6r1' }],
		['path', { d: 'm3 17 2 2 4-4', key: '1jhpwq' }],
		['path', { d: 'm3 7 2 2 4-4', key: '1obspn' }],
	],
	Xx = [
		['path', { d: 'M3 5h8', key: '18g2rq' }],
		['path', { d: 'M3 12h8', key: '1xfjp6' }],
		['path', { d: 'M3 19h8', key: 'fpbke4' }],
		['path', { d: 'm15 5 3 3 3-3', key: '1t4thf' }],
		['path', { d: 'm15 19 3-3 3 3', key: 'y4ckd2' }],
	],
	Kx = [
		['path', { d: 'M3 5h8', key: '18g2rq' }],
		['path', { d: 'M3 12h8', key: '1xfjp6' }],
		['path', { d: 'M3 19h8', key: 'fpbke4' }],
		['path', { d: 'm15 8 3-3 3 3', key: 'bc4io6' }],
		['path', { d: 'm15 16 3 3 3-3', key: '9wmg1l' }],
	],
	Yx = [
		['path', { d: 'M10 5h11', key: '1hkqpe' }],
		['path', { d: 'M10 12h11', key: '6m4ad9' }],
		['path', { d: 'M10 19h11', key: '14g2nv' }],
		['path', { d: 'm3 10 3-3-3-3', key: 'i7pm08' }],
		['path', { d: 'm3 20 3-3-3-3', key: '20gx1n' }],
	],
	Jx = [
		['path', { d: 'M16 5H3', key: 'm91uny' }],
		['path', { d: 'M16 12H3', key: '1a2rj7' }],
		['path', { d: 'M9 19H3', key: 's61nz1' }],
		['path', { d: 'm16 16-3 3 3 3', key: '117b85' }],
		['path', { d: 'M21 5v12a2 2 0 0 1-2 2h-6', key: 'hey24a' }],
	],
	ew = [
		['path', { d: 'M12 5H2', key: '1o22fu' }],
		['path', { d: 'M6 12h12', key: '8npq4p' }],
		['path', { d: 'M9 19h6', key: '456am0' }],
		['path', { d: 'M16 5h6', key: '1vod17' }],
		['path', { d: 'M19 8V2', key: '1wcffq' }],
	],
	tw = [
		['path', { d: 'M2 5h20', key: '1fs1ex' }],
		['path', { d: 'M6 12h12', key: '8npq4p' }],
		['path', { d: 'M9 19h6', key: '456am0' }],
	],
	nw = [
		['path', { d: 'M21 5H11', key: 'us1j55' }],
		['path', { d: 'M21 12H11', key: 'wd7e0v' }],
		['path', { d: 'M21 19H11', key: 'saa85w' }],
		['path', { d: 'm7 8-4 4 4 4', key: 'o5hrat' }],
	],
	aw = [
		['path', { d: 'M21 5H11', key: 'us1j55' }],
		['path', { d: 'M21 12H11', key: 'wd7e0v' }],
		['path', { d: 'M21 19H11', key: 'saa85w' }],
		['path', { d: 'm3 8 4 4-4 4', key: '1a3j6y' }],
	],
	ow = [
		['path', { d: 'M16 5H3', key: 'm91uny' }],
		['path', { d: 'M11 12H3', key: '51ecnj' }],
		['path', { d: 'M16 19H3', key: 'zzsher' }],
		['path', { d: 'M21 12h-6', key: 'bt1uis' }],
	],
	rw = [
		['path', { d: 'M16 5H3', key: 'm91uny' }],
		['path', { d: 'M11 12H3', key: '51ecnj' }],
		['path', { d: 'M11 19H3', key: 'zflm78' }],
		['path', { d: 'M21 16V5', key: 'yxg4q8' }],
		['circle', { cx: '18', cy: '16', r: '3', key: '1hluhg' }],
	],
	iw = [
		['path', { d: 'M11 5h10', key: '1cz7ny' }],
		['path', { d: 'M11 12h10', key: '1438ji' }],
		['path', { d: 'M11 19h10', key: '11t30w' }],
		['path', { d: 'M4 4h1v5', key: '10yrso' }],
		['path', { d: 'M4 9h2', key: 'r1h2o0' }],
		['path', { d: 'M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02', key: 'xtkcd5' }],
	],
	sw = [
		['path', { d: 'M16 5H3', key: 'm91uny' }],
		['path', { d: 'M11 12H3', key: '51ecnj' }],
		['path', { d: 'M16 19H3', key: 'zzsher' }],
		['path', { d: 'M18 9v6', key: '1twb98' }],
		['path', { d: 'M21 12h-6', key: 'bt1uis' }],
	],
	cw = [
		['path', { d: 'M21 5H3', key: '1fi0y6' }],
		['path', { d: 'M7 12H3', key: '13ou7f' }],
		['path', { d: 'M7 19H3', key: 'wbqt3n' }],
		['path', { d: 'M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14', key: 'qth677' }],
		['path', { d: 'M11 10v4h4', key: '172dkj' }],
	],
	dw = [
		['path', { d: 'M3 5h6', key: '1ltk0q' }],
		['path', { d: 'M3 12h13', key: 'ppymz1' }],
		['path', { d: 'M3 19h13', key: 'bpdczq' }],
		['path', { d: 'm16 8-3-3 3-3', key: '1pjpp6' }],
		['path', { d: 'M21 19V7a2 2 0 0 0-2-2h-6', key: '4zzq67' }],
	],
	lw = [
		['path', { d: 'M13 5h8', key: 'a7qcls' }],
		['path', { d: 'M13 12h8', key: 'h98zly' }],
		['path', { d: 'M13 19h8', key: 'c3s6r1' }],
		['path', { d: 'm3 17 2 2 4-4', key: '1jhpwq' }],
		['rect', { x: '3', y: '4', width: '6', height: '6', rx: '1', key: 'cif1o7' }],
	],
	uw = [
		['path', { d: 'M8 5h13', key: '1pao27' }],
		['path', { d: 'M13 12h8', key: 'h98zly' }],
		['path', { d: 'M13 19h8', key: 'c3s6r1' }],
		['path', { d: 'M3 10a2 2 0 0 0 2 2h3', key: '1npucw' }],
		['path', { d: 'M3 5v12a2 2 0 0 0 2 2h3', key: 'x1gjn2' }],
	],
	hw = [
		['path', { d: 'M21 5H3', key: '1fi0y6' }],
		['path', { d: 'M10 12H3', key: '1ulcyk' }],
		['path', { d: 'M10 19H3', key: '108z41' }],
		[
			'path',
			{
				d: 'M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z',
				key: 'ms4nik',
			},
		],
	],
	pw = [
		['path', { d: 'M16 5H3', key: 'm91uny' }],
		['path', { d: 'M11 12H3', key: '51ecnj' }],
		['path', { d: 'M16 19H3', key: 'zzsher' }],
		['path', { d: 'm15.5 9.5 5 5', key: 'ytk86i' }],
		['path', { d: 'm20.5 9.5-5 5', key: '17o44f' }],
	],
	yw = [
		['path', { d: 'M3 5h.01', key: '18ugdj' }],
		['path', { d: 'M3 12h.01', key: 'nlz23k' }],
		['path', { d: 'M3 19h.01', key: 'noohij' }],
		['path', { d: 'M8 5h13', key: '1pao27' }],
		['path', { d: 'M8 12h13', key: '1za7za' }],
		['path', { d: 'M8 19h13', key: 'm83p4d' }],
	],
	fw = [['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56', key: '13zald' }]],
	kw = [
		['path', { d: 'M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0', key: '1lzz15' }],
		['path', { d: 'M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6', key: '1gnrpi' }],
		['path', { d: 'M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6', key: 'u9yy5q' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	gw = [
		['path', { d: 'M12 2v4', key: '3427ic' }],
		['path', { d: 'm16.2 7.8 2.9-2.9', key: 'r700ao' }],
		['path', { d: 'M18 12h4', key: 'wj9ykh' }],
		['path', { d: 'm16.2 16.2 2.9 2.9', key: '1bxg5t' }],
		['path', { d: 'M12 18v4', key: 'jadmvz' }],
		['path', { d: 'm4.9 19.1 2.9-2.9', key: 'bwix9q' }],
		['path', { d: 'M2 12h4', key: 'j09sii' }],
		['path', { d: 'm4.9 4.9 2.9 2.9', key: 'giyufr' }],
	],
	mw = [
		['line', { x1: '2', x2: '5', y1: '12', y2: '12', key: 'bvdh0s' }],
		['line', { x1: '19', x2: '22', y1: '12', y2: '12', key: '1tbv5k' }],
		['line', { x1: '12', x2: '12', y1: '2', y2: '5', key: '11lu5j' }],
		['line', { x1: '12', x2: '12', y1: '19', y2: '22', key: 'x3vr5v' }],
		['circle', { cx: '12', cy: '12', r: '7', key: 'fim9np' }],
		['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
	],
	Mw = [
		['path', { d: 'M12 19v3', key: 'npa21l' }],
		['path', { d: 'M12 2v3', key: 'qbqxhf' }],
		['path', { d: 'M18.89 13.24a7 7 0 0 0-8.13-8.13', key: '1v9jrh' }],
		['path', { d: 'M19 12h3', key: 'osuazr' }],
		['path', { d: 'M2 12h3', key: '1wrr53' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M7.05 7.05a7 7 0 0 0 9.9 9.9', key: 'rc5l2e' }],
	],
	vw = [
		['line', { x1: '2', x2: '5', y1: '12', y2: '12', key: 'bvdh0s' }],
		['line', { x1: '19', x2: '22', y1: '12', y2: '12', key: '1tbv5k' }],
		['line', { x1: '12', x2: '12', y1: '2', y2: '5', key: '11lu5j' }],
		['line', { x1: '12', x2: '12', y1: '19', y2: '22', key: 'x3vr5v' }],
		['circle', { cx: '12', cy: '12', r: '7', key: 'fim9np' }],
	],
	Iw = [
		['circle', { cx: '12', cy: '16', r: '1', key: '1au0dj' }],
		['rect', { width: '18', height: '12', x: '3', y: '10', rx: '2', key: 'l0tzu3' }],
		['path', { d: 'M7 10V7a5 5 0 0 1 9.33-2.5', key: 'car5b7' }],
	],
	xw = [
		['circle', { cx: '12', cy: '16', r: '1', key: '1au0dj' }],
		['rect', { x: '3', y: '10', width: '18', height: '12', rx: '2', key: '6s8ecr' }],
		['path', { d: 'M7 10V7a5 5 0 0 1 10 0v3', key: '1pqi11' }],
	],
	ww = [
		['rect', { width: '18', height: '11', x: '3', y: '11', rx: '2', ry: '2', key: '1w4ew1' }],
		['path', { d: 'M7 11V7a5 5 0 0 1 9.9-1', key: '1mm8w8' }],
	],
	Cw = [
		['path', { d: 'm10 17 5-5-5-5', key: '1bsop3' }],
		['path', { d: 'M15 12H3', key: '6jk70r' }],
		['path', { d: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4', key: 'u53s6r' }],
	],
	Lw = [
		['rect', { width: '18', height: '11', x: '3', y: '11', rx: '2', ry: '2', key: '1w4ew1' }],
		['path', { d: 'M7 11V7a5 5 0 0 1 10 0v4', key: 'fwvmzm' }],
	],
	bw = [
		['path', { d: 'm16 17 5-5-5-5', key: '1bji2h' }],
		['path', { d: 'M21 12H9', key: 'dn1m92' }],
		['path', { d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', key: '1uf3rs' }],
	],
	Sw = [
		['path', { d: 'M3 5h1', key: '1mv5vm' }],
		['path', { d: 'M3 12h1', key: 'lp3yf2' }],
		['path', { d: 'M3 19h1', key: 'w6f3n9' }],
		['path', { d: 'M8 5h1', key: '1nxr5w' }],
		['path', { d: 'M8 12h1', key: '1con00' }],
		['path', { d: 'M8 19h1', key: 'k7p10e' }],
		['path', { d: 'M13 5h8', key: 'a7qcls' }],
		['path', { d: 'M13 12h8', key: 'h98zly' }],
		['path', { d: 'M13 19h8', key: 'c3s6r1' }],
	],
	Dw = [
		['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
		['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
		['path', { d: 'M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0', key: '107gwy' }],
	],
	Aw = [
		['path', { d: 'M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2', key: '1m57jg' }],
		['path', { d: 'M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14', key: '1l99gc' }],
		['path', { d: 'M10 20h4', key: 'ni2waw' }],
		['circle', { cx: '16', cy: '20', r: '2', key: '1vifvg' }],
		['circle', { cx: '8', cy: '20', r: '2', key: 'ckkr5m' }],
	],
	Ew = [
		['path', { d: 'm12 15 4 4', key: 'lnac28' }],
		[
			'path',
			{
				d: 'M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z',
				key: 'nlhkjb',
			},
		],
		['path', { d: 'm5 8 4 4', key: 'j6kj7e' }],
	],
	Tw = [
		['path', { d: 'M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8', key: '12jkf8' }],
		['path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', key: '1ocrg3' }],
		['path', { d: 'm16 19 2 2 4-4', key: '1b14m6' }],
	],
	Pw = [
		['path', { d: 'M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8', key: 'fuxbkv' }],
		['path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', key: '1ocrg3' }],
		['path', { d: 'M16 19h6', key: 'xwg31i' }],
	],
	Rw = [
		[
			'path',
			{
				d: 'M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z',
				key: '1jhwl8',
			},
		],
		['path', { d: 'm22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10', key: '1qfld7' }],
	],
	Nw = [
		['path', { d: 'M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8', key: '12jkf8' }],
		['path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', key: '1ocrg3' }],
		['path', { d: 'M19 16v6', key: 'tddt3s' }],
		['path', { d: 'M16 19h6', key: 'xwg31i' }],
	],
	_w = [
		['path', { d: 'M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5', key: 'e61zoh' }],
		['path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', key: '1ocrg3' }],
		['path', { d: 'M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2', key: '7z9rxb' }],
		['path', { d: 'M20 22v.01', key: '12bgn6' }],
	],
	Hw = [
		['path', { d: 'M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5', key: 'w80f2v' }],
		['path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', key: '1ocrg3' }],
		['path', { d: 'M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', key: '8lzu5m' }],
		['circle', { cx: '18', cy: '18', r: '3', key: '1xkwt0' }],
		['path', { d: 'm22 22-1.5-1.5', key: '1x83k4' }],
	],
	Ow = [
		['path', { d: 'M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5', key: 'e61zoh' }],
		['path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', key: '1ocrg3' }],
		['path', { d: 'M20 14v4', key: '1hm744' }],
		['path', { d: 'M20 22v.01', key: '12bgn6' }],
	],
	Fw = [
		['path', { d: 'M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9', key: '1j9vog' }],
		['path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', key: '1ocrg3' }],
		['path', { d: 'm17 17 4 4', key: '1b3523' }],
		['path', { d: 'm21 17-4 4', key: 'uinynz' }],
	],
	jw = [
		['path', { d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7', key: '132q7q' }],
		['rect', { x: '2', y: '4', width: '20', height: '16', rx: '2', key: 'izxlao' }],
	],
	qw = [
		['path', { d: 'M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z', key: '1lbycx' }],
		['polyline', { points: '15,9 18,9 18,11', key: '1pm9c0' }],
		['path', { d: 'M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2', key: '15i455' }],
		['line', { x1: '6', x2: '7', y1: '10', y2: '10', key: '1e2scm' }],
	],
	Vw = [
		['path', { d: 'M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732', key: '1vyzll' }],
		['path', { d: 'm22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5', key: 'k7ramc' }],
		['rect', { x: '7', y: '3', width: '15', height: '12', rx: '2', key: '17196g' }],
	],
	zw = [
		[
			'path',
			{
				d: 'm11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14',
				key: '40pylx',
			},
		],
		['path', { d: 'M15 5.764V14', key: '1bab71' }],
		['path', { d: 'M21 18h-6', key: '139f0c' }],
		['path', { d: 'M9 3.236v15', key: '1uimfh' }],
	],
	Bw = [
		[
			'path',
			{
				d: 'M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728',
				key: '1dq61d',
			},
		],
		['circle', { cx: '12', cy: '10', r: '3', key: 'ilqhr7' }],
		['path', { d: 'm16 18 2 2 4-4', key: '1mkfmb' }],
	],
	Uw = [
		[
			'path',
			{
				d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
				key: '1r0f0z',
			},
		],
		['path', { d: 'm9 10 2 2 4-4', key: '1gnqz4' }],
	],
	Gw = [
		[
			'path',
			{
				d: 'M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z',
				key: '1p1rcz',
			},
		],
		['path', { d: 'M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2', key: 'mcbcs9' }],
		['path', { d: 'M18 22v-3', key: '1t1ugv' }],
		['circle', { cx: '10', cy: '10', r: '3', key: '1ns7v1' }],
	],
	Ww = [
		[
			'path',
			{
				d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
				key: '1r0f0z',
			},
		],
		['path', { d: 'M9 10h6', key: '9gxzsh' }],
	],
	$w = [
		[
			'path',
			{
				d: 'M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738',
				key: '11uxia',
			},
		],
		['circle', { cx: '12', cy: '10', r: '3', key: 'ilqhr7' }],
		['path', { d: 'M16 18h6', key: '987eiv' }],
	],
	Zw = [
		['path', { d: 'M12.75 7.09a3 3 0 0 1 2.16 2.16', key: '1d4wjd' }],
		[
			'path',
			{
				d: 'M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568',
				key: '12yil7',
			},
		],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533', key: 'lhrkcz' }],
		['path', { d: 'M9.13 9.13a3 3 0 0 0 3.74 3.74', key: '13wojd' }],
	],
	Qw = [
		['path', { d: 'M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468', key: '1fahp3' }],
		[
			'path',
			{
				d: 'M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
				key: '1817ys',
			},
		],
		['circle', { cx: '10', cy: '10', r: '3', key: '1ns7v1' }],
	],
	Xw = [
		[
			'path',
			{
				d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
				key: '1r0f0z',
			},
		],
		['path', { d: 'M12 7v6', key: 'lw1j43' }],
		['path', { d: 'M9 10h6', key: '9gxzsh' }],
	],
	Kw = [
		[
			'path',
			{
				d: 'M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738',
				key: 'fcdtly',
			},
		],
		['circle', { cx: '12', cy: '10', r: '3', key: 'ilqhr7' }],
		['path', { d: 'M16 18h6', key: '987eiv' }],
		['path', { d: 'M19 15v6', key: '10aioa' }],
	],
	Yw = [
		[
			'path',
			{
				d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
				key: '1r0f0z',
			},
		],
		['path', { d: 'm14.5 7.5-5 5', key: '3lb6iw' }],
		['path', { d: 'm9.5 7.5 5 5', key: 'ko136h' }],
	],
	Jw = [
		[
			'path',
			{
				d: 'M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077',
				key: 'y0ewhp',
			},
		],
		['circle', { cx: '12', cy: '10', r: '3', key: 'ilqhr7' }],
		['path', { d: 'm21.5 15.5-5 5', key: '11iqnx' }],
		['path', { d: 'm21.5 20.5-5-5', key: '1bylgx' }],
	],
	eC = [
		[
			'path',
			{
				d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
				key: '1r0f0z',
			},
		],
		['circle', { cx: '12', cy: '10', r: '3', key: 'ilqhr7' }],
	],
	tC = [
		[
			'path',
			{
				d: 'M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0',
				key: '11u0oz',
			},
		],
		['circle', { cx: '12', cy: '8', r: '2', key: '1822b1' }],
		[
			'path',
			{
				d: 'M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712',
				key: 'q8zwxj',
			},
		],
	],
	nC = [
		[
			'path',
			{
				d: 'm11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12',
				key: 'svfegj',
			},
		],
		['path', { d: 'M15 5.764V12', key: '1ocw4k' }],
		['path', { d: 'M18 15v6', key: '9wciyi' }],
		['path', { d: 'M21 18h-6', key: '139f0c' }],
		['path', { d: 'M9 3.236v15', key: '1uimfh' }],
	],
	aC = [
		[
			'path',
			{
				d: 'M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z',
				key: '169xi5',
			},
		],
		['path', { d: 'M15 5.764v15', key: '1pn4in' }],
		['path', { d: 'M9 3.236v15', key: '1uimfh' }],
	],
	oC = [
		['path', { d: 'm14 6 4 4', key: '1q72g9' }],
		['path', { d: 'M17 3h4v4', key: '19p9u1' }],
		['path', { d: 'm21 3-7.75 7.75', key: '1cjbfd' }],
		['circle', { cx: '9', cy: '15', r: '6', key: 'bx5svt' }],
	],
	rC = [
		['path', { d: 'M16 3h5v5', key: '1806ms' }],
		['path', { d: 'm21 3-6.75 6.75', key: 'pv0uzu' }],
		['circle', { cx: '10', cy: '14', r: '6', key: '1qwbdc' }],
	],
	iC = [
		['path', { d: 'M15 3h6v6', key: '1q9fwt' }],
		['path', { d: 'm21 3-7 7', key: '1l2asr' }],
		['path', { d: 'm3 21 7-7', key: 'tjx5ai' }],
		['path', { d: 'M9 21H3v-6', key: 'wtvkvv' }],
	],
	sC = [
		['path', { d: 'M8 22h8', key: 'rmew8v' }],
		['path', { d: 'M12 11v11', key: 'ur9y6a' }],
		['path', { d: 'm19 3-7 8-7-8Z', key: '1sgpiw' }],
	],
	cC = [
		['path', { d: 'M8 3H5a2 2 0 0 0-2 2v3', key: '1dcmit' }],
		['path', { d: 'M21 8V5a2 2 0 0 0-2-2h-3', key: '1e4gt3' }],
		['path', { d: 'M3 16v3a2 2 0 0 0 2 2h3', key: 'wsl5sc' }],
		['path', { d: 'M16 21h3a2 2 0 0 0 2-2v-3', key: '18trek' }],
	],
	dC = [
		[
			'path',
			{
				d: 'M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15',
				key: '143lza',
			},
		],
		['path', { d: 'M11 12 5.12 2.2', key: 'qhuxz6' }],
		['path', { d: 'm13 12 5.88-9.8', key: 'hbye0f' }],
		['path', { d: 'M8 7h8', key: 'i86dvs' }],
		['circle', { cx: '12', cy: '17', r: '5', key: 'qbz8iq' }],
		['path', { d: 'M12 18v-2h-.5', key: 'fawc4q' }],
	],
	lC = [
		['path', { d: 'M11.636 6A13 13 0 0 0 19.4 3.2 1 1 0 0 1 21 4v11.344', key: 'bycexp' }],
		['path', { d: 'M14.378 14.357A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1', key: '1t17s6' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14', key: '1853fq' }],
		['path', { d: 'M8 8v6', key: 'aieo6v' }],
	],
	uC = [
		[
			'path',
			{
				d: 'M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z',
				key: 'q8bfy3',
			},
		],
		['path', { d: 'M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14', key: '1853fq' }],
		['path', { d: 'M8 6v8', key: '15ugcq' }],
	],
	hC = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['line', { x1: '8', x2: '16', y1: '15', y2: '15', key: '1xb1d9' }],
		['line', { x1: '9', x2: '9.01', y1: '9', y2: '9', key: 'yxxnd0' }],
		['line', { x1: '15', x2: '15.01', y1: '9', y2: '9', key: '1p4y9e' }],
	],
	pC = [
		['path', { d: 'M4 5h16', key: '1tepv9' }],
		['path', { d: 'M4 12h16', key: '1lakjw' }],
		['path', { d: 'M4 19h16', key: '1djgab' }],
	],
	yC = [
		['path', { d: 'M12 12v-2', key: 'fwoke6' }],
		['path', { d: 'M12 18v-2', key: 'qj6yno' }],
		['path', { d: 'M16 12v-2', key: 'heuere' }],
		['path', { d: 'M16 18v-2', key: 's1ct0w' }],
		['path', { d: 'M2 11h1.5', key: '15p63e' }],
		['path', { d: 'M20 18v-2', key: '12ehxp' }],
		['path', { d: 'M20.5 11H22', key: 'khsy7a' }],
		['path', { d: 'M4 18v-2', key: '1c3oqr' }],
		['path', { d: 'M8 12v-2', key: '1mwtfd' }],
		['path', { d: 'M8 18v-2', key: 'qcmpov' }],
		['rect', { x: '2', y: '6', width: '20', height: '10', rx: '2', key: '1qcswk' }],
	],
	fC = [
		['path', { d: 'm8 6 4-4 4 4', key: 'ybng9g' }],
		['path', { d: 'M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22', key: '1hyw0i' }],
		['path', { d: 'm20 22-5-5', key: '1m27yz' }],
	],
	kC = [
		['path', { d: 'm10 9-3 3 3 3', key: '1oro0q' }],
		['path', { d: 'm14 15 3-3-3-3', key: 'bz13h7' }],
		[
			'path',
			{
				d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
				key: '1sd12s',
			},
		],
	],
	gC = [
		['path', { d: 'M10.1 2.182a10 10 0 0 1 3.8 0', key: '5ilxe3' }],
		['path', { d: 'M13.9 21.818a10 10 0 0 1-3.8 0', key: '11zvb9' }],
		['path', { d: 'M17.609 3.72a10 10 0 0 1 2.69 2.7', key: 'jiglxs' }],
		['path', { d: 'M2.182 13.9a10 10 0 0 1 0-3.8', key: 'c0bmvh' }],
		['path', { d: 'M20.28 17.61a10 10 0 0 1-2.7 2.69', key: 'elg7ff' }],
		['path', { d: 'M21.818 10.1a10 10 0 0 1 0 3.8', key: 'qkgqxc' }],
		['path', { d: 'M3.721 6.391a10 10 0 0 1 2.7-2.69', key: '1mcia2' }],
		['path', { d: 'm6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98', key: '1qsu07' }],
	],
	mC = [
		[
			'path',
			{
				d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
				key: '1sd12s',
			},
		],
		[
			'path',
			{
				d: 'M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z',
				key: 'hoo97p',
			},
		],
	],
	MC = [
		[
			'path',
			{
				d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
				key: '1sd12s',
			},
		],
		['path', { d: 'M8 12h.01', key: 'czm47f' }],
		['path', { d: 'M12 12h.01', key: '1mp3jc' }],
		['path', { d: 'M16 12h.01', key: '1l6xoz' }],
	],
	vC = [
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		[
			'path',
			{
				d: 'M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989',
				key: '7il5tn',
			},
		],
		['path', { d: 'M8.35 2.69A10 10 0 0 1 21.3 15.65', key: '1pfsoa' }],
	],
	IC = [
		[
			'path',
			{
				d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
				key: '1sd12s',
			},
		],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
		['path', { d: 'M12 8v8', key: 'napkw2' }],
	],
	xC = [
		[
			'path',
			{
				d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
				key: '1sd12s',
			},
		],
		['path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', key: '1u773s' }],
		['path', { d: 'M12 17h.01', key: 'p32p05' }],
	],
	wC = [
		[
			'path',
			{
				d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
				key: '1sd12s',
			},
		],
		['path', { d: 'm10 15-3-3 3-3', key: '1pgupc' }],
		['path', { d: 'M7 12h8a2 2 0 0 1 2 2v1', key: '89sh1g' }],
	],
	CC = [
		[
			'path',
			{
				d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
				key: '1sd12s',
			},
		],
		['path', { d: 'M12 8v4', key: '1got3b' }],
		['path', { d: 'M12 16h.01', key: '1drbdi' }],
	],
	LC = [
		[
			'path',
			{
				d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
				key: '1sd12s',
			},
		],
		['path', { d: 'm15 9-6 6', key: '1uzhvr' }],
		['path', { d: 'm9 9 6 6', key: 'z0biqf' }],
	],
	bC = [
		[
			'path',
			{
				d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
				key: '1sd12s',
			},
		],
	],
	SC = [
		[
			'path',
			{
				d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
				key: '18887p',
			},
		],
		['path', { d: 'm10 8-3 3 3 3', key: 'fp6dz7' }],
		['path', { d: 'm14 14 3-3-3-3', key: '1yrceu' }],
	],
	DC = [
		['path', { d: 'M12 19h.01', key: '1wutuc' }],
		['path', { d: 'M12 3h.01', key: 'n36tog' }],
		['path', { d: 'M16 19h.01', key: '1vcnzz' }],
		['path', { d: 'M16 3h.01', key: 'll0zb8' }],
		['path', { d: 'M2 13h.01', key: '1aptou' }],
		['path', { d: 'M2 17v4.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H8', key: '4cp7zq' }],
		['path', { d: 'M2 5a2 2 0 0 1 2-2', key: '1iztiu' }],
		['path', { d: 'M2 9h.01', key: '1nzd1v' }],
		['path', { d: 'M20 3a2 2 0 0 1 2 2', key: 'm48m3a' }],
		['path', { d: 'M22 13h.01', key: 'ke7esy' }],
		['path', { d: 'M22 17a2 2 0 0 1-2 2', key: '17q5fo' }],
		['path', { d: 'M22 9h.01', key: 'npkp49' }],
		['path', { d: 'M8 3h.01', key: '133hau' }],
	],
	AC = [
		[
			'path',
			{
				d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
				key: '18887p',
			},
		],
		['path', { d: 'M10 15h4', key: '192ueg' }],
		['path', { d: 'M10 9h4', key: 'u4k05v' }],
		['path', { d: 'M12 7v4', key: 'xawao1' }],
	],
	EC = [
		[
			'path',
			{
				d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
				key: '18887p',
			},
		],
		[
			'path',
			{
				d: 'M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5',
				key: '1faxuh',
			},
		],
	],
	TC = [
		[
			'path',
			{
				d: 'M12.7 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4.7',
				key: 'wjb7ig',
			},
		],
		['circle', { cx: '19', cy: '6', r: '3', key: '108a5v' }],
	],
	PC = [
		[
			'path',
			{
				d: 'M22 8.5V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H10',
				key: 'fu6chl',
			},
		],
		['path', { d: 'M20 15v-2a2 2 0 0 0-4 0v2', key: 'vl8a78' }],
		['rect', { x: '14', y: '15', width: '8', height: '5', rx: '1', key: '37aafw' }],
	],
	RC = [
		[
			'path',
			{
				d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
				key: '18887p',
			},
		],
		['path', { d: 'M12 11h.01', key: 'z322tv' }],
		['path', { d: 'M16 11h.01', key: 'xkw8gn' }],
		['path', { d: 'M8 11h.01', key: '1dfujw' }],
	],
	NC = [
		[
			'path',
			{
				d: 'M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826',
				key: '1wyg69',
			},
		],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M8.656 3H20a2 2 0 0 1 2 2v11.344', key: 'mhl4k6' }],
	],
	_C = [
		[
			'path',
			{
				d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
				key: '18887p',
			},
		],
		['path', { d: 'M12 8v6', key: '1ib9pf' }],
		['path', { d: 'M9 11h6', key: '1fldmi' }],
	],
	HC = [
		['path', { d: 'M14 14a2 2 0 0 0 2-2V8h-2', key: '1r06pg' }],
		[
			'path',
			{
				d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
				key: '18887p',
			},
		],
		['path', { d: 'M8 14a2 2 0 0 0 2-2V8H8', key: '1jzu5j' }],
	],
	OC = [
		[
			'path',
			{
				d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
				key: '18887p',
			},
		],
		['path', { d: 'm10 8-3 3 3 3', key: 'fp6dz7' }],
		['path', { d: 'M17 14v-1a2 2 0 0 0-2-2H7', key: '1tkjnz' }],
	],
	FC = [
		[
			'path',
			{
				d: 'M12 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4',
				key: '11da1y',
			},
		],
		['path', { d: 'M16 3h6v6', key: '1bx56c' }],
		['path', { d: 'm16 9 6-6', key: 'm4dnic' }],
	],
	jC = [
		[
			'path',
			{
				d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
				key: '18887p',
			},
		],
		['path', { d: 'M7 11h10', key: '1twpyw' }],
		['path', { d: 'M7 15h6', key: 'd9of3u' }],
		['path', { d: 'M7 7h8', key: 'af5zfr' }],
	],
	qC = [
		[
			'path',
			{
				d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
				key: '18887p',
			},
		],
		['path', { d: 'M12 15h.01', key: 'q59x07' }],
		['path', { d: 'M12 7v4', key: 'xawao1' }],
	],
	VC = [
		[
			'path',
			{
				d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
				key: '18887p',
			},
		],
		['path', { d: 'm14.5 8.5-5 5', key: '19tnj2' }],
		['path', { d: 'm9.5 8.5 5 5', key: '1oa8ql' }],
	],
	zC = [
		[
			'path',
			{
				d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
				key: '18887p',
			},
		],
	],
	BC = [
		['path', { d: 'M12 19v3', key: 'npa21l' }],
		['path', { d: 'M15 9.34V5a3 3 0 0 0-5.68-1.33', key: '1gzdoj' }],
		['path', { d: 'M16.95 16.95A7 7 0 0 1 5 12v-2', key: 'cqa7eg' }],
		['path', { d: 'M18.89 13.23A7 7 0 0 0 19 12v-2', key: '16hl24' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M9 9v3a3 3 0 0 0 5.12 2.12', key: 'r2i35w' }],
	],
	UC = [
		[
			'path',
			{
				d: 'M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z',
				key: '1n2ejm',
			},
		],
		[
			'path',
			{
				d: 'M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1',
				key: '1qfcsi',
			},
		],
	],
	GC = [
		['path', { d: 'm11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12', key: '80a601' }],
		[
			'path',
			{
				d: 'M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5',
				key: 'j0ngtp',
			},
		],
		['circle', { cx: '16', cy: '7', r: '5', key: 'd08jfb' }],
	],
	WC = [
		['path', { d: 'M12 19v3', key: 'npa21l' }],
		['path', { d: 'M19 10v2a7 7 0 0 1-14 0v-2', key: '1vc78b' }],
		['rect', { x: '9', y: '2', width: '6', height: '13', rx: '3', key: 's6n7sd' }],
	],
	$C = [
		['path', { d: 'M10 12h4', key: 'a56b0p' }],
		['path', { d: 'M10 17h4', key: 'pvmtpo' }],
		['path', { d: 'M10 7h4', key: '1vgcok' }],
		['path', { d: 'M18 12h2', key: 'quuxs7' }],
		['path', { d: 'M18 18h2', key: '4scel' }],
		['path', { d: 'M18 6h2', key: '1ptzki' }],
		['path', { d: 'M4 12h2', key: '1ltxp0' }],
		['path', { d: 'M4 18h2', key: '1xrofg' }],
		['path', { d: 'M4 6h2', key: '1cx33n' }],
		['rect', { x: '6', y: '2', width: '12', height: '20', rx: '2', key: '749fme' }],
	],
	ZC = [
		['path', { d: 'M6 18h8', key: '1borvv' }],
		['path', { d: 'M3 22h18', key: '8prr45' }],
		['path', { d: 'M14 22a7 7 0 1 0 0-14h-1', key: '1jwaiy' }],
		['path', { d: 'M9 14h2', key: '197e7h' }],
		['path', { d: 'M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z', key: '1bmzmy' }],
		['path', { d: 'M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3', key: '1drr47' }],
	],
	QC = [
		['rect', { width: '20', height: '15', x: '2', y: '4', rx: '2', key: '2no95f' }],
		['rect', { width: '8', height: '7', x: '6', y: '8', rx: '1', key: 'zh9wx' }],
		['path', { d: 'M18 8v7', key: 'o5zi4n' }],
		['path', { d: 'M6 19v2', key: '1loha6' }],
		['path', { d: 'M18 19v2', key: '1dawf0' }],
	],
	XC = [
		['path', { d: 'M12 13v8', key: '1l5pq0' }],
		['path', { d: 'M12 3v3', key: '1n5kay' }],
		[
			'path',
			{
				d: 'M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z',
				key: '1btarq',
			},
		],
	],
	KC = [
		['path', { d: 'M8 2h8', key: '1ssgc1' }],
		[
			'path',
			{
				d: 'M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3',
				key: 'y0ejgx',
			},
		],
		['path', { d: 'M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435', key: 'iaxqsy' }],
		['line', { x1: '2', x2: '22', y1: '2', y2: '22', key: 'a6p6uj' }],
	],
	YC = [
		['path', { d: 'm14 10 7-7', key: 'oa77jy' }],
		['path', { d: 'M20 10h-6V4', key: 'mjg0md' }],
		['path', { d: 'm3 21 7-7', key: 'tjx5ai' }],
		['path', { d: 'M4 14h6v6', key: 'rmj7iw' }],
	],
	JC = [
		['path', { d: 'M8 2h8', key: '1ssgc1' }],
		[
			'path',
			{
				d: 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2',
				key: 'qtp12x',
			},
		],
		['path', { d: 'M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0', key: 'ygeh44' }],
	],
	eL = [
		['path', { d: 'M8 3v3a2 2 0 0 1-2 2H3', key: 'hohbtr' }],
		['path', { d: 'M21 8h-3a2 2 0 0 1-2-2V3', key: '5jw1f3' }],
		['path', { d: 'M3 16h3a2 2 0 0 1 2 2v3', key: '198tvr' }],
		['path', { d: 'M16 21v-3a2 2 0 0 1 2-2h3', key: 'ph8mxp' }],
	],
	tL = [['path', { d: 'M5 12h14', key: '1ays0h' }]],
	nL = [
		['path', { d: 'm9 10 2 2 4-4', key: '1gnqz4' }],
		['rect', { width: '20', height: '14', x: '2', y: '3', rx: '2', key: '48i651' }],
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
	],
	aL = [
		['path', { d: 'M11 13a3 3 0 1 1 2.83-4H14a2 2 0 0 1 0 4z', key: '1da4q6' }],
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
		['rect', { x: '2', y: '3', width: '20', height: '14', rx: '2', key: 'x3v2xh' }],
	],
	oL = [
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'm14.305 7.53.923-.382', key: '1mlnsw' }],
		['path', { d: 'm15.228 4.852-.923-.383', key: '82mpwg' }],
		['path', { d: 'm16.852 3.228-.383-.924', key: 'ln4sir' }],
		['path', { d: 'm16.852 8.772-.383.923', key: '1dejw0' }],
		['path', { d: 'm19.148 3.228.383-.924', key: '192kgf' }],
		['path', { d: 'm19.53 9.696-.382-.924', key: 'fiavlr' }],
		['path', { d: 'm20.772 4.852.924-.383', key: '1j8mgp' }],
		['path', { d: 'm20.772 7.148.924.383', key: 'zix9be' }],
		['path', { d: 'M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7', key: '1tnzv8' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
		['circle', { cx: '18', cy: '6', r: '3', key: '1h7g24' }],
	],
	rL = [
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693', key: '1dx6ho' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
		['circle', { cx: '19', cy: '6', r: '3', key: '108a5v' }],
	],
	iL = [
		['path', { d: 'M12 13V7', key: 'h0r20n' }],
		['path', { d: 'm15 10-3 3-3-3', key: 'lzhmyn' }],
		['rect', { width: '20', height: '14', x: '2', y: '3', rx: '2', key: '48i651' }],
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
	],
	sL = [
		['path', { d: 'M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2', key: 'k0q8oc' }],
		['path', { d: 'M22 15V5a2 2 0 0 0-2-2H9', key: 'cp1ac0' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	cL = [
		['path', { d: 'M10 13V7', key: '1u13u9' }],
		['path', { d: 'M14 13V7', key: '1vj9om' }],
		['rect', { width: '20', height: '14', x: '2', y: '3', rx: '2', key: '48i651' }],
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
	],
	dL = [
		[
			'path',
			{
				d: 'M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z',
				key: 'vbtd3f',
			},
		],
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
		['rect', { x: '2', y: '3', width: '20', height: '14', rx: '2', key: 'x3v2xh' }],
	],
	lL = [
		['path', { d: 'M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8', key: '10dyio' }],
		['path', { d: 'M10 19v-3.96 3.15', key: '1irgej' }],
		['path', { d: 'M7 19h5', key: 'qswx4l' }],
		['rect', { width: '6', height: '10', x: '16', y: '12', rx: '2', key: '1egngj' }],
	],
	uL = [
		['path', { d: 'M5.5 20H8', key: '1k40s5' }],
		['path', { d: 'M17 9h.01', key: '1j24nn' }],
		['rect', { width: '10', height: '16', x: '12', y: '4', rx: '2', key: 'ixliua' }],
		['path', { d: 'M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4', key: '1mp6e1' }],
		['circle', { cx: '17', cy: '15', r: '1', key: 'tqvash' }],
	],
	hL = [
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
		['rect', { x: '2', y: '3', width: '20', height: '14', rx: '2', key: 'x3v2xh' }],
		['rect', { x: '9', y: '7', width: '6', height: '6', rx: '1', key: '5m2oou' }],
	],
	pL = [
		['path', { d: 'm9 10 3-3 3 3', key: '11gsxs' }],
		['path', { d: 'M12 13V7', key: 'h0r20n' }],
		['rect', { width: '20', height: '14', x: '2', y: '3', rx: '2', key: '48i651' }],
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
	],
	yL = [
		['path', { d: 'm14.5 12.5-5-5', key: '1jahn5' }],
		['path', { d: 'm9.5 12.5 5-5', key: '1k2t7b' }],
		['rect', { width: '20', height: '14', x: '2', y: '3', rx: '2', key: '48i651' }],
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
	],
	fL = [
		['rect', { width: '20', height: '14', x: '2', y: '3', rx: '2', key: '48i651' }],
		['line', { x1: '8', x2: '16', y1: '21', y2: '21', key: '1svkeh' }],
		['line', { x1: '12', x2: '12', y1: '17', y2: '21', key: 'vw1qmm' }],
	],
	kL = [
		['path', { d: 'M18 5h4', key: '1lhgn2' }],
		['path', { d: 'M20 3v4', key: '1olli1' }],
		[
			'path',
			{
				d: 'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401',
				key: 'kfwtm',
			},
		],
	],
	gL = [
		[
			'path',
			{
				d: 'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401',
				key: 'kfwtm',
			},
		],
	],
	mL = [
		['path', { d: 'm18 14-1-3', key: 'bdajw9' }],
		['path', { d: 'm3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81', key: 'f5fotj' }],
		['path', { d: 'M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5', key: '3i90e2' }],
		['circle', { cx: '19', cy: '17', r: '3', key: '1otbdv' }],
		['circle', { cx: '5', cy: '17', r: '3', key: '1d8p0c' }],
	],
	ML = [
		['path', { d: 'm8 3 4 8 5-5 5 15H2L8 3z', key: 'otkl63' }],
		['path', { d: 'M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19', key: '1pvmmp' }],
	],
	vL = [['path', { d: 'm8 3 4 8 5-5 5 15H2L8 3z', key: 'otkl63' }]],
	IL = [
		['path', { d: 'M12 6v.343', key: '1gyhex' }],
		['path', { d: 'M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218', key: 'ukzz01' }],
		['path', { d: 'M19 13.343V9A7 7 0 0 0 8.56 2.902', key: '104jy9' }],
		['path', { d: 'M22 22 2 2', key: '1r8tn9' }],
	],
	xL = [
		[
			'path',
			{
				d: 'm15.55 8.45 5.138 2.087a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063L8.45 15.551',
				key: '1qoshx',
			},
		],
		['path', { d: 'M22 2 2 22', key: 'y4kqgn' }],
		['path', { d: 'm6.816 11.528-2.779-6.84a.495.495 0 0 1 .651-.651l6.84 2.779', key: 'mymuvk' }],
	],
	wL = [
		[
			'path',
			{
				d: 'M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z',
				key: 'edeuup',
			},
		],
	],
	CL = [
		[
			'path',
			{
				d: 'M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z',
				key: '11pp1i',
			},
		],
		['circle', { cx: '16', cy: '16', r: '6', key: 'qoo3c4' }],
		['path', { d: 'm11.8 11.8 8.4 8.4', key: 'oogvdj' }],
	],
	LL = [
		['path', { d: 'M14 4.1 12 6', key: 'ita8i4' }],
		['path', { d: 'm5.1 8-2.9-.8', key: '1go3kf' }],
		['path', { d: 'm6 12-1.9 2', key: 'mnht97' }],
		['path', { d: 'M7.2 2.2 8 5.1', key: '1cfko1' }],
		[
			'path',
			{
				d: 'M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z',
				key: 's0h3yz',
			},
		],
	],
	bL = [
		['path', { d: 'M12.586 12.586 19 19', key: 'ea5xo7' }],
		[
			'path',
			{
				d: 'M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z',
				key: '277e5u',
			},
		],
	],
	SL = [
		['rect', { x: '5', y: '2', width: '14', height: '20', rx: '7', key: '11ol66' }],
		['path', { d: 'M12 6v4', key: '16clxf' }],
	],
	DL = [
		['path', { d: 'M5 3v16h16', key: '1mqmf9' }],
		['path', { d: 'm5 19 6-6', key: 'jh6hbb' }],
		['path', { d: 'm2 6 3-3 3 3', key: 'tkyvxa' }],
		['path', { d: 'm18 16 3 3-3 3', key: '1d4glt' }],
	],
	AL = [
		['path', { d: 'M19 13v6h-6', key: '1hxl6d' }],
		['path', { d: 'M5 11V5h6', key: '12e2xe' }],
		['path', { d: 'm5 5 14 14', key: '11anup' }],
	],
	EL = [
		['path', { d: 'M11 19H5v-6', key: '8awifj' }],
		['path', { d: 'M13 5h6v6', key: '7voy1q' }],
		['path', { d: 'M19 5 5 19', key: 'wwaj1z' }],
	],
	TL = [
		['path', { d: 'M11 19H5V13', key: '1akmht' }],
		['path', { d: 'M19 5L5 19', key: '72u4yj' }],
	],
	PL = [
		['path', { d: 'M19 13V19H13', key: '10vkzq' }],
		['path', { d: 'M5 5L19 19', key: '5zm2fv' }],
	],
	RL = [
		['path', { d: 'M8 18L12 22L16 18', key: 'cskvfv' }],
		['path', { d: 'M12 2V22', key: 'r89rzk' }],
	],
	NL = [
		['path', { d: 'm18 8 4 4-4 4', key: '1ak13k' }],
		['path', { d: 'M2 12h20', key: '9i4pu4' }],
		['path', { d: 'm6 8-4 4 4 4', key: '15zrgr' }],
	],
	_L = [
		['path', { d: 'M6 8L2 12L6 16', key: 'kyvwex' }],
		['path', { d: 'M2 12H22', key: '1m8cig' }],
	],
	HL = [
		['path', { d: 'M18 8L22 12L18 16', key: '1r0oui' }],
		['path', { d: 'M2 12H22', key: '1m8cig' }],
	],
	OL = [
		['path', { d: 'M5 11V5H11', key: '3q78g9' }],
		['path', { d: 'M5 5L19 19', key: '5zm2fv' }],
	],
	FL = [
		['path', { d: 'M13 5H19V11', key: '1n1gyv' }],
		['path', { d: 'M19 5L5 19', key: '72u4yj' }],
	],
	jL = [
		['path', { d: 'M8 6L12 2L16 6', key: '1yvkyx' }],
		['path', { d: 'M12 2V22', key: 'r89rzk' }],
	],
	qL = [
		['path', { d: 'M12 2v20', key: 't6zp3m' }],
		['path', { d: 'm8 18 4 4 4-4', key: 'bh5tu3' }],
		['path', { d: 'm8 6 4-4 4 4', key: 'ybng9g' }],
	],
	VL = [
		['path', { d: 'M12 2v20', key: 't6zp3m' }],
		['path', { d: 'm15 19-3 3-3-3', key: '11eu04' }],
		['path', { d: 'm19 9 3 3-3 3', key: '1mg7y2' }],
		['path', { d: 'M2 12h20', key: '9i4pu4' }],
		['path', { d: 'm5 9-3 3 3 3', key: 'j64kie' }],
		['path', { d: 'm9 5 3-3 3 3', key: 'l8vdw6' }],
	],
	zL = [
		['circle', { cx: '12', cy: '18', r: '4', key: 'm3r9ws' }],
		['path', { d: 'M16 18V2', key: '40x2m5' }],
	],
	BL = [
		['circle', { cx: '8', cy: '18', r: '4', key: '1fc0mg' }],
		['path', { d: 'M12 18V2l7 4', key: 'g04rme' }],
	],
	UL = [
		['path', { d: 'M9 18V5l12-2v13', key: '1jmyc2' }],
		['path', { d: 'm9 9 12-2', key: '1e64n2' }],
		['circle', { cx: '6', cy: '18', r: '3', key: 'fqmcym' }],
		['circle', { cx: '18', cy: '16', r: '3', key: '1hluhg' }],
	],
	GL = [
		['path', { d: 'M9 18V5l12-2v13', key: '1jmyc2' }],
		['circle', { cx: '6', cy: '18', r: '3', key: 'fqmcym' }],
		['circle', { cx: '18', cy: '16', r: '3', key: '1hluhg' }],
	],
	WL = [
		['path', { d: 'M9.31 9.31 5 21l7-4 7 4-1.17-3.17', key: 'qoq2o2' }],
		['path', { d: 'M14.53 8.88 12 2l-1.17 3.17', key: 'k3sjzy' }],
		['line', { x1: '2', x2: '22', y1: '2', y2: '22', key: 'a6p6uj' }],
	],
	$L = [['polygon', { points: '12 2 19 21 12 17 5 21 12 2', key: 'x8c0qg' }]],
	ZL = [
		['path', { d: 'M8.43 8.43 3 11l8 2 2 8 2.57-5.43', key: '1vdtb7' }],
		['path', { d: 'M17.39 11.73 22 2l-9.73 4.61', key: 'tya3r6' }],
		['line', { x1: '2', x2: '22', y1: '2', y2: '22', key: 'a6p6uj' }],
	],
	QL = [['polygon', { points: '3 11 22 2 13 21 11 13 3 11', key: '1ltx0t' }]],
	XL = [
		['rect', { x: '16', y: '16', width: '6', height: '6', rx: '1', key: '4q2zg0' }],
		['rect', { x: '2', y: '16', width: '6', height: '6', rx: '1', key: '8cvhb9' }],
		['rect', { x: '9', y: '2', width: '6', height: '6', rx: '1', key: '1egb70' }],
		['path', { d: 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', key: '1jsf9p' }],
		['path', { d: 'M12 12V8', key: '2874zd' }],
	],
	KL = [
		['path', { d: 'M15 18h-5', key: '95g1m2' }],
		['path', { d: 'M18 14h-8', key: 'sponae' }],
		[
			'path',
			{
				d: 'M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2',
				key: '39pd36',
			},
		],
		['rect', { width: '8', height: '4', x: '10', y: '6', rx: '1', key: 'aywv1n' }],
	],
	YL = [
		['path', { d: 'M6 8.32a7.43 7.43 0 0 1 0 7.36', key: '9iaqei' }],
		['path', { d: 'M9.46 6.21a11.76 11.76 0 0 1 0 11.58', key: '1yha7l' }],
		['path', { d: 'M12.91 4.1a15.91 15.91 0 0 1 .01 15.8', key: '4iu2gk' }],
		['path', { d: 'M16.37 2a20.16 20.16 0 0 1 0 20', key: 'sap9u2' }],
	],
	JL = [
		['path', { d: 'M12 2v10', key: 'mnfbl' }],
		['path', { d: 'm8.5 4 7 4', key: 'm1xjk3' }],
		['path', { d: 'm8.5 8 7-4', key: 't0m5j6' }],
		['circle', { cx: '12', cy: '17', r: '5', key: 'qbz8iq' }],
	],
	eb = [
		['path', { d: 'M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4', key: 're6nr2' }],
		['path', { d: 'M2 6h4', key: 'aawbzj' }],
		['path', { d: 'M2 10h4', key: 'l0bgd4' }],
		['path', { d: 'M2 14h4', key: '1gsvsf' }],
		['path', { d: 'M2 18h4', key: '1bu2t1' }],
		[
			'path',
			{
				d: 'M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
				key: 'pqwjuv',
			},
		],
	],
	tb = [
		['path', { d: 'M2 6h4', key: 'aawbzj' }],
		['path', { d: 'M2 10h4', key: 'l0bgd4' }],
		['path', { d: 'M2 14h4', key: '1gsvsf' }],
		['path', { d: 'M2 18h4', key: '1bu2t1' }],
		['rect', { width: '16', height: '20', x: '4', y: '2', rx: '2', key: '1nb95v' }],
		['path', { d: 'M15 2v20', key: 'dcj49h' }],
		['path', { d: 'M15 7h5', key: '1xj5lc' }],
		['path', { d: 'M15 12h5', key: 'w5shd9' }],
		['path', { d: 'M15 17h5', key: '1qaofu' }],
	],
	nb = [
		['path', { d: 'M2 6h4', key: 'aawbzj' }],
		['path', { d: 'M2 10h4', key: 'l0bgd4' }],
		['path', { d: 'M2 14h4', key: '1gsvsf' }],
		['path', { d: 'M2 18h4', key: '1bu2t1' }],
		['rect', { width: '16', height: '20', x: '4', y: '2', rx: '2', key: '1nb95v' }],
		['path', { d: 'M9.5 8h5', key: '11mslq' }],
		['path', { d: 'M9.5 12H16', key: 'ktog6x' }],
		['path', { d: 'M9.5 16H14', key: 'p1seyn' }],
	],
	ab = [
		['path', { d: 'M2 6h4', key: 'aawbzj' }],
		['path', { d: 'M2 10h4', key: 'l0bgd4' }],
		['path', { d: 'M2 14h4', key: '1gsvsf' }],
		['path', { d: 'M2 18h4', key: '1bu2t1' }],
		['rect', { width: '16', height: '20', x: '4', y: '2', rx: '2', key: '1nb95v' }],
		['path', { d: 'M16 2v20', key: 'rotuqe' }],
	],
	ob = [
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['path', { d: 'M12 2v4', key: '3427ic' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['path', { d: 'M16 4h2a2 2 0 0 1 2 2v2', key: 'j91f56' }],
		['path', { d: 'M20 12v2', key: 'w8o0tu' }],
		['path', { d: 'M20 18v2a2 2 0 0 1-2 2h-1', key: '1c9ggx' }],
		['path', { d: 'M13 22h-2', key: '191ugt' }],
		['path', { d: 'M7 22H6a2 2 0 0 1-2-2v-2', key: '1rt9px' }],
		['path', { d: 'M4 14v-2', key: '1v0sqh' }],
		['path', { d: 'M4 8V6a2 2 0 0 1 2-2h2', key: '1mwabg' }],
		['path', { d: 'M8 10h6', key: '3oa6kw' }],
		['path', { d: 'M8 14h8', key: '1fgep2' }],
		['path', { d: 'M8 18h5', key: '17enja' }],
	],
	rb = [
		['path', { d: 'M8 2v4', key: '1cmpym' }],
		['path', { d: 'M12 2v4', key: '3427ic' }],
		['path', { d: 'M16 2v4', key: '4m81vk' }],
		['rect', { width: '16', height: '18', x: '4', y: '4', rx: '2', key: '1u9h20' }],
		['path', { d: 'M8 10h6', key: '3oa6kw' }],
		['path', { d: 'M8 14h8', key: '1fgep2' }],
		['path', { d: 'M8 18h5', key: '17enja' }],
	],
	ib = [
		['path', { d: 'M12 4V2', key: '1k5q1u' }],
		[
			'path',
			{
				d: 'M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939',
				key: '1xcvy9',
			},
		],
		['path', { d: 'M19 10v3.343', key: '163tfc' }],
		[
			'path',
			{
				d: 'M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192',
				key: '17914v',
			},
		],
		['line', { x1: '2', x2: '22', y1: '2', y2: '22', key: 'a6p6uj' }],
	],
	sb = [
		['path', { d: 'M12 4V2', key: '1k5q1u' }],
		[
			'path',
			{
				d: 'M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4',
				key: '1tgyif',
			},
		],
		[
			'path',
			{
				d: 'M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z',
				key: 'tnsqj',
			},
		],
	],
	cb = [
		['path', { d: 'M12 16h.01', key: '1drbdi' }],
		['path', { d: 'M12 8v4', key: '1got3b' }],
		[
			'path',
			{
				d: 'M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z',
				key: '1fd625',
			},
		],
	],
	db = [
		[
			'path',
			{
				d: 'M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z',
				key: '2d38gg',
			},
		],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
	],
	lb = [
		['path', { d: 'M10 15V9', key: '1lckn7' }],
		['path', { d: 'M14 15V9', key: '1muqhk' }],
		[
			'path',
			{
				d: 'M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z',
				key: '2d38gg',
			},
		],
	],
	ub = [
		['path', { d: 'm15 9-6 6', key: '1uzhvr' }],
		[
			'path',
			{
				d: 'M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z',
				key: '2d38gg',
			},
		],
		['path', { d: 'm9 9 6 6', key: 'z0biqf' }],
	],
	hb = [
		[
			'path',
			{
				d: 'M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z',
				key: '2d38gg',
			},
		],
	],
	pb = [
		[
			'path',
			{
				d: 'M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21',
				key: '1x94xo',
			},
		],
	],
	yb = [
		['path', { d: 'M3 3h6l6 18h6', key: 'ph9rgk' }],
		['path', { d: 'M14 3h7', key: '16f0ms' }],
	],
	fb = [
		['path', { d: 'M20.341 6.484A10 10 0 0 1 10.266 21.85', key: '1enhxb' }],
		['path', { d: 'M3.659 17.516A10 10 0 0 1 13.74 2.152', key: '1crzgf' }],
		['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
		['circle', { cx: '19', cy: '5', r: '2', key: 'mhkx31' }],
		['circle', { cx: '5', cy: '19', r: '2', key: 'v8kfzx' }],
	],
	kb = [
		['path', { d: 'M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025', key: '1bx4vc' }],
		[
			'path',
			{ d: 'm12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009', key: '1h3km6' },
		],
		[
			'path',
			{
				d: 'm12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027',
				key: '1hj4wg',
			},
		],
	],
	gb = [
		['path', { d: 'M12 3v6', key: '1holv5' }],
		[
			'path',
			{
				d: 'M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z',
				key: '187q7i',
			},
		],
		['path', { d: 'M3.054 9.013h17.893', key: 'grwhos' }],
	],
	mb = [
		['path', { d: 'm16 16 2 2 4-4', key: 'gfu2re' }],
		[
			'path',
			{
				d: 'M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14',
				key: 'e7tb2h',
			},
		],
		['path', { d: 'm7.5 4.27 9 5.15', key: '1c824w' }],
		['polyline', { points: '3.29 7 12 12 20.71 7', key: 'ousv84' }],
		['line', { x1: '12', x2: '12', y1: '22', y2: '12', key: 'a4e8g8' }],
	],
	Mb = [
		['path', { d: 'M16 16h6', key: '100bgy' }],
		[
			'path',
			{
				d: 'M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14',
				key: 'e7tb2h',
			},
		],
		['path', { d: 'm7.5 4.27 9 5.15', key: '1c824w' }],
		['polyline', { points: '3.29 7 12 12 20.71 7', key: 'ousv84' }],
		['line', { x1: '12', x2: '12', y1: '22', y2: '12', key: 'a4e8g8' }],
	],
	vb = [
		['path', { d: 'M12 22v-9', key: 'x3hkom' }],
		[
			'path',
			{
				d: 'M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z',
				key: '2ntwy6',
			},
		],
		[
			'path',
			{
				d: 'M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13',
				key: '1pmm1c',
			},
		],
		[
			'path',
			{
				d: 'M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z',
				key: '12ttoo',
			},
		],
	],
	Ib = [
		['path', { d: 'M16 16h6', key: '100bgy' }],
		['path', { d: 'M19 13v6', key: '85cyf1' }],
		[
			'path',
			{
				d: 'M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14',
				key: 'e7tb2h',
			},
		],
		['path', { d: 'm7.5 4.27 9 5.15', key: '1c824w' }],
		['polyline', { points: '3.29 7 12 12 20.71 7', key: 'ousv84' }],
		['line', { x1: '12', x2: '12', y1: '22', y2: '12', key: 'a4e8g8' }],
	],
	xb = [
		[
			'path',
			{
				d: 'M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14',
				key: 'e7tb2h',
			},
		],
		['path', { d: 'm7.5 4.27 9 5.15', key: '1c824w' }],
		['polyline', { points: '3.29 7 12 12 20.71 7', key: 'ousv84' }],
		['line', { x1: '12', x2: '12', y1: '22', y2: '12', key: 'a4e8g8' }],
		['circle', { cx: '18.5', cy: '15.5', r: '2.5', key: 'b5zd12' }],
		['path', { d: 'M20.27 17.27 22 19', key: '1l4muz' }],
	],
	wb = [
		[
			'path',
			{
				d: 'M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14',
				key: 'e7tb2h',
			},
		],
		['path', { d: 'm7.5 4.27 9 5.15', key: '1c824w' }],
		['polyline', { points: '3.29 7 12 12 20.71 7', key: 'ousv84' }],
		['line', { x1: '12', x2: '12', y1: '22', y2: '12', key: 'a4e8g8' }],
		['path', { d: 'm17 13 5 5m-5 0 5-5', key: 'im3w4b' }],
	],
	Cb = [
		[
			'path',
			{
				d: 'M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z',
				key: '1a0edw',
			},
		],
		['path', { d: 'M12 22V12', key: 'd0xqtd' }],
		['polyline', { points: '3.29 7 12 12 20.71 7', key: 'ousv84' }],
		['path', { d: 'm7.5 4.27 9 5.15', key: '1c824w' }],
	],
	Lb = [
		['path', { d: 'M11 7 6 2', key: '1jwth8' }],
		['path', { d: 'M18.992 12H2.041', key: 'xw1gg' }],
		[
			'path',
			{
				d: 'M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595',
				key: '1nkol4',
			},
		],
		[
			'path',
			{
				d: 'm8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33',
				key: '1nk1rd',
			},
		],
	],
	bb = [
		['rect', { width: '16', height: '6', x: '2', y: '2', rx: '2', key: 'jcyz7m' }],
		['path', { d: 'M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2', key: '1b9h7c' }],
		['rect', { width: '4', height: '6', x: '8', y: '16', rx: '1', key: 'd6e7yl' }],
	],
	Sb = [
		['path', { d: 'M10 2v2', key: '7u0qdc' }],
		['path', { d: 'M14 2v4', key: 'qmzblu' }],
		['path', { d: 'M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z', key: 'ycvu00' }],
		[
			'path',
			{
				d: 'M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1',
				key: 'iw4wnp',
			},
		],
	],
	Db = [
		['path', { d: 'm14.622 17.897-10.68-2.913', key: 'vj2p1u' }],
		[
			'path',
			{
				d: 'M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z',
				key: '18tc5c',
			},
		],
		[
			'path',
			{
				d: 'M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15',
				key: 'ytzfxy',
			},
		],
	],
	Ab = [
		[
			'path',
			{
				d: 'M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z',
				key: 'e79jfc',
			},
		],
		['circle', { cx: '13.5', cy: '6.5', r: '.5', fill: 'currentColor', key: '1okk4w' }],
		['circle', { cx: '17.5', cy: '10.5', r: '.5', fill: 'currentColor', key: 'f64h9f' }],
		['circle', { cx: '6.5', cy: '12.5', r: '.5', fill: 'currentColor', key: 'qy21gx' }],
		['circle', { cx: '8.5', cy: '7.5', r: '.5', fill: 'currentColor', key: 'fotxhn' }],
	],
	Eb = [
		['path', { d: 'M11.25 17.25h1.5L12 18z', key: '1wmwwj' }],
		['path', { d: 'm15 12 2 2', key: 'k60wz4' }],
		['path', { d: 'M18 6.5a.5.5 0 0 0-.5-.5', key: '1ch4h4' }],
		[
			'path',
			{
				d: 'M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83',
				key: '1c660l',
			},
		],
		['path', { d: 'M6 6.5a.495.495 0 0 1 .5-.5', key: 'eviuep' }],
		['path', { d: 'm9 12-2 2', key: '326nkw' }],
	],
	Tb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M3 15h18', key: '5xshup' }],
		['path', { d: 'm15 8-3 3-3-3', key: '1oxy1z' }],
	],
	Pb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M14 15h1', key: '171nev' }],
		['path', { d: 'M19 15h2', key: '1vnucp' }],
		['path', { d: 'M3 15h2', key: '8bym0q' }],
		['path', { d: 'M9 15h1', key: '1tg3ks' }],
	],
	Rb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M3 15h18', key: '5xshup' }],
		['path', { d: 'm9 10 3-3 3 3', key: '11gsxs' }],
	],
	Nb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M9 3v18', key: 'fh3hqa' }],
		['path', { d: 'm16 15-3-3 3-3', key: '14y99z' }],
	],
	_b = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M3 15h18', key: '5xshup' }],
	],
	Hb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M9 14v1', key: 'askpd8' }],
		['path', { d: 'M9 19v2', key: '16tejx' }],
		['path', { d: 'M9 3v2', key: '1noubl' }],
		['path', { d: 'M9 9v1', key: '19ebxg' }],
	],
	Ob = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M9 3v18', key: 'fh3hqa' }],
		['path', { d: 'm14 9 3 3-3 3', key: '8010ee' }],
	],
	Fb = [
		['path', { d: 'M15 10V9', key: '4dkmfx' }],
		['path', { d: 'M15 15v-1', key: '6a4afx' }],
		['path', { d: 'M15 21v-2', key: '1qshmc' }],
		['path', { d: 'M15 5V3', key: '1fk0mb' }],
		['path', { d: 'M9 10V9', key: '1lazqi' }],
		['path', { d: 'M9 15v-1', key: '9lx740' }],
		['path', { d: 'M9 21v-2', key: '1fwk0n' }],
		['path', { d: 'M9 5V3', key: '2q8zi6' }],
		['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', key: 'h1oib' }],
	],
	jb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M9 3v18', key: 'fh3hqa' }],
	],
	qb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M15 3v18', key: '14nvp0' }],
		['path', { d: 'm8 9 3 3-3 3', key: '12hl5m' }],
	],
	Vb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M15 14v1', key: 'ilsfch' }],
		['path', { d: 'M15 19v2', key: '1fst2f' }],
		['path', { d: 'M15 3v2', key: 'z204g4' }],
		['path', { d: 'M15 9v1', key: 'z2a8b1' }],
	],
	zb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M15 3v18', key: '14nvp0' }],
		['path', { d: 'm10 15-3-3 3-3', key: '1pgupc' }],
	],
	Bb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M15 3v18', key: '14nvp0' }],
	],
	Ub = [
		['path', { d: 'M14 15h1', key: '171nev' }],
		['path', { d: 'M14 9h1', key: 'l0svgy' }],
		['path', { d: 'M19 15h2', key: '1vnucp' }],
		['path', { d: 'M19 9h2', key: 'te2zfg' }],
		['path', { d: 'M3 15h2', key: '8bym0q' }],
		['path', { d: 'M3 9h2', key: '1h4ldw' }],
		['path', { d: 'M9 15h1', key: '1tg3ks' }],
		['path', { d: 'M9 9h1', key: '15jzuz' }],
		['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', key: 'h1oib' }],
	],
	Gb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M3 9h18', key: '1pudct' }],
		['path', { d: 'm9 16 3-3 3 3', key: '1idcnm' }],
	],
	Wb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M14 9h1', key: 'l0svgy' }],
		['path', { d: 'M19 9h2', key: 'te2zfg' }],
		['path', { d: 'M3 9h2', key: '1h4ldw' }],
		['path', { d: 'M9 9h1', key: '15jzuz' }],
	],
	$b = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M3 9h18', key: '1pudct' }],
		['path', { d: 'm15 14-3 3-3-3', key: 'g215vf' }],
	],
	Zb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M3 9h18', key: '1pudct' }],
	],
	Qb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M9 3v18', key: 'fh3hqa' }],
		['path', { d: 'M9 15h12', key: '5ijen5' }],
	],
	Xb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M3 15h12', key: '1wkqb3' }],
		['path', { d: 'M15 3v18', key: '14nvp0' }],
	],
	Kb = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M3 9h18', key: '1pudct' }],
		['path', { d: 'M9 21V9', key: '1oto5p' }],
	],
	Yb = [
		[
			'path',
			{
				d: 'm16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551',
				key: '1miecu',
			},
		],
	],
	Jb = [
		['path', { d: 'M8 21s-4-3-4-9 4-9 4-9', key: 'uto9ud' }],
		['path', { d: 'M16 3s4 3 4 9-4 9-4 9', key: '4w2vsq' }],
	],
	eS = [
		['path', { d: 'M11 15h2', key: '199qp6' }],
		['path', { d: 'M12 12v3', key: '158kv8' }],
		['path', { d: 'M12 19v3', key: 'npa21l' }],
		[
			'path',
			{
				d: 'M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z',
				key: '1jofit',
			},
		],
		['path', { d: 'M9 9a3 3 0 1 1 6 0', key: 'jdoeu8' }],
	],
	tS = [
		['path', { d: 'M5.8 11.3 2 22l10.7-3.79', key: 'gwxi1d' }],
		['path', { d: 'M4 3h.01', key: '1vcuye' }],
		['path', { d: 'M22 8h.01', key: '1mrtc2' }],
		['path', { d: 'M15 2h.01', key: '1cjtqr' }],
		['path', { d: 'M22 20h.01', key: '1mrys2' }],
		[
			'path',
			{
				d: 'm22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10',
				key: 'hbicv8',
			},
		],
		['path', { d: 'm22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17', key: '1i94pl' }],
		['path', { d: 'm11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7', key: '1cofks' }],
		[
			'path',
			{
				d: 'M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z',
				key: '4kbmks',
			},
		],
	],
	nS = [
		['rect', { x: '14', y: '3', width: '5', height: '18', rx: '1', key: 'kaeet6' }],
		['rect', { x: '5', y: '3', width: '5', height: '18', rx: '1', key: '1wsw3u' }],
	],
	aS = [
		['circle', { cx: '11', cy: '4', r: '2', key: 'vol9p0' }],
		['circle', { cx: '18', cy: '8', r: '2', key: '17gozi' }],
		['circle', { cx: '20', cy: '16', r: '2', key: '1v9bxh' }],
		[
			'path',
			{
				d: 'M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z',
				key: '1ydw1z',
			},
		],
	],
	oS = [
		['rect', { width: '14', height: '20', x: '5', y: '2', rx: '2', key: '1uq1d7' }],
		['path', { d: 'M15 14h.01', key: '1kp3bh' }],
		['path', { d: 'M9 6h6', key: 'dgm16u' }],
		['path', { d: 'M9 10h6', key: '9gxzsh' }],
	],
	rS = [
		['path', { d: 'M13 21h8', key: '1jsn5i' }],
		[
			'path',
			{
				d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
				key: '1a8usu',
			},
		],
	],
	iS = [
		[
			'path',
			{
				d: 'm10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982',
				key: 'bjo8r8',
			},
		],
		['path', { d: 'm12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353', key: '16h5ne' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	sS = [
		[
			'path',
			{
				d: 'M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z',
				key: 'nt11vn',
			},
		],
		[
			'path',
			{
				d: 'm18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18',
				key: '15qc1e',
			},
		],
		['path', { d: 'm2.3 2.3 7.286 7.286', key: '1wuzzi' }],
		['circle', { cx: '11', cy: '11', r: '2', key: 'xmgehs' }],
	],
	cS = [
		[
			'path',
			{
				d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
				key: '1a8usu',
			},
		],
	],
	dS = [
		[
			'path',
			{
				d: 'm10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982',
				key: 'bjo8r8',
			},
		],
		['path', { d: 'm12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353', key: '16h5ne' }],
		['path', { d: 'm15 5 4 4', key: '1mk7zo' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	lS = [
		['path', { d: 'M13 21h8', key: '1jsn5i' }],
		['path', { d: 'm15 5 4 4', key: '1mk7zo' }],
		[
			'path',
			{
				d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
				key: '1a8usu',
			},
		],
	],
	uS = [
		[
			'path',
			{
				d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
				key: '1a8usu',
			},
		],
		['path', { d: 'm15 5 4 4', key: '1mk7zo' }],
	],
	hS = [
		['path', { d: 'M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13', key: 'orapub' }],
		['path', { d: 'm8 6 2-2', key: '115y1s' }],
		['path', { d: 'm18 16 2-2', key: 'ee94s4' }],
		['path', { d: 'm17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17', key: 'cfq27r' }],
		[
			'path',
			{
				d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
				key: '1a8usu',
			},
		],
		['path', { d: 'm15 5 4 4', key: '1mk7zo' }],
	],
	pS = [
		[
			'path',
			{
				d: 'M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z',
				key: '2hea0t',
			},
		],
	],
	yS = [
		['line', { x1: '19', x2: '5', y1: '5', y2: '19', key: '1x9vlm' }],
		['circle', { cx: '6.5', cy: '6.5', r: '2.5', key: '4mh3h7' }],
		['circle', { cx: '17.5', cy: '17.5', r: '2.5', key: '1mdrzq' }],
	],
	fS = [
		['circle', { cx: '12', cy: '5', r: '1', key: 'gxeob9' }],
		['path', { d: 'm9 20 3-6 3 6', key: 'se2kox' }],
		['path', { d: 'm6 8 6 2 6-2', key: '4o3us4' }],
		['path', { d: 'M12 10v4', key: '1kjpxc' }],
	],
	kS = [
		['path', { d: 'M20 11H4', key: '6ut86h' }],
		['path', { d: 'M20 7H4', key: 'zbl0bi' }],
		['path', { d: 'M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7', key: '1ana5r' }],
	],
	gS = [
		['path', { d: 'M13 2a9 9 0 0 1 9 9', key: '1itnx2' }],
		['path', { d: 'M13 6a5 5 0 0 1 5 5', key: '11nki7' }],
		[
			'path',
			{
				d: 'M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384',
				key: '9njp5v',
			},
		],
	],
	mS = [
		['path', { d: 'M14 6h8', key: 'yd68k4' }],
		['path', { d: 'm18 2 4 4-4 4', key: 'pucp1d' }],
		[
			'path',
			{
				d: 'M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384',
				key: '9njp5v',
			},
		],
	],
	MS = [
		['path', { d: 'M16 2v6h6', key: '1mfrl5' }],
		['path', { d: 'm22 2-6 6', key: '6f0sa0' }],
		[
			'path',
			{
				d: 'M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384',
				key: '9njp5v',
			},
		],
	],
	vS = [
		['path', { d: 'm16 2 6 6', key: '1gw87d' }],
		['path', { d: 'm22 2-6 6', key: '6f0sa0' }],
		[
			'path',
			{
				d: 'M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384',
				key: '9njp5v',
			},
		],
	],
	IS = [
		['path', { d: 'm16 8 6-6', key: 'oawc05' }],
		['path', { d: 'M22 8V2h-6', key: 'oqy2zc' }],
		[
			'path',
			{
				d: 'M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384',
				key: '9njp5v',
			},
		],
	],
	xS = [
		[
			'path',
			{
				d: 'M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384',
				key: '9njp5v',
			},
		],
	],
	wS = [
		[
			'path',
			{
				d: 'M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272',
				key: '1wngk7',
			},
		],
		['path', { d: 'M22 2 2 22', key: 'y4kqgn' }],
		[
			'path',
			{
				d: 'M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473',
				key: '10hv5p',
			},
		],
	],
	CS = [
		[
			'path',
			{
				d: 'M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8',
				key: 'lag0yf',
			},
		],
		['path', { d: 'M2 14h20', key: 'myj16y' }],
		['path', { d: 'M6 14v4', key: '9ng0ue' }],
		['path', { d: 'M10 14v4', key: '1v8uk5' }],
		['path', { d: 'M14 14v4', key: '1tqops' }],
		['path', { d: 'M18 14v4', key: '18uqwm' }],
	],
	LS = [
		['path', { d: 'm14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999', key: '1lw9ds' }],
		[
			'path',
			{
				d: 'M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024',
				key: 'ffj4ej',
			},
		],
		[
			'path',
			{
				d: 'M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069',
				key: '8tj4zw',
			},
		],
		[
			'path',
			{
				d: 'M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z',
				key: 'hh6h97',
			},
		],
	],
	bS = [
		['path', { d: 'M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4', key: 'daa4of' }],
		['rect', { width: '10', height: '7', x: '12', y: '13', rx: '2', key: '1nb8gs' }],
	],
	SS = [
		['line', { x1: '9', x2: '9', y1: '4', y2: '20', key: 'ovs5a5' }],
		['path', { d: 'M4 7c0-1.7 1.3-3 3-3h13', key: '10pag4' }],
		['path', { d: 'M18 20c-1.7 0-3-1.3-3-3V4', key: '1gaosr' }],
	],
	DS = [
		['path', { d: 'M2 10h6V4', key: 'zwrco' }],
		['path', { d: 'm2 4 6 6', key: 'ug085t' }],
		['path', { d: 'M21 10V7a2 2 0 0 0-2-2h-7', key: 'git5jr' }],
		['path', { d: 'M3 14v2a2 2 0 0 0 2 2h3', key: '1f7fh3' }],
		['rect', { x: '12', y: '14', width: '10', height: '7', rx: '1', key: '1wjs3o' }],
	],
	AS = [
		[
			'path',
			{
				d: 'M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z',
				key: '1piglc',
			},
		],
		['path', { d: 'M16 10h.01', key: '1m94wz' }],
		['path', { d: 'M2 8v1a2 2 0 0 0 2 2h1', key: '1env43' }],
	],
	ES = [
		['path', { d: 'M14 3v11', key: 'mlfb7b' }],
		['path', { d: 'M14 9h-3a3 3 0 0 1 0-6h9', key: '1ulc19' }],
		['path', { d: 'M18 3v11', key: '1phi0r' }],
		['path', { d: 'M22 18H2l4-4', key: 'yt65j9' }],
		['path', { d: 'm6 22-4-4', key: '6jgyf5' }],
	],
	TS = [
		['path', { d: 'M10 3v11', key: 'o3l5kj' }],
		['path', { d: 'M10 9H7a1 1 0 0 1 0-6h8', key: '1wb1nc' }],
		['path', { d: 'M14 3v11', key: 'mlfb7b' }],
		['path', { d: 'm18 14 4 4H2', key: '4r8io1' }],
		['path', { d: 'm22 18-4 4', key: '1hjjrd' }],
	],
	PS = [
		['path', { d: 'M13 4v16', key: '8vvj80' }],
		['path', { d: 'M17 4v16', key: '7dpous' }],
		['path', { d: 'M19 4H9.5a4.5 4.5 0 0 0 0 9H13', key: 'sh4n9v' }],
	],
	RS = [
		['path', { d: 'M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4', key: '17ldeb' }],
		['path', { d: 'M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7', key: 'nc37y6' }],
		['rect', { width: '16', height: '5', x: '4', y: '2', rx: '1', key: '3jeezo' }],
	],
	NS = [
		['path', { d: 'm10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z', key: 'wa1lgi' }],
		['path', { d: 'm8.5 8.5 7 7', key: 'rvfmvr' }],
	],
	_S = [
		['path', { d: 'M12 17v5', key: 'bb1du9' }],
		['path', { d: 'M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89', key: 'znwnzq' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11', key: 'c9qhm2' }],
	],
	HS = [
		['path', { d: 'M12 17v5', key: 'bb1du9' }],
		[
			'path',
			{
				d: 'M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z',
				key: '1nkz8b',
			},
		],
	],
	OS = [
		[
			'path',
			{
				d: 'm12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12',
				key: '1y3wsu',
			},
		],
		['path', { d: 'm18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z', key: '110lr1' }],
		['path', { d: 'm2 22 .414-.414', key: 'jhxm08' }],
	],
	FS = [
		['path', { d: 'm12 14-1 1', key: '11onhr' }],
		['path', { d: 'm13.75 18.25-1.25 1.42', key: '1yisr3' }],
		['path', { d: 'M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12', key: '1qtqk6' }],
		['path', { d: 'M18.8 9.3a1 1 0 0 0 2.1 7.7', key: 'fbbbr2' }],
		[
			'path',
			{
				d: 'M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z',
				key: '1hyfdd',
			},
		],
	],
	jS = [
		['path', { d: 'M2 22h20', key: '272qi7' }],
		[
			'path',
			{
				d: 'M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z',
				key: '1ma21e',
			},
		],
	],
	qS = [
		['path', { d: 'M2 22h20', key: '272qi7' }],
		[
			'path',
			{
				d: 'M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z',
				key: 'fkigj9',
			},
		],
	],
	VS = [
		[
			'path',
			{
				d: 'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z',
				key: '1v9wt8',
			},
		],
	],
	zS = [
		[
			'path',
			{ d: 'M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z', key: '10ikf1' },
		],
	],
	BS = [
		['path', { d: 'M9 2v6', key: '17ngun' }],
		['path', { d: 'M15 2v6', key: 's7yy2p' }],
		['path', { d: 'M12 17v5', key: 'bb1du9' }],
		['path', { d: 'M5 8h14', key: 'pcz4l3' }],
		['path', { d: 'M6 11V8h12v3a6 6 0 1 1-12 0Z', key: 'wtfw2c' }],
	],
	US = [
		['path', { d: 'M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z', key: 'goz73y' }],
		['path', { d: 'm2 22 3-3', key: '19mgm9' }],
		['path', { d: 'M7.5 13.5 10 11', key: '7xgeeb' }],
		['path', { d: 'M10.5 16.5 13 14', key: '10btkg' }],
		['path', { d: 'm18 3-4 4h6l-4 4', key: '16psg9' }],
	],
	GS = [
		['path', { d: 'M12 22v-5', key: '1ega77' }],
		['path', { d: 'M15 8V2', key: '18g5xt' }],
		['path', { d: 'M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z', key: '1xoxul' }],
		['path', { d: 'M9 8V2', key: '14iosj' }],
	],
	WS = [
		['path', { d: 'M5 12h14', key: '1ays0h' }],
		['path', { d: 'M12 5v14', key: 's699le' }],
	],
	$S = [
		['path', { d: 'M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2', key: '19w3oe' }],
		['path', { d: 'M18 6h.01', key: '1v4wsw' }],
		['path', { d: 'M6 18h.01', key: 'uhywen' }],
		['path', { d: 'M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z', key: '6fykxj' }],
		['path', { d: 'M18 11.66V22a4 4 0 0 0 4-4V6', key: '1utzek' }],
	],
	ZS = [
		['path', { d: 'M20 3a2 2 0 0 1 2 2v6a1 1 0 0 1-20 0V5a2 2 0 0 1 2-2z', key: '1uodqw' }],
		['path', { d: 'm8 10 4 4 4-4', key: '1mxd5q' }],
	],
	QS = [
		['path', { d: 'M13 17a1 1 0 1 0-2 0l.5 4.5a0.5 0.5 0 0 0 1 0z', fill: 'currentColor', key: 'x1mxqr' }],
		['path', { d: 'M16.85 18.58a9 9 0 1 0-9.7 0', key: 'd71mpg' }],
		['path', { d: 'M8 14a5 5 0 1 1 8 0', key: 'fc81rn' }],
		['circle', { cx: '12', cy: '11', r: '1', fill: 'currentColor', key: 'vqiwd' }],
	],
	XS = [
		['path', { d: 'M10 4.5V4a2 2 0 0 0-2.41-1.957', key: 'jsi14n' }],
		['path', { d: 'M13.9 8.4a2 2 0 0 0-1.26-1.295', key: 'hirc7f' }],
		['path', { d: 'M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158', key: '1jxb2e' }],
		[
			'path',
			{
				d: 'm7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343',
				key: '10r7hm',
			},
		],
		['path', { d: 'M6 6v8', key: 'tv5xkp' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	KS = [
		['path', { d: 'M22 14a8 8 0 0 1-8 8', key: '56vcr3' }],
		['path', { d: 'M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2', key: '1agjmk' }],
		['path', { d: 'M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1', key: 'wdbh2u' }],
		['path', { d: 'M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10', key: '1ibuk9' }],
		[
			'path',
			{
				d: 'M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15',
				key: 'g6ys72',
			},
		],
	],
	YS = [
		['path', { d: 'M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4', key: '10td1f' }],
		['path', { d: 'M10 22 9 8', key: 'yjptiv' }],
		['path', { d: 'm14 22 1-14', key: '8jwc8b' }],
		[
			'path',
			{
				d: 'M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z',
				key: '1qo33t',
			},
		],
	],
	JS = [
		[
			'path',
			{
				d: 'M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z',
				key: '1o68ps',
			},
		],
		['path', { d: 'm22 22-5.5-5.5', key: '17o70y' }],
	],
	eD = [
		['path', { d: 'M18 7c0-5.333-8-5.333-8 0', key: '1prm2n' }],
		['path', { d: 'M10 7v14', key: '18tmcs' }],
		['path', { d: 'M6 21h12', key: '4dkmi1' }],
		['path', { d: 'M6 13h10', key: 'ybwr4a' }],
	],
	tD = [
		['path', { d: 'M18.36 6.64A9 9 0 0 1 20.77 15', key: 'dxknvb' }],
		['path', { d: 'M6.16 6.16a9 9 0 1 0 12.68 12.68', key: '1x7qb5' }],
		['path', { d: 'M12 2v4', key: '3427ic' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	nD = [
		['path', { d: 'M12 2v10', key: 'mnfbl' }],
		['path', { d: 'M18.4 6.6a9 9 0 1 1-12.77.04', key: 'obofu9' }],
	],
	aD = [
		['path', { d: 'M2 3h20', key: '91anmk' }],
		['path', { d: 'M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3', key: '2k9sn8' }],
		['path', { d: 'm7 21 5-5 5 5', key: 'bip4we' }],
	],
	oD = [
		['path', { d: 'M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5', key: 'qeb09x' }],
		['path', { d: 'm16 19 2 2 4-4', key: '1b14m6' }],
		['path', { d: 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2', key: '1md90i' }],
		['path', { d: 'M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6', key: '1itne7' }],
	],
	rD = [
		['path', { d: 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2', key: '143wyd' }],
		['path', { d: 'M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6', key: '1itne7' }],
		['rect', { x: '6', y: '14', width: '12', height: '8', rx: '1', key: '1ue0tg' }],
	],
	iD = [
		['path', { d: 'M5 7 3 5', key: '1yys58' }],
		['path', { d: 'M9 6V3', key: '1ptz9u' }],
		['path', { d: 'm13 7 2-2', key: '1w3vmq' }],
		['circle', { cx: '9', cy: '13', r: '3', key: '1mma13' }],
		[
			'path',
			{ d: 'M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17', key: '2frwzc' },
		],
		['path', { d: 'M16 16h2', key: 'dnq2od' }],
	],
	sD = [
		['rect', { width: '20', height: '16', x: '2', y: '4', rx: '2', key: '18n3k1' }],
		['path', { d: 'M12 9v11', key: '1fnkrn' }],
		['path', { d: 'M2 9h13a2 2 0 0 1 2 2v9', key: '11z3ex' }],
	],
	cD = [
		[
			'path',
			{
				d: 'M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z',
				key: 'aenxs0',
			},
		],
		['path', { d: 'M12 2v20', key: 't6zp3m' }],
	],
	dD = [
		[
			'path',
			{
				d: 'M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z',
				key: 'w46dr5',
			},
		],
	],
	lD = [
		['rect', { width: '5', height: '5', x: '3', y: '3', rx: '1', key: '1tu5fj' }],
		['rect', { width: '5', height: '5', x: '16', y: '3', rx: '1', key: '1v8r4q' }],
		['rect', { width: '5', height: '5', x: '3', y: '16', rx: '1', key: '1x03jg' }],
		['path', { d: 'M21 16h-3a2 2 0 0 0-2 2v3', key: '177gqh' }],
		['path', { d: 'M21 21v.01', key: 'ents32' }],
		['path', { d: 'M12 7v3a2 2 0 0 1-2 2H7', key: '8crl2c' }],
		['path', { d: 'M3 12h.01', key: 'nlz23k' }],
		['path', { d: 'M12 3h.01', key: 'n36tog' }],
		['path', { d: 'M12 16v.01', key: '133mhm' }],
		['path', { d: 'M16 12h1', key: '1slzba' }],
		['path', { d: 'M21 12v.01', key: '1lwtk9' }],
		['path', { d: 'M12 21v-1', key: '1880an' }],
	],
	uD = [
		[
			'path',
			{
				d: 'M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z',
				key: 'rib7q0',
			},
		],
		[
			'path',
			{
				d: 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z',
				key: '1ymkrd',
			},
		],
	],
	hD = [
		['path', { d: 'M13 16a3 3 0 0 1 2.24 5', key: '1epib5' }],
		['path', { d: 'M18 12h.01', key: 'yjnet6' }],
		[
			'path',
			{
				d: 'M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3',
				key: 'ue9ozu',
			},
		],
		['path', { d: 'M20 8.54V4a2 2 0 1 0-4 0v3', key: '49iql8' }],
		['path', { d: 'M7.612 12.524a3 3 0 1 0-1.6 4.3', key: '1e33i0' }],
	],
	pD = [
		['path', { d: 'M19.07 4.93A10 10 0 0 0 6.99 3.34', key: 'z3du51' }],
		['path', { d: 'M4 6h.01', key: 'oypzma' }],
		['path', { d: 'M2.29 9.62A10 10 0 1 0 21.31 8.35', key: 'qzzz0' }],
		['path', { d: 'M16.24 7.76A6 6 0 1 0 8.23 16.67', key: '1yjesh' }],
		['path', { d: 'M12 18h.01', key: 'mhygvu' }],
		['path', { d: 'M17.99 11.66A6 6 0 0 1 15.77 16.67', key: '1u2y91' }],
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
		['path', { d: 'm13.41 10.59 5.66-5.66', key: 'mhq4k0' }],
	],
	yD = [
		['path', { d: 'M12 12h.01', key: '1mp3jc' }],
		[
			'path',
			{
				d: 'M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z',
				key: '1y4lzb',
			},
		],
		[
			'path',
			{
				d: 'M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z',
				key: '163ggk',
			},
		],
		[
			'path',
			{
				d: 'M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z',
				key: '1l9i0b',
			},
		],
	],
	fD = [
		[
			'path',
			{
				d: 'M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21',
				key: '1mqj8i',
			},
		],
	],
	kD = [
		['path', { d: 'M5 16v2', key: 'g5qcv5' }],
		['path', { d: 'M19 16v2', key: '1gbaio' }],
		['rect', { width: '20', height: '8', x: '2', y: '8', rx: '2', key: 'vjsjur' }],
		['path', { d: 'M18 12h.01', key: 'yjnet6' }],
	],
	gD = [
		['path', { d: 'M4.9 16.1C1 12.2 1 5.8 4.9 1.9', key: 's0qx1y' }],
		['path', { d: 'M7.8 4.7a6.14 6.14 0 0 0-.8 7.5', key: '1idnkw' }],
		['circle', { cx: '12', cy: '9', r: '2', key: '1092wv' }],
		['path', { d: 'M16.2 4.8c2 2 2.26 5.11.8 7.47', key: 'ojru2q' }],
		['path', { d: 'M19.1 1.9a9.96 9.96 0 0 1 0 14.1', key: 'rhi7fg' }],
		['path', { d: 'M9.5 18h5', key: 'mfy3pd' }],
		['path', { d: 'm8 22 4-11 4 11', key: '25yftu' }],
	],
	mD = [
		['path', { d: 'M16.247 7.761a6 6 0 0 1 0 8.478', key: '1fwjs5' }],
		['path', { d: 'M19.075 4.933a10 10 0 0 1 0 14.134', key: 'ehdyv1' }],
		['path', { d: 'M4.925 19.067a10 10 0 0 1 0-14.134', key: '1q22gi' }],
		['path', { d: 'M7.753 16.239a6 6 0 0 1 0-8.478', key: 'r2q7qm' }],
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
	],
	MD = [
		['path', { d: 'M20.34 17.52a10 10 0 1 0-2.82 2.82', key: 'fydyku' }],
		['circle', { cx: '19', cy: '19', r: '2', key: '17f5cg' }],
		['path', { d: 'm13.41 13.41 4.18 4.18', key: '1gqbwc' }],
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
	],
	vD = [
		['path', { d: 'M5 15h14', key: 'm0yey3' }],
		['path', { d: 'M5 9h14', key: '7tsvo6' }],
		['path', { d: 'm14 20-5-5 6-6-5-5', key: '1jo42i' }],
	],
	ID = [
		['path', { d: 'M22 17a10 10 0 0 0-20 0', key: 'ozegv' }],
		['path', { d: 'M6 17a6 6 0 0 1 12 0', key: '5giftw' }],
		['path', { d: 'M10 17a2 2 0 0 1 4 0', key: 'gnsikk' }],
	],
	xD = [
		['path', { d: 'M13 22H4a2 2 0 0 1 0-4h12', key: 'bt3f23' }],
		['path', { d: 'M13.236 18a3 3 0 0 0-2.2-5', key: '1tbvmo' }],
		['path', { d: 'M16 9h.01', key: '1bdo4e' }],
		[
			'path',
			{
				d: 'M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3',
				key: '9ch7kn',
			},
		],
		['path', { d: 'M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18', key: '3s7e9i' }],
	],
	wD = [
		['rect', { width: '12', height: '20', x: '6', y: '2', rx: '2', key: '1oxtiu' }],
		['rect', { width: '20', height: '12', x: '2', y: '6', rx: '2', key: '9lu3g6' }],
	],
	CD = [
		['path', { d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z', key: 'q3az6g' }],
		['path', { d: 'M12 6.5v11', key: 'ecfhkf' }],
		['path', { d: 'M15 9.4a4 4 0 1 0 0 5.2', key: '1makmb' }],
	],
	LD = [
		['path', { d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z', key: 'q3az6g' }],
		['path', { d: 'M8 12h5', key: '1g6qi8' }],
		['path', { d: 'M16 9.5a4 4 0 1 0 0 5.2', key: 'b2px4r' }],
	],
	bD = [
		['path', { d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z', key: 'q3az6g' }],
		['path', { d: 'M8 7h8', key: 'i86dvs' }],
		['path', { d: 'M12 17.5 8 15h1a4 4 0 0 0 0-8', key: 'grpkl4' }],
		['path', { d: 'M8 11h8', key: 'vwpz6n' }],
	],
	SD = [
		['path', { d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z', key: 'q3az6g' }],
		['path', { d: 'm12 10 3-3', key: '1mc12w' }],
		['path', { d: 'm9 7 3 3v7.5', key: '39i0xv' }],
		['path', { d: 'M9 11h6', key: '1fldmi' }],
		['path', { d: 'M9 15h6', key: 'cctwl0' }],
	],
	DD = [
		['path', { d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z', key: 'q3az6g' }],
		['path', { d: 'M8 13h5', key: '1k9z8w' }],
		['path', { d: 'M10 17V9.5a2.5 2.5 0 0 1 5 0', key: '1dzgp0' }],
		['path', { d: 'M8 17h7', key: '8mjdqu' }],
	],
	AD = [
		['path', { d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z', key: 'q3az6g' }],
		['path', { d: 'M8 15h5', key: 'vxg57a' }],
		['path', { d: 'M8 11h5a2 2 0 1 0 0-4h-3v10', key: '1usi5u' }],
	],
	ED = [
		['path', { d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z', key: 'q3az6g' }],
		['path', { d: 'M10 17V7h5', key: 'k7jq18' }],
		['path', { d: 'M10 11h4', key: '1i0mka' }],
		['path', { d: 'M8 15h5', key: 'vxg57a' }],
	],
	TD = [
		['path', { d: 'M13 16H8', key: 'wsln4y' }],
		['path', { d: 'M14 8H8', key: '1l3xfs' }],
		['path', { d: 'M16 12H8', key: '1fr5h0' }],
		[
			'path',
			{
				d: 'M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z',
				key: 'ycz6yz',
			},
		],
	],
	PD = [
		['path', { d: 'M10 6.5v11a5.5 5.5 0 0 0 5.5-5.5', key: 'nw10mp' }],
		['path', { d: 'm14 8-6 3', key: '2tb98i' }],
		['path', { d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z', key: 'io9ry0' }],
	],
	RD = [
		['path', { d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z', key: 'q3az6g' }],
		['path', { d: 'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8', key: '1h4pet' }],
		['path', { d: 'M12 17.5v-11', key: '1jc1ny' }],
	],
	ND = [
		['path', { d: 'M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z', key: '1m5n7q' }],
		['circle', { cx: '14', cy: '12', r: '8', key: '1pag6k' }],
	],
	_D = [
		['rect', { width: '20', height: '12', x: '2', y: '6', rx: '2', key: '9lu3g6' }],
		['path', { d: 'M12 12h.01', key: '1mp3jc' }],
		['path', { d: 'M17 12h.01', key: '1m0b6t' }],
		['path', { d: 'M7 12h.01', key: 'eqddd0' }],
	],
	HD = [
		[
			'path',
			{
				d: 'M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z',
				key: 'd5y1f',
			},
		],
	],
	OD = [['rect', { width: '20', height: '12', x: '2', y: '6', rx: '2', key: '9lu3g6' }]],
	FD = [
		['path', { d: 'M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5', key: 'x6z5xu' }],
		['path', { d: 'M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12', key: '1x4zh5' }],
		['path', { d: 'm14 16-3 3 3 3', key: 'f6jyew' }],
		['path', { d: 'M8.293 13.596 7.196 9.5 3.1 10.598', key: 'wf1obh' }],
		[
			'path',
			{
				d: 'm9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843',
				key: '9tzpgr',
			},
		],
		['path', { d: 'm13.378 9.633 4.096 1.098 1.097-4.096', key: '1oe83g' }],
	],
	jD = [['rect', { width: '12', height: '20', x: '6', y: '2', rx: '2', key: '1oxtiu' }]],
	qD = [
		['path', { d: 'm15 14 5-5-5-5', key: '12vg1m' }],
		['path', { d: 'M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13', key: '6uklza' }],
	],
	VD = [
		['circle', { cx: '12', cy: '17', r: '1', key: '1ixnty' }],
		['path', { d: 'M21 7v6h-6', key: '3ptur4' }],
		['path', { d: 'M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7', key: '1kgawr' }],
	],
	zD = [
		['path', { d: 'M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', key: '14sxne' }],
		['path', { d: 'M3 3v5h5', key: '1xhq8a' }],
		['path', { d: 'M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16', key: '1hlbsb' }],
		['path', { d: 'M16 16h5v5', key: 'ccwih5' }],
		['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
	],
	BD = [
		['path', { d: 'M21 7v6h-6', key: '3ptur4' }],
		['path', { d: 'M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7', key: '1kgawr' }],
	],
	UD = [
		['path', { d: 'M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', key: '14sxne' }],
		['path', { d: 'M3 3v5h5', key: '1xhq8a' }],
		['path', { d: 'M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16', key: '1hlbsb' }],
		['path', { d: 'M16 16h5v5', key: 'ccwih5' }],
	],
	GD = [
		['path', { d: 'M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47', key: '1krf6h' }],
		['path', { d: 'M8 16H3v5', key: '1cv678' }],
		['path', { d: 'M3 12C3 9.51 4 7.26 5.64 5.64', key: 'ruvoct' }],
		['path', { d: 'm3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64', key: '19q130' }],
		['path', { d: 'M21 12c0 1-.16 1.97-.47 2.87', key: '4w8emr' }],
		['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
		['path', { d: 'M22 22 2 2', key: '1r8tn9' }],
	],
	WD = [
		['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', key: 'v9h5vc' }],
		['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
		['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', key: '3uifl3' }],
		['path', { d: 'M8 16H3v5', key: '1cv678' }],
	],
	$D = [
		['path', { d: 'M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z', key: 'fpq118' }],
		['path', { d: 'M5 10h14', key: 'elsbfy' }],
		['path', { d: 'M15 7v6', key: '1nx30x' }],
	],
	ZD = [
		['path', { d: 'M17 3v10', key: '15fgeh' }],
		['path', { d: 'm12.67 5.5 8.66 5', key: '1gpheq' }],
		['path', { d: 'm12.67 10.5 8.66-5', key: '1dkfa6' }],
		['path', { d: 'M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z', key: 'swwfx4' }],
	],
	QD = [
		['path', { d: 'M4 7V4h16v3', key: '9msm58' }],
		['path', { d: 'M5 20h6', key: '1h6pxn' }],
		['path', { d: 'M13 4 8 20', key: 'kqq6aj' }],
		['path', { d: 'm15 15 5 5', key: 'me55sn' }],
		['path', { d: 'm20 15-5 5', key: '11p7ol' }],
	],
	XD = [
		['path', { d: 'm17 2 4 4-4 4', key: 'nntrym' }],
		['path', { d: 'M3 11v-1a4 4 0 0 1 4-4h14', key: '84bu3i' }],
		['path', { d: 'm7 22-4-4 4-4', key: '1wqhfi' }],
		['path', { d: 'M21 13v1a4 4 0 0 1-4 4H3', key: '1rx37r' }],
		['path', { d: 'M11 10h1v4', key: '70cz1p' }],
	],
	KD = [
		['path', { d: 'm2 9 3-3 3 3', key: '1ltn5i' }],
		['path', { d: 'M13 18H7a2 2 0 0 1-2-2V6', key: '1r6tfw' }],
		['path', { d: 'm22 15-3 3-3-3', key: '4rnwn2' }],
		['path', { d: 'M11 6h6a2 2 0 0 1 2 2v10', key: '2f72bc' }],
	],
	YD = [
		['path', { d: 'm17 2 4 4-4 4', key: 'nntrym' }],
		['path', { d: 'M3 11v-1a4 4 0 0 1 4-4h14', key: '84bu3i' }],
		['path', { d: 'm7 22-4-4 4-4', key: '1wqhfi' }],
		['path', { d: 'M21 13v1a4 4 0 0 1-4 4H3', key: '1rx37r' }],
	],
	JD = [
		['path', { d: 'M14 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1', key: 'zg1ipl' }],
		['path', { d: 'M14 4a1 1 0 0 1 1-1', key: 'dhj8ez' }],
		['path', { d: 'M15 10a1 1 0 0 1-1-1', key: '1mnyi5' }],
		['path', { d: 'M19 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1', key: 'txt6k4' }],
		['path', { d: 'M21 4a1 1 0 0 0-1-1', key: 'sfs9ap' }],
		['path', { d: 'M21 9a1 1 0 0 1-1 1', key: 'mp6qeo' }],
		['path', { d: 'm3 7 3 3 3-3', key: 'x25e72' }],
		['path', { d: 'M6 10V5a2 2 0 0 1 2-2h2', key: '15xut4' }],
		['rect', { x: '3', y: '14', width: '7', height: '7', rx: '1', key: '1bkyp8' }],
	],
	eA = [
		['path', { d: 'm12 17-5-5 5-5', key: '1s3y5u' }],
		['path', { d: 'M22 18v-2a4 4 0 0 0-4-4H7', key: '1fcyog' }],
		['path', { d: 'm7 17-5-5 5-5', key: '1ed8i2' }],
	],
	tA = [
		['path', { d: 'M14 4a1 1 0 0 1 1-1', key: 'dhj8ez' }],
		['path', { d: 'M15 10a1 1 0 0 1-1-1', key: '1mnyi5' }],
		['path', { d: 'M21 4a1 1 0 0 0-1-1', key: 'sfs9ap' }],
		['path', { d: 'M21 9a1 1 0 0 1-1 1', key: 'mp6qeo' }],
		['path', { d: 'm3 7 3 3 3-3', key: 'x25e72' }],
		['path', { d: 'M6 10V5a2 2 0 0 1 2-2h2', key: '15xut4' }],
		['rect', { x: '3', y: '14', width: '7', height: '7', rx: '1', key: '1bkyp8' }],
	],
	nA = [
		['path', { d: 'M20 18v-2a4 4 0 0 0-4-4H4', key: '5vmcpk' }],
		['path', { d: 'm9 17-5-5 5-5', key: 'nvlc11' }],
	],
	aA = [
		['path', { d: 'M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z', key: '2a1g8i' }],
		['path', { d: 'M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z', key: 'rg3s36' }],
	],
	oA = [
		[
			'path',
			{
				d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z',
				key: 'm3kijz',
			},
		],
		[
			'path',
			{
				d: 'm12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z',
				key: '1fmvmk',
			},
		],
		['path', { d: 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0', key: '1f8sc4' }],
		['path', { d: 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5', key: 'qeys4' }],
	],
	rA = [
		['path', { d: 'M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22', key: '1rnhq3' }],
		['path', { d: 'm12 18 2.57-3.5', key: '116vt7' }],
		['path', { d: 'M6.243 9.016a7 7 0 0 1 11.507-.009', key: '10dq0b' }],
		['path', { d: 'M9.35 14.53 12 11.22', key: 'tdsyp2' }],
		[
			'path',
			{
				d: 'M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z',
				key: 'nmifey',
			},
		],
	],
	iA = [
		['polyline', { points: '3.5 2 6.5 12.5 18 12.5', key: 'y3iy52' }],
		['line', { x1: '9.5', x2: '5.5', y1: '12.5', y2: '20', key: '19vg5i' }],
		['line', { x1: '15', x2: '18.5', y1: '12.5', y2: '20', key: '1inpmv' }],
		['path', { d: 'M2.75 18a13 13 0 0 0 18.5 0', key: '1nquas' }],
	],
	sA = [
		['path', { d: 'M6 19V5', key: '1r845m' }],
		['path', { d: 'M10 19V6.8', key: '9j2tfs' }],
		['path', { d: 'M14 19v-7.8', key: '10s8qv' }],
		['path', { d: 'M18 5v4', key: '1tajlv' }],
		['path', { d: 'M18 19v-6', key: 'ielfq3' }],
		['path', { d: 'M22 19V9', key: '158nzp' }],
		['path', { d: 'M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65', key: '1930oh' }],
	],
	cA = [
		['path', { d: 'M17 10h-1a4 4 0 1 1 4-4v.534', key: '7qf5zm' }],
		['path', { d: 'M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31', key: '1et29u' }],
		[
			'path',
			{ d: 'M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2', key: 'kiv2lz' },
		],
		['path', { d: 'M9.77 12C4 15 2 22 2 22', key: 'h28rw0' }],
		['circle', { cx: '17', cy: '8', r: '2', key: '1330xn' }],
	],
	dA = [
		[
			'path',
			{
				d: 'M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2',
				key: '10n0gc',
			},
		],
		['path', { d: 'm15.194 13.707 3.814 1.86-1.86 3.814', key: '16shm9' }],
		[
			'path',
			{
				d: 'M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4',
				key: '1lxi77',
			},
		],
	],
	lA = [
		['path', { d: 'm14.5 9.5 1 1', key: '159eiq' }],
		['path', { d: 'm15.5 8.5-4 4', key: 'iirg3q' }],
		['path', { d: 'M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8', key: 'g2jlw' }],
		['path', { d: 'M3 3v5h5', key: '1xhq8a' }],
		['circle', { cx: '10', cy: '14', r: '2', key: '1239so' }],
	],
	uA = [
		['path', { d: 'M20 9V7a2 2 0 0 0-2-2h-6', key: '19z8uc' }],
		['path', { d: 'm15 2-3 3 3 3', key: '177bxs' }],
		['path', { d: 'M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2', key: 'd36hnl' }],
	],
	hA = [
		['path', { d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', key: '1357e3' }],
		['path', { d: 'M3 3v5h5', key: '1xhq8a' }],
	],
	pA = [
		['path', { d: 'M12 5H6a2 2 0 0 0-2 2v3', key: 'l96uqu' }],
		['path', { d: 'm9 8 3-3-3-3', key: '1gzgc3' }],
		['path', { d: 'M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2', key: '1w2k5h' }],
	],
	yA = [
		['circle', { cx: '6', cy: '19', r: '3', key: '1kj8tv' }],
		['path', { d: 'M9 19h8.5c.4 0 .9-.1 1.3-.2', key: '1effex' }],
		['path', { d: 'M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12', key: 'k9y2ds' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M21 15.3a3.5 3.5 0 0 0-3.3-3.3', key: '11nlu2' }],
		['path', { d: 'M15 5h-4.3', key: '6537je' }],
		['circle', { cx: '18', cy: '5', r: '3', key: 'gq8acd' }],
	],
	fA = [
		['path', { d: 'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8', key: '1p45f6' }],
		['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
	],
	kA = [
		['circle', { cx: '6', cy: '19', r: '3', key: '1kj8tv' }],
		['path', { d: 'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15', key: '1d8sl' }],
		['circle', { cx: '18', cy: '5', r: '3', key: 'gq8acd' }],
	],
	gA = [
		['rect', { width: '20', height: '8', x: '2', y: '14', rx: '2', key: 'w68u3i' }],
		['path', { d: 'M6.01 18H6', key: '19vcac' }],
		['path', { d: 'M10.01 18H10', key: 'uamcmx' }],
		['path', { d: 'M15 10v4', key: 'qjz1xs' }],
		['path', { d: 'M17.84 7.17a4 4 0 0 0-5.66 0', key: '1rif40' }],
		['path', { d: 'M20.66 4.34a8 8 0 0 0-11.31 0', key: '6a5xfq' }],
	],
	mA = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M3 12h18', key: '1i2n21' }],
	],
	MA = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M21 9H3', key: '1338ky' }],
		['path', { d: 'M21 15H3', key: '9uk58r' }],
	],
	vA = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M21 7.5H3', key: '1hm9pq' }],
		['path', { d: 'M21 12H3', key: '2avoz0' }],
		['path', { d: 'M21 16.5H3', key: 'n7jzkj' }],
	],
	IA = [
		['path', { d: 'M4 11a9 9 0 0 1 9 9', key: 'pv89mb' }],
		['path', { d: 'M4 4a16 16 0 0 1 16 16', key: 'k0647b' }],
		['circle', { cx: '5', cy: '19', r: '1', key: 'bfqh0e' }],
	],
	xA = [
		[
			'path',
			{
				d: 'M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z',
				key: 'icamh8',
			},
		],
		['path', { d: 'm14.5 12.5 2-2', key: 'inckbg' }],
		['path', { d: 'm11.5 9.5 2-2', key: 'fmmyf7' }],
		['path', { d: 'm8.5 6.5 2-2', key: 'vc6u1g' }],
		['path', { d: 'm17.5 15.5 2-2', key: 'wo5hmg' }],
	],
	wA = [
		['path', { d: 'M10 15v-3', key: '1pjskw' }],
		['path', { d: 'M14 15v-3', key: '1o1mqj' }],
		['path', { d: 'M18 15v-3', key: 'cws6he' }],
		['path', { d: 'M2 8V4', key: '3jv1jz' }],
		['path', { d: 'M22 6H2', key: '1iqbfk' }],
		['path', { d: 'M22 8V4', key: '16f4ou' }],
		['path', { d: 'M6 15v-3', key: '1ij1qe' }],
		['rect', { x: '2', y: '12', width: '20', height: '8', rx: '2', key: '1tqiko' }],
	],
	CA = [
		['path', { d: 'M6 11h8a4 4 0 0 0 0-8H9v18', key: '18ai8t' }],
		['path', { d: 'M6 15h8', key: '1y8f6l' }],
	],
	LA = [
		['path', { d: 'M10 2v15', key: '1qf71f' }],
		['path', { d: 'M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z', key: '1pxcvx' }],
		[
			'path',
			{ d: 'M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z', key: '5oog16' },
		],
	],
	bA = [
		['path', { d: 'M7 21h10', key: '1b0cd5' }],
		['path', { d: 'M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z', key: '4rw317' }],
		[
			'path',
			{
				d: 'M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1',
				key: '10xrj0',
			},
		],
		['path', { d: 'm13 12 4-4', key: '1hckqy' }],
		['path', { d: 'M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2', key: '1p4srx' }],
	],
	SA = [
		['path', { d: 'm2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777', key: 'f1wd0e' }],
		['path', { d: 'M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25', key: '1pfu07' }],
		['path', { d: 'M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9', key: '1oq9qw' }],
		['path', { d: 'm6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2', key: '1fnwu5' }],
		['rect', { width: '20', height: '4', x: '2', y: '11', rx: '1', key: 'itshg' }],
	],
	DA = [
		['path', { d: 'M4 10a7.31 7.31 0 0 0 10 10Z', key: '1fzpp3' }],
		['path', { d: 'm9 15 3-3', key: '88sc13' }],
		['path', { d: 'M17 13a6 6 0 0 0-6-6', key: '15cc6u' }],
		['path', { d: 'M21 13A10 10 0 0 0 11 3', key: '11nf8s' }],
	],
	AA = [
		[
			'path',
			{
				d: 'm13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5',
				key: 'dzhfyz',
			},
		],
		['path', { d: 'M16.5 7.5 19 5', key: '1ltcjm' }],
		[
			'path',
			{
				d: 'm17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5',
				key: 'nfoymv',
			},
		],
		['path', { d: 'M9 21a6 6 0 0 0-6-6', key: '1iajcf' }],
		[
			'path',
			{
				d: 'M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z',
				key: 'nv9zqy',
			},
		],
	],
	EA = [
		['path', { d: 'm20 19.5-5.5 1.2', key: '1aenhr' }],
		['path', { d: 'M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2', key: '2rtezt' }],
		['path', { d: 'm2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2', key: '1kbm92' }],
		['path', { d: 'M20 10 4 13.5', key: '8nums9' }],
	],
	TA = [
		['path', { d: 'M10 2v3a1 1 0 0 0 1 1h5', key: '1xspal' }],
		['path', { d: 'M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6', key: '1ra60u' }],
		['path', { d: 'M18 22H4a2 2 0 0 1-2-2V6', key: 'pblm9e' }],
		[
			'path',
			{
				d: 'M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z',
				key: '1yve0x',
			},
		],
	],
	PA = [
		['path', { d: 'M13 13H8a1 1 0 0 0-1 1v7', key: 'h8g396' }],
		['path', { d: 'M14 8h1', key: '1lfen6' }],
		['path', { d: 'M17 21v-4', key: '1yknxs' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41', key: '1t4vdl' }],
		['path', { d: 'M29.5 11.5s5 5 4 5', key: 'zzn4i6' }],
		['path', { d: 'M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15', key: '24cby9' }],
	],
	RA = [
		[
			'path',
			{
				d: 'M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
				key: '1c8476',
			},
		],
		['path', { d: 'M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7', key: '1ydtos' }],
		['path', { d: 'M7 3v4a1 1 0 0 0 1 1h7', key: 't51u73' }],
	],
	NA = [
		['path', { d: 'M5 7v11a1 1 0 0 0 1 1h11', key: '13dt1j' }],
		['path', { d: 'M5.293 18.707 11 13', key: 'ezgbsx' }],
		['circle', { cx: '19', cy: '19', r: '2', key: '17f5cg' }],
		['circle', { cx: '5', cy: '5', r: '2', key: '1gwv83' }],
	],
	_A = [
		['path', { d: 'M12 3v18', key: '108xh3' }],
		['path', { d: 'm19 8 3 8a5 5 0 0 1-6 0zV7', key: 'zcdpyk' }],
		['path', { d: 'M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1', key: '1yorad' }],
		['path', { d: 'm5 8 3 8a5 5 0 0 1-6 0zV7', key: 'eua70x' }],
		['path', { d: 'M7 21h10', key: '1b0cd5' }],
	],
	HA = [
		['path', { d: 'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7', key: '1m0v6g' }],
		['path', { d: 'M14 15H9v-5', key: 'pi4jk9' }],
		['path', { d: 'M16 3h5v5', key: '1806ms' }],
		['path', { d: 'M21 3 9 15', key: '15kdhq' }],
	],
	OA = [
		['path', { d: 'M3 7V5a2 2 0 0 1 2-2h2', key: 'aa7l1z' }],
		['path', { d: 'M17 3h2a2 2 0 0 1 2 2v2', key: '4qcy5o' }],
		['path', { d: 'M21 17v2a2 2 0 0 1-2 2h-2', key: '6vwrx8' }],
		['path', { d: 'M7 21H5a2 2 0 0 1-2-2v-2', key: 'ioqczr' }],
		['path', { d: 'M8 7v10', key: '23sfjj' }],
		['path', { d: 'M12 7v10', key: 'jspqdw' }],
		['path', { d: 'M17 7v10', key: '578dap' }],
	],
	FA = [
		['path', { d: 'M3 7V5a2 2 0 0 1 2-2h2', key: 'aa7l1z' }],
		['path', { d: 'M17 3h2a2 2 0 0 1 2 2v2', key: '4qcy5o' }],
		['path', { d: 'M21 17v2a2 2 0 0 1-2 2h-2', key: '6vwrx8' }],
		['path', { d: 'M7 21H5a2 2 0 0 1-2-2v-2', key: 'ioqczr' }],
		['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
		[
			'path',
			{
				d: 'M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0',
				key: '11ak4c',
			},
		],
	],
	jA = [
		['path', { d: 'M17 3h2a2 2 0 0 1 2 2v2', key: '4qcy5o' }],
		['path', { d: 'M21 17v2a2 2 0 0 1-2 2h-2', key: '6vwrx8' }],
		['path', { d: 'M3 7V5a2 2 0 0 1 2-2h2', key: 'aa7l1z' }],
		['path', { d: 'M7 21H5a2 2 0 0 1-2-2v-2', key: 'ioqczr' }],
		[
			'path',
			{
				d: 'M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 4.172 4.306l-3.447 3.62a1 1 0 0 1-1.449 0z',
				key: '1ak1ef',
			},
		],
	],
	qA = [
		['path', { d: 'M3 7V5a2 2 0 0 1 2-2h2', key: 'aa7l1z' }],
		['path', { d: 'M17 3h2a2 2 0 0 1 2 2v2', key: '4qcy5o' }],
		['path', { d: 'M21 17v2a2 2 0 0 1-2 2h-2', key: '6vwrx8' }],
		['path', { d: 'M7 21H5a2 2 0 0 1-2-2v-2', key: 'ioqczr' }],
		['path', { d: 'M8 14s1.5 2 4 2 4-2 4-2', key: '1y1vjs' }],
		['path', { d: 'M9 9h.01', key: '1q5me6' }],
		['path', { d: 'M15 9h.01', key: 'x1ddxp' }],
	],
	VA = [
		['path', { d: 'M17 12v4a1 1 0 0 1-1 1h-4', key: 'uk4fdo' }],
		['path', { d: 'M17 3h2a2 2 0 0 1 2 2v2', key: '4qcy5o' }],
		['path', { d: 'M17 8V7', key: 'q2g9wo' }],
		['path', { d: 'M21 17v2a2 2 0 0 1-2 2h-2', key: '6vwrx8' }],
		['path', { d: 'M3 7V5a2 2 0 0 1 2-2h2', key: 'aa7l1z' }],
		['path', { d: 'M7 17h.01', key: '19xn7k' }],
		['path', { d: 'M7 21H5a2 2 0 0 1-2-2v-2', key: 'ioqczr' }],
		['rect', { x: '7', y: '7', width: '5', height: '5', rx: '1', key: 'm9kyts' }],
	],
	zA = [
		['path', { d: 'M3 7V5a2 2 0 0 1 2-2h2', key: 'aa7l1z' }],
		['path', { d: 'M17 3h2a2 2 0 0 1 2 2v2', key: '4qcy5o' }],
		['path', { d: 'M21 17v2a2 2 0 0 1-2 2h-2', key: '6vwrx8' }],
		['path', { d: 'M7 21H5a2 2 0 0 1-2-2v-2', key: 'ioqczr' }],
		['path', { d: 'M7 12h10', key: 'b7w52i' }],
	],
	BA = [
		['path', { d: 'M3 7V5a2 2 0 0 1 2-2h2', key: 'aa7l1z' }],
		['path', { d: 'M17 3h2a2 2 0 0 1 2 2v2', key: '4qcy5o' }],
		['path', { d: 'M21 17v2a2 2 0 0 1-2 2h-2', key: '6vwrx8' }],
		['path', { d: 'M7 21H5a2 2 0 0 1-2-2v-2', key: 'ioqczr' }],
		['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
		['path', { d: 'm16 16-1.9-1.9', key: '1dq9hf' }],
	],
	UA = [
		['path', { d: 'M3 7V5a2 2 0 0 1 2-2h2', key: 'aa7l1z' }],
		['path', { d: 'M17 3h2a2 2 0 0 1 2 2v2', key: '4qcy5o' }],
		['path', { d: 'M21 17v2a2 2 0 0 1-2 2h-2', key: '6vwrx8' }],
		['path', { d: 'M7 21H5a2 2 0 0 1-2-2v-2', key: 'ioqczr' }],
		['path', { d: 'M7 8h8', key: '1jbsf9' }],
		['path', { d: 'M7 12h10', key: 'b7w52i' }],
		['path', { d: 'M7 16h6', key: '1vyc9m' }],
	],
	GA = [
		['path', { d: 'M3 7V5a2 2 0 0 1 2-2h2', key: 'aa7l1z' }],
		['path', { d: 'M17 3h2a2 2 0 0 1 2 2v2', key: '4qcy5o' }],
		['path', { d: 'M21 17v2a2 2 0 0 1-2 2h-2', key: '6vwrx8' }],
		['path', { d: 'M7 21H5a2 2 0 0 1-2-2v-2', key: 'ioqczr' }],
	],
	WA = [
		['path', { d: 'M14 21v-3a2 2 0 0 0-4 0v3', key: '1rgiei' }],
		['path', { d: 'M18 5v16', key: '1ethyx' }],
		['path', { d: 'm4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6', key: 'zywc2d' }],
		[
			'path',
			{
				d: 'm6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11',
				key: '1d4ql0',
			},
		],
		['path', { d: 'M6 5v16', key: '1sn0nx' }],
		['circle', { cx: '12', cy: '9', r: '2', key: '1092wv' }],
	],
	$A = [
		['path', { d: 'M5.42 9.42 8 12', key: '12pkuq' }],
		['circle', { cx: '4', cy: '8', r: '2', key: '107mxr' }],
		['path', { d: 'm14 6-8.58 8.58', key: 'gvzu5l' }],
		['circle', { cx: '4', cy: '16', r: '2', key: '1ehqvc' }],
		['path', { d: 'M10.8 14.8 14 18', key: 'ax7m9r' }],
		['path', { d: 'M16 12h-2', key: '10asgb' }],
		['path', { d: 'M22 12h-2', key: '14jgyd' }],
	],
	ZA = [
		['circle', { cx: '6', cy: '6', r: '3', key: '1lh9wr' }],
		['path', { d: 'M8.12 8.12 12 12', key: '1alkpv' }],
		['path', { d: 'M20 4 8.12 15.88', key: 'xgtan2' }],
		['circle', { cx: '6', cy: '18', r: '3', key: 'fqmcym' }],
		['path', { d: 'M14.8 14.8 20 20', key: 'ptml3r' }],
	],
	QA = [
		['path', { d: 'M21 4h-3.5l2 11.05', key: '1gktiw' }],
		['path', { d: 'M6.95 17h5.142c.523 0 .95-.406 1.063-.916a6.5 6.5 0 0 1 5.345-5.009', key: '1bq3u3' }],
		['circle', { cx: '19.5', cy: '17.5', r: '2.5', key: 'e4zhv9' }],
		['circle', { cx: '4.5', cy: '17.5', r: '2.5', key: '50vk4p' }],
	],
	XA = [
		['path', { d: 'M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3', key: 'i8wdob' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'm22 3-5 5', key: '12jva0' }],
		['path', { d: 'm17 3 5 5', key: 'k36vhe' }],
	],
	KA = [
		['path', { d: 'M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3', key: 'i8wdob' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'm17 8 5-5', key: 'fqif7o' }],
		['path', { d: 'M17 3h5v5', key: '1o3tu8' }],
	],
	YA = [
		['path', { d: 'M15 12h-5', key: 'r7krc0' }],
		['path', { d: 'M15 8h-5', key: '1khuty' }],
		['path', { d: 'M19 17V5a2 2 0 0 0-2-2H4', key: 'zz82l3' }],
		[
			'path',
			{
				d: 'M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3',
				key: '1ph1d7',
			},
		],
	],
	JA = [
		['path', { d: 'M19 17V5a2 2 0 0 0-2-2H4', key: 'zz82l3' }],
		[
			'path',
			{
				d: 'M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3',
				key: '1ph1d7',
			},
		],
	],
	eE = [
		['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
		['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
		['path', { d: 'M11 7v4', key: 'm2edmq' }],
		['path', { d: 'M11 15h.01', key: 'k85uqc' }],
	],
	tE = [
		['path', { d: 'm8 11 2 2 4-4', key: '1sed1v' }],
		['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
		['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
	],
	nE = [
		['path', { d: 'm13 13.5 2-2.5-2-2.5', key: '1rvxrh' }],
		['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
		['path', { d: 'M9 8.5 7 11l2 2.5', key: '6ffwbx' }],
		['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
	],
	aE = [
		['path', { d: 'm13.5 8.5-5 5', key: '1cs55j' }],
		['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
		['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
	],
	oE = [
		['path', { d: 'm13.5 8.5-5 5', key: '1cs55j' }],
		['path', { d: 'm8.5 8.5 5 5', key: 'a8mexj' }],
		['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
		['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
	],
	rE = [
		['path', { d: 'm21 21-4.34-4.34', key: '14j7rj' }],
		['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
	],
	iE = [
		['path', { d: 'M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0', key: 'vqan6v' }],
		['path', { d: 'M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0', key: 'wdjd8o' }],
	],
	sE = [
		[
			'path',
			{
				d: 'M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z',
				key: '117uat',
			},
		],
		['path', { d: 'M6 12h16', key: 's4cdu5' }],
	],
	cE = [
		['rect', { x: '14', y: '14', width: '8', height: '8', rx: '2', key: '1b0bso' }],
		['rect', { x: '2', y: '2', width: '8', height: '8', rx: '2', key: '1x09vl' }],
		['path', { d: 'M7 14v1a2 2 0 0 0 2 2h1', key: 'pao6x6' }],
		['path', { d: 'M14 7h1a2 2 0 0 1 2 2v1', key: '19tdru' }],
	],
	dE = [
		[
			'path',
			{
				d: 'M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z',
				key: '1ffxy3',
			},
		],
		['path', { d: 'm21.854 2.147-10.94 10.939', key: '12cjpa' }],
	],
	lE = [
		['path', { d: 'M12 3v18', key: '108xh3' }],
		['path', { d: 'm16 16 4-4-4-4', key: '1js579' }],
		['path', { d: 'm8 8-4 4 4 4', key: '1whems' }],
	],
	uE = [
		['path', { d: 'm16 16-4 4-4-4', key: '3dv8je' }],
		['path', { d: 'M3 12h18', key: '1i2n21' }],
		['path', { d: 'm8 8 4-4 4 4', key: '2bscm2' }],
	],
	hE = [
		['path', { d: 'M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2', key: '4b9dqc' }],
		['path', { d: 'M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2', key: '22nnkd' }],
		['path', { d: 'M6 6h.01', key: '1utrut' }],
		['path', { d: 'M6 18h.01', key: 'uhywen' }],
		['path', { d: 'm13 6-4 6h6l-4 6', key: '14hqih' }],
	],
	pE = [
		['path', { d: 'm10.852 14.772-.383.923', key: '11vil6' }],
		['path', { d: 'M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923', key: '1v3clb' }],
		['path', { d: 'm13.148 9.228.383-.923', key: 't2zzyc' }],
		['path', { d: 'm13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544', key: '1bxfiv' }],
		['path', { d: 'm14.772 10.852.923-.383', key: 'k9m8cz' }],
		['path', { d: 'm14.772 13.148.923.383', key: '1xvhww' }],
		['path', { d: 'M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5', key: 'tn8das' }],
		['path', { d: 'M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5', key: '1g2pve' }],
		['path', { d: 'M6 18h.01', key: 'uhywen' }],
		['path', { d: 'M6 6h.01', key: '1utrut' }],
		['path', { d: 'm9.228 10.852-.923-.383', key: '1wtb30' }],
		['path', { d: 'm9.228 13.148-.923.383', key: '1a830x' }],
	],
	yE = [
		['path', { d: 'M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5', key: 'bt2siv' }],
		['path', { d: 'M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z', key: '1hjrv1' }],
		['path', { d: 'M22 17v-1a2 2 0 0 0-2-2h-1', key: '1iynyr' }],
		['path', { d: 'M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z', key: '161ggg' }],
		['path', { d: 'M6 18h.01', key: 'uhywen' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	fE = [
		['rect', { width: '20', height: '8', x: '2', y: '2', rx: '2', ry: '2', key: 'ngkwjq' }],
		['rect', { width: '20', height: '8', x: '2', y: '14', rx: '2', ry: '2', key: 'iecqi9' }],
		['line', { x1: '6', x2: '6.01', y1: '6', y2: '6', key: '16zg32' }],
		['line', { x1: '6', x2: '6.01', y1: '18', y2: '18', key: 'nzw8ys' }],
	],
	kE = [
		['path', { d: 'M14 17H5', key: 'gfn3mx' }],
		['path', { d: 'M19 7h-9', key: '6i9tg' }],
		['circle', { cx: '17', cy: '17', r: '3', key: '18b49y' }],
		['circle', { cx: '7', cy: '7', r: '3', key: 'dfmy0x' }],
	],
	gE = [
		[
			'path',
			{
				d: 'M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915',
				key: '1i5ecw',
			},
		],
		['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
	],
	mE = [
		[
			'path',
			{
				d: 'M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z',
				key: '1bo67w',
			},
		],
		['rect', { x: '3', y: '14', width: '7', height: '7', rx: '1', key: '1bkyp8' }],
		['circle', { cx: '17.5', cy: '17.5', r: '3.5', key: 'w3z12y' }],
	],
	ME = [
		['circle', { cx: '18', cy: '5', r: '3', key: 'gq8acd' }],
		['circle', { cx: '6', cy: '12', r: '3', key: 'w7nqdw' }],
		['circle', { cx: '18', cy: '19', r: '3', key: '1xt0gg' }],
		['line', { x1: '8.59', x2: '15.42', y1: '13.51', y2: '17.49', key: '47mynk' }],
		['line', { x1: '15.41', x2: '8.59', y1: '6.51', y2: '10.49', key: '1n3mei' }],
	],
	vE = [
		['path', { d: 'M12 2v13', key: '1km8f5' }],
		['path', { d: 'm16 6-4-4-4 4', key: '13yo43' }],
		['path', { d: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8', key: '1b2hhj' }],
	],
	IE = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
		['line', { x1: '3', x2: '21', y1: '9', y2: '9', key: '1vqk6q' }],
		['line', { x1: '3', x2: '21', y1: '15', y2: '15', key: 'o2sbyz' }],
		['line', { x1: '9', x2: '9', y1: '9', y2: '21', key: '1ib60c' }],
		['line', { x1: '15', x2: '15', y1: '9', y2: '21', key: '1n26ft' }],
	],
	xE = [
		[
			'path',
			{
				d: 'M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44',
				key: '1cn552',
			},
		],
	],
	wE = [
		[
			'path',
			{
				d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
				key: 'oel41y',
			},
		],
		['path', { d: 'm4.243 5.21 14.39 12.472', key: '1c9a7c' }],
	],
	CE = [
		[
			'path',
			{
				d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
				key: 'oel41y',
			},
		],
		['path', { d: 'M12 8v4', key: '1got3b' }],
		['path', { d: 'M12 16h.01', key: '1drbdi' }],
	],
	LE = [
		[
			'path',
			{
				d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
				key: 'oel41y',
			},
		],
		['path', { d: 'm9 12 2 2 4-4', key: 'dzmm74' }],
	],
	bE = [
		[
			'path',
			{
				d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
				key: 'oel41y',
			},
		],
		['path', { d: 'M8 12h.01', key: 'czm47f' }],
		['path', { d: 'M12 12h.01', key: '1mp3jc' }],
		['path', { d: 'M16 12h.01', key: '1l6xoz' }],
	],
	SE = [
		[
			'path',
			{
				d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
				key: 'oel41y',
			},
		],
		['path', { d: 'M12 22V2', key: 'zs6s6o' }],
	],
	DE = [
		[
			'path',
			{
				d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
				key: 'oel41y',
			},
		],
		['path', { d: 'M9 12h6', key: '1c52cq' }],
	],
	AE = [
		[
			'path',
			{
				d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
				key: 'oel41y',
			},
		],
		['path', { d: 'M9 12h6', key: '1c52cq' }],
		['path', { d: 'M12 9v6', key: '199k2o' }],
	],
	EE = [
		[
			'path',
			{
				d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
				key: 'oel41y',
			},
		],
		['path', { d: 'M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3', key: 'mhlwft' }],
		['path', { d: 'M12 17h.01', key: 'p32p05' }],
	],
	TE = [
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		[
			'path',
			{
				d: 'M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71',
				key: '1jlk70',
			},
		],
		[
			'path',
			{
				d: 'M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264',
				key: '18rp1v',
			},
		],
	],
	PE = [
		[
			'path',
			{
				d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
				key: 'oel41y',
			},
		],
		['path', { d: 'M6.376 18.91a6 6 0 0 1 11.249.003', key: 'hnjrf2' }],
		['circle', { cx: '12', cy: '11', r: '4', key: '1gt34v' }],
	],
	RE = [
		[
			'path',
			{
				d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
				key: 'oel41y',
			},
		],
		['path', { d: 'm14.5 9.5-5 5', key: '17q4r4' }],
		['path', { d: 'm9.5 9.5 5 5', key: '18nt4w' }],
	],
	NE = [
		['circle', { cx: '12', cy: '12', r: '8', key: '46899m' }],
		['path', { d: 'M12 2v7.5', key: '1e5rl5' }],
		['path', { d: 'm19 5-5.23 5.23', key: '1ezxxf' }],
		['path', { d: 'M22 12h-7.5', key: 'le1719' }],
		['path', { d: 'm19 19-5.23-5.23', key: 'p3fmgn' }],
		['path', { d: 'M12 14.5V22', key: 'dgcmos' }],
		['path', { d: 'M10.23 13.77 5 19', key: 'qwopd4' }],
		['path', { d: 'M9.5 12H2', key: 'r7bup8' }],
		['path', { d: 'M10.23 10.23 5 5', key: 'k2y7lj' }],
		['circle', { cx: '12', cy: '12', r: '2.5', key: 'ix0uyj' }],
	],
	_E = [
		[
			'path',
			{
				d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
				key: 'oel41y',
			},
		],
	],
	HE = [
		[
			'path',
			{
				d: 'M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z',
				key: '1wgbhj',
			},
		],
	],
	OE = [
		['path', { d: 'M12 10.189V14', key: '1p8cqu' }],
		['path', { d: 'M12 2v3', key: 'qbqxhf' }],
		['path', { d: 'M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6', key: 'qpkstq' }],
		[
			'path',
			{
				d: 'M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76',
				key: '7tigtc',
			},
		],
		[
			'path',
			{
				d: 'M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
				key: '1924j5',
			},
		],
	],
	FE = [
		['path', { d: 'M16 10a4 4 0 0 1-8 0', key: '1ltviw' }],
		['path', { d: 'M3.103 6.034h17.794', key: 'awc11p' }],
		[
			'path',
			{
				d: 'M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z',
				key: 'o988cm',
			},
		],
	],
	jE = [
		['path', { d: 'm15 11-1 9', key: '5wnq3a' }],
		['path', { d: 'm19 11-4-7', key: 'cnml18' }],
		['path', { d: 'M2 11h20', key: '3eubbj' }],
		['path', { d: 'm3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4', key: 'yiazzp' }],
		['path', { d: 'M4.5 15.5h15', key: '13mye1' }],
		['path', { d: 'm5 11 4-7', key: '116ra9' }],
		['path', { d: 'm9 11 1 9', key: '1ojof7' }],
	],
	qE = [
		['circle', { cx: '8', cy: '21', r: '1', key: 'jimo8o' }],
		['circle', { cx: '19', cy: '21', r: '1', key: '13723u' }],
		[
			'path',
			{ d: 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12', key: '9zh506' },
		],
	],
	VE = [
		[
			'path',
			{
				d: 'M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z',
				key: '1gcedi',
			},
		],
		[
			'path',
			{
				d: 'M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z',
				key: 'pg9kv3',
			},
		],
		['path', { d: 'm9 15 7.879-7.878', key: '1o1zgh' }],
	],
	zE = [
		['path', { d: 'm4 4 2.5 2.5', key: 'uv2vmf' }],
		['path', { d: 'M13.5 6.5a4.95 4.95 0 0 0-7 7', key: 'frdkwv' }],
		['path', { d: 'M15 5 5 15', key: '1ag8rq' }],
		['path', { d: 'M14 17v.01', key: 'eokfpp' }],
		['path', { d: 'M10 16v.01', key: '14uyyl' }],
		['path', { d: 'M13 13v.01', key: '1v1k97' }],
		['path', { d: 'M16 10v.01', key: '5169yg' }],
		['path', { d: 'M11 20v.01', key: 'cj92p8' }],
		['path', { d: 'M17 14v.01', key: '11cswd' }],
		['path', { d: 'M20 11v.01', key: '19e0od' }],
	],
	BE = [
		[
			'path',
			{ d: 'M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5', key: '1eob4r' },
		],
		['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
		['path', { d: 'M10 22v-5', key: 'sfixh4' }],
		['path', { d: 'M14 19v-2', key: 'pdve8j' }],
		['path', { d: 'M18 20v-3', key: 'uox2gk' }],
		['path', { d: 'M2 13h20', key: '5evz65' }],
		['path', { d: 'M6 20v-3', key: 'c6pdcb' }],
	],
	UE = [
		['path', { d: 'M11 12h.01', key: '1lr4k6' }],
		['path', { d: 'M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1', key: 'fatpdi' }],
		[
			'path',
			{
				d: 'M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8',
				key: 'kehrqe',
			},
		],
		['path', { d: 'M14 8a8.5 8.5 0 0 1 0 8', key: '1imjx2' }],
		['path', { d: 'M16 16c2 0 4.5-4 4-6', key: 'z0nejz' }],
	],
	GE = [
		['path', { d: 'm15 15 6 6m-6-6v4.8m0-4.8h4.8', key: '17vawe' }],
		['path', { d: 'M9 19.8V15m0 0H4.2M9 15l-6 6', key: 'chjx8e' }],
		['path', { d: 'M15 4.2V9m0 0h4.8M15 9l6-6', key: 'lav6yq' }],
		['path', { d: 'M9 4.2V9m0 0H4.2M9 9 3 3', key: '1pxi2q' }],
	],
	WE = [
		['path', { d: 'M12 22v-5.172a2 2 0 0 0-.586-1.414L9.5 13.5', key: '1p17fm' }],
		['path', { d: 'M14.5 14.5 12 17', key: 'dy5w4y' }],
		['path', { d: 'M17 8.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0z', key: '6z7b3o' }],
	],
	$E = [
		['path', { d: 'm18 14 4 4-4 4', key: '10pe0f' }],
		['path', { d: 'm18 2 4 4-4 4', key: 'pucp1d' }],
		['path', { d: 'M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22', key: '1ailkh' }],
		['path', { d: 'M2 6h1.972a4 4 0 0 1 3.6 2.2', key: 'km57vx' }],
		['path', { d: 'M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45', key: 'os18l9' }],
	],
	ZE = [
		[
			'path',
			{
				d: 'M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2',
				key: 'wuwx1p',
			},
		],
	],
	QE = [
		['path', { d: 'M2 20h.01', key: '4haj6o' }],
		['path', { d: 'M7 20v-4', key: 'j294jx' }],
		['path', { d: 'M12 20v-8', key: 'i3yub9' }],
		['path', { d: 'M17 20V8', key: '1tkaf5' }],
	],
	XE = [
		['path', { d: 'M2 20h.01', key: '4haj6o' }],
		['path', { d: 'M7 20v-4', key: 'j294jx' }],
	],
	KE = [
		['path', { d: 'M2 20h.01', key: '4haj6o' }],
		['path', { d: 'M7 20v-4', key: 'j294jx' }],
		['path', { d: 'M12 20v-8', key: 'i3yub9' }],
	],
	YE = [['path', { d: 'M2 20h.01', key: '4haj6o' }]],
	JE = [
		['path', { d: 'M2 20h.01', key: '4haj6o' }],
		['path', { d: 'M7 20v-4', key: 'j294jx' }],
		['path', { d: 'M12 20v-8', key: 'i3yub9' }],
		['path', { d: 'M17 20V8', key: '1tkaf5' }],
		['path', { d: 'M22 4v16', key: 'sih9yq' }],
	],
	eT = [
		[
			'path',
			{
				d: 'm21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284',
				key: 'y32ogt',
			},
		],
		['path', { d: 'M3 21h18', key: 'itz85i' }],
	],
	tT = [
		['path', { d: 'M10 9H4L2 7l2-2h6', key: '1hq7x2' }],
		['path', { d: 'M14 5h6l2 2-2 2h-6', key: 'bv62ej' }],
		['path', { d: 'M10 22V4a2 2 0 1 1 4 0v18', key: 'eqpcf2' }],
		['path', { d: 'M8 22h8', key: 'rmew8v' }],
	],
	nT = [
		['path', { d: 'M12 13v8', key: '1l5pq0' }],
		['path', { d: 'M12 3v3', key: '1n5kay' }],
		[
			'path',
			{
				d: 'M18 6a2 2 0 0 1 1.387.56l2.307 2.22a1 1 0 0 1 0 1.44l-2.307 2.22A2 2 0 0 1 18 13H6a2 2 0 0 1-1.387-.56l-2.306-2.22a1 1 0 0 1 0-1.44l2.306-2.22A2 2 0 0 1 6 6z',
				key: 'gqqp9m',
			},
		],
	],
	aT = [
		['path', { d: 'M7 18v-6a5 5 0 1 1 10 0v6', key: 'pcx96s' }],
		['path', { d: 'M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z', key: '1b4s83' }],
		['path', { d: 'M21 12h1', key: 'jtio3y' }],
		['path', { d: 'M18.5 4.5 18 5', key: 'g5sp9y' }],
		['path', { d: 'M2 12h1', key: '1uaihz' }],
		['path', { d: 'M12 2v1', key: '11qlp1' }],
		['path', { d: 'm4.929 4.929.707.707', key: '1i51kw' }],
		['path', { d: 'M12 12v6', key: '3ahymv' }],
	],
	oT = [
		[
			'path',
			{
				d: 'M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z',
				key: '15892j',
			},
		],
		['path', { d: 'M3 20V4', key: '1ptbpl' }],
	],
	rT = [
		['path', { d: 'M21 4v16', key: '7j8fe9' }],
		[
			'path',
			{
				d: 'M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z',
				key: 'zs4d6',
			},
		],
	],
	iT = [
		['path', { d: 'm12.5 17-.5-1-.5 1h1z', key: '3me087' }],
		[
			'path',
			{
				d: 'M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z',
				key: '1o5pge',
			},
		],
		['circle', { cx: '15', cy: '12', r: '1', key: '1tmaij' }],
		['circle', { cx: '9', cy: '12', r: '1', key: '1vctgf' }],
	],
	sT = [
		['rect', { width: '3', height: '8', x: '13', y: '2', rx: '1.5', key: 'diqz80' }],
		['path', { d: 'M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5', key: '183iwg' }],
		['rect', { width: '3', height: '8', x: '8', y: '14', rx: '1.5', key: 'hqg7r1' }],
		['path', { d: 'M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5', key: '76g71w' }],
		['rect', { width: '8', height: '3', x: '14', y: '13', rx: '1.5', key: '1kmz0a' }],
		['path', { d: 'M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5', key: 'jc4sz0' }],
		['rect', { width: '8', height: '3', x: '2', y: '8', rx: '1.5', key: '1omvl4' }],
		['path', { d: 'M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5', key: '16f3cl' }],
	],
	cT = [['path', { d: 'M22 2 2 22', key: 'y4kqgn' }]],
	dT = [
		[
			'path',
			{
				d: 'M11 16.586V19a1 1 0 0 1-1 1H2L18.37 3.63a1 1 0 1 1 3 3l-9.663 9.663a1 1 0 0 1-1.414 0L8 14',
				key: '1sllp5',
			},
		],
	],
	lT = [
		['path', { d: 'M10 5H3', key: '1qgfaw' }],
		['path', { d: 'M12 19H3', key: 'yhmn1j' }],
		['path', { d: 'M14 3v4', key: '1sua03' }],
		['path', { d: 'M16 17v4', key: '1q0r14' }],
		['path', { d: 'M21 12h-9', key: '1o4lsq' }],
		['path', { d: 'M21 19h-5', key: '1rlt1p' }],
		['path', { d: 'M21 5h-7', key: '1oszz2' }],
		['path', { d: 'M8 10v4', key: 'tgpxqk' }],
		['path', { d: 'M8 12H3', key: 'a7s4jb' }],
	],
	uT = [
		['path', { d: 'M10 8h4', key: '1sr2af' }],
		['path', { d: 'M12 21v-9', key: '17s77i' }],
		['path', { d: 'M12 8V3', key: '13r4qs' }],
		['path', { d: 'M17 16h4', key: 'h1uq16' }],
		['path', { d: 'M19 12V3', key: 'o1uvq1' }],
		['path', { d: 'M19 21v-5', key: 'qua636' }],
		['path', { d: 'M3 14h4', key: 'bcjad9' }],
		['path', { d: 'M5 10V3', key: 'cb8scm' }],
		['path', { d: 'M5 21v-7', key: '1w1uti' }],
	],
	hT = [
		['rect', { width: '14', height: '20', x: '5', y: '2', rx: '2', ry: '2', key: '1yt0o3' }],
		['path', { d: 'M12.667 8 10 12h4l-2.667 4', key: 'h9lk2d' }],
	],
	pT = [
		['rect', { width: '7', height: '12', x: '2', y: '6', rx: '1', key: '5nje8w' }],
		['path', { d: 'M13 8.32a7.43 7.43 0 0 1 0 7.36', key: '1g306n' }],
		['path', { d: 'M16.46 6.21a11.76 11.76 0 0 1 0 11.58', key: 'uqvjvo' }],
		['path', { d: 'M19.91 4.1a15.91 15.91 0 0 1 .01 15.8', key: 'ujntz3' }],
	],
	yT = [
		['rect', { width: '14', height: '20', x: '5', y: '2', rx: '2', ry: '2', key: '1yt0o3' }],
		['path', { d: 'M12 18h.01', key: 'mhygvu' }],
	],
	fT = [
		['path', { d: 'M22 11v1a10 10 0 1 1-9-10', key: 'ew0xw9' }],
		['path', { d: 'M8 14s1.5 2 4 2 4-2 4-2', key: '1y1vjs' }],
		['line', { x1: '9', x2: '9.01', y1: '9', y2: '9', key: 'yxxnd0' }],
		['line', { x1: '15', x2: '15.01', y1: '9', y2: '9', key: '1p4y9e' }],
		['path', { d: 'M16 5h6', key: '1vod17' }],
		['path', { d: 'M19 2v6', key: '4bpg5p' }],
	],
	kT = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['path', { d: 'M8 14s1.5 2 4 2 4-2 4-2', key: '1y1vjs' }],
		['line', { x1: '9', x2: '9.01', y1: '9', y2: '9', key: 'yxxnd0' }],
		['line', { x1: '15', x2: '15.01', y1: '9', y2: '9', key: '1p4y9e' }],
	],
	gT = [
		['path', { d: 'M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0', key: 'hneq2s' }],
		['circle', { cx: '10', cy: '13', r: '8', key: '194lz3' }],
		['path', { d: 'M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6', key: 'ixqyt7' }],
		['path', { d: 'M18 3 19.1 5.2', key: '9tjm43' }],
		['path', { d: 'M22 3 20.9 5.2', key: 'j3odrs' }],
	],
	mT = [
		['path', { d: 'm10 20-1.25-2.5L6 18', key: '18frcb' }],
		['path', { d: 'M10 4 8.75 6.5 6 6', key: '7mghy3' }],
		['path', { d: 'm14 20 1.25-2.5L18 18', key: '1chtki' }],
		['path', { d: 'm14 4 1.25 2.5L18 6', key: '1b4wsy' }],
		['path', { d: 'm17 21-3-6h-4', key: '15hhxa' }],
		['path', { d: 'm17 3-3 6 1.5 3', key: '11697g' }],
		['path', { d: 'M2 12h6.5L10 9', key: 'kv9z4n' }],
		['path', { d: 'm20 10-1.5 2 1.5 2', key: '1swlpi' }],
		['path', { d: 'M22 12h-6.5L14 15', key: '1mxi28' }],
		['path', { d: 'm4 10 1.5 2L4 14', key: 'k9enpj' }],
		['path', { d: 'm7 21 3-6-1.5-3', key: 'j8hb9u' }],
		['path', { d: 'm7 3 3 6h4', key: '1otusx' }],
	],
	MT = [
		['path', { d: 'M10.5 2v4', key: '1xt6in' }],
		['path', { d: 'M14 2H7a2 2 0 0 0-2 2', key: 'e6xig3' }],
		[
			'path',
			{
				d: 'M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19',
				key: 'adq7uc',
			},
		],
		[
			'path',
			{ d: 'M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3', key: 't9hm96' },
		],
	],
	vT = [
		['path', { d: 'M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3', key: '1dgpiv' }],
		[
			'path',
			{
				d: 'M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z',
				key: 'xacw8m',
			},
		],
		['path', { d: 'M4 18v2', key: 'jwo5n2' }],
		['path', { d: 'M20 18v2', key: '1ar1qi' }],
		['path', { d: 'M12 4v9', key: 'oqhhn3' }],
	],
	IT = [
		['path', { d: 'M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z', key: '4rw317' }],
		['path', { d: 'M7 21h10', key: '1b0cd5' }],
		['path', { d: 'M19.5 12 22 6', key: 'shfsr5' }],
		['path', { d: 'M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62', key: 'rpc6vp' }],
		['path', { d: 'M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62', key: '1lf63m' }],
		['path', { d: 'M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62', key: '97tijn' }],
	],
	xT = [
		['path', { d: 'M11 2h2', key: 'isr7bz' }],
		['path', { d: 'm14.28 14-4.56 8', key: '4anwcf' }],
		['path', { d: 'm21 22-1.558-4H4.558', key: 'enk13h' }],
		['path', { d: 'M3 10v2', key: 'w8mti9' }],
		[
			'path',
			{
				d: 'M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z',
				key: 'pouggg',
			},
		],
		['path', { d: 'M7 2a4 4 0 0 1-4 4', key: '78s8of' }],
		['path', { d: 'm8.66 7.66 1.41 1.41', key: '1vaqj8' }],
	],
	wT = [['path', { d: 'M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1', key: 'lt2kga' }]],
	CT = [
		['path', { d: 'M12 18v4', key: 'jadmvz' }],
		[
			'path',
			{
				d: 'M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5',
				key: '1aw2pz',
			},
		],
	],
	LT = [
		[
			'path',
			{
				d: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z',
				key: '1s2grr',
			},
		],
	],
	bT = [
		[
			'path',
			{
				d: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z',
				key: '1s2grr',
			},
		],
		['path', { d: 'M20 2v4', key: '1rf3ol' }],
		['path', { d: 'M22 4h-4', key: 'gwowj6' }],
		['circle', { cx: '4', cy: '20', r: '2', key: '6kqj1y' }],
	],
	ST = [
		['rect', { width: '16', height: '20', x: '4', y: '2', rx: '2', key: '1nb95v' }],
		['path', { d: 'M12 6h.01', key: '1vi96p' }],
		['circle', { cx: '12', cy: '14', r: '4', key: '1jruaj' }],
		['path', { d: 'M12 14h.01', key: '1etili' }],
	],
	DT = [
		[
			'path',
			{
				d: 'M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20',
				key: '11atix',
			},
		],
		['path', { d: 'M19.8 17.8a7.5 7.5 0 0 0 .003-10.603', key: 'yol142' }],
		['path', { d: 'M17 15a3.5 3.5 0 0 0-.025-4.975', key: 'ssbmkc' }],
	],
	AT = [
		['path', { d: 'm6 16 6-12 6 12', key: '1b4byz' }],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
		[
			'path',
			{
				d: 'M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1',
				key: '8mdmtu',
			},
		],
	],
	ET = [
		['path', { d: 'm6 16 6-12 6 12', key: '1b4byz' }],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
		['path', { d: 'm16 20 2 2 4-4', key: '13tcca' }],
	],
	TT = [
		[
			'path',
			{
				d: 'M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z',
				key: 'xwnzip',
			},
		],
		['path', { d: 'M5 17A12 12 0 0 1 17 5', key: '1okkup' }],
		['circle', { cx: '19', cy: '5', r: '2', key: 'mhkx31' }],
		['circle', { cx: '5', cy: '19', r: '2', key: 'v8kfzx' }],
	],
	PT = [
		['circle', { cx: '19', cy: '5', r: '2', key: 'mhkx31' }],
		['circle', { cx: '5', cy: '19', r: '2', key: 'v8kfzx' }],
		['path', { d: 'M5 17A12 12 0 0 1 17 5', key: '1okkup' }],
	],
	RT = [
		['path', { d: 'M16 3h5v5', key: '1806ms' }],
		['path', { d: 'M8 3H3v5', key: '15dfkv' }],
		['path', { d: 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3', key: '1qrqzj' }],
		['path', { d: 'm15 9 6-6', key: 'ko1vev' }],
	],
	NT = [
		[
			'path',
			{
				d: 'M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66',
				key: '13vns8',
			},
		],
		[
			'path',
			{
				d: 'm7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178',
				key: 's8x3u0',
			},
		],
	],
	_T = [
		['path', { d: 'M15.295 19.562 16 22', key: '31jsb7' }],
		['path', { d: 'm17 16 3.758 2.098', key: '121ar7' }],
		['path', { d: 'm19 12.5 3.026-.598', key: '19ukd3' }],
		[
			'path',
			{
				d: 'M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z',
				key: 'lwb9l9',
			},
		],
		['path', { d: 'M8 9V2', key: '1xa0v7' }],
	],
	HT = [
		['path', { d: 'M3 3h.01', key: '159qn6' }],
		['path', { d: 'M7 5h.01', key: '1hq22a' }],
		['path', { d: 'M11 7h.01', key: '1osv80' }],
		['path', { d: 'M3 7h.01', key: '1xzrh3' }],
		['path', { d: 'M7 9h.01', key: '19b3jx' }],
		['path', { d: 'M3 11h.01', key: '1eifu7' }],
		['rect', { width: '4', height: '4', x: '15', y: '5', key: 'mri9e4' }],
		['path', { d: 'm19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2', key: 'aib6hk' }],
		['path', { d: 'm13 14 8-2', key: '1d7bmk' }],
		['path', { d: 'm13 19 8-2', key: '1y2vml' }],
	],
	OT = [
		[
			'path',
			{
				d: 'M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3',
				key: '139s4v',
			},
		],
		['path', { d: 'M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4', key: '1dlkgp' }],
		['path', { d: 'M5 21h14', key: '11awu3' }],
	],
	FT = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M17 12h-2l-2 5-2-10-2 5H7', key: '15hlnc' }],
	],
	jT = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'm16 8-8 8', key: '166keh' }],
		['path', { d: 'M16 16H8V8', key: '1w2ppm' }],
	],
	qT = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'm8 8 8 8', key: '1imecy' }],
		['path', { d: 'M16 8v8H8', key: '1lbpgo' }],
	],
	VT = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M12 8v8', key: 'napkw2' }],
		['path', { d: 'm8 12 4 4 4-4', key: 'k98ssh' }],
	],
	zT = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'm12 8-4 4 4 4', key: '15vm53' }],
		['path', { d: 'M16 12H8', key: '1fr5h0' }],
	],
	BT = [
		['path', { d: 'M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6', key: '14rsvq' }],
		['path', { d: 'm21 21-9-9', key: '1et2py' }],
		['path', { d: 'M21 15v6h-6', key: '1jko0i' }],
	],
	UT = [
		['path', { d: 'M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6', key: '14qz4y' }],
		['path', { d: 'm3 21 9-9', key: '1jfql5' }],
		['path', { d: 'M9 21H3v-6', key: 'wtvkvv' }],
	],
	GT = [
		['path', { d: 'M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6', key: '14mv1t' }],
		['path', { d: 'm3 3 9 9', key: 'rks13r' }],
		['path', { d: 'M3 9V3h6', key: 'ira0h2' }],
	],
	WT = [
		['path', { d: 'M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6', key: 'y09zxi' }],
		['path', { d: 'm21 3-9 9', key: 'mpx6sq' }],
		['path', { d: 'M15 3h6v6', key: '1q9fwt' }],
	],
	$T = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
		['path', { d: 'm12 16 4-4-4-4', key: '1i9zcv' }],
	],
	ZT = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M8 16V8h8', key: '19xb1h' }],
		['path', { d: 'M16 16 8 8', key: '1qdy8n' }],
	],
	QT = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M8 8h8v8', key: 'b65dnt' }],
		['path', { d: 'm8 16 8-8', key: '13b9ih' }],
	],
	XT = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'm16 12-4-4-4 4', key: '177agl' }],
		['path', { d: 'M12 16V8', key: '1sbj14' }],
	],
	KT = [
		['line', { x1: '5', y1: '3', x2: '19', y2: '3', key: 'x74652' }],
		['line', { x1: '3', y1: '5', x2: '3', y2: '19', key: '31ivqu' }],
		['line', { x1: '21', y1: '5', x2: '21', y2: '19', key: '1am4cd' }],
		['line', { x1: '9', y1: '21', x2: '10', y2: '21', key: 'sb02er' }],
		['line', { x1: '14', y1: '21', x2: '15', y2: '21', key: '1bvb1m' }],
		['path', { d: 'M 3 5 A2 2 0 0 1 5 3', key: 'dbypyf' }],
		['path', { d: 'M 19 3 A2 2 0 0 1 21 5', key: 'y6haui' }],
		['path', { d: 'M 5 21 A2 2 0 0 1 3 19', key: 'kb75wq' }],
		['path', { d: 'M 21 19 A2 2 0 0 1 19 21', key: '1p3zbf' }],
		['circle', { cx: '8.5', cy: '8.5', r: '1.5', key: 'cn5opk' }],
		['line', { x1: '9.56066', y1: '9.56066', x2: '12', y2: '12', key: 'mksg6j' }],
		['line', { x1: '17', y1: '17', x2: '14.82', y2: '14.82', key: '1lwi1d' }],
		['circle', { cx: '8.5', cy: '15.5', r: '1.5', key: '12hfy1' }],
		['line', { x1: '9.56066', y1: '14.43934', x2: '17', y2: '7', key: '4jyfgs' }],
	],
	YT = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M12 8v8', key: 'napkw2' }],
		['path', { d: 'm8.5 14 7-4', key: '12hpby' }],
		['path', { d: 'm8.5 10 7 4', key: 'wwy2dy' }],
	],
	JT = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M9 8h7', key: 'kbo1nt' }],
		['path', { d: 'M8 12h6', key: 'ikassy' }],
		['path', { d: 'M11 16h5', key: 'oq65wt' }],
	],
	eP = [
		['path', { d: 'M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344', key: '2acyp4' }],
		['path', { d: 'm9 11 3 3L22 4', key: '1pflzl' }],
	],
	tP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'm9 12 2 2 4-4', key: 'dzmm74' }],
	],
	nP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'm16 10-4 4-4-4', key: '894hmk' }],
	],
	aP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'm14 16-4-4 4-4', key: 'ojs7w8' }],
	],
	oP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'm10 8 4 4-4 4', key: '1wy4r4' }],
	],
	rP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'm8 14 4-4 4 4', key: 'fy2ptz' }],
	],
	iP = [
		['path', { d: 'm10 9-3 3 3 3', key: '1oro0q' }],
		['path', { d: 'm14 15 3-3-3-3', key: 'bz13h7' }],
		['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', key: 'h1oib' }],
	],
	sP = [
		['path', { d: 'M10 9.5 8 12l2 2.5', key: '3mjy60' }],
		['path', { d: 'M14 21h1', key: 'v9vybs' }],
		['path', { d: 'm14 9.5 2 2.5-2 2.5', key: '1bir2l' }],
		['path', { d: 'M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2', key: 'as5y1o' }],
		['path', { d: 'M9 21h1', key: '15o7lz' }],
	],
	cP = [
		['path', { d: 'M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2', key: 'as5y1o' }],
		['path', { d: 'M9 21h1', key: '15o7lz' }],
		['path', { d: 'M14 21h1', key: 'v9vybs' }],
	],
	dP = [
		['path', { d: 'M8 7v7', key: '1x2jlm' }],
		['path', { d: 'M12 7v4', key: 'xawao1' }],
		['path', { d: 'M16 7v9', key: '1hp2iy' }],
		['path', { d: 'M5 3a2 2 0 0 0-2 2', key: 'y57alp' }],
		['path', { d: 'M9 3h1', key: '1yesri' }],
		['path', { d: 'M14 3h1', key: '1ec4yj' }],
		['path', { d: 'M19 3a2 2 0 0 1 2 2', key: '18rm91' }],
		['path', { d: 'M21 9v1', key: 'mxsmne' }],
		['path', { d: 'M21 14v1', key: '169vum' }],
		['path', { d: 'M21 19a2 2 0 0 1-2 2', key: '1j7049' }],
		['path', { d: 'M14 21h1', key: 'v9vybs' }],
		['path', { d: 'M9 21h1', key: '15o7lz' }],
		['path', { d: 'M5 21a2 2 0 0 1-2-2', key: 'sbafld' }],
		['path', { d: 'M3 14v1', key: 'vnatye' }],
		['path', { d: 'M3 9v1', key: '1r0deq' }],
	],
	lP = [
		[
			'path',
			{
				d: 'M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z',
				key: 'xwnzip',
			},
		],
		['path', { d: 'M5 3a2 2 0 0 0-2 2', key: 'y57alp' }],
		['path', { d: 'M19 3a2 2 0 0 1 2 2', key: '18rm91' }],
		['path', { d: 'M5 21a2 2 0 0 1-2-2', key: 'sbafld' }],
		['path', { d: 'M9 3h1', key: '1yesri' }],
		['path', { d: 'M9 21h2', key: '1qve2z' }],
		['path', { d: 'M14 3h1', key: '1ec4yj' }],
		['path', { d: 'M3 9v1', key: '1r0deq' }],
		['path', { d: 'M21 9v2', key: 'p14lih' }],
		['path', { d: 'M3 14v1', key: 'vnatye' }],
	],
	uP = [
		['path', { d: 'M14 21h1', key: 'v9vybs' }],
		['path', { d: 'M21 14v1', key: '169vum' }],
		['path', { d: 'M21 19a2 2 0 0 1-2 2', key: '1j7049' }],
		['path', { d: 'M21 9v1', key: 'mxsmne' }],
		['path', { d: 'M3 14v1', key: 'vnatye' }],
		['path', { d: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2', key: '89voep' }],
		['path', { d: 'M3 9v1', key: '1r0deq' }],
		['path', { d: 'M5 21a2 2 0 0 1-2-2', key: 'sbafld' }],
		['path', { d: 'M9 21h1', key: '15o7lz' }],
	],
	hP = [
		['path', { d: 'M5 3a2 2 0 0 0-2 2', key: 'y57alp' }],
		['path', { d: 'M19 3a2 2 0 0 1 2 2', key: '18rm91' }],
		['path', { d: 'M21 19a2 2 0 0 1-2 2', key: '1j7049' }],
		['path', { d: 'M5 21a2 2 0 0 1-2-2', key: 'sbafld' }],
		['path', { d: 'M9 3h1', key: '1yesri' }],
		['path', { d: 'M9 21h1', key: '15o7lz' }],
		['path', { d: 'M14 3h1', key: '1ec4yj' }],
		['path', { d: 'M14 21h1', key: 'v9vybs' }],
		['path', { d: 'M3 9v1', key: '1r0deq' }],
		['path', { d: 'M21 9v1', key: 'mxsmne' }],
		['path', { d: 'M3 14v1', key: 'vnatye' }],
		['path', { d: 'M21 14v1', key: '169vum' }],
	],
	pP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
		['line', { x1: '8', x2: '16', y1: '12', y2: '12', key: '1jonct' }],
		['line', { x1: '12', x2: '12', y1: '16', y2: '16', key: 'aqc6ln' }],
		['line', { x1: '12', x2: '12', y1: '8', y2: '8', key: '1mkcni' }],
	],
	yP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
	],
	fP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M7 10h10', key: '1101jm' }],
		['path', { d: 'M7 14h10', key: '1mhdw3' }],
	],
	kP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
		['path', { d: 'M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3', key: 'm1af9g' }],
		['path', { d: 'M9 11.2h5.7', key: '3zgcl2' }],
	],
	gP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M8 7v7', key: '1x2jlm' }],
		['path', { d: 'M12 7v4', key: 'xawao1' }],
		['path', { d: 'M16 7v9', key: '1hp2iy' }],
	],
	mP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M7 7v10', key: 'd5nglc' }],
		['path', { d: 'M11 7v10', key: 'pptsnr' }],
		['path', { d: 'm15 7 2 10', key: '1m7qm5' }],
	],
	MP = [
		[
			'path',
			{ d: 'M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16', key: '1ywlsj' },
		],
		['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', key: 'h1oib' }],
	],
	vP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M7 8h10', key: '1jw688' }],
		['path', { d: 'M7 12h10', key: 'b7w52i' }],
		['path', { d: 'M7 16h10', key: 'wp8him' }],
	],
	IP = [
		[
			'path',
			{
				d: 'M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z',
				key: 'xwnzip',
			},
		],
		['path', { d: 'M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6', key: '14rsvq' }],
	],
	xP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
	],
	wP = [
		['path', { d: 'M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41', key: '9l1ft6' }],
		['path', { d: 'M3 8.7V19a2 2 0 0 0 2 2h10.3', key: '17knke' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M13 13a3 3 0 1 0 0-6H9v2', key: 'uoagbd' }],
		['path', { d: 'M9 17v-2.3', key: '1jxgo2' }],
	],
	CP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M9 17V7h4a3 3 0 0 1 0 6H9', key: '1dfk2c' }],
	],
	LP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['line', { x1: '10', x2: '10', y1: '15', y2: '9', key: 'c1nkhi' }],
		['line', { x1: '14', x2: '14', y1: '15', y2: '9', key: 'h65svq' }],
	],
	bP = [
		['path', { d: 'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7', key: '1m0v6g' }],
		[
			'path',
			{
				d: 'M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z',
				key: 'ohrbg2',
			},
		],
	],
	SP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'm15 9-6 6', key: '1uzhvr' }],
		['path', { d: 'M9 9h.01', key: '1q5me6' }],
		['path', { d: 'M15 15h.01', key: 'lqbp3k' }],
	],
	DP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M7 7h10', key: 'udp07y' }],
		['path', { d: 'M10 7v10', key: 'i1d9ee' }],
		['path', { d: 'M16 17a2 2 0 0 1-2-2V7', key: 'ftwdc7' }],
	],
	AP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M12 12H9.5a2.5 2.5 0 0 1 0-5H17', key: '1l9586' }],
		['path', { d: 'M12 7v10', key: 'jspqdw' }],
		['path', { d: 'M16 7v10', key: 'lavkr4' }],
	],
	EP = [
		['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', key: 'h1oib' }],
		[
			'path',
			{
				d: 'M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z',
				key: 'kmsa83',
			},
		],
	],
	TP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
		['path', { d: 'M12 8v8', key: 'napkw2' }],
	],
	PP = [
		['path', { d: 'M12 7v4', key: 'xawao1' }],
		['path', { d: 'M7.998 9.003a5 5 0 1 0 8-.005', key: '1pek45' }],
		['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', key: 'h1oib' }],
	],
	RP = [
		['path', { d: 'M7 12h2l2 5 2-10h4', key: '1fxv6h' }],
		['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', key: 'h1oib' }],
	],
	NP = [
		['path', { d: 'M21 11a8 8 0 0 0-8-8', key: '1lxwo5' }],
		['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', key: '1dv2y5' }],
	],
	_P = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['circle', { cx: '8.5', cy: '8.5', r: '1.5', key: 'cn5opk' }],
		['line', { x1: '9.56066', y1: '9.56066', x2: '12', y2: '12', key: 'mksg6j' }],
		['line', { x1: '17', y1: '17', x2: '14.82', y2: '14.82', key: '1lwi1d' }],
		['circle', { cx: '8.5', cy: '15.5', r: '1.5', key: '12hfy1' }],
		['line', { x1: '9.56066', y1: '14.43934', x2: '17', y2: '7', key: '4jyfgs' }],
	],
	HP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M16 8.9V7H8l4 5-4 5h8v-1.9', key: '9nih0i' }],
	],
	OP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['line', { x1: '9', x2: '15', y1: '15', y2: '9', key: '1dfufj' }],
	],
	FP = [
		['path', { d: 'M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3', key: 'lubmu8' }],
		['path', { d: 'M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3', key: '1ag34g' }],
		['line', { x1: '12', x2: '12', y1: '4', y2: '20', key: '1tx1rr' }],
	],
	jP = [
		['path', { d: 'M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3', key: '1pi83i' }],
		['path', { d: 'M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3', key: 'ido5k7' }],
		['line', { x1: '4', x2: '20', y1: '12', y2: '12', key: '1e0a9i' }],
	],
	qP = [
		['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', key: 'h1oib' }],
		['rect', { x: '8', y: '8', width: '8', height: '8', rx: '1', key: 'z9xiuo' }],
	],
	VP = [
		['path', { d: 'M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2', key: '4i38lg' }],
		['path', { d: 'M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2', key: 'mlte4a' }],
		['rect', { width: '8', height: '8', x: '14', y: '14', rx: '2', key: '1fa9i4' }],
	],
	zP = [
		[
			'path',
			{
				d: 'M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z',
				key: '13edca',
			},
		],
		['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', key: 'h1oib' }],
	],
	BP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['rect', { x: '9', y: '9', width: '6', height: '6', rx: '1', key: '1ssd4o' }],
	],
	UP = [
		['path', { d: 'm7 11 2-2-2-2', key: '1lz0vl' }],
		['path', { d: 'M11 13h4', key: '1p7l4v' }],
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
	],
	GP = [
		['path', { d: 'M18 21a6 6 0 0 0-12 0', key: 'kaz2du' }],
		['circle', { cx: '12', cy: '11', r: '4', key: '1gt34v' }],
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
	],
	WP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['circle', { cx: '12', cy: '10', r: '3', key: 'ilqhr7' }],
		['path', { d: 'M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2', key: '1m6ac2' }],
	],
	$P = [['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }]],
	ZP = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
		['path', { d: 'm15 9-6 6', key: '1uzhvr' }],
		['path', { d: 'm9 9 6 6', key: 'z0biqf' }],
	],
	QP = [
		[
			'path',
			{
				d: 'M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0',
				key: '1mcohs',
			},
		],
		[
			'path',
			{
				d: 'M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2',
				key: '1r1efp',
			},
		],
	],
	XP = [
		['path', { d: 'M10 22a2 2 0 0 1-2-2', key: 'i7yj1i' }],
		['path', { d: 'M14 2a2 2 0 0 1 2 2', key: '170a0m' }],
		['path', { d: 'M16 22h-2', key: '18d249' }],
		['path', { d: 'M2 10V8', key: '7yj4fe' }],
		['path', { d: 'M2 4a2 2 0 0 1 2-2', key: 'ddgnws' }],
		['path', { d: 'M20 8a2 2 0 0 1 2 2', key: '1770vt' }],
		['path', { d: 'M22 14v2', key: 'iot8ja' }],
		['path', { d: 'M22 20a2 2 0 0 1-2 2', key: 'qj8q6g' }],
		['path', { d: 'M4 16a2 2 0 0 1-2-2', key: '1dnafg' }],
		['path', { d: 'M8 10a2 2 0 0 1 2-2h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H9a1 1 0 0 1-1-1z', key: 'ci6f0b' }],
		['path', { d: 'M8 2h2', key: '1gmkwm' }],
	],
	KP = [
		['path', { d: 'M10 22a2 2 0 0 1-2-2', key: 'i7yj1i' }],
		['path', { d: 'M16 22h-2', key: '18d249' }],
		[
			'path',
			{
				d: 'M16 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-5a2 2 0 0 1 2-2h5a1 1 0 0 0 1-1z',
				key: '1njgbb',
			},
		],
		['path', { d: 'M20 8a2 2 0 0 1 2 2', key: '1770vt' }],
		['path', { d: 'M22 14v2', key: 'iot8ja' }],
		['path', { d: 'M22 20a2 2 0 0 1-2 2', key: 'qj8q6g' }],
	],
	YP = [
		[
			'path',
			{
				d: 'M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1z',
				key: '17jnth',
			},
		],
	],
	JP = [
		['path', { d: 'M13.77 3.043a34 34 0 0 0-3.54 0', key: '1oaobr' }],
		['path', { d: 'M13.771 20.956a33 33 0 0 1-3.541.001', key: '95iq0j' }],
		['path', { d: 'M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44', key: '1u6qty' }],
		['path', { d: 'M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438', key: '1ew6g6' }],
		['path', { d: 'M20.957 10.23a33 33 0 0 1 0 3.54', key: '1l9npr' }],
		['path', { d: 'M3.043 10.23a34 34 0 0 0 .001 3.541', key: '1it6jm' }],
		['path', { d: 'M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438', key: '14uchd' }],
		['path', { d: 'M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44', key: '8k4agb' }],
	],
	eR = [['path', { d: 'M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9', key: 'garfkc' }]],
	tR = [
		['path', { d: 'M15.236 22a3 3 0 0 0-2.2-5', key: '21bitc' }],
		['path', { d: 'M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4', key: 'oh0fg0' }],
		['path', { d: 'M18 13h.01', key: '9veqaj' }],
		[
			'path',
			{
				d: 'M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10',
				key: '980v8a',
			},
		],
	],
	nR = [
		['path', { d: 'M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13', key: 'i9gjdv' }],
		[
			'path',
			{
				d: 'M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z',
				key: '1vzg3v',
			},
		],
		['path', { d: 'M5 22h14', key: 'ehvnwv' }],
	],
	aR = [
		[
			'path',
			{
				d: 'M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2',
				key: '2ksp49',
			},
		],
	],
	oR = [
		['path', { d: 'M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43', key: '16m0ql' }],
		['path', { d: 'M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91', key: '1vt8nq' }],
		['line', { x1: '2', x2: '22', y1: '2', y2: '22', key: 'a6p6uj' }],
	],
	rR = [
		[
			'path',
			{
				d: 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z',
				key: 'r04s7s',
			},
		],
	],
	iR = [
		[
			'path',
			{
				d: 'M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z',
				key: '19qhus',
			},
		],
		['path', { d: 'M21 20V4', key: 'cb8qj8' }],
	],
	sR = [
		[
			'path',
			{
				d: 'M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z',
				key: '1ystz2',
			},
		],
		['path', { d: 'M3 4v16', key: '1ph11n' }],
	],
	cR = [
		['path', { d: 'M11 2v2', key: '1539x4' }],
		['path', { d: 'M5 2v2', key: '1yf1q8' }],
		['path', { d: 'M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1', key: 'rb5t3r' }],
		['path', { d: 'M8 15a6 6 0 0 0 12 0v-3', key: 'x18d4x' }],
		['circle', { cx: '20', cy: '10', r: '2', key: 'ts1r5v' }],
	],
	dR = [
		[
			'path',
			{
				d: 'M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z',
				key: '1dfntj',
			},
		],
		['path', { d: 'M15 3v5a1 1 0 0 0 1 1h5', key: '6s6qgf' }],
		['path', { d: 'M8 13h.01', key: '1sbv64' }],
		['path', { d: 'M16 13h.01', key: 'wip0gl' }],
		['path', { d: 'M10 16s.8 1 2 1c1.3 0 2-1 2-1', key: '1vvgv3' }],
	],
	lR = [
		[
			'path',
			{
				d: 'M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z',
				key: '1dfntj',
			},
		],
		['path', { d: 'M15 3v5a1 1 0 0 0 1 1h5', key: '6s6qgf' }],
	],
	uR = [
		[
			'path',
			{
				d: 'M11.264 2.205A4 4 0 0 0 6.42 4.211l-4 8a4 4 0 0 0 1.359 5.117l6 4a4 4 0 0 0 4.438 0l6-4a4 4 0 0 0 1.576-4.592l-2-6a4 4 0 0 0-2.53-2.53z',
				key: '1si4ox',
			},
		],
		['path', { d: 'M11.99 22 14 12l7.822 3.184', key: '1u8to0' }],
		['path', { d: 'M14 12 8.47 2.302', key: 'guo3d5' }],
	],
	hR = [
		['path', { d: 'M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5', key: 'slp6dd' }],
		[
			'path',
			{
				d: 'M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244',
				key: 'o0xfot',
			},
		],
		['path', { d: 'M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05', key: 'wn3emo' }],
	],
	pR = [
		['rect', { width: '6', height: '20', x: '4', y: '2', rx: '2', key: '19qu7m' }],
		['rect', { width: '6', height: '20', x: '14', y: '2', rx: '2', key: '24v0nk' }],
	],
	yR = [
		['rect', { width: '20', height: '6', x: '2', y: '4', rx: '2', key: 'qdearl' }],
		['rect', { width: '20', height: '6', x: '2', y: '14', rx: '2', key: '1xrn6j' }],
	],
	fR = [
		['path', { d: 'M16 4H9a3 3 0 0 0-2.83 4', key: '43sutm' }],
		['path', { d: 'M14 12a4 4 0 0 1 0 8H6', key: 'nlfj13' }],
		['line', { x1: '4', x2: '20', y1: '12', y2: '12', key: '1e0a9i' }],
	],
	kR = [
		['path', { d: 'm4 5 8 8', key: '1eunvl' }],
		['path', { d: 'm12 5-8 8', key: '1ah0jp' }],
		[
			'path',
			{
				d: 'M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07',
				key: 'e8ta8j',
			},
		],
	],
	gR = [
		['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
		['path', { d: 'M12 4h.01', key: '1ujb9j' }],
		['path', { d: 'M20 12h.01', key: '1ykeid' }],
		['path', { d: 'M12 20h.01', key: 'zekei9' }],
		['path', { d: 'M4 12h.01', key: '158zrr' }],
		['path', { d: 'M17.657 6.343h.01', key: '31pqzk' }],
		['path', { d: 'M17.657 17.657h.01', key: 'jehnf4' }],
		['path', { d: 'M6.343 17.657h.01', key: 'gdk6ow' }],
		['path', { d: 'M6.343 6.343h.01', key: '1uurf0' }],
	],
	mR = [
		['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
		['path', { d: 'M12 3v1', key: '1asbbs' }],
		['path', { d: 'M12 20v1', key: '1wcdkc' }],
		['path', { d: 'M3 12h1', key: 'lp3yf2' }],
		['path', { d: 'M20 12h1', key: '1vloll' }],
		['path', { d: 'm18.364 5.636-.707.707', key: '1hakh0' }],
		['path', { d: 'm6.343 17.657-.707.707', key: '18m9nf' }],
		['path', { d: 'm5.636 5.636.707.707', key: '1xv1c5' }],
		['path', { d: 'm17.657 17.657.707.707', key: 'vl76zb' }],
	],
	MR = [
		['path', { d: 'M12 2v2', key: 'tus03m' }],
		[
			'path',
			{
				d: 'M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715',
				key: 'xlf6rm',
			},
		],
		['path', { d: 'M16 12a4 4 0 0 0-4-4', key: '6vsxu' }],
		['path', { d: 'm19 5-1.256 1.256', key: '1yg6a6' }],
		['path', { d: 'M20 12h2', key: '1q8mjw' }],
	],
	vR = [
		['path', { d: 'M10 21v-1', key: '1u8rkd' }],
		['path', { d: 'M10 4V3', key: 'pkzwkn' }],
		['path', { d: 'M10 9a3 3 0 0 0 0 6', key: 'gv75dk' }],
		['path', { d: 'm14 20 1.25-2.5L18 18', key: '1chtki' }],
		['path', { d: 'm14 4 1.25 2.5L18 6', key: '1b4wsy' }],
		['path', { d: 'm17 21-3-6 1.5-3H22', key: 'o5qa3v' }],
		['path', { d: 'm17 3-3 6 1.5 3', key: '11697g' }],
		['path', { d: 'M2 12h1', key: '1uaihz' }],
		['path', { d: 'm20 10-1.5 2 1.5 2', key: '1swlpi' }],
		['path', { d: 'm3.64 18.36.7-.7', key: '105rm9' }],
		['path', { d: 'm4.34 6.34-.7-.7', key: 'd3unjp' }],
	],
	IR = [
		['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
		['path', { d: 'M12 2v2', key: 'tus03m' }],
		['path', { d: 'M12 20v2', key: '1lh1kg' }],
		['path', { d: 'm4.93 4.93 1.41 1.41', key: '149t6j' }],
		['path', { d: 'm17.66 17.66 1.41 1.41', key: 'ptbguv' }],
		['path', { d: 'M2 12h2', key: '1t8f8n' }],
		['path', { d: 'M20 12h2', key: '1q8mjw' }],
		['path', { d: 'm6.34 17.66-1.41 1.41', key: '1m8zz5' }],
		['path', { d: 'm19.07 4.93-1.41 1.41', key: '1shlcs' }],
	],
	xR = [
		['path', { d: 'M12 2v8', key: '1q4o3n' }],
		['path', { d: 'm4.93 10.93 1.41 1.41', key: '2a7f42' }],
		['path', { d: 'M2 18h2', key: 'j10viu' }],
		['path', { d: 'M20 18h2', key: 'wocana' }],
		['path', { d: 'm19.07 10.93-1.41 1.41', key: '15zs5n' }],
		['path', { d: 'M22 22H2', key: '19qnx5' }],
		['path', { d: 'm8 6 4-4 4 4', key: 'ybng9g' }],
		['path', { d: 'M16 18a4 4 0 0 0-8 0', key: '1lzouq' }],
	],
	wR = [
		['path', { d: 'M12 10V2', key: '16sf7g' }],
		['path', { d: 'm4.93 10.93 1.41 1.41', key: '2a7f42' }],
		['path', { d: 'M2 18h2', key: 'j10viu' }],
		['path', { d: 'M20 18h2', key: 'wocana' }],
		['path', { d: 'm19.07 10.93-1.41 1.41', key: '15zs5n' }],
		['path', { d: 'M22 22H2', key: '19qnx5' }],
		['path', { d: 'm16 6-4 4-4-4', key: '6wukr' }],
		['path', { d: 'M16 18a4 4 0 0 0-8 0', key: '1lzouq' }],
	],
	CR = [
		['path', { d: 'm4 19 8-8', key: 'hr47gm' }],
		['path', { d: 'm12 19-8-8', key: '1dhhmo' }],
		[
			'path',
			{
				d: 'M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06',
				key: '1dfcux',
			},
		],
	],
	LR = [
		['path', { d: 'M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z', key: '1ldrpk' }],
		['path', { d: 'M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7', key: '11i5po' }],
		['path', { d: 'M 7 17h.01', key: '1euzgo' }],
		[
			'path',
			{ d: 'm11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8', key: 'o2gii7' },
		],
	],
	bR = [
		['path', { d: 'M10 21V3h8', key: 'br2l0g' }],
		['path', { d: 'M6 16h9', key: '2py0wn' }],
		['path', { d: 'M10 9.5h7', key: '13dmhz' }],
	],
	SR = [
		['path', { d: 'M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5', key: 'mtk2lu' }],
		['path', { d: 'M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5', key: '120jsl' }],
		['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
		['path', { d: 'm18 22-3-3 3-3', key: 'kgdoj7' }],
		['path', { d: 'm6 2 3 3-3 3', key: '1fnbkv' }],
	],
	DR = [
		['path', { d: 'm11 19-6-6', key: 's7kpr' }],
		['path', { d: 'm5 21-2-2', key: '1kw20b' }],
		['path', { d: 'm8 16-4 4', key: '1oqv8h' }],
		['path', { d: 'M9.5 17.5 21 6V3h-3L6.5 14.5', key: 'pkxemp' }],
	],
	AR = [
		['polyline', { points: '14.5 17.5 3 6 3 3 6 3 17.5 14.5', key: '1hfsw2' }],
		['line', { x1: '13', x2: '19', y1: '19', y2: '13', key: '1vrmhu' }],
		['line', { x1: '16', x2: '20', y1: '16', y2: '20', key: '1bron3' }],
		['line', { x1: '19', x2: '21', y1: '21', y2: '19', key: '13pww6' }],
		['polyline', { points: '14.5 6.5 18 3 21 3 21 6 17.5 9.5', key: 'hbey2j' }],
		['line', { x1: '5', x2: '9', y1: '14', y2: '18', key: '1hf58s' }],
		['line', { x1: '7', x2: '4', y1: '17', y2: '20', key: 'pidxm4' }],
		['line', { x1: '3', x2: '5', y1: '19', y2: '21', key: '1pehsh' }],
	],
	ER = [
		['path', { d: 'm18 2 4 4', key: '22kx64' }],
		['path', { d: 'm17 7 3-3', key: '1w1zoj' }],
		['path', { d: 'M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5', key: '1exhtz' }],
		['path', { d: 'm9 11 4 4', key: 'rovt3i' }],
		['path', { d: 'm5 19-3 3', key: '59f2uf' }],
		['path', { d: 'm14 4 6 6', key: 'yqp9t2' }],
	],
	TR = [
		['path', { d: 'M12 21v-6', key: 'lihzve' }],
		['path', { d: 'M12 9V3', key: 'da5inc' }],
		['path', { d: 'M3 15h18', key: '5xshup' }],
		['path', { d: 'M3 9h18', key: '1pudct' }],
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
	],
	PR = [
		[
			'path',
			{
				d: 'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18',
				key: 'gugj83',
			},
		],
	],
	RR = [
		['path', { d: 'M12 15V9', key: '8c7uyn' }],
		['path', { d: 'M3 15h18', key: '5xshup' }],
		['path', { d: 'M3 9h18', key: '1pudct' }],
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
	],
	NR = [
		['path', { d: 'M14 14v2', key: 'w2a1xv' }],
		['path', { d: 'M14 20v2', key: '1lq872' }],
		['path', { d: 'M14 2v2', key: '6buw04' }],
		['path', { d: 'M14 8v2', key: 'i67w9a' }],
		['path', { d: 'M2 15h8', key: '82wtch' }],
		['path', { d: 'M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2', key: 'up0l64' }],
		['path', { d: 'M2 9h8', key: 'yelfik' }],
		['path', { d: 'M22 15h-4', key: '1es58f' }],
		['path', { d: 'M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2', key: 'pdjoqf' }],
		['path', { d: 'M22 9h-4', key: '1luja7' }],
		['path', { d: 'M5 3v18', key: '14hmio' }],
	],
	_R = [
		['path', { d: 'M16 5H3', key: 'm91uny' }],
		['path', { d: 'M16 12H3', key: '1a2rj7' }],
		['path', { d: 'M16 19H3', key: 'zzsher' }],
		['path', { d: 'M21 5h.01', key: 'wa75ra' }],
		['path', { d: 'M21 12h.01', key: 'msek7k' }],
		['path', { d: 'M21 19h.01', key: 'qvbq2j' }],
	],
	HR = [
		['path', { d: 'M15 3v18', key: '14nvp0' }],
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M21 9H3', key: '1338ky' }],
		['path', { d: 'M21 15H3', key: '9uk58r' }],
	],
	OR = [
		['path', { d: 'M14 10h2', key: '1lstlu' }],
		['path', { d: 'M15 22v-8', key: '1fwwgm' }],
		['path', { d: 'M15 2v4', key: '1044rn' }],
		['path', { d: 'M2 10h2', key: '1r8dkt' }],
		['path', { d: 'M20 10h2', key: '1ug425' }],
		['path', { d: 'M3 19h18', key: 'awlh7x' }],
		['path', { d: 'M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6', key: 'ibqhof' }],
		['path', { d: 'M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2', key: '1uenja' }],
		['path', { d: 'M8 10h2', key: '66od0' }],
		['path', { d: 'M9 22v-8', key: 'fmnu31' }],
		['path', { d: 'M9 2v4', key: 'j1yeou' }],
	],
	FR = [
		['path', { d: 'M12 3v18', key: '108xh3' }],
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M3 9h18', key: '1pudct' }],
		['path', { d: 'M3 15h18', key: '5xshup' }],
	],
	jR = [
		['rect', { width: '10', height: '14', x: '3', y: '8', rx: '2', key: '1vrsiq' }],
		['path', { d: 'M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4', key: '1j4zmg' }],
		['path', { d: 'M8 18h.01', key: 'lrp35t' }],
	],
	qR = [
		['rect', { width: '16', height: '20', x: '4', y: '2', rx: '2', ry: '2', key: '76otgf' }],
		['line', { x1: '12', x2: '12.01', y1: '18', y2: '18', key: '1dp563' }],
	],
	VR = [
		['circle', { cx: '7', cy: '7', r: '5', key: 'x29byf' }],
		['circle', { cx: '17', cy: '17', r: '5', key: '1op1d2' }],
		['path', { d: 'M12 17h10', key: 'ls21zv' }],
		['path', { d: 'm3.46 10.54 7.08-7.08', key: '1rehiu' }],
	],
	zR = [
		[
			'path',
			{
				d: 'M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z',
				key: 'vktsd0',
			},
		],
		['circle', { cx: '7.5', cy: '7.5', r: '.5', fill: 'currentColor', key: 'kqv944' }],
	],
	BR = [
		[
			'path',
			{
				d: 'M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z',
				key: '16rjxf',
			},
		],
		['path', { d: 'M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193', key: '178nd4' }],
		['circle', { cx: '10.5', cy: '6.5', r: '.5', fill: 'currentColor', key: '12ikhr' }],
	],
	UR = [['path', { d: 'M4 4v16', key: '6qkkli' }]],
	GR = [
		['path', { d: 'M4 4v16', key: '6qkkli' }],
		['path', { d: 'M9 4v16', key: '81ygyz' }],
	],
	WR = [
		['path', { d: 'M4 4v16', key: '6qkkli' }],
		['path', { d: 'M9 4v16', key: '81ygyz' }],
		['path', { d: 'M14 4v16', key: '12vmem' }],
	],
	$R = [
		['path', { d: 'M4 4v16', key: '6qkkli' }],
		['path', { d: 'M9 4v16', key: '81ygyz' }],
		['path', { d: 'M14 4v16', key: '12vmem' }],
		['path', { d: 'M19 4v16', key: '8ij5ei' }],
	],
	ZR = [
		['path', { d: 'M4 4v16', key: '6qkkli' }],
		['path', { d: 'M9 4v16', key: '81ygyz' }],
		['path', { d: 'M14 4v16', key: '12vmem' }],
		['path', { d: 'M19 4v16', key: '8ij5ei' }],
		['path', { d: 'M22 6 2 18', key: 'h9moai' }],
	],
	QR = [
		['circle', { cx: '17', cy: '4', r: '2', key: 'y5j2s2' }],
		['path', { d: 'M15.59 5.41 5.41 15.59', key: 'l0vprr' }],
		['circle', { cx: '4', cy: '17', r: '2', key: '9p4efm' }],
		['path', { d: 'M12 22s-4-9-1.5-11.5S22 12 22 12', key: '1twk4o' }],
	],
	XR = [
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
		['circle', { cx: '12', cy: '12', r: '6', key: '1vlfrh' }],
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
	],
	KR = [
		[
			'path',
			{
				d: 'm10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44',
				key: 'k4qptu',
			},
		],
		['path', { d: 'm13.56 11.747 4.332-.924', key: '19l80z' }],
		['path', { d: 'm16 21-3.105-6.21', key: '7oh9d' }],
		[
			'path',
			{
				d: 'M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z',
				key: 'm7xp4m',
			},
		],
		['path', { d: 'm6.158 8.633 1.114 4.456', key: '74o979' }],
		['path', { d: 'm8 21 3.105-6.21', key: '1fvxut' }],
		['circle', { cx: '12', cy: '13', r: '2', key: '1c1ljs' }],
	],
	YR = [
		['circle', { cx: '4', cy: '4', r: '2', key: 'bt5ra8' }],
		['path', { d: 'm14 5 3-3 3 3', key: '1sorif' }],
		['path', { d: 'm14 10 3-3 3 3', key: '1jyi9h' }],
		['path', { d: 'M17 14V2', key: '8ymqnk' }],
		['path', { d: 'M17 14H7l-5 8h20Z', key: '13ar7p' }],
		['path', { d: 'M8 14v8', key: '1ghmqk' }],
		['path', { d: 'm9 14 5 8', key: '13pgi6' }],
	],
	JR = [
		['path', { d: 'M3.5 21 14 3', key: '1szst5' }],
		['path', { d: 'M20.5 21 10 3', key: '1310c3' }],
		['path', { d: 'M15.5 21 12 15l-3.5 6', key: '1ddtfw' }],
		['path', { d: 'M2 21h20', key: '1nyx9w' }],
	],
	eN = [
		['path', { d: 'M12 19h8', key: 'baeox8' }],
		['path', { d: 'm4 17 6-6-6-6', key: '1yngyt' }],
	],
	tN = [
		['path', { d: 'M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3', key: '1ub6xw' }],
		['path', { d: 'm16 2 6 6', key: '1gw87d' }],
		['path', { d: 'M12 16H4', key: '1cjfip' }],
	],
	nN = [
		['path', { d: 'M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2', key: '125lnx' }],
		['path', { d: 'M8.5 2h7', key: 'csnxdl' }],
		['path', { d: 'M14.5 16h-5', key: '1ox875' }],
	],
	aN = [
		['path', { d: 'M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2', key: '1hjrqt' }],
		['path', { d: 'M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2', key: '16lc8n' }],
		['path', { d: 'M3 2h7', key: '7s29d5' }],
		['path', { d: 'M14 2h7', key: '7sicin' }],
		['path', { d: 'M9 16H4', key: '1bfye3' }],
		['path', { d: 'M20 16h-5', key: 'ddnjpe' }],
	],
	oN = [
		['path', { d: 'M21 5H3', key: '1fi0y6' }],
		['path', { d: 'M17 12H7', key: '16if0g' }],
		['path', { d: 'M19 19H5', key: 'vjpgq2' }],
	],
	rN = [
		['path', { d: 'M21 5H3', key: '1fi0y6' }],
		['path', { d: 'M21 12H9', key: 'dn1m92' }],
		['path', { d: 'M21 19H7', key: '4cu937' }],
	],
	iN = [
		['path', { d: 'M3 5h18', key: '1u36vt' }],
		['path', { d: 'M3 12h18', key: '1i2n21' }],
		['path', { d: 'M3 19h18', key: 'awlh7x' }],
	],
	sN = [
		['path', { d: 'M21 5H3', key: '1fi0y6' }],
		['path', { d: 'M15 12H3', key: '6jk70r' }],
		['path', { d: 'M17 19H3', key: 'z6ezky' }],
	],
	cN = [
		['path', { d: 'M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6', key: '1528k5' }],
		['path', { d: 'M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7', key: '13ksps' }],
		['path', { d: 'M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1', key: '1n9rhb' }],
		['path', { d: 'M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1', key: '1mj8rg' }],
		['path', { d: 'M9 6v12', key: 'velyjx' }],
	],
	dN = [
		['path', { d: 'M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1', key: 'uvaxm9' }],
		['path', { d: 'M7 22h1a4 4 0 0 0 4-4v-1', key: '11xy8d' }],
		['path', { d: 'M7 2h1a4 4 0 0 1 4 4v1', key: '1uw06m' }],
	],
	lN = [
		['path', { d: 'M15 5h6', key: '1pr8yx' }],
		['path', { d: 'M15 12h6', key: 'upa0zy' }],
		['path', { d: 'M3 19h18', key: 'awlh7x' }],
		['path', { d: 'm3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12', key: '6lvno8' }],
		['path', { d: 'M3.92 10h6.16', key: '1tl8ex' }],
	],
	uN = [
		['path', { d: 'M17 5H3', key: '1cn7zz' }],
		['path', { d: 'M21 12H8', key: 'scolzb' }],
		['path', { d: 'M21 19H8', key: '13qgcb' }],
		['path', { d: 'M3 12v7', key: '1ri8j3' }],
	],
	hN = [
		['path', { d: 'M21 5H3', key: '1fi0y6' }],
		['path', { d: 'M10 12H3', key: '1ulcyk' }],
		['path', { d: 'M10 19H3', key: '108z41' }],
		['circle', { cx: '17', cy: '15', r: '3', key: '1upz2a' }],
		['path', { d: 'm21 19-1.9-1.9', key: 'dwi7p8' }],
	],
	pN = [
		['path', { d: 'M14 21h1', key: 'v9vybs' }],
		['path', { d: 'M14 3h1', key: '1ec4yj' }],
		['path', { d: 'M19 3a2 2 0 0 1 2 2', key: '18rm91' }],
		['path', { d: 'M21 14v1', key: '169vum' }],
		['path', { d: 'M21 19a2 2 0 0 1-2 2', key: '1j7049' }],
		['path', { d: 'M21 9v1', key: 'mxsmne' }],
		['path', { d: 'M3 14v1', key: 'vnatye' }],
		['path', { d: 'M3 9v1', key: '1r0deq' }],
		['path', { d: 'M5 21a2 2 0 0 1-2-2', key: 'sbafld' }],
		['path', { d: 'M5 3a2 2 0 0 0-2 2', key: 'y57alp' }],
		['path', { d: 'M7 12h10', key: 'b7w52i' }],
		['path', { d: 'M7 16h6', key: '1vyc9m' }],
		['path', { d: 'M7 8h8', key: '1jbsf9' }],
		['path', { d: 'M9 21h1', key: '15o7lz' }],
		['path', { d: 'M9 3h1', key: '1yesri' }],
	],
	yN = [
		['path', { d: 'm16 16-3 3 3 3', key: '117b85' }],
		['path', { d: 'M3 12h14.5a1 1 0 0 1 0 7H13', key: '18xa6z' }],
		['path', { d: 'M3 19h6', key: '1ygdsz' }],
		['path', { d: 'M3 5h18', key: '1u36vt' }],
	],
	fN = [
		['path', { d: 'M2 10s3-3 3-8', key: '3xiif0' }],
		['path', { d: 'M22 10s-3-3-3-8', key: 'ioaa5q' }],
		['path', { d: 'M10 2c0 4.4-3.6 8-8 8', key: '16fkpi' }],
		['path', { d: 'M14 2c0 4.4 3.6 8 8 8', key: 'b9eulq' }],
		['path', { d: 'M2 10s2 2 2 5', key: '1au1lb' }],
		['path', { d: 'M22 10s-2 2-2 5', key: 'qi2y5e' }],
		['path', { d: 'M8 15h8', key: '45n4r' }],
		['path', { d: 'M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1', key: '1vsc2m' }],
		['path', { d: 'M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1', key: 'hrha4u' }],
	],
	kN = [
		['path', { d: 'm10 20-1.25-2.5L6 18', key: '18frcb' }],
		['path', { d: 'M10 4 8.75 6.5 6 6', key: '7mghy3' }],
		['path', { d: 'M10.585 15H10', key: '4nqulp' }],
		['path', { d: 'M2 12h6.5L10 9', key: 'kv9z4n' }],
		['path', { d: 'M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z', key: 'yu0u2z' }],
		['path', { d: 'm4 10 1.5 2L4 14', key: 'k9enpj' }],
		['path', { d: 'm7 21 3-6-1.5-3', key: 'j8hb9u' }],
		['path', { d: 'm7 3 3 6h2', key: '1bbqgq' }],
	],
	gN = [
		['path', { d: 'M12 2v2', key: 'tus03m' }],
		['path', { d: 'M12 8a4 4 0 0 0-1.645 7.647', key: 'wz5p04' }],
		['path', { d: 'M2 12h2', key: '1t8f8n' }],
		['path', { d: 'M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z', key: 'yu0u2z' }],
		['path', { d: 'm4.93 4.93 1.41 1.41', key: '149t6j' }],
		['path', { d: 'm6.34 17.66-1.41 1.41', key: '1m8zz5' }],
	],
	mN = [['path', { d: 'M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z', key: '17jzev' }]],
	MN = [
		[
			'path',
			{
				d: 'M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z',
				key: 'm61m77',
			},
		],
		['path', { d: 'M17 14V2', key: '8ymqnk' }],
	],
	vN = [
		[
			'path',
			{
				d: 'M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z',
				key: 'emmmcr',
			},
		],
		['path', { d: 'M7 10v12', key: '1qc93n' }],
	],
	IN = [
		[
			'path',
			{
				d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
				key: 'qn84l0',
			},
		],
		['path', { d: 'm9 12 2 2 4-4', key: 'dzmm74' }],
	],
	xN = [
		[
			'path',
			{
				d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
				key: 'qn84l0',
			},
		],
		['path', { d: 'M9 12h6', key: '1c52cq' }],
	],
	wN = [
		[
			'path',
			{
				d: 'M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
				key: '1l48ns',
			},
		],
		['path', { d: 'M9 9h.01', key: '1q5me6' }],
		['path', { d: 'm15 9-6 6', key: '1uzhvr' }],
		['path', { d: 'M15 15h.01', key: 'lqbp3k' }],
	],
	CN = [
		[
			'path',
			{
				d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
				key: 'qn84l0',
			},
		],
		['path', { d: 'M9 12h6', key: '1c52cq' }],
		['path', { d: 'M12 9v6', key: '199k2o' }],
	],
	LN = [
		[
			'path',
			{
				d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
				key: 'qn84l0',
			},
		],
		['path', { d: 'm9.5 14.5 5-5', key: 'qviqfa' }],
	],
	bN = [
		[
			'path',
			{
				d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
				key: 'qn84l0',
			},
		],
		['path', { d: 'm9.5 14.5 5-5', key: 'qviqfa' }],
		['path', { d: 'm9.5 9.5 5 5', key: '18nt4w' }],
	],
	SN = [
		[
			'path',
			{
				d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
				key: 'qn84l0',
			},
		],
		['path', { d: 'M13 5v2', key: 'dyzc3o' }],
		['path', { d: 'M13 17v2', key: '1ont0d' }],
		['path', { d: 'M13 11v2', key: '1wjjxi' }],
	],
	DN = [
		['path', { d: 'M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12', key: '16muxl' }],
		['path', { d: 'm12 13.5 3.75.5', key: '1i9qhk' }],
		['path', { d: 'm3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8', key: '15hfpj' }],
		['path', { d: 'M6 10V8', key: '1y41hn' }],
		['path', { d: 'M6 14v1', key: 'cao2tf' }],
		['path', { d: 'M6 19v2', key: '1loha6' }],
		['rect', { x: '2', y: '8', width: '20', height: '13', rx: '2', key: 'p3bz5l' }],
	],
	AN = [
		['path', { d: 'm3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8', key: '15hfpj' }],
		['path', { d: 'M6 10V8', key: '1y41hn' }],
		['path', { d: 'M6 14v1', key: 'cao2tf' }],
		['path', { d: 'M6 19v2', key: '1loha6' }],
		['rect', { x: '2', y: '8', width: '20', height: '13', rx: '2', key: 'p3bz5l' }],
	],
	EN = [
		['path', { d: 'M10 2h4', key: 'n1abiw' }],
		['path', { d: 'M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7', key: '10he05' }],
		['path', { d: 'M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2', key: '15f7sh' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M12 12v-2', key: 'fwoke6' }],
	],
	TN = [
		['path', { d: 'M10 2h4', key: 'n1abiw' }],
		['path', { d: 'M12 14v-4', key: '1evpnu' }],
		['path', { d: 'M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6', key: '1ts96g' }],
		['path', { d: 'M9 17H4v5', key: '8t5av' }],
	],
	PN = [
		['line', { x1: '10', x2: '14', y1: '2', y2: '2', key: '14vaq8' }],
		['line', { x1: '12', x2: '15', y1: '14', y2: '11', key: '17fdiu' }],
		['circle', { cx: '12', cy: '14', r: '8', key: '1e1u0o' }],
	],
	RN = [
		['circle', { cx: '9', cy: '12', r: '3', key: 'u3jwor' }],
		['rect', { width: '20', height: '14', x: '2', y: '5', rx: '7', key: 'g7kal2' }],
	],
	NN = [
		['circle', { cx: '15', cy: '12', r: '3', key: '1afu0r' }],
		['rect', { width: '20', height: '14', x: '2', y: '5', rx: '7', key: 'g7kal2' }],
	],
	_N = [
		[
			'path',
			{
				d: 'M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18',
				key: 'kc4kqr',
			},
		],
		['path', { d: 'M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8', key: '1tqs57' }],
	],
	HN = [
		['path', { d: 'M10 15h4', key: '192ueg' }],
		[
			'path',
			{
				d: 'm14.817 10.995-.971-1.45 1.034-1.232a2 2 0 0 0-2.025-3.238l-1.82.364L9.91 3.885a2 2 0 0 0-3.625.748L6.141 6.55l-1.725.426a2 2 0 0 0-.19 3.756l.657.27',
				key: 'xbnumr',
			},
		],
		[
			'path',
			{
				d: 'm18.822 10.995 2.26-5.38a1 1 0 0 0-.557-1.318L16.954 2.9a1 1 0 0 0-1.281.533l-.924 2.122',
				key: 'eaw7gc',
			},
		],
		[
			'path',
			{ d: 'M4 12.006A1 1 0 0 1 4.994 11H19a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z', key: '1vaooh' },
		],
	],
	ON = [
		['path', { d: 'M16 12v4', key: 'vf1vip' }],
		[
			'path',
			{
				d: 'M16 6a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 .586-1.414l4-4A2 2 0 0 1 8 6z',
				key: '1h1rvn',
			},
		],
		['path', { d: 'M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2', key: '1ksdt3' }],
		['path', { d: 'M2 14h20', key: 'myj16y' }],
		['path', { d: 'M8 12v4', key: '1w4uao' }],
	],
	FN = [
		['ellipse', { cx: '12', cy: '11', rx: '3', ry: '2', key: '1b2qxu' }],
		['ellipse', { cx: '12', cy: '12.5', rx: '10', ry: '8.5', key: 'h8emeu' }],
	],
	jN = [
		['path', { d: 'M21 4H3', key: '1hwok0' }],
		['path', { d: 'M18 8H6', key: '41n648' }],
		['path', { d: 'M19 12H9', key: '1g4lpz' }],
		['path', { d: 'M16 16h-6', key: '1j5d54' }],
		['path', { d: 'M11 20H9', key: '39obr8' }],
	],
	qN = [
		['path', { d: 'M12 20v-6', key: '1rm09r' }],
		['path', { d: 'M19.656 14H22', key: '170xzr' }],
		['path', { d: 'M2 14h12', key: 'd8icqz' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2', key: 's23sx2' }],
		['path', { d: 'M9.656 4H20a2 2 0 0 1 2 2v10.344', key: 'ovjcvl' }],
	],
	VN = [
		['path', { d: 'M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z', key: '1pledb' }],
		['path', { d: 'M8 13v9', key: 'hmv0ci' }],
		['path', { d: 'M16 22v-9', key: 'ylnf1u' }],
		['path', { d: 'm9 6 1 7', key: 'dpdgam' }],
		['path', { d: 'm15 6-1 7', key: 'ls7zgu' }],
		['path', { d: 'M12 6V2', key: '1pj48d' }],
		['path', { d: 'M13 2h-2', key: 'mj6ths' }],
	],
	zN = [
		['rect', { width: '20', height: '16', x: '2', y: '4', rx: '2', key: '18n3k1' }],
		['path', { d: 'M2 14h20', key: 'myj16y' }],
		['path', { d: 'M12 20v-6', key: '1rm09r' }],
	],
	BN = [
		['rect', { width: '18', height: '12', x: '3', y: '8', rx: '1', key: '158fvp' }],
		['path', { d: 'M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3', key: 's0042v' }],
		['path', { d: 'M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3', key: '9wmeh2' }],
	],
	UN = [
		['path', { d: 'm10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20', key: 'she1j9' }],
		['path', { d: 'M16 18h-5', key: 'bq60fd' }],
		['path', { d: 'M18 5a1 1 0 0 0-1 1v5.573', key: '1kv8ia' }],
		['path', { d: 'M3 4h8.129a1 1 0 0 1 .99.863L13 11.246', key: '1q1ert' }],
		['path', { d: 'M4 11V4', key: '9ft8pt' }],
		['path', { d: 'M7 15h.01', key: 'k5ht0j' }],
		['path', { d: 'M8 10.1V4', key: '1jgyzo' }],
		['circle', { cx: '18', cy: '18', r: '2', key: '1emm8v' }],
		['circle', { cx: '7', cy: '15', r: '5', key: 'ddtuc' }],
	],
	GN = [
		['path', { d: 'M16.05 10.966a5 2.5 0 0 1-8.1 0', key: 'm5jpwb' }],
		[
			'path',
			{
				d: 'm16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04',
				key: 'rbg3g8',
			},
		],
		['path', { d: 'M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z', key: 'vap8c8' }],
		['path', { d: 'M9.194 6.57a5 2.5 0 0 0 5.61 0', key: '15hn5c' }],
	],
	WN = [
		['path', { d: 'M2 22V12a10 10 0 1 1 20 0v10', key: 'o0fyp0' }],
		['path', { d: 'M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8', key: 'm8q3n9' }],
		['path', { d: 'M10 15h.01', key: '44in9x' }],
		['path', { d: 'M14 15h.01', key: '5mohn5' }],
		['path', { d: 'M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z', key: 'hckbmu' }],
		['path', { d: 'm9 19-2 3', key: 'iij7hm' }],
		['path', { d: 'm15 19 2 3', key: 'npx8sa' }],
	],
	$N = [
		['path', { d: 'M2 17 17 2', key: '18b09t' }],
		['path', { d: 'm2 14 8 8', key: '1gv9hu' }],
		['path', { d: 'm5 11 8 8', key: '189pqp' }],
		['path', { d: 'm8 8 8 8', key: '1imecy' }],
		['path', { d: 'm11 5 8 8', key: 'ummqn6' }],
		['path', { d: 'm14 2 8 8', key: '1vk7dn' }],
		['path', { d: 'M7 22 22 7', key: '15mb1i' }],
	],
	ZN = [
		['path', { d: 'M8 3.1V7a4 4 0 0 0 8 0V3.1', key: '1v71zp' }],
		['path', { d: 'm9 15-1-1', key: '1yrq24' }],
		['path', { d: 'm15 15 1-1', key: '1t0d6s' }],
		['path', { d: 'M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z', key: '1p0hjs' }],
		['path', { d: 'm8 19-2 3', key: '13i0xs' }],
		['path', { d: 'm16 19 2 3', key: 'xo31yx' }],
	],
	QN = [
		['rect', { width: '16', height: '16', x: '4', y: '3', rx: '2', key: '1wxw4b' }],
		['path', { d: 'M4 11h16', key: 'mpoxn0' }],
		['path', { d: 'M12 3v8', key: '1h2ygw' }],
		['path', { d: 'm8 19-2 3', key: '13i0xs' }],
		['path', { d: 'm18 22-2-3', key: '1p0ohu' }],
		['path', { d: 'M8 15h.01', key: 'a7atzg' }],
		['path', { d: 'M16 15h.01', key: 'rnfrdf' }],
	],
	XN = [
		['path', { d: 'M12 16v6', key: 'c8a4gj' }],
		['path', { d: 'M14 20h-4', key: 'm8m19d' }],
		['path', { d: 'M18 2h4v4', key: '1341mj' }],
		['path', { d: 'm2 2 7.17 7.17', key: '13q8l2' }],
		['path', { d: 'M2 5.355V2h3.357', key: '18136r' }],
		['path', { d: 'm22 2-7.17 7.17', key: '1epvy4' }],
		['path', { d: 'M8 5 5 8', key: 'mgbjhz' }],
		['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
	],
	KN = [
		['path', { d: 'M10 11v6', key: 'nco0om' }],
		['path', { d: 'M14 11v6', key: 'outv1u' }],
		['path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', key: 'miytrc' }],
		['path', { d: 'M3 6h18', key: 'd0wm0j' }],
		['path', { d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', key: 'e791ji' }],
	],
	YN = [
		['path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', key: 'miytrc' }],
		['path', { d: 'M3 6h18', key: 'd0wm0j' }],
		['path', { d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', key: 'e791ji' }],
	],
	JN = [
		[
			'path',
			{
				d: 'M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z',
				key: 'oadzkq',
			},
		],
		['path', { d: 'M12 19v3', key: 'npa21l' }],
	],
	e_ = [
		['path', { d: 'M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4', key: 'foxbe7' }],
		['path', { d: 'M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3', key: '18arnh' }],
		[
			'path',
			{
				d: 'M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35',
				key: 'ywahnh',
			},
		],
		['path', { d: 'M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14', key: 'ft0feo' }],
	],
	t_ = [
		[
			'path',
			{
				d: 'm17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z',
				key: 'cpyugq',
			},
		],
		['path', { d: 'M12 22v-3', key: 'kmzjlo' }],
	],
	n_ = [
		['path', { d: 'M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z', key: '1l6gj6' }],
		['path', { d: 'M7 16v6', key: '1a82de' }],
		['path', { d: 'M13 19v3', key: '13sx9i' }],
		[
			'path',
			{
				d: 'M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5',
				key: '1sj9kv',
			},
		],
	],
	a_ = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
		['rect', { width: '3', height: '9', x: '7', y: '7', key: '14n3xi' }],
		['rect', { width: '3', height: '5', x: '14', y: '7', key: 's4azjd' }],
	],
	o_ = [
		['path', { d: 'M16 17h6v-6', key: 't6n2it' }],
		['path', { d: 'm22 17-8.5-8.5-5 5L2 7', key: 'x473p' }],
	],
	r_ = [
		['path', { d: 'M14.828 14.828 21 21', key: 'ar5fw7' }],
		['path', { d: 'M21 16v5h-5', key: '1ck2sf' }],
		['path', { d: 'm21 3-9 9-4-4-6 6', key: '1h02xo' }],
		['path', { d: 'M21 8V3h-5', key: '1qoq8a' }],
	],
	i_ = [
		['path', { d: 'M16 7h6v6', key: 'box55l' }],
		['path', { d: 'm22 7-8.5 8.5-5-5L2 17', key: '1t1m79' }],
	],
	s_ = [
		['path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', key: 'wmoenq' }],
		['path', { d: 'M12 9v4', key: 'juzpu7' }],
		['path', { d: 'M12 17h.01', key: 'p32p05' }],
	],
	c_ = [
		['path', { d: 'M10.17 4.193a2 2 0 0 1 3.666.013', key: 'pltmmw' }],
		['path', { d: 'M14 21h2', key: 'v4qezv' }],
		['path', { d: 'm15.874 7.743 1 1.732', key: '10m0iw' }],
		['path', { d: 'm18.849 12.952 1 1.732', key: 'zadnam' }],
		['path', { d: 'M21.824 18.18a2 2 0 0 1-1.835 2.824', key: 'fvwuk4' }],
		['path', { d: 'M4.024 21a2 2 0 0 1-1.839-2.839', key: '1e1kah' }],
		['path', { d: 'm5.136 12.952-1 1.732', key: '1u4ldi' }],
		['path', { d: 'M8 21h2', key: 'i9zjee' }],
		['path', { d: 'm8.102 7.743-1 1.732', key: '1zzo4u' }],
	],
	d_ = [['path', { d: 'M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z', key: '183wce' }]],
	l_ = [['path', { d: 'M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z', key: '14u9p9' }]],
	u_ = [
		['path', { d: 'M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978', key: '1n3hpd' }],
		['path', { d: 'M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978', key: 'rfe1zi' }],
		['path', { d: 'M18 9h1.5a1 1 0 0 0 0-5H18', key: '7xy6bh' }],
		['path', { d: 'M4 22h16', key: '57wxv0' }],
		['path', { d: 'M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z', key: '1mhfuq' }],
		['path', { d: 'M6 9H4.5a1 1 0 0 1 0-5H6', key: 'tex48p' }],
	],
	h_ = [
		['path', { d: 'M14 19V7a2 2 0 0 0-2-2H9', key: '15peso' }],
		['path', { d: 'M15 19H9', key: '18q6dt' }],
		['path', { d: 'M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14', key: '1dkp3j' }],
		['path', { d: 'M2 13v5a1 1 0 0 0 1 1h2', key: 'pkmmzz' }],
		['path', { d: 'M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02', key: '1n26pd' }],
		['circle', { cx: '17', cy: '19', r: '2', key: '1nxcgd' }],
		['circle', { cx: '7', cy: '19', r: '2', key: 'gzo7y7' }],
	],
	p_ = [
		['path', { d: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', key: 'wrbu53' }],
		['path', { d: 'M15 18H9', key: '1lyqi6' }],
		[
			'path',
			{ d: 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14', key: 'lysw3i' },
		],
		['circle', { cx: '17', cy: '18', r: '2', key: '332jqn' }],
		['circle', { cx: '7', cy: '18', r: '2', key: '19iecd' }],
	],
	y_ = [
		['path', { d: 'M15 4 5 9', key: '14bkc9' }],
		['path', { d: 'm15 8.5-10 5', key: '1grtsx' }],
		['path', { d: 'M18 12a9 9 0 0 1-9 9V3', key: '1sst7f' }],
	],
	f_ = [
		['path', { d: 'M10 12.01h.01', key: '7rp0yl' }],
		['path', { d: 'M18 8v4a8 8 0 0 1-1.07 4', key: '1st48v' }],
		['circle', { cx: '10', cy: '12', r: '4', key: '19levz' }],
		['rect', { x: '2', y: '4', width: '20', height: '16', rx: '2', key: 'izxlao' }],
	],
	k_ = [
		[
			'path',
			{
				d: 'm12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z',
				key: '1lbbv7',
			},
		],
		['path', { d: 'M4.82 7.9 8 10', key: 'm9wose' }],
		['path', { d: 'M15.18 7.9 12 10', key: 'p8dp2u' }],
		['path', { d: 'M16.93 10H20a2 2 0 0 1 0 4H2', key: '12nsm7' }],
	],
	g_ = [
		[
			'path',
			{
				d: 'M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z',
				key: 'vbtd3f',
			},
		],
		['path', { d: 'M7 21h10', key: '1b0cd5' }],
		['rect', { width: '20', height: '14', x: '2', y: '3', rx: '2', key: '48i651' }],
	],
	m_ = [
		['path', { d: 'M7 21h10', key: '1b0cd5' }],
		['rect', { width: '20', height: '14', x: '2', y: '3', rx: '2', key: '48i651' }],
	],
	M_ = [
		['path', { d: 'm17 2-5 5-5-5', key: '16satq' }],
		['rect', { width: '20', height: '15', x: '2', y: '7', rx: '2', key: '1e6viu' }],
	],
	v_ = [['path', { d: 'M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7', key: 'c0yzno' }]],
	I_ = [
		[
			'path',
			{
				d: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
				key: 'pff0z6',
			},
		],
	],
	x_ = [
		[
			'path',
			{
				d: 'M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z',
				key: '1reda3',
			},
		],
	],
	w_ = [
		['path', { d: 'M12 4v16', key: '1654pz' }],
		['path', { d: 'M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2', key: 'e0r10z' }],
		['path', { d: 'M9 20h6', key: 's66wpe' }],
	],
	C_ = [
		['path', { d: 'M12 13v7a2 2 0 0 0 4 0', key: 'rpgb42' }],
		['path', { d: 'M12 2v2', key: 'tus03m' }],
		['path', { d: 'M18.656 13h2.336a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-12.07-7.51', key: 'yawknk' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		['path', { d: 'M5.961 5.957a10.28 10.28 0 0 0-3.922 5.769A1 1 0 0 0 3 13h10', key: '5sfalc' }],
	],
	L_ = [
		['path', { d: 'M12 13v7a2 2 0 0 0 4 0', key: 'rpgb42' }],
		['path', { d: 'M12 2v2', key: 'tus03m' }],
		['path', { d: 'M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z', key: '124nyo' }],
	],
	b_ = [
		['path', { d: 'M6 4v6a6 6 0 0 0 12 0V4', key: '9kb039' }],
		['line', { x1: '4', x2: '20', y1: '20', y2: '20', key: 'nun2al' }],
	],
	S_ = [
		['path', { d: 'M9 14 4 9l5-5', key: '102s5s' }],
		['path', { d: 'M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11', key: 'f3b9sd' }],
	],
	D_ = [
		['path', { d: 'M21 17a9 9 0 0 0-15-6.7L3 13', key: '8mp6z9' }],
		['path', { d: 'M3 7v6h6', key: '1v2h90' }],
		['circle', { cx: '12', cy: '17', r: '1', key: '1ixnty' }],
	],
	A_ = [
		['path', { d: 'M3 7v6h6', key: '1v2h90' }],
		['path', { d: 'M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13', key: '1r6uu6' }],
	],
	E_ = [
		['path', { d: 'M16 12h6', key: '15xry1' }],
		['path', { d: 'M8 12H2', key: '1jqql6' }],
		['path', { d: 'M12 2v2', key: 'tus03m' }],
		['path', { d: 'M12 8v2', key: '1woqiv' }],
		['path', { d: 'M12 14v2', key: '8jcxud' }],
		['path', { d: 'M12 20v2', key: '1lh1kg' }],
		['path', { d: 'm19 15 3-3-3-3', key: 'wjy7rq' }],
		['path', { d: 'm5 9-3 3 3 3', key: 'j64kie' }],
	],
	T_ = [
		['path', { d: 'M12 22v-6', key: '6o8u61' }],
		['path', { d: 'M12 8V2', key: '1wkif3' }],
		['path', { d: 'M4 12H2', key: 'rhcxmi' }],
		['path', { d: 'M10 12H8', key: 's88cx1' }],
		['path', { d: 'M16 12h-2', key: '10asgb' }],
		['path', { d: 'M22 12h-2', key: '14jgyd' }],
		['path', { d: 'm15 19-3 3-3-3', key: '11eu04' }],
		['path', { d: 'm15 5-3-3-3 3', key: 'itvq4r' }],
	],
	P_ = [
		['rect', { width: '8', height: '6', x: '5', y: '4', rx: '1', key: 'nzclkv' }],
		['rect', { width: '8', height: '6', x: '11', y: '14', rx: '1', key: '4tytwb' }],
	],
	R_ = [
		['path', { d: 'M14 21v-3a2 2 0 0 0-4 0v3', key: '1rgiei' }],
		['path', { d: 'M18 12h.01', key: 'yjnet6' }],
		['path', { d: 'M18 16h.01', key: 'plv8zi' }],
		[
			'path',
			{
				d: 'M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z',
				key: '1ogmi3',
			},
		],
		['path', { d: 'M6 12h.01', key: 'c2rlol' }],
		['path', { d: 'M6 16h.01', key: '1pmjb7' }],
		['circle', { cx: '12', cy: '10', r: '2', key: '1yojzk' }],
	],
	N_ = [
		[
			'path',
			{
				d: 'm18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71',
				key: 'yqzxt4',
			},
		],
		[
			'path',
			{ d: 'm5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71', key: '4qinb0' },
		],
		['line', { x1: '8', x2: '8', y1: '2', y2: '5', key: '1041cp' }],
		['line', { x1: '2', x2: '5', y1: '8', y2: '8', key: '14m1p5' }],
		['line', { x1: '16', x2: '16', y1: '19', y2: '22', key: 'rzdirn' }],
		['line', { x1: '19', x2: '22', y1: '16', y2: '16', key: 'ox905f' }],
	],
	__ = [['path', { d: 'M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2', key: '1re2ne' }]],
	H_ = [
		['path', { d: 'm19 5 3-3', key: 'yk6iyv' }],
		['path', { d: 'm2 22 3-3', key: '19mgm9' }],
		['path', { d: 'M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z', key: 'goz73y' }],
		['path', { d: 'M7.5 13.5 10 11', key: '7xgeeb' }],
		['path', { d: 'M10.5 16.5 13 14', key: '10btkg' }],
		['path', { d: 'm12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z', key: '1snsnr' }],
	],
	O_ = [
		['path', { d: 'M12 3v12', key: '1x0j5s' }],
		['path', { d: 'm17 8-5-5-5 5', key: '7q97r8' }],
		['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', key: 'ih7n3h' }],
	],
	F_ = [
		['circle', { cx: '10', cy: '7', r: '1', key: 'dypaad' }],
		['circle', { cx: '4', cy: '20', r: '1', key: '22iqad' }],
		['path', { d: 'M4.7 19.3 19 5', key: '1enqfc' }],
		['path', { d: 'm21 3-3 1 2 2Z', key: 'd3ov82' }],
		['path', { d: 'M9.26 7.68 5 12l2 5', key: '1esawj' }],
		['path', { d: 'm10 14 5 2 3.5-3.5', key: 'v8oal5' }],
		['path', { d: 'm18 12 1-1 1 1-1 1Z', key: '1bh22v' }],
	],
	j_ = [
		['path', { d: 'm16 11 2 2 4-4', key: '9rsbq5' }],
		['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' }],
		['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
	],
	q_ = [
		['circle', { cx: '10', cy: '7', r: '4', key: 'e45bow' }],
		['path', { d: 'M10.3 15H7a4 4 0 0 0-4 4v2', key: '3bnktk' }],
		['path', { d: 'M15 15.5V14a2 2 0 0 1 4 0v1.5', key: '12ym5i' }],
		['rect', { width: '8', height: '5', x: '13', y: '16', rx: '.899', key: '4p176n' }],
	],
	V_ = [
		['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' }],
		['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
		['line', { x1: '22', x2: '16', y1: '11', y2: '11', key: '1shjgl' }],
	],
	z_ = [
		['path', { d: 'M10 15H6a4 4 0 0 0-4 4v2', key: '1nfge6' }],
		['path', { d: 'm14.305 16.53.923-.382', key: '1itpsq' }],
		['path', { d: 'm15.228 13.852-.923-.383', key: 'eplpkm' }],
		['path', { d: 'm16.852 12.228-.383-.923', key: '13v3q0' }],
		['path', { d: 'm16.852 17.772-.383.924', key: '1i8mnm' }],
		['path', { d: 'm19.148 12.228.383-.923', key: '1q8j1v' }],
		['path', { d: 'm19.53 18.696-.382-.924', key: 'vk1qj3' }],
		['path', { d: 'm20.772 13.852.924-.383', key: 'n880s0' }],
		['path', { d: 'm20.772 16.148.924.383', key: '1g6xey' }],
		['circle', { cx: '18', cy: '15', r: '3', key: 'gjjjvw' }],
		['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
	],
	B_ = [
		['path', { d: 'M11.5 15H7a4 4 0 0 0-4 4v2', key: '15lzij' }],
		[
			'path',
			{
				d: 'M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
				key: '1817ys',
			},
		],
		['circle', { cx: '10', cy: '7', r: '4', key: 'e45bow' }],
	],
	U_ = [
		['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' }],
		['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
		['line', { x1: '19', x2: '19', y1: '8', y2: '14', key: '1bvyxn' }],
		['line', { x1: '22', x2: '16', y1: '11', y2: '11', key: '1shjgl' }],
	],
	G_ = [
		['path', { d: 'M2 21a8 8 0 0 1 13.292-6', key: 'bjp14o' }],
		['circle', { cx: '10', cy: '8', r: '5', key: 'o932ke' }],
		['path', { d: 'm16 19 2 2 4-4', key: '1b14m6' }],
	],
	W_ = [
		['path', { d: 'm14.305 19.53.923-.382', key: '3m78fa' }],
		['path', { d: 'm15.228 16.852-.923-.383', key: 'npixar' }],
		['path', { d: 'm16.852 15.228-.383-.923', key: '5xggr7' }],
		['path', { d: 'm16.852 20.772-.383.924', key: 'dpfhf9' }],
		['path', { d: 'm19.148 15.228.383-.923', key: '1reyyz' }],
		['path', { d: 'm19.53 21.696-.382-.924', key: '1goivc' }],
		['path', { d: 'M2 21a8 8 0 0 1 10.434-7.62', key: '1yezr2' }],
		['path', { d: 'm20.772 16.852.924-.383', key: 'htqkph' }],
		['path', { d: 'm20.772 19.148.924.383', key: '9w9pjp' }],
		['circle', { cx: '10', cy: '8', r: '5', key: 'o932ke' }],
		['circle', { cx: '18', cy: '18', r: '3', key: '1xkwt0' }],
	],
	$_ = [
		['path', { d: 'M2 21a8 8 0 0 1 13.292-6', key: 'bjp14o' }],
		['circle', { cx: '10', cy: '8', r: '5', key: 'o932ke' }],
		['path', { d: 'M22 19h-6', key: 'vcuq98' }],
	],
	Z_ = [
		['path', { d: 'M2 21a8 8 0 0 1 10.821-7.487', key: '1c8h7z' }],
		[
			'path',
			{
				d: 'M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
				key: '1817ys',
			},
		],
		['circle', { cx: '10', cy: '8', r: '5', key: 'o932ke' }],
	],
	Q_ = [
		['path', { d: 'M2 21a8 8 0 0 1 13.292-6', key: 'bjp14o' }],
		['circle', { cx: '10', cy: '8', r: '5', key: 'o932ke' }],
		['path', { d: 'M19 16v6', key: 'tddt3s' }],
		['path', { d: 'M22 19h-6', key: 'vcuq98' }],
	],
	X_ = [
		['circle', { cx: '10', cy: '8', r: '5', key: 'o932ke' }],
		['path', { d: 'M2 21a8 8 0 0 1 10.434-7.62', key: '1yezr2' }],
		['circle', { cx: '18', cy: '18', r: '3', key: '1xkwt0' }],
		['path', { d: 'm22 22-1.9-1.9', key: '1e5ubv' }],
	],
	K_ = [
		['path', { d: 'M2 21a8 8 0 0 1 11.873-7', key: '74fkxq' }],
		['circle', { cx: '10', cy: '8', r: '5', key: 'o932ke' }],
		['path', { d: 'm17 17 5 5', key: 'p7ous7' }],
		['path', { d: 'm22 17-5 5', key: 'gqnmv0' }],
	],
	Y_ = [
		['circle', { cx: '12', cy: '8', r: '5', key: '1hypcn' }],
		['path', { d: 'M20 21a8 8 0 0 0-16 0', key: 'rfgkzh' }],
	],
	J_ = [
		['circle', { cx: '10', cy: '7', r: '4', key: 'e45bow' }],
		['path', { d: 'M10.3 15H7a4 4 0 0 0-4 4v2', key: '3bnktk' }],
		['circle', { cx: '17', cy: '17', r: '3', key: '18b49y' }],
		['path', { d: 'm21 21-1.9-1.9', key: '1g2n9r' }],
	],
	eH = [
		[
			'path',
			{
				d: 'M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z',
				key: '1m8t9f',
			},
		],
		['path', { d: 'M8 15H7a4 4 0 0 0-4 4v2', key: 'l9tmp8' }],
		['circle', { cx: '10', cy: '7', r: '4', key: 'e45bow' }],
	],
	tH = [
		['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' }],
		['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
		['line', { x1: '17', x2: '22', y1: '8', y2: '13', key: '3nzzx3' }],
		['line', { x1: '22', x2: '17', y1: '8', y2: '13', key: '1swrse' }],
	],
	nH = [
		['path', { d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', key: '975kel' }],
		['circle', { cx: '12', cy: '7', r: '4', key: '17ys0d' }],
	],
	aH = [
		['path', { d: 'M18 21a8 8 0 0 0-16 0', key: '3ypg7q' }],
		['circle', { cx: '10', cy: '8', r: '5', key: 'o932ke' }],
		['path', { d: 'M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3', key: '10s06x' }],
	],
	oH = [
		['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' }],
		['path', { d: 'M16 3.128a4 4 0 0 1 0 7.744', key: '16gr8j' }],
		['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87', key: 'kshegd' }],
		['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
	],
	rH = [
		['path', { d: 'm16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8', key: 'n7qcjb' }],
		['path', { d: 'M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7', key: 'd0u48b' }],
		['path', { d: 'm2.1 21.8 6.4-6.3', key: 'yn04lh' }],
		['path', { d: 'm19 5-7 7', key: '194lzd' }],
	],
	iH = [
		['path', { d: 'M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2', key: 'cjf0a3' }],
		['path', { d: 'M7 2v20', key: '1473qp' }],
		['path', { d: 'M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7', key: 'j28e5' }],
	],
	sH = [
		['path', { d: 'M12 2v20', key: 't6zp3m' }],
		['path', { d: 'M2 5h20', key: '1fs1ex' }],
		['path', { d: 'M3 3v2', key: '9imdir' }],
		['path', { d: 'M7 3v2', key: 'n0os7' }],
		['path', { d: 'M17 3v2', key: '1l2re6' }],
		['path', { d: 'M21 3v2', key: '1duuac' }],
		['path', { d: 'm19 5-7 7-7-7', key: '133zxf' }],
	],
	cH = [
		[
			'path',
			{
				d: 'M13 6v5a1 1 0 0 0 1 1h6.102a1 1 0 0 1 .712.298l.898.91a1 1 0 0 1 .288.702V17a1 1 0 0 1-1 1h-3',
				key: 'k3s650',
			},
		],
		['path', { d: 'M5 18H3a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h12c1.1 0 2.1.8 2.4 1.8l1.176 4.2', key: 'fnd93u' }],
		['path', { d: 'M9 18h5', key: 'lrx6i' }],
		['circle', { cx: '16', cy: '18', r: '2', key: '1v4tcr' }],
		['circle', { cx: '7', cy: '18', r: '2', key: '19iecd' }],
	],
	dH = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['circle', { cx: '7.5', cy: '7.5', r: '.5', fill: 'currentColor', key: 'kqv944' }],
		['path', { d: 'm7.9 7.9 2.7 2.7', key: 'hpeyl3' }],
		['circle', { cx: '16.5', cy: '7.5', r: '.5', fill: 'currentColor', key: 'w0ekpg' }],
		['path', { d: 'm13.4 10.6 2.7-2.7', key: '264c1n' }],
		['circle', { cx: '7.5', cy: '16.5', r: '.5', fill: 'currentColor', key: 'nkw3mc' }],
		['path', { d: 'm7.9 16.1 2.7-2.7', key: 'p81g5e' }],
		['circle', { cx: '16.5', cy: '16.5', r: '.5', fill: 'currentColor', key: 'fubopw' }],
		['path', { d: 'm13.4 13.4 2.7 2.7', key: 'abhel3' }],
		['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
	],
	lH = [
		['path', { d: 'M8 21s-4-3-4-9 4-9 4-9', key: 'uto9ud' }],
		['path', { d: 'M16 3s4 3 4 9-4 9-4 9', key: '4w2vsq' }],
		['line', { x1: '15', x2: '9', y1: '9', y2: '15', key: 'f7djnv' }],
		['line', { x1: '9', x2: '15', y1: '9', y2: '15', key: '1shsy8' }],
	],
	uH = [
		['path', { d: 'M16 8q6 0 6-6-6 0-6 6', key: 'qsyyc4' }],
		['path', { d: 'M17.41 3.59a10 10 0 1 0 3 3', key: '41m9h7' }],
		['path', { d: 'M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14', key: 'qiv7li' }],
	],
	hH = [
		['path', { d: 'M19.5 7a24 24 0 0 1 0 10', key: '8n60xe' }],
		['path', { d: 'M4.5 7a24 24 0 0 0 0 10', key: '2lmadr' }],
		['path', { d: 'M7 19.5a24 24 0 0 0 10 0', key: '1q94o2' }],
		['path', { d: 'M7 4.5a24 24 0 0 1 10 0', key: '2z8ypa' }],
		['rect', { x: '17', y: '17', width: '5', height: '5', rx: '1', key: '1ac74s' }],
		['rect', { x: '17', y: '2', width: '5', height: '5', rx: '1', key: '1e7h5j' }],
		['rect', { x: '2', y: '17', width: '5', height: '5', rx: '1', key: '1t4eah' }],
		['rect', { x: '2', y: '2', width: '5', height: '5', rx: '1', key: '940dhs' }],
	],
	pH = [
		['path', { d: 'M18 11c-1.5 0-2.5.5-3 2', key: '1fod00' }],
		[
			'path',
			{
				d: 'M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z',
				key: 'd70hit',
			},
		],
		['path', { d: 'M6 11c1.5 0 2.5.5 3 2', key: '136fht' }],
	],
	yH = [
		['path', { d: 'M10 20h4', key: 'ni2waw' }],
		['path', { d: 'M12 16v6', key: 'c8a4gj' }],
		['path', { d: 'M17 2h4v4', key: 'vhe59' }],
		['path', { d: 'm21 2-5.46 5.46', key: '19kypf' }],
		['circle', { cx: '12', cy: '11', r: '5', key: '16gxyc' }],
	],
	fH = [
		['path', { d: 'M12 15v7', key: 't2xh3l' }],
		['path', { d: 'M9 19h6', key: '456am0' }],
		['circle', { cx: '12', cy: '9', r: '6', key: '1nw4tq' }],
	],
	kH = [
		['path', { d: 'm2 8 2 2-2 2 2 2-2 2', key: 'sv1b1' }],
		['path', { d: 'm22 8-2 2 2 2-2 2 2 2', key: '101i4y' }],
		['path', { d: 'M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2', key: '1hbad5' }],
		['path', { d: 'M16 10.34V6c0-.55-.45-1-1-1h-4.34', key: '1x5tf0' }],
		['line', { x1: '2', x2: '22', y1: '2', y2: '22', key: 'a6p6uj' }],
	],
	gH = [
		['path', { d: 'm2 8 2 2-2 2 2 2-2 2', key: 'sv1b1' }],
		['path', { d: 'm22 8-2 2 2 2-2 2 2 2', key: '101i4y' }],
		['rect', { width: '8', height: '14', x: '8', y: '5', rx: '1', key: '1oyrl4' }],
	],
	mH = [
		['path', { d: 'M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196', key: 'w8jjjt' }],
		['path', { d: 'M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2', key: '1xawa7' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	MH = [
		['path', { d: 'm16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5', key: 'ftymec' }],
		['rect', { x: '2', y: '6', width: '14', height: '12', rx: '2', key: '158x01' }],
	],
	vH = [
		['path', { d: 'M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2', key: 'mrq65r' }],
		['path', { d: 'M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2', key: 'be3xqs' }],
		['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
		[
			'path',
			{
				d: 'M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0',
				key: '11ak4c',
			},
		],
	],
	IH = [
		['rect', { width: '20', height: '16', x: '2', y: '4', rx: '2', key: '18n3k1' }],
		['path', { d: 'M2 8h20', key: 'd11cs7' }],
		['circle', { cx: '8', cy: '14', r: '2', key: '1k2qr5' }],
		['path', { d: 'M8 12h8', key: '1wcyev' }],
		['circle', { cx: '16', cy: '14', r: '2', key: '14k7lr' }],
	],
	xH = [
		['circle', { cx: '6', cy: '12', r: '4', key: '1ehtga' }],
		['circle', { cx: '18', cy: '12', r: '4', key: '4vafl8' }],
		['line', { x1: '6', x2: '18', y1: '16', y2: '16', key: 'pmt8us' }],
	],
	wH = [
		['path', { d: 'M11.1 7.1a16.55 16.55 0 0 1 10.9 4', key: '2880wi' }],
		['path', { d: 'M12 12a12.6 12.6 0 0 1-8.7 5', key: '113sja' }],
		['path', { d: 'M16.8 13.6a16.55 16.55 0 0 1-9 7.5', key: '1qmsgl' }],
		['path', { d: 'M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10', key: '1bmeqp' }],
		['path', { d: 'M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5', key: 'iekzv9' }],
		['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
	],
	CH = [
		[
			'path',
			{
				d: 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z',
				key: 'uqj9uw',
			},
		],
		['path', { d: 'M16 9a5 5 0 0 1 0 6', key: '1q6k2b' }],
	],
	LH = [
		[
			'path',
			{
				d: 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z',
				key: 'uqj9uw',
			},
		],
		['path', { d: 'M16 9a5 5 0 0 1 0 6', key: '1q6k2b' }],
		['path', { d: 'M19.364 18.364a9 9 0 0 0 0-12.728', key: 'ijwkga' }],
	],
	bH = [
		['path', { d: 'M16 9a5 5 0 0 1 .95 2.293', key: '1fgyg8' }],
		['path', { d: 'M19.364 5.636a9 9 0 0 1 1.889 9.96', key: 'l3zxae' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
		[
			'path',
			{
				d: 'm7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11',
				key: '1gbwow',
			},
		],
		['path', { d: 'M9.828 4.172A.686.686 0 0 1 11 4.657v.686', key: 's2je0y' }],
	],
	SH = [
		[
			'path',
			{
				d: 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z',
				key: 'uqj9uw',
			},
		],
		['line', { x1: '22', x2: '16', y1: '9', y2: '15', key: '1ewh16' }],
		['line', { x1: '16', x2: '22', y1: '9', y2: '15', key: '5ykzw1' }],
	],
	DH = [
		[
			'path',
			{
				d: 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z',
				key: 'uqj9uw',
			},
		],
	],
	AH = [
		['path', { d: 'm9 12 2 2 4-4', key: 'dzmm74' }],
		['path', { d: 'M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z', key: '1ezoue' }],
		['path', { d: 'M22 19H2', key: 'nuriw5' }],
	],
	EH = [
		['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
		['path', { d: 'M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2', key: '4125el' }],
		[
			'path',
			{ d: 'M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21', key: '1dpki6' },
		],
	],
	TH = [
		['path', { d: 'M17 14h.01', key: '7oqj8z' }],
		['path', { d: 'M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14', key: 'u1rqew' }],
	],
	PH = [
		[
			'path',
			{
				d: 'M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1',
				key: '18etb6',
			},
		],
		['path', { d: 'M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4', key: 'xoc0q4' }],
	],
	RH = [
		['path', { d: 'M12 17v4', key: '1riwvh' }],
		['path', { d: 'M8 21h8', key: '1ev6f3' }],
		['path', { d: 'm9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15', key: '1sl52q' }],
		['circle', { cx: '8', cy: '9', r: '2', key: 'gjzl9d' }],
		['rect', { x: '2', y: '3', width: '20', height: '14', rx: '2', key: 'x3v2xh' }],
	],
	NH = [
		[
			'path',
			{
				d: 'm21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72',
				key: 'ul74o6',
			},
		],
		['path', { d: 'm14 7 3 3', key: '1r5n42' }],
		['path', { d: 'M5 6v4', key: 'ilb8ba' }],
		['path', { d: 'M19 14v4', key: 'blhpug' }],
		['path', { d: 'M10 2v2', key: '7u0qdc' }],
		['path', { d: 'M7 8H3', key: 'zfb6yr' }],
		['path', { d: 'M21 16h-4', key: '1cnmox' }],
		['path', { d: 'M11 3H9', key: '1obp7u' }],
	],
	_H = [
		['path', { d: 'M15 4V2', key: 'z1p9b7' }],
		['path', { d: 'M15 16v-2', key: 'px0unx' }],
		['path', { d: 'M8 9h2', key: '1g203m' }],
		['path', { d: 'M20 9h2', key: '19tzq7' }],
		['path', { d: 'M17.8 11.8 19 13', key: 'yihg8r' }],
		['path', { d: 'M15 9h.01', key: 'x1ddxp' }],
		['path', { d: 'M17.8 6.2 19 5', key: 'fd4us0' }],
		['path', { d: 'm3 21 9-9', key: '1jfql5' }],
		['path', { d: 'M12.2 6.2 11 5', key: 'i3da3b' }],
	],
	HH = [
		['path', { d: 'M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11', key: 'pb2vm6' }],
		[
			'path',
			{
				d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z',
				key: 'doq5xv',
			},
		],
		['path', { d: 'M6 13h12', key: 'yf64js' }],
		['path', { d: 'M6 17h12', key: '1jwigz' }],
	],
	OH = [
		['path', { d: 'M3 6h3', key: '155dbl' }],
		['path', { d: 'M17 6h.01', key: 'e2y6kg' }],
		['rect', { width: '18', height: '20', x: '3', y: '2', rx: '2', key: 'od3kk9' }],
		['circle', { cx: '12', cy: '13', r: '5', key: 'nlbqau' }],
		['path', { d: 'M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5', key: '17lach' }],
	],
	FH = [
		['path', { d: 'M12 10v2.2l1.6 1', key: 'n3r21l' }],
		['path', { d: 'm16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05', key: '18k57s' }],
		['path', { d: 'm7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05', key: '16ny36' }],
		['circle', { cx: '12', cy: '12', r: '6', key: '1vlfrh' }],
	],
	jH = [
		['path', { d: 'M12 10L12 2', key: 'jvb0aw' }],
		['path', { d: 'M16 6L12 10L8 6', key: '9j6vje' }],
		[
			'path',
			{
				d: 'M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15',
				key: 's2zepw',
			},
		],
		[
			'path',
			{
				d: 'M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21',
				key: 'u68omc',
			},
		],
	],
	qH = [
		['path', { d: 'M12 2v8', key: '1q4o3n' }],
		[
			'path',
			{
				d: 'M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
				key: '1p9f19',
			},
		],
		[
			'path',
			{
				d: 'M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
				key: 'vbxynw',
			},
		],
		['path', { d: 'm8 6 4-4 4 4', key: 'ybng9g' }],
	],
	VH = [
		['path', { d: 'M19 5a2 2 0 0 0-2 2v11', key: 's41o68' }],
		[
			'path',
			{
				d: 'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
				key: 'rd2r6e',
			},
		],
		['path', { d: 'M7 13h10', key: '1rwob1' }],
		['path', { d: 'M7 9h10', key: '12czzb' }],
		['path', { d: 'M9 5a2 2 0 0 0-2 2v11', key: 'x0q4gh' }],
	],
	zH = [
		[
			'path',
			{
				d: 'M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
				key: 'knzxuh',
			},
		],
		[
			'path',
			{
				d: 'M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
				key: '2jd2cc',
			},
		],
		[
			'path',
			{
				d: 'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
				key: 'rd2r6e',
			},
		],
	],
	BH = [
		['circle', { cx: '12', cy: '4.5', r: '2.5', key: 'r5ysbb' }],
		['path', { d: 'm10.2 6.3-3.9 3.9', key: '1nzqf6' }],
		['circle', { cx: '4.5', cy: '12', r: '2.5', key: 'jydg6v' }],
		['path', { d: 'M7 12h10', key: 'b7w52i' }],
		['circle', { cx: '19.5', cy: '12', r: '2.5', key: '1piiel' }],
		['path', { d: 'm13.8 17.7 3.9-3.9', key: '1wyg1y' }],
		['circle', { cx: '12', cy: '19.5', r: '2.5', key: '13o1pw' }],
	],
	UH = [
		['circle', { cx: '12', cy: '10', r: '8', key: '1gshiw' }],
		['circle', { cx: '12', cy: '10', r: '3', key: 'ilqhr7' }],
		['path', { d: 'M7 22h10', key: '10w4w3' }],
		['path', { d: 'M12 22v-4', key: '1utk9m' }],
	],
	GH = [
		['path', { d: 'M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15', key: '1tvl6x' }],
		['path', { d: 'M9 3.4a4 4 0 0 1 6.52.66', key: 'q04jfq' }],
		['path', { d: 'm6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05', key: 'azowf0' }],
		['path', { d: 'M20.3 20.3a4 4 0 0 1-2.3.7', key: '5joiws' }],
		['path', { d: 'M18.6 13a4 4 0 0 1 3.357 3.414', key: 'cangb8' }],
		['path', { d: 'm12 6 .6 1', key: 'tpjl1n' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	WH = [
		['path', { d: 'M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2', key: 'q3hayz' }],
		['path', { d: 'm6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06', key: '1go1hn' }],
		['path', { d: 'm12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8', key: 'qlwsc0' }],
	],
	$H = [
		[
			'path',
			{
				d: 'M6.5 8a2 2 0 0 0-1.906 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8z',
				key: '1wl739',
			},
		],
		['path', { d: 'M7.999 15a2.5 2.5 0 0 1 4 0 2.5 2.5 0 0 0 4 0', key: '1egezo' }],
		['circle', { cx: '12', cy: '5', r: '3', key: 'rqqgnr' }],
	],
	ZH = [
		['circle', { cx: '12', cy: '5', r: '3', key: 'rqqgnr' }],
		[
			'path',
			{
				d: 'M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z',
				key: '56o5sh',
			},
		],
	],
	QH = [
		['path', { d: 'm2 22 10-10', key: '28ilpk' }],
		['path', { d: 'm16 8-1.17 1.17', key: '1qqm82' }],
		[
			'path',
			{
				d: 'M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z',
				key: '1rdhi6',
			},
		],
		['path', { d: 'm8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97', key: '4wz8re' }],
		['path', { d: 'M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62', key: 'rves66' }],
		['path', { d: 'M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z', key: '19rau1' }],
		[
			'path',
			{
				d: 'M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z',
				key: 'tc8ph9',
			},
		],
		['path', { d: 'm16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98', key: 'ak46r' }],
		['path', { d: 'M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28', key: '1tw520' }],
		['line', { x1: '2', x2: '22', y1: '2', y2: '22', key: 'a6p6uj' }],
	],
	XH = [
		['path', { d: 'M2 22 16 8', key: '60hf96' }],
		[
			'path',
			{
				d: 'M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z',
				key: '1rdhi6',
			},
		],
		[
			'path',
			{ d: 'M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', key: '1sdzmb' },
		],
		[
			'path',
			{
				d: 'M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z',
				key: 'eoatbi',
			},
		],
		['path', { d: 'M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z', key: '19rau1' }],
		[
			'path',
			{
				d: 'M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z',
				key: 'tc8ph9',
			},
		],
		[
			'path',
			{
				d: 'M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z',
				key: '2m8kc5',
			},
		],
		[
			'path',
			{
				d: 'M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z',
				key: 'vex3ng',
			},
		],
	],
	KH = [
		['circle', { cx: '7', cy: '12', r: '3', key: '12clwm' }],
		['path', { d: 'M10 9v6', key: '17i7lo' }],
		['circle', { cx: '17', cy: '12', r: '3', key: 'gl7c2s' }],
		['path', { d: 'M14 7v8', key: 'dl84cr' }],
		['path', { d: 'M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1', key: 'lt2kga' }],
	],
	YH = [
		['path', { d: 'm14.305 19.53.923-.382', key: '3m78fa' }],
		['path', { d: 'm15.228 16.852-.923-.383', key: 'npixar' }],
		['path', { d: 'm16.852 15.228-.383-.923', key: '5xggr7' }],
		['path', { d: 'm16.852 20.772-.383.924', key: 'dpfhf9' }],
		['path', { d: 'm19.148 15.228.383-.923', key: '1reyyz' }],
		['path', { d: 'm19.53 21.696-.382-.924', key: '1goivc' }],
		['path', { d: 'M2 7.82a15 15 0 0 1 20 0', key: '1ovjuk' }],
		['path', { d: 'm20.772 16.852.924-.383', key: 'htqkph' }],
		['path', { d: 'm20.772 19.148.924.383', key: '9w9pjp' }],
		['path', { d: 'M5 11.858a10 10 0 0 1 11.5-1.785', key: '3sn16i' }],
		['path', { d: 'M8.5 15.429a5 5 0 0 1 2.413-1.31', key: '1pxovh' }],
		['circle', { cx: '18', cy: '18', r: '3', key: '1xkwt0' }],
	],
	JH = [
		['path', { d: 'M12 20h.01', key: 'zekei9' }],
		['path', { d: 'M5 12.859a10 10 0 0 1 14 0', key: '1x1e6c' }],
		['path', { d: 'M8.5 16.429a5 5 0 0 1 7 0', key: '1bycff' }],
	],
	eO = [
		['path', { d: 'M12 20h.01', key: 'zekei9' }],
		['path', { d: 'M8.5 16.429a5 5 0 0 1 7 0', key: '1bycff' }],
		['path', { d: 'M5 12.859a10 10 0 0 1 5.17-2.69', key: '1dl1wf' }],
		['path', { d: 'M19 12.859a10 10 0 0 0-2.007-1.523', key: '4k23kn' }],
		['path', { d: 'M2 8.82a15 15 0 0 1 4.177-2.643', key: '1grhjp' }],
		['path', { d: 'M22 8.82a15 15 0 0 0-11.288-3.764', key: 'z3jwby' }],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	tO = [
		['path', { d: 'M12 20h.01', key: 'zekei9' }],
		['path', { d: 'M8.5 16.429a5 5 0 0 1 7 0', key: '1bycff' }],
	],
	nO = [
		['path', { d: 'M2 8.82a15 15 0 0 1 20 0', key: 'dnpr2z' }],
		[
			'path',
			{
				d: 'M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
				key: '1817ys',
			},
		],
		['path', { d: 'M5 12.859a10 10 0 0 1 10.5-2.222', key: 'rpb7oy' }],
		['path', { d: 'M8.5 16.429a5 5 0 0 1 3-1.406', key: 'r8bmzl' }],
	],
	aO = [['path', { d: 'M12 20h.01', key: 'zekei9' }]],
	oO = [
		['path', { d: 'M11.965 10.105v4L13.5 12.5a5 5 0 0 1 8 1.5', key: '1immaq' }],
		['path', { d: 'M11.965 14.105h4', key: 'uejny8' }],
		['path', { d: 'M17.965 18.105h4L20.43 19.71a5 5 0 0 1-8-1.5', key: '1i3a7e' }],
		['path', { d: 'M2 8.82a15 15 0 0 1 20 0', key: 'dnpr2z' }],
		['path', { d: 'M21.965 22.105v-4', key: '1ku6vx' }],
		['path', { d: 'M5 12.86a10 10 0 0 1 3-2.032', key: 'pemdtu' }],
		['path', { d: 'M8.5 16.429h.01', key: '2bm739' }],
	],
	rO = [
		['path', { d: 'M12 20h.01', key: 'zekei9' }],
		['path', { d: 'M2 8.82a15 15 0 0 1 20 0', key: 'dnpr2z' }],
		['path', { d: 'M5 12.859a10 10 0 0 1 14 0', key: '1x1e6c' }],
		['path', { d: 'M8.5 16.429a5 5 0 0 1 7 0', key: '1bycff' }],
	],
	iO = [
		['path', { d: 'M10 2v8', key: 'd4bbey' }],
		['path', { d: 'M12.8 21.6A2 2 0 1 0 14 18H2', key: '19kp1d' }],
		['path', { d: 'M17.5 10a2.5 2.5 0 1 1 2 4H2', key: '19kpjc' }],
		['path', { d: 'm6 6 4 4 4-4', key: 'k13n16' }],
	],
	sO = [
		['path', { d: 'M12.8 19.6A2 2 0 1 0 14 16H2', key: '148xed' }],
		['path', { d: 'M17.5 8a2.5 2.5 0 1 1 2 4H2', key: '1u4tom' }],
		['path', { d: 'M9.8 4.4A2 2 0 1 1 11 8H2', key: '75valh' }],
	],
	cO = [
		['path', { d: 'M8 22h8', key: 'rmew8v' }],
		['path', { d: 'M7 10h3m7 0h-1.343', key: 'v48bem' }],
		['path', { d: 'M12 15v7', key: 't2xh3l' }],
		[
			'path',
			{
				d: 'M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198',
				key: '1ymjlu',
			},
		],
		['line', { x1: '2', x2: '22', y1: '2', y2: '22', key: 'a6p6uj' }],
	],
	dO = [
		['rect', { width: '8', height: '8', x: '3', y: '3', rx: '2', key: 'by2w9f' }],
		['path', { d: 'M7 11v4a2 2 0 0 0 2 2h4', key: 'xkn7yn' }],
		['rect', { width: '8', height: '8', x: '13', y: '13', rx: '2', key: '1cgmvn' }],
	],
	lO = [
		['path', { d: 'M8 22h8', key: 'rmew8v' }],
		['path', { d: 'M7 10h10', key: '1101jm' }],
		['path', { d: 'M12 15v7', key: 't2xh3l' }],
		['path', { d: 'M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z', key: '10ffi3' }],
	],
	uO = [
		['path', { d: 'm19 12-1.5 3', key: '9bcu4o' }],
		['path', { d: 'M19.63 18.81 22 20', key: '121v98' }],
		[
			'path',
			{
				d: 'M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z',
				key: '1tij6q',
			},
		],
	],
	hO = [
		[
			'path',
			{
				d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z',
				key: '1ngwbx',
			},
		],
	],
	pO = [
		['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
		['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
	],
	yO = [
		[
			'path',
			{
				d: 'M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17',
				key: '1q2vi4',
			},
		],
		['path', { d: 'm10 15 5-3-5-3z', key: '1jp15x' }],
	],
	fO = [
		[
			'path',
			{
				d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z',
				key: '1xq2db',
			},
		],
	],
	kO = [
		['path', { d: 'M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317', key: '193nxd' }],
		['path', { d: 'M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773', key: '27a7lr' }],
		[
			'path',
			{
				d: 'M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643',
				key: '1e0qe9',
			},
		],
		['path', { d: 'm2 2 20 20', key: '1ooewy' }],
	],
	gO = [
		['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
		['line', { x1: '21', x2: '16.65', y1: '21', y2: '16.65', key: '13gj7c' }],
		['line', { x1: '11', x2: '11', y1: '8', y2: '14', key: '1vmskp' }],
		['line', { x1: '8', x2: '14', y1: '11', y2: '11', key: 'durymu' }],
	],
	mO = [
		['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
		['line', { x1: '21', x2: '16.65', y1: '21', y2: '16.65', key: '13gj7c' }],
		['line', { x1: '8', x2: '14', y1: '11', y2: '11', key: 'durymu' }],
	],
	fK = Object.freeze({
		__proto__: null,
		AArrowDown: bp,
		AArrowUp: Sp,
		ALargeSmall: Dp,
		Activity: Ap,
		Accessibility: Ep,
		AirVent: Tp,
		Airplay: Pp,
		AlarmClockCheck: Rp,
		AlarmClockMinus: Np,
		AlarmClockOff: _p,
		AlarmClockPlus: Hp,
		AlarmClock: Op,
		AlarmSmoke: Fp,
		Album: jp,
		AlignCenterHorizontal: qp,
		AlignCenterVertical: Vp,
		AlignEndHorizontal: zp,
		AlignEndVertical: Bp,
		AlignHorizontalDistributeCenter: Up,
		AlignHorizontalDistributeEnd: Gp,
		AlignHorizontalDistributeStart: Wp,
		AlignHorizontalJustifyCenter: $p,
		AlignHorizontalJustifyEnd: Zp,
		AlignHorizontalJustifyStart: Qp,
		AlignHorizontalSpaceAround: Xp,
		AlignHorizontalSpaceBetween: Kp,
		AlignStartHorizontal: Yp,
		AlignStartVertical: Jp,
		AlignVerticalDistributeCenter: ey,
		AlignVerticalDistributeEnd: ty,
		AlignVerticalDistributeStart: ny,
		AlignVerticalJustifyCenter: ay,
		AlignVerticalJustifyEnd: oy,
		AlignVerticalJustifyStart: ry,
		AlignVerticalSpaceAround: iy,
		AlignVerticalSpaceBetween: sy,
		Ambulance: cy,
		Ampersand: dy,
		Ampersands: ly,
		Amphora: uy,
		Anchor: hy,
		Angry: py,
		Annoyed: yy,
		Antenna: fy,
		Anvil: ky,
		Aperture: gy,
		AppWindowMac: my,
		AppWindow: My,
		Apple: vy,
		ArchiveRestore: Iy,
		ArchiveX: xy,
		Archive: wy,
		Armchair: Cy,
		ArrowBigDownDash: Ly,
		ArrowBigDown: by,
		ArrowBigLeft: Sy,
		ArrowBigLeftDash: Dy,
		ArrowBigRightDash: Ay,
		ArrowBigRight: Ey,
		ArrowBigUpDash: Ty,
		ArrowBigUp: Py,
		ArrowDown01: Ry,
		ArrowDown10: Ny,
		ArrowDownAZ: _y,
		ArrowDownFromLine: Hy,
		ArrowDownLeft: Oy,
		ArrowDownNarrowWide: Fy,
		ArrowDownRight: jy,
		ArrowDownToDot: qy,
		ArrowDownToLine: Vy,
		ArrowDownUp: zy,
		ArrowDownWideNarrow: By,
		ArrowDownZA: Uy,
		ArrowDown: Gy,
		ArrowLeftFromLine: Wy,
		ArrowLeftRight: $y,
		ArrowLeftToLine: Zy,
		ArrowLeft: Qy,
		ArrowRightFromLine: Xy,
		ArrowRightLeft: Ky,
		ArrowRightToLine: Yy,
		ArrowRight: Jy,
		ArrowUp01: ef,
		ArrowUp10: tf,
		ArrowUpAZ: nf,
		ArrowUpDown: af,
		ArrowUpFromDot: of,
		ArrowUpFromLine: rf,
		ArrowUpLeft: sf,
		ArrowUpNarrowWide: cf,
		ArrowUpRight: df,
		ArrowUpToLine: lf,
		ArrowUpWideNarrow: uf,
		ArrowUpZA: hf,
		ArrowUp: pf,
		ArrowsUpFromLine: yf,
		Asterisk: ff,
		AtSign: kf,
		Atom: gf,
		AudioLines: mf,
		AudioWaveform: Mf,
		Award: vf,
		Axis3d: If,
		Baby: xf,
		Axe: wf,
		Backpack: Cf,
		BadgeAlert: Lf,
		BadgeCent: bf,
		BadgeCheck: Sf,
		BadgeDollarSign: Df,
		BadgeEuro: Af,
		BadgeIndianRupee: Ef,
		BadgeInfo: Tf,
		BadgeMinus: Pf,
		BadgeJapaneseYen: Rf,
		BadgePercent: Nf,
		BadgePlus: _f,
		BadgePoundSterling: Hf,
		BadgeQuestionMark: Of,
		BadgeRussianRuble: Ff,
		BadgeSwissFranc: jf,
		BadgeTurkishLira: qf,
		BadgeX: Vf,
		Badge: zf,
		BaggageClaim: Bf,
		Balloon: Uf,
		Banana: Gf,
		Ban: Wf,
		Bandage: $f,
		BanknoteArrowDown: Zf,
		BanknoteArrowUp: Qf,
		BanknoteX: Xf,
		Banknote: Kf,
		Barcode: Yf,
		Barrel: Jf,
		Bath: ek,
		Baseline: tk,
		BatteryCharging: nk,
		BatteryFull: ak,
		BatteryLow: ok,
		BatteryMedium: rk,
		BatteryPlus: ik,
		BatteryWarning: sk,
		Battery: ck,
		Beaker: dk,
		BeanOff: lk,
		Bean: uk,
		BedDouble: hk,
		BedSingle: pk,
		Bed: yk,
		Beef: fk,
		BeerOff: kk,
		Beer: gk,
		BellDot: mk,
		BellElectric: Mk,
		BellMinus: vk,
		BellOff: Ik,
		BellPlus: xk,
		BellRing: wk,
		Bell: Ck,
		BetweenHorizontalEnd: Lk,
		BetweenHorizontalStart: bk,
		BetweenVerticalEnd: Sk,
		BetweenVerticalStart: Dk,
		BicepsFlexed: Ak,
		Bike: Ek,
		Binary: Tk,
		Binoculars: Pk,
		Biohazard: Rk,
		Bird: Nk,
		Birdhouse: _k,
		Bitcoin: Hk,
		Blend: Ok,
		Blinds: Fk,
		Blocks: jk,
		BluetoothConnected: qk,
		BluetoothOff: Vk,
		BluetoothSearching: zk,
		Bluetooth: Bk,
		Bold: Uk,
		Bolt: Gk,
		Bomb: Wk,
		Bone: $k,
		BookA: Zk,
		BookAlert: Qk,
		BookAudio: Xk,
		BookCheck: Kk,
		BookCopy: Yk,
		BookDashed: Jk,
		BookDown: e4,
		BookHeadphones: t4,
		BookHeart: n4,
		BookImage: a4,
		BookKey: o4,
		BookLock: r4,
		BookMarked: i4,
		BookMinus: s4,
		BookOpenCheck: c4,
		BookOpenText: d4,
		BookOpen: l4,
		BookPlus: u4,
		BookSearch: h4,
		BookType: p4,
		BookText: y4,
		BookUp2: f4,
		BookUp: k4,
		BookUser: g4,
		BookX: m4,
		Book: M4,
		BookmarkCheck: v4,
		BookmarkMinus: I4,
		BookmarkPlus: x4,
		BookmarkX: w4,
		Bookmark: C4,
		BoomBox: L4,
		BotMessageSquare: b4,
		BotOff: S4,
		Bot: D4,
		BottleWine: A4,
		BowArrow: E4,
		Box: T4,
		Boxes: P4,
		Braces: R4,
		Brackets: N4,
		BrainCircuit: _4,
		BrainCog: H4,
		Brain: O4,
		BrickWallFire: F4,
		BrickWallShield: j4,
		BrickWall: q4,
		BriefcaseBusiness: V4,
		BriefcaseConveyorBelt: z4,
		BriefcaseMedical: B4,
		Briefcase: U4,
		BringToFront: G4,
		BrushCleaning: W4,
		Brush: $4,
		BugOff: Z4,
		Bubbles: Q4,
		BugPlay: X4,
		Bug: K4,
		Building2: Y4,
		Building: J4,
		BusFront: e5,
		Bus: t5,
		CableCar: n5,
		CakeSlice: a5,
		Cable: o5,
		Cake: r5,
		Calculator: i5,
		Calendar1: s5,
		CalendarArrowDown: c5,
		CalendarArrowUp: d5,
		CalendarCheck2: l5,
		CalendarCheck: u5,
		CalendarClock: h5,
		CalendarCog: p5,
		CalendarDays: y5,
		CalendarFold: f5,
		CalendarHeart: k5,
		CalendarMinus2: g5,
		CalendarMinus: m5,
		CalendarOff: M5,
		CalendarPlus2: v5,
		CalendarPlus: I5,
		CalendarSearch: x5,
		CalendarRange: w5,
		CalendarSync: C5,
		CalendarX2: L5,
		CalendarX: b5,
		Calendar: S5,
		Calendars: D5,
		CameraOff: A5,
		Camera: E5,
		CandyCane: T5,
		CandyOff: P5,
		Candy: R5,
		CannabisOff: N5,
		Cannabis: _5,
		CaptionsOff: H5,
		CarFront: O5,
		Captions: F5,
		CarTaxiFront: j5,
		Car: q5,
		Caravan: V5,
		CardSim: z5,
		Carrot: B5,
		CaseLower: U5,
		CaseSensitive: G5,
		CaseUpper: W5,
		CassetteTape: $5,
		Cast: Z5,
		Castle: Q5,
		Cctv: X5,
		Cat: K5,
		ChartArea: Y5,
		ChartBarBig: J5,
		ChartBarDecreasing: eg,
		ChartBarIncreasing: tg,
		ChartBarStacked: ng,
		ChartBar: ag,
		ChartCandlestick: og,
		ChartColumnBig: rg,
		ChartColumnDecreasing: ig,
		ChartColumnIncreasing: sg,
		ChartColumnStacked: cg,
		ChartColumn: dg,
		ChartGantt: lg,
		ChartLine: ug,
		ChartNetwork: hg,
		ChartNoAxesColumnDecreasing: pg,
		ChartNoAxesColumnIncreasing: yg,
		ChartNoAxesColumn: fg,
		ChartNoAxesCombined: kg,
		ChartNoAxesGantt: gg,
		ChartPie: mg,
		ChartScatter: Mg,
		ChartSpline: vg,
		CheckCheck: Ig,
		CheckLine: xg,
		Check: wg,
		ChefHat: Cg,
		Cherry: Lg,
		ChessBishop: bg,
		ChessKing: Sg,
		ChessKnight: Dg,
		ChessPawn: Ag,
		ChessQueen: Eg,
		ChessRook: Tg,
		ChevronDown: Pg,
		ChevronFirst: Rg,
		ChevronLast: Ng,
		ChevronLeft: _g,
		ChevronRight: Hg,
		ChevronUp: Og,
		ChevronsDownUp: Fg,
		ChevronsDown: jg,
		ChevronsLeftRightEllipsis: qg,
		ChevronsLeftRight: Vg,
		ChevronsLeft: zg,
		ChevronsRightLeft: Bg,
		ChevronsRight: Ug,
		ChevronsUpDown: Gg,
		ChevronsUp: Wg,
		Chromium: $g,
		Church: Zg,
		CigaretteOff: Qg,
		Cigarette: Xg,
		CircleAlert: Kg,
		CircleArrowDown: Yg,
		CircleArrowLeft: Jg,
		CircleArrowOutDownLeft: e3,
		CircleArrowOutDownRight: t3,
		CircleArrowOutUpLeft: n3,
		CircleArrowOutUpRight: a3,
		CircleArrowRight: o3,
		CircleArrowUp: r3,
		CircleCheckBig: i3,
		CircleCheck: s3,
		CircleChevronDown: c3,
		CircleChevronLeft: d3,
		CircleChevronRight: l3,
		CircleChevronUp: u3,
		CircleDashed: h3,
		CircleDivide: p3,
		CircleDollarSign: y3,
		CircleDotDashed: f3,
		CircleDot: k3,
		CircleEllipsis: g3,
		CircleEqual: m3,
		CircleFadingArrowUp: M3,
		CircleFadingPlus: v3,
		CircleGauge: I3,
		CircleMinus: x3,
		CircleParkingOff: w3,
		CircleOff: C3,
		CircleParking: L3,
		CirclePause: b3,
		CirclePercent: S3,
		CirclePile: D3,
		CirclePlay: A3,
		CirclePlus: E3,
		CirclePoundSterling: T3,
		CirclePower: P3,
		CircleQuestionMark: R3,
		CircleSlash2: N3,
		CircleSlash: _3,
		CircleSmall: H3,
		CircleStar: O3,
		CircleStop: F3,
		CircleUserRound: j3,
		CircleUser: q3,
		CircleX: V3,
		Circle: z3,
		CircuitBoard: B3,
		Citrus: U3,
		Clapperboard: G3,
		ClipboardCheck: W3,
		ClipboardClock: $3,
		ClipboardCopy: Z3,
		ClipboardList: Q3,
		ClipboardMinus: X3,
		ClipboardPaste: K3,
		ClipboardPenLine: Y3,
		ClipboardPen: J3,
		ClipboardPlus: em,
		ClipboardType: tm,
		ClipboardX: nm,
		Clipboard: am,
		Clock1: om,
		Clock10: rm,
		Clock11: im,
		Clock12: sm,
		Clock2: cm,
		Clock3: dm,
		Clock4: lm,
		Clock6: um,
		Clock5: hm,
		Clock7: pm,
		Clock8: ym,
		Clock9: fm,
		ClockAlert: km,
		ClockArrowDown: gm,
		ClockArrowUp: mm,
		ClockCheck: Mm,
		ClockFading: vm,
		ClockPlus: Im,
		Clock: xm,
		ClosedCaption: wm,
		CloudAlert: Cm,
		CloudBackup: Lm,
		CloudCheck: bm,
		CloudCog: Sm,
		CloudDownload: Dm,
		CloudDrizzle: Am,
		CloudFog: Em,
		CloudHail: Tm,
		CloudLightning: Pm,
		CloudMoonRain: Rm,
		CloudMoon: Nm,
		CloudOff: _m,
		CloudRainWind: Hm,
		CloudRain: Om,
		CloudSnow: Fm,
		CloudSun: jm,
		CloudSync: qm,
		CloudSunRain: Vm,
		CloudUpload: zm,
		Cloud: Bm,
		Clover: Um,
		Cloudy: Gm,
		Club: Wm,
		CodeXml: $m,
		Code: Zm,
		Codepen: Qm,
		Codesandbox: Xm,
		Coffee: Km,
		Cog: Ym,
		Coins: Jm,
		Columns2: e8,
		Columns3Cog: t8,
		Columns3: n8,
		Columns4: a8,
		Combine: o8,
		Command: r8,
		Compass: i8,
		Component: s8,
		Computer: c8,
		Cone: d8,
		ConciergeBell: l8,
		Construction: u8,
		ContactRound: h8,
		Contact: p8,
		Container: y8,
		Contrast: f8,
		Cookie: k8,
		CookingPot: g8,
		CopyCheck: m8,
		CopyMinus: M8,
		CopyPlus: v8,
		CopySlash: I8,
		CopyX: x8,
		Copy: w8,
		Copyleft: C8,
		Copyright: L8,
		CornerDownLeft: b8,
		CornerLeftDown: S8,
		CornerDownRight: D8,
		CornerLeftUp: A8,
		CornerRightDown: E8,
		CornerRightUp: T8,
		CornerUpLeft: P8,
		CornerUpRight: R8,
		CreditCard: N8,
		Cpu: _8,
		CreativeCommons: H8,
		Croissant: O8,
		Crop: F8,
		Cross: j8,
		Crosshair: q8,
		Crown: V8,
		Cuboid: z8,
		CupSoda: B8,
		Currency: U8,
		Cylinder: G8,
		Dam: W8,
		DatabaseBackup: $8,
		DatabaseZap: Z8,
		Database: Q8,
		DecimalsArrowLeft: X8,
		Delete: K8,
		DecimalsArrowRight: Y8,
		Dessert: J8,
		Diameter: e6,
		DiamondMinus: t6,
		DiamondPercent: n6,
		DiamondPlus: a6,
		Diamond: o6,
		Dice1: r6,
		Dice2: i6,
		Dice3: s6,
		Dice4: c6,
		Dice5: d6,
		Dice6: l6,
		Dices: u6,
		Diff: h6,
		Disc2: p6,
		Disc3: y6,
		DiscAlbum: f6,
		Divide: k6,
		Disc: g6,
		DnaOff: m6,
		Dna: M6,
		Dock: v6,
		Dog: I6,
		DollarSign: x6,
		Donut: w6,
		DoorClosedLocked: C6,
		DoorClosed: L6,
		DoorOpen: b6,
		Dot: S6,
		Download: D6,
		DraftingCompass: A6,
		Drama: E6,
		Dribbble: T6,
		Drill: P6,
		Drone: R6,
		DropletOff: N6,
		Droplet: _6,
		Droplets: H6,
		Drum: O6,
		Drumstick: F6,
		Dumbbell: j6,
		EarOff: q6,
		EarthLock: V6,
		Ear: z6,
		Earth: B6,
		Eclipse: U6,
		EggFried: G6,
		EggOff: W6,
		EllipsisVertical: $6,
		Egg: Z6,
		Ellipsis: Q6,
		EqualApproximately: X6,
		EqualNot: K6,
		Equal: Y6,
		Eraser: J6,
		EthernetPort: eM,
		Euro: tM,
		EvCharger: nM,
		Expand: aM,
		ExternalLink: oM,
		EyeClosed: rM,
		EyeOff: iM,
		Eye: sM,
		Facebook: cM,
		Factory: dM,
		Fan: lM,
		FastForward: uM,
		Feather: hM,
		Fence: pM,
		FerrisWheel: yM,
		Figma: fM,
		FileArchive: kM,
		FileAxis3d: gM,
		FileBadge: mM,
		FileBox: MM,
		FileBracesCorner: vM,
		FileBraces: IM,
		FileChartColumnIncreasing: xM,
		FileChartColumn: wM,
		FileChartLine: CM,
		FileChartPie: LM,
		FileCheckCorner: bM,
		FileCheck: SM,
		FileClock: DM,
		FileCodeCorner: AM,
		FileCode: EM,
		FileCog: TM,
		FileDiff: PM,
		FileDigit: RM,
		FileDown: NM,
		FileExclamationPoint: _M,
		FileHeadphone: HM,
		FileHeart: OM,
		FileImage: FM,
		FileInput: jM,
		FileKey: qM,
		FileLock: VM,
		FileMinusCorner: zM,
		FileMinus: BM,
		FileMusic: UM,
		FileOutput: GM,
		FilePenLine: WM,
		FilePen: $M,
		FilePlay: ZM,
		FilePlusCorner: QM,
		FilePlus: XM,
		FileQuestionMark: KM,
		FileScan: YM,
		FileSearchCorner: JM,
		FileSearch: ev,
		FileSignal: tv,
		FileSliders: nv,
		FileSpreadsheet: av,
		FileStack: ov,
		FileSymlink: rv,
		FileTerminal: iv,
		FileText: sv,
		FileTypeCorner: cv,
		FileType: dv,
		FileUp: lv,
		FileUser: uv,
		FileVideoCamera: hv,
		FileVolume: pv,
		FileXCorner: yv,
		FileX: fv,
		File: kv,
		Files: gv,
		Film: mv,
		FingerprintPattern: Mv,
		FireExtinguisher: vv,
		FishOff: Iv,
		FishSymbol: xv,
		Fish: wv,
		FishingHook: Cv,
		FlagOff: Lv,
		FlagTriangleLeft: bv,
		FlagTriangleRight: Sv,
		Flag: Dv,
		FlameKindling: Av,
		Flame: Ev,
		FlashlightOff: Tv,
		Flashlight: Pv,
		FlaskConicalOff: Rv,
		FlaskRound: Nv,
		FlaskConical: _v,
		FlipHorizontal2: Hv,
		FlipHorizontal: Ov,
		FlipVertical2: Fv,
		FlipVertical: jv,
		Flower2: qv,
		Flower: Vv,
		Focus: zv,
		FoldHorizontal: Bv,
		FoldVertical: Uv,
		FolderArchive: Gv,
		FolderCheck: Wv,
		FolderClock: $v,
		FolderClosed: Zv,
		FolderCode: Qv,
		FolderCog: Xv,
		FolderDot: Kv,
		FolderDown: Yv,
		FolderGit2: Jv,
		FolderGit: e7,
		FolderHeart: t7,
		FolderInput: n7,
		FolderKanban: a7,
		FolderKey: o7,
		FolderLock: r7,
		FolderMinus: i7,
		FolderOpenDot: s7,
		FolderOpen: c7,
		FolderOutput: d7,
		FolderPen: l7,
		FolderPlus: u7,
		FolderRoot: h7,
		FolderSearch2: p7,
		FolderSearch: y7,
		FolderSymlink: f7,
		FolderSync: k7,
		FolderTree: g7,
		FolderUp: m7,
		FolderX: M7,
		Folder: v7,
		Folders: I7,
		Footprints: x7,
		Forklift: w7,
		Form: C7,
		Forward: L7,
		Frame: b7,
		Framer: S7,
		Frown: D7,
		Fuel: A7,
		Fullscreen: E7,
		FunnelPlus: T7,
		FunnelX: P7,
		Funnel: R7,
		GalleryHorizontalEnd: N7,
		GalleryHorizontal: _7,
		GalleryThumbnails: H7,
		GalleryVerticalEnd: O7,
		GalleryVertical: F7,
		Gamepad2: j7,
		GamepadDirectional: q7,
		Gamepad: V7,
		Gauge: z7,
		Gavel: B7,
		Gem: U7,
		GeorgianLari: G7,
		Ghost: W7,
		Gift: $7,
		GitBranchMinus: Z7,
		GitBranchPlus: Q7,
		GitBranch: X7,
		GitCommitHorizontal: K7,
		GitCommitVertical: Y7,
		GitCompareArrows: J7,
		GitCompare: e9,
		GitFork: t9,
		GitGraph: n9,
		GitMerge: a9,
		GitPullRequestArrow: o9,
		GitPullRequestClosed: r9,
		GitPullRequestCreateArrow: i9,
		GitPullRequestCreate: s9,
		GitPullRequest: c9,
		GitPullRequestDraft: d9,
		Github: l9,
		Gitlab: u9,
		GlassWater: h9,
		Glasses: p9,
		GlobeLock: y9,
		Goal: f9,
		Globe: k9,
		Gpu: g9,
		GraduationCap: m9,
		Grape: M9,
		Grid2x2Check: v9,
		Grid2x2Plus: I9,
		Grid2x2: x9,
		Grid2x2X: w9,
		Grid3x2: C9,
		Grid3x3: L9,
		GripHorizontal: b9,
		GripVertical: S9,
		Grip: D9,
		Group: A9,
		Guitar: E9,
		Ham: T9,
		Hamburger: P9,
		Hammer: R9,
		HandCoins: N9,
		HandFist: _9,
		HandGrab: H9,
		HandHeart: O9,
		HandHelping: F9,
		HandMetal: j9,
		HandPlatter: q9,
		Hand: V9,
		Handbag: z9,
		Handshake: B9,
		HardDriveDownload: U9,
		HardDriveUpload: G9,
		HardHat: W9,
		HardDrive: $9,
		HatGlasses: Z9,
		Hash: Q9,
		Haze: X9,
		Hd: K9,
		HdmiPort: Y9,
		Heading1: J9,
		Heading2: eI,
		Heading3: tI,
		Heading4: nI,
		Heading5: aI,
		Heading: oI,
		Heading6: rI,
		HeadphoneOff: iI,
		Headphones: sI,
		Headset: cI,
		HeartCrack: dI,
		HeartHandshake: lI,
		HeartMinus: uI,
		HeartOff: hI,
		HeartPlus: pI,
		HeartPulse: yI,
		Heart: fI,
		Heater: kI,
		Helicopter: gI,
		Hexagon: mI,
		Highlighter: MI,
		History: vI,
		HopOff: II,
		Hop: xI,
		Hospital: wI,
		Hotel: CI,
		Hourglass: LI,
		HouseHeart: bI,
		HousePlug: SI,
		HousePlus: DI,
		HouseWifi: AI,
		House: EI,
		IceCreamBowl: TI,
		IceCreamCone: PI,
		IdCardLanyard: RI,
		IdCard: NI,
		ImageDown: _I,
		ImageMinus: HI,
		ImagePlay: OI,
		ImageOff: FI,
		ImageUp: jI,
		ImagePlus: qI,
		ImageUpscale: VI,
		Image: zI,
		Images: BI,
		Import: UI,
		Inbox: GI,
		IndianRupee: WI,
		Infinity: $I,
		Info: ZI,
		InspectionPanel: QI,
		Instagram: XI,
		Italic: KI,
		IterationCcw: YI,
		IterationCw: JI,
		JapaneseYen: ex,
		Joystick: tx,
		Kanban: nx,
		Kayak: ax,
		KeyRound: ox,
		KeySquare: rx,
		Key: ix,
		KeyboardMusic: sx,
		KeyboardOff: cx,
		Keyboard: dx,
		LampCeiling: lx,
		LampDesk: ux,
		LampFloor: hx,
		LampWallDown: px,
		LampWallUp: yx,
		Lamp: fx,
		LandPlot: kx,
		Landmark: gx,
		LaptopMinimalCheck: mx,
		LaptopMinimal: Mx,
		Languages: vx,
		Laptop: Ix,
		LassoSelect: xx,
		Lasso: wx,
		Laugh: Cx,
		Layers2: Lx,
		LayersPlus: bx,
		Layers: Sx,
		LayoutGrid: Dx,
		LayoutDashboard: Ax,
		LayoutList: Ex,
		LayoutPanelLeft: Tx,
		LayoutPanelTop: Px,
		LayoutTemplate: Rx,
		Leaf: Nx,
		LeafyGreen: _x,
		Lectern: Hx,
		LibraryBig: Ox,
		Library: Fx,
		LifeBuoy: jx,
		Ligature: qx,
		LightbulbOff: Vx,
		Lightbulb: zx,
		LineSquiggle: Bx,
		Link2Off: Ux,
		Link2: Gx,
		Link: Wx,
		Linkedin: $x,
		ListCheck: Zx,
		ListChecks: Qx,
		ListChevronsDownUp: Xx,
		ListChevronsUpDown: Kx,
		ListCollapse: Yx,
		ListEnd: Jx,
		ListFilterPlus: ew,
		ListFilter: tw,
		ListIndentDecrease: nw,
		ListIndentIncrease: aw,
		ListMinus: ow,
		ListMusic: rw,
		ListOrdered: iw,
		ListPlus: sw,
		ListRestart: cw,
		ListStart: dw,
		ListTodo: lw,
		ListTree: uw,
		ListVideo: hw,
		ListX: pw,
		List: yw,
		LoaderCircle: fw,
		LoaderPinwheel: kw,
		Loader: gw,
		LocateFixed: mw,
		LocateOff: Mw,
		Locate: vw,
		LockKeyholeOpen: Iw,
		LockKeyhole: xw,
		LockOpen: ww,
		LogIn: Cw,
		Lock: Lw,
		LogOut: bw,
		Logs: Sw,
		Lollipop: Dw,
		Luggage: Aw,
		Magnet: Ew,
		MailCheck: Tw,
		MailMinus: Pw,
		MailOpen: Rw,
		MailPlus: Nw,
		MailQuestionMark: _w,
		MailSearch: Hw,
		MailWarning: Ow,
		MailX: Fw,
		Mail: jw,
		Mailbox: qw,
		Mails: Vw,
		MapMinus: zw,
		MapPinCheck: Bw,
		MapPinCheckInside: Uw,
		MapPinHouse: Gw,
		MapPinMinusInside: Ww,
		MapPinMinus: $w,
		MapPinOff: Zw,
		MapPinPen: Qw,
		MapPinPlusInside: Xw,
		MapPinPlus: Kw,
		MapPinXInside: Yw,
		MapPinX: Jw,
		MapPin: eC,
		MapPinned: tC,
		MapPlus: nC,
		Map: aC,
		MarsStroke: oC,
		Mars: rC,
		Maximize2: iC,
		Martini: sC,
		Maximize: cC,
		Medal: dC,
		MegaphoneOff: lC,
		Megaphone: uC,
		Meh: hC,
		Menu: pC,
		MemoryStick: yC,
		Merge: fC,
		MessageCircleCode: kC,
		MessageCircleDashed: gC,
		MessageCircleHeart: mC,
		MessageCircleMore: MC,
		MessageCircleOff: vC,
		MessageCirclePlus: IC,
		MessageCircleQuestionMark: xC,
		MessageCircleReply: wC,
		MessageCircleWarning: CC,
		MessageCircleX: LC,
		MessageCircle: bC,
		MessageSquareCode: SC,
		MessageSquareDashed: DC,
		MessageSquareDiff: AC,
		MessageSquareHeart: EC,
		MessageSquareDot: TC,
		MessageSquareLock: PC,
		MessageSquareMore: RC,
		MessageSquareOff: NC,
		MessageSquarePlus: _C,
		MessageSquareQuote: HC,
		MessageSquareReply: OC,
		MessageSquareShare: FC,
		MessageSquareText: jC,
		MessageSquareWarning: qC,
		MessageSquareX: VC,
		MessageSquare: zC,
		MicOff: BC,
		MessagesSquare: UC,
		MicVocal: GC,
		Mic: WC,
		Microchip: $C,
		Microscope: ZC,
		Microwave: QC,
		Milestone: XC,
		MilkOff: KC,
		Minimize2: YC,
		Milk: JC,
		Minimize: eL,
		Minus: tL,
		MonitorCheck: nL,
		MonitorCloud: aL,
		MonitorCog: oL,
		MonitorDot: rL,
		MonitorDown: iL,
		MonitorOff: sL,
		MonitorPause: cL,
		MonitorPlay: dL,
		MonitorSmartphone: lL,
		MonitorSpeaker: uL,
		MonitorStop: hL,
		MonitorUp: pL,
		MonitorX: yL,
		Monitor: fL,
		MoonStar: kL,
		Moon: gL,
		Motorbike: mL,
		MountainSnow: ML,
		Mountain: vL,
		MouseOff: IL,
		MousePointer2Off: xL,
		MousePointer2: wL,
		MousePointerBan: CL,
		MousePointerClick: LL,
		MousePointer: bL,
		Mouse: SL,
		Move3d: DL,
		MoveDiagonal2: AL,
		MoveDiagonal: EL,
		MoveDownLeft: TL,
		MoveDownRight: PL,
		MoveDown: RL,
		MoveHorizontal: NL,
		MoveLeft: _L,
		MoveRight: HL,
		MoveUpLeft: OL,
		MoveUpRight: FL,
		MoveUp: jL,
		MoveVertical: qL,
		Move: VL,
		Music3: zL,
		Music2: BL,
		Music4: UL,
		Music: GL,
		Navigation2Off: WL,
		Navigation2: $L,
		NavigationOff: ZL,
		Navigation: QL,
		Network: XL,
		Newspaper: KL,
		Nfc: YL,
		NonBinary: JL,
		NotebookPen: eb,
		NotebookTabs: tb,
		NotebookText: nb,
		Notebook: ab,
		NotepadTextDashed: ob,
		NotepadText: rb,
		NutOff: ib,
		Nut: sb,
		OctagonAlert: cb,
		OctagonMinus: db,
		OctagonPause: lb,
		OctagonX: ub,
		Octagon: hb,
		Omega: pb,
		Option: yb,
		Orbit: fb,
		Origami: kb,
		Package2: gb,
		PackageCheck: mb,
		PackageMinus: Mb,
		PackageOpen: vb,
		PackagePlus: Ib,
		PackageSearch: xb,
		PackageX: wb,
		Package: Cb,
		PaintBucket: Lb,
		PaintRoller: bb,
		PaintbrushVertical: Sb,
		Paintbrush: Db,
		Palette: Ab,
		Panda: Eb,
		PanelBottomClose: Tb,
		PanelBottomDashed: Pb,
		PanelBottomOpen: Rb,
		PanelLeftClose: Nb,
		PanelBottom: _b,
		PanelLeftDashed: Hb,
		PanelLeftOpen: Ob,
		PanelLeftRightDashed: Fb,
		PanelLeft: jb,
		PanelRightClose: qb,
		PanelRightDashed: Vb,
		PanelRightOpen: zb,
		PanelRight: Bb,
		PanelTopBottomDashed: Ub,
		PanelTopClose: Gb,
		PanelTopDashed: Wb,
		PanelTopOpen: $b,
		PanelTop: Zb,
		PanelsLeftBottom: Qb,
		PanelsRightBottom: Xb,
		PanelsTopLeft: Kb,
		Paperclip: Yb,
		Parentheses: Jb,
		ParkingMeter: eS,
		PartyPopper: tS,
		Pause: nS,
		PawPrint: aS,
		PcCase: oS,
		PenLine: rS,
		PenOff: iS,
		PenTool: sS,
		Pen: cS,
		PencilOff: dS,
		PencilLine: lS,
		Pencil: uS,
		PencilRuler: hS,
		Pentagon: pS,
		Percent: yS,
		PersonStanding: fS,
		PhilippinePeso: kS,
		PhoneCall: gS,
		PhoneForwarded: mS,
		PhoneIncoming: MS,
		PhoneMissed: vS,
		PhoneOutgoing: IS,
		Phone: xS,
		PhoneOff: wS,
		Piano: CS,
		Pickaxe: LS,
		PictureInPicture2: bS,
		Pi: SS,
		PictureInPicture: DS,
		PiggyBank: AS,
		PilcrowLeft: ES,
		PilcrowRight: TS,
		Pilcrow: PS,
		PillBottle: RS,
		Pill: NS,
		PinOff: _S,
		Pin: HS,
		Pipette: OS,
		Pizza: FS,
		PlaneLanding: jS,
		PlaneTakeoff: qS,
		Plane: VS,
		Play: zS,
		Plug2: BS,
		PlugZap: US,
		Plug: GS,
		Plus: WS,
		PocketKnife: $S,
		Pocket: ZS,
		Podcast: QS,
		PointerOff: XS,
		Pointer: KS,
		Popcorn: YS,
		Popsicle: JS,
		PoundSterling: eD,
		PowerOff: tD,
		Power: nD,
		Presentation: aD,
		PrinterCheck: oD,
		Printer: rD,
		Projector: iD,
		Proportions: sD,
		Pyramid: cD,
		Puzzle: dD,
		QrCode: lD,
		Quote: uD,
		Rabbit: hD,
		Radar: pD,
		Radiation: yD,
		Radical: fD,
		RadioReceiver: kD,
		RadioTower: gD,
		Radio: mD,
		Radius: MD,
		RailSymbol: vD,
		Rainbow: ID,
		Rat: xD,
		Ratio: wD,
		ReceiptCent: CD,
		ReceiptEuro: LD,
		ReceiptIndianRupee: bD,
		ReceiptJapaneseYen: SD,
		ReceiptPoundSterling: DD,
		ReceiptRussianRuble: AD,
		ReceiptSwissFranc: ED,
		ReceiptText: TD,
		ReceiptTurkishLira: PD,
		Receipt: RD,
		RectangleCircle: ND,
		RectangleEllipsis: _D,
		RectangleGoggles: HD,
		RectangleHorizontal: OD,
		Recycle: FD,
		RectangleVertical: jD,
		Redo2: qD,
		RedoDot: VD,
		RefreshCcwDot: zD,
		Redo: BD,
		RefreshCcw: UD,
		RefreshCwOff: GD,
		RefreshCw: WD,
		Refrigerator: $D,
		Regex: ZD,
		RemoveFormatting: QD,
		Repeat1: XD,
		Repeat2: KD,
		Repeat: YD,
		ReplaceAll: JD,
		ReplyAll: eA,
		Replace: tA,
		Reply: nA,
		Rewind: aA,
		Rocket: oA,
		Ribbon: rA,
		RockingChair: iA,
		RollerCoaster: sA,
		Rose: cA,
		Rotate3d: dA,
		RotateCcwKey: lA,
		RotateCcwSquare: uA,
		RotateCcw: hA,
		RotateCwSquare: pA,
		RouteOff: yA,
		RotateCw: fA,
		Route: kA,
		Router: gA,
		Rows2: mA,
		Rows3: MA,
		Rows4: vA,
		Rss: IA,
		Ruler: xA,
		RulerDimensionLine: wA,
		RussianRuble: CA,
		Sailboat: LA,
		Salad: bA,
		Sandwich: SA,
		SatelliteDish: DA,
		Satellite: AA,
		SaudiRiyal: EA,
		SaveAll: TA,
		SaveOff: PA,
		Save: RA,
		Scale3d: NA,
		Scale: _A,
		Scaling: HA,
		ScanBarcode: OA,
		ScanEye: FA,
		ScanHeart: jA,
		ScanFace: qA,
		ScanQrCode: VA,
		ScanLine: zA,
		ScanSearch: BA,
		ScanText: UA,
		Scan: GA,
		School: WA,
		ScissorsLineDashed: $A,
		Scissors: ZA,
		Scooter: QA,
		ScreenShareOff: XA,
		ScreenShare: KA,
		ScrollText: YA,
		Scroll: JA,
		SearchAlert: eE,
		SearchCheck: tE,
		SearchCode: nE,
		SearchSlash: aE,
		SearchX: oE,
		Search: rE,
		Section: iE,
		SendHorizontal: sE,
		SendToBack: cE,
		Send: dE,
		SeparatorVertical: lE,
		SeparatorHorizontal: uE,
		ServerCrash: hE,
		ServerCog: pE,
		ServerOff: yE,
		Server: fE,
		Settings2: kE,
		Settings: gE,
		Shapes: mE,
		Share2: ME,
		Share: vE,
		Sheet: IE,
		Shell: xE,
		ShieldBan: wE,
		ShieldAlert: CE,
		ShieldCheck: LE,
		ShieldEllipsis: bE,
		ShieldHalf: SE,
		ShieldMinus: DE,
		ShieldPlus: AE,
		ShieldQuestionMark: EE,
		ShieldOff: TE,
		ShieldUser: PE,
		ShieldX: RE,
		ShipWheel: NE,
		Shield: _E,
		Shirt: HE,
		Ship: OE,
		ShoppingBag: FE,
		ShoppingBasket: jE,
		ShoppingCart: qE,
		Shovel: VE,
		ShowerHead: zE,
		Shredder: BE,
		Shrimp: UE,
		Shrink: GE,
		Shrub: WE,
		Shuffle: $E,
		Sigma: ZE,
		SignalHigh: QE,
		SignalLow: XE,
		SignalMedium: KE,
		SignalZero: YE,
		Signal: JE,
		Signature: eT,
		SignpostBig: tT,
		Signpost: nT,
		Siren: aT,
		SkipBack: oT,
		SkipForward: rT,
		Skull: iT,
		Slack: sT,
		Slash: cT,
		Slice: dT,
		SlidersHorizontal: lT,
		SlidersVertical: uT,
		SmartphoneCharging: hT,
		SmartphoneNfc: pT,
		Smartphone: yT,
		SmilePlus: fT,
		Smile: kT,
		Snail: gT,
		Snowflake: mT,
		SoapDispenserDroplet: MT,
		Sofa: vT,
		Soup: IT,
		SolarPanel: xT,
		Space: wT,
		Spade: CT,
		Sparkle: LT,
		Sparkles: bT,
		Speaker: ST,
		Speech: DT,
		SpellCheck2: AT,
		SpellCheck: ET,
		SplinePointer: TT,
		Spline: PT,
		Split: RT,
		Spool: NT,
		Spotlight: _T,
		SprayCan: HT,
		Sprout: OT,
		SquareActivity: FT,
		SquareArrowDownLeft: jT,
		SquareArrowDownRight: qT,
		SquareArrowDown: VT,
		SquareArrowLeft: zT,
		SquareArrowOutDownRight: BT,
		SquareArrowOutDownLeft: UT,
		SquareArrowOutUpLeft: GT,
		SquareArrowOutUpRight: WT,
		SquareArrowRight: $T,
		SquareArrowUpLeft: ZT,
		SquareArrowUpRight: QT,
		SquareArrowUp: XT,
		SquareBottomDashedScissors: KT,
		SquareAsterisk: YT,
		SquareChartGantt: JT,
		SquareCheckBig: eP,
		SquareCheck: tP,
		SquareChevronDown: nP,
		SquareChevronLeft: aP,
		SquareChevronRight: oP,
		SquareChevronUp: rP,
		SquareCode: iP,
		SquareDashedBottomCode: sP,
		SquareDashedBottom: cP,
		SquareDashedKanban: dP,
		SquareDashedMousePointer: lP,
		SquareDashedTopSolid: uP,
		SquareDashed: hP,
		SquareDivide: pP,
		SquareDot: yP,
		SquareEqual: fP,
		SquareFunction: kP,
		SquareKanban: gP,
		SquareLibrary: mP,
		SquareM: MP,
		SquareMenu: vP,
		SquareMousePointer: IP,
		SquareMinus: xP,
		SquareParkingOff: wP,
		SquareParking: CP,
		SquarePause: LP,
		SquarePen: bP,
		SquarePercent: SP,
		SquarePi: DP,
		SquarePilcrow: AP,
		SquarePlay: EP,
		SquarePlus: TP,
		SquarePower: PP,
		SquareRadical: RP,
		SquareRoundCorner: NP,
		SquareScissors: _P,
		SquareSigma: HP,
		SquareSlash: OP,
		SquareSplitHorizontal: FP,
		SquareSplitVertical: jP,
		SquareSquare: qP,
		SquareStack: VP,
		SquareStar: zP,
		SquareStop: BP,
		SquareTerminal: UP,
		SquareUserRound: GP,
		SquareUser: WP,
		Square: $P,
		SquareX: ZP,
		SquaresExclude: QP,
		SquaresIntersect: XP,
		SquaresSubtract: KP,
		SquaresUnite: YP,
		SquircleDashed: JP,
		Squircle: eR,
		Squirrel: tR,
		Stamp: nR,
		StarHalf: aR,
		StarOff: oR,
		Star: rR,
		StepBack: iR,
		StepForward: sR,
		Stethoscope: cR,
		Sticker: dR,
		StickyNote: lR,
		Stone: uR,
		Store: hR,
		StretchVertical: pR,
		StretchHorizontal: yR,
		Strikethrough: fR,
		Subscript: kR,
		SunDim: gR,
		SunMedium: mR,
		SunMoon: MR,
		SunSnow: vR,
		Sun: IR,
		Sunrise: xR,
		Sunset: wR,
		Superscript: CR,
		SwatchBook: LR,
		SwissFranc: bR,
		SwitchCamera: SR,
		Sword: DR,
		Swords: AR,
		Syringe: ER,
		TableCellsMerge: TR,
		Table2: PR,
		TableCellsSplit: RR,
		TableColumnsSplit: NR,
		TableOfContents: _R,
		TableProperties: HR,
		TableRowsSplit: OR,
		Table: FR,
		TabletSmartphone: jR,
		Tablet: qR,
		Tablets: VR,
		Tag: zR,
		Tags: BR,
		Tally1: UR,
		Tally2: GR,
		Tally3: WR,
		Tally4: $R,
		Tally5: ZR,
		Tangent: QR,
		Target: XR,
		Telescope: KR,
		TentTree: YR,
		Tent: JR,
		Terminal: eN,
		TestTubeDiagonal: tN,
		TestTube: nN,
		TestTubes: aN,
		TextAlignCenter: oN,
		TextAlignEnd: rN,
		TextAlignJustify: iN,
		TextAlignStart: sN,
		TextCursorInput: cN,
		TextCursor: dN,
		TextInitial: lN,
		TextQuote: uN,
		TextSearch: hN,
		TextSelect: pN,
		TextWrap: yN,
		Theater: fN,
		ThermometerSnowflake: kN,
		ThermometerSun: gN,
		Thermometer: mN,
		ThumbsDown: MN,
		ThumbsUp: vN,
		TicketCheck: IN,
		TicketMinus: xN,
		TicketPercent: wN,
		TicketPlus: CN,
		TicketSlash: LN,
		TicketX: bN,
		Ticket: SN,
		TicketsPlane: DN,
		Tickets: AN,
		TimerOff: EN,
		TimerReset: TN,
		Timer: PN,
		ToggleLeft: RN,
		ToggleRight: NN,
		Toilet: _N,
		ToolCase: HN,
		Toolbox: ON,
		Torus: FN,
		Tornado: jN,
		TouchpadOff: qN,
		TowerControl: VN,
		Touchpad: zN,
		ToyBrick: BN,
		Tractor: UN,
		TrafficCone: GN,
		TrainFrontTunnel: WN,
		TrainTrack: $N,
		TrainFront: ZN,
		TramFront: QN,
		Transgender: XN,
		Trash2: KN,
		Trash: YN,
		TreeDeciduous: JN,
		TreePalm: e_,
		TreePine: t_,
		Trees: n_,
		Trello: a_,
		TrendingDown: o_,
		TrendingUpDown: r_,
		TrendingUp: i_,
		TriangleAlert: s_,
		TriangleDashed: c_,
		TriangleRight: d_,
		Triangle: l_,
		Trophy: u_,
		TruckElectric: h_,
		Truck: p_,
		TurkishLira: y_,
		Turntable: f_,
		Turtle: k_,
		TvMinimalPlay: g_,
		TvMinimal: m_,
		Tv: M_,
		Twitch: v_,
		Twitter: I_,
		TypeOutline: x_,
		Type: w_,
		UmbrellaOff: C_,
		Umbrella: L_,
		Underline: b_,
		Undo2: S_,
		UndoDot: D_,
		Undo: A_,
		UnfoldHorizontal: E_,
		UnfoldVertical: T_,
		Ungroup: P_,
		University: R_,
		Unlink: N_,
		Unlink2: __,
		Unplug: H_,
		Upload: O_,
		Usb: F_,
		UserCheck: j_,
		UserLock: q_,
		UserMinus: V_,
		UserCog: z_,
		UserPen: B_,
		UserPlus: U_,
		UserRoundCheck: G_,
		UserRoundCog: W_,
		UserRoundMinus: $_,
		UserRoundPen: Z_,
		UserRoundPlus: Q_,
		UserRoundSearch: X_,
		UserRoundX: K_,
		UserRound: Y_,
		UserSearch: J_,
		UserStar: eH,
		UserX: tH,
		User: nH,
		UsersRound: aH,
		Users: oH,
		UtensilsCrossed: rH,
		Utensils: iH,
		UtilityPole: sH,
		Van: cH,
		Vault: dH,
		Variable: lH,
		Vegan: uH,
		VectorSquare: hH,
		VenetianMask: pH,
		VenusAndMars: yH,
		Venus: fH,
		VibrateOff: kH,
		Vibrate: gH,
		VideoOff: mH,
		Video: MH,
		View: vH,
		Videotape: IH,
		Voicemail: xH,
		Volleyball: wH,
		Volume1: CH,
		Volume2: LH,
		VolumeOff: bH,
		VolumeX: SH,
		Volume: DH,
		Vote: AH,
		WalletCards: EH,
		WalletMinimal: TH,
		Wallet: PH,
		Wallpaper: RH,
		WandSparkles: NH,
		Wand: _H,
		Warehouse: HH,
		WashingMachine: OH,
		Watch: FH,
		WavesArrowDown: jH,
		WavesArrowUp: qH,
		WavesLadder: VH,
		Waves: zH,
		Waypoints: BH,
		Webcam: UH,
		WebhookOff: GH,
		Webhook: WH,
		WeightTilde: $H,
		Weight: ZH,
		WheatOff: QH,
		Wheat: XH,
		WholeWord: KH,
		WifiCog: YH,
		WifiHigh: JH,
		WifiOff: eO,
		WifiLow: tO,
		WifiPen: nO,
		WifiZero: aO,
		WifiSync: oO,
		Wifi: rO,
		WindArrowDown: iO,
		Wind: sO,
		WineOff: cO,
		Workflow: dO,
		Wine: lO,
		Worm: uO,
		Wrench: hO,
		X: pO,
		Youtube: yO,
		Zap: fO,
		ZapOff: kO,
		ZoomIn: gO,
		ZoomOut: mO,
	}),
	Mn = {
		xmlns: 'http://www.w3.org/2000/svg',
		width: 24,
		height: 24,
		viewBox: '0 0 24 24',
		fill: 'none',
		stroke: 'currentColor',
		'stroke-width': 2,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
	},
	_1 = new b('LucideIcons', { factory: () => new vn({}) }),
	vn = class {
		constructor(t) {
			this.icons = t;
		}
		getIcon(t) {
			return this.hasIcon(t) ? this.icons[t] : null;
		}
		hasIcon(t) {
			return typeof this.icons == 'object' && t in this.icons;
		}
	},
	MO = (() => {
		class e {
			constructor() {
				((this.color = Mn.stroke),
					(this.size = Mn.width),
					(this.strokeWidth = Mn['stroke-width']),
					(this.absoluteStrokeWidth = !1));
			}
		}
		return (
			(e.ɵfac = function (n) {
				return new (n || e)();
			}),
			(e.ɵprov = q({ token: e, factory: e.ɵfac, providedIn: 'root' })),
			e
		);
	})();
function vO(e, t = 3) {
	return parseFloat(e.toFixed(t)).toString(10);
}
var kK = (() => {
		class e {
			constructor(n, a, o, r, i) {
				((this.elem = n),
					(this.renderer = a),
					(this.changeDetector = o),
					(this.iconProviders = r),
					(this.iconConfig = i),
					(this.absoluteStrokeWidth = !1),
					(this.defaultSize = Mn.height));
			}
			get size() {
				return this._size ?? this.iconConfig.size;
			}
			set size(n) {
				n ? (this._size = this.parseNumber(n)) : delete this._size;
			}
			get strokeWidth() {
				return this._strokeWidth ?? this.iconConfig.strokeWidth;
			}
			set strokeWidth(n) {
				n ? (this._strokeWidth = this.parseNumber(n)) : delete this._strokeWidth;
			}
			ngOnChanges(n) {
				if (n.name || n.img || n.color || n.size || n.absoluteStrokeWidth || n.strokeWidth || n.class) {
					((this.color = this.color ?? this.iconConfig.color),
						(this.size = this.parseNumber(this.size ?? this.iconConfig.size)),
						(this.strokeWidth = this.parseNumber(this.strokeWidth ?? this.iconConfig.strokeWidth)),
						(this.absoluteStrokeWidth = this.absoluteStrokeWidth ?? this.iconConfig.absoluteStrokeWidth));
					let a = this.img ?? this.name;
					if (typeof a == 'string') {
						let o = this.getIcon(this.toPascalCase(a));
						if (o) this.replaceElement(o);
						else throw new Error(`The "${a}" icon has not been provided by any available icon providers.`);
					} else if (Array.isArray(a)) this.replaceElement(a);
					else throw new Error('No icon name or image has been provided.');
				}
				this.changeDetector.markForCheck();
			}
			replaceElement(n) {
				let a = K(X({}, Mn), {
						width: this.size,
						height: this.size,
						stroke: this.color ?? this.iconConfig.color,
						'stroke-width': this.absoluteStrokeWidth
							? vO(this.strokeWidth / (this.size / this.defaultSize))
							: this.strokeWidth.toString(10),
					}),
					o = this.createElement(['svg', a, n]);
				(o.classList.add('lucide'),
					typeof this.name == 'string' && o.classList.add(`lucide-${this.name.replace('_', '-')}`),
					this.class &&
						o.classList.add(
							...this.class
								.split(/ /)
								.map((i) => i.trim())
								.filter((i) => i.length > 0),
						));
				let r = this.elem.nativeElement.childNodes;
				for (let i of r) this.renderer.removeChild(this.elem.nativeElement, i);
				this.renderer.appendChild(this.elem.nativeElement, o);
			}
			toPascalCase(n) {
				return n.replace(/(\w)([a-z0-9]*)(_|-|\s*)/g, (a, o, r) => o.toUpperCase() + r.toLowerCase());
			}
			parseNumber(n) {
				if (typeof n == 'string') {
					let a = parseInt(n, 10);
					if (isNaN(a)) throw new Error(`${n} is not numeric.`);
					return a;
				}
				return n;
			}
			getIcon(n) {
				for (let a of Array.isArray(this.iconProviders) ? this.iconProviders : [this.iconProviders])
					if (a.hasIcon(n)) return a.getIcon(n);
				return null;
			}
			createElement([n, a, o = []]) {
				let r = this.renderer.createElement(n, 'http://www.w3.org/2000/svg');
				return (
					Object.keys(a).forEach((i) => {
						let s = typeof a[i] == 'string' ? a[i] : a[i].toString(10);
						this.renderer.setAttribute(r, i, s);
					}),
					o.length &&
						o.forEach((i) => {
							let s = this.createElement(i);
							this.renderer.appendChild(r, s);
						}),
					r
				);
			}
		}
		return (
			(e.ɵfac = function (n) {
				return new (n || e)(Re(Ua), Re(v1), Re(G2), Re(_1), Re(MO));
			}),
			(e.ɵcmp = I1({
				type: e,
				selectors: [['lucide-angular'], ['lucide-icon'], ['i-lucide'], ['span-lucide']],
				inputs: {
					class: 'class',
					name: 'name',
					img: 'img',
					color: 'color',
					absoluteStrokeWidth: 'absoluteStrokeWidth',
					size: 'size',
					strokeWidth: 'strokeWidth',
				},
				standalone: !1,
				features: [t1],
				ngContentSelectors: Lp,
				decls: 1,
				vars: 0,
				template: function (n, a) {
					n & 1 && (E1(), T1(0));
				},
				encapsulation: 2,
			})),
			e
		);
	})(),
	H1 = class {
		constructor(t) {
			this.icons = t;
		}
	},
	IO = (e) => new vn(e ?? {}),
	gK = (() => {
		class e {
			static pick(n) {
				return {
					ngModule: e,
					providers: [
						{ provide: _1, multi: !0, useValue: new vn(n) },
						{ provide: _1, multi: !0, useFactory: IO, deps: [[new e1(), H1]] },
					],
				};
			}
		}
		return (
			(e.ɵfac = function (n) {
				return new (n || e)();
			}),
			(e.ɵmod = x1({ type: e })),
			(e.ɵinj = ta({ imports: [[]] })),
			e
		);
	})();
export {
	X as a,
	K as b,
	V as c,
	id as d,
	D as e,
	Ce as f,
	jt as g,
	qt as h,
	be as i,
	gd as j,
	md as k,
	Md as l,
	Vt as m,
	Oe as n,
	Sd as o,
	Fe as p,
	Gn as q,
	Ad as r,
	go as s,
	Ci as t,
	Ed as u,
	mo as v,
	Pd as w,
	Rd as x,
	Nd as y,
	_d as z,
	Hd as A,
	Od as B,
	Fd as C,
	C as D,
	_o as E,
	q as F,
	Ud as G,
	b as H,
	ue as I,
	x as J,
	ca as K,
	Vi as L,
	Ko as M,
	J as N,
	da as O,
	Be as P,
	Ia as Q,
	nn as R,
	wt as S,
	ge as T,
	Me as U,
	gt as V,
	Ct as W,
	m0 as X,
	Is as Y,
	ws as Z,
	t1 as _,
	tl as $,
	cl as aa,
	dl as ba,
	pc as ca,
	ul as da,
	hl as ea,
	rt as fa,
	Ml as ga,
	Hl as ha,
	Pa as ia,
	cn as ja,
	p1 as ka,
	un as la,
	y2 as ma,
	k2 as na,
	g2 as oa,
	I1 as pa,
	uh as qa,
	kh as ra,
	w1 as sa,
	w2 as ta,
	Ka as ua,
	Mh as va,
	vh as wa,
	Ih as xa,
	xh as ya,
	wh as za,
	b2 as Aa,
	b1 as Ba,
	S1 as Ca,
	S2 as Da,
	D1 as Ea,
	A1 as Fa,
	D2 as Ga,
	E2 as Ha,
	Ah as Ia,
	zh as Ja,
	ep as Ka,
	O2 as La,
	P1 as Ma,
	j2 as Na,
	op as Oa,
	rp as Pa,
	ip as Qa,
	sp as Ra,
	cp as Sa,
	dp as Ta,
	aK as Ua,
	G2 as Va,
	rK as Wa,
	fK as Xa,
	kK as Ya,
	gK as Za,
};
