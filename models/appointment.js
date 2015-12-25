/**
 * Created by Spencer_Michaels on 12/24/15.
 */

var AV = require('leanengine');

// TODO: Allow the request to specify a time range for appointments (e.g.
// only appointments before/after some date)

exports.getAppointmentByProvider = function (req, res) {
    var appt = AV.Object.extend('Appointment');
    var query = new AV.Query(appt);
    query.equalTo('provider', req.params.provider);
    query.select('startTime', 'endTime', 'type');

    // Earlier events some first. Events starting at the same time are ordered
    // such that the one that ends first comes first.
    query.addDescending('startTime');
    query.addDescending('endTime');

    query.find({
        success: function (results) {
            res.success(results);
        }, error: function (err) {
            res.error(err);
        }
    });
};

exports.getAppointmentByReceiver = function (req, res) {
    var appt = AV.Object.extend('Appointment');
    var query = new AV.Query(appt);
    query.equalTo('receiver', req.params.receiver);
    query.select('startTime', 'endTime', 'type');

    // Earlier events some first. Events starting at the same time are ordered
    // such that the one that ends first comes first.
    query.addDescending('startTime');
    query.addDescending('endTime');

    query.find({
        success: function (results) {
            res.success(results);
        }, error: function (err) {
            res.error(err);
        }
    });
};
