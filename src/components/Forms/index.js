import React, { Component } from 'react';
import {
  AutoComplete,
  Checkbox,
  Cascader,
  DatePicker,
  Form,
  InputNumber,
  Input,
  Mention,
  Rate,
  Radio,
  Switch,
  Slider,
  Select,
  TreeSelect,
  Transfer,
  TimePicker,
  Upload,
  Button,
} from 'antd';

const FormItem = Form.Item;

class FormElem extends React.PureComponent {
    handleChange (v) {
        const { onChange } = this.props; 
        onChange(v);
    }

    render () {
        const { type, ...others } = this.props;
        switch(type) {
            case 'input': return <Input {...others} onChange={this.handleChange.bind(this)} />; 
            case 'password':return <Input.Password {...others} onChange={this.handleChange.bind(this)} />;
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

    initFormList = () => {
        const { formList, form: { getFieldDecorator } } = this.props;
        let formItemList = [];

        if (formList && formList.length > 0) {
            formItemList = formList.map((item, index) => {
                let { 
                    initialValue = "",
                    label,
                    placeholder,
                    field,
                    type,
                    required,
                    rules = []
                } = item;

                if (required) {
                    rules.push({
                        required: true,
                        message: '请输入' + label
                    })
                }

                return <FormItem label={label} key={field}>
                    { getFieldDecorator(field, { initialValue, rules })(
                        // <Input placeholder={placeholder} />
                        <FormElem type={type} placeholder={placeholder} />
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
            </FormItem>
        </Form>
    }
}

export default MyForm;