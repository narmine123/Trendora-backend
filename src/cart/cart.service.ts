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
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['cartItems', 'cartItems.product'],
    });
    return cart;
  }

  async addToCart(addToCartDto: CreateCartDto, user: User) {
    let cart = await this.getUserCartEntity(user.id);

    if (!cart) {
      // Create new cart with proper typing
      const newCart = new Cart();
      newCart.user = { id: user.id } as User;
      newCart.CartItem = []; // Match the entity property name

      cart = await this.cartRepository.save(newCart);
    }

    // Add the cart item using cartItemService
    await this.cartItemService.addCartItem({
      productId: addToCartDto.productId,
      cartId: cart.id,
    });

    // Return the updated cart with cart items and their products
    return await this.getUserCartEntity(user.id);
  }

  async removeFromCart(removeCartDto: RemoveFromCartDTO, user: User) {
    const { productId } = removeCartDto;

    // Find the user's cart
    const cart = await this.getUserCartEntity(user.id);
    if (!cart) {
      throw new NotFoundException('Cart not found for this user.');
    }
    // Forward the cartId and productId to cartItemService
    return this.cartItemService.removeCartItem({
      cartId: cart.id,
      productId,
    });
  }

  async updateCart(updateCartDto: UpdateCartDto, user: User) {
    const { productId, quantity } = updateCartDto;

    // Find the cart associated with the user
    const cart = await this.getUserCartEntity(user.id);
    if (!cart) {
      throw new NotFoundException('Cart not found for this user.');
    }

    // Call cartItemService to update the quantity of the product
    await this.cartItemService.updateCartItemQuantity({
      cartId: cart.id,
      productId,
      quantity,
    });

    // Return the updated cart with cart items and their products
    return await this.getUserCartEntity(user.id);
  }

  async getUserCart(user: User) {
    // Reuse the helper method to find the cart associated with the user
    const cart = await this.getUserCartEntity(user.id);
    if (!cart) {
      throw new NotFoundException('Cart not found for this user.');
    }
    return cart;
  }

  async cleanCart(userId: number): Promise<void> {
    // Step 1: Find the user's cart
    const cart = await this.getUserCartEntity(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found for this user.');
    }

    // Step 2: Forward the cartId to clean the cart items
    await this.cartItemService.cleanCartItem(cart.id);

    // Step 3: Delete the cart
    await this.cartRepository.delete(cart.id);
  }
}
