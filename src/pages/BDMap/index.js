import React, { Component, Fragment } from 'react'
import { NavBar, Icon } from 'antd-mobile'

import indexCss from './index.module.scss'

import store from '../../store'
import { getAreaInfo, getAreaMap, getHouses } from '../../utils/axios'

const BMap = window.BMap;

export default class BDMap extends Component {
  // 不同级别信息
  Sites = [
    { zoom: 11, level: 1, shape: 'circle', name: '区域'},
    { zoom: 14, level: 2, shape: 'circle', name: '村子'},
    { zoom: 16, level: 3, shape: 'rect', name: '街道'}
  ]
  // 级别索引
  SiteIndex = 0

  // 全局的地图对象
  Map = null;

  state = {
    // 底部的房源是否显示
    IsShow: false,
    // 详细的房源列表
    houseList: []
  }
  constructor () {
    super ()
    // 开启了订阅 需要等待 App.js  获取当前城市 成功
    store.subscribe(this.initCity);
  }

  initCity = async () => {
    let cityName = store.getState().mapReducer.cityName
    cityName = '广州市'
    // 创建地图实例  
    this.Map = new BMap.Map("allmap");
    this.Map.centerAndZoom(cityName, this.Sites[this.SiteIndex].zoom); 
    // 缩放组件
    this.Map.addControl(new BMap.NavigationControl());
    // 比例尺
    this.Map.addControl(new BMap.ScaleControl());
    const cityInfo = (await getAreaInfo({name: cityName})).data.body
    this.drawCityHouse(cityInfo);

    // 绑定地图的拖拽事件
    this.Map.addEventListener("dragstart", () => {
      this.setState({ IsShow: false });
    })
  }

  drawCityHouse = async (cityinfo) => {
    /* 获得该城市的 区域房源信息 */
    const res = (await (getAreaMap({id: cityinfo.value}))).data.body
    // console.log(res, cityinfo)
    // 清除旧的覆盖物 
    this.Map.clearOverlays();
    // 居中和缩放
    if(this.Sites[this.SiteIndex].zoom !== this.Sites[0].zoom) {
      // 根据被点的元素 获取坐标
      const point = new BMap.Point(cityinfo.coord.longitude, cityinfo.coord.latitude)
      this.Map.centerAndZoom(point, this.Sites[this.SiteIndex].zoom)
    }
    // 描绘房源
    res.forEach(v => {
      // 创建 坐标点
      const point = new BMap.Point(v.coord.longitude, v.coord.latitude)
      // 设置点偏移量
      const opts = {
        position: point, // 指定文本标注所在地理位置
        offset: new BMap.Size(0, 0) // 文本偏移量
      }
      // 创建 文本标签
      let label = ''
      if (this.Sites[this.SiteIndex].shape === 'circle') {
        label = new BMap.Label(`<div class=${indexCss.circle}>${v.label} <br/>${v.count}套</div>`, opts) // 创建文本标注对象
      } else if (this.Sites[this.SiteIndex].shape === 'rect') {
        label = new BMap.Label(`<div class=${indexCss.rect}>${v.label} <br/>${v.count}套</div>`, opts)
      }
      label.setStyle({
        backgroundColor: 'transparent',
        border: 'none'
      })

      // 绑定点击事件
      label.addEventListener("click", () => {
        // 判断 是否要项目详细房源信息
        if (this.SiteIndex === this.Sites.length) {
          this.getDetail(v.value)
          this.setState({ IsShow: true })
          // 让底部 div 变化稳定
          setTimeout(() => {
            // 点击标签 居中
            this.Map.panTo(point)
          }, 500);
        } else {
          this.drawCityHouse(v)
        }
      })

      // 把覆盖物添加到 地图上
      this.Map.addOverlay(label);
    })

    // 放大地图
    this.SiteIndex ++
  }

  getDetail = async (cityId) => {
    const res = (await getHouses({cityId})).data.body.list
    // console.log(res)
    this.setState({ houseList: res })
  }
  
  // 底层要显示的房源列表
  renderHouseListBtm = () => {
    return (
      <div className={[indexCss.house_detail_list, this.state.IsShow ? indexCss.h40 : ''].join(' ')} >
        <div className={indexCss.house_detail_list_title}>
          <span>房屋列表</span>
          <span>更多</span>
        </div>
        <div className={indexCss.house_detail_list_content}>
          {this.state.houseList.map((v, i) =>
            <div onClick={()=>this.props.history.push("/Detail/"+v.houseCode)} key={i} className={indexCss.house_item}>
              <div className={indexCss.house_item_img_wrap}>
                <img src={process.env.REACT_APP_API_URL + v.houseImg} alt="" />
              </div>
              <div className={indexCss.house_item_info_wrap}>
                <div className={indexCss.house_info1}>{v.title}</div>
                <div className={indexCss.house_info2}>{v.desc}</div>
                <div className={indexCss.house_info3}>{v.tags.map(vv => <span key={vv} > {vv}</span>)}</div>
                <div className={indexCss.house_info4}><span>{v.price}</span>元/月  </div>
              </div>
            </div>
          )}
        </div>


      </div>
    )
  }

  componentDidMount() {
    const cityName = store.getState().mapReducer.cityName;
    if (cityName) {
      this.initCity();
    }
  }

  render () {
    return (
      <Fragment>
        <div className={indexCss.moo_bdmap}>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.go(-1)}
          >地图找房</NavBar>
          
          <div className={indexCss.bd_map_content}>
              <div className={indexCss.allmap} id="allmap"></div>
              {this.renderHouseListBtm()}
          </div>
        </div>
      </Fragment>
    )
  }
}