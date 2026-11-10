import { ProductService } from '../src/application/services/productService';
import { ProductRepository } from '../src/domain/repositories/productRepository';
import { Product } from '../src/domain/models/product';
import { ValidationError, NotFoundError, DuplicateNameError } from '../src/utils/validation';

jest.mock('../src/domain/repositories/productRepository');

describe('ProductService', () => {
    let productService: ProductService;
    let mockRepository: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            list: jest.fn()
        };
        productService = new ProductService(mockRepository);
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
            mockRepository.findByName.mockResolvedValue(null);
            mockRepository.create.mockResolvedValue(createdProduct);

            // Act
            const result = await productService.createProduct(productData);

            // Assert
            expect(mockRepository.findByName).toHaveBeenCalledWith('Laptop');
            expect(mockRepository.create).toHaveBeenCalled();
            expect(result).toEqual(createdProduct);
        });

        it('should throw ValidationError for invalid data', async () => {
            // Arrange
            const invalidProductData = {
                name: '',
                price: -10,
                stock: 10,
                category: 'Electronics'
            };

            // Act & Assert
            await expect(productService.createProduct(invalidProductData))
                .rejects.toThrow(ValidationError);
        });

        it('should throw DuplicateNameError if product name already exists', async () => {
            // Arrange
            const existingProduct = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            const productData = {
                name: 'Laptop',
                price: 999.99,
                stock: 10,
                category: 'Electronics'
            };
            mockRepository.findByName.mockResolvedValue(existingProduct);

            // Act & Assert
            await expect(productService.createProduct(productData))
                .rejects.toThrow(DuplicateNameError);
        });
    });

    describe('getProductById', () => {
        it('should return a product when found', async () => {
            // Arrange
            const product = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            mockRepository.findById.mockResolvedValue(product);

            // Act
            const result = await productService.getProductById('1');

            // Assert
            expect(mockRepository.findById).toHaveBeenCalledWith('1');
            expect(result).toEqual(product);
        });

        it('should throw NotFoundError when product is not found', async () => {
            // Arrange
            mockRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(productService.getProductById('999'))
                .rejects.toThrow(NotFoundError);
        });
    });

    describe('updateProduct', () => {
        it('should update a product successfully', async () => {
            // Arrange
            const existingProduct = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            const updateData = { price: 899.99 };
            const updatedProduct = new Product('1', 'Laptop', 899.99, 10, 'Electronics');
            mockRepository.findById.mockResolvedValue(existingProduct);
            mockRepository.update.mockResolvedValue(updatedProduct);

            // Act
            const result = await productService.updateProduct('1', updateData);

            // Assert
            expect(mockRepository.findById).toHaveBeenCalledWith('1');
            expect(mockRepository.update).toHaveBeenCalledWith('1', updateData);
            expect(result).toEqual(updatedProduct);
        });

        it('should throw NotFoundError when product to update is not found', async () => {
            // Arrange
            mockRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(productService.updateProduct('999', { price: 100 }))
                .rejects.toThrow(NotFoundError);
        });

        it('should throw ValidationError for invalid update data', async () => {
            // Arrange
            const existingProduct = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            mockRepository.findById.mockResolvedValue(existingProduct);

            // Act & Assert
            await expect(productService.updateProduct('1', { price: -10 }))
                .rejects.toThrow(ValidationError);
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product successfully', async () => {
            // Arrange
            mockRepository.delete.mockResolvedValue(true);

            // Act
            await productService.deleteProduct('1');

            // Assert
            expect(mockRepository.delete).toHaveBeenCalledWith('1');
        });

        it('should throw NotFoundError when product to delete is not found', async () => {
            // Arrange
            mockRepository.delete.mockResolvedValue(false);

            // Act & Assert
            await expect(productService.deleteProduct('999'))
                .rejects.toThrow(NotFoundError);
        });
    });

    describe('listProducts', () => {
        it('should return a list of products', async () => {
            // Arrange
            const products = [
                new Product('1', 'Laptop', 999.99, 10, 'Electronics'),
                new Product('2', 'Mouse', 25.99, 50, 'Accessories')
            ];
            mockRepository.list.mockResolvedValue(products);

            // Act
            const result = await productService.listProducts();

            // Assert
            expect(mockRepository.list).toHaveBeenCalled();
            expect(result).toEqual(products);
        });
    });
});