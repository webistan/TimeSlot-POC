import React, { useContext, useState } from 'react'

import { MyContext } from "./SlotCard"
import _ from 'lodash'
import { addSlotInObject } from '../../redux/action/SlotAction'
import { connect } from "react-redux";
import moment from "moment";

function AddSlotPopUp(props) {
    // console.log("pro123",props)
    const { addSlotInObject } = props
    const { addSlotsObj, day, open, onClose, slotsObj, slotList, slotCopyDay, copySolts } = useContext(MyContext);
    const [dayFlag, setDayFlag] = useState(true)
    const [slotTime, setSlotTime] = useState("")
    const [slotNumber, setSlotNumber] = useState("")

    console.log('slotList are::: ',slotList)
    console.log('slotCopyDay are:: ',slotCopyDay)
    
    const onClosePopUp = () => {
      let json = {
        popUpClose: true,
        addData: false,
        selectedDay: day
      }
      onClose(json)
    }

    const addSlot = () => {
      let json = {
        popUpClose: true,
        addData: true,
        obj: slotsObj,
        selectedDay: day
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

    const addSlotInCard = (e) => {
      console.log('slotsObj are:: ',slotsObj)
      // let arr = slotsObj[day]
      // arr.push({start_time: slotTime, allocated_slot:slotNumber, allocated_day: day})
      // let json = {
      //   [day]: arr
      // }
      // addSlotsObj(json)


      if(!_.isEmpty(slotsObj)){
        let arr = slotsObj[day]
        arr.push({start_time: slotTime, allocated_slot:slotNumber, allocated_day: day})
        let json = {
          [day]: arr
        }
        addSlotsObj(json)
      }else{
        let arr = []
        arr.push({start_time: slotTime, allocated_slot:slotNumber, allocated_day: day})
        let json = {
          [day]: arr
        }
        addSlotsObj(json)
      }
      
      
    }

    // const onHandleCopySlot = (data) => {
    //   console.log('copy day name are:: ',data)
    //   console.log('current day are:: ',day)

    //   let newJsonData = JSON.parse(JSON.stringify(slotList));
    //   console.log("newJsonData", newJsonData);


    //   //newJsonData["start_date"]= "20-09-2022"
    //   //newJsonData["end_date"]= "20-11-2022"

    //   let cloneCopyData = JSON.parse(JSON.stringify(slotList.slots[day]));
    //   if(cloneCopyData && cloneCopyData.length > 0){
    //     console.log('cloneCopyData are:; ',cloneCopyData)
    //     cloneCopyData.forEach((item) => {
    //       delete item['id']
    //       item['allocated_day'] = data
    //     })
    //     console.log('cloneCopyData after are:; ',cloneCopyData)
    //   }
    //   newJsonData["slots"][data]= cloneCopyData //slotList.slots[day]

    //   console.log("newJsonData after", newJsonData);
    //   // console.log("newJsonData123", newJsonData);
    //   addSlotInObject(newJsonData)

    // }

    const onHandleCopySlot = (copyDay) => {
      console.log('copy day name are:: ',copyDay)
      console.log('current day are:: ',day)
      console.log('slotsObj dataaaa::: ',slotsObj[day])

      //copySolts({copyDay:copyDay, currentDay:day })
  
      let newJsonData = JSON.parse(JSON.stringify(slotList));
      console.log("newJsonData", newJsonData);
  
  
     
  
      let cloneCopyData = JSON.parse(JSON.stringify(slotsObj[day]));
      if(cloneCopyData && cloneCopyData.length > 0){
        console.log('cloneCopyData are:; ',cloneCopyData)
        cloneCopyData.forEach((item) => {
          delete item['id']
          item['allocated_day'] = copyDay
        })
        console.log('cloneCopyData after are:; ',cloneCopyData)
      }
      newJsonData["slots"][copyDay]= cloneCopyData 
  
      console.log("newJsonData after", newJsonData);
      // console.log("newJsonData123", newJsonData);
      addSlotInObject(newJsonData)
  
    }

    const setCopyDay =  (copyDay) => {
      console.log('copyDay on click are:: ',copyDay)
      console.log('copyDay on click are slot copy:: ',slotCopyDay)
      copySolts(copyDay)
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
              <span className="add-btn" onClick={addSlotInCard}><i className="fa-sharp fa-solid fa-plus" style={{color: '#ff4eb2'}} /></span>
            </div>
            <div className="tag-outer">
              {
                      slotsObj && !_.isEmpty(slotsObj) && slotsObj[day].map((item,idx) => {
                        return (
                            
                               <div className="tag" key={idx}>
                                  {moment(item.start_time,'HH:mm:ss').format('hh:mm A')}/<span>{item.allocated_slot}Slots</span>
                                  <div className="close-tag">X</div>
                                </div>
                        )
                      })
              }
              
            </div>
            <div className="bottom-block">
              <h4>Copy Schedule</h4>
              <div className="days">
                {/* {
                  slotList && slotList.slots && Object.keys(slotList.slots).map((value,idx)=> {
                    //console.log('value are:: ',value)
                    if(slotList.slots[value].length > 0){
                      
                      return (
                        <button key={idx} className="btn1 btnhover" disabled>{value}</button>
                      )
                    }else{
                      return (
                        <button key={idx} className="btn1" onClick={(e) => onHandleCopySlot(value)}>{value}</button>
                      )
                    }
                  })
                } */}

                {
                  slotCopyDay && slotCopyDay.map((item,idx) => {
                    return(
                      <>
                        <span key={idx}>
                        <button  className={'btn1 ' + (item.isSelected ? "btnhover " : "")} onClick={(e) => setCopyDay(item.day)}>{item.showDay}</button>
                        </span>
                      </>
                    )
                  })
                }
                {/* <button className="btn1">S</button>
                <button className="btn1">M</button>
                <button className="btn1">T</button>
                <button className="btn1">W</button>
                <button className="btn1">Th</button>
                <button className="btn1">F</button>
                <button className="btn1">S</button> */}
              </div>
            </div>
            <button className={'modal-btn ' + (!_.isEmpty(slotsObj) ? 'button2' : 'button-dis')} disabled={_.isEmpty(slotsObj) ? true : false} onClick={addSlot}>+ Add Slot</button>
          </div>
        </div>
      </div>
  )
}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  addSlotInObject
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSlotPopUp);