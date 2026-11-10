import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Product } from '../../domain/models/product';
import { ProductRepository } from '../../domain/repositories/productRepository';
import dotenv from 'dotenv';

dotenv.config();

export class DynamoProductRepository implements ProductRepository {
    private readonly client: DynamoDBClient;
    private readonly docClient: DynamoDBDocumentClient;
    private readonly tableName: string;

    constructor() {
        this.tableName = process.env.DYNAMODB_TABLE_NAME || 'Products';
        this.client = new DynamoDBClient({
            region: process.env.AWS_REGION || 'us-east-1',
            endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
        });
        this.docClient = DynamoDBDocumentClient.from(this.client);
    }

    async create(product: Product): Promise<Product> {
        const command = new PutCommand({
            TableName: this.tableName,
            Item: {
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                category: product.category,
            },
            ConditionExpression: 'attribute_not_exists(id)',
        });

        try {
            await this.docClient.send(command);
            return product;
        } catch (error) {
            if (error.name === 'ConditionalCheckFailedException') {
                throw new Error('Ya existe un producto con el mismo ID');
            }
            throw error;
        }
    }

    async findById(id: string): Promise<Product | null> {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: { id },
        });

        const response = await this.docClient.send(command);
        if (!response.Item) {
            return null;
        }

        return new Product(
            response.Item.id,
            response.Item.name,
            response.Item.price,
            response.Item.stock,
            response.Item.category
        );
    }

    async findByName(name: string): Promise<Product | null> {
        const command = new ScanCommand({
            TableName: this.tableName,
            FilterExpression: 'name = :name',
            ExpressionAttributeValues: { ':name': name },
        });

        const response = await this.docClient.send(command);
        if (!response.Items || response.Items.length === 0) {
            return null;
        }

        const item = response.Items[0];
        return new Product(
            item.id,
            item.name,
            item.price,
            item.stock,
            item.category
        );
    }

    async update(id: string, product: Partial<Product>): Promise<Product | null> {
        const updateExpressions = [];
        const expressionAttributeValues = {};
        const expressionAttributeNames = {};

        if (product.name !== undefined) {
            updateExpressions.push('#name = :name');
            expressionAttributeNames['#name'] = 'name';
            expressionAttributeValues[':name'] = product.name;
        }
        if (product.price !== undefined) {
            updateExpressions.push('price = :price');
            expressionAttributeValues[':price'] = product.price;
        }
        if (product.stock !== undefined) {
            updateExpressions.push('stock = :stock');
            expressionAttributeValues[':stock'] = product.stock;
        }
        if (product.category !== undefined) {
            updateExpressions.push('category = :category');
            expressionAttributeValues[':category'] = product.category;
        }

        if (updateExpressions.length === 0) {
            throw new Error('No se proporcionaron atributos para actualizar');
        }

        const command = new UpdateCommand({
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: 'SET ' + updateExpressions.join(', '),
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: 'ALL_NEW',
        });

        try {
            const response = await this.docClient.send(command);
            if (!response.Attributes) {
                return null;
            }

            return new Product(
                response.Attributes.id,
                response.Attributes.name,
                response.Attributes.price,
                response.Attributes.stock,
                response.Attributes.category
            );
        } catch (error) {
            if (error.name === 'ConditionalCheckFailedException') {
                return null;
            }
            throw error;
        }
    }

    async delete(id: string): Promise<boolean> {
        const command = new DeleteCommand({
            TableName: this.tableName,
            Key: { id },
            ReturnValues: 'ALL_OLD',
        });

        try {
            const response = await this.docClient.send(command);
            return !!response.Attributes;
        } catch (error) {
            return false;
        }
    }

    async list(): Promise<Product[]> {
        const command = new ScanCommand({
            TableName: this.tableName,
        });

        const response = await this.docClient.send(command);
        if (!response.Items) {
            return [];
        }

        return response.Items.map(item => new Product(
            item.id,
            item.name,
            item.price,
            item.stock,
            item.category
        ));
    }
}