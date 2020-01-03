import React, { Component, Fragment } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import { List, AutoSizer } from 'react-virtualized'

import store from '../../store'
import { mapCityName } from '../../store/actionCreator'
import { getAreaCity, getHotCity } from '../../utils/axios'

import indexCss from './index.module.scss'

export default class CityList extends Component {
  state = {
    totalCity: [],
    /* 右侧字母数据 */
    keyLetter: [],
    // 右侧 被选中的 索引
    selectIndex: 0
  }
  // 取消订阅的 函数
  Unsubscribe = null;
  constructor() {
    super();
    // 对store中的数据开启了监听  返回一个变量 是个方法 == 取消订阅的方法 unsubscribe();
    this.Unsubscribe = store.subscribe(this.getAllCity)
    // 非受控表单 创建 引用
    this.MainList = React.createRef()
  }

  /* 组件数据设置 开始 */
  rowRenderer = ({
    key,
    index,
    isScrolling,
    isVisible,
    style
  }) => {
    /* 循环的数据 */
    const item = this.state.totalCity[index]
    /* 标题 */
    const keyName = Object.keys(item)[0]
    return (
      <div
        key={key}
        style={style}
      >
        {/* 热门城市 */}
        <div className={indexCss.city_list_title}>{keyName}</div>
        {/* 广州 北京 上海 */}
        <div className={indexCss.city_list_content} >
          {item[keyName].map((v, i) =>
            <div key={i} className={indexCss.list_item} onClick={this.cityNameChange.bind(this, v)}>{v}</div>
          )}
        </div>
      </div>
    )
  }
  // 每一大行的高度
  rowHeight = ({ index }) => {
    // 获取 数组的元素 {"热门城市":["北京", "广州", "上海", "深圳"]}
    const item = this.state.totalCity[index];
    // 1 每一个 对象都只有 一个 属性值 = 数组
    // Object.values(item) //  [ [ "北京", "广州", "上海", "深圳" ]  ]
    // Object.values(item)[0].length // [ "北京", "广州", "上海", "深圳" ]
    //  + 1 是因为标题也是 高度40
    return (Object.values(item)[0].length + 1) * 40;
  }

  // 每一行被渲染的时候触发
  rowsRendered = ({ startIndex }) => {
    // console.log(startIndex)
    // 被渲染的索引
    if (startIndex === this.state.selectIndex) {
      return;
    }
    // 设置 右侧被激活的索引
    this.setState({ selectIndex: startIndex });;
  }
  // 右侧字母的 点击事件
  keyLetterClick = (index) => {
    // console.log(index, this.state.selectIndex);
    // console.log(this.MainList);
    // 调用 List组件的方法 来控制 List标签的位移  根据被点击的索引
    this.MainList.current.scrollToRow(index);
  }
  /* 组件数据设置 结束 */

  cityNameChange = (v) => {
    // console.log(v)
    // 获取到要跳转的城市了  修订redux中的城市的信息 
    store.dispatch(mapCityName(v));
    // 跳转回上一页
    this.props.history.go(-1);
  }

  /* 获得并设置数据 */
  getAllCity = async () => {
    try {
      /* 当前城市 */
      let cityName = store.getState().mapReducer.cityName
      /* 所有城市 */
      let allCity = (await getAreaCity({ level: 1 })).data.body
      /* 热门城市 */
      let hotCity = (await getHotCity()).data.body
      // console.log(cityName,allCity, hotCity)
      // 设置所需展示的数组
      /* 
      [
        {"当前地址":["广州市"]},
        {"热门城市":["北京","广州","上海","深圳"]}
        {A:[]},
        {B:[]}...
      ]
      */
      let totalCity = [
        { "当前城市": [cityName] },
        { "热门城市": hotCity.map(v => v.label) }
      ]
      /* 对 allCity 排序 */
      allCity.sort((a, b) => a.short.localeCompare(b.short));
      // console.log(allCity)
      /* 循环 */
      allCity.forEach(v => {
        /* 得到 首字母 */
        let firstLetter = v.short[0].toUpperCase()
        // console.log(firstLetter)
        /* 获得键（首字母）索引 */
        const index = totalCity.findIndex(vv => {
          if (vv[firstLetter]) {
            return true
          } else {
            return false
          }
        })
        /* 判断是否存在 A对象... */
        if (index === -1) {
          /* 不存在 */
          totalCity.push({
            [firstLetter]: [v.label]
          })
        } else {
          /* 存在键(首字母),则在对应键中加入 label */
          totalCity[index][firstLetter].push(v.label)
        }
      })

      /* 右侧字母列表 */
      const keyLetter = totalCity.map(v => Object.keys(v)[0])
      keyLetter[0] = '#'
      keyLetter[1] = '热'
      // console.log(totalCity, keyLetter)
      this.setState({ totalCity, keyLetter })

      // 当数据都渲染完毕了 就取消订阅
      // console.log(this.Unsubscribe);
      this.Unsubscribe();
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    let cityName = store.getState().mapReducer.cityName
    if(cityName) {
      this.getAllCity()
    }
  }

  render() {
    return (
      <Fragment>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >城市列表</NavBar>
        {/* 列表数据 */}
        <div className={indexCss.list_content}>
          <AutoSizer>
            {
              ({ height, width }) => (
                <List
                  ref={this.MainList}  // 非受控表单
                  height={height}
                  rowCount={this.state.totalCity.length}
                  rowHeight={this.rowHeight} // 行高
                  rowRenderer={this.rowRenderer} // 每一行 怎么渲染
                  width={width}
                  onRowsRendered={this.rowsRendered}
                  scrollToAlignment='start' // 对齐方式 不加的话 点击右侧的字母，左侧 列表 滚动的位置不对
                />
              )
            }
          </AutoSizer>
        </div>
        {/* 右侧字母显示 */}
        <div className={indexCss.key_list}>
            {
              this.state.keyLetter.map((v, i) => 
                //  类名 是 "key_item active" 中间是有空格的，所以 必须要 手动拼接一个 空 字符串
                <div onClick={this.keyLetterClick.bind(this, i)} key={v} className={indexCss.key_item + " " + (i === this.state.selectIndex ? indexCss.active : '')}>
                  {v}
                </div>
              )
            }
        </div>
      </Fragment>
    )
  }
}