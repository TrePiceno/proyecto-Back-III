import Router from '../routes/classRouter/class.router.js';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controller/product.controller.js';

export default class ProductRouter extends Router {
    init() {

        this.get('/', ["user"], getProducts);

        this.get('/:pid', ["user"], getProductById);

        this.post('/', ["admin"], createProduct);

        this.put('/:pid', ["admin"], updateProduct);

        this.delete('/:pid', ["admin"], deleteProduct);
        
    }
}