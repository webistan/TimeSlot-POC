import React, { createContext, useEffect, useState } from "react";
import SlotCard from "../../components/slot/SlotCard";
import { connect } from "react-redux";
import {
  getSlotList,
  getDateData,
  addWeeklySlot,
} from "../../redux/action/SlotAction";
// export const MyContext = createContext();
import moment from "moment";
import AddSlotPopUp from "../../components/slot/AddSlotPopUp";
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

  let slots = slotList && slotList.slots;

  useEffect(() => {
    const start_date = moment().format("YYYY-MM-DD");
    var end_date = moment().format("YYYY-MM-") + moment().daysInMonth();

    let data = {
      start_date: start_date,
      end_date: end_date,
    };
    getSlotList(data);
  }, [getSlotList]);

  const onChangeHandle = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "startDate") {
      getDateData(value, end_date);
    }
    if (name === "endDate") {
      getDateData(start_date, value);
    }
  };

  const saveSlots = () => {
    addWeeklySlot(slotList);
  };

  return (
    <>
      <div className="container">
        <div className="wt-filter">
          <h2>Manage Schedule</h2>
          <div className="filter-block">
            <input
              type="date"
              id="startDate"
              className="filter"
              onChange={onChangeHandle}
              name="startDate"
              value={start_date}
            />
            <input
              type="date"
              id="endDate"
              className="filter"
              onChange={onChangeHandle}
              name="endDate"
              value={end_date}
            />
          </div>
        </div>
        <div className="wt-timeslots-list">
          <h3>Timeslot</h3>
          {/* <SlotCard/> */}

          {slots &&
            slots !== undefined &&
            Object.entries(slots).map(
              (key) => ( (<SlotCard keys={key} />))
            )}
        </div>
        <div style={{ textAlign: "right" }}>
          <button className="button2 btn-lg" onClick={() => saveSlots()}>
            Save Schedule
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.slotReducer.loading,
  error: state.slotReducer.error,
  slotList: state.slotReducer.slotList,
  start_date: state.slotReducer.start_date,
  end_date: state.slotReducer.end_date,
});

const mapDispatchToProps = {
  getSlotList,
  getDateData,
  addWeeklySlot,
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotList);

//  export default SlotList;
