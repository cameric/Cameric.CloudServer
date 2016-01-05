/**
 * Created by Tony_Zhang on 12/24/15.
 */

var AV = require('leanengine');

/** @constant The fields retrieved when querying short user data
    @type {string[]}
    @default
 */
const USER_SHORT_DATA = ['uid', 'username', 'name', 'category', 'score', 'avatar']

var encapsulateThirdPartyUserdata = function (platform, userData, req, res) {
    var authData = {};
    authData[platform] = userData;

    AV.User._logInWith(platform, {
        authData: authData,
        success: function (user) {
            //返回绑定后的用户
            req.success(user)
        },
        error: function (err) {
            res.error(err)
        }
    })
};

exports.signUpWithWeibo = function (req, res) {
    encapsulateThirdPartyUserdata('weibo', {
        'uid': req.params.uid,
        'access_token': req.params.accessToken,
        'expiration_in': '36000'
    }, req, res)
};

exports.signUpWithWeixin = function (req, res) {
    encapsulateThirdPartyUserdata('weixin', {
        "openid": req.params.openId,
        "access_token": req.params.accessToken,
        "expires_in": 1382686496
    }, req, res)
};

/**
 * Given a user ID, gets the essential data representing a user
 *
 * @param {string} id - The id of the user.
 *
 * @returns The username, name, category, score, and avatar of the user.
 */
exports.getUserShortById = function (req, res) {
    var user = AV.Object.extend('_User');
    var query = new AV.Query(user);

    query.equalTo('objectId', req.params.id);
    query.select(USER_SHORT_DATA);

    query.first({
        success: function (results) {
            res.success(results);
        }, error: function (err) {
            res.error(err);
        }
    });
};

/**
 * Given a keyword, return a list of users (short data) matching it.
 *
 * @param {string} keyword - The keyword to search for.
 *
 * @returns The UIDs of all matching users.
 */
exports.getUsersShortByKeyword = function (req, res) {
    var user = AV.Object.extend('User');
    var query = new AV.Query(user);

    // TODO: Searching by substring match is too slow for small user data sets
    // This is just a simple placeholder for now
    query.contains('username', req.keyword.toLowerCase())
    query.contains('name', req.keyword.toLowerCase())

    query.select(USER_SHORT_DATA)

    query.find({
        success: function (results) {
            res.success(results);
        }, error: function (err) {
            res.error(err);
        }
    });
}
