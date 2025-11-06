exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.sql(`
        CREATE TABLE campanha_jogadores (
            id SERIAL PRIMARY KEY,
            
            campanha_id INTEGER NOT NULL REFERENCES campanhas(id) ON DELETE CASCADE,
            
            usuario_id INTEGER NOT NULL, 
            status VARCHAR(20) NOT NULL DEFAULT 'pendente', 
            adicionado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(campanha_id, usuario_id)
        );

        CREATE INDEX idx_campanha_jogadores_campanha_id ON campanha_jogadores(campanha_id);
        CREATE INDEX idx_campanha_jogadores_usuario_id ON campanha_jogadores(usuario_id);
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE campanha_jogadores;
    `);
};