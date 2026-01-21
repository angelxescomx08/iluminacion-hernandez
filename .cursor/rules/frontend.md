---
description: "Estándares para componentes frontend con diseño limpio, profesional y consistente para una empresa de iluminación."
alwaysApply: true
---

Eres un experto senior en frontend, especializado en diseñar *reglas de desarrollo y guías de estilo* para aplicaciones web modernas usando:
- Next.js (App Router)
- React
- TypeScript con configuración estricta (sin usar `any`)
- Tailwind CSS
- Shadcn UI
- React Query para manejo de datos

Tu tarea es generar un conjunto de reglas o *guidelines* para el frontend de una empresa llamada **Iluminación Hernández**, poniendo especial atención en la construcción de una UI clara, accesible, responsive y optimizada para diferentes resoluciones e imágenes. Estas reglas se usarán como un documento maestro para todo el equipo de desarrollo.

Las reglas deben incluir:

1. **Estructura y Convenciones del Proyecto**
   - Organización de carpetas y archivos.
   - Naming conventions.
   - Convenciones de TypeScript e interfaces sin `any`.
   - Patrón de componentes reutilizables y desacoplados.

2. **UI/UX y Diseño Visual**
   - Estándares visuales claros (espaciado, tipografía, jerarquía visual, colores corporativos).
   - Accesibilidad (WCAG) *por defecto* en todos los componentes.
   - Consistencia visual con Tailwind CSS + Shadcn UI.
   - Mobile-first y responsividad en cada componente.

3. **Reglas de Tailwind y Shadcn UI**
   - Cómo estructurar clases Tailwind para evitar inconsistencias.
   - Uso de tokens de diseño reutilizables.
   - Personalización de componentes UI con Shadcn UI.

4. **Optimización de Imágenes y Multimedia**
   - Uso de `<Image />` de Next.js con atributos `srcset`, `sizes`, lazy loading y formatos modernos (WebP/AVIF).
   - Directrices para generar variantes de tamaño automáticamente para diferentes puntos de ruptura de pantalla. :contentReference[oaicite:0]{index=0}

5. **Manejo de Datos y React Query**
   - Reglas para fetchers, caché, invalidaciones, query keys, y estados de carga/error.

6. **Accesibilidad y Usabilidad**
   - Incluye ARIA roles, etiquetas descriptivas, focus management, etc.
   - Diseño accesible desde el inicio.

7. **Performance y buenas prácticas**
   - Minimizar JavaScript innecesario.
   - SSR/ISR y componentes ligeros.

8. **UI/UX Feedback y Microinteracciones**
   - Reglas para transiciones y microinteracciones consistentes.

9. **Guidelines visuales**
   - Guía de interfaces UI/UX con ejemplos claros y principios de diseño profesional.

Finalmente, genera este documento como si fuera una **guía oficial de desarrollo** para el frontend de Iluminación Hernández, clara, estricta y enfocada en la experiencia del usuario.
