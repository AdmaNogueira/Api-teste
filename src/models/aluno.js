import { openDb } from "../conexao/configDB.js";

class CreateTableAluno{
    static aluno(){
        const db = openDb();
        db.then( db => {
            db.exec('CREATE TABLE IF NOT EXISTS aluno(id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(100), turma INTEGER, turno VARCHAR(8), curso VARCHAR(100))')
        })
    }
}

export default CreateTableAluno;