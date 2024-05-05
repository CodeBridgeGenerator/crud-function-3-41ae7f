import React from "react";
import { render, screen } from "@testing-library/react";

import EmailLogPage from "../EmailLogPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders emailLog page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmailLogPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("emailLog-datatable")).toBeInTheDocument();
    expect(screen.getByRole("emailLog-add-button")).toBeInTheDocument();
});
