if (self.CavalryLogger) {
    CavalryLogger.start_js(["TBIyP"]);
}

__d("FetchStreamConfig", [], (function(a, b, c, d, e, f) {
    e.exports = {
        delim: "/*<!-- fetch-stream -->*/"
    }
}), null);
__d("AsyncDOM", ["CSS", "DOM", "FBLogger"], (function(a, b, c, d, e, f) {
    __p && __p();
    a = {
        invoke: function(a, c) {
            __p && __p();
            for (var d = 0; d < a.length; ++d) {
                var e = a[d],
                    f = e[0],
                    g = e[1],
                    h = e[2];
                e = e[3];
                h = h && c || null;
                g && (h = b("DOM").scry(h || document.documentElement, g)[0]);
                f != "eval" && !h && b("FBLogger")("async_dom").warn("Could not find relativeTo element for %s AsyncDOM operation based on selector: %s", f, g);
                switch (f) {
                    case "eval":
                        new Function(e).apply(h);
                        break;
                    case "hide":
                        b("CSS").hide(h);
                        break;
                    case "show":
                        b("CSS").show(h);
                        break;
                    case "setContent":
                        b("DOM").setContent(h, e);
                        break;
                    case "appendContent":
                        b("DOM").appendContent(h, e);
                        break;
                    case "prependContent":
                        b("DOM").prependContent(h, e);
                        break;
                    case "insertAfter":
                        b("DOM").insertAfter(h, e);
                        break;
                    case "insertBefore":
                        b("DOM").insertBefore(h, e);
                        break;
                    case "remove":
                        b("DOM").remove(h);
                        break;
                    case "replace":
                        b("DOM").replace(h, e);
                        break;
                    default:
                        b("FBLogger")("async_dom").warn("Received invalid command %s for AsyncDOM operation", f)
                }
            }
        }
    };
    e.exports = a
}), null);
__d("AsyncResponse", ["invariant", "Bootloader", "FBLogger", "HTML"], (function(a, b, c, d, e, f, g) {
    "use strict";
    __p && __p();

    function h(a, b) {
        this.error = 0, this.errorSummary = null, this.errorDescription = null, this.onload = null, this.replay = !1, this.payload = b, this.request = a, this.silentError = !1, this.transientError = !1, this.blockedAction = !1, this.is_last = !0, this.responseHeaders = null
    }
    h.prototype.getRequest = function() {
        return this.request
    };
    h.prototype.getPayload = function() {
        return this.payload
    };
    h.prototype.toError = function() {
        this.error !== 0 || g(0, 5599);
        var a = this.errorSummary || "",
            b = this.getErrorDescriptionString() || "",
            c = new Error(a.toString() + ": " + b);
        Object.assign(c, {
            code: this.error,
            description: this.errorDescription || "",
            descriptionString: b,
            response: this,
            summary: a,
            isSilent: this.silentError,
            isTransient: this.transientError
        });
        return c
    };
    h.prototype.getError = function() {
        return this.error
    };
    h.prototype.getErrorSummary = function() {
        return this.errorSummary
    };
    h.prototype.setErrorSummary = function(a) {
        a = a === void 0 ? null : a;
        this.errorSummary = a;
        return this
    };
    h.prototype.getErrorDescription = function() {
        return this.errorDescription
    };
    h.prototype.getErrorDescriptionString = function() {
        var a = this.getErrorDescription();
        if (a == null) return null;
        if (b("HTML").isHTML(a)) {
            var c = new(b("HTML"))(a);
            return c.getRootNode().textContent
        }
        return a.toString()
    };
    h.prototype.getErrorIsWarning = function() {
        return !!this.errorIsWarning
    };
    h.prototype.isTransient = function() {
        return !!this.transientError
    };
    h.prototype.isBlockedAction = function() {
        return !!this.blockedAction
    };
    h.prototype.getResponseHeader = function(a) {
        __p && __p();
        var b = this.responseHeaders;
        if (!b) return null;
        b = b.replace(/^\n/, "");
        a = a.toLowerCase();
        b = b.split("\r\n");
        for (var c = 0; c < b.length; ++c) {
            var d = b[c],
                e = d.indexOf(": ");
            if (e <= 0) continue;
            var f = d.substring(0, e).toLowerCase();
            if (f === a) return d.substring(e + 2)
        }
        return null
    };
    h.defaultErrorHandler = function(a) {
        try {
            !a.silentError ? h.verboseErrorHandler(a) : b("FBLogger")("async_response").catching(a.toError()).warn("default error handler called")
        } catch (b) {
            alert(a)
        }
    };
    h.verboseErrorHandler = function(a, c) {
        b("Bootloader").loadModules(["ExceptionDialog"], function(b) {
            return b.showAsyncError(a, c)
        }, "AsyncResponse")
    };
    e.exports = h
}), null);
__d("StreamBlockReader", ["Promise", "regeneratorRuntime"], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a) {
        "use strict";
        __p && __p();
        if (!a.getReader) throw new Error("No getReader method found on given object");
        this.$3 = a.getReader();
        this.$1 = "";
        this.$2 = null;
        this.$4 = !1;
        this.$5 = "utf-8";
        this.$6 = "";
        this.$9 = !1;
        this.$8 = function() {
            return b("Promise").reject("Sorry, you are somehow using this too early.")
        };
        this.$7 = new(b("Promise"))(function(a, b) {
            this.$8 = a
        }.bind(this))
    }
    a.prototype.changeEncoding = function(a) {
        "use strict";
        if (this.$2) throw new Error("Decoder already in use, encoding cannot be changed");
        this.$5 = a
    };
    a.prototype.$10 = function() {
        "use strict";
        if (!self.TextDecoder) throw new Error("TextDecoder is not supported here");
        this.$2 || (this.$2 = new self.TextDecoder(this.$5));
        return this.$2
    };
    a.prototype.$11 = function() {
        "use strict";
        if (this.$9) throw new Error("Something else is already reading from this reader");
        this.$9 = !0
    };
    a.prototype.$12 = function() {
        "use strict";
        this.$9 = !1
    };
    a.prototype.isDone = function() {
        "use strict";
        return this.$4
    };
    a.prototype.$13 = function() {
        "use strict";
        __p && __p();
        var a, c, d, e;
        return b("regeneratorRuntime").async(function(f) {
            __p && __p();
            while (1) switch (f.prev = f.next) {
                case 0:
                    if (!(this.$6 !== "")) {
                        f.next = 4;
                        break
                    }
                    a = this.$6;
                    this.$6 = "";
                    return f.abrupt("return", a);
                case 4:
                    if (!this.isDone()) {
                        f.next = 6;
                        break
                    }
                    throw new Error("You cannot read from a stream that is done");
                case 6:
                    f.next = 8;
                    return b("regeneratorRuntime").awrap(this.$3.read());
                case 8:
                    c = f.sent;
                    d = c.done;
                    e = c.value;
                    this.$4 = d;
                    d && this.$8();
                    return f.abrupt("return", e ? this.$10().decode(e, {
                        stream: !d
                    }) : "");
                case 14:
                case "end":
                    return f.stop()
            }
        }, null, this)
    };
    a.prototype.readNextBlock = function() {
        "use strict";
        __p && __p();
        var a;
        return b("regeneratorRuntime").async(function(b) {
            while (1) switch (b.prev = b.next) {
                case 0:
                    this.$11();
                    a = this.$13();
                    this.$12();
                    return b.abrupt("return", a);
                case 4:
                case "end":
                    return b.stop()
            }
        }, null, this)
    };
    a.prototype.readUntilStringOrEnd = function(a) {
        "use strict";
        return b("regeneratorRuntime").async(function(c) {
            while (1) switch (c.prev = c.next) {
                case 0:
                    c.next = 2;
                    return b("regeneratorRuntime").awrap(this.readUntilOneOfStringOrEnd_DO_NOT_USE([a]));
                case 2:
                    return c.abrupt("return", c.sent);
                case 3:
                case "end":
                    return c.stop()
            }
        }, null, this)
    };
    a.prototype.readUntilStringOrThrow = function(a) {
        "use strict";
        __p && __p();
        var c, d, e;
        return b("regeneratorRuntime").async(function(f) {
            __p && __p();
            while (1) switch (f.prev = f.next) {
                case 0:
                    if (a) {
                        f.next = 2;
                        break
                    }
                    throw new Error("cannot read empty string");
                case 2:
                    this.$11(), c = "", d = 0;
                case 5:
                    if (this.isDone()) {
                        f.next = 23;
                        break
                    }
                    f.t0 = c;
                    f.next = 9;
                    return b("regeneratorRuntime").awrap(this.$13());
                case 9:
                    c = f.t0 += f.sent;
                    if (!(c.length < a.length)) {
                        f.next = 12;
                        break
                    }
                    return f.abrupt("continue", 5);
                case 12:
                    e = c.substring(d).indexOf(a);
                    if (!(e !== -1)) {
                        f.next = 20;
                        break
                    }
                    e += d;
                    this.$6 = c.substring(e + a.length);
                    this.$12();
                    return f.abrupt("return", c.substring(0, e));
                case 20:
                    d = c.length - a.length + 1;
                case 21:
                    f.next = 5;
                    break;
                case 23:
                    this.$6 = c;
                    this.$12();
                    throw new Error("Breakpoint not found");
                case 26:
                case "end":
                    return f.stop()
            }
        }, null, this)
    };
    a.prototype.readUntilOneOfStringOrEnd_DO_NOT_USE = function(a) {
        "use strict";
        __p && __p();
        var c, d, e, f;
        return b("regeneratorRuntime").async(function(g) {
            __p && __p();
            while (1) switch (g.prev = g.next) {
                case 0:
                    this.$11(), c = "";
                case 2:
                    if (this.isDone()) {
                        g.next = 20;
                        break
                    }
                    g.t0 = c;
                    g.next = 6;
                    return b("regeneratorRuntime").awrap(this.$13());
                case 6:
                    c = g.t0 += g.sent, d = 0;
                case 8:
                    if (!(d < a.length)) {
                        g.next = 18;
                        break
                    }
                    e = a[d];
                    f = c.indexOf(e);
                    if (!(f !== -1)) {
                        g.next = 15;
                        break
                    }
                    this.$6 = c.substring(f + e.length);
                    this.$12();
                    return g.abrupt("return", c.substring(0, f));
                case 15:
                    d++;
                    g.next = 8;
                    break;
                case 18:
                    g.next = 2;
                    break;
                case 20:
                    this.$12();
                    return g.abrupt("return", c);
                case 22:
                case "end":
                    return g.stop()
            }
        }, null, this)
    };
    a.prototype.waitUntilDone = function() {
        "use strict";
        return b("regeneratorRuntime").async(function(a) {
            while (1) switch (a.prev = a.next) {
                case 0:
                    return a.abrupt("return", this.$7);
                case 1:
                case "end":
                    return a.stop()
            }
        }, null, this)
    };
    e.exports = a
}), null);
__d("FetchStreamTransport", ["regeneratorRuntime", "ArbiterMixin", "FBLogger", "FetchStreamConfig", "StreamBlockReader", "TimeSlice", "URI", "mixin", "nullthrows"], (function $module_FetchStreamTransport(global, require, requireDynamic, requireLazy, module, exports) {
    __p && __p();
    var _mixin, _superProto, instance_count = 0;
    _mixin = babelHelpers.inherits(FetchStreamTransport, require("mixin")(require("ArbiterMixin")));
    _superProto = _mixin && _mixin.prototype;

    function FetchStreamTransport(uri) {
        "use strict";
        __p && __p();
        if (!self.ReadableStream || !self.fetch || !Request || !TextDecoder) throw new Error("fetch stream transport is not supported here");
        _superProto.constructor.call(this);
        this.$FetchStreamTransport6 = null;
        this.$FetchStreamTransport1 = uri;
        this.$FetchStreamTransport3 = !1;
        this.$FetchStreamTransport4 = !1;
        this.$FetchStreamTransport5 = !1;
        this.$FetchStreamTransport2 = ++instance_count;
        return this
    }
    FetchStreamTransport.prototype.hasFinished = function() {
        "use strict";
        return this.$FetchStreamTransport5
    };
    FetchStreamTransport.prototype.getRequestURI = function() {
        "use strict";
        return new(require("URI"))(this.$FetchStreamTransport1).addQueryData({
            __a: 1,
            __adt: this.$FetchStreamTransport2,
            __req: "fetchstream_" + this.$FetchStreamTransport2,
            ajaxpipe_fetch_stream: 1
        })
    };
    FetchStreamTransport.prototype.send = function() {
        "use strict";
        if (this.$FetchStreamTransport3) throw new Error("FetchStreamTransport instances cannot be re-used.");
        this.$FetchStreamTransport3 = !0;
        var req = new Request(this.getRequestURI().toString(), {
            mode: "same-origin",
            credentials: "include"
        });
        this.$FetchStreamTransport6 = require("TimeSlice").getGuardedContinuation("FetchStreamTransport: waiting on first response");
        var fetchPromise = self.fetch(req, {
            redirect: "follow"
        });
        this.$FetchStreamTransport7(fetchPromise)
    };
    FetchStreamTransport.prototype.$FetchStreamTransport7 = function _callee(fetchPromise) {
        __p && __p();
        var _this = this,
            response, reader, first, _loop, _ret;
        return require("regeneratorRuntime").async(function _callee$(_context2) {
            __p && __p();
            while (1) switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return require("regeneratorRuntime").awrap(fetchPromise);
                case 3:
                    response = _context2.sent;
                    _context2.next = 9;
                    break;
                case 6:
                    _context2.prev = 6, _context2.t0 = _context2["catch"](0), this.abort();
                case 9:
                    if (!(!response || !response.body || !response.ok)) {
                        _context2.next = 12;
                        break
                    }
                    this.abort();
                    return _context2.abrupt("return");
                case 12:
                    reader = new(require("StreamBlockReader"))(response.body), first = !0, _loop = function _loop() {
                        __p && __p();
                        var nextData;
                        return require("regeneratorRuntime").async(function _loop$(_context) {
                            __p && __p();
                            while (1) switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return require("regeneratorRuntime").awrap(reader.readUntilStringOrEnd(require("FetchStreamConfig").delim));
                                case 2:
                                    nextData = _context.sent;
                                    if (!_this.$FetchStreamTransport4) {
                                        _context.next = 5;
                                        break
                                    }
                                    return _context.abrupt("return", "break");
                                case 5:
                                    require("nullthrows")(_this.$FetchStreamTransport6)(function() {
                                        __p && __p();
                                        if (first && nextData.startsWith("<")) {
                                            require("FBLogger")("FetchStreamTransport").mustfix("Endpoint: %s is sending a raw HTML response instead of properly formatted payload", this.$FetchStreamTransport1.toString());
                                            var node = document.createElement("div");
                                            node.innerHTML = nextData;
                                            var scripts = node.getElementsByTagName("script");
                                            for (var i = 0; i < scripts.length; i++) eval(scripts[i].innerHTML);
                                            this.$FetchStreamTransport5 = !0;
                                            return
                                        }
                                        first = !1;
                                        var parsedResponse = JSON.parse(nextData);
                                        reader.isDone() || parsedResponse.finished ? this.$FetchStreamTransport5 = !0 : this.$FetchStreamTransport6 = require("TimeSlice").getGuardedContinuation("FetchStreamTransport: waiting on next response");
                                        this.inform("response", parsedResponse.content)
                                    }.bind(_this));
                                case 6:
                                case "end":
                                    return _context.stop()
                            }
                        }, null, this)
                    };
                case 15:
                    if (!(!this.$FetchStreamTransport5 && !this.$FetchStreamTransport4)) {
                        _context2.next = 23;
                        break
                    }
                    _context2.next = 18;
                    return require("regeneratorRuntime").awrap(_loop());
                case 18:
                    _ret = _context2.sent;
                    if (!(_ret === "break")) {
                        _context2.next = 21;
                        break
                    }
                    return _context2.abrupt("break", 23);
                case 21:
                    _context2.next = 15;
                    break;
                case 23:
                case "end":
                    return _context2.stop()
            }
        }, null, this, [
            [0, 6]
        ])
    };
    FetchStreamTransport.prototype.abort = function() {
        "use strict";
        __p && __p();
        if (this.$FetchStreamTransport4 || this.$FetchStreamTransport5) return;
        this.$FetchStreamTransport4 = !0;
        this.$FetchStreamTransport5 = !0;
        if (this.$FetchStreamTransport6) {
            var continuation = this.$FetchStreamTransport6;
            continuation(function() {
                this.inform("abort")
            }.bind(this))
        } else this.inform("abort")
    };
    module.exports = FetchStreamTransport
}), null);
__d("HTTPErrors", ["emptyFunction"], (function(a, b, c, d, e, f) {
    a = {
        get: b("emptyFunction"),
        getAll: b("emptyFunction")
    };
    e.exports = a
}), null);
__d("JSONPTransport", ["ArbiterMixin", "DOM", "HTML", "TimeSlice", "URI", "mixin"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g, h = {},
        i = 2,
        j = "jsonp",
        k = "iframe";

    function l(a) {
        delete h[a]
    }
    d = babelHelpers.inherits(c, b("mixin")(b("ArbiterMixin")));
    g = d && d.prototype;

    function c(a, b) {
        "use strict";
        g.constructor.call(this), this._type = a, this._uri = b, this._hasResponse = !1, h[this.getID()] = this
    }
    c.prototype.getID = function() {
        "use strict";
        return this._id || (this._id = i++)
    };
    c.prototype.hasFinished = function() {
        "use strict";
        return !(this.getID() in h)
    };
    c.prototype.getRequestURI = function() {
        "use strict";
        return new(b("URI"))(this._uri).addQueryData({
            __a: 1,
            __adt: this.getID(),
            __req: "jsonp_" + this.getID()
        })
    };
    c.prototype.getTransportFrame = function() {
        "use strict";
        if (this._iframe) return this._iframe;
        var a = "transport_frame_" + this.getID();
        a = b("HTML")('<iframe class="hidden_elem" name="' + a + '" src="javascript:void(0)" />');
        return this._iframe = b("DOM").appendContent(document.body, a)[0]
    };
    c.prototype.send = function() {
        "use strict";
        this._type === j ? setTimeout(function() {
            b("DOM").appendContent(document.body, b("DOM").create("script", {
                src: this.getRequestURI().toString(),
                type: "text/javascript"
            }))
        }.bind(this), 0) : (this.getTransportFrame().onload = this._checkForErrors.bind(this), this.getTransportFrame().src = this.getRequestURI().toString()), this._continuation = b("TimeSlice").getGuardedContinuation("JSONPTransport: waiting for first response")
    };
    c.prototype.createContinuationForFileForm_DO_NOT_USE = function() {
        "use strict";
        this._continuation = b("TimeSlice").getGuardedContinuation("JSONPTransport: waiting for first response")
    };
    c.prototype.handleResponse = function(a) {
        "use strict";
        this._continuation(function() {
            this.inform("response", a), this.hasFinished() ? setTimeout(this._cleanup.bind(this), 0) : this._continuation = b("TimeSlice").getGuardedContinuation("JSONPTransport: waiting for next response")
        }.bind(this))
    };
    c.prototype.abort = function() {
        "use strict";
        if (this._aborted) return;
        this._aborted = !0;
        this._cleanup();
        l(this.getID());
        this.inform("abort");
        this._continuation && b("TimeSlice").cancel(this._continuation)
    };
    c.prototype._checkForErrors = function() {
        "use strict";
        this._hasResponse || this.abort()
    };
    c.prototype._cleanup = function() {
        "use strict";
        this._iframe && (b("DOM").remove(this._iframe), this._iframe = null)
    };
    c.respond = function(b, c, d) {
        "use strict";
        var e = h[b];
        if (e) e._hasResponse = !0, d || l(b), e._type == k && (typeof c === "string" ? c = JSON.parse(c) : c = JSON.parse(JSON.stringify(c))), e.handleResponse(c);
        else {
            e = a.ErrorSignal;
            e && !d && e.logJSError("ajax", {
                error: "UnexpectedJsonResponse",
                extra: {
                    id: b,
                    uri: c.payload && c.payload.uri || ""
                }
            })
        }
    };
    c.respond = b("TimeSlice").guard(c.respond, "JSONPTransport.respond", {
        root: !0
    });
    e.exports = c
}), null);
__d("bind", [], (function(a, b, c, d, e, f) {
    __p && __p();

    function a(a, b) {
        __p && __p();
        var c = Array.prototype.slice.call(arguments, 2);
        if (typeof b !== "string") return Function.prototype.bind.apply(b, [a].concat(c));

        function d() {
            var d = c.concat(Array.prototype.slice.call(arguments));
            if (a[b]) return a[b].apply(a, d)
        }
        d.toString = function() {
            return "bound lazily: " + a[b]
        };
        return d
    }
    e.exports = a
}), null);
__d("errorCode", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        throw new Error('errorCode("' + a + '"): This should not happen. Oh noes!')
    }
    e.exports = a
}), null);
__d("executeAfter", [], (function(a, b, c, d, e, f) {
    function a(a, b, c) {
        return function() {
            a.apply(c || this, arguments), b.apply(c || this, arguments)
        }
    }
    e.exports = a
}), null);
__d("AsyncRequest", ["errorCode", "fbt", "invariant", "ix", "Promise", "Arbiter", "ArtilleryAsyncRequestTracingAnnotator", "AsyncDOM", "AsyncRequestConfig", "AsyncResponse", "Bootloader", "CSS", "Deferred", "DTSG", "DTSG_ASYNC", "Env", "ErrorUtils", "Event", "FBLogger", "FetchStreamTransport", "HTTPErrors", "JSCC", "Parent", "PHPQuerySerializer", "ProfilingCounters", "ResourceTimingsStore", "ResourceTypes", "ServerJS", "SessionName", "TimeSlice", "URI", "UserAgent_DEPRECATED", "ZeroRewrites", "bind", "bx", "clearTimeout", "emptyFunction", "evalGlobal", "executeAfter", "ge", "getAsyncHeaders", "getAsyncParams", "gkx", "goURI", "ifRequired", "isBonfireURI", "isEmpty", "isFacebookURI", "isMessengerDotComURI", "isWorkplaceDotComURI", "killswitch", "promiseDone", "qex", "replaceTransportMarkers", "setTimeout", "setTimeoutAcrossTransitions"], (function $module_AsyncRequest(global, require, requireDynamic, requireLazy, module, exports, errorCode, fbt, invariant, ix) {
    "use strict";
    __p && __p();
    var nineteenSecInMs = 19e3;

    function hasUnloaded() {
        try {
            return !window.domready
        } catch (_unused) {
            return !0
        }
    }

    function supportsUploadProgress(transport) {
        return "upload" in transport && "onprogress" in transport.upload
    }

    function supportsCrossOrigin(transport) {
        return "withCredentials" in transport
    }

    function isNetworkError(transport) {
        return transport.status in {
            0: 1,
            12029: 1,
            12030: 1,
            12031: 1,
            12152: 1
        }
    }

    function validateResponseHandler(handler) {
        var valid = !handler || typeof handler === "function";
        valid || require("FBLogger")("asyncresponse").mustfix("AsyncRequest response handlers must be functions. Pass a function, or use bind() to build one.");
        return valid
    }
    var last_id = 2,
        id_threshold = last_id;
    require("Arbiter").subscribe("page_transition", function(_, message) {
        id_threshold = message.id
    });

    function AsyncRequest(uri) {
        __p && __p();
        this._allowIrrelevantRequests = !1, this._delayPreDisplayJS = !1, this._shouldReplaceTransportMarkers = require("gkx")("678674"), this._dispatchErrorResponse = function(asyncResponse, errorHandler) {
            __p && __p();
            var error = asyncResponse.getError();
            this.clearStatusIndicator();
            if (!this._isRelevant() || error === 1010) {
                this.abort();
                return
            }
            if (this._isServerDialogErrorCode(error)) {
                var is_confirmation = error == 1357008 || error == 1357007;
                this.interceptHandler(asyncResponse);
                error == 1357041 ? this._solveQuicksandChallenge(asyncResponse) : error == 1357007 ? this._displayServerDialog(asyncResponse, is_confirmation, !0) : this._displayServerDialog(asyncResponse, is_confirmation)
            } else if (this.initialHandler(asyncResponse) !== !1) {
                require("clearTimeout")(this.timer);
                try {
                    errorHandler(asyncResponse)
                } catch (e) {
                    this.finallyHandler(asyncResponse);
                    throw e
                }
                this.finallyHandler(asyncResponse)
            }
        }.bind(this), this._onStateChange = function() {
            __p && __p();
            var transport = this.transport;
            if (!transport) return;
            try {
                AsyncRequest._inflightCount--;
                require("ResourceTimingsStore").measureResponseReceived(require("ResourceTypes").XHR, this.resourceTimingStoreUID);
                try {
                    typeof transport.getResponseHeader !== "undefined" && transport.getResponseHeader("X-FB-Debug") && (this._xFbServer = transport.getResponseHeader("X-FB-Debug"))
                } catch (_unused2) {}
                if (transport.status >= 200 && transport.status < 300) AsyncRequest.lastSuccessTime = Date.now(), this._handleXHRResponse(transport);
                else if (require("UserAgent_DEPRECATED").webkit() && typeof transport.status === "undefined") this._invokeErrorHandler(1002);
                else if (require("AsyncRequestConfig").retryOnNetworkError && isNetworkError(transport) && this.remainingRetries > 0 && !this._requestTimeout) {
                    this.remainingRetries--;
                    delete this.transport;
                    this.send(!0);
                    return
                } else this._invokeErrorHandler();
                this.getOption("asynchronous_DEPRECATED") !== !1 && delete this.transport
            } catch (exception) {
                if (hasUnloaded()) return;
                delete this.transport;
                this.remainingRetries > 0 ? (this.remainingRetries--, this.send(!0)) : (this.getOption("suppressErrorAlerts") || require("FBLogger")("AsyncRequest").catching(exception).mustfix("AsyncRequest exception when attempting to handle a state change"), this._invokeErrorHandler(1007))
            }
        }.bind(this), this.continuation = require("TimeSlice").getPlaceholderReusableContinuation(), this.transport = null, this.method = "POST", this.uri = "", this.timeout = null, this.timer = null, this.initialHandler = require("emptyFunction"), this.handler = null, this.uploadProgressHandler = null, this.errorHandler = require("AsyncResponse").defaultErrorHandler, this.transportErrorHandler = null, this.timeoutHandler = null, this.interceptHandler = require("emptyFunction"), this.finallyHandler = require("emptyFunction"), this.abortHandler = require("emptyFunction"), this.serverDialogCancelHandler = null, this.relativeTo = null, this.statusElement = null, this.statusClass = "", this.data = {}, this.headers = {}, this.file = null, this.context = {}, this.readOnly = !1, this.writeRequiredParams = [], this.remainingRetries = 0, this.userActionID = "-", this.logErrorsEnabled = require("AsyncRequestConfig").logAsyncRequest, this.allowInteractionServerTracing = !0, this.resourceTimingStoreUID = require("ResourceTimingsStore").getUID(require("ResourceTypes").XHR, uri != null ? uri.toString() : ""), this._warningList = [500, 1010, 1004], this.option = {
            asynchronous_DEPRECATED: !0,
            suppressErrorHandlerWarning: !1,
            suppressEvaluation: !1,
            suppressErrorAlerts: !1,
            retries: 0,
            jsonp: !1,
            bundle: !1,
            useIframeTransport: !1,
            handleErrorAfterUnload: !1,
            useFetchWithIframeFallback: !1
        }, this.transportErrorHandler = require("bind")(this, "errorHandler"), uri !== void 0 && this.setURI(uri), this.setAllowCrossPageTransition(require("AsyncRequestConfig").asyncRequestsSurviveTransitionsDefault || !1)
    }
    AsyncRequest.prototype._dispatchResponse = function(asyncResponse) {
        __p && __p();
        this.clearStatusIndicator();
        if (!this._isRelevant()) {
            this._invokeErrorHandler(1010);
            return
        }
        if (this.initialHandler(asyncResponse) === !1) return;
        require("clearTimeout")(this.timer);
        if (asyncResponse.jscc_map) {
            var jsccMap = require("JSCC").parse(asyncResponse.jscc_map);
            require("JSCC").init(jsccMap)
        }
        var suppress_js, handler = this.getHandler();
        if (handler) try {
            suppress_js = this._shouldSuppressJS(handler(asyncResponse))
        } catch (e) {
            asyncResponse.is_last && this.finallyHandler(asyncResponse);
            throw e
        }
        suppress_js || this._handleJSResponse(asyncResponse);
        asyncResponse.is_last && this.finallyHandler(asyncResponse)
    };
    AsyncRequest.prototype._shouldSuppressJS = function(handler_return_value) {
        return handler_return_value === AsyncRequest.suppressOnloadToken
    };
    AsyncRequest.prototype._handlePreDisplayServerJS = function(serverJS, preDisplayJSMods) {
        __p && __p();
        var _displayStarted = !1,
            preDisplayPromises = [],
            registerToBlockDisplayUntilDone_DONOTUSE = function registerToBlockDisplayUntilDone_DONOTUSE() {
                if (_displayStarted) {
                    require("FBLogger")("AsyncResponse").warn("registerToBlockDisplayUntilDone_DONOTUSE called after AsyncResponse display started. This is a no-op.");
                    return function() {}
                }
                var timeoutId, deferrable = new(require("Deferred"))();
                preDisplayPromises.push(deferrable.getPromise());
                return require("TimeSlice").guard(function() {
                    timeoutId && require("clearTimeout")(timeoutId), deferrable.resolve()
                }, "AsyncRequestDisplayBlockingEvent", {
                    propagationType: require("TimeSlice").PropagationType.EXECUTION
                })
            };
        serverJS.handle(preDisplayJSMods, {
            bigPipeContext: {
                registerToBlockDisplayUntilDone_DONOTUSE: registerToBlockDisplayUntilDone_DONOTUSE
            }
        });
        _displayStarted = !0;
        return preDisplayPromises
    };
    AsyncRequest.prototype._hasEvalDomOp = function(domOps) {
        return domOps && domOps.length ? domOps.some(function(op) {
            return op[0] === "eval"
        }) : !1
    };
    AsyncRequest.prototype._handleJSResponse = function(asyncResponse) {
        __p && __p();
        var relativeTo = this.getRelativeTo(),
            domOps = asyncResponse.domops,
            dtsgToken = asyncResponse.dtsgToken,
            dtsgAsyncGetToken = asyncResponse.dtsgAsyncGetToken,
            jsMods = asyncResponse.jsmods,
            serverJS, savedServerJSInstance = asyncResponse.savedServerJSInstance;
        savedServerJSInstance && savedServerJSInstance instanceof require("ServerJS") ? serverJS = savedServerJSInstance : serverJS = new(require("ServerJS"))();
        serverJS.setRelativeTo(relativeTo);
        if (jsMods) {
            var preDisplayJSMods = {};
            preDisplayJSMods.define = jsMods.define;
            preDisplayJSMods.instances = jsMods.instances;
            preDisplayJSMods.markup = jsMods.markup;
            delete jsMods.define;
            delete jsMods.instances;
            delete jsMods.markup;
            this._hasEvalDomOp(domOps) && (preDisplayJSMods.elements = jsMods.elements, delete jsMods.elements);
            serverJS.handle(preDisplayJSMods)
        }
        dtsgToken && require("DTSG").setToken(dtsgToken);
        dtsgAsyncGetToken && require("DTSG_ASYNC").setToken(dtsgAsyncGetToken);
        domOps && require("AsyncDOM").invoke(domOps, relativeTo);
        jsMods && serverJS.handle(jsMods);
        this._handleJSRegisters(asyncResponse, "onload");
        this._handleJSRegisters(asyncResponse, "onafterload")
    };
    AsyncRequest.prototype._handleJSRegisters = function(asyncResponse, phase) {
        var registers = asyncResponse[phase];
        if (registers)
            for (var ii = 0; ii < registers.length; ii++) require("ErrorUtils").applyWithGuard(new Function(registers[ii]), this)
    };
    AsyncRequest.prototype.invokeResponseHandler = function(interpreted) {
        __p && __p();
        if (typeof interpreted.redirect !== "undefined") {
            require("setTimeout")(function() {
                this.setURI(interpreted.redirect).send()
            }.bind(this), 0);
            return
        }
        if (interpreted.bootloadOnly !== void 0) {
            var toBootload = typeof interpreted.bootloadOnly === "string" ? JSON.parse(interpreted.bootloadOnly) : interpreted.bootloadOnly,
                _loop = function _loop() {
                    __p && __p();
                    if (_isArray) {
                        if (_i >= _iterator.length) return "break";
                        _ref = _iterator[_i++]
                    } else {
                        _i = _iterator.next();
                        if (_i.done) return "break";
                        _ref = _i.value
                    }
                    var rsrcs = _ref;
                    require("TimeSlice").guard(function() {
                        require("Bootloader").loadPredictedResourceMap(rsrcs)
                    }, "Bootloader.loadPredictedResourceMap", {
                        root: !0
                    })()
                };
            for (var _iterator = toBootload, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var _ref, _ret = _loop();
                if (_ret === "break") break
            }
            return
        }
        if (!this.handler && !this.errorHandler && !this.transportErrorHandler && !this.preBootloadHandler && this.initialHandler === require("emptyFunction") && this.finallyHandler === require("emptyFunction")) return;
        var response = interpreted.asyncResponse;
        if (typeof response !== "undefined") {
            this._artilleryHandle != null && this._artilleryHandle(response);
            if (!this._isRelevant()) {
                this._invokeErrorHandler(1010);
                return
            }
            response.inlinejs && require("evalGlobal")(response.inlinejs);
            response.lid && (this._responseTime = Date.now(), global.CavalryLogger && (this.cavalry = global.CavalryLogger.getInstance(response.lid)), this.lid = response.lid);
            ix.add(response.ixData);
            require("bx").add(response.bxData);
            require("gkx").add(response.gkxData);
            require("qex").add(response.qexData);
            response.resource_map && require("Bootloader").setResourceMap(response.resource_map);
            response.bootloadable && require("Bootloader").enableBootload(response.bootloadable);
            var dispatch, arbiter_event;
            if (response.getError() && !response.getErrorIsWarning()) {
                var handler = this.getErrorHandler().bind(this);
                dispatch = require("ErrorUtils").guard(this._dispatchErrorResponse, "AsyncRequest#_dispatchErrorResponse for " + this.getURI());
                dispatch = dispatch.bind(this, response, handler);
                this._logError(response);
                arbiter_event = "error"
            } else {
                dispatch = require("ErrorUtils").guard(this._dispatchResponse.bind(this), "AsyncRequest#_dispatchResponse for " + this.getURI());
                dispatch = dispatch.bind(this, response);
                arbiter_event = "response";
                var domOps = response.domops;
                if (!this._delayPreDisplayJS && response.jsmods && response.jsmods.pre_display_requires && !this._hasEvalDomOp(domOps) && !require("killswitch")("ASYNC_REQUEST_EARLY_RENDERING_OF_PREDISPLAY_PRIORITY_JS")) {
                    var jsMods = response.jsmods,
                        preDisplayJSMods = {};
                    preDisplayJSMods.define = jsMods.define;
                    preDisplayJSMods.instances = jsMods.instances;
                    preDisplayJSMods.markup = jsMods.markup;
                    delete jsMods.define;
                    delete jsMods.instances;
                    delete jsMods.markup;
                    preDisplayJSMods.pre_display_requires = jsMods.pre_display_requires;
                    delete jsMods.pre_display_requires;
                    var serverJS = new(require("ServerJS"))();
                    serverJS.setRelativeTo(this.getRelativeTo());
                    response.savedServerJSInstance = serverJS;
                    var preDisplayPromises = this._handlePreDisplayServerJS(serverJS, preDisplayJSMods);
                    if (preDisplayPromises && preDisplayPromises.length) {
                        var realDispatch = dispatch;
                        dispatch = function dispatch() {
                            require("promiseDone")(require("Promise").all(preDisplayPromises).then(realDispatch))
                        }
                    }
                }
            }
            dispatch = require("executeAfter")(dispatch, function() {
                require("Arbiter").inform("AsyncRequest/" + arbiter_event, {
                    request: this,
                    response: response
                })
            }.bind(this));
            this.preBootloadHandler && this.preBootloadHandler(response);
            response.css = response.css || [];
            response.js = response.js || [];
            require("Bootloader").loadResources(response.css.concat(response.js), require("AsyncRequestConfig").immediateDispatch ? dispatch : function() {
                require("setTimeout")(dispatch, 0)
            }, this.getURI())
        } else typeof interpreted.transportError !== "undefined" ? this._xFbServer ? this._invokeErrorHandler(1008) : this._invokeErrorHandler(1012) : this._invokeErrorHandler(1007)
    };
    AsyncRequest.prototype._logError = function(response) {
        __p && __p();
        if (this.logErrorsEnabled && !this.getOption("suppressErrorAlerts")) {
            var message;
            try {
                message = JSON.stringify(response)
            } catch (_unused3) {
                try {
                    message = JSON.stringify({
                        error: response.error,
                        errorSummary: response.errorSummary,
                        errorDescription: response.errorDescription
                    })
                } catch (ex) {
                    require("FBLogger")("AsyncRequest").catching(ex).mustfix("Failed to stringify message");
                    return
                }
            }
            require("FBLogger")("asyncresponse").mustfix("Async error response %s", message)
        }
    };
    AsyncRequest.prototype._invokeErrorHandler = function(explicitError) {
        __p && __p();
        var transport = this.transport;
        if (!transport) return;
        var error;
        if (this.responseText === "") error = 1002;
        else if (this._requestAborted) error = 1011;
        else {
            try {
                error = explicitError || transport.status || 1004
            } catch (_unused4) {
                error = 1005
            }!1 === navigator.onLine && (error = 1006)
        }
        var desc, summary, silent = !0;
        if (error === 1006) summary = fbt._("No Network Connection"), desc = fbt._("Your browser appears to be offline. Please check your internet connection and try again.");
        else if (error >= 300 && error <= 399) {
            summary = fbt._("Redirection");
            desc = fbt._("Your access to Facebook was redirected or blocked by a third party at this time, please contact your ISP or reload.");
            var location = transport.getResponseHeader("Location");
            location && require("goURI")(location, !0);
            silent = !0
        } else summary = fbt._("Oops"), desc = fbt._("Something went wrong. We're working on getting this fixed as soon as we can. You may be able to try again.");
        var async_response = new(require("AsyncResponse"))(this, transport);
        Object.assign(async_response, {
            error: error,
            errorSummary: summary,
            errorDescription: desc,
            silentError: silent
        });
        this._logError(async_response);
        require("setTimeout")(function() {
            require("Arbiter").inform("AsyncRequest/error", {
                request: this,
                response: async_response
            })
        }.bind(this), 0);
        if (hasUnloaded() && !this.getOption("handleErrorAfterUnload")) return;
        if (!this.transportErrorHandler) {
            require("FBLogger")("asyncresponse").mustfix("Async request to %s failed with a %d error, but there was no error handler available to deal with it.", this.getURI(), error);
            return
        }
        var error_handler = this.getTransportErrorHandler().bind(this);
        !(this.getOption("suppressErrorAlerts") || this._warningList.indexOf(error) > -1) ? require("FBLogger")("asyncresponse").mustfix("Async request failed with error %s: %s when requesting %s", error, desc.toString(), this.getURI()): this._warningList.indexOf(error) > -1 && require("FBLogger")("asyncresponse").warn("Async request failed with error %s: %s when requesting %s", error, desc.toString(), this.getURI());
        require("ErrorUtils").applyWithGuard(this._dispatchErrorResponse, this, [async_response, error_handler])
    };
    AsyncRequest.prototype._isServerDialogErrorCode = function(error) {
        return error == 1357008 || error == 1357007 || error == 1357041 || error == 1442002 || error == 1357001
    };
    AsyncRequest.prototype._solveQuicksandChallenge = function(async_response) {
        var payload = async_response.getPayload();
        require("Bootloader").loadModules(["QuickSandSolver"], function(QuickSandSolver) {
            QuickSandSolver.solveAndSendRequestBack(this, payload)
        }.bind(this), "AsyncRequest")
    };
    AsyncRequest.prototype._displayServerDialog = function(async_response, is_confirmation, allow_get) {
        __p && __p();
        allow_get === void 0 && (allow_get = !1);
        var payload = async_response.getPayload();
        if (payload.__dialog !== void 0) {
            this._displayServerLegacyDialog(async_response, is_confirmation);
            return
        }
        var json = payload.__dialogx;
        new(require("ServerJS"))().handle(json);
        require("Bootloader").loadModules(["ConfirmationDialog"], function(ConfirmationDialog) {
            ConfirmationDialog.setupConfirmation(async_response, this, allow_get)
        }.bind(this), "AsyncRequest")
    };
    AsyncRequest.prototype._displayServerLegacyDialog = function(async_response, is_confirmation) {
        __p && __p();
        var model = async_response.getPayload().__dialog;
        require("Bootloader").loadModules(["Dialog"], function(Dialog) {
            var dialog = new Dialog(model);
            is_confirmation && dialog.setHandler(this._displayConfirmationHandler.bind(this, dialog));
            dialog.setCancelHandler(function() {
                var handler = this.getServerDialogCancelHandler();
                try {
                    handler && handler(async_response)
                } catch (e) {
                    throw e
                } finally {
                    this.finallyHandler(async_response)
                }
            }.bind(this)).setCausalElement(this.relativeTo).show()
        }.bind(this), "AsyncRequest")
    };
    AsyncRequest.prototype._displayConfirmationHandler = function(dialog) {
        this.data.confirmed = 1, Object.assign(this.data, dialog.getFormData()), this.send()
    };
    AsyncRequest.prototype.setJSONPTransport = function(transport) {
        transport.subscribe("response", this._handleJSONPResponse.bind(this)), transport.subscribe("abort", this._handleJSONPAbort.bind(this)), this.transport = transport
    };
    AsyncRequest.prototype._handleJSONPResponse = function(_, data) {
        var transport = this.transport;
        if (!transport) return;
        data.bootloadOnly || (this.is_first = this.is_first === void 0);
        var interpreted = this._interpretResponse(data);
        interpreted.asyncResponse && (interpreted.asyncResponse.is_first = this.is_first, interpreted.asyncResponse.is_last = transport.hasFinished());
        this.invokeResponseHandler(interpreted);
        transport.hasFinished() && delete this.transport
    };
    AsyncRequest.prototype._handleJSONPAbort = function() {
        this._invokeErrorHandler(), delete this.transport
    };
    AsyncRequest.prototype._handleXHRResponse = function(transport) {
        __p && __p();
        var interpreted;
        if (this.getOption("suppressEvaluation")) interpreted = {
            asyncResponse: new(require("AsyncResponse"))(this, transport)
        };
        else {
            var text = transport.responseText;
            try {
                var safe_text = this._unshieldResponseText(text),
                    _response = eval("(" + safe_text + ")");
                interpreted = this._interpretResponse(_response)
            } catch (error) {
                interpreted = error.message, require("FBLogger")("async_request").catching(error).warn("Faild to handle repsonse")
            }
        }
        this.invokeResponseHandler(interpreted)
    };
    AsyncRequest.prototype._unshieldResponseText = function(text) {
        var shield = "for (;;);",
            shieldlen = shield.length;
        if (text.length <= shieldlen) throw new Error("Response too short on async to " + this.getURI());
        var offset = 0;
        while (text.charAt(offset) == " " || text.charAt(offset) == "\n") offset++;
        offset && text.substring(offset, offset + shieldlen) == shield;
        return text.substring(offset + shieldlen)
    };
    AsyncRequest.prototype._interpretResponse = function(response) {
        __p && __p();
        if (response.redirect) return {
            redirect: response.redirect
        };
        if (response.bootloadOnly) return {
            bootloadOnly: response.bootloadOnly
        };
        var isServerDialog = response.error && this._isServerDialogErrorCode(response.error);
        this._shouldReplaceTransportMarkers && response.payload && !isServerDialog && require("replaceTransportMarkers")({
            relativeTo: this.getRelativeTo(),
            bigPipeContext: null
        }, response.payload);
        var r = new(require("AsyncResponse"))(this);
        if (response.__ar != 1) require("FBLogger")("AsyncRequest").warn("AsyncRequest to endpoint %s returned a JSON response, but it is not properly formatted. The endpoint needs to provide a response using the AsyncResponse class in PHP.", this.getURI()), r.payload = response;
        else {
            Object.assign(r, response);
            var transport = this.transport;
            transport && transport.getAllResponseHeaders !== void 0 && (r.responseHeaders = transport.getAllResponseHeaders())
        }
        return {
            asyncResponse: r
        }
    };
    AsyncRequest.prototype._isMultiplexable = function() {
        __p && __p();
        if (this.getOption("jsonp") || this.getOption("useIframeTransport") || this.getOption("useFetchWithIframeFallback")) {
            require("FBLogger")("AsyncRequest").mustfix("You cannot bundle AsyncRequest that uses jsonp or iframe transport.");
            return !1
        }
        if (!require("isFacebookURI")(new(require("URI"))(this.uri))) {
            require("FBLogger")("AsyncRequest").mustfix("You can not bundle AsyncRequest sent to non-facebook URIs.  Uri: %s", this.getURI());
            return !1
        }
        if (!this.getOption("asynchronous_DEPRECATED")) {
            require("FBLogger")("AsyncRequest").mustfix("We cannot bundle synchronous AsyncRequests");
            return !1
        }
        return !0
    };
    AsyncRequest.prototype.handleResponse = function(response) {
        var interpreted = this._interpretResponse(response);
        this.invokeResponseHandler(interpreted)
    };
    AsyncRequest.prototype.setMethod = function(m) {
        this.method = m.toString().toUpperCase();
        return this
    };
    AsyncRequest.prototype.getMethod = function() {
        return this.method
    };
    AsyncRequest.prototype.setData = function(obj) {
        this.data = obj;
        return this
    };
    AsyncRequest.prototype.setRequestHeader = function(name, value) {
        this.headers[name] = value;
        return this
    };
    AsyncRequest.prototype.setRawData = function(raw_data) {
        this.rawData = raw_data;
        return this
    };
    AsyncRequest.prototype.getData = function() {
        return this.data
    };
    AsyncRequest.prototype.setContextData = function(key, value, enabled) {
        enabled = enabled === void 0 ? !0 : enabled;
        enabled && (this.context["_log_" + key] = value);
        return this
    };
    AsyncRequest.prototype._setUserActionID = function() {
        this.userActionID = (require("SessionName").getName() || "-") + "/-"
    };
    AsyncRequest.prototype.setURI = function(uri) {
        __p && __p();
        typeof uri === "string" && uri.match(/^\/?u_\d+_\d+/) && require("FBLogger")("asyncrequest").warn("Invalid URI %s", uri);
        var uri_obj = new(require("URI"))(uri);
        if ((this.getOption("useIframeTransport") || this.getOption("useFetchWithIframeFallback")) && !require("isFacebookURI")(uri_obj)) return this;
        if (!this._allowCrossOrigin && !this.getOption("jsonp") && !this.getOption("useIframeTransport") && !this.getOption("useFetchWithIframeFallback") && !uri_obj.isSameOrigin()) return this;
        this._setUserActionID();
        if (!uri || uri_obj.isEmpty()) {
            require("FBLogger")("async_request").mustfix("URI cannot be empty");
            return this
        }
        this.uri = require("ZeroRewrites").rewriteURI(uri_obj);
        return this
    };
    AsyncRequest.prototype.getURI = function() {
        return this.uri.toString()
    };
    AsyncRequest.prototype.delayPreDisplayJS = function(shouldDelayJS) {
        shouldDelayJS === void 0 && (shouldDelayJS = !0);
        this._delayPreDisplayJS = shouldDelayJS;
        return this
    };
    AsyncRequest.prototype.setInitialHandler = function(fn) {
        this.initialHandler = fn;
        return this
    };
    AsyncRequest.prototype.setPayloadHandler = function(fn) {
        this.setHandler(function(response) {
            return fn(response.payload)
        });
        return this
    };
    AsyncRequest.prototype.setHandler = function(fn) {
        validateResponseHandler(fn) && (this.handler = fn);
        return this
    };
    AsyncRequest.prototype.getHandler = function() {
        return this.handler || require("emptyFunction")
    };
    AsyncRequest.prototype.setUploadProgressHandler = function(fn) {
        validateResponseHandler(fn) && (this.uploadProgressHandler = fn);
        return this
    };
    AsyncRequest.prototype.setErrorHandler = function(fn) {
        validateResponseHandler(fn) && (this.errorHandler = fn);
        return this
    };
    AsyncRequest.prototype.setTransportErrorHandler = function(fn) {
        this.transportErrorHandler = fn;
        return this
    };
    AsyncRequest.prototype.getErrorHandler = function() {
        return this.errorHandler || require("emptyFunction")
    };
    AsyncRequest.prototype.getTransportErrorHandler = function() {
        return this.transportErrorHandler || require("emptyFunction")
    };
    AsyncRequest.prototype.setTimeoutHandler = function(timeout, fn) {
        validateResponseHandler(fn) && (this.timeout = timeout, this.timeoutHandler = fn);
        return this
    };
    AsyncRequest.prototype.resetTimeout = function(timeout) {
        if (!(this.timeoutHandler === null))
            if (timeout === null) this.timeout = null, require("clearTimeout")(this.timer), this.timer = null;
            else {
                var clear_on_quickling_event = !this._allowCrossPageTransition;
                this.timeout = timeout;
                require("clearTimeout")(this.timer);
                clear_on_quickling_event ? this.timer = require("setTimeout")(this._handleTimeout.bind(this), this.timeout) : this.timer = require("setTimeoutAcrossTransitions")(this._handleTimeout.bind(this), this.timeout)
            }
        return this
    };
    AsyncRequest.prototype._handleTimeout = function() {
        this.continuation.last(function() {
            this._requestTimeout = !0;
            var func = this.timeoutHandler;
            this.abandon();
            func && func(this);
            this._logError({
                timeout: this
            });
            require("setTimeout")(function() {
                require("Arbiter").inform("AsyncRequest/timeout", {
                    request: this
                })
            }.bind(this), 0)
        }.bind(this))
    };
    AsyncRequest.prototype.disableInteractionServerTracing = function() {
        this.allowInteractionServerTracing = !1;
        return this
    };
    AsyncRequest.prototype.setNewSerial = function() {
        this.id = ++last_id;
        return this
    };
    AsyncRequest.prototype.setInterceptHandler = function(fn) {
        this.interceptHandler = fn;
        return this
    };
    AsyncRequest.prototype.setFinallyHandler = function(fn) {
        this.finallyHandler = fn;
        return this
    };
    AsyncRequest.prototype.setAbortHandler = function(fn) {
        this.abortHandler = fn;
        return this
    };
    AsyncRequest.prototype.getServerDialogCancelHandler = function() {
        return this.serverDialogCancelHandler
    };
    AsyncRequest.prototype.setServerDialogCancelHandler = function(fn) {
        this.serverDialogCancelHandler = fn;
        return this
    };
    AsyncRequest.prototype.setPreBootloadHandler = function(fn) {
        this.preBootloadHandler = fn;
        return this
    };
    AsyncRequest.prototype.setReadOnly = function(readOnly) {
        typeof readOnly !== "boolean" || (this.readOnly = readOnly);
        return this
    };
    AsyncRequest.prototype.getReadOnly = function() {
        return this.readOnly
    };
    AsyncRequest.prototype.setRelativeTo = function(element) {
        this.relativeTo = element;
        return this
    };
    AsyncRequest.prototype.getRelativeTo = function() {
        return this.relativeTo
    };
    AsyncRequest.prototype.setStatusClass = function(c) {
        this.statusClass = c;
        return this
    };
    AsyncRequest.prototype.setStatusElement = function(element) {
        this.statusElement = element;
        return this
    };
    AsyncRequest.prototype.getStatusElement = function() {
        return require("ge")(this.statusElement)
    };
    AsyncRequest.prototype._isRelevant = function() {
        if (this._allowCrossPageTransition) return !0;
        return !this.id ? !0 : this.id > id_threshold
    };
    AsyncRequest.prototype.clearStatusIndicator = function() {
        var statusElem = this.getStatusElement();
        statusElem && (require("CSS").removeClass(statusElem, "async_saving"), require("CSS").removeClass(statusElem, this.statusClass))
    };
    AsyncRequest.prototype.addStatusIndicator = function() {
        var statusElem = this.getStatusElement();
        statusElem && (require("CSS").addClass(statusElem, "async_saving"), require("CSS").addClass(statusElem, this.statusClass))
    };
    AsyncRequest.prototype.specifiesWriteRequiredParams = function() {
        return this.writeRequiredParams.every(function(param) {
            this.data[param] = this.data[param] || require("Env")[param] || (require("ge")(param) || {}).value;
            return this.data[param] !== void 0 ? !0 : !1
        }, this)
    };
    AsyncRequest.prototype.setOption = function(opt, v) {
        typeof this.option[opt] !== "undefined" && (this.option[opt] = v);
        return this
    };
    AsyncRequest.prototype.getOption = function(opt) {
        typeof this.option[opt] === "undefined";
        return this.option[opt]
    };
    AsyncRequest.prototype.abort = function() {
        __p && __p();
        this.continuation.last(function() {
            __p && __p();
            var transport = this.transport;
            if (transport) {
                var old_handler = this.getTransportErrorHandler();
                this.setOption("suppressErrorAlerts", !0);
                this.setTransportErrorHandler(require("emptyFunction"));
                this._requestAborted = !0;
                transport.abort();
                this.setTransportErrorHandler(old_handler)
            }
            this.abortHandler();
            AsyncMultiplex.unschedule(this)
        }.bind(this))
    };
    AsyncRequest.prototype.abandon = function() {
        this.continuation.last(function() {
            require("clearTimeout")(this.timer);
            this.setOption("suppressErrorAlerts", !0).setHandler(require("emptyFunction")).setErrorHandler(require("emptyFunction")).setTransportErrorHandler(require("emptyFunction")).setUploadProgressHandler(require("emptyFunction"));
            var transport = this.transport;
            transport && (this._requestAborted = !0, supportsUploadProgress(transport) && delete transport.upload.onprogress, transport.abort());
            this.abortHandler();
            AsyncMultiplex.unschedule(this)
        }.bind(this))
    };
    AsyncRequest.prototype.setNectarData = function(nctrParams) {
        nctrParams && (this.data.nctr === void 0 && (this.data.nctr = {}), Object.assign(this.data.nctr, nctrParams));
        return this
    };
    AsyncRequest.prototype.setNectarModuleDataSafe = function(elem) {
        var setNectarModuleData = this.setNectarModuleData;
        setNectarModuleData && setNectarModuleData.call(this, elem);
        return this
    };
    AsyncRequest.prototype.setAllowCrossPageTransition = function(allow) {
        this._allowCrossPageTransition = !!allow;
        this.timer && this.resetTimeout(this.timeout);
        return this
    };
    AsyncRequest.prototype.getAllowIrrelevantRequests = function() {
        return this._allowIrrelevantRequests
    };
    AsyncRequest.prototype.setAllowIrrelevantRequests = function(allowIrrelevantRequests) {
        this._allowIrrelevantRequests = allowIrrelevantRequests;
        return this
    };
    AsyncRequest.prototype.setAllowCrossOrigin = function(allow) {
        this._allowCrossOrigin = allow;
        return this
    };
    AsyncRequest.prototype.setAllowCredentials = function(allow) {
        this._allowCredentials = allow;
        return this
    };
    AsyncRequest.prototype.setIsBackgroundRequest = function(isBackgroundRequest) {
        this._isBackgroundRequest = isBackgroundRequest;
        return this
    };
    AsyncRequest.prototype.setReplaceTransportMarkers = function(value) {
        value === void 0 && (value = !0);
        this._shouldReplaceTransportMarkers = value;
        return this
    };
    AsyncRequest.prototype.sendAndReturnAbortHandler = function() {
        this.send();
        return function() {
            return this.abort()
        }.bind(this)
    };
    AsyncRequest.prototype.send = function(isRetry) {
        __p && __p();
        isRetry = isRetry || !1;
        if (!this.uri) return !1;
        this.errorHandler || !this.getOption("suppressErrorHandlerWarning");
        this.getOption("jsonp") && this.method != "GET" && this.setMethod("GET");
        (this.getOption("useIframeTransport") || this.getOption("useFetchWithIframeFallback")) && this.method != "GET" && this.setMethod("GET");
        this.timeoutHandler !== null && (this.getOption("jsonp") || this.getOption("useIframeTransport") || this.getOption("useFetchWithIframeFallback"));
        if (!this.getReadOnly()) {
            this.specifiesWriteRequiredParams();
            if (this.method != "POST") return !1
        }
        if (document.location.search.toString().includes(this.uri.toString())) return !1;
        Object.assign(this.data, require("getAsyncParams")(this.method));
        this.allowInteractionServerTracing && (this._artilleryHandle = require("ArtilleryAsyncRequestTracingAnnotator").registerAsyncRequest(this, this.resourceTimingStoreUID));
        require("isEmpty")(this.context) || (Object.assign(this.data, this.context), this.data.ajax_log = 1);
        require("Env").force_param && Object.assign(this.data, require("Env").force_param);
        this._setUserActionID();
        if (this.getOption("bundle") && this._isMultiplexable()) {
            AsyncMultiplex.schedule(this);
            return !0
        }
        this.setNewSerial();
        this.getOption("asynchronous_DEPRECATED") || this.uri.addQueryData({
            __s: 1
        });
        require("Arbiter").inform("AsyncRequest/send", {
            request: this
        });
        var uri_str, query;
        this.method == "GET" && this.uri.addQueryData({
            fb_dtsg_ag: require("DTSG_ASYNC").getToken()
        });
        this.method == "GET" || this.rawData ? (uri_str = this.uri.addQueryData(this.data).toString(), query = this.rawData || "") : (this._allowCrossOrigin && this.uri.addQueryData({
            __a: 1
        }), uri_str = this.uri.toString(), query = require("PHPQuerySerializer").serialize(this.data));
        if (this.transport) return !1;
        if (this.getOption("useFetchWithIframeFallback")) try {
            var _transport = new(require("FetchStreamTransport"))(this.uri);
            this.setJSONPTransport(_transport);
            this._markRequestSent();
            _transport.send();
            this.setOption("useIframeTransport", !1);
            return !0
        } catch (_unused5) {
            this.setOption("useFetchWithIframeFallback", !1), this.setOption("useIframeTransport", !0)
        }
        if (this.getOption("jsonp") || this.getOption("useIframeTransport")) {
            requireLazy(["JSONPTransport"], function(JSONPTransport) {
                var transport = new JSONPTransport(this.getOption("jsonp") ? "jsonp" : "iframe", this.uri);
                this.setJSONPTransport(transport);
                this._markRequestSent();
                transport.send();
                require("ProfilingCounters").incrementCounter("ASYNC_REQUEST_COUNT", 1)
            }.bind(this));
            return !0
        }
        var transport = require("ZeroRewrites").getTransportBuilderForURI(this.uri)();
        if (!transport) return !1;
        this.schedule("AsyncRequest.send");
        transport.onreadystatechange = function() {
            transport.readyState === 4 && this.continuation.last(this._onStateChange)
        }.bind(this);
        this.uploadProgressHandler && supportsUploadProgress(transport) && (transport.upload.onprogress = function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            this.continuation(function() {
                this.uploadProgressHandler && this.uploadProgressHandler.apply(this, args)
            }.bind(this))
        }.bind(this));
        isRetry || (this.remainingRetries = this.getOption("retries"));
        this.transport = transport;
        try {
            transport.open(this.method, uri_str, this.getOption("asynchronous_DEPRECATED"))
        } catch (exception) {
            return !1
        }
        if (!this.uri.isSameOrigin() && !this.getOption("jsonp") && !this.getOption("useIframeTransport") && !this.getOption("useFetchWithIframeFallback")) {
            if (!supportsCrossOrigin(transport)) return !1;
            this._canSendCredentials() && (transport.withCredentials = !0)
        }
        this.method == "POST" && !this.rawData && transport.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this._isBackgroundRequest && transport.setRequestHeader("X_FB_BACKGROUND_STATE", "1");
        var asyncHeaders = require("getAsyncHeaders")(this.uri);
        Object.keys(asyncHeaders).forEach(function(name) {
            transport && transport.setRequestHeader(name, asyncHeaders[name])
        });
        require("Arbiter").inform("AsyncRequest/will_send", {
            request: this
        });
        if (transport)
            for (var headerName in this.headers) Object.prototype.hasOwnProperty.call(this.headers, headerName) && transport.setRequestHeader(headerName, this.headers[headerName]);
        this.addStatusIndicator();
        this._markRequestSent();
        transport.send(query);
        this.timeout !== null && this.resetTimeout(this.timeout);
        AsyncRequest._inflightCount++;
        require("ProfilingCounters").incrementCounter("ASYNC_REQUEST_COUNT", 1);
        return !0
    };
    AsyncRequest.prototype.schedule = function(name) {
        this.continuation = require("TimeSlice").getReusableContinuation(name)
    };
    AsyncRequest.prototype._canSendCredentials = function() {
        if (this._allowCredentials === !1) return !1;
        var uri = new(require("URI"))(this.uri);
        return require("isFacebookURI")(uri) || require("isMessengerDotComURI")(uri) || require("isWorkplaceDotComURI")(uri) || require("isBonfireURI")(uri)
    };
    AsyncRequest.prototype._markRequestSent = function() {
        var fullURI = new(require("URI"))(this.getURI()).getQualifiedURI().toString();
        require("ResourceTimingsStore").updateURI(require("ResourceTypes").XHR, this.resourceTimingStoreUID, fullURI);
        require("ResourceTimingsStore").annotate(require("ResourceTypes").XHR, this.resourceTimingStoreUID).addStringAnnotation("uri", fullURI);
        require("ifRequired")("TimeSliceAutoclosedInteraction", function(TimeSliceAutoclosedInteraction) {
            return TimeSliceAutoclosedInteraction.getInteractionsActiveRightNow().forEach(function(interaction) {
                return interaction.forResourceRequest(this.resourceTimingStoreUID).addStringAnnotation("requested_in_continuation", "true")
            }.bind(this))
        }.bind(this));
        require("ResourceTimingsStore").measureRequestSent(require("ResourceTypes").XHR, this.resourceTimingStoreUID)
    };
    AsyncRequest.prototype.promisePayload = function(isRetry) {
        return this.exec().then(function(response) {
            return response.payload
        }, function(response) {
            throw response.toError()
        })
    };
    AsyncRequest.prototype.exec = function(isRetry) {
        if (this.getHandler() !== require("emptyFunction") || this.getErrorHandler() !== require("AsyncResponse").defaultErrorHandler) throw new Error("exec is an async function and does not allow previously set handlers");
        return new(require("Promise"))(function(resolve, reject) {
            this.setHandler(resolve).setErrorHandler(reject).send(isRetry)
        }.bind(this))
    };
    AsyncRequest.bootstrap = function(href, elem, is_post) {
        __p && __p();
        var method = "GET",
            readonly = !0,
            data = {};
        (is_post || elem && elem.rel == "async-post") && (method = "POST", readonly = !1, href && (href = new(require("URI"))(href), data = href.getQueryData(), href.setQueryData({})));
        var status_elem = require("Parent").byClass(elem, "stat_elem") || elem;
        if (status_elem && require("CSS").hasClass(status_elem, "async_saving")) return !1;
        var async = new AsyncRequest(href).setReadOnly(readonly).setMethod(method).setData(data).setNectarModuleDataSafe(elem).setRelativeTo(elem);
        elem && (async.setHandler(function(response) {
            require("Event").fire(elem, "success", {
                response: response
            })
        }), async.setErrorHandler(function(response) {
            require("Event").fire(elem, "error", {
                response: response
            }) !== !1 && require("AsyncResponse").defaultErrorHandler(response)
        }));
        if (status_elem instanceof HTMLElement) {
            async.setStatusElement(status_elem);
            var status_class = status_elem.getAttribute("data-status-class");
            status_class && async.setStatusClass(status_class)
        }
        async.send();
        return !1
    };
    AsyncRequest.post = function(href, data) {
        new AsyncRequest(href).setReadOnly(!1).setMethod("POST").setData(data).send();
        return !1
    };
    AsyncRequest.postStatic = function(href, data) {
        AsyncRequest.post(href, data)
    };
    AsyncRequest.getLastID = function() {
        return last_id
    };
    AsyncRequest.getInflightCount = function() {
        return this._inflightCount
    };
    AsyncRequest._inflightCount = 0;
    var _asyncMultiplex, _pendingAsyncMultiplexes = [];

    function AsyncMultiplex() {
        this._requests = []
    }
    AsyncMultiplex.prototype.add = function(request) {
        this._requests.push(request)
    };
    AsyncMultiplex.prototype.remove = function(request) {
        var requests = this._requests,
            requestsSent = this._requestsSent;
        for (var ii = 0, jj = requests.length; ii < jj; ii++) requests[ii] === request && (requestsSent ? requests[ii] = null : requests.splice(ii, 1))
    };
    AsyncMultiplex.prototype.send = function() {
        __p && __p();
        this._requestsSent && invariant(0, 4390);
        this._requestsSent = !0;
        this._wrapperRequest = null;
        var requests = this._requests;
        if (!requests.length) return;
        var request;
        if (requests.length === 1) request = requests[0];
        else {
            var data = requests.filter(Boolean).map(function(request) {
                return [request.uri.getPath(), require("PHPQuerySerializer").serialize(request.data)]
            });
            request = this._wrapperRequest = new AsyncRequest("/ajax/proxy.php").setAllowCrossPageTransition(!0).setData({
                data: data
            }).setHandler(this._handler.bind(this)).setTransportErrorHandler(this._transportErrorHandler.bind(this))
        }
        request && request.setOption("bundle", !1).send()
    };
    AsyncMultiplex.prototype._handler = function(response) {
        __p && __p();
        var _this = this,
            responses = response.getPayload().responses;
        if (responses.length !== this._requests.length) return;
        var _loop2 = function _loop2(ii) {
            __p && __p();
            var request = _this._requests[ii];
            if (!request) return "continue";
            var request_path = request.uri.getPath();
            _this._wrapperRequest && (request.id = _this._wrapperRequest.id);
            if (responses[ii][0] !== request_path) {
                request.continuation.last(function() {
                    request.invokeResponseHandler({
                        transportError: "Wrong response order in bundled request to " + request_path
                    })
                });
                return "continue"
            }
            request.continuation.last(function() {
                request.handleResponse(responses[ii][1])
            })
        };
        for (var ii = 0; ii < this._requests.length; ii++) {
            var _ret2 = _loop2(ii);
            if (_ret2 === "continue") continue
        }
        _pendingAsyncMultiplexes.splice(_pendingAsyncMultiplexes.indexOf(this, 1))
    };
    AsyncMultiplex.prototype._transportErrorHandler = function(response) {
        var interpreted = {
                transportError: response.errorDescription
            },
            paths = this._requests.filter(Boolean).map(function(request) {
                this._wrapperRequest && (request.id = this._wrapperRequest.id);
                request.invokeResponseHandler(interpreted);
                return request.uri.getPath()
            }, this)
    };
    AsyncMultiplex.schedule = function(request) {
        request.schedule("AsyncMultiplex.schedule");
        _asyncMultiplex || (_asyncMultiplex = new AsyncMultiplex(), _pendingAsyncMultiplexes.push(_asyncMultiplex), require("TimeSlice").guard(function() {
            require("setTimeoutAcrossTransitions")(function() {
                _asyncMultiplex && (_asyncMultiplex.send(), _asyncMultiplex = null)
            }, 0)
        }, "AsyncMultiplex.schedule", {
            propagationType: require("TimeSlice").PropagationType.ORPHAN
        })());
        _asyncMultiplex.add(request);
        return _asyncMultiplex
    };
    AsyncMultiplex.unschedule = function(request) {
        _pendingAsyncMultiplexes.forEach(function(asyncMultiplex) {
            asyncMultiplex.remove(request)
        })
    };
    AsyncRequest.suppressOnloadToken = {};
    global.AsyncRequest = AsyncRequest;
    module.exports = AsyncRequest
}), null);
__d("idx", [], (function(a, b, c, d, e, f) {
    "use strict";
    __p && __p();

    function a(a, d) {
        try {
            return d(a)
        } catch (a) {
            if (a instanceof TypeError)
                if (b(a)) return null;
                else if (c(a)) return void 0;
            throw a
        }
    }
    var g;

    function b(a) {
        a = a.message;
        g || (g = i("null"));
        return g.test(a)
    }
    var h;

    function c(a) {
        a = a.message;
        h || (h = i("undefined"));
        return h.test(a)
    }

    function i(a) {
        return new RegExp("^" + a + " | " + a + "$|^[^\\(]* " + a + " ")
    }
    e.exports = a
}), null);
__d("intlSummarizeNumber", ["FbtNumberType", "IntlCompactDecimalNumberFormatConfig", "IntlVariations", "intlNumUtils"], (function(a, b, c, d, e, f) {
    __p && __p();
    var g = 3,
        h = 14,
        i = {
            ROUND: "ROUND",
            TRUNCATE: "TRUNCATE"
        },
        j = {
            SHORT: "SHORT",
            LONG: "LONG"
        };

    function a(a, c, d, e) {
        __p && __p();
        d === void 0 && (d = j.SHORT);
        e === void 0 && (e = i.ROUND);
        d = b("IntlCompactDecimalNumberFormatConfig")[d == j.SHORT ? "short_patterns" : "long_patterns"];
        var f = a === 0 ? 0 : Math.floor(Math.log10(Math.abs(a)));
        f > h && (f = h);
        var l = k(a, f, c, e, d),
            m = l[0],
            n = l[1];
        l = l[2];
        if (l) {
            f += 1;
            l = k(a, f, c, e, d);
            m = l[0];
            n = l[1];
            l[2]
        }
        e = b("FbtNumberType").getVariation(m) || b("IntlVariations").NUMBER_OTHER;
        l = f.toString();
        l = (d = d) != null ? (d = d[l]) != null ? d[e.toString()] : d : d;
        if (!l || f < g || l.positive_prefix_pattern === "" && l.positive_suffix_pattern === "") {
            e = c === void 0 ? 0 : c;
            return b("intlNumUtils").formatNumberWithThousandDelimiters(a, e)
        }
        return l && l.min_integer_digits === 0 && m === 1 ? l.positive_prefix_pattern + l.positive_suffix_pattern : (l && l.positive_prefix_pattern || "") + b("intlNumUtils").formatNumberWithThousandDelimiters(m, n) + (l && l.positive_suffix_pattern || "")
    }

    function k(a, c, d, e, f) {
        __p && __p();
        var g = c.toString();
        g = (f = f) != null ? (f = f[g]) != null ? f[b("IntlVariations").NUMBER_OTHER.toString()] : f : f;
        f = g && g.min_integer_digits || c + 1;
        var j = c - f + 1;
        j = Math.abs(a) / Math.pow(10, j);
        var k = d != null;
        d = k ? d : g && g.min_fraction_digits;
        d == null && (d = c > 2 ? 1 : 0);
        g = e == i.TRUNCATE ? b("intlNumUtils").truncateLongNumber(j.toString(), d) : j.toFixed(d);
        e = parseFloat(g) * (a < 0 ? -1 : 1);
        return [e, e % 1 === 0 && !k ? 0 : d, g.length > f + (d > 0 ? d + 1 : 0) + (j >= 0 ? 0 : 1) && c < h]
    }
    e.exports = a
}), null);
__d("PluginIconButton", ["fbt", "invariant", "CSS", "DOM", "Event", "intlSummarizeNumber"], (function(a, b, c, d, e, f, g, h) {
    __p && __p();

    function a(a, c, d, e) {
        "use strict";
        e === null || d !== null || h(0, 2812), this.$1 = a, this.$2 = d, this.$3 = e, c === !1 && (b("Event").listen(a, "click", function() {
            return this.toggleButton()
        }.bind(this)), b("Event").listen(a, "toggle", function() {
            return this.toggleButton()
        }.bind(this)))
    }
    a.prototype.toggleButton = function() {
        "use strict";
        b("CSS").hasClass(this.$1, "active") === !1 ? (b("CSS").addClass(this.$1, "active"), this.$4(!0), b("CSS").addClass(this.$1, "is_animating"), setTimeout(function() {
            b("CSS").removeClass(this.$1, "is_animating")
        }.bind(this), 240)) : (b("CSS").removeClass(this.$1, "active"), this.$4(!1))
    };
    a.prototype.setTitle = function(a) {
        "use strict";
        this.$1.setAttribute("title", a)
    };
    a.prototype.$4 = function(a) {
        "use strict";
        var c = function(a) {
            return g._("{count}", [g._param("count", b("intlSummarizeNumber")(a, 0))])
        };
        this.$3 != null && this.$3 < 1e3 && (this.$3 = a ? this.$3 + 1 : this.$3 - 1, b("DOM").setContent(this.$2, c(this.$3)))
    };
    a.prototype.isActivated = function() {
        "use strict";
        return b("CSS").hasClass(this.$1, "active")
    };
    e.exports = a
}), null);
__d("PluginShareLogTypes", [], (function(a, b, c, d, e, f) {
    e.exports = Object.freeze({
        IMPRESSION: "impression",
        CLICK: "click"
    })
}), null);
__d("XSharePluginLoggingController", ["XController"], (function(a, b, c, d, e, f) {
    e.exports = b("XController").create("/platform/plugin/share/logging/", {})
}), null);
__d("PluginShareActions", ["AsyncRequest", "Event", "PluginShareLogTypes", "UnverifiedXD", "XSharePluginLoggingController"], (function(a, b, c, d, e, f) {
    "use strict";
    a = {
        init: function(a, c, d, e, f, g, h) {
            b("Event").listen(f, "click", function(f) {
                new(b("AsyncRequest"))().setURI(b("XSharePluginLoggingController").getURIBuilder().getURI()).setData({
                    app_id: g,
                    href: a,
                    layout: c,
                    event: b("PluginShareLogTypes").CLICK,
                    has_iframe: d,
                    referer_url: e
                }).send()
            })
        },
        triggerMobileIframe: function(a, c) {
            b("Event").listen(c, "click", function(c) {
                b("UnverifiedXD").send({
                    type: "shareTriggerMobileIframe",
                    data: JSON.stringify({
                        href: a
                    })
                })
            })
        }
    };
    e.exports = a
}), null);