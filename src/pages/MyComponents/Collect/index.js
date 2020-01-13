import React, { Component, Fragment } from 'react'
import { userGetFavorites } from '../../../utils/axios'
import indexCss from './index.module.scss'
import MooNavBar from '../../../components/MooNavBar'
import MooItem from '../../../components/MooItem'

export default class Collect extends Component {
  state = {
    collect: []
  }

  getCollect = async () => {
    const res = (await userGetFavorites()).data.body
    // console.log(res)
    this.setState({
      collect: res
    })
  }

  componentDidMount () {
    this.getCollect()
  }
  render () {
    return (
      <Fragment>
        <div className={indexCss.collect}>
          <MooNavBar className='collNavBar'>我的收藏</MooNavBar>

          {/* item */}
          <div className={indexCss.collItemWrap}>
            {
              this.state.collect.map(v => 
                <MooItem key={v.houseCode} item={v} /> 
              )
            }
          </div>
        </div>
      </Fragment>
    )
  }
}