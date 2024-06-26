const users = require("./users/users.service.js");
const userProfiles = require("./userProfiles/userProfiles.service.js");
const blocUsers = require("./blocUsers/blocUsers.service.js");
const positionRoleDepartment = require("./positionRoleDepartment/positionRoleDepartment.service.js");
const invitations = require("./invitations/invitations.service.js");
const roles = require("./roles/roles.service.js");
const refPositions = require("./refPositions/refPositions.service.js");
const servicePermissions = require("./servicePermissions/servicePermissions.service.js");
const fieldPermissions = require("./fieldPermissions/fieldPermissions.service.js");
const passwordHistory = require("./passwordHistory/passwordHistory.service.js");
const serviceMeta = require("./serviceMeta/serviceMeta.service.js");
const fieldMeta = require("./fieldMeta/fieldMeta.service.js");
const mobileNumbers = require("./mobileNumbers/mobileNumbers.service.js");
const mobileDevices = require("./mobileDevices/mobileDevices.service.js");
const preferences = require("./preferences/preferences.service.js");
const ipLoginAccess = require("./ipLoginAccess/ipLoginAccess.service.js");
const profileStatus = require("./profileStatus/profileStatus.service.js");
const emailLog = require("./emailLog/emailLog.service.js");
const addresses = require("./addresses/addresses.service.js");
const companies = require("./companies/companies.service.js");
const userCompanies = require("./userCompanies/userCompanies.service.js");
const branches = require("./branches/branches.service.js");
const departments = require("./departments/departments.service.js");
const sections = require("./sections/sections.service.js");
const teams = require("./teams/teams.service.js");
const phones = require("./phones/phones.service.js");
const recentActivities = require("./recentActivities/recentActivities.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
  app.configure(userProfiles);
  app.configure(blocUsers);
  app.configure(positionRoleDepartment);
  app.configure(invitations);
  app.configure(roles);
  app.configure(refPositions);
  app.configure(servicePermissions);
  app.configure(fieldPermissions);
  app.configure(passwordHistory);
  app.configure(serviceMeta);
  app.configure(fieldMeta);
  app.configure(mobileNumbers);
  app.configure(mobileDevices);
  app.configure(preferences);
  app.configure(ipLoginAccess);
  app.configure(profileStatus);
  app.configure(emailLog);
  app.configure(addresses);
  app.configure(companies);
  app.configure(userCompanies);
  app.configure(branches);
  app.configure(departments);
  app.configure(sections);
  app.configure(teams);
  app.configure(phones);
  app.configure(recentActivities);
    // ~cb-add-configure-service-name~
};
