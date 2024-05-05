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

const SectionsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [companyId, setCompanyId] = useState([])
    const [branchId, setBranchId] = useState([])
    const [departmentId, setDepartmentId] = useState([])

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            companyId: _entity?.companyId?._id,
            branchId: _entity?.branchId?._id,
            departmentId: _entity?.departmentId?._id,
            section: _entity?.section,
            isHead: _entity?.isHead,
            isDefault: _entity?.isDefault,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("sections").create(_data);
        const eagerResult = await client
            .service("sections")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "companyId",
                    service : "companies",
                    select:["companyName"]
                }
            ,
                {
                    path : "branchId",
                    service : "branches",
                    select:["branch"]
                }
            ,
                {
                    path : "departmentId",
                    service : "departments",
                    select:["department"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info sections updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

     useEffect(() => {
                    //on mount companies
                    client
                        .service("companies")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setCompanyId(res.data.map((e) => { return { name: e['companyName'], value: e._id }}));
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
                            setBranchId(res.data.map((e) => { return { name: e['branch'], value: e._id }}));
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

    const companyIdOptions = companyId.map((elem) => ({ name: elem.name, value: elem.value }));
    const branchIdOptions = branchId.map((elem) => ({ name: elem.name, value: elem.value }));
    const departmentIdOptions = departmentId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Sections" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="sections-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="companyId">companyId:</label>
                    <Dropdown id="companyId" value={_entity?.companyId?._id} optionLabel="name" optionValue="value" options={companyIdOptions} onChange={(e) => setValByKey("companyId", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="branchId">branchId:</label>
                    <Dropdown id="branchId" value={_entity?.branchId?._id} optionLabel="name" optionValue="value" options={branchIdOptions} onChange={(e) => setValByKey("branchId", {_id : e.value})} />
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
                <label htmlFor="section">Section:</label>
                <InputText id="section" type="text" value={_entity?.section} onChange={(e) => setValByKey("section", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="isHead">isHead:</label>
                <Checkbox id="isHead" checked={_entity?.isHead} onChange={ (e) => setValByKey("isHead", e.checked)}  ></Checkbox>
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="isDefault">isDefault:</label>
                <Checkbox id="isDefault" checked={_entity?.isDefault} onChange={ (e) => setValByKey("isDefault", e.checked)}  ></Checkbox>
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

export default connect(mapState, mapDispatch)(SectionsCreateDialogComponent);
