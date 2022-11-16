import {
  DELETE_SLOT_ERROR,
  DELETE_SLOT_REQUEST,
  DELETE_SLOT_SUCCESS,
  GET_ALLSLOT_ERROR,
  GET_ALLSLOT_REQUEST,
  GET_ALLSLOT_SUCCESS,
  GET_DATEDATA_ERROR,
  GET_DATEDATA_REQUEST,
  GET_DATEDATA_SUCCESS,
  GET_SAVEWEEKLYSLOT_REQUEST,
  GET_SAVEWEEKLYSLOT_SUCCESS,
  SAVEWEEKLYSLOT_ERROR,
  SAVEWEEKLYSLOT_REQUEST,
  SAVEWEEKLYSLOT_SUCCESS,
} from "../constant/SlotConstant";
import { call, put, takeLatest } from "redux-saga/effects";

import _ from 'lodash'
import moment from "moment";

const apigeturl = process.env.REACT_APP_API_URL;
// const apigeturl = "http://demo.webuters.com:8100/api";

const getData = async (start_date, end_date) => {
  //console.log("startdate", start_date, end_date);
  const response = await fetch(
    `${apigeturl}/schedules?start_date=${start_date}&end_date=${end_date}`
  );
  const data = await response.json();
  //console.log("dataapi", data);
  return data;
};

function* getAllSlot(values) {
  //console.log("work123", values.data);
  try {
    const { data } = values;
    const { start_date, end_date } = data;

    // console.log("datefirst",start_date,end_date)

    // console.log("data1", start_date, end_date);
    let allSlotData = yield call(getData, start_date, end_date);
    //console.log("allslotData", allSlotData);
    allSlotData['start_date'] = start_date
    allSlotData['end_date'] = end_date
    
    yield put({ type: GET_ALLSLOT_SUCCESS, allSlotData });
  } catch (error) {
    const err = error.message;
    // console.log("errrrrrrrrr",err);
    yield put({ type: GET_ALLSLOT_ERROR, err });
  }
}

function* getDateDataList(values) {
  //console.log("values567", values);
  try {
    const { start_date, end_date } = values;
    //  const start_date= start_datee.split("-").reverse().join("-");
    //  const end_date= end_datee.split("-").reverse().join("-");
    //console.log("start_date23", start_date, end_date);
    if ((start_date && end_date === "") || undefined) {
      return;
    } else {
      let allSlotDateData = yield call(getData, start_date, end_date);
      allSlotDateData['start_date'] = start_date
      allSlotDateData['end_date'] = end_date
      //console.log("allSlotDateData", allSlotDateData);
      yield put({ type: GET_DATEDATA_SUCCESS, allSlotDateData });
    }

  } catch (error) {
    const err = error.message;
    // console.log("errrrrrrrrr",err);
    yield put({ type: GET_DATEDATA_ERROR, err });
  }
}
async function createFinalJson (newdata, start_date, end_date) {
  try{
    let slotData = _.flatten(newdata);
    let weekDays = _.uniq(_.map(slotData, "allocated_day"));
    // console.log("weekDays", weekDays);
    // console.log("slotData", slotData);
    let finalobj = {};
    weekDays?.filter((weekItem) => {
      let array1 = [];
      slotData?.filter((SlotItem) => {
        if (SlotItem.allocated_day === weekItem) {
          array1.push(SlotItem);
        }
      });
      finalobj[weekItem] = array1;
    });
    let obj = {
      slots: finalobj,
      start_date: start_date,
      end_date: end_date,
    };
// console.log("final Value", JSON.stringify(obj));
    return obj
  }catch(error){
    throw error
  }
}

const postData=async(finalObject)=>{
  console.log("postFinalObject",finalObject)
  try {
    const response = await fetch(`${apigeturl}/schedules`,{
      method:'POST',
      body: JSON.stringify(finalObject),
      headers: { 'Content-Type': 'application/json' },
    }
  );
  console.log("responePost", response);
  const data = await response.json();
  console.log("dataapi", data);
  return data;
  } catch (error) {
    throw error
  }
 
}


function* addWeeklySlots(values) {
  console.log("values5679", values);
  const { data } = values;
  let slot = data.slots;
  let { start_date, end_date } = data
  start_date =  start_date.split("-").reverse().join("-");
  end_date =  end_date.split("-").reverse().join("-");

  console.log('end_date areeEE:: , ',end_date)
  let datafiltered = Object.entries(slot).filter((o) => o !== "");
  console.log("datafiltered", datafiltered);

  const filterValue = datafiltered.filter(
    (value) => Object.keys(value[1]).length !== 0
  );
  let arr = [];
  filterValue.map((item) => {
    arr.push(item[1].filter((value) => !value.id));
  });
  console.log("arr456", arr);
  const newdata = arr.filter((val) => val.length !== 0);
  console.log("newdata", newdata);


  let finalObject = yield call(createFinalJson, newdata, start_date, end_date)
  console.log('finalObj are:: ',finalObject)   

  try {
    const saveData = yield call(postData,finalObject);
    yield put({ type: SAVEWEEKLYSLOT_SUCCESS,saveData });
    console.log("data saved successfully");
    let data = {
      start_date: start_date,
      end_date: end_date
    }
    //yield call(getAllSlot, data);
    yield put({ type: GET_ALLSLOT_REQUEST, data })
  } catch (error) {
    const err = error.message;
    console.log("errrrrrrrrr", err);
    yield put({ type: SAVEWEEKLYSLOT_ERROR, err });
  }
}

const deleteData = async (start_time, allocated_day) => {
  //console.log("startdate", start_time, allocated_day);
// const  start_timee=moment(start_time,'HH:mm:ss').format('hh:mm A')
  const response = await fetch(`${apigeturl}/schedules/destroy?start_time=${start_time}&allocated_day=${allocated_day}`,{
      method:'DELETE',
       
    }
  );
  //console.log("respone", response);
  const data = await response.json();
  //console.log("dataapi", data);
  // return data;
};

function* deleteTimeSlot(values) {
  //console.log("values567", values);
  try {
    const { start_time, allocated_day, start_date, end_date } = values;
    //console.log("deletesagavalue", start_time, allocated_day);
      yield call(deleteData, start_time, allocated_day);
      yield put({ type: DELETE_SLOT_SUCCESS, start_time,allocated_day });
      let data = {
        start_date: start_date,
        end_date: end_date
      }
      yield put({ type: GET_ALLSLOT_REQUEST, data })
      console.log("data deleted successfully")

  } catch (error) {
    const err = error.message;
    // console.log("errrrrrrrrr",err);
    yield put({ type: DELETE_SLOT_ERROR, err });
  }
}


export default () => {
  function* watcher() {
    yield takeLatest(GET_ALLSLOT_REQUEST, getAllSlot);
    yield takeLatest(GET_DATEDATA_REQUEST, getDateDataList);
    yield takeLatest(SAVEWEEKLYSLOT_REQUEST, addWeeklySlots);
    yield takeLatest(DELETE_SLOT_REQUEST,deleteTimeSlot)
  }
  return { watcher };
};
