import React from "react";
import { render, screen } from "@testing-library/react";

import InvitationsPage from "../InvitationsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders invitations page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InvitationsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("invitations-datatable")).toBeInTheDocument();
    expect(screen.getByRole("invitations-add-button")).toBeInTheDocument();
});
