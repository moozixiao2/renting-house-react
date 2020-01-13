import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon, Toast } from 'antd-mobile'
import MooSearch from '../../../components/MooSearch'
import MooFilter from '../../../components/MooFilter'
import { List, AutoSizer } from "react-virtualized";

import IndexCss from './index.module.scss'
import { getAreaInfo,getHouses } from '../../../utils/axios'
import store from '../../../store'

class ListIndex extends Component {
  state = {
    mooList: []
  }

  // 发送的请求
  QueryParams = {
    start: 1,
    end: 6
  }

  // 每页加载几条
  pageSize = 6

  // 总条数
  count = 6
  // 是否在请求当中
  isLoadding = false
  // 取消订阅
  Unsubscribe = null
  constructor() {
    super();
    this.Unsubscribe = store.subscribe(this.getList);
  }

  /* 子组件传过来的参数 */
  handleFilter = (filterValues) => {
    if(!filterValues) return
    // console.log(filterValues)
    const params = {
      // 区域或者地铁
      [filterValues[0][0]] : filterValues[0][2] !== 'null' ? filterValues[0][2] : filterValues[0][1],
      rentType: filterValues[1][0],
      // 切割时需判断是否存在
      price: filterValues[2][0] && filterValues[2][0].split('|')[1],
      more: filterValues[3].join(',')
    }
    // console.log(params)
    // 拼接参数
    this.QueryParams = Object.assign(this.QueryParams, params)

    for(const key in this.QueryParams) {
      // console.log(key)
      if(this.QueryParams[key] === undefined || this.QueryParams[key] === '') {
        delete this.QueryParams[key]
      }
    }
    // 重置（清空之前）数据
    this.setState({mooList: []})
    this.getList()
  }

  /* 获得数据 */
  getList = async () => {
    // 发送请求
    this.isLoadding = true
    let cityName = store.getState().mapReducer.cityName
    if ( !this.QueryParams ) {
      let id = (await getAreaInfo({name: cityName})).data.body.value
      this.QueryParams.cityId = id
    }

    const res = (await getHouses(this.QueryParams)).data.body
    // console.log(res)
    this.count = res.count
    
    // mooList 被覆盖，没有追加
    const { mooList } = this.state
    // 追加
    this.setState({
      mooList: [...mooList, ...res.list]
    })

    this.QueryParams.start === 1 && this.isLoadding && Toast.info('共找到' + this.count + '套房源。', 2, false)
    // 数据请求完成
    this.isLoadding = false
  }

  /* auosize 列表显示 */
  rowRenderer = ({ key, index, style }) => {
    let { mooList } = this.state
    return (
      <div
        key={key}
        style={style}
      >
        <div onClick={() => this.props.history.push("/Detail/" + mooList[index].houseCode)} className={IndexCss.house_item}>
          <div className={IndexCss.house_item_img_wrap}>
            <img src={process.env.REACT_APP_API_URL + mooList[index].houseImg} alt="" />
          </div>
          <div className={IndexCss.house_item_info_wrap}>
            <div className={IndexCss.house_info1}>{mooList[index].title}</div>
            <div className={IndexCss.house_info2}>{mooList[index].desc}</div>
            <div className={IndexCss.house_info3}>{mooList[index].tags.map(vv => <span key={vv} > {vv}</span>)}</div>
            <div className={IndexCss.house_info4}><span>{mooList[index].price}</span>元/月  </div>
          </div>
        </div>
      </div>
    )
  }

  /* 列表滚动 */
  handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    // clientHeight 外层的大组件的 高度
    // scrollHeight 被滚动的列表的总高度 > clientHeight
    // scrollTop 页面 已经滚动的高度
    // console.log(clientHeight, scrollHeight, scrollTop)
    if (scrollHeight - clientHeight - scrollTop <= 20) {
      // 是否有下一页
      if(this.QueryParams.end < this.count) {
        if(!this.isLoadding) {
          this.QueryParams.start += this.pageSize
          this.QueryParams.end += this.pageSize
          this.getList()
        }
      } else {
        // 没有数据
        Toast.info('没有更多数据了！！！', 1)
      }
    }
  } 

  componentWillMount() {
    // console.log(this.props)
    let search = this.props.location.search
    if(search) {
      let params = this.getLocationParams(search)
      this.QueryParams = Object.assign(this.QueryParams, params)
    }
    this.getList()
  }

  componentWillUnmount () {
    this.Unsubscribe()
  }
  /* 路由参数获取 */
  getLocationParams = (search) => {
    search = search.substring(1).split('&')
    // console.log(search)
    let obj = {}
    search.forEach( v => {
      let temp = v.split('=')
      let key = temp[0]
      let val = temp[1]
      obj[key] = val
    })
    return obj
  }

  render() {
    const { mooList } = this.state
    return (
      <Fragment>
        {/* 导航 开始 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          style={{
            backgroundColor: "#cccccc",
            position: "relative"
          }}
        >
          <div className={IndexCss.moo_list_header}>
            <MooSearch />
          </div>
        </NavBar>
        {/* 导航 结束 */}
        {/* 过滤 开始 */}
        <div className="list_fitler">
          <MooFilter handleFilter={this.handleFilter} />
        </div>
        {/* 过滤 结束 */}
        {/* 列表 开始 */}
        <div className={IndexCss.moo_list_content}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                width={width}
                rowCount={mooList.length}
                rowHeight={160}
                rowRenderer={this.rowRenderer}
                onScroll={this.handleScroll}
              />
            )}
          </AutoSizer>
        </div>
        {/* 列表 结束 */}
      </Fragment>
    )
  }
}
export default withRouter(ListIndex)