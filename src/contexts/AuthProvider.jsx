import React, { createContext, useCallback, useEffect, useState } from 'react';
import { USERS_TABLE_ID, createRow, hashPassword, isEmailRegistered, fetchTableRows, checkPassword } from '../api/baserow';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateToken } from '../api/jwt/token';
import {salvaTokendaSessaoCookie} from '../api/jwt/setCookies'
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};


const AuthProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

   const [auth, setAuth] = useState({
    isLoggedIn: false,
    token: '',
    user: {},
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState(null);


  const isTokenValid = () => {
    const token = Cookies.get('token');
    const tokenExpiresIn = Cookies.get('tokenExpiresIn');
  
    console.log('Cookies:', document.cookie);
    
    
    if (token && Date.now() < tokenExpiresIn) {
      return true;
    }
    return false;
  };
  

  const checkStoredAuthData = useCallback(() => {
    console.log('Verificando dados de autenticação armazenados...');
    const token = Cookies.get('token');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const tokenExpiresIn = Cookies.get('tokenExpiresIn');

    console.log(sessionStorage.getItem('user')) 
    
    if (token && user && isTokenValid()) {
      setAuth({
        isLoggedIn: true,
        token: token,
        user: user,
      });
      console.log(auth)
    } else {
      if (token && !isTokenValid()) {
        Cookies.remove('token');
        Cookies.remove('tokenExpiresIn');
        sessionStorage.clear();
      }
    }
  
  }, []);
  
  
  

  useEffect(() => {
    checkStoredAuthData();
  }, [checkStoredAuthData]);
  useEffect(() => {
    setLoading(false);
  }, [auth]);
 
  

  const checkUserExists = async (email, password) => {
    const rows = await fetchTableRows(USERS_TABLE_ID);
    const user = rows.find((row) => row.Email === email);

    if (user) {
      return await checkPassword(password, user.Password) ? user : null;
    }

    console.log("Usuário não encontrado");
    return null;
  };

  const doLogin = async (e) => {
    e.preventDefault();
    const user = await checkUserExists(formData.email, formData.password);

    if (user) {
      const { token } = generateToken(formData.email);
      salvaTokendaSessaoCookie(token);
      const userToStore = {
        Nome: user.Nome,
        Email: user.Email,
      };
      sessionStorage.setItem('user', JSON.stringify(userToStore));
    
      setAuth({
        isLoggedIn: true,
        token: token,
        user: { email: formData.email, Nome: user.Nome },
      });

      const targetPath = location.state?.from || '/'; // 
      setRedirectTo(targetPath);
    } else {
      console.log("Usuário não encontrado.");
    }    
  };
  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo);
      setRedirectTo(null);
    }
  }, [redirectTo, navigate]);

  const doLogout = () => {
    setAuth({
      isLoggedIn: false,
      token: '',
      user: {},
    });
  
    // Remover os cookies
    Cookies.remove('token');
    Cookies.remove('tokenExpiresIn');
  
    // Limpar os dados da sessão
    sessionStorage.clear();
  
    // Redirecionar o usuário para a página de login ou outra página apropriada
    navigate('/login');
  };


  const updateFormData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    message: '',
  });

  const updateModalState = (newState) => {
    setModalState({ ...modalState, ...newState });
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, open: false });
  };


  const registerUser = async (e) => {
    e.preventDefault();

    const { nome, sobrenome, email, password, passwordConfirmation } = formData;

    if (password !== passwordConfirmation) {
      console.log("As senhas não correspondem");

      updateModalState({
        open: true,
        title: "Erro",
        message: "As senhas não correspondem",
      });

      // Exiba uma mensagem de erro para o usuário, se necessário
      return;
    }

    if (await isEmailRegistered(USERS_TABLE_ID, email)) {
      console.log("Email já cadastrado");

      updateModalState({
        open: true,
        title: "Atenção",
        message: "Email já cadastrado",
      });

      return;
    }

    const hashedPassword = await hashPassword(password);

    const newRowData = {
      "Nome": nome,
      "Sobrenome": sobrenome,
      "Email": email,
      "Password": hashedPassword,
    };

    const newRow = await createRow(USERS_TABLE_ID, newRowData);

    if (newRow) {
      console.log("Usuário cadastrado com sucesso");
    } else {
      console.log("Ocorreu um erro ao cadastrar o usuário");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        formData,
        updateFormData,
        modalState,
        updateModalState,
        registerUser,
        handleCloseModal,
        doLogin,
        isLoggedIn: auth.isLoggedIn,
        doLogout,
        userName: auth.user.Nome,
        loading,
        location,

      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;
