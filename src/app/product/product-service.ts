import { Product } from './product';
import Strorage from '@app/data/storage';

export default class ProductService{

  constructor(private readonly storage: Strorage){}

  public getProductsByBrand(brand: string): Array<Product>
  {
    const products =  this.storage.selectAll(brand).sort((productA, productB) => productA.price - productB.price);

    return products
  }
}