import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    FaArrowRight,
    FaDownload,
    FaFire,
    FaGamepad,
    FaGhost,
    FaRocket
} from 'react-icons/fa'
import '../styles/Home.css'

const banners = [
    {
        titulo: 'Explora nuevos mundos',
        descripcion: 'Encuentra videojuegos de acción, aventura, terror y más dentro del catálogo de SteamNT.',
        imagen: '/images/banner-1.jpeg'
    },
    {
        titulo: 'Crea tu biblioteca',
        descripcion: 'Guarda tus juegos favoritos y accede a ellos desde tu cuenta.',
        imagen: '/images/banner-2.png'
    },
    {
        titulo: 'Publica tus propios juegos',
        descripcion: 'Comparte tus creaciones y administra tus juegos como desarrollador.',
        imagen: '/images/banner-3.png'
    }
]

const categorias = [
    {
        nombre: 'Acción',
        icono: <FaFire />,
        imagen: '/images/home/category-action.jpg'
    },
    {
        nombre: 'Aventura',
        icono: <FaGamepad />,
        imagen: '/images/home/category-adventure.jpg'
    },
    {
        nombre: 'Terror',
        icono: <FaGhost />,
        imagen: '/images/home/category-horror.jpg'
    },
    {
        nombre: 'Indie',
        icono: <FaRocket />,
        imagen: '/images/home/category-indie.jpg'
    }
]

const eventos = [
    {
        titulo: 'Semana Indie',
        descripcion: 'Explora proyectos nuevos creados por desarrolladores independientes.',
        imagen: '/images/home/event-indie-week.jpg'
    },
    {
        titulo: 'Ofertas de aventura',
        descripcion: 'Juegos seleccionados con promociones por tiempo limitado.',
        imagen: '/images/home/event-adventure-sale.jpg'
    }
]

const masDescargados = [
    {
        titulo: 'Minecraft',
        genero: 'Aventura, Indie',
        descargas: '12.4k',
        imagen: '/images/home/top-minecraft.jpg'
    },
    {
        titulo: 'GTA Obregón',
        genero: 'Acción, Aventura',
        descargas: '9.8k',
        imagen: '/images/home/top-gta-obregon.jpg'
    },
    {
        titulo: 'ITH en Huelga',
        genero: 'Terror, Aventura',
        descargas: '7.2k',
        imagen: '/images/home/top-ith-huelga.jpg'
    },
    {
        titulo: 'Pokémon',
        genero: 'RPG, Aventura',
        descargas: '6.5k',
        imagen: '/images/home/top-pokemon.jpg'
    }
]

const proximosLanzamientos = [
    {
        titulo: 'Cyber Café Simulator',
        fecha: 'Junio 2026',
        imagen: '/images/home/upcoming-cyber-cafe.jpg'
    },
    {
        titulo: 'Ruta del Desierto',
        fecha: 'Julio 2026',
        imagen: '/images/home/upcoming-ruta-desierto.jpg'
    },
    {
        titulo: 'Pixel Warriors',
        fecha: 'Agosto 2026',
        imagen: '/images/home/upcoming-pixel-warriors.jpg'
    }
]

function Home() {
    const [bannerActual, setBannerActual] = useState(0)
    const banner = banners[bannerActual]

    useEffect(() => {
        const intervalo = setInterval(() => {
            setBannerActual((valor) =>
                valor === banners.length - 1 ? 0 : valor + 1
            )
        }, 4500)

        return () => clearInterval(intervalo)
    }, [])

    return (
        <main className="home">
            <div className="home-inner">
                <section
                    className="home-hero"
                    style={{ '--hero-image': `url(${banner.imagen})` }}
                >
                    <div className="home-hero-content">
                        <span className="home-eyebrow">STEAMNT STORE</span>

                        <h1>{banner.titulo}</h1>

                        <p>{banner.descripcion}</p>

                        <div className="home-actions">
                            <Link to="/store" className="home-btn home-btn-primary">
                                Ir a la tienda
                                <FaArrowRight />
                            </Link>

                            <Link to="/desarrollador" className="home-btn home-btn-secondary">
                                Hacerse desarrollador
                            </Link>
                        </div>

                        <div className="home-dots">
                            {banners.map((_, index) => (
                                <button
                                    key={index}
                                    className={index === bannerActual ? 'active' : ''}
                                    onClick={() => setBannerActual(index)}
                                    aria-label={`Ver banner ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="home-section">
                    <div className="home-section-title">
                        <div>
                            <span>DESCUBRE</span>
                            <h2>Contenido destacado</h2>
                        </div>

                        <Link to="/store">
                            Ver tienda
                            <FaArrowRight />
                        </Link>
                    </div>

                    <div className="home-feature-grid">
                        {eventos.map((evento) => (
                            <Link to="/store" className="home-event-card" key={evento.titulo}>
                                <img src={evento.imagen} alt={evento.titulo} />

                                <div>
                                    <span>EVENTO</span>
                                    <h3>{evento.titulo}</h3>
                                    <p>{evento.descripcion}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="home-section">
                    <div className="home-section-title">
                        <div>
                            <span>EXPLORA</span>
                            <h2>Categorías populares</h2>
                        </div>
                    </div>

                    <div className="home-categories">
                        {categorias.map((categoria) => (
                            <Link to="/store" className="home-category-card" key={categoria.nombre}>
                                <img src={categoria.imagen} alt={categoria.nombre} />

                                <div>
                                    <span>{categoria.icono}</span>
                                    <h3>{categoria.nombre}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="home-section">
                    <div className="home-section-title">
                        <div>
                            <span>RANKING</span>
                            <h2>Más descargados</h2>
                        </div>
                    </div>

                    <div className="home-downloads-grid">
                        {masDescargados.map((juego, index) => (
                            <article className="home-download-card" key={juego.titulo}>
                                <img src={juego.imagen} alt={juego.titulo} />

                                <div className="home-download-info">
                                    <span>{String(index + 1).padStart(2, '0')}</span>
                                    <h3>{juego.titulo}</h3>
                                    <p>{juego.genero}</p>
                                </div>

                                <strong>
                                    <FaDownload />
                                    {juego.descargas}
                                </strong>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="home-section">
                    <div className="home-section-title">
                        <div>
                            <span>PRÓXIMAMENTE</span>
                            <h2>Lanzamientos populares</h2>
                        </div>
                    </div>

                    <div className="home-upcoming-grid">
                        {proximosLanzamientos.map((juego) => (
                            <article className="home-upcoming-card" key={juego.titulo}>
                                <img src={juego.imagen} alt={juego.titulo} />

                                <div>
                                    <span>{juego.fecha}</span>
                                    <h3>{juego.titulo}</h3>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Home