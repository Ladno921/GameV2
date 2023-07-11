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
exports.BasketController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class BasketController {
    addBasket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name } = req.body;
            const user = yield prisma.users.findMany({
                where: {
                    name: String(req.session.name),
                }
            });
            const item = yield prisma.items.findMany({
                where: {
                    id: Number(id),
                }
            });
            const user_item = yield prisma.user_items.findMany({
                where: {
                    user_id: Number(user[0].id),
                    item_id: Number(id),
                }
            });
            if (user_item[0] == undefined) {
                const user_items = yield prisma.user_items.create({
                    data: {
                        user_id: Number(user[0].id),
                        item_id: Number(id),
                    }
                });
            }
            const basket = yield prisma.basket.create({
                data: {
                    title: item[0].title,
                    image: item[0].image,
                    description: item[0].description,
                    OS: String(item[0].OS),
                    DirectX: String(item[0].DirectX),
                    CPU: String(item[0].CPU),
                    RAM: String(item[0].RAM),
                    video_card: String(item[0].video_card),
                    disc_space: String(item[0].disc_space),
                    release: String(item[0].release),
                    developer: String(item[0].developer),
                    platform: String(item[0].platform),
                }
            });
            res.redirect("/");
        });
    }
    deleteBasket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const items = yield prisma.items.findUnique({
                where: {
                    id: Number(id),
                }
            });
            if (items != null) {
                const user_item = yield prisma.user_items.deleteMany({
                    where: {
                        item_id: Number(id),
                    }
                });
            }
            res.redirect("/");
        });
    }
    showBasket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.users.findMany({
                where: {
                    name: req.session.name,
                },
                select: {
                    items: {
                        select: {
                            item: {
                                select: {
                                    id: true,
                                }
                            }
                        }
                    }
                }
            });
            let arr = [];
            for (let i = 0; i < user[0].items.length; i++) {
                arr.push(user[0].items[i].item.id);
            }
            const items = yield prisma.items.findMany({
                where: {
                    id: {
                        in: arr,
                    },
                }
            });
            console.log(items);
            res.render("basket", {
                'items': items,
                auth: req.session.auth,
                admin: req.session.admin,
                name: req.session.name
            });
        });
    }
}
exports.BasketController = BasketController;
