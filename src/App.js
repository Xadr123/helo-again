import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'
import Form from './Components/Form/Form'
import Nav from './Components/Nav/Nav'
import Post from './Components/Post/Post'
import routes from './routes'
import './App.css';

function App(props) {
  return (
    <div className="App">
      {props.location.pathname === '/' ? (
        <div>
          {routes}
        </div>
      ) : (
          <div>
            <Nav />
            {routes}
          </div>
        )}
    </div>
  )
}

export default withRouter(App);
