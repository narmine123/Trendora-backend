import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './createOrder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  //private orders: any[] = []; // Simule une base de données
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // const order = {
    //   id: this.orders.length + 1,
    //   ...createOrderDto,
    //   createdAt: new Date(),
    // };
    // this.orders.push(order);
    // return order; // Retourne la commande créée
    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  async getOrderById(id: string): Promise<Order> {
    //return this.orders.find((order) => order.id === id);
    return await this.orderRepository.findOne({ where: { id: parseInt(id) } });
  }

  async getAllOrders(): Promise<Order[]> {
    //return this.orders;
    return await this.orderRepository.find();
  }
  /**
   * Checks if a user has purchased a specific product.
   * @param userId - ID of the user
   * @param productId - ID of the product
   * @returns True if the user has purchased the product, false otherwise
   */
  async hasPurchasedProduct(userId: number, productId: number): Promise<boolean> {
    // Simulated logic: Look for an order containing the product and matching the user ID
    // return this.orders.some(
    //   (order) =>
    //     order.userId === userId &&
    //     order.products.some((product: any) => product.id === productId),
    // );
    const orders = await this.orderRepository.find();
    return orders.some((order) =>
      order.products.some((product: any) => product.id === productId),
    );
  }
}
