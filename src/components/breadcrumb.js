import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';

@connect(({menu, routing, dispatch}) => ({
    menu,
    routing,
    dispatch
}))
class MyBreadcrumb extends React.PureComponent {
    // "/table/basic" => [/, /table, /table/basic]
    splitPath (path) {
        const urlList = path.split('/').filter(i => i);
        return urlList.map((urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`);
    }

    componentDidMount () {
        // console.log('breadcrumb mounted:', this.props);
    }

    render () {
        const {
            menu: { breadcrumbNameMap: menuDict },
            routing: { location: { pathname }}
        } = this.props;
        let path = this.splitPath(pathname);
        // console.log(menuDict);
        return (
            <div style={{ padding: '10px 16px', background: '#fff' }}>
                <Breadcrumb>
                    <Breadcrumb.Item key="home"><Link to="/"><Icon type="home" /></Link></Breadcrumb.Item>
                    {
                        path.map((item, index) => <Breadcrumb.Item key={item}>{menuDict[item]["name"]}</Breadcrumb.Item>)
                    }
                </Breadcrumb>
            </div>
        )
    }
}

export default MyBreadcrumb;