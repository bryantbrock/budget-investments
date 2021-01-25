import {createSlice} from '@reduxjs/toolkit'
import {history} from '../../history'
import {api} from 'app/api'

const initialState = {
  isLoading: false,
  smartLoading: true,
  error: null,
  user: {},
}

export const Auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isLoading: state => ({...state, isLoading: true, error: null}),
    error: (state, action) => ({...state, error: action.payload}),
    loadUser: (state, action) => ({
      ...state,
      user: action.payload,
      isLoading: false,
      smartLoading: false,
      error: null,
    })
  }
})

// Actions
export const authenticate = (type, data) => async dispatch => {
  dispatch(Auth.actions.isLoading())

  let res, user
  try {
    if (type === "signup") {
      res = await api.post('/signup', data)
      user = await api.post('/user', res.data)
    } else {
      res = await api.post('/login', data)
      user = await api.get(`/user/${res.data.uid}`)
    }


    dispatch(Auth.actions.loadUser(
      Object.assign({}, res.data, user.data)
    ))

    // Set in localStorage
    localStorage.setItem('userId', user.data.uid)
    localStorage.setItem('isAuth', true)

    history.push('/')
  } catch (error) {
    dispatch(Auth.actions.error(error.message))
  }
}

export const smartLoad = () => async dispatch => {
  // TODO: clear storage if expired
  try {
    const userUid = localStorage.getItem('userId')
    const {data: user} = await api.get(`/user/${userUid}`)

    dispatch(Auth.actions.loadUser(user))
  } catch (err) {
    dispatch(Auth.actions.error(err.message))

    localStorage.clear()
  }
}

export default Auth