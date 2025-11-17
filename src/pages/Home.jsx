import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturedCard from '../components/FeaturedCard';

//Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

//URL de la API
const API_URL = 'http://localhost:8080';

//Datos Cards Marcas
const marcasDestacadas = [
  { id: 'marca-1', nombre: 'Nintendo', img: '/img/marcas/nintendo-bg.jpg', link: '/tienda?marca=Nintendo' },
  { id: 'marca-2', nombre: 'PlayStation', img: '/img/marcas/playstation-bg.jpg', link: '/tienda?marca=Sony' },
  { id: 'marca-3', nombre: 'Xbox', img: '/img/marcas/xbox-bg.jpg', link: '/tienda?marca=Microsoft' }
];

//Definimos carrousel
const slidesData = [
  {
    id: 1,
    img: '/hero-carrousel1.webp',
    titulo: 'Los Juegos más Buscados',
    subtitulo: 'Encuentra clásicos y novedades al mejor precio.',
    link: '/tienda' //Link
  },
  {
    id: 2,
    img: '/hero-carrousel2.jpg',
    titulo: 'Consolas Retro Disponibles',
    subtitulo: 'Revive la nostalgia con nuestra colección.',
    link: '/tienda?categoria=consolas' //Link
  },
  {
    id: 3,
    img: '/hero-carrousel3.jpg',
    titulo: '¡Vende tu material!',
    subtitulo: 'Gana dinero con los juegos que ya no usas.',
    link: '/tienda' //Link
  }
];

function Home() {
  //State JuegosPopulares
  const [juegosPopulares, setJuegosPopulares] = useState([]);
  //State Consolas carrousel
  const [consolas, setConsolas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Hacemos fetch de juegos Y consolas
        const [juegosResponse, consolasResponse] = await Promise.all([
          fetch(`${API_URL}/juego`),
          fetch(`${API_URL}/consola`)
        ]);

        const juegosData = await juegosResponse.json();
        const consolasData = await consolasResponse.json();
        
        //Guardamos los 3 juegos populares
        if (juegosData.ok && Array.isArray(juegosData.resultado)) {
          const primerosTresJuegos = juegosData.resultado.slice(0, 3);
          setJuegosPopulares(primerosTresJuegos);
        }
        
        //Guardamos TODAS las consolas
        if (consolasData.ok && Array.isArray(consolasData.resultado)) {
          setConsolas(consolasData.resultado);
        }
        
      } catch (error) {
        console.error("Error al cargar datos de la home:", error);
      }
    };

    fetchData();
  }, []); //El [] hace que solo se ejecuta 1 vez al inicio


  return (
    <div>
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-[#444444]">Bienvenido a Replay</h1>
        <p className="text-2xl text-[#666666] mb-8">Tu tienda de juegos y consolas de segunda mano.</p>
        
        {/* Carrusel principal SWIPER */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="rounded-sm md:h-96 lg:h-[550px]"
        >
          {/* Mapeamos el nuevo array 'slidesData' */}
          {slidesData.map(slide => (
            <SwiperSlide key={slide.id}>
              
              {/* Cada "slide" será un link para redirigir */}
              <Link to={slide.link} className="block w-full h-full relative text-white">
                
                {/* Cargamos imagen como fondo absoluto */}
                <img 
                  src={slide.img} 
                  alt={slide.titulo} 
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                
                {/* Contenedor texto (con un fondo oscuro para legibilidad) */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/20 p-4">
                  <h2 className="text-4xl md:text-5xl font-bold">
                    {slide.titulo}
                  </h2>
                  <p className="text-lg md:text-xl mt-2">
                    {slide.subtitulo}
                  </p>
                </div>

              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* === SECCIÓN CONSOLAS === */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-[#444444] text-center">
          Explora por Consola
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          //Responsive
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }, 
          }}
          spaceBetween={30}
          loop={consolas.length > 4}
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-12" 
        >
          {consolas.map(consola => (
            <SwiperSlide key={consola._id}>
              <FeaturedCard
                titulo={consola.nom}
                // (Necesitarás una imagen por defecto o un campo 'foto' en tu modelo de Consola)
                imagenFondo={consola.foto || '/img/consolas/default-bg.jpg'} 
                linkTo={`/tienda?consola=${consola._id}`} // Link con filtro
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* === SECCIÓN MARCAS === */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-[#444444] text-center">
          Marcas Destacadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mapeamos los datos ESTÁTICOS */}
          {marcasDestacadas.map(marca => (
            <FeaturedCard
              key={marca.id}
              titulo={marca.nombre}
              imagenFondo={marca.img}
              linkTo={marca.link}
            />
          ))}
        </div>
      </div>

      {/* === SECCIÓN JUEGOS POPULARES === */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-[#444444] text-center">
          Juegos Populares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mapeamos los datos DINÁMICOS (del fetch) */}
          {juegosPopulares.map(juego => (
            <FeaturedCard
              key={juego._id}
              titulo={juego.nom}
              imagenFondo={juego.foto || '/img/marcas/default-bg.jpg'} // Usamos la foto del juego
              linkTo={`/tienda`} // (O podrías hacer un link a /juego/juego._id)
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;