const express = require('express');
const router = express.Router();
const db = require('./db');
const validarToken = require('./authMiddleware');

router.post('/campanhas', validarToken, async (req, res) => {
    
    const mestreId = req.usuario.id;
    const { nome, descricao } = req.body;

    if (!nome) {
        return res.status(400).json({ message: "O nome da campanha é obrigatório." });
    }

    try {
        const query = 'INSERT INTO campanhas (nome, descricao, mestre_id) VALUES ($1, $2, $3) RETURNING *';
        const valores = [nome, descricao || null, mestreId];
        
        const resultado = await db.query(query, valores);
        const novaCampanha = resultado.rows[0];

        res.status(201).json({ 
            message: "Campanha criada com sucesso!", 
            campanha: novaCampanha 
        });

    } catch (error) {
        console.error('Erro ao criar campanha:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

router.get('/campanhas', validarToken, async (req, res) => {
    const usuarioId = req.usuario.id;

    try {
        const query = `
            SELECT c.*, 'mestre' as papel FROM campanhas c WHERE c.mestre_id = $1
            UNION
            SELECT c.*, cj.status as papel FROM campanhas c
            JOIN campanha_jogadores cj ON c.id = cj.campanha_id
            WHERE cj.usuario_id = $1 AND cj.status = 'aceito'
        `;
        
        const resultado = await db.query(query, [usuarioId]);
        
        res.status(200).json({ campanhas: resultado.rows });

    } catch (error) {
        console.error('Erro ao listar campanhas:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});


module.exports = router;