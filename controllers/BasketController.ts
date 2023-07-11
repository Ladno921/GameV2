import { Request, Response } from 'express';
import { items, users, PrismaClient } from '@prisma/client';
import { title } from 'process';
import session from 'express-session';
import { type } from 'os';

const prisma: PrismaClient = new PrismaClient();

export class BasketController {
    async addBasket(req:Request, res:Response){
        const { id, name } = req.body;
        
        const user = await prisma.users.findMany({
            where:{
                name: String(req.session.name),
            }
        });

        const item = await prisma.items.findMany({
            where:{
                id:Number(id),
            }
        });

        const user_item = await prisma.user_items.findMany({
            where:{
                user_id:Number(user[0].id),
                item_id:Number(id),
            }
        })

        if(user_item[0] == undefined){
            const user_items = await prisma.user_items.create({
                data:{
                    user_id:Number(user[0].id),
                    item_id:Number(id),
                }
            });
        }
        

        const basket = await prisma.basket.create({
            data:{
                title: item[0].title,
                image: item[0].image,
                description: item[0].description,
                OS: String(item[0].OS),
                DirectX: String(item[0].DirectX),
                CPU: String(item[0].CPU),
                RAM: String(item[0].RAM),
                video_card: String(item[0].video_card),
                disc_space: String(item[0].disc_space),
                release: String(item[0].release),
                developer: String(item[0].developer),
                platform: String(item[0].platform),
            }
        });
        res.redirect("/");
    }

    async deleteBasket(req:Request, res:Response){
        const { id } = req.body;
        const items = await prisma.items.findUnique({
            where: {
                id: Number(id),
            }
        });
        
        if(items != null){
            const user_item = await prisma.user_items.deleteMany({
                where:{
                    item_id:Number(id),
                }
            })
        }
        res.redirect("/");
    }

    async showBasket(req:Request, res:Response){
        const user = await prisma.users.findMany({
            where:{
                name:req.session.name,
            },
            select:{
                items:{
                    select:{
                        item:{
                            select:{
                                id:true,
                            }
                        }
                    }
                }
            }
        });

        let arr = [];
        for (let i = 0; i < user[0].items.length; i++) {
            arr.push(user[0].items[i].item.id)
        }

        const items = await prisma.items.findMany({
            where: {
                id: {
                    in: arr,
                },
            }
        });

        console.log(items)

        res.render("basket",{
            'items': items,
            auth: req.session.auth,
            admin: req.session.admin,
            name: req.session.name
        })
    }
}