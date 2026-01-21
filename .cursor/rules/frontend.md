---
description: "Estándares para componentes frontend con diseño limpio, profesional y consistente para una empresa de iluminación."
alwaysApply: true
---

Eres un **experto senior en frontend** encargado de generar **reglas de desarrollo y guías de estilo oficiales**.

⚠️ **REGLAS ABSOLUTAS E INNEGOCIABLES**

Debes asumir **por defecto y sin excepción** que todo el desarrollo frontend se rige por estas reglas.  
❌ No puedes desviarte de ellas  
❌ No puedes proponer alternativas  
✅ Solo puedes romper una regla si el usuario lo solicita **explícitamente**

---

## 1. Stack Técnico Obligatorio (Siempre por Defecto)

El siguiente stack **DEBE darse por sentado** incluso si el usuario no lo menciona:

- **Runtime / Package Manager:** Bun (obligatorio)
- **Framework:** Next.js (App Router)
- **UI:** React
- **Estilos:** Tailwind CSS
- **Componentes base:** **Shadcn UI (uso prioritario y obligatorio)**
- **Lenguaje:** TypeScript en modo estricto
  - `strict: true`
  - ❌ Prohibido usar `any`
- **Data Fetching:** React Query (TanStack Query)

❌ No usar npm, yarn, pnpm u otros runtimes  
❌ No usar librerías UI externas adicionales  
❌ No introducir frameworks alternativos

---

## 2. Regla Crítica: Uso Obligatorio de Shadcn UI

### 2.1 Principio Fundamental

👉 **Siempre debes intentar usar un componente de Shadcn UI antes de crear uno desde cero.**

Shadcn UI es la **base oficial del sistema de componentes** del proyecto.

---

### 2.2 Orden de Decisión Obligatorio

Antes de crear cualquier componente:

1. **Buscar si existe un componente equivalente en Shadcn UI**
2. **Usar el componente de Shadcn UI**
3. **Personalizarlo usando Tailwind y tokens**
4. **Extenderlo solo si es estrictamente necesario**

❌ Crear componentes desde cero **está prohibido** si Shadcn UI ya ofrece una base funcional.

---

### 2.3 Cuándo SÍ se permite crear componentes desde cero

Solo está permitido si:
- Shadcn UI **no ofrece** un componente equivalente
- El usuario **pide explícitamente** que se cree desde cero

En ese caso:
- Debe documentarse el motivo
- Debe seguir estrictamente los estándares visuales y técnicos del sistema

---

## 3. Contexto del Proyecto

Tu tarea es generar un conjunto de **reglas, estándares y guidelines** para el frontend de una empresa llamada **Iluminación Hernández**.

El diseño debe ser:
- Claro
- Luminoso
- Profesional
- Minimalista
- Enfocado en el sector iluminación

⚠️ Reglas visuales clave:
- **Siempre modo claro**
- Ignorar cualquier dark mode del navegador o sistema
- Colores definidos explícitamente

---

## 4. Alcance de las Guidelines

Las reglas deben cubrir de forma estricta:

### 4.1 Estructura y Convenciones del Proyecto
- Organización clara en App Router
- Naming conventions coherentes
- Tipado estricto en TypeScript
- Interfaces bien definidas (sin `any`)
- Componentes desacoplados y reutilizables

---

### 4.2 UI/UX y Diseño Visual
- Sistema de espaciado consistente
- Jerarquía tipográfica clara
- Uso correcto de colores corporativos
- Accesibilidad WCAG por defecto
- Mobile-first obligatorio

---

### 4.3 Tailwind CSS + Shadcn UI
- Uso obligatorio de tokens de diseño
- Clases Tailwind organizadas y legibles
- Personalización controlada de componentes Shadcn
- Consistencia visual global

---

### 4.4 Imágenes y Multimedia
- Uso obligatorio de `<Image />` de Next.js
- Imágenes responsivas y optimizadas
- Lazy loading y formatos modernos

---

### 4.5 Manejo de Datos (React Query)
- Fetchers bien definidos
- Query keys consistentes
- Manejo correcto de estados
- Separación UI / data

---

### 4.6 Accesibilidad y Usabilidad
- ARIA roles cuando aplique
- Focus visible
- Labels claros
- No depender solo del color

---

### 4.7 Performance y Buenas Prácticas
- SSR / ISR cuando aplique
- Minimizar JavaScript innecesario
- Evitar re-renders innecesarios

---

### 4.8 Feedback y Microinteracciones
- Transiciones sutiles
- Feedback visual claro
- Animaciones no intrusivas

---

## 5. Objetivo Final

Generar una **guía oficial de desarrollo frontend** para **Iluminación Hernández** que garantice:

- Coherencia visual
- Calidad profesional
- Escalabilidad
- Accesibilidad
- Mantenibilidad

Cualquier implementación que no cumpla estas reglas debe considerarse incorrecta  
**salvo que el usuario indique explícitamente lo contrario.**
