import React, { createContext,useEffect } from "react";
import SlotCard from "../../components/slot/SlotCard";
import { connect } from "react-redux";
import { getSlotList,getDateData, addWeeklySlot } from "../../redux/action/SlotAction";
import { useState } from "react";
// export const MyContext = createContext();
import AddSlotPopUp from "../../components/slot/AddSlotPopUp";
const SlotList = (props) => {
  
  const {
    loading,
    error,
    slotList,
    getSlotList,
    startDate,
    endDate,
    getDateData,
    addWeeklySlot
  } = props;
  console.log("slotList",slotList)
  let slots=slotList.slots
  console.log("slots123",slots)

 
  const[startDatee,setStartDate]=useState('')
  const[endDatee,setEndDate]=useState('')

  useEffect(() => {
    let data={
      "start_date": "12-11-2022",
    "end_date": "25-12-2022",
    }
        getSlotList(data)
  }, [getSlotList,])
  
 const onChangeHandle=async(e)=>{
  const name = e.target.name;
  const value = e.target.value.split("-").reverse().join("-");
  console.log("va890",value) 
  if (name === "startDate") {
    setStartDate(value);
    getDateData(value,endDatee)
  }
  if (name === "endDate") {
    setEndDate(value);
    getDateData(startDatee,value)
  }
  
 }
  console.log("valu34",startDatee,endDatee) 
 

 const saveSlots=()=>{
// let data={

//   "start_date": "14-11-2022",

//   "end_date": "05-12-2022",

//   "slots": {

//       "Tuesday": [{

//           "slot_time": "02:30PM",

//           "slots": 10

//       }],

//        "Monday": [{

//           "slot_time": "09:30AM",

//           "slots": 10

//       }]

//   }

// }
addWeeklySlot(slotList)
 }
  

  return (
    <>  
    <div className="container">
    <div className="wt-filter">
      <h2>Manage Schedule</h2>
      <div className="filter-block">
        <input type="date" id="startDate" className="filter" onChange={onChangeHandle} name="startDate" value={startDatee}/>
        <input type="date" id="endDate" className="filter"  onChange={onChangeHandle} name="endDate" value={endDatee}/>
      </div>
    </div>
    <div className="wt-timeslots-list">
      <h3>Timeslot</h3>
      {/* <SlotCard/> */}

{slots&& slots!==undefined &&
 Object.entries(slots).map((key)=>(
   console.log("key",key),
  <SlotCard keys={key}/>
 
 )
 )
 
}

  
    </div>
    <div style={{textAlign: 'right'}}>
      <button className="button2 btn-lg" onClick={()=>saveSlots()}>Save Schedule</button>
    </div>
  </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.slotReducer.loading,
  error: state.slotReducer.error,
  slotList: state.slotReducer.slotList,
  startDate:state.slotReducer.startDate,
  endDate:state.slotReducer.endDate,
});

const mapDispatchToProps = {
   getSlotList,
   getDateData,
   addWeeklySlot
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotList);

  //  export default SlotList;
