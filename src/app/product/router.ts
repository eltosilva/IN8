import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (request: Request, response: Response) => {
  response.json({
    id: 'ABC123',
    name: 'Poduct New',
    price: 28.90
  });
})

export default router;