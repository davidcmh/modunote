var _ = require('lodash');
var db = require('../helpers/db').getPool();
var Q = require('q');


exports.getNotes = function (req, res, next) {
    var filters = req.swagger.params.filters.value;

    //var selectSql = "SELECT DISTINCT notes.* FROM notes ";
    //
    //var joinSql = "";
    //if (filters && filters.tags && filters.tags.length) {
    //    joinSql += "JOIN tags ON notes.id = tags.note_id " +
    //        "JOIN tag_library ON tags.tag_id = tag_library.id "
    //}
    //
    //var filterSql = "";
    //if (filters && filters.deckId) {
    //    filterSql += "WHERE notes.deck_id = " + filters.deckId + " "
    //}
    //if (filters && filters.tags && filters.tags.length) {
    //    var filterKeyword = filterSql.length ? 'AND ' : 'WHERE ';
    //    filterSql += filterKeyword + "tag_library.name in ('" + filters.tags.join("', '") + "') "
    //}
    //
    //var query = selectSql + joinSql + filterSql + ";";

    // quick hack for current need, revisit SQL above in the future

    var query = "SELECT notes.*, STRING_AGG(tag_library.name, ',') tags " +
            "FROM notes " +
            "JOIN tags ON notes.id = tags.note_id " +
            "JOIN tag_library ON tags.tag_id = tag_library.id " +
            "GROUP BY notes.id";

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