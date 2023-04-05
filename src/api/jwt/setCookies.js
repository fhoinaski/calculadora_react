import Cookies from 'js-cookie';

const TOKEN_COOKIE_NAME = 'token';

const salvaTokendaSessaoCookie = (token) => {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 30); // Expire in 30 minutes
  
  // Verifica se está em ambiente de produção
  const isProduction = process.env.NODE_ENV === 'production';

  Cookies.set(TOKEN_COOKIE_NAME, token, { expires: expirationDate, secure: isProduction });
  Cookies.set('tokenExpiresIn', expirationDate.getTime(), { expires: expirationDate, secure: isProduction });

};

export { salvaTokendaSessaoCookie };
