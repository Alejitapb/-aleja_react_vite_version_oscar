import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <NavLink className="navbar-brand fw-bold" to="/">Biblioteca</NavLink>
            <div className="navbar-nav">
                <NavLink className="nav-link" to="/">Todos los elementos</NavLink>
                <NavLink className="nav-link" to="/libros">Libros</NavLink>
                <NavLink className="nav-link" to="/dvds">DVDs</NavLink>
                <NavLink className="nav-link" to="/revistas">Revistas</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;