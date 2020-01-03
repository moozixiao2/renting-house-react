import React, { Component, Fragment } from 'react'

import indexCss from './index.module.scss'
import { PickerView } from 'antd-mobile'

import store from '../../store'
import { getAreaInfo, getHousesCondition } from '../../utils/axios'

export default class MooFilter extends Component {
  state = {
    // 筛选标题
    filterTitle: [
      { name: '区域', level: 3 },
      { name: '方式', level: 2 },
      { name: '租金', level: 1 },
      { name: '筛选', level: 0 }
    ],
    // 筛选的内容数据
    filterList: [],
    // 选中的要筛选的索引
    selectIndex: -1,
    // 所有的筛选项的值 数组
    filterValues: [[], [], [], []],
    // picker标签的value
    pickerValue: [],
    // 第四个 筛选组件 选中的值 数组
    // [ROOM|d4a692e4-a177-37fd,ROOM|d4a692e4-a177-37f3,ROOM|d4a692e4-a177-44]
    otherValue: []
  }

  Unsubscribe = null

  constructor () {
    super ()
    this.Unsubscribe = store.subscribe(this.getData);
  }
  componentDidMount () {
    const cityName = store.getState().mapReducer.cityName;
    if (cityName) {
      this.getData();
    }
  }

  componentWillUnmount () {
    this.Unsubscribe()
  }

  /* 获得数据 */
  getData = async () => {
    let cityName = store.getState().mapReducer.cityName

    cityName = '广州市'
    const id = (await getAreaInfo({name: cityName})).data.body.value
    const res = (await getHousesCondition({id})).data.body
    const {area, subway, rentType, price, roomType, oriented, floor, characteristic} = res
    /* 组合数据 */
    let filterList = [
      [area, subway],
      rentType,
      price,
      [{name: '户型', list: roomType}, {name: '朝向', list: oriented}, {name: '楼层', list: floor}, {name: '亮点', list: characteristic}]
    ]
    // console.log(id, res)
    this.setState({ filterList })
  }

  /* 标题 点击 */
  handleFiltleClick = (selectIndex) => {
    if(selectIndex === this.state.selectIndex) selectIndex = -1
    // console.log(selectIndex, this.state.selectIndex)
    this.setState({
      selectIndex
    })
  }

  /* 选项 切换 */
  pickerChange = (value) => {
    // console.log(value);
    let { selectIndex, filterValues } = this.state
    /* value 是返回的数组 */
    filterValues[selectIndex] = value
    this.setState({
      pickerValue:value,
      filterValues
    });
  }

  /* 几列 */
  getChildrenLevel = (arr) => {
    // console.log(arr)
    
    let set = new Set();
    let index = 0;
    const getChildren = (arr) => {
      if (arr && arr.length) {
        arr.forEach( v => {
          if (v.children) {
            index ++
            getChildren(v.children)
  
            index --
          } else {
            // 当前 v 走完， 记录 children 层级
            set.add(index)
          }
        })
      } else {
        set.add(index)
      }
    }
    getChildren(arr)
    return Math.max.apply(null, [...set]) || 1
  }

  /* 筛选事件 */
  filterOtherItemClick = (value) => {
    // console.log(value)
    let { otherValue, filterValues, selectIndex } = this.state
    // 判断点击的值是否存在
    const index = otherValue.findIndex(v => v === value)

    if (index === -1) {
      otherValue.push(value)
    } else {
      otherValue.splice(index, 1)
    }
    // console.log(otherValue)
    // 加入到筛选数组中
    filterValues[selectIndex] = otherValue
    this.setState({otherValue, filterValues})
  }

  filterOtherClear = () => {
    let {filterValues, selectIndex} = this.state
    const otherValue = []
    filterValues[selectIndex] = otherValue
    this.setState({otherValue, filterValues})
  }


  /* 确定 */
  handleFilterOk = () => {
    let { filterValues } = this.state

    // 向父组件传值
    this.props.handleFilter(filterValues)

    this.setState({ selectIndex:-1  });
  }

  /* 标题点击 内容切换 */
  renderFilterContent () {
    const { filterList, selectIndex, pickerValue, otherValue } = this.state
    if (selectIndex === -1) {
      return <></>
    } else if (selectIndex <= 2) {
      return (
        <div className={indexCss.filter_normal}>
          <PickerView
            onChange={this.pickerChange}
            data={filterList[selectIndex]}
            value={pickerValue}
            cols={this.getChildrenLevel(filterList[selectIndex])} // 几列
          />
          <div className={indexCss.filter_normal_btn}>
            <span onClick={() => this.setState({ selectIndex: -1 })}>取消</span>
            <span onClick={this.handleFilterOk} >确定</span>
          </div>
        </div>
      )
    } else {
      // 第四个 筛选的标签
      return (
        <div className={indexCss.filter_other}>
          {/* 遮罩层 */}
          <div onClick={() => this.setState({ selectIndex: -1 })} className={indexCss.filter_other_mask}></div>
          <div className={indexCss.filter_other_main}>
            <div className={indexCss.filter_other_main_list}>
              {filterList[selectIndex].map((v, i) =>
                <div key={i} className={indexCss.filter_other_group}>
                  <div className={indexCss.filter_other_group_title}>{v.name}</div>
                  <div className={indexCss.filter_other_group_content}>
                    {v.list.map((vv, ii) =>
                      <div
                        onClick={this.filterOtherItemClick.bind(this, vv.value)}
                        key={ii}
                        className={[indexCss.filter_other_item, otherValue.includes(vv.value) ? indexCss.filter_other_item_active : ''].join(' ')}
                      >{vv.label}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className={indexCss.filter_other_main_btn}>
              <span onClick={this.filterOtherClear} >清除</span>
              <span onClick={this.handleFilterOk} >确定</span>
            </div>
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <Fragment>
        <div className={indexCss.moo_filter}>
          {/* 标题 */}
          <div className={indexCss.moo_filter_title}>
            {this.state.filterTitle.map((v, i) =>
              <div
                className={[indexCss.moo_filter_title_item, this.state.selectIndex === i ? indexCss.moo_filter_title_item_active : ""].join(' ')}
                key={i}
                onClick={this.handleFiltleClick.bind(this, i)}
              >{v.name}</div>
            )}
          </div>
          {/* 内容 */}
          <div className={indexCss.moo_filter_content}>
              {this.renderFilterContent()}
          </div>
        </div>
      </Fragment>
    )
  }
}