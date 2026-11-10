# Implementación de CRUD de productos en DynamoDB con Express

El sistema debe permitir la gestión de productos en una base de datos DynamoDB a través de una API REST construida con Express. Los productos tienen atributos como nombre, precio, stock y categoría. El sistema debe validar que los precios no sean negativos y que los nombres no se dupliquen. Ante fallos en la validación, el sistema debe responder con un mensaje claro. El dominio es una tienda en línea de productos electrónicos.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | CRUD de productos con Express y DynamoDB |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración inicial y persistencia básica

**Objetivo:** Configurar el entorno de desarrollo y permitir la creación y consulta básica de productos.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Configurar el proyecto con Express y DynamoDB.
- Implementar la funcionalidad para crear y consultar productos, asegurando que se validen los precios y nombres.

**Entregable:** API REST funcional que permite crear y consultar productos con validaciones básicas.

<details>
<summary>Pistas de conocimiento</summary>

- Configuración de DynamoDB y Express.
- Validación de datos en el backend.

</details>

### Fase 2: Actualización y eliminación de productos

**Objetivo:** Extender la API para permitir la actualización y eliminación de productos.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar la funcionalidad para actualizar y eliminar productos.
- Asegurar que las validaciones de precios y nombres se apliquen también en la actualización.

**Entregable:** API REST extendida que permite actualizar y eliminar productos, con validaciones aplicadas.

<details>
<summary>Pistas de conocimiento</summary>

- Manejo de operaciones CRUD en DynamoDB.
- Aplicación de validaciones en operaciones de actualización.

</details>

### Fase 3: Pruebas unitarias con Jest

**Objetivo:** Cubrir las operaciones CRUD con pruebas unitarias utilizando Jest.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Escribir pruebas unitarias para las operaciones CRUD de productos.
- Asegurar que las pruebas cubran los casos de éxito y fallo en las validaciones.

**Entregable:** Conjunto de pruebas unitarias que cubren las operaciones CRUD de productos.

<details>
<summary>Pistas de conocimiento</summary>

- Escrituras de pruebas unitarias con Jest.
- Cobertura de casos de éxito y fallo en las pruebas.

</details>

## Dimensiones Evaluadas

- **queEs**: En la fase 1, ¿qué es lo que configuramos y cómo funciona la validación de datos?
- **paraQueSirve**: En la fase 2, ¿para qué sirve la validación de datos en las operaciones de actualización?
- **comoSeUsa**: En la fase 3, ¿cómo se usa Jest para escribir pruebas unitarias?
- **erroresComunes**: En la fase 2, ¿cuáles son los errores comunes que podrías encontrar al actualizar productos y cómo los manejas?
- **queDecisionesImplica**: En la fase 3, ¿qué decisiones implica escribir pruebas unitarias para las operaciones CRUD?

## Criterios de Evaluacion

- Configuración correcta del entorno de desarrollo con Express y DynamoDB.
- Implementación de la funcionalidad para crear y consultar productos con validaciones.
- Implementación de la funcionalidad para actualizar y eliminar productos con validaciones.
- Escrituras de pruebas unitarias que cubren los casos de éxito y fallo en las operaciones CRUD.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
