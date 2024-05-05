import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleMobileDevicesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [mobilenumberid, setMobilenumberid] = useState([]);
    const [deviceid, setDeviceid] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("mobileDevices")
            .get(urlParams.singleMobileDevicesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"mobilenumberid","deviceid"] }})
            .then((res) => {
                set_entity(res || {});
                const mobilenumberid = Array.isArray(res.mobilenumberid)
            ? res.mobilenumberid.map((elem) => ({ _id: elem._id, mobileno: elem.mobileno }))
            : res.mobilenumberid
                ? [{ _id: res.mobilenumberid._id, mobileno: res.mobilenumberid.mobileno }]
                : [];
        setMobilenumberid(mobilenumberid);
                const deviceid = Array.isArray(res.deviceid)
            ? res.deviceid.map((elem) => ({ _id: elem._id, osff: elem.osff }))
            : res.deviceid
                ? [{ _id: res.deviceid._id, osff: res.deviceid.osff }]
                : [];
        setDeviceid(deviceid);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "MobileDevices", type: "error", message: error.message || "Failed get mobileDevices" });
            });
    }, [props,urlParams.singleMobileDevicesId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">MobileDevices</h3>
                </div>
                <p>mobileDevices/{urlParams.singleMobileDevicesId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Os</label><p className="" >{_entity?.osff}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Version</label><p className="" >{_entity?.version}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Sdk</label><p className="" >{_entity?.sdk}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">mobilenumberid</label>
            <p>{mobilenumberid.map((elem) => (
                    <Link key={elem._id} to={`/mobileNumbers/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.mobileno}</p>
                        </div>
                    </Link>
                ))}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">deviceid</label>
            <p>{deviceid.map((elem) => (
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

export default connect(mapState, mapDispatch)(SingleMobileDevicesPage);
