# DATOS DEL MÓDULO

Nombre del proyecto: EduMind

Nombre del módulo: ModuloCitasC

Responsable: Clarissa Centeno Gonzaga

Materia: Desarrollo Web Avanzado (o afín)

Descripción del módulo:
El `ModuloCitasC` es un componente integral de la plataforma EduMind, concebido para brindar un ecosistema completo de agendamiento y gestión de citas psicológicas. Este módulo guía al usuario a través de un flujo estructurado: desde la exploración y selección de un profesional de la salud mental, pasando por un formulario reactivo para reservar la sesión, hasta llegar a un panel de control personalizado (`mis-citas`) donde el estudiante puede administrar, filtrar y cancelar sus compromisos. La arquitectura destaca por la interconexión de sus componentes mediante el estado del enrutador de Angular y la centralización de datos a través de servicios inyectables.

Funciones principales:
- Visualización interactiva y selección de profesionales de la salud mental (Psicólogos).
- Formularios de agendamiento con persistencia de datos seleccionados previamente (paso de parámetros vía Router State).
- Tablero de gestión de citas (`Mis Citas`) con capacidades de filtrado dinámico (Todas, Pendientes, etc.) y acciones de cancelación.

Tecnologías utilizadas:
- Angular (Standalone Components, Router State)
- TypeScript (Programación orientada a objetos, Interfaces)
- HTML5 (Estructuras semánticas, interpolación)
- CSS3 (Diseño responsivo, Grid/Flexbox)
- Formularios (`FormsModule` / `ngModel`)

---

# ESTRUCTURA OBLIGATORIA DEL MANUAL

# 1. Descripción General
## 1.1 Objetivos del módulo
El `ModuloCitasC` tiene como objetivo primordial reducir las barreras de acceso a los servicios de apoyo psicológico para la comunidad estudiantil. Técnicamente, busca establecer un flujo de navegación multi-paso (Wizard) altamente responsivo y sin recargas de página. Al utilizar patrones modernos de Angular como el manejo de estado en las rutas (`navigation.extras.state`) y servicios Singletons (`CitasService`), el módulo persigue mantener la persistencia y la consistencia de los datos del usuario durante toda su sesión, asegurando que la experiencia de reservar o cancelar una cita sea intuitiva, rápida y a prueba de errores.

# 2. Estructura del Componente
Debido a la naturaleza del flujo de trabajo, este módulo consta de una triada de componentes interconectados bajo la arquitectura *Standalone Component*:
- **SeleccionarProfesionalComponent**: El punto de entrada. Presenta un catálogo de psicólogos usando arrays locales estáticos como fuente de datos temporal.
- **AgendarCitaComponent**: El formulario de captura. Utiliza Two-Way Data Binding para recolectar la fecha, hora y motivo de la consulta.
- **MisCitasComponent**: El panel de revisión. Inyecta el servicio de citas para iterar el historial y provee herramientas de filtrado de arreglos.

# 3. TypeScript — Lógica del Componente

## 3.1 Interfaces utilizadas
Para asegurar un diseño robusto (Type Safety), el módulo se apoya en dos contratos fundamentales:
```typescript
export interface Psicologo {
  id: string;
  nombre: string;
  especialidad: string;
  rating: string;
  experiencia: string;
  avatar: string;
  disponibilidad: string;
}

export interface Cita {
  id: string;
  estudianteId: string;
  psicologoNombre: string;
  psicologoEspecialidad: string;
  modalidad: string;
  fecha: string;
  hora: string;
  motivo: string;
  estado: string;
}
```
Estas interfaces dictaminan la forma exacta que deben tener los objetos al viajar entre los componentes y el servicio, previniendo errores de asignación en tiempo de compilación.

## 3.2 Variables de estado
En el componente **MisCitasComponent**, el estado se controla a través de:
- `todasLasCitas: Cita[]`: Contiene la copia inmutable en memoria del historial completo devuelto por el servicio.
- `citasFiltradas: Cita[]`: Una vista secundaria (Proxy array) que es la que verdaderamente itera el DOM. Altera su contenido según el estado de los filtros.
- `filtroActual: string`: Bandera reactiva que indica el estado del segmentador ('Todas', 'Pendiente', 'Completada', etc.).

En el **AgendarCitaComponent**, el estado recae en:
- `nuevaCita: Cita`: Un objeto inicializado que se vincula bidireccionalmente con el formulario de la vista.

