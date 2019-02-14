if (self.CavalryLogger) {
    CavalryLogger.start_js(["PQC56"]);
}

__d("LoadingMarker.react", ["LoadingMarkerGated", "React"], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return a.children
    }
    e.exports = b("LoadingMarkerGated").component || a
}), null);
__d("XUISpinner.react", ["cx", "fbt", "BrowserSupport", "LoadingMarker.react", "React", "UserAgent", "joinClasses"], (function(a, b, c, d, e, f, g, h) {
    __p && __p();
    var i;
    c = b("React").PropTypes;
    var j = b("BrowserSupport").hasCSSAnimations() && !(b("UserAgent").isEngine("Trident < 6") || b("UserAgent").isEngine("Gecko < 39") || b("UserAgent").isBrowser("Safari < 6"));
    i = babelHelpers.inherits(a, b("React").Component);
    i && i.prototype;
    a.prototype.render = function() {
        "use strict";
        var a = this.props,
            c = a.showOnAsync,
            d = a.background,
            e = a.paused;
        a = babelHelpers.objectWithoutPropertiesLoose(a, ["showOnAsync", "background", "paused"]);
        d = "img _55ym" + (this.props.size == "small" ? " _55yn" : "") + (this.props.size == "large" ? " _55yq" : "") + (d == "light" ? " _55yo" : "") + (d == "dark" ? " _55yp" : "") + (c ? " _5tqs" : "") + (j ? "" : " _5d9-") + (j && e ? " _2y32" : "");
        return b("React").createElement(b("LoadingMarker.react"), null, b("React").createElement("span", babelHelpers["extends"]({}, a, {
            className: b("joinClasses")(this.props.className, d),
            role: "progressbar",
            "aria-valuetext": h._("Loading..."),
            "aria-busy": "true",
            "aria-valuemin": "0",
            "aria-valuemax": "100"
        })))
    };

    function a() {
        "use strict";
        i.apply(this, arguments)
    }
    a.propTypes = {
        paused: c.bool,
        showOnAsync: c.bool,
        size: c.oneOf(["small", "large"]),
        background: c.oneOf(["light", "dark"])
    };
    a.defaultProps = {
        showOnAsync: !1,
        size: "small",
        background: "light"
    };
    e.exports = a
}), null);
__d("registerForHotReload", ["HotReloadConfig"], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return a
    }
    e.exports = a
}), null);
__d("unregisterForHotReload", ["HotReloadConfig"], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return a
    }
    e.exports = a
}), null);
__d("SchedulerTracing-dev", ["ReactFeatureFlags"], (function(a, b, c, d, e, f) {
    "use strict"
}), null);
__d("SchedulerTracing", ["requireCond", "SchedulerTracing-dev", "cr:687059"], (function(a, b, c, d, e, f) {
    "use strict";
    a = b("cr:687059");
    e.exports = a
}), null);
__d("scheduler/tracing", ["SchedulerTracing"], (function(a, b, c, d, e, f) {
    "use strict";
    e.exports = b("SchedulerTracing")
}), null);
__d("ReactDOM-dev", ["react", "prop-types/checkPropTypes", "scheduler", "scheduler/tracing", "invariant", "warning", "ReactFeatureFlags", "ReactFbErrorUtils", "EventListener", "lowPriorityWarning", "ReactFiberErrorDialog"], (function(a, b, c, d, e, f) {
    "use strict"
}), null);
__d("ReactDOM-fb", ["requireCond", "ReactDOM-dev", "cr:682514", "ReactExperimentalProdProfiling"], (function(a, b, c, d, e, f) {
    a = b("cr:682514");
    b("ReactExperimentalProdProfiling").onReactDomLoad(a);
    e.exports = a
}), null);
__d("ReactDOMInstrumentationFB", ["invariant", "Env", "LogBuffer", "ProfilingCounters", "React", "gkx", "performanceAbsoluteNow", "registerForHotReload", "unregisterForHotReload"], (function(a, b, c, d, e, f, g) {
    __p && __p();
    var h = !1,
        i = [],
        j = !1,
        k = !1;

    function l(a) {
        a = a.type;
        if (typeof a === "string") return "<dom-node>";
        var b = "<compressed-name>";
        return a.displayName || b || "<unknown>"
    }

    function m() {
        h || (h = !0, i.forEach(function(a) {
            n(a)
        }))
    }

    function n(c) {
        __p && __p();
        var d = c.render;

        function e(a, c, e) {
            __p && __p();
            var f = null,
                g = null;
            j && (f = b("performanceAbsoluteNow")());
            k && (g = b("ProfilingCounters").startTiming("REACT_RENDER_TIME"));
            c = d.call(this, a, c, e);
            g != null && b("ProfilingCounters").stopTiming(g);
            if (j) {
                e = b("performanceAbsoluteNow")();
                g = l(a);
                b("LogBuffer").write("react_speed", {
                    name: g,
                    begin: f,
                    end: e
                })
            }
            return c
        }
        Object.assign(c, {
            render: e,
            enableRenderMeasurements: function() {
                j = !0, m()
            }
        });
        e = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        e.addUserTimingListener != null || g(0, 1067);
        c = a.PerformanceObserver;
        if (c !== void 0 && b("gkx")("678771")) {
            e.addUserTimingListener();
            e = new c(function(a) {
                a.getEntries().forEach(function(a) {
                    return [a.name, a.entryType, a.startTime, a.duration]
                })
            });
            e.observe({
                entryTypes: ["measure"]
            })
        }
    }

    function c(a) {
        __p && __p();
        var c = a.render;

        function d(a, d, e) {
            var f = a.ref;
            if (typeof f !== "string" && typeof a.type === "function" && a.type.prototype && a.type.prototype.isReactComponent) {
                var g;
                a = b("React").cloneElement(a, {
                    ref: function(a) {
                        g && b("unregisterForHotReload")(g), a && b("registerForHotReload")(a), g = a, typeof f === "function" && f(a)
                    }
                })
            }
            return c.call(this, a, d, e)
        }
        Object.assign(a, {
            render: d
        })
    }
    b("Env").timeslice_categories && b("Env").timeslice_categories.react_render && (k = !0, m());
    d = {
        patchedReactDOM: function(a) {
            i.indexOf(a) === -1 && (i.push(a), h && n(a));
            return a
        }
    };
    e.exports = d
}), null);
__d("ReactDOM", ["ReactDOM-fb", "ReactDOMInstrumentationFB"], (function(a, b, c, d, e, f) {
    e.exports = b("ReactDOMInstrumentationFB").patchedReactDOM(b("ReactDOM-fb"))
}), null);
__d("keyMirrorRecursive", ["invariant"], (function(a, b, c, d, e, f, g) {
    "use strict";
    __p && __p();

    function h(a, b) {
        __p && __p();
        var c = {};
        i(a) || g(0, 580);
        for (var d in a) {
            if (!Object.prototype.hasOwnProperty.call(a, d)) continue;
            var e = a[d],
                f = b ? b + "." + d : d;
            i(e) ? e = h(e, f) : e = f;
            c[d] = e
        }
        return c
    }

    function i(a) {
        return a instanceof Object && !Array.isArray(a)
    }
    e.exports = h
}), null);