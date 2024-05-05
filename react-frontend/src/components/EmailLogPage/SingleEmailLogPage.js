import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleEmailLogPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [fromUserId, setFromUserId] = useState([]);
    const [toff, setToff] = useState([]);
    const [ccff, setCcff] = useState([]);
    const [bcc, setBcc] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("emailLog")
            .get(urlParams.singleEmailLogId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"fromUserId","toff","ccff","bcc"] }})
            .then((res) => {
                set_entity(res || {});
                const fromUserId = Array.isArray(res.fromUserId)
            ? res.fromUserId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.fromUserId
                ? [{ _id: res.fromUserId._id, name: res.fromUserId.name }]
                : [];
        setFromUserId(fromUserId);
                const toff = Array.isArray(res.toff)
            ? res.toff.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.toff
                ? [{ _id: res.toff._id, name: res.toff.name }]
                : [];
        setToff(toff);
                const ccff = Array.isArray(res.ccff)
            ? res.ccff.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.ccff
                ? [{ _id: res.ccff._id, name: res.ccff.name }]
                : [];
        setCcff(ccff);
                const bcc = Array.isArray(res.bcc)
            ? res.bcc.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.bcc
                ? [{ _id: res.bcc._id, name: res.bcc.name }]
                : [];
        setBcc(bcc);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "EmailLog", type: "error", message: error.message || "Failed get emailLog" });
            });
    }, [props,urlParams.singleEmailLogId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">EmailLog</h3>
                </div>
                <p>emailLog/{urlParams.singleEmailLogId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Content</label><p className="" >{_entity?.content}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Subject</label><p className="" >{_entity?.subject}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Attachment Count</label><p className="" >{_entity?.attachmentCount}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">fromUserId</label>
            <p>{fromUserId.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.name}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">toff</label>
            <p>{toff.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.name}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">ccff</label>
            <p>{ccff.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.name}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">bcc</label>
            <p>{bcc.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.name}</p>
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

export default connect(mapState, mapDispatch)(SingleEmailLogPage);
