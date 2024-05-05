import React from "react";
import { render, screen } from "@testing-library/react";

import FieldMetaCreateDialogComponent from "../FieldMetaCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders fieldMeta create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FieldMetaCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("fieldMeta-create-dialog-component")).toBeInTheDocument();
});
