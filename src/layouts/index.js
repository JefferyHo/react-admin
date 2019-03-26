import React from 'react';
import styles from './index.css';
import { Layout } from 'antd';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import Footer from '@/components/footer';
import Header from '@/components/header';
import MyRoutes from '@/components/routes';
import Logo from '@/assets/logo.png';

const { Sider, Content } = Layout;

@connect(({layout, menu}) => ({layout, menu}))
class BasicLayout extends React.Component {
  componentWillMount () {
    const {
      dispatch,
      route: { routes }
    } = this.props;

    dispatch({
      type: 'menu/getMenuData',
      payload: { routes }
    });
    // console.log('basicLayout mounted:', this.props);
  }

  render() {
    const { layout, children } = this.props;
    const { mode, theme } = layout;
    return (
      <Layout>
        { mode === 'inline' &&  
            <Sider theme={theme} width="256" style={{height: '100vh'}} >
              <div className={styles.logo}>
                <a href="https://www.tjbool.com" >
                  <img src={Logo} alt="布尔logo" />
                  <h5 className={styles.title}>布尔科技</h5>
                </a>
              </div>
              <MyRoutes />
            </Sider>
        }
        <Layout>
          <Header />
          <Content className={styles.content} style={{minHeight: 'calc(100vh - 140px)', padding: `${mode === 'horizontal' ? '0 50px' : '0'}`}}>{children}</Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(BasicLayout);
