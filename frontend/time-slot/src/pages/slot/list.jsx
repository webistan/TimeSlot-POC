import React, { useEffect } from "react";
import {
  addWeeklySlot,
  getDateData,
  getSlotList,
} from "../../redux/action/SlotAction";

import { FadeLoader } from "react-spinners";
import SlotCard from "../../components/SlotCard/SlotCard";
import { connect } from "react-redux";
import moment from "moment";

const SlotList = (props) => {
  const {
    loading,
    error,
    slotList,
    getSlotList,
    start_date,
    end_date,
    getDateData,
    addWeeklySlot
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
    
    { 
      loading ?
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
      : null
    }
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
        <div className="wt-timeslots-list">
          <h3>Timeslot</h3>

          <p>{error}</p>
          {/* <SlotCard/> */}

          {slots &&
            slots !== undefined &&
            Object.entries(slots).map((value,idx) => ( (<SlotCard key={idx} keys={value} />))
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

