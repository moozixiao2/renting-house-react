import React, { Component, Fragment } from 'react'

import indexCss from './index.module.scss'

import store from '../../store'
export default class MooSearch extends Component {
    constructor (props) {
        super(props)
        this.state = {
            cityName: store.getState().mapReducer.cityName
        }
    }
    render() {
        return (
            <Fragment>
                <div className={indexCss.mooSearchWrap}>
                   <div className={indexCss.mooSearchLeft}>
                        <div className={indexCss.selectCity}>
                            <div className={indexCss.cityName}>
                                {this.state.cityName}
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
