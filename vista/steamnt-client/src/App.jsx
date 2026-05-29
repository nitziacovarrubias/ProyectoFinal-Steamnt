import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Store from './pages/Store'
import Registro from './pages/Registro/Registro'
import Login from './pages/Login/Login'
import Library from './pages/Library/Library'
import GameDetail from './pages/GameDetail/GameDetail'
import Desarrollador from './pages/Desarrollador/HacerseDesarrollador'
import Dashboard from './pages/Desarrollador/Dashboard'
import SidebarLayout from './components/Sidebar/SidebarLayout'
import { Toaster } from 'sonner'
import './App.css'
import Perfil from './pages/Perfil/Perfil'
function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <SidebarLayout>
                <Toaster richColors position="bottom-right" />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/biblioteca" element={<Library />} />
                    <Route path="/game/:id" element={<GameDetail />} />
                    <Route path="/desarrollador" element={<Desarrollador />} />
                    <Route path="/register" element={<Registro />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/perfil" element={<Perfil />} />

                    <Route path="/developer/dashboard" element={<Dashboard />} />
                    <Route path="/developer/games" element={<Dashboard />} />
                    <Route path="/developer/publicar" element={<h1>Publicar juego</h1>} />
                    <Route path="/developer/games/edit/:id" element={<h1>Editar juego</h1>} />
                </Routes>
            </SidebarLayout>
        </BrowserRouter>
    )
}

export default App