import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {Dashboard} from 'app/dashboard'
import {Login, Signup} from 'app/auth'
import {connect} from 'react-redux'
import {history} from '../history'

const routes = [
  {path: '/', title: 'Dashboard', component: Dashboard},
  {path: '/login', title: 'Login', component: Login},
  {path: '/signup', title: 'Signup', component: Signup},
]

const enhance = connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
  })
)

class Routing extends React.Component {
  render() {
    // TODO: Redirect to Dashboard if Logged in
    // TODO: Redirect to Login if address not found

    if (!this.props.isAuthenticated) {
      history.push('/login')
    }

    return (
      <Switch>
      {routes.map((route, idx) =>
        <Route
          exact={!route.notExact}
          key={idx}
          path={route.path}
          component={withRouter(route.component)}
          title={route.title} />
        )}
      </Switch>
    )
  }
}

export default enhance(Routing)