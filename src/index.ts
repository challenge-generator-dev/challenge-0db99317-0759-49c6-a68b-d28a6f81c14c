import express, { Application, Request, Response, NextFunction, RequestHandler } from 'express';
import { ProductController } from './interfaces/http/controllers/productController';
import { errorHandler } from './interfaces/http/middlewares/errorHandler';

export class ExpressApplication {
    private readonly app: Application;
    private readonly port: string;
    private readonly controller: ProductController;

    constructor(controller: ProductController) {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.controller = controller;
        this.configureMiddlewares();
        this.configureRoutes();
        this.configureErrorHandling();
    }

    private configureMiddlewares(): void {
        this.app.use(express.json() as RequestHandler);
        this.app.use(express.urlencoded({ extended: true }) as RequestHandler);
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
            next();
        });
    }

    private configureRoutes(): void {
        const router = express.Router();

        router.post('/products', async (req: Request, res: Response, next: NextFunction) => {
            await this.controller.createProduct(req, res, next);
        });

        router.get('/products', async (req: Request, res: Response, next: NextFunction) => {
            await this.controller.listProducts(req, res, next);
        });

        router.get('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
            await this.controller.getProductById(req, res, next);
        });

        router.put('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
            await this.controller.updateProduct(req, res, next);
        });

        router.delete('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
            await this.controller.deleteProduct(req, res, next);
        });

        this.app.use('/api', router);

        this.app.get('/health', (req: Request, res: Response) => {
            res.status(200).json({
                status: 'healthy',
                timestamp: new Date().toISOString(),
                service: 'product-crud-api'
            });
        });

        this.app.get('/', (req: Request, res: Response) => {
            res.status(200).json({
                message: 'API de Gestión de Productos',
                version: '1.0.0',
                endpoints: {
                    health: '/health',
                    products: '/api/products',
                    productById: '/api/products/:id'
                }
            });
        });
    }

    private configureErrorHandling(): void {
        this.app.use(errorHandler);

        this.app.use((req: Request, res: Response) => {
            res.status(404).json({
                error: 'Ruta no encontrada',
                path: req.path,
                method: req.method
            });
        });
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`=========================================`);
            console.log(`Servidor arrancado en puerto ${this.port}`);
            console.log(`URL: http://localhost:${this.port}`);
            console.log(`Health check: http://localhost:${this.port}/health`);
            console.log(`API Products: http://localhost:${this.port}/api/products`);
            console.log(`=========================================`);
        });
    }

    public getApp(): Application {
        return this.app;
    }
}

export { Request, Response, NextFunction };