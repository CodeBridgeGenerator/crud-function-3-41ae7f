import React from "react";
import { render, screen } from "@testing-library/react";

import InvitationsEditDialogComponent from "../InvitationsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders invitations edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InvitationsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("invitations-edit-dialog-component")).toBeInTheDocument();
});
