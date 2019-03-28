import Breadcrumb from '@/components/breadcrumb';
import React from 'react';
import withRouter from 'umi/withRouter';

class Layout extends React.Component {
    componentDidMount () {
    }

    render () {
        return(
            <div>
                <Breadcrumb />
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Layout);