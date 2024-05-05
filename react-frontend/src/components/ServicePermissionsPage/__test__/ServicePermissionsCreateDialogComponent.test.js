import React from "react";
import { render, screen } from "@testing-library/react";

import ServicePermissionsCreateDialogComponent from "../ServicePermissionsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders servicePermissions create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServicePermissionsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("servicePermissions-create-dialog-component")).toBeInTheDocument();
});
