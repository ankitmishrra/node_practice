"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var googleapis_1 = require("googleapis");
var app = express_1["default"]();
app.set("views", "src/views");
app.set("view engine", "pug");
app.use(express_1["default"].json);
app.use(express_1["default"].urlencoded({ extended: false }));
var access_type = "offline";
var prompt = "consent";
var scope = ["email", "profile"];
var oauth2Client = new googleapis_1.google.auth.OAuth2("994704172930-npev5rbbn9qtegfei224p0vgpbnoj60f.apps.googleusercontent.com", "NIXj3L647ZtnRNtbVfFstq2F", "http://localhost:8080/auth/google/callback");
var redirectUrl = oauth2Client.generateAuthUrl({
    access_type: access_type,
    prompt: prompt,
    scope: scope
});
var auth = false;
app.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var oauth2, userInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oauth2 = googleapis_1.google.oauth2({ version: "v1", auth: oauth2Client });
                    if (!auth) return [3 /*break*/, 2];
                    return [4 /*yield*/, oauth2.userinfo.v2.me.get()];
                case 1:
                    userInfo = _a.sent();
                    res.render("index", {
                        buttonSpan: "Sign out",
                        url: "http://localhost:8080/logout",
                        userInfo: userInfo.data
                    });
                    return [3 /*break*/, 3];
                case 2:
                    res.render("index", {
                        buttonSpan: "Sign in",
                        url: redirectUrl,
                        userInfo: {}
                    });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
});
app.get("/auth/google/callback", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var code, tokens;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = req.query.code;
                    if (!code) return [3 /*break*/, 2];
                    return [4 /*yield*/, oauth2Client.getToken(code)];
                case 1:
                    tokens = (_a.sent()).tokens;
                    oauth2Client.setCredentials(tokens);
                    auth = true;
                    _a.label = 2;
                case 2:
                    res.redirect("/");
                    return [2 /*return*/];
            }
        });
    });
});
app.get("/logout", function (req, res) {
    oauth2Client.revokeCredentials().then(function (r) { return console.log("revoke", r); });
    auth = false;
    res.redirect("/");
});
app.listen(8080);
