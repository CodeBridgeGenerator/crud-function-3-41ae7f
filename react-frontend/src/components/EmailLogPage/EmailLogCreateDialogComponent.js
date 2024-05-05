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

const EmailLogCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [fromUserId, setFromUserId] = useState([])
    const [toff, setToff] = useState([])
    const [ccff, setCcff] = useState([])
    const [bcc, setBcc] = useState([])

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            fromUserId: _entity?.fromUserId?._id,
            toff: _entity?.toff?._id,
            ccff: _entity?.ccff?._id,
            bcc: _entity?.bcc?._id,
            content: _entity?.content,
            subject: _entity?.subject,
            attachmentCount: _entity?.attachmentCount,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("emailLog").create(_data);
        const eagerResult = await client
            .service("emailLog")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "fromUserId",
                    service : "users",
                    select:["name"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info emailLog updated successfully" });
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
                            setFromUserId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
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

    const fromUserIdOptions = fromUserId.map((elem) => ({ name: elem.name, value: elem.value }));
    const toffOptions = toff.map((elem) => ({ name: elem.name, value: elem.value }));
    const ccffOptions = ccff.map((elem) => ({ name: elem.name, value: elem.value }));
    const bccOptions = bcc.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Email Log" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="emailLog-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="fromUserId">fromUserId:</label>
                    <Dropdown id="fromUserId" value={_entity?.fromUserId?._id} optionLabel="name" optionValue="value" options={fromUserIdOptions} onChange={(e) => setValByKey("fromUserId", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="toff">toff:</label>
                    <Dropdown id="toff" value={_entity?.toff?._id} optionLabel="name" optionValue="value" options={toffOptions} onChange={(e) => setValByKey("toff", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="ccff">ccff:</label>
                    <Dropdown id="ccff" value={_entity?.ccff?._id} optionLabel="name" optionValue="value" options={ccffOptions} onChange={(e) => setValByKey("ccff", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="bcc">bcc:</label>
                    <Dropdown id="bcc" value={_entity?.bcc?._id} optionLabel="name" optionValue="value" options={bccOptions} onChange={(e) => setValByKey("bcc", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="content">Content:</label>
                <InputText id="content" type="text" value={_entity?.content} onChange={(e) => setValByKey("content", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="subject">Subject:</label>
                <InputText id="subject" type="text" value={_entity?.subject} onChange={(e) => setValByKey("subject", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="attachmentCount">Attachment Count:</label>
                <InputText id="attachmentCount" type="text" value={_entity?.attachmentCount} onChange={(e) => setValByKey("attachmentCount", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(EmailLogCreateDialogComponent);
