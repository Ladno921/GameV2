import { Request, Response } from 'express';
import { items, users, PrismaClient, categories } from '@prisma/client';
import { title } from 'process';
import { idText } from 'typescript';

const prisma: PrismaClient = new PrismaClient();
// const session = require('express-session')

export class CategoriesController {
    async categories(req: Request, res: Response) {
        const { id } = req.params;

        req.session.categ_id = Number(req.params.id)

        const item = await prisma.items.findMany({})

        if (item.length > 5) {
            let itemsPerPage = 12;
            let page = Number(req.query.page);
            const count = await prisma.items.count({});
            let pages = Math.ceil((count / itemsPerPage));
            if (!page) page = 1;
            if (page > pages) page = Number(pages);
            const items = await prisma.items.findMany({
                take: itemsPerPage,
                skip: (page - 1) * itemsPerPage,
            });
        }
        let pages = 0;

        const categories = await prisma.categories.findMany({
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
            arr.push(categories[0].item[i].item.id)
        }
        const category = await prisma.categories.findMany({})
        const length = category.length;
        let mass = []
        for(let i = 0; i < length; i++){
            mass.push(i)
        }
        
        const items = await prisma.items.findMany({
            where: {
                id: {
                    in: arr,
                },
                cat_id: {
                    in:mass
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
    }

    //Создание категории
    async storeCategory(req: Request, res: Response) {
        const { title } = req.body;
        const categories = await prisma.categories.findMany({
            where: {
                title: title
            }
        });
        if (categories[0] != undefined) {
            res.redirect('/category/store');
        } else if (categories[0] == '') {
            res.redirect('/category/store');
        } else {
            await prisma.categories.create({
                data: {
                    title: title
                }
            });
            res.redirect('/');
        }

    }
    createCategory(req: Request, res: Response) {
        res.render('category/store', {
            auth: req.session.auth,
            admin: req.session.admin,
            name: req.session.name,
        });
    }


}