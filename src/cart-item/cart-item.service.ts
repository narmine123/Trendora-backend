import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/product.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { RemoveCartItemDto } from './dto/remove-cart-item.dto';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  async addCartItem(createCartItemDto: CreateCartItemDto) {
    const product = await this.productRepository.findOne({
      where: { id: createCartItemDto.productId },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    let cartItem = await this.cartItemRepository.findOne({
      where: {
        cart: { id: createCartItemDto.cartId },
        product: { id: createCartItemDto.productId },
      },
      relations: ['product'],
    });

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      const cart = await this.cartRepository.findOne({
        where: { id: createCartItemDto.cartId },
      });

      if (!cart) {
        throw new BadRequestException('Cart not found');
      }

      cartItem = this.cartItemRepository.create({
        cart,
        product,
        quantity: 1,
      });
    }

    const savedItem = await this.cartItemRepository.save(cartItem);
    return {
      ...savedItem,
      product, // Include the product details
    };
  }

  async removeCartItem(removeCartItemDto: RemoveCartItemDto) {
    const { cartId, productId } = removeCartItemDto;

    const cartItem = await this.cartItemRepository.findOne({
      where: {
        cart: { id: cartId },
        product: { id: productId },
      },
      relations: ['product'],
    });

    if (!cartItem) {
      throw new BadRequestException('Cart item not found');
    }

    await this.cartItemRepository.remove(cartItem);

    const remainingItems = await this.cartItemRepository.find({
      where: { cart: { id: cartId } },
      relations: ['product'],
    });

    // if (remainingItems.length === 0) {
    //   await this.cartRepository.delete(cartId);
    //   return {
    //     message: 'Cart item removed, and cart deleted because it is now empty',
    //   };
    // }

    return {
      message: 'Cart item removed successfully',
      remainingItems,
    };
  }

  async updateCartItemQuantity(updateCartItemDto: UpdateCartItemDto) {
    const { cartId, productId, quantity } = updateCartItemDto;

    const cartItem = await this.cartItemRepository.findOne({
      where: {
        cart: { id: cartId },
        product: { id: productId },
      },
      relations: ['product'],
    });

    if (!cartItem) {
      throw new NotFoundException('Product not found in the cart.');
    }

    cartItem.quantity = quantity;
    const updatedItem = await this.cartItemRepository.save(cartItem);

    return {
      ...updatedItem,
      product: cartItem.product, // Include product details
    };
  }

  async cleanCartItem(cartId: number): Promise<void> {
    await this.cartItemRepository.delete({ cart: { id: cartId } });
  }
}
