if (self.CavalryLogger) {
    CavalryLogger.start_js(["xqbg0"]);
}

__d("createTooltipPortal", ["ReactDOM"], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, c) {
        return b("ReactDOM").createPortal(a, c)
    }
    e.exports = a
}), null);
__d("Tooltip.react", ["Arbiter", "React", "ReactDOM", "SubscriptionsHandler", "TooltipData", "createTooltipPortal", "ifRequired", "killswitch"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g;
    c = babelHelpers.inherits(a, b("React").Component);
    g = c && c.prototype;

    function a() {
        var a, c;
        for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++) e[f] = arguments[f];
        return c = (a = g.constructor).call.apply(a, [this].concat(e)), this.$1 = null, this.$2 = new(b("SubscriptionsHandler"))(), this.state = {
            visible: !1,
            wasEverVisible: !1
        }, this.tooltipEl = b("React").createRef(), c
    }
    a.prototype.componentDidMount = function() {
        "use strict";
        __p && __p();
        this.$2.addSubscriptions(b("Arbiter").subscribe("tooltip/requesthide", function(a, c) {
            a = c.context;
            this.state.visible && (!a || a === this.tooltipEl.current) && b("ifRequired")("Tooltip", function(a) {
                a.suspend(), b("ReactDOM").unstable_interactiveUpdates(function() {
                    this.setState({
                        visible: !1
                    })
                }.bind(this))
            }.bind(this))
        }.bind(this)), b("Arbiter").subscribe("tooltip/requestshow", function(a, c) {
            a = c.context;
            !this.state.visible && a === this.tooltipEl.current && b("ifRequired")("Tooltip", function(a) {
                a.suspend(), b("ReactDOM").unstable_interactiveUpdates(function() {
                    this.setState({
                        visible: !0,
                        wasEverVisible: !0
                    })
                }.bind(this))
            }.bind(this))
        }.bind(this))), this.$3()
    };
    a.prototype.componentDidUpdate = function(a, c) {
        "use strict";
        c.visible !== this.state.visible && (this.props.onVisibilityChange && this.props.onVisibilityChange(this.state.visible), b("ifRequired")("Tooltip", function(a) {
            this.state.visible ? a.commitShow(this.tooltipEl.current) : a.commitHide(this.tooltipEl.current)
        }.bind(this))), this.$3()
    };
    a.prototype.componentWillUnmount = function() {
        "use strict";
        b("TooltipData").remove(b("ReactDOM").findDOMNode(this)), this.$2.release()
    };
    a.prototype.render = function() {
        "use strict";
        __p && __p();
        var a = this.props;
        a.alignH;
        a.children;
        a.delayMountUntilHover;
        a.display;
        a.position;
        var c = a.tooltip;
        a = babelHelpers.objectWithoutPropertiesLoose(a, ["alignH", "children", "delayMountUntilHover", "display", "position", "tooltip"]);
        var d = this.$4();
        return b("React").createElement(this.props.display === "block" ? "div" : "span", babelHelpers["extends"]({}, a, {
            ref: this.tooltipEl,
            "data-hover": "tooltip",
            "data-tooltip-content": typeof c === "string" ? c : void 0
        }), d && c !== null ? b("createTooltipPortal")(c, this.$5()) : null, this.props.children)
    };
    a.prototype.$4 = function() {
        "use strict";
        var a = this.props.delayMountUntilHover,
            b = this.state.wasEverVisible;
        return !a || b
    };
    a.prototype.$5 = function() {
        "use strict";
        this.$1 == null && (this.$1 = document.createElement("div"));
        return this.$1
    };
    a.prototype.$3 = function() {
        "use strict";
        __p && __p();
        if (!this.$4()) return;
        var a = b("ReactDOM").findDOMNode(this);
        if (!this.props.tooltip) b("TooltipData").remove(a);
        else {
            var c = this.props,
                d = c.alignH;
            c = c.position;
            b("TooltipData").set(a, this.$5(), c, d)
        }
    };
    a.defaultProps = {
        delayMountUntilHover: !b("killswitch")("TOOLTIP_DELAY_MOUNT_UNTIL_HOVER"),
        display: "inline"
    };
    e.exports = a
}), null);
__d("ARIA", ["DOM", "emptyFunction", "ge", "getOrCreateDOMID"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g, h, i = function() {
        g = b("ge")("ariaAssertiveAlert"), g || (g = b("DOM").create("div", {
            id: "ariaAssertiveAlert",
            className: "accessible_elem",
            "aria-live": "assertive"
        }), b("DOM").appendContent(document.body, g)), h = b("ge")("ariaPoliteAlert"), h || (h = g.cloneNode(!1), h.setAttribute("id", "ariaPoliteAlert"), h.setAttribute("aria-live", "polite"), b("DOM").appendContent(document.body, h)), i = b("emptyFunction")
    };

    function j(a, c) {
        i();
        c = c ? g : h;
        b("DOM").setContent(c, a)
    }
    a = {
        controls: function(a) {
            for (var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
            var f = d.map(function(a) {
                return b("getOrCreateDOMID")(a)
            }).join(" ");
            a.setAttribute("aria-controls", f)
        },
        describedBy: function(a) {
            for (var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
            var f = d.map(function(a) {
                return b("getOrCreateDOMID")(a)
            }).join(" ");
            a.setAttribute("aria-describedby", f)
        },
        owns: function(a, c) {
            a.setAttribute("aria-owns", b("getOrCreateDOMID")(c))
        },
        setPopup: function(a, c) {
            c = b("getOrCreateDOMID")(c);
            a.setAttribute("aria-controls", c);
            a.setAttribute("aria-haspopup", "true");
            c = a.getAttribute("role") || "";
            c && a.setAttribute("role", c)
        },
        announce: function(a) {
            j(a, !0)
        },
        notify: function(a) {
            j(a, !1)
        }
    };
    e.exports = a
}), null);
__d("ContextualLayerAlignmentEnum", ["prop-types"], (function(a, b, c, d, e, f) {
    "use strict";
    a = {
        left: "left",
        center: "center",
        right: "right",
        propType: b("prop-types").oneOf(["left", "center", "right"]),
        values: ["left", "center", "right"]
    };
    e.exports = a
}), null);
__d("ContextualLayerPositionEnum", ["prop-types"], (function(a, b, c, d, e, f) {
    "use strict";
    a = {
        above: "above",
        below: "below",
        left: "left",
        right: "right",
        propType: b("prop-types").oneOf(["above", "below", "left", "right"]),
        values: ["above", "below", "left", "right"]
    };
    e.exports = a
}), null);
__d("LayerHideSources", [], (function(a, b, c, d, e, f) {
    a = Object.freeze({
        BLUR: "blur",
        ESCAPE: "escape",
        LAYER_CANCEL_BUTTON: "layerCancelButton",
        LAYER_HIDE_BUTTON: "layerHideButton",
        TRANSITION: "transition"
    });
    e.exports = a
}), null);
__d("LinkController", ["DataStore", "Event", "Parent", "removeFromArray", "trackReferrer"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = "@@LinkController",
        h = [],
        i = [];
    c = {
        registerHandler: function(a) {
            h.push(a);
            return {
                remove: function() {
                    return b("removeFromArray")(h, a)
                }
            }
        },
        registerFallbackHandler: function(a) {
            i.push(a);
            return {
                remove: function() {
                    return b("removeFromArray")(i, a)
                }
            }
        }
    };

    function a(a) {
        __p && __p();
        a = a.getTarget();
        var c = b("Parent").byTag(a, "a");
        if (!(c instanceof HTMLAnchorElement)) return;
        var d = k(c);
        if (!d || m(a) || b("DataStore").get(c, g) || d.endsWith("#")) return;
        a = b("Event").listen(c, "click", function(a) {
            b("trackReferrer")(c, d), !c.rel && !c.target && !l(a) && j(c, a)
        });
        b("DataStore").set(c, g, a)
    }

    function j(a, b) {
        h.concat(i).every(function(c) {
            if (c(a, b) === !1) {
                b.prevent();
                return !1
            }
            return !0
        })
    }

    function k(a) {
        if (a && !a.rel) {
            a = a.getAttribute("href");
            if (a) {
                var b = a.match(/^(\w+):/);
                if (!b || b[1].match(/^http/i)) return a
            }
        }
        return null
    }

    function l(a) {
        return a.getModifiers().any || a.which && a.which !== 1
    }

    function m(a) {
        return a.nodeName === "INPUT" && a.type === "file"
    }
    b("Event").listen(document.documentElement, "mousedown", a);
    b("Event").listen(document.documentElement, "keydown", a);
    e.exports = c
}), null);
__d("PageTransitionPriorities", [], (function(a, b, c, d, e, f) {
    a = 5;
    b = a + 1;
    e.exports = {
        DEFAULT: a,
        LEFT_NAV: b,
        SOCIAL_SEARCH_DIALOG: b + 1
    }
}), null);
__d("computeRelativeURI", ["URI", "isEmpty", "isFacebookURI"], (function(a, b, c, d, e, f) {
    __p && __p();

    function g(a, b) {
        if (!b) return a;
        if (b.charAt(0) == "/") return b;
        var c = a.split("/").slice(0, -1);
        c[0] !== "";
        b.split("/").forEach(function(a) {
            a === "." || (a === ".." ? c.length > 1 && (c = c.slice(0, -1)) : c.push(a))
        });
        return c.join("/")
    }

    function a(a, c) {
        __p && __p();
        var d = new(b("URI"))(),
            e = new(b("URI"))(a),
            f = new(b("URI"))(c);
        if (f.getDomain() && !b("isFacebookURI")(f)) return c;
        var h = e;
        a = ["Protocol", "Domain", "Port", "Path", "QueryData", "Fragment"];
        a.forEach(function(a) {
            var c = a === "Path" && h === e;
            c && d.setPath(g(e.getPath(), f.getPath()));
            b("isEmpty")(f["get" + a]()) || (h = f);
            c || d["set" + a](h["get" + a]())
        });
        return d
    }
    e.exports = a
}), null);
__d("getReferrerURI", ["ErrorUtils", "URI", "isFacebookURI"], (function(a, b, c, d, e, f) {
    "use strict";

    function c() {
        if (a.PageTransitions && a.PageTransitions.isInitialized()) return a.PageTransitions.getReferrerURI();
        else {
            var c = b("ErrorUtils").applyWithGuard(function(a) {
                return new(b("URI"))(a)
            }, null, [document.referrer]);
            return c && b("isFacebookURI")(c) ? c : null
        }
    }
    e.exports = c
}), null);
__d("PageTransitionsRegistrar", ["invariant", "Bootloader", "DOMQuery", "Form", "LinkController", "PageTransitionPriorities", "Parent", "Run", "URI", "computeRelativeURI", "getReferrerURI", "goURI", "setTimeoutAcrossTransitions"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    b("Run").onAfterLoad(function() {
        b("Bootloader").loadModules(["PageTransitions"], function(a) {
            a && a._init && a._init()
        }, "PageTransitionsRegistrar")
    });
    var h = [],
        i = [];
    d = {
        DELAY_HISTORY: "delay_history_PTR",
        registerHandler: function(a, c) {
            a != null || g(0, 5202), c = c || b("PageTransitionPriorities").DEFAULT, h[c] || (h[c] = []), h[c].push(a)
        },
        removeHandler: function(a, c) {
            c = c || b("PageTransitionPriorities").DEFAULT;
            var d = -1;
            h[c] && (d = h[c].indexOf(a));
            d > -1 && h[c].splice(d, 1)
        },
        registerCompletionCallback: function(a) {
            i.push(a)
        },
        getMostRecentURI: l,
        getReferrerURI: b("getReferrerURI"),
        _getTransitionHandlers: function() {
            return h
        },
        _getCompletionCallbacks: function() {
            return i
        },
        _resetCompletionCallbacks: function() {
            i = []
        },
        __onClick: d,
        __onSubmit: f
    };
    var j = null;

    function c(a) {
        j = a, b("setTimeoutAcrossTransitions")(function() {
            j = null
        }, 0)
    }

    function d(a) {
        if (j) {
            if (!a.isDefaultPrevented()) {
                k(j);
                var c = j.getAttribute("href");
                c && b("goURI")(c)
            }
            a.kill()
        }
    }

    function k(a) {
        var c = a.getAttribute("href") || "",
            d = b("computeRelativeURI")(l().getQualifiedURI().toString(), c).toString();
        c != d && a.setAttribute("href", d)
    }

    function f(a, c) {
        __p && __p();
        c = c;
        var d = a.getTarget();
        if (b("Form").getAttribute(d, "rel") || b("Form").getAttribute(d, "target")) return;
        var e = new(b("URI"))(b("Form").getAttribute(d, "action"));
        e = b("computeRelativeURI")(l().toString(), e.toString());
        d.setAttribute("action", e.toString());
        if ((b("Form").getAttribute(d, "method") || "GET").toUpperCase() == "GET") {
            d = b("Form").serialize(d);
            c && (b("DOMQuery").isNodeOfType(c, "input") && c.type === "submit" || (c = b("Parent").byTag(c, "button"))) && c.name && (d[c.name] = c.value);
            typeof e === "string" && (e = new(b("URI"))(e));
            b("goURI")(e.addQueryData(d));
            a.kill()
        }
    }
    b("LinkController").registerFallbackHandler(c);

    function l() {
        if (a.PageTransitions && a.PageTransitions.isInitialized()) return a.PageTransitions.getMostRecentURI();
        else {
            var c = b("URI").getRequestURI(!1);
            c = c.getUnqualifiedURI();
            var d = new(b("URI"))(c).setFragment(null),
                e = c.getFragment();
            e.charAt(0) === "!" && d.toString() === e.substr(1) && (c = d);
            return c
        }
    }
    e.exports = d
}), null);
__d("LayerHideOnTransition", ["LayerHideSources", "PageTransitionsRegistrar"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        "use strict";
        this._handler = function(a) {
            this._enabled && this.isTransitionRelevant(a) && this._layer.hide(b("LayerHideSources").TRANSITION), this._subscribe()
        }.bind(this), this._layer = a
    }
    a.prototype.enable = function() {
        "use strict";
        this._enabled = !0, this._subscribed || setTimeout(this._subscribe.bind(this), 0)
    };
    a.prototype.disable = function() {
        "use strict";
        this._enabled = !1, b("PageTransitionsRegistrar").removeHandler(this._handler)
    };
    a.prototype.isTransitionRelevant = function(a) {
        "use strict";
        return !0
    };
    a.prototype._subscribe = function() {
        "use strict";
        b("PageTransitionsRegistrar").registerHandler(this._handler), this._subscribed = !0
    };
    Object.assign(a.prototype, {
        _enabled: !1,
        _subscribed: !1
    });
    e.exports = a
}), null);
__d("Rect", ["invariant", "Vector", "$"], (function(a, b, c, d, e, f, g) {
    __p && __p();

    function h(a, c, d, e, f) {
        "use strict";
        __p && __p();
        if (arguments.length === 1) {
            if (a instanceof h) return a;
            if (a instanceof b("Vector")) return new h(a.y, a.x, a.y, a.x, a.domain);
            typeof a === "string" && (a = b("$")(a));
            return h.getElementBounds(a)
        }
        typeof a === "number" && typeof c === "number" && typeof d === "number" && typeof e === "number" && (!f || typeof f === "string") || g(0, 1087);
        Object.assign(this, {
            t: a,
            r: c,
            b: d,
            l: e,
            domain: f || "pure"
        });
        return this
    }
    h.prototype.w = function() {
        "use strict";
        return this.r - this.l
    };
    h.prototype.h = function() {
        "use strict";
        return this.b - this.t
    };
    h.prototype.getWidth = function() {
        "use strict";
        return this.w()
    };
    h.prototype.getHeight = function() {
        "use strict";
        return this.h()
    };
    h.prototype.toString = function() {
        "use strict";
        return "((" + this.l + ", " + this.t + "), (" + this.r + ", " + this.b + "))"
    };
    h.prototype.contains = function(a) {
        "use strict";
        a = new h(a).convertTo(this.domain);
        var b = this;
        return b.l <= a.l && b.r >= a.r && b.t <= a.t && b.b >= a.b
    };
    h.prototype.isEqualTo = function(a) {
        "use strict";
        return this.t === a.t && this.r === a.r && this.b === a.b && this.l === a.l && this.domain === a.domain
    };
    h.prototype.add = function(a, c) {
        "use strict";
        if (arguments.length == 1) {
            a instanceof h && a.domain != "pure" && (a = a.convertTo(this.domain));
            return a instanceof b("Vector") ? this.add(a.x, a.y) : this
        }
        var d = parseFloat(a),
            e = parseFloat(c);
        return new h(this.t + e, this.r + d, this.b + e, this.l + d, this.domain)
    };
    h.prototype.sub = function(a, c) {
        "use strict";
        if (arguments.length == 1 && a instanceof b("Vector")) return this.add(a.mul(-1));
        else if (typeof a === "number" && typeof c === "number") return this.add(-a, -c);
        return this
    };
    h.prototype.rotateAroundOrigin = function(a) {
        "use strict";
        var b = this.getCenter().rotate(a * Math.PI / 2),
            c = 0;
        a % 2 ? (c = this.h(), a = this.w()) : (c = this.w(), a = this.h());
        var d = b.y - a / 2;
        b = b.x - c / 2;
        a = d + a;
        c = b + c;
        return new h(d, c, a, b, this.domain)
    };
    h.prototype.boundWithin = function(a) {
        "use strict";
        var b = 0,
            c = 0;
        this.l < a.l ? b = a.l - this.l : this.r > a.r && (b = a.r - this.r);
        this.t < a.t ? c = a.t - this.t : this.b > a.b && (c = a.b - this.b);
        return this.add(b, c)
    };
    h.prototype.getCenter = function() {
        "use strict";
        return new(b("Vector"))(this.l + this.w() / 2, this.t + this.h() / 2, this.domain)
    };
    h.prototype.getTop = function() {
        "use strict";
        return this.t
    };
    h.prototype.getRight = function() {
        "use strict";
        return this.r
    };
    h.prototype.getBottom = function() {
        "use strict";
        return this.b
    };
    h.prototype.getLeft = function() {
        "use strict";
        return this.l
    };
    h.prototype.getPositionVector = function() {
        "use strict";
        return new(b("Vector"))(this.l, this.t, this.domain)
    };
    h.prototype.getDimensionVector = function() {
        "use strict";
        return new(b("Vector"))(this.w(), this.h(), "pure")
    };
    h.prototype.convertTo = function(a) {
        "use strict";
        if (this.domain == a) return this;
        if (a == "pure") return new h(this.t, this.r, this.b, this.l, "pure");
        if (this.domain == "pure") return new h(0, 0, 0, 0);
        var c = new(b("Vector"))(this.l, this.t, this.domain).convertTo(a);
        return new h(c.y, c.x + this.w(), c.y + this.h(), c.x, a)
    };
    h.deserialize = function(a) {
        "use strict";
        a = a.split(":");
        return new h(parseFloat(a[1]), parseFloat(a[2]), parseFloat(a[3]), parseFloat(a[0]))
    };
    h.newFromVectors = function(a, b) {
        "use strict";
        return new h(a.y, a.x + b.x, a.y + b.y, a.x, a.domain)
    };
    h.getElementBounds = function(a) {
        "use strict";
        return h.newFromVectors(b("Vector").getElementPosition(a), b("Vector").getElementDimensions(a))
    };
    h.getViewportBounds = function() {
        "use strict";
        return h.newFromVectors(b("Vector").getScrollPosition(), b("Vector").getViewportDimensions())
    };
    h.getViewportWithoutScrollbarsBounds = function() {
        "use strict";
        return h.newFromVectors(b("Vector").getScrollPosition(), b("Vector").getViewportWithoutScrollbarDimensions())
    };
    h.minimumBoundingBox = function(a) {
        "use strict";
        var b = new h(Infinity, -Infinity, -Infinity, Infinity),
            c;
        for (var d = 0; d < a.length; d++) c = a[d], b.t = Math.min(b.t, c.t), b.r = Math.max(b.r, c.r), b.b = Math.max(b.b, c.b), b.l = Math.min(b.l, c.l);
        return b
    };
    e.exports = h
}), null);
__d("SVGChecker", [], (function(a, b, c, d, e, f) {
    e.exports = {
        isSVG: function(a) {
            return !!a.ownerSVGElement || a.tagName.toLowerCase() === "svg"
        },
        isDisplayed: function(a) {
            try {
                a = a.getBBox();
                if (a && (a.height === 0 || a.width === 0)) return !1
            } catch (a) {
                return !1
            }
            return !0
        }
    }
}), null);
__d("getOwnObjectValues", [], (function(a, b, c, d, e, f) {
    function a(a) {
        return Object.keys(a).map(function(b) {
            return a[b]
        })
    }
    e.exports = a
}), null);
__d("ContextualLayer", ["invariant", "Arbiter", "ARIA", "Bootloader", "ContextualLayerAlignmentEnum", "ContextualLayerPositionEnum", "ContextualThing", "CSS", "DataStore", "DOM", "Event", "Layer", "LayerHideOnTransition", "Locale", "Parent", "Rect", "Scroll", "Style", "SVGChecker", "Vector", "containsNode", "emptyFunction", "getOffsetParent", "getOrCreateDOMID", "getOverlayZIndex", "getOwnObjectValues", "isElementNode", "removeFromArray", "throttle"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h, i;

    function j(a) {
        return a.getPosition() === "left" || a.isVertical() && a.getAlignment() === "right"
    }
    h = babelHelpers.inherits(k, b("Layer"));
    i = h && h.prototype;
    k.prototype._configure = function(a, b) {
        "use strict";
        a.dialogRole !== "dialog" && (this._dialogRole = a.dialogRole), a.shouldSetARIAProperties === !1 && (this._shouldSetARIAProperties = a.shouldSetARIAProperties), a.label && (this._label = a.label), a.labelledBy && (this._labelledBy = a.labelledBy), i._configure.call(this, a, b), a.context ? this.setContext(a.context) : a.contextID ? this._setContextID(a.contextID) : a.contextSelector && (this._setContextSelector(a.contextSelector), this._setARIAProperties()), this.setPosition(a.position), this.setAlignment(a.alignment), this.setOffsetX(a.offsetX), this.setOffsetY(a.offsetY), this.setArrowDimensions(a.arrowDimensions), this._content = b
    };
    k.prototype._getDefaultBehaviors = function() {
        "use strict";
        var a = k.getDefaultBehaviorsAsObject();
        return i._getDefaultBehaviors.call(this).concat(b("getOwnObjectValues")(a))
    };
    k.prototype._buildWrapper = function(a, c) {
        "use strict";
        this._contentWrapper = b("DOM").create("div", {
            className: "uiContextualLayer"
        }, c);
        this._dialogRole && this._contentWrapper.setAttribute("role", this._dialogRole);
        this._labelledBy ? this._contentWrapper.setAttribute("aria-labelledby", this._labelledBy) : this._label && this._contentWrapper.setAttribute("aria-label", this._label);
        this._dialogRole === "alert" && this._contentWrapper.setAttribute("aria-atomic", "true");
        return b("DOM").create("div", {
            className: "uiContextualLayerPositioner",
            "data-testid": a["data-testid"]
        }, this._contentWrapper)
    };
    k.prototype.getInsertParent = function() {
        "use strict";
        var a = this._insertParent;
        if (!a) {
            var c = this.getContext();
            c && (a = b("Parent").byClass(c, "uiContextualLayerParent"))
        }
        return a || i.getInsertParent.call(this)
    };
    k.prototype.setContent = function(a) {
        "use strict";
        this._content = a;
        b("DOM").setContent(this._contentWrapper, this._content);
        this._shown && this.updatePosition();
        return this
    };
    k.prototype.setContext = function(a) {
        "use strict";
        return this.setContextWithBounds(a, null)
    };
    k.prototype.setContextWithBounds = function(a, c) {
        "use strict";
        __p && __p();
        if (this._contextNode === a && c && this._contextBounds && c.isEqualTo(this._contextBounds)) return this;
        this._contextNode = a;
        var d = c && this._contextBounds && c.t === this._contextBounds.t && c.r === this._contextBounds.r && c.b === this._contextBounds.b && c.l === this._contextBounds.l;
        if (d) return this;
        this._contextBounds = c || null;
        this._contextSelector = "#" + b("getOrCreateDOMID")(a);
        this._contextScrollParent = null;
        this._shown && (b("ContextualThing").register(this.getRoot(), this._contextNode), this.updatePosition());
        this._setParentSubscription();
        this._setARIAProperties();
        return this
    };
    k.prototype.shouldSetARIAProperties = function(a) {
        "use strict";
        this._shouldSetARIAProperties = a;
        return this
    };
    k.prototype._setARIAProperties = function() {
        "use strict";
        if (!this._shouldSetARIAProperties) return this;
        this._dialogRole === "dialog" ? b("ARIA").setPopup(this.getCausalElement(), this.getRoot()) : this._dialogRole === "region" && b("Bootloader").loadModules(["ContextualLayerInlineTabOrder"], function(a) {
            this.hasBehavior(a) || this.enableBehavior(a)
        }.bind(this), "ContextualLayer");
        return this
    };
    k.prototype._setContextID = function(a) {
        "use strict";
        this._contextSelector = "#" + a, this._contextNode = null
    };
    k.prototype._setContextSelector = function(a) {
        "use strict";
        this._contextSelector = a, this._contextNode = null
    };
    k.prototype.getCausalElement = function() {
        "use strict";
        return i.getCausalElement.call(this) || this.getContext()
    };
    k.prototype._setParentSubscription = function() {
        "use strict";
        __p && __p();
        var a = this.getContext(),
            c = null;
        while (a != null) {
            c = b("DataStore").get(a, "layer");
            if (c) break;
            a = a.parentNode
        }
        if (c === this._parentLayer) return;
        this._parentLayer && this._parentSubscription && (this._parentLayer.unsubscribe(this._parentSubscription), this._parentSubscription = null);
        c && (this._parentSubscription = c.subscribe("hide", this.hide.bind(this)));
        this._parentLayer = c
    };
    k.prototype.setPosition = function(a) {
        "use strict";
        this.getOrientation().setDefaultPosition(a) && (this._shown && this.updatePosition());
        return this
    };
    k.prototype.setAlignment = function(a) {
        "use strict";
        this.getOrientation().setDefaultAlignment(a) && (this._shown && this.updatePosition());
        return this
    };
    k.prototype.setOffsetX = function(a) {
        "use strict";
        this.getOrientation().setDefaultOffsetX(a) && (this._shown && this.updatePosition());
        return this
    };
    k.prototype.setArrowDimensions = function(a) {
        "use strict";
        a && this.getOrientation().setArrowOffset(a.offset) && (this._shown && this.updatePosition());
        return this
    };
    k.prototype.setOffsetY = function(a) {
        "use strict";
        this.getOrientation().setDefaultOffsetY(a) && (this._shown && this.updatePosition());
        return this
    };
    k.prototype.getPosition = function() {
        "use strict";
        return this.getOrientation().getPosition()
    };
    k.prototype.getOrientation = function() {
        "use strict";
        this._orientation || (this._orientation = new o());
        return this._orientation
    };
    k.prototype.getContentRoot = function() {
        "use strict";
        return this._contentWrapper
    };
    k.prototype.getContent = function() {
        "use strict";
        return this._content
    };
    k.prototype.getContext = function() {
        "use strict";
        this._contextNode || (this._contextSelector != null || g(0, 11711), this._contextNode = b("DOM").find(document, this._contextSelector));
        return this._contextNode
    };
    k.prototype.getContextBounds = function(a) {
        "use strict";
        if (this._contextBounds) return this._contextBounds.convertTo(a);
        var c = this.getContext();
        return b("Rect").newFromVectors(b("Vector").getElementPosition(c, a), b("Vector").getElementDimensions(c))
    };
    k.prototype.getContextScrollParent = function() {
        "use strict";
        !this._contextScrollParent ? this._contextScrollParent = b("Style").getScrollParent(this.getContext()) : b("isElementNode")(this._contextScrollParent) && !b("containsNode")(document.documentElement, this._contextScrollParent) && (this._contextScrollParent = b("Style").getScrollParent(this.getContext()));
        return this._contextScrollParent
    };
    k.prototype.setInsertParent = function(a) {
        "use strict";
        this._insertScrollParent = null;
        return i.setInsertParent.call(this, a)
    };
    k.prototype.getInsertScrollParent = function() {
        "use strict";
        this._insertScrollParent || (this._insertScrollParent = b("Style").getScrollParent(this.getInsertParent()));
        return this._insertScrollParent
    };
    k.prototype.show = function() {
        "use strict";
        if (this._shown) return this;
        i.show.call(this);
        b("Arbiter").inform("contextualLayer/toggle", {
            show: !0,
            contentRoot: this.getRoot()
        });
        this._shown && (b("ContextualThing").register(this.getRoot(), this.getContext()), l.push(this), this._resizeListener = this._resizeListener || b("Event").listen(window, "resize", b("throttle")(function() {
            this._shown && this.updatePosition()
        }.bind(this))));
        return this
    };
    k.prototype.finishHide = function() {
        "use strict";
        b("removeFromArray")(l, this);
        this._resizeListener && this._resizeListener.remove();
        this._resizeListener = null;
        this._insertScrollParent = null;
        b("Arbiter").inform("contextualLayer/toggle", {
            show: !1,
            contentRoot: this.getRoot()
        });
        return i.finishHide.call(this)
    };
    k.prototype.isFixed = function() {
        "use strict";
        return b("Style").isFixed(this.getContext()) && !b("Style").isFixed(this.getInsertParent())
    };
    k.prototype.updatePosition = function() {
        "use strict";
        __p && __p();
        var a = this.getContext();
        if (!a) return !1;
        var c = this.isFixed();
        if (!c && !(a.offsetParent || b("SVGChecker").isSVG(a) && b("SVGChecker").isDisplayed(a))) return !1;
        var d = this.getRoot();
        b("Style").set(d, "width", b("Vector").getViewportDimensions().x + "px");
        var e = this.getOrientation();
        this.inform("adjust", e.reset());
        if (!e.isValid()) return !1;
        this._updateWrapperPosition(e);
        this._updateWrapperClass(e);
        b("CSS").conditionClass(d, "uiContextualLayerPositionerFixed", c);
        var f, g, h = c ? "viewport" : "document";
        c = c ? document.documentElement : b("getOffsetParent")(d);
        if (c === document.documentElement) f = new(b("Vector"))(0, 0), g = document.documentElement.clientWidth;
        else if (!d.offsetParent) return !1;
        else f = b("Vector").getElementPosition(c, h), g = c.offsetWidth, c !== document.body && (f = f.sub(new(b("Vector"))(b("Scroll").getLeft(c), b("Scroll").getTop(c))));
        c = this.getContextBounds(h);
        h = c.l - f.x;
        f = c.t - f.y;
        var i = c.h();
        c = c.w();
        var k = b("Locale").isRTL();
        e.getPosition() === "below" && (f += i);
        (e.getPosition() === "right" || e.isVertical() && e.getAlignment() === "right") != k && (h += c);
        i = e.getOffsetX();
        e.isVertical() && e.getAlignment() === "center" && (i += (c - this.getContentRoot().offsetWidth) / 2);
        k && (i *= -1);
        c = "left";
        h = Math.floor(h + i);
        j(e) !== k && (c = "right", h = g - h);
        b("Style").set(d, c, h + "px");
        b("Style").set(d, c === "left" ? "right" : "left", "");
        i = this.getInsertScrollParent();
        k = 0;
        i !== window ? (g = i.clientWidth, k = b("Vector").getElementPosition(i).x) : g = document.documentElement.clientWidth;
        h = b("Vector").getElementPosition(d).x - k;
        c === "left" && g - h > 0 ? b("Style").set(d, "width", g - h + "px") : c === "right" && h + d.offsetWidth > 0 ? b("Style").set(d, "width", h + d.offsetWidth + "px") : b("Style").set(d, "width", "");
        b("Style").set(d, "top", f + e.getOffsetY() + "px");
        i = b("getOverlayZIndex")(a, this.getInsertParent());
        b("Style").set(d, "z-index", i > 200 ? i : "");
        this.inform("reposition", e);
        return !0
    };
    k.prototype._updateWrapperPosition = function(a) {
        "use strict";
        var c = a.getPosition() === "above";
        b("Style").set(this._contentWrapper, "bottom", c ? "0" : null);
        c = b("Locale").isRTL() ? "left" : "right";
        a = j(a);
        b("Style").set(this._contentWrapper, c, a ? "0" : null)
    };
    k.prototype._updateWrapperClass = function(a) {
        "use strict";
        a = a.getClassName();
        if (a === this._orientationClass) return;
        this._orientationClass && b("CSS").removeClass(this._contentWrapper, this._orientationClass);
        this._orientationClass = a;
        b("CSS").addClass(this._contentWrapper, a)
    };
    k.prototype.simulateOrientation = function(a, c) {
        "use strict";
        __p && __p();
        a = a.getClassName();
        if (a === this._orientationClass) return c();
        else {
            this._orientationClass && b("CSS").removeClass(this._contentWrapper, this._orientationClass);
            b("CSS").addClass(this._contentWrapper, a);
            c = c();
            b("CSS").removeClass(this._contentWrapper, a);
            this._orientationClass && b("CSS").addClass(this._contentWrapper, this._orientationClass);
            return c
        }
    };
    k.prototype.destroy = function() {
        "use strict";
        i.destroy.call(this);
        this._contentWrapper = null;
        this._content = null;
        return this
    };
    k.prototype.getArrowDimensions = function() {
        "use strict";
        return this._config.arrowDimensions || {
            offset: 0,
            length: 0
        }
    };
    k.getDefaultBehaviorsAsObject = function() {
        "use strict";
        return {
            LayerHideOnTransition: b("LayerHideOnTransition")
        }
    };

    function k() {
        "use strict";
        h.apply(this, arguments)
    }
    var l = [];
    b("Arbiter").subscribe("reflow", function() {
        l.forEach(function(a) {
            a.updatePosition() === !1 && a.hide()
        })
    });
    Object.assign(k.prototype, {
        _contentWrapper: null,
        _content: null,
        _contextNode: null,
        _contextBounds: null,
        _contextSelector: null,
        _dialogRole: "dialog",
        _label: null,
        _labelledBy: [],
        _parentLayer: null,
        _parentSubscription: null,
        _orientation: null,
        _orientationClass: null,
        _shouldSetARIAProperties: !0
    });
    var m = b("emptyFunction").thatReturnsArgument,
        n = b("emptyFunction").thatReturnsArgument;

    function o() {
        "use strict";
        this._default = {
            _position: "above",
            _alignment: "left",
            _offsetX: 0,
            _offsetY: 0,
            _valid: !0,
            _preferMoreContentShownRect: !1
        }, this.reset()
    }
    o.prototype.setPosition = function(a) {
        "use strict";
        this._position = m(a);
        return this
    };
    o.prototype.setAlignment = function(a) {
        "use strict";
        this._alignment = n(a);
        return this
    };
    o.prototype.getOppositePosition = function() {
        "use strict";
        return o.OPPOSITE[this.getPosition()]
    };
    o.prototype.invalidate = function() {
        "use strict";
        this._valid = !1;
        return this
    };
    o.prototype.getPosition = function() {
        "use strict";
        return this._position || "above"
    };
    o.prototype.getAlignment = function() {
        "use strict";
        return this._alignment || "left"
    };
    o.prototype.getOffsetX = function() {
        "use strict";
        var a = this._offsetX || 0;
        !this.isVertical() ? this._default._position !== this._position && (a *= -1) : this._default._alignment !== this._alignment && (a *= -1);
        return a
    };
    o.prototype.getOffsetY = function() {
        "use strict";
        var a = this._offsetY || 0;
        this.isVertical() && this._default._position !== this._position && (a *= -1);
        return a
    };
    o.prototype.getClassName = function() {
        "use strict";
        __p && __p();
        var a = this.getAlignment(),
            b = this.getPosition();
        if (b === "below")
            if (a === "left") return "uiContextualLayerBelowLeft";
            else if (a === "right") return "uiContextualLayerBelowRight";
        else return "uiContextualLayerBelowCenter";
        else if (b === "above")
            if (a === "left") return "uiContextualLayerAboveLeft";
            else if (a === "right") return "uiContextualLayerAboveRight";
        else return "uiContextualLayerAboveCenter";
        else if (b === "left") return "uiContextualLayerLeft";
        else return "uiContextualLayerRight"
    };
    o.prototype.isValid = function() {
        "use strict";
        return this._valid
    };
    o.prototype.isVertical = function() {
        "use strict";
        return this.getPosition() === "above" || this.getPosition() === "below"
    };
    o.prototype.reset = function() {
        "use strict";
        Object.assign(this, this._default);
        return this
    };
    o.prototype.setDefaultPosition = function(a) {
        "use strict";
        var b = this._default._position;
        this._default._position = m(a);
        return b !== a
    };
    o.prototype.setDefaultAlignment = function(a) {
        "use strict";
        var b = this._default._alignment;
        this._default._alignment = n(a);
        return b !== a
    };
    o.prototype.setDefaultOffsetX = function(a) {
        "use strict";
        var b = this._default._offsetX;
        this._default._offsetX = a;
        return b !== a
    };
    o.prototype.setArrowOffset = function(a) {
        "use strict";
        var b = this._default._arrowOffset;
        this._default._arrowOffset = a;
        return b !== a
    };
    o.prototype.getArrowOffset = function() {
        "use strict";
        return this._default._arrowOffset || 0
    };
    o.prototype.setDefaultOffsetY = function(a) {
        "use strict";
        var b = this._default._offsetY;
        this._default._offsetY = a;
        return b !== a
    };
    o.prototype.setPreferMoreContentShownRect = function(a) {
        "use strict";
        var b = this._default._preferMoreContentShownRect;
        this._default._preferMoreContentShownRect = a;
        return b !== a
    };
    o.prototype.getPreferMoreContentShownRect = function() {
        "use strict";
        return this._default._preferMoreContentShownRect
    };
    o.OPPOSITE = {
        above: "below",
        below: "above",
        left: "right",
        right: "left"
    };
    e.exports = k
}), null);
__d("ReactBrowserEventEmitter_DO_NOT_USE", ["ReactDOM-fb"], (function(a, b, c, d, e, f) {
    "use strict";
    a = b("ReactDOM-fb").__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    e.exports = a.ReactBrowserEventEmitter
}), null);
__d("ReactLayerCommon", ["invariant", "React", "ReactBrowserEventEmitter_DO_NOT_USE", "ReactDOM", "SubscriptionsHandler", "emptyFunction", "warning"], (function(a, b, c, d, e, f, g) {
    "use strict";
    __p && __p();
    var h, i = function(a) {
        a.isPropagationStopped = b("emptyFunction").thatReturnsTrue
    };
    h = babelHelpers.inherits(j, b("React").Component);
    h && h.prototype;
    j.prototype.render = function() {
        return b("React").createElement("div", {
            onClick: i,
            onBlur: i,
            onDoubleClick: i,
            onFocus: i,
            onKeyDown: i,
            onKeyPress: i,
            onKeyUp: i,
            onMouseDown: i,
            onMouseMove: i,
            onMouseUp: i
        }, this.props.children)
    };

    function j() {
        h.apply(this, arguments)
    }
    var k = {
        makeInitialSubscriptions: function(a, c, d) {
            var e = new(b("SubscriptionsHandler"))();
            c.onToggle && (k.layerSubscribe(a, e, "show", function() {
                return c.onToggle(!0)
            }, d), k.layerSubscribe(a, e, "hide", function() {
                return c.onToggle(!1)
            }, d));
            c.onBlur && k.layerSubscribe(a, e, "blur", function(a, b) {
                return c.onBlur(b)
            }, d);
            c.onHide && k.layerSubscribe(a, e, "runhide", function(a, b) {
                return c.includeHideSource ? c.onHide(b) : c.onHide()
            }, d);
            return e
        },
        layerSubscribe: function(a, c, d, e, f) {
            f = a.subscribe || a.addListener;
            c.addSubscriptions(f.call(a, d, function(a, c) {
                var d = b("ReactBrowserEventEmitter_DO_NOT_USE").isEnabled();
                d && e(a, c)
            }))
        },
        render: function(a, c) {
            a = b("ReactDOM").createPortal(b("React").createElement(j, null, a), c);
            a === void 0 && b("ReactDOM").createPortal._isMockFunction && (a = null);
            return a
        },
        diffBehaviors: function(a, b, c) {
            __p && __p();
            var d;
            for (d in a) a[d] && !b[d] && c.disableBehavior(a[d]);
            for (d in b) {
                var e = a[d],
                    f = b[d];
                if (e && f) {
                    e === f || g(0, 120, d);
                    continue
                }
                e && c.disableBehavior(e);
                f && c.enableBehavior(f)
            }
        }
    };
    e.exports = k
}), null);
__d("ReactLayer", ["invariant", "React", "ReactDOM", "ReactLayerCommon", "emptyFunction", "getObjectValues"], (function(a, b, c, d, e, f, g) {
    "use strict";
    __p && __p();
    a = !1;
    var h = {
        componentDidMount: function() {
            this.layer = this.createLayer(this._layerContainer), this.layer || g(0, 2397), this.layerSubscriptions = b("ReactLayerCommon").makeInitialSubscriptions(this.layer, this.props, this._stackDEVTemporaryDoNotUse || null), this._resetBehaviors()
        },
        componentDidUpdate: function(a) {
            this.receiveProps(this.props, a)
        },
        componentWillUnmount: function() {
            this._layerContainer = null, this.layerSubscriptions && (this.layerSubscriptions.release(), this.layerSubscriptions = null), this.layer && (this.layer.destroy(), this.layer = null)
        },
        _createLayerContainer: function() {
            this._layerContainer == null && (this._layerContainer = document.createElement("div"))
        },
        render: function() {
            this._createLayerContainer();
            return b("ReactLayerCommon").render(this.props.children, this._layerContainer)
        },
        enumerateBehaviors: function(a) {
            a = this.getEffectiveBehaviors(a);
            return b("getObjectValues")(a).filter(b("emptyFunction").thatReturnsArgument)
        },
        _resetBehaviors: function() {
            this._diffBehaviors({}, this.props.behaviors)
        },
        updateBehaviors: function(a, b) {
            this._diffBehaviors(a, b)
        },
        _diffBehaviors: function(a, c) {
            a = this.getEffectiveBehaviors(a), c = this.getEffectiveBehaviors(c), b("ReactLayerCommon").diffBehaviors(a, c, this.layer)
        },
        getEffectiveBehaviors: function(a) {
            return !this.getDefaultEnabledBehaviors ? a || {} : babelHelpers["extends"]({}, this.getDefaultEnabledBehaviors(), a)
        },
        layerSubscribe: function(a, c) {
            b("ReactLayerCommon").layerSubscribe(this.layer, this.layerSubscriptions, a, c, this._stackDEVTemporaryDoNotUse || null)
        }
    };
    c = {
        createClass: function(a) {
            return b("React").createClass({
                mixins: [h, a]
            })
        }
    };
    e.exports = c
}), null);
__d("ContextualLayer.react", ["ContextualLayer", "React", "ReactBrowserEventEmitter_DO_NOT_USE", "ReactDOM", "ReactLayer", "Style", "warning"], (function(a, b, c, d, e, f) {
    __p && __p();
    a = b("React").PropTypes;
    c = b("ReactLayer").createClass({
        propTypes: {
            contextRef: a.func,
            context: function(a, c, d) {
                if (a.context == null == (a.contextRef == null)) return new Error("Exactly one of `context` or `contextRef` must be set on `" + (d + "`."));
                a = a[c];
                if (a != null) {
                    if (typeof a !== "object") return new Error("Invalid `" + c + "` supplied to `" + d + "`, expected a React component.");
                    if (b("React").isValidElement(a)) return new Error("Invalid `" + c + "` supplied to `" + d + "`, expected a React component instance. You're passing a React descriptor.")
                }
            }
        },
        immutableProps: {
            modal: null
        },
        createLayer: function(a) {
            __p && __p();
            var c = this._getContextNode(),
                d = {
                    context: c,
                    contextBounds: this.props.contextBounds,
                    "data-testid": this.props["data-testid"],
                    position: this.props.position,
                    alignment: this.props.alignment,
                    offsetX: this.props.offsetX,
                    offsetY: this.props.offsetY,
                    addedBehaviors: this.enumerateBehaviors(this.props.behaviors),
                    shouldSetARIAProperties: this.props.shouldSetARIAProperties
                };
            d = new(b("ContextualLayer"))(d, a);
            this._node = a;
            this._matchContextSize(this.props);
            this.props.contextBounds && d.setContextWithBounds(c, this.props.contextBounds);
            this._resizeSubscription = d.subscribe("resize", function(a, c) {
                a = b("ReactBrowserEventEmitter_DO_NOT_USE").isEnabled();
                a && (this.props.onResize && this.props.onResize(c))
            }.bind(this));
            d.conditionShow(this.props.shown);
            return d
        },
        componentWillUnmount: function() {
            this._resizeSubscription && (this._resizeSubscription.unsubscribe(), this._resizeSubscription = null)
        },
        receiveProps: function(a, b) {
            this.updateBehaviors(b.behaviors, a.behaviors);
            b = this._getContextNode();
            a.contextBounds ? this.layer.setContextWithBounds(b, a.contextBounds) : this.layer.setContext(b);
            this._matchContextSize(a);
            this.layer.setPosition(a.position);
            this.layer.setAlignment(a.alignment);
            this.layer.setOffsetX(a.offsetX);
            this.layer.setOffsetY(a.offsetY);
            this.layer.conditionShow(a.shown)
        },
        getDefaultEnabledBehaviors: function() {
            return b("ContextualLayer").getDefaultBehaviorsAsObject()
        },
        _getContextNode: function() {
            var a;
            this.props.context ? a = b("ReactDOM").findDOMNode(this.props.context) : this.props.contextRef && (a = b("ReactDOM").findDOMNode(this.props.contextRef()));
            return a
        },
        _matchContextSize: function(a) {
            var c = this._node,
                d = this._getContextNode();
            a.containerWidthMatchContext && b("Style").set(c, "width", d.offsetWidth + "px");
            a.containerHeightMatchContext && b("Style").set(c, "height", d.offsetHeight + "px")
        }
    });
    e.exports = c
}), null);
__d("AccessibleLayer", ["fbt", "DOM", "Event", "Focus"], (function(a, b, c, d, e, f, g) {
    __p && __p();

    function a(a) {
        "use strict";
        this._layer = a, this._listener = null
    }
    a.prototype.enable = function() {
        "use strict";
        this._afterShowSubscription = this._layer.subscribe("aftershow", this._onAfterShow.bind(this)), this._afterHideSubscription = this._layer.subscribe("hide", this._onAfterHide.bind(this))
    };
    a.prototype.disable = function() {
        "use strict";
        this._listener && this._listener.remove(), this._afterShowSubscription.unsubscribe(), this._listener = this._afterShowSubscription = null
    };
    a.prototype._closeListener = function(a) {
        "use strict";
        a = this._layer.getCausalElement();
        a && (a.tabIndex == null ? (a.tabIndex = -1, b("Focus").setWithoutOutline(a)) : b("Focus").set(a));
        this._layer.hide()
    };
    a.prototype._setupCloseButton = function() {
        "use strict";
        var a = this._layer.getContentRoot(),
            c = b("DOM").scry(a, ".layer_close_elem")[0];
        c || (c = b("DOM").create("a", {
            className: "accessible_elem layer_close_elem",
            href: "#",
            role: "button"
        }, [g._("Close popup and return")]), b("DOM").appendContent(a, c));
        this._listener = b("Event").listen(c, "click", this._closeListener.bind(this))
    };
    a.prototype._onAfterShow = function() {
        "use strict";
        this._listener || this._setupCloseButton()
    };
    a.prototype._onAfterHide = function() {
        "use strict";
        this._listener && this._listener.remove(), this._listener = null
    };
    e.exports = a
}), null);
__d("ContextualDialogARIA", ["DOM", "getOrCreateDOMID"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        "use strict";
        this._layer = a
    }
    a.prototype.enable = function() {
        "use strict";
        this._subscription = this._layer.subscribe("beforeshow", this._addAriaAttribute.bind(this))
    };
    a.prototype.disable = function() {
        "use strict";
        this._subscription.unsubscribe(), this._subscription = null
    };
    a.prototype._addAriaAttribute = function() {
        "use strict";
        var a = this._layer.getCausalElement();
        if (!a) return;
        var c = b("DOM").scry(this._layer.getRoot(), ".accessible_elem");
        c.length && a.setAttribute("aria-describedby", b("getOrCreateDOMID")(c[0]))
    };
    e.exports = a
}), null);
__d("abstractMethod", ["invariant"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a, b) {
        g(0, 1537, a, b)
    }
    e.exports = a
}), null);
__d("AbstractContextualDialogArrowBehavior", ["cx", "CSS", "DOM", "Locale", "Style", "Vector", "abstractMethod"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h = {
            bottom: "_53ik",
            top: "_53il",
            right: "_53im",
            left: "_53in"
        },
        i = {
            above: "bottom",
            below: "top",
            left: "right",
            right: "left"
        };

    function j(a) {
        "use strict";
        this.__layer = this._layer = a
    }
    j.prototype.enable = function() {
        "use strict";
        this._subscription = this._layer.subscribe(["adjust", "reposition"], this._handle.bind(this))
    };
    j.prototype.disable = function() {
        "use strict";
        this._subscription.unsubscribe(), this._subscription = null
    };
    j.prototype.__getArrow = function() {
        "use strict";
        return b("abstractMethod")("AbstractContextualDialogArrowBehavior", "__getArrow")
    };
    j.prototype._handle = function(a, b) {
        "use strict";
        a === "adjust" ? this._repositionArrow(b) : this._repositionRoot(b)
    };
    j.prototype._repositionRoot = function(a) {
        "use strict";
        __p && __p();
        var c = a.getAlignment();
        if (c == "center") return;
        var d = this._layer.getRoot(),
            e = this._layer.getContext();
        a = a.isVertical();
        var f = this._layer.getArrowDimensions(),
            g = f.offset;
        f = f.length;
        e = b("Vector").getElementDimensions(e);
        e = a ? e.x : e.y;
        if (e >= f + g * 2) return;
        f = f / 2 + g;
        g = e / 2;
        e = parseInt(f - g, 10);
        if (a) {
            f = null;
            c == "left" ? f = b("Locale").isRTL() ? "right" : "left" : f = b("Locale").isRTL() ? "left" : "right";
            g = parseInt(b("Style").get(d, f), 10);
            b("Style").set(d, f, g - e + "px")
        } else {
            a = parseInt(b("Style").get(d, "top"), 10);
            b("Style").set(d, "top", a - e + "px")
        }
    };
    j.prototype._repositionArrow = function(a) {
        "use strict";
        __p && __p();
        var c = this._layer.getContentRoot(),
            d = a.getPosition(),
            e = i[d];
        for (var f in h) b("CSS").conditionClass(c, h[f], e === f);
        if (d == "none") return;
        this._arrow || (this._arrow = this.__getArrow());
        b("DOM").contains(c, this._arrow) || b("DOM").appendContent(c, this._arrow);
        b("Style").set(this._arrow, "top", "");
        b("Style").set(this._arrow, "left", "");
        b("Style").set(this._arrow, "right", "");
        b("Style").set(this._arrow, "margin", "");
        e = j.getOffsetPercent(a);
        d = j.getOffset(a, e, this._layer);
        c = j.getOffsetSide(a);
        b("Style").set(this._arrow, c, e + "%");
        b("Style").set(this._arrow, "margin-" + c, d + "px")
    };
    j.getOffsetPercent = function(a) {
        "use strict";
        var b = a.getAlignment();
        a = a.getPosition();
        if (a == "above" || a == "below")
            if (b == "center") return 50;
            else if (b == "right") return 100;
        return 0
    };
    j.getOffsetSide = function(a) {
        "use strict";
        a = a.isVertical();
        return a ? b("Locale").isRTL() ? "right" : "left" : "top"
    };
    j.getOffset = function(a, b, c) {
        "use strict";
        c = c.getArrowDimensions();
        var d = c.offset;
        c = c.length;
        a = a.getAlignment();
        d = a == "center" ? 0 : d;
        d += c * b / 100;
        a != "left" && (d *= -1);
        return d
    };
    e.exports = j
}), null);
__d("flattenArray", [], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        var b = [];
        g(a, b);
        return b
    }

    function g(a, b) {
        var c = a.length,
            d = 0;
        while (c--) {
            var e = a[d++];
            Array.isArray(e) ? g(e, b) : b.push(e)
        }
    }
    e.exports = a
}), null);
__d("JSXDOM", ["DOM", "FbtResultBase", "flattenArray"], (function(a, b, c, d, e, f) {
    __p && __p();
    a = ["a", "blockquote", "br", "button", "canvas", "checkbox", "dd", "div", "dl", "dt", "em", "form", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "iframe", "img", "input", "label", "li", "option", "p", "pre", "select", "span", "strong", "table", "tbody", "thead", "td", "textarea", "th", "tr", "ul", "video"];
    var g = {};
    a.forEach(function(a) {
        var c = function(c, d) {
            arguments.length > 2 && (d = Array.prototype.slice.call(arguments, 1));
            !d && c && (d = c.children, delete c.children);
            d && (d = Array.isArray(d) ? d : [d], d = d.map(function(a) {
                return a instanceof b("FbtResultBase") ? a.flattenToArray() : a
            }), d = b("flattenArray")(d));
            return b("DOM").create(a, c, d)
        };
        g[a] = c
    });
    e.exports = g
}), null);
__d("ContextualDialogArrow", ["cx", "AbstractContextualDialogArrowBehavior", "CSS", "JSXDOM"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h, i;
    h = babelHelpers.inherits(a, b("AbstractContextualDialogArrowBehavior"));
    i = h && h.prototype;
    a.prototype.__getArrow = function() {
        "use strict";
        return b("JSXDOM").i({
            className: "_53io"
        })
    };
    a.prototype.enable = function() {
        "use strict";
        i.enable.call(this);
        var a = this.__layer.getContentRoot();
        b("CSS").addClass(a, "_5v-0")
    };
    a.prototype.disable = function() {
        "use strict";
        i.disable.call(this);
        var a = this.__layer.getContentRoot();
        b("CSS").removeClass(a, "_5v-0")
    };

    function a() {
        "use strict";
        h.apply(this, arguments)
    }
    e.exports = a
}), null);
__d("ContextualDialogDefaultTheme", ["cx"], (function(a, b, c, d, e, f, g) {
    a = {
        wrapperClassName: "_53ip",
        arrowDimensions: {
            offset: 15,
            length: 16
        }
    };
    e.exports = a
}), null);
__d("ContextualDialogFitInViewport_PUSHSAFE", ["Style", "Vector"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = 50,
        h = 10;

    function a(a) {
        "use strict";
        this._layer = a, this._contentHeight = null, this._contextY = null
    }
    a.prototype.enable = function() {
        "use strict";
        var a = this._layer.getArrowDimensions();
        this._arrowOffset = a.offset;
        a = a.length;
        this._arrowBuffer = this._arrowOffset + a;
        this._subscription = this._layer.subscribe(["reposition"], function(a, b) {
            if (!this._layer.isFixed() || b.isVertical()) return;
            this._adjustPosition()
        }.bind(this))
    };
    a.prototype.disable = function() {
        "use strict";
        this._subscription.unsubscribe(), this._subscription = null
    };
    a.prototype._getContentHeight = function() {
        "use strict";
        return b("Vector").getElementDimensions(this._layer._contentWrapper).y
    };
    a.prototype._getContextY = function() {
        "use strict";
        return b("Vector").getElementPosition(this._layer.getContext(), "viewport").y
    };
    a.prototype._adjustPosition = function() {
        "use strict";
        var a = this._getContextY(),
            c = this._getContentHeight();
        if (a === this._contextY && c === this._contentHeight) return;
        this._contextY = a;
        this._contentHeight = c;
        var d = b("Vector").getViewportDimensions().y;
        d = Math.min(Math.max(0, a + c + h - d), Math.max(0, a - g), c - this._arrowOffset - this._arrowBuffer);
        b("Style").set(this._layer.getContent(), "top", -d + "px")
    };
    e.exports = a
}), null);
__d("LayerBounds", ["Locale", "Rect", "ViewportBounds", "containsNode", "ge", "getOverlayZIndex"], (function(a, b, c, d, e, f) {
    a = {
        getViewportRectForContext: function(a) {
            var c = b("ge")("globalContainer");
            c = c && b("containsNode")(c, a) || b("getOverlayZIndex")(a) < 300;
            a = b("Rect").getViewportWithoutScrollbarsBounds();
            c && (a.t += b("ViewportBounds").getTop(), b("Locale").isRTL() ? (a.r -= b("ViewportBounds").getLeft(), a.l += b("ViewportBounds").getRight()) : (a.r -= b("ViewportBounds").getRight(), a.l += b("ViewportBounds").getLeft()));
            return a
        }
    };
    e.exports = a
}), null);
__d("ContextualLayerDimensions", ["LayerBounds", "Locale", "Rect", "Vector"], (function(a, b, c, d, e, f) {
    __p && __p();
    a = {
        getViewportRect: function(a) {
            return b("LayerBounds").getViewportRectForContext(a.getContext())
        },
        getLayerRect: function(a, c) {
            __p && __p();
            var d = a.getContextBounds("viewport"),
                e = a.simulateOrientation(c, function() {
                    return b("Vector").getElementDimensions(a.getContentRoot())
                }),
                f = d.t + c.getOffsetY();
            c.getPosition() === "above" ? f -= e.y : c.getPosition() === "below" && (f += d.b - d.t);
            var g = d.l + c.getOffsetX();
            d = d.r - d.l;
            if (c.isVertical()) {
                var h = c.getAlignment();
                h === "center" ? g += (d - e.x) / 2 : h === "right" !== b("Locale").isRTL() ? g += d - e.x + c.getArrowOffset() : g -= c.getArrowOffset()
            } else c.getPosition() === "right" !== b("Locale").isRTL() ? g += d : g -= e.x;
            return new(b("Rect"))(f, g + e.x, f + e.y, g, "viewport")
        }
    };
    e.exports = a
}), null);
__d("AbstractContextualDialogKeepInViewportBehavior", ["ContextualLayerDimensions", "Event", "Vector", "abstractMethod", "throttle"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        "use strict";
        this._layer = a, this._listeners = [], this._subscription = null, this._minimumTop = null
    }
    a.prototype.enable = function() {
        "use strict";
        __p && __p();
        var a = this._layer.getArrowDimensions();
        this._arrowOffset = a.offset;
        a = a.length;
        this._arrowBuffer = this._arrowOffset + a;
        this._subscription = this._layer.subscribe(["show", "hide", "reposition"], function(a, b) {
            if (this._layer.isFixed()) return;
            a == "reposition" ? (this._calculateMinimumTop(b), this._adjustForScroll()) : a == "show" ? (this._attachScroll(), this._adjustForScroll()) : this._detachScroll()
        }.bind(this));
        this._layer.isShown() && this._attachScroll()
    };
    a.prototype.disable = function() {
        "use strict";
        this._layer.isShown() && this._detachScroll(), this._subscription.unsubscribe(), this._subscription = null
    };
    a.prototype.__adjustForScroll = function(a, c) {
        "use strict";
        return b("abstractMethod")("AbstractContextualDialogArrowBehavior", "__adjustForScroll")
    };
    a.prototype._attachScroll = function() {
        "use strict";
        var a = b("throttle")(this._adjustForScroll.bind(this)),
            c = this._layer.getContextScrollParent() || window;
        this._listeners = [b("Event").listen(c, "scroll", a), b("Event").listen(window, "resize", a)]
    };
    a.prototype._detachScroll = function() {
        "use strict";
        while (this._listeners.length) this._listeners.pop().remove();
        this._listeners = []
    };
    a.prototype._getContentHeight = function() {
        "use strict";
        return !this._layer._contentWrapper ? 0 : b("Vector").getElementDimensions(this._layer._contentWrapper).y
    };
    a.prototype._getContextY = function() {
        "use strict";
        return b("Vector").getElementPosition(this._layer.getContext()).y
    };
    a.prototype._calculateMinimumTop = function(a) {
        "use strict";
        if (a.isVertical()) return;
        this._minimumTop = this._getContextY() - (this._getContentHeight() - this._arrowBuffer) + a.getOffsetY()
    };
    a.prototype._adjustForScroll = function() {
        "use strict";
        __p && __p();
        var a = this._layer.getOrientation(),
            c = this._layer.getContent();
        if (a.isVertical() || !c) return;
        a = b("ContextualLayerDimensions").getViewportRect(this._layer);
        c = a.b - this._minimumTop;
        if (c < 0) return;
        a = this._getContentHeight();
        var d = a - (this._arrowBuffer + this._arrowOffset);
        d = Math.max(0, Math.min(d, d - (c - a)));
        this.__adjustForScroll(this._layer, d)
    };
    e.exports = a
}), null);
__d("ContextualDialogKeepInViewport", ["AbstractContextualDialogKeepInViewportBehavior", "Style"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g;
    g = babelHelpers.inherits(a, b("AbstractContextualDialogKeepInViewportBehavior"));
    g && g.prototype;
    a.prototype.__adjustForScroll = function(a, c) {
        "use strict";
        a = a.getContent();
        b("Style").set(a, "top", -c + "px")
    };

    function a() {
        "use strict";
        g.apply(this, arguments)
    }
    e.exports = a
}), null);
__d("LayerButtons", ["csx", "Button", "Event", "LayerHideSources", "Parent"], (function(a, b, c, d, e, f, g) {
    __p && __p();

    function a(a) {
        "use strict";
        this._layer = a
    }
    a.prototype.enable = function() {
        "use strict";
        this._listener = b("Event").listen(this._layer.getRoot(), "click", this._handle.bind(this))
    };
    a.prototype.disable = function() {
        "use strict";
        this._listener.remove(), this._listener = null
    };
    a.prototype._handle = function(a) {
        "use strict";
        __p && __p();
        var c = a.getTarget(),
            d = b("Parent").byClass(c, "layerHide");
        if (d) {
            this._layer.hide(b("LayerHideSources").LAYER_HIDE_BUTTON);
            return
        }
        d = b("Parent").byClass(c, "layerConfirm");
        if (d) {
            if (this._isButton(d) && !b("Button").isEnabled(d)) return;
            if (this._isInNestedLayer(d)) return;
            this._layer.inform("confirm", d) === !1 && a.prevent();
            return
        }
        d = b("Parent").byClass(c, "layerCancel");
        if (d) {
            if (this._isButton(d) && !b("Button").isEnabled(d)) return;
            if (this._isInNestedLayer(d)) return;
            this._layer.inform("cancel", d) !== !1 && this._layer.hide(b("LayerHideSources").LAYER_CANCEL_BUTTON);
            a.prevent();
            return
        }
        d = b("Parent").byClass(c, "layerButton");
        if (d) {
            if (this._isButton(d) && !b("Button").isEnabled(d)) return;
            if (this._isInNestedLayer(d)) return;
            this._layer.inform("button", d) === !1 && a.prevent()
        }
    };
    a.prototype._isInNestedLayer = function(a) {
        "use strict";
        a = b("Parent").byClass(a, "uiLayer");
        var c = this._layer.getRoot();
        return !!(a && c !== a)
    };
    a.prototype._isButton = function(a) {
        "use strict";
        return !!(b("Parent").byClass(a, "uiButton") || b("Parent").bySelector(a, "._42ft"))
    };
    a.prototype._listener = null;
    e.exports = a
}), null);
__d("LayerFormHooks", ["Event"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        "use strict";
        this._layer = a
    }
    a.prototype.enable = function() {
        "use strict";
        var a = this._layer.getRoot();
        this._subscriptions = [b("Event").listen(a, "submit", this._onSubmit.bind(this)), b("Event").listen(a, "success", this._onSuccess.bind(this)), b("Event").listen(a, "error", this._onError.bind(this))]
    };
    a.prototype.disable = function() {
        "use strict";
        this._subscriptions.forEach(function(a) {
            a.remove()
        }), this._subscriptions = null
    };
    a.prototype._onSubmit = function(a) {
        "use strict";
        this._layer.inform("submit", a) === !1 && a.kill()
    };
    a.prototype._onSuccess = function(a) {
        "use strict";
        this._layer.inform("success", a) === !1 && a.kill()
    };
    a.prototype._onError = function(a) {
        "use strict";
        var b = a.getData();
        this._layer.inform("error", {
            response: b.response
        }) === !1 && a.kill()
    };
    Object.assign(a.prototype, {
        _subscriptions: null
    });
    e.exports = a
}), null);
__d("LayerMouseHooks", ["Arbiter", "ContextualThing", "Event", "Layer"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = new(b("Arbiter"))();

    function a(a) {
        "use strict";
        this._layer = a, this._subscriptions = [], this._currentlyActive = !1
    }
    a.prototype.enable = function() {
        "use strict";
        this._subscriptions = [g.subscribe("mouseenter", this._handleActive.bind(this)), g.subscribe("mouseleave", this._handleInactive.bind(this)), this._layer.subscribe("hide", function() {
            this._currentlyActive = !1
        }.bind(this))]
    };
    a.prototype.disable = function() {
        "use strict";
        while (this._subscriptions.length) this._subscriptions.pop().unsubscribe();
        this._subscriptions = [];
        this._currentlyActive = !1
    };
    a.prototype._handleActive = function(a, b) {
        "use strict";
        !this._currentlyActive && this._isNodeWithinStack(b) && (this._layer.inform("mouseenter", b), this._currentlyActive = !0)
    };
    a.prototype._handleInactive = function(a, b) {
        "use strict";
        this._currentlyActive && ((!b || !this._isNodeWithinStack(b)) && (this._layer.inform("mouseleave", b), this._currentlyActive = !1))
    };
    a.prototype._isNodeWithinStack = function(a) {
        "use strict";
        return b("ContextualThing").containsIncludingLayers(this._layer.getContentRoot(), a)
    };
    b("Layer").subscribe("show", function(a, c) {
        var d = c.getContentRoot(),
            e = [b("Event").listen(d, "mouseenter", function() {
                g.inform("mouseenter", d)
            }), b("Event").listen(d, "mouseleave", function(a) {
                g.inform("mouseleave", a.getRelatedTarget())
            })],
            f = c.subscribe("hide", function() {
                while (e.length) e.pop().remove();
                f.unsubscribe();
                e = f = null
            })
    });
    e.exports = a
}), null);
__d("LayerRefocusOnHide", ["ContextualThing", "DOM", "DOMQuery", "Focus", "Parent", "getActiveElement"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        "use strict";
        this._layer = a
    }
    a.prototype.enable = function() {
        "use strict";
        this._subscription = this._layer.subscribe("hide", this._handle.bind(this))
    };
    a.prototype.disable = function() {
        "use strict";
        this._subscription.unsubscribe(), this._subscription = null
    };
    a.prototype._handle = function(a, c) {
        "use strict";
        __p && __p();
        a = b("getActiveElement")();
        if (a === document.body || b("DOMQuery").contains(this._layer.getRoot(), a)) {
            c = this._layer.getCausalElement();
            while (c && !c.offsetWidth) {
                a = b("Parent").byClass(c, "uiToggle");
                if (a && a.offsetWidth) c = b("DOM").scry(a, '[rel="toggle"]')[0];
                else {
                    a = b("ContextualThing").getContext(c);
                    a ? c = a : c = c.parentNode
                }
            }
            c && b("Focus").set(c)
        }
    };
    Object.assign(a.prototype, {
        _subscription: null
    });
    e.exports = a
}), null);
__d("shield", [], (function(a, b, c, d, e, f) {
    function a(a, b) {
        for (var c = arguments.length, d = new Array(c > 2 ? c - 2 : 0), e = 2; e < c; e++) d[e - 2] = arguments[e];
        if (typeof a !== "function") throw new TypeError("shield expects a function as the first argument");
        return function() {
            return a.apply(b, d)
        }
    }
    e.exports = a
}), null);
__d("ContextualDialog", ["csx", "cx", "invariant", "AccessibleLayer", "ContextualDialogARIA", "ContextualDialogArrow", "ContextualDialogDefaultTheme", "ContextualDialogFitInViewport_PUSHSAFE", "ContextualDialogKeepInViewport", "ContextualLayer", "CSS", "DOM", "Event", "JSXDOM", "LayerButtons", "LayerFormHooks", "LayerHideOnTransition", "LayerMouseHooks", "LayerRefocusOnHide", "Style", "removeFromArray", "shield"], (function(a, b, c, d, e, f, g, h, i) {
    __p && __p();
    var j, k = 0,
        l = 300;
    c = babelHelpers.inherits(a, b("ContextualLayer"));
    j = c && c.prototype;

    function a(a, b) {
        "use strict";
        j.constructor.call(this, a, b), this._footer = null
    }
    a.prototype._configure = function(a, c) {
        "use strict";
        Object.assign(a, a.theme || b("ContextualDialogDefaultTheme"));
        var d = a.arrowBehavior || b("ContextualDialogArrow");
        a.addedBehaviors = a.addedBehaviors || [];
        a.addedBehaviors.push(d);
        j._configure.call(this, a, c);
        this._footer = b("DOM").scry(c, "div._572u")[0];
        this._footer && (this._footer.children.length === 1 && this._footer.children[0].nodeName === "DIV" && this._footer.children[0].children.length === 0 ? this._footer.parentNode.removeChild(this._footer) : b("CSS").addClass(this.getContentRoot(), "_kc"));
        a.hoverContext && this._registerHoverHandlers(a.hoverContext, a.hoverShowDelay, a.hoverHideDelay)
    };
    a.prototype._registerHoverHandlers = function(a, c, d) {
        "use strict";
        __p && __p();
        var e = c,
            f = d;
        e == null && (e = k);
        f == null && (f = l);
        var g, h;
        c = function(a) {
            clearTimeout(h), g = setTimeout(b("shield")(this.show, this), e)
        }.bind(this);
        d = function(a) {
            if (this._isHoverLocked()) return;
            clearTimeout(g);
            h = setTimeout(this.hide.bind(this), f)
        }.bind(this);
        var i = b("Event").listen(a, "mouseenter", c),
            j = b("Event").listen(a, "mouseleave", d),
            m = this.subscribe("mouseenter", c),
            n = this.subscribe("mouseleave", d);
        this.subscribe("destroy", function() {
            clearTimeout(h), i.remove(), j.remove(), m.unsubscribe(), n.unsubscribe()
        })
    };
    a.prototype._getDefaultBehaviors = function() {
        "use strict";
        var a = j._getDefaultBehaviors.call(this);
        b("removeFromArray")(a, b("LayerHideOnTransition"));
        return a.concat([b("AccessibleLayer"), b("LayerRefocusOnHide"), b("ContextualDialogKeepInViewport"), b("ContextualDialogFitInViewport_PUSHSAFE"), b("LayerButtons"), b("LayerFormHooks"), b("LayerMouseHooks"), b("ContextualDialogARIA")])
    };
    a.prototype._buildWrapper = function(a, c) {
        "use strict";
        __p && __p();
        this._innerWrapper = b("JSXDOM").div(null, c);
        var d = j._buildWrapper.call(this, a, this._innerWrapper);
        if (a.wrapperClassName) {
            var e = a.wrapperClassName.split(/\s+/);
            for (var e = e, f = Array.isArray(e), g = 0, e = f ? e : e[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var h;
                if (f) {
                    if (g >= e.length) break;
                    h = e[g++]
                } else {
                    g = e.next();
                    if (g.done) break;
                    h = g.value
                }
                h = h;
                b("CSS").addClass(d, h)
            }
        }
        this.replaceEntireLayerContents(c);
        this.getContent() === c || i(0, 5783);
        this.setWidth(a.width);
        return d
    };
    a.prototype.getContentRoot = function() {
        "use strict";
        !this._innerWrapper && i(0, 5784);
        return this._innerWrapper
    };
    a.prototype.setContent = function(a) {
        "use strict";
        i(0, 5785)
    };
    a.prototype.replaceEntireLayerContents = function(a) {
        "use strict";
        this._content = null, b("DOM").empty(this.getContentRoot()), this.setInnerContent(a)
    };
    a.prototype.setInnerContent = function(a) {
        "use strict";
        b("CSS").addClass(a, "_53ij"), this.getContent() ? b("DOM").replace(this.getContent(), a) : b("DOM").appendContent(this.getContentRoot(), a), this._content = a, this.isShown() && this.updatePosition()
    };
    a.prototype.setWidth = function(a) {
        "use strict";
        b("Style").set(this.getContentRoot(), "width", a ? Math.floor(a) + "px" : "");
        return this
    };
    a.prototype.getFooter = function() {
        "use strict";
        return this._footer
    };
    a.prototype.lockHover = function() {
        "use strict";
        this._hoverLocked = !0;
        return this
    };
    a.prototype.unlockHover = function() {
        "use strict";
        this._hoverLocked = !1;
        return this
    };
    a.prototype._isHoverLocked = function() {
        "use strict";
        return !!this._hoverLocked
    };
    a.setContext = function(a, b) {
        "use strict";
        a.setContext(b)
    };
    e.exports = a
}), null);
__d("focusWithinLayer", ["DOMQuery", "Focus", "TabbableElements", "getActiveElement"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a, c) {
        __p && __p();
        var d = b("DOMQuery").scry(a, ".autofocus")[0],
            e = !0;
        if (!d) {
            var f = b("getActiveElement")();
            if (b("DOMQuery").isNodeOfType(f, ["input", "textarea"])) return;
            f = b("TabbableElements").find(a);
            for (var g = 0; g < f.length; g++) {
                var h = f[g];
                if (h.tagName !== "A" || h.getAttribute("role") === "button") {
                    d = f[g];
                    break
                }
            }
        } else d.tabIndex !== 0 && (e = !1);
        d ? e ? b("Focus").set(d, c) : b("Focus").setWithoutOutline(d) : a.offsetWidth || (a.tabIndex = -1, b("Focus").setWithoutOutline(a))
    }
    e.exports = a
}), null);
__d("LayerAutoFocus", ["focusWithinLayer"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        "use strict";
        this._layer = a, this._subscription = null
    }
    a.prototype.enable = function() {
        "use strict";
        this._subscription = this._layer.subscribe("aftershow", this._focus.bind(this))
    };
    a.prototype.disable = function() {
        "use strict";
        this._subscription.unsubscribe(), this._subscription = null
    };
    a.prototype._focus = function() {
        "use strict";
        var a = this._layer.getRoot();
        a && b("focusWithinLayer")(a)
    };
    e.exports = a
}), null);
__d("LayerHideOnBlur", ["LayerHideSources", "requestAnimationFrame"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        "use strict";
        this._layer = a
    }
    a.prototype.enable = function() {
        "use strict";
        this._subscriptions = [this._layer.subscribe("show", this._attach.bind(this)), this._layer.subscribe("hide", this._detach.bind(this))], this._layer.isShown() && this._attach()
    };
    a.prototype.disable = function() {
        "use strict";
        this._detach();
        while (this._subscriptions && this._subscriptions.length) this._subscriptions.pop().unsubscribe();
        this._subscriptions = null
    };
    a.prototype._detach = function() {
        "use strict";
        this._onBlur && this._onBlur.unsubscribe(), this._onBlur = null
    };
    a.prototype._attach = function() {
        "use strict";
        this._onBlur = this._layer.subscribe("blur", function() {
            b("requestAnimationFrame")(function() {
                this._layer.hide(b("LayerHideSources").BLUR)
            }.bind(this));
            return !1
        }.bind(this))
    };
    Object.assign(a.prototype, {
        _subscriptions: null,
        _onBlur: null
    });
    e.exports = a
}), null);
__d("LayerHideOnEscape", ["Event", "Keys", "LayerHideSources"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        "use strict";
        this._layer = a
    }
    a.prototype.enable = function() {
        "use strict";
        this._subscription = this._layer.subscribe("key", this._handle.bind(this))
    };
    a.prototype.disable = function() {
        "use strict";
        this._subscription != null && this._subscription.unsubscribe(), this._subscription = null
    };
    a.prototype._handle = function(a, c) {
        "use strict";
        if (b("Event").getKeyCode(c) === b("Keys").ESC) {
            this._layer.hide(b("LayerHideSources").ESCAPE);
            return !1
        }
        return void 0
    };
    Object.assign(a.prototype, {
        _subscription: null
    });
    e.exports = a
}), null);
__d("ReactAbstractContextualDialog", ["ContextualDialog", "ContextualDialogArrow", "ContextualDialogKeepInViewport", "LayerAutoFocus", "LayerHideOnBlur", "LayerHideOnEscape", "LayerRefocusOnHide", "React", "ReactDOM"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = b("React").PropTypes;
    a = {
        createSpec: function(a) {
            __p && __p();
            return {
                displayName: a.displayName,
                propTypes: {
                    position: g.oneOf(["above", "below", "left", "right"]),
                    alignment: g.oneOf(["left", "center", "right"]),
                    offsetX: g.number,
                    offsetY: g.number,
                    width: g.number,
                    autoFocus: g.bool,
                    focusContextOnHide: g.bool,
                    arrowBehavior: g.func,
                    behaviors: g.object,
                    shown: g.bool,
                    context: g.object,
                    contextRef: g.func,
                    dialogRole: g.oneOf(["dialog", "region", "alert"]),
                    hoverContext: g.object,
                    hoverContextRef: g.func,
                    hoverShowDelay: g.number,
                    hoverHideDelay: g.number,
                    hideOnBlur: g.bool,
                    hideOnEscape: g.bool,
                    insertParent: g.object,
                    keepInViewport: g.bool,
                    label: g.node,
                    labelledBy: g.string,
                    onBeforeHide: g.func,
                    onToggle: g.func,
                    hasActionableContext: g.bool,
                    "data-testid": g.string
                },
                immutableProps: {
                    modal: null
                },
                createLayer: function(c) {
                    __p && __p();
                    var d = this.props.context || b("ReactDOM").findDOMNode(this.props.contextRef()),
                        e = this.props.hoverContext || this.props.hoverContextRef && b("ReactDOM").findDOMNode(this.props.hoverContextRef());
                    this.isHoverContextSet = e != null;
                    e = babelHelpers["extends"]({
                        context: d,
                        hoverContext: e,
                        hoverShowDelay: this.props.hoverShowDelay,
                        hoverHideDelay: this.props.hoverHideDelay,
                        position: this.props.position,
                        alignment: this.props.alignment,
                        offsetX: this.props.offsetX,
                        offsetY: this.props.offsetY,
                        width: this.props.width,
                        dialogRole: this.props.dialogRole,
                        label: this.props.label,
                        labelledBy: this.props.labelledBy,
                        shouldSetARIAProperties: !this.props.hasActionableContext,
                        arrowBehavior: this.props.arrowBehavior || b("ContextualDialogArrow"),
                        addedBehaviors: this.enumerateBehaviors(this.props.behaviors),
                        "data-testid": this.props["data-testid"]
                    }, a || {});
                    e = new(b("ContextualDialog"))(e, c);
                    this.props.contextBounds && e.setContextWithBounds(d, this.props.contextBounds);
                    this.props.autoFocus !== !1 && e.enableBehavior(b("LayerAutoFocus"));
                    this.props.hideOnBlur === !0 && e.enableBehavior(b("LayerHideOnBlur"));
                    this.props.hideOnEscape === !0 && e.enableBehavior(b("LayerHideOnEscape"));
                    this.props.focusContextOnHide === !1 && e.disableBehavior(b("LayerRefocusOnHide"));
                    this.props.keepInViewport === !1 && e.disableBehavior(b("ContextualDialogKeepInViewport"));
                    this.props.onBeforeHide && e.subscribe("beforehide", this.props.onBeforeHide);
                    this.props.insertParent && e.setInsertParent(this.props.insertParent);
                    e.conditionShow(this.props.shown);
                    return e
                },
                receiveProps: function(a, c) {
                    this.updateBehaviors(c.behaviors, a.behaviors);
                    var d = a.context || a.contextRef && b("ReactDOM").findDOMNode(a.contextRef());
                    d && (a.contextBounds ? this.layer.setContextWithBounds(d, a.contextBounds) : this.layer.setContext(d));
                    c.hideOnEscape !== a.hideOnEscape && (a.hideOnEscape ? this.layer.enableBehavior(b("LayerHideOnEscape")) : this.layer.disableBehavior(b("LayerHideOnEscape")));
                    this.layer.setPosition(a.position).setAlignment(a.alignment).setOffsetX(a.offsetX).setOffsetY(a.offsetY).setWidth(a.width);
                    (!this.isHoverContextSet || a.shown !== void 0) && this.layer.conditionShow(a.shown)
                }
            }
        }
    };
    e.exports = a
}), null);
__d("InlineBlock.react", ["cx", "React", "joinClasses"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h;
    c = b("React").PropTypes;
    var i = {
        baseline: null,
        bottom: "_6d",
        middle: "_6b",
        top: "_6e"
    };
    h = babelHelpers.inherits(a, b("React").Component);
    h && h.prototype;
    a.prototype.render = function() {
        "use strict";
        __p && __p();
        var a = this.props,
            c = a.alignv,
            d = a.height,
            e = a.fullWidth;
        a = babelHelpers.objectWithoutPropertiesLoose(a, ["alignv", "height", "fullWidth"]);
        c = i[c];
        e = "_6a" + (e ? " _5u5j" : "");
        var f = b("joinClasses")(e, c);
        if (d != null) {
            c = b("React").createElement("div", {
                className: b("joinClasses")("_6a", c),
                style: {
                    height: d + "px"
                }
            });
            return b("React").createElement("div", babelHelpers["extends"]({}, a, {
                className: b("joinClasses")(this.props.className, e),
                height: null
            }), c, b("React").createElement("div", {
                className: f
            }, this.props.children))
        } else return b("React").createElement("div", babelHelpers["extends"]({}, a, {
            className: b("joinClasses")(this.props.className, f)
        }), this.props.children)
    };

    function a() {
        "use strict";
        h.apply(this, arguments)
    }
    a.propTypes = {
        alignv: c.oneOf(["baseline", "bottom", "middle", "top"]),
        height: c.number,
        fullWidth: c.bool
    };
    a.defaultProps = {
        alignv: "baseline",
        fullWidth: !1
    };
    e.exports = a
}), null);
__d("ContextualLayerHideOnScroll", ["Event"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        "use strict";
        this._layer = a
    }
    a.prototype.enable = function() {
        "use strict";
        this._subscriptions = [this._layer.subscribe("contextchange", this._handleContextChange.bind(this)), this._layer.subscribe("show", this.attach.bind(this)), this._layer.subscribe("hide", this.detach.bind(this))]
    };
    a.prototype.disable = function() {
        "use strict";
        while (this._subscriptions.length) this._subscriptions.pop().unsubscribe();
        this.detach()
    };
    a.prototype.attach = function() {
        "use strict";
        if (this._listener) return;
        var a = this._layer.getContextScrollParent();
        if (a === window) return;
        this._listener = b("Event").listen(a, "scroll", this._layer.hide.bind(this._layer))
    };
    a.prototype.detach = function() {
        "use strict";
        this._listener && this._listener.remove(), this._listener = null
    };
    a.prototype._handleContextChange = function() {
        "use strict";
        this.detach(), this._layer.isShown() && this.attach()
    };
    Object.assign(a.prototype, {
        _subscriptions: []
    });
    e.exports = a
}), null);
__d("queryThenMutateDOM", ["ErrorUtils", "Run", "TimeSlice", "emptyFunction", "requestAnimationFrame", "requestAnimationFrameAcrossTransitions"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g, h, i = [],
        j = {};

    function k(a, c, d) {
        __p && __p();
        if (!a && !c) return {
            cancel: b("emptyFunction")
        };
        if (d && Object.prototype.hasOwnProperty.call(j, d)) return {
            cancel: b("emptyFunction")
        };
        else d && (j[d] = 1);
        c = b("TimeSlice").guard(c || b("emptyFunction"), "queryThenMutateDOM mutation callback", {
            propagationType: b("TimeSlice").PropagationType.CONTINUATION,
            registerCallStack: !0
        });
        a = b("TimeSlice").guard(a || b("emptyFunction"), "queryThenMutateDOM query callback", {
            propagationType: b("TimeSlice").PropagationType.CONTINUATION,
            registerCallStack: !0
        });
        var e = {
            queryFunction: a,
            mutateFunction: c,
            output: null,
            deleted: !1
        };
        i.push(e);
        m();
        g || (g = !0, b("Run").onLeave(function() {
            g = !1, h = !1, j = {}, i.length = 0
        }));
        return {
            cancel: function() {
                b("TimeSlice").cancel(e.queryFunction), b("TimeSlice").cancel(e.mutateFunction), e.deleted = !0, d && delete j[d]
            }
        }
    }
    k.prepare = function(a, b, c) {
        return function() {
            for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++) e[f] = arguments[f];
            e.unshift(this);
            var g = Function.prototype.bind.apply(a, e),
                h = b.bind(this);
            k(g, h, c)
        }
    };
    var l = b("TimeSlice").guard(function() {
        __p && __p();
        while (i.length) {
            j = {};
            var a = [];
            window.document.body.getClientRects();
            while (i.length) {
                var b = i.shift();
                b.deleted || (b.output = n(b.queryFunction), a.push(b))
            }
            while (a.length) {
                b = a.shift();
                b.deleted || n(b.mutateFunction, null, [b.output])
            }
        }
        h = !1
    }, "queryThenMutateDOM runScheduledQueriesAndMutations", {
        propagationType: b("TimeSlice").PropagationType.ORPHAN
    });

    function m() {
        !h && i.length && (h = !0, b("requestAnimationFrame")(l, {
            priority: b("requestAnimationFrameAcrossTransitions").Priorities.QUERY_THEN_MUTATE
        }))
    }

    function n(a, c, d, e, f) {
        return b("ErrorUtils").applyWithGuard(a, c, d, e, f)
    }
    e.exports = k
}), null);
__d("Toggler", ["csx", "invariant", "Arbiter", "ArbiterMixin", "ContextualThing", "CSS", "DataStore", "DOM", "Event", "Focus", "Keys", "Parent", "TabbableElements", "TimeSlice", "$", "createArrayFromMixed", "emptyFunction", "ge", "getContextualParent", "getObjectValues", "killswitch", "mixin", "queryThenMutateDOM", "setImmediate"], (function(a, b, c, d, e, f, g, h) {
    __p && __p();
    var i, j = [],
        k, l = !1;

    function m() {
        l || (l = !0, b("setImmediate")(function() {
            l = !1
        }))
    }
    var n = function() {
        n = b("emptyFunction"), b("Event").listen(document.documentElement, "click", function(a) {
            if (l) return;
            var c = a.getTarget();
            j.forEach(function(a) {
                a.clickedTarget = c, a.active && !a.sticky && !b("ContextualThing").containsIncludingLayers(a.getActive(), c) && !a.inTargetFlyout(c) && a.inActiveDialog() && !a.isIgnoredByModalLayer(c) && a.hide()
            })
        }, b("Event").Priority.URGENT)
    };
    c = babelHelpers.inherits(o, b("mixin")(b("ArbiterMixin")));
    i = c && c.prototype;

    function o() {
        "use strict";
        i.constructor.call(this);
        this.active = null;
        this.togglers = {};
        this.setSticky(!1);
        j.push(this);
        this.subscribe(["show", "hide"], o.inform.bind(o));
        return n()
    }
    o.prototype.focusFirstTabbableDescendant = function(a, c) {
        "use strict";
        __p && __p();
        if (!b("killswitch")("TOGGLER_FAST_SHOW")) {
            c.$Toggler2 && c.$Toggler2.cancel();
            var d = null;
            c.$Toggler2 = b("queryThenMutateDOM")(function() {
                var c = a.querySelector(".uiToggleFlyout");
                c && (d = b("TabbableElements").findFirst(c) || c)
            }, function() {
                delete c.$Toggler2, d && (d.tabIndex == null && (d.tabIndex = -1), b("Focus").setWithoutOutline(d))
            })
        } else {
            var e = a.querySelector(".uiToggleFlyout");
            if (e) {
                e = b("TabbableElements").find(e)[0] || e;
                e.tabIndex == null && (e.tabIndex = -1);
                b("Focus").setWithoutOutline(e)
            }
        }
    };
    o.prototype.show = function(a) {
        "use strict";
        __p && __p();
        var c = p(this, a),
            d = c.active;
        if (a !== d) {
            d && c.hide();
            c.active = a;
            b("CSS").addClass(a, "openToggler");
            d = b("DOM").scry(a, 'a[rel="toggle"]');
            d.length > 0 && d[0].getAttribute("data-target") && b("CSS").removeClass(b("$")(d[0].getAttribute("data-target")), "toggleTargetClosed");
            this.focusFirstTabbableDescendant(a, c);
            d.length > 0 && (b("DOM").appendContent(a, c.getToggler("next")), b("DOM").prependContent(a, c.getToggler("prev")));
            b("Event").listen(a, "keydown", function(d) {
                if (b("Event").getKeyCode(d) === b("Keys").ESC && c.isShown()) {
                    var e = b("DOM").scry(a, 'a[rel="toggle"]')[0];
                    e && e.focus();
                    c.hide();
                    d.kill()
                }
            });
            a.getAttribute("data-toggle-wc") && (c.__continuation = b("TimeSlice").getGuardedContinuation("Toggler.show inform"));
            c.inform("show", c, "state")
        }
    };
    o.prototype.hide = function(a) {
        "use strict";
        __p && __p();
        var c = p(this, a);
        c.$Toggler2 && c.$Toggler2.cancel();
        var d = c.active;
        if (d && (!a || a === d)) {
            b("CSS").removeClass(d, "openToggler");
            a = b("DOM").scry(d, 'a[rel="toggle"]');
            a.length > 0 && a[0].getAttribute("data-target") && b("CSS").addClass(b("$")(a[0].getAttribute("data-target")), "toggleTargetClosed");
            b("getObjectValues")(c.togglers).forEach(b("DOM").remove);
            d.getAttribute("data-toggle-wc") && (c.__continuation = b("TimeSlice").getGuardedContinuation("Toggler.hide inform"));
            c.inform("hide", c, "state");
            c.active = null
        }
    };
    o.prototype.toggle = function(a) {
        "use strict";
        var b = p(this, a);
        b.active === a ? b.hide() : b.show(a);
        m()
    };
    o.prototype.getActive = function() {
        "use strict";
        return p(this).active
    };
    o.prototype.isShown = function() {
        "use strict";
        return p(this).active && b("CSS").hasClass(p(this).active, "openToggler")
    };
    o.isNodeShown = function(a) {
        "use strict";
        return b("CSS").hasClass(a, "openToggler")
    };
    o.prototype.inTargetFlyout = function(a) {
        "use strict";
        var c = q(this.getActive());
        return Boolean(c && b("ContextualThing").containsIncludingLayers(c, a))
    };
    o.prototype.inActiveDialog = function() {
        "use strict";
        var c = a.Dialog && a.Dialog.getCurrent();
        return !c || b("DOM").contains(c.getRoot(), this.getActive())
    };
    o.prototype.isIgnoredByModalLayer = function(a) {
        "use strict";
        a = !!b("Parent").bySelector(a, "._3qw");
        var c = !!b("Parent").bySelector(this.getActive(), "._3qw");
        return a && !c
    };
    o.prototype.getToggler = function(a) {
        "use strict";
        var c = p(this);
        c.togglers[a] || (c.togglers[a] = b("DOM").create("button", {
            className: "hideToggler",
            onfocus: function() {
                var a = b("DOM").scry(c.active, 'a[rel="toggle"]')[0];
                a && a.focus();
                c.hide()
            },
            style: {
                right: a === "next" ? "0" : ""
            }
        }), c.togglers[a].setAttribute("type", "button"));
        return this.togglers[a]
    };
    o.prototype.setSticky = function(a) {
        "use strict";
        var c = p(this);
        a = a !== !1;
        a !== c.sticky && (c.sticky = a, a ? c.$Toggler1 && c.$Toggler1.unsubscribe() : c.$Toggler1 = b("Arbiter").subscribe("pre_page_transition", c.hide.bind(c, null)));
        return c
    };
    o.prototype.setPrePageTransitionCallback = function(a) {
        "use strict";
        var c = p(this);
        c.$Toggler1 && c.$Toggler1.unsubscribe();
        c.$Toggler1 = b("Arbiter").subscribe("pre_page_transition", a)
    };
    o.bootstrap = function(a) {
        "use strict";
        a = a.parentNode;
        a != null || h(0, 3354);
        var b = o.getInstance(a);
        b != null || h(0, 3355);
        b.toggle(a)
    };
    o.createInstance = function(a) {
        "use strict";
        var c = new o().setSticky(!0);
        b("DataStore").set(a, "toggler", c);
        return c
    };
    o.destroyInstance = function(a) {
        "use strict";
        var c = b("DataStore").get(a, "toggler");
        c && c.$Toggler2 && c.$Toggler2.cancel();
        b("DataStore").remove(a, "toggler")
    };
    o.getInstance = function(a) {
        "use strict";
        __p && __p();
        a = a;
        while (a) {
            var c = b("DataStore").get(a, "toggler");
            if (c) return c;
            if (a instanceof Element)
                if (b("CSS").hasClass(a, "uiToggleContext")) return o.createInstance(a);
                else if (!b("killswitch")("JEWEL_TOGGLER_INSTANCE_FIXES") && b("CSS").hasClass(a, "uiToggleFlyout")) return o.createInstance(a).setSticky(!1);
            a = b("getContextualParent")(a)
        }
        return k = k || new o()
    };
    o.listen = function(a, c, d) {
        "use strict";
        __p && __p();
        return o.subscribe(b("createArrayFromMixed")(a), function(a, b) {
            if (b.getActive() === c) {
                if (b.__continuation) {
                    var e = b.__continuation;
                    delete b.__continuation;
                    return e(function() {
                        return d(a, b)
                    })
                }
                return d(a, b)
            }
        })
    };
    Object.assign(o, o.prototype, b("ArbiterMixin"));
    Object.assign(o, {
        subscribe: function(a) {
            return function(c, d) {
                c = b("createArrayFromMixed")(c);
                c.includes("show") && j.forEach(function(a) {
                    a.getActive() && setTimeout(d.bind(null, "show", a), 0)
                });
                return a(c, d)
            }
        }(o.subscribe.bind(o))
    });

    function p(a, b) {
        return a instanceof o ? a : o.getInstance(b)
    }

    function q(a) {
        a = b("DOM").scry(a, 'a[rel="toggle"]');
        return a.length > 0 && a[0].getAttribute("data-target") ? b("ge")(a[0].getAttribute("data-target")) : null
    }
    e.exports = o
}), null);
__d("curry", ["bind"], (function(a, b, c, d, e, f) {
    a = b("bind")(null, b("bind"), null);
    e.exports = a
}), null);
__d("ParameterizedPopover", ["invariant", "Arbiter", "ArbiterMixin", "CSS", "DataStore", "Event", "Focus", "Keys", "KeyStatus", "LayerHideOnEscape", "SubscriptionsHandler", "Toggler", "curry", "mixin"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h;
    b("Toggler").subscribe(["show", "hide"], function(a, c) {
        c = c.getActive();
        c != null || g(0, 4839);
        c = b("DataStore").get(c, "Popover");
        c && (a === "show" ? c.showLayer() : c.hideLayer())
    });
    c = babelHelpers.inherits(a, b("mixin")(b("ArbiterMixin")));
    h = c && c.prototype;

    function a(a, c, d, e) {
        "use strict";
        h.constructor.call(this), this._root = a, this._triggerElem = c, this._behaviors = d, this._config = e || {}, this._disabled = !!this._config.disabled, this._listeners = new(b("SubscriptionsHandler"))(), this._disabled || ((c.nodeName !== "A" || c.rel !== "toggle") && this._setupClickListener(), this._setupKeyListener(), this._setupFocusListener(), this._setupBlurListener()), c.setAttribute("role", "button"), b("DataStore").set(a, "Popover", this), b("Toggler").getActive() === a && this.showLayer()
    }
    a.prototype.ensureInit = function() {
        "use strict";
        this._layer || this._init()
    };
    a.prototype.showLayer = function() {
        "use strict";
        if (this._disabled) return;
        this.ensureInit();
        this._layer.show();
        b("Toggler").show(this._root);
        b("CSS").addClass(this._root, "selected");
        this.inform("show")
    };
    a.prototype.getContentRoot = function() {
        "use strict";
        return this._root
    };
    a.prototype.getLayer = function() {
        "use strict";
        this.ensureInit();
        return this._layer
    };
    a.prototype.hideLayer = function() {
        "use strict";
        this.ensureInit(), this._layer.hide()
    };
    a.prototype.isShown = function() {
        "use strict";
        return this._layer && this._layer.isShown()
    };
    a.prototype.setLayerContent = function(a) {
        "use strict";
        this.ensureInit(), this._layer.setContent && this._layer.setContent(a)
    };
    a.prototype._init = function() {
        "use strict";
        var a = this._config.layer;
        a.enableBehaviors([b("LayerHideOnEscape")]);
        b("Toggler").createInstance(a.getRoot()).setSticky(!1);
        a.subscribe("hide", this._onLayerHide.bind(this));
        this._behaviors && a.enableBehaviors(this._behaviors);
        this._layer = a;
        this.inform("init", null, "persistent")
    };
    a.prototype._onLayerHide = function() {
        "use strict";
        b("Toggler").hide(this._root), b("CSS").removeClass(this._root, "selected"), this.inform("hide"), b("KeyStatus").getKeyDownCode() === b("Keys").ESC && b("Focus").set(this._triggerElem)
    };
    a.prototype.enable = function() {
        "use strict";
        if (!this._disabled) return;
        this._listeners.engage();
        this._setupClickListener();
        this._setupKeyListener();
        this._setupFocusListener();
        this._setupBlurListener();
        this._disabled = !1
    };
    a.prototype.disable = function() {
        "use strict";
        if (this._disabled) return;
        this.isShown() && this.hideLayer();
        this._listeners.release();
        this._triggerElem.getAttribute("rel") === "toggle" && this._triggerElem.removeAttribute("rel");
        this._disabled = !0
    };
    a.prototype._setupClickListener = function() {
        "use strict";
        this._listeners.addSubscriptions(b("Event").listen(this._triggerElem, "click", b("curry")(b("Toggler").bootstrap, this._triggerElem)))
    };
    a.prototype._setupKeyListener = function() {
        "use strict";
        this._listeners.addSubscriptions(b("Event").listen(this._triggerElem, "keydown", this._handleKeyEvent.bind(this)))
    };
    a.prototype._setupFocusListener = function() {
        "use strict";
        this._listeners.addSubscriptions(b("Event").listen(this._triggerElem, "focus", this._handleFocusEvent.bind(this)))
    };
    a.prototype._setupBlurListener = function() {
        "use strict";
        this._listeners.addSubscriptions(b("Event").listen(this._triggerElem, "blur", this._handleBlurEvent.bind(this)))
    };
    a.prototype._handleKeyEvent = function(a) {
        "use strict";
        __p && __p();
        if (a.getModifiers().any) return;
        var c = b("Event").getKeyCode(a);
        switch (c) {
            case b("Keys").DOWN:
            case b("Keys").UP:
                if (this._config.disableArrowKeyActivation) return;
                this.isShown() || b("Toggler").bootstrap(this._triggerElem);
                break;
            case b("Keys").RETURN:
                if (!this._config.enableActivationOnEnter) return;
                this.isShown() || b("Toggler").bootstrap(this._triggerElem);
                break;
            case b("Keys").SPACE:
                b("Toggler").bootstrap(this._triggerElem);
                break;
            default:
                return
        }
        a.prevent()
    };
    a.prototype._handleFocusEvent = function(a) {
        "use strict";
        b("CSS").addClass(this._root, "focused")
    };
    a.prototype._handleBlurEvent = function(a) {
        "use strict";
        b("CSS").removeClass(this._root, "focused")
    };
    a.prototype.destroy = function() {
        "use strict";
        this.disable(), b("DataStore").remove(this._root, "Popover")
    };
    Object.assign(a.prototype, {
        _layer: null
    });
    e.exports = a
}), null);
__d("Popover", ["ContextualLayer", "ContextualLayerHideOnScroll", "DOM", "ParameterizedPopover"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g, h;
    g = babelHelpers.inherits(a, b("ParameterizedPopover"));
    h = g && g.prototype;
    a.prototype._init = function() {
        "use strict";
        var a = new(b("ContextualLayer"))({
            context: this._triggerElem,
            position: "below",
            arrowDimensions: {
                offset: 12,
                length: 16
            },
            "data-testid": this._config["data-testid"]
        }, b("DOM").create("div"));
        this._config.shouldDisableHideOnScroll || a.enableBehaviors([b("ContextualLayerHideOnScroll")]);
        this._config.layer = a;
        this._config.alignh && a.setAlignment(this._config.alignh);
        this._config.layer_content && a.setContent(this._config.layer_content);
        this._config.position && a.setPosition(this._config.position);
        this._config.arrowDimensions && a.setArrowDimensions(this._config.arrowDimensions);
        h._init.call(this)
    };
    a.prototype.destroy = function() {
        "use strict";
        h.destroy.call(this), this._layer && this._layer.destroy()
    };

    function a() {
        "use strict";
        g.apply(this, arguments)
    }
    e.exports = a
}), null);
__d("VirtualCursorStatus", ["Event", "UserAgent", "emptyFunction", "setImmediate"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = null,
        h = null;

    function i() {
        h || (h = b("Event").listen(window, "blur", function() {
            g = null, j()
        }))
    }

    function j() {
        h && (h.remove(), h = null)
    }

    function a(a) {
        g = a.keyCode, i()
    }

    function c() {
        g = null, j()
    }
    if (typeof window !== "undefined" && window.document && window.document.createElement) {
        d = document.documentElement;
        if (d)
            if (d.addEventListener) d.addEventListener("keydown", a, !0), d.addEventListener("keyup", c, !0);
            else if (d.attachEvent) {
            f = d.attachEvent;
            f("onkeydown", a);
            f("onkeyup", c)
        }
    }
    var k = {
            isKeyDown: function() {
                return !!g
            },
            getKeyDownCode: function() {
                return g
            }
        },
        l = !1,
        m = !1,
        n = null,
        o = !1;

    function p(a) {
        __p && __p();
        var c = new Set(),
            d = k.isKeyDown(),
            e = a.clientX,
            f = a.clientY,
            g = a.isPrimary,
            h = a.isTrusted,
            i = a.offsetX,
            j = a.offsetY,
            n = a.pointerType,
            o = a.mozInputSource,
            p = a.WEBKIT_FORCE_AT_MOUSE_DOWN,
            q = a.webkitForce;
        a = a.target;
        var r = a.clientWidth;
        a = a.clientHeight;
        e === 0 && f === 0 && i >= 0 && j >= 0 && m && h && o == null && c.add("Chrome");
        l && m && !d && q != null && q < p && i === 0 && j === 0 && o == null && c.add("Safari-edge");
        e === 0 && f === 0 && i < 0 && j < 0 && m && o == null && c.add("Safari-old");
        !l && !m && d && g === !1 && h && n === "" && e === 0 && f === 0 && i === 0 && j === 0 && o == null;
        !l && !m && !d && h && b("UserAgent").isBrowser("IE >= 10") && o == null && (e < 0 && f < 0 ? c.add("IE") : (i < 0 || i > r) && (j < 0 || j > a) && c.add("MSIE"));
        o === 0 && h && c.add("Firefox");
        return c
    }

    function q() {
        l = !0, b("setImmediate")(function() {
            l = !1
        })
    }

    function r() {
        m = !0, b("setImmediate")(function() {
            m = !1
        })
    }

    function s(a, c) {
        n === null && (n = p(a));
        o = n.size > 0;
        a = a.target.getAttribute("data-accessibilityid") === "virtual_cursor_trigger";
        c(o, n, a);
        b("setImmediate")(function() {
            o = !1, n = null
        })
    }
    d = {
        isVirtualCursorTriggered: function() {
            return o
        },
        add: function(a, c) {
            c === void 0 && (c = b("emptyFunction"));
            var d = function(a) {
                return s(a, c)
            };
            a.addEventListener("click", d);
            var e = b("Event").listen(a, "mousedown", q),
                f = b("Event").listen(a, "mouseup", r);
            return {
                remove: function() {
                    a.removeEventListener("click", d), e.remove(), f.remove()
                }
            }
        }
    };
    e.exports = d
}), null);
__d("PopoverMenu", ["Arbiter", "ArbiterMixin", "ARIA", "BehaviorsMixin", "Event", "Focus", "Keys", "KeyStatus", "setTimeout", "SubscriptionsHandler", "VirtualCursorStatus", "mixin"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g;
    c = babelHelpers.inherits(a, b("mixin")(b("ArbiterMixin"), b("BehaviorsMixin")));
    g = c && c.prototype;

    function a(a, c, d, e) {
        "use strict";
        g.constructor.call(this), this._popover = a, this._triggerElem = c, this._getInitialMenu = typeof d !== "function" ? function() {
            return d
        } : d, this._subscriptions = new(b("SubscriptionsHandler"))(), this._subscriptions.addSubscriptions(a.subscribe("init", this._onLayerInit.bind(this)), a.subscribe("show", this._onPopoverShow.bind(this)), a.subscribe("hide", this._onPopoverHide.bind(this)), b("Event").listen(this._triggerElem, "keydown", this._handleKeyEventOnTrigger.bind(this)), b("VirtualCursorStatus").add(this._triggerElem, this._checkInitialFocus.bind(this))), e && this.enableBehaviors(e)
    }
    a.prototype.getContentRoot = function() {
        "use strict";
        return this._popover.getContentRoot()
    };
    a.prototype.setMenu = function(a) {
        "use strict";
        this._menu && this._menu !== a && this._menu.destroy();
        this._menu = a;
        var c = a.getRoot();
        this._popover.setLayerContent(c);
        a.subscribe("done", this._onMenuDone.bind(this));
        this._popoverShown && this._menu.onShow();
        b("ARIA").controls(this._triggerElem, c);
        this.inform("setMenu", null, "persistent")
    };
    a.prototype.setInitialFocus = function(a, b) {
        "use strict";
        b && a.focusAnItem()
    };
    a.prototype.getPopover = function() {
        "use strict";
        return this._popover
    };
    a.prototype.getTriggerElem = function() {
        "use strict";
        return this._triggerElem
    };
    a.prototype.getInitialMenu = function() {
        "use strict";
        return this._getInitialMenu()
    };
    a.prototype.getMenu = function() {
        "use strict";
        return this._menu
    };
    a.prototype._onLayerInit = function() {
        "use strict";
        this._menu || this.setMenu(this._getInitialMenu()), this._popover.getLayer().subscribe("key", this._handleKeyEvent.bind(this))
    };
    a.prototype._onPopoverShow = function() {
        "use strict";
        this._menu && this._menu.onShow(), this._checkInitialFocus(), this._popoverShown = !0
    };
    a.prototype._checkInitialFocus = function() {
        "use strict";
        var a = b("KeyStatus").isKeyDown() || b("VirtualCursorStatus").isVirtualCursorTriggered();
        this._menu && this.setInitialFocus(this._menu, a)
    };
    a.prototype._onPopoverHide = function() {
        "use strict";
        this._menu && this._menu.onHide(), this._popoverShown = !1
    };
    a.prototype._handleKeyEvent = function(a, c) {
        "use strict";
        __p && __p();
        if (c.target === this._triggerElem) return;
        a = b("Event").getKeyCode(c);
        if (a === b("Keys").TAB) {
            this._popover.hideLayer();
            b("Focus").set(this._triggerElem);
            return
        }
        if (c.getModifiers().any) return;
        switch (a) {
            case b("Keys").RETURN:
                this.getMenu().getFocusedItem() || this.inform("returnWithoutFocusedItem");
                return;
            default:
                if (a === b("Keys").SPACE && c.target.type === "file") return;
                this._menu.handleKeydown(a, c) === !1 && (this._menu.blur(), this._menu.handleKeydown(a, c));
                break
        }
        c.prevent()
    };
    a.prototype._handleKeyEventOnTrigger = function(a) {
        "use strict";
        if (this._isTypeaheadActivationDisabled) return;
        var c = b("Event").getKeyCode(a),
            d = String.fromCharCode(c).toLowerCase();
        /^\w$/.test(d) && (this._popover.showLayer(), this._menu.blur(), this._menu.handleKeydown(c, a) === !1 && (this._popover.hideLayer(), b("Focus").set(this._triggerElem)))
    };
    a.prototype.disableTypeaheadActivation = function() {
        "use strict";
        this._isTypeaheadActivationDisabled = !0
    };
    a.prototype.enableTypeaheadActivation = function() {
        "use strict";
        this._isTypeaheadActivationDisabled = !1
    };
    a.prototype._onMenuDone = function(a) {
        "use strict";
        b("setTimeout")(function() {
            this._popover.hideLayer(), b("Focus").set(this._triggerElem)
        }.bind(this), 0)
    };
    a.prototype.enable = function() {
        "use strict";
        this._popover.enable()
    };
    a.prototype.disable = function() {
        "use strict";
        this._popover.disable()
    };
    a.prototype.destroy = function() {
        "use strict";
        this._subscriptions.release(), this._popover.destroy(), this._getInitialMenu().destroy(), this._menu && this._menu.destroy()
    };
    Object.assign(a.prototype, {
        _popoverShown: !1
    });
    e.exports = a
}), null);
__d("PopoverMenu.react", ["cx", "CSS", "InlineBlock.react", "Popover", "PopoverMenu", "React", "ReactDOM", "SubscriptionsHandler", "areEqual", "clearImmediate", "joinClasses", "setImmediate"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h;
    a = b("React").PropTypes;
    c = babelHelpers.inherits(i, b("React").Component);
    h = c && c.prototype;

    function i() {
        var a, b;
        for (var c = arguments.length, d = new Array(c), e = 0; e < c; e++) d[e] = arguments[e];
        return b = (a = h.constructor).call.apply(a, [this].concat(d)), this.$3 = null, this.$7 = function() {
            this.$3 && (this.$3.release(), this.$3 = null), this.$8(), this.$2.setMenu(this.$5(this.props.menu)), this.$6()
        }.bind(this), b
    }
    i.getFirstChild = function(a) {
        "use strict";
        a = a.children;
        return Array.isArray(a) ? a[0] : a
    };
    i.getButtonSize = function(a) {
        "use strict";
        a = i.getFirstChild(a);
        return a ? a.type.getButtonSize(a.props) : 0
    };
    i.prototype.componentDidMount = function() {
        "use strict";
        var a = b("ReactDOM").findDOMNode(this.refs.root),
            c = a == null ? void 0 : a.firstChild;
        c != null && (b("CSS").addClass(c, "_p"), this.$1 = new(b("Popover"))(a, c, this.props.layerBehaviors, {
            alignh: this.props.alignh,
            position: this.props.position,
            disabled: this.props.disabled,
            arrowDimensions: {
                offset: 0,
                length: 0
            },
            disableArrowKeyActivation: this.props.disableArrowKeyActivation,
            enableActivationOnEnter: this.props.enableActivationOnEnter,
            "data-testid": this.props["data-testid"],
            shouldDisableHideOnScroll: this.props.shouldDisableHideOnScroll
        }), this.$2 = new(b("PopoverMenu"))(this.$1, c, this.$5(this.props.menu), this.props.behaviors));
        this.$6()
    };
    i.prototype.componentDidUpdate = function(a) {
        "use strict";
        b("areEqual")(a.menu, this.props.menu) || (b("clearImmediate")(this.$4), this.$4 = b("setImmediate")(this.$7)), this.props.alignh !== a.alignh && this.$2.getPopover().getLayer().setAlignment(this.props.alignh), this.props.disabled !== a.disabled && (this.props.disabled ? this.$2.disable() : this.$2.enable())
    };
    i.prototype.$6 = function() {
        "use strict";
        this.props.onReturnWithoutFocusedItem && this.$3 && this.$2 && this.$3.addSubscriptions(this.$2.subscribe("returnWithoutFocusedItem", this.props.onReturnWithoutFocusedItem))
    };
    i.prototype.render = function() {
        "use strict";
        __p && __p();
        var a = b("React").Children.map(this.props.children, function(a, c) {
                if (c === 0) return b("React").cloneElement(a, {
                    className: b("joinClasses")(a.props.className, "_p")
                });
                else return a
            }),
            c = Object.assign({}, this.props);
        delete c.onShow;
        delete c.onHide;
        delete c.alignh;
        delete c.position;
        delete c.layerBehaviors;
        delete c.behaviors;
        delete c.menu;
        delete c.disabled;
        delete c.disableArrowKeyActivation;
        delete c.enableActivationOnEnter;
        return b("React").createElement(b("InlineBlock.react"), babelHelpers["extends"]({}, c, {
            className: b("joinClasses")(this.props.className, "uiPopover"),
            ref: "root",
            disabled: null
        }), a)
    };
    i.prototype.componentWillUnmount = function() {
        "use strict";
        b("clearImmediate")(this.$4), this.hidePopover(), this.$3 && (this.$3.release(), this.$3 = null), this.$2 && this.$2.destroy()
    };
    i.prototype.$5 = function(a) {
        "use strict";
        __p && __p();
        var c = a.props;
        a = new a.type(c);
        this.$3 = new(b("SubscriptionsHandler"))();
        c.onItemClick && this.$3.addSubscriptions(a.subscribe("itemclick", c.onItemClick));
        c.onItemFocus && this.$3.addSubscriptions(a.subscribe("focus", c.onItemFocus));
        c.onItemBlur && this.$3.addSubscriptions(a.subscribe("blur", c.onItemBlur));
        c.onChange && this.$3.addSubscriptions(a.subscribe("change", c.onChange));
        this.props.onShow && this.$3.addSubscriptions(this.$1.subscribe("show", this.props.onShow));
        this.props.onHide && this.$3.addSubscriptions(this.$1.subscribe("hide", this.props.onHide));
        return a
    };
    i.prototype.getMenu = function() {
        "use strict";
        return this.$2.getMenu()
    };
    i.prototype.isShown = function() {
        "use strict";
        return !!(this.$1 && this.$1.isShown())
    };
    i.prototype.showPopover = function(a) {
        "use strict";
        this.$1.showLayer();
        if (a) {
            var b = this.$2.getMenu();
            b.blur();
            b.focusAnItem(a)
        }
    };
    i.prototype.hidePopover = function() {
        "use strict";
        var a = this.$1;
        a && a.isShown() && a.hideLayer()
    };
    i.prototype.getFocusedItem = function() {
        "use strict";
        var a = this.$2.getMenu();
        return a.getFocusedItem()
    };
    i.prototype.$8 = function() {
        "use strict";
        var a = this.getMenu();
        a && a.forEachItem(function(a) {
            a = a.getRoot().firstElementChild;
            a && b("ReactDOM").unmountComponentAtNode(a)
        })
    };
    i.propTypes = {
        alignh: a.oneOf(["left", "center", "right"]),
        alignv: a.oneOf(["baseline", "bottom", "middle", "top"]),
        position: a.oneOf(["above", "below", "left", "right"]),
        layerBehaviors: a.array,
        menu: a.object.isRequired,
        disabled: a.bool,
        disableArrowKeyActivation: a.bool,
        enableActivationOnEnter: a.bool,
        onReturnWithoutFocusedItem: a.func,
        shouldDisableHideOnScroll: a.bool
    };
    i.defaultProps = {
        alignv: "middle",
        shouldDisableHideOnScroll: !1
    };
    e.exports = i
}), null);
__d("PopoverMenuInterface", ["ArbiterMixin", "emptyFunction", "mixin"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g;
    g = babelHelpers.inherits(a, b("mixin")(b("ArbiterMixin")));
    g && g.prototype;
    a.prototype.done = function() {
        "use strict";
        this.inform("done")
    };

    function a() {
        "use strict";
        g.apply(this, arguments)
    }
    Object.assign(a.prototype, {
        getRoot: b("emptyFunction"),
        onShow: b("emptyFunction"),
        onHide: b("emptyFunction"),
        focusAnItem: b("emptyFunction").thatReturnsFalse,
        blur: b("emptyFunction"),
        handleKeydown: b("emptyFunction").thatReturnsFalse,
        destroy: b("emptyFunction")
    });
    e.exports = a
}), null);
__d("CSSFade", ["cx", "invariant", "CSS", "DataStore", "Event", "Style", "requestAnimationFrameAcrossTransitions"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    __p && __p();
    var i = "css-fade-animation",
        j = "css-show-animation",
        k = "CSSFade_hide",
        l = "CSSFade_show";
    a = document.createElement("div").animate !== void 0;
    var m = {
        cancel: function() {}
    };

    function n(a, c) {
        a != null || h(0, 5875);
        a = b("DataStore").get(a, c);
        a && a.cancel();
        return a
    }

    function o(a, b, c) {
        a = ((a = a) != null ? (a = a.style) != null ? a.animation : a : a) || "";
        b = b + "s " + c;
        a.length > 5 && (b = a.slice(0, -1) + (", " + b));
        return b
    }

    function p(a, b) {
        a = ((a = a) != null ? (a = a.style) != null ? a.animation : a : a) || "";
        a = a.split(",");
        var c = a.findIndex(function(a) {
            return a.indexOf(b) > -1
        });
        c !== -1 && a.splice(c, 1);
        return a.join(",")
    }
    c = {
        show: function(a, c) {
            __p && __p();
            c === void 0 && (c = {});
            var d = c.duration != null ? c.duration / 1e3 : .3;
            n(a, i);
            n(a, j);
            b("CSS").removeClass(a, c.invisible ? "invisible_elem" : "hidden_elem");
            b("requestAnimationFrameAcrossTransitions")(function() {
                a.style.animation = o(a, d, l)
            });
            var e = b("Event").listen(a, "animationend", function() {
                    c.callback && c.callback(), a.style.animation = p(a, l)
                }),
                f = {
                    cancel: function() {
                        a.style.animation = p(a, l), e.remove(), f.cancel = function() {}
                    }
                };
            b("DataStore").set(a, j, f);
            return f
        },
        hide: function(a, c) {
            __p && __p();
            c === void 0 && (c = {});
            var d = function() {
                b("CSS").addClass(a, c.invisible ? "invisible_elem" : "hidden_elem"), c.callback && c.callback(), a.style.animation = p(a, k)
            };
            if (c.simple) {
                d();
                return m
            }
            var e = c.duration != null ? c.duration / 1e3 : .3;
            n(a, j);
            n(a, i);
            b("requestAnimationFrameAcrossTransitions")(function() {
                a.style.animation = o(a, e, k)
            });
            var f = b("Event").listen(a, "animationend", d),
                g = {
                    cancel: function() {
                        a.style.animation = p(a, k), f.remove(), g.cancel = function() {}
                    }
                };
            b("DataStore").set(a, i, g);
            return g
        }
    };
    d = {
        show: function(a, c) {
            __p && __p();
            c === void 0 && (c = {});
            var d = c.duration != null ? c.duration : 300;
            n(a, i);
            n(a, j);
            b("CSS").removeClass(a, c.invisible ? "invisible_elem" : "hidden_elem");
            b("Style").set(a, "opacity", "1");
            d = a.animate([{
                opacity: "0"
            }, {
                opacity: "1.0"
            }], {
                duration: d
            });
            c.callback && (d.onfinish = c.callback);
            b("DataStore").set(a, j, d);
            return d
        },
        hide: function(a, c) {
            __p && __p();
            c === void 0 && (c = {});
            var d = c.duration != null ? c.duration : 300;
            n(a, j);
            if (c.simple === !0) {
                b("CSS").addClass(a, c.invisible ? "invisible_elem" : "hidden_elem");
                return m
            } else {
                n(a, i);
                b("Style").set(a, "opacity", "0");
                d = a.animate([{
                    opacity: "1.0"
                }, {
                    opacity: "0"
                }], {
                    duration: d
                });
                d.onfinish = function() {
                    b("CSS").addClass(a, c.invisible ? "invisible_elem" : "hidden_elem"), c.callback && c.callback()
                };
                b("DataStore").set(a, i, d);
                return d
            }
        }
    };
    e.exports = a ? d : c
}), null);
__d("SimpleDrag", ["ArbiterMixin", "Event", "SubscriptionsHandler", "UserAgent_DEPRECATED", "Vector", "emptyFunction"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        this.minDragDistance = 0, this._subscriptions = new(b("SubscriptionsHandler"))(), this._subscriptions.addSubscriptions(b("Event").listen(a, "mousedown", this._start.bind(this)))
    }
    Object.assign(a.prototype, b("ArbiterMixin"), {
        setMinDragDistance: function(a) {
            this.minDragDistance = a
        },
        destroy: function() {
            this._subscriptions.release()
        },
        _start: function(a) {
            __p && __p();
            var c = !1,
                d = !0,
                e = null;
            this.inform("mousedown", a) && (d = !1);
            if (this.minDragDistance) e = b("Vector").getEventPosition(a);
            else {
                c = !0;
                var f = this.inform("start", a);
                if (f === !0) d = !1;
                else if (f === !1) {
                    c = !1;
                    return
                }
            }
            f = b("UserAgent_DEPRECATED").ie() < 9 ? document.documentElement : window;
            var g = b("Event").listen(f, {
                selectstart: d ? b("Event").prevent : b("emptyFunction"),
                mousemove: function(a) {
                    __p && __p();
                    if (!c) {
                        var d = b("Vector").getEventPosition(a);
                        if (e.distanceTo(d) < this.minDragDistance) return;
                        c = !0;
                        if (this.inform("start", a) === !1) {
                            c = !1;
                            return
                        }
                    }
                    this.inform("update", a)
                }.bind(this),
                mouseup: function(a) {
                    for (var b in g) g[b].remove();
                    c ? this.inform("end", a) : this.inform("click", a)
                }.bind(this)
            });
            d && a.prevent()
        }
    });
    e.exports = a
}), null);
__d("firstx", ["invariant"], (function(a, b, c, d, e, f, g) {
    "use strict";
    __p && __p();

    function a(a) {
        __p && __p();
        for (var a = a, b = Array.isArray(a), c = 0, a = b ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var d;
            if (b) {
                if (c >= a.length) break;
                d = a[c++]
            } else {
                c = a.next();
                if (c.done) break;
                d = c.value
            }
            d = d;
            return d
        }
        g(0, 1145)
    }
    e.exports = a
}), null);
__d("getScrollableAreaContainingNode", ["DataStore", "Parent"], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        a = b("Parent").byClass(a, "uiScrollableArea");
        return a ? b("DataStore").get(a, "ScrollableArea") : null
    }
    e.exports = a
}), null);
__d("ScrollableArea", ["ArbiterMixin", "Bootloader", "BrowserSupport", "CSS", "CSSFade", "DataStore", "Deferred", "DOM", "Event", "FocusEvent", "Run", "Scroll", "SimpleDrag", "Style", "SubscriptionsHandler", "TimeSlice", "UserAgent_DEPRECATED", "Vector", "clearTimeout", "createCancelableFunction", "emptyFunction", "firstx", "getScrollableAreaContainingNode", "ifRequired", "mixin", "promiseDone", "queryThenMutateDOM", "setTimeoutAcrossTransitions", "throttle"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g, h = 12;

    function i() {
        b("Run").onAfterLoad(function() {
            return b("Bootloader").loadModules(["Animation"], b("emptyFunction"), "ScrollableArea")
        })
    }
    a = babelHelpers.inherits(j, b("mixin")(b("ArbiterMixin")));
    g = a && a.prototype;

    function j(a, c) {
        "use strict";
        __p && __p();
        g.constructor.call(this);
        this.adjustGripper = function() {
            var a = function() {
                b("queryThenMutateDOM")(function() {
                    return this._needsGripper()
                }.bind(this), function(a) {
                    a && (b("Style").set(this._gripper, "height", this._gripperHeight + "px"), this._slideGripper())
                }.bind(this)), this._throttledShowGripperAndShadows()
            }.bind(this);
            a = b("TimeSlice").guard(a, "ScrollableArea adjustGripper", {
                propagationType: b("TimeSlice").PropagationType.ORPHAN
            });
            a();
            return this
        }.bind(this);
        this._computeHeights = function() {
            this._containerHeight = this._elem.clientHeight, this._contentHeight = this._content.offsetHeight, this._trackHeight = this._track.offsetHeight, this._gripperHeight = Math.max(this._containerHeight / this._contentHeight * this._trackHeight, h)
        }.bind(this);
        this._showGripperAndShadows = function() {
            b("queryThenMutateDOM")(function() {
                return {
                    needsGripper: this._needsGripper(),
                    top: b("Scroll").getTop(this._wrap) > 0,
                    isScrolledToBottom: this.isScrolledToBottom()
                }
            }.bind(this), function(a) {
                var c = a.needsGripper,
                    d = a.top;
                a = a.isScrolledToBottom;
                b("CSS").conditionShow(this._gripper, c);
                b("CSS").conditionClass(this._elem, "contentBefore", d);
                b("CSS").conditionClass(this._elem, "contentAfter", !a)
            }.bind(this))
        }.bind(this);
        this._respondMouseMove = function() {
            if (!this._mouseOver || this._isFocussed) return;
            var a = this._options.fade !== !1,
                c = this._mousePos,
                d = b("Vector").getElementPosition(this._track).x,
                e = b("Vector").getElementDimensions(this._track).x;
            d = Math.abs(d + e / 2 - c.x);
            e = b("BrowserSupport").hasPointerEvents() && d <= 10;
            e && !this._trackIsHovered ? (this._trackIsHovered = !0, b("CSS").addClass(this._elem, "uiScrollableAreaTrackOver"), this.throttledAdjustGripper()) : !e && this._trackIsHovered && (this._trackIsHovered = !1, b("CSS").removeClass(this._elem, "uiScrollableAreaTrackOver"));
            a && (d < 25 ? this.showScrollbar({
                hideAfterDelay: !1
            }) : !this._options.no_fade_on_hover && !this._isFocussed && this.hideScrollbar({
                hideAfterDelay: !0,
                shouldFade: !0
            }))
        }.bind(this);
        if (!a) return;
        c = c || {};
        i();
        this._elem = a;
        this._wrap = b("firstx")(b("DOM").scry(a, "div.uiScrollableAreaWrap"));
        this._body = b("firstx")(b("DOM").scry(this._wrap, "div.uiScrollableAreaBody"));
        this._content = b("firstx")(b("DOM").scry(this._body, "div.uiScrollableAreaContent"));
        this._track = b("firstx")(b("DOM").scry(a, "div.uiScrollableAreaTrack"));
        this._trackIsHovered = !1;
        this._isFocussed = !1;
        this._gripper = b("firstx")(b("DOM").scry(this._track, "div.uiScrollableAreaGripper"));
        this._options = c;
        this._throttledComputeHeights = b("throttle").withBlocking(this._computeHeights, 250, this);
        this.throttledAdjustGripper = b("throttle").withBlocking(this.adjustGripper, 250, this);
        this.throttledAdjustGripper = b("TimeSlice").guard(this.throttledAdjustGripper, "ScrollableArea throttledAdjustGripper", {
            propagationType: b("TimeSlice").PropagationType.ORPHAN
        });
        this._throttledShowGripperAndShadows = b("throttle").withBlocking(this._showGripperAndShadows, 250, this);
        this._throttledRespondMouseMove = b("throttle")(this._respondMouseMove, 250, this);
        b("setTimeoutAcrossTransitions")(this.adjustGripper.bind(this), 0);
        this._listeners = new(b("SubscriptionsHandler"))();
        this._listeners.addSubscriptions(b("Event").listen(this._wrap, "scroll", this._handleScroll.bind(this)), b("Event").listen(a, "mousemove", this._handleMouseMove.bind(this)), b("Event").listen(this._track, "click", this._handleClickOnTrack.bind(this)));
        b("BrowserSupport").hasPointerEvents() && this._listeners.addSubscriptions(b("Event").listen(a, "mousedown", this._handleClickOnTrack.bind(this)));
        if (c.fade !== !1) {
            var d;
            (d = this._listeners).addSubscriptions.apply(d, [b("Event").listen(a, "mouseenter", this._handleMouseEnter.bind(this)), b("Event").listen(a, "mouseleave", this._handleMouseLeave.bind(this))].concat(this._attachFocusListeners(this._wrap)))
        } else b("BrowserSupport").hasPointerEvents() && this._listeners.addSubscriptions(b("Event").listen(a, "mouseleave", function() {
            this._isFocussed || (this._trackIsHovered = !1, b("CSS").removeClass(a, "uiScrollableAreaTrackOver"))
        }.bind(this)));
        b("UserAgent_DEPRECATED").webkit() || b("UserAgent_DEPRECATED").chrome() ? this._listeners.addSubscriptions(b("Event").listen(a, "mousedown", function() {
            var c = b("Event").listen(window, "mouseup", function() {
                b("Scroll").getLeft(a) && b("Scroll").setLeft(a, 0), c.remove()
            })
        })) : b("UserAgent_DEPRECATED").firefox() && this._wrap.addEventListener("DOMMouseScroll", function(a) {
            a.axis === a.HORIZONTAL_AXIS && a.preventDefault()
        }, !1);
        this._drag = this.initDrag();
        b("DataStore").set(this._elem, "ScrollableArea", this);
        c.persistent || (this._destroy = b("createCancelableFunction")(this._destroy.bind(this)), b("Run").onLeave(this._destroy));
        c.shadow !== !1 && b("CSS").addClass(this._elem, "uiScrollableAreaWithShadow")
    }
    j.prototype.getContentHeight = function() {
        "use strict";
        return this._contentHeight
    };
    j.prototype.getElement = function() {
        "use strict";
        return this._elem
    };
    j.prototype.initDrag = function() {
        "use strict";
        __p && __p();
        var a = b("BrowserSupport").hasPointerEvents(),
            c = new(b("SimpleDrag"))(a ? this._elem : this._gripper);
        c.subscribe("start", function(d, e) {
            __p && __p();
            if (!(e.which && e.which === 1 || e.button && e.button === 1)) return void 0;
            d = b("Vector").getEventPosition(e, "viewport");
            if (a) {
                var f = this._gripper.getBoundingClientRect();
                if (d.x < f.left || d.x > f.right || d.y < f.top || d.y > f.bottom) return !1
            }
            e.stopPropagation();
            this.inform("grip_start");
            var g = d.y,
                h = this._gripper.offsetTop;
            b("CSS").addClass(this._elem, "uiScrollableAreaDragging");
            var i = c.subscribe("update", function(a, c) {
                    a = b("Vector").getEventPosition(c, "viewport").y - g;
                    this._throttledComputeHeights();
                    c = this._contentHeight - this._containerHeight;
                    a = h + a;
                    var d = this._trackHeight - this._gripperHeight;
                    a = Math.max(Math.min(a, d), 0);
                    a = a / d * c;
                    b("Scroll").setTop(this._wrap, a)
                }.bind(this)),
                j = c.subscribe("end", function() {
                    c.unsubscribe(i), c.unsubscribe(j), b("CSS").removeClass(this._elem, "uiScrollableAreaDragging"), this.inform("grip_end")
                }.bind(this));
            return void 0
        }.bind(this));
        return c
    };
    j.prototype._attachFocusListeners = function(a) {
        "use strict";
        var c;
        return [b("FocusEvent").listen(a, function(a) {
            c && (c.reject(), c = null), a ? (c = new(b("Deferred"))(), b("promiseDone")(c.getPromise(), function() {
                this._isFocussed = !0, this._trackIsHovered = !0, b("queryThenMutateDOM")(null, function() {
                    b("CSS").addClass(this._elem, "uiScrollableAreaTrackOver")
                }.bind(this)), this.showScrollbar({
                    hideAfterDelay: !1
                }), c = null
            }.bind(this), function() {
                c = null
            })) : (this._isFocussed = !1, this._mouseOver ? this._respondMouseMove() : (b("queryThenMutateDOM")(null, function() {
                b("CSS").removeClass(this._elem, "uiScrollableAreaTrackOver")
            }.bind(this)), this.hideScrollbar({
                hideAfterDelay: !1,
                shouldFade: !1
            })))
        }.bind(this)), b("Event").listen(document.documentElement, "keyup", function(a) {
            c && c.resolve()
        })]
    };
    j.prototype._needsGripper = function() {
        "use strict";
        this._throttledComputeHeights();
        return this._gripperHeight < this._trackHeight
    };
    j.prototype._slideGripper = function() {
        "use strict";
        b("queryThenMutateDOM")(function() {
            return b("Scroll").getTop(this._wrap) / (this._contentHeight - this._containerHeight) * (this._trackHeight - this._gripperHeight)
        }.bind(this), function(a) {
            b("Style").set(this._gripper, "top", a + "px")
        }.bind(this))
    };
    j.prototype.destroy = function() {
        "use strict";
        this._destroy(), this._destroy.cancel && this._destroy.cancel()
    };
    j.prototype._destroy = function() {
        "use strict";
        this._listeners && this._listeners.release(), this._elem && b("DataStore").remove(this._elem, "ScrollableArea"), this._drag && this._drag.destroy()
    };
    j.prototype._handleClickOnTrack = function(a) {
        "use strict";
        var c = b("Vector").getEventPosition(a, "viewport"),
            d = this._gripper.getBoundingClientRect();
        c.x < d.right && c.x > d.left && (c.y < d.top ? this.setScrollTop(this.getScrollTop() - this._elem.clientHeight) : c.y > d.bottom && this.setScrollTop(this.getScrollTop() + this._elem.clientHeight), a.kill())
    };
    j.prototype._handleMouseMove = function(a) {
        "use strict";
        var c = this._options.fade !== !1;
        (b("BrowserSupport").hasPointerEvents() || c) && (this._mousePos = b("Vector").getEventPosition(a), this._throttledRespondMouseMove())
    };
    j.prototype._handleScroll = function(a) {
        "use strict";
        this._needsGripper() && this._slideGripper(), this.throttledAdjustGripper(), this._options.fade !== !1 && !this._isFocussed && this.showScrollbar({
            hideAfterDelay: !0
        }), this.inform("scroll")
    };
    j.prototype._handleMouseLeave = function() {
        "use strict";
        this._mouseOver = !1, this._isFocussed || this.hideScrollbar({
            hideAfterDelay: !0,
            shouldFade: !0
        })
    };
    j.prototype._handleMouseEnter = function() {
        "use strict";
        this._mouseOver = !0, this._isFocussed || this.showScrollbar({
            hideAfterDelay: !0
        })
    };
    j.prototype.hideScrollbar = function(a) {
        var c = a.hideAfterDelay,
            d = a.shouldFade;
        if (this._hideTimeout || !this._scrollbarVisible) return this;
        var e = function() {
            this._scrollbarVisible = !1, b("CSSFade").hide(this._track, {
                simple: !d,
                invisible: b("CSS").hasClass(this._track, "invisible_elem")
            })
        }.bind(this);
        c ? this._hideTimeout = b("setTimeoutAcrossTransitions")(function() {
            this._hideTimeout = null, e()
        }.bind(this), 750) : e();
        return this
    };
    j.prototype.pageDown = function(a, b) {
        "use strict";
        this._scrollPage(1, a, b)
    };
    j.prototype.pageUp = function(a, b) {
        "use strict";
        this._scrollPage(-1, a, b)
    };
    j.prototype._scrollPage = function(a, b, c) {
        "use strict";
        a = a * this._containerHeight;
        var d = this.getScrollHeight() - this._containerHeight;
        d = Math.max(0, Math.min(d, this.getScrollTop() + a));
        this.setScrollTop(d, b, c)
    };
    j.prototype.resize = function() {
        "use strict";
        this._body.style.width && (this._body.style.width = "");
        var a = this._wrap.offsetWidth - this._wrap.clientWidth;
        a > 0 && b("Style").set(this._body, "margin-right", -a + "px");
        return this
    };
    j.prototype.showScrollbar = function(a) {
        var c = a.hideAfterDelay;
        this._hideTimeout && (b("clearTimeout")(this._hideTimeout), this._hideTimeout = null);
        if (this._scrollbarVisible) return this;
        this._scrollbarVisible = !0;
        b("queryThenMutateDOM")(null, function() {
            b("CSSFade").show(this._track, {
                duration: 0,
                invisible: b("CSS").hasClass(this._track, "invisible_elem")
            }), this.throttledAdjustGripper(), c && this.hideScrollbar({
                hideAfterDelay: !0,
                shouldFade: !this._options.no_fade_on_hover
            })
        }.bind(this));
        return this
    };
    j.prototype.distanceToBottom = function() {
        "use strict";
        this._computeHeights();
        var a = Math.round(b("Scroll").getTop(this._wrap));
        return this._contentHeight - (a + this._containerHeight)
    };
    j.prototype.isScrolledToBottom = function() {
        "use strict";
        return this.distanceToBottom() <= 0
    };
    j.prototype.isScrolledToTop = function() {
        "use strict";
        return b("Scroll").getTop(this._wrap) === 0
    };
    j.prototype.scrollToBottom = function(a, b) {
        "use strict";
        this.setScrollTop(this._wrap.scrollHeight, a, b)
    };
    j.prototype.scrollToTop = function(a, b) {
        "use strict";
        this.setScrollTop(0, a, b)
    };
    j.prototype.scrollIntoView = function(a, c, d) {
        "use strict";
        __p && __p();
        var e = this._wrap.clientHeight,
            f = a.offsetHeight,
            g = b("Scroll").getTop(this._wrap),
            h = g + e;
        a = this.getScrollOffsetForElement(a);
        var i = a + f;
        if (a < g || e < f) return this.setScrollTop(a, c, {
            callback: d
        });
        else if (i > h) return this.setScrollTop(g + (i - h), c, {
            callback: d
        });
        d && d();
        return b("emptyFunction")
    };
    j.prototype.getScrollOffsetForElement = function(a) {
        "use strict";
        var b = 0;
        while (a != null && a !== this._wrap) b += a.offsetTop, a = a.offsetParent;
        return b
    };
    j.prototype.scrollElemToTop = function(a, b, c) {
        "use strict";
        this.setScrollTop(a.offsetTop, b, {
            callback: c
        })
    };
    j.prototype.poke = function() {
        "use strict";
        var a = b("Scroll").getTop(this._wrap);
        b("Scroll").setTop(this._wrap, b("Scroll").getTop(this._wrap) + 1);
        b("Scroll").setTop(this._wrap, b("Scroll").getTop(this._wrap) - 1);
        b("Scroll").setTop(this._wrap, a);
        if (this._isFocussed) return this;
        else return this.showScrollbar({
            hideAfterDelay: !1
        })
    };
    j.prototype.getClientHeight = function() {
        "use strict";
        return this._wrap.clientHeight
    };
    j.prototype.getScrollTop = function() {
        "use strict";
        return b("Scroll").getTop(this._wrap)
    };
    j.prototype.getScrollHeight = function() {
        "use strict";
        return this._wrap.scrollHeight
    };
    j.prototype.setScrollTop = function(a, c, d) {
        d === void 0 && (d = {});
        var e;
        c !== !1 ? e = b("ifRequired")("Animation", function(b) {
            return this._animatedSetScrollTop(b, a, d)
        }.bind(this), function() {
            return this._simpleSetScrollTop(a, d)
        }.bind(this)) : this._simpleSetScrollTop(a, d);
        return function() {
            e && e.stop(), e = null
        }
    };
    j.prototype._simpleSetScrollTop = function(a, c) {
        "use strict";
        b("Scroll").setTop(this._wrap, a), c.callback && c.callback()
    };
    j.prototype._animatedSetScrollTop = function(a, b, c) {
        "use strict";
        this._scrollTopAnimation && this._scrollTopAnimation.stop();
        var d = c.duration || 250,
            e = c.ease || a.ease.end;
        this._scrollTopAnimation = new a(this._wrap).to("scrollTop", b).ease(e).duration(d).ondone(c.callback).go();
        return this._scrollTopAnimation
    };
    j.renderDOM = function() {
        "use strict";
        var a = b("DOM").create("div", {
                className: "uiScrollableAreaContent"
            }),
            c = b("DOM").create("div", {
                className: "uiScrollableAreaBody"
            }, a),
            d = b("DOM").create("div", {
                className: "uiScrollableAreaWrap scrollable"
            }, c),
            e = b("DOM").create("div", {
                className: "uiScrollableArea native"
            }, d);
        return {
            root: e,
            wrap: d,
            body: c,
            content: a
        }
    };
    j.fromNative = function(a, c) {
        "use strict";
        __p && __p();
        if (!b("CSS").hasClass(a, "uiScrollableArea") || !b("CSS").hasClass(a, "native")) return void 0;
        c = c || {};
        b("CSS").removeClass(a, "native");
        var d = b("DOM").create("div", {
            className: "uiScrollableAreaTrack"
        }, b("DOM").create("div", {
            className: "uiScrollableAreaGripper"
        }));
        c.fade !== !1 ? (b("CSS").addClass(a, "fade"), b("CSS").addClass(d, "hidden_elem")) : b("CSS").addClass(a, "nofade");
        c.tabIndex !== void 0 && c.tabIndex !== null ? (b("DOM").setAttributes(d, {
            tabIndex: c.tabIndex
        }), b("DOM").prependContent(a, d)) : b("DOM").appendContent(a, d);
        d = new j(a, c);
        d.resize();
        return d
    };
    j.getInstance = function(a) {
        "use strict";
        return b("getScrollableAreaContainingNode")(a)
    };
    j.poke = function(a) {
        "use strict";
        a = j.getInstance(a);
        a && a.poke()
    };
    e.exports = j
}), null);
__d("Menu", ["cx", "BehaviorsMixin", "CSS", "DataStore", "DOM", "Event", "Keys", "Parent", "PopoverMenuInterface", "ScrollableArea", "Style", "SubscriptionsHandler", "UserAgent", "debounce", "gkx"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h, i = 500;
    a = babelHelpers.inherits(j, b("PopoverMenuInterface"));
    h = a && a.prototype;

    function j(a, c) {
        "use strict";
        h.constructor.call(this), this._items = [], this._keysSoFar = "", this._items = a.map(j.buildItemFromData), this._config = c || {}, this._theme = c.theme || {}, this._subscriptions = new(b("SubscriptionsHandler"))(), this._clearKeysSoFarAfterDelay = b("debounce")(function() {
            this._keysSoFar = ""
        }.bind(this), i)
    }
    j.buildItemFromData = function(a) {
        "use strict";
        if (a.ctor) return new a.ctor(a);
        else return new a.type(a.props)
    };
    j.prototype.addItem = function(a) {
        "use strict";
        this._addItem(a)
    };
    j.prototype.addItemBefore = function(a, b) {
        "use strict";
        this._addItem(a, b, !1)
    };
    j.prototype.addItemAfter = function(a, b) {
        "use strict";
        this._addItem(a, b, !0)
    };
    j.prototype._addItem = function(a, b, c) {
        "use strict";
        __p && __p();
        var d = this._items.indexOf(a);
        if (d >= 0) {
            var e = c ? -1 : 1;
            if (this._items[d + e] == b) return;
            this._items.splice(d, 1)
        }
        if (b) {
            d = this._items.indexOf(b);
            if (d < 0) throw new Error("reference item must already be in the menu");
            c && d++;
            this._items.splice(d, 0, a)
        } else this._items.push(a);
        this._root && this._insertItem(a, b, c)
    };
    j.prototype.removeItem = function(a) {
        "use strict";
        var c = this._items.indexOf(a);
        if (c < 0) return;
        this._items.splice(c, 1);
        this._root && b("DOM").remove(a.getRoot())
    };
    j.prototype.forEachItem = function(a) {
        "use strict";
        this._items.forEach(a)
    };
    j.prototype.getFocusedItem = function() {
        "use strict";
        return this._focused
    };
    j.prototype.getItemAt = function(a) {
        "use strict";
        return this._items[a] || null
    };
    j.prototype.getRoot = function() {
        "use strict";
        this._root || this._render();
        return this._root
    };
    j.prototype.onShow = function() {
        "use strict";
        this._config.maxheight && (!this._scrollableArea ? this._scrollableArea = b("ScrollableArea").fromNative(this._scrollableElems.root, {
            fade: !0
        }) : this._scrollableArea.resize()), this.inform("show")
    };
    j.prototype.onHide = function() {
        "use strict";
        this.blur(), this.inform("hide")
    };
    j.prototype.focusAnItem = function(a) {
        "use strict";
        return this._attemptFocus(a || 0, 1)
    };
    j.prototype.blur = function() {
        "use strict";
        if (this._focused) {
            var a = this._focused;
            this._focused.blur();
            this._focused = null;
            this.inform("blur", {
                item: a
            })
        }
    };
    j.prototype.handleKeydown = function(a, c) {
        "use strict";
        __p && __p();
        if (!this._items.length) return !1;
        var d = this._items.indexOf(this._focused);
        switch (a) {
            case b("Keys").UP:
            case b("Keys").DOWN:
                var e = a === b("Keys").UP,
                    f = e ? -1 : 1;
                e = e ? this._items.length - 1 : 0;
                return d === -1 ? this._attemptFocus(e, f) : this._attemptFocus(d + f, f);
            case b("Keys").HOME:
                return this._attemptFocus(0, 1);
            case b("Keys").END:
                return this._attemptFocus(this._items.length - 1, -1);
            case b("Keys").SPACE:
                if (this._items.indexOf(this._focused) !== -1) {
                    this._handleItemClick(this._focused, c);
                    return !0
                }
                return !1;
            case b("Keys").RIGHT:
            case b("Keys").LEFT:
            case b("Keys").INSERT:
            case b("Keys").DELETE:
                return !1;
            default:
                e = this._findItemToFocus(a, d);
                return !!(e && this._focusItem(e))
        }
    };
    j.prototype._findItemToFocus = function(a, b) {
        "use strict";
        a = String.fromCharCode(a).toLowerCase();
        this._keysSoFar || (this._searchIndex = b, this._itemToFocus = this._focused || this._items[0]);
        this._keysSoFar += a;
        this._clearKeysSoFarAfterDelay();
        b = this._findMatchInRange(this._searchIndex + 1, this._items.length);
        b || (b = this._findMatchInRange(0, this._searchIndex));
        this._itemToFocus = b || this._itemToFocus;
        return this._itemToFocus
    };
    j.prototype._findMatchInRange = function(a, b) {
        "use strict";
        for (var a = a; a < b; a++) {
            var c = this._items[a].getLabel();
            if (c && c.toString().toLowerCase().indexOf(this._keysSoFar) === 0) return this._items[a]
        }
        return null
    };
    j.prototype._render = function() {
        "use strict";
        __p && __p();
        this._ul = b("DOM").create("ul", {
            className: "_54nf"
        });
        this._ul.setAttribute("role", "menu");
        this._items.forEach(function(a) {
            this._insertItem(a, null)
        }, this);
        this._subscriptions.addSubscriptions(b("Event").listen(this._ul, "click", this._handleClick.bind(this)), b("Event").listen(this._ul, "mouseover", this._handleMouseOver.bind(this)), b("Event").listen(this._ul, "mouseout", this._handleMouseOut.bind(this)));
        var a = this._ul;
        this._config.maxheight && (this._scrollableElems = b("ScrollableArea").renderDOM(), b("DOM").setContent(this._scrollableElems.content, this._ul), a = this._scrollableElems.root, b("Style").set(this._scrollableElems.wrap, "max-height", this._config.maxheight + "px"));
        var c = "_54nq" + (this._config.className ? " " + this._config.className : "") + (this._theme.className ? " " + this._theme.className : "");
        this._root = b("DOM").create("div", {
            className: c
        }, b("DOM").create("div", {
            className: "_54ng"
        }, a));
        this._config.id && this._root.setAttribute("id", this._config.id);
        this._config.testid && this._root.setAttribute("data-testid", this._config.testid);
        this._config.behaviors && this.enableBehaviors(this._config.behaviors);
        this.inform("rendered", this._root)
    };
    j.prototype._needsDefaultBehavior = function(a) {
        "use strict";
        if (a.isDefaultRequested && a.isDefaultRequested()) {
            a = b("Parent").byTag(a.getTarget(), "a");
            a = a && a.getAttribute("href");
            return a && a[0] !== "#"
        }
        return !1
    };
    j.prototype._handleClick = function(a) {
        "use strict";
        __p && __p();
        if (a.getTarget() === this._ul && b("UserAgent").isBrowser("IE")) {
            a.stop();
            return
        }
        if (!this._needsDefaultBehavior(a)) {
            var c = this._getItemInstance(a.getTarget());
            if (c) return this._handleItemClick(c, a)
        }
    };
    j.prototype._handleItemClick = function(a, c) {
        "use strict";
        this.inform("itemclick", {
            item: a,
            event: c
        });
        if (b("gkx")("678830") && c.isDefaultPrevented()) return !0;
        a.shouldCloseOnClick() && a.hasAction() && this.done();
        return a.handleClick(c)
    };
    j.prototype._handleMouseOver = function(a) {
        "use strict";
        a = this._getItemInstance(a.getTarget());
        a && this._focusItem(a, !0)
    };
    j.prototype._handleMouseOut = function(a) {
        "use strict";
        a = this._getItemInstance(a.getTarget());
        a && this._focused === a && this.blur()
    };
    j.prototype._insertItem = function(a, c, d) {
        "use strict";
        var e = a.getRoot();
        b("CSS").addClass(e, "__MenuItem");
        b("DataStore").set(e, "MenuItem", a);
        if (c) {
            a = d ? b("DOM").insertAfter : b("DOM").insertBefore;
            a(c.getRoot(), e)
        } else b("DOM").appendContent(this._ul, e)
    };
    j.prototype._attemptFocus = function(a, b) {
        "use strict";
        var c = this._items.length;
        if ((a < 0 || a >= c) && !this._focused) return !1;
        a = (c + a % c) % c;
        c = this.getItemAt(a);
        return c === this._focused || this._focusItem(c) ? !0 : this._attemptFocus(a + b, b)
    };
    j.prototype._focusItem = function(a, b) {
        "use strict";
        if (a && a.focus(b) !== !1) {
            this._focused !== a && (this.blur(), this._focused = a, this.inform("focus", {
                item: a,
                from_mouse_over: b
            }));
            return !0
        }
        return !1
    };
    j.prototype._getItemInstance = function(a) {
        "use strict";
        a = b("Parent").byClass(a, "__MenuItem");
        return a ? b("DataStore").get(a, "MenuItem") : null
    };
    j.prototype.destroy = function() {
        "use strict";
        this._items.forEach(function(a) {
            var c = a.getRoot();
            b("DataStore").remove(c, "MenuItem");
            a.destroy()
        }), this._subscriptions.release(), this.destroyBehaviors()
    };
    Object.assign(j.prototype, b("BehaviorsMixin"), {
        _focused: null,
        _root: null
    });
    e.exports = j
}), null);
__d("MenuItemInterface", ["React", "emptyFunction"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g;
    g = babelHelpers.inherits(a, b("React").Component);
    g && g.prototype;
    a.prototype.getRoot = function() {
        "use strict";
        this._root || (this._root = this.render());
        return this._root
    };

    function a() {
        "use strict";
        g.apply(this, arguments)
    }
    Object.assign(a.prototype, {
        _root: null,
        render: b("emptyFunction"),
        getAccessKey: b("emptyFunction"),
        getLabel: b("emptyFunction"),
        hasAction: b("emptyFunction").thatReturnsFalse,
        focus: b("emptyFunction").thatReturnsFalse,
        blur: b("emptyFunction").thatReturnsFalse,
        onShow: b("emptyFunction").thatReturnsFalse,
        handleClick: b("emptyFunction").thatReturnsFalse,
        shouldCloseOnClick: b("emptyFunction").thatReturnsTrue,
        destroy: b("emptyFunction")
    });
    e.exports = a
}), null);
__d("MenuItemBase", ["cx", "DOM", "HTML", "MenuItemInterface"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h;
    c = babelHelpers.inherits(a, b("MenuItemInterface"));
    h = c && c.prototype;

    function a(a) {
        "use strict";
        h.constructor.call(this), this._ARIARole = "menuitem", this._data = babelHelpers["extends"]({}, a)
    }
    a.prototype.render = function() {
        "use strict";
        var a = "_54ni";
        this._data.className && (a += " " + this._data.className);
        a = {
            className: a,
            role: "presentation"
        };
        Object.assign(a, this.__getAttributesFromData());
        delete a["data-testid"];
        return b("DOM").create("li", a, this._renderItemContent())
    };
    a.prototype._renderItemContent = function() {
        "use strict";
        return b("HTML")(this._data.markup).getNodes()
    };
    a.prototype.__getAttributesFromData = function() {
        "use strict";
        var a = {};
        for (var b in this._data)(b.indexOf("data-") === 0 || b.indexOf("aria-") === 0) && (a[b] = this._data[b]);
        return a
    };
    e.exports = a
}), null);
__d("MenuItem", ["cx", "CSS", "DOM", "MenuItemBase", "React", "ReactDOM", "emptyFunction", "joinClasses"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h, i = ["href", "rel", "ajaxify", "target", "accesskey"];

    function j(a, c) {
        var d = {};
        i.forEach(function(a) {
            c[a] && (d[a] = c[a])
        });
        b("DOM").setAttributes(a, d)
    }

    function k(a) {
        i.forEach(function(b) {
            a.removeAttribute(b)
        })
    }
    c = babelHelpers.inherits(a, b("MenuItemBase"));
    h = c && c.prototype;

    function a(a) {
        "use strict";
        h.constructor.call(this, a), this._disabled = !!this._data.disabled, this._onclickHandler = this._data.onclick || this._data.onClick
    }
    a.prototype.getValue = function() {
        "use strict";
        return this._data.value
    };
    a.prototype.getLabel = function() {
        "use strict";
        return this._data.label
    };
    a.prototype.getLink = function() {
        "use strict";
        return this._data.href
    };
    a.prototype.getAccessKey = function() {
        "use strict";
        var a = this.getLabel();
        return a && a.charAt(0)
    };
    a.prototype.focus = function(a) {
        "use strict";
        if (this.isDisabled() || !this._root.offsetParent || !this.hasAction() || this.isHoverDisabled()) return !1;
        b("CSS").addClass(this._root, "_54ne");
        b("CSS").addClass(this._root, "selected");
        a || this._anchor.focus()
    };
    a.prototype.blur = function() {
        "use strict";
        b("CSS").removeClass(this._root, "_54ne"), b("CSS").removeClass(this._root, "selected")
    };
    a.prototype.handleClick = function(a) {
        "use strict";
        if (this.isDisabled()) return !1;
        return typeof this._onclickHandler === "function" ? this._onclickHandler(a) : !0
    };
    a.prototype.setOnClickHandler = function(a) {
        "use strict";
        this._onclickHandler = a
    };
    a.prototype._renderItemContent = function() {
        "use strict";
        __p && __p();
        this._anchor = b("DOM").create(this._data.renderas === "label" ? "label" : "a", {
            className: "_54nc" + (this._data.icon ? " _54nu" : "")
        });
        if (this._data.children) {
            var a = null;
            this._data.icon && (a = b("React").cloneElement(this._data.icon, {
                className: b("joinClasses")(this._data.icon.props.className, "mrs")
            }));
            b("ReactDOM").render(b("React").createElement("span", null, a, b("React").createElement("span", {
                className: "_54nh"
            }, this._data.children)), this._anchor);
            this._data.label = this._anchor.innerText || this._anchor.textContent
        } else {
            a = b("DOM").create("span", null, b("DOM").create("span", {
                className: "_54nh"
            }, this._data.markup || this._data.label));
            this._data.icon && b("DOM").prependContent(a, this._data.icon);
            b("DOM").setContent(this._anchor, a)
        }
        this._data.href || (this._data.href = "#");
        this.isDisabled() || j(this._anchor, this._data);
        b("DOM").setAttributes(this._anchor, this.__getAttributesFromData());
        this._anchor.setAttribute("role", this._ARIARole);
        a = this._data.title;
        a && this._anchor.setAttribute("title", a);
        return this._anchor
    };
    a.prototype.isDisabled = function() {
        "use strict";
        return this._disabled
    };
    a.prototype.isHoverDisabled = function() {
        "use strict";
        return this._data.hoverdisabled
    };
    a.prototype.enable = function() {
        "use strict";
        this._root && (j(this._anchor, this._data), b("CSS").removeClass(this._root, "_5arm")), this._disabled = !1
    };
    a.prototype.disable = function() {
        "use strict";
        this._root && (k(this._anchor), b("CSS").addClass(this._root, "_5arm")), this._disabled = !0
    };
    a.prototype.render = function() {
        "use strict";
        var a = h.render.call(this);
        this._disabled && b("CSS").addClass(a, "_5arm");
        return a
    };
    a.prototype.destroy = function() {
        "use strict";
        this._anchor && b("ReactDOM").unmountComponentAtNode(this._anchor)
    };
    Object.assign(a.prototype, {
        hasAction: b("emptyFunction").thatReturnsTrue
    });
    e.exports = a
}), null);
__d("MenuItemNoAction", ["MenuItem"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g;
    g = babelHelpers.inherits(a, b("MenuItem"));
    g && g.prototype;
    a.prototype.hasAction = function() {
        "use strict";
        return !1
    };

    function a() {
        "use strict";
        g.apply(this, arguments)
    }
    e.exports = a
}), null);
__d("MenuSelectableItem", ["cx", "CSS", "DOM", "MenuItem"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h;
    c = babelHelpers.inherits(a, b("MenuItem"));
    h = c && c.prototype;

    function a(a) {
        "use strict";
        h.constructor.call(this, a), this._ARIARole = "menuitemcheckbox", this._selected = !!this._data.selected
    }
    a.prototype.getIcon = function() {
        "use strict";
        return this._data.icon
    };
    a.prototype.setIcon = function(a) {
        "use strict";
        b("DOM").replace(this._data.icon, a), this._data.icon = a
    };
    a.prototype.isSelected = function() {
        "use strict";
        return this._selected
    };
    a.prototype.select = function() {
        "use strict";
        if (this.isDisabled()) return !1;
        b("CSS").addClass(this._root, "_54nd");
        this._anchor.setAttribute("aria-checked", "true");
        this._selected = !0
    };
    a.prototype.deselect = function() {
        "use strict";
        b("CSS").removeClass(this._root, "_54nd"), this._anchor.setAttribute("aria-checked", "false"), this._selected = !1
    };
    a.prototype.render = function() {
        "use strict";
        var a = h.render.call(this);
        this._data.selected && (b("CSS").addClass(a, "_54nd"), this._anchor.setAttribute("aria-checked", "true"));
        return a
    };
    Object.assign(a.prototype, {
        _selected: !1
    });
    e.exports = a
}), null);
__d("MenuTheme", ["cx"], (function(a, b, c, d, e, f, g) {
    e.exports = {
        className: "_569t"
    }
}), null);
__d("SelectableMenuUtils", [], (function(a, b, c, d, e, f) {
    a = {
        doesItemSupportSelect: function(a) {
            return g(a)
        },
        isSelected: function(a) {
            return g(a) && a.isSelected()
        }
    };

    function g(a) {
        return a.select && a.deselect && a.isSelected
    }
    e.exports = a
}), null);
__d("SelectableMenu", ["Menu", "SelectableMenuUtils", "createArrayFromMixed"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g, h;
    g = babelHelpers.inherits(a, b("Menu"));
    h = g && g.prototype;
    a.prototype.focusAnItem = function() {
        "use strict";
        for (var a = 0; a < this._items.length; a++)
            if (b("SelectableMenuUtils").isSelected(this._items[a]) && this._focusItem(this._items[a]) !== !1) return !0;
        return h.focusAnItem.call(this)
    };
    a.prototype.setValue = function(a) {
        "use strict";
        this._root || this._render();
        var c = b("createArrayFromMixed")(a);
        this._items.forEach(function(a) {
            b("SelectableMenuUtils").doesItemSupportSelect(a) && (c.includes(a.getValue()) ? a.select() : b("SelectableMenuUtils").isSelected(a) && a.deselect())
        });
        this.inform("change", this.getSelection())
    };
    a.prototype._handleItemClick = function(a, c) {
        "use strict";
        __p && __p();
        if (!b("SelectableMenuUtils").doesItemSupportSelect(a)) return h._handleItemClick.call(this, a, c);
        var d = this.inform("itemclick", {
            item: a,
            event: c
        });
        if (d) return;
        if (this._config.multiple) {
            d = b("SelectableMenuUtils").isSelected(a) ? a.deselect() : a.select();
            d !== !1 && this.inform("change", this.getSelection());
            this._config.closeOnSelectWithMultiple && this.done()
        } else b("SelectableMenuUtils").isSelected(a) || a.select() !== !1 && (this._items.forEach(function(c) {
            b("SelectableMenuUtils").isSelected(c) && c !== a && c.deselect()
        }), this.inform("change", this.getSelection())), this.done();
        return a.handleClick(c)
    };
    a.prototype.getSelection = function() {
        "use strict";
        var a = [];
        this._items.forEach(function(c) {
            b("SelectableMenuUtils").isSelected(c) && a.push({
                label: c.getLabel(),
                value: c.getValue(),
                item: c
            })
        });
        this._config.multiple || (a = a[0]);
        return a
    };

    function a() {
        "use strict";
        g.apply(this, arguments)
    }
    e.exports = a
}), null);
__d("ReactMenu", ["cx", "Menu", "MenuItem", "MenuItemNoAction", "MenuSelectableItem", "MenuTheme", "React", "SelectableMenu", "joinClasses"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h, i;

    function j(a) {
        var c = [];
        b("React").Children.forEach(a, function(a) {
            a && c.push(a)
        });
        return c
    }

    function a(a) {
        a != null && (a.isReactLegacyFactory = {}, a.type = a)
    }
    f = babelHelpers.inherits(c, b("Menu"));
    h = f && f.prototype;

    function c(a, c) {
        "use strict";
        c = babelHelpers["extends"]({
            theme: b("MenuTheme"),
            maxheight: a ? a.maxheight : null,
            className: a ? a.className : null
        }, c);
        h.constructor.call(this, j(a.children), c)
    }
    a(c);
    g = babelHelpers.inherits(d, b("SelectableMenu"));
    i = g && g.prototype;

    function d(a, c) {
        "use strict";
        c = babelHelpers["extends"]({
            className: b("joinClasses")("_57di", a ? a.className : null),
            theme: b("MenuTheme"),
            multiple: a && a.multiple,
            closeOnSelectWithMultiple: a && a.closeOnSelectWithMultiple,
            maxheight: a ? a.maxheight : null,
            testid: a ? a["data-testid"] : null
        }, c);
        i.constructor.call(this, j(a.children), c)
    }
    a(d);
    c.SelectableMenu = d;
    a(b("MenuItem"));
    c.Item = b("MenuItem");
    c.ItemNoAction = b("MenuItemNoAction");
    a(b("MenuSelectableItem"));
    c.SelectableItem = b("MenuSelectableItem");
    e.exports = c
}), null);
__d("ReactPropTransfererCore", ["emptyFunction", "joinClasses"], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();

    function a(a) {
        return function(b, c, d) {
            !Object.prototype.hasOwnProperty.call(b, c) ? b[c] = d : b[c] = a(b[c], d)
        }
    }
    c = a(function(a, b) {
        return Object.assign({}, b, a)
    });
    var g = {
        children: b("emptyFunction"),
        className: a(b("joinClasses")),
        style: c
    };

    function h(a, b) {
        for (var c in b) {
            if (!Object.prototype.hasOwnProperty.call(b, c)) continue;
            var d = g[c];
            d && Object.prototype.hasOwnProperty.call(g, c) ? d(a, c, b[c]) : Object.prototype.hasOwnProperty.call(a, c) || (a[c] = b[c])
        }
        return a
    }
    d = {
        mergeProps: function(a, b) {
            return h(Object.assign({}, a), b)
        }
    };
    e.exports = d
}), null);
__d("ReactPropTransferer", ["ReactPropTransfererCore"], (function(a, b, c, d, e, f) {
    e.exports = b("ReactPropTransfererCore")
}), null);
__d("cloneWithProps_DEPRECATED", ["React", "ReactPropTransferer", "warning"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = "children";
    c = !1;

    function a(a, c) {
        c = b("ReactPropTransferer").mergeProps(c, a.props);
        !Object.prototype.hasOwnProperty.call(c, g) && Object.prototype.hasOwnProperty.call(a.props, g) && (c.children = a.props.children);
        return b("React").createElement(a.type, c)
    }
    e.exports = a
}), null);
__d("AbstractButton.react", ["cx", "Link.react", "React", "cloneWithProps_DEPRECATED", "joinClasses"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h;
    c = b("React").Component;
    d = b("React").PropTypes;
    f = babelHelpers.inherits(a, c);
    h = f && f.prototype;

    function a() {
        var a, b;
        for (var c = arguments.length, d = new Array(c), e = 0; e < c; e++) d[e] = arguments[e];
        return b = (a = h.constructor).call.apply(a, [this].concat(d)), this.handleLinkClick = function(a) {
            this.props.disabled ? a.preventDefault() : this.props.onClick && this.props.onClick(a)
        }.bind(this), b
    }
    a.prototype.render = function() {
        "use strict";
        __p && __p();
        var a = this.props,
            c = a.depressed,
            d = a.disabled,
            e = a.image,
            f = a.imageRight,
            g = a.label,
            h = a.labelIsHidden;
        a = babelHelpers.objectWithoutPropertiesLoose(a, ["depressed", "disabled", "image", "imageRight", "label", "labelIsHidden"]);
        delete a.shade;
        c = "_42ft" + (d ? " _42fr" : "") + (c ? " _42fs" : "");
        e = e;
        if (e) {
            var i = {};
            g && (i.alt = "", h || (i.className = "_3-8_"));
            e = b("cloneWithProps_DEPRECATED")(e, i)
        }
        i = f;
        if (i) {
            f = {};
            g && (f.alt = "", h || (f.className = "_3-99"));
            i = b("cloneWithProps_DEPRECATED")(i, f)
        }
        if (this.props.href) {
            f = this.props;
            var j = f.disabled;
            f = f.role;
            f = j && f === "button";
            return b("React").createElement(b("Link.react"), babelHelpers["extends"]({}, a, {
                "aria-disabled": f ? !0 : void 0,
                className: b("joinClasses")(this.props.className, c),
                onClick: this.handleLinkClick,
                tabIndex: j ? -1 : this.props.tabIndex
            }), e, h ? b("React").createElement("span", {
                className: "accessible_elem"
            }, g) : g, i)
        } else if (this.props.type && this.props.type !== "submit") return b("React").createElement("button", babelHelpers["extends"]({}, a, {
            className: b("joinClasses")(this.props.className, c),
            disabled: d,
            type: this.props.type
        }), e, h ? b("React").createElement("span", {
            className: "accessible_elem"
        }, g) : g, i);
        else return b("React").createElement("button", babelHelpers["extends"]({}, a, {
            className: b("joinClasses")(this.props.className, c),
            disabled: d,
            type: "submit",
            value: "1"
        }), e, h ? b("React").createElement("span", {
            className: "accessible_elem"
        }, g) : g, i)
    };
    a.propTypes = {
        image: d.element,
        imageRight: d.element,
        depressed: d.bool,
        label: d.node,
        onClick: d.func,
        labelIsHidden: d.bool
    };
    a.defaultProps = {
        disabled: !1,
        depressed: !1,
        labelIsHidden: !1
    };
    e.exports = a
}), null);
__d("XUIAbstractGlyphButton.react", ["cx", "AbstractButton.react", "React", "joinClasses"], (function(a, b, c, d, e, f, g) {
    "use strict";
    __p && __p();
    var h;
    h = babelHelpers.inherits(a, b("React").Component);
    h && h.prototype;
    a.prototype.render = function() {
        return b("React").createElement(b("AbstractButton.react"), babelHelpers["extends"]({}, this.props, {
            className: b("joinClasses")(this.props.className, "_5upp"),
            label: this.props.label
        }))
    };

    function a() {
        h.apply(this, arguments)
    }
    a.propTypes = b("AbstractButton.react").propTypes;
    e.exports = a
}), null);
__d("XUICloseButton.react", ["cx", "fbt", "React", "XUIAbstractGlyphButton.react", "joinClasses"], (function(a, b, c, d, e, f, g, h) {
    __p && __p();
    var i;
    c = b("React").PropTypes;
    i = babelHelpers.inherits(a, b("React").Component);
    i && i.prototype;
    a.prototype.render = function() {
        "use strict";
        var a = this.props.size,
            c = this.props.shade;
        a = "_50zy" + (a === "small" ? " _50zz" : "") + (a === "medium" ? " _50-0" : "") + (a === "large" ? " _50-1" : "") + (c === "light" ? " _50z_" : "") + (c === "dark" ? " _50z-" : "");
        c = this.props.label;
        var d = this.props.title;
        !this.props.title && !this.props.tooltip && (d = c);
        return b("React").createElement(b("XUIAbstractGlyphButton.react"), babelHelpers["extends"]({}, this.props, {
            label: c,
            title: d,
            type: this.props.href ? void 0 : this.props.type,
            "data-hover": this.props.tooltip && "tooltip",
            "data-tooltip-alignh": this.props.tooltip && "center",
            "data-tooltip-content": this.props.tooltip,
            className: b("joinClasses")(this.props.className, a)
        }))
    };

    function a() {
        "use strict";
        i.apply(this, arguments)
    }
    a.propTypes = {
        shade: c.oneOf(["light", "dark"]),
        size: c.oneOf(["small", "medium", "large"]),
        title: c.string,
        tooltip: c.string,
        type: c.oneOf(["submit", "button", "reset"])
    };
    a.defaultProps = {
        label: h._("Remove"),
        size: "medium",
        shade: "dark",
        type: "button"
    };
    e.exports = a
}), null);
__d("LeftRight.react", ["cx", "invariant", "React", "joinClasses"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    __p && __p();
    var i;
    i = babelHelpers.inherits(j, b("React").Component);
    i && i.prototype;
    j.prototype.getChildrenArr = function() {
        var a = [];
        b("React").Children.forEach(this.props.children, function(b) {
            return a.push(b)
        });
        return a
    };
    j.prototype.render = function() {
        var a = this.getChildrenArr();
        a.length === 1 || a.length === 2 || h(0, 5615);
        var c = this.props.direction || j.DIRECTION.both,
            d = c === j.DIRECTION.both,
            e = d || c === j.DIRECTION.left ? "_ohe lfloat" : "";
        d = d || c === j.DIRECTION.right ? "_ohf rfloat" : "";
        e = b("React").createElement("div", {
            key: "left",
            className: e
        }, a[0]);
        d = a.length < 2 ? null : b("React").createElement("div", {
            key: "right",
            className: d
        }, a[1]);
        a = c === j.DIRECTION.right && d ? [d, e] : [e, d];
        return b("React").createElement("div", babelHelpers["extends"]({}, this.props, {
            className: b("joinClasses")(this.props.className, "clearfix")
        }), a)
    };

    function j() {
        i.apply(this, arguments)
    }
    j.DIRECTION = {
        left: "left",
        right: "right",
        both: "both"
    };
    e.exports = j
}), null);
__d("XUIDialogTitle.react", ["cx", "fbt", "LeftRight.react", "React", "XUICloseButton.react", "joinClasses"], (function(a, b, c, d, e, f, g, h) {
    __p && __p();
    var i;
    i = babelHelpers.inherits(a, b("React").Component);
    i && i.prototype;
    a.prototype.render = function() {
        "use strict";
        var a = null,
            c = this.props,
            d = c.closeButtonText,
            e = c.showCloseButton;
        c = babelHelpers.objectWithoutPropertiesLoose(c, ["closeButtonText", "showCloseButton"]);
        e && (a = b("React").createElement(b("XUICloseButton.react"), {
            "data-testid": "dialog_title_close_button",
            label: d,
            className: "layerCancel _51-t"
        }));
        d = b("React").Children.toArray(this.props.children);
        return b("React").createElement("div", babelHelpers["extends"]({}, c, {
            className: b("joinClasses")(this.props.className, "_4-i0" + (e ? " _2gb3" : ""))
        }), b("React").createElement(b("LeftRight.react"), null, b("React").createElement("h3", {
            className: "_52c9",
            "data-hover": "tooltip",
            "data-tooltip-display": "overflow"
        }, d[0]), b("React").createElement("div", {
            className: "_51-u"
        }, d.slice(1), a)))
    };

    function a() {
        "use strict";
        i.apply(this, arguments)
    }
    a.defaultProps = {
        closeButtonText: h._("Close"),
        showCloseButton: !0
    };
    e.exports = a
}), null);
__d("XUIMenuTheme", ["cx"], (function(a, b, c, d, e, f, g) {
    e.exports = {
        className: "_558b"
    }
}), null);
__d("XUIMenuWithSquareCorner", ["cx", "CSS"], (function(a, b, c, d, e, f, g) {
    __p && __p();

    function a(a) {
        "use strict";
        this.$1 = a
    }
    a.prototype.enable = function() {
        "use strict";
        b("CSS").addClass(this.$1.getRoot(), "_2n_z")
    };
    a.prototype.disable = function() {
        "use strict";
        b("CSS").removeClass(this.$1.getRoot(), "_2n_z")
    };
    e.exports = a
}), null);
__d("ReactXUIMenu", ["ReactMenu", "XUIMenuTheme", "XUIMenuWithSquareCorner"], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();
    var g, h;

    function a(a) {
        a.isReactLegacyFactory = {}, a.type = a
    }
    f = babelHelpers.inherits(c, b("ReactMenu"));
    g = f && f.prototype;

    function c(a) {
        var c = {
            behaviors: void 0,
            theme: b("XUIMenuTheme")
        };
        (!a || a.withsquarecorner !== !1) && (c.behaviors = [b("XUIMenuWithSquareCorner")]);
        g.constructor.call(this, a, c)
    }
    a(c);
    f = babelHelpers.inherits(d, b("ReactMenu").SelectableMenu);
    h = f && f.prototype;

    function d(a) {
        var c = {
            behaviors: void 0,
            theme: b("XUIMenuTheme")
        };
        (!a || a.withsquarecorner !== !1) && (c.behaviors = [b("XUIMenuWithSquareCorner")]);
        h.constructor.call(this, a, c)
    }
    a(d);
    c.SelectableMenu = d;
    c.Item = b("ReactMenu").Item;
    c.SelectableItem = b("ReactMenu").SelectableItem;
    e.exports = c
}), null);
__d("EncryptedImgUtils", [], (function(a, b, c, d, e, f) {
    var g = "ek",
        h = /^data\:/,
        i = /\?(ek\=|.*&ek\=)/;
    a = {
        extractKey: function(a) {
            var b = a.getQueryData(),
                c = b[g];
            delete b[g];
            a.setQueryData(b);
            return c
        },
        isEncrypted: function(a) {
            return !h.test(a) && i.test(a)
        }
    };
    e.exports = a
}), null);
__d("coerceImageishSprited", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        if (a && typeof a === "object" && a.sprited && a.spriteMapCssClass && a.spriteCssClass) return a;
        else return null
    }
    e.exports = a
}), null);
__d("coerceImageishURL", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        if (a && typeof a === "object" && a.sprited === !1 && typeof a.uri === "string" && a.width !== void 0 && a.height !== void 0) return a;
        else return null
    }
    e.exports = a
}), null);
__d("getImageSourceURLFromImageish", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        if (typeof a === "string") return a;
        return typeof a === "object" && (!a.sprited && a.uri && typeof a.uri === "string") ? a.uri : ""
    }
    e.exports = a
}), null);
__d("validateImageSrcPropType", ["coerceImageishSprited", "getImageSourceURLFromImageish"], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, c, d) {
        a = a[c];
        return a == null || b("coerceImageishSprited")(a) || b("getImageSourceURLFromImageish")(a) !== "" ? null : new Error("Provided `" + c + "` to `" + d + "`. Must be `null`, `undefined`, a string or an `ix` call.")
    }
    e.exports = a
}), null);
__d("warnUnsupportedProp", ["warning"], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, c, d) {
        b("warning")(!1, "%s component does not support prop `%s`.%s", a, c, d ? " " + d : "")
    }
    e.exports = a
}), null);
__d("ImageCore.react", ["Bootloader", "EncryptedImgUtils", "FBLogger", "React", "SubscriptionsHandler", "coerceImageishSprited", "coerceImageishURL", "createCancelableFunction", "getImageSourceURLFromImageish", "ifRequired", "joinClasses", "validateImageSrcPropType", "warnUnsupportedProp"], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();
    var g;
    c = {
        alt: ""
    };
    d = babelHelpers.inherits(h, b("React").Component);
    g = d && d.prototype;

    function h() {
        var a, c;
        for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++) e[f] = arguments[f];
        return c = (a = g.constructor).call.apply(a, [this].concat(e)), this.$1 = !1, this.$2 = null, this.$3 = new(b("SubscriptionsHandler"))(), this.state = {
            decryptedSrc: null
        }, c
    }
    h.prototype.$4 = function(a) {
        this.$2 && this.$2.cancel();
        var c = b("getImageSourceURLFromImageish")(this.props.encryptedSrc),
            d = b("createCancelableFunction")(function(a) {
                c === b("getImageSourceURLFromImageish")(this.props.encryptedSrc) && this.setState({
                    decryptedSrc: a
                })
            }.bind(this));
        a.load(c, d);
        this.$3.addSubscriptions({
            remove: function() {
                d.cancel()
            }
        });
        this.$2 = d
    };
    h.prototype.$5 = function() {
        b("ifRequired")("EncryptedImg", function(a) {
            this.$4(a)
        }.bind(this), function() {
            if (this.$1) return;
            this.$1 = !0;
            this.$3.addSubscriptions(b("Bootloader").loadModules(["EncryptedImg"], function(a) {
                return this.$4(a)
            }.bind(this), "ImageCore.react"))
        }.bind(this))
    };
    h.prototype.componentDidMount = function() {
        this.$5()
    };
    h.prototype.componentDidUpdate = function(a) {
        a.encryptedSrc !== this.props.encryptedSrc && this.$5()
    };
    h.prototype.componentWillUnmount = function() {
        this.$3.release()
    };
    h.prototype.render = function() {
        var a = this.props,
            c = a.encryptedSrc,
            d = a.forwardedRef;
        a = babelHelpers.objectWithoutPropertiesLoose(a, ["encryptedSrc", "forwardedRef"]);
        var e = this.state.decryptedSrc;
        b("EncryptedImgUtils").isEncrypted(c) === !1 && (b("FBLogger")("image").mustfix("The `EncryptedImage` component was rendered with a non-encrypted image (%s). Only images that meet the encrypted image test (see `EncryptedImgUtils.isEncrypted()`) should be rendered with this component. Falling back to `ImageishRenderer`.", JSON.stringify(c)), e = c);
        return b("React").createElement(i, babelHelpers["extends"]({}, a, {
            forwardedRef: d,
            src: e
        }))
    };
    h.defaultProps = c;
    h.propTypes = {
        encryptedSrc: b("validateImageSrcPropType")
    };

    function i(a) {
        __p && __p();
        var c = a.forwardedRef;
        a = babelHelpers.objectWithoutPropertiesLoose(a, ["forwardedRef"]);
        var d = b("joinClasses")(a.className, "img");
        if (a.src == null) return b("React").createElement("img", babelHelpers["extends"]({}, a, {
            className: d,
            ref: c
        }));
        var e = b("coerceImageishSprited")(a.src),
            f = !!e && a.alt != null && String(a.alt) !== "" ? b("React").createElement("u", null, a.alt) : null;
        if (typeof a.src === "string") return b("React").createElement("img", babelHelpers["extends"]({}, a, {
            className: d,
            ref: c,
            src: a.src
        }), f);
        if (e) {
            var g = e.spriteCssClass;
            e = e.spriteMapCssClass;
            a.src;
            var h = babelHelpers.objectWithoutPropertiesLoose(a, ["src"]);
            return b("React").createElement("i", babelHelpers["extends"]({}, h, {
                className: b("joinClasses")(d, e, g),
                ref: c
            }), f)
        }
        h = a.src ? b("getImageSourceURLFromImageish")(a.src) : "";
        e = b("coerceImageishURL")(a.src);
        return a.width === void 0 && a.height === void 0 && e ? b("React").createElement("img", babelHelpers["extends"]({}, a, {
            className: d,
            height: e.height,
            src: h,
            ref: c,
            width: e.width
        }), f) : b("React").createElement("img", babelHelpers["extends"]({}, a, {
            className: d,
            ref: c,
            src: h
        }), f)
    }
    i.defaultProps = c;
    i.propTypes = {
        src: b("validateImageSrcPropType")
    };

    function a(a, c) {
        Object.prototype.hasOwnProperty.call(a, "source") && b("warnUnsupportedProp")("ImageCore", "source", "Did you mean `src`?");
        var d = a.src != null ? b("getImageSourceURLFromImageish")(a.src) : "";
        if (b("EncryptedImgUtils").isEncrypted(d)) {
            a.src;
            var e = babelHelpers.objectWithoutPropertiesLoose(a, ["src"]);
            return b("React").createElement(h, babelHelpers["extends"]({}, e, {
                encryptedSrc: d,
                forwardedRef: c
            }))
        } else return b("React").createElement(i, babelHelpers["extends"]({}, a, {
            forwardedRef: c
        }))
    }
    a.displayName = "ImageCore";
    e.exports = b("React").forwardRef(a)
}), null);
__d("Image.react", ["ImageCore.react"], (function(a, b, c, d, e, f) {
    e.exports = b("ImageCore.react")
}), null);
__d("InputSelection", ["DOM", "Focus"], (function(a, b, c, d, e, f) {
    __p && __p();
    a = {
        get: function(a) {
            __p && __p();
            try {
                if (typeof a.selectionStart === "number") return {
                    start: a.selectionStart,
                    end: a.selectionEnd
                }
            } catch (a) {
                return {
                    start: 0,
                    end: 0
                }
            }
            if (!document.selection) return {
                start: 0,
                end: 0
            };
            var c = document.selection.createRange();
            if (c.parentElement() !== a) return {
                start: 0,
                end: 0
            };
            var d = a.value.length;
            if (b("DOM").isNodeOfType(a, "input")) return {
                start: -c.moveStart("character", -d),
                end: -c.moveEnd("character", -d)
            };
            else {
                var e = c.duplicate();
                e.moveToElementText(a);
                e.setEndPoint("StartToEnd", c);
                a = d - e.text.length;
                e.setEndPoint("StartToStart", c);
                return {
                    start: d - e.text.length,
                    end: a
                }
            }
        },
        set: function(a, c, d) {
            __p && __p();
            typeof d === "undefined" && (d = c);
            if (document.selection) {
                if (a.tagName == "TEXTAREA") {
                    var e = (a.value.slice(0, c).match(/\r/g) || []).length,
                        f = (a.value.slice(c, d).match(/\r/g) || []).length;
                    c -= e;
                    d -= e + f
                }
                e = a.createTextRange();
                e.collapse(!0);
                e.moveStart("character", c);
                e.moveEnd("character", d - c);
                e.select()
            } else a.selectionStart = c, a.selectionEnd = Math.min(d, a.value.length), b("Focus").set(a)
        }
    };
    e.exports = a
}), null);
__d("PageHooks", ["Arbiter", "ErrorUtils", "InitialJSLoader", "PageEvents"], (function(a, b, c, d, e, f) {
    __p && __p();
    f = {
        DOMREADY_HOOK: "domreadyhooks",
        ONLOAD_HOOK: "onloadhooks"
    };

    function g() {
        var c = a.CavalryLogger;
        !window.domready && c && c.getInstance().setTimeStamp("t_prehooks");
        j(k.DOMREADY_HOOK);
        !window.domready && c && c.getInstance().setTimeStamp("t_hooks");
        window.domready = !0;
        b("Arbiter").inform("uipage_onload", !0, "state")
    }

    function h() {
        j(k.ONLOAD_HOOK), window.loaded = !0
    }

    function i(a, c) {
        return b("ErrorUtils").applyWithGuard(a, null, null, function(a) {
            a.event_type = c, a.category = "runhook"
        }, "PageHooks:" + c)
    }

    function j(a) {
        __p && __p();
        var b = a == "onbeforeleavehooks" || a == "onbeforeunloadhooks";
        do {
            var c = window[a];
            if (!c) break;
            b || (window[a] = null);
            for (var d = 0; d < c.length; d++) {
                var e = i(c[d], a);
                if (b && e) return e
            }
        } while (!b && window[a])
    }

    function c() {
        window.domready || (window.domready = !0, j("onloadhooks")), window.loaded || (window.loaded = !0, j("onafterloadhooks"))
    }

    function d() {
        b("Arbiter").registerCallback(g, [b("PageEvents").BIGPIPE_DOMREADY, b("InitialJSLoader").INITIAL_JS_READY]), b("Arbiter").registerCallback(h, [b("PageEvents").BIGPIPE_DOMREADY, b("PageEvents").BIGPIPE_ONLOAD, b("InitialJSLoader").INITIAL_JS_READY]), b("Arbiter").subscribe(b("PageEvents").NATIVE_ONBEFOREUNLOAD, function(a, b) {
            b.warn = j("onbeforeleavehooks") || j("onbeforeunloadhooks"), b.warn || (window.domready = !1, window.loaded = !1)
        }, "new"), b("Arbiter").subscribe(b("PageEvents").NATIVE_ONUNLOAD, function(a, b) {
            j("onunloadhooks"), j("onafterunloadhooks")
        }, "new")
    }
    var k = babelHelpers["extends"]({
        _domreadyHook: g,
        _onloadHook: h,
        runHook: i,
        runHooks: j,
        keepWindowSetAsLoaded: c
    }, f);
    d();
    a.PageHooks = e.exports = k
}), null);
__d("isAsyncScrollQuery", ["UserAgent"], (function(a, b, c, d, e, f) {
    var g = null;

    function a() {
        g === null && (g = b("UserAgent").isPlatform("Mac OS X >= 10.8") && b("UserAgent").isBrowser("Safari >= 6.0"));
        return g
    }
    e.exports = a
}), null);
__d("ScrollAwareDOM", ["ArbiterMixin", "CSS", "DOM", "DOMDimensions", "HTML", "Vector", "ViewportBounds", "getDocumentScrollElement", "getElementPosition", "getViewportDimensions", "isAsyncScrollQuery", "isNode"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a, b) {
        return function() {
            var c = arguments;
            j.monitor(arguments[a], function() {
                b.apply(null, c)
            })
        }
    }

    function g(a) {
        a instanceof Array || (a = [a]);
        for (var c = 0; c < a.length; c++) {
            var d = b("HTML").replaceJSONWrapper(a[c]);
            if (d instanceof b("HTML")) return d.getRootNode();
            else if (b("isNode")(d)) return d
        }
        return null
    }

    function h(a) {
        return b("getElementPosition")(a).y > b("ViewportBounds").getTop()
    }

    function i(a) {
        a = b("getElementPosition")(a).y + b("DOMDimensions").getElementDimensions(a).height;
        var c = b("getViewportDimensions")().height - b("ViewportBounds").getBottom();
        return a >= c
    }
    var j = babelHelpers["extends"]({
        monitor: function(a, c) {
            __p && __p();
            if (b("isAsyncScrollQuery")()) return c();
            a = g(a);
            if (a) {
                var d = !!a.offsetParent;
                if (d && (h(a) || i(a))) return c();
                var e = b("Vector").getDocumentDimensions(),
                    f = c();
                if (d || a.offsetParent && !h(a)) {
                    d = b("Vector").getDocumentDimensions().sub(e);
                    e = {
                        delta: d,
                        target: a
                    };
                    j.inform("scroll", e) !== !1 && d.scrollElementBy(b("getDocumentScrollElement")())
                }
                return f
            } else return c()
        },
        replace: function(a, c) {
            var d = g(c);
            (!d || b("CSS").hasClass(d, "hidden_elem")) && (d = a);
            return j.monitor(d, function() {
                b("DOM").replace(a, c)
            })
        },
        prependContent: a(1, b("DOM").prependContent),
        insertAfter: a(1, b("DOM").insertAfter),
        insertBefore: a(1, b("DOM").insertBefore),
        setContent: a(0, b("DOM").setContent),
        appendContent: a(1, b("DOM").appendContent),
        remove: a(0, b("DOM").remove),
        empty: a(0, b("DOM").empty)
    }, b("ArbiterMixin"));
    e.exports = j
}), null);
__d("DeferredComponent.react", ["React", "createCancelableFunction", "gkx"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g;
    c = b("React").PropTypes;
    d = babelHelpers.inherits(a, b("React").Component);
    g = d && d.prototype;

    function a(a, c) {
        "use strict";
        __p && __p();
        g.constructor.call(this, a, c);
        this.$1 = function(a) {
            this.setState({
                ComponentClass: a
            }, function() {
                this.props.onComponentLoad && this.props.onComponentLoad(a)
            }.bind(this))
        }.bind(this);
        var d = null;

        function e(a) {
            d = a
        }
        this.props.deferredComponent(e);
        this.state = {
            ComponentClass: d,
            cancelableModulesLoaded: b("createCancelableFunction")(this.$1)
        }
    }
    a.prototype.componentDidMount = function() {
        "use strict";
        this.props.deferredComponent(this.state.cancelableModulesLoaded)
    };
    a.prototype.componentWillUnmount = function() {
        "use strict";
        this.state.cancelableModulesLoaded.cancel()
    };
    a.prototype.render = function() {
        "use strict";
        __p && __p();
        var a = this.state.ComponentClass;
        if (!a || this.props.deferredForcePlaceholder) return this.props.deferredPlaceholder;
        var c = this.props;
        c.deferredPlaceholder;
        c.deferredComponent;
        c.onComponentLoad;
        c.deferredForcePlaceholder;
        c = babelHelpers.objectWithoutPropertiesLoose(c, ["deferredPlaceholder", "deferredComponent", "onComponentLoad", "deferredForcePlaceholder"]);
        return b("React").createElement(a, c)
    };
    a.propTypes = {
        deferredPlaceholder: c.element.isRequired,
        deferredComponent: c.func.isRequired,
        onComponentLoad: c.func,
        deferredForcePlaceholder: c.bool
    };
    e.exports = a
}), null);
__d("JSResourceReference", ["Promise", "Bootloader", "ifRequired"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = function(a) {
        return a
    };

    function a(a) {
        "use strict";
        this.$1 = a
    }
    a.prototype.getModuleId = function() {
        "use strict";
        var a = this.$1;
        return a
    };
    a.prototype.getModuleIdAsRef = function() {
        "use strict";
        return this.$1
    };
    a.prototype.load = function() {
        "use strict";
        return new(b("Promise"))(function(a) {
            b("Bootloader").loadModules.call(b("Bootloader"), [this.$1], a, this.$2 || "JSResource: unknown caller")
        }.bind(this))
    };
    a.prototype.preload = function() {
        "use strict";
        b("Bootloader").preloadModules.call(b("Bootloader"), [this.$1])
    };
    a.prototype.equals = function(a) {
        "use strict";
        return this === a || this.$1 == a.$1
    };
    a.prototype.getModuleIfRequired = function() {
        "use strict";
        return b("ifRequired").call(null, this.$1, g)
    };
    a.prototype.__setRef = function(a) {
        "use strict";
        this.$2 = a;
        return this
    };
    a.loadAll = function(a, c) {
        "use strict";
        __p && __p();
        var d = {},
            e = !1;
        for (var f = a, g = Array.isArray(f), h = 0, f = g ? f : f[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var i;
            if (g) {
                if (h >= f.length) break;
                i = f[h++]
            } else {
                h = f.next();
                if (h.done) break;
                i = h.value
            }
            i = i;
            i = i.$2;
            i && (e = !0, d[i] = !0)
        }
        b("Bootloader").loadModules.call(b("Bootloader"), a.map(function(a) {
            return a.getModuleId()
        }), c, e ? Object.keys(d).join(":") : "JSResource: unknown caller")
    };
    e.exports = a
}), null);
__d("JSResource", ["JSResourceReference"], (function(a, b, c, d, e, f) {
    function a(a) {
        return new(b("JSResourceReference"))(a)
    }
    a.Reference = b("JSResourceReference");
    a.loadAll = b("JSResourceReference").loadAll;
    e.exports = a
}), null);
__d("PerfHelperUtils", ["cx", "DeferredComponent.react", "JSResource", "React", "joinClasses", "promiseDone"], (function(a, b, c, d, e, f, g) {
    "use strict";
    __p && __p();
    var h;
    h = babelHelpers.inherits(i, b("React").PureComponent);
    h && h.prototype;
    i.prototype.render = function() {
        var a = this.props,
            c = a.tooltip;
        a = a.className;
        return b("React").createElement("div", {
            className: "_28hn" + (this.props.color === "red" ? " _4ez8" : "") + (this.props.color === "green" ? " _28ho" : "")
        }, b("React").createElement(b("DeferredComponent.react"), {
            deferredPlaceholder: b("React").createElement("div", null),
            deferredComponent: function(a) {
                b("promiseDone")(b("JSResource")("Tooltip.react").__setRef("PerfHelperUtils").load(), a)
            },
            className: b("joinClasses")("_5_my", a),
            tooltip: c
        }, this.props.children))
    };

    function i() {
        h.apply(this, arguments)
    }

    function a(a) {
        return b("React").createElement(i, {
            color: "red",
            tooltip: "This bootloaded component has a red border\n          because " + a.moduleId + "\n          took over " + a.timeLimitSecs + " seconds (" + a.timeSpentSecs + "s) to load"
        }, a.children)
    }
    c = {
        SlowBootloadBorder: a,
        BorderedComponent: i
    };
    e.exports = c
}), null);
__d("ContextualLayerAutoFlip", ["ContextualLayerAlignmentEnum", "ContextualLayerDimensions", "DOMDimensions", "Rect", "Vector", "getDocumentScrollElement"], (function(a, b, c, d, e, f) {
    __p && __p();

    function g(a, c) {
        c = new(b("Rect"))(c).convertTo(a.domain);
        var d = Math.max(a.l, c.l);
        a = Math.min(a.r, c.r);
        return Math.max(a - d, 0)
    }

    function a(a) {
        "use strict";
        this._layer = a
    }
    a.prototype.enable = function() {
        "use strict";
        this._subscription = this._layer.subscribe("adjust", this._adjustOrientation.bind(this)), this._layer.isShown() && this._layer.updatePosition()
    };
    a.prototype.disable = function() {
        "use strict";
        this._subscription && (this._subscription.unsubscribe(), this._subscription = null), this._layer.isShown() && this._layer.updatePosition()
    };
    a.prototype._adjustOrientation = function(a, c) {
        "use strict";
        __p && __p();
        a = this.getValidPositions(c);
        if (!a.length) {
            c.invalidate();
            return
        }
        var d = b("ContextualLayerDimensions").getViewportRect(this._layer),
            e = this._getValidAlignments(c),
            f, h, i;
        for (f = 0; f < e.length; f++) {
            c.setAlignment(e[f]);
            for (h = 0; h < a.length; h++) {
                c.setPosition(a[h]);
                i = b("ContextualLayerDimensions").getLayerRect(this._layer, c);
                if (d.contains(i)) return
            }
        }
        var j = -1;
        if (c.getPreferMoreContentShownRect()) {
            var k = b("DOMDimensions").getDocumentDimensions(),
                l = new(b("Rect"))(d).convertTo("document"),
                m = 99999;
            for (h = 0; h < a.length; h++) {
                c.setPosition(a[h]);
                i = b("ContextualLayerDimensions").getLayerRect(this._layer, c);
                var n = new(b("Rect"))(i).convertTo("document");
                if (n.l >= 0 && n.r <= k.width && n.t >= 43 && n.b <= k.height) {
                    var o = l.l - n.l,
                        p = n.r - l.r,
                        q = l.t - n.t;
                    n = n.b - l.b;
                    o = (o > 0 ? o : 0) + (p > 0 ? p : 0) + (q > 0 ? q : 0) + (n > 0 ? n : 0);
                    o < m && (j = h, m = o)
                }
            }
        }
        this.__setBestPosition(j, c, a);
        p = 0;
        q = 0;
        for (f = 0; f < e.length; f++) c.setAlignment(e[f]), i = b("ContextualLayerDimensions").getLayerRect(this._layer, c), n = g(d, i), n > q && (q = n, p = f);
        c.setAlignment(e[p])
    };
    a.prototype.__setBestPosition = function(a, b, c) {
        "use strict";
        a >= 0 ? b.setPosition(c[a]) : b.setPosition(c.includes("below") ? "below" : c[0])
    };
    a.prototype.getValidPositions = function(a) {
        "use strict";
        __p && __p();
        var c = [a.getPosition(), a.getOppositePosition()],
            d = this._layer.getContextScrollParent();
        if (d === window || d === b("getDocumentScrollElement")()) return c;
        var e = this._layer.getContext(),
            f = b("Vector").getElementPosition(d, "viewport").y,
            g = b("Vector").getElementPosition(e, "viewport").y;
        if (a.isVertical()) return c.filter(function(a) {
            if (a === "above") return g >= f;
            else {
                a = f + d.offsetHeight;
                var b = g + e.offsetHeight;
                return b <= a
            }
        });
        else {
            a = f + d.offsetHeight;
            if (g >= f && g + e.offsetHeight <= a) return c;
            else return []
        }
    };
    a.prototype._getValidAlignments = function(a) {
        "use strict";
        var c = b("ContextualLayerAlignmentEnum").values;
        a = a.getAlignment();
        var d = c.indexOf(a);
        d > 0 && (c.splice(d, 1), c.unshift(a));
        return c
    };
    Object.assign(a.prototype, {
        _subscription: null
    });
    e.exports = a
}), null);
__d("ContextualLayerUpdateOnScroll", ["Event"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        "use strict";
        this._layer = a
    }
    a.prototype.enable = function() {
        "use strict";
        this._subscriptions = [this._layer.subscribe("show", this._attachScrollListener.bind(this)), this._layer.subscribe("hide", this._removeScrollListener.bind(this))]
    };
    a.prototype.disable = function() {
        "use strict";
        while (this._subscriptions.length) this._subscriptions.pop().unsubscribe()
    };
    a.prototype._attachScrollListener = function() {
        "use strict";
        if (this._listener) return;
        var a = this._layer.getContextScrollParent();
        this._listener = b("Event").listen(a, "scroll", this._layer.updatePosition.bind(this._layer))
    };
    a.prototype._removeScrollListener = function() {
        "use strict";
        this._listener && this._listener.remove(), this._listener = null
    };
    Object.assign(a.prototype, {
        _subscriptions: []
    });
    e.exports = a
}), null);
__d("LayerFadeOnShow", ["Bootloader", "Run", "emptyFunction", "ifRequired"], (function(a, b, c, d, e, f) {
    __p && __p();

    function g(a) {
        "use strict";
        this._layer = a, b("Run").onAfterLoad(function() {
            b("Bootloader").loadModules(["CSSFade"], b("emptyFunction"), "LayerFadeOnShow")
        })
    }
    g.prototype.enable = function() {
        "use strict";
        this._subscriptions = [this._layer.subscribe("show", this._animate.bind(this))]
    };
    g.prototype.disable = function() {
        "use strict";
        if (this._subscriptions) {
            while (this._subscriptions.length) this._subscriptions.pop().unsubscribe();
            this._subscriptions = null
        }
    };
    g.prototype._getDuration = function() {
        "use strict";
        return 100
    };
    g.prototype._animate = function() {
        "use strict";
        var a = this._layer.getRoot();
        b("ifRequired")("CSSFade", function(b) {
            b.show(a, {
                duration: this._getDuration()
            })
        }.bind(this), function() {})
    };
    g.forDuration = function(a) {
        var c;
        c = babelHelpers.inherits(d, g);
        c && c.prototype;

        function d() {
            c.apply(this, arguments)
        }
        d.prototype._getDuration = b("emptyFunction").thatReturns(a);
        return d
    };
    Object.assign(g.prototype, {
        _subscriptions: null
    });
    e.exports = g
}), null);
__d("LayerTabIsolation", ["TabIsolation"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        "use strict";
        this._layer = a, this._tabIsolation = null
    }
    a.prototype.enable = function() {
        "use strict";
        this._tabIsolation = new(b("TabIsolation"))(this._layer.getRoot()), this._subscriptions = [this._layer.subscribe("show", this._tabIsolation.enable.bind(this._tabIsolation)), this._layer.subscribe("hide", this._tabIsolation.disable.bind(this._tabIsolation))]
    };
    a.prototype.disable = function() {
        "use strict";
        while (this._subscriptions.length) this._subscriptions.pop().unsubscribe();
        this._tabIsolation.disable();
        this._tabIsolation = null
    };
    Object.assign(a.prototype, {
        _subscriptions: []
    });
    e.exports = a
}), null);
__d("LayerTogglerContext", ["Toggler"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        "use strict";
        this._layer = a
    }
    a.prototype.enable = function() {
        "use strict";
        this._root = this._layer.getRoot(), b("Toggler").createInstance(this._root).setSticky(!1)
    };
    a.prototype.disable = function() {
        "use strict";
        b("Toggler").destroyInstance(this._root), this._root = null
    };
    e.exports = a
}), null);
__d("ModalLayer", ["csx", "cx", "Arbiter", "ArbiterMixin", "CSS", "DataStore", "DOM", "DOMDimensions", "DOMQuery", "Event", "Scroll", "ScrollAwareDOM", "Style", "UserAgent", "Vector", "debounceAcrossTransitions", "ge", "getDocumentScrollElement", "isAsyncScrollQuery", "removeFromArray", "setTimeoutAcrossTransitions"], (function(a, b, c, d, e, f, g, h) {
    __p && __p();
    var i = [],
        j = null,
        k = null,
        l = null;

    function m() {
        l || (l = b("DOMQuery").scry(document.body, "._li")[0] || b("ge")("FB4BResponsiveMain"));
        return l
    }

    function n(a) {
        __p && __p();
        var c = {
                position: b("Vector").getScrollPosition(),
                listener: void 0
            },
            d = a.offsetTop - c.position.y;
        b("CSS").addClass(a, "_31e");
        b("Style").set(a, "top", d + "px");
        b("Arbiter").inform("reflow");
        c.listener = b("ScrollAwareDOM").subscribe("scroll", function(d, e) {
            if (b("DOMQuery").contains(a, e.target)) {
                d = a.offsetTop - e.delta.y;
                b("Style").set(a, "top", d + "px");
                c.position = c.position.add(e.delta);
                return !1
            }
            return !0
        });
        b("DataStore").set(a, "ModalLayerData", c)
    }

    function o(a, c) {
        __p && __p();
        var d = b("DataStore").get(a, "ModalLayerData");
        if (d) {
            var e = function() {
                __p && __p();
                b("CSS").removeClass(a, "_31e");
                b("Style").set(a, "top", "");
                if (c) {
                    var e = b("getDocumentScrollElement")();
                    b("Scroll").setTop(e, d.position.y);
                    b("Scroll").getTop(e) !== d.position.y && (b("Scroll").setTop(e, d.position.y + 1), b("Scroll").setTop(e, d.position.y))
                }
                b("Arbiter").inform("reflow");
                d.listener.unsubscribe();
                d.listener = null;
                b("DataStore").remove(a, "ModalLayerData")
            };
            if (c && b("isAsyncScrollQuery")()) {
                var f = b("DOM").create("div", {
                    className: "_42w"
                });
                b("Style").set(f, "height", a.offsetHeight + "px");
                b("DOM").appendContent(document.body, f);
                var g = b("getDocumentScrollElement")();
                b("Scroll").setTop(g, d.position.y);
                c = !1;
                setTimeout(function() {
                    e(), b("DOM").remove(f)
                }, 0)
            } else e()
        }
    }

    function p() {
        var a = m();
        a != null && !b("CSS").matchesSelector(a, "._31e") && n(a)
    }

    function q() {
        i.length || o(m(), !0)
    }

    function r() {
        __p && __p();
        var a = i.length;
        while (a--) {
            var c = i[a],
                d = c.getLayerRoot();
            if (d) {
                s(d, 0);
                c = c.getLayerContentRoot();
                if (c) {
                    c = c.offsetWidth + b("DOMDimensions").measureElementBox(c, "width", !1, !1, !0);
                    s(d, c)
                }
            }
        }
    }

    function s(a, c) {
        b("Style").set(a, "min-width", c + (c ? "px" : ""))
    }

    function t(a) {
        "use strict";
        this._layer = a, this._enabled = !1
    }
    t.prototype.enable = function() {
        "use strict";
        if (!m()) return;
        this._subscription = this._layer.subscribe(["show", "hide"], function(a) {
            a == "show" ? this._addModal() : this._removeModal()
        }.bind(this));
        this._layer.isShown() && this._addModal();
        this._enabled = !0
    };
    t.prototype.disable = function() {
        "use strict";
        if (!m()) return;
        this._subscription && this._subscription.unsubscribe();
        this._layer.isShown() && this._removeModal();
        this._enabled = !1
    };
    t.prototype._addModal = function() {
        "use strict";
        __p && __p();
        var a = this.getLayerRoot();
        b("CSS").addClass(a, "_3qw");
        this._wash = b("DOM").create("div", {
            className: "_3ixn"
        });
        b("DOM").prependContent(a, this._wash);
        a = i[i.length - 1];
        a ? n(a.getLayerRoot()) : p();
        a = b("getDocumentScrollElement")();
        b("Scroll").setTop(a, 0);
        if (!i.length) {
            a = b("debounceAcrossTransitions")(r, 100);
            j = b("Event").listen(window, "resize", a);
            k = b("Arbiter").subscribe("reflow", a)
        }
        i.push(this);
        t.inform("show", this);
        setTimeout(r, 0)
    };
    t.prototype._removeModal = function() {
        "use strict";
        __p && __p();
        var a = this.getLayerRoot();
        b("CSS").removeClass(a, "_3qw");
        b("DOM").remove(this._wash);
        this._wash = null;
        s(a, 0);
        var c = this === i[i.length - 1];
        b("removeFromArray")(i, this);
        i.length || (j && j.remove(), j = null, k && k.unsubscribe(), k = null);
        var d;
        b("UserAgent").isBrowser("Safari") && (a = b("Event").listen(document.documentElement, "mousewheel", b("Event").prevent), d = a.remove.bind(a));
        b("setTimeoutAcrossTransitions")(function() {
            var a = i[i.length - 1];
            a ? (o(a.getLayerRoot(), c), t.inform("show", a)) : (q(), t.inform("hide", this));
            i.length && setTimeout(r, 0);
            b("UserAgent").isBrowser("Safari") && setTimeout(function() {
                d()
            }, 0)
        }.bind(this), 200)
    };
    t.prototype.getLayerRoot = function() {
        "use strict";
        return this._enabled ? this._layer.getRoot() : null
    };
    t.prototype.getLayerContentRoot = function() {
        "use strict";
        return this._enabled ? this._layer.getContentRoot() : null
    };
    t.getTopmostModalLayer = function() {
        "use strict";
        return i[i.length - 1]
    };
    Object.assign(t, b("ArbiterMixin"));
    e.exports = t
}), null);
__d("DialogPosition", ["Vector"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = 40,
        h;
    a = {
        calculateTopMargin: function(a, c, d, e) {
            __p && __p();
            d === void 0 && (d = null);
            e === void 0 && (e = !1);
            var f = b("Vector").getViewportDimensions(),
                i = !1;
            e && d && (i = d + c > f.y);
            if (d != null && !i) return d;
            if (h) return h;
            e = Math.floor((f.x + a) * (f.y - c) / (4 * f.x));
            return Math.max(e, g)
        },
        setFixedTopMargin: function(a) {
            h = a
        }
    };
    e.exports = a
}), null);
__d("DialogX", ["cx", "fbt", "Arbiter", "CSS", "DialogPosition", "DOMQuery", "Event", "JSXDOM", "Layer", "LayerAutoFocus", "LayerButtons", "LayerFormHooks", "LayerRefocusOnHide", "LayerTabIsolation", "LayerTogglerContext", "ModalLayer", "Style", "Vector", "debounce", "getOrCreateDOMID", "goURI", "shield"], (function(a, b, c, d, e, f, g, h) {
    __p && __p();
    var i, j;
    i = babelHelpers.inherits(a, b("Layer"));
    j = i && i.prototype;
    a.prototype._configure = function(a, c) {
        "use strict";
        __p && __p();
        j._configure.call(this, a, c);
        b("CSS").addClass(this.getRoot(), "_4-hy");
        if (a.autohide) var d = this.subscribe("show", function() {
            d.unsubscribe(), window.setTimeout(b("shield")(this.hide, this), a.autohide)
        }.bind(this));
        if (a.redirectURI) var e = this.subscribe("hide", function() {
            e.unsubscribe(), b("goURI")(a.redirectURI)
        });
        this._fixedTopPosition = a.fixedTopPosition;
        this._ignoreFixedTopInShortViewport = a.ignoreFixedTopInShortViewport
    };
    a.prototype._getDefaultBehaviors = function() {
        "use strict";
        return j._getDefaultBehaviors.call(this).concat([k, b("ModalLayer"), b("LayerAutoFocus"), b("LayerButtons"), b("LayerFormHooks"), b("LayerTabIsolation"), b("LayerTogglerContext"), b("LayerRefocusOnHide")])
    };
    a.prototype._buildWrapper = function(a, c) {
        "use strict";
        __p && __p();
        var d = a.xui ? "_4t2a" : "_t",
            e = a.xui ? "_59s7" : "_1yv";
        this._innerContent = b("JSXDOM").div(null, c);
        c = {
            className: e,
            role: "dialog"
        };
        if (a.labelledBy) c["aria-labelledby"] = a.labelledBy;
        else if (a.label) c["aria-label"] = a.label;
        else if (a.titleID) c["aria-labelledby"] = a.titleID;
        else if (a.titleClass) {
            e = b("DOMQuery").scry(this._innerContent, a.titleClass);
            if (e.length) {
                e = b("getOrCreateDOMID")(e[0]);
                c["aria-labelledby"] = e
            } else c["aria-label"] = this._getDefaultLabel()
        } else c["aria-label"] = this._getDefaultLabel();
        e = {
            className: d
        };
        a["data-testid"] && (e["data-testid"] = a["data-testid"]);
        this._wrapper = b("JSXDOM").div(c, b("JSXDOM").div(e, this._innerContent));
        a.width != null && this.setWidth(a.width);
        a.height != null && this.setHeight(a.height);
        return b("JSXDOM").div({
            className: "_10"
        }, this._wrapper)
    };
    a.prototype._getDefaultLabel = function() {
        "use strict";
        return h._("Dialog content")
    };
    a.prototype.getContentRoot = function() {
        "use strict";
        return this._wrapper
    };
    a.prototype.getInnerContent = function() {
        "use strict";
        return this._innerContent
    };
    a.prototype.updatePosition = function() {
        "use strict";
        var a = b("Vector").getElementDimensions(this._wrapper);
        a = b("DialogPosition").calculateTopMargin(a.x, a.y, this._fixedTopPosition, this._ignoreFixedTopInShortViewport);
        b("Style").set(this._wrapper, "margin-top", a + "px");
        this.inform("update_position", {
            type: "DialogX",
            top: a
        })
    };
    a.prototype.setWidth = function(a) {
        "use strict";
        a = Math.floor(a);
        if (a === this._width) return;
        this._width = a;
        b("Style").set(this._wrapper, "width", a + "px")
    };
    a.prototype.getWidth = function() {
        "use strict";
        return this._width
    };
    a.prototype.setHeight = function(a) {
        "use strict";
        a = Math.floor(a);
        if (a === this._height) return;
        this._height = a;
        b("Style").set(this._wrapper, "height", a + "px")
    };
    a.prototype.getFixedTopPosition = function() {
        "use strict";
        return this._fixedTopPosition
    };
    a.prototype.shouldIgnoreFixedTopInShortViewport = function() {
        "use strict";
        return this._ignoreFixedTopInShortViewport
    };

    function a() {
        "use strict";
        i.apply(this, arguments)
    }

    function k(a) {
        "use strict";
        this._layer = a
    }
    k.prototype.enable = function() {
        "use strict";
        this._subscription = this._layer.subscribe(["show", "hide"], function(a) {
            a === "show" ? (this._attach(), b("Arbiter").inform("layer_shown", {
                type: "DialogX"
            })) : (this._detach(), b("Arbiter").inform("layer_hidden", {
                type: "DialogX"
            }))
        }.bind(this))
    };
    k.prototype.disable = function() {
        "use strict";
        this._subscription.unsubscribe(), this._subscription = null, this._resize && this._detach()
    };
    k.prototype._attach = function() {
        "use strict";
        this._layer.updatePosition(), this._resize = b("Event").listen(window, "resize", b("debounce")(this._layer.updatePosition.bind(this._layer)))
    };
    k.prototype._detach = function() {
        "use strict";
        this._resize.remove(), this._resize = null
    };
    Object.assign(k.prototype, {
        _subscription: null,
        _resize: null
    });
    e.exports = a
}), null);
__d("XUIText.react", ["cx", "React", "joinClasses"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h;
    c = b("React").PropTypes;
    h = babelHelpers.inherits(a, b("React").Component);
    h && h.prototype;
    a.prototype.getAriaLevel = function(a, b) {
        "use strict";
        __p && __p();
        if (a === "header1") return 1;
        else if (a === "header2") return 2;
        else if (a === "header3") return 3;
        else if (a === "header4") return 4;
        return b
    };
    a.prototype.render = function() {
        "use strict";
        var a = this.props,
            c = a.color,
            d = a.palette,
            e = a.type,
            f = a.size,
            g = a.weight,
            h = a.display,
            i = a.headingLevel,
            j = a.children;
        a = babelHelpers.objectWithoutPropertiesLoose(a, ["color", "palette", "type", "size", "weight", "display", "headingLevel", "children"]);
        e = (e === "serif" ? "_5s6c" : "") + (f === "small" ? " _50f3" : "") + (f === "medium" ? " _50f4" : "") + (f === "large" ? " _50f5" : "") + (f === "xlarge" || f === "xlarge_DEPRECATED" ? " _50f6" : "") + (g === "bold" ? " _50f7" : "") + (g === "normal" ? " _5kx5" : "") + (f === "display" ? " _2iei" : "") + (f === "header1" ? " _2iej" : "") + (f === "header2" ? " _2iek" : "") + (f === "header3" ? " _2iel" : "") + (f === "header4" ? " _2iem" : "") + (f === "body1" ? " _2ien" : "") + (f === "body2" ? " _2ieo" : "") + (f === "body3" ? " _2iep" : "") + (f === "meta1" ? " _2ieq" : "") + (c === "blueLink" ? " _rzx" : "") + (c === "white" ? " _2ier" : "") + (c === "highlight" ? " _1hk0" : "") + (c === "positive" ? " _2iet" : "") + (c === "negative" ? " _2ieu" : "") + (d !== "dark" && c === "placeholder" ? " _rzy" : "") + (d !== "dark" && c === "primary" ? " _2iev" : "") + (d !== "dark" && c === "secondary" ? " _2iex" : "") + (d !== "dark" && c === "disabled" ? " _2iey" : "") + (d === "dark" && c === "primary" ? " _2iez" : "") + (d === "dark" && c === "secondary" ? " _2ie-" : "") + (d === "dark" && c === "disabled" ? " _2ie_" : "");
        g = this.getAriaLevel(f, i);
        g !== void 0 && g !== null && (a = babelHelpers["extends"]({}, a, {
            role: "heading",
            "aria-level": "" + g
        }));
        return h === "block" ? b("React").createElement("div", babelHelpers["extends"]({}, a, {
            className: b("joinClasses")(this.props.className, e)
        }), j) : b("React").createElement("span", babelHelpers["extends"]({}, a, {
            className: b("joinClasses")(this.props.className, e)
        }), j)
    };

    function a() {
        "use strict";
        h.apply(this, arguments)
    }
    a.propTypes = {
        color: c.oneOf(["primary", "secondary", "blueLink", "placeholder", "disabled", "white", "highlight", "positive", "negative"]),
        display: c.oneOf(["inline", "block"]),
        headingLevel: c.oneOf([1, 2, 3, 4, 5, 6]),
        palette: c.oneOf(["light", "dark"]),
        size: c.oneOf(["small", "medium", "large", "xlarge", "xlarge_DEPRECATED", "inherit", "display", "header1", "header2", "header3", "header4", "body1", "body2", "body3", "meta1"]),
        type: c.oneOf(["serif", "inherit"]),
        weight: c.oneOf(["bold", "inherit", "normal"])
    };
    a.defaultProps = {
        type: "inherit",
        size: "inherit",
        weight: "inherit",
        display: "inline"
    };
    e.exports = a
}), null);
__d("LayoutColumn.react", ["cx", "React", "joinClasses"], (function(a, b, c, d, e, f, g) {
    function a(a, c) {
        var d = a.className,
            e = a.children;
        a = babelHelpers.objectWithoutPropertiesLoose(a, ["className", "children"]);
        return b("React").createElement("div", babelHelpers["extends"]({
            ref: c
        }, a, {
            className: b("joinClasses")(d, "_4bl7")
        }), e)
    }
    e.exports = b("React").forwardRef(a)
}), null);
__d("LayoutFillColumn.react", ["cx", "React", "joinClasses"], (function(a, b, c, d, e, f, g) {
    function a(a, c) {
        var d = a.className,
            e = a.children;
        a = babelHelpers.objectWithoutPropertiesLoose(a, ["className", "children"]);
        return b("React").createElement("div", babelHelpers["extends"]({
            ref: c
        }, a, {
            className: b("joinClasses")(d, "_4bl9")
        }), e)
    }
    e.exports = b("React").forwardRef(a)
}), null);
__d("Layout.react", ["cx", "LayoutColumn.react", "LayoutFillColumn.react", "React", "joinClasses"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h;
    h = babelHelpers.inherits(i, b("React").Component);
    h && h.prototype;
    i.prototype.render = function() {
        "use strict";
        var a = !1,
            c = !1,
            d = this.props,
            e = d.children,
            f = d.className;
        d = babelHelpers.objectWithoutPropertiesLoose(d, ["children", "className"]);
        b("React").Children.forEach(e, function(b) {
            if (!b) return;
            b.type === i.FillColumn ? c = !0 : c && (a = !0)
        });
        return b("React").createElement("div", babelHelpers["extends"]({}, d, {
            className: b("joinClasses")(f, a ? "_5aj7" : "clearfix _ikh")
        }), e)
    };

    function i() {
        "use strict";
        h.apply(this, arguments)
    }
    i.Column = b("LayoutColumn.react");
    i.FillColumn = b("LayoutFillColumn.react");
    e.exports = i
}), null);
__d("DateConsts", [], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = 1e3;
    a = 60;
    b = 60;
    c = 24;
    d = 7;
    f = 12;
    var h = 1e3,
        i = 30.43,
        j = 365.242,
        k = a * b,
        l = k * c,
        m = l * d,
        n = l * j,
        o = g * a,
        p = o * b,
        q = g * l,
        r = q * d,
        s = q * j,
        t = {
            SUNDAY: 0,
            MONDAY: 1,
            TUESDAY: 2,
            WEDNESDAY: 3,
            THURSDAY: 4,
            FRIDAY: 5,
            SATURDAY: 6
        };
    Object.freeze(t);
    t = {
        getDaysInMonth: function(a, b) {
            return new Date(a, b, 0).getDate()
        },
        getCurrentTimeInSeconds: function() {
            return Date.now() / g
        },
        DAYS: t,
        MS_PER_SEC: g,
        MS_PER_MIN: o,
        MS_PER_HOUR: p,
        MS_PER_DAY: q,
        MS_PER_WEEK: r,
        MS_PER_YEAR: s,
        SEC_PER_MIN: a,
        SEC_PER_HOUR: k,
        SEC_PER_DAY: l,
        SEC_PER_WEEK: m,
        SEC_PER_YEAR: n,
        US_PER_MS: h,
        MIN_PER_HOUR: b,
        HOUR_PER_DAY: c,
        DAYS_PER_WEEK: d,
        MONTHS_PER_YEAR: f,
        AVG_DAYS_PER_MONTH: i,
        AVG_DAYS_PER_YEAR: j,
        "private": {
            instantRange: {
                since: -864e10,
                until: 864e10 + 1
            }
        }
    };
    e.exports = t
}), null);
__d("keyMirror", ["invariant"], (function(a, b, c, d, e, f, g) {
    "use strict";
    __p && __p();

    function a(a) {
        var b = {};
        a instanceof Object && !Array.isArray(a) || g(0, 3387);
        for (var c in a) {
            if (!Object.prototype.hasOwnProperty.call(a, c)) continue;
            b[c] = c
        }
        return b
    }
    e.exports = a
}), null);
__d("Dispatcher_DEPRECATED", ["invariant", "FBLogger", "monitorCodeUse"], (function(a, b, c, d, e, f, g) {
    "use strict";
    __p && __p();
    var h = "ID_";

    function a() {
        this.$1 = {}, this.$2 = !1, this.$3 = {}, this.$4 = {}, this.$5 = 1
    }
    a.prototype.register = function(a, b) {
        b = this.__genID(b);
        this.$1[b] = a;
        return b
    };
    a.prototype.unregister = function(a) {
        this.$1[a] || g(0, 1331, a), delete this.$1[a]
    };
    a.prototype.waitFor = function(a) {
        __p && __p();
        this.$2 || g(0, 1332);
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (this.$4[c]) {
                this.$3[c] || g(0, 2380, c);
                continue
            }
            this.$1[c] || g(0, 2381, c);
            this.$7(c)
        }
    };
    a.prototype.dispatch = function(a) {
        j(this.$2, this.$6, a);
        this.$8(a);
        try {
            for (var b in this.$1) {
                if (this.$4[b]) continue;
                this.$7(b)
            }
        } finally {
            this.$9()
        }
    };
    a.prototype.isDispatching = function() {
        return this.$2
    };
    a.prototype.$7 = function(a) {
        this.$4[a] = !0, this.__invokeCallback(a, this.$1[a], this.$6), this.$3[a] = !0
    };
    a.prototype.__invokeCallback = function(a, b, c) {
        b(c)
    };
    a.prototype.$8 = function(a) {
        for (var b in this.$1) this.$4[b] = !1, this.$3[b] = !1;
        this.$6 = a;
        this.$2 = !0
    };
    a.prototype.$9 = function() {
        delete this.$6, this.$2 = !1
    };
    a.prototype.__genID = function(a) {
        var b = a ? a + "_" : h;
        a = a || b + this.$5++;
        while (this.$1[a]) a = b + this.$5++;
        return a
    };

    function i(a) {
        __p && __p();
        var b = "<unknown>";
        if (!a) return b;
        if (typeof a.type === "string") return a.type;
        if (typeof a.actionType === "string") return a.actionType;
        if (!a.action) return b;
        if (typeof a.action.type === "string") return a.action.type;
        return typeof a.action.actionType === "string" ? a.action.actionType : b
    }

    function j(a, c, d) {
        if (a) {
            a = new Error("Cannot dispatch in the middle of a dispatch");
            b("FBLogger")("flux_dispatcher").catching(a).mustfix("Tried to dispatch action %s while already dispatching %s", i(d), i(c));
            throw a
        }
    }
    e.exports = a
}), null);
__d("ExplicitRegistrationDispatcherUtils", ["emptyFunction", "gkx", "monitorCodeUse", "setImmediate"], (function(a, b, c, d, e, f) {
    "use strict";
    a = !1;
    c = b("emptyFunction");
    e.exports = {
        warn: c,
        inlineRequiresEnabled: a
    }
}), null);
__d("ExplicitRegistrationDispatcher", ["Dispatcher_DEPRECATED", "ExplicitRegistrationDispatcherUtils", "setImmediate"], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();
    var g;
    c = babelHelpers.inherits(a, b("Dispatcher_DEPRECATED"));
    g = c && c.prototype;

    function a(a) {
        a = a.strict;
        g.constructor.call(this);
        this.$ExplicitRegistrationDispatcher2 = a;
        this.$ExplicitRegistrationDispatcher1 = {}
    }
    a.prototype.explicitlyRegisterStore = function(a) {
        a = a.getDispatchToken();
        this.$ExplicitRegistrationDispatcher1[a] = !0;
        return a
    };
    a.prototype.explicitlyRegisterStores = function(a) {
        return a.map(function(a) {
            return this.explicitlyRegisterStore(a)
        }.bind(this))
    };
    a.prototype.register = function(a, b) {
        b = this.__genID(b);
        this.$ExplicitRegistrationDispatcher1[b] = !1;
        a = g.register.call(this, this.$ExplicitRegistrationDispatcher4.bind(this, b, a), b);
        return a
    };
    a.prototype.$ExplicitRegistrationDispatcher4 = function(a, b, c) {
        (this.$ExplicitRegistrationDispatcher1[a] || !this.$ExplicitRegistrationDispatcher2) && this.__invokeCallback(a, b, c)
    };
    a.prototype.unregister = function(a) {
        g.unregister.call(this, a), delete this.$ExplicitRegistrationDispatcher1[a]
    };
    a.prototype.__getMaps = function() {};
    e.exports = a
}), null);
__d("ExplicitRegistrationReactDispatcher", ["ExplicitRegistrationDispatcher", "ReactDOM"], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();
    var g, h;
    g = babelHelpers.inherits(a, b("ExplicitRegistrationDispatcher"));
    h = g && g.prototype;
    a.prototype.dispatch = function(a) {
        b("ReactDOM").unstable_batchedUpdates(function() {
            h.dispatch.call(this, a)
        }.bind(this))
    };

    function a() {
        g.apply(this, arguments)
    }
    e.exports = a
}), null);
__d("asset", [], (function(a, b, c, d, e, f) {
    function a(a) {
        throw new Error("asset(" + JSON.stringify(a) + "): Unexpected asset reference.")
    }
    e.exports = a
}), null);
__d("fbglyph", [], (function(a, b, c, d, e, f) {
    function a(a) {
        throw new Error("fbglyph(" + JSON.stringify(a) + "): Unexpected fbglyph reference.")
    }
    e.exports = a
}), null);
__d("VideoChainingCaller", [], (function(a, b, c, d, e, f) {
    e.exports = Object.freeze({
        INTERNAL: "internal",
        WWW_FEED_PIVOTS: "www_feed_pivots",
        WWW_FEED_SNOWLIFT: "www_feed_snowlift",
        MISC_PHOTO_SET: "misc_photo_set",
        MOBILE: "mobile",
        SEARCH: "search",
        WWW_FEED_RHC: "www_feed_rhc",
        WWW_NOTIFICATION: "www_notification",
        WWW_PERMALINK: "www_permalink",
        WWW_PERMALINK_RHC: "www_permalink_rhc",
        WWW_PERMALINK_RHC_FROM_NOTIFICATION: "www_permalink_rhc_from_notification",
        MY_VIDEO_CHANNELS_ENT_QUERY: "my_video_channels_ent_query",
        TOP_FOLLOWED_VIDEO_CHANNELS_ENT_QUERY: "top_followed_video_channels_ent_query",
        BADGE: "badge",
        PAGINATION: "pagination",
        SUBTITLE: "subtitle",
        CHANNEL_VIEW_FROM_UNKNOWN: "channel_view_from_unknown",
        CHANNEL_VIEW_FROM_NEWSFEED: "channel_view_from_newsfeed",
        CHANNEL_VIEW_FROM_EXPLOREFEED: "channel_view_from_explorefeed",
        LIVE_INDEXER_FROM_EXPLOREFEED: "live_indexer_from_explorefeed",
        LIVE_INDEXER_FROM_NEWSFEED: "live_indexer_from_newsfeed",
        NN_INDEXER_FROM_NEWSFEED: "nn_indexer_from_newsfeed",
        CHANNEL_VIEW_FROM_SEARCH: "channel_view_from_search",
        CHANNEL_VIEW_FROM_NEWSFEED_PIVOT: "channel_view_from_newsfeed_pivot",
        NEWSFEED_PIVOT_INLINE: "newsfeed_pivot_inline",
        MOBILE_NEWSFEED_PIVOT_INLINE: "mobile_newsfeed_pivot_inline",
        CHANNEL_VIEW_FROM_PAGE_CALL_TO_ACTION: "channel_view_from_page_call_to_action",
        CHANNEL_VIEW_FROM_PAGE_TIMELINE: "channel_view_from_page_timeline",
        CHANNEL_VIEW_FROM_PAGE_TIMELINE_FEATURED: "channel_view_from_page_timeline_featured",
        CHANNEL_VIEW_FROM_PAGE_VIDEO_TAB: "channel_view_from_page_video_tab",
        CHANNEL_VIEW_FROM_PAGE_HOME_HERO: "channel_view_from_page_home_hero",
        CHANNEL_VIEW_FROM_USER_TIMELINE: "channel_view_from_user_timeline",
        CHANNEL_VIEW_FROM_USER_VIDEO_TAB: "channel_view_from_user_video_tab",
        CHANNEL_VIEW_FROM_GROUP_TIMELINE: "channel_view_from_group_timeline",
        CHANNEL_VIEW_FROM_GROUP_VIDEO_TAB: "channel_view_from_group_video_tab",
        CHANNEL_VIEW_FROM_VIDEO_PAGE_SPOTLIGHT: "channel_view_from_video_page_spotlight",
        CHANNEL_VIEW_FROM_VIDEO_PAGE_VIDEO_LIST: "channel_view_from_video_page_video_list",
        CHANNEL_VIEW_FROM_VIDEO_PAGE_VIDEO_TAB: "channel_view_from_video_page_video_tab",
        CHANNEL_VIEW_FROM_SAVED_STORY: "channel_view_from_saved_story",
        SAVED_STORY_INLINE: "saved_story_inline",
        CHANNEL_VIEW_FROM_SHARED_WITH_YOU_STORY: "channel_view_from_shared_with_you_story",
        SHARED_WITH_YOU_STORY_INLINE: "shared_with_you_story_inline",
        CHANNEL_VIEW_FROM_LATEST_FROM_YOUR_CHANNELS_STORY: "channel_view_from_latest_from_your_channels_story",
        LATEST_FROM_YOUR_CHANNELS_STORY_INLINE: "latest_from_your_channels_story_inline",
        CHANNEL_VIEW_FROM_CHANNEL_PIVOT: "channel_view_from_channel_pivot",
        CHANNEL_PIVOT_INLINE: "channel_pivot_inine",
        CHANNEL_VIEW_FROM_CHANNEL_RECOMMENDED_CHANNEL_STORY: "channel_view_from_recommended_channel_story",
        RECOMMENDED_CHANNEL_STORY_INLINE: "recommended_channel_story_inline",
        CHANNEL_VIEW_FROM_VIDEO_HOME: "channel_view_from_video_home",
        VIDEO_HOME_INLINE: "video_home_inline",
        VIDEO_HOME_CHANNEL_SEE_ALL: "video_home_channel_see_all",
        SOCIAL_PLAYER_UP_NEXT: "social_player_up_next",
        CHANNEL_VIEW_FROM_CASTING: "channel_view_from_casting",
        CONNECTED_TV: "connected_tv",
        CONNECTED_TV_DISCOVERY: "connected_tv_discovery",
        CONNECTED_TV_PLAYER: "connected_tv_player",
        CONNECTED_TV_PROFILE: "connected_tv_profile",
        VIDEO_HOME_FEED: "video_home_feed",
        VIDEO_HOME_HERO: "video_home_hero",
        FEED_SURVEY_SWIPE: "feed_survey_swipe",
        FEED_PIVOTS_INLINE: "feed_pivots_inline",
        CHANNEL_VIEW_FROM_FEED_PIVOTS: "channel_view_from_feed_pivots",
        VIDEO_SETS_CACHE_REFRESH: "video_sets_cache_refresh",
        VIDEO_SETS_CACHE_CHECK: "video_sets_cache_check",
        DUMMY_STORY_RECOMMENDED_VIDEOS: "dummy_story_recommended_videos",
        DUMMY_STORY_FRIENDS_ENJOYING: "dummy_story_friends_enjoying",
        LIVE_EVENT_VIDEO_SET: "live_event_video_set",
        LIVE_VIDEOS_SET: "live_videos_set",
        SINGLE_CREATOR_VIDEO_SET: "single_creator_video_set",
        FRT_TOOL: "frt_tool",
        DUMMY_STORY_FRIENDS_ENJOYING_NOW: "dummy_story_friends_enjoying_now",
        DUMMY_STORY_DUMMY_ACTION: "dummy_story_dummy_action",
        OCULUS_VIDEO: "oculus_video",
        TRENDING_DEMOGRAPHICS_LIVE: "trending_demographics_live",
        LIVE_MAP: "live_map",
        UNCONNECTED_LIVE_VIDEO: "unconnected_live_video",
        PROFILE_VIDEO_GALLERY: "profile_video_gallery",
        CHANNEL_VIEW_FROM_PLAYLIST: "channel_view_from_playlist",
        OCULUS_SOCIAL_HUB: "oculus_social_hub",
        AKIRA: "akira",
        IS_LIVE_VIDEO_CHAINING: "is_live_video_chaining",
        IS_LIVE_VIDEO_CHAINING_OTHERS: "is_live_video_chaining_others",
        VIDEO_CREATOR_CHAINING: "video_creator_chaining",
        TAHOE: "tahoe",
        LIVING_ROOM: "living_room",
        SHOWS_COVER_TRAILER: "shows_cover_trailer",
        SHOWS_EPISODES_TAB: "shows_episodes_tab",
        SHOWS_PLAYLISTS_TAB: "shows_playlists_tab",
        SHOWS_HOME_TAB: "shows_home_tab",
        SHOWS_MORE_VIDEOS_TAB: "shows_more_videos_tab",
        SHOW_EPISODE_FEED_RECOMMENDATIONS: "show_episode_feed_recommendations",
        PARENT_PAGE_TIMELINE: "parent_page_timeline",
        WATCH_WATCHLIST_TAB: "watch_watchlist_tab",
        WATCH_FEED_TAB: "watch_feed_tab",
        WATCH_INJECTION: "watch_injection",
        WATCH_TOPIC_FEED: "watch_topic_feed",
        WATCH_TOPIC_CHANNEL_FEED: "watch_topic_channel_feed",
        WATCH_SUBTOPIC_CHANNEL_FEED: "watch_subtopic_channel_feed",
        WATCH_SECTION_SEE_ALL: "watch_section_see_all",
        SOCIAL_PLAYER_FROM_VIDEO_HOME: "social_player_from_video_home",
        WNS: "wns",
        EXPLORE_FEED_DEEP_DIVE: "explore_feed_deep_dive",
        VOYAGER: "voyager",
        GAMES_VIDEO_CHANNEL: "games_video_channel",
        LOL_VIDEO_FEED: "lol_video_feed",
        AVD_VIDEO: "avd",
        TEST: "test",
        UNKNOWN: "unknown"
    })
}), null);
__d("BinarySearch", ["invariant", "keyMirror"], (function(a, b, c, d, e, f, g) {
    "use strict";
    __p && __p();
    a = b("keyMirror")({
        LEAST_UPPER_BOUND: null,
        GREATEST_LOWER_BOUND: null,
        LEAST_STRICT_UPPER_BOUND: null,
        GREATEST_STRICT_LOWER_BOUND: null
    });
    var h = function(a, b) {
            typeof a === "number" && typeof b === "number" || g(0, 3928);
            return a - b
        },
        i = {
            LEAST_UPPER_BOUND: a.LEAST_UPPER_BOUND,
            GREATEST_LOWER_BOUND: a.GREATEST_LOWER_BOUND,
            LEAST_STRICT_UPPER_BOUND: a.LEAST_STRICT_UPPER_BOUND,
            GREATEST_STRICT_LOWER_BOUND: a.GREATEST_STRICT_LOWER_BOUND,
            find: function(a, b, c, d, e) {
                e === void 0 && (e = h);
                var f = i.LEAST_UPPER_BOUND;
                f = i.findBound(a, b, c, d, e, f);
                if (c <= f && f < d) {
                    c = a(f);
                    return e(c, b) === 0 ? c : void 0
                } else return void 0
            },
            findIndex: function(a, b, c, d, e) {
                e === void 0 && (e = h);
                var f = i.LEAST_UPPER_BOUND;
                f = i.findBound(a, b, c, d, e, f);
                if (c <= f && f < d) return e(a(f), b) === 0 ? f : -1;
                else return -1
            },
            findBound: function(a, b, c, d, e, f) {
                switch (f) {
                    case i.LEAST_UPPER_BOUND:
                        return i.leastUpperBound(a, b, c, d, e);
                    case i.GREATEST_LOWER_BOUND:
                        return i.greatestLowerBound(a, b, c, d, e);
                    case i.LEAST_STRICT_UPPER_BOUND:
                        return i.leastStrictUpperBound(a, b, c, d, e);
                    case i.GREATEST_STRICT_LOWER_BOUND:
                        return i.greatestStrictLowerBound(a, b, c, d, e);
                    default:
                        g(0, 1508, f)
                }
            },
            leastUpperBound: function(a, b, c, d, e) {
                c = c;
                d = d;
                while (c + 1 < d) {
                    var f = c + Math.floor((d - c) / 2);
                    e(a(f), b) >= 0 ? d = f : c = f
                }
                return c < d && e(a(c), b) >= 0 ? c : d
            },
            greatestLowerBound: function(a, b, c, d, e) {
                return i.leastStrictUpperBound(a, b, c, d, e) - 1
            },
            leastStrictUpperBound: function(a, b, c, d, e) {
                c = c;
                d = d;
                while (c + 1 < d) {
                    var f = c + Math.floor((d - c) / 2);
                    e(a(f), b) > 0 ? d = f : c = f
                }
                return c < d && e(a(c), b) > 0 ? c : d
            },
            greatestStrictLowerBound: function(a, b, c, d, e) {
                return i.leastUpperBound(a, b, c, d, e) - 1
            },
            findInArray: function(a, b, c) {
                return i.find(function(b) {
                    return a[b]
                }, b, 0, a.length, c)
            },
            findIndexInArray: function(a, b, c) {
                return i.findIndex(function(b) {
                    return a[b]
                }, b, 0, a.length, c)
            },
            findBoundInArray: function(a, b, c, d) {
                return i.findBound(function(b) {
                    return a[b]
                }, b, 0, a.length, c, d)
            }
        };
    e.exports = i
}), null);