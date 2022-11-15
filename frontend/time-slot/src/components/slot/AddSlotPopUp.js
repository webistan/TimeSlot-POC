import React, { useContext, useState } from 'react'

import { MyContext } from "./SlotCard"

function AddSlotPopUp(props) {
    // console.log("pro123",props)
    const { addSlotsObject, day, open, onClose, slotsObj } = useContext(MyContext);
    const [dayFlag, setDayFlag] = useState(true)
    const [slotTime, setSlotTime] = useState("")
    const [slotNumber, setSlotNumber] = useState("")

    const onClosePopUp = () => {
      let json = {
        popUpClose: true,
        addData: false
      }
      onClose(json)
    }

    const addSlot = () => {
      let json = {
        popUpClose: true,
        addData: true
      }
      onClose(json)
    }
    //let slotsObj = {}
    // if(day && day !== null && day !== "" && day !== undefined && dayFlag){
    //  // slotsObj[day] = []
    //   setDayFlag(false)
    // }

    const onChangeSlotTime = (e) => {
      console.log('onChangeSlotTime heree')
      console.log('onChangeSlotTime e:: ',e.target.value)
      let timetxt = `${e.target.value}:00`
      console.log('timetxt e:: ',timetxt)
      setSlotTime(timetxt)
    }
    const onChangeSlotNumber = (e) => {
      console.log('onChangeSlotNumber heree')
      console.log('onChangeSlotNumber e:: ',e.target.value)
      setSlotNumber(e.target.value)
    }

    const addSlotInObj = (e) => {
      console.log('slotsObj are:: ',slotsObj)
      let arr = slotsObj[day]
      arr.push({start_time: slotTime, allocated_slot:slotNumber, allocated_day: day})
      let json = {
        [day]: arr
      }
      addSlotsObject(json)
      
    }

    console.log('slotsObj are:: ',slotsObj)
    
  return (
    <div className="modal">
        <div className="wt-card">
          <div className="wt-card-head">
            <div className="card-head-left">Timeslot</div>
            <div className="card-head-right">
              <button className="close" onClick={onClosePopUp}>X</button>
            </div>
          </div>
          <div>
            <div className="input-group">
              <input type="time" className="w-130" onChange={onChangeSlotTime}/>
              <input type="text" className="w-90" onChange={onChangeSlotNumber}/>
              <span className="add-btn" onClick={addSlotInObj}><i className="fa-sharp fa-solid fa-plus" style={{color: '#ff4eb2'}} /></span>
            </div>
            <div className="tag-outer">
            {/* {
            slotsObj && slotsObj !==undefined &&
              Object.entries(slotsObj).map((value,idx)=>(
                console.log("value@@@@@",value),
                if(value[1] && value[1].length > 0){

                }
                
                <div className="tag" key={idx}>
                  09:30AM/<span>10Slots</span>
                  <div className="close-tag">X</div>
                </div>
                )
              )
              
              } */}
              {
                      // for (let x in person) {
                      //   console.log(x + ": "+ person[x])
                      // } 

                      // Object.keys(slotsObj).map((value)=> {
                      //   console.log("value@@@@@",value)
                      //   if(slotsObj[day].length > 0){
                      //     console.log('haiii')
                      //     slotsObj[day].map((item,idx) => {
                      //       console.log('itemm', item)
                      //       return (
                                
                      //              <div className="tag" key={idx}>
                      //                 09:30AM/<span>10Slots</span>
                      //                 <div className="close-tag">X</div>
                      //               </div>
                      //       )
                      //     })
                      //   }
                      // })
                      slotsObj[day].map((item,idx) => {
                        console.log('itemm', item)
                        return (
                            
                               <div className="tag" key={idx}>
                                  09:30AM/<span>10Slots</span>
                                  <div className="close-tag">X</div>
                                </div>
                        )
                      })
              }
              
              {/* <div className="tag">
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
              </div> */}
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
            <button className="button2 modal-btn" onClick={addSlot}>+ Add Slot</button>
          </div>
        </div>
      </div>
  )
}

export default AddSlotPopUp