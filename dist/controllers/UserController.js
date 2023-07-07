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
exports.UserController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// const session = require('express-session')
class UserController {
    // ЛИЧНЫЙ АККАУНТ
    personal__account(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // req.session.alert = false;
            const users = yield prisma.users.findMany({});
            res.render("personal-account", {
                auth: req.session.auth,
                admin: req.session.admin,
                name: req.session.name,
                password: req.session.password,
                email: req.session.email,
                'users': users
            });
        });
    }
    change_password(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { current_password, new_password } = req.body;
            const users = yield prisma.users.findMany({
                where: {
                    name: String(req.session.name),
                    password: current_password,
                }
            });
            if (users.length > 0) {
                const userId = users[0].id;
                yield prisma.users.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        password: new_password,
                    }
                });
                req.session.name;
                req.session.email;
                req.session.auth;
                req.session.admin;
                res.redirect("/personal-account");
            }
            else {
                req.session.name;
                req.session.email;
                req.session.auth;
                req.session.admin;
                res.redirect("/personal-account");
            }
        });
    }
    change_name(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { current_password, new_name } = req.body;
            const users = yield prisma.users.findMany({
                where: {
                    name: String(req.session.name),
                    password: current_password,
                }
            });
            if (users.length > 0) {
                // console.log('success-1')
                const user_id = users[0].id;
                req.session.name = new_name;
                yield prisma.users.update({
                    where: {
                        id: user_id,
                    },
                    data: {
                        name: new_name,
                    }
                });
                res.redirect("/personal-account");
                req.session.admin;
                req.session.auth;
                req.session.name;
                req.session.password;
            }
            else {
                res.redirect("/personal-account");
                req.session.admin;
                req.session.auth;
                req.session.name;
                req.session.password;
            }
        });
    }
}
exports.UserController = UserController;
