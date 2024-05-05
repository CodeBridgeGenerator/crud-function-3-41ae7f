import React from "react";
import { render, screen } from "@testing-library/react";

import ServiceMetaPage from "../ServiceMetaPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders serviceMeta page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceMetaPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("serviceMeta-datatable")).toBeInTheDocument();
    expect(screen.getByRole("serviceMeta-add-button")).toBeInTheDocument();
});
