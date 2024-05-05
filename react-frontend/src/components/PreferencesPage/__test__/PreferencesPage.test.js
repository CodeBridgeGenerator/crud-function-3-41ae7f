import React from "react";
import { render, screen } from "@testing-library/react";

import PreferencesPage from "../PreferencesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders preferences page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PreferencesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("preferences-datatable")).toBeInTheDocument();
    expect(screen.getByRole("preferences-add-button")).toBeInTheDocument();
});
