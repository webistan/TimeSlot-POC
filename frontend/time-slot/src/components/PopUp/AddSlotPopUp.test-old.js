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


    const { getByTestId } = render(
      <Provider store={createStore()}>
        <AddSlotPopUp />
      </Provider>
    );
  

    const SlotPopUp = getByTestId("slot-popup");
    
    test('Should check Slot Card Pop Up be exist in Component', () => {
        expect(SlotPopUp).toBeInTheDocument(); 
      });


})

