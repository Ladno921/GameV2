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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function stringData(data) {
    let date = new Date(Number(data));
    function addZero(number, col) {
        if (Number(col) - Number(String(number).length) >= 0) {
            return "0".repeat(Number(col) - Number(String(number).length)) + number;
        }
        else {
            return number;
        }
    }
    return String(`${date.getFullYear()}.${addZero(Number(date.getMonth() + 1), 2)}.${addZero(date.getDate(), 2)} ${addZero(date.getHours(), 2)}:${addZero(date.getMinutes(), 2)}`);
}
class CommentsController {
    postComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, text, name } = req.body;
            let date = new Date();
            let realDate = stringData(date.getTime());
            yield prisma.comments.create({
                data: {
                    item_id: Number(id),
                    date: realDate,
                    text: text,
                    name: name
                }
            });
            res.redirect('/items');
        });
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name } = req.body;
            const comments = yield prisma.comments.findMany({});
            console.log(id);
            if (req.session.name = name || req.session.admin == true) {
                yield prisma.comments.delete({
                    where: {
                        id: Number(id)
                    }
                });
                res.redirect('/items');
            }
            else {
                res.redirect('/items');
            }
        });
    }
}
exports.CommentsController = CommentsController;
