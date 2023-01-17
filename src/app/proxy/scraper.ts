import { Browser, ElementHandle, launch, Page } from 'puppeteer';
import { Product } from '@app/product/product';

export default class Scraper {

  public constructor(private readonly url: string) { }

  public async scrapingProducts(): Promise<Product[]> {
    const browser: Browser = await launch();
    const page: Page = await browser.newPage();

    await page.goto(this.url);

    const elementList =await page.$$('.thumbnail .caption');
    const products = new Array<Product>();

    for(let element of elementList){
      const product = await this.scraping(element);
      products.push(product);
    }

    browser.close();

    return products;
  }
  
  private async scraping(element: ElementHandle): Promise<Product> {
    const title = await element.$eval('.title', node => node.getAttribute('title')) || ''
    const priceStr = await element.$eval('.price', node => node.innerHTML)
    const price = parseFloat(priceStr.substring(1))
    const description = await element.$eval('.description', node => node.innerHTML)

    return {title, price, description};
  }
}