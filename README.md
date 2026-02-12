# 📱 Pokedex Gen 1 - Mobile App

Una aplicación móvil estilo Pokedex clásica desarrollada con tecnologías web modernas y convertida a nativa para Android. Muestra los 151 Pokémon originales de la primera generación con información detallada, estadísticas, movimientos y mucho más, todo completamente en español.

## 🚀 Características Principales

### 🔴 Funciones Principales
*   **Generación 1 Completa**: Acceso a la base de datos de los 151 Pokémon originales (Kanto).
*   **Detalles Exhaustivos**:
    *   Sprite (pixel art) y tipos traducidos.
    *   Estadísticas Base (HP, Ataque, Defensa, Velocidad, etc.).
    *   **Habilidades**: Incluyendo indicador de habilidades ocultas (O).
    *   **Movimientos**: Lista completa de movimientos aprendibles en la 1ª Generación.
*   **Localización Total**: Nombres de ataques, habilidades, tipos y estadísticas completamente en español.

### 🗺️ Exploración y Objetos
*   **Mapa Interactivo de Kanto**:
    *   Visualización de la región de Kanto en estilo pixel art.
    *   **Gimnasios y Líderes**: Información detallada de los 8 líderes de gimnasio.
    *   **Medallas**: Visualización de las medallas obtenidas.
    *   **Interacción**: Al seleccionar un líder, se resalta su ciudad en el mapa.
*   **Mochila de Objetos**:
    *   Lista visual de objetos clásicos (Pociones, Pokéballs, Piedras evolutivas).
    *   Detalles y descripciones en español al pulsar sobre cada objeto.

### 🎮 Controles y Navegación
La aplicación simula la experiencia de una Pokedex real:
*   **Pad Direccional (D-Pad)**:
    *   ⬆️ ⬇️ **Arriba/Abajo**: Scroll vertical en cualquier pantalla.
    *   ⬅️ ➡️ **Izquierda/Derecha**: Cambiar de página en la lista de Pokémon (Anterior/Siguiente).
*   **Botón de Inicio (Negro)**: Situado en la esquina inferior izquierda, permite volver al **Menú Principal** desde cualquier sección.
*   **Luz Azul (Header)**: Indicador visual interactivo.

## 🛠️ Tecnologías Utilizadas

### Frontend
*   **[React](https://reactjs.org/)**: Librería principal para la interfaz de usuario.
*   **[Vite](https://vitejs.dev/)**: Empaquetador y entorno de desarrollo ultrarrápido.
*   **[Styled Components](https://styled-components.com/)**: Para estilos CSS-in-JS y el sistema de temas.
*   **[Framer Motion](https://www.framer.com/motion/)**: Para las animaciones de transición y efectos de interfaz.
*   **[React Router](https://reactrouter.com/)**: Para el enrutamiento y navegación entre vistas.
*   **[Axios](https://axios-http.com/)**: Para el consumo de la PokeAPI.

### Móvil / Nativo
*   **[Capacitor](https://capacitorjs.com/)**: Runtime para convertir la web app en una aplicación nativa de Android.
*   **Android Studio**: Para la compilación y ejecución en dispositivos Android.

## 📦 Instalación y Ejecución

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```
2.  **Modo Desarrollo (Web)**:
    ```bash
    npm run dev
    ```
3.  **Compilar para Android**:
    ```bash
    npm run build
    npx cap sync
    npx cap open android
    ```

---
Desarrollado con ❤️ para fans de Pokémon.
