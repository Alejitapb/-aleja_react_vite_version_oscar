import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { crearLibro, obtenerLibro, actualizarLibro } from '../services/libroService';
import '../styles/Forms.css';

const LibroForm = () => {
    const [libro, setLibro] = useState({
        titulo: '',
        autor: '',
        anoPublicacion: '',
        isbn: '',
        numeroPaginas: '',
        genero: '',
        editorial: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            obtenerLibro(id).then(res => setLibro(res.data));
        }
    }, [id]);

    const handleChange = (e) => {
        setLibro({ ...libro, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await actualizarLibro(id, libro);
        } else {
            await crearLibro(libro);
        }
        navigate('/');
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{id ? 'Editar Libro' : 'Nuevo Libro'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group-inline">
                    <div>
                        <label className="form-label">Título</label>
                        <input type="text" className="form-control" name="titulo" value={libro.titulo} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="form-label">Autor</label>
                        <input type="text" className="form-control" name="autor" value={libro.autor} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-group-inline">
                    <div>
                        <label className="form-label">Año de Publicación</label>
                        <input type="number" className="form-control" name="anoPublicacion" value={libro.anoPublicacion} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="form-label">ISBN</label>
                        <input type="text" className="form-control" name="isbn" value={libro.isbn} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-group-inline">
                    <div>
                        <label className="form-label">Número de Páginas</label>
                        <input type="number" className="form-control" name="numeroPaginas" value={libro.numeroPaginas} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="form-label">Género</label>
                        <input type="text" className="form-control" name="genero" value={libro.genero} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="form-label">Editorial</label>
                        <input type="text" className="form-control" name="editorial" value={libro.editorial} onChange={handleChange} />
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                    <Link to="/" className="btn btn-back">Cancelar</Link>
                    <button type="submit" className="btn btn-primary btn-submit">Guardar</button>
                </div>
            </form>
        </div>
    );
};

export default LibroForm;