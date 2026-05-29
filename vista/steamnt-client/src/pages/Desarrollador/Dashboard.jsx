import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    FaBoxOpen,
    FaEdit,
    FaGamepad,
    FaGlobeAmericas,
    FaPlus,
    FaTrash,
    FaUserAstronaut,
} from "react-icons/fa";
import { obtenerDesarrolladorPorUsuario } from "../../api/desarrolladorApi";
import { getGamesByDeveloper } from "../../api/juegosApi";
import "./Dashboard.css";

const getSavedUser = () => {
    const user = localStorage.getItem("user");

    if (!user) return null;

    try {
        return JSON.parse(user);
    } catch {
        return null;
    }
};

const getData = (response) => response?.data ?? response;

function Dashboard() {
    const navigate = useNavigate();

    const [developer, setDeveloper] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDeveloper = async () => {
            const user = getSavedUser();
            const userId = localStorage.getItem("userId") || user?.id;
            const role = localStorage.getItem("userRole") || user?.role;

            if (!userId) {
                toast.error("Debes iniciar sesión para entrar al panel.");
                navigate("/login");
                return;
            }

            if (role !== "Developer") {
                toast.error("Primero necesitas hacerte desarrollador.");
                navigate("/become-developer");
                return;
            }

            try {
                setLoading(true);

                const storedDeveloperId = localStorage.getItem("developerId");
                let developerData;

                if (storedDeveloperId) {
                    developerData = {
                        id: Number(storedDeveloperId),
                        studioName: user?.studioName || "Desarrollador",
                        country: user?.country || "Sin país registrado",
                        description: user?.description || "Perfil de desarrollador de STEAMNT.",
                    };
                } else {
                    const response = await obtenerDesarrolladorPorUsuario(userId);
                    developerData = getData(response);
                    localStorage.setItem("developerId", developerData.id);
                }

                setDeveloper(developerData);

                const gamesResponse = await getGamesByDeveloper(developerData.id);
                const gamesData = getData(gamesResponse);

                setGames(Array.isArray(gamesData) ? gamesData : []);
            } catch (error) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data ||
                    "No se pudo cargar la información del desarrollador.";

                toast.error(message);
            } finally {
                setLoading(false);
            }
        };

        loadDeveloper();
    }, [navigate]);

    if (loading) {
        return (
            <main className="developer-dashboard-page">
                <p className="developer-loading">Cargando dashboard...</p>
            </main>
        );
    }

    return (
        <main className="developer-dashboard-page">
            <section className="developer-header">
                <div>
                    <span className="developer-label">
                        <FaUserAstronaut />
                        Panel de desarrollador
                    </span>

                    <h1>{developer?.studioName || "Mi estudio"}</h1>
                    <p>{developer?.description || "Aquí podrás administrar tus videojuegos."}</p>

                    <div className="developer-meta">
                        <span>
                            <FaGlobeAmericas />
                            {developer?.country || "Sin país"}
                        </span>

                        <span>
                            <FaGamepad />
                            {games.length} juegos publicados
                        </span>
                    </div>
                </div>

                <Link to="/developer/games/create" className="publish-button">
                    <FaPlus />
                    Publicar juego
                </Link>
            </section>

            <section className="developer-games-section">
                <div className="section-title">
                    <h2>Mis juegos publicados</h2>
                </div>

                {games.length === 0 ? (
                    <div className="empty-games">
                        <FaBoxOpen />
                        <h3>Todavía no tienes juegos publicados</h3>

                        <Link to="/developer/games/create">Publicar mi primer juego</Link>
                    </div>
                ) : (
                    <div className="developer-games-grid">
                        {games.map((game) => (
                            <article className="developer-game-card" key={game.id}>
                                <img
                                    src={
                                        game.imageUrl ||
                                        game.coverImageUrl ||
                                        "https://via.placeholder.com/400x250?text=STEAMNT"
                                    }
                                    alt={game.title}
                                />

                                <div className="developer-game-content">
                                    <h3>{game.title}</h3>
                                    <p>{game.description || "Sin descripción disponible."}</p>

                                    <div className="game-card-footer">
                                        <span>
                                            {Number(game.price) === 0 ? "Gratis" : `$${game.price}`}
                                        </span>

                                        <div className="game-actions">
                                            <Link to={`/developer/games/edit/${game.id}`}>
                                                <FaEdit />
                                                Editar
                                            </Link>

                                            <button type="button" disabled>
                                                <FaTrash />
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Dashboard;
