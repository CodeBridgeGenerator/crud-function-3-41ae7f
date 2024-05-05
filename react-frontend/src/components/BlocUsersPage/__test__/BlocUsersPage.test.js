import React from "react";
import { render, screen } from "@testing-library/react";

import BlocUsersPage from "../BlocUsersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders blocUsers page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <BlocUsersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("blocUsers-datatable")).toBeInTheDocument();
    expect(screen.getByRole("blocUsers-add-button")).toBeInTheDocument();
});
