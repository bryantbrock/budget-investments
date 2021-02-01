import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Currency} from 'app/dashboard/utils'

const enhance = connect(
  state => ({
    summary: state.finances.summary,
  })
)

class Summary extends Component {
  render() {
    const {summary:
      {overUnder, income, expenses}
    } = this.props

    return <div className="pr-20">
      <div>
        <h1>Profit</h1>
        <Currency value={overUnder} className="pb-5" />
        <h1>Income</h1>
        <Currency value={income} className="pb-5" />
        <h1>Expenses</h1>
        <Currency value={expenses} className="pb-5" />
      </div>

    </div>
  }
}

export default enhance(Summary)
