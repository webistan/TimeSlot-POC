import {
  ADDSLOT_REQUEST,
  DELETE_SLOT_REQUEST,
  GET_ALLSLOT_REQUEST,
  GET_DATEDATA_REQUEST,
  SAVEWEEKLYSLOT_REQUEST,
} from "../constant/SlotConstant";

//*****************************Action For GetAll TimeSlots **********************************//
export const getSlotList = (data) => {
  return {
    type: GET_ALLSLOT_REQUEST,
    data,
  };
};

//*****************************Action For Filtered TimeSlots **********************************//
export const getDateData = (start_date, end_date) => {
  return {
    type: GET_DATEDATA_REQUEST,
    start_date,
    end_date,
  };
};

//*****************************Action For Save TimeSlots **********************************//
export const addWeeklySlot = (data) => {
  return {
    type: SAVEWEEKLYSLOT_REQUEST,
    data,
  };
};

//*****************************Action For Add TimeSlots In Card **********************************//
export const addSlotInObject = (data) => {
  return {
    type: ADDSLOT_REQUEST,
    data,
  };
};

//*****************************Action For Delete TimeSlots **********************************//
export const deleteSlotData = (
  start_time,
  allocated_day,
  start_date,
  end_date
) => {
  return {
    type: DELETE_SLOT_REQUEST,
    start_time,
    allocated_day,
    start_date,
    end_date,
  };
};
