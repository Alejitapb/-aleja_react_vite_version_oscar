import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ElementoList from './components/ElementoList';
import LibroList from './components/libroList';
import LibroForm from './components/libroForm';
import DVDList from './components/DVDList';
import RevistaList from './components/RevistaList';
import DVDForm from "./components/DVDForm.jsx";
import RevistaForm from "./components/RevistaForm.jsx";

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<ElementoList />} />
                <Route path="/libros" element={<LibroList />} />
                <Route path="libros/nuevo" element={<LibroForm />} />
                <Route path="libros/editar/:id" element={<LibroForm />} />
                <Route path="/dvds" element={<DVDList />} />
                <Route path="/dvds/nuevo" element={<DVDForm />} />
                <Route path="/dvds/editar/:id" element={<DVDForm />} />
                <Route path="/revistas" element={<RevistaList />} />
                <Route path="/revistas/nuevo" element={<RevistaForm />} />
                <Route path="/revistas/editar/:id" element={<RevistaForm />} />
            </Routes>
        </>
    );
};

export default App;