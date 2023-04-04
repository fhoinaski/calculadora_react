import { v4 as uuidv4 } from 'uuid';

function generateToken(email) {
    const token = uuidv4();
    const expiresIn = Date.now() + 24 * 60 * 60 * 1000; // 24 horas a partir de agora
    console.log('Token gerado:', token);
    return { token, expiresIn };
  }
  export { generateToken };  


