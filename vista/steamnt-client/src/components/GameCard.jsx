import { Link } from 'react-router-dom'
import '../styles/GameCard.css'

function GameCard({ juego }) {

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
        <Link to={`/game/${juego.id}`} className="game-card-link">
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

                        <span className="game-card-detalle">
                            Ver detalle
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default GameCard