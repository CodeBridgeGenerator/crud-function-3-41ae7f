import React from "react";
import { render, screen } from "@testing-library/react";

import MobileNumbersCreateDialogComponent from "../MobileNumbersCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders mobileNumbers create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MobileNumbersCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("mobileNumbers-create-dialog-component")).toBeInTheDocument();
});
