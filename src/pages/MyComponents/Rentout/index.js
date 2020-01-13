import React, { Component, Fragment } from 'react'

import MooNavBar from '../../../components/MooNavBar'
import indexCss from './index.module.scss'

import { getRentout } from '../../../utils/axios'
import MooItem from '../../../components/MooItem'
import MooNoRentout from '../../../components/MooNoRentout'

export default class Rentout extends Component {
  state = {
    isLoading: false,
    rentInfo: []
  }

  getRentout = async () => {
    const res = await getRentout()
    // console.log(res)
    this.setState({
      rentInfo: res.data.body
    })
  }

  componentWillMount () {
    this.getRentout()
  }
  render () {
    let isNoData = this.state.rentInfo.length <= 0
    return (
      <Fragment>
        <div className={indexCss.rentout}>
          <MooNavBar className={indexCss.rentoutNavbar}>我的出租</MooNavBar>
          {/* 无数据 */}
          {
            isNoData && <div className={indexCss.noRentout}><MooNoRentout /></div>
          }
          {/* item */}
          { !isNoData && <div className={indexCss.rentItemWrap}>
            {
              this.state.rentInfo.map(v => 
                <MooItem key={v.houseCode} item={v}></MooItem> 
              )
            }
            </div>
          }
        </div>
      </Fragment>
    )
  }
}