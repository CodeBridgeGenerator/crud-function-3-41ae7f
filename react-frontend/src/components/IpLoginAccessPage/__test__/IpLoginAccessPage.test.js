import React from "react";
import { render, screen } from "@testing-library/react";

import IpLoginAccessPage from "../IpLoginAccessPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders ipLoginAccess page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IpLoginAccessPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("ipLoginAccess-datatable")).toBeInTheDocument();
    expect(screen.getByRole("ipLoginAccess-add-button")).toBeInTheDocument();
});
