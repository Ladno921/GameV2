import { Request, Response } from 'express';
import { items, users, PrismaClient } from '@prisma/client';
import { title } from 'process';
import session from 'express-session';
import { type } from 'os';

const prisma: PrismaClient = new PrismaClient();

export class AuthController {
    //REGISTER
    async register(req: Request, res: Response) {
        const { name, password, email, type } = req.body;
        // const hashed = await hash('123456', 10);
        const users = await prisma.users.findMany({
            where: {
                name: name
            }
        });
        if (users.length > 0) {
            req.session.admin = false;
            req.session.auth = false;
            res.redirect('/registration')
        } else if (users.length == 0) {
            await prisma.users.create({
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
            res.redirect('/')
        }
    }


    registration(req: Request, res: Response) {
        res.render('registration', {
            auth: req.session.auth,
            admin: req.session.admin,
            email: req.session.email,
            name: req.session.name,
            password: req.session.password
        });
    }


    // LOGIN
    async login(req: Request, res: Response) {
        const { name, password, email } = req.body;
        const users = await prisma.users.findMany({
            where: {
                name:name,
                email:email,
                password:password
            }
        });
    
        if(users.length == 0){
            req.session.admin = false;
            req.session.auth = false;
            req.session.name
            res.redirect('/registration')
        }

        req.session.admin = false;

        const typeUser = await prisma.users.findMany({
            where:{
                name:name,
                email:email,
                password:password,
                type:"A"
            }
        })
        
        req.session.password = password;
        req.session.name = name;
        req.session.email = email;
        if(typeUser.length > 0){
            req.session.admin = true;
            req.session.auth = true;
            req.session.email;
            req.session.password;
            req.session.name;
        }

        if(users.length > 0){
            req.session.auth = true;
            req.session.password;
            req.session.name;
            req.session.email;
            res.redirect("/")
        }


    }

    loGout(req: Request, res: Response) {
        req.session.auth = false;
        req.session.admin = false;
        res.render('auth',
            {
                auth: req.session.auth,
                admin: req.session.admin
            });

    }

    auth(req: Request, res: Response) {
        res.render('auth',
            {
                auth: req.session.auth,
                admin: req.session.admin,
                password:req.session.password,
                email: req.session.email
            });
    }
}