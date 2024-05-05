import React from "react";
import { render, screen } from "@testing-library/react";

import ServicePermissionsPage from "../ServicePermissionsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders servicePermissions page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServicePermissionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("servicePermissions-datatable")).toBeInTheDocument();
    expect(screen.getByRole("servicePermissions-add-button")).toBeInTheDocument();
});
