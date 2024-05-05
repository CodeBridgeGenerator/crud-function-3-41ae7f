import React from "react";
import { render, screen } from "@testing-library/react";

import PasswordHistoryEditDialogComponent from "../PasswordHistoryEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders passwordHistory edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PasswordHistoryEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("passwordHistory-edit-dialog-component")).toBeInTheDocument();
});
