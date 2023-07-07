import express, { Express, Request, Response } from 'express';
import path from 'path';
import multer from 'multer';
import session from 'express-session';
import { items, users, PrismaClient, categories } from '@prisma/client';
import { idText } from 'typescript';

import { CategoriesController } from './controllers/CategoriesController';
import { ItemsController } from './controllers/ItemsController';
import { CommentsController } from './controllers/CommentsController';
import { AuthController } from './controllers/AuthController';
import { AdminController } from './controllers/AdminController';
import { UserController } from './controllers/UserController';
import { BasketController } from './controllers/BasketController';

const app: Express = express();
const itemsController = new ItemsController();
const commentsController = new CommentsController();
const authController = new AuthController();
const adminController = new AdminController();
const userController = new UserController();
const categoriesController = new CategoriesController();
const basketController = new BasketController();

const prisma: PrismaClient = new PrismaClient();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

declare module "express-session" {
  interface SessionData {
    length: Number,
    count: Number,
    auth: boolean,
    name: string,
    password: string,
    categ_id: Number,
    email: string,
    admin: boolean,
    search: boolean,
    cat_id: Number,
  }
};

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/img/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// let upload = multer({ storage: storage });


app.use(session({ secret: "Secret", resave: false, saveUninitialized: true }));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// items{
// app.post("/store", upload.single('file'), (req: Request, res: Response, next) => {
//   itemsController.store(req, res);
// });

app.get("/", (req: Request, res: Response) => {
  itemsController.Home(req, res);
});

app.get("/items", (req: Request, res: Response) => {
  itemsController.index(req, res);
});

app.get("/items/:id/show", (req: Request, res: Response) => {
  itemsController.show(req, res);
});

/////

app.post("/items/store", (req: Request, res: Response) => {
  itemsController.store(req, res);
});

app.get("/items/create", (req: Request, res: Response) => {
  itemsController.create(req, res);
});

app.post("/items/delete", (req: Request, res: Response) => {
  itemsController.delete(req, res);
});

app.post("/items/update", (req: Request, res: Response) => {
  itemsController.update(req, res);
});

/////

app.get("/basket", (req: Request, res: Response) => {
  basketController.showBasket(req, res);
});

app.post("/items/addToBasket", (req: Request, res: Response) => {
  basketController.addBasket(req, res)
});

app.post("/items/deleteFromBasket", (req: Request, res: Response) => {
  basketController.deleteBasket(req, res)
})

/////

app.post("/items/postComment", (req: Request, res: Response) => {
  commentsController.postComment(req, res);
});

app.post("/items/deleteComment", (req: Request, res: Response) => {
  commentsController.deleteComment(req, res);
});

/////

app.get("/search", (req: Request, res: Response) => {
  itemsController.searchWeb(req, res);
});

app.post("/search", (req: Request, res: Response) => {
  itemsController.search(req, res);
});

/////

app.get("/users", (req: Request, res: Response) => {
  adminController.user(req, res);
});
app.get("/users/:id/delete", (req: Request, res: Response) => {
  adminController.deletUser(req, res);
});
app.get("/create-admin", (req: Request, res: Response) => {
  adminController.createAdmin(req, res);
});
app.post("/create-admin", (req: Request, res: Response) => {
  adminController.storeAdmin(req, res);
});

/////

app.get("/personal-account", (req: Request, res: Response) => {
  userController.personal__account(req, res);
});

app.post("/change-password", (req: Request, res: Response) => {
  userController.change_password(req, res);
});

app.post("/change-name", (req: Request, res: Response) => {
  userController.change_name(req, res);
});

app.get("/change-name", (req: Request, res: Response) => {
  userController.change_name(req, res);
});

/////

app.post("/category/create", (req: Request, res: Response) => {
  categoriesController.storeCategory(req, res);
});

app.get("/category/store", (req: Request, res: Response) => {
  categoriesController.createCategory(req, res);
});

app.get("/categories/:id", (req: Request, res: Response) => {
  categoriesController.categories(req, res);
}); 

/////

app.get("/auth", (req: Request, res: Response) => {
  authController.auth(req, res);
});

app.post("/login", (req: Request, res: Response) => {
  authController.login(req, res);
});

app.get("/logout", (req: Request, res: Response) => {
  authController.loGout(req, res);
});

app.get("/registration", (req: Request, res: Response) => {
  authController.registration(req, res);
});

app.post("/registration", (req: Request, res: Response) => {
  authController.register(req, res);
});