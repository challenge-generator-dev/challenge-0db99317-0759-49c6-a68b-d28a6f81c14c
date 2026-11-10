# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `tests/productController.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `tests/productService.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `tests/dynamoProductRepository.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | (raiz) | practice, chapter | server | Node | Express, DynamoDB, Jest |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `GET /products`

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/interfaces/http/controllers/productController.ts` — `ProductRepositoryType.findByName`: Se invoca `findByName` sobre `ProductRepositoryType`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/interfaces/http/controllers/productController.ts` — `ProductRepositoryType.create`: Se invoca `create` sobre `ProductRepositoryType`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/interfaces/http/controllers/productController.ts` — `ProductRepositoryType.findById`: Se invoca `findById` sobre `ProductRepositoryType`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/interfaces/http/controllers/productController.ts` — `ProductRepositoryType.update`: Se invoca `update` sobre `ProductRepositoryType`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/interfaces/http/controllers/productController.ts` — `ProductRepositoryType.delete`: Se invoca `delete` sobre `ProductRepositoryType`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/interfaces/http/controllers/productController.ts` — `ProductRepositoryType.list`: Se invoca `list` sobre `ProductRepositoryType`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de productos en DynamoDB expuesto por una API REST con Express y pruebas con Jest (corrida e2e 20261110141755634), Implementa operaciones CRUD de productos sobre DynamoDB con Express y las cubre con pruebas unitarias en Jest

### Misión / candidato
Persistir y consultar productos

### Reto
- Tema: CRUD de productos con Express y DynamoDB
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de productos en DynamoDB con Express
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial y persistencia básica — objetivo: Configurar el entorno de desarrollo y permitir la creación y consulta básica de productos. — entregable (NO resolver): API REST funcional que permite crear y consultar productos con validaciones básicas.
- Fase 2: Actualización y eliminación de productos — objetivo: Extender la API para permitir la actualización y eliminación de productos. — entregable (NO resolver): API REST extendida que permite actualizar y eliminar productos, con validaciones aplicadas.
- Fase 3: Pruebas unitarias con Jest — objetivo: Cubrir las operaciones CRUD con pruebas unitarias utilizando Jest. — entregable (NO resolver): Conjunto de pruebas unitarias que cubren las operaciones CRUD de productos.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "product-crud-api",
  "version": "1.0.0",
  "description": "API REST para gestión de productos con Express y DynamoDB",
  "main": "src/index.ts",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint . --ext .ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@aws-sdk/client-dynamodb": "3.600.0",
    "@aws-sdk/lib-dynamodb": "3.600.0",
    "class-validator": "^0.14.1",
    "dotenv": "16.4.5",
    "express": "4.21.0"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/jest": "29.5.12",
    "@types/node": "22.5.0",
    "@types/supertest": "2.0.16",
    "eslint": "8.57.0",
    "jest": "29.7.0",
    "supertest": "7.0.0",
    "ts-jest": "29.2.5",
    "ts-node": "10.9.2",
    "typescript": "^5.7.3"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "moduleFileExtensions": [
      "ts",
      "js"
    ],
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "testMatch": [
      "**/*.spec.ts"
    ]
  }
}


// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "strictBindCallApply": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules"]
}

// === ARCHIVO: src/interfaces/http/server.ts ===
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

// === ARCHIVO: src/domain/models/product.ts ===
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

// === ARCHIVO: src/domain/repositories/productRepository.ts ===
import { Product } from '../models/product';

