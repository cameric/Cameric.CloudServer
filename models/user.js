/**
 * Created by Tony_Zhang on 12/24/15.
 */

var AV = require('leanengine');

exports.getUserShortById = function (req, res) {
    var user = AV.Object.extend('_User');
    var query = new AV.Query(user);
    query.equalTo('objectId', req.params.id);
    query.select('username', 'name', 'category', 'score', 'avatar');

    query.first({
        success: function (results) {
            res.success(results);
        }, error: function (err) {
            res.error(err);
        }
    });
};

