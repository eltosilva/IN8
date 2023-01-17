import Scraper from './scraper'

const url = 'file:///home/elto/Documentos/IN8/src/app/proxy/mock.html'

test('Extraindo dados da página com sucesso.', async () => {

	const scraper = new Scraper(url);

	const products = await scraper.scrapingProducts()

	expect(products.length).toBe(3)
})
