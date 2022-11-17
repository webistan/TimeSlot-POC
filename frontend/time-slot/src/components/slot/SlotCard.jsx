import React, { createContext, useState } from "react";
import { addSlotInObject, deleteSlotData } from "../../redux/action/SlotAction";

import AddSlotPopUp from "./AddSlotPopUp";
import _ from 'lodash'
import { connect } from "react-redux";
import moment from "moment";

export const MyContext = createContext();

function SlotCard(props) {
  const { slotList, addSlotInObject ,deleteSlotData} = props;
  const [open, setOpen] = useState(false);
  const [slotsObj, setSlotsObj] = useState({});
  const [slotCopyDay, setSlotCopyDay] = useState([
    {
      'day': 'Sunday',
      'showDay': 'S',
      'isSelected': false,
      'copyDay': false
    },
    {
      'day': 'Monday',
      'showDay': 'M',
      'isSelected': false,
      'copyDay': false
    },
    {
      'day': 'Tuesday',
      'showDay': 'T',
      'isSelected': false,
      'copyDay': false
    },
    {
      'day': 'Wednesday',
      'showDay': 'W',
      'isSelected': false,
      'copyDay': false
    },
    {
      'day': 'Thursday',
      'showDay': 'Th',
      'isSelected': false,
      'copyDay': false
    },
    {
      'day': 'Friday',
      'showDay': 'F',
      'isSelected': false,
      'copyDay': false
    },
    {
      'day': 'Saturday',
      'showDay': 'Sat',
      'isSelected': false,
      'copyDay': false
    }
  ]);

  
  // const [popUpOpen, setPopUpOpen] = useState(false);
//  console.log("props", props.keys[1]);
//console.log("slotList", slotList);

  const val = props.keys[1].map((value, idx) => {
    //console.log("value098", value.slot_time);
    return value;
  });
  //console.log("val123", val);

  const viewModal = () => {
    // let currentDayData = props.keys[1].filter(
    //   (o) => o.allocated_day === props.keys[0]
    // );
    // //console.log("currentDayData aree:: ", currentDayData);
    // let json = {};
    // json[props.keys[0]] = currentDayData;
    // setSlotsObj((oldState) => ({
    //   ...json,
    // }));

    let emptyObj = {}
    setSlotsObj((oldState) => ({
      ...emptyObj,
    }));

    let copyArr = JSON.parse(JSON.stringify(slotCopyDay)); 
    console.log('ffffffff:::: ',copyArr)
    copyArr.forEach((item,idx) => {
      if(item.day === props.keys[0]){
        item['isSelected'] = true
      }
    })
    console.log('ffffffff afterrrrrr:::: ',copyArr)
    setSlotCopyDay(copyArr)
    // setSlotCopyDay((oldState) => ({
    //   ...copyArr,
    // }));

    setOpen(true);
  };

  //console.log('slotCopyDay are::: ', slotCopyDay)
  const viewPopUp = (day) => {
    //console.log("day are:: ", day);

    return (
      <>
        <MyContext.Provider
          value={{ addSlotsObj, day, open, onClose, slotsObj, slotList, slotCopyDay, copySolts }}
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
    console.log('add slot data are::: ',data)
    setSlotsObj((oldState) => ({
      ...data,
    }));
  };

  const copySlotDataInFinalObj = async (newJsonData, slotCopyDay, newSlotObj) => {
    let allUpdatedData = JSON.parse(JSON.stringify(newJsonData))
    let selectCopyDay = _.filter(slotCopyDay, { copyDay: true })
    console.log('selectCopyDay are::',selectCopyDay)

    let obj = {}
    if(selectCopyDay && selectCopyDay.length > 0){
        _.forEach(selectCopyDay, async function(item,idx) {
          let arr = []
          _.forEach(newSlotObj[props.keys[0]], async function(value, index){
            arr.push(
              {
                start_time: value.start_time,
                allocated_slot: value.allocated_slot,
                allocated_day: item.day
              }
            )
            obj[item.day] = arr
          })
            
        })

        if(!_.isEmpty(obj)){
          Object.keys(obj).map((value) => {
            if(allUpdatedData['slots'][value] && allUpdatedData['slots'][value].length > 0){
              let newArr = allUpdatedData['slots'][value]
              const merged =  [...newArr, ...obj[value]]
              allUpdatedData['slots'][value] = merged
            }else{
              allUpdatedData['slots'][value] = obj[value]
            }
          })
        }
    }

    return allUpdatedData

  }

  const onClose = async (data) => {
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

      //console.log("slotsObj in card page:: ", slotsObj);
      const newSlotObj = JSON.parse(JSON.stringify(slotsObj));
      //console.log("newSlotObject", JSON.stringify(newSlotObj));

      let newJsonData = JSON.parse(JSON.stringify(slotList));
      //console.log("newJsonData", JSON.stringify(newJsonData));


      let addSlotArr = JSON.parse(JSON.stringify(newSlotObj[data.selectedDay]))
      //console.log('addSlotArr are:::: ',JSON.stringify(addSlotArr))
      
      let destinationSlotArr = JSON.parse(JSON.stringify(newJsonData["slots"][props.keys[0]]))
      //console.log('destinationSlotArr are:::: ',destinationSlotArr)

      // Merge arrays
      const merged =  [...destinationSlotArr, ...addSlotArr]

      //console.log('merged are:: ',merged)

      newJsonData.slots[props.keys[0]] = merged
      //console.log('slotCopyDay data are::: ', JSON.stringify(slotCopyDay))

      //console.log('final newJsonData are:: ',JSON.stringify(newJsonData))

      let finalObj = await copySlotDataInFinalObj(newJsonData, slotCopyDay, newSlotObj) 
      console.log('finalObj areeeeeeee@@@@@@@:: ',finalObj)
      console.log('doneeee')
      addSlotInObject(finalObj);
    }
  };
  const copySolts = (day) => {
    console.log('copySolts data are::: ', day)
    let copyArr = JSON.parse(JSON.stringify(slotCopyDay)); 
    copyArr.forEach((item,idx) => {
      if(item.day === day){
        item['isSelected'] = true
        item['copyDay'] = true
      }
    })
    setSlotCopyDay(copyArr)
  } 

  //console.log("slotList are:: ", slotList);

  const deleteSlot=(start_time,allocated_day)=>{
    //console.log("delete",start_time,allocated_day)
    let start_date = slotList && slotList.start_date
    let end_date = slotList && slotList.end_date
    deleteSlotData(start_time,allocated_day, start_date, end_date)

  }
  //console.log('opena are:::',open)
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
            disabled={open === true ? true : false}
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
                  {value && value.id ?
                  <span
                    className="delete-btn"
                    onClick={() =>
                      deleteSlot(value.start_time, value.allocated_day)
                    }
                  >
                     <i className="fa-sharp fa-solid fa-trash" /> 
                  </span>
                  : null}
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
