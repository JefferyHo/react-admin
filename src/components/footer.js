import { Layout } from 'antd';

const { Footer } = Layout;
const styles = {
    "textAlign": "center", 
    "fontSize": "14px", 
    "lineHeight": 2
};

function MyFooter () {
    return (
        <Footer>
            <div style={styles}>&copy;2019 天津布尔科技有限公司</div>
        </Footer>
    );
}

export default MyFooter;