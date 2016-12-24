var _ = require('lodash');
var db = require('../helpers/db').getPool();
var Q = require('q');
var moment = require('moment');


exports.getNotes = function (req, res, next) {
    var filters = req.swagger.params.filters.value;

    var mainSql = "SELECT notes.*, contexts.name context, topics.name topic, STRING_AGG(tag_library.name, ',') tags " +
            "FROM notes " +
            "LEFT JOIN contexts on contexts.id = notes.context_id " +
            "LEFT JOIN topics on topics.id = notes.topic_id " +
            "LEFT JOIN tags ON notes.id = tags.note_id " +
            "LEFT JOIN tag_library ON tags.tag_id = tag_library.id ";

    var filterSql = "";
    if (filters && filters.contexts) {
        filterSql += "WHERE contexts.name IN ('" + filters.contexts.join("', '") + "') "
    }
    if (filters && filters.topics) {
        var filterKeyword = filterSql.length ? 'AND ' : 'WHERE ';
        filterSql += filterKeyword + "topics.name IN ('" + filters.topics.join("', '") + "') "
    }
    if (filters && filters.tags && filters.tags.length) {
        var filterKeyword = filterSql.length ? 'AND ' : 'WHERE ';
        filterSql += filterKeyword + "tag_library.name IN ('" + filters.tags.join("', '") + "') "
    }

    var groupbySql = "GROUP BY notes.id, contexts.name, topics.name";

    var query = mainSql + filterSql + groupbySql;

    var result = {};
    return Q.fcall(function () {
        return db.any(query).then(function (data) {
            if (!data.length) {
                return;
            }
            result.notes = data;
        });
    }).then(function() {
        res.json(result);
    });
};

exports.createNote = function (req, res, next) {
    var noteData = req.swagger.params.noteData.value;

    var query = "INSERT INTO notes(context_id, topic_id, title, content, date_created, date_updated, source) " +
        "VALUES(${contextId}, ${topicId}, ${title}, ${content}, ${dateCreated}, ${dateUpdated}, ${source}) " +
        "RETURNING id";

    var result = {};
    return Q.fcall(function () {
        return db.any(query, noteData).then(function (data) {
            result = data[0];
        });
    }).then(function() {
        res.json(result);
    }).catch(function (err) {
        console.error('Error creating note', err);
    });
};