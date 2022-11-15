import { GET_ALLSLOT_REQUEST, GET_DATEDATA_REQUEST } from "../constant/SlotConstant";
export const getSlotList = () => {
    console.log("getSlot action here");
    return {
      type: GET_ALLSLOT_REQUEST,
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