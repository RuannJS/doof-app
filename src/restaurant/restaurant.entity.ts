import { Product } from 'src/product/product.entity';

export class Restaurant {
  id: string;
  name: string;
  address: string;
  imageUrl: string;

  weekOpeningTime: Date;
  weekClosingTime: Date;

  weekendOpeningTime: Date;
  weekendClosingTime: Date;

  ownerId: string;
}
