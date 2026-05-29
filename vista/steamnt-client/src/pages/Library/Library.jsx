import { useDispatch, useSelector } from 'react-redux'
import { ListarJuegosUsuario } from '../../utilities/redux/actions/LibraryAction'
import { useEffect } from 'react'
import './Library.css'

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
        <main className="library-page">
            <div className="library-container">
                <header className="library-header">
                    <span>MI BIBLIOTECA</span>
                    <h1>{user || 'Usuario'}</h1>
                    <p>Estos son los juegos que agregaste a tu biblioteca.</p>
                </header>

                <section className="library-games-container">
                    {libraryState.libraryGames.length === 0 ? (
                        <p className="empty-library">
                            No tienes juegos en tu biblioteca.
                        </p>
                    ) : (
                        libraryState.libraryGames.map((game) => (
                            <article className="library-game-card" key={game.libraryItemId}>
                                <div className="library-game-image">
                                    <img src={game.imageUrl} alt={game.title} />
                                </div>

                                <div className="library-game-info">
                                    <div className="library-game-main-info">
                                        <h2>{game.title}</h2>
                                        <p>{game.developer}</p>
                                    </div>

                                    <div className="library-game-footer">
                                        <button type="button">
                                            Ver más información
                                        </button>

                                        <span>
                                            Descargado: {game.addedAt}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </section>
            </div>
        </main>
    )
}

export default Library