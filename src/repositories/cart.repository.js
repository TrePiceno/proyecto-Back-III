import cartDao from "../dao/cart.dao.js";
import CartDTO from "../dao/dto/cart.dto.js";
import productDao from "../dao/product.dao.js";

export default class cartRepository {

    constructor() {
        this.dao = new cartDao();
        this.productDao = new productDao();
    }

    createCart = async (cart) => {
        const createdCart = new CartDTO(cart)
        const newCart = await this.dao.createCart(createdCart);
        return newCart;
    }

    getCarts = async () => {
        let result = await this.dao.getCarts();
        return result;
    }

    getCartById = async (id) => {
        return await this.dao.getCartById(id);
    }

    deleteCart = async (id) => {
        return await this.dao.deleteCart(id);
    }

    addProductToCart = async (cid, pid, quantity) => {
        try {
            const product = await this.productDao.getProductById(pid);

            if (!product) {
                throw new Error("Producto no encontrado");
            }

            if (product.stock < quantity) {
                throw new Error("Sin stock");
            }

            return await this.dao.addProductToCart(cid, pid, quantity);

        } catch (error) {
            throw error;
        }
    }

    deleteProductFromCart = async (cid, pid, quantity) => {
        try {
            return await this.dao.deleteProductFromCart(cid, pid, quantity);

        } catch (error) {
            throw error;
        }
    }
}