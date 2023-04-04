import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from "../contexts/useAuth";


function Login() {
    const {
        formData,
        updateFormData,
        doLogin,
      } = useAuth(); // Use o custom hook useAuth para acessar os dados e funções do AuthProvider
      

      

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-2xl font-bold text-gray-800">Acesse seu Cadastro</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="flex flex-col gap-3" onSubmit={doLogin}>
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
                                    value={formData.email}
                                    onChange={(e) => updateFormData("email", e.target.value)}
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
                                    value={formData.password}
                                    onChange={(e) => updateFormData("password", e.target.value)}
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
                                className="w-full rounded-3xl bg-black px-6 py-2 text-m1 font-medium uppercase text-white"
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
