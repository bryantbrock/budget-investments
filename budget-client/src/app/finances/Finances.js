import {createSlice} from '@reduxjs/toolkit'
import {Auth} from 'app/auth'
import {api} from 'app/api'

const initialState = {
  isLoading: false,
  error: null,
  transactions: [],
  accounts: [],
  summary: {},
}

export const Finances = createSlice({
  name: 'finances',
  initialState,
  reducers: {
    isLoading: state => ({...state, isLoading: true, error: null}),
    error: (state, action) => ({...state, error: action.payload}),
    loadSummary: (state, action) => ({...state, summary: action.payload}),
    loadTransactions: (state, action) => ({
      ...state,
      transactions: action.payload,
    }),
    loadAccounts: (state, action) => ({
      ...state,
      accounts: action.payload,
    }),
  }
})

// Actions
export const addBankToken = (user, tokens, metadata) => async dispatch => {
  try {
    const newToken = {
      ...tokens,
      institution: metadata.institution.name,
    }

    await api.post(`/add-bank-token/${user.uid}`, newToken)

    const modifiedToken = {institution: newToken.institution}

    dispatch(Auth.actions.loadUser({
      ...user,
      bankTokens: [...user.bankTokens, modifiedToken],
    }))
  } catch (err) {
    dispatch(Finances.actions.error(err))
  }
}

export const getLinkToken = uid => async dispatch => {
  let res
  try {
    res = await api.post(`/create-link-token/${uid}`)

  } catch (err) {
    dispatch(Finances.actions.error(err))
  }

  return res.data.linkToken
}

export const calculateSummary = accessId => async dispatch => {
  let res
  try {
    res = await api.post(`/create-link-token/${uid}`)

  } catch (err) {
    dispatch(Finances.actions.error(err))
  }

  return res.data.linkToken
}

export const getTransactions = accessId => async dispatch => {
  let res
  try {
    res = await api.post(`/create-link-token/${uid}`)

  } catch (err) {
    dispatch(Finances.actions.error(err))
  }

  return res.data.linkToken
}



export default Finances