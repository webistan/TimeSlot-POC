// Importing the jest testing library
import '@testing-library/jest-dom'

import { cleanup, render, screen } from "@testing-library/react";

import { Component } from 'react';
import { Provider } from 'react-redux';
import SlotCard from "./SlotCard";
import {createStore} from "../../redux/store/store";
import renderer from 'react-test-renderer';

// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})
  
describe("SlotCard Component" ,  () => {


    const { getByTestId } = render(
      <Provider store={createStore()}>
        <SlotCard />
      </Provider>
    );
  

    const card = getByTestId("wt-card");
    
    test('Should check card be exist in Component', () => {
        expect(card).toBeInTheDocument(); 
      });


})

