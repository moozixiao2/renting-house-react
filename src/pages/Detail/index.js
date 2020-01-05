import React, { Component, Fragment } from 'react';
import { NavBar, Icon, Carousel } from 'antd-mobile';
import { getHousesDetail } from "../../utils/axios";
import indexCss from "./index.module.scss";
import store from '../../store'

const BMap = window.BMap;
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

  /* 调用接口 获得数据 */
  getDetail = async () => {
    // console.log(this.props)
    const pathname = this.props.location.pathname
    const id = this.getId(pathname);
    const res = (await getHousesDetail(id)).data.body
    // console.log(res);

    res.supporting = this.computedIcon(res.supporting)

    // setState 是异步的 
    this.setState({ detail: res });

    this.initMap()
  }

  /* 地图 */
  initMap = () => {
    const { detail } = this.state
    const map = new BMap.Map('locationMap')
    let point = new BMap.Point(detail.coord.longitude, detail.coord.latitude);
    // console.log(point)
    map.centerAndZoom(point, 18)
    map.enableScrollWheelZoom(true);

    // 复杂 覆盖物 绘制
    // 定义自定义覆盖物的构造函数  
    function SquareOverlay(point, text) {
      this._point = point
      this._text = text
      // console.log(point, text)
    }
    // 继承API的BMap.Overlay
    SquareOverlay.prototype = new BMap.Overlay();
    // 实现初始化方法  
    SquareOverlay.prototype.initialize = function (map) {
      // 保存map对象实例
      this._map = map;
      // 创建div元素，作为自定义覆盖物的容器
      var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      // 可以根据参数设置元素外观
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat)
      div.style.backgroundColor = '#EE5D5B'
      div.style.border = 'solid 1px #BC3B3A'
      div.style.color = '#fff'
      div.style.height = '19px'
      div.style.padding = '2px 5px'
      div.style.lineHeight = '18px'
      div.style.whiteSpace = 'nowrap'
      div.style.MozUserSelect = 'none'
      div.style.fontSize = '12px'
      var span = this._span = document.createElement('span')
      div.appendChild(span)
      span.appendChild(document.createTextNode(this._text))

      var arrow = this._arrow = document.createElement('div')
      arrow.style.background = 'url(//map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat'
      arrow.style.position = 'absolute'
      arrow.style.width = '11px'
      arrow.style.height = '10px'
      arrow.style.top = '22px'
      arrow.style.left = '10px'
      arrow.style.overflow = 'hidden'
      div.appendChild(arrow)
      // 将div添加到覆盖物容器中
      map.getPanes().labelPane.appendChild(div);
      // 保存div实例
      this._div = div;
      // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
      // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
      return div;
    }
    // 实现绘制方法   
    SquareOverlay.prototype.draw = function () {
      // 根据地理坐标转换为像素坐标，并设置给容器    
      var position = this._map.pointToOverlayPixel(this._point);
      this._div.style.left = position.x - 10 + "px";
      this._div.style.top = position.y - 40 + "px";
    }

    // 添加自定义覆盖物   
    var mySquare = new SquareOverlay(point, detail.community);
    map.addOverlay(mySquare);
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
    // 若不加 以下 判断，则会出现 在 detail.数组.map 时出错，则需要加入 {detail.数组 && detail.数组.map} 判断
    if (!Object.keys(detail).length) {
      return <Fragment></Fragment>
    }
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
          {/* 房屋概况 */}
          <div className={indexCss.houseCondition}>
            <div className={indexCss.conditionTitle}>房源概况</div>
            <div className={indexCss.conditionContent}>
              <div className={indexCss.houseOwnerWrap}>
                <div className={indexCss.houseOwner}>
                  <img src='http://hkzf.zbztb.cn/img/avatar.png' />
                  <div className={indexCss.houseNameAndAuth}>
                    <p>王女士</p>
                    <p><i className="iconfont icon-auth"></i> <span>已认证房主</span></p>
                  </div>
                </div>
                <div className={indexCss.contactOwner}>发消息</div>
              </div>
              {/* 存在 */}
              {detail.description && <div className={indexCss.conditionDesc}>{detail.description}</div>}
              {/* 不存在 提示 */}
              {!detail.description && <div className={indexCss.noneData}>暂无描述...</div>}
            </div>
          </div>
          {/* 房屋配套 */}
          <div className={indexCss.housePT}>
            <div className={indexCss.housePTTitle}>房屋配套</div>
            {detail.supporting.map(v => (
              <div className={indexCss.iconItem} key={v.val}>
                <i className={'iconfont ' + v.icon}></i>
                <span>{v.val}</span>
              </div>
            ))}
            {detail.supporting && detail.supporting.length === 0 && <div className={indexCss.noneData}>暂无数据...</div>}
          </div>
          {/* 位置 */}
          <div className={indexCss.location}>
            <div className={indexCss.locationTitle}>小区：{detail.community}</div>
            <div className={indexCss.locationMap} id='locationMap'></div>
          </div>

          {/* 下方 nav */}
          <div className={indexCss.subNav}>
            <div className={indexCss.subNavItem + ' ' + indexCss.toCollect}><img src='http://hkzf.zbztb.cn/img/unstar.png' />收藏</div>
            <div className={indexCss.subNavItem + ' ' + indexCss.toContact}>在线咨询</div>
            <div className={indexCss.subNavItem + ' ' + indexCss.toCall}>电话预约</div>
          </div>
        </div>
      </Fragment>
    )
  }
}