export class ValidationError extends Error {
    public readonly name: string;
    public readonly statusCode: number;
    public readonly cause?: unknown;

    constructor(message: string, cause?: unknown) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
        this.cause = cause;
        Object.setPrototypeOf(this, ValidationError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends Error {
    public readonly name: string;
    public readonly statusCode: number;
    public readonly cause?: unknown;

    constructor(message: string, cause?: unknown) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
        this.cause = cause;
        Object.setPrototypeOf(this, NotFoundError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class DuplicateNameError extends Error {
    public readonly name: string;
    public readonly statusCode: number;
    public readonly cause?: unknown;

    constructor(message: string, cause?: unknown) {
        super(message);
        this.name = 'DuplicateNameError';
        this.statusCode = 409;
        this.cause = cause;
        Object.setPrototypeOf(this, DuplicateNameError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

export function validateProductData(data: {
    name?: string;
    price?: number;
    stock?: number;
    category?: string;
}): ValidationResult {
    const errors: string[] = [];

    if (data.name !== undefined) {
        if (!data.name || data.name.trim().length === 0) {
            errors.push('El nombre es requerido');
        } else if (data.name.trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        } else if (data.name.trim().length > 100) {
            errors.push('El nombre no puede exceder 100 caracteres');
        }
    }

    if (data.price !== undefined) {
        if (typeof data.price !== 'number') {
            errors.push('El precio debe ser un número');
        } else if (data.price < 0) {
            errors.push('El precio no puede ser negativo');
        } else if (data.price > 1000000) {
            errors.push('El precio excede el límite permitido');
        }
    }

    if (data.stock !== undefined) {
        if (typeof data.stock !== 'number') {
            errors.push('El stock debe ser un número');
        } else if (data.stock < 0) {
            errors.push('El stock no puede ser negativo');
        } else if (!Number.isInteger(data.stock)) {
            errors.push('El stock debe ser un número entero');
        }
    }

    if (data.category !== undefined) {
        if (!data.category || data.category.trim().length === 0) {
            errors.push('La categoría es requerida');
        } else if (data.category.trim().length > 50) {
            errors.push('La categoría no puede exceder 50 caracteres');
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

export function validateId(id: string): ValidationResult {
    const errors: string[] = [];

    if (!id || id.trim().length === 0) {
        errors.push('El ID es requerido');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

export function sanitizeString(value: string | undefined): string | undefined {
    if (value === undefined) {
        return undefined;
    }
    return value.trim();
}

export function isValidPrice(price: number): boolean {
    return typeof price === 'number' && price >= 0 && isFinite(price);
}

export function isValidStock(stock: number): boolean {
    return typeof stock === 'number' && stock >= 0 && Number.isInteger(stock);
}