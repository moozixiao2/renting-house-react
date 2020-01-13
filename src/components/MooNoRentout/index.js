import React from 'react'
import indexCss from './index.module.scss'
import noFound from './not-found.png'
import { withRouter } from 'react-router-dom'

function MooNoRentout ({ history }) {
  return (
    <div className={indexCss.noRentout}>
      <div className={indexCss.tip}>
        <img src={noFound} alt='没有发布出租信息' />
        <p>您还没有房源，<span onClick={() => history.push('/Rent/AddHouse')}>去发布房源</span>吧</p>
      </div>
    </div>
  )
}
export default withRouter(MooNoRentout)