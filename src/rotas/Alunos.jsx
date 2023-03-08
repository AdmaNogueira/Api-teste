import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ListaAlunos from "../components/ListaAluno";
import { useEffect, useState } from "react";
import Modal from 'react-modal';

export default function alunos() {
  const [alunos, setalunos] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/aluno").then((res) => setalunos(res.data));
  }, []);

  const [getalunoId, setGetalunoId] = useState({});
  const [busca, setBusca] = useState(false);
  const [alunoId, setalunoId] = useState("");

  const alunosRender = alunos.map((aluno) => (
    <ListaAlunos
      id={aluno.id}
      nome={aluno.nome}
      turma={aluno.turma}
      turno={aluno.turno}
      curso={aluno.curso}
    />
  ));

  const buscar = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:3000/aluno/${alunoId}`).then((res) => {
      setGetalunoId(res.data);
      setBusca(true);
    });
  };
  
  const msgErro = (
    <div className="msgErro">
      <p className="pError">O número de id informado não existe!</p>
      
    </div>
  )

  const alunoIdRender = (
    <div className="listaMapId">
      <button className="btn rota btnLista" onClick={() => setBusca(false)}>Lista de Alunos</button>
      {getalunoId.length == 0 ? msgErro : <ListaAlunos
        id={getalunoId.id}
        nome={getalunoId.nome}
        turma={getalunoId.turma}
        turno={getalunoId.turno}
        curso={getalunoId.curso}
      />}
    </div>
  );

  // MODAL PARA REGISTRO DE ALUNOS

  const [modalEditar, setModalEditar] = useState(false);
  function modalEditarOpen() {
      setModalEditar(true);
  }
  function modalEditarClosed() {
      setModalEditar(false);
  }

  const [nome, setNome] = useState();
    const [turma, setTurma] = useState();
    const [turno, setTurno] = useState();
    const [curso, setCurso] = useState();


    const postAPI = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/aluno', {
            "nome": nome,
            "turma": turma,
            "turno": turno,
            "curso": curso,
        })
        setTimeout(() => {
            window.location.href = '/aluno'
        }, 1000)

        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Cadastrado com Sucesso',
            showConfirmButton: true,
            timer: 1500
        })
    }

  // FIM DO MODAL PARA REGISTRO DE ALUNOS

  return (
    <div>
      <div className="listagem">
        <h1>Alunos</h1>
        <p className="pDescricao">Alunos matriculados em nossa instituição:</p>
        <div>
        <button className="btn adicionar" onClick={modalEditarOpen}>Adicionar aluno</button>
        <Modal
            isOpen={modalEditar}
            onRequestClose={modalEditarClosed}
            contentLabel="Example Modal"
            overlayClassName="modal-overlay"
            className="modal-content"
          >
            <div className='formAPI'>
            <h1>Cadastro de Alunos</h1>
            <form onSubmit={postAPI} >
                <input type="text" name='nome' required placeholder='Digite o nome do aluno' onChange={e => setNome(e.target.value)} />
                <input type="text" name='turma' required placeholder='Digite sua turma' onChange={e => setTurma(e.target.value)} />
                <input type="text" name="turno" required placeholder='Digite seu turno' onChange={e => setTurno(e.target.value)} />
                <input type="text" name='curso' required placeholder='Digite seu curso' onChange={e => setCurso(e.target.value)} />
                <input id="btnPost" type="submit" value="Adicionar" />
            </form>
              </div>

          </Modal>


          <form className="caixa-busca" action="" onSubmit={buscar}>
            <input
              className="caixa-pesquisa"
              type="text"
              name="busca"
              required
              placeholder="Digite o ID do aluno..."
              value={alunoId}
              onChange={(e) => setalunoId(e.target.value)}
            />
            <input className="button-buscar " type="submit" value="Buscar" />
          </form>
        </div>
        <p className="listaMap">{busca ? alunoIdRender : alunosRender}</p>
      </div>
    </div>
  );
}