import React from "react";
import { render, screen } from "@testing-library/react";

import ProfileStatusPage from "../ProfileStatusPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders profileStatus page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProfileStatusPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("profileStatus-datatable")).toBeInTheDocument();
    expect(screen.getByRole("profileStatus-add-button")).toBeInTheDocument();
});
