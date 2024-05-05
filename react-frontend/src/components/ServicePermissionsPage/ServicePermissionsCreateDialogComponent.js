import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';



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

const ServicePermissionsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [roleId, setRoleId] = useState([])
    const [userId, setUserId] = useState([])

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            roleId: _entity?.roleId?._id,
            userId: _entity?.userId?._id,
            serviceId: _entity?.serviceId,
            read: _entity?.read,
            create: _entity?.create,
            updateany: _entity?.updateany,
            updateown: _entity?.updateown,
            deleteany: _entity?.deleteany,
            deleteown: _entity?.deleteown,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("servicePermissions").create(_data);
        const eagerResult = await client
            .service("servicePermissions")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "roleId",
                    service : "roles",
                    select:["roles"]
                }
            ,
                {
                    path : "userId",
                    service : "users",
                    select:["name"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info servicePermissions updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

     useEffect(() => {
                    //on mount roles
                    client
                        .service("roles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setRoleId(res.data.map((e) => { return { name: e['roles'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Roles", type: "error", message: error.message || "Failed get roles" });
                        });
                }, []);

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

    const roleIdOptions = roleId.map((elem) => ({ name: elem.name, value: elem.value }));
    const userIdOptions = userId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Service Permissions" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="servicePermissions-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="roleId">roleId:</label>
                    <Dropdown id="roleId" value={_entity?.roleId?._id} optionLabel="name" optionValue="value" options={roleIdOptions} onChange={(e) => setValByKey("roleId", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="userId">userId:</label>
                    <Dropdown id="userId" value={_entity?.userId?._id} optionLabel="name" optionValue="value" options={userIdOptions} onChange={(e) => setValByKey("userId", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="serviceId">Service Id:</label>
                <InputText id="serviceId" type="text" value={_entity?.serviceId} onChange={(e) => setValByKey("serviceId", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="read">read:</label>
                <Checkbox id="read" checked={_entity?.read} onChange={ (e) => setValByKey("read", e.checked)}  ></Checkbox>
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="create">create:</label>
                <Checkbox id="create" checked={_entity?.create} onChange={ (e) => setValByKey("create", e.checked)}  ></Checkbox>
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="updateany">updateany:</label>
                <Checkbox id="updateany" checked={_entity?.updateany} onChange={ (e) => setValByKey("updateany", e.checked)}  ></Checkbox>
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="updateown">updateown:</label>
                <Checkbox id="updateown" checked={_entity?.updateown} onChange={ (e) => setValByKey("updateown", e.checked)}  ></Checkbox>
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="deleteany">deleteany:</label>
                <Checkbox id="deleteany" checked={_entity?.deleteany} onChange={ (e) => setValByKey("deleteany", e.checked)}  ></Checkbox>
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="deleteown">deleteown:</label>
                <Checkbox id="deleteown" checked={_entity?.deleteown} onChange={ (e) => setValByKey("deleteown", e.checked)}  ></Checkbox>
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

export default connect(mapState, mapDispatch)(ServicePermissionsCreateDialogComponent);
