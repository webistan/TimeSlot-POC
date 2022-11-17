// Importing the jest testing library
import '@testing-library/jest-dom'

import { cleanup, render, screen } from "@testing-library/react";

import { Provider } from 'react-redux';
import SlotList from "./list";
import {createStore} from "../../redux/store/store";
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})
  
describe("SlotList Component" , () => {
    const data = {start_date: '17-11-2022', end_date: '30-11-2022'}

    const { getByTestId } = render(
      <Provider store={createStore()}>
        <SlotList start_date="17-11-2022" end_date={data.end_date}/>
      </Provider>
    );
    const testValue = "17-11-2022";
    //const input = getByTestId("date-picker").getElementsByTagName("input")[0];
    const startDateInput = getByTestId('startDate');
    //const endDateInput = getByTestId('endDate');

    // const card = getByTestId("wt-card");
     //userEvent.type(startDateInput, data.start_date);

    //await userEvent.type(endDateInput, '1970-01-01');

    // expect(startDateInput).toHaveValue('1970-01-01');
    // expect(endDateInput).toHaveValue('1970-01-01');

    test('renders the slotcard component', () => {

        expect(startDateInput.value).toBe(testValue);
        //expect(startDateInput).toBeInTheDocument(); 
        //expect(endDateInput).toBeInTheDocument(); 


       // expect(startDateInput).toHaveValue("");
        //expect(endDateInput).toHaveValue("");
        //expect(startDateInput).not.toHaveValue();
        //expect(endDateInput).not.toHaveValue();


        //expect(startDateInput).toHaveValue("17-11-2022");
        //expect(endDateInput).toHaveValue();
        
        //expect(startDateInput).toHaveValue('17/11/2022');
        //expect(startDateInput).toHaveValue(data.start_date);
    });


})
