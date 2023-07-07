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
exports.AuthController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AuthController {
    //REGISTER
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password, email, type } = req.body;
            // const hashed = await hash('123456', 10);
            const users = yield prisma.users.findMany({
                where: {
                    name: name
                }
            });
            if (users.length > 0) {
                req.session.admin = false;
                req.session.auth = false;
                res.redirect('/registration');
            }
            else if (users.length == 0) {
                yield prisma.users.create({
                    data: {
                        name: name,
                        email: email,
                        password: password,
                        type: "U"
                    }
                });
                req.session.name = name;
                req.session.password = password;
                req.session.email = email;
                req.session.admin = false;
                req.session.auth = true;
                res.redirect('/');
            }
        });
    }
    registration(req, res) {
        res.render('registration', {
            auth: req.session.auth,
            admin: req.session.admin,
            email: req.session.email,
            name: req.session.name,
            password: req.session.password
        });
    }
    // LOGIN
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password, email } = req.body;
            const users = yield prisma.users.findMany({
                where: {
                    name: name,
                    email: email,
                    password: password
                }
            });
            if (users.length == 0) {
                req.session.admin = false;
                req.session.auth = false;
                req.session.name;
                res.redirect('/registration');
            }
            req.session.admin = false;
            const typeUser = yield prisma.users.findMany({
                where: {
                    name: name,
                    email: email,
                    password: password,
                    type: "A"
                }
            });
            req.session.password = password;
            req.session.name = name;
            req.session.email = email;
            if (typeUser.length > 0) {
                req.session.admin = true;
                req.session.auth = true;
                req.session.email;
                req.session.password;
                req.session.name;
            }
            if (users.length > 0) {
                req.session.auth = true;
                req.session.password;
                req.session.name;
                req.session.email;
                res.redirect("/");
            }
        });
    }
    loGout(req, res) {
        req.session.auth = false;
        req.session.admin = false;
        res.render('auth', {
            auth: req.session.auth,
            admin: req.session.admin
        });
    }
    auth(req, res) {
        res.render('auth', {
            auth: req.session.auth,
            admin: req.session.admin,
            password: req.session.password,
            email: req.session.email
        });
    }
}
exports.AuthController = AuthController;
