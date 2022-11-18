// Importing the jest testing library
import "@testing-library/jest-dom";

import { cleanup, render } from "@testing-library/react";

import { Provider } from "react-redux";
import SlotList from "./List";
import { createStore } from "../../redux/store/store";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe("SlotList Component", () => {
  test("Should show empty inputs when no values are provided", () => {
    const { getByTestId } = render(
      <Provider store={createStore()}>
        <SlotList />
      </Provider>
    );
    const startDateInput = getByTestId("startDate");
    const endDateInput = getByTestId("endDate");

    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
  });

  test("Should show filled in inputs when values are provided", () => {
    const { getByTestId } = render(
      <Provider store={createStore()}>
        <SlotList />
      </Provider>
    );
    const startDateInput = getByTestId("startDate");
    const endDateInput = getByTestId("endDate");

    userEvent.type(startDateInput, "2022-11-18");
    userEvent.type(endDateInput, "2022-11-30");
    expect(startDateInput).toHaveValue("2022-11-18");
    expect(endDateInput).toHaveValue("2022-11-30");

    const SlotListDomTree = renderer
      .create(
        <Provider store={createStore()}>
          <SlotList />
        </Provider>
      )
      .toJSON();
    expect(SlotListDomTree).toMatchSnapshot();
  });
});
