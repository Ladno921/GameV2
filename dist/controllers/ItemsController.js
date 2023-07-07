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
exports.ItemsController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// const session = require('express-session')
class ItemsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.items.findMany({});
            req.session.length = items.length;
            if (items.length > 5) {
                let page = Number(req.query.page);
                const count = yield prisma.items.count({});
                req.session.count = Math.ceil((count / 12));
                if (!page)
                    page = 1;
                if (page > count)
                    page = Number(count);
                const items = yield prisma.items.findMany({
                    take: 12,
                    skip: (page - 1) * 12
                });
                // const items = await prisma.items.findMany({});
                const categories = yield prisma.categories.findMany();
                res.render('items', {
                    'items': items,
                    'length': req.session.length,
                    categories: categories,
                    number: Number(req.session.count),
                    auth: req.session.auth,
                    admin: req.session.admin,
                    name: req.session.name
                });
            }
            else {
                const categories = yield prisma.categories.findMany();
                res.render('items/index', {
                    'items': items,
                    categories: categories,
                    auth: req.session.auth,
                    admin: req.session.admin,
                    name: req.session.name
                });
            }
        });
    }
    // async Upload(req: Request, res: Response) {
    //     const { title, check, description } = req.body;
    //     console.log(String(req.file?.originalname));
    //     await prisma.items.create({
    //         data: {
    //             title,
    //             image: String(req.file?.originalname),
    //             category: {
    //                 connect: {
    //                     id: Number(check),
    //                 }
    //             },
    //             description,
    //         }
    //     });
    //     res.redirect('/items');
    // }
    //Рендер главной страницы
    Home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield prisma.items.findMany({});
            const length = item.length;
            // if(item.length > 5){
            const items = yield prisma.items.findMany({
                take: 4,
                skip: length - 5,
            });
            // }
            // const items = await prisma.items.findMany({})
            const categories = yield prisma.categories.findMany({});
            res.render('home', {
                'items': items,
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin,
                name: req.session.name,
            });
        });
    }
    //Рендер страницы объекта
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item_ = yield prisma.items.findMany({});
            const length = item_.length;
            const comment_ = yield prisma.comments.findMany({});
            const comments_length = comment_.length;
            const game = yield prisma.items.findUnique({
                where: {
                    id: Number(id)
                }
            });
            const comments = yield prisma.comments.findMany({
                where: {
                    item_id: Number(id)
                }
            });
            if (length > 5) {
                const items = yield prisma.items.findMany({
                    take: 4,
                    skip: length - 5,
                });
                const categorie = yield prisma.categories.findMany({});
                res.render('items/show', {
                    'game': game,
                    'items': items,
                    'comments': comments,
                    'length': comments_length,
                    'categorie': categorie,
                    auth: req.session.auth,
                    admin: req.session.admin,
                    name: req.session.name
                });
            }
            else {
                const items = yield prisma.items.findMany({});
                const categorie = yield prisma.categories.findMany({});
                res.render('items/show', {
                    'game': game,
                    'items': items,
                    'categorie': categorie,
                    'comments': comments,
                    'length': comments_length,
                    auth: req.session.auth,
                    admin: req.session.admin,
                    name: req.session.name
                });
            }
        });
    }
    //Создание объекта
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, image, description, OS, DirectX, platform, developer, release, CPU, RAM, video_card, disc_space } = req.body;
            const item = yield prisma.items.findMany();
            let categories = yield prisma.categories.findMany({});
            let one = "";
            for (let i = 0; i < categories.length; i++) {
                one = req.body.check;
            }
            let arr = [];
            for (let i = 0; i < one.length; i++) {
                let categories = yield prisma.categories.findMany({
                    where: {
                        id: Number(one[i])
                    }
                });
                arr.push(categories[0].title);
            }
            const items = yield prisma.items.create({
                data: {
                    title: title,
                    image: image,
                    description: description,
                    OS: String(OS),
                    DirectX: String(DirectX),
                    CPU: String(CPU),
                    RAM: String(RAM),
                    video_card: String(video_card),
                    disc_space: String(disc_space),
                    release: String(release),
                    developer: String(developer),
                    platform: String(platform),
                    cat_id: 2
                }
            });
            for (let i = 0; i < one.length; i++) {
                let categories = yield prisma.categories.findMany({
                    where: {
                        id: Number(one[i])
                    }
                });
                yield prisma.item_category.create({
                    data: {
                        item_id: items.id,
                        cat_id: categories[0].id
                    }
                });
            }
            res.redirect("/");
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield prisma.categories.findMany({});
            const items = yield prisma.items.findMany({});
            res.render('items/create', {
                categories: categories,
                auth: req.session.auth,
                admin: req.session.admin,
                categ_id: req.session.categ_id,
                name: req.session.name,
            });
        });
    }
    //Удаление объекта
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const categories = yield prisma.categories.findMany({});
            const items = yield prisma.items.findUnique({
                where: {
                    id: Number(id),
                }
            });
            if (items != null) {
                yield prisma.item_category.deleteMany({
                    where: {
                        item_id: Number(items.id),
                    }
                });
                yield prisma.items.delete({
                    where: {
                        id: Number(items.id)
                    }
                });
            }
            res.redirect('/');
        });
    }
    //Изменение объекта
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const {id} = req.params
            const { id, title, image, description, OS, DirectX, platform, developer, release, CPU, RAM, video_card, disc_space } = req.body;
            yield prisma.items.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title: title,
                    image: image,
                    description: description,
                    OS: String(OS),
                    DirectX: String(DirectX),
                    CPU: String(CPU),
                    RAM: String(RAM),
                    video_card: String(video_card),
                    disc_space: String(disc_space),
                    release: String(release),
                    developer: String(developer),
                    platform: String(platform)
                }
            });
            res.redirect('/');
        });
    }
    //Добавление в изранное
    // async basket(req: Request, res: Response){
    //     const
    // }
    //Поиск обьекта
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const items = yield prisma.items.findMany({
                where: {
                    'title': {
                        contains: title
                    }
                }
            });
            res.render('searchWeb', {
                'items': items,
                auth: req.session.auth,
                admin: req.session.admin,
                name: req.session.name
            });
        });
    }
    searchWeb(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const items = prisma.items.findMany({
                where: {
                    title: {
                        contains: title
                    }
                }
            });
            res.render('search', {
                'items': items,
                auth: req.session.auth,
                admin: req.session.admin,
                name: req.session.name
            });
        });
    }
}
exports.ItemsController = ItemsController;
