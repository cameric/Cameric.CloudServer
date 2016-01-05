var AV = require('leanengine'),
    appointmentAPIs = require('./models/appointment'),
    searchAPIs = require('./models/search'),
    userAPIs = require('./models/user');

AV.Cloud.define("getAppointmentsInRange", appointmentAPIs.getAppointmentsInRange);

AV.Cloud.define("updateFilters", searchAPIs.updateFilters);
AV.Cloud.define("getUsersByFilter", searchAPIs.getUsersByFilter);
//AV.Cloud.define("getUsersByKeyword", searchAPIs.getUsersByKeyword);

AV.Cloud.define("getUsersShortByKeyword", userAPIs.getUsersShortByKeyword);
AV.Cloud.define("getUserShortById", userAPIs.getUserShortById);
AV.Cloud.define("signUpWithWeibo", userAPIs.signUpWithWeibo);
AV.Cloud.define("signUpWithWeixin", userAPIs.signUpWithWeixin);

module.exports = AV.Cloud;
