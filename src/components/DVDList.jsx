import React, { useEffect, useState } from 'react';
import { obtenerDVDs, eliminarDVD } from '../services/dvdService';
import { Link } from 'react-router-dom';
import '../styles/Lists.css';

const DVDList = () => {
    const [dvds, setDvds] = useState([]);
    const [filtros, setFiltros] = useState({
        titulo: '',
        autor: '',
        genero: ''
    });

    useEffect(() => {
        cargarDVDs();
    }, []);

    const cargarDVDs = async () => {
        try {
            const response = await obtenerDVDs();
            setDvds(response.data);
        } catch (error) {
            console.error('Error cargando DVDs:', error);
        }
    };

    const borrarDVD = async (id) => {
        try {
            await eliminarDVD(id);
            cargarDVDs();
        } catch (error) {
            console.error('Error eliminando DVD:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros({ ...filtros, [name]: value });
    };

    const filtrarDVDs = () => {
        return dvds.filter(dvd =>
            dvd.titulo.toLowerCase().includes(filtros.titulo.toLowerCase()) &&
            dvd.autor.toLowerCase().includes(filtros.autor.toLowerCase()) &&
            dvd.genero.toLowerCase().includes(filtros.genero.toLowerCase())
        );
    };

    const limpiarFiltros = () => {
        setFiltros({ titulo: '', autor: '', genero: '' });
    };

    return (
        <div className="container-box">
            <h1 className="page-title">Lista de DVDs</h1>

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
                </div>
                <div className="d-flex justify-content-end gap-2 mt-2">
                    <button className="btn btn-light" onClick={limpiarFiltros}>Limpiar</button>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">Resultados</h2>
                <Link to="/dvds/nuevo" className="btn btn-primary btn-add">
                    <i className="fas fa-plus"></i> Nuevo DVD
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Año</th>
                        <th>Duración (min)</th>
                        <th>Género</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtrarDVDs().map((dvd) => (
                        <tr key={dvd.id}>
                            <td>{dvd.titulo}</td>
                            <td>{dvd.autor}</td>
                            <td>{dvd.anoPublicacion}</td>
                            <td>{dvd.duracion}</td>
                            <td>{dvd.genero}</td>
                            <td>
                                <div className="action-buttons">
                                    <Link to={`/dvds/editar/${dvd.id}`} className="btn-action btn-edit" title="Editar">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <button onClick={() => borrarDVD(dvd.id)} className="btn-action btn-delete" title="Eliminar">
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

export default DVDList;