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
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var User = require("../models/user");
var Chapter = require("../models/chapter");
var Comment = require("../models/comment");
var Manga = require("../models/manga");
dotenv.config({ path: "../.env" });
var PORT = process.env.PORT || 3000;
var dbURI = process.env.MONGO_URI;
/*
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));
*/
//manga functions
function create_manga(username, cover, title, description) {
    if (description === void 0) { description = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var manga, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manga = new Manga({
                        cover: cover,
                        title: title,
                        username: username,
                        description: description,
                    });
                    return [4 /*yield*/, manga.save()];
                case 1:
                    res = _a.sent();
                    console.log(res);
                    return [2 /*return*/, res];
            }
        });
    });
}
function get_all_manga() {
    return __awaiter(this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Manga.find({})];
                case 1:
                    res = _b.sent();
                    //res.send(JSON.stringify(r));
                    console.log(res);
                    return [2 /*return*/, res];
                case 2:
                    _a = _b.sent();
                    (function (err) { return console.log(err); });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function get_manga(manga_id) {
    return __awaiter(this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Manga.findById(manga_id)];
                case 1:
                    res = _b.sent();
                    //res.send(JSON.stringify(r));
                    console.log(res);
                    return [2 /*return*/, res];
                case 2:
                    _a = _b.sent();
                    (function (err) { return console.log(err); });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function update_manga(manga_id, cover, title, description) {
    return __awaiter(this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Manga.findOneAndUpdate(manga_id, {
                            cover: cover,
                            title: title,
                            description: description,
                        }, {
                            new: true,
                        })];
                case 1:
                    res = _b.sent();
                    //res.send(JSON.stringify(r));
                    console.log(res);
                    return [2 /*return*/, res];
                case 2:
                    _a = _b.sent();
                    (function (err) { return console.log(err); });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function delete_manga(manga_id) {
    return __awaiter(this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Manga.findByIdAndRemove(manga_id)];
                case 1:
                    res = _b.sent();
                    //res.send(JSON.stringify(r));
                    console.log(res);
                    return [2 /*return*/, res];
                case 2:
                    _a = _b.sent();
                    (function (err) { return console.log(err); });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//chapter functions
function create_chapter(manga_id, chapter_number, pages) {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Manga.findByIdAndUpdate(manga_id, { $push: { chapters: { number: chapter_number, pages: pages } } }, {
                        new: true,
                    })];
                case 1:
                    r = _a.sent();
                    console.log(r);
                    return [2 /*return*/, r];
            }
        });
    });
}
function get_manga_chapters(manga_id) {
    return __awaiter(this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Chapter.find({ manga_id: manga_id })];
                case 1:
                    res = _b.sent();
                    //res.send(JSON.stringify(r));
                    console.log(res);
                    return [2 /*return*/, res];
                case 2:
                    _a = _b.sent();
                    (function (err) { return console.log(err); });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function get_chapter(chapter_id) {
    return __awaiter(this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Chapter.findById(chapter_id)];
                case 1:
                    res = _b.sent();
                    //res.send(JSON.stringify(r));
                    console.log(res);
                    return [2 /*return*/, res];
                case 2:
                    _a = _b.sent();
                    (function (err) { return console.log(err); });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//comment functions
function create_comment(chapter_id, username, description) {
    return __awaiter(this, void 0, void 0, function () {
        var comment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comment = new Comment({
                        username: username,
                        description: description,
                        chapter_id: chapter_id,
                    });
                    return [4 /*yield*/, comment
                            .save()
                            .then(function (result) {
                            console.log(result);
                            //res.send(JSON.stringify(result));
                        })
                            .catch(function (err) { return console.log(err); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, comment];
            }
        });
    });
}
function get_comments(movie_id) {
    return __awaiter(this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Comment.find({ movie_id: movie_id })];
                case 1:
                    res = _b.sent();
                    //res.send(JSON.stringify(r));
                    console.log(res);
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    (function (err) { return console.log(err); });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, res];
            }
        });
    });
}
function delete_comment(id) {
    return __awaiter(this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Comment.findOneAndDelete({ _id: id })];
                case 1:
                    res = _b.sent();
                    //res.send(JSON.stringify("Deleted, " +r));
                    console.log("deleted: " + res);
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    (function (err) { return console.log(err); });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, res];
            }
        });
    });
}
module.exports = {
    create_manga: create_manga,
    get_manga: get_manga,
    get_all_manga: get_all_manga,
    get_comments: get_comments,
    create_comment: create_comment,
    delete_comment: delete_comment,
    create_chapter: create_chapter,
    update_manga: update_manga,
};
//ts-node db.ts
//# sourceMappingURL=db.js.map