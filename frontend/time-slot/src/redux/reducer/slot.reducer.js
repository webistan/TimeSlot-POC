import { ADDSLOT_REQUEST, DELETE_SLOT_SUCCESS, GET_ALLSLOT_ERROR, GET_ALLSLOT_REQUEST, GET_ALLSLOT_SUCCESS, GET_DATEDATA_ERROR, GET_DATEDATA_REQUEST, GET_DATEDATA_SUCCESS } from "../constant/SlotConstant";

const initialState = {
    error: "",
    loading: false,
    slotList: {},
    start_date:'',
    end_date:'',
    weeklySlotsData: {}
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
          start_date:action.allSlotData.start_date,
          end_date:action.allSlotData.end_date,

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
            start_date:action.allSlotDateData.start_date,
          end_date:action.allSlotDateData.end_date,
          };
        case GET_DATEDATA_ERROR:
          return {
            loading: false,
            error: action.err,
          };
     
          case ADDSLOT_REQUEST:

        return {

          ...state,

          //loading: true,

          slotList: action.data,

          //  count: initialState.count + 1

        };
        case  DELETE_SLOT_SUCCESS:
      return {
        ...state,
      };
      default:
        return state;
    }
  };
  
  export default slot;
  