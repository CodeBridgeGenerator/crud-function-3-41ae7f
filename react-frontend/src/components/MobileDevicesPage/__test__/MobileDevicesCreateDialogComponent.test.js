import React from "react";
import { render, screen } from "@testing-library/react";

import MobileDevicesCreateDialogComponent from "../MobileDevicesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders mobileDevices create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MobileDevicesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("mobileDevices-create-dialog-component")).toBeInTheDocument();
});
