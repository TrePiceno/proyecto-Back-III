import cartRepository from '../repositories/cart.repository.js';

const cartService = new cartRepository();

export const getCarts = async (req, res) => {
    try {
        let result = await cartService.getCarts();

        if (!result) {
            return res.status(404).send({ status: "error", message: "Carritos no encontrados" });
        }
        res.send({ status: "success", result });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }
}

export const getCartById = async (req, res) => {
    const { cid } = req.params;
    console.log(cid);
    let result = await cartService.getCartById(cid);
    if (!result) {
        return res.status(404).send({ status: "error", message: "Carrito no encontrado" });
    }
    res.send({ status: "success", result });
}

export const createCart = async (req, res) => {
    const cart = req.body;
    let result = await cartService.createCart(cart);

    if (!result) {
        return res.status(400).send({ error: "No se pudo crear el carrito" });
    }
    res.send({ status: "success", result });
}

export const deleteCart = async (req, res) => {
    const { cid } = req.params;
    try {
        let result = await cartService.deleteCart(cid);
        res.send({ status: "success", result });
    } catch (error) {
        res.status(400).send({ status: "error", message: "error al eliminar carrito", error });
    }

}

export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        let result = await cartService.addProductToCart(cid, pid, quantity || 1);
        res.send({ status: "success", result });
    } catch (error) {
        console.error(error);
        res.status(400).send({ status: "error", message: error.message });
    }

}

export const deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body || {};
    try {
        let result = await cartService.deleteProductFromCart(cid, pid, quantity || 1);
        res.send({ status: "success", result });
    } catch (error) {
        res.status(400).send({ status: "error", message: error.message });
    }

}
