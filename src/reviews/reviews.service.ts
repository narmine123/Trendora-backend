import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Product } from 'src/product/product.entity';
import { Review } from './review.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createReviewDto: CreateReviewDto, user: User): Promise<Review> {
    const { productId, rating, comment } = createReviewDto;

    // Check if the product exists
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    // Verify if the user has purchased the product
    
    
    const review = this.reviewRepository.create({
      rating,
      comment,
      user: { id: user.id }, // Set user relationship
      product, // Set product relationship
    });

    try {
      return await this.reviewRepository.save(review);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create review');
    }
  }

  async findReviewsByProductId(productId: number): Promise<Review[]> {
    const reviews = await this.reviewRepository.find({
      where: { product: { id: productId } },
      relations: ['user'],
    });

    if (reviews.length === 0) {
      throw new NotFoundException('No reviews found for this product.');
    }

    return reviews;
  }

  async findReviewsByUserId(user: User): Promise<Review[]> {
    const reviews = await this.reviewRepository.find({
      where: { user: { id: user.id } },
      relations: ['product'],
    });

    if (reviews.length === 0) {
      throw new NotFoundException('No reviews found for this user.');
    }

    return reviews;
  }

  async deleteReview(reviewId: number): Promise<{ message: string }> {
    try {
      const result = await this.reviewRepository.delete(reviewId);

      if (result.affected === 0) {
        throw new NotFoundException('Review not found.');
      }

      return { message: 'Review deleted successfully.' };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting review.');
    }
  }

  async findAll(): Promise<Review[]> {
    try {
      const reviews = await this.reviewRepository.find({
        relations: ['user', 'product'],
      });

      if (reviews.length === 0) {
        throw new NotFoundException('No reviews found.');
      }

      return reviews;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch reviews.');
    }
  }
}