## 3.3 Métodos principales
- `seleccionarPsicologo(psicologo: Psicologo)`: Se dispara al elegir un doctor. Emplea la API de enrutamiento de Angular para cambiar de vista, encapsulando el objeto seleccionado en el historial del navegador: `this.router.navigate(['/agendar-cita'], { state: { psicologo } });`.
- `guardarCita()`: Verifica la completitud del formulario evaluando propiedades (`fecha`, `hora`, `motivo`). Si es válido, inyecta el objeto `nuevaCita` al `CitasService` y redirige al panel de administración.
- `filtrar(estado: string)`: Algoritmo de segregación. Si el estado es 'Todas', iguala el arreglo mostrado al original. De lo contrario, ejecuta `Array.prototype.filter()` sobre las citas almacenadas.

## 3.4 Getters o propiedades calculadas
Al igual que en muchos componentes de presentación orientados a eventos, las propiedades calculadas se delegan a funciones explícitas como `filtrar()`. Esto garantiza que el DOM solo se repinte cuando el usuario toma una acción directa (hacer click en una pestaña de filtro), optimizando el rendimiento general del motor de renderizado de Angular.

## 3.5 Métodos auxiliares
- El `constructor()` de `AgendarCitaComponent` actúa de manera auxiliar recuperando el estado oculto del Router (`this.router.getCurrentNavigation()`). De esta forma, auto-completa el formulario con el nombre y especialidad del psicólogo sin depender de parámetros URL visibles (`?id=psi_1`).
- `cancelarCita(id: string)`: Método destructor que invoca una ventana nativa de confirmación (`confirm()`) antes de ejecutar el borrado lógico a través del servicio, seguido de una recarga de la lista local (`cargarCitas()`).

# 4. HTML — Plantilla del Componente

## 4.1 Estructura general
Las plantillas se dividen semánticamente:
- **Catálogos**: Uso extensivo de contenedores de tarjetas (Cards) iteradas en cuadrícula.
- **Formulario**: Estructura de bloque `<form>` con grupos de entradas de datos (`input`, `select`, `textarea`) separados lógicamente por etiquetas (labels).
- **Tablero**: Cabecera con segmentadores (Tabs) tipo pastilla (Pills), seguido de un área de contenido en lista para mostrar el histórico de citas.

## 4.2 Directivas de Angular utilizadas
Al emplear `CommonModule` y componentes *Standalone*, se utilizan intensamente directivas estructurales:
- `*ngFor="let psi of psicologos"`: Clona el bloque HTML de la tarjeta de perfil para cada objeto detectado en el array estático.
- `*ngIf="citasFiltradas.length === 0"`: Directiva condicional fundamental para el manejo de "Empty States" (Estados vacíos), desplegando un mensaje amigable cuando el usuario no tiene compromisos agendados en ese filtro.

## 4.3 Binding de datos
- **Interpolación (`{{ }}`)**: Inyecta datos crudos como el `psi.nombre` o `psi.experiencia` directo en el marcado HTML.
- **Two-Way Binding (`[(ngModel)]`)**: Sincroniza al milisegundo los campos del input fecha, hora y selectores directamente con las propiedades correspondientes del objeto `nuevaCita` en TypeScript.
- **Event Binding (`(click)="..."`)**: Atrapa las interacciones del ratón para iniciar el flujo, someter el formulario o cambiar de filtro.

# 5. CSS — Estilos del Componente

## 5.1 Variables CSS
El diseño confía en variables abstractas (`--color-primario`, `--radio-borde`, `--sombras`) para mantener la homogeneidad visual de EduMind, centralizando el aspecto y reduciendo la redundancia de código en los tres archivos `.css` del módulo.

## 5.2 Paleta de colores del módulo
Se implementa una psicología de color orientada a la tranquilidad y la salud:
- Tonos fríos (Azules, Púrpuras o Verdes agua) para transmitir paz y profesionalismo en la selección médica.
- Colores de Alerta (Rojos/Anaranjados) reservados estrictamente para la acción destructiva de `(Cancelar Cita)`.
- El estado "Pendiente" suele representarse con colores neutros (Gris o Amarillo Suave), mientras que las citas completadas podrían inclinarse a tonos verde pálido.

## 5.3 Animaciones CSS
Las transiciones recaen en las pseudo-clases, definiendo `transition: all 0.3s ease` de forma global para suavizar cambios de fondo o de bordes al momento de la interacción.

