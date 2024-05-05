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

const CompaniesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [phoneTypeId, setPhoneTypeId] = useState([])

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            companyName: _entity?.companyName,
            companyNo: _entity?.companyNo,
            brandName: _entity?.brandName,
            website: _entity?.website,
            addressId: _entity?.addressId,
            logourl: _entity?.logourl,
            companyEmail: _entity?.companyEmail,
            phoneTypeId: _entity?.phoneTypeId?._id,
            faxTypeId: _entity?.faxTypeId,
            isDefault: _entity?.isDefault,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("companies").create(_data);
        const eagerResult = await client
            .service("companies")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "phoneTypeId",
                    service : "mobileDevices",
                    select:["osff"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info companies updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

     useEffect(() => {
                    //on mount mobileDevices
                    client
                        .service("mobileDevices")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setPhoneTypeId(res.data.map((e) => { return { name: e['osff'], value: e._id }}));
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

    const phoneTypeIdOptions = phoneTypeId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Companies" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="companies-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="companyName">Company Name:</label>
                <InputText id="companyName" type="text" value={_entity?.companyName} onChange={(e) => setValByKey("companyName", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="companyNo">Company No:</label>
                <InputText id="companyNo" type="text" value={_entity?.companyNo} onChange={(e) => setValByKey("companyNo", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="brandName">Brand Name:</label>
                <InputText id="brandName" type="text" value={_entity?.brandName} onChange={(e) => setValByKey("brandName", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="website">Website:</label>
                <InputText id="website" type="text" value={_entity?.website} onChange={(e) => setValByKey("website", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="addressId">Address Id:</label>
                <InputText id="addressId" type="text" value={_entity?.addressId} onChange={(e) => setValByKey("addressId", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="logourl">Logourl:</label>
                <InputText id="logourl" type="text" value={_entity?.logourl} onChange={(e) => setValByKey("logourl", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="companyEmail">Company Email:</label>
                <InputText id="companyEmail" type="text" value={_entity?.companyEmail} onChange={(e) => setValByKey("companyEmail", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="phoneTypeId">phoneTypeId:</label>
                    <Dropdown id="phoneTypeId" value={_entity?.phoneTypeId?._id} optionLabel="name" optionValue="value" options={phoneTypeIdOptions} onChange={(e) => setValByKey("phoneTypeId", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="faxTypeId">Fax Type Id:</label>
                <InputText id="faxTypeId" type="text" value={_entity?.faxTypeId} onChange={(e) => setValByKey("faxTypeId", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(CompaniesCreateDialogComponent);
