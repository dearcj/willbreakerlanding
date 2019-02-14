if (self.CavalryLogger) {
    CavalryLogger.start_js(["lniow"]);
}

__d("isValidReactElement", [], (function(a, b, c, d, e, f) {
    var g = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 60103;

    function a(a) {
        return !!(typeof a === "object" && a !== null && a.$$typeof === g)
    }
    e.exports = a
}), null);
__d("BootloadedReact", ["Bootloader", "isValidReactElement"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = function(a) {
        b("Bootloader").loadModules(["ReactDOM"], a, "BootloadedReact")
    };
    a = {
        isValidElement: function(a) {
            return b("isValidReactElement")(a)
        },
        render: function(a, b, c) {
            g(function(d) {
                d.render(a, b, function() {
                    c && c(this)
                })
            })
        },
        unmountComponentAtNode: function(a, b) {
            g(function(c) {
                c.unmountComponentAtNode(a), b && b()
            })
        }
    };
    e.exports = a
}), null);
__d("getOrCreateDOMID", ["uniqueID"], (function(a, b, c, d, e, f) {
    function a(a) {
        a.id || (a.id = b("uniqueID")());
        return a.id
    }
    e.exports = a
}), null);
__d("ContextualThing", ["CSS", "containsNode", "ge", "getOrCreateDOMID"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = {
        register: function(a, c) {
            a.setAttribute("data-ownerid", b("getOrCreateDOMID")(c))
        },
        containsIncludingLayers: function(a, c) {
            c = c;
            while (c) {
                if (b("containsNode")(a, c)) return !0;
                c = g.getContext(c)
            }
            return !1
        },
        getContext: function(a) {
            a = a;
            var c;
            while (a) {
                if (a.getAttribute && (c = a.getAttribute("data-ownerid"))) return b("ge")(c);
                a = a.parentNode
            }
            return null
        },
        parentByClass: function(a, c) {
            a = a;
            var d;
            while (a && !b("CSS").hasClass(a, c)) a.getAttribute && (d = a.getAttribute("data-ownerid")) ? a = b("ge")(d) : a = a.parentNode;
            return a
        }
    };
    e.exports = g
}), null);
__d("FocusEvent", ["Event", "Run", "ge", "getOrCreateDOMID"], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();
    var g = {},
        h = !1;

    function i(a, b) {
        if (g[a]) {
            b = g[a].indexOf(b);
            b >= 0 && g[a].splice(b, 1);
            g[a].length === 0 && delete g[a]
        }
    }

    function j(a) {
        var b = a.getTarget();
        if (g[b.id] && g[b.id].length > 0) {
            var c = a.type === "focusin" || a.type === "focus";
            g[b.id].forEach(function(a) {
                a(c)
            })
        }
    }

    function k() {
        if (h) return;
        b("Event").listen(document.documentElement, "focusout", j);
        b("Event").listen(document.documentElement, "focusin", j);
        h = !0
    }
    a = {
        listen: function(a, c) {
            __p && __p();
            k();
            var d = b("getOrCreateDOMID")(a);
            g[d] || (g[d] = []);
            g[d].push(c);
            var e = !1;

            function f() {
                e || (i(d, c), h && (h.remove(), h = null), e = !0)
            }
            var h = b("Run").onLeave(function() {
                b("ge")(d) || f()
            });
            return {
                remove: function() {
                    f()
                }
            }
        }
    };
    e.exports = a
}), null);
__d("KeyStatus", ["Event", "ExecutionEnvironment"], (function(a, b, c, d, e, f) {
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
        g = b("Event").getKeyCode(a), i()
    }

    function c() {
        g = null, j()
    }
    if (b("ExecutionEnvironment").canUseDOM) {
        d = document.documentElement;
        if (d)
            if (d.addEventListener) d.addEventListener("keydown", a, !0), d.addEventListener("keyup", c, !0);
            else if (d.attachEvent) {
            f = d.attachEvent;
            f("onkeydown", a);
            f("onkeyup", c)
        }
    }
    d = {
        isKeyDown: function() {
            return !!g
        },
        getKeyDownCode: function() {
            return g
        }
    };
    e.exports = d
}), null);
__d("getElementText", ["isElementNode", "isTextNode"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = null;

    function a(a) {
        __p && __p();
        if (b("isTextNode")(a)) return a.data;
        else if (b("isElementNode")(a)) {
            if (g === null) {
                var c = document.createElement("div");
                g = c.textContent != null ? "textContent" : "innerText"
            }
            return a[g]
        } else return ""
    }
    e.exports = a
}), null);
__d("tooltipPropsFor", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, b, c) {
        if (!a) return {};
        a = {
            "data-tooltip-content": a,
            "data-hover": "tooltip"
        };
        b && (a["data-tooltip-position"] = b);
        c && (a["data-tooltip-alignh"] = c);
        return a
    }
    e.exports = a
}), null);
__d("TooltipData", ["DataStore", "DOM", "URI", "getElementText", "ifRequired", "isTextNode", "tooltipPropsFor"], (function(a, b, c, d, e, f) {
    __p && __p();

    function g(a) {
        var c = a.getAttribute("data-tooltip-delay");
        c = c ? parseInt(c, 10) || 1e3 : 0;
        return babelHelpers["extends"]({
            className: a.getAttribute("data-tooltip-root-class"),
            content: a.getAttribute("data-tooltip-content"),
            delay: c,
            position: a.getAttribute("data-tooltip-position") || "above",
            alignH: a.getAttribute("data-tooltip-alignh") || "left",
            offsetY: a.getAttribute("data-tooltip-offsety") || 0,
            suppress: !1,
            overflowDisplay: a.getAttribute("data-tooltip-display") === "overflow",
            persistOnClick: a.getAttribute("data-pitloot-persistonclick"),
            textDirection: a.getAttribute("data-tooltip-text-direction")
        }, b("DataStore").get(a, "tooltip"))
    }

    function h(a, c) {
        var d = g(a);
        b("DataStore").set(a, "tooltip", {
            content: c.content || d.content,
            position: c.position || d.position,
            alignH: c.alignH || d.alignH,
            suppress: c.suppress !== void 0 ? c.suppress : d.suppress,
            overflowDisplay: c.overflowDisplay || d.overflowDisplay,
            persistOnClick: c.persistOnClick || d.persistOnClick
        })
    }

    function i(a, b) {
        h(a, b), a.setAttribute("data-hover", "tooltip")
    }

    function j(a, b) {}
    var k = {
        remove: function(a) {
            b("DataStore").remove(a, "tooltip"), a.removeAttribute("data-hover"), a.removeAttribute("data-tooltip-position"), a.removeAttribute("data-tooltip-alignh"), b("ifRequired")("Tooltip", function(b) {
                b.isActive(a) && b.hide()
            })
        },
        set: function(a, c, d, e) {
            j(a, c);
            if (c instanceof b("URI")) a.setAttribute("data-tooltip-uri", c), b("ifRequired")("Tooltip", function(b) {
                b.isActive(a) && b.fetchIfNecessary(a)
            });
            else {
                c = k._store({
                    context: a,
                    content: c,
                    position: d,
                    alignH: e
                });
                typeof c.content !== "string" ? a.setAttribute("data-tooltip-content", b("getElementText")(c.content)) : a.setAttribute("data-tooltip-content", c.content);
                b("ifRequired")("Tooltip", function(b) {
                    b.isActive(a) && b.show(a)
                })
            }
        },
        _store: function(a) {
            var c = a.context,
                d = a.content,
                e = a.position;
            a = a.alignH;
            j(c, d);
            b("isTextNode")(d) && (d = b("getElementText")(d));
            var f = !1;
            typeof d !== "string" ? d = b("DOM").create("div", {}, d) : f = d === "";
            a = {
                alignH: a,
                content: d,
                position: e,
                suppress: f
            };
            i(c, a);
            return a
        },
        propsFor: b("tooltipPropsFor"),
        enableDisplayOnOverflow: function(a) {
            a.removeAttribute("data-tooltip-display"), i(a, {
                overflowDisplay: !0
            })
        },
        enablePersistOnClick: function(a) {
            a.removeAttribute("data-pitloot-persistOnClick"), i(a, {
                persistOnClick: !0
            })
        },
        suppress: function(a, b) {
            h(a, {
                suppress: b
            })
        },
        _get: g
    };
    e.exports = k
}), null);
__d("Focus", ["cx", "CSS", "Event", "FocusEvent", "KeyStatus", "TooltipData", "ifRequired"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h = b("KeyStatus").isKeyDown,
        i = {
            set: function(a, c) {
                c === void 0 && (c = !1);
                if (a) {
                    var d = b("ifRequired")("VirtualCursorStatus", function(a) {
                        return a.isVirtualCursorTriggered()
                    }, function() {
                        return !1
                    });
                    c || h() || d ? j(a) : i.setWithoutOutline(a)
                }
            },
            setWithoutOutline: function(a) {
                if (a) {
                    b("CSS").addClass(a, "_5f0v");
                    var c = b("Event").listen(a, "blur", function() {
                        a && b("CSS").removeClass(a, "_5f0v"), c.remove()
                    });
                    b("TooltipData").suppress(a, !0);
                    j(a);
                    b("TooltipData").suppress(a, !1)
                }
            },
            relocate: function(a, c) {
                b("CSS").addClass(a, "_5f0v");
                return b("FocusEvent").listen(a, this.performRelocation.bind(this, a, c))
            },
            performRelocation: function(a, c, d) {
                b("CSS").addClass(a, "_5f0v");
                a = b("ifRequired")("FocusRing", function(a) {
                    return a.usingKeyboardNavigation()
                }, function() {
                    return !0
                });
                d = d && a;
                b("CSS").conditionClass(c, "_3oxt", d);
                b("CSS").conditionClass(c, "_16jm", d)
            }
        };

    function j(a) {
        try {
            a.tabIndex = a.tabIndex, a.focus()
        } catch (a) {}
    }
    e.exports = i
}), null);
__d("isContentEditable", [], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();

    function a(a) {
        a = a;
        while (a instanceof HTMLElement) {
            if (a.contentEditable === "true" || a.contentEditable === "plaintext-only") return !0;
            a = a.parentElement
        }
        return !1
    }
    e.exports = a
}), null);
__d("isElementInteractive", ["isContentEditable"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = new Set(["EMBED", "INPUT", "OBJECT", "SELECT", "TEXTAREA"]),
        h = new Set(["button", "checkbox", "radio", "submit"]);

    function a(a) {
        if (!a instanceof HTMLElement) return !1;
        var c = b("isContentEditable")(a),
            d = g.has(a.nodeName);
        a = a instanceof HTMLInputElement && h.has(a.type);
        return (c || d) && !a
    }
    e.exports = a
}), null);
__d("KeyEventController", ["Bootloader", "DOMQuery", "Event", "Run", "emptyFunction", "getElementText", "isContentEditable", "isElementInteractive", "isEmpty"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = null,
        h = {
            BACKSPACE: [8],
            TAB: [9],
            RETURN: [13],
            ALT: [18],
            ESCAPE: [27],
            LEFT: [37, 63234],
            UP: [38, 63232],
            RIGHT: [39, 63235],
            DOWN: [40, 63233],
            NUMPAD_ADD: [43],
            NUMPAD_SUBSTRACT: [45],
            DELETE: [46],
            COMMA: [188],
            PERIOD: [190],
            SLASH: [191],
            "`": [192],
            "[": [219],
            "]": [221],
            PAGE_UP: [33],
            PAGE_DOWN: [34],
            END: [35],
            HOME: [36],
            SPACE: [32],
            KP_DOT: [46, 110],
            "-": [189],
            "=": [187],
            FORWARD_SLASH: [191]
        },
        i = (a = {}, a[8] = 1, a[9] = 1, a[13] = 1, a[27] = 1, a[32] = 1, a[37] = 1, a[63234] = 1, a[38] = 1, a[63232] = 1, a[39] = 1, a[63235] = 1, a[40] = 1, a[63233] = 1, a[46] = 1, a);

    function j() {
        "use strict";
        this.handlers = {}, ["keyup", "keydown", "keypress"].forEach(function(a) {
            return document.addEventListener(a, this.onkeyevent.bind(this, "on" + a))
        }.bind(this))
    }
    j.prototype.mapKey = function(a) {
        "use strict";
        if (/^[0-9]$/.test(a + "")) {
            typeof a !== "number" && (a = a.charCodeAt(0) - 48);
            return [48 + a, 96 + a]
        }
        a += "";
        var b = h[a.toUpperCase()];
        return b ? b : [a.toUpperCase().charCodeAt(0)]
    };
    j.prototype.onkeyevent = function(a, c) {
        "use strict";
        __p && __p();
        c = b("Event").$E(c);
        var d = this.handlers[c.keyCode] || this.handlers[c.which];
        if (d)
            for (var e = 0; e < d.length; e++) {
                var f = d[e].callback,
                    g = d[e].filter;
                try {
                    if (!g || g(c, a)) {
                        g = function() {
                            var d = f(c, a),
                                e = c.which || c.keyCode;
                            b("Bootloader").loadModules(["KeyEventTypedLogger"], function(a) {
                                new a().setAction("key_shortcut").setKey(c.key || "").setKeyChar(String.fromCharCode(e)).setKeyCode(e).addToExtraData("is_trusted", c.isTrusted).log()
                            }, "KeyEventController");
                            if (d === !1) return {
                                v: b("Event").kill(c)
                            }
                        }();
                        if (typeof g === "object") return g.v
                    }
                } catch (a) {}
            }
        return !0
    };
    j.prototype.resetHandlers = function() {
        "use strict";
        for (var a in this.handlers)
            if (Object.prototype.hasOwnProperty.call(this.handlers, a)) {
                var b = this.handlers[a].filter(function(a) {
                    return a.preserve()
                });
                b.length ? this.handlers[a] = b : delete this.handlers[a]
            }
    };
    j.getInstance = function() {
        "use strict";
        return g || (g = new j())
    };
    j.defaultFilter = function(a, c) {
        "use strict";
        a = b("Event").$E(a);
        return j.filterEventTypes(a, c) && j.filterEventTargets(a, c) && j.filterEventModifiers(a, c)
    };
    j.filterEventTypes = function(a, b) {
        "use strict";
        return b === "onkeydown" ? !0 : !1
    };
    j.filterEventTargets = function(a, c) {
        "use strict";
        c = a.getTarget();
        return !b("isElementInteractive")(c) || a.keyCode in i && (b("DOMQuery").isNodeOfType(c, ["input", "textarea"]) && c.value.length === 0 || b("isContentEditable")(c) && b("getElementText")(c).length === 0)
    };
    j.filterEventModifiers = function(a, b) {
        "use strict";
        return a.ctrlKey || a.altKey || a.metaKey || a.repeat ? !1 : !0
    };
    j.registerKey = function(a, c, d, e, f) {
        __p && __p();
        d === void 0 && (d = j.defaultFilter);
        e === void 0 && (e = !1);
        f === void 0 && (f = b("emptyFunction").thatReturnsFalse);
        var g = j.getInstance(),
            h = a == null ? [] : g.mapKey(a);
        b("isEmpty")(g.handlers) && b("Run").onLeave(g.resetHandlers.bind(g));
        var i = {};
        for (var k = 0; k < h.length; k++) {
            a = "" + h[k];
            (!g.handlers[a] || e) && (g.handlers[a] = []);
            var l = {
                callback: c,
                filter: d,
                preserve: f
            };
            i[a] = l;
            g.handlers[a].push(l)
        }
        return {
            remove: function() {
                for (var a in i) {
                    if (g.handlers[a] && g.handlers[a].length) {
                        var b = g.handlers[a].indexOf(i[a]);
                        b >= 0 && g.handlers[a].splice(b, 1)
                    }
                    delete i[a]
                }
            }
        }
    };
    e.exports = j
}), null);
__d("BehaviorsMixin", [], (function(a, b, c, d, e, f) {
    __p && __p();

    function g(a) {
        "use strict";
        this.$1 = a, this.$2 = !1
    }
    g.prototype.enable = function() {
        "use strict";
        this.$2 || (this.$2 = !0, this.$1.enable())
    };
    g.prototype.disable = function() {
        "use strict";
        this.$2 && (this.$2 = !1, this.$1.disable())
    };
    var h = 1;

    function i(a) {
        a.__BEHAVIOR_ID || (a.__BEHAVIOR_ID = h++);
        return a.__BEHAVIOR_ID
    }
    a = {
        enableBehavior: function(a) {
            this._behaviors || (this._behaviors = {});
            var b = i(a);
            this._behaviors[b] || (this._behaviors[b] = new g(new a(this)));
            this._behaviors[b].enable();
            return this
        },
        disableBehavior: function(a) {
            if (this._behaviors) {
                a = i(a);
                this._behaviors[a] && this._behaviors[a].disable()
            }
            return this
        },
        enableBehaviors: function(a) {
            a.forEach(this.enableBehavior, this);
            return this
        },
        destroyBehaviors: function() {
            if (this._behaviors) {
                for (var a in this._behaviors) this._behaviors[a].disable();
                this._behaviors = {}
            }
        },
        hasBehavior: function(a) {
            return this._behaviors && i(a) in this._behaviors
        }
    };
    e.exports = a
}), null);
__d("setImmediate", ["TimerStorage", "TimeSlice", "setImmediateAcrossTransitions"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        __p && __p();
        var c, d = function() {
            b("TimerStorage").unset(b("TimerStorage").IMMEDIATE, c);
            for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++) e[f] = arguments[f];
            Function.prototype.apply.call(a, this, e)
        };
        b("TimeSlice").copyGuardForWrapper(a, d);
        for (var e = arguments.length, f = new Array(e > 1 ? e - 1 : 0), g = 1; g < e; g++) f[g - 1] = arguments[g];
        c = b("setImmediateAcrossTransitions").apply(void 0, [d].concat(f));
        b("TimerStorage").set(b("TimerStorage").IMMEDIATE, c);
        return c
    }
    e.exports = a
}), null);
__d("Layer", ["invariant", "KeyStatus", "ArbiterMixin", "BehaviorsMixin", "BootloadedReact", "ContextualThing", "CSS", "DataStore", "DOM", "Event", "FBLogger", "HTML", "KeyEventController", "Parent", "Style", "ge", "isNode", "mixin", "removeFromArray", "setImmediate"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h;
    b("KeyStatus");
    var i = [];
    a = babelHelpers.inherits(j, b("mixin")(b("ArbiterMixin"), b("BehaviorsMixin")));
    h = a && a.prototype;

    function j(a, c) {
        "use strict";
        h.constructor.call(this);
        this._config = a || {};
        if (c) {
            this._configure(this._config, c);
            a = this._config.addedBehaviors || [];
            this.enableBehaviors(this._getDefaultBehaviors().concat(a))
        } else b("FBLogger")("layer").warn("The markup param wasn't provided to the Layer constructor")
    }
    j.prototype.init = function(a) {
        "use strict";
        this._configure(this._config, a);
        a = this._config.addedBehaviors || [];
        this.enableBehaviors(this._getDefaultBehaviors().concat(a));
        this._initialized = !0;
        return this
    };
    j.prototype._configure = function(a, c) {
        "use strict";
        __p && __p();
        if (c) {
            var d = b("isNode")(c),
                e = typeof c === "string" || b("HTML").isHTML(c);
            this.containsReactComponent = b("BootloadedReact").isValidElement(c);
            !d && !e && !this.containsReactComponent && b("FBLogger")("layer").warn("Layer must be init with HTML, DOM node or React instance");
            if (e) c = b("HTML")(c).getRootNode();
            else if (this.containsReactComponent) {
                d = document.createElement("div");
                var f = !0;
                b("BootloadedReact").render(c, d, function() {
                    this.inform("reactshow"), f || this.updatePosition()
                }.bind(this));
                f = !1;
                c = this._reactContainer = d
            }
        }
        this._root = this._buildWrapper(a, c);
        a.attributes && b("DOM").setAttributes(this._root, a.attributes);
        a.classNames && a.classNames.forEach(b("CSS").addClass.bind(null, this._root));
        b("CSS").addClass(this._root, "uiLayer");
        a.causalElement && (this._causalElement = b("ge")(a.causalElement));
        a.permanent && (this._permanent = a.permanent);
        a.isStrictlyControlled && (this._isStrictlyControlled = a.isStrictlyControlled);
        b("DataStore").set(this._root, "layer", this);
        return this
    };
    j.prototype._getDefaultBehaviors = function() {
        "use strict";
        return []
    };
    j.prototype.getCausalElement = function() {
        "use strict";
        return this._causalElement
    };
    j.prototype.setCausalElement = function(a) {
        "use strict";
        this._causalElement = a;
        return this
    };
    j.prototype.getInsertParent = function() {
        "use strict";
        return this._insertParent || document.body
    };
    j.prototype.getRoot = function() {
        "use strict";
        this._root || (this._destroyed ? b("FBLogger")("layer").warn("No root node for this Layer. It has either not yet been set or the Layer has been destroyed.  This layer has been destroyed.") : b("FBLogger")("layer").warn("No root node for this Layer. It has probably not been set."));
        return this._root
    };
    j.prototype.getContentRoot = function() {
        "use strict";
        return this.getRoot()
    };
    j.prototype._buildWrapper = function(a, b) {
        "use strict";
        return b
    };
    j.prototype.setInsertParent = function(a) {
        "use strict";
        a && (this._shown && a !== this.getInsertParent() && (b("DOM").appendContent(a, this.getRoot()), this.updatePosition()), this._insertParent = a);
        return this
    };
    j.prototype.showAfterDelay = function(a) {
        "use strict";
        setTimeout(this.show.bind(this), a)
    };
    j.prototype.show = function() {
        "use strict";
        __p && __p();
        if (this._shown) return this;
        var a = this.getRoot();
        a != null || g(0, 5142);
        this.inform("beforeshow");
        b("Style").set(a, "visibility", "hidden");
        b("Style").set(a, "overflow", "hidden");
        b("CSS").show(a);
        b("DOM").appendContent(this.getInsertParent(), a);
        this.updatePosition() !== !1 ? (this._shown = !0, this.inform("show"), j.inform("show", this), this._permanent || setTimeout(function() {
            this._shown && i.push(this)
        }.bind(this), 0)) : b("CSS").hide(a);
        b("Style").set(a, "visibility", "");
        b("Style").set(a, "overflow", "");
        b("Style").set(a, "opacity", "1");
        this.inform("aftershow");
        return this
    };
    j.prototype.hide = function(a) {
        "use strict";
        if (this._isStrictlyControlled) {
            this._shown && this.inform("runhide", a);
            return this
        }
        return this._hide()
    };
    j.prototype._hide = function() {
        "use strict";
        if (this._hiding || !this._shown || this.inform("beforehide") === !1) return this;
        this._hiding = !0;
        this.inform("starthide") !== !1 && this.finishHide();
        return this
    };
    j.prototype.conditionShow = function(a) {
        "use strict";
        return a ? this.show() : this._hide()
    };
    j.prototype.finishHide = function() {
        "use strict";
        __p && __p();
        if (this._shown) {
            this._permanent || b("removeFromArray")(i, this);
            this._hiding = !1;
            this._shown = !1;
            var a = this.getRoot();
            a != null || g(0, 5143);
            b("CSS").hide(a);
            this.inform("hide");
            j.inform("hide", this)
        }
    };
    j.prototype.isShown = function() {
        "use strict";
        return this._shown
    };
    j.prototype.updatePosition = function() {
        "use strict";
        return !0
    };
    j.prototype.destroy = function() {
        "use strict";
        __p && __p();
        this.containsReactComponent && b("BootloadedReact").unmountComponentAtNode(this._reactContainer);
        this.finishHide();
        var a = this.getRoot();
        b("DOM").remove(a);
        this.destroyBehaviors();
        this.inform("destroy");
        j.inform("destroy", this);
        b("DataStore").remove(a, "layer");
        this._root = this._causalElement = null;
        this._destroyed = !0
    };
    j.init = function(a, b) {
        "use strict";
        a.init(b)
    };
    j.initAndShow = function(a, b) {
        "use strict";
        a.init(b).show()
    };
    j.show = function(a) {
        "use strict";
        a.show()
    };
    j.showAfterDelay = function(a, b) {
        "use strict";
        a.showAfterDelay(b)
    };
    j.getTopmostLayer = function() {
        "use strict";
        return i[i.length - 1]
    };
    Object.assign(j, b("ArbiterMixin"));
    Object.assign(j.prototype, {
        _destroyed: !1,
        _initialized: !1,
        _root: null,
        _shown: !1,
        _hiding: !1,
        _causalElement: null,
        _reactContainer: null
    });
    b("Event").listen(document.documentElement, "keydown", function(a) {
        if (b("KeyEventController").filterEventTargets(a, "keydown"))
            for (var c = i.length - 1; c >= 0; c--)
                if (i[c].inform("key", a) === !1) return !1;
        return !0
    }, b("Event").Priority.URGENT);
    var k;
    b("Event").listen(document.documentElement, "mousedown", function(a) {
        k = a.getTarget()
    });
    var l;
    b("Event").listen(document.documentElement, "mouseup", function(a) {
        l = a.getTarget(), b("setImmediate")(function() {
            k = null, l = null
        })
    });
    b("Event").listen(document.documentElement, "click", function(a) {
        __p && __p();
        var c = k,
            d = l;
        k = null;
        l = null;
        var e = i.length;
        if (!e) return;
        a = a.getTarget();
        if (a !== d || a !== c) return;
        if (!b("DOM").contains(document.documentElement, a)) return;
        if (a.offsetWidth != null && !a.offsetWidth) return;
        if (b("Parent").byClass(a, "generic_dialog")) return;
        while (e--) {
            d = i[e];
            c = d.getContentRoot();
            c != null || g(0, 5144);
            if (b("ContextualThing").containsIncludingLayers(c, a)) return;
            if (d.inform("blur", {
                    target: a
                }) === !1 || d.isShown()) return
        }
    });
    e.exports = j
}), null);
__d("getViewportDimensions", ["UserAgent"], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();

    function g() {
        var a;
        document.documentElement && (a = document.documentElement.clientWidth);
        a == null && document.body && (a = document.body.clientWidth);
        return a || 0
    }

    function h() {
        var a;
        document.documentElement && (a = document.documentElement.clientHeight);
        a == null && document.body && (a = document.body.clientHeight);
        return a || 0
    }

    function i() {
        return {
            width: window.innerWidth || g(),
            height: window.innerHeight || h()
        }
    }
    i.withoutScrollbars = function() {
        return b("UserAgent").isPlatform("Android") ? i() : {
            width: g(),
            height: h()
        }
    };
    e.exports = i
}), null);
__d("PopupWindow", ["DOMDimensions", "DOMQuery", "Layer", "Popup", "getViewportDimensions"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = {
        _opts: {
            allowShrink: !0,
            strategy: "vector",
            timeout: 100,
            widthElement: null
        },
        init: function(a) {
            Object.assign(g._opts, a), setInterval(g._resizeCheck, g._opts.timeout)
        },
        _resizeCheck: function() {
            __p && __p();
            var a = b("getViewportDimensions")(),
                c = g._getDocumentSize(),
                d = b("Layer").getTopmostLayer();
            if (d) {
                d = d.getRoot().firstChild;
                var e = b("DOMDimensions").getElementDimensions(d);
                e.height += b("DOMDimensions").measureElementBox(d, "height", !0, !0, !0);
                e.width += b("DOMDimensions").measureElementBox(d, "width", !0, !0, !0);
                c.height = Math.max(c.height, e.height);
                c.width = Math.max(c.width, e.width)
            }
            d = c.height - a.height;
            e = c.width - a.width;
            e < 0 && !g._opts.widthElement && (e = 0);
            e = e > 1 ? e : 0;
            !g._opts.allowShrink && d < 0 && (d = 0);
            if (d || e) try {
                window.console && window.console.firebug, window.resizeBy(e, d), e && window.moveBy(e / -2, 0)
            } catch (a) {}
        },
        _getDocumentSize: function() {
            var c = b("DOMDimensions").getDocumentDimensions();
            g._opts.strategy === "offsetHeight" && (c.height = document.body.offsetHeight);
            if (g._opts.widthElement) {
                var d = b("DOMQuery").scry(document.body, g._opts.widthElement)[0];
                d && (c.width = b("DOMDimensions").getElementDimensions(d).width)
            }
            d = a.Dialog;
            d && d.max_bottom && d.max_bottom > c.height && (c.height = d.max_bottom);
            return c
        },
        open: function(a, c, d, e) {
            return b("Popup").open(a, d, c, e)
        }
    };
    e.exports = g
}), null);
__d("getOverlayZIndex", ["Style"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a, c) {
        __p && __p();
        c = c || document.body;
        var d = [];
        while (a && a !== c) d.push(a), a = a.parentNode;
        if (a !== c) return 0;
        for (var a = d.length - 1; a >= 0; a--) {
            c = d[a];
            if (b("Style").get(c, "position") != "static") {
                c = parseInt(b("Style").get(c, "z-index"), 10);
                if (!isNaN(c)) return c
            }
        }
        return 0
    }
    e.exports = a
}), null);
__d("PluginCSSReflowHack", ["Style"], (function(a, b, c, d, e, f) {
    a = {
        trigger: function(a) {
            setTimeout(function() {
                var c = "border-bottom-width",
                    d = b("Style").get(a, c);
                b("Style").set(a, c, parseInt(d, 10) + 1 + "px");
                b("Style").set(a, c, d)
            }, 1e3)
        }
    };
    e.exports = a
}), null);
__d("PluginMessage", ["DOMEventListener"], (function(a, b, c, d, e, f) {
    a = {
        listen: function() {
            b("DOMEventListener").add(window, "message", function(a) {
                if (/\.facebook\.com$/.test(a.origin) && /^FB_POPUP:/.test(a.data)) {
                    a = JSON.parse(a.data.substring(9));
                    "reload" in a && /^https?:/.test(a.reload) && document.location.replace(a.reload)
                }
            })
        }
    };
    e.exports = a
}), null);
__d("PluginConfirm", ["DOMEvent", "DOMEventListener", "PlatformBaseVersioning", "PluginMessage", "PopupWindow", "URI"], (function(a, b, c, d, e, f) {
    __p && __p();

    function g(a) {
        Object.assign(this, {
            plugin: a,
            confirm_params: {},
            return_params: b("URI").getRequestURI().getQueryData()
        }), this.addReturnParams({
            ret: "sentry"
        }), delete this.return_params.hash
    }
    Object.assign(g.prototype, {
        addConfirmParams: function(a) {
            Object.assign(this.confirm_params, a)
        },
        addReturnParams: function(a) {
            Object.assign(this.return_params, a);
            return this
        },
        start: function() {
            var a = b("PlatformBaseVersioning").versionAwareURI(new(b("URI"))("/plugins/error/confirm/" + this.plugin)).addQueryData(this.confirm_params).addQueryData({
                secure: b("URI").getRequestURI().isSecure(),
                plugin: this.plugin,
                return_params: JSON.stringify(this.return_params)
            });
            this.popup = b("PopupWindow").open(a.toString(), 320, 486);
            b("PluginMessage").listen();
            return this
        }
    });
    g.starter = function(a, b, c) {
        a = new g(a);
        a.addConfirmParams(b || {});
        a.addReturnParams(c || {});
        return a.start.bind(a)
    };
    g.listen = function(a, c, d, e) {
        b("DOMEventListener").add(a, "click", function(a) {
            new(b("DOMEvent"))(a).kill(), g.starter(c, d, e)()
        })
    };
    e.exports = g
}), null);
__d("PluginConnection", ["Arbiter", "CSS", "Plugin"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = function() {};
    Object.assign(g.prototype, {
        init: function(a, c, d, e) {
            e = e || b("Plugin").CONNECT;
            this.identifier = a;
            this.element = c;
            this.css = d;
            b("Arbiter").subscribe([b("Plugin").CONNECT, b("Plugin").DISCONNECT], function(f, g) {
                a === g.href && b("CSS")[f === e ? "addClass" : "removeClass"](c, d);
                return !0
            });
            return this
        },
        connected: function() {
            return b("CSS").hasClass(this.element, this.css)
        },
        connect: function() {
            return b("Arbiter").inform(b("Plugin").CONNECT, {
                href: this.identifier
            }, "state")
        },
        disconnect: function() {
            return b("Arbiter").inform(b("Plugin").DISCONNECT, {
                href: this.identifier
            }, "state")
        },
        toggle: function() {
            return this.connected() ? this.disconnect() : this.connect()
        }
    });
    g.init = function(a) {
        for (var b, c = 0; c < a.length; c++) b = new g(), b.init.apply(b, a[c])
    };
    e.exports = g
}), null);
__d("BanzaiLogger", ["Banzai"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = "logger";

    function a(a) {
        return {
            log: function(c, d) {
                b("Banzai").post(h._getRoute(c), d, a)
            },
            logImmediately: function(a, c) {
                b("Banzai").post(h._getRoute(a), c, {
                    signal: !0
                })
            },
            registerToSendWithBeacon: function(a, c, d, e) {
                b("Banzai").registerToSendWithBeacon(h._getRoute(a), c, d, e)
            },
            _getRoute: function(a) {
                return g + ":" + a
            }
        }
    }
    var h = a();
    h.create = a;
    e.exports = h
}), null);
__d("PagePluginActionTypes", [], (function(a, b, c, d, e, f) {
    e.exports = Object.freeze({
        CLICK: "click"
    })
}), null);
__d("PagePluginActions", [], (function(a, b, c, d, e, f) {
    e.exports = Object.freeze({
        PAGE_AVATAR: "page_avatar",
        PAGE_CTA: "page_cta",
        PAGE_LIKE: "page_like",
        PAGE_PERMALINK: "page_permalink",
        PAGE_SHARE: "page_share",
        PAGE_UNLIKE: "page_unlike"
    })
}), null);
__d("PluginPageActionLogger", ["BanzaiLogger", "BanzaiODS", "DOMEventListener", "DOMQuery", "PagePluginActions", "PagePluginActionTypes"], (function(a, b, c, d, e, f) {
    __p && __p();
    a = {
        initializeClickLoggers: function(a, c, d, e, f, g, h, i, j, k) {
            __p && __p();

            function l(f, g) {
                f = b("DOMQuery").scry(e, "." + f)[0];
                if (!f) return;
                b("DOMEventListener").add(f, "click", function(e) {
                    b("BanzaiODS").bumpEntityKey("platform_www", "platform.plugin.page.action"), b("BanzaiLogger").log("PagePluginActionsLoggerConfig", {
                        page_id: c,
                        page_plugin_action: g,
                        page_plugin_action_type: b("PagePluginActionTypes").CLICK,
                        referer_url: d,
                        is_sdk: a
                    })
                })
            }
            l(f, b("PagePluginActions").PAGE_LIKE);
            l(g, b("PagePluginActions").PAGE_UNLIKE);
            l(h, b("PagePluginActions").PAGE_AVATAR);
            l(i, b("PagePluginActions").PAGE_PERMALINK);
            l(j, b("PagePluginActions").PAGE_SHARE);
            l(k, b("PagePluginActions").PAGE_CTA)
        }
    };
    e.exports = a
}), null);
__d("VisualCompletionGating", ["requireCond", "cr:729414"], (function(a, b, c, d, e, f) {
    "use strict";
    e.exports = b("cr:729414")
}), null);
__d("areEqual", [], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = [],
        h = [];

    function a(a, b) {
        var c = g.length ? g.pop() : [],
            d = h.length ? h.pop() : [];
        a = i(a, b, c, d);
        c.length = 0;
        d.length = 0;
        g.push(c);
        h.push(d);
        return a
    }

    function i(a, b, c, d) {
        __p && __p();
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        if (a == null || b == null) return !1;
        if (typeof a !== "object" || typeof b !== "object") return !1;
        var e = Object.prototype.toString,
            f = e.call(a);
        if (f != e.call(b)) return !1;
        switch (f) {
            case "[object String]":
                return a == String(b);
            case "[object Number]":
                return isNaN(a) || isNaN(b) ? !1 : a == Number(b);
            case "[object Date]":
            case "[object Boolean]":
                return +a == +b;
            case "[object RegExp]":
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
        }
        e = c.length;
        while (e--)
            if (c[e] == a) return d[e] == b;
        c.push(a);
        d.push(b);
        e = 0;
        if (f === "[object Array]") {
            e = a.length;
            if (e !== b.length) return !1;
            while (e--)
                if (!i(a[e], b[e], c, d)) return !1
        } else {
            if (a.constructor !== b.constructor) return !1;
            if (Object.prototype.hasOwnProperty.call(a, "valueOf") && Object.prototype.hasOwnProperty.call(b, "valueOf")) return a.valueOf() == b.valueOf();
            f = Object.keys(a);
            if (f.length != Object.keys(b).length) return !1;
            for (var e = 0; e < f.length; e++) {
                if (f[e] === "_owner") continue;
                if (!Object.prototype.hasOwnProperty.call(b, f[e]) || !i(a[f[e]], b[f[e]], c, d)) return !1
            }
        }
        c.pop();
        d.pop();
        return !0
    }
    e.exports = a
}), null);
__d("debounceCore", ["TimeSlice"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a, c, d, e, f) {
        __p && __p();
        d === void 0 && (d = null);
        e === void 0 && (e = setTimeout);
        f === void 0 && (f = clearTimeout);
        var g;

        function h() {
            for (var f = arguments.length, i = new Array(f), j = 0; j < f; j++) i[j] = arguments[j];
            h.reset();
            var k = b("TimeSlice").guard(function() {
                g = null, a.apply(d, i)
            }, "debounceCore");
            k.__SMmeta = a.__SMmeta;
            g = e(k, c)
        }
        h.reset = function() {
            f(g), g = null
        };
        h.isPending = function() {
            return g != null
        };
        return h
    }
    e.exports = a
}), null);
__d("normalizeBoundingClientRect", [], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();

    function a(a, b) {
        a = a.ownerDocument.documentElement;
        var c = a ? a.clientLeft : 0;
        a = a ? a.clientTop : 0;
        var d = Math.round(b.left) - c;
        c = Math.round(b.right) - c;
        var e = Math.round(b.top) - a;
        b = Math.round(b.bottom) - a;
        return {
            left: d,
            right: c,
            top: e,
            bottom: b,
            width: c - d,
            height: b - e
        }
    }
    e.exports = a
}), null);
__d("getElementRect", ["containsNode", "normalizeBoundingClientRect"], (function(a, b, c, d, e, f) {
    function a(a) {
        var c;
        c = a == null ? void 0 : (c = a.ownerDocument) == null ? void 0 : c.documentElement;
        return !a || !("getBoundingClientRect" in a) || !b("containsNode")(c, a) ? {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0
        } : b("normalizeBoundingClientRect")(a, a.getBoundingClientRect())
    }
    e.exports = a
}), null);
__d("getElementPosition", ["getElementRect"], (function(a, b, c, d, e, f) {
    function a(a) {
        a = b("getElementRect")(a);
        return {
            x: a.left,
            y: a.top,
            width: a.right - a.left,
            height: a.bottom - a.top
        }
    }
    e.exports = a
}), null);
__d("getVendorPrefixedName", ["invariant", "ExecutionEnvironment", "UserAgent", "camelize"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h = {},
        i = ["Webkit", "ms", "Moz", "O"],
        j = new RegExp("^(" + i.join("|") + ")"),
        k = b("ExecutionEnvironment").canUseDOM ? document.createElement("div").style : {};

    function l(a) {
        for (var b = 0; b < i.length; b++) {
            var c = i[b] + a;
            if (c in k) return c
        }
        return null
    }

    function m(a) {
        switch (a) {
            case "lineClamp":
                return b("UserAgent").isEngine("WebKit >= 315.14.2") ? "WebkitLineClamp" : null;
            default:
                return null
        }
    }

    function a(a) {
        var c = b("camelize")(a);
        if (h[c] === void 0) {
            var d = c.charAt(0).toUpperCase() + c.slice(1);
            j.test(d) && g(0, 957, a);
            b("ExecutionEnvironment").canUseDOM ? h[c] = c in k ? c : l(d) : h[c] = m(c)
        }
        return h[c]
    }
    e.exports = a
}), null);
__d("joinClasses", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        var b = a || "",
            c = arguments.length <= 1 ? 0 : arguments.length - 1;
        for (var d = 0; d < c; d++) {
            var e = d + 1 < 1 || arguments.length <= d + 1 ? void 0 : arguments[d + 1];
            e != null && e !== "" && (b = (b ? b + " " : "") + e)
        }
        return b
    }
    e.exports = a
}), null);
__d("shallowEqual", [], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();
    var g = Object.prototype.hasOwnProperty;

    function h(a, b) {
        if (a === b) return a !== 0 || b !== 0 || 1 / a === 1 / b;
        else return a !== a && b !== b
    }

    function a(a, b) {
        __p && __p();
        if (h(a, b)) return !0;
        if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) return !1;
        var c = Object.keys(a),
            d = Object.keys(b);
        if (c.length !== d.length) return !1;
        for (var d = 0; d < c.length; d++)
            if (!g.call(b, c[d]) || !h(a[c[d]], b[c[d]])) return !1;
        return !0
    }
    e.exports = a
}), null);
__d("BrowserSupportCore", ["getVendorPrefixedName"], (function(a, b, c, d, e, f) {
    a = {
        hasCSSAnimations: function() {
            return !!b("getVendorPrefixedName")("animationName")
        },
        hasCSSTransforms: function() {
            return !!b("getVendorPrefixedName")("transform")
        },
        hasCSS3DTransforms: function() {
            return !!b("getVendorPrefixedName")("perspective")
        },
        hasCSSTransitions: function() {
            return !!b("getVendorPrefixedName")("transition")
        }
    };
    e.exports = a
}), null);
__d("NavigationMetricsEnumJS", [], (function(a, b, c, d, e, f) {
    e.exports = Object.freeze({
        NAVIGATION_START: "navigationStart",
        UNLOAD_EVENT_START: "unloadEventStart",
        UNLOAD_EVENT_END: "unloadEventEnd",
        REDIRECT_START: "redirectStart",
        REDIRECT_END: "redirectEnd",
        FETCH_START: "fetchStart",
        DOMAIN_LOOKUP_START: "domainLookupStart",
        DOMAIN_LOOKUP_END: "domainLookupEnd",
        CONNECT_START: "connectStart",
        CONNECT_END: "connectEnd",
        SECURE_CONNECTION_START: "secureConnectionStart",
        REQUEST_START: "requestStart",
        RESPONSE_START: "responseStart",
        RESPONSE_END: "responseEnd",
        DOM_LOADING: "domLoading",
        DOM_INTERACTIVE: "domInteractive",
        DOM_CONTENT_LOADED_EVENT_START: "domContentLoadedEventStart",
        DOM_CONTENT_LOADED_EVENT_END: "domContentLoadedEventEnd",
        DOM_COMPLETE: "domComplete",
        LOAD_EVENT_START: "loadEventStart",
        LOAD_EVENT_END: "loadEventEnd"
    })
}), null);
__d("ResourceTimingMetricsEnumJS", [], (function(a, b, c, d, e, f) {
    e.exports = Object.freeze({
        START_TIME: "startTime",
        REDIRECT_START: "redirectStart",
        REDIRECT_END: "redirectEnd",
        FETCH_START: "fetchStart",
        DOMAIN_LOOKUP_START: "domainLookupStart",
        DOMAIN_LOOKUP_END: "domainLookupEnd",
        CONNECT_START: "connectStart",
        SECURE_CONNECTION_START: "secureConnectionStart",
        CONNECT_END: "connectEnd",
        REQUEST_START: "requestStart",
        RESPONSE_START: "responseStart",
        RESPONSE_END: "responseEnd"
    })
}), null);
__d("BrowserSupport", ["BrowserSupportCore", "ExecutionEnvironment", "UserAgent_DEPRECATED", "getVendorPrefixedName", "memoize"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = null;

    function h() {
        if (b("ExecutionEnvironment").canUseDOM) {
            g || (g = document.createElement("div"));
            return g
        }
        return null
    }
    c = function(a) {
        return b("memoize")(function() {
            var b = h();
            return !b ? !1 : a(b)
        })
    };
    d = {
        hasCSSAnimations: b("BrowserSupportCore").hasCSSAnimations,
        hasCSSTransforms: b("BrowserSupportCore").hasCSSTransforms,
        hasCSS3DTransforms: b("BrowserSupportCore").hasCSS3DTransforms,
        hasCSSTransitions: b("BrowserSupportCore").hasCSSTransitions,
        hasPositionSticky: c(function(a) {
            a.style.cssText = "position:-moz-sticky;position:-webkit-sticky;position:-o-sticky;position:-ms-sticky;position:sticky;";
            return /sticky/.test(a.style.position)
        }),
        hasScrollSnapPoints: c(function(a) {
            return "scrollSnapType" in a.style || "webkitScrollSnapType" in a.style || "msScrollSnapType" in a.style
        }),
        hasScrollBehavior: c(function(a) {
            return "scrollBehavior" in a.style
        }),
        hasPointerEvents: c(function(a) {
            if (!("pointerEvents" in a.style)) return !1;
            a.style.cssText = "pointer-events:auto";
            return a.style.pointerEvents === "auto"
        }),
        hasFileAPI: b("memoize")(function() {
            return !(b("UserAgent_DEPRECATED").webkit() && !b("UserAgent_DEPRECATED").chrome() && b("UserAgent_DEPRECATED").windows()) && "FileList" in window && "FormData" in window
        }),
        hasBlobFactory: b("memoize")(function() {
            return !!a.blob
        }),
        hasSVGForeignObject: b("memoize")(function() {
            return b("ExecutionEnvironment").canUseDOM && document.createElementNS && document.createElementNS("http://www.w3.org/2000/svg", "foreignObject").toString().includes("SVGForeignObject")
        }),
        hasMutationObserver: b("memoize")(function() {
            return !!window.MutationObserver
        }),
        getTransitionEndEvent: b("memoize")(function() {
            var a = {
                    transition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "mozTransitionEnd",
                    OTransition: "oTransitionEnd"
                },
                c = b("getVendorPrefixedName")("transition");
            return a[c] || null
        }),
        hasCanvasRenderingContext2D: function() {
            return !!window.CanvasRenderingContext2D
        }
    };
    e.exports = d
}), null);
__d("ImageTimingHelper", ["Arbiter", "BigPipe", "URI"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = {},
        h = {};

    function i(a) {
        __p && __p();
        var c = a.lid,
            d = a.pagelet,
            e = a.images,
            f = a.timeslice,
            i = a.ts,
            j = g[c];
        j || (j = g[c] = []);
        e.forEach(function(a) {
            try {
                var c = new(b("URI"))(a);
                a = c.setFragment("").toString()
            } catch (a) {
                return
            }
            if (h[a]) return;
            h[a] = !0;
            j.push({
                pagelet: d,
                timeslice: f,
                ts: i,
                uri: a
            })
        })
    }
    b("Arbiter").subscribe(b("BigPipe").Events.init, function(a, b) {
        b.lid && b.lid !== "0" && b.arbiter.subscribe("images_displayed", function(a, b) {
            i(b)
        })
    });
    b("Arbiter").subscribe("MRenderingScheduler/images_displayed", function(a, b) {
        i(b)
    });
    e.exports.getImageTimings = function(a) {
        return g[a] || []
    }
}), null);
__d("NavigationTimingHelper", ["NavigationMetricsEnumJS", "forEachObject", "performance"], (function(a, b, c, d, e, f) {
    __p && __p();

    function g(a, c) {
        var d = {};
        b("forEachObject")(b("NavigationMetricsEnumJS"), function(b) {
            var e = c[b];
            e && (d[b] = e + a)
        });
        return d
    }
    var h = {
        getAsyncRequestTimings: function(a) {
            if (!a || !b("performance").timing || !b("performance").getEntriesByName) return void 0;
            a = b("performance").getEntriesByName(a);
            return a.length === 0 ? void 0 : g(b("performance").timing.navigationStart, a[0])
        },
        getPerformanceNavigationTiming: function() {
            if (!b("performance").timing || !b("performance").getEntriesByType) return {};
            var a = b("performance").getEntriesByType("navigation");
            return !a.length ? {} : g(b("performance").timing.navigationStart, a[0])
        },
        getNavTimings: function() {
            if (!b("performance").timing) return void 0;
            var a = babelHelpers["extends"]({}, g(0, b("performance").timing), h.getPerformanceNavigationTiming());
            return g(0, a)
        }
    };
    e.exports = h
}), null);
__d("PageletEventsHelper", ["Arbiter", "PageletEventConstsJS"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = "BigPipe/init",
        h = "MRenderingScheduler/init",
        i = "pagelet_event",
        j = "phase_begin",
        k = {},
        l = [],
        m = !1;

    function n() {
        return {
            pagelets: {},
            categories: {},
            phase_start: {},
            display_resources: {},
            all_resources: {}
        }
    }

    function o(a, b, c, d) {
        k[d] == void 0 && (k[d] = n()), k[d].pagelets[b] == void 0 && (k[d].pagelets[b] = {}), k[d].pagelets[b][a] = c
    }

    function p(a) {
        __p && __p();
        a.subscribe(i, function(a, c) {
            __p && __p();
            var d = c.event,
                e = c.ts;
            a = c.id;
            var f = c.lid,
                g = c.phase,
                h = c.categories,
                i = c.allResources;
            c = c.displayResources;
            o(d, a, e, f);
            var j = k[f],
                m = j.pagelets[a];
            d === b("PageletEventConstsJS").ARRIVE_END && (m.phase = g, j.all_resources[a] = i, j.display_resources[a] = c);
            (d === b("PageletEventConstsJS").ONLOAD_END || d === b("PageletEventConstsJS").DISPLAY_END) && h && h.forEach(function(a) {
                j.categories[a] == void 0 && (j.categories[a] = {}), j.categories[a][d] = e
            });
            for (var m = 0, g = l.length; m < g; m++) l[m](a, d, e, f)
        }), a.subscribe(j, function(a, b) {
            k[b.lid].phase_start[b.phase] = b.ts
        })
    }
    a = {
        init: function() {
            __p && __p();
            if (m) return;
            b("Arbiter").subscribe(g, function(a, b) {
                a = b.lid;
                b = b.arbiter;
                k[a] = n();
                p(b)
            });
            b("Arbiter").subscribe(h, function(a, b) {
                a = b.lid;
                b = b.arbiter;
                k[a] = n();
                p(b)
            });
            m = !0
        },
        getMetrics: function(a) {
            return k[a] ? JSON.parse(JSON.stringify(k[a])) : null
        },
        subscribeToPageletEvents: function(a) {
            l.push(a);
            return {
                remove: function() {
                    l.splice(l.indexOf(a), 1)
                }
            }
        }
    };
    e.exports = a
}), null);
__d("ResourceTimingBootloaderHelper", ["Bootloader", "ErrorUtils", "ImageTimingHelper", "ResourceTimingMetricsEnumJS", "ResourceTimingsStore", "ResourceTypes", "URI", "forEachObject", "isEmpty", "performance"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = 500,
        h = [],
        i = {},
        j = {},
        k = {},
        l = [".mp4", ".m4v", ".mpd", "m4a"],
        m = new Set(["bootload", "js_exec", "start_bootload", "tag_bootload"]);

    function n(a) {
        for (var b = 0; b < l.length; b++) {
            var c = l[b];
            if (a.endsWith(c)) return !0
        }
        return !1
    }

    function o(a) {
        __p && __p();
        var c = new Map();
        b("ResourceTimingsStore").getMapFor(a).forEach(function(a) {
            if (a.requestSent != null) {
                var b = c.get(a.uri);
                b != null ? b.push(a) : c.set(a.uri, [a])
            }
        });
        c.forEach(function(a) {
            return a.sort(function(a, b) {
                return a.requestSent - b.requestSent
            })
        });
        return c
    }

    function p(a, b, c, d) {
        __p && __p();
        var e = a.get(b);
        if (e == null) {
            var f = b.indexOf("?");
            if (f !== -1) {
                b = b.substring(0, f);
                e = a.get(b)
            }
        }
        if (e != null)
            for (var f = 0; f < e.length; f++) {
                a = e[f];
                b = a.requestSent;
                a = a.responseReceived;
                if ((c == null || b != null && b <= c) && (d == null || a != null && a >= d)) return e.splice(f, 1)[0]
            }
        return null
    }

    function q(a, c, d, e, f, g, h) {
        __p && __p();
        if (!b("performance").timing || !b("performance").getEntriesByType) return null;
        var i = {},
            l = b("performance").timing.navigationStart;
        d && (i = b("ImageTimingHelper").getImageTimings(e).sort(function(a, b) {
            return a.ts - b.ts
        }).reduce(function(a, b) {
            if (a[b.uri]) return a;
            a[b.uri] = b.pagelet;
            return a
        }, {}));
        d = Array.from(b("performance").getEntriesByType("resource"));
        e = d.filter(function(a) {
            return a.duration >= 0 && a.startTime != null && a.startTime + l > c && (f == null || a.responseEnd == null || a.responseEnd + l < f)
        });
        e.sort(function(a, b) {
            return a.startTime - b.startTime
        });
        d = e.length;
        var m = 0,
            q = 0,
            u = 0,
            v = 0,
            w = 0,
            x = o(b("ResourceTypes").XHR),
            y = o(b("ResourceTypes").CSS),
            z = o(b("ResourceTypes").JS);
        for (var A = 0; A < e.length; A++) {
            var B = e[A],
                C = "",
                D = "",
                E = void 0,
                F = B.initiatorType;
            switch (F) {
                case "css":
                case "link":
                case "script":
                    F = b("ResourceTimingsStore").parseMakeHasteURL(B.name);
                    if (!F) continue;
                    var G = F[0];
                    F = F[1];
                    if (F === "css" || F === "js") {
                        var H = F === "css" ? y : z;
                        E = p(H, B.name, B.startTime + l, B.responseEnd + l);
                        if (E != null && h) {
                            D = F;
                            C = E.uid;
                            break
                        } else {
                            D = F;
                            H = k[B.name] || u++;
                            C = H + "_" + G
                        }
                    } else {
                        F = t(B.name);
                        H = F[0];
                        D = F[1];
                        C = q++ + "_" + H
                    }
                    break;
                case "img":
                    C = q++ + "_" + r(B.name);
                    D = "img";
                    break;
                case "iframe":
                    C = v++ + "_" + r(B.name) + s(B.name);
                    D = "iframe";
                    break;
                case "xmlhttprequest":
                    if (g) {
                        G = r(B.name);
                        F = s(B.name);
                        if (n(F)) {
                            C = w++ + "_" + G + F;
                            D = "video";
                            break
                        } else {
                            E = p(x, B.name, B.startTime + l, B.responseEnd + l);
                            if (E != null) {
                                D = b("ResourceTypes").XHR;
                                C = E.uid;
                                break
                            }
                        }
                    }
                default:
                    continue
            }
            H = {};
            G = Object.keys(b("ResourceTimingMetricsEnumJS"));
            for (var F = 0; F < G.length; F++) {
                var I = b("ResourceTimingMetricsEnumJS")[G[F]],
                    J = B[I];
                J && (H[I] = J + b("performance").timing.navigationStart)
            }
            if (E != null) {
                I = E;
                J = I.requestSent;
                F = I.responseReceived;
                if (c != null && J != null && J < c || f != null && F != null && F > f) continue;
                H.requestSent = J;
                H.responseReceived = F
            }
            H.type = D;
            H.desc = C;
            if (E != null && (D === b("ResourceTypes").JS || D === b("ResourceTypes").CSS || D === b("ResourceTypes").XHR)) {
                G = b("ResourceTimingsStore").getAnnotationsFor(D, E.uid);
                G != null && (H.annotations = G)
            }
            D == "img" && Object.prototype.hasOwnProperty.call(i, B.name) && (H.pagelet = i[B.name]);
            H.transferSize = B.transferSize;
            H.encodedBodySize = B.encodedBodySize;
            a[B.name] == void 0 && (a[B.name] = []);
            m++;
            a[B.name].push(H)
        }
        return h ? {
            numValidEntries: d,
            numSuccessfulMetrics: m
        } : null
    }

    function r(a) {
        a = new(b("URI"))(a).getDomain();
        return a
    }

    function s(a) {
        a = new(b("URI"))(a).getPath();
        return a
    }

    function t(a) {
        return [r(a), "img"]
    }

    function u(a) {
        __p && __p();
        var b = Object.keys(a).filter(function(a) {
            return a.startsWith("start_bootload/")
        }).sort(function(b, c) {
            return a[b] - a[c]
        }).map(function(a) {
            return a.substring(a.indexOf("/") + 1)
        });
        b.forEach(function(b) {
            return m.forEach(function(c) {
                c = c + "/" + b;
                a[c] != null && (i[c] = a[c])
            })
        });
        h = h.concat(b);
        if (h.length > g) {
            b = h.splice(0, h.length - g);
            b.forEach(function(a) {
                return m.forEach(function(b) {
                    i[b + "/" + a] && delete i[b + "/" + a]
                })
            })
        }
    }
    a = {
        addPastBootloaderMetricsToResourceTimings: function(c, d) {
            __p && __p();
            c === void 0 && (c = {});
            d === void 0 && (d = {});
            var a = b("Bootloader").getURLToHashMap();
            b("forEachObject")(c, function(b, c) {
                __p && __p();
                var e = a[c];
                if (!e) return;
                var f = new Map();
                f.set("bootloader_hash", e);
                m.forEach(function(a) {
                    var b = a + "/" + e;
                    b = d[b] || i[b];
                    b != null && f.set(a, b)
                });
                f.size > 0 && b.forEach(function(a) {
                    if (a.requestSent || a.responseReceived) return;
                    f.forEach(function(b, c) {
                        return a[c] = b
                    })
                })
            })
        },
        mergeBootloaderMetricsAndResourceTimings: function(a, c, d) {
            __p && __p();
            a === void 0 && (a = {});
            c === void 0 && (c = {});
            d === void 0 && (d = !0);
            b("isEmpty")(k) && (k = b("Bootloader").getURLToHashMap());
            var e = new Map();
            b("forEachObject")(k, function(a, b) {
                e.set(a, b)
            });
            var f = [];
            b("forEachObject")(c, function(b, c) {
                __p && __p();
                var d = c.indexOf("/");
                if (d === -1) return;
                var g = c.substring(0, d);
                if (!m.has(g)) return;
                f.push(c);
                var h = c.substring(d + 1);
                c = e.get(h);
                if (!c) {
                    c = h;
                    h = k[c];
                    if (!h) return
                }
                c.startsWith("data:") && (c = "inlined resource: " + h);
                a[c] == null && (a[c] = [{}]);
                a[c].forEach(function(a) {
                    a.bootloader_hash = h, a[g] = b
                })
            });
            d || (u(c), f.forEach(function(a) {
                return delete c[a]
            }));
            return a
        },
        getLastTTIAndE2EImageResponseEnds: function(a, c, d) {
            __p && __p();
            var e = {
                TTI: a,
                E2E: c
            };
            if (!b("performance").timing) return e;
            var f = d.filter(function(b) {
                    return b.ts <= a
                }).map(function(a) {
                    return a.uri
                }).reduce(function(b, a) {
                    b[a] = !0;
                    return b
                }, {}),
                g = d.map(function(a) {
                    return a.uri
                }).reduce(function(b, a) {
                    b[a] = !0;
                    return b
                }, {});
            for (var h in j) j[h].forEach(function(a) {
                a.type === "img" && (f[h] && (e.TTI = Math.max(e.TTI, a.responseEnd)), g[h] && (e.E2E = Math.max(e.E2E, a.responseEnd)))
            });
            return e
        },
        getMetrics: function(a, c, d, e, f, g) {
            j = {};
            b("isEmpty")(k) && (k = b("Bootloader").getURLToHashMap());
            a = q(j, a, c, d, e, f, g);
            return {
                data: j,
                diagnostics: a
            }
        }
    };
    e.exports = a
}), null);
__d("fbjs/lib/shallowEqual", ["shallowEqual"], (function(a, b, c, d, e, f) {
    "use strict";
    e.exports = b("shallowEqual")
}), null);
__d("PerfXFlusher", ["invariant", "Banzai"], (function(a, b, c, d, e, f, g) {
    var h = "perfx_custom_logger_endpoint",
        i = ["perfx_page", "perfx_page_type", "lid"];

    function j(a) {
        i.forEach(function(b) {
            return g(b in a, 'PerfXFlusher: Field "%s" missing in the PerfX payload', b)
        })
    }
    a = {
        flush: function(a) {
            j(a), b("Banzai").post(h, a, {
                signal: !0
            })
        },
        registerToSendWithBeacon: function(a) {
            b("Banzai").registerToSendWithBeacon(h, a)
        }
    };
    e.exports = a
}), null);
__d("DataAttributeUtils", ["DataStore", "Parent"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = [],
        h = {
            LEGACY_CLICK_TRACKING_ATTRIBUTE: "data-ft",
            CLICK_TRACKING_DATASTORE_KEY: "data-ft",
            ENABLE_STORE_CLICK_TRACKING: "data-fte",
            IMPRESSION_TRACKING_CONFIG_ATTRIBUTE: "data-xt-vimp",
            IMPRESSION_TRACKING_CONFIG_DATASTORE_KEY: "data-xt-vimp",
            REMOVE_LEGACY_TRACKING: "data-ftr",
            getDataAttribute: function(a, b) {
                return i[b] ? i[b](a) : a.getAttribute(b)
            },
            setDataAttribute: function(a, b, c) {
                return j[b] ? j[b](a, c) : a.setAttribute(b, c)
            },
            getDataFt: function(a) {
                if (a.getAttribute(h.ENABLE_STORE_CLICK_TRACKING)) {
                    var c = b("DataStore").get(a, h.CLICK_TRACKING_DATASTORE_KEY);
                    c || (c = h.moveClickTrackingToDataStore(a, a.getAttribute(h.REMOVE_LEGACY_TRACKING)));
                    return c
                }
                return a.getAttribute(h.LEGACY_CLICK_TRACKING_ATTRIBUTE)
            },
            setDataFt: function(a, c) {
                if (a.getAttribute(h.ENABLE_STORE_CLICK_TRACKING)) {
                    b("DataStore").set(a, h.CLICK_TRACKING_DATASTORE_KEY, c);
                    return
                }
                a.setAttribute(h.LEGACY_CLICK_TRACKING_ATTRIBUTE, c)
            },
            moveXTVimp: function(a) {
                h.moveAttributeToDataStore(a, h.IMPRESSION_TRACKING_CONFIG_ATTRIBUTE, h.IMPRESSION_TRACKING_CONFIG_DATASTORE_KEY), g.push(a.id)
            },
            getXTrackableElements: function() {
                var a = g.map(function(a) {
                        return document.getElementById(a)
                    }).filter(function(a) {
                        return !!a
                    }),
                    b = document.querySelectorAll("[data-xt-vimp]");
                for (var c = 0; c < b.length; c++) a.push(b[c]);
                return a
            },
            getDataAttributeGeneric: function(a, c, d) {
                d = b("DataStore").get(a, d);
                return d !== void 0 ? d : a.getAttribute(c)
            },
            moveAttributeToDataStore: function(a, c, d) {
                var e = a.getAttribute(c);
                e && (b("DataStore").set(a, d, e), a.removeAttribute(c))
            },
            moveClickTrackingToDataStore: function(a, c) {
                var d = a.getAttribute(h.LEGACY_CLICK_TRACKING_ATTRIBUTE);
                d && (b("DataStore").set(a, h.CLICK_TRACKING_DATASTORE_KEY, d), c && a.removeAttribute(h.LEGACY_CLICK_TRACKING_ATTRIBUTE));
                return d
            },
            getClickTrackingParent: function(a) {
                a = b("Parent").byAttribute(a, h.LEGACY_CLICK_TRACKING_ATTRIBUTE) || b("Parent").byAttribute(a, h.ENABLE_STORE_CLICK_TRACKING);
                return a
            },
            getClickTrackingElements: function(a) {
                return a.querySelectorAll("[" + h.LEGACY_CLICK_TRACKING_ATTRIBUTE + "], [" + h.ENABLE_STORE_CLICK_TRACKING + "]")
            },
            getParentByAttributeOrDataStoreKey: function(a, c, d) {
                while (a && (!a.getAttribute || !a.getAttribute(c)) && b("DataStore").get(a, d) === void 0) a = a.parentNode;
                return a
            }
        },
        i = {
            "data-ft": h.getDataFt,
            "data-xt-vimp": function(a) {
                return h.getDataAttributeGeneric(a, "data-xt-vimp", "data-xt-vimp")
            },
            "data-ad": function(a) {
                return h.getDataAttributeGeneric(a, "data-ad", "data-ad")
            },
            "data-xt": function(a) {
                return h.getDataAttributeGeneric(a, "data-xt", "data-xt")
            }
        },
        j = {
            "data-ft": h.setDataFt,
            "data-xt": function(a, c) {
                b("DataStore").set(a, "data-xt", c)
            }
        };
    e.exports = h
}), null);
__d("PerfXSharedFields", [], (function(a, b, c, d, e, f) {
    var g = {
        addCommonValues: function(a) {
            navigator && navigator.hardwareConcurrency !== void 0 && (a.num_cores = navigator.hardwareConcurrency);
            navigator && navigator.deviceMemory && (a.ram_gb = navigator.deviceMemory);
            navigator && navigator.connection && (typeof navigator.connection.downlink === "number" && (a.downlink_megabits = navigator.connection.downlink), typeof navigator.connection.effectiveType === "string" && (a.effective_connection_type = navigator.connection.effectiveType), typeof navigator.connection.rtt === "number" && (a.rtt_ms = navigator.connection.rtt));
            return a
        },
        getCommonData: function() {
            var a = {};
            g.addCommonValues(a);
            return a
        }
    };
    e.exports = g
}), null);
__d("QuicklingRefreshOverheadUtil", ["QuicklingConfig", "WebStorage", "performanceAbsoluteNow"], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();
    var g = null,
        h = 1e4;
    a = {
        onQuicklingStart: function() {
            g = b("performanceAbsoluteNow")()
        },
        onQuicklingVersionMatch: function() {
            g = null
        },
        onQuicklingRefreshStart: function() {
            if (!b("QuicklingConfig").logRefreshOverhead || g === null) return;
            var a = b("WebStorage").getSessionStorage();
            if (!a) return;
            a.setItem("quickling_refresh_overhead", (b("performanceAbsoluteNow")() - g).toString());
            a.setItem("quickling_refresh_start", Date.now().toString())
        },
        getOverhead: function(a) {
            __p && __p();
            if (!b("QuicklingConfig").logRefreshOverhead) return null;
            var c = b("WebStorage").getSessionStorageForRead();
            if (!c) return null;
            var d = c.getItem("quickling_refresh_start");
            if (d == null) return null;
            if (a - parseInt(d, 10) > h) return null;
            a = c.getItem("quickling_refresh_overhead");
            return a != null ? parseFloat(a) : null
        }
    };
    e.exports = a
}), null);
__d("pageLoadedViaSWCache", [], (function(a, b, c, d, e, f) {
    function a() {
        return self.__SW_CACHE__ === 1
    }
    e.exports = a
}), null);
__d("PerfXLogger", ["ArtilleryOnUntilOffLogging", "BanzaiODS", "DataAttributeUtils", "NavigationMetrics", "NavigationTimingHelper", "PerfXFlusher", "PerfXSharedFields", "QuicklingRefreshOverheadUtil", "VisibilityListener", "forEachObject", "pageLoadedViaSWCache", "performanceAbsoluteNow", "setTimeoutAcrossTransitions"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = {},
        h = {},
        i = 65 * 1e3,
        j = ["e2e", "tti", "all_pagelets_displayed", "all_pagelets_loaded", "artillery_disable_time"],
        k = {},
        l = {
            _listenersSetUp: !1,
            _uploadEarly: !1,
            _alreadyUploadedEarly: !1,
            _setupListeners: function() {
                __p && __p();
                if (this._listenersSetUp) return;
                this._subscribeToNavigationMetrics();
                b("PerfXFlusher").registerToSendWithBeacon(function() {
                    var a = [];
                    b("forEachObject")(g, function(b, c) {
                        if (!g[c].sent) {
                            b = this.getPayload(c, "unload fired");
                            b != null && a.push(b)
                        }
                    }.bind(this));
                    g = {};
                    return a
                }.bind(this));
                this._listenersSetUp = !0
            },
            _init: function(a) {
                __p && __p();
                var b = a.lid;
                if (b == null) return;
                this._alreadyUploadedEarly = !1;
                this._uploadEarly = !!a.upload_perfx_early;
                delete a.upload_perfx_early;
                var c = h[b] || [];
                delete h[b];
                if (a.sw_controlled_tags) {
                    if (navigator.serviceWorker && navigator.serviceWorker.controller)
                        for (var d = 0; d < a.sw_controlled_tags.length; d++) c.push(a.sw_controlled_tags[d]);
                    delete a.sw_controlled_tags
                }
                g[b] = babelHelpers["extends"]({
                    tags: new Set(c),
                    sent: !1
                }, a);
                this._registerTimeoutSendback(b);
                this._setupListeners()
            },
            initWithNavigationMetricsLID: function(a, c) {
                __p && __p();
                var d = b("NavigationMetrics").getFullPageLoadLid();
                if (!d) return;
                this._init(babelHelpers["extends"]({}, c, {
                    lid: d
                }));
                if (a && a.always)
                    for (var c = 0; c < a.always.length; c++) l.addTag(d, a.always[c]);
                if (a && a.swCache && b("pageLoadedViaSWCache")())
                    for (var c = 0; c < a.swCache.length; c++) l.addTag(d, a.swCache[c])
            },
            init: function(a, b) {
                b != null && a.lid != null && (k[a.lid] = b), this._init(a)
            },
            addTag: function(a, c) {
                this._alreadyUploadedEarly && b("BanzaiODS").bumpEntityKey("PerfXLateTag", c);
                var d = g[a];
                if (d) {
                    d.tags.add(c);
                    return
                }
                h[a] || (h[a] = []);
                h[a].push(c)
            },
            addTagWithNavigationMetricsLID: function(a) {
                this._alreadyUploadedEarly && b("BanzaiODS").bumpEntityKey("PerfXLateTag", a);
                var c = b("NavigationMetrics").getFullPageLoadLid();
                if (!c) return;
                l.addTag(c, a)
            },
            _registerTimeoutSendback: function(a) {
                var c = this._getFetchStart(a),
                    d = i;
                c != null && (d -= b("performanceAbsoluteNow")() - c);
                b("setTimeoutAcrossTransitions")(function() {
                    return this._uploadPayload(a, "sendback time out")
                }.bind(this), d)
            },
            _subscribeToNavigationMetrics: function() {
                __p && __p();
                b("NavigationMetrics").addRetroactiveListener(b("NavigationMetrics").Events.EVENT_OCCURRED, function(a, b) {
                    if (!(a in g)) return;
                    j.includes(b.event) && Object.prototype.hasOwnProperty.call(b, "timestamp") && b.timestamp != null && (g[a][b.event] = b.timestamp);
                    b.event === "all_pagelets_displayed" && this._uploadEarly && (j.forEach(function(c) {
                        Object.prototype.hasOwnProperty.call(b, c) && b[c] != null && (g[a][c] = b[c])
                    }), this._uploadPayload(a), this._alreadyUploadedEarly = !0)
                }.bind(this)), b("NavigationMetrics").addRetroactiveListener(b("NavigationMetrics").Events.NAVIGATION_DONE, function(a, b) {
                    var c = b.serverLID;
                    if (!(c in g)) return;
                    j.forEach(function(a) {
                        Object.prototype.hasOwnProperty.call(b, a) && b[a] != null && (g[c][a] = b[a])
                    });
                    this._uploadPayload(c)
                }.bind(this))
            },
            _getPayloadWithOffset: function(a, c, d) {
                __p && __p();
                a = g[a];
                if (a == null) return null;
                var e = Object.assign({}, a),
                    f = document.querySelector('[id^="hyperfeed_story_id"]');
                if (f) {
                    f = JSON.parse(b("DataAttributeUtils").getDataFt(f));
                    f && (e.mf_query_id = f.qid)
                }
                e.tags = Array.from(a.tags);
                e.art_id || (e.artillery_disable_time = b("ArtilleryOnUntilOffLogging").lastDisableTime());
                this._adjustValues(e, c);
                e.fetch_start = c;
                if (e.perfx_page_type === "normal") {
                    f = b("NavigationTimingHelper").getNavTimings();
                    f != null && f.navigationStart != null && (e.nav_to_fetch = c - f.navigationStart);
                    a = b("QuicklingRefreshOverheadUtil").getOverhead(c);
                    a !== null && (e.quickling_refresh_overhead = a)
                }
                d != null && (e.sendback_reason = d);
                b("PerfXSharedFields").addCommonValues(e);
                b("VisibilityListener").supported() && e.fetch_start && e.all_pagelets_displayed && e.tti && e.e2e && (e.tab_hidden_time_dd = b("VisibilityListener").getHiddenTime(e.fetch_start, e.fetch_start + e.all_pagelets_displayed), e.tab_hidden_time_tti = b("VisibilityListener").getHiddenTime(e.fetch_start, e.fetch_start + e.tti), e.tab_hidden_time_e2e = b("VisibilityListener").getHiddenTime(e.fetch_start, e.fetch_start + e.e2e));
                window && window.location && window.location.pathname && (e.request_uri = window.location.pathname);
                delete e.sent;
                return e
            },
            _uploadPayload: function(a, c) {
                if (g[a] != null && !g[a].sent) {
                    c = this.getPayload(a, c);
                    c != null && (b("PerfXFlusher").flush(c), g[a].sent = !0)
                }
            },
            getPayload: function(a, b) {
                return this._getPayloadWithOffset(a, this._getFetchStart(a), b)
            },
            _getFetchStart: function(a) {
                if (!(a in g)) return null;
                var c = g[a].perfx_page_type;
                if (c == "quickling")
                    if (!(a in k)) return null;
                    else c = b("NavigationTimingHelper").getAsyncRequestTimings(k[a]);
                else c = b("NavigationTimingHelper").getNavTimings();
                return !c || !c.fetchStart ? null : c.fetchStart
            },
            _adjustValues: function(a, b) {
                j.forEach(function(c) {
                    Object.prototype.hasOwnProperty.call(a, c) && (a[c] -= b)
                })
            }
        };
    e.exports = l
}), null);
__d("renderSubtreeIntoContainer_DO_NOT_USE", ["ReactDOM-fb"], (function(a, b, c, d, e, f) {
    "use strict";
    e.exports = b("ReactDOM-fb").unstable_renderSubtreeIntoContainer
}), null);
__d("shallowCompare", ["fbjs/lib/shallowEqual"], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, c, d) {
        return !b("fbjs/lib/shallowEqual")(a.props, c) || !b("fbjs/lib/shallowEqual")(a.state, d)
    }
    e.exports = a
}), null);
__d("SubscriptionsHandler", ["invariant"], (function(a, b, c, d, e, f, g) {
    "use strict";
    __p && __p();

    function h(a) {
        return a.remove || a.reset || a.unsubscribe || a.cancel || a.dispose
    }

    function i(a) {
        h(a).call(a)
    }

    function a() {
        this.$1 = []
    }
    a.prototype.addSubscriptions = function() {
        for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) b[c] = arguments[c];
        b.every(h) || g(0, 3659);
        this.$1 != null ? this.$1 = this.$1.concat(b) : b.forEach(i)
    };
    a.prototype.engage = function() {
        this.$1 == null && (this.$1 = [])
    };
    a.prototype.release = function() {
        this.$1 != null && (this.$1.forEach(i), this.$1 = null)
    };
    a.prototype.releaseOne = function(a) {
        var b = this.$1;
        if (b == null) return;
        var c = b.indexOf(a);
        c !== -1 && (i(a), b.splice(c, 1), b.length === 0 && (this.$1 = null))
    };
    e.exports = a
}), null);
__d("csx", [], (function(a, b, c, d, e, f) {
    function a(a) {
        throw new Error("csx: Unexpected class selector transformation.")
    }
    e.exports = a
}), null);