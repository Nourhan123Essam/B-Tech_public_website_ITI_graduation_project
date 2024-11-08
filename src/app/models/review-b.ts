import { ProductB } from './product-b';
import { ApplicationUserB } from './application-user-b';

export interface ReviewB {
  id: number;
  rating?: number;
  comment?: string;
  datePosted: Date;
  productId: number;
  product: ProductB;
  applicationUserId: string;
  applicationUser: ApplicationUserB;
}
