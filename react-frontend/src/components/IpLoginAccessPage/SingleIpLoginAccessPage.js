import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleIpLoginAccessPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [userId, setUserId] = useState([]);
    const [roleId, setRoleId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("ipLoginAccess")
            .get(urlParams.singleIpLoginAccessId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"userId","roleId"] }})
            .then((res) => {
                set_entity(res || {});
                const userId = Array.isArray(res.userId)
            ? res.userId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.userId
                ? [{ _id: res.userId._id, name: res.userId.name }]
                : [];
        setUserId(userId);
                const roleId = Array.isArray(res.roleId)
            ? res.roleId.map((elem) => ({ _id: elem._id, roles: elem.roles }))
            : res.roleId
                ? [{ _id: res.roleId._id, roles: res.roleId.roles }]
                : [];
        setRoleId(roleId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "IpLoginAccess", type: "error", message: error.message || "Failed get ipLoginAccess" });
            });
    }, [props,urlParams.singleIpLoginAccessId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">IpLoginAccess</h3>
                </div>
                <p>ipLoginAccess/{urlParams.singleIpLoginAccessId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Start Ip</label><p className="" >{_entity?.startIp}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">End Ip</label><p className="" >{_entity?.endIp}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">allowedStartTime</label><p className="m-0 ml-3" >{moment(_entity?.allowedStartTime).fromNow()}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">allowedEndTime</label><p className="m-0 ml-3" >{moment(_entity?.allowedEndTime).fromNow()}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">blockedStartTime</label><p className="m-0 ml-3" >{moment(_entity?.blockedStartTime).fromNow()}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">blockedEndTime</label><p className="m-0 ml-3" >{moment(_entity?.blockedEndTime).fromNow()}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">userId</label>
            <p>{userId.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.name}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">roleId</label>
            <p>{roleId.map((elem) => (
                    <Link key={elem._id} to={`/roles/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.roles}</p>
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

export default connect(mapState, mapDispatch)(SingleIpLoginAccessPage);
