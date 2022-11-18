import React, { useContext, useState } from "react";

import { MyContext } from "../SlotCard/SlotCard";
import _ from "lodash";
import { addSlotInObject } from "../../redux/action/SlotAction";
import { connect } from "react-redux";
import moment from "moment";

//***************************** AddSlotPopUp Method **********************************//
const AddSlotPopUp = (props) => {
  //const { addSlotInObject } = props;
  const {
    addSlotsObj,
    day,
    open,
    onClose,
    slotsObj,
    slotList,
    slotCopyDay,
    copySolts,
    removeSlotsObj,
  } = useContext(MyContext);

  const [slotTime, setSlotTime] = useState("");
  const [slotNumber, setSlotNumber] = useState("");

  // console.log("slotList are::: ", slotsObj);
  // console.log('slotCopyDay are:: ',slotCopyDay)

  
  //***************************** Close PopUp Method **********************************//
  const onClosePopUp = () => {
    let json = {
      popUpClose: true,
      addData: false,
      selectedDay: day,
    };
    onClose(json);
  };

  //***************************** AddSlot Button Click Method **********************************//
  const addSlot = () => {
    let json = {
      popUpClose: true,
      addData: true,
      obj: slotsObj,
      selectedDay: day,
    };
    onClose(json);
  };

  const onChangeSlotTime = (e) => {
    let timetxt = `${e.target.value}:00`;
    setSlotTime(timetxt);
  };
  const onChangeSlotNumber = (e) => {
    setSlotNumber(e.target.value);
  };

  //***************************** Method Of Adding Slot In PoPUp  **********************************//
  const addSlotInCard = (e) => {
    if (!_.isEmpty(slotsObj)) {
      let arr = slotsObj[day];
      console.log("arr5", arr);
      arr.push({
        start_time: slotTime,
        allocated_slot: slotNumber,
        allocated_day: day,
      });
      let json = {
        [day]: arr,
      };
      // console.log("json2",json)
      addSlotsObj(json);
    } else {
      let arr = [];
      // console.log("arr5", arr);
      arr.push({
        start_time: slotTime,
        allocated_slot: slotNumber,
        allocated_day: day,
      });
      let json = {
        [day]: arr,
      };
      console.log("json2", json);
      addSlotsObj(json);
    }
    setSlotNumber("");
    setSlotTime("");
  };

  //***************************** Method Of Cancel Slots  In PoPUp  **********************************//
  const cancelTimeSlot = (item, idx) => {
    let json = {
      item: item,
      index: idx,
    };
    removeSlotsObj(json);
  };

  //***************************** Copy Schedule Method **********************************//
  const setCopyDay = (copyDay) => {
    copySolts(copyDay);
  };

  // console.log('slotsObj are:: ',slotsObj)

  return (
    <div className="modal" data-testid="slot-popup">
      <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left">Timeslot</div>
          <div className="card-head-right">
            <button className="close" onClick={onClosePopUp}>
              X
            </button>
          </div>
        </div>
        <div>
          <div className="input-group">
            <input
              type="time"
              className="w-130"
              defaultValue={slotTime}
              onChange={onChangeSlotTime}
            />
            <input
              type="text"
              className="w-90"
              defaultValue={slotNumber}
              onChange={onChangeSlotNumber}
            />
            <button
              className={"add-btn "}
              disabled={slotNumber === "" || slotTime === "" ? true : false}
              onClick={addSlotInCard}
            >
              <i
                className="fa-sharp fa-solid fa-plus"
                style={{ color: "#ff4eb2" }}
              />
            </button>
          </div>
          <div className="tag-outer">
            {slotsObj &&
              !_.isEmpty(slotsObj) &&
              slotsObj[day].map((item, idx) => {
                return (
                  <div className="tag" key={idx}>
                    {moment(item.start_time, "HH:mm:ss").format("hh:mm A")}/
                    <span>{item.allocated_slot}Slots</span>
                    <div
                      className="close-tag"
                      onClick={() => cancelTimeSlot(item, idx)}
                    >
                      X
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="bottom-block" >
            <h4>Copy Schedule</h4>
            <div className="days">
              {slotCopyDay &&
                slotCopyDay.map((item, idx) => {
                  return (
                    <>
                      <span className="copy-day" data-testid="copy-day" key={idx}>
                        <button
                          className={
                            "btn1 " + (item.isSelected ? "btnhover " : "")
                          }
                          onClick={(e) => setCopyDay(item.day)}
                        >
                          {item.showDay}
                        </button>
                      </span>
                    </>
                  );
                })}
            </div>
          </div>
          <button
            className={
              "modal-btn " + (!_.isEmpty(slotsObj) ? "button2" : "button-dis")
            }
            disabled={_.isEmpty(slotsObj) ? true : false}
            onClick={addSlot}
          >
            + Add Slot
          </button>
        </div>
      </div>
    </div>
  );
}
//***************************** MapStateToProps Method **********************************//
// const mapStateToProps = (state) => ({});

// //***************************** MapDispatchToProps Method **********************************//
// const mapDispatchToProps = {
//   //addSlotInObject,
// };

//export default connect(mapStateToProps, mapDispatchToProps)(AddSlotPopUp);

export default AddSlotPopUp