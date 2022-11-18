// Importing the jest testing library
import "@testing-library/jest-dom";

import { cleanup, render } from "@testing-library/react";

import { Provider } from "react-redux";
import SlotCard from "./SlotCard";
import { createStore } from "../../redux/store/store";
import renderer from "react-test-renderer";

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe("SlotCard Component", () => {
  test("Should check card be exist in Component", () => {
    const { getByTestId } = render(
      <Provider store={createStore()}>
        <SlotCard />
      </Provider>
    );
    const card = getByTestId("wt-card");
    expect(card).toBeInTheDocument();

    const SlotCardDomTree = renderer
      .create(
        <Provider store={createStore()}>
          <SlotCard />
        </Provider>
      )
      .toJSON();
    expect(SlotCardDomTree).toMatchSnapshot();
  });
});
