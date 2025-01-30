import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './createOrder.dto';

@Injectable()
export class OrderService {
  private orders: any[] = []; // Simule une base de données

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = {
      id: this.orders.length + 1,
      ...createOrderDto,
      createdAt: new Date(),
    };
    this.orders.push(order);
    return order; // Retourne la commande créée
  }


  async getOrderById(id: string) {
    return this.orders.find(order => order.id === id);
  }

  async getAllOrders() {
    return this.orders;
  }
}
