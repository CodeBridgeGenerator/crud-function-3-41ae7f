import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const UserProfilesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [userId, setUserId] = useState([])
    const [currentMobileNumberId, setCurrentMobileNumberId] = useState([])
    const [currentRoleId, setCurrentRoleId] = useState([])
    const [currentCompanyId, setCurrentCompanyId] = useState([])
    const [currentBranchId, setCurrentBranchId] = useState([])
    const [currentDepartmentId, setCurrentDepartmentId] = useState([])
    const [currentSubDepartmentId, setCurrentSubDepartmentId] = useState([])

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            userId: _entity?.userId?._id,
            imageUrl: _entity?.imageUrl,
            profileStatusId: _entity?.profileStatusId,
            uuId: _entity?.uuId,
            oauthProviderId: _entity?.oauthProviderId,
            oauthProviderName: _entity?.oauthProviderName,
            loginTypeId: _entity?.loginTypeId,
            dateOfBirth: _entity?.dateOfBirth,
            gender: _entity?.gender,
            accountStatus: _entity?.accountStatus,
            currentMobileNumberId: _entity?.currentMobileNumberId?._id,
            currentRoleId: _entity?.currentRoleId?._id,
            currentCompanyId: _entity?.currentCompanyId?._id,
            currentBranchId: _entity?.currentBranchId?._id,
            currentDepartmentId: _entity?.currentDepartmentId?._id,
            currentSubDepartmentId: _entity?.currentSubDepartmentId?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("userProfiles").create(_data);
        const eagerResult = await client
            .service("userProfiles")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "userId",
                    service : "users",
                    select:["name"]
                }
            ,
                {
                    path : "currentMobileNumberId",
                    service : "mobileNumbers",
                    select:["mobileno"]
                }
            ,
                {
                    path : "currentRoleId",
                    service : "roles",
                    select:["roles"]
                }
            ,
                {
                    path : "currentCompanyId",
                    service : "companies",
                    select:["companyName"]
                }
            ,
                {
                    path : "currentBranchId",
                    service : "branches",
                    select:["branch"]
                }
            ,
                {
                    path : "currentDepartmentId",
                    service : "departments",
                    select:["department"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info userProfiles updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

     useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setUserId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    useEffect(() => {
                    //on mount mobileNumbers
                    client
                        .service("mobileNumbers")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setCurrentMobileNumberId(res.data.map((e) => { return { name: e['mobileno'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "MobileNumbers", type: "error", message: error.message || "Failed get mobileNumbers" });
                        });
                }, []);

    useEffect(() => {
                    //on mount roles
                    client
                        .service("roles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setCurrentRoleId(res.data.map((e) => { return { name: e['roles'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Roles", type: "error", message: error.message || "Failed get roles" });
                        });
                }, []);

    useEffect(() => {
                    //on mount companies
                    client
                        .service("companies")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setCurrentCompanyId(res.data.map((e) => { return { name: e['companyName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Companies", type: "error", message: error.message || "Failed get companies" });
                        });
                }, []);

    useEffect(() => {
                    //on mount branches
                    client
                        .service("branches")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setCurrentBranchId(res.data.map((e) => { return { name: e['branch'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Branches", type: "error", message: error.message || "Failed get branches" });
                        });
                }, []);

    useEffect(() => {
                    //on mount departments
                    client
                        .service("departments")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setCurrentDepartmentId(res.data.map((e) => { return { name: e['department'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Departments", type: "error", message: error.message || "Failed get departments" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    const userIdOptions = userId.map((elem) => ({ name: elem.name, value: elem.value }));
    const currentMobileNumberIdOptions = currentMobileNumberId.map((elem) => ({ name: elem.name, value: elem.value }));
    const currentRoleIdOptions = currentRoleId.map((elem) => ({ name: elem.name, value: elem.value }));
    const currentCompanyIdOptions = currentCompanyId.map((elem) => ({ name: elem.name, value: elem.value }));
    const currentBranchIdOptions = currentBranchId.map((elem) => ({ name: elem.name, value: elem.value }));
    const currentDepartmentIdOptions = currentDepartmentId.map((elem) => ({ name: elem.name, value: elem.value }));
    const currentSubDepartmentIdOptions = currentSubDepartmentId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create User Profiles" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="userProfiles-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="userId">userId:</label>
                    <Dropdown id="userId" value={_entity?.userId?._id} optionLabel="name" optionValue="value" options={userIdOptions} onChange={(e) => setValByKey("userId", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="imageUrl">Image Url:</label>
                <InputText id="imageUrl" type="text" value={_entity?.imageUrl} onChange={(e) => setValByKey("imageUrl", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="profileStatusId">Profile Status Id:</label>
                <InputText id="profileStatusId" type="text" value={_entity?.profileStatusId} onChange={(e) => setValByKey("profileStatusId", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="uuId">Uu Id:</label>
                <InputText id="uuId" type="text" value={_entity?.uuId} onChange={(e) => setValByKey("uuId", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="oauthProviderId">Oauth Provider Id:</label>
                <InputText id="oauthProviderId" type="text" value={_entity?.oauthProviderId} onChange={(e) => setValByKey("oauthProviderId", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="oauthProviderName">Oauth Provider Name:</label>
                <InputText id="oauthProviderName" type="text" value={_entity?.oauthProviderName} onChange={(e) => setValByKey("oauthProviderName", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="loginTypeId">Login Type Id:</label>
                <InputText id="loginTypeId" type="text" value={_entity?.loginTypeId} onChange={(e) => setValByKey("loginTypeId", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <InputText id="dateOfBirth" type="text" value={_entity?.dateOfBirth} onChange={(e) => setValByKey("dateOfBirth", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="gender">Gender:</label>
                <InputText id="gender" type="text" value={_entity?.gender} onChange={(e) => setValByKey("gender", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="accountStatus">Account Status:</label>
                <InputText id="accountStatus" type="text" value={_entity?.accountStatus} onChange={(e) => setValByKey("accountStatus", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="currentMobileNumberId">currentMobileNumberId:</label>
                    <Dropdown id="currentMobileNumberId" value={_entity?.currentMobileNumberId?._id} optionLabel="name" optionValue="value" options={currentMobileNumberIdOptions} onChange={(e) => setValByKey("currentMobileNumberId", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="currentRoleId">currentRoleId:</label>
                    <Dropdown id="currentRoleId" value={_entity?.currentRoleId?._id} optionLabel="name" optionValue="value" options={currentRoleIdOptions} onChange={(e) => setValByKey("currentRoleId", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="currentCompanyId">currentCompanyId:</label>
                    <Dropdown id="currentCompanyId" value={_entity?.currentCompanyId?._id} optionLabel="name" optionValue="value" options={currentCompanyIdOptions} onChange={(e) => setValByKey("currentCompanyId", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="currentBranchId">currentBranchId:</label>
                    <Dropdown id="currentBranchId" value={_entity?.currentBranchId?._id} optionLabel="name" optionValue="value" options={currentBranchIdOptions} onChange={(e) => setValByKey("currentBranchId", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="currentDepartmentId">currentDepartmentId:</label>
                    <Dropdown id="currentDepartmentId" value={_entity?.currentDepartmentId?._id} optionLabel="name" optionValue="value" options={currentDepartmentIdOptions} onChange={(e) => setValByKey("currentDepartmentId", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="currentSubDepartmentId">currentSubDepartmentId:</label>
                    <Dropdown id="currentSubDepartmentId" value={_entity?.currentSubDepartmentId?._id} optionLabel="name" optionValue="value" options={currentSubDepartmentIdOptions} onChange={(e) => setValByKey("currentSubDepartmentId", {_id : e.value})} />
                </span>
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(UserProfilesCreateDialogComponent);
