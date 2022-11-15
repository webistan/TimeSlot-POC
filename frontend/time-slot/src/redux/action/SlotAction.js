import { GET_ALLSLOT_REQUEST, GET_DATEDATA_REQUEST, GET_SAVEWEEKLYSLOT_REQUEST, SAVEWEEKLYSLOT_REQUEST } from "../constant/SlotConstant";
export const getSlotList = (data) => {
    console.log("getSlot action here");
    return {
      type: GET_ALLSLOT_REQUEST,
      data
    };
  };

  export const getDateData = (startDatee,endDatee) => {
    console.log("dat456",startDatee,endDatee);
    return {
      type: GET_DATEDATA_REQUEST,
      startDatee,
      endDatee
    };
  };
  export const addWeeklySlot = (data) => {
    console.log("dat456",data);
    return {
      type:SAVEWEEKLYSLOT_REQUEST,
      data
    };
  };

  