export interface ProductRepository {
    create(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findByName(name: string): Promise<Product | null>;
    update(id: string, product: Partial<Product>): Promise<Product | null>;
    delete(id: string): Promise<boolean>;
    list(): Promise<Product[]>;
}

// === ARCHIVO: src/infrastructure/repositories/dynamoProductRepository.ts ===
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

// === ARCHIVO: src/interfaces/http/controllers/productController.ts ===
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

// === ARCHIVO: src/interfaces/http/routes/productRoutes.ts ===
import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { ProductRepository } from '../../../domain/repositories/productRepository';
import { DynamoProductRepository } from '../../../infrastructure/repositories/dynamoProductRepository';

const router = Router();

const repository: ProductRepository = new DynamoProductRepository();
const productController = new ProductController(repository);

router.post('/', (req, res, next) => productController.createProduct(req, res, next));

router.get('/', (req, res, next) => productController.listProducts(req, res, next));

router.get('/:id', (req, res, next) => productController.getProductById(req, res, next));

router.put('/:id', (req, res, next) => productController.updateProduct(req, res, next));

router.delete('/:id', (req, res, next) => productController.deleteProduct(req, res, next));

export default router;

// === ARCHIVO: src/interfaces/http/middlewares/errorHandler.ts ===
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

// === ARCHIVO: src/application/services/productService.ts ===
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

// === ARCHIVO: src/infrastructure/config/dynamoConfig.ts ===
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

// === ARCHIVO: src/utils/validation.ts ===
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

// === ARCHIVO: src/main.ts ===
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

// === ARCHIVO: src/index.ts ===
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

// === ARCHIVO: tests/productController.spec.ts ===
import { ProductController } from '../src/interfaces/http/controllers/productController';
import { ProductService } from '../src/application/services/productService';
import { Request, Response, NextFunction } from 'express';
import { Product } from '../src/domain/models/product';
import { ValidationError, NotFoundError, DuplicateNameError } from '../src/utils/validation';

jest.mock('../src/application/services/productService');

describe('ProductController', () => {
    let productController: ProductController;
    let mockService: jest.Mocked<ProductService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockService = new ProductService({} as any) as jest.Mocked<ProductService>;
        productController = new ProductController(mockService);
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            sendStatus: jest.fn()
        };
        mockNext = jest.fn();
    });

    describe('createProduct', () => {
        it('should create a product successfully', async () => {
            // Arrange
            const productData = {
                name: 'Laptop',
                price: 999.99,
                stock: 10,
                category: 'Electronics'
            };
            const createdProduct = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            mockRequest.body = productData;
            mockService.createProduct.mockResolvedValue(createdProduct);

            // Act
            await productController.createProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockService.createProduct).toHaveBeenCalledWith(productData);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(createdProduct);
        });

        it('should handle validation errors', async () => {
            // Arrange
            const invalidProductData = {
                name: '',
                price: -10,
                stock: 10,
                category: 'Electronics'
            };
            mockRequest.body = invalidProductData;
            mockService.createProduct.mockRejectedValue(
                new ValidationError('Name is required and price must be positive')
            );

            // Act
            await productController.createProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(expect.any(ValidationError));
        });

        it('should handle duplicate name errors', async () => {
            // Arrange
            const duplicateProductData = {
                name: 'Existing Product',
                price: 50,
                stock: 5,
                category: 'Electronics'
            };
            mockRequest.body = duplicateProductData;
            mockService.createProduct.mockRejectedValue(
                new DuplicateNameError('Product name already exists')
            );

            // Act
            await productController.createProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(expect.any(DuplicateNameError));
        });
    });

    describe('getProductById', () => {
        it('should return a product when found', async () => {
            // Arrange
            const product = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            mockRequest.params = { id: '1' };
            mockService.getProductById.mockResolvedValue(product);

            // Act
            await productController.getProductById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockService.getProductById).toHaveBeenCalledWith('1');
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(product);
        });

        it('should handle not found errors', async () => {
            // Arrange
            mockRequest.params = { id: '999' };
            mockService.getProductById.mockRejectedValue(
                new NotFoundError('Product not found')
            );

            // Act
            await productController.getProductById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundError));
        });
    });

    describe('updateProduct', () => {
        it('should update a product successfully', async () => {
            // Arrange
            const updateData = { price: 899.99 };
            const updatedProduct = new Product('1', 'Laptop', 899.99, 10, 'Electronics');
            mockRequest.params = { id: '1' };
            mockRequest.body = updateData;
            mockService.updateProduct.mockResolvedValue(updatedProduct);

            // Act
            await productController.updateProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockService.updateProduct).toHaveBeenCalledWith('1', updateData);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(updatedProduct);
        });

        it('should handle validation errors during update', async () => {
            // Arrange
            const invalidUpdateData = { price: -10 };
            mockRequest.params = { id: '1' };
            mockRequest.body = invalidUpdateData;
            mockService.updateProduct.mockRejectedValue(
                new ValidationError('Price must be positive')
            );

            // Act
            await productController.updateProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(expect.any(ValidationError));
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product successfully', async () => {
            // Arrange
            mockRequest.params = { id: '1' };
            mockService.deleteProduct.mockResolvedValue();

            // Act
            await productController.deleteProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockService.deleteProduct).toHaveBeenCalledWith('1');
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
        });

        it('should handle not found errors during deletion', async () => {
            // Arrange
            mockRequest.params = { id: '999' };
            mockService.deleteProduct.mockRejectedValue(
                new NotFoundError('Product not found')
            );

            // Act
            await productController.deleteProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundError));
        });
    });

    describe('listProducts', () => {
        it('should return a list of products', async () => {
            // Arrange
            const products = [
                new Product('1', 'Laptop', 999.99, 10, 'Electronics'),
                new Product('2', 'Mouse', 25.99, 50, 'Accessories')
            ];
            mockService.listProducts.mockResolvedValue(products);

            // Act
            await productController.listProducts(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(mockService.listProducts).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(products);
        });
    });
});

