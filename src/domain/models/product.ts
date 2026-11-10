import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class Product {
    id: string;

    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    name: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @IsPositive({ message: 'El precio debe ser positivo' })
    price: number;

    @IsNumber({}, { message: 'El stock debe ser un número' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock: number;

    @IsNotEmpty({ message: 'La categoría es obligatoria' })
    @IsString({ message: 'La categoría debe ser una cadena de texto' })
    category: string;

    constructor(id: string, name: string, price: number, stock: number, category: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }
}