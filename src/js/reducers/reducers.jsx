export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, name: action.name }

    case 'LOGOUT':
      return {}
    default:
      return state
  }
}

export const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case 'START_FETCHING':
      return true

    case 'END_FETCHING':
      return false

    default:
      return state
  }
}

export const yelpSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_RESULTS':
      return action.results

    case 'SET_U2B_LIST':
      return {
        ...state,
        userstobiz: action.list
      }

    case 'ADD_USER_TO_BIZ':
      const thisUserToBiz = {
        bizid: action.bizId,
        user: { name: action.userName, email: 'placeholder' }
      }
      const newList = state.userstobiz.concat(thisUserToBiz)
      return {
        ...state,
        userstobiz: newList
      }
    case 'REMOVE_USER_FROM_BIZ':
      const filtered = state.userstobiz.filter(biz =>
        biz.bizid !== action.bizId || typeof biz.user.email !== 'string')

      return {
        ...state,
        userstobiz: filtered
      }

    case 'LOGOUT':
      return {
        ...state,
        userstobiz: []
      }

    default:
      return state
  }
}
