import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import {
    FaBars,
    FaTimes,
    FaHome,
    FaStore,
    FaBookOpen,
    FaGamepad,
    FaRocket,
    FaChartPie,
    FaUserCircle,
    FaCog,
    FaSignOutAlt,
    FaUserPlus,
    FaSignInAlt,
    FaCode,
} from 'react-icons/fa'
import './Sidebar.css'

function Sidebar({ collapsed, setCollapsed }) {
    const navigate = useNavigate()
    const location = useLocation()
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
    }, [location.pathname])

    const role = user?.role || localStorage.getItem('userRole')
    const isDeveloper = role?.toLowerCase() === 'developer'
    

    const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U'

    const menuItems = useMemo(() => {
        if (!user) {
            return [
                { label: 'Inicio', path: '/', icon: <FaHome /> },
                { label: 'Tienda', path: '/store', icon: <FaStore /> },
                { label: 'Registro', path: '/register', icon: <FaUserPlus /> },
                { label: 'Login', path: '/login', icon: <FaSignInAlt /> },
            ]
        }

        if (isDeveloper) {
            return [
                { label: 'Dashboard', path: '/developer/dashboard', icon: <FaChartPie /> },
                { label: 'Publicar juego', path: '/developer/publicar', icon: <FaRocket /> },
                { label: 'Mis juegos', path: '/developer/games', icon: <FaGamepad /> },
                { label: 'Tienda', path: '/store', icon: <FaStore /> },
                { label: 'Biblioteca', path: '/biblioteca', icon: <FaBookOpen /> },
                { label: 'Perfil', path: '/perfil', icon: <FaUserCircle /> },
            ]
        }

        return [
            { label: 'Inicio', path: '/', icon: <FaHome /> },
            { label: 'Tienda', path: '/store', icon: <FaStore /> },
            { label: 'Biblioteca', path: '/biblioteca', icon: <FaBookOpen /> },
            { label: 'Hacerse desarrollador', path: '/desarrollador', icon: <FaCode /> },
            { label: 'Perfil', path: '/perfil', icon: <FaUserCircle /> },
        ]
    }, [user, isDeveloper])

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('userRole')
        localStorage.removeItem('developerId')
        window.dispatchEvent(new Event('userUpdated'))
        navigate('/login')
    }

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <button
                    className={`sidebar-toggle ${collapsed ? 'active' : ''}`}
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label="Abrir o cerrar sidebar"
                >
                    {collapsed ? <FaBars /> : <FaTimes />}
                </button>
            </div>

            {user && (
                <div className="sidebar-user">
                    <div className="sidebar-avatar">
                        {userInitial}
                    </div>

                    {!collapsed && (
                        <div className="sidebar-user-info">
                            <p>{user.name}</p>
                        </div>
                    )}
                </div>
            )}

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                            isActive ? 'sidebar-link active' : 'sidebar-link'
                        }
                        title={collapsed ? item.label : ''}
                    >
                        <span className="sidebar-icon">{item.icon}</span>
                        {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {user && (
                <div className="sidebar-bottom">
                    <NavLink
                        to="/configuracion"
                        className={({ isActive }) =>
                            isActive ? 'sidebar-link sidebar-config active' : 'sidebar-link sidebar-config'
                        }
                        title={collapsed ? 'Configuración' : ''}
                    >
                        <span className="sidebar-icon"><FaCog /></span>
                        {!collapsed && <span>Configuración</span>}
                    </NavLink>

                    <button className="sidebar-logout" onClick={handleLogout}>
                        <span className="sidebar-icon"><FaSignOutAlt /></span>
                        {!collapsed && <span>Cerrar sesión</span>}
                    </button>
                </div>
            )}
        </aside>
    )
}

export default Sidebar