import { ProductImage } from './productImage';
export interface ProductDetail{
  id:number;
  categoryId:number;
  categoryName:string;
  description:string;
  productName:string;
  address:string;
  images:ProductImage[];
}
