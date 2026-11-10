import { Product } from '../../domain/models/product';
import { ProductRepository } from '../../domain/repositories/productRepository';
import { ValidationError, NotFoundError, DuplicateNameError } from '../../utils/validation';

export class ProductService {
    private readonly repository: ProductRepository;

    constructor(repository: ProductRepository) {
        this.repository = repository;
    }

    async createProduct(data: { name: string; price: number; stock: number; category: string }): Promise<Product> {
        if (!data.name || data.name.trim().length === 0) {
            throw new ValidationError('El nombre del producto es requerido');
        }

        if (data.price < 0) {
            throw new ValidationError('El precio no puede ser negativo');
        }

        if (data.stock < 0) {
            throw new ValidationError('El stock no puede ser negativo');
        }

        if (!data.category || data.category.trim().length === 0) {
            throw new ValidationError('La categoría es requerida');
        }

        const existingProduct = await this.repository.findByName(data.name.trim());
        if (existingProduct) {
            throw new DuplicateNameError(`Ya existe un producto con el nombre "${data.name}"`);
        }

        const id = this.generateId();
        const product = new Product(
            id,
            data.name.trim(),
            data.price,
            data.stock,
            data.category.trim()
        );

        return await this.repository.create(product);
    }

    async getProductById(id: string): Promise<Product> {
        if (!id || id.trim().length === 0) {
            throw new ValidationError('El ID del producto es requerido');
        }

        const product = await this.repository.findById(id);
        if (!product) {
            throw new NotFoundError(`Producto con ID "${id}" no encontrado`);
        }

        return product;
    }

    async updateProduct(
        id: string,
        data: { name?: string; price?: number; stock?: number; category?: string }
    ): Promise<Product> {
        if (!id || id.trim().length === 0) {
            throw new ValidationError('El ID del producto es requerido');
        }

        const existingProduct = await this.repository.findById(id);
        if (!existingProduct) {
            throw new NotFoundError(`Producto con ID "${id}" no encontrado`);
        }

        if (data.price !== undefined && data.price < 0) {
            throw new ValidationError('El precio no puede ser negativo');
        }

        if (data.stock !== undefined && data.stock < 0) {
            throw new ValidationError('El stock no puede ser negativo');
        }

        if (data.name !== undefined && data.name.trim().length === 0) {
            throw new ValidationError('El nombre del producto no puede estar vacío');
        }

        if (data.name !== undefined && data.name.trim() !== existingProduct.name) {
            const productWithName = await this.repository.findByName(data.name.trim());
            if (productWithName && productWithName.id !== id) {
                throw new DuplicateNameError(`Ya existe un producto con el nombre "${data.name}"`);
            }
        }

        const updateData: Partial<Product> = {};

        if (data.name !== undefined) {
            updateData.name = data.name.trim();
        }
        if (data.price !== undefined) {
            updateData.price = data.price;
        }
        if (data.stock !== undefined) {
            updateData.stock = data.stock;
        }
        if (data.category !== undefined) {
            updateData.category = data.category.trim();
        }

        const updatedProduct = await this.repository.update(id, updateData);
        if (!updatedProduct) {
            throw new NotFoundError(`No se pudo actualizar el producto con ID "${id}"`);
        }

        return updatedProduct;
    }

    async deleteProduct(id: string): Promise<void> {
        if (!id || id.trim().length === 0) {
            throw new ValidationError('El ID del producto es requerido');
        }

        const existingProduct = await this.repository.findById(id);
        if (!existingProduct) {
            throw new NotFoundError(`Producto con ID "${id}" no encontrado`);
        }

        const deleted = await this.repository.delete(id);
        if (!deleted) {
            throw new NotFoundError(`No se pudo eliminar el producto con ID "${id}"`);
        }
    }

    async listProducts(): Promise<Product[]> {
        return await this.repository.list();
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    }
}