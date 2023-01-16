import { Product } from 'app/proxy/product';
import { Request, Response, Router } from 'express';
import ProductService from './product-service';

const router = Router()
const produtctService: ProductService = new ProductService();

router.get('/:brand', (request: Request, response: Response) => {

  const products: Array<Product> = produtctService.getProductsByBrand(request.params?.brand);

  response.send(products)
})

export default router;