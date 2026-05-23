import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import logoSteamnt from '../assets/logo-steamnt.png'

function Navbar() {
    return (
        <nav className="navbar">
<div className="navbar-logo">
    <img src={logoSteamnt} alt="SteamNT" />
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