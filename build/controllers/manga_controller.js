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
var Manga = require("../models/manga");
var dotenv = require("dotenv").config({ path: "../.env" });
var express = require("express");
var fs = require("fs");
var util = require("util");
var unlinkFile = util.promisify(fs.unlink);
var multer = require("multer");
var cloudinary = require("cloudinary").v2;
var db = require("../helpers/db");
/*
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
*/
function delete_manga(manga_id) {
    return __awaiter(this, void 0, void 0, function () {
        var manga, title, to_delete, subfolders, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Manga.findById(manga_id)];
                case 1:
                    manga = _a.sent();
                    title = manga.title;
                    to_delete = [];
                    return [4 /*yield*/, cloudinary.api.sub_folders("Manga/".concat(title))];
                case 2:
                    subfolders = _a.sent();
                    console.log(subfolders);
                    subfolders.folders.forEach(function (element) {
                        to_delete.push(element.path);
                    });
                    console.log(to_delete);
                    console.log(title);
                    return [4 /*yield*/, cloudinary.api.delete_all_resources({ folder: to_delete[0] }, function (error, result) {
                            console.log(result, error);
                        })];
                case 3:
                    r = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//delete_manga("6243ed03799c7d2160f95c57");
function create_manga(title, cover, username, description) {
    var description;
    return __awaiter(this, void 0, void 0, function () {
        var response, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    description = description || "";
                    return [4 /*yield*/, cloudinary.uploader.upload(cover, { folder: "Manga/".concat(title, "/"), public_id: "cover" }, function (error, result) {
                            console.log(result, error);
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, db.create_manga(username, response.secure_url, title, description)];
                case 2:
                    res = _a.sent();
                    console.log(JSON.stringify(res));
                    return [2 /*return*/, res];
            }
        });
    });
}
function update_manga(manga_id, cover, title, description) {
    var description;
    return __awaiter(this, void 0, void 0, function () {
        var response, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    description = description || "";
                    return [4 /*yield*/, cloudinary.uploader.upload(cover, { folder: "Manga/".concat(title, "/"), public_id: "cover" }, function (error, result) {
                            console.log(result, error);
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, db.update_manga(manga_id, response.secure_url, title, description)];
                case 2:
                    res = _a.sent();
                    console.log(res);
                    return [2 /*return*/, res];
            }
        });
    });
}
module.exports = { delete_manga: delete_manga, create_manga: create_manga, update_manga: update_manga };
//ts-node manga_controller.ts
//# sourceMappingURL=manga_controller.js.map