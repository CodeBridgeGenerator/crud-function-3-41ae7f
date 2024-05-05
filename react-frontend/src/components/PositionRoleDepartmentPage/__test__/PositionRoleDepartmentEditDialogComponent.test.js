import React from "react";
import { render, screen } from "@testing-library/react";

import PositionRoleDepartmentEditDialogComponent from "../PositionRoleDepartmentEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders positionRoleDepartment edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PositionRoleDepartmentEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("positionRoleDepartment-edit-dialog-component")).toBeInTheDocument();
});
