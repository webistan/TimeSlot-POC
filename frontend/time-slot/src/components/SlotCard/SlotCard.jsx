import React, { createContext, useContext, useState } from "react";
import { addSlotInObject, deleteSlotData } from "../../redux/action/SlotAction";
import AddSlotPopUp from "../PopUp/AddSlotPopUp";
import { ListContext } from "../../pages/slot/list";
import _ from "lodash";
import { connect } from "react-redux";

export const MyContext = createContext("");

// **** SlotCard Method **** 
function SlotCard(props) {
  const { slotList, addSlotInObject, deleteSlotData } = props;
  const [open, setOpen] = useState(false);
  const [slotsObj, setSlotsObj] = useState({});
  const [slotCopyDay, setSlotCopyDay] = useState([
    {
      day: "Sunday",
      showDay: "S",
      isSelected: false,
      copyDay: false,
    },
    {
      day: "Monday",
      showDay: "M",
      isSelected: false,
      copyDay: false,
    },
    {
      day: "Tuesday",
      showDay: "T",
      isSelected: false,
      copyDay: false,
    },
    {
      day: "Wednesday",
      showDay: "W",
      isSelected: false,
      copyDay: false,
    },
    {
      day: "Thursday",
      showDay: "Th",
      isSelected: false,
      copyDay: false,
    },
    {
      day: "Friday",
      showDay: "F",
      isSelected: false,
      copyDay: false,
    },
    {
      day: "Saturday",
      showDay: "Sat",
      isSelected: false,
      copyDay: false,
    },
  ]);


  const { selectDay, onChangeSlectDay } = useContext(ListContext);

  // ****  View Modal Function **** 
  const viewModal = async () => {
    console.log('open popup:: ', open)
    onChangeSlectDay(props.keys[0])

    let emptyObj = {};
    setSlotsObj((oldState) => ({
      ...emptyObj,
    }));

    let copyArr = JSON.parse(JSON.stringify(slotCopyDay));
    copyArr.forEach((item, idx) => {
      if (item.day === props.keys[0]) {
        item["isSelected"] = true;
      }
    });
    setSlotCopyDay(copyArr);

    setOpen(true);

  };

  // ****  PopUp Function ****
  const viewPopUp = (day) => {
    return (
      <>
        <MyContext.Provider
          value={{
            addSlotsObj,
            day,
            open,
            onClose,
            slotsObj,
            slotList,
            slotCopyDay,
            copySolts,
            removeSlotsObj,
          }}
        >
          <AddSlotPopUp />
        </MyContext.Provider>
      </>
    );
  };

  // ****  Add Slots in PopUp ****
  const addSlotsObj = (data) => {
    // console.log("addslotdata", data);
    setSlotsObj((oldState) => ({
      ...data,
    }));
  };

  // ****  Remove Slots in PopUp **** 
  const removeSlotsObj = (data) => {
    let idx = data.index;
    let day = data.item.allocated_day;
    let copySlotObj = JSON.parse(JSON.stringify(slotsObj));

    let json = {};
    copySlotObj &&
      Object.keys(copySlotObj).forEach(function (key) {
        copySlotObj[key].forEach((item, index) => {
          if (idx === index) {
            copySlotObj[key].splice(index, 1);
          }
          let jsonSlot = {
            [day]: copySlotObj[key] ? copySlotObj[key] : [],
          };
          Object.assign(json, jsonSlot);
        });
      });
    if (json[day] && json[day].length === 0) {
      let emptyObj = {};
      setSlotsObj((oldState) => ({
        ...emptyObj,
      }));
    } else {
      setSlotsObj((oldState) => ({
        ...json,
      }));
    }
  };

  // **** Copy Slots method **** 
  const copySlotDataInFinalObj = async (
    newJsonData,
    slotCopyDay,
    newSlotObj
  ) => {
    let allUpdatedData = JSON.parse(JSON.stringify(newJsonData));
    let selectCopyDay = _.filter(slotCopyDay, { copyDay: true });

    let obj = {};
    if (selectCopyDay && selectCopyDay.length > 0) {
      _.forEach(selectCopyDay, async function (item, idx) {
        let arr = [];
        _.forEach(newSlotObj[props.keys[0]], async function (value, index) {
          arr.push({
            start_time: value.start_time,
            allocated_slot: value.allocated_slot,
            allocated_day: item.day,
          });
          obj[item.day] = arr;
        });
      });

      if (!_.isEmpty(obj)) {
        Object.keys(obj).forEach((value) => {
          if (
            allUpdatedData["slots"][value] &&
            allUpdatedData["slots"][value].length > 0
          ) {
            let newArr = allUpdatedData["slots"][value];
            const merged = [...newArr, ...obj[value]];
            allUpdatedData["slots"][value] = merged;
          } else {
            allUpdatedData["slots"][value] = obj[value];
          }
        });
      }
    }

    return allUpdatedData;
  };

  // ****  Close PopUp **** 
  const onClose = async (data) => {
    console.log("dataa areee for popup close:: ", data);
    if (data && data.popUpClose && !data.addData) {
      setOpen(false);
      onChangeSlectDay("")

      let copyArr1 = JSON.parse(JSON.stringify(slotCopyDay));
      copyArr1.forEach((item, idx) => {
        item["isSelected"] = false;
        item['copyDay'] = false
      });
      console.log('copyArr1 are:: ', copyArr1)
      setSlotCopyDay(copyArr1);
    }

    if (data && data.popUpClose && data.addData) {
      setOpen(false);
      onChangeSlectDay("")
      setSlotsObj((oldState) => ({
        ...data.obj,
      }));

      const newSlotObj = JSON.parse(JSON.stringify(slotsObj));
      let newJsonData = JSON.parse(JSON.stringify(slotList));
      let addSlotArr = JSON.parse(JSON.stringify(newSlotObj[data.selectedDay]));
      let destinationSlotArr = JSON.parse(
        JSON.stringify(newJsonData["slots"][props.keys[0]])
      );

      // Merge arrays
      const merged = [...destinationSlotArr, ...addSlotArr];
      newJsonData.slots[props.keys[0]] = merged;
      let finalObj = await copySlotDataInFinalObj(
        newJsonData,
        slotCopyDay,
        newSlotObj
      );
      addSlotInObject(finalObj);
    }
  };
  const copySolts = (day) => {
    let copyArr = JSON.parse(JSON.stringify(slotCopyDay));
    copyArr.forEach((item, idx) => {
      if (item.day === day) {
        item["isSelected"] = true;
        item["copyDay"] = true;
      }
    });
    setSlotCopyDay(copyArr);
  };

  // ****  Function Of Delete Slots In SlotCard **** 
  const deleteSlot = (start_time, allocated_day) => {
    let start_date = slotList && slotList.start_date;
    let end_date = slotList && slotList.end_date;
    deleteSlotData(start_time, allocated_day, start_date, end_date);
  };



  return (
    <>
      <div className="wt-card" data-testid="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left">
            <input type="checkbox" />
            {props.keys && props.keys[0]}
          </div>
          <div className="card-head-right" >
            <button className="button1">Copy Schedule</button>
            <button
              disabled={selectDay === "" ? false : true}
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
                  {value && value.id ? (
                    <span
                      className="delete-btn"
                      onClick={() =>
                        deleteSlot(value.start_time, value.allocated_day)
                      }
                    >
                      <i className="fa-sharp fa-solid fa-trash" />
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
        </div>
        {open === true ? viewPopUp(props.keys[0]) : null}
      </div>
    </>
  );
}

// ****  MapStateToProps Method **** 
const mapStateToProps = (state) => ({
  slotList: state.slotReducer.slotList,
});

// ****  MapDispatchToProps Method **** 
const mapDispatchToProps = {
  addSlotInObject,
  deleteSlotData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotCard);
