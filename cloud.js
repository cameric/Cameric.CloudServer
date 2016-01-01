var AV = require('leanengine')
var appointmentAPIs = require('./models/appointment')
var searchAPIs = require('./models/search')
var userAPIs = require('./models/user')

AV.Cloud.define("getAppointmentsInRange", appointmentAPIs.getAppointmentsInRange);

AV.Cloud.define("updateFilters", searchAPIs.updateFilters);
AV.Cloud.define("getUsersByFilter", searchAPIs.getUsersByFilter);
//AV.Cloud.define("getUsersByKeyword", searchAPIs.getUsersByKeyword);

AV.Cloud.define("getUserShortById", userAPIs.getUserShortById);

module.exports = AV.Cloud;
