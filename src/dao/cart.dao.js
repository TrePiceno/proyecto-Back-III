import cartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

export default class Cart {

    getCarts = async () => {
        try {
            let allCarts = await cartModel.find().populate("products.product");
            return allCarts;
        }
        catch (error) {
            console.log(error);
            throw error
        }
    }

    getCartById = async (id) => {
        try {
            return await cartModel.findById(id).populate("products.product");
        }
        catch (error) {
            console.log(error);
            throw error
        }
    }

    createCart = async (cart) => {
        try {
            const {products} = cart
            let newCart = await cartModel.create({ products: [] });
            return newCart;
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    deleteCart = async (id) => {
        try {
            let cartDeleted = await cartModel.deleteOne({ _id: id });
            return cartDeleted
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    addProductToCart = async (cid, pid, quantity = 1) => {
        try {
            const product = await ProductModel.findById(pid);
            const cart = await cartModel.findById(cid);

            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            if (!cart.products) {
                cart.products = [];
            }


            const productIndex = cart.products.findIndex(
                (p) => p.product.toString() === pid
            );

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: pid, quantity });
            }

            product.stock -= quantity;
            await product.save();

            return await cart.save();

        } catch (error) {
            console.log(" Error al agregar producto al carrito:", error.message);
            throw error;
        }
    };

    deleteProductFromCart = async (cartId, productId, quantity = 1) => {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            const productIndex = cart.products.findIndex(
                (p) => p.product.toString() === productId
            );

            if (productIndex === -1) {
                throw new Error("Producto no encontrado en el carrito");
            } 
            
            if (cart.products[productIndex].quantity > quantity) {
                cart.products[productIndex].quantity -= quantity;
            } else {
                cart.products.splice(productIndex, 1);
            }

            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            console.log(" Error al eliminar producto del carrito:", error.message);
            throw error;
        }
    };
}
