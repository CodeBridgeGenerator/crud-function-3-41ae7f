import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import moment from "moment";
import { InputText } from 'primereact/inputtext';



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
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            imageUrl: _entity?.imageUrl,
            profileStatusId: _entity?.profileStatusId,
            uuId: _entity?.uuId,
            oauthProviderId: _entity?.oauthProviderId,
            oauthProviderName: _entity?.oauthProviderName,
            loginTypeId: _entity?.loginTypeId,
            dateOfBirth: _entity?.dateOfBirth,
            gender: _entity?.gender,
            accountStatus: _entity?.accountStatus,
        };

        setLoading(true);
        try {
            
        const result = await client.service("userProfiles").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info userProfiles updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

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
    // children dropdown options

    

    return (
        <Dialog header="Edit User Profiles" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="userProfiles-edit-dialog-component">
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
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">createdAt:{" " + moment(_entity?.createdAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">lastUpdatedAt:{" " + moment(_entity?.updatedAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">createdBy:{" " +_entity?.createdBy?.name}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">lastUpdatedBy:{" " +_entity?.updatedBy?.name}</p></div>
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
