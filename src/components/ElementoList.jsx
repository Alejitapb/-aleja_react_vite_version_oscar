import React, { useEffect, useState } from 'react';
import { buscarElementosPorTitulo, obtenerElementos } from '../services/elementoService';

const ElementoList = ({ tipoFiltro }) => {
    const [elementos, setElementos] = useState([]);
    const [tituloBuscar, setTituloBuscar] = useState('');

    const cargarElementos = async () => {
        try {
            const res = await obtenerElementos();
            let datos = res.data;

            if (tipoFiltro) {
                datos = datos.filter(el => el.tipo.toLowerCase() === tipoFiltro.toLowerCase());
            }

            setElementos(datos);
        } catch (error) {
            console.error('Error al obtener los elementos', error);
        }
    };

    const buscarPorTitulo = async () => {
        try {
            const res = await buscarElementosPorTitulo(tituloBuscar);
            let datos = res.data;

            if (tipoFiltro) {
                datos = datos.filter(el => el.tipo.toLowerCase() === tipoFiltro.toLowerCase());
            }

            setElementos(datos);
        } catch (error) {
            console.error('Error al buscar elementos por título', error);
        }
    };

    useEffect(() => {
        cargarElementos();
    }, [tipoFiltro]);

    return (
        <div className="container-box">
            <h1 className="page-title">Listado de {tipoFiltro || 'Todos los Elementos'}</h1>

            <div className="search-container">
                <label className="search-label">Buscar por título</label>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Escribe un título..."
                    value={tituloBuscar}
                    onChange={(e) => setTituloBuscar(e.target.value)}
                />
                <div className="d-flex justify-content-end gap-2 mt-2">
                    <button className="btn btn-primary" onClick={buscarPorTitulo}>Buscar</button>
                    <button className="btn btn-light" onClick={cargarElementos}>Limpiar</button>
                </div>
            </div>

            {elementos.length === 0 ? (
                <p>No hay elementos para mostrar.</p>
            ) : (
                <div className="table-responsive mt-4">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Año</th>
                            <th>Tipo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {elementos.map(el => (
                            <tr key={el.id}>
                                <td>{el.titulo}</td>
                                <td>{el.autor}</td>
                                <td>{el.anoPublicacion}</td>
                                <td>{el.tipo}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ElementoList;