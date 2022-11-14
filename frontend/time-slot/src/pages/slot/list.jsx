import React, { createContext } from "react";

export const MyContext = createContext();

const SlotList = (props) => {
  
  return (
    <>  
    <div className="container">
    <div className="wt-filter">
      <h2>Manage Schedule</h2>
      <div className="filter-block">
        <input type="date" id="startDate" className="filter" />
        <input type="date" id="endDate" className="filter" />
      </div>
    </div>
    <div className="wt-timeslots-list">
      <h3>Timeslot</h3>
      {/* card:start */}
      <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Monday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
        <div className="wt-card-content">
          {/* slot:start*/}
          <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div>
          {/* slot:end*/}
          {/* slot:start*/}
          <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div>
          {/* slot:end*/}
        </div>
      </div>
      {/* card:end*/}
      {/* card:start */}
      <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Tuesday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
        <div className="wt-card-content">
          {/* slot:start*/}
          <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div>
          {/* slot:end*/}
          {/* slot:start*/}
          <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div>
          {/* slot:end*/}
        </div>
      </div>
      {/* card:end*/}
      {/* card:start */}
      <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Wednesday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
        <div className="wt-card-content">
          {/* slot:start*/}
          <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div>
          {/* slot:end*/}
          {/* slot:start*/}
          <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div>
          {/* slot:end*/}
        </div>
      </div>
      {/* card:end*/}
      {/* card:start */}
      <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Thursday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
        <div className="wt-card-content">
          {/* slot:start*/}
          <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div>
          {/* slot:end*/}
          {/* slot:start*/}
          <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div>
          {/* slot:end*/}
        </div>
      </div>
      {/* card:end*/}
      {/* card:start */}
      <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Friday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
        <div className="wt-card-content">
          {/* slot:start*/}
          <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div>
          {/* slot:end*/}
          {/* slot:start*/}
          <div className="wt-block">
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
            </div>
          </div>
          {/* slot:end*/}
        </div>
      </div>
      {/* card:end*/}
      {/* card:start */}
      <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Saturday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
      </div>
      {/* card:end*/}
      {/* card:start */}
      <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" /> Sunday</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
      </div>
      {/* card:end*/}
    </div>
    <div style={{textAlign: 'right'}}>
      <button className="button2 btn-lg">Save Schedule</button>
    </div>
  </div>
    </>
  );
};



export default SlotList;
