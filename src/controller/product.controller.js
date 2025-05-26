import ProductRepository from "../repositories/product.repository.js";

const productService = new ProductRepository();

export const getProductById = async (req, res) => {
    const { pid } = req.params;
    try {
        let result = await productService.getProductById(pid);

        if (!result) {
            return res.status(404).send({ status: "error", message: "Producto no encontrado" });
        }
        res.send({ status: "success", result });
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }

}

export const getProducts = async (req, res) => {
    try {
        let result = await productService.getProducts();

        if (!result) {
            return res.status(404).send({ status: "error", message: "Productos no encontrados" });
        }

        res.send({ status: "success", result });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;
    try {
        if (product.stock < 0) {
            return res.status(400).send({ error: "El stock no puede ser negativo" });
        }

        let result = await productService.createProduct(product);

        if (!result) {
            return res.status(404).send({ status: "error", message: "Error al crear producto" });
        }

        res.send({ status: "success", result });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }
}

export const updateProduct = async (req, res) => {
    const { pid } = req.params;
    const product = req.body;
    try {
        if (product.stock < 0) {
            return res.status(400).send({ error: "El stock no puede ser negativo" });
        }

        let result = await productService.updateProduct(pid, product);

        if (!result) {
            return res.status(404).send({ status: "error", message: "Error al actualizar producto" });
        }

        res.send({ status: "success", result });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }

}

export const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        let result = await productService.deleteProduct(pid);

        if (!result) {
            return res.status(404).send({ status: "error", message: "Error al eliminar producto" });
        }

        res.send({ status: "success", result });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }

}