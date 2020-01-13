import React, { Component, Fragment } from 'react'

import indexCss from './index.module.scss'
import { hasToken, removeToken } from '../../../utils/token'
import { getUserInfo, userLogout } from '../../../utils/axios'

import { withRouter } from 'react-router-dom'
import { Modal } from 'antd-mobile'
import { setLocUserInfo, removeLocUserInfo } from '../../../utils/userinfo'
const alert = Modal.alert
class My extends Component {
  state = {
    // nav 数据
    menu: [
      {
        id: 1,
        text: '我的收藏',
        icon: 'icon-coll',
        to: '/Collect'
      },
      {
        id: 2,
        text: '我的出租',
        icon: 'icon-ind',
        to: '/Rentout'
      },
      {
        id: 3,
        text: '看房记录',
        icon: 'icon-record',
        to: '/Record'
      },
      {
        id: 4,
        text: '成为房主',
        icon: 'icon-identity',
        to: '/Identity'
      },
      {
        id: 5,
        text: '个人资料',
        icon: 'icon-myinfo',
        to: '/Myinfo'
      },
      {
        id: 6,
        text: '联系我们',
        icon: 'icon-cust',
        to: '/Contactus'
      }
    ],
    // 是否登录
    isLogin: hasToken(),
    // 用户数据
    userinfo: {}
  }

  componentDidMount() {
    const { isLogin } = this.state
    if (isLogin) {
      this.getUserInfo()
    }
  }

  // 获得用户数据
  getUserInfo = async () => {
    const res = (await getUserInfo()).data
    // console.log(res)
    if (res.status === 400) {
      await userLogout()
      // 清除 本地
      removeToken()
      removeLocUserInfo()
      // 重置 state
      this.setState({
        isLogin: false,
        userinfo: {}
      })
      return alert('提示', '登录失效，请重新登录？', [
        { text: '取消', style: 'default' },
        {
          text: '确定', onPress: () => {
            this.props.history.push('/Login')
          }
        }
      ])
    }
    this.setState({
      userinfo: res.body
    })
    // 存入本地
    setLocUserInfo(res.body)
  }

  // 登出
  handleLogout = () => {
    alert('提示', '是否确定退出登录？', [
      { text: '取消', style: 'default' },
      {
        text: '确定', onPress: async () => {
          await userLogout()
          // 清除 本地
          removeToken()
          removeLocUserInfo()
          // 重置 state
          this.setState({
            isLogin: false,
            userinfo: {}
          })
        }
      },
    ])
  }
  render() {
    const baseUrl = process.env.REACT_APP_API_URL
    const { isLogin, userinfo } = this.state
    return (
      <Fragment>
        <div className={indexCss.My}>
          {/* 图片 */}
          <div className={indexCss.loginBg}>
            <img src={baseUrl + '/img/profile/bg.png'} alt='背景图' />
            {/* 登录 框 */}
            <div className={indexCss.loginWrap}>
              <img src={!isLogin ? baseUrl + '/img/profile/avatar.png' : baseUrl + userinfo.avatar} alt='icon' />
              <div className={indexCss.login}>
                <p>{!isLogin ? '游客' : userinfo.nickname}</p>

                {
                  !isLogin ?
                    <div className={indexCss.loginBtn} onClick={() => this.props.history.push('/Login')}>去登录</div>
                    :
                    <>
                      <div className={indexCss.logoutBtn} onClick={this.handleLogout}>退出</div>
                      <div className={indexCss.editInfo} onClick={() => this.props.history.push('/Myinfo')}>编辑个人资料<i className='iconfont icon-箭头向右'></i></div>
                    </>
                }
              </div>
            </div>
          </div>
          {/* 导航 可用九宫格布局 grid */}
          <div className={indexCss.nav}>
            {
              this.state.menu.map(v =>
                <div className={indexCss.navItem} key={v.id} onClick={() => this.props.history.push(v.to)}>
                  <i className={'iconfont ' + v.icon}></i>
                  <span>{v.text}</span>
                </div>)
            }
          </div>
          {/* 广告 */}
          <div className={indexCss.ad}>
            <img src={baseUrl + '/img/profile/join.png'} alt='' />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(My)