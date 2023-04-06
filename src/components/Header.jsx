import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import LoginLogoutIcon from './LoginLogout';
import useAuth from '../contexts/useAuth';

const MobileMenuButton = () => {
  const [titulo , setTitulo] = useState("Meus Projetos React");
  const [isOpen, setIsOpen] = useState(false);

 
  const { userName } = useAuth();

  useEffect(() => {
    if (userName) {
      setTitulo(`Que bom te ver, ${userName}!`);
      console.log("nome passado "+userName)
    } else {
      setTitulo("Meus Projetos React");
    }
  }, [userName]);
  

  // Abre ou fecha o menu
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Fecha o menu quando um link é clicado
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <div className={isOpen ? "bg-gray-800 text-white" : "bg-gray-900 text-white"}>
      <div className="flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-bold"><Link to="/">{titulo}</Link></h1>
        <button onClick={handleToggle} className="text-2xl">
          {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
      </div>
      {isOpen && (
        <div className="px-4 py-3">
          <ul>
          <li>
              <Link to="/Login" className="block py-2" onClick={closeMenu}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/Register" className="block py-2" onClick={closeMenu}>
                Cadastrar-se
              </Link>
            </li>
            <li>
              <Link to="/calculadora" className="block py-2" onClick={closeMenu}>
                Calculadora
              </Link>
            </li>
             <li>
              <LoginLogoutIcon />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenuButton;
