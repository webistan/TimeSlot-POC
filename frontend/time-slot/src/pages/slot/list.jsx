import React, { createContext,useEffect } from "react";
import SlotCard from "../../components/slot/SlotCard";
import { connect } from "react-redux";
import { getSlotList,getDateData } from "../../redux/action/SlotAction";
import { useState } from "react";
// export const MyContext = createContext();
const SlotList = (props) => {
  
  const {
    loading,
    error,
    slotList,
    getSlotList,
    startDate,
    endDate,
    getDateData
  } = props;
  console.log("slotList",slotList)
  const[startDatee,setStartDate]=useState('')
  const[endDatee,setEndDate]=useState('')

  useEffect(() => {
        getSlotList()
  }, [getSlotList,])
  
 const onChangeHandle=async(e)=>{
  const name = e.target.name;
  const value = e.target.value;
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

{slotList&&
 Object.entries(slotList).map((key)=>(
   console.log("key",key),
  <SlotCard keys={key}/>
 )
 )
 
}
  

      {/* <SlotCard/> */}
      {/* card:start */}
      {/* <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Monday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div> */}
        {/* <div className="wt-card-content">
          {/* slot:start*/}
          {/* <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div>  */}
          {/* slot:end*/}
          {/* slot:start*/}
          {/* <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div> */}
          {/* slot:end*/}
        {/* </div>
      </div> */}
      {/* card:end*/}
      {/* card:start */}
      {/* <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Tuesday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
        <div className="wt-card-content"> */}
          {/* slot:start*/}
          {/* <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div> */}
          {/* slot:end*/}
          {/* slot:start*/}
          {/* <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div> */}
          {/* slot:end*/}
        {/* </div>
      </div> */}
      {/* card:end*/}
      {/* card:start */}
      {/* <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Wednesday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
        <div className="wt-card-content"> */}
          {/* slot:start*/}
          {/* <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div> */}
          {/* slot:end*/}
          {/* slot:start*/}
          {/* <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div> */}
          {/* slot:end*/}
        {/* </div>
      </div> */}
      {/* card:end*/}
      {/* card:start */}
      {/* <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Thursday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
        <div className="wt-card-content"> */}
          {/* slot:start*/}
          {/* <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div> */}
          {/* slot:end*/}
          {/* slot:start*/}
          {/* <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div> */}
          {/* slot:end*/}
        {/* </div>
      </div> */}
      {/* card:end*/}
      {/* card:start */}
      {/* <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Friday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
        <div className="wt-card-content"> */}
          {/* slot:start*/}
          {/* <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div> */}
          {/* slot:end*/}
          {/* slot:start*/}
          {/* <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div> */}
          {/* slot:end*/}
        {/* </div>
      </div> */}
      {/* card:end*/}
      {/* card:start */}
      {/* <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Saturday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
      </div> */}
      {/* card:end*/}
      {/* card:start */}
      {/* <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Sunday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
      </div> */}
      {/* card:end*/}
    </div>
    <div style={{textAlign: 'right'}}>
      <button className="button2 btn-lg">Save Schedule</button>
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
   getDateData
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotList);

  //  export default SlotList;
