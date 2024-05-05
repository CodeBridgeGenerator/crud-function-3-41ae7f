import React from "react";
import { render, screen } from "@testing-library/react";

import RecentActivitiesPage from "../RecentActivitiesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders recentActivities page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RecentActivitiesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("recentActivities-datatable")).toBeInTheDocument();
    expect(screen.getByRole("recentActivities-add-button")).toBeInTheDocument();
});
