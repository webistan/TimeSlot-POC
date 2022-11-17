// Importing the jest testing library
import '@testing-library/jest-dom'

import { cleanup, render, screen } from "@testing-library/react";

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

    test('renders the slotcard component', () => {
        expect(card).toBeInTheDocument(); 
      });

    // render(<SlotCard />); 
    // const card = screen.getByTestId("wt-card"); 
      
    // // Test 1
    // test("Card Rendering", () => {
    //     expect(card).toBeInTheDocument(); 
    // })
  
    // // Test 2 
    // test("Button Text", () => {
    //     expect(button).toHaveTextContent("Click Me!"); 
    // })

})

// test("should render card block", () => {
    
// })