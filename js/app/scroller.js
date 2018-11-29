/*
* @Author: lenovo
* @Date:   2018-11-26 16:29:22
* @Last Modified by:   lenovo
* @Last Modified time: 2018-11-26 17:23:50
*/
!function() {
	  function e(e, t, i) {
	      var n, a, r = document.querySelector('meta[name="viewport"]'), o = document.documentElement.clientWidth;
	      switch (e) {
	      case "fixed":
	          n = t,
	          a = o / t;
	          break;
	      case "rem":
	          var p = window.devicePixelRatio || 1;
	          n = o * p,
	          a = 1 / p,
	          document.documentElement.style.fontSize = 100 * (o * p / t) + "px"
	      }
	      r.setAttribute("content", "width=" + n + ",initial-scale=" + a + ",maximum-scale=" + a + ",minimum-scale=" + a),
	      i && window.addEventListener("DOMContentLoaded", function() {
	          document.body.style.fontSize = 50 / a + "px"
	      })
	  }
	  e("fixed", 750)
}();
(function(e) {
    var t = Date.now || function() {
        return +new Date
    }
      , i = 60
      , n = 1e3
      , a = {}
      , r = 1;
    e.core ? core.effect || (core.effect = {}) : e.core = {
        effect: {}
    },
    core.effect.Animate = {
        requestAnimationFrame: function() {
            var t = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame
              , i = !!t;
            if (t && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(t.toString()) && (i = !1),
            i)
                return function(e, i) {
                    t(e, i)
                }
                ;
            var n = 60
              , a = {}
              , r = 0
              , o = 1
              , p = null
              , s = +new Date;
            return function(e, t) {
                var i = o++;
                return a[i] = e,
                r++,
                null === p && (p = setInterval(function() {
                    var e = +new Date
                      , t = a;
                    a = {},
                    r = 0;
                    for (var i in t)
                        t.hasOwnProperty(i) && (t[i](e),
                        s = e);
                    e - s > 2500 && (clearInterval(p),
                    p = null)
                }, 1e3 / n)),
                i
            }
        }(),
        stop: function(e) {
            var t = null != a[e];
            return t && (a[e] = null),
            t
        },
        isRunning: function(e) {
            return null != a[e]
        },
        start: function(e, o, p, s, l, c) {
            var h = t()
              , u = h
              , d = 0
              , m = 0
              , f = r++;
            if (c || (c = document.body),
            f % 20 === 0) {
                var _ = {};
                for (var g in a)
                    _[g] = !0;
                a = _
            }
            var y = function(r) {
                var _ = r !== !0
                  , g = t();
                if (!a[f] || o && !o(f))
                    return a[f] = null,
                    void (p && p(i - m / ((g - h) / n), f, !1));
                if (_)
                    for (var v = Math.round((g - u) / (n / i)) - 1, x = 0; x < Math.min(v, 4); x++)
                        y(!0),
                        m++;
                s && (d = (g - h) / s,
                d > 1 && (d = 1));
                var w = l ? l(d) : d;
                e(w, g, _) !== !1 && 1 !== d || !_ ? _ && (u = g,
                core.effect.Animate.requestAnimationFrame(y, c)) : (a[f] = null,
                p && p(i - m / ((g - h) / n), f, 1 === d || null == s))
            };
            return a[f] = !0,
            core.effect.Animate.requestAnimationFrame(y, c),
            f
        }
    }
})(this);//animate
var Scroller;
!function() {
    var e = function() {};
    Scroller = function(t, i) {
        this.__callback = t,
        this.options = {
            scrollingX: !0,
            scrollingY: !0,
            animating: !0,
            animationDuration: 250,
            bouncing: !0,
            locking: !0,
            paging: !1,
            snapping: !1,
            zooming: !1,
            minZoom: .5,
            maxZoom: 3,
            speedMultiplier: 1,
            scrollingComplete: e,
            penetrationDeceleration: .03,
            penetrationAcceleration: .08
        };
        for (var n in i)
            this.options[n] = i[n]
    }
    ;
    var t = function(e) {
        return Math.pow(e - 1, 3) + 1
    }
      , i = function(e) {
        return (e /= .5) < 1 ? .5 * Math.pow(e, 3) : .5 * (Math.pow(e - 2, 3) + 2)
    }
      , n = {
        __isSingleTouch: !1,
        __isTracking: !1,
        __didDecelerationComplete: !1,
        __isGesturing: !1,
        __isDragging: !1,
        __isDecelerating: !1,
        __isAnimating: !1,
        __clientLeft: 0,
        __clientTop: 0,
        __clientWidth: 0,
        __clientHeight: 0,
        __contentWidth: 0,
        __contentHeight: 0,
        __snapWidth: 100,
        __snapHeight: 100,
        __refreshHeight: null,
        __refreshActive: !1,
        __refreshActivate: null,
        __refreshDeactivate: null,
        __refreshStart: null,
        __zoomLevel: 1,
        __scrollLeft: 0,
        __scrollTop: 0,
        __maxScrollLeft: 0,
        __maxScrollTop: 0,
        __scheduledLeft: 0,
        __scheduledTop: 0,
        __scheduledZoom: 0,
        __lastTouchLeft: null,
        __lastTouchTop: null,
        __lastTouchMove: null,
        __positions: null,
        __minDecelerationScrollLeft: null,
        __minDecelerationScrollTop: null,
        __maxDecelerationScrollLeft: null,
        __maxDecelerationScrollTop: null,
        __decelerationVelocityX: null,
        __decelerationVelocityY: null,
        setDimensions: function(e, t, i, n) {
            var a = this;
            e === +e && (a.__clientWidth = e),
            t === +t && (a.__clientHeight = t),
            i === +i && (a.__contentWidth = i),
            n === +n && (a.__contentHeight = n),
            a.__computeScrollMax(),
            a.scrollTo(a.__scrollLeft, a.__scrollTop, !0)
        },
        setPosition: function(e, t) {
            var i = this;
            i.__clientLeft = e || 0,
            i.__clientTop = t || 0
        },
        setSnapSize: function(e, t) {
            var i = this;
            i.__snapWidth = e,
            i.__snapHeight = t
        },
        activatePullToRefresh: function(e, t, i, n) {
            var a = this;
            a.__refreshHeight = e,
            a.__refreshActivate = t,
            a.__refreshDeactivate = i,
            a.__refreshStart = n
        },
        triggerPullToRefresh: function() {
            this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, !0),
            this.__refreshStart && this.__refreshStart()
        },
        finishPullToRefresh: function() {
            var e = this;
            e.__refreshActive = !1,
            e.__refreshDeactivate && e.__refreshDeactivate(),
            e.scrollTo(e.__scrollLeft, e.__scrollTop, !0)
        },
        getValues: function() {
            var e = this;
            return {
                left: e.__scrollLeft,
                top: e.__scrollTop,
                zoom: e.__zoomLevel
            }
        },
        getScrollMax: function() {
            var e = this;
            return {
                left: e.__maxScrollLeft,
                top: e.__maxScrollTop
            }
        },
        zoomTo: function(e, t, i, n, a) {
            var r = this;
            if (!r.options.zooming)
                throw new Error("Zooming is not enabled!");
            a && (r.__zoomComplete = a),
            r.__isDecelerating && (core.effect.Animate.stop(r.__isDecelerating),
            r.__isDecelerating = !1);
            var o = r.__zoomLevel;
            null == i && (i = r.__clientWidth / 2),
            null == n && (n = r.__clientHeight / 2),
            e = Math.max(Math.min(e, r.options.maxZoom), r.options.minZoom),
            r.__computeScrollMax(e);
            var p = (i + r.__scrollLeft) * e / o - i
              , s = (n + r.__scrollTop) * e / o - n;
            p > r.__maxScrollLeft ? p = r.__maxScrollLeft : p < 0 && (p = 0),
            s > r.__maxScrollTop ? s = r.__maxScrollTop : s < 0 && (s = 0),
            r.__publish(p, s, e, t)
        },
        zoomBy: function(e, t, i, n, a) {
            var r = this;
            r.zoomTo(r.__zoomLevel * e, t, i, n, a)
        },
        scrollTo: function(e, t, i, n) {
            var a = this;
            if (a.__isDecelerating && (core.effect.Animate.stop(a.__isDecelerating),
            a.__isDecelerating = !1),
            null != n && n !== a.__zoomLevel) {
                if (!a.options.zooming)
                    throw new Error("Zooming is not enabled!");
                e *= n,
                t *= n,
                a.__computeScrollMax(n)
            } else
                n = a.__zoomLevel;
            a.options.scrollingX ? a.options.paging ? e = Math.round(e / a.__clientWidth) * a.__clientWidth : a.options.snapping && (e = Math.round(e / a.__snapWidth) * a.__snapWidth) : e = a.__scrollLeft,
            a.options.scrollingY ? a.options.paging ? t = Math.round(t / a.__clientHeight) * a.__clientHeight : a.options.snapping && (t = Math.round(t / a.__snapHeight) * a.__snapHeight) : t = a.__scrollTop,
            e = Math.max(Math.min(a.__maxScrollLeft, e), 0),
            t = Math.max(Math.min(a.__maxScrollTop, t), 0),
            e === a.__scrollLeft && t === a.__scrollTop && (i = !1),
            a.__isTracking || a.__publish(e, t, n, i)
        },
        scrollBy: function(e, t, i) {
            var n = this
              , a = n.__isAnimating ? n.__scheduledLeft : n.__scrollLeft
              , r = n.__isAnimating ? n.__scheduledTop : n.__scrollTop;
            n.scrollTo(a + (e || 0), r + (t || 0), i)
        },
        doMouseZoom: function(e, t, i, n) {
            var a = this
              , r = e > 0 ? .97 : 1.03;
            return a.zoomTo(a.__zoomLevel * r, !1, i - a.__clientLeft, n - a.__clientTop)
        },
        doTouchStart: function(e, t) {
            if (null == e.length)
                throw new Error("Invalid touch list: " + e);
            if (t instanceof Date && (t = t.valueOf()),
            "number" != typeof t)
                throw new Error("Invalid timestamp value: " + t);
            var i = this;
            i.__interruptedAnimation = !0,
            i.__isDecelerating && (core.effect.Animate.stop(i.__isDecelerating),
            i.__isDecelerating = !1,
            i.__interruptedAnimation = !0),
            i.__isAnimating && (core.effect.Animate.stop(i.__isAnimating),
            i.__isAnimating = !1,
            i.__interruptedAnimation = !0);
            var n, a, r = 1 === e.length;
            r ? (n = e[0].pageX,
            a = e[0].pageY) : (n = Math.abs(e[0].pageX + e[1].pageX) / 2,
            a = Math.abs(e[0].pageY + e[1].pageY) / 2),
            i.__initialTouchLeft = n,
            i.__initialTouchTop = a,
            i.__zoomLevelStart = i.__zoomLevel,
            i.__lastTouchLeft = n,
            i.__lastTouchTop = a,
            i.__lastTouchMove = t,
            i.__lastScale = 1,
            i.__enableScrollX = !r && i.options.scrollingX,
            i.__enableScrollY = !r && i.options.scrollingY,
            i.__isTracking = !0,
            i.__didDecelerationComplete = !1,
            i.__isDragging = !r,
            i.__isSingleTouch = r,
            i.__positions = []
        },
        doTouchMove: function(e, t, i) {
            if (null == e.length)
                throw new Error("Invalid touch list: " + e);
            if (t instanceof Date && (t = t.valueOf()),
            "number" != typeof t)
                throw new Error("Invalid timestamp value: " + t);
            var n = this;
            if (n.__isTracking) {
                var a, r;
                2 === e.length ? (a = Math.abs(e[0].pageX + e[1].pageX) / 2,
                r = Math.abs(e[0].pageY + e[1].pageY) / 2) : (a = e[0].pageX,
                r = e[0].pageY);
                var o = n.__positions;
                if (n.__isDragging) {
                    var p = a - n.__lastTouchLeft
                      , s = r - n.__lastTouchTop
                      , l = n.__scrollLeft
                      , c = n.__scrollTop
                      , h = n.__zoomLevel;
                    if (null != i && n.options.zooming) {
                        var u = h;
                        if (h = h / n.__lastScale * i,
                        h = Math.max(Math.min(h, n.options.maxZoom), n.options.minZoom),
                        u !== h) {
                            var d = a - n.__clientLeft
                              , m = r - n.__clientTop;
                            l = (d + l) * h / u - d,
                            c = (m + c) * h / u - m,
                            n.__computeScrollMax(h)
                        }
                    }
                    if (n.__enableScrollX) {
                        l -= p * this.options.speedMultiplier;
                        var f = n.__maxScrollLeft;
                        (l > f || l < 0) && (n.options.bouncing ? l += p / 2 * this.options.speedMultiplier : l = l > f ? f : 0)
                    }
                    if (n.__enableScrollY) {
                        c -= s * this.options.speedMultiplier;
                        var _ = n.__maxScrollTop;
                        (c > _ || c < 0) && (n.options.bouncing ? (c += s / 2 * this.options.speedMultiplier,
                        n.__enableScrollX || null == n.__refreshHeight || (!n.__refreshActive && c <= -n.__refreshHeight ? (n.__refreshActive = !0,
                        n.__refreshActivate && n.__refreshActivate()) : n.__refreshActive && c > -n.__refreshHeight && (n.__refreshActive = !1,
                        n.__refreshDeactivate && n.__refreshDeactivate()))) : c = c > _ ? _ : 0)
                    }
                    o.length > 60 && o.splice(0, 30),
                    o.push(l, c, t),
                    n.__publish(l, c, h)
                } else {
                    var g = n.options.locking ? 3 : 0
                      , y = 5
                      , v = Math.abs(a - n.__initialTouchLeft)
                      , x = Math.abs(r - n.__initialTouchTop);
                    n.__enableScrollX = n.options.scrollingX && v >= g,
                    n.__enableScrollY = n.options.scrollingY && x >= g,
                    o.push(n.__scrollLeft, n.__scrollTop, t),
                    n.__isDragging = (n.__enableScrollX || n.__enableScrollY) && (v >= y || x >= y),
                    n.__isDragging && (n.__interruptedAnimation = !1)
                }
                n.__lastTouchLeft = a,
                n.__lastTouchTop = r,
                n.__lastTouchMove = t,
                n.__lastScale = i
            }
        },
        doTouchEnd: function(e) {
            if (e instanceof Date && (e = e.valueOf()),
            "number" != typeof e)
                throw new Error("Invalid timestamp value: " + e);
            var t = this;
            if (t.__isTracking) {
                if (t.__isTracking = !1,
                t.__isDragging)
                    if (t.__isDragging = !1,
                    t.__isSingleTouch && t.options.animating && e - t.__lastTouchMove <= 100) {
                        for (var i = t.__positions, n = i.length - 1, a = n, r = n; r > 0 && i[r] > t.__lastTouchMove - 100; r -= 3)
                            a = r;
                        if (a !== n) {
                            var o = i[n] - i[a]
                              , p = t.__scrollLeft - i[a - 2]
                              , s = t.__scrollTop - i[a - 1];
                            t.__decelerationVelocityX = p / o * (1e3 / 60),
                            t.__decelerationVelocityY = s / o * (1e3 / 60);
                            var l = t.options.paging || t.options.snapping ? 4 : 1;
                            Math.abs(t.__decelerationVelocityX) > l || Math.abs(t.__decelerationVelocityY) > l ? t.__refreshActive || t.__startDeceleration(e) : t.options.scrollingComplete()
                        } else
                            t.options.scrollingComplete()
                    } else
                        e - t.__lastTouchMove > 100 && t.options.scrollingComplete();
                t.__isDecelerating || (t.__refreshActive && t.__refreshStart ? (t.__publish(t.__scrollLeft, -t.__refreshHeight, t.__zoomLevel, !0),
                t.__refreshStart && t.__refreshStart()) : ((t.__interruptedAnimation || t.__isDragging) && t.options.scrollingComplete(),
                t.scrollTo(t.__scrollLeft, t.__scrollTop, !0, t.__zoomLevel),
                t.__refreshActive && (t.__refreshActive = !1,
                t.__refreshDeactivate && t.__refreshDeactivate()))),
                t.__positions.length = 0
            }
        },
        __publish: function(e, n, a, r) {
            var o = this
              , p = o.__isAnimating;
            if (p && (core.effect.Animate.stop(p),
            o.__isAnimating = !1),
            r && o.options.animating) {
                o.__scheduledLeft = e,
                o.__scheduledTop = n,
                o.__scheduledZoom = a;
                var s = o.__scrollLeft
                  , l = o.__scrollTop
                  , c = o.__zoomLevel
                  , h = e - s
                  , u = n - l
                  , d = a - c
                  , m = function(e, t, i) {
                    i && (o.__scrollLeft = s + h * e,
                    o.__scrollTop = l + u * e,
                    o.__zoomLevel = c + d * e,
                    o.__callback && o.__callback(o.__scrollLeft, o.__scrollTop, o.__zoomLevel))
                }
                  , f = function(e) {
                    return o.__isAnimating === e
                }
                  , _ = function(e, t, i) {
                    t === o.__isAnimating && (o.__isAnimating = !1),
                    (o.__didDecelerationComplete || i) && o.options.scrollingComplete(),
                    o.options.zooming && (o.__computeScrollMax(),
                    o.__zoomComplete && (o.__zoomComplete(),
                    o.__zoomComplete = null))
                };
                o.__isAnimating = core.effect.Animate.start(m, f, _, o.options.animationDuration, p ? t : i)
            } else
                o.__scheduledLeft = o.__scrollLeft = e,
                o.__scheduledTop = o.__scrollTop = n,
                o.__scheduledZoom = o.__zoomLevel = a,
                o.__callback && o.__callback(e, n, a),
                o.options.zooming && (o.__computeScrollMax(),
                o.__zoomComplete && (o.__zoomComplete(),
                o.__zoomComplete = null))
        },
        __computeScrollMax: function(e) {
            var t = this;
            null == e && (e = t.__zoomLevel),
            t.__maxScrollLeft = Math.max(t.__contentWidth * e - t.__clientWidth, 0),
            t.__maxScrollTop = Math.max(t.__contentHeight * e - t.__clientHeight, 0)
        },
        __startDeceleration: function(e) {
            var t = this;
            if (t.options.paging) {
                var i = Math.max(Math.min(t.__scrollLeft, t.__maxScrollLeft), 0)
                  , n = Math.max(Math.min(t.__scrollTop, t.__maxScrollTop), 0)
                  , a = t.__clientWidth
                  , r = t.__clientHeight;
                t.__minDecelerationScrollLeft = Math.floor(i / a) * a,
                t.__minDecelerationScrollTop = Math.floor(n / r) * r,
                t.__maxDecelerationScrollLeft = Math.ceil(i / a) * a,
                t.__maxDecelerationScrollTop = Math.ceil(n / r) * r
            } else
                t.__minDecelerationScrollLeft = 0,
                t.__minDecelerationScrollTop = 0,
                t.__maxDecelerationScrollLeft = t.__maxScrollLeft,
                t.__maxDecelerationScrollTop = t.__maxScrollTop;
            var o = function(e, i, n) {
                t.__stepThroughDeceleration(n)
            }
              , p = t.options.snapping ? 4 : .001
              , s = function() {
                var e = Math.abs(t.__decelerationVelocityX) >= p || Math.abs(t.__decelerationVelocityY) >= p;
                return e || (t.__didDecelerationComplete = !0),
                e
            }
              , l = function(e, i, n) {
                t.__isDecelerating = !1,
                t.__didDecelerationComplete && t.options.scrollingComplete(),
                t.scrollTo(t.__scrollLeft, t.__scrollTop, t.options.snapping)
            };
            t.__isDecelerating = core.effect.Animate.start(o, s, l)
        },
        __stepThroughDeceleration: function(e) {
            var t = this
              , i = t.__scrollLeft + t.__decelerationVelocityX
              , n = t.__scrollTop + t.__decelerationVelocityY;
            if (!t.options.bouncing) {
                var a = Math.max(Math.min(t.__maxDecelerationScrollLeft, i), t.__minDecelerationScrollLeft);
                a !== i && (i = a,
                t.__decelerationVelocityX = 0);
                var r = Math.max(Math.min(t.__maxDecelerationScrollTop, n), t.__minDecelerationScrollTop);
                r !== n && (n = r,
                t.__decelerationVelocityY = 0)
            }
            if (e ? t.__publish(i, n, t.__zoomLevel) : (t.__scrollLeft = i,
            t.__scrollTop = n),
            !t.options.paging) {
                var o = .95;
                t.__decelerationVelocityX *= o,
                t.__decelerationVelocityY *= o
            }
            if (t.options.bouncing) {
                var p = 0
                  , s = 0
                  , l = t.options.penetrationDeceleration
                  , c = t.options.penetrationAcceleration;
                i < t.__minDecelerationScrollLeft ? p = t.__minDecelerationScrollLeft - i : i > t.__maxDecelerationScrollLeft && (p = t.__maxDecelerationScrollLeft - i),
                n < t.__minDecelerationScrollTop ? s = t.__minDecelerationScrollTop - n : n > t.__maxDecelerationScrollTop && (s = t.__maxDecelerationScrollTop - n),
                0 !== p && (p * t.__decelerationVelocityX <= 0 ? t.__decelerationVelocityX += p * l : t.__decelerationVelocityX = p * c),
                0 !== s && (s * t.__decelerationVelocityY <= 0 ? t.__decelerationVelocityY += s * l : t.__decelerationVelocityY = s * c)
            }
        }
    };
    for (var a in n)
        Scroller.prototype[a] = n[a]
}();