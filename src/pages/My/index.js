import React, { Component, Fragment } from 'react'

import indexCss from './index.module.scss'

export default class My extends Component {
    render() {
        return (
            <Fragment>
                <div className={indexCss.My}>
                    {/* 图片 */}
                    <div className={indexCss.loginBg}>
                        <img src='http://hkzf.zbztb.cn/img/profile/bg.png' />
                        {/* 登录 框 */}
                        <div className={indexCss.loginWrap}>
                            <img src='http://hkzf.zbztb.cn/img/profile/avatar.png' />
                            <div className={indexCss.login}>
                                <p>游客</p>
                                <div className={indexCss.loginBtn}>去登录</div>
                            </div>
                        </div>
                    </div>
                    {/* 导航 */}
                    <div className={indexCss.nav}>
                        <div className={indexCss.navItem}>
                            <i className='iconfont icon-coll'></i>
                            <span>我的收藏</span>
                        </div>
                        <div className={indexCss.navItem}>
                            <i className='iconfont icon-ind'></i>
                            <span>我的出租</span>
                        </div>
                        <div className={indexCss.navItem}>
                            <i className='iconfont icon-record'></i>
                            <span>看房记录</span>
                        </div>
                        <div className={indexCss.navItem}>
                            <i className='iconfont icon-identity'></i>
                            <span>成为房主</span>
                        </div>
                        <div className={indexCss.navItem}>
                            <i className='iconfont icon-myinfo'></i>
                            <span>个人资料</span>
                        </div>
                        <div className={indexCss.navItem}>
                            <i className='iconfont icon-cust'></i>
                            <span>联系我们</span>
                        </div>
                    </div>
                    {/* 广告 */}
                    <div className={indexCss.ad}>
                        <img src='http://hkzf.zbztb.cn/img/profile/join.png' />
                    </div>
                </div>
            </Fragment>
        )
    }
}
