import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { crearDVD, obtenerDVD, actualizarDVD } from '../services/dvdService';
import '../styles/Forms.css';

const DVDForm = () => {
    const [dvd, setDVD] = useState({
        titulo: '',
        autor: '',
        anoPublicacion: '',
        duracion: '',
        genero: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            obtenerDVD(id).then(res => {
                // En la base de datos puede venir con Duracion o duracion, asegúrate que sea duracion en el frontend
                const dvdData = res.data;
                setDVD({
                    titulo: dvdData.titulo || '',
                    autor: dvdData.autor || '',
                    anoPublicacion: dvdData.anoPublicacion || '',
                    duracion: dvdData.duracion || dvdData.Duracion || '',
                    genero: dvdData.genero || ''
                });
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setDVD({ ...dvd, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await actualizarDVD(id, dvd);
            } else {
                await crearDVD(dvd);
            }
            navigate('/dvds');
        } catch (error) {
            console.error('Error guardando DVD:', error);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{id ? 'Editar DVD' : 'Nuevo DVD'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group-inline">
                    <div>
                        <label className="form-label">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            name="titulo"
                            value={dvd.titulo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Autor</label>
                        <input
                            type="text"
                            className="form-control"
                            name="autor"
                            value={dvd.autor}
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
                            className="form-control"
                            name="anoPublicacion"
                            value={dvd.anoPublicacion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Duración (minutos)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="duracion"
                            value={dvd.duracion}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>
                </div>

                <div className="form-group-inline">
                    <div>
                        <label className="form-label">Género</label>
                        <input
                            type="text"
                            className="form-control"
                            name="genero"
                            value={dvd.genero}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                    <Link to="/dvds" className="btn btn-back">Cancelar</Link>
                    <button type="submit" className="btn btn-primary btn-submit">Guardar</button>
                </div>
            </form>
        </div>
    );
};

export default DVDForm;