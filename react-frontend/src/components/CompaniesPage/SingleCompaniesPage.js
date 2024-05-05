import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleCompaniesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [phoneTypeId, setPhoneTypeId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("companies")
            .get(urlParams.singleCompaniesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"phoneTypeId"] }})
            .then((res) => {
                set_entity(res || {});
                const phoneTypeId = Array.isArray(res.phoneTypeId)
            ? res.phoneTypeId.map((elem) => ({ _id: elem._id, osff: elem.osff }))
            : res.phoneTypeId
                ? [{ _id: res.phoneTypeId._id, osff: res.phoneTypeId.osff }]
                : [];
        setPhoneTypeId(phoneTypeId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Companies", type: "error", message: error.message || "Failed get companies" });
            });
    }, [props,urlParams.singleCompaniesId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Companies</h3>
                </div>
                <p>companies/{urlParams.singleCompaniesId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Company Name</label><p className="" >{_entity?.companyName}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Company No</label><p className="" >{_entity?.companyNo}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Brand Name</label><p className="" >{_entity?.brandName}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Website</label><p className="" >{_entity?.website}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Address Id</label><p className="" >{_entity?.addressId}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Logourl</label><p className="" >{_entity?.logourl}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Company Email</label><p className="" >{_entity?.companyEmail}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Fax Type Id</label><p className="" >{_entity?.faxTypeId}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">isDefault</label><i className={`pi ${_entity?.isDefault?"pi-check": "pi-times"}`}  ></i></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">phoneTypeId</label>
            <p>{phoneTypeId.map((elem) => (
                    <Link key={elem._id} to={`/mobileDevices/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.osff}</p>
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

export default connect(mapState, mapDispatch)(SingleCompaniesPage);
