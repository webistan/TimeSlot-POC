import { GET_ALLSLOT_ERROR, GET_ALLSLOT_REQUEST, GET_ALLSLOT_SUCCESS, GET_DATEDATA_ERROR, GET_DATEDATA_REQUEST, GET_DATEDATA_SUCCESS } from "../constant/SlotConstant";

const initialState = {
    error: "",
    loading: false,
    slotList: {},
    startDate:'2022-11-09',
    endDate:'2022-11-26',
    slotsObj: {}
    // slotDateList:{},
  };

  const slot = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALLSLOT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_ALLSLOT_SUCCESS:
        return {
          ...state,
          loading: false,
          slotList: action.allSlotData,
        };
      case GET_ALLSLOT_ERROR:
        return {
          loading: false,
          error: action.err,
        };
        case GET_DATEDATA_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case GET_DATEDATA_SUCCESS:
          return {
            ...state,
            loading: false,
            slotList: action.allSlotDateData,
          };
        case GET_DATEDATA_ERROR:
          return {
            loading: false,
            error: action.err,
          };
     
      default:
        return state;
    }
  };
  
  export default slot;
  