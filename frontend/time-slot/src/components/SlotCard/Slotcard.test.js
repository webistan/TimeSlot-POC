// Importing the jest testing library
import '@testing-library/jest-dom'

import { cleanup, render, screen } from "@testing-library/react";

import Slotcard from "./Slotcard";

// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})
  
describe("Card Component" ,() => {

    render(<Slotcard />); 
    const cardElement = screen.getByTestId("Slot-Card-1"); 
      
   

    // Test 1
    test("Slot Card Block ", () => {
        expect(cardElement).toBeInTheDocument(); 
    })

    
})

// Test 2
test("Slot Card Block slot text box ", () => {
    const slots = { slot_time: "10"}
    render(<Slotcard slots={slots}/>);  
    const slotElement = screen.getByTestId("slot-box"); 
    expect(slotElement).toBeInTheDocument(); 
    expect(slotElement).toHaveTextContent("10")
})

// test("should render card block", () => {
    
// })