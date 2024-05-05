import React from "react";
import { render, screen } from "@testing-library/react";

import BlocUsersEditDialogComponent from "../BlocUsersEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders blocUsers edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <BlocUsersEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("blocUsers-edit-dialog-component")).toBeInTheDocument();
});
