import React from "react";
import { render, screen } from "@testing-library/react";

import FieldPermissionsEditDialogComponent from "../FieldPermissionsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders fieldPermissions edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FieldPermissionsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("fieldPermissions-edit-dialog-component")).toBeInTheDocument();
});
