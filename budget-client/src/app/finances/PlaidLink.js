import React from 'react'
import {connect} from 'react-redux'
import {PlaidLink as Link} from 'react-plaid-link'
import {addBankToken} from 'app/finances/Finances'

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
  onSuccess(token, metadata) {
    const {addBankToken, user} = this.props

    addBankToken(user, token, metadata)
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