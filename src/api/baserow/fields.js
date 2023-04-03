// Importando a biblioteca axios e as configurações da API
import axios from "axios";
import { API_BASE, API_TOKEN } from "./config";

// Função para buscar os campos de uma tabela no Baserow
const fetchTableFields = async (tableId) => {
  try {
    // Fazendo uma requisição GET para a API do Baserow para buscar os campos da tabela com o ID fornecido
    const response = await axios({
      method: "GET",
      url: `${API_BASE}/database/fields/table/${tableId}/`,
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
    });
    // Retornando os dados da resposta
    return response.data;
  } catch (error) {
    // Caso ocorra algum erro, exibir a mensagem de erro e retornar um array vazio
    console.error("Erro ao buscar campos da tabela do Baserow:", error);
    return [];
  }
};

// Exportando a função fetchTableFields
export { fetchTableFields };


/* A função faz uma requisição GET à API do Baserow para buscar os campos da tabela com o ID fornecido.*/