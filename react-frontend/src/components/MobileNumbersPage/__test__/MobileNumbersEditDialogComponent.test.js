import React from "react";
import { render, screen } from "@testing-library/react";

import MobileNumbersEditDialogComponent from "../MobileNumbersEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders mobileNumbers edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MobileNumbersEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("mobileNumbers-edit-dialog-component")).toBeInTheDocument();
});
