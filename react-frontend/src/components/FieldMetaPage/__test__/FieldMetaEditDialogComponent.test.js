import React from "react";
import { render, screen } from "@testing-library/react";

import FieldMetaEditDialogComponent from "../FieldMetaEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders fieldMeta edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FieldMetaEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("fieldMeta-edit-dialog-component")).toBeInTheDocument();
});
