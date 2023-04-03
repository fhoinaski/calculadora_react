import React, { useState } from 'react';
import { USERS_TABLE_ID, createRow, hashPassword, isEmailRegistered } from '../api/baserow';
import ModalConfirm from './ModalConfirm';


const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            console.log("As senhas não correspondem");

            setModalTitle("Erro");
            setModalMessage("As senhas não correspondem");
            //coloca o modal como true para abrir
            setModalOpen(true);


            // Exiba uma mensagem de erro para o usuário, se necessário
            return;
        }

        if (await isEmailRegistered(USERS_TABLE_ID, email)) {
            console.log("Email já cadastrado");

            setModalTitle("Atenção");
            setModalMessage("Email já cadastrado");
            setModalOpen(true); // Abra o modal informando que o email já está cadastrado
            return;
          }

        const hashedPassword = await hashPassword(password);

        const newRowData = {
            "Nome": firstName,
            "Sobrenome": lastName,
            "Email": email,
            "Password": hashedPassword,
        };

        const newRow = await createRow(USERS_TABLE_ID, newRowData);

        if (newRow) {
            console.log("Usuário cadastrado com sucesso");
            // Adicione a lógica para navegar até a página de login ou outra página após o registro bem-sucedido
        } else {
            console.log("Ocorreu um erro ao cadastrar o usuário");
            // Mostre uma mensagem de erro para o usuário, se necessário
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false); // muda o estado do modal para false
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-12 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
                    <div className="py-4 px-6">
                        <h2 className="text-2xl font-bold text-gray-800">Crie sua Conta</h2>

                    </div>
                    <form className="px-6 py-4" onSubmit={registerUser}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="first_name" className="block text-gray-700 font-bold mb-2">
                                    Seu Nome
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                    placeholder="Nome"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="last_name" className="block text-gray-700 font-bold mb-2">
                                    Seu Sobrenome
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                    placeholder="Sobrenome"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password_confirmation" className="block text-gray-700 font-bold mb-2">
                                Confirmar senha
                            </label>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                placeholder="Confirme sua senha"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                modalOpen && (
                    <ModalConfirm
                        isOpen={modalOpen}
                        title={modalTitle}
                        message={modalMessage}
                        closeModal={handleCloseModal}
                    />
                )
            }

        </div>
    );
};

export default Register;