import React, {Component} from 'react'
import {PlaidLink} from 'react-plaid-link'
import {connect} from 'react-redux'
import {
  getLinkToken, loadBankTransactions,
} from 'app/finances/Finances'
import {history} from '../../history'
import {Summary, Details} from 'app/dashboard'
import {api} from 'app/api'

const enhance = connect(
  state => ({
    user: state.auth.user,
  }),
  {getLinkToken, loadBankTransactions}
)

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      loading: true,
    }
    this.fetchToken = this.fetchToken.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
  }
  async componentDidMount() {
    await this.props.loadBankTransactions(this.props.user.uid)

    this.setState({loading: false})
  }
  async onSuccess(token, metadata) {
    const {addBankToken, user} = this.props
    const {data} = await api.post(`/exchange-token/${token}`)

    addBankToken(user, data, metadata)
  }
  async fetchToken() {
    const {getLinkToken, user} = this.props
    const linkToken = await getLinkToken(user.uid, user)

    this.setState({token: linkToken})

    document.querySelector('button[type="button"]').click()
  }
  logout() {
    localStorage.clear()

    history.push('/login')
  }
  render() {
    const {token, loading} = this.state
    const {user} = this.props

    const bankConnected = user.connectedInstitutes &&
      user.connectedInstitutes.length > 0
    const logoutClass = 'rounded border border-black px-2'

    return <div className="container">
      <div className="navbar">
        <button onClick={this.fetchToken}>
          Connect a Bank
        </button>
        <div className="hidden">
          {token && <PlaidLink
            token={token}
            onSuccess={this.onSuccess} />}
        </div>
        <button onClick={this.logout} className={logoutClass}>
          Log Out
        </button>
      </div>
      <div className="flex justify-center pt-20">
        {loading && <div className="spinner spinner-md" />}
        {!loading && bankConnected &&
          <div className="flex justify-center pt-20">
            <Summary />
            <Details />
          </div>}
        {!loading && !bankConnected && <div>
          Please connect a bank to get started.
        </div>}
      </div>
    </div>
  }
}

export default enhance(Dashboard)
