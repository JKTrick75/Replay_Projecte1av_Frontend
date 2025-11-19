# 🎮 Replay: Tienda de Segunda Mano (Frontend)

> **Live Demo:** [Ver Aplicación Desplegada en AWS Amplify](https://main.d30682b0n15jlt.amplifyapp.com/) 🚀

Este repositorio contiene el código *frontend* de **Replay**, una aplicación web moderna para la gestión y visualización de productos de segunda mano, especializada en consolas y videojuegos.

La interfaz está construida con **React 19** y **Vite**, estilizada con **Tailwind CSS 4** y se comunica con una API REST externa.

---

## 🔗 Enlaces del Proyecto

Este proyecto se divide en dos repositorios:

* **🖥️ Frontend (Este repositorio):** Interfaz de usuario (React + Vite).
* **⚙️ Backend API:** [Ir al Repositorio del Backend](https://github.com/JKTrick75/Replay_Projecte1av_Backend) - Servidor Node.js/Express + MongoDB.

---

## 🚀 Tecnologías Utilizadas

* **Core:** React 19, Vite.
* **Estilos:** Tailwind CSS 4 (con plugin `@tailwindcss/vite`).
* **Routing:** React Router DOM v6 (navegación SPA).
* **Iconos:** Font Awesome (vía CDN Kit).
* **Componentes UI:** Swiper.js (Carruseles), Modales personalizados, Formularios con Hooks propios.
* **Despliegue:** AWS Amplify (CI/CD conectado a GitHub).

---

## ✨ Características Principales

* **Navegación Fluida:** Arquitectura SPA (*Single Page Application*) con `Layout` persistente (Navbar/Footer fijos).
* **Página de Inicio (`/`):**
    * **Carrusel Hero:** Slider interactivo con las novedades destacadas.
    * **Secciones Dinámicas:** Listados de marcas y juegos populares obtenidos de la API.
* **Tienda (`/tienda`):**
    * **Filtrado Inteligente:** Filtra productos por Consola o Marca directamente desde la URL (`?consola=ID`, `?marca=ID`).
    * **Grid de Productos:** Visualización responsive de tarjetas de producto.
    * **CRUD Completo:**
        * **Crear:** Modal con validación para añadir nuevos juegos (con selector de consolas agrupadas).
        * **Editar:** Edición en tiempo real de datos y relaciones.
        * **Eliminar:** Borrado de productos con confirmación.
* **Seguridad:** Comunicación segura mediante HTTPS (gracias a AWS CloudFront en el backend).

---

## 📦 Instalación y Puesta en Marcha

Si quieres ejecutar este proyecto en local:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/JKTrick75/Replay_Projecte1av_Frontend](https://github.com/JKTrick75/Replay_Projecte1av_Frontend)
    cd Replay_Projecte1av
    ```

2.  **Instala dependencias:**
    ```bash
    npm install
    ```

3.  **Configura la API:**
    Abre `src/pages/Tienda.jsx` y `src/pages/Home.jsx` y asegúrate de que la variable `API_URL` apunta a tu servidor backend (local o producción):
    ```javascript
    // Para local:
    // const API_URL = 'http://localhost:8080';
    
    ```

4.  **Arranca el servidor:**
    ```bash
    npm run dev
    ```

5.  **¡Listo!** Abre `http://localhost:5173` en tu navegador.

> **Nota:** Necesitas tener el servidor Backend corriendo para que la web muestre datos.

---

## 🎓 Contexto

Este proyecto ha sido desarrollado por **David Martínez Borderia**, como parte de la asignatura de Proyecto Intermodular del 2º año de Desarrollo de Aplicaciones Web (1a AV).
