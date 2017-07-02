
/* ------------------------------------
--> Actions
------------------------------------ */

export const startFetching = () => {
  return {
    type: 'START_FETCHING'
  }
}

export const endFetching = () => {
  return {
    type: 'END_FETCHING'
  }
}

export const removeError = () => {
  return {
    type: 'DELETE_ERROR'
  }
}
