import React from 'react'
import moment from 'moment'
function SlotCard(props) {
  console.log("props",props.keys[1])
 
 const val= props.keys[1].map((value)=>{
    console.log("value098",value.slot_time)
    return value
  })
  console.log("val123",val)

  return (
    <>
     <div className="wt-card">
        <div className="wt-card-head">
          <div className="card-head-left"><input type="checkbox" />{props.keys[0]}</div>
          <div className="card-head-right">
            <button className="button1">Copy Schedule</button>
            <button className="button2">+ Add Slot</button>
          </div>
        </div>
        <div className="wt-card-content">
        {
          props.keys && props.keys[1] && props.keys[1].length>0 &&
          props.keys[1].map((value,idx)=>(
          
            <div className="wt-block" key={idx}>
              <div className="input-group">
                <input type="time" className="w-130" defaultValue={moment(value.slot_time, 'hh:mm A').format('HH:mm:ss')}/>
                <input type="text" className="w-90" defaultValue={value.slots} />
                <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
              </div>
           
          </div>
          ))
        }
         </div>
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
  )
}

export default SlotCard