import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleRefPositionsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [roleId, setRoleId] = useState([]);
    const [departmentId, setDepartmentId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("refPositions")
            .get(urlParams.singleRefPositionsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"roleId","departmentId"] }})
            .then((res) => {
                set_entity(res || {});
                const roleId = Array.isArray(res.roleId)
            ? res.roleId.map((elem) => ({ _id: elem._id, roles: elem.roles }))
            : res.roleId
                ? [{ _id: res.roleId._id, roles: res.roleId.roles }]
                : [];
        setRoleId(roleId);
                const departmentId = Array.isArray(res.departmentId)
            ? res.departmentId.map((elem) => ({ _id: elem._id, department: elem.department }))
            : res.departmentId
                ? [{ _id: res.departmentId._id, department: res.departmentId.department }]
                : [];
        setDepartmentId(departmentId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "RefPositions", type: "error", message: error.message || "Failed get refPositions" });
            });
    }, [props,urlParams.singleRefPositionsId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">RefPositions</h3>
                </div>
                <p>refPositions/{urlParams.singleRefPositionsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Position</label><p className="" >{_entity?.position}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Abbr</label><p className="" >{_entity?.abbr}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Reportingtoid(position Hierarchy Id)</label><p className="" >{_entity?.reportingtoidPositionHierarchyId}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">direct</label><i className={`pi ${_entity?.direct?"pi-check": "pi-times"}`}  ></i></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">ishead</label><i className={`pi ${_entity?.ishead?"pi-check": "pi-times"}`}  ></i></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">roleId</label>
            <p>{roleId.map((elem) => (
                    <Link key={elem._id} to={`/roles/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.roles}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">departmentId</label>
            <p>{departmentId.map((elem) => (
                    <Link key={elem._id} to={`/departments/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.department}</p>
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

export default connect(mapState, mapDispatch)(SingleRefPositionsPage);
