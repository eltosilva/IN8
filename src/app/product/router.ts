import Strorage from '@app/data/storage';
import { Product } from '@app/product/product';
import { Request, Response, Router } from 'express';
import ProductService from './product-service';

const router = Router()

const produtctService: ProductService = new ProductService(new Strorage());

router.get('/:brand', (request: Request, response: Response) => {

  const products: Array<Product> = produtctService.getProductsByBrand(request.params?.brand);

  response.send(products)
})

export default router;