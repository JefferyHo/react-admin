import Breadcrumb from '@/components/breadcrumb';

export default (props) => (
    <div>
        <Breadcrumb />
        {props.children}
    </div>
)