import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(()=> {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(()=> {
            let order = new Order("123", "", []);
        }).toThrowError("CustomerId is required");
    });

    it("should throw error when item is empty", () => {
        expect(()=> {
            let order = new Order("123", "123", []);
        }).toThrowError("Item quantity must be greater than zero");
    });

    it("should calculate total", () => {
        const item = new OrderItem("i1", "Item 1", 10);
        const item2 = new OrderItem("i2", "Item 2", 20);
        const order = new Order("o1", "c1", [item]);
        
        let total = order.total();
        
        expect(total).toBe(10);
        
        const order2 = new Order("o1", "c1", [item, item2]);

        total = order2.total();
        
        expect(total).toBe(30);

    }); 
})