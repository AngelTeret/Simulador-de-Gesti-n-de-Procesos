# Simulador de Gestión de Procesos en Memoria

## Descripción del Proyecto
Este proyecto es un simulador interactivo que representa cómo se gestionan los procesos en la memoria de un sistema.  
Permite crear procesos manualmente o de forma aleatoria, asignando memoria y duración de ejecución. El sistema administra automáticamente la ejecución de los procesos, 
la memoria utilizada y una cola de espera cuando no hay suficiente memoria disponible.

El simulador incluye:
- Visualización en tiempo real de la memoria usada, disponible y total.
- Lista de procesos en ejecución con barra de progreso.
- Cola de espera para procesos que no pueden ejecutarse por falta de memoria.
- Registro de eventos que muestra cada acción (inicio, espera, finalización) con marca de tiempo.
- Generación aleatoria de procesos con nombres y valores predeterminados.

---

## Tecnologías Utilizadas
- HTML → Estructura de la página y elementos de la interfaz.
- CSS → Estilos, diseño responsivo y personalización visual.
- JavaScript  → Lógica del simulador, control de procesos, actualizaciones en tiempo real.


Nota: No se utilizó ningún framework, únicamente HTML, CSS y JavaScript puro.

---

## Instalación y Uso

### 1. Clonar el Repositorio

git clone https://github.com/AngelTeret/Simulador-de-Gesti-n-de-Procesos.git


### 2. Abrir el Proyecto
- Ubicarse en la carpeta clonada:
cd Simulador-de-Gesti-n-de-Procesos

- Abrir el archivo index.html en cualquier navegador web moderno (Chrome, Firefox, Edge, etc.).

### 3. Uso del Simulador
1. Crear un proceso manualmente  
   - Ingresar un nombre (opcional).
   - Asignar la memoria en MB.
   - Definir la duración en segundos.
   - Presionar "Agregar Proceso".
   
2. Generar proceso aleatorio  
   - Presionar el botón "Generar Aleatorio" para que el simulador cree un proceso con valores aleatorios.

3. Visualizar información  
   - La sección Estado de Memoria muestra cuánta memoria está en uso y disponible.
   - La tabla Procesos en Ejecución indica los procesos activos y su progreso.
   - La Cola de Espera lista procesos que esperan memoria disponible.
   - El Log de Eventos registra cada acción con hora exacta.

---

## Capturas de Pantalla del Funcionamiento
Imagenes alojadas en Google Drive en los siguientes enlaces.

Imagenes:
- [Vista General del Simulador](https://drive.google.com/drive/folders/1juaoO8_7F1zdrUexStOVo-hBdioRRPtQ?usp=sharing)
- [Procesos en Ejecución y en Cola](https://drive.google.com/drive/folders/1juaoO8_7F1zdrUexStOVo-hBdioRRPtQ?usp=sharing)
- [Estado Actual de la Memoria RAM](https://drive.google.com/drive/folders/1ieXjhW4jphf6UjK2PVMLkj6rxORzeyou?usp=sharing)

---

## Autor
Proyecto desarrollado por el grupo No.4 según los requerimientos del proyecto 1.