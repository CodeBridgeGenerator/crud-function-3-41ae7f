import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SinglePreferencesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [userid, setUserid] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("preferences")
            .get(urlParams.singlePreferencesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"userid"] }})
            .then((res) => {
                set_entity(res || {});
                const userid = Array.isArray(res.userid)
            ? res.userid.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.userid
                ? [{ _id: res.userid._id, name: res.userid.name }]
                : [];
        setUserid(userid);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Preferences", type: "error", message: error.message || "Failed get preferences" });
            });
    }, [props,urlParams.singlePreferencesId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Preferences</h3>
                </div>
                <p>preferences/{urlParams.singlePreferencesId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Path</label><p className="" >{_entity?.path}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Key</label><p className="" >{_entity?.key}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Value</label><p className="" >{_entity?.value}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">userid</label>
            <p>{userid.map((elem) => (
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

export default connect(mapState, mapDispatch)(SinglePreferencesPage);
