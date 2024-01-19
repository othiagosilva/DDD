import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
    
    it("should change the prices of all prodcuts", () => {

        const products = [
            new Product("p1", "Product 1", 10),
            new Product("p2", "Product 2", 20),
            new Product("p3", "Product 3", 30),
        ];

        ProductService.increasePrice(products, 100);

        expect(products[0].price).toBe(20);
        expect(products[1].price).toBe(40);
        expect(products[2].price).toBe(60);
    })
})