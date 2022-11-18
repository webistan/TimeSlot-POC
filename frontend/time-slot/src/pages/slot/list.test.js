// Importing the jest testing library
import '@testing-library/jest-dom'

import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { Provider } from 'react-redux';
import SlotList from "./List";
import {createStore} from "../../redux/store/store";
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})
  
describe("SlotList Component" , () => {
    const data = {start_date: '2022-11-18', end_date: '2022-11-30'}

    test("Should show empty inputs when no values are provided", () => {
      const { getByTestId } = render(
        <Provider store={createStore()}>
          <SlotList />
        </Provider>
      );
      const startDateInput = getByTestId('startDate');
      const endDateInput = getByTestId('endDate');
  
      expect(startDateInput).toBeInTheDocument(); 
      expect(endDateInput).toBeInTheDocument(); 
    });

    test('Should show filled in inputs when values are provided', () => {

      const { getByTestId } = render(
        <Provider store={createStore()}>
          <SlotList />
        </Provider>
      );
      const startDateInput = getByTestId('startDate');
      const endDateInput = getByTestId('endDate');
      
      userEvent.type(startDateInput, '2022-11-18');
      userEvent.type(endDateInput, '2022-11-30');
      expect(startDateInput).toHaveValue('2022-11-18');
      expect(endDateInput).toHaveValue('2022-11-30');

      const SlotListDomTree = renderer.create(<Provider store={createStore()}>
        <SlotList />
      </Provider>).toJSON();
      expect(SlotListDomTree).toMatchSnapshot();

    });


    // test("Should not allow end date input lower than start date", () => {

    //   const { getByTestId } = render(
    //     <Provider store={createStore()}>
    //       <SlotList />
    //     </Provider>
    //   );
    //   const startDateInput = getByTestId('startDate');
    //   const endDateInput = getByTestId('endDate');
      
    //   userEvent.type(startDateInput, '2022-11-18');
    //   userEvent.type(endDateInput, '2022-11-11');
    //   expect(startDateInput).toHaveValue('2022-11-18');
    //   expect(endDateInput).toHaveValue('2022-11-11');
    //   expect(endDateInput).toBeInvalid();
    // });
  


})
