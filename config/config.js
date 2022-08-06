module.exports = {
    dbConfig : {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        name: process.env.DB_NAME || 'queueProject',
        dialect: 'postgres',
        logging: true,
      },
      development: {
        "username": "postgres",
        "password": "postgres",
        "database": "queueProject",
        "host": "127.0.0.1",
        "dialect": "postgres"
      }
};
