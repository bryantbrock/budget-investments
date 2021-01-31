import React, { Component } from 'react'

import {connect} from 'react-redux'

const enhance = connect(
  state => ({
    transactions: state.finances.summary
  })
)

export class Details extends Component {
  componentDidMount() {
    const {setComplete} = this.props

    await getTransactions()

    setComplete('details')
  }
  render() {
    const {transactions} = this.props

    return <div>
      {transactions.map(transaction =>
          <div>{transaction.name}</div>)}
    </div>
  }
}

export default enhance(Details)
