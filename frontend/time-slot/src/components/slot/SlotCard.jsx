import React, { createContext, useState } from "react";
import { addSlotInObject, deleteSlotData } from "../../redux/action/SlotAction";

import AddSlotPopUp from "./AddSlotPopUp";
import { connect } from "react-redux";
import moment from "moment";

export const MyContext = createContext();

function SlotCard(props) {
  const { slotList, addSlotInObject ,deleteSlotData} = props;
  const [open, setOpen] = useState(false);
  const [slotsObj, setSlotsObj] = useState({});

  const timeSlotJson = {
    start_date: "",

    end_date: "",

    slots: {
      Tuesday: [
        {
          start_time: "02:30PM",

          allocated_slot: 10,
        },
      ],

      Monday: [
        {
          start_time: "09:30AM",

          allocated_slot: 10,
        },
      ],
    },
  };

  // const [popUpOpen, setPopUpOpen] = useState(false);
  console.log("props", props.keys[1]);

  const val = props.keys[1].map((value, idx) => {
    console.log("value098", value.slot_time);
    return value;
  });
  console.log("val123", val);

  const viewModal = () => {
    let currentDayData = props.keys[1].filter(
      (o) => o.allocated_day === props.keys[0]
    );
    console.log("currentDayData aree:: ", currentDayData);
    let json = {};
    json[props.keys[0]] = currentDayData;
    setSlotsObj((oldState) => ({
      ...json,
    }));
    setOpen(true);
  };

  const viewPopUp = (day) => {
    console.log("day are:: ", day);

    return (
      <>
        <MyContext.Provider
          value={{ addSlotsObj, day, open, onClose, slotsObj, slotList }}
        >
          <AddSlotPopUp />
        </MyContext.Provider>
      </>
    );
  };
  const closeViewPopUp = () => {
    setOpen(false);
  };

  const addSlotsObj = (data) => {
    setSlotsObj((oldState) => ({
      ...data,
    }));
  };

  const onClose = (data) => {
    console.log("dataa areee for popup close:: ", data);
    if (data && data.popUpClose && !data.addData) {
      console.log("close popup data reset");
      setOpen(false);
    }

    if (data && data.popUpClose && data.addData) {
      console.log("close popup data added");
      setOpen(false);
      setSlotsObj((oldState) => ({
        ...data.obj,
      }));

      console.log("slotsObj in card page:: ", slotsObj);
      const newSlotObj = JSON.parse(JSON.stringify(slotsObj));
      console.log("newSlotObject", newSlotObj);

      // let datafiltered = Object.entries(newSlotObj).filter((o) => o);
      // const filterValue = datafiltered[0].filter((value) => value);
      // const jsonData = filterValue[1].filter((value) => !value.id);
      // console.log("datvalue1", jsonData);

      let newJsonData = JSON.parse(JSON.stringify(slotList));
      console.log("newJsonData", newJsonData);

      newJsonData["start_date"] = "20-09-2022";
      newJsonData["end_date"] = "20-11-2022";
      newJsonData["slots"][props.keys[0]] = newSlotObj[props.keys[0]];
      console.log("newJsonData123", newJsonData);
      addSlotInObject(newJsonData);
    }
  };

  console.log("slotList are:: ", slotList);

  const deleteSlot=(start_time,allocated_day)=>{
    console.log("delete",start_time,allocated_day)
    deleteSlotData(start_time,allocated_day)

  }

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
              onClick={(e) => {
                viewModal();
              }}
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
                  <span
                    className="delete-btn"
                    onClick={() =>
                      deleteSlot(value.start_time, value.allocated_day)
                    }
                  >
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
  slotList: state.slotReducer.slotList,
});

const mapDispatchToProps = {
  addSlotInObject,
  deleteSlotData
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotCard);
