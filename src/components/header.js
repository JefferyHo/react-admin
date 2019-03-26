import React from 'react';
import { Icon, Menu, Dropdown, Avatar, Row, Col, Layout} from 'antd';
import { connect } from 'dva';
import MyRoute from './routes';
import Logo from '@/assets/logo.png';
import styles from './header.css';

const { Header } = Layout;

function handleMenuClick (e) {
    console.log(e);
}

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="logout">注销登录</Menu.Item>
    </Menu>
);

const HeaderRight = (props) => (
    <ul className={props.theme === 'light' ? styles['list'] : styles['list-dark']}>
        <li className={styles.item}><span className={styles.itemA}><Icon type="bell" /></span></li>
        <li className={styles.item}>
            <Dropdown overlay={menu}>
                <span className={styles.itemA}><Avatar icon="user" size="small" style={{ marginRight: '.5em'}} />Someone</span>
            </Dropdown>
        </li>
    </ul>
    
);

@connect(layout => layout)
class MyHeader extends React.Component {
    render () {
        const { theme, mode } = this.props.layout;
        return (
            <Header>
                <div className={styles.header}>
                    <Row>
                        {
                            mode === 'horizontal' &&
                            [<Col span={4} key="logo">
                                <div className={styles.logo}>
                                    <a href="https://www.tjbool.com" >
                                    <img src={Logo} alt="布尔logo" className={theme === 'dark' ? styles['filter']: null} />
                                    <h5 className={styles.title}>布尔科技</h5>
                                    </a>
                                </div>
                            </Col>,
                            <Col span={10} className={styles['text-left']} key="routes"><MyRoute /></Col>]
                        }
                        <Col span={6} offset={Number(`${mode === 'horizontal' ? 4 : 18}`)} className={styles['text-right']}><HeaderRight theme={theme} /></Col>
                    </Row>
                </div>
            </Header>
        );
    }
}

export default MyHeader;