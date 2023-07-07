import { Request, Response } from 'express';
import { items, users, comments, PrismaClient } from '@prisma/client';
import { title } from 'process';
import session from 'express-session';
import { type } from 'os';

const prisma: PrismaClient = new PrismaClient();

function stringData(data: string | String | number | Number) {
    let date = new Date(Number(data));
    function addZero(number: number, col: number) {
        if (Number(col) - Number(String(number).length) >= 0) {
            return "0".repeat(Number(col) - Number(String(number).length)) + number;
        }
        else {
            return number;
        }
    }
    return String(
        `${date.getFullYear()}.${addZero(Number(date.getMonth() + 1), 2)}.${addZero(date.getDate(), 2)} ${addZero(date.getHours(), 2)}:${addZero(date.getMinutes(), 2)}`
    );
}

export class CommentsController {
    
    async postComment(req: Request, res: Response){
        const { id, text, name } = req.body;
        let date = new Date();
        let realDate = stringData(date.getTime());
        await prisma.comments.create({
            data:{
                item_id: Number(id),
                date: realDate,
                text: text,
                name: name
            }
        });
        res.redirect('/items');
    }

    async deleteComment(req: Request, res: Response){
        const { id, name } = req.body;
        const comments = await prisma.comments.findMany({});
        console.log(id);
        if(req.session.name = name || req.session.admin == true){
            await prisma.comments.delete({
                where:{
                    id: Number(id)
                }
            });
            res.redirect('/items');
        }else{
            res.redirect('/items');
        }

        
    }

    // async editComment(req: Request, res: Response){
    //     const { id, text, name } = req.body;
    //     let date = new Date();
    //     let realDate = stringData(date.getTime());
    //     await prisma.comments.update({
    //         where:{
    //             id:Number(id)
    //         },data:{
    //             item_id: Number(id),
    //             date: realDate,
    //             text: text,
    //             name: name
    //         }
    //     });
    //     res.redirect('/items');
    // }
}