import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { crearRevista, obtenerRevista, actualizarRevista } from '../services/revistaService';

const RevistaForm = () => {
    const [revista, setRevista] = useState({
        titulo: '',
        autor: '',
        anoPublicacion: '',
        numeroEdicion: '',
        categoria: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            obtenerRevista(id).then((res) => {
                const data = res.data;
                setRevista({
                    titulo: data.titulo || '',
                    autor: data.autor || '',
                    anoPublicacion: data.anoPublicacion || '',
                    numeroEdicion: data.numeroEdicion || '',
                    categoria: data.categoria || ''
                });
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setRevista({ ...revista, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await actualizarRevista(id, revista);
            } else {
                await crearRevista(revista);
            }
            navigate('/revistas');
        } catch (error) {
            console.error('Error guardando revista:', error);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{id ? 'Editar Revista' : 'Nueva Revista'}</h2>
            <form onSubmit={handleSubmit}>

                <div className="form-group-inline">
                    <div>
                        <label className="form-label">Título</label>
                        <input
                            type="text"
                            name="titulo"
                            className="form-control"
                            value={revista.titulo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Autor</label>
                        <input
                            type="text"
                            name="autor"
                            className="form-control"
                            value={revista.autor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group-inline">
                    <div>
                        <label className="form-label">Año de Publicación</label>
                        <input
                            type="number"
                            name="anoPublicacion"
                            className="form-control"
                            value={revista.anoPublicacion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Número Edición</label>
                        <input
                            type="number"
                            name="numeroEdicion"
                            className="form-control"
                            value={revista.numeroEdicion}
                            onChange={handleChange}
                            required
                            min="1"
                        />
                    </div>
                </div>

                <div className="form-group-inline">
                    <div>
                        <label className="form-label">Categoría</label>
                        <input
                            type="text"
                            name="categoria"
                            className="form-control"
                            value={revista.categoria}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                    <Link to="/revistas" className="btn btn-back">Cancelar</Link>
                    <button type="submit" className="btn btn-primary btn-submit">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RevistaForm;