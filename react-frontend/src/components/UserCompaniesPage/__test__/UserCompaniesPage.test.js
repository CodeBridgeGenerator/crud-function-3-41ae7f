import React from "react";
import { render, screen } from "@testing-library/react";

import UserCompaniesPage from "../UserCompaniesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userCompanies page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserCompaniesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userCompanies-datatable")).toBeInTheDocument();
    expect(screen.getByRole("userCompanies-add-button")).toBeInTheDocument();
});
