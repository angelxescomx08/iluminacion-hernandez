---
description: "Estándares de estilos, componentes y layout para frontend con diseño limpio, profesional, accesible y consistente para la empresa Iluminación Hernández."
alwaysApply: true
---

## 🎨 REGLA DE ESTILOS – COMPONENTES & LAYOUT  
**Proyecto: Iluminación Hernández**

Estas reglas definen cómo deben diseñarse y construirse **todos los componentes visuales y layouts** del frontend.  
Su cumplimiento es obligatorio para mantener una UI clara, profesional, escalable y coherente.

---

## 1. Principios Generales de Diseño

- El diseño debe ser **claro, luminoso, limpio y profesional**, alineado con una empresa del sector iluminación.
- La interfaz debe **ignorar completamente cualquier tema oscuro del navegador o del sistema operativo**.
- El diseño siempre debe renderizarse en **modo claro**, usando colores definidos explícitamente.
- Todo componente debe ser:
  - Responsive
  - Accesible
  - Reutilizable
  - Visualmente consistente

---

## 2. Paleta de Colores y Uso Correcto

### 2.1 Sistema de colores por rol (NO por uso arbitrario)

Los colores deben definirse y usarse por **rol semántico**, no por valores directos:

- `primary` → branding, CTAs principales
- `secondary` → acciones secundarias
- `accent` → énfasis visual puntual
- `neutral` → fondos y superficies
- `text` → contenido textual
- `success / warning / error` → estados semánticos

❌ Prohibido usar colores hardcodeados directamente en componentes  
✅ Obligatorio usar tokens definidos en Tailwind

---

### 2.2 Regla 60-30-10

- 60% → colores neutros (fondos, layout base)
- 30% → colores secundarios (componentes)
- 10% → color primario o acento (CTAs y focos visuales)

Esto evita interfaces saturadas y mejora la jerarquía visual.

---

## 3. Sombras, Elevación y Profundidad

Las sombras se usan **solo para comunicar jerarquía**, no como decoración.

### 3.1 Niveles de elevación permitidos

- **Nivel 0** → fondo plano (sin sombra)
- **Nivel 1** → cards, contenedores básicos
- **Nivel 2** → dropdowns, popovers
- **Nivel 3** → modales, overlays

Reglas:
- Las sombras deben ser **suaves y difusas**
- La dirección de luz debe ser consistente (vertical, de arriba hacia abajo)
- No mezclar múltiples sombras en un mismo componente

---

## 4. Layout y Sistema de Espaciado

### 4.1 Grid y estructura

- Layout basado en **mobile-first**
- Uso consistente de breakpoints (`sm`, `md`, `lg`, `xl`)
- Contenedores centrados y con ancho máximo controlado

---

### 4.2 Espaciado consistente

- El sistema de espaciado debe seguir una escala fija (ej. múltiplos de 4 u 8)
- ❌ No usar márgenes o paddings arbitrarios
- ✅ Usar tokens de spacing de Tailwind

Ejemplo conceptual:
- `space-4` → separación mínima
- `space-8` → separación estándar
- `space-12+` → secciones principales

---

## 5. Componentes UI – Reglas Obligatorias

### 5.1 Botones

- Estados obligatorios:
  - default
  - hover
  - active
  - disabled
- Los botones principales deben destacar claramente sobre el fondo
- Hover con:
  - cambio sutil de color
  - o ligera elevación
- Nunca usar animaciones agresivas

---

### 5.2 Cards y Contenedores

- Bordes suaves o sin borde
- Sombra según nivel de elevación definido
- Padding interno consistente
- Nunca mezclar diferentes estilos de card en la misma vista

---

### 5.3 Inputs y Formularios

- Tamaños uniformes en toda la app
- Labels siempre visibles
- Estados claros:
  - focus
  - error
  - disabled
- El estado `focus` debe ser visible y accesible

---

## 6. Tipografía y Jerarquía Visual

- Escala tipográfica clara:
  - Heading
  - Subheading
  - Body
  - Caption
- El contraste entre texto y fondo debe cumplir estándares de accesibilidad
- No usar más de 2–3 pesos tipográficos

---

## 7. Responsive Design (Obligatorio)

- Ningún componente puede romperse en mobile
- El diseño debe adaptarse fluidamente:
  - Mobile
  - Tablet
  - Desktop
- Evitar valores fijos de ancho/alto cuando sea posible
- Priorizar layouts flexibles (`flex`, `grid`)

---

## 8. Imágenes y Multimedia

- Uso obligatorio de `<Image />` de Next.js
- Imágenes optimizadas para múltiples resoluciones
- Uso de:
  - lazy loading
  - tamaños responsivos
  - formatos modernos (WebP / AVIF)
- Nunca usar imágenes sin propósito visual claro

---

## 9. Accesibilidad (No Opcional)

- Contraste adecuado en todos los textos
- Estados de foco visibles
- Componentes interactivos claramente identificables
- Diseño usable sin depender solo del color

---

## 10. Consistencia y Escalabilidad

- Todos los componentes deben seguir estas reglas
- Si un nuevo estilo es necesario:
  - se define como token
  - se documenta
  - se reutiliza
- ❌ Prohibido crear estilos “solo para este componente”

---

## 11. Reglas Técnicas Obligatorias

- TypeScript estricto
- ❌ Prohibido usar `any`
- Todo componente debe estar tipado correctamente
- Tailwind + Shadcn UI como base visual
- No usar estilos inline arbitrarios

---

## 12. Objetivo Final

El objetivo de estas reglas es garantizar que **Iluminación Hernández** tenga una interfaz:

- Profesional
- Clara
- Moderna
- Accesible
- Escalable
- Visualmente coherente en toda la aplicación

Cualquier implementación que no cumpla estas reglas debe ser refactorizada.