// === ARCHIVO: tests/productService.spec.ts ===
import { ProductService } from '../src/application/services/productService';
import { ProductRepository } from '../src/domain/repositories/productRepository';
import { Product } from '../src/domain/models/product';
import { ValidationError, NotFoundError, DuplicateNameError } from '../src/utils/validation';

jest.mock('../src/domain/repositories/productRepository');

describe('ProductService', () => {
    let productService: ProductService;
    let mockRepository: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            list: jest.fn()
        };
        productService = new ProductService(mockRepository);
    });

    describe('createProduct', () => {
        it('should create a product successfully', async () => {
            // Arrange
            const productData = {
                name: 'Laptop',
                price: 999.99,
                stock: 10,
                category: 'Electronics'
            };
            const createdProduct = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            mockRepository.findByName.mockResolvedValue(null);
            mockRepository.create.mockResolvedValue(createdProduct);

            // Act
            const result = await productService.createProduct(productData);

            // Assert
            expect(mockRepository.findByName).toHaveBeenCalledWith('Laptop');
            expect(mockRepository.create).toHaveBeenCalled();
            expect(result).toEqual(createdProduct);
        });

        it('should throw ValidationError for invalid data', async () => {
            // Arrange
            const invalidProductData = {
                name: '',
                price: -10,
                stock: 10,
                category: 'Electronics'
            };

            // Act & Assert
            await expect(productService.createProduct(invalidProductData))
                .rejects.toThrow(ValidationError);
        });

        it('should throw DuplicateNameError if product name already exists', async () => {
            // Arrange
            const existingProduct = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            const productData = {
                name: 'Laptop',
                price: 999.99,
                stock: 10,
                category: 'Electronics'
            };
            mockRepository.findByName.mockResolvedValue(existingProduct);

            // Act & Assert
            await expect(productService.createProduct(productData))
                .rejects.toThrow(DuplicateNameError);
        });
    });

    describe('getProductById', () => {
        it('should return a product when found', async () => {
            // Arrange
            const product = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            mockRepository.findById.mockResolvedValue(product);

            // Act
            const result = await productService.getProductById('1');

            // Assert
            expect(mockRepository.findById).toHaveBeenCalledWith('1');
            expect(result).toEqual(product);
        });

        it('should throw NotFoundError when product is not found', async () => {
            // Arrange
            mockRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(productService.getProductById('999'))
                .rejects.toThrow(NotFoundError);
        });
    });

    describe('updateProduct', () => {
        it('should update a product successfully', async () => {
            // Arrange
            const existingProduct = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            const updateData = { price: 899.99 };
            const updatedProduct = new Product('1', 'Laptop', 899.99, 10, 'Electronics');
            mockRepository.findById.mockResolvedValue(existingProduct);
            mockRepository.update.mockResolvedValue(updatedProduct);

            // Act
            const result = await productService.updateProduct('1', updateData);

            // Assert
            expect(mockRepository.findById).toHaveBeenCalledWith('1');
            expect(mockRepository.update).toHaveBeenCalledWith('1', updateData);
            expect(result).toEqual(updatedProduct);
        });

        it('should throw NotFoundError when product to update is not found', async () => {
            // Arrange
            mockRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(productService.updateProduct('999', { price: 100 }))
                .rejects.toThrow(NotFoundError);
        });

        it('should throw ValidationError for invalid update data', async () => {
            // Arrange
            const existingProduct = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            mockRepository.findById.mockResolvedValue(existingProduct);

            // Act & Assert
            await expect(productService.updateProduct('1', { price: -10 }))
                .rejects.toThrow(ValidationError);
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product successfully', async () => {
            // Arrange
            mockRepository.delete.mockResolvedValue(true);

            // Act
            await productService.deleteProduct('1');

            // Assert
            expect(mockRepository.delete).toHaveBeenCalledWith('1');
        });

        it('should throw NotFoundError when product to delete is not found', async () => {
            // Arrange
            mockRepository.delete.mockResolvedValue(false);

            // Act & Assert
            await expect(productService.deleteProduct('999'))
                .rejects.toThrow(NotFoundError);
        });
    });

    describe('listProducts', () => {
        it('should return a list of products', async () => {
            // Arrange
            const products = [
                new Product('1', 'Laptop', 999.99, 10, 'Electronics'),
                new Product('2', 'Mouse', 25.99, 50, 'Accessories')
            ];
            mockRepository.list.mockResolvedValue(products);

            // Act
            const result = await productService.listProducts();

            // Assert
            expect(mockRepository.list).toHaveBeenCalled();
            expect(result).toEqual(products);
        });
    });
});

