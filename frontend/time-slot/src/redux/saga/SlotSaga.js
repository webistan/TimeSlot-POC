import { call, put, takeLatest } from "redux-saga/effects";
import moment from "moment";
import {
  GET_ALLSLOT_ERROR,
  GET_ALLSLOT_REQUEST,
  GET_ALLSLOT_SUCCESS,
  GET_DATEDATA_REQUEST,
  GET_DATEDATA_ERROR,
  GET_DATEDATA_SUCCESS,
  GET_SAVEWEEKLYSLOT_REQUEST,
  GET_SAVEWEEKLYSLOT_SUCCESS,
  SAVEWEEKLYSLOT_REQUEST,
  SAVEWEEKLYSLOT_SUCCESS,
  SAVEWEEKLYSLOT_ERROR,
  DELETE_SLOT_REQUEST,
  DELETE_SLOT_SUCCESS,
  DELETE_SLOT_ERROR,
} from "../constant/SlotConstant";
const apigeturl = process.env.REACT_APP_API_URL;
// const apigeturl = "http://demo.webuters.com:8100/api";

const getData = async (start_date, end_date) => {
  console.log("startdate", start_date, end_date);
  const response = await fetch(
    `${apigeturl}/schedules?start_date=${start_date}&end_date=${end_date}`
  );
  const data = await response.json();
  console.log("dataapi", data);
  return data;
};

function* getAllSlot(values) {
  console.log("work123", values.data);
  try {
    const { data } = values;
    const { start_date, end_date } = data;
    console.log("data1", start_date, end_date);
    const allSlotData = yield call(getData, start_date, end_date);
    console.log("allslotData", allSlotData);
    // let allSlotData = {
    //   status: 200,

    //   slots: {
    //     Tuesday: [
    //       {
    //         id: 17,

    //         allocated_day: "Tuesday",

    //         start_time: "09:11:00",

    //         allocated_slot: 10,
    //       },
    //     ],

    //     Saturday: [
    //       {
    //         id: 24,

    //         allocated_day: "Saturday",

    //         start_time: "09:11:00",

    //         allocated_slot: 10,
    //       },

    //       {
    //         id: 30,

    //         allocated_day: "Saturday",

    //         start_time: "10:11:00",

    //         allocated_slot: 10,
    //       },

    //       {
    //         id: 36,

    //         allocated_day: "Saturday",

    //         start_time: "10:30:00",

    //         allocated_slot: 10,
    //       },
    //     ],
    //     Monday: [
    //       {
    //         id: 18,

    //         allocated_day: "Monday",

    //         start_time: "09:11:00",

    //         allocated_slot: 15,
    //       },
    //     ],
    //     Wednesday: [
    //       {
    //         id: 18,

    //         allocated_day: "Wednesday",

    //         start_time: "09:11:00",

    //         allocated_slot: 15,
    //       },
    //     ],
    //     Friday: [],
    //     Sunday: [],
    //   },
    // };
    yield put({ type: GET_ALLSLOT_SUCCESS, allSlotData });
  } catch (error) {
    const err = error.message;
    // console.log("errrrrrrrrr",err);
    yield put({ type: GET_ALLSLOT_ERROR, err });
  }
}

function* getDateDataList(values) {
  console.log("values567", values);
  try {
    const { start_date, end_date } = values;
    //  const start_date= start_datee.split("-").reverse().join("-");
    //  const end_date= end_datee.split("-").reverse().join("-");
    console.log("start_date23", start_date, end_date);
    if ((start_date && end_date === "") || undefined) {
      return;
    } else {
      const allSlotDateData = yield call(getData, start_date, end_date);
      console.log("allSlotDateData", allSlotDateData);
      yield put({ type: GET_DATEDATA_SUCCESS, allSlotDateData });
    }

  } catch (error) {
    const err = error.message;
    // console.log("errrrrrrrrr",err);
    yield put({ type: GET_DATEDATA_ERROR, err });
  }
}

function* addWeeklySlots(values) {
  console.log("values5679", values);
  const { data } = values;
  let slot = data.slots;

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


let obj={}
 
 newdata.map((value)=>{
  console.log("datkey",value)
  value.map((val)=>{
    console.log("val67",val.allocated_day)
          obj={
    "start_date": data.start_date,

    "end_date": data.end_date,
    "slots": {

      [val.allocated_day]: val,
  }

  }

  })

 })
  //console.log("datkey",dayKey)

  
   console.log("obj567",obj)

  try {
    yield put({ type: SAVEWEEKLYSLOT_SUCCESS });
    console.log("data saved successfully");
    // yield call(getDateDataList, data);
  } catch (error) {
    const err = error.message;
    console.log("errrrrrrrrr", err);
    yield put({ type: SAVEWEEKLYSLOT_ERROR, err });
  }
}

const deleteData = async (start_time, allocated_day) => {
  console.log("startdate", start_time, allocated_day);
// const  start_timee=moment(start_time,'HH:mm:ss').format('hh:mm A')
  const response = await fetch(`http://demo.webuters.com:8100/api/schedules/destroy?start_time=${start_time}&allocated_day=${allocated_day}`,{
      method:'DELETE',
       
    }
  );
  console.log("respone", response);
  const data = await response.json();
  console.log("dataapi", data);
  // return data;
};

function* deleteTimeSlot(values) {
  console.log("values567", values);
  try {
    const { start_time, allocated_day } = values;
    console.log("deletesagavalue", start_time, allocated_day);
    const SlotDeleteData = yield call(deleteData, start_time, allocated_day);
      yield put({ type: DELETE_SLOT_SUCCESS, start_time,allocated_day });
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
