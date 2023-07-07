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
exports.CategoriesController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// const session = require('express-session')
class CategoriesController {
    categories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            req.session.categ_id = Number(req.params.id);
            const item = yield prisma.items.findMany({});
            if (item.length > 5) {
                let itemsPerPage = 12;
                let page = Number(req.query.page);
                const count = yield prisma.items.count({});
                let pages = Math.ceil((count / itemsPerPage));
                if (!page)
                    page = 1;
                if (page > pages)
                    page = Number(pages);
                const items = yield prisma.items.findMany({
                    take: itemsPerPage,
                    skip: (page - 1) * itemsPerPage,
                });
            }
            let pages = 0;
            const categories = yield prisma.categories.findMany({
                where: {
                    id: Number(id),
                },
                select: {
                    title: true,
                    item: {
                        select: {
                            item: {
                                select: {
                                    id: true,
                                }
                            },
                        },
                    },
                },
            });
            let arr = [];
            for (let i = 0; i < categories[0].item.length; i++) {
                arr.push(categories[0].item[i].item.id);
            }
            const category = yield prisma.categories.findMany({});
            const length = category.length;
            let mass = [];
            for (let i = 0; i < length; i++) {
                mass.push(i);
            }
            const items = yield prisma.items.findMany({
                where: {
                    id: {
                        in: arr,
                    },
                    cat_id: {
                        in: mass
                    }
                }
            });
            res.render('category/main', {
                'items': items,
                'categories': categories,
                number: Number(pages),
                auth: req.session.auth,
                categ__id: req.session.categ_id,
                admin: req.session.admin,
                name: req.session.name
            });
        });
    }
    //Создание категории
    storeCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const categories = yield prisma.categories.findMany({
                where: {
                    title: title
                }
            });
            if (categories[0] != undefined) {
                res.redirect('/category/store');
            }
            else if (categories[0] == '') {
                res.redirect('/category/store');
            }
            else {
                yield prisma.categories.create({
                    data: {
                        title: title
                    }
                });
                res.redirect('/');
            }
        });
    }
    createCategory(req, res) {
        res.render('category/store', {
            auth: req.session.auth,
            admin: req.session.admin,
            name: req.session.name,
        });
    }
}
exports.CategoriesController = CategoriesController;
