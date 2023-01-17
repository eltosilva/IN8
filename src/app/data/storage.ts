import { Product } from '@app/product/product';

const storage = new Array<Product>();

export default class Strorage{

  push(...products: Array<Product>): void {
    storage.push(...products);
  }

  selectAll(brand: string): Array<Product>{
    const regex = new RegExp(brand.toLowerCase());

    return storage.filter(product => regex.test(product.title.toLowerCase()));
  }
  
  isEmpty(): boolean{
    return !!storage.length;
  }
}