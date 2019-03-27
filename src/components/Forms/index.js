import React, { Component } from 'react';
import {
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
import AutoComplete from '@/components/Forms/AutoComplete';

const FormItem = Form.Item;

class FormElem extends React.PureComponent {
    render () {
        const { type, placeholder } = this.props;
        let ele;
        switch(type) {
            case 'input': ele = <Input placeholder={placeholder} />; break;
            case 'password': ele = <Input.Password placeholder={placeholder} />;break;
            default: ele = ''
        }
        return ele;
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
                throw err;
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