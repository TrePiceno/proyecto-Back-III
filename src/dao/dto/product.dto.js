export default class productDTO {
    constructor(product) {

        this.title = product.title;

        this.description = product.description;

        this.category = product.category;

        this.imageUrl = product.imageUrl;

        this.price = product.price;
        
        this.stock = product.stock;
    }
}