import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='navbar'>
    

    <ul className='navLinks'>
      <li><Link className='links' to='/aluno'>Alunos</Link></li>
    </ul>
    
  </div>
  )
}

export default Navbar