import { openDb } from "../conexao/configDB.js";
const db = openDb();

export default class AlunoCRUD{
    static listarAluno(req, res){
        const query = 'SELECT * FROM aluno';
        db.then(db => {
            db.all(query).then(aluno => res.json(aluno));
        })
    }

    static listarAlunoId(req, res){
        const query = 'SELECT * FROM aluno WHERE id = ?';
        const id = req.params.id;
        db.then(db => {
            db.get(query, [id]).then(alunoId => res.json(alunoId));
        })
    }

    static postarAluno(req, res){
        const query = 'INSERT INTO aluno(nome, turma, turno, curso) VALUES(?, ?, ?, ?)';
        const aluno = req.body;
        db.then(db => {
            db.run(query, [aluno.nome, aluno.turma, aluno.turno, aluno.curso])
        })
        res.json({
            "statusCode": "200"
        })
    }

    static editarAluno(req, res){
        const query = 'UPDATE aluno SET nome = ?, turma = ?, turno = ?, curso = ? WHERE id = ?'
        const aluno = req.body;
        db.then(db => {
            db.run(query, [aluno.nome, aluno.turma, aluno.turno, aluno.curso, aluno.id])
        })
        res.json({
            "statuCode": "200"
        })
    }

    static deletarAluno(req, res){
        const query = 'DELETE FROM aluno WHERE id = ?';
        const id = req.params.id;
        db.then(db => {
            db.run(query, [id])
        })
        res.json({
            "statusCode": "200"
        })
    }
}