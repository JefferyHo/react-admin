import React, { PureComponent } from 'react';
import { AutoComplete } from 'antd';
import { get } from '@/utils/request';

// enhance auto-complete to support server data render
export default class MyAutoComplete extends PureComponent {
    state = {
        dataSource: []
    }

    async handleChange (val) {
        let params = {};
        const { fromServer = false, url, name, change } = this.props;
        let { data = [] } = this.props;
        params[name] = val;
        if (fromServer) {
            data = await get(url, {...params});
        }

        this.setState({
          dataSource: data
        });


    }

    render () {
        const { dataSource } = this.state;
        return <AutoComplete dataSource={ dataSource } onChange={this.handleChange.bind(this)} />;
    }
}