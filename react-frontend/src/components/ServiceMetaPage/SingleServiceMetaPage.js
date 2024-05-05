import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleServiceMetaPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("serviceMeta")
            .get(urlParams.singleServiceMetaId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "ServiceMeta", type: "error", message: error.message || "Failed get serviceMeta" });
            });
    }, [props,urlParams.singleServiceMetaId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">ServiceMeta</h3>
                </div>
                <p>serviceMeta/{urlParams.singleServiceMetaId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Service Id</label><p className="" >{_entity?.serviceId}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Descriptive</label><p className="" >{_entity?.descriptive}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Structural</label><p className="" >{_entity?.structural}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Administrative</label><p className="" >{_entity?.administrative}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Reference</label><p className="" >{_entity?.reference}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Statistical</label><p className="" >{_entity?.statistical}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Legal</label><p className="" >{_entity?.legal}</p></div>
            

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

export default connect(mapState, mapDispatch)(SingleServiceMetaPage);
