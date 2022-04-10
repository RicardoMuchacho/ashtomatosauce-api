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
var multer = require("multer");
var dotenv = require("dotenv").config();
var db = require("../helpers/db.ts");
var User = require("../models/user");
var Comment = require("../models/comment");
var Manga = require("../models/manga");
var path = require("path");
var fs = require("fs");
var auth = require("../helpers/auth.ts");
var upload = multer({ dest: "uploads/" });
//controllers
var manga_c = require("../controllers/manga_controller");
var chapter_c = require("../controllers/chapter_controller");
var router = express.Router();
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Manga.find()];
            case 1:
                r = _a.sent();
                console.log(r);
                res.send(JSON.stringify(r));
                return [2 /*return*/];
        }
    });
}); });
router.put("/", upload.single("image"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, manga_id, title, description, file, r;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, manga_id = _a.manga_id, title = _a.title, description = _a.description;
                file = req.file;
                return [4 /*yield*/, manga_c.update_manga(manga_id, file.path, title, description)];
            case 1:
                r = _b.sent();
                console.log(r);
                res.send(JSON.stringify(r));
                return [2 /*return*/];
        }
    });
}); });
router.get("/:title", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var manga_title, r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                manga_title = req.params.title;
                return [4 /*yield*/, Manga.find({ title: { $regex: manga_title, $options: "i" } })];
            case 1:
                r = _a.sent();
                if (!r || r == null || r == "") {
                    return [2 /*return*/, res.send(JSON.stringify("No Mangas found"))];
                }
                res.send(JSON.stringify(r));
                return [2 /*return*/];
        }
    });
}); });
router.get("/chapters/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var manga_id, r, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                manga_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Manga.findById(manga_id)];
            case 2:
                r = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4:
                if (!r || r == null || r.chapters == "") {
                    return [2 /*return*/, res.send(JSON.stringify("No Chapters found"))];
                }
                return [2 /*return*/, res.send(JSON.stringify(r.chapters))];
        }
    });
}); });
router.get("/chapter/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chapter_id, chapter, r, error_2, comments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chapter_id = req.params.id;
                chapter = null;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Manga.findOne({ "chapters._id": chapter_id }, "chapters")];
            case 2:
                r = _a.sent();
                console.log(r);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4:
                if (!r || r == null || r.chapters == "") {
                    return [2 /*return*/, res.send(JSON.stringify("No Chapters found"))];
                }
                console.log(r.chapters);
                r.chapters.forEach(function (element) {
                    if (element._id == chapter_id) {
                        return (chapter = element);
                    }
                });
                return [4 /*yield*/, Comment.find({ chapter_id: chapter_id })];
            case 5:
                comments = _a.sent();
                console.log(comments);
                return [2 /*return*/, res.json({ chapter: chapter, comments: comments })];
        }
    });
}); });
router.post("/", auth, upload.single("image"), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, title, username, description, file, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, title = _a.title, username = _a.username, description = _a.description;
                    file = req.file;
                    console.log(file);
                    return [4 /*yield*/, manga_c.create_manga(title, file.path, username, description)];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, fs.unlink(file.path, function (error) { return console.log(error); })];
                case 2:
                    _b.sent();
                    res.send(JSON.stringify(response));
                    return [2 /*return*/];
            }
        });
    });
});
router.delete("/", auth, upload.none(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var manga_id, r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                manga_id = req.body.id;
                console.log(manga_id);
                return [4 /*yield*/, Manga.findByIdAndRemove(manga_id)];
            case 1:
                r = _a.sent();
                res.send(JSON.stringify(r));
                return [2 /*return*/];
        }
    });
}); });
router.post("/chapter", auth, upload.array("images", 80), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var files, _a, manga_id, number, file_paths, r;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    files = req.files;
                    _a = req.body, manga_id = _a.manga_id, number = _a.number;
                    file_paths = files.map(function (i) { return i.path; });
                    console.log(file_paths);
                    return [4 /*yield*/, chapter_c.create_chapter(manga_id, number, file_paths)];
                case 1:
                    r = _b.sent();
                    res.send(JSON.stringify(r));
                    return [2 /*return*/];
            }
        });
    });
});
router.delete("/chapter", auth, upload.none(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, manga_id, number, r;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, manga_id = _a.manga_id, number = _a.number;
                return [4 /*yield*/, Manga.findByIdAndUpdate(manga_id, { $pull: { chapters: { number: number } } }, {
                        new: true,
                    })];
            case 1:
                r = _b.sent();
                res.send(JSON.stringify(r));
                return [2 /*return*/];
        }
    });
}); });
router.get("/comment/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chapter_id, comments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chapter_id = req.params.id;
                return [4 /*yield*/, Comment.find({ chapter_id: chapter_id })];
            case 1:
                comments = _a.sent();
                res.send(JSON.stringify(comments));
                return [2 /*return*/];
        }
    });
}); });
router.post("/comment/:id", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, description, chapter_id, r;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, description = _a.description;
                chapter_id = req.params.id;
                return [4 /*yield*/, db.create_comment(chapter_id, username, description)];
            case 1:
                r = _b.sent();
                res.send(JSON.stringify(r));
                return [2 /*return*/];
        }
    });
}); });
router.delete("/comment/:id", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comment_id, username, comment, r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                comment_id = req.params.id;
                username = req.body.user;
                comment = Comment.findById(comment_id);
                console.log(comment);
                if (username != comment.username) {
                    return [2 /*return*/, res.json({ message: "you're not the author" })];
                }
                return [4 /*yield*/, db.delete_comment(comment_id)];
            case 1:
                r = _a.sent();
                res.json({ deleted: r });
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=mangas.js.map