import Customer from './domain/customer/entity/customer';
import Address from './domain/customer/value_object/address';
import OrderItem from './domain/checkout/entity/order_item';
import Order from './domain/checkout/entity/order';

let customer = new Customer("123", "Thiago Silva")
const address = new Address("Rua dois", 2, "12345-678", "São Paulo");

customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "1", 2);
const item2 = new OrderItem("2", "Item 2", 15, "2", 1);

const order = new Order("1", "123", [item1, item2]);