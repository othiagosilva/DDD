import SendEmailEventHandler from "../product/handler/send-email-event.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailEventHandler();

        eventDispatcher.register("SendEmailEvent", eventHandler);
    
        expect(eventDispatcher.getEventHandlers["SendEmailEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["SendEmailEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["SendEmailEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailEventHandler();

        eventDispatcher.register("SendEmailEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["SendEmailEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("SendEmailEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["SendEmailEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["SendEmailEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailEventHandler();

        eventDispatcher.register("SendEmailEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["SendEmailEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["SendEmailEvent"]).toBeUndefined();
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
})