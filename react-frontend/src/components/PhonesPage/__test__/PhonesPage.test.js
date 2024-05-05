import React from "react";
import { render, screen } from "@testing-library/react";

import PhonesPage from "../PhonesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders phones page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PhonesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("phones-datatable")).toBeInTheDocument();
    expect(screen.getByRole("phones-add-button")).toBeInTheDocument();
});
