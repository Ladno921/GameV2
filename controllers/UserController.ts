import { Request, Response } from 'express';
import { items, users, PrismaClient, categories } from '@prisma/client';
import { title } from 'process';
import { idText } from 'typescript';

const prisma: PrismaClient = new PrismaClient();
// const session = require('express-session')
export class UserController {
    // ЛИЧНЫЙ АККАУНТ

    async personal__account(req: Request, res: Response) {
        // req.session.alert = false;
        const users = await prisma.users.findMany({})
        res.render("personal-account", {
            auth: req.session.auth,
            admin: req.session.admin,
            name: req.session.name,
            password: req.session.password,
            email: req.session.email,

            'users': users
        });

    }

    async change_password(req: Request, res: Response) {
        const { current_password, new_password } = req.body;
        const users = await prisma.users.findMany({
            where: {
                name: String(req.session.name),
                password: current_password,
            }
        });

        if (users.length > 0) {
            const userId = users[0].id;

            await prisma.users.update({
                where: {
                    id: userId,
                },
                data: {
                    password: new_password,
                }
            })
            req.session.name;
            req.session.email;
            req.session.auth;
            req.session.admin;
            res.redirect("/personal-account");
        }else{
            req.session.name;
            req.session.email;
            req.session.auth;
            req.session.admin;
            res.redirect("/personal-account");
        }

    }
    async change_name(req: Request, res: Response) {
        const { current_password, new_name } = req.body;
        const users = await prisma.users.findMany({
            where:{
                name:   String(req.session.name),
                password:   current_password,
            }
        })

        if(users.length > 0){
            // console.log('success-1')
            const user_id = users[0].id;
            req.session.name = new_name;
            await prisma.users.update({
                where:{
                    id:user_id,
                },
                data:{
                    name:new_name,
                }
            })
            res.redirect("/personal-account")
            req.session.admin;
            req.session.auth;
            req.session.name
            req.session.password;
        }else{
            res.redirect("/personal-account")
            req.session.admin;
            req.session.auth;
            req.session.name
            req.session.password;
        }
    }


}