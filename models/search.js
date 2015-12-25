/**
 * Created by Tony_Zhang on 12/24/15.
 */

var AV = require('leanengine');

var filters = {
    category: ['家教', '医疗', '开发', '手工', '律师', '保险', '情感', '其他'],
    isOnline: "是否在线",
    successfulAppoints: "服务成功次数",
    score: "评分"
};

// Helper API just in case
exports.getFilters = function() {
    return {
        keys: Object.keys(filters),
        filters: filters
    };
};

exports.updateFilters = function (req, res) {
    res.success(exports.getFilters());
};

exports.getUsersByFilter = function (req, res) {
    var user = AV.Object.extend('_User');
    var query = new AV.Query(user);

    var filters = exports.getFilters();
    for (var i = 0; i < filters.keys.length; ++i) {
        if (typeof req.params[filters.keys[i]] != "undefined" && filters.keys[i] != "score") {
            query.containedIn(filters.keys[i], req.params[filters.keys[i]]);
        }
    }
    query.greaterThanOrEqualTo('score', req.params.score);

    query.find({
        success: function (results) {
            res.success(results);
        }, error: function (err) {
            res.error(err);
        }
    });
};

//exports.getUsersByKeyword = function (req, res) {
//    var query = new AV.SearchQuery("_User");
//    query.queryString(req.params.query);
//    query.sortBy(new AV.SearchSortBuilder().descending('score','avg', 'last'));
//    query.find().then(function (hits) {
//        console.log("Search on _User happened at " + Date.now());
//        res.success({
//            results: hits,
//            count: query.hits(),
//            hasMore: query.hasMore()
//        });
//    }).catch(function(err) {
//        res.error(err);
//    });
//};
/**
 * Created by Tony_Zhang on 12/25/15.
 */
