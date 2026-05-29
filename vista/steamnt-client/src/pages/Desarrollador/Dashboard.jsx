import { Link } from "react-router-dom"
import {
    FaChartLine,
    FaDownload,
    FaGamepad,
    FaPlus,
} from "react-icons/fa"
import "./Dashboard.css"

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <main className="developer-dashboard-page">
            <section className="developer-hero">
                <span className="developer-kicker">STEAMNT DEVELOPER</span>

                <h1>{user?.studioName || "Pikachu Studios"}</h1>

                <p>
                    {user?.description || "Pues el estudio de pikachu"}
                </p>

                <div className="developer-actions">
                    <Link to="/developer/publicar" className="primary-dev-btn">
                        <FaPlus />
                        Publicar videojuego
                    </Link>

                    <Link to="/developer/games" className="secondary-dev-btn">
                        <FaGamepad />
                        Ver mis juegos
                    </Link>
                </div>
            </section>

            <section className="developer-card">
                <div className="developer-card-header">
                    <div>
                        <span>ACTIVIDAD DE LA TIENDA</span>
                        <h2>Top descargas</h2>
                    </div>

                    <FaChartLine />
                </div>

                <div className="empty-downloads">
                    <FaDownload />
                    <h3>Aún no hay datos de descargas</h3>
                </div>
            </section>
        </main>
    )
}

export default Dashboard