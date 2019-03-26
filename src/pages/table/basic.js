import React, { PureComponent } from 'react';

export default class Basic extends PureComponent {
    componentDidMount () {
        console.log('table_basic mountd');
    }
    render () {
        return <div> Table 组件页 </div>
    }
}