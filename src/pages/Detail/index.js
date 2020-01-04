import React, { Component, Fragment } from 'react';
import { NavBar, Icon, Carousel } from 'antd-mobile';
import { getHousesDetail } from "../../utils/axios";
import indexCss from "./index.module.scss";


export default class Detail extends Component {

  state = {
    detail: {},
  }
  componentDidMount() {
    this.getDetail();
  }

  getDetail = async () => {
    // console.log(this.props)
    const pathname = this.props.location.pathname
    const id = this.getId(pathname);
    const res = (await getHousesDetail(id)).data.body
    console.log(res);
    // setState 是异步的 
    this.setState({ detail: res });
  }

  getId (pathname) {
    pathname = pathname.substring(1).split('/')
    return pathname[1]
  }

  render() {
    return (
      <Fragment>

      </Fragment>
    )
  }
}