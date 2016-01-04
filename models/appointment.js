/**
 * Appointment query module.
 * @module models/appointment
 */

var AV = require('leanengine');

/**
 * Gets all appointments within a certain time range, filtering on either
 * client, provider, or both.
 *
 * @param {string} [client] - The client of the appointment.
 * @param {string} [provider] - The user providing the appointment.
 * @param {string} fromTime - The start of the time range. Appointments that
 *  start before this time are not returned.
 * @param {string} toTime - The end of the time range. Appointments that
 *  start after this time are not returned.
 *
 * @returns The type, startTime, and endTime of every matching appointment
 */
exports.getAppointmentsInRange = function (req, res) {
    var appt = AV.Object.extend('Appointment');
    var query = new AV.Query(appt);

    // Search based on client/provider. At least one MUST be specified.
    var filterClient = req.params.hasOwnProperty('client');
    var filterProvider = req.params.hasOwnProperty('provider');
    if (!filterClient && !filterProvider) {
      res.error(403, 'Query contained neither client nor provider filter. ')
    }

    if (filterClient) {
      query.equalTo('client', req.params.client);
    }
    if (filterProvider) {
      query.equalTo('provider', req.params.provider);
    }

    // Restrict to the given time range if requested.
    query.greaterThanOrEqualTo('startTime', req.params.fromTime);
    query.lessThanOrEqualTo('startTime', req.params.toTime);

    query.select('startTime', 'endTime', 'type');

    // Earlier events come first. Events starting at the same time are ordered
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
