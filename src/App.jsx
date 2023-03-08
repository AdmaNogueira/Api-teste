import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import Navbar from '../view/components/Navbar.jsx';
import Alunos from './rotas/Alunos.jsx';
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Rotas />} />
        <Route path='/aluno' element={<Alunos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App