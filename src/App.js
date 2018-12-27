import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Boxes from './components/Boxes/Boxes';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Form />
        <Boxes /> 
      </Provider>
    );
  }
}

export default App;
