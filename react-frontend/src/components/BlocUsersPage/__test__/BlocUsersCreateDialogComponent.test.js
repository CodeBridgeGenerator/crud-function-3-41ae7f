import React from "react";
import { render, screen } from "@testing-library/react";

import BlocUsersCreateDialogComponent from "../BlocUsersCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders blocUsers create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <BlocUsersCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("blocUsers-create-dialog-component")).toBeInTheDocument();
});
