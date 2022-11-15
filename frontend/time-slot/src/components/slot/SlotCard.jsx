import React, { createContext, useState } from "react";

import AddSlotPopUp from "./AddSlotPopUp";
import { connect } from "react-redux";
import moment from "moment";

export const MyContext = createContext();

function SlotCard(props) {
  //const { slotsObj } = props
  const [open, setOpen] = useState(false);
  const [slotsObj, setSlotsObj] = useState({});

  // const [popUpOpen, setPopUpOpen] = useState(false);
  console.log("props", props.keys[1]);

  const val = props.keys[1].map((value, idx) => {
    console.log("value098", value.slot_time);
    return value;
  });
  console.log("val123", val);

  const viewModal = () => {
    let currentDayData = props.keys[1].filter((o) => o.allocated_day === props.keys[0])
    console.log('currentDayData aree:: ',currentDayData)
    let json = {}
    json[props.keys[0]] = currentDayData
    setSlotsObj((oldState) => ({
      ...json,
    }));
    setOpen(true);
  };

  const viewPopUp = (day) => {
    console.log('day are:: ',day)
    
    return (
      <>
        <MyContext.Provider value={{ addSlotsObject, day, open, onClose, slotsObj }}>
          <AddSlotPopUp />
        </MyContext.Provider>
      </>
    );
  };
  const closeViewPopUp = () => {
    setOpen(false);
  };

  const addSlotsObject = (data) => {
    setSlotsObj((oldState) => ({
      ...data,
    }));
  }

  const onClose = (data) => {
    console.log('dataa areee for popup close:: ',data)
    if( data && data.popUpClose && !data.addData){
      console.log('close popup data reset')
      setOpen(false);
    }

    if( data && data.popUpClose && data.addData){
      console.log('close popup data added')
      setOpen(false);
      setSlotsObj((oldState) => ({
        ...data.obj,
      }));
    }
  };

  return (
    <>
    
      <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left">
            <input type="checkbox" />
            {props.keys[0]}
          </div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button
              className="button2"
              onClick={(e) => {viewModal()}}
            >
              + Add Slot
            </button>
          </div>
        </div>
        <div className="wt-card-content">
          {props.keys &&
            props.keys[1] &&
            props.keys[1].length > 0 &&
            props.keys[1].map((value, idx) => (
              <div className="wt-block" key={idx}>
                <div className="input-group">
                  {/* <input type="time" className="w-130" defaultValue={moment(value.slot_time, 'hh:mm A').format('HH:mm:ss')}/> */}
                  <input
                    type="time"
                    className="w-130"
                    defaultValue={value.start_time}
                  />
                  <input
                    type="text"
                    className="w-90"
                    defaultValue={value.allocated_slot}
                  />
                  <span className="delete-btn">
                    <i className="fa-sharp fa-solid fa-trash" />
                  </span>
                </div>
              </div>
            ))}
        </div>
        {open === true ? viewPopUp(props.keys[0]) : null}

        {/* <div className="wt-card-content">
          <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130"/>
              <input type="text" className="w-90" defaultValue={10} />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}


const mapStateToProps = (state) => ({
  //slotsObj: state.slotReducer.slotsObj,
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotCard);
