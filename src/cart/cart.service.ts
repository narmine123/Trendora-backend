import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { RemoveFromCartDTO } from './dto/remove-from-cart.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly cartItemService: CartItemService,
  ) {}

  private async getUserCartEntity(userId: number): Promise<Cart> {
    return await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['cartItems', 'cartItems.product'],
    });
  }

  async addToCart(addToCartDto: CreateCartDto, user: User) {
    let cart = await this.getUserCartEntity(user.id);

    if (!cart) {
      const newCart = new Cart();
      newCart.user = { id: user.id } as User;
      newCart.cartItems = [];
      cart = await this.cartRepository.save(newCart);
    }

    await this.cartItemService.addCartItem({
      productId: addToCartDto.productId,
      cartId: cart.id,
    });

    return await this.getPopulatedCart(user);
  }

  async removeFromCart(removeCartDto: RemoveFromCartDTO, user: User) {
    const { productId } = removeCartDto;

    const cart = await this.getUserCartEntity(user.id);
    if (!cart) {
      throw new NotFoundException('Cart not found for this user.');
    }

    await this.cartItemService.removeCartItem({
      cartId: cart.id,
      productId,
    });

    return await this.getPopulatedCart(user);
  }

  async updateCart(updateCartDto: UpdateCartDto, user: User) {
    const { productId, quantity } = updateCartDto;

    const cart = await this.getUserCartEntity(user.id);
    if (!cart) {
      throw new NotFoundException('Cart not found for this user.');
    }

    await this.cartItemService.updateCartItemQuantity({
      cartId: cart.id,
      productId,
      quantity,
    });

    return await this.getPopulatedCart(user);
  }

  async getUserCart(user: User) {
    return await this.getPopulatedCart(user);
  }

  private async getPopulatedCart(user: User) {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: user.id } },
      relations: ['cartItems', 'cartItems.product'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found for this user.');
    }

    const totalPrice = cart.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    return {
      ...cart,
      totalPrice,
    };
  }

  async cleanCart(userId: number): Promise<void> {
    const cart = await this.getUserCartEntity(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found for this user.');
    }

    await this.cartItemService.cleanCartItem(cart.id);
    await this.cartRepository.delete(cart.id);
  }
}
