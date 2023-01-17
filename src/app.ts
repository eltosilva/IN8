import Strorage from '@app/data/storage';
import Scraper from 'app/proxy/scraper';
import bodyParser from 'body-parser';
import express from 'express';
import { Server } from 'http';
import router from './routes';

export class SetupApplication {

  private server?: Server;

  constructor(private port = 3000, public app = express()) { }

  public init(): void {
    this.setupExpress();
    this.setupRoutes();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
  }

  private setupRoutes(): void {
    this.app.use(router);
  }

  public async start(): Promise<void> {
    const url:string = 'https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops';

    const storage = new Strorage();
    const scraper = new Scraper(url);

    const products = await scraper.scrapingProducts();
    storage.push(...products);

    this.server = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}