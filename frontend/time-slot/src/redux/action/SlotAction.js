import {
  ADDSLOT_REQUEST,
  DELETE_SLOT_REQUEST,
  GET_ALLSLOT_REQUEST,
  GET_DATEDATA_REQUEST,
  GET_SAVEWEEKLYSLOT_REQUEST,
  SAVEWEEKLYSLOT_REQUEST,
} from "../constant/SlotConstant";
export const getSlotList = (data) => {
  return {
    type: GET_ALLSLOT_REQUEST,
    data,
  };
};

export const getDateData = (start_date, end_date) => {
  return {
    type: GET_DATEDATA_REQUEST,
    start_date,
    end_date,
  };
};
export const addWeeklySlot = (data) => {
  return {
    type: SAVEWEEKLYSLOT_REQUEST,
    data,
  };
};

export const addSlotInObject = (data) => {

  return {
    type: ADDSLOT_REQUEST,
    data,
  };
};

export const deleteSlotData = (start_time,allocated_day) => {
  return {
    type: DELETE_SLOT_REQUEST,
   start_time,
   allocated_day
  };
};
