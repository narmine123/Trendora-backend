import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { ReviewService } from './reviews.service';
import { ReviewController } from './reviews.controller';
import { ProductsModule } from '../product/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    ProductsModule,
    // Import OrderModule to use its providers
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService , TypeOrmModule],
})
export class ReviewsModule {}
