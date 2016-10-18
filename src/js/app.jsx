"use strict";

import React from "react";
import {render} from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import injectTapEventPlugin from "react-tap-event-plugin";

import '../css/main.css';
import reducer from "./reducer/index.js";
import AppInner from "./components/App/App";

import template from '../views/index.ejs';


const App = ({store}) => <Provider store={store}><AppInner /></Provider>;

injectTapEventPlugin();

// Client render
if (typeof document !== 'undefined') {
  const initialState = JSON.parse(document.getElementById('react-state').getAttribute('data-react-state'));
  const store = createStore(reducer, initialState);
  render(
    <App store={store}/>,
    document.getElementById("app")
  );
}

// Export for static-site-generator-webpack-plugin
module.exports = (locals, callback) => {
  locals.getGithubData().then(repos => {
    const state = Object.assign({
      repositories : [],
      organizations: []
    }, repos);
    const store = createStore(reducer, state);
    const html = locals.renderToString(<App store={store}/>);
    return template({html, state});
  }).then(html => callback(null, html), err => callback(err));
};
