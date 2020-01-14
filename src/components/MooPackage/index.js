import React, { Component } from 'react'
import indexCss from './index.module.scss'
import classnames from 'classnames'

// 所有房屋配置项
const HOUSE_PACKAGE = [
  {
    id: 1,
    name: '衣柜',
    icon: 'icon-wardrobe'
  },
  {
    id: 2,
    name: '洗衣机',
    icon: 'icon-wash'
  },
  {
    id: 3,
    name: '空调',
    icon: 'icon-air'
  },
  {
    id: 4,
    name: '天然气',
    icon: 'icon-gas'
  },
  {
    id: 5,
    name: '冰箱',
    icon: 'icon-ref'
  },
  {
    id: 6,
    name: '暖气',
    icon: 'icon-Heat'
  },
  {
    id: 7,
    name: '电视',
    icon: 'icon-vid'
  },
  {
    id: 8,
    name: '热水器',
    icon: 'icon-heater'
  },
  {
    id: 9,
    name: '宽带',
    icon: 'icon-broadband'
  },
  {
    id: 10,
    name: '沙发',
    icon: 'icon-sofa'
  }
]

export default class MooPackage extends Component {
  state = {
    values: ''
  }
  handleChange (name) {
    // console.log(name)
    const { values } = this.state
    let newValues
    if (values.includes(name)) {
      newValues = values.filter(v => v !== name)
    } else {
      newValues = [...values, name]
    }
    this.setState({
      values: newValues
    })

    this.props.onSelect(newValues)
  }
  render () {
    return (
      <div className={indexCss.packWrap}>
        {
          HOUSE_PACKAGE.map(v =><div key={v.id} onClick={this.handleChange.bind(this, v.name)} className={classnames(indexCss.packItem, {
            active: this.state.values.includes(v.name)
          })}>
            <i className={'iconfont ' + v.icon}></i>
            <span>{v.name}</span>
          </div>)
        }
      </div>
    )
  }
}