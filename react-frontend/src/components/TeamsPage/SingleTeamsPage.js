import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleTeamsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [userIds, setUserIds] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("teams")
            .get(urlParams.singleTeamsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"userIds"] }})
            .then((res) => {
                set_entity(res || {});
                const userIds = Array.isArray(res.userIds)
            ? res.userIds.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.userIds
                ? [{ _id: res.userIds._id, name: res.userIds.name }]
                : [];
        setUserIds(userIds);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Teams", type: "error", message: error.message || "Failed get teams" });
            });
    }, [props,urlParams.singleTeamsId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Teams</h3>
                </div>
                <p>teams/{urlParams.singleTeamsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Name</label><p className="" >{_entity?.name}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Description</label><p className="" >{_entity?.description}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">isDefault</label><i className={`pi ${_entity?.isDefault?"pi-check": "pi-times"}`}  ></i></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">userIds</label>
            <p>{userIds.map((elem) => (
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

export default connect(mapState, mapDispatch)(SingleTeamsPage);
