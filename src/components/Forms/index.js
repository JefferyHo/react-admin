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
        switch(type) {
            case 'input': return <Input placeholder={placeholder} />;
            case 'password': return <Input.Password placeholder={placeholder} />
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
                    type
                } = item;

                return <FormItem label={label} key={field}>
                    { getFieldDecorator(field, { initialValue })(
                        <FormElem type={type} placeholder={placeholder} />
                    ) }
                </FormItem>                
            });
        }
        return formItemList;
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

        const {
            form: { getFieldDecorator },
            formList
        } = this.props;

        return <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 20}}>
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