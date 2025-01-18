import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends CreateCartDto {

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
