import { ProductController } from '../src/interfaces/http/controllers/productController';
import { ProductService } from '../src/application/services/productService';
import { Request, Response, NextFunction } from 'express';
import { Product } from '../src/domain/models/product';
import { ValidationError, NotFoundError, DuplicateNameError } from '../src/utils/validation';

jest.mock('../src/application/services/productService');

describe('ProductController', () => {
    let productController: ProductController;
    let mockService: jest.Mocked<ProductService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockService = new ProductService({} as any) as jest.Mocked<ProductService>;
        productController = new ProductController(mockService);
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            sendStatus: jest.fn()
        };
        mockNext = jest.fn();
    });

    describe('createProduct', () => {
        it('should create a product successfully', async () => {
            // Arrange
            const productData = {
                name: 'Laptop',
                price: 999.99,
                stock: 10,
                category: 'Electronics'
            };
            const createdProduct = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            mockRequest.body = productData;
            mockService.createProduct.mockResolvedValue(createdProduct);

            // Act
            await productController.createProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockService.createProduct).toHaveBeenCalledWith(productData);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(createdProduct);
        });

        it('should handle validation errors', async () => {
            // Arrange
            const invalidProductData = {
                name: '',
                price: -10,
                stock: 10,
                category: 'Electronics'
            };
            mockRequest.body = invalidProductData;
            mockService.createProduct.mockRejectedValue(
                new ValidationError('Name is required and price must be positive')
            );

            // Act
            await productController.createProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(expect.any(ValidationError));
        });

        it('should handle duplicate name errors', async () => {
            // Arrange
            const duplicateProductData = {
                name: 'Existing Product',
                price: 50,
                stock: 5,
                category: 'Electronics'
            };
            mockRequest.body = duplicateProductData;
            mockService.createProduct.mockRejectedValue(
                new DuplicateNameError('Product name already exists')
            );

            // Act
            await productController.createProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(expect.any(DuplicateNameError));
        });
    });

    describe('getProductById', () => {
        it('should return a product when found', async () => {
            // Arrange
            const product = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            mockRequest.params = { id: '1' };
            mockService.getProductById.mockResolvedValue(product);

            // Act
            await productController.getProductById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockService.getProductById).toHaveBeenCalledWith('1');
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(product);
        });

        it('should handle not found errors', async () => {
            // Arrange
            mockRequest.params = { id: '999' };
            mockService.getProductById.mockRejectedValue(
                new NotFoundError('Product not found')
            );

            // Act
            await productController.getProductById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundError));
        });
    });

    describe('updateProduct', () => {
        it('should update a product successfully', async () => {
            // Arrange
            const updateData = { price: 899.99 };
            const updatedProduct = new Product('1', 'Laptop', 899.99, 10, 'Electronics');
            mockRequest.params = { id: '1' };
            mockRequest.body = updateData;
            mockService.updateProduct.mockResolvedValue(updatedProduct);

            // Act
            await productController.updateProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockService.updateProduct).toHaveBeenCalledWith('1', updateData);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(updatedProduct);
        });

        it('should handle validation errors during update', async () => {
            // Arrange
            const invalidUpdateData = { price: -10 };
            mockRequest.params = { id: '1' };
            mockRequest.body = invalidUpdateData;
            mockService.updateProduct.mockRejectedValue(
                new ValidationError('Price must be positive')
            );

            // Act
            await productController.updateProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(expect.any(ValidationError));
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product successfully', async () => {
            // Arrange
            mockRequest.params = { id: '1' };
            mockService.deleteProduct.mockResolvedValue();

            // Act
            await productController.deleteProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockService.deleteProduct).toHaveBeenCalledWith('1');
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
        });

        it('should handle not found errors during deletion', async () => {
            // Arrange
            mockRequest.params = { id: '999' };
            mockService.deleteProduct.mockRejectedValue(
                new NotFoundError('Product not found')
            );

            // Act
            await productController.deleteProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundError));
        });
    });

    describe('listProducts', () => {
        it('should return a list of products', async () => {
            // Arrange
            const products = [
                new Product('1', 'Laptop', 999.99, 10, 'Electronics'),
                new Product('2', 'Mouse', 25.99, 50, 'Accessories')
            ];
            mockService.listProducts.mockResolvedValue(products);

            // Act
            await productController.listProducts(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockService.listProducts).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(products);
        });
    });
});