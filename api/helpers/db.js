var pgp = require('pg-promise')();

var cn = {
    port: 5432,
    database: 'modunote',
    user: 'davidchia',
    password: '',
    poolSize: 10
};

var db = pgp(cn);
exports.getPool = function () {
    return db;
};

exports.getPGP = function () {
    return pgp;
};
