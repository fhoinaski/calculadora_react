// Importando a biblioteca bcryptjs
import bcrypt from 'bcryptjs';

// Função para criar um hash da senha fornecida
const hashPassword = async (password) => {
  // Definindo o número de rodadas para o salt (aumenta a complexidade do hash gerado)
  const saltRounds = 10;
  // Criando o hash da senha usando a função hash() do bcrypt com a senha e as rodadas do salt
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Retornando a senha hash gerada
  return hashedPassword;
};

// Função para verificar se a senha fornecida corresponde ao hash armazenado
const checkPassword = async (password, hashedPassword) => {
  // Comparando a senha fornecida com o hash armazenado usando a função compare() do bcrypt
  const isMatch = await bcrypt.compare(password, hashedPassword);
  // Retorna true se as senhas coincidirem, caso contrário, retorna false
  return isMatch;
};

// Exportando as funções hashPassword e checkPassword para serem usadas em outros arquivos
export { hashPassword, checkPassword };
