import React from "react";
import { render, screen } from "@testing-library/react";

import ProfileStatusEditDialogComponent from "../ProfileStatusEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders profileStatus edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProfileStatusEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("profileStatus-edit-dialog-component")).toBeInTheDocument();
});
