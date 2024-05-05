import React from "react";
import { render, screen } from "@testing-library/react";

import ServiceMetaCreateDialogComponent from "../ServiceMetaCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders serviceMeta create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceMetaCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("serviceMeta-create-dialog-component")).toBeInTheDocument();
});
