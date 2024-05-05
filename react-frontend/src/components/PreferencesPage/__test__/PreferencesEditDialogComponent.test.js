import React from "react";
import { render, screen } from "@testing-library/react";

import PreferencesEditDialogComponent from "../PreferencesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders preferences edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PreferencesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("preferences-edit-dialog-component")).toBeInTheDocument();
});
