import React, { createContext, useEffect, useState } from 'react';
import { USERS_TABLE_ID, createRow, hashPassword, isEmailRegistered, fetchTableRows, checkPassword } from '../api/baserow';
import { useRouter } from 'vue-router';





export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();






  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setFormData((prevFormData) => ({ ...prevFormData, email: savedEmail }));
    }
  }, []);

  const checkUserExists = async (email, password) => {
    // importa o id da tabela de usuários da API
    const rows = await fetchTableRows(USERS_TABLE_ID);
    console.log("Linhas retornadas:", rows);

    // Encontre o usuário que corresponde ao e-mail fornecido
    const user = rows.find((row) => row.Email === email);
    console.log("Usuário encontrado:", user);
    setUserName(user.Nome);
    console.log("Nome do usuário:", userName);


    if (user) {
      // Verifique se a senha fornecida corresponde à senha armazenada (hashed) para o usuário
      const isPasswordMatch = await checkPassword(password, user.Password);
      console.log("A senha fornecida está correta:", isPasswordMatch);
      return isPasswordMatch;
    }

    console.log("Usuário não encontrado");
    return false;
  };

  const doLogin = async (e) => {
    console.log('doLogin called');
    e.preventDefault();
    const userExists = await checkUserExists(formData.email, formData.password);

    if (userExists) {
      console.log("Usuário encontrado.");

      setIsLoggedIn(true); // Atualize o estado para indicar que o usuário está logado
      console.log("Nome do usuário:", userName);
      // Adicione a lógica para navegar até a página inicial ou outra página após o login bem-sucedido
      localStorage.setItem("email",);
      localStorage.setItem("logado", isLoggedIn);
      // Redirecionar o usuário para a página inicial
      router.push('/calculadora');




    } else {
      console.log("Usuário não encontrado.");
      // Mostre uma mensagem de erro para o usuário, se necessário
    }
  };


  const doLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("email");
    localStorage.removeItem("logado");
    setUserName("");
  };



  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    message: '',
  });

  const updateFormData = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const updateModalState = (newState) => {
    setModalState({
      ...modalState,
      ...newState,
    });
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


  const handleCloseModal = () => {
    setModalState({ ...modalState, open: false });
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
        isLoggedIn,
        setIsLoggedIn,
        doLogout,
        userName,

      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;
