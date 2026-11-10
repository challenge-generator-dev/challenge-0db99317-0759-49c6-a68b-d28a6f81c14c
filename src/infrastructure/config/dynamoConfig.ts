import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DynamoDBDocumentClientConfig } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

export interface DynamoConfig {
    client: DynamoDBClient;
    docClient: DynamoDBDocumentClient;
    tableName: string;
    region: string;
}

function getClientConfig(): DynamoDBClientConfig {
    const config: DynamoDBClientConfig = {
        region: process.env.AWS_REGION || 'us-east-1',
    };

    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
        config.credentials = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        };
    }

    if (process.env.AWS_ENDPOINT) {
        config.endpoint = process.env.AWS_ENDPOINT;
    }

    return config;
}

function getDocumentClientConfig(): DynamoDBDocumentClientConfig {
    return {
        marshallOptions: {
            removeUndefinedValues: true,
            convertClassInstanceToMap: true,
        },
        unmarshallOptions: {
            wrapNumbers: false,
        },
    };
}

export function createDynamoConfig(): DynamoConfig {
    const clientConfig = getClientConfig();
    const client = new DynamoDBClient(clientConfig);

    const docClientConfig = getDocumentClientConfig();
    const docClient = DynamoDBDocumentClient.from(client, docClientConfig);

    const tableName = process.env.DYNAMODB_TABLE_NAME || 'products';
    const region = process.env.AWS_REGION || 'us-east-1';

    return {
        client,
        docClient,
        tableName,
        region,
    };
}

export function getDynamoConfig(): DynamoConfig {
    return createDynamoConfig();
}

export const dynamoConfig = createDynamoConfig();