import React, { Component, Fragment } from 'react'

import { HashRouter as Router, Route } from "react-router-dom";

import MooLayout from './components/MooLayout'

import Home from "./pages/Index/Home";
import List from "./pages/Index/List";
import My from "./pages/Index/My";
import News from "./pages/Index/News";
import CityList from './pages/CityList'
import BDMap from './pages/BDMap'
import Detail from './pages/Detail'
import Login from './pages/Login'
import Register from './pages/Register'
import Myinfo from './pages/MyComponents/Myinfo'
import Collect from './pages/MyComponents/Collect'
import Record from './pages/MyComponents/Record'
import Rentout from './pages/MyComponents/Rentout'

import { getLocalCity } from './utils/map'
import { mapCityName } from "./store/actionCreator";
import store from './store'

import MooAuthRoute from './components/MooAuthRoute'
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Route path='/' exact render={() => <MooLayout><Home /></MooLayout>} />
          <Route path='/List' exact render={() => <MooLayout><List /></MooLayout>} />
          <Route path='/News' exact render={() => <MooLayout><News /></MooLayout>} />
          <Route path='/My' exact render={() => <MooLayout><My /></MooLayout>} />
          <Route path='/CityList' component = {CityList} />
          <Route path='/BDMap' component = {BDMap} />
          <Route path='/Detail' component = {Detail} />
          <Route path='/Login' component = {Login} />
          <Route path='/Register' component = {Register} />
          
          {/* 需要 token */}
          <MooAuthRoute path='/Myinfo' component= {Myinfo} />
          <MooAuthRoute path='/Collect' component= {Collect} />
          <MooAuthRoute path='/Record' component= {Record} />
          <MooAuthRoute path='/Rentout' component= {Rentout} />
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

