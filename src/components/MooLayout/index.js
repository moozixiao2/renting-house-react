import React, { Component, Fragment } from 'react'

import { TabBar } from "antd-mobile";

import { withRouter } from 'react-router-dom'


class MooLayout extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
            selectedTab: 'redTab'
        };
    }
    render() {
        return (
            <Fragment>
                <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                    <TabBar
                        unselectedTintColor="#888888"
                        tintColor="#21b9a5"
                        barTintColor="white"
                        tabBarPosition="bottom"
                    >
                        <TabBar.Item
                            title="首页"
                            key="Life"
                            icon={ <i className='iconfont icon-ind'/> }
                            selectedIcon={<i className='iconfont icon-ind' /> }
                            selected={this.props.location.pathname === '/'}
                            onPress={() => {this.props.history.push('/')}}
                        >
                            {this.props.location.pathname === '/' && this.props.children}
                        </TabBar.Item>
                        <TabBar.Item
                            icon={ <i className='iconfont icon-findHouse'/> }
                            selectedIcon={<i className='iconfont icon-findHouse' /> }
                            title="找房"
                            key="findHouse"
                            selected={this.props.location.pathname === '/List'}
                            onPress={() => { this.props.history.push('/List') }}
                        >
                            { this.props.location.pathname === '/List' && this.props.children }
                        </TabBar.Item>
                        <TabBar.Item
                            icon={ <i className='iconfont icon-infom'/> }
                            selectedIcon={<i className='iconfont icon-infom' /> }
                            title="资讯"
                            key="news"
                            selected={this.props.location.pathname === '/News'}
                            onPress={() => { this.props.history.push('/News') }}
                        >
                            { this.props.location.pathname === '/News' && this.props.children }
                        </TabBar.Item>
                        <TabBar.Item
                            icon={ <i className='iconfont icon-my'></i> }
                            selectedIcon={<i className='iconfont icon-my' /> }
                            title="我的"
                            key="my"
                            selected={this.props.location.pathname === '/My'}
                            onPress={() => { this.props.history.push('/My') }}
                        >
                            { this.props.location.pathname === '/My' && this.props.children }
                        </TabBar.Item>
                    </TabBar>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(MooLayout)