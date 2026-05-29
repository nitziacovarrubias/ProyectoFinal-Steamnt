import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    FaBars,
    FaBoxOpen,
    FaChartLine,
    FaDownload,
    FaEdit,
    FaGamepad,
    FaHome,
    FaList,
    FaPlus,
    FaRocket,
    FaSignOutAlt,
    FaTimes,
    FaTrash,
    FaUserCog,
} from "react-icons/fa";
import {
    convertirseDesarrollador,
    obtenerDesarrolladorPorUsuario,
} from "../../api/desarrolladorApi";
import { getGamesByDeveloper } from "../../api/juegosApi";
import "./HacerseDesarrollador.css";
import video from "../../assets/videos/pokeball-earth.mp4";

const VIDEO_LOOP_END = 5;
const FAST_FORWARD_RATE = 6;

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

const getDownloads = (game) =>
    game?.downloads ?? game?.downloadCount ?? game?.totalDownloads ?? 0;

function HacerseDesarrollador() {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const isTransforming = useRef(false);

    const [stage, setStage] = useState("intro");
    const [showForm, setShowForm] = useState(false);
    const [studioName, setStudioName] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);
    const [developer, setDeveloper] = useState(null);
    const [games, setGames] = useState([]);
    const [loadingDashboard, setLoadingDashboard] = useState(false);
    const [activeSection, setActiveSection] = useState("resumen");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const topGames = useMemo(() => {
        return [...games]
            .sort((a, b) => getDownloads(b) - getDownloads(a))
            .slice(0, 5);
    }, [games]);

    useEffect(() => {
        const user = getSavedUser();
        const role = localStorage.getItem("userRole") || user?.role;

        if (role === "Developer") {
            setStage("dashboard");
        }
    }, []);

    useEffect(() => {
        const player = videoRef.current;

        if (!player || stage === "dashboard") return;

        if (stage === "intro") {
            isTransforming.current = false;
            player.playbackRate = 1;
            player.currentTime = 0;
        }

        if (stage === "transforming") {
            player.playbackRate = FAST_FORWARD_RATE;
        }

        player.play().catch(() => null);
    }, [stage]);

    const loadDashboard = useCallback(async () => {
        const user = getSavedUser();
        const userId = localStorage.getItem("userId") || user?.id;

        if (!userId) {
            toast.error("Debes iniciar sesión para ver el panel.");
            navigate("/login");
            return;
        }

        try {
            setLoadingDashboard(true);

            const developerResponse = await obtenerDesarrolladorPorUsuario(userId);
            const developerData = getData(developerResponse);

            setDeveloper(developerData);

            if (!developerData?.id) {
                setGames([]);
                return;
            }

            localStorage.setItem("developerId", developerData.id);

            const gamesResponse = await getGamesByDeveloper(developerData.id);
            const gamesData = getData(gamesResponse);

            setGames(Array.isArray(gamesData) ? gamesData : []);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "No se pudo cargar el panel de desarrollador.";

            toast.error(message);
        } finally {
            setLoadingDashboard(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (stage === "dashboard") {
            loadDashboard();
        }
    }, [stage, loadDashboard]);

    const handleVideoTimeUpdate = () => {
        const player = videoRef.current;

        if (!player) return;

        if (
            stage === "intro" &&
            !isTransforming.current &&
            player.currentTime >= VIDEO_LOOP_END
        ) {
            player.currentTime = 0;
            player.play().catch(() => null);
        }
    };

    const handleVideoEnded = () => {
        const player = videoRef.current;

        if (!player || !isTransforming.current) return;

        player.pause();
        player.playbackRate = 1;
        setShowForm(true);
    };

    const startTransformation = () => {
        const user = getSavedUser();
        const userId = localStorage.getItem("userId") || user?.id;

        if (!userId) {
            toast.error("Debes iniciar sesión para hacerte desarrollador.");
            navigate("/login");
            return;
        }

        isTransforming.current = true;
        setStage("transforming");
    };

    const formIsValid = () => {
        const name = studioName.trim();
        const info = description.trim();
        const location = country.trim();

        if (!name || !info || !location) {
            toast.error("Todos los campos son obligatorios.");
            return false;
        }

        if (name.length < 3) {
            toast.error("El nombre del estudio debe tener al menos 3 caracteres.");
            return false;
        }

        if (info.length < 10) {
            toast.error("La descripción debe tener al menos 10 caracteres.");
            return false;
        }

        return true;
    };

    const saveDeveloperRole = (response) => {
        const user = getSavedUser();
        const developerData = getData(response);

        if (!user) return;

        const updatedUser = {
            ...user,
            role: "Developer",
            developerId: developerData?.id || developerData?.developerId || user.developerId,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("userRole", "Developer");

        if (updatedUser.developerId) {
            localStorage.setItem("developerId", updatedUser.developerId);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = getSavedUser();
        const userId = localStorage.getItem("userId") || user?.id;

        if (!userId) {
            toast.error("Debes iniciar sesión para hacerte desarrollador.");
            navigate("/login");
            return;
        }

        if (!formIsValid()) return;

        try {
            setLoading(true);

            const response = await convertirseDesarrollador({
                userId: Number(userId),
                studioName: studioName.trim(),
                description: description.trim(),
                country: country.trim(),
            });

            saveDeveloperRole(response);
            toast.success("Ahora eres desarrollador en STEAMNT.");

            setShowForm(false);
            setStage("dashboard");
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "No se pudo crear el perfil de desarrollador.";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (stage === "dashboard") {
        return (
            <main className={`developer-panel-page ${sidebarOpen ? "" : "sidebar-closed"}`}>
                <aside className="developer-sidebar">
                    <div>
                        <div className="developer-sidebar-top">
                            <button
                                type="button"
                                className={`sidebar-toggle ${sidebarOpen ? "is-open" : "is-closed"}`}
                                onClick={() => setSidebarOpen((current) => !current)}
                                aria-label="Abrir o cerrar menú"
                            >
                                {sidebarOpen ? <FaTimes /> : <FaBars />}
                            </button>

                            <div className="developer-sidebar-brand">
                                <FaGamepad />
                            </div>
                        </div>

                        <nav className="developer-sidebar-nav">
                            <button
                                type="button"
                                className={activeSection === "resumen" ? "active" : ""}
                                onClick={() => setActiveSection("resumen")}
                            >
                                <FaHome />
                                <span>Resumen</span>
                            </button>

                            <button
                                type="button"
                                className={activeSection === "juegos" ? "active" : ""}
                                onClick={() => setActiveSection("juegos")}
                            >
                                <FaList />
                                <span>Mis juegos</span>
                            </button>

                            <button
                                type="button"
                                className={activeSection === "perfil" ? "active" : ""}
                                onClick={() => setActiveSection("perfil")}
                            >
                                <FaUserCog />
                                <span>Perfil</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/developer/games/create")}
                            >
                                <FaPlus />
                                <span>Publicar juego</span>
                            </button>
                        </nav>
                    </div>

                    <button
                        type="button"
                        className="developer-sidebar-exit"
                        onClick={() => navigate("/store")}
                    >
                        <FaSignOutAlt />
                        <span>Volver a tienda</span>
                    </button>
                </aside>

                <section className="developer-panel-content">
                    {loadingDashboard ? (
                        <p className="developer-loading">Cargando panel...</p>
                    ) : (
                        <>
                            {activeSection === "resumen" && (
                                <>
                                    <section className="developer-dashboard-hero">
                                        <p className="developer-dashboard-label">STEAMNT Developer</p>

                                        <h1>{developer?.studioName || "Panel de desarrollador"}</h1>

                                        <p>
                                            {developer?.description ||
                                                "Administra tus videojuegos, publicaciones y perfil de estudio."}
                                        </p>

                                        <div className="developer-dashboard-actions">
                                            <button
                                                type="button"
                                                onClick={() => navigate("/developer/games/create")}
                                            >
                                                <FaPlus />
                                                Publicar videojuego
                                            </button>

                                            <button
                                                type="button"
                                                className="secondary"
                                                onClick={() => setActiveSection("juegos")}
                                            >
                                                <FaList />
                                                Ver mis juegos
                                            </button>
                                        </div>
                                    </section>

                                    <section className="developer-downloads-panel">
                                        <div className="downloads-panel-header">
                                            <div>
                                                <p className="developer-dashboard-label">Actividad de la tienda</p>
                                                <h2>Top descargas</h2>
                                            </div>

                                            <FaChartLine />
                                        </div>

                                        {topGames.length === 0 ? (
                                            <div className="downloads-empty">
                                                <FaDownload />
                                                <h3>Aún no hay datos de descargas</h3>
                                            </div>
                                        ) : (
                                            <div className="downloads-list">
                                                {topGames.map((game, index) => (
                                                    <article className="download-item" key={game.id}>
                                                        <div className="download-rank">#{index + 1}</div>

                                                        <div className="download-game-info">
                                                            <h3>{game.title}</h3>
                                                            <p>{game.description || "Sin descripción disponible."}</p>
                                                        </div>

                                                        <div className="download-count">
                                                            <FaDownload />
                                                            <span>{getDownloads(game)}</span>
                                                            <small>descargas</small>
                                                        </div>
                                                    </article>
                                                ))}
                                            </div>
                                        )}
                                    </section>
                                </>
                            )}

                            {activeSection === "juegos" && (
                                <section className="developer-games-section">
                                    <div className="developer-section-header">
                                        <div>
                                            <h1>Mis juegos publicados</h1>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => navigate("/developer/games/create")}
                                        >
                                            <FaPlus />
                                            Nuevo juego
                                        </button>
                                    </div>

                                    {games.length === 0 ? (
                                        <div className="empty-games">
                                            <FaBoxOpen />
                                            <h3>Aún no tienes juegos publicados</h3>

                                            <button
                                                type="button"
                                                onClick={() => navigate("/developer/games/create")}
                                            >
                                                Publicar mi primer juego
                                            </button>
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
                                                                {Number(game.price) === 0
                                                                    ? "Gratis"
                                                                    : `$${game.price}`}
                                                            </span>

                                                            <div className="game-actions">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        navigate(`/developer/games/edit/${game.id}`)
                                                                    }
                                                                >
                                                                    <FaEdit />
                                                                    Editar
                                                                </button>

                                                                <button type="button" className="danger" disabled>
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
                            )}

                            {activeSection === "perfil" && (
                                <section className="developer-profile-section">
                                    <h1>Perfil de desarrollador</h1>

                                    <div className="developer-profile-card">
                                        <p>
                                            <strong>Estudio:</strong> {developer?.studioName || "Sin nombre"}
                                        </p>
                                        <p>
                                            <strong>Descripción:</strong>{" "}
                                            {developer?.description || "Sin descripción"}
                                        </p>
                                        <p>
                                            <strong>País:</strong> {developer?.country || "Sin país"}
                                        </p>
                                        <p>
                                            <strong>Estado:</strong>{" "}
                                            {developer?.isActive === false ? "Inactivo" : "Activo"}
                                        </p>
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </section>
            </main>
        );
    }

    return (
        <main className={`developer-intro-page ${stage === "transforming" ? "is-transforming" : ""}`}>
            <video
                ref={videoRef}
                className="developer-bg-video"
                muted
                playsInline
                preload="auto"
                onTimeUpdate={handleVideoTimeUpdate}
                onEnded={handleVideoEnded}
            >
                <source src={video} type="video/mp4" />
            </video>

            <div className="developer-video-overlay" />

            {stage === "intro" && (
                <section className="developer-banner">
                    <p className="developer-kicker">STEAMNT DEV</p>
                    <h1>Conviértete en desarrollador de STEAMNT</h1>
                    <p>Publica tus propios videojuegos dentro de la plataforma.</p>

                    <button
                        type="button"
                        className="retro-developer-button"
                        onClick={startTransformation}
                    >
                        <FaRocket />
                        Quiero ser desarrollador
                    </button>
                </section>
            )}

            {showForm && (
                <DesarrolladorModal
                    studioName={studioName}
                    setStudioName={setStudioName}
                    description={description}
                    setDescription={setDescription}
                    country={country}
                    setCountry={setCountry}
                    loading={loading}
                    handleSubmit={handleSubmit}
                />
            )}
        </main>
    );
}

export default HacerseDesarrollador;
