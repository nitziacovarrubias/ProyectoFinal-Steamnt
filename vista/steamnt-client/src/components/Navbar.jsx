import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../styles/Navbar.css'
import logoSteamnt from '../assets/logo-steamnt.png'

function Navbar() {
    const [user, setUser] = useState(null)

    const loadUser = () => {
        try {
            const storedUser = localStorage.getItem('user')
            setUser(storedUser ? JSON.parse(storedUser) : null)
        } catch {
            setUser(null)
        }
    }

    useEffect(() => {
        loadUser()

        window.addEventListener('storage', loadUser)
        window.addEventListener('userUpdated', loadUser)

        return () => {
            window.removeEventListener('storage', loadUser)
            window.removeEventListener('userUpdated', loadUser)
        }
    }, [])

    return (
        <nav className="navbar">
            <NavLink to="/" className="navbar-logo">
                <img src={logoSteamnt} alt="SteamNT" />
            </NavLink>

            <div className="navbar-links">
                <NavLink to="/" end>
                    Inicio
                </NavLink>

                <NavLink to="/store">
                    Tienda
                </NavLink>

                <NavLink to="/biblioteca">
                    Biblioteca
                </NavLink>

                <NavLink to="/desarrollador">
                    Desarrollador
                </NavLink>
            </div>

            {!user && (
                <div className="navbar-auth">
                    <NavLink to="/login" className="login-btn">
                        Login
                    </NavLink>

                    <NavLink to="/register" className="register-btn">
                        Registro
                    </NavLink>
                </div>
            )}
        </nav>
    )
}

export default Navbar