import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleFieldPermissionsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [roleId, setRoleId] = useState([]);
    const [userId, setUserId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("fieldPermissions")
            .get(urlParams.singleFieldPermissionsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"roleId","userId"] }})
            .then((res) => {
                set_entity(res || {});
                const roleId = Array.isArray(res.roleId)
            ? res.roleId.map((elem) => ({ _id: elem._id, roles: elem.roles }))
            : res.roleId
                ? [{ _id: res.roleId._id, roles: res.roleId.roles }]
                : [];
        setRoleId(roleId);
                const userId = Array.isArray(res.userId)
            ? res.userId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.userId
                ? [{ _id: res.userId._id, name: res.userId.name }]
                : [];
        setUserId(userId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "FieldPermissions", type: "error", message: error.message || "Failed get fieldPermissions" });
            });
    }, [props,urlParams.singleFieldPermissionsId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">FieldPermissions</h3>
                </div>
                <p>fieldPermissions/{urlParams.singleFieldPermissionsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Service Id</label><p className="" >{_entity?.serviceId}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Field Id</label><p className="" >{_entity?.fieldId}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">read</label><i className={`pi ${_entity?.read?"pi-check": "pi-times"}`}  ></i></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">create</label><i className={`pi ${_entity?.create?"pi-check": "pi-times"}`}  ></i></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">patchany</label><i className={`pi ${_entity?.patchany?"pi-check": "pi-times"}`}  ></i></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">patchown</label><i className={`pi ${_entity?.patchown?"pi-check": "pi-times"}`}  ></i></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">deleteany</label><i className={`pi ${_entity?.deleteany?"pi-check": "pi-times"}`}  ></i></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">deleteown</label><i className={`pi ${_entity?.deleteown?"pi-check": "pi-times"}`}  ></i></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">roleId</label>
            <p>{roleId.map((elem) => (
                    <Link key={elem._id} to={`/roles/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.roles}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">userId</label>
            <p>{userId.map((elem) => (
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

export default connect(mapState, mapDispatch)(SingleFieldPermissionsPage);
