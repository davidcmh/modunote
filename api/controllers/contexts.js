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

exports.createContext = function (req, res, next) {
    var contextData = req.swagger.params.contextData.value;

    var query = "INSERT INTO contexts(name) " +
        "VALUES(${name}) ";

    var result = {};
    return Q.fcall(function () {
        return db.any(query, contextData);
    }).then(function() {
        res.json(result);
    }).catch(function (err) {
        console.error('Error adding context', err);
    });
};