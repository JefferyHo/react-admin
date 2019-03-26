import { Menu } from 'antd';
import { connect } from 'dva';
import React from 'react';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import { localeMenu } from '@/utils/routes';

const makeMenu = ( arr ) => {
    return arr.map(item => {
        if (!item.path) return null;
        if (item.routes) {
            return <Menu.SubMenu title={localeMenu(item.path)} key={item.path}>{makeMenu(item.routes)}</Menu.SubMenu>;
        }
        return (
            <Menu.Item key={item.path}>
                <Link to={item.path}>{localeMenu(item.path)}</Link>
            </Menu.Item>
        );
    });
};

@connect(({layout, menu}) => ({layout, menu}))
class Route extends React.Component {
    render () {
        const { 
            layout: { mode, theme }, 
            menu: { menuData },
            location: {pathname},
            handleClick 
        } = this.props;
        return (
            <Menu
                onClick={handleClick}
                selectkeys={[pathname]}
                mode={mode}
                theme={theme}
                style={{ 'lineHeight': '64px'}}
            >
                { makeMenu(menuData) }
            </Menu>
        )
    }
}

export default withRouter(Route);