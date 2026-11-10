import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { ProductRepository } from '../../../domain/repositories/productRepository';
import { DynamoProductRepository } from '../../../infrastructure/repositories/dynamoProductRepository';

const router = Router();

const repository: ProductRepository = new DynamoProductRepository();
const productController = new ProductController(repository);

router.post('/', (req, res, next) => productController.createProduct(req, res, next));

router.get('/', (req, res, next) => productController.listProducts(req, res, next));

router.get('/:id', (req, res, next) => productController.getProductById(req, res, next));

router.put('/:id', (req, res, next) => productController.updateProduct(req, res, next));

router.delete('/:id', (req, res, next) => productController.deleteProduct(req, res, next));

export default router;