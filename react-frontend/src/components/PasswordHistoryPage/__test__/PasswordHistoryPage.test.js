import React from "react";
import { render, screen } from "@testing-library/react";

import PasswordHistoryPage from "../PasswordHistoryPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders passwordHistory page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PasswordHistoryPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("passwordHistory-datatable")).toBeInTheDocument();
    expect(screen.getByRole("passwordHistory-add-button")).toBeInTheDocument();
});
