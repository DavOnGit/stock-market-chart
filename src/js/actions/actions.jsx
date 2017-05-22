import Auth from '../modules/Auth'

/* ------------------------------------
--> Actions
------------------------------------ */

export const login = (name) => {
  return {
    type: 'LOGIN',
    name
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

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

export const setQueryResults = (results) => {
  return {
    type: 'SET_RESULTS',
    results
  }
}

export const startYelpFetching = (query) => {
  return (dispatch, getState) => {
    dispatch(startFetching())

    const xhr = new window.XMLHttpRequest()
    xhr.open('GET', `/query/${encodeURIComponent(query)}`)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    if (Auth.isUserAuthenticated) {
      xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`)
    }

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        let data
        try {
          data = JSON.parse(this.responseText)
        } catch (err) {
          console.log('parse error:\n', err.message)
          data = ''
        }
        dispatch(endFetching())
        dispatch(setQueryResults(data))
      } else {
        console.log('error fetching location:\nerror status: ' + xhr.status)
        dispatch(endFetching())
      }
    })
    xhr.send()
  }
}

export const setUserToBizList = (list) => {
  return {
    type: 'SET_U2B_LIST',
    list
  }
}

export const addUserToBiz = (bizId, userName) => {
  return {
    type: 'ADD_USER_TO_BIZ',
    bizId,
    userName
  }
}

export const startAddUserToBiz = bizId => {
  return (dispatch, getState) => {
    dispatch(startFetching())
    const { user } = getState()

    // create a string for an HTTP body message
    const biz = encodeURIComponent(bizId)
    const data = `biz=${biz}`

    const xhr = new window.XMLHttpRequest()
    xhr.open('PUT', `/api/addusr`)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`)
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        dispatch(endFetching())
        dispatch(addUserToBiz(biz, user.name))
      }
    })
    xhr.send(data)
  }
}

export const removeUserFromBiz = (bizId) => {
  return {
    type: 'REMOVE_USER_FROM_BIZ',
    bizId
  }
}

export const startRemoveUserFromBiz = bizId => {
  return (dispatch, getState) => {
    dispatch(startFetching())

    const biz = encodeURIComponent(bizId)
    const data = `biz=${biz}`

    const xhr = new window.XMLHttpRequest()
    xhr.open('PUT', `/api/wipeusr`)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`)
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        dispatch(endFetching())
        console.log(bizId)
        dispatch(removeUserFromBiz(bizId))
      }
    })
    xhr.send(data)
  }
}
