import { OrderState } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateOrder {
  @IsNotEmpty()
  @IsEnum(OrderState)
  state: OrderState;
}
