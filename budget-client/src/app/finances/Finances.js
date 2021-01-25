import {createSlice} from '@reduxjs/toolkit'
import {Auth} from 'app/auth'
import {api} from 'app/api'

const initialState = {
  isLoading: false,
  error: null,
  bankToken: null,
  linkToken: null,
  transactions: [],
  accounts: [],
  institutions: [],
}

export const Finances = createSlice({
  name: 'finances',
  initialState,
  reducers: {
    isLoading: state => ({...state, isLoading: true, error: null}),
    error: (state, action) => ({...state, error: action.payload}),
    loadLinkToken: (state, action) => ({...state, linkToken: action.payload}),
    loadBankToken: (state, action) => ({...state, bankToken: action.payload}),
    loadTransactions: (state, action) => ({
      ...state,
      transactions: action.payload,
    }),
    loadAccounts: (state, action) => ({
      ...state,
      accounts: action.payload,
    }),
    loadInstitute: (state, action) => ({
      ...state,
      institutions: [...state.institutions, action.payload],
    })
  }
})

// Actions
export const addBankToken = (user, token, metadata) => async dispatch => {
  dispatch(Finances.actions.loadAccounts(metadata.accounts))
  dispatch(Finances.actions.loadInstitute(metadata.institution.name))
  dispatch(Finances.actions.loadBankToken(token))

  try {
    const {data} = await api.post(`/add-bank-token/${user.uid}`, {token})

    dispatch(Auth.actions.loadUser(Object.assign({}, user, {bankToken: data.linkToken})))
  } catch (err) {
    dispatch(Finances.actions.error(err))
  }
}

export const getLinkToken = uid => async dispatch => {
  try {
    const res = await api.post(`/create-link-token/${uid}`)

    dispatch(Finances.actions.loadLinkToken(res.data.linkToken))
  } catch (err) {
    dispatch(Finances.actions.error(err))
  }
}

export default Finances