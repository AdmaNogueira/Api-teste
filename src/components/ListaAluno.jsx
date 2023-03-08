import axios from 'axios'
import { useState } from 'react';
import '../App.css';
import Modal from 'react-modal'

export default function ListaAlunos({ id, nome, turma, turno, curso }) {

    const deletealuno = () => {
        axios.delete(`http://localhost:3000/aluno/${id}`);
        setTimeout(() => {
            window.location.reload(1)
            Swal.fire(
                'Deletado!',
                'Cadastro de aluno deletado.',
                'successo'
            )
        }, 1000);
    }

    const btnDelete = () => Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá desfazer essa ação!",
        icon: 'Atenção',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
    }).then((dltaluno) => {
        if (dltaluno.isConfirmed) {
            deletealuno();
        }
    })

    const [edNome, setEdNome] = useState(nome);
    const [edTurma, setEdTurma] = useState(turma);
    const [edTurno, setEdTurno] = useState(turno);
    const [edCurso, setEdCurso] = useState(curso);
    const [edId, setEdId] = useState(id);

    const editaraluno = () => {
        axios.put(`http://localhost:3000/aluno/${id}`, {
            "id": edId,
            "nome": edNome,
            "turma": edTurma,
            "turno": edTurno,
            "curso": edCurso,
        });
        setTimeout(() => {
            window.location.reload(1)
        }, 450)
    }

    const [modalEditar, setModalEditar] = useState(false);
    function modalEditarOpen() {
        setModalEditar(true);
    }
    function modalEditarClosed() {
        setModalEditar(false);
    }

    return (
        <div>
            <div className='cardMap'>
                <h2 className='titulo'>#{id} {nome}</h2>
                <ul className='styleMap'>
                    <li><strong>Turma: </strong>{turma} </li>
                    <li><strong>Turno: </strong>{turno}</li>
                    <li><strong>Curso: </strong>{curso}</li>
                </ul>
                <div>
                    <div>
                        <button className='btn btnEditar' onClick={modalEditarOpen}>Editar</button>
                        <Modal
                            isOpen={modalEditar}
                            onRequestClose={modalEditarClosed}
                            contentLabel="Example Modal"
                            overlayClassName="modal-overlay"
                            className="modal-content"
                        >
                            <h1>{nome}</h1>
                            <form className='formEditar' onSubmit={editaraluno}>
                                <label>Id: <input type="text" name='id' value={id} disabled onChange={e => setEdId(e.target.value)} /></label>
                                <label htmlFor="">Aluno: <input type="text" name='nome' required value={edNome} onChange={e => setEdNome(e.target.value)} /></label>
                                <label htmlFor="">Turma: <input type="text" name='turma' required value={edTurma} onChange={e => setEdTurma(e.target.value)} /></label>
                                <label htmlFor="">Turno: <input type="text" name="turno" required value={edTurno} onChange={e => setEdTurno(e.target.value)} /></label>
                                <label htmlFor="">Curso: <input type="text" name='curso' required value={edCurso} onChange={e => setEdCurso(e.target.value)} /></label>
                                <input className='btn-salvar' type="submit" value="Salvar" />
                            </form>
                        </Modal>
                    </div>

                    <button className='btn remover' onClick={btnDelete}>Excluir</button>
                </div>
            </div>
        </div>
    )
}