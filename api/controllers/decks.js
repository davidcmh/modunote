var _ = require('lodash');
var db = require('../helpers/db').getPool();
var Q = require('q');


exports.getDecks = function (req, res, next) {
    var query = "SELECT * FROM decks;";
    var result = {};

    return Q.fcall(function () {
        return db.any(query).then(function (data) {
            if (!data.length) {
                return;
            }
            result.decks = data;
        });
    }).then(function() {
        res.json(result);
    });
};