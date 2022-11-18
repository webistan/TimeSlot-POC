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
  SAVEWEEKLYSLOT_ERROR,
  SAVEWEEKLYSLOT_REQUEST,
  SAVEWEEKLYSLOT_SUCCESS,
} from "../constant/SlotConstant";
import { call, put, takeLatest } from "redux-saga/effects";

import _ from "lodash";

// ****  API URL ****
const apigeturl = process.env.REACT_APP_API_URL;

// ***************************** Function For Get TimeSlots API **********************************
const getData = async (start_date, end_date) => {
  const response = await fetch(`${apigeturl}/schedules?start_date=${start_date}&end_date=${end_date}`);
  const data = await response.json();
  return data;
};

// ***************************** Saga Method For GetAll TimeSlots **********************************
function* getAllSlot(values) {
  try {
    const { data } = values;
    const { start_date, end_date } = data;
    let allSlotData = yield call(getData, start_date, end_date);
    allSlotData["start_date"] = start_date;
    allSlotData["end_date"] = end_date;

    yield put({ type: GET_ALLSLOT_SUCCESS, allSlotData });
  } catch (error) {
    const err = error.message;
    yield put({ type: GET_ALLSLOT_ERROR, err });
  }
}
// ***************************** Saga Method For Filtered TimeSlots **********************************
function* getDateDataList(values) {
  try {
    const { start_date, end_date } = values;

    if ((start_date && end_date === "") || undefined) {
      return;
    } else {
      let allSlotDateData = yield call(getData, start_date, end_date);
      allSlotDateData["start_date"] = start_date;
      allSlotDateData["end_date"] = end_date;
      yield put({ type: GET_DATEDATA_SUCCESS, allSlotDateData });
    }
  } catch (error) {
    const err = error.message;
    yield put({ type: GET_DATEDATA_ERROR, err });
  }
}

// ***************************** Function For FinalJSON  **********************************
async function createFinalJson(newdata, start_date, end_date) {
  try {
    let slotData = _.flatten(newdata);
    let weekDays = _.uniq(_.map(slotData, "allocated_day"));
    let finalobj = {};
    weekDays?.filter((weekItem) => {
      let array1 = [];
      slotData?.filter((SlotItem) => {
        if (SlotItem.allocated_day === weekItem) {
          array1.push(SlotItem);
        }
        return array1;
      });
      return (finalobj[weekItem] = array1);
    });
    let obj = {
      slots: finalobj,
      start_date: start_date,
      end_date: end_date,
    };
    return obj;
  } catch (error) {
    throw error;
  }
}

// ***************************** Function For POST(ADD) TimeSlots API **********************************
const postData = async (finalObject) => {
  try {
    const response = await fetch(`${apigeturl}/schedules`, {
      method: "POST",
      body: JSON.stringify(finalObject),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// ***************************** Saga Method For Saving TimeSlots **********************************
function* addWeeklySlots(values) {
  const { data } = values;
  let slot = data.slots;
  let { start_date, end_date } = data;

  let datafiltered = Object.entries(slot).filter((o) => o !== "");

  const filterValue = datafiltered.filter((value) => Object.keys(value[1]).length !== 0);
  let arr = [];
  filterValue.forEach((item) => {
    arr.push(item[1].filter((value) => !value.id));
  });
  const newdata = arr.filter((val) => val.length !== 0);

  if (newdata && newdata.length === 0) {
    let err = "Please Add Slot!";
    yield put({ type: SAVEWEEKLYSLOT_ERROR, err, data });
  } else {
    try {
      let finalObject = yield call(createFinalJson, newdata, start_date, end_date);
      const saveData = yield call(postData, finalObject);
      yield put({ type: SAVEWEEKLYSLOT_SUCCESS, saveData });
      let data = {
        start_date: start_date,
        end_date: end_date,
      };
      yield put({ type: GET_ALLSLOT_REQUEST, data });
    } catch (error) {
      const err = error.message;
      console.log("errrrrrrrrr", err);
      yield put({ type: SAVEWEEKLYSLOT_ERROR, err });
    }
  }
}

// ***************************** Function For Delete TimeSlots API **********************************
const deleteData = async (start_time, allocated_day) => {
  const response = await fetch(`${apigeturl}/schedules/destroy?start_time=${start_time}&allocated_day=${allocated_day}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

// ***************************** Saga Method For Delete TimeSlots **********************************
function* deleteTimeSlot(values) {
  try {
    const { start_time, allocated_day, start_date, end_date } = values;
    yield call(deleteData, start_time, allocated_day);
    yield put({ type: DELETE_SLOT_SUCCESS, start_time, allocated_day });
    let data = {
      start_date: start_date,
      end_date: end_date,
    };
    yield put({ type: GET_ALLSLOT_REQUEST, data });
  } catch (error) {
    const err = error.message;
    yield put({ type: DELETE_SLOT_ERROR, err });
  }
}

const sagaExport = () => {
  function* watcher() {
    yield takeLatest(GET_ALLSLOT_REQUEST, getAllSlot);
    yield takeLatest(GET_DATEDATA_REQUEST, getDateDataList);
    yield takeLatest(SAVEWEEKLYSLOT_REQUEST, addWeeklySlots);
    yield takeLatest(DELETE_SLOT_REQUEST, deleteTimeSlot);
  }
  return { watcher };
};
export default sagaExport;
