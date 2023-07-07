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
exports.AdminController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AdminController {
    //Управление пользователями
    user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.users.findMany({});
            res.render('users', {
                'users': users,
                auth: req.session.auth,
                admin: req.session.admin,
                name: req.session.name
            });
        });
    }
    deletUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield prisma.users.delete({
                where: {
                    id: Number(id)
                }
            });
            res.redirect('/users');
        });
    }
    // Создание админки
    storeAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password, email } = req.body;
            const users = yield prisma.users.create({
                data: {
                    name: name,
                    password: password,
                    email: email,
                    type: "A"
                }
            });
            req.session.name = name;
            req.session.password = password;
            req.session.email = email;
            res.redirect("/create-admin");
        });
    }
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.users.findMany({});
            res.render("create-admin", {
                auth: req.session.auth,
                admin: req.session.admin,
                name: req.session.name,
                password: req.session.password,
                email: req.session.email,
                'users': users
            });
        });
    }
}
exports.AdminController = AdminController;
