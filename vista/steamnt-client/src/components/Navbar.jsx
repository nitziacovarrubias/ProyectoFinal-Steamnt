import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                SteamNT
            </div>

            <div className="navbar-links">
                <Link to="/">Inicio</Link>
                <Link to="/store">Tienda</Link>
                <Link to="/biblioteca">Biblioteca</Link>
                <Link to="/desarrollador">Desarrollador</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    )
}

export default Navbar