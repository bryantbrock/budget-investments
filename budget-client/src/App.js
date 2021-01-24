import React from 'react'
import {Provider} from 'react-redux'
import {history} from './history'
import {store} from 'store'
import {Router} from 'react-router-dom'
import Routing from 'app/routing'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Routing />
        </Router>
      </Provider>
    )
  }
}

export default App