var AV = require('leanengine'),
    apptAPIs = require('./models/appointment'),
    searchAPIs = require('./models/search'),
    userAPIs = require('./models/user');

AV.Cloud.define("getAppointmentByProvider", apptAPIs.getAppointmentByProvider);
AV.Cloud.define("getAppointmentByReceiver", apptAPIs.getAppointmentByReceiver);

AV.Cloud.define("updateFilters", searchAPIs.updateFilters);
AV.Cloud.define("getUsersByFilter", searchAPIs.getUsersByFilter);
//AV.Cloud.define("getUsersByKeyword", searchAPIs.getUsersByKeyword);

AV.Cloud.define("getUserShortById", userAPIs.getUserShortById);

module.exports = AV.Cloud;