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

const AddressesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [morphid, setMorphid] = useState([])

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            morphid: _entity?.morphid?._id,
            morphname: _entity?.morphname,
            street: _entity?.street,
            street2: _entity?.street2,
            city: _entity?.city,
            postcode: _entity?.postcode,
            state: _entity?.state,
            country: _entity?.country,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("addresses").create(_data);
        const eagerResult = await client
            .service("addresses")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "morphid",
                    service : "users",
                    select:["name"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info addresses updated successfully" });
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
                            setMorphid(res.data.map((e) => { return { name: e['name'], value: e._id }}));
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

    const morphidOptions = morphid.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Addresses" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="addresses-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="morphid">morphid:</label>
                    <Dropdown id="morphid" value={_entity?.morphid?._id} optionLabel="name" optionValue="value" options={morphidOptions} onChange={(e) => setValByKey("morphid", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="morphname">Morphname:</label>
                <InputText id="morphname" type="text" value={_entity?.morphname} onChange={(e) => setValByKey("morphname", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="street">Street:</label>
                <InputText id="street" type="text" value={_entity?.street} onChange={(e) => setValByKey("street", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="street2">Street2:</label>
                <InputText id="street2" type="text" value={_entity?.street2} onChange={(e) => setValByKey("street2", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="city">City:</label>
                <InputText id="city" type="text" value={_entity?.city} onChange={(e) => setValByKey("city", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="postcode">Postcode:</label>
                <InputText id="postcode" type="text" value={_entity?.postcode} onChange={(e) => setValByKey("postcode", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="state">State:</label>
                <InputText id="state" type="text" value={_entity?.state} onChange={(e) => setValByKey("state", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="country">Country:</label>
                <InputText id="country" type="text" value={_entity?.country} onChange={(e) => setValByKey("country", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(AddressesCreateDialogComponent);
