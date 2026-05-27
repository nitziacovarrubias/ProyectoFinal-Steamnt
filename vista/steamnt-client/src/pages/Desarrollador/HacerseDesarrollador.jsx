import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaGamepad, FaInfoCircle, FaGlobeAmericas, FaRocket } from "react-icons/fa";
import { convertirseDesarrollador } from "../../api/desarrolladorApi";
import "./HacerseDesarrollador.css";
import video from "../../assets/videos/pokeball-earth.mp4"

function HacerseDesarrollador() {
    const INTRO_END_TIME = 5;
    const TRANSFORMATION_SPEED = 6;
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const isTransformingRef = useRef(false);

    const [stage, setStage] = useState("intro");
    const [showModal, setShowModal] = useState(false);

    const [studioName, setStudioName] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);

    const getLoggedUser = () => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            return null;
        }

        return JSON.parse(storedUser);
    };

    useEffect(() => {
        const user = getLoggedUser();
        const role = localStorage.getItem("userRole") || user?.role;

        if (role === "Developer") {
            setStage("dashboard");
        }
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (!videoElement || stage === "dashboard") return;

        if (stage === "intro") {
            isTransformingRef.current = false;
            videoElement.playbackRate = 1;
            videoElement.currentTime = 0;
            videoElement.play().catch(() => {});
        }

        if (stage === "transforming") {
            videoElement.playbackRate = TRANSFORMATION_SPEED;
            videoElement.play().catch(() => {});
        }
    }, [stage]);

    const handleVideoTimeUpdate = () => {
        const videoElement = videoRef.current;

        if (!videoElement) return;

        if (
            stage === "intro" &&
            !isTransformingRef.current &&
            videoElement.currentTime >= INTRO_END_TIME
        ) {
            videoElement.currentTime = 0;
            videoElement.play().catch(() => {});
        }
    };

    const handleVideoEnded = () => {
        const videoElement = videoRef.current;

        if (!videoElement || !isTransformingRef.current) return;

        videoElement.pause();
        videoElement.playbackRate = 1;
        setShowModal(true);
    };

    const handleStartTransformation = () => {
        const user = getLoggedUser();
        const userId = localStorage.getItem("userId") || user?.id;

        if (!userId) {
            toast.error("Debes iniciar sesión para hacerte desarrollador.");
            navigate("/login");
            return;
        }

        const videoElement = videoRef.current;

        isTransformingRef.current = true;
        setStage("transforming");

        if (videoElement) {
            videoElement.playbackRate = TRANSFORMATION_SPEED;
            videoElement.play().catch(() => {});
        }
    };

    const validateForm = () => {
        if (!studioName.trim() || !description.trim() || !country.trim()) {
            toast.error("Todos los campos son obligatorios.");
            return false;
        }

        if (studioName.trim().length < 3) {
            toast.error("El nombre del estudio debe tener al menos 3 caracteres.");
            return false;
        }

        if (description.trim().length < 10) {
            toast.error("La descripción debe tener al menos 10 caracteres.");
            return false;
        }

        return true;
    };

    const updateLocalUserRole = (response) => {
        const storedUser = getLoggedUser();

        if (!storedUser) return;

        const userData = response.data || response;

        const updatedUser = {
            ...storedUser,
            role: "Developer",
            developerId: userData.id || userData.developerId || storedUser.developerId,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("userRole", "Developer");

        if (updatedUser.developerId) {
            localStorage.setItem("developerId", updatedUser.developerId);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = getLoggedUser();
        const userId = localStorage.getItem("userId") || user?.id;

        if (!userId) {
            toast.error("Debes iniciar sesión para hacerte desarrollador.");
            navigate("/login");
            return;
        }

        if (!validateForm()) return;

        try {
            setLoading(true);

            const response = await convertirseDesarrollador({
                userId: Number(userId),
                studioName: studioName.trim(),
                description: description.trim(),
                country: country.trim(),
            });

            updateLocalUserRole(response);

            toast.success("Ahora eres desarrollador en STEAMNT.");

            setTimeout(() => {
                setShowModal(false);
                setStage("dashboard");
            }, 900);
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data ||
                "No se pudo crear el perfil de desarrollador.";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (stage === "dashboard") {
        return (
            <main className="developer-dashboard-page">
                <section className="developer-dashboard-hero">
                    <p className="developer-dashboard-label">STEAMNT Developer</p>
                    <h1>Panel de desarrollador</h1>
                    <p>
                        Bienvenido a tu espacio para administrar tus videojuegos,
                        publicaciones y perfil de estudio.
                    </p>

                    <div className="developer-dashboard-actions">
                        <button>Publicar videojuego</button>
                        <button className="secondary">Ver mis juegos</button>
                    </div>
                </section>

                <section className="developer-dashboard-grid">
                    <article>
                        <h3>Juegos publicados</h3>
                        <p>0</p>
                    </article>

                    <article>
                        <h3>Estado del perfil</h3>
                        <p>Activo</p>
                    </article>

                    <article>
                        <h3>Rol actual</h3>
                        <p>Developer</p>
                    </article>
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

            <div className="developer-video-overlay"></div>

            {stage === "intro" && (
                <section className="developer-banner">
                    <p className="developer-kicker">STEAMNT DEV</p>

                    <h1>Conviértete en desarrollador de STEAMNT</h1>

                    <p>
                        Publica tus propios videojuegos dentro de la plataforma.
                    </p>

                    <button
                        type="button"
                        className="retro-developer-button"
                        onClick={handleStartTransformation}
                    >
                        <FaRocket />
                        Quiero ser desarrollador
                    </button>
                </section>
            )}

            {showModal && (
                <div className="developer-modal-backdrop">
                    <section className="developer-modal">
                        <button
                            type="button"
                            className="developer-modal-close"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>

                        <h2>Crear perfil de desarrollador</h2>

                        <p className="developer-modal-subtitle">
                            Completa la información.
                        </p>

                        <form onSubmit={handleSubmit} className="developer-form">
                            <div className="form-group">
                                <label>Nombre del estudio</label>

                                <div className="input-icon">
                                    <FaGamepad />
                                    <input
                                        type="text"
                                        placeholder="Ej. Pixel Studio"
                                        value={studioName}
                                        onChange={(event) => setStudioName(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Descripción</label>

                                <div className="textarea-icon">
                                    <FaInfoCircle />
                                    <textarea
                                        placeholder="Describe tu estudio"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>País</label>

                                <div className="input-icon">
                                    <FaGlobeAmericas />
                                    <input
                                        type="text"
                                        placeholder="Ej. México"
                                        value={country}
                                        onChange={(event) => setCountry(event.target.value)}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="developer-submit-button" disabled={loading}>
                                {loading ? "Creando perfil..." : "Convertirme en desarrollador"}
                            </button>
                        </form>
                    </section>
                </div>
            )}
        </main>
    );
}

export default HacerseDesarrollador;