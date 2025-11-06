exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.sql(`
        CREATE TABLE campanhas (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            descricao TEXT,
            mestre_id INTEGER NOT NULL, -- Este é o ID do usuário (mestre) do 'usuarios-api'
            criada_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX idx_campanhas_mestre_id ON campanhas(mestre_id);
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE campanhas;
    `);
};