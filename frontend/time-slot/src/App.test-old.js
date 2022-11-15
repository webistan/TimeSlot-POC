import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import App from './App';
import React from 'react';
import renderer from 'react-test-renderer';

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); 
})

// test('renders learn react link', () => {
//   render(<App />);
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();

 
  
//   //expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
//   // expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
//   // expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
//   // expect(screen.getByRole("img")).toBeInTheDocument();

// });

// describe('App', () => {
//   it('Should render properly', () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

describe("App Component" ,() => {
  // Test 1
  test("App Rendering", () => {
    render(<App/>); // Rendering the App
    // const text = screen.getByTestId("text"); 
    // const button = screen.getByTestId("button");
    // expect(button).toBeInTheDocument();
    // expect(text).toBeInTheDocument();
})
})