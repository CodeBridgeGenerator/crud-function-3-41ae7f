import React from "react";
import { render, screen } from "@testing-library/react";

import ServiceMetaEditDialogComponent from "../ServiceMetaEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders serviceMeta edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceMetaEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("serviceMeta-edit-dialog-component")).toBeInTheDocument();
});
