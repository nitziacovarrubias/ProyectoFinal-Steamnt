import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/GameCard.css'
import { agregarJuegoALibrary } from '../utilities/redux/actions/LibraryAction'

function GameCard({ juego }) {

  const dispatch = useDispatch()
  const libraryState = useSelector((state) => state.library)

  const userId = useSelector((state) => state.auth.usuarioId)

  const addGame = () => {
    console.log(userId)
    console.log(juego.id)
    return dispatch(agregarJuegoALibrary({ userId, gameId: juego.id }))
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

        return '$' + juego.price
    }

    return (
        <article className="game-card">
            <div className="game-card-imagen">
                {juego.imageUrl ? (
                    <img src={juego.imageUrl} alt={juego.title} />
                ) : (
                    <span>Sin imagen</span>
                )}
            </div>

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
                    {juego.developerName}
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