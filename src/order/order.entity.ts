import { OrderState } from '@prisma/client';
import { Product } from 'src/product/product.entity';

export class Order {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  state: OrderState;

  consumerId: string;

  restaurantId: string;

  products: Product[];
}
