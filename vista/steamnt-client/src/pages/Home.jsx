import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
    const banners = [
        {
            titulo: 'Explora nuevos mundos',
            descripcion: 'Encuentra videojuegos de acción, aventura, terror y más.',
            imagen: '/images/banner-1.jpeg'
        },
        {
            titulo: 'Crea tu biblioteca',
            descripcion: 'Agrega tus juegos favoritos y accede a ellos cuando quieras.',
            imagen: '/images/banner-2.png'
        },
        {
            titulo: 'Publica tus propios juegos',
            descripcion: 'Conviértete en desarrollador y comparte tus creaciones.',
            imagen: '/images/banner-3.png'
        }
    ]

    const [bannerActual, setBannerActual] = useState(0)

useEffect(() => {
    const intervalo = setInterval(() => {
        setBannerActual((valor) => {
            if (valor === banners.length - 1) {
                return 0
            }
            return valor + 1
        })
    }, 4000)

    return () => clearInterval(intervalo)
}, [])

    return (
        <main className="home">
            <section
                className="home-banner"
                style={{backgroundImage: `linear-gradient(90deg, rgba(17, 24, 39, 0.95), rgba(49, 16, 105, 0.65)), url(${banners[bannerActual].imagen})`}}
            >
                <div className="home-banner-info">
                    <span className="home-etiqueta">
                        TIENDA DIGITAL DE VIDEOJUEGOS
                    </span>

                    <h1>
                        {banners[bannerActual].titulo}
                    </h1>

                    <p>
                        {banners[bannerActual].descripcion}
                    </p>

                    <div className="home-botones">
                        <Link to="/store" className="boton-principal">
                            Ir a la tienda
                        </Link>

                        <Link to="/desarrollador" className="boton-secundario">
                            Hacerse desarrollador
                        </Link>
                    </div>
                </div>
            </section>

            <section className="home-info">
                <div className="home-card">
                    <h2>Compra juegos</h2>
                    <p>
                        Accede a la tienda y consulta los juegos disponibles del catálogo.
                    </p>
                </div>

                <div className="home-card">
                    <h2>Guarda tu biblioteca</h2>
                    <p>
                        Los juegos agregados aparecerán después en tu biblioteca personal.
                    </p>
                </div>

                <div className="home-card">
                    <h2>Publica juegos</h2>
                    <p>
                        Los desarrolladores podrán registrar y administrar sus propios juegos.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default Home