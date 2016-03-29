import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistory, routerReducer } from 'react-router-redux';
import { Router, RouterContext, hashHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import routes from './routes';
import reducers from './state/reducers';
import promiseMiddleware from './state/promiseMiddleware';

console.log('Hello client!');

// App creation
const reducer = combineReducers(Object.assign({ routing: routerReducer }, reducers));
const initialState = {};
const enhancer = compose(
  applyMiddleware(promiseMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer, initialState, enhancer);

// Enables Webpack hot module replacement for reducers
if (module.hot) module.hot.accept('./state/reducers.js', () => store.replaceReducer(require('./state/reducers.js')));

// User interface rendering
render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('root'),
  () => console.log('App rendered!')
);
