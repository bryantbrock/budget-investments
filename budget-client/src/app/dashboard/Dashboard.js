import React, {Component} from 'react'
import {PlaidLink} from 'react-plaid-link'
import {connect} from 'react-redux'
import {getLinkToken} from 'app/finances/Finances'
import {history} from '../../history'
import {Summary, Details} from 'app/dashboard'
import {api} from 'app/api'

const enhance = connect(
  state => ({
    user: state.auth.user,
  }),
  {getLinkToken}
)

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      loading: true,
      summary: false,
      details: false,
    }
    this.fetchToken = this.fetchToken.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.setComplete = this.setComplete.bind(this)
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
  setComplete(entity) {
    const {summary, details} = this.state

    this.setState({[entity]: true})

    if (summary && details) {
      this.setState({loading: false})
    }
  }
  logout() {
    localStorage.clear()

    history.push('/login')
  }
  render() {
    const {token, loading} = this.state
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
        {loading ? <div className="spinner spinner-md" /> :
          <div>
            <Summary finished={this.setComplete} />
            <Details finished={this.setComplete} />
          </div>}
      </div>
    </div>
  }
}

export default enhance(Dashboard)
