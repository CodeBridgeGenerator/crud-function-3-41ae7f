import React from "react";
import { render, screen } from "@testing-library/react";

import FieldMetaPage from "../FieldMetaPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders fieldMeta page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FieldMetaPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("fieldMeta-datatable")).toBeInTheDocument();
    expect(screen.getByRole("fieldMeta-add-button")).toBeInTheDocument();
});
