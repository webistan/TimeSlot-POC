import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ALLSLOT_ERROR,
  GET_ALLSLOT_REQUEST,
  GET_ALLSLOT_SUCCESS,
  GET_DATEDATA_REQUEST,
  GET_DATEDATA_ERROR,
  GET_DATEDATA_SUCCESS
} from "../constant/SlotConstant";

function* getAllSlot(values) {
  console.log("work with this slot");
  try {
    // const {key}=values;
    // console.log("key1",key);
    let allSlotData =  {

      "Monday": [{

          "id": "1",

          "slot_time": " 9:30AM",

          "slots": 10

      }, {

          "id": "2",

          "slot_time": "10:30AM",

          "slots": 10

      }
    ],

      "Tuesday": [{

          "id": "3",

          "slot_time": "9:30AM",

          "slots": 10

      }, {

          "id": "4",

          "slot_time": "10:30PM",

          "slots": 10

      }]
      ,
      "Wednesday": [{

        "id": "5",

        "slot_time": "9:30AM",

        "slots": 10

    }, {

        "id": "6",

        "slot_time": "10:30PM",

        "slots": 10

    }]
    ,
    "Thrusday": [{

      "id": "7",

      "slot_time": "9:30AM",

      "slots": 10

  }, {

      "id": "8",

      "slot_time": "10:30PM",

      "slots": 10

  }]
   ,
      "Friday": [{

        "id": "9",

        "slot_time": "9:30AM",

        "slots": 10

    }, {

        "id": "10",

        "slot_time": "10:30PM",

        "slots": 10

    }]
     ,
      "Saturday": []
      ,
      "Sunday": []

  };
    yield put({ type: GET_ALLSLOT_SUCCESS,allSlotData  });
  } catch (error) {
    const err = error.message;
    // console.log("errrrrrrrrr",err);
    yield put({ type: GET_ALLSLOT_ERROR, err });
  }
}

function* getDateDataList(values) {
  console.log("values567",values)
  try {
    let allSlotDateData =  {

      "Monday": [{

          "id": "1",

          "slot_time": "9:30AM",

          "slots": 10

      }, {

          "id": "2",

          "slot_time": "10:30 AM",

          "slots": 10

      }
    ],

  };
    yield put({ type: GET_DATEDATA_SUCCESS,allSlotDateData });
  } catch (error) {
    const err = error.message;
    // console.log("errrrrrrrrr",err);
    yield put({ type: GET_DATEDATA_ERROR, err });
  }
}
export default () => {
  function* watcher() {
    yield takeLatest(GET_ALLSLOT_REQUEST, getAllSlot);
     yield takeLatest(GET_DATEDATA_REQUEST,getDateDataList);
  }
  return { watcher };
};
