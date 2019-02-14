if (self.CavalryLogger) {
    CavalryLogger.start_js(["twORp"]);
}

__d("BlueBar", ["csx", "CSS", "DOMQuery", "Style", "ge"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h = document,
        i = {};

    function j(a) {
        return b("DOMQuery").scry(h, a)[0]
    }

    function k(a, b) {
        return i[a] ? i[a] : i[a] = j(b)
    }

    function a() {
        h = b("ge")("blueBarDOMInspector") || document, i = {}
    }
    var l = {
        hasFixedBlueBar: function() {
            var a = this.getMaybeFixedRoot();
            return !a ? !1 : b("CSS").matchesSelector(a, "._5rmj") || b("Style").isFixed(a)
        },
        getBar: function() {
            return k("bar", "div._1s4v")
        },
        getNavRoot: function() {
            return k("navRoot", "div._cx4") || l.getBar()
        },
        getMaybeFixedRoot: function() {
            return k("maybeFixedRoot", "div._26aw")
        },
        getLoggedOutRoot: function() {
            return k("maybeFixedRootLoggedOut", "div._1pmx")
        },
        getNewLoggedOutRoot: function() {
            return k("maybeFixedRootLogin", "div._53jh")
        }
    };
    a();
    e.exports = l
}), null);
__d("BasicVector", [], (function(a, b, c, d, e, f) {
    __p && __p();

    function g(a, b) {
        "use strict";
        this.x = a, this.y = b
    }
    g.prototype.derive = function(a, b) {
        "use strict";
        return new g(a, b)
    };
    g.prototype.toString = function() {
        "use strict";
        return "(" + this.x + ", " + this.y + ")"
    };
    g.prototype.add = function(a, b) {
        "use strict";
        b === void 0 && (b = a.y, a = a.x);
        a = parseFloat(a);
        b = parseFloat(b);
        return this.derive(this.x + a, this.y + b)
    };
    g.prototype.mul = function(a, b) {
        "use strict";
        b === void 0 && (b = a);
        return this.derive(this.x * a, this.y * b)
    };
    g.prototype.div = function(a, b) {
        "use strict";
        b === void 0 && (b = a);
        return this.derive(this.x * 1 / a, this.y * 1 / b)
    };
    g.prototype.sub = function(a, b) {
        "use strict";
        if (arguments.length === 1) return this.add(a.mul(-1));
        else return this.add(-a, -b)
    };
    g.prototype.distanceTo = function(a) {
        "use strict";
        return this.sub(a).magnitude()
    };
    g.prototype.magnitude = function() {
        "use strict";
        return Math.sqrt(this.x * this.x + this.y * this.y)
    };
    g.prototype.rotate = function(a) {
        "use strict";
        return this.derive(this.x * Math.cos(a) - this.y * Math.sin(a), this.x * Math.sin(a) + this.y * Math.cos(a))
    };
    e.exports = g
}), null);
__d("getUnboundedScrollPosition", ["Scroll"], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return a === window ? {
            x: window.pageXOffset || b("Scroll").getLeft(document.documentElement),
            y: window.pageYOffset || b("Scroll").getTop(document.documentElement)
        } : {
            x: b("Scroll").getLeft(a),
            y: b("Scroll").getTop(a)
        }
    }
    e.exports = a
}), null);
__d("DOMVector", ["BasicVector", "getDocumentScrollElement", "getElementPosition", "getUnboundedScrollPosition", "getViewportDimensions"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g;
    a = babelHelpers.inherits(h, b("BasicVector"));
    g = a && a.prototype;

    function h(a, b, c) {
        "use strict";
        g.constructor.call(this, a, b), this.domain = c || "pure"
    }
    h.prototype.derive = function(a, b, c) {
        "use strict";
        return new h(a, b, c || this.domain)
    };
    h.prototype.add = function(a, b) {
        "use strict";
        a instanceof h && a.getDomain() !== "pure" && (a = a.convertTo(this.domain));
        return g.add.call(this, a, b)
    };
    h.prototype.convertTo = function(a) {
        "use strict";
        __p && __p();
        if (a != "pure" && a != "viewport" && a != "document") return this.derive(0, 0);
        if (a == this.domain) return this.derive(this.x, this.y, this.domain);
        if (a == "pure") return this.derive(this.x, this.y);
        if (this.domain == "pure") return this.derive(0, 0);
        var b = h.getScrollPosition("document"),
            c = this.x,
            d = this.y;
        this.domain == "document" ? (c -= b.x, d -= b.y) : (c += b.x, d += b.y);
        return this.derive(c, d, a)
    };
    h.prototype.getDomain = function() {
        "use strict";
        return this.domain
    };
    h.from = function(a, b, c) {
        "use strict";
        return new h(a, b, c)
    };
    h.getScrollPosition = function(a) {
        "use strict";
        a = a || "document";
        var c = b("getUnboundedScrollPosition")(window);
        return this.from(c.x, c.y, "document").convertTo(a)
    };
    h.getElementPosition = function(a, c) {
        "use strict";
        c = c || "document";
        a = b("getElementPosition")(a);
        return this.from(a.x, a.y, "viewport").convertTo(c)
    };
    h.getElementDimensions = function(a) {
        "use strict";
        return this.from(a.offsetWidth || 0, a.offsetHeight || 0)
    };
    h.getViewportDimensions = function() {
        "use strict";
        var a = b("getViewportDimensions")();
        return this.from(a.width, a.height, "viewport")
    };
    h.getViewportWithoutScrollbarDimensions = function() {
        "use strict";
        var a = b("getViewportDimensions").withoutScrollbars();
        return this.from(a.width, a.height, "viewport")
    };
    h.getDocumentDimensions = function(a) {
        "use strict";
        a = b("getDocumentScrollElement")(a);
        return this.from(a.scrollWidth, a.scrollHeight, "document")
    };
    e.exports = h
}), null);
__d("Vector", ["DOMVector", "Event", "Scroll"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g;
    a = babelHelpers.inherits(h, b("DOMVector"));
    g = a && a.prototype;

    function h(a, b, c) {
        "use strict";
        g.constructor.call(this, parseFloat(a), parseFloat(b), c)
    }
    h.prototype.derive = function(a, b, c) {
        "use strict";
        return new h(a, b, c || this.domain)
    };
    h.prototype.setElementPosition = function(a) {
        "use strict";
        var b = this.convertTo("document");
        a.style.left = parseInt(b.x, 10) + "px";
        a.style.top = parseInt(b.y, 10) + "px";
        return this
    };
    h.prototype.setElementDimensions = function(a) {
        "use strict";
        return this.setElementWidth(a).setElementHeight(a)
    };
    h.prototype.setElementWidth = function(a) {
        "use strict";
        a.style.width = parseInt(this.x, 10) + "px";
        return this
    };
    h.prototype.setElementHeight = function(a) {
        "use strict";
        a.style.height = parseInt(this.y, 10) + "px";
        return this
    };
    h.prototype.scrollElementBy = function(a) {
        "use strict";
        a == document.body ? window.scrollBy(this.x, this.y) : (b("Scroll").setLeft(a, b("Scroll").getLeft(a) + this.x), b("Scroll").setTop(a, b("Scroll").getTop(a) + this.y));
        return this
    };
    h.from = function(a, b, c) {
        "use strict";
        return new h(a, b, c)
    };
    h.getEventPosition = function(a, c) {
        "use strict";
        c = c || "document";
        a = b("Event").getPosition(a);
        a = this.from(a.x, a.y, "document");
        return a.convertTo(c)
    };
    h.getTouchEventPosition = function(a, b) {
        b === void 0 && (b = "document");
        a = a.touches[0];
        a = this.from(a.pageX, a.pageY, "document");
        return a.convertTo(b)
    };
    h.deserialize = function(a) {
        "use strict";
        a = a.split(",");
        return this.from(a[0], a[1])
    };
    e.exports = h
}), null);
__d("ViewportBounds", ["Arbiter", "ArbiterMixin", "BlueBar", "PageEvents", "Vector", "emptyFunction", "removeFromArray"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = {
        top: [],
        right: [],
        bottom: [],
        left: []
    };

    function a(a) {
        return function() {
            return g[a].reduce(function(a, b) {
                return Math.max(a, b.getSize())
            }, 0)
        }
    }

    function c(a, b) {
        return function(c) {
            return new h(a, c, b)
        }
    }

    function h(a, c, d) {
        d === void 0 && (d = !1), this.getSide = b("emptyFunction").thatReturns(a), this.getSize = function() {
            return typeof c === "function" ? c() : c
        }, this.isPersistent = b("emptyFunction").thatReturns(d), g[a].push(this), i.inform("change")
    }
    h.prototype.remove = function() {
        "use strict";
        b("removeFromArray")(g[this.getSide()], this), i.inform("change")
    };
    b("Arbiter").subscribe(b("PageEvents").AJAXPIPE_ONUNLOAD, function() {
        ["top", "right", "bottom", "left"].forEach(function(a) {
            a = g[a];
            for (var b = a.length - 1; b >= 0; b--) {
                var c = a[b];
                c.isPersistent() || c.remove()
            }
        })
    });
    var i = babelHelpers["extends"]({}, b("ArbiterMixin"), {
        getTop: a("top"),
        getRight: a("right"),
        getBottom: a("bottom"),
        getLeft: a("left"),
        getElementPosition: function(a) {
            a = b("Vector").getElementPosition(a);
            a.y -= i.getTop();
            return a
        },
        addTop: c("top"),
        addRight: c("right"),
        addBottom: c("bottom"),
        addLeft: c("left"),
        addPersistentTop: c("top", !0),
        addPersistentRight: c("right", !0),
        addPersistentBottom: c("bottom", !0),
        addPersistentLeft: c("left", !0)
    });
    i.addPersistentTop(function() {
        if (b("BlueBar").hasFixedBlueBar()) {
            var a = b("BlueBar").getMaybeFixedRoot();
            return a ? a.offsetHeight : 0
        }
        return 0
    });
    e.exports = i
}), null);
__d("TabbableElements", ["Style"], (function(a, b, c, d, e, f) {
    __p && __p();

    function g(a) {
        __p && __p();
        if (a.tabIndex < 0) return !1;
        if (a.tabIndex > 0 || a.tabIndex === 0 && a.getAttribute("tabIndex") !== null) return !0;
        var b = a;
        switch (a.tagName) {
            case "A":
                a = b;
                return !!a.href && a.rel != "ignore";
            case "INPUT":
                a = b;
                return a.type != "hidden" && a.type != "file" && !a.disabled;
            case "BUTTON":
            case "SELECT":
            case "TEXTAREA":
                a = b;
                return !a.disabled
        }
        return !1
    }

    function h(a) {
        a = a;
        while (a && a !== document && b("Style").get(a, "visibility") != "hidden" && b("Style").get(a, "display") != "none") a = a.parentNode;
        return a === document
    }
    var i = {
        find: function(a) {
            return Array.from(a.getElementsByTagName("*")).filter(i.isTabbable)
        },
        findFirst: function(a) {
            return Array.from(a.getElementsByTagName("*")).find(i.isTabbable)
        },
        isTabbable: function(a) {
            return g(a) && h(a)
        },
        isVisible: function(a) {
            return h(a)
        }
    };
    e.exports = i
}), null);
__d("fbjs/lib/ExecutionEnvironment", ["ExecutionEnvironment"], (function(a, b, c, d, e, f) {
    "use strict";
    e.exports = b("ExecutionEnvironment")
}), null);
__d("cancelAnimationFramePolyfill", [], (function(a, b, c, d, e, f) {
    b = a.__fbNativeCancelAnimationFrame || a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || a.oCancelAnimationFrame || a.msCancelAnimationFrame || a.clearTimeout;
    e.exports = b
}), null);
__d("cancelAnimationFrame", ["Env", "TimerStorage", "TimeSlice", "cancelAnimationFramePolyfill", "requestAnimationFrameAcrossTransitions"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = b("TimerStorage").ANIMATION_FRAME;

    function a(a) {
        if (a != null)
            if (b("Env").gk_raf_flush) b("requestAnimationFrameAcrossTransitions").cancelVirtualRAF(a);
            else {
                b("TimerStorage").unset(g, a);
                var c = g + String(a);
                b("TimeSlice").cancelWithToken(c)
            }
        b("cancelAnimationFramePolyfill")(a)
    }
    e.exports = a
}), null);
__d("getVendorPrefixedEventName", ["fbjs/lib/ExecutionEnvironment"], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();

    function a(a, b) {
        var c = {};
        c[a.toLowerCase()] = b.toLowerCase();
        c["Webkit" + a] = "webkit" + b;
        c["Moz" + a] = "moz" + b;
        c["ms" + a] = "MS" + b;
        c["O" + a] = "o" + b.toLowerCase();
        return c
    }
    var g = {
            animationend: a("Animation", "AnimationEnd"),
            animationiteration: a("Animation", "AnimationIteration"),
            animationstart: a("Animation", "AnimationStart"),
            transitionend: a("Transition", "TransitionEnd")
        },
        h = {},
        i = {};
    b("fbjs/lib/ExecutionEnvironment").canUseDOM && (i = document.createElement("div").style, "AnimationEvent" in window || (delete g.animationend.animation, delete g.animationiteration.animation, delete g.animationstart.animation), "TransitionEvent" in window || delete g.transitionend.transition);

    function c(a) {
        if (h[a]) return h[a];
        else if (!g[a]) return a;
        var b = g[a];
        for (var c in b)
            if (Object.prototype.hasOwnProperty.call(b, c) && c in i) return h[a] = b[c];
        return ""
    }
    e.exports = c
}), null);
__d("ReactTransitionEvents", ["fbjs/lib/ExecutionEnvironment", "getVendorPrefixedEventName"], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();
    var g = [];

    function a() {
        var a = b("getVendorPrefixedEventName")("animationend"),
            c = b("getVendorPrefixedEventName")("transitionend");
        a && g.push(a);
        c && g.push(c)
    }
    b("fbjs/lib/ExecutionEnvironment").canUseDOM && a();

    function h(a, b, c) {
        a.addEventListener(b, c, !1)
    }

    function i(a, b, c) {
        a.removeEventListener(b, c, !1)
    }
    c = {
        addEndEventListener: function(a, b) {
            if (g.length === 0) {
                window.setTimeout(b, 0);
                return
            }
            g.forEach(function(c) {
                h(a, c, b)
            })
        },
        removeEndEventListener: function(a, b) {
            if (g.length === 0) return;
            g.forEach(function(c) {
                i(a, c, b)
            })
        }
    };
    e.exports = c
}), null);