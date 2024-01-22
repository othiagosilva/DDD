import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order-model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItem from "../../domain/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
  async create (entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          order_id: entity.id,
          product_id: item.productId,
        }))
      },
      {
        include: [{ model: OrderItemModel }],
      }
    )

  }
  async update (entity: Order): Promise<void> {
    await OrderModel.sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: t
      })
      await OrderItemModel.bulkCreate(
        entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          order_id: entity.id,
          product_id: item.productId,
        })),
        { transaction: t }
      )
      await OrderModel.update(
        {
          total: entity.total(),
        },
        {
          where: {
            id: entity.id
          },
          transaction: t,
        },
      )
    })
  }
  async findById (id: string): Promise<Order> {
    let orderModel
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true
      })
    } catch (error) {
      throw new Error("Order not found")
    }

    const order = new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((item) =>  {
        let orderItem = new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        );
        return orderItem;
      })
    );
    
    return order
  }
  async findAll (): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: [{model: OrderItemModel}] })
    const orders = orderModels.map((orderModel) => {
      const order = new Order(
        orderModel.id,
        orderModel.customer_id,
        orderModel.items.map((item) => {
          let orderItem = new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          );
          return orderItem;
        })
      );
      return order;
    });
    return orders
  }
}