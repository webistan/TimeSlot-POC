import React, { createContext, useEffect, useState } from "react";
import {
  addWeeklySlot,
  getDateData,
  getSlotList,
} from "../../redux/action/SlotAction";

import { FadeLoader } from "react-spinners";
import SlotCard from "../../components/SlotCard/SlotCard";
import { connect } from "react-redux";
import moment from "moment";

export const ListContext = createContext("");

const SlotList = (props) => {
  const {
    loading,
    error,
    slotList,
    getSlotList,
    start_date,
    end_date,
    getDateData,
    addWeeklySlot,
  } = props;
  const[dateError,setDateError]=useState(false)

  const[selectDay,setSelectDay] = useState("")

  let slots = slotList && slotList.slots;
  //***************************** UseEffect **********************************//
  useEffect(() => {
    const start_date = moment().format("YYYY-MM-DD");
    var end_date = moment().format("YYYY-MM-") + moment().daysInMonth();

    let data = {
      start_date: start_date,
      end_date: end_date,
    };
    getSlotList(data);
  }, [getSlotList]);

  //***************************** OnChangeHandle Function of Date Picker **********************************//
  const onChangeHandle = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "startDate") {
      if(value<=end_date){
      getDateData(value, end_date);
      setDateError(false)
      }else{
        setDateError(true)
      }
    }
    if (name === "endDate") {
      if(value>=start_date){
      getDateData(start_date, value);
      setDateError(false)
      }
      else{
        setDateError(true)
      }
    }
  };

  //***************************** Save Function Of TimeSlots **********************************//
  const saveSlots = () => {
    addWeeklySlot(slotList);
  };
  const onChangeSlectDay = (day) => {
    setSelectDay(day)
  }

  return (
    <>
   
      {loading ? (
        <div className="loader">
          <FadeLoader
            color="#ff4eb2"
            loading={loading}
            // cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : null}

<ListContext.Provider
              value={{ selectDay, onChangeSlectDay}}
            >
              <div className="container">
        <div className="wt-filter">
          <h2>Manage Schedule</h2>
          <div className="filter-block" data-testid="date-picker">
            <input
              type="date"
              id="startDate"
              className="filter"
              onChange={onChangeHandle}
              name="startDate"
              value={start_date}
              data-testid="startDate"
            />
            <input
              type="date"
              id="endDate"
              className="filter"
              onChange={onChangeHandle}
              name="endDate"
              value={end_date}
              data-testid="endDate"
            />
          </div>
        </div>
        {dateError?
        <h4 style={{color:'red'}}>please select end date greater than start date!</h4>:null}
        <div className="wt-timeslots-list">
          <h3>Timeslot</h3>

          
          {/* <SlotCard/> */}

          {slots &&
            slots !== undefined &&
            Object.entries(slots).map((value, idx) => (
              <SlotCard key={idx} keys={value} />
            ))}
        </div>
        
        <div style={{ textAlign: "right" }}>
          <p className="errorClass">{error}</p>
          <button className="button2 btn-lg" onClick={() => saveSlots()}>
            Save Schedule
          </button>
        </div>
      </div>
            </ListContext.Provider>
      
    </>
  );
};

//***************************** MapStateToProps Method **********************************//
const mapStateToProps = (state) => ({
  loading: state.slotReducer.loading,
  error: state.slotReducer.error,
  slotList: state.slotReducer.slotList,
  start_date: state.slotReducer.start_date,
  end_date: state.slotReducer.end_date,
});

//***************************** MapDispatchToProps Method **********************************//
const mapDispatchToProps = {
  getSlotList,
  getDateData,
  addWeeklySlot,
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotList);
