import React, {Component} from 'react'
import {PlaidLink} from 'app/finances'
import {connect} from 'react-redux'
import {getLinkToken} from 'app/finances/Finances'

const enhance = connect(
  state => ({
    user: state.auth.user,
    linkToken: state.finances.linkToken,
  }),
  {getLinkToken}
)

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tokenFetched: false,
    }
    this.fetchToken = this.fetchToken.bind(this)
  }
  async fetchToken() {
    const {getLinkToken, user} = this.props

    await getLinkToken(user.uid, user)
    this.setState({tokenFetched: true})
  }
  render() {
    const {linkToken} = this.props
    const {tokenFetched} = this.state
    console.log(linkToken)

    if (tokenFetched || linkToken) {
      return <PlaidLink linkToken={linkToken} />
    }

    return <div>
      <h2>Dashboard</h2>
      <button onClick={this.fetchToken}>
          Connect Bank
        </button>
    </div>
  }
}

export default enhance(Dashboard)
