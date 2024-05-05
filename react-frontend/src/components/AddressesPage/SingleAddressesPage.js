import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleAddressesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [morphid, setMorphid] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("addresses")
            .get(urlParams.singleAddressesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"morphid"] }})
            .then((res) => {
                set_entity(res || {});
                const morphid = Array.isArray(res.morphid)
            ? res.morphid.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.morphid
                ? [{ _id: res.morphid._id, name: res.morphid.name }]
                : [];
        setMorphid(morphid);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Addresses", type: "error", message: error.message || "Failed get addresses" });
            });
    }, [props,urlParams.singleAddressesId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Addresses</h3>
                </div>
                <p>addresses/{urlParams.singleAddressesId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Morphname</label><p className="" >{_entity?.morphname}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Street</label><p className="" >{_entity?.street}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Street2</label><p className="" >{_entity?.street2}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">City</label><p className="" >{_entity?.city}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Postcode</label><p className="" >{_entity?.postcode}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">State</label><p className="" >{_entity?.state}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Country</label><p className="" >{_entity?.country}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">morphid</label>
            <p>{morphid.map((elem) => (
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

export default connect(mapState, mapDispatch)(SingleAddressesPage);
