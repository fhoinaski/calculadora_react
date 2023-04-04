import React, { createContext, useCallback, useEffect, useState } from 'react';
import { USERS_TABLE_ID, createRow, hashPassword, isEmailRegistered, fetchTableRows, checkPassword } from '../api/baserow';
import { useNavigate } from 'react-router-dom';
import { generateToken } from '../api/jwt/token';

export const AuthContext = createContext();

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

  const navigator = useNavigate();


  const checkStoredAuthData = useCallback(() => {
    const token = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const tokenExpiresIn = sessionStorage.getItem('tokenExpiresIn');
  
    if (token && user && isTokenValid(token, tokenExpiresIn)) {
      setAuth({
        isLoggedIn: true,
        token: token,
        user: user,
      });
    } else {
      sessionStorage.clear();
    }
  }, []);
  
  useEffect(() => {
    checkStoredAuthData();
  }, [checkStoredAuthData]);


  

  const isTokenValid = (token, tokenExpiresIn) => {
    if (Date.now() < tokenExpiresIn) {
      return true;
    } else {
      console.error('Token expirado');
      return false;
    }
  };

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
      const { token, expiresIn } = generateToken(formData.email);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('tokenExpiresIn', expiresIn);
      sessionStorage.setItem('user', JSON.stringify({ email: formData.email, name: user.Nome }));

      setAuth({
        isLoggedIn: true,
        token: token,
        user: { email: formData.email, name: user.Nome },
      });

      navigator('/');
    } else {
      console.log("Usuário não encontrado.");
    }
  };

  const doLogout = () => {
    setAuth({
      isLoggedIn: false,
      token: '',
      user: {},
    });
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tokenExpiresIn");
    sessionStorage.removeItem("user");
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
        userName: auth.user.name,

      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;
