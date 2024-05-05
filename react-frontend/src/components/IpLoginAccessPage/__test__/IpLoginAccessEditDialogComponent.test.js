import React from "react";
import { render, screen } from "@testing-library/react";

import IpLoginAccessEditDialogComponent from "../IpLoginAccessEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders ipLoginAccess edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IpLoginAccessEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("ipLoginAccess-edit-dialog-component")).toBeInTheDocument();
});
