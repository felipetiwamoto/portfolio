'use strict'
;(self.webpackChunkportfolio = self.webpackChunkportfolio || []).push([
	[179],
	{
		751: () => {
			function re(e) {
				return 'function' == typeof e
			}
			function sr(e) {
				const n = e((o) => {
					Error.call(o), (o.stack = new Error().stack)
				})
				return (n.prototype = Object.create(Error.prototype)), (n.prototype.constructor = n), n
			}
			const Oi = sr(
				(e) =>
					function (n) {
						e(this),
							(this.message = n
								? `${n.length} errors occurred during unsubscription:\n${n
										.map((o, r) => `${r + 1}) ${o.toString()}`)
										.join('\n  ')}`
								: ''),
							(this.name = 'UnsubscriptionError'),
							(this.errors = n)
					}
			)
			function ar(e, t) {
				if (e) {
					const n = e.indexOf(t)
					0 <= n && e.splice(n, 1)
				}
			}
			class ut {
				constructor(t) {
					;(this.initialTeardown = t), (this.closed = !1), (this._parentage = null), (this._finalizers = null)
				}
				unsubscribe() {
					let t
					if (!this.closed) {
						this.closed = !0
						const {_parentage: n} = this
						if (n)
							if (((this._parentage = null), Array.isArray(n))) for (const i of n) i.remove(this)
							else n.remove(this)
						const {initialTeardown: o} = this
						if (re(o))
							try {
								o()
							} catch (i) {
								t = i instanceof Oi ? i.errors : [i]
							}
						const {_finalizers: r} = this
						if (r) {
							this._finalizers = null
							for (const i of r)
								try {
									Nd(i)
								} catch (s) {
									;(t = t ?? []), s instanceof Oi ? (t = [...t, ...s.errors]) : t.push(s)
								}
						}
						if (t) throw new Oi(t)
					}
				}
				add(t) {
					var n
					if (t && t !== this)
						if (this.closed) Nd(t)
						else {
							if (t instanceof ut) {
								if (t.closed || t._hasParent(this)) return
								t._addParent(this)
							}
							;(this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(t)
						}
				}
				_hasParent(t) {
					const {_parentage: n} = this
					return n === t || (Array.isArray(n) && n.includes(t))
				}
				_addParent(t) {
					const {_parentage: n} = this
					this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t
				}
				_removeParent(t) {
					const {_parentage: n} = this
					n === t ? (this._parentage = null) : Array.isArray(n) && ar(n, t)
				}
				remove(t) {
					const {_finalizers: n} = this
					n && ar(n, t), t instanceof ut && t._removeParent(this)
				}
			}
			ut.EMPTY = (() => {
				const e = new ut()
				return (e.closed = !0), e
			})()
			const Rd = ut.EMPTY
			function Ad(e) {
				return e instanceof ut || (e && 'closed' in e && re(e.remove) && re(e.add) && re(e.unsubscribe))
			}
			function Nd(e) {
				re(e) ? e() : e.unsubscribe()
			}
			const En = {
					onUnhandledError: null,
					onStoppedNotification: null,
					Promise: void 0,
					useDeprecatedSynchronousErrorHandling: !1,
					useDeprecatedNextContext: !1,
				},
				Di = {
					setTimeout(e, t, ...n) {
						const {delegate: o} = Di
						return o?.setTimeout ? o.setTimeout(e, t, ...n) : setTimeout(e, t, ...n)
					},
					clearTimeout(e) {
						const {delegate: t} = Di
						return (t?.clearTimeout || clearTimeout)(e)
					},
					delegate: void 0,
				}
			function Ld(e) {
				Di.setTimeout(() => {
					const {onUnhandledError: t} = En
					if (!t) throw e
					t(e)
				})
			}
			function Fd() {}
			const Zb = ja('C', void 0, void 0)
			function ja(e, t, n) {
				return {kind: e, value: t, error: n}
			}
			let Sn = null
			function Ei(e) {
				if (En.useDeprecatedSynchronousErrorHandling) {
					const t = !Sn
					if ((t && (Sn = {errorThrown: !1, error: null}), e(), t)) {
						const {errorThrown: n, error: o} = Sn
						if (((Sn = null), n)) throw o
					}
				} else e()
			}
			class za extends ut {
				constructor(t) {
					super(),
						(this.isStopped = !1),
						t ? ((this.destination = t), Ad(t) && t.add(this)) : (this.destination = t0)
				}
				static create(t, n, o) {
					return new cr(t, n, o)
				}
				next(t) {
					this.isStopped
						? Va(
								(function Yb(e) {
									return ja('N', e, void 0)
								})(t),
								this
						  )
						: this._next(t)
				}
				error(t) {
					this.isStopped
						? Va(
								(function Qb(e) {
									return ja('E', void 0, e)
								})(t),
								this
						  )
						: ((this.isStopped = !0), this._error(t))
				}
				complete() {
					this.isStopped ? Va(Zb, this) : ((this.isStopped = !0), this._complete())
				}
				unsubscribe() {
					this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null))
				}
				_next(t) {
					this.destination.next(t)
				}
				_error(t) {
					try {
						this.destination.error(t)
					} finally {
						this.unsubscribe()
					}
				}
				_complete() {
					try {
						this.destination.complete()
					} finally {
						this.unsubscribe()
					}
				}
			}
			const Jb = Function.prototype.bind
			function $a(e, t) {
				return Jb.call(e, t)
			}
			class Xb {
				constructor(t) {
					this.partialObserver = t
				}
				next(t) {
					const {partialObserver: n} = this
					if (n.next)
						try {
							n.next(t)
						} catch (o) {
							Si(o)
						}
				}
				error(t) {
					const {partialObserver: n} = this
					if (n.error)
						try {
							n.error(t)
						} catch (o) {
							Si(o)
						}
					else Si(t)
				}
				complete() {
					const {partialObserver: t} = this
					if (t.complete)
						try {
							t.complete()
						} catch (n) {
							Si(n)
						}
				}
			}
			class cr extends za {
				constructor(t, n, o) {
					let r
					if ((super(), re(t) || !t)) r = {next: t ?? void 0, error: n ?? void 0, complete: o ?? void 0}
					else {
						let i
						this && En.useDeprecatedNextContext
							? ((i = Object.create(t)),
							  (i.unsubscribe = () => this.unsubscribe()),
							  (r = {
									next: t.next && $a(t.next, i),
									error: t.error && $a(t.error, i),
									complete: t.complete && $a(t.complete, i),
							  }))
							: (r = t)
					}
					this.destination = new Xb(r)
				}
			}
			function Si(e) {
				En.useDeprecatedSynchronousErrorHandling
					? (function Kb(e) {
							En.useDeprecatedSynchronousErrorHandling && Sn && ((Sn.errorThrown = !0), (Sn.error = e))
					  })(e)
					: Ld(e)
			}
			function Va(e, t) {
				const {onStoppedNotification: n} = En
				n && Di.setTimeout(() => n(e, t))
			}
			const t0 = {
					closed: !0,
					next: Fd,
					error: function e0(e) {
						throw e
					},
					complete: Fd,
				},
				Ba = ('function' == typeof Symbol && Symbol.observable) || '@@observable'
			function gn(e) {
				return e
			}
			function jd(e) {
				return 0 === e.length
					? gn
					: 1 === e.length
					? e[0]
					: function (n) {
							return e.reduce((o, r) => r(o), n)
					  }
			}
			let Me = (() => {
				class e {
					constructor(n) {
						n && (this._subscribe = n)
					}
					lift(n) {
						const o = new e()
						return (o.source = this), (o.operator = n), o
					}
					subscribe(n, o, r) {
						const i = (function r0(e) {
							return (
								(e && e instanceof za) ||
								((function o0(e) {
									return e && re(e.next) && re(e.error) && re(e.complete)
								})(e) &&
									Ad(e))
							)
						})(n)
							? n
							: new cr(n, o, r)
						return (
							Ei(() => {
								const {operator: s, source: a} = this
								i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
							}),
							i
						)
					}
					_trySubscribe(n) {
						try {
							return this._subscribe(n)
						} catch (o) {
							n.error(o)
						}
					}
					forEach(n, o) {
						return new (o = zd(o))((r, i) => {
							const s = new cr({
								next: (a) => {
									try {
										n(a)
									} catch (c) {
										i(c), s.unsubscribe()
									}
								},
								error: i,
								complete: r,
							})
							this.subscribe(s)
						})
					}
					_subscribe(n) {
						var o
						return null === (o = this.source) || void 0 === o ? void 0 : o.subscribe(n)
					}
					[Ba]() {
						return this
					}
					pipe(...n) {
						return jd(n)(this)
					}
					toPromise(n) {
						return new (n = zd(n))((o, r) => {
							let i
							this.subscribe(
								(s) => (i = s),
								(s) => r(s),
								() => o(i)
							)
						})
					}
				}
				return (e.create = (t) => new e(t)), e
			})()
			function zd(e) {
				var t
				return null !== (t = e ?? En.Promise) && void 0 !== t ? t : Promise
			}
			const s0 = sr(
				(e) =>
					function () {
						e(this), (this.name = 'ObjectUnsubscribedError'), (this.message = 'object unsubscribed')
					}
			)
			let Wt = (() => {
				class e extends Me {
					constructor() {
						super(),
							(this.closed = !1),
							(this.currentObservers = null),
							(this.observers = []),
							(this.isStopped = !1),
							(this.hasError = !1),
							(this.thrownError = null)
					}
					lift(n) {
						const o = new $d(this, this)
						return (o.operator = n), o
					}
					_throwIfClosed() {
						if (this.closed) throw new s0()
					}
					next(n) {
						Ei(() => {
							if ((this._throwIfClosed(), !this.isStopped)) {
								this.currentObservers || (this.currentObservers = Array.from(this.observers))
								for (const o of this.currentObservers) o.next(n)
							}
						})
					}
					error(n) {
						Ei(() => {
							if ((this._throwIfClosed(), !this.isStopped)) {
								;(this.hasError = this.isStopped = !0), (this.thrownError = n)
								const {observers: o} = this
								for (; o.length; ) o.shift().error(n)
							}
						})
					}
					complete() {
						Ei(() => {
							if ((this._throwIfClosed(), !this.isStopped)) {
								this.isStopped = !0
								const {observers: n} = this
								for (; n.length; ) n.shift().complete()
							}
						})
					}
					unsubscribe() {
						;(this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null)
					}
					get observed() {
						var n
						return (null === (n = this.observers) || void 0 === n ? void 0 : n.length) > 0
					}
					_trySubscribe(n) {
						return this._throwIfClosed(), super._trySubscribe(n)
					}
					_subscribe(n) {
						return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n)
					}
					_innerSubscribe(n) {
						const {hasError: o, isStopped: r, observers: i} = this
						return o || r
							? Rd
							: ((this.currentObservers = null),
							  i.push(n),
							  new ut(() => {
									;(this.currentObservers = null), ar(i, n)
							  }))
					}
					_checkFinalizedStatuses(n) {
						const {hasError: o, thrownError: r, isStopped: i} = this
						o ? n.error(r) : i && n.complete()
					}
					asObservable() {
						const n = new Me()
						return (n.source = this), n
					}
				}
				return (e.create = (t, n) => new $d(t, n)), e
			})()
			class $d extends Wt {
				constructor(t, n) {
					super(), (this.destination = t), (this.source = n)
				}
				next(t) {
					var n, o
					null === (o = null === (n = this.destination) || void 0 === n ? void 0 : n.next) ||
						void 0 === o ||
						o.call(n, t)
				}
				error(t) {
					var n, o
					null === (o = null === (n = this.destination) || void 0 === n ? void 0 : n.error) ||
						void 0 === o ||
						o.call(n, t)
				}
				complete() {
					var t, n
					null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.complete) ||
						void 0 === n ||
						n.call(t)
				}
				_subscribe(t) {
					var n, o
					return null !== (o = null === (n = this.source) || void 0 === n ? void 0 : n.subscribe(t)) &&
						void 0 !== o
						? o
						: Rd
				}
			}
			class dt extends Wt {
				constructor(t) {
					super(), (this._value = t)
				}
				get value() {
					return this.getValue()
				}
				_subscribe(t) {
					const n = super._subscribe(t)
					return !n.closed && t.next(this._value), n
				}
				getValue() {
					const {hasError: t, thrownError: n, _value: o} = this
					if (t) throw n
					return this._throwIfClosed(), o
				}
				next(t) {
					super.next((this._value = t))
				}
			}
			function Vd(e) {
				return re(e?.lift)
			}
			function Ee(e) {
				return (t) => {
					if (Vd(t))
						return t.lift(function (n) {
							try {
								return e(n, this)
							} catch (o) {
								this.error(o)
							}
						})
					throw new TypeError('Unable to lift unknown Observable type')
				}
			}
			function Se(e, t, n, o, r) {
				return new a0(e, t, n, o, r)
			}
			class a0 extends za {
				constructor(t, n, o, r, i, s) {
					super(t),
						(this.onFinalize = i),
						(this.shouldUnsubscribe = s),
						(this._next = n
							? function (a) {
									try {
										n(a)
									} catch (c) {
										t.error(c)
									}
							  }
							: super._next),
						(this._error = r
							? function (a) {
									try {
										r(a)
									} catch (c) {
										t.error(c)
									} finally {
										this.unsubscribe()
									}
							  }
							: super._error),
						(this._complete = o
							? function () {
									try {
										o()
									} catch (a) {
										t.error(a)
									} finally {
										this.unsubscribe()
									}
							  }
							: super._complete)
				}
				unsubscribe() {
					var t
					if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
						const {closed: n} = this
						super.unsubscribe(), !n && (null === (t = this.onFinalize) || void 0 === t || t.call(this))
					}
				}
			}
			function le(e, t) {
				return Ee((n, o) => {
					let r = 0
					n.subscribe(
						Se(o, (i) => {
							o.next(e.call(t, i, r++))
						})
					)
				})
			}
			function pn(e) {
				return this instanceof pn ? ((this.v = e), this) : new pn(e)
			}
			function qd(e) {
				if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.')
				var n,
					t = e[Symbol.asyncIterator]
				return t
					? t.call(e)
					: ((e = (function Ga(e) {
							var t = 'function' == typeof Symbol && Symbol.iterator,
								n = t && e[t],
								o = 0
							if (n) return n.call(e)
							if (e && 'number' == typeof e.length)
								return {
									next: function () {
										return e && o >= e.length && (e = void 0), {value: e && e[o++], done: !e}
									},
								}
							throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.')
					  })(e)),
					  (n = {}),
					  o('next'),
					  o('throw'),
					  o('return'),
					  (n[Symbol.asyncIterator] = function () {
							return this
					  }),
					  n)
				function o(i) {
					n[i] =
						e[i] &&
						function (s) {
							return new Promise(function (a, c) {
								!(function r(i, s, a, c) {
									Promise.resolve(c).then(function (l) {
										i({value: l, done: a})
									}, s)
								})(a, c, (s = e[i](s)).done, s.value)
							})
						}
				}
			}
			'function' == typeof SuppressedError && SuppressedError
			const Gd = (e) => e && 'number' == typeof e.length && 'function' != typeof e
			function Wd(e) {
				return re(e?.then)
			}
			function Zd(e) {
				return re(e[Ba])
			}
			function Qd(e) {
				return Symbol.asyncIterator && re(e?.[Symbol.asyncIterator])
			}
			function Yd(e) {
				return new TypeError(
					`You provided ${
						null !== e && 'object' == typeof e ? 'an invalid object' : `'${e}'`
					} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
				)
			}
			const Kd = (function S0() {
				return 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator'
			})()
			function Jd(e) {
				return re(e?.[Kd])
			}
			function Xd(e) {
				return (function Hd(e, t, n) {
					if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.')
					var r,
						o = n.apply(e, t || []),
						i = []
					return (
						(r = {}),
						s('next'),
						s('throw'),
						s('return'),
						(r[Symbol.asyncIterator] = function () {
							return this
						}),
						r
					)
					function s(p) {
						o[p] &&
							(r[p] = function (m) {
								return new Promise(function (v, y) {
									i.push([p, m, v, y]) > 1 || a(p, m)
								})
							})
					}
					function a(p, m) {
						try {
							!(function c(p) {
								p.value instanceof pn ? Promise.resolve(p.value.v).then(l, u) : d(i[0][2], p)
							})(o[p](m))
						} catch (v) {
							d(i[0][3], v)
						}
					}
					function l(p) {
						a('next', p)
					}
					function u(p) {
						a('throw', p)
					}
					function d(p, m) {
						p(m), i.shift(), i.length && a(i[0][0], i[0][1])
					}
				})(this, arguments, function* () {
					const n = e.getReader()
					try {
						for (;;) {
							const {value: o, done: r} = yield pn(n.read())
							if (r) return yield pn(void 0)
							yield yield pn(o)
						}
					} finally {
						n.releaseLock()
					}
				})
			}
			function ef(e) {
				return re(e?.getReader)
			}
			function yt(e) {
				if (e instanceof Me) return e
				if (null != e) {
					if (Zd(e))
						return (function I0(e) {
							return new Me((t) => {
								const n = e[Ba]()
								if (re(n.subscribe)) return n.subscribe(t)
								throw new TypeError('Provided object does not correctly implement Symbol.observable')
							})
						})(e)
					if (Gd(e))
						return (function T0(e) {
							return new Me((t) => {
								for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n])
								t.complete()
							})
						})(e)
					if (Wd(e))
						return (function k0(e) {
							return new Me((t) => {
								e.then(
									(n) => {
										t.closed || (t.next(n), t.complete())
									},
									(n) => t.error(n)
								).then(null, Ld)
							})
						})(e)
					if (Qd(e)) return tf(e)
					if (Jd(e))
						return (function R0(e) {
							return new Me((t) => {
								for (const n of e) if ((t.next(n), t.closed)) return
								t.complete()
							})
						})(e)
					if (ef(e))
						return (function A0(e) {
							return tf(Xd(e))
						})(e)
				}
				throw Yd(e)
			}
			function tf(e) {
				return new Me((t) => {
					;(function N0(e, t) {
						var n, o, r, i
						return (function Bd(e, t, n, o) {
							return new (n || (n = Promise))(function (i, s) {
								function a(u) {
									try {
										l(o.next(u))
									} catch (d) {
										s(d)
									}
								}
								function c(u) {
									try {
										l(o.throw(u))
									} catch (d) {
										s(d)
									}
								}
								function l(u) {
									u.done
										? i(u.value)
										: (function r(i) {
												return i instanceof n
													? i
													: new n(function (s) {
															s(i)
													  })
										  })(u.value).then(a, c)
								}
								l((o = o.apply(e, t || [])).next())
							})
						})(this, void 0, void 0, function* () {
							try {
								for (n = qd(e); !(o = yield n.next()).done; ) if ((t.next(o.value), t.closed)) return
							} catch (s) {
								r = {error: s}
							} finally {
								try {
									o && !o.done && (i = n.return) && (yield i.call(n))
								} finally {
									if (r) throw r.error
								}
							}
							t.complete()
						})
					})(e, t).catch((n) => t.error(n))
				})
			}
			function Zt(e, t, n, o = 0, r = !1) {
				const i = t.schedule(function () {
					n(), r ? e.add(this.schedule(null, o)) : this.unsubscribe()
				}, o)
				if ((e.add(i), !r)) return i
			}
			function Te(e, t, n = 1 / 0) {
				return re(t)
					? Te((o, r) => le((i, s) => t(o, i, r, s))(yt(e(o, r))), n)
					: ('number' == typeof t && (n = t),
					  Ee((o, r) =>
							(function L0(e, t, n, o, r, i, s, a) {
								const c = []
								let l = 0,
									u = 0,
									d = !1
								const p = () => {
										d && !c.length && !l && t.complete()
									},
									m = (y) => (l < o ? v(y) : c.push(y)),
									v = (y) => {
										i && t.next(y), l++
										let x = !1
										yt(n(y, u++)).subscribe(
											Se(
												t,
												(P) => {
													r?.(P), i ? m(P) : t.next(P)
												},
												() => {
													x = !0
												},
												void 0,
												() => {
													if (x)
														try {
															for (l--; c.length && l < o; ) {
																const P = c.shift()
																s ? Zt(t, s, () => v(P)) : v(P)
															}
															p()
														} catch (P) {
															t.error(P)
														}
												}
											)
										)
									}
								return (
									e.subscribe(
										Se(t, m, () => {
											;(d = !0), p()
										})
									),
									() => {
										a?.()
									}
								)
							})(o, r, e, n)
					  ))
			}
			function Jn(e = 1 / 0) {
				return Te(gn, e)
			}
			const Tt = new Me((e) => e.complete())
			function Wa(e) {
				return e[e.length - 1]
			}
			function lr(e) {
				return (function j0(e) {
					return e && re(e.schedule)
				})(Wa(e))
					? e.pop()
					: void 0
			}
			function nf(e, t = 0) {
				return Ee((n, o) => {
					n.subscribe(
						Se(
							o,
							(r) => Zt(o, e, () => o.next(r), t),
							() => Zt(o, e, () => o.complete(), t),
							(r) => Zt(o, e, () => o.error(r), t)
						)
					)
				})
			}
			function rf(e, t = 0) {
				return Ee((n, o) => {
					o.add(e.schedule(() => n.subscribe(o), t))
				})
			}
			function sf(e, t) {
				if (!e) throw new Error('Iterable cannot be null')
				return new Me((n) => {
					Zt(n, t, () => {
						const o = e[Symbol.asyncIterator]()
						Zt(
							n,
							t,
							() => {
								o.next().then((r) => {
									r.done ? n.complete() : n.next(r.value)
								})
							},
							0,
							!0
						)
					})
				})
			}
			function ke(e, t) {
				return t
					? (function G0(e, t) {
							if (null != e) {
								if (Zd(e))
									return (function V0(e, t) {
										return yt(e).pipe(rf(t), nf(t))
									})(e, t)
								if (Gd(e))
									return (function U0(e, t) {
										return new Me((n) => {
											let o = 0
											return t.schedule(function () {
												o === e.length
													? n.complete()
													: (n.next(e[o++]), n.closed || this.schedule())
											})
										})
									})(e, t)
								if (Wd(e))
									return (function B0(e, t) {
										return yt(e).pipe(rf(t), nf(t))
									})(e, t)
								if (Qd(e)) return sf(e, t)
								if (Jd(e))
									return (function H0(e, t) {
										return new Me((n) => {
											let o
											return (
												Zt(n, t, () => {
													;(o = e[Kd]()),
														Zt(
															n,
															t,
															() => {
																let r, i
																try {
																	;({value: r, done: i} = o.next())
																} catch (s) {
																	return void n.error(s)
																}
																i ? n.complete() : n.next(r)
															},
															0,
															!0
														)
												}),
												() => re(o?.return) && o.return()
											)
										})
									})(e, t)
								if (ef(e))
									return (function q0(e, t) {
										return sf(Xd(e), t)
									})(e, t)
							}
							throw Yd(e)
					  })(e, t)
					: yt(e)
			}
			function F(...e) {
				return ke(e, lr(e))
			}
			function af(e = {}) {
				const {
					connector: t = () => new Wt(),
					resetOnError: n = !0,
					resetOnComplete: o = !0,
					resetOnRefCountZero: r = !0,
				} = e
				return (i) => {
					let s,
						a,
						c,
						l = 0,
						u = !1,
						d = !1
					const p = () => {
							a?.unsubscribe(), (a = void 0)
						},
						m = () => {
							p(), (s = c = void 0), (u = d = !1)
						},
						v = () => {
							const y = s
							m(), y?.unsubscribe()
						}
					return Ee((y, x) => {
						l++, !d && !u && p()
						const P = (c = c ?? t())
						x.add(() => {
							l--, 0 === l && !d && !u && (a = Za(v, r))
						}),
							P.subscribe(x),
							!s &&
								l > 0 &&
								((s = new cr({
									next: (b) => P.next(b),
									error: (b) => {
										;(d = !0), p(), (a = Za(m, n, b)), P.error(b)
									},
									complete: () => {
										;(u = !0), p(), (a = Za(m, o)), P.complete()
									},
								})),
								yt(y).subscribe(s))
					})(i)
				}
			}
			function Za(e, t, ...n) {
				if (!0 === t) return void e()
				if (!1 === t) return
				const o = new cr({
					next: () => {
						o.unsubscribe(), e()
					},
				})
				return yt(t(...n)).subscribe(o)
			}
			function kt(e, t) {
				return Ee((n, o) => {
					let r = null,
						i = 0,
						s = !1
					const a = () => s && !r && o.complete()
					n.subscribe(
						Se(
							o,
							(c) => {
								r?.unsubscribe()
								let l = 0
								const u = i++
								yt(e(c, u)).subscribe(
									(r = Se(
										o,
										(d) => o.next(t ? t(c, d, u, l++) : d),
										() => {
											;(r = null), a()
										}
									))
								)
							},
							() => {
								;(s = !0), a()
							}
						)
					)
				})
			}
			function Q0(e, t) {
				return e === t
			}
			function ne(e) {
				for (let t in e) if (e[t] === ne) return t
				throw Error('Could not find renamed property on target object.')
			}
			function we(e) {
				if ('string' == typeof e) return e
				if (Array.isArray(e)) return '[' + e.map(we).join(', ') + ']'
				if (null == e) return '' + e
				if (e.overriddenName) return `${e.overriddenName}`
				if (e.name) return `${e.name}`
				const t = e.toString()
				if (null == t) return '' + t
				const n = t.indexOf('\n')
				return -1 === n ? t : t.substring(0, n)
			}
			function Qa(e, t) {
				return null == e || '' === e ? (null === t ? '' : t) : null == t || '' === t ? e : e + ' ' + t
			}
			const Y0 = ne({__forward_ref__: ne})
			function Ya(e) {
				return (
					(e.__forward_ref__ = Ya),
					(e.toString = function () {
						return we(this())
					}),
					e
				)
			}
			function j(e) {
				return Ka(e) ? e() : e
			}
			function Ka(e) {
				return 'function' == typeof e && e.hasOwnProperty(Y0) && e.__forward_ref__ === Ya
			}
			function Ja(e) {
				return e && !!e.ɵproviders
			}
			const cf = 'https://g.co/ng/security#xss'
			class O extends Error {
				constructor(t, n) {
					super(
						(function Ti(e, t) {
							return `NG0${Math.abs(e)}${t ? ': ' + t : ''}`
						})(t, n)
					),
						(this.code = t)
				}
			}
			function $(e) {
				return 'string' == typeof e ? e : null == e ? '' : String(e)
			}
			function ki(e, t) {
				throw new O(-201, !1)
			}
			function ft(e, t) {
				null == e &&
					(function K(e, t, n, o) {
						throw new Error(
							`ASSERTION ERROR: ${e}` + (null == o ? '' : ` [Expected=> ${n} ${o} ${t} <=Actual]`)
						)
					})(t, e, null, '!=')
			}
			function N(e) {
				return {token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0}
			}
			function ge(e) {
				return {providers: e.providers || [], imports: e.imports || []}
			}
			function Ri(e) {
				return lf(e, Ai) || lf(e, df)
			}
			function lf(e, t) {
				return e.hasOwnProperty(t) ? e[t] : null
			}
			function uf(e) {
				return e && (e.hasOwnProperty(Xa) || e.hasOwnProperty(rC)) ? e[Xa] : null
			}
			const Ai = ne({ɵprov: ne}),
				Xa = ne({ɵinj: ne}),
				df = ne({ngInjectableDef: ne}),
				rC = ne({ngInjectorDef: ne})
			var W = (function (e) {
				return (
					(e[(e.Default = 0)] = 'Default'),
					(e[(e.Host = 1)] = 'Host'),
					(e[(e.Self = 2)] = 'Self'),
					(e[(e.SkipSelf = 4)] = 'SkipSelf'),
					(e[(e.Optional = 8)] = 'Optional'),
					e
				)
			})(W || {})
			let ec
			function Qe(e) {
				const t = ec
				return (ec = e), t
			}
			function gf(e, t, n) {
				const o = Ri(e)
				return o && 'root' == o.providedIn
					? void 0 === o.value
						? (o.value = o.factory())
						: o.value
					: n & W.Optional
					? null
					: void 0 !== t
					? t
					: void ki(we(e))
			}
			const se = (() =>
					(typeof globalThis < 'u' && globalThis) ||
					(typeof global < 'u' && global) ||
					(typeof window < 'u' && window) ||
					(typeof self < 'u' &&
						typeof WorkerGlobalScope < 'u' &&
						self instanceof WorkerGlobalScope &&
						self))(),
				ur = {},
				tc = '__NG_DI_FLAG__',
				Ni = 'ngTempTokenPath',
				sC = /\n/gm,
				pf = '__source'
			let Xn
			function hn(e) {
				const t = Xn
				return (Xn = e), t
			}
			function lC(e, t = W.Default) {
				if (void 0 === Xn) throw new O(-203, !1)
				return null === Xn ? gf(e, void 0, t) : Xn.get(e, t & W.Optional ? null : void 0, t)
			}
			function R(e, t = W.Default) {
				return (
					(function ff() {
						return ec
					})() || lC
				)(j(e), t)
			}
			function S(e, t = W.Default) {
				return R(e, Li(t))
			}
			function Li(e) {
				return typeof e > 'u' || 'number' == typeof e
					? e
					: 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
			}
			function nc(e) {
				const t = []
				for (let n = 0; n < e.length; n++) {
					const o = j(e[n])
					if (Array.isArray(o)) {
						if (0 === o.length) throw new O(900, !1)
						let r,
							i = W.Default
						for (let s = 0; s < o.length; s++) {
							const a = o[s],
								c = uC(a)
							'number' == typeof c ? (-1 === c ? (r = a.token) : (i |= c)) : (r = a)
						}
						t.push(R(r, i))
					} else t.push(R(o))
				}
				return t
			}
			function dr(e, t) {
				return (e[tc] = t), (e.prototype[tc] = t), e
			}
			function uC(e) {
				return e[tc]
			}
			function Qt(e) {
				return {toString: e}.toString()
			}
			var Fi = (function (e) {
					return (e[(e.OnPush = 0)] = 'OnPush'), (e[(e.Default = 1)] = 'Default'), e
				})(Fi || {}),
				bt = (function (e) {
					return (
						(e[(e.Emulated = 0)] = 'Emulated'),
						(e[(e.None = 2)] = 'None'),
						(e[(e.ShadowDom = 3)] = 'ShadowDom'),
						e
					)
				})(bt || {})
			const Rt = {},
				Y = [],
				ji = ne({ɵcmp: ne}),
				oc = ne({ɵdir: ne}),
				rc = ne({ɵpipe: ne}),
				mf = ne({ɵmod: ne}),
				Yt = ne({ɵfac: ne}),
				fr = ne({__NG_ELEMENT_ID__: ne}),
				_f = ne({__NG_ENV_ID__: ne})
			function vf(e, t, n) {
				let o = e.length
				for (;;) {
					const r = e.indexOf(t, n)
					if (-1 === r) return r
					if (0 === r || e.charCodeAt(r - 1) <= 32) {
						const i = t.length
						if (r + i === o || e.charCodeAt(r + i) <= 32) return r
					}
					n = r + 1
				}
			}
			function ic(e, t, n) {
				let o = 0
				for (; o < n.length; ) {
					const r = n[o]
					if ('number' == typeof r) {
						if (0 !== r) break
						o++
						const i = n[o++],
							s = n[o++],
							a = n[o++]
						e.setAttribute(t, s, a, i)
					} else {
						const i = r,
							s = n[++o]
						bf(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), o++
					}
				}
				return o
			}
			function yf(e) {
				return 3 === e || 4 === e || 6 === e
			}
			function bf(e) {
				return 64 === e.charCodeAt(0)
			}
			function gr(e, t) {
				if (null !== t && 0 !== t.length)
					if (null === e || 0 === e.length) e = t.slice()
					else {
						let n = -1
						for (let o = 0; o < t.length; o++) {
							const r = t[o]
							'number' == typeof r
								? (n = r)
								: 0 === n || Cf(e, n, r, null, -1 === n || 2 === n ? t[++o] : null)
						}
					}
				return e
			}
			function Cf(e, t, n, o, r) {
				let i = 0,
					s = e.length
				if (-1 === t) s = -1
				else
					for (; i < e.length; ) {
						const a = e[i++]
						if ('number' == typeof a) {
							if (a === t) {
								s = -1
								break
							}
							if (a > t) {
								s = i - 1
								break
							}
						}
					}
				for (; i < e.length; ) {
					const a = e[i]
					if ('number' == typeof a) break
					if (a === n) {
						if (null === o) return void (null !== r && (e[i + 1] = r))
						if (o === e[i + 1]) return void (e[i + 2] = r)
					}
					i++, null !== o && i++, null !== r && i++
				}
				;-1 !== s && (e.splice(s, 0, t), (i = s + 1)),
					e.splice(i++, 0, n),
					null !== o && e.splice(i++, 0, o),
					null !== r && e.splice(i++, 0, r)
			}
			const xf = 'ng-template'
			function gC(e, t, n) {
				let o = 0,
					r = !0
				for (; o < e.length; ) {
					let i = e[o++]
					if ('string' == typeof i && r) {
						const s = e[o++]
						if (n && 'class' === i && -1 !== vf(s.toLowerCase(), t, 0)) return !0
					} else {
						if (1 === i) {
							for (; o < e.length && 'string' == typeof (i = e[o++]); )
								if (i.toLowerCase() === t) return !0
							return !1
						}
						'number' == typeof i && (r = !1)
					}
				}
				return !1
			}
			function Mf(e) {
				return 4 === e.type && e.value !== xf
			}
			function pC(e, t, n) {
				return t === (4 !== e.type || n ? e.value : xf)
			}
			function hC(e, t, n) {
				let o = 4
				const r = e.attrs || [],
					i = (function vC(e) {
						for (let t = 0; t < e.length; t++) if (yf(e[t])) return t
						return e.length
					})(r)
				let s = !1
				for (let a = 0; a < t.length; a++) {
					const c = t[a]
					if ('number' != typeof c) {
						if (!s)
							if (4 & o) {
								if (((o = 2 | (1 & o)), ('' !== c && !pC(e, c, n)) || ('' === c && 1 === t.length))) {
									if (Ct(o)) return !1
									s = !0
								}
							} else {
								const l = 8 & o ? c : t[++a]
								if (8 & o && null !== e.attrs) {
									if (!gC(e.attrs, l, n)) {
										if (Ct(o)) return !1
										s = !0
									}
									continue
								}
								const d = mC(8 & o ? 'class' : c, r, Mf(e), n)
								if (-1 === d) {
									if (Ct(o)) return !1
									s = !0
									continue
								}
								if ('' !== l) {
									let p
									p = d > i ? '' : r[d + 1].toLowerCase()
									const m = 8 & o ? p : null
									if ((m && -1 !== vf(m, l, 0)) || (2 & o && l !== p)) {
										if (Ct(o)) return !1
										s = !0
									}
								}
							}
					} else {
						if (!s && !Ct(o) && !Ct(c)) return !1
						if (s && Ct(c)) continue
						;(s = !1), (o = c | (1 & o))
					}
				}
				return Ct(o) || s
			}
			function Ct(e) {
				return 0 == (1 & e)
			}
			function mC(e, t, n, o) {
				if (null === t) return -1
				let r = 0
				if (o || !n) {
					let i = !1
					for (; r < t.length; ) {
						const s = t[r]
						if (s === e) return r
						if (3 === s || 6 === s) i = !0
						else {
							if (1 === s || 2 === s) {
								let a = t[++r]
								for (; 'string' == typeof a; ) a = t[++r]
								continue
							}
							if (4 === s) break
							if (0 === s) {
								r += 4
								continue
							}
						}
						r += i ? 1 : 2
					}
					return -1
				}
				return (function yC(e, t) {
					let n = e.indexOf(4)
					if (n > -1)
						for (n++; n < e.length; ) {
							const o = e[n]
							if ('number' == typeof o) return -1
							if (o === t) return n
							n++
						}
					return -1
				})(t, e)
			}
			function wf(e, t, n = !1) {
				for (let o = 0; o < t.length; o++) if (hC(e, t[o], n)) return !0
				return !1
			}
			function Pf(e, t) {
				return e ? ':not(' + t.trim() + ')' : t
			}
			function CC(e) {
				let t = e[0],
					n = 1,
					o = 2,
					r = '',
					i = !1
				for (; n < e.length; ) {
					let s = e[n]
					if ('string' == typeof s)
						if (2 & o) {
							const a = e[++n]
							r += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']'
						} else 8 & o ? (r += '.' + s) : 4 & o && (r += ' ' + s)
					else '' !== r && !Ct(s) && ((t += Pf(i, r)), (r = '')), (o = s), (i = i || !Ct(o))
					n++
				}
				return '' !== r && (t += Pf(i, r)), t
			}
			function D(e) {
				return Qt(() => {
					const t = Df(e),
						n = {
							...t,
							decls: e.decls,
							vars: e.vars,
							template: e.template,
							consts: e.consts || null,
							ngContentSelectors: e.ngContentSelectors,
							onPush: e.changeDetection === Fi.OnPush,
							directiveDefs: null,
							pipeDefs: null,
							dependencies: (t.standalone && e.dependencies) || null,
							getStandaloneInjector: null,
							signals: e.signals ?? !1,
							data: e.data || {},
							encapsulation: e.encapsulation || bt.Emulated,
							styles: e.styles || Y,
							_: null,
							schemas: e.schemas || null,
							tView: null,
							id: '',
						}
					Ef(n)
					const o = e.dependencies
					return (
						(n.directiveDefs = zi(o, !1)),
						(n.pipeDefs = zi(o, !0)),
						(n.id = (function SC(e) {
							let t = 0
							const n = [
								e.selectors,
								e.ngContentSelectors,
								e.hostVars,
								e.hostAttrs,
								e.consts,
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
							].join('|')
							for (const r of n) t = (Math.imul(31, t) + r.charCodeAt(0)) << 0
							return (t += 2147483648), 'c' + t
						})(n)),
						n
					)
				})
			}
			function PC(e) {
				return J(e) || Ae(e)
			}
			function OC(e) {
				return null !== e
			}
			function pe(e) {
				return Qt(() => ({
					type: e.type,
					bootstrap: e.bootstrap || Y,
					declarations: e.declarations || Y,
					imports: e.imports || Y,
					exports: e.exports || Y,
					transitiveCompileScopes: null,
					schemas: e.schemas || null,
					id: e.id || null,
				}))
			}
			function Of(e, t) {
				if (null == e) return Rt
				const n = {}
				for (const o in e)
					if (e.hasOwnProperty(o)) {
						let r = e[o],
							i = r
						Array.isArray(r) && ((i = r[1]), (r = r[0])), (n[r] = o), t && (t[r] = i)
					}
				return n
			}
			function Ve(e) {
				return Qt(() => {
					const t = Df(e)
					return Ef(t), t
				})
			}
			function J(e) {
				return e[ji] || null
			}
			function Ae(e) {
				return e[oc] || null
			}
			function Ke(e) {
				return e[rc] || null
			}
			function rt(e, t) {
				const n = e[mf] || null
				if (!n && !0 === t) throw new Error(`Type ${we(e)} does not have '\u0275mod' property.`)
				return n
			}
			function Df(e) {
				const t = {}
				return {
					type: e.type,
					providersResolver: null,
					factory: null,
					hostBindings: e.hostBindings || null,
					hostVars: e.hostVars || 0,
					hostAttrs: e.hostAttrs || null,
					contentQueries: e.contentQueries || null,
					declaredInputs: t,
					inputTransforms: null,
					inputConfig: e.inputs || Rt,
					exportAs: e.exportAs || null,
					standalone: !0 === e.standalone,
					signals: !0 === e.signals,
					selectors: e.selectors || Y,
					viewQuery: e.viewQuery || null,
					features: e.features || null,
					setInput: null,
					findHostDirectiveDefs: null,
					hostDirectives: null,
					inputs: Of(e.inputs, t),
					outputs: Of(e.outputs),
				}
			}
			function Ef(e) {
				e.features?.forEach((t) => t(e))
			}
			function zi(e, t) {
				if (!e) return null
				const n = t ? Ke : PC
				return () => ('function' == typeof e ? e() : e).map((o) => n(o)).filter(OC)
			}
			const Pe = 0,
				E = 1,
				B = 2,
				he = 3,
				xt = 4,
				pr = 5,
				Ne = 6,
				to = 7,
				ve = 8,
				no = 9,
				Tn = 10,
				U = 11,
				hr = 12,
				Sf = 13,
				oo = 14,
				ye = 15,
				mr = 16,
				ro = 17,
				At = 18,
				_r = 19,
				If = 20,
				mn = 21,
				Kt = 22,
				$i = 23,
				Vi = 24,
				Z = 25,
				sc = 1,
				Tf = 2,
				Nt = 7,
				io = 9,
				Le = 11
			function it(e) {
				return Array.isArray(e) && 'object' == typeof e[sc]
			}
			function Je(e) {
				return Array.isArray(e) && !0 === e[sc]
			}
			function ac(e) {
				return 0 != (4 & e.flags)
			}
			function kn(e) {
				return e.componentOffset > -1
			}
			function Ui(e) {
				return 1 == (1 & e.flags)
			}
			function Mt(e) {
				return !!e.template
			}
			function cc(e) {
				return 0 != (512 & e[B])
			}
			function Rn(e, t) {
				return e.hasOwnProperty(Yt) ? e[Yt] : null
			}
			let NC =
					se.WeakRef ??
					class AC {
						constructor(t) {
							this.ref = t
						}
						deref() {
							return this.ref
						}
					},
				FC = 0,
				Lt = null,
				Hi = !1
			function Ie(e) {
				const t = Lt
				return (Lt = e), t
			}
			class Lf {
				constructor() {
					;(this.id = FC++),
						(this.ref = (function LC(e) {
							return new NC(e)
						})(this)),
						(this.producers = new Map()),
						(this.consumers = new Map()),
						(this.trackingVersion = 0),
						(this.valueVersion = 0)
				}
				consumerPollProducersForChange() {
					for (const [t, n] of this.producers) {
						const o = n.producerNode.deref()
						if (null != o && n.atTrackingVersion === this.trackingVersion) {
							if (o.producerPollStatus(n.seenValueVersion)) return !0
						} else this.producers.delete(t), o?.consumers.delete(this.id)
					}
					return !1
				}
				producerMayHaveChanged() {
					const t = Hi
					Hi = !0
					try {
						for (const [n, o] of this.consumers) {
							const r = o.consumerNode.deref()
							null != r && r.trackingVersion === o.atTrackingVersion
								? r.onConsumerDependencyMayHaveChanged()
								: (this.consumers.delete(n), r?.producers.delete(this.id))
						}
					} finally {
						Hi = t
					}
				}
				producerAccessed() {
					if (Hi) throw new Error('')
					if (null === Lt) return
					let t = Lt.producers.get(this.id)
					void 0 === t
						? ((t = {
								consumerNode: Lt.ref,
								producerNode: this.ref,
								seenValueVersion: this.valueVersion,
								atTrackingVersion: Lt.trackingVersion,
						  }),
						  Lt.producers.set(this.id, t),
						  this.consumers.set(Lt.id, t))
						: ((t.seenValueVersion = this.valueVersion), (t.atTrackingVersion = Lt.trackingVersion))
				}
				get hasProducers() {
					return this.producers.size > 0
				}
				get producerUpdatesAllowed() {
					return !1 !== Lt?.consumerAllowSignalWrites
				}
				producerPollStatus(t) {
					return this.valueVersion !== t || (this.onProducerUpdateValueVersion(), this.valueVersion !== t)
				}
			}
			let Ff = null
			const zf = () => {}
			class VC extends Lf {
				constructor(t, n, o) {
					super(),
						(this.watch = t),
						(this.schedule = n),
						(this.dirty = !1),
						(this.cleanupFn = zf),
						(this.registerOnCleanup = (r) => {
							this.cleanupFn = r
						}),
						(this.consumerAllowSignalWrites = o)
				}
				notify() {
					this.dirty || this.schedule(this), (this.dirty = !0)
				}
				onConsumerDependencyMayHaveChanged() {
					this.notify()
				}
				onProducerUpdateValueVersion() {}
				run() {
					if (((this.dirty = !1), 0 !== this.trackingVersion && !this.consumerPollProducersForChange()))
						return
					const t = Ie(this)
					this.trackingVersion++
					try {
						this.cleanupFn(), (this.cleanupFn = zf), this.watch(this.registerOnCleanup)
					} finally {
						Ie(t)
					}
				}
				cleanup() {
					this.cleanupFn()
				}
			}
			class BC {
				constructor(t, n, o) {
					;(this.previousValue = t), (this.currentValue = n), (this.firstChange = o)
				}
				isFirstChange() {
					return this.firstChange
				}
			}
			function An() {
				return $f
			}
			function $f(e) {
				return e.type.prototype.ngOnChanges && (e.setInput = HC), UC
			}
			function UC() {
				const e = Bf(this),
					t = e?.current
				if (t) {
					const n = e.previous
					if (n === Rt) e.previous = t
					else for (let o in t) n[o] = t[o]
					;(e.current = null), this.ngOnChanges(t)
				}
			}
			function HC(e, t, n, o) {
				const r = this.declaredInputs[n],
					i =
						Bf(e) ||
						(function qC(e, t) {
							return (e[Vf] = t)
						})(e, {previous: Rt, current: null}),
					s = i.current || (i.current = {}),
					a = i.previous,
					c = a[r]
				;(s[r] = new BC(c && c.currentValue, t, a === Rt)), (e[o] = t)
			}
			An.ngInherit = !0
			const Vf = '__ngSimpleChanges__'
			function Bf(e) {
				return e[Vf] || null
			}
			const Ft = function (e, t, n) {}
			function fe(e) {
				for (; Array.isArray(e); ) e = e[Pe]
				return e
			}
			function Wi(e, t) {
				return fe(t[e])
			}
			function Xe(e, t) {
				return fe(t[e.index])
			}
			function qf(e, t) {
				return e.data[t]
			}
			function st(e, t) {
				const n = t[e]
				return it(n) ? n : n[Pe]
			}
			function _n(e, t) {
				return null == t ? null : e[t]
			}
			function Gf(e) {
				e[ro] = 0
			}
			function JC(e) {
				1024 & e[B] || ((e[B] |= 1024), Zf(e, 1))
			}
			function Wf(e) {
				1024 & e[B] && ((e[B] &= -1025), Zf(e, -1))
			}
			function Zf(e, t) {
				let n = e[he]
				if (null === n) return
				n[pr] += t
				let o = n
				for (n = n[he]; null !== n && ((1 === t && 1 === o[pr]) || (-1 === t && 0 === o[pr])); )
					(n[pr] += t), (o = n), (n = n[he])
			}
			const L = {lFrame: ig(null), bindingsEnabled: !0, skipHydrationRootTNode: null}
			function Kf() {
				return L.bindingsEnabled
			}
			function C() {
				return L.lFrame.lView
			}
			function Q() {
				return L.lFrame.tView
			}
			function pc(e) {
				return (L.lFrame.contextLView = e), e[ve]
			}
			function hc(e) {
				return (L.lFrame.contextLView = null), e
			}
			function Re() {
				let e = Jf()
				for (; null !== e && 64 === e.type; ) e = e.parent
				return e
			}
			function Jf() {
				return L.lFrame.currentTNode
			}
			function jt(e, t) {
				const n = L.lFrame
				;(n.currentTNode = e), (n.isParent = t)
			}
			function mc() {
				return L.lFrame.isParent
			}
			function _c() {
				L.lFrame.isParent = !1
			}
			function co() {
				return L.lFrame.bindingIndex++
			}
			function u1(e, t) {
				const n = L.lFrame
				;(n.bindingIndex = n.bindingRootIndex = e), vc(t)
			}
			function vc(e) {
				L.lFrame.currentDirectiveIndex = e
			}
			function bc(e) {
				L.lFrame.currentQueryIndex = e
			}
			function f1(e) {
				const t = e[E]
				return 2 === t.type ? t.declTNode : 1 === t.type ? e[Ne] : null
			}
			function og(e, t, n) {
				if (n & W.SkipSelf) {
					let r = t,
						i = e
					for (
						;
						!((r = r.parent),
						null !== r || n & W.Host || ((r = f1(i)), null === r || ((i = i[oo]), 10 & r.type)));

					);
					if (null === r) return !1
					;(t = r), (e = i)
				}
				const o = (L.lFrame = rg())
				return (o.currentTNode = t), (o.lView = e), !0
			}
			function Cc(e) {
				const t = rg(),
					n = e[E]
				;(L.lFrame = t),
					(t.currentTNode = n.firstChild),
					(t.lView = e),
					(t.tView = n),
					(t.contextLView = e),
					(t.bindingIndex = n.bindingStartIndex),
					(t.inI18n = !1)
			}
			function rg() {
				const e = L.lFrame,
					t = null === e ? null : e.child
				return null === t ? ig(e) : t
			}
			function ig(e) {
				const t = {
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
				}
				return null !== e && (e.child = t), t
			}
			function sg() {
				const e = L.lFrame
				return (L.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
			}
			const ag = sg
			function xc() {
				const e = sg()
				;(e.isParent = !0),
					(e.tView = null),
					(e.selectedIndex = -1),
					(e.contextLView = null),
					(e.elementDepthCount = 0),
					(e.currentDirectiveIndex = -1),
					(e.currentNamespace = null),
					(e.bindingRootIndex = -1),
					(e.bindingIndex = -1),
					(e.currentQueryIndex = 0)
			}
			function Ue() {
				return L.lFrame.selectedIndex
			}
			function Nn(e) {
				L.lFrame.selectedIndex = e
			}
			function me() {
				const e = L.lFrame
				return qf(e.tView, e.selectedIndex)
			}
			let lg = !0
			function Zi() {
				return lg
			}
			function vn(e) {
				lg = e
			}
			function Qi(e, t) {
				for (let n = t.directiveStart, o = t.directiveEnd; n < o; n++) {
					const i = e.data[n].type.prototype,
						{
							ngAfterContentInit: s,
							ngAfterContentChecked: a,
							ngAfterViewInit: c,
							ngAfterViewChecked: l,
							ngOnDestroy: u,
						} = i
					s && (e.contentHooks ??= []).push(-n, s),
						a && ((e.contentHooks ??= []).push(n, a), (e.contentCheckHooks ??= []).push(n, a)),
						c && (e.viewHooks ??= []).push(-n, c),
						l && ((e.viewHooks ??= []).push(n, l), (e.viewCheckHooks ??= []).push(n, l)),
						null != u && (e.destroyHooks ??= []).push(n, u)
				}
			}
			function Yi(e, t, n) {
				ug(e, t, 3, n)
			}
			function Ki(e, t, n, o) {
				;(3 & e[B]) === n && ug(e, t, n, o)
			}
			function Mc(e, t) {
				let n = e[B]
				;(3 & n) === t && ((n &= 8191), (n += 1), (e[B] = n))
			}
			function ug(e, t, n, o) {
				const i = o ?? -1,
					s = t.length - 1
				let a = 0
				for (let c = void 0 !== o ? 65535 & e[ro] : 0; c < s; c++)
					if ('number' == typeof t[c + 1]) {
						if (((a = t[c]), null != o && a >= o)) break
					} else
						t[c] < 0 && (e[ro] += 65536),
							(a < i || -1 == i) && (b1(e, n, t, c), (e[ro] = (4294901760 & e[ro]) + c + 2)),
							c++
			}
			function dg(e, t) {
				Ft(4, e, t)
				const n = Ie(null)
				try {
					t.call(e)
				} finally {
					Ie(n), Ft(5, e, t)
				}
			}
			function b1(e, t, n, o) {
				const r = n[o] < 0,
					i = n[o + 1],
					a = e[r ? -n[o] : n[o]]
				r ? e[B] >> 13 < e[ro] >> 16 && (3 & e[B]) === t && ((e[B] += 8192), dg(a, i)) : dg(a, i)
			}
			const lo = -1
			class br {
				constructor(t, n, o) {
					;(this.factory = t), (this.resolving = !1), (this.canSeeViewProviders = n), (this.injectImpl = o)
				}
			}
			function fg(e) {
				return e !== lo
			}
			function Ji(e) {
				return 32767 & e
			}
			function Xi(e, t) {
				let n = (function w1(e) {
						return e >> 16
					})(e),
					o = t
				for (; n > 0; ) (o = o[oo]), n--
				return o
			}
			let Pc = !0
			function es(e) {
				const t = Pc
				return (Pc = e), t
			}
			const gg = 255,
				pg = 5
			let P1 = 0
			const zt = {}
			function ts(e, t) {
				const n = hg(e, t)
				if (-1 !== n) return n
				const o = t[E]
				o.firstCreatePass && ((e.injectorIndex = t.length), Oc(o.data, e), Oc(t, null), Oc(o.blueprint, null))
				const r = Dc(e, t),
					i = e.injectorIndex
				if (fg(r)) {
					const s = Ji(r),
						a = Xi(r, t),
						c = a[E].data
					for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | c[s + l]
				}
				return (t[i + 8] = r), i
			}
			function Oc(e, t) {
				e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
			}
			function hg(e, t) {
				return -1 === e.injectorIndex ||
					(e.parent && e.parent.injectorIndex === e.injectorIndex) ||
					null === t[e.injectorIndex + 8]
					? -1
					: e.injectorIndex
			}
			function Dc(e, t) {
				if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex
				let n = 0,
					o = null,
					r = t
				for (; null !== r; ) {
					if (((o = Mg(r)), null === o)) return lo
					if ((n++, (r = r[oo]), -1 !== o.injectorIndex)) return o.injectorIndex | (n << 16)
				}
				return lo
			}
			function Ec(e, t, n) {
				!(function O1(e, t, n) {
					let o
					'string' == typeof n ? (o = n.charCodeAt(0) || 0) : n.hasOwnProperty(fr) && (o = n[fr]),
						null == o && (o = n[fr] = P1++)
					const r = o & gg
					t.data[e + (r >> pg)] |= 1 << r
				})(e, t, n)
			}
			function mg(e, t, n) {
				if (n & W.Optional || void 0 !== e) return e
				ki()
			}
			function _g(e, t, n, o) {
				if ((n & W.Optional && void 0 === o && (o = null), !(n & (W.Self | W.Host)))) {
					const r = e[no],
						i = Qe(void 0)
					try {
						return r ? r.get(t, o, n & W.Optional) : gf(t, o, n & W.Optional)
					} finally {
						Qe(i)
					}
				}
				return mg(o, 0, n)
			}
			function vg(e, t, n, o = W.Default, r) {
				if (null !== e) {
					if (2048 & t[B] && !(o & W.Self)) {
						const s = (function T1(e, t, n, o, r) {
							let i = e,
								s = t
							for (; null !== i && null !== s && 2048 & s[B] && !(512 & s[B]); ) {
								const a = yg(i, s, n, o | W.Self, zt)
								if (a !== zt) return a
								let c = i.parent
								if (!c) {
									const l = s[If]
									if (l) {
										const u = l.get(n, zt, o)
										if (u !== zt) return u
									}
									;(c = Mg(s)), (s = s[oo])
								}
								i = c
							}
							return r
						})(e, t, n, o, zt)
						if (s !== zt) return s
					}
					const i = yg(e, t, n, o, zt)
					if (i !== zt) return i
				}
				return _g(t, n, o, r)
			}
			function yg(e, t, n, o, r) {
				const i = (function S1(e) {
					if ('string' == typeof e) return e.charCodeAt(0) || 0
					const t = e.hasOwnProperty(fr) ? e[fr] : void 0
					return 'number' == typeof t ? (t >= 0 ? t & gg : I1) : t
				})(n)
				if ('function' == typeof i) {
					if (!og(t, e, o)) return o & W.Host ? mg(r, 0, o) : _g(t, n, o, r)
					try {
						const s = i(o)
						if (null != s || o & W.Optional) return s
						ki()
					} finally {
						ag()
					}
				} else if ('number' == typeof i) {
					let s = null,
						a = hg(e, t),
						c = lo,
						l = o & W.Host ? t[ye][Ne] : null
					for (
						(-1 === a || o & W.SkipSelf) &&
						((c = -1 === a ? Dc(e, t) : t[a + 8]),
						c !== lo && Cg(o, !1) ? ((s = t[E]), (a = Ji(c)), (t = Xi(c, t))) : (a = -1));
						-1 !== a;

					) {
						const u = t[E]
						if (bg(i, a, u.data)) {
							const d = E1(a, t, n, s, o, l)
							if (d !== zt) return d
						}
						;(c = t[a + 8]),
							c !== lo && Cg(o, t[E].data[a + 8] === l) && bg(i, a, t)
								? ((s = u), (a = Ji(c)), (t = Xi(c, t)))
								: (a = -1)
					}
				}
				return r
			}
			function E1(e, t, n, o, r, i) {
				const s = t[E],
					a = s.data[e + 8],
					u = (function ns(e, t, n, o, r) {
						const i = e.providerIndexes,
							s = t.data,
							a = 1048575 & i,
							c = e.directiveStart,
							u = i >> 20,
							p = r ? a + u : e.directiveEnd
						for (let m = o ? a : a + u; m < p; m++) {
							const v = s[m]
							if ((m < c && n === v) || (m >= c && v.type === n)) return m
						}
						if (r) {
							const m = s[c]
							if (m && Mt(m) && m.type === n) return c
						}
						return null
					})(a, s, n, null == o ? kn(a) && Pc : o != s && 0 != (3 & a.type), r & W.Host && i === a)
				return null !== u ? Ln(t, s, u, a) : zt
			}
			function Ln(e, t, n, o) {
				let r = e[n]
				const i = t.data
				if (
					(function C1(e) {
						return e instanceof br
					})(r)
				) {
					const s = r
					s.resolving &&
						(function K0(e, t) {
							const n = t ? `. Dependency path: ${t.join(' > ')} > ${e}` : ''
							throw new O(-200, `Circular dependency in DI detected for ${e}${n}`)
						})(
							(function te(e) {
								return 'function' == typeof e
									? e.name || e.toString()
									: 'object' == typeof e && null != e && 'function' == typeof e.type
									? e.type.name || e.type.toString()
									: $(e)
							})(i[n])
						)
					const a = es(s.canSeeViewProviders)
					s.resolving = !0
					const c = s.injectImpl ? Qe(s.injectImpl) : null
					og(e, o, W.Default)
					try {
						;(r = e[n] = s.factory(void 0, i, e, o)),
							t.firstCreatePass &&
								n >= o.directiveStart &&
								(function y1(e, t, n) {
									const {ngOnChanges: o, ngOnInit: r, ngDoCheck: i} = t.type.prototype
									if (o) {
										const s = $f(t)
										;(n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s)
									}
									r && (n.preOrderHooks ??= []).push(0 - e, r),
										i &&
											((n.preOrderHooks ??= []).push(e, i),
											(n.preOrderCheckHooks ??= []).push(e, i))
								})(n, i[n], t)
					} finally {
						null !== c && Qe(c), es(a), (s.resolving = !1), ag()
					}
				}
				return r
			}
			function bg(e, t, n) {
				return !!(n[t + (e >> pg)] & (1 << e))
			}
			function Cg(e, t) {
				return !(e & W.Self || (e & W.Host && t))
			}
			class uo {
				constructor(t, n) {
					;(this._tNode = t), (this._lView = n)
				}
				get(t, n, o) {
					return vg(this._tNode, this._lView, t, Li(o), n)
				}
			}
			function I1() {
				return new uo(Re(), C())
			}
			function Sc(e) {
				return Ka(e)
					? () => {
							const t = Sc(j(e))
							return t && t()
					  }
					: Rn(e)
			}
			function Mg(e) {
				const t = e[E],
					n = t.type
				return 2 === n ? t.declTNode : 1 === n ? e[Ne] : null
			}
			const go = '__parameters__'
			function ho(e, t, n) {
				return Qt(() => {
					const o = (function Ic(e) {
						return function (...n) {
							if (e) {
								const o = e(...n)
								for (const r in o) this[r] = o[r]
							}
						}
					})(t)
					function r(...i) {
						if (this instanceof r) return o.apply(this, i), this
						const s = new r(...i)
						return (a.annotation = s), a
						function a(c, l, u) {
							const d = c.hasOwnProperty(go) ? c[go] : Object.defineProperty(c, go, {value: []})[go]
							for (; d.length <= u; ) d.push(null)
							return (d[u] = d[u] || []).push(s), c
						}
					}
					return (
						n && (r.prototype = Object.create(n.prototype)),
						(r.prototype.ngMetadataName = e),
						(r.annotationCls = r),
						r
					)
				})
			}
			function xr(e, t) {
				e.forEach((n) => (Array.isArray(n) ? xr(n, t) : t(n)))
			}
			function Pg(e, t, n) {
				t >= e.length ? e.push(n) : e.splice(t, 0, n)
			}
			function rs(e, t) {
				return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
			}
			function at(e, t, n) {
				let o = _o(e, t)
				return (
					o >= 0
						? (e[1 | o] = n)
						: ((o = ~o),
						  (function j1(e, t, n, o) {
								let r = e.length
								if (r == t) e.push(n, o)
								else if (1 === r) e.push(o, e[0]), (e[0] = n)
								else {
									for (r--, e.push(e[r - 1], e[r]); r > t; ) (e[r] = e[r - 2]), r--
									;(e[t] = n), (e[t + 1] = o)
								}
						  })(e, o, t, n)),
					o
				)
			}
			function Tc(e, t) {
				const n = _o(e, t)
				if (n >= 0) return e[1 | n]
			}
			function _o(e, t) {
				return (function Og(e, t, n) {
					let o = 0,
						r = e.length >> n
					for (; r !== o; ) {
						const i = o + ((r - o) >> 1),
							s = e[i << n]
						if (t === s) return i << n
						s > t ? (r = i) : (o = i + 1)
					}
					return ~(r << n)
				})(e, t, 1)
			}
			const ss = dr(ho('Optional'), 8),
				as = dr(ho('SkipSelf'), 4)
			function fs(e) {
				return 128 == (128 & e.flags)
			}
			var yn = (function (e) {
				return (e[(e.Important = 1)] = 'Important'), (e[(e.DashCase = 2)] = 'DashCase'), e
			})(yn || {})
			const ix = /^>|^->|<!--|-->|--!>|<!-$/g,
				sx = /(<|>)/,
				ax = '\u200b$1\u200b'
			const Lc = new Map()
			let cx = 0
			const jc = '__ngContext__'
			function Fe(e, t) {
				it(t)
					? ((e[jc] = t[_r]),
					  (function ux(e) {
							Lc.set(e[_r], e)
					  })(t))
					: (e[jc] = t)
			}
			let zc
			function $c(e, t) {
				return zc(e, t)
			}
			function Or(e) {
				const t = e[he]
				return Je(t) ? t[he] : t
			}
			function Gg(e) {
				return Zg(e[hr])
			}
			function Wg(e) {
				return Zg(e[xt])
			}
			function Zg(e) {
				for (; null !== e && !Je(e); ) e = e[xt]
				return e
			}
			function bo(e, t, n, o, r) {
				if (null != o) {
					let i,
						s = !1
					Je(o) ? (i = o) : it(o) && ((s = !0), (o = o[Pe]))
					const a = fe(o)
					0 === e && null !== n
						? null == r
							? Xg(t, n, a)
							: Fn(t, n, a, r || null, !0)
						: 1 === e && null !== n
						? Fn(t, n, a, r || null, !0)
						: 2 === e
						? (function vs(e, t, n) {
								const o = ms(e, t)
								o &&
									(function Sx(e, t, n, o) {
										e.removeChild(t, n, o)
									})(e, o, t, n)
						  })(t, a, s)
						: 3 === e && t.destroyNode(a),
						null != i &&
							(function kx(e, t, n, o, r) {
								const i = n[Nt]
								i !== fe(n) && bo(t, e, o, i, r)
								for (let a = Le; a < n.length; a++) {
									const c = n[a]
									Er(c[E], c, e, t, o, i)
								}
							})(t, e, i, n, r)
				}
			}
			function Vc(e, t) {
				return e.createComment(
					(function jg(e) {
						return e.replace(ix, (t) => t.replace(sx, ax))
					})(t)
				)
			}
			function hs(e, t, n) {
				return e.createElement(t, n)
			}
			function Yg(e, t) {
				const n = e[io],
					o = n.indexOf(t)
				Wf(t), n.splice(o, 1)
			}
			function Bc(e, t) {
				if (e.length <= Le) return
				const n = Le + t,
					o = e[n]
				if (o) {
					const r = o[mr]
					null !== r && r !== e && Yg(r, o), t > 0 && (e[n - 1][xt] = o[xt])
					const i = rs(e, Le + t)
					!(function Cx(e, t) {
						Er(e, t, t[U], 2, null, null), (t[Pe] = null), (t[Ne] = null)
					})(o[E], o)
					const s = i[At]
					null !== s && s.detachView(i[E]), (o[he] = null), (o[xt] = null), (o[B] &= -129)
				}
				return o
			}
			function Kg(e, t) {
				if (!(256 & t[B])) {
					const n = t[U]
					t[$i]?.destroy(),
						t[Vi]?.destroy(),
						n.destroyNode && Er(e, t, n, 3, null, null),
						(function wx(e) {
							let t = e[hr]
							if (!t) return Uc(e[E], e)
							for (; t; ) {
								let n = null
								if (it(t)) n = t[hr]
								else {
									const o = t[Le]
									o && (n = o)
								}
								if (!n) {
									for (; t && !t[xt] && t !== e; ) it(t) && Uc(t[E], t), (t = t[he])
									null === t && (t = e), it(t) && Uc(t[E], t), (n = t && t[xt])
								}
								t = n
							}
						})(t)
				}
			}
			function Uc(e, t) {
				if (!(256 & t[B])) {
					;(t[B] &= -129),
						(t[B] |= 256),
						(function Ex(e, t) {
							let n
							if (null != e && null != (n = e.destroyHooks))
								for (let o = 0; o < n.length; o += 2) {
									const r = t[n[o]]
									if (!(r instanceof br)) {
										const i = n[o + 1]
										if (Array.isArray(i))
											for (let s = 0; s < i.length; s += 2) {
												const a = r[i[s]],
													c = i[s + 1]
												Ft(4, a, c)
												try {
													c.call(a)
												} finally {
													Ft(5, a, c)
												}
											}
										else {
											Ft(4, r, i)
											try {
												i.call(r)
											} finally {
												Ft(5, r, i)
											}
										}
									}
								}
						})(e, t),
						(function Dx(e, t) {
							const n = e.cleanup,
								o = t[to]
							if (null !== n)
								for (let i = 0; i < n.length - 1; i += 2)
									if ('string' == typeof n[i]) {
										const s = n[i + 3]
										s >= 0 ? o[s]() : o[-s].unsubscribe(), (i += 2)
									} else n[i].call(o[n[i + 1]])
							null !== o && (t[to] = null)
							const r = t[mn]
							if (null !== r) {
								t[mn] = null
								for (let i = 0; i < r.length; i++) (0, r[i])()
							}
						})(e, t),
						1 === t[E].type && t[U].destroy()
					const n = t[mr]
					if (null !== n && Je(t[he])) {
						n !== t[he] && Yg(n, t)
						const o = t[At]
						null !== o && o.detachView(e)
					}
					!(function dx(e) {
						Lc.delete(e[_r])
					})(t)
				}
			}
			function Hc(e, t, n) {
				return (function Jg(e, t, n) {
					let o = t
					for (; null !== o && 40 & o.type; ) o = (t = o).parent
					if (null === o) return n[Pe]
					{
						const {componentOffset: r} = o
						if (r > -1) {
							const {encapsulation: i} = e.data[o.directiveStart + r]
							if (i === bt.None || i === bt.Emulated) return null
						}
						return Xe(o, n)
					}
				})(e, t.parent, n)
			}
			function Fn(e, t, n, o, r) {
				e.insertBefore(t, n, o, r)
			}
			function Xg(e, t, n) {
				e.appendChild(t, n)
			}
			function ep(e, t, n, o, r) {
				null !== o ? Fn(e, t, n, o, r) : Xg(e, t, n)
			}
			function ms(e, t) {
				return e.parentNode(t)
			}
			let qc,
				ys,
				Qc,
				bs,
				op = function np(e, t, n) {
					return 40 & e.type ? Xe(e, n) : null
				}
			function _s(e, t, n, o) {
				const r = Hc(e, o, t),
					i = t[U],
					a = (function tp(e, t, n) {
						return op(e, t, n)
					})(o.parent || t[Ne], o, t)
				if (null != r)
					if (Array.isArray(n)) for (let c = 0; c < n.length; c++) ep(i, r, n[c], a, !1)
					else ep(i, r, n, a, !1)
				void 0 !== qc && qc(i, o, t, n, r)
			}
			function Dr(e, t) {
				if (null !== t) {
					const n = t.type
					if (3 & n) return Xe(t, e)
					if (4 & n) return Gc(-1, e[t.index])
					if (8 & n) {
						const o = t.child
						if (null !== o) return Dr(e, o)
						{
							const r = e[t.index]
							return Je(r) ? Gc(-1, r) : fe(r)
						}
					}
					if (32 & n) return $c(t, e)() || fe(e[t.index])
					{
						const o = ip(e, t)
						return null !== o ? (Array.isArray(o) ? o[0] : Dr(Or(e[ye]), o)) : Dr(e, t.next)
					}
				}
				return null
			}
			function ip(e, t) {
				return null !== t ? e[ye][Ne].projection[t.projection] : null
			}
			function Gc(e, t) {
				const n = Le + e + 1
				if (n < t.length) {
					const o = t[n],
						r = o[E].firstChild
					if (null !== r) return Dr(o, r)
				}
				return t[Nt]
			}
			function Wc(e, t, n, o, r, i, s) {
				for (; null != n; ) {
					const a = o[n.index],
						c = n.type
					if ((s && 0 === t && (a && Fe(fe(a), o), (n.flags |= 2)), 32 != (32 & n.flags)))
						if (8 & c) Wc(e, t, n.child, o, r, i, !1), bo(t, e, r, a, i)
						else if (32 & c) {
							const l = $c(n, o)
							let u
							for (; (u = l()); ) bo(t, e, r, u, i)
							bo(t, e, r, a, i)
						} else 16 & c ? ap(e, t, o, n, r, i) : bo(t, e, r, a, i)
					n = s ? n.projectionNext : n.next
				}
			}
			function Er(e, t, n, o, r, i) {
				Wc(n, o, e.firstChild, t, r, i, !1)
			}
			function ap(e, t, n, o, r, i) {
				const s = n[ye],
					c = s[Ne].projection[o.projection]
				if (Array.isArray(c)) for (let l = 0; l < c.length; l++) bo(t, e, r, c[l], i)
				else {
					let l = c
					const u = s[he]
					fs(o) && (l.flags |= 128), Wc(e, t, l, u, r, i, !0)
				}
			}
			function cp(e, t, n) {
				'' === n ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n)
			}
			function lp(e, t, n) {
				const {mergedAttrs: o, classes: r, styles: i} = n
				null !== o && ic(e, t, o),
					null !== r && cp(e, t, r),
					null !== i &&
						(function Ax(e, t, n) {
							e.setAttribute(t, 'style', n)
						})(e, t, i)
			}
			function Co(e) {
				return (
					(function Zc() {
						if (void 0 === ys && ((ys = null), se.trustedTypes))
							try {
								ys = se.trustedTypes.createPolicy('angular', {
									createHTML: (e) => e,
									createScript: (e) => e,
									createScriptURL: (e) => e,
								})
							} catch {}
						return ys
					})()?.createHTML(e) || e
				)
			}
			function Sr() {
				if (void 0 !== Qc) return Qc
				if (typeof document < 'u') return document
				throw new O(210, !1)
			}
			function up(e) {
				return (
					(function Yc() {
						if (void 0 === bs && ((bs = null), se.trustedTypes))
							try {
								bs = se.trustedTypes.createPolicy('angular#unsafe-bypass', {
									createHTML: (e) => e,
									createScript: (e) => e,
									createScriptURL: (e) => e,
								})
							} catch {}
						return bs
					})()?.createHTML(e) || e
				)
			}
			class gp {
				constructor(t) {
					this.changingThisBreaksApplicationSecurity = t
				}
				toString() {
					return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${cf})`
				}
			}
			function bn(e) {
				return e instanceof gp ? e.changingThisBreaksApplicationSecurity : e
			}
			function Ir(e, t) {
				const n = (function Hx(e) {
					return (e instanceof gp && e.getTypeName()) || null
				})(e)
				if (null != n && n !== t) {
					if ('ResourceURL' === n && 'URL' === t) return !0
					throw new Error(`Required a safe ${t}, got a ${n} (see ${cf})`)
				}
				return n === t
			}
			class qx {
				constructor(t) {
					this.inertDocumentHelper = t
				}
				getInertBodyElement(t) {
					t = '<body><remove></remove>' + t
					try {
						const n = new window.DOMParser().parseFromString(Co(t), 'text/html').body
						return null === n
							? this.inertDocumentHelper.getInertBodyElement(t)
							: (n.removeChild(n.firstChild), n)
					} catch {
						return null
					}
				}
			}
			class Gx {
				constructor(t) {
					;(this.defaultDoc = t),
						(this.inertDocument = this.defaultDoc.implementation.createHTMLDocument('sanitization-inert'))
				}
				getInertBodyElement(t) {
					const n = this.inertDocument.createElement('template')
					return (n.innerHTML = Co(t)), n
				}
			}
			const Zx = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i
			function Kc(e) {
				return (e = String(e)).match(Zx) ? e : 'unsafe:' + e
			}
			function en(e) {
				const t = {}
				for (const n of e.split(',')) t[n] = !0
				return t
			}
			function Tr(...e) {
				const t = {}
				for (const n of e) for (const o in n) n.hasOwnProperty(o) && (t[o] = !0)
				return t
			}
			const hp = en('area,br,col,hr,img,wbr'),
				mp = en('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
				_p = en('rp,rt'),
				Jc = Tr(
					hp,
					Tr(
						mp,
						en(
							'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
						)
					),
					Tr(
						_p,
						en(
							'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
						)
					),
					Tr(_p, mp)
				),
				Xc = en('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
				vp = Tr(
					Xc,
					en(
						'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
					),
					en(
						'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
					)
				),
				Qx = en('script,style,template')
			class Yx {
				constructor() {
					;(this.sanitizedSomething = !1), (this.buf = [])
				}
				sanitizeChildren(t) {
					let n = t.firstChild,
						o = !0
					for (; n; )
						if (
							(n.nodeType === Node.ELEMENT_NODE
								? (o = this.startElement(n))
								: n.nodeType === Node.TEXT_NODE
								? this.chars(n.nodeValue)
								: (this.sanitizedSomething = !0),
							o && n.firstChild)
						)
							n = n.firstChild
						else
							for (; n; ) {
								n.nodeType === Node.ELEMENT_NODE && this.endElement(n)
								let r = this.checkClobberedElement(n, n.nextSibling)
								if (r) {
									n = r
									break
								}
								n = this.checkClobberedElement(n, n.parentNode)
							}
					return this.buf.join('')
				}
				startElement(t) {
					const n = t.nodeName.toLowerCase()
					if (!Jc.hasOwnProperty(n)) return (this.sanitizedSomething = !0), !Qx.hasOwnProperty(n)
					this.buf.push('<'), this.buf.push(n)
					const o = t.attributes
					for (let r = 0; r < o.length; r++) {
						const i = o.item(r),
							s = i.name,
							a = s.toLowerCase()
						if (!vp.hasOwnProperty(a)) {
							this.sanitizedSomething = !0
							continue
						}
						let c = i.value
						Xc[a] && (c = Kc(c)), this.buf.push(' ', s, '="', yp(c), '"')
					}
					return this.buf.push('>'), !0
				}
				endElement(t) {
					const n = t.nodeName.toLowerCase()
					Jc.hasOwnProperty(n) &&
						!hp.hasOwnProperty(n) &&
						(this.buf.push('</'), this.buf.push(n), this.buf.push('>'))
				}
				chars(t) {
					this.buf.push(yp(t))
				}
				checkClobberedElement(t, n) {
					if (
						n &&
						(t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY) ===
							Node.DOCUMENT_POSITION_CONTAINED_BY
					)
						throw new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)
					return n
				}
			}
			const Kx = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
				Jx = /([^\#-~ |!])/g
			function yp(e) {
				return e
					.replace(/&/g, '&amp;')
					.replace(Kx, function (t) {
						return '&#' + (1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320) + 65536) + ';'
					})
					.replace(Jx, function (t) {
						return '&#' + t.charCodeAt(0) + ';'
					})
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
			}
			let Cs
			function el(e) {
				return 'content' in e &&
					(function eM(e) {
						return e.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === e.nodeName
					})(e)
					? e.content
					: null
			}
			var xo = (function (e) {
				return (
					(e[(e.NONE = 0)] = 'NONE'),
					(e[(e.HTML = 1)] = 'HTML'),
					(e[(e.STYLE = 2)] = 'STYLE'),
					(e[(e.SCRIPT = 3)] = 'SCRIPT'),
					(e[(e.URL = 4)] = 'URL'),
					(e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
					e
				)
			})(xo || {})
			function xs(e) {
				const t = Rr()
				return t
					? up(t.sanitize(xo.HTML, e) || '')
					: Ir(e, 'HTML')
					? up(bn(e))
					: (function Xx(e, t) {
							let n = null
							try {
								Cs =
									Cs ||
									(function pp(e) {
										const t = new Gx(e)
										return (function Wx() {
											try {
												return !!new window.DOMParser().parseFromString(Co(''), 'text/html')
											} catch {
												return !1
											}
										})()
											? new qx(t)
											: t
									})(e)
								let o = t ? String(t) : ''
								n = Cs.getInertBodyElement(o)
								let r = 5,
									i = o
								do {
									if (0 === r)
										throw new Error('Failed to sanitize html because the input is unstable')
									r--, (o = i), (i = n.innerHTML), (n = Cs.getInertBodyElement(o))
								} while (o !== i)
								return Co(new Yx().sanitizeChildren(el(n) || n))
							} finally {
								if (n) {
									const o = el(n) || n
									for (; o.firstChild; ) o.removeChild(o.firstChild)
								}
							}
					  })(Sr(), $(e))
			}
			function kr(e) {
				const t = Rr()
				return t ? t.sanitize(xo.URL, e) || '' : Ir(e, 'URL') ? bn(e) : Kc($(e))
			}
			function Rr() {
				const e = C()
				return e && e[Tn].sanitizer
			}
			class T {
				constructor(t, n) {
					;(this._desc = t),
						(this.ngMetadataName = 'InjectionToken'),
						(this.ɵprov = void 0),
						'number' == typeof n
							? (this.__NG_ELEMENT_ID__ = n)
							: void 0 !== n &&
							  (this.ɵprov = N({token: this, providedIn: n.providedIn || 'root', factory: n.factory}))
				}
				get multi() {
					return this
				}
				toString() {
					return `InjectionToken ${this._desc}`
				}
			}
			const Ar = new T('ENVIRONMENT_INITIALIZER'),
				xp = new T('INJECTOR', -1),
				Mp = new T('INJECTOR_DEF_TYPES')
			class wp {
				get(t, n = ur) {
					if (n === ur) {
						const o = new Error(`NullInjectorError: No provider for ${we(t)}!`)
						throw ((o.name = 'NullInjectorError'), o)
					}
					return n
				}
			}
			function sM(...e) {
				return {ɵproviders: Op(0, e), ɵfromNgModule: !0}
			}
			function Op(e, ...t) {
				const n = [],
					o = new Set()
				let r
				return (
					xr(t, (i) => {
						const s = i
						tl(s, n, [], o) && ((r ||= []), r.push(s))
					}),
					void 0 !== r && Dp(r, n),
					n
				)
			}
			function Dp(e, t) {
				for (let n = 0; n < e.length; n++) {
					const {providers: r} = e[n]
					nl(r, (i) => {
						t.push(i)
					})
				}
			}
			function tl(e, t, n, o) {
				if (!(e = j(e))) return !1
				let r = null,
					i = uf(e)
				const s = !i && J(e)
				if (i || s) {
					if (s && !s.standalone) return !1
					r = e
				} else {
					const c = e.ngModule
					if (((i = uf(c)), !i)) return !1
					r = c
				}
				const a = o.has(r)
				if (s) {
					if (a) return !1
					if ((o.add(r), s.dependencies)) {
						const c = 'function' == typeof s.dependencies ? s.dependencies() : s.dependencies
						for (const l of c) tl(l, t, n, o)
					}
				} else {
					if (!i) return !1
					{
						if (null != i.imports && !a) {
							let l
							o.add(r)
							try {
								xr(i.imports, (u) => {
									tl(u, t, n, o) && ((l ||= []), l.push(u))
								})
							} finally {
							}
							void 0 !== l && Dp(l, t)
						}
						if (!a) {
							const l = Rn(r) || (() => new r())
							t.push(
								{provide: r, useFactory: l, deps: Y},
								{provide: Mp, useValue: r, multi: !0},
								{provide: Ar, useValue: () => R(r), multi: !0}
							)
						}
						const c = i.providers
						null == c ||
							a ||
							nl(c, (u) => {
								t.push(u)
							})
					}
				}
				return r !== e && void 0 !== e.providers
			}
			function nl(e, t) {
				for (let n of e) Ja(n) && (n = n.ɵproviders), Array.isArray(n) ? nl(n, t) : t(n)
			}
			const aM = ne({provide: String, useValue: ne})
			function ol(e) {
				return null !== e && 'object' == typeof e && aM in e
			}
			function jn(e) {
				return 'function' == typeof e
			}
			const rl = new T('Set Injector scope.'),
				Ms = {},
				lM = {}
			let il
			function ws() {
				return void 0 === il && (il = new wp()), il
			}
			class tn {}
			class sl extends tn {
				get destroyed() {
					return this._destroyed
				}
				constructor(t, n, o, r) {
					super(),
						(this.parent = n),
						(this.source = o),
						(this.scopes = r),
						(this.records = new Map()),
						(this._ngOnDestroyHooks = new Set()),
						(this._onDestroyHooks = []),
						(this._destroyed = !1),
						cl(t, (s) => this.processProvider(s)),
						this.records.set(xp, Mo(void 0, this)),
						r.has('environment') && this.records.set(tn, Mo(void 0, this))
					const i = this.records.get(rl)
					null != i && 'string' == typeof i.value && this.scopes.add(i.value),
						(this.injectorDefTypes = new Set(this.get(Mp.multi, Y, W.Self)))
				}
				destroy() {
					this.assertNotDestroyed(), (this._destroyed = !0)
					try {
						for (const n of this._ngOnDestroyHooks) n.ngOnDestroy()
						const t = this._onDestroyHooks
						this._onDestroyHooks = []
						for (const n of t) n()
					} finally {
						this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear()
					}
				}
				onDestroy(t) {
					return this.assertNotDestroyed(), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t)
				}
				runInContext(t) {
					this.assertNotDestroyed()
					const n = hn(this),
						o = Qe(void 0)
					try {
						return t()
					} finally {
						hn(n), Qe(o)
					}
				}
				get(t, n = ur, o = W.Default) {
					if ((this.assertNotDestroyed(), t.hasOwnProperty(_f))) return t[_f](this)
					o = Li(o)
					const r = hn(this),
						i = Qe(void 0)
					try {
						if (!(o & W.SkipSelf)) {
							let a = this.records.get(t)
							if (void 0 === a) {
								const c =
									(function pM(e) {
										return 'function' == typeof e || ('object' == typeof e && e instanceof T)
									})(t) && Ri(t)
								;(a = c && this.injectableDefInScope(c) ? Mo(al(t), Ms) : null), this.records.set(t, a)
							}
							if (null != a) return this.hydrate(t, a)
						}
						return (o & W.Self ? ws() : this.parent).get(t, (n = o & W.Optional && n === ur ? null : n))
					} catch (s) {
						if ('NullInjectorError' === s.name) {
							if (((s[Ni] = s[Ni] || []).unshift(we(t)), r)) throw s
							return (function dC(e, t, n, o) {
								const r = e[Ni]
								throw (
									(t[pf] && r.unshift(t[pf]),
									(e.message = (function fC(e, t, n, o = null) {
										e = e && '\n' === e.charAt(0) && '\u0275' == e.charAt(1) ? e.slice(2) : e
										let r = we(t)
										if (Array.isArray(t)) r = t.map(we).join(' -> ')
										else if ('object' == typeof t) {
											let i = []
											for (let s in t)
												if (t.hasOwnProperty(s)) {
													let a = t[s]
													i.push(s + ':' + ('string' == typeof a ? JSON.stringify(a) : we(a)))
												}
											r = `{${i.join(', ')}}`
										}
										return `${n}${o ? '(' + o + ')' : ''}[${r}]: ${e.replace(sC, '\n  ')}`
									})('\n' + e.message, r, n, o)),
									(e.ngTokenPath = r),
									(e[Ni] = null),
									e)
								)
							})(s, t, 'R3InjectorError', this.source)
						}
						throw s
					} finally {
						Qe(i), hn(r)
					}
				}
				resolveInjectorInitializers() {
					const t = hn(this),
						n = Qe(void 0)
					try {
						const o = this.get(Ar.multi, Y, W.Self)
						for (const r of o) r()
					} finally {
						hn(t), Qe(n)
					}
				}
				toString() {
					const t = [],
						n = this.records
					for (const o of n.keys()) t.push(we(o))
					return `R3Injector[${t.join(', ')}]`
				}
				assertNotDestroyed() {
					if (this._destroyed) throw new O(205, !1)
				}
				processProvider(t) {
					let n = jn((t = j(t))) ? t : j(t && t.provide)
					const o = (function dM(e) {
						return ol(e)
							? Mo(void 0, e.useValue)
							: Mo(
									(function Ip(e, t, n) {
										let o
										if (jn(e)) {
											const r = j(e)
											return Rn(r) || al(r)
										}
										if (ol(e)) o = () => j(e.useValue)
										else if (
											(function Sp(e) {
												return !(!e || !e.useFactory)
											})(e)
										)
											o = () => e.useFactory(...nc(e.deps || []))
										else if (
											(function Ep(e) {
												return !(!e || !e.useExisting)
											})(e)
										)
											o = () => R(j(e.useExisting))
										else {
											const r = j(e && (e.useClass || e.provide))
											if (
												!(function fM(e) {
													return !!e.deps
												})(e)
											)
												return Rn(r) || al(r)
											o = () => new r(...nc(e.deps))
										}
										return o
									})(e),
									Ms
							  )
					})(t)
					if (jn(t) || !0 !== t.multi) this.records.get(n)
					else {
						let r = this.records.get(n)
						r || ((r = Mo(void 0, Ms, !0)), (r.factory = () => nc(r.multi)), this.records.set(n, r)),
							(n = t),
							r.multi.push(t)
					}
					this.records.set(n, o)
				}
				hydrate(t, n) {
					return (
						n.value === Ms && ((n.value = lM), (n.value = n.factory())),
						'object' == typeof n.value &&
							n.value &&
							(function gM(e) {
								return null !== e && 'object' == typeof e && 'function' == typeof e.ngOnDestroy
							})(n.value) &&
							this._ngOnDestroyHooks.add(n.value),
						n.value
					)
				}
				injectableDefInScope(t) {
					if (!t.providedIn) return !1
					const n = j(t.providedIn)
					return 'string' == typeof n ? 'any' === n || this.scopes.has(n) : this.injectorDefTypes.has(n)
				}
				removeOnDestroy(t) {
					const n = this._onDestroyHooks.indexOf(t)
					;-1 !== n && this._onDestroyHooks.splice(n, 1)
				}
			}
			function al(e) {
				const t = Ri(e),
					n = null !== t ? t.factory : Rn(e)
				if (null !== n) return n
				if (e instanceof T) throw new O(204, !1)
				if (e instanceof Function)
					return (function uM(e) {
						const t = e.length
						if (t > 0)
							throw (
								((function Mr(e, t) {
									const n = []
									for (let o = 0; o < e; o++) n.push(t)
									return n
								})(t, '?'),
								new O(204, !1))
							)
						const n = (function oC(e) {
							return (e && (e[Ai] || e[df])) || null
						})(e)
						return null !== n ? () => n.factory(e) : () => new e()
					})(e)
				throw new O(204, !1)
			}
			function Mo(e, t, n = !1) {
				return {factory: e, value: t, multi: n ? [] : void 0}
			}
			function cl(e, t) {
				for (const n of e) Array.isArray(n) ? cl(n, t) : n && Ja(n) ? cl(n.ɵproviders, t) : t(n)
			}
			const Ps = new T('AppId', {providedIn: 'root', factory: () => hM}),
				hM = 'ng',
				Tp = new T('Platform Initializer'),
				wo = new T('Platform ID', {providedIn: 'platform', factory: () => 'unknown'}),
				kp = new T('CSP nonce', {
					providedIn: 'root',
					factory: () => Sr().body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') || null,
				})
			let Ap = (e, t) => null
			function Np(e, t) {
				return Ap(e, t)
			}
			class wM {}
			class jp {}
			class OM {
				resolveComponentFactory(t) {
					throw (function PM(e) {
						const t = Error(`No component factory found for ${we(e)}.`)
						return (t.ngComponent = e), t
					})(t)
				}
			}
			let Is = (() => {
				class e {}
				return (e.NULL = new OM()), e
			})()
			function DM() {
				return Oo(Re(), C())
			}
			function Oo(e, t) {
				return new Cn(Xe(e, t))
			}
			let Cn = (() => {
				class e {
					constructor(n) {
						this.nativeElement = n
					}
				}
				return (e.__NG_ELEMENT_ID__ = DM), e
			})()
			class $p {}
			let IM = (() => {
				class e {}
				return (e.ɵprov = N({token: e, providedIn: 'root', factory: () => null})), e
			})()
			class ks {
				constructor(t) {
					;(this.full = t),
						(this.major = t.split('.')[0]),
						(this.minor = t.split('.')[1]),
						(this.patch = t.split('.').slice(2).join('.'))
				}
			}
			const TM = new ks('16.1.7'),
				yl = {}
			function Fr(e) {
				for (; e; ) {
					e[B] |= 64
					const t = Or(e)
					if (cc(e) && !t) return e
					e = t
				}
				return null
			}
			function bl(e) {
				return e.ngOriginalError
			}
			class zn {
				constructor() {
					this._console = console
				}
				handleError(t) {
					const n = this._findOriginalError(t)
					this._console.error('ERROR', t), n && this._console.error('ORIGINAL ERROR', n)
				}
				_findOriginalError(t) {
					let n = t && bl(t)
					for (; n && bl(n); ) n = bl(n)
					return n || null
				}
			}
			const Up = new T('', {providedIn: 'root', factory: () => !1})
			function nn(e) {
				return e instanceof Function ? e() : e
			}
			class Zp extends Lf {
				constructor() {
					super(...arguments), (this.consumerAllowSignalWrites = !1), (this._lView = null)
				}
				set lView(t) {
					this._lView = t
				}
				onConsumerDependencyMayHaveChanged() {
					Fr(this._lView)
				}
				onProducerUpdateValueVersion() {}
				get hasReadASignal() {
					return this.hasProducers
				}
				runInContext(t, n, o) {
					const r = Ie(this)
					this.trackingVersion++
					try {
						t(n, o)
					} finally {
						Ie(r)
					}
				}
				destroy() {
					this.trackingVersion++
				}
			}
			let As = null
			function Qp() {
				return (As ??= new Zp()), As
			}
			function Yp(e, t) {
				return e[t] ?? Qp()
			}
			function Kp(e, t) {
				const n = Qp()
				n.hasReadASignal && ((e[t] = As), (n.lView = e), (As = new Zp()))
			}
			const H = {}
			function M(e) {
				Jp(Q(), C(), Ue() + e, !1)
			}
			function Jp(e, t, n, o) {
				if (!o)
					if (3 == (3 & t[B])) {
						const i = e.preOrderCheckHooks
						null !== i && Yi(t, i, n)
					} else {
						const i = e.preOrderHooks
						null !== i && Ki(t, i, 0, n)
					}
				Nn(n)
			}
			function nh(e, t = null, n = null, o) {
				const r = oh(e, t, n, o)
				return r.resolveInjectorInitializers(), r
			}
			function oh(e, t = null, n = null, o, r = new Set()) {
				const i = [n || Y, sM(e)]
				return (o = o || ('object' == typeof e ? void 0 : we(e))), new sl(i, t || ws(), o || null, r)
			}
			let on = (() => {
				class e {
					static create(n, o) {
						if (Array.isArray(n)) return nh({name: ''}, o, n, '')
						{
							const r = n.name ?? ''
							return nh({name: r}, n.parent, n.providers, r)
						}
					}
				}
				return (
					(e.THROW_IF_NOT_FOUND = ur),
					(e.NULL = new wp()),
					(e.ɵprov = N({token: e, providedIn: 'any', factory: () => R(xp)})),
					(e.__NG_ELEMENT_ID__ = -1),
					e
				)
			})()
			function A(e, t = W.Default) {
				const n = C()
				return null === n ? R(e, t) : vg(Re(), n, j(e), t)
			}
			function Ns(e, t, n, o, r, i, s, a, c, l, u) {
				const d = t.blueprint.slice()
				return (
					(d[Pe] = r),
					(d[B] = 140 | o),
					(null !== l || (e && 2048 & e[B])) && (d[B] |= 2048),
					Gf(d),
					(d[he] = d[oo] = e),
					(d[ve] = n),
					(d[Tn] = s || (e && e[Tn])),
					(d[U] = a || (e && e[U])),
					(d[no] = c || (e && e[no]) || null),
					(d[Ne] = i),
					(d[_r] = (function lx() {
						return cx++
					})()),
					(d[Kt] = u),
					(d[If] = l),
					(d[ye] = 2 == t.type ? e[ye] : d),
					d
				)
			}
			function Eo(e, t, n, o, r) {
				let i = e.data[t]
				if (null === i)
					(i = (function Cl(e, t, n, o, r) {
						const i = Jf(),
							s = mc(),
							c = (e.data[t] = (function JM(e, t, n, o, r, i) {
								let s = t ? t.injectorIndex : -1,
									a = 0
								return (
									(function ao() {
										return null !== L.skipHydrationRootTNode
									})() && (a |= 128),
									{
										type: n,
										index: o,
										insertBeforeIndex: null,
										injectorIndex: s,
										directiveStart: -1,
										directiveEnd: -1,
										directiveStylingLast: -1,
										componentOffset: -1,
										propertyBindings: null,
										flags: a,
										providerIndexes: 0,
										value: r,
										attrs: i,
										mergedAttrs: null,
										localNames: null,
										initialInputs: void 0,
										inputs: null,
										outputs: null,
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
								)
							})(0, s ? i : i && i.parent, n, t, o, r))
						return (
							null === e.firstChild && (e.firstChild = c),
							null !== i &&
								(s
									? null == i.child && null !== c.parent && (i.child = c)
									: null === i.next && ((i.next = c), (c.prev = i))),
							c
						)
					})(e, t, n, o, r)),
						(function l1() {
							return L.lFrame.inI18n
						})() && (i.flags |= 32)
				else if (64 & i.type) {
					;(i.type = n), (i.value = o), (i.attrs = r)
					const s = (function yr() {
						const e = L.lFrame,
							t = e.currentTNode
						return e.isParent ? t : t.parent
					})()
					i.injectorIndex = null === s ? -1 : s.injectorIndex
				}
				return jt(i, !0), i
			}
			function jr(e, t, n, o) {
				if (0 === n) return -1
				const r = t.length
				for (let i = 0; i < n; i++) t.push(o), e.blueprint.push(o), e.data.push(null)
				return r
			}
			function ih(e, t, n, o, r) {
				const i = Yp(t, $i),
					s = Ue(),
					a = 2 & o
				try {
					if ((Nn(-1), a && t.length > Z && Jp(e, t, Z, !1), Ft(a ? 2 : 0, r), a)) i.runInContext(n, o, r)
					else {
						const l = Ie(null)
						try {
							n(o, r)
						} finally {
							Ie(l)
						}
					}
				} finally {
					a && null === t[$i] && Kp(t, $i), Nn(s), Ft(a ? 3 : 1, r)
				}
			}
			function xl(e, t, n) {
				if (ac(t)) {
					const o = Ie(null)
					try {
						const i = t.directiveEnd
						for (let s = t.directiveStart; s < i; s++) {
							const a = e.data[s]
							a.contentQueries && a.contentQueries(1, n[s], s)
						}
					} finally {
						Ie(o)
					}
				}
			}
			function Ml(e, t, n) {
				Kf() &&
					((function iw(e, t, n, o) {
						const r = n.directiveStart,
							i = n.directiveEnd
						kn(n) &&
							(function fw(e, t, n) {
								const o = Xe(t, e),
									r = sh(n)
								let s = 16
								n.signals ? (s = 4096) : n.onPush && (s = 64)
								const a = Ls(
									e,
									Ns(
										e,
										r,
										null,
										s,
										o,
										t,
										null,
										e[Tn].rendererFactory.createRenderer(o, n),
										null,
										null,
										null
									)
								)
								e[t.index] = a
							})(t, n, e.data[r + n.componentOffset]),
							e.firstCreatePass || ts(n, t),
							Fe(o, t)
						const s = n.initialInputs
						for (let a = r; a < i; a++) {
							const c = e.data[a],
								l = Ln(t, e, a, n)
							Fe(l, t),
								null !== s && gw(0, a - r, l, c, 0, s),
								Mt(c) && (st(n.index, t)[ve] = Ln(t, e, a, n))
						}
					})(e, t, n, Xe(n, t)),
					64 == (64 & n.flags) && dh(e, t, n))
			}
			function wl(e, t, n = Xe) {
				const o = t.localNames
				if (null !== o) {
					let r = t.index + 1
					for (let i = 0; i < o.length; i += 2) {
						const s = o[i + 1],
							a = -1 === s ? n(t, e) : e[s]
						e[r++] = a
					}
				}
			}
			function sh(e) {
				const t = e.tView
				return null === t || t.incompleteFirstPass
					? (e.tView = Pl(
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
							e.id
					  ))
					: t
			}
			function Pl(e, t, n, o, r, i, s, a, c, l, u) {
				const d = Z + o,
					p = d + r,
					m = (function GM(e, t) {
						const n = []
						for (let o = 0; o < t; o++) n.push(o < e ? null : H)
						return n
					})(d, p),
					v = 'function' == typeof l ? l() : l
				return (m[E] = {
					type: e,
					blueprint: m,
					template: n,
					queries: null,
					viewQuery: a,
					declTNode: t,
					data: m.slice().fill(null, d),
					bindingStartIndex: d,
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
					directiveRegistry: 'function' == typeof i ? i() : i,
					pipeRegistry: 'function' == typeof s ? s() : s,
					firstChild: null,
					schemas: c,
					consts: v,
					incompleteFirstPass: !1,
					ssrId: u,
				})
			}
			let ah = (e) => null
			function ch(e, t, n, o) {
				for (let r in e)
					if (e.hasOwnProperty(r)) {
						n = null === n ? {} : n
						const i = e[r]
						null === o ? lh(n, t, r, i) : o.hasOwnProperty(r) && lh(n, t, o[r], i)
					}
				return n
			}
			function lh(e, t, n, o) {
				e.hasOwnProperty(n) ? e[n].push(t, o) : (e[n] = [t, o])
			}
			function Ol(e, t, n, o) {
				if (Kf()) {
					const r = null === o ? null : {'': -1},
						i = (function aw(e, t) {
							const n = e.directiveRegistry
							let o = null,
								r = null
							if (n)
								for (let i = 0; i < n.length; i++) {
									const s = n[i]
									if (wf(t, s.selectors, !1))
										if ((o || (o = []), Mt(s)))
											if (null !== s.findHostDirectiveDefs) {
												const a = []
												;(r = r || new Map()),
													s.findHostDirectiveDefs(s, a, r),
													o.unshift(...a, s),
													Dl(e, t, a.length)
											} else o.unshift(s), Dl(e, t, 0)
										else (r = r || new Map()), s.findHostDirectiveDefs?.(s, o, r), o.push(s)
								}
							return null === o ? null : [o, r]
						})(e, n)
					let s, a
					null === i ? (s = a = null) : ([s, a] = i),
						null !== s && uh(e, t, n, s, r, a),
						r &&
							(function cw(e, t, n) {
								if (t) {
									const o = (e.localNames = [])
									for (let r = 0; r < t.length; r += 2) {
										const i = n[t[r + 1]]
										if (null == i) throw new O(-301, !1)
										o.push(t[r], i)
									}
								}
							})(n, o, r)
				}
				n.mergedAttrs = gr(n.mergedAttrs, n.attrs)
			}
			function uh(e, t, n, o, r, i) {
				for (let l = 0; l < o.length; l++) Ec(ts(n, t), e, o[l].type)
				!(function uw(e, t, n) {
					;(e.flags |= 1), (e.directiveStart = t), (e.directiveEnd = t + n), (e.providerIndexes = t)
				})(n, e.data.length, o.length)
				for (let l = 0; l < o.length; l++) {
					const u = o[l]
					u.providersResolver && u.providersResolver(u)
				}
				let s = !1,
					a = !1,
					c = jr(e, t, o.length, null)
				for (let l = 0; l < o.length; l++) {
					const u = o[l]
					;(n.mergedAttrs = gr(n.mergedAttrs, u.hostAttrs)),
						dw(e, n, t, c, u),
						lw(c, u, r),
						null !== u.contentQueries && (n.flags |= 4),
						(null !== u.hostBindings || null !== u.hostAttrs || 0 !== u.hostVars) && (n.flags |= 64)
					const d = u.type.prototype
					!s &&
						(d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
						((e.preOrderHooks ??= []).push(n.index), (s = !0)),
						!a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
						c++
				}
				!(function XM(e, t, n) {
					const r = t.directiveEnd,
						i = e.data,
						s = t.attrs,
						a = []
					let c = null,
						l = null
					for (let u = t.directiveStart; u < r; u++) {
						const d = i[u],
							p = n ? n.get(d) : null,
							v = p ? p.outputs : null
						;(c = ch(d.inputs, u, c, p ? p.inputs : null)), (l = ch(d.outputs, u, l, v))
						const y = null === c || null === s || Mf(t) ? null : pw(c, u, s)
						a.push(y)
					}
					null !== c &&
						(c.hasOwnProperty('class') && (t.flags |= 8), c.hasOwnProperty('style') && (t.flags |= 16)),
						(t.initialInputs = a),
						(t.inputs = c),
						(t.outputs = l)
				})(e, n, i)
			}
			function dh(e, t, n) {
				const o = n.directiveStart,
					r = n.directiveEnd,
					i = n.index,
					s = (function d1() {
						return L.lFrame.currentDirectiveIndex
					})()
				try {
					Nn(i)
					for (let a = o; a < r; a++) {
						const c = e.data[a],
							l = t[a]
						vc(a), (null !== c.hostBindings || 0 !== c.hostVars || null !== c.hostAttrs) && sw(c, l)
					}
				} finally {
					Nn(-1), vc(s)
				}
			}
			function sw(e, t) {
				null !== e.hostBindings && e.hostBindings(1, t)
			}
			function Dl(e, t, n) {
				;(t.componentOffset = n), (e.components ??= []).push(t.index)
			}
			function lw(e, t, n) {
				if (n) {
					if (t.exportAs) for (let o = 0; o < t.exportAs.length; o++) n[t.exportAs[o]] = e
					Mt(t) && (n[''] = e)
				}
			}
			function dw(e, t, n, o, r) {
				e.data[o] = r
				const i = r.factory || (r.factory = Rn(r.type)),
					s = new br(i, Mt(r), A)
				;(e.blueprint[o] = s),
					(n[o] = s),
					(function ow(e, t, n, o, r) {
						const i = r.hostBindings
						if (i) {
							let s = e.hostBindingOpCodes
							null === s && (s = e.hostBindingOpCodes = [])
							const a = ~t.index
							;(function rw(e) {
								let t = e.length
								for (; t > 0; ) {
									const n = e[--t]
									if ('number' == typeof n && n < 0) return n
								}
								return 0
							})(s) != a && s.push(a),
								s.push(n, o, i)
						}
					})(e, t, o, jr(e, n, r.hostVars, H), r)
			}
			function $t(e, t, n, o, r, i) {
				const s = Xe(e, t)
				!(function El(e, t, n, o, r, i, s) {
					if (null == i) e.removeAttribute(t, r, n)
					else {
						const a = null == s ? $(i) : s(i, o || '', r)
						e.setAttribute(t, r, a, n)
					}
				})(t[U], s, i, e.value, n, o, r)
			}
			function gw(e, t, n, o, r, i) {
				const s = i[t]
				if (null !== s) for (let a = 0; a < s.length; ) fh(o, n, s[a++], s[a++], s[a++])
			}
			function fh(e, t, n, o, r) {
				const i = Ie(null)
				try {
					const s = e.inputTransforms
					null !== s && s.hasOwnProperty(o) && (r = s[o].call(t, r)),
						null !== e.setInput ? e.setInput(t, r, n, o) : (t[o] = r)
				} finally {
					Ie(i)
				}
			}
			function pw(e, t, n) {
				let o = null,
					r = 0
				for (; r < n.length; ) {
					const i = n[r]
					if (0 !== i)
						if (5 !== i) {
							if ('number' == typeof i) break
							if (e.hasOwnProperty(i)) {
								null === o && (o = [])
								const s = e[i]
								for (let a = 0; a < s.length; a += 2)
									if (s[a] === t) {
										o.push(i, s[a + 1], n[r + 1])
										break
									}
							}
							r += 2
						} else r += 2
					else r += 4
				}
				return o
			}
			function gh(e, t, n, o) {
				return [e, !0, !1, t, null, 0, o, n, null, null, null]
			}
			function ph(e, t) {
				const n = e.contentQueries
				if (null !== n)
					for (let o = 0; o < n.length; o += 2) {
						const i = n[o + 1]
						if (-1 !== i) {
							const s = e.data[i]
							bc(n[o]), s.contentQueries(2, t[i], i)
						}
					}
			}
			function Ls(e, t) {
				return e[hr] ? (e[Sf][xt] = t) : (e[hr] = t), (e[Sf] = t), t
			}
			function Sl(e, t, n) {
				bc(0)
				const o = Ie(null)
				try {
					t(e, n)
				} finally {
					Ie(o)
				}
			}
			function vh(e, t) {
				const n = e[no],
					o = n ? n.get(zn, null) : null
				o && o.handleError(t)
			}
			function Il(e, t, n, o, r) {
				for (let i = 0; i < n.length; ) {
					const s = n[i++],
						a = n[i++]
					fh(e.data[s], t[s], o, a, r)
				}
			}
			function hw(e, t) {
				const n = st(t, e),
					o = n[E]
				!(function mw(e, t) {
					for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n])
				})(o, n)
				const r = n[Pe]
				null !== r && null === n[Kt] && (n[Kt] = Np(r, n[no])), Tl(o, n, n[ve])
			}
			function Tl(e, t, n) {
				Cc(t)
				try {
					const o = e.viewQuery
					null !== o && Sl(1, o, n)
					const r = e.template
					null !== r && ih(e, t, r, 1, n),
						e.firstCreatePass && (e.firstCreatePass = !1),
						e.staticContentQueries && ph(e, t),
						e.staticViewQueries && Sl(2, e.viewQuery, n)
					const i = e.components
					null !== i &&
						(function _w(e, t) {
							for (let n = 0; n < t.length; n++) hw(e, t[n])
						})(t, i)
				} catch (o) {
					throw (e.firstCreatePass && ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)), o)
				} finally {
					;(t[B] &= -5), xc()
				}
			}
			let yh = (() => {
				class e {
					constructor() {
						;(this.all = new Set()), (this.queue = new Map())
					}
					create(n, o, r) {
						const i = typeof Zone > 'u' ? null : Zone.current,
							s = new VC(
								n,
								(l) => {
									this.all.has(l) && this.queue.set(l, i)
								},
								r
							)
						let a
						this.all.add(s), s.notify()
						const c = () => {
							s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s)
						}
						return (a = o?.onDestroy(c)), {destroy: c}
					}
					flush() {
						if (0 !== this.queue.size)
							for (const [n, o] of this.queue) this.queue.delete(n), o ? o.run(() => n.run()) : n.run()
					}
					get isQueueEmpty() {
						return 0 === this.queue.size
					}
				}
				return (e.ɵprov = N({token: e, providedIn: 'root', factory: () => new e()})), e
			})()
			function Fs(e, t, n) {
				let o = n ? e.styles : null,
					r = n ? e.classes : null,
					i = 0
				if (null !== t)
					for (let s = 0; s < t.length; s++) {
						const a = t[s]
						'number' == typeof a
							? (i = a)
							: 1 == i
							? (r = Qa(r, a))
							: 2 == i && (o = Qa(o, a + ': ' + t[++s] + ';'))
					}
				n ? (e.styles = o) : (e.stylesWithoutHost = o), n ? (e.classes = r) : (e.classesWithoutHost = r)
			}
			function zr(e, t, n, o, r = !1) {
				for (; null !== n; ) {
					const i = t[n.index]
					if ((null !== i && o.push(fe(i)), Je(i))) {
						for (let a = Le; a < i.length; a++) {
							const c = i[a],
								l = c[E].firstChild
							null !== l && zr(c[E], c, l, o)
						}
						i[Nt] !== i[Pe] && o.push(i[Nt])
					}
					const s = n.type
					if (8 & s) zr(e, t, n.child, o)
					else if (32 & s) {
						const a = $c(n, t)
						let c
						for (; (c = a()); ) o.push(c)
					} else if (16 & s) {
						const a = ip(t, n)
						if (Array.isArray(a)) o.push(...a)
						else {
							const c = Or(t[ye])
							zr(c[E], c, a, o, !0)
						}
					}
					n = r ? n.projectionNext : n.next
				}
				return o
			}
			function js(e, t, n, o = !0) {
				const r = t[Tn].rendererFactory
				r.begin && r.begin()
				try {
					bh(e, t, e.template, n)
				} catch (s) {
					throw (o && vh(t, s), s)
				} finally {
					r.end && r.end(), t[Tn].effectManager?.flush()
				}
			}
			function bh(e, t, n, o) {
				const r = t[B]
				if (256 != (256 & r)) {
					t[Tn].effectManager?.flush(), Cc(t)
					try {
						Gf(t),
							(function eg(e) {
								return (L.lFrame.bindingIndex = e)
							})(e.bindingStartIndex),
							null !== n && ih(e, t, n, 2, o)
						const s = 3 == (3 & r)
						if (s) {
							const l = e.preOrderCheckHooks
							null !== l && Yi(t, l, null)
						} else {
							const l = e.preOrderHooks
							null !== l && Ki(t, l, 0, null), Mc(t, 0)
						}
						if (
							((function xw(e) {
								for (let t = Gg(e); null !== t; t = Wg(t)) {
									if (!t[Tf]) continue
									const n = t[io]
									for (let o = 0; o < n.length; o++) {
										JC(n[o])
									}
								}
							})(t),
							Ch(t, 2),
							null !== e.contentQueries && ph(e, t),
							s)
						) {
							const l = e.contentCheckHooks
							null !== l && Yi(t, l)
						} else {
							const l = e.contentHooks
							null !== l && Ki(t, l, 1), Mc(t, 1)
						}
						!(function qM(e, t) {
							const n = e.hostBindingOpCodes
							if (null === n) return
							const o = Yp(t, Vi)
							try {
								for (let r = 0; r < n.length; r++) {
									const i = n[r]
									if (i < 0) Nn(~i)
									else {
										const s = i,
											a = n[++r],
											c = n[++r]
										u1(a, s), o.runInContext(c, 2, t[s])
									}
								}
							} finally {
								null === t[Vi] && Kp(t, Vi), Nn(-1)
							}
						})(e, t)
						const a = e.components
						null !== a && Mh(t, a, 0)
						const c = e.viewQuery
						if ((null !== c && Sl(2, c, o), s)) {
							const l = e.viewCheckHooks
							null !== l && Yi(t, l)
						} else {
							const l = e.viewHooks
							null !== l && Ki(t, l, 2), Mc(t, 2)
						}
						!0 === e.firstUpdatePass && (e.firstUpdatePass = !1), (t[B] &= -73), Wf(t)
					} finally {
						xc()
					}
				}
			}
			function Ch(e, t) {
				for (let n = Gg(e); null !== n; n = Wg(n)) for (let o = Le; o < n.length; o++) xh(n[o], t)
			}
			function Mw(e, t, n) {
				xh(st(t, e), n)
			}
			function xh(e, t) {
				if (
					!(function YC(e) {
						return 128 == (128 & e[B])
					})(e)
				)
					return
				const n = e[E]
				if ((80 & e[B] && 0 === t) || 1024 & e[B] || 2 === t) bh(n, e, n.template, e[ve])
				else if (e[pr] > 0) {
					Ch(e, 1)
					const r = e[E].components
					null !== r && Mh(e, r, 1)
				}
			}
			function Mh(e, t, n) {
				for (let o = 0; o < t.length; o++) Mw(e, t[o], n)
			}
			class $r {
				get rootNodes() {
					const t = this._lView,
						n = t[E]
					return zr(n, t, n.firstChild, [])
				}
				constructor(t, n) {
					;(this._lView = t),
						(this._cdRefInjectingView = n),
						(this._appRef = null),
						(this._attachedToViewContainer = !1)
				}
				get context() {
					return this._lView[ve]
				}
				set context(t) {
					this._lView[ve] = t
				}
				get destroyed() {
					return 256 == (256 & this._lView[B])
				}
				destroy() {
					if (this._appRef) this._appRef.detachView(this)
					else if (this._attachedToViewContainer) {
						const t = this._lView[he]
						if (Je(t)) {
							const n = t[8],
								o = n ? n.indexOf(this) : -1
							o > -1 && (Bc(t, o), rs(n, o))
						}
						this._attachedToViewContainer = !1
					}
					Kg(this._lView[E], this._lView)
				}
				onDestroy(t) {
					!(function Qf(e, t) {
						if (256 == (256 & e[B])) throw new O(911, !1)
						null === e[mn] && (e[mn] = []), e[mn].push(t)
					})(this._lView, t)
				}
				markForCheck() {
					Fr(this._cdRefInjectingView || this._lView)
				}
				detach() {
					this._lView[B] &= -129
				}
				reattach() {
					this._lView[B] |= 128
				}
				detectChanges() {
					js(this._lView[E], this._lView, this.context)
				}
				checkNoChanges() {}
				attachToViewContainerRef() {
					if (this._appRef) throw new O(902, !1)
					this._attachedToViewContainer = !0
				}
				detachFromAppRef() {
					;(this._appRef = null),
						(function Mx(e, t) {
							Er(e, t, t[U], 2, null, null)
						})(this._lView[E], this._lView)
				}
				attachToAppRef(t) {
					if (this._attachedToViewContainer) throw new O(902, !1)
					this._appRef = t
				}
			}
			class ww extends $r {
				constructor(t) {
					super(t), (this._view = t)
				}
				detectChanges() {
					const t = this._view
					js(t[E], t, t[ve], !1)
				}
				checkNoChanges() {}
				get context() {
					return null
				}
			}
			class wh extends Is {
				constructor(t) {
					super(), (this.ngModule = t)
				}
				resolveComponentFactory(t) {
					const n = J(t)
					return new Vr(n, this.ngModule)
				}
			}
			function Ph(e) {
				const t = []
				for (let n in e) e.hasOwnProperty(n) && t.push({propName: e[n], templateName: n})
				return t
			}
			class Ow {
				constructor(t, n) {
					;(this.injector = t), (this.parentInjector = n)
				}
				get(t, n, o) {
					o = Li(o)
					const r = this.injector.get(t, yl, o)
					return r !== yl || n === yl ? r : this.parentInjector.get(t, n, o)
				}
			}
			class Vr extends jp {
				get inputs() {
					const t = this.componentDef,
						n = t.inputTransforms,
						o = Ph(t.inputs)
					if (null !== n) for (const r of o) n.hasOwnProperty(r.propName) && (r.transform = n[r.propName])
					return o
				}
				get outputs() {
					return Ph(this.componentDef.outputs)
				}
				constructor(t, n) {
					super(),
						(this.componentDef = t),
						(this.ngModule = n),
						(this.componentType = t.type),
						(this.selector = (function xC(e) {
							return e.map(CC).join(',')
						})(t.selectors)),
						(this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : []),
						(this.isBoundToModule = !!n)
				}
				create(t, n, o, r) {
					let i = (r = r || this.ngModule) instanceof tn ? r : r?.injector
					i &&
						null !== this.componentDef.getStandaloneInjector &&
						(i = this.componentDef.getStandaloneInjector(i) || i)
					const s = i ? new Ow(t, i) : t,
						a = s.get($p, null)
					if (null === a) throw new O(407, !1)
					const u = {rendererFactory: a, sanitizer: s.get(IM, null), effectManager: s.get(yh, null)},
						d = a.createRenderer(null, this.componentDef),
						p = this.componentDef.selectors[0][0] || 'div',
						m = o
							? (function WM(e, t, n, o) {
									const i = o.get(Up, !1) || n === bt.ShadowDom,
										s = e.selectRootElement(t, i)
									return (
										(function ZM(e) {
											ah(e)
										})(s),
										s
									)
							  })(d, o, this.componentDef.encapsulation, s)
							: hs(
									d,
									p,
									(function Pw(e) {
										const t = e.toLowerCase()
										return 'svg' === t ? 'svg' : 'math' === t ? 'math' : null
									})(p)
							  ),
						x = this.componentDef.signals ? 4608 : this.componentDef.onPush ? 576 : 528,
						P = Pl(0, null, null, 1, 0, null, null, null, null, null, null),
						b = Ns(null, P, null, x, null, null, u, d, s, null, null)
					let k, V
					Cc(b)
					try {
						const G = this.componentDef
						let $e,
							Fa = null
						G.findHostDirectiveDefs
							? (($e = []), (Fa = new Map()), G.findHostDirectiveDefs(G, $e, Fa), $e.push(G))
							: ($e = [G])
						const ZN = (function Ew(e, t) {
								const n = e[E],
									o = Z
								return (e[o] = t), Eo(n, o, 2, '#host', null)
							})(b, m),
							QN = (function Sw(e, t, n, o, r, i, s) {
								const a = r[E]
								!(function Iw(e, t, n, o) {
									for (const r of e) t.mergedAttrs = gr(t.mergedAttrs, r.hostAttrs)
									null !== t.mergedAttrs && (Fs(t, t.mergedAttrs, !0), null !== n && lp(o, n, t))
								})(o, e, t, s)
								let c = null
								null !== t && (c = Np(t, r[no]))
								const l = i.rendererFactory.createRenderer(t, n)
								let u = 16
								n.signals ? (u = 4096) : n.onPush && (u = 64)
								const d = Ns(r, sh(n), null, u, r[e.index], e, i, l, null, null, c)
								return a.firstCreatePass && Dl(a, e, o.length - 1), Ls(r, d), (r[e.index] = d)
							})(ZN, m, G, $e, b, u, d)
						;(V = qf(P, Z)),
							m &&
								(function kw(e, t, n, o) {
									if (o) ic(e, n, ['ng-version', TM.full])
									else {
										const {attrs: r, classes: i} = (function MC(e) {
											const t = [],
												n = []
											let o = 1,
												r = 2
											for (; o < e.length; ) {
												let i = e[o]
												if ('string' == typeof i)
													2 === r ? '' !== i && t.push(i, e[++o]) : 8 === r && n.push(i)
												else {
													if (!Ct(r)) break
													r = i
												}
												o++
											}
											return {attrs: t, classes: n}
										})(t.selectors[0])
										r && ic(e, n, r), i && i.length > 0 && cp(e, n, i.join(' '))
									}
								})(d, G, m, o),
							void 0 !== n &&
								(function Rw(e, t, n) {
									const o = (e.projection = [])
									for (let r = 0; r < t.length; r++) {
										const i = n[r]
										o.push(null != i ? Array.from(i) : null)
									}
								})(V, this.ngContentSelectors, n),
							(k = (function Tw(e, t, n, o, r, i) {
								const s = Re(),
									a = r[E],
									c = Xe(s, r)
								uh(a, r, s, n, null, o)
								for (let u = 0; u < n.length; u++) Fe(Ln(r, a, s.directiveStart + u, s), r)
								dh(a, r, s), c && Fe(c, r)
								const l = Ln(r, a, s.directiveStart + s.componentOffset, s)
								if (((e[ve] = r[ve] = l), null !== i)) for (const u of i) u(l, t)
								return xl(a, s, e), l
							})(QN, G, $e, Fa, b, [Aw])),
							Tl(P, b, null)
					} finally {
						xc()
					}
					return new Dw(this.componentType, k, Oo(V, b), b, V)
				}
			}
			class Dw extends wM {
				constructor(t, n, o, r, i) {
					super(),
						(this.location = o),
						(this._rootLView = r),
						(this._tNode = i),
						(this.previousInputValues = null),
						(this.instance = n),
						(this.hostView = this.changeDetectorRef = new ww(r)),
						(this.componentType = t)
				}
				setInput(t, n) {
					const o = this._tNode.inputs
					let r
					if (null !== o && (r = o[t])) {
						if (
							((this.previousInputValues ??= new Map()),
							this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n))
						)
							return
						const i = this._rootLView
						Il(i[E], i, r, t, n), this.previousInputValues.set(t, n), Fr(st(this._tNode.index, i))
					}
				}
				get injector() {
					return new uo(this._tNode, this._rootLView)
				}
				destroy() {
					this.hostView.destroy()
				}
				onDestroy(t) {
					this.hostView.onDestroy(t)
				}
			}
			function Aw() {
				const e = Re()
				Qi(C()[E], e)
			}
			function $s(e) {
				return (
					!!(function kl(e) {
						return null !== e && ('function' == typeof e || 'object' == typeof e)
					})(e) &&
					(Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
				)
			}
			function je(e, t, n) {
				return !Object.is(e[t], n) && ((e[t] = n), !0)
			}
			function Bs(e, t, n, o) {
				const r = C()
				return je(r, co(), t) && (Q(), $t(me(), r, e, t, n, o)), Bs
			}
			function Io(e, t, n, o) {
				return je(e, co(), n) ? t + $(n) + o : H
			}
			function I(e, t, n, o, r, i, s, a) {
				const c = C(),
					l = Q(),
					u = e + Z,
					d = l.firstCreatePass
						? (function lP(e, t, n, o, r, i, s, a, c) {
								const l = t.consts,
									u = Eo(t, e, 4, s || null, _n(l, a))
								Ol(t, n, u, _n(l, c)), Qi(t, u)
								const d = (u.tView = Pl(
									2,
									u,
									o,
									r,
									i,
									t.directiveRegistry,
									t.pipeRegistry,
									null,
									t.schemas,
									l,
									null
								))
								return (
									null !== t.queries &&
										(t.queries.template(t, u), (d.queries = t.queries.embeddedTView(u))),
									u
								)
						  })(u, l, c, t, n, o, r, i, s)
						: l.data[u]
				jt(d, !1)
				const p = Hh(l, c, d, e)
				Zi() && _s(l, c, p, d),
					Fe(p, c),
					Ls(c, (c[u] = gh(p, c, p, d))),
					Ui(d) && Ml(l, c, d),
					null != s && wl(c, d, a)
			}
			let Hh = function qh(e, t, n, o) {
				return vn(!0), t[U].createComment('')
			}
			function w(e, t, n) {
				const o = C()
				return (
					je(o, co(), t) &&
						(function ct(e, t, n, o, r, i, s, a) {
							const c = Xe(t, n)
							let u,
								l = t.inputs
							!a && null != l && (u = l[o])
								? (Il(e, n, u, o, r),
								  kn(t) &&
										(function tw(e, t) {
											const n = st(t, e)
											16 & n[B] || (n[B] |= 64)
										})(n, t.index))
								: 3 & t.type &&
								  ((o = (function ew(e) {
										return 'class' === e
											? 'className'
											: 'for' === e
											? 'htmlFor'
											: 'formaction' === e
											? 'formAction'
											: 'innerHtml' === e
											? 'innerHTML'
											: 'readonly' === e
											? 'readOnly'
											: 'tabindex' === e
											? 'tabIndex'
											: e
								  })(o)),
								  (r = null != s ? s(r, t.value || '', o) : r),
								  i.setProperty(c, o, r))
						})(Q(), me(), o, e, t, o[U], n, !1),
					w
				)
			}
			function jl(e, t, n, o, r) {
				const s = r ? 'class' : 'style'
				Il(e, n, t.inputs[s], s, o)
			}
			function g(e, t, n, o) {
				const r = C(),
					i = Q(),
					s = Z + e,
					a = r[U],
					c = i.firstCreatePass
						? (function pP(e, t, n, o, r, i) {
								const s = t.consts,
									c = Eo(t, e, 2, o, _n(s, r))
								return (
									Ol(t, n, c, _n(s, i)),
									null !== c.attrs && Fs(c, c.attrs, !1),
									null !== c.mergedAttrs && Fs(c, c.mergedAttrs, !0),
									null !== t.queries && t.queries.elementStart(t, c),
									c
								)
						  })(s, i, r, t, n, o)
						: i.data[s],
					l = Gh(i, r, c, a, t, e)
				r[s] = l
				const u = Ui(c)
				return (
					jt(c, !0),
					lp(a, l, c),
					32 != (32 & c.flags) && Zi() && _s(i, r, l, c),
					0 ===
						(function e1() {
							return L.lFrame.elementDepthCount
						})() && Fe(l, r),
					(function t1() {
						L.lFrame.elementDepthCount++
					})(),
					u && (Ml(i, r, c), xl(i, c, r)),
					null !== o && wl(r, c),
					g
				)
			}
			function f() {
				let e = Re()
				mc() ? _c() : ((e = e.parent), jt(e, !1))
				const t = e
				;(function o1(e) {
					return L.skipHydrationRootTNode === e
				})(t) &&
					(function a1() {
						L.skipHydrationRootTNode = null
					})(),
					(function n1() {
						L.lFrame.elementDepthCount--
					})()
				const n = Q()
				return (
					n.firstCreatePass && (Qi(n, e), ac(e) && n.queries.elementEnd(e)),
					null != t.classesWithoutHost &&
						(function x1(e) {
							return 0 != (8 & e.flags)
						})(t) &&
						jl(n, t, C(), t.classesWithoutHost, !0),
					null != t.stylesWithoutHost &&
						(function M1(e) {
							return 0 != (16 & e.flags)
						})(t) &&
						jl(n, t, C(), t.stylesWithoutHost, !1),
					f
				)
			}
			function _(e, t, n, o) {
				return g(e, t, n, o), f(), _
			}
			let Gh = (e, t, n, o, r, i) => (
				vn(!0),
				hs(
					o,
					r,
					(function cg() {
						return L.lFrame.currentNamespace
					})()
				)
			)
			function Gr(e, t, n) {
				const o = C(),
					r = Q(),
					i = e + Z,
					s = r.firstCreatePass
						? (function _P(e, t, n, o, r) {
								const i = t.consts,
									s = _n(i, o),
									a = Eo(t, e, 8, 'ng-container', s)
								return (
									null !== s && Fs(a, s, !0),
									Ol(t, n, a, _n(i, r)),
									null !== t.queries && t.queries.elementStart(t, a),
									a
								)
						  })(i, r, o, t, n)
						: r.data[i]
				jt(s, !0)
				const a = Zh(r, o, s, e)
				return (
					(o[i] = a),
					Zi() && _s(r, o, a, s),
					Fe(a, o),
					Ui(s) && (Ml(r, o, s), xl(r, s, o)),
					null != n && wl(o, s),
					Gr
				)
			}
			function Wr() {
				let e = Re()
				const t = Q()
				return (
					mc() ? _c() : ((e = e.parent), jt(e, !1)),
					t.firstCreatePass && (Qi(t, e), ac(e) && t.queries.elementEnd(e)),
					Wr
				)
			}
			let Zh = (e, t, n, o) => (vn(!0), Vc(t[U], ''))
			function zl() {
				return C()
			}
			function Gs(e) {
				return !!e && 'function' == typeof e.then
			}
			function Qh(e) {
				return !!e && 'function' == typeof e.subscribe
			}
			function Zr(e, t, n, o) {
				const r = C(),
					i = Q(),
					s = Re()
				return (
					(function Kh(e, t, n, o, r, i, s) {
						const a = Ui(o),
							l =
								e.firstCreatePass &&
								(function mh(e) {
									return e.cleanup || (e.cleanup = [])
								})(e),
							u = t[ve],
							d = (function hh(e) {
								return e[to] || (e[to] = [])
							})(t)
						let p = !0
						if (3 & o.type || s) {
							const y = Xe(o, t),
								x = s ? s(y) : y,
								P = d.length,
								b = s ? (V) => s(fe(V[o.index])) : o.index
							let k = null
							if (
								(!s &&
									a &&
									(k = (function bP(e, t, n, o) {
										const r = e.cleanup
										if (null != r)
											for (let i = 0; i < r.length - 1; i += 2) {
												const s = r[i]
												if (s === n && r[i + 1] === o) {
													const a = t[to],
														c = r[i + 2]
													return a.length > c ? a[c] : null
												}
												'string' == typeof s && (i += 2)
											}
										return null
									})(e, t, r, o.index)),
								null !== k)
							)
								((k.__ngLastListenerFn__ || k).__ngNextListenerFn__ = i),
									(k.__ngLastListenerFn__ = i),
									(p = !1)
							else {
								i = Xh(o, t, u, i, !1)
								const V = n.listen(x, r, i)
								d.push(i, V), l && l.push(r, b, P, P + 1)
							}
						} else i = Xh(o, t, u, i, !1)
						const m = o.outputs
						let v
						if (p && null !== m && (v = m[r])) {
							const y = v.length
							if (y)
								for (let x = 0; x < y; x += 2) {
									const G = t[v[x]][v[x + 1]].subscribe(i),
										$e = d.length
									d.push(i, G), l && l.push(r, o.index, $e, -($e + 1))
								}
						}
					})(i, r, r[U], s, e, t, o),
					Zr
				)
			}
			function Jh(e, t, n, o) {
				try {
					return Ft(6, t, n), !1 !== n(o)
				} catch (r) {
					return vh(e, r), !1
				} finally {
					Ft(7, t, n)
				}
			}
			function Xh(e, t, n, o, r) {
				return function i(s) {
					if (s === Function) return o
					Fr(e.componentOffset > -1 ? st(e.index, t) : t)
					let c = Jh(t, n, o, s),
						l = i.__ngNextListenerFn__
					for (; l; ) (c = Jh(t, n, l, s) && c), (l = l.__ngNextListenerFn__)
					return r && !1 === c && s.preventDefault(), c
				}
			}
			function z(e = 1) {
				return (function g1(e) {
					return (L.lFrame.contextLView = (function p1(e, t) {
						for (; e > 0; ) (t = t[oo]), e--
						return t
					})(e, L.lFrame.contextLView))[ve]
				})(e)
			}
			function Ws(e, t) {
				return (e << 17) | (t << 2)
			}
			function xn(e) {
				return (e >> 17) & 32767
			}
			function Vl(e) {
				return 2 | e
			}
			function Vn(e) {
				return (131068 & e) >> 2
			}
			function Bl(e, t) {
				return (-131069 & e) | (t << 2)
			}
			function Ul(e) {
				return 1 | e
			}
			function lm(e, t, n, o, r) {
				const i = e[n + 1],
					s = null === t
				let a = o ? xn(i) : Vn(i),
					c = !1
				for (; 0 !== a && (!1 === c || s); ) {
					const u = e[a + 1]
					SP(e[a], t) && ((c = !0), (e[a + 1] = o ? Ul(u) : Vl(u))), (a = o ? xn(u) : Vn(u))
				}
				c && (e[n + 1] = o ? Vl(i) : Ul(i))
			}
			function SP(e, t) {
				return (
					null === e ||
					null == t ||
					(Array.isArray(e) ? e[1] : e) === t ||
					(!(!Array.isArray(e) || 'string' != typeof t) && _o(e, t) >= 0)
				)
			}
			const De = {textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0}
			function um(e) {
				return e.substring(De.key, De.keyEnd)
			}
			function dm(e, t) {
				const n = De.textEnd
				return n === t
					? -1
					: ((t = De.keyEnd =
							(function RP(e, t, n) {
								for (; t < n && e.charCodeAt(t) > 32; ) t++
								return t
							})(e, (De.key = t), n)),
					  jo(e, t, n))
			}
			function jo(e, t, n) {
				for (; t < n && e.charCodeAt(t) <= 32; ) t++
				return t
			}
			function Ut(e, t) {
				for (
					let n = (function TP(e) {
						return (
							(function gm(e) {
								;(De.key = 0),
									(De.keyEnd = 0),
									(De.value = 0),
									(De.valueEnd = 0),
									(De.textEnd = e.length)
							})(e),
							dm(e, jo(e, 0, De.textEnd))
						)
					})(t);
					n >= 0;
					n = dm(t, n)
				)
					at(e, um(t), !0)
			}
			function Pt(e, t, n, o) {
				const r = Q(),
					i = (function Xt(e) {
						const t = L.lFrame,
							n = t.bindingIndex
						return (t.bindingIndex = t.bindingIndex + e), n
					})(2)
				r.firstUpdatePass &&
					(function ym(e, t, n, o) {
						const r = e.data
						if (null === r[n + 1]) {
							const i = r[Ue()],
								s = vm(e, n)
							Mm(i, o) && null === t && !s && (t = !1),
								(t = (function jP(e, t, n, o) {
									const r = (function yc(e) {
										const t = L.lFrame.currentDirectiveIndex
										return -1 === t ? null : e[t]
									})(e)
									let i = o ? t.residualClasses : t.residualStyles
									if (null === r)
										0 === (o ? t.classBindings : t.styleBindings) &&
											((n = Qr((n = Hl(null, e, t, n, o)), t.attrs, o)), (i = null))
									else {
										const s = t.directiveStylingLast
										if (-1 === s || e[s] !== r)
											if (((n = Hl(r, e, t, n, o)), null === i)) {
												let c = (function zP(e, t, n) {
													const o = n ? t.classBindings : t.styleBindings
													if (0 !== Vn(o)) return e[xn(o)]
												})(e, t, o)
												void 0 !== c &&
													Array.isArray(c) &&
													((c = Hl(null, e, t, c[1], o)),
													(c = Qr(c, t.attrs, o)),
													(function $P(e, t, n, o) {
														e[xn(n ? t.classBindings : t.styleBindings)] = o
													})(e, t, o, c))
											} else
												i = (function VP(e, t, n) {
													let o
													const r = t.directiveEnd
													for (let i = 1 + t.directiveStylingLast; i < r; i++)
														o = Qr(o, e[i].hostAttrs, n)
													return Qr(o, t.attrs, n)
												})(e, t, o)
									}
									return void 0 !== i && (o ? (t.residualClasses = i) : (t.residualStyles = i)), n
								})(r, i, t, o)),
								(function DP(e, t, n, o, r, i) {
									let s = i ? t.classBindings : t.styleBindings,
										a = xn(s),
										c = Vn(s)
									e[o] = n
									let u,
										l = !1
									if (
										(Array.isArray(n)
											? ((u = n[1]), (null === u || _o(n, u) > 0) && (l = !0))
											: (u = n),
										r)
									)
										if (0 !== c) {
											const p = xn(e[a + 1])
											;(e[o + 1] = Ws(p, a)),
												0 !== p && (e[p + 1] = Bl(e[p + 1], o)),
												(e[a + 1] = (function PP(e, t) {
													return (131071 & e) | (t << 17)
												})(e[a + 1], o))
										} else (e[o + 1] = Ws(a, 0)), 0 !== a && (e[a + 1] = Bl(e[a + 1], o)), (a = o)
									else
										(e[o + 1] = Ws(c, 0)), 0 === a ? (a = o) : (e[c + 1] = Bl(e[c + 1], o)), (c = o)
									l && (e[o + 1] = Vl(e[o + 1])),
										lm(e, u, o, !0),
										lm(e, u, o, !1),
										(function EP(e, t, n, o, r) {
											const i = r ? e.residualClasses : e.residualStyles
											null != i &&
												'string' == typeof t &&
												_o(i, t) >= 0 &&
												(n[o + 1] = Ul(n[o + 1]))
										})(t, u, e, o, i),
										(s = Ws(a, c)),
										i ? (t.classBindings = s) : (t.styleBindings = s)
								})(r, i, t, n, s, o)
						}
					})(r, null, i, o)
				const s = C()
				if (n !== H && je(s, i, n)) {
					const a = r.data[Ue()]
					if (Mm(a, o) && !vm(r, i)) {
						let c = o ? a.classesWithoutHost : a.stylesWithoutHost
						null !== c && (n = Qa(c, n || '')), jl(r, a, s, n, o)
					} else
						!(function HP(e, t, n, o, r, i, s, a) {
							r === H && (r = Y)
							let c = 0,
								l = 0,
								u = 0 < r.length ? r[0] : null,
								d = 0 < i.length ? i[0] : null
							for (; null !== u || null !== d; ) {
								const p = c < r.length ? r[c + 1] : void 0,
									m = l < i.length ? i[l + 1] : void 0
								let y,
									v = null
								u === d
									? ((c += 2), (l += 2), p !== m && ((v = d), (y = m)))
									: null === d || (null !== u && u < d)
									? ((c += 2), (v = u))
									: ((l += 2), (v = d), (y = m)),
									null !== v && Cm(e, t, n, o, v, y, s, a),
									(u = c < r.length ? r[c] : null),
									(d = l < i.length ? i[l] : null)
							}
						})(
							r,
							a,
							s,
							s[U],
							s[i + 1],
							(s[i + 1] = (function BP(e, t, n) {
								if (null == n || '' === n) return Y
								const o = [],
									r = bn(n)
								if (Array.isArray(r)) for (let i = 0; i < r.length; i++) e(o, r[i], !0)
								else if ('object' == typeof r) for (const i in r) r.hasOwnProperty(i) && e(o, i, r[i])
								else 'string' == typeof r && t(o, r)
								return o
							})(e, t, n)),
							o,
							i
						)
				}
			}
			function vm(e, t) {
				return t >= e.expandoStartIndex
			}
			function Hl(e, t, n, o, r) {
				let i = null
				const s = n.directiveEnd
				let a = n.directiveStylingLast
				for (
					-1 === a ? (a = n.directiveStart) : a++;
					a < s && ((i = t[a]), (o = Qr(o, i.hostAttrs, r)), i !== e);

				)
					a++
				return null !== e && (n.directiveStylingLast = a), o
			}
			function Qr(e, t, n) {
				const o = n ? 1 : 2
				let r = -1
				if (null !== t)
					for (let i = 0; i < t.length; i++) {
						const s = t[i]
						'number' == typeof s
							? (r = s)
							: r === o &&
							  (Array.isArray(e) || (e = void 0 === e ? [] : ['', e]), at(e, s, !!n || t[++i]))
					}
				return void 0 === e ? null : e
			}
			function Cm(e, t, n, o, r, i, s, a) {
				if (!(3 & t.type)) return
				const c = e.data,
					l = c[a + 1],
					u = (function OP(e) {
						return 1 == (1 & e)
					})(l)
						? xm(c, t, n, r, Vn(l), s)
						: void 0
				Zs(u) ||
					(Zs(i) ||
						((function wP(e) {
							return 2 == (2 & e)
						})(l) &&
							(i = xm(c, null, n, r, a, s))),
					(function Rx(e, t, n, o, r) {
						if (t) r ? e.addClass(n, o) : e.removeClass(n, o)
						else {
							let i = -1 === o.indexOf('-') ? void 0 : yn.DashCase
							null == r
								? e.removeStyle(n, o, i)
								: ('string' == typeof r &&
										r.endsWith('!important') &&
										((r = r.slice(0, -10)), (i |= yn.Important)),
								  e.setStyle(n, o, r, i))
						}
					})(o, s, Wi(Ue(), n), r, i))
			}
			function xm(e, t, n, o, r, i) {
				const s = null === t
				let a
				for (; r > 0; ) {
					const c = e[r],
						l = Array.isArray(c),
						u = l ? c[1] : c,
						d = null === u
					let p = n[r + 1]
					p === H && (p = d ? Y : void 0)
					let m = d ? Tc(p, o) : u === o ? p : void 0
					if ((l && !Zs(m) && (m = Tc(c, o)), Zs(m) && ((a = m), s))) return a
					const v = e[r + 1]
					r = s ? xn(v) : Vn(v)
				}
				if (null !== t) {
					let c = i ? t.residualClasses : t.residualStyles
					null != c && (a = Tc(c, o))
				}
				return a
			}
			function Zs(e) {
				return void 0 !== e
			}
			function Mm(e, t) {
				return 0 != (e.flags & (t ? 8 : 16))
			}
			function h(e, t = '') {
				const n = C(),
					o = Q(),
					r = e + Z,
					i = o.firstCreatePass ? Eo(o, r, 1, t, null) : o.data[r],
					s = wm(o, n, i, t, e)
				;(n[r] = s), Zi() && _s(o, n, s, i), jt(i, !1)
			}
			let wm = (e, t, n, o, r) => (
				vn(!0),
				(function ps(e, t) {
					return e.createText(t)
				})(t[U], o)
			)
			function ie(e) {
				return Bn('', e, ''), ie
			}
			function Bn(e, t, n) {
				const o = C(),
					r = Io(o, e, t, n)
				return (
					r !== H &&
						(function rn(e, t, n) {
							const o = Wi(t, e)
							!(function Qg(e, t, n) {
								e.setValue(t, n)
							})(e[U], o, n)
						})(o, Ue(), r),
					Bn
				)
			}
			function Un(e, t, n) {
				Pt(at, Ut, Io(C(), e, t, n), !0)
			}
			const $o = 'en-US'
			let Gm = $o
			class Vo {}
			class v_ {}
			class Kl extends Vo {
				constructor(t, n, o) {
					super(),
						(this._parent = n),
						(this._bootstrapComponents = []),
						(this.destroyCbs = []),
						(this.componentFactoryResolver = new wh(this))
					const r = rt(t)
					;(this._bootstrapComponents = nn(r.bootstrap)),
						(this._r3Injector = oh(
							t,
							n,
							[
								{provide: Vo, useValue: this},
								{provide: Is, useValue: this.componentFactoryResolver},
								...o,
							],
							we(t),
							new Set(['environment'])
						)),
						this._r3Injector.resolveInjectorInitializers(),
						(this.instance = this._r3Injector.get(t))
				}
				get injector() {
					return this._r3Injector
				}
				destroy() {
					const t = this._r3Injector
					!t.destroyed && t.destroy(), this.destroyCbs.forEach((n) => n()), (this.destroyCbs = null)
				}
				onDestroy(t) {
					this.destroyCbs.push(t)
				}
			}
			class Jl extends v_ {
				constructor(t) {
					super(), (this.moduleType = t)
				}
				create(t) {
					return new Kl(this.moduleType, t, [])
				}
			}
			class y_ extends Vo {
				constructor(t) {
					super(), (this.componentFactoryResolver = new wh(this)), (this.instance = null)
					const n = new sl(
						[
							...t.providers,
							{provide: Vo, useValue: this},
							{provide: Is, useValue: this.componentFactoryResolver},
						],
						t.parent || ws(),
						t.debugName,
						new Set(['environment'])
					)
					;(this.injector = n), t.runEnvironmentInitializers && n.resolveInjectorInitializers()
				}
				destroy() {
					this.injector.destroy()
				}
				onDestroy(t) {
					this.injector.onDestroy(t)
				}
			}
			function Xl(e, t, n = null) {
				return new y_({providers: e, parent: t, debugName: n, runEnvironmentInitializers: !0}).injector
			}
			let pD = (() => {
				class e {
					constructor(n) {
						;(this._injector = n), (this.cachedInjectors = new Map())
					}
					getOrCreateStandaloneInjector(n) {
						if (!n.standalone) return null
						if (!this.cachedInjectors.has(n)) {
							const o = Op(0, n.type),
								r = o.length > 0 ? Xl([o], this._injector, `Standalone[${n.type.name}]`) : null
							this.cachedInjectors.set(n, r)
						}
						return this.cachedInjectors.get(n)
					}
					ngOnDestroy() {
						try {
							for (const n of this.cachedInjectors.values()) null !== n && n.destroy()
						} finally {
							this.cachedInjectors.clear()
						}
					}
				}
				return (e.ɵprov = N({token: e, providedIn: 'environment', factory: () => new e(R(tn))})), e
			})()
			function b_(e) {
				e.getStandaloneInjector = (t) => t.get(pD).getOrCreateStandaloneInjector(e)
			}
			function ae(e, t, n) {
				const o =
						(function Be() {
							const e = L.lFrame
							let t = e.bindingRootIndex
							return -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
						})() + e,
					r = C()
				return r[o] === H
					? (function Vt(e, t, n) {
							return (e[t] = n)
					  })(r, o, n ? t.call(n) : t())
					: (function Br(e, t) {
							return e[t]
					  })(r, o)
			}
			function tu(e) {
				return (t) => {
					setTimeout(e, void 0, t)
				}
			}
			const qe = class zD extends Wt {
				constructor(t = !1) {
					super(), (this.__isAsync = t)
				}
				emit(t) {
					super.next(t)
				}
				subscribe(t, n, o) {
					let r = t,
						i = n || (() => null),
						s = o
					if (t && 'object' == typeof t) {
						const c = t
						;(r = c.next?.bind(c)), (i = c.error?.bind(c)), (s = c.complete?.bind(c))
					}
					this.__isAsync && ((i = tu(i)), r && (r = tu(r)), s && (s = tu(s)))
					const a = super.subscribe({next: r, error: i, complete: s})
					return t instanceof ut && t.add(a), a
				}
			}
			let sn = (() => {
				class e {}
				return (e.__NG_ELEMENT_ID__ = UD), e
			})()
			const VD = sn,
				BD = class extends VD {
					constructor(t, n, o) {
						super(), (this._declarationLView = t), (this._declarationTContainer = n), (this.elementRef = o)
					}
					get ssrId() {
						return this._declarationTContainer.tView?.ssrId || null
					}
					createEmbeddedView(t, n) {
						return this.createEmbeddedViewImpl(t, n, null)
					}
					createEmbeddedViewImpl(t, n, o) {
						const s = this._declarationTContainer.tView,
							a = Ns(
								this._declarationLView,
								s,
								t,
								4096 & this._declarationLView[B] ? 4096 : 16,
								null,
								s.declTNode,
								null,
								null,
								null,
								n || null,
								o || null
							)
						a[mr] = this._declarationLView[this._declarationTContainer.index]
						const l = this._declarationLView[At]
						return null !== l && (a[At] = l.createEmbeddedView(s)), Tl(s, a, t), new $r(a)
					}
				}
			function UD() {
				return (function Xs(e, t) {
					return 4 & e.type ? new BD(t, e, Oo(e, t)) : null
				})(Re(), C())
			}
			let Ot = (() => {
				class e {}
				return (e.__NG_ELEMENT_ID__ = YD), e
			})()
			function YD() {
				return (function F_(e, t) {
					let n
					const o = t[e.index]
					return (
						Je(o) ? (n = o) : ((n = gh(o, t, null, e)), (t[e.index] = n), Ls(t, n)),
						j_(n, t, e, o),
						new N_(n, e, t)
					)
				})(Re(), C())
			}
			const KD = Ot,
				N_ = class extends KD {
					constructor(t, n, o) {
						super(), (this._lContainer = t), (this._hostTNode = n), (this._hostLView = o)
					}
					get element() {
						return Oo(this._hostTNode, this._hostLView)
					}
					get injector() {
						return new uo(this._hostTNode, this._hostLView)
					}
					get parentInjector() {
						const t = Dc(this._hostTNode, this._hostLView)
						if (fg(t)) {
							const n = Xi(t, this._hostLView),
								o = Ji(t)
							return new uo(n[E].data[o + 8], n)
						}
						return new uo(null, this._hostLView)
					}
					clear() {
						for (; this.length > 0; ) this.remove(this.length - 1)
					}
					get(t) {
						const n = L_(this._lContainer)
						return (null !== n && n[t]) || null
					}
					get length() {
						return this._lContainer.length - Le
					}
					createEmbeddedView(t, n, o) {
						let r, i
						'number' == typeof o ? (r = o) : null != o && ((r = o.index), (i = o.injector))
						const a = t.createEmbeddedViewImpl(n || {}, i, null)
						return this.insertImpl(a, r, false), a
					}
					createComponent(t, n, o, r, i) {
						const s =
							t &&
							!(function Cr(e) {
								return 'function' == typeof e
							})(t)
						let a
						if (s) a = n
						else {
							const y = n || {}
							;(a = y.index),
								(o = y.injector),
								(r = y.projectableNodes),
								(i = y.environmentInjector || y.ngModuleRef)
						}
						const c = s ? t : new Vr(J(t)),
							l = o || this.parentInjector
						if (!i && null == c.ngModule) {
							const x = (s ? l : this.parentInjector).get(tn, null)
							x && (i = x)
						}
						J(c.componentType ?? {})
						const m = c.create(l, r, null, i)
						return this.insertImpl(m.hostView, a, false), m
					}
					insert(t, n) {
						return this.insertImpl(t, n, !1)
					}
					insertImpl(t, n, o) {
						const r = t._lView,
							i = r[E]
						if (
							(function KC(e) {
								return Je(e[he])
							})(r)
						) {
							const c = this.indexOf(t)
							if (-1 !== c) this.detach(c)
							else {
								const l = r[he],
									u = new N_(l, l[Ne], l[he])
								u.detach(u.indexOf(t))
							}
						}
						const s = this._adjustIndex(n),
							a = this._lContainer
						if (
							((function Px(e, t, n, o) {
								const r = Le + o,
									i = n.length
								o > 0 && (n[r - 1][xt] = t),
									o < i - Le ? ((t[xt] = n[r]), Pg(n, Le + o, t)) : (n.push(t), (t[xt] = null)),
									(t[he] = n)
								const s = t[mr]
								null !== s &&
									n !== s &&
									(function Ox(e, t) {
										const n = e[io]
										t[ye] !== t[he][he][ye] && (e[Tf] = !0), null === n ? (e[io] = [t]) : n.push(t)
									})(s, t)
								const a = t[At]
								null !== a && a.insertView(e), (t[B] |= 128)
							})(i, r, a, s),
							!o)
						) {
							const c = Gc(s, a),
								l = r[U],
								u = ms(l, a[Nt])
							null !== u &&
								(function xx(e, t, n, o, r, i) {
									;(o[Pe] = r), (o[Ne] = t), Er(e, o, n, 1, r, i)
								})(i, a[Ne], l, r, u, c)
						}
						return t.attachToViewContainerRef(), Pg(ru(a), s, t), t
					}
					move(t, n) {
						return this.insert(t, n)
					}
					indexOf(t) {
						const n = L_(this._lContainer)
						return null !== n ? n.indexOf(t) : -1
					}
					remove(t) {
						const n = this._adjustIndex(t, -1),
							o = Bc(this._lContainer, n)
						o && (rs(ru(this._lContainer), n), Kg(o[E], o))
					}
					detach(t) {
						const n = this._adjustIndex(t, -1),
							o = Bc(this._lContainer, n)
						return o && null != rs(ru(this._lContainer), n) ? new $r(o) : null
					}
					_adjustIndex(t, n = 0) {
						return t ?? this.length + n
					}
				}
			function L_(e) {
				return e[8]
			}
			function ru(e) {
				return e[8] || (e[8] = [])
			}
			let j_ = function z_(e, t, n, o) {
				if (e[Nt]) return
				let r
				;(r =
					8 & n.type
						? fe(o)
						: (function JD(e, t) {
								const n = e[U],
									o = n.createComment(''),
									r = Xe(t, e)
								return (
									Fn(
										n,
										ms(n, r),
										o,
										(function Ix(e, t) {
											return e.nextSibling(t)
										})(n, r),
										!1
									),
									o
								)
						  })(t, n)),
					(e[Nt] = r)
			}
			const hu = new T('Application Initializer')
			let mu = (() => {
					class e {
						constructor() {
							;(this.initialized = !1),
								(this.done = !1),
								(this.donePromise = new Promise((n, o) => {
									;(this.resolve = n), (this.reject = o)
								})),
								(this.appInits = S(hu, {optional: !0}) ?? [])
						}
						runInitializers() {
							if (this.initialized) return
							const n = []
							for (const r of this.appInits) {
								const i = r()
								if (Gs(i)) n.push(i)
								else if (Qh(i)) {
									const s = new Promise((a, c) => {
										i.subscribe({complete: a, error: c})
									})
									n.push(s)
								}
							}
							const o = () => {
								;(this.done = !0), this.resolve()
							}
							Promise.all(n)
								.then(() => {
									o()
								})
								.catch((r) => {
									this.reject(r)
								}),
								0 === n.length && o(),
								(this.initialized = !0)
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
						e
					)
				})(),
				uv = (() => {
					class e {
						log(n) {
							console.log(n)
						}
						warn(n) {
							console.warn(n)
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'platform'})),
						e
					)
				})()
			const an = new T('LocaleId', {
				providedIn: 'root',
				factory: () =>
					S(an, W.Optional | W.SkipSelf) ||
					(function SE() {
						return (typeof $localize < 'u' && $localize.locale) || $o
					})(),
			})
			let dv = (() => {
				class e {
					constructor() {
						;(this.taskId = 0), (this.pendingTasks = new Set()), (this.hasPendingTasks = new dt(!1))
					}
					add() {
						this.hasPendingTasks.next(!0)
						const n = this.taskId++
						return this.pendingTasks.add(n), n
					}
					remove(n) {
						this.pendingTasks.delete(n), 0 === this.pendingTasks.size && this.hasPendingTasks.next(!1)
					}
					ngOnDestroy() {
						this.pendingTasks.clear(), this.hasPendingTasks.next(!1)
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
					e
				)
			})()
			class kE {
				constructor(t, n) {
					;(this.ngModuleFactory = t), (this.componentFactories = n)
				}
			}
			let fv = (() => {
				class e {
					compileModuleSync(n) {
						return new Jl(n)
					}
					compileModuleAsync(n) {
						return Promise.resolve(this.compileModuleSync(n))
					}
					compileModuleAndAllComponentsSync(n) {
						const o = this.compileModuleSync(n),
							i = nn(rt(n).declarations).reduce((s, a) => {
								const c = J(a)
								return c && s.push(new Vr(c)), s
							}, [])
						return new kE(o, i)
					}
					compileModuleAndAllComponentsAsync(n) {
						return Promise.resolve(this.compileModuleAndAllComponentsSync(n))
					}
					clearCache() {}
					clearCacheFor(n) {}
					getModuleId(n) {}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
					e
				)
			})()
			function hv(...e) {}
			class _e {
				constructor({
					enableLongStackTrace: t = !1,
					shouldCoalesceEventChangeDetection: n = !1,
					shouldCoalesceRunChangeDetection: o = !1,
				}) {
					if (
						((this.hasPendingMacrotasks = !1),
						(this.hasPendingMicrotasks = !1),
						(this.isStable = !0),
						(this.onUnstable = new qe(!1)),
						(this.onMicrotaskEmpty = new qe(!1)),
						(this.onStable = new qe(!1)),
						(this.onError = new qe(!1)),
						typeof Zone > 'u')
					)
						throw new O(908, !1)
					Zone.assertZonePatched()
					const r = this
					;(r._nesting = 0),
						(r._outer = r._inner = Zone.current),
						Zone.TaskTrackingZoneSpec && (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
						t && Zone.longStackTraceZoneSpec && (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
						(r.shouldCoalesceEventChangeDetection = !o && n),
						(r.shouldCoalesceRunChangeDetection = o),
						(r.lastRequestAnimationFrameId = -1),
						(r.nativeRequestAnimationFrame = (function NE() {
							const e = 'function' == typeof se.requestAnimationFrame
							let t = se[e ? 'requestAnimationFrame' : 'setTimeout'],
								n = se[e ? 'cancelAnimationFrame' : 'clearTimeout']
							if (typeof Zone < 'u' && t && n) {
								const o = t[Zone.__symbol__('OriginalDelegate')]
								o && (t = o)
								const r = n[Zone.__symbol__('OriginalDelegate')]
								r && (n = r)
							}
							return {nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: n}
						})().nativeRequestAnimationFrame),
						(function jE(e) {
							const t = () => {
								!(function FE(e) {
									e.isCheckStableRunning ||
										-1 !== e.lastRequestAnimationFrameId ||
										((e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(se, () => {
											e.fakeTopEventTask ||
												(e.fakeTopEventTask = Zone.root.scheduleEventTask(
													'fakeTopEventTask',
													() => {
														;(e.lastRequestAnimationFrameId = -1),
															vu(e),
															(e.isCheckStableRunning = !0),
															_u(e),
															(e.isCheckStableRunning = !1)
													},
													void 0,
													() => {},
													() => {}
												)),
												e.fakeTopEventTask.invoke()
										})),
										vu(e))
								})(e)
							}
							e._inner = e._inner.fork({
								name: 'angular',
								properties: {isAngularZone: !0},
								onInvokeTask: (n, o, r, i, s, a) => {
									try {
										return mv(e), n.invokeTask(r, i, s, a)
									} finally {
										;((e.shouldCoalesceEventChangeDetection && 'eventTask' === i.type) ||
											e.shouldCoalesceRunChangeDetection) &&
											t(),
											_v(e)
									}
								},
								onInvoke: (n, o, r, i, s, a, c) => {
									try {
										return mv(e), n.invoke(r, i, s, a, c)
									} finally {
										e.shouldCoalesceRunChangeDetection && t(), _v(e)
									}
								},
								onHasTask: (n, o, r, i) => {
									n.hasTask(r, i),
										o === r &&
											('microTask' == i.change
												? ((e._hasPendingMicrotasks = i.microTask), vu(e), _u(e))
												: 'macroTask' == i.change && (e.hasPendingMacrotasks = i.macroTask))
								},
								onHandleError: (n, o, r, i) => (
									n.handleError(r, i), e.runOutsideAngular(() => e.onError.emit(i)), !1
								),
							})
						})(r)
				}
				static isInAngularZone() {
					return typeof Zone < 'u' && !0 === Zone.current.get('isAngularZone')
				}
				static assertInAngularZone() {
					if (!_e.isInAngularZone()) throw new O(909, !1)
				}
				static assertNotInAngularZone() {
					if (_e.isInAngularZone()) throw new O(909, !1)
				}
				run(t, n, o) {
					return this._inner.run(t, n, o)
				}
				runTask(t, n, o, r) {
					const i = this._inner,
						s = i.scheduleEventTask('NgZoneEvent: ' + r, t, LE, hv, hv)
					try {
						return i.runTask(s, n, o)
					} finally {
						i.cancelTask(s)
					}
				}
				runGuarded(t, n, o) {
					return this._inner.runGuarded(t, n, o)
				}
				runOutsideAngular(t) {
					return this._outer.run(t)
				}
			}
			const LE = {}
			function _u(e) {
				if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
					try {
						e._nesting++, e.onMicrotaskEmpty.emit(null)
					} finally {
						if ((e._nesting--, !e.hasPendingMicrotasks))
							try {
								e.runOutsideAngular(() => e.onStable.emit(null))
							} finally {
								e.isStable = !0
							}
					}
			}
			function vu(e) {
				e.hasPendingMicrotasks = !!(
					e._hasPendingMicrotasks ||
					((e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) &&
						-1 !== e.lastRequestAnimationFrameId)
				)
			}
			function mv(e) {
				e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null))
			}
			function _v(e) {
				e._nesting--, _u(e)
			}
			class zE {
				constructor() {
					;(this.hasPendingMicrotasks = !1),
						(this.hasPendingMacrotasks = !1),
						(this.isStable = !0),
						(this.onUnstable = new qe()),
						(this.onMicrotaskEmpty = new qe()),
						(this.onStable = new qe()),
						(this.onError = new qe())
				}
				run(t, n, o) {
					return t.apply(n, o)
				}
				runGuarded(t, n, o) {
					return t.apply(n, o)
				}
				runOutsideAngular(t) {
					return t()
				}
				runTask(t, n, o, r) {
					return t.apply(n, o)
				}
			}
			const vv = new T('', {providedIn: 'root', factory: yv})
			function yv() {
				const e = S(_e)
				let t = !0
				return (function W0(...e) {
					const t = lr(e),
						n = (function $0(e, t) {
							return 'number' == typeof Wa(e) ? e.pop() : t
						})(e, 1 / 0),
						o = e
					return o.length ? (1 === o.length ? yt(o[0]) : Jn(n)(ke(o, t))) : Tt
				})(
					new Me((r) => {
						;(t = e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
							e.runOutsideAngular(() => {
								r.next(t), r.complete()
							})
					}),
					new Me((r) => {
						let i
						e.runOutsideAngular(() => {
							i = e.onStable.subscribe(() => {
								_e.assertNotInAngularZone(),
									queueMicrotask(() => {
										!t &&
											!e.hasPendingMacrotasks &&
											!e.hasPendingMicrotasks &&
											((t = !0), r.next(!0))
									})
							})
						})
						const s = e.onUnstable.subscribe(() => {
							_e.assertInAngularZone(),
								t &&
									((t = !1),
									e.runOutsideAngular(() => {
										r.next(!1)
									}))
						})
						return () => {
							i.unsubscribe(), s.unsubscribe()
						}
					}).pipe(af())
				)
			}
			const bv = new T(''),
				ta = new T('')
			let Cu,
				yu = (() => {
					class e {
						constructor(n, o, r) {
							;(this._ngZone = n),
								(this.registry = o),
								(this._pendingCount = 0),
								(this._isZoneStable = !0),
								(this._didWork = !1),
								(this._callbacks = []),
								(this.taskTrackingZone = null),
								Cu ||
									((function $E(e) {
										Cu = e
									})(r),
									r.addToWindow(o)),
								this._watchAngularEvents(),
								n.run(() => {
									this.taskTrackingZone =
										typeof Zone > 'u' ? null : Zone.current.get('TaskTrackingZone')
								})
						}
						_watchAngularEvents() {
							this._ngZone.onUnstable.subscribe({
								next: () => {
									;(this._didWork = !0), (this._isZoneStable = !1)
								},
							}),
								this._ngZone.runOutsideAngular(() => {
									this._ngZone.onStable.subscribe({
										next: () => {
											_e.assertNotInAngularZone(),
												queueMicrotask(() => {
													;(this._isZoneStable = !0), this._runCallbacksIfReady()
												})
										},
									})
								})
						}
						increasePendingRequestCount() {
							return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount
						}
						decreasePendingRequestCount() {
							if (((this._pendingCount -= 1), this._pendingCount < 0))
								throw new Error('pending async requests below zero')
							return this._runCallbacksIfReady(), this._pendingCount
						}
						isStable() {
							return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
						}
						_runCallbacksIfReady() {
							if (this.isStable())
								queueMicrotask(() => {
									for (; 0 !== this._callbacks.length; ) {
										let n = this._callbacks.pop()
										clearTimeout(n.timeoutId), n.doneCb(this._didWork)
									}
									this._didWork = !1
								})
							else {
								let n = this.getPendingTasks()
								;(this._callbacks = this._callbacks.filter(
									(o) => !o.updateCb || !o.updateCb(n) || (clearTimeout(o.timeoutId), !1)
								)),
									(this._didWork = !0)
							}
						}
						getPendingTasks() {
							return this.taskTrackingZone
								? this.taskTrackingZone.macroTasks.map((n) => ({
										source: n.source,
										creationLocation: n.creationLocation,
										data: n.data,
								  }))
								: []
						}
						addCallback(n, o, r) {
							let i = -1
							o &&
								o > 0 &&
								(i = setTimeout(() => {
									;(this._callbacks = this._callbacks.filter((s) => s.timeoutId !== i)),
										n(this._didWork, this.getPendingTasks())
								}, o)),
								this._callbacks.push({doneCb: n, timeoutId: i, updateCb: r})
						}
						whenStable(n, o, r) {
							if (r && !this.taskTrackingZone)
								throw new Error(
									'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
								)
							this.addCallback(n, o, r), this._runCallbacksIfReady()
						}
						getPendingRequestCount() {
							return this._pendingCount
						}
						registerApplication(n) {
							this.registry.registerApplication(n, this)
						}
						unregisterApplication(n) {
							this.registry.unregisterApplication(n)
						}
						findProviders(n, o, r) {
							return []
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(R(_e), R(bu), R(ta))
						}),
						(e.ɵprov = N({token: e, factory: e.ɵfac})),
						e
					)
				})(),
				bu = (() => {
					class e {
						constructor() {
							this._applications = new Map()
						}
						registerApplication(n, o) {
							this._applications.set(n, o)
						}
						unregisterApplication(n) {
							this._applications.delete(n)
						}
						unregisterAllApplications() {
							this._applications.clear()
						}
						getTestability(n) {
							return this._applications.get(n) || null
						}
						getAllTestabilities() {
							return Array.from(this._applications.values())
						}
						getAllRootElements() {
							return Array.from(this._applications.keys())
						}
						findTestabilityInTree(n, o = !0) {
							return Cu?.findTestabilityInTree(this, n, o) ?? null
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'platform'})),
						e
					)
				})(),
				Mn = null
			const Cv = new T('AllowMultipleToken'),
				xu = new T('PlatformDestroyListeners'),
				Mu = new T('appBootstrapListener')
			class Mv {
				constructor(t, n) {
					;(this.name = t), (this.token = n)
				}
			}
			function Pv(e, t, n = []) {
				const o = `Platform: ${t}`,
					r = new T(o)
				return (i = []) => {
					let s = wu()
					if (!s || s.injector.get(Cv, !1)) {
						const a = [...n, ...i, {provide: r, useValue: !0}]
						e
							? e(a)
							: (function UE(e) {
									if (Mn && !Mn.get(Cv, !1)) throw new O(400, !1)
									;(function xv() {
										!(function zC(e) {
											Ff = e
										})(() => {
											throw new O(600, !1)
										})
									})(),
										(Mn = e)
									const t = e.get(Dv)
									;(function wv(e) {
										e.get(Tp, null)?.forEach((n) => n())
									})(e)
							  })(
									(function Ov(e = [], t) {
										return on.create({
											name: t,
											providers: [
												{provide: rl, useValue: 'platform'},
												{provide: xu, useValue: new Set([() => (Mn = null)])},
												...e,
											],
										})
									})(a, o)
							  )
					}
					return (function qE(e) {
						const t = wu()
						if (!t) throw new O(401, !1)
						return t
					})()
				}
			}
			function wu() {
				return Mn?.get(Dv) ?? null
			}
			let Dv = (() => {
				class e {
					constructor(n) {
						;(this._injector = n),
							(this._modules = []),
							(this._destroyListeners = []),
							(this._destroyed = !1)
					}
					bootstrapModuleFactory(n, o) {
						const r = (function GE(e = 'zone.js', t) {
							return 'noop' === e ? new zE() : 'zone.js' === e ? new _e(t) : e
						})(
							o?.ngZone,
							(function Ev(e) {
								return {
									enableLongStackTrace: !1,
									shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
									shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
								}
							})({eventCoalescing: o?.ngZoneEventCoalescing, runCoalescing: o?.ngZoneRunCoalescing})
						)
						return r.run(() => {
							const i = (function gD(e, t, n) {
									return new Kl(e, t, n)
								})(
									n.moduleType,
									this.injector,
									(function Rv(e) {
										return [
											{provide: _e, useFactory: e},
											{
												provide: Ar,
												multi: !0,
												useFactory: () => {
													const t = S(ZE, {optional: !0})
													return () => t.initialize()
												},
											},
											{provide: kv, useFactory: WE},
											{provide: vv, useFactory: yv},
										]
									})(() => r)
								),
								s = i.injector.get(zn, null)
							return (
								r.runOutsideAngular(() => {
									const a = r.onError.subscribe({
										next: (c) => {
											s.handleError(c)
										},
									})
									i.onDestroy(() => {
										na(this._modules, i), a.unsubscribe()
									})
								}),
								(function Sv(e, t, n) {
									try {
										const o = n()
										return Gs(o)
											? o.catch((r) => {
													throw (t.runOutsideAngular(() => e.handleError(r)), r)
											  })
											: o
									} catch (o) {
										throw (t.runOutsideAngular(() => e.handleError(o)), o)
									}
								})(s, r, () => {
									const a = i.injector.get(mu)
									return (
										a.runInitializers(),
										a.donePromise.then(
											() => (
												(function Wm(e) {
													ft(e, 'Expected localeId to be defined'),
														'string' == typeof e &&
															(Gm = e.toLowerCase().replace(/_/g, '-'))
												})(i.injector.get(an, $o) || $o),
												this._moduleDoBootstrap(i),
												i
											)
										)
									)
								})
							)
						})
					}
					bootstrapModule(n, o = []) {
						const r = Iv({}, o)
						return (function VE(e, t, n) {
							const o = new Jl(n)
							return Promise.resolve(o)
						})(0, 0, n).then((i) => this.bootstrapModuleFactory(i, r))
					}
					_moduleDoBootstrap(n) {
						const o = n.injector.get(Ho)
						if (n._bootstrapComponents.length > 0) n._bootstrapComponents.forEach((r) => o.bootstrap(r))
						else {
							if (!n.instance.ngDoBootstrap) throw new O(-403, !1)
							n.instance.ngDoBootstrap(o)
						}
						this._modules.push(n)
					}
					onDestroy(n) {
						this._destroyListeners.push(n)
					}
					get injector() {
						return this._injector
					}
					destroy() {
						if (this._destroyed) throw new O(404, !1)
						this._modules.slice().forEach((o) => o.destroy()), this._destroyListeners.forEach((o) => o())
						const n = this._injector.get(xu, null)
						n && (n.forEach((o) => o()), n.clear()), (this._destroyed = !0)
					}
					get destroyed() {
						return this._destroyed
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(R(on))
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'platform'})),
					e
				)
			})()
			function Iv(e, t) {
				return Array.isArray(t) ? t.reduce(Iv, e) : {...e, ...t}
			}
			let Ho = (() => {
				class e {
					constructor() {
						;(this._bootstrapListeners = []),
							(this._runningTick = !1),
							(this._destroyed = !1),
							(this._destroyListeners = []),
							(this._views = []),
							(this.internalErrorHandler = S(kv)),
							(this.zoneIsStable = S(vv)),
							(this.componentTypes = []),
							(this.components = []),
							(this.isStable = S(dv).hasPendingTasks.pipe(
								kt((n) => (n ? F(!1) : this.zoneIsStable)),
								(function Z0(e, t = gn) {
									return (
										(e = e ?? Q0),
										Ee((n, o) => {
											let r,
												i = !0
											n.subscribe(
												Se(o, (s) => {
													const a = t(s)
													;(i || !e(r, a)) && ((i = !1), (r = a), o.next(s))
												})
											)
										})
									)
								})(),
								af()
							)),
							(this._injector = S(tn))
					}
					get destroyed() {
						return this._destroyed
					}
					get injector() {
						return this._injector
					}
					bootstrap(n, o) {
						const r = n instanceof jp
						if (!this._injector.get(mu).done)
							throw (
								(!r &&
									(function eo(e) {
										const t = J(e) || Ae(e) || Ke(e)
										return null !== t && t.standalone
									})(n),
								new O(405, !1))
							)
						let s
						;(s = r ? n : this._injector.get(Is).resolveComponentFactory(n)),
							this.componentTypes.push(s.componentType)
						const a = (function BE(e) {
								return e.isBoundToModule
							})(s)
								? void 0
								: this._injector.get(Vo),
							l = s.create(on.NULL, [], o || s.selector, a),
							u = l.location.nativeElement,
							d = l.injector.get(bv, null)
						return (
							d?.registerApplication(u),
							l.onDestroy(() => {
								this.detachView(l.hostView), na(this.components, l), d?.unregisterApplication(u)
							}),
							this._loadComponent(l),
							l
						)
					}
					tick() {
						if (this._runningTick) throw new O(101, !1)
						try {
							this._runningTick = !0
							for (let n of this._views) n.detectChanges()
						} catch (n) {
							this.internalErrorHandler(n)
						} finally {
							this._runningTick = !1
						}
					}
					attachView(n) {
						const o = n
						this._views.push(o), o.attachToAppRef(this)
					}
					detachView(n) {
						const o = n
						na(this._views, o), o.detachFromAppRef()
					}
					_loadComponent(n) {
						this.attachView(n.hostView), this.tick(), this.components.push(n)
						const o = this._injector.get(Mu, [])
						o.push(...this._bootstrapListeners), o.forEach((r) => r(n))
					}
					ngOnDestroy() {
						if (!this._destroyed)
							try {
								this._destroyListeners.forEach((n) => n()),
									this._views.slice().forEach((n) => n.destroy())
							} finally {
								;(this._destroyed = !0),
									(this._views = []),
									(this._bootstrapListeners = []),
									(this._destroyListeners = [])
							}
					}
					onDestroy(n) {
						return this._destroyListeners.push(n), () => na(this._destroyListeners, n)
					}
					destroy() {
						if (this._destroyed) throw new O(406, !1)
						const n = this._injector
						n.destroy && !n.destroyed && n.destroy()
					}
					get viewCount() {
						return this._views.length
					}
					warnIfDestroyed() {}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
					e
				)
			})()
			function na(e, t) {
				const n = e.indexOf(t)
				n > -1 && e.splice(n, 1)
			}
			const kv = new T('', {providedIn: 'root', factory: () => S(zn).handleError.bind(void 0)})
			function WE() {
				const e = S(_e),
					t = S(zn)
				return (n) => e.runOutsideAngular(() => t.handleError(n))
			}
			let ZE = (() => {
				class e {
					constructor() {
						;(this.zone = S(_e)), (this.applicationRef = S(Ho))
					}
					initialize() {
						this._onMicrotaskEmptySubscription ||
							(this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
								next: () => {
									this.zone.run(() => {
										this.applicationRef.tick()
									})
								},
							}))
					}
					ngOnDestroy() {
						this._onMicrotaskEmptySubscription?.unsubscribe()
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
					e
				)
			})()
			let Pu = (() => {
				class e {}
				return (e.__NG_ELEMENT_ID__ = YE), e
			})()
			function YE(e) {
				return (function KE(e, t, n) {
					if (kn(e) && !n) {
						const o = st(e.index, t)
						return new $r(o, o)
					}
					return 47 & e.type ? new $r(t[ye], t) : null
				})(Re(), C(), 16 == (16 & e))
			}
			class Fv {
				constructor() {}
				supports(t) {
					return $s(t)
				}
				create(t) {
					return new oS(t)
				}
			}
			const nS = (e, t) => t
			class oS {
				constructor(t) {
					;(this.length = 0),
						(this._linkedRecords = null),
						(this._unlinkedRecords = null),
						(this._previousItHead = null),
						(this._itHead = null),
						(this._itTail = null),
						(this._additionsHead = null),
						(this._additionsTail = null),
						(this._movesHead = null),
						(this._movesTail = null),
						(this._removalsHead = null),
						(this._removalsTail = null),
						(this._identityChangesHead = null),
						(this._identityChangesTail = null),
						(this._trackByFn = t || nS)
				}
				forEachItem(t) {
					let n
					for (n = this._itHead; null !== n; n = n._next) t(n)
				}
				forEachOperation(t) {
					let n = this._itHead,
						o = this._removalsHead,
						r = 0,
						i = null
					for (; n || o; ) {
						const s = !o || (n && n.currentIndex < zv(o, r, i)) ? n : o,
							a = zv(s, r, i),
							c = s.currentIndex
						if (s === o) r--, (o = o._nextRemoved)
						else if (((n = n._next), null == s.previousIndex)) r++
						else {
							i || (i = [])
							const l = a - r,
								u = c - r
							if (l != u) {
								for (let p = 0; p < l; p++) {
									const m = p < i.length ? i[p] : (i[p] = 0),
										v = m + p
									u <= v && v < l && (i[p] = m + 1)
								}
								i[s.previousIndex] = u - l
							}
						}
						a !== c && t(s, a, c)
					}
				}
				forEachPreviousItem(t) {
					let n
					for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n)
				}
				forEachAddedItem(t) {
					let n
					for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n)
				}
				forEachMovedItem(t) {
					let n
					for (n = this._movesHead; null !== n; n = n._nextMoved) t(n)
				}
				forEachRemovedItem(t) {
					let n
					for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n)
				}
				forEachIdentityChange(t) {
					let n
					for (n = this._identityChangesHead; null !== n; n = n._nextIdentityChange) t(n)
				}
				diff(t) {
					if ((null == t && (t = []), !$s(t))) throw new O(900, !1)
					return this.check(t) ? this : null
				}
				onDestroy() {}
				check(t) {
					this._reset()
					let r,
						i,
						s,
						n = this._itHead,
						o = !1
					if (Array.isArray(t)) {
						this.length = t.length
						for (let a = 0; a < this.length; a++)
							(i = t[a]),
								(s = this._trackByFn(a, i)),
								null !== n && Object.is(n.trackById, s)
									? (o && (n = this._verifyReinsertion(n, i, s, a)),
									  Object.is(n.item, i) || this._addIdentityChange(n, i))
									: ((n = this._mismatch(n, i, s, a)), (o = !0)),
								(n = n._next)
					} else
						(r = 0),
							(function qw(e, t) {
								if (Array.isArray(e)) for (let n = 0; n < e.length; n++) t(e[n])
								else {
									const n = e[Symbol.iterator]()
									let o
									for (; !(o = n.next()).done; ) t(o.value)
								}
							})(t, (a) => {
								;(s = this._trackByFn(r, a)),
									null !== n && Object.is(n.trackById, s)
										? (o && (n = this._verifyReinsertion(n, a, s, r)),
										  Object.is(n.item, a) || this._addIdentityChange(n, a))
										: ((n = this._mismatch(n, a, s, r)), (o = !0)),
									(n = n._next),
									r++
							}),
							(this.length = r)
					return this._truncate(n), (this.collection = t), this.isDirty
				}
				get isDirty() {
					return (
						null !== this._additionsHead ||
						null !== this._movesHead ||
						null !== this._removalsHead ||
						null !== this._identityChangesHead
					)
				}
				_reset() {
					if (this.isDirty) {
						let t
						for (t = this._previousItHead = this._itHead; null !== t; t = t._next) t._nextPrevious = t._next
						for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex
						for (
							this._additionsHead = this._additionsTail = null, t = this._movesHead;
							null !== t;
							t = t._nextMoved
						)
							t.previousIndex = t.currentIndex
						;(this._movesHead = this._movesTail = null),
							(this._removalsHead = this._removalsTail = null),
							(this._identityChangesHead = this._identityChangesTail = null)
					}
				}
				_mismatch(t, n, o, r) {
					let i
					return (
						null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
						null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(o, null))
							? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._reinsertAfter(t, i, r))
							: null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(o, r))
							? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._moveAfter(t, i, r))
							: (t = this._addAfter(new rS(n, o), i, r)),
						t
					)
				}
				_verifyReinsertion(t, n, o, r) {
					let i = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(o, null)
					return (
						null !== i
							? (t = this._reinsertAfter(i, t._prev, r))
							: t.currentIndex != r && ((t.currentIndex = r), this._addToMoves(t, r)),
						t
					)
				}
				_truncate(t) {
					for (; null !== t; ) {
						const n = t._next
						this._addToRemovals(this._unlink(t)), (t = n)
					}
					null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
						null !== this._additionsTail && (this._additionsTail._nextAdded = null),
						null !== this._movesTail && (this._movesTail._nextMoved = null),
						null !== this._itTail && (this._itTail._next = null),
						null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
						null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
				}
				_reinsertAfter(t, n, o) {
					null !== this._unlinkedRecords && this._unlinkedRecords.remove(t)
					const r = t._prevRemoved,
						i = t._nextRemoved
					return (
						null === r ? (this._removalsHead = i) : (r._nextRemoved = i),
						null === i ? (this._removalsTail = r) : (i._prevRemoved = r),
						this._insertAfter(t, n, o),
						this._addToMoves(t, o),
						t
					)
				}
				_moveAfter(t, n, o) {
					return this._unlink(t), this._insertAfter(t, n, o), this._addToMoves(t, o), t
				}
				_addAfter(t, n, o) {
					return (
						this._insertAfter(t, n, o),
						(this._additionsTail =
							null === this._additionsTail
								? (this._additionsHead = t)
								: (this._additionsTail._nextAdded = t)),
						t
					)
				}
				_insertAfter(t, n, o) {
					const r = null === n ? this._itHead : n._next
					return (
						(t._next = r),
						(t._prev = n),
						null === r ? (this._itTail = t) : (r._prev = t),
						null === n ? (this._itHead = t) : (n._next = t),
						null === this._linkedRecords && (this._linkedRecords = new jv()),
						this._linkedRecords.put(t),
						(t.currentIndex = o),
						t
					)
				}
				_remove(t) {
					return this._addToRemovals(this._unlink(t))
				}
				_unlink(t) {
					null !== this._linkedRecords && this._linkedRecords.remove(t)
					const n = t._prev,
						o = t._next
					return (
						null === n ? (this._itHead = o) : (n._next = o),
						null === o ? (this._itTail = n) : (o._prev = n),
						t
					)
				}
				_addToMoves(t, n) {
					return (
						t.previousIndex === n ||
							(this._movesTail =
								null === this._movesTail ? (this._movesHead = t) : (this._movesTail._nextMoved = t)),
						t
					)
				}
				_addToRemovals(t) {
					return (
						null === this._unlinkedRecords && (this._unlinkedRecords = new jv()),
						this._unlinkedRecords.put(t),
						(t.currentIndex = null),
						(t._nextRemoved = null),
						null === this._removalsTail
							? ((this._removalsTail = this._removalsHead = t), (t._prevRemoved = null))
							: ((t._prevRemoved = this._removalsTail),
							  (this._removalsTail = this._removalsTail._nextRemoved = t)),
						t
					)
				}
				_addIdentityChange(t, n) {
					return (
						(t.item = n),
						(this._identityChangesTail =
							null === this._identityChangesTail
								? (this._identityChangesHead = t)
								: (this._identityChangesTail._nextIdentityChange = t)),
						t
					)
				}
			}
			class rS {
				constructor(t, n) {
					;(this.item = t),
						(this.trackById = n),
						(this.currentIndex = null),
						(this.previousIndex = null),
						(this._nextPrevious = null),
						(this._prev = null),
						(this._next = null),
						(this._prevDup = null),
						(this._nextDup = null),
						(this._prevRemoved = null),
						(this._nextRemoved = null),
						(this._nextAdded = null),
						(this._nextMoved = null),
						(this._nextIdentityChange = null)
				}
			}
			class iS {
				constructor() {
					;(this._head = null), (this._tail = null)
				}
				add(t) {
					null === this._head
						? ((this._head = this._tail = t), (t._nextDup = null), (t._prevDup = null))
						: ((this._tail._nextDup = t), (t._prevDup = this._tail), (t._nextDup = null), (this._tail = t))
				}
				get(t, n) {
					let o
					for (o = this._head; null !== o; o = o._nextDup)
						if ((null === n || n <= o.currentIndex) && Object.is(o.trackById, t)) return o
					return null
				}
				remove(t) {
					const n = t._prevDup,
						o = t._nextDup
					return (
						null === n ? (this._head = o) : (n._nextDup = o),
						null === o ? (this._tail = n) : (o._prevDup = n),
						null === this._head
					)
				}
			}
			class jv {
				constructor() {
					this.map = new Map()
				}
				put(t) {
					const n = t.trackById
					let o = this.map.get(n)
					o || ((o = new iS()), this.map.set(n, o)), o.add(t)
				}
				get(t, n) {
					const r = this.map.get(t)
					return r ? r.get(t, n) : null
				}
				remove(t) {
					const n = t.trackById
					return this.map.get(n).remove(t) && this.map.delete(n), t
				}
				get isEmpty() {
					return 0 === this.map.size
				}
				clear() {
					this.map.clear()
				}
			}
			function zv(e, t, n) {
				const o = e.previousIndex
				if (null === o) return o
				let r = 0
				return n && o < n.length && (r = n[o]), o + t + r
			}
			function Vv() {
				return new ia([new Fv()])
			}
			let ia = (() => {
				class e {
					constructor(n) {
						this.factories = n
					}
					static create(n, o) {
						if (null != o) {
							const r = o.factories.slice()
							n = n.concat(r)
						}
						return new e(n)
					}
					static extend(n) {
						return {provide: e, useFactory: (o) => e.create(n, o || Vv()), deps: [[e, new as(), new ss()]]}
					}
					find(n) {
						const o = this.factories.find((r) => r.supports(n))
						if (null != o) return o
						throw new O(901, !1)
					}
				}
				return (e.ɵprov = N({token: e, providedIn: 'root', factory: Vv})), e
			})()
			const uS = Pv(null, 'core', [])
			let dS = (() => {
					class e {
						constructor(n) {}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(R(Ho))
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({})),
						e
					)
				})(),
				Ru = null
			function qo() {
				return Ru
			}
			class MS {}
			const ht = new T('DocumentToken')
			let Au = (() => {
				class e {
					historyGo(n) {
						throw new Error('Not implemented')
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵprov = N({
						token: e,
						factory: function () {
							return S(PS)
						},
						providedIn: 'platform',
					})),
					e
				)
			})()
			const wS = new T('Location Initialized')
			let PS = (() => {
				class e extends Au {
					constructor() {
						super(),
							(this._doc = S(ht)),
							(this._location = window.location),
							(this._history = window.history)
					}
					getBaseHrefFromDOM() {
						return qo().getBaseHref(this._doc)
					}
					onPopState(n) {
						const o = qo().getGlobalEventTarget(this._doc, 'window')
						return o.addEventListener('popstate', n, !1), () => o.removeEventListener('popstate', n)
					}
					onHashChange(n) {
						const o = qo().getGlobalEventTarget(this._doc, 'window')
						return o.addEventListener('hashchange', n, !1), () => o.removeEventListener('hashchange', n)
					}
					get href() {
						return this._location.href
					}
					get protocol() {
						return this._location.protocol
					}
					get hostname() {
						return this._location.hostname
					}
					get port() {
						return this._location.port
					}
					get pathname() {
						return this._location.pathname
					}
					get search() {
						return this._location.search
					}
					get hash() {
						return this._location.hash
					}
					set pathname(n) {
						this._location.pathname = n
					}
					pushState(n, o, r) {
						this._history.pushState(n, o, r)
					}
					replaceState(n, o, r) {
						this._history.replaceState(n, o, r)
					}
					forward() {
						this._history.forward()
					}
					back() {
						this._history.back()
					}
					historyGo(n = 0) {
						this._history.go(n)
					}
					getState() {
						return this._history.state
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵprov = N({
						token: e,
						factory: function () {
							return new e()
						},
						providedIn: 'platform',
					})),
					e
				)
			})()
			function Nu(e, t) {
				if (0 == e.length) return t
				if (0 == t.length) return e
				let n = 0
				return (
					e.endsWith('/') && n++,
					t.startsWith('/') && n++,
					2 == n ? e + t.substring(1) : 1 == n ? e + t : e + '/' + t
				)
			}
			function Qv(e) {
				const t = e.match(/#|\?|$/),
					n = (t && t.index) || e.length
				return e.slice(0, n - ('/' === e[n - 1] ? 1 : 0)) + e.slice(n)
			}
			function cn(e) {
				return e && '?' !== e[0] ? '?' + e : e
			}
			let Gn = (() => {
				class e {
					historyGo(n) {
						throw new Error('Not implemented')
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵprov = N({
						token: e,
						factory: function () {
							return S(Kv)
						},
						providedIn: 'root',
					})),
					e
				)
			})()
			const Yv = new T('appBaseHref')
			let Kv = (() => {
					class e extends Gn {
						constructor(n, o) {
							super(),
								(this._platformLocation = n),
								(this._removeListenerFns = []),
								(this._baseHref =
									o ?? this._platformLocation.getBaseHrefFromDOM() ?? S(ht).location?.origin ?? '')
						}
						ngOnDestroy() {
							for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()()
						}
						onPopState(n) {
							this._removeListenerFns.push(
								this._platformLocation.onPopState(n),
								this._platformLocation.onHashChange(n)
							)
						}
						getBaseHref() {
							return this._baseHref
						}
						prepareExternalUrl(n) {
							return Nu(this._baseHref, n)
						}
						path(n = !1) {
							const o = this._platformLocation.pathname + cn(this._platformLocation.search),
								r = this._platformLocation.hash
							return r && n ? `${o}${r}` : o
						}
						pushState(n, o, r, i) {
							const s = this.prepareExternalUrl(r + cn(i))
							this._platformLocation.pushState(n, o, s)
						}
						replaceState(n, o, r, i) {
							const s = this.prepareExternalUrl(r + cn(i))
							this._platformLocation.replaceState(n, o, s)
						}
						forward() {
							this._platformLocation.forward()
						}
						back() {
							this._platformLocation.back()
						}
						getState() {
							return this._platformLocation.getState()
						}
						historyGo(n = 0) {
							this._platformLocation.historyGo?.(n)
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(R(Au), R(Yv, 8))
						}),
						(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
						e
					)
				})(),
				OS = (() => {
					class e extends Gn {
						constructor(n, o) {
							super(),
								(this._platformLocation = n),
								(this._baseHref = ''),
								(this._removeListenerFns = []),
								null != o && (this._baseHref = o)
						}
						ngOnDestroy() {
							for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()()
						}
						onPopState(n) {
							this._removeListenerFns.push(
								this._platformLocation.onPopState(n),
								this._platformLocation.onHashChange(n)
							)
						}
						getBaseHref() {
							return this._baseHref
						}
						path(n = !1) {
							let o = this._platformLocation.hash
							return null == o && (o = '#'), o.length > 0 ? o.substring(1) : o
						}
						prepareExternalUrl(n) {
							const o = Nu(this._baseHref, n)
							return o.length > 0 ? '#' + o : o
						}
						pushState(n, o, r, i) {
							let s = this.prepareExternalUrl(r + cn(i))
							0 == s.length && (s = this._platformLocation.pathname),
								this._platformLocation.pushState(n, o, s)
						}
						replaceState(n, o, r, i) {
							let s = this.prepareExternalUrl(r + cn(i))
							0 == s.length && (s = this._platformLocation.pathname),
								this._platformLocation.replaceState(n, o, s)
						}
						forward() {
							this._platformLocation.forward()
						}
						back() {
							this._platformLocation.back()
						}
						getState() {
							return this._platformLocation.getState()
						}
						historyGo(n = 0) {
							this._platformLocation.historyGo?.(n)
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(R(Au), R(Yv, 8))
						}),
						(e.ɵprov = N({token: e, factory: e.ɵfac})),
						e
					)
				})(),
				Lu = (() => {
					class e {
						constructor(n) {
							;(this._subject = new qe()),
								(this._urlChangeListeners = []),
								(this._urlChangeSubscription = null),
								(this._locationStrategy = n)
							const o = this._locationStrategy.getBaseHref()
							;(this._basePath = (function SS(e) {
								if (new RegExp('^(https?:)?//').test(e)) {
									const [, n] = e.split(/\/\/[^\/]+/)
									return n
								}
								return e
							})(Qv(Jv(o)))),
								this._locationStrategy.onPopState((r) => {
									this._subject.emit({url: this.path(!0), pop: !0, state: r.state, type: r.type})
								})
						}
						ngOnDestroy() {
							this._urlChangeSubscription?.unsubscribe(), (this._urlChangeListeners = [])
						}
						path(n = !1) {
							return this.normalize(this._locationStrategy.path(n))
						}
						getState() {
							return this._locationStrategy.getState()
						}
						isCurrentPathEqualTo(n, o = '') {
							return this.path() == this.normalize(n + cn(o))
						}
						normalize(n) {
							return e.stripTrailingSlash(
								(function ES(e, t) {
									if (!e || !t.startsWith(e)) return t
									const n = t.substring(e.length)
									return '' === n || ['/', ';', '?', '#'].includes(n[0]) ? n : t
								})(this._basePath, Jv(n))
							)
						}
						prepareExternalUrl(n) {
							return n && '/' !== n[0] && (n = '/' + n), this._locationStrategy.prepareExternalUrl(n)
						}
						go(n, o = '', r = null) {
							this._locationStrategy.pushState(r, '', n, o),
								this._notifyUrlChangeListeners(this.prepareExternalUrl(n + cn(o)), r)
						}
						replaceState(n, o = '', r = null) {
							this._locationStrategy.replaceState(r, '', n, o),
								this._notifyUrlChangeListeners(this.prepareExternalUrl(n + cn(o)), r)
						}
						forward() {
							this._locationStrategy.forward()
						}
						back() {
							this._locationStrategy.back()
						}
						historyGo(n = 0) {
							this._locationStrategy.historyGo?.(n)
						}
						onUrlChange(n) {
							return (
								this._urlChangeListeners.push(n),
								this._urlChangeSubscription ||
									(this._urlChangeSubscription = this.subscribe((o) => {
										this._notifyUrlChangeListeners(o.url, o.state)
									})),
								() => {
									const o = this._urlChangeListeners.indexOf(n)
									this._urlChangeListeners.splice(o, 1),
										0 === this._urlChangeListeners.length &&
											(this._urlChangeSubscription?.unsubscribe(),
											(this._urlChangeSubscription = null))
								}
							)
						}
						_notifyUrlChangeListeners(n = '', o) {
							this._urlChangeListeners.forEach((r) => r(n, o))
						}
						subscribe(n, o, r) {
							return this._subject.subscribe({next: n, error: o, complete: r})
						}
					}
					return (
						(e.normalizeQueryParams = cn),
						(e.joinWithSlash = Nu),
						(e.stripTrailingSlash = Qv),
						(e.ɵfac = function (n) {
							return new (n || e)(R(Gn))
						}),
						(e.ɵprov = N({
							token: e,
							factory: function () {
								return (function DS() {
									return new Lu(R(Gn))
								})()
							},
							providedIn: 'root',
						})),
						e
					)
				})()
			function Jv(e) {
				return e.replace(/\/index.html$/, '')
			}
			class mI {
				constructor(t, n, o, r) {
					;(this.$implicit = t), (this.ngForOf = n), (this.index = o), (this.count = r)
				}
				get first() {
					return 0 === this.index
				}
				get last() {
					return this.index === this.count - 1
				}
				get even() {
					return this.index % 2 == 0
				}
				get odd() {
					return !this.even
				}
			}
			let Ht = (() => {
				class e {
					set ngForOf(n) {
						;(this._ngForOf = n), (this._ngForOfDirty = !0)
					}
					set ngForTrackBy(n) {
						this._trackByFn = n
					}
					get ngForTrackBy() {
						return this._trackByFn
					}
					constructor(n, o, r) {
						;(this._viewContainer = n),
							(this._template = o),
							(this._differs = r),
							(this._ngForOf = null),
							(this._ngForOfDirty = !0),
							(this._differ = null)
					}
					set ngForTemplate(n) {
						n && (this._template = n)
					}
					ngDoCheck() {
						if (this._ngForOfDirty) {
							this._ngForOfDirty = !1
							const n = this._ngForOf
							!this._differ && n && (this._differ = this._differs.find(n).create(this.ngForTrackBy))
						}
						if (this._differ) {
							const n = this._differ.diff(this._ngForOf)
							n && this._applyChanges(n)
						}
					}
					_applyChanges(n) {
						const o = this._viewContainer
						n.forEachOperation((r, i, s) => {
							if (null == r.previousIndex)
								o.createEmbeddedView(
									this._template,
									new mI(r.item, this._ngForOf, -1, -1),
									null === s ? void 0 : s
								)
							else if (null == s) o.remove(null === i ? void 0 : i)
							else if (null !== i) {
								const a = o.get(i)
								o.move(a, s), ly(a, r)
							}
						})
						for (let r = 0, i = o.length; r < i; r++) {
							const a = o.get(r).context
							;(a.index = r), (a.count = i), (a.ngForOf = this._ngForOf)
						}
						n.forEachIdentityChange((r) => {
							ly(o.get(r.currentIndex), r)
						})
					}
					static ngTemplateContextGuard(n, o) {
						return !0
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(A(Ot), A(sn), A(ia))
					}),
					(e.ɵdir = Ve({
						type: e,
						selectors: [['', 'ngFor', '', 'ngForOf', '']],
						inputs: {ngForOf: 'ngForOf', ngForTrackBy: 'ngForTrackBy', ngForTemplate: 'ngForTemplate'},
						standalone: !0,
					})),
					e
				)
			})()
			function ly(e, t) {
				e.context.$implicit = t.item
			}
			let ze = (() => {
				class e {
					constructor(n, o) {
						;(this._viewContainer = n),
							(this._context = new _I()),
							(this._thenTemplateRef = null),
							(this._elseTemplateRef = null),
							(this._thenViewRef = null),
							(this._elseViewRef = null),
							(this._thenTemplateRef = o)
					}
					set ngIf(n) {
						;(this._context.$implicit = this._context.ngIf = n), this._updateView()
					}
					set ngIfThen(n) {
						uy('ngIfThen', n), (this._thenTemplateRef = n), (this._thenViewRef = null), this._updateView()
					}
					set ngIfElse(n) {
						uy('ngIfElse', n), (this._elseTemplateRef = n), (this._elseViewRef = null), this._updateView()
					}
					_updateView() {
						this._context.$implicit
							? this._thenViewRef ||
							  (this._viewContainer.clear(),
							  (this._elseViewRef = null),
							  this._thenTemplateRef &&
									(this._thenViewRef = this._viewContainer.createEmbeddedView(
										this._thenTemplateRef,
										this._context
									)))
							: this._elseViewRef ||
							  (this._viewContainer.clear(),
							  (this._thenViewRef = null),
							  this._elseTemplateRef &&
									(this._elseViewRef = this._viewContainer.createEmbeddedView(
										this._elseTemplateRef,
										this._context
									)))
					}
					static ngTemplateContextGuard(n, o) {
						return !0
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(A(Ot), A(sn))
					}),
					(e.ɵdir = Ve({
						type: e,
						selectors: [['', 'ngIf', '']],
						inputs: {ngIf: 'ngIf', ngIfThen: 'ngIfThen', ngIfElse: 'ngIfElse'},
						standalone: !0,
					})),
					e
				)
			})()
			class _I {
				constructor() {
					;(this.$implicit = null), (this.ngIf = null)
				}
			}
			function uy(e, t) {
				if (t && !t.createEmbeddedView) throw new Error(`${e} must be a TemplateRef, but received '${we(t)}'.`)
			}
			let nt = (() => {
				class e {}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵmod = pe({type: e})),
					(e.ɵinj = ge({})),
					e
				)
			})()
			function py(e) {
				return 'server' === e
			}
			let qI = (() => {
				class e {}
				return (e.ɵprov = N({token: e, providedIn: 'root', factory: () => new GI(R(ht), window)})), e
			})()
			class GI {
				constructor(t, n) {
					;(this.document = t), (this.window = n), (this.offset = () => [0, 0])
				}
				setOffset(t) {
					this.offset = Array.isArray(t) ? () => t : t
				}
				getScrollPosition() {
					return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
				}
				scrollToPosition(t) {
					this.supportsScrolling() && this.window.scrollTo(t[0], t[1])
				}
				scrollToAnchor(t) {
					if (!this.supportsScrolling()) return
					const n = (function WI(e, t) {
						const n = e.getElementById(t) || e.getElementsByName(t)[0]
						if (n) return n
						if (
							'function' == typeof e.createTreeWalker &&
							e.body &&
							'function' == typeof e.body.attachShadow
						) {
							const o = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT)
							let r = o.currentNode
							for (; r; ) {
								const i = r.shadowRoot
								if (i) {
									const s = i.getElementById(t) || i.querySelector(`[name="${t}"]`)
									if (s) return s
								}
								r = o.nextNode()
							}
						}
						return null
					})(this.document, t)
					n && (this.scrollToElement(n), n.focus())
				}
				setHistoryScrollRestoration(t) {
					if (this.supportScrollRestoration()) {
						const n = this.window.history
						n && n.scrollRestoration && (n.scrollRestoration = t)
					}
				}
				scrollToElement(t) {
					const n = t.getBoundingClientRect(),
						o = n.left + this.window.pageXOffset,
						r = n.top + this.window.pageYOffset,
						i = this.offset()
					this.window.scrollTo(o - i[0], r - i[1])
				}
				supportScrollRestoration() {
					try {
						if (!this.supportsScrolling()) return !1
						const t = hy(this.window.history) || hy(Object.getPrototypeOf(this.window.history))
						return !(!t || (!t.writable && !t.set))
					} catch {
						return !1
					}
				}
				supportsScrolling() {
					try {
						return !!this.window && !!this.window.scrollTo && 'pageXOffset' in this.window
					} catch {
						return !1
					}
				}
			}
			function hy(e) {
				return Object.getOwnPropertyDescriptor(e, 'scrollRestoration')
			}
			class _T extends MS {
				constructor() {
					super(...arguments), (this.supportsDOMEvents = !0)
				}
			}
			class Xu extends _T {
				static makeCurrent() {
					!(function xS(e) {
						Ru || (Ru = e)
					})(new Xu())
				}
				onAndCancel(t, n, o) {
					return (
						t.addEventListener(n, o),
						() => {
							t.removeEventListener(n, o)
						}
					)
				}
				dispatchEvent(t, n) {
					t.dispatchEvent(n)
				}
				remove(t) {
					t.parentNode && t.parentNode.removeChild(t)
				}
				createElement(t, n) {
					return (n = n || this.getDefaultDocument()).createElement(t)
				}
				createHtmlDocument() {
					return document.implementation.createHTMLDocument('fakeTitle')
				}
				getDefaultDocument() {
					return document
				}
				isElementNode(t) {
					return t.nodeType === Node.ELEMENT_NODE
				}
				isShadowRoot(t) {
					return t instanceof DocumentFragment
				}
				getGlobalEventTarget(t, n) {
					return 'window' === n ? window : 'document' === n ? t : 'body' === n ? t.body : null
				}
				getBaseHref(t) {
					const n = (function vT() {
						return (ci = ci || document.querySelector('base')), ci ? ci.getAttribute('href') : null
					})()
					return null == n
						? null
						: (function yT(e) {
								;(ya = ya || document.createElement('a')), ya.setAttribute('href', e)
								const t = ya.pathname
								return '/' === t.charAt(0) ? t : `/${t}`
						  })(n)
				}
				resetBaseElement() {
					ci = null
				}
				getUserAgent() {
					return window.navigator.userAgent
				}
				getCookie(t) {
					return (function gI(e, t) {
						t = encodeURIComponent(t)
						for (const n of e.split(';')) {
							const o = n.indexOf('='),
								[r, i] = -1 == o ? [n, ''] : [n.slice(0, o), n.slice(o + 1)]
							if (r.trim() === t) return decodeURIComponent(i)
						}
						return null
					})(document.cookie, t)
				}
			}
			let ya,
				ci = null,
				CT = (() => {
					class e {
						build() {
							return new XMLHttpRequest()
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵprov = N({token: e, factory: e.ɵfac})),
						e
					)
				})()
			const ed = new T('EventManagerPlugins')
			let by = (() => {
				class e {
					constructor(n, o) {
						;(this._zone = o),
							(this._eventNameToPlugin = new Map()),
							n.forEach((r) => {
								r.manager = this
							}),
							(this._plugins = n.slice().reverse())
					}
					addEventListener(n, o, r) {
						return this._findPluginFor(o).addEventListener(n, o, r)
					}
					getZone() {
						return this._zone
					}
					_findPluginFor(n) {
						let o = this._eventNameToPlugin.get(n)
						if (o) return o
						if (((o = this._plugins.find((i) => i.supports(n))), !o)) throw new O(5101, !1)
						return this._eventNameToPlugin.set(n, o), o
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(R(ed), R(_e))
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac})),
					e
				)
			})()
			class Cy {
				constructor(t) {
					this._doc = t
				}
			}
			const td = 'ng-app-id'
			let xy = (() => {
				class e {
					constructor(n, o, r, i = {}) {
						;(this.doc = n),
							(this.appId = o),
							(this.nonce = r),
							(this.platformId = i),
							(this.styleRef = new Map()),
							(this.hostNodes = new Set()),
							(this.styleNodesInDOM = this.collectServerRenderedStyles()),
							(this.platformIsServer = py(i)),
							this.resetHostNodes()
					}
					addStyles(n) {
						for (const o of n) 1 === this.changeUsageCount(o, 1) && this.onStyleAdded(o)
					}
					removeStyles(n) {
						for (const o of n) this.changeUsageCount(o, -1) <= 0 && this.onStyleRemoved(o)
					}
					ngOnDestroy() {
						const n = this.styleNodesInDOM
						n && (n.forEach((o) => o.remove()), n.clear())
						for (const o of this.getAllStyles()) this.onStyleRemoved(o)
						this.resetHostNodes()
					}
					addHost(n) {
						this.hostNodes.add(n)
						for (const o of this.getAllStyles()) this.addStyleToHost(n, o)
					}
					removeHost(n) {
						this.hostNodes.delete(n)
					}
					getAllStyles() {
						return this.styleRef.keys()
					}
					onStyleAdded(n) {
						for (const o of this.hostNodes) this.addStyleToHost(o, n)
					}
					onStyleRemoved(n) {
						const o = this.styleRef
						o.get(n)?.elements?.forEach((r) => r.remove()), o.delete(n)
					}
					collectServerRenderedStyles() {
						const n = this.doc.head?.querySelectorAll(`style[${td}="${this.appId}"]`)
						if (n?.length) {
							const o = new Map()
							return (
								n.forEach((r) => {
									null != r.textContent && o.set(r.textContent, r)
								}),
								o
							)
						}
						return null
					}
					changeUsageCount(n, o) {
						const r = this.styleRef
						if (r.has(n)) {
							const i = r.get(n)
							return (i.usage += o), i.usage
						}
						return r.set(n, {usage: o, elements: []}), o
					}
					getStyleElement(n, o) {
						const r = this.styleNodesInDOM,
							i = r?.get(o)
						if (i?.parentNode === n) return r.delete(o), i.removeAttribute(td), i
						{
							const s = this.doc.createElement('style')
							return (
								this.nonce && s.setAttribute('nonce', this.nonce),
								(s.textContent = o),
								this.platformIsServer && s.setAttribute(td, this.appId),
								s
							)
						}
					}
					addStyleToHost(n, o) {
						const r = this.getStyleElement(n, o)
						n.appendChild(r)
						const i = this.styleRef,
							s = i.get(o)?.elements
						s ? s.push(r) : i.set(o, {elements: [r], usage: 1})
					}
					resetHostNodes() {
						const n = this.hostNodes
						n.clear(), n.add(this.doc.head)
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(R(ht), R(Ps), R(kp, 8), R(wo))
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac})),
					e
				)
			})()
			const nd = {
					svg: 'http://www.w3.org/2000/svg',
					xhtml: 'http://www.w3.org/1999/xhtml',
					xlink: 'http://www.w3.org/1999/xlink',
					xml: 'http://www.w3.org/XML/1998/namespace',
					xmlns: 'http://www.w3.org/2000/xmlns/',
					math: 'http://www.w3.org/1998/MathML/',
				},
				od = /%COMP%/g,
				PT = new T('RemoveStylesOnCompDestroy', {providedIn: 'root', factory: () => !1})
			function wy(e, t) {
				return t.map((n) => n.replace(od, e))
			}
			let Py = (() => {
				class e {
					constructor(n, o, r, i, s, a, c, l = null) {
						;(this.eventManager = n),
							(this.sharedStylesHost = o),
							(this.appId = r),
							(this.removeStylesOnCompDestroy = i),
							(this.doc = s),
							(this.platformId = a),
							(this.ngZone = c),
							(this.nonce = l),
							(this.rendererByCompId = new Map()),
							(this.platformIsServer = py(a)),
							(this.defaultRenderer = new rd(n, s, c, this.platformIsServer))
					}
					createRenderer(n, o) {
						if (!n || !o) return this.defaultRenderer
						this.platformIsServer &&
							o.encapsulation === bt.ShadowDom &&
							(o = {...o, encapsulation: bt.Emulated})
						const r = this.getOrCreateRenderer(n, o)
						return r instanceof Dy ? r.applyToHost(n) : r instanceof id && r.applyStyles(), r
					}
					getOrCreateRenderer(n, o) {
						const r = this.rendererByCompId
						let i = r.get(o.id)
						if (!i) {
							const s = this.doc,
								a = this.ngZone,
								c = this.eventManager,
								l = this.sharedStylesHost,
								u = this.removeStylesOnCompDestroy,
								d = this.platformIsServer
							switch (o.encapsulation) {
								case bt.Emulated:
									i = new Dy(c, l, o, this.appId, u, s, a, d)
									break
								case bt.ShadowDom:
									return new ST(c, l, n, o, s, a, this.nonce, d)
								default:
									i = new id(c, l, o, u, s, a, d)
							}
							r.set(o.id, i)
						}
						return i
					}
					ngOnDestroy() {
						this.rendererByCompId.clear()
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(R(by), R(xy), R(Ps), R(PT), R(ht), R(wo), R(_e), R(kp))
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac})),
					e
				)
			})()
			class rd {
				constructor(t, n, o, r) {
					;(this.eventManager = t),
						(this.doc = n),
						(this.ngZone = o),
						(this.platformIsServer = r),
						(this.data = Object.create(null)),
						(this.destroyNode = null)
				}
				destroy() {}
				createElement(t, n) {
					return n ? this.doc.createElementNS(nd[n] || n, t) : this.doc.createElement(t)
				}
				createComment(t) {
					return this.doc.createComment(t)
				}
				createText(t) {
					return this.doc.createTextNode(t)
				}
				appendChild(t, n) {
					;(Oy(t) ? t.content : t).appendChild(n)
				}
				insertBefore(t, n, o) {
					t && (Oy(t) ? t.content : t).insertBefore(n, o)
				}
				removeChild(t, n) {
					t && t.removeChild(n)
				}
				selectRootElement(t, n) {
					let o = 'string' == typeof t ? this.doc.querySelector(t) : t
					if (!o) throw new O(-5104, !1)
					return n || (o.textContent = ''), o
				}
				parentNode(t) {
					return t.parentNode
				}
				nextSibling(t) {
					return t.nextSibling
				}
				setAttribute(t, n, o, r) {
					if (r) {
						n = r + ':' + n
						const i = nd[r]
						i ? t.setAttributeNS(i, n, o) : t.setAttribute(n, o)
					} else t.setAttribute(n, o)
				}
				removeAttribute(t, n, o) {
					if (o) {
						const r = nd[o]
						r ? t.removeAttributeNS(r, n) : t.removeAttribute(`${o}:${n}`)
					} else t.removeAttribute(n)
				}
				addClass(t, n) {
					t.classList.add(n)
				}
				removeClass(t, n) {
					t.classList.remove(n)
				}
				setStyle(t, n, o, r) {
					r & (yn.DashCase | yn.Important)
						? t.style.setProperty(n, o, r & yn.Important ? 'important' : '')
						: (t.style[n] = o)
				}
				removeStyle(t, n, o) {
					o & yn.DashCase ? t.style.removeProperty(n) : (t.style[n] = '')
				}
				setProperty(t, n, o) {
					t[n] = o
				}
				setValue(t, n) {
					t.nodeValue = n
				}
				listen(t, n, o) {
					if ('string' == typeof t && !(t = qo().getGlobalEventTarget(this.doc, t)))
						throw new Error(`Unsupported event target ${t} for event ${n}`)
					return this.eventManager.addEventListener(t, n, this.decoratePreventDefault(o))
				}
				decoratePreventDefault(t) {
					return (n) => {
						if ('__ngUnwrap__' === n) return t
						!1 === (this.platformIsServer ? this.ngZone.runGuarded(() => t(n)) : t(n)) && n.preventDefault()
					}
				}
			}
			function Oy(e) {
				return 'TEMPLATE' === e.tagName && void 0 !== e.content
			}
			class ST extends rd {
				constructor(t, n, o, r, i, s, a, c) {
					super(t, i, s, c),
						(this.sharedStylesHost = n),
						(this.hostEl = o),
						(this.shadowRoot = o.attachShadow({mode: 'open'})),
						this.sharedStylesHost.addHost(this.shadowRoot)
					const l = wy(r.id, r.styles)
					for (const u of l) {
						const d = document.createElement('style')
						a && d.setAttribute('nonce', a), (d.textContent = u), this.shadowRoot.appendChild(d)
					}
				}
				nodeOrShadowRoot(t) {
					return t === this.hostEl ? this.shadowRoot : t
				}
				appendChild(t, n) {
					return super.appendChild(this.nodeOrShadowRoot(t), n)
				}
				insertBefore(t, n, o) {
					return super.insertBefore(this.nodeOrShadowRoot(t), n, o)
				}
				removeChild(t, n) {
					return super.removeChild(this.nodeOrShadowRoot(t), n)
				}
				parentNode(t) {
					return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
				}
				destroy() {
					this.sharedStylesHost.removeHost(this.shadowRoot)
				}
			}
			class id extends rd {
				constructor(t, n, o, r, i, s, a, c) {
					super(t, i, s, a),
						(this.sharedStylesHost = n),
						(this.removeStylesOnCompDestroy = r),
						(this.styles = c ? wy(c, o.styles) : o.styles)
				}
				applyStyles() {
					this.sharedStylesHost.addStyles(this.styles)
				}
				destroy() {
					this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles)
				}
			}
			class Dy extends id {
				constructor(t, n, o, r, i, s, a, c) {
					const l = r + '-' + o.id
					super(t, n, o, i, s, a, c, l),
						(this.contentAttr = (function OT(e) {
							return '_ngcontent-%COMP%'.replace(od, e)
						})(l)),
						(this.hostAttr = (function DT(e) {
							return '_nghost-%COMP%'.replace(od, e)
						})(l))
				}
				applyToHost(t) {
					this.applyStyles(), this.setAttribute(t, this.hostAttr, '')
				}
				createElement(t, n) {
					const o = super.createElement(t, n)
					return super.setAttribute(o, this.contentAttr, ''), o
				}
			}
			let IT = (() => {
				class e extends Cy {
					constructor(n) {
						super(n)
					}
					supports(n) {
						return !0
					}
					addEventListener(n, o, r) {
						return n.addEventListener(o, r, !1), () => this.removeEventListener(n, o, r)
					}
					removeEventListener(n, o, r) {
						return n.removeEventListener(o, r)
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(R(ht))
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac})),
					e
				)
			})()
			const Ey = ['alt', 'control', 'meta', 'shift'],
				TT = {
					'\b': 'Backspace',
					'\t': 'Tab',
					'\x7f': 'Delete',
					'\x1b': 'Escape',
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
				kT = {alt: (e) => e.altKey, control: (e) => e.ctrlKey, meta: (e) => e.metaKey, shift: (e) => e.shiftKey}
			let RT = (() => {
				class e extends Cy {
					constructor(n) {
						super(n)
					}
					supports(n) {
						return null != e.parseEventName(n)
					}
					addEventListener(n, o, r) {
						const i = e.parseEventName(o),
							s = e.eventCallback(i.fullKey, r, this.manager.getZone())
						return this.manager.getZone().runOutsideAngular(() => qo().onAndCancel(n, i.domEventName, s))
					}
					static parseEventName(n) {
						const o = n.toLowerCase().split('.'),
							r = o.shift()
						if (0 === o.length || ('keydown' !== r && 'keyup' !== r)) return null
						const i = e._normalizeKey(o.pop())
						let s = '',
							a = o.indexOf('code')
						if (
							(a > -1 && (o.splice(a, 1), (s = 'code.')),
							Ey.forEach((l) => {
								const u = o.indexOf(l)
								u > -1 && (o.splice(u, 1), (s += l + '.'))
							}),
							(s += i),
							0 != o.length || 0 === i.length)
						)
							return null
						const c = {}
						return (c.domEventName = r), (c.fullKey = s), c
					}
					static matchEventFullKeyCode(n, o) {
						let r = TT[n.key] || n.key,
							i = ''
						return (
							o.indexOf('code.') > -1 && ((r = n.code), (i = 'code.')),
							!(null == r || !r) &&
								((r = r.toLowerCase()),
								' ' === r ? (r = 'space') : '.' === r && (r = 'dot'),
								Ey.forEach((s) => {
									s !== r && (0, kT[s])(n) && (i += s + '.')
								}),
								(i += r),
								i === o)
						)
					}
					static eventCallback(n, o, r) {
						return (i) => {
							e.matchEventFullKeyCode(i, n) && r.runGuarded(() => o(i))
						}
					}
					static _normalizeKey(n) {
						return 'esc' === n ? 'escape' : n
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(R(ht))
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac})),
					e
				)
			})()
			const FT = Pv(uS, 'browser', [
					{provide: wo, useValue: 'browser'},
					{
						provide: Tp,
						useValue: function AT() {
							Xu.makeCurrent()
						},
						multi: !0,
					},
					{
						provide: ht,
						useFactory: function LT() {
							return (
								(function jx(e) {
									Qc = e
								})(document),
								document
							)
						},
						deps: [],
					},
				]),
				jT = new T(''),
				Ty = [
					{
						provide: ta,
						useClass: class bT {
							addToWindow(t) {
								;(se.getAngularTestability = (o, r = !0) => {
									const i = t.findTestabilityInTree(o, r)
									if (null == i) throw new O(5103, !1)
									return i
								}),
									(se.getAllAngularTestabilities = () => t.getAllTestabilities()),
									(se.getAllAngularRootElements = () => t.getAllRootElements()),
									se.frameworkStabilizers || (se.frameworkStabilizers = []),
									se.frameworkStabilizers.push((o) => {
										const r = se.getAllAngularTestabilities()
										let i = r.length,
											s = !1
										const a = function (c) {
											;(s = s || c), i--, 0 == i && o(s)
										}
										r.forEach((c) => {
											c.whenStable(a)
										})
									})
							}
							findTestabilityInTree(t, n, o) {
								return null == n
									? null
									: t.getTestability(n) ??
											(o
												? qo().isShadowRoot(n)
													? this.findTestabilityInTree(t, n.host, !0)
													: this.findTestabilityInTree(t, n.parentElement, !0)
												: null)
							}
						},
						deps: [],
					},
					{provide: bv, useClass: yu, deps: [_e, bu, ta]},
					{provide: yu, useClass: yu, deps: [_e, bu, ta]},
				],
				ky = [
					{provide: rl, useValue: 'root'},
					{
						provide: zn,
						useFactory: function NT() {
							return new zn()
						},
						deps: [],
					},
					{provide: ed, useClass: IT, multi: !0, deps: [ht, _e, wo]},
					{provide: ed, useClass: RT, multi: !0, deps: [ht]},
					Py,
					xy,
					by,
					{provide: $p, useExisting: Py},
					{provide: class ZI {}, useClass: CT, deps: []},
					[],
				]
			let zT = (() => {
					class e {
						constructor(n) {}
						static withServerTransition(n) {
							return {ngModule: e, providers: [{provide: Ps, useValue: n.appId}]}
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(R(jT, 12))
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({providers: [...ky, ...Ty], imports: [nt, dS]})),
						e
					)
				})(),
				Ry = (() => {
					class e {
						constructor(n) {
							this._doc = n
						}
						getTitle() {
							return this._doc.title
						}
						setTitle(n) {
							this._doc.title = n || ''
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(R(ht))
						}),
						(e.ɵprov = N({
							token: e,
							factory: function (n) {
								let o = null
								return (
									(o = n
										? new n()
										: (function VT() {
												return new Ry(R(ht))
										  })()),
									o
								)
							},
							providedIn: 'root',
						})),
						e
					)
				})()
			typeof window < 'u' && window
			const {isArray: WT} = Array,
				{getPrototypeOf: ZT, prototype: QT, keys: YT} = Object
			const {isArray: XT} = Array
			function ad(...e) {
				const t = lr(e),
					n = (function z0(e) {
						return re(Wa(e)) ? e.pop() : void 0
					})(e),
					{args: o, keys: r} = (function KT(e) {
						if (1 === e.length) {
							const t = e[0]
							if (WT(t)) return {args: t, keys: null}
							if (
								(function JT(e) {
									return e && 'object' == typeof e && ZT(e) === QT
								})(t)
							) {
								const n = YT(t)
								return {args: n.map((o) => t[o]), keys: n}
							}
						}
						return {args: e, keys: null}
					})(e)
				if (0 === o.length) return ke([], t)
				const i = new Me(
					(function ok(e, t, n = gn) {
						return (o) => {
							Fy(
								t,
								() => {
									const {length: r} = e,
										i = new Array(r)
									let s = r,
										a = r
									for (let c = 0; c < r; c++)
										Fy(
											t,
											() => {
												const l = ke(e[c], t)
												let u = !1
												l.subscribe(
													Se(
														o,
														(d) => {
															;(i[c] = d), u || ((u = !0), a--), a || o.next(n(i.slice()))
														},
														() => {
															--s || o.complete()
														}
													)
												)
											},
											o
										)
								},
								o
							)
						}
					})(
						o,
						t,
						r
							? (s) =>
									(function nk(e, t) {
										return e.reduce((n, o, r) => ((n[o] = t[r]), n), {})
									})(r, s)
							: gn
					)
				)
				return n
					? i.pipe(
							(function tk(e) {
								return le((t) =>
									(function ek(e, t) {
										return XT(t) ? e(...t) : e(t)
									})(e, t)
								)
							})(n)
					  )
					: i
			}
			function Fy(e, t, n) {
				e ? Zt(n, e, t) : t()
			}
			const ba = sr(
				(e) =>
					function () {
						e(this), (this.name = 'EmptyError'), (this.message = 'no elements in sequence')
					}
			)
			function cd(...e) {
				return (function rk() {
					return Jn(1)
				})()(ke(e, lr(e)))
			}
			function jy(e) {
				return new Me((t) => {
					yt(e()).subscribe(t)
				})
			}
			function li(e, t) {
				const n = re(e) ? e : () => e,
					o = (r) => r.error(n())
				return new Me(t ? (r) => t.schedule(o, 0, r) : o)
			}
			function ld() {
				return Ee((e, t) => {
					let n = null
					e._refCount++
					const o = Se(t, void 0, void 0, void 0, () => {
						if (!e || e._refCount <= 0 || 0 < --e._refCount) return void (n = null)
						const r = e._connection,
							i = n
						;(n = null), r && (!i || r === i) && r.unsubscribe(), t.unsubscribe()
					})
					e.subscribe(o), o.closed || (n = e.connect())
				})
			}
			class zy extends Me {
				constructor(t, n) {
					super(),
						(this.source = t),
						(this.subjectFactory = n),
						(this._subject = null),
						(this._refCount = 0),
						(this._connection = null),
						Vd(t) && (this.lift = t.lift)
				}
				_subscribe(t) {
					return this.getSubject().subscribe(t)
				}
				getSubject() {
					const t = this._subject
					return (!t || t.isStopped) && (this._subject = this.subjectFactory()), this._subject
				}
				_teardown() {
					this._refCount = 0
					const {_connection: t} = this
					;(this._subject = this._connection = null), t?.unsubscribe()
				}
				connect() {
					let t = this._connection
					if (!t) {
						t = this._connection = new ut()
						const n = this.getSubject()
						t.add(
							this.source.subscribe(
								Se(
									n,
									void 0,
									() => {
										this._teardown(), n.complete()
									},
									(o) => {
										this._teardown(), n.error(o)
									},
									() => this._teardown()
								)
							)
						),
							t.closed && ((this._connection = null), (t = ut.EMPTY))
					}
					return t
				}
				refCount() {
					return ld()(this)
				}
			}
			function Wo(e) {
				return e <= 0
					? () => Tt
					: Ee((t, n) => {
							let o = 0
							t.subscribe(
								Se(n, (r) => {
									++o <= e && (n.next(r), e <= o && n.complete())
								})
							)
					  })
			}
			function Pn(e, t) {
				return Ee((n, o) => {
					let r = 0
					n.subscribe(Se(o, (i) => e.call(t, i, r++) && o.next(i)))
				})
			}
			function Ca(e) {
				return Ee((t, n) => {
					let o = !1
					t.subscribe(
						Se(
							n,
							(r) => {
								;(o = !0), n.next(r)
							},
							() => {
								o || n.next(e), n.complete()
							}
						)
					)
				})
			}
			function $y(e = sk) {
				return Ee((t, n) => {
					let o = !1
					t.subscribe(
						Se(
							n,
							(r) => {
								;(o = !0), n.next(r)
							},
							() => (o ? n.complete() : n.error(e()))
						)
					)
				})
			}
			function sk() {
				return new ba()
			}
			function Wn(e, t) {
				const n = arguments.length >= 2
				return (o) => o.pipe(e ? Pn((r, i) => e(r, i, o)) : gn, Wo(1), n ? Ca(t) : $y(() => new ba()))
			}
			function ui(e, t) {
				return re(t) ? Te(e, t, 1) : Te(e, 1)
			}
			function Ze(e, t, n) {
				const o = re(e) || t || n ? {next: e, error: t, complete: n} : e
				return o
					? Ee((r, i) => {
							var s
							null === (s = o.subscribe) || void 0 === s || s.call(o)
							let a = !0
							r.subscribe(
								Se(
									i,
									(c) => {
										var l
										null === (l = o.next) || void 0 === l || l.call(o, c), i.next(c)
									},
									() => {
										var c
										;(a = !1), null === (c = o.complete) || void 0 === c || c.call(o), i.complete()
									},
									(c) => {
										var l
										;(a = !1), null === (l = o.error) || void 0 === l || l.call(o, c), i.error(c)
									},
									() => {
										var c, l
										a && (null === (c = o.unsubscribe) || void 0 === c || c.call(o)),
											null === (l = o.finalize) || void 0 === l || l.call(o)
									}
								)
							)
					  })
					: gn
			}
			function Zn(e) {
				return Ee((t, n) => {
					let i,
						o = null,
						r = !1
					;(o = t.subscribe(
						Se(n, void 0, void 0, (s) => {
							;(i = yt(e(s, Zn(e)(t)))), o ? (o.unsubscribe(), (o = null), i.subscribe(n)) : (r = !0)
						})
					)),
						r && (o.unsubscribe(), (o = null), i.subscribe(n))
				})
			}
			function ud(e) {
				return e <= 0
					? () => Tt
					: Ee((t, n) => {
							let o = []
							t.subscribe(
								Se(
									n,
									(r) => {
										o.push(r), e < o.length && o.shift()
									},
									() => {
										for (const r of o) n.next(r)
										n.complete()
									},
									void 0,
									() => {
										o = null
									}
								)
							)
					  })
			}
			function dd(e) {
				return Ee((t, n) => {
					try {
						t.subscribe(n)
					} finally {
						n.add(e)
					}
				})
			}
			const q = 'primary',
				di = Symbol('RouteTitle')
			class dk {
				constructor(t) {
					this.params = t || {}
				}
				has(t) {
					return Object.prototype.hasOwnProperty.call(this.params, t)
				}
				get(t) {
					if (this.has(t)) {
						const n = this.params[t]
						return Array.isArray(n) ? n[0] : n
					}
					return null
				}
				getAll(t) {
					if (this.has(t)) {
						const n = this.params[t]
						return Array.isArray(n) ? n : [n]
					}
					return []
				}
				get keys() {
					return Object.keys(this.params)
				}
			}
			function Zo(e) {
				return new dk(e)
			}
			function fk(e, t, n) {
				const o = n.path.split('/')
				if (o.length > e.length || ('full' === n.pathMatch && (t.hasChildren() || o.length < e.length)))
					return null
				const r = {}
				for (let i = 0; i < o.length; i++) {
					const s = o[i],
						a = e[i]
					if (s.startsWith(':')) r[s.substring(1)] = a
					else if (s !== a.path) return null
				}
				return {consumed: e.slice(0, o.length), posParams: r}
			}
			function qt(e, t) {
				const n = e ? Object.keys(e) : void 0,
					o = t ? Object.keys(t) : void 0
				if (!n || !o || n.length != o.length) return !1
				let r
				for (let i = 0; i < n.length; i++) if (((r = n[i]), !Vy(e[r], t[r]))) return !1
				return !0
			}
			function Vy(e, t) {
				if (Array.isArray(e) && Array.isArray(t)) {
					if (e.length !== t.length) return !1
					const n = [...e].sort(),
						o = [...t].sort()
					return n.every((r, i) => o[i] === r)
				}
				return e === t
			}
			function By(e) {
				return e.length > 0 ? e[e.length - 1] : null
			}
			function On(e) {
				return (function GT(e) {
					return !!e && (e instanceof Me || (re(e.lift) && re(e.subscribe)))
				})(e)
					? e
					: Gs(e)
					? ke(Promise.resolve(e))
					: F(e)
			}
			const pk = {
					exact: function qy(e, t, n) {
						if (
							!Qn(e.segments, t.segments) ||
							!xa(e.segments, t.segments, n) ||
							e.numberOfChildren !== t.numberOfChildren
						)
							return !1
						for (const o in t.children)
							if (!e.children[o] || !qy(e.children[o], t.children[o], n)) return !1
						return !0
					},
					subset: Gy,
				},
				Uy = {
					exact: function hk(e, t) {
						return qt(e, t)
					},
					subset: function mk(e, t) {
						return (
							Object.keys(t).length <= Object.keys(e).length &&
							Object.keys(t).every((n) => Vy(e[n], t[n]))
						)
					},
					ignored: () => !0,
				}
			function Hy(e, t, n) {
				return (
					pk[n.paths](e.root, t.root, n.matrixParams) &&
					Uy[n.queryParams](e.queryParams, t.queryParams) &&
					!('exact' === n.fragment && e.fragment !== t.fragment)
				)
			}
			function Gy(e, t, n) {
				return Wy(e, t, t.segments, n)
			}
			function Wy(e, t, n, o) {
				if (e.segments.length > n.length) {
					const r = e.segments.slice(0, n.length)
					return !(!Qn(r, n) || t.hasChildren() || !xa(r, n, o))
				}
				if (e.segments.length === n.length) {
					if (!Qn(e.segments, n) || !xa(e.segments, n, o)) return !1
					for (const r in t.children) if (!e.children[r] || !Gy(e.children[r], t.children[r], o)) return !1
					return !0
				}
				{
					const r = n.slice(0, e.segments.length),
						i = n.slice(e.segments.length)
					return !!(Qn(e.segments, r) && xa(e.segments, r, o) && e.children[q]) && Wy(e.children[q], t, i, o)
				}
			}
			function xa(e, t, n) {
				return t.every((o, r) => Uy[n](e[r].parameters, o.parameters))
			}
			class Qo {
				constructor(t = new oe([], {}), n = {}, o = null) {
					;(this.root = t), (this.queryParams = n), (this.fragment = o)
				}
				get queryParamMap() {
					return this._queryParamMap || (this._queryParamMap = Zo(this.queryParams)), this._queryParamMap
				}
				toString() {
					return yk.serialize(this)
				}
			}
			class oe {
				constructor(t, n) {
					;(this.segments = t),
						(this.children = n),
						(this.parent = null),
						Object.values(n).forEach((o) => (o.parent = this))
				}
				hasChildren() {
					return this.numberOfChildren > 0
				}
				get numberOfChildren() {
					return Object.keys(this.children).length
				}
				toString() {
					return Ma(this)
				}
			}
			class fi {
				constructor(t, n) {
					;(this.path = t), (this.parameters = n)
				}
				get parameterMap() {
					return this._parameterMap || (this._parameterMap = Zo(this.parameters)), this._parameterMap
				}
				toString() {
					return Yy(this)
				}
			}
			function Qn(e, t) {
				return e.length === t.length && e.every((n, o) => n.path === t[o].path)
			}
			let gi = (() => {
				class e {}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵprov = N({
						token: e,
						factory: function () {
							return new fd()
						},
						providedIn: 'root',
					})),
					e
				)
			})()
			class fd {
				parse(t) {
					const n = new Ik(t)
					return new Qo(n.parseRootSegment(), n.parseQueryParams(), n.parseFragment())
				}
				serialize(t) {
					const n = `/${pi(t.root, !0)}`,
						o = (function xk(e) {
							const t = Object.keys(e)
								.map((n) => {
									const o = e[n]
									return Array.isArray(o)
										? o.map((r) => `${wa(n)}=${wa(r)}`).join('&')
										: `${wa(n)}=${wa(o)}`
								})
								.filter((n) => !!n)
							return t.length ? `?${t.join('&')}` : ''
						})(t.queryParams)
					return `${n}${o}${
						'string' == typeof t.fragment
							? `#${(function bk(e) {
									return encodeURI(e)
							  })(t.fragment)}`
							: ''
					}`
				}
			}
			const yk = new fd()
			function Ma(e) {
				return e.segments.map((t) => Yy(t)).join('/')
			}
			function pi(e, t) {
				if (!e.hasChildren()) return Ma(e)
				if (t) {
					const n = e.children[q] ? pi(e.children[q], !1) : '',
						o = []
					return (
						Object.entries(e.children).forEach(([r, i]) => {
							r !== q && o.push(`${r}:${pi(i, !1)}`)
						}),
						o.length > 0 ? `${n}(${o.join('//')})` : n
					)
				}
				{
					const n = (function vk(e, t) {
						let n = []
						return (
							Object.entries(e.children).forEach(([o, r]) => {
								o === q && (n = n.concat(t(r, o)))
							}),
							Object.entries(e.children).forEach(([o, r]) => {
								o !== q && (n = n.concat(t(r, o)))
							}),
							n
						)
					})(e, (o, r) => (r === q ? [pi(e.children[q], !1)] : [`${r}:${pi(o, !1)}`]))
					return 1 === Object.keys(e.children).length && null != e.children[q]
						? `${Ma(e)}/${n[0]}`
						: `${Ma(e)}/(${n.join('//')})`
				}
			}
			function Zy(e) {
				return encodeURIComponent(e)
					.replace(/%40/g, '@')
					.replace(/%3A/gi, ':')
					.replace(/%24/g, '$')
					.replace(/%2C/gi, ',')
			}
			function wa(e) {
				return Zy(e).replace(/%3B/gi, ';')
			}
			function gd(e) {
				return Zy(e).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&')
			}
			function Pa(e) {
				return decodeURIComponent(e)
			}
			function Qy(e) {
				return Pa(e.replace(/\+/g, '%20'))
			}
			function Yy(e) {
				return `${gd(e.path)}${(function Ck(e) {
					return Object.keys(e)
						.map((t) => `;${gd(t)}=${gd(e[t])}`)
						.join('')
				})(e.parameters)}`
			}
			const Mk = /^[^\/()?;#]+/
			function pd(e) {
				const t = e.match(Mk)
				return t ? t[0] : ''
			}
			const wk = /^[^\/()?;=#]+/,
				Ok = /^[^=?&#]+/,
				Ek = /^[^&#]+/
			class Ik {
				constructor(t) {
					;(this.url = t), (this.remaining = t)
				}
				parseRootSegment() {
					return (
						this.consumeOptional('/'),
						'' === this.remaining || this.peekStartsWith('?') || this.peekStartsWith('#')
							? new oe([], {})
							: new oe([], this.parseChildren())
					)
				}
				parseQueryParams() {
					const t = {}
					if (this.consumeOptional('?'))
						do {
							this.parseQueryParam(t)
						} while (this.consumeOptional('&'))
					return t
				}
				parseFragment() {
					return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null
				}
				parseChildren() {
					if ('' === this.remaining) return {}
					this.consumeOptional('/')
					const t = []
					for (
						this.peekStartsWith('(') || t.push(this.parseSegment());
						this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(');

					)
						this.capture('/'), t.push(this.parseSegment())
					let n = {}
					this.peekStartsWith('/(') && (this.capture('/'), (n = this.parseParens(!0)))
					let o = {}
					return (
						this.peekStartsWith('(') && (o = this.parseParens(!1)),
						(t.length > 0 || Object.keys(n).length > 0) && (o[q] = new oe(t, n)),
						o
					)
				}
				parseSegment() {
					const t = pd(this.remaining)
					if ('' === t && this.peekStartsWith(';')) throw new O(4009, !1)
					return this.capture(t), new fi(Pa(t), this.parseMatrixParams())
				}
				parseMatrixParams() {
					const t = {}
					for (; this.consumeOptional(';'); ) this.parseParam(t)
					return t
				}
				parseParam(t) {
					const n = (function Pk(e) {
						const t = e.match(wk)
						return t ? t[0] : ''
					})(this.remaining)
					if (!n) return
					this.capture(n)
					let o = ''
					if (this.consumeOptional('=')) {
						const r = pd(this.remaining)
						r && ((o = r), this.capture(o))
					}
					t[Pa(n)] = Pa(o)
				}
				parseQueryParam(t) {
					const n = (function Dk(e) {
						const t = e.match(Ok)
						return t ? t[0] : ''
					})(this.remaining)
					if (!n) return
					this.capture(n)
					let o = ''
					if (this.consumeOptional('=')) {
						const s = (function Sk(e) {
							const t = e.match(Ek)
							return t ? t[0] : ''
						})(this.remaining)
						s && ((o = s), this.capture(o))
					}
					const r = Qy(n),
						i = Qy(o)
					if (t.hasOwnProperty(r)) {
						let s = t[r]
						Array.isArray(s) || ((s = [s]), (t[r] = s)), s.push(i)
					} else t[r] = i
				}
				parseParens(t) {
					const n = {}
					for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
						const o = pd(this.remaining),
							r = this.remaining[o.length]
						if ('/' !== r && ')' !== r && ';' !== r) throw new O(4010, !1)
						let i
						o.indexOf(':') > -1
							? ((i = o.slice(0, o.indexOf(':'))), this.capture(i), this.capture(':'))
							: t && (i = q)
						const s = this.parseChildren()
						;(n[i] = 1 === Object.keys(s).length ? s[q] : new oe([], s)), this.consumeOptional('//')
					}
					return n
				}
				peekStartsWith(t) {
					return this.remaining.startsWith(t)
				}
				consumeOptional(t) {
					return !!this.peekStartsWith(t) && ((this.remaining = this.remaining.substring(t.length)), !0)
				}
				capture(t) {
					if (!this.consumeOptional(t)) throw new O(4011, !1)
				}
			}
			function Ky(e) {
				return e.segments.length > 0 ? new oe([], {[q]: e}) : e
			}
			function Jy(e) {
				const t = {}
				for (const o of Object.keys(e.children)) {
					const i = Jy(e.children[o])
					if (o === q && 0 === i.segments.length && i.hasChildren())
						for (const [s, a] of Object.entries(i.children)) t[s] = a
					else (i.segments.length > 0 || i.hasChildren()) && (t[o] = i)
				}
				return (function Tk(e) {
					if (1 === e.numberOfChildren && e.children[q]) {
						const t = e.children[q]
						return new oe(e.segments.concat(t.segments), t.children)
					}
					return e
				})(new oe(e.segments, t))
			}
			function Yn(e) {
				return e instanceof Qo
			}
			function Xy(e) {
				let t
				const r = Ky(
					(function n(i) {
						const s = {}
						for (const c of i.children) {
							const l = n(c)
							s[c.outlet] = l
						}
						const a = new oe(i.url, s)
						return i === e && (t = a), a
					})(e.root)
				)
				return t ?? r
			}
			function eb(e, t, n, o) {
				let r = e
				for (; r.parent; ) r = r.parent
				if (0 === t.length) return hd(r, r, r, n, o)
				const i = (function Rk(e) {
					if ('string' == typeof e[0] && 1 === e.length && '/' === e[0]) return new nb(!0, 0, e)
					let t = 0,
						n = !1
					const o = e.reduce((r, i, s) => {
						if ('object' == typeof i && null != i) {
							if (i.outlets) {
								const a = {}
								return (
									Object.entries(i.outlets).forEach(([c, l]) => {
										a[c] = 'string' == typeof l ? l.split('/') : l
									}),
									[...r, {outlets: a}]
								)
							}
							if (i.segmentPath) return [...r, i.segmentPath]
						}
						return 'string' != typeof i
							? [...r, i]
							: 0 === s
							? (i.split('/').forEach((a, c) => {
									;(0 == c && '.' === a) ||
										(0 == c && '' === a ? (n = !0) : '..' === a ? t++ : '' != a && r.push(a))
							  }),
							  r)
							: [...r, i]
					}, [])
					return new nb(n, t, o)
				})(t)
				if (i.toRoot()) return hd(r, r, new oe([], {}), n, o)
				const s = (function Ak(e, t, n) {
						if (e.isAbsolute) return new Da(t, !0, 0)
						if (!n) return new Da(t, !1, NaN)
						if (null === n.parent) return new Da(n, !0, 0)
						const o = Oa(e.commands[0]) ? 0 : 1
						return (function Nk(e, t, n) {
							let o = e,
								r = t,
								i = n
							for (; i > r; ) {
								if (((i -= r), (o = o.parent), !o)) throw new O(4005, !1)
								r = o.segments.length
							}
							return new Da(o, !1, r - i)
						})(n, n.segments.length - 1 + o, e.numberOfDoubleDots)
					})(i, r, e),
					a = s.processChildren
						? mi(s.segmentGroup, s.index, i.commands)
						: ob(s.segmentGroup, s.index, i.commands)
				return hd(r, s.segmentGroup, a, n, o)
			}
			function Oa(e) {
				return 'object' == typeof e && null != e && !e.outlets && !e.segmentPath
			}
			function hi(e) {
				return 'object' == typeof e && null != e && e.outlets
			}
			function hd(e, t, n, o, r) {
				let s,
					i = {}
				o &&
					Object.entries(o).forEach(([c, l]) => {
						i[c] = Array.isArray(l) ? l.map((u) => `${u}`) : `${l}`
					}),
					(s = e === t ? n : tb(e, t, n))
				const a = Ky(Jy(s))
				return new Qo(a, i, r)
			}
			function tb(e, t, n) {
				const o = {}
				return (
					Object.entries(e.children).forEach(([r, i]) => {
						o[r] = i === t ? n : tb(i, t, n)
					}),
					new oe(e.segments, o)
				)
			}
			class nb {
				constructor(t, n, o) {
					if (
						((this.isAbsolute = t),
						(this.numberOfDoubleDots = n),
						(this.commands = o),
						t && o.length > 0 && Oa(o[0]))
					)
						throw new O(4003, !1)
					const r = o.find(hi)
					if (r && r !== By(o)) throw new O(4004, !1)
				}
				toRoot() {
					return this.isAbsolute && 1 === this.commands.length && '/' == this.commands[0]
				}
			}
			class Da {
				constructor(t, n, o) {
					;(this.segmentGroup = t), (this.processChildren = n), (this.index = o)
				}
			}
			function ob(e, t, n) {
				if ((e || (e = new oe([], {})), 0 === e.segments.length && e.hasChildren())) return mi(e, t, n)
				const o = (function Fk(e, t, n) {
						let o = 0,
							r = t
						const i = {match: !1, pathIndex: 0, commandIndex: 0}
						for (; r < e.segments.length; ) {
							if (o >= n.length) return i
							const s = e.segments[r],
								a = n[o]
							if (hi(a)) break
							const c = `${a}`,
								l = o < n.length - 1 ? n[o + 1] : null
							if (r > 0 && void 0 === c) break
							if (c && l && 'object' == typeof l && void 0 === l.outlets) {
								if (!ib(c, l, s)) return i
								o += 2
							} else {
								if (!ib(c, {}, s)) return i
								o++
							}
							r++
						}
						return {match: !0, pathIndex: r, commandIndex: o}
					})(e, t, n),
					r = n.slice(o.commandIndex)
				if (o.match && o.pathIndex < e.segments.length) {
					const i = new oe(e.segments.slice(0, o.pathIndex), {})
					return (i.children[q] = new oe(e.segments.slice(o.pathIndex), e.children)), mi(i, 0, r)
				}
				return o.match && 0 === r.length
					? new oe(e.segments, {})
					: o.match && !e.hasChildren()
					? md(e, t, n)
					: o.match
					? mi(e, 0, r)
					: md(e, t, n)
			}
			function mi(e, t, n) {
				if (0 === n.length) return new oe(e.segments, {})
				{
					const o = (function Lk(e) {
							return hi(e[0]) ? e[0].outlets : {[q]: e}
						})(n),
						r = {}
					if (!o[q] && e.children[q] && 1 === e.numberOfChildren && 0 === e.children[q].segments.length) {
						const i = mi(e.children[q], t, n)
						return new oe(e.segments, i.children)
					}
					return (
						Object.entries(o).forEach(([i, s]) => {
							'string' == typeof s && (s = [s]), null !== s && (r[i] = ob(e.children[i], t, s))
						}),
						Object.entries(e.children).forEach(([i, s]) => {
							void 0 === o[i] && (r[i] = s)
						}),
						new oe(e.segments, r)
					)
				}
			}
			function md(e, t, n) {
				const o = e.segments.slice(0, t)
				let r = 0
				for (; r < n.length; ) {
					const i = n[r]
					if (hi(i)) {
						const c = jk(i.outlets)
						return new oe(o, c)
					}
					if (0 === r && Oa(n[0])) {
						o.push(new fi(e.segments[t].path, rb(n[0]))), r++
						continue
					}
					const s = hi(i) ? i.outlets[q] : `${i}`,
						a = r < n.length - 1 ? n[r + 1] : null
					s && a && Oa(a) ? (o.push(new fi(s, rb(a))), (r += 2)) : (o.push(new fi(s, {})), r++)
				}
				return new oe(o, {})
			}
			function jk(e) {
				const t = {}
				return (
					Object.entries(e).forEach(([n, o]) => {
						'string' == typeof o && (o = [o]), null !== o && (t[n] = md(new oe([], {}), 0, o))
					}),
					t
				)
			}
			function rb(e) {
				const t = {}
				return Object.entries(e).forEach(([n, o]) => (t[n] = `${o}`)), t
			}
			function ib(e, t, n) {
				return e == n.path && qt(t, n.parameters)
			}
			const _i = 'imperative'
			class Gt {
				constructor(t, n) {
					;(this.id = t), (this.url = n)
				}
			}
			class _d extends Gt {
				constructor(t, n, o = 'imperative', r = null) {
					super(t, n), (this.type = 0), (this.navigationTrigger = o), (this.restoredState = r)
				}
				toString() {
					return `NavigationStart(id: ${this.id}, url: '${this.url}')`
				}
			}
			class Kn extends Gt {
				constructor(t, n, o) {
					super(t, n), (this.urlAfterRedirects = o), (this.type = 1)
				}
				toString() {
					return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
				}
			}
			class Ea extends Gt {
				constructor(t, n, o, r) {
					super(t, n), (this.reason = o), (this.code = r), (this.type = 2)
				}
				toString() {
					return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
				}
			}
			class vi extends Gt {
				constructor(t, n, o, r) {
					super(t, n), (this.reason = o), (this.code = r), (this.type = 16)
				}
			}
			class vd extends Gt {
				constructor(t, n, o, r) {
					super(t, n), (this.error = o), (this.target = r), (this.type = 3)
				}
				toString() {
					return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
				}
			}
			class zk extends Gt {
				constructor(t, n, o, r) {
					super(t, n), (this.urlAfterRedirects = o), (this.state = r), (this.type = 4)
				}
				toString() {
					return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
				}
			}
			class $k extends Gt {
				constructor(t, n, o, r) {
					super(t, n), (this.urlAfterRedirects = o), (this.state = r), (this.type = 7)
				}
				toString() {
					return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
				}
			}
			class Vk extends Gt {
				constructor(t, n, o, r, i) {
					super(t, n),
						(this.urlAfterRedirects = o),
						(this.state = r),
						(this.shouldActivate = i),
						(this.type = 8)
				}
				toString() {
					return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
				}
			}
			class Bk extends Gt {
				constructor(t, n, o, r) {
					super(t, n), (this.urlAfterRedirects = o), (this.state = r), (this.type = 5)
				}
				toString() {
					return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
				}
			}
			class Uk extends Gt {
				constructor(t, n, o, r) {
					super(t, n), (this.urlAfterRedirects = o), (this.state = r), (this.type = 6)
				}
				toString() {
					return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
				}
			}
			class Hk {
				constructor(t) {
					;(this.route = t), (this.type = 9)
				}
				toString() {
					return `RouteConfigLoadStart(path: ${this.route.path})`
				}
			}
			class qk {
				constructor(t) {
					;(this.route = t), (this.type = 10)
				}
				toString() {
					return `RouteConfigLoadEnd(path: ${this.route.path})`
				}
			}
			class Gk {
				constructor(t) {
					;(this.snapshot = t), (this.type = 11)
				}
				toString() {
					return `ChildActivationStart(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
					}')`
				}
			}
			class Wk {
				constructor(t) {
					;(this.snapshot = t), (this.type = 12)
				}
				toString() {
					return `ChildActivationEnd(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
					}')`
				}
			}
			class Zk {
				constructor(t) {
					;(this.snapshot = t), (this.type = 13)
				}
				toString() {
					return `ActivationStart(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
					}')`
				}
			}
			class Qk {
				constructor(t) {
					;(this.snapshot = t), (this.type = 14)
				}
				toString() {
					return `ActivationEnd(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
					}')`
				}
			}
			class sb {
				constructor(t, n, o) {
					;(this.routerEvent = t), (this.position = n), (this.anchor = o), (this.type = 15)
				}
				toString() {
					return `Scroll(anchor: '${this.anchor}', position: '${
						this.position ? `${this.position[0]}, ${this.position[1]}` : null
					}')`
				}
			}
			class Yk {
				constructor() {
					;(this.outlet = null),
						(this.route = null),
						(this.injector = null),
						(this.children = new yi()),
						(this.attachRef = null)
				}
			}
			let yi = (() => {
				class e {
					constructor() {
						this.contexts = new Map()
					}
					onChildOutletCreated(n, o) {
						const r = this.getOrCreateContext(n)
						;(r.outlet = o), this.contexts.set(n, r)
					}
					onChildOutletDestroyed(n) {
						const o = this.getContext(n)
						o && ((o.outlet = null), (o.attachRef = null))
					}
					onOutletDeactivated() {
						const n = this.contexts
						return (this.contexts = new Map()), n
					}
					onOutletReAttached(n) {
						this.contexts = n
					}
					getOrCreateContext(n) {
						let o = this.getContext(n)
						return o || ((o = new Yk()), this.contexts.set(n, o)), o
					}
					getContext(n) {
						return this.contexts.get(n) || null
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
					e
				)
			})()
			class ab {
				constructor(t) {
					this._root = t
				}
				get root() {
					return this._root.value
				}
				parent(t) {
					const n = this.pathFromRoot(t)
					return n.length > 1 ? n[n.length - 2] : null
				}
				children(t) {
					const n = yd(t, this._root)
					return n ? n.children.map((o) => o.value) : []
				}
				firstChild(t) {
					const n = yd(t, this._root)
					return n && n.children.length > 0 ? n.children[0].value : null
				}
				siblings(t) {
					const n = bd(t, this._root)
					return n.length < 2 ? [] : n[n.length - 2].children.map((r) => r.value).filter((r) => r !== t)
				}
				pathFromRoot(t) {
					return bd(t, this._root).map((n) => n.value)
				}
			}
			function yd(e, t) {
				if (e === t.value) return t
				for (const n of t.children) {
					const o = yd(e, n)
					if (o) return o
				}
				return null
			}
			function bd(e, t) {
				if (e === t.value) return [t]
				for (const n of t.children) {
					const o = bd(e, n)
					if (o.length) return o.unshift(t), o
				}
				return []
			}
			class dn {
				constructor(t, n) {
					;(this.value = t), (this.children = n)
				}
				toString() {
					return `TreeNode(${this.value})`
				}
			}
			function Yo(e) {
				const t = {}
				return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t
			}
			class cb extends ab {
				constructor(t, n) {
					super(t), (this.snapshot = n), Cd(this, t)
				}
				toString() {
					return this.snapshot.toString()
				}
			}
			function lb(e, t) {
				const n = (function Kk(e, t) {
						const s = new Sa([], {}, {}, '', {}, q, t, null, {})
						return new db('', new dn(s, []))
					})(0, t),
					o = new dt([new fi('', {})]),
					r = new dt({}),
					i = new dt({}),
					s = new dt({}),
					a = new dt(''),
					c = new Ko(o, r, s, a, i, q, t, n.root)
				return (c.snapshot = n.root), new cb(new dn(c, []), n)
			}
			class Ko {
				constructor(t, n, o, r, i, s, a, c) {
					;(this.urlSubject = t),
						(this.paramsSubject = n),
						(this.queryParamsSubject = o),
						(this.fragmentSubject = r),
						(this.dataSubject = i),
						(this.outlet = s),
						(this.component = a),
						(this._futureSnapshot = c),
						(this.title = this.dataSubject?.pipe(le((l) => l[di])) ?? F(void 0)),
						(this.url = t),
						(this.params = n),
						(this.queryParams = o),
						(this.fragment = r),
						(this.data = i)
				}
				get routeConfig() {
					return this._futureSnapshot.routeConfig
				}
				get root() {
					return this._routerState.root
				}
				get parent() {
					return this._routerState.parent(this)
				}
				get firstChild() {
					return this._routerState.firstChild(this)
				}
				get children() {
					return this._routerState.children(this)
				}
				get pathFromRoot() {
					return this._routerState.pathFromRoot(this)
				}
				get paramMap() {
					return this._paramMap || (this._paramMap = this.params.pipe(le((t) => Zo(t)))), this._paramMap
				}
				get queryParamMap() {
					return (
						this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(le((t) => Zo(t)))),
						this._queryParamMap
					)
				}
				toString() {
					return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
				}
			}
			function ub(e, t = 'emptyOnly') {
				const n = e.pathFromRoot
				let o = 0
				if ('always' !== t)
					for (o = n.length - 1; o >= 1; ) {
						const r = n[o],
							i = n[o - 1]
						if (r.routeConfig && '' === r.routeConfig.path) o--
						else {
							if (i.component) break
							o--
						}
					}
				return (function Jk(e) {
					return e.reduce(
						(t, n) => ({
							params: {...t.params, ...n.params},
							data: {...t.data, ...n.data},
							resolve: {...n.data, ...t.resolve, ...n.routeConfig?.data, ...n._resolvedData},
						}),
						{params: {}, data: {}, resolve: {}}
					)
				})(n.slice(o))
			}
			class Sa {
				get title() {
					return this.data?.[di]
				}
				constructor(t, n, o, r, i, s, a, c, l) {
					;(this.url = t),
						(this.params = n),
						(this.queryParams = o),
						(this.fragment = r),
						(this.data = i),
						(this.outlet = s),
						(this.component = a),
						(this.routeConfig = c),
						(this._resolve = l)
				}
				get root() {
					return this._routerState.root
				}
				get parent() {
					return this._routerState.parent(this)
				}
				get firstChild() {
					return this._routerState.firstChild(this)
				}
				get children() {
					return this._routerState.children(this)
				}
				get pathFromRoot() {
					return this._routerState.pathFromRoot(this)
				}
				get paramMap() {
					return this._paramMap || (this._paramMap = Zo(this.params)), this._paramMap
				}
				get queryParamMap() {
					return this._queryParamMap || (this._queryParamMap = Zo(this.queryParams)), this._queryParamMap
				}
				toString() {
					return `Route(url:'${this.url.map((o) => o.toString()).join('/')}', path:'${
						this.routeConfig ? this.routeConfig.path : ''
					}')`
				}
			}
			class db extends ab {
				constructor(t, n) {
					super(n), (this.url = t), Cd(this, n)
				}
				toString() {
					return fb(this._root)
				}
			}
			function Cd(e, t) {
				;(t.value._routerState = e), t.children.forEach((n) => Cd(e, n))
			}
			function fb(e) {
				const t = e.children.length > 0 ? ` { ${e.children.map(fb).join(', ')} } ` : ''
				return `${e.value}${t}`
			}
			function xd(e) {
				if (e.snapshot) {
					const t = e.snapshot,
						n = e._futureSnapshot
					;(e.snapshot = n),
						qt(t.queryParams, n.queryParams) || e.queryParamsSubject.next(n.queryParams),
						t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
						qt(t.params, n.params) || e.paramsSubject.next(n.params),
						(function gk(e, t) {
							if (e.length !== t.length) return !1
							for (let n = 0; n < e.length; ++n) if (!qt(e[n], t[n])) return !1
							return !0
						})(t.url, n.url) || e.urlSubject.next(n.url),
						qt(t.data, n.data) || e.dataSubject.next(n.data)
				} else (e.snapshot = e._futureSnapshot), e.dataSubject.next(e._futureSnapshot.data)
			}
			function Md(e, t) {
				const n =
					qt(e.params, t.params) &&
					(function _k(e, t) {
						return Qn(e, t) && e.every((n, o) => qt(n.parameters, t[o].parameters))
					})(e.url, t.url)
				return n && !(!e.parent != !t.parent) && (!e.parent || Md(e.parent, t.parent))
			}
			let Jo = (() => {
				class e {
					constructor() {
						;(this.activated = null),
							(this._activatedRoute = null),
							(this.name = q),
							(this.activateEvents = new qe()),
							(this.deactivateEvents = new qe()),
							(this.attachEvents = new qe()),
							(this.detachEvents = new qe()),
							(this.parentContexts = S(yi)),
							(this.location = S(Ot)),
							(this.changeDetector = S(Pu)),
							(this.environmentInjector = S(tn)),
							(this.inputBinder = S(Ia, {optional: !0})),
							(this.supportsBindingToComponentInputs = !0)
					}
					get activatedComponentRef() {
						return this.activated
					}
					ngOnChanges(n) {
						if (n.name) {
							const {firstChange: o, previousValue: r} = n.name
							if (o) return
							this.isTrackedInParentContexts(r) &&
								(this.deactivate(), this.parentContexts.onChildOutletDestroyed(r)),
								this.initializeOutletWithName()
						}
					}
					ngOnDestroy() {
						this.isTrackedInParentContexts(this.name) &&
							this.parentContexts.onChildOutletDestroyed(this.name),
							this.inputBinder?.unsubscribeFromRouteData(this)
					}
					isTrackedInParentContexts(n) {
						return this.parentContexts.getContext(n)?.outlet === this
					}
					ngOnInit() {
						this.initializeOutletWithName()
					}
					initializeOutletWithName() {
						if ((this.parentContexts.onChildOutletCreated(this.name, this), this.activated)) return
						const n = this.parentContexts.getContext(this.name)
						n?.route &&
							(n.attachRef ? this.attach(n.attachRef, n.route) : this.activateWith(n.route, n.injector))
					}
					get isActivated() {
						return !!this.activated
					}
					get component() {
						if (!this.activated) throw new O(4012, !1)
						return this.activated.instance
					}
					get activatedRoute() {
						if (!this.activated) throw new O(4012, !1)
						return this._activatedRoute
					}
					get activatedRouteData() {
						return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
					}
					detach() {
						if (!this.activated) throw new O(4012, !1)
						this.location.detach()
						const n = this.activated
						return (
							(this.activated = null),
							(this._activatedRoute = null),
							this.detachEvents.emit(n.instance),
							n
						)
					}
					attach(n, o) {
						;(this.activated = n),
							(this._activatedRoute = o),
							this.location.insert(n.hostView),
							this.inputBinder?.bindActivatedRouteToOutletComponent(this),
							this.attachEvents.emit(n.instance)
					}
					deactivate() {
						if (this.activated) {
							const n = this.component
							this.activated.destroy(),
								(this.activated = null),
								(this._activatedRoute = null),
								this.deactivateEvents.emit(n)
						}
					}
					activateWith(n, o) {
						if (this.isActivated) throw new O(4013, !1)
						this._activatedRoute = n
						const r = this.location,
							s = n.snapshot.component,
							a = this.parentContexts.getOrCreateContext(this.name).children,
							c = new Xk(n, a, r.injector)
						;(this.activated = r.createComponent(s, {
							index: r.length,
							injector: c,
							environmentInjector: o ?? this.environmentInjector,
						})),
							this.changeDetector.markForCheck(),
							this.inputBinder?.bindActivatedRouteToOutletComponent(this),
							this.activateEvents.emit(this.activated.instance)
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵdir = Ve({
						type: e,
						selectors: [['router-outlet']],
						inputs: {name: 'name'},
						outputs: {
							activateEvents: 'activate',
							deactivateEvents: 'deactivate',
							attachEvents: 'attach',
							detachEvents: 'detach',
						},
						exportAs: ['outlet'],
						standalone: !0,
						features: [An],
					})),
					e
				)
			})()
			class Xk {
				constructor(t, n, o) {
					;(this.route = t), (this.childContexts = n), (this.parent = o)
				}
				get(t, n) {
					return t === Ko ? this.route : t === yi ? this.childContexts : this.parent.get(t, n)
				}
			}
			const Ia = new T('')
			let gb = (() => {
				class e {
					constructor() {
						this.outletDataSubscriptions = new Map()
					}
					bindActivatedRouteToOutletComponent(n) {
						this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n)
					}
					unsubscribeFromRouteData(n) {
						this.outletDataSubscriptions.get(n)?.unsubscribe(), this.outletDataSubscriptions.delete(n)
					}
					subscribeToRouteData(n) {
						const {activatedRoute: o} = n,
							r = ad([o.queryParams, o.params, o.data])
								.pipe(
									kt(
										([i, s, a], c) => (
											(a = {...i, ...s, ...a}), 0 === c ? F(a) : Promise.resolve(a)
										)
									)
								)
								.subscribe((i) => {
									if (
										!n.isActivated ||
										!n.activatedComponentRef ||
										n.activatedRoute !== o ||
										null === o.component
									)
										return void this.unsubscribeFromRouteData(n)
									const s = (function CS(e) {
										const t = J(e)
										if (!t) return null
										const n = new Vr(t)
										return {
											get selector() {
												return n.selector
											},
											get type() {
												return n.componentType
											},
											get inputs() {
												return n.inputs
											},
											get outputs() {
												return n.outputs
											},
											get ngContentSelectors() {
												return n.ngContentSelectors
											},
											get isStandalone() {
												return t.standalone
											},
											get isSignal() {
												return t.signals
											},
										}
									})(o.component)
									if (s)
										for (const {templateName: a} of s.inputs)
											n.activatedComponentRef.setInput(a, i[a])
									else this.unsubscribeFromRouteData(n)
								})
						this.outletDataSubscriptions.set(n, r)
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac})),
					e
				)
			})()
			function bi(e, t, n) {
				if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
					const o = n.value
					o._futureSnapshot = t.value
					const r = (function t2(e, t, n) {
						return t.children.map((o) => {
							for (const r of n.children)
								if (e.shouldReuseRoute(o.value, r.value.snapshot)) return bi(e, o, r)
							return bi(e, o)
						})
					})(e, t, n)
					return new dn(o, r)
				}
				{
					if (e.shouldAttach(t.value)) {
						const i = e.retrieve(t.value)
						if (null !== i) {
							const s = i.route
							return (
								(s.value._futureSnapshot = t.value), (s.children = t.children.map((a) => bi(e, a))), s
							)
						}
					}
					const o = (function n2(e) {
							return new Ko(
								new dt(e.url),
								new dt(e.params),
								new dt(e.queryParams),
								new dt(e.fragment),
								new dt(e.data),
								e.outlet,
								e.component,
								e
							)
						})(t.value),
						r = t.children.map((i) => bi(e, i))
					return new dn(o, r)
				}
			}
			const wd = 'ngNavigationCancelingError'
			function pb(e, t) {
				const {redirectTo: n, navigationBehaviorOptions: o} = Yn(t)
						? {redirectTo: t, navigationBehaviorOptions: void 0}
						: t,
					r = hb(!1, 0, t)
				return (r.url = n), (r.navigationBehaviorOptions = o), r
			}
			function hb(e, t, n) {
				const o = new Error('NavigationCancelingError: ' + (e || ''))
				return (o[wd] = !0), (o.cancellationCode = t), n && (o.url = n), o
			}
			function mb(e) {
				return _b(e) && Yn(e.url)
			}
			function _b(e) {
				return e && e[wd]
			}
			let vb = (() => {
				class e {}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵcmp = D({
						type: e,
						selectors: [['ng-component']],
						standalone: !0,
						features: [b_],
						decls: 1,
						vars: 0,
						template: function (n, o) {
							1 & n && _(0, 'router-outlet')
						},
						dependencies: [Jo],
						encapsulation: 2,
					})),
					e
				)
			})()
			function Pd(e) {
				const t = e.children && e.children.map(Pd),
					n = t ? {...e, children: t} : {...e}
				return (
					!n.component &&
						!n.loadComponent &&
						(t || n.loadChildren) &&
						n.outlet &&
						n.outlet !== q &&
						(n.component = vb),
					n
				)
			}
			function It(e) {
				return e.outlet || q
			}
			function Ci(e) {
				if (!e) return null
				if (e.routeConfig?._injector) return e.routeConfig._injector
				for (let t = e.parent; t; t = t.parent) {
					const n = t.routeConfig
					if (n?._loadedInjector) return n._loadedInjector
					if (n?._injector) return n._injector
				}
				return null
			}
			class l2 {
				constructor(t, n, o, r, i) {
					;(this.routeReuseStrategy = t),
						(this.futureState = n),
						(this.currState = o),
						(this.forwardEvent = r),
						(this.inputBindingEnabled = i)
				}
				activate(t) {
					const n = this.futureState._root,
						o = this.currState ? this.currState._root : null
					this.deactivateChildRoutes(n, o, t), xd(this.futureState.root), this.activateChildRoutes(n, o, t)
				}
				deactivateChildRoutes(t, n, o) {
					const r = Yo(n)
					t.children.forEach((i) => {
						const s = i.value.outlet
						this.deactivateRoutes(i, r[s], o), delete r[s]
					}),
						Object.values(r).forEach((i) => {
							this.deactivateRouteAndItsChildren(i, o)
						})
				}
				deactivateRoutes(t, n, o) {
					const r = t.value,
						i = n ? n.value : null
					if (r === i)
						if (r.component) {
							const s = o.getContext(r.outlet)
							s && this.deactivateChildRoutes(t, n, s.children)
						} else this.deactivateChildRoutes(t, n, o)
					else i && this.deactivateRouteAndItsChildren(n, o)
				}
				deactivateRouteAndItsChildren(t, n) {
					t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot)
						? this.detachAndStoreRouteSubtree(t, n)
						: this.deactivateRouteAndOutlet(t, n)
				}
				detachAndStoreRouteSubtree(t, n) {
					const o = n.getContext(t.value.outlet),
						r = o && t.value.component ? o.children : n,
						i = Yo(t)
					for (const s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], r)
					if (o && o.outlet) {
						const s = o.outlet.detach(),
							a = o.children.onOutletDeactivated()
						this.routeReuseStrategy.store(t.value.snapshot, {componentRef: s, route: t, contexts: a})
					}
				}
				deactivateRouteAndOutlet(t, n) {
					const o = n.getContext(t.value.outlet),
						r = o && t.value.component ? o.children : n,
						i = Yo(t)
					for (const s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], r)
					o &&
						(o.outlet && (o.outlet.deactivate(), o.children.onOutletDeactivated()),
						(o.attachRef = null),
						(o.route = null))
				}
				activateChildRoutes(t, n, o) {
					const r = Yo(n)
					t.children.forEach((i) => {
						this.activateRoutes(i, r[i.value.outlet], o), this.forwardEvent(new Qk(i.value.snapshot))
					}),
						t.children.length && this.forwardEvent(new Wk(t.value.snapshot))
				}
				activateRoutes(t, n, o) {
					const r = t.value,
						i = n ? n.value : null
					if ((xd(r), r === i))
						if (r.component) {
							const s = o.getOrCreateContext(r.outlet)
							this.activateChildRoutes(t, n, s.children)
						} else this.activateChildRoutes(t, n, o)
					else if (r.component) {
						const s = o.getOrCreateContext(r.outlet)
						if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
							const a = this.routeReuseStrategy.retrieve(r.snapshot)
							this.routeReuseStrategy.store(r.snapshot, null),
								s.children.onOutletReAttached(a.contexts),
								(s.attachRef = a.componentRef),
								(s.route = a.route.value),
								s.outlet && s.outlet.attach(a.componentRef, a.route.value),
								xd(a.route.value),
								this.activateChildRoutes(t, null, s.children)
						} else {
							const a = Ci(r.snapshot)
							;(s.attachRef = null),
								(s.route = r),
								(s.injector = a),
								s.outlet && s.outlet.activateWith(r, s.injector),
								this.activateChildRoutes(t, null, s.children)
						}
					} else this.activateChildRoutes(t, null, o)
				}
			}
			class yb {
				constructor(t) {
					;(this.path = t), (this.route = this.path[this.path.length - 1])
				}
			}
			class Ta {
				constructor(t, n) {
					;(this.component = t), (this.route = n)
				}
			}
			function u2(e, t, n) {
				const o = e._root
				return xi(o, t ? t._root : null, n, [o.value])
			}
			function Xo(e, t) {
				const n = Symbol(),
					o = t.get(e, n)
				return o === n
					? 'function' != typeof e ||
					  (function nC(e) {
							return null !== Ri(e)
					  })(e)
						? t.get(e)
						: e
					: o
			}
			function xi(e, t, n, o, r = {canDeactivateChecks: [], canActivateChecks: []}) {
				const i = Yo(t)
				return (
					e.children.forEach((s) => {
						;(function f2(e, t, n, o, r = {canDeactivateChecks: [], canActivateChecks: []}) {
							const i = e.value,
								s = t ? t.value : null,
								a = n ? n.getContext(e.value.outlet) : null
							if (s && i.routeConfig === s.routeConfig) {
								const c = (function g2(e, t, n) {
									if ('function' == typeof n) return n(e, t)
									switch (n) {
										case 'pathParamsChange':
											return !Qn(e.url, t.url)
										case 'pathParamsOrQueryParamsChange':
											return !Qn(e.url, t.url) || !qt(e.queryParams, t.queryParams)
										case 'always':
											return !0
										case 'paramsOrQueryParamsChange':
											return !Md(e, t) || !qt(e.queryParams, t.queryParams)
										default:
											return !Md(e, t)
									}
								})(s, i, i.routeConfig.runGuardsAndResolvers)
								c
									? r.canActivateChecks.push(new yb(o))
									: ((i.data = s.data), (i._resolvedData = s._resolvedData)),
									xi(e, t, i.component ? (a ? a.children : null) : n, o, r),
									c &&
										a &&
										a.outlet &&
										a.outlet.isActivated &&
										r.canDeactivateChecks.push(new Ta(a.outlet.component, s))
							} else
								s && Mi(t, a, r),
									r.canActivateChecks.push(new yb(o)),
									xi(e, null, i.component ? (a ? a.children : null) : n, o, r)
						})(s, i[s.value.outlet], n, o.concat([s.value]), r),
							delete i[s.value.outlet]
					}),
					Object.entries(i).forEach(([s, a]) => Mi(a, n.getContext(s), r)),
					r
				)
			}
			function Mi(e, t, n) {
				const o = Yo(e),
					r = e.value
				Object.entries(o).forEach(([i, s]) => {
					Mi(s, r.component ? (t ? t.children.getContext(i) : null) : t, n)
				}),
					n.canDeactivateChecks.push(
						new Ta(r.component && t && t.outlet && t.outlet.isActivated ? t.outlet.component : null, r)
					)
			}
			function wi(e) {
				return 'function' == typeof e
			}
			function bb(e) {
				return e instanceof ba || 'EmptyError' === e?.name
			}
			const ka = Symbol('INITIAL_VALUE')
			function er() {
				return kt((e) =>
					ad(
						e.map((t) =>
							t.pipe(
								Wo(1),
								(function ik(...e) {
									const t = lr(e)
									return Ee((n, o) => {
										;(t ? cd(e, n, t) : cd(e, n)).subscribe(o)
									})
								})(ka)
							)
						)
					).pipe(
						le((t) => {
							for (const n of t)
								if (!0 !== n) {
									if (n === ka) return ka
									if (!1 === n || n instanceof Qo) return n
								}
							return !0
						}),
						Pn((t) => t !== ka),
						Wo(1)
					)
				)
			}
			function Cb(e) {
				return (function n0(...e) {
					return jd(e)
				})(
					Ze((t) => {
						if (Yn(t)) throw pb(0, t)
					}),
					le((t) => !0 === t)
				)
			}
			class Ra {
				constructor(t) {
					this.segmentGroup = t || null
				}
			}
			class xb {
				constructor(t) {
					this.urlTree = t
				}
			}
			function tr(e) {
				return li(new Ra(e))
			}
			function Mb(e) {
				return li(new xb(e))
			}
			class R2 {
				constructor(t, n) {
					;(this.urlSerializer = t), (this.urlTree = n)
				}
				noMatchError(t) {
					return new O(4002, !1)
				}
				lineralizeSegments(t, n) {
					let o = [],
						r = n.root
					for (;;) {
						if (((o = o.concat(r.segments)), 0 === r.numberOfChildren)) return F(o)
						if (r.numberOfChildren > 1 || !r.children[q]) return li(new O(4e3, !1))
						r = r.children[q]
					}
				}
				applyRedirectCommands(t, n, o) {
					return this.applyRedirectCreateUrlTree(n, this.urlSerializer.parse(n), t, o)
				}
				applyRedirectCreateUrlTree(t, n, o, r) {
					const i = this.createSegmentGroup(t, n.root, o, r)
					return new Qo(i, this.createQueryParams(n.queryParams, this.urlTree.queryParams), n.fragment)
				}
				createQueryParams(t, n) {
					const o = {}
					return (
						Object.entries(t).forEach(([r, i]) => {
							if ('string' == typeof i && i.startsWith(':')) {
								const a = i.substring(1)
								o[r] = n[a]
							} else o[r] = i
						}),
						o
					)
				}
				createSegmentGroup(t, n, o, r) {
					const i = this.createSegments(t, n.segments, o, r)
					let s = {}
					return (
						Object.entries(n.children).forEach(([a, c]) => {
							s[a] = this.createSegmentGroup(t, c, o, r)
						}),
						new oe(i, s)
					)
				}
				createSegments(t, n, o, r) {
					return n.map((i) => (i.path.startsWith(':') ? this.findPosParam(t, i, r) : this.findOrReturn(i, o)))
				}
				findPosParam(t, n, o) {
					const r = o[n.path.substring(1)]
					if (!r) throw new O(4001, !1)
					return r
				}
				findOrReturn(t, n) {
					let o = 0
					for (const r of n) {
						if (r.path === t.path) return n.splice(o), r
						o++
					}
					return t
				}
			}
			const Od = {
				matched: !1,
				consumedSegments: [],
				remainingSegments: [],
				parameters: {},
				positionalParamSegments: {},
			}
			function A2(e, t, n, o, r) {
				const i = Dd(e, t, n)
				return i.matched
					? ((o = (function o2(e, t) {
							return (
								e.providers && !e._injector && (e._injector = Xl(e.providers, t, `Route: ${e.path}`)),
								e._injector ?? t
							)
					  })(t, o)),
					  (function I2(e, t, n, o) {
							const r = t.canMatch
							return r && 0 !== r.length
								? F(
										r.map((s) => {
											const a = Xo(s, e)
											return On(
												(function y2(e) {
													return e && wi(e.canMatch)
												})(a)
													? a.canMatch(t, n)
													: e.runInContext(() => a(t, n))
											)
										})
								  ).pipe(er(), Cb())
								: F(!0)
					  })(o, t, n).pipe(le((s) => (!0 === s ? i : {...Od}))))
					: F(i)
			}
			function Dd(e, t, n) {
				if ('' === t.path)
					return 'full' === t.pathMatch && (e.hasChildren() || n.length > 0)
						? {...Od}
						: {
								matched: !0,
								consumedSegments: [],
								remainingSegments: n,
								parameters: {},
								positionalParamSegments: {},
						  }
				const r = (t.matcher || fk)(n, e, t)
				if (!r) return {...Od}
				const i = {}
				Object.entries(r.posParams ?? {}).forEach(([a, c]) => {
					i[a] = c.path
				})
				const s = r.consumed.length > 0 ? {...i, ...r.consumed[r.consumed.length - 1].parameters} : i
				return {
					matched: !0,
					consumedSegments: r.consumed,
					remainingSegments: n.slice(r.consumed.length),
					parameters: s,
					positionalParamSegments: r.posParams ?? {},
				}
			}
			function wb(e, t, n, o) {
				return n.length > 0 &&
					(function F2(e, t, n) {
						return n.some((o) => Aa(e, t, o) && It(o) !== q)
					})(e, n, o)
					? {segmentGroup: new oe(t, L2(o, new oe(n, e.children))), slicedSegments: []}
					: 0 === n.length &&
					  (function j2(e, t, n) {
							return n.some((o) => Aa(e, t, o))
					  })(e, n, o)
					? {segmentGroup: new oe(e.segments, N2(e, 0, n, o, e.children)), slicedSegments: n}
					: {segmentGroup: new oe(e.segments, e.children), slicedSegments: n}
			}
			function N2(e, t, n, o, r) {
				const i = {}
				for (const s of o)
					if (Aa(e, n, s) && !r[It(s)]) {
						const a = new oe([], {})
						i[It(s)] = a
					}
				return {...r, ...i}
			}
			function L2(e, t) {
				const n = {}
				n[q] = t
				for (const o of e)
					if ('' === o.path && It(o) !== q) {
						const r = new oe([], {})
						n[It(o)] = r
					}
				return n
			}
			function Aa(e, t, n) {
				return (!(e.hasChildren() || t.length > 0) || 'full' !== n.pathMatch) && '' === n.path
			}
			class B2 {
				constructor(t, n, o, r, i, s, a) {
					;(this.injector = t),
						(this.configLoader = n),
						(this.rootComponentType = o),
						(this.config = r),
						(this.urlTree = i),
						(this.paramsInheritanceStrategy = s),
						(this.urlSerializer = a),
						(this.allowRedirects = !0),
						(this.applyRedirects = new R2(this.urlSerializer, this.urlTree))
				}
				noMatchError(t) {
					return new O(4002, !1)
				}
				recognize() {
					const t = wb(this.urlTree.root, [], [], this.config).segmentGroup
					return this.processSegmentGroup(this.injector, this.config, t, q).pipe(
						Zn((n) => {
							if (n instanceof xb)
								return (this.allowRedirects = !1), (this.urlTree = n.urlTree), this.match(n.urlTree)
							throw n instanceof Ra ? this.noMatchError(n) : n
						}),
						le((n) => {
							const o = new Sa(
									[],
									Object.freeze({}),
									Object.freeze({...this.urlTree.queryParams}),
									this.urlTree.fragment,
									{},
									q,
									this.rootComponentType,
									null,
									{}
								),
								r = new dn(o, n),
								i = new db('', r),
								s = (function kk(e, t, n = null, o = null) {
									return eb(Xy(e), t, n, o)
								})(o, [], this.urlTree.queryParams, this.urlTree.fragment)
							return (
								(s.queryParams = this.urlTree.queryParams),
								(i.url = this.urlSerializer.serialize(s)),
								this.inheritParamsAndData(i._root),
								{state: i, tree: s}
							)
						})
					)
				}
				match(t) {
					return this.processSegmentGroup(this.injector, this.config, t.root, q).pipe(
						Zn((o) => {
							throw o instanceof Ra ? this.noMatchError(o) : o
						})
					)
				}
				inheritParamsAndData(t) {
					const n = t.value,
						o = ub(n, this.paramsInheritanceStrategy)
					;(n.params = Object.freeze(o.params)),
						(n.data = Object.freeze(o.data)),
						t.children.forEach((r) => this.inheritParamsAndData(r))
				}
				processSegmentGroup(t, n, o, r) {
					return 0 === o.segments.length && o.hasChildren()
						? this.processChildren(t, n, o)
						: this.processSegment(t, n, o, o.segments, r, !0)
				}
				processChildren(t, n, o) {
					const r = []
					for (const i of Object.keys(o.children)) 'primary' === i ? r.unshift(i) : r.push(i)
					return ke(r).pipe(
						ui((i) => {
							const s = o.children[i],
								a = (function a2(e, t) {
									const n = e.filter((o) => It(o) === t)
									return n.push(...e.filter((o) => It(o) !== t)), n
								})(n, i)
							return this.processSegmentGroup(t, a, s, i)
						}),
						(function ck(e, t) {
							return Ee(
								(function ak(e, t, n, o, r) {
									return (i, s) => {
										let a = n,
											c = t,
											l = 0
										i.subscribe(
											Se(
												s,
												(u) => {
													const d = l++
													;(c = a ? e(c, u, d) : ((a = !0), u)), o && s.next(c)
												},
												r &&
													(() => {
														a && s.next(c), s.complete()
													})
											)
										)
									}
								})(e, t, arguments.length >= 2, !0)
							)
						})((i, s) => (i.push(...s), i)),
						Ca(null),
						(function lk(e, t) {
							const n = arguments.length >= 2
							return (o) =>
								o.pipe(e ? Pn((r, i) => e(r, i, o)) : gn, ud(1), n ? Ca(t) : $y(() => new ba()))
						})(),
						Te((i) => {
							if (null === i) return tr(o)
							const s = Pb(i)
							return (
								(function U2(e) {
									e.sort((t, n) =>
										t.value.outlet === q
											? -1
											: n.value.outlet === q
											? 1
											: t.value.outlet.localeCompare(n.value.outlet)
									)
								})(s),
								F(s)
							)
						})
					)
				}
				processSegment(t, n, o, r, i, s) {
					return ke(n).pipe(
						ui((a) =>
							this.processSegmentAgainstRoute(a._injector ?? t, n, a, o, r, i, s).pipe(
								Zn((c) => {
									if (c instanceof Ra) return F(null)
									throw c
								})
							)
						),
						Wn((a) => !!a),
						Zn((a) => {
							if (bb(a))
								return (function $2(e, t, n) {
									return 0 === t.length && !e.children[n]
								})(o, r, i)
									? F([])
									: tr(o)
							throw a
						})
					)
				}
				processSegmentAgainstRoute(t, n, o, r, i, s, a) {
					return (function z2(e, t, n, o) {
						return !!(It(e) === o || (o !== q && Aa(t, n, e))) && ('**' === e.path || Dd(t, e, n).matched)
					})(o, r, i, s)
						? void 0 === o.redirectTo
							? this.matchSegmentAgainstRoute(t, r, o, i, s, a)
							: a && this.allowRedirects
							? this.expandSegmentAgainstRouteUsingRedirect(t, r, n, o, i, s)
							: tr(r)
						: tr(r)
				}
				expandSegmentAgainstRouteUsingRedirect(t, n, o, r, i, s) {
					return '**' === r.path
						? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, o, r, s)
						: this.expandRegularSegmentAgainstRouteUsingRedirect(t, n, o, r, i, s)
				}
				expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, o, r) {
					const i = this.applyRedirects.applyRedirectCommands([], o.redirectTo, {})
					return o.redirectTo.startsWith('/')
						? Mb(i)
						: this.applyRedirects.lineralizeSegments(o, i).pipe(
								Te((s) => {
									const a = new oe(s, {})
									return this.processSegment(t, n, a, s, r, !1)
								})
						  )
				}
				expandRegularSegmentAgainstRouteUsingRedirect(t, n, o, r, i, s) {
					const {
						matched: a,
						consumedSegments: c,
						remainingSegments: l,
						positionalParamSegments: u,
					} = Dd(n, r, i)
					if (!a) return tr(n)
					const d = this.applyRedirects.applyRedirectCommands(c, r.redirectTo, u)
					return r.redirectTo.startsWith('/')
						? Mb(d)
						: this.applyRedirects
								.lineralizeSegments(r, d)
								.pipe(Te((p) => this.processSegment(t, o, n, p.concat(l), s, !1)))
				}
				matchSegmentAgainstRoute(t, n, o, r, i, s) {
					let a
					if ('**' === o.path) {
						const c = r.length > 0 ? By(r).parameters : {}
						;(a = F({
							snapshot: new Sa(
								r,
								c,
								Object.freeze({...this.urlTree.queryParams}),
								this.urlTree.fragment,
								Ob(o),
								It(o),
								o.component ?? o._loadedComponent ?? null,
								o,
								Db(o)
							),
							consumedSegments: [],
							remainingSegments: [],
						})),
							(n.children = {})
					} else
						a = A2(n, o, r, t).pipe(
							le(({matched: c, consumedSegments: l, remainingSegments: u, parameters: d}) =>
								c
									? {
											snapshot: new Sa(
												l,
												d,
												Object.freeze({...this.urlTree.queryParams}),
												this.urlTree.fragment,
												Ob(o),
												It(o),
												o.component ?? o._loadedComponent ?? null,
												o,
												Db(o)
											),
											consumedSegments: l,
											remainingSegments: u,
									  }
									: null
							)
						)
					return a.pipe(
						kt((c) =>
							null === c
								? tr(n)
								: this.getChildConfig((t = o._injector ?? t), o, r).pipe(
										kt(({routes: l}) => {
											const u = o._loadedInjector ?? t,
												{snapshot: d, consumedSegments: p, remainingSegments: m} = c,
												{segmentGroup: v, slicedSegments: y} = wb(n, p, m, l)
											if (0 === y.length && v.hasChildren())
												return this.processChildren(u, l, v).pipe(
													le((P) => (null === P ? null : [new dn(d, P)]))
												)
											if (0 === l.length && 0 === y.length) return F([new dn(d, [])])
											const x = It(o) === i
											return this.processSegment(u, l, v, y, x ? q : i, !0).pipe(
												le((P) => [new dn(d, P)])
											)
										})
								  )
						)
					)
				}
				getChildConfig(t, n, o) {
					return n.children
						? F({routes: n.children, injector: t})
						: n.loadChildren
						? void 0 !== n._loadedRoutes
							? F({routes: n._loadedRoutes, injector: n._loadedInjector})
							: (function S2(e, t, n, o) {
									const r = t.canLoad
									return void 0 === r || 0 === r.length
										? F(!0)
										: F(
												r.map((s) => {
													const a = Xo(s, e)
													return On(
														(function h2(e) {
															return e && wi(e.canLoad)
														})(a)
															? a.canLoad(t, n)
															: e.runInContext(() => a(t, n))
													)
												})
										  ).pipe(er(), Cb())
							  })(t, n, o).pipe(
									Te((r) =>
										r
											? this.configLoader.loadChildren(t, n).pipe(
													Ze((i) => {
														;(n._loadedRoutes = i.routes), (n._loadedInjector = i.injector)
													})
											  )
											: (function k2(e) {
													return li(hb(!1, 3))
											  })()
									)
							  )
						: F({routes: [], injector: t})
				}
			}
			function H2(e) {
				const t = e.value.routeConfig
				return t && '' === t.path
			}
			function Pb(e) {
				const t = [],
					n = new Set()
				for (const o of e) {
					if (!H2(o)) {
						t.push(o)
						continue
					}
					const r = t.find((i) => o.value.routeConfig === i.value.routeConfig)
					void 0 !== r ? (r.children.push(...o.children), n.add(r)) : t.push(o)
				}
				for (const o of n) {
					const r = Pb(o.children)
					t.push(new dn(o.value, r))
				}
				return t.filter((o) => !n.has(o))
			}
			function Ob(e) {
				return e.data || {}
			}
			function Db(e) {
				return e.resolve || {}
			}
			function Eb(e) {
				return 'string' == typeof e.title || null === e.title
			}
			function Ed(e) {
				return kt((t) => {
					const n = e(t)
					return n ? ke(n).pipe(le(() => t)) : F(t)
				})
			}
			const nr = new T('ROUTES')
			let Sd = (() => {
				class e {
					constructor() {
						;(this.componentLoaders = new WeakMap()),
							(this.childrenLoaders = new WeakMap()),
							(this.compiler = S(fv))
					}
					loadComponent(n) {
						if (this.componentLoaders.get(n)) return this.componentLoaders.get(n)
						if (n._loadedComponent) return F(n._loadedComponent)
						this.onLoadStartListener && this.onLoadStartListener(n)
						const o = On(n.loadComponent()).pipe(
								le(Sb),
								Ze((i) => {
									this.onLoadEndListener && this.onLoadEndListener(n), (n._loadedComponent = i)
								}),
								dd(() => {
									this.componentLoaders.delete(n)
								})
							),
							r = new zy(o, () => new Wt()).pipe(ld())
						return this.componentLoaders.set(n, r), r
					}
					loadChildren(n, o) {
						if (this.childrenLoaders.get(o)) return this.childrenLoaders.get(o)
						if (o._loadedRoutes) return F({routes: o._loadedRoutes, injector: o._loadedInjector})
						this.onLoadStartListener && this.onLoadStartListener(o)
						const i = this.loadModuleFactoryOrRoutes(o.loadChildren).pipe(
								le((a) => {
									this.onLoadEndListener && this.onLoadEndListener(o)
									let c, l
									return (
										Array.isArray(a)
											? (l = a)
											: ((c = a.create(n).injector),
											  (l = c.get(nr, [], W.Self | W.Optional).flat())),
										{routes: l.map(Pd), injector: c}
									)
								}),
								dd(() => {
									this.childrenLoaders.delete(o)
								})
							),
							s = new zy(i, () => new Wt()).pipe(ld())
						return this.childrenLoaders.set(o, s), s
					}
					loadModuleFactoryOrRoutes(n) {
						return On(n()).pipe(
							le(Sb),
							Te((o) =>
								o instanceof v_ || Array.isArray(o) ? F(o) : ke(this.compiler.compileModuleAsync(o))
							)
						)
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
					e
				)
			})()
			function Sb(e) {
				return (function K2(e) {
					return e && 'object' == typeof e && 'default' in e
				})(e)
					? e.default
					: e
			}
			let Na = (() => {
				class e {
					get hasRequestedNavigation() {
						return 0 !== this.navigationId
					}
					constructor() {
						;(this.currentNavigation = null),
							(this.lastSuccessfulNavigation = null),
							(this.events = new Wt()),
							(this.configLoader = S(Sd)),
							(this.environmentInjector = S(tn)),
							(this.urlSerializer = S(gi)),
							(this.rootContexts = S(yi)),
							(this.inputBindingEnabled = null !== S(Ia, {optional: !0})),
							(this.navigationId = 0),
							(this.afterPreactivation = () => F(void 0)),
							(this.rootComponentType = null),
							(this.configLoader.onLoadEndListener = (r) => this.events.next(new qk(r))),
							(this.configLoader.onLoadStartListener = (r) => this.events.next(new Hk(r)))
					}
					complete() {
						this.transitions?.complete()
					}
					handleNavigationRequest(n) {
						const o = ++this.navigationId
						this.transitions?.next({...this.transitions.value, ...n, id: o})
					}
					setupNavigations(n) {
						return (
							(this.transitions = new dt({
								id: 0,
								currentUrlTree: n.currentUrlTree,
								currentRawUrl: n.currentUrlTree,
								extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
								urlAfterRedirects: n.urlHandlingStrategy.extract(n.currentUrlTree),
								rawUrl: n.currentUrlTree,
								extras: {},
								resolve: null,
								reject: null,
								promise: Promise.resolve(!0),
								source: _i,
								restoredState: null,
								currentSnapshot: n.routerState.snapshot,
								targetSnapshot: null,
								currentRouterState: n.routerState,
								targetRouterState: null,
								guards: {canActivateChecks: [], canDeactivateChecks: []},
								guardsResult: null,
							})),
							this.transitions.pipe(
								Pn((o) => 0 !== o.id),
								le((o) => ({...o, extractedUrl: n.urlHandlingStrategy.extract(o.rawUrl)})),
								kt((o) => {
									let r = !1,
										i = !1
									return F(o).pipe(
										Ze((s) => {
											this.currentNavigation = {
												id: s.id,
												initialUrl: s.rawUrl,
												extractedUrl: s.extractedUrl,
												trigger: s.source,
												extras: s.extras,
												previousNavigation: this.lastSuccessfulNavigation
													? {...this.lastSuccessfulNavigation, previousNavigation: null}
													: null,
											}
										}),
										kt((s) => {
											const a = n.browserUrlTree.toString(),
												c =
													!n.navigated ||
													s.extractedUrl.toString() !== a ||
													a !== n.currentUrlTree.toString()
											if (
												!c &&
												'reload' !== (s.extras.onSameUrlNavigation ?? n.onSameUrlNavigation)
											) {
												const u = ''
												return (
													this.events.next(new vi(s.id, n.serializeUrl(o.rawUrl), u, 0)),
													(n.rawUrlTree = s.rawUrl),
													s.resolve(null),
													Tt
												)
											}
											if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
												return (
													Ib(s.source) && (n.browserUrlTree = s.extractedUrl),
													F(s).pipe(
														kt((u) => {
															const d = this.transitions?.getValue()
															return (
																this.events.next(
																	new _d(
																		u.id,
																		this.urlSerializer.serialize(u.extractedUrl),
																		u.source,
																		u.restoredState
																	)
																),
																d !== this.transitions?.getValue()
																	? Tt
																	: Promise.resolve(u)
															)
														}),
														(function q2(e, t, n, o, r, i) {
															return Te((s) =>
																(function V2(e, t, n, o, r, i, s = 'emptyOnly') {
																	return new B2(e, t, n, o, r, s, i).recognize()
																})(e, t, n, o, s.extractedUrl, r, i).pipe(
																	le(({state: a, tree: c}) => ({
																		...s,
																		targetSnapshot: a,
																		urlAfterRedirects: c,
																	}))
																)
															)
														})(
															this.environmentInjector,
															this.configLoader,
															this.rootComponentType,
															n.config,
															this.urlSerializer,
															n.paramsInheritanceStrategy
														),
														Ze((u) => {
															if (
																((o.targetSnapshot = u.targetSnapshot),
																(o.urlAfterRedirects = u.urlAfterRedirects),
																(this.currentNavigation = {
																	...this.currentNavigation,
																	finalUrl: u.urlAfterRedirects,
																}),
																'eager' === n.urlUpdateStrategy)
															) {
																if (!u.extras.skipLocationChange) {
																	const p = n.urlHandlingStrategy.merge(
																		u.urlAfterRedirects,
																		u.rawUrl
																	)
																	n.setBrowserUrl(p, u)
																}
																n.browserUrlTree = u.urlAfterRedirects
															}
															const d = new zk(
																u.id,
																this.urlSerializer.serialize(u.extractedUrl),
																this.urlSerializer.serialize(u.urlAfterRedirects),
																u.targetSnapshot
															)
															this.events.next(d)
														})
													)
												)
											if (c && n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)) {
												const {
														id: u,
														extractedUrl: d,
														source: p,
														restoredState: m,
														extras: v,
													} = s,
													y = new _d(u, this.urlSerializer.serialize(d), p, m)
												this.events.next(y)
												const x = lb(0, this.rootComponentType).snapshot
												return F(
													(o = {
														...s,
														targetSnapshot: x,
														urlAfterRedirects: d,
														extras: {...v, skipLocationChange: !1, replaceUrl: !1},
													})
												)
											}
											{
												const u = ''
												return (
													this.events.next(
														new vi(s.id, n.serializeUrl(o.extractedUrl), u, 1)
													),
													(n.rawUrlTree = s.rawUrl),
													s.resolve(null),
													Tt
												)
											}
										}),
										Ze((s) => {
											const a = new $k(
												s.id,
												this.urlSerializer.serialize(s.extractedUrl),
												this.urlSerializer.serialize(s.urlAfterRedirects),
												s.targetSnapshot
											)
											this.events.next(a)
										}),
										le(
											(s) =>
												(o = {
													...s,
													guards: u2(s.targetSnapshot, s.currentSnapshot, this.rootContexts),
												})
										),
										(function C2(e, t) {
											return Te((n) => {
												const {
													targetSnapshot: o,
													currentSnapshot: r,
													guards: {canActivateChecks: i, canDeactivateChecks: s},
												} = n
												return 0 === s.length && 0 === i.length
													? F({...n, guardsResult: !0})
													: (function x2(e, t, n, o) {
															return ke(e).pipe(
																Te((r) =>
																	(function E2(e, t, n, o, r) {
																		const i =
																			t && t.routeConfig
																				? t.routeConfig.canDeactivate
																				: null
																		return i && 0 !== i.length
																			? F(
																					i.map((a) => {
																						const c = Ci(t) ?? r,
																							l = Xo(a, c)
																						return On(
																							(function v2(e) {
																								return (
																									e &&
																									wi(e.canDeactivate)
																								)
																							})(l)
																								? l.canDeactivate(
																										e,
																										t,
																										n,
																										o
																								  )
																								: c.runInContext(() =>
																										l(e, t, n, o)
																								  )
																						).pipe(Wn())
																					})
																			  ).pipe(er())
																			: F(!0)
																	})(r.component, r.route, n, t, o)
																),
																Wn((r) => !0 !== r, !0)
															)
													  })(s, o, r, e).pipe(
															Te((a) =>
																a &&
																(function p2(e) {
																	return 'boolean' == typeof e
																})(a)
																	? (function M2(e, t, n, o) {
																			return ke(t).pipe(
																				ui((r) =>
																					cd(
																						(function P2(e, t) {
																							return (
																								null !== e &&
																									t &&
																									t(new Gk(e)),
																								F(!0)
																							)
																						})(r.route.parent, o),
																						(function w2(e, t) {
																							return (
																								null !== e &&
																									t &&
																									t(new Zk(e)),
																								F(!0)
																							)
																						})(r.route, o),
																						(function D2(e, t, n) {
																							const o = t[t.length - 1],
																								i = t
																									.slice(
																										0,
																										t.length - 1
																									)
																									.reverse()
																									.map((s) =>
																										(function d2(
																											e
																										) {
																											const t =
																												e.routeConfig
																													? e
																															.routeConfig
																															.canActivateChild
																													: null
																											return t &&
																												0 !==
																													t.length
																												? {
																														node: e,
																														guards: t,
																												  }
																												: null
																										})(s)
																									)
																									.filter(
																										(s) =>
																											null !== s
																									)
																									.map((s) =>
																										jy(() =>
																											F(
																												s.guards.map(
																													(
																														c
																													) => {
																														const l =
																																Ci(
																																	s.node
																																) ??
																																n,
																															u =
																																Xo(
																																	c,
																																	l
																																)
																														return On(
																															(function _2(
																																e
																															) {
																																return (
																																	e &&
																																	wi(
																																		e.canActivateChild
																																	)
																																)
																															})(
																																u
																															)
																																? u.canActivateChild(
																																		o,
																																		e
																																  )
																																: l.runInContext(
																																		() =>
																																			u(
																																				o,
																																				e
																																			)
																																  )
																														).pipe(
																															Wn()
																														)
																													}
																												)
																											).pipe(er())
																										)
																									)
																							return F(i).pipe(er())
																						})(e, r.path, n),
																						(function O2(e, t, n) {
																							const o = t.routeConfig
																								? t.routeConfig
																										.canActivate
																								: null
																							if (!o || 0 === o.length)
																								return F(!0)
																							const r = o.map((i) =>
																								jy(() => {
																									const s =
																											Ci(t) ?? n,
																										a = Xo(i, s)
																									return On(
																										(function m2(
																											e
																										) {
																											return (
																												e &&
																												wi(
																													e.canActivate
																												)
																											)
																										})(a)
																											? a.canActivate(
																													t,
																													e
																											  )
																											: s.runInContext(
																													() =>
																														a(
																															t,
																															e
																														)
																											  )
																									).pipe(Wn())
																								})
																							)
																							return F(r).pipe(er())
																						})(e, r.route, n)
																					)
																				),
																				Wn((r) => !0 !== r, !0)
																			)
																	  })(o, i, e, t)
																	: F(a)
															),
															le((a) => ({...n, guardsResult: a}))
													  )
											})
										})(this.environmentInjector, (s) => this.events.next(s)),
										Ze((s) => {
											if (((o.guardsResult = s.guardsResult), Yn(s.guardsResult)))
												throw pb(0, s.guardsResult)
											const a = new Vk(
												s.id,
												this.urlSerializer.serialize(s.extractedUrl),
												this.urlSerializer.serialize(s.urlAfterRedirects),
												s.targetSnapshot,
												!!s.guardsResult
											)
											this.events.next(a)
										}),
										Pn(
											(s) =>
												!!s.guardsResult ||
												(n.restoreHistory(s), this.cancelNavigationTransition(s, '', 3), !1)
										),
										Ed((s) => {
											if (s.guards.canActivateChecks.length)
												return F(s).pipe(
													Ze((a) => {
														const c = new Bk(
															a.id,
															this.urlSerializer.serialize(a.extractedUrl),
															this.urlSerializer.serialize(a.urlAfterRedirects),
															a.targetSnapshot
														)
														this.events.next(c)
													}),
													kt((a) => {
														let c = !1
														return F(a).pipe(
															(function G2(e, t) {
																return Te((n) => {
																	const {
																		targetSnapshot: o,
																		guards: {canActivateChecks: r},
																	} = n
																	if (!r.length) return F(n)
																	let i = 0
																	return ke(r).pipe(
																		ui((s) =>
																			(function W2(e, t, n, o) {
																				const r = e.routeConfig,
																					i = e._resolve
																				return (
																					void 0 !== r?.title &&
																						!Eb(r) &&
																						(i[di] = r.title),
																					(function Z2(e, t, n, o) {
																						const r = (function Q2(e) {
																							return [
																								...Object.keys(e),
																								...Object.getOwnPropertySymbols(
																									e
																								),
																							]
																						})(e)
																						if (0 === r.length) return F({})
																						const i = {}
																						return ke(r).pipe(
																							Te((s) =>
																								(function Y2(
																									e,
																									t,
																									n,
																									o
																								) {
																									const r =
																											Ci(t) ?? o,
																										i = Xo(e, r)
																									return On(
																										i.resolve
																											? i.resolve(
																													t,
																													n
																											  )
																											: r.runInContext(
																													() =>
																														i(
																															t,
																															n
																														)
																											  )
																									)
																								})(e[s], t, n, o).pipe(
																									Wn(),
																									Ze((a) => {
																										i[s] = a
																									})
																								)
																							),
																							ud(1),
																							(function uk(e) {
																								return le(() => e)
																							})(i),
																							Zn((s) =>
																								bb(s) ? Tt : li(s)
																							)
																						)
																					})(i, e, t, o).pipe(
																						le(
																							(s) => (
																								(e._resolvedData = s),
																								(e.data = ub(
																									e,
																									n
																								).resolve),
																								r &&
																									Eb(r) &&
																									(e.data[di] =
																										r.title),
																								null
																							)
																						)
																					)
																				)
																			})(s.route, o, e, t)
																		),
																		Ze(() => i++),
																		ud(1),
																		Te((s) => (i === r.length ? F(n) : Tt))
																	)
																})
															})(n.paramsInheritanceStrategy, this.environmentInjector),
															Ze({
																next: () => (c = !0),
																complete: () => {
																	c ||
																		(n.restoreHistory(a),
																		this.cancelNavigationTransition(a, '', 2))
																},
															})
														)
													}),
													Ze((a) => {
														const c = new Uk(
															a.id,
															this.urlSerializer.serialize(a.extractedUrl),
															this.urlSerializer.serialize(a.urlAfterRedirects),
															a.targetSnapshot
														)
														this.events.next(c)
													})
												)
										}),
										Ed((s) => {
											const a = (c) => {
												const l = []
												c.routeConfig?.loadComponent &&
													!c.routeConfig._loadedComponent &&
													l.push(
														this.configLoader.loadComponent(c.routeConfig).pipe(
															Ze((u) => {
																c.component = u
															}),
															le(() => {})
														)
													)
												for (const u of c.children) l.push(...a(u))
												return l
											}
											return ad(a(s.targetSnapshot.root)).pipe(Ca(), Wo(1))
										}),
										Ed(() => this.afterPreactivation()),
										le((s) => {
											const a = (function e2(e, t, n) {
												const o = bi(e, t._root, n ? n._root : void 0)
												return new cb(o, t)
											})(n.routeReuseStrategy, s.targetSnapshot, s.currentRouterState)
											return (o = {...s, targetRouterState: a})
										}),
										Ze((s) => {
											;(n.currentUrlTree = s.urlAfterRedirects),
												(n.rawUrlTree = n.urlHandlingStrategy.merge(
													s.urlAfterRedirects,
													s.rawUrl
												)),
												(n.routerState = s.targetRouterState),
												'deferred' === n.urlUpdateStrategy &&
													(s.extras.skipLocationChange || n.setBrowserUrl(n.rawUrlTree, s),
													(n.browserUrlTree = s.urlAfterRedirects))
										}),
										((e, t, n, o) =>
											le(
												(r) => (
													new l2(t, r.targetRouterState, r.currentRouterState, n, o).activate(
														e
													),
													r
												)
											))(
											this.rootContexts,
											n.routeReuseStrategy,
											(s) => this.events.next(s),
											this.inputBindingEnabled
										),
										Wo(1),
										Ze({
											next: (s) => {
												;(r = !0),
													(this.lastSuccessfulNavigation = this.currentNavigation),
													(n.navigated = !0),
													this.events.next(
														new Kn(
															s.id,
															this.urlSerializer.serialize(s.extractedUrl),
															this.urlSerializer.serialize(n.currentUrlTree)
														)
													),
													n.titleStrategy?.updateTitle(s.targetRouterState.snapshot),
													s.resolve(!0)
											},
											complete: () => {
												r = !0
											},
										}),
										dd(() => {
											r || i || this.cancelNavigationTransition(o, '', 1),
												this.currentNavigation?.id === o.id && (this.currentNavigation = null)
										}),
										Zn((s) => {
											if (((i = !0), _b(s))) {
												mb(s) || ((n.navigated = !0), n.restoreHistory(o, !0))
												const a = new Ea(
													o.id,
													this.urlSerializer.serialize(o.extractedUrl),
													s.message,
													s.cancellationCode
												)
												if ((this.events.next(a), mb(s))) {
													const c = n.urlHandlingStrategy.merge(s.url, n.rawUrlTree),
														l = {
															skipLocationChange: o.extras.skipLocationChange,
															replaceUrl: 'eager' === n.urlUpdateStrategy || Ib(o.source),
														}
													n.scheduleNavigation(c, _i, null, l, {
														resolve: o.resolve,
														reject: o.reject,
														promise: o.promise,
													})
												} else o.resolve(!1)
											} else {
												n.restoreHistory(o, !0)
												const a = new vd(
													o.id,
													this.urlSerializer.serialize(o.extractedUrl),
													s,
													o.targetSnapshot ?? void 0
												)
												this.events.next(a)
												try {
													o.resolve(n.errorHandler(s))
												} catch (c) {
													o.reject(c)
												}
											}
											return Tt
										})
									)
								})
							)
						)
					}
					cancelNavigationTransition(n, o, r) {
						const i = new Ea(n.id, this.urlSerializer.serialize(n.extractedUrl), o, r)
						this.events.next(i), n.resolve(!1)
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
					e
				)
			})()
			function Ib(e) {
				return e !== _i
			}
			let Tb = (() => {
					class e {
						buildTitle(n) {
							let o,
								r = n.root
							for (; void 0 !== r; )
								(o = this.getResolvedTitleForRoute(r) ?? o),
									(r = r.children.find((i) => i.outlet === q))
							return o
						}
						getResolvedTitleForRoute(n) {
							return n.data[di]
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵprov = N({
							token: e,
							factory: function () {
								return S(J2)
							},
							providedIn: 'root',
						})),
						e
					)
				})(),
				J2 = (() => {
					class e extends Tb {
						constructor(n) {
							super(), (this.title = n)
						}
						updateTitle(n) {
							const o = this.buildTitle(n)
							void 0 !== o && this.title.setTitle(o)
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(R(Ry))
						}),
						(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
						e
					)
				})(),
				X2 = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵprov = N({
							token: e,
							factory: function () {
								return S(tR)
							},
							providedIn: 'root',
						})),
						e
					)
				})()
			class eR {
				shouldDetach(t) {
					return !1
				}
				store(t, n) {}
				shouldAttach(t) {
					return !1
				}
				retrieve(t) {
					return null
				}
				shouldReuseRoute(t, n) {
					return t.routeConfig === n.routeConfig
				}
			}
			let tR = (() => {
				class e extends eR {}
				return (
					(e.ɵfac = (function () {
						let t
						return function (o) {
							return (
								t ||
								(t = (function xg(e) {
									return Qt(() => {
										const t = e.prototype.constructor,
											n = t[Yt] || Sc(t),
											o = Object.prototype
										let r = Object.getPrototypeOf(e.prototype).constructor
										for (; r && r !== o; ) {
											const i = r[Yt] || Sc(r)
											if (i && i !== n) return i
											r = Object.getPrototypeOf(r)
										}
										return (i) => new i()
									})
								})(e))
							)(o || e)
						}
					})()),
					(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
					e
				)
			})()
			const La = new T('', {providedIn: 'root', factory: () => ({})})
			let nR = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵprov = N({
							token: e,
							factory: function () {
								return S(oR)
							},
							providedIn: 'root',
						})),
						e
					)
				})(),
				oR = (() => {
					class e {
						shouldProcessUrl(n) {
							return !0
						}
						extract(n) {
							return n
						}
						merge(n, o) {
							return n
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
						e
					)
				})()
			var Pi = (function (e) {
				return (
					(e[(e.COMPLETE = 0)] = 'COMPLETE'),
					(e[(e.FAILED = 1)] = 'FAILED'),
					(e[(e.REDIRECTING = 2)] = 'REDIRECTING'),
					e
				)
			})(Pi || {})
			function kb(e, t) {
				e.events
					.pipe(
						Pn((n) => n instanceof Kn || n instanceof Ea || n instanceof vd || n instanceof vi),
						le((n) =>
							n instanceof Kn || n instanceof vi
								? Pi.COMPLETE
								: n instanceof Ea && (0 === n.code || 1 === n.code)
								? Pi.REDIRECTING
								: Pi.FAILED
						),
						Pn((n) => n !== Pi.REDIRECTING),
						Wo(1)
					)
					.subscribe(() => {
						t()
					})
			}
			function rR(e) {
				throw e
			}
			function iR(e, t, n) {
				return t.parse('/')
			}
			const sR = {paths: 'exact', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'exact'},
				aR = {paths: 'subset', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'subset'}
			let vt = (() => {
				class e {
					get navigationId() {
						return this.navigationTransitions.navigationId
					}
					get browserPageId() {
						if ('computed' === this.canceledNavigationResolution)
							return this.location.getState()?.ɵrouterPageId
					}
					get events() {
						return this.navigationTransitions.events
					}
					constructor() {
						;(this.disposed = !1),
							(this.currentPageId = 0),
							(this.console = S(uv)),
							(this.isNgZoneEnabled = !1),
							(this.options = S(La, {optional: !0}) || {}),
							(this.pendingTasks = S(dv)),
							(this.errorHandler = this.options.errorHandler || rR),
							(this.malformedUriErrorHandler = this.options.malformedUriErrorHandler || iR),
							(this.navigated = !1),
							(this.lastSuccessfulId = -1),
							(this.urlHandlingStrategy = S(nR)),
							(this.routeReuseStrategy = S(X2)),
							(this.titleStrategy = S(Tb)),
							(this.onSameUrlNavigation = this.options.onSameUrlNavigation || 'ignore'),
							(this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || 'emptyOnly'),
							(this.urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred'),
							(this.canceledNavigationResolution =
								this.options.canceledNavigationResolution || 'replace'),
							(this.config = S(nr, {optional: !0})?.flat() ?? []),
							(this.navigationTransitions = S(Na)),
							(this.urlSerializer = S(gi)),
							(this.location = S(Lu)),
							(this.componentInputBindingEnabled = !!S(Ia, {optional: !0})),
							(this.isNgZoneEnabled = S(_e) instanceof _e && _e.isInAngularZone()),
							this.resetConfig(this.config),
							(this.currentUrlTree = new Qo()),
							(this.rawUrlTree = this.currentUrlTree),
							(this.browserUrlTree = this.currentUrlTree),
							(this.routerState = lb(0, null)),
							this.navigationTransitions.setupNavigations(this).subscribe(
								(n) => {
									;(this.lastSuccessfulId = n.id), (this.currentPageId = this.browserPageId ?? 0)
								},
								(n) => {
									this.console.warn(`Unhandled Navigation Error: ${n}`)
								}
							)
					}
					resetRootComponentType(n) {
						;(this.routerState.root.component = n), (this.navigationTransitions.rootComponentType = n)
					}
					initialNavigation() {
						if ((this.setUpLocationChangeListener(), !this.navigationTransitions.hasRequestedNavigation)) {
							const n = this.location.getState()
							this.navigateToSyncWithBrowser(this.location.path(!0), _i, n)
						}
					}
					setUpLocationChangeListener() {
						this.locationSubscription ||
							(this.locationSubscription = this.location.subscribe((n) => {
								const o = 'popstate' === n.type ? 'popstate' : 'hashchange'
								'popstate' === o &&
									setTimeout(() => {
										this.navigateToSyncWithBrowser(n.url, o, n.state)
									}, 0)
							}))
					}
					navigateToSyncWithBrowser(n, o, r) {
						const i = {replaceUrl: !0},
							s = r?.navigationId ? r : null
						if (r) {
							const c = {...r}
							delete c.navigationId, delete c.ɵrouterPageId, 0 !== Object.keys(c).length && (i.state = c)
						}
						const a = this.parseUrl(n)
						this.scheduleNavigation(a, o, s, i)
					}
					get url() {
						return this.serializeUrl(this.currentUrlTree)
					}
					getCurrentNavigation() {
						return this.navigationTransitions.currentNavigation
					}
					get lastSuccessfulNavigation() {
						return this.navigationTransitions.lastSuccessfulNavigation
					}
					resetConfig(n) {
						;(this.config = n.map(Pd)), (this.navigated = !1), (this.lastSuccessfulId = -1)
					}
					ngOnDestroy() {
						this.dispose()
					}
					dispose() {
						this.navigationTransitions.complete(),
							this.locationSubscription &&
								(this.locationSubscription.unsubscribe(), (this.locationSubscription = void 0)),
							(this.disposed = !0)
					}
					createUrlTree(n, o = {}) {
						const {
								relativeTo: r,
								queryParams: i,
								fragment: s,
								queryParamsHandling: a,
								preserveFragment: c,
							} = o,
							l = c ? this.currentUrlTree.fragment : s
						let d,
							u = null
						switch (a) {
							case 'merge':
								u = {...this.currentUrlTree.queryParams, ...i}
								break
							case 'preserve':
								u = this.currentUrlTree.queryParams
								break
							default:
								u = i || null
						}
						null !== u && (u = this.removeEmptyProps(u))
						try {
							d = Xy(r ? r.snapshot : this.routerState.snapshot.root)
						} catch {
							;('string' != typeof n[0] || !n[0].startsWith('/')) && (n = []),
								(d = this.currentUrlTree.root)
						}
						return eb(d, n, u, l ?? null)
					}
					navigateByUrl(n, o = {skipLocationChange: !1}) {
						const r = Yn(n) ? n : this.parseUrl(n),
							i = this.urlHandlingStrategy.merge(r, this.rawUrlTree)
						return this.scheduleNavigation(i, _i, null, o)
					}
					navigate(n, o = {skipLocationChange: !1}) {
						return (
							(function cR(e) {
								for (let t = 0; t < e.length; t++) if (null == e[t]) throw new O(4008, !1)
							})(n),
							this.navigateByUrl(this.createUrlTree(n, o), o)
						)
					}
					serializeUrl(n) {
						return this.urlSerializer.serialize(n)
					}
					parseUrl(n) {
						let o
						try {
							o = this.urlSerializer.parse(n)
						} catch (r) {
							o = this.malformedUriErrorHandler(r, this.urlSerializer, n)
						}
						return o
					}
					isActive(n, o) {
						let r
						if (((r = !0 === o ? {...sR} : !1 === o ? {...aR} : o), Yn(n)))
							return Hy(this.currentUrlTree, n, r)
						const i = this.parseUrl(n)
						return Hy(this.currentUrlTree, i, r)
					}
					removeEmptyProps(n) {
						return Object.keys(n).reduce((o, r) => {
							const i = n[r]
							return null != i && (o[r] = i), o
						}, {})
					}
					scheduleNavigation(n, o, r, i, s) {
						if (this.disposed) return Promise.resolve(!1)
						let a, c, l
						s
							? ((a = s.resolve), (c = s.reject), (l = s.promise))
							: (l = new Promise((d, p) => {
									;(a = d), (c = p)
							  }))
						const u = this.pendingTasks.add()
						return (
							kb(this, () => {
								queueMicrotask(() => this.pendingTasks.remove(u))
							}),
							this.navigationTransitions.handleNavigationRequest({
								source: o,
								restoredState: r,
								currentUrlTree: this.currentUrlTree,
								currentRawUrl: this.currentUrlTree,
								rawUrl: n,
								extras: i,
								resolve: a,
								reject: c,
								promise: l,
								currentSnapshot: this.routerState.snapshot,
								currentRouterState: this.routerState,
							}),
							l.catch((d) => Promise.reject(d))
						)
					}
					setBrowserUrl(n, o) {
						const r = this.urlSerializer.serialize(n)
						if (this.location.isCurrentPathEqualTo(r) || o.extras.replaceUrl) {
							const s = {...o.extras.state, ...this.generateNgRouterState(o.id, this.browserPageId)}
							this.location.replaceState(r, '', s)
						} else {
							const i = {
								...o.extras.state,
								...this.generateNgRouterState(o.id, (this.browserPageId ?? 0) + 1),
							}
							this.location.go(r, '', i)
						}
					}
					restoreHistory(n, o = !1) {
						if ('computed' === this.canceledNavigationResolution) {
							const i = this.currentPageId - (this.browserPageId ?? this.currentPageId)
							0 !== i
								? this.location.historyGo(i)
								: this.currentUrlTree === this.getCurrentNavigation()?.finalUrl &&
								  0 === i &&
								  (this.resetState(n),
								  (this.browserUrlTree = n.currentUrlTree),
								  this.resetUrlToCurrentUrlTree())
						} else
							'replace' === this.canceledNavigationResolution &&
								(o && this.resetState(n), this.resetUrlToCurrentUrlTree())
					}
					resetState(n) {
						;(this.routerState = n.currentRouterState),
							(this.currentUrlTree = n.currentUrlTree),
							(this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n.rawUrl))
					}
					resetUrlToCurrentUrlTree() {
						this.location.replaceState(
							this.urlSerializer.serialize(this.rawUrlTree),
							'',
							this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
						)
					}
					generateNgRouterState(n, o) {
						return 'computed' === this.canceledNavigationResolution
							? {navigationId: n, ɵrouterPageId: o}
							: {navigationId: n}
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
					e
				)
			})()
			class Rb {}
			let dR = (() => {
				class e {
					constructor(n, o, r, i, s) {
						;(this.router = n), (this.injector = r), (this.preloadingStrategy = i), (this.loader = s)
					}
					setUpPreloading() {
						this.subscription = this.router.events
							.pipe(
								Pn((n) => n instanceof Kn),
								ui(() => this.preload())
							)
							.subscribe(() => {})
					}
					preload() {
						return this.processRoutes(this.injector, this.router.config)
					}
					ngOnDestroy() {
						this.subscription && this.subscription.unsubscribe()
					}
					processRoutes(n, o) {
						const r = []
						for (const i of o) {
							i.providers && !i._injector && (i._injector = Xl(i.providers, n, `Route: ${i.path}`))
							const s = i._injector ?? n,
								a = i._loadedInjector ?? s
							;((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
								(i.loadComponent && !i._loadedComponent)) &&
								r.push(this.preloadConfig(s, i)),
								(i.children || i._loadedRoutes) &&
									r.push(this.processRoutes(a, i.children ?? i._loadedRoutes))
						}
						return ke(r).pipe(Jn())
					}
					preloadConfig(n, o) {
						return this.preloadingStrategy.preload(o, () => {
							let r
							r = o.loadChildren && void 0 === o.canLoad ? this.loader.loadChildren(n, o) : F(null)
							const i = r.pipe(
								Te((s) =>
									null === s
										? F(void 0)
										: ((o._loadedRoutes = s.routes),
										  (o._loadedInjector = s.injector),
										  this.processRoutes(s.injector ?? n, s.routes))
								)
							)
							return o.loadComponent && !o._loadedComponent
								? ke([i, this.loader.loadComponent(o)]).pipe(Jn())
								: i
						})
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(R(vt), R(fv), R(tn), R(Rb), R(Sd))
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac, providedIn: 'root'})),
					e
				)
			})()
			const Td = new T('')
			let Ab = (() => {
				class e {
					constructor(n, o, r, i, s = {}) {
						;(this.urlSerializer = n),
							(this.transitions = o),
							(this.viewportScroller = r),
							(this.zone = i),
							(this.options = s),
							(this.lastId = 0),
							(this.lastSource = 'imperative'),
							(this.restoredId = 0),
							(this.store = {}),
							(s.scrollPositionRestoration = s.scrollPositionRestoration || 'disabled'),
							(s.anchorScrolling = s.anchorScrolling || 'disabled')
					}
					init() {
						'disabled' !== this.options.scrollPositionRestoration &&
							this.viewportScroller.setHistoryScrollRestoration('manual'),
							(this.routerEventsSubscription = this.createScrollEvents()),
							(this.scrollEventsSubscription = this.consumeScrollEvents())
					}
					createScrollEvents() {
						return this.transitions.events.subscribe((n) => {
							n instanceof _d
								? ((this.store[this.lastId] = this.viewportScroller.getScrollPosition()),
								  (this.lastSource = n.navigationTrigger),
								  (this.restoredId = n.restoredState ? n.restoredState.navigationId : 0))
								: n instanceof Kn
								? ((this.lastId = n.id),
								  this.scheduleScrollEvent(n, this.urlSerializer.parse(n.urlAfterRedirects).fragment))
								: n instanceof vi &&
								  0 === n.code &&
								  ((this.lastSource = void 0),
								  (this.restoredId = 0),
								  this.scheduleScrollEvent(n, this.urlSerializer.parse(n.url).fragment))
						})
					}
					consumeScrollEvents() {
						return this.transitions.events.subscribe((n) => {
							n instanceof sb &&
								(n.position
									? 'top' === this.options.scrollPositionRestoration
										? this.viewportScroller.scrollToPosition([0, 0])
										: 'enabled' === this.options.scrollPositionRestoration &&
										  this.viewportScroller.scrollToPosition(n.position)
									: n.anchor && 'enabled' === this.options.anchorScrolling
									? this.viewportScroller.scrollToAnchor(n.anchor)
									: 'disabled' !== this.options.scrollPositionRestoration &&
									  this.viewportScroller.scrollToPosition([0, 0]))
						})
					}
					scheduleScrollEvent(n, o) {
						this.zone.runOutsideAngular(() => {
							setTimeout(() => {
								this.zone.run(() => {
									this.transitions.events.next(
										new sb(
											n,
											'popstate' === this.lastSource ? this.store[this.restoredId] : null,
											o
										)
									)
								})
							}, 0)
						})
					}
					ngOnDestroy() {
						this.routerEventsSubscription?.unsubscribe(), this.scrollEventsSubscription?.unsubscribe()
					}
				}
				return (
					(e.ɵfac = function (n) {
						!(function rh() {
							throw new Error('invalid')
						})()
					}),
					(e.ɵprov = N({token: e, factory: e.ɵfac})),
					e
				)
			})()
			function fn(e, t) {
				return {ɵkind: e, ɵproviders: t}
			}
			function Lb() {
				const e = S(on)
				return (t) => {
					const n = e.get(Ho)
					if (t !== n.components[0]) return
					const o = e.get(vt),
						r = e.get(Fb)
					1 === e.get(kd) && o.initialNavigation(),
						e.get(jb, null, W.Optional)?.setUpPreloading(),
						e.get(Td, null, W.Optional)?.init(),
						o.resetRootComponentType(n.componentTypes[0]),
						r.closed || (r.next(), r.complete(), r.unsubscribe())
				}
			}
			const Fb = new T('', {factory: () => new Wt()}),
				kd = new T('', {providedIn: 'root', factory: () => 1}),
				jb = new T('')
			function hR(e) {
				return fn(0, [
					{provide: jb, useExisting: dR},
					{provide: Rb, useExisting: e},
				])
			}
			const zb = new T('ROUTER_FORROOT_GUARD'),
				_R = [
					Lu,
					{provide: gi, useClass: fd},
					vt,
					yi,
					{
						provide: Ko,
						useFactory: function Nb(e) {
							return e.routerState.root
						},
						deps: [vt],
					},
					Sd,
					[],
				]
			function vR() {
				return new Mv('Router', vt)
			}
			let Dn = (() => {
				class e {
					constructor(n) {}
					static forRoot(n, o) {
						return {
							ngModule: e,
							providers: [
								_R,
								[],
								{provide: nr, multi: !0, useValue: n},
								{provide: zb, useFactory: xR, deps: [[vt, new ss(), new as()]]},
								{provide: La, useValue: o || {}},
								o?.useHash ? {provide: Gn, useClass: OS} : {provide: Gn, useClass: Kv},
								{
									provide: Td,
									useFactory: () => {
										const e = S(qI),
											t = S(_e),
											n = S(La),
											o = S(Na),
											r = S(gi)
										return n.scrollOffset && e.setOffset(n.scrollOffset), new Ab(r, o, e, t, n)
									},
								},
								o?.preloadingStrategy ? hR(o.preloadingStrategy).ɵproviders : [],
								{provide: Mv, multi: !0, useFactory: vR},
								o?.initialNavigation ? MR(o) : [],
								o?.bindToComponentInputs ? fn(8, [gb, {provide: Ia, useExisting: gb}]).ɵproviders : [],
								[
									{provide: $b, useFactory: Lb},
									{provide: Mu, multi: !0, useExisting: $b},
								],
							],
						}
					}
					static forChild(n) {
						return {ngModule: e, providers: [{provide: nr, multi: !0, useValue: n}]}
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(R(zb, 8))
					}),
					(e.ɵmod = pe({type: e})),
					(e.ɵinj = ge({})),
					e
				)
			})()
			function xR(e) {
				return 'guarded'
			}
			function MR(e) {
				return [
					'disabled' === e.initialNavigation
						? fn(3, [
								{
									provide: hu,
									multi: !0,
									useFactory: () => {
										const t = S(vt)
										return () => {
											t.setUpLocationChangeListener()
										}
									},
								},
								{provide: kd, useValue: 2},
						  ]).ɵproviders
						: [],
					'enabledBlocking' === e.initialNavigation
						? fn(2, [
								{provide: kd, useValue: 0},
								{
									provide: hu,
									multi: !0,
									deps: [on],
									useFactory: (t) => {
										const n = t.get(wS, Promise.resolve())
										return () =>
											n.then(
												() =>
													new Promise((o) => {
														const r = t.get(vt),
															i = t.get(Fb)
														kb(r, () => {
															o(!0)
														}),
															(t.get(Na).afterPreactivation = () => (
																o(!0), i.closed ? F(void 0) : i
															)),
															r.initialNavigation()
													})
											)
									},
								},
						  ]).ɵproviders
						: [],
				]
			}
			const $b = new T(''),
				PR = []
			let OR = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [Dn.forRoot(PR), Dn]})),
						e
					)
				})(),
				DR = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['app-root']],
							decls: 1,
							vars: 0,
							template: function (n, o) {
								1 & n && _(0, 'router-outlet')
							},
							dependencies: [Jo],
							encapsulation: 2,
						})),
						e
					)
				})(),
				ER = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['app-resumes']],
							decls: 1,
							vars: 0,
							template: function (n, o) {
								1 & n && _(0, 'router-outlet')
							},
							dependencies: [Jo],
							styles: ['[_nghost-%COMP%]{--primary: #ed1c24}'],
						})),
						e
					)
				})()
			function SR(e, t) {
				if ((1 & e && _(0, 'li'), 2 & e)) {
					const n = t.index
					Un('skill01__bullet_item ', z(2).isBulletItemActive(n + 1), '')
				}
			}
			const IR = function () {
				return []
			}
			function TR(e, t) {
				if (
					(1 & e && (g(0, 'div', 1)(1, 'span', 2), h(2), f(), g(3, 'ul', 3), I(4, SR, 1, 3, 'li', 4), f()()),
					2 & e)
				) {
					const n = z()
					M(2), ie(n.skill.label), M(2), w('ngForOf', n.levels || ae(2, IR))
				}
			}
			let kR = (() => {
					class e {
						constructor() {
							this.levels = Array(10).fill(0)
						}
						isBulletItemActive(n) {
							return this.skill?.level && this.skill.level >= n ? 'active' : ''
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-skill01']],
							inputs: {skill: 'skill'},
							decls: 1,
							vars: 1,
							consts: [
								['class', 'skill01', 4, 'ngIf'],
								[1, 'skill01'],
								[1, 'skill01__label'],
								[1, 'skill01__bullet'],
								[3, 'class', 4, 'ngFor', 'ngForOf'],
							],
							template: function (n, o) {
								1 & n && I(0, TR, 5, 3, 'div', 0), 2 & n && w('ngIf', o.skill)
							},
							dependencies: [Ht, ze],
							styles: [
								'[_nghost-%COMP%]{--primary: #ed1c24}.skill01__label[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);margin-bottom:3px}.skill01__bullet[_ngcontent-%COMP%]{display:flex;align-items:initial;justify-content:initial;flex-direction:initial}.skill01__bullet_item[_ngcontent-%COMP%]{width:6px;height:6px;border-radius:50px;background-color:var(--greyd)}.skill01__bullet_item[_ngcontent-%COMP%] + .skill01__bullet_item[_ngcontent-%COMP%]{margin-left:2.5px}.skill01__bullet_item.active[_ngcontent-%COMP%]{background-color:var(--primary)}',
							],
						})),
						e
					)
				})(),
				RR = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-skill02']],
							inputs: {skill: 'skill'},
							decls: 2,
							vars: 0,
							template: function (n, o) {
								1 & n && (g(0, 'p'), h(1, 'skill02 works!'), f())
							},
						})),
						e
					)
				})(),
				AR = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-skill03']],
							inputs: {skill: 'skill'},
							decls: 2,
							vars: 0,
							template: function (n, o) {
								1 & n && (g(0, 'p'), h(1, 'skill03 works!'), f())
							},
						})),
						e
					)
				})()
			function NR(e, t) {
				1 & e && _(0, 're-skill01', 1), 2 & e && w('skill', z().skill)
			}
			function LR(e, t) {
				1 & e && _(0, 're-skill02', 1), 2 & e && w('skill', z().skill)
			}
			function FR(e, t) {
				1 & e && _(0, 're-skill03', 1), 2 & e && w('skill', z().skill)
			}
			let Vb = (() => {
				class e {
					constructor() {
						this.slug = '01'
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵcmp = D({
						type: e,
						selectors: [['re-skill']],
						inputs: {slug: 'slug', skill: 'skill'},
						decls: 3,
						vars: 3,
						consts: [
							[3, 'skill', 4, 'ngIf'],
							[3, 'skill'],
						],
						template: function (n, o) {
							1 & n &&
								(I(0, NR, 1, 1, 're-skill01', 0),
								I(1, LR, 1, 1, 're-skill02', 0),
								I(2, FR, 1, 1, 're-skill03', 0)),
								2 & n &&
									(w('ngIf', '01' === o.slug),
									M(1),
									w('ngIf', '02' === o.slug),
									M(1),
									w('ngIf', '03' === o.slug))
						},
						dependencies: [ze, kR, RR, AR],
					})),
					e
				)
			})()
			function jR(e, t) {
				1 & e && _(0, 'span'), 2 & e && Un('contact01__icon ', z(2).contact.icon, '')
			}
			function zR(e, t) {
				if ((1 & e && (g(0, 'a', 5), h(1), f()), 2 & e)) {
					const n = z(2)
					w('href', n.contact.href, kr), M(1), ie(n.contact.text)
				}
			}
			function $R(e, t) {
				if ((1 & e && (g(0, 'span', 6), h(1), f()), 2 & e)) {
					const n = z(2)
					M(1), ie(n.contact.text)
				}
			}
			function VR(e, t) {
				if (
					(1 & e &&
						(g(0, 'div', 1),
						I(1, jR, 1, 3, 'span', 2),
						I(2, zR, 2, 2, 'a', 3),
						I(3, $R, 2, 1, 'span', 4),
						f()),
					2 & e)
				) {
					const n = z()
					M(1),
						w('ngIf', n.contact.icon),
						M(1),
						w('ngIf', n.contact.text && n.contact.href),
						M(1),
						w('ngIf', n.contact.text && !n.contact.href)
				}
			}
			let BR = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-contact01']],
							inputs: {contact: 'contact'},
							decls: 1,
							vars: 1,
							consts: [
								['class', 'contact01', 4, 'ngIf'],
								[1, 'contact01'],
								[3, 'class', 4, 'ngIf'],
								['class', 'contact01__text', 'target', '_blank', 3, 'href', 4, 'ngIf'],
								['class', 'contact01__text', 4, 'ngIf'],
								['target', '_blank', 1, 'contact01__text', 3, 'href'],
								[1, 'contact01__text'],
							],
							template: function (n, o) {
								1 & n && I(0, VR, 4, 3, 'div', 0), 2 & n && w('ngIf', o.contact)
							},
							dependencies: [ze],
							styles: [
								'[_nghost-%COMP%]{--primary: #ed1c24}.contact01[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:initial;flex-direction:initial}.contact01__icon[_ngcontent-%COMP%]{width:20px;height:20px;margin-right:5px;font-size:14px;display:flex;align-items:center;justify-content:flex-start;flex-direction:initial;color:var(--primary)}.contact01__text[_ngcontent-%COMP%]{width:calc(100% - 25px);margin-top:3px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:11px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7)}@media all and (min-width: 768px){.contact01__text[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial}}',
							],
						})),
						e
					)
				})(),
				UR = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-contact02']],
							inputs: {contact: 'contact'},
							decls: 2,
							vars: 0,
							template: function (n, o) {
								1 & n && (g(0, 'p'), h(1, 'contact02 works!'), f())
							},
						})),
						e
					)
				})(),
				HR = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-contact03']],
							inputs: {contact: 'contact'},
							decls: 2,
							vars: 0,
							template: function (n, o) {
								1 & n && (g(0, 'p'), h(1, 'contact03 works!'), f())
							},
						})),
						e
					)
				})()
			function qR(e, t) {
				1 & e && _(0, 're-contact01', 1), 2 & e && w('contact', z().contact)
			}
			function GR(e, t) {
				1 & e && _(0, 're-contact02', 1), 2 & e && w('contact', z().contact)
			}
			function WR(e, t) {
				1 & e && _(0, 're-contact03', 1), 2 & e && w('contact', z().contact)
			}
			let Bb = (() => {
				class e {
					constructor() {
						this.slug = '01'
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵcmp = D({
						type: e,
						selectors: [['re-contact']],
						inputs: {slug: 'slug', contact: 'contact'},
						decls: 3,
						vars: 3,
						consts: [
							[3, 'contact', 4, 'ngIf'],
							[3, 'contact'],
						],
						template: function (n, o) {
							1 & n &&
								(I(0, qR, 1, 1, 're-contact01', 0),
								I(1, GR, 1, 1, 're-contact02', 0),
								I(2, WR, 1, 1, 're-contact03', 0)),
								2 & n &&
									(w('ngIf', '01' === o.slug),
									M(1),
									w('ngIf', '02' === o.slug),
									M(1),
									w('ngIf', '03' === o.slug))
						},
						dependencies: [ze, BR, UR, HR],
					})),
					e
				)
			})()
			function ZR(e, t) {
				if ((1 & e && (g(0, 'span', 12), h(1), f()), 2 & e)) {
					const n = z(2)
					M(1), ie(n.periodFrom)
				}
			}
			function QR(e, t) {
				if ((1 & e && (g(0, 'span', 13), h(1), f()), 2 & e)) {
					const n = z(2)
					M(1), ie(n.periodTo)
				}
			}
			function YR(e, t) {
				if ((1 & e && (g(0, 'span', 14), h(1), f()), 2 & e)) {
					const n = z(2)
					M(1), ie(n.periodIsCurrent)
				}
			}
			function KR(e, t) {
				if ((1 & e && (g(0, 'span', 15), h(1), f()), 2 & e)) {
					const n = z(2)
					M(1), ie(n.experience.description)
				}
			}
			function JR(e, t) {
				if ((1 & e && (g(0, 'li', 19), h(1), f()), 2 & e)) {
					const n = t.$implicit
					M(1), Bn(' ', n, ' ')
				}
			}
			const or = function () {
				return []
			}
			function XR(e, t) {
				if ((1 & e && (g(0, 'ul', 16)(1, 'span', 17), h(2), f(), I(3, JR, 2, 1, 'li', 18), f()), 2 & e)) {
					const n = z(2)
					M(2), ie(n.texts[n.language].listTitle.tasks), M(1), w('ngForOf', n.experience.tasks || ae(2, or))
				}
			}
			function eA(e, t) {
				if ((1 & e && (g(0, 'li', 19), h(1), f()), 2 & e)) {
					const n = t.$implicit
					M(1), Bn(' ', n, ' ')
				}
			}
			function tA(e, t) {
				if (
					(1 & e && (g(0, 'ul', 16)(1, 'span', 17), h(2, 'Soft Skills'), f(), I(3, eA, 2, 1, 'li', 18), f()),
					2 & e)
				) {
					const n = z(2)
					M(3), w('ngForOf', n.experience.softSkills || ae(1, or))
				}
			}
			function nA(e, t) {
				if ((1 & e && (g(0, 'li', 19), h(1), f()), 2 & e)) {
					const n = t.$implicit
					M(1), Bn(' ', n, ' ')
				}
			}
			function oA(e, t) {
				if (
					(1 & e && (g(0, 'ul', 16)(1, 'span', 17), h(2, 'Hard Skills'), f(), I(3, nA, 2, 1, 'li', 18), f()),
					2 & e)
				) {
					const n = z(2)
					M(3), w('ngForOf', n.experience.hardSkills || ae(1, or))
				}
			}
			function rA(e, t) {
				if (
					(1 & e &&
						(g(0, 'div', 1)(1, 'span', 2),
						h(2),
						f(),
						g(3, 'div', 3)(4, 'div', 4),
						h(5),
						f(),
						g(6, 'div', 5),
						I(7, ZR, 2, 1, 'span', 6),
						I(8, QR, 2, 1, 'span', 7),
						I(9, YR, 2, 1, 'span', 8),
						f()(),
						g(10, 'div', 9),
						I(11, KR, 2, 1, 'span', 10),
						I(12, XR, 4, 3, 'ul', 11),
						I(13, tA, 4, 2, 'ul', 11),
						I(14, oA, 4, 2, 'ul', 11),
						f()()),
					2 & e)
				) {
					const n = z()
					M(2),
						ie(n.experience.job),
						M(3),
						ie(n.experience.company),
						M(2),
						w('ngIf', n.periodFrom),
						M(1),
						w('ngIf', n.periodTo),
						M(1),
						w('ngIf', n.periodIsCurrent),
						M(2),
						w('ngIf', n.experience.description),
						M(1),
						w('ngIf', (n.experience.tasks || ae(9, or)).length),
						M(1),
						w('ngIf', (n.experience.softSkills || ae(10, or)).length),
						M(1),
						w('ngIf', (n.experience.hardSkills || ae(11, or)).length)
				}
			}
			let iA = (() => {
					class e {
						constructor() {
							;(this.language = 'pt-br'),
								(this.texts = {
									'pt-br': {listTitle: {tasks: 'Tarefas'}},
									'en-us': {listTitle: {tasks: 'Tasks'}},
								})
						}
						get periodFrom() {
							return this.experience?.period?.from ? this.experience.period.from : ''
						}
						get periodTo() {
							return this.experience?.period?.to ? this.experience.period.to : ''
						}
						get periodIsCurrent() {
							return this.experience?.period?.isCurrent && this.experience.period.isCurrent ? 'Atual' : ''
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-experience01']],
							inputs: {experience: 'experience', language: 'language', texts: 'texts'},
							decls: 1,
							vars: 1,
							consts: [
								['class', 'experience01', 4, 'ngIf'],
								[1, 'experience01'],
								[1, 'experience01__job'],
								[1, 'experience01__top'],
								[1, 'experience01__company'],
								[1, 'experience01__period'],
								['class', 'experience01__from', 4, 'ngIf'],
								['class', 'experience01__to', 4, 'ngIf'],
								['class', 'experience01__is_current', 4, 'ngIf'],
								[1, 'experience01__bottom'],
								['class', 'experience01__description', 4, 'ngIf'],
								['class', 'experience01__list', 4, 'ngIf'],
								[1, 'experience01__from'],
								[1, 'experience01__to'],
								[1, 'experience01__is_current'],
								[1, 'experience01__description'],
								[1, 'experience01__list'],
								[1, 'experience01__list_title'],
								['class', 'experience01__list_item', 4, 'ngFor', 'ngForOf'],
								[1, 'experience01__list_item'],
							],
							template: function (n, o) {
								1 & n && I(0, rA, 15, 12, 'div', 0), 2 & n && w('ngIf', o.experience)
							},
							dependencies: [Ht, ze],
							styles: [
								'.experience01__job[_ngcontent-%COMP%]{display:none;margin-bottom:15px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey7)}.experience01__top[_ngcontent-%COMP%]{margin-bottom:15px;display:flex;align-items:baseline;justify-content:space-between;flex-direction:initial}.experience01__company[_ngcontent-%COMP%]{translate:-4px 0px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey7)}.experience01__company[_ngcontent-%COMP%]:before{content:"\\e844";display:inline-flex;margin-right:0;font-family:feather!important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:var(--primary)}.experience01__period[_ngcontent-%COMP%]{display:flex;align-items:baseline;justify-content:initial;flex-direction:initial;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7)}.experience01__period[_ngcontent-%COMP%]:after{content:"\\e83a";font-family:feather!important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:13px;margin-left:5px;color:var(--primary)}.experience01__from[_ngcontent-%COMP%]{text-transform:capitalize}.experience01__from[_ngcontent-%COMP%]:after{content:"-";display:inline-flex;margin-inline:5px}.experience01__to[_ngcontent-%COMP%], .experience01__is_current[_ngcontent-%COMP%]{text-transform:capitalize}.experience01__description[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7)}.experience01__list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-15px}.experience01__list[_ngcontent-%COMP%] + .experience01__list[_ngcontent-%COMP%]{margin-top:10px}.experience01__list_title[_ngcontent-%COMP%]{margin-bottom:15px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey7);box-sizing:border-box;max-width:100%;flex-basis:100%;padding-inline:15px}.experience01__list_item[_ngcontent-%COMP%]{display:flex;align-items:baseline;justify-content:initial;flex-direction:initial;box-sizing:border-box;max-width:50%;flex-basis:50%;padding-inline:15px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);margin-bottom:5px;translate:-4px 0px}.experience01__list_item[_ngcontent-%COMP%]:before{content:"\\e844";display:inline-flex;margin-right:0;font-family:feather!important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}',
							],
						})),
						e
					)
				})(),
				sA = (() => {
					class e {
						constructor() {
							this.language = 'pt-br'
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-experience02']],
							inputs: {experience: 'experience', language: 'language'},
							decls: 2,
							vars: 0,
							template: function (n, o) {
								1 & n && (g(0, 'p'), h(1, 'experience02 works!'), f())
							},
						})),
						e
					)
				})(),
				aA = (() => {
					class e {
						constructor() {
							this.language = 'pt-br'
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-experience03']],
							inputs: {experience: 'experience', language: 'language'},
							decls: 2,
							vars: 0,
							template: function (n, o) {
								1 & n && (g(0, 'p'), h(1, 'experience03 works!'), f())
							},
						})),
						e
					)
				})()
			function cA(e, t) {
				if ((1 & e && _(0, 're-experience01', 1), 2 & e)) {
					const n = z()
					w('experience', n.experience)('language', n.language)
				}
			}
			function lA(e, t) {
				if ((1 & e && _(0, 're-experience02', 1), 2 & e)) {
					const n = z()
					w('experience', n.experience)('language', n.language)
				}
			}
			function uA(e, t) {
				if ((1 & e && _(0, 're-experience03', 1), 2 & e)) {
					const n = z()
					w('experience', n.experience)('language', n.language)
				}
			}
			let Ub = (() => {
				class e {
					constructor() {
						;(this.slug = '01'), (this.language = 'pt-br')
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵcmp = D({
						type: e,
						selectors: [['re-experience']],
						inputs: {slug: 'slug', experience: 'experience', language: 'language'},
						decls: 3,
						vars: 3,
						consts: [
							[3, 'experience', 'language', 4, 'ngIf'],
							[3, 'experience', 'language'],
						],
						template: function (n, o) {
							1 & n &&
								(I(0, cA, 1, 2, 're-experience01', 0),
								I(1, lA, 1, 2, 're-experience02', 0),
								I(2, uA, 1, 2, 're-experience03', 0)),
								2 & n &&
									(w('ngIf', '01' === o.slug),
									M(1),
									w('ngIf', '02' === o.slug),
									M(1),
									w('ngIf', '03' === o.slug))
						},
						dependencies: [ze, iA, sA, aA],
					})),
					e
				)
			})()
			function dA(e, t) {
				if ((1 & e && (g(0, 'span', 6), h(1), f()), 2 & e)) {
					const n = z(2)
					M(1), ie(n.education.period)
				}
			}
			function fA(e, t) {
				if (
					(1 & e &&
						(g(0, 'div', 1)(1, 'span', 2),
						h(2),
						f(),
						g(3, 'div', 3)(4, 'span', 4),
						h(5),
						f(),
						I(6, dA, 2, 1, 'span', 5),
						f()()),
					2 & e)
				) {
					const n = z()
					M(2), ie(n.education.university), M(3), ie(n.education.course), M(1), w('ngIf', n.education.period)
				}
			}
			let gA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-education01']],
							inputs: {education: 'education'},
							decls: 1,
							vars: 1,
							consts: [
								['class', 'education01', 4, 'ngIf'],
								[1, 'education01'],
								[1, 'education01__university'],
								[1, 'education01__top'],
								[1, 'education01__course'],
								['class', 'education01__period', 4, 'ngIf'],
								[1, 'education01__period'],
							],
							template: function (n, o) {
								1 & n && I(0, fA, 7, 3, 'div', 0), 2 & n && w('ngIf', o.education)
							},
							dependencies: [ze],
							styles: [
								'.education01__university[_ngcontent-%COMP%]{display:block;margin-bottom:5px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:400;letter-spacing:initial;line-height:initial;color:var(--grey7)}.education01__top[_ngcontent-%COMP%]{margin-bottom:15px;display:flex;align-items:baseline;justify-content:space-between;flex-direction:initial}.education01__course[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7)}.education01__course[_ngcontent-%COMP%]:before{content:"\\e844";display:inline-flex;margin-right:0;font-family:feather!important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:var(--grey7)}.education01__period[_ngcontent-%COMP%]{display:flex;align-items:baseline;justify-content:initial;flex-direction:initial;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7)}.education01__period[_ngcontent-%COMP%]:after{content:"\\e84d";font-family:feather!important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:13px;margin-left:5px;color:var(--primary)}.education01__from[_ngcontent-%COMP%]{text-transform:capitalize}.education01__from[_ngcontent-%COMP%]:after{content:"-";display:inline-flex;margin-inline:5px}.education01__to[_ngcontent-%COMP%], .education01__is_current[_ngcontent-%COMP%]{text-transform:capitalize}.education01__description[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7)}.education01__list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-15px}.education01__list[_ngcontent-%COMP%] + .education01__list[_ngcontent-%COMP%]{margin-top:10px}.education01__list_title[_ngcontent-%COMP%]{margin-bottom:15px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey7);box-sizing:border-box;max-width:100%;flex-basis:100%;padding-inline:15px}.education01__list_item[_ngcontent-%COMP%]{display:flex;align-items:baseline;justify-content:initial;flex-direction:initial;box-sizing:border-box;max-width:50%;flex-basis:50%;padding-inline:15px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);margin-bottom:5px}.education01__list_item[_ngcontent-%COMP%]:before{content:"\\e844";display:inline-flex;margin-right:0;font-family:feather!important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}',
							],
						})),
						e
					)
				})(),
				pA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-education02']],
							inputs: {education: 'education'},
							decls: 2,
							vars: 0,
							template: function (n, o) {
								1 & n && (g(0, 'p'), h(1, 'education02 works!'), f())
							},
						})),
						e
					)
				})(),
				hA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-education03']],
							inputs: {education: 'education'},
							decls: 2,
							vars: 0,
							template: function (n, o) {
								1 & n && (g(0, 'p'), h(1, 'education03 works!'), f())
							},
						})),
						e
					)
				})()
			function mA(e, t) {
				1 & e && _(0, 're-education01', 1), 2 & e && w('education', z().education)
			}
			function _A(e, t) {
				1 & e && _(0, 're-education02', 1), 2 & e && w('education', z().education)
			}
			function vA(e, t) {
				1 & e && _(0, 're-education03', 1), 2 & e && w('education', z().education)
			}
			let Hb = (() => {
				class e {
					constructor() {
						this.slug = '01'
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵcmp = D({
						type: e,
						selectors: [['re-education']],
						inputs: {slug: 'slug', education: 'education'},
						decls: 3,
						vars: 3,
						consts: [
							[3, 'education', 4, 'ngIf'],
							[3, 'education'],
						],
						template: function (n, o) {
							1 & n &&
								(I(0, mA, 1, 1, 're-education01', 0),
								I(1, _A, 1, 1, 're-education02', 0),
								I(2, vA, 1, 1, 're-education03', 0)),
								2 & n &&
									(w('ngIf', '01' === o.slug),
									M(1),
									w('ngIf', '02' === o.slug),
									M(1),
									w('ngIf', '03' === o.slug))
						},
						dependencies: [ze, gA, pA, hA],
					})),
					e
				)
			})()
			function yA(e, t) {
				if ((1 & e && _(0, 'li'), 2 & e)) {
					const n = t.index
					Un('language01__bullet_item ', z(2).isBulletItemActive(n + 1), '')
				}
			}
			const bA = function () {
				return []
			}
			function CA(e, t) {
				if (
					(1 & e && (g(0, 'div', 1)(1, 'span', 2), h(2), f(), g(3, 'ul', 3), I(4, yA, 1, 3, 'li', 4), f()()),
					2 & e)
				) {
					const n = z()
					M(2), ie(n.language.label), M(2), w('ngForOf', n.levels || ae(2, bA))
				}
			}
			let xA = (() => {
					class e {
						constructor() {
							this.levels = Array(10).fill(0)
						}
						isBulletItemActive(n) {
							return this.language?.level && this.language.level >= n ? 'active' : ''
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-language01']],
							inputs: {language: 'language'},
							decls: 1,
							vars: 1,
							consts: [
								['class', 'language01', 4, 'ngIf'],
								[1, 'language01'],
								[1, 'language01__label'],
								[1, 'language01__bullet'],
								[3, 'class', 4, 'ngFor', 'ngForOf'],
							],
							template: function (n, o) {
								1 & n && I(0, CA, 5, 3, 'div', 0), 2 & n && w('ngIf', o.language)
							},
							dependencies: [Ht, ze],
							styles: [
								'[_nghost-%COMP%]{--primary: #ed1c24}.language01__label[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);margin-bottom:3px}.language01__bullet[_ngcontent-%COMP%]{display:flex;align-items:initial;justify-content:initial;flex-direction:initial}.language01__bullet_item[_ngcontent-%COMP%]{width:6px;height:6px;border-radius:50px;background-color:var(--greyd)}.language01__bullet_item[_ngcontent-%COMP%] + .language01__bullet_item[_ngcontent-%COMP%]{margin-left:2.5px}.language01__bullet_item.active[_ngcontent-%COMP%]{background-color:var(--primary)}',
							],
						})),
						e
					)
				})(),
				MA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-language02']],
							inputs: {language: 'language'},
							decls: 2,
							vars: 0,
							template: function (n, o) {
								1 & n && (g(0, 'p'), h(1, 'language02 works!'), f())
							},
						})),
						e
					)
				})(),
				wA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['re-language03']],
							inputs: {language: 'language'},
							decls: 2,
							vars: 0,
							template: function (n, o) {
								1 & n && (g(0, 'p'), h(1, 'language03 works!'), f())
							},
						})),
						e
					)
				})()
			function PA(e, t) {
				1 & e && _(0, 're-language01', 1), 2 & e && w('language', z().language)
			}
			function OA(e, t) {
				1 & e && _(0, 're-language02', 1), 2 & e && w('language', z().language)
			}
			function DA(e, t) {
				1 & e && _(0, 're-language03', 1), 2 & e && w('language', z().language)
			}
			let qb = (() => {
				class e {
					constructor() {
						this.slug = '01'
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵcmp = D({
						type: e,
						selectors: [['re-language']],
						inputs: {slug: 'slug', language: 'language'},
						decls: 3,
						vars: 3,
						consts: [
							[3, 'language', 4, 'ngIf'],
							[3, 'language'],
						],
						template: function (n, o) {
							1 & n &&
								(I(0, PA, 1, 1, 're-language01', 0),
								I(1, OA, 1, 1, 're-language02', 0),
								I(2, DA, 1, 1, 're-language03', 0)),
								2 & n &&
									(w('ngIf', '01' === o.slug),
									M(1),
									w('ngIf', '02' === o.slug),
									M(1),
									w('ngIf', '03' === o.slug))
						},
						dependencies: [ze, xA, MA, wA],
					})),
					e
				)
			})()
			function EA(e, t) {
				if ((1 & e && (g(0, 'li', 34), _(1, 're-contact', 35), f()), 2 & e)) {
					const n = t.$implicit
					M(1), w('contact', n)
				}
			}
			function SA(e, t) {
				if ((1 & e && (g(0, 'div', 36), _(1, 're-experience', 37), f()), 2 & e)) {
					const n = t.$implicit
					M(1), w('experience', n)
				}
			}
			function IA(e, t) {
				if ((1 & e && (g(0, 'li', 38), _(1, 're-language', 39), f()), 2 & e)) {
					const n = t.$implicit
					M(1), w('language', n)
				}
			}
			function TA(e, t) {
				if ((1 & e && (g(0, 'li', 40), _(1, 're-education', 41), f()), 2 & e)) {
					const n = t.$implicit
					M(1), w('education', n)
				}
			}
			function kA(e, t) {
				if ((1 & e && (g(0, 'li', 46), _(1, 're-skill', 47), f()), 2 & e)) {
					const n = t.$implicit
					M(1), w('skill', n)
				}
			}
			const rr = function () {
				return []
			}
			function RA(e, t) {
				if (
					(1 & e &&
						(g(0, 'div', 42)(1, 'span', 43), h(2), f(), g(3, 'ul', 44), I(4, kA, 2, 1, 'li', 45), f()()),
					2 & e)
				) {
					const n = t.$implicit,
						o = z()
					M(2), ie(n), M(2), w('ngForOf', o.getSkillsByType(n) || ae(2, rr))
				}
			}
			function NA(e, t) {
				if ((1 & e && (g(0, 'li', 34), _(1, 're-contact', 35), f()), 2 & e)) {
					const n = t.$implicit
					M(1), w('contact', n)
				}
			}
			function LA(e, t) {
				if ((1 & e && (g(0, 'div', 36), _(1, 're-experience', 37), f()), 2 & e)) {
					const n = t.$implicit
					M(1), w('experience', n)
				}
			}
			function FA(e, t) {
				if ((1 & e && (g(0, 'li', 38), _(1, 're-language', 39), f()), 2 & e)) {
					const n = t.$implicit
					M(1), w('language', n)
				}
			}
			function jA(e, t) {
				if ((1 & e && (g(0, 'li', 40), _(1, 're-education', 41), f()), 2 & e)) {
					const n = t.$implicit
					M(1), w('education', n)
				}
			}
			function zA(e, t) {
				if ((1 & e && (g(0, 'li', 46), _(1, 're-skill', 47), f()), 2 & e)) {
					const n = t.$implicit
					M(1), w('skill', n)
				}
			}
			const ir = function () {
				return []
			}
			function $A(e, t) {
				if (
					(1 & e &&
						(g(0, 'div', 42)(1, 'span', 43), h(2), f(), g(3, 'ul', 44), I(4, zA, 2, 1, 'li', 45), f()()),
					2 & e)
				) {
					const n = t.$implicit,
						o = z()
					M(2), ie(n), M(2), w('ngForOf', o.getSkillsByType(n) || ae(2, ir))
				}
			}
			const VA = [
				{
					path: 'resumes',
					component: ER,
					children: [
						{
							path: 'pt',
							component: (() => {
								class e {
									constructor() {
										;(this.aboutMe = {
											text: '\n\t\t\tSou programador com foco em ser desenvolvedor Full-Stack, atuando na \xe1rea web h\xe1 sete anos.\n\t\t\tNas minhas experi\xeancias, tive o privil\xe9gio de trabalhar em empresas nas quais tive autonomia de buscar conhecimento e aplicar no dia a dia.\n\t\t\tMe esforcei para ser um profissional capaz de suprir as necessidades das empresas, nas quais aprendi com o prox\xedmo e ensinei. Meu objetivo \xe9 aperfei\xe7oar os meus conhecimentos e buscar novas aprendizagens dentro da empresas, sempre com olhar na evolu\xe7\xe3o pessoal e profissional.\n\t\t',
										}),
											(this.contacts = [
												{icon: 'ft_map_pin', text: 'Brasil - Curitiba/PR'},
												{icon: 'ft_mail', text: 'felipe.t.iwamoto@gmail.com'},
												{icon: 'ft_phone', text: '(11) 9.8455-6053'},
												{
													icon: 'ft_globe',
													text: 'felipetiwamoto.github.io/portfolio/',
													href: 'https://felipetiwamoto.github.io/portfolio/',
												},
											]),
											(this.skills = [
												{type: 'Frontend', label: 'HTML', level: 8},
												{type: 'Frontend', label: 'CSS', level: 9},
												{type: 'Frontend', label: 'JavaScript', level: 7},
												{type: 'Frontend', label: 'Jquery', level: 5},
												{type: 'Frontend', label: 'React/Redux', level: 5},
												{type: 'Frontend', label: 'Angular 2+', level: 7},
												{type: 'Frontend', label: 'UI Frameworks', level: 7},
												{type: 'Backend', label: 'PHP', level: 5},
												{type: 'Backend', label: 'Laravel', level: 5},
												{type: 'Backend', label: 'Symfony', level: 5},
												{type: 'Backend', label: 'NodeJS', level: 7},
												{type: 'Backend', label: 'SQL', level: 5},
												{type: 'Backend', label: 'SOLID', level: 6},
												{type: 'Backend', label: 'Design Pattern', level: 5},
											]),
											(this.languages = [
												{label: 'Portugu\xeas', level: 10},
												{label: 'Japon\xeas', level: 4},
												{label: 'Ingl\xeas', level: 6},
											]),
											(this.socials = [
												{slug: 'linkedin', label: 'Linkedin', href: 'www.google.com'},
												{slug: 'facebook', label: 'Facebook', href: 'www.google.com'},
												{slug: 'instagram', label: 'Instagram', href: 'www.google.com'},
												{slug: 'github', label: 'Github', href: 'www.google.com'},
											]),
											(this.experiences = [
												{
													company: 'Tagme',
													job: 'Sr. Full-Stack',
													tasks: [
														'Atua\xe7\xe3o como S\xeanior.',
														'Mentoriamento de novos colaboradores.',
														'Manuten\xe7\xe3o nos sistemas existentes.',
														'Cria\xe7\xe3o de novas funcionalidades.',
														'Cria\xe7\xe3o de projetos do zero.',
													],
													softSkills: [
														'Capacidade de persuas\xe3o;',
														'Proatividade;',
														'Capacidade de trabalhar sob press\xe3o;',
														'Senso de lideran\xe7a;',
														'Capacidade anal\xedtica.',
													],
													hardSkills: ['Cursos t\xe9cnicos;'],
													period: {from: 'JUN 2021', to: 'AGO 2022'},
												},
												{
													company: 'Tuxon',
													job: 'Sr. Full-Stack',
													tasks: [
														'Manuten\xe7\xe3o nos sistemas existentes.',
														'Cria\xe7\xe3o de novas funcionalidades.',
														'Cria\xe7\xe3o de projetos do zero.',
													],
													softSkills: [
														'Capacidade de persuas\xe3o;',
														'Proatividade;',
														'Capacidade de trabalhar sob press\xe3o;',
														'Capacidade anal\xedtica.',
													],
													hardSkills: [
														'Cursos t\xe9cnicos;',
														'habilidades ligadas \xe0 inform\xe1tica.',
													],
													period: {from: 'FEV 2020', to: 'NOV 2020'},
												},
												{
													company: '4You2 Idiomas',
													job: 'Sr. Full-Stack',
													tasks: [
														'Mentoriamento de novos colaboradores.',
														'Manuten\xe7\xe3o nos sistemas existentes.',
														'Cria\xe7\xe3o de novas funcionalidades.',
														'Cria\xe7\xe3o de projetos do zero.',
													],
													softSkills: [
														'Proatividade;',
														'Capacidade de trabalhar sob press\xe3o;',
														'Senso de lideran\xe7a;',
														'Capacidade anal\xedtica;',
													],
													hardSkills: [
														'Conhecimento em uma l\xedngua estrangeira;',
														'Cursos t\xe9cnicos;',
													],
													period: {from: 'ABR 2019', to: 'SET 2019'},
												},
												{
													company: 'SPRO IT Solutions',
													job: 'Sr. Full-Stack',
													tasks: [
														'Manuten\xe7\xe3o nos sistemas existentes.',
														'Cria\xe7\xe3o de novas funcionalidades.',
														'Cria\xe7\xe3o de projetos do zero.',
													],
													softSkills: [
														'Proatividade;',
														'Capacidade de trabalhar sob press\xe3o;',
														'Capacidade anal\xedtica;',
													],
													hardSkills: ['Cursos t\xe9cnicos;'],
													period: {from: 'SET 2018', to: 'ABR 2019'},
												},
												{
													company: 'DevMaker',
													job: 'Sr. Full-Stack',
													tasks: [
														'Manuten\xe7\xe3o nos sistemas existentes.',
														'Cria\xe7\xe3o de novas funcionalidades.',
														'Cria\xe7\xe3o de projetos do zero.',
													],
													softSkills: [
														'Proatividade;',
														'Capacidade de trabalhar sob press\xe3o;',
														'Capacidade anal\xedtica;',
													],
													hardSkills: ['Cursos t\xe9cnicos;'],
													period: {from: 'OUT 2017', to: 'SET 2018'},
												},
												{
													company: '01Tec',
													job: 'Sr. Full-Stack',
													tasks: [
														'Manuten\xe7\xe3o nos sistemas existentes.',
														'Cria\xe7\xe3o de novas funcionalidades.',
													],
													softSkills: ['Proatividade;', 'Capacidade anal\xedtica;'],
													hardSkills: ['Cursos t\xe9cnicos;'],
													period: {from: 'ABR 2015', to: 'SET 2016'},
												},
												{
													company: 'Servi\xe7os comunit\xe1rios',
													job: 'Sr. Full-Stack',
													tasks: [
														'Ensinar programa\xe7\xe3o (Projeto Lovelace)',
														'Fazer palestras.',
														'Distribuir cobertores.',
														'Distribuir alimentos.',
														'Dar aula de m\xfasica.',
														'Auxiliar na mudan\xe7a das pessoas.',
														'M\xfasica e Teatro ao ar livre.',
													],
													period: {from: 'ABR 2015', to: 'SET 2016'},
												},
											]),
											(this.educations = [
												{
													university: 'Faculdade Opet',
													course: 'Jogos Digitais (T\xe9cnico)',
													period: '1 ano',
												},
												{university: 'Udemy', course: 'Desenvolvimento Web', period: '54h'},
												{
													university: 'Udemy',
													course: 'Programa\xe7\xe3o Reactiva',
													period: '17h',
												},
												{university: 'Udemy', course: 'PHP/Laravel/Symfony', period: '115h'},
												{university: 'Udemy', course: 'Angular 2+', period: '29h'},
												{university: 'Udemy', course: 'React/Redux', period: '54h'},
												{university: 'Udemy', course: 'NodeJS', period: '15h'},
												{university: 'Udemy', course: 'Design Pattern', period: '29h'},
												{university: 'Udemy', course: 'SOLID', period: '5h'},
												{university: 'Udemy', course: 'Design de Interface', period: '77h'},
											])
									}
									get getSkillsTypes() {
										return Array.from(new Set(this.skills.map((n) => n.type)))
									}
									getSkillsByType(n) {
										return this.skills.filter((o) => o.type === n)
									}
								}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-resume01']],
										decls: 52,
										vars: 11,
										consts: [
											[1, 'resume01'],
											[1, 'resume01__main'],
											[1, 'resume01__container'],
											[1, 'resume01__top'],
											[1, 'resume01__top_left'],
											[1, 'resume01__person'],
											[1, 'resume01__person_photo'],
											[
												'src',
												'assets/images/resumes/felipe-iwamoto.jpg',
												'alt',
												'Felipe Iwamoto',
												1,
												'resume01__person_image',
											],
											[1, 'resume01__person_info'],
											[1, 'resume01__person_name'],
											[1, 'resume01__person_job'],
											[1, 'resume01__top_right'],
											[1, 'resume01__contact'],
											['class', 'resume01__contact_item', 4, 'ngFor', 'ngForOf'],
											[1, 'resume01__content'],
											[1, 'resume01__content_left'],
											[1, 'resume01__panel'],
											[1, 'resume01__panel_title'],
											[1, 'resume01__panel_icon', 'ft_briefcase'],
											[1, 'resume01__experience'],
											['class', 'resume01__experience_item', 4, 'ngFor', 'ngForOf'],
											[1, 'resume01__content_right'],
											[1, 'resume01__panel_icon', 'ft_user'],
											[1, 'resume01__text'],
											[1, 'resume01__panel_icon', 'ft_globe'],
											[1, 'resume01__language'],
											[1, 'resume01__language_list'],
											['class', 'resume01__language_item', 4, 'ngFor', 'ngForOf'],
											[1, 'resume01__panel_icon', 'ft_award'],
											[1, 'resume01__education'],
											['class', 'resume01__education_item', 4, 'ngFor', 'ngForOf'],
											[1, 'resume01__panel_icon', 'ft_flag'],
											[1, 'resume01__skill'],
											['class', 'resume01__skill_type', 4, 'ngFor', 'ngForOf'],
											[1, 'resume01__contact_item'],
											['slug', '01', 3, 'contact'],
											[1, 'resume01__experience_item'],
											['slug', '01', 3, 'experience'],
											[1, 'resume01__language_item'],
											['slug', '01', 3, 'language'],
											[1, 'resume01__education_item'],
											['slug', '01', 3, 'education'],
											[1, 'resume01__skill_type'],
											[1, 'resume01__skill_type_name'],
											[1, 'resume01__skill_list'],
											['class', 'resume01__skill_item', 4, 'ngFor', 'ngForOf'],
											[1, 'resume01__skill_item'],
											['slug', '01', 3, 'skill'],
										],
										template: function (n, o) {
											1 & n &&
												(g(0, 'div', 0)(1, 'div', 1)(2, 'div', 2)(3, 'div', 3)(4, 'div', 4)(
													5,
													'div',
													5
												)(6, 'div', 6),
												_(7, 'img', 7),
												f(),
												g(8, 'div', 8)(9, 'span', 9),
												h(10, ' FELIPE'),
												_(11, 'br'),
												h(12, ' IWAMOTO '),
												f(),
												g(13, 'span', 10),
												h(14, 'Desenvolvedor Full-Stack'),
												f()()()(),
												g(15, 'div', 11)(16, 'ul', 12),
												I(17, EA, 2, 1, 'li', 13),
												f()()(),
												g(18, 'div', 14)(19, 'div', 15)(20, 'div', 16)(21, 'span', 17),
												_(22, 'i', 18),
												h(23, 'EXPERI\xcaCIAS '),
												f(),
												g(24, 'div', 19),
												I(25, SA, 2, 1, 'div', 20),
												f()()(),
												g(26, 'div', 21)(27, 'div', 16)(28, 'span', 17),
												_(29, 'i', 22),
												h(30, 'SOBRE MIM '),
												f(),
												g(31, 'span', 23),
												h(32),
												f()(),
												g(33, 'div', 16)(34, 'span', 17),
												_(35, 'i', 24),
												h(36, 'LINGUAGENS '),
												f(),
												g(37, 'div', 25)(38, 'ul', 26),
												I(39, IA, 2, 1, 'li', 27),
												f()()(),
												g(40, 'div', 16)(41, 'span', 17),
												_(42, 'i', 28),
												h(43, 'GRADUA\xc7\xd5ES '),
												f(),
												g(44, 'ul', 29),
												I(45, TA, 2, 1, 'li', 30),
												f()(),
												g(46, 'div', 16)(47, 'span', 17),
												_(48, 'i', 31),
												h(49, 'HABILIDADES '),
												f(),
												g(50, 'div', 32),
												I(51, RA, 5, 3, 'div', 33),
												f()()()()()()()),
												2 & n &&
													(M(17),
													w('ngForOf', o.contacts || ae(6, rr)),
													M(8),
													w('ngForOf', o.experiences || ae(7, rr)),
													M(7),
													ie(o.aboutMe.text),
													M(7),
													w('ngForOf', o.languages || ae(8, rr)),
													M(6),
													w('ngForOf', o.educations || ae(9, rr)),
													M(6),
													w('ngForOf', o.getSkillsTypes || ae(10, rr)))
										},
										dependencies: [Ht, Vb, Bb, Ub, Hb, qb],
										styles: [
											'[_nghost-%COMP%]{--primary: #ed1c24}.resume01[_ngcontent-%COMP%]{--resume01ContentLeftRight: 200px;--resume01TopLeftRight: 200px;--personPhotoSize: 70px;padding:10px;display:flex;align-items:center;justify-content:center;flex-direction:initial;background-color:var(--greye)}@media all and (min-width: 768px){.resume01[_ngcontent-%COMP%]{--personPhotoSize: 150px}}@media all and (min-width: 768px){.resume01[_ngcontent-%COMP%]{padding:50px 10px}}.resume01__main[_ngcontent-%COMP%]{width:min(100%,25cm);min-height:33.7cm;background-color:var(--greyf)}.resume01__container[_ngcontent-%COMP%]{width:min(100% - 20px,768px);margin-block:30px;margin-inline:auto;position:relative}@media all and (min-width: 768px){.resume01__container[_ngcontent-%COMP%]{margin-block:90px}}.resume01__top[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-direction:column}@media all and (min-width: 768px){.resume01__top[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-direction:initial}}.resume01__top_left[_ngcontent-%COMP%]{width:100%}@media all and (min-width: 768px){.resume01__top_left[_ngcontent-%COMP%]{width:calc(100% - (var(--resume01TopLeftRight) + 15px))}}.resume01__person[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:initial;flex-direction:initial;width:max-content;margin-inline:auto}@media all and (min-width: 768px){.resume01__person[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:initial;flex-direction:initial;margin-inline:initial}}.resume01__person_photo[_ngcontent-%COMP%]{width:var(--personPhotoSize);height:var(--personPhotoSize);border-radius:50%;background-color:var(--greyd);overflow:hidden}@media all and (min-width: 576px){.resume01__person_photo[_ngcontent-%COMP%]{--personPhotoSize: 150px}}.resume01__person_image[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover}.resume01__person_info[_ngcontent-%COMP%]{margin-left:15px;width:calc(100% - (var(--personPhotoSize) + 15px))}@media all and (min-width: 576px){.resume01__person_info[_ngcontent-%COMP%]{margin-left:30px;width:calc(100% - (var(--personPhotoSize) + 30px))}}.resume01__person_name[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,5vw,48px);font-weight:700;letter-spacing:initial;line-height:initial;color:var(--primary);white-space:nowrap}@media all and (min-width: 768px){.resume01__person_name[_ngcontent-%COMP%]{white-space:normal}}.resume01__person_name[_ngcontent-%COMP%]   br[_ngcontent-%COMP%]{display:none}@media all and (min-width: 768px){.resume01__person_name[_ngcontent-%COMP%]   br[_ngcontent-%COMP%]{display:block}}.resume01__person_job[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(14px,3vw,18px);font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7)}.resume01__top_right[_ngcontent-%COMP%]{width:310px;margin-top:30px}@media all and (min-width: 768px){.resume01__top_right[_ngcontent-%COMP%]{margin-top:0;margin-left:15px;width:var(--resume01TopLeftRight)}}.resume01__contact[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-2.5px;justify-content:space-between}@media all and (min-width: 768px){.resume01__contact[_ngcontent-%COMP%]{display:initial;margin-inline:0px}}.resume01__contact_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:initial;flex-basis:initial;padding-inline:2.5px;white-space:nowrap}.resume01__contact_item[_ngcontent-%COMP%]:nth-of-type(even){text-align:right}@media all and (min-width: 768px){.resume01__contact_item[_ngcontent-%COMP%]{padding-inline:0px}.resume01__contact_item[_ngcontent-%COMP%]:nth-of-type(even){text-align:left}.resume01__contact_item[_ngcontent-%COMP%] + .resume01__contact_item[_ngcontent-%COMP%]{margin-top:10px}}.resume01__content[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;flex-direction:column}@media all and (min-width: 768px){.resume01__content[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;flex-direction:initial}}.resume01__content_left[_ngcontent-%COMP%]{width:100%}@media all and (min-width: 768px){.resume01__content_left[_ngcontent-%COMP%]{width:calc(100% - (var(--resume01ContentLeftRight) + 15px))}}.resume01__panel[_ngcontent-%COMP%]{margin-top:30px}.resume01__panel_title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:18px;font-weight:400;letter-spacing:initial;line-height:initial;margin-bottom:30px;color:var(--primary);display:inline-flex;align-items:center;justify-content:initial;flex-direction:initial}.resume01__panel_icon[_ngcontent-%COMP%]{width:25px;height:25px;display:flex;align-items:center;justify-content:flex-start;flex-direction:initial;margin-right:5px;font-size:18px;color:var(--primary)}.resume01__experience_item[_ngcontent-%COMP%] + .resume01__experience_item[_ngcontent-%COMP%]{margin-top:30px}.resume01__content_right[_ngcontent-%COMP%]{width:100%}@media all and (min-width: 768px){.resume01__content_right[_ngcontent-%COMP%]{margin-left:30px;width:var(--resume01ContentLeftRight)}}.resume01__text[_ngcontent-%COMP%]{display:block;color:var(--grey7);font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial}.resume01__skill_type[_ngcontent-%COMP%] + .resume01__skill_type[_ngcontent-%COMP%]{margin-top:30px}.resume01__skill_type_name[_ngcontent-%COMP%]{display:block;margin-bottom:15px;color:var(--grey7);font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:300;letter-spacing:initial;line-height:initial}.resume01__skill_list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-5px}.resume01__skill_item[_ngcontent-%COMP%]{margin-top:10px;box-sizing:border-box;max-width:33.33333%;flex-basis:33.33333%;padding-inline:5px}@media all and (min-width: 440px){.resume01__skill_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:25%;flex-basis:25%;padding-inline:5px}}@media all and (min-width: 768px){.resume01__skill_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:50%;flex-basis:50%;padding-inline:5px}}.resume01__language_list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-5px}.resume01__language_item[_ngcontent-%COMP%]{margin-top:10px;box-sizing:border-box;max-width:33.33333%;flex-basis:33.33333%;padding-inline:5px}@media all and (min-width: 440px){.resume01__language_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:25%;flex-basis:25%;padding-inline:5px}}@media all and (min-width: 768px){.resume01__language_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:50%;flex-basis:50%;padding-inline:5px}}.resume01__education[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-15px}.resume01__education_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:100%;flex-basis:100%;padding-inline:15px}@media all and (min-width: 440px){.resume01__education_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:50%;flex-basis:50%;padding-inline:15px}}@media all and (min-width: 576px){.resume01__education_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:33.33333333%;flex-basis:33.33333333%;padding-inline:15px}}@media all and (min-width: 768px){.resume01__education_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:100%;flex-basis:100%;padding-inline:15px}}',
										],
									})),
									e
								)
							})(),
						},
						{
							path: 'en',
							component: (() => {
								class e {
									constructor() {
										;(this.aboutMe = {
											text: "\n\t\t\tI'm a full-stack web developer with 7 years of experience.\n\t\t\tIn my experiences i had the privilege to work in companies that gaves me opportunities to study and apply my knowledge.\n\t\t\tI work really hard to become a professional which was able to match to all the company's needs.\n\t\t\tMy goal is to improve my knowledge and become a better professional.\n\t\t",
										}),
											(this.contacts = [
												{icon: 'ft_map_pin', text: 'Brazil - Curitiba/PR'},
												{icon: 'ft_mail', text: 'felipe.t.iwamoto@gmail.com'},
												{icon: 'ft_phone', text: '+55 (11) 9.8455-6053'},
												{
													icon: 'ft_globe',
													text: 'felipetiwamoto.github.io/portfolio/',
													href: 'https://felipetiwamoto.github.io/portfolio/',
												},
											]),
											(this.skills = [
												{type: 'Frontend', label: 'HTML', level: 8},
												{type: 'Frontend', label: 'CSS', level: 9},
												{type: 'Frontend', label: 'JavaScript', level: 7},
												{type: 'Frontend', label: 'Jquery', level: 5},
												{type: 'Frontend', label: 'React/Redux', level: 5},
												{type: 'Frontend', label: 'Angular 2+', level: 7},
												{type: 'Frontend', label: 'UI Frameworks', level: 7},
												{type: 'Backend', label: 'PHP', level: 5},
												{type: 'Backend', label: 'Laravel', level: 5},
												{type: 'Backend', label: 'Symfony', level: 5},
												{type: 'Backend', label: 'NodeJS', level: 7},
												{type: 'Backend', label: 'SQL', level: 5},
												{type: 'Backend', label: 'SOLID', level: 6},
												{type: 'Backend', label: 'Design Pattern', level: 5},
											]),
											(this.languages = [
												{label: 'Portuguese', level: 10},
												{label: 'Japanese', level: 4},
												{label: 'English', level: 6},
											]),
											(this.socials = [
												{slug: 'linkedin', label: 'Linkedin', href: 'www.google.com'},
												{slug: 'facebook', label: 'Facebook', href: 'www.google.com'},
												{slug: 'instagram', label: 'Instagram', href: 'www.google.com'},
												{slug: 'github', label: 'Github', href: 'www.google.com'},
											]),
											(this.experiences = [
												{
													company: 'Banco BS2',
													job: 'Sr. Full-Stack',
													tasks: [
														'Senior role',
														'Mentoring interns',
														'Maintenance current system',
														'Add new features.',
													],
													softSkills: [
														'Negotiation;',
														'Proactivity;',
														'Work under pressure;',
														'Leadership;',
														'Analytic;',
													],
													hardSkills: ['Tecnical course;'],
													period: {from: 'APR 2023', to: 'CURRENT'},
												},
												{
													company: 'Tagme',
													job: 'Sr. Full-Stack',
													tasks: [
														'Senior role',
														'Mentoring interns',
														'Maintenance current system',
														'Add new features.',
														'Create systems from scratch.',
													],
													softSkills: [
														'Negotiation;',
														'Proactivity;',
														'Work under pressure;',
														'Leadership;',
														'Analytic;',
													],
													hardSkills: ['Tecnical course;'],
													period: {from: 'JUN 2021', to: 'AUG 2022'},
												},
												{
													company: 'Tuxon',
													job: 'Sr. Full-Stack',
													tasks: [
														'Maintenance current system',
														'Add new features.',
														'Create systems from scratch.',
													],
													softSkills: [
														'Negotiation;',
														'Proactivity;',
														'Work under pressure;',
														'Analytic;',
													],
													hardSkills: ['Tecnical course;', 'IT skills.'],
													period: {from: 'FEB 2020', to: 'NOV 2020'},
												},
												{
													company: '4You2 Idiomas',
													job: 'Sr. Full-Stack',
													tasks: [
														'Mentoring interns',
														'Maintenance current system',
														'Add new features.',
														'Create systems from scratch.',
													],
													softSkills: [
														'Proactivity;',
														'Work under pressure;',
														'Leadership;',
														'Analytic;',
													],
													hardSkills: ['Use a foreign language;', 'Tecnical course;'],
													period: {from: 'APR 2019', to: 'SEP 2019'},
												},
												{
													company: 'SPRO IT Solutions',
													job: 'Sr. Full-Stack',
													tasks: [
														'Maintenance current system',
														'Add new features.',
														'Create systems from scratch.',
													],
													softSkills: ['Proactivity;', 'Work under pressure;', 'Analytic;'],
													hardSkills: ['Tecnical course;'],
													period: {from: 'SEP 2018', to: 'APR 2019'},
												},
												{
													company: 'DevMaker',
													job: 'Sr. Full-Stack',
													tasks: [
														'Maintenance current system',
														'Add new features.',
														'Create systems from scratch.',
													],
													softSkills: ['Proactivity;', 'Work under pressure;', 'Analytic;'],
													hardSkills: ['Tecnical course;'],
													period: {from: 'OCT 2017', to: 'SEP 2018'},
												},
												{
													company: '01Tec',
													job: 'Sr. Full-Stack',
													tasks: ['Maintenance current system', 'Add new features.'],
													softSkills: ['Proactivity;', 'Analytic;'],
													hardSkills: ['Tecnical course;'],
													period: {from: 'APR 2015', to: 'SEP 2016'},
												},
												{
													company: 'Community service',
													job: 'Sr. Full-Stack',
													tasks: [
														'Teaching programming (Lovelace Project)',
														'Programming speeches.',
														'Delivery blankets to the homeless.',
														'Deliver food to the homeless.',
														'Teaching music.',
														'Help people moving out.',
														'Public music and theater.',
													],
													period: {from: 'APR 2015', to: 'SEP 2016'},
												},
											]),
											(this.educations = [
												{
													university: 'Opet University',
													course: 'Digital game (Tecnical)',
													period: '1y',
												},
												{university: 'Udemy', course: 'Desenvolvimento Web', period: '54h'},
												{
													university: 'Udemy',
													course: 'Programa\xe7\xe3o Reactiva',
													period: '17h',
												},
												{university: 'Udemy', course: 'PHP/Laravel/Symfony', period: '115h'},
												{university: 'Udemy', course: 'Angular 2+', period: '29h'},
												{university: 'Udemy', course: 'React/Redux', period: '54h'},
												{university: 'Udemy', course: 'NodeJS', period: '15h'},
												{university: 'Udemy', course: 'Design Pattern', period: '29h'},
												{university: 'Udemy', course: 'SOLID', period: '5h'},
												{university: 'Udemy', course: 'Design de Interface', period: '77h'},
											])
									}
									get getSkillsTypes() {
										return Array.from(new Set(this.skills.map((n) => n.type)))
									}
									getSkillsByType(n) {
										return this.skills.filter((o) => o.type === n)
									}
								}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-resume02']],
										decls: 52,
										vars: 11,
										consts: [
											[1, 'resume02'],
											[1, 'resume02__main'],
											[1, 'resume02__container'],
											[1, 'resume02__top'],
											[1, 'resume02__top_left'],
											[1, 'resume02__person'],
											[1, 'resume02__person_photo'],
											[
												'src',
												'assets/images/resumes/felipe-iwamoto.jpg',
												'alt',
												'Felipe Iwamoto',
												1,
												'resume02__person_image',
											],
											[1, 'resume02__person_info'],
											[1, 'resume02__person_name'],
											[1, 'resume02__person_job'],
											[1, 'resume02__top_right'],
											[1, 'resume02__contact'],
											['class', 'resume02__contact_item', 4, 'ngFor', 'ngForOf'],
											[1, 'resume02__content'],
											[1, 'resume02__content_left'],
											[1, 'resume02__panel'],
											[1, 'resume02__panel_title'],
											[1, 'resume02__panel_icon', 'ft_briefcase'],
											[1, 'resume02__experience'],
											['class', 'resume02__experience_item', 4, 'ngFor', 'ngForOf'],
											[1, 'resume02__content_right'],
											[1, 'resume02__panel_icon', 'ft_user'],
											[1, 'resume02__text'],
											[1, 'resume02__panel_icon', 'ft_globe'],
											[1, 'resume02__language'],
											[1, 'resume02__language_list'],
											['class', 'resume02__language_item', 4, 'ngFor', 'ngForOf'],
											[1, 'resume02__panel_icon', 'ft_award'],
											[1, 'resume02__education'],
											['class', 'resume02__education_item', 4, 'ngFor', 'ngForOf'],
											[1, 'resume02__panel_icon', 'ft_flag'],
											[1, 'resume02__skill'],
											['class', 'resume02__skill_type', 4, 'ngFor', 'ngForOf'],
											[1, 'resume02__contact_item'],
											['slug', '01', 3, 'contact'],
											[1, 'resume02__experience_item'],
											['slug', '01', 'language', 'en-us', 3, 'experience'],
											[1, 'resume02__language_item'],
											['slug', '01', 3, 'language'],
											[1, 'resume02__education_item'],
											['slug', '01', 3, 'education'],
											[1, 'resume02__skill_type'],
											[1, 'resume02__skill_type_name'],
											[1, 'resume02__skill_list'],
											['class', 'resume02__skill_item', 4, 'ngFor', 'ngForOf'],
											[1, 'resume02__skill_item'],
											['slug', '01', 3, 'skill'],
										],
										template: function (n, o) {
											1 & n &&
												(g(0, 'div', 0)(1, 'div', 1)(2, 'div', 2)(3, 'div', 3)(4, 'div', 4)(
													5,
													'div',
													5
												)(6, 'div', 6),
												_(7, 'img', 7),
												f(),
												g(8, 'div', 8)(9, 'span', 9),
												h(10, ' FELIPE'),
												_(11, 'br'),
												h(12, ' IWAMOTO '),
												f(),
												g(13, 'span', 10),
												h(14, 'Full-Stack Developer'),
												f()()()(),
												g(15, 'div', 11)(16, 'ul', 12),
												I(17, NA, 2, 1, 'li', 13),
												f()()(),
												g(18, 'div', 14)(19, 'div', 15)(20, 'div', 16)(21, 'span', 17),
												_(22, 'i', 18),
												h(23, 'EXPERIENCES '),
												f(),
												g(24, 'div', 19),
												I(25, LA, 2, 1, 'div', 20),
												f()()(),
												g(26, 'div', 21)(27, 'div', 16)(28, 'span', 17),
												_(29, 'i', 22),
												h(30, 'ABOUT ME '),
												f(),
												g(31, 'span', 23),
												h(32),
												f()(),
												g(33, 'div', 16)(34, 'span', 17),
												_(35, 'i', 24),
												h(36, 'LANGUAGES '),
												f(),
												g(37, 'div', 25)(38, 'ul', 26),
												I(39, FA, 2, 1, 'li', 27),
												f()()(),
												g(40, 'div', 16)(41, 'span', 17),
												_(42, 'i', 28),
												h(43, 'COURSES '),
												f(),
												g(44, 'ul', 29),
												I(45, jA, 2, 1, 'li', 30),
												f()(),
												g(46, 'div', 16)(47, 'span', 17),
												_(48, 'i', 31),
												h(49, 'SKILLS '),
												f(),
												g(50, 'div', 32),
												I(51, $A, 5, 3, 'div', 33),
												f()()()()()()()),
												2 & n &&
													(M(17),
													w('ngForOf', o.contacts || ae(6, ir)),
													M(8),
													w('ngForOf', o.experiences || ae(7, ir)),
													M(7),
													ie(o.aboutMe.text),
													M(7),
													w('ngForOf', o.languages || ae(8, ir)),
													M(6),
													w('ngForOf', o.educations || ae(9, ir)),
													M(6),
													w('ngForOf', o.getSkillsTypes || ae(10, ir)))
										},
										dependencies: [Ht, Vb, Bb, Ub, Hb, qb],
										styles: [
											'[_nghost-%COMP%]{--primary: #ed1c24}.resume02[_ngcontent-%COMP%]{--resume02ContentLeftRight: 200px;--resume02TopLeftRight: 200px;--personPhotoSize: 70px;padding:10px;display:flex;align-items:center;justify-content:center;flex-direction:initial;background-color:var(--greye)}@media all and (min-width: 768px){.resume02[_ngcontent-%COMP%]{--personPhotoSize: 150px}}@media all and (min-width: 768px){.resume02[_ngcontent-%COMP%]{padding:50px 10px}}.resume02__main[_ngcontent-%COMP%]{width:min(100%,25cm);min-height:33.7cm;background-color:var(--greyf)}.resume02__container[_ngcontent-%COMP%]{width:min(100% - 20px,768px);margin-block:30px;margin-inline:auto;position:relative}@media all and (min-width: 768px){.resume02__container[_ngcontent-%COMP%]{margin-block:90px}}.resume02__top[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-direction:column}@media all and (min-width: 768px){.resume02__top[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-direction:initial}}.resume02__top_left[_ngcontent-%COMP%]{width:100%}@media all and (min-width: 768px){.resume02__top_left[_ngcontent-%COMP%]{width:calc(100% - (var(--resume02TopLeftRight) + 15px))}}.resume02__person[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:initial;flex-direction:initial;width:max-content;margin-inline:auto}@media all and (min-width: 768px){.resume02__person[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:initial;flex-direction:initial;margin-inline:initial}}.resume02__person_photo[_ngcontent-%COMP%]{width:var(--personPhotoSize);height:var(--personPhotoSize);border-radius:50%;background-color:var(--greyd);overflow:hidden}@media all and (min-width: 576px){.resume02__person_photo[_ngcontent-%COMP%]{--personPhotoSize: 150px}}.resume02__person_image[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover}.resume02__person_info[_ngcontent-%COMP%]{margin-left:15px;width:calc(100% - (var(--personPhotoSize) + 15px))}@media all and (min-width: 576px){.resume02__person_info[_ngcontent-%COMP%]{margin-left:30px;width:calc(100% - (var(--personPhotoSize) + 30px))}}.resume02__person_name[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,5vw,48px);font-weight:700;letter-spacing:initial;line-height:initial;color:var(--primary);white-space:nowrap}@media all and (min-width: 768px){.resume02__person_name[_ngcontent-%COMP%]{white-space:normal}}.resume02__person_name[_ngcontent-%COMP%]   br[_ngcontent-%COMP%]{display:none}@media all and (min-width: 768px){.resume02__person_name[_ngcontent-%COMP%]   br[_ngcontent-%COMP%]{display:block}}.resume02__person_job[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(14px,3vw,18px);font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7)}.resume02__top_right[_ngcontent-%COMP%]{width:310px;margin-top:30px}@media all and (min-width: 768px){.resume02__top_right[_ngcontent-%COMP%]{margin-top:0;margin-left:15px;width:var(--resume02TopLeftRight)}}.resume02__contact[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-2.5px;justify-content:space-between}@media all and (min-width: 768px){.resume02__contact[_ngcontent-%COMP%]{display:initial;margin-inline:0px}}.resume02__contact_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:initial;flex-basis:initial;padding-inline:2.5px;white-space:nowrap}.resume02__contact_item[_ngcontent-%COMP%]:nth-of-type(even){text-align:right}@media all and (min-width: 768px){.resume02__contact_item[_ngcontent-%COMP%]{padding-inline:0px}.resume02__contact_item[_ngcontent-%COMP%]:nth-of-type(even){text-align:left}.resume02__contact_item[_ngcontent-%COMP%] + .resume02__contact_item[_ngcontent-%COMP%]{margin-top:10px}}.resume02__content[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;flex-direction:column}@media all and (min-width: 768px){.resume02__content[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;flex-direction:initial}}.resume02__content_left[_ngcontent-%COMP%]{width:100%}@media all and (min-width: 768px){.resume02__content_left[_ngcontent-%COMP%]{width:calc(100% - (var(--resume02ContentLeftRight) + 15px))}}.resume02__panel[_ngcontent-%COMP%]{margin-top:30px}.resume02__panel_title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:18px;font-weight:400;letter-spacing:initial;line-height:initial;margin-bottom:30px;color:var(--primary);display:inline-flex;align-items:center;justify-content:initial;flex-direction:initial}.resume02__panel_icon[_ngcontent-%COMP%]{width:25px;height:25px;display:flex;align-items:center;justify-content:flex-start;flex-direction:initial;margin-right:5px;font-size:18px;color:var(--primary)}.resume02__experience_item[_ngcontent-%COMP%] + .resume02__experience_item[_ngcontent-%COMP%]{margin-top:30px}.resume02__content_right[_ngcontent-%COMP%]{width:100%}@media all and (min-width: 768px){.resume02__content_right[_ngcontent-%COMP%]{margin-left:30px;width:var(--resume02ContentLeftRight)}}.resume02__text[_ngcontent-%COMP%]{display:block;color:var(--grey7);font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial}.resume02__skill_type[_ngcontent-%COMP%] + .resume02__skill_type[_ngcontent-%COMP%]{margin-top:30px}.resume02__skill_type_name[_ngcontent-%COMP%]{display:block;margin-bottom:15px;color:var(--grey7);font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:300;letter-spacing:initial;line-height:initial}.resume02__skill_list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-5px}.resume02__skill_item[_ngcontent-%COMP%]{margin-top:10px;box-sizing:border-box;max-width:33.33333%;flex-basis:33.33333%;padding-inline:5px}@media all and (min-width: 440px){.resume02__skill_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:25%;flex-basis:25%;padding-inline:5px}}@media all and (min-width: 768px){.resume02__skill_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:50%;flex-basis:50%;padding-inline:5px}}.resume02__language_list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-5px}.resume02__language_item[_ngcontent-%COMP%]{margin-top:10px;box-sizing:border-box;max-width:33.33333%;flex-basis:33.33333%;padding-inline:5px}@media all and (min-width: 440px){.resume02__language_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:25%;flex-basis:25%;padding-inline:5px}}@media all and (min-width: 768px){.resume02__language_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:50%;flex-basis:50%;padding-inline:5px}}.resume02__education[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-15px}.resume02__education_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:100%;flex-basis:100%;padding-inline:15px}@media all and (min-width: 440px){.resume02__education_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:50%;flex-basis:50%;padding-inline:15px}}@media all and (min-width: 576px){.resume02__education_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:33.33333333%;flex-basis:33.33333333%;padding-inline:15px}}@media all and (min-width: 768px){.resume02__education_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:100%;flex-basis:100%;padding-inline:15px}}',
										],
									})),
									e
								)
							})(),
						},
					],
				},
			]
			let BA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [Dn.forChild(VA), Dn]})),
						e
					)
				})(),
				UA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [nt, BA]})),
						e
					)
				})(),
				HA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['app-landing-pages']],
							decls: 1,
							vars: 0,
							template: function (n, o) {
								1 & n && _(0, 'router-outlet')
							},
							dependencies: [Jo],
						})),
						e
					)
				})(),
				qA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp01-navbar']],
							decls: 28,
							vars: 0,
							consts: [
								[1, 'navbar'],
								[1, 'navbar__container', 'container', 'large'],
								[1, 'navbar__content'],
								[1, 'navbar__left'],
								[
									'src',
									'assets/images/landing-pages/landing-page01/landing_page01_logo.png',
									'alt',
									'#',
									1,
									'navbar__image',
								],
								[1, 'navbar__right'],
								[1, 'navbar__menu'],
								[1, 'navbar__menu_item'],
								['href', '#', 1, 'navbar__menu_link', 'active'],
								['href', '#', 1, 'navbar__menu_link'],
								['href', '#', 1, 'navbar__menu_link', 'button', 'blue'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'div', 0)(1, 'div', 1)(2, 'div', 2)(3, 'div', 3),
									_(4, 'img', 4),
									f(),
									g(5, 'div', 5)(6, 'ul', 6)(7, 'li', 7)(8, 'a', 8),
									h(9, 'About Us'),
									f()(),
									g(10, 'li', 7)(11, 'a', 9),
									h(12, 'Features'),
									f()(),
									g(13, 'li', 7)(14, 'a', 9),
									h(15, 'Teams'),
									f()(),
									g(16, 'li', 7)(17, 'a', 9),
									h(18, 'Portfolio'),
									f()(),
									g(19, 'li', 7)(20, 'a', 9),
									h(21, 'Client'),
									f()(),
									g(22, 'li', 7)(23, 'a', 9),
									h(24, 'Contact'),
									f()(),
									g(25, 'li', 7)(26, 'a', 10),
									h(27, 'Hire Us'),
									f()()()()()()())
							},
							styles: [
								'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.navbar[_ngcontent-%COMP%]{min-height:120px;display:flex;align-items:center;justify-content:center;flex-direction:initial}.navbar__content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-direction:initial}.navbar__left[_ngcontent-%COMP%]{width:135px;margin-right:15px}.navbar__right[_ngcontent-%COMP%]{width:calc(100% - 150px)}.navbar__menu[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-end;flex-direction:initial}.navbar__menu_item[_ngcontent-%COMP%] + .navbar__menu_item[_ngcontent-%COMP%]{margin-left:40px}.navbar__menu_link[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:initial;color:var(--grey3)}.navbar__menu_link.active[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--blue)}.navbar__menu_link.button[_ngcontent-%COMP%]{width:78px}',
							],
						})),
						e
					)
				})(),
				GA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp01-header']],
							decls: 28,
							vars: 0,
							consts: [
								[1, 'header'],
								[1, 'header__container', 'container', 'medium'],
								[1, 'header__content'],
								[1, 'header__left'],
								[1, 'ornament'],
								[1, 'ornament__item', 'box', 'red'],
								[1, 'ornament__item', 'dotted', 'red'],
								[1, 'header__right'],
								[1, 'ornament__item', 'box', 'green'],
								[1, 'information'],
								[1, 'information__title'],
								[1, 'information__main', 'large'],
								[1, 'information__text'],
								[1, 'header__button', 'information__button', 'button', 'blue'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'div', 0)(1, 'div', 1)(2, 'div', 2)(3, 'div', 3)(4, 'ul', 4),
									_(5, 'li', 5)(6, 'li', 5)(7, 'li', 6),
									f()(),
									g(8, 'div', 7)(9, 'ul', 4),
									_(10, 'li', 8)(11, 'li', 6),
									f(),
									g(12, 'div', 9),
									_(13, 'span', 10),
									g(14, 'span', 11),
									h(15, ' Connections with'),
									_(16, 'br'),
									h(17, ' people through'),
									_(18, 'br'),
									h(19, ' digital media '),
									f(),
									g(20, 'span', 12),
									h(21, ' Leverage agile frameworks to provide a robust synopsis for high level'),
									_(22, 'br'),
									h(23, ' overviews. Iterative approaches to corporate strategy foster'),
									_(24, 'br'),
									h(25, ' collaborative thinking to further the overall value proposition. '),
									f(),
									g(26, 'button', 13),
									h(27, 'Our Works'),
									f()()()()()())
							},
							styles: [
								'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.header[_ngcontent-%COMP%]{position:relative;margin-top:73px;min-height:687px}.header[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(1){top:-28px;left:426px;z-index:1}.header[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(2){bottom:-20px;left:-105px;z-index:1}.header[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(3){bottom:19vh;right:-76px}.header[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(4){top:0;right:-214px}.header[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(5){bottom:-58px;left:372px}.header__content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-direction:initial}.header__left[_ngcontent-%COMP%]{position:relative;height:687px}.header__left[_ngcontent-%COMP%]:before{content:"";display:block;width:608px;height:100%;position:absolute;left:-156px;top:0;background-size:cover;background-color:var(--baseRedLight);background-image:url(landing_page01_header01.8bfa597871a3d381.jpg)}.header__right[_ngcontent-%COMP%]{position:relative;margin-left:auto;width:max-content;translate:-75px -14px}.header__button[_ngcontent-%COMP%]{width:162px}',
							],
						})),
						e
					)
				})()
			function WA(e, t) {
				if ((1 & e && (g(0, 'div', 1), _(1, 'span')(2, 'span', 2)(3, 'span', 3), f()), 2 & e)) {
					const n = z()
					M(1),
						Un('service__icon ', n.service.icon, ''),
						M(1),
						w('innerHTML', n.service.title, xs),
						M(1),
						w('innerHTML', n.service.text, xs)
				}
			}
			let ZA = (() => {
				class e {}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵcmp = D({
						type: e,
						selectors: [['lp01-service']],
						inputs: {service: 'service'},
						decls: 1,
						vars: 1,
						consts: [
							['class', 'service', 4, 'ngIf'],
							[1, 'service'],
							[1, 'service__title', 3, 'innerHTML'],
							[1, 'service__text', 3, 'innerHTML'],
						],
						template: function (n, o) {
							1 & n && I(0, WA, 4, 5, 'div', 0), 2 & n && w('ngIf', o.service)
						},
						dependencies: [ze],
						styles: [
							'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.service[_ngcontent-%COMP%]{padding:40px 20px;min-height:328px;transition:1s}.service[_ngcontent-%COMP%]:hover{transition:1s;box-shadow:0 25px 55px #77777726}.service__icon[_ngcontent-%COMP%]{margin-bottom:24px;width:56px;height:56px;border-radius:50px;font-size:24px;display:flex;align-items:center;justify-content:center;flex-direction:initial;color:var(--baseRed);background-color:var(--baseRedLight)}.service__title[_ngcontent-%COMP%]{display:block;margin-bottom:16px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:24px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey3)}.service__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontText),"Open Sans",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:initial;color:var(--grey6)}',
						],
					})),
					e
				)
			})()
			function QA(e, t) {
				if ((1 & e && (g(0, 'div', 14), _(1, 'lp01-service', 15), f()), 2 & e)) {
					const n = t.$implicit
					M(1), w('service', n)
				}
			}
			const YA = function () {
				return []
			}
			let KA = (() => {
					class e {
						constructor() {
							this.services = [
								{
									icon: 'ft_help_circle',
									title: 'IT Consultancy',
									text: 'Create 2d / 3d video animation in<br /> a short period of time designed<br /> to promote a company product',
								},
								{
									icon: 'ft_edit_2',
									title: 'UI/UX Design',
									text: 'Make the appearance of a mobile<br /> application that has quality and<br /> increases user convenience',
								},
								{
									icon: 'ft_user_check',
									title: 'QA Testing',
									text: 'Change the appearance of a<br /> design into code that will be<br /> made into an amazing website',
								},
								{
									icon: 'ft_shield',
									title: 'Database Security',
									text: 'Create customizable illustrations<br /> with attractive designs that are<br /> made visually through high<br /> creativity',
								},
							]
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp01-our-services']],
							decls: 28,
							vars: 2,
							consts: [
								[1, 'our_services'],
								[1, 'our_services__container', 'container', 'small'],
								[1, 'ornament'],
								[1, 'ornament__item', 'dotted', 'red'],
								[1, 'our_services__content'],
								[1, 'our_services__left'],
								[1, 'information'],
								[1, 'information__title'],
								[1, 'information__main'],
								[1, 'information__text'],
								[1, 'our_services__button', 'information__button', 'button', 'blue'],
								[1, 'our_services__right'],
								[1, 'our_services__row'],
								['class', 'our_services__column', 4, 'ngFor', 'ngForOf'],
								[1, 'our_services__column'],
								[3, 'service'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'div', 0)(1, 'div', 1)(2, 'ul', 2),
									_(3, 'li', 3),
									f(),
									g(4, 'div', 4)(5, 'div', 5)(6, 'div', 6)(7, 'span', 7),
									h(8, 'OUR SERVICES'),
									f(),
									g(9, 'span', 8),
									h(10, ' I will show you'),
									_(11, 'br'),
									h(12, ' what our team do '),
									f(),
									g(13, 'span', 9),
									h(14, ' Lorem Ipsum is simply dummy = of the printing and'),
									_(15, 'br'),
									h(16, " typesetting industry. Lorem Ipsum has been the industry's"),
									_(17, 'br'),
									h(18, ' standard dummy text ever since the 1500s, when an'),
									_(19, 'br'),
									h(20, ' unknown printer took a galley of type and scrambled it'),
									_(21, 'br'),
									h(22, ' to make a type specimen book. '),
									f(),
									g(23, 'button', 10),
									h(24, 'Learn More'),
									f()()(),
									g(25, 'div', 11)(26, 'div', 12),
									I(27, QA, 2, 1, 'div', 13),
									f()()()()()),
									2 & n && (M(27), w('ngForOf', o.services || ae(1, YA)))
							},
							dependencies: [Ht, ZA],
							styles: [
								'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.our_services[_ngcontent-%COMP%]{--ourServiceLeftWidth: 600px;margin-top:250px;margin-bottom:150px}.our_services[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(1){right:-240px;top:34vh}.our_services__content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-direction:initial}.our_services__left[_ngcontent-%COMP%]{width:calc(100% - (var(--ourServiceLeftWidth) + 30px));margin-right:30px}.our_services__right[_ngcontent-%COMP%]{width:var(--ourServiceLeftWidth)}.our_services__row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-8px}.our_services__column[_ngcontent-%COMP%]{box-sizing:border-box;max-width:50%;flex-basis:50%;padding-inline:8px}.our_services__column[_ngcontent-%COMP%]:nth-of-type(even){margin-top:-100px}.our_services__button[_ngcontent-%COMP%]{width:168px}',
							],
						})),
						e
					)
				})(),
				JA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp01-about-us']],
							decls: 30,
							vars: 0,
							consts: [
								[1, 'about_us'],
								[1, 'about_us__container', 'container', 'medium'],
								[1, 'ornament'],
								[1, 'ornament__item', 'box', 'red'],
								[1, 'ornament__item', 'box', 'green'],
								[1, 'ornament__item', 'dotted', 'red'],
								[1, 'about_us__content'],
								[1, 'about_us__left'],
								[1, 'about_us__right'],
								[1, 'information'],
								[1, 'information__title'],
								[1, 'information__main'],
								[1, 'information__text'],
								[1, 'about_us__button', 'information__button', 'button', 'blue'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'div', 0)(1, 'div', 1)(2, 'ul', 2),
									_(3, 'li', 3)(4, 'li', 4)(5, 'li', 5),
									f(),
									g(6, 'div', 6),
									_(7, 'div', 7),
									g(8, 'div', 8)(9, 'div', 9)(10, 'span', 10),
									h(11, 'ABOUT US'),
									f(),
									g(12, 'span', 11),
									h(13, ' Perfect solution for'),
									_(14, 'br'),
									h(15, ' your Business '),
									f(),
									g(16, 'span', 12),
									h(17, ' Creating a very beautiful website design in accordance with the'),
									_(18, 'br'),
									h(19, ' fundamental user experience which is examined more deeply by the'),
									_(20, 'br'),
									h(21, ' UX Designers that we have. And make good visuals so that clients are'),
									_(22, 'br'),
									h(23, ' satisfied and easy when viewing the website. First impressions are our'),
									_(24, 'br'),
									h(25, ' tricks to attract a customer who has seen the website that we are'),
									_(26, 'br'),
									h(27, ' going to create '),
									f(),
									g(28, 'button', 13),
									h(29, 'Learn More'),
									f()()()()()())
							},
							styles: [
								'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.about_us[_ngcontent-%COMP%]{position:relative;margin-top:73px;min-height:608px}.about_us[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(1){bottom:3px;right:158px}.about_us[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(2){top:-36px;right:-94px}.about_us[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(3){bottom:-55px;left:-64px;z-index:1}.about_us__content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-direction:initial}.about_us__left[_ngcontent-%COMP%]{height:608px}.about_us__left[_ngcontent-%COMP%]:before{content:"";display:block;width:608px;height:100%;position:absolute;left:-156px;top:0;background-size:cover;background-color:var(--baseRedLight);background-image:url(landing_page01_aabout_us01.0e4f726a599a606d.jpg)}.about_us__right[_ngcontent-%COMP%]{margin-left:auto;width:max-content;translate:-75px -14px}.about_us__button[_ngcontent-%COMP%]{width:120px}',
							],
						})),
						e
					)
				})(),
				XA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp01-newsletter']],
							decls: 21,
							vars: 0,
							consts: [
								[1, 'newsletter'],
								[1, 'newsletter__container', 'container', 'small'],
								[1, 'ornament'],
								[1, 'ornament__item', 'dotted', 'red'],
								[1, 'newsletter__content'],
								[1, 'newsletter__left'],
								[1, 'information'],
								[1, 'information__main'],
								[1, 'information__text'],
								[1, 'newsletter__right'],
								[1, 'text_field01'],
								[
									'type',
									'text',
									'inputmode',
									'email',
									'id',
									'email',
									'placeholder',
									'Input your email address',
									1,
									'text_field01__input',
								],
								['for', 'email', 1, 'text_field01__label'],
								[1, 'newsletter__button', 'button', 'blue'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'div', 0)(1, 'div', 1)(2, 'ul', 2),
									_(3, 'li', 3)(4, 'li', 3),
									f(),
									g(5, 'div', 4)(6, 'div', 5)(7, 'div', 6)(8, 'span', 7),
									h(9, ' Subscribe Our'),
									_(10, 'br'),
									h(11, ' News Letter '),
									f(),
									g(12, 'span', 8),
									h(13, 'You can read our news letter and get free knowledge'),
									f()()(),
									g(14, 'div', 9)(15, 'div', 10),
									_(16, 'input', 11),
									g(17, 'label', 12),
									h(18, 'E-mail'),
									f()(),
									g(19, 'button', 13),
									h(20, 'Subscribe'),
									f()()()()())
							},
							styles: [
								'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.newsletter[_ngcontent-%COMP%]{--newsletterRightWidth: 500px;margin-block:150px;min-height:430px;background-color:var(--baseRed);display:flex;align-items:center;justify-content:initial;flex-direction:initial}.newsletter[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(1){top:40px;left:-236px}.newsletter[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(2){right:134px;bottom:-165px}.newsletter[_ngcontent-%COMP%]   .information__main[_ngcontent-%COMP%], .newsletter[_ngcontent-%COMP%]   .information__text[_ngcontent-%COMP%]{color:var(--greyf)}.newsletter[_ngcontent-%COMP%]   .text_field01[_ngcontent-%COMP%]{display:flex;align-items:initial;justify-content:initial;flex-direction:column-reverse}.newsletter[_ngcontent-%COMP%]   .text_field01__input[_ngcontent-%COMP%]{padding:5px 15px;border-color:transparent;border-radius:8px;width:100%;min-height:56px}.newsletter[_ngcontent-%COMP%]   .text_field01__input[_ngcontent-%COMP%]::placeholder{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:initial;letter-spacing:initial;line-height:initial;color:var(--grey9)}.newsletter[_ngcontent-%COMP%]   .text_field01__label[_ngcontent-%COMP%]{margin-bottom:16px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:initial;letter-spacing:initial;line-height:initial;color:var(--greyf)}.newsletter__content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-direction:initial}.newsletter__left[_ngcontent-%COMP%]{margin-left:30px;width:calc(100% - (var(--newsletterRightWidth) + 30px))}.newsletter__right[_ngcontent-%COMP%]{display:flex;align-items:initial;justify-content:initial;flex-direction:column;width:var(--newsletterRightWidth)}.newsletter__button[_ngcontent-%COMP%]{margin-top:40px;width:160px;min-height:53px}',
							],
						})),
						e
					)
				})()
			function eN(e, t) {
				if (
					(1 & e &&
						(g(0, 'div', 1)(1, 'div', 2),
						_(2, 'img', 3),
						f(),
						g(3, 'span', 4),
						h(4),
						f(),
						g(5, 'span', 5),
						h(6),
						f(),
						g(7, 'span', 6),
						h(8),
						f(),
						g(9, 'span', 7),
						h(10),
						f()()),
					2 & e)
				) {
					const n = z()
					M(2),
						w('src', n.person.image, kr)('alt', n.person.name),
						M(2),
						ie(n.person.name),
						M(2),
						ie(n.person.job),
						M(2),
						ie(n.person.text),
						M(2),
						ie(n.person.email)
				}
			}
			let tN = (() => {
				class e {}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵcmp = D({
						type: e,
						selectors: [['lp01-person']],
						inputs: {person: 'person'},
						decls: 1,
						vars: 1,
						consts: [
							['class', 'person', 4, 'ngIf'],
							[1, 'person'],
							[1, 'person__photo'],
							[1, 'person__image', 3, 'src', 'alt'],
							[1, 'person__name'],
							[1, 'person__job'],
							[1, 'person__text'],
							[1, 'person__email'],
						],
						template: function (n, o) {
							1 & n && I(0, eN, 11, 6, 'div', 0), 2 & n && w('ngIf', o.person)
						},
						dependencies: [ze],
						styles: [
							'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.person[_ngcontent-%COMP%]{padding:32px 20px;transition:1s;text-align:center}.person[_ngcontent-%COMP%]:hover{transition:1s;box-shadow:0 25px 55px #77777726}.person__photo[_ngcontent-%COMP%]{margin-bottom:24px;width:88px;height:88px;border-radius:8px;overflow:hidden;margin-inline:auto;background-color:var(--baseRedLight)}.person__image[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;border-radius:8px}.person__name[_ngcontent-%COMP%]{display:block;margin-bottom:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:24px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey3)}.person__job[_ngcontent-%COMP%]{display:block;margin-bottom:19px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:400;letter-spacing:initial;line-height:initial;color:var(--grey6)}.person__text[_ngcontent-%COMP%]{display:block;margin-bottom:40px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:400;letter-spacing:initial;line-height:initial;color:var(--grey6)}.person__email[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:400;letter-spacing:initial;line-height:initial;color:var(--grey6)}',
						],
					})),
					e
				)
			})()
			function nN(e, t) {
				if ((1 & e && (g(0, 'div', 11), _(1, 'lp01-person', 12), f()), 2 & e)) {
					const n = t.$implicit
					M(1), w('person', n)
				}
			}
			const oN = function () {
				return []
			}
			let rN = (() => {
					class e {
						constructor() {
							this.persons = [
								{
									image: 'assets/images/landing-pages/landing-page01/landing_page01_our_team01.jpg',
									name: 'Tiger Chen',
									job: 'Brand Director',
									text: 'My Responsibility is adapt and maximase your brand strategy for increasing your business.',
									email: 'tigerchen@company.com',
								},
								{
									image: 'assets/images/landing-pages/landing-page01/landing_page01_our_team02.jpg',
									name: 'Andrew Collighman',
									job: 'Brand Marketing',
									text: "I'will take care your brand to engage user and make sure your user have a suitable experience with your brand",
									email: 'andrewcoll@company.com',
								},
								{
									image: 'assets/images/landing-pages/landing-page01/landing_page01_our_team03.jpg',
									name: 'Li Noor',
									job: 'Logo Designer',
									text: 'Your Brand should be recognized easier by your customer, I\u2019ll help you to design meaningful brand.',
									email: 'linoor@company.com',
								},
								{
									image: 'assets/images/landing-pages/landing-page01/landing_page01_our_team04.jpg',
									name: 'Achmad Yusuf',
									job: 'Senior Graphic Designer',
									text: 'My Responsibility is manage my team to deliver better and meaningful artwork for you.',
									email: 'achyusuf@company.com',
								},
							]
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp01-our-team']],
							decls: 16,
							vars: 2,
							consts: [
								[1, 'our_team'],
								[1, 'our_team__container', 'container', 'large'],
								[1, 'ornament'],
								[1, 'ornament__item', 'box', 'green'],
								[1, 'our_team__content'],
								[1, 'information'],
								[1, 'information__title'],
								[1, 'information__main'],
								[1, 'information__text'],
								[1, 'our_team__row'],
								['class', 'our_team__column', 4, 'ngFor', 'ngForOf'],
								[1, 'our_team__column'],
								[3, 'person'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'div', 0)(1, 'div', 1)(2, 'ul', 2),
									_(3, 'li', 3),
									f(),
									g(4, 'div', 4)(5, 'div', 5)(6, 'span', 6),
									h(7, 'TEAMS'),
									f(),
									g(8, 'span', 7),
									h(9, 'Our Team Works'),
									f(),
									g(10, 'span', 8),
									h(
										11,
										' Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative'
									),
									_(12, 'br'),
									h(
										13,
										' approaches to corporate strategy foster collaborative thinking to further '
									),
									f()(),
									g(14, 'div', 9),
									I(15, nN, 2, 1, 'div', 10),
									f()()()()),
									2 & n && (M(15), w('ngForOf', o.persons || ae(1, oN)))
							},
							dependencies: [Ht, tN],
							styles: [
								'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.our_team[_ngcontent-%COMP%]{margin-bottom:50px}.our_team[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]{text-align:center}.our_team[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(1){top:38px;right:-114px}.our_team__row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-8px}.our_team__column[_ngcontent-%COMP%]{margin-top:50px;box-sizing:border-box;max-width:25%;flex-basis:25%;padding-inline:8px}',
							],
						})),
						e
					)
				})(),
				iN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp01-milestone']],
							decls: 41,
							vars: 0,
							consts: [
								[1, 'milestone'],
								[1, 'milestone__container', 'container', 'small'],
								[1, 'ornament'],
								[1, 'ornament__item', 'box', 'blue'],
								[1, 'ornament__item', 'dotted', 'red'],
								[1, 'milestone__content'],
								[1, 'milestone__left'],
								[1, 'information'],
								[1, 'information__title'],
								[1, 'information__main'],
								[1, 'milestone__right'],
								[1, 'chart'],
								[1, 'chart__top'],
								[1, 'chart__item', 'year'],
								[1, 'chart__number'],
								[1, 'chart__label'],
								[1, 'chart__top_item', 'work'],
								[1, 'chart__top_item', 'client'],
								[1, 'chart__bottom'],
								[1, 'chart__text'],
								[1, 'chart__button'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'div', 0)(1, 'div', 1)(2, 'ul', 2),
									_(3, 'li', 3)(4, 'li', 4),
									f(),
									g(5, 'div', 5)(6, 'div', 6)(7, 'div', 7)(8, 'span', 8),
									h(9, 'MILESTONE'),
									f(),
									g(10, 'span', 9),
									h(11, ' How about some'),
									_(12, 'br'),
									h(13, ' fact number'),
									_(14, 'br'),
									h(15, ' about us '),
									f()()(),
									g(16, 'div', 10)(17, 'div', 11)(18, 'div', 12)(19, 'div', 13)(20, 'span', 14),
									h(21, '12'),
									f(),
									g(22, 'span', 15),
									h(23, 'Years Experience'),
									f()(),
									g(24, 'div', 16)(25, 'span', 14),
									h(26, '375K'),
									f(),
									g(27, 'span', 15),
									h(28, 'Work Completed'),
									f()(),
									g(29, 'div', 17)(30, 'span', 14),
									h(31, '19K'),
									f(),
									g(32, 'span', 15),
									h(33, 'Client Satisfied'),
									f()()(),
									g(34, 'div', 18)(35, 'span', 19),
									h(
										36,
										' Leverage agile frameworks to provide a robust synopsis for high level overviews.'
									),
									_(37, 'br'),
									h(38, ' Iterative approaches to corporate strategy foster collaborative. '),
									f(),
									g(39, 'button', 20),
									h(40, 'See our works'),
									f()()()()()()())
							},
							styles: [
								'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.milestone[_ngcontent-%COMP%]{--milestoneRightWidth: 500px;margin-block:150px}.milestone[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(1){top:-89px;left:-222px}.milestone[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(2){bottom:-178px;right:-236px}.milestone__content[_ngcontent-%COMP%]{display:flex;align-items:flex-end;justify-content:space-between;flex-direction:initial}.milestone__left[_ngcontent-%COMP%]{margin-right:30px;width:calc(100% - (var(--milestoneRightWidth) + 30px))}.milestone__right[_ngcontent-%COMP%]{translate:0px 20px;width:var(--milestoneRightWidth)}.chart__top[_ngcontent-%COMP%]{display:flex;align-items:baseline;justify-content:space-between;flex-direction:initial}.chart__number[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:48px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:8px}.chart__label[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:500;letter-spacing:initial;line-height:initial;color:var(--grey6)}.chart__text[_ngcontent-%COMP%]{display:block;margin-block:24px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:400;letter-spacing:initial;line-height:initial;color:var(--grey6)}.chart__button[_ngcontent-%COMP%]{min-height:28px;width:91px;padding-block:5px;background-color:transparent;white-space:nowrap;border-color:transparent;border-bottom:4px solid var(--blue);font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--blue)}',
							],
						})),
						e
					)
				})()
			function sN(e, t) {
				if (
					(1 & e &&
						(g(0, 'div', 1)(1, 'div', 2),
						_(2, 'img', 3),
						f(),
						g(3, 'span', 4),
						h(4),
						f(),
						g(5, 'span', 5),
						h(6),
						f(),
						g(7, 'span', 6),
						h(8),
						f()()),
					2 & e)
				) {
					const n = z()
					M(2),
						w('src', n.project.image, kr)('alt', n.project.title),
						M(2),
						ie(n.project.category),
						M(2),
						ie(n.project.title),
						M(2),
						ie(n.project.text)
				}
			}
			let aN = (() => {
				class e {}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵcmp = D({
						type: e,
						selectors: [['lp01-project']],
						inputs: {project: 'project'},
						decls: 1,
						vars: 1,
						consts: [
							['class', 'project', 4, 'ngIf'],
							[1, 'project'],
							[1, 'project__photo'],
							[1, 'project__image', 3, 'src', 'alt'],
							[1, 'project__category'],
							[1, 'project__title'],
							[1, 'project__text'],
						],
						template: function (n, o) {
							1 & n && I(0, sN, 9, 5, 'div', 0), 2 & n && w('ngIf', o.project)
						},
						dependencies: [ze],
						styles: [
							'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.project__photo[_ngcontent-%COMP%]{width:100%;height:296px;margin-bottom:24px;background-color:var(--baseRedLight)}.project__category[_ngcontent-%COMP%]{display:block;margin-bottom:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:500;letter-spacing:initial;line-height:initial;color:var(--grey6)}.project__title[_ngcontent-%COMP%]{display:block;margin-bottom:16px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:24px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.project__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:initial;color:var(--grey6)}',
						],
					})),
					e
				)
			})()
			function cN(e, t) {
				if ((1 & e && (g(0, 'div', 11), _(1, 'lp01-project', 12), f()), 2 & e)) {
					const n = t.$implicit
					M(1), w('project', n)
				}
			}
			const lN = function () {
				return []
			}
			function uN(e, t) {
				if ((1 & e && (Gr(0), I(1, cN, 2, 1, 'div', 10), Wr()), 2 & e)) {
					const n = z()
					M(1), w('ngForOf', n.projects || ae(1, lN))
				}
			}
			const dN = function () {
				return [0, 0, 0, 0]
			}
			let fN = (() => {
				class e {
					constructor() {
						this.projects = [
							{
								image: 'assets/images/landing-pages/landing-page01/landing_page01_portfolio01.jpg',
								category: 'Brand Design',
								title: 'Mang Oleh - Brand Identity',
								text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in cididunt ut labore et dolore.',
							},
							{
								image: 'assets/images/landing-pages/landing-page01/landing_page01_portfolio02.jpg',
								category: 'Development',
								title: 'Taste, a Like you Become an Iron Man',
								text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in cididunt ut labore et dolore.',
							},
							{
								image: 'assets/images/landing-pages/landing-page01/landing_page01_portfolio03.jpg',
								category: 'UI/UX',
								title: 'Odading is The Best Food from Mang Oleh',
								text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in cididunt ut labore et dolore.',
							},
							{
								image: 'assets/images/landing-pages/landing-page01/landing_page01_portfolio04.jpg',
								category: 'Motion graphic',
								title: 'Where is the belt? dont Not bring it sis',
								text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in cididunt ut labore et dolore.',
							},
						]
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵcmp = D({
						type: e,
						selectors: [['lp01-portfolio']],
						decls: 15,
						vars: 3,
						consts: [
							[1, 'portfolio'],
							[1, 'portfolio__container', 'container', 'small'],
							[1, 'portfolio__content'],
							[1, 'information'],
							[1, 'information__title'],
							[1, 'information__main'],
							[1, 'information__text'],
							[1, 'portfolio__project'],
							[1, 'portfolio__project_slider'],
							[4, 'ngFor', 'ngForOf'],
							['class', 'portfolio__project_item', 4, 'ngFor', 'ngForOf'],
							[1, 'portfolio__project_item'],
							[3, 'project'],
						],
						template: function (n, o) {
							1 & n &&
								(g(0, 'div', 0)(1, 'div', 1)(2, 'div', 2)(3, 'div', 3)(4, 'span', 4),
								h(5, 'PORTFOLIO'),
								f(),
								g(6, 'span', 5),
								h(7, ' Our Best Works '),
								f(),
								g(8, 'span', 6),
								h(9, ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do'),
								_(10, 'br'),
								h(11, ' eiusmod tempor incididunt ut labore et dolore. '),
								f()(),
								g(12, 'div', 7)(13, 'div', 8),
								I(14, uN, 2, 2, 'ng-container', 9),
								f()()()()()),
								2 & n && (M(13), Bs('data-projects-length', 20), M(1), w('ngForOf', ae(2, dN)))
						},
						dependencies: [Ht, aN],
						styles: [
							'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.portfolio[_ngcontent-%COMP%]{--portfolioProjectItemWidth: 296px;--portfolioProjectItemGap: 33px}@keyframes _ngcontent-%COMP%_infiniteSlider{0%{translate:-100% 0px}to{translate:20% 0px}}.portfolio__project[_ngcontent-%COMP%]{margin-top:50px;position:relative}.portfolio__project_slider[_ngcontent-%COMP%]{width:max-content;animation:_ngcontent-%COMP%_infiniteSlider 60s alternate infinite linear;display:flex;align-items:initial;justify-content:initial;flex-direction:initial}.portfolio__project_slider[_ngcontent-%COMP%]:hover{animation-play-state:paused}.portfolio__project_item[_ngcontent-%COMP%]{width:296px}.portfolio__project_item[_ngcontent-%COMP%] + .portfolio__project_item[_ngcontent-%COMP%]{margin-left:33px}',
						],
					})),
					e
				)
			})()
			function gN(e, t) {
				if (1 & e) {
					const n = zl()
					g(0, 'div')(1, 'div', 1)(2, 'span', 2),
						h(3),
						f(),
						g(4, 'span', 3),
						Zr('click', function () {
							return pc(n), hc(z().toggler())
						}),
						f()(),
						g(5, 'div', 4),
						_(6, 'span', 5),
						f()()
				}
				if (2 & e) {
					const n = z()
					Un('question ', n.question.isOpened ? 'opened' : '', ''),
						M(3),
						ie(n.question.question),
						M(3),
						w('innerHTML', n.question.anwser, xs)
				}
			}
			let pN = (() => {
				class e {
					toggler() {
						this.question && (this.question.isOpened = !this.question?.isOpened)
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)()
					}),
					(e.ɵcmp = D({
						type: e,
						selectors: [['lp01-question']],
						inputs: {question: 'question'},
						decls: 1,
						vars: 1,
						consts: [
							[3, 'class', 4, 'ngIf'],
							[1, 'question__header'],
							[1, 'question__title'],
							[1, 'question__toggler', 'ft_plus', 3, 'click'],
							[1, 'question__content'],
							[1, 'question__text', 3, 'innerHTML'],
						],
						template: function (n, o) {
							1 & n && I(0, gN, 7, 5, 'div', 0), 2 & n && w('ngIf', o.question)
						},
						dependencies: [ze],
						styles: [
							'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.question[_ngcontent-%COMP%]{box-shadow:0 25px 55px #77777726}.question.opened[_ngcontent-%COMP%]   .question__title[_ngcontent-%COMP%]{text-shadow:0px 4px 4px rgba(0,0,0,.25)}.question.opened[_ngcontent-%COMP%]   .question__toggler[_ngcontent-%COMP%]{rotate:45deg}.question.opened[_ngcontent-%COMP%]   .question__content[_ngcontent-%COMP%]{padding:0 16px 16px;height:max-content}.question__header[_ngcontent-%COMP%]{padding:16px;position:relative;display:flex;align-items:center;justify-content:space-between;flex-direction:initial}.question__title[_ngcontent-%COMP%]{transition:1s;display:block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;width:calc(100% - 40px);font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:initial;letter-spacing:initial;line-height:initial;color:var(--grey6)}.question__toggler[_ngcontent-%COMP%]{transition:1s;display:block;width:max-content;margin-left:10px;font-size:20px;text-align:right;cursor:pointer}.question__content[_ngcontent-%COMP%]{transition:1s;overflow:hidden;height:0px;padding:0 16px}.question__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:initial;letter-spacing:initial;line-height:initial;color:var(--grey9)}',
						],
					})),
					e
				)
			})()
			function hN(e, t) {
				if (1 & e) {
					const n = zl()
					g(0, 'span', 15),
						Zr('click', function () {
							const i = pc(n).$implicit
							return hc(z().toggler(i))
						}),
						h(1),
						f()
				}
				if (2 & e) {
					const n = t.$implicit
					Un('faq__tab_header_item ', z().isSelected(n) ? 'active' : '', ''), M(1), Bn(' ', n, ' ')
				}
			}
			function mN(e, t) {
				if ((1 & e && (g(0, 'div', 17), _(1, 'lp01-question', 18), f()), 2 & e)) {
					const n = z().$implicit
					M(1), w('question', n)
				}
			}
			function _N(e, t) {
				if ((1 & e && (Gr(0), I(1, mN, 2, 1, 'div', 16), Wr()), 2 & e)) {
					const n = t.$implicit,
						o = z()
					M(1), w('ngIf', o.existsOnSelectedCategories(n))
				}
			}
			const Gb = function () {
				return []
			}
			let vN = (() => {
					class e {
						constructor() {
							;(this.selectedCategories = ['General']),
								(this.questions = [
									{
										category: ['General', 'Payments'],
										isOpened: !1,
										question: 'What services does TanahAir Offer?',
										anwser: 'TanahAir offers a service for creating a website design, illustration, icon set, website development, animation and digital marketing.',
									},
									{
										category: ['General', 'Payments'],
										isOpened: !1,
										question:
											'Why should i choose a Design studio like TanahAir over full-service agency?',
										anwser: 'Because TanahAir provides the best service to customers and provides flexibility to solve problems with our experts so that customers get satisfaction. And we provide service very quickly according to the price we offer',
									},
									{
										category: ['General', 'Services'],
										isOpened: !1,
										question:
											'How does TanahAir create website content without knowing our Business plan?',
										anwser: 'Because TanahAir provides the best service to customers and provides flexibility to solve problems with our experts so that customers get satisfaction. And we provide service very quickly according to the price we offer',
									},
									{
										category: ['General', 'Services'],
										isOpened: !1,
										question: 'What will be delivered? And When?',
										anwser: 'TanahAir offers a service for creating a website design, illustration, icon set, website development, animation and digital marketing.',
									},
									{
										category: ['General', 'Refund'],
										isOpened: !1,
										question: 'What often will results be reported?',
										anwser: 'TanahAir offers a service for creating a website design, illustration, icon set, website development, animation and digital marketing.',
									},
									{
										category: ['General', 'Contact'],
										isOpened: !1,
										question: 'How Quickly will i start seeing result after working with TanahAir?',
										anwser: 'Because TanahAir provides the best service to customers and provides flexibility to solve problems with our experts so that customers get satisfaction. And we provide service very quickly according to the price we offer',
									},
								])
						}
						get getQuestionsCategories() {
							let n = ['General']
							for (let r of this.questions || []) for (let i of r.category || []) n.push(i)
							return Array.from(new Set(n))
						}
						isSelected(n) {
							return this.selectedCategories.includes(n)
						}
						toggler(n) {
							this.selectedCategories = []
							const o = this.selectedCategories.find((r) => r === n)
							this.selectedCategories = o
								? this.selectedCategories.filter((r) => r !== n)
								: [...this.selectedCategories, n]
						}
						existsOnSelectedCategories(n) {
							for (let o of n.category || []) if (this.selectedCategories.includes(o)) return !0
							return !1
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp01-faq']],
							decls: 20,
							vars: 4,
							consts: [
								[1, 'faq'],
								[1, 'faq__container', 'container', 'small'],
								[1, 'ornament'],
								[1, 'ornament__item', 'box', 'blue'],
								[1, 'ornament__item', 'box', 'green'],
								[1, 'ornament__item', 'dotted', 'red'],
								[1, 'faq__content'],
								[1, 'information'],
								[1, 'information__title'],
								[1, 'information__main'],
								[1, 'faq__tab'],
								[1, 'faq__tab_header'],
								[3, 'class', 'click', 4, 'ngFor', 'ngForOf'],
								[1, 'faq__tab_content'],
								[4, 'ngFor', 'ngForOf'],
								[3, 'click'],
								['class', 'faq__tab_content_item', 4, 'ngIf'],
								[1, 'faq__tab_content_item'],
								[3, 'question'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'div', 0)(1, 'div', 1)(2, 'ul', 2),
									_(3, 'li', 3)(4, 'li', 4)(5, 'li', 5)(6, 'li', 5),
									f(),
									g(7, 'div', 6)(8, 'div', 7)(9, 'span', 8),
									h(10, 'FAQs'),
									f(),
									g(11, 'span', 9),
									h(12, ' Check your'),
									_(13, 'br'),
									h(14, ' general Question '),
									f()(),
									g(15, 'div', 10)(16, 'div', 11),
									I(17, hN, 2, 4, 'span', 12),
									f(),
									g(18, 'div', 13),
									I(19, _N, 2, 1, 'ng-container', 14),
									f()()()()()),
									2 & n &&
										(M(17),
										w('ngForOf', o.getQuestionsCategories || ae(2, Gb)),
										M(2),
										w('ngForOf', o.questions || ae(3, Gb)))
							},
							dependencies: [Ht, ze, pN],
							styles: [
								'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.faq[_ngcontent-%COMP%]{margin-block:150px}.faq[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(1){bottom:-132px;left:-222px}.faq[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(2){top:-24px;right:-191px}.faq[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(3){top:205px;left:-207px}.faq[_ngcontent-%COMP%]   .ornament__item[_ngcontent-%COMP%]:nth-of-type(4){bottom:-226px;right:-235px;z-index:1}.faq__tab[_ngcontent-%COMP%]{margin-top:70px}.faq__tab_header[_ngcontent-%COMP%]{translate:0px -94px;display:flex;align-items:baseline;justify-content:flex-end;flex-direction:initial}.faq__tab_header_item[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:initial;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer}.faq__tab_header_item.active[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--blue)}.faq__tab_header_item[_ngcontent-%COMP%] + .faq__tab_header_item[_ngcontent-%COMP%]{margin-left:40px}.faq__tab_content[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-8px}.faq__tab_content_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:50%;flex-basis:50%;padding-inline:8px;margin-bottom:16px}',
							],
						})),
						e
					)
				})(),
				yN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp01-footer']],
							decls: 79,
							vars: 0,
							consts: [
								[1, 'footer'],
								[1, 'footer__container', 'container', 'small'],
								[1, 'footer__content'],
								[1, 'footer__left'],
								[
									'src',
									'assets/images/landing-pages/landing-page01/landing_page01_logo_white.png',
									'alt',
									'Logo',
									1,
									'footer__image',
								],
								[1, 'footer__list'],
								[1, 'footer__list_item'],
								[1, 'footer__list_icon', 'ft_map_pin'],
								[1, 'footer__list_text'],
								[1, 'footer__list_icon', 'ft_phone'],
								[1, 'footer__list_icon', 'ft_mail'],
								[1, 'footer__center'],
								[1, 'footer__list_title'],
								[1, 'footer_list_text'],
								[1, 'footer__right'],
								[1, 'footer__social'],
								[1, 'footer__social_title'],
								[1, 'footer__social_item'],
								[1, 'footer__social_link'],
								[1, 'footer__social_icon', 'ft_facebook'],
								[1, 'footer__social_icon', 'ft_linkedin'],
								[1, 'footer__social_icon', 'ft_twitter'],
								[1, 'footer__social_icon', 'ft_instagram'],
								[1, 'footer__social_icon', 'ft_github'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'div', 0)(1, 'div', 1)(2, 'div', 2)(3, 'div', 3),
									_(4, 'img', 4),
									g(5, 'ul', 5)(6, 'li', 6),
									_(7, 'span', 7),
									g(8, 'span', 8),
									h(9, '8819 Ohio St. South Gate, CA 90280'),
									f()(),
									g(10, 'li', 6),
									_(11, 'span', 9),
									g(12, 'span', 8),
									h(13, '+1 386-688-3295'),
									f()(),
									g(14, 'li', 6),
									_(15, 'span', 10),
									g(16, 'span', 8),
									h(17, 'OurStudio@hello.com'),
									f()()()(),
									g(18, 'div', 11)(19, 'ul', 5)(20, 'span', 12),
									h(21, 'Service'),
									f(),
									g(22, 'li', 6)(23, 'span', 13),
									h(24, 'UI/UX Design'),
									f()(),
									g(25, 'li', 6)(26, 'span', 13),
									h(27, 'Web Development'),
									f()(),
									g(28, 'li', 6)(29, 'span', 13),
									h(30, 'Mobile Development'),
									f()(),
									g(31, 'li', 6)(32, 'span', 13),
									h(33, 'IT Consultancy'),
									f()(),
									g(34, 'li', 6)(35, 'span', 13),
									h(36, 'Database Security'),
									f()(),
									g(37, 'li', 6)(38, 'span', 13),
									h(39, 'QA Testing'),
									f()()(),
									g(40, 'ul', 5)(41, 'span', 12),
									h(42, 'Company'),
									f(),
									g(43, 'li', 6)(44, 'span', 13),
									h(45, 'Features'),
									f()(),
									g(46, 'li', 6)(47, 'span', 13),
									h(48, 'Our Team'),
									f()(),
									g(49, 'li', 6)(50, 'span', 13),
									h(51, 'Portfolio'),
									f()(),
									g(52, 'li', 6)(53, 'span', 13),
									h(54, 'Blog'),
									f()(),
									g(55, 'li', 6)(56, 'span', 13),
									h(57, 'Contact'),
									f()()()(),
									g(58, 'div', 14)(59, 'ul', 15)(60, 'span', 16),
									h(61, 'Our Social Media'),
									f(),
									g(62, 'li', 17)(63, 'a', 18),
									_(64, 'span', 19),
									f()(),
									g(65, 'li', 17)(66, 'a', 18),
									_(67, 'span', 20),
									f()(),
									g(68, 'li', 17)(69, 'a', 18),
									_(70, 'span', 21),
									f()(),
									g(71, 'li', 17)(72, 'a', 18),
									_(73, 'span', 22),
									f()(),
									g(74, 'li', 17)(75, 'a', 18),
									_(76, 'span', 23),
									f()()()()()(),
									g(77, 'div', 1),
									_(78, 'div', 2),
									f()())
							},
							styles: [
								'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}.footer[_ngcontent-%COMP%]{padding:80px 0 40px;color:var(--greyf);background-color:var(--baseRed)}.footer__content[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;flex-direction:initial}.footer__left[_ngcontent-%COMP%]{width:300px}.footer__image[_ngcontent-%COMP%]{margin-bottom:30px}.footer__center[_ngcontent-%COMP%]{width:270px;display:flex;align-items:flex-start;justify-content:space-between;flex-direction:initial}.footer__list[_ngcontent-%COMP%] + .footer__list[_ngcontent-%COMP%]{margin-left:15px}.footer__list_title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;margin-bottom:24px}.footer__list_icon[_ngcontent-%COMP%]{width:20px;margin-right:10px}.footer__list_item[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:initial}.footer__list_item[_ngcontent-%COMP%] + .footer__list_item[_ngcontent-%COMP%]{margin-top:16px}.footer__right[_ngcontent-%COMP%]{width:calc(100% - 650px);max-width:270px}.footer__social[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-8px}.footer__social_title[_ngcontent-%COMP%]{box-sizing:border-box;max-width:100%;flex-basis:100%;padding-inline:8px;display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;margin-bottom:24px}.footer__social_item[_ngcontent-%COMP%]{box-sizing:border-box;max-width:max-content;flex-basis:max-content;padding-inline:8px;margin-bottom:16px}.footer__social_link[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:50px;font-size:20px;background-color:var(--greyf);display:flex;align-items:center;justify-content:center;flex-direction:initial;color:var(--baseRed)}',
							],
						})),
						e
					)
				})(),
				bN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['app-landing-page01']],
							decls: 12,
							vars: 0,
							consts: [
								[1, 'landing_page01'],
								[1, 'landing_page01__main'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'div', 0)(1, 'div', 1),
									_(2, 'lp01-navbar')(3, 'lp01-header')(4, 'lp01-our-services')(5, 'lp01-about-us')(
										6,
										'lp01-newsletter'
									)(7, 'lp01-our-team')(8, 'lp01-milestone')(9, 'lp01-portfolio')(10, 'lp01-faq')(
										11,
										'lp01-footer'
									),
									f()())
							},
							dependencies: [qA, GA, KA, JA, XA, rN, iN, fN, vN, yN],
							styles: [
								'[_nghost-%COMP%]{--baseRed: #f7473e;--baseRedLight: #fed0cd;--red: #f7473e;--redLight: #f37b74;--green: #43cc74;--greenLight: #5dd789;--blue: #279ada;--blueLight: #64b4e1}.container[_ngcontent-%COMP%]{width:min(100% - 30px,1024px);margin-inline:auto;position:relative;z-index:1}.container.small[_ngcontent-%COMP%]{width:min(100% - 30px,1024px)}.container.medium[_ngcontent-%COMP%]{width:min(100% - 30px,1128px)}.container.large[_ngcontent-%COMP%]{width:min(100% - 30px,1232px)}.button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:initial;min-height:40px;padding:5px 10px;outline:none;border:1px solid transparent;border-radius:8px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:14px;font-weight:100;letter-spacing:initial;line-height:initial;color:var(--grey6);cursor:pointer;transition:.5s;translate:0px 0px}.button[_ngcontent-%COMP%]:hover{transition:.5s;translate:0px -2px}.button[disabled][_ngcontent-%COMP%]{opacity:.5;cursor:not-allowed}.button.fluid[_ngcontent-%COMP%]{width:100%}.button.small[_ngcontent-%COMP%]{min-height:25px;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:12px;font-weight:100;letter-spacing:initial;line-height:initial;padding:2px 5px}.button.baseRed[_ngcontent-%COMP%]{background-color:var(--baseRed);color:var(--greyf)}.button.baseRedLight[_ngcontent-%COMP%]{background-color:var(--baseRedLight);color:var(--greyf)}.button.red[_ngcontent-%COMP%]{background-color:var(--red);color:var(--greyf)}.button.redLight[_ngcontent-%COMP%]{background-color:var(--redLight);color:var(--greyf)}.button.green[_ngcontent-%COMP%]{background-color:var(--green);color:var(--greyf)}.button.greenLight[_ngcontent-%COMP%]{background-color:var(--greenLight);color:var(--greyf)}.button.blue[_ngcontent-%COMP%]{background-color:var(--blue);color:var(--greyf)}.button.blueLight[_ngcontent-%COMP%]{background-color:var(--blueLight);color:var(--greyf)}.button.black[_ngcontent-%COMP%]{background-color:var(--black);color:var(--greyf)}.button.grey0[_ngcontent-%COMP%]{background-color:var(--grey0);color:var(--greyf)}.button.grey1[_ngcontent-%COMP%]{background-color:var(--grey1);color:var(--greyf)}.button.grey2[_ngcontent-%COMP%]{background-color:var(--grey2);color:var(--greyf)}.button.grey3[_ngcontent-%COMP%]{background-color:var(--grey3);color:var(--greyf)}.button.grey4[_ngcontent-%COMP%]{background-color:var(--grey4);color:var(--greyf)}.button.grey5[_ngcontent-%COMP%]{background-color:var(--grey5);color:var(--greyf)}.button.grey6[_ngcontent-%COMP%]{background-color:var(--grey6);color:var(--greyf)}.button.grey7[_ngcontent-%COMP%]{background-color:var(--grey7);color:var(--greyf)}.button.grey8[_ngcontent-%COMP%]{background-color:var(--grey8);color:var(--greyf)}.button.grey9[_ngcontent-%COMP%]{background-color:var(--grey9);color:var(--greyf)}.button.greya[_ngcontent-%COMP%]{background-color:var(--greya);color:var(--grey0)}.button.greyb[_ngcontent-%COMP%]{background-color:var(--greyb);color:var(--grey0)}.button.greyc[_ngcontent-%COMP%]{background-color:var(--greyc);color:var(--grey0)}.button.greyd[_ngcontent-%COMP%]{background-color:var(--greyd);color:var(--grey0)}.button.greye[_ngcontent-%COMP%]{background-color:var(--greye);color:var(--grey0)}.button.greyf[_ngcontent-%COMP%]{background-color:var(--greyf);color:var(--grey0)}.button.white[_ngcontent-%COMP%]{background-color:var(--white);color:var(--grey0)}.information__title[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey6);margin-bottom:0}.information__title[_ngcontent-%COMP%]:has( ~ .information__main)[_ngcontent-%COMP%]{margin-bottom:24px}.information__main[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(20px,3vw,48px);font-weight:700;letter-spacing:initial;line-height:1.3;color:var(--grey3);margin-bottom:0}.information__main.large[_ngcontent-%COMP%]{font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:clamp(34px,3vw,64px);font-weight:700;letter-spacing:initial;line-height:1.5}.information__main[_ngcontent-%COMP%]:has( ~ .information__text)[_ngcontent-%COMP%]{margin-bottom:24px}.information__text[_ngcontent-%COMP%]{display:block;font-family:var(--fontTitle),"Roboto",system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:initial;line-height:1.5;color:var(--grey6);margin-bottom:0}.information__text[_ngcontent-%COMP%]:has( ~ .information__button)[_ngcontent-%COMP%]{margin-bottom:56px}.information__button[_ngcontent-%COMP%]{min-height:53px}.landing_page01__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}.ornament[_ngcontent-%COMP%]{--boxColor: var(--redLight);position:absolute;inset:0;pointer-events:none}.ornament__item[_ngcontent-%COMP%]{position:absolute}.ornament__item.box[_ngcontent-%COMP%]{width:62px;height:62px}.ornament__item.box.red[_ngcontent-%COMP%]{--boxColor: var(--redLight);background-color:var(--baseRed)}.ornament__item.box.green[_ngcontent-%COMP%]{--boxColor: var(--greenLight);background-color:var(--green)}.ornament__item.box.blue[_ngcontent-%COMP%]{--boxColor: var(--blueLight);background-color:var(--blue)}.ornament__item.box[_ngcontent-%COMP%]:before{--boxTriangleSize: 16px;content:"";position:absolute;bottom:0;right:0;border-right:var(--boxTriangleSize) solid transparent;border-bottom:var(--boxTriangleSize) solid transparent;border-left:var(--boxTriangleSize) solid var(--boxColor);border-top:var(--boxTriangleSize) solid var(--boxColor)}.ornament__item.dotted[_ngcontent-%COMP%]{width:116px;height:116px}.ornament__item.dotted.red[_ngcontent-%COMP%]{background-image:url(landing_page01_dotted_red.c4cc2b9277003439.png);object-fit:contain}',
							],
						})),
						e
					)
				})(),
				CN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp02-about-us']],
							decls: 41,
							vars: 0,
							consts: [
								[1, 'about_us'],
								[1, 'about_us__container', 'container'],
								[1, 'about_us__header'],
								[1, 'about_us__name'],
								[1, 'about_us__title'],
								[1, 'about_us__description'],
								[1, 'about_us__content'],
								[1, 'about_us__row'],
								[1, 'about_us__column'],
								[1, 'about_us__image'],
								[1, 'about_us__list'],
								[1, 'about_us__list__item'],
								[1, 'about_us__list__icon'],
								[
									'src',
									'assets/images/landing-pages/landing-page02/dotted-icon-black.svg',
									'alt',
									'Dotted icon',
								],
								[1, 'about_us__list__info'],
								[1, 'about_us__list__title'],
								[1, 'about_us__list__description'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'section', 0)(1, 'div', 1)(2, 'div', 2)(3, 'span', 3),
									h(4, 'About Us'),
									f(),
									g(5, 'h2', 4),
									h(6, 'Laborum magna nulla duis'),
									f(),
									g(7, 'p', 5),
									h(
										8,
										' Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. '
									),
									_(9, 'br'),
									h(10, ' Voluptate exercitation incididunt aliquip deserunt. '),
									f()(),
									g(11, 'div', 6)(12, 'div', 7)(13, 'div', 8),
									_(14, 'div', 9),
									f(),
									g(15, 'div', 8)(16, 'div', 10)(17, 'div', 11)(18, 'div', 12),
									_(19, 'img', 13),
									f(),
									g(20, 'div', 14)(21, 'h3', 15),
									h(22, 'Profesional'),
									f(),
									g(23, 'p', 16),
									h(24, ' Amet minim mollit non deserunt ullamco est sit aliqua minim mollit non. '),
									f()()(),
									g(25, 'div', 11)(26, 'div', 12),
									_(27, 'img', 13),
									f(),
									g(28, 'div', 14)(29, 'h3', 15),
									h(30, 'Fast Respond'),
									f(),
									g(31, 'p', 16),
									h(32, ' Amet minim mollit non deserunt ullamco est sit aliqua minim mollit non. '),
									f()()(),
									g(33, 'div', 11)(34, 'div', 12),
									_(35, 'img', 13),
									f(),
									g(36, 'div', 14)(37, 'h3', 15),
									h(38, 'Creative Solution'),
									f(),
									g(39, 'p', 16),
									h(40, ' Amet minim mollit non deserunt ullamco est sit aliqua minim mollit non. '),
									f()()()()()()()()())
							},
							styles: [
								'@import"https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap";*[_ngcontent-%COMP%]{margin:0;padding:0;text-decoration:none;list-style:none;box-sizing:border-box;font-family:Lato,sans-serif;color:#111}.fa[_ngcontent-%COMP%], .fas[_ngcontent-%COMP%], .fa-classic[_ngcontent-%COMP%], .fa-solid[_ngcontent-%COMP%], .far[_ngcontent-%COMP%], .fa-regular[_ngcontent-%COMP%], .fab[_ngcontent-%COMP%], .fa-brands[_ngcontent-%COMP%]{font-family:var(--fa-style-family, "Font Awesome 6 Free")!important;font-weight:var(--fa-style, 900)}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{font-family:Lato,sans-serif;color:#111}body[_ngcontent-%COMP%]{max-width:100vw;min-height:100vh;overflow-x:hidden;overflow-y:auto}section[_ngcontent-%COMP%]{width:100%;padding:72px 0;overflow-x:hidden}@media all and (max-width: 768px){section[_ngcontent-%COMP%]{padding:30px 0}}.container[_ngcontent-%COMP%]{max-width:830px;flex-basis:830px;padding:0 10px;margin:0 auto;box-sizing:content-box}.button[_ngcontent-%COMP%]{font-size:1rem;min-height:40px;padding:5px 15px;border-radius:10px;transition:.5s;border:1px solid transparent;display:inline-flex;justify-content:center;align-items:center;cursor:pointer;background-color:#ddd;color:#777}.button[_ngcontent-%COMP%]:hover{transition:.5s}.button.primary[_ngcontent-%COMP%]{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.primary[_ngcontent-%COMP%]:hover, .button.primary.outline[_ngcontent-%COMP%]{border:2px solid #ff7eb3;background-image:none;background-color:transparent;color:#ff7eb3}.button.primary.outline[_ngcontent-%COMP%]:hover{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.greyd.outline[_ngcontent-%COMP%]{background-color:transparent;color:#ddd}.about_us[_ngcontent-%COMP%]{padding-bottom:148px;text-align:center;margin-top:-1px}.about_us__name[_ngcontent-%COMP%]{font-size:1.3rem;margin-bottom:19px;font-weight:700;display:block;color:#ff7eb3}.about_us__title[_ngcontent-%COMP%]{font-size:1.8rem;font-weight:900;letter-spacing:.3px}.about_us__description[_ngcontent-%COMP%]{margin-top:26px;font-size:.98rem;line-height:26px;color:#666}.about_us__content[_ngcontent-%COMP%]{margin-top:75px}.about_us__row[_ngcontent-%COMP%]{margin-left:-32px;margin-right:-32px;display:flex;flex-wrap:wrap}.about_us__column[_ngcontent-%COMP%]{width:50%;padding-left:32px;padding-right:32px}.about_us__image[_ngcontent-%COMP%]{width:375px;height:350px;border-radius:15px;background-color:#ddd}.about_us__list__item[_ngcontent-%COMP%]{margin-bottom:44px;display:flex;align-items:center;flex-wrap:wrap}.about_us__list__icon[_ngcontent-%COMP%]{width:35px;height:35px;margin-right:47px}.about_us__list__icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain}.about_us__list__info[_ngcontent-%COMP%]{width:calc(100% - 82px);text-align:left}.about_us__list__title[_ngcontent-%COMP%]{font-size:1.3rem;margin-top:-2px;margin-bottom:9px;letter-spacing:-.7px;font-weight:700}.about_us__list__description[_ngcontent-%COMP%]{font-size:1rem;line-height:25px}@media all and (max-width: 992px){.about_us__image[_ngcontent-%COMP%]{width:100%}}@media all and (max-width: 768px){.about_us[_ngcontent-%COMP%]{padding-bottom:30px}.about_us__title[_ngcontent-%COMP%]{font-size:1.5rem;line-height:30px}.about_us__content[_ngcontent-%COMP%]{margin-top:30px}.about_us__column[_ngcontent-%COMP%]{max-width:100%;flex-basis:100%}.about_us__image[_ngcontent-%COMP%]{max-width:350px;margin:0 auto 50px}}',
							],
						})),
						e
					)
				})(),
				xN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp02-blog']],
							decls: 61,
							vars: 0,
							consts: [
								[1, 'blog'],
								[1, 'blog__container', 'container'],
								[1, 'blog__header'],
								[1, 'blog__name'],
								[1, 'blog__title'],
								[1, 'blog__description'],
								[1, 'blog__content'],
								[1, 'blog__slide'],
								[1, 'blog__slide__item'],
								[1, 'blog__slide__content'],
								[1, 'blog__slide__top'],
								[1, 'blog__slide__image'],
								[1, 'blog__slide__bottom'],
								[1, 'blog__slide__category'],
								[1, 'blog__slide__title'],
								[1, 'blog__slide__action'],
								[1, 'blog__slide__action__item'],
								[1, 'fas', 'fa-comment-dots'],
								[1, 'fas', 'fa-eye'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'section', 0)(1, 'div', 1)(2, 'div', 2)(3, 'span', 3),
									h(4, 'Blog'),
									f(),
									g(5, 'h2', 4),
									h(6, 'Laborum magna nulla duis'),
									f(),
									g(7, 'p', 5),
									h(
										8,
										' Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.'
									),
									_(9, 'br'),
									h(10, ' Voluptate exercitation incididunt aliquip deserunt. '),
									f()(),
									g(11, 'div', 6)(12, 'div', 7)(13, 'div', 8)(14, 'div', 9)(15, 'div', 10),
									_(16, 'div', 11),
									f(),
									g(17, 'div', 12)(18, 'span', 13),
									h(19, 'Finance Manager'),
									f(),
									g(20, 'h3', 14),
									h(21, 'Lorem ipsum dolor sit amet, consectetur adipiscing'),
									f(),
									g(22, 'div', 15)(23, 'div', 16),
									_(24, 'i', 17),
									h(25, ' 25 '),
									f(),
									g(26, 'div', 16),
									_(27, 'i', 18),
									h(28, ' 125k '),
									f()()()()(),
									g(29, 'div', 8)(30, 'div', 9)(31, 'div', 10),
									_(32, 'div', 11),
									f(),
									g(33, 'div', 12)(34, 'span', 13),
									h(35, 'Finance Manager'),
									f(),
									g(36, 'h3', 14),
									h(37, 'Lorem ipsum dolor sit amet, consectetur adipiscing'),
									f(),
									g(38, 'div', 15)(39, 'div', 16),
									_(40, 'i', 17),
									h(41, ' 25 '),
									f(),
									g(42, 'div', 16),
									_(43, 'i', 18),
									h(44, ' 125k '),
									f()()()()(),
									g(45, 'div', 8)(46, 'div', 9)(47, 'div', 10),
									_(48, 'div', 11),
									f(),
									g(49, 'div', 12)(50, 'span', 13),
									h(51, 'Finance Manager'),
									f(),
									g(52, 'h3', 14),
									h(53, 'Lorem ipsum dolor sit amet, consectetur adipiscing'),
									f(),
									g(54, 'div', 15)(55, 'div', 16),
									_(56, 'i', 17),
									h(57, ' 25 '),
									f(),
									g(58, 'div', 16),
									_(59, 'i', 18),
									h(60, ' 125k '),
									f()()()()()()()()())
							},
							styles: [
								'@import"https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap";*[_ngcontent-%COMP%]{margin:0;padding:0;text-decoration:none;list-style:none;box-sizing:border-box;font-family:Lato,sans-serif;color:#111}.fa[_ngcontent-%COMP%], .fas[_ngcontent-%COMP%], .fa-classic[_ngcontent-%COMP%], .fa-solid[_ngcontent-%COMP%], .far[_ngcontent-%COMP%], .fa-regular[_ngcontent-%COMP%], .fab[_ngcontent-%COMP%], .fa-brands[_ngcontent-%COMP%]{font-family:var(--fa-style-family, "Font Awesome 6 Free")!important;font-weight:var(--fa-style, 900)}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{font-family:Lato,sans-serif;color:#111}body[_ngcontent-%COMP%]{max-width:100vw;min-height:100vh;overflow-x:hidden;overflow-y:auto}section[_ngcontent-%COMP%]{width:100%;padding:72px 0;overflow-x:hidden}@media all and (max-width: 768px){section[_ngcontent-%COMP%]{padding:30px 0}}.container[_ngcontent-%COMP%]{max-width:830px;flex-basis:830px;padding:0 10px;margin:0 auto;box-sizing:content-box}.button[_ngcontent-%COMP%]{font-size:1rem;min-height:40px;padding:5px 15px;border-radius:10px;transition:.5s;border:1px solid transparent;display:inline-flex;justify-content:center;align-items:center;cursor:pointer;background-color:#ddd;color:#777}.button[_ngcontent-%COMP%]:hover{transition:.5s}.button.primary[_ngcontent-%COMP%]{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.primary[_ngcontent-%COMP%]:hover, .button.primary.outline[_ngcontent-%COMP%]{border:2px solid #ff7eb3;background-image:none;background-color:transparent;color:#ff7eb3}.button.primary.outline[_ngcontent-%COMP%]:hover{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.greyd.outline[_ngcontent-%COMP%]{background-color:transparent;color:#ddd}.blog[_ngcontent-%COMP%]{padding-top:68px;padding-bottom:219px;text-align:center}.blog__name[_ngcontent-%COMP%]{font-size:1.3rem;margin-bottom:19px;font-weight:700;display:block;color:#ff7eb3}.blog__title[_ngcontent-%COMP%]{font-size:1.8rem;font-weight:900;letter-spacing:.3px}.blog__description[_ngcontent-%COMP%]{margin-top:26px;font-size:.98rem;line-height:26px;color:#666}.blog__content[_ngcontent-%COMP%]{margin-top:72px}.blog__slide[_ngcontent-%COMP%]{margin-left:-35px;margin-right:-35px;text-align:left;display:inline-flex;animation:_ngcontent-%COMP%_infinityBlogSlide 10s infinite alternate linear}.blog__slide[_ngcontent-%COMP%]:hover{animation-play-state:paused}.blog__slide__item[_ngcontent-%COMP%]{padding-left:35px;padding-right:35px}.blog__slide__content[_ngcontent-%COMP%]{width:478px}.blog__slide__top[_ngcontent-%COMP%]{margin-bottom:29px}.blog__slide__image[_ngcontent-%COMP%]{width:100%;height:264px;border-radius:15px;background-color:#ddd}.blog__slide__category[_ngcontent-%COMP%]{font-size:1.2rem;letter-spacing:.5px;margin-bottom:8px;font-weight:700;display:block;color:#666}.blog__slide__title[_ngcontent-%COMP%]{font-size:1.87rem;line-height:41px}.blog__slide__action[_ngcontent-%COMP%]{margin-top:12px;display:inline-flex;color:#666}.blog__slide__action__item[_ngcontent-%COMP%]{margin-right:40px;display:inline-flex;align-items:center}.blog__slide__action__item[_ngcontent-%COMP%]:last-child{margin-right:0}.blog__slide__action__item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.5rem;margin-right:14px}@keyframes _ngcontent-%COMP%_infinityBlogSlide{0%{transform:translate(-1420px)}to{transform:translate(568px)}}@media all and (max-width: 1200px){@keyframes infinityBlogSlide{0%{transform:translate(-1136px)}to{transform:translate(852px)}}}@media all and (max-width: 992px){@keyframes infinityBlogSlide{0%{transform:translate(-1136px)}to{transform:translate(852px)}}}@media all and (max-width: 768px){.blog[_ngcontent-%COMP%]{padding-top:30px;padding-bottom:30px}.blog__title[_ngcontent-%COMP%]{font-size:1.5rem;line-height:30px}.blog__description[_ngcontent-%COMP%]{font-size:.8rem;line-height:20px}.blog__content[_ngcontent-%COMP%]{margin-top:30px}.blog__slide[_ngcontent-%COMP%]{margin-left:-10px;margin-right:-10px}.blog__slide__item[_ngcontent-%COMP%]{width:calc(50vw - 40px);padding-left:10px;padding-right:10px}.blog__slide__content[_ngcontent-%COMP%]{width:100%}.blog__slide__image[_ngcontent-%COMP%]{height:150px}.blog__slide__category[_ngcontent-%COMP%]{font-size:1rem}.blog__slide__title[_ngcontent-%COMP%]{font-size:1.2rem;line-height:24px}@keyframes infinityBlogSlide{0%{transform:translate(-85vw)}to{transform:translate(75vw)}}}@media all and (max-width: 576px){.blog__slide__item[_ngcontent-%COMP%]{width:calc(100vw - 40px)}@keyframes infinityBlogSlide{0%{transform:translate(-250vw)}to{transform:translate(70vw)}}}',
							],
						})),
						e
					)
				})(),
				MN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp02-footer']],
							decls: 60,
							vars: 0,
							consts: [
								[1, 'footer'],
								[1, 'footer__container', 'container'],
								[1, 'footer__top'],
								[1, 'footer__row'],
								[1, 'footer__column'],
								[1, 'footer__title'],
								[1, 'footer__social'],
								[1, 'footer__social__item'],
								['href', '#', 1, 'footer__social__link'],
								[1, 'fas', 'fa-rss-square'],
								[1, 'fas', 'fa-blog'],
								[1, 'fas', 'fa-audio-description'],
								[1, 'footer__address'],
								[1, 'footer__email'],
								[1, 'footer__phone'],
								[1, 'footer__menu'],
								[1, 'footer__menu__item'],
								['href', '#', 1, 'footer__menu__link'],
								[1, 'footer__divisor'],
								[1, 'footer__bottom'],
								[1, 'footer__copyright'],
								[1, 'footer__copyright__description'],
								[1, 'footer__compatible'],
								[1, 'footer__compatible__description'],
								[1, 'footer__device'],
								[1, 'footer__device__item'],
								[1, 'fas', 'fa-desktop'],
								[1, 'fas', 'fa-mobile-alt'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'section', 0)(1, 'div', 1)(2, 'div', 2)(3, 'div', 3)(4, 'div', 4)(
										5,
										'span',
										5
									),
									h(6, 'Follow Us'),
									f(),
									g(7, 'div', 6)(8, 'div', 7)(9, 'a', 8),
									_(10, 'i', 9),
									f()(),
									g(11, 'div', 7)(12, 'a', 8),
									_(13, 'i', 10),
									f()(),
									g(14, 'div', 7)(15, 'a', 8),
									_(16, 'i', 11),
									f()()()(),
									g(17, 'div', 4)(18, 'span', 5),
									h(19, 'Contact Us'),
									f(),
									g(20, 'p', 12),
									h(21, ' 4517 Washington Ave. Manchester,'),
									_(22, 'br'),
									h(23, ' Kentucky 39495 '),
									f(),
									g(24, 'p', 13),
									h(25, 'deanna.curtis@example.com'),
									f(),
									g(26, 'p', 14),
									h(27, '(671) 555-0110'),
									f()(),
									g(28, 'div', 4)(29, 'span', 5),
									h(30, 'Userfull Links'),
									f(),
									g(31, 'ul', 15)(32, 'li', 16)(33, 'a', 17),
									h(34, 'About Us'),
									f()(),
									g(35, 'li', 16)(36, 'a', 17),
									h(37, 'Blog'),
									f()(),
									g(38, 'li', 16)(39, 'a', 17),
									h(40, 'Our Team'),
									f()(),
									g(41, 'li', 16)(42, 'a', 17),
									h(43, '404 Page'),
									f()(),
									g(44, 'li', 16)(45, 'a', 17),
									h(46, 'Pricing Plans'),
									f()()()()()(),
									_(47, 'div', 18),
									g(48, 'div', 19)(49, 'div', 20)(50, 'span', 21),
									h(51, 'Copyright \xa9 2020. All right reserved'),
									f()(),
									g(52, 'div', 22)(53, 'span', 23),
									h(54, 'Compatible With:'),
									f(),
									g(55, 'div', 24)(56, 'div', 25),
									_(57, 'i', 26),
									f(),
									g(58, 'div', 25),
									_(59, 'i', 27),
									f()()()()()())
							},
							styles: [
								'@import"https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap";*[_ngcontent-%COMP%]{margin:0;padding:0;text-decoration:none;list-style:none;box-sizing:border-box;font-family:Lato,sans-serif;color:#111}.fa[_ngcontent-%COMP%], .fas[_ngcontent-%COMP%], .fa-classic[_ngcontent-%COMP%], .fa-solid[_ngcontent-%COMP%], .far[_ngcontent-%COMP%], .fa-regular[_ngcontent-%COMP%], .fab[_ngcontent-%COMP%], .fa-brands[_ngcontent-%COMP%]{font-family:var(--fa-style-family, "Font Awesome 6 Free")!important;font-weight:var(--fa-style, 900)}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{font-family:Lato,sans-serif;color:#111}body[_ngcontent-%COMP%]{max-width:100vw;min-height:100vh;overflow-x:hidden;overflow-y:auto}section[_ngcontent-%COMP%]{width:100%;padding:72px 0;overflow-x:hidden}@media all and (max-width: 768px){section[_ngcontent-%COMP%]{padding:30px 0}}.container[_ngcontent-%COMP%]{max-width:830px;flex-basis:830px;padding:0 10px;margin:0 auto;box-sizing:content-box}.button[_ngcontent-%COMP%]{font-size:1rem;min-height:40px;padding:5px 15px;border-radius:10px;transition:.5s;border:1px solid transparent;display:inline-flex;justify-content:center;align-items:center;cursor:pointer;background-color:#ddd;color:#777}.button[_ngcontent-%COMP%]:hover{transition:.5s}.button.primary[_ngcontent-%COMP%]{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.primary[_ngcontent-%COMP%]:hover, .button.primary.outline[_ngcontent-%COMP%]{border:2px solid #ff7eb3;background-image:none;background-color:transparent;color:#ff7eb3}.button.primary.outline[_ngcontent-%COMP%]:hover{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.greyd.outline[_ngcontent-%COMP%]{background-color:transparent;color:#ddd}.footer[_ngcontent-%COMP%]{padding-top:205px;padding-bottom:118px;background-color:#010101}.footer[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{color:#fff}.footer__row[_ngcontent-%COMP%]{margin-left:-15px;margin-right:-15px;display:flex;flex-wrap:wrap;justify-content:space-between}.footer__column[_ngcontent-%COMP%]{flex-grow:1;padding-left:15px;padding-right:15px}.footer__column[_ngcontent-%COMP%]:nth-child(1){flex-grow:2}.footer__column[_ngcontent-%COMP%]:nth-child(2){margin-left:-10px;flex-grow:1}.footer__column[_ngcontent-%COMP%]:nth-child(3){width:211px;flex-grow:0}.footer__title[_ngcontent-%COMP%]{font-size:1.2rem;letter-spacing:.7px;margin-bottom:18px;display:block}.footer__social[_ngcontent-%COMP%]{margin-top:27px;display:flex}.footer__social__item[_ngcontent-%COMP%]{margin-right:22px}.footer__social__item[_ngcontent-%COMP%]:last-child{margin-right:0}.footer__social__link[_ngcontent-%COMP%]{color:#fff}.footer__social__link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.2rem}.footer__address[_ngcontent-%COMP%]{margin:23px 0 -1px;line-height:27px}.footer__email[_ngcontent-%COMP%], .footer__phone[_ngcontent-%COMP%]{line-height:27px}.footer__menu[_ngcontent-%COMP%]{margin-left:-27px;margin-right:-27px;display:flex;flex-wrap:wrap}.footer__menu__item[_ngcontent-%COMP%]{padding-left:27px;padding-right:27px;width:50%;margin-top:10px}.footer__menu__link[_ngcontent-%COMP%]{font-size:1rem;font-weight:700;color:#fff;white-space:nowrap}.footer__divisor[_ngcontent-%COMP%]{height:3px;width:100%;margin:86px 0 19px;background-color:#fefefe}.footer__bottom[_ngcontent-%COMP%], .footer__compatible[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.footer__device[_ngcontent-%COMP%]{margin-left:16px;display:flex;justify-content:space-between;align-items:center}.footer__device__item[_ngcontent-%COMP%]{margin-left:18px}@media all and (max-width: 576px){.footer[_ngcontent-%COMP%]{padding-top:125px}.footer__column[_ngcontent-%COMP%]{max-width:100%;flex-basis:100%;margin-bottom:30px;text-align:center}.footer__column[_ngcontent-%COMP%]:nth-child(2){margin-left:0}.footer__social[_ngcontent-%COMP%]{justify-content:center}.footer__divisor[_ngcontent-%COMP%]{margin:15px 0 19px}}',
							],
						})),
						e
					)
				})(),
				wN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp02-header']],
							decls: 15,
							vars: 0,
							consts: [
								[1, 'header'],
								[1, 'header__container', 'container'],
								[1, 'header__info'],
								[1, 'header__title'],
								[1, 'header__subtitle'],
								[1, 'header__button', 'button', 'primary', 'outline'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'header', 0)(1, 'div', 1)(2, 'div', 2)(3, 'h1', 3),
									h(4, 'Lorem'),
									_(5, 'br'),
									h(6, 'Cupidatat'),
									f(),
									g(7, 'p', 4),
									h(8, ' Nulla Lorem mollit cupidatat irure. Laborum magna nulla '),
									_(9, 'br'),
									h(10, ' duis ullamco cillum dolor. Voluptate exercitation '),
									_(11, 'br'),
									h(12, ' incididunt aliquip deserunt. '),
									f(),
									g(13, 'button', 5),
									h(14, 'Lorem'),
									f()()()())
							},
							styles: [
								'@import"https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap";*[_ngcontent-%COMP%]{margin:0;padding:0;text-decoration:none;list-style:none;box-sizing:border-box;font-family:Lato,sans-serif;color:#111}.fa[_ngcontent-%COMP%], .fas[_ngcontent-%COMP%], .fa-classic[_ngcontent-%COMP%], .fa-solid[_ngcontent-%COMP%], .far[_ngcontent-%COMP%], .fa-regular[_ngcontent-%COMP%], .fab[_ngcontent-%COMP%], .fa-brands[_ngcontent-%COMP%]{font-family:var(--fa-style-family, "Font Awesome 6 Free")!important;font-weight:var(--fa-style, 900)}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{font-family:Lato,sans-serif;color:#111}body[_ngcontent-%COMP%]{max-width:100vw;min-height:100vh;overflow-x:hidden;overflow-y:auto}section[_ngcontent-%COMP%]{width:100%;padding:72px 0;overflow-x:hidden}@media all and (max-width: 768px){section[_ngcontent-%COMP%]{padding:30px 0}}.container[_ngcontent-%COMP%]{max-width:830px;flex-basis:830px;padding:0 10px;margin:0 auto;box-sizing:content-box}.button[_ngcontent-%COMP%]{font-size:1rem;min-height:40px;padding:5px 15px;border-radius:10px;transition:.5s;border:1px solid transparent;display:inline-flex;justify-content:center;align-items:center;cursor:pointer;background-color:#ddd;color:#777}.button[_ngcontent-%COMP%]:hover{transition:.5s}.button.primary[_ngcontent-%COMP%]{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.primary[_ngcontent-%COMP%]:hover, .button.primary.outline[_ngcontent-%COMP%]{border:2px solid #ff7eb3;background-image:none;background-color:transparent;color:#ff7eb3}.button.primary.outline[_ngcontent-%COMP%]:hover{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.greyd.outline[_ngcontent-%COMP%]{background-color:transparent;color:#ddd}.header[_ngcontent-%COMP%]{width:100%;height:797px;background-image:url(/assets/images/landing-pages/landing-page02/header.svg);background-size:cover;background-position:center bottom;background-repeat:no-repeat}.header__container[_ngcontent-%COMP%]{max-width:810px;height:100%;display:flex;justify-content:flex-end;align-items:center}.header__title[_ngcontent-%COMP%]{font-size:4.1rem;font-weight:900;line-height:78px;letter-spacing:.8px}.header__subtitle[_ngcontent-%COMP%]{margin:25px 0;line-height:26px;font-size:.96rem;color:#666}.header__button[_ngcontent-%COMP%]{width:189px;font-size:1.1rem;min-height:56px;font-weight:700}@media all and (max-width: 1200px){.header[_ngcontent-%COMP%]{padding:50px 0 150px;height:initial}}@media all and (max-width: 992px){.header__container[_ngcontent-%COMP%]{justify-content:center}.header__info[_ngcontent-%COMP%]{text-align:center}}@media all and (max-width: 768px){.header__title[_ngcontent-%COMP%]{font-size:2rem;line-height:40px}.header__subtitle[_ngcontent-%COMP%]{font-size:.8rem;line-height:20px}}',
							],
						})),
						e
					)
				})(),
				PN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp02-nav']],
							decls: 34,
							vars: 0,
							consts: [
								['for', 'nav__controller', 1, 'nav__controller'],
								[1, 'fas', 'fa-bars'],
								['type', 'checkbox', 'id', 'nav__controller'],
								[1, 'nav'],
								[1, 'nav__container', 'container'],
								[1, 'nav__left'],
								[1, 'nav__logo'],
								['src', 'assets/images/landing-pages/landing-page02/logo.svg', 'alt', 'Logo'],
								[1, 'nav__center'],
								[1, 'nav__menu'],
								[1, 'nav__item', 'nav__item--active'],
								['href', '#', 1, 'nav__link'],
								[1, 'nav__item'],
								[1, 'nav__right'],
								[1, 'nav__button', 'button', 'primary'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'label', 0),
									_(1, 'i', 1),
									f(),
									_(2, 'input', 2),
									g(3, 'nav', 3)(4, 'div', 4)(5, 'div', 5)(6, 'div', 6),
									_(7, 'img', 7),
									f()(),
									g(8, 'div', 8)(9, 'ul', 9)(10, 'li', 10)(11, 'a', 11),
									h(12, 'Home'),
									f()(),
									g(13, 'li', 12)(14, 'a', 11),
									h(15, 'Pages'),
									f()(),
									g(16, 'li', 12)(17, 'a', 11),
									h(18, 'Services'),
									f()(),
									g(19, 'li', 12)(20, 'a', 11),
									h(21, 'Projects'),
									f()(),
									g(22, 'li', 12)(23, 'a', 11),
									h(24, 'Blog'),
									f()(),
									g(25, 'li', 12)(26, 'a', 11),
									h(27, 'Contact Us'),
									f()(),
									g(28, 'li', 12)(29, 'a', 11),
									h(30, 'Career'),
									f()()()(),
									g(31, 'div', 13)(32, 'button', 14),
									h(33, 'Sign in'),
									f()()()())
							},
							styles: [
								'@import"https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap";*[_ngcontent-%COMP%]{margin:0;padding:0;text-decoration:none;list-style:none;box-sizing:border-box;font-family:Lato,sans-serif;color:#111}.fa[_ngcontent-%COMP%], .fas[_ngcontent-%COMP%], .fa-classic[_ngcontent-%COMP%], .fa-solid[_ngcontent-%COMP%], .far[_ngcontent-%COMP%], .fa-regular[_ngcontent-%COMP%], .fab[_ngcontent-%COMP%], .fa-brands[_ngcontent-%COMP%]{font-family:var(--fa-style-family, "Font Awesome 6 Free")!important;font-weight:var(--fa-style, 900)}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{font-family:Lato,sans-serif;color:#111}body[_ngcontent-%COMP%]{max-width:100vw;min-height:100vh;overflow-x:hidden;overflow-y:auto}section[_ngcontent-%COMP%]{width:100%;padding:72px 0;overflow-x:hidden}@media all and (max-width: 768px){section[_ngcontent-%COMP%]{padding:30px 0}}.container[_ngcontent-%COMP%]{max-width:830px;flex-basis:830px;padding:0 10px;margin:0 auto;box-sizing:content-box}.button[_ngcontent-%COMP%]{font-size:1rem;min-height:40px;padding:5px 15px;border-radius:10px;transition:.5s;border:1px solid transparent;display:inline-flex;justify-content:center;align-items:center;cursor:pointer;background-color:#ddd;color:#777}.button[_ngcontent-%COMP%]:hover{transition:.5s}.button.primary[_ngcontent-%COMP%]{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.primary[_ngcontent-%COMP%]:hover, .button.primary.outline[_ngcontent-%COMP%]{border:2px solid #ff7eb3;background-image:none;background-color:transparent;color:#ff7eb3}.button.primary.outline[_ngcontent-%COMP%]:hover{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.greyd.outline[_ngcontent-%COMP%]{background-color:transparent;color:#ddd}#nav__controller[_ngcontent-%COMP%]{display:none}.nav[_ngcontent-%COMP%]{width:100%;height:85px;background-color:#fff;display:flex;align-items:center}.nav__controller[_ngcontent-%COMP%]{width:50px;height:50px;bottom:20px;right:20px;border-radius:50%;z-index:1001;background-image:linear-gradient(145deg,#ff7eb3,#ff758c);box-shadow:0 19px 33px #6f6d712b;position:fixed;display:none;justify-content:center;align-items:center}.nav__controller[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.5rem;color:#fff}.nav__container[_ngcontent-%COMP%]{max-width:1250px;flex-basis:1250px;display:flex;justify-content:space-between;align-items:center}.nav__logo[_ngcontent-%COMP%]{height:35px}.nav__logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;object-fit:contain}.nav__menu[_ngcontent-%COMP%]{margin-top:4px;display:flex;transform:translate(-21px)}.nav__item[_ngcontent-%COMP%]{margin-right:19px}.nav__item[_ngcontent-%COMP%]:last-child{margin-right:0}.nav__item--active[_ngcontent-%COMP%]   .nav__link[_ngcontent-%COMP%]{transition:.5s;color:#ff7eb3}.nav__link[_ngcontent-%COMP%]{font-size:1.099rem;transition:.5s}.nav__link[_ngcontent-%COMP%]:hover{transition:.5s;color:#ff7eb3}.nav__button[_ngcontent-%COMP%]{width:112px;font-size:1.1rem;min-height:44px}@media all and (max-width: 992px){.nav__logo[_ngcontent-%COMP%]{height:25px}.nav__menu[_ngcontent-%COMP%]{transform:translate(0)}.nav__link[_ngcontent-%COMP%]{font-size:.8rem}.nav__button[_ngcontent-%COMP%]{min-height:30px;width:initial}}@media all and (max-width: 768px){#nav__controller[_ngcontent-%COMP%]:checked ~ .nav[_ngcontent-%COMP%]{left:0;transition:.5s}.nav[_ngcontent-%COMP%]{width:250px;height:100vh;z-index:1000;top:0;left:-250px;transition:.5s;box-shadow:0 19px 33px #6f6d712b;position:fixed}.nav__controller[_ngcontent-%COMP%]{display:flex}.nav__container[_ngcontent-%COMP%]{flex-direction:column}.nav__menu[_ngcontent-%COMP%]{margin:30px 0;flex-direction:column}.nav__item[_ngcontent-%COMP%]{margin-right:0;text-align:center}}',
							],
						})),
						e
					)
				})(),
				ON = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp02-partner']],
							decls: 19,
							vars: 0,
							consts: [
								[1, 'partner'],
								[1, 'partner__container', 'container'],
								[1, 'partner__content'],
								[1, 'partner__list'],
								[1, 'partner__list__item'],
								[1, 'partner__list__logo'],
								[
									'src',
									'assets/images/landing-pages/landing-page02/logo-3.svg',
									'alt',
									'Logo partner 1',
									1,
									'svg',
								],
								[
									'src',
									'assets/images/landing-pages/landing-page02/logo-2.svg',
									'alt',
									'Logo partner 1',
									1,
									'svg',
								],
								[
									'src',
									'assets/images/landing-pages/landing-page02/logo-1.svg',
									'alt',
									'Logo partner 1',
									1,
									'svg',
								],
								[
									'src',
									'assets/images/landing-pages/landing-page02/logo-4.svg',
									'alt',
									'Logo partner 1',
									1,
									'svg',
								],
								[
									'src',
									'assets/images/landing-pages/landing-page02/logo-5.svg',
									'alt',
									'Logo partner 1',
									1,
									'svg',
								],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'section', 0)(1, 'div', 1)(2, 'div', 2)(3, 'div', 3)(4, 'div', 4)(
										5,
										'div',
										5
									),
									_(6, 'img', 6),
									f()(),
									g(7, 'div', 4)(8, 'div', 5),
									_(9, 'img', 7),
									f()(),
									g(10, 'div', 4)(11, 'div', 5),
									_(12, 'img', 8),
									f()(),
									g(13, 'div', 4)(14, 'div', 5),
									_(15, 'img', 9),
									f()(),
									g(16, 'div', 4)(17, 'div', 5),
									_(18, 'img', 10),
									f()()()()()())
							},
							styles: [
								'@import"https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap";*[_ngcontent-%COMP%]{margin:0;padding:0;text-decoration:none;list-style:none;box-sizing:border-box;font-family:Lato,sans-serif;color:#111}.fa[_ngcontent-%COMP%], .fas[_ngcontent-%COMP%], .fa-classic[_ngcontent-%COMP%], .fa-solid[_ngcontent-%COMP%], .far[_ngcontent-%COMP%], .fa-regular[_ngcontent-%COMP%], .fab[_ngcontent-%COMP%], .fa-brands[_ngcontent-%COMP%]{font-family:var(--fa-style-family, "Font Awesome 6 Free")!important;font-weight:var(--fa-style, 900)}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{font-family:Lato,sans-serif;color:#111}body[_ngcontent-%COMP%]{max-width:100vw;min-height:100vh;overflow-x:hidden;overflow-y:auto}section[_ngcontent-%COMP%]{width:100%;padding:72px 0;overflow-x:hidden}@media all and (max-width: 768px){section[_ngcontent-%COMP%]{padding:30px 0}}.container[_ngcontent-%COMP%]{max-width:830px;flex-basis:830px;padding:0 10px;margin:0 auto;box-sizing:content-box}.button[_ngcontent-%COMP%]{font-size:1rem;min-height:40px;padding:5px 15px;border-radius:10px;transition:.5s;border:1px solid transparent;display:inline-flex;justify-content:center;align-items:center;cursor:pointer;background-color:#ddd;color:#777}.button[_ngcontent-%COMP%]:hover{transition:.5s}.button.primary[_ngcontent-%COMP%]{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.primary[_ngcontent-%COMP%]:hover, .button.primary.outline[_ngcontent-%COMP%]{border:2px solid #ff7eb3;background-image:none;background-color:transparent;color:#ff7eb3}.button.primary.outline[_ngcontent-%COMP%]:hover{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.greyd.outline[_ngcontent-%COMP%]{background-color:transparent;color:#ddd}.partner[_ngcontent-%COMP%]{padding-top:0;padding-bottom:0;margin-bottom:-100px;z-index:1;position:relative}.partner__container[_ngcontent-%COMP%]{max-width:1220px;flex-basis:1220px}.partner__content[_ngcontent-%COMP%]{min-height:200px;border-radius:15px;padding:30px 60px;box-shadow:0 19px 33px #6f6d712b;background-color:#fff;display:flex;align-items:center}.partner__list[_ngcontent-%COMP%]{margin-left:-31px;margin-right:-31px;display:flex}.partner__list__item[_ngcontent-%COMP%]{width:20%;padding-left:31px;padding-right:31px;display:flex;justify-content:center;align-items:center}.partner__list__item[_ngcontent-%COMP%]:nth-child(4)   svg[_ngcontent-%COMP%]{width:200px}.partner__list__logo[_ngcontent-%COMP%]{width:100%}.partner__list__logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .partner__list__logo[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{width:100%;object-fit:contain;transition:.5s}.partner__list__logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover   path[_ngcontent-%COMP%], .partner__list__logo[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]:hover   path[_ngcontent-%COMP%]{transition:.5s;fill:#f16e88}@media all and (max-width: 992px){.partner__list[_ngcontent-%COMP%]{flex-wrap:wrap;justify-content:center}.partner__list__item[_ngcontent-%COMP%]{width:50%;margin-bottom:15px}.partner__list__item[_ngcontent-%COMP%]:nth-child(4)   svg[_ngcontent-%COMP%]{width:100%}}@media all and (max-width: 768px){.partner__content[_ngcontent-%COMP%]{margin-top:30px}}@media all and (max-width: 576px){.partner__content[_ngcontent-%COMP%]{padding:10px}}',
							],
						})),
						e
					)
				})()
			function Wb(e, t, n, o, r, i, s) {
				try {
					var a = e[i](s),
						c = a.value
				} catch (l) {
					return void n(l)
				}
				a.done ? t(c) : Promise.resolve(c).then(o, r)
			}
			let EN = (() => {
					class e {
						constructor() {}
						ngOnInit() {}
						ngAfterViewInit() {
							!(function DN(e) {
								return function () {
									var t = this,
										n = arguments
									return new Promise(function (o, r) {
										var i = e.apply(t, n)
										function s(c) {
											Wb(i, o, r, s, a, 'next', c)
										}
										function a(c) {
											Wb(i, o, r, s, a, 'throw', c)
										}
										s(void 0)
									})
								}
							})(function* () {
								const n = document.querySelectorAll('.price .price__radio')
								if (n) {
									let o = function (r) {
										const i = document.querySelectorAll('.price .price__tab__item')
										i &&
											(i.forEach((a) => a.classList.remove('price__tab__item--active')),
											document
												.querySelector(`.price .price__tab__item[data-tab="${r}"]`)
												?.classList.add('price__tab__item--active'))
									}
									o('plan__basic'),
										n.forEach((r) => {
											r.addEventListener('click', () => {
												o(r.getAttribute('value'))
											})
										})
								}
							})()
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp02-price']],
							decls: 150,
							vars: 0,
							consts: [
								[1, 'price'],
								[1, 'price__animation'],
								[1, 'price__animation__triangle'],
								[1, 'price__animation__circle'],
								[1, 'price__animation__square'],
								[1, 'price__animation__ball_01'],
								[1, 'price__animation__ball_02'],
								[1, 'price__animation__ball_03'],
								[1, 'price__animation__ball_04'],
								[1, 'price__container', 'container'],
								[1, 'price__header'],
								[1, 'price__name'],
								[1, 'price__title'],
								[1, 'price__description'],
								[1, 'price__content'],
								[1, 'price__row'],
								[1, 'price__column'],
								[1, 'price__plan'],
								[
									'type',
									'radio',
									'name',
									'plan',
									'id',
									'plan__basic',
									'value',
									'plan__basic',
									'checked',
									'',
									1,
									'price__radio',
								],
								['for', 'plan__basic', 1, 'price__plan__item'],
								[1, 'price__plan__left'],
								[1, 'price__plan__bullet'],
								[1, 'price__plan__icon'],
								[1, 'fas', 'fa-check'],
								[1, 'price__plan__center'],
								[1, 'price__plan__name'],
								[1, 'price__plan__save'],
								[1, 'price__plan__right'],
								[1, 'price__plan__price'],
								[1, 'price__plan__dollar'],
								[1, 'price__plan__number'],
								[1, 'price__plan__period'],
								[
									'type',
									'radio',
									'name',
									'plan',
									'id',
									'plan__standart',
									'value',
									'plan__standart',
									1,
									'price__radio',
								],
								['for', 'plan__standart', 1, 'price__plan__item'],
								[
									'type',
									'radio',
									'name',
									'plan',
									'id',
									'intermediante',
									'value',
									'plan__intermediante',
									1,
									'price__radio',
								],
								['for', 'intermediante', 1, 'price__plan__item'],
								[1, 'price__tab'],
								['data-tab', 'plan__basic', 1, 'price__tab__item'],
								[1, 'price__list'],
								[1, 'price__list__item', 'price__list__item--active'],
								[1, 'price__list__description'],
								[1, 'price__list__icon'],
								[1, 'price__list__item'],
								['data-tab', 'plan__standart', 1, 'price__tab__item'],
								['data-tab', 'plan__intermediante', 1, 'price__tab__item'],
								[1, 'price__button', 'button', 'primary'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'section', 0)(1, 'div', 1),
									_(2, 'div', 2)(3, 'div', 3)(4, 'div', 4)(5, 'div', 5)(6, 'div', 6)(7, 'div', 7)(
										8,
										'div',
										8
									),
									f(),
									g(9, 'div', 9)(10, 'div', 10)(11, 'span', 11),
									h(12, 'Price'),
									f(),
									g(13, 'h2', 12),
									h(14, 'Laboris commodo consequat'),
									f(),
									g(15, 'p', 13),
									h(
										16,
										' Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.'
									),
									_(17, 'br'),
									h(18, ' Voluptate exercitation incididunt aliquip deserunt. '),
									f()(),
									g(19, 'div', 14)(20, 'div', 15)(21, 'div', 16)(22, 'div', 17),
									_(23, 'input', 18),
									g(24, 'label', 19)(25, 'div', 20)(26, 'div', 21)(27, 'div', 22),
									_(28, 'i', 23),
									f()()(),
									g(29, 'div', 24)(30, 'h3', 25),
									h(31, 'Basic'),
									f(),
									g(32, 'div', 26),
									h(33, 'Save 20%'),
									f()(),
									g(34, 'div', 27)(35, 'span', 28)(36, 'span', 29),
									h(37, '$'),
									f(),
									g(38, 'span', 30),
									h(39, '24'),
									f(),
									g(40, 'span', 31),
									h(41, '/ Monthly'),
									f()()()(),
									_(42, 'input', 32),
									g(43, 'label', 33)(44, 'div', 20)(45, 'div', 21)(46, 'div', 22),
									_(47, 'i', 23),
									f()()(),
									g(48, 'div', 24)(49, 'h3', 25),
									h(50, 'Standart'),
									f(),
									g(51, 'div', 26),
									h(52, 'Save 20%'),
									f()(),
									g(53, 'div', 27)(54, 'span', 28)(55, 'span', 29),
									h(56, '$'),
									f(),
									g(57, 'span', 30),
									h(58, '24'),
									f(),
									g(59, 'span', 31),
									h(60, '/ Monthly'),
									f()()()(),
									_(61, 'input', 34),
									g(62, 'label', 35)(63, 'div', 20)(64, 'div', 21)(65, 'div', 22),
									_(66, 'i', 23),
									f()()(),
									g(67, 'div', 24)(68, 'h3', 25),
									h(69, 'Intermediate'),
									f(),
									g(70, 'div', 26),
									h(71, 'Save 20%'),
									f()(),
									g(72, 'div', 27)(73, 'span', 28)(74, 'span', 29),
									h(75, '$'),
									f(),
									g(76, 'span', 30),
									h(77, '24'),
									f(),
									g(78, 'span', 31),
									h(79, '/ Monthly'),
									f()()()()()(),
									g(80, 'div', 16)(81, 'div', 36)(82, 'div', 37)(83, 'div', 38)(84, 'div', 39)(
										85,
										'p',
										40
									),
									h(86, 'All limited link'),
									f(),
									_(87, 'div', 41),
									f(),
									g(88, 'div', 39)(89, 'p', 40),
									h(90, 'Unlimited users'),
									f(),
									_(91, 'div', 41),
									f(),
									g(92, 'div', 39)(93, 'p', 40),
									h(94, 'Chat support'),
									f(),
									_(95, 'div', 41),
									f(),
									g(96, 'div', 42)(97, 'p', 40),
									h(98, 'Optimized hashtags'),
									f(),
									_(99, 'div', 41),
									f(),
									g(100, 'div', 42)(101, 'p', 40),
									h(102, 'Analytic tools'),
									f(),
									_(103, 'div', 41),
									f()()(),
									g(104, 'div', 43)(105, 'div', 38)(106, 'div', 39)(107, 'p', 40),
									h(108, 'All limited link'),
									f(),
									_(109, 'div', 41),
									f(),
									g(110, 'div', 39)(111, 'p', 40),
									h(112, 'Unlimited users'),
									f(),
									_(113, 'div', 41),
									f(),
									g(114, 'div', 39)(115, 'p', 40),
									h(116, 'Chat support'),
									f(),
									_(117, 'div', 41),
									f(),
									g(118, 'div', 39)(119, 'p', 40),
									h(120, 'Optimized hashtags'),
									f(),
									_(121, 'div', 41),
									f(),
									g(122, 'div', 42)(123, 'p', 40),
									h(124, 'Analytic tools'),
									f(),
									_(125, 'div', 41),
									f()()(),
									g(126, 'div', 44)(127, 'div', 38)(128, 'div', 39)(129, 'p', 40),
									h(130, 'All limited link'),
									f(),
									_(131, 'div', 41),
									f(),
									g(132, 'div', 39)(133, 'p', 40),
									h(134, 'Unlimited users'),
									f(),
									_(135, 'div', 41),
									f(),
									g(136, 'div', 39)(137, 'p', 40),
									h(138, 'Chat support'),
									f(),
									_(139, 'div', 41),
									f(),
									g(140, 'div', 39)(141, 'p', 40),
									h(142, 'Optimized hashtags'),
									f(),
									_(143, 'div', 41),
									f(),
									g(144, 'div', 39)(145, 'p', 40),
									h(146, 'Analytic tools'),
									f(),
									_(147, 'div', 41),
									f()()()()()(),
									g(148, 'button', 45),
									h(149, 'Choose Plan'),
									f()()()())
							},
							styles: [
								'@import"https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap";*[_ngcontent-%COMP%]{margin:0;padding:0;text-decoration:none;list-style:none;box-sizing:border-box;font-family:Lato,sans-serif;color:#111}.fa[_ngcontent-%COMP%], .fas[_ngcontent-%COMP%], .fa-classic[_ngcontent-%COMP%], .fa-solid[_ngcontent-%COMP%], .far[_ngcontent-%COMP%], .fa-regular[_ngcontent-%COMP%], .fab[_ngcontent-%COMP%], .fa-brands[_ngcontent-%COMP%]{font-family:var(--fa-style-family, "Font Awesome 6 Free")!important;font-weight:var(--fa-style, 900)}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{font-family:Lato,sans-serif;color:#111}body[_ngcontent-%COMP%]{max-width:100vw;min-height:100vh;overflow-x:hidden;overflow-y:auto}section[_ngcontent-%COMP%]{width:100%;padding:72px 0;overflow-x:hidden}@media all and (max-width: 768px){section[_ngcontent-%COMP%]{padding:30px 0}}.container[_ngcontent-%COMP%]{max-width:830px;flex-basis:830px;padding:0 10px;margin:0 auto;box-sizing:content-box}.button[_ngcontent-%COMP%]{font-size:1rem;min-height:40px;padding:5px 15px;border-radius:10px;transition:.5s;border:1px solid transparent;display:inline-flex;justify-content:center;align-items:center;cursor:pointer;background-color:#ddd;color:#777}.button[_ngcontent-%COMP%]:hover{transition:.5s}.button.primary[_ngcontent-%COMP%]{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.primary[_ngcontent-%COMP%]:hover, .button.primary.outline[_ngcontent-%COMP%]{border:2px solid #ff7eb3;background-image:none;background-color:transparent;color:#ff7eb3}.button.primary.outline[_ngcontent-%COMP%]:hover{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.greyd.outline[_ngcontent-%COMP%]{background-color:transparent;color:#ddd}.price[_ngcontent-%COMP%]{padding-top:65px;padding-bottom:111px;position:relative;text-align:center;background-color:#fff5eb}.price__animation[_ngcontent-%COMP%]{top:0;width:100%;height:100%;position:absolute}@keyframes _ngcontent-%COMP%_move{0%{transform:translate(0)}to{transform:translateY(50px)}}.price__animation__triangle[_ngcontent-%COMP%]{border:none;width:0px;height:0px;border-left:25px solid transparent;border-right:25px solid transparent;border-bottom:45px solid rgba(255,126,179,.3);top:115px;left:199px;position:absolute;transform:rotate(-14deg);animation:_ngcontent-%COMP%_move 5s infinite alternate-reverse ease-in-out}.price__animation__circle[_ngcontent-%COMP%]{width:57px;height:57px;border-radius:50%;top:148px;left:-36px;background-image:linear-gradient(to right,rgba(255,126,179,.3),rgba(255,117,140,.3));position:absolute;animation:_ngcontent-%COMP%_move 7s infinite alternate-reverse ease-in-out}.price__animation__square[_ngcontent-%COMP%]{width:57px;height:57px;top:368px;left:87px;background-image:linear-gradient(to right,rgba(255,126,179,.3),rgba(255,117,140,.3));position:absolute;animation:_ngcontent-%COMP%_move 9s infinite alternate-reverse ease-in-out}.price__animation__ball_01[_ngcontent-%COMP%], .price__animation__ball_02[_ngcontent-%COMP%], .price__animation__ball_03[_ngcontent-%COMP%], .price__animation__ball_04[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:50%;background-color:#ee5328;position:absolute}.price__animation__ball_01[_ngcontent-%COMP%]{bottom:379px;right:132px;animation:_ngcontent-%COMP%_move 5s infinite alternate-reverse ease-in-out}.price__animation__ball_02[_ngcontent-%COMP%]{bottom:266px;right:202px;animation:_ngcontent-%COMP%_move 6s infinite alternate-reverse ease-in-out}.price__animation__ball_03[_ngcontent-%COMP%]{bottom:180px;right:100px;animation:_ngcontent-%COMP%_move 7s infinite alternate-reverse ease-in-out}.price__animation__ball_04[_ngcontent-%COMP%]{bottom:171px;right:278px;animation:_ngcontent-%COMP%_move 8s infinite alternate-reverse ease-in-out}.price__container[_ngcontent-%COMP%]{z-index:1;position:relative}.price__name[_ngcontent-%COMP%]{font-size:1.3rem;margin-bottom:19px;font-weight:700;display:block;color:#ff7eb3}.price__title[_ngcontent-%COMP%]{font-size:1.8rem;font-weight:900;letter-spacing:.3px}.price__description[_ngcontent-%COMP%]{margin-top:26px;font-size:.98rem;line-height:26px;color:#666}.price__content[_ngcontent-%COMP%]{margin-top:72px}.price__row[_ngcontent-%COMP%]{margin-left:-11px;margin-right:-11px;display:flex;flex-wrap:wrap}.price__column[_ngcontent-%COMP%]{width:50%;padding-left:11px;padding-right:11px}.price__radio[_ngcontent-%COMP%]{display:none}.price__radio[_ngcontent-%COMP%]:checked + .price__plan__item[_ngcontent-%COMP%]   .price__plan__icon[_ngcontent-%COMP%]{opacity:1;transition:.5s;visibility:visible}.price__plan__item[_ngcontent-%COMP%]{border-radius:20px;padding:5px 19px 5px 30px;min-height:106px;margin-bottom:14px;box-shadow:0 19px 33px #6f6d7112;background-color:#fff;display:flex;justify-content:space-between;align-items:center;cursor:pointer}.price__plan__bullet[_ngcontent-%COMP%]{width:27px;height:27px;border-radius:50%;border:2px solid #ff7eb3;display:flex;justify-content:center;align-items:center;background-image:linear-gradient(145deg,#ff7eb3,#ff758c)}.price__plan__icon[_ngcontent-%COMP%]{transition:.5s;opacity:0;visibility:hidden}.price__plan__icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#fff}.price__plan__center[_ngcontent-%COMP%]{width:100%;padding:0 5px 0 38px;text-align:left}.price__plan__name[_ngcontent-%COMP%]{font-size:1.2rem}.price__plan__save[_ngcontent-%COMP%]{border-radius:30px;min-height:32px;margin-top:9px;padding:6px 16px;white-space:nowrap;display:inline-flex;background-color:#ffedeb;color:#f16e88}.price__plan__right[_ngcontent-%COMP%]{transform:translate(-2px)}.price__plan__price[_ngcontent-%COMP%]{white-space:nowrap;display:flex;align-items:center}.price__plan__dollar[_ngcontent-%COMP%]{font-weight:900;font-size:.9rem;margin-right:3px;align-self:flex-start}.price__plan__number[_ngcontent-%COMP%]{font-size:2rem;font-weight:900}.price__plan__period[_ngcontent-%COMP%]{padding-left:8px;font-size:.87rem;margin-top:8px}.price__tab__item[_ngcontent-%COMP%]{display:none}.price__tab__item--active[_ngcontent-%COMP%]{display:block}.price__list[_ngcontent-%COMP%]{border-radius:20px;padding:11px 34px 29px;background-color:#fff}.price__list__item[_ngcontent-%COMP%]{min-height:61px;border-bottom:1px solid #ebe9ed;display:flex;justify-content:space-between;align-items:center}.price__list__item--active[_ngcontent-%COMP%]   .price__list__description[_ngcontent-%COMP%]{color:#111}.price__list__item--active[_ngcontent-%COMP%]   .price__list__icon[_ngcontent-%COMP%]:before{font-family:"Font Awesome 5 Free";content:"\\f00c";color:#f16e88}.price__list__description[_ngcontent-%COMP%]{font-size:1rem;color:#666}.price__list__icon[_ngcontent-%COMP%]{margin-right:17px;margin-top:7px}.price__list__icon[_ngcontent-%COMP%]:before{font-family:"Font Awesome 5 Free";font-weight:900;font-size:1.2rem;line-height:1;content:"\\f068";display:inline-block;font-style:normal;font-variant:normal;text-rendering:auto;-webkit-font-smoothing:antialiased;color:#f7b6c3}.price__button[_ngcontent-%COMP%]{margin-top:56px;min-height:57px;width:165px;font-size:1.1rem}@media all and (max-width: 1200px){@keyframes move{0%{transform:translate(0)}}}@media all and (max-width: 992px){@keyframes move{0%{transform:translate(0)}}}@media all and (max-width: 768px){.price[_ngcontent-%COMP%]{padding-top:30px;padding-bottom:30px}@keyframes move{0%{transform:translate(0)}}.price__title[_ngcontent-%COMP%]{font-size:1.5rem;line-height:30px}.price__description[_ngcontent-%COMP%]{font-size:.8rem;line-height:20px}.price__column[_ngcontent-%COMP%]{max-width:100%;flex-basis:100%}.price__plan__item[_ngcontent-%COMP%]{min-height:80px}}@media all and (max-width: 576px){@keyframes move{0%{transform:translate(0)}}}',
							],
						})),
						e
					)
				})(),
				SN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp02-service']],
							decls: 33,
							vars: 0,
							consts: [
								[1, 'service'],
								[1, 'service__container', 'container'],
								[1, 'service__row'],
								[1, 'service__column'],
								[1, 'service__card'],
								[1, 'service__top'],
								[1, 'service__icon'],
								[
									'src',
									'assets/images/landing-pages/landing-page02/dotted-icon-white.svg',
									'alt',
									'Dotted icon',
								],
								[1, 'service__bottom'],
								[1, 'service__title'],
								[1, 'service__description'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'section', 0)(1, 'div', 1)(2, 'div', 2)(3, 'div', 3)(4, 'div', 4)(
										5,
										'div',
										5
									)(6, 'div', 6),
									_(7, 'img', 7),
									f()(),
									g(8, 'div', 8)(9, 'h3', 9),
									h(10, 'Miles Esther'),
									f(),
									g(11, 'p', 10),
									h(12, 'Voluptate exercitation incididunt aliquip deserunt'),
									f()()()(),
									g(13, 'div', 3)(14, 'div', 4)(15, 'div', 5)(16, 'div', 6),
									_(17, 'img', 7),
									f()(),
									g(18, 'div', 8)(19, 'h3', 9),
									h(20, 'Miles Esther'),
									f(),
									g(21, 'p', 10),
									h(22, 'Voluptate exercitation incididunt aliquip deserunt'),
									f()()()(),
									g(23, 'div', 3)(24, 'div', 4)(25, 'div', 5)(26, 'div', 6),
									_(27, 'img', 7),
									f()(),
									g(28, 'div', 8)(29, 'h3', 9),
									h(30, 'Miles Esther'),
									f(),
									g(31, 'p', 10),
									h(32, 'Voluptate exercitation incididunt aliquip deserunt'),
									f()()()()()()())
							},
							styles: [
								'@import"https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap";*[_ngcontent-%COMP%]{margin:0;padding:0;text-decoration:none;list-style:none;box-sizing:border-box;font-family:Lato,sans-serif;color:#111}.fa[_ngcontent-%COMP%], .fas[_ngcontent-%COMP%], .fa-classic[_ngcontent-%COMP%], .fa-solid[_ngcontent-%COMP%], .far[_ngcontent-%COMP%], .fa-regular[_ngcontent-%COMP%], .fab[_ngcontent-%COMP%], .fa-brands[_ngcontent-%COMP%]{font-family:var(--fa-style-family, "Font Awesome 6 Free")!important;font-weight:var(--fa-style, 900)}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{font-family:Lato,sans-serif;color:#111}body[_ngcontent-%COMP%]{max-width:100vw;min-height:100vh;overflow-x:hidden;overflow-y:auto}section[_ngcontent-%COMP%]{width:100%;padding:72px 0;overflow-x:hidden}@media all and (max-width: 768px){section[_ngcontent-%COMP%]{padding:30px 0}}.container[_ngcontent-%COMP%]{max-width:830px;flex-basis:830px;padding:0 10px;margin:0 auto;box-sizing:content-box}.button[_ngcontent-%COMP%]{font-size:1rem;min-height:40px;padding:5px 15px;border-radius:10px;transition:.5s;border:1px solid transparent;display:inline-flex;justify-content:center;align-items:center;cursor:pointer;background-color:#ddd;color:#777}.button[_ngcontent-%COMP%]:hover{transition:.5s}.button.primary[_ngcontent-%COMP%]{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.primary[_ngcontent-%COMP%]:hover, .button.primary.outline[_ngcontent-%COMP%]{border:2px solid #ff7eb3;background-image:none;background-color:transparent;color:#ff7eb3}.button.primary.outline[_ngcontent-%COMP%]:hover{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.greyd.outline[_ngcontent-%COMP%]{background-color:transparent;color:#ddd}.service[_ngcontent-%COMP%]{margin-top:-163px}.service__row[_ngcontent-%COMP%]{margin-left:-11px;margin-right:-11px;display:flex;flex-wrap:wrap}.service__column[_ngcontent-%COMP%]{width:33.3333333%;padding-left:11px;padding-right:11px}.service__column[_ngcontent-%COMP%]:nth-child(1)   .service__card[_ngcontent-%COMP%]{background-color:#fff5eb}.service__column[_ngcontent-%COMP%]:nth-child(1)   .service__icon[_ngcontent-%COMP%]{background-color:#f5ca6e}.service__column[_ngcontent-%COMP%]:nth-child(2)   .service__card[_ngcontent-%COMP%]{background-color:#ffedeb}.service__column[_ngcontent-%COMP%]:nth-child(2)   .service__icon[_ngcontent-%COMP%]{background-color:#f16e88}.service__column[_ngcontent-%COMP%]:nth-child(3)   .service__card[_ngcontent-%COMP%]{background-color:#f2f8f3}.service__column[_ngcontent-%COMP%]:nth-child(3)   .service__icon[_ngcontent-%COMP%]{background-color:#b1d7b8}.service__card[_ngcontent-%COMP%]{width:100%;padding:23px 33px 20px;border-radius:13px;box-shadow:0 19px 33px #6f6d712b}.service__icon[_ngcontent-%COMP%]{width:60px;height:60px;border-radius:10px;display:flex;justify-content:center;align-items:center}.service__icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:32px;object-fit:contain}.service__title[_ngcontent-%COMP%]{margin-top:19px;margin-bottom:8px;word-spacing:3px;font-size:1.2rem}.service__description[_ngcontent-%COMP%]{line-height:24px;font-size:.97rem;color:#666}@media all and (max-width: 768px){.service[_ngcontent-%COMP%]{margin-top:-120px}.service__column[_ngcontent-%COMP%]{max-width:100%;flex-basis:100%}.service__card[_ngcontent-%COMP%]{margin-bottom:30px;display:flex;align-items:center}.service__icon[_ngcontent-%COMP%]{margin-right:15px}.service__title[_ngcontent-%COMP%]{font-size:1.5rem;line-height:30px;margin-top:0}.service__description[_ngcontent-%COMP%]{font-size:.8rem;line-height:20px}}',
							],
						})),
						e
					)
				})(),
				IN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵcmp = D({
							type: e,
							selectors: [['lp02-testimony']],
							decls: 52,
							vars: 0,
							consts: [
								[1, 'testimony'],
								[1, 'testimony__container', 'container'],
								[1, 'testimony__header'],
								[1, 'testimony__name'],
								[1, 'testimony__title'],
								[1, 'testimony__description'],
								[1, 'testimony__content'],
								[1, 'testimony__slide'],
								[1, 'testimony__slide__item'],
								[1, 'testimony__slide__content'],
								[1, 'testimony__slide__left'],
								[1, 'testimony__slide__image'],
								[1, 'testimony__slide__right'],
								[1, 'testimony__slide__top'],
								[1, 'testimony__slide__message'],
								[1, 'testimony__slide__bottom'],
								[1, 'testimony__slide__author'],
								[1, 'testimony__slide__job'],
							],
							template: function (n, o) {
								1 & n &&
									(g(0, 'section', 0)(1, 'div', 1)(2, 'div', 2)(3, 'span', 3),
									h(4, 'Testimony'),
									f(),
									g(5, 'h2', 4),
									h(6, 'Excepteur sint occaecat cupidatat'),
									f(),
									g(7, 'p', 5),
									h(
										8,
										' Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.'
									),
									_(9, 'br'),
									h(10, ' Voluptate exercitation incididunt aliquip deserunt. '),
									f()(),
									g(11, 'div', 6)(12, 'div', 7)(13, 'div', 8)(14, 'div', 9)(15, 'div', 10),
									_(16, 'div', 11),
									f(),
									g(17, 'div', 12)(18, 'div', 13)(19, 'p', 14),
									h(
										20,
										' "Your company is truly upstanding and is behind its product 100%. It\'s the perfect solution for our business. It has really helped our business." '
									),
									f()(),
									g(21, 'div', 15)(22, 'h3', 16),
									h(23, 'Howard Arlene'),
									f(),
									g(24, 'h3', 17),
									h(25, 'Finance Manager'),
									f()()()()(),
									g(26, 'div', 8)(27, 'div', 9)(28, 'div', 10),
									_(29, 'div', 11),
									f(),
									g(30, 'div', 12)(31, 'div', 13)(32, 'p', 14),
									h(
										33,
										' "Your company is truly upstanding and is behind its product 100%. It\'s the perfect solution for our business. It has really helped our business." '
									),
									f()(),
									g(34, 'div', 15)(35, 'h3', 16),
									h(36, 'Howard Arlene'),
									f(),
									g(37, 'h3', 17),
									h(38, 'Finance Manager'),
									f()()()()(),
									g(39, 'div', 8)(40, 'div', 9)(41, 'div', 10),
									_(42, 'div', 11),
									f(),
									g(43, 'div', 12)(44, 'div', 13)(45, 'p', 14),
									h(
										46,
										' "Your company is truly upstanding and is behind its product 100%. It\'s the perfect solution for our business. It has really helped our business." '
									),
									f()(),
									g(47, 'div', 15)(48, 'h3', 16),
									h(49, 'Howard Arlene'),
									f(),
									g(50, 'h3', 17),
									h(51, 'Finance Manager'),
									f()()()()()()()()())
							},
							styles: [
								'@import"https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap";*[_ngcontent-%COMP%]{margin:0;padding:0;text-decoration:none;list-style:none;box-sizing:border-box;font-family:Lato,sans-serif;color:#111}.fa[_ngcontent-%COMP%], .fas[_ngcontent-%COMP%], .fa-classic[_ngcontent-%COMP%], .fa-solid[_ngcontent-%COMP%], .far[_ngcontent-%COMP%], .fa-regular[_ngcontent-%COMP%], .fab[_ngcontent-%COMP%], .fa-brands[_ngcontent-%COMP%]{font-family:var(--fa-style-family, "Font Awesome 6 Free")!important;font-weight:var(--fa-style, 900)}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{font-family:Lato,sans-serif;color:#111}body[_ngcontent-%COMP%]{max-width:100vw;min-height:100vh;overflow-x:hidden;overflow-y:auto}section[_ngcontent-%COMP%]{width:100%;padding:72px 0;overflow-x:hidden}@media all and (max-width: 768px){section[_ngcontent-%COMP%]{padding:30px 0}}.container[_ngcontent-%COMP%]{max-width:830px;flex-basis:830px;padding:0 10px;margin:0 auto;box-sizing:content-box}.button[_ngcontent-%COMP%]{font-size:1rem;min-height:40px;padding:5px 15px;border-radius:10px;transition:.5s;border:1px solid transparent;display:inline-flex;justify-content:center;align-items:center;cursor:pointer;background-color:#ddd;color:#777}.button[_ngcontent-%COMP%]:hover{transition:.5s}.button.primary[_ngcontent-%COMP%]{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.primary[_ngcontent-%COMP%]:hover, .button.primary.outline[_ngcontent-%COMP%]{border:2px solid #ff7eb3;background-image:none;background-color:transparent;color:#ff7eb3}.button.primary.outline[_ngcontent-%COMP%]:hover{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.greyd.outline[_ngcontent-%COMP%]{background-color:transparent;color:#ddd}.testimony[_ngcontent-%COMP%]{padding-top:142px;text-align:center}.testimony__name[_ngcontent-%COMP%]{font-size:1.3rem;margin-bottom:19px;font-weight:700;display:block;color:#ff7eb3}.testimony__title[_ngcontent-%COMP%]{font-size:1.8rem;font-weight:900;letter-spacing:.3px}.testimony__description[_ngcontent-%COMP%]{margin-top:26px;font-size:.98rem;line-height:26px;color:#666}.testimony__content[_ngcontent-%COMP%]{margin-top:72px}.testimony__slide[_ngcontent-%COMP%]{margin-left:-9px;margin-right:-9px;display:inline-flex;animation:_ngcontent-%COMP%_infinityTestimonySlide 15s infinite alternate linear}.testimony__slide[_ngcontent-%COMP%]:hover{animation-play-state:paused}.testimony__slide__item[_ngcontent-%COMP%]{width:568px;padding:0 9px}.testimony__slide__content[_ngcontent-%COMP%]{width:100%;padding:35px;border-radius:15px;box-shadow:0 19px 33px #6f6d712b;display:flex}.testimony__slide__left[_ngcontent-%COMP%]{margin-right:28px}.testimony__slide__image[_ngcontent-%COMP%]{width:180px;height:180px;border-radius:10px;background-color:#ddd}.testimony__slide__image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover}.testimony__slide__right[_ngcontent-%COMP%]{width:calc(100% - 208px);text-align:left;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start}.testimony__slide__message[_ngcontent-%COMP%]{font-size:1rem;line-height:26px;color:#666}.testimony__slide__author[_ngcontent-%COMP%]{letter-spacing:-1px;margin-bottom:3px}.testimony__slide__job[_ngcontent-%COMP%]{font-size:.87rem;line-height:22px;color:#666}@keyframes _ngcontent-%COMP%_infinityTestimonySlide{0%{transform:translate(-1420px)}to{transform:translate(568px)}}@media all and (max-width: 1200px){@keyframes infinityTestimonySlide{0%{transform:translate(-1420px)}to{transform:translate(568px)}}}@media all and (max-width: 992px){@keyframes infinityTestimonySlide{0%{transform:translate(-1420px)}to{transform:translate(568px)}}}@media all and (max-width: 768px){.testimony[_ngcontent-%COMP%]{padding-top:30px;padding-bottom:30px}.testimony__title[_ngcontent-%COMP%]{font-size:1.5rem;line-height:30px}.testimony__description[_ngcontent-%COMP%]{font-size:.8rem;line-height:20px}.testimony__content[_ngcontent-%COMP%]{margin-top:30px}.testimony__slide__item[_ngcontent-%COMP%]{width:calc(100vw - 20px)}@keyframes infinityTestimonySlide{0%{transform:translate(-1420px)}to{transform:translate(568px)}}}@media all and (max-width: 576px){.testimony__slide__content[_ngcontent-%COMP%]{margin-top:30px;flex-direction:column}.testimony__slide__left[_ngcontent-%COMP%]{width:100%}.testimony__slide__image[_ngcontent-%COMP%]{width:100%;margin-bottom:15px}.testimony__slide__right[_ngcontent-%COMP%]{width:100%}.testimony__slide__top[_ngcontent-%COMP%]{margin-bottom:15px}@keyframes infinityTestimonySlide{0%{transform:translate(-250vw)}to{transform:translate(60vw)}}}',
							],
						})),
						e
					)
				})()
			const TN = [
				{
					path: 'landing-pages',
					component: HA,
					children: [
						{path: '01', component: bN},
						{
							path: '02',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-landing-page02']],
										decls: 11,
										vars: 0,
										consts: [
											[1, 'landing_page02'],
											[1, 'landing_page02__main'],
										],
										template: function (n, o) {
											1 & n &&
												(g(0, 'div', 0)(1, 'div', 1),
												_(2, 'lp02-nav')(3, 'lp02-header')(4, 'lp02-service')(
													5,
													'lp02-about-us'
												)(6, 'lp02-price')(7, 'lp02-testimony')(8, 'lp02-blog')(
													9,
													'lp02-partner'
												)(10, 'lp02-footer'),
												f()())
										},
										dependencies: [CN, xN, MN, wN, PN, ON, EN, SN, IN],
										styles: [
											'@import"https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap";*[_ngcontent-%COMP%]{margin:0;padding:0;text-decoration:none;list-style:none;box-sizing:border-box;font-family:Lato,sans-serif;color:#111}.fa[_ngcontent-%COMP%], .fas[_ngcontent-%COMP%], .fa-classic[_ngcontent-%COMP%], .fa-solid[_ngcontent-%COMP%], .far[_ngcontent-%COMP%], .fa-regular[_ngcontent-%COMP%], .fab[_ngcontent-%COMP%], .fa-brands[_ngcontent-%COMP%]{font-family:var(--fa-style-family, "Font Awesome 6 Free")!important;font-weight:var(--fa-style, 900)}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{font-family:Lato,sans-serif;color:#111}body[_ngcontent-%COMP%]{max-width:100vw;min-height:100vh;overflow-x:hidden;overflow-y:auto}section[_ngcontent-%COMP%]{width:100%;padding:72px 0;overflow-x:hidden}@media all and (max-width: 768px){section[_ngcontent-%COMP%]{padding:30px 0}}.container[_ngcontent-%COMP%]{max-width:830px;flex-basis:830px;padding:0 10px;margin:0 auto;box-sizing:content-box}.button[_ngcontent-%COMP%]{font-size:1rem;min-height:40px;padding:5px 15px;border-radius:10px;transition:.5s;border:1px solid transparent;display:inline-flex;justify-content:center;align-items:center;cursor:pointer;background-color:#ddd;color:#777}.button[_ngcontent-%COMP%]:hover{transition:.5s}.button.primary[_ngcontent-%COMP%]{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.primary[_ngcontent-%COMP%]:hover, .button.primary.outline[_ngcontent-%COMP%]{border:2px solid #ff7eb3;background-image:none;background-color:transparent;color:#ff7eb3}.button.primary.outline[_ngcontent-%COMP%]:hover{background-image:linear-gradient(145deg,#ff7eb3,#ff758c);color:#fff}.button.greyd.outline[_ngcontent-%COMP%]{background-color:transparent;color:#ddd}.landing_page02__main[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-inline:auto;width:min(100%,1600px);box-shadow:0 0 100px -75px var(--grey0)}',
										],
									})),
									e
								)
							})(),
						},
						{
							path: '03',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-landing-page03']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'landing-page03 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '04',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-landing-page04']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'landing-page04 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '05',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-landing-page05']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'landing-page05 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '06',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-landing-page06']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'landing-page06 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '07',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-landing-page07']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'landing-page07 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '08',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-landing-page08']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'landing-page08 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '09',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-landing-page09']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'landing-page09 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '10',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-landing-page10']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'landing-page10 works!'), f())
										},
									})),
									e
								)
							})(),
						},
					],
				},
			]
			let kN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [Dn.forChild(TN), Dn]})),
						e
					)
				})(),
				RN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [nt]})),
						e
					)
				})(),
				AN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [nt]})),
						e
					)
				})(),
				NN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [nt]})),
						e
					)
				})(),
				LN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [nt]})),
						e
					)
				})(),
				FN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [nt]})),
						e
					)
				})(),
				jN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [nt]})),
						e
					)
				})(),
				zN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [nt]})),
						e
					)
				})(),
				$N = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [nt]})),
						e
					)
				})(),
				VN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [nt]})),
						e
					)
				})(),
				BN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [nt]})),
						e
					)
				})(),
				UN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [nt, RN, AN, NN, LN, FN, jN, zN, $N, VN, BN, kN]})),
						e
					)
				})()
			const HN = [
				{
					path: 'projects',
					component: (() => {
						class e {}
						return (
							(e.ɵfac = function (n) {
								return new (n || e)()
							}),
							(e.ɵcmp = D({
								type: e,
								selectors: [['app-projects']],
								decls: 1,
								vars: 0,
								template: function (n, o) {
									1 & n && _(0, 'router-outlet')
								},
								dependencies: [Jo],
							})),
							e
						)
					})(),
					children: [
						{
							path: '01',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-project01']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'project01 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '02',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-project02']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'project02 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '03',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-project03']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'project03 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '04',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-project04']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'project04 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '05',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-project05']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'project05 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '06',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-project06']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'project06 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '07',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-project07']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'project07 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '08',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-project08']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'project08 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '09',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-project09']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'project09 works!'), f())
										},
									})),
									e
								)
							})(),
						},
						{
							path: '10',
							component: (() => {
								class e {}
								return (
									(e.ɵfac = function (n) {
										return new (n || e)()
									}),
									(e.ɵcmp = D({
										type: e,
										selectors: [['app-project10']],
										decls: 2,
										vars: 0,
										template: function (n, o) {
											1 & n && (g(0, 'p'), h(1, 'project10 works!'), f())
										},
									})),
									e
								)
							})(),
						},
					],
				},
			]
			let qN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [Dn.forChild(HN), Dn]})),
						e
					)
				})(),
				GN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e})),
						(e.ɵinj = ge({imports: [nt, qN]})),
						e
					)
				})(),
				WN = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)()
						}),
						(e.ɵmod = pe({type: e, bootstrap: [DR]})),
						(e.ɵinj = ge({imports: [zT, OR, UA, UN, GN]})),
						e
					)
				})()
			FT()
				.bootstrapModule(WN)
				.catch((e) => console.error(e))
		},
	},
	(re) => {
		re((re.s = 751))
	},
])
