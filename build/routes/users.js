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
var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var dotenv = require("dotenv");
var db = require("../helpers/db.ts");
var User = require("../models/user");
var Comment = require("../models/comment");
var Manga = require("../models/manga");
var auth = require("../helpers/auth.ts");
var router = express.Router();
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send("user route");
        return [2 /*return*/];
    });
}); });
router.put("/:user", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prev_username, new_username, new_password, new_name, encrypted_password, query, r, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                prev_username = req.params.user;
                new_username = req.body.username;
                new_password = req.body.password;
                new_name = req.body.name;
                return [4 /*yield*/, bcrypt.hash(new_password, 10)];
            case 1:
                encrypted_password = _b.sent();
                query = { username: prev_username };
                return [4 /*yield*/, User.findOneAndUpdate(query, { name: new_name, username: new_username, password: encrypted_password }, {
                        new: true,
                    })];
            case 2:
                r = _b.sent();
                res.send(JSON.stringify(r));
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                (function (err) { return console.log(err); });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.delete("/:user", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var delete_username, r, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                delete_username = req.params.user;
                return [4 /*yield*/, User.findOneAndDelete({ username: delete_username })];
            case 1:
                r = _b.sent();
                res.json({ deleted: r });
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                (function (err) { return console.log(err); });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/:user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.user;
                return [4 /*yield*/, User.findOne({ username: username })];
            case 1:
                r = _a.sent();
                res.send(JSON.stringify(r));
                return [2 /*return*/];
        }
    });
}); });
router.get("/:user/created", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.user;
                return [4 /*yield*/, Manga.find({ username: username })];
            case 1:
                r = _a.sent();
                res.send(JSON.stringify(r));
                return [2 /*return*/];
        }
    });
}); });
router.get("/:user/comments", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.user;
                return [4 /*yield*/, Comment.find({ username: username })];
            case 1:
                r = _a.sent();
                res.send(JSON.stringify(r));
                return [2 /*return*/];
        }
    });
}); });
router.delete("/:user/mangas", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, manga_id, query, r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.user;
                manga_id = req.body.id;
                query = { username: username };
                return [4 /*yield*/, User.findOneAndUpdate(query, { $pull: { mangas: { id: manga_id } } }, {
                        new: true,
                    })];
            case 1:
                r = _a.sent();
                res.send(JSON.stringify(r));
                return [2 /*return*/];
        }
    });
}); });
router.post("/:user/mangas", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, manga_id, manga, manga_title, is_added, query, user, user_mangas, r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.user;
                manga_id = req.body.id;
                return [4 /*yield*/, Manga.findById(manga_id)];
            case 1:
                manga = _a.sent();
                manga_title = manga.title;
                is_added = false;
                query = { username: username };
                return [4 /*yield*/, User.findOne(query)];
            case 2:
                user = _a.sent();
                user_mangas = user.mangas;
                user_mangas.forEach(function (i) {
                    if (i.id == manga_id) {
                        return (is_added = true);
                    }
                });
                if (!(is_added != false)) return [3 /*break*/, 3];
                return [2 /*return*/, res.send(JSON.stringify("Manga already added"))];
            case 3: return [4 /*yield*/, User.findOneAndUpdate(query, { $push: { mangas: { id: manga_id, title: manga_title } } }, {
                    new: true,
                })];
            case 4:
                r = _a.sent();
                _a.label = 5;
            case 5:
                res.send(JSON.stringify(r));
                return [2 /*return*/];
        }
    });
}); });
router.get("/:user/mangas", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, r, user_mangas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.user;
                return [4 /*yield*/, User.findOne({ username: username })];
            case 1:
                r = _a.sent();
                console.log(r);
                user_mangas = r.mangas;
                if (!user_mangas || user_mangas == "") {
                    return [2 /*return*/, res.send(JSON.stringify("No mangas added yet"))];
                }
                res.send(JSON.stringify(user_mangas));
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=users.js.map