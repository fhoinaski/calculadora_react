import React from 'react';
import useAuth from '../contexts/useAuth'; // Importe o custom hook useAuth
import ModalConfirm from './ModalConfirm';

const Register = () => {
  const {
    formData,
    updateFormData,
    modalState,
    updateModalState,
    registerUser,
    handleCloseModal,
  } = useAuth(); // Use o custom hook useAuth para acessar os dados e funções do AuthProvider

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-12 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="text-2xl text-center font-bold text-gray-800">Crie sua Conta</h2>

                    </div>
                    <form className="px-6 py-4" onSubmit={registerUser}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="first_name" className="block text-gray-700 font-bold mb-2">
                                    Seu Nome
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                    placeholder="Nome"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="last_name" className="block text-gray-700 font-bold mb-2">
                                    Seu Sobrenome
                                </label>
                                <input
                                    type="text"
                                    id="sobrenome"
                                    name="sobrenome"
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                    placeholder="Sobrenome"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                Informe seu Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                placeholder="Endereço de Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                                Criar senha
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                placeholder="Informe uma senha"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password_confirmation" className="block text-gray-700 font-bold mb-2">
                                Confirmar senha
                            </label>
                            <input
                                type="password"
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                placeholder="Confirme sua senha"
                                value={formData.passwordConfirmation}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white"
                            >
                                Criar Conta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {
  modalState.open && (
                    <ModalConfirm
                    isOpen={modalState.open}
                    title={modalState.title}
                    message={modalState.message}
                    closeModal={handleCloseModal}
                    />
                )
            }

        </div>
    );
};

export default Register;