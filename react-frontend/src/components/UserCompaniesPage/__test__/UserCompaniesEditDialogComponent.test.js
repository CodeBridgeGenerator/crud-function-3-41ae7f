import React from "react";
import { render, screen } from "@testing-library/react";

import UserCompaniesEditDialogComponent from "../UserCompaniesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userCompanies edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserCompaniesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userCompanies-edit-dialog-component")).toBeInTheDocument();
});
