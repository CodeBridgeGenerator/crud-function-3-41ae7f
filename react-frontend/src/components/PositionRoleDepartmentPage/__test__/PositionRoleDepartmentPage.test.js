import React from "react";
import { render, screen } from "@testing-library/react";

import PositionRoleDepartmentPage from "../PositionRoleDepartmentPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders positionRoleDepartment page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PositionRoleDepartmentPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("positionRoleDepartment-datatable")).toBeInTheDocument();
    expect(screen.getByRole("positionRoleDepartment-add-button")).toBeInTheDocument();
});
