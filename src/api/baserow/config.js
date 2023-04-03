
//contante que contém a URL base da API do Baserow e o token de acesso à API do Baserow
const API_BASE = "https://api.baserow.io/api";
//constante que contém o token de acesso à API do Baserow (token de acesso à API do Baserow)
const API_TOKEN = import.meta.env.VITE_REACT_APP_BASEROW_API_TOKEN;

//constante que contém o ID do banco de dados
const USERS_TABLE_ID = 154440;

//exporta as constantes para serem usadas em outros arquivos
export { API_BASE, API_TOKEN,USERS_TABLE_ID };


// { criei um arquivo .env na raiz do projeto local e coloquei a variável de ambiente com este nome  VITE_REACT_APP_BASEROW_API_TOKEN=12345678 (esse número é o exemplo do token ) ### }