import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Registro from './pages/Registro/Registro'
import Login from './components/Login'
import './App.css'
import {Toaster} from "sonner"

function PaginaBase({ titulo }) {
    return (
        <section className="pagina-base">
            <h1>{titulo}</h1>
            <p>Es por mientras</p>
        </section>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="contenido-principal">
                <Toaster richColors position="bottom-right" />
                <Routes>
                    <Route path="/" element={<PaginaBase titulo="Inicio" />} />
                    <Route path="/store" element={<PaginaBase titulo="Tienda" />} />
                    <Route path="/biblioteca" element={<PaginaBase titulo="Biblioteca" />} />
                    <Route path="/desarrollador" element={<PaginaBase titulo="Desarrollador" />} />
                    <Route path="/register" element={<Registro />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App
