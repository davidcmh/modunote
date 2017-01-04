var _ = require('lodash');
var db = require('../helpers/db').getPool();
var Q = require('q');


exports.getTopics = function (req, res, next) {
    var query = "SELECT * FROM topics;";
    var result = {};

    return Q.fcall(function () {
        return db.any(query).then(function (data) {
            if (!data.length) {
                return;
            }
            result.topics = data;
        });
    }).then(function() {
        res.json(result);
    });
};

exports.createTopic = function (req, res, next) {
    var topicData = req.swagger.params.topicData.value;

    var query = "INSERT INTO topics(name) " +
        "VALUES(${name}) ";

    var result = {};
    return Q.fcall(function () {
        return db.any(query, topicData);
    }).then(function() {
        res.json(result);
    }).catch(function (err) {
        console.error('Error adding topic', err);
    });
};