import { Spin, Icon } from 'antd';

export default () => (
    <div style={{ paddingTop: 100, textAlign: 'center'}}>
        <Spin indicator={<Icon type="loading" spin />} />
    </div>
);