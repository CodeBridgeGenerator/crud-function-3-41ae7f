
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

import moment from "moment";

const ServicePermissionsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    const dt = useRef(null);
     
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.serviceId}</p>
    const checkboxTemplate3 = (rowData, { rowIndex }) => <Checkbox checked={rowData.read}  ></Checkbox>
    const checkboxTemplate4 = (rowData, { rowIndex }) => <Checkbox checked={rowData.create}  ></Checkbox>
    const checkboxTemplate5 = (rowData, { rowIndex }) => <Checkbox checked={rowData.updateany}  ></Checkbox>
    const checkboxTemplate6 = (rowData, { rowIndex }) => <Checkbox checked={rowData.updateown}  ></Checkbox>
    const checkboxTemplate7 = (rowData, { rowIndex }) => <Checkbox checked={rowData.deleteany}  ></Checkbox>
    const checkboxTemplate8 = (rowData, { rowIndex }) => <Checkbox checked={rowData.deleteown}  ></Checkbox>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
    const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);
    const pCreatedBy = (rowData, { rowIndex }) => (
        <p>{rowData.createdBy?.name}</p>
    );
    const pUpdatedBy = (rowData, { rowIndex }) => (<p>{rowData.updatedBy?.name}</p>);
    const paginatorLeft = (<Button type="button" icon="pi pi-refresh" text onClick={() => setRefresh(!refresh)}/>);
    const paginatorRight = <Button type="button" icon="pi pi-download" text onClick={() => exportCSV()}/>;
    const exportCSV = () => {dt.current?.exportCSV();};

    return (
        <DataTable value={items} ref={dt} onRowClick={onRowClick} scrollable rowHover stripedRows paginator rows={10} rowsPerPageOptions={[10, 50, 250, 500]} size={"small"}  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} rowClassName="cursor-pointer">
            <Column field="serviceId" header="Service Id" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="read" header="read" body={checkboxTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="create" header="create" body={checkboxTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="updateany" header="updateany" body={checkboxTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="updateown" header="updateown" body={checkboxTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="deleteany" header="deleteany" body={checkboxTemplate7} style={{ minWidth: "8rem" }} />
            <Column field="deleteown" header="deleteown" body={checkboxTemplate8} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
        </DataTable>
    );
};

export default ServicePermissionsDataTable;