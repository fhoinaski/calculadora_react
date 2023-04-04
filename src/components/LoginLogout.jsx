import React from 'react';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import useAuth from '../contexts/useAuth'; // Importe o hook useAuth
import { Link } from 'react-router-dom';


const LoginLogoutIcon = () => {
    const { isLoggedIn, doLogin, doLogout } = useAuth(); // Utilize o hook useAuth
  
    return (
      <div className="flex items-center justify-center">
        {isLoggedIn ? (
          <button onClick={doLogout} className="text-red-500">
            <FiLogOut className="text-2xl" />
          </button>
        ) : (
            <Link to="/login" className="text-green-500"> {/* Adicione o componente Link */}
            <FiLogIn className="text-2xl" />
          </Link>
        )}
      </div>
    );
  };
  
  export default LoginLogoutIcon;
  
