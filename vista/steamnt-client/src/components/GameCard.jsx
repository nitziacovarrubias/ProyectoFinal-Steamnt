import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import '../styles/GameCard.css'
import { agregarJuegoALibrary } from '../utilities/redux/actions/LibraryAction'

function GameCard({ juego }) {
    const dispatch = useDispatch()

    const authState = useSelector((state) => state.auth)
    const userId = authState.usuario?.id

    const addGame = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!userId) {
            toast.error('Debes iniciar sesión para agregar juegos a tu biblioteca')
            return
        }

        try {
            const response = await dispatch(agregarJuegoALibrary({
                userId,
                gameId: juego.id
            })).unwrap()

            toast.success(response?.message ?? 'Juego agregado a tu biblioteca')
        } catch (error) {
            toast.error(error || 'No se pudo agregar el juego')
        }
    }

    function mostrarGeneros() {
        if (juego.genres && juego.genres.length > 0) {
            return juego.genres.join(', ')
        }

        return 'Sin género'
    }

    function mostrarPrecio() {
        if (juego.price === 0) {
            return 'Gratis'
        }

        return `$${juego.price}`
    }

    return (
        <article className="game-card">
            <Link to={`/game/${juego.id}`} className="game-card-imagen">
                <img src={juego.imageUrl} alt={juego.title} />
            </Link>

            <div className="game-card-info">
                <span className="game-card-genero">
                    {mostrarGeneros()}
                </span>

                <h2>{juego.title}</h2>

                <p>{juego.description}</p>

                <span className="game-card-desarrollador">
                    {juego.developer || 'Desarrollador no disponible'}
                </span>

                <div className="game-card-footer">
                    <strong>{mostrarPrecio()}</strong>

                    <div className="game-card-botones">
                        <Link 
                            to={`/game/${juego.id}`} 
                            className="game-card-detalle"
                        >
                            Ver detalle
                        </Link>

                        <button
                            type="button"
                            className="game-card-biblioteca"
                            onClick={addGame}
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default GameCard