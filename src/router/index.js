import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Home from 'src/pages/Home';
import Source from 'src/pages/Source'
import Image from 'src/pages/Image'
import NotFound from 'src/pages/NotFound'
import logo from 'src/assets/images/dataview_logo.png'

const { Header, Sider, Content } = Layout;
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            collapsed: false,
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Router>
                <Layout style={{ height: '100%' }}>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logo" style={{ textAlign: 'center' }} >
                            <img src={logo} />
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Link style={{ color: 'inherit' }} to='/'>
                                    <Icon type="appstore" theme="filled" />
                                    <span>  首页</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link style={{ color: 'inherit' }} to='/source'>
                                    <Icon type="database" theme="filled" />
                                    <span>  数据库</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link style={{ color: 'inherit' }} to='/image'>
                                    <Icon type="file-image" theme="filled" />
                                    <span>  图片库</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                background: '#fff',
                                minHeight: 280,
                                overflowY: 'auto'
                            }}>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/source" component={Source} />
                                <Route path="/image" component={Image} />
                                <Route component={NotFound} />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Router>

        )
    }
}

export default App;
