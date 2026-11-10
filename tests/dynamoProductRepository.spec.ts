import { DynamoProductRepository } from '../src/infrastructure/repositories/dynamoProductRepository';
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Product } from '../src/domain/models/product';

jest.mock('@aws-sdk/client-dynamodb');
jest.mock('@aws-sdk/lib-dynamodb');

describe('DynamoProductRepository', () => {
    let dynamoProductRepository: DynamoProductRepository;
    let mockDynamoClient: jest.Mocked<DynamoDBClient>;
    let mockDocClient: jest.Mocked<DynamoDBDocumentClient>;
    const tableName = 'Products';

    beforeEach(() => {
        mockDynamoClient = new DynamoDBClient({} as DynamoDBClientConfig) as jest.Mocked<DynamoDBClient>;
        mockDocClient = {
            send: jest.fn()
        } as unknown as jest.Mocked<DynamoDBDocumentClient>;
        
        dynamoProductRepository = new DynamoProductRepository();
        // Override private fields for testing
        Object.defineProperty(dynamoProductRepository, 'client', {
            value: mockDynamoClient,
            writable: true
        });
        Object.defineProperty(dynamoProductRepository, 'docClient', {
            value: mockDocClient,
            writable: true
        });
        Object.defineProperty(dynamoProductRepository, 'tableName', {
            value: tableName,
            writable: true
        });
    });

    describe('create', () => {
        it('should create a product successfully', async () => {
            // Arrange
            const product = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            mockDocClient.send.mockResolvedValue({});

            // Act
            const result = await dynamoProductRepository.create(product);

            // Assert
            expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(PutCommand));
            expect(result).toEqual(product);
        });

        it('should throw an error if DynamoDB fails', async () => {
            // Arrange
            const product = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            mockDocClient.send.mockRejectedValue(new Error('DynamoDB error'));

            // Act & Assert
            await expect(dynamoProductRepository.create(product))
                .rejects.toThrow('DynamoDB error');
        });
    });

    describe('findById', () => {
        it('should return a product when found', async () => {
            // Arrange
            const productData = {
                id: '1',
                name: 'Laptop',
                price: 999.99,
                stock: 10,
                category: 'Electronics'
            };
            mockDocClient.send.mockResolvedValue({ Item: productData });

            // Act
            const result = await dynamoProductRepository.findById('1');

            // Assert
            expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(GetCommand));
            expect(result).toEqual(new Product(
                productData.id,
                productData.name,
                productData.price,
                productData.stock,
                productData.category
            ));
        });

        it('should return null when product is not found', async () => {
            // Arrange
            mockDocClient.send.mockResolvedValue({});

            // Act
            const result = await dynamoProductRepository.findById('999');

            // Assert
            expect(result).toBeNull();
        });

        it('should throw an error if DynamoDB fails', async () => {
            // Arrange
            mockDocClient.send.mockRejectedValue(new Error('DynamoDB error'));

            // Act & Assert
            await expect(dynamoProductRepository.findById('1'))
                .rejects.toThrow('DynamoDB error');
        });
    });

    describe('findByName', () => {
        it('should return a product when found by name', async () => {
            // Arrange
            const productData = {
                id: '1',
                name: 'Laptop',
                price: 999.99,
                stock: 10,
                category: 'Electronics'
            };
            // Mock ScanCommand for findByName
            mockDocClient.send.mockResolvedValue({ Items: [productData] });

            // Act
            const result = await dynamoProductRepository.findByName('Laptop');

            // Assert
            expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(ScanCommand));
            expect(result).toEqual(new Product(
                productData.id,
                productData.name,
                productData.price,
                productData.stock,
                productData.category
            ));
        });

        it('should return null when product is not found by name', async () => {
            // Arrange
            mockDocClient.send.mockResolvedValue({ Items: [] });

            // Act
            const result = await dynamoProductRepository.findByName('NonExistent');

            // Assert
            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it('should update a product successfully', async () => {
            // Arrange
            const existingProduct = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            const updateData = { price: 899.99 };
            const updatedProductData = {
                id: '1',
                name: 'Laptop',
                price: 899.99,
                stock: 10,
                category: 'Electronics'
            };
            mockDocClient.send.mockResolvedValue({ Attributes: updatedProductData });

            // Act
            const result = await dynamoProductRepository.update('1', updateData);

            // Assert
            expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(UpdateCommand));
            expect(result).toEqual(new Product(
                updatedProductData.id,
                updatedProductData.name,
                updatedProductData.price,
                updatedProductData.stock,
                updatedProductData.category
            ));
        });

        it('should return null when product to update is not found', async () => {
            // Arrange
            mockDocClient.send.mockResolvedValue({});

            // Act
            const result = await dynamoProductRepository.update('999', { price: 100 });

            // Assert
            expect(result).toBeNull();
        });
    });

    describe('delete', () => {
        it('should delete a product successfully', async () => {
            // Arrange
            mockDocClient.send.mockResolvedValue({});

            // Act
            const result = await dynamoProductRepository.delete('1');

            // Assert
            expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(DeleteCommand));
            expect(result).toBe(true);
        });

        it('should return false when product to delete is not found', async () => {
            // Arrange
            mockDocClient.send.mockRejectedValue({ name: 'ConditionalCheckFailedException' });

            // Act
            const result = await dynamoProductRepository.delete('999');

            // Assert
            expect(result).toBe(false);
        });
    });

    describe('list', () => {
        it('should return a list of products', async () => {
            // Arrange
            const productsData = [
                {
                    id: '1',
                    name: 'Laptop',
                    price: 999.99,
                    stock: 10,
                    category: 'Electronics'
                },
                {
                    id: '2',
                    name: 'Mouse',
                    price: 25.99,
                    stock: 50,
                    category: 'Accessories'
                }
            ];
            mockDocClient.send.mockResolvedValue({ Items: productsData });

            // Act
            const result = await dynamoProductRepository.list();

            // Assert
            expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(ScanCommand));
            expect(result).toEqual([
                new Product('1', 'Laptop', 999.99, 10, 'Electronics'),
                new Product('2', 'Mouse', 25.99, 50, 'Accessories')
            ]);
        });
    });
});