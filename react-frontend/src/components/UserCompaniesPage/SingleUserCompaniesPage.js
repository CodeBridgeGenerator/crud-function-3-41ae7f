import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleUserCompaniesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [userId, setUserId] = useState([]);
    const [companId, setCompanId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("userCompanies")
            .get(urlParams.singleUserCompaniesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"userId","companId"] }})
            .then((res) => {
                set_entity(res || {});
                const userId = Array.isArray(res.userId)
            ? res.userId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.userId
                ? [{ _id: res.userId._id, name: res.userId.name }]
                : [];
        setUserId(userId);
                const companId = Array.isArray(res.companId)
            ? res.companId.map((elem) => ({ _id: elem._id, companyName: elem.companyName }))
            : res.companId
                ? [{ _id: res.companId._id, companyName: res.companId.companyName }]
                : [];
        setCompanId(companId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "UserCompanies", type: "error", message: error.message || "Failed get userCompanies" });
            });
    }, [props,urlParams.singleUserCompaniesId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">UserCompanies</h3>
                </div>
                <p>userCompanies/{urlParams.singleUserCompaniesId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">effectiveDate</label><p className="m-0 ml-3" >{moment(_entity?.effectiveDate).fromNow()}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">endDate</label><p className="m-0 ml-3" >{moment(_entity?.endDate).fromNow()}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">userId</label>
            <p>{userId.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.name}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">companId</label>
            <p>{companId.map((elem) => (
                    <Link key={elem._id} to={`/companies/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.companyName}</p>
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

export default connect(mapState, mapDispatch)(SingleUserCompaniesPage);
