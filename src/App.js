import React, { Component } from 'react';
import Routes from './routes';
import DocumentTitle from 'react-document-title';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { Layout, notification, Icon } from 'antd';
import { ThemePicker } from './components/widget';
import { connectMu } from 'redux-mufeng';

const { Content, Footer } = Layout;

class App extends Component {
    state = {
        collapsed: false,
        title: ''
    };
    componentWillMount() {
        const { setMuState } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        // user && receiveData(user, 'auth');
        user && setMuState({ stateName: 'auth', data: user });
        // receiveData({a: 213}, 'auth');
        // fetchData({funcName: 'admin', stateName: 'auth'});
        this.getClientWidth();
        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClientWidth();
        }
    }
    componentDidMount() {
        const openNotification = () => {
            notification.open({
              message: '博主-Myfun',
              description: (
                  <div>
                      <p>
                          GitHub地址： <a href="https://github.com/zhangximufeng" target="_blank" rel="noopener noreferrer">https://github.com/zhangximufeng</a>
                      </p>
                      <p>
                          博客地址： <a href="https://zhangximufeng.github.io/" target="_blank" rel="noopener noreferrer">https://zhangximufeng.github.io/</a>
                      </p>
                  </div>
              ),
              icon: <Icon type="smile-circle" style={{ color: 'red' }} />,
              duration: 0,
            });
            localStorage.setItem('isFirst', JSON.stringify(true));
        };
        const isFirst = JSON.parse(localStorage.getItem('isFirst'));
        !isFirst && openNotification();
    }
    getClientWidth = () => { // 获取当前浏览器宽度并设置responsive管理响应式
        const { setMuState } = this.props;
        const clientWidth = window.innerWidth;
        console.log(clientWidth);
        setMuState({ stateName: 'responsive', data: { isMobile: clientWidth <= 992 } });
        // receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { title } = this.state;
        const { auth = { data: {} }, responsive = { data: {} } } = this.props;
        return (
            <DocumentTitle title={title}>
                <Layout>
                    {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} />}
                    <ThemePicker />
                    <Layout style={{flexDirection: 'column'}}>
                        <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}} />
                        <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                            <Routes auth={auth} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                        React-Admin ©{new Date().getFullYear()} Created by zhangximufeng
                        </Footer>
                    </Layout>
                </Layout>
            </DocumentTitle>
        );
    }
}

export default connectMu(['auth', 'responsive'])(App);
