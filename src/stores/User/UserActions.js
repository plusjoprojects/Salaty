import UserType from './UserType'

export const setUser = (item) => {
  return {
    type:UserType.SET_USER,
    payload:item
  }
}
export const setPrays = (item) => {
  return {
    type:UserType.SET_PRAYS,
    payload:item
  }
}

export const setPray = (item) => {
  return {
    type:UserType.SET_PRAY,
    payload:item
  }
}

export const setTodayLogs = (item) => {
  return {
    type:UserType.SET_TODAY_LOGS,
    payload:item
  }
}

export const setYesterdayLogs = (item) => {
  return {
    type:UserType.SET_YESTERDAY_LOGS,
    payload:item
  }
}

export const setLastSeven = (item) => {
  return {
    type:UserType.SET_LAST_SEVEN_DAYS,
    payload:item
  }
}

export const setLast30Days = (item) => {
  return {
    type:UserType.SET_LAST_30_DAYS,
    payload:item
  }
}