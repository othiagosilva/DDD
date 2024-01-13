import Address from "../value_object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(()=> {
            let customer = new Customer("", "Thiago");
        }).toThrowError("Id is required")
    });

    it("should throw error when name is empty", () => {
        expect(()=> {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required")
    });

    it("should change name", () => {
        //Arrange
        const customer = new Customer("123", "Thiago");

        //Act
        customer.changeName("Jorge");

        //Assert
        expect(customer.name).toBe("Jorge");
    });

    it("should activate customer", () => {
        //Arrange
        const customer = new Customer("1", "Thiago");
        const address = new Address("Rua 1", 123, "13330-250", "São Paulo");
        customer.Address = address;

        //Act
        customer.activate();

        //Assert
        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        //Arrange
        const customer = new Customer("1", "Thiago");

        //Act
        customer.deactivate();

        //Assert
        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined when you activate a customer", () => {

        expect(()=> {
            const customer = new Customer("1", "Thiago");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });
})