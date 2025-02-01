import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './createOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    console.log('Received order:', createOrderDto);
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return await this.orderService.getOrderById(id);
  }
  
}
