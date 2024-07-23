import { connectDB } from "../config/index.js";
import { PERSISTENCE } from "../config.js";

export let ProductsDao;
export let CartsDao;
export let UsersDao;

switch (PERSISTENCE) {

    case "MEMORY":
        // Implementar DAOs en memoria.
        break;

    case "FS":
        // Importar DAOs para persistencia en sistema de archivos (FS)
        const { default: ProductDaoFS } = await import('./FS/productsManager.js')
        ProductsDao = ProductDaoFS
        break;

    default:
        // MONGO
        connectDB();

        // Importar DAOs para persistencia en MongoDB
        const { default: ProductDaoMongo } = await import("./MONGO/productDao.mongo.js")
        const { default: CartDaoMongo } = await import("./MONGO/cartsDao.mongo.js")
        const { default: UsersDaoMongo } = await import("./MONGO/usersDao.mongo.js")

        ProductsDao = ProductDaoMongo
        CartsDao = CartDaoMongo
        UsersDao = UsersDaoMongo 
        break;
};