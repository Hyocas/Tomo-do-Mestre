const axios = require('axios');

const USUARIOS_API_URL = process.env.USUARIOS_API_URL || 'http://localhost:3000';

const validarToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação inválido ou não fornecido.' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const response = await axios.post(
            `${USUARIOS_API_URL}/api/usuarios/validar-token`, 
            { token: token }
        );

        if (response.data && response.data.valido) {
            
            req.usuario = response.data.usuario; 
            
            next();
        } else {
            throw new Error('Token inválido segundo o serviço de usuários.');
        }

    } catch (error) {
        console.error(`[validarToken] Erro na validação: ${error.message}`);
        return res.status(401).json({ message: 'Acesso não autorizado. Token inválido ou expirado.' });
    }
};

module.exports = validarToken;