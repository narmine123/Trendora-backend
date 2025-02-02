import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express'; // Import Request type from Express

@ApiTags('reviews') // Tag for grouping in Swagger
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('all')
  @UseGuards(AuthGuard('jwt'))

  @ApiOperation({ summary: 'Fetch All Reviews' })
  async findAll() {
    return await this.reviewService.findAll();
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))

  @ApiOperation({ summary: 'Fetch Reviews of Logged-in User' })
  async getReviewsByUserId(@Req() req: Request) {
    const user = req.user as any; // Extract user from the request
    return this.reviewService.findReviewsByUserId(user);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Fetch Reviews of a Particular Product' })
  async findByProductId(@Param('productId') productId: number) {
    return this.reviewService.findReviewsByProductId(productId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))

  @ApiOperation({ summary: 'Give a Review for a Particular Product' })
  async create(@Body() createReviewDto: CreateReviewDto, @Req() req: Request) {
    const user = req.user as any; // Extract user from the request
    return this.reviewService.create(createReviewDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))

  @ApiOperation({ summary: 'Delete an Existing Review' })
  async deleteReview(@Param('id') id: number) {
    return this.reviewService.deleteReview(id);
  }
}
