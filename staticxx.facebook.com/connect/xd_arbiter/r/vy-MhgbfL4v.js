< !DOCTYPE html > < html > < head > < title > Facebook Cross - Domain Messaging helper < /title></head > < body > < script > document.domain = 'facebook.com';
__transform_includes = {};
self.__DEV__ = self.__DEV__ || 0, self.emptyFunction = function() {};
"use strict";
Array.from || (Array.from = function(a) {
    if (a == null) throw new TypeError("Object is null or undefined");
    var b = arguments[1],
        c = arguments[2],
        d = this,
        e = Object(a),
        f = typeof Symbol === "function" ? typeof Symbol === "function" ? Symbol.iterator : "@@iterator" : "@@iterator",
        g = typeof b === "function",
        h = typeof e[f] === "function",
        i = 0,
        j, k;
    if (h) {
        j = typeof d === "function" ? new d() : [];
        var l = e[f](),
            m;
        while (!(m = l.next()).done) k = m.value, g && (k = b.call(c, k, i)), j[i] = k, i += 1;
        j.length = i;
        return j
    }
    var n = e.length;
    (isNaN(n) || n < 0) && (n = 0);
    j = typeof d === "function" ? new d(n) : new Array(n);
    while (i < n) k = e[i], g && (k = b.call(c, k, i)), j[i] = k, i += 1;
    j.length = i;
    return j
});
Array.isArray || (Array.isArray = function(a) {
    return Object.prototype.toString.call(a) == "[object Array]"
});
"use strict";
(function(a) {
    function b(a, b) {
        if (this == null) throw new TypeError("Array.prototype.findIndex called on null or undefined");
        if (typeof a !== "function") throw new TypeError("predicate must be a function");
        var c = Object(this),
            d = c.length >>> 0;
        for (var e = 0; e < d; e++)
            if (a.call(b, c[e], e, c)) return e;
        return -1
    }
    Array.prototype.findIndex || (Array.prototype.findIndex = b);
    Array.prototype.find || (Array.prototype.find = function(a, c) {
        if (this == null) throw new TypeError("Array.prototype.find called on null or undefined");
        a = b.call(this, a, c);
        return a === -1 ? void 0 : this[a]
    });
    Array.prototype.fill || (Array.prototype.fill = function(a) {
        if (this == null) throw new TypeError("Array.prototype.fill called on null or undefined");
        var b = Object(this),
            c = b.length >>> 0,
            d = arguments[1],
            e = d >> 0,
            f = e < 0 ? Math.max(c + e, 0) : Math.min(e, c),
            g = arguments[2],
            h = g === void 0 ? c : g >> 0,
            i = h < 0 ? Math.max(c + h, 0) : Math.min(h, c);
        while (f < i) b[f] = a, f++;
        return b
    })
})();
(function() {
    var a = Object.prototype.toString,
        b = Object("a"),
        c = b[0] != "a";

    function d(a) {
        a = +a;
        a !== a ? a = 0 : a !== 0 && a !== 1 / 0 && a !== -(1 / 0) && (a = (a > 0 || -1) * Math.floor(Math.abs(a)));
        return a
    }
    Array.prototype.map || (Array.prototype.map = function(a, b) {
        if (typeof a !== "function") throw new TypeError();
        var c, d = this.length,
            e = new Array(d);
        for (c = 0; c < d; ++c) c in this && (e[c] = a.call(b, this[c], c, this));
        return e
    });
    Array.prototype.forEach || (Array.prototype.forEach = function(a, b) {
        this.map(a, b)
    });
    Array.prototype.filter || (Array.prototype.filter = function(a, b) {
        if (typeof a !== "function") throw new TypeError();
        var c, d, e = this.length,
            f = [];
        for (c = 0; c < e; ++c) c in this && (d = this[c], a.call(b, d, c, this) && f.push(d));
        return f
    });
    Array.prototype.every || (Array.prototype.every = function(a, b) {
        if (typeof a !== "function") throw new TypeError();
        var c = new Object(this),
            d = c.length;
        for (var e = 0; e < d; e++)
            if (e in c && !a.call(b, c[e], e, c)) return !1;
        return !0
    });
    Array.prototype.some || (Array.prototype.some = function(a, b) {
        if (typeof a !== "function") throw new TypeError();
        var c = new Object(this),
            d = c.length;
        for (var e = 0; e < d; e++)
            if (e in c && a.call(b, c[e], e, c)) return !0;
        return !1
    });
    Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
        var c = this.length;
        b |= 0;
        b < 0 && (b += c);
        for (; b < c; b++)
            if (b in this && this[b] === a) return b;
        return -1
    });
    (!Array.prototype.lastIndexOf || [0, 1].lastIndexOf(0, -3) != -1) && (Array.prototype.lastIndexOf = function(b) {
        var e = c && a.call(this) == "[object String]" ? this.split("") : Object(this),
            f = e.length >>> 0;
        if (!f) return -1;
        var g = f - 1;
        arguments.length > 1 && (g = Math.min(g, d(arguments[1])));
        g = g >= 0 ? g : f - Math.abs(g);
        for (; g >= 0; g--)
            if (g in e && b === e[g]) return g;
        return -1
    });
    Array.prototype.reduce || (Array.prototype.reduce = function(a) {
        if (typeof a !== "function") throw new TypeError(a + " is not a function");
        var b = this.length >>> 0,
            c, d, e = arguments.length === 2;
        e && (c = arguments[1]);
        for (d = 0; d < b; ++d) Object.prototype.hasOwnProperty.call(this, d) && (e === !1 ? (c = this[d], e = !0) : c = a(c, this[d], d, this));
        if (e === !1) throw new TypeError("Reduce of empty array with no initial value");
        return c
    });
    Array.prototype.reduceRight || (Array.prototype.reduceRight = function(a) {
        if (typeof a !== "function") throw new TypeError(a + " is not a function");
        var b = this.length >>> 0,
            c, d, e = arguments.length === 2;
        e && (c = arguments[1]);
        for (d = b - 1; d > -1; --d) Object.prototype.hasOwnProperty.call(this, d) && (e === !1 ? (c = this[d], e = !0) : c = a(c, this[d], d, this));
        if (e === !1) throw new TypeError("Reduce of empty array with no initial value");
        return c
    })
})();
typeof Number.isFinite !== "function" && (Number.isFinite = function(a) {
    return typeof a === "number" && isFinite(a)
}), typeof Number.isNaN !== "function" && (Number.isNaN = function(a) {
    return typeof a === "number" && isNaN(a)
}), typeof Number.EPSILON !== "number" && (Number.EPSILON = Math.pow(2, -52)), typeof Number.MAX_SAFE_INTEGER !== "number" && (Number.MAX_SAFE_INTEGER = Math.pow(2, 53) - 1), typeof Number.MIN_SAFE_INTEGER !== "number" && (Number.MIN_SAFE_INTEGER = -1 * Number.MAX_SAFE_INTEGER), typeof Number.isInteger !== "function" && (Number.isInteger = function(a) {
    return Number.isFinite(a) && Math.floor(a) === a
}), typeof Number.isSafeInteger !== "function" && (Number.isSafeInteger = function(a) {
    return Number.isFinite(a) && a >= Number.MIN_SAFE_INTEGER && a <= Number.MAX_SAFE_INTEGER && Math.floor(a) === a
}), typeof Number.parseInt !== "function" && (Number.parseInt = parseInt), typeof Number.parseFloat !== "function" && (Number.parseFloat = parseFloat);
(function() {
    "use strict";
    var a = Array.prototype.indexOf;
    Array.prototype.includes || (Array.prototype.includes = function(d) {
        "use strict";
        if (d !== void 0 && Array.isArray(this) && !Number.isNaN(d)) return a.apply(this, arguments) !== -1;
        var e = Object(this),
            f = e.length ? b(e.length) : 0;
        if (f === 0) return !1;
        var g = arguments.length > 1 ? c(arguments[1]) : 0,
            h = g < 0 ? Math.max(f + g, 0) : g,
            i = Number.isNaN(d);
        while (h < f) {
            var j = e[h];
            if (j === d || i && Number.isNaN(j)) return !0;
            h++
        }
        return !1
    });

    function b(a) {
        return Math.min(Math.max(c(a), 0), Number.MAX_SAFE_INTEGER)
    }

    function c(a) {
        a = Number(a);
        return Number.isFinite(a) && a !== 0 ? d(a) * Math.floor(Math.abs(a)) : a
    }

    function d(a) {
        return a >= 0 ? 1 : -1
    }
})();
var __p;
(function() {
    var a = {},
        b = function(a, b) {
            if (!a && !b) return null;
            var c = {};
            typeof a !== "undefined" && (c.type = a);
            typeof b !== "undefined" && (c.signature = b);
            return c
        },
        c = function(a, c) {
            return b(a && /^[A-Z]/.test(a) ? a : void 0, c && (c.params && c.params.length || c.returns) ? "function(" + (c.params ? c.params.map(function(a) {
                return /\?/.test(a) ? "?" + a.replace("?", "") : a
            }).join(",") : "") + ")" + (c.returns ? ":" + c.returns : "") : void 0)
        },
        d = function(a, b, c) {
            return a
        },
        e = function(a, b, d) {
            "sourcemeta" in __transform_includes && (a.__SMmeta = b);
            if ("typechecks" in __transform_includes) {
                b = c(b ? b.name : void 0, d);
                b && __w(a, b)
            }
            return a
        },
        f = function(a, b, c) {
            return c.apply(a, b)
        },
        g = function(a, b, c, d) {
            d && d.params && __t.apply(a, d.params);
            c = c.apply(a, b);
            d && d.returns && __t([c, d.returns]);
            return c
        },
        h = function(b, c, d, e, f) {
            if (f) {
                f.callId || (f.callId = f.module + ":" + (f.line || 0) + ":" + (f.column || 0));
                e = f.callId;
                a[e] = (a[e] || 0) + 1
            }
            return d.apply(b, c)
        };
    typeof __transform_includes === "undefined" ? (__annotator = d, __bodyWrapper = f) : (__annotator = e, "codeusage" in __transform_includes ? (__annotator = d, __bodyWrapper = h, __bodyWrapper.getCodeUsage = function() {
        return a
    }, __bodyWrapper.clearCodeUsage = function() {
        a = {}
    }) : "typechecks" in __transform_includes ? __bodyWrapper = g : __bodyWrapper = f)
})();
__t = function(a) {
    return a[0]
}, __w = function(a) {
    return a
};
Object.create || (Object.create = function(a) {
    var b = typeof a;
    if (b != "object" && b != "function") throw new TypeError("Object prototype may only be a Object or null");
    b = function() {
        a === null && (this.__proto__ = a, delete this.__proto__)
    };
    b.prototype = a;
    return new b()
}), Object.keys || (Object.keys = function(a) {
    var b = typeof a;
    if (b != "object" && b != "function" || a === null) throw new TypeError("Object.keys called on non-object");
    b = Object.prototype.hasOwnProperty;
    var c = [];
    for (var d in a) b.call(a, d) && c.push(d);
    return c
}), Object.freeze || (Object.freeze = function(a) {
    return a
}), Object.isFrozen || (Object.isFrozen = function() {
    return !1
}), Object.seal || (Object.seal = function(a) {
    return a
}), (function() {
    try {
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")
    } catch (a) {
        Object.getOwnPropertyDescriptor = function(a) {
            return function(b, c) {
                try {
                    return a(b, c)
                } catch (a) {
                    return {
                        enumerable: b.propertyIsEnumerable(c),
                        configurable: !0,
                        get: b.__lookupGetter__(c),
                        set: b.__lookupSetter__(c)
                    }
                }
            }
        }(Object.getOwnPropertyDescriptor)
    }
})();
(function() {
    var a = !{
        toString: !0
    }.propertyIsEnumerable("toString");
    if (!a) return;
    var b = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "constructor"];
    Object.keys = function(a) {
        var c = typeof a;
        if (c != "object" && c != "function" || a === null) throw new TypeError("Object.keys called on non-object");
        c = Object.prototype.hasOwnProperty;
        var d = [];
        for (var e in a) c.call(a, e) && d.push(e);
        for (var f = 0; f < b.length; f++) {
            var g = b[f];
            c.call(a, g) && d.push(g)
        }
        return d
    };
    Object.assign = function(a, c) {
        if (a == null) throw new TypeError("Object.assign target cannot be null or undefined");
        var d = Object(a),
            e = Object.prototype.hasOwnProperty;
        for (var f = 1; f < arguments.length; f++) {
            var g = arguments[f];
            if (g == null) continue;
            var h = Object(g);
            for (var i in h) e.call(h, i) && (d[i] = h[i]);
            for (var j = 0; j < b.length; j++) {
                var k = b[j];
                e.call(h, k) && (d[k] = h[k])
            }
        }
        return d
    }
})();
(function() {
    if (Object.assign) return;
    var a = Object.prototype.hasOwnProperty,
        b;
    Object.keys && Object.keys.name !== "object_keys_polyfill" ? b = function(a, b) {
        var c = Object.keys(b);
        for (var d = 0; d < c.length; d++) a[c[d]] = b[c[d]]
    } : b = function(b, c) {
        for (var d in c) a.call(c, d) && (b[d] = c[d])
    };
    Object.assign = function(a, c) {
        if (a == null) throw new TypeError("Object.assign target cannot be null or undefined");
        var d = Object(a);
        for (var e = 1; e < arguments.length; e++) {
            var f = arguments[e];
            f != null && b(d, Object(f))
        }
        return d
    }
})();
(function(a, b) {
    var c = "keys",
        d = "values",
        e = "entries",
        f = function() {
            var a = h(Array),
                b;
            a || (b = function() {
                function a(a, b) {
                    "use strict";
                    this.$1 = a, this.$2 = b, this.$3 = 0
                }
                a.prototype.next = function() {
                    "use strict";
                    if (this.$1 == null) return {
                        value: void 0,
                        done: !0
                    };
                    var a = this.$1,
                        b = this.$1.length,
                        f = this.$3,
                        g = this.$2;
                    if (f >= b) {
                        this.$1 = void 0;
                        return {
                            value: void 0,
                            done: !0
                        }
                    }
                    this.$3 = f + 1;
                    if (g === c) return {
                        value: f,
                        done: !1
                    };
                    else if (g === d) return {
                        value: a[f],
                        done: !1
                    };
                    else if (g === e) return {
                        value: [f, a[f]],
                        done: !1
                    }
                };
                a.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
                    "use strict";
                    return this
                };
                return a
            }());
            return {
                keys: a ? function(a) {
                    return a.keys()
                } : function(a) {
                    return new b(a, c)
                },
                values: a ? function(a) {
                    return a.values()
                } : function(a) {
                    return new b(a, d)
                },
                entries: a ? function(a) {
                    return a.entries()
                } : function(a) {
                    return new b(a, e)
                }
            }
        }(),
        g = function() {
            var a = h(String),
                b;
            a || (b = function() {
                function a(a) {
                    "use strict";
                    this.$1 = a, this.$2 = 0
                }
                a.prototype.next = function() {
                    "use strict";
                    if (this.$1 == null) return {
                        value: void 0,
                        done: !0
                    };
                    var a = this.$2,
                        b = this.$1,
                        c = b.length;
                    if (a >= c) {
                        this.$1 = void 0;
                        return {
                            value: void 0,
                            done: !0
                        }
                    }
                    var d = b.charCodeAt(a);
                    if (d < 55296 || d > 56319 || a + 1 === c) d = b[a];
                    else {
                        c = b.charCodeAt(a + 1);
                        c < 56320 || c > 57343 ? d = b[a] : d = b[a] + b[a + 1]
                    }
                    this.$2 = a + d.length;
                    return {
                        value: d,
                        done: !1
                    }
                };
                a.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
                    "use strict";
                    return this
                };
                return a
            }());
            return {
                keys: function() {
                    throw TypeError("Strings default iterator doesn't implement keys.")
                },
                values: a ? function(a) {
                    return a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]()
                } : function(a) {
                    return new b(a)
                },
                entries: function() {
                    throw TypeError("Strings default iterator doesn't implement entries.")
                }
            }
        }();

    function h(a) {
        return typeof a.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] === "function" && typeof a.prototype.values === "function" && typeof a.prototype.keys === "function" && typeof a.prototype.entries === "function"
    }

    function i(a, b) {
        "use strict";
        this.$1 = a, this.$2 = b, this.$3 = Object.keys(a), this.$4 = 0
    }
    i.prototype.next = function() {
        "use strict";
        var a = this.$3.length,
            b = this.$4,
            f = this.$2,
            g = this.$3[b];
        if (b >= a) {
            this.$1 = void 0;
            return {
                value: void 0,
                done: !0
            }
        }
        this.$4 = b + 1;
        if (f === c) return {
            value: g,
            done: !1
        };
        else if (f === d) return {
            value: this.$1[g],
            done: !1
        };
        else if (f === e) return {
            value: [g, this.$1[g]],
            done: !1
        }
    };
    i.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
        "use strict";
        return this
    };
    var j = {
        keys: function(a) {
            return new i(a, c)
        },
        values: function(a) {
            return new i(a, d)
        },
        entries: function(a) {
            return new i(a, e)
        }
    };

    function k(a, b) {
        if (typeof a === "string") return g[b || d](a);
        else if (Array.isArray(a)) return f[b || d](a);
        else if (a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]) return a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
        else return j[b || e](a)
    }
    Object.assign(k, {
        KIND_KEYS: c,
        KIND_VALUES: d,
        KIND_ENTRIES: e,
        keys: function(a) {
            return k(a, c)
        },
        values: function(a) {
            return k(a, d)
        },
        entries: function(a) {
            return k(a, e)
        },
        generic: j.entries
    });
    a.FB_enumerate = k
})(typeof global === "undefined" ? this : global);
(function(a, b) {
    var c = a.window || a;

    function d() {
        return "f" + (Math.random() * (1 << 30)).toString(16).replace(".", "")
    }

    function e(a) {
        var b = a ? a.ownerDocument || a : document;
        b = b.defaultView || c;
        return !!(a && (typeof b.Node === "function" ? a instanceof b.Node : typeof a === "object" && typeof a.nodeType === "number" && typeof a.nodeName === "string"))
    }

    function f(a) {
        a = c[a];
        if (a == null) return !0;
        if (typeof c.Symbol !== "function") return !0;
        var b = a.prototype;
        return a == null || typeof a !== "function" || typeof b.clear !== "function" || new a().size !== 0 || typeof b.keys !== "function" || typeof b.forEach !== "function"
    }
    var g = a.FB_enumerate,
        h = function() {
            if (!f("Map")) return c.Map;
            var b = "key",
                i = "value",
                j = "key+value",
                k = "$map_",
                l, m = "IE_HASH_";

            function a(a) {
                "use strict";
                if (!r(this)) throw new TypeError("Wrong map object type.");
                q(this);
                if (a != null) {
                    a = g(a);
                    var b;
                    while (!(b = a.next()).done) {
                        if (!r(b.value)) throw new TypeError("Expected iterable items to be pair objects.");
                        this.set(b.value[0], b.value[1])
                    }
                }
            }
            a.prototype.clear = function() {
                "use strict";
                q(this)
            };
            a.prototype.has = function(a) {
                "use strict";
                a = o(this, a);
                return !!(a != null && this._mapData[a])
            };
            a.prototype.set = function(a, b) {
                "use strict";
                var c = o(this, a);
                c != null && this._mapData[c] ? this._mapData[c][1] = b : (c = this._mapData.push([a, b]) - 1, p(this, a, c), this.size += 1);
                return this
            };
            a.prototype.get = function(a) {
                "use strict";
                a = o(this, a);
                if (a == null) return void 0;
                else return this._mapData[a][1]
            };
            a.prototype["delete"] = function(a) {
                "use strict";
                var b = o(this, a);
                if (b != null && this._mapData[b]) {
                    p(this, a, void 0);
                    this._mapData[b] = void 0;
                    this.size -= 1;
                    return !0
                } else return !1
            };
            a.prototype.entries = function() {
                "use strict";
                return new n(this, j)
            };
            a.prototype.keys = function() {
                "use strict";
                return new n(this, b)
            };
            a.prototype.values = function() {
                "use strict";
                return new n(this, i)
            };
            a.prototype.forEach = function(a, b) {
                "use strict";
                if (typeof a !== "function") throw new TypeError("Callback must be callable.");
                a = a.bind(b || void 0);
                b = this._mapData;
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    d != null && a(d[1], d[0], this)
                }
            };
            a.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
                "use strict";
                return this.entries()
            };

            function n(a, c) {
                "use strict";
                if (!(r(a) && a._mapData)) throw new TypeError("Object is not a map.");
                if ([b, j, i].indexOf(c) === -1) throw new Error("Invalid iteration kind.");
                this._map = a;
                this._nextIndex = 0;
                this._kind = c
            }
            n.prototype.next = function() {
                "use strict";
                if (!this instanceof a) throw new TypeError("Expected to be called on a MapIterator.");
                var c = this._map,
                    d = this._nextIndex,
                    e = this._kind;
                if (c == null) return s(void 0, !0);
                c = c._mapData;
                while (d < c.length) {
                    var f = c[d];
                    d += 1;
                    this._nextIndex = d;
                    if (f)
                        if (e === b) return s(f[0], !1);
                        else if (e === i) return s(f[1], !1);
                    else if (e) return s(f, !1)
                }
                this._map = void 0;
                return s(void 0, !0)
            };
            n.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
                "use strict";
                return this
            };

            function o(a, b) {
                if (r(b)) {
                    var c = w(b);
                    return c ? a._objectIndex[c] : void 0
                } else {
                    c = k + b;
                    if (typeof b === "string") return a._stringIndex[c];
                    else return a._otherIndex[c]
                }
            }

            function p(a, b, c) {
                var d = c == null;
                if (r(b)) {
                    var e = w(b);
                    e || (e = x(b));
                    d ? delete a._objectIndex[e] : a._objectIndex[e] = c
                } else {
                    e = k + b;
                    typeof b === "string" ? d ? delete a._stringIndex[e] : a._stringIndex[e] = c : d ? delete a._otherIndex[e] : a._otherIndex[e] = c
                }
            }

            function q(a) {
                a._mapData = [], a._objectIndex = {}, a._stringIndex = {}, a._otherIndex = {}, a.size = 0
            }

            function r(a) {
                return a != null && (typeof a === "object" || typeof a === "function")
            }

            function s(a, b) {
                return {
                    value: a,
                    done: b
                }
            }
            a.__isES5 = function() {
                try {
                    Object.defineProperty({}, "__.$#x", {});
                    return !0
                } catch (a) {
                    return !1
                }
            }();

            function t(b) {
                if (!a.__isES5 || !Object.isExtensible) return !0;
                else return Object.isExtensible(b)
            }

            function u(a) {
                var b;
                switch (a.nodeType) {
                    case 1:
                        b = a.uniqueID;
                        break;
                    case 9:
                        b = a.documentElement.uniqueID;
                        break;
                    default:
                        return null
                }
                if (b) return m + b;
                else return null
            }
            var v = d();

            function w(b) {
                if (b[v]) return b[v];
                else if (!a.__isES5 && b.propertyIsEnumerable && b.propertyIsEnumerable[v]) return b.propertyIsEnumerable[v];
                else if (!a.__isES5 && e(b) && u(b)) return u(b);
                else if (!a.__isES5 && b[v]) return b[v]
            }
            var x = function() {
                var b = Object.prototype.propertyIsEnumerable,
                    c = 0;
                return function(d) {
                    if (t(d)) {
                        c += 1;
                        if (a.__isES5) Object.defineProperty(d, v, {
                            enumerable: !1,
                            writable: !1,
                            configurable: !1,
                            value: c
                        });
                        else if (d.propertyIsEnumerable) d.propertyIsEnumerable = function() {
                            return b.apply(this, arguments)
                        }, d.propertyIsEnumerable[v] = c;
                        else if (e(d)) d[v] = c;
                        else throw new Error("Unable to set a non-enumerable property on object.");
                        return c
                    } else throw new Error("Non-extensible objects are not allowed as keys.")
                }
            }();
            return __annotator(a, {
                name: "Map"
            })
        }();
    b = function() {
        if (!f("Set")) return c.Set;

        function a(a) {
            "use strict";
            if (this == null || typeof this !== "object" && typeof this !== "function") throw new TypeError("Wrong set object type.");
            b(this);
            if (a != null) {
                a = g(a);
                var c;
                while (!(c = a.next()).done) this.add(c.value)
            }
        }
        a.prototype.add = function(a) {
            "use strict";
            this._map.set(a, a);
            this.size = this._map.size;
            return this
        };
        a.prototype.clear = function() {
            "use strict";
            b(this)
        };
        a.prototype["delete"] = function(a) {
            "use strict";
            a = this._map["delete"](a);
            this.size = this._map.size;
            return a
        };
        a.prototype.entries = function() {
            "use strict";
            return this._map.entries()
        };
        a.prototype.forEach = function(a) {
            "use strict";
            var b = arguments[1],
                c = this._map.keys(),
                d;
            while (!(d = c.next()).done) a.call(b, d.value, d.value, this)
        };
        a.prototype.has = function(a) {
            "use strict";
            return this._map.has(a)
        };
        a.prototype.values = function() {
            "use strict";
            return this._map.values()
        };
        a.prototype.keys = function() {
            "use strict";
            return this.values()
        };
        a.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
            "use strict";
            return this.values()
        };

        function b(a) {
            a._map = new h(), a.size = a._map.size
        }
        return __annotator(a, {
            name: "Set"
        })
    }();
    a.Map = h;
    a.Set = b
})(typeof global === "undefined" ? this : global);
Date.now || (Date.now = function() {
    return new Date().getTime()
});
(function() {
    if (!Date.prototype.toISOString) {
        var a = function(a) {
            return a < 10 ? "0" + a : a
        };
        Date.prototype.toISOString = function() {
            if (!isFinite(this)) throw new Error("Invalid time value");
            var b = this.getUTCFullYear();
            b = (b < 0 ? "-" : b > 9999 ? "+" : "") + ("00000" + Math.abs(b)).slice(0 <= b && b <= 9999 ? -4 : -6);
            return b + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "." + (this.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z"
        }
    }
})();
Function.prototype.bind || (Function.prototype.bind = function(a) {
    if (typeof this !== "function") throw new TypeError("Bind must be called on a function");
    var b = this,
        c = Array.prototype.slice,
        d = c.call(arguments, 1);

    function e() {
        var e = b.prototype && this instanceof b;
        return b.apply(!e && a || this, d.concat(c.call(arguments)))
    }
    e.prototype = b.prototype;
    e.displayName = "bound:" + (b.displayName || b.name || "(?)");
    e.toString = function() {
        return "bound: " + b
    };
    return e
});

typeof window !== "undefined" && window.JSON && JSON.stringify(["\u2028\u2029"]) === '["\u2028\u2029"]' && (JSON.stringify = function(a) {
    var b = /\u2028/g,
        c = /\u2029/g;
    return function(d, e, f) {
        d = a.call(this, d, e, f);
        d && (-1 < d.indexOf("\u2028") && (d = d.replace(b, "\\u2028")), -1 < d.indexOf("\u2029") && (d = d.replace(c, "\\u2029")));
        return d
    }
}(JSON.stringify));
if (typeof JSON === "object" && typeof JSON.parse === "function") try {
    JSON.parse(null)
} catch (a) {
    JSON.originalParse = JSON.parse, JSON.parse = function(a) {
        return a === null ? null : JSON.originalParse(a)
    }
}
typeof Math.log2 !== "function" && (Math.log2 = function(a) {
    return Math.log(a) / Math.LN2
}), typeof Math.log10 !== "function" && (Math.log10 = function(a) {
    return Math.log(a) / Math.LN10
}), typeof Math.trunc !== "function" && (Math.trunc = function(a) {
    return a < 0 ? Math.ceil(a) : Math.floor(a)
}), typeof Math.sign !== "function" && (Math.sign = function(a) {
    return +(a > 0) - +(a < 0) || +a
});
(function() {
    var a = Object.prototype.hasOwnProperty;
    Object.entries = function(b) {
        if (b == null) throw new TypeError("Object.entries called on non-object");
        var c = [];
        for (var d in b) a.call(b, d) && c.push([d, b[d]]);
        return c
    };
    Object.values = function(b) {
        if (b == null) throw new TypeError("Object.values called on non-object");
        var c = [];
        for (var d in b) a.call(b, d) && c.push(b[d]);
        return c
    }
})();
(function() {
    Object.is || (Object.is = function(a, b) {
        if (a === b) return a !== 0 || 1 / a === 1 / b;
        else return a !== a && b !== b
    })
})();
Object.prototype.hasOwnProperty.call({}, "__proto__") && (Object.prototype.hasOwnProperty = function(a) {
    return function(b) {
        return b != "__proto__" && a.call(this, b)
    }
}(Object.prototype.hasOwnProperty));
(function(a) {
    a.__m = function(a, b) {
        a.__SMmeta = b;
        return a
    }
})(this);
typeof String.fromCodePoint !== "function" && (String.fromCodePoint = function() {
    var a = [];
    for (var b = 0; b < arguments.length; b++) {
        var c = Number(b < 0 || arguments.length <= b ? void 0 : arguments[b]);
        if (!isFinite(c) || Math.floor(c) != c || c < 0 || 1114111 < c) throw RangeError("Invalid code point " + c);
        c < 65536 ? a.push(String.fromCharCode(c)) : (c -= 65536, a.push(String.fromCharCode((c >> 10) + 55296), String.fromCharCode(c % 1024 + 56320)))
    }
    return a.join("")
});
String.prototype.startsWith || (String.prototype.startsWith = function(a) {
    "use strict";
    if (this == null) throw TypeError();
    var b = String(this),
        c = arguments.length > 1 ? Number(arguments[1]) || 0 : 0,
        d = Math.min(Math.max(c, 0), b.length);
    return b.indexOf(String(a), c) == d
}), String.prototype.endsWith || (String.prototype.endsWith = function(a) {
    "use strict";
    if (this == null) throw TypeError();
    var b = String(this),
        c = b.length,
        d = String(a),
        e = arguments.length > 1 ? Number(arguments[1]) || 0 : c,
        f = Math.min(Math.max(e, 0), c),
        g = f - d.length;
    return g < 0 ? !1 : b.lastIndexOf(d, g) == g
}), String.prototype.includes || (String.prototype.includes = function(a) {
    "use strict";
    if (this == null) throw TypeError();
    var b = String(this),
        c = arguments.length > 1 ? Number(arguments[1]) || 0 : 0;
    return b.indexOf(String(a), c) != -1
}), String.prototype.repeat || (String.prototype.repeat = function(a) {
    "use strict";
    if (this == null) throw TypeError();
    var b = String(this);
    a = Number(a) || 0;
    if (a < 0 || a === Infinity) throw RangeError();
    if (a === 1) return b;
    var c = "";
    while (a) a & 1 && (c += b), (a >>= 1) && (b += b);
    return c
}), String.prototype.codePointAt || (String.prototype.codePointAt = function(a) {
    "use strict";
    if (this == null) throw TypeError("Invalid context: " + this);
    var b = String(this),
        c = b.length;
    a = Number(a) || 0;
    if (a < 0 || c <= a) return void 0;
    var d = b.charCodeAt(a);
    if (55296 <= d && d <= 56319 && c > a + 1) {
        c = b.charCodeAt(a + 1);
        if (56320 <= c && c <= 57343) return (d - 55296) * 1024 + c - 56320 + 65536
    }
    return d
});
String.prototype.contains || (String.prototype.contains = String.prototype.includes);
String.prototype.padStart || (String.prototype.padStart = function(a, b) {
    a = a >> 0;
    b = String(b || " ");
    if (this.length > a) return String(this);
    else {
        a = a - this.length;
        a > b.length && (b += b.repeat(a / b.length));
        return b.slice(0, a) + String(this)
    }
}), String.prototype.padEnd || (String.prototype.padEnd = function(a, b) {
    a = a >> 0;
    b = String(b || " ");
    if (this.length > a) return String(this);
    else {
        a = a - this.length;
        a > b.length && (b += b.repeat(a / b.length));
        return String(this) + b.slice(0, a)
    }
});
String.prototype.trimLeft || (String.prototype.trimLeft = function() {
    return this.replace(/^\s+/, "")
}), String.prototype.trimRight || (String.prototype.trimRight = function() {
    return this.replace(/\s+$/, "")
});
String.prototype.trim || (String.prototype.trim = function() {
    if (this == null) throw new TypeError("String.prototype.trim called on null or undefined");
    return String.prototype.replace.call(this, /^\s+|\s+$/g, "")
});
(function() {
    var a, b = String.prototype.split,
        c = /()??/.exec("")[1] === a;
    String.prototype.split = function(d, e) {
        var f = this;
        if (Object.prototype.toString.call(d) !== "[object RegExp]") return b.call(f, d, e);
        var g = [],
            h = (d.ignoreCase ? "i" : "") + (d.multiline ? "m" : "") + (d.extended ? "x" : "") + (d.sticky ? "y" : ""),
            i = 0,
            d = new RegExp(d.source, h + "g"),
            j, k, l;
        f += "";
        c || (j = new RegExp("^" + d.source + "$(?!\\s)", h));
        e = e === a ? -1 >>> 0 : e >>> 0;
        while (k = d.exec(f)) {
            h = k.index + k[0].length;
            if (h > i) {
                g.push(f.slice(i, k.index));
                !c && k.length > 1 && k[0].replace(j, function() {
                    for (var b = 1; b < arguments.length - 2; b++) arguments[b] === a && (k[b] = a)
                });
                k.length > 1 && k.index < f.length && Array.prototype.push.apply(g, k.slice(1));
                l = k[0].length;
                i = h;
                if (g.length >= e) break
            }
            d.lastIndex === k.index && d.lastIndex++
        }
        i === f.length ? (l || !d.test("")) && g.push("") : g.push(f.slice(i));
        return g.length > e ? g.slice(0, e) : g
    }
})();
(function(a) {
    var b = a.babelHelpers = {},
        c = Object.prototype.hasOwnProperty;
    b.inheritsLoose = function(a, b) {
        Object.assign(a, b);
        a.prototype = Object.create(b && b.prototype);
        a.prototype.constructor = a;
        a.__superConstructor__ = b;
        return b
    };
    b.inherits = b.inheritsLoose;
    b.wrapNativeSuper = function(a) {
        var c = typeof Map === "function" ? new Map() : void 0;
        b.wrapNativeSuper = function(a) {
            if (a === null) return null;
            if (typeof a !== "function") throw new TypeError("Super expression must either be null or a function");
            if (c !== void 0) {
                if (c.has(a)) return c.get(a);
                c.set(a, d)
            }
            b.inheritsLoose(d, a);

            function d() {
                a.apply(this, arguments)
            }
            return d
        };
        return b.wrapNativeSuper(a)
    };
    b.assertThisInitialized = function(a) {
        if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return a
    };
    b._extends = Object.assign;
    b["extends"] = b._extends;
    b.construct = function(a, b) {
        var c = [null];
        c.push.apply(c, b);
        return new(Function.prototype.bind.apply(a, c))()
    };
    b.objectWithoutPropertiesLoose = function(a, b) {
        var d = {};
        for (var e in a) {
            if (!c.call(a, e) || b.indexOf(e) >= 0) continue;
            d[e] = a[e]
        }
        return d
    };
    b.objectWithoutProperties = b.objectWithoutPropertiesLoose;
    b.taggedTemplateLiteralLoose = function(a, b) {
        b || (b = a.slice(0));
        a.raw = b;
        return a
    };
    b.bind = Function.prototype.bind
})(typeof global === "undefined" ? self : global);
var require, __d;
(function(a) {
    var b = {},
        c = {},
        d = ["global", "require", "requireDynamic", "requireLazy", "module", "exports"];
    require = function(d, e) {
        if (Object.prototype.hasOwnProperty.call(c, d)) return c[d];
        if (!Object.prototype.hasOwnProperty.call(b, d)) {
            if (e) return null;
            throw new Error("Module " + d + " has not been defined")
        }
        e = b[d];
        var f = e.deps,
            g = e.factory.length,
            h, i = [];
        for (var j = 0; j < g; j++) {
            switch (f[j]) {
                case "module":
                    h = e;
                    break;
                case "exports":
                    h = e.exports;
                    break;
                case "global":
                    h = a;
                    break;
                case "require":
                    h = require;
                    break;
                case "requireDynamic":
                    h = null;
                    break;
                case "requireLazy":
                    h = null;
                    break;
                default:
                    h = require.call(null, f[j])
            }
            i.push(h)
        }
        e.factory.apply(a, i);
        c[d] = e.exports;
        return e.exports
    };
    __d = function(a, e, f, g) {
        typeof f === "function" ? (b[a] = {
            factory: f,
            deps: d.concat(e),
            exports: {}
        }, g === 3 && require.call(null, a)) : c[a] = f
    }
})(this);
typeof console === "undefined" && (function() {
    function a() {}
    console = {
        log: a,
        info: a,
        warn: a,
        debug: a,
        dir: a,
        error: a
    }
})();
(function(a) {
    var b = a.performance;
    b && b.setResourceTimingBufferSize && (b.setResourceTimingBufferSize(1e5), b.onresourcetimingbufferfull = function() {
        a.__isresourcetimingbufferfull = !0
    }, b.setResourceTimingBufferSize = function() {})
})(this);
__d("Log", [], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();
    a = {
        DEBUG: 3,
        INFO: 2,
        WARNING: 1,
        ERROR: 0
    };
    b = function(a, b, c) {
        for (var d = arguments.length, e = new Array(d > 3 ? d - 3 : 0), f = 3; f < d; f++) e[f - 3] = arguments[f];
        var h = 0,
            i = c.replace(/%s/g, function() {
                return String(e[h++])
            }),
            j = window.console;
        j && g.level >= b && j[a in j ? a : "log"](i)
    };
    var g = {
        level: -1,
        Level: a,
        debug: b.bind(null, "debug", a.DEBUG),
        info: b.bind(null, "info", a.INFO),
        warn: b.bind(null, "warn", a.WARNING),
        error: b.bind(null, "error", a.ERROR),
        log: b
    };
    e.exports = g
}), null);
__d("QueryString", [], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        __p && __p();
        var b = [];
        Object.keys(a).sort().forEach(function(c) {
            var d = a[c];
            if (d === void 0) return;
            if (d === null) {
                b.push(c);
                return
            }
            b.push(encodeURIComponent(c) + "=" + encodeURIComponent(d))
        });
        return b.join("&")
    }

    function b(a, b) {
        __p && __p();
        b === void 0 && (b = !1);
        var c = {};
        if (a === "") return c;
        a = a.split("&");
        for (var d = 0; d < a.length; d++) {
            var e = a[d].split("=", 2),
                f = decodeURIComponent(e[0]);
            if (b && Object.prototype.hasOwnProperty.call(c, f)) throw new URIError("Duplicate key: " + f);
            c[f] = e.length === 2 ? decodeURIComponent(e[1]) : null
        }
        return c
    }

    function c(a, b) {
        return a + (a.indexOf("?") !== -1 ? "&" : "?") + (typeof b === "string" ? b : g.encode(b))
    }
    var g = {
        encode: a,
        decode: b,
        appendToUrl: c
    };
    e.exports = g
}), null);
__d("sdk.FeatureFunctor", [], (function(a, b, c, d, e, f) {
    __p && __p();

    function g(a, b, c) {
        if (a.features && b in a.features) {
            a = a.features[b];
            if (typeof a === "object" && typeof a.rate === "number")
                if (a.rate && Math.random() * 100 <= a.rate) return a.value || !0;
                else return a.value ? null : !1;
            else return a
        }
        return c
    }

    function a(a) {
        return function() {
            for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++) c[d] = arguments[d];
            if (c.length < 2) throw new Error("Default value is required");
            var e = c[0],
                f = c[1];
            return g(a, e, f)
        }
    }
    e.exports = {
        create: a
    }
}), null);
__d("sdk.feature", ["JSSDKConfig", "sdk.FeatureFunctor"], (function(a, b, c, d, e, f, g, h) {
    e.exports = h.create(g)
}), null);
__d("wrapFunction", [], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = {};
    a = function(a, b, c) {
        return function() {
            var d = b in g ? g[b](a, c) : a;
            for (var e = arguments.length, f = new Array(e), h = 0; h < e; h++) f[h] = arguments[h];
            return d.apply(this, f)
        }
    };
    a.setWrapper = function(a, b) {
        g[b] = a
    };
    e.exports = a
}), null);
__d("XDM", ["Log", "sdk.feature", "wrapFunction"], (function(a, b, c, d, e, f, g, h, i) {
    __p && __p();
    var j = {},
        k = {
            transports: []
        };

    function l(a) {
        __p && __p();
        var b = {},
            c = a.length,
            d = k.transports;
        while (c--) b[a[c]] = 1;
        c = d.length;
        while (c--) {
            a = d[c];
            var e = j[a];
            if (!b[a] && e.isAvailable()) return a
        }
        return null
    }
    a = {
        register: function(a, b) {
            g.debug("Registering %s as XDM provider", a), k.transports.push(a), j[a] = b
        },
        create: function(a) {
            __p && __p();
            if (!a.whenReady && !a.onMessage) {
                var b = "An instance without whenReady or onMessage makes no sense";
                g.error(b);
                throw new Error(b)
            }
            a.channel || (g.warn("Missing channel name, selecting at random"), a.channel = "f" + (Math.random() * (1 << 30)).toString(16).replace(".", ""));
            a.whenReady || (a.whenReady = function() {});
            a.onMessage || (a.onMessage = function() {});
            b = (b = a.transport) != null ? b : l(a.blacklist || []);
            var c = b != null ? j[b] : null;
            if (c != null && c.isAvailable()) {
                g.debug("%s is available", b);
                c.init(a);
                return b
            }
            return null
        }
    };
    var m = /\.facebook\.com(\/|$)/;

    function n(a, b) {
        var c = window.location.hostname.match(/\.(facebook\.sg|facebookcorewwwi\.onion)$/);
        c = c ? c[1] : "facebook.com";
        new Image().src = "https://www." + c + "/common/scribe_endpoint.php?c=" + encodeURIComponent(a) + "&m=" + encodeURIComponent(JSON.stringify(b))
    }
    a.register("postmessage", function() {
        __p && __p();
        var a = !1;
        return {
            isAvailable: function() {
                return !!window.postMessage
            },
            init: function(b) {
                __p && __p();
                g.debug("init postMessage: " + b.channel);
                var c = "_FB_" + b.channel,
                    d = {
                        send: function(a, b, c, d) {
                            __p && __p();
                            if (window === c) {
                                g.error("Invalid windowref, equal to window (self)");
                                throw new Error()
                            }
                            g.debug("sending to: %s (%s)", b, d);
                            var e = function() {
                                try {
                                    c.postMessage("_FB_" + d + a, b)
                                } catch (a) {
                                    h("xdm_scribe_logging", !1) && n("jssdk_error", {
                                        error: "POST_MESSAGE",
                                        extra: {
                                            message: a.message + ", html/js/modules/XDM.js:231"
                                        }
                                    });
                                    throw a
                                }
                            };
                            e()
                        }
                    };
                if (a) {
                    b.whenReady(d);
                    return
                }
                window.addEventListener("message", i(function(a) {
                    __p && __p();
                    var d = a.data,
                        e = a.origin || "native";
                    if (!/^(https?:\/\/|native$)/.test(e)) {
                        g.debug("Received message from invalid origin type: %s", e);
                        return
                    }
                    if (e !== "native" && !(m.test(location.hostname) || m.test(a.origin))) return;
                    if (typeof d !== "string") {
                        g.warn("Received message of type %s from %s, expected a string", typeof d, e);
                        return
                    }
                    g.debug("received message %s from %s", d, e);
                    d.substring(0, c.length) == c && (d = d.substring(c.length));
                    b.onMessage(d, e)
                }, "entry", "onMessage"));
                b.whenReady(d);
                a = !0
            }
        }
    }());
    e.exports = a
}), null);
__d("resolveWindow", [], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        __p && __p();
        var b = window;
        a = a.split(".");
        try {
            for (var c = 0; c < a.length; c++) {
                var d = a[c],
                    e = /^frames\[[\'\"]?([a-zA-Z0-9\-_]+)[\'\"]?\]$/.exec(d);
                if (e) b = b.frames[e[1]];
                else if (d === "opener" || d === "parent" || d === "top") b = b[d];
                else return null
            }
        } catch (a) {
            return null
        }
        return b
    }
    e.exports = a
}), null);
__d("initXdArbiter", ["QueryString", "resolveWindow", "Log", "XDM"], (function(a, b, c, d, e, f) {
    __p && __p();
    (function() {
        __p && __p();
        var a = b("QueryString"),
            c = b("resolveWindow"),
            d = b("Log"),
            e = b("XDM");

        function f(a) {
            return a ? a.replace(/[\"\'<>\(\)\\@]/g, "") : a
        }

        function g() {
            return !window.chrome || !location.ancestorOrigins ? !1 : !/\.facebook\.com$/.test(location.ancestorOrigins[1])
        }

        function h(a, b) {
            if (g()) return "";
            if (window != parent && window.parent != window.parent.parent) try {
                var c = parent.parent;
                return c.XdArbiter.register(window, a, b)
            } catch (a) {
                d.error("Could not register with XdArbiter in parent.parent")
            }
            return ""
        }

        function i(a, b, e) {
            __p && __p();
            if (!a && g()) {
                d.error("Can not use parent.parent to reach facebook.com");
                return
            }
            var f = a ? c(a) : parent.parent;
            if (f == null) d.error("Could not reach facebook.com using %s", a);
            else try {
                f = f;
                f.XdArbiter.handleMessage(b, e, window)
            } catch (b) {
                d.error("Could not reach facebook.com using %s", a)
            }
        }

        function j(a, b) {
            var c = 50;
            b = function() {
                --c || window.clearInterval(d);
                try {
                    a(), window.clearInterval(d)
                } catch (a) {}
            };
            var d = window.setInterval(b, 50);
            b()
        }

        function k() {
            __p && __p();
            var a = null;
            if (p.origin != null) {
                var b = /https?:\/\/[^\/]*/.exec(p.origin);
                a = b === null ? null : b[0]
            }
            j(function() {
                __p && __p();
                var b = c(p.relation);
                if (b != null) {
                    b = b.frames["fb_xdm_frame_" + q];
                    if (b != null) {
                        if (b.location.search === "undefined") throw new Error("Proxy not ready");
                        location.search === b.location.search ? b.proxyMessage(o, a) : d.error("Version mismatch: %s, %s", location.search, b.location.search)
                    } else d.error("Couldn't get proxy window reference for relation %s", p.relation)
                }
            }, 50)
        }

        function l() {
            __p && __p();
            var a = null;
            if (p.origin != null) {
                var b = /https?:\/\/[^\/]*/.exec(p.origin);
                a = b === null ? null : b[0]
            }
            if (window.__fbNative && window.__fbNative.postMessage) window.__fbNative.postMessage(o, a);
            else {
                b = function b(c) {
                    window.removeEventListener("fbNativeReady", b), window.__fbNative.postMessage(o, a)
                };
                window.addEventListener("fbNativeReady", b)
            }
        }
        var m = /#(.*)|$/.exec(document.URL),
            n = /#(.*)|$/.exec(window.location.href),
            o = m !== null && m[1] ? m[1] : n !== null && n[1] ? n[1] : "";
        window == top && (location.hash = "");
        if (!o) {
            d.error("xd_arbiter.php loaded without a valid hash, referrer: %s", document.referrer);
            return
        }
        var p = a.decode(o, !0),
            q = location.protocol.replace(":", "");
        if (window.name.substring(0, 6) === "blank_") {
            parent.frames[p.forIframe].require("Arbiter").inform("blankIframeAck", window);
            return
        }
        if (p.relation) {
            window == top && /FBAN\/\w+;/i.test(navigator.userAgent) ? (d.info("Native proxy"), l()) : (d.info("Legacy proxy to %s", p.relation), k());
            return
        }
        if (!new RegExp(q + "$").test(window.name)) {
            d.info("Redirection to %s detected, aborting", q);
            return
        }
        m = f(p.transport);
        var r = f(p.channel),
            s = f(p.origin),
            t = f(p.xd_name);
        if (!/^https?/.test(s)) {
            d.error("Invalid origin presented, aborting.");
            return
        }
        n = document.body;
        if (n === null) {
            d.error("Invalid runtime environment (no document.body), aborting.");
            return
        }
        e.create({
            root: n,
            transport: m,
            channel: r + "_" + q,
            onMessage: function(b, c) {
                if (s !== c) {
                    d.info("Received message from unknown origin %s, expected %s.", c, s);
                    return
                }
                c = null;
                typeof b === "string" ? /^FB_RPC:/.test(b) || (b = a.decode(b), c = b.relation) : c = b.relation;
                i(c, b, s)
            },
            whenReady: function(b) {
                window.proxyMessage = function(a, c) {
                    c === s ? b.send(a, s, parent, r) : d.error("Failed proxying to %s, expected %s", c, s)
                };
                var c = {
                        xd_action: "proxy_ready",
                        logged_in: /\bc_user=/.test(document.cookie)
                    },
                    e = h(t, s);
                e && (c.registered = e);
                b.send(a.encode(c), s, parent, r)
            }
        })
    })()
}), null);
__d("JSSDKConfig", [], {
    "features": {
        "allow_non_canvas_app_events": false,
        "error_handling": {
            "rate": 4
        },
        "e2e_ping_tracking": {
            "rate": 1.0e-6
        },
        "xd_timeout": {
            "rate": 1,
            "value": 60000
        },
        "use_bundle": true,
        "should_log_response_error": true,
        "popup_blocker_scribe_logging": {
            "rate": 100
        },
        "https_only_enforce_starting": 2538809200000,
        "https_only_learn_more": "https:\/\/developers.facebook.com\/blog\/post\/2018\/06\/08\/enforce-https-facebook-login\/",
        "https_only_scribe_logging": {
            "rate": 1
        },
        "log_perf": {
            "rate": 0.001
        }
    }
});
require('initXdArbiter'); < /script><b id="warning" style="display: none; color:red"> SECURITY WARNING: Please treat the URL above as you would your password and do not share it with anyone. See the <a href="https:/ / l.facebook.com / l.php ? u = https % 3 A % 2 F % 2 Fon.fb.me % 2 F1mXNHhm & amp;
h = AT2Yes0h9h_vjuqSUxfs8nveGo9I_TRjrswDL_RpfyoQ5DsXDBGpD39RgkW5BPeJ9sO1eaeXeotpz7AJgnpUXeW2qJwOxIVfe_9DmgR79VWa - yXkZ - fVgA " target="
_blank " rel="
nofollow " data-lynx-mode="
origin ">Facebook Help Center</a> for more information. </b><script>if (window == top) {  setTimeout(function() {    document.getElementById("
warning ").style.display = 'block';  }, 2000);}</script></body></html>