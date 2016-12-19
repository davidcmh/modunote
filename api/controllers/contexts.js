var _ = require('lodash');
var db = require('../helpers/db').getPool();
var Q = require('q');


exports.getContexts = function (req, res, next) {
    var query = "SELECT * FROM contexts;";
    var result = {};

    return Q.fcall(function () {
        return db.any(query).then(function (data) {
            if (!data.length) {
                return;
            }
            result.contexts = data;
        });
    }).then(function() {
        res.json(result);
    });
};