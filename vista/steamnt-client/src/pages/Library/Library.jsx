import { useDispatch, useSelector } from 'react-redux'
import { ListarJuegosUsuario } from '../../utilities/redux/actions/LibraryAction';
import { useEffect } from 'react'
import "./Library.css";

function Library() {
    const dispatch = useDispatch()

    const libraryState = useSelector(store => store.library)
    const authState = useSelector(store => store.auth)

    const userId = authState.usuario?.id
    const user = authState.usuario?.name

    useEffect(() => {
        if (userId) {
            dispatch(ListarJuegosUsuario(userId))
        }
    }, [userId, dispatch])

    return (
        <div className="library-container">
            <header className="library-header">
                <h1>UserName: {user}</h1>
            </header>

            <section className="games-container">

                {libraryState.libraryGames.length === 0 ? (
                    <p className="empty-library">
                        No tienes juegos en tu biblioteca.
                    </p>
                ) : (
                    libraryState.libraryGames.map((game) => (
                        <div className="game-card" key={game.libraryItemId}>

                            <div className="game-image">
                                <img src={game.imageUrl} alt={game.title} />
                            </div>

                            <div className="game-info">

                                <div className="game-main-info">
                                    <h2>{game.title}</h2>
                                    <p>{game.developer}</p>
                                </div>

                                <div className="game-footer">
                                    <button>
                                        Ver más información
                                    </button>

                                    <span>
                                        Descargado: {game.addedAt}
                                    </span>
                                </div>

                            </div>

                        </div>
                    ))
                )}

            </section>
        </div>
    );
}

export default Library;