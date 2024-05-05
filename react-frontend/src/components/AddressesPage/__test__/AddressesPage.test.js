import React from "react";
import { render, screen } from "@testing-library/react";

import AddressesPage from "../AddressesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders addresses page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AddressesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("addresses-datatable")).toBeInTheDocument();
    expect(screen.getByRole("addresses-add-button")).toBeInTheDocument();
});
