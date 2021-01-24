import React, {Component} from 'react'
import {authenticate} from 'app/auth/Auth'

export class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault()
    authenticate('signup', this.state)
  }
  render() {
    return <div className="container">
      <h2>Signup</h2>
      <form onSubmit={this.onSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.onChange}/>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.onChange}/>
      </form>
    </div>
  }
}

export default Signup