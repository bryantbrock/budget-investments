import {createSlice} from '@reduxjs/toolkit'
import {history} from '../../history'
import {api} from 'app/api'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
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
      error: null,
    })
  }
})

// Actions
export const authenticate = (type, data) => async dispatch => {
  const method = type === "signup" ?
    () => api.post('/signup', data) :
    () => api.post('/login', data)

  dispatch(Auth.actions.isLoading())

  try {
    const res = await method()

    dispatch(Auth.actions.loadUser(res.data))
    history.push('/')
  } catch (error) {
    dispatch(Auth.actions.error(error.message))
  }
}

export default Auth