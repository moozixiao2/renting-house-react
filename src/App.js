import React, { Component, Fragment } from 'react'

import { HashRouter as Router, Route } from "react-router-dom";

import MooLayout from './components/MooLayout'

import Home from "./pages/Home";
import List from "./pages/List";
import My from "./pages/My";
import News from "./pages/News";
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Route path='/' exact render={() => <MooLayout><Home /></MooLayout>} />
          <Route path='/List' exact render={() => <MooLayout><List /></MooLayout>} />
          <Route path='/News' exact render={() => <MooLayout><News /></MooLayout>} />
          <Route path='/My' exact render={() => <MooLayout><My /></MooLayout>} />
        </Router>
      </Fragment>
    )
  }
}

