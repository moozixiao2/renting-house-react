import React, { Component, Fragment } from 'react'

import indexCss from './index.module.scss'

import store from '../../store'

import {withRouter  } from "react-router-dom";

class MooSearch extends Component {
    state = {
        cityName: store.getState().mapReducer.cityName
    }
    // 取消订阅的函数
    Unsubscribe=null

    constructor (props) {
        super(props)
        // 可能会有bug => 异步代码和同步代码的关系
        this.state.cityName = store.getState().mapReducer.cityName;
        // 开启一个订阅
        this.Unsubscribe = store.subscribe(()=>{
          // 这个代码会在 store发生修改的时候触发 
          this.setState({
            cityName: store.getState().mapReducer.cityName
          })
        })
    }

    componentWillUnmount() {
      // 取消订阅
      this.Unsubscribe();
    }
    
    render() {
        return (
            <Fragment>
                <div className={indexCss.mooSearchWrap}>
                   <div className={indexCss.mooSearchLeft}>
                        <div className={indexCss.selectCity}>
                            <div className={indexCss.cityName} onClick={ () => this.props.history.push("/CityList") }>
                                {this.state.cityName === '' ? '获取中' : this.state.cityName}
                            </div>
                            <i className="iconfont icon-arrow"></i>
                        </div>
                        <div className={indexCss.searchInputWrap}>
                            <i className={'iconfont icon-seach ' + indexCss['icon-seach']}></i>
                            <div className={indexCss.searchInput}>
                                请输入小区或地址
                            </div>
                        </div>
                   </div>
                   <div className={indexCss.mooSearchRight} onClick={()=>this.props.history.push("/BDMap")}>
                        <i className={'iconfont icon-map ' + indexCss['icon-map']}></i>
                   </div>
                </div> 
            </Fragment>
        )
    }
}

export default withRouter(MooSearch)