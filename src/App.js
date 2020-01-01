import React, { Component, Fragment } from 'react'

import { HashRouter as Router, Route } from "react-router-dom";

import MooLayout from './components/MooLayout'

import Home from "./pages/Home";
import List from "./pages/List";
import My from "./pages/My";
import News from "./pages/News";

import { getLocalCity } from './utils/map'
import { mapCityName  } from "./store/actionCreator";
import store from './store'

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
  componentDidMount() {
    getLocalCity()
    .then(res=>{
      // console.log(res)
      store.dispatch(mapCityName(res.name === "全国" ? "北京" : res.name));
    })
  }
}

