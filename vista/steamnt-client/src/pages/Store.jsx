import { useEffect, useState } from 'react'
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
        cargarGeneros()
    }, [])

    useEffect(() => {
        cargarJuegos()
    }, [busqueda, generoId])

    function cargarGeneros() {
        dispatch(listarGeneros())
    }

    function cargarJuegos() {
        const filtros = {
            busqueda: busqueda,
            generoId: generoId
        }

        dispatch(listarJuegos(filtros))
    }

    function cambiarBusqueda(e) {
        setBusqueda(e.target.value)
    }

    function cambiarGenero(e) {
        setGeneroId(e.target.value)
    }

    function mostrarGeneros(juego) {
        if (juego.genres && juego.genres.length > 0) {
            return juego.genres.join(', ')
        }

        return 'Sin género'
    }

    return (
        <main className="store">
            <section className="store-encabezado">
                <span className="store-etiqueta">
                    CATÁLOGO DE VIDEOJUEGOS
                </span>

                <h1>Tienda SteamNT</h1>

                <p>
                    Explora los juegos disponibles, filtra por género y encuentra tu siguiente aventura.
                </p>
            </section>

            <section className="store-filtros">
                <input
                    type="text"
                    name="busqueda"
                    placeholder="Buscar juego..."
                    value={busqueda}
                    onChange={cambiarBusqueda}
                />

                <select
                    name="generoId"
                    value={generoId}
                    onChange={cambiarGenero}
                >
                    <option value="">
                        Todos los géneros
                    </option>

                    {generosState.generos.map(genero => (
                        <option key={genero.id} value={genero.id}>
                            {genero.name}
                        </option>
                    ))}
                </select>
            </section>

            {juegosState.loading ? (
                <p className="store-mensaje">
                    Cargando juegos...
                </p>
            ) : null}

            {juegosState.error ? (
                <p className="store-error">
                    {juegosState.error}
                </p>
            ) : null}

            {!juegosState.loading && !juegosState.error && juegosState.juegos.length === 0 ? (
                <p className="store-mensaje">
                    No hay juegos disponibles.
                </p>
            ) : null}

            {!juegosState.loading && !juegosState.error && juegosState.juegos.length > 0 ? (
                <section className="store-grid">
                    {juegosState.juegos.map(juego => (
                        <article className="store-card" key={juego.id}>
                            <div className="store-card-imagen">
                                {juego.imageUrl ? (
                                    <img src={juego.imageUrl} alt={juego.title} />
                                ) : (
                                    <span>Sin imagen</span>
                                )}
                            </div>

                            <div className="store-card-info">
                                <span className="store-genero">
                                    {mostrarGeneros(juego)}
                                </span>

                                <h2>
                                    {juego.title}
                                </h2>

                                <p>
                                    {juego.description}
                                </p>

                                <span className="store-desarrollador">
                                    {juego.developerName}
                                </span>

                                <div className="store-card-footer">
                                    <strong>
                                        ${juego.price}
                                    </strong>

                                    <button type="button">
                                        Ver detalle
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            ) : null}
        </main>
    )
}

export default Store