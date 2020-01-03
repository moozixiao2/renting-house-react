import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import MooSearch from '../../components/MooSearch'
import MooFilter from '../../components/MooFilter'

import IndexCss from './index.module.scss'

class List extends Component {
    render() {
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
                  <MooFilter />
                </div>
                {/* 过滤 结束 */}
                
            </Fragment>
        )
    }
}
export default withRouter(List)