import React from "react";
import { render, screen } from "@testing-library/react";

import FieldPermissionsPage from "../FieldPermissionsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders fieldPermissions page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FieldPermissionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("fieldPermissions-datatable")).toBeInTheDocument();
    expect(screen.getByRole("fieldPermissions-add-button")).toBeInTheDocument();
});
