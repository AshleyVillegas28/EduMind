# Documentación de Cambios y Explicación del Código - EduMind

Este documento recopila y explica todos los pasos, correcciones y ajustes visuales realizados en tu proyecto web Angular "EduMind" hasta la fecha.

## 1. Correcciones de Inicialización y Enrutamiento (Archivos .ts)

### `src/app/app.ts` (Componente Principal)
- **Modificación:** Dado que te encuentras construyendo en Angular usando el nuevo formato "Standalone Components", las etiquetas personalizadas recién generadas `<app-header>` y `<app-footer>` marcaban error en la consola puesto que no eran reconocidas por el componente central (`app.html`).
- **Solución:** Se instruyó e importaron las clases lógicas de `Header` y `Footer` dentro del decorador principal `@Component` en el arreglo `imports: []`.

### `src/app/app.routes.ts` (Administración de Rutas)
- **Modificación:** Se redireccionó la experiencia del inicio de la aplicación para que obligatoriamente el usuario aterrice en la pantalla de inicio de sesión en lugar de ver un espacio en blanco genérico.
- **Solución:** Las rutas predeterminadas como la raíz vacía (`path: ''`) y las rutas inválidas o desconocidas (`path: '**'`) derivan directamente al componente `/login`. Se eliminó por petición personal el esquema, HTML, pruebas, la ruta y la carpeta base `pagina-principal`.

### `angular.json` y Manejo de Zonas
- **Modificación:** Angular levantaba un error oculto (`NG0908`) en la ventana de inspección causando que la compilación resultara en un documento Web completamente blanco y el elemento raíz vacío. Todo esto tras el despliegue del proyecto.
- **Solución:** Se requería la dependencia base que usa por defecto Angular para detectar cambios vitales de interfaz. Solucionamos eso mediante la ejecución terminal nativa `npm install zone.js` y adjuntamos implícitamente `"polyfills": ["zone.js"]` a la estructura del constructor principal en el `angular.json`.

---

## 2. Explicación de Métodos de Componentes Activos (Archivos .ts)

### Archivo `login.ts` (Lógica de Inicio)
Este archivo se encarga orgánicamente de manejar y procesar tus credenciales de paso:
- **`onSubmit()`:** Intercepta la acción de "clic" en el botón de Iniciar Sesión. En lugar de recargar el navegador, activa el servicio de autenticación `authService` con un temporizador emulado (1 segundo para el falso 'spinner' de carga de la web). Si todo concuerda, usa un puente hacia tu plataforma o arroja el mensaje en pantalla si alguien se equivoca.

### Archivo `header.ts` (Lógica Superior de Mando)
El cerebro visual constante ubicado horizontalmente.
- **`ngOnInit()`:** Esta función nativa de Angular levanta su acción al crearse el componente. Inicia la "suscripción" perpetua para que ante el mínimo cambio dentro y fuera del sistema tu Header inmediatamente cambie visualmente en estado de conectado/invitado, captando variables en forma de tuberías vivas (`authState$`).
- **`onAcercaDe()`:** Método conectado al evento de click de `Acerca de`. Lanza la advertencia web con base al concepto nativo de `alert('...')`.
- **`logout()`:** Invoca mecánicamente los interruptores del servicio local de la `auth`, eliminando virtualmente al usuario validado de la RAM web y redirigiendo hacia `/login`.
- **`ngOnDestroy()`:** Un cierre asíncrono para eliminar la suscripción del header el momento en que se decida no mostrarlo. Fundamental en Angular para evitar pérdidas y fugas de rendimiento en consumo por los eventos paralelos en escucha.

### Servicios Base (`auth.ts` / `global.ts`)
Los servicios son distribuidores de variables sin ataduras de los archivos y pantallas HTML. Se encargan del grueso de los procesamientos internos. 
- La arquitectura permite inyecciones limpias de variables de sistema (Nombre de la Red `Global`) o de los interruptores que se nutren desde cualquier lado como `.login()` con los parámetros (`username, password`), todo accesible uniformemente por tus componentes sueltos mediante el constructor privado.

---

## 3. Lógica Estructural Visual y HTML

### Solución al Recorte del Gráfico "EduMind" 
- **Problema en `header.html` y `header.css`:** Debido a las propiedades del fondo gradiente (`-webkit-background-clip: text`), los navegadores cortan drásticamente los filos inferiores de las letras en "EduMind".
- **Solución:** Se liberó el borde forzado inferior configurando una holgura a las letras mediante `padding-bottom: 0.1em;` junto con el aumento del margen intralingüe `line-height: 1.2`, salvando visualmente la parte inferior de tus palabras curvas.

### Transformación Integral a "Celeste Agua / Verde Limón"
Se erradicó por completo el sombrío color violeta por defecto de las herramientas automáticas de Tailwind o Componentes UI e inyectamos los colores institucionales que reflejan vibración basándonos fielmente en la marca ("Centro Médico Eva").
- **`app.css` & `footer.css`:** Todo lo referente a envoltorios o cabeceras maestras abandonan el morado oscuro adoptando una matriz acuosa sólida o en gradientes profundos (`#036b85`), brindando pulcritud de diseño al borde de la ventana.
- **`login.css`:** Los focos dinámicos en donde sitúas tu mouse de ahora en adelante destellarán auras y contornos `Celestes` (`#00a8cc` `rgba(0, 168, 204, 0.1)`).
- **Botones y el isotipo Textual de `header.css`:** Para contrastar con este vasto esquema turquesa, el "Botón Enviar" o el mismísimo texto del Título Web ("EduMind") adquirieron el brillo fluorescente y atrayente del `Verde Limón` puro bajo trazos dinámicos de (`linear-gradient(135deg, #8ce02f 0%, #6BA323 100%)`). Sus sombras pasaron de tonos azules opacos a verdes vibrantes.

### Módulo 5 - Buzón de Consultas Anónimas
**Responsable:** Domenica Rosales Galarza

**Componente:** `buzon-anonimo`

**Descripción:**  
Sistema que permite a los estudiantes enviar preguntas de forma completamente 
anónima y visualizar las respuestas en un Muro de Dudas público.

**Funcionalidades implementadas:**
- Formulario anónimo con selección de categoría y validación de campos
- Contador de caracteres en tiempo real (límite 500)
- Simulación de envío asíncrono con estado de carga
- Las preguntas enviadas aparecen automáticamente en el Muro de Dudas
- Muro de Dudas con búsqueda en tiempo real y filtros por categoría
- Navegación fluida entre vistas (Buzón / Muro) sin cambio de ruta

**Tecnologías/conceptos Angular aplicados:**
- `*ngIf`, `*ngFor`, `[(ngModel)]`, `[ngClass]`, `[class.activo]`
- `signal()` para el contador de caracteres
- Getter computado (`get preguntasFiltradas()`) para filtrado reactivo
- `BehaviorSubject` no requerido — estado local del componente

**Diseño:**
- Paleta púrpura (confianza y privacidad) siguiendo la guía visual de EduMind
- Hover effects, animaciones CSS y diseño responsive (mobile-first)