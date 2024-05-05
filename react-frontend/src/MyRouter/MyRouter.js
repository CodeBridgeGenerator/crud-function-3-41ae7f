import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from './NoMatch';

import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/LoginPage/SignUpPage';
import Account from '../components/Account/Account';
import Dashboard from '../components/Dashboard/Dashboard';
import WhatToDoPage from '../components/WhatTodo';

import UsersPage from "../components/UsersPage/UsersPage";
import SingleUsersPage from "../components/UsersPage/SingleUsersPage";
import UserProjectLayoutPage from "../components/UsersPage/UserProjectLayoutPage";
import UserProfilesPage from "../components/UserProfilesPage/UserProfilesPage";
import SingleUserProfilesPage from "../components/UserProfilesPage/SingleUserProfilesPage";
import UserProfileProjectLayoutPage from "../components/UserProfilesPage/UserProfileProjectLayoutPage";
import BlocUsersPage from "../components/BlocUsersPage/BlocUsersPage";
import SingleBlocUsersPage from "../components/BlocUsersPage/SingleBlocUsersPage";
import PositionRoleDepartmentPage from "../components/PositionRoleDepartmentPage/PositionRoleDepartmentPage";
import SinglePositionRoleDepartmentPage from "../components/PositionRoleDepartmentPage/SinglePositionRoleDepartmentPage";
import PositionRoleDepartmentProjectLayoutPage from "../components/PositionRoleDepartmentPage/PositionRoleDepartmentProjectLayoutPage";
import InvitationsPage from "../components/InvitationsPage/InvitationsPage";
import SingleInvitationsPage from "../components/InvitationsPage/SingleInvitationsPage";
import RolesPage from "../components/RolesPage/RolesPage";
import SingleRolesPage from "../components/RolesPage/SingleRolesPage";
import RefPositionsPage from "../components/RefPositionsPage/RefPositionsPage";
import SingleRefPositionsPage from "../components/RefPositionsPage/SingleRefPositionsPage";
import ServicePermissionsPage from "../components/ServicePermissionsPage/ServicePermissionsPage";
import SingleServicePermissionsPage from "../components/ServicePermissionsPage/SingleServicePermissionsPage";
import ServicePermissionProjectLayoutPage from "../components/ServicePermissionsPage/ServicePermissionProjectLayoutPage";
import FieldPermissionsPage from "../components/FieldPermissionsPage/FieldPermissionsPage";
import SingleFieldPermissionsPage from "../components/FieldPermissionsPage/SingleFieldPermissionsPage";
import FieldPermissionProjectLayoutPage from "../components/FieldPermissionsPage/FieldPermissionProjectLayoutPage";
import PasswordHistoryPage from "../components/PasswordHistoryPage/PasswordHistoryPage";
import SinglePasswordHistoryPage from "../components/PasswordHistoryPage/SinglePasswordHistoryPage";
import ServiceMetaPage from "../components/ServiceMetaPage/ServiceMetaPage";
import SingleServiceMetaPage from "../components/ServiceMetaPage/SingleServiceMetaPage";
import FieldMetaPage from "../components/FieldMetaPage/FieldMetaPage";
import SingleFieldMetaPage from "../components/FieldMetaPage/SingleFieldMetaPage";
import MobileNumbersPage from "../components/MobileNumbersPage/MobileNumbersPage";
import SingleMobileNumbersPage from "../components/MobileNumbersPage/SingleMobileNumbersPage";
import MobileNumberProjectLayoutPage from "../components/MobileNumbersPage/MobileNumberProjectLayoutPage";
import MobileDevicesPage from "../components/MobileDevicesPage/MobileDevicesPage";
import SingleMobileDevicesPage from "../components/MobileDevicesPage/SingleMobileDevicesPage";
import PreferencesPage from "../components/PreferencesPage/PreferencesPage";
import SinglePreferencesPage from "../components/PreferencesPage/SinglePreferencesPage";
import PreferenceProjectLayoutPage from "../components/PreferencesPage/PreferenceProjectLayoutPage";
import IpLoginAccessPage from "../components/IpLoginAccessPage/IpLoginAccessPage";
import SingleIpLoginAccessPage from "../components/IpLoginAccessPage/SingleIpLoginAccessPage";
import IpLoginAccessProjectLayoutPage from "../components/IpLoginAccessPage/IpLoginAccessProjectLayoutPage";
import ProfileStatusPage from "../components/ProfileStatusPage/ProfileStatusPage";
import SingleProfileStatusPage from "../components/ProfileStatusPage/SingleProfileStatusPage";
import EmailLogPage from "../components/EmailLogPage/EmailLogPage";
import SingleEmailLogPage from "../components/EmailLogPage/SingleEmailLogPage";
import EmailLogProjectLayoutPage from "../components/EmailLogPage/EmailLogProjectLayoutPage";
import AddressesPage from "../components/AddressesPage/AddressesPage";
import SingleAddressesPage from "../components/AddressesPage/SingleAddressesPage";
import AddressProjectLayoutPage from "../components/AddressesPage/AddressProjectLayoutPage";
import CompaniesPage from "../components/CompaniesPage/CompaniesPage";
import SingleCompaniesPage from "../components/CompaniesPage/SingleCompaniesPage";
import UserCompaniesPage from "../components/UserCompaniesPage/UserCompaniesPage";
import SingleUserCompaniesPage from "../components/UserCompaniesPage/SingleUserCompaniesPage";
import UserCompanyProjectLayoutPage from "../components/UserCompaniesPage/UserCompanyProjectLayoutPage";
import BranchesPage from "../components/BranchesPage/BranchesPage";
import SingleBranchesPage from "../components/BranchesPage/SingleBranchesPage";
import DepartmentsPage from "../components/DepartmentsPage/DepartmentsPage";
import SingleDepartmentsPage from "../components/DepartmentsPage/SingleDepartmentsPage";
import SectionsPage from "../components/SectionsPage/SectionsPage";
import SingleSectionsPage from "../components/SectionsPage/SingleSectionsPage";
import TeamsPage from "../components/TeamsPage/TeamsPage";
import SingleTeamsPage from "../components/TeamsPage/SingleTeamsPage";
import TeamProjectLayoutPage from "../components/TeamsPage/TeamProjectLayoutPage";
import PhonesPage from "../components/PhonesPage/PhonesPage";
import SinglePhonesPage from "../components/PhonesPage/SinglePhonesPage";
import RecentActivitiesPage from "../components/RecentActivitiesPage/RecentActivitiesPage";
import SingleRecentActivitiesPage from "../components/RecentActivitiesPage/SingleRecentActivitiesPage";
// ~cb-add-import~

