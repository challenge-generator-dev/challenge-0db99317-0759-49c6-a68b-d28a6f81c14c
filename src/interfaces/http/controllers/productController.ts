import { Request, Response, NextFunction } from 'express';
import { Product } from '../../../domain/models/product';
import { ProductRepository } from '../../../domain/repositories/productRepository';

export type ProductRepositoryType = ProductRepository | null;

export class ProductController {
    private readonly repository: ProductRepository;

    constructor(repository: ProductRepositoryType) {
        if (!repository) {
            throw new Error('El repositorio no puede ser null');
        }
        this.repository = repository;
    }

    public async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, price, stock, category } = req.body;

            if (!name || typeof name !== 'string' || name.trim().length === 0) {
                res.status(400).json({ error: 'El nombre del producto es requerido' });
                return;
            }

            if (typeof price !== 'number' || price < 0) {
                res.status(400).json({ error: 'El precio debe ser un número no negativo' });
                return;
            }

            if (typeof stock !== 'number' || stock < 0) {
                res.status(400).json({ error: 'El stock debe ser un número no negativo' });
                return;
            }

            if (!category || typeof category !== 'string' || category.trim().length === 0) {
                res.status(400).json({ error: 'La categoría es requerida' });
                return;
            }

            const existingProduct = await this.repository.findByName(name.trim());
            if (existingProduct) {
                res.status(400).json({ error: 'Ya existe un producto con ese nombre' });
                return;
            }

            const id = crypto.randomUUID();
            const product = new Product(id, name.trim(), price, stock, category.trim());
            const created = await this.repository.create(product);

            res.status(201).json({
                id: created.id,
                name: created.name,
                price: created.price,
                stock: created.stock,
                category: created.category
            });
        } catch (error) {
            next(error);
        }
    }

    public async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'ID de producto inválido' });
                return;
            }

            const product = await this.repository.findById(id);

            if (!product) {
                res.status(404).json({ error: 'Producto no encontrado' });
                return;
            }

            res.status(200).json({
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                category: product.category
            });
        } catch (error) {
            next(error);
        }
    }

    public async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { name, price, stock, category } = req.body;

            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'ID de producto inválido' });
                return;
            }

            const existingProduct = await this.repository.findById(id);
            if (!existingProduct) {
                res.status(404).json({ error: 'Producto no encontrado' });
                return;
            }

            if (price !== undefined && (typeof price !== 'number' || price < 0)) {
                res.status(400).json({ error: 'El precio debe ser un número no negativo' });
                return;
            }

            if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
                res.status(400).json({ error: 'El stock debe ser un número no negativo' });
                return;
            }

            if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
                res.status(400).json({ error: 'El nombre no puede estar vacío' });
                return;
            }

            if (category !== undefined && (typeof category !== 'string' || category.trim().length === 0)) {
                res.status(400).json({ error: 'La categoría no puede estar vacía' });
                return;
            }

            if (name && name.trim() !== existingProduct.name) {
                const duplicate = await this.repository.findByName(name.trim());
                if (duplicate && duplicate.id !== id) {
                    res.status(400).json({ error: 'Ya existe otro producto con ese nombre' });
                    return;
                }
            }

            const updateData: Partial<Product> = {};
            if (name !== undefined) updateData.name = name.trim();
            if (price !== undefined) updateData.price = price;
            if (stock !== undefined) updateData.stock = stock;
            if (category !== undefined) updateData.category = category.trim();

            const updated = await this.repository.update(id, updateData);

            if (!updated) {
                res.status(404).json({ error: 'Producto no encontrado' });
                return;
            }

            res.status(200).json({
                id: updated.id,
                name: updated.name,
                price: updated.price,
                stock: updated.stock,
                category: updated.category
            });
        } catch (error) {
            next(error);
        }
    }

    public async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'ID de producto inválido' });
                return;
            }

            const existingProduct = await this.repository.findById(id);
            if (!existingProduct) {
                res.status(404).json({ error: 'Producto no encontrado' });
                return;
            }

            const deleted = await this.repository.delete(id);

            if (!deleted) {
                res.status(404).json({ error: 'No se pudo eliminar el producto' });
                return;
            }

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    public async listProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const products = await this.repository.list();

            const response = products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                category: product.category
            }));

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}