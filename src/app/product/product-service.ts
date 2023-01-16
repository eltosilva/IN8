import { Product } from 'app/proxy/product';
import Scraper from 'app/proxy/scraper';

export default class ProductService{

  constructor(private scraper: Scraper = Scraper.getScraper()){}

  public getProductsByBrand(brand: string): Array<Product> {
    const regex: RegExp = new RegExp(brand.toLowerCase());

    const products =  this.scraper.products
      .filter(product => regex.test(product.title.toLowerCase()))
      .sort((productA, productB) => productA.price - productB.price);

    return products
  }
}