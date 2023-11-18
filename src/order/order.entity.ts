import { OrderState } from '@prisma/client';

export class Order {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  state: OrderState;

  consumerId: string;

  restaurantId: string;
}
