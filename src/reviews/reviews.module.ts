import { Module } from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { ReviewsController } from './reviews/reviews.controller';

@Module({
  providers: [ReviewService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
