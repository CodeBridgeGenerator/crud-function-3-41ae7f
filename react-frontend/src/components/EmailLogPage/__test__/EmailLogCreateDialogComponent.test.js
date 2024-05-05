import React from "react";
import { render, screen } from "@testing-library/react";

import EmailLogCreateDialogComponent from "../EmailLogCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders emailLog create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmailLogCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("emailLog-create-dialog-component")).toBeInTheDocument();
});
