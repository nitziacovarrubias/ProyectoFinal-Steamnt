import { useEffect, useMemo, useState } from 'react'
import GameCard from '../components/GameCard'
import { useDispatch, useSelector } from 'react-redux'
import { listarJuegos } from '../utilities/redux/actions/juegosAction'
import { listarGeneros } from '../utilities/redux/actions/generosAction'
import '../styles/Store.css'

function Store() {
    const dispatch = useDispatch()

    const juegosState = useSelector(store => store.juegos)
    const generosState = useSelector(store => store.generos)

    const [busqueda, setBusqueda] = useState('')
    const [generoId, setGeneroId] = useState('')

    useEffect(() => {
        dispatch(listarGeneros())
    }, [dispatch])

    useEffect(() => {
        dispatch(listarJuegos({
            busqueda,
            generoId
        }))
    }, [dispatch, busqueda, generoId])

    const totalJuegos = juegosState.juegos.length

    const generoSeleccionado = useMemo(() => {
        if (!generoId) return 'Todos los géneros'

        const genero = generosState.generos.find(g => String(g.id) === String(generoId))
        return genero?.name || 'Género seleccionado'
    }, [generoId, generosState.generos])

    return (
        <main className="store">
            <div className="store-inner">
                <section className="store-hero">
                    <div>
                        <span className="store-eyebrow">
                            CATÁLOGO DE VIDEOJUEGOS
                        </span>

                        <h1>Tienda SteamNT</h1>

                        <p>
                            Explora juegos publicados por desarrolladores, encuentra nuevos títulos
                            y agrega tus favoritos a tu biblioteca.
                        </p>
                    </div>

                    <div className="store-hero-summary">
                        <span>{totalJuegos}</span>
                        <p>juegos encontrados</p>
                    </div>
                </section>

                <section className="store-toolbar">
                    <div className="store-search">
                        <input
                            type="text"
                            name="busqueda"
                            placeholder="Buscar juego..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    <select
                        name="generoId"
                        value={generoId}
                        onChange={(e) => setGeneroId(e.target.value)}
                    >
                        <option value="">Todos los géneros</option>

                        {generosState.generos.map(genero => (
                            <option key={genero.id} value={genero.id}>
                                {genero.name}
                            </option>
                        ))}
                    </select>
                </section>

                <div className="store-results-header">
                    <div>
                        <span>RESULTADOS</span>
                        <h2>{generoSeleccionado}</h2>
                    </div>
                </div>

                {juegosState.loading && (
                    <p className="store-message">
                        Cargando juegos...
                    </p>
                )}

                {juegosState.error && (
                    <p className="store-error">
                        {juegosState.error}
                    </p>
                )}

                {!juegosState.loading && !juegosState.error && juegosState.juegos.length === 0 && (
                    <p className="store-message">
                        No hay juegos disponibles con esos filtros.
                    </p>
                )}

                {!juegosState.loading && !juegosState.error && juegosState.juegos.length > 0 && (
                    <section className="store-grid">
                        {juegosState.juegos.map(juego => (
                            <GameCard key={juego.id} juego={juego} />
                        ))}
                    </section>
                )}
            </div>
        </main>
    )
}

export default Store