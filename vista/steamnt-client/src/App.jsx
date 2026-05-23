import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import './App.css'

function PaginaBase({ titulo }) {
    return (
        <section className="pagina-base">
            <h1>{titulo}</h1>
            <p>Es por mientras.</p>
        </section>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <main className="contenido-principal">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<PaginaBase titulo="Tienda" />} />
                    <Route path="/biblioteca" element={<PaginaBase titulo="Biblioteca" />} />
                    <Route path="/desarrollador" element={<PaginaBase titulo="Desarrollador" />} />
                    <Route path="/login" element={<PaginaBase titulo="Login" />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App
