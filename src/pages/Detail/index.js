import React, { Component, Fragment } from 'react';
import { NavBar, Icon, Carousel } from 'antd-mobile';
import { getHousesDetail } from "../../utils/axios";
import indexCss from "./index.module.scss";
import store from '../../store'


export default class Detail extends Component {

  state = {
    detail: {},
    imgHeight: 252
  }

  Unsubscribe = null
  constructor() {
    super()
    this.Unsubscribe = store.subscribe(this.getDetail)
  }

  componentWillMount() {
    this.getDetail();
  }
  componentWillUnmount() {
    this.Unsubscribe()
  }

  getDetail = async () => {
    // console.log(this.props)
    const pathname = this.props.location.pathname
    const id = this.getId(pathname);
    const res = (await getHousesDetail(id)).data.body
    // console.log(res);

    res.supporting = this.computedIcon(res.supporting)

    // setState 是异步的 
    this.setState({ detail: res });
  }

  getId(pathname) {
    pathname = pathname.substring(1).split('/')
    return pathname[1]
  }

  computedIcon = (arr) => {
    // "电视", "冰箱", "洗衣机", "空调", "热水器", "沙发", "宽带", "衣柜", '天然气'
    // let icon = ['icon-vid', 'icon-ref', 'icon-wash', 'icon-air', 'icon-header', 'icon-sofa','icon-broadband','icon-wardrobe', 'icon-gas']
    let newArr = []
    arr.forEach(v => {
      switch (v.toString()) {
        case '电视':
          newArr.push({ icon: 'icon-vid', val: v })
          break
        case '冰箱':
          newArr.push({ icon: 'icon-ref', val: v })
          break
        case '洗衣机':
          newArr.push({ icon: 'icon-wash', val: v })
          break
        case '空调':
          newArr.push({ icon: 'icon-air', val: v })
          break
        case '热水器':
          newArr.push({ icon: 'icon-heater', val: v })
          break
        case '沙发':
          newArr.push({ icon: 'icon-sofa', val: v })
          break
        case '宽带':
          newArr.push({ icon: 'icon-broadband', val: v })
          break
        case '衣柜':
          newArr.push({ icon: 'icon-wardrobe', val: v })
          break
        case '天然气':
          newArr.push({ icon: 'icon-gas', val: v })
          break
        default:
          newArr.push({ icon: 'icon-pic', val: v })
          break
      }
    })
    return newArr
  }

  render() {
    const { detail, imgHeight } = this.state
    return (
      <Fragment>
        <div className={indexCss.detail}>
          {/* 导航 */}
          <NavBar
            className={indexCss.detailNavbar}
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.go(-1)}
            rightContent={[
              <i key={0} className='iconfont icon-share' />
            ]}
          ><span>{detail.community}</span></NavBar>
          {/* 轮播图 */}
          {detail.houseImg && <div className={indexCss.detailCarousel}><Carousel
            autoplay
            infinite
          >
            {detail.houseImg.map(v => (
              <a
                key={v}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: imgHeight }}
              >
                <img

                  src={process.env.REACT_APP_API_URL + v}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel></div>}
          {/* 详细 */}
          <div className={indexCss.detailContent}>
            <div className={indexCss.titleWrap + ' ' + indexCss.item}>
              <div className={indexCss.detailTitle}>{detail.title}</div>
              <div className={indexCss.detailTags}>
                {detail.tags && detail.tags.map((v, i) => <span key={i}>{v}</span>)}
              </div>
            </div>
            <div className={indexCss.houseInfo + ' ' + indexCss.item}>
              <div className={indexCss.infoItem}>
                <p>{detail.price}<span>/月</span></p>
                <p>租金</p>
              </div>
              <div className={indexCss.infoItem}>
                <p>{detail.roomType}</p>
                <p>房型</p>
              </div>
              <div className={indexCss.infoItem}>
                <p>{detail.size}平方</p>
                <p>面积</p>
              </div>
            </div>
            <div className={indexCss.houseDesc + ' ' + indexCss.item}>
              <div className={indexCss.descItem}>
                <span>装修：</span>精装
              </div>
              <div className={indexCss.descItem}>
                <span>朝向：</span>{detail.oriented && detail.oriented[0]}
              </div>
              <div className={indexCss.descItem}>
                <span>楼层：</span>{detail.floor}
              </div>
              <div className={indexCss.descItem}>
                <span>类型：</span>普通住宅
              </div>
            </div>
          </div>
          {/* 房屋配套 */}
          <div className={indexCss.housePT}>
            <div className={indexCss.housePTTitle}>房屋配套</div>
            {detail.supporting && detail.supporting.map(v => (
              <div className={indexCss.iconItem} key={v.val}>
                <i className={'iconfont ' + v.icon}></i>
                <span>{v.val}</span>
              </div>
            ))}
            {detail.supporting && detail.supporting.length === 0 && <div className={indexCss.noneData}>暂无数据...</div>}
          </div>
          {/* 位置 */}
          <div className={indexCss.location}>
            <div className={indexCss.locationTitle}>小区：</div>

          </div>
        </div>
      </Fragment>
    )
  }
}