import React from "react";
import { render, screen } from "@testing-library/react";

import RecentActivitiesCreateDialogComponent from "../RecentActivitiesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders recentActivities create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RecentActivitiesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("recentActivities-create-dialog-component")).toBeInTheDocument();
});
