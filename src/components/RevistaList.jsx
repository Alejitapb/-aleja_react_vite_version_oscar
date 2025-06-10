import React, { useEffect, useState } from 'react';
import {
    obtenerRevistas,
    eliminarRevista,
    buscarRevistasPorTitulo,
    buscarRevistasPorAutor,
    buscarRevistasPorCategoria
} from '../services/revistaService';
import { Link } from 'react-router-dom';

const RevistaList = () => {
    const [revistas, setRevistas] = useState([]);
    const [filtros, setFiltros] = useState({ titulo: '', autor: '', categoria: '' });

    useEffect(() => {
        cargarRevistas();
    }, []);

    const cargarRevistas = async () => {
        try {
            const response = await obtenerRevistas();
            setRevistas(response.data);
        } catch (error) {
            console.error('Error al cargar revistas:', error);
        }
    };

    const borrarRevista = async (id) => {
        if (!window.confirm('¿Seguro que quieres eliminar esta revista?')) return;
        try {
            await eliminarRevista(id);
            cargarRevistas();
        } catch (error) {
            console.error('Error eliminando revista:', error);
        }
    };

    const handleChange = (e) => {
        setFiltros({ ...filtros, [e.target.name]: e.target.value });
    };

    // Búsqueda combinada local y backend según filtros
    const aplicarFiltros = async () => {
        try {
            if (filtros.titulo) {
                const res = await buscarRevistasPorTitulo(filtros.titulo);
                setRevistas(res.data);
            } else if (filtros.autor) {
                const res = await buscarRevistasPorAutor(filtros.autor);
                setRevistas(res.data);
            } else if (filtros.categoria) {
                const res = await buscarRevistasPorCategoria(filtros.categoria);
                setRevistas(res.data);
            } else {
                cargarRevistas();
            }
        } catch (error) {
            console.error('Error buscando revistas:', error);
        }
    };

    const limpiarFiltros = () => {
        setFiltros({ titulo: '', autor: '', categoria: '' });
        cargarRevistas();
    };

    return (
        <div className="container-box">
            <h1 className="page-title">Lista de Revistas</h1>

            <div className="search-container">
                <div className="search-row">
                    <div>
                        <label className="search-label">Título</label>
                        <input
                            type="text"
                            name="titulo"
                            value={filtros.titulo}
                            onChange={handleChange}
                            className="search-input"
                            placeholder="Buscar por título"
                        />
                    </div>
                    <div>
                        <label className="search-label">Autor</label>
                        <input
                            type="text"
                            name="autor"
                            value={filtros.autor}
                            onChange={handleChange}
                            className="search-input"
                            placeholder="Buscar por autor"
                        />
                    </div>
                </div>

                <div className="search-row">
                    <div>
                        <label className="search-label">Categoría</label>
                        <input
                            type="text"
                            name="categoria"
                            value={filtros.categoria}
                            onChange={handleChange}
                            className="search-input"
                            placeholder="Buscar por categoría"
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-2">
                    <button className="btn btn-primary" onClick={aplicarFiltros}>Buscar</button>
                    <button className="btn btn-light" onClick={limpiarFiltros}>Limpiar</button>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">Resultados</h2>
                <Link to="/revistas/nuevo" className="btn btn-primary btn-add">
                    <i className="fas fa-plus"></i> Nueva Revista
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Año</th>
                        <th>Número Edición</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {revistas.map((revista) => (
                        <tr key={revista.id}>
                            <td>{revista.titulo}</td>
                            <td>{revista.autor}</td>
                            <td>{revista.anoPublicacion}</td>
                            <td>{revista.numeroEdicion}</td>
                            <td>{revista.categoria}</td>
                            <td>
                                <div className="action-buttons">
                                    <Link to={`/revistas/editar/${revista.id}`} className="btn-action btn-edit" title="Editar">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <button
                                        onClick={() => borrarRevista(revista.id)}
                                        className="btn-action btn-delete"
                                        title="Eliminar"
                                    >
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

export default RevistaList;