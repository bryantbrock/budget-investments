import React from 'react'
import {PlaidLink as Link} from 'react-plaid-link'

class PlaidLink extends React.Component {
  onSuccess = (token, metadata) => {
    // send token to server
  };
  render() {
    return <Link
      token="<GENERATED_LINK_TOKEN>"
      onSuccess={onSuccess} >
      Connect a bank account
    </Link>
  }
}

export default PlaidLink