const MyRouter = () => {
    return (
        <Routes>
            <Route path="" exact element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignUpPage />} />

            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
                <Route path="/account" exact element={<Account />} />
                    <Route path="/users" exact element={<UsersPage />} />
                    <Route path="/users/:singleUsersId" exact element={<UserProjectLayoutPage />} />
                    <Route path="/users/:singleUsersId/single" exact element={<SingleUsersPage />} />
                    <Route path="/users/:singleUsersId/userProfiles" exact element={<UserProfileProjectLayoutPage />} />
                    <Route path="/users/:singleUsersId/userProfiles/:singleUserProfilesId" exact element={<SingleUserProfilesPage />} />
                    <Route path="/blocUsers" exact element={<BlocUsersPage />} />
                    <Route path="/blocUsers/:singleBlocUsersId" exact element={<SingleBlocUsersPage />} />
                    <Route path="/users/:singleUsersId/positionRoleDepartment" exact element={<PositionRoleDepartmentProjectLayoutPage />} />
                    <Route path="/users/:singleUsersId/positionRoleDepartment/:singlePositionRoleDepartmentId" exact element={<SinglePositionRoleDepartmentPage />} />
                    <Route path="/invitations" exact element={<InvitationsPage />} />
                    <Route path="/invitations/:singleInvitationsId" exact element={<SingleInvitationsPage />} />
                    <Route path="/roles" exact element={<RolesPage />} />
                    <Route path="/roles/:singleRolesId" exact element={<SingleRolesPage />} />
                    <Route path="/refPositions" exact element={<RefPositionsPage />} />
                    <Route path="/refPositions/:singleRefPositionsId" exact element={<SingleRefPositionsPage />} />
                    <Route path="/roles/:singleRolesId/servicePermissions" exact element={<ServicePermissionProjectLayoutPage />} />
                    <Route path="/roles/:singleRolesId/servicePermissions/:singleServicePermissionsId" exact element={<SingleServicePermissionsPage />} />
                    <Route path="/roles/:singleRolesId/fieldPermissions" exact element={<FieldPermissionProjectLayoutPage />} />
                    <Route path="/roles/:singleRolesId/fieldPermissions/:singleFieldPermissionsId" exact element={<SingleFieldPermissionsPage />} />
                    <Route path="/passwordHistory" exact element={<PasswordHistoryPage />} />
                    <Route path="/passwordHistory/:singlePasswordHistoryId" exact element={<SinglePasswordHistoryPage />} />
                    <Route path="/serviceMeta" exact element={<ServiceMetaPage />} />
                    <Route path="/serviceMeta/:singleServiceMetaId" exact element={<SingleServiceMetaPage />} />
                    <Route path="/fieldMeta" exact element={<FieldMetaPage />} />
                    <Route path="/fieldMeta/:singleFieldMetaId" exact element={<SingleFieldMetaPage />} />
                    <Route path="/users/:singleUsersId/mobileNumbers" exact element={<MobileNumberProjectLayoutPage />} />
                    <Route path="/users/:singleUsersId/mobileNumbers/:singleMobileNumbersId" exact element={<SingleMobileNumbersPage />} />
                    <Route path="/mobileDevices" exact element={<MobileDevicesPage />} />
                    <Route path="/mobileDevices/:singleMobileDevicesId" exact element={<SingleMobileDevicesPage />} />
                    <Route path="/users/:singleUsersId/preferences" exact element={<PreferenceProjectLayoutPage />} />
                    <Route path="/users/:singleUsersId/preferences/:singlePreferencesId" exact element={<SinglePreferencesPage />} />
                    <Route path="/users/:singleUsersId/ipLoginAccess" exact element={<IpLoginAccessProjectLayoutPage />} />
                    <Route path="/users/:singleUsersId/ipLoginAccess/:singleIpLoginAccessId" exact element={<SingleIpLoginAccessPage />} />
                    <Route path="/profileStatus" exact element={<ProfileStatusPage />} />
                    <Route path="/profileStatus/:singleProfileStatusId" exact element={<SingleProfileStatusPage />} />
                    <Route path="/users/:singleUsersId/emailLog" exact element={<EmailLogProjectLayoutPage />} />
                    <Route path="/users/:singleUsersId/emailLog/:singleEmailLogId" exact element={<SingleEmailLogPage />} />
                    <Route path="/users/:singleUsersId/addresses" exact element={<AddressProjectLayoutPage />} />
                    <Route path="/users/:singleUsersId/addresses/:singleAddressesId" exact element={<SingleAddressesPage />} />
                    <Route path="/companies" exact element={<CompaniesPage />} />
                    <Route path="/companies/:singleCompaniesId" exact element={<SingleCompaniesPage />} />
                    <Route path="/users/:singleUsersId/userCompanies" exact element={<UserCompanyProjectLayoutPage />} />
                    <Route path="/users/:singleUsersId/userCompanies/:singleUserCompaniesId" exact element={<SingleUserCompaniesPage />} />
                    <Route path="/branches" exact element={<BranchesPage />} />
                    <Route path="/branches/:singleBranchesId" exact element={<SingleBranchesPage />} />
                    <Route path="/departments" exact element={<DepartmentsPage />} />
                    <Route path="/departments/:singleDepartmentsId" exact element={<SingleDepartmentsPage />} />
                    <Route path="/sections" exact element={<SectionsPage />} />
                    <Route path="/sections/:singleSectionsId" exact element={<SingleSectionsPage />} />
                    <Route path="/users/:singleUsersId/teams" exact element={<TeamProjectLayoutPage />} />
                    <Route path="/users/:singleUsersId/teams/:singleTeamsId" exact element={<SingleTeamsPage />} />
                    <Route path="/phones" exact element={<PhonesPage />} />
                    <Route path="/phones/:singlePhonesId" exact element={<SinglePhonesPage />} />
                    <Route path="/recentActivities" exact element={<RecentActivitiesPage />} />
                    <Route path="/recentActivities/:singleRecentActivitiesId" exact element={<SingleRecentActivitiesPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
            {/* ~cb-add-route~ */}

            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
};

export default MyRouter;
