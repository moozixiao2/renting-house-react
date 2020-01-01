import React, { Component, Fragment } from 'react'

import indexCss from './index.module.scss'

import store from '../../store'
export default class MooSearch extends Component {
    state = {
        cityName: store.getState().mapReducer.cityName
    }
    constructor (props) {
        super(props)
        // 可能会有bug => 异步代码和同步代码的关系
        this.state.cityName = store.getState().mapReducer.cityName;
        // 开启一个订阅
        store.subscribe(()=>{
          // 这个代码会在 store发生修改的时候触发 
          this.state.cityName = store.getState().mapReducer.cityName;
        })
    }
    render() {
        return (
            <Fragment>
                <div className={indexCss.mooSearchWrap}>
                   <div className={indexCss.mooSearchLeft}>
                        <div className={indexCss.selectCity}>
                            <div className={indexCss.cityName}>
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
                   <div className={indexCss.mooSearchRight}>
                        <i className={'iconfont icon-map ' + indexCss['icon-map']}></i>
                   </div>
                </div> 
            </Fragment>
        )
    }
}
