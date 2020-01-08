import React, { Component, Fragment } from 'react'
import { userGetFavorites } from '../../../utils/axios'
import indexCss from './index.module.scss'
import MooNavBar from '../../../components/MooNavBar'
import { baseURL } from '../../../utils/url'

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
                <div className={indexCss.collItem} key={v.houseCode} onClick={() => this.props.history.push('/Detail/' + v.houseCode)}>
                  <div className={indexCss.collImg}><img src={baseURL + v.houseImg} alt='' /></div>
                  <div className={indexCss.collContent}>
                    <p className={indexCss.title}>{v.title}</p>
                    <p className={indexCss.tags}>
                      {
                        v.tags.map(vv => 
                          <span key={vv}>{vv}</span>
                        )
                      }
                    </p>
                    <p className={indexCss.price}>￥{v.price}</p>
                    <p className={indexCss.desc}>{v.desc}</p>
                  </div>
                </div>  
              )
            }
          </div>
        </div>
      </Fragment>
    )
  }
}