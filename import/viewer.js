"use strict";
var __spreadArray =
    (this && this.__spreadArray) ||
    function (f, l, g) {
      if (g || 2 === arguments.length)
        for (var b = 0, d = l.length, h; b < d; b++)
          (!h && b in l) ||
            (h || (h = Array.prototype.slice.call(l, 0, b)), (h[b] = l[b]));
      return f.concat(h || Array.prototype.slice.call(l));
    },
  __extends =
    (this && this.__extends) ||
    (function () {
      var f = function (l, g) {
        f =
          Object.setPrototypeOf ||
          ({
            __proto__: [],
          } instanceof Array &&
            function (b, d) {
              b.__proto__ = d;
            }) ||
          function (b, d) {
            for (var f in d)
              Object.prototype.hasOwnProperty.call(d, f) && (b[f] = d[f]);
          };
        return f(l, g);
      };
      return function (l, g) {
        function b() {
          this.constructor = l;
        }
        if ("function" !== typeof g && null !== g)
          throw new TypeError(
            "Class extends value " +
              String(g) +
              " is not a constructor or null",
          );
        f(l, g);
        l.prototype =
          null === g
            ? Object.create(g)
            : ((b.prototype = g.prototype), new b());
      };
    })(),
  __assign =
    (this && this.__assign) ||
    function () {
      __assign =
        Object.assign ||
        function (f) {
          for (var l, g = 1, b = arguments.length; g < b; g++) {
            l = arguments[g];
            for (var d in l)
              Object.prototype.hasOwnProperty.call(l, d) && (f[d] = l[d]);
          }
          return f;
        };
      return __assign.apply(this, arguments);
    };
(function (f) {
  "object" === typeof exports && "undefined" !== typeof module
    ? (module.exports = f())
    : "function" === typeof define && define.amd
      ? define([], f)
      : (("undefined" !== typeof window
          ? window
          : "undefined" !== typeof global
            ? global
            : "undefined" !== typeof self
              ? self
              : this
        ).base64js = f());
})(function () {
  return (function d(l, g, b) {
    function h(p, q) {
      if (!g[p]) {
        if (!l[p]) {
          var n = "function" == typeof require && require;
          if (!q && n) return n(p, !0);
          if (k) return k(p, !0);
          q = Error("Cannot find module '" + p + "'");
          throw ((q.code = "MODULE_NOT_FOUND"), q);
        }
        q = g[p] = {
          exports: {},
        };
        l[p][0].call(
          q.exports,
          function (b) {
            var d = l[p][1][b];
            return h(d ? d : b);
          },
          q,
          q.exports,
          d,
          l,
          g,
          b,
        );
      }
      return g[p].exports;
    }
    for (
      var k = "function" == typeof require && require, p = 0;
      p < b.length;
      p++
    )
      h(b[p]);
    return h;
  })(
    {
      "/": [
        function (l, g, b) {
          function d(b) {
            var d = b.length;
            if (0 < d % 4)
              throw Error("Invalid string. Length must be a multiple of 4");
            return "=" === b[d - 2] ? 2 : "=" === b[d - 1] ? 1 : 0;
          }
          function h(b, d, h) {
            for (var g = [], p = d; p < h; p += 3)
              ((d = (b[p] << 16) + (b[p + 1] << 8) + b[p + 2]),
                g.push(
                  k[(d >> 18) & 63] +
                    k[(d >> 12) & 63] +
                    k[(d >> 6) & 63] +
                    k[d & 63],
                ));
            return g.join("");
          }
          b.byteLength = function (b) {
            return (3 * b.length) / 4 - d(b);
          };
          b.toByteArray = function (b) {
            var h = b.length;
            var k = d(b);
            var g = new n((3 * h) / 4 - k);
            var q = 0 < k ? h - 4 : h;
            var l = 0;
            for (h = 0; h < q; h += 4) {
              var A =
                (p[b.charCodeAt(h)] << 18) |
                (p[b.charCodeAt(h + 1)] << 12) |
                (p[b.charCodeAt(h + 2)] << 6) |
                p[b.charCodeAt(h + 3)];
              g[l++] = (A >> 16) & 255;
              g[l++] = (A >> 8) & 255;
              g[l++] = A & 255;
            }
            2 === k
              ? ((A =
                  (p[b.charCodeAt(h)] << 2) | (p[b.charCodeAt(h + 1)] >> 4)),
                (g[l++] = A & 255))
              : 1 === k &&
                ((A =
                  (p[b.charCodeAt(h)] << 10) |
                  (p[b.charCodeAt(h + 1)] << 4) |
                  (p[b.charCodeAt(h + 2)] >> 2)),
                (g[l++] = (A >> 8) & 255),
                (g[l++] = A & 255));
            return g;
          };
          b.fromByteArray = function (b) {
            for (
              var d = b.length, g = d % 3, p = "", n = [], q = 0, l = d - g;
              q < l;
              q += 16383
            )
              n.push(h(b, q, q + 16383 > l ? l : q + 16383));
            1 === g
              ? ((b = b[d - 1]),
                (p += k[b >> 2]),
                (p += k[(b << 4) & 63]),
                (p += "=="))
              : 2 === g &&
                ((b = (b[d - 2] << 8) + b[d - 1]),
                (p += k[b >> 10]),
                (p += k[(b >> 4) & 63]),
                (p += k[(b << 2) & 63]),
                (p += "="));
            n.push(p);
            return n.join("");
          };
          var k = [],
            p = [],
            n = "undefined" !== typeof Uint8Array ? Uint8Array : Array;
          for (l = 0; 64 > l; ++l)
            ((k[l] =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                l
              ]),
              (p[
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(
                  l,
                )
              ] = l));
          p[45] = 62;
          p[95] = 63;
        },
        {},
      ],
    },
    {},
    [],
  )("/");
});
function TextEncoderLite() {}
function TextDecoderLite() {}
(function () {
  function f(f, b) {
    b = b || Infinity;
    for (var d, h = f.length, k = null, g = [], n = 0; n < h; n++) {
      if (((d = f.charCodeAt(n)), 55295 < d && 57344 > d))
        if (k)
          if (56320 > d) {
            -1 < (b -= 3) && g.push(239, 191, 189);
            k = d;
            continue;
          } else ((d = 65536 | ((k - 55296) << 10) | (d - 56320)), (k = null));
        else {
          56319 < d
            ? -1 < (b -= 3) && g.push(239, 191, 189)
            : n + 1 === h
              ? -1 < (b -= 3) && g.push(239, 191, 189)
              : (k = d);
          continue;
        }
      else k && (-1 < (b -= 3) && g.push(239, 191, 189), (k = null));
      if (128 > d) {
        if (0 > --b) break;
        g.push(d);
      } else if (2048 > d) {
        if (0 > (b -= 2)) break;
        g.push(192 | (d >> 6), 128 | (63 & d));
      } else if (65536 > d) {
        if (0 > (b -= 3)) break;
        g.push(224 | (d >> 12), 128 | (63 & (d >> 6)), 128 | (63 & d));
      } else if (2097152 > d) {
        if (0 > (b -= 4)) break;
        g.push(
          240 | (d >> 18),
          128 | (63 & (d >> 12)),
          128 | (63 & (d >> 6)),
          128 | (63 & d),
        );
      } else throw Error("Invalid code point");
    }
    return g;
  }
  function l(f) {
    try {
      return decodeURIComponent(f);
    } catch (b) {
      return String.fromCharCode(65533);
    }
  }
  TextEncoderLite.prototype.encode = function (g) {
    var b;
    return (
      (b = "undefined" == typeof Uint8Array ? f(g) : new Uint8Array(f(g))),
      b
    );
  };
  TextDecoderLite.prototype.decode = function (f) {
    var b = f.length,
      d = "",
      h = "";
    b = Math.min(f.length, b || Infinity);
    for (var k = 0; k < b; k++)
      127 >= f[k]
        ? ((d += l(h) + String.fromCharCode(f[k])), (h = ""))
        : (h += "%" + f[k].toString(16));
    return d + l(h);
  };
})();
!(function (f) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = f())
    : "function" == typeof define && define.amd
      ? define([], f)
      : (("undefined" != typeof window
          ? window
          : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
              ? self
              : this
        ).uuid = f());
})(function () {
  return (function d(l, g, b) {
    function h(p, q) {
      if (!g[p]) {
        if (!l[p]) {
          var n = "function" == typeof require && require;
          if (!q && n) return n(p, !0);
          if (k) return k(p, !0);
          q = Error("Cannot find module '" + p + "'");
          throw ((q.code = "MODULE_NOT_FOUND"), q);
        }
        q = g[p] = {
          exports: {},
        };
        l[p][0].call(
          q.exports,
          function (b) {
            var d = l[p][1][b];
            return h(d ? d : b);
          },
          q,
          q.exports,
          d,
          l,
          g,
          b,
        );
      }
      return g[p].exports;
    }
    for (
      var k = "function" == typeof require && require, p = 0;
      p < b.length;
      p++
    )
      h(b[p]);
    return h;
  })(
    {
      1: [
        function (l, g, b) {
          b = l("./v1");
          l = l("./v4");
          l.v1 = b;
          l.v4 = l;
          g.exports = l;
        },
        {
          "./v1": 4,
          "./v4": 5,
        },
      ],
      2: [
        function (l, g, b) {
          var d = [];
          for (l = 0; 256 > l; ++l) d[l] = (l + 256).toString(16).substr(1);
          g.exports = function (b, k) {
            k = k || 0;
            return (
              d[b[k++]] +
              d[b[k++]] +
              d[b[k++]] +
              d[b[k++]] +
              "-" +
              d[b[k++]] +
              d[b[k++]] +
              "-" +
              d[b[k++]] +
              d[b[k++]] +
              "-" +
              d[b[k++]] +
              d[b[k++]] +
              "-" +
              d[b[k++]] +
              d[b[k++]] +
              d[b[k++]] +
              d[b[k++]] +
              d[b[k++]] +
              d[b[k++]]
            );
          };
        },
        {},
      ],
      3: [
        function (l, g, b) {
          (function (b) {
            var d = b.crypto || b.msCrypto;
            if (d && d.getRandomValues) {
              var k = new Uint8Array(16);
              var p = function () {
                return (d.getRandomValues(k), k);
              };
            }
            if (!p) {
              var n = Array(16);
              p = function () {
                for (var b, d = 0; 16 > d; d++)
                  (0 === (3 & d) && (b = 4294967296 * Math.random()),
                    (n[d] = (b >>> ((3 & d) << 3)) & 255));
                return n;
              };
            }
            g.exports = p;
          }).call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
                ? self
                : "undefined" != typeof window
                  ? window
                  : {},
          );
        },
        {},
      ],
      4: [
        function (l, g, b) {
          b = l("./lib/rng");
          var d = l("./lib/bytesToUuid");
          l = b();
          var h = [1 | l[0], l[1], l[2], l[3], l[4], l[5]],
            k = 16383 & ((l[6] << 8) | l[7]),
            p = 0,
            n = 0;
          g.exports = function (b, g, t) {
            t = (g && t) || 0;
            var q = g || [];
            b = b || {};
            var y = void 0 !== b.clockseq ? b.clockseq : k,
              u = void 0 !== b.msecs ? b.msecs : new Date().getTime(),
              l = void 0 !== b.nsecs ? b.nsecs : n + 1,
              B = u - p + (l - n) / 1e4;
            if (
              (0 > B && void 0 === b.clockseq && (y = (y + 1) & 16383),
              (0 > B || u > p) && void 0 === b.nsecs && (l = 0),
              1e4 <= l)
            )
              throw Error("uuid.v1(): Can't create more than 10M uuids/sec");
            p = u;
            n = l;
            k = y;
            u += 122192928e5;
            l = (1e4 * (268435455 & u) + l) % 4294967296;
            q[t++] = (l >>> 24) & 255;
            q[t++] = (l >>> 16) & 255;
            q[t++] = (l >>> 8) & 255;
            q[t++] = 255 & l;
            u = ((u / 4294967296) * 1e4) & 268435455;
            q[t++] = (u >>> 8) & 255;
            q[t++] = 255 & u;
            q[t++] = ((u >>> 24) & 15) | 16;
            q[t++] = (u >>> 16) & 255;
            q[t++] = (y >>> 8) | 128;
            q[t++] = 255 & y;
            b = b.node || h;
            for (y = 0; 6 > y; ++y) q[t + y] = b[y];
            return g ? g : d(q);
          };
        },
        {
          "./lib/bytesToUuid": 2,
          "./lib/rng": 3,
        },
      ],
      5: [
        function (l, g, b) {
          var d = l("./lib/rng"),
            h = l("./lib/bytesToUuid");
          g.exports = function (b, g, n) {
            n = (g && n) || 0;
            "string" == typeof b &&
              ((g = "binary" == b ? Array(16) : null), (b = null));
            b = b || {};
            b = b.random || (b.rng || d)();
            if (((b[6] = (15 & b[6]) | 64), (b[8] = (63 & b[8]) | 128), g))
              for (var k = 0; 16 > k; ++k) g[n + k] = b[k];
            return g || h(b);
          };
        },
        {
          "./lib/bytesToUuid": 2,
          "./lib/rng": 3,
        },
      ],
    },
    {},
    [1],
  )(1);
});
var c;
(function (f) {
  function l(b, d) {
    void 0 === d && (d = !1);
    try {
      return JSON.stringify(b, null, d ? 4 : void 0);
    } catch (h) {}
  }
  function g(b, d) {
    try {
      return JSON.parse(b, d);
    } catch (h) {}
  }
  f.isServer = !1;
  f.no = function () {};
  f.commaA = function (b) {
    return b ? b.split(",") : [];
  };
  f.stringify = l;
  f.parse = g;
  f.clone = function (b) {
    b = l(b);
    return g(b);
  };
})(c || (c = {}));
var str;
(function (f) {
  function l(b, d, f) {
    return b.replace(
      new RegExp(d.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"),
      f,
    );
  }
  function g(b, d) {
    b = l(b, "\r\n", d);
    return (b = l(b, "\n", d));
  }
  function b(b, d) {
    void 0 === d && (d = " ");
    for (var f = b.length - 1; 0 <= f && b.charAt(f) === d; ) f--;
    return b.substring(0, f + 1);
  }
  function d(b, d) {
    void 0 === d && (d = " ");
    if (0 === b.length) return b;
    for (var f = 0; b.charAt(f) === d && f < b.length; ) f++;
    return b.substring(f);
  }
  function h(b, d, f, h, g, t) {
    h = !0 === h || void 0 === h;
    return (h ? d : g || "") + b + (h ? f || "" : t || "");
  }
  f.tab = "\t";
  f.id = function () {
    return uuid.v4();
  };
  f.isString = function (b) {
    return "string" === typeof b || b instanceof String;
  };
  f.equalLowerCase = function (b, d) {
    return b.toLowerCase() === d.toLowerCase();
  };
  f.replaceAll = l;
  f.count = function (b, d, f) {
    void 0 === f && (f = !1);
    b += "";
    d += "";
    if (0 >= d.length) return b.length + 1;
    var h = 0,
      k = 0;
    for (f = f ? 1 : d.length; ; )
      if (((k = b.indexOf(d, k)), 0 <= k)) (++h, (k += f));
      else break;
    return h;
  };
  f.ellipses = function (b, d) {
    return b.length <= d ? b : b.substring(0, d) + "...";
  };
  f.replaceNewLinesWithBr = function (b) {
    return g(b, "<br />");
  };
  f.replaceNewLines = g;
  f.joinPath = function () {
    for (var b = [], d = 0; d < arguments.length; d++) b[d] = arguments[d];
    d = [];
    for (var f = -1, h = !1, g = !1, t = 0; t < b.length; t++) {
      var x = b[t];
      f++;
      "/" === x[0] && ((x = x.slice(1)), 0 === f && (h = !0));
      "/" === x[x.length - 1] &&
        ((x = x.slice(0, x.length - 1)), f === b.length - 1 && (g = !0));
      d.push(x);
    }
    return (h ? "/" : "") + d.join("/") + (g ? "/" : "");
  };
  f.indexOfAny = function (b, d) {
    return d.some(function (d) {
      return -1 !== b.indexOf(d);
    });
  };
  f.prepareForRegExp = function (b) {
    return b.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  };
  f.validatePassword = function (b) {
    if (8 > b.length) return !1;
    var d = /[a-z]/.test(b),
      f = /\d/.test(b);
    return d &&
      f &&
      !["password", "password1", "123456789", "qwerty"].find(function (d) {
        return d === b;
      })
      ? !0
      : !1;
  };
  f.trimN = b;
  f.split = function (b, d) {
    void 0 === d && (d = ",");
    var f = [];
    if (!b) return f;
    var h = 0;
    for (b = b.split(d); h < b.length; h++)
      ((d = b[h].trim()), 0 < d.length && f.push(d));
    return f;
  };
  f.startsWith = function (b, d) {
    return !!b && b.slice(0, d.length) === d;
  };
  f.trim1 = d;
  f.trim = function (f, h) {
    void 0 === h && (h = " ");
    return b(d(f, h));
  };
  f.htmlEncode = function (b) {
    return b
      ? String(b)
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
      : "";
  };
  f.htmlDecode = function (b) {
    return b
      ? String(b)
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&")
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')
      : "";
  };
  f.wrap = h;
  f.wrapTag = function (b, d, f, g) {
    return h(
      b,
      d ? "<" + d + ">" : "",
      d ? "</" + d + ">" : "",
      f,
      g ? "<" + g + ">" : void 0,
      g ? "</" + g + ">" : void 0,
    );
  };
  f.capitalize = function (b) {
    return b && b[0].toUpperCase() + b.slice(1);
  };
})(str || (str = {}));
String.prototype.format = function () {
  var f = arguments;
  return this.replace(/{(\d+)}/g, function (l, g) {
    return "undefined" !== typeof f[g] ? f[g] : l;
  });
};
var num;
(function (f) {
  function l(f) {
    return f ? parseInt(f, 10) : NaN;
  }
  f.isInt = function (f) {
    return "number" === typeof f && 0 === f % 1;
  };
  f.toInt = function (f) {
    f = l(f);
    return isNaN(f) ? 0 : f;
  };
  f.toNum = l;
  f.toFloat = function (f) {
    f = parseFloat(f);
    return isNaN(f) ? 0 : f;
  };
  f.round = function (f, b) {
    void 0 === b && (b = 0);
    return +(Math.round(f + "e+" + b) + "e-" + b);
  };
  f.random = function (f, b) {
    return Math.floor(Math.random() * (b - f + 1)) + f;
  };
  f.defaultValue = 0;
  f.noValue = -1;
  f.sign = function (f) {
    return 0 < f ? 1 : 0 === f ? 0 : -1;
  };
})(num || (num = {}));
var arr;
(function (f) {
  function l(b) {
    return Array.isArray
      ? Array.isArray(b)
      : "[object Array]" === Object.prototype.toString.call(b);
  }
  function g(b, d, f) {
    b.splice(f, 0, d);
  }
  function b(b, d) {
    return -1 !== b.indexOf(d);
  }
  function d(b, f) {
    var h = b.length;
    if (h !== f.length) return !1;
    for (var k = 0; k < h; k++) {
      var g = b[k],
        p = f[k];
      if (g !== p && !(l(g) && l(p) && d(g, p))) return !1;
    }
    return !0;
  }
  function h(b) {
    for (var d = [], f = 0, k = b.length; f < k; f++) {
      var g = b[f];
      d.push(l(g) ? h(g) : g);
    }
    return d;
  }
  function k(d, f, h) {
    void 0 === h && (h = -1);
    if (b(d, f)) return !1;
    -1 === h ? d.push(f) : d.unshift(f);
    return !0;
  }
  function p(b, d) {
    d = b.indexOf(d);
    if (-1 === d) return !1;
    b.splice(d, 1);
    return !0;
  }
  function n(b, d) {
    return b.splice(d, 1);
  }
  function q(b, d, f) {
    void 0 === f && (f = !0);
    return (
      f
        ? b.filter(function (b) {
            return void 0 !== b && null !== b && "" !== b;
          })
        : b
    ).join(d);
  }
  function u(d, f) {
    if (0 !== f.length) {
      var h = f[0];
      f = f.slice(1);
      for (var k = [], g = [], p = 0, n = d.length; p < n; p++) {
        var q = h.value(d[p]);
        if (!b(g, q)) {
          g.push(q);
          for (var y = [], t = new x(q), l = 0; l < n; l++) {
            var z = d[l];
            h.value(z) === q && (t.items.push(z), y.push(z));
          }
          t.subGroups = u(y, f);
          k.push(t);
        }
      }
      return k;
    }
  }
  f.isArray = l;
  f.insert = g;
  f.has = b;
  f.hasOneEqual = function (d, f) {
    return !!d.find(function (d) {
      return b(f, d);
    });
  };
  f.hasAll = function (b, d) {
    for (var f = 0; f < d.length; f++) if (-1 === b.indexOf(d[f])) return !1;
    return !0;
  };
  f.equals = d;
  f.clone = h;
  f.take = function (b, d) {
    return b.slice(0, Math.max(d, 0));
  };
  f.first = function (b) {
    return 0 < b.length ? b[0] : void 0;
  };
  f.last = function (b) {
    var d = b.length;
    return 0 === d ? void 0 : b[d - 1];
  };
  f.unique = function (b) {
    return b.filter(function (b, d, f) {
      return d === f.indexOf(b);
    });
  };
  f.sum = function (b) {
    for (var d = 0, f = 0; f < b.length; f++) {
      var h = b[f];
      void 0 === h || isNaN(h) || (d += h);
    }
    return d;
  };
  f.range = function (b, d, f) {
    void 0 === d && ((d = b), (b = 1));
    var h = d >= b;
    void 0 === f && (f = 1);
    !h && 0 < f && (f = -f);
    for (var k = []; h ? b <= d : b >= d; b += f) k.push(b);
    return k;
  };
  f.addUnique = k;
  f.addUniqueString = function (b, d) {
    return b.find(function (b) {
      return b.toLowerCase() === d.toLowerCase();
    })
      ? !1
      : (b.push(d), !0);
  };
  f.addUniques = function (b, d, f) {
    void 0 === f && (f = -1);
    for (var h = !1, g = 0; g < d.length; g++) k(b, d[g], f) && (h = !0);
    return h;
  };
  f.remove = p;
  f.removes = function (b, d) {
    for (var f = !1, h = 0; h < d.length; h++) p(b, d[h]) && (f = !0);
    return f;
  };
  f.removeAt = n;
  f.replaceAt = function (b, d, f) {
    n(b, d);
    g(b, f, d);
    return b;
  };
  f.filter = function (b, d) {
    for (var f = b.length - 1; 0 <= f; f--) d(b[f]) || n(b, f);
    return b;
  };
  f.join = q;
  f.joinComma = function (b) {
    return q(b, ",");
  };
  f.joinCommaSpace = function (b) {
    return q(b, ", ");
  };
  f.sort = function (b, d) {
    return b > d
      ? 1
      : b < d
        ? -1
        : b === d
          ? 0
          : void 0 === b || null === b
            ? -1
            : 1;
  };
  var t = (function () {
    function b(b, d) {
      this.isProperty = !0;
      this.propertyName = b;
      d && ((this.isProperty = !1), (this.func = d));
    }
    b.prototype.value = function (b) {
      return this.isProperty ? b[this.propertyName] : this.func.call(this, b);
    };
    return b;
  })();
  f.groupKey = t;
  var x = (function () {
    return function (b) {
      this.items = [];
      this.subGroups = [];
      this.key = b;
    };
  })();
  f.groupBy = x;
  f.groupByMany = u;
})(arr || (arr = {}));
Array.prototype.find ||
  Object.defineProperty(Array.prototype, "find", {
    value: function (f) {
      for (var l = [], g = 1; g < arguments.length; g++)
        l[g - 1] = arguments[g];
      if (null == this) throw new TypeError('"this" is null or not defined');
      g = Object(this);
      var b = g.length >>> 0;
      if ("function" !== typeof f)
        throw new TypeError("predicate must be a function");
      l = l[1];
      for (var d = 0; d < b; ) {
        var h = g[d];
        if (f.call(l, h, d, g)) return h;
        d++;
      }
    },
  });
Array.prototype.findIndex ||
  Object.defineProperty(Array.prototype, "findIndex", {
    value: function (f) {
      for (var l = [], g = 1; g < arguments.length; g++)
        l[g - 1] = arguments[g];
      if (null == this) throw new TypeError('"this" is null or not defined');
      g = Object(this);
      var b = g.length >>> 0;
      if ("function" !== typeof f)
        throw new TypeError("predicate must be a function");
      l = l[1];
      for (var d = 0; d < b; ) {
        if (f.call(l, g[d], d, g)) return d;
        d++;
      }
      return -1;
    },
  });
var date;
(function (f) {
  function l(b, d) {
    var f = b[d];
    !f || f instanceof Date || (b[d] = g(f));
  }
  function g(b) {
    try {
      return new Date(b);
    } catch (y) {}
  }
  function b(b, d) {
    var f = [p(b.getHours()), p(b.getMinutes())];
    (d && d.removeSeconds) || f.push(p(b.getSeconds()));
    return f.join(":");
  }
  function d(d, f) {
    void 0 === f && (f = !0);
    return h(d, f) + " " + b(d);
  }
  function h(b, d) {
    void 0 === d && (d = !0);
    return (
      b.getDate() + "/" + (b.getMonth() + 1) + (d ? "/" + b.getFullYear() : "")
    );
  }
  function k(b) {
    return [b.getFullYear(), b.getMonth() + 1, b.getDate()];
  }
  function p(b) {
    return 10 > b ? "0" + b : b + "";
  }
  function n() {
    return new Date();
  }
  function q(b, d) {
    var h = new Date(b),
      k = new Date(d);
    h > k && ((d = h), (h = k), (k = d));
    d = h.getFullYear();
    var g = [
      31,
      (0 === d % 4 && 0 !== d % 100) || 0 === d % 400 ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    d = k.getFullYear() - d;
    b = k.getMonth() - h.getMonth();
    0 > b && (d--, (b += 12));
    var p = k.getDate() - h.getDate();
    0 > p && (0 < b ? b-- : (d--, (b = 11)), (p += g[h.getMonth()]));
    h = new Date(2e3, 0, 1, h.getHours(), h.getMinutes(), h.getSeconds());
    h =
      new Date(
        2e3,
        0,
        1,
        k.getHours(),
        k.getMinutes(),
        k.getSeconds(),
      ).getTime() - h.getTime();
    0 > h &&
      (0 !== p || 0 !== b || 0 != d) &&
      (0 < p ? p-- : ((p = 30), 0 < b ? b-- : (d--, (b = 11))),
      (h += f.msPerDay));
    h = Math.floor(Math.abs(h) / 1e3);
    k = Math.floor(h / 60);
    return [d, b, p, Math.floor(k / 60) % 24, k % 60, h % 60];
  }
  f.isDateValid = function (b) {
    return "[object Date]" === Object.prototype.toString.call(b)
      ? !isNaN(b.getTime())
      : !1;
  };
  f.fixDate = l;
  f.getFixDate = g;
  f.fixDates = function (b, d) {
    b.forEach(function (b) {
      return d.forEach(function (d) {
        return l(b, d);
      });
    });
  };
  var u = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
    t = "Sun Mon Tue Wed Thu Fr Sat".split(" ");
  f.format = function (d, f) {
    f = obj.merge(
      {
        dateDelimiter: " ",
      },
      f,
    );
    var h = d.getDate() + "",
      k = d.getFullYear(),
      g = [];
    f.includeDayName && g.push(t[d.getDay()]);
    var p = u[d.getMonth()];
    f.monthFirst ? g.push(p, h) : g.push(h, p);
    (f.removeCurrentYear && k === new Date().getFullYear()) || g.push(k + "");
    h = g.join(f.dateDelimiter);
    f.includeTime && (h += " " + b(d, f));
    return h;
  };
  f.formatTime = b;
  f.dateTime = d;
  f.getShortDate = h;
  f.minDate = function (b) {
    return h(b, b.getFullYear() !== n().getFullYear());
  };
  f.minDateTime = function (b) {
    return d(b, b.getFullYear() !== n().getFullYear());
  };
  f.yyyyMMdd = function (b) {
    b = k(b);
    return [b[0], p(b[1]), p(b[2])].join("-");
  };
  f.ymd = k;
  f.time = function (b, d) {
    return p(b) + ":" + p(d);
  };
  f.time12 = function (b, d) {
    12 < b && (b -= 12);
    return p(b) + ":" + p(d);
  };
  f._0 = p;
  f.now = n;
  f.nowMs = function () {
    return Date.now();
  };
  f.nowTime = function () {
    return b(n());
  };
  f.msPerDay = 864e5;
  f.addYears = function (b, d) {
    b = new Date(b.getTime());
    b.setFullYear(b.getFullYear() + d);
    return b;
  };
  f.addDays = function (b, d) {
    return new Date(b.valueOf() + f.msPerDay * d);
  };
  f.addMinutes = function (b, d) {
    return new Date(b.getTime() + 6e4 * d);
  };
  f.diffSec = function (b, d) {
    return num.round((b - d) / 1e3, 2);
  };
  f.diffMin = function (b, d) {
    return num.round((b - d) / 6e4, 2);
  };
  f.diffDay = function (b, d) {
    b = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    d = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor((b - d) / f.msPerDay);
  };
  f.diff = q;
  f.diffText = function (b, d, h) {
    var k = h && void 0 !== h.precision ? h.precision : f.precisionType.d;
    h = h && void 0 !== h.eqPrecision ? h.eqPrecision : k;
    for (
      var g = q(b, d),
        p = "yr mo d hr min sec".split(" "),
        n = [],
        u = !0,
        x = 0;
      5 >= x;
      x++
    ) {
      var t = g[x],
        l = p[x],
        y = "";
      0 !== t && (k >= x || (u && h >= x)) && (y = t + l);
      u = u && 0 === t;
      n.push(y);
    }
    k = arr.join(n, " ");
    0 < k.length && b > d && (k += " ago");
    return k;
  };
  f.precisionType = {
    yr: 0,
    mo: 1,
    d: 2,
    hr: 3,
    min: 4,
    sec: 5,
  };
  f.dayHourMinute = function (b) {
    var d = b % 1440;
    return [Math.floor(b / 1440), Math.floor(d / 60), d % 60];
  };
  f.hm = function (b) {
    b %= 1440;
    return [Math.floor(b / 60), b % 60];
  };
  f.gtOrEq = function (b, d) {
    return b >= d || 10 > Math.abs(b - d);
  };
})(date || (date = {}));
var http;
(function (f) {
  f.methodType = {
    get: 0,
    post: 1,
    put: 2,
    patch: 3,
    delete: 4,
  };
  f.statusCode = {
    noServer: 0,
    ok: 200,
    created: 201,
    multipleChoices: 300,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    methodNotAllowed: 405,
    notAcceptable: 406,
    unprocessableEntity: 422,
    tooManyRequests: 429,
    internalError: 500,
    serviceUnavailable: 503,
  };
  f.isSuccess = function (l) {
    return l >= f.statusCode.ok && l < f.statusCode.multipleChoices;
  };
  f.repeatRequest = function (l) {
    return (
      -1 ===
      [
        f.statusCode.badRequest,
        f.statusCode.unauthorized,
        f.statusCode.forbidden,
        f.statusCode.unprocessableEntity,
        f.statusCode.notFound,
        f.statusCode.methodNotAllowed,
        f.statusCode.notAcceptable,
        f.statusCode.unprocessableEntity,
      ].indexOf(l)
    );
  };
  f.errCode = {
    stringify: -1,
    network: -2,
    parse: -3,
    timeout: -4,
    unknown: 1,
    idNotValid: 2,
    schoolNotFound: 3,
    userNotFound: 4,
    emailNotValid: 10,
    demoNotAllowed: 11,
    emailExist: 12,
    badSignIn: 20,
    userDeleted: 21,
    disabled: 23,
    abort: 24,
    hostNotAllowed: 25,
    userEmailExist: 30,
    userIdExist: 31,
    passwordTooWeak: 32,
    ownerRoleNeeded: 33,
    emailNotFound: 34,
    emailNotSent: 35,
    codeExpired: 36,
    codeNotFound: 37,
    timetableFileNotValid: 40,
    timetableNotFound: 41,
  };
  f.cmds = {
    ver: "ForceNewVersion",
    web: "GoToWebSite",
    cache: "ClearCache",
    abort: "Abort",
    save: "Save",
  };
})(http || (http = {}));
var obj;
(function (f) {
  function l(b) {
    return Object.keys(b);
  }
  function g(b, d) {
    return b.props.filter(function (b) {
      return !!d.find(function (d) {
        return d === b.name;
      });
    });
  }
  function b() {
    for (var b = [], f = 0; f < arguments.length; f++) b[f] = arguments[f];
    return d.apply(void 0, __spreadArray([{}], b, !1));
  }
  function d(b) {
    for (var d = [], f = 1; f < arguments.length; f++) d[f - 1] = arguments[f];
    f = function (d) {
      d &&
        l(d).forEach(function (f) {
          b[f] = d[f];
        });
    };
    for (var h = 0; h < d.length; h++) f(d[h]);
    return b;
  }
  function h(b) {
    b = b.type;
    return (
      b === f.propType.arr ||
      b === f.propType.idArr ||
      b === f.propType.intArrArr ||
      b === f.propType.intArr ||
      b === f.propType.strArr
    );
  }
  function k(b) {
    return b.type === f.propType.arr || b.type === f.propType.object;
  }
  function p(b) {
    return b.props.filter(function (b) {
      return k(b);
    });
  }
  function n(b) {
    return b.props.filter(function (b) {
      return b.type === f.propType.arr;
    });
  }
  function q(b) {
    var d = [];
    p(b).forEach(function (b) {
      return d.push.apply(d, __spreadArray([b.desc], q(b.desc), !1));
    });
    return d;
  }
  function u(b) {
    return b
      ? b.filter(function (b) {
          return !y(b);
        })
      : [];
  }
  function t(b, d, f, h) {
    var k = h.notDeleted,
      g = h.objectsPerDescriptions;
    if (h.isPrepared && b.entireName) return d[b.entireName].slice();
    if (
      f.props.some(function (d) {
        return d.desc === b;
      })
    )
      return ((d = d[b.arrayName] || []), k && (d = u(d)), d);
    if (
      (h =
        g &&
        g.find(function (d) {
          return d[0] === b;
        }))
    )
      return h[1];
    var p = [];
    K(f, d, function (d, f) {
      d === b && p.push.apply(p, k ? u(f) : f);
    });
    g && g.push([b, p]);
    return p;
  }
  function x(b, d) {
    return d.entireName ? b[d.entireName].slice() : u(b[d.arrayName]);
  }
  function y(b) {
    return b.entityState === f.entityState.deleted;
  }
  function z(b) {
    b.entityState = f.entityState.added;
  }
  function A(b) {
    b.entityState = f.entityState.deleted;
  }
  function B(b, d) {
    b.entityState = d;
    C(b);
  }
  function C(b) {
    b.updatedMs = Date.now();
  }
  function G(b, d) {
    delete b[d];
  }
  function P(b) {
    return b.props.filter(function (b) {
      return !!b.refDesc;
    });
  }
  function H(b, d) {
    return b.getRefDesc ? b.getRefDesc(d) : b.refDesc;
  }
  function I(b, d, f) {
    return (d = H(d, f)) ? x(b, d) : [];
  }
  function J(d, h) {
    void 0 === d && (d = "id");
    return b(
      {
        name: d,
        type: f.propType.id,
        default: "",
      },
      h,
    );
  }
  function Q(b) {
    return b.map(function (b) {
      return b.id;
    });
  }
  function K(b, d, f, h) {
    var k = function (b) {
        var k = d[b.name];
        if (!k) return "continue";
        var g = b.desc;
        f(g, k);
        k.forEach(function (b) {
          return K(g, b, f, h);
        });
      },
      g = 0;
    for (b = h && h.propFunc ? h.propFunc(b, d) : n(b); g < b.length; g++)
      k(b[g]);
  }
  function D(b, d, h, k) {
    h(b, d);
    var g = function (b) {
        var g = d[b.name];
        g &&
          (b.type === f.propType.object && (g = [g]),
          k && k.skipDel && (g = u(g)),
          g.forEach(function (d) {
            return D(b.desc, d, h, k);
          }));
      },
      n = 0;
    for (b = k && k.propFunc ? k.propFunc(b, d) : p(b); n < b.length; n++)
      g(b[n]);
  }
  function E(b, d, h, k) {
    if (h(b, d)) return [b, d];
    var g = 0;
    for (b = k && k.propFunc ? k.propFunc(b, d) : p(b); g < b.length; g++) {
      var n = b[g],
        q = d[n.name];
      if (q) {
        n.type === f.propType.object && (q = [q]);
        k && k.skipDel && (q = u(q));
        for (var F = 0; F < q.length; F++) {
          var x = E(n.desc, q[F], h, k);
          if (x) return x;
        }
      }
    }
  }
  function N(b, d, f, h) {
    var k = h && h.skipDel;
    b = k ? u(b) : b;
    d = k ? u(d) : d;
    if (b.length !== d.length) return !1;
    k = -1;
    for (var g = 0; g < b.length; g++) {
      var p = b[g],
        n = d[++k];
      if (!R(p, n, f, h)) return !1;
    }
    return !0;
  }
  function R(b, d, f, h) {
    var k = 0;
    for (f = h && h.propFunc ? h.propFunc(f, b) : f.props; k < f.length; k++)
      if ((h = f[k]) && !F(b, d, h)) return !1;
    return !0;
  }
  function F(b, d, k, g) {
    var p = k.name,
      n = k.type;
    b = b[p];
    d = d[p];
    if ((void 0 === b && void 0 === d) || (null === b && null === d)) return !0;
    if ((void 0 === b && null === d) || (null === b && void 0 === d)) return !1;
    if (n === f.propType.date) return b && d && b.getTime() === d.getTime();
    if (n === f.propType.arr) return N(b, d, k.desc, g);
    if (h(k)) return arr.equals(b, d);
    if (n === f.propType.object) return R(b, d, k.desc, g);
    if (b === d) return !0;
    k = aa(k);
    return (b === k && void 0 === d) || (d === k && void 0 === b);
  }
  function M(d, f, h) {
    c.isServer
      ? ((h = b(
          {
            fixDates: !0,
            validate: !0,
          },
          h,
        )),
        O(d, f, h))
      : ((h = b(
          {
            fixDates: !0,
            validate: !1,
            setParent: !0,
          },
          h,
        )),
        S(d, f, h));
    return d;
  }
  function L(d, f, h) {
    var k = b(
      {
        fixDates: !0,
        validate: !0,
      },
      h,
    );
    d.forEach(function (b) {
      return O(b, f, k);
    });
    return d;
  }
  function X(d, h, k) {
    var g = b(
      {
        deep: !0,
        type: f.prepType.use,
        setParent: !0,
      },
      k,
    );
    d.forEach(function (b) {
      return O(b, h, g);
    });
    return d;
  }
  function S(d, h, k) {
    k = b(
      {
        type: f.prepType.use,
        deep: !0,
        setParent: !0,
      },
      k,
    );
    return O(d, h, k);
  }
  function O(b, d, h) {
    var k = h.type === f.prepType.use;
    h.setParent && (b.parent = h.parent);
    k && d.before && d.before(b);
    h.type === f.prepType.minify && (b.parent = void 0);
    (h.propFunc ? h.propFunc(d, b) : d.props).forEach(function (d) {
      return T(b, d, h);
    });
    k && d.after && d.after(b);
    return b;
  }
  function T(d, k, g) {
    var p = g.type === f.prepType.use,
      n = k.name,
      q = d[n];
    if (k.type === f.propType.date && g.fixDates) date.fixDate(d, n);
    else if (k.desc) {
      var F = b(g, {
        parent: g.setParent ? d : void 0,
      });
      if (k.type === f.propType.arr) {
        if (g.type === f.prepType.minify) {
          if (q && 0 === q.length) {
            d[n] = void 0;
            return;
          }
        } else !q && p && (d[n] = []);
        q &&
          0 < q.length &&
          g.deep &&
          q.forEach(function (b) {
            return O(b, k.desc, F);
          });
      } else q && g.deep && O(q, k.desc, F);
    } else
      (g.validate && (ha(k, q) || (d[n] = q = p ? aa(k) : void 0)),
        g.type === f.prepType.use
          ? void 0 === q && (d[n] = q = aa(k))
          : g.type === f.prepType.minify &&
            (h(k)
              ? q && 0 === q.length && (d[n] = void 0)
              : q === aa(k) && (d[n] = void 0)));
  }
  function ma(b, d, f, h) {
    ia(b, d, f, h);
    ba(d, h);
    void 0 !== h.type && O(d, f, h);
    return d;
  }
  function Y(d, f, h, k) {
    return ma(d, f, h, b({}, k));
  }
  function na(b, d, f, h) {
    var k = [],
      g = 0;
    for (b = h.skipDel ? u(b) : b; g < b.length; g++)
      k.push(ma(b[g], {}, f.desc, h));
    d[f.name] = k;
    return d;
  }
  function ia(b, d, f, h) {
    ja(b, d, f, h.propFunc ? h.propFunc(f, b) : f.props, h);
  }
  function ja(d, k, g, p, n) {
    n.setParent && (k.parent = n.parent);
    n.setSourceId && (k.sourceId = d.id);
    for (g = 0; g < p.length; g++) {
      var q = p[g],
        F = q.name,
        u = q.type,
        x = q.desc,
        t = d[F];
      if (h(q)) {
        if (!x || n.deep)
          t && 0 !== t.length
            ? x
              ? ((u = b(
                  n,
                  n.setParent
                    ? {
                        parent: k,
                      }
                    : void 0,
                )),
                na(t, k, q, u))
              : (k[F] = u === f.propType.intArrArr ? oa(d) : t.slice())
            : (k[F] = t ? [] : void 0);
      } else
        u === f.propType.object
          ? void 0 !== t &&
            n.deep &&
            ((q = {}),
            (u = b(n, {
              parent: n.setParent ? n.parent : void 0,
            })),
            Y(t, q, x, u),
            (k[F] = q))
          : (k[F] = u === f.propType.date && t ? new Date(t.getTime()) : t);
    }
  }
  function oa(b) {
    var d = [];
    b.marks &&
      b.marks.forEach(function (b) {
        return d.push(b.slice());
      });
    return d;
  }
  function pa(d, h) {
    var k = {};
    h = b(
      {
        type: f.prepType.use,
        newId: !0,
        setAdd: !0,
      },
      h,
    );
    ba(k, h);
    S(k, d, h);
    return k;
  }
  function ca(d, f, h) {
    return Y(
      d,
      {},
      f,
      b(
        {
          deep: !0,
          skipDel: !0,
        },
        h,
      ),
    );
  }
  function ka(b) {
    var d = b.parent;
    return d ? ka(d) : b;
  }
  function ba(b, d) {
    d && (d.newId && (b.id = str.id()), d.setAdd && z(b));
  }
  function qa(b, d, f) {
    D(f, d, function (d, f) {
      da(b, f, d, []);
    });
  }
  function da(b, d, h, k) {
    var g = 0;
    for (h = P(h); g < h.length; g++) {
      var p = h[g],
        n = ta(b, p, d, k),
        q = d[p.name];
      if (p.type === f.propType.idArr) {
        for (var F = [], u = 0; u < q.length; u++) {
          var x = W(n, q[u]);
          x && F.push(x.id);
        }
        d[p.name] = F;
      } else q && (x = W(n, q)) && (d[p.name] = x.id);
    }
  }
  function ta(b, d, f, h) {
    b = I(b, d, f);
    if (0 < h.length) {
      var k = H(d, f);
      (d = h.find(function (b) {
        return b[0] === k;
      })) && b.push.apply(b, d[1]);
    }
    return b;
  }
  function W(b, d) {
    return b.find(function (b) {
      return b.sourceId === d;
    });
  }
  function ha(b, d) {
    return void 0 === d
      ? !1
      : b.type === f.propType.int
        ? num.isInt(d) &&
          (b.range
            ? d === b.default || (d >= b.range[0] && d <= b.range[1])
            : !0)
        : h(b)
          ? arr.isArray(d)
          : !0;
  }
  function aa(b) {
    var d = b.default;
    if (void 0 === d) {
      var k = b.type;
      k === f.propType.id || k === f.propType.str
        ? (d = "")
        : k === f.propType.int
          ? (d = num.defaultValue)
          : k === f.propType.bool
            ? (d = !1)
            : h(b) && (d = []);
    }
    return d;
  }
  function ra(b, d, f, h, k) {
    ja(d, f, b, h, {});
    k && (f.entityState = d.entityState);
  }
  function la(b, d, h, k, g, p, n, q) {
    var F = q.isPrepared,
      u = b.type,
      x = [];
    ea(d, b, x, !1);
    for (var l = 0; l < x.length; l++) {
      var M = x[l];
      la(M[0], M[1], h, k, g, p, n, {
        isPrepared: F,
      });
    }
    d = Q(d);
    x = [];
    Z(k, u, x, n);
    for (u = 0; u < x.length; u++) {
      l = x[u];
      M = l[0];
      for (
        var y = [],
          va = 0,
          D = t(M, h, k, {
            isPrepared: F,
            notDeleted: F,
            objectsPerDescriptions: q.objectsPerDescriptions,
          });
        va < D.length;
        va++
      ) {
        for (var z = D[va], L = !1, K = 0, E = l[1]; K < E.length; K++) {
          var A = E[K];
          if (!A.getRefDesc || A.getRefDesc(z) === b) {
            var B = z[A.name];
            if (
              B &&
              (A.type === f.propType.idArr
                ? (L = arr.hasOneEqual(B, d)) &&
                  A.updateOnDelete &&
                  ((L = !1),
                  (B = arr.clone(B)),
                  arr.removes(B, d),
                  ua(p, M, A, z, B))
                : A.type === f.propType.id && (L = arr.has(d, B)),
              L)
            )
              break;
          }
        }
        L && y.push(z);
      }
      0 < y.length &&
        (V(M, y, g),
        la(M, y, h, k, g, p, n, {
          isPrepared: F,
        }));
    }
  }
  function ua(b, d, f, h, k) {
    var g = b.find(function (b) {
      return b[0] === d;
    });
    g
      ? (b = g[1].find(function (b) {
          return b[0] === f;
        }))
        ? (b[1].push(h), b[2].push(k))
        : g[1].push([f, [h], [k]])
      : b.push([d, [[f, [h], [k]]]]);
  }
  function Z(b, d, f, h) {
    var k = h(b, d);
    0 < k.length &&
      !f.find(function (d) {
        return d[0] === b;
      }) &&
      f.push([b, k]);
    k = 0;
    for (
      var g = p(b).filter(function (b) {
        return b.desc && b.desc.type !== d;
      });
      k < g.length;
      k++
    )
      Z(g[k].desc, d, f, h);
  }
  function V(b, d, f) {
    if (0 !== d.length) {
      var h = [];
      ea(d, b, h, !1);
      for (var k = 0; k < h.length; k++) {
        var g = h[k];
        V(g[0], g[1], f);
      }
      h = [];
      (k = f.find(function (d) {
        return d[0] === b;
      }))
        ? (h = k[1])
        : f.push([b, h]);
      for (f = 0; f < d.length; f++) arr.addUnique(h, d[f]);
    }
  }
  function ea(b, d, h, k) {
    if (0 !== b.length) {
      var g = function (d) {
          if (d.type !== f.propType.arr) return "continue";
          var g = h.find(function (b) {
            return b[0] === d.desc;
          });
          g || h.push((g = [d.desc, []]));
          for (var p = 0; p < b.length; p++) {
            var n = u(b[p][d.name]);
            n &&
              0 < n.length &&
              (k && ea(n, d.desc, h, k), arr.addUniques(g[1], n));
          }
        },
        n = 0;
      for (d = p(d); n < d.length; n++) g(d[n]);
    }
  }
  f.propType = {
    bool: 1,
    int: 2,
    str: 3,
    date: 4,
    object: 5,
    arr: 6,
    intArr: 7,
    intArrArr: 8,
    strArr: 9,
    id: 10,
    idArr: 11,
  };
  f.prepType = {
    none: 0,
    use: 1,
    minify: 2,
  };
  f.entityState = {
    unchanged: 0,
    added: 1,
    updated: 2,
    deleted: 3,
  };
  f.isObject = function (b) {
    return "object" === typeof b && null !== b;
  };
  f.keys = l;
  f.keysToProps = g;
  f.keyValues = function (b) {
    for (var d = [], f = 0, h = l(b); f < h.length; f++) {
      var k = h[f];
      d.push([k, b[k] + ""]);
    }
    return d;
  };
  f.merge = b;
  f.assign = d;
  f.isArray = h;
  f.isComplex = k;
  f.allowUndefined = function (b) {
    return b.type === f.propType.date || b.type === f.propType.object;
  };
  f.getComplexProps = p;
  f.getComplexArrProps = n;
  f.getPrimitiveProps = function (b) {
    return b.props.filter(function (b) {
      return (
        b.type === f.propType.int ||
        b.type === f.propType.str ||
        b.type === f.propType.bool ||
        b.type === f.propType.id
      );
    });
  };
  f.getAllDescs = q;
  f.notDel = u;
  f.getAll = t;
  f.getAllNotDel = x;
  f.isUnchanged = function (b) {
    return (
      void 0 === b.entityState || b.entityState === f.entityState.unchanged
    );
  };
  f.isAdd = function (b) {
    return b.entityState === f.entityState.added;
  };
  f.isChg = function (b) {
    return b.entityState === f.entityState.updated;
  };
  f.isDel = y;
  f.setUnchg = function (b) {
    b.entityState = f.entityState.unchanged;
  };
  f.setAdd = z;
  f.setChg = function (b) {
    b.entityState = f.entityState.updated;
  };
  f.markAsDeleted = A;
  f.markAllAsDeleted = function (b) {
    b.forEach(function (b) {
      return A(b);
    });
  };
  f.update = function (b) {
    B(b, f.entityState.updated);
  };
  f.del = function (b) {
    B(b, f.entityState.deleted);
  };
  f.setState = B;
  f.updateMs = C;
  f.getValue = function (b, d) {
    return b[d];
  };
  f.setValue = function (b, d, f) {
    b[d] = f;
  };
  f.deleteProperties = function (b, d) {
    for (var f = 0; f < d.length; f++) G(b, d[f]);
  };
  f.deleteProperty = G;
  f.getRefProps = P;
  f.getRefPropDesc = H;
  f.getAllByProp = I;
  f.getArray = function (b, d) {
    return d.parent[b.arrayName];
  };
  f.getParentArray = function (b, d) {
    return d[b.arrayName];
  };
  f.idProp = J;
  f.mandatoryIdProp = function (d, f) {
    void 0 === d && (d = "id");
    return J(
      d,
      b(
        {
          mandatory: !0,
        },
        f,
      ),
    );
  };
  f.strProp = function (d, h) {
    return b(
      {
        name: d,
        type: f.propType.str,
        default: "",
      },
      h,
    );
  };
  f.intProp = function (d, h) {
    return b(
      {
        name: d,
        type: f.propType.int,
        default: 0,
      },
      h,
    );
  };
  f.boolProp = function (d, h) {
    return b(
      {
        name: d,
        type: f.propType.bool,
        default: !1,
      },
      h,
    );
  };
  f.dateProp = function (b, d) {
    void 0 === d && (d = !0);
    return {
      name: b,
      type: f.propType.date,
      mandatory: d,
    };
  };
  f.intArrProp = function (d, h) {
    return b(
      {
        name: d,
        type: f.propType.intArr,
      },
      h,
    );
  };
  f.idArrProp = function (d, h) {
    return b(
      {
        name: d,
        type: f.propType.idArr,
      },
      h,
    );
  };
  f.strArrProp = function (d, h) {
    return b(
      {
        name: d,
        type: f.propType.strArr,
      },
      h,
    );
  };
  f.objProp = function (d, h) {
    return b(
      {
        name: d,
        type: f.propType.object,
      },
      h,
    );
  };
  f.entityArray = function (d, h, k) {
    return b(
      {
        name: d,
        type: f.propType.arr,
        desc: h,
      },
      k,
    );
  };
  f.objectProp = function (d, h, k) {
    return b(
      {
        name: d,
        type: f.propType.object,
        desc: h,
      },
      k,
    );
  };
  f.entityStateProp = {
    name: "entityState",
    type: f.propType.int,
    default: f.entityState.unchanged,
  };
  f.ids = Q;
  f.addObjectsPerDescription = function (b, d, f) {
    if (b && 0 !== b.length) {
      var h = f.find(function (b) {
        return b[0] === d;
      });
      h ? arr.addUniques(h[1], b) : ((h = [d, b]), f.push(h));
    }
  };
  f.eachArr = K;
  f.each = D;
  f.find = E;
  f.has = function (b, d, f, h) {
    return !!E(b, d, f, h);
  };
  f.eqArr = N;
  f.eq = R;
  f.eqProp = F;
  f.preps = function (d, f, h) {
    c.isServer
      ? L(d, f, h)
      : ((h = b(
          {
            fixDates: !0,
            validate: !1,
            setParent: !0,
          },
          h,
        )),
        X(d, f, h));
    return d;
  };
  f.prep = M;
  f.prepPartial = function (d, f, h) {
    h = b(
      {
        propFunc: function (b, d) {
          return g(b, l(d));
        },
      },
      h,
    );
    return M(d, f, h);
  };
  f.prepDates = function (d, h, k) {
    var g = b(
      {
        deep: !0,
        type: f.prepType.none,
        fixDates: !0,
      },
      k,
    );
    arr.isArray(d)
      ? d.forEach(function (b) {
          return O(b, h, g);
        })
      : O(d, h, g);
    return d;
  };
  f.minify = function (d, h, k) {
    k = b(
      {
        deep: !0,
        type: f.prepType.minify,
      },
      k,
    );
    O(d, h, k);
    return d;
  };
  f.prepArrForUsage = X;
  f.prepForUsage = S;
  f.copyTo = Y;
  f.copyArrayTo = na;
  f.copyValuesTo = ia;
  f.copyPropsTo = ja;
  f.getMarksCopy = oa;
  f.newEntityToUse = pa;
  f.newChildToUse = function (b, d) {
    return pa(b, {
      setParent: !0,
      parent: d,
    });
  };
  f.newChildCloneToUse = function (d, h, k, g) {
    return ca(
      d,
      h,
      b(
        {
          type: f.prepType.use,
          newId: !0,
          setAdd: !0,
          setParent: !0,
          parent: k,
        },
        g,
      ),
    );
  };
  f.newChildCopy = function (d, f, h, k) {
    return Y(
      d,
      {},
      f,
      b(
        {
          newId: !0,
          setAdd: !0,
          setParent: !0,
          parent: h,
        },
        k,
      ),
    );
  };
  f.copy = function (d, f, h) {
    return Y(
      d,
      {},
      f,
      b(
        {
          deep: !1,
          skipDel: !0,
        },
        h,
      ),
    );
  };
  f.clone = ca;
  f.newCopy = function (d, f, h) {
    return Y(
      d,
      {},
      f,
      b(
        {
          newId: !0,
          setAdd: !0,
          skipDel: !0,
        },
        h,
      ),
    );
  };
  f.cloneAndMinifyArray = function (d, h, k) {
    var g = [];
    k = b(
      {
        type: f.prepType.minify,
      },
      k,
    );
    for (var p = 0; p < d.length; p++) g.push(ca(d[p], h, k));
    return g;
  };
  f.cloneAndMinify = function (d, h, k) {
    return ca(
      d,
      h,
      b(
        {
          type: f.prepType.minify,
        },
        k,
      ),
    );
  };
  f.newCloneToUse = function (b, d, f) {
    b = ca(b, d, {
      setSourceId: !0,
      setParent: !0,
      parent: f,
    });
    b = S(b, d);
    D(d, b, function (b, d) {
      ba(d, {
        newId: !0,
        setAdd: !0,
      });
    });
    qa(ka(b), b, d);
    D(d, b, function (b, d) {
      return G(d, "sourceId");
    });
    return S(b, d);
  };
  f.setNewOptions = ba;
  f.fixRefIds = qa;
  f.fixRefProps = da;
  f.validateValue = ha;
  f.getDefaultValue = aa;
  f.newUpdateCopy = function (b, d, f, h) {
    var p = {};
    ra(
      b,
      d,
      p,
      f ||
        arr.filter(g(b, l(d)), function (b) {
          return !k(b);
        }),
      h,
    );
    return p;
  };
  f.copyUpdateProps = ra;
  f.setDeleteUpdateReferences = la;
  f.setReferenceProperties = Z;
  f.addDelete = V;
  f.setChildrenPerDescriptions = ea;
  f.deleteEach = function (b, d) {
    K(b, d, function (b, d) {
      return arr.filter(d, function (b) {
        return !y(b);
      });
    });
  };
})(obj || (obj = {}));
var e;
(function (f) {
  function l(b) {
    void 0 === b && (b = "schoolId");
    return obj.mandatoryIdProp(b);
  }
  function g(b, d) {
    return obj.merge(obj.intProp(b, d), {
      default: num.noValue,
    });
  }
  function b() {
    return [f.nameProp, f.shortProp];
  }
  function d() {
    return obj.strProp("text", {
      allowHtml: !0,
      allowDivHack: !0,
    });
  }
  function h() {
    return obj.strProp("shortText", {
      allowHtml: !0,
      allowDivHack: !0,
    });
  }
  function k() {
    return [d(), h()];
  }
  function p(b) {
    return obj.intProp(
      "position",
      obj.merge(
        {
          mandatory: !0,
        },
        b,
      ),
    );
  }
  function n() {
    return obj.strProp("color", {
      mandatory: !0,
      displayName: "Color",
    });
  }
  function q() {
    return [obj.mandatoryIdProp()].concat(p(), b(), n());
  }
  function u() {
    return q().concat(f.marksProps);
  }
  function t() {
    return [x(), y()];
  }
  function x() {
    return obj.dateProp("createdAt");
  }
  function y() {
    return obj.dateProp("updatedAt");
  }
  function z(b) {
    return obj.mandatoryIdProp(
      "creatorId",
      obj.merge(
        {
          mandatory: !0,
        },
        b,
      ),
    );
  }
  function A(b) {
    return obj.idProp(
      "editorId",
      obj.merge(
        {
          mandatory: !0,
        },
        b,
      ),
    );
  }
  function B() {
    return obj.strProp("tags", {
      displayName: "Tags",
    });
  }
  function C() {
    return obj.strProp("notes", {
      displayName: "Notes",
    });
  }
  function G() {
    return obj.strProp("customId", {
      displayName: "Custom ID",
    });
  }
  function P(b) {
    return H(obj.notDel(b.classes));
  }
  function H(b, d, f) {
    void 0 === d && (d = !1);
    void 0 === f && (f = !0);
    for (var h = [], k = 0; k < b.length; k++) h.push.apply(h, J(b[k], d, f));
    return h;
  }
  function I(b, d) {
    void 0 === d && (d = !1);
    for (var f = [], h = 0; h < b.length; h++) {
      var k = b[h];
      k = d ? k.groups : obj.notDel(k.groups);
      f.push.apply(f, k);
    }
    return f;
  }
  function J(b, d, f) {
    void 0 === d && (d = !1);
    void 0 === f && (f = !0);
    b = f
      ? b.groupSets
      : b.groupSets.filter(function (b) {
          return !!b.position;
        });
    b = d ? b : obj.notDel(b);
    return I(b, d);
  }
  function Q(b) {
    return obj.notDel(b.students);
  }
  function K(b) {
    for (var d = [], f = 0; f < b.length; f++) d.push.apply(d, Q(b[f]));
    return d;
  }
  function D(b) {
    b.groupedPeriods = [];
  }
  function E(b) {
    b.sortedGroups = L(b);
    b.sortedStudents = W(b.students);
  }
  function N(b, d) {
    E(X(b));
  }
  function R(b, d) {
    E(b.parent);
  }
  function F(b, d) {
    E(b.parent);
  }
  function M(b, d) {
    void 0 === d && (d = !0);
    b = W(b.groupSets);
    d ||
      arr.filter(b, function (b) {
        return !!b.position;
      });
    return b;
  }
  function L(b, d) {
    void 0 === d && (d = !0);
    var f = [];
    M(b, d).forEach(function (b) {
      return f.push.apply(f, W(b.groups));
    });
    return f;
  }
  function X(b) {
    return b.parent.parent;
  }
  function S(b) {
    var d = b.parent;
    b.subject = Z(d.subjects, b.subjectId);
    b.teachers = V(d.teachers, b.teacherIds);
    b.groups = V(d.groups, b.groupIds);
    b.rooms = V(d.rooms, b.roomIds);
    b.moreRooms = V(d.rooms, b.moreRoomIds);
  }
  function O(b) {
    var d = b.parent,
      f = d.parent;
    b.subjectId = d.subjectId;
    b.teacherIds = arr.joinComma(d.teacherIds);
    b.groupIds = arr.joinComma(d.groupIds);
    b.length = d.length;
    b.desiredRoomIds = arr.joinComma(d.roomIds);
    b.moreRoomIds = arr.joinComma(d.moreRoomIds);
    T(f, b);
  }
  function T(b, d) {
    ma(b, d, d.dayId);
    Y(b, d, d.periodId);
    na(b, d);
  }
  function ma(b, d, f) {
    d.day = Z(b.days, f);
  }
  function Y(b, d, f) {
    d.period = Z(b.periods, f);
  }
  function na(b, d) {
    d.rooms = V(b.rooms, d.roomIds);
  }
  function ia(b) {
    b.cards = V(b.parent.cards, b.cardIds);
  }
  function ja(b) {
    return void 0 === b.role || b.role === f.roleType.owner;
  }
  function oa(b) {
    return b.role === f.roleType.creator;
  }
  function pa(b, d) {
    return Math.min(b, f.maxProducts);
  }
  function ca(b) {
    return b.some(function (b) {
      return "position" === b.name;
    });
  }
  function ka(b) {
    return (
      b === f.type.subject ||
      b === f.type.room ||
      b === f.type.teacher ||
      b === f.type.class
    );
  }
  function ba(b) {
    return [f._class, f.teacher, f.room, f.subject].find(function (d) {
      return d.type === b;
    });
  }
  function qa(b, d) {
    return ca(d.props) && b && 0 !== b.length
      ? d === f.period
        ? ta(b)
        : da(b)
      : b;
  }
  function da(b) {
    return b.sort(function (b, d) {
      return (b.position || 0) - (d.position || 0);
    });
  }
  function ta(b) {
    return b.sort(function (b, d) {
      return (
        arr.sort(b.position, d.position) ||
        arr.sort(b.startHour, d.startHour) ||
        arr.sort(b.startMinute, d.startMinute) ||
        arr.sort(b.endHour, d.endHour) ||
        arr.sort(b.endMinute, d.endMinute)
      );
    });
  }
  function W(b) {
    return da(obj.notDel(b));
  }
  function ha(b) {
    return b
      ? b.filter(function (b) {
          return !b.entityId && !obj.isDel(b);
        })
      : [];
  }
  function aa(b) {
    return b.filter(function (b) {
      return !obj.isDel(b) && !!b.entityId;
    });
  }
  function ra(b) {
    return da(ha(b));
  }
  function la(b) {
    return ha(b.periods);
  }
  function ua(b) {
    for (var d = 0, f = b.clips, h = [], k = f.length; d < k; d++) {
      var g = f[d],
        p = g.cardIds;
      b = p.length;
      for (
        var n = 0,
          q = function () {
            var b = p[n];
            if (
              h.find(function (d) {
                return d === b;
              })
            )
              return (arr.remove(f, g), (k = f.length), d--, "break");
            h.push(b);
          };
        n < b && "break" !== q();
        n++
      );
    }
  }
  function Z(b, d) {
    return d
      ? b.find(function (b) {
          return b.id === d;
        })
      : void 0;
  }
  function V(b, d) {
    var f = [];
    if (!d) return f;
    for (
      var h = function (d) {
          var h = b.find(function (b) {
            return b.id === d;
          });
          h && f.push(h);
        },
        k = 0;
      k < d.length;
      k++
    )
      h(d[k]);
    return f;
  }
  function ea(b) {
    return obj.ids(b);
  }
  function wa(b) {
    return b.map(function (b) {
      return b.name;
    });
  }
  function xa(b) {
    return b.map(function (b) {
      return b.shortName;
    });
  }
  function ya(b) {
    return "-" === b.shortName;
  }
  function za(b, d, f, h) {
    var k = {};
    Aa(
      b,
      d,
      k,
      f ||
        arr.filter(obj.keysToProps(b, obj.keys(d)), function (b) {
          return !obj.isComplex(b);
        }),
      h,
    );
    return k;
  }
  function Aa(b, d, f, h, k) {
    obj.copyPropsTo(d, f, b, h, {});
    k && (f.entityState = d.entityState);
  }
  function Ba(b, d, h) {
    for (
      var k = [], g = 0, p = obj.keysToProps(b, obj.keys(h));
      g < p.length;
      g++
    ) {
      var n = p[g];
      if (void 0 !== h[n.name] && !obj.eqProp(d, h, n)) {
        arr.addUnique(k, n);
        var q = b,
          F = k;
        q === f.period
          ? arr.has(f.intervalProps, n)
            ? arr.addUniques(F, f.intervalProps)
            : arr.has(f.periodEntityProps, n) &&
              arr.addUniques(F, f.periodEntityProps)
          : q === f.card &&
            arr.has(f.cardPosProps, n) &&
            arr.addUniques(F, f.cardPosProps);
      }
    }
    return k;
  }
  function Da() {
    return "Blue Green Red Violet Orange Pink Cyan Brown Gray Dark".split(" ");
  }
  function Ca(b) {
    var d = "Classes";
    b === f.vMod.t
      ? (d = "Teachers")
      : b === f.vMod.r
        ? (d = "Rooms")
        : b === f.vMod.s && (d = "Subjects");
    return d;
  }
  function Ea(b) {
    return void 0 === b.entityType ? f.type.class : b.entityType;
  }
  function Fa() {
    return "#000000 #a52a00 #c4b4ff #004f13 #00305e #00008b #4b0082 #593c00 #800022 #ff6820 #8b8b00 #009300 #20a5a6 #2b2bdc #8181c3 #414141 #ee2929 #ffad5b #87f487 #00a8ff #55eced #cd89dc #800080 #7f7f7f #ffc0c0 #ffd700 #f2f27a #49db49 #40e0d0 #94e5ff #d5ba8a #c0c0c0".split(
      " ",
    );
  }
  f.version = "2.0.0.0";
  f.aM = {
    w: 0,
    m: 1,
    p: 2,
  };
  f.logType = {
    debug: 0,
    info: 1,
    warn: 2,
    err: 3,
  };
  f.logCategory = {
    default: 0,
    system: 1,
    email: 2,
    db: 3,
    security: 4,
    account: 5,
    file: 6,
    route: 7,
    client: 8,
    geoIp: 9,
    solver: 10,
  };
  f.syncState = {
    yes: 0,
    no: 1,
    client: 2,
  };
  f.planType = {
    free: 1,
    basic: 2,
    premium: 3,
    premiumPlus: 4,
  };
  f.currencyType = {
    dollar: 0,
    euro: 1,
    gbp: 2,
    cad: 3,
    aud: 4,
  };
  f.getCurrencyChar = function (b) {
    return f.currencyType.euro === b
      ? "\u20ac"
      : f.currencyType.gbp === b
        ? "\u00a3"
        : f.currencyType.cad === b
          ? "CAD"
          : f.currencyType.aud === b
            ? "AUD"
            : "$";
  };
  f.getCurrencyString = function (b) {
    return b === f.currencyType.euro
      ? "EUR"
      : b === f.currencyType.gbp
        ? "GBP"
        : b === f.currencyType.cad
          ? "CAD"
          : b === f.currencyType.aud
            ? "AUD"
            : "USD";
  };
  f.priceGroup = {
    poor: 1,
    rich: 2,
  };
  f.demo = {
    email: "demo@primetimetable.com",
    username: "demo",
    userId: "8c5047a2-85f8-4c21-a9c9-4314b261a6d1",
    schoolId: "23045e4b-ac50-4ba5-bf99-7baa8abdb598",
  };
  f.openType = {
    open: 1,
    new: 1,
    copy: 2,
    upload: 3,
  };
  f.changeViewType = {
    no: 1,
    view: 2,
    mesh: 3,
  };
  f.roleType = {
    viewer: 0,
    creator: 10,
    owner: 20,
    a: 30,
  };
  f.markTy = {
    a: 0,
    f: 1,
    u: 2,
    m: 3,
  };
  f.vMod = {
    c: 0,
    t: 1,
    r: 2,
    s: 3,
  };
  f.tf = {
    lN: 0,
    l12: 1,
    l24: 2,
    n: 3,
    h12: 4,
    h24: 5,
  };
  f.cardTextType = {
    _class: 0,
    teacher: 1,
    room: 2,
    subject: 3,
    group: 4,
  };
  f.infTy = {
    i: 0,
    w: 1,
    e: 2,
  };
  f.toolTy = {
    n: 0,
    p: 1,
    s: 2,
    m: 3,
  };
  f.lengthType = {
    name: 0,
    shortName: 1,
  };
  f.borderType = {
    rounded: 0,
    squared: 1,
    noneRounded: 2,
    noneSquared: 3,
  };
  f.markerType = {
    forbidden: "forbidden",
    unwanted: "unwanted",
    mandatory: "mandatory",
    eraser: "eraser",
  };
  f.enDash = "&ndash;";
  f.emDash = "&mdash;";
  f.minus = "-";
  f.plus = "+";
  f.introVideos =
    "https://www.youtube.com/watch?v=Izb7xSVpIDE&list=PLKSBn_5RtlMYzo0SSN1BdzSstIRxqA2GS";
  f.timetableIds = {
    small: "b918a5b4-7da5-4809-9e51-1722b3ea3207",
    example1: "69e5bf8d-74a5-4984-b9a0-03d59c806a7d",
  };
  f.passwordCriteria =
    "A password must meet the following criteria:<ul><li>At least 8 characters long</li><li>Include at least one lowercase letter (a-z)</li><li>Include at least one digit (0-9)</li></ul>";
  f.unknownError =
    "Ooops, something went wrong. Please try again or contact us.";
  f.type = {
    class: 1,
    teacher: 2,
    room: 3,
    subject: 4,
    timetable: 5,
    period: 6,
    day: 7,
    groupSet: 8,
    group: 9,
    student: 10,
    activity: 11,
    card: 12,
    clip: 13,
    cardStyle: 14,
    viewEntity: 15,
    user: 16,
    file: 17,
    userOptions: 18,
    email: 19,
    school: 20,
    country: 21,
    post: 22,
    view: 23,
  };
  f.timetableType = {
    default: 0,
    example: 1,
  };
  f.difficulty = {
    low: 0,
    medium: 1,
    high: 2,
  };
  f.schoolIdProp = l;
  f.constraintIntProp = g;
  f.changedKeysProp = {
    name: "changedKeys",
    type: obj.propType.strArr,
  };
  f.nameProp = obj.strProp("name", {
    allowHtml: !0,
    displayName: "Name",
  });
  f.shortProp = obj.strProp("shortName", {
    allowHtml: !0,
    displayName: "Short",
  });
  f.nameShortProps = b;
  f.textProp = d;
  f.shortTextProp = h;
  f.textShortProps = k;
  f.posProp = p;
  f.colorProp = n;
  f.marks = {
    name: "marks",
    type: obj.propType.intArrArr,
  };
  f.maxUnwantedPerCycle = g("maxUnwantedPerCycle");
  f.maxUnwantedPerDay = g("maxUnwantedPerDay");
  f.minMandatoryPerCycle = g("minMandatoryPerCycle");
  f.minMandatoryPerDay = g("minMandatoryPerDay");
  f.marksProps = [
    f.maxUnwantedPerCycle,
    f.maxUnwantedPerDay,
    f.minMandatoryPerCycle,
    f.minMandatoryPerDay,
    f.marks,
  ];
  f.viewEntityProps = u;
  f.timeStampProps = t;
  f.createdAtProp = x;
  f.updatedAtProp = y;
  f.creatorIdProp = z;
  f.editorIdProp = A;
  f.viewEntity = {
    type: f.type.viewEntity,
    display: "view entity",
    props: u(),
  };
  f.day = {
    type: f.type.day,
    display: "day",
    props: [obj.mandatoryIdProp()].concat(p(), b()),
    arrayName: "days",
  };
  f.startHourProp = obj.intProp("startHour");
  f.startMinProp = obj.intProp("startMinute");
  f.endHourProp = obj.intProp("endHour");
  f.endMinProp = obj.intProp("endMinute");
  var U = obj.idProp("entityId", {
      refDesc: f.viewEntity,
      getRefDesc: function (b) {
        return ba(b.entityType);
      },
    }),
    fa = obj.intProp("entityType"),
    sa = obj.boolProp("showCustom");
  f.intervalProps = [
    f.startHourProp,
    f.startMinProp,
    f.endHourProp,
    f.endMinProp,
  ];
  f.periodEntityProps = [U, fa];
  f.period = {
    type: f.type.period,
    display: "period",
    props: [obj.mandatoryIdProp()].concat(
      p(),
      b(),
      f.intervalProps,
      obj.idProp("dayId", {
        refDesc: f.day,
      }),
      f.periodEntityProps,
      sa,
    ),
    arrayName: "periods",
    after: D,
  };
  f.subjectTagsProp = B();
  f.subjectNotesProp = C();
  f.subjectCustomIdProp = G();
  f.difficultyProp = obj.intProp("difficulty", {
    default: f.difficulty.medium,
    range: [0, 2],
    displayName: "Difficulty",
  });
  f.allowMorePerDayProp = obj.boolProp("allowMorePerDay", {
    displayName: "Taught more than once a day",
  });
  f.insertDayOff2Prop = obj.boolProp("insertDayOff2", {
    displayName: "Insert day off if taught 2 times per cycle",
  });
  f.insertDayOff3Prop = obj.boolProp("insertDayOff3", {
    displayName: "Insert day off if taught 3 times per cycle",
  });
  f.excludeStatsProp = obj.boolProp("excludeStats", {
    displayName: "Exclude from statistics",
  });
  f.excludeGeneratorProp = obj.boolProp("excludeGenerator", {
    displayName: "Exclude from the generator and notifications",
  });
  f.subject = {
    type: f.type.subject,
    display: "subject",
    props: q().concat(
      f.subjectTagsProp,
      f.subjectNotesProp,
      f.subjectCustomIdProp,
      f.difficultyProp,
      f.allowMorePerDayProp,
      f.insertDayOff2Prop,
      f.insertDayOff3Prop,
      f.excludeStatsProp,
      f.excludeGeneratorProp,
      f.marksProps,
    ),
    arrayName: "subjects",
  };
  f.roomTagsProp = B();
  f.roomNotesProp = C();
  f.roomCustomIdProp = G();
  f.capacityProp = g("capacity", {
    displayName: "Capacity",
    range: [1, 200],
  });
  f.buildingProp = obj.strProp("building", {
    displayName: "Building",
  });
  f.room = {
    type: f.type.room,
    display: "room",
    props: q().concat(
      f.roomTagsProp,
      f.roomNotesProp,
      f.roomCustomIdProp,
      f.capacityProp,
      f.buildingProp,
      f.marksProps,
    ),
    arrayName: "rooms",
  };
  f.teacherTagsProp = B();
  f.teacherNotesProp = C();
  f.teacherCustomIdProp = G();
  U = g("maxInRow", {
    displayName: "Max. activities in a row",
    range: [1, 30],
  });
  fa = g("maxGapsPerCycle", {
    displayName: "Max. gaps per cycle",
    range: [0, 100],
  });
  sa = g("maxGapsPerDay", {
    displayName: "Max. gaps per day",
    range: [0, 30],
  });
  var Ga = g("allowGapsAfter", {
    displayName: "Min. activities to allow gaps",
    range: [0, 30],
  });
  f.gapConstraints = [U, fa, sa, Ga];
  U = g("maxDeviation", {
    displayName: "Max. deviation from average daily load",
    range: [0, 30],
  });
  fa = g("minPerDay", {
    displayName: "Min. activities per day",
    range: [0, 30],
  });
  sa = g("maxPerDay", {
    displayName: "Max. activities per day",
    range: [0, 40],
  });
  f.loadConstraints = [U, fa, sa];
  U = g("maxBuildingMoves", {
    displayName: "Max. moves between buildings",
    range: [0, 10],
  });
  fa = obj.boolProp("countAllMoves", {
    displayName: "Count all moves",
  });
  f.buildingConstraints = [U, fa];
  U = f.gapConstraints.concat(f.loadConstraints, f.buildingConstraints);
  f.teacher = {
    type: f.type.teacher,
    display: "teacher",
    collectionName: "teachers",
    props: q().concat(
      f.teacherTagsProp,
      f.teacherNotesProp,
      f.teacherCustomIdProp,
      U,
      f.marksProps,
    ),
    arrayName: "teachers",
  };
  f.groupCustomIdProp = G();
  f.group = {
    type: f.type.group,
    display: "group",
    props: [obj.mandatoryIdProp()].concat(
      p({
        mandatory: !1,
      }),
      b(),
      f.groupCustomIdProp,
    ),
    arrayName: "groups",
    entireName: "groups",
    after: N,
    onChange: N,
  };
  f.groupSet = {
    type: f.type.groupSet,
    display: "group set",
    props: [obj.mandatoryIdProp()].concat(
      p({
        mandatory: !1,
      }),
      obj.entityArray("groups", f.group, {
        mandatory: !0,
      }),
    ),
    arrayName: "groupSets",
    after: R,
    onChange: R,
  };
  f.studentGroupIds = obj.idArrProp("groupIds", {
    refDesc: f.group,
  });
  f.student = {
    type: f.type.student,
    display: "student",
    props: [obj.mandatoryIdProp()].concat(p(), b(), f.studentGroupIds),
    arrayName: "students",
    after: F,
    onChange: F,
  };
  f.classTagsProp = B();
  f.classNotesProp = C();
  f.classCustomIdProp = G();
  f.startOn1Prop = obj.boolProp("startOnFirstPeriod", {
    displayName: "Start on 1st period",
  });
  f.forbidGapsProp = obj.boolProp("forbidGaps", {
    displayName: "Forbid gaps",
  });
  f.groupsFinishTogetherProp = obj.boolProp("groupsFinishTogether", {
    displayName: "Groups finish at the same time",
  });
  f.maxDiffProp = g("maxDiff", {
    displayName: "Allowed difference between max. and min. daily activities",
    range: [0, 10],
  });
  f._class = {
    type: f.type.class,
    display: "class",
    props: q().concat(
      f.classTagsProp,
      f.classNotesProp,
      f.classCustomIdProp,
      f.startOn1Prop,
      f.forbidGapsProp,
      f.groupsFinishTogetherProp,
      f.maxDiffProp,
      obj.entityArray("groupSets", f.groupSet, {
        mandatory: !0,
      }),
      obj.entityArray("students", f.student),
      f.marksProps,
    ),
    arrayName: "classes",
    after: E,
  };
  f.cardDayId = obj.idProp("dayId", {
    refDesc: f.day,
    refName: "day",
  });
  f.cardPeriodId = obj.idProp("periodId", {
    refDesc: f.period,
    refName: "period",
  });
  f.cardRoomIds = obj.idArrProp("roomIds", {
    refDesc: f.room,
  });
  f.cardPinned = obj.boolProp("pinned");
  f.cardPosProps = [f.cardDayId, f.cardPeriodId, f.cardRoomIds];
  f.cardDayPerPos = [f.cardDayId, f.cardPeriodId];
  f.card = {
    type: f.type.card,
    display: "card",
    props: [obj.mandatoryIdProp()].concat(f.cardPosProps, f.cardPinned, k()),
    arrayName: "cards",
    entireName: "cards",
    deleteParentWhenEmpty: !0,
    after: O,
    onChange: function (b, d) {
      O(b);
    },
  };
  f.teacherIds = obj.idArrProp("teacherIds", {
    refDesc: f.teacher,
    refName: "teachers",
  });
  f.groupIds = obj.idArrProp("groupIds", {
    refDesc: f.group,
    refName: "groups",
  });
  f.roomIds = obj.idArrProp("roomIds", {
    refDesc: f.room,
    refName: "rooms",
  });
  f.moreRoomIds = obj.idArrProp("moreRoomIds", {
    refDesc: f.room,
    refName: "moreRooms",
  });
  f.activity = {
    type: f.type.activity,
    display: "activity",
    props: [obj.mandatoryIdProp()].concat(
      obj.mandatoryIdProp("subjectId", {
        refDesc: f.subject,
        refName: "subject",
      }),
      f.teacherIds,
      f.groupIds,
      obj.intProp("length", {
        default: 1,
      }),
      f.roomIds,
      f.moreRoomIds,
      obj.entityArray("cards", f.card, {
        mandatory: !0,
      }),
    ),
    arrayName: "activities",
    after: S,
    onChange: function (b, d) {
      S(b);
    },
  };
  f.card.parentDesc = f.activity;
  f.cardIdsProp = obj.idArrProp("cardIds", {
    refDesc: f.card,
    refName: "cards",
    mandatory: !0,
  });
  f.clip = {
    type: f.type.clip,
    display: "clip",
    props: [obj.mandatoryIdProp()].concat(f.cardIdsProp),
    arrayName: "clips",
    after: ia,
    onChange: function (b, d) {
      ia(b);
    },
  };
  f.view = {
    type: f.type.view,
    display: "view",
    props: [obj.mandatoryIdProp()].concat(
      p(),
      b(),
      obj.boolProp("isDefault"),
      obj.boolProp("hiddenInApp"),
      obj.boolProp("hiddenOnWeb"),
      obj.intProp("entityType", {
        default: f.type.class,
      }),
      obj.idArrProp("entityIds", {
        refDesc: f.viewEntity,
        getRefDesc: function (b) {
          return ba(b.entityType);
        },
        updateOnDelete: !0,
      }),
      obj.idArrProp("excludedDayIds", {
        refDesc: f.day,
        updateOnDelete: !0,
      }),
      obj.idArrProp("excludedPeriodIds", {
        refDesc: f.period,
        updateOnDelete: !0,
      }),
    ),
    arrayName: "views",
  };
  f.cardStyle = {
    type: f.type.cardStyle,
    display: "style",
    props: [obj.mandatoryIdProp()].concat(
      obj.intProp("viewType"),
      obj.boolProp("individual"),
      obj.intProp("backgroundType"),
      obj.intProp("borderType"),
      obj.intArrProp("lengthTypes", {
        mandatory: !0,
      }),
      obj.intArrProp("entityTypes", {
        mandatory: !0,
      }),
      obj.idProp("viewId", {
        refDesc: f.view,
      }),
    ),
    arrayName: "cardStyles",
  };
  f.timetableName = obj.strProp("name", {
    allowHtml: !0,
    allowDivHack: !0,
  });
  f.timetableDescription = obj.strProp("description", {
    allowHtml: !0,
  });
  f.tagsArrayProp = obj.strArrProp("tags");
  f.timetableDelProp = obj.boolProp("deleted");
  U = [obj.mandatoryIdProp()].concat(
    f.timetableName,
    f.timetableDescription,
    f.tagsArrayProp,
    obj.boolProp("published"),
    f.timetableDelProp,
    t(),
  );
  f.file = {
    type: f.type.file,
    display: "timetable",
    props: U.concat(
      obj.intProp("type", {
        default: f.timetableType.default,
      }),
    ),
  };
  f.daysProp = obj.entityArray("days", f.day, {
    mandatory: !0,
  });
  f.periodsProp = obj.entityArray("periods", f.period, {
    mandatory: !0,
  });
  f.cardStylesProp = obj.entityArray("cardStyles", f.cardStyle);
  f.schoolNameProp = obj.strProp("schoolName", {
    allowHtml: !0,
    allowDivHack: !0,
  });
  f.yearProp = obj.strProp("year", {
    allowHtml: !0,
  });
  f.htmlProp = obj.strProp("html", {
    allowHtml: !0,
  });
  f.cssProp = obj.strProp("css");
  f.timetable = {
    type: f.type.timetable,
    collectionName: "timetables",
    display: "timetable",
    props: U.concat(
      l(),
      f.schoolNameProp,
      f.yearProp,
      obj.strProp("version", {
        mandatory: !0,
      }),
      f.htmlProp,
      f.cssProp,
      z(),
      A(),
      t(),
      f.daysProp,
      f.periodsProp,
      obj.entityArray("subjects", f.subject),
      obj.entityArray("rooms", f.room),
      obj.entityArray("teachers", f.teacher),
      obj.entityArray("classes", f._class),
      obj.entityArray("activities", f.activity),
      obj.entityArray("clips", f.clip),
      obj.entityArray("views", f.view),
      f.cardStylesProp,
    ),
    before: function (b) {
      var d;
      b.groups = P(b);
      b.cards = [];
      if (b.activities)
        for (var f = 0, h = obj.notDel(b.activities); f < h.length; f++) {
          var k = h[f];
          (d = b.cards).push.apply(d, obj.notDel(k.cards));
        }
    },
    after: function (b) {
      ua(b);
    },
  };
  f.planProp = obj.intProp("plan", {
    default: f.planType.free,
  });
  f.countryIdProp = obj.mandatoryIdProp("countryId");
  f.schoolDisabledProp = obj.boolProp("disabled");
  f.clientSchoolProps = [obj.mandatoryIdProp()].concat(
    f.planProp,
    f.schoolDisabledProp,
    f.countryIdProp,
    obj.strProp("name"),
    obj.strProp("address"),
    obj.strProp("state"),
    obj.strProp("city"),
    obj.strProp("zip"),
    obj.strProp("contactName"),
    obj.strProp("contactEmail"),
    obj.strProp("phone"),
    obj.strProp("comment"),
  );
  f.emailProp = obj.strProp("email", {
    mandatory: !0,
  });
  f.passwordProp = obj.strProp("password", {
    mandatory: !0,
  });
  f.firstNameProp = obj.strProp("firstName", {
    allowHtml: !0,
  });
  f.lastNameProp = obj.strProp("lastName", {
    allowHtml: !0,
  });
  f.clientUserProps = [obj.mandatoryIdProp()].concat(
    l(),
    f.emailProp,
    f.passwordProp,
    obj.intProp("role", {
      default: f.roleType.owner,
    }),
    f.firstNameProp,
    f.lastNameProp,
  );
  f.clientUser = {
    display: "user",
    type: f.type.user,
    props: f.clientUserProps,
  };
  f.defaultSkin = 1;
  f.defaultPeriodFormat = f.tf.lN;
  f.defaultReminder = 20;
  f.defaultView = f.type.class - 1;
  f.defaultHistoryStates = 100;
  f.userOptions = {
    display: "options",
    type: f.type.userOptions,
    props: [
      obj.intProp("skin", {
        default: f.defaultSkin,
      }),
      obj.intProp("defaultView", {
        default: f.defaultView,
      }),
      obj.intProp("periodFormat", {
        default: f.defaultPeriodFormat,
      }),
      obj.boolProp("resizePeriods"),
      obj.boolProp("intervalInCards"),
      obj.intProp("reminder", {
        default: f.defaultReminder,
      }),
      obj.boolProp("disableRotate"),
      obj.boolProp("hideNotifier"),
      obj.boolProp("ignoreMinus"),
      obj.boolProp("hideTips"),
      obj.intProp("historyStates", {
        default: f.defaultHistoryStates,
      }),
    ],
  };
  f.getAllGroups = P;
  f.getGroupsForClasses = H;
  f.getGroupsForGroupSets = I;
  f.getGroups = J;
  f.getStudents = Q;
  f.getStudentsForClasses = K;
  f.getAllStudents = function (b) {
    return K(obj.notDel(b.classes));
  };
  f.preparePeriod = D;
  f.prepareClass = E;
  f.getSortedGroupSets = M;
  f.getSortedGroups = L;
  f.isEntire = function (b) {
    return !b.position;
  };
  f.entireGroup = function (b) {
    return b.sortedGroups[0];
  };
  f.maxGroupSet = function (b) {
    b = W(b.groupSets).map(function (b) {
      return b.position;
    });
    return 0 === b.length ? 0 : arr.last(b);
  };
  f.maxGroup = function (b) {
    b = W(b.groups).map(function (b) {
      return b.position;
    });
    return 0 === b.length ? 0 : arr.last(b);
  };
  f.getClass = X;
  f.setCardPos = T;
  f.setDay = ma;
  f.setPer = Y;
  f.setRooms = na;
  f.prepareClip = ia;
  f.isAdmin = function (b) {
    return b.role === f.roleType.a;
  };
  f.isOwner = ja;
  f.isCreator = oa;
  f.isViewer = function (b) {
    return b.role === f.roleType.viewer;
  };
  f.isOwnerOrCreator = function (b) {
    return ja(b) || oa(b);
  };
  f.isDemoSchool = function (b) {
    return b === f.demo.schoolId;
  };
  f.isDisabled = function (b) {
    return !!b && !!b.disabled;
  };
  f.getPlanName = function (b) {
    var d = "Free";
    b === f.planType.basic
      ? (d = "Basic")
      : b === f.planType.premium
        ? (d = "Premium")
        : b === f.planType.premiumPlus && (d = "Premium+");
    return d;
  };
  f.getProductId = function (b, d) {
    return pa((b + 1) / 50, d);
  };
  f.getRealProductId = pa;
  f.getPrice = function (b) {
    return 50 * b - 1;
  };
  f.maxProducts = 30;
  f.getPurchaseUrl = function (b) {
    return "https://secure.2checkout.com/checkout/buy?merchant=2099889&prod=".concat(
      b,
      "&qty=1",
    );
  };
  f.hasName = function (b) {
    return b.some(function (b) {
      return "name" === b.name;
    });
  };
  f.hasShort = function (b) {
    return b.some(function (b) {
      return "shortName" === b.name;
    });
  };
  f.hasPos = ca;
  f.hasColor = function (b) {
    return b.some(function (b) {
      return "color" === b.name;
    });
  };
  f.hasMarks = function (b) {
    return b.some(function (b) {
      return "marks" === b.name;
    });
  };
  f.hasCustomId = function (b) {
    return b.some(function (b) {
      return "customId" === b.name;
    });
  };
  f.isViewEntityType = ka;
  f.isViewEntity = function (b) {
    return ka(b.type);
  };
  f.isDayOrPeriodType = function (b) {
    return b === f.type.day || b === f.type.period;
  };
  f.getAll = function (b, d, h) {
    return obj.getAll(d, b, f.timetable, h);
  };
  f.getViewEntities = function (b, d) {
    b = [b.classes, b.teachers, b.rooms, b.subjects];
    return 0 < d && d <= b.length ? W(b[d - 1]) : [];
  };
  f.getViewEntityName = function (b, d) {
    void 0 === d && (d = !1);
    return b === f.type.class
      ? d
        ? "Classes"
        : "Class"
      : b === f.type.teacher
        ? d
          ? "Teachers"
          : "Teacher"
        : b === f.type.room
          ? d
            ? "Rooms"
            : "Room"
          : b === f.type.subject
            ? d
              ? "Subjects"
              : "Subject"
            : "";
  };
  f.getViewEntityDesc = ba;
  f.sort = qa;
  f.sortByPos = da;
  f.sortByPosTime = ta;
  f.checkPositions = function (b, d, h) {
    void 0 === h && (h = !1);
    if (!b || 0 === b.length)
      return {
        fixedPositions: [],
        sorted: [],
      };
    var k = [];
    b = h ? b : qa(obj.notDel(b), d);
    h = {
      fixedPositions: k,
      sorted: b,
    };
    var g = 0;
    if (d === f.period) {
      var p = aa(b);
      d = function (b) {
        if (b.entityId) return "continue";
        if (b.position !== ++g) {
          k.push({
            entity: b,
            oldPosition: b.position,
            newPosition: g,
          });
          for (
            var d = 0,
              f = p.filter(function (d) {
                return d.position === b.position;
              });
            d < f.length;
            d++
          ) {
            var h = f[d];
            k.push({
              entity: h,
              oldPosition: h.position,
              newPosition: g,
            });
          }
        }
      };
      for (var n = 0; n < b.length; n++) d(b[n]);
    } else
      for (d = d === f.group || d === f.groupSet, n = 0; n < b.length; n++) {
        var q = b[n];
        q.position !== ++g &&
          (1 === g && d && !q.position
            ? --g
            : q.position !== g &&
              k.push({
                entity: q,
                oldPosition: q.position,
                newPosition: g,
              }));
      }
    return h;
  };
  f.changePositions = function (b) {
    b.forEach(function (b) {
      return (b.entity.position = b.newPosition);
    });
  };
  f.sortNotDel = W;
  f.isExample = function (b) {
    return b.schoolId === f.demo.schoolId;
  };
  f.isCustomPeriod = function (b) {
    return !!b.entityId;
  };
  f.isDefaultPeriod = function (b) {
    return !b.entityId;
  };
  f.defaultPeriods = ha;
  f.customPeriods = aa;
  f.sortedDefaultPeriods = ra;
  f.getDefaultPeriods = la;
  f.getSortedDefaultPeriods = function (b) {
    return ra(b.periods);
  };
  f.daysCount = function (b) {
    return obj.notDel(b.days).length;
  };
  f.periodsCount = function (b) {
    return la(b).length;
  };
  f.checkClips = ua;
  f.maxPos = function (b) {
    return 0 === b.length
      ? 0
      : Math.max.apply(
          Math,
          b.map(function (b) {
            return b.position;
          }),
        );
  };
  f.hasId = function (b, d) {
    return !!Z(b, d);
  };
  f.byId = Z;
  f.byIds = V;
  f.ids = ea;
  f.idsStr = function (b) {
    return arr.joinComma(ea(b));
  };
  f.names = wa;
  f.namesStr = function (b) {
    return arr.joinCommaSpace(wa(b));
  };
  f.shorts = xa;
  f.shortsStr = function (b) {
    return arr.joinCommaSpace(xa(b));
  };
  f.isMinus = ya;
  f.hasMinus = function (b) {
    return b.some(function (b) {
      return ya(b);
    });
  };
  f.findReferenceProperties = function (b, d) {
    return b.props.filter(function (b) {
      return (
        (b.refDesc && b.refDesc.type === d) ||
        (b.refDesc === f.viewEntity && ka(d))
      );
    });
  };
  f.plural = function (b) {
    var d = b.charAt(b.length - 1);
    return "y" === d && "day" !== b
      ? b.substr(0, b.length - 1) + "ies"
      : b + ("s" === d ? "es" : "s");
  };
  f.getSafeFileName = function (b) {
    return b.replace(/[^a-z0-9_\-]/gi, "-").toLowerCase();
  };
  f.getChangedEntity = function (b, d, f) {
    d = Ba(b, d, f);
    return za(b, f, d, !1);
  };
  f.newUpdateCopy = za;
  f.copyUpdateProps = Aa;
  f.getChangedProps = Ba;
  f.getSkinNames = Da;
  f.getReminderPairs = function () {
    return [
      ["10", "10 minutes"],
      ["20", "20 minutes"],
      ["30", "30 minutes"],
      ["45", "45 minutes"],
      ["60", "1 hour"],
      ["120", "2 hours"],
    ];
  };
  f.getSkinPairs = function () {
    for (var b = Da(), d = b.length, f = [], h = 0; h < d; h++)
      f.push([h + 1 + "", b[h]]);
    return f;
  };
  f.getPeriodFormatPairs = function () {
    return [
      [f.tf.lN + "", "Name or period number"],
      [f.tf.l12 + "", "Name or 12-hour clock"],
      [f.tf.l24 + "", "Name or 24-hour clock"],
      [f.tf.n + "", "Period number"],
      [f.tf.h12 + "", "12-hour clock"],
      [f.tf.h24 + "", "24-hour clock"],
    ];
  };
  f.getViewTypePairs = function () {
    return [
      [f.vMod.c + "", "Classes"],
      [f.vMod.t + "", "Teachers"],
      [f.vMod.r + "", "Rooms"],
      [f.vMod.s + "", "Subjects"],
    ];
  };
  f.getDefaultViewName = Ca;
  f.getViewEntityType = Ea;
  f.isPredefinedView = function (b) {
    var d = Ea(b);
    return (
      b.isDefault &&
      b.position === d &&
      !b.hiddenInApp &&
      !b.hiddenOnWeb &&
      !b.shortName &&
      b.name === Ca(d - 1)
    );
  };
  f.historyStates = [f.defaultHistoryStates, 200, 300, 500, 1e3];
  f.getHistoryStatePairs = function () {
    return f.historyStates.map(function (b) {
      return [b + "", b + ""];
    });
  };
  f.getColors = Fa;
  f.getRandomColor = function () {
    var b = Fa();
    return b[num.random(0, b.length - 1)];
  };
  f.isHexColor = function (b) {
    return new RegExp(/^#[0-9A-Fa-f]{6}$/i).test(b);
  };
  f.sortByRole = function (b, d) {
    return b.slice().sort(function (b, f) {
      return (
        (d ? 1 : -1) * arr.sort(b.role, f.role) ||
        arr.sort(b.firstName, f.firstName) ||
        arr.sort(b.lastName, f.lastName) ||
        arr.sort(b.email, f.email)
      );
    });
  };
  f.skinFolderDepth = "folderDepth";
})(e || (e = {}));
(function (f) {
  f.callback = function () {
    var f,
      g,
      b,
      d,
      h,
      k,
      p = [],
      n = [],
      q = function (f) {
        g = !0;
        k = d || 0;
        d = 0;
        h = p ? p.length : 0;
        for (b = !0; p && k < h; k++) p[k].apply(f[0], f[1]);
        b = !1;
        p && (n ? n.length && q(n.shift()) : u.disable());
      },
      u = {
        add: function () {
          if (p) {
            var k = p.length;
            (function z(b) {
              for (var d = 0, f = b.length; d < f; d++) {
                var h = b[d],
                  k = typeof h;
                "function" === k
                  ? u.has(h) || p.push(h)
                  : h && h.length && "string" !== k && z(h);
              }
            })(arguments);
            b ? (h = p.length) : f && ((d = k), q(f));
          }
          return this;
        },
        remove: function (d) {
          if (p)
            for (var f = void 0; -1 < (f = p.indexOf(d, f)); )
              (p.splice(f, 1), b && (f <= h && h--, f <= k && k--));
          return this;
        },
        fireWith: function (d, f) {
          !p ||
            (g && !n) ||
            ((f = f || []),
            (f = [d, f.slice ? f.slice() : f]),
            b ? n && n.push(f) : q(f));
          return this;
        },
        fire: function () {
          u.fireWith(this, arguments);
          return this;
        },
        has: function (b) {
          return b ? arr.has(p || [], b) : !(!p || !p.length);
        },
        empty: function () {
          p = [];
          h = 0;
          return this;
        },
        disable: function () {
          p = n = f = void 0;
          return this;
        },
        disabled: function () {
          return !p;
        },
        lock: function () {
          n = void 0;
          f || u.disable();
          return this;
        },
        locked: function () {
          return !n;
        },
      };
    return u;
  };
})(c || (c = {}));
(function (f) {
  function l(d, f, h) {
    void 0 === h && (h = !0);
    return (d = b(d, f, h)) ? d[1] : void 0;
  }
  function g(b, d, f) {
    void 0 === f && (f = !0);
    return void 0 !== l(b, d, f);
  }
  function b(b, d, f) {
    void 0 === f && (f = !0);
    return b.find(function (b) {
      return (
        !!b[0] &&
        b[0].toLowerCase() === d.toLowerCase() &&
        (f ? null !== b[1] : !0)
      );
    });
  }
  function d(b) {
    var d = [];
    b = b.replace(/%3D/g, "=");
    b = b.replace(/%26/g, "&");
    var f = 0;
    for (b = b.split("&"); f < b.length; f++) {
      var h = b[f],
        k = h.indexOf("="),
        g = decodeURIComponent(-1 === k ? h : h.substring(0, k));
      h = -1 === k ? "" : decodeURIComponent(h.substring(k + 1));
      d.push([g, h]);
    }
    return d;
  }
  f.getHash = l;
  f.hasHash = g;
  f.hasAnyHash = function (b, d, f) {
    void 0 === f && (f = !0);
    return d.some(function (d) {
      return g(b, d, f);
    });
  };
  f.findHash = b;
  f.findHashKeys = function (d, f, h) {
    void 0 === h && (h = !0);
    for (var k = 0; k < f.length; k++) {
      var g = b(d, f[k], h);
      if (g) return g;
    }
  };
  f.parseHash = d;
  var h = (function () {
    function b(b) {
      this.cA = b;
      b = (b = window.location.search) && 0 < b.length ? b.substring(1) : "";
      this.pairs = d(b);
    }
    b.prototype.get = function (b) {
      return l(this.pairs, b);
    };
    b.prototype.has = function (b) {
      return void 0 !== l(this.pairs, b);
    };
    return b;
  })();
  f.queryStrings = h;
  h = (function () {
    function b() {
      var b = this;
      this.pairs = [];
      this.internal = !1;
      this.change = f.callback();
      this.refresh();
      ui.on(window, "hashchange", function () {
        return b.onChange();
      });
    }
    b.prototype.onChange = function () {
      this.internal || this.change.fire();
      this.internal = !1;
    };
    b.prototype.has = function (b) {
      return f.hasHash(this.pairs, b);
    };
    b.prototype.add = function (b) {
      this.updatePairs(b, !0);
    };
    b.prototype.addKey = function (b, d) {
      void 0 === d && (d = !1);
      b = [b, ""];
      d ? this.pairs.unshift(b) : this.pairs.push(b);
      this.updatePairs(this.pairs);
    };
    b.prototype.dels = function (b) {
      this.refresh();
      for (var d = !1, f = 0; f < b.length; f++)
        this.delKey(this.pairs, b[f]) && (d = !0);
      d && this.updatePairs(this.pairs, !1);
      return d;
    };
    b.prototype.del = function (b) {
      return this.dels([b]);
    };
    b.prototype.delKey = function (b, d) {
      (d = f.findHash(b, d)) && arr.remove(b, d);
      return !!d;
    };
    b.prototype.updatePairs = function (b, d) {
      void 0 === d && (d = !0);
      d && this.refresh();
      for (d = 0; d < b.length; d++) {
        var f = b[d];
        null === f[1]
          ? this.delKey(this.pairs, f[0])
          : (this.delKey(this.pairs, f[0]), this.pairs.push(f.slice()));
      }
      b = this.toString();
      "#" + b !== window.location.hash &&
        ((this.internal = !0), (window.location.hash = b));
    };
    b.prototype.toString = function () {
      return arr.join(
        this.pairs.map(function (b) {
          return b[0] + (b[1] ? "=" + b[1] : "");
        }),
        "&",
      );
    };
    b.prototype.get = function (b, d) {
      void 0 === d && (d = !1);
      d && this.refresh();
      return (b = f.findHash(this.pairs, b)) ? b[1] : void 0;
    };
    b.prototype.put = function (b) {
      this.internal = !0;
      window.location.hash = encodeURIComponent(b);
    };
    b.prototype.diff = function () {
      for (var b = this.parse(), d = [], h = 0; h < b.length; h++) {
        var k = b[h],
          g = f.findHash(this.pairs, k[0]);
        (g && g[1].toLowerCase() === k[1].toLowerCase()) || d.push(k);
      }
      h = 0;
      for (k = this.pairs; h < k.length; h++)
        ((g = k[h]), f.findHash(b, g[0]) || d.push([g[0], null]));
      return d;
    };
    b.prototype.refresh = function () {
      this.pairs = this.parse();
    };
    b.prototype.parse = function () {
      var b = [],
        d = f.location().hash;
      if (!d || "#" === d) return b;
      d = d.slice(1);
      return f.parseHash(d);
    };
    return b;
  })();
  f.hash = h;
})(c || (c = {}));
var ui;
(function (f) {
  function l(b, d) {
    g(b, d.width, d.height);
  }
  function g(b, d, h) {
    f.setWidth(b, d);
    f.setHeight(b, h);
    return b;
  }
  function b(b, d) {
    void 0 === d && (d = !0);
    var f = 0;
    b = getComputedStyle(b);
    f +=
      num.toInt(b.borderLeftWidth) +
      num.toInt(b.borderRightWidth) +
      num.toInt(b.paddingLeft) +
      num.toInt(b.paddingRight);
    d && (f += num.toInt(b.marginLeft) + num.toInt(b.marginRight));
    return f;
  }
  function d(b, d) {
    void 0 === d && (d = !0);
    var f = 0;
    b = getComputedStyle(b);
    f +=
      num.toInt(b.borderTopWidth) +
      num.toInt(b.borderBottomWidth) +
      num.toInt(b.paddingTop) +
      num.toInt(b.paddingBottom);
    d && (f += num.toInt(b.marginTop) + num.toInt(b.marginBottom));
    return f;
  }
  function h(b, d, h) {
    f.setLeft(b, d);
    f.setTop(b, h);
    return b;
  }
  function k(b, d) {
    h(b, d.left, d.top);
  }
  function p(b) {
    for (var d = [], f = 0; f < b.length; f++) {
      var h = b[f];
      1 === h.nodeType && d.push(h);
    }
    return d;
  }
  function n(b, d) {
    for (var f = d.length, h = 0; h < f; h++) b.appendChild(d[h]);
  }
  function q() {
    return c.navigator().pointerEnabled
      ? "pointerdown"
      : "touchstart mousedown";
  }
  function u(b) {
    return b === document.activeElement;
  }
  function t(b, d) {
    f.toggleClass(b, "disabled", !d);
    b.disabled = !d;
    "A" === b.tagName &&
      f.setAttribute(b, "onclick", "return ".concat(d ? "true" : "false"));
  }
  function x(b, d) {
    var h = b.nodeName.toLowerCase();
    return (
      (/input|select|textarea|button|object/.test(h)
        ? !b.disabled
        : "a" === h
          ? b.href || d
          : d) && f.isVisible(b)
    );
  }
  function y() {
    return 0 !== f.getEdgeVersion();
  }
  function z() {
    return 11 < f.getEdgeVersion();
  }
  function A() {
    return c.navigator().userAgent || c.navigator().vendor || window.opera;
  }
  function B() {
    return -1 !== A().indexOf("Windows");
  }
  function C(b) {
    var d = 0,
      f = 0;
    "detail" in b && (f = b.detail);
    "wheelDelta" in b && (f = -b.wheelDelta / 120);
    "wheelDeltaY" in b && (f = -b.wheelDeltaY / 120);
    "wheelDeltaX" in b && (d = -b.wheelDeltaX / 120);
    "axis" in b && b.axis === b.HORIZONTAL_AXIS && ((d = f), (f = 0));
    var h = 10 * d;
    var k = 10 * f;
    "deltaY" in b && (k = b.deltaY);
    "deltaX" in b && (h = b.deltaX);
    (h || k) &&
      b.deltaMode &&
      (1 == b.deltaMode ? ((h *= 40), (k *= 40)) : ((h *= 800), (k *= 800)));
    h && !d && (d = 1 > h ? -1 : 1);
    k && !f && (f = 1 > k ? -1 : 1);
    return {
      spinX: d,
      spinY: f,
      pixelX: h,
      pixelY: k,
    };
  }
  function G(b, d) {
    if (d && !("addEventListener" in document)) return !1;
    d = "on" + b;
    var f = d in document;
    f ||
      ((f = document.createElement("div")),
      f.setAttribute(d, "return;"),
      (f = "function" === typeof f[d]));
    d =
      document.implementation &&
      document.implementation.hasFeature &&
      !0 !== document.implementation.hasFeature("", "");
    !f &&
      d &&
      "wheel" === b &&
      (f = document.implementation.hasFeature("Events.wheel", "3.0"));
    return f;
  }
  var P = (function () {
    function b(b, d) {
      void 0 === b && (b = 0);
      void 0 === d && (d = 0);
      this.y = this.x = 0;
      this.x = b;
      this.y = d;
    }
    b.pos = function (b) {
      return new f.point(b.x, b.y);
    };
    b.prototype.mov = function (b, d) {
      this.x += b;
      this.y += d;
      return this;
    };
    b.prototype.toString = function () {
      return this.x + "," + this.y;
    };
    b.eq = function (b, d) {
      return b.x === d.x && b.y === d.y;
    };
    return b;
  })();
  f.point = P;
  f.getPoint = function (b) {
    return new f.point(f.getLeft(b), f.getTop(b));
  };
  f.offset = function (b) {
    var d = window;
    d = {
      x: d.pageXOffset - b.clientLeft,
      y: d.pageYOffset - b.clientTop,
    };
    "undefined" !== typeof b.getBoundingClientRect &&
      ((b = b.getBoundingClientRect()),
      (d = {
        x: d.x + b.left,
        y: d.y + b.top,
      }));
    return d;
  };
  f.getPos = function (b) {
    var d = {
      x: 0,
      y: 0,
    };
    if ("fixed" === f.computedStyle(b, "position")) {
      var h = b.getBoundingClientRect();
      var k = {
        x: h.left,
        y: h.top,
      };
    } else
      ((h = f.getOffsetParent(b)),
        (k = f.offset(b)),
        "html" !== h.nodeName.toLowerCase() && (d = f.offset(h)),
        (d.x += num.toInt(f.computedStyle(h, "border-top-width"))),
        (d.y += num.toInt(f.computedStyle(h, "border-left-width"))));
    return {
      x: k.x - d.x - num.toInt(f.computedStyle(b, "margin-left")),
      y: k.y - d.y - num.toInt(f.computedStyle(b, "margin-top")),
    };
  };
  f.getOffsetParent = function (b) {
    for (
      b = b.offsetParent || c.documentElement();
      b &&
      "html" !== b.nodeName.toLowerCase() &&
      "static" === f.computedStyle(b, "position");

    )
      b = f.getOffsetParent(b);
    return b || c.documentElement();
  };
  f.setBox = function (b, d) {
    l(b, d);
    k(b, d);
  };
  f.setSize = l;
  f.setWidthHeight = g;
  f.setWidth = function (b, d) {
    b.style.width = c.px(d);
    return b;
  };
  f.setHeight = function (b, d) {
    b.style.height = c.px(d);
    return b;
  };
  f.setMargin = function (b, d) {
    b.style.margin =
      c.px(d.top) +
      " " +
      c.px(d.right) +
      " " +
      c.px(d.bottom) +
      " " +
      c.px(d.left);
  };
  f.getWidth = function (b) {
    return num.toInt(b.style.width || "");
  };
  f.getHeight = function (b) {
    return num.toInt(b.style.height || "");
  };
  f.getComputedWidth = function (b) {
    return num.toInt(f.computedStyle(b, "width"));
  };
  f.getComputedHeight = function (b) {
    return num.toInt(f.computedStyle(b, "height"));
  };
  f.getBoxWidth = function (d, f) {
    void 0 === f && (f = !0);
    var h = getComputedStyle(d);
    return num.toInt(h.width || "") + b(d, f);
  };
  f.getBoxHeight = function (b, f) {
    void 0 === f && (f = !1);
    var h = getComputedStyle(b);
    return num.toInt(h.height) + d(b, f);
  };
  f.getPaddingBorderMarginWidth = b;
  f.getPaddingBorderMarginHeight = d;
  f.setWidthPercentage = function (b, d) {
    b.style.width = c.pc(d);
  };
  f.setHeightPercentage = function (b, d) {
    b.style.height = c.pc(d);
  };
  f.setLeftTop = h;
  f.setPosition = k;
  f.getLeft = function (b) {
    return num.toInt(b.style.left);
  };
  f.getTop = function (b) {
    return num.toInt(b.style.top);
  };
  f.getRight = function (b) {
    return num.toInt(b.style.right);
  };
  f.setAbsPoint = function (b, d) {
    return f.setLeftTop(b, d.x, d.y);
  };
  f.setLeft = function (b, d) {
    b.style.left = c.px(d);
    return b;
  };
  f.setTop = function (b, d) {
    b.style.top = c.px(d);
    return b;
  };
  f.setRight = function (b, d) {
    b.style.right = c.px(d);
    return b;
  };
  f.getParentIndex = function (b) {
    var d = -1;
    if (!b.parentNode) return d;
    for (var f = p(b.parentNode.childNodes), h = 0; h < f.length; h++) {
      var k = f[h];
      if (1 === k.nodeType && (++d, k === b)) return d;
    }
    return -1;
  };
  f.findId = function (b, d) {
    return (d || document).getElementById(b);
  };
  f.findClass = function (b, d) {
    return p((d || document).getElementsByClassName(b));
  };
  f.getTag = function (b, d) {
    return (d || document).createElement(b);
  };
  f.getDiv = function (b, d) {
    var h = f.getTag("div");
    b && f.addClass(h, b);
    d && f.setText(h, d);
    return h;
  };
  f.all = function (b, d) {
    return p((d || document).querySelectorAll(b));
  };
  f.find = function (b, d) {
    return (d || document).querySelector(b);
  };
  f.children = function (b) {
    for (var d = [], f = 0; f < b.children.length; f++) {
      var h = b.children[f];
      1 === h.nodeType && d.push(h);
    }
    return d;
  };
  f.parents = function (b) {
    for (var d = []; (b = b.parentNode), null != b; )
      1 === b.nodeType && d.push(b);
    return d;
  };
  f.findParentClass = function (b, d) {
    for (; (b = b.parentNode), null != b; )
      if (1 === b.nodeType && f.hasClass(b, d)) return b;
  };
  f.getAttribute = function (b, d) {
    return b.getAttribute(d);
  };
  f.setAttribute = function (b, d, f) {
    b.setAttribute(d, f);
    return b;
  };
  f.dat = function (b, d, h) {
    f.setAttribute(b, "data-" + d, h);
    return b;
  };
  f._dat = function (b, d) {
    return f.getAttribute(b, "data-" + d);
  };
  f._datN = function (b, d) {
    return num.toInt(f._dat(b, d));
  };
  f._datI = function (b) {
    return f._datN(f.target(b), "i");
  };
  f.attrs = function (b, d, h) {
    b.forEach(function (b) {
      return f.setAttribute(b, d, h);
    });
  };
  f.setTabIndex = function (b, d) {
    b.setAttribute("tabindex", d);
    return b;
  };
  f.getTabIndex = function (b) {
    return b.getAttribute("tabindex");
  };
  f.computedStyle = function (b, d) {
    return getComputedStyle(b)[d];
  };
  f.addClass = function (b, d) {
    if (!d) return b;
    if (b.className) {
      d = d.split(" ");
      for (var f = b.className, h = 0; h < d.length; h++)
        (void 0 === J && (J = "classList" in document.createElement("a")),
          (J ? b.classList.contains(d[h]) : arr.has(f.split(" "), d[h])) ||
            (f += " " + d[h]));
      f.length > b.className.length && (b.className = f);
    } else b.className = d;
    return b;
  };
  f.addClasses = function (b, d) {
    b.forEach(function (b) {
      return f.addClass(b, d);
    });
  };
  var H = /\S+/g,
    I = /[\t\r\n\f]/g;
  f.deleteClass = function (b, d) {
    var f,
      h,
      k,
      g = (d || "").match(H) || [];
    if (
      (f =
        1 === b.nodeType && b.className
          ? (" " + b.className + " ").replace(I, " ")
          : "")
    ) {
      for (k = 0; (h = g[k++]); )
        for (; 0 <= f.indexOf(" " + h + " "); )
          f = f.replace(" " + h + " ", " ");
      d = d ? f.trim() : "";
      b.className.length !== d.length && (b.className = d);
    }
    return b;
  };
  f.deleteClasses = function (b, d) {
    b.forEach(function (b) {
      return f.deleteClass(b, d);
    });
  };
  f.hasClass = function (b, d) {
    d = " " + d + " ";
    return (
      1 === b.nodeType &&
      0 <= (" " + b.className + " ").replace(I, " ").indexOf(d)
    );
  };
  f.hasClasses = function (b, d) {
    return !!b.find(function (b) {
      return f.hasClass(b, d);
    });
  };
  f.toggleClass = function (b, d, h) {
    void 0 === h && (h = !f.hasClass(b, d));
    h ? f.addClass(b, d) : f.deleteClass(b, d);
    return b;
  };
  f.toggleClasses = function (b, d, h) {
    b.forEach(function (b) {
      return f.toggleClass(b, d, h);
    });
  };
  f.switchClass = function (b, d, h) {
    return f.addClass(f.deleteClass(b, d), h);
  };
  var J;
  f.empty = function (b) {
    b && b.nodeType === Node.ELEMENT_NODE && (b.textContent = "");
    return b;
  };
  f.setHtml = function (b, d) {
    b.innerHTML = d;
    return b;
  };
  f.setHtmls = function (b, d) {
    for (var h = b.length, k = 0; k < h; k++) f.setHtml(b[k], d);
  };
  f.getText = function (b) {
    return 1 === b.nodeType ? b.textContent : void 0;
  };
  f.setText = function (b, d) {
    var f = b.firstChild;
    f && !f.nextSibling && f.nodeType === Node.TEXT_NODE
      ? (f.data = d)
      : b.nodeType === Node.ELEMENT_NODE && (b.textContent = d);
    return b;
  };
  f.append = function (b, d) {
    d.appendChild(b);
    return b;
  };
  f.appends = function (b, d) {
    var h = f.getFragment();
    n(h, b);
    d.appendChild(h);
  };
  f.prepend = function (b, d) {
    d.insertBefore(b, d.firstChild);
    return b;
  };
  f.remove = function (b) {
    b && b.parentNode && b.parentNode.removeChild(b);
  };
  f.removes = function (b) {
    for (var d = b.length, h = 0; h < d; h++) f.remove(b[h]);
  };
  f.getFragment = function () {
    return document.createDocumentFragment();
  };
  f.addToFragment = n;
  f.getTapEnd = function () {
    return c.navigator().pointerEnabled
      ? "pointerup pointercancel"
      : "touchend touchcancel mouseup";
  };
  f.getTouchMove = function () {
    return c.navigator().pointerEnabled ? "pointermove" : "mousemove touchmove";
  };
  f.on = function (b, d, h, k) {
    void 0 === k &&
      (k = {
        capture: !1,
      });
    f.onOff([b], d, h, !0, k);
    return b;
  };
  f.onOff = function (b, d, f, h, k) {
    void 0 === h && (h = !0);
    d = d.split(" ");
    for (var g = d.length, p = b.length, n = 0; n < p; n++)
      for (var q = b[n], u = 0; u < g; u++)
        h
          ? (k || (k = {}),
            q.addEventListener(d[u], f, {
              capture: k ? k.capture || !1 : !1,
              passive: k ? k.passive || !1 : !1,
            }))
          : q.removeEventListener(d[u], f);
  };
  f.off = function (b, d, h) {
    f.onOff([b], d, h, !1);
    return b;
  };
  f.ons = function (b, d, h, k) {
    void 0 === k &&
      (k = {
        capture: !1,
      });
    f.onOff(b, d, h, !0, k);
  };
  f.tap = function (b, d, h) {
    void 0 === h && (h = !1);
    return f.on(b, q(), d, {
      capture: h,
    });
  };
  f.tapEnd = function (b, d) {
    return f.on(b, f.getTapEnd(), d);
  };
  f.click = function (b, d, h) {
    void 0 === h && (h = !1);
    return f.on(b, "click", d, {
      capture: h,
    });
  };
  f.clicks = function (b, d, h) {
    void 0 === h && (h = !1);
    for (var k = 0; k < b.length; k++)
      f.on(b[k], "click", d, {
        capture: h,
      });
  };
  f.over = function (b, d) {
    f.on(b, "mouseover", function (b) {
      return f.call(d, void 0, b, !0);
    });
    return f.on(b, "mouseleave", function (b) {
      return f.call(d, void 0, b, !1);
    });
  };
  f.isTouch = function (b) {
    var d = b.type.toLowerCase();
    return -1 !== d.indexOf("pointer")
      ? "touch" === b.pointerType
      : -1 !== d.indexOf("touch");
  };
  f.isTouchEvent = function (b) {
    return !!b && -1 !== q().split(" ").indexOf(b.type);
  };
  f.target = function (b) {
    return b.currentTarget;
  };
  f.stopPropagation = function (b) {
    b.stopPropagation();
  };
  f.preventDefault = function (b) {
    b.preventDefault();
  };
  f.stopDefaultPropagation = function (b) {
    f.preventDefault(b);
    f.stopPropagation(b);
  };
  f.call = function (b, d, f, h, k) {
    return b ? b.call(d, f, h, k) : void 0;
  };
  var Q, K;
  f.linearGradient = function () {
    if (void 0 === Q) {
      Q = "";
      for (
        var b = ["", "-o-", "-moz-", "-webkit-", "-ms-"],
          d = b.length,
          h = f.getDiv().style,
          k = 0;
        k < d;
        k++
      )
        if (
          ((h.backgroundImage = b[k] + "linear-gradient(top, #9f9, white)"),
          -1 !== h.backgroundImage.indexOf("gradient"))
        ) {
          Q = b[k] + "linear-gradient";
          break;
        }
    }
    return Q;
  };
  f.transform = function () {
    if (void 0 === K) {
      var b = f.getDiv().style,
        d = "";
      b.transform ||
        (b.webkitTransform
          ? (d = "-webkit-")
          : b.webkitTransform
            ? (d = "-webkit-")
            : b.MozTransform && (d = "-moz-"));
      K = d + "transform";
    }
    return K;
  };
  f.hint = function (b, d, h) {
    void 0 === h && (h = c.hintPos.top);
    f.setAttribute(b, "data-hint", d);
    return f.addClass(b, f.hintClass(h));
  };
  f.hintClass = function (b) {
    void 0 === b && (b = c.hintPos.top);
    var d = "hint--top";
    b === c.hintPos.right
      ? (d = "hint--right")
      : b === c.hintPos.bottom
        ? (d = "hint--bottom")
        : b === c.hintPos.left && (d = "hint--left");
    return "hint--rounded hint--bounce " + d;
  };
  f.title = function (b, d) {
    b.title = d;
    return b;
  };
  f.show = function (b, d) {
    void 0 === d && (d = "");
    f.shows([b], d);
    return b;
  };
  f.shows = function (b, d) {
    void 0 === d && (d = "");
    for (var f = 0, h = b.length; f < h; f++) {
      var k = b[f];
      k && k.style && (k.style.display = d);
    }
  };
  f.hide = function (b) {
    f.hides([b]);
    return b;
  };
  f.hides = function (b) {
    for (var d = 0, f = b.length; d < f; d++) {
      var h = b[d];
      h && h.style && (h.style.display = "none");
    }
  };
  f.setOpacity = function (b, d) {
    b.style.opacity = d + "";
    return b;
  };
  f.setOpacities = function (b, d) {
    b.forEach(function (b) {
      return f.setOpacity(b, d);
    });
  };
  f.setFocus = function (b) {
    u(b) || b.focus();
  };
  f.hasFocus = u;
  f.enable = t;
  f.enables = function (b, d) {
    b.forEach(function (b) {
      return t(b, d);
    });
  };
  f.toggle = function (b, d, h) {
    return d ? f.show(b, h) : f.hide(b);
  };
  f.toggles = function (b, d, h) {
    b.forEach(function (b) {
      return f.toggle(b, d, h);
    });
  };
  f.setZIndex = function (b, d) {
    b.style.zIndex = d;
    return b;
  };
  f.getZIndex = function (b) {
    return num.toInt(b.style.zIndex);
  };
  f.rotate = function (b, d, h) {
    void 0 === h && (h = !0);
    f.setTransform(b, f.getRotate(d) + (h ? " " + f.perspective() : ""));
  };
  f.perspective = function () {
    return "perspective(1px)";
  };
  f.getRotate = function (b) {
    return "rotate(" + b + "deg)";
  };
  f.getScale = function (b, d) {
    void 0 === d && (d = b);
    return "scale(" + b + "," + d + ")";
  };
  f.setTransform = function (b, d) {
    b.style.MozTransform = d;
    b.style.msTransform = d;
    b.style.webkitTransform = d;
    b.style.transform = d;
  };
  f.setTransition = function (b, d, f, h) {
    d = d + (d ? " " : "") + num.round(f / 1e3, 2) + "s " + h;
    for (f = 0; f < b.length; f++)
      ((h = b[f]), (h.style.transition = d), (h.style.webkitTransition = d));
  };
  f.setVisible = function (b) {
    return f.switchClass(b, "invisible", "visible");
  };
  f.setInvisible = function (b) {
    return f.switchClass(b, "visible", "invisible");
  };
  f.noSelect = function (b) {
    f.addClass(b, "noSelect");
  };
  f.getChar = function (b) {
    return String.fromCharCode(b.which).toLowerCase();
  };
  f.hasVerticalScroll = function (b) {
    return b.scrollHeight > f.getComputedHeight(b);
  };
  f.hasHorizontalScroll = function (b) {
    return b.scrollWidth > f.getComputedWidth(b);
  };
  f.isVisible = function (b) {
    return (
      !(0 >= b.offsetWidth && 0 >= b.offsetHeight) &&
      !f.parents(b).some(function (b) {
        return "hidden" === b.style.visibility;
      })
    );
  };
  f.canSetFocus = function (b) {
    return x(b, !isNaN(f.getTabIndex(b)));
  };
  f.getTabElements = function (b) {
    return f.all("*", b).filter(function (b) {
      var d = f.getTabIndex(b),
        h = null === d || isNaN(d);
      return (h || 0 <= d) && x(b, !h);
    });
  };
  f.confirm = function (b, d) {
    d && d.w(b);
    var f = window.confirm(b);
    d && d.w(b + " " + (f ? "" : "not ") + "confirmed");
    return f;
  };
  var D = -1;
  f.iOS = function () {
    -1 === D && (D = /iPad|iPhone|iPod/.test(A()) && !window.MSStream);
    return D;
  };
  var E = -1;
  f.getEdgeVersion = function () {
    if (-1 === E) {
      var b = A(),
        d = b.indexOf("MSIE ");
      0 < d
        ? (E = parseInt(b.substring(d + 5, b.indexOf(".", d)), 10))
        : 0 < b.indexOf("Trident/")
          ? ((d = b.indexOf("rv:")),
            (E = parseInt(b.substring(d + 3, b.indexOf(".", d)), 10)))
          : ((d = b.indexOf("Edge/")),
            (E =
              0 < d ? parseInt(b.substring(d + 5, b.indexOf(".", d)), 10) : 0));
    }
    return E;
  };
  f.isExplorer = y;
  f.isEdge = z;
  f.isIE11 = function () {
    return y() && !z();
  };
  var N = -1;
  f.isPhoneOrTablet = function () {
    if (-1 === N) {
      var b = A();
      N =
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(
          b,
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          b.substr(0, 4),
        );
    }
    return N;
  };
  f.isBot = function () {
    var b = A();
    return b
      ? -1 !== b.indexOf("Speed Insights") || -1 !== b.indexOf("GTmetrix")
      : !1;
  };
  f.agent = A;
  f.getCheckMark = function () {
    return '<svg class="svgIcon okIcon"><use xlink:href="#okD" /></svg>';
  };
  f.getNewLineChar = function () {
    return B() ? "\r\n" : "\n";
  };
  f.isWindows = B;
  f.download = function (b, d) {
    var h = new Blob(["\ufeff", d], {
      type: "text/plain",
    });
    window.navigator.msSaveOrOpenBlob
      ? window.navigator.msSaveOrOpenBlob(new Blob([d]), b)
      : ((d = f.getTag("a")),
        "download" in d && f.setAttribute(d, "download", b),
        (b = URL.createObjectURL(h)),
        (d.href = b),
        f.append(d, c.body()),
        d.click(),
        f.remove(d));
  };
  f.normalizeWheel = C;
  f.getWheelDelta = function (b, d) {
    b = C(b);
    return d ? -b.pixelY : -b.pixelX;
  };
  f.getWheelEvent = function () {
    return G("wheel") ? "wheel" : "mousewheel";
  };
  f.isEventSupported = G;
  f.getBodyScrollTop = function () {
    return (
      (c.documentElement() && c.documentElement().scrollTop) ||
      c.body().scrollTop
    );
  };
  f.getBodyScrollHeight = function () {
    return Math.max(
      Math.max(c.documentElement() ? c.documentElement().scrollHeight : 0),
      c.body().scrollHeight,
    );
  };
  f.isRightClick = function (b) {
    return !!b && (2 === b.button || 3 === b.which);
  };
  f.disableContextMenu = function (b) {
    f.ons(b, "contextmenu", function (b) {
      return f.stopDefaultPropagation(b);
    });
  };
  f.linkMessage = function (b, d, f) {
    var h = f || {};
    f = h.target;
    h = h.cssClass;
    void 0 === f && (f = str.startsWith(b, "#") ? R.none : R.blank);
    void 0 === h && (h = "lnkMsg");
    h = h ? ' class="'.concat(h, '"') : "";
    return '<a href="'
      .concat(b, '"')
      .concat(
        f === R.none ? "" : ' target="_blank"',
        ' ontouchstart="ui.stopPropagation(arguments[0]);" onclick = "ui.stopPropagation(arguments[0]);"',
      )
      .concat(h, ">")
      .concat(d, "</a>");
  };
  var R = {
    none: 0,
    blank: 1,
  };
})(ui || (ui = {}));
(function (f) {
  function l() {
    var d = ui.setAttribute(
      ui.getDiv(),
      "style",
      "width:50px;height:50px;overflow:auto",
    );
    ui.append(ui.getDiv(), d);
    ui.append(d, f.body());
    var k = d.firstChild;
    b = g = k.clientWidth - ui.setHeight(k, 99).clientWidth;
    ui.remove(d);
  }
  f.navigator = function () {
    return window.navigator;
  };
  f.documentElement = function () {
    return document.documentElement;
  };
  f.body = function () {
    return document.body;
  };
  f.timeout = function (b, d) {
    return setTimeout(b, d);
  };
  f.px = function (b) {
    return b + "px";
  };
  f.pc = function (b) {
    return b + "%";
  };
  f.setOpacity = function (b, d) {
    b.style.opacity = d + "";
  };
  f.removeNewLines = function (b) {
    return str.replaceAll(b, "\\n", "");
  };
  f.convertBrsToSpaces = function (b) {
    return str.replaceAll(b, "<br />", " ");
  };
  f.convertBrsToDashes = function (b) {
    return str.replaceAll(b, "<br />", " - ");
  };
  f.hintPos = {
    top: 0,
    right: 1,
    bottom: 2,
    left: 3,
  };
  f.windowWidth = function () {
    return window.innerWidth;
  };
  f.windowHeight = function () {
    return window.innerHeight;
  };
  f.devicePixelRatio = function () {
    return window.devicePixelRatio || 1;
  };
  f.isEmailValid = function (b) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      b,
    );
  };
  var g = -1,
    b = -1;
  f.scrollWidth = function () {
    -1 === g && l();
    return g;
  };
  f.scrollHeight = function () {
    -1 === b && l();
    return b;
  };
  var d = (function () {
    function b() {}
    b.tablet = function () {
      return 768 >= f.windowWidth();
    };
    b.phone = function () {
      return 480 >= f.windowWidth();
    };
    return b;
  })();
  f.screen = d;
})(c || (c = {}));
var svg;
(function (f) {
  function l(b, f) {
    b || (b = "svg:svg");
    b = document.createElementNS("http://www.w3.org/2000/svg", b);
    f && b.setAttribute("class", f);
    return b;
  }
  function g(b, f, k, g) {
    void 0 === g && (g = null);
    b.setAttributeNS(g, f, k);
    return b;
  }
  function b(b, f) {
    return g(b, "xlink:href", "#" + f, "http://www.w3.org/1999/xlink");
  }
  f.tag = l;
  f.setAttribute = g;
  f.setXlink = b;
  f.getIcon = function (d, h, k) {
    h = {
      svg: f.tag("svg", h),
      use: f.tag("use"),
    };
    b(h.use, k);
    h.svg.appendChild(h.use);
    d && d.appendChild(h.svg);
    return h;
  };
  f.embed = function (b, f, k, p) {
    b = ui.find("#" + b, f);
    p = l("svg", p);
    f = ui.getFragment();
    var d = b.cloneNode(!0);
    for (g(p, "viewBox", ui.getAttribute(b, "viewBox")); d.childNodes.length; )
      f.appendChild(d.firstChild);
    p.appendChild(f);
    ui.append(p, k);
    return p;
  };
})(svg || (svg = {}));
(function (f) {
  f.drMo = {
    n: -1,
    d: 0,
    x: 1,
  };
  f.anMo = {
    st: 0,
    pl: 1,
    x: 2,
  };
  f.eaTy = {
    no: 0,
    inQuad: 1,
    oQuad: 2,
    oQuint: 3,
  };
  f.ea = function (g, b) {
    return g === f.eaTy.inQuad
      ? b * b
      : g === f.eaTy.oQuad
        ? b * (2 - b)
        : g === f.eaTy.oQuint
          ? 1 + --b * b * b * b * b
          : b;
  };
  var l = (function () {
    function g(b) {
      this.ans = [];
      this.xed = f.callback();
      b && this.add(b);
    }
    g.prototype.play = function () {
      for (var b = 0, d = this.ans.length; b < d; b++) this.ans[b].play();
    };
    g.prototype.x = function () {
      for (var b = 0, d = this.ans.length; b < d; b++) this.ans[b].x();
    };
    g.prototype.stop = function () {
      for (var b = 0, d = this.ans.length; b < d; b++) this.ans[b].stop();
    };
    g.prototype.isGo = function () {
      return f.ae.isGo(this.ans);
    };
    g.prototype.add = function (b) {
      for (var d = this, f = 0, k = b.length; f < k; f++) {
        var g = b[f];
        arr.addUnique(this.ans, g) &&
          g.xed.add(function (b) {
            return d.chkX();
          });
      }
    };
    g.prototype.chkX = function () {
      f.ae.isGo(this.ans) || this.xed.fire(this);
    };
    return g;
  })();
  f.sb = l;
  l = (function () {
    function g(b, d) {
      this.el = [];
      this.ti1 = 0;
      this.f = 17;
      this.ti = 0;
      this.dur = 500;
      this.anMo = f.anMo.st;
      this.ea = f.eaTy.no;
      b && (this.el = b);
      d && (this.ea = d);
      this.xed = f.callback();
      this.chg = f.callback();
    }
    g.prototype.play = function () {
      return this.reset().setMo(f.anMo.pl).ae();
    };
    g.prototype.ae = function () {
      f.ae.add([this]);
      return this;
    };
    g.prototype.setMo = function (b) {
      this.anMo = b;
      return this;
    };
    g.prototype.reset = function () {
      this.ti1 = date.nowMs();
      this.ti = 0;
      return this;
    };
    g.prototype.draw = function () {
      if (this.anMo !== f.anMo.pl) return f.drMo.n;
      var b = date.nowMs() - this.ti1;
      if (b - this.ti < this.f) return f.drMo.n;
      this.ti = b;
      return b >= this.dur ? (this.x(), f.drMo.x) : f.drMo.d;
    };
    g.prototype.x = function () {
      this.setMo(f.anMo.x).del();
      this.xed.fire(this);
      return this;
    };
    g.prototype.stop = function () {
      return this.setMo(f.anMo.st);
    };
    g.prototype.del = function () {
      f.ae.del([this]);
      return this;
    };
    g.prototype.fps = function (b) {
      this.f = Math.floor(1e3 / b);
      return this;
    };
    g.prototype.isGo = function () {
      return this.anMo === f.anMo.pl;
    };
    g.prototype.hEl = function () {
      return this.el[0];
    };
    g.prototype.name = function () {
      return this._name ? this._name : this instanceof f.fA ? "fade" : "double";
    };
    g.fIn = function (b, d) {
      new f.fA([b], d).toIn(d);
    };
    g.fOut = function (b, d) {
      new f.fA([b], d).toOut(d);
    };
    return g;
  })();
  f.an = l;
  l = (function (g) {
    function b(b, f, k, p, n) {
      b = g.call(this, b, n) || this;
      b.prc = 0;
      b._1 = k;
      b._n = p;
      b.dur = f || 200;
      k && b.s1(k || 0);
      p && b.sN(p || 1);
      return b;
    }
    __extends(b, g);
    b.prototype.fromTo = function (b, f, k) {
      this.isGo() && this.stop();
      this.s1(b);
      this.sN(f);
      k && (this.dur = k);
      this.play();
    };
    b.prototype.play = function () {
      this.anMo === f.anMo.pl && this.stop();
      return g.prototype.play.call(this);
    };
    b.prototype.reset = function () {
      g.prototype.reset.call(this);
      this.prc = 0;
      this.val = this._1 = this.get1();
      this._n = this.getN();
      this.diff = num.round(this._n - this._1, 2);
      this.set1();
      return this;
    };
    b.prototype.draw = function () {
      var b = g.prototype.draw.call(this);
      if (b === f.drMo.d) {
        var h = num.round(Math.min(this.ti / this.dur, 1), 2),
          k = num.round(this._1 + this.diff * f.ea(this.ea, this.prc), 2);
        this.chgPrcVal(h, k);
      }
      return b;
    };
    b.prototype.x = function () {
      this.setN();
      return g.prototype.x.call(this);
    };
    b.prototype.s1 = function (b) {
      this._1 = b;
    };
    b.prototype.sN = function (b) {
      this._n = b;
    };
    b.prototype.set1 = function () {
      this.chgPrcVal(0, this._1);
    };
    b.prototype.setN = function () {
      this.chgPrcVal(1, this._n);
    };
    b.prototype.chgPrcVal = function (b, f) {
      this.prc = b;
      this.val = f;
      this.onChg();
    };
    b.prototype.onChg = function () {
      this.chg.fire(this);
    };
    b.prototype.get1 = function () {
      return this._1;
    };
    b.prototype.getN = function () {
      return this._n;
    };
    return b;
  })(f.an);
  f.dA = l;
  l = (function (f) {
    function b(b, h, k, g, n) {
      b = f.call(this, b, h, k, g, n) || this;
      b.dsp = "block";
      return b;
    }
    __extends(b, f);
    b.prototype.toIn = function (b, f) {
      this.fromTo(this.o1(!0), f || 1, b);
    };
    b.prototype.toOut = function (b, f) {
      this.fromTo(this.o1(!1), f || 0, b);
    };
    b.prototype.o1 = function (b) {
      var d = this.o();
      return d ? num.toInt(d) : b ? 0 : 1;
    };
    b.prototype.o = function () {
      return this.hEl().style.opacity || "";
    };
    b.prototype.set1 = function () {
      f.prototype.set1.call(this);
      this._n > this._1 &&
        ("none" === this.hEl().style.display ||
          "none" === ui.computedStyle(this.hEl(), "display")) &&
        ui.shows(this.el, this.dsp);
    };
    b.prototype.setN = function () {
      f.prototype.setN.call(this);
      0 === this._n && ui.hides(this.el);
    };
    b.prototype.onChg = function () {
      ui.setOpacities(this.el, this.val);
      f.prototype.onChg.call(this);
    };
    return b;
  })(f.dA);
  f.fA = l;
  l = (function (g) {
    function b(b, f) {
      return g.call(this, b, f) || this;
    }
    __extends(b, g);
    b.prototype.to = function (b, h) {
      void 0 === h && (h = !0);
      var d = !0,
        g = f.scrA.yOff(this.el);
      1 > Math.abs(g - b) && (d = !1);
      h ? this.fromTo(g, b) : ((this._n = b), this.setN());
      return d;
    };
    b.prototype.top = function () {
      for (var b = 0, f = this.el.length; b < f; b++)
        try {
          this.el[b].scrollTop = Math.floor(this.val);
        } catch (k) {}
    };
    b.prototype.onChg = function () {
      this.top();
      g.prototype.onChg.call(this);
    };
    b.prototype.yOff = function () {
      return f.scrA.yOff(this.el);
    };
    b.yOff = function (b) {
      return Math.max.apply(
        Math,
        b.map(function (b) {
          return b.scrollTop;
        }),
      );
    };
    return b;
  })(f.dA);
  f.scrA = l;
  l = (function () {
    function g() {}
    g.add = function (b) {
      arr.addUniques(f.ae.ans, b);
      f.ae.r();
    };
    g.del = function (b) {
      arr.removes(f.ae.ans, b);
    };
    g.r = function () {
      f.ae._r || ((f.ae._r = !0), f.ae.raf());
    };
    g.raf = function () {
      window.requestAnimationFrame(function () {
        return f.ae.l();
      });
    };
    g.l = function () {
      f.ae._1() === f.drMo.x ? (f.ae._r = !1) : f.ae.raf();
    };
    g._1 = function () {
      var b = date.nowMs();
      if (b - f.ae.ti < f.ae.f) return f.drMo.n;
      f.ae.ti = b;
      b = 0;
      for (var d = f.ae.ans.length; b < d; b++) {
        var h = f.ae.ans[b];
        h && h.draw();
      }
      return 0 === f.ae.ans.length ? f.drMo.x : f.drMo.d;
    };
    g.isGo = function (b) {
      return b.some(function (b) {
        return b.isGo();
      });
    };
    g.ti = 0;
    g.f = 17;
    g._r = !1;
    g.ans = [];
    return g;
  })();
  f.ae = l;
})(c || (c = {}));
(function (f) {
  f.getTouchPoint = function (g) {
    var b = c.body(),
      d = g.pageX,
      h = g.pageY;
    return ((void 0 === d && void 0 === h) || (0 === d && 0 === h)) && g.touches
      ? f.getTouchPoint(g.touches[0])
      : new f.point(d - b.scrollLeft, h - f.getBodyScrollTop());
  };
  f.getPointerEvent = function (g) {
    return f.isOnlyTouchEvent(g) ? g.changedTouches[0] : g;
  };
  f.getPointerId = function (g) {
    g = f.getPointerEvent(g);
    return g.pointerId ? g.pointerId : g.identifier;
  };
  f.getPointerMoveEndEvent = function (g, b) {
    if (f.isOnlyTouchEvent(g)) {
      g = g.changedTouches;
      for (var d = g.length, h, k = 0; k < d; k++)
        if (((h = g[k]), h.identifier === b)) return h;
    } else if (
      ("p" !== g.type[0] && !str.startsWith(g.type, "MS")) ||
      g.pointerId === b
    )
      return g;
  };
  f.isOnlyTouchEvent = function (f) {
    return "t" === f.type[0];
  };
  f.getDragEventName = function (g, b) {
    void 0 === b && (b = !0);
    g = g.type;
    for (var d = f.dragEvents, h = d.length, k = 0; k < h; k++)
      if (g === d[k][0]) return d[k][b ? 1 : 2];
    return "";
  };
  f.dragEvents = [
    ["mousedown", "mousemove", "mouseup"],
    ["touchstart", "touchmove", "touchend touchcancel"],
    ["pointerdown", "pointermove", "pointerup pointercancel"],
    ["MSPointerDown", "MSPointerMove", "MSPointerUp MSPointerCancel"],
  ];
  f.clickTimeout = 500;
  f.touchTimeout = 250;
  var l = (function () {
    function g(b, d) {
      var h = this;
      this.is1 = !0;
      this.mov = !1;
      this.len = 150;
      this.el = b;
      this.dat = d;
      this.l = c.callback();
      this.r = c.callback();
      f.tap(b, function (b) {
        return h.onTchS(b);
      });
    }
    g.prototype.onTchS = function (b) {
      var d = this,
        h = f.getPointerEvent(b);
      this.pId = h.pointerId ? h.pointerId : h.identifier;
      this.p = f.getTouchPoint(h);
      this.ms = date.nowMs();
      this.mov = !0;
      f.on(
        this.el,
        (this.movEv = f.getDragEventName(b, !0)),
        (this.mF = function (b) {
          return d.onTchM(b);
        }),
      );
      f.on(
        this.el,
        (this.endEv = f.getDragEventName(b, !1)),
        (this.eF = function (b) {
          return d.onTchE(b);
        }),
      );
    };
    g.prototype.onTchM = function (b) {
      if (this.mov) {
        var d = f.getPointerMoveEndEvent(b, this.pId);
        d &&
          ((d = f.getTouchPoint(d)),
          this.is1 && ((this.p = d), (this.is1 = !1)),
          (d = d.x - this.p.x),
          Math.abs(d) > this.len &&
            300 > date.nowMs() - this.ms &&
            (this.onTchE(b),
            0 > d
              ? this.l.fire(b, this.el, this.dat)
              : this.r.fire(b, this.el, this.dat)));
      }
    };
    g.prototype.onTchE = function (b) {
      this.is1 = !0;
      this.mov = !1;
      f.off(this.el, this.movEv, this.mF);
      f.off(this.el, this.endEv, this.eF);
    };
    return g;
  })();
  f.swipe = l;
})(ui || (ui = {}));
var keys;
(function (f) {
  f.keyCode = function (f) {
    return f.keyCode;
  };
  f.fromKeyCode = function (f) {
    var g = f - 48 * Math.floor(f / 48);
    return String.fromCharCode(96 <= f ? g : f);
  };
  f.enter = function (f) {
    return 13 === f.keyCode;
  };
  f.esc = function (f) {
    return 27 === f.keyCode;
  };
  f.tab = function (f) {
    return 9 === f.keyCode;
  };
  f.space = function (f) {
    return 32 === f.keyCode;
  };
  f.indexOf = function (f, g) {
    return g.indexOf(f.keyCode);
  };
  f.ctrl = function (f) {
    return !!f && (f.ctrlKey || f.metaKey);
  };
  f.alt = function (f) {
    return !!f && f.altKey;
  };
  f.shift = function (f) {
    return !!f && f.shiftKey;
  };
  f.ctrlAlt = function (l) {
    return f.ctrl(l) && f.alt(l);
  };
  f.ctrlAltShift = function (l) {
    return f.ctrlAlt(l) && f.shift(l);
  };
  f.ctrlShift = function (l) {
    return f.ctrl(l) && f.shift(l);
  };
  f.ctrlOrAltOrShift = function (l) {
    return f.ctrl(l) || f.shift(l) || f.alt(l);
  };
})(keys || (keys = {}));
(function (f) {
  var l = (function () {
    function g(b, d) {
      var h = this;
      this.isDrag = !1;
      this.top = this.left = this.dy = this.dx = 0;
      this.el = b;
      this.context = d;
      this.context || (this.context = this);
      this.start = c.callback();
      this.move = c.callback();
      this.end = c.callback();
      f.tap(this.el, function (b) {
        return h.onTap(b);
      });
    }
    g.prototype.onTap = function (b) {
      var d = this;
      if (f.isRightClick(b)) return !0;
      f.stopDefaultPropagation(b);
      if (this.canClick && !this.canClick.call(this.context, b, this))
        return !0;
      if (this.canDrag && !this.canDrag.call(this.context, b, this))
        return (this.fireClick(b, !1), !0);
      this.isDrag && this.free(b);
      this.isDrag = !0;
      f.addClass(this.el, "drag");
      this.left = f.getLeft(this.el);
      this.top = f.getTop(this.el);
      f.on(
        document,
        (this.moveEvent = f.getDragEventName(b)),
        (this.changeFunc = function (b) {
          return d.onMove(b);
        }),
      );
      this.fireClick(b, !0);
      return !1;
    };
    g.prototype.fireClick = function (b, d) {
      var h = this,
        k = f.getPointerEvent(b),
        g = document;
      this.pointerId = k.pointerId ? k.pointerId : k.identifier;
      d && (this.previousPoint = f.getTouchPoint(k));
      f.on(
        g,
        (this.endEvent = f.getDragEventName(b, !1)),
        (this.endFunc = function (b) {
          return h.onEnd(b, d);
        }),
      );
      this.start.fire(this, b);
    };
    g.prototype.onMove = function (b) {
      if (!this.isDrag) return !0;
      var d = f.getPointerMoveEndEvent(b, this.pointerId);
      if (!d) return !0;
      d = f.getTouchPoint(d);
      this.dx = d.x - this.previousPoint.x;
      this.dy = d.y - this.previousPoint.y;
      if (0 === this.dx && 0 === this.dy) return !0;
      this.previousPoint = d;
      this.setPos();
      this.move.fire(this, b);
      return !1;
    };
    g.prototype.setPos = function () {
      this.setLeft();
      this.setTop();
      this.moveElement();
    };
    g.prototype.setLeft = function () {
      this.left += this.dx;
    };
    g.prototype.setTop = function () {
      this.top += this.dy;
    };
    g.prototype.moveElement = function () {
      f.setLeftTop(this.el, this.left, this.top);
    };
    g.prototype.onEnd = function (b, d) {
      f.getPointerMoveEndEvent(b, this.pointerId) &&
        (this.end.fire(this, b), this.free(b, d));
    };
    g.prototype.free = function (b, d) {
      void 0 === d && (d = !0);
      this.isDrag = !1;
      f.preventDefault(b);
      d && f.deleteClass(this.el, "drag");
      b = document;
      d && f.off(b, this.moveEvent, this.changeFunc);
      f.off(b, this.endEvent, this.endFunc);
    };
    g.prototype._pot = function () {
      return new f.point(this.left, this.top);
    };
    return g;
  })();
  f.drag = l;
})(ui || (ui = {}));
(function (f) {
  f.copyToClipboard = function (f) {
    var g = document.createElement("textarea"),
      b = g.style;
    b.position = "fixed";
    ui.setLeftTop(g, 0, 0);
    b.width = b.height = "2em";
    b.padding = "0";
    b.border = b.outline = b.boxShadow = "none";
    b.background = "transparent";
    g.value = f;
    document.body.appendChild(g);
    g.focus();
    g.select();
    f = !1;
    try {
      f = document.execCommand("copy");
    } catch (d) {
      f = !1;
    }
    document.body.removeChild(g);
    return f;
  };
})(c || (c = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      this.options = __assign(
        {
          log: !0,
          referrer: !0,
        },
        b,
      );
      var d = base64js.toByteArray(b.config);
      d = new TextDecoderLite("utf-8").decode(d);
      this.config = f.parse(d);
      b.el && (this.config.el = b.el);
    }
    g.prototype.init = function () {
      var b = this;
      this.url = new f.url(this);
      this.qs = new f.queryStrings(this);
      this.hash = new f.hash();
      this.log = new f.log(this);
      this.error = new f.err(this);
      this.storage = new f.storage({
        logger: this.log,
      });
      this.loc = new f.bLoc(this);
      this.resize = f.callback();
      ui.on(window, "resize orientationchange", function (d) {
        return b.resize.fire(d);
      });
      if (!1 === this.options.log || ui.isBot()) this.log.w = f.no;
      !0 === this.options.referrer && f.setReferrer(this.config, this.storage);
      window.onerror = function (d, f, k, g, n) {
        return b.onError(d, f, k, g, n);
      };
    };
    g.prototype.onError = function (b, d, f, k, g) {
      k = (k ? "\ncolumn: " + k : "") + (g ? "\nerror: " + g : "");
      (str.isString(b) && -1 !== b.indexOf("Script error.") && 0 === f) ||
        ((b = "Global error: " + b + "\nurl: " + d + "\nline: " + f + k),
        console.log(b),
        this.log.w(b, e.logType.err));
    };
    g.prototype.confirm = function (b) {
      return ui.confirm(b, this.log);
    };
    g.prototype.alert = function (b) {
      this.log.w(b);
      alert(b);
    };
    g.prototype.get = function (b, d) {
      f.get(this.getApiUrl(b), this.getApiOptions(d));
    };
    g.prototype.post = function (b, d, h) {
      f.post(this.getApiUrl(b), d, this.getApiOptions(h));
    };
    g.prototype.put = function (b, d, h) {
      f.put(this.getApiUrl(b), d, this.getApiOptions(h));
    };
    g.prototype.patch = function (b, d, h) {
      f.patch(this.getApiUrl(b), d, this.getApiOptions(h));
    };
    g.prototype.delete = function (b, d, h) {
      f.deleteX(this.getApiUrl(b), d, this.getApiOptions(h));
    };
    g.prototype.getApiUrl = function (b) {
      return this.url.getFull("/api/v2/") + b;
    };
    g.prototype.getApiOptions = function (b) {
      var d = this;
      return (b = obj.merge(
        {
          err: function (b, f, g) {
            return d.error.on(b, void 0, f, g);
          },
        },
        b,
      ));
    };
    return g;
  })();
  f.app = l;
  f.isVersionLessThan = function (f, b) {
    a: {
      f = f.split(".");
      var d = b.split(".");
      b = f.map(Number);
      f = d.map(Number);
      for (d = 0; d < b.length; ++d) {
        if (f.length === d) {
          b = 1;
          break a;
        }
        if (b[d] !== f[d]) {
          b = b[d] > f[d] ? 1 : -1;
          break a;
        }
      }
      b = b.length !== f.length ? -1 : 0;
    }
    return -1 === b;
  };
  f.infoKey = "info";
  f.setReferrer = function (g, b) {
    (g && g.user && !e.isDemoSchool(g.user.schoolId)) ||
      ((g = document.referrer) &&
        -1 === g.indexOf("primetimetable.com") &&
        (b.get(f.infoKey) ||
          b.set(
            f.infoKey,
            {
              referrer: g,
              query: window.location.search,
            },
            !0,
          )));
  };
})(c || (c = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      this.app = b;
      this.hostName = f.location().hostname;
      this.isLocalhost = str.startsWith(this.hostName, "localhost");
    }
    g.prototype.getFull = function (b, d) {
      0 < b.length && "/" === b.substring(0, 1) && (b = str.trim1(b, "/"));
      return this.getRoot() + b;
    };
    g.prototype.getPage = function (b) {
      return this.getFull(b, !0);
    };
    g.prototype.gotoPage = function (b) {
      this.goto(this.getPage(b));
    };
    g.prototype.goto = function (b) {
      f.location().href = b;
    };
    g.prototype.getRoot = function () {
      if (void 0 === this.root) {
        var b = {
            "http:": 80,
            "https:": 443,
          },
          d = f.location().port,
          h = f.location().protocol;
        this.root =
          h +
          "//" +
          this.hostName +
          (d && d !== b[h] + "" ? ":" + d : "") +
          "/";
      }
      return this.root;
    };
    return g;
  })();
  f.url = l;
  f.toQueryString = function (f) {
    return arr.join(
      f.map(function (b) {
        return b[0] + "=" + encodeURIComponent(b[1]);
      }),
      "&",
    );
  };
  f.urlAndQuery = function (f, b) {
    return f + (b ? (-1 === f.indexOf("?") ? "?" : "&") + b : "");
  };
  f.location = function () {
    return window.location;
  };
  f.reload = function () {
    f.location().reload(!0);
  };
})(c || (c = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      this.on = !1;
      this.options = b;
      b = !0;
      try {
        b = "localStorage" in window && null !== window.localStorage;
      } catch (d) {
        b = !1;
      }
      this.on = b;
    }
    g.prototype.get = function (b, d) {
      void 0 === d && (d = !1);
      if (this.on) return ((b = localStorage[b]), d && b ? f.parse(b) : b);
    };
    g.prototype.set = function (b, d, f) {
      void 0 === f && (f = !1);
      return this.sets([[b, d]], f);
    };
    g.prototype.sets = function (b, d) {
      void 0 === d && (d = !1);
      if (!this.on) return !1;
      try {
        for (var h = 0; h < b.length; h++) {
          var k = b[h],
            g = d ? f.stringify(k[1]) : k[1];
          void 0 === g
            ? this.log("Failed to stringify: " + k[1])
            : (localStorage[k[0]] = g);
        }
      } catch (q) {
        var n = q;
      }
      return n
        ? (this.log("Updating pairs, ex message: " + n.message, e.logType.warn),
          !1)
        : !0;
    };
    g.prototype.remove = function (b) {
      this.on && b && localStorage.removeItem(b);
    };
    g.prototype.removeKeys = function (b) {
      if (this.on) for (var d = 0; d < b.length; d++) this.remove(b[d]);
    };
    g.prototype.clear = function () {
      this.on && localStorage.clear();
    };
    g.prototype.log = function (b, d) {
      void 0 === d && (d = e.logType.info);
      this.options.logger && this.options.logger.w(b, d);
    };
    return g;
  })();
  f.storage = l;
})(c || (c = {}));
(function (f) {
  var l = (function () {
    function b(b) {
      this.n = this.offMs = this.ms = 0;
      this.isOn = !0;
      this.cA = b;
      this.cmd = f.callback();
      this.onChg = f.callback();
    }
    b.prototype.w = function (b, f, k) {
      void 0 === f && (f = e.logType.info);
      f === e.logType.err && (b = str.htmlEncode(b));
      if (k && void 0 !== k.category) var d = k.category;
      this.cA.post(
        "log/",
        {
          message: b,
          type: f,
          category: d,
        },
        {
          err: function (b, d, f) {},
          done: this.chk.bind(this),
        },
      );
      this.ms = date.nowMs();
    };
    b.prototype.chk = function (b) {
      var d = this;
      f.checkSuccess(b, this.cA, !1)
        ? ((this.n = 0),
          this.isOn ||
            this.onChg.fire((this.isOn = !0), date.nowMs() - this.offMs),
          (b = b.data) &&
            b.commands &&
            0 < b.commands.length &&
            ((b = b.commands[0].name), console.log(b), this.cmd.fire(b)))
        : ((b = 5 < (this.n += 1)) &&
            this.isOn &&
            this.onChg.fire((this.isOn = !1), (this.offMs = date.nowMs())),
          b &&
            f.timeout(function () {
              return d.w("bad log " + d.n);
            }, 2e3));
    };
    return b;
  })();
  f.log = l;
  var g = (function () {
    function b(b) {
      this.cA = b;
    }
    b.prototype.on = function (b, f, k, g) {
      this.ex(f, b, k, g);
    };
    b.prototype.ex = function (b, h, k, g) {
      void 0 === k && (k = e.logType.err);
      void 0 === g && (g = !0);
      h = f.err.txt(h);
      b && (h = "While ".concat(b, " error occurred: ").concat(h));
      new l(this.cA).w(h, k);
      g && console.log("Error: " + h);
    };
    b.txt = function (b) {
      return b ? b.message + (b.stack || b.stacktrace || "") : "";
    };
    return b;
  })();
  f.err = g;
  g = (function () {
    function b(b, f) {
      void 0 === f && (f = !0);
      this.offT = this.onT = null;
      this.isOn = !1;
      this.cA = b;
      if (f) this.on();
    }
    b.prototype.on = function () {
      this.isOn ||
        (null !== this.onT && (this.offT = null),
        (this.isOn = !0),
        (this.onT = date.nowMs()));
    };
    b.prototype.off = function () {
      if (!this.isOn) return 0;
      this.offT = date.nowMs();
      this.isOn = !1;
      return this.dur(!1);
    };
    b.prototype.dur = function (b) {
      void 0 === b && (b = !0);
      return b
        ? this.off()
        : null === this.onT || null === this.offT
          ? 0
          : (this.offT - this.onT) / 1e3;
    };
    b.prototype.logDur = function (b, f) {
      return this.off();
    };
    return b;
  })();
  f.stopW = g;
})(c || (c = {}));
(function (f) {
  var l = (function () {
    function f(b) {}
    f.prototype.get = function (b, d) {
      return d;
    };
    return f;
  })();
  f.bLoc = l;
})(c || (c = {}));
(function (f) {
  function l(b) {
    var d = new f.api();
    d.state = b.state;
    b.done && d.done.add(b.done);
    b.err && d.err.add(b.err);
    void 0 !== b.timeout && (d.timeout = b.timeout);
    d.el = b.el;
    void 0 !== b.parseResponse && (d.parseResponse = b.parseResponse);
    d.responseType = b.responseType;
    return d;
  }
  function g(b) {
    if (!b) return [];
    for (var d = [], h = 0; h < b.length; h++) {
      var k = b[h],
        g = k.message || "",
        t = k.code;
      0 === g.length &&
        (t === http.errCode.unknown
          ? (g = "An error occurred." + f.tryAgain)
          : t === http.errCode.timeout
            ? (g =
                "The server takes too long to respond, probably due to poor internet connection." +
                f.tryAgain)
            : t !== http.errCode.network &&
              (t === http.errCode.stringify
                ? (g =
                    "Error occurred while trying to send your data to the server." +
                    f.tryAgain)
                : t === http.errCode.parse &&
                  (g =
                    "Error occurred while parsing data received from the server." +
                    f.tryAgain)));
      k.url && (g += " " + ui.linkMessage(k.url, k.urlTitle || "More info"));
      0 !== g.length && d.push(g);
    }
    return d;
  }
  function b(b) {
    return b
      ? b.map(function (b) {
          return b.code;
        })
      : [];
  }
  function d(d, f) {
    var h = d.errors;
    d = d.status;
    f = f || b(h);
    return !(
      arr.hasOneEqual(f, [
        http.errCode.network,
        http.errCode.timeout,
        http.errCode.badSignIn,
      ]) || d === http.statusCode.unauthorized
    );
  }
  f.get = function (b, d) {
    d = d || {};
    var f = l(d);
    void 0 !== d.attempts && (f.attempt = d.attempts);
    f.get(b, d.params);
  };
  f.post = function (b, d, f) {
    f = obj.merge(
      {
        methodType: http.methodType.post,
      },
      f,
    );
    var h = l(f);
    "" === f.contentType && (h.contentType = void 0);
    h.post(f.methodType, b, d);
  };
  f.put = function (b, d, h) {
    f.post(
      b,
      d,
      obj.merge(
        {
          methodType: http.methodType.put,
        },
        h,
      ),
    );
  };
  f.patch = function (b, d, h) {
    f.post(
      b,
      d,
      obj.merge(
        {
          methodType: http.methodType.patch,
        },
        h,
      ),
    );
  };
  f.deleteX = function (b, d, h) {
    f.post(
      b,
      d,
      obj.merge(
        {
          methodType: http.methodType.delete,
        },
        h,
      ),
    );
  };
  var h = (function () {
    function h() {
      this.type = http.methodType.get;
      this.contentType = "application/json; charset=utf-8";
      this.query = [];
      this.cache = !1;
      this.parseResponse = !0;
      this.timeout = 30;
      this.init = !1;
      this.attempt = 1;
      this.n = 0;
      this.done = f.callback();
      this.err = f.callback();
    }
    h.prototype.get = function (b, d) {
      this.url = b;
      this.query = d || [];
      this.type = http.methodType.get;
      this.send();
    };
    h.prototype.post = function (b, d, f) {
      this.type = b;
      this.url = d;
      this.data = f;
      this.send();
    };
    h.prototype.send = function () {
      var b = this;
      this.n++;
      var d = this.req;
      this.init ||
        ((this.init = !0),
        (this.req = d = new XMLHttpRequest()),
        (d.onload = function () {
          b.onReceive();
        }),
        (d.onerror = function (d) {
          b.onErrNr(http.errCode.network);
        }),
        (d.ontimeout = function () {
          b.onErrNr(http.errCode.timeout);
        }));
      if (this.setBody()) {
        try {
          (d.open(f.methodName(this.type), this.urlWithQuery(), !0),
            this.el && ui.addClass(this.el, "loading"),
            void 0 !== this.responseType &&
              (d.responseType = this.responseType));
        } catch (q) {
          this.onErrNr(http.errCode.network);
          return;
        }
        this.contentType &&
          d.setRequestHeader("Content-Type", this.contentType);
        d.timeout = 1e3 * this.timeout;
        d.send(this.body);
      }
    };
    h.prototype.setBody = function () {
      return this.data &&
        ((this.body =
          this.data instanceof FormData ? this.data : f.stringify(this.data)),
        !this.body)
        ? (this.onErrNr(http.errCode.stringify), !1)
        : !0;
    };
    h.prototype.urlWithQuery = function () {
      var b = this.query.slice();
      this.cache ||
        this.type !== http.methodType.get ||
        b.push(["guid", str.id()]);
      return f.urlAndQuery(this.url, f.toQueryString(b));
    };
    h.prototype.onReceive = function () {
      var b = this.req.status,
        d = this.responseType,
        h = (d = "blob" !== d && "arraybuffer" !== d)
          ? this.req.responseText
          : this.req.response,
        k = {
          status: b,
          body: h,
          state: this.state,
        };
      if (this.parseResponse && d) {
        if (h && ((k.data = f.parse(h)), !k.data))
          return this.onErrNr(http.errCode.parse, k.status);
        k.errors = (k.data && k.data.errors) || [];
      }
      if (http.isSuccess(b)) this.fireDone(k);
      else this.onErr(k);
    };
    h.prototype.fireDone = function (b) {
      this.n = 0;
      this.el && ui.deleteClass(this.el, "loading");
      this.done.fire(b);
    };
    h.prototype.onErrNr = function (b, d) {
      void 0 === d && (d = 0);
      this.onErr({
        status: d,
        errors: [
          {
            code: b,
          },
        ],
      });
    };
    h.prototype.onErr = function (f) {
      var h = f.errors,
        k = f.status,
        p = arr.join(g(h), "; ");
      p && (p = " messages: " + p);
      h = b(h || []);
      var t = " " + h.join(", ");
      0 !== h.length && (t = " error codes:" + t + " ");
      p = this.toString() + " status: " + k + t + p + " ";
      (k = http.repeatRequest(k) && this.n < this.attempt) &&
        (p += " attN: " + this.n + " ");
      this.err
        ? ((t = !arr.hasOneEqual(h, [http.errCode.badSignIn])),
          this.err.fire(Error(p), d(f, h) ? e.logType.err : e.logType.info, t))
        : (f.errors = []);
      k ? this.send() : this.fireDone(f);
    };
    h.prototype.toString = function () {
      return (
        f.methodName(this.type) +
        " " +
        this.url +
        (this.body ? " body: " + this.body : "")
      );
    };
    return h;
  })();
  f.api = h;
  f.methodName = function (b) {
    var d = "DELETE";
    b === http.methodType.get
      ? (d = "GET")
      : b === http.methodType.post
        ? (d = "POST")
        : b === http.methodType.put
          ? (d = "PUT")
          : b === http.methodType.patch && (d = "PATCH");
    return d;
  };
  f.checkSuccess = function (b, d, h) {
    void 0 === h && (h = !0);
    d.inf &&
      h &&
      ((h = g(b.errors)),
      f.isErrorMessage(b)
        ? d.inf.errs(h)
        : h.forEach(function (b) {
            return d.inf.add(b);
          }));
    return http.isSuccess(b.status);
  };
  f.tryAgain =
    " Try again and if the problem persists, contact us. " +
    ui.linkMessage("#troubleshooting", "Troubleshooting");
  f.getErrorMessages = g;
  f.getErrCodes = b;
  f.isErrorMessage = d;
})(c || (c = {}));
(function (f) {
  var l = (function () {
    function g(b, d) {
      void 0 === d && (d = 0);
      this.is = !1;
      this.i = 0;
      this.n = 5;
      this.isGo = !1;
      this.ty = 0;
      this.async = !0;
      this.defer = !1;
      this.url = b;
      this.ty = d;
      this.done = f.callback();
      this.err = f.callback();
    }
    g.prototype.go = function () {
      var b = this;
      if (!this.isGo) {
        this.isGo = !0;
        this.i++;
        var d = 0 === this.ty,
          f = (this.h = ui.getTag(d ? "script" : "link"));
        d
          ? this.async
            ? (f.async = !0)
            : this.defer && (f.defer = !0)
          : ui.setAttribute(
              ui.setAttribute(f, "rel", "stylesheet"),
              "type",
              "text/css",
            );
        f.onload = function () {
          return b.onDone();
        };
        f.onerror = function (d) {
          return b.onErr(d);
        };
        var k = this.url;
        d ? (f.src = k) : (f.href = k);
        ui.append(f, document.head);
      }
    };
    g.prototype.onDone = function () {
      this.is || ((this.is = !0), (this.isGo = !1), this.done.fire(this));
    };
    g.prototype.onErr = function (b) {
      this.isGo = !1;
      this.i >= this.n
        ? this.err.fire(this, b)
        : (ui.remove(this.h), this.go());
    };
    g.prototype.setDefer = function (b) {
      this.defer = b;
      this.async = !b;
    };
    return g;
  })();
  f.l = l;
})(c || (c = {}));
var a;
(function (f) {
  function l(b) {
    if (!b.has(f.viewHash.time)) return -1;
    b = num.toInt(b.get(f.viewHash.time));
    return 0 <= b && 5 >= b ? b : -1;
  }
  function g(b) {
    return b.has(f.viewHash.rotate)
      ? "0" === b.get(f.viewHash.rotate)
        ? 0
        : 1
      : -1;
  }
  function b(b, d) {
    for (
      var h = e.findView(b, d.get(f.viewHash.viewId)), k = 0;
      k < f.individualViewHashes.length;
      k++
    ) {
      var g = f.individualViewHashes[k];
      if (d.has(g)) {
        h = h ? new r.viewType(h) : r.newViewTypeFromIndex(b, k);
        g = d.get(g);
        var p = d.get(f.viewHash.groupId);
        p = p ? c.commaA(p) : [];
        d = d.get(f.viewHash.studentId);
        g &&
          ((k = e.getViewEntities(b, k + 1)),
          (k = e.byId(k, g))
            ? ((h.ve = k),
              d
                ? ((b = e.byId(k.sortedStudents, d)), h.addSelectedStudent(b))
                : 0 < p.length && h.addSelectedGroups(e.byIds(b.groups, p)))
            : ((h.veId = g), (h.groupIds = p), (h.studentId = d)));
        return h;
      }
    }
    if (h) return r.newViewType(h);
    h = d.get(f.viewHash.view);
    if (arr.has(["1", "2", "3", "4"], h))
      return r.newViewTypeFromIndex(b, num.toInt(h) - 1);
  }
  function d(b, d) {
    if (ui.iOS()) return !1;
    var h = c.findHashKeys(d, f.helpHashes),
      g = c.getHash(d, "q");
    return void 0 !== h || void 0 !== g
      ? (b.events.onHelp(h ? h[0] : "", g || ""), k(b, d), !0)
      : !1;
  }
  function h(b, d) {
    var h = c.findHashKeys(d, f.pageHashes);
    if (void 0 !== h) {
      var g = f.pageHashes.indexOf(h[0]);
      b.events.onPage(h[0], q[g], n[g]);
      k(b, d);
      return !0;
    }
    return !1;
  }
  function k(b, d) {
    var h = b.v.viewType();
    d = [[f.viewHash.id, b.t.id]];
    h.i !== e.vMod.c && d.push([f.viewHash.view, (h.i + 1).toString()]);
    b.v.is1() && d.push([f.individualViewHashes[h.i], h.ve.id]);
    h = b.v.viewType().view;
    h.isDefault || d.push([f.viewHash.viewId, h.id]);
    b.hash.updatePairs(d);
  }
  function p(b) {
    b.refresh();
    return (b = b.get(f.viewHash.id)) ? b : "";
  }
  f.onHashChg = function (k) {
    var p = k.hash,
      n = p.diff();
    p.refresh();
    var q = d(k, n),
      u = h(k, n);
    q = q || u;
    u = !1;
    if (c.hasHash(n, f.viewHash.id)) {
      u = !0;
      var A = f.getHashId(p);
      0 !== A.length &&
        k.tId !== A &&
        (k.isPublish()
          ? ((A = new f.openOptions(A, void 0, f.openM.o)),
            new f.opener(k).open(A))
          : k.events.hashIdChange.fire(A));
    }
    A = f.individualViewHashes.slice();
    A.push(f.viewHash.view, f.viewHash.viewId);
    u ||
      !c.hasAnyHash(n, A, !1) ||
      q ||
      ((q = b(k.t, p)) &&
        k.v.changeViewType(q, {
          data: !0,
        }));
    c.hasHash(n, f.viewHash.time) &&
      ((p = l(p)), -1 !== p && ((k.v.vIn.periodFormat = p), k.v.refresh()));
    c.hasHash(n, f.viewHash.rotate) &&
      ((p = g(k.hash)),
      -1 !== p && ((k.v.vIn.rotate = 0 !== p), k.v.refresh()));
    k.events.onHashChange(n);
  };
  f.hashTime = l;
  f.hashRotate = g;
  f.hashViewType = b;
  f.defaultViewHash = e.vMod.c + 1 + "";
  f.checkHelp = d;
  f.checkPage = h;
  f.getHashId = p;
  f.setHashId = function (b, d) {
    if (d !== p(b)) {
      b.delKey(b.pairs, f.viewHash.id);
      b.pairs.push([f.viewHash.id, d]);
      d = 0;
      for (var h = f.individualViewHashes; d < h.length; d++) {
        var k = c.findHash(b.pairs, h[d]);
        k && arr.remove(b.pairs, k);
      }
      d = b.toString();
      try {
        b.put(d);
      } catch (z) {
        console.error(z);
      }
    }
  };
  f.viewHash = {
    id: "id",
    view: "view",
    classId: "classId",
    teacherId: "teacherId",
    roomId: "roomId",
    subjectId: "subjectId",
    groupId: "groupId",
    studentId: "studentId",
    viewId: "viewId",
    time: "time",
    rotate: "rotate",
    resizePeriods: "rp",
    intervalInCards: "inc",
    switchView: "sv",
    forceMarks: "showMarks",
    zy: "zy",
    zy1: "zy1",
    zx: "zx",
    zx1: "zx1",
  };
  f.viewQuery = {
    view: "v",
    viewId: "viewId",
  };
  f.individualViewHashes = [
    f.viewHash.classId,
    f.viewHash.teacherId,
    f.viewHash.roomId,
    f.viewHash.subjectId,
  ];
  f.appHashes =
    "app demo open examples license profile app-options info days periods data subjects rooms teachers classes activities".split(
      " ",
    );
  f.webHashes =
    "intro testimonials features support plans account basic premium".split(
      " ",
    );
  f.pageHashes = ["terms-of-service", "privacy", "gdpr", "lower-prices"];
  var n = ["Terms of service", "Privacy", "GDPR", "Apply for lower prices"],
    q = ["/terms-of-service", "/privacy", "/gdpr", "/lower-prices"];
  f.helpHashes =
    "help top toc start overview tutorials requirements free log-in password user-profile download-archive delete-account purchase import office import-lessons timetable new open file save copy delete merge data data-basics multi-selector timetable-info day period custom subject room teacher class group student lesson activity tags statistics undo history views master individual extra manage-views zoom cards drag multi edit-cards copy-cards remove-cards merge-cards customize-cards constraints marker forbidden unwanted mandatory pin clip generate improve generator-tips levels notification ignore print print-view print-timetable print-individual print-students printing-tips share share-others publish export export-office save-file save-html save-individual-html availability-timetable save-csv options application-options troubleshooting faq constraint import-data subject-distribution max-in-row teacher-gaps teacher-load building-moves class-window class-load desired-rooms generator solver notifications option tips prevent-data-loss".split(
      " ",
    );
})(a || (a = {}));
(function (f) {
  var l = (function () {
    function f() {
      this.openStart = c.callback();
      this.openDone = c.callback();
      this.timetableChange = c.callback();
      this.hashIdChange = c.callback();
      this.modeChange = c.callback();
      this.hashChange = c.callback();
      this.helpChange = c.callback();
      this.helpPageChange = c.callback();
      this.userChange = c.callback();
      this.saveNeed = c.callback();
    }
    f.prototype.onOpenStart = function () {
      this.openStart.fire();
    };
    f.prototype.onOpenDone = function (b) {
      this.openDone.fire(b);
    };
    f.prototype.onTimetableChange = function (b, d) {
      this.timetableChange.fire(b, d);
    };
    f.prototype.onHashChange = function (b) {
      this.hashDiff = b;
      this.hashChange.fire(b);
    };
    f.prototype.onHelp = function (b, d) {
      this.helpChange.fire(b, d);
    };
    f.prototype.onPage = function (b, d, f) {
      this.helpPageChange.fire(b, d, f);
    };
    f.prototype.onUserChange = function () {
      this.userChange.fire();
    };
    f.prototype.onSaveNeed = function () {
      this.saveNeed.fire();
    };
    return f;
  })();
  f.events = l;
})(a || (a = {}));
(function (f) {
  var l = (function () {
    function f(b, d) {
      this.csss = [];
      this.skinNumber = 1;
      this.customHtml = this.customCss = this.style = "";
      this.isPreload = !1;
      this.vA = b;
      this.skinNumber = d;
    }
    f.prototype.load = function (b, d) {
      var f = this;
      void 0 === d && (d = !1);
      var k = this.csss.find(function (d) {
        return d[0] === b;
      });
      k
        ? d || this.setSkin(b, this.vA.t, k[1])
        : this.vA.get(
            "skins/" +
              b +
              "/?" +
              e.skinFolderDepth +
              "=" +
              (this.vA.isPublish() ? 1 : 0),
            {
              done: function (b) {
                return f.onDone(b);
              },
              state: d,
            },
          );
    };
    f.prototype.onDone = function (b) {
      if (http.isSuccess(b.status)) {
        var d = b.data,
          f = d.skinNumber,
          k = d.skin;
        this.csss.find(function (b) {
          return b[0] === f;
        }) || this.csss.push([f, k]);
        b.state || this.setSkin(f, this.vA.t, d.skin);
      }
    };
    f.prototype.getStyle = function (b) {
      var d = this.csss.find(function (d) {
        return d[0] === b;
      });
      return d ? d[1] : "";
    };
    f.prototype.setSkin = function (b, d, f) {
      this.setHtml(d);
      d = d.css || "";
      if (this.skinNumber !== b || this.customCss !== d)
        (f || (f = this.getStyle(b) || this.style || this.cssEl().innerHTML),
          (this.skinNumber = b),
          (this.customCss = d),
          (this.style = f),
          (this.cssEl().innerHTML = f + d));
    };
    f.prototype.setHtml = function (b) {
      var d = b.html || "";
      this.customHtml !== d &&
        ((this.customHtml = d),
        ui.all(".customHtml").forEach(function (b) {
          return (b.innerHTML = d);
        }));
    };
    f.prototype.preload = function () {
      var b = this;
      if (!this.isPreload) {
        this.isPreload = !0;
        var d = arr.range(1, e.getSkinNames().length);
        this.csss.push([this.skinNumber, this.cssEl().innerHTML]);
        arr.remove(d, this.skinNumber);
        d.forEach(function (d) {
          return b.load(d, !0);
        });
      }
    };
    f.prototype.cssEl = function () {
      this._cssEl || (this._cssEl = ui.findId("styles"));
      return this._cssEl;
    };
    return f;
  })();
  f.skins = l;
})(a || (a = {}));
(function (f) {
  var l = (function () {
    function f(b) {
      this.el = ui.setTabIndex(ui.getDiv("owl"), 0);
      b.isPublish() ||
        (ui.addClass(this.el, "loading"),
        ui.append(this.el, b.top),
        svg.embed("owlD", b.svgDef, this.el, "svgOwl"));
    }
    f.prototype.stopLoading = function () {
      ui.deleteClass(this.el, "loading");
    };
    f.prototype.over = function () {
      ui.addClass(this.el, "over");
    };
    f.prototype.out = function () {
      ui.deleteClass(this.el, "over");
    };
    f.prototype.happy = function () {
      var b = this;
      c.timeout(function () {
        return b.jumpAndFlapsWings();
      }, 500);
    };
    f.prototype.jumpAndFlapsWings = function () {
      for (
        var b = this,
          d = num.random(8, 12),
          f = 1,
          k = function (h) {
            c.timeout(
              function () {
                return ui.addClass(b.el, "down");
              },
              300 * h + 75 + num.random(-37.5, 37.5),
            );
            c.timeout(
              function () {
                return ui.addClass(ui.deleteClass(b.el, "down"), "upDown");
              },
              300 * h + 150 + num.random(-37.5, 37.5),
            );
            c.timeout(
              function () {
                return ui.addClass(ui.deleteClass(b.el, "upDown"), "up");
              },
              300 * h + 225 + num.random(-37.5, 37.5),
            );
            c.timeout(
              function () {
                return ui.deleteClass(b.el, "up");
              },
              300 * h + 300 + num.random(-37.5, 37.5),
            );
            c.timeout(function () {
              var k = "";
              1 === f
                ? ((f = 2), (k = "top"))
                : 2 === f
                  ? (f = -1)
                  : -1 === f
                    ? ((k = "bottom"), (f = 0))
                    : 0 === f && (f = 1);
              h + 1 === d && (k = "");
              ui.addClass(ui.deleteClass(b.el, "top bottom"), k);
            }, 150 * h);
          },
          g = 0;
        g < d;
        g++
      )
        k(g);
      c.timeout(function () {
        return ui.deleteClass(b.el, "top bottom");
      }, 150 * d);
    };
    return f;
  })();
  f.owl = l;
})(a || (a = {}));
(function (f) {
  function l(g) {
    return f.isAdmin(g);
  }
  f.displayUser = function (f) {
    var b = f.firstName || "";
    f.lastName && (b += " " + f.lastName);
    return b;
  };
  f.rDisp = function (g) {
    return l(g)
      ? "A"
      : f.isOwner(g)
        ? "Owner"
        : f.isCreator(g)
          ? "Creator"
          : f.isViewer(g)
            ? "Viewer"
            : "";
  };
  f.isA = l;
  f.isAS = function (f) {
    return l(f.user) || !!f.s;
  };
  f.isS = function (f) {
    return !!f.s;
  };
  f.isDemoUser = function (g) {
    return str.equalLowerCase(g.email, f.demo.email);
  };
  f.colorMode = {
    color: 0,
    blackAndWhite: 1,
  };
  f.orientation = {
    portrait: 0,
    landscape: 1,
  };
})(e || (e = {}));
(function (f) {
  function l(f, b) {
    f = "Monday Tuesday Wednesday Thursday Friday Saturday Sunday".split(" ");
    return b > f.length ? b.toString() : f[b - 1];
  }
  f.getNewDays = function (g, b, d) {
    for (var h = f.maxPos(obj.notDel(g.days)), k = [], p = 1; p <= b; p++) {
      var n = obj.newChildToUse(f.day, g);
      n.position = ++h;
      n.name = f.getDayName(d, h);
      n.shortName = f.getDayShort(d, h);
      k.push(n);
    }
    return k;
  };
  f.getDayName = l;
  f.getDayShort = function (f, b) {
    b = f = l(f, b);
    3 <= f.length && (b = b.substring(0, 2));
    return b;
  };
})(e || (e = {}));
(function (f) {
  function l(b) {
    return b.position + "";
  }
  function g(b) {
    return (
      date.time(b.startHour, b.startMinute) +
      " - " +
      date.time(b.endHour, b.endMinute)
    );
  }
  function b(b) {
    return date.time(b.startHour, b.startMinute);
  }
  function d(b) {
    return date.time(b.endHour, b.endMinute);
  }
  function h(b) {
    return date.time12(b.startHour, b.startMinute);
  }
  function k(b) {
    return date.time12(b.endHour, b.endMinute);
  }
  function p(b) {
    return 60 * b.startHour + b.startMinute;
  }
  function n(b) {
    return 60 * b.endHour + b.endMinute;
  }
  f.periodDisplay = function (b, d) {
    var h = b.name;
    return d < f.tf.n && h
      ? h
      : d === f.tf.lN || d === f.tf.n
        ? f.posDisp(b)
        : d === f.tf.l12 || d === f.tf.h12
          ? f.shortestInterval(b)
          : f.shortInterval(b);
  };
  f.posDisp = l;
  f.interval = g;
  f.shortInterval = function (f) {
    return b(f) + "<br />" + d(f);
  };
  f.shortestInterval = function (b) {
    return h(b) + "<br />" + k(b);
  };
  f.short1 = b;
  f.shortN = d;
  f.shortest1 = h;
  f.shortestN = k;
  f.startMin = p;
  f.endMin = n;
  f.duration = function (b) {
    return b.endHour >= b.startHour && b.endMinute >= b.endMinute
      ? n(b) - p(b)
      : arr.has([11, 12], b.startHour) && arr.has([1, 2], b.endHour)
        ? n({
            endHour: b.endHour + 12,
            endMinute: b.endMinute,
          }) - p(b)
        : 0;
  };
  f.maxPerNum = function (b) {
    return f.maxPos(f.defaultPeriods(b));
  };
  f.getPeriodName = function (b, d) {
    return b.name || g(b);
  };
  f.getPeriodShortName = function (b) {
    return b.shortName || g(b);
  };
  f.getPeriodComboName = function (b) {
    return l(b) + ". " + g(b) + (b.name ? " " + b.name : "");
  };
  f.customDays = function (b, d) {
    d = arr.unique(
      d.map(function (b) {
        return b.dayId;
      }),
    );
    return f.sortByPos(f.byIds(obj.notDel(b.days), d));
  };
  f.getCustomEntities = function (b, d, h) {
    if (0 === d) return [];
    b = f.getViewEntities(b, d);
    h = arr.unique(
      h.filter(function (b) {
        return b.entityType === d;
      }),
    );
    h = arr.unique(
      h.map(function (b) {
        return b.entityId;
      }),
    );
    return f.sortByPos(f.byIds(b, h));
  };
  f.getNewPeriods = function (b, d, h) {
    for (
      var k = [], g = f.getSortedDefaultPeriods(b), p = arr.last(g), n = 1;
      n <= d;
      n++
    ) {
      var q = obj.newChildToUse(f.period, b);
      h(p, q, g);
      k.push(q);
      p = q;
    }
    return k;
  };
})(e || (e = {}));
(function (f) {
  f.isExcludedFromStats = function (f) {
    return !!f.excludeStats;
  };
  f.isExcludedFromGenerator = function (f) {
    return !!f.excludeGenerator;
  };
})(e || (e = {}));
(function (f) {
  f.groupName = function (l) {
    return f.getClass(l).name + (f.isEntire(l) ? "" : " (" + l.name + ")");
  };
  f.groupShort = function (l) {
    return (
      f.getClass(l).shortName + (f.isEntire(l) ? "" : "(" + l.shortName + ")")
    );
  };
})(e || (e = {}));
(function (f) {
  function l(f, b, d) {
    void 0 === d && (d = !0);
    return (
      f.viewType === b.viewType &&
      f.individual === b.individual &&
      (d ? f.viewId === b.viewId : !0)
    );
  }
  f.isRoundStyle = function (g) {
    return (
      g.borderType === f.borderType.rounded ||
      g.borderType === f.borderType.noneRounded
    );
  };
  f.hasBorderStyle = function (g) {
    return (
      g.borderType === f.borderType.rounded ||
      g.borderType === f.borderType.squared
    );
  };
  f.getLengthTypes = function (f) {
    return f.lengthTypes.toString();
  };
  f.getEntityTypes = function (f) {
    return f.entityTypes.toString();
  };
  f.eqStyle = function (f, b, d) {
    void 0 === d && (d = !0);
    return (
      l(f, b, d) &&
      f.backgroundType === b.backgroundType &&
      f.borderType === b.borderType &&
      f.entityTypes.toString() === b.entityTypes.toString() &&
      f.lengthTypes.toString() === b.lengthTypes.toString()
    );
  };
  f.eqTypeIndividual = l;
  f.getTextCount = function (g, b) {
    var d = 0,
      h = 0;
    for (g = g.entityTypes; h < g.length; h++) {
      var k = g[h];
      k === f.cardTextType._class
        ? (d += b.parent.groupIds.length)
        : k === f.cardTextType.teacher
          ? (d += b.parent.teacherIds.length)
          : k === f.cardTextType.room
            ? (d += b.roomIds.length)
            : d++;
    }
    return d;
  };
  f.indexOfStyle = function (f, b, d) {
    return f.entityTypes.findIndex(function (h, k) {
      return b === h && f.lengthTypes[k] === d;
    });
  };
  f.delStyleAt = function (f, b) {
    f.entityTypes.splice(b, 1);
    f.lengthTypes.splice(b, 1);
  };
  f.getCustomFirstStyles = function (f) {
    return obj.notDel(f.cardStyles).sort(function (b, d) {
      return arr.sort(!b.viewId, !d.viewId);
    });
  };
})(e || (e = {}));
(function (f) {
  function l(f) {
    return !f.dayId || !f.periodId;
  }
  f.isIn = function (f) {
    return !l(f);
  };
  f.isOut = l;
  f.isOutPinned = function (f) {
    return l(f) && f.pinned;
  };
  f.allRooms = function (f) {
    return f.rooms.concat(f.parent.rooms, f.parent.moreRooms);
  };
  f.desiredAndMoreIds = function (f) {
    return f.roomIds.concat(f.moreRoomIds);
  };
  f.roomCount = function (f) {
    return f.roomIds.length;
  };
  f.inCs = function (g) {
    return g.cards.filter(function (b) {
      return f.isIn(b);
    });
  };
  f.isEntireClass = function (g) {
    return 1 === g.parent.groupIds.length && f.isEntire(g.parent.groups[0]);
  };
})(e || (e = {}));
(function (f) {
  function l(g, b) {
    void 0 === b && (b = !1);
    g = g.groups.map(function (b) {
      return f.getClass(b);
    });
    return b ? arr.unique(g) : g;
  }
  f.classes = l;
  f.getEntities = function (g, b) {
    return b === f.type.class
      ? f.classes(g.parent, !0)
      : b === f.type.teacher
        ? g.parent.teachers
        : b === f.type.room
          ? g.rooms
          : b === f.type.subject
            ? [g.parent.subject]
            : [];
  };
  f.getAllIds = function (f) {
    var b = f.parent,
      d = l(b).map(function (b) {
        return b.id;
      });
    d.push.apply(d, b.teacherIds);
    d.push.apply(d, f.roomIds);
    d.push(b.subjectId);
    return d;
  };
})(e || (e = {}));
(function (f) {
  function l(b, h) {
    var d = [],
      p = f.sortNotDel(b.views);
    b = g(b);
    for (
      var n = p.filter(function (b) {
          return b.isDefault;
        }),
        q = function (b) {
          n.find(function (d) {
            return d.entityType === b.entityType;
          }) || d.push(b);
        },
        l = 0;
      l < b.length;
      l++
    )
      q(b[l]);
    arr.filter(p, function (b) {
      if (h === f.viewVisibility.all) b = !0;
      else {
        var d = !b.hiddenInApp && !b.hiddenOnWeb;
        b =
          h === f.viewVisibility.visible
            ? d
            : h === f.viewVisibility.visibleInApp
              ? d || !b.hiddenInApp
              : h === f.viewVisibility.visibleOnWeb
                ? d || !b.hiddenOnWeb
                : h === f.viewVisibility.hidden
                  ? b.hiddenInApp && b.hiddenOnWeb
                  : !1;
      }
      return b;
    });
    d.push.apply(d, p);
    return f.sortByPos(d);
  }
  function g(d) {
    for (var h = [], k = 1; 4 >= k; k++) {
      var g = obj.newChildToUse(f.view, d);
      g.id = b[k - 1];
      obj.setUnchg(g);
      g.position = g.entityType = k;
      g.entityIds = [];
      g.isDefault = !0;
      g.name = f.getDefaultViewName(k - 1);
      h.push(g);
    }
    return h;
  }
  f.findView = function (b, h, k) {
    void 0 === k && (k = f.viewVisibility.all);
    if (h)
      return l(b, k).find(function (b) {
        return b.id === h;
      });
  };
  f.findViewIndex = function (b, h) {
    return f.getViews(b, f.viewVisibility.all).find(function (b) {
      return b.isDefault && b.entityType - 1 === h;
    });
  };
  f.findSwitcherView = function (b, h, k) {
    b = f.getViews(b, k);
    return b.length >= h + 1 ? b[h] : void 0;
  };
  f.getViews = l;
  var b = [
    "b9950cf9-2011-42c7-bccc-bb72aeaac12b",
    "1f22b16e-1e63-4bee-87c8-069e3b1ff20b",
    "b04de9fa-b83e-4743-9061-dca4a0abeaba",
    "a31a0ab8-713a-44e1-8046-c249044a27a7",
  ];
  f.getDefaultViews = g;
  f.viewVisibility = {
    all: -1,
    visible: 0,
    hidden: 1,
    visibleInApp: 2,
    visibleOnWeb: 3,
  };
})(e || (e = {}));
(function (f) {
  f.version = "2.1.0.5";
  var l = (function (g) {
    function b(b, h) {
      b =
        g.call(this, {
          config: b,
          el: h,
        }) || this;
      b.tState = f.timetableState.d;
      b.is1Loaded = !1;
      b.printSettings = {
        paperWidth: 8.5,
        paperHeight: 11,
        orientation: e.orientation.portrait,
        margin: [0.4, 0.39, 0.39, 0.4],
        colorMode: e.colorMode.color,
        scale: 100,
        isPrint: !1,
      };
      b.isMakerLoaded = !1;
      b.init();
      return b;
    }
    __extends(b, g);
    b.prototype.init = function () {
      var b = this;
      try {
        g.prototype.init.call(this);
      } catch (p) {
        console.log(p.message);
      }
      try {
        this.isDebug = this.qs.has("debug");
        var h = this.config;
        f.prepareConfig(h);
        this.el = h.el;
        this.svgDef = ui.find(".svgDef defs", c.body());
        this.setMode(h);
        var k = e.isDemoUser(h.user);
        k ||
          this.log.w(
            "ver. "
              .concat(f.version, ", ")
              .concat(
                this.isPublish() ? "Viewer" : "Maker",
                " started for email=",
              )
              .concat(h.user.email),
          );
        this.events = new f.events();
        this.initTimetable(h, k);
        this.layout = new f.layout(this);
        this.isPublish() || (this.wA = new w.wA(this));
        this.loadMaker();
        this.isPublish() &&
          window.applicationCache &&
          window.applicationCache.addEventListener("updateready", function (d) {
            return b.onAppCacheChange();
          });
        this.log.cmd.add(function (d) {
          return b.cmd(d);
        });
        this.qs.get("returnUrl") &&
          e.isDemoUser(h.user) &&
          this.inf.add("Please log in to access your timetables.");
      } catch (p) {
        this.error.on(p, "init");
      }
    };
    b.prototype.initTimetable = function (b, h) {
      this.t = {};
      obj.prep(this.t, e.timetable);
      this.timetableStorage = new f.timetableStorage({
        logger: this.log,
      });
      this.timetableStorage.init();
      this.setTimetableIdAndLastEditDate(b, h);
    };
    b.prototype.setTimetableIdAndLastEditDate = function (b, h) {
      var d = f.getHashId(this.hash),
        g = "" !== d && d !== b.id;
      g
        ? (this.tId = d)
        : this.isWeb() && h && !this.qs.get("id")
          ? (this.tId = e.timetableIds.small)
          : (this.tId = b.id);
      this.tId || (this.tId = e.timetableIds.example1);
      this.lastMilli = g ? f.openOptions.noDat : b.updatedAt;
    };
    b.prototype.isPublish = function () {
      return this.mode === e.aM.p;
    };
    b.prototype.isMaker = function () {
      return this.mode === e.aM.m;
    };
    b.prototype.isWeb = function () {
      return this.mode === e.aM.w;
    };
    b.prototype.setMode = function (b) {
      this.mode = b.mode;
      b = !1;
      this.isMaker() &&
        c.hasAnyHash(this.hash.pairs, f.webHashes) &&
        ((this.mode = e.aM.w), (b = !0));
      this.isWeb() &&
        c.hasAnyHash(this.hash.pairs, f.appHashes) &&
        ((this.mode = e.aM.m), (b = !0));
      b || this.isPublish() ? this.setElMode() : this.checkAppHash();
    };
    b.prototype.setElMode = function () {
      var b = [document.body, this.el];
      ui.deleteClasses(b, "app pub web");
      ui.addClasses(
        b,
        this.isPublish() ? "pub" : this.isMaker() ? "app" : "web",
      );
      this.checkAppHash();
    };
    b.prototype.checkAppHash = function () {
      this.isMaker() && !this.hash.has("app") && this.hash.addKey("app");
    };
    b.prototype.onAppCacheChange = function () {
      this.inf.add("Reloading page to get new version...");
      c.reload();
    };
    b.prototype.loadMaker = function () {
      var b = this;
      if (!this.isPublish())
        if (this.config.development) this.onMakerLoad();
        else {
          var f = "/js/maker/maker-".concat(this.config.maker.version, ".js");
          f = new c.l(f);
          f.done.add(function (d) {
            return b.onMakerLoad();
          });
          f.err.add(function (d, f) {
            return b.onLoadMakerError();
          });
          f.setDefer(!0);
          f.go();
        }
    };
    b.prototype.onLoadMakerError = function () {
      this.isMaker() &&
        this.inf.err("Loading failed. Refresh the webpage to try again.");
    };
    b.prototype.onMakerLoad = function () {
      this.owl.stopLoading();
      this._mA = new m.mA(this);
      this.isMakerLoaded = !0;
    };
    b.prototype.addWatchIntroVideos = function () {
      return ui.linkMessage(e.introVideos, "Watch intro videos");
    };
    b.prototype.schoolId = function () {
      return this.config.user.schoolId;
    };
    b.prototype.clearStorage = function () {
      this.storage.clear();
      this.inf.add("Local cache cleared.");
    };
    b.prototype.cmd = function (b) {
      b === http.cmds.ver
        ? this.isPublish() && c.reload()
        : b === http.cmds.web
          ? this.isPublish() && (c.location().href = this.url.getPage(""))
          : b === http.cmds.cache && this.clearStorage();
    };
    b.prototype.isSave = function () {
      return this.tState === f.timetableState.s;
    };
    b.prototype.isDemo = function () {
      return e.isDemoUser(this.config.user);
    };
    return b;
  })(c.app);
  f.vA = l;
  f.prepareConfig = function (f) {
    obj.prep(f.user, e.clientUser);
    obj.prep(f.user, e.userOptions);
  };
  f.timetableState = {
    d: 0,
    s: 1,
    l: 2,
  };
})(a || (a = {}));
(function (f) {
  var l = (function () {
    function f(b) {
      this.appName = "Prime Timetable";
      this._set = !1;
      this._win = "";
      this.nr = 0;
      this.vA = b;
      this._1 = document.title;
      this.change = c.callback();
    }
    f.prototype.initView = function (b, d) {
      var f = this;
      this.view = b;
      this.setOnInit(d);
      b.change.add(function (b) {
        return f.onViewChange(b);
      });
    };
    f.prototype.setOnInit = function (b) {
      this._set || ui.setText(this.vA.titleEl, b);
    };
    f.prototype.headTitle = function () {
      var b = this.vA,
        d = "",
        f =
          0 === this.nr || !b.isMaker() || b.config.user.hideNotifier
            ? ""
            : "(" + this.nr + ") ";
      b.isPublish() || (d = " " + e.getPlanName(b.config.pl));
      return (
        f +
        (this._win ? this._win + " - " : "") +
        this.docTitle(!1) +
        " - " +
        this.appName +
        d
      );
    };
    f.prototype.docTitle = function (b) {
      if (this.vA.isWeb()) return this.appName;
      var d = this.view && this.view.is1();
      return (
        (d && c.screen.tablet()
          ? ""
          : (this.vA.t.deleted
              ? str.wrap("[DELETED] ", '<span class="demoTitle">', "</span>")
              : "") +
            (e.isDemoUser(this.vA.config.user) && !this.vA.isPublish()
              ? str.wrap("[DEMO] ", '<span class="demoTitle">', "</span>", b)
              : "") +
            this.vA.t.name +
            (d ? " - " : "")) + (d ? this.view.viewType().name() : "")
      );
    };
    f.prototype.set = function (b) {
      void 0 === b && (b = !1);
      this._set = !0;
      var d = this.docTitle(!0),
        f = d !== this._prev;
      f &&
        ((this._prev = d),
        ui.setHtml(this.vA.titleEl, d),
        ui.setHtml(this.vA.hiddenTitle, d));
      (f || b) && this.change.fire();
      this.vA.isWeb() || (document.title = this.headTitle());
    };
    f.prototype.onViewChange = function (b) {
      this.set();
    };
    f.prototype.onWindowTitleChange = function (b) {
      this._win = b;
      this.set();
    };
    f.prototype.setNotifier = function (b) {
      this.nr = b;
      this.set();
    };
    return f;
  })();
  f.title = l;
})(a || (a = {}));
(function (f) {
  function l(b, d) {
    return {
      id: b.id,
      updatedAtMs: b.updatedAt.getTime(),
      sync: d,
    };
  }
  function g(b) {
    b = b.slice(d.length).split(",");
    return {
      id: b[0],
      updatedAtMs: num.toInt(b[1]),
      sync: num.toInt(b[2]),
    };
  }
  var b = (function (b) {
    function f(d) {
      d = b.call(this, d) || this;
      d.version = "20.0.0.0";
      d.versionKey = "version";
      return d;
    }
    __extends(f, b);
    f.prototype.init = function () {
      if (this.on) {
        var b = this.get(this.versionKey) || "0.0.0.0";
        c.isVersionLessThan(b, this.version) &&
          (this.log("Upgrading cache from " + b + " to " + this.version),
          this.updateVersion());
      } else this.log("No cache");
    };
    f.prototype.updateVersion = function () {
      this.set(this.versionKey, this.version);
      this.removeTimetables();
    };
    f.prototype.removeTimetables = function (b) {
      void 0 === b && (b = !1);
      if (this.on)
        for (var f in localStorage)
          !str.startsWith(f, d) ||
            (b && g(f).sync !== e.syncState.yes) ||
            this.remove(f);
    };
    f.prototype.removeTimetable = function (b) {
      this.on && this.remove(this.getKey(b));
    };
    f.prototype.getKey = function (b) {
      if (this.on)
        for (var f in localStorage) if (str.startsWith(f, d + b)) return f;
    };
    f.prototype.getTKeys = function () {
      if (!this.on) return [];
      var b = [],
        f;
      for (f in localStorage) str.startsWith(f, d) && b.push(g(f));
      return b;
    };
    f.prototype.updateT = function (b, f, h) {
      void 0 === h && (h = e.syncState.yes);
      if (!this.on) return !1;
      h = l(b, h);
      var k = this.getKey(h.id);
      if (k) {
        var p = g(k);
        if (!date.gtOrEq(h.updatedAtMs, p.updatedAtMs)) return !1;
        this.remove(k);
      }
      b = c.stringify(
        f
          ? b
          : obj.cloneAndMinify(b, e.timetable, {
              propFunc: function (b) {
                return b.props.concat(obj.entityStateProp, e.changedKeysProp);
              },
            }),
      );
      if (!b) return !1;
      f = d + h.id + "," + h.updatedAtMs + "," + h.sync;
      try {
        localStorage[f] = b;
      } catch (y) {
        var n = y;
      }
      return n
        ? (this.removeTimetables(),
          this.log(
            "Cache cleared while storing timetable, error message: " +
              n.message,
            e.logType.info,
          ),
          !1)
        : !0;
    };
    f.prototype.findSyncOrClient = function (b, f) {
      var h = ["", e.syncState.no];
      if (!this.on) return h;
      var k = this.getTKeys().find(function (d) {
        return d.id === b;
      });
      k &&
        (date.gtOrEq(k.updatedAtMs, f) || k.sync === e.syncState.client) &&
        ((h[0] = localStorage[d + k.id + "," + k.updatedAtMs + "," + k.sync]),
        (h[1] = k.sync));
      return h;
    };
    return f;
  })(c.storage);
  f.timetableStorage = b;
  var d = "timetable:";
})(a || (a = {}));
(function (f) {
  function l(b, d) {
    f.setHashId(d.hash, b);
    d.title.set();
    d.log.w("id=" + b + " for " + d.title.headTitle());
  }
  f.openM = {
    o: 0,
    i: 1,
    os: 2,
    m: 3,
  };
  var g = (function () {
    function b(b, f, k) {
      this.sy = e.syncState.yes;
      this.isSrv = this.is1Open = this.needServerCheck = !1;
      this.id = b;
      this.date = f;
      this.openMode = k;
    }
    b.prototype.getTime = function () {
      return this.date ? this.date.getTime() : b.noDat;
    };
    b.prototype.isI = function () {
      return this.openMode === f.openM.i;
    };
    b.prototype.isM = function () {
      return this.openMode === f.openM.m;
    };
    b.prototype.isIOrM = function () {
      return this.isI() || this.isM();
    };
    b.noDat = 0;
    return b;
  })();
  f.openOptions = g;
  f.changeIdAndTitle = l;
  g = (function () {
    function b(b) {
      this.vA = b;
      this.mrg = c.callback();
    }
    b.prototype.open = function (b) {
      var d = this,
        f = this.vA;
      if (!b.needServerCheck) f.events.onOpenStart();
      if (this.openFromStorage(b)) return !0;
      b.isSrv = !0;
      f = [];
      b.needServerCheck && f.push(["lastEditMilli", b.getTime() + ""]);
      b.is1Open && f.push(["isFirstOpen", "true"]);
      this.vA.get("timetables/" + b.id + "/", {
        params: f,
        attempts: 5,
        done: function (b) {
          return d.onOpen(b);
        },
        state: b,
      });
      return !1;
    };
    b.prototype.openFromStorage = function (b) {
      if (
        b.needServerCheck ||
        b.isM() ||
        keys.shift(b.ev) ||
        e.isDisabled(this.vA.config.acc)
      )
        return !1;
      var d = this.vA.timetableStorage.findSyncOrClient(b.id, b.getTime()),
        f = d[0];
      if (!f) return !1;
      var g = c.parse(f);
      b.sy = d[1];
      if (!g) return !1;
      this.onOpen({
        status: http.statusCode.ok,
        data: g,
        json: f,
        state: b,
      });
      b.date = g.updatedAt;
      b.needServerCheck = !0;
      this.open(b);
      return !0;
    };
    b.prototype.onOpen = function (b) {
      var d = b.state,
        f = this.vA;
      if (c.checkSuccess(b, f, this.vA.isMaker())) {
        var g = b.data;
        try {
          if (d.needServerCheck && !g) {
            this.openEnd(d, b);
            return;
          }
          if (!g) {
            this.onError(d, b);
            return;
          }
          d.isSrv &&
            (obj.prepDates(g, e.timetable, {
              deep: !1,
            }),
            f.timetableStorage.updateT(g, !0, e.syncState.yes));
          d.isIOrM()
            ? (d.isM() && obj.prep(g, e.timetable), this.mrg.fire(g, d))
            : (this.changeTo(g, e.openType.open),
              g.deleted &&
                f.inf.addTip(
                  "Choose 'Open > Open Timetable', choose 'Recently deleted', select a timetable and click Undelete to restore the timetable",
                ));
        } catch (n) {
          f.error.on(n);
          this.onError(d, b);
          return;
        }
        this.openEnd(d, b);
        this.saveIfNeeded(d);
      } else if (this.vA.isMaker() && b.status !== http.statusCode.unauthorized)
        this.onError(d, b);
    };
    b.prototype.onError = function (b, f) {
      (b && b.is1Open) ||
        this.vA.inf.err(
          "An error occurred while loading timetable. Please try again.",
        );
      this.openEnd(b, f);
    };
    b.prototype.onIOrM = function (b, f) {};
    b.prototype.saveIfNeeded = function (b) {
      if (this.checkSaveOnOpen(b))
        if (this.vA.isMakerLoaded) this.vA.events.onSaveNeed();
        else this.vA.isSOnCl = !0;
    };
    b.prototype.checkSaveOnOpen = function (b) {
      return b.sy === e.syncState.client && b.id === this.vA.t.id;
    };
    b.prototype.openEnd = function (b, h) {
      if (!b || b.openMode !== f.openM.os || !b.needServerCheck)
        this.vA.events.onOpenDone(h);
    };
    b.prototype.changeTo = function (b, f, k) {
      void 0 === k && (k = !0);
      k && obj.prep(b, e.timetable);
      k = this.vA;
      k.v &&
        k.v.is1() &&
        b.id !== k.tId &&
        k.v.viewType().toMaster(k.config.user.defaultView);
      k.tId = b.id;
      k.t = b;
      k.lastMilli = b.updatedAt.getTime();
      try {
        k.events.onTimetableChange(b, f);
      } catch (p) {
        k.error.on(p, "raising t changed event");
      }
      l(b.id, k);
    };
    return b;
  })();
  f.opener = g;
})(a || (a = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      var d = this;
      this.isViewTypeInit = !1;
      this.vA = b;
      b.isPublish() || hideLoader();
      this.opener = new f.opener(b);
      this.create();
      b.isPublish() &&
        (this.refreshId = setInterval(function () {
          return d.refreshOnTime();
        }, 6e5));
      b.title = new f.title(b);
      b.events.openDone.add(function (b) {
        d.onOpen(b);
      });
      b.events.timetableChange.add(function (b, f) {
        d.onTimetableChange();
      });
      b.skins = new f.skins(b, b.config.user.skin);
      var h = new f.openOptions(b.tId, new Date(b.lastMilli), f.openM.o);
      h.is1Open = !0;
      h = !this.openTimetable(h) && !b.isPublish() && !b.is1Loaded;
      this.initView(b, b.t, h);
      if (h)
        b.v.refresh({
          data: !0,
          isEmpty: !0,
        });
      else if (b.is1Loaded) this.onTimetableChange();
      b.title.initView(b.v, b.config.name || "");
      ui.setTabIndex(b.el, 0);
      b.isWeb() || b.el.focus();
      this.trackHash(b);
      b.v.g.resize.add(function (b) {
        return d.onResize(b);
      });
      this.onResize();
      b.config.msg && b.inf.add(b.config.msg);
      ui.click(b.el, function (d) {
        return b.v.switcher.hide(d);
      });
    }
    g.prototype.create = function () {
      ui.iOS() && ui.addClass(c.body(), "iOS");
      var b = ui.getFragment(),
        d = this.vA,
        h = ui.getDiv("infoPanel");
      d.titleEl = ui.getDiv("docTitle");
      d.hiddenTitle = ui.getDiv("allTitle");
      d.vEl = ui.getDiv("mainView");
      (d.isPublish() || d.isWeb()) && ui.hide(d.vEl);
      d.top = ui.getDiv("topBoard");
      d.bott = ui.getDiv("bottomBoard");
      d.owl = new f.owl(d);
      ui.addToFragment(b, [h, d.top]);
      d.isPublish() ||
        ((d.topShad = ui.getDiv("topShadow")),
        (d.bottShad = ui.getDiv("bottomShadow")),
        ui.addToFragment(b, [d.topShad, d.bottShad]));
      ui.addToFragment(b, [d.vEl, d.bott]);
      ui.prepend(b, d.el);
      ui.appends([d.hiddenTitle], d.top);
      this.vA.isPublish() && ui.hide(this.vA.titleEl);
      d.inf = new f.info(d, h, d.svgDef, !d.config.user.hideTips);
    };
    g.prototype.initView = function (b, d, h) {
      var k, g;
      b.pos = new ui.point(0, 0);
      b.switchView = b.isPublish()
        ? "0" !== b.qs.get(f.viewHash.switchView)
        : !0;
      var n = new v.g(b),
        q = (b.v = new v.view(b, n)),
        l = new v.input(b.t);
      n.addView(q);
      l.el = b.vEl;
      this.setVIn(l, !0);
      q.isMakerLoaded = !1;
      l.viewHeightPercentage = 100;
      h
        ? ((h = b.config.days || 5),
          (k = d.days).push.apply(k, e.getNewDays(d, h, this.vA)),
          (k = b.config.periods || 8),
          (g = d.periods).push.apply(g, e.getNewPeriods(d, k, this.setNextPer)),
          (l.viewType = r.newViewTypeFromIndex(d, e.vMod.c)))
        : b.is1Loaded
          ? ((this.isViewTypeInit = !0),
            (l.viewType = this.getViewType(b.config, b.t)))
          : (l.viewType = r.newViewTypeFromIndex(d, e.vMod.c));
      q.init(l);
      this.setZoomFromHash(q, b.hash.pairs, !1);
    };
    g.prototype.initViewType = function () {
      var b = this.vA;
      !this.isViewTypeInit &&
        b.v &&
        ((this.isViewTypeInit = !0),
        (b.v.vIn.viewType = this.getViewType(b.config, b.t)));
    };
    g.prototype.getViewType = function (b, d) {
      var h = void 0,
        k = f.hashViewType(d, this.vA.hash);
      if (k) h = k;
      else {
        k = this.vA.qs.get(f.viewQuery.viewId);
        var g = void 0;
        k && (g = e.findView(d, k)) && (h = r.newViewType(g));
        if (!g) {
          k = num.toInt(this.vA.qs.get(f.viewQuery.view));
          if (isNaN(k) || 0 > k || 3 < k) k = num.noValue;
          h = r.newViewTypeFromIndex(
            d,
            k === num.noValue
              ? this.vA.isPublish()
                ? e.vMod.c
                : b.user.defaultView
              : k,
          );
          k !== num.noValue && (f.defaultViewHash = k + 1 + "");
        }
        b = -1;
        k = 0;
        for (g = f.individualViewHashes; k < g.length; k++) {
          var n = g[k];
          ++b;
          if ((n = this.vA.qs.get(n))) {
            (h && h.i === b) || (h = r.newViewTypeFromIndex(d, b));
            h.veId = n;
            d = e.getViewEntities(d, b + 1);
            d = e.byId(d, n);
            h.ve = d;
            b === e.vMod.c &&
              (d = this.vA.qs.get(f.viewHash.studentId)) &&
              (h.studentId = d);
            break;
          }
        }
      }
      return h;
    };
    g.prototype.trackHash = function (b) {
      var d = this;
      b.hash.change.add(function () {
        return f.onHashChg(b);
      });
      b.events.hashChange.add(function (f) {
        return d.setZoomFromHash(b.v, f, !0);
      });
    };
    g.prototype.setZoomFromHash = function (b, d, h) {
      var k = !1;
      c.hasHash(d, f.viewHash.zy) &&
        ((k = num.toInt(c.getHash(d, f.viewHash.zy))),
        (b.size.rowHeight = this.zo(r.rowHeight, k)),
        (k = !0));
      c.hasHash(d, f.viewHash.zy1) &&
        ((k = num.toInt(c.getHash(d, f.viewHash.zy1))),
        (b.size.individualRowHeight = this.zo(r.individualRowHeight, k)),
        (k = !0));
      c.hasHash(d, f.viewHash.zx) &&
        ((k = num.toInt(c.getHash(d, f.viewHash.zx))),
        (b.size.zoomX = k),
        (k = !0));
      c.hasHash(d, f.viewHash.zx1) &&
        ((k = num.toInt(c.getHash(d, f.viewHash.zx1))),
        (b.size.individualZoomX = k),
        (k = !0));
      c.hasHash(d, "clearcache") &&
        (this.vA.clearStorage(), this.vA.hash.del("clearcache"));
      k && h && b.refresh();
    };
    g.prototype.refreshOnTime = function () {
      if (f.openOptions) {
        var b = new f.openOptions(
          this.vA.tId,
          new Date(this.vA.lastMilli),
          f.openM.o,
        );
        b.needServerCheck = !0;
        this.opener.open(b);
      }
    };
    g.prototype.openTimetable = function (b) {
      return this.opener.open(b);
    };
    g.prototype.setNextPer = function (b, d) {
      var f = !1;
      b ||
        ((f = !0),
        (b = {
          position: 1,
          startHour: 8,
          startMinute: 0,
          endHour: 9,
          endMinute: 0,
        }));
      obj.assign(d, b);
      f || (d.position++, d.startHour++, d.endHour++);
    };
    g.prototype.onOpen = function (b) {
      !this.vA.is1Loaded &&
        http.isSuccess(b.status) &&
        ((this.vA.is1Loaded = !0),
        this.vA.isPublish() && (hideLoader(), ui.show(this.vA.vEl)));
    };
    g.prototype.onTimetableChange = function () {
      this.initViewType();
      this.vA.v && this.vA.v.g.changeTimetable(this.vA.t);
      this.vA.title.set();
      this.vA.skins.setSkin(this.vA.config.user.skin, this.vA.t, void 0);
    };
    g.prototype.zo = function (b, d) {
      return Math.floor((b / 100) * d);
    };
    g.prototype.setVIn = function (b, d) {
      void 0 === d && (d = !1);
      var h = this.vA,
        k = h.config.user,
        g = this.vA.isPublish(),
        n = g ? !1 : !k.disableRotate,
        q = g ? e.tf.lN : k.periodFormat,
        l = !1,
        t = g ? !1 : k.resizePeriods;
      k = g ? !1 : k.intervalInCards;
      if (d) {
        d = f.hashRotate(h.hash);
        g = num.toNum(this.vA.qs.get(f.viewHash.rotate));
        if (isNaN(g) || (0 !== g && 1 !== g)) g = -1;
        -1 !== d ? (n = 1 === d) : -1 !== g && (n = 1 === g);
        d = num.toInt(this.vA.qs.get(f.viewHash.time));
        d = 1 > d || 6 < d ? -1 : d - 1;
        h = f.hashTime(h.hash);
        -1 !== h ? (q = h) : -1 !== d && (q = d);
        void 0 !== this.vA.qs.get(f.viewHash.resizePeriods) && (t = !0);
        void 0 !== this.vA.qs.get(f.viewHash.intervalInCards) && (k = !0);
        void 0 !== this.vA.qs.get(f.viewHash.forceMarks) && (l = !0);
      } else
        ((b.zoomX = h.v.size.zoomX),
          (b.rowHeight = h.v.size.rowHeight),
          (b.individualRowHeight = h.v.size.individualRowHeight));
      b.rotate = n;
      b.periodFormat = q;
      b.forceMarks = l;
      b.resizePeriods = t;
      b.intervalInCards = k;
    };
    g.prototype.onResize = function (b) {
      b = this.vA;
      b.isPublish() ||
        ([b.top, b.bott, b.topShad, b.bottShad].forEach(function (b) {
          return ui.setWidthPercentage(b, 100);
        }),
        this.vA.title.set(!0));
    };
    return g;
  })();
  f.layout = l;
})(a || (a = {}));
(function (f) {
  function l(b) {
    return b.text + b.type;
  }
  var g = (function () {
    function b(b, f, k, g) {
      void 0 === g && (g = !0);
      var d = this;
      this.xClk = [!1];
      this.mand = !1;
      this.fadeToId = -1;
      this.isClosing = this.isFading = !1;
      this.showTips = !0;
      this.all = [];
      this.tips = [];
      this.app = b;
      this.el = f;
      this.svgDef = k;
      this.showTips = g;
      this.fA = new c.fA([f], 200);
      this.fA.ea = c.eaTy.oQuad;
      this.fA.xed.add(function (b) {
        return d.onFOut();
      });
      ui.click(f, function (b) {
        return d.onClick(b);
      });
      ui.over(f, function (b, f) {
        return f ? d.over(b) : d.out(b);
      });
    }
    b.prototype.add = function (b) {
      this.addMsg({
        text: b,
        type: e.infTy.i,
      });
    };
    b.prototype.addTip = function (b) {
      return this.addMsg({
        text: b,
        type: e.infTy.i,
        tip: !0,
      });
    };
    b.prototype.warn = function (b) {
      this.addMsg({
        text: b,
        type: e.infTy.w,
      });
    };
    b.prototype.err = function (b) {
      this.addMsg({
        text: b,
        type: e.infTy.e,
      });
    };
    b.prototype.errs = function (b) {
      var d = this;
      b.forEach(function (b) {
        return d.err(b);
      });
    };
    b.prototype.mandatory = function (b) {
      this.addMsg({
        text: b,
        type: e.infTy.i,
        mandatory: !0,
      });
    };
    b.prototype.addMsg = function (b) {
      b.text = str.replaceNewLinesWithBr(b.text);
      if (b.tip) {
        var d = l(b);
        if (
          !this.showTips ||
          this.tips.some(function (b) {
            return l(b) === d;
          })
        )
          return !1;
        this.tips.push(b);
      }
      arr.insert(this.all, b, 0);
      this.onNew(b);
      return !0;
    };
    b.prototype.onNew = function (b) {
      var d = this,
        f = e.logType.debug;
      b.type === e.infTy.w
        ? (f = e.logType.warn)
        : b.type === e.infTy.e && (f = e.logType.err);
      b.tip || this.app.log.w("Info: " + b.text, f);
      this.mand = !1;
      b = ui.getFragment();
      f = 0;
      for (var g = this.all; f < g.length; f++) {
        var n = g[f];
        if (!n.read) {
          n.mandatory && (this.mand = !0);
          var q = ui.getDiv("notification");
          ui.setHtml(q, n.text);
          b.appendChild(q);
        }
      }
      ui.empty(this.el);
      f = ui.getDiv("notifications");
      ui.append(b, f);
      this.bubble = ui.getDiv("bubble");
      svg.embed("closeD", this.svgDef, this.bubble, "closeInf");
      ui.append(f, this.bubble);
      ui.append(this.bubble, this.el);
      this.xFade();
      this.isClosing = !1;
      this.fA.toIn(200);
      this.mand ||
        (this.fadeToId = c.timeout(function () {
          return d.startFade();
        }, 5e3));
    };
    b.prototype.onX = function (b) {
      this.isClosing ||
        (this.read(), this.xAn(), (this.isClosing = !0), this.fA.toOut(200));
    };
    b.prototype.startFade = function () {
      this.isClosing || ((this.isFading = !0), this.xAn(), this.fA.toOut(2500));
    };
    b.prototype.xAn = function () {};
    b.prototype.onFOut = function () {
      this.isFading && this.read();
    };
    b.prototype.onClick = function (b) {
      this.onX(b);
    };
    b.prototype.over = function (b) {
      this.isClosing ||
        ((this.isFading = !1), this.xFade(), this.xAn(), this.fA.toIn(200));
    };
    b.prototype.xFade = function () {
      -1 !== this.fadeToId && clearTimeout(this.fadeToId);
    };
    b.prototype.out = function (b) {
      var d = this;
      this.isClosing ||
        this.mand ||
        (this.xFade(),
        (this.fadeToId = c.timeout(function () {
          return d.startFade();
        }, 3e3)));
    };
    b.prototype.read = function () {
      this.all.forEach(function (b) {
        return (b.read = !0);
      });
    };
    return b;
  })();
  f.info = g;
  f.getMessageId = l;
  f.msgTy = {
    info: 0,
    warn: 1,
    err: 2,
  };
})(a || (a = {}));
var r;
(function (f) {
  function l(b) {
    var d = b.data,
      f = d._t,
      h = b.viewType().id;
    h = e.findView(f, h);
    var k = e.sortNotDel(f.days),
      p = e.sortedDefaultPeriods(f.periods),
      n = p.slice(),
      q = e.sortNotDel(f.classes),
      l = e.sortNotDel(f.teachers),
      x = e.sortNotDel(f.rooms),
      t = e.sortNotDel(f.subjects);
    if (h && !h.isDefault) {
      var u = h.entityType,
        K = h.entityIds,
        D = h.excludedDayIds,
        E = h.excludedPeriodIds;
      u === e.type.class
        ? (q = e.byIds(q, K))
        : u === e.type.teacher
          ? (l = e.byIds(l, K))
          : u === e.type.room
            ? (x = e.byIds(x, K))
            : u === e.type.subject && (t = e.byIds(t, K));
      0 < D.length &&
        arr.filter(k, function (b) {
          return !arr.has(D, b.id);
        });
      0 < E.length &&
        arr.filter(n, function (b) {
          return !arr.has(E, b.id);
        });
    }
    d.days = k;
    d.defaultPeriods = p;
    d.periods = n;
    d.customPeriods = e.customPeriods(f.periods);
    d.daysCount = d.days.length;
    d.periodsCount = d.periods.length;
    d.classes = q;
    d.rooms = x;
    d.teachers = l;
    d.subjects = t;
    d.cards = obj.notDel(f.cards);
    g(b);
  }
  function g(b) {
    var f = b.data,
      h = (f.entities = []),
      k = b.input.viewType;
    k.isClass()
      ? h.push.apply(h, f.classes)
      : k.isTeacher()
        ? h.push.apply(h, f.teachers)
        : k.isRoom()
          ? h.push.apply(h, f.rooms)
          : k.isSubject() && h.push.apply(h, f.subjects);
    d(b);
  }
  function b(b) {
    return b.data.entities;
  }
  function d(d) {
    d.data.rowsCount = d.input.is1() ? d.data.periodsCount : b(d).length;
  }
  function h(b) {
    var d = {};
    k(b, d);
    return d;
  }
  function k(b, d) {
    d._class = b._class;
    d.groups = b.groups.slice();
    d.student = b.student;
  }
  function p(b, d) {
    return d.viewType === b.viewType().i && d.individual === b.is1()
      ? obj.clone(d, e.cardStyle, {
          parent: b.data._t,
          setParent: !0,
        })
      : void 0;
  }
  function n() {
    t ||
      (t = q(e.vMod.c, e.vMod.t, e.cardTextType.subject).concat(
        q(e.vMod.t, e.vMod.c, e.cardTextType._class),
        q(e.vMod.r, e.vMod.t, e.cardTextType._class),
        q(e.vMod.s, e.vMod.c, e.cardTextType._class),
      ));
    return t;
  }
  function q(b, d, f) {
    return [u(b, d, f, !1), u(b, d, f, !0)];
  }
  function u(b, d, f, h) {
    var k = {};
    k.individual = h;
    k.viewType = b;
    k.backgroundType = d;
    k.entityTypes = [f];
    k.lengthTypes = [h ? e.lengthType.name : e.lengthType.shortName];
    k.borderType = e.borderType.rounded;
    k.viewId = "";
    return k;
  }
  f.mainType = {
    main: 0,
    extra: 1,
  };
  f.viewStatus = {
    default: 0,
    render: 1,
    resize: 2,
  };
  f.topBoardHeight = 38;
  f.bottomBoardHeight = 38;
  f.splitterWidth = 8;
  f.splitterHeight = 8;
  f.minBodyWidth = 20;
  f.minSeparationWidth = 40;
  f.separationPercentage = 90;
  f.borderWidth = 1;
  f.boldBorderWidth = 4;
  f.sideWidth = 80;
  f.rowHeight = 35;
  f.individualRowHeight = 59;
  f.getViewCards = function (b) {
    var d = b.isPrintOrPublish() ? e.inCs(b.data._t) : b.data.cards,
      f = b.viewType().view;
    if (f && !f.isDefault) {
      b = f.entityType;
      var h = f.entityIds,
        k = f.excludedDayIds;
      f = f.excludedPeriodIds;
      for (var g = [], p = 0; p < d.length; p++) {
        var n = d[p],
          q = n.parent,
          l = !1;
        if (!arr.has(k, n.dayId) && !arr.has(f, n.periodId)) {
          if (
            (b === e.type.class &&
              arr.hasOneEqual(
                q.groups.map(function (b) {
                  return e.getClass(b).id;
                }),
                h,
              )) ||
            (b === e.type.teacher && arr.hasOneEqual(q.teacherIds, h)) ||
            (b === e.type.room && arr.hasOneEqual(e.desiredAndMoreIds(q), h)) ||
            (b === e.type.subject && arr.has(h, q.subject.id))
          )
            l = !0;
          l && g.push(n);
        }
      }
      return g;
    }
    return d;
  };
  f.setTimetable = function (b, d) {
    b.data._t = d;
    l(b);
  };
  f.setData = l;
  f.setRowEntities = g;
  f.getPassInput = function (b, d) {
    return {
      startRow: b,
      endRow: d,
    };
  };
  f.getPassOutput = function (b, d) {
    return {
      metaCards: b,
      passInput: d,
    };
  };
  f.getSpot = function (b, d, f) {
    return {
      columnIndex: b,
      rowIndex: d,
      len: f,
    };
  };
  f.eqIndex = function (b, d) {
    return b.columnIndex === d.columnIndex && b.rowIndex === d.rowIndex;
  };
  f.getColumnOffset = function (b, d) {
    var h = {
      index: -1,
    };
    if (d < f.sideWidth || d > b.timetable.width) return h;
    var k = b.columnLefts.length;
    d = d - f.sideWidth - b.margin.left - b.border.left;
    for (var g = 0; g < k; g++) {
      var p = b.columnLefts[g];
      if (d < p + b.columnWidths[g]) {
        h.index = g;
        h.offset = Math.max(0, d - p);
        h.size = b.columnWidths[g];
        break;
      }
    }
    return h;
  };
  f.getRowOffset = function (b, d) {
    var f = {
      index: -1,
    };
    if (d <= b.getHeaderHeight() || d > b.maxTimetableScrollHeight) return f;
    for (var h = b.rowTops.length, k = 0; k < h; k++) {
      var g = b.rowTops[k],
        p = b.rowHeights[k];
      if (g + p > d) {
        f.index = k;
        f.offset = Math.max(0, d - g);
        f.size = p;
        break;
      }
    }
    return f;
  };
  f.getPositionIndex = function (b, d) {
    return {
      columnIndex: b,
      rowIndex: d,
    };
  };
  f.getColumnIndex = function (b, d, h, k, g) {
    d && h
      ? ((d = f.getDayPosition(b, d) - 1),
        (b = f.getPeriodPosition(b, h) - 1),
        (k = g ? d : d * (g ? 1 : k) + b))
      : (k = -1);
    return k;
  };
  f.getColumnsPerDayCount = function (b, d) {
    return d ? 1 : b;
  };
  f.getColumnsCount = function (b, d, f) {
    return f ? b : b * d;
  };
  f.getDayByColumnIndex = function (b, d, f, h) {
    return b[h ? f : Math.floor(f / d)];
  };
  f.getDayByPosition = function (b, d) {
    return b.viewType().view.isDefault
      ? b.data.days[d - 1]
      : b.data.days.find(function (b) {
          return b.position === d;
        });
  };
  f.getPeriodByPosition = function (b, d) {
    return b.viewType().view.isDefault
      ? b.data.periods[d - 1]
      : b.data.periods.find(function (b) {
          return b.position === d;
        });
  };
  f.getDayPosition = function (b, d) {
    return b.viewType().view.isDefault
      ? d.position
      : b.data.days.indexOf(d) + 1;
  };
  f.getPeriodPosition = function (b, d) {
    return b.viewType().view.isDefault
      ? d.position
      : b.data.periods
          .map(function (b) {
            return b.position;
          })
          .indexOf(d.position) + 1;
  };
  f.getMasterPeriod = function (b, d) {
    return b[d % b.length];
  };
  f.getIndividualPeriod = function (b, d) {
    return b[d];
  };
  f.getExcludedDayPositions = function (b) {
    return e
      .byIds(b.data._t.days, b.viewType().view.excludedDayIds)
      .map(function (b) {
        return b.position;
      });
  };
  f.getExcludedPeriodPositions = function (b) {
    return e
      .byIds(b.data._t.periods, b.viewType().view.excludedPeriodIds)
      .map(function (b) {
        return b.position;
      });
  };
  f.getEntities = b;
  f.getRowEntity = function (d, f) {
    return d.is1() ? d.viewType().ve : b(d)[f];
  };
  f.getRowPosition = function (d, f) {
    return d.is1()
      ? 0
      : d.viewType().view.isDefault
        ? f.position
        : b(d).indexOf(f) + 1;
  };
  f.setRowsCount = d;
  f.newFilter = function (b) {
    return {
      _class: b,
      groups: [],
    };
  };
  f.newFiltersCopy = function (b) {
    var d = [];
    b.forEach(function (b) {
      return d.push(h(b));
    });
    return d;
  };
  f.newFilterCopy = h;
  f.copyFilterTo = k;
  f.getFilteredGroups = function (b) {
    if (!b) return [];
    var d = b._class,
      f = b.student;
    b = b.groups;
    return [e.entireGroup(d)].concat(
      f ? e.byIds(e.getGroups(d), f.groupIds) : b,
    );
  };
  f.getClippedMetaCards = function (b, d) {
    b = obj.notDel(b.clips);
    d = d.cards;
    for (var f = d.length, h = [], k = 0; k < b.length; k++)
      for (var g = b[k], p = g.cards, n = [], q = 0; q < f; q++) {
        var l = d[q];
        arr.has(p, l._c) && (n.push(l), (l.clps = n), (l.clp = g), h.push(l));
      }
    return h;
  };
  f.toCs = function (b) {
    var d = [];
    b.forEach(function (b) {
      return arr.addUnique(d, b._c);
    });
    return d;
  };
  f.getBlackColor = function () {
    return f.color.rgb(0, 0, 0);
  };
  f.getWhiteColor = function () {
    return f.color.rgb(255, 255, 255);
  };
  f.getStyle = function (b, d) {
    b = e.getCustomFirstStyles(b);
    for (
      var f = d.viewType().view, h = f.id, k = f.isDefault, g = 0;
      g < b.length;
      g++
    ) {
      f = b[g];
      var q = !!f.viewId;
      if ((f = p(d, f)) && (k ? !f.viewId : q ? f.viewId === h : 1)) return f;
    }
    b = 0;
    for (h = n(); b < h.length; b++) if (((f = h[b]), (f = p(d, f)))) return f;
  };
  var t;
  f.getDefaultStyles = n;
  f.html = function (b) {
    var d = "";
    b.forEach(function (b) {
      return (d += b.html());
    });
    return d;
  };
  f.getViewClassName = function (b) {
    var d = "class";
    b === e.vMod.t
      ? (d = "teacher")
      : b === e.vMod.r
        ? (d = "room")
        : b === e.vMod.s && (d = "subject");
    return d;
  };
})(r || (r = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      this.zoomX = 100;
      this.splitterLeft = -1;
      this.forceMarks = !1;
      this.mainType = f.mainType.main;
      this.dock = !0;
      this.periodFormat = e.tf.lN;
      this.intervalInCards = this.resizePeriods = !1;
      this.rotate = !0;
      this.t = b;
      this.viewTypeChange = c.callback();
    }
    g.prototype.isMain = function () {
      return this.mainType === f.mainType.main;
    };
    g.prototype.isExtra = function () {
      return this.mainType === f.mainType.extra;
    };
    g.prototype.isDockExtra = function () {
      return this.isExtra() && this.dock;
    };
    g.prototype.is1 = function () {
      return this.viewType.is1();
    };
    g.prototype.viewIndex = function () {
      return this.viewType.i;
    };
    g.prototype.canDragVertically = function () {
      return this.viewType.isRoom() || this.is1();
    };
    g.prototype.setViewHeightPercentage = function (b) {
      this.viewHeightPercentage = b;
    };
    g.prototype.showPeriodInterval = function () {
      return this.periodFormat !== e.tf.lN && this.periodFormat !== e.tf.n;
    };
    g.prototype.is24hTime = function () {
      return this.periodFormat === e.tf.l24 || this.periodFormat === e.tf.h24;
    };
    g.prototype.setOptions = function (b, d, f, k, g) {
      var h = this.rotate !== b;
      this.rotate = b;
      b = this.periodFormat !== d;
      this.periodFormat = d;
      d = this.resizePeriods !== f;
      this.resizePeriods = f;
      f = this.intervalInCards !== k;
      this.intervalInCards = k;
      return (h || b || d || f) && g && this.optionsChange
        ? (this.optionsChange.call(this), !0)
        : !1;
    };
    g.prototype.setPeriodFormat = function (b, d) {
      this.setOptions(
        this.rotate,
        b,
        this.resizePeriods,
        this.intervalInCards,
        d,
      );
    };
    g.prototype.setResizePeriods = function (b, d) {
      this.setOptions(
        this.rotate,
        this.periodFormat,
        b,
        this.intervalInCards,
        d,
      );
    };
    g.prototype.setIntervalInCards = function (b, d) {
      this.setOptions(this.rotate, this.periodFormat, this.resizePeriods, b, d);
    };
    return g;
  })();
  f.input = l;
})(r || (r = {}));
(function (f) {
  function l(b) {
    return new g(b);
  }
  f.newViewTypeFromIndex = function (b, d) {
    return l(e.findViewIndex(b, d));
  };
  f.newViewType = l;
  var g = (function () {
    function b(b) {
      this.veId = this.ve = void 0;
      this.groupIds = [];
      this.classFilters = [];
      this.isMasterRendered = !1;
      this.view = b;
      this.id = b.id;
      this.i = b.entityType - 1;
    }
    b.prototype.is1 = function () {
      return !!this.ve;
    };
    b.prototype.isIndividualClassView = function () {
      return this.is1() && this.isClass();
    };
    b.prototype.isStudent = function () {
      return !!this.getStudent();
    };
    b.prototype.getStudent = function () {
      var b = this.getFilter();
      return b && b.student;
    };
    b.prototype.name = function () {
      if (!this.is1()) return e.getViewEntityName(this.i + 1);
      if (!this.isClass()) return this.ve ? this.ve.name : "";
      var b = this.ve;
      if (!b || obj.isDel(b)) return "";
      var f = b.name,
        k = this.getFiltersForClass(b);
      if (!k) return f;
      b = k.student;
      k = k.groups;
      if (b) return obj.isDel(b) ? f : b.name + " (".concat(f, ")");
      if (0 === k.length) return f;
      b = arr.joinCommaSpace(e.names(k));
      return f + (b ? " (" + b + ")" : "");
    };
    b.prototype.getFilter = function () {
      return this.getFiltersForClass(this.ve);
    };
    b.prototype.getFiltersForClass = function (b) {
      if (this.is1()) {
        var d = this.classFilters.find(function (d) {
          return d._class === b;
        });
        d && d.student && obj.isDel(d.student) && (d.student = void 0);
        return d;
      }
    };
    b.prototype.addSelectedGroup = function (b) {
      var d = e.getClass(b),
        k = this.getFiltersForClass(d);
      k || ((k = f.newFilter(d)), this.classFilters.push(k));
      k.groups.push(b);
    };
    b.prototype.addSelectedStudent = function (b) {
      if (b) {
        var d = b.parent,
          k = this.getFiltersForClass(d);
        k || ((k = f.newFilter(d)), this.classFilters.push(k));
        k.student = b;
        k.groups = [];
      }
    };
    b.prototype.addSelectedGroups = function (b) {
      var d = this;
      b.forEach(function (b) {
        return d.addSelectedGroup(b);
      });
    };
    b.prototype.getStudents = function () {
      return this.isIndividualClassView() ? e.getStudents(this.ve) : [];
    };
    b.prototype.toMaster = function (b) {
      this.ve = void 0;
      this.i = b;
    };
    b.prototype.from = function (b) {
      f.viewType.copyTo(b, this);
    };
    b.from = function (b) {
      var d = f.newViewTypeFromIndex(b.view.parent, b.i);
      f.viewType.copyTo(b, d);
      return d;
    };
    b.copyTo = function (b, h) {
      h.i = b.i;
      h.id = b.id;
      h.view = b.view;
      h.ve = b.ve;
      h.veId = b.veId;
      h.groupIds = b.groupIds.slice();
      h.studentId = b.studentId;
      h.classFilters = f.newFiltersCopy(b.classFilters);
    };
    b.prototype.isClass = function () {
      return this.i === e.vMod.c;
    };
    b.prototype.isTeacher = function () {
      return this.i === e.vMod.t;
    };
    b.prototype.isRoom = function () {
      return this.i === e.vMod.r;
    };
    b.prototype.isSubject = function () {
      return this.i === e.vMod.s;
    };
    b.prototype.entityType = function () {
      return this.i + 1;
    };
    return b;
  })();
  f.viewType = g;
})(r || (r = {}));
(function (f) {
  var l = (function () {
    function b(b, f) {
      void 0 === f && (f = !1);
      this.a = 255;
      this.color = b;
      f && this.setRgb();
      7 < b.length &&
        "transparent" !== b &&
        (this.color = b.slice(str.startsWith(b, "#") ? 3 : 2));
    }
    b.rgb = function (d, f, k) {
      var h = "#" + r.color.hex(d) + r.color.hex(f) + r.color.hex(k);
      h = new b(h);
      h.r = d;
      h.g = f;
      h.b = k;
      return h;
    };
    b.hex = function (b) {
      b = b.toString(16);
      1 === b.length && (b = "0" + b);
      return b;
    };
    b.prototype.setRgb = function () {
      var b = this.color;
      b = str.startsWith(b, "#") ? b.substring(1) : b;
      b = parseInt(b, 16);
      this.r = (b >> 16) & 255;
      this.g = (b >> 8) & 255;
      this.b = b & 255;
    };
    b.prototype.html = function () {
      if (this instanceof g) return "";
      var b = this.color;
      return str.startsWith(b, "#") ? b : "#" + b;
    };
    b.prototype.contrast = function () {
      return this.isLight() ? r.getBlackColor() : r.getWhiteColor();
    };
    b.prototype.isLight = function () {
      return 128 < Math.floor((this.r + this.g + this.b) / 3);
    };
    b.prototype.bwCl = function () {
      return this.isLight() ? "bl" : "wh";
    };
    b.prototype.inverse = function () {
      return b.rgb(this.a - this.r, this.a - this.g, this.a - this.b);
    };
    b.prototype.bright = function () {
      void 0 === this.r && this.setRgb();
      var d = this.rgb2Hsl();
      d.l += 0.06;
      d.l = this.clamp01(d.l);
      d = this.hsl2Rgb(d.h, d.s, d.l);
      return b.rgb(
        Math.min(255, Math.floor(d.r)),
        Math.min(255, Math.floor(d.g)),
        Math.min(255, Math.floor(d.b)),
      );
    };
    b.prototype.rgb2Hsl = function () {
      var b = this.bound01(this.r, 255),
        f = this.bound01(this.g, 255),
        k = this.bound01(this.b, 255),
        g = Math.max(b, f, k),
        n = Math.min(b, f, k),
        q = (g + n) / 2;
      if (g === n) var l = (n = 0);
      else {
        var t = g - n;
        n = 0.5 < q ? t / (2 - g - n) : t / (g + n);
        switch (g) {
          case b:
            l = (f - k) / t + (f < k ? 6 : 0);
            break;
          case f:
            l = (k - b) / t + 2;
            break;
          case k:
            l = (b - f) / t + 4;
        }
        l /= 6;
      }
      return {
        h: l,
        s: n,
        l: q,
      };
    };
    b.prototype.hsl2Rgb = function (b, f, k) {
      function d(b, d, f) {
        0 > f && (f += 1);
        1 < f && --f;
        return f < 1 / 6
          ? b + 6 * (d - b) * f
          : 0.5 > f
            ? d
            : f < 2 / 3
              ? b + (d - b) * (2 / 3 - f) * 6
              : b;
      }
      b = this.bound01(b, 1);
      f = this.bound01(f, 1);
      k = this.bound01(k, 1);
      if (0 === f) k = f = b = k;
      else {
        var h = 0.5 > k ? k * (1 + f) : k + f - k * f,
          g = 2 * k - h;
        k = d(g, h, b + 1 / 3);
        f = d(g, h, b);
        b = d(g, h, b - 1 / 3);
      }
      return {
        r: 255 * k,
        g: 255 * f,
        b: 255 * b,
      };
    };
    b.prototype.bound01 = function (b, f) {
      this.is1dot0(b) && (b = "100%");
      var d = Math.min(f, Math.max(0, parseFloat(b)));
      this.isPerc(b) && (d = parseInt(d * f + "", 10) / 100);
      return 1e-6 > Math.abs(d - f) ? 1 : (d % f) / parseFloat(f + "");
    };
    b.prototype.clamp01 = function (b) {
      return Math.min(1, Math.max(0, b));
    };
    b.prototype.is1dot0 = function (b) {
      return (
        "string" === typeof b && -1 !== b.indexOf(".") && 1 === parseFloat(b)
      );
    };
    b.prototype.isPerc = function (b) {
      return "string" === typeof b && -1 !== b.indexOf("%");
    };
    return b;
  })();
  f.color = l;
  var g = (function (b) {
    function d() {
      return b.call(this, "transparent") || this;
    }
    __extends(d, b);
    return d;
  })(l);
  f.tmCol = g;
})(r || (r = {}));
(function (f) {
  var l = (function () {
    function g(b, d, f, k) {
      this.columnIndex = -1;
      this.rowNumber = 0;
      this.periodIndex = this.dayIndex = -1;
      this.mv = b;
      this.known(d, f, k);
    }
    g.prototype.known = function (b, d, h) {
      b && (this.dayIndex = f.getDayPosition(this.mv, b) - 1);
      d &&
        ((this.columnIndex = f.getColumnIndex(
          this.mv,
          b,
          d,
          this.mv.data.periodsCount,
          this.mv.is1(),
        )),
        (this.periodIndex = f.getPeriodPosition(this.mv, d) - 1));
      void 0 !== h &&
        (this.rowNumber = this.mv.is1()
          ? d
            ? f.getPeriodPosition(this.mv, d)
            : 0
          : h);
    };
    g.prototype.getDay = function () {
      var b = this.mv.data.days,
        d = this.dayIndex;
      return -1 !== d && b.length > d && this.isRowValid() ? b[d] : void 0;
    };
    g.prototype.getPeriod = function () {
      var b = this.mv.data.periods,
        d = this.periodIndex;
      return -1 !== d && b.length > d && this.isRowValid() ? b[d] : void 0;
    };
    g.prototype.getRoom = function () {
      return this.isRowValid()
        ? this.mv.is1()
          ? this.mv.viewType().ve
          : f.getEntities(this.mv)[this.rowNumber - 1]
        : void 0;
    };
    g.prototype.isRowValid = function () {
      return 0 !== this.rowNumber && this.rowNumber <= this.mv.data.rowsCount;
    };
    g.prototype.getCellPoint = function () {
      return this.isOutRight()
        ? [0, 0]
        : [
            this.mv.size.columnLefts[this.columnIndex],
            this.mv.size.rowTops[this.rowNumber - 1] -
              this.mv.size.getHeaderHeight(),
          ];
    };
    g.prototype.isOutRight = function () {
      return -1 === this.columnIndex || 0 === this.rowNumber;
    };
    return g;
  })();
  f.position = l;
})(r || (r = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      this.scroll = {
        hasHorizontal: !1,
        hasVertical: !1,
        isHtml: !1,
        width: 0,
        height: 0,
      };
      this.bodyLimitHeight = 0;
      this.rowHeight = f.rowHeight;
      this.individualRowHeight = f.individualRowHeight;
      this.individualZoomY =
        this.individualZoomX =
        this.zoomY =
        this.zoomX =
          100;
      this.margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      };
      this.border = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      };
      this.columnLefts = [];
      this.columnWidths = [];
      this.rowTops = [];
      this.rowHeights = [];
      this.previousSeparationWidth =
        this.splitterLeft =
        this.averageRowHeight =
        this.averageColumnWidth =
          0;
      this.mv = b;
      this.input = b.input;
      this.data = b.data;
      this.splitterWidth = f.splitterWidth;
      -1 !== this.input.splitterLeft &&
        (this.splitterLeft = this.input.splitterLeft);
    }
    g.prototype.setAll = function () {
      var b = this.mv,
        d = b.is1(),
        h = b.input,
        k = h.dock,
        g = h.resizePeriods,
        n = h.viewHeightPercentage,
        q = b.printSettings(),
        l = b.isPrint(),
        t = b.isPublish(),
        x = l || t,
        y = x ? 0 : f.splitterWidth,
        z = 0 === this.splitterWidth && 0 !== y;
      this.splitterWidth = y;
      var A = (this.border = x
          ? {
              top: 2,
              right: 2,
              bottom: 2,
              left: 2,
            }
          : {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }),
        B = (this.margin = {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }),
        C = A.left + A.right,
        G = A.top + A.bottom;
      h.isMain() &&
        (x
          ? ((B.right = B.left = 15), (B.bottom = 10))
          : (B.right = B.bottom = B.left = 0),
        (B.top = b.isTitleVisible() ? 10 : 0));
      var P = B.left + B.right,
        H = this.getZoomX();
      h = this.scroll;
      h.isHtml = x;
      h.hasHorizontal =
        void 0 !== this.hasHorizontal ? this.hasHorizontal : 100 !== H;
      this.hasHorizontal = void 0;
      h.height = !x && h.hasHorizontal ? c.scrollHeight() : 0;
      var I = x ? 0 : f.topBoardHeight,
        J = x ? 0 : f.bottomBoardHeight,
        Q = (l ? q.height : c.windowHeight()) - (t ? c.scrollHeight() : 0),
        K = Q;
      this.viewsAreaHeight = K - (I + J);
      var D = this.predefinedViewHeight;
      if (k || void 0 === D)
        D = this.predefinedViewHeight = (n / 100) * this.viewsAreaHeight;
      n = this.getHeaderHeight();
      J = this.data;
      I = J.rowsCount;
      var E = J.periods,
        N = J.customPeriods;
      this.bodyLimitHeight = Math.max(D - n, 0);
      k ||
        0 === I ||
        ((I = Math.floor((this.bodyLimitHeight - f.borderWidth * I) / I)),
        12 < I || (I = 12),
        this.setRowHeight(I, 100, d));
      I = 0;
      J = [];
      for (var R = -1, F = b.viewType().ve, M = 0; M < E.length; M++) {
        var L = E[M];
        L = e.duration(
          d ? this.getPeriodForIndividualView(E, N, ++R, F.id) : L,
        );
        I += L;
        J.push(L);
      }
      E = d = this.setRows(n, J, I, g, k);
      b.needPaging && b.paging.setPaging(E);
      N = n + E;
      R = this.getTitleAndYearHeight();
      F = this.getAboveHeight() + this.getBelowHeight();
      h.hasVertical = t
        ? N + F > K
        : l
          ? E + n + F + (b.paging.totalPages - 1) * E > c.windowHeight()
          : E >= this.bodyLimitHeight;
      h.width = h.hasVertical && !l ? c.scrollWidth() : 0;
      G = (l ? q.height : D) - B.top - B.bottom - G;
      this.backgroundHeight = x ? N : D - h.height;
      this.maxTimetableScrollHeight = x ? N : k ? Math.max(N, G) : G;
      x &&
        (K = G =
          this.maxTimetableScrollHeight +
          this.getAboveHeight() +
          this.getBelowHeight());
      D = h.hasVertical || x ? Math.min(E, G - n) : (E = G - n);
      F = D + n;
      M = q = (l ? q.width : c.windowWidth()) - (t ? h.width : 0);
      L = this.predefinedViewWidth;
      if (k || void 0 === L) L = this.predefinedViewWidth = q;
      k = L - P;
      H = (H / 100) * (k - f.sideWidth - C);
      var X = H + f.sideWidth,
        S = X + C + P,
        O = Math.max(H - y, f.minSeparationWidth),
        T = O;
      x ||
        (T =
          b.isResizing() && !z
            ? Math.max(
                Math.floor(
                  (O / 100) *
                    (0 === this.previousSeparationWidth
                      ? f.separationPercentage
                      : (100 * this.content.width) /
                        this.previousSeparationWidth),
                ),
                f.minBodyWidth,
              )
            : 0 === this.splitterLeft
              ? Math.max(
                  Math.floor((O / 100) * f.separationPercentage),
                  f.minBodyWidth,
                )
              : Math.max(this.splitterLeft, 0));
      b = f.sideWidth + T;
      l || (this.splitterLeft = T);
      this.previousSeparationWidth = O;
      z = Math.max(H - y - T, 0);
      y = x ? T : Math.min(T + y + z, k - f.sideWidth);
      l && (h.hasHorizontal = S > c.windowWidth());
      t && ((k = f.sideWidth + y + C), (M = L = k + P));
      t = R + A.top;
      C = A.left;
      P = C + f.sideWidth;
      S = t + n;
      this.window = {
        width: q,
        height: Q,
      };
      this.app = {
        width: M,
        height: K,
      };
      this.container = {
        width: L,
        height: G,
      };
      this.page = {
        left: 0,
        top: 0,
        width: k,
        height: G,
        scrollWidth: X,
        scrollHeight: N,
        margin: B,
      };
      this.mesh = {
        left: 0,
        top: R,
        width: f.sideWidth + y,
        height: this.maxTimetableScrollHeight + h.height,
      };
      this.header = {
        left: P,
        top: t,
        width: y,
        height: n + D,
        headerHeight: n,
        scrollWidth: H,
        scrollHeight: n + D,
      };
      this.side = {
        left: C,
        top: S,
        width: f.sideWidth + y,
        height: D - A.bottom - h.height,
        scrollWidth: f.sideWidth,
        scrollHeight: E,
      };
      this.content = {
        width: T,
        height: d,
      };
      this.body = {
        left: P,
        top: S,
        width: y,
        height: D,
        scrollWidth: H,
        scrollHeight: E,
      };
      this.outsideBack = {
        width: z,
      };
      this.outside = {
        width: z - (h.hasVertical ? c.scrollWidth() : 0),
        height: x ? E : this.backgroundHeight - n,
      };
      this.timetable = {
        width: b,
        height: F,
        scrollWidth: X,
        scrollHeight: N,
      };
      this.horizontalLineWidth =
        f.sideWidth +
        (this.hasOutLines()
          ? y - (h.hasVertical && this.mv.isMaker() && !l ? c.scrollWidth() : 0)
          : T);
      this.splitterHeight = E - (h.hasVertical ? 0 : h.height);
      this.setColumns(J, I, g);
    };
    g.prototype.hasOutLines = function () {
      return !(this.input.is1() && this.input.resizePeriods);
    };
    g.prototype.getAboveHeight = function () {
      return this.mv.isPrintOrPublish()
        ? this.getTitleAndYearHeight() + this.margin.top + this.border.top
        : this.mv.isExtra()
          ? 0
          : f.topBoardHeight;
    };
    g.prototype.getBelowHeight = function () {
      return this.margin.bottom + this.border.bottom;
    };
    g.prototype.setRows = function (b, d, h, k, g) {
      var p = this.input.is1(),
        q = this.data.rowsCount,
        l = this.getRowHeight();
      h = (q * l) / h;
      for (
        var t = (this.rowHeights = []),
          x = (this.rowTops = []),
          y = b,
          z = 0,
          A = 0;
        A < q;
        A++
      ) {
        var B = l;
        p && k && (B = h * d[A]);
        B += z;
        z = Math.floor(B);
        t[A] = z;
        x.push(y);
        y += z + f.borderWidth;
        z = B - z;
      }
      this.averageRowHeight = arr.sum(t) / t.length;
      return y - (g ? f.borderWidth : 0) - b;
    };
    g.prototype.setColumns = function (b, d, h) {
      var k = (this.columnLefts = []),
        g = (this.columnWidths = []),
        n = this.input.is1(),
        q = this.data,
        l = q.daysCount,
        t = q.periodsCount,
        x = q.periods;
      q = f.getColumnsPerDayCount(t, n);
      var y = (l - 1) * f.boldBorderWidth,
        z = this.content.width,
        A = (z - y) / l,
        B = (q - 1) * f.borderWidth,
        C = B * l;
      d = (A - B) / d;
      B = f.getColumnsCount(l, t, n);
      this.averageColumnWidth = (z - y - C) / B;
      y = [];
      for (C = 0; C < x.length; C++)
        y[C] = n ? A : h ? d * b[C] : this.averageColumnWidth;
      d = b = 0;
      for (h = 1; h <= l; h++)
        for (x = 1; x <= q; x++)
          ((d += y[x - 1]),
            (A = Math.max(Math.floor(d) - b, 0)),
            h === l && x === q && A + b !== z && (A = Math.max(z - b, 0)),
            g.push(A),
            k.push(b),
            (C = n || x === t ? f.boldBorderWidth : f.borderWidth),
            (d += C),
            (b += A + C));
    };
    g.prototype.getRowHeight = function () {
      return this.input.is1() ? this.individualRowHeight : this.rowHeight;
    };
    g.prototype.getRowBorderHeight = function () {
      return this.getRowHeight() + f.borderWidth;
    };
    g.prototype.setRowHeight = function (b, d, f) {
      var h = !1;
      f
        ? this.individualRowHeight !== b &&
          ((this.individualRowHeight = b), (this.individualZoomY = d), (h = !0))
        : this.rowHeight !== b &&
          ((this.rowHeight = b), (this.zoomY = d), (h = !0));
      return h;
    };
    g.prototype.getDefaultRowHeight = function () {
      return this.input.is1() ? f.individualRowHeight : f.rowHeight;
    };
    g.prototype.getZoomY = function () {
      return Math.floor(
        (this.getRowHeight() / this.getDefaultRowHeight()) * 100,
      );
    };
    g.prototype.getZoomX = function () {
      return this.mv.isMaker() || !this.input.is1()
        ? this.zoomX
        : this.individualZoomX;
    };
    g.prototype.setZoomX = function (b) {
      var d = !1;
      this.mv.isMaker() || !this.input.is1()
        ? this.zoomX !== b && ((this.zoomX = b), (d = !0))
        : this.individualZoomX !== b && ((this.individualZoomX = b), (d = !0));
      return d;
    };
    g.prototype.getHeaderHeight = function () {
      return this.mv.isDockExtra() ? 0 : 50;
    };
    g.prototype.getfirstHalfHeaderHeight = function () {
      return this.getHeaderHeight() / 2;
    };
    g.prototype.getSecondHalfHeaderHeight = function () {
      return this.getHeaderHeight() / 2;
    };
    g.prototype.getTitleAndYearHeight = function () {
      return this.mv.isTitleVisible() ? 70 : 0;
    };
    g.prototype.checkSplitterLeft = function (b) {
      var d = this.body.scrollWidth - this.splitterWidth - 10;
      return b > f.sideWidth + f.minBodyWidth && b < d;
    };
    g.prototype.setSplitterLeft = function (b) {
      this.splitterLeft = b;
    };
    g.prototype.getPeriodForIndividualView = function (b, d, f, k) {
      var h = b[f];
      b = d
        .filter(function (b) {
          return b.showCustom && b.position === h.position && b.entityId === k;
        })
        .sort(function (b, d) {
          return e.startMin(b) - e.startMin(d) || e.endMin(b) - e.endMin(d);
        });
      return arr.first(b) || h;
    };
    return g;
  })();
  f.size = l;
})(r || (r = {}));
(function (f) {
  f.resetMeshHeaderAndSide = function (f) {
    f.meshElements = [];
    f.verticals = [];
    f.dayPanels = [];
    f.periodPanels = [];
    f.headerElements = [];
    f.horizontalLines = [];
    f.labelPanels = [];
  };
  f.resetBody = function (f) {
    f.all = [];
    f.inCards = [];
    f.outCards = [];
    f.cards = [];
    f.marks = [];
  };
  f.setAllBeforeAddingCards = function (f) {
    f.all = f.meshElements.concat(
      f.headerElements,
      f.horizontalLines,
      f.labelPanels,
      f.splitter,
      f.outside,
    );
  };
  f.addSpot = function (f, g) {
    g.spots.push(f);
    g.all.push(f);
  };
  f.resetSpots = function (f) {
    arr.removes(f.all, f.spots);
    f.spots = [];
  };
  f.getScheduledCards = function (f) {
    return f.cards.filter(function (f) {
      return f.isIn();
    });
  };
  f.getOutput = function () {
    return {
      horizontals: [],
      labelPanels: [],
      verticals: [],
      periodPanels: [],
      dayPanels: [],
      meshElements: [],
      marks: [],
      inCards: [],
      outCards: [],
      cards: [],
      all: [],
      spots: [],
    };
  };
})(r || (r = {}));
(function (f) {
  function l(f, b, d, h) {
    b = b.position - 1;
    f = f.data.periods;
    var k = f.length,
      g = b,
      n = 0,
      q = h ? -1 : 1;
    for (d = h ? e.startMin(d) : e.endMin(d); n !== k; ) {
      ++n;
      h = f[g];
      if (d <= e.endMin(h)) return h;
      g += q;
      -1 === g ? ((g = b + 1), (q = 1)) : g === k && ((g = b - 1), (q = -1));
    }
    return arr.last(f);
  }
  f.getCustomPeriod = function (f, b, d) {
    return {
      defaultPeriod: b,
      custom: d,
      startPeriod: l(f, b, d, !0),
      endPeriod: l(f, b, d, !1),
    };
  };
})(r || (r = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      this.status = f.viewStatus.default;
      this.angStep = 15;
      this.pageNumber = 1;
      this.isMarkerPicked = this.needPaging = !1;
      this.vA = b;
    }
    g.prototype.go = function (b) {
      this.input = b;
      this.data = {};
      f.setTimetable(this, b.t);
      var d = (this.size = new f.size(this));
      d.setZoomX(b.zoomX);
      void 0 !== b.rowHeight && (d.rowHeight = b.rowHeight);
      void 0 !== b.individualRowHeight &&
        (d.individualRowHeight = b.individualRowHeight);
      this.layer = new f.layer(this);
      this.zI = new f.zI();
      this.paging = new f.paging(this);
      this.outPanel = new f.outPanel(this);
    };
    g.prototype.isDockExtra = function () {
      return this.input.isDockExtra();
    };
    g.prototype.isBlackAndWhite = function () {
      return (
        this.isPrint() &&
        this.printSettings().colorMode === e.colorMode.blackAndWhite
      );
    };
    g.prototype.getTitle = function () {
      var b = this.data._t.schoolName;
      b += this.is1() ? (b ? " - " : "") + this.viewType().name() : "";
      return this.getEditTitleWhenPrint(b);
    };
    g.prototype.getYear = function () {
      return this.getEditTitleWhenPrint(this.data._t.year);
    };
    g.prototype.getEditTitleWhenPrint = function (b) {
      return str.wrap(
        b,
        '<a href="#info" data-hint="Click to edit" class="'.concat(
          ui.hintClass(c.hintPos.right),
          '">',
        ),
        "</a>",
        this.isPrint(),
      );
    };
    g.prototype.isTitleVisible = function () {
      return this.isPrintOrPublish() && (1 === this.pageNumber || this.is1());
    };
    g.prototype.changeTimetable = function (b) {
      f.setTimetable(this, b);
    };
    g.prototype.isWorking = function () {
      return this.status !== f.viewStatus.default;
    };
    g.prototype.isResizing = function () {
      return this.status === f.viewStatus.resize;
    };
    g.prototype.isPrint = function () {
      return this.printSettings().isPrint && !this.isExtra();
    };
    g.prototype.isPrintOrPublish = function () {
      return this.isPrint() || this.isPublish();
    };
    g.prototype.printSettings = function () {
      return this.vA.printSettings;
    };
    g.prototype.isPublish = function () {
      return this.vA.isPublish();
    };
    g.prototype.isWeb = function () {
      return this.vA.isWeb();
    };
    g.prototype.isMaker = function () {
      return this.vA.isMaker();
    };
    g.prototype.is1 = function () {
      return this.input.is1();
    };
    g.prototype.isExtra = function () {
      return this.input.isExtra();
    };
    g.prototype.isFloat = function () {
      return this.isExtra() && !this.input.dock;
    };
    g.prototype.isMain = function () {
      return this.input.isMain();
    };
    g.prototype.viewType = function () {
      return this.input.viewType;
    };
    return g;
  })();
  f.view = l;
})(r || (r = {}));
(function (f) {
  function l(b) {
    return (
      (void 0 === b.x || null === b.x ? "" : "left:" + b.x + "px;") +
      (void 0 === b.y || null === b.y ? "" : "top:" + b.y + "px;") +
      (void 0 === b.w || null === b.w ? "" : "width:" + b.w + "px;") +
      (void 0 === b.h || null === b.h ? "" : "height:" + b.h + "px;")
    );
  }
  f.dSty = l;
  var g = (function () {
    function b() {
      this.ty = 0;
    }
    b.go = function (d, f, g, n, q) {
      var h = new b();
      h.cl = d;
      h.setWhxy(f, g, n, q);
      return h;
    };
    b.prototype.upd = function (b, d) {
      this.whxy(b, d);
    };
    b.prototype.whxy = function (b, d) {};
    b.prototype.setWhxy = function (b, d, f, g) {
      this.w = b;
      this.h = d;
      this.x = f;
      this.y = g;
    };
    b.prototype.isVc = function () {
      return 1 === this.ty;
    };
    b.prototype.html = function () {
      var b = this.id,
        d = this.cl,
        f = this.sty(),
        g = this.attr();
      return (
        "<div" +
        (void 0 === b ? "" : ' id="' + b + '"') +
        (void 0 === d ? "" : ' class="' + d + '"') +
        (g ? " " + g : "") +
        (f ? ' style="' + f + '"' : "") +
        ">" +
        this.inner() +
        "</div>"
      );
    };
    b.prototype.attr = function () {
      return "";
    };
    b.prototype.sty = function () {
      return l(this);
    };
    b.prototype.inner = function () {
      return "";
    };
    return b;
  })();
  f.mEl = g;
  var b = (function (b) {
    function d(d) {
      var f = b.call(this) || this;
      f.cl = "namesBg";
      f.whxy(d, null);
      return f;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      this.setWhxy(f.sideWidth, b.backgroundHeight + b.scroll.height, 0, 0);
    };
    return d;
  })(g);
  f.sideBack = b;
  b = (function (b) {
    function d(d, f, h) {
      var k = b.call(this) || this;
      k.cl = d;
      k.isOn = f;
      k.whxy(h, null);
      return k;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      this.setWhxy(
        null,
        this.isOn ? b.getHeaderHeight() : b.backgroundHeight + b.scroll.height,
        b.content.width,
        0,
      );
    };
    return d;
  })(g);
  f.headerSplitter = b;
  b = (function (b) {
    function d(d, f) {
      var h = b.call(this) || this;
      h.cl = d;
      h.whxy(f, null);
      return h;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      this.setWhxy(null, b.splitterHeight, b.content.width, 0);
    };
    return d;
  })(g);
  f.splitter = b;
  b = (function (b) {
    function d(d, f, h, g, l, t, x) {
      void 0 === t && (t = 0);
      void 0 === x && (x = !1);
      var k = b.call(this) || this;
      k.i = d;
      k.top = f;
      k.borderWidth = h;
      k.cl = "verLine " + g;
      k.xOffset = t;
      k.isSideBoldLine = x;
      k.whxy(l, null);
      return k;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      this.setWhxy(
        null,
        b.backgroundHeight -
          this.top +
          (this.isSideBoldLine ? b.scroll.height : 0),
        b.columnLefts[this.i] - this.borderWidth + this.xOffset,
        this.top,
      );
    };
    return d;
  })(g);
  f.verticalLine = b;
  b = (function (b) {
    function d(d, h, g, q, l, t, x) {
      var k = b.call(this) || this;
      k.day = d;
      k.i = h;
      k.txt = g;
      k.isMain = q;
      k.perDN = l;
      k.d = t;
      k.id = x;
      k.cl = "dayBorder";
      k.h = t.mv.is1()
        ? t.getHeaderHeight() - f.boldBorderWidth
        : t.getfirstHalfHeaderHeight();
      k.whxy(t, null);
      return k;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      d = this.i;
      this.setWhxy(
        (b.columnLefts.length > d + this.perDN
          ? b.columnLefts[d + this.perDN] - f.boldBorderWidth
          : b.content.width) - b.columnLefts[d],
        this.h,
        b.columnLefts[d],
        0,
      );
    };
    d.prototype.inner = function () {
      return (
        "<div" +
        (this.isMain ? "" : ' title="Drag to move extra view"') +
        ">" +
        this.txt +
        "</div>"
      );
    };
    return d;
  })(g);
  f.dayElement = b;
  b = (function (b) {
    function d(d, f, h, g) {
      var k = b.call(this) || this;
      k.per = d;
      k.colI = f;
      k.d = h;
      k.id = g;
      k.cl = "periodBorder hint--rounded hint--bounce hint--bottom";
      k.txt = e.periodDisplay(d, h.input.periodFormat);
      k.whxy(h, null);
      return k;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      d = this.colI;
      this.setWhxy(
        b.columnWidths[d],
        b.getSecondHalfHeaderHeight() - f.boldBorderWidth,
        b.columnLefts[d],
        b.getfirstHalfHeaderHeight(),
      );
    };
    d.prototype.inner = function () {
      return '<div class="periodText">' + this.txt + "</div>";
    };
    d.prototype.attr = function () {
      var b = this.txt;
      return 4 < b.length ? 'data-hint="' + c.convertBrsToDashes(b) + '"' : "";
    };
    return d;
  })(g);
  f.periodEl = b;
  b = (function (b) {
    function d(d) {
      var f = b.call(this) || this;
      f.cl = "headerBorder";
      f.whxy(d, null);
      return f;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      this.setWhxy(
        f.sideWidth + b.body.width,
        null,
        0,
        b.getHeaderHeight() - f.boldBorderWidth,
      );
    };
    return d;
  })(g);
  f.headerBoldLine = b;
  b = (function (b) {
    function d(d, f) {
      var h = b.call(this) || this;
      h.cl = "outBg";
      h.isOn = d;
      h.whxy(f, null);
      return h;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      this.setWhxy(
        (this.isOn ? b.splitterWidth : 0) +
          b.outsideBack.width -
          b.scroll.width,
        b.outside.height,
        b.content.width + (this.isOn ? 0 : b.splitterWidth),
        b.header.headerHeight,
      );
    };
    return d;
  })(g);
  f.outsideBack = b;
  b = (function (b) {
    function d(d) {
      var f = b.call(this) || this;
      f.cl = "rightCorner";
      f.whxy(d, null);
      return f;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      this.setWhxy(
        b.outsideBack.width + b.splitterWidth,
        b.getHeaderHeight() - f.boldBorderWidth,
        b.content.width,
        0,
      );
    };
    return d;
  })(g);
  f.rightCorner = b;
  b = (function (b) {
    function d(d, f, h, g, l) {
      var k = b.call(this) || this;
      k.i = d;
      k.txt = f;
      k.id = h;
      k.cl = "nameBorder";
      k.whxy(g, null);
      k.hnt = l;
      return k;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      this.setWhxy(
        f.sideWidth - f.boldBorderWidth,
        b.rowHeights[this.i],
        0,
        b.rowTops[this.i] - b.getHeaderHeight(),
      );
    };
    d.prototype.inner = function () {
      return "<div>" + this.txt + "</div>";
    };
    return d;
  })(g);
  f.labelEl = b;
  b = (function (b) {
    function d(d, f) {
      var h = b.call(this) || this;
      h.i = d;
      h.cl = "horLine";
      h.whxy(f, null);
      return h;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      this.setWhxy(
        b.horizontalLineWidth,
        f.borderWidth,
        0,
        b.rowTops[this.i] + b.rowHeights[this.i] - b.getHeaderHeight(),
      );
    };
    return d;
  })(g);
  f.horizontalLine = b;
  b = (function (b) {
    function d(d) {
      var f = b.call(this) || this;
      f.cl = "outside";
      f.whxy(d, null);
      return f;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      this.setWhxy(
        b.outside.width,
        b.outside.height,
        b.content.width + b.splitterWidth,
        0,
      );
    };
    return d;
  })(g);
  f.outside = b;
  b = (function (b) {
    function d(d, h, g, q, l, t) {
      var k = b.call(this) || this;
      k.ve = d;
      k.day = h;
      k.period = g;
      k.markTy = q;
      k.rowPosition = l;
      k.mv = t;
      k.cl =
        "mark " +
        (q === e.markTy.f
          ? "forbidden"
          : q === e.markTy.u
            ? "unwanted"
            : "mandatory");
      k.zI = 1150;
      k.colI = f.getColumnIndex(t, h, g, t.data.periodsCount, t.is1());
      k.whxy(t.size, null);
      return k;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      d = b.columnWidths[this.colI];
      b = b.rowHeights[this.rowPosition - 1];
      var h = new f.position(
          this.mv,
          this.day,
          this.period,
          this.rowPosition,
        ).getCellPoint(),
        k = this.markTy === e.markTy.u ? 2 : 10,
        g = this.markTy === e.markTy.f ? 2 : 10,
        p = d - 2 > k + 2,
        l = b - 2 > g + 2;
      p || (k = Math.max(d - 2 - 2, 0));
      l || (g = Math.max(b - 2 - 2, 0));
      this.w = p ? null : k;
      this.h = l ? null : g;
      this.x = h[0] + (d - k - 2) / 2;
      this.y = h[1] + (b - g - 2) / 2;
    };
    return d;
  })(g);
  f.mMark = b;
  g = (function (b) {
    function d(d, f) {
      var h = b.call(this) || this;
      h.mv = d;
      h.rect = f;
      h.rowIndex = f.rowIndex;
      h.columnIndex = f.columnIndex;
      h.len = f.len;
      h.whxy(d.size, null);
      return h;
    }
    __extends(d, b);
    d.prototype.whxy = function (b, d) {
      d = this.rect;
      this.w = f.getW(b, d.columnIndex, d.len, !1) - 4;
      this.h = f.getHeight(b, d.rowIndex, 1, 0, !1) - 4;
      this.x = f.xByColI(b, d.columnIndex);
      this.y = f.yByRowI(b, d.rowIndex);
    };
    d.prototype.midY = function () {
      return this.y + this.h / 2;
    };
    d.prototype.sty = function () {
      return l(this) + "z-index:" + this.mv.zI.valCell;
    };
    return d;
  })(g);
  f.mSpot = g;
})(r || (r = {}));
(function (f) {
  function l(f, h, k) {
    if (h.isCustom() && !f.input.is1()) return d(h.x, f, h._nColI, h.customPer);
    f = b(f, k, f.input.is1() ? 1 : h._c.parent.length, h.isOut());
    return Math.max(0, f - 2 * h.bw);
  }
  function g(b, d, f) {
    var h = 0,
      k = 0;
    f = d + f - 1;
    for (var g = b.columnWidths.length; d <= f; d++)
      d < g
        ? ((h += b.columnWidths[d] + k),
          (k =
            0 === (d + 1) % b.data.periodsCount
              ? r.boldBorderWidth
              : r.borderWidth))
        : (h += b.averageColumnWidth);
    return h;
  }
  function b(b, d, f, h) {
    return h || -1 === d ? b.averageColumnWidth * f : g(b, d, f);
  }
  function d(b, d, f, h) {
    var k = g(d, f, 1);
    return (
      Math.floor(
        d.columnLefts[f] +
          (k / e.duration(h.endPeriod)) *
            (e.endMin(h.custom) - e.startMin(h.endPeriod)),
      ) - b
    );
  }
  function h(b, d, f, h, g) {
    void 0 === g && (g = !1);
    return g || -1 === d
      ? b.averageRowHeight * (b.mv.is1() ? f : 1) - 2 * h
      : k(b, d, f, h);
  }
  function k(b, d, f, h) {
    var k = 0;
    f = d + (b.mv.is1() ? f : 1) - 1;
    for (var g = b.rowHeights.length, p = d; p <= f; p++)
      k =
        p < g
          ? k + (b.rowHeights[p] + (p === d ? 0 : r.borderWidth))
          : k + b.averageRowHeight;
    return k - 2 * h;
  }
  function p(b, d) {
    return d.isCustom() && b.input.is1()
      ? n(b, d._rowI, d.y, d.customPer, d.bw)
      : h(b, d._rowI, d._c.parent.length, d.bw, d.isOut());
  }
  function n(b, d, f, h, k) {
    var g = h.endPeriod;
    d = Math.floor(
      (b.rowHeights[d] / e.duration(g)) * (e.endMin(h.custom) - e.startMin(g)),
    );
    return Math.floor(C(b, g.position - 1) + d - f - 2 * k);
  }
  function q(b) {
    var d = b.length;
    if (0 === d) return A();
    for (var h = [], k = Math.floor(100 / d), g = 0, p = 0; p < d; p++) {
      var n = new f.color(b[p].color),
        q = n.html(),
        l = [q, g];
      n = [n.bright().html(), Math.floor(g + k / 2)];
      h.push(l, n, [q, Math.min(g + k, 100)]);
      g += k;
    }
    return {
      _1: [0, 0],
      n: [0, 1],
      stops: h,
    };
  }
  function u(b, d, f) {
    d = d && !f ? "" : t(b);
    "" !== d && (d = "background-image:" + d);
    return "background-color:" + b.stops[0][0] + ";" + d + ";";
  }
  function t(b) {
    for (var d = "(top", f = b.stops.length, h = 0; h < f; h++) {
      var k = b.stops[h];
      d += "," + k[0] + " " + k[1] + "%";
    }
    return ui.linearGradient() + d + ")";
  }
  function x(b, d) {
    return y(b, d, d.style.backgroundType);
  }
  function y(b, d, f) {
    return d.isBlackAndWhite()
      ? z()
      : f === e.vMod.t
        ? q(b.parent.teachers)
        : f === e.vMod.c
          ? q(e.classes(b.parent))
          : f === e.vMod.s
            ? q([b.parent.subject])
            : f === e.vMod.r
              ? ((b = b.rooms), 0 === b.length ? A() : q(b))
              : z();
  }
  function z() {
    return q([
      {
        color: "#FFFFFF",
      },
    ]);
  }
  function A() {
    return q([
      {
        color: "#C0C0C0",
      },
    ]);
  }
  function B(b, d) {
    return r.getEntities(b).findIndex(function (b) {
      return b.id === d;
    });
  }
  function C(b, d) {
    return b.rowTops[d] - b.getHeaderHeight();
  }
  function G(b, d, f) {
    if (!d || b.input.is1()) return 0;
    var h = d.startPeriod;
    return Math.floor(
      (g(b, f, 1) / e.duration(h)) * (e.startMin(d.custom) - e.startMin(h)),
    );
  }
  function P(b, d, f) {
    return void 0 !== d && b.input.is1()
      ? Math.floor(
          (b.rowHeights[f] / e.duration(d.startPeriod)) *
            (e.startMin(d.custom) - e.startMin(d.startPeriod)),
        )
      : 0;
  }
  var H = (function () {
    function b(b) {
      this.outAdded = !1;
      this.ty = b;
    }
    b.prototype.go = function () {
      return this.ty === f.updTy.go;
    };
    b.prototype.isPin = function () {
      return this.ty === f.updTy.p || this.ty === f.updTy.up;
    };
    b.prototype.isVz = function () {
      return this.ty === f.updTy.vZ;
    };
    b.prototype.isR = function () {
      return this.ty === f.updTy.r;
    };
    b.prototype.isX = function () {
      return this.ty === f.updTy.x;
    };
    return b;
  })();
  f.upd = H;
  f.updTy = {
    go: 1,
    r: 2,
    vZ: 3,
    s: 4,
    drg: 5,
    p: 6,
    up: 7,
    x: 8,
    o: 9,
    zI: 10,
    ve: 11,
    c: 12,
    uc: 13,
  };
  f.borderClasses = ["pin", "square", "noBorder", "ignored"];
  var I = (function (b) {
    function d() {
      var d = (null !== b && b.apply(this, arguments)) || this;
      d.isDesigner = !1;
      d.isCustomText = !1;
      return d;
    }
    __extends(d, b);
    d.prototype.sty = function () {
      return (
        (this.fontSize ? "font-size:" + this.fontSize + "px;" : "") +
        (this.isCustomText
          ? ""
          : (void 0 === this.y ? "" : this.is1 ? "" : "top:" + this.y + "px;") +
            "height:" +
            this.h +
            "px;" +
            (!this.is1 || this.isDesigner
              ? "line-height:" + this.lineHeight + "px"
              : ""))
      );
    };
    d.prototype.inner = function () {
      return this.is1 ? '<div class="txt">' + this.text + "</div>" : this.text;
    };
    return d;
  })(f.mEl);
  f.mcTxt = I;
  f.getMcW = l;
  f.getTW = g;
  f.getW = b;
  f.getCustomW = d;
  f.getHeight = h;
  f.getTH = k;
  f.getMcH = p;
  f.getCustomH = n;
  f.mcGrad = q;
  f.mcGradStr = u;
  f.bgImgGrad = t;
  f.gradCard = x;
  f.gradSty = y;
  f.whGrad = z;
  f.grGrad = A;
  f.getRowIndexPrint = B;
  f.dragCustomPer = function (b, d, f, h, k) {
    if (f && h && 0 !== b.data.customPeriods.length) {
      var g = e.getAllIds(d);
      d = b.data.customPeriods
        .filter(function (b) {
          return (
            !b.showCustom &&
            b.dayId === f.id &&
            b.position === h.position &&
            arr.has(g, b.entityId)
          );
        })
        .sort(function (b, d) {
          return (
            arr.sort(b.startHour, d.startHour) ||
            arr.sort(b.startMinute, d.startMinute) ||
            arr.sort(b.endHour, d.endHour) ||
            arr.sort(b.endMinute, d.endMinute)
          );
        });
      if (
        0 !== d.length &&
        ((k = Math.floor(k.offset / (k.size / 2 / (d.length + 1)))), !(1 > k))
      )
        return (k--, r.getCustomPeriod(b, h, d[Math.min(d.length - 1, k)]));
    }
  };
  f.xByColI = function (b, d) {
    return b.columnLefts[d];
  };
  f.yByRowI = C;
  f.x1 = G;
  f.y1 = P;
  H = (function (b) {
    function d(d, f, h, k) {
      var g = b.call(this) || this;
      g.isSelA = !1;
      g.isDsg = !1;
      g.txtProp = {
        fontSize: null,
        height: 0,
        tops: [],
        bws: [],
        txts: [],
        modY: 0,
        upd: !1,
      };
      g.cTxtProp = {
        fontSize: null,
        color: "#000000",
        up: "",
        down: "",
      };
      g.customPer = void 0;
      g._cls = [];
      g.bw = 0;
      g.all = [];
      g.clps = [];
      g.mv = d;
      g._c = f;
      g.ve = h;
      g.idE = k ? k : h;
      g.zI = d.zI.card;
      g.ty = 1;
      return g;
    }
    __extends(d, b);
    d.prototype.go = function () {
      this.upd(this.mv.size, new r.upd(f.updTy.go));
    };
    d.prototype.upd = function (b, d) {
      this.setBorder(d);
      this.setCustomPeriod(d);
      this.setRowIndex(b, d);
      this.setColumnIndex(b, d);
      this.whxy(b, null);
      this.setGradient(d);
      this.setTexts(this.mv.style, d);
      this.setOpacity(d);
      this.setClip(d);
    };
    d.prototype.whxy = function (b, d) {
      this.setX(b);
      this.setY(b);
      this.setW(b);
      this.setH(b);
    };
    d.prototype.setBorder = function (b) {
      this.setBorderStyle(
        b,
        this.mv.style,
        this._c.pinned && !this.mv.isPrintOrPublish(),
      );
    };
    d.prototype.setBorderStyle = function (b, d, f) {
      this.br = 0;
      b.go() || arr.removes(this._cls, r.borderClasses);
      e.isExcludedFromGenerator(this._c.parent.subject) &&
        !this.mv.isPrintOrPublish() &&
        this._cls.push("ignored");
      f && this._cls.push(r.borderClasses[0]);
      e.isRoundStyle(d) ? (this.br = 4) : this._cls.push(r.borderClasses[1]);
      e.hasBorderStyle(d)
        ? (this.bw = 1)
        : ((this.bw = 0), this._cls.push(r.borderClasses[2]));
    };
    d.prototype.setCustomPeriod = function (b) {
      var d = this._c;
      b.go() || arr.removes(this._cls, ["c", "custom"]);
      this._cls.push("c");
      if (d.period && e.isCustomPeriod(d.period) && d.day && !this.isOut()) {
        b = void 0;
        var f = this.mv.data.periods,
          h = f.length;
        d = d.period.position;
        for (var k = 0; k < h; k++) {
          var g = f[k];
          if (g.position === d) {
            b = g;
            break;
          }
        }
        b
          ? ((this.customPer = r.getCustomPeriod(this.mv, b, this._c.period)),
            this._cls.push("custom"))
          : (this.customPer = void 0);
      } else this.customPer = void 0;
    };
    d.prototype.setColumnIndex = function (b, d) {
      if (!d.isVz()) {
        var f = 0,
          h = this.mv;
        this.isOut()
          ? h.outPanel.update(this, d)
          : ((d = r.getDayPosition(h, this._c.day) - 1),
            (f = b.input.is1()
              ? d
              : d * b.data.periodsCount +
                r.getPeriodPosition(h, this._c.period) -
                1),
            this.colI(f));
        if (this.isCustom()) {
          d = this.customPer;
          f = this._c.day;
          var k = h.data.periodsCount,
            g = (this._1ColI = r.getColumnIndex(
              h,
              f,
              d.startPeriod,
              k,
              h.is1(),
            ));
          this._nColI = r.getColumnIndex(h, f, d.endPeriod, k, h.is1());
          this.x1 = G(b, d, g);
        } else ((this._1ColI = this._nColI = f), (this.x1 = 0));
      }
    };
    d.prototype.setRowIndex = function (b, d) {
      if (d.ty !== f.updTy.r && !d.outAdded) {
        var h = this.ve;
        this.rowI(
          b.input.is1()
            ? this.getRowI1V(this._c)
            : this.mv.isPrint()
              ? B(this.mv, h.id)
              : h
                ? r.getRowPosition(this.mv, h) - 1
                : 0,
        );
        h = this.customPer;
        this.y1 = P(b, h, this._rowI);
        d.ty !== f.updTy.vZ &&
          (h && b.input.is1()
            ? ((this._1RowI = h.startPeriod.position - 1),
              (this._nRowI = h.endPeriod.position - 1))
            : (this._1RowI = this._nRowI = this._rowI));
      }
    };
    d.prototype.setX = function (b) {
      this.x = this.getX(b);
    };
    d.prototype.getX = function (b) {
      return this.isIn()
        ? b.columnLefts[this._1ColI] + this.x1
        : b.averageColumnWidth * this._colI + b.content.width + b.splitterWidth;
    };
    d.prototype.setY = function (b) {
      this.y = this.getY(b);
    };
    d.prototype.getY = function (b) {
      return b.input.is1() && this.isOut()
        ? this._1RowI *
            (b.averageRowHeight + (b.hasOutLines() ? r.borderWidth : 0))
        : C(b, this._1RowI) + this.y1;
    };
    d.prototype.setW = function (b) {
      this.w = this.getW(b);
    };
    d.prototype.getW = function (b) {
      return l(b, this, this._colI);
    };
    d.prototype.widthDivider = function () {
      return 1;
    };
    d.prototype.setH = function (b) {
      this.h = this.getH(b);
    };
    d.prototype.getH = function (b) {
      return p(b, this);
    };
    d.prototype.getRowI1V = function (b) {
      return this.isIn() ? r.getPeriodPosition(this.mv, b.period) - 1 : 0;
    };
    d.prototype.getVLen = function () {
      return this.mv.is1() ? 1 : this._c.parent.length;
    };
    d.prototype.rotAll = function (b) {
      for (var d = this.all, f = d.length, h = 0; h < f; h++) d[h].rot(b);
    };
    d.prototype.rot = function (b) {
      this.ordAng = b;
      this.zI = this.mv.zI.rotCard + b.ordI();
    };
    d.prototype.ang = function () {
      return this.ordAng ? this.ordAng.ang : -360;
    };
    d.prototype.relH = function () {
      for (var b = 0, d = this.all, f = d.length, h = 0; h < f; h++)
        b += d[h].h;
      return b;
    };
    d.prototype.mcZi = function (b) {
      for (var d = this.all, f = d.length, h = 0; h < f; h++) d[h].zI = b;
    };
    d.prototype.setGradient = function (b) {
      this._grad = x(this._c, this.mv);
    };
    d.prototype.setOpacity = function (b) {
      b.go() || arr.remove(this._cls, "marker");
      this.mv.isMarkerPicked && this._cls.push("marker");
    };
    d.prototype.setClip = function (b) {
      b.go() || arr.remove(this._cls, "clip");
      this.hasClp() && arr.addUnique(this._cls, "clip");
    };
    d.prototype.html = function () {
      this.setCl();
      return b.prototype.html.call(this);
    };
    d.prototype.getSty = function () {
      var d = (this.ordAng && this.ordAng.ang) || 0;
      d = 0 === d ? "" : ui.transform() + ":" + ui.getRotate(d);
      return (
        b.prototype.sty.call(this) +
        "z-index:" +
        this.zI +
        ";" +
        u(this._grad, this._c.pinned, this.mv.isPublish()) +
        d
      );
    };
    d.prototype.sty = function () {
      return (this._sty = this.getSty());
    };
    d.prototype.inner = function () {
      for (var b = this.allTxts, d = b.length, f = "", h = 0; h < d; h++)
        f += b[h].html();
      return f;
    };
    d.prototype.isIn = function () {
      return e.isIn(this._c);
    };
    d.prototype.isOut = function () {
      return !this.isIn();
    };
    d.prototype.colI = function (b) {
      this.prevColI = this._colI;
      this._colI = b;
    };
    d.prototype.rowI = function (b) {
      this.prevRowI = this._rowI;
      this._rowI = b;
    };
    d.prototype.isPosChg = function () {
      return this._colI !== this.prevColI || this._rowI !== this.prevRowI;
    };
    d.prototype.isCustom = function () {
      return void 0 !== this.customPer;
    };
    d.prototype.setTexts = function (b, d) {
      var f = this._c,
        h = b.individual ? f.text : f.shortText,
        k = !!h,
        g = this.txtProp,
        p = k ? 1 : e.getTextCount(b, f),
        n = -1,
        q = -1,
        l;
      g.height = Math.floor(this.h / p);
      g.fontSize = 10.5 > g.height ? g.height : null;
      g.modY = (this.h % p) / 2;
      g.txts = [];
      g.tops = [];
      g.bws = [];
      this.txtIds = [];
      var t = f.parent,
        u = b.entityTypes,
        x = d.go(),
        y = k ? 1 : u.length;
      for (l = 0; l < y; l++) {
        var z = u[l];
        var A = -1;
        ++q;
        if (z === e.cardTextType._class || z === e.cardTextType.group) {
          var B = k ? 1 : t.groups.length;
          for (z = 0; z < B; z++) {
            var D = t.groups[z];
            D = {
              name: h || e.groupName(D),
              shortName: h || e.groupShort(D),
            };
            n = this.setText(b, D, n, p, q, ++A, d);
          }
        } else if (z === e.cardTextType.teacher)
          for (B = k ? 1 : t.teachers.length, z = 0; z < B; z++)
            ((D = t.teachers[z]),
              (D = {
                name: h || D.name,
                shortName: h || D.shortName,
              }),
              (n = this.setText(b, D, n, p, q, ++A, d)));
        else if (z === e.cardTextType.room)
          for (B = k ? 1 : f.rooms.length, z = 0; z < B; z++)
            ((D = f.rooms[z]),
              (D = {
                name: h || D.name,
                shortName: h || D.shortName,
              }),
              (n = this.setText(b, D, n, p, q, ++A, d)));
        else
          z === e.cardTextType.subject &&
            ((z = t.subject),
            (D = {
              name: h || z.name,
              shortName: h || z.shortName,
            }),
            (n = this.setText(b, D, n, p, q, ++A, d)));
      }
      x || this.txts.length === p || (g.upd = !0);
      if ((b = x || g.upd)) this.txts = [];
      for (l = 0; l < p; l++)
        ((f = b ? this.getTxt() : this.txts[l]),
          (f.fontSize = g.fontSize),
          (f.h = f.lineHeight = g.height),
          (f.cl = "t " + g.bws[l]),
          (f.text = g.txts[l]),
          (f.y = g.tops[l]),
          b && this.txts.push(f));
      this.setCTxt(d);
      this.allTxts = this.txts.concat(this.cTxts);
    };
    d.prototype.setText = function (b, d, h, k, g, p, n) {
      h++;
      var q = this.txtProp,
        l = b.entityTypes[g];
      b = b.lengthTypes[g];
      d = d ? (b === e.lengthType.name ? d.name : d.shortName) : "";
      g = this._grad.stops;
      var t = g.length;
      p = Math.min(3 * p, t - 1);
      n = n.go();
      p = (0 === t ? new f.tmCol() : new f.color(g[p][0], !0)).bwCl();
      k = 1 < k ? q.height * h + q.modY : null;
      n
        ? (q.txts.push(d),
          q.bws.push(p),
          q.tops.push(k),
          this.txtIds.push(l + "," + b))
        : ((q.txts[h] = d), (q.bws[h] = p), (q.tops[h] = k));
      return h;
    };
    d.prototype.setCTxt = function (b) {
      var d = this.mv.input;
      b.go() && (this.cTxts = []);
      var f = e.isOut(this._c),
        h = !!this.customPer;
      if (
        d.showPeriodInterval() &&
        (!f || d.intervalInCards) &&
        (h || d.intervalInCards)
      ) {
        var k = this.cTxtProp;
        if ((f = h ? this.customPer.custom : f ? void 0 : this._c.period)) {
          b = b.go() || 0 === this.cTxts.length;
          var g = f.name;
          g && str.startsWith(g, "!")
            ? ((g = str.trim1(g, "!")),
              (d = g.split("-")),
              (k.up = d[0] || ""),
              (k.down = 1 < d.length ? d[1] : ""))
            : ((k.up = d.is24hTime() ? e.short1(f) : e.shortest1(f)),
              (g = f),
              h ||
                ((h = this._c.parent),
                1 < h.length &&
                  ((h = f.position + h.length - 1),
                  (f = this.mv.data.defaultPeriods),
                  (g = f.length >= h ? f[h - 1] : f[f.length - 1]))),
              (k.down = d.is24hTime() ? e.shortN(g) : e.shortestN(g)));
          d = this.txtProp.fontSize;
          k.fontSize =
            void 0 === d || null === d
              ? null
              : Math.floor(d / (this.mv.is1() ? 1.1 : 1.8));
          d = b ? this.getCTxt(!0) : this.cTxts[0];
          h = b ? this.getCTxt(!1) : this.cTxts[1];
          d.fontSize = h.fontSize = k.fontSize;
          d.text = k.up;
          h.text = k.down;
          b && this.cTxts.push(d, h);
        } else this.cTxts = [];
      }
    };
    d.prototype.getCTxt = function (b) {
      var d = new I();
      d.isCustomText = !0;
      d.cl = b ? "up" : "down";
      0 < this.txts.length && (d.cl += " " + this.txtProp.bws[0]);
      return d;
    };
    d.prototype.getTxt = function () {
      var b = new I();
      b.isDesigner = this.isDsg;
      b.is1 = this.mv.is1();
      b.cl = "t";
      return b;
    };
    d.prototype.setCl = function () {
      this.cl = this.getCl();
    };
    d.prototype.getCl = function () {
      return this._cls.join(" ");
    };
    d.prototype.hasClp = function () {
      return !!this.clp;
    };
    d.prototype.clpPin = function () {
      return (
        !!this.clp &&
        this.clp.cards.some(function (b) {
          return b.pinned;
        })
      );
    };
    return d;
  })(f.mEl);
  f.mc = H;
  var J = (function (b) {
    function d(d, f, h, k) {
      f = b.call(this, d, f, h.parent.parent, h) || this;
      f.is1 = !1;
      f.is1 = d.is1();
      f.fGs = k;
      var g = h.parent;
      d = e.sortNotDel(g.groups);
      f._grN = f.groupCount(g, d);
      f.gDivI = d.indexOf(h);
      f.fgDivI = f.gDivI;
      if (1 < k.length) {
        g = -1;
        for (var p = 0, n = d.length; p < n; p++) {
          g++;
          var q = d[p];
          if (q === h) break;
          arr.has(k, q) || --g;
        }
        f.fgDivI = g;
      }
      return f;
    }
    __extends(d, b);
    d.prototype.getX = function (d) {
      return b.prototype.getX.call(this, d) + this.getGx(d);
    };
    d.prototype.getGx = function (b) {
      return this.is1
        ? this.fgDivI * this.getW(b) + 2 * this.fgDivI * this.bw
        : 0;
    };
    d.prototype.getY = function (d) {
      return (
        b.prototype.getY.call(this, d) +
        (this.is1 ? 0 : this.gDivI * this.getH(d) + 2 * this.gDivI * this.bw)
      );
    };
    d.prototype.getW = function (d) {
      d = b.prototype.getW.call(this, d);
      var f = this.widthDivider();
      return 1 === f ? d : d / f - this.bw;
    };
    d.prototype.widthDivider = function () {
      return e.isEntire(this.grp()) || !this.is1 ? 1 : this._grN;
    };
    d.prototype.getH = function (d) {
      d = b.prototype.getH.call(this, d);
      return e.isEntire(this.grp()) || this.is1
        ? d
        : d / obj.notDel(this.grp().parent.groups).length - this.bw;
    };
    d.prototype.groupCount = function (b, d) {
      return 2 > this.fGs.length
        ? d.length
        : this.fGs.filter(function (d) {
            return d.parent === b;
          }).length;
    };
    d.prototype.cls = function () {
      return this.ve;
    };
    d.prototype.grp = function () {
      return this.idE;
    };
    return d;
  })(H);
  f.clMc = J;
  J = (function (b) {
    function d(d, f, h) {
      d = b.call(this, d, f, h) || this;
      d.t = h;
      return d;
    }
    __extends(d, b);
    return d;
  })(H);
  f.tchMc = J;
  J = (function (b) {
    function d(d, f, h) {
      d = b.call(this, d, f, h) || this;
      d.s = h;
      return d;
    }
    __extends(d, b);
    return d;
  })(H);
  f.sbjMc = J;
  H = (function (b) {
    function d(d, f, h, k, g) {
      d = b.call(this, d, h, k) || this;
      d.room = k;
      d.rowPos = g;
      return d;
    }
    __extends(d, b);
    d.prototype.upd = function (d, f) {
      0 < this.rowPos &&
        (this.room = this.ve = this.mv.data.entities[this.rowPos - 1]);
      b.prototype.upd.call(this, d, f);
    };
    return d;
  })(H);
  f.roomMc = H;
})(r || (r = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      this.columnIndexes = [];
      this.mv = b;
    }
    g.prototype.update = function (b, d) {
      if (d.ty !== f.updTy.r) {
        var h = this.mv.is1(),
          k = d.go(),
          g;
        d = this.getRow(h ? 0 : b._rowI);
        k || (g = this.indexOf(d, b));
        if (k || -1 === g)
          ((g = this.getMaxIndex(d) + 1),
            h ? this.updateColumnRowIndexInIndividual(b, g) : b.colI(g),
            this.addMc(b, d, g));
      }
    };
    g.prototype.updateColumnRowIndexInIndividual = function (b, d) {
      d = this.getColumnRowIndex(d);
      b.colI(d[0]);
      b.rowI((b._1RowI = b._nRowI = d[1]));
      b.x1 = b.y1 = 0;
    };
    g.prototype.getColumnRowIndex = function (b) {
      var d = this.mv.output.cardsCount,
        f = this.mv.data;
      d =
        f.daysCount * f.periodsCount > d
          ? f.daysCount
          : Math.ceil(d / f.periodsCount);
      return [b % d, Math.floor(b / d)];
    };
    g.prototype.addMc = function (b, d, f) {
      for (var h = b.getVLen(), g = 0; g < h; g++) d.push([f + g, b]);
    };
    g.prototype.getMaxIndex = function (b) {
      for (var d = -1, f = 0; f < b.length; f++) {
        var k = b[f][0];
        k > d && (d = k);
      }
      return d;
    };
    g.prototype.xMc = function (b) {
      var d = this.mv.is1(),
        f = [];
      b = arr.groupByMany(b.all, [new arr.groupKey("_rowI")]);
      for (var k = b.length, g = 0; g < k; g++) {
        var n = b[g],
          q = n.items,
          l = q.length;
        n = this.getRow(d ? 0 : n.key);
        for (var t = 100, x = 0; x < l; x++) {
          var y = q[x],
            z = this.indexOf(n, y);
          -1 !== z && (z < t && (t = z), n.splice(z, y.getVLen()));
        }
        q = n.length;
        for (x = t; x < q; x++)
          ((l = n[x]),
            (t = l[1]),
            (l[0] = x),
            d
              ? (this.updateColumnRowIndexInIndividual(t, x), f.push(t))
              : arr.last(f) !== t && (t.colI(x), f.push(t)));
      }
      return f;
    };
    g.prototype.getRow = function (b) {
      var d = this.columnIndexes.find(function (d) {
        return d[0] === b;
      });
      d || ((d = [b, []]), this.columnIndexes.push(d));
      return d[1];
    };
    g.prototype.getOutAdornerColumnIndex = function (b) {
      return this.getMaxIndex(this.getRow(this.mv.is1() ? 0 : b._rowI)) + 1;
    };
    g.prototype.getOutAdornerIndividualColumnIndex = function (b) {
      return this.getColumnRowIndex(this.getOutAdornerColumnIndex(b));
    };
    g.prototype.indexOf = function (b, d) {
      return b.findIndex(function (b) {
        return b[1] === d;
      });
    };
    return g;
  })();
  f.outPanel = l;
})(r || (r = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      this.cards = [];
      this.mv = b;
      this.input = b.input;
    }
    g.prototype.init = function () {
      this.cards = f.getViewCards(this.mv);
      this.mv.outPanel.columnIndexes = [];
    };
    g.prototype.render = function (b) {
      var d = this.input.viewType;
      return d.isClass()
        ? this.getClassCards(b)
        : d.isTeacher()
          ? this.getTeacherCards(b)
          : d.isRoom()
            ? this.getRoomCards(b)
            : this.getSubjectCards(b);
    };
    g.prototype.getClassCards = function (b) {
      var d = this.mv.is1(),
        h = this.input.viewType,
        k = this.mv.isPrint(),
        g = d ? h.ve : void 0,
        n = [],
        q = h.getFilter(),
        l = f.getFilteredGroups(q),
        t = 1 < l.length,
        x = [];
      g && ((h = t ? l : e.getGroups(g)), (n = e.ids(h)));
      var y = this.getCustomIds();
      h = function (h) {
        var p = h.parent;
        if (d && t && !arr.hasOneEqual(p.groupIds, n)) return "continue";
        var u = [],
          A = -1,
          B = 0;
        for (
          p = g
            ? p.groups.filter(function (b) {
                return (
                  e.getClass(b).id === g.id &&
                  (q && q.student && !e.isEntire(b)
                    ? arr.has(q.student.groupIds, b.id)
                    : !0) &&
                  (q && 0 < q.groups.length && !e.isEntire(b)
                    ? arr.has(q.groups, b)
                    : !0)
                );
              })
            : 0 === y.length
              ? p.groups
              : p.groups.filter(function (b) {
                  return arr.has(y, e.getClass(b).id);
                });
          B < p.length;
          B++
        ) {
          var C = p[B],
            Q = e.getClass(C);
          if ((0 === ++A || k) && z.skipPass(Q, b, d))
            if (k) continue;
            else break;
          C = new f.clMc(z.mv, h, C, l);
          u.push(C);
          x.push(C);
        }
        u.forEach(function (b) {
          return (b.all = u);
        });
      };
      for (var z = this, A = 0, B = this.cards; A < B.length; A++) h(B[A]);
      return this.getOutput(x, b);
    };
    g.prototype.getTeacherCards = function (b) {
      for (
        var d = this.mv.isPrint(),
          h = this.mv.is1(),
          k = h ? this.input.viewType.ve : null,
          g = [],
          n = this.getCustomIds(),
          q = function (p) {
            if (k && !arr.has(p.parent.teacherIds, k.id)) return "continue";
            var q = [],
              t = p.parent.teachers,
              u = -1,
              x = 0;
            for (
              t = k
                ? [k]
                : 0 === n.length
                  ? t
                  : t.filter(function (b) {
                      return arr.has(n, b.id);
                    });
              x < t.length;
              x++
            ) {
              var y = t[x];
              if ((0 === ++u || d) && l.skipPass(y, b, h))
                if (d) continue;
                else break;
              y = new f.tchMc(l.mv, p, y);
              q.push(y);
              g.push(y);
            }
            q.forEach(function (b) {
              return (b.all = q);
            });
          },
          l = this,
          t = 0,
          x = this.cards;
        t < x.length;
        t++
      )
        q(x[t]);
      return this.getOutput(g, b);
    };
    g.prototype.getRoomCards = function (b) {
      for (
        var d = this.mv,
          h = d.is1(),
          k = d.isPrint(),
          g = h ? this.input.viewType.ve : void 0,
          n = [],
          q = this.getCustomIds(),
          l = function (p) {
            var l = p.rooms.slice();
            if (h && !arr.has(l, g)) return "continue";
            var u = [],
              x = -1,
              y = 0;
            for (
              l = g
                ? [g]
                : 0 === q.length
                  ? l
                  : l.filter(function (b) {
                      return arr.has(q, b.id);
                    });
              y < l.length;
              y++
            ) {
              var z = l[y];
              if ((0 === ++x || k) && t.skipPass(z, b, h))
                if (k) continue;
                else break;
              z = new f.roomMc(d, t.input, p, z, f.getRowPosition(t.mv, z));
              u.push(z);
              n.push(z);
            }
            u.forEach(function (b) {
              return (b.all = u);
            });
          },
          t = this,
          x = 0,
          y = this.cards;
        x < y.length;
        x++
      )
        l(y[x]);
      return this.getOutput(n, b);
    };
    g.prototype.getSubjectCards = function (b) {
      for (
        var d = this.mv.is1(),
          h = d ? this.input.viewType.ve : void 0,
          k = [],
          g = 0,
          n = this.cards;
        g < n.length;
        g++
      ) {
        var q = n[g],
          l = q.parent.subject;
        (h && l.id !== h.id) ||
          this.skipPass(l, b, d) ||
          ((q = new f.sbjMc(this.mv, q, l)), (q.all = [q]), k.push(q));
      }
      return this.getOutput(k, b);
    };
    g.prototype.getOutput = function (b, d) {
      var h,
        k,
        g,
        n = this.mv.output,
        q = [],
        l = [];
      n.cardsCount = b.length;
      b.forEach(function (b) {
        return (b.isIn() ? q : l).push(b);
      });
      l.sort(function (b, d) {
        return (
          arr.sort(
            b._c.parent.subject.position,
            d._c.parent.subject.position,
          ) || arr.sort(-b._c.parent.length, -d._c.parent.length)
        );
      });
      n.outCards = l;
      q.forEach(function (b) {
        return b.go();
      });
      l.forEach(function (b) {
        return b.go();
      });
      this.mv.input.rotate &&
        (q.sort(function (b, d) {
          return (
            arr.sort(b._rowI, d._rowI) ||
            arr.sort(b._colI, d._colI) ||
            arr.sort(!b._c.pinned, !d._c.pinned) ||
            arr.sort(-b.getVLen(), -d.getVLen()) ||
            arr.sort(-b.h, -d.h)
          );
        }),
        (b = q.concat(l)));
      (h = n.inCards).push.apply(h, q);
      (k = n.all).push.apply(k, b);
      (g = n.cards).push.apply(g, b);
      return f.getPassOutput(b, d);
    };
    g.prototype.skipPass = function (b, d, h) {
      if (!b) return (this.mv.vA.log.w("T corrupted", e.logType.err), !0);
      if (h) return !1;
      b = this.mv.isPrint()
        ? f.getRowIndexPrint(this.mv, b.id) + 1
        : f.getRowPosition(this.mv, b);
      return b < d.startRow || b > d.endRow;
    };
    g.prototype.getCustomIds = function () {
      var b = this.mv.viewType().view;
      return b && !b.isDefault ? b.entityIds : [];
    };
    return g;
  })();
  f.cardRender = l;
})(r || (r = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      this.view = b;
      this.input = b.input;
      this.output = b.output;
      this.size = b.size;
      this.data = b.data;
      this.cardRender = new f.cardRender(b);
    }
    g.prototype.pass = function (b) {
      b = this.cardRender.render(b);
      this.passDone(b);
    };
    g.prototype.go = function () {
      this.setMeshHeaderAndSideHtml(this.output, this.size);
      this.setStaticBodyHtml(this.output, this.size);
      f.setAllBeforeAddingCards(this.output);
    };
    g.prototype.setMeshHeaderAndSideHtml = function (b, d) {
      f.resetMeshHeaderAndSide(b);
      var h = b.meshElements;
      b.sideBack = new f.sideBack(d);
      b.leftCorner = f.mEl.go(
        "leftCorner",
        f.sideWidth - f.boldBorderWidth,
        d.getHeaderHeight() - f.boldBorderWidth,
        0,
        0,
      );
      b.headerBoldLine = new f.headerBoldLine(d);
      b.sideBoldLine = new f.verticalLine(
        0,
        0,
        f.boldBorderWidth,
        "bold",
        d,
        f.sideWidth,
        !0,
      );
      h.push(b.leftCorner, b.sideBack, b.headerBoldLine, b.sideBoldLine);
      this.sideBackIndex = 1;
      this.headerBoldLineIndex = 2;
      this.sideBoldLineIndex = 3;
      this.meshHtml = f.html(h);
      this.setHeaderHtml(b, d);
      this.setSideHtml(b, d);
    };
    g.prototype.setHeaderHtml = function (b, d) {
      var h = b.headerElements;
      this.verticalsIndex = 0;
      b.verticals = this.getVerticalLines();
      h.push.apply(h, b.verticals);
      this.dayIndex = h.length;
      b.dayPanels = this.getDays(d, this.dayIndex);
      h.push.apply(h, b.dayPanels);
      this.periodIndex = h.length;
      b.periodPanels = this.getPeriods(d, this.periodIndex);
      h.push.apply(h, b.periodPanels);
      this.rightCornerIndex = h.length;
      b.rightCorner = new f.rightCorner(d);
      h.push(b.rightCorner);
      this.headerSplitterIndex = h.length;
      b.headerSplitter = new f.headerSplitter(
        "splitter",
        !this.view.isMain(),
        d,
      );
      h.push(b.headerSplitter);
      this.outsideBackIndex = h.length;
      b.outsideBack = new f.outsideBack(!this.view.isMain(), d);
      h.push(b.outsideBack);
      this.headerHtml = f.html(h);
    };
    g.prototype.setSideHtml = function (b, d) {
      this.horizontalsIndex = 0;
      b.horizontalLines = this.getHorizontalLines();
      this.labelIndex = b.horizontalLines.length;
      b.labelPanels = this.getLabels();
      this.sideHtml = f.html(b.horizontalLines.concat(b.labelPanels));
    };
    g.prototype.setStaticBodyHtml = function (b, d) {
      f.resetBody(b);
      this.splitterIndex = 0;
      b.splitter = new f.splitter("splitter horSplitter", d);
      this.outsideIndex = 1;
      b.outside = new f.outside(d);
      this.cardIndex = 2;
      this.splitterOutsideHtml = f.html([b.splitter, b.outside]);
    };
    g.prototype.getVerticalLines = function () {
      var b = [],
        d = this.data.daysCount;
      if (0 === d) return b;
      for (
        var h = this.size,
          k = h.getfirstHalfHeaderHeight(),
          g = f.getColumnsPerDayCount(this.data.periodsCount, this.view.is1()),
          n = -1,
          q = 1;
        q <= d;
        q++
      )
        for (var l = "bold", t = f.boldBorderWidth, x = 0, y = 1; y <= g; y++)
          (++n,
            (1 === q && 1 === y) || b.push(new f.verticalLine(n, x, t, l, h)),
            (x = k),
            (l = "thin"),
            (t = f.borderWidth));
      return b;
    };
    g.prototype.getDays = function (b, d) {
      var h = b.data.daysCount,
        k = [],
        g = this.input.is1(),
        n = b.data.periodsCount,
        q = f.getColumnsPerDayCount(n, g),
        l = b.data.days,
        t = l.length;
      g = g ? 1 : n;
      n = this.view.isMain();
      for (var x = 0, y = 0; y < h; y++) {
        var z = l[y];
        k.push(
          new f.dayElement(z, x, 0 === t ? "" : z.name, n, q, b, d + y + ""),
        );
        x += g;
      }
      return k;
    };
    g.prototype.getPeriods = function (b, d) {
      var h = [],
        k = this.input.is1(),
        g = this.data.periodsCount;
      if (k || 0 === g) return h;
      k = this.data.daysCount;
      g = this.data.periods;
      for (var n = -1, q = g.length, l = 0; l < k; l++)
        for (var t = 0; t < q; t++)
          h.push(new f.periodEl(g[t], ++n, b, d + n + ""));
      return h;
    };
    g.prototype.getHorizontalLines = function () {
      for (
        var b = [],
          d = this.size.rowTops.length - (this.view.isPrintOrPublish() ? 1 : 0),
          h = 0;
        h < d;
        h++
      )
        b.push(new f.horizontalLine(h, this.size));
      return b;
    };
    g.prototype.getLabels = function () {
      var b = [],
        d = this.data,
        h = d.rowsCount,
        k = d.periods;
      d = d.customPeriods;
      if (0 === h) return b;
      for (
        var g = this.labelIndex,
          n = this.view.input.is1(),
          l = this.view.isPublish(),
          u = this.view.viewType(),
          t = 0;
        t < h;
        t++
      ) {
        var x = n
          ? e.periodDisplay(
              this.size.getPeriodForIndividualView(k, d, t, u.ve.id),
              this.view.input.periodFormat,
            )
          : f.getEntities(this.view)[t].name;
        b.push(
          new f.labelEl(
            t,
            x,
            g + t + "",
            this.size,
            l ? "" : n ? "Show master view" : "Show " + x + " view",
          ),
        );
      }
      return b;
    };
    g.prototype.drawAllMMarks = function () {
      this.drawMMarks(this.getAllMMarks());
    };
    g.prototype.drawMMarks = function (b) {
      for (var d = 0; d < b.length; d++) this.drawMMark(b[d]);
    };
    g.prototype.drawMMark = function (b) {
      this.output.marks.push(b);
    };
    g.prototype.xMMark = function (b) {
      arr.remove(this.output.marks, b);
    };
    g.prototype.getAllMMarks = function () {
      var b = [],
        d = this.view.is1(),
        h = this.view.viewType().ve;
      d = d ? [h] : f.getEntities(this.view);
      h = f.getExcludedDayPositions(this.view);
      for (
        var k = f.getExcludedPeriodPositions(this.view), g = 0;
        g < d.length;
        g++
      ) {
        var n = this.getMMarks(d[g], h, k);
        b.push.apply(b, n);
      }
      return b;
    };
    g.prototype.getMMarks = function (b, d, h) {
      if (void 0 === b.marks || 0 === b.marks.length) return [];
      var k = this.input.is1(),
        g = f.getEntities(this.view),
        n = e.byId(g, b.id);
      if (!n) return [];
      g = [];
      n = k ? 0 : f.getRowPosition(this.view, n);
      for (
        var l = 0,
          u = b.marks.filter(function (b) {
            return !arr.has(d, b[0]) && !arr.has(h, b[1]);
          });
        l < u.length;
        l++
      ) {
        var t = u[l];
        g.push(
          new f.mMark(
            b,
            f.getDayByPosition(this.view, t[0]),
            f.getPeriodByPosition(this.view, t[1]),
            t[2],
            k ? t[1] : n,
            this.view,
          ),
        );
      }
      return g;
    };
    g.prototype.resetSpots = function () {
      f.resetSpots(this.output);
    };
    g.prototype.renderSpots = function (b) {
      for (var d = 0; d < b.length; d++)
        f.addSpot(new f.mSpot(this.view, b[d]), this.output);
    };
    return g;
  })();
  f.render = l;
})(r || (r = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      this.mv = b;
      this.placed = [];
      this.mIn = b.input;
    }
    g.prototype.ordAll = function () {
      this.placed = [];
      for (
        var b = f.getScheduledCards(this.mv.output), d = 0;
        d < b.length;
        d++
      )
        b[d].ordAng = null;
      return this.ord(b, !1);
    };
    g.prototype.del = function (b) {
      for (var d = [], f = this.placed, k = f.length, g = 0; g < k; g++) {
        for (var n = f[g][1], l = !1, u = n.length - 1; 0 <= u; u--)
          -1 !== b.indexOf(n[u].mc) && ((l = !0), arr.removeAt(n, u));
        if (l) for (l = 0; l < n.length; l++) d.push.apply(d, n[l].mc.all);
      }
      return d;
    };
    g.prototype.get = function (b) {
      var d = [],
        f = this.placed.find(function (d) {
          return d[0][0] === b[0] && d[0][1] === b[1];
        });
      if (!f) return d;
      var k = 0;
      for (f = f[1]; k < f.length; k++) d.push.apply(d, f[k].mc.all);
      return d;
    };
    g.prototype.getAt = function (b, d) {
      for (var f = [], k = 1; k <= b._c.parent.length; k++) {
        var g = this.get(this.getMi(b, k, d)),
          n = g.indexOf(b);
        -1 !== n && arr.removeAt(g, n);
        f.push.apply(f, g);
      }
      return f;
    };
    g.prototype.at = function (b) {
      return this.getAt(b, !1);
    };
    g.prototype.prevAt = function (b) {
      return this.getAt(b, !0);
    };
    g.prototype.add = function (b) {
      for (var d = [], f = this.placed, k = 0; k < b.length; k++)
        for (
          var g = b[k],
            n = function (b) {
              var h = l.getMi(g, b),
                k = f.find(function (b) {
                  return b[0][0] === h[0] && b[0][1] === h[1];
                });
              k = k ? k[1] : void 0;
              b = {
                mc: g,
                part: b,
              };
              if (k) {
                for (var p = 0; p < k.length; p++) d.push.apply(d, k[p].mc.all);
                k.push(b);
              } else f.push([[h[0], h[1]], [b]]);
            },
            l = this,
            u = 1;
          u <= g._c.parent.length;
          u++
        )
          n(u);
      return d;
    };
    g.prototype.ord = function (b, d) {
      void 0 === d && (d = !0);
      b = this.getOrd(b);
      for (
        var h = this.mv.is1(),
          k = this.mIn.viewType.isClass(),
          g = [],
          n = b.length,
          l = this.placed,
          u = function (p) {
            var n = b[p],
              q = 1;
            for (
              p = function () {
                var b = t.getMi(n, q),
                  p = {
                    mc: n,
                    part: q,
                  },
                  u = l.find(function (d) {
                    return d[0][0] === b[0] && d[0][1] === b[1];
                  }),
                  x = u ? u[1] : void 0;
                u = new f.ordAng(n, 0);
                x
                  ? ((x = x.filter(function (b) {
                      return b.mc !== n;
                    })),
                    null === t.getRorC(x, n, d, k, h) &&
                      (n.ordAng ||
                        (u =
                          0 === x.length
                            ? new f.ordAng(n, 0)
                            : t.freeOrdAng(x)),
                      d ||
                        ((x = l.find(function (d) {
                          return d[0][0] === b[0] && d[0][1] === b[1];
                        })) &&
                          x[1].push(p))))
                  : d || l.push([[b[0], b[1]], [p]]);
                n.ordAng || (n.rotAll(u), g.push(n));
              };
              q <= n._c.parent.length;
              q++
            )
              p();
          },
          t = this,
          x = 0;
        x < n;
        x++
      )
        u(x);
      return g;
    };
    g.prototype.getRorC = function (b, d, f, k, g) {
      if (0 === b.length) return 0;
      var h = null;
      if (!f) {
        f = b.length;
        for (var p = 0; p < f; p++) {
          var l = b[p];
          if (l.mc._c === d._c) {
            h = l;
            break;
          }
        }
      }
      f = null;
      null !== h && (f = h.mc);
      null === f && (f = this.getSubOrC(k, g, d, b));
      return f ? f.ang() : null;
    };
    g.prototype.getMi = function (b, d, f) {
      void 0 === f && (f = !1);
      return this.getPartMI(
        f ? b.prevColI : b._colI,
        f ? b.prevRowI : b._rowI,
        d,
      );
    };
    g.prototype.getPartMI = function (b, d, f) {
      var h = this.mIn.is1();
      return [
        -1 === b ? -1 : h ? b : b + f - 1,
        -1 === d ? -1 : h ? d + f - 1 : d,
      ];
    };
    g.prototype.freeOrdAng = function (b) {
      for (
        var d = 0, h, k = new f.ordAng(b[0].mc, 0), g = b.length, n = 1;
        n <= g + 1;
        n++
      ) {
        var l = new f.ordAng(b[0].mc, d);
        h = l.ang;
        for (var u = !1, t = 0; t < g; t++)
          if (b[t].mc.ang() === h) {
            d++;
            u = !0;
            break;
          }
        if (!u) {
          k = l;
          break;
        }
      }
      return k;
    };
    g.prototype.getOrd = function (b) {
      return b.sort(function (b, f) {
        return (
          arr.sort(b._rowI, f._rowI) ||
          arr.sort(b._colI, f._colI) ||
          -arr.sort(b._c.pinned, f._c.pinned) ||
          -arr.sort(b._c.parent.length, f._c.parent.length) ||
          -arr.sort(b.relH(), f.relH()) ||
          arr.sort(b.isSelA, f.isSelA) ||
          -arr.sort(b.ang(), f.ang())
        );
      });
    };
    g.prototype.getSubOrC = function (b, d, h, k) {
      var g = h._c;
      if (!b || e.isEntireClass(g)) return null;
      b = d ? this.mIn.viewType.ve : f.getEntities(this.mv)[h._rowI];
      g = this.getGroups(g, b);
      d = [];
      for (h = 0; h < k.length; h++) {
        var n = k[h].mc;
        e.isEntireClass(n._c) || d.push(n);
      }
      k = null;
      n = d.length;
      for (h = 0; h < n; h++) {
        var l = d[h],
          u = this.getGroups(l._c, b);
        this.hasSubOrCGr(g, u) && (k = l);
      }
      return k;
    };
    g.prototype.hasSubOrCGr = function (b, d) {
      if (0 === d.length) return !1;
      for (var f = b.length, k = d.length, g = 0; g < f; g++)
        for (var n = b[g], l = 0; l < k; l++) {
          var u = d[l];
          if (u.parent === n.parent && u.id === n.id) return !1;
        }
      return !0;
    };
    g.prototype.getGroups = function (b, d) {
      return e.sortNotDel(
        b.parent.groups.filter(function (b) {
          return e.getClass(b) === d;
        }),
      );
    };
    return g;
  })();
  f.layer = l;
  l = (function () {
    function f(b, d) {
      this.mc = b;
      this._ordI = d;
      this.ang = this.getAng();
    }
    f.prototype.ordI = function () {
      return this._ordI + 1;
    };
    f.prototype.getAng = function () {
      var b = this._ordI;
      return b * (0 === b % 2 ? 1 : -1) * this.mc.mv.angStep;
    };
    return f;
  })();
  f.ordAng = l;
  l = (function () {
    function f() {
      this.x();
      this.dragC = 1900;
      this.valCell = 1910;
    }
    f.prototype.x = function () {
      this.card = 1200;
      this.rotCard = 1220;
    };
    f.prototype.next = function () {
      this.card += 1;
      this.rotCard += 1;
      this.card === this.dragC && this.x();
    };
    f.prototype.drg = function (b) {
      void 0 === b && (b = 1);
      this.dragC += b;
    };
    return f;
  })();
  f.zI = l;
})(r || (r = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      this.pageNumber = 1;
      this.mv = b;
    }
    g.prototype.isIndividual = function () {
      return !this.allIndividuals && this.mv.is1();
    };
    g.prototype.setPaging = function (b) {
      if (this.mv.needPaging) {
        this.totalPages = this.pageNumber = 1;
        this.rowCountOn1Page = this.rowCountOnPage = this.mv.data.rowsCount;
        this.mv.needPaging = !1;
        var d = this.mv,
          h = this.mv,
          k = h.size,
          g = h.paging,
          n = d.printSettings().height,
          l = k.getAboveHeight(),
          u = k.getHeaderHeight(),
          t = k.getBelowHeight();
        h = f.getEntities(d).length;
        g.isIndividual() ||
          (g.allIndividuals
            ? ((k = d.viewType().getStudents()),
              (this.totalPages = this.isStudentPrint ? k.length : h))
            : l + u + b + t > n &&
              ((b = n - l - t - u),
              (d = b + k.getTitleAndYearHeight()),
              (k = k.getRowBorderHeight()),
              (this.rowCountOn1Page = Math.floor(b / k)),
              (this.rowCountOnPage = Math.floor(d / k)),
              (this.totalPages = Math.floor(
                (h - this.rowCountOn1Page) / this.rowCountOnPage + 2,
              ))));
      }
    };
    g.prototype.hasMorePages = function () {
      return this.pageNumber < this.totalPages;
    };
    g.prototype.getRowCount = function () {
      return 1 === this.pageNumber ? this.rowCountOn1Page : this.rowCountOnPage;
    };
    g.prototype.getSkippedRows = function () {
      return 1 < this.pageNumber
        ? this.rowCountOn1Page + (this.pageNumber - 2) * this.rowCountOnPage
        : 0;
    };
    return g;
  })();
  f.paging = l;
})(r || (r = {}));
var v;
(function (f) {
  function l(b, d, f) {
    void 0 === f && (f = d);
    if (d > f) {
      var h = [f, d];
      d = h[0];
      f = h[1];
    }
    return b.filter(function (b) {
      return b.mc._rowI >= d && b.mc._rowI <= f;
    });
  }
  function g(b, d, f) {
    if (d > f) {
      var h = [f, d];
      d = h[0];
      f = h[1];
    }
    return b.filter(function (b) {
      return b.mc._colI >= d && b.mc._colI <= f;
    });
  }
  f.relTo = {
    mesh: 0,
    body: 1,
    ok: 2,
  };
  (function (b) {
    b[(b.cell = 0)] = "cell";
    b[(b.row = 1)] = "row";
    b[(b.column = 2)] = "column";
  })(f.markerSource || (f.markerSource = {}));
  f.whxy = function (b) {
    null !== b.w && ui.setWidth(b.el, b.w);
    null !== b.h && ui.setHeight(b.el, b.h);
    null !== b.x && ui.setLeft(b.el, b.x);
    null !== b.y && ui.setTop(b.el, b.y);
  };
  f.toCs = function (b) {
    for (var d = [], f = 0; f < b.length; f++) {
      var k = b[f];
      k.mc.clp ? arr.addUniques(d, k.mc.clp.cards) : arr.addUnique(d, k.card());
    }
    return d;
  };
  f.cs2Vcs = function (b, d) {
    for (var f = [], k = 0; k < d.length; k++)
      for (var g = 0, n = d[k].vcs; g < n.length; g++) {
        var l = n[g],
          u = b.indexOf(l.card());
        -1 !== u && (f.push(l), (l.srtI = u));
      }
    return f.sort(function (b, d) {
      return arr.sort(b.srtI, d.srtI);
    });
  };
  f.toMcs = function (b) {
    var d = [];
    b.forEach(function (b) {
      return arr.addUnique(d, b.mc);
    });
    return d;
  };
  f.haveSameClip = function (b, d) {
    return !b.some(function (b) {
      return b.mc.clp !== d;
    });
  };
  f.toVcs = function (b, d) {
    var f = [],
      k = b.vcs;
    b = function (b) {
      var d = k.find(function (d) {
        return d.mc === b;
      });
      d && f.push(d);
    };
    for (var g = 0; g < d.length; g++) b(d[g]);
    return f;
  };
  f.ins = function (b) {
    return b.filter(function (b) {
      return b.mc.isIn();
    });
  };
  f.out = function (b) {
    return b.filter(function (b) {
      return !b.mc.isIn();
    });
  };
  f.inRowRange = l;
  f.scheduledRowRange = function (b, d, f) {
    void 0 === f && (f = d);
    return v.ins(l(b, d, f));
  };
  f.inColumnRange = g;
  f.scheduledColumnRange = function (b, d, f) {
    return v.ins(g(b, d, f));
  };
  f.pin = function (b, d) {
    return b.filter(function (b) {
      return b.card().pinned === d;
    });
  };
  f.shouldPin = function (b) {
    return b.some(function (b) {
      return !b.card().pinned;
    });
  };
  f.removeUnscheduledCard = function (b, d) {
    b = b.outPanel.xMc(d);
    var f = new r.upd(r.updTy.r);
    b.forEach(function (b) {
      return b.o.upd(f);
    });
  };
  f.addClips = function (b, d) {
    void 0 === d && (d = -1);
    for (var f = b.length, k = 0; k < f; k++) {
      var g = b[k],
        n = g.mc;
      n.hasClp() && arr.addUniques(b, v.toVcs(g.v, n.clps), d);
    }
  };
})(v || (v = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      var d = this;
      this.isInverse = this.isDrg = !1;
      this.selInter = 0;
      this.pasteCs = [];
      this.cs = [];
      this.vcs = [];
      this.tVcs = [];
      this.vs = [];
      this.affVMarks = [];
      this.cA = b;
      this.selectionChange = c.callback();
      this.changeAfterRender = c.callback();
      this.cChg = c.callback();
      this.resize = c.callback();
      this.dockChange = c.callback();
      this.pin = c.callback();
      this.remove = c.callback();
      this.drop = c.callback();
      this.toolChg = c.callback();
      this._tool = new f.tool();
      this.prevTool = new f.tool();
      this.markerDraw = c.callback();
      this.markerEnd = c.callback();
      this.markV = c.callback();
      this.ctx = c.callback();
      this.menuX = c.callback();
      this.ctxX = c.callback();
      this.copyChg = c.callback();
      this.doc = c.documentElement();
      this.form = document.forms[0];
      this.body = c.body();
      this.top = b.top;
      this.bottom = b.bott;
      b.resize.add(function (b) {
        return d.onResize(b);
      });
    }
    g.prototype.addView = function (b) {
      var d = this;
      arr.addUnique(this.vs, b);
      b.changeAfterRender.add(function (b) {
        return d.changeAfterRender.fire(b);
      });
    };
    g.prototype.chkMarkerChg = function (b, d) {
      if ((d.isMark() && !b.isMark()) || (!d.isMark() && b.isMark())) {
        var f = this.isMarker();
        b = 0;
        for (d = this.vs; b < d.length; b++) {
          var k = d[b];
          k.vcs.forEach(function (b) {
            b.onMarker(f);
          });
          k.marks.forEach(function (b) {
            b.setOn(f);
          });
          k.isMarkerPicked = f;
        }
      }
    };
    g.prototype.offTool = function (b, d) {
      var f = this.tool();
      if (f.isMark() && f.isDrawing) this.onMarkerN(d, f, b);
      f.off();
    };
    g.prototype.isMarker = function () {
      return this.tool().isMark();
    };
    g.prototype.tool = function () {
      return this._tool;
    };
    g.prototype.setTool = function (b) {
      this._tool !== b &&
        ((this._tool = b),
        this.toolChg.fire(this.prevTool, this._tool),
        (this.prevTool = this._tool.copy()));
    };
    g.prototype.xTool = function (b) {
      if (this.isMarker()) this.onMarkerN(null, this, b);
      b = this.tool().off();
      if (this.tool().no()) return b;
      this.setTool(new f.tool());
      return !0;
    };
    g.prototype.onResize = function (b) {
      this.vs.forEach(function (d) {
        return d.onResize(b, 0, !0);
      });
      this.resize.fire(b);
      this.dockChange.fire();
    };
    g.prototype.onVcMR = function (b, d) {
      d.v.isPrintOrPublish() ||
        d instanceof f.dsgVc ||
        (ui.stopDefaultPropagation(b),
        this.onChgC(d.card(), !0),
        this.ctx.fire(b, {
          view: d.v,
          object: d,
        }));
    };
    g.prototype.onMenuX = function (b) {
      void 0 === b && (b = null);
      this.menuX.fire(b);
    };
    g.prototype.onMarkSets = function (b, d, f) {
      this.markV.fire(b, d, f);
    };
    g.prototype.onCtxX = function () {
      this.ctxX.fire();
    };
    g.prototype.onMarkerDraw = function (b) {
      this.markerDraw.fire(b);
    };
    g.prototype.onMarkerN = function (b, d, f) {
      this.markerEnd.fire(b, d, f);
    };
    g.prototype.updSpl = function (b) {
      if (b.input.dock)
        for (
          var d = b.size.splitterLeft, f = 0, k = this.vs;
          f < k.length;
          f++
        ) {
          var g = k[f];
          g !== b && g.input.dock && g.vEv.resizeAfterSplitterDrag(d);
        }
    };
    g.prototype.syncWidths = function () {
      for (var b = 0, d = this.vs; b < d.length; b++) d[b].syncWidthTimeout();
    };
    g.prototype.clk = function (b, d, f, k) {
      var h = d.slice(),
        g = 0,
        l = [];
      v.addClips(d, 0);
      0 < d.length &&
        (l = this.vcs.filter(function (b) {
          return b.v === k;
        }));
      if (f && keys.shift(b) && 0 < l.length) {
        var u = arr.last(l),
          t = d[0],
          x = t.v,
          y = t.mc.isIn(),
          z = u.colI(),
          A = t.colI(),
          B = [];
        if (t.v === u.v) {
          d = y;
          x = v.inRowRange(x.vcs, u.mc._rowI, t.mc._rowI);
          var C = v.out(x);
          if (u.mc.isIn() !== y) {
            d = !0;
            var G =
              r.getColumnsCount(
                t.v.data.daysCount,
                t.v.data.periodsCount,
                t.v.is1(),
              ) - 1;
            y
              ? ((B = v.inColumnRange(C, 0, z)), (z = G))
              : ((B = v.inColumnRange(C, 0, A)), (A = G));
          }
          y = d ? v.ins(x) : C;
          d = v.inColumnRange(y, z, A);
          d.push.apply(d, B);
          v.addClips(d, 0);
          arr.hasAll(l, d) || (arr.removes(d, [t, u]), d.push(t));
          0 === d.length && (d = [t]);
        }
      }
      l = v.toCs(d);
      f && this.addTch(b, h);
      if (
        1 < this.tVcs.length ||
        (1 <= this.tVcs.length && !f) ||
        keys.ctrlOrAltOrShift(b)
      )
        this.xCs(l, k) ? (g = -1) : this.addCs(l, d, k);
      else {
        if (arr.hasAll(this.cs, l))
          return (
            this.onChgC(arr.last(l)),
            f && this.scrVcs(k, l),
            this.addVcs(d, k),
            g
          );
        this.resetSelection(!1);
        f && this.addTch(b, h);
        this.addCs(l, d, k);
      }
      this.onNChg();
      return g;
    };
    g.prototype.addSel = function (b) {
      var d = this;
      b.find(function (b) {
        return arr.has(d.vcs, b);
      }) && arr.addUniques(b, this.vcs);
    };
    g.prototype.addTch = function (b, d) {
      ui.isTouchEvent(b) && arr.addUniques(this.tVcs, d);
    };
    g.prototype.xTch = function (b) {
      arr.removes(this.tVcs, b);
    };
    g.prototype.setOv = function (b) {
      if (0 === this.cs.length) this.onChgC(b);
    };
    g.prototype.xCs = function (b, d) {
      if (!arr.hasAll(this.cs, b)) return !1;
      arr.removes(this.cs, b);
      var f = this.vcs.filter(function (d) {
        return arr.has(b, d.card());
      });
      this.xVcs(f);
      this.scrVcs(d);
      return !0;
    };
    g.prototype.inf = function (b) {
      this.cA.inf.add(b);
    };
    g.prototype.addCs = function (b, d, f) {
      arr.addUniques(this.cs, b);
      for (var h = [], g = 0; g < d.length; g++) arr.addUniques(h, d[g].all());
      this.scrVcs(f, b, h);
      this.addVcs(h, f);
    };
    g.prototype.scrVcs = function (b, d, f) {
      var h = this.vs.filter(function (d) {
        return d !== b;
      });
      d = d || this.cs;
      for (var g = 0; g < h.length; g++) {
        var n = h[g],
          l = v.cs2Vcs(d, [n]);
        0 < l.length && (f && f.push.apply(f, l), n.scrollToCard(arr.last(l)));
      }
    };
    g.prototype.addVcs = function (b, d) {
      var f;
      arr.removes(this.vcs, b);
      (f = this.vcs).push.apply(f, b);
      this.updateSelection(d);
    };
    g.prototype.xVcs = function (b) {
      var d = this;
      return arr.removes(this.vcs, b)
        ? (b.forEach(function (b) {
            return d.xSelAVc(b);
          }),
          !0)
        : !1;
    };
    g.prototype.updateSelection = function (b) {
      var d = this;
      this.xSelA();
      this.vcs.forEach(function (b) {
        return d.bringToFront(b);
      });
      this.startSelA();
      this.selectionChange.fire(b, this.vcs);
    };
    g.prototype.startSelA = function () {
      var b = this;
      clearInterval(this.selInter);
      this.isInverse = !1;
      this.inverse(!1);
      this.selInter = setInterval(function () {
        return b.selA();
      }, 500);
    };
    g.prototype.bringToFront = function (b) {
      b.mc.isSelA = !0;
      b.mc.mcZi(b.v.zI.rotCard + 1);
      b.updZI();
    };
    g.prototype.xSelA = function () {
      clearInterval(this.selInter);
      this.inverse(!1);
    };
    g.prototype.xSelAVc = function (b) {
      b.mc.isSelA = !1;
      this.inverseVc(b, !1);
    };
    g.prototype.inverse = function (b) {
      var d = this;
      this.vcs
        .filter(function (b) {
          return b.mc.isSelA;
        })
        .forEach(function (f) {
          return d.inverseVc(f, b);
        });
    };
    g.prototype.inverseVc = function (b, d) {
      b.all().forEach(function (b) {
        return b.inverse(d);
      });
    };
    g.prototype.selA = function () {
      this.isInverse = !this.isInverse;
      this.inverse(this.isInverse);
    };
    g.prototype.selectAfterDraw = function (b) {
      var d = this.cs;
      0 !== d.length &&
        this.addVcs(
          b.vcs.filter(function (b) {
            return arr.has(d, b.card());
          }),
          b,
        );
    };
    g.prototype.delSels = function (b) {
      this.xVcs(
        this.vcs.filter(function (d) {
          return d.v === b;
        }),
      );
    };
    g.prototype.isSel = function (b) {
      return arr.hasAll(this.cs, b);
    };
    g.prototype.resetSelection = function (b) {
      void 0 === b && (b = !0);
      this.cs = [];
      this.xVcs(this.vcs.slice());
      this.xTch(this.tVcs.slice());
      this.onChgC(void 0, b);
    };
    g.prototype.changeTimetable = function (b) {
      this.resetSelection();
      this.resetClipboard();
      this.vs.forEach(function (d) {
        return d.changeTimetable(b);
      });
    };
    g.prototype.refreshAll = function () {
      this.vs.forEach(function (b) {
        return b.refreshAll();
      });
    };
    g.prototype.initSwitcher = function () {
      this.vs.forEach(function (b) {
        return b.switcher.init();
      });
    };
    g.prototype.deleteSpots = function () {
      this.vs.forEach(function (b) {
        return b.deleteSpots();
      });
    };
    g.prototype.onNChg = function () {
      this.onChgC(arr.last(this.cs));
    };
    g.prototype.onChgC = function (b, d) {
      void 0 === d && (d = !0);
      this._c !== b && ((this._c = b), d && this.cChg.fire(b));
    };
    g.prototype.onCopy = function (b, d, f) {
      void 0 === f && (f = !0);
      0 !== d.length &&
        ((this.pasteCs = d.slice()), f && this.copyChg.fire(this.pasteCs));
    };
    g.prototype.hasCopy = function () {
      return 0 < this.pasteCs.length;
    };
    g.prototype.resetClipboard = function () {
      this.pasteCs = [];
    };
    return g;
  })();
  f.g = l;
})(v || (v = {}));
(function (f) {
  var l = (function (b) {
    function d(d) {
      return b.call(this, d) || this;
    }
    __extends(d, b);
    return d;
  })(r.input);
  f.input = l;
  l = (function (b) {
    function d(d, f) {
      d = b.call(this, d) || this;
      d.isChanging = !1;
      d.isMakerLoaded = !0;
      d.hasResize = !1;
      d.vcs = [];
      d.marks = [];
      d.spots = [];
      d.isDragOn = !0;
      d.isLastClearedOrdered = !1;
      d.change = c.callback();
      d.changeAfterRender = c.callback();
      d.adornerChange = c.callback();
      d.done = c.callback();
      d.dayTap = c.callback();
      d.periodTap = c.callback();
      d.rightCornerTap = c.callback();
      d.cursorMove = c.callback();
      d.manageViews = c.callback();
      d.extraRequested = c.callback();
      d.g = f;
      return d;
    }
    __extends(d, b);
    d.prototype.init = function (d) {
      var h = this;
      b.prototype.go.call(this, d);
      this.vIn = d;
      this.el = d.el;
      this.switcher = new f.switcher(this);
      this.switcher.set(d.viewType);
      this.page = ui.getDiv("page");
      this.title = ui.getDiv("title");
      this.year = ui.getDiv("year");
      this.customHtml = ui.getDiv("customHtml");
      this.mesh = ui.getDiv("mesh");
      this.header = ui.getDiv("viewHeader");
      this.side = ui.getDiv("side");
      this.body = ui.setTabIndex(ui.getDiv("viewScroll"), 0);
      this.scroller = new f.scroller({
        source: this.body,
        horizontallyAffected: [this.header],
        verticallyAffected: [this.side],
      });
      ui.appends(
        [
          this.title,
          this.year,
          this.customHtml,
          this.mesh,
          this.header,
          this.side,
          this.body,
          this.switcher.indicator,
          this.switcher.indicatorName,
          this.switcher.switcherTabs,
          this.switcher.tabContent,
        ],
        this.page,
      );
      ui.append(this.page, this.el);
      this.vEv = new f.vEv(this);
      this.output = r.getOutput();
      this.draw = new v.vDraw(this);
      d.optionsChange = function () {
        return h.refresh();
      };
      this.scrollAnimation = new c.scrA([this.body]);
      this.scrollAnimation.ea = c.eaTy.oQuint;
      this.scrollAnimation.dur = 200;
      ui.on(this.body, "keydown", function (b) {
        return h.onKey(b);
      });
      this.set(new r.upd(r.updTy.go));
    };
    d.prototype.set = function (b) {
      this.angStep = this.is1() ? 5 : 15;
      this.setSize(b);
      this.switcher.setPos();
      ui.toggleClass(this.el, "single", this.is1());
      this.is1()
        ? ui.switchClass(this.el, "master", "single")
        : ui.switchClass(this.el, "single", "master");
      this.toggleTitleAndYear();
    };
    d.prototype.setSize = function (b) {
      var d = this.size;
      b = b.ty === r.updTy.r;
      this.isFloat() &&
        b &&
        ((d.predefinedViewWidth = ui.getWidth(this.el)),
        (d.predefinedViewHeight = ui.getHeight(this.el)));
      d.setAll();
      ui.setBox(this.mesh, d.mesh);
      ui.setBox(this.header, d.header);
      ui.setBox(this.side, d.side);
      ui.setBox(this.body, d.body);
      ui.toggleClass(this.mesh, "timetableBorder", this.isPrintOrPublish());
      ui.setMargin(this.page, d.page.margin);
      ui.setSize(this.page, d.page);
      ui.toggleClass(this.page, "bw", this.isBlackAndWhite());
      ui.setSize(this.vIn.el, d.container);
      this.isMain() &&
        !this.isWeb() &&
        (ui.setSize(this.vA.el, d.app),
        (d = this.isPrint() ? c.windowHeight() : d.app.height),
        ui.setHeight(this.g.doc, d),
        ui.setHeight(this.g.body, d),
        ui.setHeight(this.g.form, d));
      this.setOverflow();
      this.syncWidthTimeout();
      return !0;
    };
    d.prototype.syncWidthTimeout = function (b) {
      var d = this;
      void 0 === b && (b = !1);
      this.isPrintOrPublish() ||
        c.timeout(function () {
          return d.syncWidth(b);
        }, 300);
    };
    d.prototype.syncWidth = function (b) {
      void 0 === b && (b = !1);
      var d = ui.hasHorizontalScroll(this.body);
      if (d !== this.size.scroll.hasHorizontal)
        ((this.size.hasHorizontal = d), this.onResize());
      else {
        var f = ui.hasVerticalScroll(this.body);
        d = this.body.scrollWidth - this.size.content.width;
        f = d + (f ? c.scrollWidth() : 0);
        try {
          if (
            (ui.setWidth(this.output.rightCorner.el, f),
            ui.setWidth(this.output.outsideBack.el, d),
            b)
          ) {
            this.scroller.sync();
            var h = this.scroller.options.source,
              g = h.scrollLeft;
            h.scrollLeft = Math.max(g - 1, 0);
            h.scrollLeft = g;
          }
        } catch (u) {}
      }
    };
    d.prototype.setOverflow = function () {
      if (this.isPrint() ? 1 === this.pageNumber : this.isMain()) {
        var b = this.size.scroll;
        this.g.body.style.overflowX =
          this.isWeb() || (b.isHtml && b.hasHorizontal) ? "auto" : "hidden";
        this.g.body.style.overflowY =
          this.isWeb() || (b.isHtml && b.hasVertical) ? "auto" : "hidden";
      }
    };
    d.prototype.onResize = function (b, d, f) {
      void 0 === d && (d = 0);
      void 0 === f && (f = !1);
      b = this.status;
      if (b === r.viewStatus.render) return ((this.hasResize = !0), !1);
      this.status = r.viewStatus.resize;
      this.resize(new r.upd(2 === d ? r.updTy.vZ : r.updTy.r));
      this.status = b;
      if (f) this.g.onMenuX();
      return !0;
    };
    d.prototype.resize = function (b) {
      this.set(b);
      this.whxy(b);
    };
    d.prototype.toggleTitleAndYear = function () {
      ui.setHtml(this.title, this.getTitle());
      ui.setHtml(this.year, this.getYear());
      ui.setHtml(this.customHtml, this.data._t.html || "");
      ui.toggles(
        [this.title, this.year, this.customHtml],
        this.isTitleVisible(),
      );
      ui.toggles([this.g.top, this.g.bottom], !this.isPrintOrPublish());
    };
    d.prototype.changeTimetable = function (d) {
      b.prototype.changeTimetable.call(this, d);
      this.switcher.init();
      var f = this.viewType().view,
        h = e.getViews(d, e.viewVisibility.all);
      e.hasId(h, f.id) ||
        (this.input.viewType = r.newViewTypeFromIndex(
          d,
          f ? f.entityType - 1 : e.vMod.c,
        ));
      this.refresh();
    };
    d.prototype.handleSwitchViewKeys = function (b) {
      if (
        !this.isDockExtra() &&
        keys.ctrl(b) &&
        !keys.alt(b) &&
        !keys.shift(b)
      ) {
        var d = keys.indexOf(b, [49, 50, 51, 52, 53, 54, 55, 56, 57]);
        if (-1 !== d) return (this.switcher.onIndexKey(b, d), !0);
        if (
          this.is1() &&
          ((d = keys.indexOf(b, [38, 40, 36, 35, 33, 34])), -1 !== d)
        )
          return (
            ui.stopDefaultPropagation(b),
            this.jump1V([-1, 1, -1e3, 1e3, -10, 10][d]),
            !0
          );
      }
      return !1;
    };
    d.prototype.jump1V = function (b) {
      var d = new r.viewType(this.viewType().view),
        f = this.viewType().ve.position - 1;
      b = Math.min(Math.max(0, f + b), this.data.entities.length - 1);
      b !== f && ((d.ve = this.data.entities[b]), this.changeViewType(d));
    };
    d.prototype.onKey = function (b) {
      var d = keys.keyCode(b);
      if (
        !this.handleSwitchViewKeys(b) &&
        (keys.esc(b) && this.switcher.hide(),
        !this.isPrintOrPublish() && !this.isWeb())
      ) {
        if (keys.ctrl(b) && 67 === d) this.g.onCopy(b, this.g.cs);
        keys.ctrl(b) ||
          keys.alt(b) ||
          keys.shift(b) ||
          (40 === d
            ? (this.stopKey(b), this.scrollRow(b, 1))
            : 38 === d
              ? (this.stopKey(b), this.scrollRow(b, -1))
              : 34 === d
                ? (this.stopKey(b), this.scrollPage(b, 1))
                : 33 === d
                  ? (this.stopKey(b), this.scrollPage(b, -1))
                  : 35 === d
                    ? (this.stopKey(b),
                      this.scrollAnimation.to(this.size.body.scrollHeight, !0))
                    : 36 === d &&
                      (this.stopKey(b), this.scrollAnimation.to(0, !0)));
      }
    };
    d.prototype.stopKey = function (b) {
      ui.stopDefaultPropagation(b);
    };
    d.prototype.scrollPage = function (b, d) {
      ui.preventDefault(b);
      b = this.size.getRowBorderHeight();
      this.scrollAnimation.to(
        this.body.scrollTop + b * d * Math.round(this.size.bodyLimitHeight / b),
        !0,
      );
    };
    d.prototype.scrollRow = function (b, d) {
      ui.preventDefault(b);
      b = this.body.scrollTop + this.size.getRowBorderHeight() * d;
      this.body.scrollTop = b;
    };
    d.prototype.refreshAll = function () {
      this.refresh({
        data: !0,
      });
    };
    d.prototype.refresh = function (b) {
      try {
        if (
          ((b = obj.merge(
            {
              data: !1,
              isEmpty: !1,
            },
            b,
          )),
          !this.isPrint() || !this.isExtra())
        ) {
          b.data && r.setData(this);
          this.g.onMenuX();
          var d = this.viewType();
          if (!b.isEmpty && d.veId) {
            var f = r.getEntities(this).find(function (b) {
              return b.id.toLowerCase() === d.veId.toLowerCase();
            });
            f
              ? ((d.ve = f),
                (d.veId = void 0),
                this.log(d.name() + " view"),
                this.viewType().from(d),
                d.studentId
                  ? this.viewType().addSelectedStudent(
                      e.byId(f.sortedStudents, d.studentId),
                    )
                  : 0 < d.groupIds.length &&
                    this.viewType().addSelectedGroups(
                      e.byIds(this.data._t.groups, d.groupIds),
                    ),
                this.onViewTypeChange())
              : (d.veId = void 0);
          }
          this.set(new r.upd(r.updTy.go));
          if (this.is1() && this.isPublish()) {
            var h = new c.scrA([this.g.doc]);
            h.dur = 240;
            h.to(0, !0);
          }
          this.zI = new r.zI();
          this.draw.go(b.isEmpty);
        }
      } catch (q) {
        this.vA.error.on(q, "render view");
      }
    };
    d.prototype.onViewTypeChange = function () {
      this.vIn.viewTypeChange.fire(this.viewType());
      r.setRowEntities(this);
    };
    d.prototype.whxy = function (b) {
      try {
        this.draw.whxy(b);
      } catch (k) {
        this.vA.error.on(k, "whxy view");
      }
    };
    d.prototype.changeViewType = function (b, d) {
      this.viewType().from(b);
      this.changeView(d);
    };
    d.prototype.changeView = function (b) {
      this.g.delSels(this);
      var d = this.viewType();
      this.switcher.set(d);
      this.onViewTypeChange();
      if (this.isMain()) {
        for (
          var f = [[a.viewHash.view, (d.i + 1).toString()]],
            h = -1,
            g = 0,
            l = a.individualViewHashes;
          g < l.length;
          g++
        )
          f.push([l[g], this.is1() && d.i === ++h ? d.ve.id : null]);
        d.view && f.push([a.viewHash.viewId, d.view.isDefault ? null : d.id]);
        this.vA.hash.updatePairs(f);
      }
      this.onChange();
      this.log(
        this.viewType().name() + (this.isExtra() ? " extra" : "") + " view",
      );
      this.refresh(b);
    };
    d.prototype.onDrawDone = function () {
      this.done.fire(this);
      this.g.selectAfterDraw(this);
      0 === this.draw.spots.length &&
        0 < this.g.vcs.length &&
        this.scrollToCard(arr.last(this.g.vcs));
      this.draw.deleteSpots(!1);
      this.addSpots(
        this.draw.spots,
        this.draw.isSpotError,
        this.draw.spotViewId,
      );
      this.rotate();
      this.addClips();
      this.isChanging &&
        ((this.isChanging = !1), this.changeAfterRender.fire(this));
    };
    d.prototype.scrollToCard = function (b) {
      b && this.scrollTo(b.mc.y + Math.floor(b.mc.h / 2) + 1);
    };
    d.prototype.scrollTo = function (b) {
      ui.hasVerticalScroll(this.body) &&
        this.scrollAnimation.to(
          Math.max(0, b - (Math.floor(this.size.bodyLimitHeight / 2) + 1)),
          !0,
        );
    };
    d.prototype.rotate = function (b) {
      var d = this;
      void 0 === b && (b = r.updTy.go);
      this.vIn.rotate &&
        (b === r.updTy.s
          ? this.doRotate(b)
          : c.timeout(function () {
              return d.doRotate(b);
            }, 50));
    };
    d.prototype.doRotate = function (b) {
      void 0 === b && (b = r.updTy.go);
      var d = this.layer.ordAll();
      f.toVcs(this, d).forEach(function (d) {
        return d.rotAll(new r.upd(b), d.mc.ordAng);
      });
    };
    d.prototype.addClips = function (b) {
      void 0 === b && (b = new r.upd(r.updTy.go));
      this.isPrintOrPublish() ||
        this.addClipsToCards(
          v.toVcs(this, r.getClippedMetaCards(this.data._t, this.output)),
          b,
        );
    };
    d.prototype.addClipsToCards = function (b, d) {
      for (var f = 0; f < b.length; f++) {
        var h = b[f];
        h.mc.setClip(d);
        h.updCl();
      }
    };
    d.prototype.deleteSpots = function () {
      this.draw.deleteSpots(!0);
    };
    d.prototype.addSpots = function (b, d, f) {
      0 !== b.length &&
        this.draw.drawSpots(b, d, f) &&
        this.scrollTo(this.spots[0].midT());
    };
    d.prototype.onChange = function () {
      this.isChanging = !0;
      this.change.fire(this.viewType());
    };
    d.prototype.onAdornerChange = function (b) {
      this.adornerChange.fire(b);
    };
    d.prototype.onDayTap = function (b, d) {
      this.dayTap.fire(b, d);
    };
    d.prototype.onPeriodTap = function (b, d) {
      this.periodTap.fire(b, d);
    };
    d.prototype.onRightCornerTap = function (b) {
      if (keys.ctrlOrAltOrShift(b) || this.vEv.isMulti(b)) {
        var d = v.out(this.vcs);
        d = 0 < d.length ? d : v.ins(this.vcs);
        if (0 < d.length) {
          this.g.clk(b, d, !1, this);
          return;
        }
      }
      this.rightCornerTap.fire(b);
    };
    d.prototype.onCursorMove = function (b) {
      this.cursorMove.fire(b);
    };
    d.prototype.onManageViews = function (b) {
      this.manageViews.fire(b);
    };
    d.prototype.onExtraRequested = function (b) {
      this.extraRequested.fire(b);
    };
    d.prototype.allowSwitchToMaster = function () {
      return this.isPublish()
        ? this.viewType().isMasterRendered || this.vA.switchView
        : !0;
    };
    d.prototype.log = function (b) {
      this.vA.log.w(b);
    };
    d.prototype.loc = function () {
      return this.vA.loc;
    };
    return d;
  })(r.view);
  f.view = l;
  l = (function () {
    function b(b, f, g) {
      this.v = b;
      this.el = f;
      this.mEl = g;
    }
    b.prototype.upd = function (b) {
      this.mEl.whxy(this.v.size, b);
      this.el.style.cssText = r.dSty(this.mEl);
    };
    return b;
  })();
  f.vEl = l;
  var g = (function (b) {
    function d(d, f, g) {
      var h = b.call(this, d, f, g) || this;
      h.v = d;
      h.el = f;
      h.mSpot = g;
      h.upd(new r.upd(r.updTy.go));
      return h;
    }
    __extends(d, b);
    d.prototype.upd = function (b) {
      this.mEl.whxy(this.v.size, b);
      this.el.style.cssText = this.mEl.sty();
    };
    d.prototype.midT = function () {
      return this.mSpot.midY();
    };
    return d;
  })(l);
  f.spot = g;
  l = (function (b) {
    function d(d, f) {
      f = b.call(this, f, ui.getDiv(d.cl), d) || this;
      f.mMark = d;
      f.go();
      return f;
    }
    __extends(d, b);
    d.prototype.go = function () {
      var b = this.el,
        d = this.mMark.markTy;
      d === e.markTy.u
        ? ui.appends([ui.getDiv("dot"), ui.getDiv("exclam")], b)
        : d === e.markTy.m &&
          ui.appends([ui.getDiv("plusV"), ui.getDiv("plusH")], b);
      b.style.cssText = r.dSty(this.mMark);
      this.setOn(this.v.g.isMarker());
    };
    d.prototype.upd = function (b) {
      this.mEl.whxy(this.v.size, b);
      this.el.style.cssText = r.dSty(this.mMark);
    };
    d.prototype.setOn = function (b) {
      ui.toggleClass(this.el, "on", b);
    };
    return d;
  })(l);
  f.vMark = l;
})(v || (v = {}));
(function (f) {
  var l = (function () {
    function f(b) {
      var d = this;
      this.isClickOpen = this.is2Click = !1;
      this.to = 0;
      this.tabContentClass = "switcherTabContent";
      this.viewIndex = 0;
      this.v = b;
      this.indicator = ui.getDiv("viewIndicator class");
      this.indicatorName = ui.getDiv("viewIndicatorName");
      this.icon = svg.getIcon(this.indicator, "svgIcon", "classD");
      ui.click(this.indicator, function (b) {
        return d.onClick(b);
      });
      ui.over(this.indicator, function (b, f) {
        return f ? d.onOver(b) : d.onOut(b);
      });
      this.switcherTabs = ui.getDiv("switcherTabs");
      this.tabContent = ui.getDiv(this.tabContentClass);
      ui.ons([this.switcherTabs, this.tabContent], "mouseenter", function (b) {
        return d.removeTimeout();
      });
      this.init();
    }
    f.prototype.init = function () {
      this.initViews();
      this.initFilters();
    };
    f.prototype.initViews = function () {
      var b = this;
      this.v.isDockExtra() &&
        (ui.hide(this.indicator), ui.hide(this.indicatorName));
      this.hide();
      ui.empty(this.switcherTabs);
      ui.empty(this.tabContent);
      var d = this.v.isMain() && !this.v.isPrintOrPublish(),
        f = this.v.isPublish()
          ? e.viewVisibility.visibleOnWeb
          : e.viewVisibility.visibleInApp;
      f = e.getViews(this.v.data._t, f);
      for (var g = f.length + (d ? 1 : 0), p = -1, n = 0; n < f.length; n++) {
        var l = f[n],
          u = l.name,
          t = this.getClassName(l.entityType - 1),
          x = ["switcherTab", t];
        l.isDefault || x.push("customView");
        ++p !== g - 1 || d || x.push("last");
        x = ui.getDiv(arr.join(x, " "));
        svg.getIcon(x, "svgIcon", t + "D");
        u && ui.hint(x, str.htmlDecode(u), c.hintPos.bottom);
        ui.dat(x, "id", l.id + "");
        u = ui.getDiv("customViewName");
        l = this.getShortName(l);
        ui.setText(u, l);
        ui.append(u, x);
        ui.click(x, function (d) {
          return b.onTabClick(d);
        });
        ui.over(x, function (d, f) {
          return f ? b.onItemOver(d) : b.onItemOut(d);
        });
        ui.append(x, this.switcherTabs);
      }
      d &&
        ((x = ui.getDiv("switcherTab gear last")),
        svg.getIcon(x, "svgIcon", "optionsD"),
        ui.hint(x, "Manage views", c.hintPos.bottom),
        ui.click(x, function (d) {
          return b.onManageClick(d);
        }),
        ui.over(x, function (d, f) {
          return f ? b.onItemOver(d) : b.onItemOut(d);
        }),
        ui.append(x, this.switcherTabs));
      ui.setWidth(this.switcherTabs, 39 * g - 1);
    };
    f.prototype.initFilters = function () {
      var b = this;
      this.filtersPanel = ui.getDiv("filtersPanel relative");
      this.filterPanel = ui.getDiv("filterPanel relative");
      var d = ui.getTag("label");
      ui.addClass(d, "filterByLabel");
      ui.setText(d, "Filter by");
      var f = ui.getDiv("switchField relative");
      this.studentsRadio = this.getRadio(!0, "studentsSwitch", "Students");
      this.studentsLabel = this.getLabel("studentsSwitch", "Students");
      this.groupsRadio = this.getRadio(!1, "groupsSwitch", "Groups");
      this.groupsLabel = this.getLabel("groupsSwitch", "Groups");
      ui.appends(
        [
          this.studentsRadio,
          this.studentsLabel,
          this.groupsRadio,
          this.groupsLabel,
        ],
        f,
      );
      ui.appends([d, f], this.filterPanel);
      this.groupsPanel = ui.getDiv("groupsPanel relative");
      this.studentsPanel = ui.getDiv("studentsPanel relative");
      ui.hide(this.filtersPanel);
      ui.appends(
        [this.filterPanel, this.groupsPanel, this.studentsPanel],
        this.filtersPanel,
      );
      ui.append(this.filtersPanel, this.tabContent);
      ui.ons(
        [
          this.filtersPanel,
          this.filterPanel,
          this.groupsPanel,
          this.studentsPanel,
        ],
        "mouseenter",
        function (d) {
          return b.removeTimeout();
        },
      );
      ui.ons(
        [this.groupsRadio, this.studentsRadio],
        "change",
        function (d) {
          return b.onRadioChange();
        },
        {
          capture: !0,
        },
      );
    };
    f.prototype.getShortName = function (b) {
      return b ? str.htmlDecode(b.shortName).substring(0, 3) : "";
    };
    f.prototype.toggleRender = function (b) {
      ui.toggleClass(this.indicator, "render", b);
      b || this.setIcon(this.v.viewType().getFilter());
    };
    f.prototype.onRadioChange = function () {
      var b = this.studentsRadio.checked;
      ui.toggle(this.studentsPanel, b);
      ui.toggle(this.groupsPanel, !b);
      var d = this.v.viewType().getFilter();
      d || (d = r.newFilter(this.v.viewType().ve));
      var f = r.newFilterCopy(d);
      f.groups = [];
      f.student = void 0;
      this.onFilterChange(d, f);
      this.togglePanels(!0, b);
    };
    f.prototype.getRadio = function (b, d, f) {
      var h = ui.getTag("input");
      ui.setAttribute(h, "type", "radio");
      ui.setAttribute(h, "id", d);
      ui.setAttribute(h, "name", "filterSwitcher");
      b && ui.setAttribute(h, "checked", "checked");
      ui.setAttribute(h, "value", f);
      return h;
    };
    f.prototype.getLabel = function (b, d) {
      var f = ui.getTag("label");
      ui.setAttribute(f, "for", b);
      ui.addClass(f, "radioLabel");
      return ui.setText(f, d);
    };
    f.prototype.setPos = function () {
      var b = this.v.size.getTitleAndYearHeight() + 7;
      ui.setLeftTop(this.indicator, 22, b);
      ui.setLeftTop(this.indicatorName, 57, b - 3);
      ui.setTop(this.switcherTabs, b - 3);
      ui.setTop(this.tabContent, b + 35.5);
    };
    f.prototype.set = function (b) {
      this.viewIndex = b.i;
      this.setIcon();
      this.hideTabContent();
    };
    f.prototype.setIcon = function (b) {
      var d = this.getClassName(this.v.viewType().i);
      b &&
        (b.student
          ? (d = "students")
          : 0 < b.groups.length && (d = "divisions"));
      svg.setXlink(this.icon.use, d + "D");
      b = this.v.viewType().view;
      b = this.getShortName(b);
      ui.setText(this.indicatorName, b);
    };
    f.prototype.getClassName = function (b) {
      var d = "class";
      b === e.vMod.t
        ? (d = "teacher")
        : b === e.vMod.r
          ? (d = "room")
          : b === e.vMod.s && (d = "subject");
      return d;
    };
    f.prototype.onClick = function (b, d) {
      var f = this;
      void 0 === d && (d = !1);
      ui.stopDefaultPropagation(b);
      c.timeout(function () {
        return f.onClickExpire();
      }, ui.clickTimeout);
      this.is2Click ||
        ((this.is2Click = !0),
        (b = ui.isVisible(this.switcherTabs)),
        b || d || (this.isClickOpen = !0),
        this.v.vA.switchView
          ? this.togglePanels(!b)
          : this.v.is1() && this.v.allowSwitchToMaster() && this.toMaster(!1));
    };
    f.prototype.togglePanels = function (b, d) {
      void 0 === b && (b = !0);
      var f = !1,
        g = !1,
        p = d || !1;
      d = !1 === d || !1;
      var n = this.v.viewType(),
        l = n.getFilter();
      if (b && n.isIndividualClassView()) {
        n = n.ve;
        p = !l;
        l || (l = r.newFilter(n));
        var u = e.getSortedGroupSets(n, !1);
        0 < u.length && (f = !0);
        f && this.setGroupsPanel(l, u);
        n = n.sortedStudents;
        0 < n.length && (g = !0);
        g && this.setStudentsPanel(l, n);
        p = p ? g && !d : !d && g && 0 === l.groups.length;
        d = f && !p;
      }
      ui.toggle(this.switcherTabs, b);
      ui.toggles([this.tabContent, this.filtersPanel], f || g);
      ui.toggle(this.filterPanel, f && g);
      ui.toggle(this.studentsPanel, p);
      ui.toggle(this.groupsPanel, d);
      (b = this.studentsRadio.checked) && d
        ? (this.groupsRadio.checked = !0)
        : !b && p && (this.studentsRadio.checked = !0);
      this.setIcon(l);
    };
    f.prototype.onOver = function (b) {
      this.v.vA.switchView && (this.onClick(b, !0), this.removeTimeout());
    };
    f.prototype.onOut = function (b) {
      this.hideAfterTimeout();
    };
    f.prototype.onClickExpire = function () {
      this.is2Click = !1;
    };
    f.prototype.hideAfterTimeout = function () {
      var b = this;
      this.removeTimeout();
      this.to = c.timeout(function () {
        return b.onTimeout();
      }, 350);
    };
    f.prototype.onTimeout = function () {
      this.hide();
    };
    f.prototype.onTabClick = function (b) {
      ui.stopDefaultPropagation(b);
      this.isClickOpen && this.hide();
      var d = ui._dat(ui.target(b), "id");
      d = this.findView(d);
      if (keys.ctrl(b)) this.v.onExtraRequested(d);
      else this.toView(d);
    };
    f.prototype.onIndexKey = function (b, d) {
      ui.stopDefaultPropagation(b);
      this.v.vA.switchView &&
        (b = e.findSwitcherView(
          this.v.data._t,
          d,
          this.v.isPublish()
            ? e.viewVisibility.visibleOnWeb
            : e.viewVisibility.visibleInApp,
        )) &&
        this.toView(b);
    };
    f.prototype.toView = function (b, d) {
      void 0 === d && (d = !1);
      if (!d) {
        d = this.v.viewType().id;
        var f = this.findView(d);
        f = !f || f.isDefault;
        d = b.id !== d && !(f && b.isDefault);
      }
      this.v.viewType().id = b.id;
      this.v.viewType().view = b;
      this.viewIndex = b.entityType - 1;
      this.toMaster(d);
    };
    f.prototype.toMaster = function (b) {
      this.hideFilters();
      this.v.viewType().toMaster(this.viewIndex);
      this.v.changeView({
        data: b,
      });
    };
    f.prototype.onManageClick = function (b) {
      this.v.onManageViews(b);
    };
    f.prototype.refresh = function () {
      this.v.onChange();
      this.v.refresh();
    };
    f.prototype.findView = function (b) {
      return e.findView(this.v.data._t, b);
    };
    f.prototype.onItemOver = function (b) {
      this.lastItemOver = ui.target(b);
      this.removeTimeout();
      ui.addClass(this.lastItemOver, "over");
    };
    f.prototype.onItemOut = function (b) {
      b = ui.target(b);
      this.lastItemOver === b &&
        (ui.deleteClass(b, "over"), this.hideAfterTimeout());
    };
    f.prototype.removeTimeout = function () {
      clearTimeout(this.to);
    };
    f.prototype.hide = function (b) {
      (b && ui.findParentClass(b.target, this.tabContentClass)) ||
        ((this.isClickOpen = !1),
        ui.hide(this.switcherTabs),
        this.hideTabContent());
    };
    f.prototype.hideTabContent = function () {
      ui.hide(this.tabContent);
    };
    f.prototype.hideFilters = function () {
      ui.hide(this.filtersPanel);
    };
    f.prototype.setStudentsPanel = function (b, d) {
      var f = this;
      ui.empty(this.studentsPanel);
      var g = e.getGroupsForClasses([b._class]);
      b = b && b.student ? b.student.id : "";
      for (var p = 0; p < d.length; p++) {
        var n = d[p],
          l = n.id,
          u = n.name,
          t = ui.getDiv("studentFilter relative", u);
        l === b && ui.addClass(t, "on");
        ui.dat(t, "id", n.id);
        ui.click(t, function (b) {
          return f.onStudentClick(b);
        });
        l = e.byIds(g, n.groupIds);
        l = 0 === l.length ? "" : " (".concat(e.namesStr(l), ")");
        ui.title(t, "".concat(n.position, ". ").concat(u).concat(l));
        ui.append(t, this.studentsPanel);
      }
      return !0;
    };
    f.prototype.setGroupsPanel = function (b, d) {
      var f = this;
      ui.empty(this.groupsPanel);
      var g = r.getFilteredGroups(b),
        p = 0;
      for (
        d = d.map(function (b) {
          return [b, e.sortNotDel(b.groups)];
        });
        p < d.length;
        p++
      ) {
        for (
          var n = d[p][1], l = ui.getDiv("groupSetFilter relative"), u = 0;
          u < n.length;
          u++
        ) {
          var t = n[u],
            x = ui.setText(ui.getDiv("groupFilter relative"), t.name);
          ui.dat(x, "id", t.id);
          ui.click(x, function (b) {
            return f.onGroupClick(b);
          });
          ui.title(x, "Filter by " + t.name);
          (b && b.student) || !arr.has(g, t) || ui.addClass(x, "on");
          ui.append(x, l);
        }
        ui.append(l, this.groupsPanel);
      }
    };
    f.prototype.onStudentClick = function (b) {
      ui.stopDefaultPropagation(b);
      b = ui.target(b);
      var d = this.v.viewType().ve,
        f = e.byId(d.sortedStudents, ui._dat(b, "id")),
        g = this.v.viewType().getFiltersForClass(d),
        p = {};
      if (g) {
        p = r.newFilterCopy(g);
        var n = g.student;
        n === f
          ? ((p.student = void 0), ui.deleteClass(b, "on"))
          : (n &&
              ((d = ui.children(this.studentsPanel).find(function (b) {
                return ui._dat(b, "id") === n.id;
              })),
              ui.deleteClass(d, "on")),
            (p.student = f),
            ui.addClass(b, "on"));
      } else
        ((p = r.newFilter(d)),
          (p.student = f),
          this.v.viewType().classFilters.push(p),
          ui.addClass(b, "on"));
      this.onFilterChange(g, p);
    };
    f.prototype.onGroupClick = function (b) {
      ui.stopDefaultPropagation(b);
      b = ui.target(b);
      var d = e.byId(this.v.data._t.groups, ui._dat(b, "id")),
        f = e.getClass(d),
        g = this.v.viewType().getFilter();
      g || ((g = r.newFilter(f)), this.v.viewType().classFilters.push(g));
      f = r.newFilterCopy(g);
      arr.has(f.groups, d)
        ? (arr.remove(f.groups, d), ui.deleteClass(b, "on"))
        : (f.groups.push(d), ui.addClass(b, "on"));
      this.onFilterChange(g, f);
    };
    f.prototype.onFilterChange = function (b, d) {
      var f = d.student ? d.student.id : "";
      f
        ? this.v.vA.hash.updatePairs([[a.viewHash.studentId, f]])
        : this.v.vA.hash.del(a.viewHash.studentId);
      0 === d.groups.length
        ? this.v.vA.hash.del(a.viewHash.groupId)
        : this.v.vA.hash.updatePairs([
            [a.viewHash.groupId, arr.joinComma(e.ids(d.groups))],
          ]);
      f = !0;
      b &&
        (((!d.student && !b.student) ||
          (d.student && b.student && d.student.id === b.student.id)) &&
          e.idsStr(d.groups) === e.idsStr(b.groups) &&
          (f = !1),
        r.copyFilterTo(d, b));
      this.setIcon(b);
      f && this.refresh();
    };
    return f;
  })();
  f.switcher = l;
})(v || (v = {}));
(function (f) {
  var l = (function () {
    function f(b) {
      var d = this;
      this.options = b;
      ui.on(
        b.source,
        "scroll",
        function (b) {
          return d.sync();
        },
        {
          passive: !0,
        },
      );
    }
    f.prototype.sync = function () {
      var b = this.options.source,
        d = b.scrollTop;
      this.options.verticallyAffected.forEach(function (b) {
        return (b.scrollTop = d);
      });
      var f = b.scrollLeft;
      this.options.horizontallyAffected.forEach(function (b) {
        return (b.scrollLeft = f);
      });
    };
    return f;
  })();
  f.scroller = l;
})(v || (v = {}));
(function (f) {
  var l = (function (b) {
    function d(d, g, p) {
      void 0 === p && (p = f.relTo.mesh);
      var h = b.call(this, d) || this;
      h.view = d;
      h.go(g, d, p);
      return h;
    }
    __extends(d, b);
    d.fromEvent = function (b, g) {
      g = d.vPot(ui.getTouchPoint(g), b);
      return new d(b, g, f.relTo.mesh);
    };
    d.vPot = function (b, d) {
      d.isExtra() && ((d = f.vPos.xVPot(d)), b.mov(-d.x, -d.y));
      return b;
    };
    d.xVPot = function (b) {
      return b.isExtra()
        ? ui.getPos(ui.findParentClass(b.el, "win"))
        : {
            x: 0,
            y: 0,
          };
    };
    d.fromKnown = function (b, d, g, n) {
      b = new f.vPos(b, null);
      b.known(d, g, n);
      return b;
    };
    d.prototype.go = function (b, d, g) {
      b &&
        (g !== f.relTo.ok &&
          ((b.x += d.isPublish() ? d.g.doc.scrollLeft : d.body.scrollLeft),
          (b.y =
            b.y -
            d.size.getAboveHeight() +
            (d.isPublish() ? d.g.doc.scrollTop : d.body.scrollTop))),
        g === f.relTo.body &&
          ((b.y -= d.size.getHeaderHeight()), (b.x -= r.sideWidth)),
        (this._p = b),
        (this.colOff = r.getColumnOffset(d.size, b.x)),
        (this.rowOff = r.getRowOffset(d.size, b.y)),
        (this.columnIndex = this.colOff.index),
        (this.rowNumber = this.rowOff.index + 1),
        d.is1()
          ? (0 !== this.rowNumber && (this.periodIndex = this.rowNumber - 1),
            (this.dayIndex = this.columnIndex))
          : (-1 !== this.columnIndex &&
              (this.dayIndex = Math.floor(
                this.columnIndex / d.data.periodsCount,
              )),
            -1 !== this.dayIndex &&
              (this.periodIndex = this.columnIndex % d.data.periodsCount)));
    };
    d.prototype.isOutRight = function () {
      var b = this._p,
        d = this.mv.size;
      return (
        (b.x >= d.timetable.width && b.x < d.side.width + d.body.scrollWidth) ||
        this instanceof g
      );
    };
    d.prototype.isOutLeft = function () {
      return this._p.x <= r.sideWidth;
    };
    d.prototype.isAbove = function () {
      return this._p.y < this.mv.size.getHeaderHeight();
    };
    d.prototype.isBelow = function () {
      return (
        this._p.y >=
        this.mv.size.content.height + this.mv.size.getHeaderHeight()
      );
    };
    d.prototype.isOut = function () {
      return (
        this.isOutRight() ||
        this.isAbove() ||
        this.isOutLeft() ||
        this.isBelow()
      );
    };
    return d;
  })(r.position);
  f.vPos = l;
  var g = (function (b) {
    function d(d) {
      return (
        b.call(
          this,
          d,
          new ui.point(
            d.size.timetable.width + 1,
            d.size.getHeaderHeight() + 1,
          ),
        ) || this
      );
    }
    __extends(d, b);
    return d;
  })(l);
  f.outPos = g;
  l = (function () {
    function b(b) {
      var d = this;
      this._per = this._day = this._name = null;
      this._v = b;
      b = b.page;
      ui.on(b, ui.getTouchMove(), function (b) {
        return d.onMov(b);
      });
      ui.over(b, function (b, f) {
        return f ? d.onMov(b) : d.out(b);
      });
    }
    b.prototype.onMov = function (b) {
      b = f.vPos.fromEvent(this._v, b);
      var d = b.rowNumber,
        g = b.columnIndex,
        p = b.dayIndex,
        n = this._v.output,
        l = n.labelPanels,
        u = n.periodPanels,
        t = n.dayPanels;
      n = !1;
      0 !== d &&
        d <= l.length &&
        ((d = l[d - 1]),
        this.over(d, this._name),
        d !== this._name && ((n = !0), this.xOver(this._name)),
        (this._name = d));
      -1 !== g &&
        g < u.length &&
        ((g = u[g]),
        this.over(g, this._per),
        g !== this._per && ((n = !0), this.xOver(this._per)),
        (this._per = g));
      -1 !== p &&
        p < t.length &&
        ((p = t[p]),
        this.over(p, this._day),
        p !== this._day && ((n = !0), this.xOver(this._day)),
        (this._day = p));
      if (
        n &&
        this._v.g.tool().isMarkerDraw() &&
        -1 !== b.columnIndex &&
        0 !== b.rowNumber
      )
        this._v.g.onMarkerDraw(b);
    };
    b.prototype.over = function (b, f) {
      null === b ||
        b === f ||
        void 0 === b.el ||
        ui.hasClass(b.el, "over") ||
        ui.addClass(b.el, "over");
    };
    b.prototype.out = function (b) {
      b.target === this._v.body &&
        (this.xOver(this._name),
        (this._name = null),
        this.xOver(this._per),
        (this._per = null),
        this.xOver(this._day),
        (this._day = null));
    };
    b.prototype.xOver = function (b) {
      b && void 0 !== b.el && ui.deleteClass(b.el, "over");
    };
    return b;
  })();
  f.cursorPosition = l;
})(v || (v = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      var d = this;
      this.isSel = !1;
      this.sEl = null;
      this._v = b;
      this.vcM = new f.vcM(b);
      new f.cursorPosition(b);
      var h = b.body;
      ui.tap(h, function (b) {
        return d.onBodyTap(b);
      });
      ui.on(h, ui.getTouchMove(), function (b) {
        return d.onScrTapMove(b);
      });
      ui.tapEnd(h, function (b) {
        return d.onBodyEnd(b);
      });
      ui.tapEnd(b.mesh, function (b) {
        return d.onBodyEnd(b);
      });
      ui.on(h, "contextmenu", function (d) {
        b.isPublish() || ui.stopDefaultPropagation(d);
      });
    }
    g.prototype.setMeshElements = function (b, d) {
      var f = b.output;
      b = b.mesh.children;
      f.sideBack.el = b[d.sideBackIndex];
      f.headerBoldLine.el = b[d.headerBoldLineIndex];
      f.sideBoldLine.el = b[d.sideBoldLineIndex];
    };
    g.prototype.setHeaderElements = function (b, d) {
      var f = this,
        g = b.output;
      b = b.header.children;
      for (
        var p = d.dayIndex,
          n = g.dayPanels,
          l = n.length,
          u = d.periodIndex,
          t = g.periodPanels,
          x = t.length,
          y = d.verticalsIndex,
          z = g.verticals,
          A = z.length,
          B = 0;
        B < A;
        B++
      )
        z[B].el = b[y + B];
      for (B = 0; B < l; B++)
        ((y = n[B].el = b[p + B]),
          ui.tap(
            y,
            function (b) {
              return f.dayTap(b);
            },
            !0,
          ),
          ui.disableContextMenu([y, y.firstChild]),
          ui.tapEnd(y, function (b) {
            return f.onBodyEnd(b);
          }),
          ui.on(y, "mouseover", function (b) {
            return f.dayOver(b);
          }),
          ui.on(y, "contextmenu", function (b) {
            return f.dayTap(b);
          }));
      for (B = 0; B < x; B++)
        ((p = t[B].el = b[u + B]),
          ui.tap(p, function (b) {
            return f.onPeriodTap(b);
          }),
          ui.disableContextMenu([p, p.firstChild]),
          ui.tapEnd(p, function (b) {
            return f.onBodyEnd(b);
          }),
          ui.on(p, "mouseover", function (b) {
            return f.onPeriodOver(b);
          }),
          ui.on(p, "contextmenu", function (b) {
            return f.onPeriodTap(b);
          }));
      g.headerSplitter.el = b[d.headerSplitterIndex];
      u = this.hsDrg = new ui.drag(g.headerSplitter.el);
      u.setTop = u.setLeft = c.no;
      u.start.add(function (b, d) {
        return f.splt1(b);
      });
      u.move.add(function (b, d) {
        return f.spltChg(b);
      });
      u.end.add(function (b, d) {
        return f.spltN(b);
      });
      ui.tap((g.rightCorner.el = b[d.rightCornerIndex]), function (b) {
        return f.onRightCornerTap(b);
      });
      ui.tapEnd(g.rightCorner.el, function (b) {
        return f.onBodyEnd(b);
      });
      g.outsideBack.el = b[d.outsideBackIndex];
    };
    g.prototype.setNamesAndHorizontalLines = function (b, d) {
      var f = this,
        g = b.output.labelPanels,
        p = g.length,
        l = b.side.children,
        q = -1,
        u = 0;
      for (b = b.output.horizontalLines; u < b.length; u++)
        b[u].el = l[d.horizontalsIndex + ++q];
      for (q = 0; q < p; q++)
        ((u = g[q].el = l[d.labelIndex + q]),
          ui.tap(u, function (b) {
            return f.onNameTap(b);
          }),
          ui.tapEnd(u, function (b) {
            return f.onBodyEnd(b);
          }),
          ui.disableContextMenu([u, u.firstChild]),
          ui.on(u, "mouseover", function (b) {
            return f.nameOver(b);
          }));
    };
    g.prototype.setSplitterAndOutside = function (b, d, f) {
      var h = this,
        g = b.output;
      g.outside.el = d[f.outsideIndex];
      var l = (g.splitter.el = d[f.splitterIndex]);
      d = this.sDrg = new ui.drag(l);
      d.setTop = d.setLeft = c.no;
      d.start.add(function (b, d) {
        return h.splt1(b);
      });
      d.move.add(function (b, d) {
        return h.spltChg(b);
      });
      d.end.add(function (b, d) {
        return h.spltN(b);
      });
      var q = this.hsDrg.el;
      d = function (b, d) {
        return ui.toggleClasses([l, q], "over", d);
      };
      ui.over(l, d);
      ui.over(q, d);
      ui.setHeight(q, b.size.getHeaderHeight());
    };
    g.prototype.dayOver = function (b) {
      return this.tool().no() || !this.tool().isOn
        ? !0
        : this.onDayIndexTap(
            b,
            this.getCellIndex(b, this._v.draw.dayIndex),
            !1,
          );
    };
    g.prototype.dayTap = function (b) {
      if (!this._v.isPrintOrPublish()) {
        var d = this.getCellIndex(b, this._v.draw.dayIndex);
        if (ui.isRightClick(b))
          (this.onMeshMR(b),
            this._v.g.ctx.fire(b, {
              view: this._v,
              object: this.md().days[d],
              isDay: !0,
            }));
        else if (this.onDayIndexTap(b, d, !0)) this._v.onDayTap(b, d);
      }
    };
    g.prototype.onDayIndexTap = function (b, d, h) {
      var g = r.getColumnsPerDayCount(this._v.data.periodsCount, this._v.is1());
      d *= g;
      g = d + g - 1;
      if (this.tool().isPin())
        return (
          (b = this.vcM.pinCols(d, g)),
          void 0 !== b && this.setPinMode(b),
          !1
        );
      if (this.tool().isSponge())
        return ((this.tool().isClearing = !0), this.vcM.xCols(d, g), !1);
      if (this.tool().isMark()) {
        var p = g - d + 1;
        h &&
          this.marker1(
            b,
            f.markerSource.column,
            this.md().rowsCount * p,
            arr.range(d, g),
          );
        this.vcM.markColumns(d, g);
        return !1;
      }
      return this.isMulti(b)
        ? (this._v.g.clk(
            b,
            f.scheduledColumnRange(this._v.vcs, d, g),
            !1,
            this._v,
          ),
          !1)
        : !0;
    };
    g.prototype.onPeriodOver = function (b) {
      return this.tool().no() || !this.tool().isOn
        ? !0
        : this.onColumnTap(
            b,
            this.getCellIndex(b, this._v.draw.periodIndex),
            !1,
          );
    };
    g.prototype.onPeriodTap = function (b) {
      if (this._v.isPrintOrPublish()) return !1;
      ui.stopDefaultPropagation(b);
      var d = this.getCellIndex(b, this._v.draw.periodIndex);
      if (ui.isRightClick(b))
        return (
          this._v.g.ctx.fire(b, {
            view: this._v,
            object: this._v.output.periodPanels[d],
            isPeriod: !0,
          }),
          this.onMeshMR(b),
          !1
        );
      if (!this.onColumnTap(b, d, !0)) return !1;
      this._v.onPeriodTap(b, r.getMasterPeriod(this.md().periods, d).position);
      return !0;
    };
    g.prototype.onColumnTap = function (b, d, h) {
      return this._v.isPrintOrPublish()
        ? !0
        : this.tool().isPin()
          ? ((b = this.vcM.pinCols(d, d)),
            void 0 !== b && this.setPinMode(b),
            !1)
          : this.tool().isSponge()
            ? (this.tool().setIsClearing(!0), this.vcM.xCols(d, d), !1)
            : this.tool().isMark()
              ? (h &&
                  this.marker1(b, f.markerSource.column, this.md().rowsCount, [
                    d,
                  ]),
                this.vcM.markColumns(d, d),
                !1)
              : this.isMulti(b)
                ? (this._v.g.clk(
                    b,
                    f.scheduledColumnRange(this._v.vcs, d, d),
                    !1,
                    this._v,
                  ),
                  !1)
                : !0;
    };
    g.prototype.isMulti = function (b) {
      return keys.ctrlOrAltOrShift(b) || 0 < this._v.g.tVcs.length;
    };
    g.prototype.nameOver = function (b) {
      if (!this.tool().no() && !this.checkMarkerView(b) && this.tool().isOn)
        this.onNameTap(b, !1);
    };
    g.prototype.onNameTap = function (b, d) {
      void 0 === d && (d = !0);
      if (this._v.isPrint()) return !1;
      ui.stopDefaultPropagation(b);
      var f = this.getCellIndex(b, this._v.draw.labelIndex);
      if (ui.isRightClick(b)) {
        if (this._v.isPublish()) return !1;
        this.onMeshMR(b);
        this._v.g.ctx.fire(b, {
          view: this._v,
          object: r.getEntities(this._v)[f],
          isEntity: !0,
        });
        return !1;
      }
      if (this.checkMarkerView(b)) return !1;
      this.nameIndexClick(b, f, d);
      return !0;
    };
    g.prototype.nameIndexClick = function (b, d, h) {
      var g = d + 1;
      return this.tool().no() && this.isMulti(b) && !this._v.isPublish()
        ? (this._v.g.clk(b, f.scheduledRowRange(this._v.vcs, d), !1, this._v),
          !1)
        : this.tool().no() || (keys.ctrl(b) && !this.tool().no())
          ? (this._v.is1()
              ? this._v.allowSwitchToMaster() && this.switchToMasterView()
              : this.switchToIndividualView(d),
            !1)
          : this.tool().isPin()
            ? ((b = this.vcM.pinRow(g)), void 0 !== b && this.setPinMode(b), !1)
            : this.tool().isSponge()
              ? (this.tool().setIsClearing(!0), this.vcM.xRow(g), !1)
              : this.tool().isMark()
                ? (h &&
                    this.marker1(
                      b,
                      f.markerSource.row,
                      r.getColumnsCount(
                        this.md().daysCount,
                        this.md().periodsCount,
                        this._v.is1(),
                      ),
                      [g],
                    ),
                  this.vcM.markRow(g),
                  !1)
                : !0;
    };
    g.prototype.checkMarkerView = function (b) {
      if (
        this.tool().isMark() &&
        !this.tool().isOn &&
        !keys.ctrlOrAltOrShift(b) &&
        !this._v.is1()
      ) {
        if (this.tool().isEraser()) return !1;
        var d = ui.target(b);
        if (
          (b = r.getEntities(this._v)[
            this.getCellIndex(b, this._v.draw.labelIndex)
          ])
        ) {
          var h = f.vPos.xVPot(this._v);
          this._v.g.onMarkSets(
            this._v,
            b,
            new ui.point(
              ui.getLeft(d) + h.x + ui.getComputedWidth(d),
              ui.getTop(d) +
                h.y +
                this._v.size.getHeaderHeight() +
                this._v.size.getAboveHeight() -
                ui.getBodyScrollTop() -
                this._v.body.scrollTop,
            ),
          );
          return !0;
        }
      }
      return !1;
    };
    g.prototype.switchToMasterView = function () {
      this._v.switcher.toView(this._v.viewType().view);
      this._v.log("Back to " + this._v.viewType().name() + " view");
    };
    g.prototype.switchToIndividualView = function (b) {
      var d = r.getEntities(this._v);
      0 > b ||
        b > d.length - 1 ||
        ((b = d[b]),
        (d = new r.viewType(this._v.viewType().view)),
        (d.ve = b),
        this._v.viewType().from(d),
        this._v.changeView(),
        this._v.log("Single: " + d.name()));
    };
    g.prototype.getCellIndex = function (b, d) {
      return num.toInt(ui.target(b).id) - d;
    };
    g.prototype.onVcDown = function (b, d) {
      var f = this._v,
        g = this.tool();
      f.g.onMenuX();
      if (g.isMark()) f.vEv.onBodyTap(b);
      else if (g.isPin()) {
        this.pin(d);
        if (ui.isOnlyTouchEvent(b)) f.onCursorMove(b);
        ui.stopDefaultPropagation(b);
      } else if (g.isSponge()) {
        g.setIsClearing(!0);
        if (ui.isOnlyTouchEvent(b)) f.onCursorMove(b);
        this.xVc(d);
        ui.stopDefaultPropagation(b);
      } else d.drag.onDown(b);
    };
    g.prototype.onBodyTap = function (b) {
      var d = this._v;
      d.g.onMenuX();
      d.switcher.hide();
      if (!d.isPrintOrPublish())
        if (ui.isRightClick(b)) this.onMeshMR(b);
        else
          this.tool().no() && !this.isScrClk(b)
            ? (keys.ctrlOrAltOrShift(b) || d.g.resetSelection(),
              ui.isTouch(b) ||
                ui.isIE11() ||
                ((this.selPot = this.getSelPot(d, b)),
                this.sEl ||
                  ((b = this.sEl = ui.getDiv("selRect")),
                  ui.setZIndex(b, 1e6),
                  ui.append(b, d.body),
                  ui.setLeftTop(b, this.selPot.x, this.selPot.y),
                  ui.setWidthHeight(b, 0, 0)),
                (this.isSel = !0)))
            : this.isScrClk(b) ||
              (this.tool().isMark() ? this.markerClick(b) : d.g.xTool(d),
              ui.stopDefaultPropagation(b));
    };
    g.prototype.isScrClk = function (b) {
      var d = f.vPos.xVPot(this._v);
      return (
        (ui.hasVerticalScroll(this._v.body) &&
          b.pageX - d.x - r.sideWidth >= this._v.body.clientWidth) ||
        (ui.hasHorizontalScroll(this._v.body) &&
          b.pageY -
            d.y -
            this._v.size.header.headerHeight -
            this._v.size.getAboveHeight() >=
            this._v.body.clientHeight)
      );
    };
    g.prototype.onScrTapMove = function (b) {
      if (this.isSel) {
        b = this.getSelPot(this._v, b);
        var d = this.selPot,
          f = b.x - d.x,
          g = b.y - d.y;
        ui.setLeftTop(this.sEl, 0 > f ? b.x : d.x, 0 > g ? b.y : d.y);
        ui.setWidthHeight(this.sEl, Math.abs(f), Math.abs(g));
      }
    };
    g.prototype.getSelPot = function (b, d) {
      return new f.vPos(b, f.vPos.vPot(ui.getTouchPoint(d), b), f.relTo.body)
        ._p;
    };
    g.prototype.onBodyEnd = function (b) {
      this._v.g.offTool(this._v, b);
      if (this.isSel) {
        this.isSel = !1;
        var d = this.sEl,
          f = ui.getWidth(d),
          g = ui.getHeight(d);
        ui.remove(this.sEl);
        this.sEl = null;
        if (0 !== f || 0 !== g) {
          f = 0;
          g = this._v.vcs;
          var p = g.length,
            l = [],
            q = ui.getPoint(d),
            u = ui.getPoint(d).mov(ui.getWidth(d), ui.getHeight(d));
          d = q.x < u.x ? [q.x, u.x] : [u.x, q.x];
          for (q = q.y < u.y ? [q.y, u.y] : [u.y, q.y]; f < p; f++) {
            u = g[f];
            var t = u.mc.x,
              x = u.mc.y;
            d[0] < t + u.mc.w &&
              d[1] > t &&
              q[0] < x + u.mc.h &&
              q[1] > x &&
              l.push(u);
          }
          0 < l.length && this._v.g.clk(b, l, !1, this._v);
        }
      }
    };
    g.prototype.onMeshMR = function (b) {
      ui.stopDefaultPropagation(b);
    };
    g.prototype.onVcOver = function (b) {
      this.tool().isSpongeClear()
        ? this.xVc(b)
        : this.tool().isPinActive() && this.pinVc(b, this.tool().isPinning());
      this._v.g.setOv(b.card());
    };
    g.prototype.markerClick = function (b) {
      var d = f.vPos.fromEvent(this._v, b);
      d.isOutRight() || d.isBelow()
        ? this._v.g.xTool(this._v)
        : (this.marker1(b, f.markerSource.cell, 1, [
            d.columnIndex,
            d.rowNumber,
          ]),
          this._v.g.onMarkerDraw(d));
    };
    g.prototype.marker1 = function (b, d, h, g) {
      var k = this;
      this._v.g.affVMarks = [];
      var l = this.tool();
      l.setIsDrawing(!0);
      if (l.markType !== f.markType.allowed) {
        var q = this._v.is1();
        b = this._v.marks.filter(function (b) {
          return d === f.markerSource.column
            ? arr.has(g, b.mMark.colI)
            : d === f.markerSource.row
              ? (q
                  ? r.getPeriodPosition(k._v, b.mMark.period)
                  : r.getRowPosition(k._v, b.mMark.ve)) === g[0]
              : b.mMark.colI === g[0] &&
                (q
                  ? r.getPeriodPosition(k._v, b.mMark.period)
                  : r.getRowPosition(k._v, b.mMark.ve)) === g[1];
        });
        h =
          b.length === h &&
          !b.some(function (b) {
            return b.mMark.markTy !== l.markType;
          });
        l.mode = h ? f.markMode.clearing : f.markMode.marking;
      }
    };
    g.prototype.pin = function (b) {
      this.pinVc(b, !b.card().pinned);
    };
    g.prototype.pinVc = function (b, d) {
      this.setPinMode(d);
      this.vcM.pinVc(b, d);
    };
    g.prototype.setPinMode = function (b) {
      this.tool().no() || this.tool().setMode(b ? f.pinMode.p : f.pinMode.u);
    };
    g.prototype.xVc = function (b) {
      this.vcM.xVc(b);
    };
    g.prototype.onRightCornerTap = function (b) {
      ui.stopDefaultPropagation(b);
      if (this.tool().isPin()) this.vcM.pinAll();
      else if (this.tool().isSponge()) this.vcM.xAll();
      else if (this.tool().isMark()) {
        var d = r.getColumnsCount(
          this.md().daysCount,
          this.md().periodsCount,
          this._v.is1(),
        );
        this.marker1(
          b,
          f.markerSource.column,
          d * this.md().rowsCount,
          arr.range(0, d - 1),
        );
        this.vcM.markAll();
      } else this._v.onRightCornerTap(b);
    };
    g.prototype.splt1 = function (b) {
      this._v.g.onMenuX();
      ui.addClass((b === this.hsDrg ? this.sDrg : this.hsDrg).el, "drag");
    };
    g.prototype.spltChg = function (b) {
      var d = b === this.hsDrg ? this.sDrg : this.hsDrg,
        f = b.left + b.dx;
      this._v.size.checkSplitterLeft(f) &&
        ((b.left = d.left = f), this.resizeAfterSplitterDrag(f));
    };
    g.prototype.spltN = function (b) {
      b = this._v;
      ui.deleteClasses([this.hsDrg.el, this.sDrg.el], "drag");
      b.status = r.viewStatus.default;
      this._v.g.updSpl(this._v);
    };
    g.prototype.resizeAfterSplitterDrag = function (b) {
      var d = this._v;
      d.size.setSplitterLeft(b);
      ui.setLeft(this._v.output.splitter.el, b);
      ui.setLeft(this._v.output.headerSplitter.el, b);
      c.timeout(function () {
        var b = new r.upd(r.updTy.r);
        d.set(b);
        d.whxy(b);
        d.syncWidthTimeout(!0);
      }, 0);
    };
    g.prototype.tool = function () {
      return this._v.g.tool();
    };
    g.prototype.vIn = function () {
      return this._v.vIn;
    };
    g.prototype.md = function () {
      return this._v.data;
    };
    return g;
  })();
  f.vEv = l;
})(v || (v = {}));
(function (f) {
  var l = (function (g) {
    function b(b) {
      var d = g.call(this, b) || this;
      d.totalPasses = 0;
      d.finishedPasses = 0;
      d.newRenderRequest = !1;
      d.isSpotError = !0;
      d.spots = [];
      d.spotViewId = "";
      d._v = b;
      d.passDone = d.onPassDone;
      return d;
    }
    __extends(b, g);
    b.prototype.go = function (b) {
      void 0 === b && (b = !1);
      this._v.isWorking()
        ? (this.newRenderRequest = !0)
        : ((this.newRenderRequest = !1),
          b ||
            this._v.viewType().is1() ||
            (this._v.viewType().isMasterRendered = !0),
          this._v.switcher.toggleRender(!0),
          (this.view.style = r.getStyle(this.data._t, this._v)),
          (this._v.status = r.viewStatus.render),
          this.drawPasses());
    };
    b.prototype.drawPasses = function () {
      var b = this;
      this.finishedPasses = 0;
      g.prototype.go.call(this);
      0 === this.data.rowsCount &&
        ((this._v.body.innerHTML = this.splitterOutsideHtml),
        this.onDrawDone());
      c.timeout(function () {
        b.totalPasses = b.getTotalPasses();
        b.cardRender.init();
        b._v.isMarkerPicked = b._v.g.tool().isMark();
        1 === b.totalPasses
          ? b.pass(r.getPassInput(1, b.data.rowsCount))
          : b.drawNewPass(1, b.getEndRow(1));
      }, 1);
    };
    b.prototype.getTotalPasses = function () {
      return this._v.vIn.is1() || this._v.isPrint() || 8 > this.data.rowsCount
        ? 1
        : 2;
    };
    b.prototype.getEndRow = function (b) {
      return this._v.is1()
        ? this.data.rowsCount
        : Math.min(this.data.rowsCount, b + 4);
    };
    b.prototype.setMeshHeaderAndSideHtml = function (b, f) {
      g.prototype.setMeshHeaderAndSideHtml.call(this, b, f);
      this._v.body.innerHTML = "";
      this._v.mesh.innerHTML = this.meshHtml;
      this._v.header.innerHTML = this.headerHtml;
      this._v.side.innerHTML = this.sideHtml;
    };
    b.prototype.onPassDone = function (b) {
      var d = this;
      this.finishedPasses++;
      if (!this.checkNewDrawReq()) {
        var f = r.html(b.metaCards);
        this._v.body.innerHTML =
          1 === this.finishedPasses
            ? this.splitterOutsideHtml + f
            : this._v.body.innerHTML + f;
        if (this.finishedPasses >= this.totalPasses) this.onDrawDone();
        else {
          var g = b.passInput.endRow + 1,
            l = this.data.rowsCount;
          c.timeout(function () {
            return d.drawNewPass(g, l);
          }, 1);
        }
      }
    };
    b.prototype.drawNewPass = function (b, f) {
      this.pass(r.getPassInput(b, f));
    };
    b.prototype.showMarks = function () {
      return (
        (this._v.isPrintOrPublish() ? this._v.vIn.forceMarks : !0) ||
        this._v.g.isMarker()
      );
    };
    b.prototype.onDrawDone = function () {
      var b = this;
      this._v.vcs = [];
      this._v.marks = [];
      this.setElements();
      this._v.status = r.viewStatus.default;
      if (this._v.isMain()) {
        var f = this._v.output.headerSplitter,
          g = this._v.output.outsideBack;
        f.isOn = g.isOn = !0;
        f.whxy(this.size, void 0);
        g.whxy(this.size, void 0);
      }
      this._v.onDrawDone();
      this.showMarks() &&
        c.timeout(function () {
          return b.drawAllMarks();
        }, 1);
      if (this._v.hasResize) this._v.onResize();
      this._v.switcher.toggleRender(!1);
    };
    b.prototype.setElements = function () {
      var b = this._v,
        f = b.body.children;
      this.setCardElements(f);
      b.vEv.setMeshElements(b, this);
      b.vEv.setHeaderElements(b, this);
      b.vEv.setNamesAndHorizontalLines(b, this);
      b.vEv.setSplitterAndOutside(b, f, this);
    };
    b.prototype.setCardElements = function (b) {
      for (
        var d = this._v,
          g = this.output.cards,
          p = g.length,
          l = d.vcs,
          q = this.cardIndex,
          u = 0;
        u < p;
        u++
      ) {
        var t = g[u],
          x = b[q + u],
          y = new f.vc(x, t, d);
        t.el = x;
        l.push((t.o = y));
      }
    };
    b.prototype.drawAllMarks = function () {
      g.prototype.drawAllMMarks.call(this);
      this.drawMarks(this.output.marks);
    };
    b.prototype.drawMarks = function (b) {
      for (var d = ui.getFragment(), g = 0; g < b.length; g++) {
        var p = new f.vMark(b[g], this._v);
        d.appendChild(p.el);
        this._v.marks.push(p);
      }
      ui.append(d, this._v.body);
    };
    b.prototype.drawVMark = function (b) {
      this._v.marks.push(b);
      ui.append(b.el, this._v.body);
    };
    b.prototype.xVMark = function (b, f) {
      var d = this.output.marks.find(function (d) {
        return d.ve === b && d.day === f.getDay() && d.period === f.getPeriod();
      });
      d && this.xVMarks([d]);
    };
    b.prototype.xVMarksForE = function (b) {
      for (var d = [], f = this.output.marks, g = f.length, l = 0; l < g; l++) {
        var q = f[l];
        q.ve === b && d.push(q);
      }
      this.xVMarks(d);
    };
    b.prototype.xVMarks = function (b) {
      for (
        var d = b.length,
          f = function (d) {
            var f = b[d];
            if (!f) return "continue";
            d = g._v.marks.find(function (b) {
              return b.mMark === f;
            });
            if (!d) return "continue";
            arr.remove(g.output.marks, f);
            arr.remove(g._v.marks, d);
            ui.remove(d.el);
          },
          g = this,
          l = 0;
        l < d;
        l++
      )
        f(l);
    };
    b.prototype.checkNewDrawReq = function () {
      return this.newRenderRequest
        ? ((this._v.status = r.viewStatus.default), this.go(), !0)
        : !1;
    };
    b.prototype.deleteSpots = function (b) {
      b && (this.spots = []);
      g.prototype.resetSpots.call(this);
      this._v.spots.forEach(function (b) {
        return ui.remove(b.el);
      });
      this._v.spots = [];
    };
    b.prototype.drawSpots = function (b, h, k) {
      this.isSpotError = h;
      this.spots = b;
      this.spotViewId = k;
      var d = this._v;
      if (k !== d.viewType().id || d.is1()) return !1;
      g.prototype.renderSpots.call(this, b);
      b = this.output.spots;
      k = b.length;
      for (var l = 0; l < k; l++) {
        var q = new f.spot(
          d,
          ui.getDiv("validMark " + (h ? "error" : "warning")),
          b[l],
        );
        this._v.spots.push(q);
      }
      ui.appends(
        this._v.spots.map(function (b) {
          return b.el;
        }),
        this._v.body,
      );
      return !0;
    };
    b.prototype.whxy = function (b) {
      for (var d = this.size, g = 0, l = this.output.all; g < l.length; g++) {
        var n = l[g];
        n.upd(d, b);
        n.el && (n.isVc() ? n.o.updEl(b) : f.whxy(n));
      }
      this._v.marks.concat(this._v.spots).forEach(function (d) {
        return d.upd(b);
      });
    };
    return b;
  })(r.render);
  f.vDraw = l;
})(v || (v = {}));
(function (f) {
  var l = (function (g) {
    function b(b, f, k) {
      k = g.call(this, k, b, f) || this;
      k.moveDone = null;
      k.srtI = 0;
      k.el = b;
      k.mc = f;
      k.go();
      return k;
    }
    __extends(b, g);
    b.prototype.go = function () {
      var b = this;
      if (!this.v.isPublish()) {
        var h = new ui.drag(this.el, this),
          g = (this.drag = new f.vcDrag(this));
        h.canDrag = function (d, f) {
          return g.canDrag(g.selVcs(), b, d);
        };
        h.start.add(function (d, f) {
          return b.v.vEv.onVcDown(f, b);
        });
        h.move.add(function (d, f) {
          return b.drag.onMove(d, f, b);
        });
        h.end.add(function (d, f) {
          return b.drag.onUp(d, f);
        });
      }
    };
    b.prototype.colI = function () {
      return this.mc._colI;
    };
    b.prototype.vLen = function () {
      return this.mc.getVLen();
    };
    b.prototype.card = function () {
      return this.mc._c;
    };
    b.prototype.activity = function () {
      return this.card().parent;
    };
    b.prototype.updEl = function (b) {
      var d = this.mc,
        f = this.el,
        g = d.getSty();
      if (d._sty !== g || b.ty === r.updTy.drg) f.style.cssText = d._sty = g;
      this.updCl();
      if (!(b.go() || (b.ty === r.updTy.r && this.v.input.dock)))
        if (d.txtProp.upd) ((f.innerHTML = d.inner()), (d.txtProp.upd = !1));
        else {
          b = ui.children(f);
          g = b.length;
          d = d.allTxts;
          var l = d.length;
          if (g > l) for (var q = l; q < g; q++) b[q].remove();
          for (q = 0; q < l; q++) {
            var u = d[q];
            if (q >= g) {
              var t = ui.getDiv(u.cl);
              ui.append(t, f);
              t.style.cssText = u.sty();
            } else t = b[q];
            t.style.cssText = d[q].sty();
            u.isCustomText && ui.setHtml(t, u.text);
          }
        }
    };
    b.prototype.updCl = function () {
      var b = this.mc,
        f = b.getCl();
      b.cl !== f && (this.el.className = b.cl = f);
    };
    b.prototype.updAll = function (b) {
      this.all().forEach(function (d) {
        return d.upd(b);
      });
    };
    b.prototype.upd = function (b) {
      var d = this.v,
        f = this.mc,
        g = d.size,
        l = d.vIn.rotate && !b.isVz() && !b.isR(),
        q = f.isOut(),
        u = [],
        t = [f],
        x = [];
      l &&
        q &&
        (t.forEach(function (b) {
          return b.rotAll(new r.ordAng(f, 0));
        }),
        u.push.apply(u, t),
        d.layer.del(t),
        x.push.apply(x, d.layer.at(f)));
      f.upd(g, b);
      this.updEl(b);
      if (l && !q) {
        x.push.apply(x, t);
        (f.isPosChg() || b.ty === r.updTy.drg) &&
          x.push.apply(
            x,
            __spreadArray(
              __spreadArray(
                __spreadArray([], d.layer.del(t), !1),
                d.layer.prevAt(f),
                !1,
              ),
              d.layer.add(t),
              !1,
            ),
          );
        x = arr.unique(x);
        x.forEach(function (b) {
          return (b.ordAng = null);
        });
        u.push.apply(u, d.layer.ord(x));
        var y = [];
        u.forEach(function (b) {
          y.push.apply(
            y,
            arr.take(
              d.vcs.filter(function (d) {
                return d.mc === b;
              }),
              1,
            ),
          );
        });
        y.forEach(function (d) {
          d.rotAll(b, d.mc.ordAng);
        });
      }
    };
    b.prototype.rotAll = function (b, f, g) {
      void 0 === g && (g = !0);
      this.all().forEach(function (d) {
        return d.rot(b, f, g);
      });
    };
    b.prototype.rot = function (b, f, g) {
      void 0 === g && (g = !0);
      var d = f.ang,
        h = this.mc;
      (b.go() && 0 === d) ||
        (h.ordAng || (h.ordAng = new r.ordAng(h, 0)),
        (h.ordAng.ang = d),
        ui.rotate(this.el, d));
      g && this.setZI(f);
    };
    b.prototype.setZI = function (b) {
      b = b.ordI();
      b = this.isSel() || 1 !== b ? this.v.zI.rotCard + b : this.v.zI.card;
      (this.mc.isOut() && b < this.mc.zI) || (this.mc.mcZi(b), this.updZI());
    };
    b.prototype.isSel = function () {
      return arr.has(this.v.g.vcs, this);
    };
    b.prototype.updZI = function () {
      var b = this.mc.zI;
      this.all().forEach(function (d) {
        return ui.setZIndex(d.el, b);
      });
    };
    b.prototype.onMarker = function (b) {
      ui.toggleClass(this.el, "marker", b);
    };
    b.prototype.all = function () {
      if (!this._all) {
        this._all = [this];
        for (var b = this.mc._c, f = 0, g = this.v.vcs; f < g.length; f++) {
          var l = g[f];
          l.mc._c === b && l !== this && this._all.push(l);
        }
      }
      return this._all;
    };
    b.prototype.rel = function () {
      this._rel ||
        ((this._rel = this.all().slice()), arr.remove(this._rel, this));
      return this._rel;
    };
    b.prototype.di = function () {
      return this.v.size;
    };
    b.prototype.cw = function () {
      return ui.getComputedWidth(this.el);
    };
    b.prototype.ch = function () {
      return ui.getComputedHeight(this.el);
    };
    b.prototype.inverse = function (b) {
      var d = this.mc.allTxts,
        f = this.mc._grad,
        g = {
          _1: f._1,
          n: f.n,
          stops: f.stops,
        },
        l = d.length,
        q = this.el,
        u = ui.children(q),
        t = 0;
      if (u.length === l)
        for (; t < l; t++) {
          var x = d[t];
          u[t].className = b
            ? -1 === x.cl.indexOf("bl")
              ? x.cl.replace("wh", "bl")
              : x.cl.replace("bl", "wh")
            : x.cl;
        }
      if (b)
        for (b = f.stops.length, g.stops = [], t = 0; t < b; t++)
          ((d = f.stops[t]),
            g.stops.push([new r.color(d[0], !0).inverse().html(), d[1]]));
      q.style.backgroundColor = g.stops[0][0];
      f = this.card().pinned ? "" : r.bgImgGrad(g);
      "" !== f && (q.style.backgroundImage = f);
    };
    b.prototype.rowPos = function () {
      return this.mc._rowI + 1;
    };
    b.prototype.isMoving = function () {
      return !1;
    };
    return b;
  })(f.vEl);
  f.vc = l;
  l = (function (f) {
    function b(b, g, k) {
      var d = f.call(this, b, g, k) || this;
      d.el = b;
      d.mc = g;
      d._v = k;
      g.isDsg = !0;
      return d;
    }
    __extends(b, f);
    return b;
  })(l);
  f.dsgVc = l;
})(v || (v = {}));
(function (f) {
  var l;
  (function (b) {
    b[(b.a = 0)] = "a";
    b[(b.u = 1)] = "u";
    b[(b.r = 2)] = "r";
  })((l = f.adorState || (f.adorState = {})));
  var g = (function () {
    function d(b) {
      var d = this;
      this.selN = 1;
      this.is1Mov = this.isDrag = this.overStop = !1;
      this.customPer = void 0;
      this.vc = b;
      ui.on(b.el, "mouseover", function (b) {
        return d.onMouseOver(b);
      });
      ui.on(b.el, "contextmenu", function (b) {
        return d.v().g.onVcMR(b, d.vc);
      });
    }
    d.prototype.onMouseOver = function (b) {
      ui.stopDefaultPropagation(b);
      if (this.v().isLastClearedOrdered)
        ((this.overStop = !0), (this.v().isLastClearedOrdered = !1));
      else this.v().vEv.onVcOver(this.vc);
    };
    d.prototype.canDrag = function (b, d, g) {
      var h = this.v();
      return d
        ? !d.card().pinned &&
            !h.g.isDrg &&
            h.g.tool().no() &&
            !keys.ctrlOrAltOrShift(g) &&
            h.isDragOn &&
            h.isMakerLoaded &&
            !h.isPrintOrPublish() &&
            !(this.vc instanceof f.dsgVc) &&
            !d.mc.clpPin()
        : 0 < f.pin(b, !1).length && !h.g.isDrg;
    };
    d.prototype.onDown = function (b) {
      var d = this;
      ui.stopDefaultPropagation(b);
      var g = this.v(),
        h = this.vc,
        l = h.mc;
      g.isPublish() &&
        g.input.rotate &&
        (g.zI.drg(), l.mcZi(g.zI.dragC), h.updZI());
      if (!(g.isPrintOrPublish() || h instanceof f.dsgVc) && g.isMakerLoaded) {
        var u = g.g.clk(b, [h], !0, this.v()),
          t = ui.isOnlyTouchEvent(b),
          x = g.g.tVcs.length,
          y = this.selVcs();
        g.isDragOn && t && 1 === x && -1 !== u
          ? ((this.tchPot = ui.getPoint(this.el())),
            (this.ctxTo = c.timeout(function () {
              return d.chkTchCtx(b);
            }, 1e3)))
          : 1 < x && g.g.vcs[0].drag.xCtxTo();
        var z = 0;
        y.forEach(function (b) {
          return (z += b.all().length);
        });
        this.selN = z;
        if (this.canDrag(y, null, b) && -1 !== u) {
          g.g.isDrg = this.isDrag = this.is1Mov = !0;
          if (g.input.rotate) {
            u = g.layer.del(l.all);
            u.forEach(function (b) {
              b.ordAng = null;
            });
            var A = [];
            g.layer.ord(u).forEach(function (b) {
              A.push.apply(
                A,
                arr.take(
                  g.vcs.filter(function (d) {
                    return d.mc === b;
                  }),
                  1,
                ),
              );
            }, this);
            A.forEach(function (b) {
              b.rotAll(new r.upd(r.updTy.drg), b.mc.ordAng);
            });
            h.rotAll(new r.upd(r.updTy.drg), new r.ordAng(l, 0), !1);
          }
          this.drgCl(0, y);
        }
        this.v().zI.drg(z);
        for (h = 0; h < y.length; h++)
          for (l = 0, u = y[h].all(); l < u.length; l++)
            ((t = u[l]), t.v.zI.drg(), t.mc.mcZi(t.v.zI.dragC), t.updZI());
      }
    };
    d.prototype.selVcs = function () {
      for (
        var b = [],
          d = this.v(),
          f = this.card(),
          g = function (g) {
            if (g.v === d) {
              var h = g.card();
              if (h === f || h.pinned) return "continue";
              b.find(function (b) {
                return b.card() === h;
              }) ||
                g.mc.clpPin() ||
                b.push(g);
            }
          },
          l = 0,
          u = d.g.vcs;
        l < u.length;
        l++
      )
        g(u[l]);
      arr.has(d.g.vcs, this.vc) && b.push(this.vc);
      return b;
    };
    d.prototype.drgCl = function (b, d) {
      for (var f = this.vc, g = 0; g < d.length; g++) {
        var h = d[g];
        if (h !== f) {
          var k = 0;
          for (h = h.all(); k < h.length; k++) {
            var l = h[k].el;
            0 === b
              ? ui.addClass(l, "drag")
              : 2 === b && ui.deleteClass(l, "drag");
          }
        }
      }
    };
    d.prototype.xCtxTo = function () {
      clearTimeout(this.ctxTo);
    };
    d.prototype.chkTchCtx = function (b) {
      this.isDrag &&
        1 === this.v().g.tVcs.length &&
        (this.is1Mov ||
          !this.tchPot ||
          this.isNear(ui.getPoint(this.el()), this.tchPot)) &&
        (this.vc.drag.onUp(this.vc.drg, b), this.v().g.onVcMR(b, this.vc));
    };
    d.prototype.isNear = function (b, d) {
      var f = Math.abs(b.y - d.y);
      return 6 >= Math.abs(b.x - d.x) && 6 >= f;
    };
    d.prototype.onMove = function (b, d, g) {
      if (!this.isDrag)
        return (
          this.overStop && ((this.overStop = !1), this.onMouseOver(d)),
          !0
        );
      this.tchPot = ui.getTouchPoint(d);
      var h = this.inPot(d);
      d = this.selVcs();
      var k = [];
      if (this.is1Mov) {
        this.is1Mov = !1;
        for (var p = this.selN, t = 0; t < d.length; t++) {
          for (
            var x = d[t], y = x.mc, z = x.all(), A = y.x, B = y.w, C = 0, G = z;
            C < G.length;
            C++
          )
            ((z = G[C]),
              z !== g &&
                z !== x &&
                (this.is1()
                  ? (ui.setLeftTop(z.el, (z.mc.x = A + B), (z.mc.y = x.mc.y)),
                    (B += x.mc.w))
                  : ui.setLeft(z.el, (z.mc.x = A))),
              z.drag.addAdor(z.mc.zI - p));
          if ((z = y.clp) && y.isOut() && !arr.has(k, z))
            for (
              k.push(z), z = 0, y = f.toVcs(this.v(), y.clps);
              z < y.length;
              z++
            )
              ((A = y[z]),
                this.is1() ||
                  A === g ||
                  (ui.setLeft(A.el, (A.mc.x = g.mc.x)),
                  f.removeUnscheduledCard(A.v, A.mc)));
          this.v().g.xSelAVc(x);
        }
        g.mc.isOut() && f.removeUnscheduledCard(g.v, g.mc);
      }
      this.moveTo(b, h);
      b = !1;
      for (h = 0; h < d.length; h++)
        for (x = d[h], z = x.all(), x = 0, k = z; x < k.length; x++)
          ((z = k[x]), z.drag.updateAdorner() && z === g && (b = !0));
      if (b) this.v().onAdornerChange(this.ador);
      for (g = 0; g < d.length; g++)
        ((x = d[g]),
          x.all().forEach(function (b) {
            return (b.drag.ador.state = l.u);
          }));
      return !1;
    };
    d.prototype.moveTo = function (b, d) {
      d = b.dx;
      b = b.dy;
      var f = this.v().viewType().isRoom(),
        g = this.selVcs();
      f && ui.setTop(this.vc.el, (this.vc.mc.y += b));
      for (var h = 0; h < g.length; h++) {
        var k = g[h].all(),
          l = Math.min.apply(
            Math,
            k.map(function (b) {
              return b.mc.x;
            }),
          ),
          x = Math.min.apply(
            Math,
            k.map(function (b) {
              return b.mc.y;
            }),
          );
        l += d;
        x += b;
        var y = l < -this.di().side.width || l >= this.di().body.scrollWidth;
        l = x <= -this.di().getHeaderHeight();
        if (!y) {
          y = 0;
          for (var z = k; y < z.length; y++) {
            x = z[y];
            var A = (x.mc.x += d);
            ui.setLeft(x.el, A);
          }
        }
        if (!l && !f)
          for (l = 0; l < k.length; l++)
            ((x = k[l]), (y = x.mc.y += b), ui.setTop(x.el, y));
      }
    };
    d.prototype.onUp = function (b, d) {
      d = this.v();
      d.g.xTch([this.vc]);
      if (this.isDrag) {
        d.g.isDrg = this.isDrag = !1;
        b = this.selVcs();
        d.zI.next();
        this.afterDrag(this.el());
        for (d = 0; d < b.length; d++)
          b[d].all().forEach(function (b) {
            return b.drag.delAdor(!0);
          });
        this.drgCl(2, b);
      }
    };
    d.prototype.afterDrag = function (b) {
      b = this.v();
      for (
        var d = new r.upd(r.updTy.drg), g = [], h = 0, l = this.selVcs();
        h < l.length;
        h++
      ) {
        var u = l[h],
          t = u.drag;
        b.g.bringToFront(u);
        t.newPos = new f.vPos(b, t.getDropPoint(), f.relTo.ok);
        t.newPos.isOutRight() && t.mc().isOut()
          ? ((d.outAdded = !0), u.updAll(d))
          : g.push(u);
      }
      b.g.drop.fire(g, b);
    };
    d.prototype.getDropPoint = function (b) {
      void 0 === b && (b = !0);
      var d = ui.getPoint(this.vc.el),
        f = b ? this.getHalfCardWidth(d) : 0;
      d.mov(r.sideWidth + f, this.v().size.getHeaderHeight());
      b = b ? this.getHalfCellHeight(d) : 0;
      d.y += b;
      return d;
    };
    d.prototype.getHalfCardWidth = function (b) {
      var d = this.vc.mc._colI;
      return new f.vPos(this.vc.v, b, f.relTo.ok).isOutRight() ||
        0 > d ||
        d > this.di().columnWidths.length - 1
        ? this.v().size.averageColumnWidth
        : this.di().columnWidths[d] / (2 * this.mc().widthDivider());
    };
    d.prototype.getHalfCellHeight = function (b) {
      var d = this.vc.mc._rowI;
      return (
        (new f.vPos(this.vc.v, b, f.relTo.ok).isOutRight() ||
        0 > d ||
        d > this.di().rowHeights.length - 1
          ? this.v().size.averageRowHeight
          : this.di().rowHeights[d]) / 2
      );
    };
    d.prototype.addAdor = function (d) {
      this.ador = new b(this.vc);
      this.adorEl = this.ador.el();
      ui.setZIndex(this.adorEl, d);
      ui.append(this.adorEl, this.v().body);
    };
    d.prototype.delAdor = function (b) {
      if (
        this.adorEl &&
        (ui.remove(this.adorEl),
        this.ador && ((this.ador.state = l.r), (this.prevAdorI = null), b))
      )
        this.v().onAdornerChange(this.ador);
    };
    d.prototype.updateAdorner = function () {
      var b = this.getDropPoint(),
        d = this.getDropPoint(!1),
        g = this.di();
      b = new f.vPos(this.v(), b, f.relTo.ok);
      var l = new f.vPos(this.v(), d, f.relTo.ok);
      d = this.mc();
      var q = b.isOut(),
        u = b.columnIndex,
        t = b.getPeriod(),
        x = b.getDay();
      l = this.is1() ? l.rowOff : l.colOff;
      var y = (this.customPer = (
          this.is1() ? b.rowNumber !== l.index + 1 : b.columnIndex !== l.index
        )
          ? void 0
          : r.dragCustomPer(this.vc.v, this.card(), x, t, l)),
        z = 0,
        A = d._rowI;
      l = ui.getComputedHeight(this.el()) - 6 + 2 * d.bw;
      if (q) {
        this.is1()
          ? ((z = this.v().outPanel.getOutAdornerIndividualColumnIndex(
              this.mc(),
            )),
            (x = z[0]),
            (A = z[1]),
            (z =
              (g.averageRowHeight + (g.hasOutLines() ? r.borderWidth : 0)) * A))
          : (x = this.v().outPanel.getOutAdornerColumnIndex(this.mc()));
        var B = g.content.width + g.splitterWidth + g.averageColumnWidth * x;
        x = this.vc.cw() - 6;
      } else {
        var C = d.mv.data.periodsCount;
        B = y ? r.getColumnIndex(d.mv, x, y.startPeriod, C, d.mv.is1()) : u;
        var G = r.x1(g, y, B);
        B = g.columnLefts[B] + G + (d instanceof r.clMc ? d.getGx(g) : 0);
        x =
          !this.is1() && y
            ? r.getCustomW(
                B,
                g,
                r.getColumnIndex(d.mv, x, y.endPeriod, C, d.mv.is1()),
                y,
              )
            : this.is1()
              ? d.w + 2 * d.bw - 6
              : r.getW(g, u, d._c.parent.length, b.isOutRight()) - 6;
      }
      (q && this.is1()) ||
        (this.vc.v.input.canDragVertically() && !q && (A = b.rowNumber - 1),
        (z = this.vc.v.input.canDragVertically()
          ? t && y && this.is1()
            ? r.yByRowI(g, y.startPeriod.position - 1) + r.y1(g, y, A)
            : g.rowTops[A] - g.getHeaderHeight()
          : d.getY(g)));
      t && y && this.is1()
        ? (l = r.getCustomH(g, b.rowNumber - 1, z, y, 3))
        : this.is1() &&
          (l = r.getHeight(g, A, this.vc.activity().length, 3, q));
      g = r.getPositionIndex(u, A);
      ui.show(this.adorEl);
      ui.setLeftTop(this.adorEl, B, z);
      ui.setWidthHeight(this.adorEl, Math.max(0, x), Math.max(0, l));
      b = !1;
      (this.prevAdorI && r.eqIndex(this.prevAdorI, g)) || (b = !0);
      this.prevAdorI = g;
      return b;
    };
    d.prototype.inPot = function (b) {
      return new f.vPos(this.vc.v, ui.getTouchPoint(b), f.relTo.mesh)._p;
    };
    d.prototype.card = function () {
      return this.vc.card();
    };
    d.prototype.v = function () {
      return this.vc.v;
    };
    d.prototype.di = function () {
      return this.v().size;
    };
    d.prototype.el = function () {
      return this.vc.el;
    };
    d.prototype.mc = function () {
      return this.vc.mc;
    };
    d.prototype.all = function () {
      return this.vc.all();
    };
    d.prototype.is1 = function () {
      return this.v().is1();
    };
    d.delN = 0;
    d.addN = 0;
    return d;
  })();
  f.vcDrag = g;
  var b = (function () {
    function b(b) {
      this.state = 0;
      this.vc = b;
    }
    b.prototype.el = function () {
      this._el || (this._el = ui.getDiv("dragAdorner"));
      return this._el;
    };
    b.prototype.initOrdPerPart = function (b) {
      this._mInd = b;
    };
    b.prototype.updateVcPos = function () {
      this.newVcPos = new f.vPos(
        this.vc.v,
        this.vc.drag.getDropPoint(),
        f.relTo.ok,
      );
    };
    b.prototype._v = function () {
      return this.vc.v;
    };
    return b;
  })();
  f.adorner = b;
})(v || (v = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      this._v = b;
    }
    g.prototype.markAll = function () {
      this.markColumns(
        0,
        r.getColumnsCount(
          this._v.data.daysCount,
          this._v.data.periodsCount,
          this._v.is1(),
        ) - 1,
      );
    };
    g.prototype.markColumns = function (b, d) {
      this.markRowsAndColumns(arr.range(1, this._v.data.rowsCount), b, d);
    };
    g.prototype.markRow = function (b) {
      this.markRowsAndColumns(
        [b],
        0,
        r.getColumnsCount(
          this._v.data.daysCount,
          this._v.data.periodsCount,
          this._v.is1(),
        ) - 1,
      );
    };
    g.prototype.markRowsAndColumns = function (b, d, g) {
      for (var h = this._v, l = 0; l < b.length; l++)
        for (var n = b[l], q = d; q <= g; q++) {
          var u = h.is1()
              ? r.getIndividualPeriod(h.data.periods, n - 1)
              : r.getMasterPeriod(h.data.periods, q),
            t = r.getDayByColumnIndex(
              h.data.days,
              h.data.periodsCount,
              q,
              h.is1(),
            );
          h.g.onMarkerDraw(f.vPos.fromKnown(h, t, u, n));
        }
    };
    g.prototype.pinRow = function (b) {
      b = f.scheduledRowRange(this._v.vcs, b - 1);
      if (0 !== b.length) {
        var d = f.shouldPin(b);
        this.pin(b, d);
        return d;
      }
    };
    g.prototype.pinCols = function (b, d) {
      b = f.scheduledColumnRange(this._v.vcs, b, d);
      if (0 !== b.length) return ((d = f.shouldPin(b)), this.pin(b, d), d);
    };
    g.prototype.pinAll = function () {
      this.pinVcs(f.ins(this._v.vcs));
    };
    g.prototype.pinVcs = function (b) {
      this.pin(b, f.shouldPin(b));
    };
    g.prototype.pinVc = function (b, d) {
      b.card().pinned !== d && this.pin([b], d);
    };
    g.prototype.pin = function (b, d) {
      this._v.g.pin.fire(b, d, this._v);
    };
    g.prototype.x = function (b) {
      this._v.g.remove.fire(b, this._v);
    };
    g.prototype.xVc = function (b) {
      b.isMoving() ||
        b.mc.isOut() ||
        (b.mc.ordAng &&
          1 < b.mc.ordAng.ordI() &&
          (this._v.isLastClearedOrdered = !0),
        this.x([b]));
    };
    g.prototype.xRow = function (b) {
      this.x(f.scheduledRowRange(this._v.vcs, b - 1));
    };
    g.prototype.xCols = function (b, d) {
      this.x(f.scheduledColumnRange(this._v.vcs, b, d));
    };
    g.prototype.xAll = function () {
      this.x(f.ins(this._v.vcs));
    };
    return g;
  })();
  f.vcM = l;
})(v || (v = {}));
(function (f) {
  (function (b) {
    b[(b.none = 0)] = "none";
    b[(b.pin = 1)] = "pin";
    b[(b.sponge = 2)] = "sponge";
    b[(b.marker = 3)] = "marker";
  })(f.toolType || (f.toolType = {}));
  var l = (function () {
    function b(b) {
      void 0 === b && (b = 0);
      this.isOn = !1;
      this.type = b;
      this._1 = c.callback();
      this._n = c.callback();
    }
    b.prototype.on1 = function () {
      this._1.fire();
    };
    b.prototype.onN = function () {
      this._n.fire();
    };
    b.prototype.on = function (b) {
      if (this.isOn !== b)
        if ((this.isOn = b)) this.on1();
        else this.onN();
    };
    b.prototype.off = function () {
      return !1;
    };
    b.prototype.clName = function () {
      return "tool";
    };
    b.prototype.imgOver = function () {
      return this.clName() + "_over";
    };
    b.prototype.copy = function () {
      return new b(this.type);
    };
    b.prototype.isPin = function () {
      return this.type === e.toolTy.p;
    };
    b.prototype.no = function () {
      return this.type === e.toolTy.n;
    };
    b.prototype.isSponge = function () {
      return this.type === e.toolTy.s;
    };
    b.prototype.isSpongeClear = function () {
      return this.isSponge() && this.isClearing;
    };
    b.prototype.isPinActive = function () {
      return this.isPin() && this.isActive();
    };
    b.prototype.isMark = function () {
      return this.type === e.toolTy.m;
    };
    b.prototype.isMarkerDraw = function () {
      return this.isMark() && this.isDrawing;
    };
    return b;
  })();
  f.tool = l;
  var g;
  (function (b) {
    b[(b.marking = 0)] = "marking";
    b[(b.clearing = 1)] = "clearing";
  })((g = f.markMode || (f.markMode = {})));
  var b;
  (function (b) {
    b[(b.allowed = 0)] = "allowed";
    b[(b.forbidden = 1)] = "forbidden";
    b[(b.unwanted = 2)] = "unwanted";
    b[(b.mandatory = 3)] = "mandatory";
  })((b = f.markType || (f.markType = {})));
  var d = (function (d) {
    function f(f, h) {
      void 0 === h && (h = e.toolTy.m);
      h = d.call(this, h) || this;
      h.markType = b.forbidden;
      h.isDrawing = !1;
      h.mode = g.marking;
      h._v = f;
      return h;
    }
    __extends(f, d);
    f.prototype.setIsDrawing = function (b) {
      this.isDrawing !== b && ((this.isDrawing = b), this.on(b));
    };
    f.prototype.isMarkingMode = function () {
      return this.mode === g.marking;
    };
    f.prototype.isClearing = function () {
      return this.mode === g.clearing;
    };
    f.prototype.isEraser = function () {
      return this.markType === b.allowed;
    };
    f.prototype.isUnwantedOrMandatory = function () {
      return this.isUnwanted() || this.isMandatory();
    };
    f.prototype.isUnwanted = function () {
      return this.markType === b.unwanted;
    };
    f.prototype.isMandatory = function () {
      return this.markType === b.mandatory;
    };
    f.prototype.isForbidden = function () {
      return this.markType === b.forbidden;
    };
    f.prototype.off = function () {
      if (!this.isDrawing) return !1;
      this.setIsDrawing(!1);
      return !0;
    };
    f.prototype.clName = function () {
      var b = e.markerType.eraser;
      this.isForbidden()
        ? (b = e.markerType.forbidden)
        : this.isUnwanted()
          ? (b = e.markerType.unwanted)
          : this.isMandatory() && (b = e.markerType.mandatory);
      return b;
    };
    f.prototype.name = function () {
      var d = "eraser";
      this.markType === b.forbidden
        ? (d = "forbidden")
        : this.markType === b.mandatory
          ? (d = "mandatory")
          : this.markType === b.unwanted && (d = "unwanted");
      return d;
    };
    f.prototype.copy = function () {
      var b = new f(this._v, this.type);
      b.markType = this.markType;
      return b;
    };
    return f;
  })(l);
  f.markerTool = d;
  var h;
  (function (b) {
    b[(b.d = 0)] = "d";
    b[(b.p = 1)] = "p";
    b[(b.u = 2)] = "u";
  })((h = f.pinMode || (f.pinMode = {})));
  d = (function (b) {
    function d(d) {
      void 0 === d && (d = e.toolTy.p);
      d = b.call(this, d) || this;
      d.mode = h.d;
      return d;
    }
    __extends(d, b);
    d.prototype.isActive = function () {
      return this.mode !== h.d;
    };
    d.prototype.off = function () {
      return this.reset();
    };
    d.prototype.reset = function () {
      if (this.mode === h.d) return !1;
      this.setMode(h.d);
      return !0;
    };
    d.prototype.setMode = function (b) {
      this.mode !== b && ((this.mode = b), this.on(this.mode !== h.d));
    };
    d.prototype.clName = function () {
      return "pin";
    };
    d.prototype.isPinning = function () {
      return this.mode === h.p;
    };
    d.prototype.isUnPinning = function () {
      return this.mode === h.u;
    };
    d.prototype.copy = function () {
      return new d(this.type);
    };
    return d;
  })(l);
  f.pinTool = d;
  l = (function (b) {
    function d(d) {
      void 0 === d && (d = e.toolTy.s);
      d = b.call(this, d) || this;
      d.isClearing = !1;
      return d;
    }
    __extends(d, b);
    d.prototype.setIsClearing = function (b) {
      this.isClearing !== b && ((this.isClearing = b), this.on(b));
    };
    d.prototype.off = function () {
      if (!this.isClearing) return !1;
      this.setIsClearing(!1);
      return !0;
    };
    d.prototype.clName = function () {
      return "sponge";
    };
    d.prototype.copy = function () {
      return new d(this.type);
    };
    return d;
  })(l);
  f.spongeTool = l;
})(v || (v = {}));
(function (f) {
  f.progressType = {
    horizontal: 0,
    vertical: 1,
  };
  var l = (function () {
    function g(b, d) {
      var g = this;
      this.display = this.value = -1;
      this.totalPx = 0;
      this.type = f.progressType.horizontal;
      this.isSliderIn = !0;
      b.resize.add(function (b) {
        return g.resize();
      });
    }
    g.el = function (b, d, g, k) {
      void 0 === k && (k = f.progressType.horizontal);
      b = new f.progress(b, d);
      b.type = k;
      b.setEl(g);
      return b;
    };
    g.prototype.setEl = function (b) {
      this.el = b;
      ui.addClass(this.el, "progressPanel");
      this.background = ui.getDiv("progressBg");
      this.bar = ui.getDiv("progress");
      ui.append(this.bar, this.background);
      ui.append(this.background, this.el);
      this.resize();
      this.setPercentage(0);
    };
    g.prototype.setPercentage = function (b) {
      b !== this.value && this.update(b, this.value);
    };
    g.prototype.update = function (b, d) {
      0 === this.totalPx && (this.totalPx = this.getTotalPx());
      var g = Math.floor((this.totalPx / 100) * b);
      this.type === f.progressType.horizontal
        ? ui.setWidth(this.bar, g)
        : ui.setHeight(this.bar, g);
      100 === b && 100 > d
        ? ui.addClass(this.bar, "end")
        : 100 > b && 100 === d && ui.deleteClass(this.bar, "end");
      this.value = b;
    };
    g.prototype.onBarClick = function (b) {
      b =
        this.type === f.progressType.horizontal
          ? b.clientX - ui.offset(this.background).x
          : b.clientY - ui.offset(this.background).y;
      if (this.isSlider() && this.isSliderIn) {
        var d = this.getTotalPx(),
          g = this.getHalfSlider();
        b > d ? (b = d + g) : b < g && (b = g);
      }
      this.xChange.fire(b, !1);
    };
    g.prototype.setSlider = function (b) {
      var d = this;
      this.isSliderIn = b;
      this.xChange = f.callback();
      this.slider = ui.getDiv("slide");
      ui.append(this.slider, this.el);
      ui.click(this.background, function (b) {
        return d.onBarClick(b);
      });
      b = this.sliderDrag = new ui.drag(this.slider);
      this.type === f.progressType.horizontal
        ? (b.setLeft = this.sliderDrag.setTop = f.no)
        : (b.setTop = this.sliderDrag.setLeft = f.no);
      b.start.add(function (b) {
        return d.onDragStart();
      });
      b.move.add(function (b) {
        return d.onDrag(!0);
      });
      b.end.add(function (b) {
        return d.onDragEnd();
      });
      ui.on(this.el, "keydown", function (b) {
        return d.onKey(b);
      });
    };
    g.prototype.onKey = function (b) {
      this.onSldKeyCode(b, keys.keyCode(b));
    };
    g.prototype.onSldKeyCode = function (b, d) {
      if (this.type === f.progressType.vertical) {
        var g = [-1, 1];
        d = [38, 40].indexOf(d);
        -1 !== d &&
          ((this.sliderDrag.dy = g[d] * (keys.ctrl(b) ? 10 : 1)),
          this.onDrag(!1));
      } else
        ((g = [-1, 1]),
          (d = [37, 39].indexOf(d)),
          -1 !== d &&
            ((this.sliderDrag.dx = g[d] * (keys.ctrl(b) ? 10 : 1)),
            this.onDrag(!1)));
    };
    g.prototype.onDragStart = function () {
      ui.addClass(this.el, "drag");
    };
    g.prototype.onDrag = function (b) {
      var d = this.sliderDrag,
        g = this.type === f.progressType.horizontal,
        k = g ? d.dx : d.dy,
        l = g ? d.left : d.top;
      if (0 !== k) {
        var n = this.getHalfSlider();
        l += k;
        ((this.isSliderIn ? 0 <= l : l >= -n) || 0 < k) &&
          ((this.isSliderIn
            ? l <= this.getTotalPx()
            : l <= this.getTotalPx() - n) ||
            0 > k) &&
          (g ? (d.left = l) : (d.top = l), this.xChange.fire(l + n, b));
      }
    };
    g.prototype.onDragEnd = function () {
      ui.deleteClass(this.el, "drag");
    };
    g.prototype.getHalfSlider = function () {
      return (
        (this.type === f.progressType.horizontal
          ? ui.getBoxWidth(this.slider)
          : ui.getBoxHeight(this.slider)) / 2
      );
    };
    g.prototype.resize = function () {
      this.totalPx = this.getTotalPx();
      var b = this.value;
      -1 !== b && this.update(b, b);
    };
    g.prototype.getTotalPx = function () {
      var b =
          this.isSlider() && this.isSliderIn ? ui.getBoxWidth(this.slider) : 0,
        d =
          this.isSlider() && this.isSliderIn ? ui.getBoxHeight(this.slider) : 0;
      return this.type === f.progressType.horizontal
        ? ui.getComputedWidth(this.background) - b
        : ui.getComputedHeight(this.background) - d;
    };
    g.prototype.isSlider = function () {
      return !!this.slider;
    };
    return g;
  })();
  f.progress = l;
})(c || (c = {}));
(function (f) {
  var l = (function () {
    function g(b, d) {
      void 0 === d &&
        (d = {
          selectText: !0,
        });
      var g = this;
      this._isChg = !1;
      this.el = b;
      this.options = d;
      this.change = f.callback();
      this.focus = f.callback();
      this.blur = f.callback();
      this.valid = f.callback();
      ui.on(b, "keydown", function (b) {
        return g.onKey(b);
      });
      ui.on(b, "focus", function (b) {
        return g.onFocus(b);
      });
      ui.on(b, "blur", function (b) {
        return g.onBlur(b);
      });
      ui.on(b, "input", function (b) {
        return g.onChange(b);
      });
    }
    g.prototype.setValue = function (b) {
      b || (b = "");
      this.el.value = b;
    };
    g.prototype.getValue = function () {
      return this.el.value;
    };
    g.prototype.getNumber = function () {
      var b = Number(this.getValue());
      return isNaN(b) ? num.defaultValue : b;
    };
    g.prototype.setNumber = function (b) {
      this.setValue(isNaN(b) || b === num.defaultValue ? "" : b + "");
    };
    g.prototype.select = function () {
      f.input.select(this.el);
    };
    g.prototype.setPlaceholder = function (b) {
      ui.setAttribute(this.el, "placeholder", b);
    };
    g.prototype.setFocus = function () {
      ui.setFocus(this.el);
    };
    g.prototype.reset = function () {
      this.setValue("");
    };
    g.prototype.enable = function (b) {
      ui.enable(this.el, b);
    };
    g.prototype.onChange = function (b) {
      this.getValue() !== this.prevValue &&
        ((this._isChg = !0),
        this.change.fire(b),
        (this.prevValue = this.getValue()));
    };
    g.prototype.onFocus = function (b) {
      this._isChg = !1;
      this.options.selectText && !this.isTextArea() && this.select();
      this.focus.fire(b);
    };
    g.prototype.onBlur = function (b) {
      var d = this.getValue();
      this.blur.fire(b);
      this._isChg && this.valid.fire(d);
    };
    g.prototype.onKey = function (b) {
      f.input.noProp(b, this.isTextArea(), !1, 0);
      this.enableTab(b);
    };
    g.prototype.enableTab = function (b) {
      if (
        this.options.enableTab &&
        keys.tab(b) &&
        !keys.alt(b) &&
        !keys.ctrl(b)
      ) {
        ui.stopDefaultPropagation(b);
        var d = this.el;
        var f = d.selectionStart;
        var g = d.selectionEnd,
          l = d.value,
          n = l.substring(0, f),
          q = l.substring(g),
          u = !0;
        if (f !== g && ((g = l.substring(f, g)), -1 !== g.indexOf("\n"))) {
          u = !1;
          var t = n.lastIndexOf("\n");
          -1 === t
            ? ((g = n + g), (l = n.length), (n = ""))
            : ((g = n.substring(t) + g),
              (l = n.length - t),
              (n = n.substring(0, t)));
          keys.shift(b)
            ? ((t = /(\n|^)(\t|[ ]{1,8})/g),
              g.match(t) && (f--, l--),
              (g = g.replace(t, "$1")))
            : ((g = g.replace(/(\n|^)/g, "$1\t")), f++, l++);
          this.setValue(n + g + q);
          d.selectionStart = f;
          d.selectionEnd = f + g.length - l;
        }
        u &&
          !keys.shift(b) &&
          (this.setValue(n + "\t" + q),
          (d.selectionStart = d.selectionEnd = f + 1));
      }
    };
    g.select = function (b) {
      f.timeout(function () {
        b === document.activeElement && b.select();
      }, 10);
    };
    g.getEmail = function (b) {
      var d = b.getValue();
      d = d.replace(/ /g, "");
      d !== b.getValue() && b.setValue(d);
      return d;
    };
    g.prototype.isTextArea = function () {
      return "textarea" === this.el.nodeName.toLowerCase();
    };
    g.noProp = function (b, d, f, g) {
      void 0 === g && (g = 0);
      keys.tab(b) ||
        (!f && keys.esc(b)) ||
        (!d && keys.enter(b)) ||
        (1 === g &&
          keys.ctrl(b) &&
          (65 === keys.keyCode(b) || 88 === keys.keyCode(b))) ||
        ui.stopPropagation(b);
    };
    return g;
  })();
  f.input = l;
})(c || (c = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      void 0 === b && (b = {});
      this.hasIcon = !1;
      this.isEnabled = !0;
      this.isSecondClick = this.enableDoubleClick = !1;
      this._vis = !0;
      this.fireDisabledClick = !1;
      this.pressMode = !0;
      this.__className = "button";
      this._iconClassName = "icon";
      this._textClassName = "text";
      this.options = b;
      this.click = f.callback();
      this.logger = b.logger;
      b.isSvg &&
        ((this.text = b.text),
        (this.svgClass = b.svgClass),
        (this.hasIcon = !!b.svgClass),
        (this.useId = b.useId),
        this.setEl(b.el));
    }
    g.el = function (b, d, g, k) {
      void 0 === g && (g = !1);
      k = new f.button({
        logger: k,
        isSvg: !1,
      });
      k.text = d;
      k.hasIcon = g;
      k.setEl(b);
      return k;
    };
    g.svg = function (b) {
      b.isSvg = !0;
      return new f.button(b);
    };
    g.prototype.setEl = function (b) {
      this.el = b;
      ui.addClass(this.el, this.__className);
      ui.noSelect(this.el);
      this.hasText() && ui.addClass(this.el, "text");
      this.hasIcon && ui.addClass(this.el, "icon");
      ui.hasClass(this.el, "disabled") && this.enable(!1);
      this.setEvents();
      this.addEls();
    };
    g.prototype.hint = function (b, d) {
      void 0 === d && (d = f.hintPos.top);
      ui.hint(this.el, b, d);
    };
    g.prototype.setEvents = function () {
      var b = this;
      this.setEvents = f.no;
      ui.click(this.el, function (d) {
        b.onClick(d);
      });
      ui.tap(this.el, function (d) {
        return b.press(!0, d);
      });
      ui.tapEnd(this.el, function (d) {
        return b.unPress(d);
      });
      ui.on(this.el, "keydown", function (d) {
        return b.onKey(d);
      });
      ui.on(this.el, "mouseover", function (d) {
        return b.onOver();
      });
      ui.on(this.el, "mouseleave", function (d) {
        return b.onOut();
      });
    };
    g.prototype.onKey = function (b) {
      ui.hasFocus(this.el) &&
        keys.space(b) &&
        (this.onClick(b), ui.stopDefaultPropagation(b));
    };
    g.prototype.addEls = function () {
      ui.empty(this.el);
      this.addIcon();
      this.addText();
    };
    g.prototype.addIcon = function () {
      this.hasIcon &&
        (this.options.isSvg
          ? ((this.iconEl = svg.tag("svg", this.svgClass)), this.setUse())
          : ((this.iconEl = ui.getTag("span")),
            ui.addClass(this.iconEl, this._iconClassName)),
        ui.append(this.iconEl, this.el));
    };
    g.prototype.setUse = function () {
      this.useId &&
        (this.use ||
          ((this.use = svg.tag("use")), this.iconEl.appendChild(this.use)),
        svg.setXlink(this.use, this.useId));
    };
    g.prototype.addText = function () {
      this.hasText() &&
        ((this.textEl = ui.getTag("span")),
        ui.addClass(this.textEl, this._textClassName),
        this.setText(this.text),
        ui.append(this.textEl, this.el));
    };
    g.prototype.setText = function (b) {
      this.text = b;
      this.hasText() && ui.setHtml(this.textEl, b);
    };
    g.prototype.enable = function (b) {
      void 0 === b && (b = !0);
      this.isEnabled !== b &&
        ((this.isEnabled = b),
        ui.enable(this.el, b),
        b || ui.deleteClass(this.el, "over"));
    };
    g.prototype.setFocus = function () {
      ui.setFocus(this.el);
    };
    g.prototype.onClick = function (b) {
      var d = this;
      if (!ui.isRightClick(b))
        if (
          (ui.stopDefaultPropagation(b),
          this.isEnabled || this.fireDisabledClick)
        ) {
          if (
            !this.enableDoubleClick &&
            (f.timeout(function () {
              return d.onClickExpire();
            }, ui.clickTimeout),
            this.isSecondClick)
          ) {
            this.log("No dblClk on " + this.logName());
            return;
          }
          this.isSecondClick = !0;
          this.click.fire(b);
          this.log(this.logName());
        } else this.log(this.logName() + " click disabled");
    };
    g.prototype.log = function (b) {
      this.logger && this.logger.w(b);
    };
    g.prototype.press = function (b, d) {
      void 0 === b && (b = !0);
      !this.isEnabled ||
        (d && !this.pressMode) ||
        ui.isRightClick(d) ||
        ui.toggleClass(this.el, "press", b);
    };
    g.prototype.unPress = function (b) {
      var d = this;
      f.timeout(function () {
        return d.press(!1, b);
      }, 50);
    };
    g.prototype.onClickExpire = function () {
      this.isSecondClick = !1;
    };
    g.prototype.onOver = function () {
      this.isEnabled && ui.addClass(this.el, "over");
    };
    g.prototype.onOut = function () {
      this.isEnabled && ui.deleteClass(this.el, "over");
    };
    g.prototype.hide = function () {
      ui.hide(this.el);
      this._vis = !1;
    };
    g.prototype.show = function (b) {
      void 0 === b && (b = !0);
      ui.toggle(this.el, b);
      this._vis = b;
    };
    g.prototype.setVisibility = function (b) {
      this.el.style.visibility = b ? "visible" : "hidden";
      this._vis = b;
    };
    g.prototype.isVisible = function () {
      return this._vis;
    };
    g.prototype.changeClass = function (b) {
      this.className && ui.deleteClass(this.el, this.className);
      ui.addClass(this.el, (this.className = b));
    };
    g.prototype.changeIconClass = function (b) {
      this.iconEl.setAttribute("class", b);
    };
    g.prototype.changeUseId = function (b) {
      this.useId = b;
      this.setUse();
    };
    g.prototype.setTabIndex = function (b) {
      ui.setTabIndex(this.el, b);
    };
    g.prototype.hasText = function () {
      return void 0 !== this.text;
    };
    g.prototype.logName = function () {
      if (this.text) return this.text;
      var b = this.el.className;
      if (b) {
        var d = b.indexOf(" ");
        return -1 === d ? b : b.substring(0, d);
      }
      return "no cls/txt btn";
    };
    return g;
  })();
  f.button = l;
})(c || (c = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      var d = this;
      this.isBind = !1;
      this._pageKeyStep = -1;
      this.el = b;
      this.change = f.callback();
      ui.on(b, "change", function (b) {
        return d.onChange(b);
      });
      ui.on(b, "keydown", function (b) {
        return d.onKey(b);
      });
    }
    g.prototype.bind = function (b, d) {
      this.isBind = !0;
      this.pairs = b;
      var f = [],
        k = b.length;
      ui.empty(this.el);
      !d && 0 < b.length && (d = b[0][0]);
      for (var l = 0; l < k; l++) {
        var n = b[l],
          q = n[0] === d ? ' selected="selected"' : "";
        g.isHR(n)
          ? f.push("<hr>")
          : f.push(
              '<option value="' + n[0] + '"' + q + ">" + n[1] + "</option>",
            );
      }
      this.el.innerHTML = f.join("");
      this.isBind = !1;
    };
    g.isHR = function (b) {
      return void 0 === b[0];
    };
    g.addHR = function (b) {
      g.insertHR(b, b.length);
    };
    g.insertHR = function (b, d) {
      void 0 === d && (d = 0);
      arr.insert(b, g.hrPair, d);
    };
    g.prototype.getValue = function () {
      return this.el.value;
    };
    g.prototype.getNumberValue = function () {
      return Number(this.getValue());
    };
    g.prototype.getNumberOrUndefined = function () {
      var b = this.getNumberValue();
      return b === num.noValue ? void 0 : b;
    };
    g.prototype.getText = function () {
      var b = this.getIndex();
      if (-1 !== b) return (b = this.el.options[b]) ? b.text : void 0;
    };
    g.prototype.getIndex = function () {
      return this.el.selectedIndex;
    };
    g.prototype.setValue = function (b) {
      this.el.value = b;
    };
    g.prototype.setNumberValue = function (b) {
      this.el.value = b + "";
    };
    g.prototype.length = function () {
      return this.pairs ? this.pairs.length : 0;
    };
    g.prototype.enable = function (b) {
      ui.enable(this.el, b);
    };
    g.prototype.onChange = function (b) {
      this.isBind || this.change.fire(b, this.getValue());
    };
    g.prototype.onKey = function (b) {
      if (-1 !== this._pageKeyStep) {
        var d = [this._pageKeyStep, -this._pageKeyStep],
          g = keys.indexOf(b, [34, 33]);
        -1 !== g && (this.jumpBy(b, d[g]), ui.stopDefaultPropagation(b));
      }
      f.input.noProp(b, !1, !1, 1);
    };
    g.prototype.jumpBy = function (b, d) {
      if (this.pairs) {
        var f = this.getValue(),
          g = -1;
        this.pairs.find(function (b) {
          ++g;
          return b[0] === f;
        }) &&
          ((d = Math.min(this.pairs.length - 1, Math.max(0, g + d))),
          d !== g && (this.setValue(this.pairs[d][0]), this.onChange(b)));
      }
    };
    g.hrPair = [void 0, ""];
    return g;
  })();
  f.combo = l;
})(c || (c = {}));
(function (f) {
  var l = (function () {
    function g(b) {
      var d = this;
      this.el = b;
      this.anyChange = f.callback();
      this.change = f.callback();
      ui.on(b, "change", function (b) {
        return d.onChange(b, !0);
      });
    }
    g.prototype.check = function (b) {
      void 0 === b && (b = !0);
      this.el.checked = b;
      this.onChange(void 0, !1);
    };
    g.prototype.isChecked = function () {
      return this.el.checked;
    };
    g.prototype.enable = function (b) {
      ui.enable(this.el, b);
    };
    g.prototype.onChange = function (b, d) {
      var f = this.isChecked();
      this.anyChange.fire(b, f);
      d && this.change.fire(b, f);
    };
    return g;
  })();
  f.checkbox = l;
})(c || (c = {}));
(function (f) {
  f.getExpander = function (f, b, d) {
    return new l(f, b, d);
  };
  var l = (function () {
    function g(b, d, g) {
      var h = this;
      this.trigger = b;
      this.panel = d;
      this.options = __assign(
        {
          expand: "on",
          on: "on",
        },
        g,
      );
      this.panel = d = this.getPanel();
      this.change = f.callback();
      b &&
        (ui.setAttribute(b, "role", "button"),
        this.setAriaExpanded(),
        d &&
          (ui.setAttribute(d, "role", "region"),
          (d = d.id) && ui.setAttribute(b, "aria-controls", d),
          this.isOn() && this.toggle(!0)),
        ui.click(b, function (b) {
          return h.onClick(b);
        }));
    }
    g.prototype.getPanel = function () {
      return this.options.getPanel ? this.options.getPanel(this) : this.panel;
    };
    g.prototype.isOn = function () {
      return (
        !!this.trigger &&
        "true" === ui.getAttribute(this.trigger, "aria-expanded")
      );
    };
    g.prototype.expand = function () {
      this.toggle(!0);
    };
    g.prototype.collapse = function () {
      this.toggle(!1);
    };
    g.prototype.onClick = function (b) {
      this.trigger.disabled || this.toggle(void 0, b);
    };
    g.prototype.toggle = function (b, d) {
      var f = !0;
      void 0 === b ? (b = !this.isOn()) : b === this.isOn() && (f = !1);
      this.trigger &&
        this.setState([this.trigger], b, this.options.on, this.options.off);
      var g = this.getPanel();
      g &&
        ((g = [g]),
        this.options.panels && g.push.apply(g, this.options.panels),
        this.setState(g, b, this.options.expand, this.options.collapse));
      this.setAriaExpanded(b);
      f && this.change.fire(b, d, this);
      return b;
    };
    g.prototype.setAriaExpanded = function (b) {
      this.trigger &&
        ui.setAttribute(
          this.trigger,
          "aria-expanded",
          (void 0 === b ? this.isOn() : b) ? "true" : "false",
        );
    };
    g.prototype.setState = function (b, d, f, g) {
      0 !== b.length &&
        (d
          ? (g &&
              b.forEach(function (b) {
                return ui.deleteClass(b, g);
              }),
            f &&
              b.forEach(function (b) {
                return ui.addClass(b, f);
              }))
          : (f &&
              b.forEach(function (b) {
                return ui.deleteClass(b, f);
              }),
            g &&
              b.forEach(function (b) {
                return ui.addClass(b, g);
              })));
    };
    return g;
  })();
  f.expander = l;
})(c || (c = {}));
(function (f) {
  f.getMore = function (f, b, d) {
    return new l(f, b, d);
  };
  var l = (function () {
    function g(b, d, g) {
      var h = this;
      this.trigger = b;
      g || (g = {});
      this.options = g;
      void 0 === g.moreText &&
        ((g.moreText = "More"), void 0 === g.lessText && (g.lessText = "Less"));
      this.expander = f.getExpander(b, d, g.expanderOptions);
      g.svgDef &&
        svg.embed(
          g.iconId || "chevronD",
          g.svgDef,
          b,
          "svgIcon" + (g.iconId ? "" : " chevron"),
        );
      g.moreText &&
        ((this.span = ui.getTag("span")),
        ui.addClass(this.span, "moreText"),
        this.setText(this.expander.isOn()),
        ui.append(this.span, b));
      this.expander.change.add(function (b) {
        return h.onToggle(b);
      });
    }
    g.prototype.onToggle = function (b) {
      this.setText(b);
    };
    g.prototype.setText = function (b) {
      b = this.getText(b);
      void 0 !== b && this.span && ui.setText(this.span, b);
    };
    g.prototype.getText = function (b) {
      return b ? this.options.lessText : this.options.moreText;
    };
    return g;
  })();
  f.more = l;
})(c || (c = {}));
var w;
(function (f) {
  f.introVideoUrl = "video/intro.mp4";
  var l = (function () {
    function g(b) {
      var d = this;
      this.openMs = -1;
      this.startY = 15;
      this.endY = 1;
      this._2clk = !1;
      this.sections = [];
      this.navigationHashes = [];
      this.scrY = this.lastScrollY = 0;
      this.menuLinks = [];
      this.signUpIndex = 4;
      this.vA = b;
      this.log = b.log;
      this.hash = this.vA.hash;
      this.content = ui.find(".content");
      this.header = ui.find(".header", this.content);
      this.menuToggle = ui.find(".menu-toggle");
      this.burger = ui.find(".hamburger", this.menuToggle);
      this.topBar = ui.find(".topBar", this.burger);
      this.midBar = ui.find(".midBar", this.burger);
      this.botBar = ui.find(".botBar", this.burger);
      this.anim = new c.dA([this.botBar]);
      this.anim.ea = c.eaTy.oQuint;
      this.anim.dur = 200;
      this.anim.chg.add(function (b) {
        return d.dAChg(b);
      });
      this.anim.xed.add(function (b) {
        return d.dAX();
      });
      this.menu = ui.find(".menu");
      this.menuLinks = ui.all("a", this.menu);
      this.testimonialsMenuItem = ui.find(".testMi", this.menu);
      this.featuresMenuItem = ui.find(".featMi", this.menu);
      this.supportMenuItem = ui.find(".suppMi", this.menu);
      this.planMenuItem = ui.find(".planMi", this.menu);
      this.loginMenuItem = ui.find(".logMi", this.menu);
      this.signUpMenuItem = ui.find(".freeMi", this.menu);
      this.contactMenuItem = ui.find(".contMi", this.menu);
      ui.click(this.loginMenuItem, function (b) {
        return d.onLoginClick(b);
      });
      ui.click(this.contactMenuItem, function (b) {
        return d.onContact(b);
      });
      ui.click(this.planMenuItem, function (b) {
        return d.goSgn(b);
      });
      ui.click(this.signUpMenuItem, function (b) {
        return d.goSgn(b);
      });
      ui.click(this.testimonialsMenuItem, function (b) {
        ui.stopDefaultPropagation(b);
        d.goSection(1);
      });
      ui.click(this.featuresMenuItem, function (b) {
        ui.stopDefaultPropagation(b);
        d.goSection(2);
      });
      ui.click(this.supportMenuItem, function (b) {
        ui.stopDefaultPropagation(b);
        d.goSection(3);
      });
      var g = ui.find(".owl", this.header);
      svg.embed("owlD", this.vA.svgDef, g, "svgOwl");
      this.loginBtn = ui.find(".login", this.header);
      this.sgnUpBtn = ui.find(".signUp", this.header);
      this.intro = ui.find(".intro", this.content);
      this.player = new w.player(this.vA.v.g.form, {
        viewer: this.vA,
      });
      this.player.preOpened.add(function (b) {
        d.an.hide();
        d.log.w("play intro");
      });
      this.player.closed.add(function (b) {
        d.an.show();
        d.log.w("close video");
        d.player.src() === f.introVideoUrl &&
          d.vA.inf.addTip(
            "Want to find out more? " +
              ui.linkMessage(e.introVideos, "Watch 10+ short intro videos"),
          );
      });
      this.watchDemo = ui.find(".watchDemo", this.content);
      ui.appends([b.titleEl], b.top);
      ui.click(this.sgnUpBtn, function (b) {
        return d.goSgn(b);
      });
      ui.click(this.loginBtn, function (b) {
        return d.onLoginClick(b);
      });
      this.footer = ui.find(".footer", this.content);
      g = ui.all(".section", this.content);
      for (var k = -1, l = 0; l < g.length; l++) {
        var n = g[l],
          q = new w.section(n, ++k, l);
        this.sections[k] = q;
        this.navigationHashes[k] = ui.getAttribute(n, "id");
        n = ui.all(".subSection", n);
        if (0 !== n.length)
          for (q = 0; q < n.length; q++) {
            ++k;
            var u = n[q];
            this.navigationHashes[k] = ui.getAttribute(u, "id");
            this.sections[k] = new w.section(u, k, l);
          }
      }
      this.an = new w.an(this);
      this.changeSection(0);
      ui.click(c.body(), function (b) {
        return d.onBodyClick();
      });
      this.title = b.title._1;
      this.scrA = new c.scrA([c.documentElement(), c.body()], 200);
      this.scrA.ea = c.eaTy.oQuint;
      ui.on(
        window,
        "scroll",
        function (b) {
          return d.onScroll(b);
        },
        {
          passive: !0,
        },
      );
      this.signUp = new w.sgnUp(this);
      this.onUserChange();
      this.vA.events.userChange.add(function () {
        return d.onUserChange();
      });
      this.vA.events.hashChange.add(function (b) {
        return d.checkHash(b);
      });
      this.scrA.xed.add(function () {
        return d.onScrollStop();
      });
      if (!this.checkHash(this.hash.pairs)) this.onScroll();
      c.timeout(function () {
        return d.aft();
      }, 300);
      b.resize.add(function (b) {
        return d.resize();
      });
      this.resize(!0);
      ui.click(this.menuToggle, function (b) {
        return d.onMenuToggle(b);
      });
      ui.clicks(this.menuLinks, function (b) {
        d.closeMenu();
      });
      ui.on(window, "keydown", function (b) {
        return d.onKey(b);
      });
    }
    g.prototype.onKey = function (b) {
      !this.vA.isMaker() &&
        keys.esc(b) &&
        (ui.stopDefaultPropagation(b), this.closeMenu(), this.player.close(b));
    };
    g.prototype.onMenuToggle = function (b) {
      ui.stopDefaultPropagation(b);
      if (350 > date.nowMs() - this.openMs) return !1;
      ui.toggleClass(this.menu, "open");
      this.openMs = date.nowMs();
      this.startMenuAnim();
      return !1;
    };
    g.prototype.startMenuAnim = function () {
      this.anim._1 = num.toInt(ui.getAttribute(this.botBar, "y2"));
      this.anim._n = this.isOpen() ? this.endY : this.startY;
      this.anim.play();
    };
    g.prototype.closeMenu = function () {
      var b = ui.hasClass(this.menu, "open");
      ui.deleteClass(this.menu, "open");
      b && this.startMenuAnim();
      return b;
    };
    g.prototype.dAChg = function (b) {
      var d = this.botBar,
        f = this.topBar,
        g = this.midBar,
        l = num.round(b.val, 0),
        n = this.isOpen();
      ui.setAttribute(d, "y2", l + "");
      ui.setAttribute(f, "y2", 16 - l + "");
      b = num.round(5 * b.prc, 0);
      n || (b = 5 - b);
      n = 24 - b;
      ui.setAttribute(d, "x1", b + "");
      ui.setAttribute(d, "x2", n + "");
      ui.setAttribute(f, "x1", b + "");
      ui.setAttribute(f, "x2", n + "");
      d =
        l === this.startY
          ? 1
          : l === this.endY
            ? 0
            : num.round((l - 1) / 15, 2);
      ui.setAttribute(g, "opacity", d + "");
    };
    g.prototype.dAX = function () {
      var b = !this.isOpen();
      this.setCrisp(this.topBar, b);
      this.setCrisp(this.botBar, b);
    };
    g.prototype.isOpen = function () {
      return ui.hasClass(this.menu, "open");
    };
    g.prototype.setCrisp = function (b, d) {
      ui.setAttribute(b, "shape-rendering", d ? "crispEdges" : "auto");
    };
    g.prototype.onUserChange = function () {
      var b = this.vA.isDemo(),
        d = ui.find(".planLnk", this.sgnUpBtn);
      ui.setText(d, b ? "Sign Up" : "Buy Now");
      this.signUp.fill(this.vA.config.acc);
    };
    g.prototype.aft = function () {
      var b = this;
      ui.click(this.vA.titleEl, function (d) {
        return b.onProd(d);
      });
      ui.click(ui.find(".moreTestimonials", this.content), function (d) {
        return b.onMoreTestimonials(d);
      });
      ui.clicks(ui.all(".contactLink", this.content), function (d) {
        return b.onContact(d);
      });
      ui.click(ui.find(".contactLink", this.footer), function (d) {
        return b.onContact(d);
      });
      ui.click(this.vA.owl.el, function (d) {
        return b.onOw(d);
      });
    };
    g.prototype.checkHash = function (b) {
      var d = this,
        f = c.findHashKeys(b, this.navigationHashes);
      return f
        ? (c.timeout(function () {
            d.goSection(d.navigationHashes.indexOf(f[0]));
          }, 400),
          !0)
        : !1;
    };
    g.prototype.onContact = function (b) {
      ui.stopDefaultPropagation(b);
      this.vA._mA.contactView().open();
      this.hash.addKey("contact");
      return !1;
    };
    g.prototype.onOw = function (b) {
      var d = this;
      ui.stopDefaultPropagation(b);
      if (!this.vA.isWeb() || this._2clk) return !1;
      this.closeMenu();
      this._2clk = !0;
      c.timeout(function () {
        d._2clk = !1;
      }, 500);
      this.goSection(0);
      return !0;
    };
    g.prototype.onProd = function (b) {
      ui.stopDefaultPropagation(b);
      this.closeMenu();
      this.goSection(0);
    };
    g.prototype.onLoginClick = function (b) {
      ui.stopDefaultPropagation(b);
      this.closeMenu();
      this.vA._mA
        ? this.vA.isDemo()
          ? this.vA._mA.loginView().open()
          : this.vA._mA.switchToMaker()
        : this.vA.inf.add("Just a second. The app is loading.");
    };
    g.prototype.onMoreTestimonials = function (b) {
      ui.stopPropagation(b);
      c.an.fOut(ui.target(b), 300);
      ui.deleteClasses(ui.all(".testimonial"), "hide");
      ui.deleteClasses(ui.all("br.hide", this.content), "hide");
      return !1;
    };
    g.prototype.onBodyClick = function () {
      this.vA.isMaker() || this.closeMenu();
    };
    g.prototype.onScroll = function (b) {
      if (!this.scrA.isGo()) this.onScrollStop();
    };
    g.prototype.resize = function (b) {
      void 0 === b && (b = !1);
      b || this.updYSec();
      var d = c.windowWidth(),
        f = c.windowHeight(),
        g = 560 <= d,
        l = ui.getBoxHeight(this.header);
      this.testimonialHeight = 480 > f ? 50 : 85;
      f = Math.floor(f - this.testimonialHeight - l);
      ui.setHeight(this.intro, f);
      ui.toggleClass(ui.find(".quickNav", this.header), "on", g);
      ui.toggles([this.signUpMenuItem, this.loginMenuItem], !g);
      d = d - c.scrollWidth() - ui.getBoxWidth(this.watchDemo) - 8;
      ui.setLeftTop(
        this.watchDemo,
        d,
        f + l - ui.getBoxHeight(this.watchDemo) - (g ? 8 : 0),
      );
      b && ui.show(this.watchDemo);
    };
    g.prototype.updYSec = function () {
      this.scrY = this.scrA.yOff();
      for (var b = this.sections.length, d = 1; d < b; d++) {
        var f = this.sections[d].top();
        if (this.scrY < f || 0 === f) {
          this.changeSection(d - 1);
          break;
        } else d === b - 1 && this.changeSection(d);
      }
    };
    g.prototype.changeSection = function (b) {
      this.section = this.sections[b];
      this.an.checkStart();
    };
    g.prototype.isLastSection = function (b) {
      b || (b = this.section.i);
      if (b >= this.sections.length) return !0;
      b = ui.getBodyScrollTop();
      var d = ui.getBodyScrollHeight();
      return b + window.innerHeight + ui.getComputedHeight(this.footer) >= d;
    };
    g.prototype.onScrollStop = function () {
      this.updYSec();
      var b = this.section.i,
        d = c.findHashKeys(this.hash.pairs, this.navigationHashes);
      if (d) {
        if (str.equalLowerCase(d[0], this.navigationHashes[b])) return;
        d[1] = null;
      }
      this.vA.isWeb() && this.hash.addKey(this.navigationHashes[b], !0);
    };
    g.prototype.goSgn = function (b) {
      ui.stopDefaultPropagation(b);
      this.onSgnUp(b, this.vA.isDemo() ? e.planType.free : e.planType.basic);
    };
    g.prototype.onSgnUp = function (b, d) {
      void 0 === d && (d = e.planType.free);
      this.closeMenu();
      this.goSection(this.signUpIndex, !0);
      this.signUp.changePlan(d);
      this.log.w("Sign up clicked");
    };
    g.prototype.scrollToY = function (b, d) {
      void 0 === d && (d = !1);
      if (d) {
        var f = c.scrA.yOff(this.scrA.el);
        this.scrA.dur = 25 * Math.floor(Math.abs(f - b) / 100);
      }
      return this.scrA.to(b, d);
    };
    g.prototype.goSection = function (b, d) {
      void 0 === d && (d = !1);
      b = this.scrollToY(this.sections[b].top(), !0);
      d &&
        !b &&
        (this.vA.isDemo()
          ? this.vA.inf.add(
              "Choose a plan and create account by entering email and password.",
            )
          : this.vA.inf.add(
              "Choose Basic or Premium plan and click 'Buy Now'.",
            ));
      return b;
    };
    g.prototype.leave = function () {
      this.title = document.title;
      this.lastScrollY = this.scrY;
    };
    g.prototype.back = function (b) {
      void 0 === b && (b = !0);
      document.title = this.title;
      b &&
        (this.focus(),
        this.scrollToY(this.lastScrollY),
        (this.scrY = this.lastScrollY));
      this.an.checkStart();
      this.player.onResize();
    };
    g.prototype.focus = function (b) {
      void 0 === b && (b = !1);
      var d = this.scrY;
      this.content.focus();
      b && this.scrollToY(d);
    };
    return g;
  })();
  f.wA = l;
  l = (function () {
    function f(b, d, f) {
      this.el = b;
      this.i = d;
      this.mi = f;
    }
    f.prototype.top = function () {
      return ui.offset(this.el).y;
    };
    return f;
  })();
  f.section = l;
})(w || (w = {}));
(function (f) {
  f.texts = [
    "Powerful School Scheduling Software;Frustrated with Outdated Tools?;Get Your Schedules Done Easily;Generate Schedules Automatically;Across Any Device;Refine Manually with Ease and...;Experience Scheduling Like Never Before".split(
      ";",
    ),
    "Timetabling Done Properly;State-of-the-Art Timetable Generator;Create Flawless Schedules;Loved by Students and Teachers;Automatically Resolve Conflicts;Fine-Tune Manually and...;Enjoy Scheduling Like Never Before".split(
      ";",
    ),
    "The Art of School Timetabling;Crafted Over 35 Years for You to...;Automatically Resolve Constraints ;Collaborate Seamlessly;Share with Students and Teachers;Update on the Go and...;Enjoy Scheduling Like Never Before".split(
      ";",
    ),
  ];
  f.dTy = {
    d: 0,
    m: 1,
    t: 2,
    p: 3,
  };
  f.status = {
    default: 0,
    hidden: 1,
  };
  var l = (function () {
    function g(b) {
      this.durs = [6e3, 3e3, 5e3];
      this.nextText = "";
      this.isPlaying = !1;
      this.mCrdI = 12;
      this.cycle = 1;
      this.status = f.status.default;
      this.wA = b;
      this.init();
    }
    g.prototype.init = function () {
      this.init = c.no;
      this.el = ui.find(".anim", this.wA.content);
      this.fadeAnim = new c.fA([this.el]);
      this.dev = new f.dev(this.wA, ui.find(".start", this.el), !0);
      this.d10 = new f.dev(this.wA, ui.find(".tablet", this.el));
      this.d19 = new f.dev(this.wA, ui.find(".monitor", this.el), !0);
      this.text = ui.find("h1", this.wA.content);
      this.textFade = new c.fA([this.text], 500);
      this.fadeAnim.ea = this.textFade.ea = c.eaTy.oQuad;
      this.finger = ui.find(".finger", this.el);
      this.checkStart();
    };
    g.prototype.go = function () {
      var b = this;
      this.wA.resize(!0);
      this.isPlaying = !0;
      this.dev.emp();
      this.dev.toShot();
      this.dev.vis();
      this.d10.inv();
      this.d19.inv();
      c.timeout(function () {
        return b.changeText(1);
      }, this.durs[0] - 1e3);
      c.timeout(function () {
        return b.removeShadowGoToBoard();
      }, this.durs[0]);
    };
    g.prototype.removeShadowGoToBoard = function () {
      var b = this;
      ui.setTransition(this.dev.dEls(), "", 0, "");
      ui.deleteClass(this.dev.el, "bordShadow");
      c.timeout(function () {
        return b.toBoard();
      }, 50);
    };
    g.prototype.toBoard = function () {
      var b = this;
      this.dev.cnt.style.width = "auto";
      this.dev.cnt.style.height = "auto";
      ui.setTransition(this.dev.dEls(), "", 500, "ease-in-out");
      this.dev.toBrd();
      c.timeout(function () {
        return b.addNotesToBoard();
      }, 500);
    };
    g.prototype.addNotesToBoard = function () {
      var b = this;
      this.dev.addCrds();
      ui.setTransition(this.dev.crdEls(), "", 0, "ease-in-out");
      this.dev.mess();
      ui.addClass(this.dev.cnt, "back");
      c.timeout(function () {
        return b.clean();
      }, this.durs[1]);
      c.timeout(function () {
        return b.changeText(2);
      }, this.durs[1] - 1e3);
    };
    g.prototype.clean = function () {
      var b = this,
        d = this.durs[2];
      c.timeout(function () {
        b.dev.rnd();
        b.dev.clean();
        b.dev.updAll();
      }, d / 3);
      c.timeout(function () {
        return b.changeText(3);
      }, d - 1e3);
      c.timeout(function () {
        return b.to19();
      }, d);
    };
    g.prototype.to19 = function () {
      var b = this;
      ui.deleteClass(this.dev.cnt, "back");
      this.dev.rnd();
      this.dev.to19();
      c.timeout(function () {
        b.dev.rnd();
        b.dev.clean();
        b.dev.updAll();
      }, 2e3);
      c.timeout(function () {
        return b.changeText(4);
      }, 3e3);
      c.timeout(function () {
        return b.to10();
      }, 4e3);
    };
    g.prototype.to10 = function () {
      var b = this;
      ui.deleteClass(this.dev.cnt, "back");
      this.dev.rnd();
      this.dev.clean();
      this.dev.to10();
      c.timeout(function () {
        b.dev.rnd(!0);
        b.fngStart();
      }, 1250);
      c.timeout(function () {
        return b.moveFinger(b.drgCrd);
      }, 4300);
      c.timeout(function () {
        return b.changeText(5);
      }, 3800);
      c.timeout(function () {
        return b.drg();
      }, 5e3);
    };
    g.prototype.fngStart = function () {
      this.setDrg();
      this.fingerPoint = ui.point
        .pos(ui.offset(this.dev.el))
        .mov(
          ui.getComputedWidth(this.dev.el) / 2,
          ui.getComputedHeight(this.dev.el),
        );
      ui.setAbsPoint(this.finger, this.fingerPoint);
    };
    g.prototype.setDrg = function () {
      for (var b = 0; b < this.dev.crdN(); b++) {
        var d = this.dev.crds[b];
        if (!d) return;
        d.ind === this.mCrdI
          ? (this.drgCrd = d)
          : d.ind === this.mCrdI + 1 && (this._2crd = d);
      }
      ui.setZIndex(this.drgCrd.el, ui.getZIndex(this._2crd.el) + 1);
    };
    g.prototype.moveFinger = function (b) {
      ui.setVisible(this.finger);
      b = b.el;
      var d = ui.point.pos(ui.offset(b));
      d.mov(ui.getComputedWidth(b) / 3, -ui.getComputedHeight(b) / 4);
      ui.setAbsPoint(this.finger, d);
    };
    g.prototype.drg = function () {
      var b = this,
        d = ui.point.pos(ui.getPos(this._2crd.el)),
        f = ui.point.pos(ui.getPos(this.drgCrd.el));
      ui.setAbsPoint(this.drgCrd.el, d);
      this.moveFinger(this._2crd);
      c.timeout(function () {
        return ui.setAbsPoint(b._2crd.el, f);
      }, 200);
      c.timeout(function () {
        ui.setAbsPoint(b.finger, b.fingerPoint);
        ui.setInvisible(b.finger);
      }, 1200);
      c.timeout(function () {
        return b.toN();
      }, 2e3);
    };
    g.prototype.toN = function () {
      var b = this;
      this.d19.addCrds(!0);
      this.d19.to19();
      this.d10.addCrds(!0);
      this.d10.w = 280;
      this.d10.to10(!1, !1);
      var d = new ui.point(this.d19.x, this.d19.y);
      this.d10.x = Math.max(20, d.x - 0.5 * this.d10.w);
      this.d10.updH();
      ui.addClass(this.d10.el, "em08");
      var f = ui.getBoxHeight(this.wA.header);
      this.d10.y =
        c.windowHeight() - this.wA.testimonialHeight - this.d10.h - f - 40;
      this.d10.updAll();
      this.changeText(6);
      this.dev.to4();
      ui.setLeftTop(
        this.dev.el,
        Math.min(
          c.windowWidth() - this.dev.w - 10,
          d.x + this.d19.w - (1 / 3) * this.dev.w,
        ),
        c.windowHeight() - this.wA.testimonialHeight - this.dev.h - f - 40,
      );
      ui.shows([this.d19.el, this.d10.el], "block");
      c.timeout(function () {
        b.d19.vis();
        b.d10.vis();
      }, 500);
      c.timeout(function () {
        ui.setTransition(b.d10.crdEls(), "", 250, "ease-in-out");
        b.d10.rnd(!0);
      }, 4e3);
      c.timeout(function () {
        ui.setTransition(b.d19.crdEls(), "", 300, "ease-in-out");
        b.d19.rnd(!0);
      }, 4500);
      c.timeout(function () {
        ui.setTransition(b.dev.crdEls(), "", 200, "ease-in-out");
        b.dev.rnd(!1);
        b.dev.updCrds();
      }, 5e3);
      c.timeout(function () {
        b.d19.inv();
        b.d10.inv();
        b.dev.inv();
      }, 7e3);
      c.timeout(function () {
        b.changeText(0, b.cycle + 1);
      }, 6500);
      c.timeout(function () {
        return b.onEnd();
      }, 8e3);
    };
    g.prototype.changeText = function (b, d) {
      var g = this;
      this.status !== f.status.hidden &&
        ((this.nextText =
          f.texts[((void 0 === d ? this.cycle : d) - 1) % f.texts.length][b]),
        this.textFade.toOut(500),
        c.timeout(function () {
          return g.onTextFadeEnd();
        }, 520));
    };
    g.prototype.onTextFadeEnd = function () {
      this.text.innerHTML = this.nextText;
      this.textFade.toIn(150);
    };
    g.prototype.onEnd = function () {
      this.stop();
      this.cycle += 1;
      this.checkStart();
    };
    g.prototype.checkStart = function () {
      !this.isPlaying &&
        this.wA.vA.isWeb() &&
        this.wA.section &&
        2 > this.wA.section.mi &&
        this.status !== f.status.hidden &&
        this.go();
    };
    g.prototype.stop = function () {
      this.isPlaying = !1;
    };
    g.prototype.hide = function () {
      this.status = f.status.hidden;
      this.fadeAnim.toOut(300);
      this.textFade.toOut(300);
    };
    g.prototype.show = function () {
      this.status = f.status.default;
      this.fadeAnim.toIn(300);
      this.textFade.toIn(300);
      this.checkStart();
    };
    return g;
  })();
  f.an = l;
  l = (function () {
    function g(b, d, g) {
      void 0 === g && (g = !1);
      var h = this;
      this.dTy = f.dTy.d;
      this.crds = [];
      this.crdWN = 5;
      this.crdHN = 4;
      this.brdH = 2;
      this.frmL = 25;
      this.frmB = this.frmT = 5;
      this.brdW = 2;
      this.padPcT = this.padPcL = this.frmPcB = this.frmPcT = this.frmPcL = 5;
      this.y = this.x = 0;
      this.minW = 300;
      this.bMrg = this.rMrg = this.hc = this.wc = this.h = this.w = 0;
      this.rat = 1.25;
      this.currI = -1;
      this.zInd = 1;
      this.wA = b;
      this.el = d;
      this.isCenter = g;
      this.frm = ui.find(".deviceFrame", d);
      this.cnt = ui.find(".deviceContent", this.frm);
      this.fA = new c.fA([d]);
      b.vA.resize.add(function (b) {
        return h.updAll();
      });
    }
    g.prototype.toShot = function () {
      this.reset();
      var b = ["fullS", "tabS", "phoneS"],
        d = this.devH();
      this.rat = 640 / 562;
      this.h = d;
      this.updW();
      c.windowWidth() < this.w &&
        ((this.w = c.windowWidth() - 40), this.updH());
      ui.setWidthHeight(this.el, this.w, this.h);
      ui.setWidthHeight(this.cnt, this.w, this.h);
      ui.deleteClass(this.el, arr.join(b, " "));
      ui.addClass(this.el, "shot bordShadow " + b[0]);
      this.padPcL =
        this.padPcT =
        this.frmT =
        this.frmB =
        this.frmL =
        this.frmPcB =
        this.frmPcT =
        this.frmPcL =
          0;
      this.updAll();
    };
    g.prototype.getW = function (b) {
      return Math.floor(this.rat * b);
    };
    g.prototype.to19 = function (b) {
      void 0 === b && (b = !0);
      this.reset();
      this.dTy = f.dTy.m;
      b && this.setWH(1.387, 0.8);
      this.padPcL = this.padPcT = 5;
      this.frmPcB = 22;
      this.padL = this.padT = 5;
      ui.addClass(this.el, "monitor" + (this.hasStand() ? " stand" : ""));
      this.updAll();
    };
    g.prototype.hasStand = function () {
      return 310 < this.devH();
    };
    g.prototype.toBrd = function () {
      this.reset();
      this.setWH(1.25, 0.9);
      ui.addClass(this.el, "board");
      this.updAll();
    };
    g.prototype.setWH = function (b, d) {
      this.rat = b;
      var f = c.windowWidth(),
        g = this.devH();
      f > g * b
        ? ((this.h = Math.floor(d * g)), this.updW())
        : ((this.w = Math.floor(d * f)), this.updH());
    };
    g.prototype.to10 = function (b, d) {
      void 0 === b && (b = !0);
      void 0 === d && (d = !0);
      this.reset();
      this.dTy = f.dTy.t;
      b
        ? (ui.setTransition(this.all(), "", 500, "ease-in-out"),
          this.setWH(1.28, 0.75))
        : this.setWH(1.28, 0.5);
      ui.addClass(this.el, "tablet landscape");
      d && this.updAll();
    };
    g.prototype.devH = function () {
      return Math.max(
        c.windowHeight() -
          (ui.getComputedHeight(this.wA.header) +
            ui.getBoxHeight(this.wA.an.text) +
            this.wA.testimonialHeight) -
          40,
        50,
      );
    };
    g.prototype.mess = function () {
      var b = this;
      this.currI = -1;
      this.zInd = 1;
      this.updAll(!1);
      for (var d = this.crdN(), f = 0; f < d; f++)
        c.timeout(
          function () {
            return b.messCrd();
          },
          num.random(200, 1200),
        );
    };
    g.prototype.messCrd = function () {
      var b = this,
        d = ++this.currI,
        f = this.crds[d];
      f &&
        (ui.setZIndex(f.el, ++this.zInd),
        f.mess(),
        ui.setLeftTop(
          f.el,
          num.random(0, this.w),
          this.h + num.random(-50, 50),
        ),
        ui.show(f.el, "block"),
        ui.setTransition([f.el], "", num.random(100, 500), "ease-in"),
        c.timeout(function () {
          return b.updCrd(f);
        }, 10));
    };
    g.prototype.clean = function () {
      for (var b = 0; b < this.crds.length; b++) this.crds[b].clean();
    };
    g.prototype.rnd = function (b) {
      void 0 === b && (b = !1);
      for (var d = [], f = 0; f < this.crds.length; f++) d[f] = f;
      for (f = 0; f < this.crds.length; f++) {
        var g = this.crds[f],
          l = num.random(0, d.length - 1),
          n = d[l];
        arr.removeAt(d, l);
        g.ind = n;
      }
      b && this.updAll();
    };
    g.prototype.to4 = function () {
      this.reset();
      this.dTy = f.dTy.p;
      ui.addClass(this.el, "phone");
      this.frmPcT = this.frmPcB = 16;
      this.padPcL = 3;
      this.w = 300 > this.devH() ? 36 : 77;
      this.rat = 77 / 150;
      this.updAll();
    };
    g.prototype.inv = function () {
      this.fA.toOut(500);
    };
    g.prototype.vis = function () {
      this.fA.toIn(500);
    };
    g.prototype.addCrds = function (b) {
      void 0 === b && (b = !1);
      var d = 0 === this.crds.length;
      d && (this.crds = []);
      for (var g = 0; g < this.crdN(); g++) {
        var k = d ? new f.card(this, g) : this.crds[g];
        b && ui.show(k.el, "block");
        d && (this.crds.push(k), ui.append(k.el, this.cnt));
      }
    };
    g.prototype.updAll = function (b) {
      void 0 === b && (b = !0);
      this.updDim();
      this.isCenter && this.center();
      this.upd();
      this.updCrdDim();
      b && this.updCrds();
    };
    g.prototype.upd = function () {
      ui.setLeftTop(this.el, this.x, this.y);
      ui.setWidthHeight(this.el, this.w, this.h);
    };
    g.prototype.updW = function () {
      this.w = Math.floor(this.rat * this.h);
    };
    g.prototype.updH = function () {
      this.h = Math.floor(this.w / this.rat);
    };
    g.prototype.updDim = function () {
      this.updH();
      this.frmL = (this.w / 100) * this.frmPcL;
      this.frmT = (this.h / 100) * this.frmPcT;
      this.frmB = (this.h / 100) * this.frmPcB;
      this.padL = (this.w / 100) * this.padPcL;
      this.padT = (this.h / 100) * this.padPcT;
    };
    g.prototype.updCrds = function () {
      if (0 !== this.crds.length)
        for (var b = this.crdN(), d = 0; d < b; d++) this.updCrd(this.crds[d]);
    };
    g.prototype.center = function () {
      var b = this.h + (this.dTy === f.dTy.t ? this.frmT + this.frmB : 0),
        d = Math.floor((c.windowWidth() - c.scrollWidth()) / 2);
      this.x = Math.floor(d - this.w / 2);
      var g = ui.getComputedHeight(this.wA.header);
      d = ui.getBoxHeight(this.wA.an.text);
      g = c.windowHeight() - this.wA.testimonialHeight - g - d;
      this.y =
        d +
        Math.floor((g - b) / 2) -
        (this.dTy === f.dTy.m && this.hasStand() ? 34 : 0);
      this.y < d && (this.y = d);
    };
    g.prototype.updCrdDim = function () {
      if (0 !== this.crds.length) {
        var b = this.h - 2 * this.brdH - this.frmT - this.frmB;
        this.vpW =
          this.w -
          2 * this.brdW -
          2 * this.frmL -
          2 * this.padL -
          (this.dTy === f.dTy.t || this.dTy === f.dTy.p ? 4 : 0);
        this.vpH = b - 2 * this.padT;
        this.rMrg = this.vpW / (this.crdWN - 1) / 10;
        this.bMrg = this.vpH / (this.crdHN - 1) / 10;
        this.wc = (this.vpW - (this.crdWN - 1) * this.rMrg) / this.crdWN;
        this.hc = (this.vpH - (this.crdHN - 1) * this.bMrg) / this.crdHN;
      }
    };
    g.prototype.updCrd = function (b) {
      var d = b.ind;
      ui.setWidthHeight(b.el, this.wc, this.hc);
      ui.setLeftTop(
        b.el,
        (d % this.crdWN) * (this.wc + this.rMrg) + this.padL,
        Math.floor(d / this.crdWN) * (this.hc + this.bMrg) + this.padT,
      );
    };
    g.prototype.chkW = function (b) {
      this.minW = 640 < b ? 480 : 300;
      this.w < this.minW && (this.w = this.minW);
    };
    g.prototype.all = function () {
      return this.dEls().concat(this.crdEls());
    };
    g.prototype.dEls = function () {
      return [this.el, this.frm, this.cnt];
    };
    g.prototype.crdEls = function () {
      for (var b = [], d = -1, f = this.crds, g = f.length, l = 0; l < g; l++) {
        var n = f[l];
        b[++d] = n.el;
        b[++d] = n.txt;
      }
      return b;
    };
    g.prototype.emp = function () {
      ui.empty(this.cnt);
      this.crds = [];
    };
    g.prototype.reset = function () {
      ui.deleteClass(
        this.el,
        "monitor board mess phone tablet portrait landscape rotate90 shot stand",
      );
      this.padPcL = this.padPcT = this.frmPcT = this.frmPcL = this.frmPcB = 5;
      this.dTy = f.dTy.d;
    };
    g.prototype.crdN = function () {
      return this.crdWN * this.crdHN;
    };
    return g;
  })();
  f.dev = l;
  l = (function () {
    function f(b, d) {
      this.cols =
        "60a4d2 d26960 29cc29 e61717 1766e6 fddf19 ff7f00 ff00a2 14800d cc2714 62b378 cfffff f5d5e4 ffe1c3 cee3aa f9d977 f3f3f3 cfcfcf".split(
          " ",
        );
      this.sbjs =
        "Math Eng Tech Mus Lun PE Art Read Sci Tech Gym Adv Bio Che Phy His Fre Spa".split(
          " ",
        );
      this.pins = ["", "green", "blue", "yellow"];
      this.dev = b;
      this.ind = d;
      this.bg = "#" + this.cols[num.random(0, this.cols.length - 1)];
      this.pin = this.pins[num.random(0, this.pins.length - 1)];
      this.sbj = this.sbjs[num.random(0, this.sbjs.length - 1)];
      this.el = ui.getDiv("storyCard");
      this.el.style.backgroundColor = this.bg;
      ui.addClass(this.el, this.pin);
      this.txt = ui.getDiv("storyCardText");
      ui.setText(this.txt, this.sbj);
      ui.append(this.txt, this.el);
    }
    f.prototype.mess = function () {
      ui.addClass(this.el, "mess");
      var b = [0, 360, 0, 360, 90];
      ui.setTransform(
        this.el,
        ui.getRotate(b[num.random(0, b.length - 1)] + num.random(-60, 60)) +
          " " +
          ui.getScale(num.random(90, 110) / 100, num.random(90, 110) / 100),
      );
    };
    f.prototype.clean = function () {
      ui.deleteClass(this.el, "mess");
      ui.setTransform(this.el, ui.getRotate(0) + " " + ui.getScale(1, 1));
    };
    return f;
  })();
  f.card = l;
})(w || (w = {}));
(function (f) {
  var l = (function () {
    function f(b) {
      var d = this;
      this._totPrc = 0;
      this.xClk = [!1, !1, !1];
      this.year = 1;
      this.plan = e.planType.free;
      this.planNames = ["Free", "Basic", "Premium"];
      this.years = ["1 year", "2 year", "3 year", "4 year", "5 year"];
      this._is1More = !0;
      this.isMore = !1;
      this.wA = b;
      this.vA = b.vA;
      this.el = b.sections[b.signUpIndex].el;
      this.discounts = ui.find(".discounts", this.el);
      this.totalPanel = ui.find(".totalPanel", this.el);
      this.applyForLowerPrices = ui.find(".applyForLowerPrices", this.el);
      this.discountFadeAnim = new c.fA([this.discounts], 200);
      this.totalFadeAnim = new c.fA([this.totalPanel], 200);
      this.applyForLowerFadeAnim = new c.fA([this.applyForLowerPrices], 200);
      this.discountFadeAnim.ea =
        this.totalFadeAnim.ea =
        this.applyForLowerFadeAnim.ea =
          c.eaTy.oQuad;
      this.planElements = ui.all(".plan", this.el);
      for (b = 0; b < this.planElements.length; b++)
        ui.hasClass(this.planElements[b], "selected") && (this.plan = b + 1);
      b = ui.find(".yrTexts", this.el);
      this.yearEls = ui.children(b);
      this.totalPriceEl = ui.find(".totalPrice", this.el);
      this.yearSlider = c.progress.el(
        this.vA,
        this,
        ui.find(".yrSlide", this.el),
      );
      this.yearSlider.setSlider(!1);
      this.yearSlider.xChange.add(function (b, f) {
        return d.onSlideXChange(b, f);
      });
      this.setYear(this.year, !1, !0);
      ui.clicks(this.planElements, function (b) {
        return d.onPlanClick(b);
      });
      ui.ons(this.planElements, "mouseover", function (b) {
        return d.onPlanOver(b);
      });
      ui.ons(this.planElements, "mouseout", function (b) {
        return d.onPlanOut(b);
      });
      ui.clicks(this.yearEls, function (b) {
        return d.onYearClick(b);
      });
      this.freePrice = ui.find(".price", this.planElements[0]);
      this.basicPrice = ui.find(".price", this.planElements[1]);
      this.basicNoDiscount = ui.find(".noDiscPrice", this.planElements[1]);
      this.basicNoDiscountFadeAnim = new c.fA([this.basicNoDiscount], 200);
      this.premiumPrice = ui.find(".price", this.planElements[2]);
      this.premiumNoDiscount = ui.find(".noDiscPrice", this.planElements[2]);
      this.premiumNoDiscountFadeAnim = new c.fA([this.premiumNoDiscount], 200);
      this.basicNoDiscountFadeAnim.dsp = this.premiumNoDiscountFadeAnim.dsp =
        "inline-block";
      ui.on(this.discounts, "keydown", function (b) {
        return d.onSliderKey(b);
      });
      this.accountPanel = ui.find(".account", this.el);
      this.email = new c.input(ui.find(".email", this.accountPanel));
      this.password = new c.input(ui.find(".password", this.accountPanel));
      this.email.setPlaceholder("Enter your email address");
      this.password.setPlaceholder("Enter desired password");
      this.moreEmailLink = ui.find(".moreInfLink", this.accountPanel);
      this.morePasswordLink = ui.find(".moreInfPsLink", this.accountPanel);
      this.moreEl = ui.find(".moreAccountInfo", this.el);
      ui.clicks([this.moreEmailLink, this.morePasswordLink], function (b) {
        return d.onMoreInfo(b);
      });
      ui.on(this.accountPanel, "keydown", function (b) {
        return d.onAccKey(b);
      });
      this.email.valid.add(function (b) {
        return d.onEmailChange(b);
      });
      this.signUpButton = c.button.el(
        ui.find(".orderNow", this.accountPanel),
        "",
        !1,
        this.vA.log,
      );
      this.checkout = ui.find(".checkout", this.accountPanel);
      this.setSignUpText();
      this.signUpButton.click.add(function (b) {
        return d.onSignUpClick();
      });
      this.vA.resize.add(function (b) {
        return d.resize();
      });
      this.checkHash(this.vA.hash.pairs);
      this.changePlan(this.plan);
      this.vA.events.hashChange.add(function (b) {
        return d.checkHash(b);
      });
      this.vA.events.userChange.add(function () {
        return d.setSignUpText();
      });
    }
    f.prototype.checkHash = function (b) {
      var d = c.getHash(b, "yr");
      d && ((d = num.toInt(d)), 0 < d && 6 > d && this.changeYear(d));
      if ((b = c.getHash(b, "pl")))
        ((b = num.toInt(b)),
          0 < b &&
            4 > b &&
            (this.wA.goSection(this.wA.signUpIndex), this.changePlan(b)));
    };
    f.prototype.onEmailChange = function (b) {
      c.isEmailValid(b) ||
        (this.vA.inf.add(
          "The entered email doesn't seem valid. Please double-check and try again.",
        ),
        this.vA.log.w("Invalid email: " + b));
    };
    f.prototype.onMoreInfo = function (b) {
      ui.stopDefaultPropagation(b);
      this.checkMore();
      this.isMore = !this.isMore;
      b = ui.target(b);
      ui.toggleClass(b, "more", this.isMore);
      ui.setText(
        ui.find(".text", b),
        this.isMore ? "Hide more info" : "Add more info",
      );
      ui.toggle(this.moreEl, this.isMore);
      return !1;
    };
    f.prototype.checkMore = function () {
      var b = this.moreEl;
      this._is1More &&
        ((this._is1More = !1),
        (this.schoolName = new c.input(ui.find(".schoolName", b))),
        (this.address = new c.input(ui.find(".address", b))),
        (this.zip = new c.input(ui.find(".zip", b))),
        (this.city = new c.input(ui.find(".city", b))),
        (this.state = new c.input(ui.find(".stateRegion", b))),
        (this.contactName = new c.input(ui.find(".contactName", b))),
        (this.contactEmail = new c.input(ui.find(".contactEmail", b))),
        (this.contactPhone = new c.input(ui.find(".contactPhone", b))),
        (this.comment = new c.input(ui.find(".comment", b))));
    };
    f.prototype.onSliderKey = function (b) {
      var d = this.years.length,
        f = [1, -1, d, -d];
      b = keys.indexOf(b, [39, 37, 35, 36]);
      return -1 !== b
        ? ((f = this.year + f[b] - 1),
          f > d - 1 ? (f = d - 1) : 0 > f && (f = 0),
          this.setYear(f + 1),
          this.onChange(),
          !1)
        : !0;
    };
    f.prototype.onSlideXChange = function (b, d) {
      var f = ui.getComputedWidth(this.yearSlider.background),
        g = num.round(b / (f / (this.years.length - 1)), 0);
      this.setYear(g + 1, d);
      d && this.yearSlider.setPercentage((b / f) * 100);
      this.onChange();
    };
    f.prototype.onYearClick = function (b) {
      ui.stopDefaultPropagation(b);
      this.changeYear(ui.getParentIndex(ui.target(b)) + 1);
      return !1;
    };
    f.prototype.changeYear = function (b) {
      this.setYear(b);
      this.onChange();
    };
    f.prototype.resize = function () {
      this.setYear(this.year, !1, !0);
    };
    f.prototype.setYear = function (b, d, f) {
      void 0 === d && (d = !1);
      void 0 === f && (f = !1);
      var g = this.year !== b;
      this.year = b;
      f ||
        this.plan !== e.planType.free ||
        this.vA.inf.addTip("Choose Basic or Premium plan to see total price.");
      f = this.yearSlider;
      f.setPercentage((100 / (this.years.length - 1)) * (b - 1));
      g &&
        (ui.deleteClasses(this.yearEls, "selected"),
        ui.addClass(this.yearEls[this.year - 1], "selected"),
        this.vA.log.w(this.year + " year"));
      d ||
        ((d = ui.getComputedWidth(f.el) / (this.years.length - 1)),
        ui.setLeft(
          f.slider,
          num.round(d * (b - 1) - ui.getComputedWidth(f.slider) / 2, 0),
        ),
        ui.setTop(
          f.slider,
          num.round(
            -(ui.getComputedHeight(f.slider) / 2) +
              ui.getComputedHeight(f.el) / 2,
            0,
          ),
        ));
    };
    f.prototype.onPlanClick = function (b) {
      b = ui.target(b);
      var d = 1;
      ui.hasClass(b, "basic") ? (d = 2) : ui.hasClass(b, "premium") && (d = 3);
      this.changePlan(d);
      return !1;
    };
    f.prototype.changePlan = function (b) {
      this.plan = b;
      ui.deleteClasses(this.planElements, "selected over");
      ui.addClass(this.planElements[b - 1], "selected");
      for (
        var d =
            this.plan === e.planType.basic
              ? this.prices().bPrcs
              : this.prices().pPrcs,
          f = d[0],
          g = 0;
        g < this.yearEls.length;
        g++
      ) {
        var l = this.yearEls[g],
          n = num.round(100 - (100 * d[g]) / (f * (g + 1)), 0);
        ui.hint(l, n + "% discount", c.hintPos.top);
      }
      this.prices().showLowerPrices &&
        ((d = ui.find("a", this.applyForLowerPrices)),
        ui.setText(d, "Apply for lower prices"));
      this.plan === e.planType.free
        ? (this.discountFadeAnim.toOut(200),
          this.totalFadeAnim.toOut(200),
          this.applyForLowerFadeAnim.toOut(200))
        : (this.discountFadeAnim.toIn(200),
          this.totalFadeAnim.toIn(200),
          this.applyForLowerFadeAnim.toIn(200));
      ui.setAttribute(
        this.signUpButton.el,
        "type",
        this.plan === e.planType.free ? "button" : "submit",
      );
      this.setSignUpText();
      this.onChange();
      this.vA.log.w(this.planNames[b - 1] + " selected");
    };
    f.prototype.setSignUpText = function () {
      var b = this.plan === e.planType.free,
        d = !!this.vA.config.partnerId;
      this.signUpButton.setText(
        b || d
          ? this.vA.isDemo()
            ? "Start My Free Month"
            : "Continue Evaluation"
          : "Buy Now",
      );
      ui.toggle(this.checkout, !b && !d);
      ui.setHtml(
        this.checkout,
        "For alternative payment methods please contact us.",
      );
    };
    f.prototype.onChange = function () {
      var b = this;
      this.plan === e.planType.free
        ? (this._totPrc = 0)
        : this.plan === e.planType.basic
          ? (this._totPrc = this.prices().bPrcs[this.year - 1])
          : this.plan === e.planType.premium &&
            (this._totPrc = this.prices().pPrcs[this.year - 1]);
      ui.setHtml(this.freePrice, this.getCurrencyPrice(0));
      var d = num.round(this.prices().bPrcs[this.year - 1] / this.year, 0);
      ui.setHtml(this.basicPrice, this.getPricePerYear(d));
      d = num.round(this.prices().pPrcs[this.year - 1] / this.year, 0);
      ui.setHtml(this.premiumPrice, this.getPricePerYear(d));
      var f = this.getCurrencyPrice(this._totPrc);
      f !== ui.getText(this.totalPriceEl) &&
        0 !== this._totPrc &&
        (this.vA.log.w("total price: " + f),
        ui.addClass(this.totalPriceEl, "change"),
        c.timeout(function () {
          ui.deleteClass(ui.setHtml(b.totalPriceEl, f), "change");
        }, 100));
      1 < this.year
        ? (ui.setHtml(
            this.basicNoDiscount,
            "<span>" + this.getPricePerYear(this.prices().bPrcs[0]) + "</span>",
          ),
          this.basicNoDiscountFadeAnim.toIn(200),
          ui.setHtml(
            this.premiumNoDiscount,
            "<span>" + this.getPricePerYear(this.prices().pPrcs[0]) + "</span>",
          ),
          this.premiumNoDiscountFadeAnim.toIn(200))
        : (this.basicNoDiscountFadeAnim.toOut(200),
          this.premiumNoDiscountFadeAnim.toOut(200));
    };
    f.prototype.getCurrencySign = function () {
      return e.getCurrencyChar(this.prices().curr);
    };
    f.prototype.getCurrencyPrice = function (b) {
      return this.getCurrencySign() + b;
    };
    f.prototype.getPricePerYear = function (b) {
      return this.getCurrencyPrice(b) + "/yr.";
    };
    f.prototype.onPlanOver = function (b) {
      b = ui.target(b);
      ui.getParentIndex(b) + 1 !== this.plan && ui.addClass(b, "over");
    };
    f.prototype.onPlanOut = function (b) {
      b = ui.target(b);
      ui.getParentIndex(b) + 1 !== this.plan && ui.deleteClass(b, "over");
    };
    f.prototype.onAccKey = function (b) {
      return keys.enter(b) ? (this.onSignUpClick(), !1) : !0;
    };
    f.prototype.setUserPassword = function () {
      var b = this.vA.isDemo();
      this.email.setValue(b ? "" : this.vA.config.user.email);
      this.email.enable(b);
      this.password.enable(b);
      ui.toggles(
        [
          ui.find(".passwordLbl", this.el),
          this.password.el,
          this.morePasswordLink,
        ],
        b,
      );
      ui.toggle(this.moreEmailLink, !b);
    };
    f.prototype.fill = function (b) {
      this.checkMore();
      this.setUserPassword();
      this.schoolName.setValue(b ? b.name : "");
      this.address.setValue(b ? b.address : "");
      this.zip.setValue(b ? b.zip : "");
      this.city.setValue(b ? b.city : "");
      this.state.setValue(b ? b.state : "");
      this.contactName.setValue(b ? b.contactName : "");
      this.contactEmail.setValue(b ? b.contactEmail : "");
      this.contactPhone.setValue(b ? b.phone : "");
      this.comment.setValue(b ? b.comment : "");
    };
    f.prototype.onSignUpClick = function () {
      var b = this;
      if (!this.vA.isMaker()) {
        var d = c.input.getEmail(this.email),
          f = this.password.getValue(),
          g = this.plan,
          l = this.year,
          n = g === e.planType.free;
        !this.vA.isDemo() || (d && f)
          ? this.vA._mA._isAb && n
            ? this.vA._mA.abrMsg()
            : (this.checkMore(),
              (g = this.acc =
                {
                  year: l,
                  plan: g,
                  name: this.schoolName.getValue(),
                  address: this.address.getValue(),
                  state: this.state.getValue(),
                  zip: this.zip.getValue(),
                  city: this.city.getValue(),
                  contactName: this.contactName.getValue(),
                  contactEmail: this.contactEmail.getValue(),
                  phone: this.contactPhone.getValue(),
                  comment: this.comment.getValue(),
                }),
              (d = {
                user: {
                  email: d,
                  password: f,
                },
              }),
              (f = this.vA.storage.get(c.infoKey, !0)),
              (d = __assign(__assign(__assign({}, g), d), f)),
              this.vA.post("schools/sign-up/", d, {
                done: function (d) {
                  return b.onSignUpResponse(d);
                },
              }),
              this.signUpButton.enable(!1))
          : this.vA.inf.add("Email and password are mandatory.");
      }
    };
    f.prototype.onSignUpResponse = function (b) {
      var d = this;
      c.checkSuccess(b, this.vA)
        ? ((b = b.data),
          a.prepareConfig(b),
          this.vA._mA.loginView().afterSignIn(b),
          this.acc.plan === e.planType.free
            ? (this.vA._mA.switchToMaker(),
              b.isSignUp &&
                this.vA.inf.mandatory(
                  "Welcome and thanks for signing up! " +
                    this.vA.addWatchIntroVideos() +
                    " to get started quickly",
                ),
              this.signUpButton.enable(!0))
            : ((b = e.getRealProductId(
                (this._totPrc + 1) / 50,
                this.prices().curr,
              )),
              c.timeout(function () {
                return d.signUpButton.enable(!0);
              }, 3e3),
              (b = e.getPurchaseUrl(b)),
              this.vA.url.goto(b)))
        : (this.vA.log.w("Sign up failed for " + this.email.getValue()),
          this.signUpButton.enable(!0));
    };
    f.prototype.prices = function () {
      return this.vA.config.prices;
    };
    return f;
  })();
  f.sgnUp = l;
})(w || (w = {}));
(function (f) {
  var l = (function () {
    function f(b, d) {
      this.xClk = [!1, !1];
      this.ratio = 1.7778;
      this.isPlaying = this.isPlayed = !1;
      this.options = d;
      this.container = b;
      this.preOpened = c.callback();
      this.closed = c.callback();
    }
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      this.background = ui.find(".videoBackground", this.container);
      this.video = ui.find(".video", this.container);
      ui.setAttribute(this.video, "autoplay", "autoplay");
      this.closeIcon = ui.find(".closeVideo", this.container);
      ui.clicks([this.background, this.closeIcon], function (d) {
        return b.close(d);
      });
      this.options &&
        this.options.viewer &&
        this.options.viewer.resize.add(function (d) {
          return b.onResize();
        });
      this.backgroundFade = new c.fA([this.background], 300);
      this.videoFade = new c.fA([this.video], 300);
      this.backgroundFade.ea = this.videoFade.ea = c.eaTy.oQuad;
      this.sb = new c.sb([this.backgroundFade, this.videoFade]);
    };
    f.prototype.play = function (b, d) {
      this.init();
      this.preOpened.fire((d || {}).ev);
      this.isPlayed = this.isPlaying = !0;
      this.onResize();
      this.src() !== b && ui.setAttribute(this.video, "src", b);
      this.video.play();
      this.backgroundFade.toIn(300, 1);
      this.videoFade.toIn(300);
      this.toggleClose(!0);
    };
    f.prototype.pause = function () {
      this.init();
      this.isPlaying = !1;
      this.video.pause();
    };
    f.prototype.close = function (b) {
      this.isPlaying &&
        (this.init(),
        this.backgroundFade.toOut(300),
        this.videoFade.toOut(300),
        this.toggleClose(!1),
        this.pause(),
        this.closed.fire(b));
    };
    f.prototype.toggleClose = function (b) {
      ui.toggle(this.closeIcon, b);
    };
    f.prototype.src = function () {
      return ui.getAttribute(this.video, "src");
    };
    f.prototype.onResize = function () {
      if (this.isPlaying) {
        this.init();
        var b = c.windowWidth() - c.scrollWidth(),
          d = c.windowHeight(),
          f = b;
        320 > f && (f = 320);
        var g = Math.min(Math.ceil(f / this.ratio), d);
        ui.setLeftTop(this.background, 0, 0);
        ui.setWidthHeight(this.background, b, d);
        ui.setAttribute(
          ui.setAttribute(this.video, "width", c.px(f)),
          "height",
          c.px(g),
        );
        ui.setLeftTop(this.video, 0, 0);
      }
    };
    return f;
  })();
  f.player = l;
})(w || (w = {}));
