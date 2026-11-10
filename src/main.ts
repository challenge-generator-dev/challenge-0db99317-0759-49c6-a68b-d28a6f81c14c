import 'dotenv/config';
import { Server } from './interfaces/http/server';
import { ProductRepository } from './domain/repositories/productRepository';
import { ProductService } from './application/services/productService';
import { ProductController } from './interfaces/http/controllers/productController';
import { DynamoProductRepository } from './infrastructure/repositories/dynamoProductRepository';
import { createDynamoConfig } from './infrastructure/config/dynamoConfig';

class ApplicationBootstrap {
    private server: Server | null = null;
    private repository: ProductRepository | null = null;
    private service: ProductService | null = null;
    private controller: ProductController | null = null;

    public async initialize(): Promise<void> {
        try {
            console.log('Inicializando la aplicación de gestión de productos...');
            this.initializeRepository();
            this.initializeService();
            this.initializeController();
            this.initializeServer();
            console.log('Todas las dependencias inicializadas correctamente');
        } catch (error) {
            console.error('Error durante la inicialización de la aplicación:', error);
            process.exit(1);
        }
    }

    private initializeRepository(): void {
        console.log('Configurando repositorio de DynamoDB...');
        const dynamoConfig = createDynamoConfig();
        this.repository = new DynamoProductRepository();
        console.log(`Repositorio configurado con tabla: ${dynamoConfig.tableName}`);
    }

    private initializeService(): void {
        if (!this.repository) {
            throw new Error('El repositorio debe inicializarse antes que el servicio');
        }
        console.log('Creando servicio de productos...');
        this.service = new ProductService(this.repository);
        console.log('Servicio de productos creado exitosamente');
    }

    private initializeController(): void {
        if (!this.service) {
            throw new Error('El servicio debe inicializarse antes que el controlador');
        }
        if (!this.repository) {
            throw new Error('El repositorio debe inicializarse antes que el controlador');
        }
        console.log('Configurando controlador de productos...');
        this.controller = new ProductController(this.repository);
        console.log('Controlador configurado exitosamente');
    }

    private initializeServer(): void {
        if (!this.controller) {
            throw new Error('El controlador debe inicializarse antes que el servidor');
        }
        console.log('Inicializando servidor HTTP...');
        this.server = new Server();
        console.log('Servidor HTTP creado exitosamente');
    }

    public async start(): Promise<void> {
        if (!this.server) {
            throw new Error('El servidor debe inicializarse antes de arrancarlo');
        }
        console.log('Arrancando servidor...');
        this.server.start();
    }
}

const bootstrap = new ApplicationBootstrap();

bootstrap.initialize()
    .then(() => bootstrap.start())
    .catch((error) => {
        console.error('Error fatal al iniciar la aplicación:', error);
        process.exit(1);
    });

process.on('SIGTERM', () => {
    console.log('Señal SIGTERM recibida, cerrando aplicación gracefulmente...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('Señal SIGINT recibida, cerrando aplicación gracefully...');
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.error('Excepción no capturada:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada no manejada en:', promise, 'razón:', reason);
    process.exit(1);
});