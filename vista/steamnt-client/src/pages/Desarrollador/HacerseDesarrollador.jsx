import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { FaRocket } from "react-icons/fa"
import { convertirseDesarrollador } from "../../api/desarrolladorApi"
import "./HacerseDesarrollador.css"
import video from "../../assets/videos/pokeball-earth.mp4"

const VIDEO_LOOP_END = 5
const FAST_FORWARD_RATE = 6

const getSavedUser = () => {
    const user = localStorage.getItem("user")

    if (!user) return null

    try {
        return JSON.parse(user)
    } catch {
        return null
    }
}

const getData = (response) => response?.data ?? response

function HacerseDesarrollador() {
    const navigate = useNavigate()
    const videoRef = useRef(null)
    const isTransforming = useRef(false)

    const [stage, setStage] = useState("intro")
    const [showForm, setShowForm] = useState(false)
    const [studioName, setStudioName] = useState("")
    const [description, setDescription] = useState("")
    const [country, setCountry] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const user = getSavedUser()
        const role = localStorage.getItem("userRole") || user?.role

        if (role === "Developer") {
            navigate("/developer/dashboard")
        }
    }, [navigate])

    useEffect(() => {
        const player = videoRef.current

        if (!player) return

        if (stage === "intro") {
            isTransforming.current = false
            player.playbackRate = 1
            player.currentTime = 0
        }

        if (stage === "transforming") {
            player.playbackRate = FAST_FORWARD_RATE
        }

        player.play().catch(() => null)
    }, [stage])

    const handleVideoTimeUpdate = () => {
        const player = videoRef.current

        if (!player) return

        if (
            stage === "intro" &&
            !isTransforming.current &&
            player.currentTime >= VIDEO_LOOP_END
        ) {
            player.currentTime = 0
            player.play().catch(() => null)
        }
    }

    const handleVideoEnded = () => {
        const player = videoRef.current

        if (!player || !isTransforming.current) return

        player.pause()
        player.playbackRate = 1
        setShowForm(true)
    }

    const startTransformation = () => {
        const user = getSavedUser()
        const userId = localStorage.getItem("userId") || user?.id

        if (!userId) {
            toast.error("Debes iniciar sesión para hacerte desarrollador.")
            navigate("/login")
            return
        }

        isTransforming.current = true
        setStage("transforming")
    }

    const formIsValid = () => {
        const name = studioName.trim()
        const info = description.trim()
        const location = country.trim()

        if (!name || !info || !location) {
            toast.error("Todos los campos son obligatorios.")
            return false
        }

        if (name.length < 3) {
            toast.error("El nombre del estudio debe tener al menos 3 caracteres.")
            return false
        }

        if (info.length < 10) {
            toast.error("La descripción debe tener al menos 10 caracteres.")
            return false
        }

        return true
    }

    const saveDeveloperRole = (response) => {
        const user = getSavedUser()
        const developerData = getData(response)

        if (!user) return

        const updatedUser = {
            ...user,
            role: "Developer",
            studioName: studioName.trim(),
            description: description.trim(),
            country: country.trim(),
            developerId:
                developerData?.id ||
                developerData?.developerId ||
                user.developerId,
        }

        localStorage.setItem("user", JSON.stringify(updatedUser))
        localStorage.setItem("userRole", "Developer")

        if (updatedUser.developerId) {
            localStorage.setItem("developerId", updatedUser.developerId)
        }

        window.dispatchEvent(new Event("userUpdated"))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const user = getSavedUser()
        const userId = localStorage.getItem("userId") || user?.id

        if (!userId) {
            toast.error("Debes iniciar sesión para hacerte desarrollador.")
            navigate("/login")
            return
        }

        if (!formIsValid()) return

        try {
            setLoading(true)

            const response = await convertirseDesarrollador({
                userId: Number(userId),
                studioName: studioName.trim(),
                description: description.trim(),
                country: country.trim(),
            })

            saveDeveloperRole(response)

            toast.success("Ahora eres desarrollador en STEAMNT.")
            navigate("/developer/dashboard")
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "No se pudo crear el perfil de desarrollador."

            toast.error(message)
        } finally {
            setLoading(false)
        }
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
    )
}

export default HacerseDesarrollador