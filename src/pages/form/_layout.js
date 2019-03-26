import Breadcrumb from '@/components/breadcrumb';
import React from 'react';
import withRouter from 'umi/withRouter';

export default withRouter(props => (
    <>
        <Breadcrumb />
        {props.children || ( <div>children 为 Null</div>)}
    </>
));
