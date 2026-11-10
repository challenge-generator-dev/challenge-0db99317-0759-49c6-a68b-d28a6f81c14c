import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export class Server {
    private app: Express;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.configureMiddlewares();
    }

    private configureMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Middleware para manejar errores 404
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404).json({
                message: 'Endpoint not found'
            });
        });
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    public getApp(): Express {
        return this.app;
    }
}