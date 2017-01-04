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

exports.addTag = function (req, res, next) {
    var tagData = req.swagger.params.tagData.value;

    var query = "INSERT INTO tags(note_id, tag_id) " +
        "VALUES(${noteId}, ${tagId}) ";

    var result = {};
    return Q.fcall(function () {
        return db.any(query, tagData);
    }).then(function() {
        res.json(result);
    }).catch(function (err) {
        console.error('Error adding tag', err);
    });
};

exports.createTag = function (req, res, next) {
    var tagData = req.swagger.params.tagData.value;

    var query = "INSERT INTO tag_library(name) " +
        "VALUES(${name}) ";

    var result = {};
    return Q.fcall(function () {
        return db.any(query, tagData);
    }).then(function() {
        res.json(result);
    }).catch(function (err) {
        console.error('Error adding tag', err);
    });
};