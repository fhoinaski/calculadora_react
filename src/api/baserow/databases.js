// Importando a biblioteca axios e as configurações da API
import axios from "axios";
import { API_BASE, API_TOKEN } from "./config";

// Função para buscar informações do banco de dados do Baserow
const fetchDatabaseInfo = async (databaseId) => {
  try {
    // Fazendo uma requisição GET para a API do Baserow
    const response = await axios({
      method: "GET",
      url: `${API_BASE}/database/databases/${databaseId}/`,
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
    });
    // Retornando os dados da resposta
    return response.data;
  } catch (error) {
    // Caso ocorra algum erro, exibir a mensagem de erro e retornar null
    console.error(
      "Erro ao buscar informações do banco de dados do Baserow:",
      error
    );
    return null;
  }
};

// Exportando a função fetchDatabaseInfo
export { fetchDatabaseInfo };


/* A função faz uma requisição GET à API do Baserow para buscar informações do banco de dados com o ID fornecido. */