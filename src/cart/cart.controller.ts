import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { RemoveFromCartDTO } from './dto/remove-from-cart.dto';
import { AuthGuard } from '@nestjs/passport';

import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUserCart(@CurrentUser() user: User) {
    return await this.cartService.getUserCart(user);
  }

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  async addToCart(
    @Body() createCartItemDto: CreateCartDto,
    @CurrentUser() user: User,
  ) {
    return this.cartService.addToCart(createCartItemDto, user);
  }

  @Delete('remove')
  @UseGuards(AuthGuard('jwt'))
  async removeFromCart(
    @Body() removeCartDto: RemoveFromCartDTO,
    @CurrentUser() user: User,
  ) {
    return this.cartService.removeFromCart(removeCartDto, user);
  }

  @Patch('update')
  @UseGuards(AuthGuard('jwt'))
  async updateItemQuantityFromCart(
    @Body() updateCartDto: UpdateCartDto,
    @CurrentUser() user: User,
  ) {
    return this.cartService.updateCart(updateCartDto, user);
  }

  @Delete('clear')
  @UseGuards(AuthGuard('jwt'))
  async clearCart(@CurrentUser() user: User) {
    await this.cartService.clearCart(user.id);
    return { message: 'Cart cleared successfully' };
  }

  
}
