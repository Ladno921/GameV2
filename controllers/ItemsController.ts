import { Request, Response } from 'express';
import { items, users, PrismaClient, categories } from '@prisma/client';
import { title } from 'process';
import { idText } from 'typescript';

const prisma: PrismaClient = new PrismaClient();
// const session = require('express-session')

export class ItemsController {

    async index(req: Request, res: Response) {
        const items = await prisma.items.findMany({})
        req.session.length = items.length;
        if (items.length > 5) {
            let page = Number(req.query.page);
            const count = await prisma.items.count({});
            req.session.count = Math.ceil((count / 12));
            if (!page) page = 1;
            if (page > count) page = Number(count);
            const items = await prisma.items.findMany({
                take: 12,
                skip: (page - 1) * 12
            });

            // const items = await prisma.items.findMany({});
            const categories: categories[] = await prisma.categories.findMany();
            res.render('items', {
                'items': items,
                'length': req.session.length,
                categories: categories,
                number: Number(req.session.count),
                auth: req.session.auth,
                admin: req.session.admin,
                name: req.session.name
            });
        } else {
            const categories: categories[] = await prisma.categories.findMany();
            res.render('items/index', {
                'items': items,
                categories: categories,
                auth: req.session.auth,
                admin: req.session.admin,
                name: req.session.name
            })
        }
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
    async Home(req: Request, res: Response) {
        const item = await prisma.items.findMany({});
        const length = item.length;
        // if(item.length > 5){
        const items: items[] = await prisma.items.findMany({
            take: 4,
            skip: length - 5,
        });
        // }
        // const items = await prisma.items.findMany({})
        const categories = await prisma.categories.findMany({})
        res.render('home', {
            'items': items,
            'categories': categories,
            auth: req.session.auth,
            admin: req.session.admin,
            name: req.session.name,

        });
    }

    //Рендер страницы объекта
    async show(req: Request, res: Response) {
        const { id } = req.params;
        const item_ = await prisma.items.findMany({});
        const length = item_.length;
        const comment_ = await prisma.comments.findMany({});
        const comments_length = comment_.length
        const game = await prisma.items.findUnique({
            where: {
                id: Number(id)
            }
        });
        const comments = await prisma.comments.findMany({
            where: {
                item_id: Number(id)
            }
        });

        if (length > 5) {
            const items: items[] = await prisma.items.findMany({
                take: 4,
                skip: length - 5,
            });
            const categorie = await prisma.categories.findMany({});

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
        } else {
            const items = await prisma.items.findMany({});
            const categorie = await prisma.categories.findMany({});

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
    }

    //Создание объекта
    async store(req: Request, res: Response) {
        const { title, image, description, OS, DirectX, platform, developer, release, CPU, RAM, video_card, disc_space } = req.body;
        const item = await prisma.items.findMany();
        let categories = await prisma.categories.findMany({});

        let one = "";
        for (let i = 0; i < categories.length; i++){
            one = req.body.check
        }
        let arr = [];

        for(let i = 0; i < one.length; i++){
            let categories = await prisma.categories.findMany({
                where:
                {
                    id: Number(one[i])
                }
            })
            arr.push(categories[0].title);
        }
        const items = await prisma.items.create({
            data:{
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

        for(let i = 0; i < one.length;i++){
            let categories = await prisma.categories.findMany({
                where:{
                    id:Number(one[i])
                }
            })
            await prisma.item_category.create({
                data:{
                    item_id:items.id,
                    cat_id:categories[0].id

                }
            })
        }

        res.redirect("/");
    }

    async create(req: Request, res: Response) {
        const categories = await prisma.categories.findMany({});
        const items = await prisma.items.findMany({});

        res.render('items/create', {
            categories: categories,
            auth: req.session.auth,
            admin: req.session.admin,
            categ_id:req.session.categ_id,
            name: req.session.name,
        });
    }

    //Удаление объекта
    async delete(req: Request, res: Response) {
        const { id } = req.body;
        const categories = await prisma.categories.findMany({});
    
        const items = await prisma.items.findUnique({
            where: {
                id: Number(id),
            }
        });
        
        if( items != null){
            await prisma.item_category.deleteMany({
                where: {
                    item_id:Number(items.id),
                }
            });
            await prisma.items.delete({
                where:{
                    id: Number(items.id)
                }
            })
        }
        
        res.redirect('/');
    }

    //Изменение объекта
    async update(req: Request, res: Response) {
        // const {id} = req.params
        const { id, title, image, description, OS, DirectX, platform, developer, release, CPU, RAM, video_card, disc_space } = req.body;
            await prisma.items.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title:title,
                    image:image,
                    description:description,
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
            })
            res.redirect('/');
        }

    //Добавление в изранное
    // async basket(req: Request, res: Response){
    //     const
    // }

    //Поиск обьекта
    async search(req: Request, res: Response) {
        const { title } = req.body;
        const items = await prisma.items.findMany({
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
    }

    async searchWeb(req: Request, res: Response) {
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
    }
}

