import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleUserProfilesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [userId, setUserId] = useState([]);
    const [currentMobileNumberId, setCurrentMobileNumberId] = useState([]);
    const [currentRoleId, setCurrentRoleId] = useState([]);
    const [currentCompanyId, setCurrentCompanyId] = useState([]);
    const [currentBranchId, setCurrentBranchId] = useState([]);
    const [currentDepartmentId, setCurrentDepartmentId] = useState([]);
    const [currentSubDepartmentId, setCurrentSubDepartmentId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("userProfiles")
            .get(urlParams.singleUserProfilesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"userId","currentMobileNumberId","currentRoleId","currentCompanyId","currentBranchId","currentDepartmentId","currentSubDepartmentId"] }})
            .then((res) => {
                set_entity(res || {});
                const userId = Array.isArray(res.userId)
            ? res.userId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.userId
                ? [{ _id: res.userId._id, name: res.userId.name }]
                : [];
        setUserId(userId);
                const currentMobileNumberId = Array.isArray(res.currentMobileNumberId)
            ? res.currentMobileNumberId.map((elem) => ({ _id: elem._id, mobileno: elem.mobileno }))
            : res.currentMobileNumberId
                ? [{ _id: res.currentMobileNumberId._id, mobileno: res.currentMobileNumberId.mobileno }]
                : [];
        setCurrentMobileNumberId(currentMobileNumberId);
                const currentRoleId = Array.isArray(res.currentRoleId)
            ? res.currentRoleId.map((elem) => ({ _id: elem._id, roles: elem.roles }))
            : res.currentRoleId
                ? [{ _id: res.currentRoleId._id, roles: res.currentRoleId.roles }]
                : [];
        setCurrentRoleId(currentRoleId);
                const currentCompanyId = Array.isArray(res.currentCompanyId)
            ? res.currentCompanyId.map((elem) => ({ _id: elem._id, companyName: elem.companyName }))
            : res.currentCompanyId
                ? [{ _id: res.currentCompanyId._id, companyName: res.currentCompanyId.companyName }]
                : [];
        setCurrentCompanyId(currentCompanyId);
                const currentBranchId = Array.isArray(res.currentBranchId)
            ? res.currentBranchId.map((elem) => ({ _id: elem._id, branch: elem.branch }))
            : res.currentBranchId
                ? [{ _id: res.currentBranchId._id, branch: res.currentBranchId.branch }]
                : [];
        setCurrentBranchId(currentBranchId);
                const currentDepartmentId = Array.isArray(res.currentDepartmentId)
            ? res.currentDepartmentId.map((elem) => ({ _id: elem._id, department: elem.department }))
            : res.currentDepartmentId
                ? [{ _id: res.currentDepartmentId._id, department: res.currentDepartmentId.department }]
                : [];
        setCurrentDepartmentId(currentDepartmentId);
                const currentSubDepartmentId = Array.isArray(res.currentSubDepartmentId)
            ? res.currentSubDepartmentId.map((elem) => ({ _id: elem._id, department: elem.department }))
            : res.currentSubDepartmentId
                ? [{ _id: res.currentSubDepartmentId._id, department: res.currentSubDepartmentId.department }]
                : [];
        setCurrentSubDepartmentId(currentSubDepartmentId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "UserProfiles", type: "error", message: error.message || "Failed get userProfiles" });
            });
    }, [props,urlParams.singleUserProfilesId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">UserProfiles</h3>
                </div>
                <p>userProfiles/{urlParams.singleUserProfilesId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Image Url</label><p className="" >{_entity?.imageUrl}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Profile Status Id</label><p className="" >{_entity?.profileStatusId}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Uu Id</label><p className="" >{_entity?.uuId}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Oauth Provider Id</label><p className="" >{_entity?.oauthProviderId}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Oauth Provider Name</label><p className="" >{_entity?.oauthProviderName}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Login Type Id</label><p className="" >{_entity?.loginTypeId}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Date Of Birth</label><p className="" >{_entity?.dateOfBirth}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Gender</label><p className="" >{_entity?.gender}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Account Status</label><p className="" >{_entity?.accountStatus}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">userId</label>
            <p>{userId.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.name}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">currentMobileNumberId</label>
            <p>{currentMobileNumberId.map((elem) => (
                    <Link key={elem._id} to={`/mobileNumbers/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.mobileno}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">currentRoleId</label>
            <p>{currentRoleId.map((elem) => (
                    <Link key={elem._id} to={`/roles/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.roles}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">currentCompanyId</label>
            <p>{currentCompanyId.map((elem) => (
                    <Link key={elem._id} to={`/companies/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.companyName}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">currentBranchId</label>
            <p>{currentBranchId.map((elem) => (
                    <Link key={elem._id} to={`/branches/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.branch}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">currentDepartmentId</label>
            <p>{currentDepartmentId.map((elem) => (
                    <Link key={elem._id} to={`/departments/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.department}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">currentSubDepartmentId</label>
            <p>{currentSubDepartmentId.map((elem) => (
                    <Link key={elem._id} to={`/departments/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.department}</p>
                        </div>
                    </Link>
                ))}</p></div>

            <div className="col-12">&nbsp;</div>
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">created</label>
                <p className="">{moment(_entity?.createdAt).fromNow()}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">updated</label>
                <p className="">{moment(_entity?.updatedAt).fromNow()}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">createdBy</label>
                <p className="">{_entity?.createdBy?.name}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">lastUpdatedBy</label>
                <p className="">{_entity?.updatedBy?.name}</p>
            </div>

                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleUserProfilesPage);
