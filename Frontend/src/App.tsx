import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SearchTherapists from './components/SearchTherapists';
import TherapistDetails from './components/TherapistDetails';
import ChatWithTherapist from './components/ChatWithTherapist';
import Footer from './components/Footer';
import PsicologoPerfil from "./components/PsicologoPerfil.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchTherapists />} />
            <Route path="/therapist/:id" element={<TherapistDetails />} />
            <Route path="/psicologo/:id" element={<PsicologoPerfil />} />
            <Route path="/chat/:id" element={<ChatWithTherapist />} /> {/* Ruta para cada chat con su id */}
            <Route path="/messages" element={<ChatWithTherapist />} /> {/* Ruta para mostrar la página de mensajes */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
