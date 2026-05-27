# 📱 Pokedex - Mobile App

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Capacitor](https://img.shields.io/badge/capacitor-%23119EFF.svg?style=for-the-badge&logo=capacitor&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

Una aplicación móvil estilo Pokedex nostálgica y moderna, desarrollada con tecnologías web y convertida a nativa para Android. Ofrece una experiencia inmersiva para explorar Pokémon de **todas las generaciones (Gen 1 - Gen 9)**, con información detallada, narración por voz y efectos de sonido.

## 🚀 Características Principales

### 🔴 Funciones Principales
*   **Soporte Multi-Generación**: Acceso a la base de datos de Pokémon desde Kanto (Gen 1) hasta Paldea (Gen 9).
*   **Detalles Exhaustivos**:
    *   Sprites (pixel art y oficiales) y tipos traducidos.
    *   Estadísticas Base, Habilidades (incluyendo ocultas) y Movimientos.
    *   **Narración de Voz (Text-to-Speech)**: La Pokedex "lee" la descripción del Pokémon, simulando la experiencia del anime/juego gracias a integraciones nativas.
*   **Selección de Generación**: Interfaz dedicada para navegar fácilmente entre las distintas generaciones de Pokémon, Objetos y Ubicaciones.
*   **Efectos de Sonido**: Interfaz reactiva con sonidos para navegación, selección y eventos (con control de volumen).
*   **Localización Total**: Textos, ataques y datos completamente en español.

### 🗺️ Exploración y Mapas
*   **Mapas Interactivos**:
    *   **Kanto**: Visualización clásica en pixel art con líderes de gimnasio y medallas.
    *   **Paldea**: Nuevo mapa de la región de la 9ª generación.
    *   **Interacción**: Al seleccionar ubicaciones o líderes, el mapa reacciona para mostrar información relevante.
*   **Mochila de Objetos**:
    *   Lista visual de objetos clasificados por generación.
    *   Detalles y descripciones en español.

### 🎮 Controles y Navegación
La aplicación simula la experiencia de una Pokedex física:
*   **Pad Direccional (D-Pad)**: Navegación por listas y scroll vertical.
*   **Botón de Inicio**: Regreso rápido al menú principal.
*   **Soporte Nativo en Android**: Integración del **botón físico de retroceso** del dispositivo, permitiendo navegar hacia atrás de forma fluida o salir de la app desde la pantalla principal.
*   **Indicadores Visuales**: Luces y animaciones (como los ojos de Rotom) que reaccionan a la voz y acciones.

## 🛠️ Tecnologías Utilizadas

### Frontend
*   **[React 19](https://react.dev/)**: Librería principal para la UI.
*   **[Vite](https://vitejs.dev/)**: Entorno de desarrollo ultrarrápido.
*   **[Styled Components](https://styled-components.com/)**: Estilizado dinámico y theming.
*   **[Framer Motion](https://www.framer.com/motion/)**: Animaciones fluidas, transiciones de página y micro-interacciones.
*   **[React Router 7](https://reactrouter.com/)**: Navegación SPA fluida.
*   **[Axios](https://axios-http.com/)**: Cliente HTTP para consumir la [PokeAPI](https://pokeapi.co/).

### Móvil / Nativo
*   **[Capacitor 8](https://capacitorjs.com/)**: Runtime nativo multiplataforma.
    *   `@capacitor-community/text-to-speech`: Para la síntesis de voz nativa.
    *   `@capacitor/app`: Para manejar el ciclo de vida de la aplicación y el botón físico de retroceso.
*   **Android Studio**: Compilación, testing nativo y despliegue en Android.

## 📦 Instalación y Ejecución

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```
2.  **Modo Desarrollo (Web)**:
    ```bash
    npm run dev
    ```
3.  **Sincronizar y Abrir en Android**:
    ```bash
    npm run build
    npx cap sync
    npx cap open android
    ```

---
*Desarrollado con ❤️ para entrenadores Pokémon.*
