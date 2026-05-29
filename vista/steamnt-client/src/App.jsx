import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Store from './pages/Store'
import Registro from './pages/Registro/Registro'
import Login from './pages/Login/Login'
import './App.css'
import {Toaster} from "sonner"
import Library from './pages/Library/Library'
import GameDetail from './pages/GameDetail/GameDetail'

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
                <Toaster richColors position="bottom-right" />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/biblioteca" element={<Library/>} />
                    <Route path="/game:id" element={<GameDetail />} />
                    <Route path="/desarrollador" element={<PaginaBase titulo="Desarrollador" />} />
                    <Route path="/register" element={<Registro />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App
