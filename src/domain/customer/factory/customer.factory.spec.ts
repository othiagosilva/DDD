import Address from "../value_object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory Unit Test", () => {
   
    it("should create a customer", () => {
        const customer = CustomerFactory.create("Customer 1");
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer 1");
        expect(customer.address).toBeUndefined();
    });

    it("should create a customer with an address", () => {
        const address = new Address("Street 1", 123, "13330-250", "São Paulo");
        const customer = CustomerFactory.createWithAddress("Customer 1", address);
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer 1");
        expect(customer.address).toBe(address);
        expect(customer.address).toEqual(address);
    });

});