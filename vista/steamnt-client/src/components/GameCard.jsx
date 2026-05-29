import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/GameCard.css'
import { agregarJuegoALibrary } from '../utilities/redux/actions/LibraryAction'

const imagenesLocales = {
    pokemon: '/images/home/top-pokemon.jpg',
    pokémon: '/images/home/top-pokemon.jpg',
    minecraft: '/images/home/top-minecraft.jpg',
    dora: '/images/home/dora.jpg',
    hermosillo: '/images/home/hermosillo.jpg',
    obregon: '/images/home/top-gta-obregon.jpg',
    obregón: '/images/home/top-gta-obregon.jpg',
    huelga: '/images/home/top-ith-huelga.jpg'
}

function obtenerImagenJuego(juego) {
    if (juego.imageUrl) {
        return juego.imageUrl
    }

    const titulo = juego.title?.toLowerCase() || ''

    const claveImagen = Object.keys(imagenesLocales).find(clave =>
        titulo.includes(clave)
    )

    return claveImagen ? imagenesLocales[claveImagen] : '/images/home/default-game.jpg'
}

function GameCard({ juego }) {
    const dispatch = useDispatch()

    const userIdRedux = useSelector((state) => state.auth.usuarioId)

    function obtenerUserId() {
        if (userIdRedux) {
            return userIdRedux
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'))
            return user?.id
        } catch {
            return null
        }
    }

    function addGame() {
        const userId = obtenerUserId()

        if (!userId) {
            return
        }

        dispatch(agregarJuegoALibrary({ userId, gameId: juego.id }))
    }

    function mostrarGeneros() {
        if (juego.genres && juego.genres.length > 0) {
            return juego.genres
                .map(genero => typeof genero === 'string' ? genero : genero.name)
                .join(', ')
        }

        return 'Sin género'
    }

    function mostrarPrecio() {
        const precio = Number(juego.price)

        if (precio === 0) {
            return 'Gratis'
        }

        return `$${precio.toFixed(2)}`
    }

    return (
        <article className="game-card">
            <Link to={`/game/${juego.id}`} className="game-card-imagen">
                <img
                    src={obtenerImagenJuego(juego)}
                    alt={juego.title}
                    onError={(e) => {
                        e.currentTarget.src = '/images/home/default-game.jpg'
                    }}
                />
            </Link>

            <div className="game-card-info">
                <span className="game-card-genero">
                    {mostrarGeneros()}
                </span>

                <h2>
                    {juego.title}
                </h2>

                <p>
                    {juego.description}
                </p>

                <span className="game-card-desarrollador">
                    {juego.developerName || 'Desarrollador desconocido'}
                </span>

                <div className="game-card-footer">
                    <strong>
                        {mostrarPrecio()}
                    </strong>

                    <div className="game-card-botones">
                        <Link to={`/game/${juego.id}`} className="game-card-detalle">
                            Ver detalle
                        </Link>

                        <button onClick={addGame} type="button" className="game-card-biblioteca">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default GameCard