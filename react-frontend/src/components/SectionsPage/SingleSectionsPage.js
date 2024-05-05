import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleSectionsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [companyId, setCompanyId] = useState([]);
    const [branchId, setBranchId] = useState([]);
    const [departmentId, setDepartmentId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("sections")
            .get(urlParams.singleSectionsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"companyId","branchId","departmentId"] }})
            .then((res) => {
                set_entity(res || {});
                const companyId = Array.isArray(res.companyId)
            ? res.companyId.map((elem) => ({ _id: elem._id, companyName: elem.companyName }))
            : res.companyId
                ? [{ _id: res.companyId._id, companyName: res.companyId.companyName }]
                : [];
        setCompanyId(companyId);
                const branchId = Array.isArray(res.branchId)
            ? res.branchId.map((elem) => ({ _id: elem._id, branch: elem.branch }))
            : res.branchId
                ? [{ _id: res.branchId._id, branch: res.branchId.branch }]
                : [];
        setBranchId(branchId);
                const departmentId = Array.isArray(res.departmentId)
            ? res.departmentId.map((elem) => ({ _id: elem._id, department: elem.department }))
            : res.departmentId
                ? [{ _id: res.departmentId._id, department: res.departmentId.department }]
                : [];
        setDepartmentId(departmentId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Sections", type: "error", message: error.message || "Failed get sections" });
            });
    }, [props,urlParams.singleSectionsId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Sections</h3>
                </div>
                <p>sections/{urlParams.singleSectionsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Section</label><p className="" >{_entity?.section}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">isHead</label><i className={`pi ${_entity?.isHead?"pi-check": "pi-times"}`}  ></i></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">isDefault</label><i className={`pi ${_entity?.isDefault?"pi-check": "pi-times"}`}  ></i></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">companyId</label>
            <p>{companyId.map((elem) => (
                    <Link key={elem._id} to={`/companies/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.companyName}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">branchId</label>
            <p>{branchId.map((elem) => (
                    <Link key={elem._id} to={`/branches/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.branch}</p>
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

export default connect(mapState, mapDispatch)(SingleSectionsPage);
