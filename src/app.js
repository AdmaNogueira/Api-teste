import express from 'express';
import cors from 'cors';
import { openDb } from './conexao/configDB.js';
 
//Classes Create Table

import CreateTableAluno from './models/aluno.js';

//Classes Rotes

import AlunoController from './controller/alunoController.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());

//Função DataBase Init
openDb();
CreateTableAluno.aluno();

AlunoController.rotas(app);


app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`Servidor conectado na porta ${port}`);
})