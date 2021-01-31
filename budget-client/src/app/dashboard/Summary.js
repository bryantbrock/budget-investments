import React, { Component } from 'react'
import {connect} from 'react-redux'

const enhance = connect(
  state => ({
    summary: state.finances.summary
  })
)

class Summary extends Component {
  componentDidMount() {
    const {setComplete} = this.props

    await calculateSummary()

    setComplete('summary')
  }
  render() {
    const {summary: {leftOver, income, expenses}} = this.props

    return <div className="pr-20">
      <div>
        <h1>Leftover</h1>
        <div className="pb-5">{leftOver}</div>
        <h1>Income</h1>
        <div className="pb-5">{income}</div>
        <h1>Expenses</h1>
        <div className="pb-5">{expenses}</div>
      </div>

    </div>
  }
}

export default enhance(Summary)
