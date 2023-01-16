import { Browser, ElementHandle, launch, Page } from 'puppeteer';
import { Product } from './product';

var scraper: Scraper;

export default class Scraper {

  private readonly URL: string = 'https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops';
  

  private constructor(private _products: Array<Product> = new Array<Product>()) {
    console.log(this)

    this.fillArray()
  }

  private async fillArray(): Promise<void> {
    console.log('Preechendo array...')
    const browser: Browser = await launch();
    const page: Page = await browser.newPage();

    await page.goto(this.URL);

    const elementList = await page.$$('.thumbnail .caption');

    elementList.forEach(x =>{
      this.scraping(x)
    })

    console.log('Array preenchido...')
  }

  private async scraping(element: ElementHandle): Promise<void> {
    const title = await element.$eval('.title', node => node.getAttribute('title')) || ''
    const priceStr = await element.$eval('.price', node => node.innerHTML)
    const price = parseFloat(priceStr.substring(1))
    const description = await element.$eval('.description', node => node.innerHTML)

    this._products.push({title, price, description})
  }

  public static getScraper() {
    if (!scraper)
      Scraper.start();

    return scraper;
  }

  public static async start() {
    if(scraper)
      return;
    
    scraper = new Scraper();
  }

  public get products(): Array<Product> {
    return this._products;
  }
}