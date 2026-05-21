import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Store from "../pages/Store";
import Game from "../pages/Game";
import Library from "../pages/Library";
import BecomeDeveloper from "../pages/BecomeDeveloper";
import DeveloperDashboard from "../pages/DeveloperDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/store" element={<Store />} />
      <Route path="/game/:id" element={<Game />} />
      <Route path="/library" element={<Library />} />
      <Route path="/become-developer" element={<BecomeDeveloper />} />
      <Route path="/developer/dashboard" element={<DeveloperDashboard />} />
      <Route path="/developer/games/create" element={<DeveloperDashboard />} />
      <Route path="/developer/games/edit/:id" element={<DeveloperDashboard />} />
    </Routes>
  );
}