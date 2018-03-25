import React from 'react'
import { Provider } from 'react-redux'

import createStore from './redux'
import Cards from './containers/Cards'

const store = createStore()

const Main = () => (
  <Provider store={store}>
    <Cards />
  </Provider>
)

export default Main
