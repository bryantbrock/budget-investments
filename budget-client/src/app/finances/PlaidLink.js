import React from 'react'
import {connect} from 'react-redux'
import {PlaidLink as Link} from 'react-plaid-link'
import {addBankToken} from 'app/finances/Finances'
import {api} from 'app/api'

const enhance = connect(
  state => ({
    linkToken: state.finances.linkToken,
    user: state.auth.user,
  }),
  {addBankToken}
)

class PlaidLink extends React.Component {
  constructor(props) {
    super(props)
    this.onSuccess = this.onSuccess.bind(this)
  }
  async onSuccess(token, metadata) {
    const {addBankToken, user} = this.props
    const {data} = await api.post(`/exchange-token/${token}`)

    addBankToken(user, data, metadata)
  }
  render() {
    return <Link
      token={this.props.linkToken}
      onSuccess={this.onSuccess} >
      Connect a bank account
    </Link>
  }
}

export default enhance(PlaidLink)