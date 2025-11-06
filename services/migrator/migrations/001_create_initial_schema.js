exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.sql(`
        CREATE TABLE usuarios (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            senha_hash VARCHAR(255) NOT NULL,
            criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE carrinho_itens;
    `);
};