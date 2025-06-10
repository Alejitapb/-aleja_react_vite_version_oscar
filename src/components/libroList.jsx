// src/components/LibroList.js
import React, { useEffect, useState } from 'react';
import { obtenerLibros, eliminarLibro } from '../services/libroService';
import { Link } from 'react-router-dom';
import '../styles/Lists.css';

const LibroList = () => {
    const [libros, setLibros] = useState([]);
    const [filtros, setFiltros] = useState({
        titulo: '',
        autor: '',
        genero: '',
        editorial: ''
    });

    useEffect(() => {
        cargarLibros();
    }, []);

    const cargarLibros = async () => {
        const response = await obtenerLibros();
        setLibros(response.data);
    };

    const borrarLibro = async (id) => {
        await eliminarLibro(id);
        cargarLibros();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros({ ...filtros, [name]: value });
    };

    const filtrarLibros = () => {
        return libros.filter(libro =>
            libro.titulo.toLowerCase().includes(filtros.titulo.toLowerCase()) &&
            libro.autor.toLowerCase().includes(filtros.autor.toLowerCase()) &&
            libro.genero.toLowerCase().includes(filtros.genero.toLowerCase()) &&
            libro.editorial.toLowerCase().includes(filtros.editorial.toLowerCase())
        );
    };

    const limpiarFiltros = () => {
        setFiltros({ titulo: '', autor: '', genero: '', editorial: '' });
    };

    return (
        <div className="container-box">
            <h1 className="page-title">Lista de Libros</h1>

            <div className="search-container">
                <div className="search-row">
                    <div>
                        <label className="search-label">Título</label>
                        <input type="text" className="search-input" name="titulo" value={filtros.titulo} onChange={handleChange} placeholder="Buscar por título" />
                    </div>
                    <div>
                        <label className="search-label">Autor</label>
                        <input type="text" className="search-input" name="autor" value={filtros.autor} onChange={handleChange} placeholder="Buscar por autor" />
                    </div>
                </div>
                <div className="search-row">
                    <div>
                        <label className="search-label">Género</label>
                        <input type="text" className="search-input" name="genero" value={filtros.genero} onChange={handleChange} placeholder="Buscar por género" />
                    </div>
                    <div>
                        <label className="search-label">Editorial</label>
                        <input type="text" className="search-input" name="editorial" value={filtros.editorial} onChange={handleChange} placeholder="Buscar por editorial" />
                    </div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-2">
                    <button className="btn btn-light" onClick={limpiarFiltros}>Limpiar</button>
                    {/* No hay búsqueda al servidor, es filtrado local */}
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">Resultados</h2>
                <Link to="/libros/nuevo" className="btn btn-primary btn-add">
                    <i className="fas fa-plus"></i> Nuevo Libro
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Año</th>
                        <th>Páginas</th>
                        <th>Género</th>
                        <th>ISBN</th>
                        <th>Editorial</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtrarLibros().map((libro) => (
                        <tr key={libro.id}>
                            <td>{libro.titulo}</td>
                            <td>{libro.autor}</td>
                            <td>{libro.anoPublicacion}</td>
                            <td>{libro.numeroPaginas}</td>
                            <td>{libro.genero}</td>
                            <td>{libro.isbn}</td>
                            <td>{libro.editorial}</td>
                            <td>
                                <div className="action-buttons">
                                    <Link to={`/libros/editar/${libro.id}`} className="btn-action btn-edit" title="Editar">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <button onClick={() => borrarLibro(libro.id)} className="btn-action btn-delete" title="Eliminar">
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LibroList;