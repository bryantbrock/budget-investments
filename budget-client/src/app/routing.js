import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {Dashboard} from 'app/dashboard'
import {Login, Signup} from 'app/auth'
import {connect} from 'react-redux'
import {history} from '../history'
import {smartLoad} from 'app/auth/Auth'
import LoadingScreen from 'app/LoadingScreen'

const routes = [
  {path: '/', title: 'Dashboard', component: Dashboard},
  {path: '/login', title: 'Login', component: Login},
  {path: '/signup', title: 'Signup', component: Signup},
]

const enhance = connect(
  state => ({
    smartLoading: state.auth.smartLoading,
  }), {smartLoad}
)

class Routing extends React.Component {
  renderRoutes() {
    return <Switch>
    {routes.map((route, idx) =>
      <Route
        exact={!route.notExact}
        key={idx}
        path={route.path}
        component={withRouter(route.component)}
        title={route.title} />
      )}
    </Switch>
  }
  render() {
    const {smartLoading} = this.props

    if (
      !localStorage.getItem('userId') ||
      !localStorage.getItem('isAuth')
    ) {
      history.push('/login')

      return this.renderRoutes()
    }

    this.props.smartLoad()

    return smartLoading ? <LoadingScreen /> : this.renderRoutes()
  }
}

export default enhance(Routing)