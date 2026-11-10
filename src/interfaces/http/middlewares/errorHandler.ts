import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error capturado:', err.message);
    console.error('Stack trace:', err.stack);

    if (res.headersSent) {
        return next(err);
    }

    const errorMessage = err.message || 'Error interno del servidor';

    const isValidationError = 
        errorMessage.includes('validación') ||
        errorMessage.includes('requerido') ||
        errorMessage.includes('número') ||
        errorMessage.includes('inválido');

    if (isValidationError) {
        res.status(400).json({
            error: errorMessage,
            type: 'ValidationError'
        });
        return;
    }

    const isNotFoundError = 
        errorMessage.includes('no encontrado') ||
        errorMessage.includes('not found');

    if (isNotFoundError) {
        res.status(404).json({
            error: errorMessage,
            type: 'NotFoundError'
        });
        return;
    }

    const isConflictError = 
        errorMessage.includes('ya existe') ||
        errorMessage.includes('duplicate') ||
        errorMessage.includes('conflicto');

    if (isConflictError) {
        res.status(409).json({
            error: errorMessage,
            type: 'ConflictError'
        });
        return;
    }

    res.status(500).json({
        error: 'Error interno del servidor',
        type: 'InternalServerError',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};