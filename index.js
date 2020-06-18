/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import rootReducer from './reducers';
import { name as appName } from './app.json';

const store = createStore(rootReducer, composeWithDevTools());

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppContainer);
