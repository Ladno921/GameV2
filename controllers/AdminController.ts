import { Request, Response } from 'express';
import { items, users, PrismaClient } from '@prisma/client';
import { title } from 'process';
import session from 'express-session';
import { type } from 'os';

const prisma: PrismaClient = new PrismaClient();

export class AdminController {

    //Управление пользователями
    async user(req: Request, res: Response) {
        const users = await prisma.users.findMany({});

        res.render('users', {
            'users': users,
            auth: req.session.auth,
            admin: req.session.admin,
            name: req.session.name
        });
    }
    async deletUser(req: Request, res: Response) {
        const { id } = req.params;
        await prisma.users.delete({
            where: {
                id: Number(id)
            }
        });
        res.redirect('/users')
    }

    // Создание админки
    async storeAdmin(req: Request, res: Response) {
        const { name, password, email } = req.body;
        const users = await prisma.users.create({
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
        res.redirect("/create-admin")
    }

    async createAdmin(req: Request, res: Response) {

        const users = await prisma.users.findMany({});
        res.render("create-admin", {
            auth: req.session.auth,
            admin: req.session.admin,
            name: req.session.name,
            password: req.session.password,
            email: req.session.email,
            'users': users
        });
    }

}