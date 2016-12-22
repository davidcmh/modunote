var _ = require('lodash');
var db = require('../helpers/db').getPool();
var Q = require('q');


exports.getTags = function (req, res, next) {
    var query = "SELECT * FROM tag_library;";
    var result = {};

    return Q.fcall(function () {
        return db.any(query).then(function (data) {
            if (!data.length) {
                return;
            }
            result.tags = data;
        });
    }).then(function() {
        res.json(result);
    });
};