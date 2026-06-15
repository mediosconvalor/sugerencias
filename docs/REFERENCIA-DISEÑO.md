# 🎨 MEDIOS CON VALOR - REFERENCIA DE DISEÑO

## 📋 Contenido
- [Colores](#colores)
- [Tipografía](#tipografía)
- [Componentes](#componentes)
- [Código CSS Rápido](#código-css-rápido)

---

## 🎯 COLORES

### Colores Principales

| Nombre | Hex | RGB | Uso |
|--------|-----|-----|-----|
| **Verde Primario** | `#00DD2A` | `rgb(0, 221, 42)` | Logo, botones principales, CTA |
| **Azul Corporativo** | `#046BD2` | `rgb(4, 107, 210)` | Secundario, acentos |
| **Fondo Oscuro** | `#16202F` | `rgb(22, 32, 47)` | Fondo principal |
| **Gris Oscuro** | `#343947` | `rgb(52, 57, 71)` | Elementos secundarios |
| **Gris Claro** | `#E7E9EE` | `rgb(231, 233, 238)` | Bordes, separadores |
| **Blanco** | `#FFFFFF` | `rgb(255, 255, 255)` | Texto, contrastes |

### Paleta Completa de Grises

| Descripción | Hex | RGB | Nivel |
|-------------|-----|-----|-------|
| Negro | `#000000` | `rgb(0, 0, 0)` | - |
| Texto Oscuro | `#33373D` | `rgb(51, 55, 61)` | - |
| Header Oscuro | `#1A1F2E` | `rgb(26, 31, 46)` | - |
| Fondo Oscuro Princ. | `#16202F` | `rgb(22, 32, 47)` | - |
| Gris Oscuro | `#343947` | `rgb(52, 57, 71)` | 700 |
| Gris 600 | `#535B6F` | `rgb(83, 91, 111)` | 600 |
| Gris 500 | `#69727D` | `rgb(105, 114, 125)` | 500 |
| Gris 400 | `#777777` | `rgb(119, 119, 119)` | 400 |
| Gris 300 | `#3F444B` | `rgb(63, 68, 75)` | 300 |
| Gris Muy Claro | `#E7E9EE` | `rgb(231, 233, 238)` | 200 |
| Blanco Tinte Morado | `#F5F3FF` | `rgb(245, 243, 255)` | 100 |
| Blanco | `#FFFFFF` | `rgb(255, 255, 255)` | - |

### Estados de Color

```css
/* Estados de Botón Primario */
--color-primary: #00DD2A;           /* Normal */
--color-primary-hover: #00CC22;     /* Hover */
--color-primary-alpha-light: rgba(0, 221, 42, 0.1);   /* Background claro */
--color-primary-alpha-medium: rgba(0, 221, 42, 0.3);  /* Shadow */
```

---

## 🔤 TIPOGRAFÍA

### Fuentes Utilizadas

| # | Nombre | Stack | Uso |
|---|--------|-------|-----|
| 1 | **Neo Sans Pro Ultra** | `'Neo Sans Pro Ultra', 'Neo Sans Pro', sans-serif` | H1, Headings principales |
| 2 | **Neo Sans Pro** | `'Neo Sans Pro', sans-serif` | H2, Headings |
| 3 | **Source Sans Pro** | `'Source Sans Pro', Arial, sans-serif` | H3, H5, Textos corporativos |
| 4 | **Roboto** | `'Roboto', sans-serif` | Body, Párrafos |
| 5 | **Montserrat** | `'Montserrat', sans-serif` | Botones, Labels |
| 6 | **Karla** | `'Karla', sans-serif` | Textos complementarios |
| 7 | **Muli** | `'Muli', sans-serif` | Textos adicionales |

### Tamaños de Fuente (Font Size)

| Elemento | Tamaño | Peso | Familia | Altura Línea |
|----------|--------|------|---------|--------------|
| **H1** | 120px | 900 (Black) | Neo Sans Pro Ultra | 1.2 |
| **H2** | 48px | 700 (Bold) | Neo Sans Pro | 1.5 |
| **H3** | 32px | 700 (Bold) | Source Sans Pro | 1.5 |
| **H4** | 28px | 600 (SemiBold) | Montserrat | 1.5 |
| **H5** | 24px | 600 (SemiBold) | Source Sans Pro | 1.5 |
| **Body** | 16px | 400 (Regular) | Roboto | 1.5 |
| **Small** | 13px | 400 (Regular) | Roboto | 1.5 |
| **Extra Small** | 12px | 400 (Regular) | Roboto | 1.5 |

### Pesos de Fuente (Font Weight)

| Nombre | Valor | Uso |
|--------|-------|-----|
| Light | 300 | Textos decorativos |
| Regular | 400 | Body text, párrafos |
| Medium | 500 | Énfasis moderado |
| Semibold | 600 | Headings secundarios |
| Bold | 700 | Headings, énfasis |
| Extra Bold | 800 | Énfasis fuerte |
| Black | 900 | Headings principales |

### Alturas de Línea (Line Height)

| Tipo | Valor | Uso |
|------|-------|-----|
| Tight | 1.2 | Headings principales |
| Normal | 1.5 | Body, párrafos |
| Relaxed | 1.8 | Textos legibles |

---

## 🎛️ COMPONENTES

### Botón Primario

```css
.btn-primary {
  background-color: #00DD2A;
  color: #FFFFFF;
  padding: 15px 30px;
  font-size: 15px;
  font-weight: 900;
  border-radius: 30px;
  border: none;
  font-family: 'Source Sans Pro', Arial, sans-serif;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #00CC22;
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 221, 42, 0.3);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

### Botón Secundario

```css
.btn-secondary {
  background-color: transparent;
  color: #00DD2A;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 700;
  border: 2px solid #00DD2A;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: #00DD2A;
  color: #FFFFFF;
}
```

### Header/Navbar

```css
header {
  background-color: rgba(22, 32, 47, 0.95);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

nav a {
  color: #FFFFFF;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

nav a:hover {
  color: #00DD2A;
}
```

### Hero Section

```css
.hero {
  background: linear-gradient(135deg, rgba(22, 32, 47, 0.9) 0%, rgba(4, 107, 210, 0.15) 100%);
  padding: 100px 50px;
  min-height: 600px;
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 80px;
  background-color: #00DD2A;
}

.hero h1 {
  color: #FFFFFF;
  font-size: 120px;
  font-weight: 900;
  font-family: 'Neo Sans Pro Ultra', sans-serif;
}

.hero p {
  color: #FFFFFF;
  font-size: 13px;
  line-height: 20px;
}
```

### Card

```css
.card {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  background-color: rgba(0, 221, 42, 0.1);
  border-color: #00DD2A;
  transform: translateY(-4px);
}
```

### Topbar (Barra de Información Superior)

```css
.topbar {
  background-color: #343947;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #FFFFFF;
}
```

---

## 📐 ESPACIADO Y TAMAÑOS

### Sistema de Espaciado (Base 8px)

```css
.p-1  { padding: 8px; }      /* Small */
.p-2  { padding: 16px; }     /* Medium */
.p-3  { padding: 24px; }     /* Large */
.p-4  { padding: 32px; }     /* X-Large */

.m-1  { margin: 8px; }       /* Small */
.m-2  { margin: 16px; }      /* Medium */
.m-3  { margin: 24px; }      /* Large */
.m-4  { margin: 32px; }      /* X-Large */

.mt-1 { margin-top: 8px; }
.mb-1 { margin-bottom: 8px; }
```

### Border Radius Estándar

```css
--radius-small: 4px;         /* Pequeños elementos */
--radius-medium: 8px;        /* Cards, inputs */
--radius-large: 12px;        /* Componentes principales */
--radius-round: 50%;         /* Botones, avatares */
--radius-pill: 30px;         /* Botones pill-shaped */
```

### Sombras

```css
.shadow-sm {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.shadow-md {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.shadow-lg {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
}
```

---

## 🌈 GRADIENTES

### Gradientes Utilizados

```css
/* Gradiente Principal (Verde) */
background: linear-gradient(135deg, #00DD2A 0%, #00CC22 100%);

/* Gradiente Azul */
background: linear-gradient(135deg, #046BD2 0%, #0A3C7A 100%);

/* Gradiente Fondo Oscuro */
background: linear-gradient(135deg, #16202F 0%, #343947 100%);

/* Hero Gradient */
background: linear-gradient(135deg, rgba(22, 32, 47, 0.9) 0%, rgba(4, 107, 210, 0.15) 100%);
```

---

## 💫 ANIMACIONES

### Transiciones Estándar

```css
/* Transición Suave */
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Transición Rápida */
.transition-fast {
  transition: all 0.15s ease-out;
}
```

### Animaciones Principales

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

---

## 📱 BREAKPOINTS RESPONSIVOS

```css
/* Desktop */
@media (min-width: 1024px) { }

/* Tablet */
@media (max-width: 1023px) and (min-width: 768px) { }

/* Mobile */
@media (max-width: 767px) { }

/* Small Mobile */
@media (max-width: 480px) { }
```

---

## 💻 CÓDIGO CSS RÁPIDO

### Importar en HTML

```html
<link rel="stylesheet" href="mediosconvalor-design-system.css">
```

### Usar Variables CSS

```css
body {
  background-color: var(--color-dark-bg);
  color: var(--color-text-white);
  font-family: var(--font-body);
  font-size: var(--font-size-body);
}

.titulo {
  font-family: var(--font-primary);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-black);
  color: var(--color-primary);
}
```

### Estructura HTML Básica

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="mediosconvalor-design-system.css">
    <title>Mi Sitio</title>
</head>
<body>
    <header>
        <nav>
            <a href="#">Inicio</a>
            <a href="#">Servicios</a>
            <a href="#">Contacto</a>
        </nav>
    </header>

    <section class="hero">
        <h1>Título Principal</h1>
        <p>Descripción</p>
        <button class="btn-primary">Contacto</button>
    </section>

    <section class="card">
        <h2>Servicio</h2>
        <p>Descripción del servicio...</p>
    </section>

    <footer>
        <p>&copy; 2025 Mi Empresa</p>
    </footer>
</body>
</html>
```

---

## 🎓 MEJORES PRÁCTICAS

### 1. **Usar Variables CSS**
- Siempre usa `var(--color-primary)` en lugar de códigos hex directos
- Facilita cambios globales futuros

### 2. **Mantener Consistencia**
- Usa los tamaños de fuente predefinidos
- No crees colores nuevos, usa la paleta existente

### 3. **Contraste y Accesibilidad**
- Verifica que el texto tenga suficiente contraste
- Usa herramientas como WCAG Contrast Checker

### 4. **Responsive First**
- Diseña primero para mobile
- Luego escala para tablets y desktop

### 5. **Performance**
- Optimiza imágenes
- Minimiza el CSS en producción
- Usa lazy loading para imágenes

### 6. **Mantenimiento**
- Documenta cambios de color/tipografía
- Mantén el archivo CSS organizado
- Actualiza la guía cuando hagas cambios

---

## 🔗 INFORMACIÓN ADICIONAL

- **Sitio Original:** https://mediosconvalor.com/
- **Tema:** Gestión de residuos y servicios ambientales
- **Estilo:** Moderno, corporativo, con énfasis en sustentabilidad
- **Identidad Visual:** Verde neón + Azul oscuro = Energía + Confianza

---

## 📝 NOTAS FINALES

- El verde `#00DD2A` es el color identificador principal de la marca
- El fondo oscuro `#16202F` es la base del diseño (modo oscuro)
- Las fuentes Neo Sans Pro se usan para dar impacto visual
- Roboto se usa para legibilidad en body text
- Las animaciones son suaves (0.3s) para no resultar invasivas

---

**Última actualización:** 2026-06-15
**Extraído de:** https://mediosconvalor.com/
**Versión:** 1.0
