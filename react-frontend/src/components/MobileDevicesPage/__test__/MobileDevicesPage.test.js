import React from "react";
import { render, screen } from "@testing-library/react";

import MobileDevicesPage from "../MobileDevicesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders mobileDevices page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MobileDevicesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("mobileDevices-datatable")).toBeInTheDocument();
    expect(screen.getByRole("mobileDevices-add-button")).toBeInTheDocument();
});