// === ARCHIVO: tests/dynamoProductRepository.spec.ts ===
import { DynamoProductRepository } from '../src/infrastructure/repositories/dynamoProductRepository';
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Product } from '../src/domain/models/product';

jest.mock('@aws-sdk/client-dynamodb');
jest.mock('@aws-sdk/lib-dynamodb');

describe('DynamoProductRepository', () => {
    let dynamoProductRepository: DynamoProductRepository;
    let mockDynamoClient: jest.Mocked<DynamoDBClient>;
    let mockDocClient: jest.Mocked<DynamoDBDocumentClient>;
    const tableName = 'Products';

    beforeEach(() => {
        mockDynamoClient = new DynamoDBClient({} as DynamoDBClientConfig) as jest.Mocked<DynamoDBClient>;
        mockDocClient = {
            send: jest.fn()
        } as unknown as jest.Mocked<DynamoDBDocumentClient>;
        
        dynamoProductRepository = new DynamoProductRepository();
        // Override private fields for testing
        Object.defineProperty(dynamoProductRepository, 'client', {
            value: mockDynamoClient,
            writable: true
        });
        Object.defineProperty(dynamoProductRepository, 'docClient', {
            value: mockDocClient,
            writable: true
        });
        Object.defineProperty(dynamoProductRepository, 'tableName', {
            value: tableName,
            writable: true
        });
    });

    describe('create', () => {
        it('should create a product successfully', async () => {
            // Arrange
            const product = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            mockDocClient.send.mockResolvedValue({});

            // Act
            const result = await dynamoProductRepository.create(product);

            // Assert
            expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(PutCommand));
            expect(result).toEqual(product);
        });

        it('should throw an error if DynamoDB fails', async () => {
            // Arrange
            const product = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            mockDocClient.send.mockRejectedValue(new Error('DynamoDB error'));

            // Act & Assert
            await expect(dynamoProductRepository.create(product))
                .rejects.toThrow('DynamoDB error');
        });
    });

    describe('findById', () => {
        it('should return a product when found', async () => {
            // Arrange
            const productData = {
                id: '1',
                name: 'Laptop',
                price: 999.99,
                stock: 10,
                category: 'Electronics'
            };
            mockDocClient.send.mockResolvedValue({ Item: productData });

            // Act
            const result = await dynamoProductRepository.findById('1');

            // Assert
            expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(GetCommand));
            expect(result).toEqual(new Product(
                productData.id,
                productData.name,
                productData.price,
                productData.stock,
                productData.category
            ));
        });

        it('should return null when product is not found', async () => {
            // Arrange
            mockDocClient.send.mockResolvedValue({});

            // Act
            const result = await dynamoProductRepository.findById('999');

            // Assert
            expect(result).toBeNull();
        });

        it('should throw an error if DynamoDB fails', async () => {
            // Arrange
            mockDocClient.send.mockRejectedValue(new Error('DynamoDB error'));

            // Act & Assert
            await expect(dynamoProductRepository.findById('1'))
                .rejects.toThrow('DynamoDB error');
        });
    });

    describe('findByName', () => {
        it('should return a product when found by name', async () => {
            // Arrange
            const productData = {
                id: '1',
                name: 'Laptop',
                price: 999.99,
                stock: 10,
                category: 'Electronics'
            };
            // Mock ScanCommand for findByName
            mockDocClient.send.mockResolvedValue({ Items: [productData] });

            // Act
            const result = await dynamoProductRepository.findByName('Laptop');

            // Assert
            expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(ScanCommand));
            expect(result).toEqual(new Product(
                productData.id,
                productData.name,
                productData.price,
                productData.stock,
                productData.category
            ));
        });

        it('should return null when product is not found by name', async () => {
            // Arrange
            mockDocClient.send.mockResolvedValue({ Items: [] });

            // Act
            const result = await dynamoProductRepository.findByName('NonExistent');

            // Assert
            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it('should update a product successfully', async () => {
            // Arrange
            const existingProduct = new Product('1', 'Laptop', 999.99, 10, 'Electronics');
            const updateData = { price: 899.99 };
            const updatedProductData = {
                id: '1',
                name: 'Laptop',
                price: 899.99,
                stock: 10,
                category: 'Electronics'
            };
            mockDocClient.send.mockResolvedValue({ Attributes: updatedProductData });

            // Act
            const result = await dynamoProductRepository.update('1', updateData);

            // Assert
            expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(UpdateCommand));
            expect(result).toEqual(new Product(
                updatedProductData.id,
                updatedProductData.name,
                updatedProductData.price,
                updatedProductData.stock,
                updatedProductData.category
            ));
        });

        it('should return null when product to update is not found', async () => {
            // Arrange
            mockDocClient.send.mockResolvedValue({});

            // Act
            const result = await dynamoProductRepository.update('999', { price: 100 });

            // Assert
            expect(result).toBeNull();
        });
    });

    describe('delete', () => {
        it('should delete a product successfully', async () => {
            // Arrange
            mockDocClient.send.mockResolvedValue({});

            // Act
            const result = await dynamoProductRepository.delete('1');

            // Assert
            expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(DeleteCommand));
            expect(result).toBe(true);
        });

        it('should return false when product to delete is not found', async () => {
            // Arrange
            mockDocClient.send.mockRejectedValue({ name: 'ConditionalCheckFailedException' });

            // Act
            const result = await dynamoProductRepository.delete('999');

            // Assert
            expect(result).toBe(false);
        });
    });

    describe('list', () => {
        it('should return a list of products', async () => {
            // Arrange
            const productsData = [
                {
                    id: '1',
                    name: 'Laptop',
                    price: 999.99,
                    stock: 10,
                    category: 'Electronics'
                },
                {
                    id: '2',
                    name: 'Mouse',
                    price: 25.99,
                    stock: 50,
                    category: 'Accessories'
                }
            ];
            mockDocClient.send.mockResolvedValue({ Items: productsData });

            // Act
            const result = await dynamoProductRepository.list();

            // Assert
            expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(ScanCommand));
            expect(result).toEqual([
                new Product('1', 'Laptop', 999.99, 10, 'Electronics'),
                new Product('2', 'Mouse', 25.99, 50, 'Accessories')
            ]);
        });
    });
});

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
