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

const MobileDevicesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [mobilenumberid, setMobilenumberid] = useState([])
    const [deviceid, setDeviceid] = useState([])

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            mobilenumberid: _entity?.mobilenumberid?._id,
            deviceid: _entity?.deviceid?._id,
            osff: _entity?.osff,
            version: _entity?.version,
            sdk: _entity?.sdk,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("mobileDevices").create(_data);
        const eagerResult = await client
            .service("mobileDevices")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "mobilenumberid",
                    service : "mobileNumbers",
                    select:["mobileno"]
                }
            ,
                {
                    path : "deviceid",
                    service : "mobileDevices",
                    select:["osff"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info mobileDevices updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

     useEffect(() => {
                    //on mount mobileNumbers
                    client
                        .service("mobileNumbers")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setMobilenumberid(res.data.map((e) => { return { name: e['mobileno'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "MobileNumbers", type: "error", message: error.message || "Failed get mobileNumbers" });
                        });
                }, []);

    useEffect(() => {
                    //on mount mobileDevices
                    client
                        .service("mobileDevices")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setDeviceid(res.data.map((e) => { return { name: e['osff'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "MobileDevices", type: "error", message: error.message || "Failed get mobileDevices" });
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

    const mobilenumberidOptions = mobilenumberid.map((elem) => ({ name: elem.name, value: elem.value }));
    const deviceidOptions = deviceid.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Mobile Devices" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="mobileDevices-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="mobilenumberid">mobilenumberid:</label>
                    <Dropdown id="mobilenumberid" value={_entity?.mobilenumberid?._id} optionLabel="name" optionValue="value" options={mobilenumberidOptions} onChange={(e) => setValByKey("mobilenumberid", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="deviceid">deviceid:</label>
                    <Dropdown id="deviceid" value={_entity?.deviceid?._id} optionLabel="name" optionValue="value" options={deviceidOptions} onChange={(e) => setValByKey("deviceid", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="osff">Os:</label>
                <InputText id="osff" type="text" value={_entity?.osff} onChange={(e) => setValByKey("osff", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="version">Version:</label>
                <InputText id="version" type="text" value={_entity?.version} onChange={(e) => setValByKey("version", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="sdk">Sdk:</label>
                <InputText id="sdk" type="text" value={_entity?.sdk} onChange={(e) => setValByKey("sdk", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(MobileDevicesCreateDialogComponent);
