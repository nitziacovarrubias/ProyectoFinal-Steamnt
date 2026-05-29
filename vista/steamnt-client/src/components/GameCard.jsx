import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import {
    FaBookOpen,
    FaDownload,
    FaGamepad,
    FaInfoCircle,
    FaPlus,
    FaUserAstronaut,
} from 'react-icons/fa'
import '../styles/GameCard.css'
import { agregarJuegoALibrary } from '../utilities/redux/actions/LibraryAction'

function GameCard({ juego }) {
    const dispatch = useDispatch()

    const authState = useSelector((state) => state.auth)
    const userId = authState.usuario?.id || localStorage.getItem('userId')

    const imageSrc =
        juego.imageUrl ||
        juego.coverImageUrl ||
        'https://placehold.co/600x400/0b1220/38bdf8?text=STEAMNT'

    const addGame = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!userId) {
            toast.error('Debes iniciar sesión para agregar juegos a tu biblioteca')
            return
        }

        try {
            const response = await dispatch(
                agregarJuegoALibrary({
                    userId: Number(userId),
                    gameId: juego.id,
                })
            ).unwrap()

            toast.success(response?.message ?? 'Juego agregado a tu biblioteca')
        } catch (error) {
            toast.error(error || 'No se pudo agregar el juego')
        }
    }

    const downloadGame = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!juego.downloadUrl) {
            toast.error('Este juego todavía no tiene enlace de descarga')
            return
        }

        window.open(juego.downloadUrl, '_blank')
    }

    function mostrarGeneros() {
        if (juego.genres && juego.genres.length > 0) {
            return juego.genres.join(', ')
        }

        return 'Sin género'
    }

    function mostrarPrecio() {
        if (Number(juego.price) === 0) {
            return 'Gratis'
        }

        return `$${juego.price}`
    }

    function mostrarDesarrollador() {
        return (
            juego.developerName ||
            juego.developer?.studioName ||
            juego.developer ||
            'Desarrollador no disponible'
        )
    }

    return (
        <article className="game-card">
            <Link to={`/game/${juego.id}`} className="game-card-imagen">
                <img src={imageSrc} alt={juego.title} />

                <div className="game-card-image-overlay">
                    <span>
                        <FaInfoCircle />
                        Ver detalle
                    </span>
                </div>
            </Link>

            <div className="game-card-info">
                <div className="game-card-top">
                    <span className="game-card-genero">
                        <FaGamepad />
                        {mostrarGeneros()}
                    </span>
                </div>

                <h2>{juego.title}</h2>

                <p>{juego.description}</p>

                <span className="game-card-desarrollador">
                    <FaUserAstronaut />
                    {mostrarDesarrollador()}
                </span>

                <div className="game-card-footer">
                    <strong>{mostrarPrecio()}</strong>

                    <div className="game-card-botones">
                        <Link
                            to={`/game/${juego.id}`}
                            className="game-card-detalle"
                        >
                            <FaBookOpen />
                            Detalle
                        </Link>

                        <button
                            type="button"
                            className="game-card-biblioteca"
                            onClick={addGame}
                        >
                            <FaPlus />
                            Agregar
                        </button>

                        <button
                            type="button"
                            className="game-card-descargar"
                            onClick={downloadGame}
                        >
                            <FaDownload />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default GameCard