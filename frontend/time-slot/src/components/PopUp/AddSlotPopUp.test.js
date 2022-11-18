// Importing the jest testing library
import '@testing-library/jest-dom'

import { cleanup, render, screen } from "@testing-library/react";

import AddSlotPopUp from "./AddSlotPopUp";
import { Component } from 'react';
import { Provider } from 'react-redux';
import {createStore} from "../../redux/store/store";
import renderer from 'react-test-renderer';

// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})
  
describe("AddSlotPopUp Component" ,  () => {

    test('Should check Slot Card Pop Up be exist in Component', () => {
      const { getByTestId } = render(
        <Provider store={createStore()}>
          <AddSlotPopUp />
        </Provider>
      );
      const SlotPopUp = getByTestId("slot-popup");
      
      expect(SlotPopUp).toBeInTheDocument(); 
    });

    test('Should check Slot copy day div not exist in Component', () => {
      const slotCopyDay = [
        {
          day: "Sunday",
          showDay: "S",
          isSelected: false,
          copyDay: false,
        },
        {
          day: "Monday",
          showDay: "M",
          isSelected: false,
          copyDay: false,
        },
        {
          day: "Tuesday",
          showDay: "T",
          isSelected: false,
          copyDay: false,
        },
        {
          day: "Wednesday",
          showDay: "W",
          isSelected: false,
          copyDay: false,
        },
        {
          day: "Thursday",
          showDay: "Th",
          isSelected: false,
          copyDay: false,
        },
        {
          day: "Friday",
          showDay: "F",
          isSelected: false,
          copyDay: false,
        },
        {
          day: "Saturday",
          showDay: "Sat",
          isSelected: false,
          copyDay: false,
        },
      ]
      render(<AddSlotPopUp slotCopyDay={slotCopyDay}/>);
      const SlotPopUpDomTree = renderer.create(<AddSlotPopUp />).toJSON();

      expect(screen.queryByTestId('copy-day')).not.toBeInTheDocument();
      expect(SlotPopUpDomTree).toMatchSnapshot();
  });



})

