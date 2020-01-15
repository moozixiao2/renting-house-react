import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { SearchBar } from 'antd-mobile'
import indexCss from './index.module.scss'
import { getLocalCity } from '../../../../utils/map'
import { getAreaInfo, getAreaCommunity } from '../../../../utils/axios'
import _ from 'lodash'


class Search extends Component {
  state = {
    searchText: '',
    searchList: []
  }
  /* 输入改变 */
  handleChange = async val => {
    // console.log(val)
    this.setState({
      searchText: val
    })
    // 获得当前城市
    const {name} = await getLocalCity()
    // 根据当前城市，查找
    const body = (await getAreaInfo({name})).data.body
    // pramas {name,id} name 对应搜索内容 id 城市code
    const params = {
      name: this.state.searchText,
      id: body.value
    }
    // console.log(params)
    // 查找 小区
    this.getCommunity(params)
  }

  /* 调用查找小区 */
  getCommunity = _.debounce(async (params) => {
    const res = (await getAreaCommunity(params)).data.body
    // console.log(res)
    this.setState({
      searchList: res
    })
  }, 1000)
  
  // 跳转路由到 /Rent/AddHouse
  handleClick = (v) => {
    this.props.history.replace({
      pathname: '/Rent/AddHouse',
      community: {
        id: v.community,
        name: v.communityName
      }
    })
  }

  renderList = () => {
    const { searchList } = this.state
    return searchList.map(v =>
        <li key={v.community} className={indexCss.listItem} onClick={this.handleClick.bind(this, v)}>
          {v.communityName}
        </li>
      )
  }
  render () {
    const { searchText } = this.state
    return (
      <Fragment>
        <div className={indexCss.rentoutSearch}>
          <SearchBar value={ searchText } 
            placeholder="请输入小区或地址" 
            onCancel={() => this.props.history.replace('/Rent/AddHouse')}
            showCancelButton
            onChange={this.handleChange}
            maxLength={12} 
          />
          <ul className={indexCss.list}>
            {this.renderList()}
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Search)