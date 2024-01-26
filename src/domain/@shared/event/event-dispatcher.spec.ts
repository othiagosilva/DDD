import Customer from "../../customer/entity/customer";
import CustomerChangeAddressEvent from "../../customer/event/customer-change-adress-event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import EnviaConsoleLog1Handler from "../../customer/event/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../../customer/event/handler/envia-console-log.handler";
import SendEmailEventHandler from "../../product/event/handler/send-email-event.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import Address from "../../customer/value_object/address";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

    it("should register product created event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailEventHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
    
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister product created event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailEventHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailEventHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailEventHandler(); 
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        
        const event = new ProductCreatedEvent({name: "Product 1", price: 10});

        eventDispatcher.notify(event);

        expect(spyEventHandler).toHaveBeenCalled();    
    });

    it ("should notify all customer created event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const firstMessageEventHandler = new EnviaConsoleLog1Handler();
        const secondMessageEventHandler = new EnviaConsoleLog2Handler();

        const spyFirstMessageEventHandler = jest.spyOn(firstMessageEventHandler, "handle");
        const spySecondMessageEventHandler = jest.spyOn(secondMessageEventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", firstMessageEventHandler);
        eventDispatcher.register("CustomerCreatedEvent", secondMessageEventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(firstMessageEventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(secondMessageEventHandler);

        const customer = new Customer("123", "Thiago");
        const event = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(event);

        expect(spyFirstMessageEventHandler).toHaveBeenCalled();
        expect(spySecondMessageEventHandler).toHaveBeenCalled();
    });

    it("should notify customer address changed event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);

        const customer = new Customer("123", "Thiago");
        const address = new Address("Rua 1", 123, "13330-250", "São Paulo");
        customer.changeAddress(address);

        const event = new CustomerChangeAddressEvent({
            id: customer.id,
            name: customer.name,
            address: customer.Address
        });

        eventDispatcher.notify(event);
        expect(spyEventHandler).toHaveBeenCalled();
    });
})