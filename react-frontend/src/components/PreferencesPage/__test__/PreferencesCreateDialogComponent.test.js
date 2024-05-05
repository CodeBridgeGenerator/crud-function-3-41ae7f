import React from "react";
import { render, screen } from "@testing-library/react";

import PreferencesCreateDialogComponent from "../PreferencesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders preferences create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PreferencesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("preferences-create-dialog-component")).toBeInTheDocument();
});
