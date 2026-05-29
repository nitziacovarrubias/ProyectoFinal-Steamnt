import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginUser } from "../../api/authApi";
import loginBg from "../../assets/videos/login_bg.mp4";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);


    const validateForm = () => {
        if (!email.trim() || !password.trim()) {
            toast.error("Correo y contraseña son obligatorios.");
            return false;
        }

        if (!email.includes("@")) {
            toast.error("Ingresa un correo válido.");
            return false;
        }

        return true;
    };

    const saveUserSession = (response) => {
        const userData = response.data || response;

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("userRole", userData.role);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);

            const response = await loginUser({
                email,
                password,
            });

            saveUserSession(response);

            toast.success("Haz iniciado sesión.");

            setTimeout(() => {
                navigate("/store");
            }, 1000);
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data ||
                "Correo o contraseña incorrectos.";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-page">
            <video
                className="login-bg-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={loginBg} type="video/mp4" />
            </video>

            <div className="login-video-overlay"></div>

            <section className="login-card">
                <h1>Iniciar sesión</h1>

                <p className="login-subtitle">
                    Entra a STEAMNT y accede a tu biblioteca
                </p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-form-group">
                        <label>Correo</label>
                        <div className="login-input-icon">
                            <FaEnvelope />
                            <input
                                type="email"
                                placeholder="usuario@correo.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="login-form-group">
                        <label>Contraseña</label>
                        <div className="login-input-icon">
                            <FaLock />
                            <input
                                type="password"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Ingresando..." : "Iniciar sesión"}
                    </button>
                </form>

                <p className="register-link">
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </section>
        </main>
    );
}

export default Login;