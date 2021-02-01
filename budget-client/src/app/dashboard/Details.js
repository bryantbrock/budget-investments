import React, { Component } from 'react'
import {Currency} from 'app/dashboard/utils'
import {connect} from 'react-redux'

const enhance = connect(
  state => ({
    transactions: state.finances.transactions
  })
)

export class Details extends Component {
  render() {
    const {transactions} = this.props

    const classes = {
      main: 'flex bg-gray-100 p-2 rounded mb-2',
      entry: 'pr-2',
    }

    // TODO: place transactions chronologically,
    // not by institute.

    return <div>
      {transactions.map(institute =>
        institute.transactions.map(transaction => <div className={classes.main}>
          <div className={classes.entry}>{transaction.date}</div>
          <Currency value={transaction.amount} className={classes.entry} />
          <div className={classes.entry}>{transaction.name}</div>
          <div className={classes.entry}>{transaction.city}</div>
          <div className={classes.entry}>{transaction.region}</div>
        </div>)
      )}
    </div>
  }
}

export default enhance(Details)
