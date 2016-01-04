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