## 5.4 Hover effects
- **Tarjetas de Psicólogo**: Al posar el mouse, se implementa una traslación hacia el eje superior (`transform: translateY(-5px)`) acompañada de un endurecimiento de la sombra (`box-shadow`), dando un efecto táctil (Material Design).
- **Pestañas de Filtro**: Los botones que actúan como pestañas alteran su fondo y color de texto para reafirmar al usuario cuál es la vista activa (`.activo`).

## 5.5 Diseño Responsive
La estructura se vuelve fluida utilizando Flexbox o CSS Grid (e.g., `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`). Esto provoca que, en un dispositivo móvil, la disposición del panel de "Mis Citas" o del catálogo de doctores colapse elegantemente en una sola columna vertical apilada, maximizando el espacio de lectura.

# 6. Flujo de Uso del Módulo

## 6.1 Flujo principal del usuario
1. El estudiante ingresa a la plataforma y hace clic en "Agendar Cita".
2. Angular enruta a `SeleccionarProfesionalComponent`. Se despliega la lista de doctores.
3. El usuario evalúa ratings y disponibilidad, luego pulsa en "Agendar con este profesional".
4. El sistema enruta hacia `AgendarCitaComponent` enviando los datos del psicólogo en memoria.
5. El usuario ve los datos precargados del doctor y procede a llenar fecha, hora y motivo. Pulsa "Guardar Cita".
6. El sistema guarda la cita (vía Service) y redirecciona automáticamente a `MisCitasComponent`.
7. El usuario ve su cita recién creada bajo la pestaña de "Todas" o "Pendientes".

## 6.2 Acciones secundarias o complementarias
- **Cancelación de Citas**: El usuario se encuentra en el panel de `MisCitasComponent`, ubica una cita próxima, hace clic en "Cancelar Cita", confirma la advertencia del navegador y la cita desaparece permanentemente del registro.
- **Búsqueda focalizada**: El usuario usa los filtros superiores (Pills) para ocultar las citas pasadas y concentrarse visualmente solo en las que tienen estado "Pendiente".

# 7. Decisiones de Diseño
- **Transferencia de Estado por Router**: En lugar de usar servicios complejos para un flujo tan corto (Seleccionar -> Agendar), se optó por la API `history.state` del enrutador de Angular. Esto es extremadamente ligero, evita colisiones de datos si el usuario abre múltiples pestañas y limpia la memoria automáticamente al concluir la navegación.
- **Modularidad del Panel de Citas**: Separar la vista del catálogo de psicólogos de la vista de "Mis Citas" otorga al estudiante un entorno limpio para hacer seguimiento de sus actividades (Tracking) sin distraerlo con la funcionalidad de reservar.

# 8. Dependencias e Integración

## 8.1 Módulos Angular importados
- `RouterModule`: Indispensable en todo el módulo. Se necesita para habilitar el enrutamiento mediante TypeScript (`router.navigate()`) y leer parámetros de navegación actual.
- `FormsModule`: Requerido en la vista de agendamiento para dotar de reactividad a los controles de formulario (`ngModel`).
- `CommonModule`: Utilizado universalmente en Angular Standalone para el control estructural del DOM (`ngIf`, `ngFor`).

## 8.2 Integración con el proyecto
El módulo no opera de forma aislada; depende estructuralmente del `CitasService`. Este servicio Inyectable actúa como repositorio global temporal. Centraliza la creación (`agendarCita()`), lectura (`obtenerCitas()`) y destrucción (`cancelarCita()`) de los datos en memoria, permitiendo que el panel de control se alimente de la misma fuente de la verdad (Source of Truth) que el formulario.

# 9. Resumen Técnico
El `ModuloCitasC` es un ejemplo avanzado del desarrollo orientado a flujos (Flow-Driven Design). Sobresale por el uso elegante y performante del **Router State** de Angular para traspasar objetos de dominio entre vistas sin congestionar la URL con identificadores. Implementa Two-Way Data Binding para agilizar el llenado de datos por parte del usuario, y orquesta lógicas de filtrado de colecciones reactivas altamente eficientes en el Frontend. Mediante la inyección de servicios, garantiza una gestión de estado centralizada que provee a la plataforma EduMind un subsistema de citas médicas completo, rápido, mantenible y alineado a las normativas de arquitectura de software contemporáneo.
