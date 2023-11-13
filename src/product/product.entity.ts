import { ProductCategory } from '@prisma/client';

export class Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;

  restaurantId: string;

  isDiscount: boolean;
  discountPrice?: number;
  discountTime?: Date;
  discountText?: string;
}
