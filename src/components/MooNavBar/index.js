import React, { Component, Fragment } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import indexCss from './index.module.scss'

import classnames from 'classnames'
import PropTypes from 'prop-types'

class MooNavBar extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  }
  render () {
  // console.log(this.props)
  const { className, children, rightContent } = this.props
    return (
      <Fragment>
        <NavBar
          className={classnames(indexCss.navBar, className)}
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={rightContent}
        >
          <span>{children}</span>
        </NavBar>
      </Fragment>
    )
  }
}

export default withRouter(MooNavBar)