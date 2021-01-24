import React, {Component} from 'react'
import {connect} from 'react-redux'
import {authenticate} from 'app/auth/Auth'

const enhance = connect(
  state => ({
    error: state.auth.error,
  }),
  {
    authenticate,
  }
)

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault()

    this.props.authenticate('login', this.state)
  }
  render() {
    const {error} = this.props

    return <div className="container">
      <h2>Login</h2>
      {error && <div>Invalid email or password.</div>}
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
        <button type="submit">Login</button>
      </form>
    </div>
  }
}

export default enhance(Login)
