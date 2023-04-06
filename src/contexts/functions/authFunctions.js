import { USERS_TABLE_ID, createRow, hashPassword, isEmailRegistered, fetchTableRows, checkPassword } from '../api/baserow';
import { generateToken } from '../api/jwt/token';
import { salvaTokendaSessaoCookie } from '../api/jwt/setCookies';
import Cookies from 'js-cookie';





export { isTokenValid, checkStoredAuthData, checkUserExists, doLogin, doLogout, registerUser };