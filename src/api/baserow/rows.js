import axios from "axios";
import { API_BASE, API_TOKEN } from "./config";

// Função  para buscar todas as linhas de uma tabela no Baserow
const fetchTableRows = async (tableId) => {
  try {
    // Fazendo uma requisição GET para a API do Baserow para buscar todas as linhas da tabela com o ID fornecido
    const response = await axios({
      method: "GET",
      url: `${API_BASE}/database/rows/table/${tableId}/?user_field_names=true`, // Adicionar ?user_field_names=true aqui
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
    });
    // Retornando os resultados da resposta
    return response.data.results;
  } catch (error) {
    // Caso ocorra algum erro, exibir a mensagem de erro e retornar um array vazio
    console.error("Erro ao buscar registros da tabela do Baserow:", error);
    return [];
  }

  /* A função fetchTableRows é usada para obter todas as linhas de uma tabela no Baserow. Para utilizá-la, você precisa fornecer o ID da tabela (tableId). */
};

// Função para obter uma única linha da tabela no Baserow
const fetchSingleRow = async (tableId, rowId) => {
  try {
    // Fazendo uma requisição GET para a API do Baserow para buscar a linha com o ID fornecido na tabela com o ID fornecido
    const response = await axios({
      method: "GET",
      url: `${API_BASE}/database/rows/table/${tableId}/${rowId}/?user_field_names=true`,
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
    });
    // Retornando os dados da resposta
    return response.data;
  } catch (error) {
    // Caso ocorra algum erro, exibir a mensagem de erro e retornar null
    console.error("Erro ao buscar linha única da tabela do Baserow:", error);
    return null;
  }

  /* A função fetchSingleRow é usada para obter uma única linha de uma tabela no Baserow. Para utilizá-la, você precisa fornecer dois argumentos: o ID da tabela (tableId) e o ID da linha que você deseja obter (rowId). */
};

// Função para criar uma nova linha na tabela no Baserow
const createRow = async (tableId, data) => {
  try {
    // Fazendo uma requisição POST para a API do Baserow para criar uma nova linha na tabela com o ID fornecido e os dados fornecidos
    const response = await axios({
      method: "POST",
      url: `${API_BASE}/database/rows/table/${tableId}/?user_field_names=true`,
      headers: {
        Authorization: `Token ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      data,
    });
    // Retornando os dados da resposta
    return response.data;
  } catch (error) {
    // Caso ocorra algum erro, exibir a mensagem de erro e retornar null
    console.error("Erro ao criar nova linha na tabela do Baserow:", error);
    return null;
  }

  /* A função createRow é usada para criar uma nova linha na tabela do Baserow. Para utilizá-la, você precisa fornecer dois argumentos: o ID da tabela (tableId) e um objeto contendo os dados da linha a ser criada (data). O objeto de dados deve incluir os nomes dos campos e seus respectivos valores. */
};

// Função para atualizar uma linha na tabela do Baserow
const updateRow = async (tableId, rowId, data) => {
  try {
    // Realiza uma requisição PATCH para atualizar os dados da linha
    const response = await axios({
      method: "PATCH",
      url: `${API_BASE}/database/rows/table/${tableId}/${rowId}/?user_field_names=true`,
      headers: {
        Authorization: `Token ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      data,
    });
    // Retorna os dados da linha atualizada
    return response.data;
  } catch (error) {
    // Exibe a mensagem de erro no console caso ocorra algum problema na requisição
    console.error("Erro ao atualizar linha na tabela do Baserow:", error);
    // Retorna null em caso de erro
    return null;
  }

  /*A função updateRow é usada para atualizar uma linha específica em uma tabela do Baserow. Para utilizá-la, você precisa fornecer três argumentos: o ID da tabela (tableId), o ID da linha que deseja atualizar (rowId) e um objeto contendo os novos dados da linha (data). O objeto de dados deve conter os nomes dos campos e seus respectivos novos valores.*/
};

// Função para excluir uma linha da tabela do Baserow
const deleteRow = async (tableId, rowId) => {
  try {
    // Realiza uma requisição DELETE para excluir a linha especificada
    await axios({
      method: "DELETE",
      url: `${API_BASE}/database/rows/table/${tableId}/${rowId}/`,
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
    });
    // Retorna true em caso de sucesso na exclusão da linha
    return true;
  } catch (error) {
    // Exibe a mensagem de erro no console caso ocorra algum problema na requisição
    console.error("Erro ao excluir linha da tabela do Baserow:", error);
    // Retorna false em caso de erro
    return false;
  }

  /*A função deleteRow é usada para excluir uma linha específica de uma tabela do Baserow. Para utilizá-la, você precisa fornecer dois argumentos: o ID da tabela (tableId) e o ID da linha que deseja excluir (rowId).*/
};

export { fetchTableRows, fetchSingleRow, createRow, updateRow, deleteRow };
