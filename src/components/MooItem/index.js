import React from 'react'

import indexCss from './index.module.scss'
import { baseURL } from '../../utils/url'
import { withRouter } from 'react-router-dom'

function MooItem ({ item, history }) {
  return (
    <div className={indexCss.rentItem} onClick={() => history.push('/Detail/' + item.houseCode)}>
      <div className={indexCss.rentImg}><img src={baseURL + item.houseImg} alt='' /></div>
      <div className={indexCss.rentContent}>
        <p className={indexCss.title}>{item.title}</p>
        <p className={indexCss.tags}>
          {
            item.tags.map(vv =>
              <span key={vv}>{vv}</span>
            )
          }
        </p>
        <p className={indexCss.price}>￥{item.price}</p>
        <p className={indexCss.desc}>{item.desc}</p>
      </div>
    </div>
  )
}
export default withRouter(MooItem)