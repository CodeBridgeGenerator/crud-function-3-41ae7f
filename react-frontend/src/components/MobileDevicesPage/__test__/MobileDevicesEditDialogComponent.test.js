import React from "react";
import { render, screen } from "@testing-library/react";

import MobileDevicesEditDialogComponent from "../MobileDevicesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders mobileDevices edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MobileDevicesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("mobileDevices-edit-dialog-component")).toBeInTheDocument();
});
