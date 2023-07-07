"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const client_1 = require("@prisma/client");
const CategoriesController_1 = require("./controllers/CategoriesController");
const ItemsController_1 = require("./controllers/ItemsController");
const CommentsController_1 = require("./controllers/CommentsController");
const AuthController_1 = require("./controllers/AuthController");
const AdminController_1 = require("./controllers/AdminController");
const UserController_1 = require("./controllers/UserController");
const BasketController_1 = require("./controllers/BasketController");
const app = (0, express_1.default)();
const itemsController = new ItemsController_1.ItemsController();
const commentsController = new CommentsController_1.CommentsController();
const authController = new AuthController_1.AuthController();
const adminController = new AdminController_1.AdminController();
const userController = new UserController_1.UserController();
const categoriesController = new CategoriesController_1.CategoriesController();
const basketController = new BasketController_1.BasketController();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
;
// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/img/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// let upload = multer({ storage: storage });
app.use((0, express_session_1.default)({ secret: "Secret", resave: false, saveUninitialized: true }));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// items{
// app.post("/store", upload.single('file'), (req: Request, res: Response, next) => {
//   itemsController.store(req, res);
// });
app.get("/", (req, res) => {
    itemsController.Home(req, res);
});
app.get("/items", (req, res) => {
    itemsController.index(req, res);
});
app.get("/items/:id/show", (req, res) => {
    itemsController.show(req, res);
});
/////
app.post("/items/store", (req, res) => {
    itemsController.store(req, res);
});
app.get("/items/create", (req, res) => {
    itemsController.create(req, res);
});
app.post("/items/delete", (req, res) => {
    itemsController.delete(req, res);
});
app.post("/items/update", (req, res) => {
    itemsController.update(req, res);
});
/////
app.get("/basket", (req, res) => {
    basketController.showBasket(req, res);
});
app.post("/items/addToBasket", (req, res) => {
    basketController.addBasket(req, res);
});
app.post("/items/deleteFromBasket", (req, res) => {
    basketController.deleteBasket(req, res);
});
/////
app.post("/items/postComment", (req, res) => {
    commentsController.postComment(req, res);
});
app.post("/items/deleteComment", (req, res) => {
    commentsController.deleteComment(req, res);
});
/////
app.get("/search", (req, res) => {
    itemsController.searchWeb(req, res);
});
app.post("/search", (req, res) => {
    itemsController.search(req, res);
});
/////
app.get("/users", (req, res) => {
    adminController.user(req, res);
});
app.get("/users/:id/delete", (req, res) => {
    adminController.deletUser(req, res);
});
app.get("/create-admin", (req, res) => {
    adminController.createAdmin(req, res);
});
app.post("/create-admin", (req, res) => {
    adminController.storeAdmin(req, res);
});
/////
app.get("/personal-account", (req, res) => {
    userController.personal__account(req, res);
});
app.post("/change-password", (req, res) => {
    userController.change_password(req, res);
});
app.post("/change-name", (req, res) => {
    userController.change_name(req, res);
});
app.get("/change-name", (req, res) => {
    userController.change_name(req, res);
});
/////
app.post("/category/create", (req, res) => {
    categoriesController.storeCategory(req, res);
});
app.get("/category/store", (req, res) => {
    categoriesController.createCategory(req, res);
});
app.get("/categories/:id", (req, res) => {
    categoriesController.categories(req, res);
});
/////
app.get("/auth", (req, res) => {
    authController.auth(req, res);
});
app.post("/login", (req, res) => {
    authController.login(req, res);
});
app.get("/logout", (req, res) => {
    authController.loGout(req, res);
});
app.get("/registration", (req, res) => {
    authController.registration(req, res);
});
app.post("/registration", (req, res) => {
    authController.register(req, res);
});
