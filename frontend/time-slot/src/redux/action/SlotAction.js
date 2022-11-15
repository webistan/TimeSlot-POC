import { GET_ALLSLOT_REQUEST, GET_DATEDATA_REQUEST, GET_SAVEWEEKLYSLOT_REQUEST, SAVEWEEKLYSLOT_REQUEST } from "../constant/SlotConstant";
export const getSlotList = (data) => {
    console.log("getSlot action here");
    return {
      type: GET_ALLSLOT_REQUEST,
      data
    };
  };

  export const getDateData = (start_date,end_date) => {
    console.log("dat56",start_date,end_date);
    return {
      type: GET_DATEDATA_REQUEST,
      start_date,
      end_date
    };
  };
  export const addWeeklySlot = (data) => {
    console.log("dat456",data);
    return {
      type:SAVEWEEKLYSLOT_REQUEST,
      data
    };
  };

  