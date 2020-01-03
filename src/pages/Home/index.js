import React, { Component, Fragment } from 'react'
import { Carousel } from 'antd-mobile'

import { getSwiperData, getGroupsData, getNewsData } from '../../utils/axios'

import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

import MooSearch from '../../components/MooSearch'

import { withRouter } from 'react-router-dom'

// 引入 scss
import indexCss from './index.module.scss'

class Home extends Component {
    constructor(props) {
        super (props)
        this.state = {
            swiperData: [],
            imgHeight: 176,
            navData: [
                {
                    id: 0,
                    text: '整租',
                    imgSrc: nav1,
                    url: ''
                },
                {
                    id: 1,
                    text: '合租',
                    imgSrc: nav2,
                    url: ''
                },
                {
                    id: 2,
                    text: '地图找房',
                    imgSrc: nav3,
                    url: '/BDMap'
                },
                {
                    id: 3,
                    text: '去出租',
                    imgSrc: nav4,
                    url: ''
                }
            ],
            groupsData: [],
            newsData: []
        }
    }

    render() {
        return (
            <Fragment>
                {/* 轮播图 开始 */}
                {this.state.swiperData.length > 0 && <div className={indexCss.swiper}><Carousel
                        autoplay
                        infinite
                    >
                        {this.state.swiperData.map(v => (
                            <a
                            key={v.id}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                                <img
                                    src={ process.env.REACT_APP_API_URL + v.imgSrc}
                                    alt={ process.env.REACT_APP_API_URL + v.alt}
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                    <div className={indexCss.mooSearch}><MooSearch /></div>
                </div>} 
                {/* 轮播图 结束 */}
                {/* 导航开始 */}
                <div className={indexCss.navWrap}>
                    {
                        this.state.navData.map(v => <div className={indexCss.navItem} key={v.id} onClick={() => this.props.history.push(v.url)}>
                          <img src={v.imgSrc} alt="" />
                          <div>{v.text}</div>
                        </div>)
                    }
                </div>
                {/* 导航结束 */}
                {/* 租房小组数据开始 */}
                <div className={indexCss.groupsWrap}>
                    <div className={indexCss.groupsTitle}>
                        <span className={indexCss.titleName}>租房小组</span>
                        <span className={indexCss.more}>更多</span>
                    </div>
                    {
                        this.state.groupsData.map(v => 
                            <div className={indexCss.groupsItem} key={v.id}>
                                <div className={indexCss.groupsInfo}>
                                    <div className={indexCss.infoName1}>{v.title}</div>
                                    <div className={indexCss.infoName2}>{v.desc}</div>
                                </div>
                                <div className={indexCss.groupsImg}>
                                    <img src={process.env.REACT_APP_API_URL + v.imgSrc} alt="" />
                                </div>
                            </div>
                        )
                    }
                </div>
                {/* 租房小组数据结束 */}
                {/* 最新资讯开始 */}
                <div className={indexCss.newsWrap}>
                    <div className={indexCss.newsTitle}>最新资讯</div>
                    {
                        this.state.newsData.map(v => 
                            <div className={indexCss.newsItem} key={v.id}>
                                <div className={indexCss.newsImg}>
                                    <img src={process.env.REACT_APP_API_URL + v.imgSrc} alt="" />
                                </div>
                                <div className={indexCss.newsInfo}>
                                    <div className={indexCss.infoTitle}>{v.title}</div>
                                    <div className={indexCss.infoOthers}>
                                        <span className={indexCss.infoAuthor}>{v.from}</span>
                                        <span className={indexCss.infoDate}>{v.date}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                {/* 最新资讯结束 */}
                {/* 到底提示 */}
                <div className={indexCss.fotTip}>------ 我是底线 ------</div>
            </Fragment>
        )
    }

    /* 调用获得小组数据 */
    async getSwiperData() {
        try {
            const res = await getSwiperData()
            // console.log(res)
            if(res.data.status === 200) {
                this.setState ({
                    swiperData: res.data.body
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    /* 调用获得资讯数据 */
    async getGroupsData() {
        try {
            const res = await getGroupsData()
            // console.log(res)
            if(res.data.status === 200) {
                this.setState ({
                    groupsData: res.data.body
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    /* 调用获得轮播图数据 */
    async getNewsData() {
        try {
            const res = await getNewsData()
            // console.log(res)
            if(res.data.status === 200) {
                this.setState ({
                    newsData: res.data.body
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount () {
        this.getSwiperData()
        this.getGroupsData()
        this.getNewsData()
    }
}
export default withRouter(Home)