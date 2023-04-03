import React, { useEffect, useState } from 'react';
import { USERS_TABLE_ID, fetchTableRows,hashPassword, checkPassword } from '../api/baserow';
import { Link } from 'react-router-dom';



function Login() {
    const [email, setEmail] = useState('');

    // NÃO armazene a senha no estado e no localStorage.
    // const [password, setPassword] = useState('');
    const [password, setPassword] = useState(null);
    
    const [remember, setRemember] = useState(false);
    
    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        // const savedPassword = localStorage.getItem('password');
    
        if (savedEmail) {
            setEmail(savedEmail);
            // setPassword(savedPassword);
        }
    }, []);
    
    const checkUserExists = async (email, plainPassword) => {
        // importa o id da tabela de usuários da API
        const rows = await fetchTableRows(USERS_TABLE_ID);
        console.log("Linhas retornadas:", rows);
    
        // Encontre o usuário que corresponde ao e-mail fornecido
        const user = rows.find((row) => row.Email === email);
    
        if (user) {
            // Verifique se a senha fornecida corresponde à senha armazenada (hashed) para o usuário
            const isPasswordMatch = await checkPassword(plainPassword, user.password);
            console.log("A senha fornecida está correta:", isPasswordMatch);
            return isPasswordMatch;
        }
    
        console.log("Usuário não encontrado");
        return false;
    };
    



    const handleSubmit = async (e) => {
        e.preventDefault();
        const userExists = await checkUserExists(email, password);
      
        if (userExists) {
          console.log("Usuário encontrado.");
      
          if (remember) {
            localStorage.setItem('email', email);
          } else {
            localStorage.removeItem('email');
          }
      
          // Adicione a lógica para navegar até a página inicial ou outra página após o login bem-sucedido
        } else {
          console.log("Usuário não encontrado.");
          // Mostre uma mensagem de erro para o usuário, se necessário
        }
      };
      

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Acesse seu Cadastro</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Informe seu Email
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Informe sua senha
                            </label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />

                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Lembrar
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Não tenho cadastro
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login;
