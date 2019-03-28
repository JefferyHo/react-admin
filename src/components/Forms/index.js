import React, { Component } from 'react';
import { get } from '@/utils/request';
import debounce from 'lodash/debounce';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Button,
  Spin
} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;

class SelectRemote extends React.PureComponent {
    state = {
        fetching: false,
        list: []
    }

    async fetch (v) {
        const { url } = this.props;
        this.setState({ list: [], fetching: true });
        const data = await get(url, {value: v});
        this.setState({ list: data, fetching: false });
    }

    handleChange (v) {
        const { onChange } = this.props;
        onChange(v);
    }

    render () {
        const { fetching, list } = this.state;
        const { onChange, ...others } = this.props;
        return <Select  
                allowClear
                showSearch={true}
                { ...others }
                notFoundContent	={ fetching ? <Spin size="small" /> : null} 
                onSearch={debounce(this.fetch.bind(this), 300)} 
                onChange={this.handleChange.bind(this)} >
                    { list.map(d => <Option key={d.value} value={d.value}>{d.label}</Option>) }
            </Select>;
    }
}

class FormElem extends React.PureComponent {
    handleChange (v) {
        const { onChange } = this.props; 
        onChange(v);
    }

    render () {
        const { type, data, url, ...others } = this.props;
        
        switch(type) {
            case 'input': 
                return <Input {...others} onChange={this.handleChange.bind(this)} />; 
            case 'password':
                return <Input.Password {...others} onChange={this.handleChange.bind(this)} />;
            case 'select': 
                return <Select {...others} allowClear onChange={this.handleChange.bind(this)}>
                    { data.map(d => <Option key={d.value} value={d.value}>{d.label}</Option>) }
                </Select>;
            case 'selectRemote': 
                return <SelectRemote url={url} {...others} onChange={this.handleChange.bind(this)} />;
            case 'checkbox': 
                return <Checkbox.Group options={data} {...others} onChange={this.handleChange.bind(this)} />;
            case 'datepicker':
                return <DatePicker locale={locale} {...others} onChange={this.handleChange.bind(this)} />;
            case 'datetimepicker':
                return <DatePicker locale={locale} {...others} showTime onChange={this.handleChange.bind(this)} />;
            default: return null;
        }
    }
}

@Form.create()
class MyForm extends Component {

    constructor (props) {
        super(props);
        this.state = {};
    }

    // pre-handle initial value
    handleInitialValue = (type, initVal) => {
        let val;
        switch (type) {
            case 'checkbox': val = []; break;
            case 'datepicker': val = undefined; break;
            case 'datetimepicker': val = undefined; break;
            default: val = "";
        }
        return initVal || val;
    }

    initFormList = () => {
        const { formList, form: { getFieldDecorator } } = this.props;
        let formItemList = [];

        if (formList && formList.length > 0) {
            formItemList = formList.map((item, index) => {
                let { 
                    initialValue = "",
                    label,
                    field,
                    required,
                    rules = [],
                    type,
                    placeholder,
                    data = [],
                    url,
                } = item;

                if (required) {
                    rules.push({
                        required: true,
                        message: '请输入' + label
                    })
                }

                initialValue = this.handleInitialValue(type, initialValue);

                return <FormItem label={label} key={field}>
                    { getFieldDecorator(field, { initialValue, rules })(
                        // <Input placeholder={placeholder} />
                        <FormElem type={type} placeholder={placeholder} data={data} url={url} />
                    ) }
                </FormItem>                
            });
        }
        return formItemList;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, formSubmit } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (err) {
                // throw err;
                return;
            }
            formSubmit(values);
        })
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    render () {
        const { 
            formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 7 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 12 },
                    md: { span: 10 },
                }
            },  
            submitFormLayout ={
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 10, offset: 7 }
                }
            }
        } = this.props;

        return <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)} style={{ marginTop: 20}}>
            { this.initFormList() }
            <FormItem {...submitFormLayout} style={{ marginTop: 16 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
                <Button type="default" onClick={this.handleReset.bind(this)} style={{ marginLeft: 30 }}>
                    重置
                </Button>
            </FormItem>
        </Form>
    }
}

export default MyForm;