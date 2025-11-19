# 🎮 RePlay: Tienda de Segunda Mano

Este repositorio contiene el código *frontend* de **Replay**, una aplicación web para la gestión y visualización de productos de segunda mano, especializada en consolas y videojuegos.

La interfaz está construida con **React** y **Vite**, y estilizada al 100% con **Tailwind CSS**.

Este proyecto consume una API REST propia construida con **Node.js, Express y MongoDB**, que gestiona toda la lógica de negocio y la persistencia de datos.

## 🚀 Tecnologías Utilizadas

### Frontend
* **React**
* **Vite:** Como herramienta de *build* y servidor de desarrollo.
* **Tailwind CSS 4:** Para todo el diseño de la UI, usando el plugin `@tailwindcss/vite`.
* **React Router:** (Lo usaremos) Para la navegación entre páginas.

### Backend (Servidor Aparte)
* **Node.js**
* **Express:** Para la creación de la API REST.
* **MongoDB:** Como base de datos NoSQL.

---

## ✨ Características Principales

La aplicación se estructura en varias páginas y componentes clave:

* **Navegación Limpia:** Un `Layout` persistente que incluye un `Navbar` y un `Footer` en todas las páginas.
* **Página de Inicio (`/home`):**
    * Página de bienvenida y presentación.
    * Incluye un carrusel principal de novedades.
    * Muestra tarjetas con productos destacados (marcas, juegos populares, etc.).
* **Página de Tienda (`/tienda`):**
    * Es el núcleo funcional de la aplicación.
    * **Visualización de Productos:** Muestra todos los juegos y consolas disponibles en un *grid* de tarjetas.
    * **Operaciones CRUD completas:**
        * **Crear:** Permite añadir nuevos productos (juegos o consolas) a través de un formulario modal.
        * **Editar:** Modifica la información de productos existentes (incluyendo sus relaciones) en un modal.
        * **Eliminar:** Borra productos de la base de datos.
* **Modelo de Datos Relacional:**
    * **Gestión de Marcas (1:N):** Cada consola pertenece a una única marca (ej. Nintendo, Sony).
    * **Gestión de Plataformas (N:M):** Un juego puede estar disponible en múltiples consolas, implementado mediante un array de IDs.

---

## 📦 Instalación y Puesta en Marcha

1.  Clona este repositorio:
    ```bash
    git clone https://github.com/JKTrick75/Replay_Projecte1av_Frontend
    ```
2.  Navega a la carpeta del proyecto:
    ```bash
    cd nombre-del-proyecto
    ```
3.  Instala las dependencias de Node.js:
    ```bash
    npm install
    ```
4.  Inicia el servidor de desarrollo de Vite:
    ```bash
    npm run dev
    ```
5.  ¡Abre `http://localhost:5173` (o el puerto indicado) en tu navegador!

> **Importante:** Este proyecto (frontend) requiere que el servidor de **backend** (Node/Express) esté ejecutándose por separado para que las peticiones a la API funcionen correctamente.

---

## 🎓 Contexto

Este proyecto ha sido desarrollado por David Martínez Borderia, como parte de la asignatura de Proyecto Intermodular del 2º año de Desarrollo de Aplicaciones Web (1a AV).
