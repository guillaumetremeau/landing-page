var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 == "object" || typeof from2 == "function")
    for (let key of __getOwnPropNames(from2))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse2;
    exports.serialize = serialize2;
    var decode = decodeURIComponent, encode = encodeURIComponent, fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse2(str, options) {
      if (typeof str != "string")
        throw new TypeError("argument str must be a string");
      for (var obj = {}, opt = options || {}, pairs = str.split(";"), dec = opt.decode || decode, i = 0; i < pairs.length; i++) {
        var pair = pairs[i], index = pair.indexOf("=");
        if (!(index < 0)) {
          var key = pair.substring(0, index).trim();
          if (obj[key] == null) {
            var val = pair.substring(index + 1, pair.length).trim();
            val[0] === '"' && (val = val.slice(1, -1)), obj[key] = tryDecode(val, dec);
          }
        }
      }
      return obj;
    }
    function serialize2(name, val, options) {
      var opt = options || {}, enc = opt.encode || encode;
      if (typeof enc != "function")
        throw new TypeError("option encode is invalid");
      if (!fieldContentRegExp.test(name))
        throw new TypeError("argument name is invalid");
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value))
        throw new TypeError("argument val is invalid");
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge))
          throw new TypeError("option maxAge is invalid");
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain))
          throw new TypeError("option domain is invalid");
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path))
          throw new TypeError("option path is invalid");
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString != "function")
          throw new TypeError("option expires is invalid");
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly && (str += "; HttpOnly"), opt.secure && (str += "; Secure"), opt.sameSite) {
        var sameSite = typeof opt.sameSite == "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case !0:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch {
        return str;
      }
    }
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/warnings.js
function warnOnce(condition, message) {
  !condition && !alreadyWarned[message] && (alreadyWarned[message] = !0, console.warn(message));
}
var alreadyWarned, init_warnings = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/warnings.js"() {
    alreadyWarned = {};
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/cookies.js
async function encodeCookieValue(sign, value, secrets) {
  let encoded = encodeData(value);
  return secrets.length > 0 && (encoded = await sign(encoded, secrets[0])), encoded;
}
async function decodeCookieValue(unsign, value, secrets) {
  if (secrets.length > 0) {
    for (let secret of secrets) {
      let unsignedValue = await unsign(value, secret);
      if (unsignedValue !== !1)
        return decodeData(unsignedValue);
    }
    return null;
  }
  return decodeData(value);
}
function encodeData(value) {
  return btoa(myUnescape(encodeURIComponent(JSON.stringify(value))));
}
function decodeData(value) {
  try {
    return JSON.parse(decodeURIComponent(myEscape(atob(value))));
  } catch {
    return {};
  }
}
function myEscape(value) {
  let str = value.toString(), result = "", index = 0, chr, code;
  for (; index < str.length; )
    chr = str.charAt(index++), /[\w*+\-./@]/.exec(chr) ? result += chr : (code = chr.charCodeAt(0), code < 256 ? result += "%" + hex(code, 2) : result += "%u" + hex(code, 4).toUpperCase());
  return result;
}
function hex(code, length) {
  let result = code.toString(16);
  for (; result.length < length; )
    result = "0" + result;
  return result;
}
function myUnescape(value) {
  let str = value.toString(), result = "", index = 0, chr, part;
  for (; index < str.length; ) {
    if (chr = str.charAt(index++), chr === "%") {
      if (str.charAt(index) === "u") {
        if (part = str.slice(index + 1, index + 5), /^[\da-f]{4}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16)), index += 5;
          continue;
        }
      } else if (part = str.slice(index, index + 2), /^[\da-f]{2}$/i.exec(part)) {
        result += String.fromCharCode(parseInt(part, 16)), index += 2;
        continue;
      }
    }
    result += chr;
  }
  return result;
}
function warnOnceAboutExpiresCookie(name, expires) {
  warnOnce(!expires, `The "${name}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`);
}
var import_cookie, createCookieFactory, isCookie, init_cookies = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/cookies.js"() {
    import_cookie = __toESM(require_cookie());
    init_warnings();
    createCookieFactory = ({
      sign,
      unsign
    }) => (name, cookieOptions = {}) => {
      let {
        secrets,
        ...options
      } = {
        secrets: [],
        path: "/",
        sameSite: "lax",
        ...cookieOptions
      };
      return warnOnceAboutExpiresCookie(name, options.expires), {
        get name() {
          return name;
        },
        get isSigned() {
          return secrets.length > 0;
        },
        get expires() {
          return typeof options.maxAge < "u" ? new Date(Date.now() + options.maxAge * 1e3) : options.expires;
        },
        async parse(cookieHeader, parseOptions) {
          if (!cookieHeader)
            return null;
          let cookies = (0, import_cookie.parse)(cookieHeader, {
            ...options,
            ...parseOptions
          });
          return name in cookies ? cookies[name] === "" ? "" : await decodeCookieValue(unsign, cookies[name], secrets) : null;
        },
        async serialize(value, serializeOptions) {
          return (0, import_cookie.serialize)(name, value === "" ? "" : await encodeCookieValue(sign, value, secrets), {
            ...options,
            ...serializeOptions
          });
        }
      };
    }, isCookie = (object) => object != null && typeof object.name == "string" && typeof object.isSigned == "boolean" && typeof object.parse == "function" && typeof object.serialize == "function";
  }
});

// node_modules/@web3-storage/multipart-parser/esm/src/utils.js
function stringToArray(s) {
  let utf8 = unescape(encodeURIComponent(s));
  return Uint8Array.from(utf8, (_2, i) => utf8.charCodeAt(i));
}
function arrayToString(a) {
  let utf8 = String.fromCharCode.apply(null, a);
  return decodeURIComponent(escape(utf8));
}
function mergeArrays(...arrays) {
  let out = new Uint8Array(arrays.reduce((total, arr) => total + arr.length, 0)), offset = 0;
  for (let arr of arrays)
    out.set(arr, offset), offset += arr.length;
  return out;
}
function arraysEqual(a, b) {
  if (a.length !== b.length)
    return !1;
  for (let i = 0; i < a.length; i++)
    if (a[i] !== b[i])
      return !1;
  return !0;
}
var init_utils = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/utils.js"() {
  }
});

// node_modules/@web3-storage/multipart-parser/esm/src/search.js
function coerce(a) {
  return a instanceof Uint8Array ? (index) => a[index] : a;
}
function jsmemcmp(buf1, pos1, buf2, pos2, len) {
  let fn1 = coerce(buf1), fn2 = coerce(buf2);
  for (let i = 0; i < len; ++i)
    if (fn1(pos1 + i) !== fn2(pos2 + i))
      return !1;
  return !0;
}
function createOccurenceTable(s) {
  let table = new Array(256).fill(s.length);
  if (s.length > 1)
    for (let i = 0; i < s.length - 1; i++)
      table[s[i]] = s.length - 1 - i;
  return table;
}
var MATCH, StreamSearch, ReadableStreamSearch, EOQ, QueueableStreamSearch, init_search = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/search.js"() {
    init_utils();
    MATCH = Symbol("Match"), StreamSearch = class {
      constructor(needle) {
        this._lookbehind = new Uint8Array(), typeof needle == "string" ? this._needle = needle = stringToArray(needle) : this._needle = needle, this._lastChar = needle[needle.length - 1], this._occ = createOccurenceTable(needle);
      }
      feed(chunk) {
        let pos = 0, tokens, allTokens = [];
        for (; pos !== chunk.length; )
          [pos, ...tokens] = this._feed(chunk, pos), allTokens.push(...tokens);
        return allTokens;
      }
      end() {
        let tail = this._lookbehind;
        return this._lookbehind = new Uint8Array(), tail;
      }
      _feed(data, bufPos) {
        let tokens = [], pos = -this._lookbehind.length;
        if (pos < 0) {
          for (; pos < 0 && pos <= data.length - this._needle.length; ) {
            let ch = this._charAt(data, pos + this._needle.length - 1);
            if (ch === this._lastChar && this._memcmp(data, pos, this._needle.length - 1))
              return pos > -this._lookbehind.length && tokens.push(this._lookbehind.slice(0, this._lookbehind.length + pos)), tokens.push(MATCH), this._lookbehind = new Uint8Array(), [
                pos + this._needle.length,
                ...tokens
              ];
            pos += this._occ[ch];
          }
          if (pos < 0)
            for (; pos < 0 && !this._memcmp(data, pos, data.length - pos); )
              pos++;
          if (pos >= 0)
            tokens.push(this._lookbehind), this._lookbehind = new Uint8Array();
          else {
            let bytesToCutOff = this._lookbehind.length + pos;
            return bytesToCutOff > 0 && (tokens.push(this._lookbehind.slice(0, bytesToCutOff)), this._lookbehind = this._lookbehind.slice(bytesToCutOff)), this._lookbehind = Uint8Array.from(new Array(this._lookbehind.length + data.length), (_2, i) => this._charAt(data, i - this._lookbehind.length)), [
              data.length,
              ...tokens
            ];
          }
        }
        for (pos += bufPos; pos <= data.length - this._needle.length; ) {
          let ch = data[pos + this._needle.length - 1];
          if (ch === this._lastChar && data[pos] === this._needle[0] && jsmemcmp(this._needle, 0, data, pos, this._needle.length - 1))
            return pos > bufPos && tokens.push(data.slice(bufPos, pos)), tokens.push(MATCH), [
              pos + this._needle.length,
              ...tokens
            ];
          pos += this._occ[ch];
        }
        if (pos < data.length) {
          for (; pos < data.length && (data[pos] !== this._needle[0] || !jsmemcmp(data, pos, this._needle, 0, data.length - pos)); )
            ++pos;
          pos < data.length && (this._lookbehind = data.slice(pos));
        }
        return pos > 0 && tokens.push(data.slice(bufPos, pos < data.length ? pos : data.length)), [
          data.length,
          ...tokens
        ];
      }
      _charAt(data, pos) {
        return pos < 0 ? this._lookbehind[this._lookbehind.length + pos] : data[pos];
      }
      _memcmp(data, pos, len) {
        return jsmemcmp(this._charAt.bind(this, data), pos, this._needle, 0, len);
      }
    }, ReadableStreamSearch = class {
      constructor(needle, _readableStream) {
        this._readableStream = _readableStream, this._search = new StreamSearch(needle);
      }
      async *[Symbol.asyncIterator]() {
        let reader = this._readableStream.getReader();
        try {
          for (; ; ) {
            let result = await reader.read();
            if (result.done)
              break;
            yield* this._search.feed(result.value);
          }
          let tail = this._search.end();
          tail.length && (yield tail);
        } finally {
          reader.releaseLock();
        }
      }
    }, EOQ = Symbol("End of Queue"), QueueableStreamSearch = class {
      constructor(needle) {
        this._chunksQueue = [], this._closed = !1, this._search = new StreamSearch(needle);
      }
      push(...chunks) {
        if (this._closed)
          throw new Error("cannot call push after close");
        this._chunksQueue.push(...chunks), this._notify && this._notify();
      }
      close() {
        if (this._closed)
          throw new Error("close was already called");
        this._closed = !0, this._chunksQueue.push(EOQ), this._notify && this._notify();
      }
      async *[Symbol.asyncIterator]() {
        for (; ; ) {
          let chunk;
          for (; !(chunk = this._chunksQueue.shift()); )
            await new Promise((resolve) => this._notify = resolve), this._notify = void 0;
          if (chunk === EOQ)
            break;
          yield* this._search.feed(chunk);
        }
        let tail = this._search.end();
        tail.length && (yield tail);
      }
    };
  }
});

// node_modules/@web3-storage/multipart-parser/esm/src/index.js
function parseContentDisposition(header) {
  let parts = header.split(";").map((part) => part.trim());
  if (parts.shift() !== "form-data")
    throw new Error('malformed content-disposition header: missing "form-data" in `' + JSON.stringify(parts) + "`");
  let out = {};
  for (let part of parts) {
    let kv = part.split("=", 2);
    if (kv.length !== 2)
      throw new Error("malformed content-disposition header: key-value pair not found - " + part + " in `" + header + "`");
    let [name, value] = kv;
    if (value[0] === '"' && value[value.length - 1] === '"')
      out[name] = value.slice(1, -1).replace(/\\"/g, '"');
    else if (value[0] !== '"' && value[value.length - 1] !== '"')
      out[name] = value;
    else if (value[0] === '"' && value[value.length - 1] !== '"' || value[0] !== '"' && value[value.length - 1] === '"')
      throw new Error("malformed content-disposition header: mismatched quotations in `" + header + "`");
  }
  if (!out.name)
    throw new Error("malformed content-disposition header: missing field name in `" + header + "`");
  return out;
}
function parsePartHeaders(lines) {
  let entries = [], disposition = !1, line;
  for (; typeof (line = lines.shift()) < "u"; ) {
    let colon = line.indexOf(":");
    if (colon === -1)
      throw new Error("malformed multipart-form header: missing colon");
    let header = line.slice(0, colon).trim().toLowerCase(), value = line.slice(colon + 1).trim();
    switch (header) {
      case "content-disposition":
        disposition = !0, entries.push(...Object.entries(parseContentDisposition(value)));
        break;
      case "content-type":
        entries.push([
          "contentType",
          value
        ]);
    }
  }
  if (!disposition)
    throw new Error("malformed multipart-form header: missing content-disposition");
  return Object.fromEntries(entries);
}
async function readHeaderLines(it, needle) {
  let firstChunk = !0, lastTokenWasMatch = !1, headerLines = [[]], crlfSearch = new StreamSearch(CRLF);
  for (; ; ) {
    let result = await it.next();
    if (result.done)
      throw new Error("malformed multipart-form data: unexpected end of stream");
    if (firstChunk && result.value !== MATCH && arraysEqual(result.value.slice(0, 2), dash))
      return [
        void 0,
        new Uint8Array()
      ];
    let chunk;
    if (result.value !== MATCH)
      chunk = result.value;
    else if (!lastTokenWasMatch)
      chunk = needle;
    else
      throw new Error("malformed multipart-form data: unexpected boundary");
    if (!chunk.length)
      continue;
    firstChunk && (firstChunk = !1);
    let tokens = crlfSearch.feed(chunk);
    for (let [i, token] of tokens.entries()) {
      let isMatch = token === MATCH;
      if (!(!isMatch && !token.length)) {
        if (lastTokenWasMatch && isMatch)
          return tokens.push(crlfSearch.end()), [
            headerLines.filter((chunks) => chunks.length).map(mergeArrays2).map(arrayToString),
            mergeArrays(...tokens.slice(i + 1).map((token2) => token2 === MATCH ? CRLF : token2))
          ];
        (lastTokenWasMatch = isMatch) ? headerLines.push([]) : headerLines[headerLines.length - 1].push(token);
      }
    }
  }
}
async function* streamMultipart(body, boundary) {
  let needle = mergeArrays(dash, stringToArray(boundary)), it = new ReadableStreamSearch(needle, body)[Symbol.asyncIterator]();
  for (; ; ) {
    let result = await it.next();
    if (result.done)
      return;
    if (result.value === MATCH)
      break;
  }
  let crlfSearch = new StreamSearch(CRLF);
  for (; ; ) {
    let feedChunk = function(chunk) {
      let chunks = [];
      for (let token of crlfSearch.feed(chunk))
        trailingCRLF && chunks.push(CRLF), (trailingCRLF = token === MATCH) || chunks.push(token);
      return mergeArrays(...chunks);
    }, [headerLines, tail] = await readHeaderLines(it, needle);
    if (!headerLines)
      return;
    async function nextToken() {
      let result = await it.next();
      if (result.done)
        throw new Error("malformed multipart-form data: unexpected end of stream");
      return result;
    }
    let trailingCRLF = !1, done2 = !1;
    async function nextChunk() {
      let result = await nextToken(), chunk;
      if (result.value !== MATCH)
        chunk = result.value;
      else if (!trailingCRLF)
        chunk = CRLF;
      else
        return done2 = !0, { value: crlfSearch.end() };
      return { value: feedChunk(chunk) };
    }
    let bufferedChunks = [{ value: feedChunk(tail) }];
    for (yield {
      ...parsePartHeaders(headerLines),
      data: {
        [Symbol.asyncIterator]() {
          return this;
        },
        async next() {
          for (; ; ) {
            let result = bufferedChunks.shift();
            if (!result)
              break;
            if (result.value.length > 0)
              return result;
          }
          for (; ; ) {
            if (done2)
              return {
                done: done2,
                value: void 0
              };
            let result = await nextChunk();
            if (result.value.length > 0)
              return result;
          }
        }
      }
    }; !done2; )
      bufferedChunks.push(await nextChunk());
  }
}
var mergeArrays2, dash, CRLF, init_src = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/index.js"() {
    init_search();
    init_utils();
    mergeArrays2 = Function.prototype.apply.bind(mergeArrays, void 0), dash = stringToArray("--"), CRLF = stringToArray(`\r
`);
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/formData.js
function composeUploadHandlers(...handlers) {
  return async (part) => {
    for (let handler of handlers) {
      let value = await handler(part);
      if (typeof value < "u" && value !== null)
        return value;
    }
  };
}
async function parseMultipartFormData(request, uploadHandler) {
  let contentType = request.headers.get("Content-Type") || "", [type, boundary] = contentType.split(/\s*;\s*boundary=/);
  if (!request.body || !boundary || type !== "multipart/form-data")
    throw new TypeError("Could not parse content as FormData.");
  let formData = new FormData(), parts = streamMultipart(request.body, boundary);
  for await (let part of parts) {
    if (part.done)
      break;
    typeof part.filename == "string" && (part.filename = part.filename.split(/[/\\]/).pop());
    let value = await uploadHandler(part);
    typeof value < "u" && value !== null && formData.append(part.name, value);
  }
  return formData;
}
var init_formData = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/formData.js"() {
    init_src();
  }
});

// node_modules/@remix-run/router/dist/router.js
var router_exports = {};
__export(router_exports, {
  AbortedDeferredError: () => AbortedDeferredError,
  Action: () => Action,
  ErrorResponse: () => ErrorResponse,
  IDLE_BLOCKER: () => IDLE_BLOCKER,
  IDLE_FETCHER: () => IDLE_FETCHER,
  IDLE_NAVIGATION: () => IDLE_NAVIGATION,
  UNSAFE_DEFERRED_SYMBOL: () => UNSAFE_DEFERRED_SYMBOL,
  UNSAFE_DeferredData: () => DeferredData,
  UNSAFE_convertRoutesToDataRoutes: () => convertRoutesToDataRoutes,
  UNSAFE_getPathContributingMatches: () => getPathContributingMatches,
  createBrowserHistory: () => createBrowserHistory,
  createHashHistory: () => createHashHistory,
  createMemoryHistory: () => createMemoryHistory,
  createPath: () => createPath,
  createRouter: () => createRouter,
  createStaticHandler: () => createStaticHandler,
  defer: () => defer,
  generatePath: () => generatePath,
  getStaticContextFromError: () => getStaticContextFromError,
  getToPathname: () => getToPathname,
  invariant: () => invariant,
  isRouteErrorResponse: () => isRouteErrorResponse,
  joinPaths: () => joinPaths,
  json: () => json,
  matchPath: () => matchPath,
  matchRoutes: () => matchRoutes,
  normalizePathname: () => normalizePathname,
  parsePath: () => parsePath,
  redirect: () => redirect,
  resolvePath: () => resolvePath,
  resolveTo: () => resolveTo,
  stripBasename: () => stripBasename,
  warning: () => warning
});
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends.apply(this, arguments);
}
function createMemoryHistory(options) {
  options === void 0 && (options = {});
  let {
    initialEntries = ["/"],
    initialIndex,
    v5Compat = !1
  } = options, entries;
  entries = initialEntries.map((entry2, index2) => createMemoryLocation(entry2, typeof entry2 == "string" ? null : entry2.state, index2 === 0 ? "default" : void 0));
  let index = clampIndex(initialIndex ?? entries.length - 1), action = Action.Pop, listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state, key) {
    state === void 0 && (state = null);
    let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    return warning$1(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to)), location;
  }
  function createHref(to) {
    return typeof to == "string" ? to : createPath(to);
  }
  return {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref,
    createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to == "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = Action.Push;
      let nextLocation = createMemoryLocation(to, state);
      index += 1, entries.splice(index, entries.length, nextLocation), v5Compat && listener && listener({
        action,
        location: nextLocation,
        delta: 1
      });
    },
    replace(to, state) {
      action = Action.Replace;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation, v5Compat && listener && listener({
        action,
        location: nextLocation,
        delta: 0
      });
    },
    go(delta) {
      action = Action.Pop;
      let nextIndex = clampIndex(index + delta), nextLocation = entries[nextIndex];
      index = nextIndex, listener && listener({
        action,
        location: nextLocation,
        delta
      });
    },
    listen(fn) {
      return listener = fn, () => {
        listener = null;
      };
    }
  };
}
function createBrowserHistory(options) {
  options === void 0 && (options = {});
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to == "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function createHashHistory(options) {
  options === void 0 && (options = {});
  function createHashLocation(window2, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window2.location.hash.substr(1));
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createHashHref(window2, to) {
    let base = window2.document.querySelector("base"), href = "";
    if (base && base.getAttribute("href")) {
      let url = window2.location.href, hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to == "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning$1(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }
  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
  if (value === !1 || value === null || typeof value > "u")
    throw new Error(message);
}
function warning$1(cond, message) {
  if (!cond) {
    typeof console < "u" && console.warn(message);
    try {
      throw new Error(message);
    } catch {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
function createLocation(current, to, state, key) {
  return state === void 0 && (state = null), _extends({
    pathname: typeof current == "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to == "string" ? parsePath(to) : to, {
    state,
    key: to && to.key || key || createKey()
  });
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  return search && search !== "?" && (pathname += search.charAt(0) === "?" ? search : "?" + search), hash && hash !== "#" && (pathname += hash.charAt(0) === "#" ? hash : "#" + hash), pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    hashIndex >= 0 && (parsedPath.hash = path.substr(hashIndex), path = path.substr(0, hashIndex));
    let searchIndex = path.indexOf("?");
    searchIndex >= 0 && (parsedPath.search = path.substr(searchIndex), path = path.substr(0, searchIndex)), path && (parsedPath.pathname = path);
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  options === void 0 && (options = {});
  let {
    window: window2 = document.defaultView,
    v5Compat = !1
  } = options, globalHistory = window2.history, action = Action.Pop, listener = null, index = getIndex();
  index == null && (index = 0, globalHistory.replaceState(_extends({}, globalHistory.state, {
    idx: index
  }), ""));
  function getIndex() {
    return (globalHistory.state || {
      idx: null
    }).idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex(), delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex, listener && listener({
      action,
      location: history.location,
      delta
    });
  }
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    validateLocation && validateLocation(location, to), index = getIndex() + 1;
    let historyState = getHistoryState(location, index), url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch {
      window2.location.assign(url);
    }
    v5Compat && listener && listener({
      action,
      location: history.location,
      delta: 1
    });
  }
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    validateLocation && validateLocation(location, to), index = getIndex();
    let historyState = getHistoryState(location, index), url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url), v5Compat && listener && listener({
      action,
      location: history.location,
      delta: 0
    });
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href, href = typeof to == "string" ? to : createPath(to);
    return invariant(base, "No window.location.(origin|href) available to create URL for href: " + href), new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener)
        throw new Error("A history only accepts one active listener");
      return window2.addEventListener(PopStateEventType, handlePop), listener = fn, () => {
        window2.removeEventListener(PopStateEventType, handlePop), listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
function isIndexRoute(route) {
  return route.index === !0;
}
function convertRoutesToDataRoutes(routes2, parentPath, allIds) {
  return parentPath === void 0 && (parentPath = []), allIds === void 0 && (allIds = /* @__PURE__ */ new Set()), routes2.map((route, index) => {
    let treePath = [...parentPath, index], id = typeof route.id == "string" ? route.id : treePath.join("-");
    return invariant(route.index !== !0 || !route.children, "Cannot specify children on an index route"), invariant(!allIds.has(id), 'Found a route id collision on id "' + id + `".  Route id's must be globally unique within Data Router usages`), allIds.add(id), isIndexRoute(route) ? _extends({}, route, {
      id
    }) : _extends({}, route, {
      id,
      children: route.children ? convertRoutesToDataRoutes(route.children, treePath, allIds) : void 0
    });
  });
}
function matchRoutes(routes2, locationArg, basename) {
  basename === void 0 && (basename = "/");
  let location = typeof locationArg == "string" ? parsePath(locationArg) : locationArg, pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null)
    return null;
  let branches = flattenRoutes(routes2);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i)
    matches = matchRouteBranch(
      branches[i],
      safelyDecodeURI(pathname)
    );
  return matches;
}
function flattenRoutes(routes2, branches, parentsMeta, parentPath) {
  branches === void 0 && (branches = []), parentsMeta === void 0 && (parentsMeta = []), parentPath === void 0 && (parentPath = "");
  let flattenRoute = (route, index, relativePath) => {
    let meta2 = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === !0,
      childrenIndex: index,
      route
    };
    meta2.relativePath.startsWith("/") && (invariant(meta2.relativePath.startsWith(parentPath), 'Absolute route path "' + meta2.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), meta2.relativePath = meta2.relativePath.slice(parentPath.length));
    let path = joinPaths([parentPath, meta2.relativePath]), routesMeta = parentsMeta.concat(meta2);
    route.children && route.children.length > 0 && (invariant(
      route.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
    ), flattenRoutes(route.children, branches, routesMeta, path)), !(route.path == null && !route.index) && branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  return routes2.forEach((route, index) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?")))
      flattenRoute(route, index);
    else
      for (let exploded of explodeOptionalSegments(route.path))
        flattenRoute(route, index, exploded);
  }), branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0)
    return [];
  let [first, ...rest] = segments, isOptional = first.endsWith("?"), required = first.replace(/\?$/, "");
  if (rest.length === 0)
    return isOptional ? [required, ""] : [required];
  let restExploded = explodeOptionalSegments(rest.join("/")), result = [];
  return result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/"))), isOptional && result.push(...restExploded), result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta2) => meta2.childrenIndex), b.routesMeta.map((meta2) => meta2.childrenIndex)));
}
function computeScore(path, index) {
  let segments = path.split("/"), initialScore = segments.length;
  return segments.some(isSplat) && (initialScore += splatPenalty), index && (initialScore += indexRouteValue), segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  return a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]) ? a[a.length - 1] - b[b.length - 1] : 0;
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch, matchedParams = {}, matchedPathname = "/", matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta2 = routesMeta[i], end = i === routesMeta.length - 1, remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/", match = matchPath({
      path: meta2.relativePath,
      caseSensitive: meta2.caseSensitive,
      end
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = meta2.route;
    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    }), match.pathnameBase !== "/" && (matchedPathname = joinPaths([matchedPathname, match.pathnameBase]));
  }
  return matches;
}
function generatePath(originalPath, params) {
  params === void 0 && (params = {});
  let path = originalPath;
  return path.endsWith("*") && path !== "*" && !path.endsWith("/*") && (warning(!1, 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".')), path = path.replace(/\*$/, "/*")), path.replace(/^:(\w+)(\??)/g, (_2, key, optional) => {
    let param = params[key];
    return optional === "?" ? param ?? "" : (param == null && invariant(!1, 'Missing ":' + key + '" param'), param);
  }).replace(/\/:(\w+)(\??)/g, (_2, key, optional) => {
    let param = params[key];
    return optional === "?" ? param == null ? "" : "/" + param : (param == null && invariant(!1, 'Missing ":' + key + '" param'), "/" + param);
  }).replace(/\?/g, "").replace(/(\/?)\*/, (_2, prefix, __, str) => {
    let star = "*";
    return params[star] == null ? str === "/*" ? "/" : "" : "" + prefix + params[star];
  });
}
function matchPath(pattern, pathname) {
  typeof pattern == "string" && (pattern = {
    path: pattern,
    caseSensitive: !1,
    end: !0
  });
  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end), match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0], pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1"), captureGroups = match.slice(1);
  return {
    params: paramNames.reduce((memo2, paramName, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      return memo2[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName), memo2;
    }, {}),
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  caseSensitive === void 0 && (caseSensitive = !1), end === void 0 && (end = !0), warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let paramNames = [], regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, (_2, paramName) => (paramNames.push(paramName), "/([^\\/]+)"));
  return path.endsWith("*") ? (paramNames.push("*"), regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : end ? regexpSource += "\\/*$" : path !== "" && path !== "/" && (regexpSource += "(?:(?=\\/|$))"), [new RegExp(regexpSource, caseSensitive ? void 0 : "i"), paramNames];
}
function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    return warning(!1, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ").")), value;
  }
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return warning(!1, 'The value for the URL param "' + paramName + '" will not be decoded because' + (' the string "' + value + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + error + ").")), value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase()))
    return null;
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length, nextChar = pathname.charAt(startIndex);
  return nextChar && nextChar !== "/" ? null : pathname.slice(startIndex) || "/";
}
function warning(cond, message) {
  if (!cond) {
    typeof console < "u" && console.warn(message);
    try {
      throw new Error(message);
    } catch {
    }
  }
}
function resolvePath(to, fromPathname) {
  fromPathname === void 0 && (fromPathname = "/");
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to == "string" ? parsePath(to) : to;
  return {
    pathname: toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  return relativePath.split("/").forEach((segment) => {
    segment === ".." ? segments.length > 1 && segments.pop() : segment !== "." && segments.push(segment);
  }), segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  isPathRelative === void 0 && (isPathRelative = !1);
  let to;
  typeof toArg == "string" ? to = parsePath(toArg) : (to = _extends({}, toArg), invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to)), invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to)), invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to)));
  let isEmptyPath = toArg === "" || to.pathname === "", toPathname = isEmptyPath ? "/" : to.pathname, from2;
  if (isPathRelative || toPathname == null)
    from2 = locationPathname;
  else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      for (; toSegments[0] === ".."; )
        toSegments.shift(), routePathnameIndex -= 1;
      to.pathname = toSegments.join("/");
    }
    from2 = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from2), hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/"), hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  return !path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash) && (path.pathname += "/"), path;
}
function getToPathname(to) {
  return to === "" || to.pathname === "" ? "/" : typeof to == "string" ? parsePath(to).pathname : to.pathname;
}
function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === !0;
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value))
    return value;
  if (value._error)
    throw value._error;
  return value._data;
}
function isRouteErrorResponse(error) {
  return error != null && typeof error.status == "number" && typeof error.statusText == "string" && typeof error.internal == "boolean" && "data" in error;
}
function createRouter(init2) {
  invariant(init2.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let dataRoutes = convertRoutesToDataRoutes(init2.routes), unlistenHistory = null, subscribers = /* @__PURE__ */ new Set(), savedScrollPositions2 = null, getScrollRestorationKey = null, getScrollPosition = null, initialScrollRestored = init2.hydrationData != null, initialMatches = matchRoutes(dataRoutes, init2.history.location, init2.basename), initialErrors = null;
  if (initialMatches == null) {
    let error = getInternalRouterError(404, {
      pathname: init2.history.location.pathname
    }), {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches, initialErrors = {
      [route.id]: error
    };
  }
  let initialized = !initialMatches.some((m) => m.route.loader) || init2.hydrationData != null, router, state = {
    historyAction: init2.history.action,
    location: init2.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    restoreScrollPosition: init2.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: init2.hydrationData && init2.hydrationData.loaderData || {},
    actionData: init2.hydrationData && init2.hydrationData.actionData || null,
    errors: init2.hydrationData && init2.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, pendingAction = Action.Pop, pendingPreventScrollReset = !1, pendingNavigationController, isUninterruptedRevalidation = !1, isRevalidationRequired = !1, cancelledDeferredRoutes = [], cancelledFetcherLoads = [], fetchControllers = /* @__PURE__ */ new Map(), incrementingLoadId = 0, pendingNavigationLoadId = -1, fetchReloadIds = /* @__PURE__ */ new Map(), fetchRedirectIds = /* @__PURE__ */ new Set(), fetchLoadMatches = /* @__PURE__ */ new Map(), activeDeferreds = /* @__PURE__ */ new Map(), activeBlocker = null, blockerFunctions = /* @__PURE__ */ new Map(), ignoreNextHistoryUpdate = !1;
  function initialize() {
    return unlistenHistory = init2.history.listen((_ref) => {
      let {
        action: historyAction,
        location,
        delta
      } = _ref;
      if (ignoreNextHistoryUpdate) {
        ignoreNextHistoryUpdate = !1;
        return;
      }
      warning(activeBlocker != null && delta === null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
      let blockerKey2 = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location,
        historyAction
      });
      if (blockerKey2 && delta != null) {
        ignoreNextHistoryUpdate = !0, init2.history.go(delta * -1), updateBlocker(blockerKey2, {
          state: "blocked",
          location,
          proceed() {
            updateBlocker(blockerKey2, {
              state: "proceeding",
              proceed: void 0,
              reset: void 0,
              location
            }), init2.history.go(delta);
          },
          reset() {
            deleteBlocker(blockerKey2), updateState({
              blockers: new Map(router.state.blockers)
            });
          }
        });
        return;
      }
      return startNavigation(historyAction, location);
    }), state.initialized || startNavigation(Action.Pop, state.location), router;
  }
  function dispose() {
    unlistenHistory && unlistenHistory(), subscribers.clear(), pendingNavigationController && pendingNavigationController.abort(), state.fetchers.forEach((_2, key) => deleteFetcher(key)), state.blockers.forEach((_2, key) => deleteBlocker(key));
  }
  function subscribe(fn) {
    return subscribers.add(fn), () => subscribers.delete(fn);
  }
  function updateState(newState) {
    state = _extends({}, state, newState), subscribers.forEach((subscriber) => subscriber(state));
  }
  function completeNavigation(location, newState) {
    var _location$state, _location$state2;
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== !0, actionData;
    newState.actionData ? Object.keys(newState.actionData).length > 0 ? actionData = newState.actionData : actionData = null : isActionReload ? actionData = state.actionData : actionData = null;
    let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
    for (let [key] of blockerFunctions)
      deleteBlocker(key);
    let preventScrollReset = pendingPreventScrollReset === !0 || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== !0;
    updateState(_extends({}, newState, {
      actionData,
      loaderData,
      historyAction: pendingAction,
      location,
      initialized: !0,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset,
      blockers: new Map(state.blockers)
    })), isUninterruptedRevalidation || pendingAction === Action.Pop || (pendingAction === Action.Push ? init2.history.push(location, location.state) : pendingAction === Action.Replace && init2.history.replace(location, location.state)), pendingAction = Action.Pop, pendingPreventScrollReset = !1, isUninterruptedRevalidation = !1, isRevalidationRequired = !1, cancelledDeferredRoutes = [], cancelledFetcherLoads = [];
  }
  async function navigate(to, opts) {
    if (typeof to == "number") {
      init2.history.go(to);
      return;
    }
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(to, opts), currentLocation = state.location, nextLocation = createLocation(state.location, path, opts && opts.state);
    nextLocation = _extends({}, nextLocation, init2.history.encodeLocation(nextLocation));
    let userReplace = opts && opts.replace != null ? opts.replace : void 0, historyAction = Action.Push;
    userReplace === !0 ? historyAction = Action.Replace : userReplace === !1 || submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search && (historyAction = Action.Replace);
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === !0 : void 0, blockerKey2 = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey2) {
      updateBlocker(blockerKey2, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey2, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          }), navigate(to, opts);
        },
        reset() {
          deleteBlocker(blockerKey2), updateState({
            blockers: new Map(state.blockers)
          });
        }
      });
      return;
    }
    return await startNavigation(historyAction, nextLocation, {
      submission,
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace
    });
  }
  function revalidate() {
    if (interruptActiveLoads(), updateState({
      revalidation: "loading"
    }), state.navigation.state !== "submitting") {
      if (state.navigation.state === "idle") {
        startNavigation(state.historyAction, state.location, {
          startUninterruptedRevalidation: !0
        });
        return;
      }
      startNavigation(pendingAction || state.historyAction, state.navigation.location, {
        overrideNavigation: state.navigation
      });
    }
  }
  async function startNavigation(historyAction, location, opts) {
    pendingNavigationController && pendingNavigationController.abort(), pendingNavigationController = null, pendingAction = historyAction, isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === !0, saveScrollPosition(state.location, state.matches), pendingPreventScrollReset = (opts && opts.preventScrollReset) === !0;
    let loadingNavigation = opts && opts.overrideNavigation, matches = matchRoutes(dataRoutes, location, init2.basename);
    if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      }), {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      cancelActiveDeferreds(), completeNavigation(location, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      });
      return;
    }
    if (isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, {
        matches
      });
      return;
    }
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(init2.history, location, pendingNavigationController.signal, opts && opts.submission), pendingActionData, pendingError;
    if (opts && opts.pendingError)
      pendingError = {
        [findNearestBoundary(matches).route.id]: opts.pendingError
      };
    else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionOutput = await handleAction(request, location, opts.submission, matches, {
        replace: opts.replace
      });
      if (actionOutput.shortCircuited)
        return;
      pendingActionData = actionOutput.pendingActionData, pendingError = actionOutput.pendingActionError, loadingNavigation = _extends({
        state: "loading",
        location
      }, opts.submission), request = new Request(request.url, {
        signal: request.signal
      });
    }
    let {
      shortCircuited,
      loaderData,
      errors
    } = await handleLoaders(request, location, matches, loadingNavigation, opts && opts.submission, opts && opts.replace, pendingActionData, pendingError);
    shortCircuited || (pendingNavigationController = null, completeNavigation(location, _extends({
      matches
    }, pendingActionData ? {
      actionData: pendingActionData
    } : {}, {
      loaderData,
      errors
    })));
  }
  async function handleAction(request, location, submission, matches, opts) {
    interruptActiveLoads();
    let navigation = _extends({
      state: "submitting",
      location
    }, submission);
    updateState({
      navigation
    });
    let result, actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action)
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    else if (result = await callLoaderOrAction("action", request, actionMatch, matches, router.basename), request.signal.aborted)
      return {
        shortCircuited: !0
      };
    if (isRedirectResult(result)) {
      let replace;
      return opts && opts.replace != null ? replace = opts.replace : replace = result.location === state.location.pathname + state.location.search, await startRedirectNavigation(state, result, {
        submission,
        replace
      }), {
        shortCircuited: !0
      };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      return (opts && opts.replace) !== !0 && (pendingAction = Action.Push), {
        pendingActionData: {},
        pendingActionError: {
          [boundaryMatch.route.id]: result.error
        }
      };
    }
    if (isDeferredResult(result))
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    return {
      pendingActionData: {
        [actionMatch.route.id]: result.data
      }
    };
  }
  async function handleLoaders(request, location, matches, overrideNavigation, submission, replace, pendingActionData, pendingError) {
    let loadingNavigation = overrideNavigation;
    loadingNavigation || (loadingNavigation = _extends({
      state: "loading",
      location,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0
    }, submission));
    let activeSubmission = submission || (loadingNavigation.formMethod && loadingNavigation.formAction && loadingNavigation.formData && loadingNavigation.formEncType ? {
      formMethod: loadingNavigation.formMethod,
      formAction: loadingNavigation.formAction,
      formData: loadingNavigation.formData,
      formEncType: loadingNavigation.formEncType
    } : void 0), [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init2.history, state, matches, activeSubmission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, pendingActionData, pendingError, fetchLoadMatches);
    if (cancelActiveDeferreds((routeId) => !(matches && matches.some((m) => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some((m) => m.route.id === routeId)), matchesToLoad.length === 0 && revalidatingFetchers.length === 0)
      return completeNavigation(location, _extends({
        matches,
        loaderData: {},
        errors: pendingError || null
      }, pendingActionData ? {
        actionData: pendingActionData
      } : {})), {
        shortCircuited: !0
      };
    if (!isUninterruptedRevalidation) {
      revalidatingFetchers.forEach((rf) => {
        let fetcher = state.fetchers.get(rf.key), revalidatingFetcher = {
          state: "loading",
          data: fetcher && fetcher.data,
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
          " _hasFetcherDoneAnything ": !0
        };
        state.fetchers.set(rf.key, revalidatingFetcher);
      });
      let actionData = pendingActionData || state.actionData;
      updateState(_extends({
        navigation: loadingNavigation
      }, actionData ? Object.keys(actionData).length === 0 ? {
        actionData: null
      } : {
        actionData
      } : {}, revalidatingFetchers.length > 0 ? {
        fetchers: new Map(state.fetchers)
      } : {}));
    }
    pendingNavigationLoadId = ++incrementingLoadId, revalidatingFetchers.forEach((rf) => fetchControllers.set(rf.key, pendingNavigationController));
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
    if (request.signal.aborted)
      return {
        shortCircuited: !0
      };
    revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
    let redirect4 = findRedirect(results);
    if (redirect4)
      return await startRedirectNavigation(state, redirect4, {
        replace
      }), {
        shortCircuited: !0
      };
    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds);
    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe((aborted) => {
        (aborted || deferredData.done) && activeDeferreds.delete(routeId);
      });
    }), markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    return _extends({
      loaderData,
      errors
    }, didAbortFetchLoads || revalidatingFetchers.length > 0 ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }
  function getFetcher(key) {
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function fetch(key, routeId, href, opts) {
    if (isServer)
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
    fetchControllers.has(key) && abortFetcher(key);
    let matches = matchRoutes(dataRoutes, href, init2.basename);
    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: href
      }));
      return;
    }
    let {
      path,
      submission
    } = normalizeNavigateOptions(href, opts, !0), match = getTargetMatch(matches, path);
    if (pendingPreventScrollReset = (opts && opts.preventScrollReset) === !0, submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key, routeId, path, match, matches, submission);
      return;
    }
    fetchLoadMatches.set(key, {
      routeId,
      path,
      match,
      matches
    }), handleFetcherLoader(key, routeId, path, match, matches, submission);
  }
  async function handleFetcherAction(key, routeId, path, match, requestMatches, submission) {
    if (interruptActiveLoads(), fetchLoadMatches.delete(key), !match.route.action) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId
      });
      setFetcherError(key, routeId, error);
      return;
    }
    let existingFetcher = state.fetchers.get(key), fetcher = _extends({
      state: "submitting"
    }, submission, {
      data: existingFetcher && existingFetcher.data,
      " _hasFetcherDoneAnything ": !0
    });
    state.fetchers.set(key, fetcher), updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortController = new AbortController(), fetchRequest = createClientSideRequest(init2.history, path, abortController.signal, submission);
    fetchControllers.set(key, abortController);
    let actionResult = await callLoaderOrAction("action", fetchRequest, match, requestMatches, router.basename);
    if (fetchRequest.signal.aborted) {
      fetchControllers.get(key) === abortController && fetchControllers.delete(key);
      return;
    }
    if (isRedirectResult(actionResult)) {
      fetchControllers.delete(key), fetchRedirectIds.add(key);
      let loadingFetcher = _extends({
        state: "loading"
      }, submission, {
        data: void 0,
        " _hasFetcherDoneAnything ": !0
      });
      return state.fetchers.set(key, loadingFetcher), updateState({
        fetchers: new Map(state.fetchers)
      }), startRedirectNavigation(state, actionResult, {
        isFetchActionRedirect: !0
      });
    }
    if (isErrorResult(actionResult)) {
      setFetcherError(key, routeId, actionResult.error);
      return;
    }
    if (isDeferredResult(actionResult))
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    let nextLocation = state.navigation.location || state.location, revalidationRequest = createClientSideRequest(init2.history, nextLocation, abortController.signal), matches = state.navigation.state !== "idle" ? matchRoutes(dataRoutes, state.navigation.location, init2.basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = _extends({
      state: "loading",
      data: actionResult.data
    }, submission, {
      " _hasFetcherDoneAnything ": !0
    });
    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(
      init2.history,
      state,
      matches,
      submission,
      nextLocation,
      isRevalidationRequired,
      cancelledDeferredRoutes,
      cancelledFetcherLoads,
      {
        [match.route.id]: actionResult.data
      },
      void 0,
      fetchLoadMatches
    );
    revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
      let staleKey = rf.key, existingFetcher2 = state.fetchers.get(staleKey), revalidatingFetcher = {
        state: "loading",
        data: existingFetcher2 && existingFetcher2.data,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        " _hasFetcherDoneAnything ": !0
      };
      state.fetchers.set(staleKey, revalidatingFetcher), fetchControllers.set(staleKey, abortController);
    }), updateState({
      fetchers: new Map(state.fetchers)
    });
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
    if (abortController.signal.aborted)
      return;
    fetchReloadIds.delete(key), fetchControllers.delete(key), revalidatingFetchers.forEach((r2) => fetchControllers.delete(r2.key));
    let redirect4 = findRedirect(results);
    if (redirect4)
      return startRedirectNavigation(state, redirect4);
    let {
      loaderData,
      errors
    } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds), doneFetcher = {
      state: "idle",
      data: actionResult.data,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      " _hasFetcherDoneAnything ": !0
    };
    state.fetchers.set(key, doneFetcher);
    let didAbortFetchLoads = abortStaleFetchLoads(loadId);
    state.navigation.state === "loading" && loadId > pendingNavigationLoadId ? (invariant(pendingAction, "Expected pending action"), pendingNavigationController && pendingNavigationController.abort(), completeNavigation(state.navigation.location, {
      matches,
      loaderData,
      errors,
      fetchers: new Map(state.fetchers)
    })) : (updateState(_extends({
      errors,
      loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors)
    }, didAbortFetchLoads ? {
      fetchers: new Map(state.fetchers)
    } : {})), isRevalidationRequired = !1);
  }
  async function handleFetcherLoader(key, routeId, path, match, matches, submission) {
    let existingFetcher = state.fetchers.get(key), loadingFetcher = _extends({
      state: "loading",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0
    }, submission, {
      data: existingFetcher && existingFetcher.data,
      " _hasFetcherDoneAnything ": !0
    });
    state.fetchers.set(key, loadingFetcher), updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortController = new AbortController(), fetchRequest = createClientSideRequest(init2.history, path, abortController.signal);
    fetchControllers.set(key, abortController);
    let result = await callLoaderOrAction("loader", fetchRequest, match, matches, router.basename);
    if (isDeferredResult(result) && (result = await resolveDeferredData(result, fetchRequest.signal, !0) || result), fetchControllers.get(key) === abortController && fetchControllers.delete(key), fetchRequest.signal.aborted)
      return;
    if (isRedirectResult(result)) {
      await startRedirectNavigation(state, result);
      return;
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, routeId);
      state.fetchers.delete(key), updateState({
        fetchers: new Map(state.fetchers),
        errors: {
          [boundaryMatch.route.id]: result.error
        }
      });
      return;
    }
    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
    let doneFetcher = {
      state: "idle",
      data: result.data,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      " _hasFetcherDoneAnything ": !0
    };
    state.fetchers.set(key, doneFetcher), updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  async function startRedirectNavigation(state2, redirect4, _temp) {
    var _window;
    let {
      submission,
      replace,
      isFetchActionRedirect
    } = _temp === void 0 ? {} : _temp;
    redirect4.revalidate && (isRevalidationRequired = !0);
    let redirectLocation = createLocation(
      state2.location,
      redirect4.location,
      _extends({
        _isRedirect: !0
      }, isFetchActionRedirect ? {
        _isFetchActionRedirect: !0
      } : {})
    );
    if (invariant(redirectLocation, "Expected a location on the redirect navigation"), isBrowser && typeof ((_window = window) == null ? void 0 : _window.location) < "u") {
      let newOrigin = init2.history.createURL(redirect4.location).origin;
      if (window.location.origin !== newOrigin) {
        replace ? window.location.replace(redirect4.location) : window.location.assign(redirect4.location);
        return;
      }
    }
    pendingNavigationController = null;
    let redirectHistoryAction = replace === !0 ? Action.Replace : Action.Push, {
      formMethod,
      formAction,
      formEncType,
      formData
    } = state2.navigation;
    !submission && formMethod && formAction && formData && formEncType && (submission = {
      formMethod,
      formAction,
      formEncType,
      formData
    }), redirectPreserveMethodStatusCodes.has(redirect4.status) && submission && isMutationMethod(submission.formMethod) ? await startNavigation(redirectHistoryAction, redirectLocation, {
      submission: _extends({}, submission, {
        formAction: redirect4.location
      }),
      preventScrollReset: pendingPreventScrollReset
    }) : await startNavigation(redirectHistoryAction, redirectLocation, {
      overrideNavigation: {
        state: "loading",
        location: redirectLocation,
        formMethod: submission ? submission.formMethod : void 0,
        formAction: submission ? submission.formAction : void 0,
        formEncType: submission ? submission.formEncType : void 0,
        formData: submission ? submission.formData : void 0
      },
      preventScrollReset: pendingPreventScrollReset
    });
  }
  async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
    let results = await Promise.all([...matchesToLoad.map((match) => callLoaderOrAction("loader", request, match, matches, router.basename)), ...fetchersToLoad.map((f) => callLoaderOrAction("loader", createClientSideRequest(init2.history, f.path, request.signal), f.match, f.matches, router.basename))]), loaderResults = results.slice(0, matchesToLoad.length), fetcherResults = results.slice(matchesToLoad.length);
    return await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, request.signal, !1, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map((f) => f.match), fetcherResults, request.signal, !0)]), {
      results,
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = !0, cancelledDeferredRoutes.push(...cancelActiveDeferreds()), fetchLoadMatches.forEach((_2, key) => {
      fetchControllers.has(key) && (cancelledFetcherLoads.push(key), abortFetcher(key));
    });
  }
  function setFetcherError(key, routeId, error) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key), updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    });
  }
  function deleteFetcher(key) {
    fetchControllers.has(key) && abortFetcher(key), fetchLoadMatches.delete(key), fetchReloadIds.delete(key), fetchRedirectIds.delete(key), state.fetchers.delete(key);
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    invariant(controller, "Expected fetch controller: " + key), controller.abort(), fetchControllers.delete(key);
  }
  function markFetchersDone(keys2) {
    for (let key of keys2) {
      let doneFetcher = {
        state: "idle",
        data: getFetcher(key).data,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        " _hasFetcherDoneAnything ": !0
      };
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, "Expected fetcher: " + key), fetcher.state === "loading" && (fetchRedirectIds.delete(key), doneKeys.push(key));
    }
    markFetchersDone(doneKeys);
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds)
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key), fetcher.state === "loading" && (abortFetcher(key), fetchReloadIds.delete(key), yeetedKeys.push(key));
      }
    return markFetchersDone(yeetedKeys), yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    return blockerFunctions.get(key) !== fn && (blockerFunctions.set(key, fn), activeBlocker == null ? activeBlocker = key : key !== activeBlocker && warning(!1, "A router only supports one blocker at a time")), blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key), blockerFunctions.delete(key), activeBlocker === key && (activeBlocker = null);
  }
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state), state.blockers.set(key, newBlocker), updateState({
      blockers: new Map(state.blockers)
    });
  }
  function shouldBlockNavigation(_ref2) {
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = _ref2;
    if (activeBlocker == null)
      return;
    let blockerFunction = blockerFunctions.get(activeBlocker);
    invariant(blockerFunction, "Could not find a function for the active blocker");
    let blocker = state.blockers.get(activeBlocker);
    if (!(blocker && blocker.state === "proceeding") && blockerFunction({
      currentLocation,
      nextLocation,
      historyAction
    }))
      return activeBlocker;
  }
  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    return activeDeferreds.forEach((dfd, routeId) => {
      (!predicate || predicate(routeId)) && (dfd.cancel(), cancelledRouteIds.push(routeId), activeDeferreds.delete(routeId));
    }), cancelledRouteIds;
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    if (savedScrollPositions2 = positions, getScrollPosition = getPosition, getScrollRestorationKey = getKey || ((location) => location.key), !initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = !0;
      let y = getSavedScrollPosition(state.location, state.matches);
      y != null && updateState({
        restoreScrollPosition: y
      });
    }
    return () => {
      savedScrollPositions2 = null, getScrollPosition = null, getScrollRestorationKey = null;
    };
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions2 && getScrollRestorationKey && getScrollPosition) {
      let userMatches = matches.map((m) => createUseMatchesMatch(m, state.loaderData)), key = getScrollRestorationKey(location, userMatches) || location.key;
      savedScrollPositions2[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions2 && getScrollRestorationKey && getScrollPosition) {
      let userMatches = matches.map((m) => createUseMatchesMatch(m, state.loaderData)), key = getScrollRestorationKey(location, userMatches) || location.key, y = savedScrollPositions2[key];
      if (typeof y == "number")
        return y;
    }
    return null;
  }
  return router = {
    get basename() {
      return init2.basename;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch,
    revalidate,
    createHref: (to) => init2.history.createHref(to),
    encodeLocation: (to) => init2.history.encodeLocation(to),
    getFetcher,
    deleteFetcher,
    dispose,
    getBlocker,
    deleteBlocker,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds
  }, router;
}
function createStaticHandler(routes2, opts) {
  invariant(routes2.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let dataRoutes = convertRoutesToDataRoutes(routes2), basename = (opts ? opts.basename : null) || "/";
  async function query(request, _temp2) {
    let {
      requestContext
    } = _temp2 === void 0 ? {} : _temp2, url = new URL(request.url), method = request.method.toLowerCase(), location = createLocation("", createPath(url), null, "default"), matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "head") {
      let error = getInternalRouterError(405, {
        method
      }), {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      }), {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let result = await queryImpl(request, location, matches, requestContext);
    return isResponse(result) ? result : _extends({
      location,
      basename
    }, result);
  }
  async function queryRoute(request, _temp3) {
    let {
      routeId,
      requestContext
    } = _temp3 === void 0 ? {} : _temp3, url = new URL(request.url), method = request.method.toLowerCase(), location = createLocation("", createPath(url), null, "default"), matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "head" && method !== "options")
      throw getInternalRouterError(405, {
        method
      });
    if (!matches)
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    let match = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match)
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    if (!match)
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    let result = await queryImpl(request, location, matches, requestContext, match);
    if (isResponse(result))
      return result;
    let error = result.errors ? Object.values(result.errors)[0] : void 0;
    if (error !== void 0)
      throw error;
    if (result.actionData)
      return Object.values(result.actionData)[0];
    if (result.loaderData) {
      var _result$activeDeferre;
      let data = Object.values(result.loaderData)[0];
      return (_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id] && (data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id]), data;
    }
  }
  async function queryImpl(request, location, matches, requestContext, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (isMutationMethod(request.method.toLowerCase()))
        return await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, routeMatch != null);
      let result = await loadRouteData(request, matches, requestContext, routeMatch);
      return isResponse(result) ? result : _extends({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      if (isQueryRouteResponse(e)) {
        if (e.type === ResultType.error && !isRedirectResponse(e.response))
          throw e.response;
        return e.response;
      }
      if (isRedirectResponse(e))
        return e;
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, isRouteRequest) {
    let result;
    if (actionMatch.route.action) {
      if (result = await callLoaderOrAction("action", request, actionMatch, matches, basename, !0, isRouteRequest, requestContext), request.signal.aborted) {
        let method = isRouteRequest ? "queryRoute" : "query";
        throw new Error(method + "() call aborted");
      }
    } else {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest)
        throw error;
      result = {
        type: ResultType.error,
        error
      };
    }
    if (isRedirectResult(result))
      throw new Response(null, {
        status: result.status,
        headers: {
          Location: result.location
        }
      });
    if (isDeferredResult(result)) {
      let error = getInternalRouterError(400, {
        type: "defer-action"
      });
      if (isRouteRequest)
        throw error;
      result = {
        type: ResultType.error,
        error
      };
    }
    if (isRouteRequest) {
      if (isErrorResult(result))
        throw result.error;
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id), context2 = await loadRouteData(request, matches, requestContext, void 0, {
        [boundaryMatch.route.id]: result.error
      });
      return _extends({}, context2, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : 500,
        actionData: null,
        actionHeaders: _extends({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    }), context = await loadRouteData(loaderRequest, matches, requestContext);
    return _extends({}, context, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionData: {
        [actionMatch.route.id]: result.data
      },
      actionHeaders: _extends({}, result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {})
    });
  }
  async function loadRouteData(request, matches, requestContext, routeMatch, pendingActionError) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader))
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    let matchesToLoad = (routeMatch ? [routeMatch] : getLoaderMatchesUntilBoundary(matches, Object.keys(pendingActionError || {})[0])).filter((m) => m.route.loader);
    if (matchesToLoad.length === 0)
      return {
        matches,
        loaderData: matches.reduce((acc, m) => Object.assign(acc, {
          [m.route.id]: null
        }), {}),
        errors: pendingActionError || null,
        statusCode: 200,
        loaderHeaders: {},
        activeDeferreds: null
      };
    let results = await Promise.all([...matchesToLoad.map((match) => callLoaderOrAction("loader", request, match, matches, basename, !0, isRouteRequest, requestContext))]);
    if (request.signal.aborted) {
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted");
    }
    let activeDeferreds = /* @__PURE__ */ new Map(), context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionError, activeDeferreds), executedLoaders = new Set(matchesToLoad.map((match) => match.route.id));
    return matches.forEach((match) => {
      executedLoaders.has(match.route.id) || (context.loaderData[match.route.id] = null);
    }), _extends({}, context, {
      matches,
      activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
    });
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
function getStaticContextFromError(routes2, context, error) {
  return _extends({}, context, {
    statusCode: 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes2[0].id]: error
    }
  });
}
function isSubmissionNavigation(opts) {
  return opts != null && "formData" in opts;
}
function normalizeNavigateOptions(to, opts, isFetcher) {
  isFetcher === void 0 && (isFetcher = !1);
  let path = typeof to == "string" ? to : createPath(to);
  if (!opts || !isSubmissionNavigation(opts))
    return {
      path
    };
  if (opts.formMethod && !isValidMethod(opts.formMethod))
    return {
      path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  let submission;
  if (opts.formData && (submission = {
    formMethod: opts.formMethod || "get",
    formAction: stripHashFromPath(path),
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData: opts.formData
  }, isMutationMethod(submission.formMethod)))
    return {
      path,
      submission
    };
  let parsedPath = parsePath(path), searchParams = convertFormDataToSearchParams(opts.formData);
  return isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search) && searchParams.append("index", ""), parsedPath.search = "?" + searchParams, {
    path: createPath(parsedPath),
    submission
  };
}
function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches;
  if (boundaryId) {
    let index = matches.findIndex((m) => m.route.id === boundaryId);
    index >= 0 && (boundaryMatches = matches.slice(0, index));
  }
  return boundaryMatches;
}
function getMatchesToLoad(history, state, matches, submission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, pendingActionData, pendingError, fetchLoadMatches) {
  let actionResult = pendingError ? Object.values(pendingError)[0] : pendingActionData ? Object.values(pendingActionData)[0] : void 0, currentUrl = history.createURL(state.location), nextUrl = history.createURL(location), defaultShouldRevalidate = isRevalidationRequired || currentUrl.toString() === nextUrl.toString() || currentUrl.search !== nextUrl.search, boundaryId = pendingError ? Object.keys(pendingError)[0] : void 0, navigationMatches = getLoaderMatchesUntilBoundary(matches, boundaryId).filter((match, index) => {
    if (match.route.loader == null)
      return !1;
    if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some((id) => id === match.route.id))
      return !0;
    let currentRouteMatch = state.matches[index], nextRouteMatch = match;
    return shouldRevalidateLoader(match, _extends({
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult,
      defaultShouldRevalidate: defaultShouldRevalidate || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
    }));
  }), revalidatingFetchers = [];
  return fetchLoadMatches && fetchLoadMatches.forEach((f, key) => {
    if (matches.some((m) => m.route.id === f.routeId))
      cancelledFetcherLoads.includes(key) ? revalidatingFetchers.push(_extends({
        key
      }, f)) : shouldRevalidateLoader(f.match, _extends({
        currentUrl,
        currentParams: state.matches[state.matches.length - 1].params,
        nextUrl,
        nextParams: matches[matches.length - 1].params
      }, submission, {
        actionResult,
        defaultShouldRevalidate
      })) && revalidatingFetchers.push(_extends({
        key
      }, f));
    else
      return;
  }), [navigationMatches, revalidatingFetchers];
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = !currentMatch || match.route.id !== currentMatch.route.id, isMissingData = currentLoaderData[match.route.id] === void 0;
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return currentMatch.pathname !== match.pathname || currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"];
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice == "boolean")
      return routeChoice;
  }
  return arg.defaultShouldRevalidate;
}
async function callLoaderOrAction(type, request, match, matches, basename, isStaticRequest, isRouteRequest, requestContext) {
  basename === void 0 && (basename = "/"), isStaticRequest === void 0 && (isStaticRequest = !1), isRouteRequest === void 0 && (isRouteRequest = !1);
  let resultType, result, reject, abortPromise = new Promise((_2, r2) => reject = r2), onReject = () => reject();
  request.signal.addEventListener("abort", onReject);
  try {
    let handler = match.route[type];
    invariant(handler, "Could not find the " + type + ' to run on the "' + match.route.id + '" route'), result = await Promise.race([handler({
      request,
      params: match.params,
      context: requestContext
    }), abortPromise]), invariant(result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ('"' + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    resultType = ResultType.error, result = e;
  } finally {
    request.signal.removeEventListener("abort", onReject);
  }
  if (isResponse(result)) {
    let status = result.status;
    if (redirectStatusCodes.has(status)) {
      let location = result.headers.get("Location");
      if (invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header"), /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(location)) {
        if (!isStaticRequest) {
          let currentUrl = new URL(request.url), url = location.startsWith("//") ? new URL(currentUrl.protocol + location) : new URL(location);
          url.origin === currentUrl.origin && (location = url.pathname + url.search + url.hash);
        }
      } else {
        let activeMatches = matches.slice(0, matches.indexOf(match) + 1), routePathnames = getPathContributingMatches(activeMatches).map((match2) => match2.pathnameBase), resolvedLocation = resolveTo(location, routePathnames, new URL(request.url).pathname);
        if (invariant(createPath(resolvedLocation), "Unable to resolve redirect location: " + location), basename) {
          let path = resolvedLocation.pathname;
          resolvedLocation.pathname = path === "/" ? basename : joinPaths([basename, path]);
        }
        location = createPath(resolvedLocation);
      }
      if (isStaticRequest)
        throw result.headers.set("Location", location), result;
      return {
        type: ResultType.redirect,
        status,
        location,
        revalidate: result.headers.get("X-Remix-Revalidate") !== null
      };
    }
    if (isRouteRequest)
      throw {
        type: resultType || ResultType.data,
        response: result
      };
    let data, contentType = result.headers.get("Content-Type");
    return contentType && /\bapplication\/json\b/.test(contentType) ? data = await result.json() : data = await result.text(), resultType === ResultType.error ? {
      type: resultType,
      error: new ErrorResponse(status, result.statusText, data),
      headers: result.headers
    } : {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers
    };
  }
  return resultType === ResultType.error ? {
    type: resultType,
    error: result
  } : result instanceof DeferredData ? {
    type: ResultType.deferred,
    deferredData: result
  } : {
    type: ResultType.data,
    data: result
  };
}
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString(), init2 = {
    signal
  };
  if (submission && isMutationMethod(submission.formMethod)) {
    let {
      formMethod,
      formEncType,
      formData
    } = submission;
    init2.method = formMethod.toUpperCase(), init2.body = formEncType === "application/x-www-form-urlencoded" ? convertFormDataToSearchParams(formData) : formData;
  }
  return new Request(url, init2);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries())
    searchParams.append(key, value instanceof File ? value.name : value);
  return searchParams;
}
function processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds) {
  let loaderData = {}, errors = null, statusCode, foundError = !1, loaderHeaders = {};
  return results.forEach((result, index) => {
    let id = matchesToLoad[index].route.id;
    if (invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData"), isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, id), error = result.error;
      pendingError && (error = Object.values(pendingError)[0], pendingError = void 0), errors = errors || {}, errors[boundaryMatch.route.id] == null && (errors[boundaryMatch.route.id] = error), loaderData[id] = void 0, foundError || (foundError = !0, statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500), result.headers && (loaderHeaders[id] = result.headers);
    } else
      isDeferredResult(result) ? (activeDeferreds.set(id, result.deferredData), loaderData[id] = result.deferredData.data) : loaderData[id] = result.data, result.statusCode != null && result.statusCode !== 200 && !foundError && (statusCode = result.statusCode), result.headers && (loaderHeaders[id] = result.headers);
  }), pendingError && (errors = pendingError, loaderData[Object.keys(pendingError)[0]] = void 0), {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, matchesToLoad, results, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors
  } = processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds);
  for (let index = 0; index < revalidatingFetchers.length; index++) {
    let {
      key,
      match
    } = revalidatingFetchers[index];
    invariant(fetcherResults !== void 0 && fetcherResults[index] !== void 0, "Did not find corresponding fetcher result");
    let result = fetcherResults[index];
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match.route.id);
      errors && errors[boundaryMatch.route.id] || (errors = _extends({}, errors, {
        [boundaryMatch.route.id]: result.error
      })), state.fetchers.delete(key);
    } else if (isRedirectResult(result))
      invariant(!1, "Unhandled fetcher revalidation redirect");
    else if (isDeferredResult(result))
      invariant(!1, "Unhandled fetcher deferred data");
    else {
      let doneFetcher = {
        state: "idle",
        data: result.data,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        " _hasFetcherDoneAnything ": !0
      };
      state.fetchers.set(key, doneFetcher);
    }
  }
  return {
    loaderData,
    errors
  };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = _extends({}, newLoaderData);
  for (let match of matches) {
    let id = match.route.id;
    if (newLoaderData.hasOwnProperty(id) ? newLoaderData[id] !== void 0 && (mergedLoaderData[id] = newLoaderData[id]) : loaderData[id] !== void 0 && (mergedLoaderData[id] = loaderData[id]), errors && errors.hasOwnProperty(id))
      break;
  }
  return mergedLoaderData;
}
function findNearestBoundary(matches, routeId) {
  return (routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches]).reverse().find((m) => m.route.hasErrorBoundary === !0) || matches[0];
}
function getShortCircuitMatches(routes2) {
  let route = routes2.find((r2) => r2.index || !r2.path || r2.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}
function getInternalRouterError(status, _temp4) {
  let {
    pathname,
    routeId,
    method,
    type
  } = _temp4 === void 0 ? {} : _temp4, statusText = "Unknown Server Error", errorMessage = "Unknown @remix-run/router error";
  return status === 400 ? (statusText = "Bad Request", method && pathname && routeId ? errorMessage = "You made a " + method + ' request to "' + pathname + '" but ' + ('did not provide a `loader` for route "' + routeId + '", ') + "so there is no way to handle the request." : type === "defer-action" && (errorMessage = "defer() is not supported in actions")) : status === 403 ? (statusText = "Forbidden", errorMessage = 'Route "' + routeId + '" does not match URL "' + pathname + '"') : status === 404 ? (statusText = "Not Found", errorMessage = 'No route matches URL "' + pathname + '"') : status === 405 && (statusText = "Method Not Allowed", method && pathname && routeId ? errorMessage = "You made a " + method.toUpperCase() + ' request to "' + pathname + '" but ' + ('did not provide an `action` for route "' + routeId + '", ') + "so there is no way to handle the request." : method && (errorMessage = 'Invalid request method "' + method.toUpperCase() + '"')), new ErrorResponse(status || 500, statusText, new Error(errorMessage), !0);
}
function findRedirect(results) {
  for (let i = results.length - 1; i >= 0; i--) {
    let result = results[i];
    if (isRedirectResult(result))
      return result;
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path == "string" ? parsePath(path) : path;
  return createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}
function isHashChangeOnly(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash !== b.hash;
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isResponse(value) {
  return value != null && typeof value.status == "number" && typeof value.statusText == "string" && typeof value.headers == "object" && typeof value.body < "u";
}
function isRedirectResponse(result) {
  if (!isResponse(result))
    return !1;
  let status = result.status, location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}
function isQueryRouteResponse(obj) {
  return obj && isResponse(obj.response) && (obj.type === ResultType.data || ResultType.error);
}
function isValidMethod(method) {
  return validRequestMethods.has(method);
}
function isMutationMethod(method) {
  return validMutationMethods.has(method);
}
async function resolveDeferredResults(currentMatches, matchesToLoad, results, signal, isFetcher, currentLoaderData) {
  for (let index = 0; index < results.length; index++) {
    let result = results[index], match = matchesToLoad[index], currentMatch = currentMatches.find((m) => m.route.id === match.route.id), isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== void 0;
    isDeferredResult(result) && (isFetcher || isRevalidatingLoader) && await resolveDeferredData(result, signal, isFetcher).then((result2) => {
      result2 && (results[index] = result2 || results[index]);
    });
  }
}
async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0 && (unwrap = !1), !await result.deferredData.resolveData(signal)) {
    if (unwrap)
      try {
        return {
          type: ResultType.data,
          data: result.deferredData.unwrappedData
        };
      } catch (e) {
        return {
          type: ResultType.error,
          error: e
        };
      }
    return {
      type: ResultType.data,
      data: result.deferredData.data
    };
  }
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function createUseMatchesMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function getTargetMatch(matches, location) {
  let search = typeof location == "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || ""))
    return matches[matches.length - 1];
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
var Action, PopStateEventType, ResultType, paramRe, dynamicSegmentValue, indexRouteValue, emptySegmentValue, staticSegmentValue, splatPenalty, isSplat, joinPaths, normalizePathname, normalizeSearch, normalizeHash, json, AbortedDeferredError, DeferredData, defer, redirect, ErrorResponse, validMutationMethodsArr, validMutationMethods, validRequestMethodsArr, validRequestMethods, redirectStatusCodes, redirectPreserveMethodStatusCodes, IDLE_NAVIGATION, IDLE_FETCHER, IDLE_BLOCKER, isBrowser, isServer, UNSAFE_DEFERRED_SYMBOL, init_router = __esm({
  "node_modules/@remix-run/router/dist/router.js"() {
    (function(Action2) {
      Action2.Pop = "POP", Action2.Push = "PUSH", Action2.Replace = "REPLACE";
    })(Action || (Action = {}));
    PopStateEventType = "popstate";
    (function(ResultType2) {
      ResultType2.data = "data", ResultType2.deferred = "deferred", ResultType2.redirect = "redirect", ResultType2.error = "error";
    })(ResultType || (ResultType = {}));
    paramRe = /^:\w+$/, dynamicSegmentValue = 3, indexRouteValue = 2, emptySegmentValue = 1, staticSegmentValue = 10, splatPenalty = -2, isSplat = (s) => s === "*";
    joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/"), normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/"), normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search, normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash, json = function(data, init2) {
      init2 === void 0 && (init2 = {});
      let responseInit = typeof init2 == "number" ? {
        status: init2
      } : init2, headers = new Headers(responseInit.headers);
      return headers.has("Content-Type") || headers.set("Content-Type", "application/json; charset=utf-8"), new Response(JSON.stringify(data), _extends({}, responseInit, {
        headers
      }));
    }, AbortedDeferredError = class extends Error {
    }, DeferredData = class {
      constructor(data, responseInit) {
        this.pendingKeysSet = /* @__PURE__ */ new Set(), this.subscribers = /* @__PURE__ */ new Set(), this.deferredKeys = [], invariant(data && typeof data == "object" && !Array.isArray(data), "defer() only accepts plain objects");
        let reject;
        this.abortPromise = new Promise((_2, r2) => reject = r2), this.controller = new AbortController();
        let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
        this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort), this.controller.signal.addEventListener("abort", onAbort), this.data = Object.entries(data).reduce((acc, _ref) => {
          let [key, value] = _ref;
          return Object.assign(acc, {
            [key]: this.trackPromise(key, value)
          });
        }, {}), this.done && this.unlistenAbortSignal(), this.init = responseInit;
      }
      trackPromise(key, value) {
        if (!(value instanceof Promise))
          return value;
        this.deferredKeys.push(key), this.pendingKeysSet.add(key);
        let promise = Promise.race([value, this.abortPromise]).then((data) => this.onSettle(promise, key, null, data), (error) => this.onSettle(promise, key, error));
        return promise.catch(() => {
        }), Object.defineProperty(promise, "_tracked", {
          get: () => !0
        }), promise;
      }
      onSettle(promise, key, error, data) {
        return this.controller.signal.aborted && error instanceof AbortedDeferredError ? (this.unlistenAbortSignal(), Object.defineProperty(promise, "_error", {
          get: () => error
        }), Promise.reject(error)) : (this.pendingKeysSet.delete(key), this.done && this.unlistenAbortSignal(), error ? (Object.defineProperty(promise, "_error", {
          get: () => error
        }), this.emit(!1, key), Promise.reject(error)) : (Object.defineProperty(promise, "_data", {
          get: () => data
        }), this.emit(!1, key), data));
      }
      emit(aborted, settledKey) {
        this.subscribers.forEach((subscriber) => subscriber(aborted, settledKey));
      }
      subscribe(fn) {
        return this.subscribers.add(fn), () => this.subscribers.delete(fn);
      }
      cancel() {
        this.controller.abort(), this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k)), this.emit(!0);
      }
      async resolveData(signal) {
        let aborted = !1;
        if (!this.done) {
          let onAbort = () => this.cancel();
          signal.addEventListener("abort", onAbort), aborted = await new Promise((resolve) => {
            this.subscribe((aborted2) => {
              signal.removeEventListener("abort", onAbort), (aborted2 || this.done) && resolve(aborted2);
            });
          });
        }
        return aborted;
      }
      get done() {
        return this.pendingKeysSet.size === 0;
      }
      get unwrappedData() {
        return invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds"), Object.entries(this.data).reduce((acc, _ref2) => {
          let [key, value] = _ref2;
          return Object.assign(acc, {
            [key]: unwrapTrackedPromise(value)
          });
        }, {});
      }
      get pendingKeys() {
        return Array.from(this.pendingKeysSet);
      }
    };
    defer = function(data, init2) {
      init2 === void 0 && (init2 = {});
      let responseInit = typeof init2 == "number" ? {
        status: init2
      } : init2;
      return new DeferredData(data, responseInit);
    }, redirect = function(url, init2) {
      init2 === void 0 && (init2 = 302);
      let responseInit = init2;
      typeof responseInit == "number" ? responseInit = {
        status: responseInit
      } : typeof responseInit.status > "u" && (responseInit.status = 302);
      let headers = new Headers(responseInit.headers);
      return headers.set("Location", url), new Response(null, _extends({}, responseInit, {
        headers
      }));
    }, ErrorResponse = class {
      constructor(status, statusText, data, internal) {
        internal === void 0 && (internal = !1), this.status = status, this.statusText = statusText || "", this.internal = internal, data instanceof Error ? (this.data = data.toString(), this.error = data) : this.data = data;
      }
    };
    validMutationMethodsArr = ["post", "put", "patch", "delete"], validMutationMethods = new Set(validMutationMethodsArr), validRequestMethodsArr = ["get", ...validMutationMethodsArr], validRequestMethods = new Set(validRequestMethodsArr), redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]), IDLE_NAVIGATION = {
      state: "idle",
      location: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0
    }, IDLE_FETCHER = {
      state: "idle",
      data: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0
    }, IDLE_BLOCKER = {
      state: "unblocked",
      proceed: void 0,
      reset: void 0,
      location: void 0
    }, isBrowser = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", isServer = !isBrowser;
    UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/errors.js
async function serializeError(error) {
  return {
    message: error.message,
    stack: error.stack
  };
}
function serializeErrors(errors) {
  if (!errors)
    return null;
  let entries = Object.entries(errors), serialized = {};
  for (let [key, val] of entries)
    isRouteErrorResponse(val) ? serialized[key] = {
      ...val,
      __type: "RouteErrorResponse"
    } : val instanceof Error ? serialized[key] = {
      message: val.message,
      stack: val.stack,
      __type: "Error"
    } : serialized[key] = val;
  return serialized;
}
var init_errors = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/errors.js"() {
    init_router();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/responses.js
function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred == "object" && typeof deferred.data == "object" && typeof deferred.subscribe == "function" && typeof deferred.cancel == "function" && typeof deferred.resolveData == "function";
}
function isResponse2(value) {
  return value != null && typeof value.status == "number" && typeof value.statusText == "string" && typeof value.headers == "object" && typeof value.body < "u";
}
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes2.has(statusCode);
}
function isRedirectResponse2(response) {
  return isRedirectStatusCode(response.status);
}
function isTrackedPromise2(value) {
  return value != null && typeof value.then == "function" && value._tracked === !0;
}
function createDeferredReadableStream(deferredData, signal) {
  let encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      let criticalData = {}, preresolvedKeys = [];
      for (let [key, value] of Object.entries(deferredData.data))
        isTrackedPromise2(value) ? (criticalData[key] = `${DEFERRED_VALUE_PLACEHOLDER_PREFIX}${key}`, (typeof value._data < "u" || typeof value._error < "u") && preresolvedKeys.push(key)) : criticalData[key] = value;
      controller.enqueue(encoder.encode(JSON.stringify(criticalData) + `

`));
      for (let preresolvedKey of preresolvedKeys)
        enqueueTrackedPromise(controller, encoder, preresolvedKey, deferredData.data[preresolvedKey]);
      let unsubscribe = deferredData.subscribe((aborted, settledKey) => {
        settledKey && enqueueTrackedPromise(controller, encoder, settledKey, deferredData.data[settledKey]);
      });
      await deferredData.resolveData(signal), unsubscribe(), controller.close();
    }
  });
}
function enqueueTrackedPromise(controller, encoder, settledKey, promise) {
  "_error" in promise ? controller.enqueue(encoder.encode("error:" + JSON.stringify({
    [settledKey]: serializeError(promise._error)
  }) + `

`)) : controller.enqueue(encoder.encode("data:" + JSON.stringify({
    [settledKey]: promise._data ?? null
  }) + `

`));
}
var json3, defer3, redirect3, redirectStatusCodes2, DEFERRED_VALUE_PLACEHOLDER_PREFIX, init_responses = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/responses.js"() {
    init_router();
    init_errors();
    json3 = (data, init2 = {}) => {
      let responseInit = typeof init2 == "number" ? {
        status: init2
      } : init2, headers = new Headers(responseInit.headers);
      return headers.has("Content-Type") || headers.set("Content-Type", "application/json; charset=utf-8"), new Response(JSON.stringify(data), {
        ...responseInit,
        headers
      });
    }, defer3 = (data, init2 = {}) => {
      let responseInit = typeof init2 == "number" ? {
        status: init2
      } : init2, headers = new Headers(responseInit.headers);
      return headers.has("Content-Type") || headers.set("Content-Type", "application/json; charset=utf-8"), defer(data, {
        ...responseInit,
        headers
      });
    }, redirect3 = (url, init2 = 302) => {
      let responseInit = init2;
      typeof responseInit == "number" ? responseInit = {
        status: responseInit
      } : typeof responseInit.status > "u" && (responseInit.status = 302);
      let headers = new Headers(responseInit.headers);
      return headers.set("Location", url), new Response(null, {
        ...responseInit,
        headers
      });
    };
    redirectStatusCodes2 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/entry.js
function createEntryRouteModules(manifest) {
  return Object.keys(manifest).reduce((memo2, routeId) => (memo2[routeId] = manifest[routeId].module, memo2), {});
}
var init_entry = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/entry.js"() {
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: !0,
      map: !1,
      silent: !1
    };
    function isNonEmptyString(str) {
      return typeof str == "string" && !!str.trim();
    }
    function parseString(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString), nameValuePairStr = parts.shift(), parsed = parseNameValuePair(nameValuePairStr), name = parsed.name, value = parsed.value;
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      return parts.forEach(function(part) {
        var sides = part.split("="), key = sides.shift().trimLeft().toLowerCase(), value2 = sides.join("=");
        key === "expires" ? cookie.expires = new Date(value2) : key === "max-age" ? cookie.maxAge = parseInt(value2, 10) : key === "secure" ? cookie.secure = !0 : key === "httponly" ? cookie.httpOnly = !0 : key === "samesite" ? cookie.sameSite = value2 : cookie[key] = value2;
      }), cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "", value = "", nameValueArr = nameValuePairStr.split("=");
      return nameValueArr.length > 1 ? (name = nameValueArr.shift(), value = nameValueArr.join("=")) : value = nameValuePairStr, { name, value };
    }
    function parse2(input, options) {
      if (options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions, !input)
        return options.map ? {} : [];
      if (input.headers && input.headers["set-cookie"])
        input = input.headers["set-cookie"];
      else if (input.headers) {
        var sch = input.headers[Object.keys(input.headers).find(function(key) {
          return key.toLowerCase() === "set-cookie";
        })];
        !sch && input.headers.cookie && !options.silent && console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        ), input = sch;
      }
      if (Array.isArray(input) || (input = [input]), options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions, options.map) {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString(str, options);
          return cookies2[cookie.name] = cookie, cookies2;
        }, cookies);
      } else
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString(str, options);
        });
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString))
        return cookiesString;
      if (typeof cookiesString != "string")
        return [];
      var cookiesStrings = [], pos = 0, start, ch, lastComma, nextStart, cookiesSeparatorFound;
      function skipWhitespace() {
        for (; pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos)); )
          pos += 1;
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        return ch = cookiesString.charAt(pos), ch !== "=" && ch !== ";" && ch !== ",";
      }
      for (; pos < cookiesString.length; ) {
        for (start = pos, cookiesSeparatorFound = !1; skipWhitespace(); )
          if (ch = cookiesString.charAt(pos), ch === ",") {
            for (lastComma = pos, pos += 1, skipWhitespace(), nextStart = pos; pos < cookiesString.length && notSpecialChar(); )
              pos += 1;
            pos < cookiesString.length && cookiesString.charAt(pos) === "=" ? (cookiesSeparatorFound = !0, pos = nextStart, cookiesStrings.push(cookiesString.substring(start, lastComma)), start = pos) : pos = lastComma + 1;
          } else
            pos += 1;
        (!cookiesSeparatorFound || pos >= cookiesString.length) && cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
      }
      return cookiesStrings;
    }
    module.exports = parse2;
    module.exports.parse = parse2;
    module.exports.parseString = parseString;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/headers.js
function getDocumentHeadersRR(build, context) {
  return (context.errors ? context.matches.slice(0, context.matches.findIndex((m) => context.errors[m.route.id]) + 1) : context.matches).reduce((parentHeaders, match) => {
    let {
      id
    } = match.route, routeModule = build.routes[id].module, loaderHeaders = context.loaderHeaders[id] || new Headers(), actionHeaders = context.actionHeaders[id] || new Headers(), headers = new Headers(routeModule.headers ? typeof routeModule.headers == "function" ? routeModule.headers({
      loaderHeaders,
      parentHeaders,
      actionHeaders
    }) : routeModule.headers : void 0);
    return prependCookies(actionHeaders, headers), prependCookies(loaderHeaders, headers), prependCookies(parentHeaders, headers), headers;
  }, new Headers());
}
function prependCookies(parentHeaders, childHeaders) {
  let parentSetCookieString = parentHeaders.get("Set-Cookie");
  parentSetCookieString && (0, import_set_cookie_parser.splitCookiesString)(parentSetCookieString).forEach((cookie) => {
    childHeaders.append("Set-Cookie", cookie);
  });
}
var import_set_cookie_parser, init_headers = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/headers.js"() {
    import_set_cookie_parser = __toESM(require_set_cookie());
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/invariant.js
function invariant2(value, message) {
  if (value === !1 || value === null || typeof value > "u")
    throw console.error("The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new"), new Error(message);
}
var init_invariant = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/invariant.js"() {
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/mode.js
function isServerMode(value) {
  return value === ServerMode.Development || value === ServerMode.Production || value === ServerMode.Test;
}
var ServerMode, init_mode = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/mode.js"() {
    (function(ServerMode2) {
      ServerMode2.Development = "development", ServerMode2.Production = "production", ServerMode2.Test = "test";
    })(ServerMode || (ServerMode = {}));
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/routeMatching.js
function matchServerRoutes(routes2, pathname) {
  let matches = matchRoutes(routes2, pathname);
  return matches ? matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route
  })) : null;
}
var init_routeMatching = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/routeMatching.js"() {
    init_router();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/data.js
async function callRouteActionRR({
  loadContext,
  action,
  params,
  request,
  routeId
}) {
  let result = await action({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params
  });
  if (result === void 0)
    throw new Error(`You defined an action for route "${routeId}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);
  return isResponse2(result) ? result : json3(result);
}
async function callRouteLoaderRR({
  loadContext,
  loader,
  params,
  request,
  routeId
}) {
  let result = await loader({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params
  });
  if (result === void 0)
    throw new Error(`You defined a loader for route "${routeId}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);
  return isDeferredData(result) ? result.init && isRedirectStatusCode(result.init.status || 200) ? redirect3(new Headers(result.init.headers).get("Location"), result.init) : result : isResponse2(result) ? result : json3(result);
}
function stripIndexParam(request) {
  let url = new URL(request.url), indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues)
    indexValue && indexValuesToKeep.push(indexValue);
  for (let toKeep of indexValuesToKeep)
    url.searchParams.append("index", toKeep);
  return new Request(url.href, request);
}
function stripDataParam(request) {
  let url = new URL(request.url);
  return url.searchParams.delete("_data"), new Request(url.href, request);
}
var init_data = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/data.js"() {
    init_responses();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/routes.js
function createRoutes(manifest, parentId) {
  return Object.entries(manifest).filter(([, route]) => route.parentId === parentId).map(([id, route]) => ({
    ...route,
    children: createRoutes(manifest, id)
  }));
}
function createStaticHandlerDataRoutes(manifest, future2, parentId) {
  return Object.values(manifest).filter((route) => route.parentId === parentId).map((route) => {
    let commonRoute = {
      hasErrorBoundary: future2.v2_errorBoundary === !0 ? route.id === "root" || route.module.ErrorBoundary != null : route.id === "root" || route.module.CatchBoundary != null || route.module.ErrorBoundary != null,
      id: route.id,
      path: route.path,
      loader: route.module.loader ? (args) => callRouteLoaderRR({
        request: args.request,
        params: args.params,
        loadContext: args.context,
        loader: route.module.loader,
        routeId: route.id
      }) : void 0,
      action: route.module.action ? (args) => callRouteActionRR({
        request: args.request,
        params: args.params,
        loadContext: args.context,
        action: route.module.action,
        routeId: route.id
      }) : void 0,
      handle: route.module.handle
    };
    return route.index ? {
      index: !0,
      ...commonRoute
    } : {
      caseSensitive: route.caseSensitive,
      children: createStaticHandlerDataRoutes(manifest, future2, route.id),
      ...commonRoute
    };
  });
}
var init_routes = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/routes.js"() {
    init_data();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/markup.js
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
var ESCAPE_LOOKUP, ESCAPE_REGEX, init_markup = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/markup.js"() {
    ESCAPE_LOOKUP = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    }, ESCAPE_REGEX = /[&><\u2028\u2029]/g;
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/serverHandoff.js
function createServerHandoffString(serverHandoff) {
  return escapeHtml(JSON.stringify(serverHandoff));
}
var init_serverHandoff = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/serverHandoff.js"() {
    init_markup();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/server.js
async function handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext
    });
    if (isRedirectResponse2(response)) {
      let headers = new Headers(response.headers);
      return headers.set("X-Remix-Redirect", headers.get("Location")), headers.set("X-Remix-Status", response.status), headers.delete("Location"), response.headers.get("Set-Cookie") !== null && headers.set("X-Remix-Revalidate", "yes"), new Response(null, {
        status: 204,
        headers
      });
    }
    if (UNSAFE_DEFERRED_SYMBOL in response) {
      let deferredData = response[UNSAFE_DEFERRED_SYMBOL], body = createDeferredReadableStream(deferredData, request.signal), init2 = deferredData.init || {}, headers = new Headers(init2.headers);
      return headers.set("Content-Type", "text/remix-deferred"), init2.headers = headers, new Response(body, init2);
    }
    return response;
  } catch (error) {
    if (isResponse2(error))
      return error.headers.set("X-Remix-Catch", "yes"), error;
    let status = 500, errorInstance = error;
    return isRouteErrorResponse(error) && (status = error.status, errorInstance = error.error || errorInstance), serverMode !== ServerMode.Test && !request.signal.aborted && console.error(errorInstance), serverMode === ServerMode.Development && errorInstance instanceof Error ? errorBoundaryError(errorInstance, status) : errorBoundaryError(new Error("Unexpected Server Error"), status);
  }
}
function findParentBoundary(routes2, routeId, error) {
  let route = routes2[routeId] || routes2.root, isCatch = isRouteErrorResponse(error) && (!error.error || error.status === 404);
  return isCatch && route.module.CatchBoundary || !isCatch && route.module.ErrorBoundary || !route.parentId ? route.id : findParentBoundary(routes2, route.parentId, error);
}
function differentiateCatchVersusErrorBoundaries(build, context) {
  if (!context.errors)
    return;
  let errors = {};
  for (let routeId of Object.keys(context.errors)) {
    let error = context.errors[routeId], handlingRouteId = findParentBoundary(build.routes, routeId, error);
    errors[handlingRouteId] = error;
  }
  context.errors = errors;
}
async function handleDocumentRequestRR(serverMode, build, staticHandler, request, loadContext) {
  let context;
  try {
    context = await staticHandler.query(request, {
      requestContext: loadContext
    });
  } catch (error) {
    return !request.signal.aborted && serverMode !== ServerMode.Test && console.error(error), new Response(null, {
      status: 500
    });
  }
  if (isResponse2(context))
    return context;
  build.future.v2_errorBoundary !== !0 && differentiateCatchVersusErrorBoundaries(build, context);
  let headers = getDocumentHeadersRR(build, context), entryContext = {
    manifest: build.assets,
    routeModules: createEntryRouteModules(build.routes),
    staticHandlerContext: context,
    serverHandoffString: createServerHandoffString({
      state: {
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: serializeErrors(context.errors)
      },
      future: build.future,
      dev: build.dev
    }),
    future: build.future
  }, handleDocumentRequestFunction = build.entry.module.default;
  try {
    return await handleDocumentRequestFunction(request, context.statusCode, headers, entryContext);
  } catch (error) {
    context = getStaticContextFromError(staticHandler.dataRoutes, context, error), build.future.v2_errorBoundary !== !0 && differentiateCatchVersusErrorBoundaries(build, context), entryContext = {
      ...entryContext,
      staticHandlerContext: context,
      serverHandoffString: createServerHandoffString({
        state: {
          loaderData: context.loaderData,
          actionData: context.actionData,
          errors: serializeErrors(context.errors)
        },
        future: build.future
      })
    };
    try {
      return await handleDocumentRequestFunction(request, context.statusCode, headers, entryContext);
    } catch (error2) {
      return returnLastResortErrorResponse(error2, serverMode);
    }
  }
}
async function handleResourceRequestRR(serverMode, staticHandler, routeId, request, loadContext) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext
    });
    return invariant2(isResponse2(response), "Expected a Response to be returned from queryRoute"), response;
  } catch (error) {
    return isResponse2(error) ? (error.headers.set("X-Remix-Catch", "yes"), error) : returnLastResortErrorResponse(error, serverMode);
  }
}
async function errorBoundaryError(error, status) {
  return json3(await serializeError(error), {
    status,
    headers: {
      "X-Remix-Error": "yes"
    }
  });
}
function returnLastResortErrorResponse(error, serverMode) {
  serverMode !== ServerMode.Test && console.error(error);
  let message = "Unexpected Server Error";
  return serverMode !== ServerMode.Production && (message += `

${String(error)}`), new Response(message, {
    status: 500,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
var createRequestHandler, init_server = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/server.js"() {
    init_router();
    init_entry();
    init_errors();
    init_headers();
    init_invariant();
    init_mode();
    init_routeMatching();
    init_routes();
    init_responses();
    init_serverHandoff();
    createRequestHandler = (build, mode) => {
      let routes2 = createRoutes(build.routes), dataRoutes = createStaticHandlerDataRoutes(build.routes, build.future), serverMode = isServerMode(mode) ? mode : ServerMode.Production, staticHandler = createStaticHandler(dataRoutes);
      return async function(request, loadContext = {}) {
        let url = new URL(request.url), {
          unstable_dev
        } = build.future;
        if (mode === "development" && unstable_dev !== !1 && url.pathname === (unstable_dev.remixRequestHandlerPath ?? "") + "/__REMIX_ASSETS_MANIFEST")
          return request.method !== "GET" ? new Response("Method not allowed", {
            status: 405
          }) : new Response(JSON.stringify(build.assets), {
            status: 200,
            headers: {
              "Content-Type": "application/json"
            }
          });
        let matches = matchServerRoutes(routes2, url.pathname), response;
        if (url.searchParams.has("_data")) {
          let routeId = url.searchParams.get("_data");
          if (response = await handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext), build.entry.module.handleDataRequest) {
            let match = matches.find((match2) => match2.route.id == routeId);
            response = await build.entry.module.handleDataRequest(response, {
              context: loadContext,
              params: match.params,
              request
            });
          }
        } else
          matches && matches[matches.length - 1].route.module.default == null ? response = await handleResourceRequestRR(serverMode, staticHandler, matches.slice(-1)[0].route.id, request, loadContext) : response = await handleDocumentRequestRR(serverMode, build, staticHandler, request, loadContext);
        return request.method === "HEAD" ? new Response(null, {
          headers: response.headers,
          status: response.status,
          statusText: response.statusText
        }) : response;
      };
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/sessions.js
function flash(name) {
  return `__flash_${name}__`;
}
function warnOnceAboutSigningSessionCookie(cookie) {
  warnOnce(cookie.isSigned, `The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/utils/cookies#signing-cookies for more information.`);
}
var createSession, isSession, createSessionStorageFactory, init_sessions = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions.js"() {
    init_cookies();
    init_warnings();
    createSession = (initialData = {}, id = "") => {
      let map = new Map(Object.entries(initialData));
      return {
        get id() {
          return id;
        },
        get data() {
          return Object.fromEntries(map);
        },
        has(name) {
          return map.has(name) || map.has(flash(name));
        },
        get(name) {
          if (map.has(name))
            return map.get(name);
          let flashName = flash(name);
          if (map.has(flashName)) {
            let value = map.get(flashName);
            return map.delete(flashName), value;
          }
        },
        set(name, value) {
          map.set(name, value);
        },
        flash(name, value) {
          map.set(flash(name), value);
        },
        unset(name) {
          map.delete(name);
        }
      };
    }, isSession = (object) => object != null && typeof object.id == "string" && typeof object.data < "u" && typeof object.has == "function" && typeof object.get == "function" && typeof object.set == "function" && typeof object.flash == "function" && typeof object.unset == "function", createSessionStorageFactory = (createCookie) => ({
      cookie: cookieArg,
      createData,
      readData,
      updateData,
      deleteData
    }) => {
      let cookie = isCookie(cookieArg) ? cookieArg : createCookie((cookieArg == null ? void 0 : cookieArg.name) || "__session", cookieArg);
      return warnOnceAboutSigningSessionCookie(cookie), {
        async getSession(cookieHeader, options) {
          let id = cookieHeader && await cookie.parse(cookieHeader, options), data = id && await readData(id);
          return createSession(data || {}, id || "");
        },
        async commitSession(session, options) {
          let {
            id,
            data
          } = session;
          return id ? await updateData(id, data, cookie.expires) : id = await createData(data, cookie.expires), cookie.serialize(id, options);
        },
        async destroySession(session, options) {
          return await deleteData(session.id), cookie.serialize("", {
            ...options,
            expires: new Date(0)
          });
        }
      };
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js
var createCookieSessionStorageFactory, init_cookieStorage = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js"() {
    init_cookies();
    init_sessions();
    createCookieSessionStorageFactory = (createCookie) => ({
      cookie: cookieArg
    } = {}) => {
      let cookie = isCookie(cookieArg) ? cookieArg : createCookie((cookieArg == null ? void 0 : cookieArg.name) || "__session", cookieArg);
      return warnOnceAboutSigningSessionCookie(cookie), {
        async getSession(cookieHeader, options) {
          return createSession(cookieHeader && await cookie.parse(cookieHeader, options) || {});
        },
        async commitSession(session, options) {
          let serializedCookie = await cookie.serialize(session.data, options);
          if (serializedCookie.length > 4096)
            throw new Error("Cookie length will exceed browser maximum. Length: " + serializedCookie.length);
          return serializedCookie;
        },
        async destroySession(_session, options) {
          return cookie.serialize("", {
            ...options,
            expires: new Date(0)
          });
        }
      };
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js
var createMemorySessionStorageFactory, init_memoryStorage = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js"() {
    createMemorySessionStorageFactory = (createSessionStorage) => ({
      cookie
    } = {}) => {
      let uniqueId = 0, map = /* @__PURE__ */ new Map();
      return createSessionStorage({
        cookie,
        async createData(data, expires) {
          let id = (++uniqueId).toString();
          return map.set(id, {
            data,
            expires
          }), id;
        },
        async readData(id) {
          if (map.has(id)) {
            let {
              data,
              expires
            } = map.get(id);
            if (!expires || expires > new Date())
              return data;
            expires && map.delete(id);
          }
          return null;
        },
        async updateData(id, data, expires) {
          map.set(id, {
            data,
            expires
          });
        },
        async deleteData(id) {
          map.delete(id);
        }
      });
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/upload/errors.js
var MaxPartSizeExceededError, init_errors2 = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/upload/errors.js"() {
    MaxPartSizeExceededError = class extends Error {
      constructor(field, maxBytes) {
        super(`Field "${field}" exceeded upload size of ${maxBytes} bytes.`), this.field = field, this.maxBytes = maxBytes;
      }
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js
function createMemoryUploadHandler({
  filter,
  maxPartSize = 3e6
} = {}) {
  return async ({
    filename,
    contentType,
    name,
    data
  }) => {
    if (filter && !await filter({
      filename,
      contentType,
      name
    }))
      return;
    let size = 0, chunks = [];
    for await (let chunk of data) {
      if (size += chunk.byteLength, size > maxPartSize)
        throw new MaxPartSizeExceededError(name, maxPartSize);
      chunks.push(chunk);
    }
    return typeof filename == "string" ? new File(chunks, filename, {
      type: contentType
    }) : await new Blob(chunks, {
      type: contentType
    }).text();
  };
}
var init_memoryUploadHandler = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js"() {
    init_errors2();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  MaxPartSizeExceededError: () => MaxPartSizeExceededError,
  createCookieFactory: () => createCookieFactory,
  createCookieSessionStorageFactory: () => createCookieSessionStorageFactory,
  createMemorySessionStorageFactory: () => createMemorySessionStorageFactory,
  createRequestHandler: () => createRequestHandler,
  createSession: () => createSession,
  createSessionStorageFactory: () => createSessionStorageFactory,
  defer: () => defer3,
  isCookie: () => isCookie,
  isSession: () => isSession,
  json: () => json3,
  redirect: () => redirect3,
  unstable_composeUploadHandlers: () => composeUploadHandlers,
  unstable_createMemoryUploadHandler: () => createMemoryUploadHandler,
  unstable_parseMultipartFormData: () => parseMultipartFormData
});
var init_esm = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/index.js"() {
    init_cookies();
    init_formData();
    init_responses();
    init_server();
    init_sessions();
    init_cookieStorage();
    init_memoryStorage();
    init_memoryUploadHandler();
    init_errors2();
  }
});

// node_modules/@remix-run/cloudflare/dist/crypto.js
var require_crypto = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var encoder = new TextEncoder(), sign = async (value, secret) => {
      let key = await createKey2(secret, ["sign"]), data = encoder.encode(value), signature = await crypto.subtle.sign("HMAC", key, data), hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=+$/, "");
      return value + "." + hash;
    }, unsign = async (signed, secret) => {
      let index = signed.lastIndexOf("."), value = signed.slice(0, index), hash = signed.slice(index + 1), key = await createKey2(secret, ["verify"]), data = encoder.encode(value), signature = byteStringToUint8Array(atob(hash));
      return await crypto.subtle.verify("HMAC", key, signature, data) ? value : !1;
    };
    async function createKey2(secret, usages) {
      return await crypto.subtle.importKey("raw", encoder.encode(secret), {
        name: "HMAC",
        hash: "SHA-256"
      }, !1, usages);
    }
    function byteStringToUint8Array(byteString) {
      let array = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++)
        array[i] = byteString.charCodeAt(i);
      return array;
    }
    exports.sign = sign;
    exports.unsign = unsign;
  }
});

// node_modules/@remix-run/cloudflare/dist/implementations.js
var require_implementations = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/implementations.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var serverRuntime = (init_esm(), __toCommonJS(esm_exports)), crypto2 = require_crypto(), createCookie = serverRuntime.createCookieFactory({
      sign: crypto2.sign,
      unsign: crypto2.unsign
    }), createCookieSessionStorage = serverRuntime.createCookieSessionStorageFactory(createCookie), createSessionStorage = serverRuntime.createSessionStorageFactory(createCookie), createMemorySessionStorage = serverRuntime.createMemorySessionStorageFactory(createSessionStorage);
    exports.createCookie = createCookie;
    exports.createCookieSessionStorage = createCookieSessionStorage;
    exports.createMemorySessionStorage = createMemorySessionStorage;
    exports.createSessionStorage = createSessionStorage;
  }
});

// node_modules/@remix-run/cloudflare/dist/sessions/workersKVStorage.js
var require_workersKVStorage = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/sessions/workersKVStorage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var implementations = require_implementations();
    function createWorkersKVSessionStorage({
      cookie,
      kv
    }) {
      return implementations.createSessionStorage({
        cookie,
        async createData(data, expires) {
          for (; ; ) {
            let randomBytes = new Uint8Array(8);
            crypto.getRandomValues(randomBytes);
            let id = [...randomBytes].map((x) => x.toString(16).padStart(2, "0")).join("");
            if (!await kv.get(id, "json"))
              return await kv.put(id, JSON.stringify(data), {
                expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0
              }), id;
          }
        },
        async readData(id) {
          let session = await kv.get(id);
          return session ? JSON.parse(session) : null;
        },
        async updateData(id, data, expires) {
          await kv.put(id, JSON.stringify(data), {
            expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0
          });
        },
        async deleteData(id) {
          await kv.delete(id);
        }
      });
    }
    exports.createWorkersKVSessionStorage = createWorkersKVSessionStorage;
  }
});

// node_modules/@remix-run/cloudflare/dist/index.js
var require_dist = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var workersKVStorage = require_workersKVStorage(), implementations = require_implementations(), serverRuntime = (init_esm(), __toCommonJS(esm_exports)), warn = (fn, message) => (...args) => (console.warn(message), fn(...args)), createCloudflareKVSessionStorage = warn(workersKVStorage.createWorkersKVSessionStorage, "`createCloudflareKVSessionStorage` is deprecated. Please use `createWorkersKVSessionStorage` instead.");
    exports.createWorkersKVSessionStorage = workersKVStorage.createWorkersKVSessionStorage;
    exports.createCookie = implementations.createCookie;
    exports.createCookieSessionStorage = implementations.createCookieSessionStorage;
    exports.createMemorySessionStorage = implementations.createMemorySessionStorage;
    exports.createSessionStorage = implementations.createSessionStorage;
    Object.defineProperty(exports, "MaxPartSizeExceededError", {
      enumerable: !0,
      get: function() {
        return serverRuntime.MaxPartSizeExceededError;
      }
    });
    Object.defineProperty(exports, "createRequestHandler", {
      enumerable: !0,
      get: function() {
        return serverRuntime.createRequestHandler;
      }
    });
    Object.defineProperty(exports, "createSession", {
      enumerable: !0,
      get: function() {
        return serverRuntime.createSession;
      }
    });
    Object.defineProperty(exports, "defer", {
      enumerable: !0,
      get: function() {
        return serverRuntime.defer;
      }
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: !0,
      get: function() {
        return serverRuntime.isCookie;
      }
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: !0,
      get: function() {
        return serverRuntime.isSession;
      }
    });
    Object.defineProperty(exports, "json", {
      enumerable: !0,
      get: function() {
        return serverRuntime.json;
      }
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: !0,
      get: function() {
        return serverRuntime.redirect;
      }
    });
    Object.defineProperty(exports, "unstable_composeUploadHandlers", {
      enumerable: !0,
      get: function() {
        return serverRuntime.unstable_composeUploadHandlers;
      }
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: !0,
      get: function() {
        return serverRuntime.unstable_createMemoryUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: !0,
      get: function() {
        return serverRuntime.unstable_parseMultipartFormData;
      }
    });
    exports.createCloudflareKVSessionStorage = createCloudflareKVSessionStorage;
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols, hasOwnProperty2 = Object.prototype.hasOwnProperty, propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val == null)
        throw new TypeError("Object.assign cannot be called with null or undefined");
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign)
          return !1;
        var test1 = new String("abc");
        if (test1[5] = "de", Object.getOwnPropertyNames(test1)[0] === "5")
          return !1;
        for (var test2 = {}, i = 0; i < 10; i++)
          test2["_" + String.fromCharCode(i)] = i;
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789")
          return !1;
        var test3 = {};
        return "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        }), Object.keys(Object.assign({}, test3)).join("") === "abcdefghijklmnopqrst";
      } catch {
        return !1;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      for (var from2, to = toObject(target), symbols, s = 1; s < arguments.length; s++) {
        from2 = Object(arguments[s]);
        for (var key in from2)
          hasOwnProperty2.call(from2, key) && (to[key] = from2[key]);
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from2);
          for (var i = 0; i < symbols.length; i++)
            propIsEnumerable.call(from2, symbols[i]) && (to[symbols[i]] = from2[symbols[i]]);
        }
      }
      return to;
    };
  }
});

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var _assign = require_object_assign(), ReactVersion = "17.0.2", REACT_ELEMENT_TYPE = 60103, REACT_PORTAL_TYPE = 60106;
      exports.Fragment = 60107, exports.StrictMode = 60108, exports.Profiler = 60114;
      var REACT_PROVIDER_TYPE = 60109, REACT_CONTEXT_TYPE = 60110, REACT_FORWARD_REF_TYPE = 60112;
      exports.Suspense = 60113;
      var REACT_SUSPENSE_LIST_TYPE = 60120, REACT_MEMO_TYPE = 60115, REACT_LAZY_TYPE = 60116, REACT_BLOCK_TYPE = 60121, REACT_SERVER_BLOCK_TYPE = 60122, REACT_FUNDAMENTAL_TYPE = 60117, REACT_SCOPE_TYPE = 60119, REACT_OPAQUE_ID_TYPE = 60128, REACT_DEBUG_TRACING_MODE_TYPE = 60129, REACT_OFFSCREEN_TYPE = 60130, REACT_LEGACY_HIDDEN_TYPE = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var symbolFor = Symbol.for;
        REACT_ELEMENT_TYPE = symbolFor("react.element"), REACT_PORTAL_TYPE = symbolFor("react.portal"), exports.Fragment = symbolFor("react.fragment"), exports.StrictMode = symbolFor("react.strict_mode"), exports.Profiler = symbolFor("react.profiler"), REACT_PROVIDER_TYPE = symbolFor("react.provider"), REACT_CONTEXT_TYPE = symbolFor("react.context"), REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref"), exports.Suspense = symbolFor("react.suspense"), REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list"), REACT_MEMO_TYPE = symbolFor("react.memo"), REACT_LAZY_TYPE = symbolFor("react.lazy"), REACT_BLOCK_TYPE = symbolFor("react.block"), REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block"), REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental"), REACT_SCOPE_TYPE = symbolFor("react.scope"), REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id"), REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode"), REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen"), REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
      }
      var MAYBE_ITERATOR_SYMBOL = typeof Symbol == "function" && Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable != "object")
          return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        return typeof maybeIterator == "function" ? maybeIterator : null;
      }
      var ReactCurrentDispatcher = {
        current: null
      }, ReactCurrentBatchConfig = {
        transition: 0
      }, ReactCurrentOwner = {
        current: null
      }, ReactDebugCurrentFrame = {}, currentExtraStackFrame = null;
      function setExtraStackFrame(stack) {
        currentExtraStackFrame = stack;
      }
      ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
        currentExtraStackFrame = stack;
      }, ReactDebugCurrentFrame.getCurrentStack = null, ReactDebugCurrentFrame.getStackAddendum = function() {
        var stack = "";
        currentExtraStackFrame && (stack += currentExtraStackFrame);
        var impl = ReactDebugCurrentFrame.getCurrentStack;
        return impl && (stack += impl() || ""), stack;
      };
      var IsSomeRendererActing = {
        current: !1
      }, ReactSharedInternals = {
        ReactCurrentDispatcher,
        ReactCurrentBatchConfig,
        ReactCurrentOwner,
        IsSomeRendererActing,
        assign: _assign
      };
      ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
      function warn(format2) {
        {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
            args[_key - 1] = arguments[_key];
          printWarning("warn", format2, args);
        }
      }
      function error(format2) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format2, args);
        }
      }
      function printWarning(level, format2, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format2 += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return "" + item;
          });
          argsWithFormat.unshift("Warning: " + format2), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var didWarnStateUpdateForUnmountedComponent = {};
      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor, componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass", warningKey = componentName + "." + callerName;
          if (didWarnStateUpdateForUnmountedComponent[warningKey])
            return;
          error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName), didWarnStateUpdateForUnmountedComponent[warningKey] = !0;
        }
      }
      var ReactNoopUpdateQueue = {
        isMounted: function(publicInstance) {
          return !1;
        },
        enqueueForceUpdate: function(publicInstance, callback, callerName) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance, partialState, callback, callerName) {
          warnNoop(publicInstance, "setState");
        }
      }, emptyObject = {};
      Object.freeze(emptyObject);
      function Component2(props, context, updater) {
        this.props = props, this.context = context, this.refs = emptyObject, this.updater = updater || ReactNoopUpdateQueue;
      }
      Component2.prototype.isReactComponent = {}, Component2.prototype.setState = function(partialState, callback) {
        if (!(typeof partialState == "object" || typeof partialState == "function" || partialState == null))
          throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      }, Component2.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      {
        var deprecatedAPIs = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, defineDeprecationWarning = function(methodName, info) {
          Object.defineProperty(Component2.prototype, methodName, {
            get: function() {
              warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
            }
          });
        };
        for (var fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      }
      function ComponentDummy() {
      }
      ComponentDummy.prototype = Component2.prototype;
      function PureComponent(props, context, updater) {
        this.props = props, this.context = context, this.refs = emptyObject, this.updater = updater || ReactNoopUpdateQueue;
      }
      var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
      pureComponentPrototype.constructor = PureComponent, _assign(pureComponentPrototype, Component2.prototype), pureComponentPrototype.isPureReactComponent = !0;
      function createRef() {
        var refObject = {
          current: null
        };
        return Object.seal(refObject), refObject;
      }
      function getWrappedName2(outerType, innerType, wrapperName) {
        var functionName = innerType.displayName || innerType.name || "";
        return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentName(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case exports.Fragment:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case exports.Profiler:
            return "Profiler";
          case exports.StrictMode:
            return "StrictMode";
          case exports.Suspense:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName2(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              return getComponentName(type.type);
            case REACT_BLOCK_TYPE:
              return getComponentName(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return getComponentName(init2(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var hasOwnProperty2 = Object.prototype.hasOwnProperty, RESERVED_PROPS = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
      didWarnAboutStringRefs = {};
      function hasValidRef(config2) {
        if (hasOwnProperty2.call(config2, "ref")) {
          var getter = Object.getOwnPropertyDescriptor(config2, "ref").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config2.ref !== void 0;
      }
      function hasValidKey(config2) {
        if (hasOwnProperty2.call(config2, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config2, "key").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config2.key !== void 0;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        var warnAboutAccessingKey = function() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
        };
        warnAboutAccessingKey.isReactWarning = !0, Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: !0
        });
      }
      function defineRefPropWarningGetter(props, displayName) {
        var warnAboutAccessingRef = function() {
          specialPropRefWarningShown || (specialPropRefWarningShown = !0, error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
        };
        warnAboutAccessingRef.isReactWarning = !0, Object.defineProperty(props, "ref", {
          get: warnAboutAccessingRef,
          configurable: !0
        });
      }
      function warnIfStringRefCannotBeAutoConverted(config2) {
        if (typeof config2.ref == "string" && ReactCurrentOwner.current && config2.__self && ReactCurrentOwner.current.stateNode !== config2.__self) {
          var componentName = getComponentName(ReactCurrentOwner.current.type);
          didWarnAboutStringRefs[componentName] || (error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config2.ref), didWarnAboutStringRefs[componentName] = !0);
        }
      }
      var ReactElement = function(type, key, ref, self2, source, owner, props) {
        var element = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref,
          props,
          _owner: owner
        };
        return element._store = {}, Object.defineProperty(element._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(element, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: self2
        }), Object.defineProperty(element, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: source
        }), Object.freeze && (Object.freeze(element.props), Object.freeze(element)), element;
      };
      function createElement7(type, config2, children) {
        var propName, props = {}, key = null, ref = null, self2 = null, source = null;
        if (config2 != null) {
          hasValidRef(config2) && (ref = config2.ref, warnIfStringRefCannotBeAutoConverted(config2)), hasValidKey(config2) && (key = "" + config2.key), self2 = config2.__self === void 0 ? null : config2.__self, source = config2.__source === void 0 ? null : config2.__source;
          for (propName in config2)
            hasOwnProperty2.call(config2, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = config2[propName]);
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1)
          props.children = children;
        else if (childrenLength > 1) {
          for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
            childArray[i] = arguments[i + 2];
          Object.freeze && Object.freeze(childArray), props.children = childArray;
        }
        if (type && type.defaultProps) {
          var defaultProps2 = type.defaultProps;
          for (propName in defaultProps2)
            props[propName] === void 0 && (props[propName] = defaultProps2[propName]);
        }
        if (key || ref) {
          var displayName = typeof type == "function" ? type.displayName || type.name || "Unknown" : type;
          key && defineKeyPropWarningGetter(props, displayName), ref && defineRefPropWarningGetter(props, displayName);
        }
        return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
        return newElement;
      }
      function cloneElement2(element, config2, children) {
        if (element == null)
          throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
        var propName, props = _assign({}, element.props), key = element.key, ref = element.ref, self2 = element._self, source = element._source, owner = element._owner;
        if (config2 != null) {
          hasValidRef(config2) && (ref = config2.ref, owner = ReactCurrentOwner.current), hasValidKey(config2) && (key = "" + config2.key);
          var defaultProps2;
          element.type && element.type.defaultProps && (defaultProps2 = element.type.defaultProps);
          for (propName in config2)
            hasOwnProperty2.call(config2, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (config2[propName] === void 0 && defaultProps2 !== void 0 ? props[propName] = defaultProps2[propName] : props[propName] = config2[propName]);
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1)
          props.children = children;
        else if (childrenLength > 1) {
          for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
            childArray[i] = arguments[i + 2];
          props.children = childArray;
        }
        return ReactElement(element.type, key, ref, self2, source, owner, props);
      }
      function isValidElement4(object) {
        return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var SEPARATOR = ".", SUBSEPARATOR = ":";
      function escape2(key) {
        var escapeRegex = /[=:]/g, escaperLookup = {
          "=": "=0",
          ":": "=2"
        }, escapedString = key.replace(escapeRegex, function(match) {
          return escaperLookup[match];
        });
        return "$" + escapedString;
      }
      var didWarnAboutMaps = !1, userProvidedKeyEscapeRegex = /\/+/g;
      function escapeUserProvidedKey(text) {
        return text.replace(userProvidedKeyEscapeRegex, "$&/");
      }
      function getElementKey(element, index) {
        return typeof element == "object" && element !== null && element.key != null ? escape2("" + element.key) : index.toString(36);
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        (type === "undefined" || type === "boolean") && (children = null);
        var invokeCallback = !1;
        if (children === null)
          invokeCallback = !0;
        else
          switch (type) {
            case "string":
            case "number":
              invokeCallback = !0;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = !0;
              }
          }
        if (invokeCallback) {
          var _child = children, mappedChild = callback(_child), childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
          if (Array.isArray(mappedChild)) {
            var escapedChildKey = "";
            childKey != null && (escapedChildKey = escapeUserProvidedKey(childKey) + "/"), mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
              return c;
            });
          } else
            mappedChild != null && (isValidElement4(mappedChild) && (mappedChild = cloneAndReplaceKey(
              mappedChild,
              escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey
            )), array.push(mappedChild));
          return 1;
        }
        var child, nextName, subtreeCount = 0, nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
        if (Array.isArray(children))
          for (var i = 0; i < children.length; i++)
            child = children[i], nextName = nextNamePrefix + getElementKey(child, i), subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
        else {
          var iteratorFn = getIteratorFn(children);
          if (typeof iteratorFn == "function") {
            var iterableChildren = children;
            iteratorFn === iterableChildren.entries && (didWarnAboutMaps || warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0);
            for (var iterator = iteratorFn.call(iterableChildren), step, ii = 0; !(step = iterator.next()).done; )
              child = step.value, nextName = nextNamePrefix + getElementKey(child, ii++), subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
          } else if (type === "object") {
            var childrenString = "" + children;
            throw Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return subtreeCount;
      }
      function mapChildren(children, func, context) {
        if (children == null)
          return children;
        var result = [], count = 0;
        return mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        }), result;
      }
      function countChildren(children) {
        var n = 0;
        return mapChildren(children, function() {
          n++;
        }), n;
      }
      function forEachChildren(children, forEachFunc, forEachContext) {
        mapChildren(children, function() {
          forEachFunc.apply(this, arguments);
        }, forEachContext);
      }
      function toArray(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      }
      function onlyChild(children) {
        if (!isValidElement4(children))
          throw Error("React.Children.only expected to receive a single React element child.");
        return children;
      }
      function createContext8(defaultValue, calculateChangedBits) {
        calculateChangedBits === void 0 ? calculateChangedBits = null : calculateChangedBits !== null && typeof calculateChangedBits != "function" && error("createContext: Expected the optional second argument to be a function. Instead received: %s", calculateChangedBits);
        var context = {
          $$typeof: REACT_CONTEXT_TYPE,
          _calculateChangedBits: calculateChangedBits,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        context.Provider = {
          $$typeof: REACT_PROVIDER_TYPE,
          _context: context
        };
        var hasWarnedAboutUsingNestedContextConsumers = !1, hasWarnedAboutUsingConsumerProvider = !1, hasWarnedAboutDisplayNameOnConsumer = !1;
        {
          var Consumer = {
            $$typeof: REACT_CONTEXT_TYPE,
            _context: context,
            _calculateChangedBits: context._calculateChangedBits
          };
          Object.defineProperties(Consumer, {
            Provider: {
              get: function() {
                return hasWarnedAboutUsingConsumerProvider || (hasWarnedAboutUsingConsumerProvider = !0, error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), context.Provider;
              },
              set: function(_Provider) {
                context.Provider = _Provider;
              }
            },
            _currentValue: {
              get: function() {
                return context._currentValue;
              },
              set: function(_currentValue) {
                context._currentValue = _currentValue;
              }
            },
            _currentValue2: {
              get: function() {
                return context._currentValue2;
              },
              set: function(_currentValue2) {
                context._currentValue2 = _currentValue2;
              }
            },
            _threadCount: {
              get: function() {
                return context._threadCount;
              },
              set: function(_threadCount) {
                context._threadCount = _threadCount;
              }
            },
            Consumer: {
              get: function() {
                return hasWarnedAboutUsingNestedContextConsumers || (hasWarnedAboutUsingNestedContextConsumers = !0, error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), context.Consumer;
              }
            },
            displayName: {
              get: function() {
                return context.displayName;
              },
              set: function(displayName) {
                hasWarnedAboutDisplayNameOnConsumer || (warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName), hasWarnedAboutDisplayNameOnConsumer = !0);
              }
            }
          }), context.Consumer = Consumer;
        }
        return context._currentRenderer = null, context._currentRenderer2 = null, context;
      }
      var Uninitialized = -1, Pending = 0, Resolved = 1, Rejected = 2;
      function lazyInitializer(payload) {
        if (payload._status === Uninitialized) {
          var ctor = payload._result, thenable = ctor(), pending = payload;
          pending._status = Pending, pending._result = thenable, thenable.then(function(moduleObject) {
            if (payload._status === Pending) {
              var defaultExport = moduleObject.default;
              defaultExport === void 0 && error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, moduleObject);
              var resolved = payload;
              resolved._status = Resolved, resolved._result = defaultExport;
            }
          }, function(error2) {
            if (payload._status === Pending) {
              var rejected = payload;
              rejected._status = Rejected, rejected._result = error2;
            }
          });
        }
        if (payload._status === Resolved)
          return payload._result;
        throw payload._result;
      }
      function lazy(ctor) {
        var payload = {
          _status: -1,
          _result: ctor
        }, lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: payload,
          _init: lazyInitializer
        };
        {
          var defaultProps2, propTypes;
          Object.defineProperties(lazyType, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return defaultProps2;
              },
              set: function(newDefaultProps) {
                error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), defaultProps2 = newDefaultProps, Object.defineProperty(lazyType, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return propTypes;
              },
              set: function(newPropTypes) {
                error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), propTypes = newPropTypes, Object.defineProperty(lazyType, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return lazyType;
      }
      function forwardRef13(render) {
        render != null && render.$$typeof === REACT_MEMO_TYPE ? error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof render != "function" ? error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render) : render.length !== 0 && render.length !== 2 && error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), render != null && (render.defaultProps != null || render.propTypes != null) && error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var elementType = {
          $$typeof: REACT_FORWARD_REF_TYPE,
          render
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name, render.displayName == null && (render.displayName = name);
            }
          });
        }
        return elementType;
      }
      var enableScopeAPI = !1;
      function isValidElementType(type) {
        return !!(typeof type == "string" || typeof type == "function" || type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE));
      }
      function memo2(type, compare3) {
        isValidElementType(type) || error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
        var elementType = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: compare3 === void 0 ? null : compare3
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name, type.displayName == null && (type.displayName = name);
            }
          });
        }
        return elementType;
      }
      function resolveDispatcher() {
        var dispatcher = ReactCurrentDispatcher.current;
        if (dispatcher === null)
          throw Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
        return dispatcher;
      }
      function useContext8(Context2, unstable_observedBits) {
        var dispatcher = resolveDispatcher();
        if (unstable_observedBits !== void 0 && error("useContext() second argument is reserved for future use in React. Passing it is not supported. You passed: %s.%s", unstable_observedBits, typeof unstable_observedBits == "number" && Array.isArray(arguments[2]) ? `

Did you call array.map(useContext)? Calling Hooks inside a loop is not supported. Learn more at https://reactjs.org/link/rules-of-hooks` : ""), Context2._context !== void 0) {
          var realContext = Context2._context;
          realContext.Consumer === Context2 ? error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : realContext.Provider === Context2 && error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return dispatcher.useContext(Context2, unstable_observedBits);
      }
      function useState13(initialState) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useState(initialState);
      }
      function useReducer(reducer, initialArg, init2) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useReducer(reducer, initialArg, init2);
      }
      function useRef9(initialValue) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useRef(initialValue);
      }
      function useEffect13(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useEffect(create, deps);
      }
      function useLayoutEffect5(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useLayoutEffect(create, deps);
      }
      function useCallback9(callback, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useCallback(callback, deps);
      }
      function useMemo7(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useMemo(create, deps);
      }
      function useImperativeHandle3(ref, create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useImperativeHandle(ref, create, deps);
      }
      function useDebugValue3(value, formatterFn) {
        {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDebugValue(value, formatterFn);
        }
      }
      var disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = !0;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: !0,
              enumerable: !0,
              value: disabledLog,
              writable: !0
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: _assign({}, props, {
                value: prevLog
              }),
              info: _assign({}, props, {
                value: prevInfo
              }),
              warn: _assign({}, props, {
                value: prevWarn
              }),
              error: _assign({}, props, {
                value: prevError
              }),
              group: _assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: _assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: _assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = !1, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = !0;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher$1.current, ReactCurrentDispatcher$1.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = !1, ReactCurrentDispatcher$1.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, !1);
      }
      function shouldConstruct(Component3) {
        var prototype = Component3.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case exports.Suspense:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_BLOCK_TYPE:
              return describeFunctionComponentFrame(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init2(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var loggedTypeFailures = {}, ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values3, location, componentName, element) {
        {
          var has = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values3, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = !0, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      function setCurrentlyValidatingElement$1(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          setExtraStackFrame(stack);
        } else
          setExtraStackFrame(null);
      }
      var propTypesMisspellWarningShown;
      propTypesMisspellWarningShown = !1;
      function getDeclarationErrorAddendum() {
        if (ReactCurrentOwner.current) {
          var name = getComponentName(ReactCurrentOwner.current.type);
          if (name)
            return `

Check the render method of \`` + name + "`.";
        }
        return "";
      }
      function getSourceInfoErrorAddendum(source) {
        if (source !== void 0) {
          var fileName = source.fileName.replace(/^.*[\\\/]/, ""), lineNumber = source.lineNumber;
          return `

Check your code at ` + fileName + ":" + lineNumber + ".";
        }
        return "";
      }
      function getSourceInfoErrorAddendumForProps(elementProps) {
        return elementProps != null ? getSourceInfoErrorAddendum(elementProps.__source) : "";
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        var info = getDeclarationErrorAddendum();
        if (!info) {
          var parentName = typeof parentType == "string" ? parentType : parentType.displayName || parentType.name;
          parentName && (info = `

Check the top-level render call using <` + parentName + ">.");
        }
        return info;
      }
      function validateExplicitKey(element, parentType) {
        if (!(!element._store || element._store.validated || element.key != null)) {
          element._store.validated = !0;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (!ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            ownerHasKeyUseWarning[currentComponentErrorInfo] = !0;
            var childOwner = "";
            element && element._owner && element._owner !== ReactCurrentOwner.current && (childOwner = " It was passed a child from " + getComponentName(element._owner.type) + "."), setCurrentlyValidatingElement$1(element), error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner), setCurrentlyValidatingElement$1(null);
          }
        }
      }
      function validateChildKeys(node, parentType) {
        if (typeof node == "object") {
          if (Array.isArray(node))
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              isValidElement4(child) && validateExplicitKey(child, parentType);
            }
          else if (isValidElement4(node))
            node._store && (node._store.validated = !0);
          else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn == "function" && iteratorFn !== node.entries)
              for (var iterator = iteratorFn.call(node), step; !(step = iterator.next()).done; )
                isValidElement4(step.value) && validateExplicitKey(step.value, parentType);
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type == null || typeof type == "string")
            return;
          var propTypes;
          if (typeof type == "function")
            propTypes = type.propTypes;
          else if (typeof type == "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE))
            propTypes = type.propTypes;
          else
            return;
          if (propTypes) {
            var name = getComponentName(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = !0;
            var _name = getComponentName(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          typeof type.getDefaultProps == "function" && !type.getDefaultProps.isReactClassApproved && error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function validateFragmentProps(fragment) {
        {
          for (var keys2 = Object.keys(fragment.props), i = 0; i < keys2.length; i++) {
            var key = keys2[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment), error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key), setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          fragment.ref !== null && (setCurrentlyValidatingElement$1(fragment), error("Invalid attribute `ref` supplied to `React.Fragment`."), setCurrentlyValidatingElement$1(null));
        }
      }
      function createElementWithValidation(type, props, children) {
        var validType = isValidElementType(type);
        if (!validType) {
          var info = "";
          (type === void 0 || typeof type == "object" && type !== null && Object.keys(type).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var sourceInfo = getSourceInfoErrorAddendumForProps(props);
          sourceInfo ? info += sourceInfo : info += getDeclarationErrorAddendum();
          var typeString;
          type === null ? typeString = "null" : Array.isArray(type) ? typeString = "array" : type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE ? (typeString = "<" + (getComponentName(type.type) || "Unknown") + " />", info = " Did you accidentally export a JSX literal instead of a component?") : typeString = typeof type, error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
        }
        var element = createElement7.apply(this, arguments);
        if (element == null)
          return element;
        if (validType)
          for (var i = 2; i < arguments.length; i++)
            validateChildKeys(arguments[i], type);
        return type === exports.Fragment ? validateFragmentProps(element) : validatePropTypes(element), element;
      }
      var didWarnAboutDeprecatedCreateFactory = !1;
      function createFactoryWithValidation(type) {
        var validatedFactory = createElementWithValidation.bind(null, type);
        return validatedFactory.type = type, didWarnAboutDeprecatedCreateFactory || (didWarnAboutDeprecatedCreateFactory = !0, warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(validatedFactory, "type", {
          enumerable: !1,
          get: function() {
            return warn("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: type
            }), type;
          }
        }), validatedFactory;
      }
      function cloneElementWithValidation(element, props, children) {
        for (var newElement = cloneElement2.apply(this, arguments), i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i], newElement.type);
        return validatePropTypes(newElement), newElement;
      }
      try {
        var frozenObject = Object.freeze({});
      } catch {
      }
      var createElement$1 = createElementWithValidation, cloneElement$1 = cloneElementWithValidation, createFactory = createFactoryWithValidation, Children4 = {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray,
        only: onlyChild
      };
      exports.Children = Children4, exports.Component = Component2, exports.PureComponent = PureComponent, exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals, exports.cloneElement = cloneElement$1, exports.createContext = createContext8, exports.createElement = createElement$1, exports.createFactory = createFactory, exports.createRef = createRef, exports.forwardRef = forwardRef13, exports.isValidElement = isValidElement4, exports.lazy = lazy, exports.memo = memo2, exports.useCallback = useCallback9, exports.useContext = useContext8, exports.useDebugValue = useDebugValue3, exports.useEffect = useEffect13, exports.useImperativeHandle = useImperativeHandle3, exports.useLayoutEffect = useLayoutEffect5, exports.useMemo = useMemo7, exports.useReducer = useReducer, exports.useRef = useRef9, exports.useState = useState13, exports.version = ReactVersion;
    })();
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    module.exports = require_react_development();
  }
});

// node-modules-polyfills:events
function EventHandlers() {
}
function EventEmitter() {
  EventEmitter.init.call(this);
}
function $getMaxListeners(that) {
  return that._maxListeners === void 0 ? EventEmitter.defaultMaxListeners : that._maxListeners;
}
function emitNone(handler, isFn, self2) {
  if (isFn)
    handler.call(self2);
  else
    for (var len = handler.length, listeners2 = arrayClone(handler, len), i = 0; i < len; ++i)
      listeners2[i].call(self2);
}
function emitOne(handler, isFn, self2, arg1) {
  if (isFn)
    handler.call(self2, arg1);
  else
    for (var len = handler.length, listeners2 = arrayClone(handler, len), i = 0; i < len; ++i)
      listeners2[i].call(self2, arg1);
}
function emitTwo(handler, isFn, self2, arg1, arg2) {
  if (isFn)
    handler.call(self2, arg1, arg2);
  else
    for (var len = handler.length, listeners2 = arrayClone(handler, len), i = 0; i < len; ++i)
      listeners2[i].call(self2, arg1, arg2);
}
function emitThree(handler, isFn, self2, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self2, arg1, arg2, arg3);
  else
    for (var len = handler.length, listeners2 = arrayClone(handler, len), i = 0; i < len; ++i)
      listeners2[i].call(self2, arg1, arg2, arg3);
}
function emitMany(handler, isFn, self2, args) {
  if (isFn)
    handler.apply(self2, args);
  else
    for (var len = handler.length, listeners2 = arrayClone(handler, len), i = 0; i < len; ++i)
      listeners2[i].apply(self2, args);
}
function _addListener(target, type, listener, prepend) {
  var m, events, existing;
  if (typeof listener != "function")
    throw new TypeError('"listener" argument must be a function');
  if (events = target._events, events ? (events.newListener && (target.emit(
    "newListener",
    type,
    listener.listener ? listener.listener : listener
  ), events = target._events), existing = events[type]) : (events = target._events = new EventHandlers(), target._eventsCount = 0), !existing)
    existing = events[type] = listener, ++target._eventsCount;
  else if (typeof existing == "function" ? existing = events[type] = prepend ? [listener, existing] : [existing, listener] : prepend ? existing.unshift(listener) : existing.push(listener), !existing.warned && (m = $getMaxListeners(target), m && m > 0 && existing.length > m)) {
    existing.warned = !0;
    var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + type + " listeners added. Use emitter.setMaxListeners() to increase limit");
    w.name = "MaxListenersExceededWarning", w.emitter = target, w.type = type, w.count = existing.length, emitWarning(w);
  }
  return target;
}
function emitWarning(e) {
  typeof console.warn == "function" ? console.warn(e) : console.log(e);
}
function _onceWrap(target, type, listener) {
  var fired = !1;
  function g() {
    target.removeListener(type, g), fired || (fired = !0, listener.apply(target, arguments));
  }
  return g.listener = listener, g;
}
function listenerCount(type) {
  var events = this._events;
  if (events) {
    var evlistener = events[type];
    if (typeof evlistener == "function")
      return 1;
    if (evlistener)
      return evlistener.length;
  }
  return 0;
}
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}
function arrayClone(arr, i) {
  for (var copy2 = new Array(i); i--; )
    copy2[i] = arr[i];
  return copy2;
}
function unwrapListeners(arr) {
  for (var ret = new Array(arr.length), i = 0; i < ret.length; ++i)
    ret[i] = arr[i].listener || arr[i];
  return ret;
}
var domain, events_default, init_events = __esm({
  "node-modules-polyfills:events"() {
    "use strict";
    EventHandlers.prototype = /* @__PURE__ */ Object.create(null);
    events_default = EventEmitter;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.usingDomains = !1;
    EventEmitter.prototype.domain = void 0;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._maxListeners = void 0;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.init = function() {
      this.domain = null, EventEmitter.usingDomains && domain.active && !(this instanceof domain.Domain) && (this.domain = domain.active), (!this._events || this._events === Object.getPrototypeOf(this)._events) && (this._events = new EventHandlers(), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function(n) {
      if (typeof n != "number" || n < 0 || isNaN(n))
        throw new TypeError('"n" argument must be a positive number');
      return this._maxListeners = n, this;
    };
    EventEmitter.prototype.getMaxListeners = function() {
      return $getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function(type) {
      var er, handler, len, args, i, events, domain2, needDomainExit = !1, doError = type === "error";
      if (events = this._events, events)
        doError = doError && events.error == null;
      else if (!doError)
        return !1;
      if (domain2 = this.domain, doError) {
        if (er = arguments[1], domain2)
          er || (er = new Error('Uncaught, unspecified "error" event')), er.domainEmitter = this, er.domain = domain2, er.domainThrown = !1, domain2.emit("error", er);
        else {
          if (er instanceof Error)
            throw er;
          var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
          throw err.context = er, err;
        }
        return !1;
      }
      if (handler = events[type], !handler)
        return !1;
      var isFn = typeof handler == "function";
      switch (len = arguments.length, len) {
        case 1:
          emitNone(handler, isFn, this);
          break;
        case 2:
          emitOne(handler, isFn, this, arguments[1]);
          break;
        case 3:
          emitTwo(handler, isFn, this, arguments[1], arguments[2]);
          break;
        case 4:
          emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
          break;
        default:
          for (args = new Array(len - 1), i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          emitMany(handler, isFn, this, args);
      }
      return needDomainExit && domain2.exit(), !0;
    };
    EventEmitter.prototype.addListener = function(type, listener) {
      return _addListener(this, type, listener, !1);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function(type, listener) {
      return _addListener(this, type, listener, !0);
    };
    EventEmitter.prototype.once = function(type, listener) {
      if (typeof listener != "function")
        throw new TypeError('"listener" argument must be a function');
      return this.on(type, _onceWrap(this, type, listener)), this;
    };
    EventEmitter.prototype.prependOnceListener = function(type, listener) {
      if (typeof listener != "function")
        throw new TypeError('"listener" argument must be a function');
      return this.prependListener(type, _onceWrap(this, type, listener)), this;
    };
    EventEmitter.prototype.removeListener = function(type, listener) {
      var list, events, position2, i, originalListener;
      if (typeof listener != "function")
        throw new TypeError('"listener" argument must be a function');
      if (events = this._events, !events)
        return this;
      if (list = events[type], !list)
        return this;
      if (list === listener || list.listener && list.listener === listener)
        --this._eventsCount === 0 ? this._events = new EventHandlers() : (delete events[type], events.removeListener && this.emit("removeListener", type, list.listener || listener));
      else if (typeof list != "function") {
        for (position2 = -1, i = list.length; i-- > 0; )
          if (list[i] === listener || list[i].listener && list[i].listener === listener) {
            originalListener = list[i].listener, position2 = i;
            break;
          }
        if (position2 < 0)
          return this;
        if (list.length === 1) {
          if (list[0] = void 0, --this._eventsCount === 0)
            return this._events = new EventHandlers(), this;
          delete events[type];
        } else
          spliceOne(list, position2);
        events.removeListener && this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function(type) {
      var listeners2, events;
      if (events = this._events, !events)
        return this;
      if (!events.removeListener)
        return arguments.length === 0 ? (this._events = new EventHandlers(), this._eventsCount = 0) : events[type] && (--this._eventsCount === 0 ? this._events = new EventHandlers() : delete events[type]), this;
      if (arguments.length === 0) {
        for (var keys2 = Object.keys(events), i = 0, key; i < keys2.length; ++i)
          key = keys2[i], key !== "removeListener" && this.removeAllListeners(key);
        return this.removeAllListeners("removeListener"), this._events = new EventHandlers(), this._eventsCount = 0, this;
      }
      if (listeners2 = events[type], typeof listeners2 == "function")
        this.removeListener(type, listeners2);
      else if (listeners2)
        do
          this.removeListener(type, listeners2[listeners2.length - 1]);
        while (listeners2[0]);
      return this;
    };
    EventEmitter.prototype.listeners = function(type) {
      var evlistener, ret, events = this._events;
      return events ? (evlistener = events[type], evlistener ? typeof evlistener == "function" ? ret = [evlistener.listener || evlistener] : ret = unwrapListeners(evlistener) : ret = []) : ret = [], ret;
    };
    EventEmitter.listenerCount = function(emitter, type) {
      return typeof emitter.listenerCount == "function" ? emitter.listenerCount(type) : listenerCount.call(emitter, type);
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    EventEmitter.prototype.eventNames = function() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    };
  }
});

// node-modules-polyfills:process
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout)
    return setTimeout(fun, 0);
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout)
    return cachedSetTimeout = setTimeout, setTimeout(fun, 0);
  try {
    return cachedSetTimeout(fun, 0);
  } catch {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout)
    return clearTimeout(marker);
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout)
    return cachedClearTimeout = clearTimeout, clearTimeout(marker);
  try {
    return cachedClearTimeout(marker);
  } catch {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
function cleanUpNextTick() {
  !draining || !currentQueue || (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue());
}
function drainQueue() {
  if (!draining) {
    var timeout = runTimeout(cleanUpNextTick);
    draining = !0;
    for (var len = queue.length; len; ) {
      for (currentQueue = queue, queue = []; ++queueIndex < len; )
        currentQueue && currentQueue[queueIndex].run();
      queueIndex = -1, len = queue.length;
    }
    currentQueue = null, draining = !1, runClearTimeout(timeout);
  }
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
  queue.push(new Item(fun, args)), queue.length === 1 && !draining && runTimeout(drainQueue);
}
function Item(fun, array) {
  this.fun = fun, this.array = array;
}
function noop() {
}
function binding(name) {
  throw new Error("process.binding is not supported");
}
function cwd() {
  return "/";
}
function chdir(dir) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3, seconds = Math.floor(clocktime), nanoseconds = Math.floor(clocktime % 1 * 1e9);
  return previousTimestamp && (seconds = seconds - previousTimestamp[0], nanoseconds = nanoseconds - previousTimestamp[1], nanoseconds < 0 && (seconds--, nanoseconds += 1e9)), [seconds, nanoseconds];
}
function uptime() {
  var currentTime = new Date(), dif = currentTime - startTime;
  return dif / 1e3;
}
var cachedSetTimeout, cachedClearTimeout, queue, draining, currentQueue, queueIndex, title, platform, browser, env, argv, version, versions, release, config, on, addListener2, once2, off, removeListener2, removeAllListeners2, emit2, performance, performanceNow, startTime, browser$1, process_default, init_process = __esm({
  "node-modules-polyfills:process"() {
    cachedSetTimeout = defaultSetTimout, cachedClearTimeout = defaultClearTimeout;
    typeof globalThis.setTimeout == "function" && (cachedSetTimeout = setTimeout);
    typeof globalThis.clearTimeout == "function" && (cachedClearTimeout = clearTimeout);
    queue = [], draining = !1, queueIndex = -1;
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    title = "browser", platform = "browser", browser = !0, env = {}, argv = [], version = "", versions = {}, release = {}, config = {};
    on = noop, addListener2 = noop, once2 = noop, off = noop, removeListener2 = noop, removeAllListeners2 = noop, emit2 = noop;
    performance = globalThis.performance || {}, performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
      return new Date().getTime();
    };
    startTime = new Date();
    browser$1 = {
      nextTick,
      title,
      browser,
      env,
      argv,
      version,
      versions,
      on,
      addListener: addListener2,
      once: once2,
      off,
      removeListener: removeListener2,
      removeAllListeners: removeAllListeners2,
      emit: emit2,
      binding,
      cwd,
      chdir,
      umask,
      hrtime,
      platform,
      release,
      config,
      uptime
    }, process_default = browser$1;
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/inherits.js
var inherits, inherits_default, init_inherits = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/inherits.js"() {
    typeof Object.create == "function" ? inherits = function(ctor, superCtor) {
      ctor.super_ = superCtor, ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      });
    } : inherits = function(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {
      };
      TempCtor.prototype = superCtor.prototype, ctor.prototype = new TempCtor(), ctor.prototype.constructor = ctor;
    };
    inherits_default = inherits;
  }
});

// node-modules-polyfills:util
function format(f) {
  if (!isString(f)) {
    for (var objects = [], i = 0; i < arguments.length; i++)
      objects.push(inspect(arguments[i]));
    return objects.join(" ");
  }
  for (var i = 1, args = arguments, len = args.length, str = String(f).replace(formatRegExp, function(x2) {
    if (x2 === "%%")
      return "%";
    if (i >= len)
      return x2;
    switch (x2) {
      case "%s":
        return String(args[i++]);
      case "%d":
        return Number(args[i++]);
      case "%j":
        try {
          return JSON.stringify(args[i++]);
        } catch {
          return "[Circular]";
        }
      default:
        return x2;
    }
  }), x = args[i]; i < len; x = args[++i])
    isNull(x) || !isObject(x) ? str += " " + x : str += " " + inspect(x);
  return str;
}
function deprecate(fn, msg) {
  if (isUndefined(globalThis.process))
    return function() {
      return deprecate(fn, msg).apply(this, arguments);
    };
  if (process_default.noDeprecation === !0)
    return fn;
  var warned = !1;
  function deprecated() {
    if (!warned) {
      if (process_default.throwDeprecation)
        throw new Error(msg);
      process_default.traceDeprecation ? console.trace(msg) : console.error(msg), warned = !0;
    }
    return fn.apply(this, arguments);
  }
  return deprecated;
}
function debuglog(set) {
  if (isUndefined(debugEnviron) && (debugEnviron = process_default.env.NODE_DEBUG || ""), set = set.toUpperCase(), !debugs[set])
    if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
      var pid = 0;
      debugs[set] = function() {
        var msg = format.apply(null, arguments);
        console.error("%s %d: %s", set, pid, msg);
      };
    } else
      debugs[set] = function() {
      };
  return debugs[set];
}
function inspect(obj, opts) {
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  return arguments.length >= 3 && (ctx.depth = arguments[2]), arguments.length >= 4 && (ctx.colors = arguments[3]), isBoolean(opts) ? ctx.showHidden = opts : opts && _extend(ctx, opts), isUndefined(ctx.showHidden) && (ctx.showHidden = !1), isUndefined(ctx.depth) && (ctx.depth = 2), isUndefined(ctx.colors) && (ctx.colors = !1), isUndefined(ctx.customInspect) && (ctx.customInspect = !0), ctx.colors && (ctx.stylize = stylizeWithColor), formatValue(ctx, obj, ctx.depth);
}
function stylizeWithColor(str, styleType) {
  var style3 = inspect.styles[styleType];
  return style3 ? "\x1B[" + inspect.colors[style3][0] + "m" + str + "\x1B[" + inspect.colors[style3][1] + "m" : str;
}
function stylizeNoColor(str, styleType) {
  return str;
}
function arrayToHash(array) {
  var hash = {};
  return array.forEach(function(val, idx) {
    hash[val] = !0;
  }), hash;
}
function formatValue(ctx, value, recurseTimes) {
  if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== inspect && !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    return isString(ret) || (ret = formatValue(ctx, ret, recurseTimes)), ret;
  }
  var primitive = formatPrimitive(ctx, value);
  if (primitive)
    return primitive;
  var keys2 = Object.keys(value), visibleKeys = arrayToHash(keys2);
  if (ctx.showHidden && (keys2 = Object.getOwnPropertyNames(value)), isError(value) && (keys2.indexOf("message") >= 0 || keys2.indexOf("description") >= 0))
    return formatError(value);
  if (keys2.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ": " + value.name : "";
      return ctx.stylize("[Function" + name + "]", "special");
    }
    if (isRegExp(value))
      return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    if (isDate(value))
      return ctx.stylize(Date.prototype.toString.call(value), "date");
    if (isError(value))
      return formatError(value);
  }
  var base = "", array = !1, braces = ["{", "}"];
  if (isArray(value) && (array = !0, braces = ["[", "]"]), isFunction(value)) {
    var n = value.name ? ": " + value.name : "";
    base = " [Function" + n + "]";
  }
  if (isRegExp(value) && (base = " " + RegExp.prototype.toString.call(value)), isDate(value) && (base = " " + Date.prototype.toUTCString.call(value)), isError(value) && (base = " " + formatError(value)), keys2.length === 0 && (!array || value.length == 0))
    return braces[0] + base + braces[1];
  if (recurseTimes < 0)
    return isRegExp(value) ? ctx.stylize(RegExp.prototype.toString.call(value), "regexp") : ctx.stylize("[Object]", "special");
  ctx.seen.push(value);
  var output;
  return array ? output = formatArray(ctx, value, recurseTimes, visibleKeys, keys2) : output = keys2.map(function(key) {
    return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
  }), ctx.seen.pop(), reduceToSingleString(output, base, braces);
}
function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize("undefined", "undefined");
  if (isString(value)) {
    var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
    return ctx.stylize(simple, "string");
  }
  if (isNumber(value))
    return ctx.stylize("" + value, "number");
  if (isBoolean(value))
    return ctx.stylize("" + value, "boolean");
  if (isNull(value))
    return ctx.stylize("null", "null");
}
function formatError(value) {
  return "[" + Error.prototype.toString.call(value) + "]";
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys2) {
  for (var output = [], i = 0, l = value.length; i < l; ++i)
    hasOwnProperty(value, String(i)) ? output.push(formatProperty(
      ctx,
      value,
      recurseTimes,
      visibleKeys,
      String(i),
      !0
    )) : output.push("");
  return keys2.forEach(function(key) {
    key.match(/^\d+$/) || output.push(formatProperty(
      ctx,
      value,
      recurseTimes,
      visibleKeys,
      key,
      !0
    ));
  }), output;
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  if (desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] }, desc.get ? desc.set ? str = ctx.stylize("[Getter/Setter]", "special") : str = ctx.stylize("[Getter]", "special") : desc.set && (str = ctx.stylize("[Setter]", "special")), hasOwnProperty(visibleKeys, key) || (name = "[" + key + "]"), str || (ctx.seen.indexOf(desc.value) < 0 ? (isNull(recurseTimes) ? str = formatValue(ctx, desc.value, null) : str = formatValue(ctx, desc.value, recurseTimes - 1), str.indexOf(`
`) > -1 && (array ? str = str.split(`
`).map(function(line) {
    return "  " + line;
  }).join(`
`).substr(2) : str = `
` + str.split(`
`).map(function(line) {
    return "   " + line;
  }).join(`
`))) : str = ctx.stylize("[Circular]", "special")), isUndefined(name)) {
    if (array && key.match(/^\d+$/))
      return str;
    name = JSON.stringify("" + key), name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (name = name.substr(1, name.length - 2), name = ctx.stylize(name, "name")) : (name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), name = ctx.stylize(name, "string"));
  }
  return name + ": " + str;
}
function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0, length = output.reduce(function(prev, cur) {
    return numLinesEst++, cur.indexOf(`
`) >= 0 && numLinesEst++, prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
  }, 0);
  return length > 60 ? braces[0] + (base === "" ? "" : base + `
 `) + " " + output.join(`,
  `) + " " + braces[1] : braces[0] + base + " " + output.join(", ") + " " + braces[1];
}
function isArray(ar) {
  return Array.isArray(ar);
}
function isBoolean(arg) {
  return typeof arg == "boolean";
}
function isNull(arg) {
  return arg === null;
}
function isNumber(arg) {
  return typeof arg == "number";
}
function isString(arg) {
  return typeof arg == "string";
}
function isUndefined(arg) {
  return arg === void 0;
}
function isRegExp(re) {
  return isObject(re) && objectToString(re) === "[object RegExp]";
}
function isObject(arg) {
  return typeof arg == "object" && arg !== null;
}
function isDate(d) {
  return isObject(d) && objectToString(d) === "[object Date]";
}
function isError(e) {
  return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
}
function isFunction(arg) {
  return typeof arg == "function";
}
function objectToString(o) {
  return Object.prototype.toString.call(o);
}
function _extend(origin, add) {
  if (!add || !isObject(add))
    return origin;
  for (var keys2 = Object.keys(add), i = keys2.length; i--; )
    origin[keys2[i]] = add[keys2[i]];
  return origin;
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var formatRegExp, debugs, debugEnviron, init_util = __esm({
  "node-modules-polyfills:util"() {
    init_process();
    init_inherits();
    formatRegExp = /%[sdj%]/g;
    debugs = {};
    inspect.colors = {
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      white: [37, 39],
      grey: [90, 39],
      black: [30, 39],
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [31, 39],
      yellow: [33, 39]
    };
    inspect.styles = {
      special: "cyan",
      number: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      date: "magenta",
      regexp: "red"
    };
  }
});

// node-modules-polyfills:buffer
function init() {
  inited = !0;
  for (var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i)
    lookup[i] = code[i], revLookup[code.charCodeAt(i)] = i;
  revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63;
}
function toByteArray(b64) {
  inited || init();
  var i, j, l, tmp, placeHolders, arr, len = b64.length;
  if (len % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0, arr = new Arr(len * 3 / 4 - placeHolders), l = placeHolders > 0 ? len - 4 : len;
  var L = 0;
  for (i = 0, j = 0; i < l; i += 4, j += 3)
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)], arr[L++] = tmp >> 16 & 255, arr[L++] = tmp >> 8 & 255, arr[L++] = tmp & 255;
  return placeHolders === 2 ? (tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4, arr[L++] = tmp & 255) : placeHolders === 1 && (tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2, arr[L++] = tmp >> 8 & 255, arr[L++] = tmp & 255), arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  for (var tmp, output = [], i = start; i < end; i += 3)
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2], output.push(tripletToBase64(tmp));
  return output.join("");
}
function fromByteArray(uint8) {
  inited || init();
  for (var tmp, len = uint8.length, extraBytes = len % 3, output = "", parts = [], maxChunkLength = 16383, i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength)
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  return extraBytes === 1 ? (tmp = uint8[len - 1], output += lookup[tmp >> 2], output += lookup[tmp << 4 & 63], output += "==") : extraBytes === 2 && (tmp = (uint8[len - 2] << 8) + uint8[len - 1], output += lookup[tmp >> 10], output += lookup[tmp >> 4 & 63], output += lookup[tmp << 2 & 63], output += "="), parts.push(output), parts.join("");
}
function read(buffer, offset, isLE, mLen, nBytes) {
  var e, m, eLen = nBytes * 8 - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isLE ? nBytes - 1 : 0, d = isLE ? -1 : 1, s = buffer[offset + i];
  for (i += d, e = s & (1 << -nBits) - 1, s >>= -nBits, nBits += eLen; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8)
    ;
  for (m = e & (1 << -nBits) - 1, e >>= -nBits, nBits += mLen; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8)
    ;
  if (e === 0)
    e = 1 - eBias;
  else {
    if (e === eMax)
      return m ? NaN : (s ? -1 : 1) * (1 / 0);
    m = m + Math.pow(2, mLen), e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
}
function write(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c, eLen = nBytes * 8 - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isLE ? 0 : nBytes - 1, d = isLE ? 1 : -1, s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  for (value = Math.abs(value), isNaN(value) || value === 1 / 0 ? (m = isNaN(value) ? 1 : 0, e = eMax) : (e = Math.floor(Math.log(value) / Math.LN2), value * (c = Math.pow(2, -e)) < 1 && (e--, c *= 2), e + eBias >= 1 ? value += rt / c : value += rt * Math.pow(2, 1 - eBias), value * c >= 2 && (e++, c /= 2), e + eBias >= eMax ? (m = 0, e = eMax) : e + eBias >= 1 ? (m = (value * c - 1) * Math.pow(2, mLen), e = e + eBias) : (m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen), e = 0)); mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8)
    ;
  for (e = e << mLen | m, eLen += mLen; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8)
    ;
  buffer[offset + i - d] |= s * 128;
}
function kMaxLength() {
  return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer(that, length) {
  if (kMaxLength() < length)
    throw new RangeError("Invalid typed array length");
  return Buffer2.TYPED_ARRAY_SUPPORT ? (that = new Uint8Array(length), that.__proto__ = Buffer2.prototype) : (that === null && (that = new Buffer2(length)), that.length = length), that;
}
function Buffer2(arg, encodingOrOffset, length) {
  if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2))
    return new Buffer2(arg, encodingOrOffset, length);
  if (typeof arg == "number") {
    if (typeof encodingOrOffset == "string")
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}
function from(that, value, encodingOrOffset, length) {
  if (typeof value == "number")
    throw new TypeError('"value" argument must not be a number');
  return typeof ArrayBuffer < "u" && value instanceof ArrayBuffer ? fromArrayBuffer(that, value, encodingOrOffset, length) : typeof value == "string" ? fromString(that, value, encodingOrOffset) : fromObject(that, value);
}
function assertSize(size) {
  if (typeof size != "number")
    throw new TypeError('"size" argument must be a number');
  if (size < 0)
    throw new RangeError('"size" argument must not be negative');
}
function alloc(that, size, fill2, encoding) {
  return assertSize(size), size <= 0 ? createBuffer(that, size) : fill2 !== void 0 ? typeof encoding == "string" ? createBuffer(that, size).fill(fill2, encoding) : createBuffer(that, size).fill(fill2) : createBuffer(that, size);
}
function allocUnsafe(that, size) {
  if (assertSize(size), that = createBuffer(that, size < 0 ? 0 : checked(size) | 0), !Buffer2.TYPED_ARRAY_SUPPORT)
    for (var i = 0; i < size; ++i)
      that[i] = 0;
  return that;
}
function fromString(that, string, encoding) {
  if ((typeof encoding != "string" || encoding === "") && (encoding = "utf8"), !Buffer2.isEncoding(encoding))
    throw new TypeError('"encoding" must be a valid string encoding');
  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);
  return actual !== length && (that = that.slice(0, actual)), that;
}
function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1)
    that[i] = array[i] & 255;
  return that;
}
function fromArrayBuffer(that, array, byteOffset, length) {
  if (array.byteLength, byteOffset < 0 || array.byteLength < byteOffset)
    throw new RangeError("'offset' is out of bounds");
  if (array.byteLength < byteOffset + (length || 0))
    throw new RangeError("'length' is out of bounds");
  return byteOffset === void 0 && length === void 0 ? array = new Uint8Array(array) : length === void 0 ? array = new Uint8Array(array, byteOffset) : array = new Uint8Array(array, byteOffset, length), Buffer2.TYPED_ARRAY_SUPPORT ? (that = array, that.__proto__ = Buffer2.prototype) : that = fromArrayLike(that, array), that;
}
function fromObject(that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    return that = createBuffer(that, len), that.length === 0 || obj.copy(that, 0, 0, len), that;
  }
  if (obj) {
    if (typeof ArrayBuffer < "u" && obj.buffer instanceof ArrayBuffer || "length" in obj)
      return typeof obj.length != "number" || isnan(obj.length) ? createBuffer(that, 0) : fromArrayLike(that, obj);
    if (obj.type === "Buffer" && isArray2(obj.data))
      return fromArrayLike(that, obj.data);
  }
  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function checked(length) {
  if (length >= kMaxLength())
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
  return length | 0;
}
function internalIsBuffer(b) {
  return !!(b != null && b._isBuffer);
}
function byteLength(string, encoding) {
  if (internalIsBuffer(string))
    return string.length;
  if (typeof ArrayBuffer < "u" && typeof ArrayBuffer.isView == "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer))
    return string.byteLength;
  typeof string != "string" && (string = "" + string);
  var len = string.length;
  if (len === 0)
    return 0;
  for (var loweredCase = !1; ; )
    switch (encoding) {
      case "ascii":
      case "latin1":
      case "binary":
        return len;
      case "utf8":
      case "utf-8":
      case void 0:
        return utf8ToBytes(string).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return len * 2;
      case "hex":
        return len >>> 1;
      case "base64":
        return base64ToBytes(string).length;
      default:
        if (loweredCase)
          return utf8ToBytes(string).length;
        encoding = ("" + encoding).toLowerCase(), loweredCase = !0;
    }
}
function slowToString(encoding, start, end) {
  var loweredCase = !1;
  if ((start === void 0 || start < 0) && (start = 0), start > this.length || ((end === void 0 || end > this.length) && (end = this.length), end <= 0) || (end >>>= 0, start >>>= 0, end <= start))
    return "";
  for (encoding || (encoding = "utf8"); ; )
    switch (encoding) {
      case "hex":
        return hexSlice(this, start, end);
      case "utf8":
      case "utf-8":
        return utf8Slice(this, start, end);
      case "ascii":
        return asciiSlice(this, start, end);
      case "latin1":
      case "binary":
        return latin1Slice(this, start, end);
      case "base64":
        return base64Slice(this, start, end);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return utf16leSlice(this, start, end);
      default:
        if (loweredCase)
          throw new TypeError("Unknown encoding: " + encoding);
        encoding = (encoding + "").toLowerCase(), loweredCase = !0;
    }
}
function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m], b[m] = i;
}
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  if (buffer.length === 0)
    return -1;
  if (typeof byteOffset == "string" ? (encoding = byteOffset, byteOffset = 0) : byteOffset > 2147483647 ? byteOffset = 2147483647 : byteOffset < -2147483648 && (byteOffset = -2147483648), byteOffset = +byteOffset, isNaN(byteOffset) && (byteOffset = dir ? 0 : buffer.length - 1), byteOffset < 0 && (byteOffset = buffer.length + byteOffset), byteOffset >= buffer.length) {
    if (dir)
      return -1;
    byteOffset = buffer.length - 1;
  } else if (byteOffset < 0)
    if (dir)
      byteOffset = 0;
    else
      return -1;
  if (typeof val == "string" && (val = Buffer2.from(val, encoding)), internalIsBuffer(val))
    return val.length === 0 ? -1 : arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  if (typeof val == "number")
    return val = val & 255, Buffer2.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function" ? dir ? Uint8Array.prototype.indexOf.call(buffer, val, byteOffset) : Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset) : arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1, arrLength = arr.length, valLength = val.length;
  if (encoding !== void 0 && (encoding = String(encoding).toLowerCase(), encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le")) {
    if (arr.length < 2 || val.length < 2)
      return -1;
    indexSize = 2, arrLength /= 2, valLength /= 2, byteOffset /= 2;
  }
  function read2(buf, i2) {
    return indexSize === 1 ? buf[i2] : buf.readUInt16BE(i2 * indexSize);
  }
  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++)
      if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1 && (foundIndex = i), i - foundIndex + 1 === valLength)
          return foundIndex * indexSize;
      } else
        foundIndex !== -1 && (i -= i - foundIndex), foundIndex = -1;
  } else
    for (byteOffset + valLength > arrLength && (byteOffset = arrLength - valLength), i = byteOffset; i >= 0; i--) {
      for (var found = !0, j = 0; j < valLength; j++)
        if (read2(arr, i + j) !== read2(val, j)) {
          found = !1;
          break;
        }
      if (found)
        return i;
    }
  return -1;
}
function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  length ? (length = Number(length), length > remaining && (length = remaining)) : length = remaining;
  var strLen = string.length;
  if (strLen % 2 !== 0)
    throw new TypeError("Invalid hex string");
  length > strLen / 2 && (length = strLen / 2);
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed))
      return i;
    buf[offset + i] = parsed;
  }
  return i;
}
function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}
function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
function base64Slice(buf, start, end) {
  return start === 0 && end === buf.length ? fromByteArray(buf) : fromByteArray(buf.slice(start, end));
}
function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  for (var res = [], i = start; i < end; ) {
    var firstByte = buf[i], codePoint = null, bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          firstByte < 128 && (codePoint = firstByte);
          break;
        case 2:
          secondByte = buf[i + 1], (secondByte & 192) === 128 && (tempCodePoint = (firstByte & 31) << 6 | secondByte & 63, tempCodePoint > 127 && (codePoint = tempCodePoint));
          break;
        case 3:
          secondByte = buf[i + 1], thirdByte = buf[i + 2], (secondByte & 192) === 128 && (thirdByte & 192) === 128 && (tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63, tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343) && (codePoint = tempCodePoint));
          break;
        case 4:
          secondByte = buf[i + 1], thirdByte = buf[i + 2], fourthByte = buf[i + 3], (secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128 && (tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63, tempCodePoint > 65535 && tempCodePoint < 1114112 && (codePoint = tempCodePoint));
      }
    }
    codePoint === null ? (codePoint = 65533, bytesPerSequence = 1) : codePoint > 65535 && (codePoint -= 65536, res.push(codePoint >>> 10 & 1023 | 55296), codePoint = 56320 | codePoint & 1023), res.push(codePoint), i += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH)
    return String.fromCharCode.apply(String, codePoints);
  for (var res = "", i = 0; i < len; )
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  return res;
}
function asciiSlice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i)
    ret += String.fromCharCode(buf[i] & 127);
  return ret;
}
function latin1Slice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i)
    ret += String.fromCharCode(buf[i]);
  return ret;
}
function hexSlice(buf, start, end) {
  var len = buf.length;
  (!start || start < 0) && (start = 0), (!end || end < 0 || end > len) && (end = len);
  for (var out = "", i = start; i < end; ++i)
    out += toHex(buf[i]);
  return out;
}
function utf16leSlice(buf, start, end) {
  for (var bytes = buf.slice(start, end), res = "", i = 0; i < bytes.length; i += 2)
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  return res;
}
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0)
    throw new RangeError("offset is not uint");
  if (offset + ext > length)
    throw new RangeError("Trying to access beyond buffer length");
}
function checkInt(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf))
    throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min)
    throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
}
function objectWriteUInt16(buf, value, offset, littleEndian) {
  value < 0 && (value = 65535 + value + 1);
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i)
    buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
}
function objectWriteUInt32(buf, value, offset, littleEndian) {
  value < 0 && (value = 4294967295 + value + 1);
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i)
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
}
function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
  if (offset < 0)
    throw new RangeError("Index out of range");
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
  return noAssert || checkIEEE754(buf, value, offset, 4), write(buf, value, offset, littleEndian, 23, 4), offset + 4;
}
function writeDouble(buf, value, offset, littleEndian, noAssert) {
  return noAssert || checkIEEE754(buf, value, offset, 8), write(buf, value, offset, littleEndian, 52, 8), offset + 8;
}
function base64clean(str) {
  if (str = stringtrim(str).replace(INVALID_BASE64_RE, ""), str.length < 2)
    return "";
  for (; str.length % 4 !== 0; )
    str = str + "=";
  return str;
}
function stringtrim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function toHex(n) {
  return n < 16 ? "0" + n.toString(16) : n.toString(16);
}
function utf8ToBytes(string, units) {
  units = units || 1 / 0;
  for (var codePoint, length = string.length, leadSurrogate = null, bytes = [], i = 0; i < length; ++i) {
    if (codePoint = string.charCodeAt(i), codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          (units -= 3) > -1 && bytes.push(239, 191, 189);
          continue;
        } else if (i + 1 === length) {
          (units -= 3) > -1 && bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        (units -= 3) > -1 && bytes.push(239, 191, 189), leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else
      leadSurrogate && (units -= 3) > -1 && bytes.push(239, 191, 189);
    if (leadSurrogate = null, codePoint < 128) {
      if ((units -= 1) < 0)
        break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0)
        break;
      bytes.push(
        codePoint >> 6 | 192,
        codePoint & 63 | 128
      );
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0)
        break;
      bytes.push(
        codePoint >> 12 | 224,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0)
        break;
      bytes.push(
        codePoint >> 18 | 240,
        codePoint >> 12 & 63 | 128,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else
      throw new Error("Invalid code point");
  }
  return bytes;
}
function asciiToBytes(str) {
  for (var byteArray = [], i = 0; i < str.length; ++i)
    byteArray.push(str.charCodeAt(i) & 255);
  return byteArray;
}
function utf16leToBytes(str, units) {
  for (var c, hi, lo, byteArray = [], i = 0; i < str.length && !((units -= 2) < 0); ++i)
    c = str.charCodeAt(i), hi = c >> 8, lo = c % 256, byteArray.push(lo), byteArray.push(hi);
  return byteArray;
}
function base64ToBytes(str) {
  return toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length && !(i + offset >= dst.length || i >= src.length); ++i)
    dst[i + offset] = src[i];
  return i;
}
function isnan(val) {
  return val !== val;
}
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
}
function isFastBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer == "function" && obj.constructor.isBuffer(obj);
}
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE == "function" && typeof obj.slice == "function" && isFastBuffer(obj.slice(0, 0));
}
var lookup, revLookup, Arr, inited, toString, isArray2, INSPECT_MAX_BYTES, _kMaxLength, MAX_ARGUMENTS_LENGTH, INVALID_BASE64_RE, init_buffer = __esm({
  "node-modules-polyfills:buffer"() {
    lookup = [], revLookup = [], Arr = typeof Uint8Array < "u" ? Uint8Array : Array, inited = !1;
    toString = {}.toString, isArray2 = Array.isArray || function(arr) {
      return toString.call(arr) == "[object Array]";
    };
    INSPECT_MAX_BYTES = 50;
    Buffer2.TYPED_ARRAY_SUPPORT = globalThis.TYPED_ARRAY_SUPPORT !== void 0 ? globalThis.TYPED_ARRAY_SUPPORT : !0;
    _kMaxLength = kMaxLength();
    Buffer2.poolSize = 8192;
    Buffer2._augment = function(arr) {
      return arr.__proto__ = Buffer2.prototype, arr;
    };
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length);
    };
    Buffer2.TYPED_ARRAY_SUPPORT && (Buffer2.prototype.__proto__ = Uint8Array.prototype, Buffer2.__proto__ = Uint8Array);
    Buffer2.alloc = function(size, fill2, encoding) {
      return alloc(null, size, fill2, encoding);
    };
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer2.isBuffer = isBuffer;
    Buffer2.compare = function(a, b) {
      if (!internalIsBuffer(a) || !internalIsBuffer(b))
        throw new TypeError("Arguments must be Buffers");
      if (a === b)
        return 0;
      for (var x = a.length, y = b.length, i = 0, len = Math.min(x, y); i < len; ++i)
        if (a[i] !== b[i]) {
          x = a[i], y = b[i];
          break;
        }
      return x < y ? -1 : y < x ? 1 : 0;
    };
    Buffer2.isEncoding = function(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    };
    Buffer2.concat = function(list, length) {
      if (!isArray2(list))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (list.length === 0)
        return Buffer2.alloc(0);
      var i;
      if (length === void 0)
        for (length = 0, i = 0; i < list.length; ++i)
          length += list[i].length;
      var buffer = Buffer2.allocUnsafe(length), pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (!internalIsBuffer(buf))
          throw new TypeError('"list" argument must be an Array of Buffers');
        buf.copy(buffer, pos), pos += buf.length;
      }
      return buffer;
    };
    Buffer2.byteLength = byteLength;
    Buffer2.prototype._isBuffer = !0;
    Buffer2.prototype.swap16 = function() {
      var len = this.length;
      if (len % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var i = 0; i < len; i += 2)
        swap(this, i, i + 1);
      return this;
    };
    Buffer2.prototype.swap32 = function() {
      var len = this.length;
      if (len % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var i = 0; i < len; i += 4)
        swap(this, i, i + 3), swap(this, i + 1, i + 2);
      return this;
    };
    Buffer2.prototype.swap64 = function() {
      var len = this.length;
      if (len % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var i = 0; i < len; i += 8)
        swap(this, i, i + 7), swap(this, i + 1, i + 6), swap(this, i + 2, i + 5), swap(this, i + 3, i + 4);
      return this;
    };
    Buffer2.prototype.toString = function() {
      var length = this.length | 0;
      return length === 0 ? "" : arguments.length === 0 ? utf8Slice(this, 0, length) : slowToString.apply(this, arguments);
    };
    Buffer2.prototype.equals = function(b) {
      if (!internalIsBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      return this === b ? !0 : Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function() {
      var str = "", max = INSPECT_MAX_BYTES;
      return this.length > 0 && (str = this.toString("hex", 0, max).match(/.{2}/g).join(" "), this.length > max && (str += " ... ")), "<Buffer " + str + ">";
    };
    Buffer2.prototype.compare = function(target, start, end, thisStart, thisEnd) {
      if (!internalIsBuffer(target))
        throw new TypeError("Argument must be a Buffer");
      if (start === void 0 && (start = 0), end === void 0 && (end = target ? target.length : 0), thisStart === void 0 && (thisStart = 0), thisEnd === void 0 && (thisEnd = this.length), start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length)
        throw new RangeError("out of range index");
      if (thisStart >= thisEnd && start >= end)
        return 0;
      if (thisStart >= thisEnd)
        return -1;
      if (start >= end)
        return 1;
      if (start >>>= 0, end >>>= 0, thisStart >>>= 0, thisEnd >>>= 0, this === target)
        return 0;
      for (var x = thisEnd - thisStart, y = end - start, len = Math.min(x, y), thisCopy = this.slice(thisStart, thisEnd), targetCopy = target.slice(start, end), i = 0; i < len; ++i)
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i], y = targetCopy[i];
          break;
        }
      return x < y ? -1 : y < x ? 1 : 0;
    };
    Buffer2.prototype.includes = function(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, !0);
    };
    Buffer2.prototype.lastIndexOf = function(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, !1);
    };
    Buffer2.prototype.write = function(string, offset, length, encoding) {
      if (offset === void 0)
        encoding = "utf8", length = this.length, offset = 0;
      else if (length === void 0 && typeof offset == "string")
        encoding = offset, length = this.length, offset = 0;
      else if (isFinite(offset))
        offset = offset | 0, isFinite(length) ? (length = length | 0, encoding === void 0 && (encoding = "utf8")) : (encoding = length, length = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      var remaining = this.length - offset;
      if ((length === void 0 || length > remaining) && (length = remaining), string.length > 0 && (length < 0 || offset < 0) || offset > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      encoding || (encoding = "utf8");
      for (var loweredCase = !1; ; )
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
            return asciiWrite(this, string, offset, length);
          case "latin1":
          case "binary":
            return latin1Write(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase(), loweredCase = !0;
        }
    };
    Buffer2.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    MAX_ARGUMENTS_LENGTH = 4096;
    Buffer2.prototype.slice = function(start, end) {
      var len = this.length;
      start = ~~start, end = end === void 0 ? len : ~~end, start < 0 ? (start += len, start < 0 && (start = 0)) : start > len && (start = len), end < 0 ? (end += len, end < 0 && (end = 0)) : end > len && (end = len), end < start && (end = start);
      var newBuf;
      if (Buffer2.TYPED_ARRAY_SUPPORT)
        newBuf = this.subarray(start, end), newBuf.__proto__ = Buffer2.prototype;
      else {
        var sliceLen = end - start;
        newBuf = new Buffer2(sliceLen, void 0);
        for (var i = 0; i < sliceLen; ++i)
          newBuf[i] = this[i + start];
      }
      return newBuf;
    };
    Buffer2.prototype.readUIntLE = function(offset, byteLength2, noAssert) {
      offset = offset | 0, byteLength2 = byteLength2 | 0, noAssert || checkOffset(offset, byteLength2, this.length);
      for (var val = this[offset], mul = 1, i = 0; ++i < byteLength2 && (mul *= 256); )
        val += this[offset + i] * mul;
      return val;
    };
    Buffer2.prototype.readUIntBE = function(offset, byteLength2, noAssert) {
      offset = offset | 0, byteLength2 = byteLength2 | 0, noAssert || checkOffset(offset, byteLength2, this.length);
      for (var val = this[offset + --byteLength2], mul = 1; byteLength2 > 0 && (mul *= 256); )
        val += this[offset + --byteLength2] * mul;
      return val;
    };
    Buffer2.prototype.readUInt8 = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 1, this.length), this[offset];
    };
    Buffer2.prototype.readUInt16LE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 2, this.length), this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUInt16BE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 2, this.length), this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUInt32LE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 4, this.length), (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUInt32BE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 4, this.length), this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readIntLE = function(offset, byteLength2, noAssert) {
      offset = offset | 0, byteLength2 = byteLength2 | 0, noAssert || checkOffset(offset, byteLength2, this.length);
      for (var val = this[offset], mul = 1, i = 0; ++i < byteLength2 && (mul *= 256); )
        val += this[offset + i] * mul;
      return mul *= 128, val >= mul && (val -= Math.pow(2, 8 * byteLength2)), val;
    };
    Buffer2.prototype.readIntBE = function(offset, byteLength2, noAssert) {
      offset = offset | 0, byteLength2 = byteLength2 | 0, noAssert || checkOffset(offset, byteLength2, this.length);
      for (var i = byteLength2, mul = 1, val = this[offset + --i]; i > 0 && (mul *= 256); )
        val += this[offset + --i] * mul;
      return mul *= 128, val >= mul && (val -= Math.pow(2, 8 * byteLength2)), val;
    };
    Buffer2.prototype.readInt8 = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 1, this.length), this[offset] & 128 ? (255 - this[offset] + 1) * -1 : this[offset];
    };
    Buffer2.prototype.readInt16LE = function(offset, noAssert) {
      noAssert || checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function(offset, noAssert) {
      noAssert || checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 4, this.length), this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 4, this.length), this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readFloatLE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 4, this.length), read(this, offset, !0, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 4, this.length), read(this, offset, !1, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 8, this.length), read(this, offset, !0, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 8, this.length), read(this, offset, !1, 52, 8);
    };
    Buffer2.prototype.writeUIntLE = function(value, offset, byteLength2, noAssert) {
      if (value = +value, offset = offset | 0, byteLength2 = byteLength2 | 0, !noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1, i = 0;
      for (this[offset] = value & 255; ++i < byteLength2 && (mul *= 256); )
        this[offset + i] = value / mul & 255;
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUIntBE = function(value, offset, byteLength2, noAssert) {
      if (value = +value, offset = offset | 0, byteLength2 = byteLength2 | 0, !noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1, mul = 1;
      for (this[offset + i] = value & 255; --i >= 0 && (mul *= 256); )
        this[offset + i] = value / mul & 255;
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUInt8 = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 1, 255, 0), Buffer2.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), this[offset] = value & 255, offset + 1;
    };
    Buffer2.prototype.writeUInt16LE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value & 255, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, !0), offset + 2;
    };
    Buffer2.prototype.writeUInt16BE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = value & 255) : objectWriteUInt16(this, value, offset, !1), offset + 2;
    };
    Buffer2.prototype.writeUInt32LE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset + 3] = value >>> 24, this[offset + 2] = value >>> 16, this[offset + 1] = value >>> 8, this[offset] = value & 255) : objectWriteUInt32(this, value, offset, !0), offset + 4;
    };
    Buffer2.prototype.writeUInt32BE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = value & 255) : objectWriteUInt32(this, value, offset, !1), offset + 4;
    };
    Buffer2.prototype.writeIntLE = function(value, offset, byteLength2, noAssert) {
      if (value = +value, offset = offset | 0, !noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0, mul = 1, sub = 0;
      for (this[offset] = value & 255; ++i < byteLength2 && (mul *= 256); )
        value < 0 && sub === 0 && this[offset + i - 1] !== 0 && (sub = 1), this[offset + i] = (value / mul >> 0) - sub & 255;
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function(value, offset, byteLength2, noAssert) {
      if (value = +value, offset = offset | 0, !noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1, mul = 1, sub = 0;
      for (this[offset + i] = value & 255; --i >= 0 && (mul *= 256); )
        value < 0 && sub === 0 && this[offset + i + 1] !== 0 && (sub = 1), this[offset + i] = (value / mul >> 0) - sub & 255;
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 1, 127, -128), Buffer2.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), value < 0 && (value = 255 + value + 1), this[offset] = value & 255, offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value & 255, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, !0), offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = value & 255) : objectWriteUInt16(this, value, offset, !1), offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value & 255, this[offset + 1] = value >>> 8, this[offset + 2] = value >>> 16, this[offset + 3] = value >>> 24) : objectWriteUInt32(this, value, offset, !0), offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), value < 0 && (value = 4294967295 + value + 1), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = value & 255) : objectWriteUInt32(this, value, offset, !1), offset + 4;
    };
    Buffer2.prototype.writeFloatLE = function(value, offset, noAssert) {
      return writeFloat(this, value, offset, !0, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function(value, offset, noAssert) {
      return writeFloat(this, value, offset, !1, noAssert);
    };
    Buffer2.prototype.writeDoubleLE = function(value, offset, noAssert) {
      return writeDouble(this, value, offset, !0, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function(value, offset, noAssert) {
      return writeDouble(this, value, offset, !1, noAssert);
    };
    Buffer2.prototype.copy = function(target, targetStart, start, end) {
      if (start || (start = 0), !end && end !== 0 && (end = this.length), targetStart >= target.length && (targetStart = target.length), targetStart || (targetStart = 0), end > 0 && end < start && (end = start), end === start || target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0)
        throw new RangeError("targetStart out of bounds");
      if (start < 0 || start >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      end > this.length && (end = this.length), target.length - targetStart < end - start && (end = target.length - targetStart + start);
      var len = end - start, i;
      if (this === target && start < targetStart && targetStart < end)
        for (i = len - 1; i >= 0; --i)
          target[i + targetStart] = this[i + start];
      else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT)
        for (i = 0; i < len; ++i)
          target[i + targetStart] = this[i + start];
      else
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart
        );
      return len;
    };
    Buffer2.prototype.fill = function(val, start, end, encoding) {
      if (typeof val == "string") {
        if (typeof start == "string" ? (encoding = start, start = 0, end = this.length) : typeof end == "string" && (encoding = end, end = this.length), val.length === 1) {
          var code = val.charCodeAt(0);
          code < 256 && (val = code);
        }
        if (encoding !== void 0 && typeof encoding != "string")
          throw new TypeError("encoding must be a string");
        if (typeof encoding == "string" && !Buffer2.isEncoding(encoding))
          throw new TypeError("Unknown encoding: " + encoding);
      } else
        typeof val == "number" && (val = val & 255);
      if (start < 0 || this.length < start || this.length < end)
        throw new RangeError("Out of range index");
      if (end <= start)
        return this;
      start = start >>> 0, end = end === void 0 ? this.length : end >>> 0, val || (val = 0);
      var i;
      if (typeof val == "number")
        for (i = start; i < end; ++i)
          this[i] = val;
      else {
        var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer2(val, encoding).toString()), len = bytes.length;
        for (i = 0; i < end - start; ++i)
          this[i + start] = bytes[i % len];
      }
      return this;
    };
    INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/buffer-list.js
function BufferList() {
  this.head = null, this.tail = null, this.length = 0;
}
var buffer_list_default, init_buffer_list = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/buffer-list.js"() {
    init_buffer();
    buffer_list_default = BufferList;
    BufferList.prototype.push = function(v) {
      var entry2 = { data: v, next: null };
      this.length > 0 ? this.tail.next = entry2 : this.head = entry2, this.tail = entry2, ++this.length;
    };
    BufferList.prototype.unshift = function(v) {
      var entry2 = { data: v, next: this.head };
      this.length === 0 && (this.tail = entry2), this.head = entry2, ++this.length;
    };
    BufferList.prototype.shift = function() {
      if (this.length !== 0) {
        var ret = this.head.data;
        return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, ret;
      }
    };
    BufferList.prototype.clear = function() {
      this.head = this.tail = null, this.length = 0;
    };
    BufferList.prototype.join = function(s) {
      if (this.length === 0)
        return "";
      for (var p = this.head, ret = "" + p.data; p = p.next; )
        ret += s + p.data;
      return ret;
    };
    BufferList.prototype.concat = function(n) {
      if (this.length === 0)
        return Buffer2.alloc(0);
      if (this.length === 1)
        return this.head.data;
      for (var ret = Buffer2.allocUnsafe(n >>> 0), p = this.head, i = 0; p; )
        p.data.copy(ret, i), i += p.data.length, p = p.next;
      return ret;
    };
  }
});

// node-modules-polyfills:string_decoder
function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding))
    throw new Error("Unknown encoding: " + encoding);
}
function StringDecoder(encoding) {
  switch (this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, ""), assertEncoding(encoding), this.encoding) {
    case "utf8":
      this.surrogateSize = 3;
      break;
    case "ucs2":
    case "utf16le":
      this.surrogateSize = 2, this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case "base64":
      this.surrogateSize = 3, this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }
  this.charBuffer = new Buffer2(6), this.charReceived = 0, this.charLength = 0;
}
function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}
function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2, this.charLength = this.charReceived ? 2 : 0;
}
function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3, this.charLength = this.charReceived ? 3 : 0;
}
var isBufferEncoding, init_string_decoder = __esm({
  "node-modules-polyfills:string_decoder"() {
    init_buffer();
    isBufferEncoding = Buffer2.isEncoding || function(encoding) {
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return !0;
        default:
          return !1;
      }
    };
    StringDecoder.prototype.write = function(buffer) {
      for (var charStr = ""; this.charLength; ) {
        var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
        if (buffer.copy(this.charBuffer, this.charReceived, 0, available), this.charReceived += available, this.charReceived < this.charLength)
          return "";
        buffer = buffer.slice(available, buffer.length), charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
        var charCode = charStr.charCodeAt(charStr.length - 1);
        if (charCode >= 55296 && charCode <= 56319) {
          this.charLength += this.surrogateSize, charStr = "";
          continue;
        }
        if (this.charReceived = this.charLength = 0, buffer.length === 0)
          return charStr;
        break;
      }
      this.detectIncompleteChar(buffer);
      var end = buffer.length;
      this.charLength && (buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end), end -= this.charReceived), charStr += buffer.toString(this.encoding, 0, end);
      var end = charStr.length - 1, charCode = charStr.charCodeAt(end);
      if (charCode >= 55296 && charCode <= 56319) {
        var size = this.surrogateSize;
        return this.charLength += size, this.charReceived += size, this.charBuffer.copy(this.charBuffer, size, 0, size), buffer.copy(this.charBuffer, 0, 0, size), charStr.substring(0, end);
      }
      return charStr;
    };
    StringDecoder.prototype.detectIncompleteChar = function(buffer) {
      for (var i = buffer.length >= 3 ? 3 : buffer.length; i > 0; i--) {
        var c = buffer[buffer.length - i];
        if (i == 1 && c >> 5 == 6) {
          this.charLength = 2;
          break;
        }
        if (i <= 2 && c >> 4 == 14) {
          this.charLength = 3;
          break;
        }
        if (i <= 3 && c >> 3 == 30) {
          this.charLength = 4;
          break;
        }
      }
      this.charReceived = i;
    };
    StringDecoder.prototype.end = function(buffer) {
      var res = "";
      if (buffer && buffer.length && (res = this.write(buffer)), this.charReceived) {
        var cr = this.charReceived, buf = this.charBuffer, enc = this.encoding;
        res += buf.slice(0, cr).toString(enc);
      }
      return res;
    };
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/readable.js
function prependListener2(emitter, event, fn) {
  if (typeof emitter.prependListener == "function")
    return emitter.prependListener(event, fn);
  !emitter._events || !emitter._events[event] ? emitter.on(event, fn) : Array.isArray(emitter._events[event]) ? emitter._events[event].unshift(fn) : emitter._events[event] = [fn, emitter._events[event]];
}
function listenerCount2(emitter, type) {
  return emitter.listeners(type).length;
}
function ReadableState(options, stream) {
  options = options || {}, this.objectMode = !!options.objectMode, stream instanceof Duplex && (this.objectMode = this.objectMode || !!options.readableObjectMode);
  var hwm = options.highWaterMark, defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm, this.highWaterMark = ~~this.highWaterMark, this.buffer = new buffer_list_default(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.defaultEncoding = options.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, options.encoding && (this.decoder = new StringDecoder(options.encoding), this.encoding = options.encoding);
}
function Readable(options) {
  if (!(this instanceof Readable))
    return new Readable(options);
  this._readableState = new ReadableState(options, this), this.readable = !0, options && typeof options.read == "function" && (this._read = options.read), events_default.call(this);
}
function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er)
    stream.emit("error", er);
  else if (chunk === null)
    state.reading = !1, onEofChunk(stream, state);
  else if (state.objectMode || chunk && chunk.length > 0)
    if (state.ended && !addToFront) {
      var e = new Error("stream.push() after EOF");
      stream.emit("error", e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error("stream.unshift() after end event");
      stream.emit("error", _e);
    } else {
      var skipAdd;
      state.decoder && !addToFront && !encoding && (chunk = state.decoder.write(chunk), skipAdd = !state.objectMode && chunk.length === 0), addToFront || (state.reading = !1), skipAdd || (state.flowing && state.length === 0 && !state.sync ? (stream.emit("data", chunk), stream.read(0)) : (state.length += state.objectMode ? 1 : chunk.length, addToFront ? state.buffer.unshift(chunk) : state.buffer.push(chunk), state.needReadable && emitReadable(stream))), maybeReadMore(stream, state);
    }
  else
    addToFront || (state.reading = !1);
  return needMoreData(state);
}
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}
function computeNewHighWaterMark(n) {
  return n >= MAX_HWM ? n = MAX_HWM : (n--, n |= n >>> 1, n |= n >>> 2, n |= n >>> 4, n |= n >>> 8, n |= n >>> 16, n++), n;
}
function howMuchToRead(n, state) {
  return n <= 0 || state.length === 0 && state.ended ? 0 : state.objectMode ? 1 : n !== n ? state.flowing && state.length ? state.buffer.head.data.length : state.length : (n > state.highWaterMark && (state.highWaterMark = computeNewHighWaterMark(n)), n <= state.length ? n : state.ended ? state.length : (state.needReadable = !0, 0));
}
function chunkInvalid(state, chunk) {
  var er = null;
  return !Buffer.isBuffer(chunk) && typeof chunk != "string" && chunk !== null && chunk !== void 0 && !state.objectMode && (er = new TypeError("Invalid non-string/buffer chunk")), er;
}
function onEofChunk(stream, state) {
  if (!state.ended) {
    if (state.decoder) {
      var chunk = state.decoder.end();
      chunk && chunk.length && (state.buffer.push(chunk), state.length += state.objectMode ? 1 : chunk.length);
    }
    state.ended = !0, emitReadable(stream);
  }
}
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = !1, state.emittedReadable || (debug("emitReadable", state.flowing), state.emittedReadable = !0, state.sync ? nextTick(emitReadable_, stream) : emitReadable_(stream));
}
function emitReadable_(stream) {
  debug("emit readable"), stream.emit("readable"), flow(stream);
}
function maybeReadMore(stream, state) {
  state.readingMore || (state.readingMore = !0, nextTick(maybeReadMore_, stream, state));
}
function maybeReadMore_(stream, state) {
  for (var len = state.length; !state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark && (debug("maybeReadMore read 0"), stream.read(0), len !== state.length); )
    len = state.length;
  state.readingMore = !1;
}
function pipeOnDrain(src) {
  return function() {
    var state = src._readableState;
    debug("pipeOnDrain", state.awaitDrain), state.awaitDrain && state.awaitDrain--, state.awaitDrain === 0 && src.listeners("data").length && (state.flowing = !0, flow(src));
  };
}
function nReadingNextTick(self2) {
  debug("readable nexttick read 0"), self2.read(0);
}
function resume(stream, state) {
  state.resumeScheduled || (state.resumeScheduled = !0, nextTick(resume_, stream, state));
}
function resume_(stream, state) {
  state.reading || (debug("resume read 0"), stream.read(0)), state.resumeScheduled = !1, state.awaitDrain = 0, stream.emit("resume"), flow(stream), state.flowing && !state.reading && stream.read(0);
}
function flow(stream) {
  var state = stream._readableState;
  for (debug("flow", state.flowing); state.flowing && stream.read() !== null; )
    ;
}
function fromList(n, state) {
  if (state.length === 0)
    return null;
  var ret;
  return state.objectMode ? ret = state.buffer.shift() : !n || n >= state.length ? (state.decoder ? ret = state.buffer.join("") : state.buffer.length === 1 ? ret = state.buffer.head.data : ret = state.buffer.concat(state.length), state.buffer.clear()) : ret = fromListPartial(n, state.buffer, state.decoder), ret;
}
function fromListPartial(n, list, hasStrings) {
  var ret;
  return n < list.head.data.length ? (ret = list.head.data.slice(0, n), list.head.data = list.head.data.slice(n)) : n === list.head.data.length ? ret = list.shift() : ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list), ret;
}
function copyFromBufferString(n, list) {
  var p = list.head, c = 1, ret = p.data;
  for (n -= ret.length; p = p.next; ) {
    var str = p.data, nb = n > str.length ? str.length : n;
    if (nb === str.length ? ret += str : ret += str.slice(0, n), n -= nb, n === 0) {
      nb === str.length ? (++c, p.next ? list.head = p.next : list.head = list.tail = null) : (list.head = p, p.data = str.slice(nb));
      break;
    }
    ++c;
  }
  return list.length -= c, ret;
}
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n), p = list.head, c = 1;
  for (p.data.copy(ret), n -= p.data.length; p = p.next; ) {
    var buf = p.data, nb = n > buf.length ? buf.length : n;
    if (buf.copy(ret, ret.length - n, 0, nb), n -= nb, n === 0) {
      nb === buf.length ? (++c, p.next ? list.head = p.next : list.head = list.tail = null) : (list.head = p, p.data = buf.slice(nb));
      break;
    }
    ++c;
  }
  return list.length -= c, ret;
}
function endReadable(stream) {
  var state = stream._readableState;
  if (state.length > 0)
    throw new Error('"endReadable()" called on non-empty stream');
  state.endEmitted || (state.ended = !0, nextTick(endReadableNT, state, stream));
}
function endReadableNT(state, stream) {
  !state.endEmitted && state.length === 0 && (state.endEmitted = !0, stream.readable = !1, stream.emit("end"));
}
function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++)
    f(xs[i], i);
}
function indexOf2(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++)
    if (xs[i] === x)
      return i;
  return -1;
}
var debug, MAX_HWM, init_readable = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/readable.js"() {
    "use strict";
    init_events();
    init_util();
    init_buffer_list();
    init_string_decoder();
    init_duplex();
    init_process();
    Readable.ReadableState = ReadableState;
    debug = debuglog("stream");
    inherits_default(Readable, events_default);
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      return !state.objectMode && typeof chunk == "string" && (encoding = encoding || state.defaultEncoding, encoding !== state.encoding && (chunk = Buffer.from(chunk, encoding), encoding = "")), readableAddChunk(this, state, chunk, encoding, !1);
    };
    Readable.prototype.unshift = function(chunk) {
      var state = this._readableState;
      return readableAddChunk(this, state, chunk, "", !0);
    };
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === !1;
    };
    Readable.prototype.setEncoding = function(enc) {
      return this._readableState.decoder = new StringDecoder(enc), this._readableState.encoding = enc, this;
    };
    MAX_HWM = 8388608;
    Readable.prototype.read = function(n) {
      debug("read", n), n = parseInt(n, 10);
      var state = this._readableState, nOrig = n;
      if (n !== 0 && (state.emittedReadable = !1), n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended))
        return debug("read: emitReadable", state.length, state.ended), state.length === 0 && state.ended ? endReadable(this) : emitReadable(this), null;
      if (n = howMuchToRead(n, state), n === 0 && state.ended)
        return state.length === 0 && endReadable(this), null;
      var doRead = state.needReadable;
      debug("need readable", doRead), (state.length === 0 || state.length - n < state.highWaterMark) && (doRead = !0, debug("length less than watermark", doRead)), state.ended || state.reading ? (doRead = !1, debug("reading or ended", doRead)) : doRead && (debug("do read"), state.reading = !0, state.sync = !0, state.length === 0 && (state.needReadable = !0), this._read(state.highWaterMark), state.sync = !1, state.reading || (n = howMuchToRead(nOrig, state)));
      var ret;
      return n > 0 ? ret = fromList(n, state) : ret = null, ret === null ? (state.needReadable = !0, n = 0) : state.length -= n, state.length === 0 && (state.ended || (state.needReadable = !0), nOrig !== n && state.ended && endReadable(this)), ret !== null && this.emit("data", ret), ret;
    };
    Readable.prototype._read = function(n) {
      this.emit("error", new Error("not implemented"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this, state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1, debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = !pipeOpts || pipeOpts.end !== !1, endFn = doEnd ? onend2 : cleanup;
      state.endEmitted ? nextTick(endFn) : src.once("end", endFn), dest.on("unpipe", onunpipe);
      function onunpipe(readable) {
        debug("onunpipe"), readable === src && cleanup();
      }
      function onend2() {
        debug("onend"), dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = !1;
      function cleanup() {
        debug("cleanup"), dest.removeListener("close", onclose), dest.removeListener("finish", onfinish), dest.removeListener("drain", ondrain), dest.removeListener("error", onerror), dest.removeListener("unpipe", onunpipe), src.removeListener("end", onend2), src.removeListener("end", cleanup), src.removeListener("data", ondata), cleanedUp = !0, state.awaitDrain && (!dest._writableState || dest._writableState.needDrain) && ondrain();
      }
      var increasedAwaitDrain = !1;
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata"), increasedAwaitDrain = !1;
        var ret = dest.write(chunk);
        ret === !1 && !increasedAwaitDrain && ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf2(state.pipes, dest) !== -1) && !cleanedUp && (debug("false write response, pause", src._readableState.awaitDrain), src._readableState.awaitDrain++, increasedAwaitDrain = !0), src.pause());
      }
      function onerror(er) {
        debug("onerror", er), unpipe(), dest.removeListener("error", onerror), listenerCount2(dest, "error") === 0 && dest.emit("error", er);
      }
      prependListener2(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish), unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish"), dest.removeListener("close", onclose), unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe"), src.unpipe(dest);
      }
      return dest.emit("pipe", src), state.flowing || (debug("pipe resume"), src.resume()), dest;
    };
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1)
        return dest && dest !== state.pipes ? this : (dest || (dest = state.pipes), state.pipes = null, state.pipesCount = 0, state.flowing = !1, dest && dest.emit("unpipe", this), this);
      if (!dest) {
        var dests = state.pipes, len = state.pipesCount;
        state.pipes = null, state.pipesCount = 0, state.flowing = !1;
        for (var _i = 0; _i < len; _i++)
          dests[_i].emit("unpipe", this);
        return this;
      }
      var i = indexOf2(state.pipes, dest);
      return i === -1 ? this : (state.pipes.splice(i, 1), state.pipesCount -= 1, state.pipesCount === 1 && (state.pipes = state.pipes[0]), dest.emit("unpipe", this), this);
    };
    Readable.prototype.on = function(ev, fn) {
      var res = events_default.prototype.on.call(this, ev, fn);
      if (ev === "data")
        this._readableState.flowing !== !1 && this.resume();
      else if (ev === "readable") {
        var state = this._readableState;
        !state.endEmitted && !state.readableListening && (state.readableListening = state.needReadable = !0, state.emittedReadable = !1, state.reading ? state.length && emitReadable(this, state) : nextTick(nReadingNextTick, this));
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.resume = function() {
      var state = this._readableState;
      return state.flowing || (debug("resume"), state.flowing = !0, resume(this, state)), this;
    };
    Readable.prototype.pause = function() {
      return debug("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (debug("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
    };
    Readable.prototype.wrap = function(stream) {
      var state = this._readableState, paused = !1, self2 = this;
      stream.on("end", function() {
        if (debug("wrapped end"), state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          chunk && chunk.length && self2.push(chunk);
        }
        self2.push(null);
      }), stream.on("data", function(chunk) {
        if (debug("wrapped data"), state.decoder && (chunk = state.decoder.write(chunk)), !(state.objectMode && chunk == null) && !(!state.objectMode && (!chunk || !chunk.length))) {
          var ret = self2.push(chunk);
          ret || (paused = !0, stream.pause());
        }
      });
      for (var i in stream)
        this[i] === void 0 && typeof stream[i] == "function" && (this[i] = function(method) {
          return function() {
            return stream[method].apply(stream, arguments);
          };
        }(i));
      var events = ["error", "close", "destroy", "pause", "resume"];
      return forEach(events, function(ev) {
        stream.on(ev, self2.emit.bind(self2, ev));
      }), self2._read = function(n) {
        debug("wrapped _read", n), paused && (paused = !1, stream.resume());
      }, self2;
    };
    Readable._fromList = fromList;
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/writable.js
function nop() {
}
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk, this.encoding = encoding, this.callback = cb, this.next = null;
}
function WritableState(options, stream) {
  Object.defineProperty(this, "buffer", {
    get: deprecate(function() {
      return this.getBuffer();
    }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
  }), options = options || {}, this.objectMode = !!options.objectMode, stream instanceof Duplex && (this.objectMode = this.objectMode || !!options.writableObjectMode);
  var hwm = options.highWaterMark, defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm, this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1;
  var noDecode = options.decodeStrings === !1;
  this.decodeStrings = !noDecode, this.defaultEncoding = options.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(er) {
    onwrite(stream, er);
  }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new CorkedRequest(this);
}
function Writable(options) {
  if (!(this instanceof Writable) && !(this instanceof Duplex))
    return new Writable(options);
  this._writableState = new WritableState(options, this), this.writable = !0, options && (typeof options.write == "function" && (this._write = options.write), typeof options.writev == "function" && (this._writev = options.writev)), EventEmitter.call(this);
}
function writeAfterEnd(stream, cb) {
  var er = new Error("write after end");
  stream.emit("error", er), nextTick(cb, er);
}
function validChunk(stream, state, chunk, cb) {
  var valid = !0, er = !1;
  return chunk === null ? er = new TypeError("May not write null values to stream") : !Buffer2.isBuffer(chunk) && typeof chunk != "string" && chunk !== void 0 && !state.objectMode && (er = new TypeError("Invalid non-string/buffer chunk")), er && (stream.emit("error", er), nextTick(cb, er), valid = !1), valid;
}
function decodeChunk(state, chunk, encoding) {
  return !state.objectMode && state.decodeStrings !== !1 && typeof chunk == "string" && (chunk = Buffer2.from(chunk, encoding)), chunk;
}
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding), Buffer2.isBuffer(chunk) && (encoding = "buffer");
  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark;
  if (ret || (state.needDrain = !0), state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb), last ? last.next = state.lastBufferedRequest : state.bufferedRequest = state.lastBufferedRequest, state.bufferedRequestCount += 1;
  } else
    doWrite(stream, state, !1, len, chunk, encoding, cb);
  return ret;
}
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len, state.writecb = cb, state.writing = !0, state.sync = !0, writev ? stream._writev(chunk, state.onwrite) : stream._write(chunk, encoding, state.onwrite), state.sync = !1;
}
function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb, sync ? nextTick(cb, er) : cb(er), stream._writableState.errorEmitted = !0, stream.emit("error", er);
}
function onwriteStateUpdate(state) {
  state.writing = !1, state.writecb = null, state.length -= state.writelen, state.writelen = 0;
}
function onwrite(stream, er) {
  var state = stream._writableState, sync = state.sync, cb = state.writecb;
  if (onwriteStateUpdate(state), er)
    onwriteError(stream, state, sync, er, cb);
  else {
    var finished = needFinish(state);
    !finished && !state.corked && !state.bufferProcessing && state.bufferedRequest && clearBuffer(stream, state), sync ? nextTick(afterWrite, stream, state, finished, cb) : afterWrite(stream, state, finished, cb);
  }
}
function afterWrite(stream, state, finished, cb) {
  finished || onwriteDrain(stream, state), state.pendingcb--, cb(), finishMaybe(stream, state);
}
function onwriteDrain(stream, state) {
  state.length === 0 && state.needDrain && (state.needDrain = !1, stream.emit("drain"));
}
function clearBuffer(stream, state) {
  state.bufferProcessing = !0;
  var entry2 = state.bufferedRequest;
  if (stream._writev && entry2 && entry2.next) {
    var l = state.bufferedRequestCount, buffer = new Array(l), holder = state.corkedRequestsFree;
    holder.entry = entry2;
    for (var count = 0; entry2; )
      buffer[count] = entry2, entry2 = entry2.next, count += 1;
    doWrite(stream, state, !0, state.length, buffer, "", holder.finish), state.pendingcb++, state.lastBufferedRequest = null, holder.next ? (state.corkedRequestsFree = holder.next, holder.next = null) : state.corkedRequestsFree = new CorkedRequest(state);
  } else {
    for (; entry2; ) {
      var chunk = entry2.chunk, encoding = entry2.encoding, cb = entry2.callback, len = state.objectMode ? 1 : chunk.length;
      if (doWrite(stream, state, !1, len, chunk, encoding, cb), entry2 = entry2.next, state.writing)
        break;
    }
    entry2 === null && (state.lastBufferedRequest = null);
  }
  state.bufferedRequestCount = 0, state.bufferedRequest = entry2, state.bufferProcessing = !1;
}
function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function prefinish(stream, state) {
  state.prefinished || (state.prefinished = !0, stream.emit("prefinish"));
}
function finishMaybe(stream, state) {
  var need = needFinish(state);
  return need && (state.pendingcb === 0 ? (prefinish(stream, state), state.finished = !0, stream.emit("finish")) : prefinish(stream, state)), need;
}
function endWritable(stream, state, cb) {
  state.ending = !0, finishMaybe(stream, state), cb && (state.finished ? nextTick(cb) : stream.once("finish", cb)), state.ended = !0, stream.writable = !1;
}
function CorkedRequest(state) {
  var _this = this;
  this.next = null, this.entry = null, this.finish = function(err) {
    var entry2 = _this.entry;
    for (_this.entry = null; entry2; ) {
      var cb = entry2.callback;
      state.pendingcb--, cb(err), entry2 = entry2.next;
    }
    state.corkedRequestsFree ? state.corkedRequestsFree.next = _this : state.corkedRequestsFree = _this;
  };
}
var init_writable = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/writable.js"() {
    init_util();
    init_buffer();
    init_events();
    init_duplex();
    init_process();
    Writable.WritableState = WritableState;
    inherits_default(Writable, EventEmitter);
    WritableState.prototype.getBuffer = function() {
      for (var current = this.bufferedRequest, out = []; current; )
        out.push(current), current = current.next;
      return out;
    };
    Writable.prototype.pipe = function() {
      this.emit("error", new Error("Cannot pipe, not readable"));
    };
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState, ret = !1;
      return typeof encoding == "function" && (cb = encoding, encoding = null), Buffer2.isBuffer(chunk) ? encoding = "buffer" : encoding || (encoding = state.defaultEncoding), typeof cb != "function" && (cb = nop), state.ended ? writeAfterEnd(this, cb) : validChunk(this, state, chunk, cb) && (state.pendingcb++, ret = writeOrBuffer(this, state, chunk, encoding, cb)), ret;
    };
    Writable.prototype.cork = function() {
      var state = this._writableState;
      state.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      state.corked && (state.corked--, !state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest && clearBuffer(this, state));
    };
    Writable.prototype.setDefaultEncoding = function(encoding) {
      if (typeof encoding == "string" && (encoding = encoding.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new TypeError("Unknown encoding: " + encoding);
      return this._writableState.defaultEncoding = encoding, this;
    };
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new Error("not implemented"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      typeof chunk == "function" ? (cb = chunk, chunk = null, encoding = null) : typeof encoding == "function" && (cb = encoding, encoding = null), chunk != null && this.write(chunk, encoding), state.corked && (state.corked = 1, this.uncork()), !state.ending && !state.finished && endWritable(this, state, cb);
    };
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/duplex.js
function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);
  Readable.call(this, options), Writable.call(this, options), options && options.readable === !1 && (this.readable = !1), options && options.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, options && options.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", onend);
}
function onend() {
  this.allowHalfOpen || this._writableState.ended || nextTick(onEndNT, this);
}
function onEndNT(self2) {
  self2.end();
}
var keys, method, v, init_duplex = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/duplex.js"() {
    init_util();
    init_process();
    init_readable();
    init_writable();
    inherits_default(Duplex, Readable);
    keys = Object.keys(Writable.prototype);
    for (v = 0; v < keys.length; v++)
      method = keys[v], Duplex.prototype[method] || (Duplex.prototype[method] = Writable.prototype[method]);
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/transform.js
function TransformState(stream) {
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null, this.writeencoding = null;
}
function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = !1;
  var cb = ts.writecb;
  if (!cb)
    return stream.emit("error", new Error("no writecb in Transform class"));
  ts.writechunk = null, ts.writecb = null, data != null && stream.push(data), cb(er);
  var rs = stream._readableState;
  rs.reading = !1, (rs.needReadable || rs.length < rs.highWaterMark) && stream._read(rs.highWaterMark);
}
function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);
  Duplex.call(this, options), this._transformState = new TransformState(this);
  var stream = this;
  this._readableState.needReadable = !0, this._readableState.sync = !1, options && (typeof options.transform == "function" && (this._transform = options.transform), typeof options.flush == "function" && (this._flush = options.flush)), this.once("prefinish", function() {
    typeof this._flush == "function" ? this._flush(function(er) {
      done(stream, er);
    }) : done(stream);
  });
}
function done(stream, er) {
  if (er)
    return stream.emit("error", er);
  var ws = stream._writableState, ts = stream._transformState;
  if (ws.length)
    throw new Error("Calling transform done when ws.length != 0");
  if (ts.transforming)
    throw new Error("Calling transform done when still transforming");
  return stream.push(null);
}
var init_transform = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/transform.js"() {
    init_duplex();
    init_util();
    inherits_default(Transform, Duplex);
    Transform.prototype.push = function(chunk, encoding) {
      return this._transformState.needTransform = !1, Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      throw new Error("Not implemented");
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      if (ts.writecb = cb, ts.writechunk = chunk, ts.writeencoding = encoding, !ts.transforming) {
        var rs = this._readableState;
        (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) && this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      ts.writechunk !== null && ts.writecb && !ts.transforming ? (ts.transforming = !0, this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform)) : ts.needTransform = !0;
    };
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough.js
function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);
  Transform.call(this, options);
}
var init_passthrough = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough.js"() {
    init_transform();
    init_util();
    inherits_default(PassThrough, Transform);
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// node-modules-polyfills:stream
var stream_exports = {};
__export(stream_exports, {
  Duplex: () => Duplex,
  PassThrough: () => PassThrough,
  Readable: () => Readable,
  Stream: () => Stream,
  Transform: () => Transform,
  Writable: () => Writable,
  default: () => stream_default
});
function Stream() {
  events_default.call(this);
}
var stream_default, init_stream = __esm({
  "node-modules-polyfills:stream"() {
    init_events();
    init_util();
    init_duplex();
    init_readable();
    init_writable();
    init_transform();
    init_passthrough();
    inherits_default(Stream, events_default);
    Stream.Readable = Readable;
    Stream.Writable = Writable;
    Stream.Duplex = Duplex;
    Stream.Transform = Transform;
    Stream.PassThrough = PassThrough;
    Stream.Stream = Stream;
    stream_default = Stream;
    Stream.prototype.pipe = function(dest, options) {
      var source = this;
      function ondata(chunk) {
        dest.writable && dest.write(chunk) === !1 && source.pause && source.pause();
      }
      source.on("data", ondata);
      function ondrain() {
        source.readable && source.resume && source.resume();
      }
      dest.on("drain", ondrain), !dest._isStdio && (!options || options.end !== !1) && (source.on("end", onend2), source.on("close", onclose));
      var didOnEnd = !1;
      function onend2() {
        didOnEnd || (didOnEnd = !0, dest.end());
      }
      function onclose() {
        didOnEnd || (didOnEnd = !0, typeof dest.destroy == "function" && dest.destroy());
      }
      function onerror(er) {
        if (cleanup(), events_default.listenerCount(this, "error") === 0)
          throw er;
      }
      source.on("error", onerror), dest.on("error", onerror);
      function cleanup() {
        source.removeListener("data", ondata), dest.removeListener("drain", ondrain), source.removeListener("end", onend2), source.removeListener("close", onclose), source.removeListener("error", onerror), dest.removeListener("error", onerror), source.removeListener("end", cleanup), source.removeListener("close", cleanup), dest.removeListener("close", cleanup);
      }
      return source.on("end", cleanup), source.on("close", cleanup), dest.on("close", cleanup), dest.emit("pipe", source), dest;
    };
  }
});

// node-modules-polyfills-commonjs:stream
var require_stream = __commonJS({
  "node-modules-polyfills-commonjs:stream"(exports, module) {
    var polyfill = (init_stream(), __toCommonJS(stream_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k in polyfill)
        module.exports[k] = polyfill[k];
    } else
      polyfill && (module.exports = polyfill);
  }
});

// node_modules/react-dom/cjs/react-dom-server.node.development.js
var require_react_dom_server_node_development = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server.node.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var React37 = require_react(), _assign = require_object_assign(), stream = require_stream(), ReactVersion = "17.0.2";
      function formatProdErrorMessage(code) {
        for (var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code, i2 = 1; i2 < arguments.length; i2++)
          url += "&args[]=" + encodeURIComponent(arguments[i2]);
        return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var ReactSharedInternals = React37.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function warn(format2) {
        {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
            args[_key - 1] = arguments[_key];
          printWarning("warn", format2, args);
        }
      }
      function error(format2) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format2, args);
        }
      }
      function printWarning(level, format2, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format2 += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return "" + item;
          });
          argsWithFormat.unshift("Warning: " + format2), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var REACT_ELEMENT_TYPE = 60103, REACT_PORTAL_TYPE = 60106, REACT_FRAGMENT_TYPE = 60107, REACT_STRICT_MODE_TYPE = 60108, REACT_PROFILER_TYPE = 60114, REACT_PROVIDER_TYPE = 60109, REACT_CONTEXT_TYPE = 60110, REACT_FORWARD_REF_TYPE = 60112, REACT_SUSPENSE_TYPE = 60113, REACT_SUSPENSE_LIST_TYPE = 60120, REACT_MEMO_TYPE = 60115, REACT_LAZY_TYPE = 60116, REACT_BLOCK_TYPE = 60121, REACT_SERVER_BLOCK_TYPE = 60122, REACT_FUNDAMENTAL_TYPE = 60117, REACT_SCOPE_TYPE = 60119, REACT_OPAQUE_ID_TYPE = 60128, REACT_DEBUG_TRACING_MODE_TYPE = 60129, REACT_OFFSCREEN_TYPE = 60130, REACT_LEGACY_HIDDEN_TYPE = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var symbolFor = Symbol.for;
        REACT_ELEMENT_TYPE = symbolFor("react.element"), REACT_PORTAL_TYPE = symbolFor("react.portal"), REACT_FRAGMENT_TYPE = symbolFor("react.fragment"), REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode"), REACT_PROFILER_TYPE = symbolFor("react.profiler"), REACT_PROVIDER_TYPE = symbolFor("react.provider"), REACT_CONTEXT_TYPE = symbolFor("react.context"), REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref"), REACT_SUSPENSE_TYPE = symbolFor("react.suspense"), REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list"), REACT_MEMO_TYPE = symbolFor("react.memo"), REACT_LAZY_TYPE = symbolFor("react.lazy"), REACT_BLOCK_TYPE = symbolFor("react.block"), REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block"), REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental"), REACT_SCOPE_TYPE = symbolFor("react.scope"), REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id"), REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode"), REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen"), REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
      }
      function getWrappedName2(outerType, innerType, wrapperName) {
        var functionName = innerType.displayName || innerType.name || "";
        return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentName(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName2(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              return getComponentName(type.type);
            case REACT_BLOCK_TYPE:
              return getComponentName(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return getComponentName(init2(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var enableSuspenseServerRenderer = !1, disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = !0;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: !0,
              enumerable: !0,
              value: disabledLog,
              writable: !0
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: _assign({}, props, {
                value: prevLog
              }),
              info: _assign({}, props, {
                value: prevInfo
              }),
              warn: _assign({}, props, {
                value: prevWarn
              }),
              error: _assign({}, props, {
                value: prevError
              }),
              group: _assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: _assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: _assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = !1, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = !0;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher.current, ReactCurrentDispatcher.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = !1, ReactCurrentDispatcher.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, !1);
      }
      function shouldConstruct(Component2) {
        var prototype = Component2.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_BLOCK_TYPE:
              return describeFunctionComponentFrame(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init2(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var loggedTypeFailures = {}, ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values3, location, componentName, element) {
        {
          var has = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values3, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = !0, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      var didWarnAboutInvalidateContextType;
      didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
      var emptyObject = {};
      Object.freeze(emptyObject);
      function maskContext(type, context) {
        var contextTypes = type.contextTypes;
        if (!contextTypes)
          return emptyObject;
        var maskedContext = {};
        for (var contextName in contextTypes)
          maskedContext[contextName] = context[contextName];
        return maskedContext;
      }
      function checkContextTypes(typeSpecs, values3, location) {
        checkPropTypes(typeSpecs, values3, location, "Component");
      }
      function validateContextBounds(context, threadID) {
        for (var i2 = context._threadCount | 0; i2 <= threadID; i2++)
          context[i2] = context._currentValue2, context._threadCount = i2 + 1;
      }
      function processContext(type, context, threadID, isClass) {
        if (isClass) {
          var contextType = type.contextType;
          if ("contextType" in type) {
            var isValid = contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0;
            if (!isValid && !didWarnAboutInvalidateContextType.has(type)) {
              didWarnAboutInvalidateContextType.add(type);
              var addendum = "";
              contextType === void 0 ? addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof contextType != "object" ? addendum = " However, it is set to a " + typeof contextType + "." : contextType.$$typeof === REACT_PROVIDER_TYPE ? addendum = " Did you accidentally pass the Context.Provider instead?" : contextType._context !== void 0 ? addendum = " Did you accidentally pass the Context.Consumer instead?" : addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.", error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentName(type) || "Component", addendum);
            }
          }
          if (typeof contextType == "object" && contextType !== null)
            return validateContextBounds(contextType, threadID), contextType[threadID];
          {
            var maskedContext = maskContext(type, context);
            return type.contextTypes && checkContextTypes(type.contextTypes, maskedContext, "context"), maskedContext;
          }
        } else {
          var _maskedContext = maskContext(type, context);
          return type.contextTypes && checkContextTypes(type.contextTypes, _maskedContext, "context"), _maskedContext;
        }
      }
      for (var nextAvailableThreadIDs = new Uint16Array(16), i = 0; i < 15; i++)
        nextAvailableThreadIDs[i] = i + 1;
      nextAvailableThreadIDs[15] = 0;
      function growThreadCountAndReturnNextAvailable() {
        var oldArray = nextAvailableThreadIDs, oldSize = oldArray.length, newSize = oldSize * 2;
        if (!(newSize <= 65536))
          throw Error("Maximum number of concurrent React renderers exceeded. This can happen if you are not properly destroying the Readable provided by React. Ensure that you call .destroy() on it if you no longer want to read from it, and did not read to the end. If you use .pipe() this should be automatic.");
        var newArray = new Uint16Array(newSize);
        newArray.set(oldArray), nextAvailableThreadIDs = newArray, nextAvailableThreadIDs[0] = oldSize + 1;
        for (var _i = oldSize; _i < newSize - 1; _i++)
          nextAvailableThreadIDs[_i] = _i + 1;
        return nextAvailableThreadIDs[newSize - 1] = 0, oldSize;
      }
      function allocThreadID() {
        var nextID = nextAvailableThreadIDs[0];
        return nextID === 0 ? growThreadCountAndReturnNextAvailable() : (nextAvailableThreadIDs[0] = nextAvailableThreadIDs[nextID], nextID);
      }
      function freeThreadID(id) {
        nextAvailableThreadIDs[id] = nextAvailableThreadIDs[0], nextAvailableThreadIDs[0] = id;
      }
      var RESERVED = 0, STRING = 1, BOOLEANISH_STRING = 2, BOOLEAN = 3, OVERLOADED_BOOLEAN = 4, NUMERIC = 5, POSITIVE_NUMERIC = 6, ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", ROOT_ATTRIBUTE_NAME = "data-reactroot", VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$"), hasOwnProperty2 = Object.prototype.hasOwnProperty, illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
      function isAttributeNameSafe(attributeName) {
        return hasOwnProperty2.call(validatedAttributeNameCache, attributeName) ? !0 : hasOwnProperty2.call(illegalAttributeNameCache, attributeName) ? !1 : VALID_ATTRIBUTE_NAME_REGEX.test(attributeName) ? (validatedAttributeNameCache[attributeName] = !0, !0) : (illegalAttributeNameCache[attributeName] = !0, error("Invalid attribute name: `%s`", attributeName), !1);
      }
      function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
        return propertyInfo !== null ? propertyInfo.type === RESERVED : isCustomComponentTag ? !1 : name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N");
      }
      function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
        if (propertyInfo !== null && propertyInfo.type === RESERVED)
          return !1;
        switch (typeof value) {
          case "function":
          case "symbol":
            return !0;
          case "boolean": {
            if (isCustomComponentTag)
              return !1;
            if (propertyInfo !== null)
              return !propertyInfo.acceptsBooleans;
            var prefix2 = name.toLowerCase().slice(0, 5);
            return prefix2 !== "data-" && prefix2 !== "aria-";
          }
          default:
            return !1;
        }
      }
      function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
        if (value === null || typeof value > "u" || shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag))
          return !0;
        if (isCustomComponentTag)
          return !1;
        if (propertyInfo !== null)
          switch (propertyInfo.type) {
            case BOOLEAN:
              return !value;
            case OVERLOADED_BOOLEAN:
              return value === !1;
            case NUMERIC:
              return isNaN(value);
            case POSITIVE_NUMERIC:
              return isNaN(value) || value < 1;
          }
        return !1;
      }
      function getPropertyInfo(name) {
        return properties2.hasOwnProperty(name) ? properties2[name] : null;
      }
      function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
        this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN, this.attributeName = attributeName, this.attributeNamespace = attributeNamespace, this.mustUseProperty = mustUseProperty, this.propertyName = name, this.type = type, this.sanitizeURL = sanitizeURL2, this.removeEmptyString = removeEmptyString;
      }
      var properties2 = {}, reservedProps = [
        "children",
        "dangerouslySetInnerHTML",
        "defaultValue",
        "defaultChecked",
        "innerHTML",
        "suppressContentEditableWarning",
        "suppressHydrationWarning",
        "style"
      ];
      reservedProps.forEach(function(name) {
        properties2[name] = new PropertyInfoRecord(
          name,
          RESERVED,
          !1,
          name,
          null,
          !1,
          !1
        );
      }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
        var name = _ref[0], attributeName = _ref[1];
        properties2[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          attributeName,
          null,
          !1,
          !1
        );
      }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
        properties2[name] = new PropertyInfoRecord(
          name,
          BOOLEANISH_STRING,
          !1,
          name.toLowerCase(),
          null,
          !1,
          !1
        );
      }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
        properties2[name] = new PropertyInfoRecord(
          name,
          BOOLEANISH_STRING,
          !1,
          name,
          null,
          !1,
          !1
        );
      }), [
        "allowFullScreen",
        "async",
        "autoFocus",
        "autoPlay",
        "controls",
        "default",
        "defer",
        "disabled",
        "disablePictureInPicture",
        "disableRemotePlayback",
        "formNoValidate",
        "hidden",
        "loop",
        "noModule",
        "noValidate",
        "open",
        "playsInline",
        "readOnly",
        "required",
        "reversed",
        "scoped",
        "seamless",
        "itemScope"
      ].forEach(function(name) {
        properties2[name] = new PropertyInfoRecord(
          name,
          BOOLEAN,
          !1,
          name.toLowerCase(),
          null,
          !1,
          !1
        );
      }), [
        "checked",
        "multiple",
        "muted",
        "selected"
      ].forEach(function(name) {
        properties2[name] = new PropertyInfoRecord(
          name,
          BOOLEAN,
          !0,
          name,
          null,
          !1,
          !1
        );
      }), [
        "capture",
        "download"
      ].forEach(function(name) {
        properties2[name] = new PropertyInfoRecord(
          name,
          OVERLOADED_BOOLEAN,
          !1,
          name,
          null,
          !1,
          !1
        );
      }), [
        "cols",
        "rows",
        "size",
        "span"
      ].forEach(function(name) {
        properties2[name] = new PropertyInfoRecord(
          name,
          POSITIVE_NUMERIC,
          !1,
          name,
          null,
          !1,
          !1
        );
      }), ["rowSpan", "start"].forEach(function(name) {
        properties2[name] = new PropertyInfoRecord(
          name,
          NUMERIC,
          !1,
          name.toLowerCase(),
          null,
          !1,
          !1
        );
      });
      var CAMELIZE = /[\-\:]([a-z])/g, capitalize2 = function(token) {
        return token[1].toUpperCase();
      };
      [
        "accent-height",
        "alignment-baseline",
        "arabic-form",
        "baseline-shift",
        "cap-height",
        "clip-path",
        "clip-rule",
        "color-interpolation",
        "color-interpolation-filters",
        "color-profile",
        "color-rendering",
        "dominant-baseline",
        "enable-background",
        "fill-opacity",
        "fill-rule",
        "flood-color",
        "flood-opacity",
        "font-family",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-variant",
        "font-weight",
        "glyph-name",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "horiz-adv-x",
        "horiz-origin-x",
        "image-rendering",
        "letter-spacing",
        "lighting-color",
        "marker-end",
        "marker-mid",
        "marker-start",
        "overline-position",
        "overline-thickness",
        "paint-order",
        "panose-1",
        "pointer-events",
        "rendering-intent",
        "shape-rendering",
        "stop-color",
        "stop-opacity",
        "strikethrough-position",
        "strikethrough-thickness",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-anchor",
        "text-decoration",
        "text-rendering",
        "underline-position",
        "underline-thickness",
        "unicode-bidi",
        "unicode-range",
        "units-per-em",
        "v-alphabetic",
        "v-hanging",
        "v-ideographic",
        "v-mathematical",
        "vector-effect",
        "vert-adv-y",
        "vert-origin-x",
        "vert-origin-y",
        "word-spacing",
        "writing-mode",
        "xmlns:xlink",
        "x-height"
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize2);
        properties2[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          attributeName,
          null,
          !1,
          !1
        );
      }), [
        "xlink:actuate",
        "xlink:arcrole",
        "xlink:role",
        "xlink:show",
        "xlink:title",
        "xlink:type"
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize2);
        properties2[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          attributeName,
          "http://www.w3.org/1999/xlink",
          !1,
          !1
        );
      }), [
        "xml:base",
        "xml:lang",
        "xml:space"
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize2);
        properties2[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          attributeName,
          "http://www.w3.org/XML/1998/namespace",
          !1,
          !1
        );
      }), ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
        properties2[attributeName] = new PropertyInfoRecord(
          attributeName,
          STRING,
          !1,
          attributeName.toLowerCase(),
          null,
          !1,
          !1
        );
      });
      var xlinkHref = "xlinkHref";
      properties2[xlinkHref] = new PropertyInfoRecord(
        "xlinkHref",
        STRING,
        !1,
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        !0,
        !1
      ), ["src", "href", "action", "formAction"].forEach(function(attributeName) {
        properties2[attributeName] = new PropertyInfoRecord(
          attributeName,
          STRING,
          !1,
          attributeName.toLowerCase(),
          null,
          !0,
          !0
        );
      });
      var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, didWarn = !1;
      function sanitizeURL(url) {
        !didWarn && isJavaScriptProtocol.test(url) && (didWarn = !0, error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url)));
      }
      var matchHtmlRegExp = /["'&<>]/;
      function escapeHtml3(string) {
        var str = "" + string, match = matchHtmlRegExp.exec(str);
        if (!match)
          return str;
        var escape2, html = "", index, lastIndex = 0;
        for (index = match.index; index < str.length; index++) {
          switch (str.charCodeAt(index)) {
            case 34:
              escape2 = "&quot;";
              break;
            case 38:
              escape2 = "&amp;";
              break;
            case 39:
              escape2 = "&#x27;";
              break;
            case 60:
              escape2 = "&lt;";
              break;
            case 62:
              escape2 = "&gt;";
              break;
            default:
              continue;
          }
          lastIndex !== index && (html += str.substring(lastIndex, index)), lastIndex = index + 1, html += escape2;
        }
        return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
      }
      function escapeTextForBrowser(text) {
        return typeof text == "boolean" || typeof text == "number" ? "" + text : escapeHtml3(text);
      }
      function quoteAttributeValueForBrowser(value) {
        return '"' + escapeTextForBrowser(value) + '"';
      }
      function createMarkupForRoot() {
        return ROOT_ATTRIBUTE_NAME + '=""';
      }
      function createMarkupForProperty(name, value) {
        var propertyInfo = getPropertyInfo(name);
        if (name !== "style" && shouldIgnoreAttribute(name, propertyInfo, !1) || shouldRemoveAttribute(name, value, propertyInfo, !1))
          return "";
        if (propertyInfo !== null) {
          var attributeName = propertyInfo.attributeName, type = propertyInfo.type;
          return type === BOOLEAN || type === OVERLOADED_BOOLEAN && value === !0 ? attributeName + '=""' : (propertyInfo.sanitizeURL && (value = "" + value, sanitizeURL(value)), attributeName + "=" + quoteAttributeValueForBrowser(value));
        } else if (isAttributeNameSafe(name))
          return name + "=" + quoteAttributeValueForBrowser(value);
        return "";
      }
      function createMarkupForCustomAttribute(name, value) {
        return !isAttributeNameSafe(name) || value == null ? "" : name + "=" + quoteAttributeValueForBrowser(value);
      }
      function is2(x, y) {
        return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
      }
      var objectIs = typeof Object.is == "function" ? Object.is : is2, currentlyRenderingComponent = null, firstWorkInProgressHook = null, workInProgressHook = null, isReRender = !1, didScheduleRenderPhaseUpdate = !1, renderPhaseUpdates = null, numberOfReRenders = 0, RE_RENDER_LIMIT = 25, isInHookUserCodeInDev = !1, currentHookNameInDev;
      function resolveCurrentlyRenderingComponent() {
        if (currentlyRenderingComponent === null)
          throw Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
        return isInHookUserCodeInDev && error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks"), currentlyRenderingComponent;
      }
      function areHookInputsEqual(nextDeps, prevDeps) {
        if (prevDeps === null)
          return error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev), !1;
        nextDeps.length !== prevDeps.length && error(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
        for (var i2 = 0; i2 < prevDeps.length && i2 < nextDeps.length; i2++)
          if (!objectIs(nextDeps[i2], prevDeps[i2]))
            return !1;
        return !0;
      }
      function createHook() {
        if (numberOfReRenders > 0)
          throw Error("Rendered more hooks than during the previous render");
        return {
          memoizedState: null,
          queue: null,
          next: null
        };
      }
      function createWorkInProgressHook() {
        return workInProgressHook === null ? firstWorkInProgressHook === null ? (isReRender = !1, firstWorkInProgressHook = workInProgressHook = createHook()) : (isReRender = !0, workInProgressHook = firstWorkInProgressHook) : workInProgressHook.next === null ? (isReRender = !1, workInProgressHook = workInProgressHook.next = createHook()) : (isReRender = !0, workInProgressHook = workInProgressHook.next), workInProgressHook;
      }
      function prepareToUseHooks(componentIdentity) {
        currentlyRenderingComponent = componentIdentity, isInHookUserCodeInDev = !1;
      }
      function finishHooks(Component2, props, children, refOrContext) {
        for (; didScheduleRenderPhaseUpdate; )
          didScheduleRenderPhaseUpdate = !1, numberOfReRenders += 1, workInProgressHook = null, children = Component2(props, refOrContext);
        return resetHooksState(), children;
      }
      function resetHooksState() {
        isInHookUserCodeInDev = !1, currentlyRenderingComponent = null, didScheduleRenderPhaseUpdate = !1, firstWorkInProgressHook = null, numberOfReRenders = 0, renderPhaseUpdates = null, workInProgressHook = null;
      }
      function readContext(context, observedBits) {
        var threadID = currentPartialRenderer.threadID;
        return validateContextBounds(context, threadID), isInHookUserCodeInDev && error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), context[threadID];
      }
      function useContext8(context, observedBits) {
        currentHookNameInDev = "useContext", resolveCurrentlyRenderingComponent();
        var threadID = currentPartialRenderer.threadID;
        return validateContextBounds(context, threadID), context[threadID];
      }
      function basicStateReducer(state, action) {
        return typeof action == "function" ? action(state) : action;
      }
      function useState13(initialState) {
        return currentHookNameInDev = "useState", useReducer(
          basicStateReducer,
          initialState
        );
      }
      function useReducer(reducer, initialArg, init2) {
        if (reducer !== basicStateReducer && (currentHookNameInDev = "useReducer"), currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook(), isReRender) {
          var queue2 = workInProgressHook.queue, dispatch = queue2.dispatch;
          if (renderPhaseUpdates !== null) {
            var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue2);
            if (firstRenderPhaseUpdate !== void 0) {
              renderPhaseUpdates.delete(queue2);
              var newState = workInProgressHook.memoizedState, update = firstRenderPhaseUpdate;
              do {
                var action = update.action;
                isInHookUserCodeInDev = !0, newState = reducer(newState, action), isInHookUserCodeInDev = !1, update = update.next;
              } while (update !== null);
              return workInProgressHook.memoizedState = newState, [newState, dispatch];
            }
          }
          return [workInProgressHook.memoizedState, dispatch];
        } else {
          isInHookUserCodeInDev = !0;
          var initialState;
          reducer === basicStateReducer ? initialState = typeof initialArg == "function" ? initialArg() : initialArg : initialState = init2 !== void 0 ? init2(initialArg) : initialArg, isInHookUserCodeInDev = !1, workInProgressHook.memoizedState = initialState;
          var _queue = workInProgressHook.queue = {
            last: null,
            dispatch: null
          }, _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
          return [workInProgressHook.memoizedState, _dispatch];
        }
      }
      function useMemo7(nextCreate, deps) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook();
        var nextDeps = deps === void 0 ? null : deps;
        if (workInProgressHook !== null) {
          var prevState = workInProgressHook.memoizedState;
          if (prevState !== null && nextDeps !== null) {
            var prevDeps = prevState[1];
            if (areHookInputsEqual(nextDeps, prevDeps))
              return prevState[0];
          }
        }
        isInHookUserCodeInDev = !0;
        var nextValue = nextCreate();
        return isInHookUserCodeInDev = !1, workInProgressHook.memoizedState = [nextValue, nextDeps], nextValue;
      }
      function useRef9(initialValue) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook();
        var previousRef = workInProgressHook.memoizedState;
        if (previousRef === null) {
          var ref = {
            current: initialValue
          };
          return Object.seal(ref), workInProgressHook.memoizedState = ref, ref;
        } else
          return previousRef;
      }
      function useLayoutEffect5(create, inputs) {
        currentHookNameInDev = "useLayoutEffect", error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
      }
      function dispatchAction(componentIdentity, queue2, action) {
        if (!(numberOfReRenders < RE_RENDER_LIMIT))
          throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        if (componentIdentity === currentlyRenderingComponent) {
          didScheduleRenderPhaseUpdate = !0;
          var update = {
            action,
            next: null
          };
          renderPhaseUpdates === null && (renderPhaseUpdates = /* @__PURE__ */ new Map());
          var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue2);
          if (firstRenderPhaseUpdate === void 0)
            renderPhaseUpdates.set(queue2, update);
          else {
            for (var lastRenderPhaseUpdate = firstRenderPhaseUpdate; lastRenderPhaseUpdate.next !== null; )
              lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
            lastRenderPhaseUpdate.next = update;
          }
        }
      }
      function useCallback9(callback, deps) {
        return useMemo7(function() {
          return callback;
        }, deps);
      }
      function useMutableSource(source, getSnapshot, subscribe) {
        return resolveCurrentlyRenderingComponent(), getSnapshot(source._source);
      }
      function useDeferredValue(value) {
        return resolveCurrentlyRenderingComponent(), value;
      }
      function useTransition2() {
        resolveCurrentlyRenderingComponent();
        var startTransition = function(callback) {
          callback();
        };
        return [startTransition, !1];
      }
      function useOpaqueIdentifier() {
        return (currentPartialRenderer.identifierPrefix || "") + "R:" + (currentPartialRenderer.uniqueID++).toString(36);
      }
      function noop2() {
      }
      var currentPartialRenderer = null;
      function setCurrentPartialRenderer(renderer) {
        currentPartialRenderer = renderer;
      }
      var Dispatcher = {
        readContext,
        useContext: useContext8,
        useMemo: useMemo7,
        useReducer,
        useRef: useRef9,
        useState: useState13,
        useLayoutEffect: useLayoutEffect5,
        useCallback: useCallback9,
        useImperativeHandle: noop2,
        useEffect: noop2,
        useDebugValue: noop2,
        useDeferredValue,
        useTransition: useTransition2,
        useOpaqueIdentifier,
        useMutableSource
      }, HTML_NAMESPACE = "http://www.w3.org/1999/xhtml", MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML", SVG_NAMESPACE = "http://www.w3.org/2000/svg", Namespaces = {
        html: HTML_NAMESPACE,
        mathml: MATH_NAMESPACE,
        svg: SVG_NAMESPACE
      };
      function getIntrinsicNamespace(type) {
        switch (type) {
          case "svg":
            return SVG_NAMESPACE;
          case "math":
            return MATH_NAMESPACE;
          default:
            return HTML_NAMESPACE;
        }
      }
      function getChildNamespace(parentNamespace, type) {
        return parentNamespace == null || parentNamespace === HTML_NAMESPACE ? getIntrinsicNamespace(type) : parentNamespace === SVG_NAMESPACE && type === "foreignObject" ? HTML_NAMESPACE : parentNamespace;
      }
      var hasReadOnlyValue = {
        button: !0,
        checkbox: !0,
        image: !0,
        hidden: !0,
        radio: !0,
        reset: !0,
        submit: !0
      };
      function checkControlledValueProps(tagName, props) {
        hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null || error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), props.onChange || props.readOnly || props.disabled || props.checked == null || error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
      }
      var omittedCloseTags = {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
      }, voidElementTags = _assign({
        menuitem: !0
      }, omittedCloseTags), HTML = "__html";
      function assertValidProps(tag, props) {
        if (!!props) {
          if (voidElementTags[tag] && !(props.children == null && props.dangerouslySetInnerHTML == null))
            throw Error(tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
          if (props.dangerouslySetInnerHTML != null) {
            if (props.children != null)
              throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            if (!(typeof props.dangerouslySetInnerHTML == "object" && HTML in props.dangerouslySetInnerHTML))
              throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
          }
          if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null && error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), !(props.style == null || typeof props.style == "object"))
            throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
        }
      }
      var isUnitlessNumber = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
      };
      function prefixKey(prefix2, key) {
        return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
      }
      var prefixes = ["Webkit", "ms", "Moz", "O"];
      Object.keys(isUnitlessNumber).forEach(function(prop) {
        prefixes.forEach(function(prefix2) {
          isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
        });
      });
      function dangerousStyleValue(name, value, isCustomProperty) {
        var isEmpty3 = value == null || typeof value == "boolean" || value === "";
        return isEmpty3 ? "" : !isCustomProperty && typeof value == "number" && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) ? value + "px" : ("" + value).trim();
      }
      var uppercasePattern = /([A-Z])/g, msPattern = /^ms-/;
      function hyphenateStyleName(name) {
        return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern, "-ms-");
      }
      function isCustomComponent(tagName, props) {
        if (tagName.indexOf("-") === -1)
          return typeof props.is == "string";
        switch (tagName) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return !1;
          default:
            return !0;
        }
      }
      var warnValidStyle = function() {
      };
      {
        var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/, msPattern$1 = /^-ms-/, hyphenPattern = /-(.)/g, badStyleValueWithSemicolonPattern = /;\s*$/, warnedStyleNames = {}, warnedStyleValues = {}, warnedForNaNValue = !1, warnedForInfinityValue = !1, camelize = function(string) {
          return string.replace(hyphenPattern, function(_2, character) {
            return character.toUpperCase();
          });
        }, warnHyphenatedStyleName = function(name) {
          warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = !0, error(
            "Unsupported style property %s. Did you mean %s?",
            name,
            camelize(name.replace(msPattern$1, "ms-"))
          ));
        }, warnBadVendoredStyleName = function(name) {
          warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = !0, error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1)));
        }, warnStyleValueWithSemicolon = function(name, value) {
          warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value] || (warnedStyleValues[value] = !0, error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, "")));
        }, warnStyleValueIsNaN = function(name, value) {
          warnedForNaNValue || (warnedForNaNValue = !0, error("`NaN` is an invalid value for the `%s` css style property.", name));
        }, warnStyleValueIsInfinity = function(name, value) {
          warnedForInfinityValue || (warnedForInfinityValue = !0, error("`Infinity` is an invalid value for the `%s` css style property.", name));
        };
        warnValidStyle = function(name, value) {
          name.indexOf("-") > -1 ? warnHyphenatedStyleName(name) : badVendoredStyleNamePattern.test(name) ? warnBadVendoredStyleName(name) : badStyleValueWithSemicolonPattern.test(value) && warnStyleValueWithSemicolon(name, value), typeof value == "number" && (isNaN(value) ? warnStyleValueIsNaN(name, value) : isFinite(value) || warnStyleValueIsInfinity(name, value));
        };
      }
      var warnValidStyle$1 = warnValidStyle, ariaProperties = {
        "aria-current": 0,
        "aria-details": 0,
        "aria-disabled": 0,
        "aria-hidden": 0,
        "aria-invalid": 0,
        "aria-keyshortcuts": 0,
        "aria-label": 0,
        "aria-roledescription": 0,
        "aria-autocomplete": 0,
        "aria-checked": 0,
        "aria-expanded": 0,
        "aria-haspopup": 0,
        "aria-level": 0,
        "aria-modal": 0,
        "aria-multiline": 0,
        "aria-multiselectable": 0,
        "aria-orientation": 0,
        "aria-placeholder": 0,
        "aria-pressed": 0,
        "aria-readonly": 0,
        "aria-required": 0,
        "aria-selected": 0,
        "aria-sort": 0,
        "aria-valuemax": 0,
        "aria-valuemin": 0,
        "aria-valuenow": 0,
        "aria-valuetext": 0,
        "aria-atomic": 0,
        "aria-busy": 0,
        "aria-live": 0,
        "aria-relevant": 0,
        "aria-dropeffect": 0,
        "aria-grabbed": 0,
        "aria-activedescendant": 0,
        "aria-colcount": 0,
        "aria-colindex": 0,
        "aria-colspan": 0,
        "aria-controls": 0,
        "aria-describedby": 0,
        "aria-errormessage": 0,
        "aria-flowto": 0,
        "aria-labelledby": 0,
        "aria-owns": 0,
        "aria-posinset": 0,
        "aria-rowcount": 0,
        "aria-rowindex": 0,
        "aria-rowspan": 0,
        "aria-setsize": 0
      }, warnedProperties = {}, rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$"), hasOwnProperty$1 = Object.prototype.hasOwnProperty;
      function validateProperty(tagName, name) {
        {
          if (hasOwnProperty$1.call(warnedProperties, name) && warnedProperties[name])
            return !0;
          if (rARIACamel.test(name)) {
            var ariaName = "aria-" + name.slice(4).toLowerCase(), correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
            if (correctName == null)
              return error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name), warnedProperties[name] = !0, !0;
            if (name !== correctName)
              return error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName), warnedProperties[name] = !0, !0;
          }
          if (rARIA.test(name)) {
            var lowerCasedName = name.toLowerCase(), standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
            if (standardName == null)
              return warnedProperties[name] = !0, !1;
            if (name !== standardName)
              return error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName), warnedProperties[name] = !0, !0;
          }
        }
        return !0;
      }
      function warnInvalidARIAProps(type, props) {
        {
          var invalidProps = [];
          for (var key in props) {
            var isValid = validateProperty(type, key);
            isValid || invalidProps.push(key);
          }
          var unknownPropString = invalidProps.map(function(prop) {
            return "`" + prop + "`";
          }).join(", ");
          invalidProps.length === 1 ? error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type) : invalidProps.length > 1 && error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
        }
      }
      function validateProperties(type, props) {
        isCustomComponent(type, props) || warnInvalidARIAProps(type, props);
      }
      var didWarnValueNull = !1;
      function validateProperties$1(type, props) {
        {
          if (type !== "input" && type !== "textarea" && type !== "select")
            return;
          props != null && props.value === null && !didWarnValueNull && (didWarnValueNull = !0, type === "select" && props.multiple ? error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type) : error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type));
        }
      }
      var possibleStandardNames = {
        accept: "accept",
        acceptcharset: "acceptCharset",
        "accept-charset": "acceptCharset",
        accesskey: "accessKey",
        action: "action",
        allowfullscreen: "allowFullScreen",
        alt: "alt",
        as: "as",
        async: "async",
        autocapitalize: "autoCapitalize",
        autocomplete: "autoComplete",
        autocorrect: "autoCorrect",
        autofocus: "autoFocus",
        autoplay: "autoPlay",
        autosave: "autoSave",
        capture: "capture",
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        challenge: "challenge",
        charset: "charSet",
        checked: "checked",
        children: "children",
        cite: "cite",
        class: "className",
        classid: "classID",
        classname: "className",
        cols: "cols",
        colspan: "colSpan",
        content: "content",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        controls: "controls",
        controlslist: "controlsList",
        coords: "coords",
        crossorigin: "crossOrigin",
        dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
        data: "data",
        datetime: "dateTime",
        default: "default",
        defaultchecked: "defaultChecked",
        defaultvalue: "defaultValue",
        defer: "defer",
        dir: "dir",
        disabled: "disabled",
        disablepictureinpicture: "disablePictureInPicture",
        disableremoteplayback: "disableRemotePlayback",
        download: "download",
        draggable: "draggable",
        enctype: "encType",
        enterkeyhint: "enterKeyHint",
        for: "htmlFor",
        form: "form",
        formmethod: "formMethod",
        formaction: "formAction",
        formenctype: "formEncType",
        formnovalidate: "formNoValidate",
        formtarget: "formTarget",
        frameborder: "frameBorder",
        headers: "headers",
        height: "height",
        hidden: "hidden",
        high: "high",
        href: "href",
        hreflang: "hrefLang",
        htmlfor: "htmlFor",
        httpequiv: "httpEquiv",
        "http-equiv": "httpEquiv",
        icon: "icon",
        id: "id",
        innerhtml: "innerHTML",
        inputmode: "inputMode",
        integrity: "integrity",
        is: "is",
        itemid: "itemID",
        itemprop: "itemProp",
        itemref: "itemRef",
        itemscope: "itemScope",
        itemtype: "itemType",
        keyparams: "keyParams",
        keytype: "keyType",
        kind: "kind",
        label: "label",
        lang: "lang",
        list: "list",
        loop: "loop",
        low: "low",
        manifest: "manifest",
        marginwidth: "marginWidth",
        marginheight: "marginHeight",
        max: "max",
        maxlength: "maxLength",
        media: "media",
        mediagroup: "mediaGroup",
        method: "method",
        min: "min",
        minlength: "minLength",
        multiple: "multiple",
        muted: "muted",
        name: "name",
        nomodule: "noModule",
        nonce: "nonce",
        novalidate: "noValidate",
        open: "open",
        optimum: "optimum",
        pattern: "pattern",
        placeholder: "placeholder",
        playsinline: "playsInline",
        poster: "poster",
        preload: "preload",
        profile: "profile",
        radiogroup: "radioGroup",
        readonly: "readOnly",
        referrerpolicy: "referrerPolicy",
        rel: "rel",
        required: "required",
        reversed: "reversed",
        role: "role",
        rows: "rows",
        rowspan: "rowSpan",
        sandbox: "sandbox",
        scope: "scope",
        scoped: "scoped",
        scrolling: "scrolling",
        seamless: "seamless",
        selected: "selected",
        shape: "shape",
        size: "size",
        sizes: "sizes",
        span: "span",
        spellcheck: "spellCheck",
        src: "src",
        srcdoc: "srcDoc",
        srclang: "srcLang",
        srcset: "srcSet",
        start: "start",
        step: "step",
        style: "style",
        summary: "summary",
        tabindex: "tabIndex",
        target: "target",
        title: "title",
        type: "type",
        usemap: "useMap",
        value: "value",
        width: "width",
        wmode: "wmode",
        wrap: "wrap",
        about: "about",
        accentheight: "accentHeight",
        "accent-height": "accentHeight",
        accumulate: "accumulate",
        additive: "additive",
        alignmentbaseline: "alignmentBaseline",
        "alignment-baseline": "alignmentBaseline",
        allowreorder: "allowReorder",
        alphabetic: "alphabetic",
        amplitude: "amplitude",
        arabicform: "arabicForm",
        "arabic-form": "arabicForm",
        ascent: "ascent",
        attributename: "attributeName",
        attributetype: "attributeType",
        autoreverse: "autoReverse",
        azimuth: "azimuth",
        basefrequency: "baseFrequency",
        baselineshift: "baselineShift",
        "baseline-shift": "baselineShift",
        baseprofile: "baseProfile",
        bbox: "bbox",
        begin: "begin",
        bias: "bias",
        by: "by",
        calcmode: "calcMode",
        capheight: "capHeight",
        "cap-height": "capHeight",
        clip: "clip",
        clippath: "clipPath",
        "clip-path": "clipPath",
        clippathunits: "clipPathUnits",
        cliprule: "clipRule",
        "clip-rule": "clipRule",
        color: "color",
        colorinterpolation: "colorInterpolation",
        "color-interpolation": "colorInterpolation",
        colorinterpolationfilters: "colorInterpolationFilters",
        "color-interpolation-filters": "colorInterpolationFilters",
        colorprofile: "colorProfile",
        "color-profile": "colorProfile",
        colorrendering: "colorRendering",
        "color-rendering": "colorRendering",
        contentscripttype: "contentScriptType",
        contentstyletype: "contentStyleType",
        cursor: "cursor",
        cx: "cx",
        cy: "cy",
        d: "d",
        datatype: "datatype",
        decelerate: "decelerate",
        descent: "descent",
        diffuseconstant: "diffuseConstant",
        direction: "direction",
        display: "display",
        divisor: "divisor",
        dominantbaseline: "dominantBaseline",
        "dominant-baseline": "dominantBaseline",
        dur: "dur",
        dx: "dx",
        dy: "dy",
        edgemode: "edgeMode",
        elevation: "elevation",
        enablebackground: "enableBackground",
        "enable-background": "enableBackground",
        end: "end",
        exponent: "exponent",
        externalresourcesrequired: "externalResourcesRequired",
        fill: "fill",
        fillopacity: "fillOpacity",
        "fill-opacity": "fillOpacity",
        fillrule: "fillRule",
        "fill-rule": "fillRule",
        filter: "filter",
        filterres: "filterRes",
        filterunits: "filterUnits",
        floodopacity: "floodOpacity",
        "flood-opacity": "floodOpacity",
        floodcolor: "floodColor",
        "flood-color": "floodColor",
        focusable: "focusable",
        fontfamily: "fontFamily",
        "font-family": "fontFamily",
        fontsize: "fontSize",
        "font-size": "fontSize",
        fontsizeadjust: "fontSizeAdjust",
        "font-size-adjust": "fontSizeAdjust",
        fontstretch: "fontStretch",
        "font-stretch": "fontStretch",
        fontstyle: "fontStyle",
        "font-style": "fontStyle",
        fontvariant: "fontVariant",
        "font-variant": "fontVariant",
        fontweight: "fontWeight",
        "font-weight": "fontWeight",
        format: "format",
        from: "from",
        fx: "fx",
        fy: "fy",
        g1: "g1",
        g2: "g2",
        glyphname: "glyphName",
        "glyph-name": "glyphName",
        glyphorientationhorizontal: "glyphOrientationHorizontal",
        "glyph-orientation-horizontal": "glyphOrientationHorizontal",
        glyphorientationvertical: "glyphOrientationVertical",
        "glyph-orientation-vertical": "glyphOrientationVertical",
        glyphref: "glyphRef",
        gradienttransform: "gradientTransform",
        gradientunits: "gradientUnits",
        hanging: "hanging",
        horizadvx: "horizAdvX",
        "horiz-adv-x": "horizAdvX",
        horizoriginx: "horizOriginX",
        "horiz-origin-x": "horizOriginX",
        ideographic: "ideographic",
        imagerendering: "imageRendering",
        "image-rendering": "imageRendering",
        in2: "in2",
        in: "in",
        inlist: "inlist",
        intercept: "intercept",
        k1: "k1",
        k2: "k2",
        k3: "k3",
        k4: "k4",
        k: "k",
        kernelmatrix: "kernelMatrix",
        kernelunitlength: "kernelUnitLength",
        kerning: "kerning",
        keypoints: "keyPoints",
        keysplines: "keySplines",
        keytimes: "keyTimes",
        lengthadjust: "lengthAdjust",
        letterspacing: "letterSpacing",
        "letter-spacing": "letterSpacing",
        lightingcolor: "lightingColor",
        "lighting-color": "lightingColor",
        limitingconeangle: "limitingConeAngle",
        local: "local",
        markerend: "markerEnd",
        "marker-end": "markerEnd",
        markerheight: "markerHeight",
        markermid: "markerMid",
        "marker-mid": "markerMid",
        markerstart: "markerStart",
        "marker-start": "markerStart",
        markerunits: "markerUnits",
        markerwidth: "markerWidth",
        mask: "mask",
        maskcontentunits: "maskContentUnits",
        maskunits: "maskUnits",
        mathematical: "mathematical",
        mode: "mode",
        numoctaves: "numOctaves",
        offset: "offset",
        opacity: "opacity",
        operator: "operator",
        order: "order",
        orient: "orient",
        orientation: "orientation",
        origin: "origin",
        overflow: "overflow",
        overlineposition: "overlinePosition",
        "overline-position": "overlinePosition",
        overlinethickness: "overlineThickness",
        "overline-thickness": "overlineThickness",
        paintorder: "paintOrder",
        "paint-order": "paintOrder",
        panose1: "panose1",
        "panose-1": "panose1",
        pathlength: "pathLength",
        patterncontentunits: "patternContentUnits",
        patterntransform: "patternTransform",
        patternunits: "patternUnits",
        pointerevents: "pointerEvents",
        "pointer-events": "pointerEvents",
        points: "points",
        pointsatx: "pointsAtX",
        pointsaty: "pointsAtY",
        pointsatz: "pointsAtZ",
        prefix: "prefix",
        preservealpha: "preserveAlpha",
        preserveaspectratio: "preserveAspectRatio",
        primitiveunits: "primitiveUnits",
        property: "property",
        r: "r",
        radius: "radius",
        refx: "refX",
        refy: "refY",
        renderingintent: "renderingIntent",
        "rendering-intent": "renderingIntent",
        repeatcount: "repeatCount",
        repeatdur: "repeatDur",
        requiredextensions: "requiredExtensions",
        requiredfeatures: "requiredFeatures",
        resource: "resource",
        restart: "restart",
        result: "result",
        results: "results",
        rotate: "rotate",
        rx: "rx",
        ry: "ry",
        scale: "scale",
        security: "security",
        seed: "seed",
        shaperendering: "shapeRendering",
        "shape-rendering": "shapeRendering",
        slope: "slope",
        spacing: "spacing",
        specularconstant: "specularConstant",
        specularexponent: "specularExponent",
        speed: "speed",
        spreadmethod: "spreadMethod",
        startoffset: "startOffset",
        stddeviation: "stdDeviation",
        stemh: "stemh",
        stemv: "stemv",
        stitchtiles: "stitchTiles",
        stopcolor: "stopColor",
        "stop-color": "stopColor",
        stopopacity: "stopOpacity",
        "stop-opacity": "stopOpacity",
        strikethroughposition: "strikethroughPosition",
        "strikethrough-position": "strikethroughPosition",
        strikethroughthickness: "strikethroughThickness",
        "strikethrough-thickness": "strikethroughThickness",
        string: "string",
        stroke: "stroke",
        strokedasharray: "strokeDasharray",
        "stroke-dasharray": "strokeDasharray",
        strokedashoffset: "strokeDashoffset",
        "stroke-dashoffset": "strokeDashoffset",
        strokelinecap: "strokeLinecap",
        "stroke-linecap": "strokeLinecap",
        strokelinejoin: "strokeLinejoin",
        "stroke-linejoin": "strokeLinejoin",
        strokemiterlimit: "strokeMiterlimit",
        "stroke-miterlimit": "strokeMiterlimit",
        strokewidth: "strokeWidth",
        "stroke-width": "strokeWidth",
        strokeopacity: "strokeOpacity",
        "stroke-opacity": "strokeOpacity",
        suppresscontenteditablewarning: "suppressContentEditableWarning",
        suppresshydrationwarning: "suppressHydrationWarning",
        surfacescale: "surfaceScale",
        systemlanguage: "systemLanguage",
        tablevalues: "tableValues",
        targetx: "targetX",
        targety: "targetY",
        textanchor: "textAnchor",
        "text-anchor": "textAnchor",
        textdecoration: "textDecoration",
        "text-decoration": "textDecoration",
        textlength: "textLength",
        textrendering: "textRendering",
        "text-rendering": "textRendering",
        to: "to",
        transform: "transform",
        typeof: "typeof",
        u1: "u1",
        u2: "u2",
        underlineposition: "underlinePosition",
        "underline-position": "underlinePosition",
        underlinethickness: "underlineThickness",
        "underline-thickness": "underlineThickness",
        unicode: "unicode",
        unicodebidi: "unicodeBidi",
        "unicode-bidi": "unicodeBidi",
        unicoderange: "unicodeRange",
        "unicode-range": "unicodeRange",
        unitsperem: "unitsPerEm",
        "units-per-em": "unitsPerEm",
        unselectable: "unselectable",
        valphabetic: "vAlphabetic",
        "v-alphabetic": "vAlphabetic",
        values: "values",
        vectoreffect: "vectorEffect",
        "vector-effect": "vectorEffect",
        version: "version",
        vertadvy: "vertAdvY",
        "vert-adv-y": "vertAdvY",
        vertoriginx: "vertOriginX",
        "vert-origin-x": "vertOriginX",
        vertoriginy: "vertOriginY",
        "vert-origin-y": "vertOriginY",
        vhanging: "vHanging",
        "v-hanging": "vHanging",
        videographic: "vIdeographic",
        "v-ideographic": "vIdeographic",
        viewbox: "viewBox",
        viewtarget: "viewTarget",
        visibility: "visibility",
        vmathematical: "vMathematical",
        "v-mathematical": "vMathematical",
        vocab: "vocab",
        widths: "widths",
        wordspacing: "wordSpacing",
        "word-spacing": "wordSpacing",
        writingmode: "writingMode",
        "writing-mode": "writingMode",
        x1: "x1",
        x2: "x2",
        x: "x",
        xchannelselector: "xChannelSelector",
        xheight: "xHeight",
        "x-height": "xHeight",
        xlinkactuate: "xlinkActuate",
        "xlink:actuate": "xlinkActuate",
        xlinkarcrole: "xlinkArcrole",
        "xlink:arcrole": "xlinkArcrole",
        xlinkhref: "xlinkHref",
        "xlink:href": "xlinkHref",
        xlinkrole: "xlinkRole",
        "xlink:role": "xlinkRole",
        xlinkshow: "xlinkShow",
        "xlink:show": "xlinkShow",
        xlinktitle: "xlinkTitle",
        "xlink:title": "xlinkTitle",
        xlinktype: "xlinkType",
        "xlink:type": "xlinkType",
        xmlbase: "xmlBase",
        "xml:base": "xmlBase",
        xmllang: "xmlLang",
        "xml:lang": "xmlLang",
        xmlns: "xmlns",
        "xml:space": "xmlSpace",
        xmlnsxlink: "xmlnsXlink",
        "xmlns:xlink": "xmlnsXlink",
        xmlspace: "xmlSpace",
        y1: "y1",
        y2: "y2",
        y: "y",
        ychannelselector: "yChannelSelector",
        z: "z",
        zoomandpan: "zoomAndPan"
      }, validateProperty$1 = function() {
      };
      {
        var warnedProperties$1 = {}, _hasOwnProperty = Object.prototype.hasOwnProperty, EVENT_NAME_REGEX = /^on./, INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/, rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
        validateProperty$1 = function(tagName, name, value, eventRegistry) {
          if (_hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name])
            return !0;
          var lowerCasedName = name.toLowerCase();
          if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout")
            return error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), warnedProperties$1[name] = !0, !0;
          if (eventRegistry != null) {
            var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
            if (registrationNameDependencies.hasOwnProperty(name))
              return !0;
            var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
            if (registrationName != null)
              return error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName), warnedProperties$1[name] = !0, !0;
            if (EVENT_NAME_REGEX.test(name))
              return error("Unknown event handler property `%s`. It will be ignored.", name), warnedProperties$1[name] = !0, !0;
          } else if (EVENT_NAME_REGEX.test(name))
            return INVALID_EVENT_NAME_REGEX.test(name) && error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name), warnedProperties$1[name] = !0, !0;
          if (rARIA$1.test(name) || rARIACamel$1.test(name))
            return !0;
          if (lowerCasedName === "innerhtml")
            return error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), warnedProperties$1[name] = !0, !0;
          if (lowerCasedName === "aria")
            return error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), warnedProperties$1[name] = !0, !0;
          if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value != "string")
            return error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value), warnedProperties$1[name] = !0, !0;
          if (typeof value == "number" && isNaN(value))
            return error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name), warnedProperties$1[name] = !0, !0;
          var propertyInfo = getPropertyInfo(name), isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
          if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
            var standardName = possibleStandardNames[lowerCasedName];
            if (standardName !== name)
              return error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName), warnedProperties$1[name] = !0, !0;
          } else if (!isReserved && name !== lowerCasedName)
            return error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName), warnedProperties$1[name] = !0, !0;
          return typeof value == "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, !1) ? (value ? error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name) : error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name), warnedProperties$1[name] = !0, !0) : isReserved ? !0 : shouldRemoveAttributeWithWarning(name, value, propertyInfo, !1) ? (warnedProperties$1[name] = !0, !1) : ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN && (error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value), warnedProperties$1[name] = !0), !0);
        };
      }
      var warnUnknownProperties = function(type, props, eventRegistry) {
        {
          var unknownProps = [];
          for (var key in props) {
            var isValid = validateProperty$1(type, key, props[key], eventRegistry);
            isValid || unknownProps.push(key);
          }
          var unknownPropString = unknownProps.map(function(prop) {
            return "`" + prop + "`";
          }).join(", ");
          unknownProps.length === 1 ? error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type) : unknownProps.length > 1 && error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
        }
      };
      function validateProperties$2(type, props, eventRegistry) {
        isCustomComponent(type, props) || warnUnknownProperties(type, props, eventRegistry);
      }
      var toArray = React37.Children.toArray, currentDebugStacks = [], ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher, ReactDebugCurrentFrame$1, prevGetCurrentStackImpl = null, getCurrentServerStackImpl = function() {
        return "";
      }, describeStackFrame = function(element) {
        return "";
      }, validatePropertiesInDevelopment = function(type, props) {
      }, pushCurrentDebugStack = function(stack) {
      }, pushElementToDebugStack = function(element) {
      }, popCurrentDebugStack = function() {
      }, hasWarnedAboutUsingContextAsConsumer = !1;
      ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame, validatePropertiesInDevelopment = function(type, props) {
        validateProperties(type, props), validateProperties$1(type, props), validateProperties$2(type, props, null);
      }, describeStackFrame = function(element) {
        return describeUnknownElementTypeFrameInDEV(element.type, element._source, null);
      }, pushCurrentDebugStack = function(stack) {
        currentDebugStacks.push(stack), currentDebugStacks.length === 1 && (prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack, ReactDebugCurrentFrame$1.getCurrentStack = getCurrentServerStackImpl);
      }, pushElementToDebugStack = function(element) {
        var stack = currentDebugStacks[currentDebugStacks.length - 1], frame = stack[stack.length - 1];
        frame.debugElementStack.push(element);
      }, popCurrentDebugStack = function() {
        currentDebugStacks.pop(), currentDebugStacks.length === 0 && (ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl, prevGetCurrentStackImpl = null);
      }, getCurrentServerStackImpl = function() {
        if (currentDebugStacks.length === 0)
          return "";
        for (var frames = currentDebugStacks[currentDebugStacks.length - 1], stack = "", i2 = frames.length - 1; i2 >= 0; i2--)
          for (var frame = frames[i2], debugElementStack = frame.debugElementStack, ii = debugElementStack.length - 1; ii >= 0; ii--)
            stack += describeStackFrame(debugElementStack[ii]);
        return stack;
      };
      var didWarnDefaultInputValue = !1, didWarnDefaultChecked = !1, didWarnDefaultSelectValue = !1, didWarnDefaultTextareaValue = !1, didWarnInvalidOptionChildren = !1, didWarnAboutNoopUpdateForComponent = {}, didWarnAboutBadClass = {}, didWarnAboutModulePatternComponent = {}, didWarnAboutDeprecatedWillMount = {}, didWarnAboutUndefinedDerivedState = {}, didWarnAboutUninitializedState = {}, valuePropNames = ["value", "defaultValue"], newlineEatingTags = {
        listing: !0,
        pre: !0,
        textarea: !0
      }, VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, validatedTagCache = {};
      function validateDangerousTag(tag) {
        if (!validatedTagCache.hasOwnProperty(tag)) {
          if (!VALID_TAG_REGEX.test(tag))
            throw Error("Invalid tag: " + tag);
          validatedTagCache[tag] = !0;
        }
      }
      var styleNameCache = {}, processStyleName = function(styleName) {
        if (styleNameCache.hasOwnProperty(styleName))
          return styleNameCache[styleName];
        var result = hyphenateStyleName(styleName);
        return styleNameCache[styleName] = result, result;
      };
      function createMarkupForStyles(styles) {
        var serialized = "", delimiter = "";
        for (var styleName in styles)
          if (!!styles.hasOwnProperty(styleName)) {
            var isCustomProperty = styleName.indexOf("--") === 0, styleValue = styles[styleName];
            isCustomProperty || warnValidStyle$1(styleName, styleValue), styleValue != null && (serialized += delimiter + (isCustomProperty ? styleName : processStyleName(styleName)) + ":", serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty), delimiter = ";");
          }
        return serialized || null;
      }
      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor, componentName = _constructor && getComponentName(_constructor) || "ReactClass", warningKey = componentName + "." + callerName;
          if (didWarnAboutNoopUpdateForComponent[warningKey])
            return;
          error(`%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.

Please check the code for the %s component.`, callerName, callerName, componentName), didWarnAboutNoopUpdateForComponent[warningKey] = !0;
        }
      }
      function shouldConstruct$1(Component2) {
        return Component2.prototype && Component2.prototype.isReactComponent;
      }
      function getNonChildrenInnerMarkup(props) {
        var innerHTML = props.dangerouslySetInnerHTML;
        if (innerHTML != null) {
          if (innerHTML.__html != null)
            return innerHTML.__html;
        } else {
          var content = props.children;
          if (typeof content == "string" || typeof content == "number")
            return escapeTextForBrowser(content);
        }
        return null;
      }
      function flattenTopLevelChildren(children) {
        if (!React37.isValidElement(children))
          return toArray(children);
        var element = children;
        if (element.type !== REACT_FRAGMENT_TYPE)
          return [element];
        var fragmentChildren = element.props.children;
        if (!React37.isValidElement(fragmentChildren))
          return toArray(fragmentChildren);
        var fragmentChildElement = fragmentChildren;
        return [fragmentChildElement];
      }
      function flattenOptionChildren(children) {
        if (children == null)
          return children;
        var content = "";
        return React37.Children.forEach(children, function(child) {
          child != null && (content += child, !didWarnInvalidOptionChildren && typeof child != "string" && typeof child != "number" && (didWarnInvalidOptionChildren = !0, error("Only strings and numbers are supported as <option> children.")));
        }), content;
      }
      var hasOwnProperty$2 = Object.prototype.hasOwnProperty, STYLE = "style", RESERVED_PROPS = {
        children: null,
        dangerouslySetInnerHTML: null,
        suppressContentEditableWarning: null,
        suppressHydrationWarning: null
      };
      function createOpenTagMarkup(tagVerbatim, tagLowercase, props, namespace, makeStaticMarkup, isRootElement) {
        var ret = "<" + tagVerbatim, isCustomComponent$1 = isCustomComponent(tagLowercase, props);
        for (var propKey in props)
          if (!!hasOwnProperty$2.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue != null) {
              propKey === STYLE && (propValue = createMarkupForStyles(propValue));
              var markup = null;
              isCustomComponent$1 ? RESERVED_PROPS.hasOwnProperty(propKey) || (markup = createMarkupForCustomAttribute(propKey, propValue)) : markup = createMarkupForProperty(propKey, propValue), markup && (ret += " " + markup);
            }
          }
        return makeStaticMarkup || isRootElement && (ret += " " + createMarkupForRoot()), ret;
      }
      function validateRenderResult(child, type) {
        if (child === void 0)
          throw Error((getComponentName(type) || "Component") + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.");
      }
      function resolve(child, context, threadID) {
        for (; React37.isValidElement(child); ) {
          var element = child, Component2 = element.type;
          if (pushElementToDebugStack(element), typeof Component2 != "function")
            break;
          processChild(element, Component2);
        }
        function processChild(element2, Component3) {
          var isClass = shouldConstruct$1(Component3), publicContext = processContext(Component3, context, threadID, isClass), queue2 = [], replace = !1, updater = {
            isMounted: function(publicInstance) {
              return !1;
            },
            enqueueForceUpdate: function(publicInstance) {
              if (queue2 === null)
                return warnNoop(publicInstance, "forceUpdate"), null;
            },
            enqueueReplaceState: function(publicInstance, completeState) {
              replace = !0, queue2 = [completeState];
            },
            enqueueSetState: function(publicInstance, currentPartialState) {
              if (queue2 === null)
                return warnNoop(publicInstance, "setState"), null;
              queue2.push(currentPartialState);
            }
          }, inst;
          if (isClass) {
            if (inst = new Component3(element2.props, publicContext, updater), typeof Component3.getDerivedStateFromProps == "function") {
              if (inst.state === null || inst.state === void 0) {
                var componentName = getComponentName(Component3) || "Unknown";
                didWarnAboutUninitializedState[componentName] || (error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, inst.state === null ? "null" : "undefined", componentName), didWarnAboutUninitializedState[componentName] = !0);
              }
              var partialState = Component3.getDerivedStateFromProps.call(null, element2.props, inst.state);
              if (partialState === void 0) {
                var _componentName = getComponentName(Component3) || "Unknown";
                didWarnAboutUndefinedDerivedState[_componentName] || (error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", _componentName), didWarnAboutUndefinedDerivedState[_componentName] = !0);
              }
              partialState != null && (inst.state = _assign({}, inst.state, partialState));
            }
          } else {
            if (Component3.prototype && typeof Component3.prototype.render == "function") {
              var _componentName2 = getComponentName(Component3) || "Unknown";
              didWarnAboutBadClass[_componentName2] || (error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", _componentName2, _componentName2), didWarnAboutBadClass[_componentName2] = !0);
            }
            var componentIdentity = {};
            if (prepareToUseHooks(componentIdentity), inst = Component3(element2.props, publicContext, updater), inst = finishHooks(Component3, element2.props, inst, publicContext), inst != null && inst.render != null) {
              var _componentName3 = getComponentName(Component3) || "Unknown";
              didWarnAboutModulePatternComponent[_componentName3] || (error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName3, _componentName3, _componentName3), didWarnAboutModulePatternComponent[_componentName3] = !0);
            }
            if (inst == null || inst.render == null) {
              child = inst, validateRenderResult(child, Component3);
              return;
            }
          }
          inst.props = element2.props, inst.context = publicContext, inst.updater = updater;
          var initialState = inst.state;
          if (initialState === void 0 && (inst.state = initialState = null), typeof inst.UNSAFE_componentWillMount == "function" || typeof inst.componentWillMount == "function") {
            if (typeof inst.componentWillMount == "function") {
              if (inst.componentWillMount.__suppressDeprecationWarning !== !0) {
                var _componentName4 = getComponentName(Component3) || "Unknown";
                didWarnAboutDeprecatedWillMount[_componentName4] || (warn(
                  `componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.

Please update the following components: %s`,
                  _componentName4
                ), didWarnAboutDeprecatedWillMount[_componentName4] = !0);
              }
              typeof Component3.getDerivedStateFromProps != "function" && inst.componentWillMount();
            }
            if (typeof inst.UNSAFE_componentWillMount == "function" && typeof Component3.getDerivedStateFromProps != "function" && inst.UNSAFE_componentWillMount(), queue2.length) {
              var oldQueue = queue2, oldReplace = replace;
              if (queue2 = null, replace = !1, oldReplace && oldQueue.length === 1)
                inst.state = oldQueue[0];
              else {
                for (var nextState = oldReplace ? oldQueue[0] : inst.state, dontMutate = !0, i2 = oldReplace ? 1 : 0; i2 < oldQueue.length; i2++) {
                  var partial = oldQueue[i2], _partialState = typeof partial == "function" ? partial.call(inst, nextState, element2.props, publicContext) : partial;
                  _partialState != null && (dontMutate ? (dontMutate = !1, nextState = _assign({}, nextState, _partialState)) : _assign(nextState, _partialState));
                }
                inst.state = nextState;
              }
            } else
              queue2 = null;
          }
          child = inst.render(), child === void 0 && inst.render._isMockFunction && (child = null), validateRenderResult(child, Component3);
          var childContext;
          {
            if (typeof inst.getChildContext == "function") {
              var _childContextTypes = Component3.childContextTypes;
              if (typeof _childContextTypes == "object") {
                childContext = inst.getChildContext();
                for (var contextKey in childContext)
                  if (!(contextKey in _childContextTypes))
                    throw Error((getComponentName(Component3) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
              } else
                error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", getComponentName(Component3) || "Unknown");
            }
            childContext && (context = _assign({}, context, childContext));
          }
        }
        return {
          child,
          context
        };
      }
      var ReactDOMServerRenderer = /* @__PURE__ */ function() {
        function ReactDOMServerRenderer2(children, makeStaticMarkup, options) {
          var flatChildren = flattenTopLevelChildren(children), topFrame = {
            type: null,
            domNamespace: Namespaces.html,
            children: flatChildren,
            childIndex: 0,
            context: emptyObject,
            footer: ""
          };
          topFrame.debugElementStack = [], this.threadID = allocThreadID(), this.stack = [topFrame], this.exhausted = !1, this.currentSelectValue = null, this.previousWasTextNode = !1, this.makeStaticMarkup = makeStaticMarkup, this.suspenseDepth = 0, this.contextIndex = -1, this.contextStack = [], this.contextValueStack = [], this.uniqueID = 0, this.identifierPrefix = options && options.identifierPrefix || "", this.contextProviderStack = [];
        }
        var _proto = ReactDOMServerRenderer2.prototype;
        return _proto.destroy = function() {
          this.exhausted || (this.exhausted = !0, this.clearProviders(), freeThreadID(this.threadID));
        }, _proto.pushProvider = function(provider) {
          var index = ++this.contextIndex, context = provider.type._context, threadID = this.threadID;
          validateContextBounds(context, threadID);
          var previousValue = context[threadID];
          this.contextStack[index] = context, this.contextValueStack[index] = previousValue, this.contextProviderStack[index] = provider, context[threadID] = provider.props.value;
        }, _proto.popProvider = function(provider) {
          var index = this.contextIndex;
          (index < 0 || provider !== this.contextProviderStack[index]) && error("Unexpected pop.");
          var context = this.contextStack[index], previousValue = this.contextValueStack[index];
          this.contextStack[index] = null, this.contextValueStack[index] = null, this.contextProviderStack[index] = null, this.contextIndex--, context[this.threadID] = previousValue;
        }, _proto.clearProviders = function() {
          for (var index = this.contextIndex; index >= 0; index--) {
            var context = this.contextStack[index], previousValue = this.contextValueStack[index];
            context[this.threadID] = previousValue;
          }
        }, _proto.read = function(bytes) {
          if (this.exhausted)
            return null;
          var prevPartialRenderer = currentPartialRenderer;
          setCurrentPartialRenderer(this);
          var prevDispatcher = ReactCurrentDispatcher$1.current;
          ReactCurrentDispatcher$1.current = Dispatcher;
          try {
            for (var out = [""], suspended = !1; out[0].length < bytes; ) {
              if (this.stack.length === 0) {
                this.exhausted = !0, freeThreadID(this.threadID);
                break;
              }
              var frame = this.stack[this.stack.length - 1];
              if (suspended || frame.childIndex >= frame.children.length) {
                var footer = frame.footer;
                if (footer !== "" && (this.previousWasTextNode = !1), this.stack.pop(), frame.type === "select")
                  this.currentSelectValue = null;
                else if (frame.type != null && frame.type.type != null && frame.type.type.$$typeof === REACT_PROVIDER_TYPE) {
                  var provider = frame.type;
                  this.popProvider(provider);
                } else if (frame.type === REACT_SUSPENSE_TYPE) {
                  this.suspenseDepth--;
                  var buffered = out.pop();
                  if (suspended) {
                    suspended = !1;
                    var fallbackFrame = frame.fallbackFrame;
                    if (!fallbackFrame)
                      throw Error("ReactDOMServer did not find an internal fallback frame for Suspense. This is a bug in React. Please file an issue.");
                    this.stack.push(fallbackFrame), out[this.suspenseDepth] += "<!--$!-->";
                    continue;
                  } else
                    out[this.suspenseDepth] += buffered;
                }
                out[this.suspenseDepth] += footer;
                continue;
              }
              var child = frame.children[frame.childIndex++], outBuffer = "";
              pushCurrentDebugStack(this.stack), frame.debugElementStack.length = 0;
              try {
                outBuffer += this.render(child, frame.context, frame.domNamespace);
              } catch (err) {
                if (err != null && typeof err.then == "function")
                  if (enableSuspenseServerRenderer) {
                    if (!(this.suspenseDepth > 0))
                      throw Error(`A React component suspended while rendering, but no fallback UI was specified.

Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.`);
                    suspended = !0;
                  } else
                    throw Error("ReactDOMServer does not yet support Suspense.");
                else
                  throw err;
              } finally {
                popCurrentDebugStack();
              }
              out.length <= this.suspenseDepth && out.push(""), out[this.suspenseDepth] += outBuffer;
            }
            return out[0];
          } finally {
            ReactCurrentDispatcher$1.current = prevDispatcher, setCurrentPartialRenderer(prevPartialRenderer), resetHooksState();
          }
        }, _proto.render = function(child, context, parentNamespace) {
          if (typeof child == "string" || typeof child == "number") {
            var text = "" + child;
            return text === "" ? "" : this.makeStaticMarkup ? escapeTextForBrowser(text) : this.previousWasTextNode ? "<!-- -->" + escapeTextForBrowser(text) : (this.previousWasTextNode = !0, escapeTextForBrowser(text));
          } else {
            var nextChild, _resolve = resolve(child, context, this.threadID);
            if (nextChild = _resolve.child, context = _resolve.context, nextChild === null || nextChild === !1)
              return "";
            if (!React37.isValidElement(nextChild)) {
              if (nextChild != null && nextChild.$$typeof != null) {
                var $$typeof = nextChild.$$typeof;
                throw Error($$typeof === REACT_PORTAL_TYPE ? "Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render." : "Unknown element-like object type: " + $$typeof.toString() + ". This is likely a bug in React. Please file an issue.");
              }
              var nextChildren = toArray(nextChild), frame = {
                type: null,
                domNamespace: parentNamespace,
                children: nextChildren,
                childIndex: 0,
                context,
                footer: ""
              };
              return frame.debugElementStack = [], this.stack.push(frame), "";
            }
            var nextElement = nextChild, elementType = nextElement.type;
            if (typeof elementType == "string")
              return this.renderDOM(nextElement, context, parentNamespace);
            switch (elementType) {
              case REACT_LEGACY_HIDDEN_TYPE:
              case REACT_DEBUG_TRACING_MODE_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_SUSPENSE_LIST_TYPE:
              case REACT_FRAGMENT_TYPE: {
                var _nextChildren = toArray(nextChild.props.children), _frame = {
                  type: null,
                  domNamespace: parentNamespace,
                  children: _nextChildren,
                  childIndex: 0,
                  context,
                  footer: ""
                };
                return _frame.debugElementStack = [], this.stack.push(_frame), "";
              }
              case REACT_SUSPENSE_TYPE:
                throw Error("ReactDOMServer does not yet support Suspense.");
              case REACT_SCOPE_TYPE:
                throw Error("ReactDOMServer does not yet support scope components.");
            }
            if (typeof elementType == "object" && elementType !== null)
              switch (elementType.$$typeof) {
                case REACT_FORWARD_REF_TYPE: {
                  var element = nextChild, _nextChildren5, componentIdentity = {};
                  prepareToUseHooks(componentIdentity), _nextChildren5 = elementType.render(element.props, element.ref), _nextChildren5 = finishHooks(elementType.render, element.props, _nextChildren5, element.ref), _nextChildren5 = toArray(_nextChildren5);
                  var _frame5 = {
                    type: null,
                    domNamespace: parentNamespace,
                    children: _nextChildren5,
                    childIndex: 0,
                    context,
                    footer: ""
                  };
                  return _frame5.debugElementStack = [], this.stack.push(_frame5), "";
                }
                case REACT_MEMO_TYPE: {
                  var _element = nextChild, _nextChildren6 = [React37.createElement(elementType.type, _assign({
                    ref: _element.ref
                  }, _element.props))], _frame6 = {
                    type: null,
                    domNamespace: parentNamespace,
                    children: _nextChildren6,
                    childIndex: 0,
                    context,
                    footer: ""
                  };
                  return _frame6.debugElementStack = [], this.stack.push(_frame6), "";
                }
                case REACT_PROVIDER_TYPE: {
                  var provider = nextChild, nextProps = provider.props, _nextChildren7 = toArray(nextProps.children), _frame7 = {
                    type: provider,
                    domNamespace: parentNamespace,
                    children: _nextChildren7,
                    childIndex: 0,
                    context,
                    footer: ""
                  };
                  return _frame7.debugElementStack = [], this.pushProvider(provider), this.stack.push(_frame7), "";
                }
                case REACT_CONTEXT_TYPE: {
                  var reactContext = nextChild.type;
                  reactContext._context === void 0 ? reactContext !== reactContext.Consumer && (hasWarnedAboutUsingContextAsConsumer || (hasWarnedAboutUsingContextAsConsumer = !0, error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : reactContext = reactContext._context;
                  var _nextProps = nextChild.props, threadID = this.threadID;
                  validateContextBounds(reactContext, threadID);
                  var nextValue = reactContext[threadID], _nextChildren8 = toArray(_nextProps.children(nextValue)), _frame8 = {
                    type: nextChild,
                    domNamespace: parentNamespace,
                    children: _nextChildren8,
                    childIndex: 0,
                    context,
                    footer: ""
                  };
                  return _frame8.debugElementStack = [], this.stack.push(_frame8), "";
                }
                case REACT_FUNDAMENTAL_TYPE:
                  throw Error("ReactDOMServer does not yet support the fundamental API.");
                case REACT_LAZY_TYPE: {
                  var _element2 = nextChild, lazyComponent = nextChild.type, payload = lazyComponent._payload, init2 = lazyComponent._init, result = init2(payload), _nextChildren10 = [React37.createElement(result, _assign({
                    ref: _element2.ref
                  }, _element2.props))], _frame10 = {
                    type: null,
                    domNamespace: parentNamespace,
                    children: _nextChildren10,
                    childIndex: 0,
                    context,
                    footer: ""
                  };
                  return _frame10.debugElementStack = [], this.stack.push(_frame10), "";
                }
              }
            var info = "";
            {
              var owner = nextElement._owner;
              (elementType === void 0 || typeof elementType == "object" && elementType !== null && Object.keys(elementType).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var ownerName = owner ? getComponentName(owner) : null;
              ownerName && (info += `

Check the render method of \`` + ownerName + "`.");
            }
            throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (elementType == null ? elementType : typeof elementType) + "." + info);
          }
        }, _proto.renderDOM = function(element, context, parentNamespace) {
          var tag = element.type.toLowerCase(), namespace = parentNamespace;
          parentNamespace === Namespaces.html && (namespace = getIntrinsicNamespace(tag)), namespace === Namespaces.html && tag !== element.type && error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", element.type), validateDangerousTag(tag);
          var props = element.props;
          if (tag === "input")
            checkControlledValueProps("input", props), props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked && (error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type), didWarnDefaultChecked = !0), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue && (error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type), didWarnDefaultInputValue = !0), props = _assign({
              type: void 0
            }, props, {
              defaultChecked: void 0,
              defaultValue: void 0,
              value: props.value != null ? props.value : props.defaultValue,
              checked: props.checked != null ? props.checked : props.defaultChecked
            });
          else if (tag === "textarea") {
            checkControlledValueProps("textarea", props), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue && (error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components"), didWarnDefaultTextareaValue = !0);
            var initialValue = props.value;
            if (initialValue == null) {
              var defaultValue = props.defaultValue, textareaChildren = props.children;
              if (textareaChildren != null) {
                if (error("Use the `defaultValue` or `value` props instead of setting children on <textarea>."), defaultValue != null)
                  throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
                if (Array.isArray(textareaChildren)) {
                  if (!(textareaChildren.length <= 1))
                    throw Error("<textarea> can only have at most one child.");
                  textareaChildren = textareaChildren[0];
                }
                defaultValue = "" + textareaChildren;
              }
              defaultValue == null && (defaultValue = ""), initialValue = defaultValue;
            }
            props = _assign({}, props, {
              value: void 0,
              children: "" + initialValue
            });
          } else if (tag === "select") {
            {
              checkControlledValueProps("select", props);
              for (var i2 = 0; i2 < valuePropNames.length; i2++) {
                var propName = valuePropNames[i2];
                if (props[propName] != null) {
                  var isArray3 = Array.isArray(props[propName]);
                  props.multiple && !isArray3 ? error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName) : !props.multiple && isArray3 && error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
                }
              }
              props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue && (error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), didWarnDefaultSelectValue = !0);
            }
            this.currentSelectValue = props.value != null ? props.value : props.defaultValue, props = _assign({}, props, {
              value: void 0
            });
          } else if (tag === "option") {
            var selected = null, selectValue = this.currentSelectValue, optionChildren = flattenOptionChildren(props.children);
            if (selectValue != null) {
              var value;
              if (props.value != null ? value = props.value + "" : value = optionChildren, selected = !1, Array.isArray(selectValue)) {
                for (var j = 0; j < selectValue.length; j++)
                  if ("" + selectValue[j] === value) {
                    selected = !0;
                    break;
                  }
              } else
                selected = "" + selectValue === value;
              props = _assign({
                selected: void 0,
                children: void 0
              }, props, {
                selected,
                children: optionChildren
              });
            }
          }
          validatePropertiesInDevelopment(tag, props), assertValidProps(tag, props);
          var out = createOpenTagMarkup(element.type, tag, props, namespace, this.makeStaticMarkup, this.stack.length === 1), footer = "";
          omittedCloseTags.hasOwnProperty(tag) ? out += "/>" : (out += ">", footer = "</" + element.type + ">");
          var children, innerMarkup = getNonChildrenInnerMarkup(props);
          innerMarkup != null ? (children = [], newlineEatingTags.hasOwnProperty(tag) && innerMarkup.charAt(0) === `
` && (out += `
`), out += innerMarkup) : children = toArray(props.children);
          var frame = {
            domNamespace: getChildNamespace(parentNamespace, element.type),
            type: tag,
            children,
            childIndex: 0,
            context,
            footer
          };
          return frame.debugElementStack = [], this.stack.push(frame), this.previousWasTextNode = !1, out;
        }, ReactDOMServerRenderer2;
      }();
      function renderToString2(element, options) {
        var renderer = new ReactDOMServerRenderer(element, !1, options);
        try {
          var markup = renderer.read(1 / 0);
          return markup;
        } finally {
          renderer.destroy();
        }
      }
      function renderToStaticMarkup(element, options) {
        var renderer = new ReactDOMServerRenderer(element, !0, options);
        try {
          var markup = renderer.read(1 / 0);
          return markup;
        } finally {
          renderer.destroy();
        }
      }
      function _inheritsLoose2(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype), subClass.prototype.constructor = subClass, subClass.__proto__ = superClass;
      }
      var ReactMarkupReadableStream = /* @__PURE__ */ function(_Readable) {
        _inheritsLoose2(ReactMarkupReadableStream2, _Readable);
        function ReactMarkupReadableStream2(element, makeStaticMarkup, options) {
          var _this;
          return _this = _Readable.call(this, {}) || this, _this.partialRenderer = new ReactDOMServerRenderer(element, makeStaticMarkup, options), _this;
        }
        var _proto = ReactMarkupReadableStream2.prototype;
        return _proto._destroy = function(err, callback) {
          this.partialRenderer.destroy(), callback(err);
        }, _proto._read = function(size) {
          try {
            this.push(this.partialRenderer.read(size));
          } catch (err) {
            this.destroy(err);
          }
        }, ReactMarkupReadableStream2;
      }(stream.Readable);
      function renderToNodeStream(element, options) {
        return new ReactMarkupReadableStream(element, !1, options);
      }
      function renderToStaticNodeStream(element, options) {
        return new ReactMarkupReadableStream(element, !0, options);
      }
      exports.renderToNodeStream = renderToNodeStream, exports.renderToStaticMarkup = renderToStaticMarkup, exports.renderToStaticNodeStream = renderToStaticNodeStream, exports.renderToString = renderToString2, exports.version = ReactVersion;
    })();
  }
});

// node_modules/react-dom/server.node.js
var require_server_node = __commonJS({
  "node_modules/react-dom/server.node.js"(exports, module) {
    "use strict";
    module.exports = require_react_dom_server_node_development();
  }
});

// node_modules/react-dom/server.js
var require_server = __commonJS({
  "node_modules/react-dom/server.js"(exports, module) {
    "use strict";
    module.exports = require_server_node();
  }
});

// node_modules/react-router/dist/index.js
function _extends2() {
  return _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends2.apply(this, arguments);
}
function isPolyfill(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
}
function useSyncExternalStore$2(subscribe, getSnapshot, getServerSnapshot) {
  didWarnOld18Alpha || "startTransition" in React && (didWarnOld18Alpha = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
  let value = getSnapshot();
  if (!didWarnUncachedGetSnapshot) {
    let cachedValue = getSnapshot();
    is(value, cachedValue) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0);
  }
  let [{
    inst
  }, forceUpdate] = useState2({
    inst: {
      value,
      getSnapshot
    }
  });
  return useLayoutEffect2(() => {
    inst.value = value, inst.getSnapshot = getSnapshot, checkIfSnapshotChanged(inst) && forceUpdate({
      inst
    });
  }, [subscribe, value, getSnapshot]), useEffect2(() => (checkIfSnapshotChanged(inst) && forceUpdate({
    inst
  }), subscribe(() => {
    checkIfSnapshotChanged(inst) && forceUpdate({
      inst
    });
  })), [subscribe]), useDebugValue(value), value;
}
function checkIfSnapshotChanged(inst) {
  let latestGetSnapshot = inst.getSnapshot, prevValue = inst.value;
  try {
    let nextValue = latestGetSnapshot();
    return !is(prevValue, nextValue);
  } catch {
    return !0;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  return getSnapshot();
}
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  useInRouterContext() || invariant(
    !1,
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename,
    navigator
  } = React.useContext(NavigationContext), {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  }), joinedPathname = pathname;
  return basename !== "/" && (joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname])), navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return React.useContext(LocationContext) != null;
}
function useLocation() {
  return useInRouterContext() || invariant(
    !1,
    "useLocation() may be used only in the context of a <Router> component."
  ), React.useContext(LocationContext).location;
}
function useNavigationType() {
  return React.useContext(LocationContext).navigationType;
}
function useMatch(pattern) {
  useInRouterContext() || invariant(
    !1,
    "useMatch() may be used only in the context of a <Router> component."
  );
  let {
    pathname
  } = useLocation();
  return React.useMemo(() => matchPath(pattern, pathname), [pathname, pattern]);
}
function useNavigate() {
  useInRouterContext() || invariant(
    !1,
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let {
    basename,
    navigator
  } = React.useContext(NavigationContext), {
    matches
  } = React.useContext(RouteContext), {
    pathname: locationPathname
  } = useLocation(), routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase)), activeRef = React.useRef(!1);
  return React.useEffect(() => {
    activeRef.current = !0;
  }), React.useCallback(function(to, options) {
    if (options === void 0 && (options = {}), warning(activeRef.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !activeRef.current)
      return;
    if (typeof to == "number") {
      navigator.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    basename !== "/" && (path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname])), (options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname]);
}
function useOutletContext() {
  return React.useContext(OutletContext);
}
function useOutlet(context) {
  let outlet = React.useContext(RouteContext).outlet;
  return outlet && /* @__PURE__ */ React.createElement(OutletContext.Provider, {
    value: context
  }, outlet);
}
function useParams() {
  let {
    matches
  } = React.useContext(RouteContext), routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2, {
    matches
  } = React.useContext(RouteContext), {
    pathname: locationPathname
  } = useLocation(), routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase));
  return React.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
function useRoutes(routes2, locationArg) {
  useInRouterContext() || invariant(
    !1,
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator
  } = React.useContext(NavigationContext), dataRouterStateContext = React.useContext(DataRouterStateContext), {
    matches: parentMatches
  } = React.useContext(RouteContext), routeMatch = parentMatches[parentMatches.length - 1], parentParams = routeMatch ? routeMatch.params : {}, parentPathname = routeMatch ? routeMatch.pathname : "/", parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/", parentRoute = routeMatch && routeMatch.route;
  {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + parentPathname + '" (under <Route path="' + parentPath + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + parentPath + '"> to <Route ') + ('path="' + (parentPath === "/" ? "*" : parentPath + "/*") + '">.'));
  }
  let locationFromContext = useLocation(), location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg == "string" ? parsePath(locationArg) : locationArg;
    parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase)) || invariant(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + parentPathnameBase + '" ') + ('but pathname "' + parsedLocationArg.pathname + '" was given in the `location` prop.')), location = parsedLocationArg;
  } else
    location = locationFromContext;
  let pathname = location.pathname || "/", remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/", matches = matchRoutes(routes2, {
    pathname: remainingPathname
  });
  warning(parentRoute || matches != null, 'No routes matched location "' + location.pathname + location.search + location.hash + '" '), warning(matches == null || matches[matches.length - 1].route.element !== void 0, 'Matched leaf route at location "' + location.pathname + location.search + location.hash + '" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterStateContext || void 0);
  return locationArg && renderedMatches ? /* @__PURE__ */ React.createElement(LocationContext.Provider, {
    value: {
      location: _extends2({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, location),
      navigationType: Action.Pop
    }
  }, renderedMatches) : renderedMatches;
}
function DefaultErrorElement() {
  let error = useRouteError(), message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error), stack = error instanceof Error ? error.stack : null, lightgrey = "rgba(200,200,200, 0.5)", preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  }, codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  }, devInfo = null;
  return devInfo = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ React.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own\xA0", /* @__PURE__ */ React.createElement("code", {
    style: codeStyles
  }, "errorElement"), " props on\xA0", /* @__PURE__ */ React.createElement("code", {
    style: codeStyles
  }, "<Route>"))), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ React.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref, dataRouterContext = React.useContext(DataRouterContext);
  return dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && match.route.errorElement && (dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id), /* @__PURE__ */ React.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState) {
  if (parentMatches === void 0 && (parentMatches = []), matches == null)
    if (dataRouterState != null && dataRouterState.errors)
      matches = dataRouterState.matches;
    else
      return null;
  let renderedMatches = matches, errors = dataRouterState == null ? void 0 : dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]));
    errorIndex >= 0 || invariant(!1, "Could not find a matching route for the current errors: " + errors), renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null, errorElement = dataRouterState ? match.route.errorElement || /* @__PURE__ */ React.createElement(DefaultErrorElement, null) : null, matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1)), getChildren = () => /* @__PURE__ */ React.createElement(RenderedRoute, {
      match,
      routeContext: {
        outlet,
        matches: matches2
      }
    }, error ? errorElement : match.route.element !== void 0 ? match.route.element : outlet);
    return dataRouterState && (match.route.errorElement || index === 0) ? /* @__PURE__ */ React.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2
      }
    }) : getChildren();
  }, null);
}
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = React.useContext(DataRouterContext);
  return ctx || invariant(!1, getDataRouterConsoleError(hookName)), ctx;
}
function useDataRouterState(hookName) {
  let state = React.useContext(DataRouterStateContext);
  return state || invariant(!1, getDataRouterConsoleError(hookName)), state;
}
function useRouteContext(hookName) {
  let route = React.useContext(RouteContext);
  return route || invariant(!1, getDataRouterConsoleError(hookName)), route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName), thisRoute = route.matches[route.matches.length - 1];
  return thisRoute.route.id || invariant(!1, hookName + ' can only be used on routes that contain a unique "id"'), thisRoute.route.id;
}
function useNavigation() {
  return useDataRouterState(DataRouterStateHook.UseNavigation).navigation;
}
function useRevalidator() {
  let dataRouterContext = useDataRouterContext(DataRouterHook.UseRevalidator), state = useDataRouterState(DataRouterStateHook.UseRevalidator);
  return {
    revalidate: dataRouterContext.router.revalidate,
    state: state.revalidation
  };
}
function useMatches() {
  let {
    matches,
    loaderData
  } = useDataRouterState(DataRouterStateHook.UseMatches);
  return React.useMemo(() => matches.map((match) => {
    let {
      pathname,
      params
    } = match;
    return {
      id: match.route.id,
      pathname,
      params,
      data: loaderData[match.route.id],
      handle: match.route.handle
    };
  }), [matches, loaderData]);
}
function useLoaderData() {
  let state = useDataRouterState(DataRouterStateHook.UseLoaderData), routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);
  if (state.errors && state.errors[routeId] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
    return;
  }
  return state.loaderData[routeId];
}
function useRouteLoaderData(routeId) {
  return useDataRouterState(DataRouterStateHook.UseRouteLoaderData).loaderData[routeId];
}
function useActionData() {
  let state = useDataRouterState(DataRouterStateHook.UseActionData);
  return React.useContext(RouteContext) || invariant(!1, "useActionData must be used inside a RouteContext"), Object.values((state == null ? void 0 : state.actionData) || {})[0];
}
function useRouteError() {
  var _state$errors;
  let error = React.useContext(RouteErrorContext), state = useDataRouterState(DataRouterStateHook.UseRouteError), routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError);
  return error || ((_state$errors = state.errors) == null ? void 0 : _state$errors[routeId]);
}
function useAsyncValue() {
  let value = React.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}
function useAsyncError() {
  let value = React.useContext(AwaitContext);
  return value == null ? void 0 : value._error;
}
function useBlocker(shouldBlock) {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseBlocker), blockerFunction = React.useCallback((args) => typeof shouldBlock == "function" ? !!shouldBlock(args) : !!shouldBlock, [shouldBlock]), blocker = router.getBlocker(blockerKey, blockerFunction);
  return React.useEffect(() => () => router.deleteBlocker(blockerKey), [router]), blocker;
}
function warningOnce(key, cond, message) {
  !cond && !alreadyWarned2[key] && (alreadyWarned2[key] = !0, warning(!1, message));
}
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router
  } = _ref, state = useSyncExternalStore(
    router.subscribe,
    () => router.state,
    () => router.state
  ), navigator = React.useMemo(() => ({
    createHref: router.createHref,
    encodeLocation: router.encodeLocation,
    go: (n) => router.navigate(n),
    push: (to, state2, opts) => router.navigate(to, {
      state: state2,
      preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
    }),
    replace: (to, state2, opts) => router.navigate(to, {
      replace: !0,
      state: state2,
      preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
    })
  }), [router]), basename = router.basename || "/";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DataRouterContext.Provider, {
    value: {
      router,
      navigator,
      static: !1,
      basename
    }
  }, /* @__PURE__ */ React.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /* @__PURE__ */ React.createElement(Router, {
    basename: router.basename,
    location: router.state.location,
    navigationType: router.state.historyAction,
    navigator
  }, router.state.initialized ? /* @__PURE__ */ React.createElement(Routes, null) : fallbackElement))), null);
}
function MemoryRouter(_ref2) {
  let {
    basename,
    children,
    initialEntries,
    initialIndex
  } = _ref2, historyRef = React.useRef();
  historyRef.current == null && (historyRef.current = createMemoryHistory({
    initialEntries,
    initialIndex,
    v5Compat: !0
  }));
  let history = historyRef.current, [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });
  return React.useLayoutEffect(() => history.listen(setState), [history]), /* @__PURE__ */ React.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function Navigate(_ref3) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref3;
  useInRouterContext() || invariant(
    !1,
    "<Navigate> may be used only in the context of a <Router> component."
  ), warning(!React.useContext(NavigationContext).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let dataRouterState = React.useContext(DataRouterStateContext), navigate = useNavigate();
  return React.useEffect(() => {
    dataRouterState && dataRouterState.navigation.state !== "idle" || navigate(to, {
      replace,
      state,
      relative
    });
  }), null;
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Route(_props) {
  invariant(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function Router(_ref4) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator,
    static: staticProp = !1
  } = _ref4;
  useInRouterContext() && invariant(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let basename = basenameProp.replace(/^\/*/, "/"), navigationContext = React.useMemo(() => ({
    basename,
    navigator,
    static: staticProp
  }), [basename, navigator, staticProp]);
  typeof locationProp == "string" && (locationProp = parsePath(locationProp));
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp, location = React.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    return trailingPathname == null ? null : {
      pathname: trailingPathname,
      search,
      hash,
      state,
      key
    };
  }, [basename, pathname, search, hash, state, key]);
  return warning(location != null, '<Router basename="' + basename + '"> is not able to match the URL ' + ('"' + pathname + search + hash + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), location == null ? null : /* @__PURE__ */ React.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ React.createElement(LocationContext.Provider, {
    children,
    value: {
      location,
      navigationType
    }
  }));
}
function Routes(_ref5) {
  let {
    children,
    location
  } = _ref5, dataRouterContext = React.useContext(DataRouterContext), routes2 = dataRouterContext && !children ? dataRouterContext.router.routes : createRoutesFromChildren(children);
  return useRoutes(routes2, location);
}
function Await(_ref6) {
  let {
    children,
    errorElement,
    resolve
  } = _ref6;
  return /* @__PURE__ */ React.createElement(AwaitErrorBoundary, {
    resolve,
    errorElement
  }, /* @__PURE__ */ React.createElement(ResolveAwait, null, children));
}
function ResolveAwait(_ref7) {
  let {
    children
  } = _ref7, data = useAsyncValue(), toRender = typeof children == "function" ? children(data) : children;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, toRender);
}
function createRoutesFromChildren(children, parentPath) {
  parentPath === void 0 && (parentPath = []);
  let routes2 = [];
  return React.Children.forEach(children, (element, index) => {
    if (!/* @__PURE__ */ React.isValidElement(element))
      return;
    if (element.type === React.Fragment) {
      routes2.push.apply(routes2, createRoutesFromChildren(element.props.children, parentPath));
      return;
    }
    element.type !== Route && invariant(!1, "[" + (typeof element.type == "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !element.props.index || !element.props.children || invariant(!1, "An index route cannot have child routes.");
    let treePath = [...parentPath, index], route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      hasErrorBoundary: element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle
    };
    element.props.children && (route.children = createRoutesFromChildren(element.props.children, treePath)), routes2.push(route);
  }), routes2;
}
function renderMatches(matches) {
  return _renderMatches(matches);
}
function enhanceManualRouteObjects(routes2) {
  return routes2.map((route) => {
    let routeClone = _extends2({}, route);
    return routeClone.hasErrorBoundary == null && (routeClone.hasErrorBoundary = routeClone.errorElement != null), routeClone.children && (routeClone.children = enhanceManualRouteObjects(routeClone.children)), routeClone;
  });
}
function createMemoryRouter(routes2, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    history: createMemoryHistory({
      initialEntries: opts == null ? void 0 : opts.initialEntries,
      initialIndex: opts == null ? void 0 : opts.initialIndex
    }),
    hydrationData: opts == null ? void 0 : opts.hydrationData,
    routes: enhanceManualRouteObjects(routes2)
  }).initialize();
}
var React, is, useState2, useEffect2, useLayoutEffect2, useDebugValue, didWarnOld18Alpha, didWarnUncachedGetSnapshot, canUseDOM, isServerEnvironment, shim, useSyncExternalStore, DataRouterContext, DataRouterStateContext, AwaitContext, NavigationContext, LocationContext, RouteContext, RouteErrorContext, OutletContext, RenderErrorBoundary, DataRouterHook, DataRouterStateHook, blockerKey, alreadyWarned2, AwaitRenderStatus, neverSettledPromise, AwaitErrorBoundary, init_dist = __esm({
  "node_modules/react-router/dist/index.js"() {
    init_router();
    init_router();
    React = __toESM(require_react());
    is = typeof Object.is == "function" ? Object.is : isPolyfill, {
      useState: useState2,
      useEffect: useEffect2,
      useLayoutEffect: useLayoutEffect2,
      useDebugValue
    } = React, didWarnOld18Alpha = !1, didWarnUncachedGetSnapshot = !1;
    canUseDOM = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", isServerEnvironment = !canUseDOM, shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore$2, useSyncExternalStore = "useSyncExternalStore" in React ? ((module) => module.useSyncExternalStore)(React) : shim, DataRouterContext = /* @__PURE__ */ React.createContext(null);
    DataRouterContext.displayName = "DataRouter";
    DataRouterStateContext = /* @__PURE__ */ React.createContext(null);
    DataRouterStateContext.displayName = "DataRouterState";
    AwaitContext = /* @__PURE__ */ React.createContext(null);
    AwaitContext.displayName = "Await";
    NavigationContext = /* @__PURE__ */ React.createContext(null);
    NavigationContext.displayName = "Navigation";
    LocationContext = /* @__PURE__ */ React.createContext(null);
    LocationContext.displayName = "Location";
    RouteContext = /* @__PURE__ */ React.createContext({
      outlet: null,
      matches: []
    });
    RouteContext.displayName = "Route";
    RouteErrorContext = /* @__PURE__ */ React.createContext(null);
    RouteErrorContext.displayName = "RouteError";
    OutletContext = /* @__PURE__ */ React.createContext(null);
    RenderErrorBoundary = class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          location: props.location,
          error: props.error
        };
      }
      static getDerivedStateFromError(error) {
        return {
          error
        };
      }
      static getDerivedStateFromProps(props, state) {
        return state.location !== props.location ? {
          error: props.error,
          location: props.location
        } : {
          error: props.error || state.error,
          location: state.location
        };
      }
      componentDidCatch(error, errorInfo) {
        console.error("React Router caught the following error during render", error, errorInfo);
      }
      render() {
        return this.state.error ? /* @__PURE__ */ React.createElement(RouteContext.Provider, {
          value: this.props.routeContext
        }, /* @__PURE__ */ React.createElement(RouteErrorContext.Provider, {
          value: this.state.error,
          children: this.props.component
        })) : this.props.children;
      }
    };
    (function(DataRouterHook3) {
      DataRouterHook3.UseBlocker = "useBlocker", DataRouterHook3.UseRevalidator = "useRevalidator";
    })(DataRouterHook || (DataRouterHook = {}));
    (function(DataRouterStateHook3) {
      DataRouterStateHook3.UseLoaderData = "useLoaderData", DataRouterStateHook3.UseActionData = "useActionData", DataRouterStateHook3.UseRouteError = "useRouteError", DataRouterStateHook3.UseNavigation = "useNavigation", DataRouterStateHook3.UseRouteLoaderData = "useRouteLoaderData", DataRouterStateHook3.UseMatches = "useMatches", DataRouterStateHook3.UseRevalidator = "useRevalidator";
    })(DataRouterStateHook || (DataRouterStateHook = {}));
    blockerKey = "blocker-singleton";
    alreadyWarned2 = {};
    (function(AwaitRenderStatus2) {
      AwaitRenderStatus2[AwaitRenderStatus2.pending = 0] = "pending", AwaitRenderStatus2[AwaitRenderStatus2.success = 1] = "success", AwaitRenderStatus2[AwaitRenderStatus2.error = 2] = "error";
    })(AwaitRenderStatus || (AwaitRenderStatus = {}));
    neverSettledPromise = new Promise(() => {
    }), AwaitErrorBoundary = class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          error: null
        };
      }
      static getDerivedStateFromError(error) {
        return {
          error
        };
      }
      componentDidCatch(error, errorInfo) {
        console.error("<Await> caught the following error during render", error, errorInfo);
      }
      render() {
        let {
          children,
          errorElement,
          resolve
        } = this.props, promise = null, status = AwaitRenderStatus.pending;
        if (!(resolve instanceof Promise))
          status = AwaitRenderStatus.success, promise = Promise.resolve(), Object.defineProperty(promise, "_tracked", {
            get: () => !0
          }), Object.defineProperty(promise, "_data", {
            get: () => resolve
          });
        else if (this.state.error) {
          status = AwaitRenderStatus.error;
          let renderError = this.state.error;
          promise = Promise.reject().catch(() => {
          }), Object.defineProperty(promise, "_tracked", {
            get: () => !0
          }), Object.defineProperty(promise, "_error", {
            get: () => renderError
          });
        } else
          resolve._tracked ? (promise = resolve, status = promise._error !== void 0 ? AwaitRenderStatus.error : promise._data !== void 0 ? AwaitRenderStatus.success : AwaitRenderStatus.pending) : (status = AwaitRenderStatus.pending, Object.defineProperty(resolve, "_tracked", {
            get: () => !0
          }), promise = resolve.then((data) => Object.defineProperty(resolve, "_data", {
            get: () => data
          }), (error) => Object.defineProperty(resolve, "_error", {
            get: () => error
          })));
        if (status === AwaitRenderStatus.error && promise._error instanceof AbortedDeferredError)
          throw neverSettledPromise;
        if (status === AwaitRenderStatus.error && !errorElement)
          throw promise._error;
        if (status === AwaitRenderStatus.error)
          return /* @__PURE__ */ React.createElement(AwaitContext.Provider, {
            value: promise,
            children: errorElement
          });
        if (status === AwaitRenderStatus.success)
          return /* @__PURE__ */ React.createElement(AwaitContext.Provider, {
            value: promise,
            children
          });
        throw promise;
      }
    };
  }
});

// node_modules/react-router-dom/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  AbortedDeferredError: () => AbortedDeferredError,
  Await: () => Await,
  BrowserRouter: () => BrowserRouter,
  Form: () => Form,
  HashRouter: () => HashRouter,
  Link: () => Link,
  MemoryRouter: () => MemoryRouter,
  NavLink: () => NavLink,
  Navigate: () => Navigate,
  NavigationType: () => Action,
  Outlet: () => Outlet,
  Route: () => Route,
  Router: () => Router,
  RouterProvider: () => RouterProvider,
  Routes: () => Routes,
  ScrollRestoration: () => ScrollRestoration,
  UNSAFE_DataRouterContext: () => DataRouterContext,
  UNSAFE_DataRouterStateContext: () => DataRouterStateContext,
  UNSAFE_LocationContext: () => LocationContext,
  UNSAFE_NavigationContext: () => NavigationContext,
  UNSAFE_RouteContext: () => RouteContext,
  UNSAFE_enhanceManualRouteObjects: () => enhanceManualRouteObjects,
  UNSAFE_useScrollRestoration: () => useScrollRestoration,
  createBrowserRouter: () => createBrowserRouter,
  createHashRouter: () => createHashRouter,
  createMemoryRouter: () => createMemoryRouter,
  createPath: () => createPath,
  createRoutesFromChildren: () => createRoutesFromChildren,
  createRoutesFromElements: () => createRoutesFromChildren,
  createSearchParams: () => createSearchParams,
  defer: () => defer,
  generatePath: () => generatePath,
  isRouteErrorResponse: () => isRouteErrorResponse,
  json: () => json,
  matchPath: () => matchPath,
  matchRoutes: () => matchRoutes,
  parsePath: () => parsePath,
  redirect: () => redirect,
  renderMatches: () => renderMatches,
  resolvePath: () => resolvePath,
  unstable_HistoryRouter: () => HistoryRouter,
  unstable_useBlocker: () => useBlocker,
  unstable_usePrompt: () => usePrompt,
  useActionData: () => useActionData,
  useAsyncError: () => useAsyncError,
  useAsyncValue: () => useAsyncValue,
  useBeforeUnload: () => useBeforeUnload,
  useFetcher: () => useFetcher,
  useFetchers: () => useFetchers,
  useFormAction: () => useFormAction,
  useHref: () => useHref,
  useInRouterContext: () => useInRouterContext,
  useLinkClickHandler: () => useLinkClickHandler,
  useLoaderData: () => useLoaderData,
  useLocation: () => useLocation,
  useMatch: () => useMatch,
  useMatches: () => useMatches,
  useNavigate: () => useNavigate,
  useNavigation: () => useNavigation,
  useNavigationType: () => useNavigationType,
  useOutlet: () => useOutlet,
  useOutletContext: () => useOutletContext,
  useParams: () => useParams,
  useResolvedPath: () => useResolvedPath,
  useRevalidator: () => useRevalidator,
  useRouteError: () => useRouteError,
  useRouteLoaderData: () => useRouteLoaderData,
  useRoutes: () => useRoutes,
  useSearchParams: () => useSearchParams,
  useSubmit: () => useSubmit
});
function _extends3() {
  return _extends3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends3.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {}, sourceKeys = Object.keys(source), key, i;
  for (i = 0; i < sourceKeys.length; i++)
    key = sourceKeys[i], !(excluded.indexOf(key) >= 0) && (target[key] = source[key]);
  return target;
}
function isHtmlElement(object) {
  return object != null && typeof object.tagName == "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event);
}
function createSearchParams(init2) {
  return init2 === void 0 && (init2 = ""), new URLSearchParams(typeof init2 == "string" || Array.isArray(init2) || init2 instanceof URLSearchParams ? init2 : Object.keys(init2).reduce((memo2, key) => {
    let value = init2[key];
    return memo2.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams)
    for (let key of defaultSearchParams.keys())
      searchParams.has(key) || defaultSearchParams.getAll(key).forEach((value) => {
        searchParams.append(key, value);
      });
  return searchParams;
}
function getFormSubmissionInfo(target, defaultAction, options) {
  let method, action, encType, formData;
  if (isFormElement(target)) {
    let submissionTrigger = options.submissionTrigger;
    method = options.method || target.getAttribute("method") || defaultMethod, action = options.action || target.getAttribute("action") || defaultAction, encType = options.encType || target.getAttribute("enctype") || defaultEncType, formData = new FormData(target), submissionTrigger && submissionTrigger.name && formData.append(submissionTrigger.name, submissionTrigger.value);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    method = options.method || target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod, action = options.action || target.getAttribute("formaction") || form.getAttribute("action") || defaultAction, encType = options.encType || target.getAttribute("formenctype") || form.getAttribute("enctype") || defaultEncType, formData = new FormData(form), target.name && formData.append(target.name, target.value);
  } else {
    if (isHtmlElement(target))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (method = options.method || defaultMethod, action = options.action || defaultAction, encType = options.encType || defaultEncType, target instanceof FormData)
      formData = target;
    else if (formData = new FormData(), target instanceof URLSearchParams)
      for (let [name, value] of target)
        formData.append(name, value);
    else if (target != null)
      for (let name of Object.keys(target))
        formData.append(name, target[name]);
  }
  let {
    protocol,
    host
  } = window.location;
  return {
    url: new URL(action, protocol + "//" + host),
    method: method.toLowerCase(),
    encType,
    formData
  };
}
function createBrowserRouter(routes2, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    history: createBrowserHistory({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes: enhanceManualRouteObjects(routes2)
  }).initialize();
}
function createHashRouter(routes2, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    history: createHashHistory({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes: enhanceManualRouteObjects(routes2)
  }).initialize();
}
function parseHydrationData() {
  var _window;
  let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
  return state && state.errors && (state = _extends3({}, state, {
    errors: deserializeErrors(state.errors)
  })), state;
}
function deserializeErrors(errors) {
  if (!errors)
    return null;
  let entries = Object.entries(errors), serialized = {};
  for (let [key, val] of entries)
    if (val && val.__type === "RouteErrorResponse")
      serialized[key] = new ErrorResponse(val.status, val.statusText, val.data, val.internal === !0);
    else if (val && val.__type === "Error") {
      let error = new Error(val.message);
      error.stack = "", serialized[key] = error;
    } else
      serialized[key] = val;
  return serialized;
}
function BrowserRouter(_ref) {
  let {
    basename,
    children,
    window: window2
  } = _ref, historyRef = React2.useRef();
  historyRef.current == null && (historyRef.current = createBrowserHistory({
    window: window2,
    v5Compat: !0
  }));
  let history = historyRef.current, [state, setState] = React2.useState({
    action: history.action,
    location: history.location
  });
  return React2.useLayoutEffect(() => history.listen(setState), [history]), /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function HashRouter(_ref2) {
  let {
    basename,
    children,
    window: window2
  } = _ref2, historyRef = React2.useRef();
  historyRef.current == null && (historyRef.current = createHashHistory({
    window: window2,
    v5Compat: !0
  }));
  let history = historyRef.current, [state, setState] = React2.useState({
    action: history.action,
    location: history.location
  });
  return React2.useLayoutEffect(() => history.listen(setState), [history]), /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function HistoryRouter(_ref3) {
  let {
    basename,
    children,
    history
  } = _ref3, [state, setState] = React2.useState({
    action: history.action,
    location: history.location
  });
  return React2.useLayoutEffect(() => history.listen(setState), [history]), /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function ScrollRestoration(_ref7) {
  let {
    getKey,
    storageKey
  } = _ref7;
  return useScrollRestoration({
    getKey,
    storageKey
  }), null;
}
function getDataRouterConsoleError2(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function useDataRouterContext2(hookName) {
  let ctx = React2.useContext(DataRouterContext);
  return ctx || invariant(!1, getDataRouterConsoleError2(hookName)), ctx;
}
function useDataRouterState2(hookName) {
  let state = React2.useContext(DataRouterStateContext);
  return state || invariant(!1, getDataRouterConsoleError2(hookName)), state;
}
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative
  } = _temp === void 0 ? {} : _temp, navigate = useNavigate(), location = useLocation(), path = useResolvedPath(to, {
    relative
  });
  return React2.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative]);
}
function useSearchParams(defaultInit) {
  warning2(typeof URLSearchParams < "u", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.");
  let defaultSearchParamsRef = React2.useRef(createSearchParams(defaultInit)), hasSetSearchParamsRef = React2.useRef(!1), location = useLocation(), searchParams = React2.useMemo(() => getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current), [location.search]), navigate = useNavigate(), setSearchParams = React2.useCallback((nextInit, navigateOptions) => {
    let newSearchParams = createSearchParams(typeof nextInit == "function" ? nextInit(searchParams) : nextInit);
    hasSetSearchParamsRef.current = !0, navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
function useSubmit() {
  return useSubmitImpl();
}
function useSubmitImpl(fetcherKey, routeId) {
  let {
    router
  } = useDataRouterContext2(DataRouterHook2.UseSubmitImpl), defaultAction = useFormAction();
  return React2.useCallback(function(target, options) {
    if (options === void 0 && (options = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method,
      encType,
      formData,
      url
    } = getFormSubmissionInfo(target, defaultAction, options), href = url.pathname + url.search, opts = {
      replace: options.replace,
      preventScrollReset: options.preventScrollReset,
      formData,
      formMethod: method,
      formEncType: encType
    };
    fetcherKey ? (routeId == null && invariant(!1, "No routeId available for useFetcher()"), router.fetch(fetcherKey, routeId, href, opts)) : router.navigate(href, opts);
  }, [defaultAction, router, fetcherKey, routeId]);
}
function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2, {
    basename
  } = React2.useContext(NavigationContext), routeContext = React2.useContext(RouteContext);
  routeContext || invariant(!1, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1), path = _extends3({}, useResolvedPath(action || ".", {
    relative
  })), location = useLocation();
  if (action == null && (path.search = location.search, path.hash = location.hash, match.route.index)) {
    let params = new URLSearchParams(path.search);
    params.delete("index"), path.search = params.toString() ? "?" + params.toString() : "";
  }
  return (!action || action === ".") && match.route.index && (path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index"), basename !== "/" && (path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname])), createPath(path);
}
function createFetcherForm(fetcherKey, routeId) {
  let FetcherForm = /* @__PURE__ */ React2.forwardRef((props, ref) => /* @__PURE__ */ React2.createElement(FormImpl, _extends3({}, props, {
    ref,
    fetcherKey,
    routeId
  })));
  return FetcherForm.displayName = "fetcher.Form", FetcherForm;
}
function useFetcher() {
  var _route$matches;
  let {
    router
  } = useDataRouterContext2(DataRouterHook2.UseFetcher), route = React2.useContext(RouteContext);
  route || invariant(!1, "useFetcher must be used inside a RouteContext");
  let routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
  routeId == null && invariant(!1, 'useFetcher can only be used on routes that contain a unique "id"');
  let [fetcherKey] = React2.useState(() => String(++fetcherId)), [Form2] = React2.useState(() => (routeId || invariant(!1, "No routeId available for fetcher.Form()"), createFetcherForm(fetcherKey, routeId))), [load] = React2.useState(() => (href) => {
    router || invariant(!1, "No router available for fetcher.load()"), routeId || invariant(!1, "No routeId available for fetcher.load()"), router.fetch(fetcherKey, routeId, href);
  }), submit = useSubmitImpl(fetcherKey, routeId), fetcher = router.getFetcher(fetcherKey), fetcherWithComponents = React2.useMemo(() => _extends3({
    Form: Form2,
    submit,
    load
  }, fetcher), [fetcher, Form2, submit, load]);
  return React2.useEffect(() => () => {
    if (!router) {
      console.warn("No fetcher available to clean up from useFetcher()");
      return;
    }
    router.deleteFetcher(fetcherKey);
  }, [router, fetcherKey]), fetcherWithComponents;
}
function useFetchers() {
  return [...useDataRouterState2(DataRouterStateHook2.UseFetchers).fetchers.values()];
}
function useScrollRestoration(_temp3) {
  let {
    getKey,
    storageKey
  } = _temp3 === void 0 ? {} : _temp3, {
    router
  } = useDataRouterContext2(DataRouterHook2.UseScrollRestoration), {
    restoreScrollPosition,
    preventScrollReset
  } = useDataRouterState2(DataRouterStateHook2.UseScrollRestoration), location = useLocation(), matches = useMatches(), navigation = useNavigation();
  React2.useEffect(() => (window.history.scrollRestoration = "manual", () => {
    window.history.scrollRestoration = "auto";
  }), []), usePageHide(React2.useCallback(() => {
    if (navigation.state === "idle") {
      let key = (getKey ? getKey(location, matches) : null) || location.key;
      savedScrollPositions[key] = window.scrollY;
    }
    sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions)), window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location, matches])), typeof document < "u" && (React2.useLayoutEffect(() => {
    try {
      let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
      sessionPositions && (savedScrollPositions = JSON.parse(sessionPositions));
    } catch {
    }
  }, [storageKey]), React2.useLayoutEffect(() => {
    let disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKey);
    return () => disableScrollRestoration && disableScrollRestoration();
  }, [router, getKey]), React2.useLayoutEffect(() => {
    if (restoreScrollPosition !== !1) {
      if (typeof restoreScrollPosition == "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      if (location.hash) {
        let el = document.getElementById(location.hash.slice(1));
        if (el) {
          el.scrollIntoView();
          return;
        }
      }
      preventScrollReset !== !0 && window.scrollTo(0, 0);
    }
  }, [location, restoreScrollPosition, preventScrollReset]));
}
function useBeforeUnload(callback, options) {
  let {
    capture
  } = options || {};
  React2.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : void 0;
    return window.addEventListener("beforeunload", callback, opts), () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
function usePageHide(callback, options) {
  let {
    capture
  } = options || {};
  React2.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : void 0;
    return window.addEventListener("pagehide", callback, opts), () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
function usePrompt(_ref8) {
  let {
    when,
    message
  } = _ref8, blocker = useBlocker(when);
  React2.useEffect(() => {
    blocker.state === "blocked" && !when && blocker.reset();
  }, [blocker, when]), React2.useEffect(() => {
    blocker.state === "blocked" && (window.confirm(message) ? setTimeout(blocker.proceed, 0) : blocker.reset());
  }, [blocker, message]);
}
function warning2(cond, message) {
  if (!cond) {
    typeof console < "u" && console.warn(message);
    try {
      throw new Error(message);
    } catch {
    }
  }
}
var React2, defaultMethod, defaultEncType, _excluded, _excluded2, _excluded3, isBrowser2, Link, NavLink, Form, FormImpl, DataRouterHook2, DataRouterStateHook2, fetcherId, SCROLL_RESTORATION_STORAGE_KEY, savedScrollPositions, init_dist2 = __esm({
  "node_modules/react-router-dom/dist/index.js"() {
    React2 = __toESM(require_react());
    init_dist();
    init_dist();
    init_router();
    defaultMethod = "get", defaultEncType = "application/x-www-form-urlencoded";
    _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], _excluded3 = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative", "preventScrollReset"];
    HistoryRouter.displayName = "unstable_HistoryRouter";
    isBrowser2 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Link = /* @__PURE__ */ React2.forwardRef(function(_ref4, ref) {
      let {
        onClick,
        relative,
        reloadDocument,
        replace,
        state,
        target,
        to,
        preventScrollReset
      } = _ref4, rest = _objectWithoutPropertiesLoose(_ref4, _excluded), location = typeof to == "string" ? to : createPath(to), isAbsolute = /^[a-z+]+:\/\//i.test(location) || location.startsWith("//"), navigationLocation = location, isExternal = !1;
      if (isBrowser2 && isAbsolute) {
        let currentUrl = new URL(window.location.href), targetUrl = location.startsWith("//") ? new URL(currentUrl.protocol + location) : new URL(location);
        targetUrl.origin === currentUrl.origin ? navigationLocation = targetUrl.pathname + targetUrl.search + targetUrl.hash : isExternal = !0;
      }
      let href = useHref(navigationLocation, {
        relative
      }), internalOnClick = useLinkClickHandler(navigationLocation, {
        replace,
        state,
        target,
        preventScrollReset,
        relative
      });
      function handleClick(event) {
        onClick && onClick(event), event.defaultPrevented || internalOnClick(event);
      }
      return /* @__PURE__ */ React2.createElement("a", _extends3({}, rest, {
        href: isAbsolute ? location : href,
        onClick: isExternal || reloadDocument ? onClick : handleClick,
        ref,
        target
      }));
    });
    Link.displayName = "Link";
    NavLink = /* @__PURE__ */ React2.forwardRef(function(_ref5, ref) {
      let {
        "aria-current": ariaCurrentProp = "page",
        caseSensitive = !1,
        className: classNameProp = "",
        end = !1,
        style: styleProp,
        to,
        children
      } = _ref5, rest = _objectWithoutPropertiesLoose(_ref5, _excluded2), path = useResolvedPath(to, {
        relative: rest.relative
      }), location = useLocation(), routerState = React2.useContext(DataRouterStateContext), {
        navigator
      } = React2.useContext(NavigationContext), toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname, locationPathname = location.pathname, nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
      caseSensitive || (locationPathname = locationPathname.toLowerCase(), nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null, toPathname = toPathname.toLowerCase());
      let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/", isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/"), ariaCurrent = isActive ? ariaCurrentProp : void 0, className;
      typeof classNameProp == "function" ? className = classNameProp({
        isActive,
        isPending
      }) : className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null].filter(Boolean).join(" ");
      let style3 = typeof styleProp == "function" ? styleProp({
        isActive,
        isPending
      }) : styleProp;
      return /* @__PURE__ */ React2.createElement(Link, _extends3({}, rest, {
        "aria-current": ariaCurrent,
        className,
        ref,
        style: style3,
        to
      }), typeof children == "function" ? children({
        isActive,
        isPending
      }) : children);
    });
    NavLink.displayName = "NavLink";
    Form = /* @__PURE__ */ React2.forwardRef((props, ref) => /* @__PURE__ */ React2.createElement(FormImpl, _extends3({}, props, {
      ref
    })));
    Form.displayName = "Form";
    FormImpl = /* @__PURE__ */ React2.forwardRef((_ref6, forwardedRef) => {
      let {
        reloadDocument,
        replace,
        method = defaultMethod,
        action,
        onSubmit,
        fetcherKey,
        routeId,
        relative,
        preventScrollReset
      } = _ref6, props = _objectWithoutPropertiesLoose(_ref6, _excluded3), submit = useSubmitImpl(fetcherKey, routeId), formMethod = method.toLowerCase() === "get" ? "get" : "post", formAction = useFormAction(action, {
        relative
      });
      return /* @__PURE__ */ React2.createElement("form", _extends3({
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : (event) => {
          if (onSubmit && onSubmit(event), event.defaultPrevented)
            return;
          event.preventDefault();
          let submitter = event.nativeEvent.submitter, submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
          submit(submitter || event.currentTarget, {
            method: submitMethod,
            replace,
            relative,
            preventScrollReset
          });
        }
      }, props));
    });
    FormImpl.displayName = "FormImpl";
    ScrollRestoration.displayName = "ScrollRestoration";
    (function(DataRouterHook3) {
      DataRouterHook3.UseScrollRestoration = "useScrollRestoration", DataRouterHook3.UseSubmitImpl = "useSubmitImpl", DataRouterHook3.UseFetcher = "useFetcher";
    })(DataRouterHook2 || (DataRouterHook2 = {}));
    (function(DataRouterStateHook3) {
      DataRouterStateHook3.UseFetchers = "useFetchers", DataRouterStateHook3.UseScrollRestoration = "useScrollRestoration";
    })(DataRouterStateHook2 || (DataRouterStateHook2 = {}));
    fetcherId = 0;
    SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions", savedScrollPositions = {};
  }
});

// node_modules/react-router-dom/server.js
var require_server2 = __commonJS({
  "node_modules/react-router-dom/server.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var React37 = require_react(), router = (init_router(), __toCommonJS(router_exports)), reactRouterDom = (init_dist2(), __toCommonJS(dist_exports));
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      return e && Object.keys(e).forEach(function(k) {
        if (k !== "default") {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: !0,
            get: function() {
              return e[k];
            }
          });
        }
      }), n.default = e, Object.freeze(n);
    }
    var React__namespace = /* @__PURE__ */ _interopNamespace(React37);
    function StaticRouter({
      basename,
      children,
      location: locationProp = "/"
    }) {
      typeof locationProp == "string" && (locationProp = reactRouterDom.parsePath(locationProp));
      let action = router.Action.Pop, location = {
        pathname: locationProp.pathname || "/",
        search: locationProp.search || "",
        hash: locationProp.hash || "",
        state: locationProp.state || null,
        key: locationProp.key || "default"
      }, staticNavigator = getStatelessNavigator();
      return /* @__PURE__ */ React__namespace.createElement(reactRouterDom.Router, {
        basename,
        children,
        location,
        navigationType: action,
        navigator: staticNavigator,
        static: !0
      });
    }
    function StaticRouterProvider2({
      context,
      router: router$1,
      hydrate = !0,
      nonce
    }) {
      router$1 && context || router.invariant(!1, "You must provide `router` and `context` to <StaticRouterProvider>");
      let dataRouterContext = {
        router: router$1,
        navigator: getStatelessNavigator(),
        static: !0,
        staticContext: context,
        basename: context.basename || "/"
      }, hydrateScript = "";
      if (hydrate !== !1) {
        let data = {
          loaderData: context.loaderData,
          actionData: context.actionData,
          errors: serializeErrors2(context.errors)
        };
        hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${JSON.stringify(JSON.stringify(data))});`;
      }
      return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_DataRouterContext.Provider, {
        value: dataRouterContext
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_DataRouterStateContext.Provider, {
        value: dataRouterContext.router.state
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.Router, {
        basename: dataRouterContext.basename,
        location: dataRouterContext.router.state.location,
        navigationType: dataRouterContext.router.state.historyAction,
        navigator: dataRouterContext.navigator
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.Routes, null)))), hydrateScript ? /* @__PURE__ */ React__namespace.createElement("script", {
        suppressHydrationWarning: !0,
        nonce,
        dangerouslySetInnerHTML: {
          __html: hydrateScript
        }
      }) : null);
    }
    function serializeErrors2(errors) {
      if (!errors)
        return null;
      let entries = Object.entries(errors), serialized = {};
      for (let [key, val] of entries)
        router.isRouteErrorResponse(val) ? serialized[key] = {
          ...val,
          __type: "RouteErrorResponse"
        } : val instanceof Error ? serialized[key] = {
          message: val.message,
          __type: "Error"
        } : serialized[key] = val;
      return serialized;
    }
    function getStatelessNavigator() {
      return {
        createHref,
        encodeLocation,
        push(to) {
          throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
        },
        replace(to) {
          throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
        },
        go(delta) {
          throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
        },
        back() {
          throw new Error("You cannot use navigator.back() on the server because it is a stateless environment.");
        },
        forward() {
          throw new Error("You cannot use navigator.forward() on the server because it is a stateless environment.");
        }
      };
    }
    function generateManifest(routes2, manifest = /* @__PURE__ */ new Map()) {
      return routes2.forEach((route) => {
        manifest.set(route.id, route), route.children && generateManifest(route.children, manifest);
      }), manifest;
    }
    function createStaticRouter2(routes2, context) {
      let dataRoutes = router.UNSAFE_convertRoutesToDataRoutes(reactRouterDom.UNSAFE_enhanceManualRouteObjects(routes2)), manifest = generateManifest(dataRoutes), matches = context.matches.map((match) => {
        let route = manifest.get(match.route.id) || match.route;
        return {
          ...match,
          route
        };
      }), msg = (method) => `You cannot use router.${method}() on the server because it is a stateless environment`;
      return {
        get basename() {
          return context.basename;
        },
        get state() {
          return {
            historyAction: router.Action.Pop,
            location: context.location,
            matches,
            loaderData: context.loaderData,
            actionData: context.actionData,
            errors: context.errors,
            initialized: !0,
            navigation: router.IDLE_NAVIGATION,
            restoreScrollPosition: null,
            preventScrollReset: !1,
            revalidation: "idle",
            fetchers: /* @__PURE__ */ new Map(),
            blockers: /* @__PURE__ */ new Map()
          };
        },
        get routes() {
          return dataRoutes;
        },
        initialize() {
          throw msg("initialize");
        },
        subscribe() {
          throw msg("subscribe");
        },
        enableScrollRestoration() {
          throw msg("enableScrollRestoration");
        },
        navigate() {
          throw msg("navigate");
        },
        fetch() {
          throw msg("fetch");
        },
        revalidate() {
          throw msg("revalidate");
        },
        createHref,
        encodeLocation,
        getFetcher() {
          return router.IDLE_FETCHER;
        },
        deleteFetcher() {
          throw msg("deleteFetcher");
        },
        dispose() {
          throw msg("dispose");
        },
        getBlocker() {
          throw msg("getBlocker");
        },
        deleteBlocker() {
          throw msg("deleteBlocker");
        },
        _internalFetchControllers: /* @__PURE__ */ new Map(),
        _internalActiveDeferreds: /* @__PURE__ */ new Map()
      };
    }
    function createHref(to) {
      return typeof to == "string" ? to : reactRouterDom.createPath(to);
    }
    function encodeLocation(to) {
      let path = typeof to == "string" ? reactRouterDom.parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    }
    exports.StaticRouter = StaticRouter;
    exports.StaticRouterProvider = StaticRouterProvider2;
    exports.createStaticRouter = createStaticRouter2;
  }
});

// node_modules/react/cjs/react-jsx-dev-runtime.development.js
var require_react_jsx_dev_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-dev-runtime.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var React37 = require_react(), _assign = require_object_assign(), REACT_ELEMENT_TYPE = 60103, REACT_PORTAL_TYPE = 60106;
      exports.Fragment = 60107;
      var REACT_STRICT_MODE_TYPE = 60108, REACT_PROFILER_TYPE = 60114, REACT_PROVIDER_TYPE = 60109, REACT_CONTEXT_TYPE = 60110, REACT_FORWARD_REF_TYPE = 60112, REACT_SUSPENSE_TYPE = 60113, REACT_SUSPENSE_LIST_TYPE = 60120, REACT_MEMO_TYPE = 60115, REACT_LAZY_TYPE = 60116, REACT_BLOCK_TYPE = 60121, REACT_SERVER_BLOCK_TYPE = 60122, REACT_FUNDAMENTAL_TYPE = 60117, REACT_SCOPE_TYPE = 60119, REACT_OPAQUE_ID_TYPE = 60128, REACT_DEBUG_TRACING_MODE_TYPE = 60129, REACT_OFFSCREEN_TYPE = 60130, REACT_LEGACY_HIDDEN_TYPE = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var symbolFor = Symbol.for;
        REACT_ELEMENT_TYPE = symbolFor("react.element"), REACT_PORTAL_TYPE = symbolFor("react.portal"), exports.Fragment = symbolFor("react.fragment"), REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode"), REACT_PROFILER_TYPE = symbolFor("react.profiler"), REACT_PROVIDER_TYPE = symbolFor("react.provider"), REACT_CONTEXT_TYPE = symbolFor("react.context"), REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref"), REACT_SUSPENSE_TYPE = symbolFor("react.suspense"), REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list"), REACT_MEMO_TYPE = symbolFor("react.memo"), REACT_LAZY_TYPE = symbolFor("react.lazy"), REACT_BLOCK_TYPE = symbolFor("react.block"), REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block"), REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental"), REACT_SCOPE_TYPE = symbolFor("react.scope"), REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id"), REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode"), REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen"), REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
      }
      var MAYBE_ITERATOR_SYMBOL = typeof Symbol == "function" && Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable != "object")
          return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        return typeof maybeIterator == "function" ? maybeIterator : null;
      }
      var ReactSharedInternals = React37.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format2) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format2, args);
        }
      }
      function printWarning(level, format2, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format2 += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return "" + item;
          });
          argsWithFormat.unshift("Warning: " + format2), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = !1;
      function isValidElementType(type) {
        return !!(typeof type == "string" || typeof type == "function" || type === exports.Fragment || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE));
      }
      function getWrappedName2(outerType, innerType, wrapperName) {
        var functionName = innerType.displayName || innerType.name || "";
        return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentName(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case exports.Fragment:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName2(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              return getComponentName(type.type);
            case REACT_BLOCK_TYPE:
              return getComponentName(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return getComponentName(init2(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = !0;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: !0,
              enumerable: !0,
              value: disabledLog,
              writable: !0
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: _assign({}, props, {
                value: prevLog
              }),
              info: _assign({}, props, {
                value: prevInfo
              }),
              warn: _assign({}, props, {
                value: prevWarn
              }),
              error: _assign({}, props, {
                value: prevError
              }),
              group: _assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: _assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: _assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = !1, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = !0;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher.current, ReactCurrentDispatcher.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = !1, ReactCurrentDispatcher.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, !1);
      }
      function shouldConstruct(Component2) {
        var prototype = Component2.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_BLOCK_TYPE:
              return describeFunctionComponentFrame(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init2(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var loggedTypeFailures = {}, ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values3, location, componentName, element) {
        {
          var has = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values3, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = !0, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner, hasOwnProperty2 = Object.prototype.hasOwnProperty, RESERVED_PROPS = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
      didWarnAboutStringRefs = {};
      function hasValidRef(config2) {
        if (hasOwnProperty2.call(config2, "ref")) {
          var getter = Object.getOwnPropertyDescriptor(config2, "ref").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config2.ref !== void 0;
      }
      function hasValidKey(config2) {
        if (hasOwnProperty2.call(config2, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config2, "key").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config2.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config2, self2) {
        if (typeof config2.ref == "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
          var componentName = getComponentName(ReactCurrentOwner.current.type);
          didWarnAboutStringRefs[componentName] || (error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config2.ref), didWarnAboutStringRefs[componentName] = !0);
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
          };
          warnAboutAccessingKey.isReactWarning = !0, Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            specialPropRefWarningShown || (specialPropRefWarningShown = !0, error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
          };
          warnAboutAccessingRef.isReactWarning = !0, Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: !0
          });
        }
      }
      var ReactElement = function(type, key, ref, self2, source, owner, props) {
        var element = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref,
          props,
          _owner: owner
        };
        return element._store = {}, Object.defineProperty(element._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(element, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: self2
        }), Object.defineProperty(element, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: source
        }), Object.freeze && (Object.freeze(element.props), Object.freeze(element)), element;
      };
      function jsxDEV4(type, config2, maybeKey, source, self2) {
        {
          var propName, props = {}, key = null, ref = null;
          maybeKey !== void 0 && (key = "" + maybeKey), hasValidKey(config2) && (key = "" + config2.key), hasValidRef(config2) && (ref = config2.ref, warnIfStringRefCannotBeAutoConverted(config2, self2));
          for (propName in config2)
            hasOwnProperty2.call(config2, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = config2[propName]);
          if (type && type.defaultProps) {
            var defaultProps2 = type.defaultProps;
            for (propName in defaultProps2)
              props[propName] === void 0 && (props[propName] = defaultProps2[propName]);
          }
          if (key || ref) {
            var displayName = typeof type == "function" ? type.displayName || type.name || "Unknown" : type;
            key && defineKeyPropWarningGetter(props, displayName), ref && defineRefPropWarningGetter(props, displayName);
          }
          return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner, ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
      }
      var propTypesMisspellWarningShown;
      propTypesMisspellWarningShown = !1;
      function isValidElement4(object) {
        return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentName(ReactCurrentOwner$1.current.type);
            if (name)
              return `

Check the render method of \`` + name + "`.";
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, ""), lineNumber = source.lineNumber;
            return `

Check your code at ` + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType == "string" ? parentType : parentType.displayName || parentType.name;
            parentName && (info = `

Check the top-level render call using <` + parentName + ">.");
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null)
            return;
          element._store.validated = !0;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo])
            return;
          ownerHasKeyUseWarning[currentComponentErrorInfo] = !0;
          var childOwner = "";
          element && element._owner && element._owner !== ReactCurrentOwner$1.current && (childOwner = " It was passed a child from " + getComponentName(element._owner.type) + "."), setCurrentlyValidatingElement$1(element), error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner), setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node != "object")
            return;
          if (Array.isArray(node))
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              isValidElement4(child) && validateExplicitKey(child, parentType);
            }
          else if (isValidElement4(node))
            node._store && (node._store.validated = !0);
          else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn == "function" && iteratorFn !== node.entries)
              for (var iterator = iteratorFn.call(node), step; !(step = iterator.next()).done; )
                isValidElement4(step.value) && validateExplicitKey(step.value, parentType);
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type == null || typeof type == "string")
            return;
          var propTypes;
          if (typeof type == "function")
            propTypes = type.propTypes;
          else if (typeof type == "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE))
            propTypes = type.propTypes;
          else
            return;
          if (propTypes) {
            var name = getComponentName(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = !0;
            var _name = getComponentName(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          typeof type.getDefaultProps == "function" && !type.getDefaultProps.isReactClassApproved && error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function validateFragmentProps(fragment) {
        {
          for (var keys2 = Object.keys(fragment.props), i = 0; i < keys2.length; i++) {
            var key = keys2[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment), error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key), setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          fragment.ref !== null && (setCurrentlyValidatingElement$1(fragment), error("Invalid attribute `ref` supplied to `React.Fragment`."), setCurrentlyValidatingElement$1(null));
        }
      }
      function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            (type === void 0 || typeof type == "object" && type !== null && Object.keys(type).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var sourceInfo = getSourceInfoErrorAddendum(source);
            sourceInfo ? info += sourceInfo : info += getDeclarationErrorAddendum();
            var typeString;
            type === null ? typeString = "null" : Array.isArray(type) ? typeString = "array" : type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE ? (typeString = "<" + (getComponentName(type.type) || "Unknown") + " />", info = " Did you accidentally export a JSX literal instead of a component?") : typeString = typeof type, error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV4(type, props, key, source, self2);
          if (element == null)
            return element;
          if (validType) {
            var children = props.children;
            if (children !== void 0)
              if (isStaticChildren)
                if (Array.isArray(children)) {
                  for (var i = 0; i < children.length; i++)
                    validateChildKeys(children[i], type);
                  Object.freeze && Object.freeze(children);
                } else
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                validateChildKeys(children, type);
          }
          return type === exports.Fragment ? validateFragmentProps(element) : validatePropTypes(element), element;
        }
      }
      var jsxDEV$1 = jsxWithValidation;
      exports.jsxDEV = jsxDEV$1;
    })();
  }
});

// node_modules/react/jsx-dev-runtime.js
var require_jsx_dev_runtime = __commonJS({
  "node_modules/react/jsx-dev-runtime.js"(exports, module) {
    "use strict";
    module.exports = require_react_jsx_dev_runtime_development();
  }
});

// node_modules/@mui/material/colors/common.js
var common, common_default, init_common = __esm({
  "node_modules/@mui/material/colors/common.js"() {
    common = {
      black: "#000",
      white: "#fff"
    }, common_default = common;
  }
});

// node_modules/@mui/material/colors/red.js
var red, red_default, init_red = __esm({
  "node_modules/@mui/material/colors/red.js"() {
    red = {
      50: "#ffebee",
      100: "#ffcdd2",
      200: "#ef9a9a",
      300: "#e57373",
      400: "#ef5350",
      500: "#f44336",
      600: "#e53935",
      700: "#d32f2f",
      800: "#c62828",
      900: "#b71c1c",
      A100: "#ff8a80",
      A200: "#ff5252",
      A400: "#ff1744",
      A700: "#d50000"
    }, red_default = red;
  }
});

// node_modules/@mui/material/colors/purple.js
var purple, purple_default, init_purple = __esm({
  "node_modules/@mui/material/colors/purple.js"() {
    purple = {
      50: "#f3e5f5",
      100: "#e1bee7",
      200: "#ce93d8",
      300: "#ba68c8",
      400: "#ab47bc",
      500: "#9c27b0",
      600: "#8e24aa",
      700: "#7b1fa2",
      800: "#6a1b9a",
      900: "#4a148c",
      A100: "#ea80fc",
      A200: "#e040fb",
      A400: "#d500f9",
      A700: "#aa00ff"
    }, purple_default = purple;
  }
});

// node_modules/@mui/material/colors/blue.js
var blue, blue_default, init_blue = __esm({
  "node_modules/@mui/material/colors/blue.js"() {
    blue = {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
      A100: "#82b1ff",
      A200: "#448aff",
      A400: "#2979ff",
      A700: "#2962ff"
    }, blue_default = blue;
  }
});

// node_modules/@mui/material/colors/lightBlue.js
var lightBlue, lightBlue_default, init_lightBlue = __esm({
  "node_modules/@mui/material/colors/lightBlue.js"() {
    lightBlue = {
      50: "#e1f5fe",
      100: "#b3e5fc",
      200: "#81d4fa",
      300: "#4fc3f7",
      400: "#29b6f6",
      500: "#03a9f4",
      600: "#039be5",
      700: "#0288d1",
      800: "#0277bd",
      900: "#01579b",
      A100: "#80d8ff",
      A200: "#40c4ff",
      A400: "#00b0ff",
      A700: "#0091ea"
    }, lightBlue_default = lightBlue;
  }
});

// node_modules/@mui/material/colors/green.js
var green, green_default, init_green = __esm({
  "node_modules/@mui/material/colors/green.js"() {
    green = {
      50: "#e8f5e9",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb6a",
      500: "#4caf50",
      600: "#43a047",
      700: "#388e3c",
      800: "#2e7d32",
      900: "#1b5e20",
      A100: "#b9f6ca",
      A200: "#69f0ae",
      A400: "#00e676",
      A700: "#00c853"
    }, green_default = green;
  }
});

// node_modules/@mui/material/colors/orange.js
var orange, orange_default, init_orange = __esm({
  "node_modules/@mui/material/colors/orange.js"() {
    orange = {
      50: "#fff3e0",
      100: "#ffe0b2",
      200: "#ffcc80",
      300: "#ffb74d",
      400: "#ffa726",
      500: "#ff9800",
      600: "#fb8c00",
      700: "#f57c00",
      800: "#ef6c00",
      900: "#e65100",
      A100: "#ffd180",
      A200: "#ffab40",
      A400: "#ff9100",
      A700: "#ff6d00"
    }, orange_default = orange;
  }
});

// node_modules/@mui/material/colors/grey.js
var grey, grey_default, init_grey = __esm({
  "node_modules/@mui/material/colors/grey.js"() {
    grey = {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161"
    }, grey_default = grey;
  }
});

// node_modules/@mui/utils/esm/chainPropTypes.js
function chainPropTypes(propType1, propType2) {
  return function(...args) {
    return propType1(...args) || propType2(...args);
  };
}
var init_chainPropTypes = __esm({
  "node_modules/@mui/utils/esm/chainPropTypes.js"() {
  }
});

// node_modules/@babel/runtime/helpers/esm/extends.js
function _extends5() {
  return _extends5 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends5.apply(this, arguments);
}
var init_extends = __esm({
  "node_modules/@babel/runtime/helpers/esm/extends.js"() {
  }
});

// node_modules/@mui/utils/esm/deepmerge.js
function isPlainObject(item) {
  return item !== null && typeof item == "object" && item.constructor === Object;
}
function deepClone(source) {
  if (!isPlainObject(source))
    return source;
  let output = {};
  return Object.keys(source).forEach((key) => {
    output[key] = deepClone(source[key]);
  }), output;
}
function deepmerge(target, source, options = {
  clone: !0
}) {
  let output = options.clone ? _extends5({}, target) : target;
  return isPlainObject(target) && isPlainObject(source) && Object.keys(source).forEach((key) => {
    key !== "__proto__" && (isPlainObject(source[key]) && key in target && isPlainObject(target[key]) ? output[key] = deepmerge(target[key], source[key], options) : options.clone ? output[key] = isPlainObject(source[key]) ? deepClone(source[key]) : source[key] : output[key] = source[key]);
  }), output;
}
var init_deepmerge = __esm({
  "node_modules/@mui/utils/esm/deepmerge.js"() {
    init_extends();
  }
});

// node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var hasSymbol = typeof Symbol == "function" && Symbol.for, REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103, REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106, REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107, REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108, REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114, REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109, REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110, REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111, REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111, REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112, REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113, REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120, REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115, REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116, REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121, REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117, REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118, REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
      function isValidElementType(type) {
        return typeof type == "string" || typeof type == "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
      }
      function typeOf(object) {
        if (typeof object == "object" && object !== null) {
          var $$typeof = object.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;
              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;
                default:
                  var $$typeofType = type && type.$$typeof;
                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;
                    default:
                      return $$typeof;
                  }
              }
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }
      }
      var AsyncMode = REACT_ASYNC_MODE_TYPE, ConcurrentMode = REACT_CONCURRENT_MODE_TYPE, ContextConsumer = REACT_CONTEXT_TYPE, ContextProvider = REACT_PROVIDER_TYPE, Element = REACT_ELEMENT_TYPE, ForwardRef2 = REACT_FORWARD_REF_TYPE, Fragment3 = REACT_FRAGMENT_TYPE, Lazy = REACT_LAZY_TYPE, Memo2 = REACT_MEMO_TYPE, Portal = REACT_PORTAL_TYPE, Profiler = REACT_PROFILER_TYPE, StrictMode = REACT_STRICT_MODE_TYPE, Suspense2 = REACT_SUSPENSE_TYPE, hasWarnedAboutDeprecatedIsAsyncMode = !1;
      function isAsyncMode(object) {
        return hasWarnedAboutDeprecatedIsAsyncMode || (hasWarnedAboutDeprecatedIsAsyncMode = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }
      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }
      exports.AsyncMode = AsyncMode, exports.ConcurrentMode = ConcurrentMode, exports.ContextConsumer = ContextConsumer, exports.ContextProvider = ContextProvider, exports.Element = Element, exports.ForwardRef = ForwardRef2, exports.Fragment = Fragment3, exports.Lazy = Lazy, exports.Memo = Memo2, exports.Portal = Portal, exports.Profiler = Profiler, exports.StrictMode = StrictMode, exports.Suspense = Suspense2, exports.isAsyncMode = isAsyncMode, exports.isConcurrentMode = isConcurrentMode, exports.isContextConsumer = isContextConsumer, exports.isContextProvider = isContextProvider, exports.isElement = isElement, exports.isForwardRef = isForwardRef, exports.isFragment = isFragment, exports.isLazy = isLazy, exports.isMemo = isMemo, exports.isPortal = isPortal, exports.isProfiler = isProfiler, exports.isStrictMode = isStrictMode, exports.isSuspense = isSuspense, exports.isValidElementType = isValidElementType, exports.typeOf = typeOf;
    })();
  }
});

// node_modules/prop-types/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/prop-types/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    module.exports = require_react_is_development();
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    var printWarning = function() {
    };
    ReactPropTypesSecret = require_ReactPropTypesSecret(), loggedTypeFailures = {}, has = require_has(), printWarning = function(text) {
      var message = "Warning: " + text;
      typeof console < "u" && console.error(message);
      try {
        throw new Error(message);
      } catch {
      }
    };
    var ReactPropTypesSecret, loggedTypeFailures, has;
    function checkPropTypes(typeSpecs, values3, location, componentName, getStack) {
      for (var typeSpecName in typeSpecs)
        if (has(typeSpecs, typeSpecName)) {
          var error;
          try {
            if (typeof typeSpecs[typeSpecName] != "function") {
              var err = Error(
                (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw err.name = "Invariant Violation", err;
            }
            error = typeSpecs[typeSpecName](values3, typeSpecName, componentName, location, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error) && printWarning(
            (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), error instanceof Error && !(error.message in loggedTypeFailures)) {
            loggedTypeFailures[error.message] = !0;
            var stack = getStack ? getStack() : "";
            printWarning(
              "Failed " + location + " type: " + error.message + (stack ?? "")
            );
          }
        }
    }
    checkPropTypes.resetWarningCache = function() {
      loggedTypeFailures = {};
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    var ReactIs = require_react_is(), assign = require_object_assign(), ReactPropTypesSecret = require_ReactPropTypesSecret(), has = require_has(), checkPropTypes = require_checkPropTypes(), printWarning = function() {
    };
    printWarning = function(text) {
      var message = "Warning: " + text;
      typeof console < "u" && console.error(message);
      try {
        throw new Error(message);
      } catch {
      }
    };
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement4, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol == "function" && Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn == "function")
          return iteratorFn;
      }
      var ANONYMOUS = "<<anonymous>>", ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is2(x, y) {
        return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y;
      }
      function PropTypeError(message, data) {
        this.message = message, this.data = data && typeof data == "object" ? data : {}, this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        var manualPropTypeCallCache = {}, manualPropTypeWarningCount = 0;
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          if (componentName = componentName || ANONYMOUS, propFullName = propFullName || propName, secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
              );
              throw err.name = "Invariant Violation", err;
            } else if (typeof console < "u") {
              var cacheKey = componentName + ":" + propName;
              !manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3 && (printWarning(
                "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
              ), manualPropTypeCallCache[cacheKey] = !0, manualPropTypeWarningCount++);
            }
          }
          return props[propName] == null ? isRequired ? props[propName] === null ? new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`.")) : new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`.")) : null : validate(props, propName, componentName, location, propFullName);
        }
        var chainedCheckType = checkType.bind(null, !1);
        return chainedCheckType.isRequired = checkType.bind(null, !0), chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName], propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError(
              "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
              { expectedType }
            );
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker != "function")
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error)
              return error;
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement4(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS, actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues))
          return arguments.length > 1 ? printWarning(
            "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
          ) : printWarning("Invalid argument supplied to oneOf, expected an array."), emptyFunctionThatReturnsNull;
        function validate(props, propName, componentName, location, propFullName) {
          for (var propValue = props[propName], i = 0; i < expectedValues.length; i++)
            if (is2(propValue, expectedValues[i]))
              return null;
          var valuesString = JSON.stringify(expectedValues, function(key, value) {
            var type = getPreciseType(value);
            return type === "symbol" ? String(value) : value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker != "function")
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          var propValue = props[propName], propType = getPropType(propValue);
          if (propType !== "object")
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          for (var key in propValue)
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error)
                return error;
            }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers))
          return printWarning("Invalid argument supplied to oneOfType, expected an instance of array."), emptyFunctionThatReturnsNull;
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker != "function")
            return printWarning(
              "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
            ), emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          for (var expectedTypes = [], i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2], checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null)
              return null;
            checkerResult.data && has(checkerResult.data, "expectedType") && expectedTypes.push(checkerResult.data.expectedType);
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          return isNode(props[propName]) ? null : new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError(
          (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
        );
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName], propType = getPropType(propValue);
          if (propType !== "object")
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker != "function")
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error)
              return error;
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName], propType = getPropType(propValue);
          if (propType !== "object")
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker != "function")
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            if (!checker)
              return new PropTypeError(
                "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(shapeTypes), null, "  ")
              );
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error)
              return error;
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return !0;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue))
              return propValue.every(isNode);
            if (propValue === null || isValidElement4(propValue))
              return !0;
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue), step;
              if (iteratorFn !== propValue.entries) {
                for (; !(step = iterator.next()).done; )
                  if (!isNode(step.value))
                    return !1;
              } else
                for (; !(step = iterator.next()).done; ) {
                  var entry2 = step.value;
                  if (entry2 && !isNode(entry2[1]))
                    return !1;
                }
            } else
              return !1;
            return !0;
          default:
            return !1;
        }
      }
      function isSymbol(propType, propValue) {
        return propType === "symbol" ? !0 : propValue ? propValue["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && propValue instanceof Symbol : !1;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        return Array.isArray(propValue) ? "array" : propValue instanceof RegExp ? "object" : isSymbol(propType, propValue) ? "symbol" : propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue > "u" || propValue === null)
          return "" + propValue;
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date)
            return "date";
          if (propValue instanceof RegExp)
            return "regexp";
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        return !propValue.constructor || !propValue.constructor.name ? ANONYMOUS : propValue.constructor.name;
      }
      return ReactPropTypes.checkPropTypes = checkPropTypes, ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache, ReactPropTypes.PropTypes = ReactPropTypes, ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    ReactIs = require_react_is(), throwOnDirectAccess = !0, module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    var ReactIs, throwOnDirectAccess;
  }
});

// node_modules/@mui/utils/esm/elementTypeAcceptingRef.js
function isClassComponent(elementType) {
  let {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
function elementTypeAcceptingRef(props, propName, componentName, location, propFullName) {
  let propValue = props[propName], safePropName = propFullName || propName;
  if (propValue == null || typeof window > "u")
    return null;
  let warningHint;
  return typeof propValue == "function" && !isClassComponent(propValue) && (warningHint = "Did you accidentally provide a plain function component instead?"), warningHint !== void 0 ? new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element type that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
var import_prop_types, elementTypeAcceptingRef_default, init_elementTypeAcceptingRef = __esm({
  "node_modules/@mui/utils/esm/elementTypeAcceptingRef.js"() {
    import_prop_types = __toESM(require_prop_types());
    init_chainPropTypes();
    elementTypeAcceptingRef_default = chainPropTypes(import_prop_types.default.elementType, elementTypeAcceptingRef);
  }
});

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development2 = __commonJS({
  "node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var REACT_ELEMENT_TYPE = Symbol.for("react.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"), enableScopeAPI = !1, enableCacheElement = !1, enableTransitionTracing = !1, enableLegacyHidden = !1, enableDebugTracing = !1, REACT_MODULE_REFERENCE;
      REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      function isValidElementType(type) {
        return !!(typeof type == "string" || typeof type == "function" || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0));
      }
      function typeOf(object) {
        if (typeof object == "object" && object !== null) {
          var $$typeof = object.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;
              switch (type) {
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                case REACT_SUSPENSE_LIST_TYPE:
                  return type;
                default:
                  var $$typeofType = type && type.$$typeof;
                  switch ($$typeofType) {
                    case REACT_SERVER_CONTEXT_TYPE:
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;
                    default:
                      return $$typeof;
                  }
              }
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }
      }
      var ContextConsumer = REACT_CONTEXT_TYPE, ContextProvider = REACT_PROVIDER_TYPE, Element = REACT_ELEMENT_TYPE, ForwardRef2 = REACT_FORWARD_REF_TYPE, Fragment3 = REACT_FRAGMENT_TYPE, Lazy = REACT_LAZY_TYPE, Memo2 = REACT_MEMO_TYPE, Portal = REACT_PORTAL_TYPE, Profiler = REACT_PROFILER_TYPE, StrictMode = REACT_STRICT_MODE_TYPE, Suspense2 = REACT_SUSPENSE_TYPE, SuspenseList = REACT_SUSPENSE_LIST_TYPE, hasWarnedAboutDeprecatedIsAsyncMode = !1, hasWarnedAboutDeprecatedIsConcurrentMode = !1;
      function isAsyncMode(object) {
        return hasWarnedAboutDeprecatedIsAsyncMode || (hasWarnedAboutDeprecatedIsAsyncMode = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
      }
      function isConcurrentMode(object) {
        return hasWarnedAboutDeprecatedIsConcurrentMode || (hasWarnedAboutDeprecatedIsConcurrentMode = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }
      function isSuspenseList(object) {
        return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
      }
      exports.ContextConsumer = ContextConsumer, exports.ContextProvider = ContextProvider, exports.Element = Element, exports.ForwardRef = ForwardRef2, exports.Fragment = Fragment3, exports.Lazy = Lazy, exports.Memo = Memo2, exports.Portal = Portal, exports.Profiler = Profiler, exports.StrictMode = StrictMode, exports.Suspense = Suspense2, exports.SuspenseList = SuspenseList, exports.isAsyncMode = isAsyncMode, exports.isConcurrentMode = isConcurrentMode, exports.isContextConsumer = isContextConsumer, exports.isContextProvider = isContextProvider, exports.isElement = isElement, exports.isForwardRef = isForwardRef, exports.isFragment = isFragment, exports.isLazy = isLazy, exports.isMemo = isMemo, exports.isPortal = isPortal, exports.isProfiler = isProfiler, exports.isStrictMode = isStrictMode, exports.isSuspense = isSuspense, exports.isSuspenseList = isSuspenseList, exports.isValidElementType = isValidElementType, exports.typeOf = typeOf;
    })();
  }
});

// node_modules/react-is/index.js
var require_react_is2 = __commonJS({
  "node_modules/react-is/index.js"(exports, module) {
    "use strict";
    module.exports = require_react_is_development2();
  }
});

// node_modules/@mui/utils/esm/getDisplayName.js
function getFunctionName(fn) {
  let match = `${fn}`.match(fnNameMatchRegex);
  return match && match[1] || "";
}
function getFunctionComponentName(Component2, fallback = "") {
  return Component2.displayName || Component2.name || getFunctionName(Component2) || fallback;
}
function getWrappedName(outerType, innerType, wrapperName) {
  let functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== "" ? `${wrapperName}(${functionName})` : wrapperName);
}
function getDisplayName(Component2) {
  if (Component2 != null) {
    if (typeof Component2 == "string")
      return Component2;
    if (typeof Component2 == "function")
      return getFunctionComponentName(Component2, "Component");
    if (typeof Component2 == "object")
      switch (Component2.$$typeof) {
        case import_react_is.ForwardRef:
          return getWrappedName(Component2, Component2.render, "ForwardRef");
        case import_react_is.Memo:
          return getWrappedName(Component2, Component2.type, "memo");
        default:
          return;
      }
  }
}
var import_react_is, fnNameMatchRegex, init_getDisplayName = __esm({
  "node_modules/@mui/utils/esm/getDisplayName.js"() {
    import_react_is = __toESM(require_react_is2()), fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
  }
});

// node_modules/@mui/utils/esm/refType.js
var import_prop_types2, refType, refType_default, init_refType = __esm({
  "node_modules/@mui/utils/esm/refType.js"() {
    import_prop_types2 = __toESM(require_prop_types()), refType = import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object]), refType_default = refType;
  }
});

// node_modules/@mui/utils/esm/capitalize.js
function capitalize(string) {
  if (typeof string != "string")
    throw new Error("MUI: `capitalize(string)` expects a string argument.");
  return string.charAt(0).toUpperCase() + string.slice(1);
}
var init_capitalize = __esm({
  "node_modules/@mui/utils/esm/capitalize.js"() {
  }
});

// node_modules/@mui/utils/esm/createChainedFunction.js
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => func == null ? acc : function(...args) {
    acc.apply(this, args), func.apply(this, args);
  }, () => {
  });
}
var init_createChainedFunction = __esm({
  "node_modules/@mui/utils/esm/createChainedFunction.js"() {
  }
});

// node_modules/@mui/utils/esm/debounce.js
function debounce(func, wait = 166) {
  let timeout;
  function debounced(...args) {
    let later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout), timeout = setTimeout(later, wait);
  }
  return debounced.clear = () => {
    clearTimeout(timeout);
  }, debounced;
}
var init_debounce = __esm({
  "node_modules/@mui/utils/esm/debounce.js"() {
  }
});

// node_modules/@mui/utils/esm/deprecatedPropType.js
function deprecatedPropType(validator, reason) {
  return (props, propName, componentName, location, propFullName) => {
    let componentNameSafe = componentName || "<<anonymous>>", propFullNameSafe = propFullName || propName;
    return typeof props[propName] < "u" ? new Error(`The ${location} \`${propFullNameSafe}\` of \`${componentNameSafe}\` is deprecated. ${reason}`) : null;
  };
}
var init_deprecatedPropType = __esm({
  "node_modules/@mui/utils/esm/deprecatedPropType.js"() {
  }
});

// node_modules/@mui/utils/esm/isMuiElement.js
function isMuiElement(element, muiNames) {
  return /* @__PURE__ */ React7.isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}
var React7, init_isMuiElement = __esm({
  "node_modules/@mui/utils/esm/isMuiElement.js"() {
    React7 = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/ownerDocument.js
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
var init_ownerDocument = __esm({
  "node_modules/@mui/utils/esm/ownerDocument.js"() {
  }
});

// node_modules/@mui/utils/esm/ownerWindow.js
function ownerWindow(node) {
  return ownerDocument(node).defaultView || window;
}
var init_ownerWindow = __esm({
  "node_modules/@mui/utils/esm/ownerWindow.js"() {
    init_ownerDocument();
  }
});

// node_modules/@mui/utils/esm/requirePropFactory.js
function requirePropFactory(componentNameInError, Component2) {
  let prevPropTypes = Component2 ? _extends5({}, Component2.propTypes) : null;
  return (requiredProp) => (props, propName, componentName, location, propFullName, ...args) => {
    let propFullNameSafe = propFullName || propName, defaultTypeChecker = prevPropTypes == null ? void 0 : prevPropTypes[propFullNameSafe];
    if (defaultTypeChecker) {
      let typeCheckerResult = defaultTypeChecker(props, propName, componentName, location, propFullName, ...args);
      if (typeCheckerResult)
        return typeCheckerResult;
    }
    return typeof props[propName] < "u" && !props[requiredProp] ? new Error(`The prop \`${propFullNameSafe}\` of \`${componentNameInError}\` can only be used together with the \`${requiredProp}\` prop.`) : null;
  };
}
var init_requirePropFactory = __esm({
  "node_modules/@mui/utils/esm/requirePropFactory.js"() {
    init_extends();
  }
});

// node_modules/@mui/utils/esm/setRef.js
function setRef(ref, value) {
  typeof ref == "function" ? ref(value) : ref && (ref.current = value);
}
var init_setRef = __esm({
  "node_modules/@mui/utils/esm/setRef.js"() {
  }
});

// node_modules/@mui/utils/esm/useEnhancedEffect.js
var React8, useEnhancedEffect, useEnhancedEffect_default, init_useEnhancedEffect = __esm({
  "node_modules/@mui/utils/esm/useEnhancedEffect.js"() {
    React8 = __toESM(require_react()), useEnhancedEffect = typeof window < "u" ? React8.useLayoutEffect : React8.useEffect, useEnhancedEffect_default = useEnhancedEffect;
  }
});

// node_modules/@mui/utils/esm/useId.js
function useGlobalId(idOverride) {
  let [defaultId, setDefaultId] = React9.useState(idOverride), id = idOverride || defaultId;
  return React9.useEffect(() => {
    defaultId == null && (globalId += 1, setDefaultId(`mui-${globalId}`));
  }, [defaultId]), id;
}
function useId2(idOverride) {
  if (maybeReactUseId !== void 0) {
    let reactId = maybeReactUseId();
    return idOverride ?? reactId;
  }
  return useGlobalId(idOverride);
}
var React9, globalId, maybeReactUseId, init_useId = __esm({
  "node_modules/@mui/utils/esm/useId.js"() {
    React9 = __toESM(require_react()), globalId = 0;
    maybeReactUseId = React9.useId;
  }
});

// node_modules/@mui/utils/esm/unsupportedProp.js
function unsupportedProp(props, propName, componentName, location, propFullName) {
  let propFullNameSafe = propFullName || propName;
  return typeof props[propName] < "u" ? new Error(`The prop \`${propFullNameSafe}\` is not supported. Please remove it.`) : null;
}
var init_unsupportedProp = __esm({
  "node_modules/@mui/utils/esm/unsupportedProp.js"() {
  }
});

// node_modules/@mui/utils/esm/useControlled.js
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  let {
    current: isControlled
  } = React10.useRef(controlled !== void 0), [valueState, setValue] = React10.useState(defaultProp), value = isControlled ? controlled : valueState;
  {
    React10.useEffect(() => {
      isControlled !== (controlled !== void 0) && console.error([`MUI: A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [state, name, controlled]);
    let {
      current: defaultValue
    } = React10.useRef(defaultProp);
    React10.useEffect(() => {
      !isControlled && defaultValue !== defaultProp && console.error([`MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join(`
`));
    }, [JSON.stringify(defaultProp)]);
  }
  let setValueIfUncontrolled = React10.useCallback((newValue) => {
    isControlled || setValue(newValue);
  }, []);
  return [value, setValueIfUncontrolled];
}
var React10, init_useControlled = __esm({
  "node_modules/@mui/utils/esm/useControlled.js"() {
    React10 = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/useEventCallback.js
function useEventCallback(fn) {
  let ref = React11.useRef(fn);
  return useEnhancedEffect_default(() => {
    ref.current = fn;
  }), React11.useCallback((...args) => (0, ref.current)(...args), []);
}
var React11, init_useEventCallback = __esm({
  "node_modules/@mui/utils/esm/useEventCallback.js"() {
    React11 = __toESM(require_react());
    init_useEnhancedEffect();
  }
});

// node_modules/@mui/utils/esm/useForkRef.js
function useForkRef(...refs) {
  return React12.useMemo(() => refs.every((ref) => ref == null) ? null : (instance) => {
    refs.forEach((ref) => {
      setRef(ref, instance);
    });
  }, refs);
}
var React12, init_useForkRef = __esm({
  "node_modules/@mui/utils/esm/useForkRef.js"() {
    React12 = __toESM(require_react());
    init_setRef();
  }
});

// node_modules/@mui/utils/esm/useIsFocusVisible.js
function focusTriggersKeyboardModality(node) {
  let {
    type,
    tagName
  } = node;
  return !!(tagName === "INPUT" && inputTypesWhitelist[type] && !node.readOnly || tagName === "TEXTAREA" && !node.readOnly || node.isContentEditable);
}
function handleKeyDown(event) {
  event.metaKey || event.altKey || event.ctrlKey || (hadKeyboardEvent = !0);
}
function handlePointerDown() {
  hadKeyboardEvent = !1;
}
function handleVisibilityChange() {
  this.visibilityState === "hidden" && hadFocusVisibleRecently && (hadKeyboardEvent = !0);
}
function prepare(doc) {
  doc.addEventListener("keydown", handleKeyDown, !0), doc.addEventListener("mousedown", handlePointerDown, !0), doc.addEventListener("pointerdown", handlePointerDown, !0), doc.addEventListener("touchstart", handlePointerDown, !0), doc.addEventListener("visibilitychange", handleVisibilityChange, !0);
}
function isFocusVisible(event) {
  let {
    target
  } = event;
  try {
    return target.matches(":focus-visible");
  } catch {
  }
  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}
function useIsFocusVisible() {
  let ref = React13.useCallback((node) => {
    node != null && prepare(node.ownerDocument);
  }, []), isFocusVisibleRef = React13.useRef(!1);
  function handleBlurVisible() {
    return isFocusVisibleRef.current ? (hadFocusVisibleRecently = !0, window.clearTimeout(hadFocusVisibleRecentlyTimeout), hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
      hadFocusVisibleRecently = !1;
    }, 100), isFocusVisibleRef.current = !1, !0) : !1;
  }
  function handleFocusVisible(event) {
    return isFocusVisible(event) ? (isFocusVisibleRef.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref
  };
}
var React13, hadKeyboardEvent, hadFocusVisibleRecently, hadFocusVisibleRecentlyTimeout, inputTypesWhitelist, init_useIsFocusVisible = __esm({
  "node_modules/@mui/utils/esm/useIsFocusVisible.js"() {
    React13 = __toESM(require_react()), hadKeyboardEvent = !0, hadFocusVisibleRecently = !1, inputTypesWhitelist = {
      text: !0,
      search: !0,
      url: !0,
      tel: !0,
      email: !0,
      password: !0,
      number: !0,
      date: !0,
      month: !0,
      week: !0,
      time: !0,
      datetime: !0,
      "datetime-local": !0
    };
  }
});

// node_modules/@mui/utils/esm/resolveProps.js
function resolveProps(defaultProps2, props) {
  let output = _extends5({}, props);
  return Object.keys(defaultProps2).forEach((propName) => {
    if (propName.toString().match(/^(components|slots)$/))
      output[propName] = _extends5({}, defaultProps2[propName], output[propName]);
    else if (propName.toString().match(/^(componentsProps|slotProps)$/)) {
      let defaultSlotProps = defaultProps2[propName] || {}, slotProps = props[propName];
      output[propName] = {}, !slotProps || !Object.keys(slotProps) ? output[propName] = defaultSlotProps : !defaultSlotProps || !Object.keys(defaultSlotProps) ? output[propName] = slotProps : (output[propName] = _extends5({}, slotProps), Object.keys(defaultSlotProps).forEach((slotPropName) => {
        output[propName][slotPropName] = resolveProps(defaultSlotProps[slotPropName], slotProps[slotPropName]);
      }));
    } else
      output[propName] === void 0 && (output[propName] = defaultProps2[propName]);
  }), output;
}
var init_resolveProps = __esm({
  "node_modules/@mui/utils/esm/resolveProps.js"() {
    init_extends();
  }
});

// node_modules/@mui/utils/esm/composeClasses/composeClasses.js
function composeClasses(slots, getUtilityClass, classes) {
  let output = {};
  return Object.keys(slots).forEach(
    (slot) => {
      output[slot] = slots[slot].reduce((acc, key) => (key && (acc.push(getUtilityClass(key)), classes && classes[key] && acc.push(classes[key])), acc), []).join(" ");
    }
  ), output;
}
var init_composeClasses = __esm({
  "node_modules/@mui/utils/esm/composeClasses/composeClasses.js"() {
  }
});

// node_modules/@mui/utils/esm/composeClasses/index.js
var init_composeClasses2 = __esm({
  "node_modules/@mui/utils/esm/composeClasses/index.js"() {
    init_composeClasses();
  }
});

// node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js
var defaultGenerator, createClassNameGenerator, ClassNameGenerator, ClassNameGenerator_default, init_ClassNameGenerator = __esm({
  "node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js"() {
    defaultGenerator = (componentName) => componentName, createClassNameGenerator = () => {
      let generate = defaultGenerator;
      return {
        configure(generator) {
          generate = generator;
        },
        generate(componentName) {
          return generate(componentName);
        },
        reset() {
          generate = defaultGenerator;
        }
      };
    }, ClassNameGenerator = createClassNameGenerator(), ClassNameGenerator_default = ClassNameGenerator;
  }
});

// node_modules/@mui/utils/esm/ClassNameGenerator/index.js
var init_ClassNameGenerator2 = __esm({
  "node_modules/@mui/utils/esm/ClassNameGenerator/index.js"() {
    init_ClassNameGenerator();
  }
});

// node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js
function generateUtilityClass(componentName, slot, globalStatePrefix = "Mui") {
  let globalStateClass = globalStateClassesMapping[slot];
  return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${ClassNameGenerator_default.generate(componentName)}-${slot}`;
}
var globalStateClassesMapping, init_generateUtilityClass = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"() {
    init_ClassNameGenerator2();
    globalStateClassesMapping = {
      active: "active",
      checked: "checked",
      completed: "completed",
      disabled: "disabled",
      error: "error",
      expanded: "expanded",
      focused: "focused",
      focusVisible: "focusVisible",
      required: "required",
      selected: "selected"
    };
  }
});

// node_modules/@mui/utils/esm/generateUtilityClass/index.js
var init_generateUtilityClass2 = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClass/index.js"() {
    init_generateUtilityClass();
    init_generateUtilityClass();
  }
});

// node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js
function generateUtilityClasses(componentName, slots, globalStatePrefix = "Mui") {
  let result = {};
  return slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  }), result;
}
var init_generateUtilityClasses = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"() {
    init_generateUtilityClass2();
  }
});

// node_modules/@mui/utils/esm/generateUtilityClasses/index.js
var init_generateUtilityClasses2 = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClasses/index.js"() {
    init_generateUtilityClasses();
  }
});

// node_modules/@mui/utils/esm/index.js
var init_esm2 = __esm({
  "node_modules/@mui/utils/esm/index.js"() {
    init_deepmerge();
    init_deepmerge();
    init_elementTypeAcceptingRef();
    init_getDisplayName();
    init_refType();
    init_capitalize();
    init_createChainedFunction();
    init_debounce();
    init_deprecatedPropType();
    init_isMuiElement();
    init_ownerDocument();
    init_ownerWindow();
    init_requirePropFactory();
    init_setRef();
    init_useEnhancedEffect();
    init_useId();
    init_unsupportedProp();
    init_useControlled();
    init_useEventCallback();
    init_useForkRef();
    init_useIsFocusVisible();
    init_resolveProps();
    init_composeClasses2();
    init_generateUtilityClass2();
    init_generateUtilityClass2();
    init_generateUtilityClasses2();
    init_ClassNameGenerator2();
  }
});

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose2(source, excluded) {
  if (source == null)
    return {};
  var target = {}, sourceKeys = Object.keys(source), key, i;
  for (i = 0; i < sourceKeys.length; i++)
    key = sourceKeys[i], !(excluded.indexOf(key) >= 0) && (target[key] = source[key]);
  return target;
}
var init_objectWithoutPropertiesLoose = __esm({
  "node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"() {
  }
});

// node_modules/@babel/runtime/helpers/extends.js
var require_extends = __commonJS({
  "node_modules/@babel/runtime/helpers/extends.js"(exports, module) {
    function _extends6() {
      return module.exports = _extends6 = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source)
            Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
        }
        return target;
      }, module.exports.__esModule = !0, module.exports.default = module.exports, _extends6.apply(this, arguments);
    }
    module.exports = _extends6, module.exports.__esModule = !0, module.exports.default = module.exports;
  }
});

// node_modules/@emotion/memoize/dist/emotion-memoize.cjs.dev.js
var require_emotion_memoize_cjs_dev = __commonJS({
  "node_modules/@emotion/memoize/dist/emotion-memoize.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    function memoize2(fn) {
      var cache = /* @__PURE__ */ Object.create(null);
      return function(arg) {
        return cache[arg] === void 0 && (cache[arg] = fn(arg)), cache[arg];
      };
    }
    exports.default = memoize2;
  }
});

// node_modules/@emotion/memoize/dist/emotion-memoize.cjs.js
var require_emotion_memoize_cjs = __commonJS({
  "node_modules/@emotion/memoize/dist/emotion-memoize.cjs.js"(exports, module) {
    "use strict";
    module.exports = require_emotion_memoize_cjs_dev();
  }
});

// node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.cjs.dev.js
var require_emotion_is_prop_valid_cjs_dev = __commonJS({
  "node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var memoize2 = require_emotion_memoize_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var memoize__default = /* @__PURE__ */ _interopDefault(memoize2), reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, isPropValid = /* @__PURE__ */ memoize__default.default(
      function(prop) {
        return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
      }
    );
    exports.default = isPropValid;
  }
});

// node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.cjs.js
var require_emotion_is_prop_valid_cjs = __commonJS({
  "node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.cjs.js"(exports, module) {
    "use strict";
    module.exports = require_emotion_is_prop_valid_cjs_dev();
  }
});

// node_modules/@emotion/sheet/dist/emotion-sheet.cjs.dev.js
var require_emotion_sheet_cjs_dev = __commonJS({
  "node_modules/@emotion/sheet/dist/emotion-sheet.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    function sheetForTag(tag) {
      if (tag.sheet)
        return tag.sheet;
      for (var i = 0; i < document.styleSheets.length; i++)
        if (document.styleSheets[i].ownerNode === tag)
          return document.styleSheets[i];
    }
    function createStyleElement(options) {
      var tag = document.createElement("style");
      return tag.setAttribute("data-emotion", options.key), options.nonce !== void 0 && tag.setAttribute("nonce", options.nonce), tag.appendChild(document.createTextNode("")), tag.setAttribute("data-s", ""), tag;
    }
    var StyleSheet = /* @__PURE__ */ function() {
      function StyleSheet2(options) {
        var _this = this;
        this._insertTag = function(tag) {
          var before;
          _this.tags.length === 0 ? _this.insertionPoint ? before = _this.insertionPoint.nextSibling : _this.prepend ? before = _this.container.firstChild : before = _this.before : before = _this.tags[_this.tags.length - 1].nextSibling, _this.container.insertBefore(tag, before), _this.tags.push(tag);
        }, this.isSpeedy = options.speedy === void 0 ? !1 : options.speedy, this.tags = [], this.ctr = 0, this.nonce = options.nonce, this.key = options.key, this.container = options.container, this.prepend = options.prepend, this.insertionPoint = options.insertionPoint, this.before = null;
      }
      var _proto = StyleSheet2.prototype;
      return _proto.hydrate = function(nodes) {
        nodes.forEach(this._insertTag);
      }, _proto.insert = function(rule) {
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(createStyleElement(this));
        var tag = this.tags[this.tags.length - 1], isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
        if (isImportRule && this._alreadyInsertedOrderInsensitiveRule && console.error(`You're attempting to insert the following rule:
` + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules."), this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule, this.isSpeedy) {
          var sheet = sheetForTag(tag);
          try {
            sheet.insertRule(rule, sheet.cssRules.length);
          } catch (e) {
            /:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule) || console.error('There was a problem inserting the following rule: "' + rule + '"', e);
          }
        } else
          tag.appendChild(document.createTextNode(rule));
        this.ctr++;
      }, _proto.flush = function() {
        this.tags.forEach(function(tag) {
          return tag.parentNode && tag.parentNode.removeChild(tag);
        }), this.tags = [], this.ctr = 0, this._alreadyInsertedOrderInsensitiveRule = !1;
      }, StyleSheet2;
    }();
    exports.StyleSheet = StyleSheet;
  }
});

// node_modules/@emotion/sheet/dist/emotion-sheet.cjs.js
var require_emotion_sheet_cjs = __commonJS({
  "node_modules/@emotion/sheet/dist/emotion-sheet.cjs.js"(exports, module) {
    "use strict";
    module.exports = require_emotion_sheet_cjs_dev();
  }
});

// node_modules/stylis/dist/umd/stylis.js
var require_stylis = __commonJS({
  "node_modules/stylis/dist/umd/stylis.js"(exports, module) {
    (function(e, r2) {
      typeof exports == "object" && typeof module < "u" ? r2(exports) : typeof define == "function" && define.amd ? define(["exports"], r2) : (e = e || self, r2(e.stylis = {}));
    })(exports, function(e) {
      "use strict";
      var r2 = "-ms-", a = "-moz-", c = "-webkit-", t = "comm", n = "rule", s = "decl", i = "@page", u = "@media", o = "@import", f = "@charset", l = "@viewport", p = "@supports", h = "@document", v = "@namespace", d = "@keyframes", b = "@font-face", w = "@counter-style", m = "@font-feature-values", g = Math.abs, k = String.fromCharCode, $ = Object.assign;
      function x(e2, r3) {
        return A(e2, 0) ^ 45 ? (((r3 << 2 ^ A(e2, 0)) << 2 ^ A(e2, 1)) << 2 ^ A(e2, 2)) << 2 ^ A(e2, 3) : 0;
      }
      function E(e2) {
        return e2.trim();
      }
      function y(e2, r3) {
        return (e2 = r3.exec(e2)) ? e2[0] : e2;
      }
      function T(e2, r3, a2) {
        return e2.replace(r3, a2);
      }
      function O(e2, r3) {
        return e2.indexOf(r3);
      }
      function A(e2, r3) {
        return e2.charCodeAt(r3) | 0;
      }
      function M(e2, r3, a2) {
        return e2.slice(r3, a2);
      }
      function C(e2) {
        return e2.length;
      }
      function S(e2) {
        return e2.length;
      }
      function R(e2, r3) {
        return r3.push(e2), e2;
      }
      function z(e2, r3) {
        return e2.map(r3).join("");
      }
      e.line = 1, e.column = 1, e.length = 0, e.position = 0, e.character = 0, e.characters = "";
      function N(r3, a2, c2, t2, n2, s2, i2) {
        return { value: r3, root: a2, parent: c2, type: t2, props: n2, children: s2, line: e.line, column: e.column, length: i2, return: "" };
      }
      function P(e2, r3) {
        return $(N("", null, null, "", null, null, 0), e2, { length: -e2.length }, r3);
      }
      function j() {
        return e.character;
      }
      function U() {
        return e.character = e.position > 0 ? A(e.characters, --e.position) : 0, e.column--, e.character === 10 && (e.column = 1, e.line--), e.character;
      }
      function _2() {
        return e.character = e.position < e.length ? A(e.characters, e.position++) : 0, e.column++, e.character === 10 && (e.column = 1, e.line++), e.character;
      }
      function F() {
        return A(e.characters, e.position);
      }
      function I() {
        return e.position;
      }
      function L(r3, a2) {
        return M(e.characters, r3, a2);
      }
      function D(e2) {
        switch (e2) {
          case 0:
          case 9:
          case 10:
          case 13:
          case 32:
            return 5;
          case 33:
          case 43:
          case 44:
          case 47:
          case 62:
          case 64:
          case 126:
          case 59:
          case 123:
          case 125:
            return 4;
          case 58:
            return 3;
          case 34:
          case 39:
          case 40:
          case 91:
            return 2;
          case 41:
          case 93:
            return 1;
        }
        return 0;
      }
      function K(r3) {
        return e.line = e.column = 1, e.length = C(e.characters = r3), e.position = 0, [];
      }
      function V(r3) {
        return e.characters = "", r3;
      }
      function W(r3) {
        return E(L(e.position - 1, Z(r3 === 91 ? r3 + 2 : r3 === 40 ? r3 + 1 : r3)));
      }
      function Y(e2) {
        return V(G(K(e2)));
      }
      function B(r3) {
        for (; (e.character = F()) && e.character < 33; )
          _2();
        return D(r3) > 2 || D(e.character) > 3 ? "" : " ";
      }
      function G(r3) {
        for (; _2(); )
          switch (D(e.character)) {
            case 0:
              R(J(e.position - 1), r3);
              break;
            case 2:
              R(W(e.character), r3);
              break;
            default:
              R(k(e.character), r3);
          }
        return r3;
      }
      function H(r3, a2) {
        for (; --a2 && _2() && !(e.character < 48 || e.character > 102 || e.character > 57 && e.character < 65 || e.character > 70 && e.character < 97); )
          ;
        return L(r3, I() + (a2 < 6 && F() == 32 && _2() == 32));
      }
      function Z(r3) {
        for (; _2(); )
          switch (e.character) {
            case r3:
              return e.position;
            case 34:
            case 39:
              r3 !== 34 && r3 !== 39 && Z(e.character);
              break;
            case 40:
              r3 === 41 && Z(r3);
              break;
            case 92:
              _2();
              break;
          }
        return e.position;
      }
      function q(r3, a2) {
        for (; _2() && r3 + e.character !== 47 + 10; )
          if (r3 + e.character === 42 + 42 && F() === 47)
            break;
        return "/*" + L(a2, e.position - 1) + "*" + k(r3 === 47 ? r3 : _2());
      }
      function J(r3) {
        for (; !D(F()); )
          _2();
        return L(r3, e.position);
      }
      function Q(e2) {
        return V(X("", null, null, null, [""], e2 = K(e2), 0, [0], e2));
      }
      function X(e2, r3, a2, c2, t2, n2, s2, i2, u2) {
        for (var o2 = 0, f2 = 0, l2 = s2, p2 = 0, h2 = 0, v2 = 0, d2 = 1, b2 = 1, w2 = 1, m2 = 0, g2 = "", $2 = t2, x2 = n2, E2 = c2, y2 = g2; b2; )
          switch (v2 = m2, m2 = _2()) {
            case 40:
              if (v2 != 108 && A(y2, l2 - 1) == 58) {
                O(y2 += T(W(m2), "&", "&\f"), "&\f") != -1 && (w2 = -1);
                break;
              }
            case 34:
            case 39:
            case 91:
              y2 += W(m2);
              break;
            case 9:
            case 10:
            case 13:
            case 32:
              y2 += B(v2);
              break;
            case 92:
              y2 += H(I() - 1, 7);
              continue;
            case 47:
              switch (F()) {
                case 42:
                case 47:
                  R(re(q(_2(), I()), r3, a2), u2);
                  break;
                default:
                  y2 += "/";
              }
              break;
            case 123 * d2:
              i2[o2++] = C(y2) * w2;
            case 125 * d2:
            case 59:
            case 0:
              switch (m2) {
                case 0:
                case 125:
                  b2 = 0;
                case 59 + f2:
                  h2 > 0 && C(y2) - l2 && R(h2 > 32 ? ae(y2 + ";", c2, a2, l2 - 1) : ae(T(y2, " ", "") + ";", c2, a2, l2 - 2), u2);
                  break;
                case 59:
                  y2 += ";";
                default:
                  if (R(E2 = ee(y2, r3, a2, o2, f2, t2, i2, g2, $2 = [], x2 = [], l2), n2), m2 === 123)
                    if (f2 === 0)
                      X(y2, r3, E2, E2, $2, n2, l2, i2, x2);
                    else
                      switch (p2 === 99 && A(y2, 3) === 110 ? 100 : p2) {
                        case 100:
                        case 109:
                        case 115:
                          X(e2, E2, E2, c2 && R(ee(e2, E2, E2, 0, 0, t2, i2, g2, t2, $2 = [], l2), x2), t2, x2, l2, i2, c2 ? $2 : x2);
                          break;
                        default:
                          X(y2, E2, E2, E2, [""], x2, 0, i2, x2);
                      }
              }
              o2 = f2 = h2 = 0, d2 = w2 = 1, g2 = y2 = "", l2 = s2;
              break;
            case 58:
              l2 = 1 + C(y2), h2 = v2;
            default:
              if (d2 < 1) {
                if (m2 == 123)
                  --d2;
                else if (m2 == 125 && d2++ == 0 && U() == 125)
                  continue;
              }
              switch (y2 += k(m2), m2 * d2) {
                case 38:
                  w2 = f2 > 0 ? 1 : (y2 += "\f", -1);
                  break;
                case 44:
                  i2[o2++] = (C(y2) - 1) * w2, w2 = 1;
                  break;
                case 64:
                  F() === 45 && (y2 += W(_2())), p2 = F(), f2 = l2 = C(g2 = y2 += J(I())), m2++;
                  break;
                case 45:
                  v2 === 45 && C(y2) == 2 && (d2 = 0);
              }
          }
        return n2;
      }
      function ee(e2, r3, a2, c2, t2, s2, i2, u2, o2, f2, l2) {
        for (var p2 = t2 - 1, h2 = t2 === 0 ? s2 : [""], v2 = S(h2), d2 = 0, b2 = 0, w2 = 0; d2 < c2; ++d2)
          for (var m2 = 0, k2 = M(e2, p2 + 1, p2 = g(b2 = i2[d2])), $2 = e2; m2 < v2; ++m2)
            ($2 = E(b2 > 0 ? h2[m2] + " " + k2 : T(k2, /&\f/g, h2[m2]))) && (o2[w2++] = $2);
        return N(e2, r3, a2, t2 === 0 ? n : u2, o2, f2, l2);
      }
      function re(e2, r3, a2) {
        return N(e2, r3, a2, t, k(j()), M(e2, 2, -2), 0);
      }
      function ae(e2, r3, a2, c2) {
        return N(e2, r3, a2, s, M(e2, 0, c2), M(e2, c2 + 1, -1), c2);
      }
      function ce(e2, t2, n2) {
        switch (x(e2, t2)) {
          case 5103:
            return c + "print-" + e2 + e2;
          case 5737:
          case 4201:
          case 3177:
          case 3433:
          case 1641:
          case 4457:
          case 2921:
          case 5572:
          case 6356:
          case 5844:
          case 3191:
          case 6645:
          case 3005:
          case 6391:
          case 5879:
          case 5623:
          case 6135:
          case 4599:
          case 4855:
          case 4215:
          case 6389:
          case 5109:
          case 5365:
          case 5621:
          case 3829:
            return c + e2 + e2;
          case 4789:
            return a + e2 + e2;
          case 5349:
          case 4246:
          case 4810:
          case 6968:
          case 2756:
            return c + e2 + a + e2 + r2 + e2 + e2;
          case 5936:
            switch (A(e2, t2 + 11)) {
              case 114:
                return c + e2 + r2 + T(e2, /[svh]\w+-[tblr]{2}/, "tb") + e2;
              case 108:
                return c + e2 + r2 + T(e2, /[svh]\w+-[tblr]{2}/, "tb-rl") + e2;
              case 45:
                return c + e2 + r2 + T(e2, /[svh]\w+-[tblr]{2}/, "lr") + e2;
            }
          case 6828:
          case 4268:
          case 2903:
            return c + e2 + r2 + e2 + e2;
          case 6165:
            return c + e2 + r2 + "flex-" + e2 + e2;
          case 5187:
            return c + e2 + T(e2, /(\w+).+(:[^]+)/, c + "box-$1$2" + r2 + "flex-$1$2") + e2;
          case 5443:
            return c + e2 + r2 + "flex-item-" + T(e2, /flex-|-self/g, "") + (y(e2, /flex-|baseline/) ? "" : r2 + "grid-row-" + T(e2, /flex-|-self/g, "")) + e2;
          case 4675:
            return c + e2 + r2 + "flex-line-pack" + T(e2, /align-content|flex-|-self/g, "") + e2;
          case 5548:
            return c + e2 + r2 + T(e2, "shrink", "negative") + e2;
          case 5292:
            return c + e2 + r2 + T(e2, "basis", "preferred-size") + e2;
          case 6060:
            return c + "box-" + T(e2, "-grow", "") + c + e2 + r2 + T(e2, "grow", "positive") + e2;
          case 4554:
            return c + T(e2, /([^-])(transform)/g, "$1" + c + "$2") + e2;
          case 6187:
            return T(T(T(e2, /(zoom-|grab)/, c + "$1"), /(image-set)/, c + "$1"), e2, "") + e2;
          case 5495:
          case 3959:
            return T(e2, /(image-set\([^]*)/, c + "$1$`$1");
          case 4968:
            return T(T(e2, /(.+:)(flex-)?(.*)/, c + "box-pack:$3" + r2 + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + c + e2 + e2;
          case 4200:
            if (!y(e2, /flex-|baseline/))
              return r2 + "grid-column-align" + M(e2, t2) + e2;
            break;
          case 2592:
          case 3360:
            return r2 + T(e2, "template-", "") + e2;
          case 4384:
          case 3616:
            return n2 && n2.some(function(e3, r3) {
              return t2 = r3, y(e3.props, /grid-\w+-end/);
            }) ? ~O(e2 + (n2 = n2[t2].value), "span") ? e2 : r2 + T(e2, "-start", "") + e2 + r2 + "grid-row-span:" + (~O(n2, "span") ? y(n2, /\d+/) : +y(n2, /\d+/) - +y(e2, /\d+/)) + ";" : r2 + T(e2, "-start", "") + e2;
          case 4896:
          case 4128:
            return n2 && n2.some(function(e3) {
              return y(e3.props, /grid-\w+-start/);
            }) ? e2 : r2 + T(T(e2, "-end", "-span"), "span ", "") + e2;
          case 4095:
          case 3583:
          case 4068:
          case 2532:
            return T(e2, /(.+)-inline(.+)/, c + "$1$2") + e2;
          case 8116:
          case 7059:
          case 5753:
          case 5535:
          case 5445:
          case 5701:
          case 4933:
          case 4677:
          case 5533:
          case 5789:
          case 5021:
          case 4765:
            if (C(e2) - 1 - t2 > 6)
              switch (A(e2, t2 + 1)) {
                case 109:
                  if (A(e2, t2 + 4) !== 45)
                    break;
                case 102:
                  return T(e2, /(.+:)(.+)-([^]+)/, "$1" + c + "$2-$3$1" + a + (A(e2, t2 + 3) == 108 ? "$3" : "$2-$3")) + e2;
                case 115:
                  return ~O(e2, "stretch") ? ce(T(e2, "stretch", "fill-available"), t2, n2) + e2 : e2;
              }
            break;
          case 5152:
          case 5920:
            return T(e2, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(a2, c2, t3, n3, s2, i2, u2) {
              return r2 + c2 + ":" + t3 + u2 + (n3 ? r2 + c2 + "-span:" + (s2 ? i2 : +i2 - +t3) + u2 : "") + e2;
            });
          case 4949:
            if (A(e2, t2 + 6) === 121)
              return T(e2, ":", ":" + c) + e2;
            break;
          case 6444:
            switch (A(e2, A(e2, 14) === 45 ? 18 : 11)) {
              case 120:
                return T(e2, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + c + (A(e2, 14) === 45 ? "inline-" : "") + "box$3$1" + c + "$2$3$1" + r2 + "$2box$3") + e2;
              case 100:
                return T(e2, ":", ":" + r2) + e2;
            }
            break;
          case 5719:
          case 2647:
          case 2135:
          case 3927:
          case 2391:
            return T(e2, "scroll-", "scroll-snap-") + e2;
        }
        return e2;
      }
      function te(e2, r3) {
        for (var a2 = "", c2 = S(e2), t2 = 0; t2 < c2; t2++)
          a2 += r3(e2[t2], t2, e2, r3) || "";
        return a2;
      }
      function ne(e2, r3, a2, c2) {
        switch (e2.type) {
          case o:
          case s:
            return e2.return = e2.return || e2.value;
          case t:
            return "";
          case d:
            return e2.return = e2.value + "{" + te(e2.children, c2) + "}";
          case n:
            e2.value = e2.props.join(",");
        }
        return C(a2 = te(e2.children, c2)) ? e2.return = e2.value + "{" + a2 + "}" : "";
      }
      function se(e2) {
        var r3 = S(e2);
        return function(a2, c2, t2, n2) {
          for (var s2 = "", i2 = 0; i2 < r3; i2++)
            s2 += e2[i2](a2, c2, t2, n2) || "";
          return s2;
        };
      }
      function ie(e2) {
        return function(r3) {
          r3.root || (r3 = r3.return) && e2(r3);
        };
      }
      function ue(e2, t2, i2, u2) {
        if (e2.length > -1 && !e2.return)
          switch (e2.type) {
            case s:
              e2.return = ce(e2.value, e2.length, i2);
              return;
            case d:
              return te([P(e2, { value: T(e2.value, "@", "@" + c) })], u2);
            case n:
              if (e2.length)
                return z(e2.props, function(t3) {
                  switch (y(t3, /(::plac\w+|:read-\w+)/)) {
                    case ":read-only":
                    case ":read-write":
                      return te([P(e2, { props: [T(t3, /:(read-\w+)/, ":" + a + "$1")] })], u2);
                    case "::placeholder":
                      return te([P(e2, { props: [T(t3, /:(plac\w+)/, ":" + c + "input-$1")] }), P(e2, { props: [T(t3, /:(plac\w+)/, ":" + a + "$1")] }), P(e2, { props: [T(t3, /:(plac\w+)/, r2 + "input-$1")] })], u2);
                  }
                  return "";
                });
          }
      }
      function oe(e2) {
        switch (e2.type) {
          case n:
            e2.props = e2.props.map(function(r3) {
              return z(Y(r3), function(r4, a2, c2) {
                switch (A(r4, 0)) {
                  case 12:
                    return M(r4, 1, C(r4));
                  case 0:
                  case 40:
                  case 43:
                  case 62:
                  case 126:
                    return r4;
                  case 58:
                    c2[++a2] === "global" && (c2[a2] = "", c2[++a2] = "\f" + M(c2[a2], a2 = 1, -1));
                  case 32:
                    return a2 === 1 ? "" : r4;
                  default:
                    switch (a2) {
                      case 0:
                        return e2 = r4, S(c2) > 1 ? "" : r4;
                      case (a2 = S(c2) - 1):
                      case 2:
                        return a2 === 2 ? r4 + e2 + e2 : r4 + e2;
                      default:
                        return r4;
                    }
                }
              });
            });
        }
      }
      e.CHARSET = f, e.COMMENT = t, e.COUNTER_STYLE = w, e.DECLARATION = s, e.DOCUMENT = h, e.FONT_FACE = b, e.FONT_FEATURE_VALUES = m, e.IMPORT = o, e.KEYFRAMES = d, e.MEDIA = u, e.MOZ = a, e.MS = r2, e.NAMESPACE = v, e.PAGE = i, e.RULESET = n, e.SUPPORTS = p, e.VIEWPORT = l, e.WEBKIT = c, e.abs = g, e.alloc = K, e.append = R, e.assign = $, e.caret = I, e.char = j, e.charat = A, e.combine = z, e.comment = re, e.commenter = q, e.compile = Q, e.copy = P, e.dealloc = V, e.declaration = ae, e.delimit = W, e.delimiter = Z, e.escaping = H, e.from = k, e.hash = x, e.identifier = J, e.indexof = O, e.match = y, e.middleware = se, e.namespace = oe, e.next = _2, e.node = N, e.parse = X, e.peek = F, e.prefix = ce, e.prefixer = ue, e.prev = U, e.replace = T, e.ruleset = ee, e.rulesheet = ie, e.serialize = te, e.sizeof = S, e.slice = L, e.stringify = ne, e.strlen = C, e.substr = M, e.token = D, e.tokenize = Y, e.tokenizer = G, e.trim = E, e.whitespace = B, Object.defineProperty(e, "__esModule", { value: !0 });
    });
  }
});

// node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.dev.js
var require_emotion_weak_memoize_cjs_dev = __commonJS({
  "node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var weakMemoize = function(func) {
      var cache = /* @__PURE__ */ new WeakMap();
      return function(arg) {
        if (cache.has(arg))
          return cache.get(arg);
        var ret = func(arg);
        return cache.set(arg, ret), ret;
      };
    };
    exports.default = weakMemoize;
  }
});

// node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.js
var require_emotion_weak_memoize_cjs = __commonJS({
  "node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.js"(exports, module) {
    "use strict";
    module.exports = require_emotion_weak_memoize_cjs_dev();
  }
});

// node_modules/@emotion/cache/dist/emotion-cache.cjs.dev.js
var require_emotion_cache_cjs_dev = __commonJS({
  "node_modules/@emotion/cache/dist/emotion-cache.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var sheet = require_emotion_sheet_cjs(), stylis = require_stylis(), weakMemoize = require_emotion_weak_memoize_cjs(), memoize2 = require_emotion_memoize_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var weakMemoize__default = /* @__PURE__ */ _interopDefault(weakMemoize), memoize__default = /* @__PURE__ */ _interopDefault(memoize2), identifierWithPointTracking = function(begin, points, index) {
      for (var previous = 0, character = 0; previous = character, character = stylis.peek(), previous === 38 && character === 12 && (points[index] = 1), !stylis.token(character); )
        stylis.next();
      return stylis.slice(begin, stylis.position);
    }, toRules = function(parsed, points) {
      var index = -1, character = 44;
      do
        switch (stylis.token(character)) {
          case 0:
            character === 38 && stylis.peek() === 12 && (points[index] = 1), parsed[index] += identifierWithPointTracking(stylis.position - 1, points, index);
            break;
          case 2:
            parsed[index] += stylis.delimit(character);
            break;
          case 4:
            if (character === 44) {
              parsed[++index] = stylis.peek() === 58 ? "&\f" : "", points[index] = parsed[index].length;
              break;
            }
          default:
            parsed[index] += stylis.from(character);
        }
      while (character = stylis.next());
      return parsed;
    }, getRules = function(value, points) {
      return stylis.dealloc(toRules(stylis.alloc(value), points));
    }, fixedElements = /* @__PURE__ */ new WeakMap(), compat = function(element) {
      if (!(element.type !== "rule" || !element.parent || element.length < 1)) {
        for (var value = element.value, parent = element.parent, isImplicitRule = element.column === parent.column && element.line === parent.line; parent.type !== "rule"; )
          if (parent = parent.parent, !parent)
            return;
        if (!(element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) && !isImplicitRule) {
          fixedElements.set(element, !0);
          for (var points = [], rules = getRules(value, points), parentRules = parent.props, i = 0, k = 0; i < rules.length; i++)
            for (var j = 0; j < parentRules.length; j++, k++)
              element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
        }
      }
    }, removeLabel = function(element) {
      if (element.type === "decl") {
        var value = element.value;
        value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98 && (element.return = "", element.value = "");
      }
    }, ignoreFlag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason", isIgnoringComment = function(element) {
      return element.type === "comm" && element.children.indexOf(ignoreFlag) > -1;
    }, createUnsafeSelectorsAlarm = function(cache) {
      return function(element, index, children) {
        if (!(element.type !== "rule" || cache.compat)) {
          var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
          if (unsafePseudoClasses) {
            for (var isNested = element.parent === children[0], commentContainer = isNested ? children[0].children : children, i = commentContainer.length - 1; i >= 0; i--) {
              var node = commentContainer[i];
              if (node.line < element.line)
                break;
              if (node.column < element.column) {
                if (isIgnoringComment(node))
                  return;
                break;
              }
            }
            unsafePseudoClasses.forEach(function(unsafePseudoClass) {
              console.error('The pseudo class "' + unsafePseudoClass + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + unsafePseudoClass.split("-child")[0] + '-of-type".');
            });
          }
        }
      };
    }, isImportRule = function(element) {
      return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
    }, isPrependedWithRegularRules = function(index, children) {
      for (var i = index - 1; i >= 0; i--)
        if (!isImportRule(children[i]))
          return !0;
      return !1;
    }, nullifyElement = function(element) {
      element.type = "", element.value = "", element.return = "", element.children = "", element.props = "";
    }, incorrectImportAlarm = function(element, index, children) {
      !isImportRule(element) || (element.parent ? (console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."), nullifyElement(element)) : isPrependedWithRegularRules(index, children) && (console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."), nullifyElement(element)));
    };
    function prefix(value, length) {
      switch (stylis.hash(value, length)) {
        case 5103:
          return stylis.WEBKIT + "print-" + value + value;
        case 5737:
        case 4201:
        case 3177:
        case 3433:
        case 1641:
        case 4457:
        case 2921:
        case 5572:
        case 6356:
        case 5844:
        case 3191:
        case 6645:
        case 3005:
        case 6391:
        case 5879:
        case 5623:
        case 6135:
        case 4599:
        case 4855:
        case 4215:
        case 6389:
        case 5109:
        case 5365:
        case 5621:
        case 3829:
          return stylis.WEBKIT + value + value;
        case 5349:
        case 4246:
        case 4810:
        case 6968:
        case 2756:
          return stylis.WEBKIT + value + stylis.MOZ + value + stylis.MS + value + value;
        case 6828:
        case 4268:
          return stylis.WEBKIT + value + stylis.MS + value + value;
        case 6165:
          return stylis.WEBKIT + value + stylis.MS + "flex-" + value + value;
        case 5187:
          return stylis.WEBKIT + value + stylis.replace(value, /(\w+).+(:[^]+)/, stylis.WEBKIT + "box-$1$2" + stylis.MS + "flex-$1$2") + value;
        case 5443:
          return stylis.WEBKIT + value + stylis.MS + "flex-item-" + stylis.replace(value, /flex-|-self/, "") + value;
        case 4675:
          return stylis.WEBKIT + value + stylis.MS + "flex-line-pack" + stylis.replace(value, /align-content|flex-|-self/, "") + value;
        case 5548:
          return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, "shrink", "negative") + value;
        case 5292:
          return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, "basis", "preferred-size") + value;
        case 6060:
          return stylis.WEBKIT + "box-" + stylis.replace(value, "-grow", "") + stylis.WEBKIT + value + stylis.MS + stylis.replace(value, "grow", "positive") + value;
        case 4554:
          return stylis.WEBKIT + stylis.replace(value, /([^-])(transform)/g, "$1" + stylis.WEBKIT + "$2") + value;
        case 6187:
          return stylis.replace(stylis.replace(stylis.replace(value, /(zoom-|grab)/, stylis.WEBKIT + "$1"), /(image-set)/, stylis.WEBKIT + "$1"), value, "") + value;
        case 5495:
        case 3959:
          return stylis.replace(value, /(image-set\([^]*)/, stylis.WEBKIT + "$1$`$1");
        case 4968:
          return stylis.replace(stylis.replace(value, /(.+:)(flex-)?(.*)/, stylis.WEBKIT + "box-pack:$3" + stylis.MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + stylis.WEBKIT + value + value;
        case 4095:
        case 3583:
        case 4068:
        case 2532:
          return stylis.replace(value, /(.+)-inline(.+)/, stylis.WEBKIT + "$1$2") + value;
        case 8116:
        case 7059:
        case 5753:
        case 5535:
        case 5445:
        case 5701:
        case 4933:
        case 4677:
        case 5533:
        case 5789:
        case 5021:
        case 4765:
          if (stylis.strlen(value) - 1 - length > 6)
            switch (stylis.charat(value, length + 1)) {
              case 109:
                if (stylis.charat(value, length + 4) !== 45)
                  break;
              case 102:
                return stylis.replace(value, /(.+:)(.+)-([^]+)/, "$1" + stylis.WEBKIT + "$2-$3$1" + stylis.MOZ + (stylis.charat(value, length + 3) == 108 ? "$3" : "$2-$3")) + value;
              case 115:
                return ~stylis.indexof(value, "stretch") ? prefix(stylis.replace(value, "stretch", "fill-available"), length) + value : value;
            }
          break;
        case 4949:
          if (stylis.charat(value, length + 1) !== 115)
            break;
        case 6444:
          switch (stylis.charat(value, stylis.strlen(value) - 3 - (~stylis.indexof(value, "!important") && 10))) {
            case 107:
              return stylis.replace(value, ":", ":" + stylis.WEBKIT) + value;
            case 101:
              return stylis.replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + stylis.WEBKIT + (stylis.charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + stylis.WEBKIT + "$2$3$1" + stylis.MS + "$2box$3") + value;
          }
          break;
        case 5936:
          switch (stylis.charat(value, length + 11)) {
            case 114:
              return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
            case 108:
              return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
            case 45:
              return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
          }
          return stylis.WEBKIT + value + stylis.MS + value + value;
      }
      return value;
    }
    var prefixer = function(element, index, children, callback) {
      if (element.length > -1 && !element.return)
        switch (element.type) {
          case stylis.DECLARATION:
            element.return = prefix(element.value, element.length);
            break;
          case stylis.KEYFRAMES:
            return stylis.serialize([stylis.copy(element, {
              value: stylis.replace(element.value, "@", "@" + stylis.WEBKIT)
            })], callback);
          case stylis.RULESET:
            if (element.length)
              return stylis.combine(element.props, function(value) {
                switch (stylis.match(value, /(::plac\w+|:read-\w+)/)) {
                  case ":read-only":
                  case ":read-write":
                    return stylis.serialize([stylis.copy(element, {
                      props: [stylis.replace(value, /:(read-\w+)/, ":" + stylis.MOZ + "$1")]
                    })], callback);
                  case "::placeholder":
                    return stylis.serialize([stylis.copy(element, {
                      props: [stylis.replace(value, /:(plac\w+)/, ":" + stylis.WEBKIT + "input-$1")]
                    }), stylis.copy(element, {
                      props: [stylis.replace(value, /:(plac\w+)/, ":" + stylis.MOZ + "$1")]
                    }), stylis.copy(element, {
                      props: [stylis.replace(value, /:(plac\w+)/, stylis.MS + "input-$1")]
                    })], callback);
                }
                return "";
              });
        }
    }, isBrowser3 = typeof document < "u", getServerStylisCache = isBrowser3 ? void 0 : weakMemoize__default.default(function() {
      return memoize__default.default(function() {
        var cache = {};
        return function(name) {
          return cache[name];
        };
      });
    }), defaultStylisPlugins = [prefixer], createCache = function(options) {
      var key = options.key;
      if (!key)
        throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
      if (isBrowser3 && key === "css") {
        var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
        Array.prototype.forEach.call(ssrStyles, function(node) {
          var dataEmotionAttribute = node.getAttribute("data-emotion");
          dataEmotionAttribute.indexOf(" ") !== -1 && (document.head.appendChild(node), node.setAttribute("data-s", ""));
        });
      }
      var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
      if (/[^a-z-]/.test(key))
        throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
      var inserted = {}, container, nodesToHydrate = [];
      isBrowser3 && (container = options.container || document.head, Array.prototype.forEach.call(
        document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
        function(node) {
          for (var attrib = node.getAttribute("data-emotion").split(" "), i = 1; i < attrib.length; i++)
            inserted[attrib[i]] = !0;
          nodesToHydrate.push(node);
        }
      ));
      var _insert, omnipresentPlugins = [compat, removeLabel];
      if (omnipresentPlugins.push(createUnsafeSelectorsAlarm({
        get compat() {
          return cache.compat;
        }
      }), incorrectImportAlarm), isBrowser3) {
        var currentSheet, finalizingPlugins = [stylis.stringify, function(element) {
          element.root || (element.return ? currentSheet.insert(element.return) : element.value && element.type !== stylis.COMMENT && currentSheet.insert(element.value + "{}"));
        }], serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins)), stylis$1 = function(styles) {
          return stylis.serialize(stylis.compile(styles), serializer);
        };
        _insert = function(selector, serialized, sheet2, shouldCache) {
          currentSheet = sheet2, serialized.map !== void 0 && (currentSheet = {
            insert: function(rule) {
              sheet2.insert(rule + serialized.map);
            }
          }), stylis$1(selector ? selector + "{" + serialized.styles + "}" : serialized.styles), shouldCache && (cache.inserted[serialized.name] = !0);
        };
      } else {
        var _finalizingPlugins = [stylis.stringify], _serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins)), _stylis = function(styles) {
          return stylis.serialize(stylis.compile(styles), _serializer);
        }, serverStylisCache = getServerStylisCache(stylisPlugins)(key), getRules2 = function(selector, serialized) {
          var name = serialized.name;
          return serverStylisCache[name] === void 0 && (serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles)), serverStylisCache[name];
        };
        _insert = function(selector, serialized, sheet2, shouldCache) {
          var name = serialized.name, rules = getRules2(selector, serialized);
          if (cache.compat === void 0)
            return shouldCache && (cache.inserted[name] = !0), serialized.map !== void 0 ? rules + serialized.map : rules;
          if (shouldCache)
            cache.inserted[name] = rules;
          else
            return rules;
        };
      }
      var cache = {
        key,
        sheet: new sheet.StyleSheet({
          key,
          container,
          nonce: options.nonce,
          speedy: options.speedy,
          prepend: options.prepend,
          insertionPoint: options.insertionPoint
        }),
        nonce: options.nonce,
        inserted,
        registered: {},
        insert: _insert
      };
      return cache.sheet.hydrate(nodesToHydrate), cache;
    };
    exports.default = createCache;
  }
});

// node_modules/@emotion/cache/dist/emotion-cache.cjs.js
var require_emotion_cache_cjs = __commonJS({
  "node_modules/@emotion/cache/dist/emotion-cache.cjs.js"(exports, module) {
    "use strict";
    module.exports = require_emotion_cache_cjs_dev();
  }
});

// node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development3 = __commonJS({
  "node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var hasSymbol = typeof Symbol == "function" && Symbol.for, REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103, REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106, REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107, REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108, REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114, REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109, REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110, REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111, REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111, REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112, REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113, REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120, REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115, REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116, REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121, REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117, REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118, REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
      function isValidElementType(type) {
        return typeof type == "string" || typeof type == "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
      }
      function typeOf(object) {
        if (typeof object == "object" && object !== null) {
          var $$typeof = object.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;
              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;
                default:
                  var $$typeofType = type && type.$$typeof;
                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;
                    default:
                      return $$typeof;
                  }
              }
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }
      }
      var AsyncMode = REACT_ASYNC_MODE_TYPE, ConcurrentMode = REACT_CONCURRENT_MODE_TYPE, ContextConsumer = REACT_CONTEXT_TYPE, ContextProvider = REACT_PROVIDER_TYPE, Element = REACT_ELEMENT_TYPE, ForwardRef2 = REACT_FORWARD_REF_TYPE, Fragment3 = REACT_FRAGMENT_TYPE, Lazy = REACT_LAZY_TYPE, Memo2 = REACT_MEMO_TYPE, Portal = REACT_PORTAL_TYPE, Profiler = REACT_PROFILER_TYPE, StrictMode = REACT_STRICT_MODE_TYPE, Suspense2 = REACT_SUSPENSE_TYPE, hasWarnedAboutDeprecatedIsAsyncMode = !1;
      function isAsyncMode(object) {
        return hasWarnedAboutDeprecatedIsAsyncMode || (hasWarnedAboutDeprecatedIsAsyncMode = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }
      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }
      exports.AsyncMode = AsyncMode, exports.ConcurrentMode = ConcurrentMode, exports.ContextConsumer = ContextConsumer, exports.ContextProvider = ContextProvider, exports.Element = Element, exports.ForwardRef = ForwardRef2, exports.Fragment = Fragment3, exports.Lazy = Lazy, exports.Memo = Memo2, exports.Portal = Portal, exports.Profiler = Profiler, exports.StrictMode = StrictMode, exports.Suspense = Suspense2, exports.isAsyncMode = isAsyncMode, exports.isConcurrentMode = isConcurrentMode, exports.isContextConsumer = isContextConsumer, exports.isContextProvider = isContextProvider, exports.isElement = isElement, exports.isForwardRef = isForwardRef, exports.isFragment = isFragment, exports.isLazy = isLazy, exports.isMemo = isMemo, exports.isPortal = isPortal, exports.isProfiler = isProfiler, exports.isStrictMode = isStrictMode, exports.isSuspense = isSuspense, exports.isValidElementType = isValidElementType, exports.typeOf = typeOf;
    })();
  }
});

// node_modules/hoist-non-react-statics/node_modules/react-is/index.js
var require_react_is3 = __commonJS({
  "node_modules/hoist-non-react-statics/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    module.exports = require_react_is_development3();
  }
});

// node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = __commonJS({
  "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"(exports, module) {
    "use strict";
    var reactIs = require_react_is3(), REACT_STATICS = {
      childContextTypes: !0,
      contextType: !0,
      contextTypes: !0,
      defaultProps: !0,
      displayName: !0,
      getDefaultProps: !0,
      getDerivedStateFromError: !0,
      getDerivedStateFromProps: !0,
      mixins: !0,
      propTypes: !0,
      type: !0
    }, KNOWN_STATICS = {
      name: !0,
      length: !0,
      prototype: !0,
      caller: !0,
      callee: !0,
      arguments: !0,
      arity: !0
    }, FORWARD_REF_STATICS = {
      $$typeof: !0,
      render: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0
    }, MEMO_STATICS = {
      $$typeof: !0,
      compare: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
      type: !0
    }, TYPE_STATICS = {};
    TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
    TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
    function getStatics(component) {
      return reactIs.isMemo(component) ? MEMO_STATICS : TYPE_STATICS[component.$$typeof] || REACT_STATICS;
    }
    var defineProperty = Object.defineProperty, getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, getPrototypeOf = Object.getPrototypeOf, objectPrototype = Object.prototype;
    function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent != "string") {
        if (objectPrototype) {
          var inheritedComponent = getPrototypeOf(sourceComponent);
          inheritedComponent && inheritedComponent !== objectPrototype && hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
        }
        var keys2 = getOwnPropertyNames(sourceComponent);
        getOwnPropertySymbols && (keys2 = keys2.concat(getOwnPropertySymbols(sourceComponent)));
        for (var targetStatics = getStatics(targetComponent), sourceStatics = getStatics(sourceComponent), i = 0; i < keys2.length; ++i) {
          var key = keys2[i];
          if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
            var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
            try {
              defineProperty(targetComponent, key, descriptor);
            } catch {
            }
          }
        }
      }
      return targetComponent;
    }
    module.exports = hoistNonReactStatics;
  }
});

// node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.dev.js
var require_emotion_react_isolated_hnrs_cjs_dev = __commonJS({
  "node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var hoistNonReactStatics$1 = require_hoist_non_react_statics_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var hoistNonReactStatics__default = /* @__PURE__ */ _interopDefault(hoistNonReactStatics$1), hoistNonReactStatics = function(targetComponent, sourceComponent) {
      return hoistNonReactStatics__default.default(targetComponent, sourceComponent);
    };
    exports.default = hoistNonReactStatics;
  }
});

// node_modules/@emotion/utils/dist/emotion-utils.cjs.dev.js
var require_emotion_utils_cjs_dev = __commonJS({
  "node_modules/@emotion/utils/dist/emotion-utils.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var isBrowser3 = typeof document < "u";
    function getRegisteredStyles(registered, registeredStyles, classNames) {
      var rawClassName = "";
      return classNames.split(" ").forEach(function(className) {
        registered[className] !== void 0 ? registeredStyles.push(registered[className] + ";") : rawClassName += className + " ";
      }), rawClassName;
    }
    var registerStyles = function(cache, serialized, isStringTag2) {
      var className = cache.key + "-" + serialized.name;
      (isStringTag2 === !1 || isBrowser3 === !1 && cache.compat !== void 0) && cache.registered[className] === void 0 && (cache.registered[className] = serialized.styles);
    }, insertStyles = function(cache, serialized, isStringTag2) {
      registerStyles(cache, serialized, isStringTag2);
      var className = cache.key + "-" + serialized.name;
      if (cache.inserted[serialized.name] === void 0) {
        var stylesForSSR = "", current = serialized;
        do {
          var maybeStyles = cache.insert(serialized === current ? "." + className : "", current, cache.sheet, !0);
          !isBrowser3 && maybeStyles !== void 0 && (stylesForSSR += maybeStyles), current = current.next;
        } while (current !== void 0);
        if (!isBrowser3 && stylesForSSR.length !== 0)
          return stylesForSSR;
      }
    };
    exports.getRegisteredStyles = getRegisteredStyles;
    exports.insertStyles = insertStyles;
    exports.registerStyles = registerStyles;
  }
});

// node_modules/@emotion/utils/dist/emotion-utils.cjs.js
var require_emotion_utils_cjs = __commonJS({
  "node_modules/@emotion/utils/dist/emotion-utils.cjs.js"(exports, module) {
    "use strict";
    module.exports = require_emotion_utils_cjs_dev();
  }
});

// node_modules/@emotion/hash/dist/emotion-hash.cjs.dev.js
var require_emotion_hash_cjs_dev = __commonJS({
  "node_modules/@emotion/hash/dist/emotion-hash.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    function murmur2(str) {
      for (var h = 0, k, i = 0, len = str.length; len >= 4; ++i, len -= 4)
        k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24, k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16), k ^= k >>> 24, h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
      switch (len) {
        case 3:
          h ^= (str.charCodeAt(i + 2) & 255) << 16;
        case 2:
          h ^= (str.charCodeAt(i + 1) & 255) << 8;
        case 1:
          h ^= str.charCodeAt(i) & 255, h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
      }
      return h ^= h >>> 13, h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16), ((h ^ h >>> 15) >>> 0).toString(36);
    }
    exports.default = murmur2;
  }
});

// node_modules/@emotion/hash/dist/emotion-hash.cjs.js
var require_emotion_hash_cjs = __commonJS({
  "node_modules/@emotion/hash/dist/emotion-hash.cjs.js"(exports, module) {
    "use strict";
    module.exports = require_emotion_hash_cjs_dev();
  }
});

// node_modules/@emotion/unitless/dist/emotion-unitless.cjs.dev.js
var require_emotion_unitless_cjs_dev = __commonJS({
  "node_modules/@emotion/unitless/dist/emotion-unitless.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var unitlessKeys = {
      animationIterationCount: 1,
      borderImageOutset: 1,
      borderImageSlice: 1,
      borderImageWidth: 1,
      boxFlex: 1,
      boxFlexGroup: 1,
      boxOrdinalGroup: 1,
      columnCount: 1,
      columns: 1,
      flex: 1,
      flexGrow: 1,
      flexPositive: 1,
      flexShrink: 1,
      flexNegative: 1,
      flexOrder: 1,
      gridRow: 1,
      gridRowEnd: 1,
      gridRowSpan: 1,
      gridRowStart: 1,
      gridColumn: 1,
      gridColumnEnd: 1,
      gridColumnSpan: 1,
      gridColumnStart: 1,
      msGridRow: 1,
      msGridRowSpan: 1,
      msGridColumn: 1,
      msGridColumnSpan: 1,
      fontWeight: 1,
      lineHeight: 1,
      opacity: 1,
      order: 1,
      orphans: 1,
      tabSize: 1,
      widows: 1,
      zIndex: 1,
      zoom: 1,
      WebkitLineClamp: 1,
      fillOpacity: 1,
      floodOpacity: 1,
      stopOpacity: 1,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      strokeMiterlimit: 1,
      strokeOpacity: 1,
      strokeWidth: 1
    };
    exports.default = unitlessKeys;
  }
});

// node_modules/@emotion/unitless/dist/emotion-unitless.cjs.js
var require_emotion_unitless_cjs = __commonJS({
  "node_modules/@emotion/unitless/dist/emotion-unitless.cjs.js"(exports, module) {
    "use strict";
    module.exports = require_emotion_unitless_cjs_dev();
  }
});

// node_modules/@emotion/serialize/dist/emotion-serialize.cjs.dev.js
var require_emotion_serialize_cjs_dev = __commonJS({
  "node_modules/@emotion/serialize/dist/emotion-serialize.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var hashString = require_emotion_hash_cjs(), unitless = require_emotion_unitless_cjs(), memoize2 = require_emotion_memoize_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var hashString__default = /* @__PURE__ */ _interopDefault(hashString), unitless__default = /* @__PURE__ */ _interopDefault(unitless), memoize__default = /* @__PURE__ */ _interopDefault(memoize2), ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`, UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).", hyphenateRegex = /[A-Z]|^ms/g, animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g, isCustomProperty = function(property) {
      return property.charCodeAt(1) === 45;
    }, isProcessableValue = function(value) {
      return value != null && typeof value != "boolean";
    }, processStyleName = /* @__PURE__ */ memoize__default.default(function(styleName) {
      return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
    }), processStyleValue = function(key, value) {
      switch (key) {
        case "animation":
        case "animationName":
          if (typeof value == "string")
            return value.replace(animationRegex, function(match, p1, p2) {
              return cursor = {
                name: p1,
                styles: p2,
                next: cursor
              }, p1;
            });
      }
      return unitless__default.default[key] !== 1 && !isCustomProperty(key) && typeof value == "number" && value !== 0 ? value + "px" : value;
    };
    contentValuePattern = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, contentValues = ["normal", "none", "initial", "inherit", "unset"], oldProcessStyleValue = processStyleValue, msPattern = /^-ms-/, hyphenPattern = /-(.)/g, hyphenatedCache = {}, processStyleValue = function(key, value) {
      if (key === "content" && (typeof value != "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")))
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      var processed = oldProcessStyleValue(key, value);
      return processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0 && (hyphenatedCache[key] = !0, console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
        return _char.toUpperCase();
      }) + "?")), processed;
    };
    var contentValuePattern, contentValues, oldProcessStyleValue, msPattern, hyphenPattern, hyphenatedCache, noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
    function handleInterpolation(mergedProps, registered, interpolation) {
      if (interpolation == null)
        return "";
      if (interpolation.__emotion_styles !== void 0) {
        if (interpolation.toString() === "NO_COMPONENT_SELECTOR")
          throw new Error(noComponentSelectorMessage);
        return interpolation;
      }
      switch (typeof interpolation) {
        case "boolean":
          return "";
        case "object": {
          if (interpolation.anim === 1)
            return cursor = {
              name: interpolation.name,
              styles: interpolation.styles,
              next: cursor
            }, interpolation.name;
          if (interpolation.styles !== void 0) {
            var next = interpolation.next;
            if (next !== void 0)
              for (; next !== void 0; )
                cursor = {
                  name: next.name,
                  styles: next.styles,
                  next: cursor
                }, next = next.next;
            var styles = interpolation.styles + ";";
            return interpolation.map !== void 0 && (styles += interpolation.map), styles;
          }
          return createStringFromObject(mergedProps, registered, interpolation);
        }
        case "function": {
          if (mergedProps !== void 0) {
            var previousCursor = cursor, result = interpolation(mergedProps);
            return cursor = previousCursor, handleInterpolation(mergedProps, registered, result);
          } else
            console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
          break;
        }
        case "string":
          var matched = [], replaced = interpolation.replace(animationRegex, function(match, p1, p2) {
            var fakeVarName = "animation" + matched.length;
            return matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`"), "${" + fakeVarName + "}";
          });
          matched.length && console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join(`
`) + `

You should wrap it with \`css\` like this:

` + ("css`" + replaced + "`"));
          break;
      }
      if (registered == null)
        return interpolation;
      var cached = registered[interpolation];
      return cached !== void 0 ? cached : interpolation;
    }
    function createStringFromObject(mergedProps, registered, obj) {
      var string = "";
      if (Array.isArray(obj))
        for (var i = 0; i < obj.length; i++)
          string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
      else
        for (var _key in obj) {
          var value = obj[_key];
          if (typeof value != "object")
            registered != null && registered[value] !== void 0 ? string += _key + "{" + registered[value] + "}" : isProcessableValue(value) && (string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";");
          else {
            if (_key === "NO_COMPONENT_SELECTOR")
              throw new Error(noComponentSelectorMessage);
            if (Array.isArray(value) && typeof value[0] == "string" && (registered == null || registered[value[0]] === void 0))
              for (var _i = 0; _i < value.length; _i++)
                isProcessableValue(value[_i]) && (string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";");
            else {
              var interpolated = handleInterpolation(mergedProps, registered, value);
              switch (_key) {
                case "animation":
                case "animationName": {
                  string += processStyleName(_key) + ":" + interpolated + ";";
                  break;
                }
                default:
                  _key === "undefined" && console.error(UNDEFINED_AS_OBJECT_KEY_ERROR), string += _key + "{" + interpolated + "}";
              }
            }
          }
        }
      return string;
    }
    var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g, sourceMapPattern;
    sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
    var cursor, serializeStyles = function(args, registered, mergedProps) {
      if (args.length === 1 && typeof args[0] == "object" && args[0] !== null && args[0].styles !== void 0)
        return args[0];
      var stringMode = !0, styles = "";
      cursor = void 0;
      var strings = args[0];
      strings == null || strings.raw === void 0 ? (stringMode = !1, styles += handleInterpolation(mergedProps, registered, strings)) : (strings[0] === void 0 && console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR), styles += strings[0]);
      for (var i = 1; i < args.length; i++)
        styles += handleInterpolation(mergedProps, registered, args[i]), stringMode && (strings[i] === void 0 && console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR), styles += strings[i]);
      var sourceMap;
      styles = styles.replace(sourceMapPattern, function(match2) {
        return sourceMap = match2, "";
      }), labelPattern.lastIndex = 0;
      for (var identifierName = "", match; (match = labelPattern.exec(styles)) !== null; )
        identifierName += "-" + match[1];
      var name = hashString__default.default(styles) + identifierName;
      return {
        name,
        styles,
        map: sourceMap,
        next: cursor,
        toString: function() {
          return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
        }
      };
    };
    exports.serializeStyles = serializeStyles;
  }
});

// node_modules/@emotion/serialize/dist/emotion-serialize.cjs.js
var require_emotion_serialize_cjs = __commonJS({
  "node_modules/@emotion/serialize/dist/emotion-serialize.cjs.js"(exports, module) {
    "use strict";
    module.exports = require_emotion_serialize_cjs_dev();
  }
});

// node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.cjs.dev.js
var require_emotion_use_insertion_effect_with_fallbacks_cjs_dev = __commonJS({
  "node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var React37 = require_react();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      return e && Object.keys(e).forEach(function(k) {
        if (k !== "default") {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: !0,
            get: function() {
              return e[k];
            }
          });
        }
      }), n.default = e, Object.freeze(n);
    }
    var React__namespace = /* @__PURE__ */ _interopNamespace(React37), isBrowser3 = typeof document < "u", syncFallback = function(create) {
      return create();
    }, useInsertionEffect = React__namespace["useInsertionEffect"] ? React__namespace["useInsertionEffect"] : !1, useInsertionEffectAlwaysWithSyncFallback = isBrowser3 && useInsertionEffect || syncFallback, useInsertionEffectWithLayoutFallback = useInsertionEffect || React37.useLayoutEffect;
    exports.useInsertionEffectAlwaysWithSyncFallback = useInsertionEffectAlwaysWithSyncFallback;
    exports.useInsertionEffectWithLayoutFallback = useInsertionEffectWithLayoutFallback;
  }
});

// node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.cjs.js
var require_emotion_use_insertion_effect_with_fallbacks_cjs = __commonJS({
  "node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.cjs.js"(exports, module) {
    "use strict";
    module.exports = require_emotion_use_insertion_effect_with_fallbacks_cjs_dev();
  }
});

// node_modules/@emotion/react/dist/emotion-element-b63ca7c6.cjs.dev.js
var require_emotion_element_b63ca7c6_cjs_dev = __commonJS({
  "node_modules/@emotion/react/dist/emotion-element-b63ca7c6.cjs.dev.js"(exports) {
    "use strict";
    var React37 = require_react(), createCache = require_emotion_cache_cjs(), _extends6 = require_extends(), weakMemoize = require_emotion_weak_memoize_cjs(), _isolatedHnrs_dist_emotionReact_isolatedHnrs = require_emotion_react_isolated_hnrs_cjs_dev(), utils = require_emotion_utils_cjs(), serialize2 = require_emotion_serialize_cjs(), useInsertionEffectWithFallbacks = require_emotion_use_insertion_effect_with_fallbacks_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var createCache__default = /* @__PURE__ */ _interopDefault(createCache), weakMemoize__default = /* @__PURE__ */ _interopDefault(weakMemoize), isBrowser3 = typeof document < "u", hasOwnProperty2 = {}.hasOwnProperty, EmotionCacheContext = /* @__PURE__ */ React37.createContext(
      typeof HTMLElement < "u" ? /* @__PURE__ */ createCache__default.default({
        key: "css"
      }) : null
    );
    EmotionCacheContext.displayName = "EmotionCacheContext";
    var CacheProvider = EmotionCacheContext.Provider, __unsafe_useEmotionCache = function() {
      return React37.useContext(EmotionCacheContext);
    };
    exports.withEmotionCache = function(func) {
      return /* @__PURE__ */ React37.forwardRef(function(props, ref) {
        var cache = React37.useContext(EmotionCacheContext);
        return func(props, cache, ref);
      });
    };
    isBrowser3 || (exports.withEmotionCache = function(func) {
      return function(props) {
        var cache = React37.useContext(EmotionCacheContext);
        return cache === null ? (cache = createCache__default.default({
          key: "css"
        }), /* @__PURE__ */ React37.createElement(EmotionCacheContext.Provider, {
          value: cache
        }, func(props, cache))) : func(props, cache);
      };
    });
    var ThemeContext3 = /* @__PURE__ */ React37.createContext({});
    ThemeContext3.displayName = "EmotionThemeContext";
    var useTheme4 = function() {
      return React37.useContext(ThemeContext3);
    }, getTheme = function(outerTheme, theme) {
      if (typeof theme == "function") {
        var mergedTheme = theme(outerTheme);
        if (mergedTheme == null || typeof mergedTheme != "object" || Array.isArray(mergedTheme))
          throw new Error("[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!");
        return mergedTheme;
      }
      if (theme == null || typeof theme != "object" || Array.isArray(theme))
        throw new Error("[ThemeProvider] Please make your theme prop a plain object");
      return _extends6({}, outerTheme, theme);
    }, createCacheWithTheme = /* @__PURE__ */ weakMemoize__default.default(function(outerTheme) {
      return weakMemoize__default.default(function(theme) {
        return getTheme(outerTheme, theme);
      });
    }), ThemeProvider = function(props) {
      var theme = React37.useContext(ThemeContext3);
      return props.theme !== theme && (theme = createCacheWithTheme(theme)(props.theme)), /* @__PURE__ */ React37.createElement(ThemeContext3.Provider, {
        value: theme
      }, props.children);
    };
    function withTheme(Component2) {
      var componentName = Component2.displayName || Component2.name || "Component", render = function(props, ref) {
        var theme = React37.useContext(ThemeContext3);
        return /* @__PURE__ */ React37.createElement(Component2, _extends6({
          theme,
          ref
        }, props));
      }, WithTheme = /* @__PURE__ */ React37.forwardRef(render);
      return WithTheme.displayName = "WithTheme(" + componentName + ")", _isolatedHnrs_dist_emotionReact_isolatedHnrs.default(WithTheme, Component2);
    }
    var getLastPart = function(functionName) {
      var parts = functionName.split(".");
      return parts[parts.length - 1];
    }, getFunctionNameFromStackTraceLine = function(line) {
      var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
      if (match || (match = /^([A-Za-z0-9$.]+)@/.exec(line), match))
        return getLastPart(match[1]);
    }, internalReactFunctionNames = /* @__PURE__ */ new Set(["renderWithHooks", "processChild", "finishClassComponent", "renderToString"]), sanitizeIdentifier = function(identifier) {
      return identifier.replace(/\$/g, "-");
    }, getLabelFromStackTrace = function(stackTrace) {
      if (!!stackTrace)
        for (var lines = stackTrace.split(`
`), i = 0; i < lines.length; i++) {
          var functionName = getFunctionNameFromStackTraceLine(lines[i]);
          if (!!functionName) {
            if (internalReactFunctionNames.has(functionName))
              break;
            if (/^[A-Z]/.test(functionName))
              return sanitizeIdentifier(functionName);
          }
        }
    }, typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", labelPropName = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__", createEmotionProps = function(type, props) {
      if (typeof props.css == "string" && props.css.indexOf(":") !== -1)
        throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
      var newProps = {};
      for (var key in props)
        hasOwnProperty2.call(props, key) && (newProps[key] = props[key]);
      if (newProps[typePropName] = type, !!props.css && (typeof props.css != "object" || typeof props.css.name != "string" || props.css.name.indexOf("-") === -1)) {
        var label = getLabelFromStackTrace(new Error().stack);
        label && (newProps[labelPropName] = label);
      }
      return newProps;
    }, Insertion = function(_ref) {
      var cache = _ref.cache, serialized = _ref.serialized, isStringTag2 = _ref.isStringTag;
      utils.registerStyles(cache, serialized, isStringTag2);
      var rules = useInsertionEffectWithFallbacks.useInsertionEffectAlwaysWithSyncFallback(function() {
        return utils.insertStyles(cache, serialized, isStringTag2);
      });
      if (!isBrowser3 && rules !== void 0) {
        for (var _ref2, serializedNames = serialized.name, next = serialized.next; next !== void 0; )
          serializedNames += " " + next.name, next = next.next;
        return /* @__PURE__ */ React37.createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedNames, _ref2.dangerouslySetInnerHTML = {
          __html: rules
        }, _ref2.nonce = cache.sheet.nonce, _ref2));
      }
      return null;
    }, Emotion = /* @__PURE__ */ exports.withEmotionCache(function(props, cache, ref) {
      var cssProp = props.css;
      typeof cssProp == "string" && cache.registered[cssProp] !== void 0 && (cssProp = cache.registered[cssProp]);
      var WrappedComponent = props[typePropName], registeredStyles = [cssProp], className = "";
      typeof props.className == "string" ? className = utils.getRegisteredStyles(cache.registered, registeredStyles, props.className) : props.className != null && (className = props.className + " ");
      var serialized = serialize2.serializeStyles(registeredStyles, void 0, React37.useContext(ThemeContext3));
      if (serialized.name.indexOf("-") === -1) {
        var labelFromStack = props[labelPropName];
        labelFromStack && (serialized = serialize2.serializeStyles([serialized, "label:" + labelFromStack + ";"]));
      }
      className += cache.key + "-" + serialized.name;
      var newProps = {};
      for (var key in props)
        hasOwnProperty2.call(props, key) && key !== "css" && key !== typePropName && key !== labelPropName && (newProps[key] = props[key]);
      return newProps.ref = ref, newProps.className = className, /* @__PURE__ */ React37.createElement(React37.Fragment, null, /* @__PURE__ */ React37.createElement(Insertion, {
        cache,
        serialized,
        isStringTag: typeof WrappedComponent == "string"
      }), /* @__PURE__ */ React37.createElement(WrappedComponent, newProps));
    });
    Emotion.displayName = "EmotionCssPropInternal";
    exports.CacheProvider = CacheProvider;
    exports.Emotion = Emotion;
    exports.ThemeContext = ThemeContext3;
    exports.ThemeProvider = ThemeProvider;
    exports.__unsafe_useEmotionCache = __unsafe_useEmotionCache;
    exports.createEmotionProps = createEmotionProps;
    exports.hasOwnProperty = hasOwnProperty2;
    exports.isBrowser = isBrowser3;
    exports.useTheme = useTheme4;
    exports.withTheme = withTheme;
  }
});

// node_modules/@emotion/react/dist/emotion-react.cjs.dev.js
var require_emotion_react_cjs_dev = __commonJS({
  "node_modules/@emotion/react/dist/emotion-react.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var React37 = require_react();
    require_emotion_cache_cjs();
    var emotionElement = require_emotion_element_b63ca7c6_cjs_dev();
    require_extends();
    require_emotion_weak_memoize_cjs();
    require_hoist_non_react_statics_cjs();
    require_emotion_react_isolated_hnrs_cjs_dev();
    var utils = require_emotion_utils_cjs(), serialize2 = require_emotion_serialize_cjs(), useInsertionEffectWithFallbacks = require_emotion_use_insertion_effect_with_fallbacks_cjs(), pkg = {
      name: "@emotion/react",
      version: "11.10.5",
      main: "dist/emotion-react.cjs.js",
      module: "dist/emotion-react.esm.js",
      browser: {
        "./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
      },
      exports: {
        ".": {
          module: {
            worker: "./dist/emotion-react.worker.esm.js",
            browser: "./dist/emotion-react.browser.esm.js",
            default: "./dist/emotion-react.esm.js"
          },
          default: "./dist/emotion-react.cjs.js"
        },
        "./jsx-runtime": {
          module: {
            worker: "./jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js",
            browser: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
            default: "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"
          },
          default: "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
        },
        "./_isolated-hnrs": {
          module: {
            worker: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js",
            browser: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
            default: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js"
          },
          default: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
        },
        "./jsx-dev-runtime": {
          module: {
            worker: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js",
            browser: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
            default: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js"
          },
          default: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
        },
        "./package.json": "./package.json",
        "./types/css-prop": "./types/css-prop.d.ts",
        "./macro": "./macro.js"
      },
      types: "types/index.d.ts",
      files: [
        "src",
        "dist",
        "jsx-runtime",
        "jsx-dev-runtime",
        "_isolated-hnrs",
        "types/*.d.ts",
        "macro.js",
        "macro.d.ts",
        "macro.js.flow"
      ],
      sideEffects: !1,
      author: "Emotion Contributors",
      license: "MIT",
      scripts: {
        "test:typescript": "dtslint types"
      },
      dependencies: {
        "@babel/runtime": "^7.18.3",
        "@emotion/babel-plugin": "^11.10.5",
        "@emotion/cache": "^11.10.5",
        "@emotion/serialize": "^1.1.1",
        "@emotion/use-insertion-effect-with-fallbacks": "^1.0.0",
        "@emotion/utils": "^1.2.0",
        "@emotion/weak-memoize": "^0.3.0",
        "hoist-non-react-statics": "^3.3.1"
      },
      peerDependencies: {
        "@babel/core": "^7.0.0",
        react: ">=16.8.0"
      },
      peerDependenciesMeta: {
        "@babel/core": {
          optional: !0
        },
        "@types/react": {
          optional: !0
        }
      },
      devDependencies: {
        "@babel/core": "^7.18.5",
        "@definitelytyped/dtslint": "0.0.112",
        "@emotion/css": "11.10.5",
        "@emotion/css-prettifier": "1.1.1",
        "@emotion/server": "11.10.0",
        "@emotion/styled": "11.10.5",
        "html-tag-names": "^1.1.2",
        react: "16.14.0",
        "svg-tag-names": "^1.1.1",
        typescript: "^4.5.5"
      },
      repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
      publishConfig: {
        access: "public"
      },
      "umd:main": "dist/emotion-react.umd.min.js",
      preconstruct: {
        entrypoints: [
          "./index.js",
          "./jsx-runtime.js",
          "./jsx-dev-runtime.js",
          "./_isolated-hnrs.js"
        ],
        umdName: "emotionReact",
        exports: {
          envConditions: [
            "browser",
            "worker"
          ],
          extra: {
            "./types/css-prop": "./types/css-prop.d.ts",
            "./macro": "./macro.js"
          }
        }
      }
    }, jsx = function(type, props) {
      var args = arguments;
      if (props == null || !emotionElement.hasOwnProperty.call(props, "css"))
        return React37.createElement.apply(void 0, args);
      var argsLength = args.length, createElementArgArray = new Array(argsLength);
      createElementArgArray[0] = emotionElement.Emotion, createElementArgArray[1] = emotionElement.createEmotionProps(type, props);
      for (var i = 2; i < argsLength; i++)
        createElementArgArray[i] = args[i];
      return React37.createElement.apply(null, createElementArgArray);
    }, warnedAboutCssPropForGlobal = !1, Global = /* @__PURE__ */ emotionElement.withEmotionCache(function(props, cache) {
      !warnedAboutCssPropForGlobal && (props.className || props.css) && (console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"), warnedAboutCssPropForGlobal = !0);
      var styles = props.styles, serialized = serialize2.serializeStyles([styles], void 0, React37.useContext(emotionElement.ThemeContext));
      if (!emotionElement.isBrowser) {
        for (var _ref, serializedNames = serialized.name, serializedStyles = serialized.styles, next = serialized.next; next !== void 0; )
          serializedNames += " " + next.name, serializedStyles += next.styles, next = next.next;
        var shouldCache = cache.compat === !0, rules = cache.insert("", {
          name: serializedNames,
          styles: serializedStyles
        }, cache.sheet, shouldCache);
        return shouldCache ? null : /* @__PURE__ */ React37.createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + "-global " + serializedNames, _ref.dangerouslySetInnerHTML = {
          __html: rules
        }, _ref.nonce = cache.sheet.nonce, _ref));
      }
      var sheetRef = React37.useRef();
      return useInsertionEffectWithFallbacks.useInsertionEffectWithLayoutFallback(function() {
        var key = cache.key + "-global", sheet = new cache.sheet.constructor({
          key,
          nonce: cache.sheet.nonce,
          container: cache.sheet.container,
          speedy: cache.sheet.isSpeedy
        }), rehydrating = !1, node = document.querySelector('style[data-emotion="' + key + " " + serialized.name + '"]');
        return cache.sheet.tags.length && (sheet.before = cache.sheet.tags[0]), node !== null && (rehydrating = !0, node.setAttribute("data-emotion", key), sheet.hydrate([node])), sheetRef.current = [sheet, rehydrating], function() {
          sheet.flush();
        };
      }, [cache]), useInsertionEffectWithFallbacks.useInsertionEffectWithLayoutFallback(function() {
        var sheetRefCurrent = sheetRef.current, sheet = sheetRefCurrent[0], rehydrating = sheetRefCurrent[1];
        if (rehydrating) {
          sheetRefCurrent[1] = !1;
          return;
        }
        if (serialized.next !== void 0 && utils.insertStyles(cache, serialized.next, !0), sheet.tags.length) {
          var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
          sheet.before = element, sheet.flush();
        }
        cache.insert("", serialized, sheet, !1);
      }, [cache, serialized.name]), null;
    });
    Global.displayName = "EmotionGlobal";
    function css2() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)
        args[_key] = arguments[_key];
      return serialize2.serializeStyles(args);
    }
    var keyframes2 = function() {
      var insertable = css2.apply(void 0, arguments), name = "animation-" + insertable.name;
      return {
        name,
        styles: "@keyframes " + name + "{" + insertable.styles + "}",
        anim: 1,
        toString: function() {
          return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
        }
      };
    }, classnames = function classnames2(args) {
      for (var len = args.length, i = 0, cls = ""; i < len; i++) {
        var arg = args[i];
        if (arg != null) {
          var toAdd = void 0;
          switch (typeof arg) {
            case "boolean":
              break;
            case "object": {
              if (Array.isArray(arg))
                toAdd = classnames2(arg);
              else {
                arg.styles !== void 0 && arg.name !== void 0 && console.error("You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component."), toAdd = "";
                for (var k in arg)
                  arg[k] && k && (toAdd && (toAdd += " "), toAdd += k);
              }
              break;
            }
            default:
              toAdd = arg;
          }
          toAdd && (cls && (cls += " "), cls += toAdd);
        }
      }
      return cls;
    };
    function merge2(registered, css3, className) {
      var registeredStyles = [], rawClassName = utils.getRegisteredStyles(registered, registeredStyles, className);
      return registeredStyles.length < 2 ? className : rawClassName + css3(registeredStyles);
    }
    var Insertion = function(_ref) {
      var cache = _ref.cache, serializedArr = _ref.serializedArr, rules = useInsertionEffectWithFallbacks.useInsertionEffectAlwaysWithSyncFallback(function() {
        for (var rules2 = "", i = 0; i < serializedArr.length; i++) {
          var res = utils.insertStyles(cache, serializedArr[i], !1);
          !emotionElement.isBrowser && res !== void 0 && (rules2 += res);
        }
        if (!emotionElement.isBrowser)
          return rules2;
      });
      if (!emotionElement.isBrowser && rules.length !== 0) {
        var _ref2;
        return /* @__PURE__ */ React37.createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedArr.map(function(serialized) {
          return serialized.name;
        }).join(" "), _ref2.dangerouslySetInnerHTML = {
          __html: rules
        }, _ref2.nonce = cache.sheet.nonce, _ref2));
      }
      return null;
    }, ClassNames = /* @__PURE__ */ emotionElement.withEmotionCache(function(props, cache) {
      var hasRendered = !1, serializedArr = [], css3 = function() {
        if (hasRendered)
          throw new Error("css can only be used during render");
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)
          args[_key] = arguments[_key];
        var serialized = serialize2.serializeStyles(args, cache.registered);
        return serializedArr.push(serialized), utils.registerStyles(cache, serialized, !1), cache.key + "-" + serialized.name;
      }, cx = function() {
        if (hasRendered)
          throw new Error("cx can only be used during render");
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
          args[_key2] = arguments[_key2];
        return merge2(cache.registered, css3, classnames(args));
      }, content = {
        css: css3,
        cx,
        theme: React37.useContext(emotionElement.ThemeContext)
      }, ele = props.children(content);
      return hasRendered = !0, /* @__PURE__ */ React37.createElement(React37.Fragment, null, /* @__PURE__ */ React37.createElement(Insertion, {
        cache,
        serializedArr
      }), ele);
    });
    ClassNames.displayName = "EmotionClassNames";
    isBrowser3 = typeof document < "u", isTestEnv = typeof jest < "u" || typeof vi < "u", isBrowser3 && !isTestEnv && (globalContext = typeof globalThis < "u" ? globalThis : isBrowser3 ? window : globalThis, globalKey = "__EMOTION_REACT_" + pkg.version.split(".")[0] + "__", globalContext[globalKey] && console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used."), globalContext[globalKey] = !0);
    var isBrowser3, isTestEnv, globalContext, globalKey;
    exports.CacheProvider = emotionElement.CacheProvider;
    exports.ThemeContext = emotionElement.ThemeContext;
    exports.ThemeProvider = emotionElement.ThemeProvider;
    exports.__unsafe_useEmotionCache = emotionElement.__unsafe_useEmotionCache;
    exports.useTheme = emotionElement.useTheme;
    Object.defineProperty(exports, "withEmotionCache", {
      enumerable: !0,
      get: function() {
        return emotionElement.withEmotionCache;
      }
    });
    exports.withTheme = emotionElement.withTheme;
    exports.ClassNames = ClassNames;
    exports.Global = Global;
    exports.createElement = jsx;
    exports.css = css2;
    exports.jsx = jsx;
    exports.keyframes = keyframes2;
  }
});

// node_modules/@emotion/react/dist/emotion-react.cjs.js
var require_emotion_react_cjs = __commonJS({
  "node_modules/@emotion/react/dist/emotion-react.cjs.js"(exports, module) {
    "use strict";
    module.exports = require_emotion_react_cjs_dev();
  }
});

// node_modules/@emotion/styled/base/dist/emotion-styled-base.cjs.dev.js
var require_emotion_styled_base_cjs_dev = __commonJS({
  "node_modules/@emotion/styled/base/dist/emotion-styled-base.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var _extends6 = require_extends(), React37 = require_react(), isPropValid = require_emotion_is_prop_valid_cjs(), react = require_emotion_react_cjs(), utils = require_emotion_utils_cjs(), serialize2 = require_emotion_serialize_cjs(), useInsertionEffectWithFallbacks = require_emotion_use_insertion_effect_with_fallbacks_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var isPropValid__default = /* @__PURE__ */ _interopDefault(isPropValid), testOmitPropsOnStringTag = isPropValid__default.default, testOmitPropsOnComponent = function(key) {
      return key !== "theme";
    }, getDefaultShouldForwardProp = function(tag) {
      return typeof tag == "string" && tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
    }, composeShouldForwardProps = function(tag, options, isReal) {
      var shouldForwardProp2;
      if (options) {
        var optionsShouldForwardProp = options.shouldForwardProp;
        shouldForwardProp2 = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
          return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
        } : optionsShouldForwardProp;
      }
      return typeof shouldForwardProp2 != "function" && isReal && (shouldForwardProp2 = tag.__emotion_forwardProp), shouldForwardProp2;
    }, ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`, isBrowser3 = typeof document < "u", Insertion = function(_ref) {
      var cache = _ref.cache, serialized = _ref.serialized, isStringTag2 = _ref.isStringTag;
      utils.registerStyles(cache, serialized, isStringTag2);
      var rules = useInsertionEffectWithFallbacks.useInsertionEffectAlwaysWithSyncFallback(function() {
        return utils.insertStyles(cache, serialized, isStringTag2);
      });
      if (!isBrowser3 && rules !== void 0) {
        for (var _ref2, serializedNames = serialized.name, next = serialized.next; next !== void 0; )
          serializedNames += " " + next.name, next = next.next;
        return /* @__PURE__ */ React37.createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedNames, _ref2.dangerouslySetInnerHTML = {
          __html: rules
        }, _ref2.nonce = cache.sheet.nonce, _ref2));
      }
      return null;
    }, createStyled2 = function createStyled3(tag, options) {
      if (tag === void 0)
        throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
      var isReal = tag.__emotion_real === tag, baseTag = isReal && tag.__emotion_base || tag, identifierName, targetClassName;
      options !== void 0 && (identifierName = options.label, targetClassName = options.target);
      var shouldForwardProp2 = composeShouldForwardProps(tag, options, isReal), defaultShouldForwardProp = shouldForwardProp2 || getDefaultShouldForwardProp(baseTag), shouldUseAs = !defaultShouldForwardProp("as");
      return function() {
        var args = arguments, styles = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
        if (identifierName !== void 0 && styles.push("label:" + identifierName + ";"), args[0] == null || args[0].raw === void 0)
          styles.push.apply(styles, args);
        else {
          args[0][0] === void 0 && console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR), styles.push(args[0][0]);
          for (var len = args.length, i = 1; i < len; i++)
            args[0][i] === void 0 && console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR), styles.push(args[i], args[0][i]);
        }
        var Styled = react.withEmotionCache(function(props, cache, ref) {
          var FinalTag = shouldUseAs && props.as || baseTag, className = "", classInterpolations = [], mergedProps = props;
          if (props.theme == null) {
            mergedProps = {};
            for (var key in props)
              mergedProps[key] = props[key];
            mergedProps.theme = React37.useContext(react.ThemeContext);
          }
          typeof props.className == "string" ? className = utils.getRegisteredStyles(cache.registered, classInterpolations, props.className) : props.className != null && (className = props.className + " ");
          var serialized = serialize2.serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
          className += cache.key + "-" + serialized.name, targetClassName !== void 0 && (className += " " + targetClassName);
          var finalShouldForwardProp = shouldUseAs && shouldForwardProp2 === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp, newProps = {};
          for (var _key in props)
            shouldUseAs && _key === "as" || finalShouldForwardProp(_key) && (newProps[_key] = props[_key]);
          return newProps.className = className, newProps.ref = ref, /* @__PURE__ */ React37.createElement(React37.Fragment, null, /* @__PURE__ */ React37.createElement(Insertion, {
            cache,
            serialized,
            isStringTag: typeof FinalTag == "string"
          }), /* @__PURE__ */ React37.createElement(FinalTag, newProps));
        });
        return Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag == "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")", Styled.defaultProps = tag.defaultProps, Styled.__emotion_real = Styled, Styled.__emotion_base = baseTag, Styled.__emotion_styles = styles, Styled.__emotion_forwardProp = shouldForwardProp2, Object.defineProperty(Styled, "toString", {
          value: function() {
            return targetClassName === void 0 ? "NO_COMPONENT_SELECTOR" : "." + targetClassName;
          }
        }), Styled.withComponent = function(nextTag, nextOptions) {
          return createStyled3(nextTag, _extends6({}, options, nextOptions, {
            shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, !0)
          })).apply(void 0, styles);
        }, Styled;
      };
    };
    exports.default = createStyled2;
  }
});

// node_modules/@emotion/styled/dist/emotion-styled.cjs.dev.js
var require_emotion_styled_cjs_dev = __commonJS({
  "node_modules/@emotion/styled/dist/emotion-styled.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    require_extends();
    require_react();
    require_emotion_is_prop_valid_cjs();
    var base_dist_emotionStyledBase = require_emotion_styled_base_cjs_dev();
    require_emotion_react_cjs();
    require_emotion_utils_cjs();
    require_emotion_serialize_cjs();
    require_emotion_use_insertion_effect_with_fallbacks_cjs();
    var tags = [
      "a",
      "abbr",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "base",
      "bdi",
      "bdo",
      "big",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "cite",
      "code",
      "col",
      "colgroup",
      "data",
      "datalist",
      "dd",
      "del",
      "details",
      "dfn",
      "dialog",
      "div",
      "dl",
      "dt",
      "em",
      "embed",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hgroup",
      "hr",
      "html",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "keygen",
      "label",
      "legend",
      "li",
      "link",
      "main",
      "map",
      "mark",
      "marquee",
      "menu",
      "menuitem",
      "meta",
      "meter",
      "nav",
      "noscript",
      "object",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "param",
      "picture",
      "pre",
      "progress",
      "q",
      "rp",
      "rt",
      "ruby",
      "s",
      "samp",
      "script",
      "section",
      "select",
      "small",
      "source",
      "span",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "title",
      "tr",
      "track",
      "u",
      "ul",
      "var",
      "video",
      "wbr",
      "circle",
      "clipPath",
      "defs",
      "ellipse",
      "foreignObject",
      "g",
      "image",
      "line",
      "linearGradient",
      "mask",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "radialGradient",
      "rect",
      "stop",
      "svg",
      "text",
      "tspan"
    ], newStyled = base_dist_emotionStyledBase.default.bind();
    tags.forEach(function(tagName) {
      newStyled[tagName] = newStyled(tagName);
    });
    exports.default = newStyled;
  }
});

// node_modules/@emotion/styled/dist/emotion-styled.cjs.js
var require_emotion_styled_cjs = __commonJS({
  "node_modules/@emotion/styled/dist/emotion-styled.cjs.js"(exports, module) {
    "use strict";
    module.exports = require_emotion_styled_cjs_dev();
  }
});

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var React37 = require_react(), _assign = require_object_assign(), REACT_ELEMENT_TYPE = 60103, REACT_PORTAL_TYPE = 60106;
      exports.Fragment = 60107;
      var REACT_STRICT_MODE_TYPE = 60108, REACT_PROFILER_TYPE = 60114, REACT_PROVIDER_TYPE = 60109, REACT_CONTEXT_TYPE = 60110, REACT_FORWARD_REF_TYPE = 60112, REACT_SUSPENSE_TYPE = 60113, REACT_SUSPENSE_LIST_TYPE = 60120, REACT_MEMO_TYPE = 60115, REACT_LAZY_TYPE = 60116, REACT_BLOCK_TYPE = 60121, REACT_SERVER_BLOCK_TYPE = 60122, REACT_FUNDAMENTAL_TYPE = 60117, REACT_SCOPE_TYPE = 60119, REACT_OPAQUE_ID_TYPE = 60128, REACT_DEBUG_TRACING_MODE_TYPE = 60129, REACT_OFFSCREEN_TYPE = 60130, REACT_LEGACY_HIDDEN_TYPE = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var symbolFor = Symbol.for;
        REACT_ELEMENT_TYPE = symbolFor("react.element"), REACT_PORTAL_TYPE = symbolFor("react.portal"), exports.Fragment = symbolFor("react.fragment"), REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode"), REACT_PROFILER_TYPE = symbolFor("react.profiler"), REACT_PROVIDER_TYPE = symbolFor("react.provider"), REACT_CONTEXT_TYPE = symbolFor("react.context"), REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref"), REACT_SUSPENSE_TYPE = symbolFor("react.suspense"), REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list"), REACT_MEMO_TYPE = symbolFor("react.memo"), REACT_LAZY_TYPE = symbolFor("react.lazy"), REACT_BLOCK_TYPE = symbolFor("react.block"), REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block"), REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental"), REACT_SCOPE_TYPE = symbolFor("react.scope"), REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id"), REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode"), REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen"), REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
      }
      var MAYBE_ITERATOR_SYMBOL = typeof Symbol == "function" && Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable != "object")
          return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        return typeof maybeIterator == "function" ? maybeIterator : null;
      }
      var ReactSharedInternals = React37.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format2) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format2, args);
        }
      }
      function printWarning(level, format2, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format2 += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return "" + item;
          });
          argsWithFormat.unshift("Warning: " + format2), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = !1;
      function isValidElementType(type) {
        return !!(typeof type == "string" || typeof type == "function" || type === exports.Fragment || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE));
      }
      function getWrappedName2(outerType, innerType, wrapperName) {
        var functionName = innerType.displayName || innerType.name || "";
        return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentName(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case exports.Fragment:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName2(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              return getComponentName(type.type);
            case REACT_BLOCK_TYPE:
              return getComponentName(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return getComponentName(init2(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = !0;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: !0,
              enumerable: !0,
              value: disabledLog,
              writable: !0
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: _assign({}, props, {
                value: prevLog
              }),
              info: _assign({}, props, {
                value: prevInfo
              }),
              warn: _assign({}, props, {
                value: prevWarn
              }),
              error: _assign({}, props, {
                value: prevError
              }),
              group: _assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: _assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: _assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = !1, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = !0;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher.current, ReactCurrentDispatcher.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = !1, ReactCurrentDispatcher.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, !1);
      }
      function shouldConstruct(Component2) {
        var prototype = Component2.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_BLOCK_TYPE:
              return describeFunctionComponentFrame(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init2(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var loggedTypeFailures = {}, ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values3, location, componentName, element) {
        {
          var has = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values3, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = !0, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner, hasOwnProperty2 = Object.prototype.hasOwnProperty, RESERVED_PROPS = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
      didWarnAboutStringRefs = {};
      function hasValidRef(config2) {
        if (hasOwnProperty2.call(config2, "ref")) {
          var getter = Object.getOwnPropertyDescriptor(config2, "ref").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config2.ref !== void 0;
      }
      function hasValidKey(config2) {
        if (hasOwnProperty2.call(config2, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config2, "key").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config2.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config2, self2) {
        if (typeof config2.ref == "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
          var componentName = getComponentName(ReactCurrentOwner.current.type);
          didWarnAboutStringRefs[componentName] || (error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config2.ref), didWarnAboutStringRefs[componentName] = !0);
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
          };
          warnAboutAccessingKey.isReactWarning = !0, Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            specialPropRefWarningShown || (specialPropRefWarningShown = !0, error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
          };
          warnAboutAccessingRef.isReactWarning = !0, Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: !0
          });
        }
      }
      var ReactElement = function(type, key, ref, self2, source, owner, props) {
        var element = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref,
          props,
          _owner: owner
        };
        return element._store = {}, Object.defineProperty(element._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(element, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: self2
        }), Object.defineProperty(element, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: source
        }), Object.freeze && (Object.freeze(element.props), Object.freeze(element)), element;
      };
      function jsxDEV4(type, config2, maybeKey, source, self2) {
        {
          var propName, props = {}, key = null, ref = null;
          maybeKey !== void 0 && (key = "" + maybeKey), hasValidKey(config2) && (key = "" + config2.key), hasValidRef(config2) && (ref = config2.ref, warnIfStringRefCannotBeAutoConverted(config2, self2));
          for (propName in config2)
            hasOwnProperty2.call(config2, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = config2[propName]);
          if (type && type.defaultProps) {
            var defaultProps2 = type.defaultProps;
            for (propName in defaultProps2)
              props[propName] === void 0 && (props[propName] = defaultProps2[propName]);
          }
          if (key || ref) {
            var displayName = typeof type == "function" ? type.displayName || type.name || "Unknown" : type;
            key && defineKeyPropWarningGetter(props, displayName), ref && defineRefPropWarningGetter(props, displayName);
          }
          return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner, ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
      }
      var propTypesMisspellWarningShown;
      propTypesMisspellWarningShown = !1;
      function isValidElement4(object) {
        return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentName(ReactCurrentOwner$1.current.type);
            if (name)
              return `

Check the render method of \`` + name + "`.";
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, ""), lineNumber = source.lineNumber;
            return `

Check your code at ` + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType == "string" ? parentType : parentType.displayName || parentType.name;
            parentName && (info = `

Check the top-level render call using <` + parentName + ">.");
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null)
            return;
          element._store.validated = !0;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo])
            return;
          ownerHasKeyUseWarning[currentComponentErrorInfo] = !0;
          var childOwner = "";
          element && element._owner && element._owner !== ReactCurrentOwner$1.current && (childOwner = " It was passed a child from " + getComponentName(element._owner.type) + "."), setCurrentlyValidatingElement$1(element), error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner), setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node != "object")
            return;
          if (Array.isArray(node))
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              isValidElement4(child) && validateExplicitKey(child, parentType);
            }
          else if (isValidElement4(node))
            node._store && (node._store.validated = !0);
          else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn == "function" && iteratorFn !== node.entries)
              for (var iterator = iteratorFn.call(node), step; !(step = iterator.next()).done; )
                isValidElement4(step.value) && validateExplicitKey(step.value, parentType);
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type == null || typeof type == "string")
            return;
          var propTypes;
          if (typeof type == "function")
            propTypes = type.propTypes;
          else if (typeof type == "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE))
            propTypes = type.propTypes;
          else
            return;
          if (propTypes) {
            var name = getComponentName(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = !0;
            var _name = getComponentName(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          typeof type.getDefaultProps == "function" && !type.getDefaultProps.isReactClassApproved && error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function validateFragmentProps(fragment) {
        {
          for (var keys2 = Object.keys(fragment.props), i = 0; i < keys2.length; i++) {
            var key = keys2[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment), error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key), setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          fragment.ref !== null && (setCurrentlyValidatingElement$1(fragment), error("Invalid attribute `ref` supplied to `React.Fragment`."), setCurrentlyValidatingElement$1(null));
        }
      }
      function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            (type === void 0 || typeof type == "object" && type !== null && Object.keys(type).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var sourceInfo = getSourceInfoErrorAddendum(source);
            sourceInfo ? info += sourceInfo : info += getDeclarationErrorAddendum();
            var typeString;
            type === null ? typeString = "null" : Array.isArray(type) ? typeString = "array" : type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE ? (typeString = "<" + (getComponentName(type.type) || "Unknown") + " />", info = " Did you accidentally export a JSX literal instead of a component?") : typeString = typeof type, error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV4(type, props, key, source, self2);
          if (element == null)
            return element;
          if (validType) {
            var children = props.children;
            if (children !== void 0)
              if (isStaticChildren)
                if (Array.isArray(children)) {
                  for (var i = 0; i < children.length; i++)
                    validateChildKeys(children[i], type);
                  Object.freeze && Object.freeze(children);
                } else
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                validateChildKeys(children, type);
          }
          return type === exports.Fragment ? validateFragmentProps(element) : validatePropTypes(element), element;
        }
      }
      function jsxWithValidationStatic(type, props, key) {
        return jsxWithValidation(type, props, key, !0);
      }
      function jsxWithValidationDynamic(type, props, key) {
        return jsxWithValidation(type, props, key, !1);
      }
      var jsx = jsxWithValidationDynamic, jsxs = jsxWithValidationStatic;
      exports.jsx = jsx, exports.jsxs = jsxs;
    })();
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    module.exports = require_react_jsx_runtime_development();
  }
});

// node_modules/@mui/styled-engine/index.js
function styled(tag, options) {
  let stylesFactory = (0, import_styled.default)(tag, options);
  return (...styles) => {
    let component = typeof tag == "string" ? `"${tag}"` : "component";
    return styles.length === 0 ? console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : styles.some((style3) => style3 === void 0) && console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`), stylesFactory(...styles);
  };
}
var import_styled, import_react4, internal_processStyles, init_styled_engine = __esm({
  "node_modules/@mui/styled-engine/index.js"() {
    import_styled = __toESM(require_emotion_styled_cjs()), import_react4 = __toESM(require_emotion_react_cjs());
    internal_processStyles = (tag, processor) => {
      Array.isArray(tag.__emotion_styles) && (tag.__emotion_styles = processor(tag.__emotion_styles));
    };
  }
});

// node_modules/@mui/system/esm/responsivePropType.js
var import_prop_types3, responsivePropType, responsivePropType_default, init_responsivePropType = __esm({
  "node_modules/@mui/system/esm/responsivePropType.js"() {
    import_prop_types3 = __toESM(require_prop_types()), responsivePropType = import_prop_types3.default.oneOfType([import_prop_types3.default.number, import_prop_types3.default.string, import_prop_types3.default.object, import_prop_types3.default.array]), responsivePropType_default = responsivePropType;
  }
});

// node_modules/@mui/system/esm/merge.js
function merge(acc, item) {
  return item ? deepmerge(acc, item, {
    clone: !1
  }) : acc;
}
var merge_default, init_merge = __esm({
  "node_modules/@mui/system/esm/merge.js"() {
    init_esm2();
    merge_default = merge;
  }
});

// node_modules/@mui/system/esm/breakpoints.js
function handleBreakpoints(props, propValue, styleFromPropValue) {
  let theme = props.theme || {};
  if (Array.isArray(propValue)) {
    let themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => (acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]), acc), {});
  }
  if (typeof propValue == "object") {
    let themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        let mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        let cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  return styleFromPropValue(propValue);
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;
  return ((_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    let breakpointStyleKey = breakpointsInput.up(key);
    return acc[breakpointStyleKey] = {}, acc;
  }, {})) || {};
}
function removeUnusedBreakpoints(breakpointKeys, style3) {
  return breakpointKeys.reduce((acc, key) => {
    let breakpointOutput = acc[key];
    return (!breakpointOutput || Object.keys(breakpointOutput).length === 0) && delete acc[key], acc;
  }, style3);
}
var values, defaultBreakpoints, init_breakpoints = __esm({
  "node_modules/@mui/system/esm/breakpoints.js"() {
    init_extends();
    values = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }, defaultBreakpoints = {
      keys: ["xs", "sm", "md", "lg", "xl"],
      up: (key) => `@media (min-width:${values[key]}px)`
    };
  }
});

// node_modules/@mui/system/esm/style.js
function getPath(obj, path, checkVars = !0) {
  if (!path || typeof path != "string")
    return null;
  if (obj && obj.vars && checkVars) {
    let val = `vars.${path}`.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
    if (val != null)
      return val;
  }
  return path.split(".").reduce((acc, item) => acc && acc[item] != null ? acc[item] : null, obj);
}
function getStyleValue(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;
  return typeof themeMapping == "function" ? value = themeMapping(propValueFinal) : Array.isArray(themeMapping) ? value = themeMapping[propValueFinal] || userValue : value = getPath(themeMapping, propValueFinal) || userValue, transform && (value = transform(value, userValue, themeMapping)), value;
}
function style(options) {
  let {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform
  } = options, fn = (props) => {
    if (props[prop] == null)
      return null;
    let propValue = props[prop], theme = props.theme, themeMapping = getPath(theme, themeKey) || {};
    return handleBreakpoints(props, propValue, (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      return propValueFinal === value && typeof propValueFinal == "string" && (value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal)), cssProperty === !1 ? value : {
        [cssProperty]: value
      };
    });
  };
  return fn.propTypes = {
    [prop]: responsivePropType_default
  }, fn.filterProps = [prop], fn;
}
var style_default, init_style = __esm({
  "node_modules/@mui/system/esm/style.js"() {
    init_esm2();
    init_responsivePropType();
    init_breakpoints();
    style_default = style;
  }
});

// node_modules/@mui/system/esm/compose.js
function compose(...styles) {
  let handlers = styles.reduce((acc, style3) => (style3.filterProps.forEach((prop) => {
    acc[prop] = style3;
  }), acc), {}), fn = (props) => Object.keys(props).reduce((acc, prop) => handlers[prop] ? merge_default(acc, handlers[prop](props)) : acc, {});
  return fn.propTypes = styles.reduce((acc, style3) => Object.assign(acc, style3.propTypes), {}), fn.filterProps = styles.reduce((acc, style3) => acc.concat(style3.filterProps), []), fn;
}
var compose_default, init_compose = __esm({
  "node_modules/@mui/system/esm/compose.js"() {
    init_merge();
    compose_default = compose;
  }
});

// node_modules/@mui/system/esm/memoize.js
function memoize(fn) {
  let cache = {};
  return (arg) => (cache[arg] === void 0 && (cache[arg] = fn(arg)), cache[arg]);
}
var init_memoize = __esm({
  "node_modules/@mui/system/esm/memoize.js"() {
  }
});

// node_modules/@mui/system/esm/spacing.js
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  var _getPath;
  let themeSpacing = (_getPath = getPath(theme, themeKey, !1)) != null ? _getPath : defaultValue;
  return typeof themeSpacing == "number" ? (abs) => typeof abs == "string" ? abs : (typeof abs != "number" && console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${abs}.`), themeSpacing * abs) : Array.isArray(themeSpacing) ? (abs) => typeof abs == "string" ? abs : (Number.isInteger(abs) ? abs > themeSpacing.length - 1 && console.error([`MUI: The value provided (${abs}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join(`
`)), themeSpacing[abs]) : typeof themeSpacing == "function" ? themeSpacing : (console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, "spacing", 8, "spacing");
}
function getValue(transformer, propValue) {
  if (typeof propValue == "string" || propValue == null)
    return propValue;
  let abs = Math.abs(propValue), transformed = transformer(abs);
  return propValue >= 0 ? transformed : typeof transformed == "number" ? -transformed : `-${transformed}`;
}
function getStyleFromPropValue(cssProperties, transformer) {
  return (propValue) => cssProperties.reduce((acc, cssProperty) => (acc[cssProperty] = getValue(transformer, propValue), acc), {});
}
function resolveCssProperty(props, keys2, prop, transformer) {
  if (keys2.indexOf(prop) === -1)
    return null;
  let cssProperties = getCssProperties(prop), styleFromPropValue = getStyleFromPropValue(cssProperties, transformer), propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style2(props, keys2) {
  let transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map((prop) => resolveCssProperty(props, keys2, prop, transformer)).reduce(merge_default, {});
}
function margin(props) {
  return style2(props, marginKeys);
}
function padding(props) {
  return style2(props, paddingKeys);
}
function spacing(props) {
  return style2(props, spacingKeys);
}
var properties, directions, aliases, getCssProperties, marginKeys, paddingKeys, spacingKeys, init_spacing = __esm({
  "node_modules/@mui/system/esm/spacing.js"() {
    init_responsivePropType();
    init_breakpoints();
    init_style();
    init_merge();
    init_memoize();
    properties = {
      m: "margin",
      p: "padding"
    }, directions = {
      t: "Top",
      r: "Right",
      b: "Bottom",
      l: "Left",
      x: ["Left", "Right"],
      y: ["Top", "Bottom"]
    }, aliases = {
      marginX: "mx",
      marginY: "my",
      paddingX: "px",
      paddingY: "py"
    }, getCssProperties = memoize((prop) => {
      if (prop.length > 2)
        if (aliases[prop])
          prop = aliases[prop];
        else
          return [prop];
      let [a, b] = prop.split(""), property = properties[a], direction = directions[b] || "";
      return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
    }), marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], spacingKeys = [...marginKeys, ...paddingKeys];
    margin.propTypes = marginKeys.reduce((obj, key) => (obj[key] = responsivePropType_default, obj), {});
    margin.filterProps = marginKeys;
    padding.propTypes = paddingKeys.reduce((obj, key) => (obj[key] = responsivePropType_default, obj), {});
    padding.filterProps = paddingKeys;
    spacing.propTypes = spacingKeys.reduce((obj, key) => (obj[key] = responsivePropType_default, obj), {});
    spacing.filterProps = spacingKeys;
  }
});

// node_modules/@mui/system/esm/borders.js
function borderTransform(value) {
  return typeof value != "number" ? value : `${value}px solid`;
}
var border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius, borders, init_borders = __esm({
  "node_modules/@mui/system/esm/borders.js"() {
    init_responsivePropType();
    init_style();
    init_compose();
    init_spacing();
    init_breakpoints();
    border = style_default({
      prop: "border",
      themeKey: "borders",
      transform: borderTransform
    }), borderTop = style_default({
      prop: "borderTop",
      themeKey: "borders",
      transform: borderTransform
    }), borderRight = style_default({
      prop: "borderRight",
      themeKey: "borders",
      transform: borderTransform
    }), borderBottom = style_default({
      prop: "borderBottom",
      themeKey: "borders",
      transform: borderTransform
    }), borderLeft = style_default({
      prop: "borderLeft",
      themeKey: "borders",
      transform: borderTransform
    }), borderColor = style_default({
      prop: "borderColor",
      themeKey: "palette"
    }), borderTopColor = style_default({
      prop: "borderTopColor",
      themeKey: "palette"
    }), borderRightColor = style_default({
      prop: "borderRightColor",
      themeKey: "palette"
    }), borderBottomColor = style_default({
      prop: "borderBottomColor",
      themeKey: "palette"
    }), borderLeftColor = style_default({
      prop: "borderLeftColor",
      themeKey: "palette"
    }), borderRadius = (props) => {
      if (props.borderRadius !== void 0 && props.borderRadius !== null) {
        let transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4, "borderRadius"), styleFromPropValue = (propValue) => ({
          borderRadius: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
      }
      return null;
    };
    borderRadius.propTypes = {
      borderRadius: responsivePropType_default
    };
    borderRadius.filterProps = ["borderRadius"];
    borders = compose_default(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius);
  }
});

// node_modules/@mui/system/esm/flexbox.js
var flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf, flexbox, init_flexbox = __esm({
  "node_modules/@mui/system/esm/flexbox.js"() {
    init_style();
    init_compose();
    flexBasis = style_default({
      prop: "flexBasis"
    }), flexDirection = style_default({
      prop: "flexDirection"
    }), flexWrap = style_default({
      prop: "flexWrap"
    }), justifyContent = style_default({
      prop: "justifyContent"
    }), alignItems = style_default({
      prop: "alignItems"
    }), alignContent = style_default({
      prop: "alignContent"
    }), order = style_default({
      prop: "order"
    }), flex = style_default({
      prop: "flex"
    }), flexGrow = style_default({
      prop: "flexGrow"
    }), flexShrink = style_default({
      prop: "flexShrink"
    }), alignSelf = style_default({
      prop: "alignSelf"
    }), justifyItems = style_default({
      prop: "justifyItems"
    }), justifySelf = style_default({
      prop: "justifySelf"
    }), flexbox = compose_default(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
  }
});

// node_modules/@mui/system/esm/cssGrid.js
var gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea, grid, init_cssGrid = __esm({
  "node_modules/@mui/system/esm/cssGrid.js"() {
    init_style();
    init_compose();
    init_spacing();
    init_breakpoints();
    init_responsivePropType();
    gap = (props) => {
      if (props.gap !== void 0 && props.gap !== null) {
        let transformer = createUnaryUnit(props.theme, "spacing", 8, "gap"), styleFromPropValue = (propValue) => ({
          gap: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.gap, styleFromPropValue);
      }
      return null;
    };
    gap.propTypes = {
      gap: responsivePropType_default
    };
    gap.filterProps = ["gap"];
    columnGap = (props) => {
      if (props.columnGap !== void 0 && props.columnGap !== null) {
        let transformer = createUnaryUnit(props.theme, "spacing", 8, "columnGap"), styleFromPropValue = (propValue) => ({
          columnGap: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.columnGap, styleFromPropValue);
      }
      return null;
    };
    columnGap.propTypes = {
      columnGap: responsivePropType_default
    };
    columnGap.filterProps = ["columnGap"];
    rowGap = (props) => {
      if (props.rowGap !== void 0 && props.rowGap !== null) {
        let transformer = createUnaryUnit(props.theme, "spacing", 8, "rowGap"), styleFromPropValue = (propValue) => ({
          rowGap: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.rowGap, styleFromPropValue);
      }
      return null;
    };
    rowGap.propTypes = {
      rowGap: responsivePropType_default
    };
    rowGap.filterProps = ["rowGap"];
    gridColumn = style_default({
      prop: "gridColumn"
    }), gridRow = style_default({
      prop: "gridRow"
    }), gridAutoFlow = style_default({
      prop: "gridAutoFlow"
    }), gridAutoColumns = style_default({
      prop: "gridAutoColumns"
    }), gridAutoRows = style_default({
      prop: "gridAutoRows"
    }), gridTemplateColumns = style_default({
      prop: "gridTemplateColumns"
    }), gridTemplateRows = style_default({
      prop: "gridTemplateRows"
    }), gridTemplateAreas = style_default({
      prop: "gridTemplateAreas"
    }), gridArea = style_default({
      prop: "gridArea"
    }), grid = compose_default(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
  }
});

// node_modules/@mui/system/esm/palette.js
function paletteTransform(value, userValue) {
  return userValue === "grey" ? userValue : value;
}
var color, bgcolor, backgroundColor, palette, init_palette = __esm({
  "node_modules/@mui/system/esm/palette.js"() {
    init_style();
    init_compose();
    color = style_default({
      prop: "color",
      themeKey: "palette",
      transform: paletteTransform
    }), bgcolor = style_default({
      prop: "bgcolor",
      cssProperty: "backgroundColor",
      themeKey: "palette",
      transform: paletteTransform
    }), backgroundColor = style_default({
      prop: "backgroundColor",
      themeKey: "palette",
      transform: paletteTransform
    }), palette = compose_default(color, bgcolor, backgroundColor);
  }
});

// node_modules/@mui/system/esm/positions.js
var position, zIndex, top, right, bottom, left, positions_default, init_positions = __esm({
  "node_modules/@mui/system/esm/positions.js"() {
    init_style();
    init_compose();
    position = style_default({
      prop: "position"
    }), zIndex = style_default({
      prop: "zIndex",
      themeKey: "zIndex"
    }), top = style_default({
      prop: "top"
    }), right = style_default({
      prop: "right"
    }), bottom = style_default({
      prop: "bottom"
    }), left = style_default({
      prop: "left"
    }), positions_default = compose_default(position, zIndex, top, right, bottom, left);
  }
});

// node_modules/@mui/system/esm/sizing.js
function sizingTransform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
var width, maxWidth, minWidth, height, maxHeight, minHeight, sizeWidth, sizeHeight, boxSizing, sizing, init_sizing = __esm({
  "node_modules/@mui/system/esm/sizing.js"() {
    init_style();
    init_compose();
    init_breakpoints();
    width = style_default({
      prop: "width",
      transform: sizingTransform
    }), maxWidth = (props) => {
      if (props.maxWidth !== void 0 && props.maxWidth !== null) {
        let styleFromPropValue = (propValue) => {
          var _props$theme, _props$theme$breakpoi, _props$theme$breakpoi2;
          return {
            maxWidth: ((_props$theme = props.theme) == null || (_props$theme$breakpoi = _props$theme.breakpoints) == null || (_props$theme$breakpoi2 = _props$theme$breakpoi.values) == null ? void 0 : _props$theme$breakpoi2[propValue]) || values[propValue] || sizingTransform(propValue)
          };
        };
        return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
      }
      return null;
    };
    maxWidth.filterProps = ["maxWidth"];
    minWidth = style_default({
      prop: "minWidth",
      transform: sizingTransform
    }), height = style_default({
      prop: "height",
      transform: sizingTransform
    }), maxHeight = style_default({
      prop: "maxHeight",
      transform: sizingTransform
    }), minHeight = style_default({
      prop: "minHeight",
      transform: sizingTransform
    }), sizeWidth = style_default({
      prop: "size",
      cssProperty: "width",
      transform: sizingTransform
    }), sizeHeight = style_default({
      prop: "size",
      cssProperty: "height",
      transform: sizingTransform
    }), boxSizing = style_default({
      prop: "boxSizing"
    }), sizing = compose_default(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
  }
});

// node_modules/@mui/system/esm/typography.js
var fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, textTransform, lineHeight, textAlign, typographyVariant, typography, init_typography = __esm({
  "node_modules/@mui/system/esm/typography.js"() {
    init_style();
    init_compose();
    fontFamily = style_default({
      prop: "fontFamily",
      themeKey: "typography"
    }), fontSize = style_default({
      prop: "fontSize",
      themeKey: "typography"
    }), fontStyle = style_default({
      prop: "fontStyle",
      themeKey: "typography"
    }), fontWeight = style_default({
      prop: "fontWeight",
      themeKey: "typography"
    }), letterSpacing = style_default({
      prop: "letterSpacing"
    }), textTransform = style_default({
      prop: "textTransform"
    }), lineHeight = style_default({
      prop: "lineHeight"
    }), textAlign = style_default({
      prop: "textAlign"
    }), typographyVariant = style_default({
      prop: "typography",
      cssProperty: !1,
      themeKey: "typography"
    }), typography = compose_default(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textTransform);
  }
});

// node_modules/@mui/system/esm/styleFunctionSx/defaultSxConfig.js
var defaultSxConfig, defaultSxConfig_default, init_defaultSxConfig = __esm({
  "node_modules/@mui/system/esm/styleFunctionSx/defaultSxConfig.js"() {
    init_spacing();
    init_borders();
    init_cssGrid();
    init_palette();
    init_sizing();
    defaultSxConfig = {
      border: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderTop: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderRight: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderBottom: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderLeft: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderColor: {
        themeKey: "palette"
      },
      borderTopColor: {
        themeKey: "palette"
      },
      borderRightColor: {
        themeKey: "palette"
      },
      borderBottomColor: {
        themeKey: "palette"
      },
      borderLeftColor: {
        themeKey: "palette"
      },
      borderRadius: {
        themeKey: "shape.borderRadius",
        style: borderRadius
      },
      color: {
        themeKey: "palette",
        transform: paletteTransform
      },
      bgcolor: {
        themeKey: "palette",
        cssProperty: "backgroundColor",
        transform: paletteTransform
      },
      backgroundColor: {
        themeKey: "palette",
        transform: paletteTransform
      },
      p: {
        style: padding
      },
      pt: {
        style: padding
      },
      pr: {
        style: padding
      },
      pb: {
        style: padding
      },
      pl: {
        style: padding
      },
      px: {
        style: padding
      },
      py: {
        style: padding
      },
      padding: {
        style: padding
      },
      paddingTop: {
        style: padding
      },
      paddingRight: {
        style: padding
      },
      paddingBottom: {
        style: padding
      },
      paddingLeft: {
        style: padding
      },
      paddingX: {
        style: padding
      },
      paddingY: {
        style: padding
      },
      paddingInline: {
        style: padding
      },
      paddingInlineStart: {
        style: padding
      },
      paddingInlineEnd: {
        style: padding
      },
      paddingBlock: {
        style: padding
      },
      paddingBlockStart: {
        style: padding
      },
      paddingBlockEnd: {
        style: padding
      },
      m: {
        style: margin
      },
      mt: {
        style: margin
      },
      mr: {
        style: margin
      },
      mb: {
        style: margin
      },
      ml: {
        style: margin
      },
      mx: {
        style: margin
      },
      my: {
        style: margin
      },
      margin: {
        style: margin
      },
      marginTop: {
        style: margin
      },
      marginRight: {
        style: margin
      },
      marginBottom: {
        style: margin
      },
      marginLeft: {
        style: margin
      },
      marginX: {
        style: margin
      },
      marginY: {
        style: margin
      },
      marginInline: {
        style: margin
      },
      marginInlineStart: {
        style: margin
      },
      marginInlineEnd: {
        style: margin
      },
      marginBlock: {
        style: margin
      },
      marginBlockStart: {
        style: margin
      },
      marginBlockEnd: {
        style: margin
      },
      displayPrint: {
        cssProperty: !1,
        transform: (value) => ({
          "@media print": {
            display: value
          }
        })
      },
      display: {},
      overflow: {},
      textOverflow: {},
      visibility: {},
      whiteSpace: {},
      flexBasis: {},
      flexDirection: {},
      flexWrap: {},
      justifyContent: {},
      alignItems: {},
      alignContent: {},
      order: {},
      flex: {},
      flexGrow: {},
      flexShrink: {},
      alignSelf: {},
      justifyItems: {},
      justifySelf: {},
      gap: {
        style: gap
      },
      rowGap: {
        style: rowGap
      },
      columnGap: {
        style: columnGap
      },
      gridColumn: {},
      gridRow: {},
      gridAutoFlow: {},
      gridAutoColumns: {},
      gridAutoRows: {},
      gridTemplateColumns: {},
      gridTemplateRows: {},
      gridTemplateAreas: {},
      gridArea: {},
      position: {},
      zIndex: {
        themeKey: "zIndex"
      },
      top: {},
      right: {},
      bottom: {},
      left: {},
      boxShadow: {
        themeKey: "shadows"
      },
      width: {
        transform: sizingTransform
      },
      maxWidth: {
        style: maxWidth
      },
      minWidth: {
        transform: sizingTransform
      },
      height: {
        transform: sizingTransform
      },
      maxHeight: {
        transform: sizingTransform
      },
      minHeight: {
        transform: sizingTransform
      },
      boxSizing: {},
      fontFamily: {
        themeKey: "typography"
      },
      fontSize: {
        themeKey: "typography"
      },
      fontStyle: {
        themeKey: "typography"
      },
      fontWeight: {
        themeKey: "typography"
      },
      letterSpacing: {},
      textTransform: {},
      lineHeight: {},
      textAlign: {},
      typography: {
        cssProperty: !1,
        themeKey: "typography"
      }
    }, defaultSxConfig_default = defaultSxConfig;
  }
});

// node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js
function objectsHaveSameKeys(...objects) {
  let allKeys = objects.reduce((keys2, object) => keys2.concat(Object.keys(object)), []), union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg) {
  return typeof maybeFn == "function" ? maybeFn(arg) : maybeFn;
}
function unstable_createStyleFunctionSx() {
  function getThemeValue(prop, val, theme, config2) {
    let props = {
      [prop]: val,
      theme
    }, options = config2[prop];
    if (!options)
      return {
        [prop]: val
      };
    let {
      cssProperty = prop,
      themeKey,
      transform,
      style: style3
    } = options;
    if (val == null)
      return null;
    let themeMapping = getPath(theme, themeKey) || {};
    return style3 ? style3(props) : handleBreakpoints(props, val, (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      return propValueFinal === value && typeof propValueFinal == "string" && (value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal)), cssProperty === !1 ? value : {
        [cssProperty]: value
      };
    });
  }
  function styleFunctionSx2(props) {
    var _theme$unstable_sxCon;
    let {
      sx,
      theme = {}
    } = props || {};
    if (!sx)
      return null;
    let config2 = (_theme$unstable_sxCon = theme.unstable_sxConfig) != null ? _theme$unstable_sxCon : defaultSxConfig_default;
    function traverse(sxInput) {
      let sxObject = sxInput;
      if (typeof sxInput == "function")
        sxObject = sxInput(theme);
      else if (typeof sxInput != "object")
        return sxInput;
      if (!sxObject)
        return null;
      let emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints), breakpointsKeys = Object.keys(emptyBreakpoints), css2 = emptyBreakpoints;
      return Object.keys(sxObject).forEach((styleKey) => {
        let value = callIfFn(sxObject[styleKey], theme);
        if (value != null)
          if (typeof value == "object")
            if (config2[styleKey])
              css2 = merge_default(css2, getThemeValue(styleKey, value, theme, config2));
            else {
              let breakpointsValues = handleBreakpoints({
                theme
              }, value, (x) => ({
                [styleKey]: x
              }));
              objectsHaveSameKeys(breakpointsValues, value) ? css2[styleKey] = styleFunctionSx2({
                sx: value,
                theme
              }) : css2 = merge_default(css2, breakpointsValues);
            }
          else
            css2 = merge_default(css2, getThemeValue(styleKey, value, theme, config2));
      }), removeUnusedBreakpoints(breakpointsKeys, css2);
    }
    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }
  return styleFunctionSx2;
}
var styleFunctionSx, styleFunctionSx_default, init_styleFunctionSx = __esm({
  "node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js"() {
    init_esm2();
    init_merge();
    init_style();
    init_breakpoints();
    init_defaultSxConfig();
    styleFunctionSx = unstable_createStyleFunctionSx();
    styleFunctionSx.filterProps = ["sx"];
    styleFunctionSx_default = styleFunctionSx;
  }
});

// node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js
function extendSxProp(props) {
  let {
    sx: inSx
  } = props, other = _objectWithoutPropertiesLoose2(props, _excluded4), {
    systemProps,
    otherProps
  } = splitProps(other), finalSx;
  return Array.isArray(inSx) ? finalSx = [systemProps, ...inSx] : typeof inSx == "function" ? finalSx = (...args) => {
    let result = inSx(...args);
    return isPlainObject(result) ? _extends5({}, systemProps, result) : systemProps;
  } : finalSx = _extends5({}, systemProps, inSx), _extends5({}, otherProps, {
    sx: finalSx
  });
}
var _excluded4, splitProps, init_extendSxProp = __esm({
  "node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm2();
    init_defaultSxConfig();
    _excluded4 = ["sx"], splitProps = (props) => {
      var _props$theme$unstable, _props$theme;
      let result = {
        systemProps: {},
        otherProps: {}
      }, config2 = (_props$theme$unstable = props == null || (_props$theme = props.theme) == null ? void 0 : _props$theme.unstable_sxConfig) != null ? _props$theme$unstable : defaultSxConfig_default;
      return Object.keys(props).forEach((prop) => {
        config2[prop] ? result.systemProps[prop] = props[prop] : result.otherProps[prop] = props[prop];
      }), result;
    };
  }
});

// node_modules/@mui/system/esm/styleFunctionSx/index.js
var init_styleFunctionSx2 = __esm({
  "node_modules/@mui/system/esm/styleFunctionSx/index.js"() {
    init_styleFunctionSx();
    init_extendSxProp();
    init_defaultSxConfig();
  }
});

// node_modules/clsx/dist/clsx.m.js
function r(e) {
  var t, f, n = "";
  if (typeof e == "string" || typeof e == "number")
    n += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = ""; f < arguments.length; )
    (e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_m_default, init_clsx_m = __esm({
  "node_modules/clsx/dist/clsx.m.js"() {
    clsx_m_default = clsx;
  }
});

// node_modules/@mui/system/esm/createTheme/createBreakpoints.js
function createBreakpoints(breakpoints) {
  let {
    values: values3 = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    },
    unit = "px",
    step = 5
  } = breakpoints, other = _objectWithoutPropertiesLoose2(breakpoints, _excluded5), sortedValues = sortBreakpointsValues(values3), keys2 = Object.keys(sortedValues);
  function up(key) {
    return `@media (min-width:${typeof values3[key] == "number" ? values3[key] : key}${unit})`;
  }
  function down(key) {
    return `@media (max-width:${(typeof values3[key] == "number" ? values3[key] : key) - step / 100}${unit})`;
  }
  function between(start, end) {
    let endIndex = keys2.indexOf(end);
    return `@media (min-width:${typeof values3[start] == "number" ? values3[start] : start}${unit}) and (max-width:${(endIndex !== -1 && typeof values3[keys2[endIndex]] == "number" ? values3[keys2[endIndex]] : end) - step / 100}${unit})`;
  }
  function only(key) {
    return keys2.indexOf(key) + 1 < keys2.length ? between(key, keys2[keys2.indexOf(key) + 1]) : up(key);
  }
  function not(key) {
    let keyIndex = keys2.indexOf(key);
    return keyIndex === 0 ? up(keys2[1]) : keyIndex === keys2.length - 1 ? down(keys2[keyIndex]) : between(key, keys2[keys2.indexOf(key) + 1]).replace("@media", "@media not all and");
  }
  return _extends5({
    keys: keys2,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit
  }, other);
}
var _excluded5, sortBreakpointsValues, init_createBreakpoints = __esm({
  "node_modules/@mui/system/esm/createTheme/createBreakpoints.js"() {
    init_objectWithoutPropertiesLoose();
    init_extends();
    _excluded5 = ["values", "unit", "step"], sortBreakpointsValues = (values3) => {
      let breakpointsAsArray = Object.keys(values3).map((key) => ({
        key,
        val: values3[key]
      })) || [];
      return breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val), breakpointsAsArray.reduce((acc, obj) => _extends5({}, acc, {
        [obj.key]: obj.val
      }), {});
    };
  }
});

// node_modules/@mui/system/esm/createTheme/shape.js
var shape, shape_default, init_shape = __esm({
  "node_modules/@mui/system/esm/createTheme/shape.js"() {
    shape = {
      borderRadius: 4
    }, shape_default = shape;
  }
});

// node_modules/@mui/system/esm/createTheme/createSpacing.js
function createSpacing(spacingInput = 8) {
  if (spacingInput.mui)
    return spacingInput;
  let transform = createUnarySpacing({
    spacing: spacingInput
  }), spacing2 = (...argsInput) => (argsInput.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`), (argsInput.length === 0 ? [1] : argsInput).map((argument) => {
    let output = transform(argument);
    return typeof output == "number" ? `${output}px` : output;
  }).join(" "));
  return spacing2.mui = !0, spacing2;
}
var init_createSpacing = __esm({
  "node_modules/@mui/system/esm/createTheme/createSpacing.js"() {
    init_spacing();
  }
});

// node_modules/@mui/system/esm/createTheme/createTheme.js
function createTheme(options = {}, ...args) {
  let {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = options, other = _objectWithoutPropertiesLoose2(options, _excluded6), breakpoints = createBreakpoints(breakpointsInput), spacing2 = createSpacing(spacingInput), muiTheme = deepmerge({
    breakpoints,
    direction: "ltr",
    components: {},
    palette: _extends5({
      mode: "light"
    }, paletteInput),
    spacing: spacing2,
    shape: _extends5({}, shape_default, shapeInput)
  }, other);
  return muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme), muiTheme.unstable_sxConfig = _extends5({}, defaultSxConfig_default, other == null ? void 0 : other.unstable_sxConfig), muiTheme.unstable_sx = function(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  }, muiTheme;
}
var _excluded6, createTheme_default, init_createTheme = __esm({
  "node_modules/@mui/system/esm/createTheme/createTheme.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm2();
    init_createBreakpoints();
    init_shape();
    init_createSpacing();
    init_styleFunctionSx();
    init_defaultSxConfig();
    _excluded6 = ["breakpoints", "palette", "spacing", "shape"];
    createTheme_default = createTheme;
  }
});

// node_modules/@mui/system/esm/createTheme/index.js
var init_createTheme2 = __esm({
  "node_modules/@mui/system/esm/createTheme/index.js"() {
    init_createTheme();
  }
});

// node_modules/@mui/private-theming/useTheme/ThemeContext.js
var React14, ThemeContext2, ThemeContext_default, init_ThemeContext = __esm({
  "node_modules/@mui/private-theming/useTheme/ThemeContext.js"() {
    React14 = __toESM(require_react()), ThemeContext2 = /* @__PURE__ */ React14.createContext(null);
    ThemeContext2.displayName = "ThemeContext";
    ThemeContext_default = ThemeContext2;
  }
});

// node_modules/@mui/private-theming/useTheme/useTheme.js
function useTheme() {
  let theme = React15.useContext(ThemeContext_default);
  return React15.useDebugValue(theme), theme;
}
var React15, init_useTheme = __esm({
  "node_modules/@mui/private-theming/useTheme/useTheme.js"() {
    React15 = __toESM(require_react());
    init_ThemeContext();
  }
});

// node_modules/@mui/private-theming/useTheme/index.js
var init_useTheme2 = __esm({
  "node_modules/@mui/private-theming/useTheme/index.js"() {
    init_useTheme();
  }
});

// node_modules/@mui/private-theming/ThemeProvider/index.js
var init_ThemeProvider = __esm({
  "node_modules/@mui/private-theming/ThemeProvider/index.js"() {
  }
});

// node_modules/@mui/private-theming/index.js
var init_private_theming = __esm({
  "node_modules/@mui/private-theming/index.js"() {
    init_ThemeProvider();
    init_useTheme2();
  }
});

// node_modules/@mui/system/esm/useThemeWithoutDefault.js
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme2(defaultTheme4 = null) {
  let contextTheme = useTheme();
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme4 : contextTheme;
}
var useThemeWithoutDefault_default, init_useThemeWithoutDefault = __esm({
  "node_modules/@mui/system/esm/useThemeWithoutDefault.js"() {
    init_private_theming();
    useThemeWithoutDefault_default = useTheme2;
  }
});

// node_modules/@mui/system/esm/useTheme.js
function useTheme3(defaultTheme4 = systemDefaultTheme) {
  return useThemeWithoutDefault_default(defaultTheme4);
}
var systemDefaultTheme, useTheme_default, init_useTheme3 = __esm({
  "node_modules/@mui/system/esm/useTheme.js"() {
    init_createTheme2();
    init_useThemeWithoutDefault();
    systemDefaultTheme = createTheme_default();
    useTheme_default = useTheme3;
  }
});

// node_modules/@mui/system/esm/createBox.js
function createBox(options = {}) {
  let {
    defaultTheme: defaultTheme4,
    defaultClassName = "MuiBox-root",
    generateClassName
  } = options, BoxRoot = styled("div", {
    shouldForwardProp: (prop) => prop !== "theme" && prop !== "sx" && prop !== "as"
  })(styleFunctionSx_default);
  return /* @__PURE__ */ React16.forwardRef(function(inProps, ref) {
    let theme = useTheme_default(defaultTheme4), _extendSxProp = extendSxProp(inProps), {
      className,
      component = "div"
    } = _extendSxProp, other = _objectWithoutPropertiesLoose2(_extendSxProp, _excluded7);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoxRoot, _extends5({
      as: component,
      ref,
      className: clsx_m_default(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
      theme
    }, other));
  });
}
var React16, import_jsx_runtime, _excluded7, init_createBox = __esm({
  "node_modules/@mui/system/esm/createBox.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React16 = __toESM(require_react());
    init_clsx_m();
    init_styled_engine();
    init_styleFunctionSx2();
    init_useTheme3();
    import_jsx_runtime = __toESM(require_jsx_runtime()), _excluded7 = ["className", "component"];
  }
});

// node_modules/@mui/system/esm/propsToClassKey.js
function isEmpty(string) {
  return string.length === 0;
}
function propsToClassKey(props) {
  let {
    variant
  } = props, other = _objectWithoutPropertiesLoose2(props, _excluded8), classKey = variant || "";
  return Object.keys(other).sort().forEach((key) => {
    key === "color" ? classKey += isEmpty(classKey) ? props[key] : capitalize(props[key]) : classKey += `${isEmpty(classKey) ? key : capitalize(key)}${capitalize(props[key].toString())}`;
  }), classKey;
}
var _excluded8, init_propsToClassKey = __esm({
  "node_modules/@mui/system/esm/propsToClassKey.js"() {
    init_objectWithoutPropertiesLoose();
    init_esm2();
    _excluded8 = ["variant"];
  }
});

// node_modules/@mui/system/esm/createStyled.js
function isEmpty2(obj) {
  return Object.keys(obj).length === 0;
}
function isStringTag(tag) {
  return typeof tag == "string" && tag.charCodeAt(0) > 96;
}
function shouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
function createStyled(input = {}) {
  let {
    defaultTheme: defaultTheme4 = systemDefaultTheme2,
    rootShouldForwardProp: rootShouldForwardProp2 = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp
  } = input, systemSx = (props) => {
    let theme = isEmpty2(props.theme) ? defaultTheme4 : props.theme;
    return styleFunctionSx_default(_extends5({}, props, {
      theme
    }));
  };
  return systemSx.__mui_systemSx = !0, (tag, inputOptions = {}) => {
    internal_processStyles(tag, (styles) => styles.filter((style3) => !(style3 != null && style3.__mui_systemSx)));
    let {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver
    } = inputOptions, options = _objectWithoutPropertiesLoose2(inputOptions, _excluded9), skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : componentSlot && componentSlot !== "Root" || !1, skipSx = inputSkipSx || !1, label;
    componentName && (label = `${componentName}-${lowercaseFirstLetter(componentSlot || "Root")}`);
    let shouldForwardPropOption = shouldForwardProp;
    componentSlot === "Root" ? shouldForwardPropOption = rootShouldForwardProp2 : componentSlot ? shouldForwardPropOption = slotShouldForwardProp : isStringTag(tag) && (shouldForwardPropOption = void 0);
    let defaultStyledResolver = styled(tag, _extends5({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options)), muiStyledResolver = (styleArg, ...expressions) => {
      let expressionsWithDefaultTheme = expressions ? expressions.map((stylesArg) => typeof stylesArg == "function" && stylesArg.__emotion_real !== stylesArg ? (_ref) => {
        let {
          theme: themeInput
        } = _ref, other = _objectWithoutPropertiesLoose2(_ref, _excluded22);
        return stylesArg(_extends5({
          theme: isEmpty2(themeInput) ? defaultTheme4 : themeInput
        }, other));
      } : stylesArg) : [], transformedStyleArg = styleArg;
      componentName && overridesResolver && expressionsWithDefaultTheme.push((props) => {
        let theme = isEmpty2(props.theme) ? defaultTheme4 : props.theme, styleOverrides = getStyleOverrides(componentName, theme);
        if (styleOverrides) {
          let resolvedStyleOverrides = {};
          return Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
            resolvedStyleOverrides[slotKey] = typeof slotStyle == "function" ? slotStyle(_extends5({}, props, {
              theme
            })) : slotStyle;
          }), overridesResolver(props, resolvedStyleOverrides);
        }
        return null;
      }), componentName && !skipVariantsResolver && expressionsWithDefaultTheme.push((props) => {
        let theme = isEmpty2(props.theme) ? defaultTheme4 : props.theme;
        return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
      }), skipSx || expressionsWithDefaultTheme.push(systemSx);
      let numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        let placeholders = new Array(numOfCustomFnsApplied).fill("");
        transformedStyleArg = [...styleArg, ...placeholders], transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else
        typeof styleArg == "function" && styleArg.__emotion_real !== styleArg && (transformedStyleArg = (_ref2) => {
          let {
            theme: themeInput
          } = _ref2, other = _objectWithoutPropertiesLoose2(_ref2, _excluded32);
          return styleArg(_extends5({
            theme: isEmpty2(themeInput) ? defaultTheme4 : themeInput
          }, other));
        });
      let Component2 = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
      {
        let displayName;
        componentName && (displayName = `${componentName}${componentSlot || ""}`), displayName === void 0 && (displayName = `Styled(${getDisplayName(tag)})`), Component2.displayName = displayName;
      }
      return Component2;
    };
    return defaultStyledResolver.withConfig && (muiStyledResolver.withConfig = defaultStyledResolver.withConfig), muiStyledResolver;
  };
}
var _excluded9, _excluded22, _excluded32, getStyleOverrides, getVariantStyles, variantsResolver, systemDefaultTheme2, lowercaseFirstLetter, init_createStyled = __esm({
  "node_modules/@mui/system/esm/createStyled.js"() {
    init_objectWithoutPropertiesLoose();
    init_extends();
    init_styled_engine();
    init_esm2();
    init_createTheme2();
    init_propsToClassKey();
    init_styleFunctionSx2();
    _excluded9 = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"], _excluded22 = ["theme"], _excluded32 = ["theme"];
    getStyleOverrides = (name, theme) => theme.components && theme.components[name] && theme.components[name].styleOverrides ? theme.components[name].styleOverrides : null, getVariantStyles = (name, theme) => {
      let variants = [];
      theme && theme.components && theme.components[name] && theme.components[name].variants && (variants = theme.components[name].variants);
      let variantsStyles = {};
      return variants.forEach((definition) => {
        let key = propsToClassKey(definition.props);
        variantsStyles[key] = definition.style;
      }), variantsStyles;
    }, variantsResolver = (props, styles, theme, name) => {
      var _theme$components, _theme$components$nam;
      let {
        ownerState = {}
      } = props, variantsStyles = [], themeVariants = theme == null || (_theme$components = theme.components) == null || (_theme$components$nam = _theme$components[name]) == null ? void 0 : _theme$components$nam.variants;
      return themeVariants && themeVariants.forEach((themeVariant) => {
        let isMatch = !0;
        Object.keys(themeVariant.props).forEach((key) => {
          ownerState[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key] && (isMatch = !1);
        }), isMatch && variantsStyles.push(styles[propsToClassKey(themeVariant.props)]);
      }), variantsStyles;
    };
    systemDefaultTheme2 = createTheme_default(), lowercaseFirstLetter = (string) => string.charAt(0).toLowerCase() + string.slice(1);
  }
});

// node_modules/@mui/system/esm/styled.js
var styled2, styled_default, init_styled = __esm({
  "node_modules/@mui/system/esm/styled.js"() {
    init_createStyled();
    styled2 = createStyled(), styled_default = styled2;
  }
});

// node_modules/@mui/system/esm/useThemeProps/getThemeProps.js
function getThemeProps(params) {
  let {
    theme,
    name,
    props
  } = params;
  return !theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps ? props : resolveProps(theme.components[name].defaultProps, props);
}
var init_getThemeProps = __esm({
  "node_modules/@mui/system/esm/useThemeProps/getThemeProps.js"() {
    init_esm2();
  }
});

// node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
function useThemeProps({
  props,
  name,
  defaultTheme: defaultTheme4
}) {
  let theme = useTheme_default(defaultTheme4);
  return getThemeProps({
    theme,
    name,
    props
  });
}
var init_useThemeProps = __esm({
  "node_modules/@mui/system/esm/useThemeProps/useThemeProps.js"() {
    init_getThemeProps();
    init_useTheme3();
  }
});

// node_modules/@mui/system/esm/useThemeProps/index.js
var init_useThemeProps2 = __esm({
  "node_modules/@mui/system/esm/useThemeProps/index.js"() {
    init_useThemeProps();
  }
});

// node_modules/@mui/system/esm/colorManipulator.js
function clamp(value, min = 0, max = 1) {
  return (value < min || value > max) && console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`), Math.min(Math.max(min, value), max);
}
function hexToRgb(color2) {
  color2 = color2.slice(1);
  let re = new RegExp(`.{1,${color2.length >= 6 ? 2 : 1}}`, "g"), colors = color2.match(re);
  return colors && colors[0].length === 1 && (colors = colors.map((n) => n + n)), colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n, index) => index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function decomposeColor(color2) {
  if (color2.type)
    return color2;
  if (color2.charAt(0) === "#")
    return decomposeColor(hexToRgb(color2));
  let marker = color2.indexOf("("), type = color2.substring(0, marker);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1)
    throw new Error(`MUI: Unsupported \`${color2}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`);
  let values3 = color2.substring(marker + 1, color2.length - 1), colorSpace;
  if (type === "color") {
    if (values3 = values3.split(" "), colorSpace = values3.shift(), values3.length === 4 && values3[3].charAt(0) === "/" && (values3[3] = values3[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1)
      throw new Error(`MUI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`);
  } else
    values3 = values3.split(",");
  return values3 = values3.map((value) => parseFloat(value)), {
    type,
    values: values3,
    colorSpace
  };
}
function recomposeColor(color2) {
  let {
    type,
    colorSpace
  } = color2, {
    values: values3
  } = color2;
  return type.indexOf("rgb") !== -1 ? values3 = values3.map((n, i) => i < 3 ? parseInt(n, 10) : n) : type.indexOf("hsl") !== -1 && (values3[1] = `${values3[1]}%`, values3[2] = `${values3[2]}%`), type.indexOf("color") !== -1 ? values3 = `${colorSpace} ${values3.join(" ")}` : values3 = `${values3.join(", ")}`, `${type}(${values3})`;
}
function hslToRgb(color2) {
  color2 = decomposeColor(color2);
  let {
    values: values3
  } = color2, h = values3[0], s = values3[1] / 100, l = values3[2] / 100, a = s * Math.min(l, 1 - l), f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1), type = "rgb", rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  return color2.type === "hsla" && (type += "a", rgb.push(values3[3])), recomposeColor({
    type,
    values: rgb
  });
}
function getLuminance(color2) {
  color2 = decomposeColor(color2);
  let rgb = color2.type === "hsl" || color2.type === "hsla" ? decomposeColor(hslToRgb(color2)).values : color2.values;
  return rgb = rgb.map((val) => (color2.type !== "color" && (val /= 255), val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4)), Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function getContrastRatio(foreground, background) {
  let lumA = getLuminance(foreground), lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function alpha(color2, value) {
  return color2 = decomposeColor(color2), value = clamp(value), (color2.type === "rgb" || color2.type === "hsl") && (color2.type += "a"), color2.type === "color" ? color2.values[3] = `/${value}` : color2.values[3] = value, recomposeColor(color2);
}
function darken(color2, coefficient) {
  if (color2 = decomposeColor(color2), coefficient = clamp(coefficient), color2.type.indexOf("hsl") !== -1)
    color2.values[2] *= 1 - coefficient;
  else if (color2.type.indexOf("rgb") !== -1 || color2.type.indexOf("color") !== -1)
    for (let i = 0; i < 3; i += 1)
      color2.values[i] *= 1 - coefficient;
  return recomposeColor(color2);
}
function lighten(color2, coefficient) {
  if (color2 = decomposeColor(color2), coefficient = clamp(coefficient), color2.type.indexOf("hsl") !== -1)
    color2.values[2] += (100 - color2.values[2]) * coefficient;
  else if (color2.type.indexOf("rgb") !== -1)
    for (let i = 0; i < 3; i += 1)
      color2.values[i] += (255 - color2.values[i]) * coefficient;
  else if (color2.type.indexOf("color") !== -1)
    for (let i = 0; i < 3; i += 1)
      color2.values[i] += (1 - color2.values[i]) * coefficient;
  return recomposeColor(color2);
}
var init_colorManipulator = __esm({
  "node_modules/@mui/system/esm/colorManipulator.js"() {
  }
});

// node_modules/@mui/system/esm/Container/createContainer.js
function createContainer(options = {}) {
  let {
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps: useThemeProps3 = useThemePropsDefault,
    componentName = "MuiContainer"
  } = options, ContainerRoot = createStyledComponent(({
    theme,
    ownerState
  }) => _extends5({
    width: "100%",
    marginLeft: "auto",
    boxSizing: "border-box",
    marginRight: "auto",
    display: "block"
  }, !ownerState.disableGutters && {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
  }), ({
    theme,
    ownerState
  }) => ownerState.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpointValueKey) => {
    let breakpoint = breakpointValueKey, value = theme.breakpoints.values[breakpoint];
    return value !== 0 && (acc[theme.breakpoints.up(breakpoint)] = {
      maxWidth: `${value}${theme.breakpoints.unit}`
    }), acc;
  }, {}), ({
    theme,
    ownerState
  }) => _extends5({}, ownerState.maxWidth === "xs" && {
    [theme.breakpoints.up("xs")]: {
      maxWidth: Math.max(theme.breakpoints.values.xs, 444)
    }
  }, ownerState.maxWidth && ownerState.maxWidth !== "xs" && {
    [theme.breakpoints.up(ownerState.maxWidth)]: {
      maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`
    }
  })), Container2 = /* @__PURE__ */ React17.forwardRef(function(inProps, ref) {
    let props = useThemeProps3(inProps), {
      className,
      component = "div",
      disableGutters = !1,
      fixed = !1,
      maxWidth: maxWidth2 = "lg"
    } = props, other = _objectWithoutPropertiesLoose2(props, _excluded10), ownerState = _extends5({}, props, {
      component,
      disableGutters,
      fixed,
      maxWidth: maxWidth2
    }), classes = useUtilityClasses(ownerState, componentName);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ContainerRoot, _extends5({
      as: component,
      ownerState,
      className: clsx_m_default(classes.root, className),
      ref
    }, other));
  });
  return Container2.propTypes = {
    children: import_prop_types4.default.node,
    classes: import_prop_types4.default.object,
    className: import_prop_types4.default.string,
    component: import_prop_types4.default.elementType,
    disableGutters: import_prop_types4.default.bool,
    fixed: import_prop_types4.default.bool,
    maxWidth: import_prop_types4.default.oneOfType([import_prop_types4.default.oneOf(["xs", "sm", "md", "lg", "xl", !1]), import_prop_types4.default.string]),
    sx: import_prop_types4.default.oneOfType([import_prop_types4.default.arrayOf(import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object, import_prop_types4.default.bool])), import_prop_types4.default.func, import_prop_types4.default.object])
  }, Container2;
}
var React17, import_prop_types4, import_jsx_runtime2, _excluded10, defaultTheme, defaultCreateStyledComponent, useThemePropsDefault, useUtilityClasses, init_createContainer = __esm({
  "node_modules/@mui/system/esm/Container/createContainer.js"() {
    init_objectWithoutPropertiesLoose();
    init_extends();
    React17 = __toESM(require_react()), import_prop_types4 = __toESM(require_prop_types());
    init_clsx_m();
    init_esm2();
    init_useThemeProps2();
    init_styled();
    init_createTheme2();
    import_jsx_runtime2 = __toESM(require_jsx_runtime()), _excluded10 = ["className", "component", "disableGutters", "fixed", "maxWidth", "classes"], defaultTheme = createTheme_default(), defaultCreateStyledComponent = styled_default("div", {
      name: "MuiContainer",
      slot: "Root",
      overridesResolver: (props, styles) => {
        let {
          ownerState
        } = props;
        return [styles.root, styles[`maxWidth${capitalize(String(ownerState.maxWidth))}`], ownerState.fixed && styles.fixed, ownerState.disableGutters && styles.disableGutters];
      }
    }), useThemePropsDefault = (inProps) => useThemeProps({
      props: inProps,
      name: "MuiContainer",
      defaultTheme
    }), useUtilityClasses = (ownerState, componentName) => {
      let getContainerUtilityClass = (slot) => generateUtilityClass(componentName, slot), {
        classes,
        fixed,
        disableGutters,
        maxWidth: maxWidth2
      } = ownerState, slots = {
        root: ["root", maxWidth2 && `maxWidth${capitalize(String(maxWidth2))}`, fixed && "fixed", disableGutters && "disableGutters"]
      };
      return composeClasses(slots, getContainerUtilityClass, classes);
    };
  }
});

// node_modules/@mui/system/esm/Container/containerClasses.js
var containerClasses, init_containerClasses = __esm({
  "node_modules/@mui/system/esm/Container/containerClasses.js"() {
    init_esm2();
    containerClasses = generateUtilityClasses("MuiContainer", ["root", "disableGutters", "fixed", "maxWidthXs", "maxWidthSm", "maxWidthMd", "maxWidthLg", "maxWidthXl"]);
  }
});

// node_modules/@mui/system/esm/Container/index.js
var init_Container = __esm({
  "node_modules/@mui/system/esm/Container/index.js"() {
    init_containerClasses();
  }
});

// node_modules/@mui/system/esm/Unstable_Grid/GridProps.js
var init_GridProps = __esm({
  "node_modules/@mui/system/esm/Unstable_Grid/GridProps.js"() {
  }
});

// node_modules/@mui/system/esm/Unstable_Grid/gridClasses.js
var SPACINGS, DIRECTIONS, WRAPS, GRID_SIZES, gridClasses, init_gridClasses = __esm({
  "node_modules/@mui/system/esm/Unstable_Grid/gridClasses.js"() {
    init_esm2();
    SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], DIRECTIONS = ["column-reverse", "column", "row-reverse", "row"], WRAPS = ["nowrap", "wrap-reverse", "wrap"], GRID_SIZES = ["auto", !0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], gridClasses = generateUtilityClasses("MuiGrid", [
      "root",
      "container",
      "item",
      ...SPACINGS.map((spacing2) => `spacing-xs-${spacing2}`),
      ...DIRECTIONS.map((direction) => `direction-xs-${direction}`),
      ...WRAPS.map((wrap) => `wrap-xs-${wrap}`),
      ...GRID_SIZES.map((size) => `grid-xs-${size}`),
      ...GRID_SIZES.map((size) => `grid-sm-${size}`),
      ...GRID_SIZES.map((size) => `grid-md-${size}`),
      ...GRID_SIZES.map((size) => `grid-lg-${size}`),
      ...GRID_SIZES.map((size) => `grid-xl-${size}`)
    ]);
  }
});

// node_modules/@mui/system/esm/Unstable_Grid/index.js
var init_Unstable_Grid = __esm({
  "node_modules/@mui/system/esm/Unstable_Grid/index.js"() {
    init_GridProps();
    init_gridClasses();
  }
});

// node_modules/@mui/system/esm/Stack/StackProps.js
var init_StackProps = __esm({
  "node_modules/@mui/system/esm/Stack/StackProps.js"() {
  }
});

// node_modules/@mui/system/esm/Stack/stackClasses.js
var stackClasses, init_stackClasses = __esm({
  "node_modules/@mui/system/esm/Stack/stackClasses.js"() {
    init_esm2();
    stackClasses = generateUtilityClasses("MuiStack", ["root"]);
  }
});

// node_modules/@mui/system/esm/Stack/index.js
var init_Stack = __esm({
  "node_modules/@mui/system/esm/Stack/index.js"() {
    init_StackProps();
    init_stackClasses();
  }
});

// node_modules/@mui/system/esm/index.js
var init_esm3 = __esm({
  "node_modules/@mui/system/esm/index.js"() {
    init_styled_engine();
    init_borders();
    init_flexbox();
    init_cssGrid();
    init_palette();
    init_positions();
    init_sizing();
    init_spacing();
    init_style();
    init_typography();
    init_styleFunctionSx2();
    init_createBox();
    init_createStyled();
    init_createStyled();
    init_createTheme2();
    init_useThemeProps2();
    init_colorManipulator();
    init_createContainer();
    init_Container();
    init_Unstable_Grid();
    init_Stack();
  }
});

// node_modules/@mui/material/generateUtilityClass/index.js
var init_generateUtilityClass3 = __esm({
  "node_modules/@mui/material/generateUtilityClass/index.js"() {
    init_esm2();
  }
});

// node_modules/@mui/material/styles/createMixins.js
function createMixins(breakpoints, mixins) {
  return _extends5({
    toolbar: {
      minHeight: 56,
      [breakpoints.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    }
  }, mixins);
}
var init_createMixins = __esm({
  "node_modules/@mui/material/styles/createMixins.js"() {
    init_extends();
  }
});

// node_modules/@mui/material/styles/createPalette.js
function addLightOrDark(intent, direction, shade, tonalOffset) {
  let tonalOffsetLight = tonalOffset.light || tonalOffset, tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  intent[direction] || (intent.hasOwnProperty(shade) ? intent[direction] = intent[shade] : direction === "light" ? intent.light = lighten(intent.main, tonalOffsetLight) : direction === "dark" && (intent.dark = darken(intent.main, tonalOffsetDark)));
}
function getDefaultPrimary(mode = "light") {
  return mode === "dark" ? {
    main: blue_default[200],
    light: blue_default[50],
    dark: blue_default[400]
  } : {
    main: blue_default[700],
    light: blue_default[400],
    dark: blue_default[800]
  };
}
function getDefaultSecondary(mode = "light") {
  return mode === "dark" ? {
    main: purple_default[200],
    light: purple_default[50],
    dark: purple_default[400]
  } : {
    main: purple_default[500],
    light: purple_default[300],
    dark: purple_default[700]
  };
}
function getDefaultError(mode = "light") {
  return mode === "dark" ? {
    main: red_default[500],
    light: red_default[300],
    dark: red_default[700]
  } : {
    main: red_default[700],
    light: red_default[400],
    dark: red_default[800]
  };
}
function getDefaultInfo(mode = "light") {
  return mode === "dark" ? {
    main: lightBlue_default[400],
    light: lightBlue_default[300],
    dark: lightBlue_default[700]
  } : {
    main: lightBlue_default[700],
    light: lightBlue_default[500],
    dark: lightBlue_default[900]
  };
}
function getDefaultSuccess(mode = "light") {
  return mode === "dark" ? {
    main: green_default[400],
    light: green_default[300],
    dark: green_default[700]
  } : {
    main: green_default[800],
    light: green_default[500],
    dark: green_default[900]
  };
}
function getDefaultWarning(mode = "light") {
  return mode === "dark" ? {
    main: orange_default[400],
    light: orange_default[300],
    dark: orange_default[700]
  } : {
    main: "#ed6c02",
    light: orange_default[500],
    dark: orange_default[900]
  };
}
function createPalette(palette2) {
  let {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette2, other = _objectWithoutPropertiesLoose2(palette2, _excluded11), primary = palette2.primary || getDefaultPrimary(mode), secondary = palette2.secondary || getDefaultSecondary(mode), error = palette2.error || getDefaultError(mode), info = palette2.info || getDefaultInfo(mode), success = palette2.success || getDefaultSuccess(mode), warning3 = palette2.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    let contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    {
      let contrast = getContrastRatio(background, contrastText);
      contrast < 3 && console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return contrastText;
  }
  let augmentColor = ({
    color: color2,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    if (color2 = _extends5({}, color2), !color2.main && color2[mainShade] && (color2.main = color2[mainShade]), !color2.hasOwnProperty("main"))
      throw new Error(`MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.`);
    if (typeof color2.main != "string")
      throw new Error(`MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color2.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`);
    return addLightOrDark(color2, "light", lightShade, tonalOffset), addLightOrDark(color2, "dark", darkShade, tonalOffset), color2.contrastText || (color2.contrastText = getContrastText(color2.main)), color2;
  }, modes = {
    dark,
    light
  };
  return modes[mode] || console.error(`MUI: The palette mode \`${mode}\` is not supported.`), deepmerge(_extends5({
    common: _extends5({}, common_default),
    mode,
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    error: augmentColor({
      color: error,
      name: "error"
    }),
    warning: augmentColor({
      color: warning3,
      name: "warning"
    }),
    info: augmentColor({
      color: info,
      name: "info"
    }),
    success: augmentColor({
      color: success,
      name: "success"
    }),
    grey: grey_default,
    contrastThreshold,
    getContrastText,
    augmentColor,
    tonalOffset
  }, modes[mode]), other);
}
var _excluded11, light, dark, init_createPalette = __esm({
  "node_modules/@mui/material/styles/createPalette.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm2();
    init_esm3();
    init_common();
    init_grey();
    init_purple();
    init_red();
    init_orange();
    init_blue();
    init_lightBlue();
    init_green();
    _excluded11 = ["mode", "contrastThreshold", "tonalOffset"], light = {
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.6)",
        disabled: "rgba(0, 0, 0, 0.38)"
      },
      divider: "rgba(0, 0, 0, 0.12)",
      background: {
        paper: common_default.white,
        default: common_default.white
      },
      action: {
        active: "rgba(0, 0, 0, 0.54)",
        hover: "rgba(0, 0, 0, 0.04)",
        hoverOpacity: 0.04,
        selected: "rgba(0, 0, 0, 0.08)",
        selectedOpacity: 0.08,
        disabled: "rgba(0, 0, 0, 0.26)",
        disabledBackground: "rgba(0, 0, 0, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(0, 0, 0, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.12
      }
    }, dark = {
      text: {
        primary: common_default.white,
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
        icon: "rgba(255, 255, 255, 0.5)"
      },
      divider: "rgba(255, 255, 255, 0.12)",
      background: {
        paper: "#121212",
        default: "#121212"
      },
      action: {
        active: common_default.white,
        hover: "rgba(255, 255, 255, 0.08)",
        hoverOpacity: 0.08,
        selected: "rgba(255, 255, 255, 0.16)",
        selectedOpacity: 0.16,
        disabled: "rgba(255, 255, 255, 0.3)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(255, 255, 255, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.24
      }
    };
  }
});

// node_modules/@mui/material/styles/createTypography.js
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
function createTypography(palette2, typography2) {
  let _ref = typeof typography2 == "function" ? typography2(palette2) : typography2, {
    fontFamily: fontFamily2 = defaultFontFamily,
    fontSize: fontSize2 = 14,
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    htmlFontSize = 16,
    allVariants,
    pxToRem: pxToRem2
  } = _ref, other = _objectWithoutPropertiesLoose2(_ref, _excluded12);
  typeof fontSize2 != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof htmlFontSize != "number" && console.error("MUI: `htmlFontSize` is required to be a number.");
  let coef = fontSize2 / 14, pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`), buildVariant = (fontWeight2, size, lineHeight2, letterSpacing2, casing) => _extends5({
    fontFamily: fontFamily2,
    fontWeight: fontWeight2,
    fontSize: pxToRem(size),
    lineHeight: lineHeight2
  }, fontFamily2 === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing2 / size)}em`
  } : {}, casing, allVariants), variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  };
  return deepmerge(_extends5({
    htmlFontSize,
    pxToRem,
    fontFamily: fontFamily2,
    fontSize: fontSize2,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: !1
  });
}
var _excluded12, caseAllCaps, defaultFontFamily, init_createTypography = __esm({
  "node_modules/@mui/material/styles/createTypography.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm2();
    _excluded12 = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
    caseAllCaps = {
      textTransform: "uppercase"
    }, defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
  }
});

// node_modules/@mui/material/styles/shadows.js
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${0.2})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${0.14})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${0.12})`].join(",");
}
var shadows, shadows_default, init_shadows = __esm({
  "node_modules/@mui/material/styles/shadows.js"() {
    shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], shadows_default = shadows;
  }
});

// node_modules/@mui/material/styles/createTransitions.js
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height2) {
  if (!height2)
    return 0;
  let constant = height2 / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function createTransitions(inputTransitions) {
  let mergedEasing = _extends5({}, easing, inputTransitions.easing), mergedDuration = _extends5({}, duration, inputTransitions.duration);
  return _extends5({
    getAutoHeightDuration,
    create: (props = ["all"], options = {}) => {
      let {
        duration: durationOption = mergedDuration.standard,
        easing: easingOption = mergedEasing.easeInOut,
        delay = 0
      } = options, other = _objectWithoutPropertiesLoose2(options, _excluded13);
      {
        let isString2 = (value) => typeof value == "string", isNumber2 = (value) => !isNaN(parseFloat(value));
        !isString2(props) && !Array.isArray(props) && console.error('MUI: Argument "props" must be a string or Array.'), !isNumber2(durationOption) && !isString2(durationOption) && console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`), isString2(easingOption) || console.error('MUI: Argument "easing" must be a string.'), !isNumber2(delay) && !isString2(delay) && console.error('MUI: Argument "delay" must be a number or a string.'), Object.keys(other).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`);
      }
      return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption == "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay == "string" ? delay : formatMs(delay)}`).join(",");
    }
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
}
var _excluded13, easing, duration, init_createTransitions = __esm({
  "node_modules/@mui/material/styles/createTransitions.js"() {
    init_objectWithoutPropertiesLoose();
    init_extends();
    _excluded13 = ["duration", "easing", "delay"], easing = {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    }, duration = {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
    };
  }
});

// node_modules/@mui/material/styles/zIndex.js
var zIndex2, zIndex_default, init_zIndex = __esm({
  "node_modules/@mui/material/styles/zIndex.js"() {
    zIndex2 = {
      mobileStepper: 1e3,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500
    }, zIndex_default = zIndex2;
  }
});

// node_modules/@mui/material/styles/createTheme.js
function createTheme2(options = {}, ...args) {
  let {
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {}
  } = options, other = _objectWithoutPropertiesLoose2(options, _excluded14);
  if (options.vars)
    throw new Error("MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.");
  let palette2 = createPalette(paletteInput), systemTheme = createTheme_default(options), muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette: palette2,
    shadows: shadows_default.slice(),
    typography: createTypography(palette2, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends5({}, zIndex_default)
  });
  muiTheme = deepmerge(muiTheme, other), muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  {
    let stateClasses = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], traverse = (node, component) => {
      let key;
      for (key in node) {
        let child = node[key];
        if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          {
            let stateClass = generateUtilityClass("", key);
            console.error([`MUI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node, null, 2), "", `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          node[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach((component) => {
      let styleOverrides = muiTheme.components[component].styleOverrides;
      styleOverrides && component.indexOf("Mui") === 0 && traverse(styleOverrides, component);
    });
  }
  return muiTheme.unstable_sxConfig = _extends5({}, defaultSxConfig_default, other == null ? void 0 : other.unstable_sxConfig), muiTheme.unstable_sx = function(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  }, muiTheme;
}
var _excluded14, createTheme_default2, init_createTheme3 = __esm({
  "node_modules/@mui/material/styles/createTheme.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm2();
    init_esm3();
    init_generateUtilityClass3();
    init_createMixins();
    init_createPalette();
    init_createTypography();
    init_shadows();
    init_createTransitions();
    init_zIndex();
    _excluded14 = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
    createTheme_default2 = createTheme2;
  }
});

// node_modules/@mui/material/styles/defaultTheme.js
var defaultTheme2, defaultTheme_default, init_defaultTheme = __esm({
  "node_modules/@mui/material/styles/defaultTheme.js"() {
    init_createTheme3();
    defaultTheme2 = createTheme_default2(), defaultTheme_default = defaultTheme2;
  }
});

// node_modules/@mui/material/styles/useThemeProps.js
function useThemeProps2({
  props,
  name
}) {
  return useThemeProps({
    props,
    name,
    defaultTheme: defaultTheme_default
  });
}
var init_useThemeProps3 = __esm({
  "node_modules/@mui/material/styles/useThemeProps.js"() {
    init_esm3();
    init_defaultTheme();
  }
});

// node_modules/@mui/material/styles/styled.js
var rootShouldForwardProp, styled3, styled_default2, init_styled2 = __esm({
  "node_modules/@mui/material/styles/styled.js"() {
    init_esm3();
    init_defaultTheme();
    rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== "classes", styled3 = createStyled({
      defaultTheme: defaultTheme_default,
      rootShouldForwardProp
    }), styled_default2 = styled3;
  }
});

// node_modules/@mui/base/className/index.js
var init_className = __esm({
  "node_modules/@mui/base/className/index.js"() {
    init_esm2();
  }
});

// node_modules/@mui/material/utils/capitalize.js
var capitalize_default, init_capitalize2 = __esm({
  "node_modules/@mui/material/utils/capitalize.js"() {
    init_esm2();
    capitalize_default = capitalize;
  }
});

// node_modules/@mui/material/utils/createChainedFunction.js
var createChainedFunction_default, init_createChainedFunction2 = __esm({
  "node_modules/@mui/material/utils/createChainedFunction.js"() {
    init_esm2();
    createChainedFunction_default = createChainedFunction;
  }
});

// node_modules/@mui/base/utils/types.js
var init_types = __esm({
  "node_modules/@mui/base/utils/types.js"() {
  }
});

// node_modules/@mui/base/utils/index.js
var init_utils2 = __esm({
  "node_modules/@mui/base/utils/index.js"() {
    init_types();
  }
});

// node_modules/@mui/base/AutocompleteUnstyled/index.js
var init_AutocompleteUnstyled = __esm({
  "node_modules/@mui/base/AutocompleteUnstyled/index.js"() {
  }
});

// node_modules/@mui/base/composeClasses/index.js
var init_composeClasses3 = __esm({
  "node_modules/@mui/base/composeClasses/index.js"() {
    init_esm2();
  }
});

// node_modules/@mui/base/BadgeUnstyled/useBadge.js
var init_useBadge = __esm({
  "node_modules/@mui/base/BadgeUnstyled/useBadge.js"() {
  }
});

// node_modules/@mui/base/generateUtilityClasses/index.js
var init_generateUtilityClasses3 = __esm({
  "node_modules/@mui/base/generateUtilityClasses/index.js"() {
    init_esm2();
  }
});

// node_modules/@mui/base/BadgeUnstyled/badgeUnstyledClasses.js
var badgeUnstyledClasses, init_badgeUnstyledClasses = __esm({
  "node_modules/@mui/base/BadgeUnstyled/badgeUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    badgeUnstyledClasses = generateUtilityClasses("MuiBadge", ["root", "badge", "invisible"]);
  }
});

// node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.types.js
var init_BadgeUnstyled_types = __esm({
  "node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/BadgeUnstyled/index.js
var init_BadgeUnstyled = __esm({
  "node_modules/@mui/base/BadgeUnstyled/index.js"() {
    init_useBadge();
    init_BadgeUnstyled_types();
    init_badgeUnstyledClasses();
  }
});

// node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.types.js
var init_ButtonUnstyled_types = __esm({
  "node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/ButtonUnstyled/useButton.types.js
var init_useButton_types = __esm({
  "node_modules/@mui/base/ButtonUnstyled/useButton.types.js"() {
  }
});

// node_modules/@mui/base/ButtonUnstyled/index.js
var init_ButtonUnstyled = __esm({
  "node_modules/@mui/base/ButtonUnstyled/index.js"() {
    init_ButtonUnstyled_types();
    init_useButton_types();
  }
});

// node_modules/@mui/base/FormControlUnstyled/formControlUnstyledClasses.js
var formControlUnstyledClasses, init_formControlUnstyledClasses = __esm({
  "node_modules/@mui/base/FormControlUnstyled/formControlUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    formControlUnstyledClasses = generateUtilityClasses("MuiFormControl", ["root", "disabled", "error", "filled", "focused", "required"]);
  }
});

// node_modules/@mui/base/FormControlUnstyled/index.js
var init_FormControlUnstyled = __esm({
  "node_modules/@mui/base/FormControlUnstyled/index.js"() {
    init_formControlUnstyledClasses();
  }
});

// node_modules/@mui/base/InputUnstyled/inputUnstyledClasses.js
var inputUnstyledClasses, init_inputUnstyledClasses = __esm({
  "node_modules/@mui/base/InputUnstyled/inputUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    inputUnstyledClasses = generateUtilityClasses("MuiInput", ["root", "formControl", "focused", "disabled", "error", "multiline", "input", "inputMultiline", "inputTypeSearch", "adornedStart", "adornedEnd"]);
  }
});

// node_modules/@mui/base/InputUnstyled/InputUnstyled.types.js
var init_InputUnstyled_types = __esm({
  "node_modules/@mui/base/InputUnstyled/InputUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/InputUnstyled/useInput.types.js
var init_useInput_types = __esm({
  "node_modules/@mui/base/InputUnstyled/useInput.types.js"() {
  }
});

// node_modules/@mui/base/InputUnstyled/index.js
var init_InputUnstyled = __esm({
  "node_modules/@mui/base/InputUnstyled/index.js"() {
    init_InputUnstyled_types();
    init_useInput_types();
    init_inputUnstyledClasses();
  }
});

// node_modules/@mui/base/ListboxUnstyled/useListbox.types.js
var ActionTypes, init_useListbox_types = __esm({
  "node_modules/@mui/base/ListboxUnstyled/useListbox.types.js"() {
    (function(ActionTypes2) {
      ActionTypes2.blur = "blur", ActionTypes2.focus = "focus", ActionTypes2.keyDown = "keyDown", ActionTypes2.optionClick = "optionClick", ActionTypes2.optionHover = "optionHover", ActionTypes2.optionsChange = "optionsChange", ActionTypes2.setValue = "setValue", ActionTypes2.setHighlight = "setHighlight", ActionTypes2.textNavigation = "textNagivation";
    })(ActionTypes || (ActionTypes = {}));
  }
});

// node_modules/@mui/base/ListboxUnstyled/index.js
var init_ListboxUnstyled = __esm({
  "node_modules/@mui/base/ListboxUnstyled/index.js"() {
    init_useListbox_types();
  }
});

// node_modules/@mui/base/MenuUnstyled/MenuUnstyledContext.js
var React18, MenuUnstyledContext, init_MenuUnstyledContext = __esm({
  "node_modules/@mui/base/MenuUnstyled/MenuUnstyledContext.js"() {
    React18 = __toESM(require_react()), MenuUnstyledContext = /* @__PURE__ */ React18.createContext(null);
    MenuUnstyledContext.displayName = "MenuUnstyledContext";
  }
});

// node_modules/@mui/base/MenuUnstyled/menuUnstyledClasses.js
var menuUnstyledClasses, init_menuUnstyledClasses = __esm({
  "node_modules/@mui/base/MenuUnstyled/menuUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    menuUnstyledClasses = generateUtilityClasses("MuiMenu", ["root", "listbox", "expanded"]);
  }
});

// node_modules/@mui/base/MenuUnstyled/MenuUnstyled.types.js
var init_MenuUnstyled_types = __esm({
  "node_modules/@mui/base/MenuUnstyled/MenuUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/MenuUnstyled/useMenu.types.js
var init_useMenu_types = __esm({
  "node_modules/@mui/base/MenuUnstyled/useMenu.types.js"() {
  }
});

// node_modules/@mui/base/MenuUnstyled/index.js
var init_MenuUnstyled = __esm({
  "node_modules/@mui/base/MenuUnstyled/index.js"() {
    init_MenuUnstyledContext();
    init_menuUnstyledClasses();
    init_MenuUnstyled_types();
    init_useMenu_types();
  }
});

// node_modules/@mui/base/MenuItemUnstyled/menuItemUnstyledClasses.js
var menuItemUnstyledClasses, init_menuItemUnstyledClasses = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/menuItemUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    menuItemUnstyledClasses = generateUtilityClasses("MuiMenuItem", ["root", "disabled", "focusVisible"]);
  }
});

// node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.types.js
var init_MenuItemUnstyled_types = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/MenuItemUnstyled/useMenuItem.types.js
var init_useMenuItem_types = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/useMenuItem.types.js"() {
  }
});

// node_modules/@mui/base/MenuItemUnstyled/index.js
var init_MenuItemUnstyled = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/index.js"() {
    init_MenuItemUnstyled_types();
    init_menuItemUnstyledClasses();
    init_useMenuItem_types();
  }
});

// node_modules/@mui/base/ModalUnstyled/ModalManager.js
var init_ModalManager = __esm({
  "node_modules/@mui/base/ModalUnstyled/ModalManager.js"() {
  }
});

// node_modules/@mui/base/ModalUnstyled/ModalUnstyled.types.js
var init_ModalUnstyled_types = __esm({
  "node_modules/@mui/base/ModalUnstyled/ModalUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/ModalUnstyled/index.js
var init_ModalUnstyled = __esm({
  "node_modules/@mui/base/ModalUnstyled/index.js"() {
    init_ModalUnstyled_types();
    init_ModalManager();
  }
});

// node_modules/@mui/base/SelectUnstyled/useSelect.types.js
var init_useSelect_types = __esm({
  "node_modules/@mui/base/SelectUnstyled/useSelect.types.js"() {
  }
});

// node_modules/@mui/base/SelectUnstyled/utils.js
var React19, init_utils3 = __esm({
  "node_modules/@mui/base/SelectUnstyled/utils.js"() {
    init_extends();
    React19 = __toESM(require_react());
  }
});

// node_modules/@mui/base/SelectUnstyled/SelectUnstyledContext.js
var React20, init_SelectUnstyledContext = __esm({
  "node_modules/@mui/base/SelectUnstyled/SelectUnstyledContext.js"() {
    React20 = __toESM(require_react());
  }
});

// node_modules/@mui/base/SelectUnstyled/selectUnstyledClasses.js
var selectUnstyledClasses, init_selectUnstyledClasses = __esm({
  "node_modules/@mui/base/SelectUnstyled/selectUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    selectUnstyledClasses = generateUtilityClasses("MuiSelect", ["root", "button", "listbox", "popper", "active", "expanded", "disabled", "focusVisible"]);
  }
});

// node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.types.js
var init_MultiSelectUnstyled_types = __esm({
  "node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/MultiSelectUnstyled/index.js
var init_MultiSelectUnstyled = __esm({
  "node_modules/@mui/base/MultiSelectUnstyled/index.js"() {
    init_MultiSelectUnstyled_types();
  }
});

// node_modules/@mui/base/OptionGroupUnstyled/optionGroupUnstyledClasses.js
var optionGroupUnstyledClasses, init_optionGroupUnstyledClasses = __esm({
  "node_modules/@mui/base/OptionGroupUnstyled/optionGroupUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    optionGroupUnstyledClasses = generateUtilityClasses("MuiOptionGroup", ["root", "label", "list"]);
  }
});

// node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.types.js
var init_OptionGroupUnstyled_types = __esm({
  "node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/OptionGroupUnstyled/index.js
var init_OptionGroupUnstyled = __esm({
  "node_modules/@mui/base/OptionGroupUnstyled/index.js"() {
    init_OptionGroupUnstyled_types();
    init_optionGroupUnstyledClasses();
  }
});

// node_modules/@mui/base/OptionUnstyled/optionUnstyledClasses.js
var optionUnstyledClasses, init_optionUnstyledClasses = __esm({
  "node_modules/@mui/base/OptionUnstyled/optionUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    optionUnstyledClasses = generateUtilityClasses("MuiOption", ["root", "disabled", "selected", "highlighted"]);
  }
});

// node_modules/@mui/base/OptionUnstyled/OptionUnstyled.types.js
var init_OptionUnstyled_types = __esm({
  "node_modules/@mui/base/OptionUnstyled/OptionUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/OptionUnstyled/index.js
var init_OptionUnstyled = __esm({
  "node_modules/@mui/base/OptionUnstyled/index.js"() {
    init_OptionUnstyled_types();
    init_optionUnstyledClasses();
  }
});

// node_modules/@mui/base/SelectUnstyled/SelectUnstyled.types.js
var init_SelectUnstyled_types = __esm({
  "node_modules/@mui/base/SelectUnstyled/SelectUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/SelectUnstyled/index.js
var init_SelectUnstyled = __esm({
  "node_modules/@mui/base/SelectUnstyled/index.js"() {
    init_SelectUnstyledContext();
    init_selectUnstyledClasses();
    init_SelectUnstyled_types();
    init_useSelect_types();
    init_utils3();
  }
});

// node_modules/@mui/base/SliderUnstyled/sliderUnstyledClasses.js
var sliderUnstyledClasses, init_sliderUnstyledClasses = __esm({
  "node_modules/@mui/base/SliderUnstyled/sliderUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    sliderUnstyledClasses = generateUtilityClasses("MuiSlider", ["root", "active", "focusVisible", "disabled", "dragging", "marked", "vertical", "trackInverted", "trackFalse", "rail", "track", "mark", "markActive", "markLabel", "markLabelActive", "thumb"]);
  }
});

// node_modules/@mui/base/SliderUnstyled/useSlider.js
var React21, init_useSlider = __esm({
  "node_modules/@mui/base/SliderUnstyled/useSlider.js"() {
    init_extends();
    React21 = __toESM(require_react());
  }
});

// node_modules/@mui/base/SliderUnstyled/SliderUnstyled.types.js
var init_SliderUnstyled_types = __esm({
  "node_modules/@mui/base/SliderUnstyled/SliderUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/SliderUnstyled/useSlider.types.js
var init_useSlider_types = __esm({
  "node_modules/@mui/base/SliderUnstyled/useSlider.types.js"() {
  }
});

// node_modules/@mui/base/SliderUnstyled/index.js
var init_SliderUnstyled = __esm({
  "node_modules/@mui/base/SliderUnstyled/index.js"() {
    init_SliderUnstyled_types();
    init_useSlider();
    init_useSlider_types();
    init_sliderUnstyledClasses();
  }
});

// node_modules/@mui/base/SnackbarUnstyled/snackbarUnstyledClasses.js
var snackbarUnstyledClasses, init_snackbarUnstyledClasses = __esm({
  "node_modules/@mui/base/SnackbarUnstyled/snackbarUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    snackbarUnstyledClasses = generateUtilityClasses("MuiSnackbar", ["root"]);
  }
});

// node_modules/@mui/base/SnackbarUnstyled/SnackbarUnstyled.types.js
var init_SnackbarUnstyled_types = __esm({
  "node_modules/@mui/base/SnackbarUnstyled/SnackbarUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/SnackbarUnstyled/useSnackbar.types.js
var init_useSnackbar_types = __esm({
  "node_modules/@mui/base/SnackbarUnstyled/useSnackbar.types.js"() {
  }
});

// node_modules/@mui/base/SnackbarUnstyled/index.js
var init_SnackbarUnstyled = __esm({
  "node_modules/@mui/base/SnackbarUnstyled/index.js"() {
    init_SnackbarUnstyled_types();
    init_snackbarUnstyledClasses();
    init_useSnackbar_types();
  }
});

// node_modules/@mui/base/SwitchUnstyled/switchUnstyledClasses.js
var switchUnstyledClasses, init_switchUnstyledClasses = __esm({
  "node_modules/@mui/base/SwitchUnstyled/switchUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    switchUnstyledClasses = generateUtilityClasses("MuiSwitch", ["root", "input", "track", "thumb", "checked", "disabled", "focusVisible", "readOnly"]);
  }
});

// node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.types.js
var init_SwitchUnstyled_types = __esm({
  "node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/SwitchUnstyled/useSwitch.types.js
var init_useSwitch_types = __esm({
  "node_modules/@mui/base/SwitchUnstyled/useSwitch.types.js"() {
  }
});

// node_modules/@mui/base/SwitchUnstyled/index.js
var init_SwitchUnstyled = __esm({
  "node_modules/@mui/base/SwitchUnstyled/index.js"() {
    init_SwitchUnstyled_types();
    init_useSwitch_types();
    init_switchUnstyledClasses();
  }
});

// node_modules/@mui/base/TablePaginationUnstyled/tablePaginationUnstyledClasses.js
var tablePaginationUnstyledClasses, init_tablePaginationUnstyledClasses = __esm({
  "node_modules/@mui/base/TablePaginationUnstyled/tablePaginationUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    tablePaginationUnstyledClasses = generateUtilityClasses("MuiTablePagination", ["root", "toolbar", "spacer", "selectLabel", "selectRoot", "select", "selectIcon", "input", "menuItem", "displayedRows", "actions"]);
  }
});

// node_modules/@mui/base/TablePaginationUnstyled/TablePaginationUnstyled.types.js
var init_TablePaginationUnstyled_types = __esm({
  "node_modules/@mui/base/TablePaginationUnstyled/TablePaginationUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TablePaginationUnstyled/TablePaginationActionsUnstyled.types.js
var init_TablePaginationActionsUnstyled_types = __esm({
  "node_modules/@mui/base/TablePaginationUnstyled/TablePaginationActionsUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TablePaginationUnstyled/index.js
var init_TablePaginationUnstyled = __esm({
  "node_modules/@mui/base/TablePaginationUnstyled/index.js"() {
    init_TablePaginationUnstyled_types();
    init_TablePaginationActionsUnstyled_types();
    init_tablePaginationUnstyledClasses();
  }
});

// node_modules/@mui/base/TabPanelUnstyled/tabPanelUnstyledClasses.js
var tabPanelUnstyledClasses, init_tabPanelUnstyledClasses = __esm({
  "node_modules/@mui/base/TabPanelUnstyled/tabPanelUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    tabPanelUnstyledClasses = generateUtilityClasses("MuiTabPanel", ["root", "hidden"]);
  }
});

// node_modules/@mui/base/TabsUnstyled/tabsUnstyledClasses.js
var tabsUnstyledClasses, init_tabsUnstyledClasses = __esm({
  "node_modules/@mui/base/TabsUnstyled/tabsUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    tabsUnstyledClasses = generateUtilityClasses("MuiTabs", ["root", "horizontal", "vertical"]);
  }
});

// node_modules/@mui/base/TabsUnstyled/useTabs.js
var React22, init_useTabs = __esm({
  "node_modules/@mui/base/TabsUnstyled/useTabs.js"() {
    React22 = __toESM(require_react());
  }
});

// node_modules/@mui/base/TabsUnstyled/TabsContext.js
var React23, Context, init_TabsContext = __esm({
  "node_modules/@mui/base/TabsUnstyled/TabsContext.js"() {
    React23 = __toESM(require_react()), Context = /* @__PURE__ */ React23.createContext(null);
    Context.displayName = "TabsContext";
  }
});

// node_modules/@mui/base/TabsUnstyled/TabsUnstyled.types.js
var init_TabsUnstyled_types = __esm({
  "node_modules/@mui/base/TabsUnstyled/TabsUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TabsUnstyled/index.js
var init_TabsUnstyled = __esm({
  "node_modules/@mui/base/TabsUnstyled/index.js"() {
    init_TabsContext();
    init_tabsUnstyledClasses();
    init_TabsUnstyled_types();
    init_useTabs();
  }
});

// node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.types.js
var init_TabPanelUnstyled_types = __esm({
  "node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TabPanelUnstyled/index.js
var init_TabPanelUnstyled = __esm({
  "node_modules/@mui/base/TabPanelUnstyled/index.js"() {
    init_TabPanelUnstyled_types();
    init_tabPanelUnstyledClasses();
  }
});

// node_modules/@mui/base/TabsListUnstyled/tabsListUnstyledClasses.js
var tabsListUnstyledClasses, init_tabsListUnstyledClasses = __esm({
  "node_modules/@mui/base/TabsListUnstyled/tabsListUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    tabsListUnstyledClasses = generateUtilityClasses("MuiTabsList", ["root", "horizontal", "vertical"]);
  }
});

// node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.types.js
var init_TabsListUnstyled_types = __esm({
  "node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TabsListUnstyled/useTabsList.types.js
var init_useTabsList_types = __esm({
  "node_modules/@mui/base/TabsListUnstyled/useTabsList.types.js"() {
  }
});

// node_modules/@mui/base/TabsListUnstyled/index.js
var init_TabsListUnstyled = __esm({
  "node_modules/@mui/base/TabsListUnstyled/index.js"() {
    init_TabsListUnstyled_types();
    init_tabsListUnstyledClasses();
    init_useTabsList_types();
  }
});

// node_modules/@mui/base/TabUnstyled/tabUnstyledClasses.js
var tabUnstyledClasses, init_tabUnstyledClasses = __esm({
  "node_modules/@mui/base/TabUnstyled/tabUnstyledClasses.js"() {
    init_generateUtilityClasses3();
    tabUnstyledClasses = generateUtilityClasses("MuiTab", ["root", "selected", "disabled"]);
  }
});

// node_modules/@mui/base/TabUnstyled/TabUnstyled.types.js
var init_TabUnstyled_types = __esm({
  "node_modules/@mui/base/TabUnstyled/TabUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TabUnstyled/useTab.types.js
var init_useTab_types = __esm({
  "node_modules/@mui/base/TabUnstyled/useTab.types.js"() {
  }
});

// node_modules/@mui/base/TabUnstyled/index.js
var init_TabUnstyled = __esm({
  "node_modules/@mui/base/TabUnstyled/index.js"() {
    init_TabUnstyled_types();
    init_tabUnstyledClasses();
    init_useTab_types();
  }
});

// node_modules/@mui/base/index.js
var init_base = __esm({
  "node_modules/@mui/base/index.js"() {
    init_utils2();
    init_AutocompleteUnstyled();
    init_BadgeUnstyled();
    init_ButtonUnstyled();
    init_composeClasses3();
    init_FormControlUnstyled();
    init_InputUnstyled();
    init_ListboxUnstyled();
    init_MenuUnstyled();
    init_MenuItemUnstyled();
    init_ModalUnstyled();
    init_MultiSelectUnstyled();
    init_OptionGroupUnstyled();
    init_OptionUnstyled();
    init_SelectUnstyled();
    init_SliderUnstyled();
    init_SnackbarUnstyled();
    init_SwitchUnstyled();
    init_TablePaginationUnstyled();
    init_TabPanelUnstyled();
    init_TabsListUnstyled();
    init_TabsUnstyled();
    init_TabUnstyled();
  }
});

// node_modules/@mui/material/SvgIcon/svgIconClasses.js
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass("MuiSvgIcon", slot);
}
var svgIconClasses, init_svgIconClasses = __esm({
  "node_modules/@mui/material/SvgIcon/svgIconClasses.js"() {
    init_esm2();
    init_generateUtilityClass3();
    svgIconClasses = generateUtilityClasses("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
  }
});

// node_modules/@mui/material/SvgIcon/SvgIcon.js
var React24, import_prop_types5, import_jsx_runtime3, import_jsx_runtime4, _excluded15, useUtilityClasses2, SvgIconRoot, SvgIcon, SvgIcon_default, init_SvgIcon = __esm({
  "node_modules/@mui/material/SvgIcon/SvgIcon.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React24 = __toESM(require_react()), import_prop_types5 = __toESM(require_prop_types());
    init_clsx_m();
    init_base();
    init_capitalize2();
    init_useThemeProps3();
    init_styled2();
    init_svgIconClasses();
    import_jsx_runtime3 = __toESM(require_jsx_runtime()), import_jsx_runtime4 = __toESM(require_jsx_runtime()), _excluded15 = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], useUtilityClasses2 = (ownerState) => {
      let {
        color: color2,
        fontSize: fontSize2,
        classes
      } = ownerState, slots = {
        root: ["root", color2 !== "inherit" && `color${capitalize_default(color2)}`, `fontSize${capitalize_default(fontSize2)}`]
      };
      return composeClasses(slots, getSvgIconUtilityClass, classes);
    }, SvgIconRoot = styled_default2("svg", {
      name: "MuiSvgIcon",
      slot: "Root",
      overridesResolver: (props, styles) => {
        let {
          ownerState
        } = props;
        return [styles.root, ownerState.color !== "inherit" && styles[`color${capitalize_default(ownerState.color)}`], styles[`fontSize${capitalize_default(ownerState.fontSize)}`]];
      }
    })(({
      theme,
      ownerState
    }) => {
      var _theme$transitions, _theme$transitions$cr, _theme$transitions2, _theme$transitions2$d, _theme$typography, _theme$typography$pxT, _theme$typography2, _theme$typography2$px, _theme$typography3, _theme$typography3$px, _palette$ownerState$c, _palette, _palette$ownerState$c2, _palette2, _palette2$action, _palette3, _palette3$action;
      return {
        userSelect: "none",
        width: "1em",
        height: "1em",
        display: "inline-block",
        fill: "currentColor",
        flexShrink: 0,
        transition: (_theme$transitions = theme.transitions) == null || (_theme$transitions$cr = _theme$transitions.create) == null ? void 0 : _theme$transitions$cr.call(_theme$transitions, "fill", {
          duration: (_theme$transitions2 = theme.transitions) == null || (_theme$transitions2$d = _theme$transitions2.duration) == null ? void 0 : _theme$transitions2$d.shorter
        }),
        fontSize: {
          inherit: "inherit",
          small: ((_theme$typography = theme.typography) == null || (_theme$typography$pxT = _theme$typography.pxToRem) == null ? void 0 : _theme$typography$pxT.call(_theme$typography, 20)) || "1.25rem",
          medium: ((_theme$typography2 = theme.typography) == null || (_theme$typography2$px = _theme$typography2.pxToRem) == null ? void 0 : _theme$typography2$px.call(_theme$typography2, 24)) || "1.5rem",
          large: ((_theme$typography3 = theme.typography) == null || (_theme$typography3$px = _theme$typography3.pxToRem) == null ? void 0 : _theme$typography3$px.call(_theme$typography3, 35)) || "2.1875rem"
        }[ownerState.fontSize],
        color: (_palette$ownerState$c = (_palette = (theme.vars || theme).palette) == null || (_palette$ownerState$c2 = _palette[ownerState.color]) == null ? void 0 : _palette$ownerState$c2.main) != null ? _palette$ownerState$c : {
          action: (_palette2 = (theme.vars || theme).palette) == null || (_palette2$action = _palette2.action) == null ? void 0 : _palette2$action.active,
          disabled: (_palette3 = (theme.vars || theme).palette) == null || (_palette3$action = _palette3.action) == null ? void 0 : _palette3$action.disabled,
          inherit: void 0
        }[ownerState.color]
      };
    }), SvgIcon = /* @__PURE__ */ React24.forwardRef(function(inProps, ref) {
      let props = useThemeProps2({
        props: inProps,
        name: "MuiSvgIcon"
      }), {
        children,
        className,
        color: color2 = "inherit",
        component = "svg",
        fontSize: fontSize2 = "medium",
        htmlColor,
        inheritViewBox = !1,
        titleAccess,
        viewBox = "0 0 24 24"
      } = props, other = _objectWithoutPropertiesLoose2(props, _excluded15), ownerState = _extends5({}, props, {
        color: color2,
        component,
        fontSize: fontSize2,
        instanceFontSize: inProps.fontSize,
        inheritViewBox,
        viewBox
      }), more = {};
      inheritViewBox || (more.viewBox = viewBox);
      let classes = useUtilityClasses2(ownerState);
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(SvgIconRoot, _extends5({
        as: component,
        className: clsx_m_default(classes.root, className),
        focusable: "false",
        color: htmlColor,
        "aria-hidden": titleAccess ? void 0 : !0,
        role: titleAccess ? "img" : void 0,
        ref
      }, more, other, {
        ownerState,
        children: [children, titleAccess ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("title", {
          children: titleAccess
        }) : null]
      }));
    });
    SvgIcon.propTypes = {
      children: import_prop_types5.default.node,
      classes: import_prop_types5.default.object,
      className: import_prop_types5.default.string,
      color: import_prop_types5.default.oneOfType([import_prop_types5.default.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types5.default.string]),
      component: import_prop_types5.default.elementType,
      fontSize: import_prop_types5.default.oneOfType([import_prop_types5.default.oneOf(["inherit", "large", "medium", "small"]), import_prop_types5.default.string]),
      htmlColor: import_prop_types5.default.string,
      inheritViewBox: import_prop_types5.default.bool,
      shapeRendering: import_prop_types5.default.string,
      sx: import_prop_types5.default.oneOfType([import_prop_types5.default.arrayOf(import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object, import_prop_types5.default.bool])), import_prop_types5.default.func, import_prop_types5.default.object]),
      titleAccess: import_prop_types5.default.string,
      viewBox: import_prop_types5.default.string
    };
    SvgIcon.muiName = "SvgIcon";
    SvgIcon_default = SvgIcon;
  }
});

// node_modules/@mui/material/SvgIcon/index.js
var init_SvgIcon2 = __esm({
  "node_modules/@mui/material/SvgIcon/index.js"() {
    init_SvgIcon();
    init_svgIconClasses();
  }
});

// node_modules/@mui/material/utils/createSvgIcon.js
function createSvgIcon(path, displayName) {
  function Component2(props, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(SvgIcon_default, _extends5({
      "data-testid": `${displayName}Icon`,
      ref
    }, props, {
      children: path
    }));
  }
  return Component2.displayName = `${displayName}Icon`, Component2.muiName = SvgIcon_default.muiName, /* @__PURE__ */ React25.memo(/* @__PURE__ */ React25.forwardRef(Component2));
}
var React25, import_jsx_runtime5, init_createSvgIcon = __esm({
  "node_modules/@mui/material/utils/createSvgIcon.js"() {
    init_extends();
    React25 = __toESM(require_react());
    init_SvgIcon2();
    import_jsx_runtime5 = __toESM(require_jsx_runtime());
  }
});

// node_modules/@mui/material/utils/debounce.js
var debounce_default, init_debounce2 = __esm({
  "node_modules/@mui/material/utils/debounce.js"() {
    init_esm2();
    debounce_default = debounce;
  }
});

// node_modules/@mui/material/utils/deprecatedPropType.js
var deprecatedPropType_default, init_deprecatedPropType2 = __esm({
  "node_modules/@mui/material/utils/deprecatedPropType.js"() {
    init_esm2();
    deprecatedPropType_default = deprecatedPropType;
  }
});

// node_modules/@mui/material/utils/isMuiElement.js
var isMuiElement_default, init_isMuiElement2 = __esm({
  "node_modules/@mui/material/utils/isMuiElement.js"() {
    init_esm2();
    isMuiElement_default = isMuiElement;
  }
});

// node_modules/@mui/material/utils/ownerDocument.js
var ownerDocument_default, init_ownerDocument2 = __esm({
  "node_modules/@mui/material/utils/ownerDocument.js"() {
    init_esm2();
    ownerDocument_default = ownerDocument;
  }
});

// node_modules/@mui/material/utils/ownerWindow.js
var ownerWindow_default, init_ownerWindow2 = __esm({
  "node_modules/@mui/material/utils/ownerWindow.js"() {
    init_esm2();
    ownerWindow_default = ownerWindow;
  }
});

// node_modules/@mui/material/utils/requirePropFactory.js
var requirePropFactory_default, init_requirePropFactory2 = __esm({
  "node_modules/@mui/material/utils/requirePropFactory.js"() {
    init_esm2();
    requirePropFactory_default = requirePropFactory;
  }
});

// node_modules/@mui/material/utils/setRef.js
var setRef_default, init_setRef2 = __esm({
  "node_modules/@mui/material/utils/setRef.js"() {
    init_esm2();
    setRef_default = setRef;
  }
});

// node_modules/@mui/material/utils/useEnhancedEffect.js
var useEnhancedEffect_default2, init_useEnhancedEffect2 = __esm({
  "node_modules/@mui/material/utils/useEnhancedEffect.js"() {
    init_esm2();
    useEnhancedEffect_default2 = useEnhancedEffect_default;
  }
});

// node_modules/@mui/material/utils/useId.js
var useId_default, init_useId2 = __esm({
  "node_modules/@mui/material/utils/useId.js"() {
    init_esm2();
    useId_default = useId2;
  }
});

// node_modules/@mui/material/utils/unsupportedProp.js
var unsupportedProp_default, init_unsupportedProp2 = __esm({
  "node_modules/@mui/material/utils/unsupportedProp.js"() {
    init_esm2();
    unsupportedProp_default = unsupportedProp;
  }
});

// node_modules/@mui/material/utils/useControlled.js
var useControlled_default, init_useControlled2 = __esm({
  "node_modules/@mui/material/utils/useControlled.js"() {
    init_esm2();
    useControlled_default = useControlled;
  }
});

// node_modules/@mui/material/utils/useEventCallback.js
var useEventCallback_default, init_useEventCallback2 = __esm({
  "node_modules/@mui/material/utils/useEventCallback.js"() {
    init_esm2();
    useEventCallback_default = useEventCallback;
  }
});

// node_modules/@mui/material/utils/useForkRef.js
var useForkRef_default, init_useForkRef2 = __esm({
  "node_modules/@mui/material/utils/useForkRef.js"() {
    init_esm2();
    useForkRef_default = useForkRef;
  }
});

// node_modules/@mui/material/utils/useIsFocusVisible.js
var useIsFocusVisible_default, init_useIsFocusVisible2 = __esm({
  "node_modules/@mui/material/utils/useIsFocusVisible.js"() {
    init_esm2();
    useIsFocusVisible_default = useIsFocusVisible;
  }
});

// node_modules/@mui/material/utils/index.js
var utils_exports = {};
__export(utils_exports, {
  capitalize: () => capitalize_default,
  createChainedFunction: () => createChainedFunction_default,
  createSvgIcon: () => createSvgIcon,
  debounce: () => debounce_default,
  deprecatedPropType: () => deprecatedPropType_default,
  isMuiElement: () => isMuiElement_default,
  ownerDocument: () => ownerDocument_default,
  ownerWindow: () => ownerWindow_default,
  requirePropFactory: () => requirePropFactory_default,
  setRef: () => setRef_default,
  unstable_ClassNameGenerator: () => unstable_ClassNameGenerator,
  unstable_useEnhancedEffect: () => useEnhancedEffect_default2,
  unstable_useId: () => useId_default,
  unsupportedProp: () => unsupportedProp_default,
  useControlled: () => useControlled_default,
  useEventCallback: () => useEventCallback_default,
  useForkRef: () => useForkRef_default,
  useIsFocusVisible: () => useIsFocusVisible_default
});
var unstable_ClassNameGenerator, init_utils4 = __esm({
  "node_modules/@mui/material/utils/index.js"() {
    init_className();
    init_capitalize2();
    init_createChainedFunction2();
    init_createSvgIcon();
    init_debounce2();
    init_deprecatedPropType2();
    init_isMuiElement2();
    init_ownerDocument2();
    init_ownerWindow2();
    init_requirePropFactory2();
    init_setRef2();
    init_useEnhancedEffect2();
    init_useId2();
    init_unsupportedProp2();
    init_useControlled2();
    init_useEventCallback2();
    init_useForkRef2();
    init_useIsFocusVisible2();
    unstable_ClassNameGenerator = {
      configure: (generator) => {
        console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ClassNameGenerator_default.configure(generator);
      }
    };
  }
});

// node_modules/@babel/runtime/helpers/interopRequireDefault.js
var require_interopRequireDefault = __commonJS({
  "node_modules/@babel/runtime/helpers/interopRequireDefault.js"(exports, module) {
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    module.exports = _interopRequireDefault, module.exports.__esModule = !0, module.exports.default = module.exports;
  }
});

// node_modules/@mui/icons-material/utils/createSvgIcon.js
var require_createSvgIcon = __commonJS({
  "node_modules/@mui/icons-material/utils/createSvgIcon.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    Object.defineProperty(exports, "default", {
      enumerable: !0,
      get: function() {
        return _utils.createSvgIcon;
      }
    });
    var _utils = (init_utils4(), __toCommonJS(utils_exports));
  }
});

// node_modules/@mui/icons-material/GitHub.js
var require_GitHub = __commonJS({
  "node_modules/@mui/icons-material/GitHub.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var React37 = _interopRequireWildcard(require_react()), _createSvgIcon = _interopRequireDefault(require_createSvgIcon()), _jsxRuntime = require_jsx_runtime();
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap != "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap(), cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule)
        return obj;
      if (obj === null || typeof obj != "object" && typeof obj != "function")
        return { default: obj };
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj))
        return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj)
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
        }
      return newObj.default = obj, cache && cache.set(obj, newObj), newObj;
    }
    var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
      d: "M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"
    }), "GitHub");
    exports.default = _default;
  }
});

// node_modules/@mui/icons-material/LinkedIn.js
var require_LinkedIn = __commonJS({
  "node_modules/@mui/icons-material/LinkedIn.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var React37 = _interopRequireWildcard(require_react()), _createSvgIcon = _interopRequireDefault(require_createSvgIcon()), _jsxRuntime = require_jsx_runtime();
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap != "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap(), cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule)
        return obj;
      if (obj === null || typeof obj != "object" && typeof obj != "function")
        return { default: obj };
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj))
        return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj)
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
        }
      return newObj.default = obj, cache && cache.set(obj, newObj), newObj;
    }
    var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
      d: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
    }), "LinkedIn");
    exports.default = _default;
  }
});

// node_modules/@remix-run/cloudflare-pages/dist/esm/worker.js
var import_cloudflare = __toESM(require_dist());
function createRequestHandler2({
  build,
  getLoadContext,
  mode
}) {
  let handleRequest3 = (0, import_cloudflare.createRequestHandler)(build, mode);
  return (context) => {
    let loadContext = getLoadContext == null ? void 0 : getLoadContext(context);
    return handleRequest3(context.request, loadContext);
  };
}
function createPagesFunctionHandler({
  build,
  getLoadContext,
  mode
}) {
  let handleRequest3 = createRequestHandler2({
    build,
    getLoadContext,
    mode
  }), handleFetch = async (context) => {
    let response;
    context.request.headers.delete("if-none-match");
    try {
      response = await context.env.ASSETS.fetch(context.request.url, context.request.clone()), response = response && response.status >= 200 && response.status < 400 ? new Response(response.body, response) : void 0;
    } catch {
    }
    return response || (response = await handleRequest3(context)), response;
  };
  return async (context) => {
    try {
      return await handleFetch(context);
    } catch (error) {
      return error instanceof Error ? (console.error(error), new Response(error.message || error.toString(), {
        status: 500
      })) : new Response("Internal Error", {
        status: 500
      });
    }
  };
}

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});

// app/entry.server.jsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server4 = __toESM(require_server());

// node_modules/@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js
function _extends4() {
  return _extends4 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends4.apply(this, arguments);
}

// node_modules/@remix-run/react/dist/esm/components.js
var React3 = __toESM(require_react());
init_dist2();

// node_modules/@remix-run/react/dist/esm/errorBoundaries.js
var import_react = __toESM(require_react());
init_dist2();
var RemixErrorBoundary = class extends import_react.default.Component {
  constructor(props) {
    super(props), this.state = {
      error: props.error || null,
      location: props.location
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    return state.location !== props.location ? {
      error: props.error || null,
      location: props.location
    } : {
      error: props.error || state.error,
      location: state.location
    };
  }
  render() {
    return this.state.error ? /* @__PURE__ */ import_react.default.createElement(this.props.component, {
      error: this.state.error
    }) : this.props.children;
  }
};
function RemixRootDefaultErrorBoundary({
  error
}) {
  return console.error(error), /* @__PURE__ */ import_react.default.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ import_react.default.createElement("head", null, /* @__PURE__ */ import_react.default.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ import_react.default.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1,viewport-fit=cover"
  }), /* @__PURE__ */ import_react.default.createElement("title", null, "Application Error!")), /* @__PURE__ */ import_react.default.createElement("body", null, /* @__PURE__ */ import_react.default.createElement("main", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, /* @__PURE__ */ import_react.default.createElement("h1", {
    style: {
      fontSize: "24px"
    }
  }, "Application Error"), /* @__PURE__ */ import_react.default.createElement("pre", {
    style: {
      padding: "2rem",
      background: "hsla(10, 50%, 50%, 0.1)",
      color: "red",
      overflow: "auto"
    }
  }, error.stack)), /* @__PURE__ */ import_react.default.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "\u{1F4BF} Hey developer\u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
              );
            `
    }
  })));
}
function V2_RemixRootDefaultErrorBoundary() {
  let error = useRouteError();
  if (isRouteErrorResponse(error))
    return /* @__PURE__ */ import_react.default.createElement(RemixRootDefaultCatchBoundaryImpl, {
      caught: error
    });
  if (error instanceof Error)
    return /* @__PURE__ */ import_react.default.createElement(RemixRootDefaultErrorBoundary, {
      error
    });
  {
    let errorString = error == null ? "Unknown Error" : typeof error == "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    return /* @__PURE__ */ import_react.default.createElement(RemixRootDefaultErrorBoundary, {
      error: new Error(errorString)
    });
  }
}
var RemixCatchContext = /* @__PURE__ */ import_react.default.createContext(void 0);
function useCatch() {
  return (0, import_react.useContext)(RemixCatchContext);
}
function RemixCatchBoundary({
  catch: catchVal,
  component: Component2,
  children
}) {
  return catchVal ? /* @__PURE__ */ import_react.default.createElement(RemixCatchContext.Provider, {
    value: catchVal
  }, /* @__PURE__ */ import_react.default.createElement(Component2, null)) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children);
}
function RemixRootDefaultCatchBoundary() {
  let caught = useCatch();
  return /* @__PURE__ */ import_react.default.createElement(RemixRootDefaultCatchBoundaryImpl, {
    caught
  });
}
function RemixRootDefaultCatchBoundaryImpl({
  caught
}) {
  return /* @__PURE__ */ import_react.default.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ import_react.default.createElement("head", null, /* @__PURE__ */ import_react.default.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ import_react.default.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1,viewport-fit=cover"
  }), /* @__PURE__ */ import_react.default.createElement("title", null, "Unhandled Thrown Response!")), /* @__PURE__ */ import_react.default.createElement("body", null, /* @__PURE__ */ import_react.default.createElement("h1", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, caught.status, " ", caught.statusText), /* @__PURE__ */ import_react.default.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "\u{1F4BF} Hey developer\u{1F44B}. You can provide a way better UX than this when your app throws 404s (and other responses). Check out https://remix.run/guides/not-found for more information."
              );
            `
    }
  })));
}

// node_modules/@remix-run/react/dist/esm/invariant.js
function invariant3(value, message) {
  if (value === !1 || value === null || typeof value > "u")
    throw new Error(message);
}

// node_modules/@remix-run/react/dist/esm/links.js
init_dist2();

// node_modules/@remix-run/react/dist/esm/routeModules.js
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache)
    return routeModulesCache[route.id];
  try {
    let routeModule = await import(
      /* webpackIgnore: true */
      route.module
    );
    return routeModulesCache[route.id] = routeModule, routeModule;
  } catch {
    return window.location.reload(), new Promise(() => {
    });
  }
}

// node_modules/@remix-run/react/dist/esm/links.js
function getLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match) => {
    var _module$links;
    let module = routeModules[match.route.id];
    return ((_module$links = module.links) === null || _module$links === void 0 ? void 0 : _module$links.call(module)) || [];
  }).flat(1), preloads = getCurrentPageModulePreloadHrefs(matches, manifest);
  return dedupe(descriptors, preloads);
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page == "string";
}
function isHtmlLinkDescriptor(object) {
  return object == null ? !1 : object.href == null ? object.rel === "preload" && (typeof object.imageSrcSet == "string" || typeof object.imagesrcset == "string") && (typeof object.imageSizes == "string" || typeof object.imagesizes == "string") : typeof object.rel == "string" && typeof object.href == "string";
}
async function getStylesheetPrefetchLinks(matches, manifest, routeModules) {
  return (await Promise.all(matches.map(async (match) => {
    let mod = await loadRouteModule(manifest.routes[match.route.id], routeModules);
    return mod.links ? mod.links() : [];
  }))).flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map((link) => link.rel === "preload" ? {
    ...link,
    rel: "prefetch"
  } : {
    ...link,
    rel: "prefetch",
    as: "style"
  });
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let path = parsePathPatch(page), isNew = (match, index) => currentMatches[index] ? match.route.id !== currentMatches[index].route.id : !0, matchPathChanged = (match, index) => {
    var _currentMatches$index;
    return currentMatches[index].pathname !== match.pathname || ((_currentMatches$index = currentMatches[index].route.path) === null || _currentMatches$index === void 0 ? void 0 : _currentMatches$index.endsWith("*")) && currentMatches[index].params["*"] !== match.params["*"];
  };
  return mode === "data" && location.search !== path.search ? nextMatches.filter((match, index) => {
    if (!manifest.routes[match.route.id].hasLoader)
      return !1;
    if (isNew(match, index) || matchPathChanged(match, index))
      return !0;
    if (match.route.shouldRevalidate) {
      var _currentMatches$;
      let routeChoice = match.route.shouldRevalidate({
        currentUrl: new URL(location.pathname + location.search + location.hash, window.origin),
        currentParams: ((_currentMatches$ = currentMatches[0]) === null || _currentMatches$ === void 0 ? void 0 : _currentMatches$.params) || {},
        nextUrl: new URL(page, window.origin),
        nextParams: match.params,
        defaultShouldRevalidate: !0
      });
      if (typeof routeChoice == "boolean")
        return routeChoice;
    }
    return !0;
  }) : nextMatches.filter((match, index) => {
    let manifestRoute = manifest.routes[match.route.id];
    return (mode === "assets" || manifestRoute.hasLoader) && (isNew(match, index) || matchPathChanged(match, index));
  });
}
function getDataLinkHrefs(page, matches, manifest) {
  let path = parsePathPatch(page);
  return dedupeHrefs(matches.filter((match) => manifest.routes[match.route.id].hasLoader).map((match) => {
    let {
      pathname,
      search
    } = path, searchParams = new URLSearchParams(search);
    return searchParams.set("_data", match.route.id), `${pathname}?${searchParams}`;
  }));
}
function getModuleLinkHrefs(matches, manifestPatch) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifestPatch.routes[match.route.id], hrefs = [route.module];
    return route.imports && (hrefs = hrefs.concat(route.imports)), hrefs;
  }).flat(1));
}
function getCurrentPageModulePreloadHrefs(matches, manifest) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifest.routes[match.route.id], hrefs = [route.module];
    return route.imports && (hrefs = hrefs.concat(route.imports)), hrefs;
  }).flat(1));
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function dedupe(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set(), preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    if (!isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href))
      return deduped;
    let str = JSON.stringify(descriptor);
    return set.has(str) || (set.add(str), deduped.push(descriptor)), deduped;
  }, []);
}
function parsePathPatch(href) {
  let path = parsePath(href);
  return path.search === void 0 && (path.search = ""), path;
}

// node_modules/@remix-run/react/dist/esm/markup.js
var ESCAPE_LOOKUP2 = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
}, ESCAPE_REGEX2 = /[&><\u2028\u2029]/g;
function escapeHtml2(html) {
  return html.replace(ESCAPE_REGEX2, (match) => ESCAPE_LOOKUP2[match]);
}
function createHtml(html) {
  return {
    __html: html
  };
}

// node_modules/@remix-run/react/dist/esm/components.js
function useDataRouterContext3() {
  let context = React3.useContext(DataRouterContext);
  return invariant3(context, "You must render this element inside a <DataRouterContext.Provider> element"), context;
}
function useDataRouterStateContext() {
  let context = React3.useContext(DataRouterStateContext);
  return invariant3(context, "You must render this element inside a <DataRouterStateContext.Provider> element"), context;
}
var RemixContext = /* @__PURE__ */ React3.createContext(void 0);
RemixContext.displayName = "Remix";
function useRemixContext() {
  let context = React3.useContext(RemixContext);
  return invariant3(context, "You must render this element inside a <Remix> element"), context;
}
function RemixRoute({
  id
}) {
  let {
    routeModules
  } = useRemixContext();
  invariant3(routeModules, `Cannot initialize 'routeModules'. This normally occurs when you have server code in your client modules.
Check this link for more details:
https://remix.run/pages/gotchas#server-code-in-client-bundles`);
  let {
    default: Component2
  } = routeModules[id];
  return invariant3(Component2, `Route "${id}" has no component! Please go add a \`default\` export in the route module file.
If you were trying to navigate or submit to a resource route, use \`<a>\` instead of \`<Link>\` or \`<Form reloadDocument>\`.`), /* @__PURE__ */ React3.createElement(Component2, null);
}
function RemixRouteError({
  id
}) {
  let {
    future: future2,
    routeModules
  } = useRemixContext();
  invariant3(routeModules, `Cannot initialize 'routeModules'. This normally occurs when you have server code in your client modules.
Check this link for more details:
https://remix.run/pages/gotchas#server-code-in-client-bundles`);
  let error = useRouteError(), {
    CatchBoundary,
    ErrorBoundary
  } = routeModules[id];
  if (future2.v2_errorBoundary) {
    if (id === "root" && (ErrorBoundary || (ErrorBoundary = V2_RemixRootDefaultErrorBoundary)), ErrorBoundary)
      return /* @__PURE__ */ React3.createElement(ErrorBoundary, null);
    throw error;
  }
  if (id === "root" && (CatchBoundary || (CatchBoundary = RemixRootDefaultCatchBoundary), ErrorBoundary || (ErrorBoundary = RemixRootDefaultErrorBoundary)), isRouteErrorResponse(error)) {
    let tError = error;
    if ((tError == null ? void 0 : tError.error) instanceof Error && tError.status !== 404 && ErrorBoundary)
      return /* @__PURE__ */ React3.createElement(ErrorBoundary, {
        error: tError.error
      });
    if (CatchBoundary)
      return /* @__PURE__ */ React3.createElement(RemixCatchBoundary, {
        component: CatchBoundary,
        catch: error
      });
  }
  if (error instanceof Error && ErrorBoundary)
    return /* @__PURE__ */ React3.createElement(ErrorBoundary, {
      error
    });
  throw error;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let [maybePrefetch, setMaybePrefetch] = React3.useState(!1), [shouldPrefetch, setShouldPrefetch] = React3.useState(!1), {
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onTouchStart
  } = theirElementProps;
  React3.useEffect(() => {
    prefetch === "render" && setShouldPrefetch(!0);
  }, [prefetch]);
  let setIntent = () => {
    prefetch === "intent" && setMaybePrefetch(!0);
  }, cancelIntent = () => {
    prefetch === "intent" && (setMaybePrefetch(!1), setShouldPrefetch(!1));
  };
  return React3.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(!0);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]), [shouldPrefetch, {
    onFocus: composeEventHandlers(onFocus, setIntent),
    onBlur: composeEventHandlers(onBlur, cancelIntent),
    onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
    onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
    onTouchStart: composeEventHandlers(onTouchStart, setIntent)
  }];
}
var NavLink2 = /* @__PURE__ */ React3.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to == "string" && (/^[a-z+]+:\/\//i.test(to) || to.startsWith("//")), href = useHref(to), [shouldPrefetch, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(NavLink, _extends4({
    ref: forwardedRef,
    to
  }, props, prefetchHandlers)), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React3.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
NavLink2.displayName = "NavLink";
var Link2 = /* @__PURE__ */ React3.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to == "string" && (/^[a-z+]+:\/\//i.test(to) || to.startsWith("//")), href = useHref(to), [shouldPrefetch, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(Link, _extends4({
    ref: forwardedRef,
    to
  }, props, prefetchHandlers)), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React3.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
Link2.displayName = "Link";
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event), event.defaultPrevented || ourHandler(event);
  };
}
function Links() {
  let {
    manifest,
    routeModules
  } = useRemixContext(), {
    matches
  } = useDataRouterStateContext(), links2 = React3.useMemo(() => getLinksForMatches(matches, routeModules, manifest), [matches, routeModules, manifest]);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, links2.map((link) => {
    if (isPageLinkDescriptor(link))
      return /* @__PURE__ */ React3.createElement(PrefetchPageLinks, _extends4({
        key: link.page
      }, link));
    let imageSrcSet = null;
    return "useId" in React3 ? (link.imagesrcset && (link.imageSrcSet = imageSrcSet = link.imagesrcset, delete link.imagesrcset), link.imagesizes && (link.imageSizes = link.imagesizes, delete link.imagesizes)) : (link.imageSrcSet && (link.imagesrcset = imageSrcSet = link.imageSrcSet, delete link.imageSrcSet), link.imageSizes && (link.imagesizes = link.imageSizes, delete link.imageSizes)), /* @__PURE__ */ React3.createElement("link", _extends4({
      key: link.rel + (link.href || "") + (imageSrcSet || "")
    }, link));
  }));
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let {
    router
  } = useDataRouterContext3(), matches = React3.useMemo(() => matchRoutes(router.routes, page), [router.routes, page]);
  return matches ? /* @__PURE__ */ React3.createElement(PrefetchPageLinksImpl, _extends4({
    page,
    matches
  }, dataLinkProps)) : (console.warn(`Tried to prefetch ${page} but no routes matched.`), null);
}
function usePrefetchedStylesheets(matches) {
  let {
    manifest,
    routeModules
  } = useRemixContext(), [styleLinks, setStyleLinks] = React3.useState([]);
  return React3.useEffect(() => {
    let interrupted = !1;
    return getStylesheetPrefetchLinks(matches, manifest, routeModules).then((links2) => {
      interrupted || setStyleLinks(links2);
    }), () => {
      interrupted = !0;
    };
  }, [matches, manifest, routeModules]), styleLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation(), {
    manifest
  } = useRemixContext(), {
    matches
  } = useDataRouterStateContext(), newMatchesForData = React3.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "data"), [page, nextMatches, matches, manifest, location]), newMatchesForAssets = React3.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "assets"), [page, nextMatches, matches, manifest, location]), dataHrefs = React3.useMemo(() => getDataLinkHrefs(page, newMatchesForData, manifest), [newMatchesForData, page, manifest]), moduleHrefs = React3.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]), styleLinks = usePrefetchedStylesheets(newMatchesForAssets);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React3.createElement("link", _extends4({
    key: href,
    rel: "prefetch",
    as: "fetch",
    href
  }, linkProps))), moduleHrefs.map((href) => /* @__PURE__ */ React3.createElement("link", _extends4({
    key: href,
    rel: "modulepreload",
    href
  }, linkProps))), styleLinks.map((link) => /* @__PURE__ */ React3.createElement("link", _extends4({
    key: link.href
  }, link))));
}
function V1Meta() {
  let {
    routeModules
  } = useRemixContext(), {
    matches,
    loaderData
  } = useDataRouterStateContext(), location = useLocation(), meta2 = {}, parentsData = {};
  for (let match of matches) {
    let routeId = match.route.id, data = loaderData[routeId], params = match.params, routeModule = routeModules[routeId];
    if (routeModule.meta) {
      let routeMeta = typeof routeModule.meta == "function" ? routeModule.meta({
        data,
        parentsData,
        params,
        location,
        matches: void 0
      }) : routeModule.meta;
      if (routeMeta && Array.isArray(routeMeta))
        throw new Error(
          "The route at " + match.route.path + " returns an array. This is only supported with the `v2_meta` future flag in the Remix config. Either set the flag to `true` or update the route's meta function to return an object.\n\nTo reference the v1 meta function API, see https://remix.run/route/meta"
        );
      Object.assign(meta2, routeMeta);
    }
    parentsData[routeId] = data;
  }
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, Object.entries(meta2).map(([name, value]) => {
    if (!value)
      return null;
    if (["charset", "charSet"].includes(name))
      return /* @__PURE__ */ React3.createElement("meta", {
        key: "charset",
        charSet: value
      });
    if (name === "title")
      return /* @__PURE__ */ React3.createElement("title", {
        key: "title"
      }, String(value));
    let isOpenGraphTag = /^(og|music|video|article|book|profile|fb):.+$/.test(name);
    return [value].flat().map((content) => isOpenGraphTag ? /* @__PURE__ */ React3.createElement("meta", {
      property: name,
      content,
      key: name + content
    }) : typeof content == "string" ? /* @__PURE__ */ React3.createElement("meta", {
      name,
      content,
      key: name + content
    }) : /* @__PURE__ */ React3.createElement("meta", _extends4({
      key: name + JSON.stringify(content)
    }, content)));
  }));
}
function V2Meta() {
  let {
    routeModules
  } = useRemixContext(), {
    matches,
    loaderData
  } = useDataRouterStateContext(), location = useLocation(), meta2 = [], leafMeta = null, parentsData = {}, matchesWithMeta = matches.map((match) => ({
    ...match,
    meta: []
  })), index = -1;
  for (let match of matches) {
    index++;
    let routeId = match.route.id, data = loaderData[routeId], params = match.params, routeModule = routeModules[routeId], routeMeta = [];
    if (routeModule != null && routeModule.meta ? routeMeta = typeof routeModule.meta == "function" ? routeModule.meta({
      data,
      parentsData,
      params,
      location,
      matches: matchesWithMeta
    }) : routeModule.meta : leafMeta && (routeMeta = leafMeta), routeMeta = routeMeta || [], !Array.isArray(routeMeta))
      throw new Error("The `v2_meta` API is enabled in the Remix config, but the route at " + match.route.path + ` returns an invalid value. In v2, all route meta functions must return an array of meta objects.

To reference the v1 meta function API, see https://remix.run/route/meta`);
    matchesWithMeta[index].meta = routeMeta, meta2 = routeMeta, parentsData[routeId] = data, leafMeta = meta2;
  }
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, meta2.flat().map((metaProps) => metaProps ? "title" in metaProps ? /* @__PURE__ */ React3.createElement("title", {
    key: "title"
  }, String(metaProps.title)) : "charSet" in metaProps || "charset" in metaProps ? /* @__PURE__ */ React3.createElement("meta", {
    key: "charset",
    charSet: metaProps.charSet || metaProps.charset
  }) : /* @__PURE__ */ React3.createElement("meta", _extends4({
    key: JSON.stringify(metaProps)
  }, metaProps)) : null));
}
function Meta() {
  let {
    future: future2
  } = useRemixContext();
  return future2 != null && future2.v2_meta ? /* @__PURE__ */ React3.createElement(V2Meta, null) : /* @__PURE__ */ React3.createElement(V1Meta, null);
}
function Await2(props) {
  return /* @__PURE__ */ React3.createElement(Await, props);
}
var isHydrated = !1;
function Scripts(props) {
  let {
    manifest,
    serverHandoffString,
    abortDelay
  } = useRemixContext(), {
    router,
    static: isStatic,
    staticContext
  } = useDataRouterContext3(), {
    matches
  } = useDataRouterStateContext(), navigation = useNavigation();
  React3.useEffect(() => {
    isHydrated = !0;
  }, []);
  let deferredScripts = [], initialScripts = React3.useMemo(() => {
    let contextScript = staticContext ? `window.__remixContext = ${serverHandoffString};` : " ", activeDeferreds = staticContext == null ? void 0 : staticContext.activeDeferreds;
    contextScript += activeDeferreds ? ["__remixContext.p = function(v,e,p,x) {", "  if (typeof e !== 'undefined') {", "    x=new Error(e.message);", "x.stack=e.stack;", "    p=Promise.reject(x);", "  } else {", "    p=Promise.resolve(v);", "  }", "  return p;", "};", "__remixContext.n = function(i,k) {", "  __remixContext.t = __remixContext.t || {};", "  __remixContext.t[i] = __remixContext.t[i] || {};", "  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});", typeof abortDelay == "number" ? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${abortDelay});` : "", "  return p;", "};", "__remixContext.r = function(i,k,v,e,p,x) {", "  p = __remixContext.t[i][k];", "  if (typeof e !== 'undefined') {", "    x=new Error(e.message);", "x.stack=e.stack;", "    p.e(x);", "  } else {", "    p.r(v);", "  }", "};"].join(`
`) + Object.entries(activeDeferreds).map(([routeId, deferredData]) => {
      let pendingKeys = new Set(deferredData.pendingKeys), promiseKeyValues = deferredData.deferredKeys.map((key) => {
        if (pendingKeys.has(key))
          return deferredScripts.push(/* @__PURE__ */ React3.createElement(DeferredHydrationScript, {
            key: `${routeId} | ${key}`,
            deferredData,
            routeId,
            dataKey: key
          })), `${JSON.stringify(key)}:__remixContext.n(${JSON.stringify(routeId)}, ${JSON.stringify(key)})`;
        {
          let trackedPromise = deferredData.data[key];
          if (typeof trackedPromise._error < "u") {
            let toSerialize = {
              message: trackedPromise._error.message,
              stack: void 0
            };
            return toSerialize.stack = trackedPromise._error.stack, `${JSON.stringify(key)}:__remixContext.p(!1, ${escapeHtml2(JSON.stringify(toSerialize))})`;
          } else {
            if (typeof trackedPromise._data > "u")
              throw new Error(`The deferred data for ${key} was not resolved, did you forget to return data from a deferred promise?`);
            return `${JSON.stringify(key)}:__remixContext.p(${escapeHtml2(JSON.stringify(trackedPromise._data))})`;
          }
        }
      }).join(`,
`);
      return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(routeId)}], {${promiseKeyValues}});`;
    }).join(`
`) + (deferredScripts.length > 0 ? `__remixContext.a=${deferredScripts.length};` : "") : "";
    let routeModulesScript = isStatic ? `${matches.map((match, index) => `import ${JSON.stringify(manifest.url)};
import * as route${index} from ${JSON.stringify(manifest.routes[match.route.id].module)};`).join(`
`)}
window.__remixRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});` : " ";
    return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("script", _extends4({}, props, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: createHtml(contextScript),
      type: void 0
    })), /* @__PURE__ */ React3.createElement("script", _extends4({}, props, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: createHtml(routeModulesScript),
      type: "module",
      async: !0
    })));
  }, []);
  if (!isStatic && typeof __remixContext == "object" && __remixContext.a)
    for (let i = 0; i < __remixContext.a; i++)
      deferredScripts.push(/* @__PURE__ */ React3.createElement(DeferredHydrationScript, {
        key: i
      }));
  let nextMatches = React3.useMemo(() => {
    if (navigation.location) {
      let matches2 = matchRoutes(router.routes, navigation.location);
      return invariant3(matches2, `No routes match path "${navigation.location.pathname}"`), matches2;
    }
    return [];
  }, [navigation.location, router.routes]), routePreloads = matches.concat(nextMatches).map((match) => {
    let route = manifest.routes[match.route.id];
    return (route.imports || []).concat([route.module]);
  }).flat(1), preloads = manifest.entry.imports.concat(routePreloads);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("link", {
    rel: "modulepreload",
    href: manifest.url,
    crossOrigin: props.crossOrigin
  }), /* @__PURE__ */ React3.createElement("link", {
    rel: "modulepreload",
    href: manifest.entry.module,
    crossOrigin: props.crossOrigin
  }), dedupe2(preloads).map((path) => /* @__PURE__ */ React3.createElement("link", {
    key: path,
    rel: "modulepreload",
    href: path,
    crossOrigin: props.crossOrigin
  })), !isHydrated && initialScripts, !isHydrated && deferredScripts);
}
function DeferredHydrationScript({
  dataKey,
  deferredData,
  routeId
}) {
  return typeof document > "u" && deferredData && dataKey && routeId && invariant3(deferredData.pendingKeys.includes(dataKey), `Deferred data for route ${routeId} with key ${dataKey} was not pending but tried to render a script for it.`), /* @__PURE__ */ React3.createElement(React3.Suspense, {
    fallback: typeof document > "u" && deferredData && dataKey && routeId ? null : /* @__PURE__ */ React3.createElement("script", {
      async: !0,
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: {
        __html: " "
      }
    })
  }, typeof document > "u" && deferredData && dataKey && routeId ? /* @__PURE__ */ React3.createElement(Await2, {
    resolve: deferredData.data[dataKey],
    errorElement: /* @__PURE__ */ React3.createElement(ErrorDeferredHydrationScript, {
      dataKey,
      routeId
    }),
    children: (data) => /* @__PURE__ */ React3.createElement("script", {
      async: !0,
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: {
        __html: `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(dataKey)}, ${escapeHtml2(JSON.stringify(data))});`
      }
    })
  }) : /* @__PURE__ */ React3.createElement("script", {
    async: !0,
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: " "
    }
  }));
}
function ErrorDeferredHydrationScript({
  dataKey,
  routeId
}) {
  let error = useAsyncError(), toSerialize = {
    message: error.message,
    stack: void 0
  };
  return toSerialize.stack = error.stack, /* @__PURE__ */ React3.createElement("script", {
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(dataKey)}, !1, ${escapeHtml2(JSON.stringify(toSerialize))});`
    }
  });
}
function dedupe2(array) {
  return [...new Set(array)];
}
function useMatches2() {
  let {
    routeModules
  } = useRemixContext();
  return useMatches().map((match) => ({
    id: match.id,
    pathname: match.pathname,
    params: match.params,
    data: match.data,
    handle: routeModules[match.id].handle
  }));
}
var LiveReload = function({
  port = Number(8002),
  timeoutMs = 1e3,
  nonce = void 0
}) {
  let js = String.raw;
  return /* @__PURE__ */ React3.createElement("script", {
    nonce,
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: js`
                function remixLiveReloadConnect(config) {
                  let protocol = location.protocol === "https:" ? "wss:" : "ws:";
                  let host = location.hostname;
                  let port = (window.__remixContext.dev && window.__remixContext.dev.liveReloadPort) || ${String(port)};
                  let socketPath = protocol + "//" + host + ":" + port + "/socket";
                  let ws = new WebSocket(socketPath);
                  ws.onmessage = (message) => {
                    let event = JSON.parse(message.data);
                    if (event.type === "LOG") {
                      console.log(event.message);
                    }
                    if (event.type === "RELOAD") {
                      console.log("💿 Reloading window ...");
                      window.location.reload();
                    }
                  };
                  ws.onopen = () => {
                    if (config && typeof config.onOpen === "function") {
                      config.onOpen();
                    }
                  };
                  ws.onclose = (event) => {
                    if (event.code === 1006) {
                      console.log("Remix dev asset server web socket closed. Reconnecting...");
                      setTimeout(
                        () =>
                          remixLiveReloadConnect({
                            onOpen: () => window.location.reload(),
                          }),
                      ${String(timeoutMs)}
                      );
                    }
                  };
                  ws.onerror = (error) => {
                    console.log("Remix dev asset server web socket error:");
                    console.error(error);
                  };
                }
                remixLiveReloadConnect();
              `
    }
  });
};

// node_modules/@remix-run/react/dist/esm/routes.js
var React4 = __toESM(require_react());
function createServerRoutes(manifest, routeModules, future2, parentId) {
  return Object.values(manifest).filter((route) => route.parentId === parentId).map((route) => {
    let hasErrorBoundary = future2.v2_errorBoundary === !0 ? route.id === "root" || route.hasErrorBoundary : route.id === "root" || route.hasCatchBoundary || route.hasErrorBoundary, dataRoute = {
      caseSensitive: route.caseSensitive,
      element: /* @__PURE__ */ React4.createElement(RemixRoute, {
        id: route.id
      }),
      errorElement: hasErrorBoundary ? /* @__PURE__ */ React4.createElement(RemixRouteError, {
        id: route.id
      }) : void 0,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModules[route.id].handle
    }, children = createServerRoutes(manifest, routeModules, future2, route.id);
    return children.length > 0 && (dataRoute.children = children), dataRoute;
  });
}

// node_modules/@remix-run/react/dist/esm/index.js
init_dist2();

// node_modules/@remix-run/react/dist/esm/scroll-restoration.js
var React5 = __toESM(require_react());
init_dist2();
var STORAGE_KEY = "positions";
function ScrollRestoration2({
  getKey,
  ...props
}) {
  let location = useLocation(), matches = useMatches2();
  useScrollRestoration({
    getKey,
    storageKey: STORAGE_KEY
  });
  let key = React5.useMemo(
    () => {
      if (!getKey)
        return null;
      let userKey = getKey(location, matches);
      return userKey !== location.key ? userKey : null;
    },
    []
  ), restoreScroll = ((STORAGE_KEY2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key2 = Math.random().toString(32).slice(2);
      window.history.replaceState({
        key: key2
      }, "");
    }
    try {
      let storedY = JSON.parse(sessionStorage.getItem(STORAGE_KEY2) || "{}")[restoreKey || window.history.state.key];
      typeof storedY == "number" && window.scrollTo(0, storedY);
    } catch (error) {
      console.error(error), sessionStorage.removeItem(STORAGE_KEY2);
    }
  }).toString();
  return /* @__PURE__ */ React5.createElement("script", _extends4({}, props, {
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: `(${restoreScroll})(${JSON.stringify(STORAGE_KEY)}, ${JSON.stringify(key)})`
    }
  }));
}

// node_modules/@remix-run/react/dist/esm/server.js
var React6 = __toESM(require_react()), import_server2 = __toESM(require_server2());
function RemixServer({
  context,
  url,
  abortDelay
}) {
  typeof url == "string" && (url = new URL(url));
  let {
    manifest,
    routeModules,
    serverHandoffString
  } = context, routes2 = createServerRoutes(manifest.routes, routeModules, context.future), router = (0, import_server2.createStaticRouter)(routes2, context.staticHandlerContext);
  return /* @__PURE__ */ React6.createElement(RemixContext.Provider, {
    value: {
      manifest,
      routeModules,
      serverHandoffString,
      future: context.future,
      abortDelay
    }
  }, /* @__PURE__ */ React6.createElement(RemixErrorBoundary, {
    location: router.state.location,
    component: RemixRootDefaultErrorBoundary
  }, /* @__PURE__ */ React6.createElement(import_server2.StaticRouterProvider, {
    router,
    context: context.staticHandlerContext,
    hydrate: !1
  })));
}

// app/entry.server.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server4.renderToString)(
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
      fileName: "app/entry.server.jsx",
      lineNumber: 11,
      columnNumber: 5
    }, this)
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.jsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  meta: () => meta
});
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
function meta() {
  return { title: "Guillaume Tremeau" };
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 18,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 19,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Meta, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Links, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        "link",
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        },
        void 0,
        !1,
        {
          fileName: "app/root.jsx",
          lineNumber: 22,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        "link",
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons"
        },
        void 0,
        !1,
        {
          fileName: "app/root.jsx",
          lineNumber: 26,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 17,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Outlet, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ScrollRestoration2, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Scripts, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(LiveReload, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 35,
        columnNumber: 52
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 31,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.jsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}

// app/routes/index.jsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  links: () => links
});

// node_modules/@mui/material/styles/index.js
init_createTheme3();

// node_modules/@mui/material/index.js
init_utils4();

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf(o, p);
}

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype), subClass.prototype.constructor = subClass, _setPrototypeOf(subClass, superClass);
}

// node_modules/react-transition-group/esm/TransitionGroupContext.js
var import_react5 = __toESM(require_react()), TransitionGroupContext_default = import_react5.default.createContext(null);

// node_modules/react-transition-group/esm/TransitionGroup.js
init_objectWithoutPropertiesLoose();
init_extends();

// node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self2) {
  if (self2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self2;
}

// node_modules/react-transition-group/esm/TransitionGroup.js
var import_prop_types6 = __toESM(require_prop_types()), import_react7 = __toESM(require_react());

// node_modules/react-transition-group/esm/utils/ChildMapping.js
var import_react6 = __toESM(require_react());
function getChildMapping(children, mapFn) {
  var mapper = function(child) {
    return mapFn && (0, import_react6.isValidElement)(child) ? mapFn(child) : child;
  }, result = /* @__PURE__ */ Object.create(null);
  return children && import_react6.Children.map(children, function(c) {
    return c;
  }).forEach(function(child) {
    result[child.key] = mapper(child);
  }), result;
}
function mergeChildMappings(prev, next) {
  prev = prev || {}, next = next || {};
  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }
  var nextKeysPending = /* @__PURE__ */ Object.create(null), pendingKeys = [];
  for (var prevKey in prev)
    prevKey in next ? pendingKeys.length && (nextKeysPending[prevKey] = pendingKeys, pendingKeys = []) : pendingKeys.push(prevKey);
  var i, childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey])
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (i = 0; i < pendingKeys.length; i++)
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  return childMapping;
}
function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function(child) {
    return (0, import_react6.cloneElement)(child, {
      onExited: onExited.bind(null, child),
      in: !0,
      appear: getProp(child, "appear", props),
      enter: getProp(child, "enter", props),
      exit: getProp(child, "exit", props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children), children = mergeChildMappings(prevChildMapping, nextChildMapping);
  return Object.keys(children).forEach(function(key) {
    var child = children[key];
    if (!!(0, import_react6.isValidElement)(child)) {
      var hasPrev = key in prevChildMapping, hasNext = key in nextChildMapping, prevChild = prevChildMapping[key], isLeaving = (0, import_react6.isValidElement)(prevChild) && !prevChild.props.in;
      hasNext && (!hasPrev || isLeaving) ? children[key] = (0, import_react6.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: !0,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      }) : !hasNext && hasPrev && !isLeaving ? children[key] = (0, import_react6.cloneElement)(child, {
        in: !1
      }) : hasNext && hasPrev && (0, import_react6.isValidElement)(prevChild) && (children[key] = (0, import_react6.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      }));
    }
  }), children;
}

// node_modules/react-transition-group/esm/TransitionGroup.js
var values2 = Object.values || function(obj) {
  return Object.keys(obj).map(function(k) {
    return obj[k];
  });
}, defaultProps = {
  component: "div",
  childFactory: function(child) {
    return child;
  }
}, TransitionGroup = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(TransitionGroup2, _React$Component);
  function TransitionGroup2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this));
    return _this.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited,
      firstRender: !0
    }, _this;
  }
  var _proto = TransitionGroup2.prototype;
  return _proto.componentDidMount = function() {
    this.mounted = !0, this.setState({
      contextValue: {
        isMounting: !1
      }
    });
  }, _proto.componentWillUnmount = function() {
    this.mounted = !1;
  }, TransitionGroup2.getDerivedStateFromProps = function(nextProps, _ref) {
    var prevChildMapping = _ref.children, handleExited = _ref.handleExited, firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: !1
    };
  }, _proto.handleExited = function(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    child.key in currentChildMapping || (child.props.onExited && child.props.onExited(node), this.mounted && this.setState(function(state) {
      var children = _extends5({}, state.children);
      return delete children[child.key], {
        children
      };
    }));
  }, _proto.render = function() {
    var _this$props = this.props, Component2 = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose2(_this$props, ["component", "childFactory"]), contextValue = this.state.contextValue, children = values2(this.state.children).map(childFactory2);
    return delete props.appear, delete props.enter, delete props.exit, Component2 === null ? /* @__PURE__ */ import_react7.default.createElement(TransitionGroupContext_default.Provider, {
      value: contextValue
    }, children) : /* @__PURE__ */ import_react7.default.createElement(TransitionGroupContext_default.Provider, {
      value: contextValue
    }, /* @__PURE__ */ import_react7.default.createElement(Component2, props, children));
  }, TransitionGroup2;
}(import_react7.default.Component);
TransitionGroup.propTypes = {
  component: import_prop_types6.default.any,
  children: import_prop_types6.default.node,
  appear: import_prop_types6.default.bool,
  enter: import_prop_types6.default.bool,
  exit: import_prop_types6.default.bool,
  childFactory: import_prop_types6.default.func
};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup_default = TransitionGroup;

// node_modules/@mui/material/ButtonBase/ButtonBase.js
init_extends();
init_objectWithoutPropertiesLoose();
var React30 = __toESM(require_react()), import_prop_types9 = __toESM(require_prop_types());
init_clsx_m();
init_esm2();
init_composeClasses3();
init_styled2();
init_useThemeProps3();
init_useForkRef2();
init_useEventCallback2();
init_useIsFocusVisible2();

// node_modules/@mui/material/ButtonBase/TouchRipple.js
init_extends();
init_objectWithoutPropertiesLoose();
var React29 = __toESM(require_react()), import_prop_types8 = __toESM(require_prop_types());
init_clsx_m();
init_esm3();
init_styled2();
init_useThemeProps3();

// node_modules/@mui/material/ButtonBase/Ripple.js
var React28 = __toESM(require_react()), import_prop_types7 = __toESM(require_prop_types());
init_clsx_m();
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
function Ripple(props) {
  let {
    className,
    classes,
    pulsate = !1,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout
  } = props, [leaving, setLeaving] = React28.useState(!1), rippleClassName = clsx_m_default(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate), rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  }, childClassName = clsx_m_default(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  return !inProp && !leaving && setLeaving(!0), React28.useEffect(() => {
    if (!inProp && onExited != null) {
      let timeoutId = setTimeout(onExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [onExited, inProp, timeout]), /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", {
      className: childClassName
    })
  });
}
Ripple.propTypes = {
  classes: import_prop_types7.default.object.isRequired,
  className: import_prop_types7.default.string,
  in: import_prop_types7.default.bool,
  onExited: import_prop_types7.default.func,
  pulsate: import_prop_types7.default.bool,
  rippleSize: import_prop_types7.default.number,
  rippleX: import_prop_types7.default.number,
  rippleY: import_prop_types7.default.number,
  timeout: import_prop_types7.default.number.isRequired
};
var Ripple_default = Ripple;

// node_modules/@mui/material/ButtonBase/touchRippleClasses.js
init_esm2();
var touchRippleClasses = generateUtilityClasses("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), touchRippleClasses_default = touchRippleClasses;

// node_modules/@mui/material/ButtonBase/TouchRipple.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime()), _excluded16 = ["center", "classes", "className"], _ = (t) => t, _t, _t2, _t3, _t4, DURATION = 550, DELAY_RIPPLE = 80, enterKeyframe = (0, import_react4.keyframes)(_t || (_t = _`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)), exitKeyframe = (0, import_react4.keyframes)(_t2 || (_t2 = _`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)), pulsateKeyframe = (0, import_react4.keyframes)(_t3 || (_t3 = _`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)), TouchRippleRoot = styled_default2("span", {
  name: "MuiTouchRipple",
  slot: "Root"
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
}), TouchRippleRipple = styled_default2(Ripple_default, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})(_t4 || (_t4 = _`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), touchRippleClasses_default.rippleVisible, enterKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses_default.ripplePulsate, ({
  theme
}) => theme.transitions.duration.shorter, touchRippleClasses_default.child, touchRippleClasses_default.childLeaving, exitKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses_default.childPulsate, pulsateKeyframe, ({
  theme
}) => theme.transitions.easing.easeInOut), TouchRipple = /* @__PURE__ */ React29.forwardRef(function(inProps, ref) {
  let props = useThemeProps2({
    props: inProps,
    name: "MuiTouchRipple"
  }), {
    center: centerProp = !1,
    classes = {},
    className
  } = props, other = _objectWithoutPropertiesLoose2(props, _excluded16), [ripples, setRipples] = React29.useState([]), nextKey = React29.useRef(0), rippleCallback = React29.useRef(null);
  React29.useEffect(() => {
    rippleCallback.current && (rippleCallback.current(), rippleCallback.current = null);
  }, [ripples]);
  let ignoringMouseDown = React29.useRef(!1), startTimer = React29.useRef(null), startTimerCommit = React29.useRef(null), container = React29.useRef(null);
  React29.useEffect(() => () => {
    clearTimeout(startTimer.current);
  }, []);
  let startCommit = React29.useCallback((params) => {
    let {
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize,
      cb
    } = params;
    setRipples((oldRipples) => [...oldRipples, /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(TouchRippleRipple, {
      classes: {
        ripple: clsx_m_default(classes.ripple, touchRippleClasses_default.ripple),
        rippleVisible: clsx_m_default(classes.rippleVisible, touchRippleClasses_default.rippleVisible),
        ripplePulsate: clsx_m_default(classes.ripplePulsate, touchRippleClasses_default.ripplePulsate),
        child: clsx_m_default(classes.child, touchRippleClasses_default.child),
        childLeaving: clsx_m_default(classes.childLeaving, touchRippleClasses_default.childLeaving),
        childPulsate: clsx_m_default(classes.childPulsate, touchRippleClasses_default.childPulsate)
      },
      timeout: DURATION,
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize
    }, nextKey.current)]), nextKey.current += 1, rippleCallback.current = cb;
  }, [classes]), start = React29.useCallback((event = {}, options = {}, cb = () => {
  }) => {
    let {
      pulsate: pulsate2 = !1,
      center = centerProp || options.pulsate,
      fakeElement = !1
    } = options;
    if ((event == null ? void 0 : event.type) === "mousedown" && ignoringMouseDown.current) {
      ignoringMouseDown.current = !1;
      return;
    }
    (event == null ? void 0 : event.type) === "touchstart" && (ignoringMouseDown.current = !0);
    let element = fakeElement ? null : container.current, rect = element ? element.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    }, rippleX, rippleY, rippleSize;
    if (center || event === void 0 || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches)
      rippleX = Math.round(rect.width / 2), rippleY = Math.round(rect.height / 2);
    else {
      let {
        clientX,
        clientY
      } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
      rippleX = Math.round(clientX - rect.left), rippleY = Math.round(clientY - rect.top);
    }
    if (center)
      rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3), rippleSize % 2 === 0 && (rippleSize += 1);
    else {
      let sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2, sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    }
    event != null && event.touches ? startTimerCommit.current === null && (startTimerCommit.current = () => {
      startCommit({
        pulsate: pulsate2,
        rippleX,
        rippleY,
        rippleSize,
        cb
      });
    }, startTimer.current = setTimeout(() => {
      startTimerCommit.current && (startTimerCommit.current(), startTimerCommit.current = null);
    }, DELAY_RIPPLE)) : startCommit({
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize,
      cb
    });
  }, [centerProp, startCommit]), pulsate = React29.useCallback(() => {
    start({}, {
      pulsate: !0
    });
  }, [start]), stop = React29.useCallback((event, cb) => {
    if (clearTimeout(startTimer.current), (event == null ? void 0 : event.type) === "touchend" && startTimerCommit.current) {
      startTimerCommit.current(), startTimerCommit.current = null, startTimer.current = setTimeout(() => {
        stop(event, cb);
      });
      return;
    }
    startTimerCommit.current = null, setRipples((oldRipples) => oldRipples.length > 0 ? oldRipples.slice(1) : oldRipples), rippleCallback.current = cb;
  }, []);
  return React29.useImperativeHandle(ref, () => ({
    pulsate,
    start,
    stop
  }), [pulsate, start, stop]), /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(TouchRippleRoot, _extends5({
    className: clsx_m_default(touchRippleClasses_default.root, classes.root, className),
    ref: container
  }, other, {
    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(TransitionGroup_default, {
      component: null,
      exit: !0,
      children: ripples
    })
  }));
});
TouchRipple.propTypes = {
  center: import_prop_types8.default.bool,
  classes: import_prop_types8.default.object,
  className: import_prop_types8.default.string
};
var TouchRipple_default = TouchRipple;

// node_modules/@mui/material/ButtonBase/buttonBaseClasses.js
init_esm2();
init_generateUtilityClass3();
function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass("MuiButtonBase", slot);
}
var buttonBaseClasses = generateUtilityClasses("MuiButtonBase", ["root", "disabled", "focusVisible"]), buttonBaseClasses_default = buttonBaseClasses;

// node_modules/@mui/material/ButtonBase/ButtonBase.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime()), import_jsx_runtime9 = __toESM(require_jsx_runtime()), _excluded17 = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "touchRippleRef", "type"], useUtilityClasses3 = (ownerState) => {
  let {
    disabled,
    focusVisible,
    focusVisibleClassName,
    classes
  } = ownerState, composedClasses = composeClasses({
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  }, getButtonBaseUtilityClass, classes);
  return focusVisible && focusVisibleClassName && (composedClasses.root += ` ${focusVisibleClassName}`), composedClasses;
}, ButtonBaseRoot = styled_default2("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  WebkitAppearance: "none",
  textDecoration: "none",
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
  },
  [`&.${buttonBaseClasses_default.disabled}`]: {
    pointerEvents: "none",
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), ButtonBase = /* @__PURE__ */ React30.forwardRef(function(inProps, ref) {
  let props = useThemeProps2({
    props: inProps,
    name: "MuiButtonBase"
  }), {
    action,
    centerRipple = !1,
    children,
    className,
    component = "button",
    disabled = !1,
    disableRipple = !1,
    disableTouchRipple = !1,
    focusRipple = !1,
    LinkComponent = "a",
    onBlur,
    onClick,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    tabIndex = 0,
    TouchRippleProps,
    touchRippleRef,
    type
  } = props, other = _objectWithoutPropertiesLoose2(props, _excluded17), buttonRef = React30.useRef(null), rippleRef = React30.useRef(null), handleRippleRef = useForkRef_default(rippleRef, touchRippleRef), {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible_default(), [focusVisible, setFocusVisible] = React30.useState(!1);
  disabled && focusVisible && setFocusVisible(!1), React30.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(!0), buttonRef.current.focus();
    }
  }), []);
  let [mountedState, setMountedState] = React30.useState(!1);
  React30.useEffect(() => {
    setMountedState(!0);
  }, []);
  let enableTouchRipple = mountedState && !disableRipple && !disabled;
  React30.useEffect(() => {
    focusVisible && focusRipple && !disableRipple && mountedState && rippleRef.current.pulsate();
  }, [disableRipple, focusRipple, focusVisible, mountedState]);
  function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
    return useEventCallback_default((event) => (eventCallback && eventCallback(event), !skipRippleAction && rippleRef.current && rippleRef.current[rippleAction](event), !0));
  }
  let handleMouseDown = useRippleHandler("start", onMouseDown), handleContextMenu = useRippleHandler("stop", onContextMenu), handleDragLeave = useRippleHandler("stop", onDragLeave), handleMouseUp = useRippleHandler("stop", onMouseUp), handleMouseLeave = useRippleHandler("stop", (event) => {
    focusVisible && event.preventDefault(), onMouseLeave && onMouseLeave(event);
  }), handleTouchStart = useRippleHandler("start", onTouchStart), handleTouchEnd = useRippleHandler("stop", onTouchEnd), handleTouchMove = useRippleHandler("stop", onTouchMove), handleBlur = useRippleHandler("stop", (event) => {
    handleBlurVisible(event), isFocusVisibleRef.current === !1 && setFocusVisible(!1), onBlur && onBlur(event);
  }, !1), handleFocus = useEventCallback_default((event) => {
    buttonRef.current || (buttonRef.current = event.currentTarget), handleFocusVisible(event), isFocusVisibleRef.current === !0 && (setFocusVisible(!0), onFocusVisible && onFocusVisible(event)), onFocus && onFocus(event);
  }), isNonNativeButton = () => {
    let button = buttonRef.current;
    return component && component !== "button" && !(button.tagName === "A" && button.href);
  }, keydownRef = React30.useRef(!1), handleKeyDown2 = useEventCallback_default((event) => {
    focusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === " " && (keydownRef.current = !0, rippleRef.current.stop(event, () => {
      rippleRef.current.start(event);
    })), event.target === event.currentTarget && isNonNativeButton() && event.key === " " && event.preventDefault(), onKeyDown && onKeyDown(event), event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled && (event.preventDefault(), onClick && onClick(event));
  }), handleKeyUp = useEventCallback_default((event) => {
    focusRipple && event.key === " " && rippleRef.current && focusVisible && !event.defaultPrevented && (keydownRef.current = !1, rippleRef.current.stop(event, () => {
      rippleRef.current.pulsate(event);
    })), onKeyUp && onKeyUp(event), onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === " " && !event.defaultPrevented && onClick(event);
  }), ComponentProp = component;
  ComponentProp === "button" && (other.href || other.to) && (ComponentProp = LinkComponent);
  let buttonProps = {};
  ComponentProp === "button" ? (buttonProps.type = type === void 0 ? "button" : type, buttonProps.disabled = disabled) : (!other.href && !other.to && (buttonProps.role = "button"), disabled && (buttonProps["aria-disabled"] = disabled));
  let handleRef = useForkRef_default(ref, focusVisibleRef, buttonRef);
  React30.useEffect(() => {
    enableTouchRipple && !rippleRef.current && console.error(["MUI: The `component` prop provided to ButtonBase is invalid.", "Please make sure the children prop is rendered in this custom component."].join(`
`));
  }, [enableTouchRipple]);
  let ownerState = _extends5({}, props, {
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible
  }), classes = useUtilityClasses3(ownerState);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(ButtonBaseRoot, _extends5({
    as: ComponentProp,
    className: clsx_m_default(classes.root, className),
    ownerState,
    onBlur: handleBlur,
    onClick,
    onContextMenu: handleContextMenu,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown2,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex,
    type
  }, buttonProps, other, {
    children: [children, enableTouchRipple ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TouchRipple_default, _extends5({
      ref: handleRippleRef,
      center: centerRipple
    }, TouchRippleProps)) : null]
  }));
});
ButtonBase.propTypes = {
  action: refType_default,
  centerRipple: import_prop_types9.default.bool,
  children: import_prop_types9.default.node,
  classes: import_prop_types9.default.object,
  className: import_prop_types9.default.string,
  component: elementTypeAcceptingRef_default,
  disabled: import_prop_types9.default.bool,
  disableRipple: import_prop_types9.default.bool,
  disableTouchRipple: import_prop_types9.default.bool,
  focusRipple: import_prop_types9.default.bool,
  focusVisibleClassName: import_prop_types9.default.string,
  href: import_prop_types9.default.any,
  LinkComponent: import_prop_types9.default.elementType,
  onBlur: import_prop_types9.default.func,
  onClick: import_prop_types9.default.func,
  onContextMenu: import_prop_types9.default.func,
  onDragLeave: import_prop_types9.default.func,
  onFocus: import_prop_types9.default.func,
  onFocusVisible: import_prop_types9.default.func,
  onKeyDown: import_prop_types9.default.func,
  onKeyUp: import_prop_types9.default.func,
  onMouseDown: import_prop_types9.default.func,
  onMouseLeave: import_prop_types9.default.func,
  onMouseUp: import_prop_types9.default.func,
  onTouchEnd: import_prop_types9.default.func,
  onTouchMove: import_prop_types9.default.func,
  onTouchStart: import_prop_types9.default.func,
  sx: import_prop_types9.default.oneOfType([import_prop_types9.default.arrayOf(import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object, import_prop_types9.default.bool])), import_prop_types9.default.func, import_prop_types9.default.object]),
  tabIndex: import_prop_types9.default.number,
  TouchRippleProps: import_prop_types9.default.object,
  touchRippleRef: import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.shape({
    current: import_prop_types9.default.shape({
      pulsate: import_prop_types9.default.func.isRequired,
      start: import_prop_types9.default.func.isRequired,
      stop: import_prop_types9.default.func.isRequired
    })
  })]),
  type: import_prop_types9.default.oneOfType([import_prop_types9.default.oneOf(["button", "reset", "submit"]), import_prop_types9.default.string])
};
var ButtonBase_default = ButtonBase;

// node_modules/@mui/material/Typography/Typography.js
init_objectWithoutPropertiesLoose();
init_extends();
var React31 = __toESM(require_react()), import_prop_types10 = __toESM(require_prop_types());
init_clsx_m();
init_esm3();
init_base();
init_styled2();
init_useThemeProps3();
init_capitalize2();

// node_modules/@mui/material/Typography/typographyClasses.js
init_esm2();
init_generateUtilityClass3();
function getTypographyUtilityClass(slot) {
  return generateUtilityClass("MuiTypography", slot);
}
var typographyClasses = generateUtilityClasses("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);

// node_modules/@mui/material/Typography/Typography.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime()), _excluded18 = ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"], useUtilityClasses4 = (ownerState) => {
  let {
    align,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    classes
  } = ownerState, slots = {
    root: ["root", variant, ownerState.align !== "inherit" && `align${capitalize_default(align)}`, gutterBottom && "gutterBottom", noWrap && "noWrap", paragraph && "paragraph"]
  };
  return composeClasses(slots, getTypographyUtilityClass, classes);
}, TypographyRoot = styled_default2("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (props, styles) => {
    let {
      ownerState
    } = props;
    return [styles.root, ownerState.variant && styles[ownerState.variant], ownerState.align !== "inherit" && styles[`align${capitalize_default(ownerState.align)}`], ownerState.noWrap && styles.noWrap, ownerState.gutterBottom && styles.gutterBottom, ownerState.paragraph && styles.paragraph];
  }
})(({
  theme,
  ownerState
}) => _extends5({
  margin: 0
}, ownerState.variant && theme.typography[ownerState.variant], ownerState.align !== "inherit" && {
  textAlign: ownerState.align
}, ownerState.noWrap && {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, ownerState.gutterBottom && {
  marginBottom: "0.35em"
}, ownerState.paragraph && {
  marginBottom: 16
})), defaultVariantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p"
}, colorTransformations = {
  primary: "primary.main",
  textPrimary: "text.primary",
  secondary: "secondary.main",
  textSecondary: "text.secondary",
  error: "error.main"
}, transformDeprecatedColors = (color2) => colorTransformations[color2] || color2, Typography = /* @__PURE__ */ React31.forwardRef(function(inProps, ref) {
  let themeProps = useThemeProps2({
    props: inProps,
    name: "MuiTypography"
  }), color2 = transformDeprecatedColors(themeProps.color), props = extendSxProp(_extends5({}, themeProps, {
    color: color2
  })), {
    align = "inherit",
    className,
    component,
    gutterBottom = !1,
    noWrap = !1,
    paragraph = !1,
    variant = "body1",
    variantMapping = defaultVariantMapping
  } = props, other = _objectWithoutPropertiesLoose2(props, _excluded18), ownerState = _extends5({}, props, {
    align,
    color: color2,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping
  }), Component2 = component || (paragraph ? "p" : variantMapping[variant] || defaultVariantMapping[variant]) || "span", classes = useUtilityClasses4(ownerState);
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TypographyRoot, _extends5({
    as: Component2,
    ref,
    ownerState,
    className: clsx_m_default(classes.root, className)
  }, other));
});
Typography.propTypes = {
  align: import_prop_types10.default.oneOf(["center", "inherit", "justify", "left", "right"]),
  children: import_prop_types10.default.node,
  classes: import_prop_types10.default.object,
  className: import_prop_types10.default.string,
  component: import_prop_types10.default.elementType,
  gutterBottom: import_prop_types10.default.bool,
  noWrap: import_prop_types10.default.bool,
  paragraph: import_prop_types10.default.bool,
  sx: import_prop_types10.default.oneOfType([import_prop_types10.default.arrayOf(import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.object, import_prop_types10.default.bool])), import_prop_types10.default.func, import_prop_types10.default.object]),
  variant: import_prop_types10.default.oneOfType([import_prop_types10.default.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), import_prop_types10.default.string]),
  variantMapping: import_prop_types10.default.object
};
var Typography_default = Typography;

// node_modules/@mui/material/Avatar/Avatar.js
init_objectWithoutPropertiesLoose();
init_extends();
var React33 = __toESM(require_react()), import_prop_types11 = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_styled2();
init_useThemeProps3();

// node_modules/@mui/material/internal/svg-icons/Person.js
var React32 = __toESM(require_react());
init_createSvgIcon();
var import_jsx_runtime11 = __toESM(require_jsx_runtime()), Person_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", {
  d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
}), "Person");

// node_modules/@mui/material/Avatar/avatarClasses.js
init_esm2();
init_generateUtilityClass3();
function getAvatarUtilityClass(slot) {
  return generateUtilityClass("MuiAvatar", slot);
}
var avatarClasses = generateUtilityClasses("MuiAvatar", ["root", "colorDefault", "circular", "rounded", "square", "img", "fallback"]);

// node_modules/@mui/material/Avatar/Avatar.js
var import_jsx_runtime12 = __toESM(require_jsx_runtime()), _excluded19 = ["alt", "children", "className", "component", "imgProps", "sizes", "src", "srcSet", "variant"], useUtilityClasses5 = (ownerState) => {
  let {
    classes,
    variant,
    colorDefault
  } = ownerState;
  return composeClasses({
    root: ["root", variant, colorDefault && "colorDefault"],
    img: ["img"],
    fallback: ["fallback"]
  }, getAvatarUtilityClass, classes);
}, AvatarRoot = styled_default2("div", {
  name: "MuiAvatar",
  slot: "Root",
  overridesResolver: (props, styles) => {
    let {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], ownerState.colorDefault && styles.colorDefault];
  }
})(({
  theme,
  ownerState
}) => _extends5({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 40,
  height: 40,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(20),
  lineHeight: 1,
  borderRadius: "50%",
  overflow: "hidden",
  userSelect: "none"
}, ownerState.variant === "rounded" && {
  borderRadius: (theme.vars || theme).shape.borderRadius
}, ownerState.variant === "square" && {
  borderRadius: 0
}, ownerState.colorDefault && _extends5({
  color: (theme.vars || theme).palette.background.default
}, theme.vars ? {
  backgroundColor: theme.vars.palette.Avatar.defaultBg
} : {
  backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[400] : theme.palette.grey[600]
}))), AvatarImg = styled_default2("img", {
  name: "MuiAvatar",
  slot: "Img",
  overridesResolver: (props, styles) => styles.img
})({
  width: "100%",
  height: "100%",
  textAlign: "center",
  objectFit: "cover",
  color: "transparent",
  textIndent: 1e4
}), AvatarFallback = styled_default2(Person_default, {
  name: "MuiAvatar",
  slot: "Fallback",
  overridesResolver: (props, styles) => styles.fallback
})({
  width: "75%",
  height: "75%"
});
function useLoaded({
  crossOrigin,
  referrerPolicy,
  src,
  srcSet
}) {
  let [loaded, setLoaded] = React33.useState(!1);
  return React33.useEffect(() => {
    if (!src && !srcSet)
      return;
    setLoaded(!1);
    let active = !0, image = new Image();
    return image.onload = () => {
      !active || setLoaded("loaded");
    }, image.onerror = () => {
      !active || setLoaded("error");
    }, image.crossOrigin = crossOrigin, image.referrerPolicy = referrerPolicy, image.src = src, srcSet && (image.srcset = srcSet), () => {
      active = !1;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]), loaded;
}
var Avatar = /* @__PURE__ */ React33.forwardRef(function(inProps, ref) {
  let props = useThemeProps2({
    props: inProps,
    name: "MuiAvatar"
  }), {
    alt,
    children: childrenProp,
    className,
    component = "div",
    imgProps,
    sizes,
    src,
    srcSet,
    variant = "circular"
  } = props, other = _objectWithoutPropertiesLoose2(props, _excluded19), children = null, loaded = useLoaded(_extends5({}, imgProps, {
    src,
    srcSet
  })), hasImg = src || srcSet, hasImgNotFailing = hasImg && loaded !== "error", ownerState = _extends5({}, props, {
    colorDefault: !hasImgNotFailing,
    component,
    variant
  }), classes = useUtilityClasses5(ownerState);
  return hasImgNotFailing ? children = /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(AvatarImg, _extends5({
    alt,
    src,
    srcSet,
    sizes,
    ownerState,
    className: classes.img
  }, imgProps)) : childrenProp != null ? children = childrenProp : hasImg && alt ? children = alt[0] : children = /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(AvatarFallback, {
    className: classes.fallback
  }), /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(AvatarRoot, _extends5({
    as: component,
    ownerState,
    className: clsx_m_default(classes.root, className),
    ref
  }, other, {
    children
  }));
});
Avatar.propTypes = {
  alt: import_prop_types11.default.string,
  children: import_prop_types11.default.node,
  classes: import_prop_types11.default.object,
  className: import_prop_types11.default.string,
  component: import_prop_types11.default.elementType,
  imgProps: import_prop_types11.default.object,
  sizes: import_prop_types11.default.string,
  src: import_prop_types11.default.string,
  srcSet: import_prop_types11.default.string,
  sx: import_prop_types11.default.oneOfType([import_prop_types11.default.arrayOf(import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.object, import_prop_types11.default.bool])), import_prop_types11.default.func, import_prop_types11.default.object]),
  variant: import_prop_types11.default.oneOfType([import_prop_types11.default.oneOf(["circular", "rounded", "square"]), import_prop_types11.default.string])
};
var Avatar_default = Avatar;

// node_modules/@mui/material/Box/Box.js
init_esm3();
var import_prop_types12 = __toESM(require_prop_types());

// node_modules/@mui/material/className/index.js
init_esm2();

// node_modules/@mui/material/Box/Box.js
var defaultTheme3 = createTheme_default2(), Box = createBox({
  defaultTheme: defaultTheme3,
  defaultClassName: "MuiBox-root",
  generateClassName: ClassNameGenerator_default.generate
});
Box.propTypes = {
  children: import_prop_types12.default.node,
  component: import_prop_types12.default.elementType,
  sx: import_prop_types12.default.oneOfType([import_prop_types12.default.arrayOf(import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object, import_prop_types12.default.bool])), import_prop_types12.default.func, import_prop_types12.default.object])
};
var Box_default = Box;

// node_modules/@mui/material/Button/Button.js
init_objectWithoutPropertiesLoose();
init_extends();
var React35 = __toESM(require_react()), import_prop_types13 = __toESM(require_prop_types());
init_clsx_m();
init_esm2();
init_base();
init_esm3();
init_styled2();
init_useThemeProps3();
init_capitalize2();

// node_modules/@mui/material/Button/buttonClasses.js
init_esm2();
init_generateUtilityClass3();
function getButtonUtilityClass(slot) {
  return generateUtilityClass("MuiButton", slot);
}
var buttonClasses = generateUtilityClasses("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]), buttonClasses_default = buttonClasses;

// node_modules/@mui/material/ButtonGroup/ButtonGroupContext.js
var React34 = __toESM(require_react()), ButtonGroupContext = /* @__PURE__ */ React34.createContext({});
ButtonGroupContext.displayName = "ButtonGroupContext";
var ButtonGroupContext_default = ButtonGroupContext;

// node_modules/@mui/material/Button/Button.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime()), import_jsx_runtime14 = __toESM(require_jsx_runtime()), _excluded20 = ["children", "color", "component", "className", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"], useUtilityClasses6 = (ownerState) => {
  let {
    color: color2,
    disableElevation,
    fullWidth,
    size,
    variant,
    classes
  } = ownerState, slots = {
    root: ["root", variant, `${variant}${capitalize_default(color2)}`, `size${capitalize_default(size)}`, `${variant}Size${capitalize_default(size)}`, color2 === "inherit" && "colorInherit", disableElevation && "disableElevation", fullWidth && "fullWidth"],
    label: ["label"],
    startIcon: ["startIcon", `iconSize${capitalize_default(size)}`],
    endIcon: ["endIcon", `iconSize${capitalize_default(size)}`]
  }, composedClasses = composeClasses(slots, getButtonUtilityClass, classes);
  return _extends5({}, classes, composedClasses);
}, commonIconStyles = (ownerState) => _extends5({}, ownerState.size === "small" && {
  "& > *:nth-of-type(1)": {
    fontSize: 18
  }
}, ownerState.size === "medium" && {
  "& > *:nth-of-type(1)": {
    fontSize: 20
  }
}, ownerState.size === "large" && {
  "& > *:nth-of-type(1)": {
    fontSize: 22
  }
}), ButtonRoot = styled_default2(ButtonBase_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (props, styles) => {
    let {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`${ownerState.variant}${capitalize_default(ownerState.color)}`], styles[`size${capitalize_default(ownerState.size)}`], styles[`${ownerState.variant}Size${capitalize_default(ownerState.size)}`], ownerState.color === "inherit" && styles.colorInherit, ownerState.disableElevation && styles.disableElevation, ownerState.fullWidth && styles.fullWidth];
  }
})(({
  theme,
  ownerState
}) => {
  var _theme$palette$getCon, _theme$palette;
  return _extends5({}, theme.typography.button, {
    minWidth: 64,
    padding: "6px 16px",
    borderRadius: (theme.vars || theme).shape.borderRadius,
    transition: theme.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
      duration: theme.transitions.duration.short
    }),
    "&:hover": _extends5({
      textDecoration: "none",
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, ownerState.variant === "text" && ownerState.color !== "inherit" && {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, ownerState.variant === "outlined" && ownerState.color !== "inherit" && {
      border: `1px solid ${(theme.vars || theme).palette[ownerState.color].main}`,
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, ownerState.variant === "contained" && {
      backgroundColor: (theme.vars || theme).palette.grey.A100,
      boxShadow: (theme.vars || theme).shadows[4],
      "@media (hover: none)": {
        boxShadow: (theme.vars || theme).shadows[2],
        backgroundColor: (theme.vars || theme).palette.grey[300]
      }
    }, ownerState.variant === "contained" && ownerState.color !== "inherit" && {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
      "@media (hover: none)": {
        backgroundColor: (theme.vars || theme).palette[ownerState.color].main
      }
    }),
    "&:active": _extends5({}, ownerState.variant === "contained" && {
      boxShadow: (theme.vars || theme).shadows[8]
    }),
    [`&.${buttonClasses_default.focusVisible}`]: _extends5({}, ownerState.variant === "contained" && {
      boxShadow: (theme.vars || theme).shadows[6]
    }),
    [`&.${buttonClasses_default.disabled}`]: _extends5({
      color: (theme.vars || theme).palette.action.disabled
    }, ownerState.variant === "outlined" && {
      border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
    }, ownerState.variant === "contained" && {
      color: (theme.vars || theme).palette.action.disabled,
      boxShadow: (theme.vars || theme).shadows[0],
      backgroundColor: (theme.vars || theme).palette.action.disabledBackground
    })
  }, ownerState.variant === "text" && {
    padding: "6px 8px"
  }, ownerState.variant === "text" && ownerState.color !== "inherit" && {
    color: (theme.vars || theme).palette[ownerState.color].main
  }, ownerState.variant === "outlined" && {
    padding: "5px 15px",
    border: "1px solid currentColor"
  }, ownerState.variant === "outlined" && ownerState.color !== "inherit" && {
    color: (theme.vars || theme).palette[ownerState.color].main,
    border: theme.vars ? `1px solid rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.5)` : `1px solid ${alpha(theme.palette[ownerState.color].main, 0.5)}`
  }, ownerState.variant === "contained" && {
    color: theme.vars ? theme.vars.palette.text.primary : (_theme$palette$getCon = (_theme$palette = theme.palette).getContrastText) == null ? void 0 : _theme$palette$getCon.call(_theme$palette, theme.palette.grey[300]),
    backgroundColor: (theme.vars || theme).palette.grey[300],
    boxShadow: (theme.vars || theme).shadows[2]
  }, ownerState.variant === "contained" && ownerState.color !== "inherit" && {
    color: (theme.vars || theme).palette[ownerState.color].contrastText,
    backgroundColor: (theme.vars || theme).palette[ownerState.color].main
  }, ownerState.color === "inherit" && {
    color: "inherit",
    borderColor: "currentColor"
  }, ownerState.size === "small" && ownerState.variant === "text" && {
    padding: "4px 5px",
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === "large" && ownerState.variant === "text" && {
    padding: "8px 11px",
    fontSize: theme.typography.pxToRem(15)
  }, ownerState.size === "small" && ownerState.variant === "outlined" && {
    padding: "3px 9px",
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === "large" && ownerState.variant === "outlined" && {
    padding: "7px 21px",
    fontSize: theme.typography.pxToRem(15)
  }, ownerState.size === "small" && ownerState.variant === "contained" && {
    padding: "4px 10px",
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === "large" && ownerState.variant === "contained" && {
    padding: "8px 22px",
    fontSize: theme.typography.pxToRem(15)
  }, ownerState.fullWidth && {
    width: "100%"
  });
}, ({
  ownerState
}) => ownerState.disableElevation && {
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none"
  },
  [`&.${buttonClasses_default.focusVisible}`]: {
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none"
  },
  [`&.${buttonClasses_default.disabled}`]: {
    boxShadow: "none"
  }
}), ButtonStartIcon = styled_default2("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (props, styles) => {
    let {
      ownerState
    } = props;
    return [styles.startIcon, styles[`iconSize${capitalize_default(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends5({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4
}, ownerState.size === "small" && {
  marginLeft: -2
}, commonIconStyles(ownerState))), ButtonEndIcon = styled_default2("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (props, styles) => {
    let {
      ownerState
    } = props;
    return [styles.endIcon, styles[`iconSize${capitalize_default(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends5({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8
}, ownerState.size === "small" && {
  marginRight: -2
}, commonIconStyles(ownerState))), Button = /* @__PURE__ */ React35.forwardRef(function(inProps, ref) {
  let contextProps = React35.useContext(ButtonGroupContext_default), resolvedProps = resolveProps(contextProps, inProps), props = useThemeProps2({
    props: resolvedProps,
    name: "MuiButton"
  }), {
    children,
    color: color2 = "primary",
    component = "button",
    className,
    disabled = !1,
    disableElevation = !1,
    disableFocusRipple = !1,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = !1,
    size = "medium",
    startIcon: startIconProp,
    type,
    variant = "text"
  } = props, other = _objectWithoutPropertiesLoose2(props, _excluded20), ownerState = _extends5({}, props, {
    color: color2,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant
  }), classes = useUtilityClasses6(ownerState), startIcon = startIconProp && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ButtonStartIcon, {
    className: classes.startIcon,
    ownerState,
    children: startIconProp
  }), endIcon = endIconProp && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ButtonEndIcon, {
    className: classes.endIcon,
    ownerState,
    children: endIconProp
  });
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(ButtonRoot, _extends5({
    ownerState,
    className: clsx_m_default(contextProps.className, classes.root, className),
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx_m_default(classes.focusVisible, focusVisibleClassName),
    ref,
    type
  }, other, {
    classes,
    children: [startIcon, children, endIcon]
  }));
});
Button.propTypes = {
  children: import_prop_types13.default.node,
  classes: import_prop_types13.default.object,
  className: import_prop_types13.default.string,
  color: import_prop_types13.default.oneOfType([import_prop_types13.default.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), import_prop_types13.default.string]),
  component: import_prop_types13.default.elementType,
  disabled: import_prop_types13.default.bool,
  disableElevation: import_prop_types13.default.bool,
  disableFocusRipple: import_prop_types13.default.bool,
  disableRipple: import_prop_types13.default.bool,
  endIcon: import_prop_types13.default.node,
  focusVisibleClassName: import_prop_types13.default.string,
  fullWidth: import_prop_types13.default.bool,
  href: import_prop_types13.default.string,
  size: import_prop_types13.default.oneOfType([import_prop_types13.default.oneOf(["small", "medium", "large"]), import_prop_types13.default.string]),
  startIcon: import_prop_types13.default.node,
  sx: import_prop_types13.default.oneOfType([import_prop_types13.default.arrayOf(import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.object, import_prop_types13.default.bool])), import_prop_types13.default.func, import_prop_types13.default.object]),
  type: import_prop_types13.default.oneOfType([import_prop_types13.default.oneOf(["button", "reset", "submit"]), import_prop_types13.default.string]),
  variant: import_prop_types13.default.oneOfType([import_prop_types13.default.oneOf(["contained", "outlined", "text"]), import_prop_types13.default.string])
};
var Button_default = Button;

// node_modules/@mui/material/Container/Container.js
var import_prop_types14 = __toESM(require_prop_types());
init_esm3();
init_capitalize2();
init_styled2();
init_useThemeProps3();
var Container = createContainer({
  createStyledComponent: styled_default2("div", {
    name: "MuiContainer",
    slot: "Root",
    overridesResolver: (props, styles) => {
      let {
        ownerState
      } = props;
      return [styles.root, styles[`maxWidth${capitalize_default(String(ownerState.maxWidth))}`], ownerState.fixed && styles.fixed, ownerState.disableGutters && styles.disableGutters];
    }
  }),
  useThemeProps: (inProps) => useThemeProps2({
    props: inProps,
    name: "MuiContainer"
  })
});
Container.propTypes = {
  children: import_prop_types14.default.node,
  classes: import_prop_types14.default.object,
  component: import_prop_types14.default.elementType,
  disableGutters: import_prop_types14.default.bool,
  fixed: import_prop_types14.default.bool,
  maxWidth: import_prop_types14.default.oneOfType([import_prop_types14.default.oneOf(["xs", "sm", "md", "lg", "xl", !1]), import_prop_types14.default.string]),
  sx: import_prop_types14.default.oneOfType([import_prop_types14.default.arrayOf(import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object, import_prop_types14.default.bool])), import_prop_types14.default.func, import_prop_types14.default.object])
};
var Container_default = Container;

// node_modules/@mui/material/Link/Link.js
init_objectWithoutPropertiesLoose();
init_extends();
var React36 = __toESM(require_react()), import_prop_types15 = __toESM(require_prop_types());
init_clsx_m();
init_esm2();
init_base();
init_capitalize2();
init_styled2();
init_useThemeProps3();
init_useIsFocusVisible2();
init_useForkRef2();

// node_modules/@mui/material/Link/linkClasses.js
init_esm2();
init_generateUtilityClass3();
function getLinkUtilityClass(slot) {
  return generateUtilityClass("MuiLink", slot);
}
var linkClasses = generateUtilityClasses("MuiLink", ["root", "underlineNone", "underlineHover", "underlineAlways", "button", "focusVisible"]), linkClasses_default = linkClasses;

// node_modules/@mui/material/Link/getTextDecoration.js
init_esm3();
var colorTransformations2 = {
  primary: "primary.main",
  textPrimary: "text.primary",
  secondary: "secondary.main",
  textSecondary: "text.secondary",
  error: "error.main"
}, transformDeprecatedColors2 = (color2) => colorTransformations2[color2] || color2, getTextDecoration = ({
  theme,
  ownerState
}) => {
  let transformedColor = transformDeprecatedColors2(ownerState.color), color2 = getPath(theme, `palette.${transformedColor}`, !1) || ownerState.color, channelColor = getPath(theme, `palette.${transformedColor}Channel`);
  return "vars" in theme && channelColor ? `rgba(${channelColor} / 0.4)` : alpha(color2, 0.4);
}, getTextDecoration_default = getTextDecoration;

// node_modules/@mui/material/Link/Link.js
var import_jsx_runtime15 = __toESM(require_jsx_runtime()), _excluded21 = ["className", "color", "component", "onBlur", "onFocus", "TypographyClasses", "underline", "variant", "sx"], useUtilityClasses7 = (ownerState) => {
  let {
    classes,
    component,
    focusVisible,
    underline
  } = ownerState, slots = {
    root: ["root", `underline${capitalize_default(underline)}`, component === "button" && "button", focusVisible && "focusVisible"]
  };
  return composeClasses(slots, getLinkUtilityClass, classes);
}, LinkRoot = styled_default2(Typography_default, {
  name: "MuiLink",
  slot: "Root",
  overridesResolver: (props, styles) => {
    let {
      ownerState
    } = props;
    return [styles.root, styles[`underline${capitalize_default(ownerState.underline)}`], ownerState.component === "button" && styles.button];
  }
})(({
  theme,
  ownerState
}) => _extends5({}, ownerState.underline === "none" && {
  textDecoration: "none"
}, ownerState.underline === "hover" && {
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline"
  }
}, ownerState.underline === "always" && _extends5({
  textDecoration: "underline"
}, ownerState.color !== "inherit" && {
  textDecorationColor: getTextDecoration_default({
    theme,
    ownerState
  })
}, {
  "&:hover": {
    textDecorationColor: "inherit"
  }
}), ownerState.component === "button" && {
  position: "relative",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  WebkitAppearance: "none",
  "&::-moz-focus-inner": {
    borderStyle: "none"
  },
  [`&.${linkClasses_default.focusVisible}`]: {
    outline: "auto"
  }
})), Link3 = /* @__PURE__ */ React36.forwardRef(function(inProps, ref) {
  let props = useThemeProps2({
    props: inProps,
    name: "MuiLink"
  }), {
    className,
    color: color2 = "primary",
    component = "a",
    onBlur,
    onFocus,
    TypographyClasses,
    underline = "always",
    variant = "inherit",
    sx
  } = props, other = _objectWithoutPropertiesLoose2(props, _excluded21), {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible_default(), [focusVisible, setFocusVisible] = React36.useState(!1), handlerRef = useForkRef_default(ref, focusVisibleRef), handleBlur = (event) => {
    handleBlurVisible(event), isFocusVisibleRef.current === !1 && setFocusVisible(!1), onBlur && onBlur(event);
  }, handleFocus = (event) => {
    handleFocusVisible(event), isFocusVisibleRef.current === !0 && setFocusVisible(!0), onFocus && onFocus(event);
  }, ownerState = _extends5({}, props, {
    color: color2,
    component,
    focusVisible,
    underline,
    variant
  }), classes = useUtilityClasses7(ownerState);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(LinkRoot, _extends5({
    color: color2,
    className: clsx_m_default(classes.root, className),
    classes: TypographyClasses,
    component,
    onBlur: handleBlur,
    onFocus: handleFocus,
    ref: handlerRef,
    ownerState,
    variant,
    sx: [...Object.keys(colorTransformations2).includes(color2) ? [] : [{
      color: color2
    }], ...Array.isArray(sx) ? sx : [sx]]
  }, other));
});
Link3.propTypes = {
  children: import_prop_types15.default.node,
  classes: import_prop_types15.default.object,
  className: import_prop_types15.default.string,
  color: import_prop_types15.default.any,
  component: elementTypeAcceptingRef_default,
  onBlur: import_prop_types15.default.func,
  onFocus: import_prop_types15.default.func,
  sx: import_prop_types15.default.oneOfType([import_prop_types15.default.arrayOf(import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object, import_prop_types15.default.bool])), import_prop_types15.default.func, import_prop_types15.default.object]),
  TypographyClasses: import_prop_types15.default.object,
  underline: import_prop_types15.default.oneOf(["always", "hover", "none"]),
  variant: import_prop_types15.default.oneOfType([import_prop_types15.default.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), import_prop_types15.default.string])
};
var Link_default = Link3;

// node_modules/@mui/material/index.js
init_SvgIcon2();
init_SvgIcon2();
init_generateUtilityClass3();

// app/routes/index.jsx
var import_GitHub = __toESM(require_GitHub()), import_LinkedIn = __toESM(require_LinkedIn());

// app/styles/index.css
var styles_default = "/build/_assets/index-AKVYQ44B.css";

// app/routes/index.jsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime()), links = () => [{ rel: "stylesheet", href: styles_default }];
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Container_default, { maxWidth: "sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
    Box_default,
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      mt: 3,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
          Avatar_default,
          {
            alt: "Guillaume Tremeau",
            src: "/guillaume.jpg",
            sx: { width: 76, height: 76 },
            mb: 2
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.jsx",
            lineNumber: 30,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Typography_default, { variant: "h5", align: "center", mb: 2, children: "Code with Guillaume" }, void 0, !1, {
          fileName: "app/routes/index.jsx",
          lineNumber: 36,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Typography_default, { align: "center", mb: 2, children: "Hi! I'm Guillaume Tremeau, a freelance web developer and passionate photographer." }, void 0, !1, {
          fileName: "app/routes/index.jsx",
          lineNumber: 39,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
          Box_default,
          {
            sx: {
              typography: "body1",
              "& > :not(style) + :not(style)": {
                ml: 2
              }
            },
            mb: 2,
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
                Link_default,
                {
                  href: "https://www.linkedin.com/in/guillaumetremeau/",
                  underline: "none",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_LinkedIn.default, {}, void 0, !1, {
                    fileName: "app/routes/index.jsx",
                    lineNumber: 56,
                    columnNumber: 13
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/index.jsx",
                  lineNumber: 52,
                  columnNumber: 11
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link_default, { href: "https://github.com/guillaumetremeau", underline: "none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_GitHub.default, {}, void 0, !1, {
                fileName: "app/routes/index.jsx",
                lineNumber: 59,
                columnNumber: 13
              }, this) }, void 0, !1, {
                fileName: "app/routes/index.jsx",
                lineNumber: 58,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
                Link_default,
                {
                  href: "https://profile.codersrank.io/user/guillaumetremeau/",
                  underline: "none",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(SvgIcon_default, { inheritViewBox: !0, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
                    "path",
                    {
                      d: "M23.134 8.64l-5.973-3.62a.286.286 0 0 0-.412.125l-1.4 3.286 2.842 1.696a.53.53 0 0 1 0 .921l-5.335 3.14-2.267 5.274a.127.127 0 0 0 .052.203.122.122 0 0 0 .134-.035l3.914-2.365 1.545 2.219a.373.373 0 0 0 .309.167h3.708a.367.367 0 0 0 .327-.2.382.382 0 0 0-.018-.386l-2.513-3.852 5.088-3.077c.577-.349.865-.74.865-1.172V9.813c0-.433-.288-.823-.866-1.172zM13.082 4.35L.845 12.052c-.577.348-.858.739-.845 1.171v1.173c.014.432.303.816.866 1.15l6.056 3.496a.286.286 0 0 0 .412-.146l1.36-3.286-2.884-1.633a.518.518 0 0 1-.275-.384.529.529 0 0 1 .254-.537l5.295-3.245 2.183-5.316a.128.128 0 0 0-.04-.142.122.122 0 0 0-.146-.005z",
                      fill: "#2576d2"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/index.jsx",
                      lineNumber: 66,
                      columnNumber: 15
                    },
                    this
                  ) }, void 0, !1, {
                    fileName: "app/routes/index.jsx",
                    lineNumber: 65,
                    columnNumber: 13
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/index.jsx",
                  lineNumber: 61,
                  columnNumber: 11
                },
                this
              )
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/index.jsx",
            lineNumber: 43,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
          Button_default,
          {
            variant: "outlined",
            href: "https://guillaumetremeau.com",
            fullWidth: !0,
            children: "Check my photos!"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.jsx",
            lineNumber: 73,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Typography_default, { variant: "h6", mt: 3, children: "What I recently worked on?" }, void 0, !1, {
          fileName: "app/routes/index.jsx",
          lineNumber: 80,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
          Button_default,
          {
            variant: "outlined",
            href: "https://camilleetflorent.guillaumetremeau.me",
            fullWidth: !0,
            sx: {
              mb: 1
            },
            children: "Mariage Camille & Florent"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.jsx",
            lineNumber: 83,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
          Button_default,
          {
            variant: "outlined",
            href: "https://black-jack.guillaumetremeau.me",
            fullWidth: !0,
            sx: {
              mb: 1
            },
            children: "Black Jack game"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.jsx",
            lineNumber: 93,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Typography_default, { variant: "h6", mt: 3, children: "My Coding Activity & Stats" }, void 0, !1, {
          fileName: "app/routes/index.jsx",
          lineNumber: 103,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
          "codersrank-summary",
          {
            username: "guillaumetremeau",
            "show-header": "false",
            branding: "false"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.jsx",
            lineNumber: 106,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("codersrank-skills-chart", { username: "guillaumetremeau" }, void 0, !1, {
          fileName: "app/routes/index.jsx",
          lineNumber: 111,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Box_default, { mt: 3, typography: "subtitle2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link_default, { underline: "none", href: "tel:+330770818649", children: "+33 (0) 7 70 81 86 49" }, void 0, !1, {
          fileName: "app/routes/index.jsx",
          lineNumber: 113,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "app/routes/index.jsx",
          lineNumber: 112,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Box_default, { mt: 1, typography: "subtitle2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link_default, { underline: "none", href: "mailto:tremeauguillaume@gmail.com", children: "tremeauguillaume@gmail.com" }, void 0, !1, {
          fileName: "app/routes/index.jsx",
          lineNumber: 118,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "app/routes/index.jsx",
          lineNumber: 117,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/index.jsx",
      lineNumber: 23,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/routes/index.jsx",
    lineNumber: 22,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "8ea87238", entry: { module: "/build/entry.client-56K2VPPI.js", imports: ["/build/_shared/chunk-OSEEA2YN.js", "/build/_shared/chunk-TCN6SRWG.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-XED4TU47.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-3WM5BWDN.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, url: "/build/manifest-8EA87238.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public\\build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_vanillaExtract: !1, v2_errorBoundary: !1, v2_meta: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  }
};

// server.js
var handleRequest2 = createPagesFunctionHandler({
  build: server_build_exports,
  mode: "development",
  getLoadContext: (context) => context.env
});
function onRequest(context) {
  return handleRequest2(context);
}
export {
  onRequest
};
//# sourceMappingURL=/build/[[path]].js.map
