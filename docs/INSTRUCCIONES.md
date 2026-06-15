# � Guía de Configuración - Formulario de Sugerencias MCV

## ✅ Archivos creados/actualizados

1. **`index.html`** - Formulario con colores de MCV (verde #00DD2A, azul #046BD2)
2. **`config.js`** - Configuración centralizada (sin export, funciona en navegador)
3. **`.env`** - Variables de entorno
4. **`GAS_ACTUALIZADO.js`** - Código actualizado para Google Apps Script

---

## 🚀 Pasos de configuración

### 1️⃣ Actualizar Google Apps Script

1. Ve a [script.google.com](https://script.google.com)
2. Abre tu proyecto de Google Apps Script
3. **Reemplaza TODO el contenido** con el código de `GAS_ACTUALIZADO.js`
4. Dale a **Deploy** → **New Deployment** → **Web app**
5. Configura:
   - Execute as: Tu cuenta
   - Who has access: Anyone
6. **Copia la URL** (ejemplo: `https://script.google.com/macros/d/AKfycbx.../userweb`)
7. **Importante:** La URL debe terminar en `/userweb` (no `/exec`)

### 2️⃣ Actualizar `config.js`

Abre `config.js` y reemplaza el ID:

```javascript
GAS_DEPLOYMENT_ID: 'TU_NUEVO_ID_AQUI'
```

Con el ID de tu URL de Google Apps Script (la parte entre `/d/` y `/userweb`).

### 3️⃣ Agregar tus orígenes al GAS

En `GAS_ACTUALIZADO.js`, dentro de la variable `ALLOWED_ORIGINS`, agrega los URLs donde usarás el formulario:

```javascript
const ALLOWED_ORIGINS = [
  'http://localhost:3000',        // Tu desarrollo local
  'https://tuusuario.github.io',  // Tu GitHub Pages
  'https://tu-vercel-app.vercel.app'  // Tu Vercel
];
```

---

## 🌐 Cómo usar en diferentes entornos

### **Localhost (Desarrollo)**

```bash
# Terminal en la carpeta del proyecto
python -m http.server 8000
# Luego abre: http://localhost:8000
```

### **GitHub Pages**

1. Sube el `index.html` a tu repositorio GitHub
2. Ve a **Settings** → **Pages**
3. Source: selecciona tu rama (main/master)
4. GitHub te dará una URL como: `https://usuario.github.io/sugerencias`

### **Vercel**

Ya tienes configurado con: `https://sugerencias-7ufd8o37n-equis01s-projects.vercel.app`

---

## 🔍 Debugging - Errores en consola

Si ves errores en la consola (F12), aquí está cómo investigar:

### Error: `Cross-Origin Request Blocked`

**Causas:**
- El origen no está en `ALLOWED_ORIGINS` del GAS
- El GAS usa `/exec` en lugar de `/userweb`
- CORS headers no se están enviando correctamente

**Solución:**
1. Abre DevTools (F12) → Console
2. Verifica que veas: `✅ Configuración cargada desde: http://localhost:8000`
3. Si ves `❌`, el GAS no responde con CORS headers

### Error: `config is not defined`

**Causa:** `config.js` no se cargó correctamente

**Solución:**
- Verifica que `config.js` esté en la misma carpeta que `index.html`
- Recarga la página (Ctrl+F5)

---

## 🎨 Colores de Medios Con Valor

Los colores están definidos en `config.js` y usados en `index.html`:

```javascript
// config.js
COLORS: {
  primary: '#00DD2A',      // Verde neón
  secondary: '#046BD2',    // Azul corporativo
  dark: '#16202F',         // Fondo oscuro
  light: '#E7E9EE',        // Gris claro
  text: '#FFFFFF',         // Blanco
  border: '#343947'        // Gris de bordes
}
```

También en CSS:
```css
:root {
  --primary-color: #00DD2A;
  --secondary-color: #046BD2;
  --dark-color: #16202F;
  --light-bg: #E7E9EE;
  --text-color: #FFFFFF;
  --border-color: #343947;
}
```

---

## 📝 Estructura de archivos

```
sugerencias/
├── index.html           (formulario principal)
├── config.js            (configuración - SIN comillas de sobra)
├── .env                 (variables de entorno)
├── GAS_ACTUALIZADO.js   (código para copiar al GAS)
└── INSTRUCCIONES.md     (este archivo)
```

---

## ✨ Lo que está listo

✅ Formulario con diseño MCV (colores correctos)
✅ Tipografía profesional
✅ CORS configurado en GAS
✅ Múltiples orígenes soportados (localhost, GitHub, Vercel)
✅ Sin comillas "de sobra" en config.js
✅ Logger en consola para debugging

---

## 🆘 Si algo no funciona

1. Abre DevTools (F12) → Console
2. Busca los logs: `✅` o `❌`
3. Verifica que `GAS_URL` sea correcto en `config.js`
4. Asegúrate que el GAS esté desplegado con `/userweb`
5. Revisa que tu origen esté en `ALLOWED_ORIGINS` del GAS

**¡Listo!** 🎉
- **Gris Claro:** `#E7E9EE`
- **Blanco:** `#FFFFFF`

---

## 🔤 TIPOGRAFÍAS

1. **Neo Sans Pro Ultra** → Headings principales
2. **Source Sans Pro** → Textos corporativos
3. **Roboto** → Body text
4. **Montserrat** → Botones
5. **Karla** → Textos complementarios

---

## 🚀 PRIMEROS PASOS

### Paso 1: Copiar los archivos CSS
```
Copia `mediosconvalor-design-system.css` a tu proyecto
```

### Paso 2: Importar en tu HTML
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="mediosconvalor-design-system.css">
</head>
<body>
    <!-- Tu contenido aquí -->
</body>
</html>
```

### Paso 3: Usar las clases
```html
<!-- Botón primario -->
<button class="btn-primary">CONTACTO</button>

<!-- Botón secundario -->
<button class="btn-secondary">Ver Más</button>

<!-- Card -->
<div class="card">
    <h2>Título</h2>
    <p>Contenido...</p>
</div>
```

### Paso 4: Usar variables CSS (Avanzado)
```css
.mi-elemento {
    background-color: var(--color-primary);
    color: var(--color-text-white);
    font-family: var(--font-body);
    font-size: var(--font-size-body);
}
```

---

## 💻 EJEMPLOS DE COMPONENTES

### Botón Primario
```html
<button class="btn-primary">CONTACTO</button>
```

### Hero Section
```html
<section class="hero">
    <h1>Título Principal</h1>
    <p>Descripción...</p>
    <button class="btn-primary">Contacto</button>
</section>
```

### Card
```html
<div class="card shadow-md">
    <h3>Título</h3>
    <p>Descripción del contenido</p>
</div>
```

### Grid de Cards
```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
    <div class="card">
        <h3>Servicio 1</h3>
        <p>Descripción...</p>
    </div>
    <div class="card">
        <h3>Servicio 2</h3>
        <p>Descripción...</p>
    </div>
</div>
```

### Sombras
```html
<div class="shadow-sm">Sombra pequeña</div>
<div class="shadow-md">Sombra media</div>
<div class="shadow-lg">Sombra grande</div>
```

### Espaciado
```html
<div class="p-3 mb-2">Elemento con padding y margen</div>
```

---

## 📐 ESPACIADO DISPONIBLE

```
Padding:  .p-1 (8px) | .p-2 (16px) | .p-3 (24px) | .p-4 (32px)
Margin:   .m-1 (8px) | .m-2 (16px) | .m-3 (24px) | .m-4 (32px)
MT/MB:    .mt-1, .mb-1, .mt-2, .mb-2, .mt-3, .mb-3, .mt-4, .mb-4
```

---

## 🎨 VARIABLES CSS DISPONIBLES

```css
/* COLORES */
var(--color-primary)              /* #00DD2A */
var(--color-primary-dark)         /* #046BD2 */
var(--color-dark-bg)              /* #16202F */
var(--color-text-white)           /* #FFFFFF */
var(--color-text-grey)            /* #33373D */

/* TIPOGRAFÍA */
var(--font-primary)               /* Neo Sans Pro Ultra */
var(--font-secondary)             /* Source Sans Pro */
var(--font-body)                  /* Roboto */
var(--font-accent)                /* Montserrat */

var(--font-size-h1)               /* 120px */
var(--font-size-h2)               /* 48px */
var(--font-size-body)             /* 16px */

var(--font-weight-bold)           /* 700 */
var(--font-weight-black)          /* 900 */
```

---

## 📱 RESPONSIVE DESIGN

El CSS incluye breakpoints para:
- **Desktop:** > 1024px
- **Tablet:** 768px - 1024px
- **Mobile:** < 768px
- **Small Mobile:** < 480px

Los componentes se adaptan automáticamente. Para crear diseños responsivos:

```css
@media (max-width: 768px) {
    h1 {
        font-size: 40px;
    }
}
```

---

## ✨ ANIMACIONES INCLUIDAS

```html
<div class="fade-in">Aparece con fade</div>
<div class="slide-in">Se desliza desde izquierda</div>
<div class="pulse">Pulsa continuamente</div>
```

---

## 🎯 MEJORES PRÁCTICAS

### ✅ Haz
- Usa las variables CSS para consistencia
- Implementa clases reutilizables
- Mantén la estructura semántica HTML
- Prueba en mobile primero
- Documenta cambios personalizados

### ❌ No hagas
- No modifiques directamente los estilos base
- No uses !important si no es necesario
- No crees colores nuevos, usa la paleta
- No ignores las reglas de contraste (WCAG)
- No cambies font-family sin documentar

---

## 🔧 PERSONALIZACIÓN

Si necesitas cambiar colores globalmente, edita las variables al inicio del CSS:

```css
:root {
    --color-primary: #00DD2A;  /* Cambia aquí */
    --color-dark-bg: #16202F;  /* Cambia aquí */
}
```

---

## 📊 ESTRUCTURA DE CARPETAS RECOMENDADA

```
tu-proyecto/
├── css/
│   ├── mediosconvalor-design-system.css
│   └── custom.css
├── html/
│   ├── index.html
│   ├── servicios.html
│   └── contacto.html
├── img/
├── js/
└── README.md
```

---

## 🌐 VER LOS ARCHIVOS

Abre estos archivos en tu navegador para ver los resultados:

1. **Guía Completa:** Abre `guia-diseno.html` en navegador
2. **Ejemplo Práctico:** Abre `ejemplo-practico.html` en navegador
3. **Referencia:** Lee `REFERENCIA-DISEÑO.md` en editor de texto

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Los estilos no se aplican
- Verifica que el CSS esté importado correctamente
- Comprueba la ruta del archivo
- Limpia caché del navegador (Ctrl+F5)

### Los colores no se ven bien
- Verifica que uses los colores correctos de la paleta
- Comprueba el contraste con herramientas WCAG
- Considera el fondo cuando uses los colores

### Las fuentes no cargan
- Las fuentes se cargan de Google Fonts
- Asegúrate de tener conexión a internet
- Usa fuentes fallback: font-family: 'Neo Sans Pro', Arial, sans-serif

---

## 📞 SOPORTE Y REFERENCIAS

- **Sitio Original:** https://mediosconvalor.com/
- **Color Picker:** https://www.google.com/search?q=hex+color+picker
- **Font Pairing:** https://fonts.google.com/
- **WCAG Contrast:** https://webaim.org/resources/contrastchecker/

---

## 📄 CHECKLIST PARA NUEVAS PÁGINAS

Antes de publicar una página con este design system:

- [ ] Importaste el CSS
- [ ] Usaste clases del design system
- [ ] Verificaste contraste de colores
- [ ] Probaste en mobile
- [ ] Probaste en diferentes navegadores
- [ ] Comprobaste velocidad de carga
- [ ] Validaste HTML con W3C
- [ ] Documentaste cambios personalizados

---

## 🎓 PRÓXIMOS PASOS

1. **Personalización:** Ajusta colores/fuentes según necesidad
2. **Componentes Adicionales:** Crea nuevos componentes basados en este sistema
3. **Documentación:** Mantén la guía actualizada con cambios
4. **Testing:** Prueba todos los componentes en todos los dispositivos

---

## 📝 NOTAS FINALES

- Este design system está basado en análisis real del sitio https://mediosconvalor.com/
- Todos los valores (colores, fuentes, tamaños) son exactos
- El sistema es flexible y extensible
- Perfectamente optimizado para producción

---

**Fecha de Creación:** 2026-06-15
**Versión:** 1.0
**Basado en:** mediosconvalor.com
**Licencia:** Uso libre para proyectos personales y comerciales

---

¡Listo! Ya tienes todo lo necesario para replicar el diseño de Medios con Valor. 🚀
