import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import { registerUser } from "../../api/authApi";
import registerBg from "../../assets/videos/register-bg.mp4";
import "./Registro.css";

function Registro() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    // validaciones en el formulario antes de realizar la peticion
    const validateForm = () => {
        if (
            !name.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {
            toast.error("Todos los campos son obligatorios.");
            return false;
        }

        if (!email.includes("@")) {
            toast.error("Ingresa un correo válido.");
            return false;
        }

        if (password.length < 8) {
            toast.error("La contraseña debe tener al menos 8 caracteres.");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return false;
        }

        return true;
    };

    // enviar datos al registro del back /api/auth/register
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);

            //registrar usuario
            await registerUser({
                name,
                email,
                password,
            });

            toast.success("Usuario registrado correctamente.");

            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data ||
                "No se pudo registrar el usuario.";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="register-page">
            <video
                className="register-bg-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={registerBg} type="video/mp4" />
            </video>

            <div className="register-video-overlay"></div>

            <section className="register-card">
                <h1>Crear cuenta</h1>

                <p className="register-subtitle">
                    Regístrate para usar STEAMNT
                </p>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label>Nombre</label>
                        <div className="input-icon">
                            <FaUser />
                            <input
                                type="text"
                                placeholder="Nombre y apellido"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Correo</label>
                        <div className="input-icon">
                            <FaEnvelope />
                            <input
                                type="email"
                                placeholder="usuario@correo.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <div className="input-icon">
                            <FaLock />
                            <input
                                type="password"
                                placeholder="Mínimo 8 caracteres"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Confirmar contraseña</label>
                        <div className="input-icon">
                            <FaCheckCircle />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>

                <p className="login-link">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </section>
        </main>
    );
}

export default Registro;