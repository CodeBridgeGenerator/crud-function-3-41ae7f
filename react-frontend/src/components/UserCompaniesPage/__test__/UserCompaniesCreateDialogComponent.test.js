import React from "react";
import { render, screen } from "@testing-library/react";

import UserCompaniesCreateDialogComponent from "../UserCompaniesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userCompanies create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserCompaniesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userCompanies-create-dialog-component")).toBeInTheDocument();
});
