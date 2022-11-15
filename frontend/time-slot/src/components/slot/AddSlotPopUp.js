import React from 'react'

function AddSlotPopUp({open,onClose}) {
    // console.log("pro123",props)
  return (
    <div className="modal">
        <div className="wt-card">
          <div className="wt-card-head">
            <div className="card-head-left">Timeslot</div>
            <div className="card-head-right">
              <button className="close" >X</button>
            </div>
          </div>
          <div>
            <div className="input-group">
              <input type="time" className="w-130" />
              <input type="text" className="w-90" />
              <span className="delete-btn"><i className="fa-sharp fa-solid fa-plus" style={{color: '#ff4eb2'}} /></span>
            </div>
            <div className="tag-outer">
              <div className="tag">
                09:30AM/<span>10Slots</span>
                <div className="close-tag">X</div>
              </div>
              <div className="tag">
                09:30AM/<span>10Slots</span>
                <div className="close-tag">X</div>
              </div>
              <div className="tag">
                09:30AM/<span>10Slots</span>
                <div className="close-tag">X</div>
              </div>
              <div className="tag">
                09:30AM/<span>10Slots</span>
                <div className="close-tag">X</div>
              </div>
            </div>
            <div className="bottom-block">
              <h4>Copy Schedule</h4>
              <div className="days">
                <button className="btn1">S</button>
                <button className="btn1 btnhover">M</button>
                <button className="btn1">T</button>
                <button className="btn1">W</button>
                <button className="btn1 btnhover">Th</button>
                <button className="btn1">F</button>
                <button className="btn1">S</button>
              </div>
            </div>
            <button className="button2 modal-btn">+ Add Slot</button>
          </div>
        </div>
      </div>
  )
}

export default AddSlotPopUp