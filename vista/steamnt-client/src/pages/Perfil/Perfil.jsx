import { FaCalendarAlt, FaEnvelope, FaIdBadge, FaUserCircle } from 'react-icons/fa'
import './Perfil.css'

const getSavedUser = () => {
    const user = localStorage.getItem('user')

    if (!user) return null

    try {
        return JSON.parse(user)
    } catch {
        return null
    }
}

function formatDate(date) {
    if (!date) return 'No disponible'

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return 'No disponible'
    }

    return parsedDate.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

function Perfil() {
    const user = getSavedUser()
    const role = localStorage.getItem('userRole') || user?.role

    return (
        <main className="profile-page">
            <section className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <FaUserCircle />
                    </div>

                    <div>
                        <span>Perfil de usuario</span>
                        <h1>{user?.name || 'Usuario'}</h1>
                    </div>
                </div>

                <div className="profile-info-grid">
                    <article className="profile-info-item">
                        <FaIdBadge />
                        <div>
                            <span>Tipo de usuario</span>
                            <p>{role === 'Developer' ? 'Desarrollador' : 'Usuario normal'}</p>
                        </div>
                    </article>

                    <article className="profile-info-item">
                        <FaCalendarAlt />
                        <div>
                            <span>Fecha de registro</span>
                            <p>{formatDate(user?.createdAt || user?.created_at || user?.registrationDate)}</p>
                        </div>
                    </article>

                    <article className="profile-info-item">
                        <FaEnvelope />
                        <div>
                            <span>Correo</span>
                            <p>{user?.email || 'No disponible'}</p>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    )
}

export default Perfil