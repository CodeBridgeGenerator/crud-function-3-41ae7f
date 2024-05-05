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

const RefPositionsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [roleId, setRoleId] = useState([])
    const [departmentId, setDepartmentId] = useState([])

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            roleId: _entity?.roleId?._id,
            position: _entity?.position,
            abbr: _entity?.abbr,
            reportingtoidPositionHierarchyId: _entity?.reportingtoidPositionHierarchyId,
            departmentId: _entity?.departmentId?._id,
            direct: _entity?.direct,
            ishead: _entity?.ishead,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("refPositions").create(_data);
        const eagerResult = await client
            .service("refPositions")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "roleId",
                    service : "roles",
                    select:["roles"]
                }
            ,
                {
                    path : "departmentId",
                    service : "departments",
                    select:["department"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info refPositions updated successfully" });
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
                    //on mount departments
                    client
                        .service("departments")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setDepartmentId(res.data.map((e) => { return { name: e['department'], value: e._id }}));
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

    const roleIdOptions = roleId.map((elem) => ({ name: elem.name, value: elem.value }));
    const departmentIdOptions = departmentId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Ref Positions" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="refPositions-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="roleId">roleId:</label>
                    <Dropdown id="roleId" value={_entity?.roleId?._id} optionLabel="name" optionValue="value" options={roleIdOptions} onChange={(e) => setValByKey("roleId", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="position">Position:</label>
                <InputText id="position" type="text" value={_entity?.position} onChange={(e) => setValByKey("position", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="abbr">Abbr:</label>
                <InputText id="abbr" type="text" value={_entity?.abbr} onChange={(e) => setValByKey("abbr", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="reportingtoidPositionHierarchyId">Reportingtoid(position Hierarchy Id):</label>
                <InputText id="reportingtoidPositionHierarchyId" type="text" value={_entity?.reportingtoidPositionHierarchyId} onChange={(e) => setValByKey("reportingtoidPositionHierarchyId", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="departmentId">departmentId:</label>
                    <Dropdown id="departmentId" value={_entity?.departmentId?._id} optionLabel="name" optionValue="value" options={departmentIdOptions} onChange={(e) => setValByKey("departmentId", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="direct">direct:</label>
                <Checkbox id="direct" checked={_entity?.direct} onChange={ (e) => setValByKey("direct", e.checked)}  ></Checkbox>
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="ishead">ishead:</label>
                <Checkbox id="ishead" checked={_entity?.ishead} onChange={ (e) => setValByKey("ishead", e.checked)}  ></Checkbox>
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

export default connect(mapState, mapDispatch)(RefPositionsCreateDialogComponent);
