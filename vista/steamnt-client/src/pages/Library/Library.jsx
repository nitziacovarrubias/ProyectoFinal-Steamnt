import { useDispatch, useSelector } from 'react-redux'
import { ListarJuegosUsuario } from '../../utilities/redux/actions/LibraryAction'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import './Library.css'

function Library() {
    const dispatch = useDispatch()

    const libraryState = useSelector(store => store.library)
    const authState = useSelector(store => store.auth)

    const userId = authState.usuario?.userId ?? authState.usuario?.id
    const user = authState.usuario?.name

    const [selectedGame, setSelectedGame] = useState(null)

    useEffect(() => {
        if (userId) {
            dispatch(ListarJuegosUsuario(userId))
        }
    }, [userId, dispatch])

    const openGameModal = (game) => {
        setSelectedGame(game)
    }

    const closeGameModal = () => {
        setSelectedGame(null)
    }

    const downloadGame = (game) => {
        if (game.downloadUrl) {
            window.open(game.downloadUrl, '_blank')
            toast.success('Descarga iniciada')
            return
        }

        toast.error('Este juego todavía no tiene archivo de descarga disponible')
    }

    return (
        <main className="library-page">
            <div className="library-container">
                <header className="library-header">
                    <span>MI BIBLIOTECA</span>
                    <h1>{user || 'Usuario'}</h1>
                    <p>
                        Estos son los juegos que agregaste a tu biblioteca.
                    </p>
                </header>

                <section className="library-games-container">
                    {libraryState.loading && (
                        <p className="empty-library">
                            Cargando biblioteca...
                        </p>
                    )}

                    {!libraryState.loading && libraryState.libraryGames.length === 0 && (
                        <p className="empty-library">
                            No tienes juegos en tu biblioteca.
                        </p>
                    )}

                    {!libraryState.loading && libraryState.libraryGames.map((game) => (
                        <article
                            className="library-game-card"
                            key={game.libraryItemId}
                        >
                            <div className="library-game-image">
                                <img
                                    src={game.imageUrl}
                                    alt={game.title}
                                />
                            </div>

                            <div className="library-game-info">
                                <div className="library-game-main-info">
                                    <h2>{game.title}</h2>
                                    <p>
                                        {game.developer || 'Desarrollador no disponible'}
                                    </p>
                                </div>

                                <div className="library-game-footer">
                                    <button
                                        type="button"
                                        onClick={() => openGameModal(game)}
                                    >
                                        Ver información
                                    </button>

                                    <button
                                        type="button"
                                        className="library-download-btn"
                                        onClick={() => downloadGame(game)}
                                    >
                                        Descargar
                                    </button>

                                    <span>
                                        Agregado: {game.addedAt || 'Fecha no disponible'}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            </div>

            {selectedGame && (
                <div
                    className="library-modal-overlay"
                    onClick={closeGameModal}
                >
                    <div
                        className="library-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="library-modal-close"
                            onClick={closeGameModal}
                        >
                            ×
                        </button>

                        <div className="library-modal-image">
                            <img
                                src={selectedGame.imageUrl}
                                alt={selectedGame.title}
                            />
                        </div>

                        <div className="library-modal-content">
                            <span className="library-modal-label">
                                INFORMACIÓN DEL JUEGO
                            </span>

                            <h2>{selectedGame.title}</h2>

                            <p className="library-modal-description">
                                {selectedGame.description || 'Este videojuego todavía no tiene una descripción disponible.'}
                            </p>

                            <div className="library-modal-details">
                                <div>
                                    <span>Desarrollador</span>
                                    <strong>
                                        {selectedGame.developer || 'No disponible'}
                                    </strong>
                                </div>

                                <div>
                                    <span>Agregado a biblioteca</span>
                                    <strong>
                                        {selectedGame.addedAt || 'Fecha no disponible'}
                                    </strong>
                                </div>

                                <div>
                                    <span>Estado</span>
                                    <strong>
                                        Disponible en tu biblioteca
                                    </strong>
                                </div>
                            </div>

                            <div className="library-modal-actions">
                                <button
                                    type="button"
                                    onClick={() => downloadGame(selectedGame)}
                                >
                                    Descargar juego
                                </button>

                                <button
                                    type="button"
                                    className="library-modal-secondary"
                                    onClick={closeGameModal}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Library