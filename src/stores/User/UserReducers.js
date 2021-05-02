import UserType from "./UserType";

const intintalState = {
  user: {},
  auth: false,
  prays: {},
  nowPray: {},
  nextPray: {},
  leftToPray: "",
  todayLogs: { done: 0, from: 0, fullList: [] },
  yesterdayLogs: { done: 0, from: 0 },
  lastSevenDayLogs: { done: 0, from: 0 },
  last30Days:{done:0,from:0}
};

const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case UserType.SET_USER:
      return { ...state, user: action.payload, auth: true };
    case UserType.SET_PRAYS:
      return { ...state, prays: action.payload };
    case UserType.SET_PRAY:
      return {
        ...state,
        nowPray: action.payload.nowPray,
        nextPray: action.payload.nextPray,
        leftToPray: action.payload.leftToPray,
      };
    case UserType.SET_TODAY_LOGS:
      return { ...state, todayLogs: action.payload };
    case UserType.SET_YESTERDAY_LOGS:
      return { ...state, yesterdayLogs: action.payload };
    case UserType.SET_LAST_SEVEN_DAYS:
      return { ...state, lastSevenDayLogs: action.payload };
      case UserType.SET_LAST_30_DAYS:
        return {...state,last30Days:action.payload}
    default:
      return state;
  }
};

export default reducer;
