import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers/index'
import { addClick } from './actions/mainActions'
import Main from './pages/Main'
import PageDetail from './pages/PageDetail'
import EZNavigator from './components/EZNavigator'


class Project extends Component {
  render() {
    return (
      <EZNavigator
        defaultRoute={'Main'}
        // onRef={nav => updateNav(nav)}
        // onNavigationStateChange={this.navigationStateChange.bind(this)}
        routes={{
          Main: { screen: Main },
          PageDetail: { screen: PageDetail },
        }} />
    )
  }

}


const App = () => {
  const store = createStore(reducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <Project/>
      {/* <PageDetail/> */}

    </Provider>
  );
}

export default App;








