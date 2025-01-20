import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './createOrder.dto';

@Injectable()
export class OrderService {
  private orders: any[] = []; // Simule une base de données

  createOrder(createOrderDto: CreateOrderDto) {
    const order = {
      id: this.orders.length + 1,
      ...createOrderDto,
      createdAt: new Date(),
    };
    this.orders.push(order);
    return order; // Retourne la commande créée
  }

  getOrders() {
    return this.orders; // Retourne toutes les commandes
  }
  /**
   * Checks if a user has purchased a specific product.
   * @param userId - ID of the user
   * @param productId - ID of the product
   * @returns True if the user has purchased the product, false otherwise
   */
  hasPurchasedProduct(userId: number, productId: number): boolean {
    // Simulated logic: Look for an order containing the product and matching the user ID
    return this.orders.some(
      (order) =>
        order.userId === userId &&
        order.products.some((product: any) => product.id === productId)
    );
  }
}
